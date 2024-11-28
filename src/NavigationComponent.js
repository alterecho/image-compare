import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompareImageScreen from './screens/CompareImageScreen/CompareImageScreen';
import CompareMetaDataScreen from './screens/CompareMetaDataScreen/CompareMetaDataScreen';
import MetaDataScreen from './screens/MetaDataScreen/MetaDataScreen';
import { Pages } from './screens/Constants';
import { useContext } from "react";
import { StyleSheet } from "react-native";
import Theme from './Theme';



const NavigationComponent = () => {
  const Stack = createNativeStackNavigator();
  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Pages.COMPARE_IMAGE_SCREEN}
        screenOptions={{ headerTintColor: styles.tintColor }}
      >
        <Stack.Screen
          name={Pages.COMPARE_IMAGE_SCREEN}
          component={CompareImageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Pages.COMPARE_META_DATA_PAGE}
          component={CompareMetaDataScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name={Pages.META_DATA_PAGE}
          component={MetaDataScreen}
          options={{ headerShown: true, headerTransparent: true, title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const makeStyleSheet = (theme) => {
  return StyleSheet.create(
    {
      tintColor: theme.primaryColor
    }
  );
};

export default NavigationComponent;