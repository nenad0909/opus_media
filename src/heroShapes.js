/**
 * Wireframe geometry for the hero canvas.
 *
 * Every page gets its own silhouette, but they are all built and returned the
 * same way — a vertex list normalised so the furthest point sits at radius 1,
 * plus a de-duplicated edge list. The canvas sizes, tilts, and lights them all
 * identically, so the shapes read as a family rather than as separate effects.
 *
 * The home page uses `icosphere`; it is intentionally left exactly as it was.
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;

const normalize = ([x, y, z]) => {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
};

const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

/** Scale a vertex list so its outermost point lands on the unit sphere. */
function fit(vertices) {
  let max = 0;
  vertices.forEach(([x, y, z]) => {
    max = Math.max(max, Math.hypot(x, y, z));
  });
  if (!max) return vertices;
  return vertices.map(([x, y, z]) => [x / max, y / max, z / max]);
}

/** Bake a fixed orientation into a shape so its axis of symmetry is never the
 *  same as the canvas spin axis — otherwise the rotation reads as no motion. */
function orient(vertices, [rx, ry, rz]) {
  const [cx, sx] = [Math.cos(rx), Math.sin(rx)];
  const [cy, sy] = [Math.cos(ry), Math.sin(ry)];
  const [cz, sz] = [Math.cos(rz), Math.sin(rz)];
  return vertices.map(([x, y, z]) => {
    let [ax, ay, az] = [x, y * cx - z * sx, y * sx + z * cx];
    [ax, az] = [ax * cy + az * sy, -ax * sy + az * cy];
    [ax, ay] = [ax * cz - ay * sz, ax * sz + ay * cz];
    return [ax, ay, az];
  });
}

