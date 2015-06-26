require(['jquery', 'common/fast-jquery', 'inner/send', 'common/autocomplete', 'common/validation'], function($, $$, send, autocomplete, validation){
	$('.J-dialogConfirm').click(function(){
		var result = '异步处理后返回的结果';
        var validator = validation('#J-mainForm', {group: 'oka'});


        if(validator.validate()){
            send.dialogRetrun(result);    
        }

        // console.log(validator.validate())
        // console.log(validation)
		// send.dialogRetrun(result);

	});



    init();


    function init(){
        $('.J-busiCodeInput').each(function(){
            doAutocomplete(this);
        });
    }

    // 激活目标输入框为可自动补全
    function doAutocomplete(ele){
        autocomplete(ele, {
            remote: {
                wildcard: '%q',
                url: '/exchange/servmanage/serviceregist/index!doQueryByCode.jspa?code=%q',
                filter: function(resp){
                    return resp.list;
                }
            },
            valueKey: 'code',
            limit: 5
        });

        $(ele).on('autocomplete:selected', function(event, data){
            var $codeTd = $$(this).closest('td'),
                $nameTd,
                $typeTd
            ;
            $nameTd = $codeTd.next();
            $typeTd = $nameTd.next();

            $nameTd.find('.J-busiName').text('name')
            $typeTd.find('.J-busiType').text('type')
        })
    }

});