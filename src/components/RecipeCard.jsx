import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const RecipeCard = ({ item }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => 
                navigation.navigate("RecipeDetail", {
                    recipeId: item.id
                })
            }
            style={({ pressed }) => [
                styles.cardContainer,
                pressed && styles.cardPressed 
            ]}
        >
            <Image
                source={{ uri: item.images[0] }}
                style={styles.image}
            />
            
            <View style={styles.contentContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {item.name}
                </Text>
                
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.description}
                >
                    {item.description}
                </Text>
                
                <View style={styles.row}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>🕒 {item.cookingTime}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>⭐ {item.rating}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default RecipeCard

const styles = StyleSheet.create({
    cardContainer: {
        width: 170,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden", 
        
        // Premium Subtle Shadow
        elevation: 4, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.08,
        shadowRadius: 8
    },

    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },

    image: {
        width: "100%",
        height: 120,
        backgroundColor: "#f0f0f0",
    },

    contentContainer: {
        padding: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: "700", 
        color: "#1A1A1A", 
        letterSpacing: 0.2,
    },

    description: {
        marginTop: 4,
        fontSize: 12,
        color: "#666",
        lineHeight: 16,
        minHeight: 32,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12
    },

    badge: {
        backgroundColor: "#F5F5F7", 
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#444",
    }
})