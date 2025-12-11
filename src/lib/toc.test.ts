import { buildTocAndSplit } from './toc';

// Test cases for the TOC functionality
describe('buildTocAndSplit', () => {
  it('should handle HTML with no H2 elements', () => {
    const html = '<h1>Title</h1><p>Some content</p><h3>Subsection</h3>';
    const result = buildTocAndSplit(html);
    
    expect(result.toc).toHaveLength(0);
    expect(result.preHtml).toBe(html);
    expect(result.postHtml).toBe('');
  });

  it('should extract H2 elements and generate IDs', () => {
    const html = `
      <h1>Title</h1>
      <p>Intro</p>
      <h2>First Section</h2>
      <p>Content 1</p>
      <h2>Second Section</h2>
      <p>Content 2</p>
    `;
    
    const result = buildTocAndSplit(html);
    
    expect(result.toc).toHaveLength(2);
    expect(result.toc[0]).toEqual({ id: 'first-section', text: 'First Section' });
    expect(result.toc[1]).toEqual({ id: 'second-section', text: 'Second Section' });
  });

  it('should preserve existing IDs', () => {
    const html = `
      <h1>Title</h1>
      <h2 id="custom-id">Section with ID</h2>
      <p>Content</p>
    `;
    
    const result = buildTocAndSplit(html);
    
    expect(result.toc[0]).toEqual({ id: 'custom-id', text: 'Section with ID' });
  });

  it('should handle duplicate headings with unique IDs', () => {
    const html = `
      <h2>Duplicate</h2>
      <h2>Duplicate</h2>
      <h2>Duplicate</h2>
    `;
    
    const result = buildTocAndSplit(html);
    
    expect(result.toc[0].id).toBe('duplicate');
    expect(result.toc[1].id).toBe('duplicate-2');
    expect(result.toc[2].id).toBe('duplicate-3');
  });

  it('should preserve Unicode characters in IDs', () => {
    const html = '<h2>Section with åäö</h2>';
    const result = buildTocAndSplit(html);
    
    expect(result.toc[0].text).toBe('Section with åäö');
    expect(result.toc[0].id).toContain('åäö');
  });

  it('should add scroll-mt class to H2 elements', () => {
    const html = '<h2>Section</h2>';
    const result = buildTocAndSplit(html);
    
    expect(result.postHtml).toContain('class="scroll-mt-[var(--toc-offset,96px)]"');
  });

  it('should preserve existing classes and add scroll-mt', () => {
    const html = '<h2 class="existing-class">Section</h2>';
    const result = buildTocAndSplit(html);
    
    expect(result.postHtml).toContain('class="existing-class scroll-mt-[var(--toc-offset,96px)]"');
  });

  it('should split HTML correctly at first H2', () => {
    const html = `
      <h1>Title</h1>
      <p>Before H2</p>
      <h2>First H2</h2>
      <p>After H2</p>
      <h2>Second H2</h2>
    `;
    
    const result = buildTocAndSplit(html);
    
    expect(result.preHtml).toContain('<h1>Title</h1>');
    expect(result.preHtml).toContain('<p>Before H2</p>');
    expect(result.preHtml).not.toContain('<h2>');
    
    expect(result.postHtml).toContain('<h2');
    expect(result.postHtml).toContain('First H2');
    expect(result.postHtml).toContain('Second H2');
  });

  it('should strip HTML tags from heading text in TOC', () => {
    const html = '<h2>Section with <strong>bold</strong> and <em>italic</em></h2>';
    const result = buildTocAndSplit(html);
    
    expect(result.toc[0].text).toBe('Section with bold and italic');
  });
});
