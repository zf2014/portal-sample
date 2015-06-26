require(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'inner/mtree', 'common/io'], function($, S, $$, modal, Tree, io){

	/*******************************************************************************
				
									变量定义

	********************************************************************************/
	var $form = $('#J-treeEditForm'),
		tree,
		tag,
		editable = false,

		$basicInfoTypeHidden = $('#J-basicInfoType'),
		$actionMethodHidden = $('#J-actionMethod'),
		$parentIdHidden = $('#J-basicInfoParentId'),
		baseUrl = $form.attr('action')
	;

	tree = new Tree('#J-treeMainContent', zNodes, treeSelectedCallback);




	/*******************************************************************************
				
									事件绑定

	********************************************************************************/

	// 新增按钮-单击事件
	$('#J-addTreeBtn').click(function(){

		if(!tree.hasSelected()){
			modal.alert('必须选择一个节点才能添加子节点！');
			return false;
		}
		tag = 'add';
		cleanFields();
		addBtnSetHidden();
		formFieldToEidtable();
	});

	// 更新按钮-单击事件
	$('#J-updateTreeBtn').click(function(){
		if(!tree.hasSelected()){
			modal.alert('必须选择一个节点才能进行修改！');
			return false;
		}

		if(tree.isTop()){
			modal.alert('该节点无法修改！');
			tree.cancelSelectedNodes();
			return false;
		}

		tag = 'update';
		updateBtnSetHidden();
		formFieldToEidtable();
	});

	// 删除按钮-单击事件
	$('#J-deleteTreeBtn').click(function(){
		if(!tree.hasSelected()){
			modal.alert('必须选择一个节点才能进行删除！');
			return false;
		}

		// TODO 删除
		tree.deleteNode();
		cleanAll();
	});

	// 保存按钮-单击事件
	$('#J-treeFormSubmitBtn').click(function(){
		if(tag === 'add'){
			io.form($form, {}, function(ajaxData){
				var rst = ajaxData.rst,
					msg = ajaxData.msg || '保存成功！'
				;
				if(ajaxData.code === 0){
					var cusData = {name: rst['basicInfo.name'], cusData: {name: rst['basicInfo.name'], mid: rst['basicInfo.id']}}
					tree.addNode(cusData);
					cleanAll();
				}
				modal.alert(msg);
			});
		}
		if(tag === 'update'){
			// TODO 更新
			tree.updateNode(cusData);
		}

	});







	/*******************************************************************************
				
									私有函数

	********************************************************************************/
	function cleanFields(){
		$form.find('.J-treeField').each(function(){
			$$(this).val('');
		});
	}

	function cleanTag(){
		tag = null;
		editable = false;
	}

	function cleanAll(){
		cleanFields();
		cleanTag();
		formFieldToReadonly();
	}

	function addBtnSetHidden(){
		var selectedNode = tree.getOneSelectedNode();
		$basicInfoTypeHidden.val( selectedNode.level === 0 ? 0 : 1 );
		$actionMethodHidden.val('save');
		setParentId();		
	}

	function updateBtnSetHidden(){
		$actionMethodHidden.val('update');
	}

	function setParentId(){
		var selectedNode = tree.getOneSelectedNode();

		if(selectedNode.isParent && selectedNode.level !== 0){
			$parentIdHidden.val(selectedNode.cusData.mid);
		}else if(selectedNode.level === 0){
			$parentIdHidden.val(0);
		}
	}

	function fillTreeNodeToForm(){
		var node = tree.getOneSelectedNode(),
			data = node.cusData;
		;

		io.request({
			url: baseUrl,
			data: {
				'method': 'query',
				'basicInfo.id': data.mid
			}
		}, function(ajaxData){
			var rst;
			// TODO 验证请求是否正确
			rst = ajaxData.rst;

			S.each(rst, function(val, key){
				$form.find('[name="'+key+'"]').val(val);
			});

			formFieldToReadonly();
		});
	}

	function formFieldToEidtable(){
		$form.find('.J-treeField').each(function(idx){
			this.readOnly = false;
			if(this.tagName === 'SELECT'){
				this.disabled = false;
			}
			if(idx === 0 ){
				this.focus();
			}

		});

		editable = true;
	}

	function formFieldToReadonly(){
		$form.find('.J-treeField').each(function(){
			this.readOnly = true;
			if(this.tagName === 'SELECT'){
				this.disabled = true;
			}
		});
		editable = false;
	}	

	function formFieldReplaceByNode(selectedNode){
		if(selectedNode.level === 0 ){
			cleanFields();
			formFieldToReadonly();

		}else{
			fillTreeNodeToForm();
		}
	}

	function treeSelectedCallback(){
		var selectedNode = arguments[2];
		formFieldReplaceByNode(selectedNode);
	}

});