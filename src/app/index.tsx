import { Stack, useRouter } from 'expo-router'
import { Button, Text } from 'react-native'
import { LocalAsset } from '@/components/LocalAsset'
import { SafeScreen } from '@/components/layouts/safeScreen/SafeScreen'

export default function App() {
  const router = useRouter()

  return (
    <SafeScreen
      disableTop
      disableBottom
      isLoading={false}
      className="items-center justify-center bg-amber-100"
    >
      <Stack.Screen options={{ headerShown: true }} />

      <LocalAsset path="tom" style={{ height: 300, width: 300 }} resizeMode="contain" />
      <Text className="font-sans font-light">Open up app/index.tsx to start working on your app!</Text>
      <Button
        title="pergii"
        onPress={() => {
          router.push('/meow')
        }}
      />
    </SafeScreen>
  )
}
