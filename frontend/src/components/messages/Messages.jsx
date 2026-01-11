import { useEffect, useRef } from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import Message from './Message';

const Messages = () => {
    const {messages, loading} = useGetMessages();
    
    const lastMessageRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "auto"});
        }, 100);
    }, [messages])
    return (
        <div className = "flex-1 overflow-auto">
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}


            {/* Loading screen for the loading of the messages  */}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {/* show message up top if there are no previous messages */}
            {!loading && messages.length === 0 && (
                <p className = 'text-center'>Send a message to start chatting!</p>
            )}
        </div>
    )
}

export default Messages; 
