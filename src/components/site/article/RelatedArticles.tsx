'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getArticleDateDisplay } from '@/lib/swedish-date';

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  categories?: { name: string; slug: string }[];
  date?: string;
  modified?: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  currentArticleSlug: string;
}

export default function RelatedArticles({ articles, currentArticleSlug }: RelatedArticlesProps) {
  // Filter out the current article to avoid duplicate content
  const relatedArticles = articles.filter(article => article.slug !== currentArticleSlug);
  
  // Limit to 3 related articles
  const displayArticles = relatedArticles.slice(0, 3);
  
  if (displayArticles.length === 0) {
    return null;
  }
  
  return (
    <section className="related-articles-section">
      <h3 className="related-articles-title">Relaterade artiklar</h3>
      <div className="related-articles-grid">
        {displayArticles.map((article) => {
          const category = article.categories?.filter(cat => cat.slug !== 'uncategorized')[0];
          
          return (
            <article key={article.id} className="related-article-card">
              {/* Featured Image */}
              {article.featuredImage?.url && (
                <Link href={`/${article.slug}`} className="related-article-image-link">
                  <div className="related-article-image-wrapper">
                    <Image 
                      src={article.featuredImage.url} 
                      alt={article.featuredImage.alt || article.title} 
                      width={400} 
                      height={300} 
                      className="related-article-image"
                      loading="lazy"
                    />
                  </div>
                </Link>
              )}
              
              <div className="related-article-content">
                {/* Category */}
                {category && (
                  <Link 
                    href={`/${category.slug}`} 
                    className="related-article-category"
                  >
                    {category.name}
                  </Link>
                )}
                
                {/* Date */}
                {article.date && (
                  <div className="related-article-date">
                    {getArticleDateDisplay(article.date, article.modified)}
                  </div>
                )}
                
                {/* Title */}
                <h4 className="related-article-title">
                  <Link href={`/${article.slug}`} className="related-article-title-link">
                    {article.title}
                  </Link>
                </h4>
                
                {/* Excerpt */}
                {article.excerpt && (
                  <div 
                    className="related-article-excerpt" 
                    dangerouslySetInnerHTML={{ __html: article.excerpt }} 
                  />
                )}
                
                {/* Button */}
                <Link 
                  href={`/${article.slug}`}
                  className="related-article-button"
                  aria-label={`Läs hela artikeln om ${article.title}`}
                >
                  Läs hela artikeln →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
