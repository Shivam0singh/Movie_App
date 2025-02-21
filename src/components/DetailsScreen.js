import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { movie } = route.params;

    const movieData = [movie];

    return (
        <FlatList
            data={movieData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>← Back to List</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{item.name || item.title}</Text>
                    </View>

                    <Text style={styles.title}>{item.name || item.title}</Text>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.image}
                    />
                    <Text style={styles.overview}>{item.overview}</Text>
                    <View style={styles.row}>
                        <Text style={styles.text}>Popularity: {item.popularity.toFixed(1)}</Text>
                        <Text style={styles.text}>
                            Release Date: {item.release_date || item.first_air_date}
                        </Text>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 15,
    },
    backButton: {
        padding: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        marginRight: 10,
    },
    backButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
    },
    overview: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    text: {
        fontSize: 14,
        color: "gray",
    },
});

export default DetailsScreen;