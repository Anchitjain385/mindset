
import { SOUND_ICONS } from './constants';

/**
 * Format a sound name with proper capitalization
 */
export const formatSoundName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * Get the icon for a specific sound
 */
export const getSoundIcon = (name: string): string => {
  return SOUND_ICONS[name] || '🔊';
};
