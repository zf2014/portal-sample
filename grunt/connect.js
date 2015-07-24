module.exports = Config;


function Config(c){
    var isExisted,
        self = this
    ;
    this.options = {
        port: 9000,
        livereload: 30000,
        hostname: '127.0.0.1'
    };

    this.livereload = {
        options: {
            open: 'http://127.0.0.1:9000/view/首页/index.html',
            middleware: function(connect) {
                return [
                    connect.static(c.app)
                    // ,
                    // connect.static('bower_components')
                ];
            }
        }
    }

    this.bower = {
        options: {
            hostname: '127.0.0.1',
            port: 9100,
            middleware: function(connect) {
                return [
                    connect.static('bower_components')
                ];
            }
        }
    }

}