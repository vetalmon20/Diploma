import { handleError } from '@/Services/api'

export default async (uri, store) => {
  const profileState = store.getState().profile.item

  if (typeof uri !== 'string') {
    handleError({
      message:
        'Error! Wrong input data of photo uri when updating photo of profile stat',
    })
    return profileState
  }
  return {
    ...profileState,
    photo: uri,
  }
}
