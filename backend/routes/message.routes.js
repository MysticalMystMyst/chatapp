import express from 'express'; 

import { sendMsg, getMsg } from '../controllers/message.controller.js'; 
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router(); 

//This sends a message to the :id person
//protectRoute (middleware) -> check if the user is logged in
router.post("/send/:id", protectRoute, sendMsg);

router.get("/:id", protectRoute, getMsg);


export default router; 
