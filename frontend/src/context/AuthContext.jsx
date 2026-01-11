//Global state manager for authentication system 
//This context allows to store data in cloud that any componenet can access directly 
import { createContext, useContext, useState } from 'react';

//Creating context object (empty)
export const AuthContext = createContext(); 

//Instead of importing useContext, and AuthContext in every file -> import this hook 
export const useAuthContext = () => {
    return useContext(AuthContext);
}


export const AuthContextProvider = ({ children }) => {
    //runs everytime when app loads -> check local storage to see if user data previously saved 
    //Converts string back into JSON and if nothing found set state to null
    //This line keeps the user logged in 
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
    
    //Children = represent all components inside provider (app)
    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children} 
    </AuthContext.Provider>
}

//File is a Memory center that keeps track of which user is logged in 