import bcrypt from 'bcryptjs'; 


import User from '../models/userModels.js'; 
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const signup = async (req, res) => { 
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body; 

        if (password !== confirmPassword){
            return res.status(400).json({error: "Password do not match"});
        }

        const user = await User.findOne({username}); //Check if user exists in database

        if (user){
            return res.status(400).json({error: "User already exists"});
        }

        //Hasing the password 
        const salt = await bcrypt.genSalt(10); //higher number more secure but longer to generate 
        const hashedPassword = await bcrypt.hash(password, salt); 



        //API PROFILE (dicebear) : https://www.dicebear.com/styles/initials/
        const profilePic = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;

        //creating a user object (this creates a unique objectId)
        const newUser = new User({
            fullName: fullName,
            username: username, 
            password: hashedPassword, //save the hashed password to the database 
            gender: gender, 
            profilePic: profilePic
        });

        if (newUser){
            //generate JWT token 
            generateTokenAndSetCookie(newUser._id, res); 
            await newUser.save(); //saving the user to the database 

            res.status(201).json({
                _id: newUser._id, 
                fullName: newUser.fullName, 
                username: newUser.username, 
                profilePic: newUser.profilePic
            });
        }
        else{ 
            return res.status(400).json({error: "invalid user data"})
        }
        

    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const login = async (req, res) => { 
    try {
        const {username, password} = req.body; 

        const user = await User.findOne({username}); 

        const passwordCheck = await bcrypt.compare(password, user?.password || ''); //this checks if userpassword exists, and if not it compares to empty string

        //User does not exist 
        if (!user || !passwordCheck){ 
            return res.status(201).json({error: "Invalid User or password"}); 
        }

        //ensures that user is logged in (cookie stays for 15 days) 
        //This is like a token wristband to enter a place, and person wont have to keep lining up to reenter
        generateTokenAndSetCookie(user._id, res); 

        res.status(200).json({
            _id: user._id, 
            fullName: user.fullName, 
            username: user.username, 
            profilePic: user.profilePic,
        });
        
    } catch (error) {
        console.log("Error in login controller ", error.message); 
        res.status(500).json({error: "Internal server error"})
    }
}

export const logout = (req, res) => { 
    try {
        //takes JWT associated with userId, and then replaces token w/ useless data
        //like cutting the wristband
        res.cookie("jwt", "", {maxAge: 0}); 
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Error in logout controller ", error.message); 
        res.status(500).json({error: "Internal Server Error"});
    }
}