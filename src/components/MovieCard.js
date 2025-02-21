import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ movie }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title || movie.name}</Text>
        <Text style={styles.text}>Popularity: {movie.popularity.toFixed(1)}</Text>
        <Text style={styles.text}>
          Release Date: {movie.release_date || movie.first_air_date}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Details", { movie })}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "gray",
    marginBottom: 3,
  },
  button: {
    marginTop: 10,
    backgroundColor: "rgb(81, 154, 222)", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 5,
    alignSelf: "flex-start", 
    minWidth: 120, 
    justifyContent: "center", 
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center", 
  },
});

export default MovieCard;
