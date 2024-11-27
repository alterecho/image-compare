import React, { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CompareImageScreen from './screens/CompareImageScreen/CompareImageScreen';
import CompareMetaDataScreen from './screens/CompareMetaDataScreen/CompareMetaDataScreen';
import MetaDataScreen from './screens/MetaDataScreen/MetaDataScreen';
import { Pages } from './screens/Constants';
import Theme from './Theme';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const Stack = createNativeStackNavigator();
  return (
    <Theme.context.Provider value={{ theme: isDarkMode ? Theme.darkTheme : Theme.lightTheme , toggleTheme: () => setIsDarkMode(!isDarkMode) }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Pages.COMPARE_IMAGE_SCREEN}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Pages.COMPARE_IMAGE_SCREEN} component={CompareImageScreen} />
          <Stack.Screen name={Pages.COMPARE_META_DATA_PAGE} component={CompareMetaDataScreen} />
          <Stack.Screen name={Pages.META_DATA_PAGE} component={MetaDataScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Theme.context.Provider>
  );
};

export default App;
