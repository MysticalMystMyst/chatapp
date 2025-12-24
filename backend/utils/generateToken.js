//Purpose of file : 
//create token containing UserId, signed with secret password 
//place the token into cookie 
//lock cookie so JS cant read it, and can only be sent over secure connections 


import jwt from 'jsonwebtoken'; //library for creating and verifying JWT tokens 

const generateTokenAndSetCookie = (userId, res) => {
    //creating the token
    //payload = userId (data hide in the token), and secret key ensures server rejects other so hacker cant get
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d',
    }); 

    //setting the cookie (tels browser to save piece of data)
    //Name of cookie = JWT, and the token is token generated previously 
    res.cookie("jwt", token, { 
        //secruity for cookie
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in miliseconds
        httpOnly: true, //cookie not accessible via javascript
        sameSite: "strict", //prevent attacks 
        secure: process.env.NODE_ENV !== "development",
    }); 
};

export default generateTokenAndSetCookie; 

//Token acts as a secure digital ID providing who you are to server 
//Ensures that server recognizes you without asking for password on every visit 