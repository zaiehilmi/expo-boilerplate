import { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Easing } from 'react-native'

type Props = {
  readonly isLoading?: boolean
}

export function LoadingScreen({ isLoading = false }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isLoading ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [fadeAnim, isLoading])

  return (
    <Animated.View
      pointerEvents={isLoading ? 'auto' : 'none'}
      className="absolute inset-0 items-center justify-center bg-gray-300/50"
      style={{ opacity: fadeAnim }}
    >
      <ActivityIndicator className="text-white" size="large" />
    </Animated.View>
  )
}
