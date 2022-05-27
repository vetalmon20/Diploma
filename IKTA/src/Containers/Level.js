import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { changeTheme } from '@/Store/Theme'

import StreetView from 'react-native-streetview'
import { generateRandomCoordinates, getCenterCoordinates } from '@/Utils'
import { Config } from '@/Config'

import fetchExistingMetadata from '@/Store/Metadata/fetchExistingMetadata'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { navigate } from '@/Navigators/utils'

const Level = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const [marker, setMarker] = useState(null)
  const [isLevelFinished, setIsLevelFinished] = useState(false)
  const levelResult = useSelector(state => state.level.item)
  const metadataLocation = useSelector(state => state.metadata.item)

  console.log(levelResult, ' - levelResult')

  useEffect(() => {
    if (levelResult && Array.isArray(levelResult) && levelResult.length > 4) {
      setIsLevelFinished(true)
      return
    }
    dispatch(fetchExistingMetadata.action(Config.VN_BOUNDS))
  }, [levelResult])

  const openMap = () => {
    navigate('Map')
    console.log(metadataLocation)
  }

  const onGeneratePressed = () => {
    dispatch(fetchExistingMetadata.action(Config.VN_BOUNDS))
    console.log(metadataLocation, ' -loc')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'orange' }}>
      {Object.keys(metadataLocation).length > 0 && !isLevelFinished && (
        <StreetView
          style={styles.streetView}
          allGesturesEnabled={true}
          coordinate={metadataLocation}
          streetNamesHidden={true}
        />
      )}
      {isLevelFinished && <Text>Congrats! Check out your results</Text>}
      <Button title="Open map" onPress={openMap} />
      <Button title="generate" onPress={onGeneratePressed} />
      <Button
        title="lvl result"
        onPress={() => console.log(levelResult, ' - result')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default Level
