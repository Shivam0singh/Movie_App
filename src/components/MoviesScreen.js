import { View, Text, FlatList, ActivityIndicator, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Base_Url, Api_Key } from '../../config';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("now_playing");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const resultsPerPage = 10;

  const categories = [
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  useEffect(() => {
    fetchMovies(category, currentPage);
  }, [category, currentPage]);

  const fetchMovies = async (category, page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/movie/${category}?api_key=${Api_Key}&language=en-US&page=${page}`);
      const newMovies = response.data.results;
      setMovies(newMovies);

      setTotalPages(response.data.total_pages); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>Select Category</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
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
                  setCurrentPage(1);
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#6CC4A1" style={styles.loader} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          onEndReachedThreshold={0.5} 
          style={styles.flatList}
        />
      )}
      {totalPages > 1 && !loading && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() => handlePageChange(currentPage - 1)}
            style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          >
            <Text style={styles.pageText}>◀ Prev</Text>
          </TouchableOpacity>

          <Text style={styles.pageNumber}>Page {currentPage}</Text>

          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => handlePageChange(currentPage + 1)}
            style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          >
            <Text style={styles.pageText}>Next ▶</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF", 
    padding: 20,
  },
  dropdownButton: {
    backgroundColor: "#A3D8F4", 
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  dropdownButtonText: {
    color: "#1C3B53", 
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", 
  },
  modalContent: {
    backgroundColor: "#F9F9F9", 
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD", 
  },
  modalText: {
    color: "#1C3B53", 
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 15,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#F08080", 
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 50,
  },
  flatList: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 10,
  },
  pageButton: {
    backgroundColor: "#A3D8F4", 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageText: {
    color: "#1C3B53", 
    fontSize: 16,
  },
  pageNumber: {
    color: "#1C3B53", 
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MoviesScreen;
