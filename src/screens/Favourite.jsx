import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import foodRecipes from '../data/dummydata'
import { favouriteIds } from '../data/favouriteData'
import RecipeCard from '../components/RecipeCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Favourite = ({ navigation }) => {
    const [favouriteRecipes, setFavouriteRecipes] = useState([])

    const getFavouriteRecipes = () => {
        const data = foodRecipes.filter(
            item => favouriteIds.includes(item.id)
        )
        setFavouriteRecipes(data)
    }

    useFocusEffect(
        useCallback(() => {
            getFavouriteRecipes()
        }, [])
    )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Favourite Recipes</Text>

            {favouriteRecipes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>❤️</Text>
                    <Text style={styles.emptyText}>No Favourite Recipe Added</Text>
                    <Text style={styles.emptySubText}>Explore recipes and mark your favorites!</Text>
                </View>
            ) : (
                <FlatList
                    data={favouriteRecipes}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={styles.row} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <RecipeCard
                            item={item}
                            navigation={navigation}
                        />
                    )}
                />
            )}
        </SafeAreaView>
    )
}

export default Favourite

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 16,
        paddingTop: 20
    },
    heading: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1A1A1A",
        marginBottom: 20,
        letterSpacing: 0.3
    },
    listContainer: {
        paddingBottom: 20
    },
    row: {
        justifyContent: 'space-between' 
    },
    emptyContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    emptyIcon: {
        fontSize: 50,
        marginBottom: 16,
        opacity: 0.3 
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 6
    },
    emptySubText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        lineHeight: 20
    }
})