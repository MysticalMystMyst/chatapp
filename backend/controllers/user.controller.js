import User from "../models/userModels.js";


export const getUsers = async (req, res) => {
    try {
        const currUser = req.user._id;
        
        //get all user in database but not equal to current logged in user
        const filterdUser = await User.find({ _id: {$ne: currUser}}).select("-password");

        res.status(200).json(filterdUser);

    } catch (error) {
        console.log("Error in getUsers controller ", error.message)
        res.status(500).json({error: "Internal server error"});
    }
}