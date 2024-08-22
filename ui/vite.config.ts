import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltePreprocess } from 'svelte-preprocess'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import svgr from 'vite-plugin-svgr'

/* 
Define a config for building the plugin UI. Figma requires a single HTML file as an output, so we need to inline every asset and merge everything into a single document.
 */
export default defineConfig({
  // Specify the source directory
  root: './ui',

  plugins: [
    // Enable working with Svelte
    svelte({
      preprocess: sveltePreprocess(),
    }),

    // Merge everything into a single file
    viteSingleFile(),

    // Provide the support for SVG
    svgr(),
  ],

  build: {
    target: 'es6',

    // Specify the output folder and ask to rewrite upon each compilation
    outDir: '../dist/ui',
    emptyOutDir: true,

    // Inline every asset and load it as a single chunk
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,

    // Disable CSS code splitting and load all the styles in advance
    cssCodeSplit: false,
  },
})
