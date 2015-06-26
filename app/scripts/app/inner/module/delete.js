define(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'common/io'], function($, S, $$, modal, io){

	var deleteObj = {};

	deleteObj.dialog = function(target, url, opts){
		$(target).click(function(){

			var $checkboxes = hasChecked(),
				msg,
				deleteIds = []
			;

			msg = opts.msg || '确认要删除吗？';

			if($checkboxes !== false){
				$checkboxes.each(function(){
					deleteIds.push('ids=' + this.value);
				});
				modal.confirm(msg, function(bool){
					if(bool){
						io.request({
							url: url,
							data: deleteIds.join('&')
						}, function(ajaxData){
							opts.callback(ajaxData);
						})
					}
				});
			}else{
				modal.alert('请选择你要删除的条目！');
			}
		})
	}


	deleteObj.deleteRows = function(){
		checkedCheckboxes().each(function(idx, $checkbox){
			$$(this).closest('tr').remove();
		});
	}


	function hasChecked(){
		var $checkboxes;
		$checkboxes = checkedCheckboxes();
		if($checkboxes.length){
			return $checkboxes;
		}
		return false;

	}

	function checkedCheckboxes(){
		return $('.J-checkbox-one:checked');
	}





	return deleteObj;


})