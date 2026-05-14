import { TouchableOpacity } from 'react-native'
import { LocalIcon } from '@/components/LocalIcon'
import { useBackTo } from '@/hooks/useBackTo'

type Props = {
  readonly backToPath?: string
}

export function BackButton({ ...props }: Props) {
  const backHandler = useBackTo(props.backToPath)

  return (
    <TouchableOpacity onPress={backHandler}>
      <LocalIcon path="arrow-right" />
    </TouchableOpacity>
  )
}
