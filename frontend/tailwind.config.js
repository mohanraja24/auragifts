/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Attractive, Festive & Cheerful Gift Boutique Palette
        primary: {
          DEFAULT: '#E11D48', // Vibrant Celebration Rose / Festive Gift Crimson
          light: '#F43F5E',   // Bright Joyful Rose
          hover: '#BE123C',   // Deep Crimson
          dark: '#9F1239',    // Midnight Rose
          brand: '#FB7185',
        },
        secondary: {
          DEFAULT: '#F59E0B', // Warm Sunlit Amber / Ribbon Gold
          light: '#FDE68A',   // Buttercream
          dark: '#D97706',    // Deep Amber
        },
        background: {
          DEFAULT: '#FAFAF9', // Ultra-Clean Soft Warm Linen Canvas
          pure: '#FFFFFF',
          alt: '#FFF1F2',     // Very Soft Festive Tint Section
          subtle: '#FFE4E6',
        },
        accent: {
          DEFAULT: '#F97316', // Warm Coral Orange
          light: '#FDBA74',
          dark: '#C2410C',
          gold: '#F59E0B',
        },
        text: {
          DEFAULT: '#1C1917', // High-Contrast Deep Charcoal Slate
          muted: '#57534E',   // Medium Slate
          subtle: '#78716C',  // Soft Stone
        },
        border: {
          DEFAULT: '#E7E5E4', // Clean Crisp Border
          dark: '#D6D3D1',
          gold: 'rgba(245, 158, 11, 0.4)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(225, 29, 72, 0.08)',
        'card': '0 4px 20px -2px rgba(225, 29, 72, 0.05)',
        'gold': '0 4px 20px -2px rgba(245, 158, 11, 0.3)',
        'modal': '0 25px 50px -12px rgba(159, 18, 57, 0.25)',
      }
    },
  },
  plugins: [],
}
