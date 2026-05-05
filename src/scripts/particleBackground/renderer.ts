import { PULSE_R } from './config';
import { colors } from './colors';
import { nodes, edges, pulses, W, H, ctrlPt, bPt } from './simulation';

export function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, W, H);
  const c = colors();

  for (const e of edges) {
    const na = nodes[e.a], nb = nodes[e.b];
    const act = Math.max(na.activation, nb.activation);
    const { cx, cy } = ctrlPt(e);
    if (act > 0.05) {
      ctx.strokeStyle = c.dendriteAct;
      ctx.globalAlpha = e.alpha * (0.10 + act * 0.30);
      ctx.lineWidth   = 0.8 + act * 0.5;
    } else {
      ctx.strokeStyle = c.dendrite;
      ctx.globalAlpha = e.alpha;
      ctx.lineWidth   = 0.8;
    }
    ctx.beginPath();
    ctx.moveTo(na.x, na.y);
    ctx.quadraticCurveTo(cx, cy, nb.x, nb.y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  for (const p of pulses) {
    const { x: x0, y: y0 } = nodes[p.from];
    const { x: x1, y: y1 } = nodes[p.to];
    for (let i = 0; i < 3; i++) {
      const tt = Math.max(0, p.t - i * 0.035);
      const { x, y } = bPt(x0, y0, p.cx, p.cy, x1, y1, tt);
      ctx.globalAlpha = (1 - i / 3) * 0.45;
      ctx.fillStyle   = c.pulse;
      ctx.beginPath();
      ctx.arc(x, y, PULSE_R * (1 - i * 0.2), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = c.nodeMembrane;
  ctx.lineWidth   = 1;
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r + 2.5, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (const n of nodes) {
    ctx.fillStyle   = n.activation > 0.05 ? c.nodeActive : c.node;
    ctx.globalAlpha = 0.65 + n.activation * 0.25;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
