import { createContext } from "react"

const themeContext = createContext();

const lightTheme = {
    primaryColor: '#FFFFFF',
    primaryDisabledColor: '#FFFFFF77',
    secondaryColor: '#A9A9A9',
    secondaryDisabledColor: '#A9A9A977'
};

const darkTheme = {
    primaryColor: lightTheme.secondaryColor,
    primaryDisableColor: lightTheme.primaryDisabledColor,
    secondaryColor: lightTheme.primaryColor,
    secondaryDisabledColor: lightTheme.secondaryDisabledColor,
};

const Theme = {
    context: themeContext,
    lightTheme: lightTheme,
    darkTheme: darkTheme
}

export default Theme;