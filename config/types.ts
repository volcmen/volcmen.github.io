import type { LucideIcon } from 'lucide-react';

export interface ThemeColors {
  text: string;
  border: string;
  bg: string;
}

export interface BaseConfigItem {
  icon: LucideIcon;
  colors: ThemeColors;
}
