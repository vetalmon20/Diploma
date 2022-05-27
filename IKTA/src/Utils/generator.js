import { onlyDebugLog } from '.'

const generateRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min
}

export const generateRandomCoordinates = bounds => {
  if (!bounds || !bounds.northeast || !bounds.southwest) {
    onlyDebugLog(
      'Corrupted bounds received! (Error in generator.js). Bounds object:',
      bounds,
    )
    return
  }

  if (
    bounds.northeast.lat < bounds.southwest.lat ||
    bounds.northeast.lng < bounds.southwest.lng
  ) {
    onlyDebugLog(
      'Wrong bounds received! (Error in generator.js) Bounds object:',
      bounds,
    )
    return
  }

  const coordinates = {}
  coordinates['lat'] = generateRandomNumber(
    bounds.southwest.lat,
    bounds.northeast.lat,
  )
  coordinates['lng'] = generateRandomNumber(
    bounds.southwest.lng,
    bounds.northeast.lng,
  )

  return coordinates
}
