/**
 * Process WordPress content to handle various formatting needs
 */

/**
 * Process WordPress caption shortcodes and convert them to proper figure/figcaption HTML
 * Handles both [caption] shortcodes and wp-caption divs
 */
export function processWordPressContent(content: string): string {
  if (!content) return '';

  let processedContent = content;

  // Process [caption] shortcodes
  // WordPress format: [caption id="attachment_123" align="aligncenter" width="600"]<img .../>Caption text[/caption]
  processedContent = processedContent.replace(
    /\[caption[^\]]*\](.*?)\[\/caption\]/gs,
    (match, innerContent) => {
      // Extract the image and caption text
      const imgMatch = innerContent.match(/<img[^>]*>/);
      const img = imgMatch ? imgMatch[0] : '';
      
      // Remove the image from inner content to get the caption text
      const captionText = innerContent.replace(/<img[^>]*>/, '').trim();
      
      if (img && captionText) {
        // Add loading="lazy" to images if not already present and not explicitly eager
        const processedImg = img.includes('loading=') ? img : img.replace('<img', '<img loading="lazy"');
        
        return `<figure class="wp-caption-figure">
          ${processedImg}
          <figcaption class="wp-caption-text">${captionText}</figcaption>
        </figure>`;
      }
      
      return match;
    }
  );

  // Process wp-caption divs (older WordPress format)
  processedContent = processedContent.replace(
    /<div[^>]*class="[^"]*wp-caption[^"]*"[^>]*>(.*?)<\/div>/gs,
    (match, innerContent) => {
      // Check if there's a nested structure with wp-caption-text
      const hasCaption = innerContent.includes('wp-caption-text');
      
      if (hasCaption) {
        // Extract image
        const imgMatch = innerContent.match(/<img[^>]*>/);
        const img = imgMatch ? imgMatch[0] : '';
        
        // Extract caption text
        const captionMatch = innerContent.match(/<p[^>]*class="[^"]*wp-caption-text[^"]*"[^>]*>(.*?)<\/p>/s);
        const captionText = captionMatch ? captionMatch[1] : '';
        
        if (img && captionText) {
          // Add loading="lazy" to images if not already present
          const processedImg = img.includes('loading=') ? img : img.replace('<img', '<img loading="lazy"');
          
          return `<figure class="wp-caption-figure">
            ${processedImg}
            <figcaption class="wp-caption-text">${captionText}</figcaption>
          </figure>`;
        }
      }
      
      return match;
    }
  );

  // Process standalone images that might have a title attribute as caption
  processedContent = processedContent.replace(
    /<img([^>]*?)(?:title="([^"]+)")?([^>]*?)>/g,
    (match, before, title, after) => {
      // Only wrap in figure if there's a title and the image isn't already in a figure
      if (title && !match.includes('figure')) {
        const imgTag = `<img${before}${after}>`;
        // Add loading="lazy" if not present
        const processedImg = imgTag.includes('loading=') ? imgTag : imgTag.replace('<img', '<img loading="lazy"');
        
        return `<figure class="wp-caption-figure">
          ${processedImg}
          <figcaption class="wp-caption-text">${title}</figcaption>
        </figure>`;
      }
      
      // Just add lazy loading to regular images
      if (!match.includes('loading=')) {
        return match.replace('<img', '<img loading="lazy"');
      }
      
      return match;
    }
  );

  // Ensure all images have proper lazy loading (except those marked as eager or priority)
  processedContent = processedContent.replace(
    /<img(?![^>]*loading=)([^>]*?)>/g,
    '<img loading="lazy"$1>'
  );

  return processedContent;
}

/**
 * Extract plain text from HTML content for excerpts or meta descriptions
 */
export function extractPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Replace HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}
