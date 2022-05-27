import Config from 'react-native-config'

import api, { handleError } from '@/Services/api'

export default async (lat, lng) => {
  const key = Config.GOOGLE_MAPS_API_KEY
  const data = await api
    .get(`streetview/metadata`, {
      params: { key: key, location: lat + ',' + lng },
    })
    .then(res => res.data)
    .catch(err => handleError({ message: err }))

  return data
}
