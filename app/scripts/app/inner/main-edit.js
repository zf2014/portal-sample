require(['jquery', 'utils', 'inner/confirm', 'inner/upload'], function($, S, confirm){
	confirm.confirm($('#J-vldFormSubmitBtn'), function(){
	}, true)
})