var require = {
	baseUrl: '../../scripts/lib',
	// baseUrl: 'http://192.168.180.54:9000/scripts/lib',
	deps: [],
	paths: {
		'app': '../app',
		'common': '../common',
		'css': 'require-css/css',
		'inner': '../app/inner/module',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}