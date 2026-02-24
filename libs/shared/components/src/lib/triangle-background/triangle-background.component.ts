import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { TriangleBackgroundService } from './triangle-background.service';
import { TriangleBackgroundConfig } from './triangle-background.types';

const DEFAULT_BG_CONFIG: TriangleBackgroundConfig = {
  densityCoefficient: 1.0,
  sizeRange: [1, 4],
  colors: ['#050067', '#5a00f5', '#3300729c'],
  attractionRadius: 100, // px
  attractionStrength: 0.6, // how strongly triangles are pulled towards cursor
  springK: 0.3, // spring stiffness for cursor attraction
  damping: 0.1, // velocity damping, simulates friction
  waveAmplitude: 4, // px — subtle idle drift
  waveSpeed: 0.2, // Hz
  lifespanRange: [1, 4], // seconds
  fadeSpeed: 1, // opacity/sec
};

@Component({
  selector: 'app-triangle-background',
  standalone: true,
  template: `<canvas #canvas class="canvas"></canvas>`,
  styles: [
    `
      :host {
        display: flex;
        position: absolute;
        pointer-events: none;
        overflow: hidden;
        height: 100%;
        width: 100%;

        .canvas {
          display: flex;
          flex: 1;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TriangleBackgroundService],
})
export class TriangleBackgroundComponent implements AfterViewInit {
  private readonly canvasRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  readonly config = input<
    TriangleBackgroundConfig,
    Partial<TriangleBackgroundConfig>
  >(DEFAULT_BG_CONFIG, {
    transform: (userConfig) => ({ ...DEFAULT_BG_CONFIG, ...userConfig }),
  });

  private readonly service = inject(TriangleBackgroundService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  private resizeObserver: ResizeObserver | null = null;

  private initialized = signal(false);

  constructor() {
    effect(() => {
      const cfg = this.config();
      if (this.initialized()) {
        this.service.updateConfig(cfg);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const canvas = this.canvasRef().nativeElement;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });

    if (!ctx) {
      console.error('Failed to get 2D canvas context');
      return;
    }

    this.syncCanvasSize(canvas);

    this.service.init(ctx, canvas.width, canvas.height, this.config());
    this.service.start();

    this.initialized.set(true);

    this.bindMouseEvents(canvas);
    this.bindResizeObserver(canvas);

    this.destroyRef.onDestroy(() => {
      this.service.stop();
      this.resizeObserver?.disconnect();
    });
  }

  private bindMouseEvents(canvas: HTMLCanvasElement): void {
    const onMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.service.setCursor(
        (e.clientX - rect.left) * dpr,
        (e.clientY - rect.top) * dpr,
      );
    };
    const onLeave = (): void => this.service.clearCursor();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    });
  }

  private bindResizeObserver(canvas: HTMLCanvasElement): void {
    const parentElement = canvas.parentElement;
    if (!parentElement) {
      console.error('Canvas parent element not found');
      return;
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === parentElement) {
          const oldW = canvas.width;
          const oldH = canvas.height;
          this.syncCanvasSize(canvas);
          if (canvas.width !== oldW || canvas.height !== oldH) {
            this.service.resize(canvas.width, canvas.height);
          }
        }
      }
    });
    this.resizeObserver.observe(parentElement);
  }

  private syncCanvasSize(canvas: HTMLCanvasElement): void {
    const parentElement = canvas.parentElement;
    if (!parentElement) {
      console.error('Canvas parent element not found');
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = parentElement.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }
}
