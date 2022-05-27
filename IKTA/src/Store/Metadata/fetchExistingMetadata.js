import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchExistingMetadataService from '@/Services/Metadata/fetchExistingMetadata'

export default {
  initialState: buildAsyncState('fetchExistingMetadata'),
  action: buildAsyncActions(
    'metadata/fetchExistingMetadata',
    fetchExistingMetadataService,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchExistingMetadata.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'fetchExistingMetadata.loading',
  }),
}
