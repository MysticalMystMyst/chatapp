const Login = () => { 
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className="h-full w-full p-6 bg-yellow-400/10 rounded-md backdrop-blur-sm border border-gray-100/20">
                <h1 className="text-3xl font-semibold text-center text-white">
                    Login - <span className="text-blue-500"> CanChat</span>
                </h1>

                <form>
                    <div>
                        <label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
                        <input 
                            type="text" 
                            placeholder="Enter Username" 
                            className="w-full input input-bordered h-10 focus:outline-none focus:border-white-500/30" 
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
							<span className='text-base label-text'>Password</span>
						</label>
                        <input 
                            type="text" 
                            placeholder="Enter Password" 
                            className="w-full input input-bordered h-10 focus:outline-none focus:border-white-500/30" 
                        />
                    </div>


                    <div>
                        <button className="btn btn-block btn-sm mt-4">Login</button>
                    </div>


                    <span className = "text-sm flex justify-center items-center mt-2 gap-2">
                        {"Don't"} have an account?
                        <a href="#" className = "text-sm hover:underline hover:text-blue-600  inline-block">Sign up</a>
                    </span>

                    
                    
                </form>
                
            </div>
        </div>
    )
}

export default Login; 
