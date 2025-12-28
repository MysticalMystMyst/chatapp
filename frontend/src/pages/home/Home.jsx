import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';



const Home = () => { 
    return (
        <div className="flex sm:h-112.5 md:h-137.5 bg-yellow-400/10 rounded-md backdrop-blur-sm border border-gray-100/20">
            <Sidebar />
            <MessageContainer /> 
        </div>
    )
}

export default Home; 
