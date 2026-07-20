import React, {
    useContext,
    useState,
    useEffect
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    Alert,
    ActivityIndicator,
    PermissionsAndroid,
    Platform
} from 'react-native'


import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker'


import auth from '@react-native-firebase/auth'

import firestore from '@react-native-firebase/firestore'


import {
    AuthContext
} from '../auth/AuthProvider'



const Profile = () => {


    const { user } = useContext(AuthContext)


    const [profileImage, setProfileImage] = useState(null)

    const [loading, setLoading] = useState(false)



    useEffect(() => {

        if (user) {
            getUserData()
        }

    }, [user])





    const getUserData = async () => {

        try {


            const snap =
                await firestore()
                    .collection("users")
                    .doc(user.uid)
                    .get()



            if (snap.exists) {

                setProfileImage(
                    snap.data().photoURL
                )

            }
            else {

                setProfileImage(
                    user.photoURL
                )

            }


        }
        catch (error) {

            console.log(error)

        }

    }





    const cameraPermission = async () => {


        if (Platform.OS === "android") {


            const permission =
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA
                )


            return permission ===
                PermissionsAndroid.RESULTS.GRANTED

        }


        return true

    }





    const chooseImage = () => {


        Alert.alert(

            "Select Image",

            "Choose Source",

            [

                {
                    text: "Camera",
                    onPress: openCamera
                },


                {
                    text: "Gallery",
                    onPress: openGallery
                },


                {
                    text: "Cancel"
                }

            ]

        )


    }






    const openCamera = async () => {


        const permission =
            await cameraPermission()



        if (!permission) {

            Alert.alert(
                "Camera permission required"
            )

            return

        }



        launchCamera(

            {
                mediaType: "photo",
                quality: 0.8
            },

            response => {


                if (response.assets) {

                    uploadImage(
                        response.assets[0].uri
                    )

                }


            }

        )


    }







    const openGallery = () => {


        launchImageLibrary(

            {
                mediaType: "photo",
                quality: 0.8
            },


            response => {


                if (response.assets) {


                    uploadImage(
                        response.assets[0].uri
                    )


                }


            }


        )


    }







    const uploadImage = async (uri) => {


        try {


            setLoading(true)



            const formData =
                new FormData()



            formData.append(
                "file",
                {
                    uri: uri,
                    type: "image/jpeg",
                    name: `profile_${Date.now()}.jpg`
                }
            )



            formData.append(
                "upload_preset",
                "Upladpreset"
            )



            const response =
                await fetch(

                    "https://api.cloudinary.com/v1_1/cloudinaryname/image/upload",

                    {
                        method: "POST",
                        body: formData
                    }

                )



            const data =
                await response.json()



            console.log(
                "Cloudinary URL",
                data.secure_url
            )



            setProfileImage(
                data.secure_url
            )



            await saveUserProfile(
                data.secure_url
            )



        }
        catch (error) {

            console.log(
                "Upload Error",
                error
            )

        }
        finally {

            setLoading(false)

        }


    }








    const saveUserProfile = async (url) => {


        try {


            await firestore()

                .collection("users")

                .doc(user.uid)

                .set(

                    {

                        uid: user.uid,

                        name: user.displayName,

                        email: user.email,

                        photoURL: url,

                        updatedAt:
                            firestore.FieldValue.serverTimestamp()

                    },

                    {
                        merge: true
                    }

                )


        }
        catch (error) {

            console.log(error)

        }


    }






    const logout = async () => {

        await auth().signOut()

    }






    return (

        <View style={styles.container}>


            <View style={styles.card}>


                <Pressable
                    onPress={chooseImage}
                >


                    {
                        loading ?

                            <ActivityIndicator
                                size="large"
                            />


                            :

                            <Image

                                source={{

                                    uri:

                                        profileImage ?

                                            profileImage :

                                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

                                }}

                                style={styles.image}

                            />

                    }



                </Pressable>




                <Text style={styles.name}>

                    {user?.displayName}

                </Text>



                <Text style={styles.email}>

                    {user?.email}

                </Text>



                <Pressable

                    style={styles.photoBtn}

                    onPress={chooseImage}

                >

                    <Text style={styles.btnText}>

                        Change Photo

                    </Text>


                </Pressable>



                <Pressable

                    style={styles.logout}

                    onPress={logout}

                >

                    <Text style={styles.btnText}>

                        Logout

                    </Text>


                </Pressable>



            </View>


        </View>

    )

}


export default Profile



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF7F5"
    },


    card: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 25,
        alignItems: "center",
        borderRadius: 20,
        elevation: 8
    },


    image: {
        width: 130,
        height: 130,
        borderRadius: 65,
        marginBottom: 20
    },


    name: {
        fontSize: 24,
        fontWeight: "bold"
    },


    email: {
        marginTop: 8,
        color: "gray"
    },


    photoBtn: {
        marginTop: 25,
        backgroundColor: "#4CAF50",
        padding: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },


    logout: {
        marginTop: 15,
        backgroundColor: "#FF6B6B",
        padding: 12,
        paddingHorizontal: 50,
        borderRadius: 25
    },


    btnText: {
        color: "#fff",
        fontWeight: "bold"
    }


})
