import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({ 
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
        }
    ], 

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Message",
            default: [], //Starting convo = empty array -> push messageId when created here
        }
    ]

    //Record the time of the message 
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema); 

export default Conversation; 
