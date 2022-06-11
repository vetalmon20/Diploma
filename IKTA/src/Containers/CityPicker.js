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
import { Image, TouchableWithoutFeedback } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import CITIES from '@/Constants/Cities'
import changeCity from '@/Store/Profile/changeCity'

const CityPicker = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const citiesArray = Object.values(CITIES)

  const profileInfo = useSelector(state => state.profile.item)

  const onCityPressed = async id => {
    await dispatch(changeCity.action(id))
    navigationRef.goBack()
  }

  const renderItem = ({ item }) => {
    //const image = require(item.picture)
    return (
      <TouchableWithoutFeedback onPress={() => onCityPressed(item.id)}>
        <View
          style={{
            width: '40%',
            height: 200,
            marginBottom: 50,
            marginRight: '5%',
            marginLeft: '5%',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>{item.name}</Text>
          <Image
            source={item.picture}
            style={{ height: '100%', width: '100%' }}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
      }}
    >
      <FlatList data={citiesArray} renderItem={renderItem} numColumns={2} />
    </View>
  )
}

export default CityPicker
