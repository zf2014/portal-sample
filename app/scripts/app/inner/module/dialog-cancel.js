define(['jquery', 'utils', 'common/fast-jquery'], function($, S, $$){
	$('.J-dialogCancel').click(function(){
		window.parent.currentDialog.hide();
	});
})