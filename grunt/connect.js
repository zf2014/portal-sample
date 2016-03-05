module.exports = Config;


function Config(c){
    var isExisted,
        self = this
    ;
    this.options = {
        port: 9000,
        livereload: 30000,
        hostname: '192.168.1.101'
    };

    this.livereload = {
        options: {
            open: 'http://192.168.1.101:9000/view/首页/index.html',
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
            hostname: '192.168.1.101',
            port: 9100,
            middleware: function(connect) {
                return [
                    connect.static('bower_components')
                ];
            }
        }
    }

}