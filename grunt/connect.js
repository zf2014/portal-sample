module.exports = Config;


function Config(c){
    var isExisted,
        self = this
    ;
    this.options = {
        port: 9000,
        open: 'http://192.168.180.54:9000/view/outer.html',
        livereload: 30000,
        hostname: '192.168.180.54'
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