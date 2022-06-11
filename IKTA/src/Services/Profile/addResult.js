import { handleError } from '@/Services/api'

export default async (res, store) => {
  const profileState = store.getState().profile.item

  const { distance, rating } = res
  if (typeof distance !== 'number' || typeof rating !== 'number') {
    handleError({
      message:
        'Error! Wrong input data of result object when adding a result to profile stat',
    })
    return profileState
  }
  const { avgRating, avgDistance, length } = profileState.results

  console.log(distance, rating, avgRating, avgDistance, length)

  const newLength = length + 1
  const newAvgRating = (avgRating * length + rating) / newLength
  const newAvgDistance = Math.floor(
    (avgDistance * length + distance) / newLength,
  )

  /*console.log(
    {
      ...profileState,
      results: {
        length: newLength,
        avgRating: newAvgRating,
        avgDistance: newAvgDistance,
      },
    },
  )

  return profileState*/

  return {
    ...profileState,
    results: {
      length: newLength,
      avgRating: newAvgRating,
      avgDistance: newAvgDistance,
    },
  }
}