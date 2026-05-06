import { PULSE_TTL } from './config';
import { resize, init, tick, spawnPulse, neighborsOf, nodes, mouse } from './simulation';
import { draw } from './renderer';

function start() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particle-bg') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;

  function loop() {
    tick();
    draw(ctx);
    requestAnimationFrame(loop);
  }

  const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hasMouse) {
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  }

  window.addEventListener('click', ev => {
    if (!nodes.length) return;
    let nearest = -1, nearDist = Infinity;
    for (let i = 0; i < nodes.length; i++) {
      if (neighborsOf(i).length === 0) continue;
      const d = Math.hypot(nodes[i].x - ev.clientX, nodes[i].y - ev.clientY);
      if (d < nearDist) { nearDist = d; nearest = i; }
    }
    if (nearest === -1) return;
    nodes[nearest].activation = 1.0;
    for (const n of neighborsOf(nearest)) spawnPulse(nearest, n, PULSE_TTL);
  });

  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    const newW = window.innerWidth;
    resize(canvas);
    if (newW !== lastW) { lastW = newW; init(); }
  });

  resize(canvas);
  init();
  requestAnimationFrame(loop);
}

start();
