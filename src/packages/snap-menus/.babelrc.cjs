module.exports = {
  presets: [
    ['@babel/env', { 
      debug: false,
      modules: false,
      targets: {
        esmodules: true
      } 
    }],
     ['@babel/preset-react'],
  ],
  plugins: []
}
