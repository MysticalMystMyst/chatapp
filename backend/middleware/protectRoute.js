import jwt from 'jsonwebtoken'; 
import User from '../models/userModels.js'; 


const protectRoute = async (req, res, next) => { 
    try {
        const token = req.cookies.jwt; 
        if (!token){
            return res.status(401).json({error: "Unauthorized access"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        if (!decoded){
            return res.status(401).json({error: "Unauthorized access"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user){
            return res.status(404).json({error: "User not found"}); 
        }

        req.user = user;

        //pass all the checks, and verify that it is the user then we go to the next function
        next(); 


    } catch (error) {
        console.log("Error in protectRoute middleware ", error.message); 
        res.status(500).json({ error: "Internal server error"});
    }
};


export default protectRoute; 