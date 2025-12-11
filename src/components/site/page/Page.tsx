'use client';

import Link from 'next/link';

interface PageProps {
  title: string;
  content: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  showBreadcrumbs?: boolean;
  pageType?: 'about' | 'contact' | 'services' | 'default';
}

export default function Page({ 
  title, 
  content, 
  featuredImage,
  showBreadcrumbs = true,
  pageType = 'default'
}: PageProps) {
  // pageType can be used for different page templates in the future
  // Currently using default template for all pages
  
  // Function to add interactive features to content
  const enhanceContent = (html: string) => {
    // Add IDs to headings for anchor links
    const enhancedHtml = html.replace(
      /<h([2-6])[^>]*>(.*?)<\/h\1>/gi,
      (match, level, text) => {
        const id = text
          .toLowerCase()
          .replace(/<[^>]*>/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return `<h${level} id="${id}" class="scroll-mt-20 group">${text} <a href="#${id}" class="opacity-0 group-hover:opacity-100 ml-2 text-gray-400 hover:text-gray-600 transition-opacity">#</a></h${level}>`;
      }
    );
    
    return enhancedHtml;
  };

  const enhancedContent = enhanceContent(content);

  return (
    <article className="rounded-xs border border-border bg-surface p-6 shadow-soft">
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-item">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            <span>Hem</span>
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{title}</span>
        </nav>
      )}
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-700">{title}</h1>
      
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8">
          <img 
            src={featuredImage.url} 
            alt={featuredImage.alt || title}
            className="w-full rounded-lg"
          />
        </div>
      )}
      
      {/* Page Content */}
      <div 
        className="prose prose-lg max-w-none page-content"
        dangerouslySetInnerHTML={{ __html: enhancedContent }} 
      />
    </article>
  );
}
