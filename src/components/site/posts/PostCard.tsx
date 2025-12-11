import Link from 'next/link';
import { getArticleDateDisplay } from '@/lib/swedish-date';

type Card = { 
  title:string; 
  slug:string; 
  excerpt?:string|null; 
  featured?:{ url?:string|null; webpUrl?:string|null; alt?:string|null };
  categories?: { name: string; slug: string }[];
  date?: string;
  modified?: string;
};
export default function PostCard({ title, slug, excerpt, featured, categories, date, modified }: Card){
  return (
    <article className="rounded-xs border border-border bg-surface p-3 shadow-3d flex flex-col h-full">
      {featured?.url && (
        <Link href={`/${slug}`} className="block overflow-hidden rounded-xs">
          <div className="relative w-full" style={{ aspectRatio: '400/300' }}>
            <picture>
              {featured.webpUrl && (
                <source type="image/webp" srcSet={featured.webpUrl} />
              )}
              <img 
                src={featured.url} 
                alt={featured.alt ?? ''} 
                width={400} 
                height={300} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>
          </div>
        </Link>
      )}
      {((categories && categories.length > 0) || date) && (
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          {categories && categories.length > 0 && (() => {
            const category = categories.filter(cat => cat.slug !== 'uncategorized')[0];
            return category ? (
              <>
                <Link 
                  href={`/${category.slug}`} 
                  className="font-medium text-gray-700 hover:text-gray-400 transition-colors"
                >
                  {category.name}
                </Link>
                {date && <span className="text-gray-400">•</span>}
              </>
            ) : null;
          })()}
          {date && (
            <span className="text-gray-500">
              {getArticleDateDisplay(date, modified)}
            </span>
          )}
        </div>
      )}
      <h2 className="mt-4 text-lg font-semibold leading-snug">
        <Link href={`/${slug}`} className="text-gray-700 hover:text-gray-400 transition-colors">{title}</Link>
      </h2>
      {excerpt && (
        <div className="flex flex-col flex-grow">
          <div className="prose prose-sm mt-1 max-w-none flex-grow" dangerouslySetInnerHTML={{ __html: excerpt }} />
          <div className="mt-2.5">
            <Link 
              href={`/${slug}`}
              className="inline-block px-5 py-2.5 bg-slate-600 text-white text-base font-medium rounded-xs hover:bg-slate-700 transition-colors duration-200"
            >
              Läs hela artikeln →
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
