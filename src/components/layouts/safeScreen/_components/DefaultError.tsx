import { useErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'

import { LocalIcon } from '@/components/LocalIcon'

type Props = {
  readonly onReset?: () => void
}

export function DefaultErrorScreen({ onReset = undefined }: Props) {
  const { t } = useTranslation()
  const { resetBoundary } = useErrorBoundary()

  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <Text className="size-11">🔥</Text>
      <LocalIcon path="fire" height={42} width={42} stroke="red" />
      <Text className="text-base font-bold text-gray-800">{t('error_boundary.title')}</Text>

      <Text className="text-center text-xs font-bold text-gray-800">{t('error_boundary.description')}</Text>

      {onReset ? (
        <TouchableOpacity
          onPress={() => {
            resetBoundary()
            onReset?.()
          }}
        >
          <Text className="text-base text-gray-800">{t('error_boundary.cta')}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
