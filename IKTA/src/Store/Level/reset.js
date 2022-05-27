import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import resetService from '@/Services/Level/reset'

export default {
  initialState: buildAsyncState('reset'),
  action: buildAsyncActions('level/reset', resetService),
  reducers: buildAsyncReducers({
    errorKey: 'reset.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'reset.loading',
  }),
}
