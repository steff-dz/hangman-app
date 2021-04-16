import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu'
import { StyleSheet } from 'react-native'
import theme from './theme'

const stylesTheme = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    color: theme.palette.white,
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
})

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.black,
    color: theme.palette.white,
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: theme.fontSizes.xl,
    color: theme.palette.white,
    marginTop: '5%',
  },
  menuItem: {
    marginTop: '10%',
    backgroundColor: theme.palette.orange,
    padding: theme.space[4],
    borderRadius: 15,
  },
  menuItemText: {
    fontSize: theme.fontSizes.lg,
    color: theme.palette.white,
    fontFamily: 'Ubuntu_300Light',
  },
  modalContainer: {
    backgroundColor: theme.palette.coral,
    borderWidth: 1,
    height: 400,
    borderColor: theme.palette.black,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginTop: '18%',
  },
  modalTitle: {
    fontSize: theme.fontSizes.lg,
    color: theme.palette.white,
    marginTop: theme.space[3],
    fontFamily: 'Ubuntu_400Regular',
    textAlign: 'center',
  },
  hangmanInput: {
    backgroundColor: theme.palette.white,
    paddingLeft: theme.space[4],
    fontSize: theme.fontSizes.sm,
    height: 40,
    marginTop: theme.space[4],
    width: '90%',
    alignSelf: 'center',
  },
  modalText: {
    fontFamily: 'Ubuntu_400Regular',
    color: theme.palette.white,
    fontSize: theme.fontSizes.md,
    textAlign: 'left',
    paddingTop: theme.space[4],
    paddingLeft: theme.space[4],
    letterSpacing: 1.5,
  },
  modalButton: {
    width: 200,
    backgroundColor: theme.palette.white,
    alignSelf: 'center',
    marginTop: theme.space[5],
    borderRadius: 15,
  },
  buttonText: {
    color: theme.palette.black,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: theme.fontSizes.md,
    textAlign: 'center',
    padding: theme.space[3],
  },
  figureContainer: {
    borderBottomWidth: 15,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderColor: theme.palette.orange,
  },
  wordContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.space[3],
  },
  letterContainer: {
    height: 45,
    width: 45,
    backgroundColor: theme.palette.white,
    marginLeft: theme.space[1],
    marginRight: theme.space[1],
  },
  letterText: {
    fontSize: theme.fontSizes.lg,
    fontFamily: 'Ubuntu_400Regular',
    textAlign: 'center',
  },
  hiddenText: {
    display: 'none',
  },
  alphabetContainer: {
    marginTop: theme.space[3],
    width: '100%',
    height: 300,
    backgroundColor: theme.palette.coral,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  alphaLetterBox: {
    height: 50,
    width: 50,
  },
  alphaLetterText: {
    fontSize: theme.fontSizes.xl,
    fontFamily: 'Ubuntu_400Regular',
  },
  playAgainButton: {
    backgroundColor: theme.palette.orange,
    padding: theme.space[4],
    borderRadius: 15,
  },
  messageText: {
    color: theme.palette.white,
    fontSize: theme.fontSizes.md,
    fontFamily: 'Ubuntu_400Regular',
  },
})
