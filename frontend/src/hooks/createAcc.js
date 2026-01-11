import { useState } from "react"; 

import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";


const createAcc = () => {
    const [loading, setLoading] = useState(false); 
    const { setAuthUser } = useAuthContext(); 

    const signup = async({fullName, username, password, confirmPassword}) => { 
        const hasError = handleInputErrors({fullName, username, password, confirmPassword}); 
        if (hasError) {
            return; 
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword})
            });

            const data = await res.json(); 
            if (data.error){
                throw new Error(data.error);
            }
            
            //local storage 
            localStorage.setItem("chat-user", JSON.stringify(data))
            
            //When sign up update state -> in app.jsx authUser has value so it rerenders the routes 
            setAuthUser(data);

        }
        catch (error){
            toast.error(error.message);
        }
        finally{
            setLoading(false); 
        }
    };

    return {loading, signup};
};

export default createAcc; 

const handleInputErrors = ({fullName, username, password, confirmPassword}) => {
    if (!fullName || !username || !password || !confirmPassword){
        toast.error("Please fill in all fields"); 
        return true; 
    }

    if (password !== confirmPassword){ 
        toast.error("Passwords do not match"); 
        return true; 
    }

    if (password.length < 6){
        toast.error("Password must be at least 6 characters");
        return true; 
    }

    return false; 
}