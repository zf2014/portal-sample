

module.exports = {
    config: {
        js: {
            files: ['<%= product.app %>/scripts/{,*/}*.js'],
            options: {
                livereload: '<%= connect.options.livereload %>'
            }
        },
        gruntfile: {
            files: ['Gruntfile.js']
        },
        styles: {
            files: ['<%= product.app %>/stylus/*/{,*/}*.styl',
                    '<%= product.app %>/stylus/*/*/{,*/}*.styl'
                   ],
            tasks: ['stylus:app']
        },
        jade: {
            files: ['<%= product.app %>/jade/*/{,*/}*.jade',
                    '<%= product.app %>/jade/*/*/{,*/}*.jade'
                   ],
            tasks: ['jade:app']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '<%= product.app %>/view/{,*/}*.html',
                '<%= product.app %>/css/{,*/}*.css',
                '<%= product.app %>/images/{,*/}*'
            ]
        }
    }
}
