const { getDefaultConfig } = require('expo/metro-config')
const { withUniwindConfig } = require('uniwind/metro')

const config = (() => {
  const config = getDefaultConfig(__dirname)
  const { transformer, resolver } = config
  const { assetExts, sourceExts } = resolver

  return {
    ...config,
    transformer: {
      ...transformer, // jangan buang preset dan inlineRequires
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      unstable_allowRequireContext: true, // diperlukan untuk expo-router > nested dynamic require  [oai_citation:1‡stackoverflow.com](https://stackoverflow.com/questions/79608807/expo-react-native-error-turbomoduleregistry-getenforcing-platformconstan)
    },
    resolver: {
      ...resolver, // jaga assetPlugins dan lainnya
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  }
})()

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  polyfills: { rem: 14 },
})
