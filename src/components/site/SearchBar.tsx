'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center border-l border-gray-200">
      <input
        type="text"
        placeholder="Sök..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-3 py-1.5 text-[13px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none w-32 font-['Poppins',sans-serif]"
      />
      <button
        type="submit"
        className="px-3 py-1.5 bg-transparent focus:outline-none"
        aria-label="Sök"
      >
        <Search className="w-4 h-4 text-gray-500" />
      </button>
    </form>
  );
}
