import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text, ToastAndroid } from 'react-native'

import Track from '../components/Track'
import useAccessToken from '../hooks/useAccessToken'
import { APIAlbum } from '../interface'
import { palette } from '../theme/palette'

export default function Tracks() {
    const [albums, setAlbums] = useState<APIAlbum[]>([])
    const navigation = useNavigation()
    async function fetchArtists() {
        const token = await useAccessToken()
        axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=5',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then(async function (response) {
                setAlbums(response.data.items)
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
                Albums
            </Text>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginBottom: 60,
                }}
            >
                {albums.map((item, i) => {
                    return (
                        <Track
                            key={i}
                            index={i + 1}
                            uri={item.album.images[0].url}
                            author={item.album.artists[0].name}
                            name={item.name}
                            url={item.external_urls.spotify}
                        />
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.dark,
        paddingVertical: 60,
    },
})
