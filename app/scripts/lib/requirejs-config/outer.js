var require = {
	baseUrl: '../scripts/lib',
	paths: {
		'app': '../app',
		'common': '../common',
		outer: '../app/outer/module',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}