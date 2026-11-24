type Hit = { section: number; start: number; end: number; replacement?: string };

export function scanSearch(texts: string[], query: string, regex: boolean, matchCase: boolean, wholeWord: boolean, replacement?: string): Hit[] {
  if (!query) return [];
  const expression = regex ? query : query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const word = '[\\p{L}\\p{M}\\p{N}_]';
  const pattern = new RegExp(wholeWord ? `(?<!${word})(?:${expression})(?!${word})` : expression, matchCase ? 'gu' : 'giu');
  const hits: Hit[] = [];
  for (const [section, text] of texts.entries()) {
    for (const match of text.matchAll(pattern)) {
      const start = match.index!;
      const end = start + match[0].length;
      if (start === end) continue;
      const value = regex ? replacement?.replace(/\$([$&`']|[1-9]\d?|<[^>]+>)/g, (token, key: string) => {
        if (key === '$') return '$';
        if (key === '&') return match[0];
        if (key === '`') return text.slice(0, start);
        if (key === "'") return text.slice(end);
        if (key[0] === '<') return match.groups ? match.groups[key.slice(1, -1)] ?? '' : token;
        if (Number(key) < match.length) return match[Number(key)] ?? '';
        if (key.length === 2 && Number(key[0]) < match.length) return (match[Number(key[0])] ?? '') + key[1];
        return token;
      }) : replacement;
      hits.push({ section, start, end, replacement: value });
    }
  }
  return hits;
}

export function searchWorker() {
  const script = `self.onmessage = e => {
    try { self.postMessage((${scanSearch.toString()})(...e.data)); }
    catch { self.postMessage(null); }
  }`;
  const url = URL.createObjectURL(new Blob([script], { type: 'text/javascript' }));
  try { return new Worker(url); }
  finally { URL.revokeObjectURL(url); }
}
