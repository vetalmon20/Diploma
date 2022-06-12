import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Bootsplash } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={Bootsplash} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
