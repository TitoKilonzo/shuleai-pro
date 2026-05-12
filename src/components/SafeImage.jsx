import { useState, useEffect } from 'react';

/**
 * SafeImage Component
 * Handles image fallbacks, loading states, and lazy loading.
 */
export default function SafeImage({ 
  src, 
  alt, 
  className = '', 
  fallback = '/favicon.svg',
  style = {},
  ...props 
}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset states if src changes
  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [src]);

  return (
    <div 
      className={`safe-image-container ${className}`} 
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        background: 'var(--surface-alt)',
        ...style 
      }}
    >
      {loading && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--surface-alt)',
          zIndex: 1
        }}>
          <div className="loader" style={{ width: 24, height: 24, borderWidth: 2 }} />
        </div>
      )}
      
      <img
        src={error ? fallback : (src || fallback)}
        alt={alt || 'ShuleAI Pro Content'}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.4s ease',
          ...props.style
        }}
        {...props}
      />
    </div>
  );
}
