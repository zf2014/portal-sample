require(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'common/io'], function($, S, $$, Tree, io){

    /*******************************************************************************
           数据格式: 

        {
            Key_type: {
                d: {
                    key_code: true
                }
            }
        }

    ********************************************************************************/    


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

        userId = 'zsf', 

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

        setUserId.call(this);

        getUserRoles(function(data){
            var dDs;
            unselectAllBRoles();
            unselectAllDRoles();
            dDs = format(data);
            showDRoles(dDs)
            dDatas = dDs;
        });
    });

    // 用户权限初始化
    function initUserRole(){
    	prevSelectedEle = $('.J-roleUser-item' + '.' + userItemSelectedClassname)[0];
    	if(prevSelectedEle){
    		isUserSelected = true;
    	}
    }

    // 设置用户ID
    function setUserId(){
        userId = $$(this).data('id')
    }

    // 获取用户已绑定的权限
    function getUserRoles(callback){
        io.request({
            url: '/exchange-servmanage-webapp/exchange/servmanage/authorize/index!queryUserBusServ.jspa?userId=' + userId,
            type: 'POST',
            success: function(ajaxData){
                if(ajaxData.code === 0){
                    callback(ajaxData.rst.list);
                }else{
                    modal.alert(ajaxData.msg || '获取失败！');
                }
            }
        })
    }




	/*******************************************************************************
				
									行为操作

	********************************************************************************/

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

        saveRecord(function(){
            showDRoles(bDatas);
        });
    }

    // 显示已选权限
    function showDRoles(dd){
        S.each(dd, function(data, ckey){
            $categoryLi = $('#J-decided-' + ckey).show();
            S.each(data.d, function(item, ikey){
                $categoryLi.find('dd[data-iid='+ikey+']').show();
            })
        });
    }

    // 取消待选项中所有选中权限
    function unselectAllBRoles(){
        $roleBackup.find('dd.selected[data-iid]').each(function(){
            $$(this).removeClass(itemSelectedClassname);
        });
        bDatas = {};
        tempBDatas = {};
    }

    // 取消已选项中所有的选中权限
    function unselectAllDRoles(){
        
        $roleDecided.find('li').hide();
        $roleDecided.find('dl').addClass(categoryOpenedClassname);
        $roleDecided.find('dd[data-iid]').each(function(){
            $$(this).removeClass(itemSelectedClassname).hide();
        });
        tempDDatas = {};
    }

    // 删除用户选择的记录
    function hideSelectedRoles(){
        deleteRecord(function(){
            hideDRole(tempDDatas);
            tempDDatas = {};
        })
    }
    // 删除已选记录
    function deleteRecord(callback){
        doDelete(tempDDatas, callback);
    }
    // 删除已选记录
    function hideDRole(tdd){
        S.each(tdd, function(data, ckey){
            $categoryLi = $('#J-decided-' + ckey);
            S.each(data.d, function(item, ikey){
                $categoryLi.find('dd[data-iid='+ikey+']').removeClass(itemSelectedClassname).hide();
                deleteOneRecord(ckey, ikey);
                if(typeof dDatas[ckey] === 'undefined'){
                    $categoryLi.hide();
                }

            })
        });
    }

    // 删除某条记录对象
    function deleteOneRecord(ckey, ikey){
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

    // 删除交互
    function doDelete(data, callback){
        io.request({
            url: '/exchange-servmanage-webapp/exchange/servmanage/authorize/index!doDelete.jspa?userId=' + userId,
            type: 'POST',
            data: codeParams(data),
            success: function(ajaxData){
                if(ajaxData.code === 0){
                    callback();
                }else{
                    modal.alert(ajaxData.msg || '删除失败！');
                }
            }
        })
    }



    // 保存记录对象
    function saveRecord(callback){
        S.mix(dDatas, bDatas, true);
        doSave(dDatas, callback)
    }

    // 保存交互
    function doSave(data, callback){
        io.request({
            url: '/exchange-servmanage-webapp/exchange/servmanage/authorize/index!doSave.jspa?userId=' + userId,
            type: 'POST',
            data: codeParams(data),
            success: function(ajaxData){
                if(ajaxData.code === 0){
                    callback();
                }else{
                    modal.alert(ajaxData.msg || '授权失败！');
                }
            }
        })
    }

    // 组合传递参数
    function codeParams(data){
        var codes = [];

        S.each(data, function(val){
            S.each(val.d, function(bool,code){
                codes.push('busServCodes=' + code)
            })
        })
        return codes.join('&');
    }

	/*******************************************************************************
				
									私有函数

	********************************************************************************/
    // 将后台返回的数据转换成规定的格式
    function format(remoteData){
        var data = {},
            dObj
        ;

        S.each(remoteData, function(rData){
            // data[rData.businessType]
            if(!data[rData.businessType]){
                data[rData.businessType] = {d: {}};
            }
            dObj = data[rData.businessType]['d'];
            dObj[rData.code] = true;
        })
        console.log(data)
        return data;
    }

});