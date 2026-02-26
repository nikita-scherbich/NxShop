export interface Vec2 {
  x: number;
  y: number;
}

export interface Triangle {
  origin: Vec2;
  pos: Vec2;
  vel: Vec2;
  size: number;
  rotation: number;
  rotationVel: number;
  colorIndex: number; // index into palette — enables color batching
  // Lifecycle
  opacity: number;
  opacityVel: number; // fading direction: +1 fade in, -1 fade out
  age: number; // seconds since spawn
  lifespan: number; // seconds until starts fading out
  dying: boolean;
  // Ambient wave
  wavePhase: number; // individual phase offset for wave
  waveFreq: number;
}
