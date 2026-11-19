/**
 * Pure geometry for the axonometric line drawings. Volumes are described in
 * metres on a plan grid (x to the right-back, y to the left-back, z up) and
 * projected isometrically. No React here, so the maths is easy to test.
 */

export type RoofForm = 'flat' | 'gable' | 'mono';

export type Volume = {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  roof?: RoofForm;
  /** Roof rise above the eaves for gable and mono-pitch roofs. */
  rise?: number;
  /** Ridge direction for a gable roof. */
  ridge?: 'x' | 'y';
  /** Drawn in signal red: the new work in a project. */
  accent?: boolean;
  /** Faces that carry a large glazed opening. */
  glaze?: ('x' | 'y')[];
};

export type FaceKind = 'top' | 'left' | 'right' | 'roof' | 'glass';

export type Face = {kind: FaceKind; points: [number, number][]; accent: boolean};

type P3 = [number, number, number];

const COS30 = Math.cos(Math.PI / 6);

/** Isometric projection of a plan point to drawing units (1 unit = 1 m). */
export function project([x, y, z]: P3): [number, number] {
  return [round((x - y) * COS30), round((x + y) * 0.5 - z)];
}

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

function face(kind: FaceKind, pts: P3[], accent: boolean): Face {
  return {kind, points: pts.map(project), accent};
}

/** Faces of one volume, in back-to-front paint order. */
export function volumeFaces(v: Volume): Face[] {
  const z0 = v.z ?? 0;
  const x0 = v.x;
  const y0 = v.y;
  const x1 = v.x + v.w;
  const y1 = v.y + v.d;
  const h = z0 + v.h;
  const r = v.rise ?? 0;
  const a = Boolean(v.accent);
  const roof = v.roof ?? 'flat';
  const faces: Face[] = [];

  if (roof === 'gable' && (v.ridge ?? 'y') === 'y') {
    const xm = (x0 + x1) / 2;
    faces.push(face('right', [[x1, y0, z0], [x1, y1, z0], [x1, y1, h], [x1, y0, h]], a));
    faces.push(face('left', [[x0, y1, z0], [x1, y1, z0], [x1, y1, h], [xm, y1, h + r], [x0, y1, h]], a));
    faces.push(face('roof', [[x0, y0, h], [xm, y0, h + r], [xm, y1, h + r], [x0, y1, h]], a));
    faces.push(face('top', [[xm, y0, h + r], [x1, y0, h], [x1, y1, h], [xm, y1, h + r]], a));
  } else if (roof === 'gable') {
    const ym = (y0 + y1) / 2;
    faces.push(face('left', [[x0, y1, z0], [x1, y1, z0], [x1, y1, h], [x0, y1, h]], a));
    faces.push(face('right', [[x1, y0, z0], [x1, y1, z0], [x1, y1, h], [x1, ym, h + r], [x1, y0, h]], a));
    faces.push(face('roof', [[x0, y0, h], [x1, y0, h], [x1, ym, h + r], [x0, ym, h + r]], a));
    faces.push(face('top', [[x0, ym, h + r], [x1, ym, h + r], [x1, y1, h], [x0, y1, h]], a));
  } else if (roof === 'mono') {
    // High side at the back (x0), falling towards x1.
    faces.push(face('right', [[x1, y0, z0], [x1, y1, z0], [x1, y1, h], [x1, y0, h]], a));
    faces.push(face('left', [[x0, y1, z0], [x1, y1, z0], [x1, y1, h], [x0, y1, h + r]], a));
    faces.push(face('top', [[x0, y0, h + r], [x1, y0, h], [x1, y1, h], [x0, y1, h + r]], a));
  } else {
    faces.push(face('right', [[x1, y0, z0], [x1, y1, z0], [x1, y1, h], [x1, y0, h]], a));
    faces.push(face('left', [[x0, y1, z0], [x1, y1, z0], [x1, y1, h], [x0, y1, h]], a));
    faces.push(face('top', [[x0, y0, h], [x1, y0, h], [x1, y1, h], [x0, y1, h]], a));
  }

  // Glazing: an inset opening on the visible wall faces.
  const gz0 = z0 + Math.min(0.4, v.h * 0.12);
  const gz1 = z0 + Math.max(v.h * 0.78, v.h - 0.6);
  for (const g of v.glaze ?? []) {
    if (g === 'x') {
      const ya = y0 + v.d * 0.18;
      const yb = y1 - v.d * 0.18;
      faces.push(face('glass', [[x1, ya, gz0], [x1, yb, gz0], [x1, yb, gz1], [x1, ya, gz1]], a));
    } else {
      const xa = x0 + v.w * 0.18;
      const xb = x1 - v.w * 0.18;
      faces.push(face('glass', [[xa, y1, gz0], [xb, y1, gz0], [xb, y1, gz1], [xa, y1, gz1]], a));
    }
  }
  return faces;
}

/** Paint order: lower volumes first, then back to front. */
export function sortVolumes(volumes: readonly Volume[]): Volume[] {
  return [...volumes].sort((p, q) => {
    const dz = (p.z ?? 0) - (q.z ?? 0);
    if (dz !== 0) return dz;
    return p.x + p.y + (p.w + p.d) / 2 - (q.x + q.y + (q.w + q.d) / 2);
  });
}

export type Bounds = {minX: number; minY: number; maxX: number; maxY: number};

export function boundsOf(faces: readonly Face[]): Bounds {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const f of faces) {
    for (const [px, py] of f.points) {
      minX = Math.min(minX, px);
      minY = Math.min(minY, py);
      maxX = Math.max(maxX, px);
      maxY = Math.max(maxY, py);
    }
  }
  if (!Number.isFinite(minX)) return {minX: 0, minY: 0, maxX: 0, maxY: 0};
  return {minX, minY, maxX, maxY};
}

/** All faces of a massing model, ready to paint, plus a padded viewBox string. */
export function axonometric(volumes: readonly Volume[], pad = 1.5): {faces: Face[]; viewBox: string} {
  const faces = sortVolumes(volumes).flatMap(volumeFaces);
  const b = boundsOf(faces);
  const vb = [b.minX - pad, b.minY - pad, b.maxX - b.minX + pad * 2, b.maxY - b.minY + pad * 2].map(round);
  return {faces, viewBox: vb.join(' ')};
}

export function pointsAttr(points: readonly [number, number][]): string {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}
