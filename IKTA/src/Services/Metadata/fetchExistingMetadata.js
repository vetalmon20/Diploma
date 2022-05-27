import { Config } from '@/Config'
import api, { handleError } from '@/Services/api'
import fetchMetadata from './fetchMetadata'
import { generateRandomCoordinates } from '@/Utils'

export default async bounds => {
  let STATUS_CODE = ''
  let numOfCalls = 0
  let finalData = {}
  let coordinates = {}
  while (STATUS_CODE != Config.METADATA_STATUS_CODE.OK && numOfCalls < 5) {
    coordinates = generateRandomCoordinates(bounds)
    if (!coordinates.lat || !coordinates.lng) {
      return handleError({
        message: `Wrong coordinates in fetchExistingMetadata.js. Lat:${lat}; lng:${lng}`,
      })
    }
    finalData = await fetchMetadata(coordinates.lat, coordinates.lng)
    STATUS_CODE = finalData.status
    numOfCalls++
    console.log('STATUS_CODE', STATUS_CODE, 'numOfCalls', numOfCalls)
  }

  console.log(
    finalData,
    ' - finalData. Coords:',
    coordinates.lat,
    coordinates.lng,
    '. numOfCalls - ',
    numOfCalls,
  )

  return {
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    radius: 50,
  }
}
