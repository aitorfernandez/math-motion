export default {
  input: 'index.js',
  output: {
    file: 'dist/main.js',
    format: 'iife',
    name: 'math_motion',
    sourcemap: 'inline'
  },
  watch: {
    exclude: ['node_modules/**']
  }
}
