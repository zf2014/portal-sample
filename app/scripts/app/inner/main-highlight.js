require(['jquery'], function($){
	$(document).ready(function() {
		var $code = $('#J-jsonHighlight');
		$code.empty().html(js_beautify(jsonCode));
		hljs.highlightBlock($code[0]);
	});
});