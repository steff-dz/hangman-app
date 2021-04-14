import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
// import styles from '../theme/styles'
// import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { useFonts, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu'

const HomeScreen = ({ navigation }) => {
  // const [loaded] = useFonts({
  //   UbuntuBold: require('../assets/fonts/Ubuntu-Medium.ttf'),
  // })

  // if (!loaded) {
  //   return <Text>Nothing here yet</Text>
  // }
  let [fontsLoaded] = useFonts({
    Ubuntu_500Medium,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Wrapper>
      <Text style={{ fontFamily: 'Ubuntu_500Medium', color: 'white', fontSize: 40 }}>
        Steff's Game App
      </Text>
      {/* <Title>My App</Title> */}
      <MenuItem onPress={() => navigation.navigate('Hangman')}>
        <MenuText>HANGMAN</MenuText>
      </MenuItem>
    </Wrapper>
  )
}

//}

const Wrapper = styled.View`
  background-color: #16161a;
  height: 100%;
  color: white;
  flex-direction: column;
  align-items: center;
`

const Title = styled.Text`
  margin-top: 10%;
  color: #fffffe;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2px;
  font-family: Ubuntu_500Medium;
`

const MenuItem = styled.TouchableOpacity`
  margin-top: 10%;
  background-color: #ff8906;
  padding: 15px;
  border-radius: 15px;
`

const MenuText = styled.Text`
  font-size: 30px;
  color: #fffffe;
  font-weight: 700;
`

export default HomeScreen
