/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pistachio: { DEFAULT: '#88d18a', 100:'#133214',200:'#276429',300:'#3a963d',400:'#58be5b',500:'#88d18a',600:'#a1daa3',700:'#b8e4ba',800:'#d0edd1',900:'#e7f6e8' },
        tea_green: { DEFAULT:'#ccddb7',100:'#2a371a',200:'#536e34',300:'#7da44d',400:'#a5c37f',500:'#ccddb7',600:'#d6e4c5',700:'#e0ead3',800:'#eaf1e2',900:'#f5f8f0' },
        battleship_gray: { DEFAULT:'#9b9c93',100:'#1f1f1d',200:'#3e3f3a',300:'#5d5e57',400:'#7c7d74',500:'#9b9c93',600:'#aeafa8',700:'#c2c3be',800:'#d6d7d4',900:'#ebebe9'},
        chinese_violet: { DEFAULT:'#6a5b6e',100:'#151216',200:'#2a242b',300:'#3f3641',400:'#544857',500:'#6a5b6e',600:'#89778e',700:'#a699aa',800:'#c4bbc6',900:'#e1dde3'},
        melon: { DEFAULT:'#f0b7b3',100:'#46120e',200:'#8c231c',300:'#d23529',400:'#e2746d',500:'#f0b7b3',600:'#f3c5c2',700:'#f6d3d1',800:'#f9e2e0',900:'#fcf0f0'},
        mountbatten_pink: { DEFAULT:'#7e6f7b',100:'#191618',200:'#322c31',300:'#4b4249',400:'#635861',500:'#7e6f7b',600:'#978a95',700:'#b1a7af',800:'#cbc5ca',900:'#e5e2e4'},
        oxford_blue: { DEFAULT:'#0c2743',100:'#02070d',200:'#050f1a',300:'#071627',400:'#091e34',500:'#0c2743',600:'#18508b',700:'#257ad4',800:'#6ca6e5',900:'#b5d3f2'},
        sky_blue: { DEFAULT:'#86ceec',100:'#0a3040',200:'#146081',300:'#1e90c1',400:'#47b4e2',500:'#86ceec',600:'#a0d8f0',700:'#b8e2f4',800:'#cfecf8',900:'#e7f5fb'},
        dark_cyan: { DEFAULT:'#339795',100:'#0a1f1e',200:'#143d3d',300:'#1f5c5b',400:'#297a79',500:'#339795',600:'#47c2c0',700:'#75d1d0',800:'#a3e0df',900:'#d1f0ef'},
      },
      // semantic aliases you’ll actually use in classes
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp .6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity:0, transform:'translateY(16px)'}, '100%':{ opacity:1, transform:'translateY(0)' } },
        float: { '0%,100%': { transform:'translateY(0)'}, '50%': {transform:'translateY(-8px)'} },
        shimmer: { '0%': { backgroundPosition:'-200% 0' }, '100%': { backgroundPosition:'200% 0' } }
      },
      dropShadow: { glow: '0 0 12px rgba(134, 206, 236, .55)' },
      boxShadow: { brand: '0 8px 30px rgba(12,39,67,.12)' }
    },
  },
  plugins: [],
};