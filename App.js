import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CompareImageScreen from './code/screens/CompareImageScreen/CompareImageScreen';
import CompareMetaDataScreen from './code/screens/CompareMetaDataScreen/CompareMetaDataScreen';

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
