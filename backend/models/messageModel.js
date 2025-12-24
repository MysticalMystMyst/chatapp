import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({ 
    senderId:{
        type: mongoose.Schema.Types.ObjectId, //refernce saying that this will be an Id inside User model (ref: "user" defines this)
        ref: "User", 
        required: true, 
    }, 

    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true, 
    },

    message: {
        type: String, 
        required: true,
    }
    //Record the time of the message 
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema); 

export default Message; 
