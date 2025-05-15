
export interface Sound {
  name: string;
  url: string;
  audio: HTMLAudioElement;
  volume: number;
}

export type SoundName = 'rain' | 'forest' | 'waves' | 'birds' | 'chimes';

export interface SoundUrls {
  [key: string]: string;
}
