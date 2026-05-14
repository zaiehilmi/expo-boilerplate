import { useRouter } from 'expo-router'
import { DependencyList, useEffect } from 'react'
import { BackHandler } from 'react-native'

/**
 * Hanya berfungsi di `Android`. untuk guna di `iOS`, kena letak dalam `setOptions({gestureEnabled: false})`
 *
 * Cara baca dia sebenarnya use back to <nama path>. tiru Swift punya naming style
 *
 * Andaikan ada 3 skrin, A, B, C. anda pergi dari A -> B -> C tapi anda nak kembali dari C -> A. Boleh
 * juga jika anda nak back dari C -> B.
 * @param path jika undefined akan back ke previous screen
 */
export function useBackTo(path?: string): VoidFunction {
  const router = useRouter()

  const actionOnBack = () => {
    if (path) {
      router.dismissTo(path)
    } else {
      router.back()
    }
  }

  useBackHandler(() => {
    actionOnBack()

    return true
  }, [path])

  return actionOnBack
}

function useBackHandler(handler: () => boolean, deps: DependencyList = []) {
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', handler)

    return () => {
      sub.remove()
    }
  }, [handler, ...deps])
}
