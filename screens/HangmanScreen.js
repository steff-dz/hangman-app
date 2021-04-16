import React, { useState, useEffect } from 'react'
import { View, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import Svg, { Circle, Rect, Line, G } from 'react-native-svg'
import { styles } from '../theme/stylesTheme'
import { Alphabet } from '../utils/alphabet'

const HangmanScreen = () => {
  const [gameOver, setGameOver] = useState(true)
  const [modalDisplay, setModalDisplay] = useState(false)
  const [playerWon, setPlayerWon] = useState(false)
  const [inputWord, setInputWord] = useState('')
  const [word, setWord] = useState([])
  const [errors, setErrors] = useState(0)
  const [correctGuess, setCorrectGuess] = useState(0)
  const [alphabetList, setAlphabetList] = useState(Alphabet)

  //useEffect keeping track of errors---------------
  useEffect(() => {
    if (errors === 6) {
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
    if (correctGuess === 0) {
      return
    } else if (correctGuess === word.length) {
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
      <View style={styles.figureContainer}>
        <Svg height="250" width="200">
          <Line stroke="#ff8906" x1="100" y1="0" x2="100" y2="30" strokeWidth="5" />
          {errors > 0 && (
            <Circle cx="100" cy="50" r="25" stroke="#e53170" strokeWidth="2.5" fill="#e53170" />
          )}
          {errors > 1 && (
            <Rect
              x="98"
              y="75"
              width="5"
              height="80"
              stroke="#e53170"
              strokeWidth="2"
              fill="#e53170"
            />
          )}
          {errors > 2 && (
            <Line x1="40" y1="130" x2="100" y2="85" stroke="#e53170" strokeWidth="2" />
          )}
          {errors > 3 && (
            <Line x1="160" y1="130" x2="100" y2="85" stroke="#e53170" strokeWidth="2" />
          )}
          {errors > 4 && (
            <Line x1="50" y1="200" x2="100" y2="150" stroke="#e53170" strokeWidth="2" />
          )}
          {errors > 5 && (
            <Line x1="150" y1="200" x2="100" y2="150" stroke="#e53170" strokeWidth="2" />
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

    if (hasSpaces || hasNumbers || inputWord.length === 0) {
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
      <View key={index} style={styles.letterContainer}>
        <Text style={char.guessed ? styles.letterText : styles.hiddenText}>{char.letter}</Text>
      </View>
    ))
  }

  //funciton to render the alphabet---------------------------
  function renderAlphabet() {
    if (playerWon) {
      return <Text style={styles.messageText}>You won!</Text>
    } else {
      return (
        <View style={styles.alphabetContainer}>
          {alphabetList.map((char, index) => (
            <TouchableOpacity
              key={index}
              style={styles.alphaLetterBox}
              onPress={() => letterPressHandler(char.letter)}
            >
              <Text style={char.guessed ? styles.hiddenText : styles.alphaLetterText}>
                {char.letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    }
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
        <TouchableOpacity style={styles.playAgainButton} onPress={() => refreshGameHandler()}>
          <Text style={styles.menuItemText}>Play Again</Text>
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
    <View style={styles.container}>
      <Text style={styles.title}>Hangman Game</Text>
      {gameOver ? (
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalDisplay(true)}>
          <Text style={styles.menuItemText}>Start Game</Text>
        </TouchableOpacity>
      ) : (
        showImageHandler()
      )}
      <View style={styles.wordContainer}>{!gameOver && renderWord()}</View>
      {!gameOver && renderAlphabet()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDisplay}
        onRquestClose={() => setModalDisplay(!modalDisplay)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Player 1: Type A Word!</Text>
          <TextInput
            style={styles.hangmanInput}
            placeholder="type a word"
            onChangeText={(txt) => setInputWord(txt)}
          />
          <Text style={styles.modalText}>
            Pass the phone to player 1 so they can type in a word! Player 2 should not see this
            word. Once the word is submitted, pass the phone back to player 2!
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => submitWord()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default HangmanScreen
