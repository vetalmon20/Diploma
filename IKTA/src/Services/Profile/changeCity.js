import { handleError } from '@/Services/api'

export default async (city, store) => {
  const profileState = store.getState().level.profile

  if (typeof city !== 'string') {
    handleError({
      message: 'Error! Wrong input data of city name when updating city',
    })
    return profileState
  }
  return {
    ...profileState,
    city: city,
  }
}
