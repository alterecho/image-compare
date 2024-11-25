import { createContext } from "react"

const themeContext = createContext();

const lightTheme = {
    primaryColor: 'white',
    secondaryColor: 'grey'
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