import * as Crypto from 'expo-crypto'
import * as SecureStore from 'expo-secure-store'

const KEY_LENGTH_BYTES = 32 // 256-bit key
const HEX_RADIX = 16

export const SecureKeyManager = {
  MMKV_ENCRYPTION_KEY: 'mmkv_master_key_v1',

  async generateSecureKey(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(KEY_LENGTH_BYTES)
    return Array.from(randomBytes, (byte) => byte.toString(HEX_RADIX).padStart(2, '0')).join('')
  },

  async initializeMMKVKey(): Promise<string> {
    try {
      // semak jika encryption key untuk mmkv telah wujud dalam KeyStore/Keychain
      let mmkvKey = await SecureStore.getItemAsync(this.MMKV_ENCRYPTION_KEY)

      if (!mmkvKey) {
        mmkvKey = await this.generateSecureKey()
        await SecureStore.setItemAsync(this.MMKV_ENCRYPTION_KEY, mmkvKey)
      }

      return mmkvKey
    } catch (error) {
      throw new Error(`MMKV key initialization failed: ${error}`)
    }
  },

  async deleteAllKeys(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.MMKV_ENCRYPTION_KEY)
      console.info('All keys deleted successfully')
    } catch (error) {
      console.error('Key deletion failed:', error)
    }
  },
}
