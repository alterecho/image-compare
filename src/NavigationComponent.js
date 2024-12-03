import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompareImageScreen from './screens/CompareImageScreen/CompareImageScreen';
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