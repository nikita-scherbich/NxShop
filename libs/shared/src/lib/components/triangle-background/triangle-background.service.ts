import { Injectable } from '@angular/core';
import { TriangleBackgroundConfig } from '../../models/triangle-background-config.model';
import { Triangle, Vec2 } from './triangle-background.types';

const BASE_DENSITY = 1600 / (1920 * 1080); // triangles per pixel at coefficient=1

@Injectable()
export class TriangleBackgroundService {
  private triangles: Triangle[] = [];
  private config!: TriangleBackgroundConfig;
  private cursor: Vec2 = { x: -9999, y: -9999 };
  private rafId = 0;
  private lastTime = 0;
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private globalTime = 0;

  // Batching: pre-sorted color groups [ [indices...], [indices...] ]
  private colorBatches: number[][] = [];
  private needsRebatch = true;

  init(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: TriangleBackgroundConfig,
  ): void {
    this.ctx = ctx;
    this.config = config;
    this.width = width;
    this.height = height;
    this.spawnAll();
  }

  updateConfig(config: TriangleBackgroundConfig): void {
    this.config = config;
  }

  setCursor(x: number, y: number): void {
    this.cursor.x = x;
    this.cursor.y = y;
  }

  clearCursor(): void {
    this.cursor.x = -9999;
    this.cursor.y = -9999;
  }

