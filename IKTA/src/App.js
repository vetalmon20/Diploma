import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import RNBootSplash from 'react-native-bootsplash'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'

const App = () => {
  useEffect(() => {
    const init = async () => {
      await new Promise(resolve =>
        setTimeout(() => {
          console.log('bootsplash hiding...')
          resolve(true)
        }, 2000),
      )
    }
    init().finally(async () => {
      await RNBootSplash.hide({ fade: true })
    })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App
