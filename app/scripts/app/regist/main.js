require(['jquery', 'utils', 'common/validation'], function($, S, validation){

	var $submitBtn = $('.J-registFormSubmitBtn'),
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
			trigger: 'blur',
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
});