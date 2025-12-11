// Simple Lexical to HTML converter
// This is a basic implementation. You may need to expand it based on your content needs.

export function lexicalToHtml(lexicalContent: any): string {
  if (!lexicalContent || !lexicalContent.root) {
    return ''
  }

  return processNode(lexicalContent.root)
}

function processNode(node: any): string {
  if (!node) return ''

  // Handle root node
  if (node.type === 'root' && node.children) {
    return node.children.map(processNode).join('')
  }

  // Handle paragraph
  if (node.type === 'paragraph') {
    const content = node.children ? node.children.map(processNode).join('') : ''
    return `<p>${content}</p>`
  }

  // Handle headings
  if (node.type === 'heading') {
    const tag = node.tag || 'h2'
    const content = node.children ? node.children.map(processNode).join('') : ''
    return `<${tag}>${content}</${tag}>`
  }

  // Handle list
  if (node.type === 'list') {
    const tag = node.listType === 'number' ? 'ol' : 'ul'
    const content = node.children ? node.children.map(processNode).join('') : ''
    return `<${tag}>${content}</${tag}>`
  }

  // Handle list item
  if (node.type === 'listitem') {
    const content = node.children ? node.children.map(processNode).join('') : ''
    return `<li>${content}</li>`
  }

  // Handle quote
  if (node.type === 'quote') {
    const content = node.children ? node.children.map(processNode).join('') : ''
    return `<blockquote>${content}</blockquote>`
  }

  // Handle text node
  if (node.type === 'text') {
    let text = node.text || ''
    
    // Apply formatting
    if (node.format) {
      if (node.format & 1) text = `<strong>${text}</strong>` // Bold
      if (node.format & 2) text = `<em>${text}</em>` // Italic
      if (node.format & 8) text = `<code>${text}</code>` // Code
      if (node.format & 16) text = `<u>${text}</u>` // Underline
      if (node.format & 32) text = `<s>${text}</s>` // Strikethrough
    }
    
    return text
  }

  // Handle link
  if (node.type === 'link') {
    const content = node.children ? node.children.map(processNode).join('') : ''
    const url = node.url || '#'
    const rel = node.rel || ''
    const target = node.target || ''
    return `<a href="${url}"${target ? ` target="${target}"` : ''}${rel ? ` rel="${rel}"` : ''}>${content}</a>`
  }

  // Handle line break
  if (node.type === 'linebreak') {
    return '<br>'
  }

  // If node has children, process them
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(processNode).join('')
  }

  return ''
}

// Extract plain text from Lexical content (useful for excerpts)
export function lexicalToPlainText(lexicalContent: any): string {
  if (!lexicalContent || !lexicalContent.root) {
    return ''
  }

  return extractText(lexicalContent.root)
}

function extractText(node: any): string {
  if (!node) return ''

  if (node.type === 'text') {
    return node.text || ''
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractText).join(' ')
  }

  return ''
}
