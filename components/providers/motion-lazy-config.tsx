'use client';

import { LazyMotion } from 'motion/react';
import * as React from 'react';

const loadFeatures = () =>
  import('motion/react').then(res => res.domAnimation);

interface MotionLazyConfigProps {
  children: React.ReactNode;
}

export function MotionLazyConfig({ children }: MotionLazyConfigProps) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
