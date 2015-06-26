var require = {
	baseUrl: '../../scripts/lib',
	// baseUrl: 'http://192.168.180.54:9000/scripts/lib',
	deps: ['inner/global-layout','inner/btn-base', 'inner/table-base','inner/search-page', 'inner/moreSearch','inner/add'],
	paths: {
		'app': '../app',
		'common': '../common',
		'css': 'require-css/css',
		'inner': '../app/inner/module',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery',
		'tree': 'zTree/js/jquery.ztree.all-3.5'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		tree: {
			deps: ['jquery', 'css!zTree/css/zTreeStyle/zTreeStyle.css'],
			exports: '$'
		}

	}
}