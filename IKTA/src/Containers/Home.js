import { useTranslation } from 'react-i18next'
import StreetView from 'react-native-streetview'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { Config } from '@/Config'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { changeTheme } from '@/Store/Theme'
import { navigate, navigationRef } from '@/Navigators/utils'
import { generateRandomCoordinates, getCenterCoordinates } from '@/Utils'
import fetchExistingMetadata from '@/Store/Metadata/fetchExistingMetadata'

import { Avatar as PaperAvatar } from 'react-native-paper'
import { Image, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import CITIES from '@/Constants/Cities'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import resetLevel from '@/Store/Level/resetLevel'

const Home = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const source = {
    uri:
      'https://static.wikia.nocookie.net/teentitansgo/images/0/07/1111.png/revision/latest?cb=20160802064407&path-prefix=ru',
  }

  const profileInfo = useSelector(state => state.profile.item)

  console.log(profileInfo, ' - profileInfo')

  const onProfilePressed = () => {
    navigate('Profile')
  }

  const onChangeCityPressed = () => {
    navigate('CityPicker')
  }

  const onStartPressed = async () => {
    await dispatch(resetLevel.action())
    navigate('Level')
    //dispatch(reset.action())
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
      }}
    >
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: 'cover', // or 'stretch'
          justifyContent: 'space-evenly',
        }}
        source={CITIES[profileInfo.city].picture}
        //source={source}
      >
        <View
          style={{
            flexDirection: 'row',
            top: 40,
            left: 40,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback onPress={onProfilePressed}>
            <View
              style={{
                backgroundColor: 'white',
                height: 80,
                width: 80,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'orange',
              }}
            >
              <MaterialIcons name={'person'} color={'orange'} size={50} />
            </View>
          </TouchableWithoutFeedback>
          {profileInfo && profileInfo.name && (
            <View
              style={{
                marginLeft: 15,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
                backgroundColor: 'orange',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 25, color: '#fff' }}>
                Hello {profileInfo.name}
              </Text>
            </View>
          )}
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 20 }}>
              Your city:{' '}
              <Text style={{ fontSize: 30, fontStyle: 'italic' }}>
                {CITIES[profileInfo.city].name}
              </Text>
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={onChangeCityPressed}>
            <View
              style={{
                marginTop: 5,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'orange',
              }}
            >
              <Text style={{ color: 'orange', fontStyle: 'italic' }}>
                Change
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={onStartPressed}>
          <View
            style={{
              backgroundColor: '#fff',
              alignSelf: 'center',
              width: 200,
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#43bf36',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#43bf36',
                fontStyle: 'italic',
              }}
            >
              Start level
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
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

export default Home
