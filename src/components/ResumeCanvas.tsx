import React, { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; size: number; phase: number };
type Pulse = { x: number; y: number; radius: number; opacity: number };

export const ResumeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;
    const particles: Particle[] = Array.from({ length: 20 }, (_, index) => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0008, vy: (Math.random() - .5) * .0008,
      size: 1 + Math.random() * 1.5, phase: index * .61,
    }));
    const pulses: Pulse[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = 'rgba(0, 240, 255, .14)';
      context.lineWidth = 1;
      context.strokeRect(.5, .5, width - 1, height - 1);
      context.setLineDash([5, 9]);
      context.beginPath(); context.moveTo(18, height / 2); context.lineTo(width - 18, height / 2); context.stroke();
      context.setLineDash([]);

      particles.forEach((particle, index) => {
        particle.x += particle.vx; particle.y += particle.vy;
        if (particle.x < .04 || particle.x > .96) particle.vx *= -1;
        if (particle.y < .08 || particle.y > .92) particle.vy *= -1;
        const x = particle.x * width; const y = particle.y * height;
        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]; const ox = other.x * width; const oy = other.y * height;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 72) { context.beginPath(); context.moveTo(x, y); context.lineTo(ox, oy); context.strokeStyle = `rgba(0, 240, 255, ${.14 * (1 - distance / 72)})`; context.stroke(); }
        }
        const glow = .55 + Math.sin(frame * .035 + particle.phase) * .3;
        context.beginPath(); context.arc(x, y, particle.size, 0, Math.PI * 2); context.fillStyle = `rgba(0, 240, 255, ${glow})`; context.shadowBlur = 10; context.shadowColor = '#00f0ff'; context.fill(); context.shadowBlur = 0;
      });

      for (let index = pulses.length - 1; index >= 0; index -= 1) {
        const pulse = pulses[index]; pulse.radius += 1.8; pulse.opacity -= .012;
        context.beginPath(); context.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2); context.strokeStyle = `rgba(0, 240, 255, ${pulse.opacity})`; context.lineWidth = 1.5; context.stroke();
        if (pulse.opacity <= 0) pulses.splice(index, 1);
      }
      context.fillStyle = 'rgba(191, 247, 255, .85)'; context.font = '600 9px ui-monospace, monospace'; context.letterSpacing = '2px'; context.fillText('NEURAL SIGNAL // CLICK TO PULSE', 14, 20);
      animationId = requestAnimationFrame(draw);
    };

    const handlePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pulses.push({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, radius: 2, opacity: 1 });
    };
    resize(); draw();
    window.addEventListener('resize', resize); canvas.addEventListener('pointerdown', handlePointer);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); canvas.removeEventListener('pointerdown', handlePointer); };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full cursor-crosshair" aria-label="Interactive neural signal canvas: click to create a pulse" />;
};
