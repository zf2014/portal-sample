require(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'common/io'], function($, S, $$, Tree, io){

	/*******************************************************************************
				
									变量定义

	********************************************************************************/
    var $dom = $(document),
    	$roleBackup = $('#J-roleManage-backup'),
    	$roleDecided = $('#J-roleManage-decided'),

    	$checkedAnyBtn = $("#J-checkedAnyBtn"),
    	$deletedAnyBtn = $("#J-deletedAnyBtn"),

    	categoryOpenedClassname = 'opened',
    	itemSelectedClassname = 'selected',
    	btnDisableClassname = 'disable',

    	tempBDatas = {},
    	tempDDatas = {},
    	bDatas = {},
    	dDatas = {},

    	isAllSelected = false
    ;

    // 判断是否需要提供后面的功能
    if(!$roleBackup.length){
    	return;
    }




	/*******************************************************************************
				
									菜单选择

	********************************************************************************/
	// 类目展开和合并操作
    $dom.on('click', 'dt.J-roleManage-category', function(){
    	var $dt = $$(this),
    		$dl = $dt.parent()
    	;
    	$dl[$dl.hasClass(categoryOpenedClassname) ? 'removeClass':'addClass'](categoryOpenedClassname);
    });

    // 备选记录选择且高亮
    $roleBackup.on('click', 'dd.J-roleManage-item', function(){
    	var $dd = $$(this),
    		hasSelected
    	;
    	hasSelected = $dd.hasClass(itemSelectedClassname);
    	$dd[hasSelected ? 'removeClass':'addClass'](itemSelectedClassname);
    	
    	recordTempByNode($dd, !hasSelected, tempBDatas);

    	if(S.isEmpty(tempBDatas)){
    		$checkedAnyBtn.addClass(btnDisableClassname);
    	}else if($checkedAnyBtn.hasClass(btnDisableClassname)){
    		$checkedAnyBtn.removeClass(btnDisableClassname);
    	}
    });


	/*******************************************************************************
				
									用户选择

	********************************************************************************/
	var prevSelectedEle,
		userItemSelectedClassname = 'selected',
		isUserSelected
	;

	initUserRole();


	// 类目展开和合并操作
    $dom.on('click', '.J-roleUser-item', function(){
    	if(prevSelectedEle && prevSelectedEle === this){
    		return false;
    	}

    	// 如果已经存在
    	if(!!prevSelectedEle){
    		$$(prevSelectedEle).removeClass(userItemSelectedClassname);
    	}

    	$$(this).addClass(userItemSelectedClassname);
    	prevSelectedEle = this;
    	isUserSelected = true;
    	// TODO
    });

    function initUserRole(){
    	prevSelectedEle = $('.J-roleUser-item' + '.' + userItemSelectedClassname)[0];
    	if(prevSelectedEle){
    		isUserSelected = true;
    	}
    }




	/*******************************************************************************
				
									行为操作

	********************************************************************************/
    // 已选记录选择且高亮
    $roleDecided.on('click', 'dd.J-roleManage-item', function(){
    	if(checkRelevantRole() === false){
    		return false;
    	}
    	var $dd = $$(this),
    		hasSelected
    	;
    	hasSelected = $dd.hasClass(itemSelectedClassname);
    	$dd[hasSelected ? 'removeClass':'addClass'](itemSelectedClassname);
    	
    	recordTempByNode($dd, !hasSelected, tempDDatas);

    	if(S.isEmpty(tempDDatas)){
    		$deletedAnyBtn.addClass(btnDisableClassname);
    	}else if($deletedAnyBtn.hasClass(btnDisableClassname)){
    		$deletedAnyBtn.removeClass(btnDisableClassname);
    	}
    });

    // 选中所有备选记录
    $("#J-checkedAllBtn").click(function(){
    	if(checkRelevantRole() === false){
    		return false;
    	}
    	$roleBackup.find('dl[data-cid]').addClass(categoryOpenedClassname);
    	$roleBackup.find('dd[data-iid]').each(function(){
    		$$(this).addClass(itemSelectedClassname);
    		recordTempByNode($$(this), true, tempBDatas);
    	});
    	showSelectedRoles();
    	isAllSelected = true;
    });

    // 选中所需要备选记录
	$checkedAnyBtn.click(function(){
    	if(checkRelevantRole() === false){
    		return false;
    	}
		if($checkedAnyBtn.hasClass(btnDisableClassname)){
			return false;
		}
		showSelectedRoles();
	});

	// 删除所需要已选记录
	$deletedAnyBtn.click(function(){
    	if(checkRelevantRole() === false){
    		return false;
    	}
		if($deletedAnyBtn.hasClass(btnDisableClassname)){
			return false;
		}
		hideSelectedRoles();
	});

	// 删除所有已选记录
	$("#J-deletedAllBtn").click(function(){
    	if(checkRelevantRole() === false){
    		return false;
    	}
    	$roleDecided.find('dd[data-iid]').each(function(){
    		recordTempByNode($$(this), true, tempDDatas);
    	});
    	hideSelectedRoles();

    	if(isAllSelected === true){
	    	$roleBackup.find('dd[data-iid]').each(function(){
	    		$$(this).removeClass(itemSelectedClassname);
	    	});
	    	tempBDatas = {};
	    	isAllSelected = false;
    	}
	});


	// 检查是否
	function checkRelevantRole(){
		if(isUserSelected){
			return true
		}
		return false;
	}







	/*******************************************************************************
				
									私有函数

	********************************************************************************/
	// 用户鼠标选择操作记录
    function recordTempByNode($node, isDoSelect, temp){
    	var $parent = $node.parent(),
    		cid,
    		iid,
    		hasSelected,
    		tempObj,
    		dObj
		;

    	cid = $parent.data('cid');
    	iid = $node.data('iid');
    	if(isDoSelect){
    		tempObj = temp[cid] || (temp[cid] = {});
    		// tempObj.name = $parent.data('cname');
    		dObj = tempObj.d || (tempObj.d = {});
    		dObj[iid] = true;
    	}else{
			delete temp[cid].d[iid];
			if(S.isEmpty(temp[cid].d)){
				delete temp[cid].d;
				delete temp[cid];
			}
    	}
    }

    // 显示用户选择的记录
    function showSelectedRoles(){
    	var $categoryLi;
		S.mix(bDatas, tempBDatas, true);
    	S.each(bDatas, function(data, ckey){
    		$categoryLi = $('#J-decided-' + ckey).show();
    		S.each(data.d, function(item, ikey){
    			$categoryLi.find('dd[data-iid='+ikey+']').show();
    		})
    	});

    	saveRecord();
    }

    // 删除用户选择的记录
    function hideSelectedRoles(){
    	var $categoryLi;
    	S.each(tempDDatas, function(data, ckey){
    		$categoryLi = $('#J-decided-' + ckey);
    		S.each(data.d, function(item, ikey){
    			$categoryLi.find('dd[data-iid='+ikey+']').removeClass(itemSelectedClassname).hide();
    			deleteRecord(ckey, ikey);
    			if(typeof dDatas[ckey] === 'undefined'){
    				$categoryLi.hide();
    			}

    		})
    	});
    	tempDDatas = {};
    }

    // 删除记录对象
    function deleteRecord(ckey, ikey){
    	// delete dDatas[ckey].d[ikey]
    	// delete bDatas[ckey].d[ikey]

    	if(dDatas[ckey]){
    		delete dDatas[ckey].d[ikey];

	    	if(S.isEmpty(dDatas[ckey].d)){
	    		delete dDatas[ckey];
	    	}
    	}


    	if(bDatas[ckey]){
    		delete bDatas[ckey].d[ikey];
	    	if(S.isEmpty(bDatas[ckey].d)){
	    		delete bDatas[ckey];
	    	}
    	}
    }

    // 保存记录对象
    function saveRecord(){
    	S.mix(dDatas, bDatas, true);
    }

});