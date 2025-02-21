import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { Base_Url, Api_Key } from '../../config';

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("movie");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const searchTypes = [
    { label: "Movie", value: "movie" },
    { label: "Multi", value: "multi" },
    { label: "TV", value: "tv" },
  ];

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/search/${searchType}?api_key=${Api_Key}&query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter search term"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.dropdownButton}>
        <Text>Select Search Type</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {searchTypes.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.modalItem}
                onPress={() => {
                  setSearchType(item.value);
                  setIsModalVisible(false);
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      ) : (
        <Text style={styles.prompt}>Please enter a search term.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5F7FF',  
  },
  input: {
    height: 40,
    borderColor: '#B2D8F7',  
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',  
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
  prompt: {
    fontSize: 16,
    color: '#4F8EF7',  
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
