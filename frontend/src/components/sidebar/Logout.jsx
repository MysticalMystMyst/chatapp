import { CiLogout } from "react-icons/ci";

import useLogout from "../../hooks/useLogout"; 

const Logout = () => { 
    const { loading, logout } = useLogout();

    return (
        <div className = "mt-auto">
            <CiLogout className = "h-6 w-6 text-white cursor-pointer hover:bg-sky-700" onClick={logout} />
            
        </div>
    )
}

export default Logout; 