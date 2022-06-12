import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import setPassService from '@/Services/Profile/setPass'

export default {
  initialState: buildAsyncState('setPass'),
  action: buildAsyncActions('profile/setPass', setPassService),
  reducers: buildAsyncReducers({
    errorKey: 'setPass.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'setPass.loading',
  }),
}
