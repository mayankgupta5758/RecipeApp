import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native'
import foodRecipes from '../data/dummydata'
import RecipeCard from '../components/RecipeCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [searchRecipe, setSearchRecipe] = useState([])

    const getSearchrecipe = () => {
        const recipeofSearchFood = foodRecipes.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        setSearchRecipe(recipeofSearchFood)
    }

    useEffect(() => {
        getSearchrecipe()
    }, [searchValue])

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Bar Wrapper */}
            <View style={styles.searchSection}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Search delicious recipes...'
                    placeholderTextColor="#999"
                    onChangeText={setSearchValue}
                    value={searchValue}
                />
            </View>

            {/* Results or Empty State */}
            {searchRecipe.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🍽️</Text>
                    <Text style={styles.emptyText}>No Recipes Found</Text>
                    <Text style={styles.emptySubText}>Try searching for something else!</Text>
                </View>
            ) : (
                <FlatList
                    data={searchRecipe}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <RecipeCard item={item} />
                    )}
                />
            )}
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 16,
        paddingTop: 20
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F5',
        borderRadius: 14,
        paddingHorizontal: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EAEAEA'
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 8
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 15,
        color: '#333',
        fontWeight: '500'
    },
    listContainer: {
        paddingBottom: 80
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