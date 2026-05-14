import { useFocusEffect } from 'expo-router'
import { type PropsWithChildren, useRef } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState, PanResponder, View } from 'react-native'

const INACTIVITY_TIMEOUT = 5 * 60 * 1000 // 5 minit

type Props = PropsWithChildren<{
  // Secara lalai 5 minit. letakkan nilai dalam bentuk seperti ini jika mahu ubah suai masanya: `5 * 60 * 1000` bermaksud 5 minit
  readonly timeoutAfter?: number
  readonly onTimeout?: () => void
  readonly disable?: boolean
}>

export function UserInactivityProvider({
  timeoutAfter = INACTIVITY_TIMEOUT,
  disable = false,
  ...props
}: Props) {
  const appState = useRef(AppState.currentState)
  const inactivityTimer = useRef<null | ReturnType<typeof setTimeout>>(null)
  const lastBackgroundTime = useRef<null | number>(null)

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current)
    }
    inactivityTimer.current = setTimeout(() => {
      props.onTimeout?.()
    }, timeoutAfter)
  }

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current === 'active' && /inactive|background/.test(nextAppState)) {
      lastBackgroundTime.current = Date.now()
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current)
      }
    }

    if (/inactive|background/.test(appState.current) && nextAppState === 'active') {
      if (lastBackgroundTime.current) {
        const elapsed = Date.now() - lastBackgroundTime.current
        if (elapsed >= timeoutAfter) {
          props.onTimeout?.()
        } else {
          resetInactivityTimer()
        }
        lastBackgroundTime.current = null
      } else {
        resetInactivityTimer()
      }
    }

    appState.current = nextAppState
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        if (!disable) {
          resetInactivityTimer()
        }
        return false
      },
    }),
  ).current

  useFocusEffect(() => {
    if (!disable) {
      const subscription = AppState.addEventListener('change', handleAppStateChange)
      resetInactivityTimer()

      return () => {
        subscription.remove()
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current)
        }
      }
    }
  })

  return (
    <View className="flex-1" {...(disable ? undefined : panResponder.panHandlers)}>
      {props.children}
    </View>
  )
}
