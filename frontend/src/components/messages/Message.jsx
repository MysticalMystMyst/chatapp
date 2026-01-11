import { extractTime } from "../../../utils/extractTime";
import useConversation from "../../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";


const Message = ({message}) => { 
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation(); 
    const fromMe = message.senderId === authUser._id
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic: selectedConversation.profilePic; 
    const bubbleBgColor = fromMe ? 'bg-blue-500' : ""; 

    //Convert the MongoDB time 
    const formattedTime = extractTime(message.createdAt);


    return (
        <div className = {`chat ${chatClassName} px-4`}>
            {/* OPTIONAL TO SHOW YOUR PROFILE PIC */}
                <div className = "chat-image avatar">
                    <div className = 'w-10 rounded-full'>
                        <img src={profilePic} alt="User profile pic" />
                    </div>
            
                </div>
            <div className = {`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
            <div className = {`chat-footer opacity-50 text-xs flex gap-1 items-center `}>
                sent at {formattedTime}
            </div>
        </div>
        
        
            
    )
}

export default Message; 