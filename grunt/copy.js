

module.exports = {
    config: {
        dist: {
            files: [{
              expand: true,
              // dot: true,
              cwd: '<%= product.app %>',
              dest: '<%= product.dist %>',
              src: [
                '*.{ico,png,txt}'
                ,'images/{,*/}*.webp'
                ,'*.{html,ftl}'
                ,'view/{,*/}*.{html,ftl}'
                // ,'css/{,*/}*.css'
              ]
            }]
        }
    }
}