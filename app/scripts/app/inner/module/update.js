define(['jquery', 'utils', 'common/fast-jquery', 'common/modal'], function($, S, $$, modal){

	var updateObj = {};
	var template = S.template('<iframe src="<@= url@>" frameborder="0" style="width: <@= width@>px;height: <@= height@>px;"></iframe>');
	var $row;

	updateObj.dialog = function(target, url, opts){

		$(target).click(function(){
			var dialog,
				dialogCssObj,
				dialogOpt,

				$checkboxes,
				updataId,
				updataUrl
			;

			$checkboxes = findChecked();

			if(!valid($checkboxes)){
				return false;
			}

			updataId = $checkboxes.val();
			
			$row = $checkboxes.closest('tr');

			dialogCssObj = {
				// 保证弹出框大小跟实际的一致
				// 2: 边线; 36: 标题高度
				height: opts.height + 2 + 36,
				// 2: 边线
				width: opts.width + 2
			};
			dialogCssObj['margin-top'] = -(dialogCssObj.height/2);
			dialogCssObj['margin-left'] = -(dialogCssObj.width/2);

			updataUrl = url + ( /\?/.test( url ) ? "&" : "?" ) + 'id=' + updataId;

			dialogOpt = {
				url: updataUrl,
				height: opts.height,
				width: opts.width
			};


			window.currentDialog = dialog = modal.dialog(template(dialogOpt), [], {
				header: opts.title || '修改功能'
			});

			dialog.node.css(dialogCssObj);

			dialog.node.on('hidden', function(event, data){
				// TODO 数据验证
				if(!!data){
					// 如果有数据
					opts.callback(data);
				}
				window.currentDialog = null;
				$row = null;

			});
		});
	}

	updateObj.updateRow = function(rowContent){
		$(rowContent).insertBefore($row).addClass('tr__is-modify');
		$row.remove();
	};


	function findChecked(){
		return $('.J-checkbox-one:checked');
	}

	function valid($checkboxes){
		var len = $checkboxes.length
		;
		if(len === 1){
			return true;
		}else if(len > 1){
			modal.alert('对不起，只能选择一条记录！');
			return false;
		}else{
			modal.alert('对不起，请选择一条记录！');
			return false;
		}
	}


	return updateObj;


})