"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { searchCallback } from './components/atoms';

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        
        const encodedSearchQuery = encodeURI(searchQuery)
        router.push(`/search?q=${encodedSearchQuery}`)
    };
    
    return(
        
        <div className='w-full flex flex-col justify-center items-center'>
        <form className='
            flex flex-row justify-center items-center         
            max-w-sm 
            lg:max-w-2xl 
            md:max-w-xl
            sm:max-w-lg' 
            onSubmit={onSearch}>
            <input
            value={searchQuery}
            placeholder="Search for awards"
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-9 p-1 mr-1 sm:mr-3 rounded-lg w-56 sm:w-72 md:w-96 lg:w-150
            drop-shadow-md ring-1 ring-inset ring-gray-300"
            />
            <button type="submit" className="bg-white font-bentonbold text-gray-900 drop-shadow-md ring-1 ring-inset
          ring-gray-300 text-sm py-2 w-20 lg:text-lg lg:py-0 md:w-40 h-9 rounded-lg">Search</button>
            
        </form>
        </div>
    );
};
export default SearchInput;
