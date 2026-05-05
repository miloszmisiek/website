import type { ColorScheme } from './types';

function isDark(): boolean {
  const t = document.documentElement.dataset.theme;
  if (t === 'dark')  return true;
  if (t === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function colors(): ColorScheme {
  return isDark() ? {
    node:        'rgba(160,152,145,0.60)',
    nodeMembrane:'rgba(160,152,145,0.18)',
    nodeActive:  'rgba(251,191,36,0.90)',
    dendrite:    'rgba(130,122,115,0.22)',
    dendriteAct: 'rgba(217,119,6,0.35)',
    pulse:       'rgba(251,191,36,0.70)',
  } : {
    node:        'rgba(100,92,85,0.55)',
    nodeMembrane:'rgba(100,92,85,0.14)',
    nodeActive:  'rgba(180,83,9,0.85)',
    dendrite:    'rgba(100,92,85,0.18)',
    dendriteAct: 'rgba(180,83,9,0.28)',
    pulse:       'rgba(180,83,9,0.70)',
  };
}
