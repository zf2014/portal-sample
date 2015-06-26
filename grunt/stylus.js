
var fs = require('fs'),
    path = require('path')
;


var baseRoot = '../ZJP-GRUNT-BASE/',
    mutablePath = '/stylus/mutable',


    stylusPaths = [
        baseRoot + 'src/css/stylus/meta/',
        baseRoot + 'src/css/stylus/config/',
        baseRoot + 'src/css/stylus/nib/'
    ],




    stylusImports = ['site_var.styl', 'site_func.styl', 'site_mix.styl']


;

module.exports = Config;




function Config(c){
    var isExisted,
        self = this
    ;
    this.options = {
        compress: false,
        paths: stylusPaths.concat(c.app + mutablePath),
        import: [],
        define: {
            version: '<%= product.version %>'
        },
        banner: '/**\n' +
            ' * 文件: .css \n' +
            ' * 公司: 浙江电子口岸\n' +
            ' * 作者: qzzf1987@gmail.com\n' +
            ' * 时间: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
            ' */\n'
    };

    // console.log(this.options.import)

    stylusImports.forEach(function(val, idx){
        if(fs.existsSync(c.app + mutablePath + path.sep + val)){
            self.options.import.push(val)
        }
    });

    // isExisted = fs.existsSync(stylusPaths[3] + path.sep + 'site_var.styl')


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

