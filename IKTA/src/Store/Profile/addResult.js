import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import addResultService from '@/Services/Profile/addResult'

export default {
  initialState: buildAsyncState('addResult'),
  action: buildAsyncActions('profile/addResult', addResultService),
  reducers: buildAsyncReducers({
    errorKey: 'addResult.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'addResult.loading',
  }),
}
