import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Modal from 'react-native-modal'

import { useTheme } from '@/Hooks'
import { Config } from '@/Config'
import { getCenterCoordinates } from '@/Utils'
import { useEffect } from 'react'

import { navigationRef } from '@/Navigators/utils'
import StarRating from 'react-native-star-rating-new'
import addLevelResult from '@/Store/Level/addLevelResult'
import CITIES from '@/Constants/Cities'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import addResult from '@/Store/Profile/addResult'

const Map = () => {
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const [marker, setMarker] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [trueMarker, setTrueMarker] = useState(null)
  const [isGuessPressed, setIsGuessPressed] = useState(false)

  const profileInfo = useSelector(state => state.profile.item)
  const metadataLocation = useSelector(state => state.metadata.item)

  const mapViewRef = React.useRef(null)

  const _cityBounds = profileInfo.city
    ? CITIES[profileInfo.city].bounds
    : Config.VN_BOUNDS

  const cityCenter = getCenterCoordinates(_cityBounds)

  const [mapCamera, setMapCamera] = useState({
    center: cityCenter,
    pitch: 0,
    heading: 0,
    zoom: 12,
  })

  useEffect(() => {
    return cleanUp
  }, [])

  useEffect(() => {
    if (trueMarker?.coordinate) {
      console.log(
        measureDistance(marker, trueMarker),
        ' - distance!',
        evaluateGrade(measureDistance(marker, trueMarker)),
      )
    }
  }, [trueMarker])

  useEffect(() => {
    if (trueMarker) {
      mapViewRef.current.animateCamera(mapCamera)
    }
  }, [mapCamera])

  const measureDistance = (coord1, coord2) => {
    if (!coord1 || !coord2) {
      return 0
    }

    let R = 6371.071 // Radius of the Earth in kilometres
    let rlat1 = coord1.coordinate.latitude * (Math.PI / 180) // Convert degrees to radians
    let rlat2 = coord2.coordinate.latitude * (Math.PI / 180) // Convert degrees to radians
    let difflat = rlat2 - rlat1 // Radian difference (latitudes)
    let difflon =
      (coord2.coordinate.longitude - coord1.coordinate.longitude) *
      (Math.PI / 180) // Radian difference (longitudes)

    let d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2),
        ),
      )
    return Math.floor(d * 1000) //returns distance in metres
  }

  const evaluateGrade = dist => {
    if (dist < 500) {
      return 5
    }

    if (dist < 1000) {
      return 4
    }

    if (dist < 1500) {
      return 3
    }
    if (dist < 3000) {
      return 2
    }

    if (dist < 5000) {
      return 1
    }

    return 0
  }

  const cleanUp = () => {
    setMarker(null)
    setTrueMarker(null)
    setIsGuessPressed(false)
    setIsVisible(false)
  }

  const onMapPress = input => {
    const coords = input.nativeEvent.coordinate
    console.log(coords, ' - coords')
    setMarker({
      coordinate: { latitude: coords.latitude, longitude: coords.longitude },
      title: 'This area',
      description: "Do u really think it's here?",
    })
  }

  const onGuessPressed = () => {
    if (!marker) {
      return
    }
    console.log('here', metadataLocation.latitude, metadataLocation.longitude)
    const newTrueMarker = {
      coordinate: {
        latitude: metadataLocation.latitude,
        longitude: metadataLocation.longitude,
      },
      title: 'Correct area',
      description: 'You missed it again...',
      pinColor: 'yellow',
    }
    /*setTrueMarker({
      coordinate: {
        latitude: metadataLocation.latitude,
        longitude: metadataLocation.longitude,
      },
      title: 'Correct area',
      description: 'You missed it again...',
      pinColor: 'yellow',
    })*/
    setTrueMarker(newTrueMarker)
    setIsGuessPressed(true)
    if (marker && marker.coordinate) {
      setMapCamera(prev => {
        return {
          ...prev,
          center: {
            latitude: metadataLocation.latitude,
            longitude: metadataLocation.longitude,
          },
        }
      })
    }
    const distance = measureDistance(marker, newTrueMarker)
    console.log(distance, ' - distance', evaluateGrade(distance), ' - grade')
    dispatch(
      addResult.action({ distance: distance, rating: evaluateGrade(distance) }),
    )
  }

  const onOKPressed = () => {
    const dist = measureDistance(marker, trueMarker)
    const grade = evaluateGrade(dist)
    dispatch(addLevelResult.action({ dist, grade }))
    cleanUp()
    navigationRef.goBack()
  }

  const onRegionChangeComplete = () => {
    if (trueMarker) {
      setIsVisible(true)
    }
  }

  const onBackPressed = () => {
    navigationRef.goBack()
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: '#ffffff1A',
        }}
        swipeDirection={['up', 'left', 'right', 'down']}
      >
        <View
          style={
            {
              //flex: 1,
              //justifyContent: 'center',
              //alignItems: 'center',
            }
          }
        >
          <View
            style={{
              height: 200,
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              padding: 15,
            }}
          >
            <Text style={{ marginBottom: 10 }}>Your guess rating:</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={evaluateGrade(measureDistance(marker, trueMarker))}
              emptyStar={require('@/Assets/Images/emptyStar.png')}
              fullStar={require('@/Assets/Images/fullStar.png')}
            />
            <Text style={{ marginBottom: 20, marginTop: 10 }}>
              You are {measureDistance(marker, trueMarker)} metres from
              location.
            </Text>
            <Button title="OK" onPress={onOKPressed} />
          </View>
        </View>
      </Modal>
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: cityCenter.latitude,
          longitude: cityCenter.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={onMapPress}
      >
        {marker && (
          <Marker
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        )}
        {isGuessPressed && (
          <Marker
            coordinate={trueMarker.coordinate}
            title={trueMarker.title}
            description={trueMarker.description}
            pinColor="green"
          />
        )}
      </MapView>
      <TouchableWithoutFeedback onPress={onBackPressed}>
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
          <MaterialIcons name="arrow-back" color={'orange'} size={37} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onGuessPressed}>
        <View
          style={[
            {
              backgroundColor: '#fff',
              width: 80,
              height: 80,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#43bf36',
              position: 'absolute',
              left: 30,
              bottom: 40,
            },
            !marker ? { borderColor: 'grey' } : null,
          ]}
        >
          <MaterialIcons
            name="check-circle"
            color={!marker ? 'grey' : '#43bf36'}
            size={70}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default Map
