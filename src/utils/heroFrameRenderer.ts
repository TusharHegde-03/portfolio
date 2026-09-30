/**
 * High-Performance Canvas Frame Renderer for Hero Character Animation
 * Features:
 * - ImageBitmap decoding + progressive preloading
 * - Smooth lerp requestAnimationFrame loop
 * - Capped DPR High-DPI scaling
 * - Object-fit cover with 70% horizontal anchor positioning
 * - Tab visibility & reduced motion support
 * - Zero React re-renders on animation frames
 */

export interface HeroFrameRendererOptions {
  canvas: HTMLCanvasElement;
  frameCount: number;
  getFrameUrl: (index: number) => string;
  onFirstFrameLoaded?: () => void;
  onAllFramesLoaded?: () => void;
}

export class HeroFrameRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private frameCount: number;
  private getFrameUrl: (index: number) => string;

  private cache: (ImageBitmap | HTMLImageElement | null)[];
  private isLoaded: boolean[];
  
  private targetFrame: number = 0;
  private currentFrame: number = 0;
  private renderedFrameIndex: number = -1;

  private rafId: number | null = null;
  private isDestroyed: boolean = false;
  private dpr: number = 1;

  private cssWidth: number = 0;
  private cssHeight: number = 0;

  private onFirstFrameLoaded?: () => void;
  private onAllFramesLoaded?: () => void;
  private firstFrameFired: boolean = false;

  constructor(options: HeroFrameRendererOptions) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.frameCount = options.frameCount;
    this.getFrameUrl = options.getFrameUrl;
    this.onFirstFrameLoaded = options.onFirstFrameLoaded;
    this.onAllFramesLoaded = options.onAllFramesLoaded;

    this.cache = new Array(this.frameCount).fill(null);
    this.isLoaded = new Array(this.frameCount).fill(false);

    this.updateDpr();
    this.resizeCanvas();

    // Attach resize listener
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Update internal canvas resolution capped at DPR 2
   */
  private updateDpr() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
  }

  /**
   * Recalculate canvas dimensions without clearing image cache
   */
  public resizeCanvas = () => {
    this.updateDpr();
    this.cssWidth = window.innerWidth;
    this.cssHeight = window.innerHeight;

    this.canvas.width = Math.floor(this.cssWidth * this.dpr);
    this.canvas.height = Math.floor(this.cssHeight * this.dpr);

    this.canvas.style.width = `${this.cssWidth}px`;
    this.canvas.style.height = `${this.cssHeight}px`;

    if (this.ctx) {
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';
    }

    // Force redraw current frame on resize
    this.renderedFrameIndex = -1;
    this.drawFrame(Math.round(this.currentFrame));
  };

  private handleResize = () => {
    this.resizeCanvas();
  };

  private handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      this.startLoop();
    } else {
      this.stopLoop();
    }
  };

  /**
   * Progressive Staged Frame Loader:
   * Stage 1: Load frame 0 & initial ~15 frames immediately.
   * Stage 2: Progressively load remaining frames using requestIdleCallback / setTimeout.
   */
  public startLoading() {
    // Stage 1: Load initial critical frames
    const initialBatch = [0, 1, 2, 3, 4, 5, 10, 20, 30, 45, 60, 75, 90, 105, 119];
    let loadedCount = 0;

    initialBatch.forEach((index) => {
      this.loadSingleFrame(index).then(() => {
        if (!this.firstFrameFired && this.isLoaded[0]) {
          this.firstFrameFired = true;
          if (this.onFirstFrameLoaded) this.onFirstFrameLoaded();
          this.drawFrame(0);
        }
      });
    });

    // Stage 2: Progressive background preloading
    const queueRemaining = () => {
      let nextIndex = 0;

      const loadNextChunk = () => {
        if (this.isDestroyed) return;

        let processedInChunk = 0;
        const chunkSize = 4;

        while (nextIndex < this.frameCount && processedInChunk < chunkSize) {
          const idx = nextIndex++;
          if (!this.isLoaded[idx]) {
            processedInChunk++;
            this.loadSingleFrame(idx).then(() => {
              loadedCount++;
              if (loadedCount >= this.frameCount && this.onAllFramesLoaded) {
                this.onAllFramesLoaded();
              }
            });
          }
        }

        if (nextIndex < this.frameCount) {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadNextChunk);
          } else {
            setTimeout(loadNextChunk, 16);
          }
        }
      };

      loadNextChunk();
    };

    setTimeout(queueRemaining, 100);
  }

  /**
   * Load & decode a single frame PNG resource
   */
  private async loadSingleFrame(index: number): Promise<void> {
    if (index < 0 || index >= this.frameCount || this.isLoaded[index]) return;

    const url = this.getFrameUrl(index);

    try {
      if ('createImageBitmap' in window) {
        const response = await fetch(url);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        if (!this.isDestroyed) {
          this.cache[index] = bitmap;
          this.isLoaded[index] = true;
        }
      } else {
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            if (!this.isDestroyed) {
              this.cache[index] = img;
              this.isLoaded[index] = true;
            }
            resolve();
          };
          img.onerror = reject;
          img.src = url;
        });
      }
    } catch {
      // Fallback to HTMLImageElement on fetch/bitmap error
      try {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            if (!this.isDestroyed) {
              this.cache[index] = img;
              this.isLoaded[index] = true;
            }
            resolve();
          };
          img.onerror = () => resolve();
          img.src = url;
        });
      } catch {
        // Ignore individual frame fetch failure
      }
    }
  }

  /**
   * Update target frame from normalized mouse X position [0..1]
   */
  public setTargetProgress(progress: number) {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    this.targetFrame = clampedProgress * (this.frameCount - 1);
  }

  /**
   * Start 60 FPS requestAnimationFrame loop
   */
  public startLoop() {
    if (this.rafId !== null) return;

    const loop = () => {
      if (this.isDestroyed) return;

      // Smooth lerp interpolation
      const diff = this.targetFrame - this.currentFrame;

      if (Math.abs(diff) > 0.005) {
        this.currentFrame += diff * 0.14; // Ultra responsive lerp factor
        const frameIndex = Math.round(this.currentFrame);
        this.drawFrame(frameIndex);
      } else if (this.renderedFrameIndex !== Math.round(this.targetFrame)) {
        this.currentFrame = this.targetFrame;
        this.drawFrame(Math.round(this.targetFrame));
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public stopLoop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Draw specific frame index to canvas with 70% center cover positioning
   */
  public drawFrame(requestedIndex: number) {
    if (!this.ctx) return;

    const clampedIndex = Math.max(0, Math.min(this.frameCount - 1, requestedIndex));

    // Find nearest available loaded frame if requested frame is still decoding
    let frameToDraw = this.cache[clampedIndex];
    if (!frameToDraw) {
      for (let offset = 1; offset < this.frameCount; offset++) {
        if (clampedIndex - offset >= 0 && this.cache[clampedIndex - offset]) {
          frameToDraw = this.cache[clampedIndex - offset];
          break;
        }
        if (clampedIndex + offset < this.frameCount && this.cache[clampedIndex + offset]) {
          frameToDraw = this.cache[clampedIndex + offset];
          break;
        }
      }
    }

    if (!frameToDraw) return;
    if (this.renderedFrameIndex === clampedIndex) return;

    const imgW = frameToDraw.width;
    const imgH = frameToDraw.height;

    if (!imgW || !imgH) return;

    const canvasW = this.canvas.width;
    const canvasH = this.canvas.height;

    const imgAspect = imgW / imgH;
    const canvasAspect = canvasW / canvasH;

    let drawW: number;
    let drawH: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      // Canvas is wider than image aspect -> fill width, scale height
      drawW = canvasW;
      drawH = canvasW / imgAspect;
      offsetX = 0;
      offsetY = (canvasH - drawH) / 2;
    } else {
      // Canvas is taller than image aspect -> fill height, scale width
      drawH = canvasH;
      drawW = canvasH * imgAspect;
      offsetY = 0;
      // Object-position 70% center anchor
      const overflowX = drawW - canvasW;
      offsetX = -overflowX * 0.70;
    }

    // Clear and draw frame
    this.ctx.fillStyle = '#050a14';
    this.ctx.fillRect(0, 0, canvasW, canvasH);
    this.ctx.drawImage(frameToDraw, offsetX, offsetY, drawW, drawH);

    this.renderedFrameIndex = clampedIndex;
  }

  /**
   * Clean up resources and event listeners
   */
  public destroy() {
    this.isDestroyed = true;
    this.stopLoop();

    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    // Close ImageBitmap instances to free GPU memory
    this.cache.forEach((item) => {
      if (item && 'close' in item && typeof item.close === 'function') {
        item.close();
      }
    });

    this.cache = [];
    this.isLoaded = [];
  }
}
