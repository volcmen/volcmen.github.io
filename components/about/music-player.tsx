'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { STATIONS } from '@/config/station.config';

const Player = dynamic(() => import('react-player'));

const DEFAULT_VOLUME = 0.8;

interface MusicPlayerProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
  className?: string;
}

export function MusicPlayer({ onPlayStateChange, className }: MusicPlayerProps) {
  const [currentStation, setCurrentStation] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const playerRef = useRef(null);
  const changeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (changeTimeoutRef.current) {
      clearTimeout(changeTimeoutRef.current);
    }
  }, []);

  // Notify parent component about play state changes for visualizer sync
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  const handleStationChange = (index: number) => {
    setIsChanging(true);
    setCurrentStation(index);
    setIsPlaying(false); // Stop playing when switching stations
    if (changeTimeoutRef.current) {
      clearTimeout(changeTimeoutRef.current);
    }
    changeTimeoutRef.current = setTimeout(() => setIsChanging(false), 500);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setVolume(prev => (prev === 0 ? DEFAULT_VOLUME : 0));
  };

  const handleVolumeChange = (value: number[]) => {
    const next = value[0] ?? volume;
    setVolume(Math.min(1, Math.max(0, next)));
  };

  const activeStation = useMemo(
    () => STATIONS[currentStation] ?? STATIONS[0],
    [currentStation],
  );

  if (!activeStation) {
    return null;
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      {/* Hidden Youtube Player */}
      {activeStation.url && (
        <div className="hidden">
          <Player
            ref={playerRef}
            src={activeStation.url}
            playing={isPlaying}
            volume={volume}
            width="0"
            height="0"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}

      <div className="relative mb-6 overflow-hidden rounded-xl bg-card/40 border-2 border-primary/10 backdrop-blur-md">
        <div className={cn(
          'absolute inset-0 opacity-20 transition-colors duration-500',
          activeStation.colors.bg,
        )}
        />

        <div className="relative p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4 relative z-10">

            <div className="relative group">
              <m.div
                key={currentStation}
                initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'p-6 rounded-full border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-card/50 backdrop-blur-sm',
                  activeStation.colors.bg,
                  activeStation.colors.border,
                )}
              >
                {activeStation.logo
                  ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={activeStation.logo} alt={activeStation.name} className="size-12 object-contain" />
                    )
                  : (
                      <activeStation.icon className={cn('size-10', activeStation.colors.text)} />
                    )}
              </m.div>

              <button
                type="button"
                aria-label={isPlaying ? 'Pause station' : 'Play station'}
                aria-pressed={isPlaying}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {isPlaying
                  ? (
                      <Pause className="size-8 text-white fill-current" />
                    )
                  : (
                      <Play className="size-8 text-white fill-current ml-1" />
                    )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <m.div
                key={currentStation}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                <h3 className={cn(
                  'text-2xl font-black font-display tracking-widest uppercase',
                  activeStation.colors.text,
                )}
                >
                  {activeStation.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  {isPlaying && (
                    <span className="flex size-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
                    </span>
                  )}
                  <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                    {isPlaying ? 'ON AIR' : 'OFFLINE'}
                    {' '}
                    —
                    {' '}
                    {activeStation.description}
                  </p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-4 right-4 z-20">
            <m.div
              className="flex items-center gap-2 bg-card/40 backdrop-blur-md p-2 rounded-full border border-primary/5 overflow-hidden"
              initial="idle"
              whileHover="hover"
              variants={{
                idle: { width: '36px' },
                hover: { width: '160px' },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <button
                type="button"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                aria-pressed={volume === 0}
                onClick={toggleMute}
                className="p-0.5 rounded-full hover:bg-muted/10 transition-colors text-muted-foreground hover:text-primary shrink-0 relative z-10"
              >
                {volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>

              <Slider
                defaultValue={[DEFAULT_VOLUME]}
                max={1}
                step={0.01}
                value={[volume]}
                onValueChange={handleVolumeChange}
                className="min-w-[6rem]"
                aria-label="Volume"
              />
            </m.div>
          </div>

          <AnimatePresence>
            {isChanging && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-background/10 mix-blend-overlay pointer-events-none flex items-center justify-center bg-card"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E")`,
                }}
              >
                <span className="font-mono text-xs text-muted-foreground tracking-widest">TUNING...</span>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {STATIONS.map((station, idx) => {
          const StationIcon = station.icon;
          const isActive = currentStation === idx;

          return (
            <button
              type="button"
              key={station.id}
              onClick={() => handleStationChange(idx)}
              className={cn(
                'group relative h-16 rounded-lg border transition-all duration-300 overflow-hidden',
                isActive
                  ? cn(station.colors.border, station.colors.bg)
                  : 'border-primary/5 bg-card/20 hover:bg-muted/5 hover:border-primary/20',
              )}
              aria-pressed={isActive}
              aria-label={`Select ${station.name}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {station.logo
                  ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={station.logo}
                        alt={station.name}
                        className={cn(
                          'size-8 object-contain transition-all duration-300',
                          !isActive && 'opacity-50 group-hover:opacity-80 grayscale',
                        )}
                      />
                    )
                  : (
                      <div className={cn(
                        'size-6 transition-all duration-300',
                        isActive ? station.colors.text : 'text-muted-foreground/50 group-hover:text-muted-foreground',
                      )}
                      >
                        <StationIcon className="size-full" />
                      </div>
                    )}
              </div>

              {isActive && (
                <m.div
                  layoutId="activeStation"
                  className={cn('absolute inset-x-0 bottom-0 h-1', station.colors.text.replace('text-', 'bg-'))}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
