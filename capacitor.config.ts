import { CapacitorConfig } from '@capacitor/cli';

interface ExtendedCapacitorConfig extends CapacitorConfig {
  versionName?: string;
  versionCode?: number;
} 

const config: ExtendedCapacitorConfig = {
  appId: 'com.yatirimim.trader',
  appName: 'Yatırımım Trader',
  versionName: "1.3.0",
  versionCode: 10300,
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    'SplashScreen': {
      launchShowDuration: 1000,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    }
  }
};

export default config;
