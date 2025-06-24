import React, { useEffect, useRef, useState } from 'react';
import { createStarryNight, common } from '@wooorm/starry-night';
import { toHtml } from 'hast-util-to-html';
import '@wooorm/starry-night/style/both';

interface StarryNightHighlighterProps {
  code: string;
  language: string;
  className?: string;
  style?: React.CSSProperties;
}

const StarryNightHighlighter: React.FC<StarryNightHighlighterProps> = ({ code, language, className, style }) => {
  const [html, setHtml] = useState<string>('');
  const starryNightRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    async function highlight() {
      if (!starryNightRef.current) {
        starryNightRef.current = await createStarryNight(common);
      }
      const scope = starryNightRef.current.flagToScope(language) || starryNightRef.current.flagToScope('text');
      if (!scope) {
        setHtml(code);
        return;
      }
      const tree = starryNightRef.current.highlight(code, scope);
      const htmlString = toHtml(tree);
      if (isMounted) setHtml(htmlString);
    }
    highlight();
    return () => { isMounted = false; };
  }, [code, language]);

  // Use consistent dark background for all code in dark mode
  const isCodeBlock = className?.includes('single-code');
  const bgColor = '#2b2b2b'; // Use same dark background for both single and tabbed code
  
  return (
    <pre 
      className={className} 
      style={{ 
        ...style, 
        borderRadius: '6px', 
        margin: 0, 
        fontSize: '0.95em', 
        background: bgColor, 
        color: '#d4d4d4', 
        overflowX: 'auto',
        ['--bg-override' as any]: bgColor
      }}
    >
      <code 
        dangerouslySetInnerHTML={{ __html: html }} 
        style={{ ['--bg-override' as any]: bgColor }}
      />
    </pre>
  );
};

export default StarryNightHighlighter;
