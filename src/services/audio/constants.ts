
import { SoundUrls } from './types';

// Sound URLs collection - using more reliable audio sources
export const SOUND_URLS: SoundUrls = {
  rain: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1963402707.mp3',
  forest: 'https://cdn.pixabay.com/download/audio/2021/10/18/audio_346392e25f.mp3',
  waves: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_b265a8a525.mp3', 
  birds: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447803bd.mp3',
  chimes: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_22268e788e.mp3',
};

// Icons mapping for each sound
export const SOUND_ICONS: Record<string, string> = {
  rain: '🌧️',
  forest: '🌲',
  waves: '🌊',
  birds: '🐦',
  chimes: '🎐',
};
