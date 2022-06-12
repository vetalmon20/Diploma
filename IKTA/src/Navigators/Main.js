import React from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import { Home, Map, Level, Profile, CityPicker, Auth } from '@/Containers'

const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  const levelResult = useSelector(state => state.level.item)
  const profileInfo = useSelector(state => state.profile.item)
  let levelTitle = profileInfo.city || 'Level'
  if (levelResult && Array.isArray(levelResult)) {
    if (levelResult.length === 5) {
      levelTitle = levelTitle + ' results'
    } else {
      levelTitle = levelTitle + `(${levelResult.length + 1}\\5)`
    }
  }

  return (
    <Stack.Navigator>
      {!profileInfo.pass && (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            tabBarIconStyle: { display: 'none' },
            tabBarLabelPosition: 'beside-icon',
            title: 'Authorization',
          }}
        />
      )}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Stack.Screen
        name="Level"
        component={Level}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          title: levelTitle,
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Stack.Screen
        name="CityPicker"
        component={CityPicker}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          title: 'Pick your city',
        }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
