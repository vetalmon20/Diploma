import StreetView from 'react-native-streetview'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, Colors } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { Config } from '@/Config'
import CITIES from '@/Constants/Cities'
import { navigate } from '@/Navigators/utils'
import LevelResults from '@/Components/LevelResults'
import fetchExistingMetadata from '@/Store/Metadata/fetchExistingMetadata'

const Level = () => {
  const dispatch = useDispatch()

  const [isLevelLoading, setIsLevelLoading] = useState(false)
  const [isInitialLoaded, setIsInitialLoaded] = useState(false)
  const [isLevelFinished, setIsLevelFinished] = useState(false)
  const levelResult = useSelector(state => state.level.item)
  const profileInfo = useSelector(state => state.profile.item)
  const metadataLocation = useSelector(state => state.metadata.item)

  const _cityBounds = profileInfo.city
    ? CITIES[profileInfo.city].bounds
    : Config.VN_BOUNDS

  useEffect(() => {
    if (levelResult && Array.isArray(levelResult) && levelResult.length > 4) {
      setIsLevelFinished(true)
      return
    }
    setIsLevelLoading(true)
    dispatch(fetchExistingMetadata.action(_cityBounds))
      .then(() => setIsLevelLoading(false))
      .catch(err => {
        console.log(err, ' - error while loading the level')
      })
  }, [levelResult])

  useEffect(() => {
    if (isLevelLoading && !isInitialLoaded) {
      setIsInitialLoaded(true)
    }
  }, [isLevelLoading])

  const openMap = () => {
    navigate('Map')
  }

  const onGeneratePressed = () => {
    setIsLevelLoading(true)
    dispatch(fetchExistingMetadata.action(_cityBounds))
      .then(() => setIsLevelLoading(false))
      .catch(err => {
        console.log(err, ' - error while loading the level')
      })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {!isLevelLoading &&
        Object.keys(metadataLocation).length > 0 &&
        !isLevelFinished && (
          <>
            <StreetView
              style={styles.streetView}
              allGesturesEnabled={true}
              coordinate={metadataLocation}
              streetNamesHidden={true}
            />
            <TouchableWithoutFeedback onPress={openMap}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'orange',
                  position: 'absolute',
                  right: 30,
                  bottom: 40,
                }}
              >
                <MaterialIcons name="map" color={'orange'} size={37} />
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
      {!isLevelLoading &&
        Object.keys(metadataLocation).length < 1 &&
        !isLevelFinished &&
        isInitialLoaded && (
          <TouchableWithoutFeedback onPress={onGeneratePressed}>
            <View
              style={{
                backgroundColor: '#fff',
                width: 50,
                height: 50,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#fff',
                position: 'absolute',
                left: 20,
                top: 20,
              }}
            >
              <MaterialIcons name="refresh" color={'orange'} size={37} />
            </View>
          </TouchableWithoutFeedback>
        )}
      {isLevelFinished && <LevelResults results={levelResult} />}
      {isLevelLoading && (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator
            size="large"
            animating={true}
            color={Colors.amber400}
          />
        </View>
      )}
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
