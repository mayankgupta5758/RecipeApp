import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
    Pressable
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe"
import foodRecipes from '../data/dummydata'
import { favouriteIds } from '../data/favouriteData'

const { width } = Dimensions.get("window")

const RecipeDetail = ({ route }) => {
    const { recipeId } = route.params
    const recipe = foodRecipes.find(item => item.id === recipeId)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isFavourite, setIsFavourite] = useState(favouriteIds.includes(recipeId))
    const sliderRef = useRef()

    useEffect(() => {
        const timer = setInterval(() => {
            let next = activeIndex + 1
            if (next >= recipe?.images.length) {
                next = 0
            }
            sliderRef.current?.scrollToIndex({
                index: next,
                animated: true
            })
            setActiveIndex(next)
        }, 3000)

        return () => clearInterval(timer)
    }, [activeIndex])

    if (!recipe) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Recipe Not Found</Text>
            </View>
        )
    }

    const handleFavourite = () => {
        if (isFavourite) {
            const index = favouriteIds.indexOf(recipe.id)
            if (index > -1) {
                favouriteIds.splice(index, 1)
            }
            setIsFavourite(false)
        } else {
            favouriteIds.push(recipe.id)
            setIsFavourite(true)
        }
    }

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
            style={styles.mainContainer}
        >
            {/* Banner Slider */}
            <View style={styles.sliderContainer}>
                <FlatList
                    ref={sliderRef}
                    data={recipe.images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / width)
                        setActiveIndex(index)
                    }}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.bannerImage} />
                    )}
                />
                {/* Dots Indicator */}
                <View style={styles.dots}>
                    {recipe.images.map((_, index) => (
                        <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                    ))}
                </View>
            </View>

            <View style={styles.container}>
                {/* Title & Favourite Action */}
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{recipe.name}</Text>
                    <Pressable 
                        style={[styles.iconActionBtn, isFavourite && styles.iconActionActive]} 
                        onPress={handleFavourite}
                    >
                        <Text style={styles.heartIcon}>{isFavourite ? "❤️" : "🤍"}</Text>
                    </Pressable>
                </View>

                {/* Rating & Reviews */}
                <View style={styles.ratingBox}>
                    <Text style={styles.ratingText}>⭐ {recipe.rating}</Text>
                    <Text style={styles.reviewText}>💬 {recipe.reviews} Reviews</Text>
                </View>

                {/* Meta Details Card */}
                <View style={styles.metaCard}>
                    <Info title="🌍 Origin" value={recipe.origin} />
                    <Info title="📂 Category" value={recipe.category} />
                    <Info title="⚡ Difficulty" value={recipe.difficulty} />
                    <Info title="⏳ Prep Time" value={recipe.preparationTime} />
                    <Info title="🔥 Cook Time" value={recipe.cookingTime} />
                </View>

                {/* Video Section */}
                <Section title="📹 Recipe Video">
                    <View style={styles.videoBox}>
                        <YoutubePlayer
                            height={210}
                            width={width - 32}
                            play={false}
                            videoId={getYoutubeId(recipe.youtube)}
                        />
                    </View>
                </Section>

                {/* Description */}
                <Section title="🍽️ About Recipe">
                    <Text style={styles.text}>{recipe.description}</Text>
                </Section>

                {/* History */}
                <Section title="📜 History">
                    <Text style={styles.text}>{recipe.history}</Text>
                </Section>

                {/* Ingredients */}
                <Section title="🛒 Ingredients">
                    {recipe.ingredients.map((item, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <Text style={styles.ingredientName}>🥘 {item.name}</Text>
                            <Text style={styles.ingredientQty}>{item.quantity}</Text>
                        </View>
                    ))}
                </Section>

                {/* Steps */}
                <Section title="🍳 Cooking Steps">
                    {recipe.steps.map((item, index) => (
                        <View key={index} style={styles.stepCard}>
                            <Text style={styles.stepTitle}>Step {item.step}: {item.title}</Text>
                            <Text style={styles.text}>{item.description}</Text>
                        </View>
                    ))}
                </Section>

                {/* Nutrition */}
                <Section title="💪 Nutrition Info">
                    <View style={styles.nutritionGrid}>
                        <View style={styles.nutritionBadge}><Text style={styles.nutritionText}>🔥 {recipe.nutrition.calories}</Text></View>
                        <View style={styles.nutritionBadge}><Text style={styles.nutritionText}>🥩 {recipe.nutrition.protein}</Text></View>
                        <View style={styles.nutritionBadge}><Text style={styles.nutritionText}>🍚 {recipe.nutrition.carbs}</Text></View>
                        <View style={styles.nutritionBadge}><Text style={styles.nutritionText}>🧈 {recipe.nutrition.fat}</Text></View>
                    </View>
                </Section>

                {/* Cooking Tips */}
                <Section title="💡 Expert Cooking Tips">
                    {recipe.tips.map((tip, index) => (
                        <View key={index} style={styles.tipCard}>
                            <Text style={styles.tipText}>💡 {tip}</Text>
                        </View>
                    ))}
                </Section>
            </View>
        </ScrollView>
    )
}

const getYoutubeId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/
    const match = url.match(regex)
    return match ? match[1] : ""
}

const Info = ({ title, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
)

const Section = ({ title, children }) => (
    <View style={styles.section}>
        <Text style={styles.heading}>{title}</Text>
        {children}
    </View>
)

export default RecipeDetail

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FAFAFA',
    },
    container: {
        paddingHorizontal: 16
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFF'
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500'
    },
    sliderContainer: {
        position: 'relative',
    },
    bannerImage: {
        width: width,
        height: 280,
        resizeMode: "cover"
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.5)",
        marginHorizontal: 4
    },
    activeDot: {
        width: 18,
        backgroundColor: "#FFF"
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1A1A1A",
        flex: 1,
        marginRight: 10
    },
    iconActionBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconActionActive: {
        backgroundColor: '#FFF1F2',
    },
    heartIcon: {
        fontSize: 20,
    },
    ratingBox: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 8,
        gap: 16
    },
    ratingText: {
        fontWeight: "700",
        fontSize: 15,
        color: '#222'
    },
    reviewText: {
        fontSize: 14,
        color: "#666",
        fontWeight: '500'
    },
    metaCard: {
        backgroundColor: "#FFF",
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        borderRadius: 16,
        marginTop: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    infoItem: {
        width: '50%',
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        marginBottom: 2
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333'
    },
    section: {
        marginTop: 24
    },
    heading: {
        fontSize: 18,
        fontWeight: "700",
        color: '#1A1A1A',
        marginBottom: 12
    },
    videoBox: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: '#000'
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        color: "#4A4A4A"
    },
    ingredientRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "#FFF",
        padding: 14,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#EAEAEA'
    },
    ingredientName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333'
    },
    ingredientQty: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF6B6B'
    },
    stepCard: {
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6B6B',
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: '#1A1A1A',
        marginBottom: 6
    },
    nutritionGrid: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8
    },
    nutritionBadge: {
        backgroundColor: "#F1F3F5",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        flex: 1,
        minWidth: '22%',
        alignItems: 'center'
    },
    nutritionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#495057'
    },
    tipCard: {
        backgroundColor: "#FFF9DB",
        padding: 14,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#FFE066'
    },
    tipText: {
        fontSize: 14,
        color: "#664D03",
        lineHeight: 20,
        fontWeight: '500'
    }
})