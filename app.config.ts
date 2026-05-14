import type { ExpoConfig } from '@expo/config'

const expoFontsPlugin: [string, any] = [
  'expo-font',
  {
    fonts: [
      './assets/fonts/Ginger-Joy/GingerJoy-Bold.otf',
      './assets/fonts/Ginger-Joy/GingerJoy-Italic.otf',
      './assets/fonts/Ginger-Joy/GingerJoy-Light.otf',
      './assets/fonts/Ginger-Joy/GingerJoy-Regular.otf',
      './assets/fonts/Ginger-Joy/GingerJoy-Semibold.otf',
    ],
    android: {
      fonts: [
        {
          fontFamily: 'Ginger Joy',
          fontDefinitions: [
            {
              path: './assets/fonts/Ginger-Joy/GingerJoy-Bold.otf',
              weight: 700,
              style: 'normal',
            },
            {
              path: './assets/fonts/Ginger-Joy/GingerJoy-Italic.otf',
              weight: 400,
              style: 'italic',
            },
            {
              path: './assets/fonts/Ginger-Joy/GingerJoy-Light.otf',
              weight: 300,
              style: 'normal',
            },
            {
              path: './assets/fonts/Ginger-Joy/GingerJoy-Regular.otf',
              weight: 400,
              style: 'normal',
            },
            {
              path: './assets/fonts/Ginger-Joy/GingerJoy-Semibold.otf',
              weight: 600,
              style: 'normal',
            },
          ],
        },
      ],
    },
  },
]

const config: ExpoConfig = {
  name: 'Agrobank',
  slug: 'agro-rib',
  scheme: 'agro-rib-scheme',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.anonymous.agrorib',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.anonymous.agrorib',
  },
  plugins: [
    'expo-router',
    expoFontsPlugin,
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission: 'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
      },
    ],
  ],
}

export default config
