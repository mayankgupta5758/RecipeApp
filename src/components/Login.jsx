import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

const Login = () => {
    const googleLogin = async () => {

        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
            const response = await GoogleSignin.signIn()
            const { idToken } = response.data
            const tokens = await GoogleSignin.getTokens()
            const accessToken = tokens.accessToken
            console.log("ID TOKEN :", idToken)
            console.log("ACCESS TOKEN :", accessToken)

            const credential = auth.GoogleAuthProvider.credential(idToken, accessToken)
            await auth().signInWithCredential(credential)
            console.log("LOGIN SUCCESS")
        }
        catch (error) {
            console.log("Google Login Error :", error)
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Image
                    source={require('../assets/i1.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>Welcome To Recipe App</Text>

                <Pressable style={styles.button} onPress={googleLogin}>
                    <Text style={styles.buttonText}>
                        Login With Google
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 20
    },
    button: {
        backgroundColor: "#FF6B6B",
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold"
    }
})