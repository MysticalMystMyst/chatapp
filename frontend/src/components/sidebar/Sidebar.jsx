import SearchInput from './SearchInput';
import Conversations from './Conversations';
import Logout from './Logout'; 

const Sidebar = () => { 
    return (
        <div className = "border-r border-slate-500 flex flex-col">
            <div className = "p-4 pb-0">
                <SearchInput/>
            </div>
            
            <div className = "divider px-2 my-2 py-0 h-1"></div>
            
            <div className="flex-1 overflow-auto p-4 pb-0">
                <Conversations/>
            </div>
            
            <div className="p-4 mt-auto">
                <Logout/>
            </div>
            
        </div>
    )
}

export default Sidebar; 
