import type { Node, Edge, Pulse } from './types';
import {
  LINK_DIST, MAX_CONN, CURVE_BEND, DRIFT, DRIFT_NOISE, MAX_SPEED,
  REPULSE_R, REPULSE_F, EDGE_FADE_STEP,
  PULSE_SPEED, PULSE_VAR, MAX_PULSES, PROPAGATE_P, PULSE_TTL,
  ACTIVATE_FADE, WAVE_INTERVAL,
} from './config';

export let W = 0, H = 0;
export let nodes:  Node[]  = [];
export let edges:  Edge[]  = [];
export let pulses: Pulse[] = [];
export let frameN = 0;
export const mouse = { x: -9999, y: -9999 };

export function resize(canvas: HTMLCanvasElement) {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function nodeCount(): number | null {
  const w = window.innerWidth;
  if (w < 768)  return 10;
  if (w < 1024) return 20;
  return 38;
}

export function mkEdge(a: number, b: number): Edge {
  return { a, b, perpOffset: (Math.random() - 0.5) * CURVE_BEND * 2, alpha: 0, dying: false };
}

export function ctrlPt(e: Edge): { cx: number; cy: number } {
  const na = nodes[e.a], nb = nodes[e.b];
  const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2;
  const dx = nb.x - na.x,       dy = nb.y - na.y;
  const len = Math.max(Math.hypot(dx, dy), 1);
  return { cx: mx + (-dy / len) * e.perpOffset,
           cy: my + ( dx / len) * e.perpOffset };
}

export function bPt(
  x0: number, y0: number,
  cx: number, cy: number,
  x1: number, y1: number,
  t: number,
) {
  const mt = 1 - t;
  return { x: mt*mt*x0 + 2*mt*t*cx + t*t*x1,
           y: mt*mt*y0 + 2*mt*t*cy + t*t*y1 };
}

export function neighborsOf(idx: number): number[] {
  return edges
    .filter(e => !e.dying && (e.a === idx || e.b === idx))
    .map(e => e.a === idx ? e.b : e.a);
}

export function triggerWave() {
  if (!nodes.length) return;
  const connected = nodes.map((_, i) => i).filter(i => neighborsOf(i).length > 0);
  if (!connected.length) return;
  const idx = connected[Math.floor(Math.random() * connected.length)];
  nodes[idx].activation = 1.0;
  for (const n of neighborsOf(idx)) spawnPulse(idx, n, PULSE_TTL);
}

export function spawnPulse(from: number, to: number, ttl: number) {
  if (pulses.length >= MAX_PULSES) return;
  const e = edges.find(ed => !ed.dying && ((ed.a === from && ed.b === to) || (ed.a === to && ed.b === from)));
  const { cx, cy } = e ? ctrlPt(e) : {
    cx: (nodes[from].x + nodes[to].x) / 2,
    cy: (nodes[from].y + nodes[to].y) / 2,
  };
  pulses.push({ from, to, t: 0,
    speed: PULSE_SPEED + (Math.random() - 0.5) * PULSE_VAR * 2,
    ttl, cx, cy });
}

export function init() {
  const count = nodeCount();
  if (!count) { nodes = []; edges = []; pulses = []; return; }

  nodes = Array.from({ length: count }, () => ({
    x:  W * 0.06 + Math.random() * W * 0.88,
    y:  H * 0.06 + Math.random() * H * 0.88,
    vx: Math.cos(Math.random() * Math.PI * 2) * DRIFT * (0.6 + Math.random() * 0.4),
    vy: Math.sin(Math.random() * Math.PI * 2) * DRIFT * (0.6 + Math.random() * 0.4),
    r:  3 + Math.random() * 3,
    activation: 0,
  }));

  edges = [];
  for (let i = 0; i < nodes.length; i++) {
    const degI = () => edges.filter(e => e.a === i || e.b === i).length;
    if (degI() >= MAX_CONN) continue;
    const candidates = nodes
      .map((n, j) => ({ j, d: Math.hypot(nodes[i].x - n.x, nodes[i].y - n.y) }))
      .filter(x => x.j > i && x.d > 40 && x.d < LINK_DIST)
      .sort((a, b) => a.d - b.d);
    for (const { j } of candidates) {
      if (degI() >= MAX_CONN) break;
      if (edges.filter(e => e.a === j || e.b === j).length >= MAX_CONN) continue;
      edges.push(mkEdge(i, j));
    }
  }

  // start edges visible immediately so there's no fade-in on load
  for (const e of edges) e.alpha = 1;

  pulses = [];
  frameN = 0;
}

export function tick() {
  frameN++;
  if (frameN % WAVE_INTERVAL === 0) triggerWave();

  for (const n of nodes) {
    const mdx = n.x - mouse.x, mdy = n.y - mouse.y;
    const md  = Math.hypot(mdx, mdy);
    if (md < REPULSE_R && md > 0) {
      const f = (REPULSE_R - md) / REPULSE_R;
      n.x += (mdx / md) * f * REPULSE_F;
      n.y += (mdy / md) * f * REPULSE_F;
    }
    n.vx += (Math.random() - 0.5) * DRIFT_NOISE;
    n.vy += (Math.random() - 0.5) * DRIFT_NOISE;
    const spd = Math.hypot(n.vx, n.vy);
    if (spd > MAX_SPEED) { n.vx = n.vx / spd * MAX_SPEED; n.vy = n.vy / spd * MAX_SPEED; }
    n.x  += n.vx;          n.y  += n.vy;
    const mx = 60;
    if (n.x < mx)     { n.x = mx;     n.vx =  Math.abs(n.vx); }
    if (n.x > W - mx) { n.x = W - mx; n.vx = -Math.abs(n.vx); }
    if (n.y < mx)     { n.y = mx;     n.vy =  Math.abs(n.vy); }
    if (n.y > H - mx) { n.y = H - mx; n.vy = -Math.abs(n.vy); }
    n.activation = Math.max(0, n.activation - ACTIVATE_FADE);
  }

  if (frameN % 20 === 0) {
    const deg = new Int32Array(nodes.length);
    for (const e of edges) { if (!e.dying) { deg[e.a]++; deg[e.b]++; } }

    for (let i = 0; i < nodes.length; i++) {
      if (deg[i] >= MAX_CONN) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        if (deg[j] >= MAX_CONN) continue;
        if (edges.some(e => e.a === i && e.b === j)) continue;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < LINK_DIST) { edges.push(mkEdge(i, j)); deg[i]++; deg[j]++; }
      }
    }

    for (const e of edges) {
      if (!e.dying && Math.hypot(nodes[e.a].x - nodes[e.b].x, nodes[e.a].y - nodes[e.b].y) >= LINK_DIST * 1.3) {
        e.dying = true;
      }
    }
  }

  for (const e of edges) {
    if (e.dying) {
      e.alpha = Math.max(0, e.alpha - EDGE_FADE_STEP);
    } else {
      e.alpha = Math.min(1, e.alpha + EDGE_FADE_STEP);
    }
  }
  edges = edges.filter(e => e.alpha > 0);

  // collect into a staging array to avoid mutating pulses while iterating it
  type Prop = { from: number; to: number; ttl: number };
  const propagate: Prop[] = [];
  pulses = pulses.filter(p => {
    p.t += p.speed;
    if (p.t < 1) return true;
    nodes[p.to].activation = 1.0;
    if (p.ttl > 1) {
      for (const n of neighborsOf(p.to)) {
        if (n !== p.from && Math.random() < PROPAGATE_P)
          propagate.push({ from: p.to, to: n, ttl: p.ttl - 1 });
      }
    }
    return false;
  });
  for (const { from, to, ttl } of propagate) spawnPulse(from, to, ttl);
}
