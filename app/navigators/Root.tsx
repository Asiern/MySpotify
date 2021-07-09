import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Login from '../screens/Login'
import Main from './Main'

const RootStack = createStackNavigator()

interface RootProps {
    initalRouteName: string | undefined
}

export default function Root({ initalRouteName }: RootProps) {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={initalRouteName}>
                <RootStack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
