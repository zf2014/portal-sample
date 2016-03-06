
module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var productConfig = {
        version: '1.0.0',
        app: 'app',
        dist: 'dist',
        bowerDir: 'bower_components/',
        // 静态资源目录
        staticRoot: ''
    };

    grunt.initConfig({
        product: productConfig,
        copy: require('./grunt/copy.js').config,
        clean: require('./grunt/clean.js').config,
        stylus: new (require('./grunt/stylus.js'))(productConfig),
        jade: require('./grunt/jade.js').config,
        connect: new (require('./grunt/connect.js'))(productConfig),
        watch: require('./grunt/watch.js').config,
        useminPrepare: require('./grunt/useminPrepare.js').config,
        filerev: require('./grunt/filerev.js').config,
        usemin: new (require('./grunt/usemin.js'))(productConfig),
        sprite: new (require('./grunt/sprite.js'))(['homepage']),
    });

    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-connect-proxy');

    grunt.registerTask('server', [
        'configureProxies:server',
        'connect:livereload',
        'connect:bower',
        'watch'
    ]);


    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        // [useminprepare[以下3组命令], 是通过解析动态生成的]
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        
        'copy:dist',
        'filerev',
        'usemin'
    ]);


};