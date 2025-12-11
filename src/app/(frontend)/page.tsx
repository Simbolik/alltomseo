import PostHero from '@/components/site/posts/PostHero';
import PostCard from '@/components/site/posts/PostCard';
import HomeHero from '@/components/site/home/HomeHero';
import { getLatestPosts } from '@/lib/payload';
import { lexicalToHtml, lexicalToPlainText } from '@/lib/lexical-to-html';
import type { Metadata } from 'next';
import { getOrganizationMainJson } from '@/lib/jsonld/organization-main';

// Function to create smart excerpt from content
function createSmartExcerpt(content: string, wordLimit: number = 65): string {
  if (!content) return '';
  
  // Remove HTML tags to get plain text
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  
  // Split into words
  const words = plainText.split(/\s+/);
  
  // If content is shorter than limit, return as is
  if (words.length <= wordLimit) {
    return content
      .replace(/\[&hellip;\]/g, '')
      .replace(/\[&#8230;\]/g, '')
      .replace(/\[…\]/g, '')
      .replace(/\[…\]/g, '')
      .replace(/&hellip;/g, '')
      .replace(/&#8230;/g, '')
      .replace(/…/g, '')
      .trim();
  }
  
  // Build text up to word limit and find last complete sentence
  let currentText = '';
  let lastCompleteSentence = '';
  
  for (let i = 0; i < Math.min(words.length, wordLimit); i++) {
    if (currentText) currentText += ' ';
    currentText += words[i];
    
    // Check if this ends a sentence
    if (/[.!?]$/.test(words[i])) {
      lastCompleteSentence = currentText;
    }
  }
  
  // Use last complete sentence if we have one, otherwise use all words up to limit
  const targetText = lastCompleteSentence || currentText;
  
  // Now reconstruct with HTML preserved
  // This is simplified - just returns plain text in a <p> tag
  return `<p>${targetText}</p>`;
}

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'AlltomSEO.se – SEO Content Platform';
  const metaDescription = 'Professional SEO-optimized content platform powered by Next.js and Payload CMS.';
  
  return {
    // 1) Base Meta Tags (Next.js will order these first)
    title: pageTitle,
    description: metaDescription,
    
    // 2) Robots & Crawling Instructions
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    
    // 3) Canonical & Language Alternates
    alternates: {
      canonical: 'https://alltomseo.se',
      languages: {
        'sv': 'https://alltomseo.se',
        'sv-SE': 'https://alltomseo.se',
      },
    },
    
    // 4) Open Graph (Social Media)
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url: 'https://alltomseo.se',
      siteName: 'AlltomSEO.se',
      locale: 'sv_SE',
      type: 'website',
      images: [
        {
          url: 'https://alltomseo.se/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AlltomSEO.se - SEO Content Platform',
        },
      ],
    },
    
    // 5) Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDescription,
      images: ['https://alltomseo.se/og-image.jpg'],
    },
    
    // 6) Other Meta Tags
    other: {
      'format-detection': 'telephone=no',
    },
  };
}

export default async function Home() {
  let posts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    featured: {
      url: string | null;
      webpUrl: string | null;
      retinaUrl: null;
      alt: string;
      heroUrl: string | null;
      heroWebpUrl: string | null;
      heroRetinaUrl: null;
      heroMobileUrl: string | null;
      heroMobileWebpUrl: string | null;
      width: number;
      height: number;
    };
    categories: Array<{ name: string; slug: string }>;
    date: string;
    modified: string;
  }> = [];
  
  try {
    const payloadPosts = await getLatestPosts(7);
    
    posts = payloadPosts.map(p => {
      // Convert Lexical content to HTML for excerpt
      const htmlContent = p.content ? lexicalToHtml(p.content) : '';
      const plainTextContent = p.content ? lexicalToPlainText(p.content) : '';
      
      // Use provided excerpt or generate from content
      const sourceText = p.excerpt || htmlContent || plainTextContent;
      
      // Create smart excerpt with 65 word limit
      const smartExcerpt = createSmartExcerpt(sourceText, 65);
      
      // Image dimensions (default for now, can be enhanced)
      let heroWidth = 900;
      let heroHeight = 506;
      
      if (p.featuredImage) {
        heroWidth = p.featuredImage.width || 900;
        heroHeight = p.featuredImage.height || 506;
      }
      
      return {
        title: p.title,
        slug: p.slug,
        excerpt: smartExcerpt,
        featured: { 
          url: p.featuredImage?.url ?? null,
          webpUrl: null, // Payload serves images via URL, format handled by Next.js Image
          retinaUrl: null,
          alt: p.featuredImage?.alt ?? '',
          heroUrl: p.featuredImage?.url ?? null,
          heroWebpUrl: null,
          heroRetinaUrl: null,
          heroMobileUrl: p.featuredImage?.url ?? null,
          heroMobileWebpUrl: null,
          width: heroWidth,
          height: heroHeight
        },
        categories: p.category ? [{ name: p.category.name, slug: p.category.slug }] : [],
        date: p.publishedDate,
        modified: p.updatedAt
      };
    });
  } catch (error) {
    console.error('Failed to load posts:', error);
  }

  const [first, ...rest] = posts;
  
  return (
    <>
      {/* Organization JSON-LD - Main page only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationMainJson()) }}
      />
      
      {/* Combined intro and content section - separate box */}
      <HomeHero />
      
      {/* Posts section - main content box */}
      <main className="w-full bg-[#f0f1f3] rounded-lg border border-gray-100 shadow-3d p-6">
        <section className="space-y-6">
          {first && <PostHero {...first} />}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map(p => (<PostCard key={p.slug} {...p} />))}
          </div>
        </section>
      </main>
    </>
  );
}
