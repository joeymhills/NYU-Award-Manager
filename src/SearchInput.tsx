"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react'

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
        <form className='max-w-sm' onSubmit={onSearch}>
            <input
            value={searchQuery}
            placeholder="Search for Accolades"
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-8 p-1 mr-1 rounded-lg"
            />
            <button type="submit" className="bg-white font-bentonbold text-sm text-[#541A83] py-2 w-20 h-8 rounded-3xl">Search</button>
            
        </form>
        </div>
    );
};
export default SearchInput;