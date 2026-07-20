import React from 'react'
import {
    Text,
    Platform
} from 'react-native'

import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs'

import {
    useSafeAreaInsets
} from 'react-native-safe-area-context'


import HomeScreen from '../screens/HomeScreen'
import Search from '../screens/Search'
import Favourite from '../screens/Favourite'
import Profile from '../screens/Profile'


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    const insets = useSafeAreaInsets()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#FF6B6B',
                tabBarInactiveTintColor: '#A0A0A0',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginBottom: Platform.OS === "android" ? 5 : 0
                },
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 0,
                    height:
                        Platform.OS === "android"
                            ? 65 + insets.bottom
                            : 88,
                    paddingTop: 8,
                    paddingBottom:
                        Platform.OS === "android"
                            ? insets.bottom + 5
                            : 10,
                    elevation: 12,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: -5
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    position: "absolute"
                },
                tabBarIcon: ({ focused }) => {
                    let icon = ""
                    if (route.name === "Home") {
                        icon = focused ? "🏠" : "🏡"
                    }
                    else if (route.name === "Search") {
                        icon = "🔍"
                    }
                    else if (route.name === "Favorite") {
                        icon = focused ? "❤️" : "🤍"
                    }
                    else if (route.name === "Profile") {
                        icon = focused ? "👤" : "🙂"
                    }
                    return (
                        <Text
                            style={{
                                fontSize: 23,
                                opacity: focused ? 1 : 0.65,
                                marginBottom: 4
                            }}
                        >
                            {icon}
                        </Text>
                    )
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Search"
                component={Search}
            />
            <Tab.Screen
                name="Favorite"
                component={Favourite}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator