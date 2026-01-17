/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'surface-1': '#000000', // Pitch Black (Background)
                'surface-2': '#2A2A2A', // Much brighter charcoal/gray (Tiles)
                'surface-3': '#3F3F46', // Zinc-700 equivalent for Hover
                'm3-primary': '#D0BCFF',
                'm3-secondary': '#CCC2DC',
                'm3-tertiary': '#EFB8C8',
                'm3-error': '#F2B8B5',
                'energy-pastel': '#A7F3D0',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Standardize
            }
        },
    },
    plugins: [],
}
