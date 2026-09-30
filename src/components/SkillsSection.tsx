import React, { useEffect, useRef } from 'react';

type SkillNode = { id: string; label: string; color: string; size: number; x: number; y: number; vx: number; vy: number; pinned: boolean };
const initialNodes = (): SkillNode[] => [
  { id: 'python', label: 'Python', color: '#00f0ff', size: 1.25, x: .50, y: .42, vx: 0, vy: 0, pinned: false },
  { id: 'fastapi', label: 'FastAPI', color: '#ff007f', size: 1.05, x: .72, y: .25, vx: 0, vy: 0, pinned: false },
  { id: 'sql', label: 'SQL', color: '#39ff14', size: .9, x: .28, y: .32, vx: 0, vy: 0, pinned: false },
  { id: 'mongodb', label: 'MongoDB', color: '#b500ff', size: .9, x: .77, y: .68, vx: 0, vy: 0, pinned: false },
  { id: 'analysis', label: 'Data Analysis', color: '#38bdf8', size: 1, x: .37, y: .72, vx: 0, vy: 0, pinned: false },
  { id: 'ml', label: 'ML / AI', color: '#fbbf24', size: 1, x: .61, y: .78, vx: 0, vy: 0, pinned: false },
  { id: 'dsa', label: 'DSA', color: '#fb7185', size: .9, x: .13, y: .57, vx: 0, vy: 0, pinned: false },
  { id: 'design', label: 'System Design', color: '#a78bfa', size: .9, x: .88, y: .47, vx: 0, vy: 0, pinned: false },
];
const links: [string, string][] = [['python', 'fastapi'], ['fastapi', 'sql'], ['fastapi', 'mongodb'], ['python', 'analysis'], ['analysis', 'ml'], ['python', 'dsa'], ['dsa', 'design'], ['sql', 'analysis'], ['ml', 'mongodb']];

