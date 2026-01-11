import useConversation from '../../../zustand/useConversation';
import Messages from './Messages';
import SendMsg from './SendMsg';


import { useEffect } from 'react';
import { IoIosChatbubbles } from "react-icons/io";


const MessageContainer = () => { 
    const {selectedConversation, setSelectedConversation} = useConversation();

    //unmount when component not in view 
    useEffect(() => {
        return () => {
            //clean up function
            setSelectedConversation(null);
        }
    }, [setSelectedConversation]);
    
    return (
        <div className = "md:min-w-112.5 w-full flex flex-col">
            {!selectedConversation ? <NoChatSelected /> : (
                <>
                {/* Header */}
                <div className='bg-slate-600 px-4 py-2 mb-2'>
                    <span className='label-text'>To:</span>{" "}
                    <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
				</div>

                <Messages />
                <SendMsg />
            </>
            )}
        </div>
    )
}

const NoChatSelected = () => {
    return (
        <div className = "flex items-center justify-center w-full h-full">
            <div className = "px-4 text-center sm:text-lg md:text-xl text-gray-200 font-bold flex flex-col items-center gap-2">
                <p>Welcome Alex Li</p>
                <p>Select a chat to start messaging</p>
                <IoIosChatbubbles className = "text-3xl md:text-6x1 text-center"/>

            </div>
        </div>
    )
}
export default MessageContainer;