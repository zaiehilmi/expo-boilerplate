import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

import { BackButton } from '@/components/header/BackButton'

export default function Wani() {
  return (
    <View className="flex-1 bg-indigo-100">
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerLeft: () => <BackButton backToPath="/" />,
        }}
      />
      <Text>wani</Text>
    </View>
  )
}
