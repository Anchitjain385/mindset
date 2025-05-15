
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.MindNext.32b25fc0704f458f89f840e83a8e1558',
  appName: 'mindnest-emotion-bloom',
  webDir: 'dist',
  server: {
    url: 'https://32b25fc0-704f-458f-89f8-40e83a8e1558.MindNextproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: true
    }
  }
};

export default config;
