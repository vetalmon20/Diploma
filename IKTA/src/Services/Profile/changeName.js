import { handleError } from '@/Services/api'

export default async (name, store) => {
  const profileState = store.getState().level.profile

  if (typeof name !== 'string') {
    handleError({
      message:
        'Error! Wrong input data of name when updating photo of profile stat',
    })
    return profileState
  }
  return {
    ...profileState,
    name: name,
  }
}
