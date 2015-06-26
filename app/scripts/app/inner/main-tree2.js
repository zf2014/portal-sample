require(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'inner/mtree', 'common/io'], function($, S, $$, modal, Tree, io){

	/*******************************************************************************
				
									变量定义

	********************************************************************************/
	var $form = $('#J-treeEditForm'),
		tree,
		tag,
		editable = false,
		// $basicInfoTypeHidden = $('#J-basicInfoType'),
		$parentIdHidden = $('input[name="channelVo.parentId"]')
	;

	tree = new Tree('#J-treeMainContent', zNodes, {
		callback:{
			onClick: function(){
				var selectedNode = arguments[2];
				formFieldReplaceByNode(selectedNode);
			}
		},
		async: {
			enable: true,
			url: '/admin/channel/index!getChildChannel.jspa',
			dataType : 'json',
			type: 'get',
			autoParam: ['id=parentId'],
			dataFilter: function(treeId, parentNode, responseData){
				// { name:"基础资料1", isParent: true, id:1, cusData:{name:'基础资料1', id: '1', code: '011'}}
				var nodes = [];
				if(responseData.code === 0){
					S.each(responseData.rst.list, function(obj){
						nodes.push({
							name: obj.name,
							isParent: true,
							id: obj.id
						})
					})
				}

				return nodes;

			}
		}
	});



	/*******************************************************************************
				
									事件绑定

	********************************************************************************/

	// 新增按钮-单击事件
	$('#J-addTreeBtn').click(function(){

		// if(!tree.hasSelected()){
		// 	modal.alert('必须选择一个节点才能添加子节点！');
		// 	return false;
		// }
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

		// if(tree.isTop()){
		// 	modal.alert('该节点无法修改！');
		// 	tree.cancelSelectedNodes();
		// 	return false;
		// }

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

		deleteNode();
	});

	// 保存按钮-单击事件
	$('#J-treeFormSubmitBtn').click(function(){

		io.form($form, {}, function(ajaxData){
			var rst = ajaxData.rst.list,
				msg = ajaxData.msg || '保存成功！'
			;
			if(ajaxData.code === 0){
				var cusData ={
					name: rst[0].name,
					isParent: true,
					id: rst[0].id
				}
				if(tag === 'add'){
					tree.addNode(cusData);
					cleanAll();
				}else if(tag === 'update'){
					tree.updateNode(cusData);
				}
				
			}
			modal.alert(msg);
		});

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
		// $basicInfoTypeHidden.val( selectedNode.level === 0 ? 0 : 1 );
		setParentId();		
	}

	function updateBtnSetHidden(){
	}

	function setParentId(){
		var selectedNode = tree.getOneSelectedNode();

		if(selectedNode){
			if(selectedNode.isParent){
				$parentIdHidden.val(selectedNode.id);
			}
		}
	}

	function fillTreeNodeToForm(){
		var node = tree.getOneSelectedNode()
		;

		io.request({
			url: '/admin/channel/index!edit.jspa',
			data: {
				'channelId': node.id
			}
		}, function(ajaxData){
			var rst;
			rst = ajaxData.rst.list[0];
			S.each(rst, function(val, key){
				$form.find('[name="channelVo.'+key+'"]').val(val);
			});

			formFieldToReadonly();
		});
	}

	function formFieldToEidtable(){
		$form.find('.J-treeField').each(function(idx){
			console.log(this)
			this.readOnly = false;
			if(this.tagName === 'SELECT'){
				this.disabled = false;
			}
			if( idx === 0 ){
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
		fillTreeNodeToForm();
	}

	function treeSelectedCallback(){
		var selectedNode = arguments[2];
		formFieldReplaceByNode(selectedNode);
	}

	function deleteNode(){
		var node = tree.getOneSelectedNode()
		;

		io.request({
			url: '/admin/channel/index!delete.jspa',
			data: {
				'channelId': node.id
			}
		}, function(ajaxData){
			if(ajaxData.code === 0){
				tree.deleteNode(true);
				cleanAll();
			}
			modal.alert(ajaxData.msg || '删除成功！');
		});
	}

});