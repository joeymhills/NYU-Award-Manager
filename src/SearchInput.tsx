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
        <form className='max-w-sm 
            lg:max-w-2xl 
            md:max-w-xl
            sm:max-w-lg' 
            onSubmit={onSearch}>
            <input
            value={searchQuery}
            placeholder="Search for Accolades"
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-9 p-1 mr-1 sm:mr-3 rounded-lg w-44 sm:w-60 md:w-96 lg:w-100"
            />
            <button type="submit" className="bg-white font-bentonbold text-sm text-[#541A83] py-2 w-20 lg:text-lg lg:py-0 md:w-40 h-8 rounded-xl">Search</button>
            
        </form>
        </div>
    );
};
export default SearchInput;
