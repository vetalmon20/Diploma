import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout } = useTheme()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Text style={{ fontSize: 40, fontWeight: '700', color: 'orange' }}>
        IKTA
      </Text>
    </View>
  )
}

export default StartupContainer
