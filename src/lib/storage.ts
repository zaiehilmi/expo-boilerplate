/** untuk menambah item baharu dalam storan, ikuti langkah demi langkah yang diberikan */

import { createMMKV } from 'react-native-mmkv'
import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand/react'

import { SupportedLanguages } from '@/hooks/language/schema'

export const storage = createMMKV()

type StorageState = {
  // Tambah item baharu: langkah 1
  language: SupportedLanguages | null
}

type StorageAction = {
  actions: {
    // Tambah item baharu: langkah 2
    setLanguage: (language: SupportedLanguages | null) => void
    clear: () => void
  }
}

const initialState: StorageState = {
  // Tambah item baharu: langkah 3
  language: null,
}

export const useStorage = create<StorageState & StorageAction>()(
  persist(
    (set) => ({
      ...initialState,

      actions: {
        // Tambah item baharu: langkah 4
        setLanguage: (language) => {
          set({ language })
        },
        clear: () => {
          set({ ...initialState })
        },
      },
    }),
    {
      name: 'agro-storage',
      partialize: (state) => ({
        // Tambah item baharu: langkah 5
        language: state.language,
      }),
      storage: createJSONStorage(() => ({
        getItem: (key) => storage.getString(key) ?? null,
        setItem: (key, value) => {
          storage.set(key, value)
        },
        removeItem: (key) => {
          storage.remove(key)
        },
      })),
    },
  ),
)
