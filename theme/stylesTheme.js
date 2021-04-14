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
    fontSize: 40,
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
    fontSize: 30,
    color: theme.palette.white,
    fontFamily: 'Ubuntu_300Light',
  },
})

// const MenuItem = styled.TouchableOpacity`
//   margin-top: 10%;
//   background-color: #ff8906;
//   padding: 15px;
//   border-radius: 15px;
// `
