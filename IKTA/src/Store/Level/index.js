import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'

import resetLevel from './resetLevel'
import addLevelResult from './addLevelResult'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: [],
}

export default buildSlice(
  'level',
  [resetLevel, addLevelResult],
  sliceInitialState,
).reducer
