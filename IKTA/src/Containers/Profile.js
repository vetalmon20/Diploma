import { TextInput } from 'react-native-paper'
import StarRating from 'react-native-star-rating-new'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useRef } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'

import CITIES from '@/Constants/Cities'
import { navigate } from '@/Navigators/utils'
import changeName from '@/Store/Profile/changeName'

const Profile = () => {
  const dispatch = useDispatch()

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
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={nameInputRef}
            placeholder="Name..."
            value={profileInfo.name}
            onChangeText={setNameInputValue}
            style={styles.input}
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
          <Text style={styles.errorNameText}>
            Name should be at least 2 symblos long
          </Text>
        )}
      </View>
      <View style={styles.cityContainer}>
        <Text style={styles.cityText}>
          Current city: {CITIES[profileInfo.city].name}
        </Text>
        <TouchableWithoutFeedback onPress={onChangeCityPressed}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
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
          m.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdd80',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    lineHeight: 30,
    height: 70,
    width: 200,
    backgroundColor: 'transparent',
  },
  errorNameText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#d14415',
  },
  cityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityText: {
    marginBottom: 15,
    fontSize: 20,
  },
  imageContainer: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },
})

export default Profile
