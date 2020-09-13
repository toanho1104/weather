import React, { useEffect } from 'react'
import {
  View, StyleSheet, Image, Dimensions,
} from 'react-native'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { StackActions } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { loading } from '../../assets/animations'
import { background1 } from '../../assets/images'

const { width, height } = Dimensions.get('window')
const SplashScreenn = (props) => {
  const { navigation } = props

  useEffect(() => {
    getDataFromAsyncStorage()
  }, [])

  const getDataFromAsyncStorage = async () => {
    const oldWeather = await AsyncStorage.getItem('weather')
    SplashScreen.hide()
    navigation.replace('MainScreen', { weather: JSON.parse(oldWeather) })
  }

  return (
    <View style={styles.container}>
      <Image
        source={background1}
        style={{ width, height }}
        resizeMode="cover"
      />
    </View>
  )
}

export default SplashScreenn

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
