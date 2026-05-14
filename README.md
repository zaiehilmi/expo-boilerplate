<!--
README.md
expo-agro-rib

Created by Zaie Hilmi on 20/11/2024.
-->

# Boilerplate Expo

Projek ini mengutamakan konsep MVVM bersama dengan implementasi expo-router

---

<!-- TOC -->

- [BSNeBiz Mobile: versi React Native](#bsnebiz-mobile-versi-react-native)
  - [Bermula](#bermula)
    - [1. Dapatkan projek](#1-dapatkan-projek)
      - [(akan datang)](#akan-datang)
    - [2. Menjalankan projek](#2-menjalankan-projek)
      - [Persekitaran Pembangunan](#persekitaran-pembangunan)
    - [3. Tukar _Environment Variables_](#3-tukar-_environment-variables_)
    - [4. Pembinaan fail _release_](#4-pembinaan-fail-_release_)
    - [Penyediaan IDE](#penyediaan-ide)
      - [Visual Studio Code (VS Code)](#visual-studio-code-vs-code)
      - [IDE berteraskan Jetbrains IntelliJ](#ide-berteraskan-jetbrains-intellij)
  - [Ciri-ciri](#ciri-ciri)
    - [Expo Prebuild](#expo-prebuild)
  - [Ralat Umum](#ralat-umum)
  _ [Tak boleh jalankan projek Android di MacOS](#tak-boleh-jalankan-projek-android-di-macos)
  _ [Tak boleh membuat sambungan ke API secara tiba-tiba di iOS](#tak-boleh-membuat-sambungan-ke-api-secara-tiba-tiba-di-ios)
  <!-- TOC -->

## Bermula

### 1. Dapatkan projek

```bash
  git clone https://github.com/zaiehilmi/expo-boilerplate
```

### 2. Menjalankan projek

#### Persekitaran Pembangunan

| item | versi     |
|------|-----------|
| node | `>=20.0`  |
| bun  | `>=1.2.4` |

Pastikan juga untuk mengikuti panduan dari [React Native Docs](https://reactnative.dev/docs/set-up-your-environment)

kemudian jalankan perintah ini untuk memuatkan semua pakej:

```bash
bun install
```

> Jika perlu untuk refresh prebuild, jalankan ni
>
> ```bash
> bun clean
> ```

Selepas selesai semua, jalankan perintah ini

```bash
bun start
bun android # atau bun ios

# atau

bun run
```

### 3. Tukar _Environment Variables_

sila lakukan pengubahsuaian di file `.env` dengan comment dan uncomment.
Perkara ini disebabkan kesukaran untuk build release jika terdapat banyak file `.env*`

### 4. Pembinaan fail _release_

1. Semak fail `.env` untuk perubahan environment
2. Buka fail `app.config.js`
3. Naikkan `version` bagi setiap release

```js
  android: {
    version: '4.0.0 build 1', // to update on buildNo for every new release
    versionCode: 57, // to update only if build for prod
    },

  ios: {
    version: '4.0.0',
    buildNumber: '1', // to update for every new release
    }
```

4. Jalankan perintah berikut

```bash
  bun install
  bun build:android # atau bun build:ios
```

5. Lihat APK android di folder `build/`.
   > #### Arahan khusus untuk iOS
   >
   > berbeza dengan android, android dah siap sign tapi ios belum lagi  
   > TODO: akan datang arahan untuk ios

### Penyediaan IDE

> ### Perhatian ❗
>
> Sebelum memulakan pembangunan, adalah penting untuk meneliti dan memahami corak pembangunan yang telah digunakan
> sebelum ini. Amalan ini bukan sahaja terpakai untuk projek ini, tetapi juga untuk semua projek perisian yang lain.
>
> Memahami dan mematuhi corak pembangunan sedia ada merupakan salah satu asas penting dalam pembangunan perisian
> yang berkesan.

#### Visual Studio Code (VS Code)

1. Tailwind
    - Muat turun [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (wajib) dan [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold) (pilihan) dari Extensions: Marketplace
2. Biome
    - Muat turun [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) dari Extensions: Marketplace


#### IDE berteraskan Jetbrains IntelliJ

1. Biome
    - Pergi ke Setting (`ctrl`/`cmd` + `,`)
    - cari `Biome`
    - tekan pada radio box `Automatic Biome configuration`
2. Format
    - Pergi ke Setting (`ctrl`/`cmd` + `,`)
    - cari `actions on save`
    - Nyah-pilih semua tapi hanya pilih:
        - Run Biome format
        - Run Biome apply safe fixes
        - Run Biome sort import
3. Tailwind
    - Muat turun atau Enable plugin Tailwind CSS

## Ciri-ciri

| Ciri        | Pakej/Huraian                                                                              | status |
|-------------|--------------------------------------------------------------------------------------------|:------:|
| .env        | [Environment variables in Expo](https://docs.expo.dev/guides/environment-variables/)       |   ✅    |
| Custom font | font Inter dan Nunito                                                                      |   ✅    |
| SSL Pinning | [@bam.tech/react-native-app-security](https://github.com/bamlab/react-native-app-security) |   X    |

### Expo Prebuild

Dengan adanya Expo Prebuild, anda sebagai pembangun dah tak boleh buat konfigurasi secara terus di dalam direktori `android` dan `ios`.
Sila gunakan plugin config. Rujuk pautan di bawah

- [Config plugins: Introduction](https://docs.expo.dev/config-plugins/introduction/)
- [Tutorial: Create a module with a config plugin](https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial/)
- [Properties in `app.json` / `app.config.ts`](https://docs.expo.dev/versions/latest/config/app/)
  > ada banyak lagi. pergi kat website [Expo Documentation](https://docs.expo.dev)

Segala plugins yang dicipta hendaklah masuk dalam `plugins/`.

## Panduan

### I. Memasukkan module bridge baru
module bridge ialah module yang ada code android (Kotlin/Java) dan ios (Swift/Obj-C) kemudian disatukan ke dalam 
typescript.

Projek ini menggunakan [Expo Prebuild](#expo-prebuild). Untuk memasukkan bridge baru, jika dari
- Expo: expo ada command `bun create-expo-module new-bridge-module` akan auto masuk ke dalam `modules/`
- Module lain macam upass: terus je masukkan dalam `modules/`

Tak perlu update dalam `package.json` sebab Expo dah handle semua tu guna autolinking.

## Ralat Umum

### Tak boleh jalankan projek Android di MacOS

ini adalah disebabkan seni bina emulator yang hanya ada arm64.

Penyelesaian: **jalankan projek di telefon android sebenar**

### Tak boleh membuat sambungan ke API secara tiba-tiba di iOS

Penyelesaian: jalankan perintah ini

```bash
xcrun simctl shutdown all
xcrun simctl erase all
```
