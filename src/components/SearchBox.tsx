"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface User {
  id: string;
  username: string;
}

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  const fetchUsers = async (searchQuery: string) => {
    setLoading(true);
    const response = await fetch(`/api/search?query=${searchQuery}`);
    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    if (query) {
      fetchUsers(query);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className='max-h-10 z-50' ref={searchBoxRef}>
      <input
        type='text'
        placeholder='جستجو...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='py-2 px-1 border border-slate-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
      />

      <ul className='mt-2'>
        {results.map((user) => (
          <Link
            key={user.id}
            onClick={() => handleUserClick()}
            href={`/profile/${user.username}`}
          >
            <li className='bg-slate-200 py-2 px-1 border border-slate-300 rounded-md hover:bg-slate-100 cursor-pointer transition duration-200 ease-in-out font-medium text-sm text-blue-500 mb-[2px]'>
              {user.username}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
