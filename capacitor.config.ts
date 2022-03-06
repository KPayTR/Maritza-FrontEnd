import { CapacitorConfig } from '@capacitor/cli';

interface ExtendedCapacitorConfig extends CapacitorConfig {
  versionName?: string;
  versionCode?: number;
} 

const config: ExtendedCapacitorConfig = {
  appId: 'com.yatirimim.trade',
  appName: 'Yatırım Trade',
  versionName: "1.1.1",
  versionCode: 10101,
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    'SplashScreen': {
      launchShowDuration: 1000,
      launchAutoHide: false,
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      splashFullScreen: false,
      splashImmersive: false
    }
  }
};

export default config;
