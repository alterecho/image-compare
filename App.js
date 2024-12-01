import React, { useContext, useEffect, useRef, useState } from 'react';

import Theme from './src/Theme';
import NavigationComponent from './src/NavigationComponent';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  return (
    <Theme.context.Provider value={{ theme: isDarkMode ? Theme.darkTheme : Theme.lightTheme, toggleTheme: () => setIsDarkMode(!isDarkMode) }}>
      <NavigationComponent></NavigationComponent>
    </Theme.context.Provider>
  );
};

export default App;
