import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../theme/stylesTheme'
import { Alphabet } from '../utils/alphabet'
import InputModal from '../components/InputModal'
import SvgFigure from '../components/SvgFigure'
import { fetchWord } from '../utils/gameHelpers'

const HangmanScreen = () => {
  const [gameOver, setGameOver] = useState(true)
  const [modalDisplay, setModalDisplay] = useState(false)
  const [playerWon, setPlayerWon] = useState(false)
  const [word, setWord] = useState([])
  const [answerWord, setAnswerWord] = useState('')
  const [errors, setErrors] = useState(0)
  const [correctGuess, setCorrectGuess] = useState(0)
  const [alphabetList, setAlphabetList] = useState(Alphabet)

  //useEffect keeping track of errors & losting the game---------------
  useEffect(() => {
    if (errors === 6) {
      if (answerWord.definition.length === 0) {
        Alert.alert('You Lost!', `The answer was: ${answerWord.word}`, [
          {
            text: 'Play Again',
          },
        ])
        refreshGameHandler()
      } else {
        Alert.alert(
          'You Lost!',
          `The answer was ${answerWord.word}:
          ${answerWord.definition}`,
          [
            {
              text: 'Play Again',
            },
          ]
        )
        refreshGameHandler()
      }
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
      return <SvgFigure errors={errors} />
    }
  }

  //function to handle word submit------------------------------
  const submitWord = (inputWord) => {
    //Check to make sure there is no spaces or numbers--
    const hasSpaces = inputWord.includes(' ')
    const hasNumbers = /\d/.test(inputWord)
    if (hasSpaces || hasNumbers || inputWord.length <= 1) {
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

  const answerHandler = (word) => {
    setAnswerWord({ word, definition: '' })
  }

  async function fetchWordHandle() {
    const result = await fetchWord()
    setAnswerWord({ word: result[0].word, definition: result[0].definition })
    submitWord(result[0].word.toLowerCase())
  }

  //funciton to show the inputted word-------------------------
  function renderWord() {
    return word.map((char, index) => (
      <View key={index} style={styles.letterContainer}>
        <Text
          accessiblityLabel="container for the word to be guessed"
          style={char.guessed ? styles.letterText : styles.hiddenText}
        >
          {char.letter}
        </Text>
      </View>
    ))
  }

  //funciton to render the alphabet---------------------------
  function renderAlphabet() {
    if (playerWon) {
      return (
        <Text accessibilityLabel="You won message" style={styles.messageText}>
          You won!
        </Text>
      )
    } else {
      return (
        <ScrollView>
          <View
            accessibilityLabel="Press to guess a letter in the alphabet"
            style={styles.alphabetContainer}
          >
            {alphabetList.map((char, index) => (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Press to guess the letter"
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
        </ScrollView>
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

    if (filteredWord.length === 0) {
      setErrors(errors + 1)
    } else {
      setCorrectGuess(correctGuess + filteredWord.length)
    }

    let newWordArray = word.map((el) => (el.letter === lowerLetter ? { ...el, guessed: true } : el))

    setWord(newWordArray)
  }

  //function to start game refresh------------------------------
  function newGameHandler() {
    return (
      <>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Press to re-start the game"
          style={styles.playAgainButton}
          onPress={() => refreshGameHandler()}
        >
          <Text style={styles.menuItemText}>Play Again</Text>
        </TouchableOpacity>
      </>
    )
  }

  //function to refresh the game----------------------------------
  function refreshGameHandler() {
    setGameOver(true)
    setErrors(0)
    setCorrectGuess(0)
    setPlayerWon(false)
    setAlphabetList(Alphabet)
  }

  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.title}>Hangman Game</Text>
      {gameOver ? (
        <View>
          <TouchableOpacity
            accessibilityLabel="Play against another person"
            accessibilityRole="button"
            style={styles.menuItem}
            onPress={() => setModalDisplay(true)}
          >
            <Text style={styles.menuItemText}>Start Player vs Player</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Play against the computer"
            accessibilityRole="button"
            style={styles.menuItem}
            onPress={() => fetchWordHandle()}
          >
            <Text style={styles.menuItemText}>Start Player vs Aliens</Text>
          </TouchableOpacity>
        </View>
      ) : (
        showImageHandler()
      )}
      <View style={styles.wordContainer}>{!gameOver && renderWord()}</View>
      {!gameOver && renderAlphabet()}

      <InputModal
        accessibilityLabel="form for player 1 to write a word"
        accessibilityRole="form"
        modalDisplay={modalDisplay}
        submitWord={submitWord}
        answerHandler={answerHandler}
      />
    </View>
  )
}

export default HangmanScreen
