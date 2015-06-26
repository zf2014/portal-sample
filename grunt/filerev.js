module.exports = {
    config: {
      dist: { 
        files: [
          {
            expand: true,
            cwd: '<%= product.dist %>/scripts',
            src: '{,*/}*.js',
            dest: '<%= product.dist %>/scripts'
          },
          {
            expand: true,
            cwd: '<%= product.dist %>/css',
            src: '{,*/}*.css',
            dest: '<%= product.dist %>/css'
          },
          {
            expand: true,
            cwd: '<%= product.dist %>/images',
            src: '{,*/}*.*',
            dest: '<%= product.dist %>/images'
          },
          {
            expand: true,
            cwd: '<%= product.dist %>/css/fonts',
            src: '{,*/}*.*',
            dest: '<%= product.dist %>/css/fonts'
          },
          {
            expand: true,
            cwd: '<%= product.dist %>',
            src: '*.{ico,png}',
            dest: '<%= product.dist %>'
          }
        ]
      }
    }
}