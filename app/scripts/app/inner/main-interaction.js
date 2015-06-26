require(['jquery', 'inner/redirect', 'common/modal'], function($, redirect, modal){

	var $dom = $(document);

	//	保存
	redirect.confirm('.J-redirectConfirm', function(ajaxData){
		console.log(ajaxData)
	});



	// 审核
	;(function(){
		var $auditSelect = $('#J-auditSelect'),
			$selectedOption,
			$prevSelectedContent,
			selectedIdx
		;


		init();


		function init(){
			if($auditSelect.length == 0){
				return;
			}

			getSelectedOption();
			showAuditSelectedContent();
			$auditSelect.on('change', function(){
				getSelectedOption();
				showAuditSelectedPrevContent();
				showAuditSelectedContent();
			});
		}


		function showAuditSelectedPrevContent(){
			$prevSelectedContent.hide();
		}

		function showAuditSelectedContent(){
			var $target;
			$target = $($selectedOption.data('target'));
			$target.show();
			$prevSelectedContent = $target;
		}

		function getSelectedOption(){
			selectedIdx = $auditSelect[0].selectedIndex;
			$selectedOption = $auditSelect.find('option').eq(selectedIdx);
		}
	}())


	// 回复-删除弹出框
	;(function(){
		var $deleteBtn = $('#J-deleteInterationBtn'),
			dialogContent,
			dialog

		;

		init();


		function init(){
			dialogContent = $('#J-interactionDeleteDialog').html()
			$deleteBtn.click(function(){
				dialog = modal.dialog(dialogContent, [], {
					classes: 'modal-delete-interaction'
				});
			});

			$dom.on('click', '.J-interactionDeleteDialogCancelBtn', function(){
				dialog.hide();
			});


			$dom.on('click', '.J-interactionDeleteDialogConfirmBtn', function(){
				// TODO
				dialog.hide();
			});
		}


	}())

	
});