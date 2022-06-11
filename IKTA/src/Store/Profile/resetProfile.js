import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import resetProfileService from '@/Services/Profile/resetProfile'

export default {
  initialState: buildAsyncState('resetProfile'),
  action: buildAsyncActions('profile/resetProfile', resetProfileService),
  reducers: buildAsyncReducers({
    errorKey: 'resetProfile.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'resetProfile.loading',
  }),
}
