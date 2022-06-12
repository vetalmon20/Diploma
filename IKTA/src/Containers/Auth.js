import { TextInput } from 'react-native-paper'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'

import setPass from '@/Store/Profile/setPass'
import changeName from '@/Store/Profile/changeName'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'

const Auth = () => {
  const dispatch = useDispatch()
  const nameInputRef = useRef(null)
  const [passValue, setPassValue] = useState('')
  const [isPassError, setIsPassError] = useState(false)
  const [usernameValue, setUsernameValue] = useState('')
  const [isUsernameError, setIsUsernameError] = useState(false)

  const profileInfo = useSelector(state => state.profile.item)

  const onCreatePressed = async () => {
    if (!usernameValue || usernameValue.trim().length < 2) {
      setIsUsernameError(true)
      return
    }
    setIsUsernameError(false)
    if (!passValue || passValue.length < 4) {
      setIsPassError(true)
      return
    }
    setIsPassError(false)

    await dispatch(changeName.action(usernameValue))
    await dispatch(setPass.action(passValue))
    navigateAndSimpleReset('Home')
  }

  const onAnonymousPressed = () => {
    dispatch(changeName.action('Anonymous'))
    navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 22 }}>Create profile:</Text>
        <TextInput
          ref={nameInputRef}
          placeholder="Name"
          value={usernameValue}
          onChangeText={setUsernameValue}
          style={styles.input}
          outlineColor={'orange'}
          activeOutlineColor={isUsernameError ? 'tomato' : 'orange'}
          underlineColor={'transparent'}
          numberOfLines={1}
          mode={'outlined'}
          selectionColor={'orange'}
          activeUnderlineColor={'orange'}
          maxLength={14}
        />
        {isUsernameError && (
          <Text style={styles.errorUsernameText}>
            Username should be at least 2 symbols long
          </Text>
        )}
        <TextInput
          ref={nameInputRef}
          placeholder="Password"
          value={passValue}
          onChangeText={setPassValue}
          style={styles.input}
          outlineColor={'orange'}
          activeOutlineColor={isUsernameError ? 'tomato' : 'orange'}
          underlineColor={'transparent'}
          numberOfLines={1}
          mode={'outlined'}
          selectionColor={'orange'}
          activeUnderlineColor={'orange'}
          maxLength={14}
          secureTextEntry={true}
        />
        {isPassError && (
          <Text style={styles.errorUsernameText}>
            Password should be at least 4 symbols long
          </Text>
        )}
        <TouchableWithoutFeedback onPress={onCreatePressed}>
          <View style={styles.createButton}>
            <Text style={styles.createButtonText}>Enter</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={onAnonymousPressed}>
        <View style={styles.anonButton}>
          <Text style={styles.anonButtonText}>Continue as Anonymous</Text>
        </View>
      </TouchableWithoutFeedback>
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
    fontSize: 18,
    lineHeight: 24,
    height: 50,
    width: 250,
    backgroundColor: 'transparent',
    marginTop: 25,
  },
  errorUsernameText: {
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
  createButton: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginTop: 25,
  },
  anonButton: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  anonButtonText: {
    color: 'orange',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Auth
