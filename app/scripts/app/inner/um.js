require(['jquery', 'utils', 'common/validation'], function($, S, validation){

	// 表单验证
	;(function(){
		var $submitBtn = $('#J-umFormSubmitBtn'),
			$form,
			submitPrcessingClassname = 'submit-processing',
			validator,
			processing = false,
			validateSuccessClassname = 'success',
			validateErrorClassname = 'error'
		;

		init();

		function init(){
			if(!$submitBtn.length){
				return;
			}
			$form = $submitBtn.closest('form');
			_initValidator();
			_bindSubmit();
		}

		function _bindSubmit(){
			$submitBtn.click(function(){
				if(processing === true){
					return false;
				}
				_btn2Prcessing();
				if(_validateForm()){
					_formSubmit();
				}else{
					_btn2Normal();
				}

				return false;
			})
		}

		function _initValidator(){
			validator = validation($form, {
				interrupt: true,
				errors: {
					container: function($elem, isRadio){
						return _getTipContainerByInp($elem);
					},
					errorsWrapper: '<p></p>',
					errorElem: '<span class="tip-txt"></span>'
				},
				listeners: {
					onFieldSuccess: function($elem, constraints, ValidateField){
						var $tip, bool;
						bool = S.every(constraints, function(constraint, key){
							return !!constraint.valid
						});
						if(bool){
							$tip = _getTipContainerByInp($elem);
							$tip.empty().append('<p class="success"><i class="ico-dui"></i></p>');
						}
					}
				}
			});
		}

		function _validateForm(){
			return validator.validate()
		}

		function _formSubmit(){
			_btn2Normal();
			$form[0].submit();
		}

		function _getTipContainerByInp($inp){
			var $inpGroup = $inp.closest('.J-controllerInp'),
				$tip = $inpGroup.siblings('.J-controllerTip:first').empty()
			;
			if(!$tip.length){
				$tip = $('<div class="controller-tip J-controllerTip"></div>').insertAfter($inpGroup)
			}
			return $tip;
		}

		function _btn2Prcessing(){
			processing = true;
			$submitBtn.addClass(submitPrcessingClassname);
		}

		function _btn2Normal(){
			$submitBtn.removeClass(submitPrcessingClassname);
			processing = false;

		}
	}());
	

	// 重新发送
	;(function(){
		var $resendBtn = $('#J-resendEmailBtn')
			,$form
			,countDownClassname = 'btn-resend-wait'
			,submiting
			,maxTime
			,starCount
		;
		// 如果页面不存在该
		if(!$resendBtn.length){
			return;
		}
		submiting = false;
		$form = $resendBtn.closest('form');
		maxTime = 60;
		starCount = (function(){
			function _countdown(sec){
				$resendBtn.empty().html('重新发送<span>（'+sec+'）</span>')
			}
			return function(count){
				var intervalId;
				addStatus();
				_countdown(count--);
				intervalId = window.setInterval(function(){
					if(count < 0){
						window.clearInterval(intervalId);
						$resendBtn.empty().html('重新发送');
						removeStatus();
					}else{
						_countdown(count--);
					}
				}, 1000)
			}
		})();


		starCount(maxTime);

		$resendBtn.click(function(){
			if($resendBtn.hasClass(countDownClassname)){
				return ;
			}
			if(submiting === true){
				return ;
			}
			submiting = true;
			doResendEmail()
		});


		function doResendEmail(){
			$form[0].submit();
		}

		function addStatus(){
			$resendBtn.addClass(countDownClassname);
		}

		function removeStatus(){
			$resendBtn.removeClass(countDownClassname);	
		}



	}());
});