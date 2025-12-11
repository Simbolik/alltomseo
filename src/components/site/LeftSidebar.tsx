import Link from 'next/link';
import { Home, Folder } from 'lucide-react';
import { getCategories } from '@/lib/payload';

export default async function LeftSidebar(){
  try {
    const categories = await getCategories();
    
    // Sort alphabetically
    const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div className="sticky top-4 rounded-lg border border-gray-100 bg-[#f0f1f3] p-4 shadow-3d">
        <ul className="divide-y divide-gray-50">
          {/* Home link */}
          <li className="py-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 text-base text-gray-700 hover:text-[#c07c3e] transition-colors duration-200"
            >
              <Home className="w-5 h-5 text-gray-500" />
              <span>Hem</span>
            </Link>
          </li>
          {/* Category links */}
          {sortedCategories.map(c=> (
            <li key={c.slug} className="py-2">
              <Link 
                href={`/${c.slug}`} 
                className="flex items-center gap-3 text-base text-gray-700 hover:text-[#c07c3e] transition-colors duration-200"
              >
                <Folder className="w-5 h-5 text-gray-500" />
                <span>{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Failed to load categories:', error);
    return (
      <div className="sticky top-4 rounded-lg border border-gray-100 bg-[#f0f1f3] p-4 shadow-3d">
        <div className="text-sm text-gray-500">Categories unavailable</div>
      </div>
    );
  }
}
