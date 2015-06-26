require(['jquery', 'inner/add', 'inner/delete', 'inner/update'], function($, add, del, update){


	add.dialog('#J-addDialogBtn', './新增子账号-dialog.html', {
		height: 250,
		width: 500,
		title: '新增子账号',
		callback: function(data){
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

	update.dialog('#J-updateDialogBtn', './修改子账号-dialog.html', {
		height: 250,
		width: 500,
		title: '修改子账号',
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


	update.dialog('#J-roleDialogBtn', './授权子账号-dialog.html', {
		height: 250,
		width: 500,
		title: '授权子账号',
		callback: function(data){
			// TODO
		}
	});
});