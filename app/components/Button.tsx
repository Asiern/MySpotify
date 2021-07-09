import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { palette } from '../theme/palette'

export interface ButtonProps {
    label: string
    onPress: () => void
    width: number
}

const Button = ({ label, onPress, width }: ButtonProps) => {
    const height = width * 0.2
    return (
        <RectButton
            style={[
                styles.container,
                { backgroundColor: palette.primary, width, height },
            ]}
            {...{ onPress }}
        >
            <Text style={styles.text}>{label}</Text>
        </RectButton>
    )
}

Button.defaultProps = {
    varian: 'default',
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 50,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: palette.dark,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        elevation: 1,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Medium',
        color: palette.white,
    },
})
export default Button
