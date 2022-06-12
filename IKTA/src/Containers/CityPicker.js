import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

import CITIES from '@/Constants/Cities'
import { navigationRef } from '@/Navigators/utils'
import changeCity from '@/Store/Profile/changeCity'

const CityPicker = () => {
  const dispatch = useDispatch()

  const citiesArray = Object.values(CITIES)
  const profileInfo = useSelector(state => state.profile.item)

  const onCityPressed = async id => {
    await dispatch(changeCity.action(id))
    navigationRef.goBack()
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => onCityPressed(item.id)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image source={item.picture} style={styles.itemImage} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={citiesArray} renderItem={renderItem} numColumns={2} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  itemContainer: {
    width: '40%',
    height: 200,
    marginBottom: 70,
    marginRight: '5%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    marginBottom: 5,
  },
  itemImage: {
    height: '100%',
    width: '100%',
  },
})

export default CityPicker
