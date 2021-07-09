import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import {
    makeRedirectUri,
    ResponseType,
    useAuthRequest,
} from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import Button from '../components/Button'
import { palette } from '../theme/palette'

const { width } = Dimensions.get('screen')

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

const Login = () => {
    const navigation = useNavigation()
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: 'ea0ce72691154051a57d454380f65754',
            scopes: ['user-top-read', 'playlist-modify-public'],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: makeRedirectUri({
                native: 'my-spotify://',
            }),
        },
        discovery
    )
    console.log(
        makeRedirectUri({
            native: 'my-spotify://',
        })
    )
    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params
            //TODO save access_token
            AsyncStorage.setItem('UserKey', access_token)
            console.log('access_token set')
            console.log(access_token)
            navigation.navigate('Main')
        }
    }, [response])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to MySpotify</Text>
            <Text style={styles.text}>Please login to continue</Text>
            <Button
                width={width - 60}
                label="Login"
                onPress={() => {
                    promptAsync()
                }}
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: palette.dark,
        alignItems: 'center',
    },
    text: {
        color: palette.white,
        fontSize: 20,
        padding: 20,
        fontFamily: 'Regular',
    },
})
