/**
 * Smartly truncates excerpt to a maximum word count, cutting at sentence boundaries
 * @param html - HTML string from WordPress excerpt
 * @param maxWords - Maximum number of words (default: 55)
 * @returns Truncated excerpt ending at a complete sentence
 */
export function smartExcerpt(html: string | null | undefined, maxWords: number = 55): string {
  if (!html) return '';
  
  // Remove HTML tags to get plain text for word counting
  const plainText = html.replace(/<[^>]*>/g, '').trim();
  
  // Split into words
  const words = plainText.split(/\s+/);
  
  // If already under limit, return as is
  if (words.length <= maxWords) {
    return html;
  }
  
  // Build text word by word until we hit the limit
  let currentText = '';
  let wordCount = 0;
  let lastCompleteSentence = '';
  
  // Work with plain text first to find the cut point
  for (let i = 0; i < words.length && wordCount < maxWords; i++) {
    if (currentText) currentText += ' ';
    currentText += words[i];
    wordCount++;
    
    // Check if this word ends a sentence
    if (/[.!?]$/.test(words[i])) {
      lastCompleteSentence = currentText;
    }
  }
  
  // If we have a complete sentence within the limit, use it
  const targetText = lastCompleteSentence || currentText;
  
  // Now find where to cut in the HTML
  // This is a simplified approach that counts visible characters
  const targetLength = targetText.length;
  let charCount = 0;
  let cutPosition = -1;
  let inTag = false;
  let inEntity = false;
  
  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    
    if (char === '<') {
      inTag = true;
    } else if (char === '>') {
      inTag = false;
    } else if (char === '&') {
      inEntity = true;
    } else if (char === ';' && inEntity) {
      inEntity = false;
      charCount++; // Count the entity as one character
    } else if (!inTag && !inEntity) {
      charCount++;
      if (charCount >= targetLength) {
        // Look ahead to include the sentence-ending punctuation if it's there
        if (i + 1 < html.length && /[.!?]/.test(html[i + 1])) {
          cutPosition = i + 2;
        } else {
          cutPosition = i + 1;
        }
        break;
      }
    }
  }
  
  if (cutPosition === -1) {
    cutPosition = html.length;
  }
  
  let result = html.substring(0, cutPosition).trim();
  
  // Ensure any open <p> tags are closed
  const openP = (result.match(/<p[^>]*>/gi) || []).length;
  const closeP = (result.match(/<\/p>/gi) || []).length;
  
  if (openP > closeP) {
    result += '</p>';
  }
  
  return result;
}

/**
 * Removes WordPress ellipsis indicators from excerpt
 */
export function removeEllipsis(text: string): string {
  return text
    .replace(/\[&hellip;\]/g, '')
    .replace(/\[&#8230;\]/g, '')
    .replace(/\[\u2026\]/g, '')
    .replace(/\[…\]/g, '')
    .replace(/\[\.\.\.\]/g, '')
    .replace(/&hellip;/g, '')
    .replace(/&#8230;/g, '')
    .replace(/\u2026/g, '')
    .replace(/…/g, '')
    .trim();
}

/**
 * Process WordPress excerpt: remove ellipsis and apply smart truncation
 */
export function processExcerpt(excerpt: string | null | undefined, maxWords: number = 55): string {
  if (!excerpt) return '';
  
  // First remove WordPress ellipsis and any trailing incomplete sentences
  let cleanExcerpt = removeEllipsis(excerpt);
  
  // Remove any trailing incomplete sentence (text after last period that doesn't end with punctuation)
  cleanExcerpt = cleanExcerpt.replace(/\s+[^.!?]*$/, '');
  
  // Then apply smart truncation
  const result = smartExcerpt(cleanExcerpt, maxWords);
  
  // Debug logging
  if (typeof window === 'undefined') { // Only log on server side
    const plainText = cleanExcerpt.replace(/<[^>]*>/g, '');
    console.log('Excerpt processing:', {
      originalLength: plainText.split(/\s+/).length,
      maxWords,
      resultLength: result.replace(/<[^>]*>/g, '').split(/\s+/).length
    });
  }
  
  return result;
}
