import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Ubuntu_500Medium,
  Ubuntu_300Light,
  Ubuntu_400Regular,
} from '@expo-google-fonts/ubuntu'
import { styles } from '../theme/stylesTheme'

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
    <View style={styles.container} accessible={true}>
      <Text accessibilityLabel="App Title" accesibilityRole="header" style={styles.title}>
        Steff's Game App
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        accsesibilitlyLabel="Play Hangman"
        accessibilityHint="Press to start playing hangman"
        style={styles.menuItem}
        onPress={() => navigation.navigate('Hangman')}
      >
        <Text style={styles.menuItemText}>HANGMAN</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
