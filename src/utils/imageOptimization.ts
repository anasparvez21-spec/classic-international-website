// Image optimization utilities
export const getOptimizedImageUrl = (url: string, width?: number): string => {
  // For local images, return as-is (Vite will handle optimization in build)
  // For external images, you could add query params for CDN optimization
  if (url.startsWith('/')) {
    return url;
  }
  return url;
};

export const preloadImage = (url: string): void => {
  if (typeof window === 'undefined') return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
};

export const prefetchImages = (urls: string[]): void => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};
