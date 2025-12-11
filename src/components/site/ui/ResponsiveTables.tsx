'use client';

import { useEffect } from 'react';

interface ResponsiveTablesProps {
  rootSelector: string;
}

export default function ResponsiveTables({ rootSelector }: ResponsiveTablesProps) {
  useEffect(() => {
    const processTable = (table: HTMLTableElement) => {
      // Skip if already processed
      if (table.closest('.rt-wrap')) {
        return;
      }

      // Count columns from the first row
      const cols = table.querySelector('tr')?.children.length || 0;
      
      // Only process tables with more than 3 columns
      if (cols <= 3) {
        return;
      }

      // Get caption text for aria-label
      const caption = table.querySelector('caption');
      const ariaLabel = caption?.textContent?.trim() || 'Tabell';

      // Create wrapper element
      const wrapper = document.createElement('div');
      wrapper.className = 'rt-wrap relative -mx-4 md:mx-0 overflow-x-auto overscroll-x-contain';
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', ariaLabel);

      // Insert wrapper before table and move table inside
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);

      // Add classes to table
table.className = `${table.className} w-full table-fixed border-separate text-sm md:text-base`.trim();

      // Set minimum width to prevent column squashing
      const minPerCol = 224; // ~14rem per column
      table.style.minWidth = `${Math.max(cols, 4) * minPerCol}px`;

      // Process all th and td elements
      const cells = table.querySelectorAll('th, td');
      cells.forEach((cell) => {
        const el = cell as HTMLElement;
        
        // Add base classes
        let baseClasses = 'p-3 md:p-4 align-top whitespace-normal break-words hyphens-auto border-b border-gray-200';
        if (el.tagName === 'TD') {
baseClasses += ' bg-surface md:bg-transparent';
        }
        el.className = `${el.className} ${baseClasses}`.trim();

        // Add inline styles for word breaking
        el.style.wordBreak = 'break-word';
        el.style.overflowWrap = 'anywhere';

        // Make first column sticky on mobile (optional feature)
        const row = el.parentElement;
        const cellIndex = Array.from(row?.children || []).indexOf(el);
        
        if (cellIndex === 0) {
const stickyClasses = 'sticky left-0 bg-surface z-20 relative after:absolute after:inset-y-0 after:-right-px after:w-px after:bg-gray-200 md:static md:bg-transparent md:z-auto';
          el.className = `${el.className} ${stickyClasses}`.trim();
        }
      });

      // Add edge gradients as scroll affordance
      const leftGradient = document.createElement('div');
leftGradient.className = 'pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#e9eaed] to-transparent';
      
      const rightGradient = document.createElement('div');
rightGradient.className = 'pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#e9eaed] to-transparent';

      wrapper.appendChild(leftGradient);
      wrapper.appendChild(rightGradient);
    };

    const processTables = () => {
      const rootElement = document.querySelector(rootSelector);
      if (!rootElement) {
        return;
      }

      // Find all tables under the root selector
      const tables = rootElement.querySelectorAll('table');
      tables.forEach((table) => processTable(table as HTMLTableElement));
    };

    // Process tables on mount
    processTables();

    // Also process tables when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      processTables();
    });

    const rootElement = document.querySelector(rootSelector);
    if (rootElement) {
      observer.observe(rootElement, {
        childList: true,
        subtree: true
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [rootSelector]);

  return null; // This component doesn't render anything
}
