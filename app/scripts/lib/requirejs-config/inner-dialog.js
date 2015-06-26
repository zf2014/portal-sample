var require = {
	baseUrl: '../../scripts/lib',
	deps: ['inner/btn-base', 'inner/dialog-cancel', 'inner/table-base'],
	paths: {
		'app': '../app',
		'common': '../common',
		'inner': '../app/inner/module',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery',
		'css': 'require-css/css'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}