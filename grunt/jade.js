

var develop = true
;

module.exports = {
    config: {
        options: {
            pretty: true,
            client: false,
            data: {
            }
        },
        app: {
            files: [
                {
                    expand: true,
                    cwd: '<%= product.app %>/jade/src',
                    src: ['{,*/}*.jade'],
                    dest: '<%= product.app %>/view/',
                    ext: '.html'
                }
            ]
        }
    }
}
