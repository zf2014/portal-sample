var require = {
	baseUrl: '../../scripts/lib',
	// baseUrl: 'http://192.168.180.54:9000/scripts/lib',
	deps: ['common/placeholder'],
	paths: {
		'app': '../app',
		'common': '../common',
		'css': 'require-css/css',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}