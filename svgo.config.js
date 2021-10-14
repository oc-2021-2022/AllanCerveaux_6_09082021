module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertShapeToPath: {
            convertArcs: true
          },
          convertPathData: false
        }
      }
    }
  ]
}
