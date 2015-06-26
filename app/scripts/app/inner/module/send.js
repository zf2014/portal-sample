define(['jquery', 'utils', 'common/fast-jquery'], function($, S, $$){
	var parentWin = window.parent;
	var send = {};

	send.dialogRetrun = function(data){
		var dialog = parentWin.currentDialog;
		dialog.hide(data);
	}

	return send;


})