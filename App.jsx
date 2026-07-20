import './src/config/googleConfig'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator'
import AuthProvider from './src/auth/AuthProvider'

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </AuthProvider>
    )
}

export default App