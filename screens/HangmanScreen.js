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
  const [answer, setAnswer] = useState([])
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
    //console.log(word)
  }, [errors, word])

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
    console.log(inputWord)
    const splitWord = inputWord.split('')
    console.log(splitWord)
    const wordObjectArray = []
    splitWord.forEach((char) => {
      wordObjectArray.push({ letter: char, guessed: false })
    })
    setWord(wordObjectArray)
    // let splitWord = word[0].split('')
    // console.log(splitWord)

    // splitWord.forEach((el) => {
    //   setWord([...word, { letter: el, guessed: false }])
    // })
    //setWord(splitWord)
    //setWord(word[0].split(''))
    // word.split('')
    // console.log(word)
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
      <TouchableOpacity key={index} style={styles.alphaBox} onPress={() => letterPress(letter)}>
        <Text style={styles.alphaText}>{letter}</Text>
      </TouchableOpacity>
    ))
  }

  function letterPress(letter) {
    console.log('first run:', word)
    let lowerLetter = letter.toLowerCase()
    console.log(lowerLetter)

    // let doubleMatch = word.filter((el) => el.letter === lowerLetter)
    // console.log('this is the double match:', doubleMatch)

    // let filteredLetter = word.filter((el) => el.letter === lowerLetter)
    // console.log('here is thie filtered letter:', filteredLetter)

    // filteredLetter.forEach((el) => (el.guessed = true))
    // console.log('changed guessed to true:', filteredLetter)

    let newArray = []
    word.forEach((el) => {
      if (el.letter === lowerLetter) {
        el.guessed = true
        newArray.push(el)
      } else {
        newArray.push(el)
      }
    }),
      setWord(newArray)
    // console.log('this is the new array', newArray)
    // console.log('second run', word)

    // let match = word.findIndex((el) => el.letter === lowerLetter)
    // console.log('this is the single match index:', match)

    //have to find the index of the letter pressed

    // if (match !== -1) {
    //   console.log(match, 'correct guess!')
    //   match.guessed = true
    //   const newArray = [...word]
    //   newArray[match] = { ...newArray[match], guessed: true }
    //   setWord(newArray)
    // } else {
    //   setErrors(errors + 1)
    //   console.log('wrong guess')
    // }
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
        {word.length !== 0 ? renderWord() : <Text>There is no word!</Text>}
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
