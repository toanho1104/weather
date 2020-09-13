import React, { useState, useEffect } from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions, ImageBackground, ScrollView, RefreshControl,
} from 'react-native'
import axios from 'axios'
import LottieView from 'lottie-react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { loading } from '../../assets/animations'
import { search, menu, background1 } from '../../assets/images'
import { Fonts } from '../../assets/styles'

const { width, height } = Dimensions.get('window')
const MainScreen = (props) => {
  console.tron.log({ props })
  const { navigation, route } = props
  const [weather, setWeather] = useState(route?.params?.weather)
  const [isLoadingData, setIsLoadingData] = useState(false)

  useEffect(() => {
    getNewWeatherByLocation()
  }, [])

  const getNewWeatherByLocation = async () => {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=ho%20Chi%20Minh&appid=5a946fa5e49dfe52dca7c9e3e78e9463&units=metric')
    const timeout = setTimeout(() => {
      setWeather(response.data)
      AsyncStorage.setItem('weather', JSON.stringify(response.data))
      clearTimeout(timeout)
    }, 2000)
  }

  return (
    <View style={styles.container}>
      {/* <Image
        source={background1}
        style={{
          width,
          height,
          position: 'absolute',
        }}
      /> */}
      <ImageBackground source={background1} style={{ width, height }}>

        <SafeAreaView />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 34 / 375 * width }}>
          <Image
            source={search}
            style={{
              width: 40 / 375 * width,
              height: 40 / 375 * width,
            }}
            resizeMode="contain"
          />
          <Image
            source={menu}
            style={{
              width: 40 / 375 * width,
              height: 40 / 375 * width,
            }}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl
            refreshing={isLoadingData}
            onRefresh={async () => {
              setIsLoadingData(true)
              await getNewWeatherByLocation()
              setTimeout(() => {
                setIsLoadingData(false)
              }, 2000)
            }}
            tintColor="#fff"
          />}
        >
          <View style={{ paddingHorizontal: 34 / 375 * width }}>
            <Text style={{
              ...Fonts.bold, fontSize: 36 / 375 * width, color: '#FFFFFF', marginTop: 28 / 375 * width, marginBottom: 8 / 375 * width,
            }}
            >
              Ho Chi Minh City
            </Text>
            <Text style={{ ...Fonts.bold, fontSize: 18 / 375 * width, color: '#FFFFFF' }}>{moment().format('LT - dddd, DD MMM YYYY')}</Text>
          </View>
          <View style={{ paddingTop: 120 / 375 * width, paddingLeft: 34 / 375 * width }}>
            <Text style={{ color: 'white', ...Fonts.bold, fontSize: 96 / 375 * width }}>
              {`${parseInt(weather?.main?.temp, 10)} *`}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: `http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png` }}
                style={{
                  width: 40 / 375 * width, height: 40 / 375 * width, marginRight: 3 / 375 * width,
                }}
                resizeMode="contain"
              />
              <Text style={{ color: 'white', ...Fonts.bold, fontSize: 24 / 375 * width }}>
                {weather?.weather[0]?.main}
              </Text>
            </View>
          </View>

          <View style={{
            marginHorizontal: 27 / 375 * width, height: StyleSheet.hairlineWidth, backgroundColor: '#998383', marginTop: 52 / 375 * width,
          }}
          />

          <View style={{
            flexDirection: 'row', paddingHorizontal: 44 / 375 * width, justifyContent: 'space-between', marginTop: 40 / 375 * width,
          }}
          >
            <View>
              <Text style={{ ...Fonts.bold, fontSize: 24 / 375 * width, color: 'rgba(255,255,255,0.7)' }}>Wind</Text>
              <Text style={{
                ...Fonts.bold, fontSize: 36 / 375 * width, color: '#fff', marginVertical: 10 / 375 * width,
              }}
              >
                {weather?.wind?.speed}
              </Text>
              <Text style={{ ...Fonts.bold, fontSize: 24 / 375 * width, color: '#fff' }}>km/h</Text>
            </View>
            {weather?.rain ? <View>
              <Text style={{ ...Fonts.bold, fontSize: 24 / 375 * width, color: 'rgba(255,255,255,0.7)' }}>Rain</Text>
              <Text style={{
                ...Fonts.bold, fontSize: 36 / 375 * width, color: '#fff', marginVertical: 10 / 375 * width,
              }}
              >
                {weather?.rain['1h']}
              </Text>
              <Text style={{ ...Fonts.bold, fontSize: 24 / 375 * width, color: '#fff' }}>mm/h</Text>
            </View> : null}

            <View>
              <Text style={{ ...Fonts.bold, fontSize: 24 / 375 * width, color: 'rgba(255,255,255,0.7)' }}>Clouds</Text>
              <Text style={{
                ...Fonts.bold, fontSize: 36 / 375 * width, color: '#fff', marginVertical: 10 / 375 * width,
              }}
              >
                {weather?.clouds?.all}
              </Text>
              <Text style={{ ...Fonts.bold, fontSize: 24 / 375 * width, color: '#fff' }}>km/h</Text>
            </View>
          </View>
        </ScrollView>

      </ImageBackground>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
