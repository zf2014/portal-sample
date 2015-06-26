require(['jquery', 'common/fast-jquery', 'inner/send', 'inner/confirm'], function($, $$, send, confirm){
	

	// 修改和新增子账号按钮
	;(function(){
		var $btn = $('#J-validationFormSubmitBtn');
		if(!$btn.length){
			return;
		}
		confirm.confirm($btn, function(ajaxData){
			send.dialogRetrun(result); 
		}, true);
	}());


	// 权限
	;(function(){
		var $btn = $('#J-subaccountRoleConfirm')
		;
		if(!$btn.length){
			return;
		}
		confirm.confirm($btn, function(ajaxData){

		})

	}());


});