/** Collect the unique undirected edges of a triangle list. */
function edgesFromFaces(faces) {
  const seen = new Set();
  const edges = [];
  faces.forEach(([a, b, c]) => {
    [[a, b], [b, c], [c, a]].forEach(([p, q]) => {
      const key = p < q ? `${p}:${q}` : `${q}:${p}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push([p, q]);
    });
  });
  return edges;
}

/** Connect every pair of vertices sitting at the solid's shortest span — the
 *  quickest way to get a Platonic solid's true edges without listing them. */
function edgesByShortestSpan(vertices, tolerance = 1.08) {
  let shortest = Infinity;
  for (let i = 0; i < vertices.length; i += 1) {
    for (let j = i + 1; j < vertices.length; j += 1) {
      const [ax, ay, az] = vertices[i];
      const [bx, by, bz] = vertices[j];
      shortest = Math.min(shortest, Math.hypot(ax - bx, ay - by, az - bz));
    }
  }
  const limit = shortest * tolerance;
  const edges = [];
  for (let i = 0; i < vertices.length; i += 1) {
    for (let j = i + 1; j < vertices.length; j += 1) {
      const [ax, ay, az] = vertices[i];
      const [bx, by, bz] = vertices[j];
      if (Math.hypot(ax - bx, ay - by, az - bz) <= limit) edges.push([i, j]);
    }
  }
  return edges;
}

/**
 * Split every triangle into four. `project` decides the character of the
 * result: normalise and the solid inflates into a geodesic sphere, leave it
 * alone and the flat faces stay flat while the wireframe gains density.
 */
function subdivide(baseVertices, baseFaces, passes, project) {
  const vertices = baseVertices.slice();
  let faces = baseFaces;

  for (let pass = 0; pass < passes; pass += 1) {
    const cache = new Map();
    const midpoint = (a, b) => {
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      const cached = cache.get(key);
      if (cached !== undefined) return cached;
      const [ax, ay, az] = vertices[a];
      const [bx, by, bz] = vertices[b];
      const mid = [(ax + bx) / 2, (ay + by) / 2, (az + bz) / 2];
      vertices.push(project ? project(mid) : mid);
      const index = vertices.length - 1;
      cache.set(key, index);
      return index;
    };
    const next = [];
    faces.forEach(([a, b, c]) => {
      const ab = midpoint(a, b);
      const bc = midpoint(b, c);
      const ca = midpoint(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    });
    faces = next;
  }

  return { vertices, edges: edgesFromFaces(faces) };
}

/**
 * Build a wireframe from a parametric surface sampled on a `uCount × vCount`
 * grid. Powers the torus, the knot's tube, and every lathed profile.
 */
function parametricGrid({ uCount, vCount, uClosed = false, vClosed = false, point }) {
  const vertices = [];
  for (let i = 0; i < uCount; i += 1) {
    for (let j = 0; j < vCount; j += 1) vertices.push(point(i, j));
  }
  const index = (i, j) => (i % uCount) * vCount + (j % vCount);
  const edges = [];
  for (let i = 0; i < uCount; i += 1) {
    for (let j = 0; j < vCount; j += 1) {
      if (i + 1 < uCount || uClosed) edges.push([index(i, j), index(i + 1, j)]);
      if (j + 1 < vCount || vClosed) edges.push([index(i, j), index(i, j + 1)]);
    }
  }
  return { vertices, edges };
}

// ---------------------------------------------------------------
// Base solids
// ---------------------------------------------------------------

const icosahedron = () => ({
  vertices: [
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
  ].map(normalize),
  faces: [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ],
});

const octahedron = () => ({
  vertices: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
  faces: [
    [0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
    [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5],
  ],
});

/** Square-based pyramid. A tetrahedron flattens into a parallelogram at some
 *  rotations; a square base keeps the spire reading as a spire all the way
 *  round. */
const pyramid = () => ({
  vertices: [
    [0, -1.15, 0],
    [-0.85, 0.55, -0.85], [0.85, 0.55, -0.85],
    [0.85, 0.55, 0.85], [-0.85, 0.55, 0.85],
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
    [1, 3, 2], [1, 4, 3],
  ],
});

// ---------------------------------------------------------------
// Shape builders — one per silhouette
// ---------------------------------------------------------------

/** Geodesic sphere. The home page shape; do not change its output. */
function buildIcosphere() {
  const { vertices, faces } = icosahedron();
  return subdivide(vertices, faces, 1, normalize);
}

/** Faceted solid: keeps the flat planes but densifies the wireframe. */
function buildFaceted(base, passes) {
  const { vertices, faces } = base();
  return subdivide(vertices, faces, passes, null);
}

/** Standing ring, built in the XY plane so the spin turns it edge-on and back. */
function buildTorus(majorRadius = 0.74, minorRadius = 0.26, uCount = 20, vCount = 8) {
  return parametricGrid({
    uCount,
    vCount,
    uClosed: true,
    vClosed: true,
    point: (i, j) => {
      const u = (i / uCount) * TAU;
      const v = (j / vCount) * TAU;
      const ring = majorRadius + minorRadius * Math.cos(v);
      return [ring * Math.cos(u), ring * Math.sin(u), minorRadius * Math.sin(v)];
    },
  });
}

/** A (p,q) torus knot swept with a thin tube. */
function buildTorusKnot(p = 2, q = 3, uCount = 64, vCount = 4, tubeRadius = 0.17) {
  const curve = (t) => {
    const r = 2 + Math.cos(q * t);
    return [r * Math.cos(p * t), r * Math.sin(p * t), Math.sin(q * t)];
  };
  const step = TAU / uCount;
  // The tube frame comes from a fixed reference axis rather than parallel
  // transport — the trefoil's tangent never lines up with Z, so it stays stable.
  const frames = [];
  for (let i = 0; i < uCount; i += 1) {
    const t = i * step;
    const [cx, cy, cz] = curve(t);
    const [nx, ny, nz] = curve(t + 0.01);
    const tangent = normalize([nx - cx, ny - cy, nz - cz]);
    const normal = normalize(cross(tangent, [0, 0, 1]));
    frames.push({ center: [cx, cy, cz], normal, binormal: cross(tangent, normal) });
  }
  const grid = parametricGrid({
    uCount,
    vCount,
    uClosed: true,
    vClosed: true,
    point: (i, j) => {
      const { center, normal, binormal } = frames[i];
      const v = (j / vCount) * TAU;
      const [cosV, sinV] = [Math.cos(v), Math.sin(v)];
      return [0, 1, 2].map(
        (axis) => center[axis] + tubeRadius * 3 * (normal[axis] * cosV + binormal[axis] * sinV)
      );
    },
  });
  return grid;
}

/** Lathe a radius profile around the Y axis into stacked rings plus struts. */
function buildLathe(profile, rings = 11, segments = 16) {
  return parametricGrid({
    uCount: rings,
    vCount: segments,
    vClosed: true,
    point: (i, j) => {
      const t = rings === 1 ? 0 : (i / (rings - 1)) * 2 - 1;
      const angle = (j / segments) * TAU;
      const radius = profile(t);
      return [radius * Math.cos(angle), t, radius * Math.sin(angle)];
    },
  });
}

/** Two intertwined strands joined by rungs. */
function buildDoubleHelix(turns = 2, steps = 56, radius = 0.56, rungEvery = 2) {
  const vertices = [];
  const edges = [];
  const height = 2;
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const angle = t * turns * TAU;
    const y = t * height - height / 2;
    vertices.push([radius * Math.cos(angle), y, radius * Math.sin(angle)]);
    vertices.push([radius * Math.cos(angle + Math.PI), y, radius * Math.sin(angle + Math.PI)]);
    const a = i * 2;
    if (i > 0) edges.push([a - 2, a], [a - 1, a + 1]);
    if (i % rungEvery === 0) edges.push([a, a + 1]);
  }
  return { vertices, edges };
}

/** Hollow cube frame: lattice points on the surface, joined along shared faces. */
function buildCubeLattice(divisions = 4) {
  const key = (x, y, z) => `${x}:${y}:${z}`;
  const onSurface = (x, y, z) =>
    [x, y, z].some((v) => v === 0 || v === divisions);
  const indexOf = new Map();
  const cells = [];
  for (let x = 0; x <= divisions; x += 1) {
    for (let y = 0; y <= divisions; y += 1) {
      for (let z = 0; z <= divisions; z += 1) {
        if (!onSurface(x, y, z)) continue;
        indexOf.set(key(x, y, z), cells.length);
        cells.push([x, y, z]);
      }
    }
  }
  const vertices = cells.map((cell) =>
    cell.map((v) => (v / divisions) * 2 - 1)
  );
  const edges = [];
  cells.forEach((cell, i) => {
    [0, 1, 2].forEach((axis) => {
      const next = cell.slice();
      next[axis] += 1;
      const j = indexOf.get(key(...next));
      if (j === undefined) return;
      // Both points are on the shell, but they are only joined by a real edge
      // when they also share a face of the cube.
      const sharesFace = [0, 1, 2].some(
        (other) => other !== axis && (cell[other] === 0 || cell[other] === divisions)
      );
      if (sharesFace) edges.push([i, j]);
    });
  });
  return { vertices, edges };
}

function buildDodecahedron() {
  const inv = 1 / PHI;
  const vertices = [];
  [-1, 1].forEach((sx) => [-1, 1].forEach((sy) => [-1, 1].forEach((sz) => {
    vertices.push([sx, sy, sz]);
  })));
  [-1, 1].forEach((a) => [-1, 1].forEach((b) => {
    vertices.push([0, a * inv, b * PHI]);
    vertices.push([a * inv, b * PHI, 0]);
    vertices.push([a * PHI, 0, b * inv]);
  }));
  return { vertices, edges: edgesByShortestSpan(vertices) };
}

// ---------------------------------------------------------------
// Registry
// ---------------------------------------------------------------

/**
 * `tilt` and `scale` let a silhouette sit well in the hero without changing the
 * shared drawing code; `orientation` is baked in at build time.
 */
const SHAPES = {
  // Home — unchanged.
  icosphere: { build: buildIcosphere, tilt: -0.16, scale: 1 },

  torus: { build: () => buildTorus(), tilt: -0.62, scale: 1.04, orientation: [0, 0, 0.22] },

  cubeLattice: { build: () => buildCubeLattice(4), tilt: -0.42, scale: 0.94, orientation: [0.3, 0, 0.32] },

  crystal: { build: () => buildFaceted(octahedron, 2), tilt: -0.24, scale: 1.02, orientation: [0, 0, 0.18] },

  knot: { build: () => buildTorusKnot(), tilt: -0.5, scale: 1.02, orientation: [0.24, 0, 0] },

  helix: { build: () => buildDoubleHelix(), tilt: -0.2, scale: 1, orientation: [0, 0, 0.26] },

  cylinder: { build: () => buildLathe(() => 0.62, 11, 16), tilt: -0.34, scale: 1, orientation: [0.34, 0, 0.4] },

  spire: { build: () => buildFaceted(pyramid, 2), tilt: -0.2, scale: 1.06, orientation: [0.16, 0, 0] },

  dodecahedron: { build: buildDodecahedron, tilt: -0.28, scale: 1, orientation: [0.2, 0, 0.1] },

  hourglass: { build: () => buildLathe((t) => 0.18 + Math.abs(t) * 0.52, 11, 14), tilt: -0.3, scale: 1, orientation: [0.28, 0, 0.36] },
};

export const HERO_SHAPE_NAMES = Object.keys(SHAPES);

/**
 * Returns `{ vertices, edges, tilt, scale }` in the canvas's expected space.
 * Unknown names fall back to the home page sphere.
 */
export function buildHeroShape(name) {
  const spec = SHAPES[name] || SHAPES.icosphere;
  const { vertices, edges } = spec.build();
  // The home sphere is already unit-length and must not be nudged by `fit`.
  const placed = spec.orientation ? orient(vertices, spec.orientation) : vertices;
  return {
    vertices: name === "icosphere" || !SHAPES[name] ? placed : fit(placed),
    edges,
    tilt: spec.tilt ?? -0.16,
    scale: spec.scale ?? 1,
  };
}
