/** untuk menambah item baharu dalam storan, ikuti langkah demi langkah yang diberikan */

import { createMMKV, MMKV } from 'react-native-mmkv'
import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand/react'

import { SecureKeyManager } from '@/services/secureKeyManager'

let secureStorage: MMKV | null

type StorageState = {
  // Tambah item baharu: langkah 1
  accessToken: string | null // JWT
}

type StorageAction = {
  actions: {
    // Tambah item baharu: langkah 2
    setAccessToken: (accessToken: string) => void
  }
}

const initialState: StorageState = {
  // Tambah item baharu: langkah 3
  accessToken: null,
}

export const useSecureStorage = create<StorageState & StorageAction>()(
  persist(
    (set) => ({
      ...initialState,

      actions: {
        // Tambah item baharu: langkah 4
        setAccessToken: (accessToken) => {
          set({ accessToken })
        },
        clear: () => {
          set({ ...initialState })
        },
      },
    }),
    {
      name: 'agro-secure-storage',
      partialize: (state) => ({
        // Tambah item baharu: langkah 5
        accessToken: state.accessToken,
      }),
      storage: createJSONStorage(() => ({
        setItem: async (name: string, value: string): Promise<void> => {
          await ensureMMKVReady()
          if (!secureStorage) {
            throw new Error('Encrypted MMKV not initialized')
          }
          secureStorage.set(name, value)
        },

        getItem: async (name: string): Promise<string | null> => {
          await ensureMMKVReady()
          if (!secureStorage) {
            throw new Error('Encrypted MMKV not initialized')
          }
          return secureStorage.getString(name) ?? null
        },

        removeItem: async (name: string): Promise<void> => {
          await ensureMMKVReady()
          if (!secureStorage) {
            throw new Error('Encrypted MMKV not initialized')
          }
          secureStorage.remove(name)
        },
      })),
    },
  ),
)

// MARK: Utiliti

let initPromise: Promise<void> | null = null

function ensureMMKVReady() {
  initPromise ??= SecureKeyManager.initializeMMKVKey()
    .then((key) => {
      secureStorage = createMMKV({
        id: 'encrypted-storage',
        encryptionKey: key,
      })
    })
    .catch((error: unknown) => {
      initPromise = null
      throw error
    })

  return initPromise
}
