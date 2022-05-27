import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import changePhotoService from '@/Services/Profile/changePhoto'

export default {
  initialState: buildAsyncState('changePhoto'),
  action: buildAsyncActions('profile/changePhoto', changePhotoService),
  reducers: buildAsyncReducers({
    errorKey: 'changePhoto.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'changePhoto.loading',
  }),
}
