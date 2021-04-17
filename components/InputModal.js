import React, { useState } from 'react'
import { View, Modal, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../theme/stylesTheme'

const InputModal = ({ modalDisplay, submitWord }) => {
  //const [modalDisplay, setModalDisplay] = useState(false)
  const [inputWord, setInputWord] = useState('')

  function handleInput() {
    let editedWord = inputWord.toLowerCase()
    submitWord(editedWord)
    setInputWord('')
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalDisplay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Player 1: Type A Word!</Text>
        <TextInput
          style={styles.hangmanInput}
          placeholder="type a word"
          onChangeText={(txt) => setInputWord(txt)}
        />
        <Text style={styles.modalText}>
          Pass the phone to player 1 so they can type in a word! Player 2 should not see this word.
          Once the word is submitted, pass the phone back to player 2!
        </Text>
        <TouchableOpacity style={styles.modalButton} onPress={() => handleInput()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default InputModal
