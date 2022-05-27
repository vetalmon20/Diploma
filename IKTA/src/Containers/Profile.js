import { useTranslation } from 'react-i18next'
import StreetView from 'react-native-streetview'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { Config } from '@/Config'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { changeTheme } from '@/Store/Theme'
import { navigate } from '@/Navigators/utils'
import { generateRandomCoordinates, getCenterCoordinates } from '@/Utils'
import fetchExistingMetadata from '@/Store/Metadata/fetchExistingMetadata'

import { Avatar as PaperAvatar } from 'react-native-paper'
import { Image, TouchableWithoutFeedback } from 'react-native'
import StarRating from 'react-native-star-rating-new'
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Profile = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const profileInfo = useSelector(state => state.profile.item)

  const onStartPressed = () => {
    navigate('Level')
  }

  const source = {
    uri:
      'https://static.wikia.nocookie.net/teentitansgo/images/0/07/1111.png/revision/latest?cb=20160802064407&path-prefix=ru',
  }

  console.log(profileInfo, ' - profileInfo')

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        {source && <PaperAvatar.Image size={180} source={source} />}
        {!source && (
          <PaperAvatar.Text
            size={80}
            label={profileInfo ? profileInfo.name.slice(0, 1) : 'U'}
            style={{ backgroundColor: 'tomato' }}
            color={'black'}
          />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={{ marginTop: 12, fontSize: 30 }}>
            {profileInfo ? profileInfo.name : 'User'}
          </Text>
          <TouchableWithoutFeedback>
            <View
              style={{
                marginLeft: 20,
                height: 40,
                width: 40,
                backgroundColor: 'white',
              }}
            ></View>
          </TouchableWithoutFeedback>

          {/* <MaterialIcons name="open" size={24} color={`red`} /> */}
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Avg distance:</Text>
        <Text style={{ fontSize: 15 }}>
          <Text style={{ fontSize: 25 }}>
            {' '}
            {profileInfo ? profileInfo.results.avgDistance : '0'}{' '}
          </Text>
          km.
        </Text>
        <Text style={{ fontSize: 12 }}>far away from right location</Text>
      </View>
      <View>
        <Text style={{ fontSize: 20 }}>Avg rating:</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={profileInfo.results.avgRating}
          emptyStar={require('@/Assets/Images/emptyStar.png')}
          fullStar={require('@/Assets/Images/fullStar.png')}
        />
      </View>
    </View>
  )
}

export default Profile
