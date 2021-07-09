import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ToastAndroid, ScrollView, StyleSheet, Text, View } from 'react-native'

import Artist from '../components/Artist'
import useAccessToken from '../hooks/useAccessToken'
import { APIArtist } from '../interface'
import { palette } from '../theme/palette'

function Artists() {
    const [artists, setArtists] = useState<APIArtist[]>([])
    const navigation = useNavigation()
    async function fetchArtists() {
        const token = await useAccessToken()
        axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=5',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then(async function (response) {
                setArtists(response.data.items)
            })
            .catch(function (error) {
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            console.log('400')
                            ToastAndroid.show('Bad Request', 100)
                            break
                        case 401:
                            console.log('401')
                            ToastAndroid.show('User Token expired', 100)
                            navigation.navigate('Login')
                            break
                    }
                } else {
                    console.log(error)
                }
            })
    }
    useEffect(() => {
        fetchArtists()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text
                style={{
                    color: palette.white,
                    fontSize: 25,
                    fontFamily: 'Medium',
                }}
            >
                Artists
            </Text>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginBottom: 60,
                }}
            >
                {artists.map((item, i) => {
                    return (
                        <Artist
                            key={i}
                            name={item.name}
                            uri={item.images[0].url}
                            index={i + 1}
                            url={item.external_urls.spotify}
                        />
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default Artists
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.dark,
        paddingVertical: 60,
    },
})
