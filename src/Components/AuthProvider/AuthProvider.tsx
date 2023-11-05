import React, { ReactNode, createContext, useState } from 'react';

 

type AuthContextType = {

  isLoggedIn: boolean;
  // setIsLoggedIn: (value: boolean) => void;
  logIn: () => void;

  logOut: () => void;

};

type AuthProviderProps = {
    children: ReactNode;
  };
 

export const AuthContext = createContext<AuthContextType>({

  isLoggedIn: false,
  // setIsLoggedIn: () => {},
  logIn: () => {},

  logOut: () => {},

});

 

const AuthProvider = ({ children }: AuthProviderProps) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

 

  const logIn = () => {
    console.log("isLoggedIn is true");
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));

  };

 

  const logOut = () => {
    console.log("isLoggedIn is false");
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(false));
    sessionStorage.removeItem('userId');
    console.log('User Id is removed');
  };

 

  return (

    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>

      {children}

    </AuthContext.Provider>

  );

};

 

export default AuthProvider;