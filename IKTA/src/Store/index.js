import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '@/Services/api'

import theme from './Theme'
import level from './Level'
import profile from './Profile'
import metadata from './Metadata'

const reducers = combineReducers({
  theme: theme,
  level: level,
  profile: profile,
  metadata: metadata,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'profile'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      /*
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      */
      serializableCheck: false,
      immutableCheck: false,
    })

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
