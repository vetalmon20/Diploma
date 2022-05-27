import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import changeCityService from '@/Services/Profile/changeCity'

export default {
  initialState: buildAsyncState('changeCity'),
  action: buildAsyncActions('profile/changeCity', changeCityService),
  reducers: buildAsyncReducers({
    errorKey: 'changeCity.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'changeCity.loading',
  }),
}
