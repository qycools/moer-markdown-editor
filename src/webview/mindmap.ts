export const headingSelector = 'h1,h2,h3,h4,h5,h6';

function label(text: string) {
  return text.trim().replace(/\s+/g, ' ').replace(/[\\`*_{}\[\]()!:#|~$<>&+.-]/g, '\\$&');
}

function paragraphExcerpt(text: string) {
  const characters = Array.from(text.trim().replace(/\s+/g, ' '));
  return characters.length > 80 ? characters.slice(0, 80).join('') + '…' : characters.join('');
}

export function buildMindmap(root: ParentNode, filename: string, detailed: boolean) {
  const levels: number[] = [];
  const branches: string[] = [];
  const bullet = (text: string, depth: number) => {
    const content = label(text);
    if (content) branches.push(`${'  '.repeat(depth)}- ${content}`);
    return !!content;
  };
  const appendList = (list: Element, depth: number) => {
    for (const item of list.children) {
      if (item.tagName !== 'LI') continue;
      const copy = item.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('ol,ul,pre,table').forEach(child => child.remove());
      const task = copy.querySelector<HTMLInputElement>('input[type=checkbox]');
      const text = task ? `${task.checked ? '✓' : '□'} ${copy.textContent?.trim() || ''}` : copy.textContent || '';
      const childDepth = depth + Number(bullet(text, depth));
      for (const children of item.querySelectorAll('ol,ul')) {
        if (children.closest('li') === item) appendList(children, childDepth);
      }
    }
  };

  const selector = detailed ? headingSelector + ',p,ul,ol' : headingSelector;
  for (const block of root.querySelectorAll(selector)) {
    if (detailed && block.closest('li,pre,table,nav,.vditor-toc,.footnotes-defs')) continue;
    if (block.matches(headingSelector)) {
      const level = Number(block.tagName[1]);
      while (levels.length && levels.at(-1)! >= level) levels.pop();
      bullet(block.textContent?.trim() || '未命名标题', levels.length);
      levels.push(level);
    } else if (block.tagName === 'P') {
      bullet(paragraphExcerpt(block.textContent || ''), levels.length);
    } else {
      appendList(block, levels.length);
    }
  }
  const example = !branches.length;
  const title = example ? '主题' : label(filename.replace(/\.(md|markdown)$/i, '')) || '文档';
  const frontmatter = detailed ? ['---', 'markmap:', '  maxWidth: 240', '---', ''] : [];
  return {
    example,
    markdown: [...frontmatter, `# ${title}`, '', ...(example ? ['- 分支一', '- 分支二'] : branches)].join('\n'),
  };
}

export async function mindmapSvg(markdown: string, render: (canvas: HTMLElement, signal: AbortSignal) => Promise<unknown>) {
  const canvas = document.createElement('div');
  canvas.className = 'vm-mindmap-export';
  canvas.setAttribute('aria-hidden', 'true');
  const code = document.createElement('code');
  code.className = 'language-markmap';
  code.textContent = markdown;
  canvas.append(code);
  document.body.append(canvas);
  const controller = new AbortController();
  try {
    await render(canvas, controller.signal);
    const svg = canvas.querySelector('svg');
    const content = svg?.querySelector(':scope > g');
    if (!svg || !(content instanceof SVGGraphicsElement)) throw new Error('思维导图渲染失败。');
    const box = content.getBBox();
    const padding = 16;
    const width = Math.ceil(box.width) + padding * 2;
    const height = Math.ceil(box.height) + padding * 2;
    const left = box.x - padding, top = box.y - padding;
    const copy = svg.cloneNode(true) as SVGSVGElement;
    copy.querySelector(':scope > g')!.removeAttribute('transform');
    copy.removeAttribute('style');
    copy.style.color = '#24292f';
    copy.setAttribute('width', String(width));
    copy.setAttribute('height', String(height));
    copy.setAttribute('viewBox', `${left} ${top} ${width} ${height}`);
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    for (const [name, value] of Object.entries({ x: left, y: top, width, height, fill: '#fff' })) {
      background.setAttribute(name, String(value));
    }
    copy.prepend(background);
    return new XMLSerializer().serializeToString(copy);
  } finally {
    controller.abort();
    canvas.remove();
  }
}
