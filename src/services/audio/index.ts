
import AudioManager from './audioManager';

// Create and export a singleton instance of AudioManager
export const audioService = new AudioManager();

// Re-export types for convenience
export * from './types';
