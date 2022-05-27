import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'

import reset from './reset'
import addResult from './addResult'
import changeName from './changeName'
import changeCity from './changeCity'
import changePhoto from './changePhoto'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {
    name: 'User',
    city: 'Kyiv',
    photo: '',
    results: { length: 0, avgRating: 0, avgDistance: 0 },
  },
}

export default buildSlice(
  'profile',
  [reset, addResult, changeName, changePhoto, changeCity],
  sliceInitialState,
).reducer
