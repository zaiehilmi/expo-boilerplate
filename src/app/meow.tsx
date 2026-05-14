import { Stack, useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native'

import { BackButton } from '@/components/header/BackButton'

export default function Meow() {
  const router = useRouter()

  return (
    <View className="flex-1 bg-indigo-100">
      <Stack.Screen options={{ headerLeft: () => <BackButton backToPath="/" /> }} />
      <Text>djadiajksa</Text>
      <Button
        title="pergii"
        onPress={() => {
          router.push('/wani')
        }}
      />
    </View>
  )
}
