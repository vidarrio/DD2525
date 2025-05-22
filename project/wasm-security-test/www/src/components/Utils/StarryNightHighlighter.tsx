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

  return (
    <pre className={className} style={{ ...style, borderRadius: '6px', margin: 0, fontSize: '0.95em', background: '#1e1e1e', color: '#d4d4d4', overflowX: 'auto' }}>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};

export default StarryNightHighlighter;
