'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, Mail } from 'lucide-react';
import MobileNav from './MobileNav';
import SearchBar from './SearchBar';

const links = [
  { href: '/', label: 'Hem', icon: Home },
  { href: '/om-oss', label: 'Om oss', icon: Info },
  { href: '/kontakt', label: 'Kontakt', icon: Mail },
];

export default function PrimaryNav(){
  const pathname = usePathname();
  
  return (
    <>
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:block w-full bg-[#f8f9fa]">
        <div className="mx-auto max-w-[1200px] px-4 pt-4 pb-2">
          {/* Unified Menu Bar - full width */}
          <div className="flex items-center justify-between border border-gray-200 rounded-sm overflow-hidden bg-[#ebedf0] shadow-md">
            {/* Spacer for left side */}
            <div></div>
            {/* Navigation Links + Search */}
            <div className="flex items-center">
              {/* Navigation Links */}
              {links.map((link, index) => {
                const isActive = pathname === link.href || 
                               (link.href !== '/' && pathname.startsWith(link.href));
                
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`
                      flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium 
                      transition-colors duration-200
                      ${index < links.length - 1 ? 'border-r border-gray-200' : ''}
                      ${isActive 
                        ? 'text-gray-800 bg-white' 
                        : 'text-gray-600 hover:bg-white hover:text-gray-800'
                      }
                    `}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              {/* Search Bar */}
              <SearchBar />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
