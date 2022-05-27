import { handleError } from '@/Services/api'

export default async (res, store) => {
  const levelState = store.getState().level.item
  if (levelState && Array.isArray(levelState)) {
    const levelStateCopy = [...levelState]
    levelStateCopy.push(res)
    return levelStateCopy
  }

  handleError({
    message: 'Unexpected error with adding level result into level array!',
    data: levelState,
  })

  return levelState
}
