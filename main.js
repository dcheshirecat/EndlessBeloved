// ── Shared UI helpers ────────────────────────────────────────────
const _ui = {
  starfield() {
    const stars = [
      [5,6,1.2,0.9],[12,2.5,0.8,0.7],[19,10,1.4,0.85],[30,4,0.9,0.6],
      [37,1.5,1.1,0.8],[46,8,0.7,0.65],[54,3,1.3,0.9],[62,6,0.8,0.7],
      [70,2,1.0,0.75],[79,9,0.6,0.55],[86,4,1.2,0.85],[94,7,0.9,0.65],
      [7,17,0.7,0.5],[18,21,1.0,0.7],[32,15,0.8,0.6],[44,19,1.1,0.75],
      [57,13,0.6,0.5],[68,20,1.3,0.8],[81,16,0.7,0.6],[91,22,0.9,0.65],
      [4,32,0.8,0.45],[15,36,1.0,0.6],[27,28,0.6,0.5],[41,37,1.2,0.7],
      [52,30,0.7,0.55],[65,33,1.1,0.75],[76,29,0.8,0.6],[89,38,0.9,0.65],
      [9,48,0.8,0.45],[22,43,0.7,0.4],[35,50,1.0,0.55],[48,46,0.6,0.5],
      [61,49,1.2,0.65],[74,45,0.9,0.6],[93,51,0.8,0.45],[6,63,0.7,0.4],
      [28,60,1.0,0.5],[46,65,0.8,0.45],[65,62,1.1,0.6],[83,67,0.7,0.4],
    ];
    const violetIdxs = new Set([3,7,12,19,24,30]);
    const blueIdxs   = new Set([6,14,21]);
    let html = '<div class="starfield">';
    stars.forEach(([x,y,r,op], i) => {
      let color = 'white';
      if (violetIdxs.has(i)) color = '#d4b0ff';
      else if (blueIdxs.has(i)) color = '#a8c8ff';
      const dur   = (2.5 + Math.random() * 2).toFixed(1);
      const delay = (Math.random() * 3).toFixed(1);
      html += `<div class="star" style="left:${x}%;top:${y}%;width:${r*2}px;height:${r*2}px;background:${color};--op:${op};--dur:${dur}s;--delay:-${delay}s;margin-left:-${r}px;margin-top:-${r}px;"></div>`;
    });
    html += '</div>';
    return html;
  },
  nebula: () => '<div class="nebula"></div>',
  corners: () => `<div class="corners">
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
  </div>`,
  divider: () => `<div class="divider">
    <div class="divider-line"></div>
    <div class="divider-gem"></div>
    <div class="divider-line"></div>
  </div>`,
};

// ── Boot ─────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => GameManager.init());
