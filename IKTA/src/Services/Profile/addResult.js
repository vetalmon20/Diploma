import { handleError } from '@/Services/api'

export default async (res, store) => {
  const profileState = store.getState().level.profile
  const { distance, rating } = res
  if (!distance || !rating) {
    handleError({
      message:
        'Error! Wrong input data of result object when adding a result to profile stat',
    })
    return profileState
  }
  const { avgRating, avgDistance, length } = profileState

  const newLength = length + 1
  const newAvgRating = (avgRating * length + rating) / newLength
  const newAvgDistance = (avgDistance * length + distance) / newLength

  return {
    ...profileState,
    results: {
      length: newLength,
      avgRating: newAvgRating,
      avgDistance: newAvgDistance,
    },
  }
}
