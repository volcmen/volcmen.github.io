'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    Module?: DoomModule;
  }
}

interface DoomModule {
  FS?: {
    createPreloadedFile: (
      parent: string,
      name: string,
      url: string,
      canRead: boolean,
      canWrite: boolean,
    ) => void;
  };
  preRun?: (() => void)[] | (() => void);
  postRun?: (() => void)[];
  print?: (text: string) => void;
  printErr?: (text: string) => void;
  canvas?: HTMLCanvasElement | null;
  locateFile?: (path: string) => string;
  onRuntimeInitialized?: () => void;
  setStatus?: (text: string) => void;
  totalDependencies?: number;
  monitorRunDependencies?: (left: number) => void;
  arguments?: string[];
  noInitialRun?: boolean;
  onAbort?: (what?: unknown) => void;
  // Optional SDL audio context used by the port
  SDL?: {
    audio?: {
      context?: {
        close?: () => Promise<void> | void;
        state?: string;
      };
    };
  };
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface DoomGameProps {
  className?: string;
}

export function DoomGame({ className }: DoomGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const shadowHostRef = useRef<HTMLDivElement | null>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const runtimeCancelled = useRef(false);
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  // Focus canvas when game starts
  useEffect(() => {
    if (started && canvasRef.current) {
      canvasRef.current.focus();
    }
  }, [started]);

  const cleanupDoomResources = () => {
    if (scriptRef.current) {
      scriptRef.current.onload = null;
      scriptRef.current.onerror = null;
      scriptRef.current.remove();
      scriptRef.current = null;
    }
    if (shadowHostRef.current) {
      shadowHostRef.current.remove();
      shadowHostRef.current = null;
      shadowRootRef.current = null;
    }
    // Best-effort: close SDL audio context to stop callbacks
    const audioCtx = window.Module?.SDL?.audio?.context;
    if (audioCtx?.close && audioCtx.state !== 'closed') {
      try {
        void audioCtx.close();
      }
      catch (err) {
        console.warn('Failed to close Doom audio context', err);
      }
    }
    // Leave a minimal stub to absorb late async callbacks from the engine
    window.Module = createModuleStub();
  };

  // Mark mounted and cleanup script/globals on unmount
  useEffect(() => {
    isMounted.current = true;
    runtimeCancelled.current = false;
    return () => {
      isMounted.current = false;
      runtimeCancelled.current = true;
      cleanupDoomResources();
    };
  }, []);

  // Also cleanup when the page is being hidden/unloaded (e.g., refresh or navigation)
  useEffect(() => {
    const handlePageHide = () => {
      runtimeCancelled.current = true;
      cleanupDoomResources();
    };
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);
    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
    };
  }, []);

  const startGame = () => {
    runtimeCancelled.current = false;
    if (started || loading || scriptRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setLoading(true);
    setError(null);

    // Initialize the Module for Emscripten
    const moduleConfig: DoomModule = {
      noInitialRun: runtimeCancelled.current,
      onAbort: () => {
        console.warn('Doom runtime aborted');
      },
      preRun: function () {
        if (runtimeCancelled.current || !isMounted.current) {
          this.noInitialRun = true;
          throw new Error('Doom runtime cancelled before start');
        }
        // Preload the WAD file into the virtual filesystem
        const fs = window.Module?.FS;
        if (fs?.createPreloadedFile) {
          fs.createPreloadedFile('', 'doom1.wad', `${BASE_PATH}/doom/doom1.wad`, true, true);
        }
        else {
          console.warn('Emscripten FS not ready to preload WAD');
        }
      },
      postRun: [],
      print: (text: string) => {
        console.log(text);
      },
      printErr: (text: string) => {
        console.error(text);
        if (!isMounted.current) return;
        if (text.includes('not found') || text.includes('error')) {
          setError(`Error: ${text}`);
          setLoading(false);
        }
      },
      canvas,
      locateFile: (path: string) => {
        console.log('Locating file:', path);
        return `${BASE_PATH}/doom/${path}`;
      },
      onRuntimeInitialized: () => {
        console.log('Runtime initialized');
        if (!isMounted.current) return;
        setLoading(false);
        setStarted(true);
      },
      setStatus: (text: string) => {
        console.log('Status:', text);
        if (!isMounted.current) return;
        if (text.includes('Running')) {
          setLoading(false);
          setStarted(true);
        }
      },
      totalDependencies: 0,
      monitorRunDependencies: function (left: number) {
        const currentTotal = typeof this.totalDependencies === 'number' ? this.totalDependencies : 0;
        this.totalDependencies = Math.max(currentTotal, left);
        console.log('Dependencies remaining:', left);
        if (!isMounted.current) return;
        if (left === 0) {
          setLoading(false);
          setStarted(true);
        }
      },
      arguments: ['-iwad', 'doom1.wad', '-window', '-nogui', '-nomusic'],
    };
    window.Module = moduleConfig;

    // Create a shadow root host to contain the injected script (keeps it scoped and easy to tear down)
    const shadowHost = document.createElement('div');
    shadowHost.style.display = 'none';
    const shadowRoot = shadowHost.attachShadow({ mode: 'closed' });
    shadowHostRef.current = shadowHost;
    shadowRootRef.current = shadowRoot;
    document.body.appendChild(shadowHost);

    // Load the main Emscripten JS file
    const script = document.createElement('script');
    script.src = `${BASE_PATH}/doom/websockets-doom.js`;
    script.async = true;
    scriptRef.current = script;
    script.onload = () => {
      console.log('Doom script loaded');
    };
    script.onerror = () => {
      if (!isMounted.current) return;
      setError('Failed to load Doom engine. Please ensure all files are in public/doom/.');
      setLoading(false);
      cleanupDoomResources();
    };
    // Append to shadow root so removal is fully encapsulated on teardown
    shadowRoot.appendChild(script);
  };

  const toggleFullscreen = () => {
    if (canvasRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      else {
        canvasRef.current.requestFullscreen();
      }
    }
  };

  return (
    <>
      <div className={cn('relative w-full max-w-4xl aspect-[4/3] bg-black rounded-lg overflow-hidden shadow-2xl border border-border', className)}>
        {!started && !loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Button size="lg" onClick={startGame}>
              <Play className="mr-2 size-4" />
              {' '}
              Start Game
            </Button>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10 text-foreground">
            Loading Engine...
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10 text-destructive p-4 text-center">
            {error}
          </div>
        )}

        {started && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 z-20"
            onClick={toggleFullscreen}
          >
            <Maximize className="size-4" />
          </Button>
        )}

        <canvas
          ref={canvasRef}
          id="canvas"
          className="w-full h-full block outline-none cursor-crosshair"
          onContextMenu={e => e.preventDefault()}
          onClick={() => canvasRef.current?.focus()}
          tabIndex={0}
        />
      </div>

      <div className="mt-10 w-full max-w-4xl text-sm text-muted-foreground">
        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-background/70 via-background/40 to-background/70 px-5 py-6 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.08em] text-foreground/80 font-semibold mb-4">
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-border/70 bg-background/90 shadow-inner">?</span>
            <span className="text-sm">Controls</span>
            <span className="text-[11px] font-normal text-foreground/60">Fast reference for keys</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-foreground/60">Movement</div>
              <div className="flex flex-wrap gap-1.5">
                {['W', 'A', 'S', 'D'].map(key => (
                  <kbd
                    key={key}
                    className="inline-flex h-8 min-w-[2.1rem] items-center justify-center rounded-lg border border-border/70 bg-background/90 px-2 text-xs font-semibold shadow-sm ring-1 ring-border/30"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['↑', '↓', '←', '→'].map(key => (
                  <kbd
                    key={key}
                    className="inline-flex h-8 min-w-[2.1rem] items-center justify-center rounded-lg border border-border/70 bg-background/90 px-2 text-xs font-semibold shadow-sm ring-1 ring-border/30"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-foreground/60">Actions</div>
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-8 min-w-[2.7rem] items-center justify-center rounded-lg border border-border/70 bg-background/90 px-2 text-xs font-semibold shadow-sm ring-1 ring-border/30">Ctrl</kbd>
                <span className="text-[12px] text-foreground/75">Fire</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-8 min-w-[3.1rem] items-center justify-center rounded-lg border border-border/70 bg-background/90 px-2 text-xs font-semibold shadow-sm ring-1 ring-border/30">Space</kbd>
                <span className="text-[12px] text-foreground/75">Use / Open</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.08em] text-foreground/60">Run & Weapons</div>
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-8 min-w-[3.1rem] items-center justify-center rounded-lg border border-border/70 bg-background/90 px-2 text-xs font-semibold shadow-sm ring-1 ring-border/30">Shift</kbd>
                <span className="text-[12px] text-foreground/75">Run</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="inline-flex h-8 min-w-[3.1rem] items-center justify-center rounded-lg border border-border/70 bg-background/90 px-2 text-xs font-semibold shadow-sm ring-1 ring-border/30">1-9</kbd>
                <span className="text-[12px] text-foreground/75">Switch weapons</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-foreground/65">This uses the Shareware WAD and a WebAssembly port of the Doom engine.</p>
      </div>
    </>
  );
}

// Minimal stub to prevent late async callbacks from throwing after cleanup
function createModuleStub(): DoomModule {
  return {
    dynCall_vi: () => undefined,
    print: () => undefined,
    printErr: () => undefined,
    setStatus: () => undefined,
    monitorRunDependencies: () => undefined,
    postRun: [],
    preRun: [],
    arguments: [],
    SDL: {
      audio: {
        context: {
          close: () => undefined,
          state: 'closed',
        },
      },
    },
  } as DoomModule & { dynCall_vi?: (...args: unknown[]) => void };
}
