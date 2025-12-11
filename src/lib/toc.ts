/**
 * Server utility to build table of contents and split HTML at first H2
 */

interface TocItem {
  id: string;
  text: string;
}

interface TocResult {
  toc: TocItem[];
  preHtml: string;
  postHtml: string;
}

/**
 * Builds a table of contents from H2 elements and splits HTML at first H2
 * @param html - The HTML string to process
 * @returns Object containing TOC items, HTML before first H2, and HTML from first H2 onward
 */
export function buildTocAndSplit(html: string): TocResult {
  // Simple regex-based approach to find H2 elements
  const h2Regex = /<h2(?:\s+[^>]*)?>(.*?)<\/h2>/gi;
  const h2Matches: Array<{ match: string; content: string; index: number }> = [];
  
  let match;
  while ((match = h2Regex.exec(html)) !== null) {
    h2Matches.push({
      match: match[0],
      content: match[1],
      index: match.index
    });
  }

  if (h2Matches.length === 0) {
    return {
      toc: [],
      preHtml: html,
      postHtml: ''
    };
  }

  // Process H2s and build TOC
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();
  let processedHtml = html;
  let offset = 0;

  h2Matches.forEach((h2Match) => {
    // Extract text content (strip HTML tags)
    const text = h2Match.content.replace(/<[^>]*>/g, '').trim();
    
    // Check if H2 already has an id
    const idMatch = h2Match.match.match(/id\s*=\s*["']([^"']+)["']/);
    let id = idMatch ? idMatch[1] : '';
    
    if (!id) {
      // Generate id from text: trim → lowercase → collapse spaces to hyphens
      // Keep Unicode characters (å/ä/ö etc)
      id = text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-\u00C0-\u024F\u1E00-\u1EFF]/g, ''); // Keep letters including Unicode
    }
    
    // Ensure unique id
    let uniqueId = id;
    let counter = 2;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);
    
    // Add to TOC
    toc.push({ id: uniqueId, text });
    
    // Update H2 with id and scroll-mt class
    let newH2 = h2Match.match;
    
    // Add or update id attribute
    if (idMatch) {
      newH2 = newH2.replace(/id\s*=\s*["'][^"']*["']/, `id="${uniqueId}"`);
    } else {
      newH2 = newH2.replace(/<h2/, `<h2 id="${uniqueId}"`);
    }
    
    // Add scroll-mt class
    if (newH2.includes('class=')) {
      newH2 = newH2.replace(/class\s*=\s*["']([^"']*)["']/, (match, classes) => {
        return `class="${classes} scroll-mt-[var(--toc-offset,96px)]"`;
      });
    } else {
      newH2 = newH2.replace(/<h2/, '<h2 class="scroll-mt-[var(--toc-offset,96px)]"');
    }
    
    // Replace in HTML
    const actualIndex = h2Match.index + offset;
    processedHtml = 
      processedHtml.slice(0, actualIndex) + 
      newH2 + 
      processedHtml.slice(actualIndex + h2Match.match.length);
    
    offset += newH2.length - h2Match.match.length;
  });

  // Split at first H2
  const firstH2Index = processedHtml.search(/<h2(?:\s+[^>]*)?>/i);
  const preHtml = processedHtml.slice(0, firstH2Index);
  const postHtml = processedHtml.slice(firstH2Index);

  return {
    toc,
    preHtml,
    postHtml
  };
}
