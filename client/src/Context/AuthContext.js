import React, {createContext, useState, useEffect} from 'react';
import AuthService from '../Services/AuthService';

//  Provider and a consumer
export const AuthContext = createContext();

const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //  if app is loaded
    const [isLoaded, setIsLoaded] = useState(false);

    //  use this as the componentDidMount, only run once
    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            //  make user and isAuthenticated to be global states
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {isLoaded ? <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                            {children}
                        </AuthContext.Provider> 
                        : <h1>Loading...</h1>}
        </div>
    )
}

export default AuthProvider;