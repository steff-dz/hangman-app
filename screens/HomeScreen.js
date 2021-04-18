import React from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
//import styled from 'styled-components/native'
// import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Ubuntu_500Medium,
  Ubuntu_300Light,
  Ubuntu_400Regular,
} from '@expo-google-fonts/ubuntu'
import { styles } from '../theme/stylesTheme'

//const supportedURL = 'https://google.com"'

const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Ubuntu_500Medium,
    Ubuntu_300Light,
    Ubuntu_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steff's Game App</Text>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Hangman')}>
        <Text style={styles.menuItemText}>HANGMAN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => Linking.openURL('https://google.com')}
      >
        <Text style={styles.menuItemText}>TEST LINKING</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
