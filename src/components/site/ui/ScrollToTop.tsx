'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    // Scroll event handler
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrollTop / documentHeight;
      
      // Show button when user has scrolled more than 50% of page height
      setIsVisible(scrollPercentage > 0.5);
    };

    // Intersection observer for footer positioning
    const observeFooter = () => {
      const sentinel = document.getElementById('footer-sentinel');
      if (!sentinel) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsNearFooter(entry.isIntersecting);
        },
        {
          threshold: 0,
          rootMargin: '0px 0px 100px 0px' // Trigger 100px before the sentinel comes into view
        }
      );

      observer.observe(sentinel);
      return () => observer.disconnect();
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set up footer observer
    const cleanupObserver = observeFooter();

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (cleanupObserver) cleanupObserver();
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'instant' : 'smooth'
    });
  };

  return (
    <div
      className={`fixed z-50 flex items-center justify-center rounded-md bg-white/95 text-gray-700 shadow-md ring-1 ring-black/5 backdrop-blur hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C6C8A] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none ${
        isVisible
          ? 'pointer-events-auto opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-2'
      } ${
        isNearFooter
          ? 'bottom-32 md:bottom-28'
          : 'bottom-24 md:bottom-24'
      } right-4 md:right-6 h-8 w-8 md:h-10 md:w-10`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        type="button"
        title="Till toppen"
        className="flex items-center justify-center w-full h-full"
      >
        <svg
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <span className="sr-only">Till toppen</span>
      </button>
    </div>
  );
}
