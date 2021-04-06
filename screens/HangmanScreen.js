import React, { useState } from 'react'
import { View, Modal, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Svg, { Circle, Rect, Line, G } from 'react-native-svg'
import styled from 'styled-components/native'

const HangmanScreen = () => {
  const [gameOver, setGameOver] = useState(true)
  const [modalDisplay, setModalDisplay] = useState(true)
  const [word, setWord] = useState('')

  function showImage() {
    return (
      <View style={{ borderWidth: 1 }}>
        <Svg height="250" width="200">
          <Circle cx="100" cy="50" r="25" stroke="black" strokeWidth="2.5" fill="lightgrey" />
          <Rect x="98" y="75" width="5" height="80" stroke="black" strokeWidth="2" fill="black" />
          <Line x1="40" y1="130" x2="100" y2="85" stroke="black" strokeWidth="2" />
          <Line x1="160" y1="130" x2="100" y2="85" stroke="black" strokeWidth="2" />
          <Line x1="50" y1="200" x2="100" y2="150" stroke="black" strokeWidth="2" />
          <Line x1="150" y1="200" x2="100" y2="150" stroke="black" strokeWidth="2" />
        </Svg>
      </View>
    )
  }

  function submitWord() {
    setModalDisplay(false)
  }
  return (
    <Wrapper>
      <PageTitle>Hangman Game</PageTitle>
      {gameOver ? (
        <StartButton onPress={() => setModalDisplay(true)}>
          <ButtonText>Start Game</ButtonText>
        </StartButton>
      ) : (
        showImage()
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDisplay}
        onRquestClose={() => setModalDisplay(!modalDisplay)}
      >
        <ModalContainer>
          <Text style={{ fontSize: 20, marginTop: 10, paddingLeft: 10 }}>
            Player 1: Type A Word!
          </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="type a word"
            onChangeText={(txt) => setWord(txt)}
          />
          <SubmitButton onPress={() => submitWord()}>
            <ButtonText>Submit</ButtonText>
          </SubmitButton>
        </ModalContainer>
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  border: 1px solid pink;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`
const PageTitle = styled.Text`
  font-size: 30px;
`

const StartButton = styled.TouchableOpacity`
  border: 1px solid black;
`

const ButtonText = styled.Text`
  font-size: 20px;
  padding: 10px;
  text-align: center;
`

const ModalContainer = styled.View`
  background-color: cornflowerblue;
  border: 1px solid black;
  height: 300px;
`

const SubmitButton = styled.TouchableOpacity`
  border: 1px solid black;
  margin: 10px auto;
  width: 200px;
  background-color: lightgrey;
`

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    paddingLeft: 10,
    fontSize: 15,
    height: 30,
    marginTop: 10,
  },
})
export default HangmanScreen
