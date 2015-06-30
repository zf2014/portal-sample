module.exports = Config;


function Config(c){
    var isExisted,
        self = this
    ;
    this.options = {
        port: 9000,
        open: 'http://127.0.0.1:9000/view/首页/index.html',
        livereload: 30000,
        hostname: '127.0.0.1'
    };

    this.livereload = {
        options: {
            middleware: function(connect) {
                return [
                    connect.static(c.app)
                ];
            }
        }
    }

}