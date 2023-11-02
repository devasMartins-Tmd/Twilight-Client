/** @type {import('tailwindcss').Config} */
export default {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            pop: ['Poppins', 'serif'],
            mukta: ['Mukta'],
            open: ['Open Sans', 'serif'],
            kan: ['Kanit', 'mono'],
            play: ['Playfair Display', 'mono'],
            head: ['Bebas Neue'],
            raj: ['Rajdhani'],
            ultra: ['Ultra'],
            russ: ['Russo One'],
         },
         rotate: {
            270: '270deg',
            360: '360deg',
         },
      },
   },
   plugins: [require('tailgrids/plugin')],
};
