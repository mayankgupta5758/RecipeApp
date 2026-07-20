import React, { createContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            console.log("Firebase User : ", user)
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    return (

        <AuthContext.Provider
            value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider