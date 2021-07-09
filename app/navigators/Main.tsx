import { Feather } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'

import Artists from '../screens/Artists'
import Tracks from '../screens/Tracks'
import { palette } from '../theme/palette'

const BottomTabs = createMaterialBottomTabNavigator()

export default function Main() {
    return (
        <BottomTabs.Navigator
            shifting
            activeColor={palette.primary}
            inactiveColor={palette.white}
            barStyle={{
                backgroundColor: palette.dark,
            }}
        >
            <BottomTabs.Screen
                name="Artists"
                component={Artists}
                options={{
                    tabBarLabel: 'Artists',
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" color={color} size={24} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Albums"
                component={Tracks}
                options={{
                    tabBarLabel: 'Tracks',
                    tabBarIcon: ({ color }) => (
                        <Feather name="disc" color={color} size={24} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    )
}
