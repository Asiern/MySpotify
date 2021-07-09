import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import React from 'react'

import Root from './app/navigators/Root'

export default function App() {
    const [loaded, error] = useFonts({
        Regular: require('./assets/fonts/Poppins-Regular.ttf'),
        Medium: require('./assets/fonts/Poppins-Medium.ttf'),
    })
    if (error) {
        console.log('Could not load fonts')
    }

    const token = AsyncStorage.getItem('UserKey')

    if (!loaded) {
        return <AppLoading />
    }
    return <Root initalRouteName={token !== null ? 'Main' : 'Login'} />
}
