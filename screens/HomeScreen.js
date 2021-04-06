import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Steff's Game App</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Hangman')}>
        <Text>Play Hangman</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
