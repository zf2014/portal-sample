define(['jquery', 'utils', 'common/fast-jquery', 'common/modal'], function($, S, $$, modal){
    var uploadHeight = 28,
    	$uploadForms = $('.J-ajaxUploadForm')
	;

	$uploadForms.each(function(){
	    var $target = $($$(this).data('upload-placeholder')),
	        cssObj = $target.offset()
	    ;
	    cssObj.position = 'absolute';
	    cssObj['margin-top'] = -(uploadHeight - $target.height() )/2;
	    cssObj['z-index'] = 99;
	    // cssObj.display = 'block';
	
	    $$(this).css(cssObj).show()
	    $target.css('visibility', 'hidden');

	    $('[name='+$$(this).attr('target')+']').on('load', function(){
	    	// TODO
	    	console.log('上传成功!')
	    })
	});
	
	$uploadForms.on('change', 'input[type=file]', function(){
	    var $form = $$(this).closest('form'),
	    	fileName = $$(this).val(),
	    	supportTypes = $$(this).data('support').toUpperCase() || '*',
	    	fileNameSuffix
	    ;
	    fileNameSuffix = fileName.substring(fileName.indexOf(".") + 1).toUpperCase();

	    if(supportTypes === '*' || !!~supportTypes.indexOf(fileNameSuffix)){
	    	if(typeof __ajaxUploadErrorProcess === 'undefined' || typeof __ajaxUploadErrorProcess !== 'function' ){
		    	window.__ajaxUploadErrorProcess = function(errMsg){
		    		modal.fail(errMsg || "上传失败！");
		    		return;
		    	}
	    	}
	    	$form.submit();
	    }else{
	    	modal.fail("请选择正确的文件格式！");
	    }
	});
	
});



