import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import RecipeDetail from '../components/RecipeDetail'
import { AuthContext } from '../auth/AuthProvider'
import Login from '../components/Login'

const Stack = createNativeStackNavigator()
const StackNavigator = () => {

    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return null
    }
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {user ?
                <>
                    <Stack.Screen
                        name="Tabs"
                        component={TabNavigator}
                    />
                    <Stack.Screen
                        name="RecipeDetail"
                        component={RecipeDetail}
                    />
                </>
                :
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
            }
        </Stack.Navigator>
    )
}

export default StackNavigator