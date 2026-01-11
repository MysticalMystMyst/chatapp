import {Link} from 'react-router-dom';
import { useState } from 'react';

import createAcc from "../../hooks/createAcc";


const SignUp = () => { 

    //React useState => [current inputs, function that changes the inputs]
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "", 
        confirmPassword: "", 
    });

    const {loading, signup} = createAcc(); 
    const handleSubmit = async (e) => {
        e.preventDefault(); //doesnt refreash tab when submitting
        //When submit it sign up the user (it is in hooks)
        await signup(inputs); 

    };

    return (
        <div className = "flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="h-full w-full p-6 bg-yellow-400/10 rounded-md backdrop-blur-sm border border-gray-100/20">
                <h1 className="text-3xl font-semibold text-center text-white">
                    Create account - <span className="text-blue-500"> CanChat</span>
                </h1>


                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
							<span className='text-base label-text'>Full name</span>
						</label>
                        <input 
                            type="text" 
                            placeholder="Enter full name" 
                            className="w-full input input-bordered h-10 focus:outline-none focus:border-white-500/30" 
                            value={inputs.fullName}
                            onChange = {(e) => setInputs({...inputs, fullName: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            className="w-full input input-bordered h-10 focus:outline-none focus:border-white-500/30" 
                            value = {inputs.username}
                            onChange = {(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
							<span className='text-base label-text'>Password</span>
						</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            className="w-full input input-bordered h-10 focus:outline-none focus:border-white-500/30" 
                            value = {inputs.password}
                            onChange = {(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
                        <input 
                            type="password" 
                            placeholder="Re-enter Password" 
                            className="w-full input input-bordered h-10 focus:outline-none focus:border-white-500/30" 
                            value = {inputs.confirmPassword}
                            onChange = {(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                        />
                    </div>

                    <div>
                        <button className="btn btn-block btn-sm mt-4" disabled = {loading}>
                            {loading ? <span className = "loading loading-spinner"></span> : "Sign Up"}
                        </button>
                    </div>
                    <span className = "text-sm flex justify-center items-center mt-2 gap-2">
                        Have an account? 
                        <Link to="/login" className = "text-sm hover:underline hover:text-blue-600  inline-block">Login now</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default SignUp; 
