const Message = () => { 
    return (
        <div className = "chat chat-end px-4">
            {/* OPTIONAL TO SHOW YOUR PROFILE PIC */}
                {/* <div className = "chat-image avatar">
                    <div className = 'w-10 rounded-full'>
                        <img src="null" alt="User profile pic" />
                    </div>
            
                </div> */}
            <div className = {`chat-bubble text-white bg-blue-500`}>Hi!</div>
            <div className = {`chat-footer opacity-50 text-xs flex gap-1 items-center`}>12:40</div>
        </div>
        
        
            
    )
}

export default Message; 