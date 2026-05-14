export type AssetType = 'icons' | 'images'

export const getAssetsContext = (type: AssetType) =>
  type === 'images'
    ? require.context('./images', true, /\.(png|jpg|jpeg|gif|webp)$/)
    : require.context('/icons', true, /\.svg$/)
