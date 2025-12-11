import { buildTocAndSplit } from '@/lib/toc';
import { processWordPressContent } from '@/lib/process-content';

interface ArticleWithTOCProps {
  html: string;
}

/**
 * Server component that renders an article with a table of contents
 * TOC is rendered immediately before the first H2, centered within the article column
 */
export default function ArticleWithTOC({ html }: ArticleWithTOCProps) {
  // Process WordPress content to handle captions and other formatting
  const processedHtml = processWordPressContent(html);
  
  // Build TOC and split HTML on the server
  const { toc, preHtml, postHtml } = buildTocAndSplit(processedHtml);

  // If no H2s found, render the article normally
  if (toc.length < 1) {
    return <div dangerouslySetInnerHTML={{ __html: processedHtml }} />;
  }

  // Render with TOC inserted before first H2
  return (
    <>
      {/* Content before first H2 */}
      {preHtml && (
        <div dangerouslySetInnerHTML={{ __html: preHtml }} />
      )}
      
      {/* Table of Contents - full width of article content */}
      <div className="not-prose my-8">
        <nav aria-label="Innehåll">
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Innehåll</h2>
            <ol className="toc-list list-decimal list-outside ml-6 space-y-4">
              {toc.map(({ id, text }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="toc-link text-gray-700 hover:text-gray-600 transition-colors"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
      
      {/* Content from first H2 onward */}
      {postHtml && (
        <div dangerouslySetInnerHTML={{ __html: postHtml }} />
      )}
    </>
  );
}
