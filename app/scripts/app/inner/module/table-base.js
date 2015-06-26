define(['jquery', 'utils', 'common/fast-jquery'], function($, S, $$){
	var $resultContainer = $('.J-resultContainer'),
		trHoverClassname = 'tr__is-hover',
		trActiveClassname = 'tr__is-active'
	;


	$resultContainer.on('mouseenter', 'tr:not(.tr__is-page, .tr__is-empty)', function(){
		$$(this).addClass(trHoverClassname);
	});

	$resultContainer.on('mouseleave', 'tr:not(.tr__is-page, .tr__is-empty)', function(){
		$$(this).removeClass(trHoverClassname);
	});

	$resultContainer.on('click', 'tr:not(.tr__is-page, .tr__is-empty)', function(){
		var checkbox = $$(this).find('.J-checkbox-one:not([disabled])')[0];
		if( $$(this).hasClass(trActiveClassname) ){
			checkbox && (checkbox.checked = false);
			$$(this).removeClass(trActiveClassname);
		}else{
			checkbox && (checkbox.checked = true);
			$$(this).addClass(trActiveClassname);
		}
	});

	$('.J-checkbox-all').change(function(){
		var $checkboxes = $$(this).closest('table').find('.J-checkbox-one:not([disabled])'),
			hasChecked
		;
		hasChecked = this.checked;

		$checkboxes.each(function(){
			this.checked = hasChecked ? true : false;
			highlightRowByCheckbox(this, hasChecked);
		});

	});



	function highlightRowByCheckbox(checkbox, isHighlight){
		$$(checkbox).closest('tr')[isHighlight?'addClass':'removeClass'](trActiveClassname);
	}


})