export const SkillsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; const parent = canvas?.parentElement; const context = canvas?.getContext('2d');
    if (!canvas || !parent || !context) return;
    const nodes = initialNodes(); let width = 0; let height = 0; let animationId = 0; let tick = 0; let dragging: SkillNode | null = null;
    const byId = (id: string) => nodes.find((node) => node.id === id)!;
    const position = (node: SkillNode) => ({ x: node.x * width, y: node.y * height });
    const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 2); width = parent.clientWidth; height = parent.clientHeight; canvas.width = width * ratio; canvas.height = height * ratio; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const update = () => nodes.forEach((node) => {
      if (node.pinned || node === dragging) return;
      let ax = 0; let ay = 0;
      nodes.forEach((other) => { if (node === other) return; const dx = node.x - other.x; const dy = node.y - other.y; const distance = Math.max(dx * dx + dy * dy, .01); ax += dx / distance * .00007; ay += dy / distance * .00007; });
      links.forEach(([first, second]) => { if (first !== node.id && second !== node.id) return; const other = byId(first === node.id ? second : first); const dx = other.x - node.x; const dy = other.y - node.y; const distance = Math.hypot(dx, dy) || 1; const force = (distance - .25) * .0012; ax += dx / distance * force; ay += dy / distance * force; });
      node.vx = (node.vx + ax) * .985; node.vy = (node.vy + ay) * .985; node.x = Math.min(.93, Math.max(.07, node.x + node.vx)); node.y = Math.min(.90, Math.max(.10, node.y + node.vy));
    });
    const draw = () => {
      tick++; update(); context.clearRect(0, 0, width, height); context.strokeStyle = 'rgba(56, 189, 248, .08)'; context.lineWidth = 1;
      for (let x = 0; x < width; x += 40) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
      for (let y = 0; y < height; y += 40) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }
      links.forEach(([first, second]) => { const from = position(byId(first)); const to = position(byId(second)); context.beginPath(); context.moveTo(from.x, from.y); context.lineTo(to.x, to.y); context.strokeStyle = 'rgba(71,144,190,.55)'; context.lineWidth = 1.25; context.stroke(); const phase = (tick * .006 + (first.length + second.length) * .11) % 1; const x = from.x + (to.x - from.x) * phase; const y = from.y + (to.y - from.y) * phase; context.beginPath(); context.arc(x, y, 3, 0, Math.PI * 2); context.fillStyle = '#00f0ff'; context.shadowBlur = 14; context.shadowColor = '#00f0ff'; context.fill(); context.shadowBlur = 0; });
      nodes.forEach((node) => { const { x, y } = position(node); const radius = 19 * node.size; context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fillStyle = '#071426'; context.strokeStyle = node.color; context.lineWidth = 2; context.shadowBlur = 20; context.shadowColor = node.color; context.fill(); context.stroke(); context.shadowBlur = 0; context.font = `700 ${Math.round(13 * node.size)}px ui-monospace, monospace`; context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillStyle = '#fff'; context.shadowBlur = 12; context.shadowColor = node.color; context.fillText(node.label, x, y); context.shadowBlur = 0; if (node.pinned) { context.font = '10px ui-monospace, monospace'; context.fillStyle = node.color; context.fillText('PINNED', x, y + radius + 14); } });
      animationId = requestAnimationFrame(draw);
    };
    const pointer = (event: PointerEvent) => { const bounds = canvas.getBoundingClientRect(); return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }; };
    const down = (event: PointerEvent) => { const point = pointer(event); dragging = nodes.find((node) => { const pos = position(node); return Math.hypot(pos.x - point.x, pos.y - point.y) < 36; }) || null; if (dragging) canvas.setPointerCapture(event.pointerId); };
    const move = (event: PointerEvent) => { if (!dragging) return; const point = pointer(event); dragging.x = point.x / width; dragging.y = point.y / height; dragging.vx = 0; dragging.vy = 0; };
    const up = () => { if (dragging) dragging.pinned = true; dragging = null; };
    resize(); draw(); window.addEventListener('resize', resize); canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', up); };
  }, []);
  return <section id="skills" className="relative isolate min-h-[760px] overflow-hidden border-t border-cyan-300/20 bg-[#05050a] py-24"><div className="absolute inset-0 bg-cover bg-center opacity-75" style={{ backgroundImage: "url('/images/skillpage_background.png')" }} /><div className="absolute inset-0 bg-gradient-to-r from-[#05050a]/85 via-[#05050a]/35 to-[#05050a]/10" /><div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/70 via-transparent to-[#05050a]/20" /><div className="relative mx-auto grid min-h-[568px] max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-12"><div className="pointer-events-none z-10 max-w-md border-l-2 border-cyan-300/80 bg-[#061426]/70 py-6 pl-6 pr-8 shadow-[0_0_32px_rgba(0,0,0,.24)] backdrop-blur-[2px] lg:col-span-5"><p className="mb-4 font-mono text-xs font-semibold tracking-[.32em] text-cyan-200 drop-shadow-[0_0_9px_rgba(0,240,255,.85)]">CHAPTER 03</p><h2 className="font-display text-4xl font-semibold uppercase leading-[.98] tracking-[.05em] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,.9)] md:text-6xl">The Learning<br /><span className="text-cyan-100">Montage</span></h2><p className="mt-6 max-w-xs font-display text-lg leading-relaxed text-slate-50 drop-shadow-[0_2px_10px_rgba(0,0,0,.95)] md:text-xl">New tools. New skills.<br />Same dream.</p><div className="mt-6 h-0.5 w-14 bg-cyan-200 shadow-[0_0_10px_#00f0ff]" /><p className="mt-8 font-mono text-xs font-semibold uppercase leading-relaxed tracking-[.13em] text-cyan-100 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">Drag a glowing skill to pin and reshape the system.</p></div><div className="relative h-[400px] overflow-hidden rounded-xl border border-cyan-300/35 bg-[#05050a]/35 shadow-[0_0_50px_rgba(0,240,255,.16)] lg:col-span-7 lg:h-[560px]"><canvas ref={canvasRef} className="h-full w-full touch-none cursor-grab active:cursor-grabbing" aria-label="Interactive technical skills constellation" /><div className="pointer-events-none absolute bottom-4 right-5 rounded border border-cyan-300/30 bg-[#05050a]/70 px-3 py-2 font-mono text-[10px] tracking-[.16em] text-cyan-100">LIVE SKILL NETWORK // DRAG TO PIN</div></div></div></section>;
};
