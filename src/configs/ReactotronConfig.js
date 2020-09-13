import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'

Reactotron.clear()
const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Weather React Native',
    host: 'localhost',
    port: 6969,
  })
  .useReactNative()
  .connect()
console.tron = reactotron

export default reactotron
