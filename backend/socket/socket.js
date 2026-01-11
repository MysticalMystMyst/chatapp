import { Server } from "socket.io";
import http from 'http'; 
import express from 'express'; 

const app = express(); 

//This is having the express server, and on top of it we have the socket server 
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin:[
            'http://localhost:5173', 
            "https://canchat-w1sj.onrender.com"
        ], 
        methods: ['GET', 'POST']
    }
}); 

export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId]; 
}


const userSocketMap = {}; //Mapping -> {useId: socketId} 
//listen for connections 
io.on('connection', (socket) => { 
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId; 
    if (userId != 'undefined'){
        userSocketMap[userId] = socket.id;
    }

    //this is used to send events to all connected clients 
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    //listen to events (used on client and server side)
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)

        //Updating the event and send it back to the clients 
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})



export {app, io, server}; 
