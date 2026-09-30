# Tushiro Portfolio — Design System & Source of Truth

## 1. Visual Identity
- **Theme**: Cinematic Futuristic Tech / Cyberpunk / Bengaluru AI & Data Engineering
- **Atmosphere**: Deep navy/near-black space, electric cyan illumination, sunset orange rim light, high precision editorial composition.
- **Core Character Anchor**: Tushiro (Tushar Hegde with glowing blue visor, black futuristic jacket, and silver chain).

## 2. Color System (CSS Variables & Tailwind Config)
```css
:root {
  --bg-primary: #050a14;
  --bg-secondary: #0a1120;
  --bg-tertiary: #0f192e;
  --cyan: #00f0ff;
  --cyan-soft: rgba(0, 240, 255, 0.15);
  --cyan-glow: rgba(0, 240, 255, 0.4);
  --blue-primary: #0066ff;
  --blue-glow: rgba(0, 102, 255, 0.3);
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --sunset-gold: #ff9900;
  --border-cyan: rgba(0, 240, 255, 0.25);
  --border-glass: rgba(255, 255, 255, 0.08);
}
```

## 3. Typography
- **Display Headings**: `'Space Grotesk'`, `'Sora'`, `sans-serif` (uppercase, wide tracking `0.15em` to `0.25em`)
- **Body & Technical Text**: `'Inter'`, `'Manrope'`, `sans-serif`
- **Handwritten Accent**: `'Caveat'`, `'Reenie Beanie'`, or custom SVG path styling (used exclusively for annotations like *"Same person. Different vision."* and *"Let's build something great."*)

## 4. Spacing & Grid System
- Desktop baseline container: `max-w-7xl` (1280px) with `px-6 md:px-12 lg:px-16`
- Vertical section spacing: `py-20 lg:py-32`
- Consistent HUD panel padding: `p-6 lg:p-8`

## 5. Component & Holographic UI Conventions
- **Holographic Panels**: Glassmorphism (`backdrop-blur-md bg-slate-950/60`), thin cyan borders (`border border-cyan-500/30`), corner HUD notch markers.
- **Glowing visor effect**: Radial gradient bloom (`drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]`).

## 6. Micro Interactions & Cursor Rules
- Custom Cursor (Desktop only):
  - 6px cyan center dot with 32px smooth outer ring.
  - Hover over interactive items expands ring to 48px with cyan border and subtle glow.
  - Respects `prefers-reduced-motion` (disables custom cursor trail and parallax when active).

## 7. 3D & Asset Architecture
- Public folder layout:
  - `/public/references/`: Original mockups
  - `/public/images/`: Optimized visual layers
  - `/public/characters/`: Cutouts & identity portraits
  - `/public/icons/`: Tech stack vectors
  - `/public/3d/`: Prepared directory for `.glb` models (`character.glb`, `city.glb`, `environment.glb`)

## 8. Accessibility & Performance
- Full ARIA labels for navigation, modals, and contact form.
- Keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-cyan-400`).
- Responsive WebP image formats with lazy loading below hero.
