import axios from 'axios'

import { prettifyJson } from '@/utils/api_utils'

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 3300,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  // const { token } = useSessionStore.getState();

  if (__DEV__) {
    console.log(`API endpoint: ${config.url}`)
    console.log(`API request: ${prettifyJson(config.data)}`)
  }

  // if (!skipJwt(config.url!) && token.get()) {
  //   config.headers.setAuthorization(`Bearer ${token.get()}`);
  // } else {
  //   console.info('tiada token JWT diletakkan di header');
  // }

  // if (__DEV__) {
  //   const sessId = config.data?.headerRequest?.sessionId;
  //   const token =
  //     config.headers?.Authorization || config.headers?.authorization;
  //   const id = config.data?.headerRequest?.id;
  //
  //   // console.debug(prettifyJson(config));
  //   console.debug(`🐥🐥🐥🐥🐥🐥 Tengok lah ni ok ke tak 🐥🐥🐥🐥🐥🐥🐥
  //   JWT Header\t: ${token !== undefined ? `OK - \t${token}` : 'X'}
  //   sessionId\t: ${sessId !== '' ? `OK - \t${sessId}` : 'X'}
  //   id\t\t: ${id !== undefined && id !== '' ? `OK - \t${id}` : 'X'}
  //   `);
  // }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    // const header: HeaderResponse = response.data.headerResponse;

    if (__DEV__) {
      console.log(`API response: ${prettifyJson(response.data)}`)
    }

    // traceNo.increment();

    // switch (header.responseCode) {
    //   case ResponseCode.SUCCESS:
    //     break;
    //   default:
    //     onApiResponseError(header);
    //     return Promise.reject(response.data?.headerResponse?.responseMessage);
    // }

    return response
  },

  (error) => {
    if (error.response.status === 401) {
      console.error('Sesi tamat. Sila kemas kini sessionId dan JWT untuk meneruskan sesi')

      // const actions = useSessionStore.getState().actions;
      // actions.onLogout();
    }
    if (axios.isAxiosError(error) && error.response) {
      console.error('Status Error:', error.response.status)
      console.error('Error Data:', error.response.data)
    } else {
      console.error('Ralat Lain:', error)
    }

    // Toast.show({
    //   title: `${i18n.t('bsnebiz:label.error')} [${error.response.status}]`,
    //   type: ALERT_TYPE.DANGER,
    //   textBody: error.response.data || i18n.t('bsnebiz:common_error'),
    // });
  },
)
