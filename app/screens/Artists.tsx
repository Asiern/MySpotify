import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import Artist from '../components/Artist'
import useAccessToken from '../hooks/useAccessToken'
import { APIArtist } from '../interface'
import { palette } from '../theme/palette'

function Artists() {
    const [artists, setArtists] = useState<APIArtist[]>([])
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
                console.log(error)
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
