import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Movies App</Text>
      </View>
      <AppNavigator />
      <StatusBar style="dark" />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", 
  },
  header: {
    height: 110,
    backgroundColor: "rgb(163, 216, 244)", 
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  headerText: {
    color: "#fff", 
    paddingTop: 50,
    fontSize: 24, 
    fontWeight: "bold",
  },
});
