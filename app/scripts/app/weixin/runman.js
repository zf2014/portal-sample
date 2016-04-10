$(function(){


	var $num = $('#J-howToNum')
		,SHAKE_THRESHOLD = 400
		,lastUpdate = 0
		,shakeTimes = 0
		,x=y=z=lastX=lastY=lastZ=0
		,startTime = (new Date).getTime()
		,durationTime = 0
		,isStart = false
		,isEnd = false
		,checkTimeId
		,sendPointSec // 每次请求的时间点
		,sendPointInterval = 5 // 每隔5秒往后台发起一次请求
		,sendPointTimes = 0 // 每次间隔内摇动的次数
	;

	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion',deviceMotionHandler, false);
	}

	checkGameIsStart();

	function deviceMotionHandler(event) {

		if(isStart === false || isEnd === true){
			return;
		}

		var acceleration = event.accelerationIncludingGravity;
		var curTime = (new Date).getTime();
		var diffTime;
		var runTime;
		var secTime;
		var speed;
		var x = acceleration.x;
		var y = acceleration.y;
		var z = acceleration.z;

		runTime = ((curTime - startTime)/1000);
		secTime = Math.floor(runTime);
		
		if( (diffTime = curTime - lastUpdate) > 100 ){
			var speed = oneDecimal(Math.abs( x + y + z - lastX - lastY - lastZ ) / diffTime * 10000);
			var moveX = oneDecimal(Math.abs(x - lastX) / diffTime * 10000);
			var moveY = oneDecimal(Math.abs(y - lastY) / diffTime * 10000);
			var moveZ = oneDecimal(Math.abs(z - lastZ) / diffTime * 10000);
			if(speed > SHAKE_THRESHOLD && moveX > 100 && moveY > 100 && moveZ > 100){
				shakeTimes += 1;
				// runTime = ((curTime - startTime)/1000);
				secTime = Math.floor(runTime);
				// $num.html('时间:' + secTime)
				if(sendPointSec!==secTime && secTime !== 0 && secTime%sendPointInterval===0){
					sendPointSec = secTime;
					sendPointTimes = shakeTimes - sendPointTimes;
					sendGameInfo(sendPointTimes);
					sendPointTimes = shakeTimes;
				}
				isEnd = runTime > durationTime
				if(isEnd){
					isStart = false;
					sendGameInfo(shakeTimes - sendPointTimes, function(){
						// $num.html('总次数:' + shakeTimes)
					});
				}
			}
			lastX = x;
			lastY = y;
			lastZ = z;
			lastUpdate = curTime;
		}
	}


	function oneDecimal(n) {
	    var number = n;
	    var rounded = Math.round( number * 100 ) / 100;
	    return rounded;
  	}

  	function checkGameIsStart(){
  		checkTimeId && window.clearTimeout(checkTimeId);
  		checkTimeId = window.setTimeout(function(){
  			$.post('/portal/admin/screen/gameCenter!gameTimeResult.jspa', 
	  			{
					inviterCode: wxGlobal.inviterCode,
					gameCode: wxGlobal.gameCode,
					gameTime: wxGlobal.gameTime
				},
				// success
				function(ajaxRst){
					var timeState;
					if(ajaxRst.code == 0){
						timeState = ajaxRst.rst.timeState
						if(timeState == '0'){
							checkGameIsStart();
						}
						else if (timeState == '1'){
							durationTime = ajaxRst.rst.timeResult;
							isStart = true;
						}
						else if (timeState == '2'){
							console.debug('该游戏已结束！');
						}else{
							console.debug('未知状态%s', timeState);
						}
					}
				},
				'json'
  			)


  		}, 200)
  	}

  	function sendGameInfo(count, callback){
  		$.post('/portal/admin/screen/gameCenter!acceptGameInfo.jspa',
  			{
  				jsonParam: JSON.stringify({
  					openid:wxGlobal.openid,
					inviterCode: wxGlobal.inviterCode,
					gameCode: wxGlobal.gameCode,
					gameTime: wxGlobal.gameTime,
					gameResultCount: count
  				})
			},
			function(ajaxRst){

				if(ajaxRst.code === 0){
					if(callback && typeof callback === 'function'){
						callback();
					}
				}
			},
			'json')
  	}
})