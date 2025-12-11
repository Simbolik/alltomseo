'use client';

interface NoPreloadImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export default function NoPreloadImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  loading = 'lazy'
}: NoPreloadImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
    />
  );
}
