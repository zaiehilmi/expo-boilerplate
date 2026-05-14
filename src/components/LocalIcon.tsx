import type { ReactElement } from 'react'
import { useMemo } from 'react'
import type { SvgProps } from 'react-native-svg'
import * as z from 'zod'

import { getAssetsContext } from '@/theme/assets/getAssetsContext'

type Properties = {
  readonly path: string
} & SvgProps

const icons = getAssetsContext('icons')
const EXTENSION = 'svg'
const SIZE = 24

export function LocalIcon({ height = SIZE, path, width = SIZE, ...props }: Properties) {
  const iconProperties = { ...props, height, width }
  const Icon = useMemo(() => {
    try {
      const getDefaultSource = () =>
        z
          .object({
            default: z.custom<React.FC<SvgProps>>(() => z.custom<ReactElement<SvgProps>>()),
          })
          .parse(icons(`./${path}.${EXTENSION}`)).default

      return getDefaultSource()
    } catch (error) {
      console.error(`Couldn't load the icon: ${path}.${EXTENSION}`, error)
      throw error
    }
  }, [path])

  return <Icon {...iconProperties} />
}
