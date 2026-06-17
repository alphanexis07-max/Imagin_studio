import React from 'react';

export function extractInstagramShortcode(url: string) {
  try {
    const m = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  } catch (e) {
    return null;
  }
}

export default function InstagramEmbed({ url, poster, className = '' }: { url: string; poster?: string; className?: string }) {
  const shortcode = extractInstagramShortcode(url);

  if (shortcode) {
    const src = `https://www.instagram.com/p/${shortcode}/embed`;
    return (
      <div className={`instagram-embed ${className}`} style={{ width: '100%', maxWidth: '900px' }}>
        <iframe
          src={src}
          title={`Instagram post ${shortcode}`}
          width="100%"
          height={600}
          frameBorder={0}
          scrolling="no"
          style={{ border: 'none', overflow: 'hidden' }}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    );
  }

  // fallback: if direct image/video
  if (url.match(/\.(jpg|jpeg|png|gif)(\?|$)/i)) {
    return <img src={url} alt="Instagram media" className={className} />;
  }

  if (url.match(/\.(mp4|webm|ogg)(\?|$)/i)) {
    return (
      <video src={url} poster={poster} className={className} controls playsInline />
    );
  }

  return (
    <a href={url} target="_blank" rel="noreferrer noopener" className={className}>
      Open media
    </a>
  );
}
