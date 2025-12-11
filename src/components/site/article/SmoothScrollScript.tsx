'use client';

import { useEffect } from 'react';

/**
 * Client component that adds smooth scrolling to anchor links
 * Respects user's reduced motion preferences
 */
export default function SmoothScrollScript() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        // Instant jump for users who prefer reduced motion
        targetElement.scrollIntoView({ block: 'start' });
      } else {
        // Smooth scroll for others
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Update URL without triggering navigation
      window.history.pushState(null, '', href);
    };
    
    // Add event listener to document to catch all anchor clicks
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return null;
}
