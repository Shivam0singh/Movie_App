import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesScreen from '../components/MoviesScreen';
import TvShowsScreen from '../components/TvshowsScreen';
import SearchScreen from '../components/SearchScreen';
import DetailsScreen from '../components/DetailsScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MoviesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MoviesList" component={MoviesScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

const TvShowsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TvShowsList" component={TvShowsScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchList" component={SearchScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "rgb(163, 216, 244)",  
            borderTopWidth: 2,                       
            borderBottomWidth: 2,                    
            borderColor: '#fff',                     
          },
          tabBarLabelStyle: { 
            color: '#333',                           
          },
          tabBarIndicatorStyle: {
            backgroundColor: "rgb(45, 126, 204)",    
            height: 3,                                
          },
        }}
      >
        <Tab.Screen name="Movies" component={MoviesStack} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="TV Shows" component={TvShowsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
