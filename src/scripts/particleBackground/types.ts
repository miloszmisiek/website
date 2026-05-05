export type Node = {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  activation: number;
};

export type Edge = {
  a: number;
  b: number;
  perpOffset: number;
  alpha: number;
  dying: boolean;
};

export type Pulse = {
  from: number; to: number;
  t: number;
  speed: number;
  ttl: number;
  cx: number; cy: number;
};

export type ColorScheme = {
  node: string;
  nodeMembrane: string;
  nodeActive: string;
  dendrite: string;
  dendriteAct: string;
  pulse: string;
};
