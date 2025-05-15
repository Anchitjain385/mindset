
import { toast } from '@/hooks/use-toast';
import { Sound, SoundName } from './types';
import { SOUND_URLS } from './constants';
import { formatSoundName, getSoundIcon } from './utils';
import { SoundEffect } from '@/types/analysis';

class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private volumes: Map<string, number> = new Map();
  private isInitialized: boolean = false;
  private isActivated: boolean = false;
  
  constructor() {
    // Initialize sounds when needed (lazy loading)
    this.initialize();
  }
  
  private initialize() {
    if (this.isInitialized) return;
    
    try {
      // Create audio elements for each sound
      Object.entries(SOUND_URLS).forEach(([name, url]) => {
        const audio = new Audio(url);
        audio.loop = true;
        audio.volume = 0;
        audio.preload = 'none'; // Only load when activated
        
        this.sounds.set(name, audio);
        this.volumes.set(name, 0);
        
        // Add event listeners for debugging
        audio.addEventListener('error', (e) => {
          console.error(`Error loading sound ${name}:`, e);
        });
        
        audio.addEventListener('canplaythrough', () => {
          console.log(`Sound ${name} is ready to play`);
        });
      });
      
      this.isInitialized = true;
      console.log('Audio service initialized successfully');
    } catch (error) {
      console.error('Error initializing sounds:', error);
      toast({
        title: 'Sound Error',
        description: 'Unable to initialize sound files. Please try refreshing the page.',
        variant: 'destructive'
      });
    }
  }
  
  public preloadSounds() {
    this.initialize();
    
    const preloadPromises = Array.from(this.sounds.entries()).map(([name, audio]) => {
      return new Promise<void>((resolve) => {
        console.log(`Preloading sound: ${name}`);
        audio.preload = 'auto';
        audio.load();
        
        const onCanPlay = () => {
          audio.removeEventListener('canplaythrough', onCanPlay);
          console.log(`Preloaded sound: ${name}`);
          resolve();
        };
        
        // Handle errors
        const onError = () => {
          console.log(`Error loading ${name}, resolving anyway`);
          audio.removeEventListener('error', onError);
          resolve();
        };
        
        audio.addEventListener('canplaythrough', onCanPlay, { once: true });
        audio.addEventListener('error', onError, { once: true });
        
        // Resolve after timeout even if not loaded to prevent hanging
        setTimeout(resolve, 3000);
      });
    });
    
    return Promise.all(preloadPromises)
      .then(() => {
        console.log('All sounds preloaded');
        return true;
      })
      .catch(err => {
        console.error('Error preloading sounds:', err);
        return false;
      });
  }
  
  public activateSounds() {
    if (this.isActivated) return Promise.resolve(true);
    
    // Force activation without waiting for preload
    this.isActivated = true;
    
    // Let the user know we're activated
    toast({
      title: 'Sound Activation',
      description: 'Sounds enabled successfully! Adjust the volume sliders to hear them.',
      variant: 'default'
    });
    
    return Promise.resolve(true);
  }
  
  public getAvailableSounds(): SoundEffect[] {
    this.initialize();
    
    return Object.keys(SOUND_URLS).map(name => ({
      name: formatSoundName(name),
      url: SOUND_URLS[name as keyof typeof SOUND_URLS],
      volume: this.volumes.get(name) || 0,
      isPlaying: this.isSoundPlaying(name),
      icon: getSoundIcon(name)
    }));
  }
  
  public setVolume(name: string, volume: number) {
    this.initialize();
    
    const sound = this.sounds.get(name);
    if (!sound) return;
    
    // Volume should be between 0 and 1
    const normalizedVolume = Math.max(0, Math.min(1, volume / 100));
    
    sound.volume = normalizedVolume;
    this.volumes.set(name, volume);
    
    // Start or stop playing based on volume
    if (normalizedVolume > 0) {
      if (sound.paused) {
        this.playSound(name).catch(err => {
          console.error('Error playing sound:', err);
          // Try playing without error message to user as we already enabled sounds
          sound.play().catch(() => {});
        });
      }
    } else if (normalizedVolume === 0 && !sound.paused) {
      this.stopSound(name);
    }
    
    console.log(`Set ${name} volume to ${volume}%, normalized: ${normalizedVolume}`);
  }
  
  public async playSound(name: string) {
    this.initialize();
    
    // Ensure sounds are activated
    if (!this.isActivated) {
      await this.activateSounds();
    }
    
    const sound = this.sounds.get(name);
    if (!sound) return Promise.reject(new Error(`Sound ${name} not found`));
    
    try {
      if (sound.paused) {
        console.log(`Attempting to play ${name}`);
        await sound.play();
        console.log(`${name} is now playing`);
      }
    } catch (error) {
      console.error(`Error playing ${name} sound:`, error);
      // Not throwing error as we want silent failures if activation isn't working
    }
  }
  
  public stopSound(name: string) {
    const sound = this.sounds.get(name);
    if (!sound) return;
    
    sound.pause();
    sound.currentTime = 0;
    console.log(`${name} sound stopped`);
  }
  
  public isSoundPlaying(name: string): boolean {
    const sound = this.sounds.get(name);
    return sound ? !sound.paused : false;
  }
  
  public stopAllSounds() {
    this.sounds.forEach((sound, name) => {
      sound.pause();
      sound.currentTime = 0;
      console.log(`${name} sound stopped`);
    });
  }
}

export default AudioManager;
