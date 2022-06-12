import { handleError } from '@/Services/api'

export default async (pass, store) => {
  const profileState = store.getState().profile.item

  if (typeof pass !== 'string') {
    handleError({
      message: 'Error! Wrong pass',
    })
    return profileState
  }
  return {
    ...profileState,
    pass: pass,
  }
}
