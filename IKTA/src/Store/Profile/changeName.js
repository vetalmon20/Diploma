import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import changeNameService from '@/Services/Profile/changeName'

export default {
  initialState: buildAsyncState('changeName'),
  action: buildAsyncActions('profile/changeName', changeNameService),
  reducers: buildAsyncReducers({
    errorKey: 'changeName.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'changeName.loading',
  }),
}
