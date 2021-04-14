import React, { useState, useEffect } from 'react'
import { View, Modal, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Svg, { Circle, Rect, Line, G } from 'react-native-svg'
import styled from 'styled-components/native'

//this can be moved into a seperate file
const Alphabet = [
  { letter: 'A', guessed: false },
  { letter: 'B', guessed: false },
  { letter: 'C', guessed: false },
  { letter: 'D', guessed: false },
  { letter: 'E', guessed: false },
  { letter: 'F', guessed: false },
  { letter: 'G', guessed: false },
  { letter: 'H', guessed: false },
  { letter: 'I', guessed: false },
  { letter: 'J', guessed: false },
  { letter: 'K', guessed: false },
  { letter: 'L', guessed: false },
  { letter: 'M', guessed: false },
  { letter: 'N', guessed: false },
  { letter: 'O', guessed: false },
  { letter: 'P', guessed: false },
  { letter: 'Q', guessed: false },
  { letter: 'R', guessed: false },
  { letter: 'S', guessed: false },
  { letter: 'T', guessed: false },
  { letter: 'U', guessed: false },
  { letter: 'V', guessed: false },
  { letter: 'W', guessed: false },
  { letter: 'X', guessed: false },
  { letter: 'Y', guessed: false },
  { letter: 'Z', guessed: false },
]

const HangmanScreen = () => {
  const [gameOver, setGameOver] = useState(true)
  const [modalDisplay, setModalDisplay] = useState(true)
  const [playerWon, setPlayerWon] = useState(false)
  const [inputWord, setInputWord] = useState(null)
  const [word, setWord] = useState([])
  const [errors, setErrors] = useState(0)
  const [correctGuess, setCorrectGuess] = useState(0)
  const [alphabetList, setAlphabetList] = useState(Alphabet)

  //useEffect keeping track of errors---------------
  useEffect(() => {
    console.log('errors state:', errors)
    if (errors === 6) {
      console.log('you lost sucka!')
      Alert.alert('Alert', 'Player 2 Lost! Play Again!', [
        {
          text: 'Try Again',
        },
      ])
      refreshGameHandler()
    }
  }, [errors])

  //UseEffect keeping track of correct guesses---------------
  useEffect(() => {
    console.log('correctGuess:', correctGuess)
    if (correctGuess === 0) {
      return
    } else if (correctGuess === word.length) {
      console.log('you won!')
      setPlayerWon(true)
    }
  }, [correctGuess])

  //function to conditionally show a message or hangman character-----
  function showImageHandler() {
    if (playerWon) {
      return newGameHandler()
    } else {
      return showImage()
    }
  }

  //function to render hangman SVG char---------------------------
  function showImage() {
    return (
      <View style={{ borderBottomWidth: 15, borderRightWidth: 5, borderTopWidth: 5 }}>
        <Svg height="250" width="200">
          <Line x1="100" y1="0" x2="100" y2="30" stroke="black" strokeWidth="5" id="rope" />
          {errors > 0 && (
            <Circle cx="100" cy="50" r="25" stroke="black" strokeWidth="2.5" fill="lightgrey" />
          )}
          {errors > 1 && (
            <Rect x="98" y="75" width="5" height="80" stroke="black" strokeWidth="2" fill="black" />
          )}
          {errors > 2 && <Line x1="40" y1="130" x2="100" y2="85" stroke="black" strokeWidth="2" />}
          {errors > 3 && <Line x1="160" y1="130" x2="100" y2="85" stroke="black" strokeWidth="2" />}
          {errors > 4 && <Line x1="50" y1="200" x2="100" y2="150" stroke="black" strokeWidth="2" />}
          {errors > 5 && (
            <Line x1="150" y1="200" x2="100" y2="150" stroke="black" strokeWidth="2" />
          )}
        </Svg>
      </View>
    )
  }

  //function to handle word submit------------------------------
  function submitWord() {
    //Check to make sure there is no spaces or numbers--
    const hasSpaces = inputWord.includes(' ')
    const hasNumbers = /\d/.test(inputWord)

    if (hasSpaces || hasNumbers) {
      Alert.alert('Alert', 'Please write a single word, no spaces or numbers!', [
        {
          text: 'Try Again',
        },
      ])
    } else {
      //if it does not include spaces or numbers, split the word and store it into an array of letter objects
      const splitWord = inputWord.split('')
      const wordObjectArray = []
      splitWord.forEach((char) => {
        wordObjectArray.push({ letter: char, guessed: false })
      })
      setWord(wordObjectArray)
      setModalDisplay(false)
      setGameOver(false)
    }
  }

  //funciton to show the inputted word-------------------------
  function renderWord() {
    return word.map((char, index) => (
      <View key={index} style={styles.letterBox}>
        <Text style={char.guessed ? styles.letterText : styles.hiddenText}>{char.letter}</Text>
      </View>
    ))
  }

  //funciton to render the alphabet---------------------------
  function renderAlphabet() {
    return alphabetList.map((char, index) => (
      <TouchableOpacity
        key={index}
        style={styles.alphaBox}
        onPress={() => letterPressHandler(char.letter)}
      >
        <Text style={char.guessed ? styles.hiddenText : styles.alphaText}>{char.letter}</Text>
      </TouchableOpacity>
    ))
  }

  //function to handle guessing a letter---------------------
  function letterPressHandler(letter) {
    let newArray = alphabetList.map((el) => (el.letter === letter ? { ...el, guessed: true } : el))
    setAlphabetList(newArray)

    //handling the word functionality--
    let lowerLetter = letter.toLowerCase()
    let filteredWord = word.filter((el) => el.letter === lowerLetter)

    if (filteredWord.length > 1) {
      setCorrectGuess(correctGuess + 2)
    } else if (filteredWord.length === 1) {
      setCorrectGuess(correctGuess + 1)
    } else if (filteredWord.length === 0) {
      setErrors(errors + 1)
    }

    let newWordArray = word.map((el) => (el.letter === lowerLetter ? { ...el, guessed: true } : el))

    setWord(newWordArray)
  }

  function newGameHandler() {
    return (
      <>
        <Text>You won!</Text>
        <TouchableOpacity onPress={() => refreshGameHandler()}>
          <Text>Play Again</Text>
        </TouchableOpacity>
      </>
    )
  }

  function refreshGameHandler() {
    setGameOver(true)
    setErrors(0)
    setInputWord(null)
    setCorrectGuess(0)
    setPlayerWon(false)
    setAlphabetList(Alphabet)
  }

  return (
    <Wrapper>
      <PageTitle>Hangman Game</PageTitle>
      {gameOver ? (
        <StartButton onPress={() => setModalDisplay(true)}>
          <ButtonText>Start Game</ButtonText>
        </StartButton>
      ) : (
        showImageHandler()
      )}
      <WordContainer>{!gameOver && renderWord()}</WordContainer>
      {!gameOver && <AlphabetContainer>{renderAlphabet()}</AlphabetContainer>}

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
            onChangeText={(txt) => setInputWord(txt)}
          />
          <SubmitButton onPress={() => submitWord()}>
            <ButtonText>Submit</ButtonText>
          </SubmitButton>
        </ModalContainer>
      </Modal>
    </Wrapper>
  )
}

//move styling into a seperate file
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

const WordContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`

const AlphabetContainer = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  letterBox: {
    height: 40,
    width: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 2,
    marginRight: 2,
  },
  letterText: {
    fontSize: 30,
  },
  hiddenText: {
    display: 'none',
  },
  alphaBox: {
    height: 50,
    width: 50,
  },
  alphaText: {
    fontSize: 40,
    textAlign: 'center',
  },
})
export default HangmanScreen

//{word.length > 0 ? renderWord() : <Text>Word will come here</Text>}
