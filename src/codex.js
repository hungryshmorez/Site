// The encyclopedia, rendered on the site. It imports the ONE codex source
// (docs/CODEX.md) raw and renders it, so the page can never drift from the doc.
import md from '../docs/CODEX.md?raw';

// tiny, purpose-built markdown renderer (headings, tables, lists, hr, inline)
function inline(s) {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function cells(row) { return row.split('|').slice(1, -1).map((c) => c.trim()); }

function table(rows) {
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells); // rows[1] is the |---| separator
  let h = '<div class="tw"><table><thead><tr>';
  h += head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
  for (const r of body) h += '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>';
  return h + '</tbody></table></div>';
}

function render(src) {
  const lines = src.split('\n');
  let out = '', i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*---\s*$/.test(line)) { out += '<hr>'; i++; continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { const lv = h[1].length; out += `<h${lv}>${inline(h[2])}</h${lv}>`; i++; continue; }
    if (line.trim().startsWith('|')) {
      const rows = []; while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i]); i++; }
      out += table(rows); continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      out += '<ul>';
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { out += `<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ''))}</li>`; i++; }
      out += '</ul>'; continue;
    }
    if (line.trim() === '') { i++; continue; }
    const para = [line]; i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^\s*([-*#|]|---)/.test(lines[i])) { para.push(lines[i]); i++; }
    out += `<p>${inline(para.join(' '))}</p>`;
  }
  return out;
}

document.getElementById('doc').innerHTML = render(md);
