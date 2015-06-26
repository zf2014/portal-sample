require(['jquery', 'inner/add', 'inner/delete', 'inner/update'], function($, add, del, update){


	add.dialog('#J-addDialogTest', './服务注册新增-dialog.html', {
		height: 520,
		width: 750,
		title: '服务注册新增',
		callback: function(data){
			// TODO 数据分析 & 页面局部刷新
			var rowContent =	'<tr>'+
				                  '<td class="cel-center"><input type="checkbox" class="inp-checkbox J-checkbox-one"></td>'+
				                  '<td class="cel-left"><span>左对齐2</span></td>'+
				                  '<td class="cel-right"><span>右对齐</span></td>'+
				                  '<td class="cel-center"><span>杭州</span></td>'+
				                  '<td class="cel-center"><span>浙A 04572</span></td>'+
				                  '<td class="cel-center"><span>2817320001</span></td>'+
				                  '<td class="cel-center"><span>张三</span></td>'+
				                  '<td class="cel-center"><span>13554385058</span></td>'+
				                  '<td class="cel-center"><span>到付</span></td>'+
				                  '<td class="cel-center"><span> </span></td>'+
				                '</tr>';

            add.addRow('.J-resultContainer:first', rowContent);
		}
	});


	del.dialog('#J-deleteDialogTest', 'url.jspa', {
		msg: '你确认要删除这些数据吗？',
		callback: function(){
			del.deleteRows();
		}
	});

	update.dialog('#J-updateDialogTest', './修改-dialog.html', {
		height: 480,
		width: 600,
		title: 'XX修改功能',
		callback: function(data){
			// TODO 数据分析 & 页面局部刷新
			var rowContent =	'<tr>'+
				                  '<td class="cel-center"><input type="checkbox" class="inp-checkbox J-checkbox-one"></td>'+
				                  '<td class="cel-left"><span>左对齐2</span></td>'+
				                  '<td class="cel-right"><span>右对齐2</span></td>'+
				                  '<td class="cel-center"><span>杭州2</span></td>'+
				                  '<td class="cel-center"><span>浙2A 04572</span></td>'+
				                  '<td class="cel-center"><span>2817320001</span></td>'+
				                  '<td class="cel-center"><span>张三2</span></td>'+
				                  '<td class="cel-center"><span>13554385058</span></td>'+
				                  '<td class="cel-center"><span>到付</span></td>'+
				                  '<td class="cel-center"><span> </span></td>'+
				                '</tr>';

            update.updateRow(rowContent);
		}
	});

});