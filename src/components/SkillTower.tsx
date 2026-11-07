import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Skill } from '../data/skills';

interface SkillTowerProps {
  skills: Skill[];
  activeSkill: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
}

const STORE_KEY = 'tushar-skill-stack-best-v1';
const COLORS = [0xef3e4b, 0xe6534d, 0xf0775d, 0xc92e3a, 0xf1c6b8, 0xe6a64b];

export function SkillTower({ skills, activeSkill, onSelect, reducedMotion }: SkillTowerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<{ drop: () => void; reset: () => void } | null>(null);
  const [skillIndex, setSkillIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return Number(window.localStorage.getItem(STORE_KEY)) || 0; } catch { return 0; }
  });
  const bestRef = useRef(best);
  useEffect(() => { bestRef.current = best; }, [best]);
  const [status, setStatus] = useState<'ready' | 'playing' | 'over'>('ready');
  const [unsupported, setUnsupported] = useState(false);
  const safeIndex = skillIndex % Math.max(1, skills.length);
  const skill = skills[safeIndex];

  useEffect(() => { if (skill) onSelect(skill.id); }, [skill?.id, onSelect, skill]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || !skills.length) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'low-power' });
    } catch { setUnsupported(true); return; }
    setUnsupported(false);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0909);
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(6, 7, 10);
    const target = new THREE.Vector3(0, 1.15, 0);
    camera.lookAt(target);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    scene.add(new THREE.HemisphereLight(0xffeee8, 0x160b0c, 2.2));
    const key = new THREE.DirectionalLight(0xfff2eb, 3.4); key.position.set(-4, 8, 6); scene.add(key);
    const rim = new THREE.PointLight(0xef3e4b, 28, 18); rim.position.set(4, 4, -3); scene.add(rim);
    const floorGeo = new THREE.PlaneGeometry(200, 200);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0d0b0b, roughness: .86, metalness: .08 });
    const floor = new THREE.Mesh(floorGeo, floorMat); floor.rotation.x = -Math.PI / 2; floor.position.y = -.08; scene.add(floor);
    const grid = new THREE.GridHelper(16, 32, 0x73313a, 0x342126); grid.position.y = -.06;
    (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach(m => { m.transparent = true; m.opacity = .28; }); scene.add(grid);
    const geometry = new THREE.BoxGeometry(1.8, .45, 1.8);
    const materials = COLORS.map(c => new THREE.MeshStandardMaterial({ color: c, roughness: .32, metalness: .18, emissive: c, emissiveIntensity: .08 }));
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x292021, roughness: .58, metalness: .2 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.05, .38, 2.05), baseMat); base.position.y = .04; scene.add(base);
    const blocks: THREE.Mesh[] = [base];
    const active = new THREE.Mesh(geometry, materials[0]); active.position.set(-3.3, 2.4, 0); scene.add(active);
    const initialWidth = 1.8;
    let blockWidth = initialWidth;
    let blockIndex = 0;
    let moving = true;
    let dropping = false;
    let gameOver = false;
    let fallVelocity = 0;
    let elapsed = 0;
    let moveX = -3.3;
    let moveDirection = 1;
    let scoreCount = 0;
    let audioContext: AudioContext | null = null;
    let raf = 0;
    let disposed = false;
    let inView = true;
    let needsReset = false;
    const resize = () => {
      const { width, height } = host.getBoundingClientRect(); if (!width || !height) return;
      renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
    };
    const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      try {
        audioContext ??= new AudioContext();
        if (audioContext.state === 'suspended') void audioContext.resume();
        const osc = audioContext.createOscillator(); const gain = audioContext.createGain();
        osc.type = type; osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gain.gain.setValueAtTime(.045, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
        osc.connect(gain); gain.connect(audioContext.destination); osc.start(); osc.stop(audioContext.currentTime + duration);
      } catch { /* Audio is optional; gameplay remains available without it. */ }
    };
    const removeStack = () => { for (const item of blocks.splice(1)) scene.remove(item); };
    const reset = () => {
      removeStack(); blockWidth = initialWidth; blockIndex = 0; scoreCount = 0; moving = true; dropping = false; gameOver = false; fallVelocity = 0;
      moveX = -3.3; moveDirection = 1; active.visible = true; active.scale.set(1, 1, 1); active.position.set(moveX, 2.4, 0); active.material = materials[0];
      target.set(0, 1.15, 0); camera.position.set(6, 7, 10); camera.lookAt(target); setScore(0); setSkillIndex(0); setStatus('ready'); needsReset = false;
    };
    const drop = () => {
      if (gameOver || dropping || !moving) return;
      dropping = true; moving = false; fallVelocity = 0; setStatus('playing'); playTone(330, .08, 'triangle');
    };
    const api = { drop, reset }; gameRef.current = api;
    const keyDown = (event: KeyboardEvent) => {
      if (!inView || ![' ', 'Enter'].includes(event.key)) return;
      if (event.target instanceof HTMLElement && /INPUT|TEXTAREA|BUTTON/.test(event.target.tagName)) return;
      event.preventDefault(); drop();
    };
    const pointerDown = () => { if (inView) drop(); };
    canvas.addEventListener('pointerdown', pointerDown);
    window.addEventListener('keydown', keyDown);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host); resize();
    const intersection = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) { inView = true; raf = requestAnimationFrame(animate); }
      else if (!entry.isIntersecting && inView) { inView = false; cancelAnimationFrame(raf); }
    }, { threshold: .08 }); intersection.observe(host);
    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed || !inView) return;
      const dt = Math.min(clock.getDelta(), .04); elapsed += dt;
      if (needsReset) reset();
      const top = blocks[blocks.length - 1];
      if (moving && !gameOver) {
        moveX += moveDirection * dt * 2.8;
        if (moveX > 3.25) { moveX = 3.25; moveDirection = -1; }
        if (moveX < -3.25) { moveX = -3.25; moveDirection = 1; }
        active.position.x = moveX; active.position.y = top.position.y + .43;
      }
      if (dropping) {
        fallVelocity += 15 * dt; active.position.y -= fallVelocity * dt;
        const landY = top.position.y + .415;
        if (active.position.y <= landY) {
          active.position.y = landY;
          const dx = active.position.x - top.position.x;
          const overlap = blockWidth - Math.abs(dx);
          if (overlap <= .12) {
            dropping = false; gameOver = true; active.visible = false; setStatus('over'); playTone(105, .36, 'sawtooth');
          } else {
            blockWidth = Math.min(blockWidth, overlap);
            active.scale.x = blockWidth / initialWidth;
            active.position.x = top.position.x + dx / 2;
            const landed = new THREE.Mesh(geometry, materials[(blockIndex + 1) % materials.length]);
            landed.position.copy(active.position); landed.scale.set(blockWidth / initialWidth, 1, 1); scene.add(landed); blocks.push(landed);
            // Keep geometry/material templates shared: only discard references to the previous moving mesh.
            scene.remove(active); active.scale.set(1, 1, 1); active.position.set(-3.3, 3, 0); active.material = materials[(blockIndex + 1) % materials.length]; active.visible = true; scene.add(active);
            blockIndex += 1; scoreCount += 1; setScore(scoreCount); setSkillIndex(blockIndex); setStatus('playing'); playTone(460 + (blockIndex % 5) * 65, .13, 'sine');
            if (scoreCount > bestRef.current) { bestRef.current = scoreCount; setBest(scoreCount); try { window.localStorage.setItem(STORE_KEY, String(scoreCount)); } catch { /* Storage may be disabled. */ } }
            target.set(0, Math.max(1.15, blocks.length * .45), 0);
            camera.position.y += .27; camera.lookAt(target);
            active.position.x = moveDirection > 0 ? -3.3 : 3.3; moveX = active.position.x; active.position.y = landed.position.y + .43; active.scale.x = blockWidth / initialWidth; active.material = materials[blockIndex % materials.length];
            dropping = false; moving = true;
          }
        }
      }
      if (!reducedMotion) { const sway = Math.sin(elapsed * .5) * .018; scene.rotation.y += (sway - scene.rotation.y) * .02; }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      disposed = true; cancelAnimationFrame(raf); gameRef.current = null; intersection.disconnect(); resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', pointerDown); window.removeEventListener('keydown', keyDown); audioContext?.close();
      geometry.dispose(); materials.forEach(m => m.dispose()); base.geometry.dispose(); baseMat.dispose(); floorGeo.dispose(); floorMat.dispose();
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material]; gridMaterials.forEach(m => m.dispose()); renderer.dispose();
    };
  }, [skills, reducedMotion]);

  const restart = useCallback(() => gameRef.current?.reset(), []);
  return <div ref={hostRef} className="skill-game" aria-label="Skill stack building game">
    <div className="skill-game-canvas"><canvas ref={canvasRef} aria-label="Three dimensional skill block stack. Click or press space to drop the moving block." />
      <div className="game-hud"><span>STACK / {String(score).padStart(2, '0')}</span><span>BEST / {String(best).padStart(2, '0')}</span></div>
      {unsupported && <div className="game-fallback">3D is unavailable in this browser. Your skills are still listed beside the game.</div>}
      {status === 'over' && <div className="game-over"><span>STACK ENDED</span><strong>{score} {score === 1 ? 'BLOCK' : 'BLOCKS'}</strong><p>Best stack: {best}</p><button type="button" onClick={restart}>PLAY AGAIN ↗</button></div>}
      <button className="game-drop" type="button" onClick={() => gameRef.current?.drop()} disabled={status === 'over'}>DROP BLOCK <kbd>SPACE</kbd></button>
    </div>
    <aside className="game-skill-panel" aria-live="polite">
      <div className="game-panel-top"><span>THE THINGS I BUILD WITH</span><span>SKILL {String((safeIndex % skills.length) + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}</span></div>
      <p className="game-kicker">{skill?.category}</p><h3>{skill?.name}</h3>
      <p className="game-description">This block is up next. Line it up with the stack, then drop it into place.</p>
      <pre><code>{skill?.codeSnippet}</code></pre>
      <div className="game-progress" aria-label={`${score} blocks stacked`}><span style={{ width: `${Math.min(100, (score / Math.max(skills.length, 1)) * 100)}%` }} /></div>
      <p className="game-instruction">{status === 'over' ? 'A near miss is part of the build.' : 'Click the moving block, tap DROP, or press space.'}</p>
      <span className="game-bottom-note">A SMALL STACK / BUILT ONE PIECE AT A TIME</span>
    </aside>
  </div>;
}

export default SkillTower;

