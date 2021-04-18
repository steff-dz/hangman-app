import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, Rect, Line, G } from 'react-native-svg'
import { styles } from '../theme/stylesTheme'

const SvgFigure = ({ errors }) => {
  return (
    <View accessibilityLabel="contains the hangman image" style={styles.figureContainer}>
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
        {errors > 2 && <Line x1="40" y1="130" x2="100" y2="85" stroke="#e53170" strokeWidth="2" />}
        {errors > 3 && <Line x1="160" y1="130" x2="100" y2="85" stroke="#e53170" strokeWidth="2" />}
        {errors > 4 && <Line x1="50" y1="200" x2="100" y2="150" stroke="#e53170" strokeWidth="2" />}
        {errors > 5 && (
          <Line x1="150" y1="200" x2="100" y2="150" stroke="#e53170" strokeWidth="2" />
        )}
      </Svg>
    </View>
  )
}

export default SvgFigure
