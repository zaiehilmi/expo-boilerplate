import Reactotron, { ReactotronReactNative } from 'reactotron-react-native'
import mmkvPlugin from 'reactotron-react-native-mmkv'
import { QueryClientManager, reactotronReactQuery } from 'reactotron-react-query'
import { queryClient } from '@/lib/queryClient'
import { storage } from '@/lib/storage'

const queryClientManager = new QueryClientManager({
  queryClient,
})

// biome-ignore lint/correctness/useHookAtTopLevel: panggil macam gini je
Reactotron.configure({
  name: 'React Native App',
  onDisconnect: () => {
    queryClientManager.unsubscribe()
  },
})
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .use(mmkvPlugin<ReactotronReactNative>({ storage }))
  .use(reactotronReactQuery(queryClientManager))
  .connect()
