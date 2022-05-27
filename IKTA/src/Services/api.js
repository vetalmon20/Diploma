import axios from 'axios'

import Config from 'react-native-config'
import { onlyDebugLog } from '@/Utils'

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

export const handleError = ({ message, data, status, config }) => {
  onlyDebugLog(
    `message: ${message}, data: ${JSON.stringify(
      data,
    )}, status: ${status} config: ${JSON.stringify(config)}`,
  )
  return Promise.reject({ message, data, status })
}

/**
 * Adding interceptor, that will be executed before then or catch.
 * This interceptor will be executed only with response errors.
 */
instance.interceptors.response.use(
  response => response,
  ({ message, config, response: { data, status } }) => {
    return handleError({ message, data, status, config })
  },
)

export default instance
