import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'

import addResult from './addResult'
import changeName from './changeName'
import changeCity from './changeCity'
import changePhoto from './changePhoto'
import resetProfile from './resetProfile'

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
  [resetProfile, addResult, changeName, changePhoto, changeCity],
  sliceInitialState,
).reducer
