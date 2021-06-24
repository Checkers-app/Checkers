import {createContext} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    return (
        <UserContext.Provider value={{test: "derp"}}>
            {props.children}
        </UserContext.Provider>
    )
}