  start(): void {
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop(): void {
    cancelAnimationFrame(this.rafId);
  }

  resize(width: number, height: number): void {
    const scaleX = width / this.width;
    const scaleY = height / this.height;
    this.width = width;
    this.height = height;

    for (const t of this.triangles) {
      t.origin.x *= scaleX;
      t.origin.y *= scaleY;
      t.pos.x *= scaleX;
      t.pos.y *= scaleY;
    }

    // Reconcile count after resize
    this.reconcileCount();
  }

  // ─── Spawn Helpers ────────────────────────────────────────────────

  private computeTargetCount(): number {
    return Math.round(
      BASE_DENSITY * this.width * this.height * this.config.densityCoefficient,
    );
  }

  private spawnAll(): void {
    const count = this.computeTargetCount();
    this.triangles = Array.from({ length: count }, () => this.createTriangle());
    this.needsRebatch = true;
  }

  private reconcileCount(): void {
    const target = this.computeTargetCount();
    const current = this.triangles.length;

    if (current < target) {
      for (let i = current; i < target; i++) {
        this.triangles.push(this.createTriangle());
      }
      this.needsRebatch = true;
    } else if (current > target) {
      // Mark excess as dying rather than hard-removing
      let excess = current - target;
      for (let i = current - 1; i >= 0 && excess > 0; i--) {
        if (!this.triangles[i].dying) {
          this.triangles[i].dying = true;
          this.triangles[i].opacityVel = -1;
          excess--;
        }
      }
    }
  }

  private createTriangle(x?: number, y?: number): Triangle {
    const { sizeRange, colors, lifespanRange, waveSpeed } = this.config;
    const px = x ?? Math.random() * this.width;
    const py = y ?? Math.random() * this.height;
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

    return {
      origin: { x: px, y: py },
      pos: { x: px, y: py },
      vel: { x: 0, y: 0 },
      size,
      rotation: Math.random() * Math.PI * 2,
      rotationVel: 0,
      colorIndex: Math.floor(Math.random() * colors.length),
      opacity: 0, // fade in from zero
      opacityVel: 1, // start fading in
      age: 0,
      lifespan:
        lifespanRange[0] +
        Math.random() * (lifespanRange[1] - lifespanRange[0]),
      dying: false,
      wavePhase: Math.random() * Math.PI * 2,
      waveFreq: waveSpeed * (0.8 + Math.random() * 0.4), // slight freq variance
    };
  }

  // ─── Main Loop ────────────────────────────────────────────────────

  private loop = (timestamp: number): void => {
    const rawDt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;
    const dt = Math.min(rawDt, 0.05);
    this.globalTime += dt;

    this.update(dt);
    if (this.needsRebatch) this.rebuildBatches();
    this.render();

    this.rafId = requestAnimationFrame(this.loop);
  };

  // ─── Physics Update ───────────────────────────────────────────────

  private update(dt: number): void {
    const {
      attractionRadius,
      attractionStrength,
      springK,
      damping,
      waveAmplitude,
      fadeSpeed,
    } = this.config;
    const cx = this.cursor.x;
    const cy = this.cursor.y;
    const toRemove: number[] = [];

    for (let i = 0; i < this.triangles.length; i++) {
      const t = this.triangles[i];

      // ── Lifecycle ──
      t.age += dt;
      t.opacity = Math.min(
        1,
        Math.max(0, t.opacity + t.opacityVel * fadeSpeed * dt),
      );

      if (!t.dying && t.age >= t.lifespan && t.opacity >= 1) {
        t.dying = true;
        t.opacityVel = -1;
      }

      if (t.dying && t.opacity <= 0) {
        toRemove.push(i);
        continue;
      }

      if (t.opacity < 1 && !t.dying) {
        t.opacityVel = 1; // ensure fading in
      }

      // ── Cursor attraction ──
      const dx = cx - t.pos.x;
      const dy = cy - t.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const falloff = 1 / (1 + (dist / attractionRadius) ** 2);
      const attract = attractionStrength * falloff;

      // ── Spring to origin ──
      const ox = t.origin.x - t.pos.x;
      const oy = t.origin.y - t.pos.y;

      // ── Ambient wave (perpendicular-ish drift) ──
      const wave =
        Math.sin(this.globalTime * t.waveFreq * Math.PI * 2 + t.wavePhase) *
        waveAmplitude;
      const waveX = Math.cos(t.rotation) * wave * 0.5;
      const waveY = Math.sin(t.rotation) * wave * 0.5;

      // ── Integrate ──
      t.vel.x += (dx * attract + ox * springK + waveX * 0.05) * dt * 60;
      t.vel.y += (dy * attract + oy * springK + waveY * 0.05) * dt * 60;
      t.vel.x *= damping;
      t.vel.y *= damping;
      t.pos.x += t.vel.x;
      t.pos.y += t.vel.y;

      const speed = Math.sqrt(t.vel.x ** 2 + t.vel.y ** 2);
      t.rotation += speed * 0.002;
    }

    // Remove dead triangles back-to-front and respawn
    for (let i = toRemove.length - 1; i >= 0; i--) {
      const idx = toRemove[i];
      const dead = this.triangles[idx];
      // Respawn at same origin
      this.triangles[idx] = this.createTriangle(dead.origin.x, dead.origin.y);
      this.needsRebatch = true;
    }
  }

  // ─── Render ───────────────────────────────────────────────────────

  private rebuildBatches(): void {
    const count = this.config.colors.length;
    this.colorBatches = Array.from({ length: count }, () => []);
    for (let i = 0; i < this.triangles.length; i++) {
      this.colorBatches[this.triangles[i].colorIndex].push(i);
    }
    this.needsRebatch = false;
  }

  private render(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (let b = 0; b < this.colorBatches.length; b++) {
      const batch = this.colorBatches[b];
      if (!batch.length) continue;
      const baseColor = this.config.colors[b];

      for (let i = 0; i < batch.length; i++) {
        const t = this.triangles[batch[i]];
        if (t.opacity <= 0) continue;

        ctx.globalAlpha = t.opacity;
        ctx.fillStyle = baseColor; // same per batch — minimal state change
        ctx.beginPath();
        this.drawEquilateral(ctx, t.pos.x, t.pos.y, t.size, t.rotation);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }

  private drawEquilateral(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    angle: number,
  ): void {
    // Equilateral triangle: vertices at 120° intervals
    const r = size; // circumradius
    const a0 = angle;
    const a1 = angle + (Math.PI * 2) / 3;
    const a2 = angle + (Math.PI * 4) / 3;

    ctx.moveTo(x + r * Math.cos(a0), y + r * Math.sin(a0));
    ctx.lineTo(x + r * Math.cos(a1), y + r * Math.sin(a1));
    ctx.lineTo(x + r * Math.cos(a2), y + r * Math.sin(a2));
    ctx.closePath();
  }
}
