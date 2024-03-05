'use client'
import React, { createContext, useState } from 'react';

const MyContext = createContext();;

const MyProvider = ({ children }) => {
  const [darkTheme, changeTheme] = useState(true);

  return (
    <MyContext.Provider value={{ darkTheme, changeTheme }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
