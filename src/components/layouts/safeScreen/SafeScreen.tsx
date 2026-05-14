import type { PropsWithChildren } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import type { SafeAreaViewProps } from 'react-native-safe-area-context'

import { LoadingScreen } from '@/components/layouts/LoadingScreen'
import { DefaultErrorScreen } from '@/components/layouts/safeScreen/_components/DefaultError'
import { ErrorBoundary } from '@/components/layouts/safeScreen/_components/ErrorBoundary'
import { UserInactivityProvider } from '@/components/layouts/safeScreen/_components/UserInactivityProvider'

type Props = PropsWithChildren<
  {
    readonly isError?: boolean
    readonly onResetError?: () => void
    readonly bottomStyle?: StyleProp<ViewStyle>
    readonly topStyle?: StyleProp<ViewStyle>
    readonly enableTop?: boolean
    readonly enableBottom?: boolean
    readonly onTimeout?: () => void
    readonly disableTimeout?: boolean
    readonly isLoading?: boolean
  } & Omit<SafeAreaViewProps, 'mode'>
>

/**
 * Perlu diletakkan pada setiap skrin. Letakkan `<safeScreen>` di hierarki induk (parent) paling atas di setiap
 * pembinaan skrin.
 *
 * Contoh penggunaan:
 * ``` typescript
 * return (
 *  <safeScreen enableTop>
 *    // children
 *  <safeScreen/>
 * )
 * ```
 *
 * @param children
 * @param isError
 * @param onResetError
 * @param enableTop skrin akan sampai di belakang status bar
 * @param disableBottom skrin akan sampai ke belakang navigation bar. buat kalau skrin ni takde scrolling
 * @param style
 * @param disableTimeout buang kiraan timeout jika user takde interaksi.
 * @param isLoading paparkan loading spinner di atas children jika true
 * @param props
 * @constructor
 */
export function SafeScreen({
  children = undefined,
  isError = false,
  onResetError = undefined,
  enableTop = false,
  enableBottom = false,
  disableTimeout = false,
  isLoading = false,
  style,
  ...props
}: Props) {
  // const { layouts, navigationTheme, variant, backgrounds } = useTheme()
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  // const actions = useSessionStore(state => state.actions)
  // const sessionState = useSessionStore(state => state.sessionState)

  const $topStyle = props.topStyle ?? { backgroundColor: 'transparent' }
  const $bottomStyle = props.bottomStyle ?? { backgroundColor: 'transparent' }

  return (
    <UserInactivityProvider
      disable
      onTimeout={() => {
        // if (sessionState === SessionState.AUTHORIZED) {
        //   actions.onLogout()
        //   navigation.replace(Paths.LogoutScreen, { tag: 'timerLogout' })
        // }
        props.onTimeout?.()
      }}
    >
      {enableTop ? <View className="pt-safe" style={[$topStyle]} /> : undefined}

      <View {...props} className={`pl-safe pr-safe flex-1 ${props.className}`}>
        <ErrorBoundary onReset={onResetError}>
          {isError ? (
            <DefaultErrorScreen onReset={onResetError} />
          ) : (
            <>
              {children}
              <LoadingScreen isLoading={isLoading} />
            </>
          )}
        </ErrorBoundary>
      </View>

      {enableBottom ? <View className="pb-safe" style={[$bottomStyle]} /> : undefined}
    </UserInactivityProvider>
  )
}
