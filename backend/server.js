import express from 'express'; 
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';
dotenv.config(); 

import authRoutes from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js';
import userRoute from './routes/user.routes.js';


import connectToMongoDB from './database/mongoDBconnect.js';

const app = express(); 
const PORT = process.env.PORT || 8080; 

//Before running the routes, run these middleware 
app.use(express.json()); //data formatted as JSON and converts to usable javascript object (read from req.body)
app.use(cookieParser()); 

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);


//Root route
app.get('/', (req, res) => {
    res.send("Hello"); 
});






app.listen(PORT, () => {
    connectToMongoDB(); 
    console.log(`Server running on http://localhost:${PORT}/`)
})