import { View, Text, FlatList, ActivityIndicator, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Base_Url, Api_Key } from '../../config';

const TvShowsScreen = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("airing_today");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const categories = [
    { label: "Airing Today", value: "airing_today" },
    { label: "On The Air", value: "on_the_air" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
  ];

  useEffect(() => {
    fetchTvShows(category);
  }, [category]);

  const fetchTvShows = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/tv/${category}?api_key=${Api_Key}&language=en-US&page=1`);
      setTvShows(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.dropdownButton}>
        <Text>Select Category</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.modalItem}
                onPress={() => {
                  setCategory(item.value);
                  setIsModalVisible(false);
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <FlatList
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          contentContainerStyle={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E5F7FF', 
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#B2D8F7',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#F0F8FF', 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
  },
  flatList: {
    paddingBottom: 20,
  },
});

export default TvShowsScreen;
