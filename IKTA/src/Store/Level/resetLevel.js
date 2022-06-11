import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import resetLevelService from '@/Services/Level/resetLevel'

export default {
  initialState: buildAsyncState('resetLevel'),
  action: buildAsyncActions('level/resetLevel', resetLevelService),
  reducers: buildAsyncReducers({
    errorKey: 'resetLevel.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'resetLevel.loading',
  }),
}
