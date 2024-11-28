import React, { useContext, useEffect, useRef, useState } from 'react';

import Theme from './Theme';
import NavigationComponent from './NavigationComponent';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  return (
    <Theme.context.Provider value={{ theme: isDarkMode ? Theme.darkTheme : Theme.lightTheme, toggleTheme: () => setIsDarkMode(!isDarkMode) }}>
      <NavigationComponent></NavigationComponent>
    </Theme.context.Provider>
  );
};

export default App;
