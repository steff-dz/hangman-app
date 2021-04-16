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
    marginTop: '10%',
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
    marginTop: theme.space[3],
    width: '90%',
    alignSelf: 'center',
  },
  modalText: {
    fontFamily: 'Ubuntu_400Regular',
    color: theme.palette.white,
    fontSize: theme.fontSizes.md,
    textAlign: 'left',
    paddingTop: theme.space[3],
    paddingLeft: theme.space[4],
    letterSpacing: 1.5,
  },
  modalButton: {
    borderWidth: 2,
    borderColor: theme.palette.black,
    width: 200,
    backgroundColor: theme.palette.orange,
    alignSelf: 'center',
    marginTop: theme.space[4],
    borderRadius: 15,
  },
  buttonText: {
    color: theme.palette.black,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: theme.fontSizes.md,
    textAlign: 'center',
    padding: theme.space[3],
  },
})
