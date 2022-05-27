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

const Home = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const source = {
    uri:
      'https://static.wikia.nocookie.net/teentitansgo/images/0/07/1111.png/revision/latest?cb=20160802064407&path-prefix=ru',
  }

  const profileInfo = useSelector(state => state.profile.item)

  const onProfilePressed = () => {
    navigate('Profile')
  }

  const onChangeCityPressed = () => {
    navigate('CityPicker')
  }

  const onStartPressed = () => {
    navigate('Level')
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'orange',
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
      >
        <TouchableWithoutFeedback onPress={onProfilePressed}>
          <View style={{ position: 'absolute', top: 40, left: 40 }}>
            {source && <PaperAvatar.Image size={80} source={source} />}
            {!source && (
              <PaperAvatar.Text
                size={16}
                label={'initials'}
                style={{}}
                color={'red'}
              />
            )}
          </View>
        </TouchableWithoutFeedback>

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
          <Button title="Change city" onPress={onChangeCityPressed} />
        </View>

        <Button title="Start random level" onPress={onStartPressed} />
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
