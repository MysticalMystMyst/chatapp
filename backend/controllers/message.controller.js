import Message from '../models/messageModel.js'; 
import Conversation from '../models/conversationModel.js'; 
import { getRecieverSocketId, io } from '../socket/socket.js';


export const sendMsg = async (req, res) => {
    // console.log("Message sent to ", req.params.id); 
    try {
        //Getting the user message as input
        const {message} = req.body; 
        //This is the shorthand for const recieverId = req.params.id; 
        const {id:recieverId} = req.params; 
        //wont work because in request we havent said it (add it to request using middleware)
        const senderId = req.user._id; 

        //Finding conversation between 2 users 
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, recieverId]},
        }); 

        //If there is no previous conversation between 2 users, create it 
        if (!conversation){
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
            });
        }

        //Creating a new message object, and adding that to the conversations
        const newMessage = new Message({
            senderId: senderId, 
            recieverId: recieverId,
            message: message,
        });

        if (newMessage){
            conversation.messages.push(newMessage._id);
        }

        //Runs parallel at the same time 
        await Promise.all([conversation.save(), newMessage.save()]);


        //socket io to make it run in real time 
        const recieverSocketId = getRecieverSocketId(recieverId); 
        if (recieverSocketId) { 
            io.to(recieverSocketId).emit("newMessage", newMessage) //send events to specific clients 
        }

        res.status(201).json(newMessage); 

    } catch (error) {
        console.log("Error in sendMsg controller ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};


export const getMsg = async (req, res) => {
    try {
        const {id:otherUserId} = req.params; 
        const senderId = req.user._id; 

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, otherUserId]}
        }).populate("messages") //return array of objects, and put each message into that object 
        //Note that these are not references but actual messages  

        //If there exists no messages, return empty array  
        if (!conversation){
            return res.status(200).json([]);    
        }

        res.status(200).json(conversation.messages); 
    } catch (error) {
        console.log("Error in getMsg controller ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}