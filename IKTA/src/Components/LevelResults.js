import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'

const LevelResults = ({ results }) => {
  const _results = results || []

  const calculateAverage = values => {
    let avg = 0
    for (let i = 0; i < values.length; i++) {
      avg += Number.parseInt(values[i])
    }
    avg = avg / values.length
    return avg
  }
  const averageLevelGrade = calculateAverage(_results.map(el => el.grade))
  const averageLevelDist = calculateAverage(_results.map(el => el.dist))

  const keyExtractor = el => {
    return el.grade * el.dist + el.dist
  }

  const renderItem = el => {
    const item = el.item
    return (
      <View style={styles.item}>
        <Text style={{ color: 'black' }}>
          <Text style={{ fontSize: 25 }}>{item.grade}/5</Text> - your grade
        </Text>
        <Text>
          <Text style={{ fontSize: 25 }}>{item.dist} m</Text> - far away from
          right answer
        </Text>
      </View>
    )
  }

  if (_results.length < 1) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.generalStatContainer}>
        <Text style={{ fontSize: 20 }}>
          {averageLevelGrade} - average level grade
        </Text>
        <Text style={{ fontSize: 20 }}>
          {averageLevelDist}m - average level distance
        </Text>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={results}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalStatContainer: {
    backgroundColor: '#e0e386',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  item: {
    height: 140,
    width: '100%',
    margin: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
})

export default LevelResults
