
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

export const SocketContext = createContext(); 

export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null); 
    const [onlineUsers, setOnlineUsers] = useState([]); 
    const {authUser} = useAuthContext(); 

    useEffect(() => {
        if (authUser){
            //when logged in we want to take the user id
            //Replace in parenthesis with port instead if running locally
            const socket = io('https://canchat-w1sj.onrender.com', {
                query: {
                    userId: authUser._id, 
                }
            });
            
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => { 
                console.log("Users received from server:", users);
                setOnlineUsers(users);
            })

            return () => socket.close(); 
        }
        else { 
            if (socket){
                socket.close(); 
                setSocket(null)
            }
        }
    },[authUser])
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
