import { useTranslation } from 'react-i18next'
import StreetView from 'react-native-streetview'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Button, ImageBase } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { Config } from '@/Config'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { changeTheme } from '@/Store/Theme'
import { navigate } from '@/Navigators/utils'
import { generateRandomCoordinates, getCenterCoordinates } from '@/Utils'
import fetchExistingMetadata from '@/Store/Metadata/fetchExistingMetadata'

import { TextInput, Avatar as PaperAvatar } from 'react-native-paper'
import { Image, TouchableWithoutFeedback } from 'react-native'
import StarRating from 'react-native-star-rating-new'
import CITIES from '@/Constants/Cities'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import changeName from '@/Store/Profile/changeName'

const Profile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const profileInfo = useSelector(state => state.profile.item)
  const [isNameEditingEnabled, setIsNameEditingEnabled] = useState(false)
  const [isShortName, setIsShortName] = useState(false)
  const [nameInputValue, setNameInputValue] = useState(profileInfo.name)
  const nameInputRef = useRef(null)

  useEffect(() => {
    if (nameInputRef.current) {
      if (isNameEditingEnabled) {
        nameInputRef.current.focus()
        return
      }
      nameInputRef.current.blur()
    }
  }, [isNameEditingEnabled])

  useEffect(() => {
    if (nameInputValue.length < 2) {
      setIsShortName(true)
      return
    }
    setIsShortName(false)
  }, [nameInputValue])

  const onStartPressed = () => {
    navigate('Level')
  }

  const onChangeCityPressed = () => {
    navigate('CityPicker')
  }

  const onEditNamePressed = () => {
    if (isNameEditingEnabled) {
      if (nameInputValue.length < 2) {
        setIsShortName(true)
        return
      }
      dispatch(changeName.action(nameInputValue))
      setIsNameEditingEnabled(false)
      return
    }
    setIsNameEditingEnabled(true)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffdd80',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextInput
            ref={nameInputRef}
            placeholder="Name..."
            value={profileInfo.name}
            onChangeText={setNameInputValue}
            style={{
              fontSize: 20,
              lineHeight: 30,
              height: 70,
              width: 200,
              backgroundColor: 'transparent',
            }}
            disabled={!isNameEditingEnabled}
            outlineColor={'transparent'}
            underlineColor={'transparent'}
            numberOfLines={1}
            mode={'outlined'}
            selectionColor={'orange'}
            activeUnderlineColor={'orange'}
            maxLength={14}
          />
          <MaterialIcons
            style={{ marginLeft: 20 }}
            name={isNameEditingEnabled ? 'save' : 'edit'}
            color={'orange'}
            size={37}
            onPress={onEditNamePressed}
          />
        </View>
        {isShortName && (
          <Text style={{ fontWeight: '600', fontSize: 12, color: '#d14415' }}>
            Name should be at least 2 symblos long
          </Text>
        )}
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 15, fontSize: 20 }}>
          Current city: {CITIES[profileInfo.city].name}
        </Text>
        <TouchableWithoutFeedback onPress={onChangeCityPressed}>
          <View style={{ height: 150, width: 150, borderRadius: 10 }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'cover', // or 'stretch'
                justifyContent: 'space-evenly',
                borderRadius: 10,
              }}
              source={CITIES[profileInfo.city].picture}
            />
          </View>
        </TouchableWithoutFeedback>
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
