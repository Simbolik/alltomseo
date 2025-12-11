/**
 * Decode HTML entities from WordPress
 * Works on both server and client side
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  
  // Server-side safe HTML entity decoding
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8211;/g, '\u2013') // en dash
    .replace(/&#8212;/g, '\u2014') // em dash
    .replace(/&#8230;/g, '\u2026') // ellipsis
    .replace(/&#8221;/g, '\u201D') // right double quote
    .replace(/&#8220;/g, '\u201C') // left double quote
    .replace(/&nbsp;/g, ' ');
}
