import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Button, View, Text, StyleSheet, Dimensions, useWindowDimensions, SafeAreaView, PanResponder, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CompareImageScreen from './screens/CompareImageScreen/CompareImageScreen';
import CompareMetaDataScreen from './screens/CompareMetaDataScreen/CompareMetaDataScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home' component={CompareImageScreen} />
        <Stack.Screen name='meta' component={CompareMetaDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
