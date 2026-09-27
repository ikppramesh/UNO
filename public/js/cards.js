// Card rendering. Produces HTML strings from a card face + the active theme.
(function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const PALETTES = [['red', 'yellow', 'green', 'blue'], ['pink', 'teal', 'orange', 'purple']];

  function isWild(f) { return f.color === 'wild'; }
  function needsColor(f) { return isWild(f) && f.type !== 'colorRoulette'; }

  // Big centre symbol and small corner symbol for a face.
  function symbols(f, theme) {
    const icon = theme.icons[f.type];
    switch (f.type) {
      case 'number': return { big: String(f.value), small: String(f.value) };
      case 'draw': return { big: '+' + f.draw, small: '+' + f.draw };
      case 'wildDraw': return { big: '+' + f.draw, small: '+' + f.draw, icon: theme.icons.wildDraw };
      case 'wildReverseDraw': return { big: '⇄+' + f.draw, small: '+' + f.draw };
      case 'wildDrawColor': return { big: icon, small: '+?' };
      case 'skipAll': return { big: icon, small: '⊘' };
      default: return { big: icon || '?', small: icon || '?' };
    }
  }

  function faceName(f, theme) {
    const colorLabel = isWild(f) ? '' : (theme.colors[f.color] || {}).label + ' ';
    if (f.type === 'number') return `${colorLabel}${f.value}`;
    const label = theme.labels[f.type] || f.type;
    const n = f.draw ? ` +${f.draw}` : '';
    return `${colorLabel}${label}${n}`.trim();
  }

  function colorHex(color, theme) {
    return (theme.colors[color] || {}).hex || '#444';
  }

  // opts: { side, extraClass, id, title }
  function renderFace(f, theme, opts = {}) {
    const side = opts.side || 0;
    const s = symbols(f, theme);
    const wild = isWild(f);
    const cls = ['card', wild ? 'wild' : '', f.type === 'number' ? 'num' : 'action', opts.extraClass || ''].join(' ');
    let style = `--cc:${wild ? '#111' : colorHex(f.color, theme)};`;
    if (wild) {
      PALETTES[side].forEach((c, i) => { style += `--w${i + 1}:${colorHex(c, theme)};`; });
    }
    const label = f.type !== 'number' ? `<span class="lbl">${esc(theme.labels[f.type] || '')}</span>` : '';
    const bigClass = s.big.length > 2 ? 'sym long' : 'sym';
    return `<div class="${cls}" style="${style}" ${opts.id != null ? `data-id="${opts.id}"` : ''} title="${esc(opts.title || faceName(f, theme))}">
      <div class="inner">
        <span class="corner tl">${esc(s.small)}</span>
        <div class="oval"><span class="${bigClass}">${esc(s.big)}</span>${s.icon && s.icon !== s.big ? `<span class="subicon">${esc(s.icon)}</span>` : ''}</div>
        <span class="corner br">${esc(s.small)}</span>
        ${label}
      </div>
    </div>`;
  }

  function renderBack(theme, extraClass = '') {
    return `<div class="card back ${extraClass}"><div class="inner" style="background:${theme.back.bg}"><span class="back-text" style="color:${theme.back.color}">${esc(theme.back.text)}</span></div></div>`;
  }

  window.UnoCards = { esc, isWild, needsColor, faceName, colorHex, renderFace, renderBack, PALETTES };
})();
