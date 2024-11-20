import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CompareImageScreen from './screens/CompareImageScreen/CompareImageScreen';
import CompareMetaDataScreen from './screens/CompareMetaDataScreen/CompareMetaDataScreen';
import MetaDataScreen from './screens/MetaDataScreen/MetaDataScreen';
import { Pages } from './screens/Constants';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Pages.COMPARE_IMAGE_SCREEN}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Pages.COMPARE_IMAGE_SCREEN} component={CompareImageScreen} />
        <Stack.Screen name={Pages.COMPARE_META_DATA_PAGE} component={CompareMetaDataScreen} />
        <Stack.Screen name={Pages.META_DATA_PAGE} component={MetaDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
