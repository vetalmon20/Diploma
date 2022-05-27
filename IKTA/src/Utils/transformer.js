import { onlyDebugLog } from '.'

const getCenterNumber = (bigger, smaller) => {
  return bigger - Math.abs((bigger - smaller) / 2)
}

export const getCenterCoordinates = bounds => {
  if (!bounds || !bounds.northeast || !bounds.southwest) {
    onlyDebugLog(
      'Corrupted bounds received! (Error in generator.js). Bounds object:',
      bounds,
    )
  }
  console.log(bounds, ' - bounds')
  return {
    latitude: getCenterNumber(bounds.northeast.lat, bounds.southwest.lat),
    longitude: getCenterNumber(bounds.northeast.lng, bounds.southwest.lng),
  }
}
