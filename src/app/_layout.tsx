import '../../global.css'
import 'react-native-reanimated'
import '@/translation'

import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaListener, SafeAreaProvider } from 'react-native-safe-area-context'
import { Uniwind } from 'uniwind'

import { queryClient } from '@/lib/queryClient'

if (__DEV__) {
  import('@/reactotron.config')
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaListener
          onChange={({ insets }) => {
            Uniwind.updateInsets(insets)
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerBackButtonDisplayMode: 'minimal',
                headerTitleStyle: { fontSize: 16, fontFamily: 'Ginger Joy', fontWeight: '500' },
                headerStyle: {
                  backgroundColor: '#CE0C14',
                },
                contentStyle: {
                  backgroundColor: '#FFFFFF',
                },
              }}
            />
            <StatusBar style="light" />
          </QueryClientProvider>
        </SafeAreaListener>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
