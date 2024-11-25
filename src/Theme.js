import { createContext } from "react"

const themeContext = createContext();

const lightTheme = {
    primaryColor: '#FFFFFF',
    secondaryColor: '#A9A9A9'
};

const darkTheme = {
    primaryColor: lightTheme.secondaryColor,
    secondaryColor: lightTheme.primaryColor
};

const Theme = {
    context: themeContext,
    lightTheme: lightTheme,
    darkTheme: darkTheme
}

export default Theme;