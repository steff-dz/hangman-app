import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//import { AppLoading } from 'expo-app-loading'
import HomeScreen from './screens/HomeScreen'
import HangmanScreen from './screens/HangmanScreen'
//mport { useFonts } from 'expo-font'
//import { Ubuntu_500Medium } from '@expo-google-fonts/ubuntu'
//import styles from "./theme/styles"

const Stack = createStackNavigator()

const App = () => {
  // const [loaded] = useFonts({
  //   UbuntuBold: require('./assets/fonts/Ubuntu-Medium.ttf'),
  // })

  // if (!loaded) {
  //   return <AppLoading />
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} test={'hey there'} />
        <Stack.Screen name="Hangman" component={HangmanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
