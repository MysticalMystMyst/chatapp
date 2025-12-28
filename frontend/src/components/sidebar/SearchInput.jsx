import { LuUserSearch } from "react-icons/lu";


const SearchInput = () => { 
    return (
        <form className = "flex items-center gap-2">
            <label className="input input-bordered rounded-full flex items-center gap-2">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search" />
            </label>

            <button type="submit" className = "btn btn-circle bg-sky-500 text-white hover:bg-sky-700">
                <LuUserSearch />
            </button>
        </form>
    )
}

export default SearchInput; 
