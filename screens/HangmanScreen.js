import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Svg, { Circle, Rect, Line, G } from 'react-native-svg'
import styled from 'styled-components/native'

const HangmanScreen = () => {
  const [gameOver, setGameOver] = useState(true)
  const [modalDisplay, setModalDisplay] = useState(true)
  const [inputWord, setInputWord] = useState(null)
  const [word, setWord] = useState([])
  const [errors, setErrors] = useState(0)
  const [correctGuess, setCorrectGuess] = useState(0)
  const Alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  useEffect(() => {
    console.log('errors state:', errors)
    if (errors === 6) {
      console.log('you lost sucka!')
      setGameOver(true)
      setErrors(0)
      setInputWord(null)
    }

    //console.log('word length is:', word.length, correctGuess)
    //console.log(word)
  }, [errors])

  useEffect(() => {
    console.log('from word use Effect:', word.length)
    // word.forEach((char) => {
    //   if (char.guessed !== false) {
    //     console.log('no falses!')
    //   } else {
    //     console.log('this is false:', char.letter, char.guessed)
    //   }
    // })
  }, [word])

  useEffect(() => {
    console.log('correctGuess:', correctGuess)
  }, [correctGuess])

  function showImage() {
    return (
      <View style={{ borderWidth: 1 }}>
        <Svg height="250" width="200">
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

  function submitWord() {
    console.log(inputWord)
    const splitWord = inputWord.split('')
    console.log(splitWord)
    const wordObjectArray = []
    splitWord.forEach((char) => {
      wordObjectArray.push({ letter: char, guessed: false })
    })
    setWord(wordObjectArray)
    setModalDisplay(false)
    setGameOver(false)
  }

  function renderWord() {
    return word.map((char, index) => (
      <View key={index} style={styles.letterBox}>
        <Text style={char.guessed ? styles.letterText : styles.hiddenText}>{char.letter}</Text>
      </View>
    ))
  }

  function renderAlphabet() {
    return Alphabet.map((letter, index) => (
      <TouchableOpacity
        key={index}
        style={styles.alphaBox}
        onPress={() => letterPressHandler(letter)}
      >
        <Text style={styles.alphaText}>{letter}</Text>
      </TouchableOpacity>
    ))
  }

  function letterPressHandler(letter) {
    let lowerLetter = letter.toLowerCase()
    let match = word.find((el) => el.letter === lowerLetter)
    let filteredWord = word.filter((el) => el.letter === lowerLetter)

    console.log('this is the filtered word length:', filteredWord.length)

    if (filteredWord.length > 1) {
      console.log('this is the filtered words:', filteredWord, filteredWord.length)
      setCorrectGuess(correctGuess + 2)
    } else if (filteredWord.length === 1) {
      setCorrectGuess(correctGuess + 1)
    } else if (filteredWord.length === 0) {
      setErrors(errors + 1)
    }

    // if (match) {
    //   console.log('it exists!')
    // } else {
    //   console.log('this letter is wrong')
    //   setErrors(errors + 1)
    // }
    let newArray = word.map((el) => (el.letter === lowerLetter ? { ...el, guessed: true } : el))
    setWord(newArray)
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
      <WordContainer>
        {/* {word.length !== 0 ? renderWord() : <Text>There is no word!</Text>} */}
        {!gameOver && renderWord()}
      </WordContainer>
      <AlphabetContainer>
        {gameOver ? <Text>Game hasn't started!</Text> : renderAlphabet()}
      </AlphabetContainer>

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

// const LetterBox = styled.View`
//   height: 50px;
//   width: 50px;
//   border-bottom-color: black;
//   border-bottom-width: 2px;
//   background-color: lightgreen;
// `

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
