import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import foodRecipes from '../data/dummydata'
import RecipeCard from '../components/RecipeCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Popular Recipes</Text>

            <FlatList
                data={foodRecipes}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <RecipeCard item={item} />
                )}
            />
        </SafeAreaView>
    )
}

export default HomeScreen

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
        marginBottom: 16,
        letterSpacing: 0.3
    },
    listContainer: {
        paddingBottom: 80 
    },
    row: {
        justifyContent: 'space-between' 
    }
})