define(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'common/io'], function($, S, $$, modal, io){

	var redirect = {};

	redirect.confirm = function(target, callback){
		
		var processing = false
		; 
		
		$(document).on('click', target, function(){
			var $form;
			if(processing === true){
				return false;
			}
			processing = true;
			$form = $$(this).closest('form');
			
			var bool = confirmBeforeAction();
			if(!bool){
				processing = false;
				return;
			}
			io.form($form, {
				complete: function(){
					processing = false;
					confirmAfterAction();
				}
			}, function(ajaxData){
				callback(ajaxData);
			})
		});
	}


	redirect.back = function(target, url, opts){
		// TODO
	}


	function confirmBeforeAction(){
        if(typeof Validator != "undefined"){
        	// 字段验证
            if (!Validator.Validate('thisForm', 2)) {
                return false;
            }
        }
        return true;
	}

	function confirmAfterAction(){
		// TODO
	}

	return redirect;


})