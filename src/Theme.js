import { createContext } from "react"

const themeContext = createContext();

const lightTheme = {
    primaryColor: '#FFFFFF',
    primaryDisabledColor: '#FFFFFF77',
    secondaryColor: '#777777',
    secondaryDisabledColor: '#77777777'
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