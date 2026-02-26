export interface TriangleBackgroundConfig {
  densityCoefficient: number; // 1.0 = ~1600 triangles on 1080p
  sizeRange: [number, number];
  colors: string[];
  attractionRadius: number;
  attractionStrength: number;
  springK: number;
  damping: number;
  waveAmplitude: number; // px, idle drift magnitude
  waveSpeed: number; // Hz, idle oscillation speed
  lifespanRange: [number, number]; // seconds [min, max]
  fadeSpeed: number; // opacity units/sec
}
