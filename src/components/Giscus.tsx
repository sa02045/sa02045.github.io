import React, { useEffect, useRef } from 'react';

export default function Giscus() {
  const commentsEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.async = true;
    scriptEl.src = 'https://giscus.app/client.js';
    scriptEl.setAttribute('data-repo', 'sa02045/sa02045.github.io');
    scriptEl.setAttribute('data-repo-id', 'R_kgDOLcbNCA');
    scriptEl.setAttribute('data-category', 'Comments');
    scriptEl.setAttribute('data-category-id', 'DIC_kwDOLcbNCM4CfK6O');
    scriptEl.setAttribute('data-mapping', 'pathname');
    scriptEl.setAttribute('data-strict', '0');
    scriptEl.setAttribute('data-reactions-enabled', '1');
    scriptEl.setAttribute('data-emit-metadata', '0');
    scriptEl.setAttribute('data-input-position', 'bottom');
    scriptEl.setAttribute('data-theme', 'light');
    scriptEl.setAttribute('data-lang', 'ko');
    scriptEl.crossOrigin = 'anonymous';

    commentsEl.current?.appendChild(scriptEl);
  }, []);

  return (
    <>
      <div>
        <div ref={commentsEl}></div>
      </div>
    </>
  );
}
