import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainScreen, SettingScreen, SplashScreen } from './src/screens'

const Stack = createStackNavigator()
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
})
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ cardStyleInterpolator: forFade }} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
