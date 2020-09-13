import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'

const SettingScreen = (props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
})
