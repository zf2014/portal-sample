
var fs = require('fs'),
    path = require('path')
;


var mutablePath = '/stylus/mutable',
    nibPaths,
    stylusImports = ['site_var.styl', 'site_func.styl', 'site_mix.styl']
;

module.exports = Config;

function Config(c){
    var isExisted,
        self = this,
        nibPaths = []
    ;

    nibPaths.push(c.bowerDir + 'nib/lib/nib/')

    this.options = {
        compress: false,
        paths: nibPaths.concat(c.app + mutablePath),
        import: [],
        define: {
            version: '<%= product.version %>'
        },
        banner: '/**\n' +
            ' * 文件: .css \n' +
            ' * 公司: IFELSE\n' +
            ' * 作者: zhang150339894@qq.com\n' +
            ' * 时间: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
            ' */\n'
    };

    // console.log(this.options.import)

    stylusImports.forEach(function(val, idx){
        if(fs.existsSync(c.app + mutablePath + path.sep + val)){
            self.options.import.push(val)
        }
    });

    this.app = {
        files: [{
            expand: true,
            cwd: '<%= product.app %>/stylus/src',
            src: ['{,*/}*.styl'],
            dest: '<%= product.app %>/css/',
            ext: '.css'
        }]
    }

}

