import { useMemo } from 'react'
import type { ImageProps, ImageSourcePropType } from 'react-native'
import { Image } from 'react-native'
import * as z from 'zod'

import { getAssetsContext } from '@/theme/assets/getAssetsContext'

type Properties = {
  readonly extension?: string
  readonly path: string
} & Omit<ImageProps, 'source'>

const images = getAssetsContext('images')

export function LocalAsset({ extension = 'png', path, ...props }: Properties) {
  const image = useMemo(() => {
    const getDefaultSource = () => z.custom<ImageSourcePropType>().parse(images(`./${path}.${extension}`))

    try {
      return getDefaultSource()
    } catch (error) {
      console.error(`Couldn't load the image: ${path}`, error)
      return undefined
    }
  }, [path, extension])

  return image && <Image source={image} testID="variant-image" {...props} />
}
