import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import addLevelResultService from '@/Services/Level/addLevelResult'

export default {
  initialState: buildAsyncState('addLevelResult'),
  action: buildAsyncActions('level/addLevelResult', addLevelResultService),
  reducers: buildAsyncReducers({
    errorKey: 'addLevelResult.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'addLevelResult.loading',
  }),
}
