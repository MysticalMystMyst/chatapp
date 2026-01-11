import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";


const useListenMessages = () => { 
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => { 
            setMessages([...messages, newMessage])
        })

        //need this because there alot of events being listened from socket, and sending new message -> multiplies the listener
        return () => socket.off("newMessage")
    },[socket, setMessages, messages]);
}

export default useListenMessages; 