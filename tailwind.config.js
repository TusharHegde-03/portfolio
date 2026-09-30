/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0c1728',
          secondary: '#14233a',
          tertiary: '#1b2d47',
        },
        cyan: {
          glow: '#00f0ff',
          soft: 'rgba(0, 240, 255, 0.15)',
          border: 'rgba(0, 240, 255, 0.25)',
        },
        sunset: {
          orange: '#ff6b00',
          gold: '#ff9900',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
        body: ['Inter', 'Manrope', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.35em',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.9))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
