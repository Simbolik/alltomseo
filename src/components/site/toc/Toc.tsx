
"use client";
import { useState, useEffect, useRef } from 'react';

interface TocProps {
  content: string;
}

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

const Toc = ({ content }: TocProps) => {
  const [toc, setToc] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2, h3'));
    const tocEntries: TocEntry[] = [];
    const idMap: { [key: string]: number } = {};

    headings.forEach((heading) => {
      const text = heading.textContent || '';
      let id = heading.id || '';
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9åäö\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
      }
      
      if (idMap[id] !== undefined) {
        idMap[id]++;
        id = `${id}-${idMap[id]}`;
      } else {
        idMap[id] = 1;
      }
      heading.id = id;

      tocEntries.push({
        id,
        text,
        level: parseInt(heading.tagName.substring(1)),
      });
    });

    setToc(tocEntries);
  }, [content]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-120px 0px -60% 0px',
    });

    toc.forEach((entry) => {
      const element = document.getElementById(entry.id);
      if (element) {
        observer.current?.observe(element);
      }
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [toc]);

  if (toc.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Innehåll" className="not-prose">
      {/* Mobile collapsible TOC */}
      <details className="md:hidden mb-4">
<summary className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-surface px-3 py-2 text-sm shadow-sm hover:bg-[#dfe3ea]">
          Innehållsförteckning
        </summary>
<div className="rounded-lg bg-surface shadow-sm ring-1 ring-black/5 p-3 mt-2">
          <ul className="space-y-1 text-sm">
            {toc.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  aria-current={activeId === entry.id ? 'true' : 'false'}
                  className={`block rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-50
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C6C8A]
                    aria-[current=true]:font-semibold aria-[current=true]:bg-gray-50
                    ${entry.level === 3 ? 'pl-4' : ''}`}
                >
                  {entry.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>

      {/* Desktop sticky TOC */}
<div className="sticky top-24 rounded-lg bg-surface shadow-sm ring-1 ring-black/5 p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-2">Innehåll</h2>
        <ul className="space-y-1 text-sm">
          {toc.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={activeId === entry.id ? 'true' : 'false'}
                className={`block rounded px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-50
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C6C8A]
                  aria-[current=true]:font-semibold aria-[current=true]:bg-gray-50
                  ${entry.level === 3 ? 'pl-4' : ''}`}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Toc;

