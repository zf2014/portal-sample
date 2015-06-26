

module.exports = {
    config: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= product.dist %>/*'
          ]
        }]
      },
    }
}
