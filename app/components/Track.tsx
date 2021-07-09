import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ImageBackground,
    View,
    Dimensions,
    Linking,
} from 'react-native'

import { palette } from '../theme/palette'

const { width } = Dimensions.get('screen')

interface TrackProps {
    name: string
    uri: string
    author: string
    index: number
    url: string
}

export default function Track({ index, uri, author, name, url }: TrackProps) {
    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(url)}
            style={styles.container}
        >
            <ImageBackground
                source={{
                    uri,
                }}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
            >
                <View style={styles.content}>
                    <Text style={styles.text}>#{index}</Text>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text}>{author}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        elevation: 5,
        height: 150,
        width: width - 40,
        marginVertical: 10,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: palette.white,
        fontFamily: 'Regular',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
})
