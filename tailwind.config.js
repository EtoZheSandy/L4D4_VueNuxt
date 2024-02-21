/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
    }
  },
  plugins: [
    require('flowbite')
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
  // plugins: [require('daisyui')],
}

// сделать переключатель тем, между лефтой и новыми
