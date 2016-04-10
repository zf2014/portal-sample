module.exports = Config;


function Config(c){
    var isExisted,
        self = this
    ;
    this.options = {
        port: 9000,
        livereload: 30000,
        hostname: '192.168.0.110'
    };

    this.server =  {
        proxies: [
            {
                context: '/portal',
                host: '192.168.0.104',
                port: 8080,
                https: false
            }
        ]
    }

    this.livereload = {
        options: {
            open: 'http://192.168.0.110:9000/view/首页/index.html',
            middleware: function(connect) {


                // Setup the proxy
                var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];
                middlewares.push(connect.static(c.app));

                return middlewares;
            }
        }
    }

    this.bower = {
        options: {
            hostname: '192.168.0.110',
            port: 9100,
            middleware: function(connect) {
                return [
                    connect.static('bower_components')
                ];
            }
        }
    }

}