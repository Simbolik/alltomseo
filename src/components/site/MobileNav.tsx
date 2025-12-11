'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { href: '/', label: 'Hem' },
  { href: '/om-oss', label: 'Om oss' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Close the menu and navigate to search page
      setIsOpen(false);
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input
    }
  };

  return (
    <>
      {/* Mobile Navigation Header - Sticky Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 w-full bg-[#424460] border-b border-[#35364D]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="rounded-md" 
            />
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex flex-col items-center justify-center w-8 h-8 focus:outline-none"
            aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
          >
            <div className="relative w-6 h-5">
              {/* Top line */}
              <span
                className={`absolute top-0 left-0 w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'rotate-45 translate-y-2'
                    : 'rotate-0 translate-y-0'
                }`}
              />
              {/* Middle line */}
              <span
                className={`absolute top-2 left-0 w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* Bottom line */}
              <span
                className={`absolute bottom-0 left-0 w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isOpen
                    ? '-rotate-45 -translate-y-2'
                    : 'rotate-0 translate-y-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <div
        className={`lg:hidden fixed top-[64px] left-0 right-0 z-40 bg-[#424460] border-b border-[#35364D] transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-4">
          {/* Search Bar */}
          <div className="py-4 border-b border-[#3E4060]">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Sök..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-white text-gray-900 placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6C6C8A] focus:border-transparent text-base font-['Poppins',sans-serif]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#565676] text-white font-bold rounded-md hover:bg-[#6C6C8A] hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C6C8A] focus:ring-offset-2 focus:ring-offset-[#424460] text-base font-['Poppins',sans-serif]"
              >
                Sök
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <nav className="py-4">
            <ul className="space-y-0">
              {links.map((link, index) => {
                const isActive = pathname === link.href || 
                               (link.href !== '/' && pathname.startsWith(link.href));
                
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-4 text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-white bg-[#35364D] border-l-4 border-white'
                          : 'text-[#cbd0dc] hover:text-white hover:bg-[#35364D]'
                      }`}
                    >
                      <span className={isActive ? 'underline' : ''}>{link.label}</span>
                    </Link>
                    
                    {/* Divider */}
                    {index < links.length - 1 && (
                      <div className="h-px bg-[#3E4060] mx-4" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          style={{ top: '64px' }} // Start below the header
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
