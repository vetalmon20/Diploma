import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native'

import CITIES from '@/Constants/Cities'
import { navigate } from '@/Navigators/utils'
import resetLevel from '@/Store/Level/resetLevel'

const Home = () => {
  const dispatch = useDispatch()

  const profileInfo = useSelector(state => state.profile.item)

  const isUserProfileActive = profileInfo.pass

  const onProfilePressed = () => {
    if (isUserProfileActive) {
      navigate('Profile')
    }
  }

  const onChangeCityPressed = () => {
    navigate('CityPicker')
  }

  const onStartPressed = async () => {
    await dispatch(resetLevel.action())
    navigate('Level')
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={CITIES[profileInfo.city].picture}
      >
        <View style={styles.profileContainer}>
          <TouchableWithoutFeedback onPress={onProfilePressed}>
            <View
              style={[
                styles.profileButton,
                isUserProfileActive ? null : { borderColor: 'grey' },
              ]}
            >
              <MaterialIcons
                name={'person'}
                color={isUserProfileActive ? 'orange' : 'grey'}
                size={50}
              />
            </View>
          </TouchableWithoutFeedback>
          {profileInfo && profileInfo.name && (
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileNameText}>
                Hello {profileInfo.name}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.cityBlockContainer}>
          <View style={styles.cityContainer}>
            <Text style={{ fontSize: 20 }}>
              Your city:{' '}
              <Text style={{ fontSize: 30, fontStyle: 'italic' }}>
                {CITIES[profileInfo.city].name}
              </Text>
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={onChangeCityPressed}>
            <View style={styles.cityChangeButton}>
              <Text style={styles.cityChangeButtonText}>Change</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={onStartPressed}>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'space-evenly',
  },
  profileContainer: {
    flexDirection: 'row',
    top: 40,
    left: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    backgroundColor: 'white',
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
  },
  profileNameContainer: {
    marginLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  profileNameText: {
    fontSize: 25,
    color: '#fff',
  },
  cityBlockContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  cityChangeButton: {
    marginTop: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
  },
  cityChangeButtonText: {
    color: 'orange',
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: 200,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#43bf36',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#43bf36',
    fontStyle: 'italic',
  },
})

export default Home
