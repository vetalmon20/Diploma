import CITIES from '@/Constants/Cities'
import { handleError } from '@/Services/api'
import resetLevel from '@/Store/Level/resetLevel'

export default async (city, store) => {
  const profileState = store.getState().profile.item
  await store.dispatch(resetLevel.action())

  if (typeof city !== 'string' && !CITIES[city]) {
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
