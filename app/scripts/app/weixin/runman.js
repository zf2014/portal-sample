$(function(){


	var $num = $('#J-howToNum')
		,SHAKE_THRESHOLD = 800
		,lastUpdate = 0
		,shakeTimes = 0
		,x=y=z=lastX=lastY=lastZ=0
		,startTime = (new Date).getTime()
	;



	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion',deviceMotionHandler, false);
	}

	function deviceMotionHandler(event) {
		var acceleration = event.accelerationIncludingGravity;
		var curTime = (new Date).getTime();
		var diffTime;
		var speed;
		var x = acceleration.x;
		var y = acceleration.y;
		var z = acceleration.z;
		if( (diffTime = curTime - lastUpdate) > 200 ){
			var speed = oneDecimal(Math.abs( x + y + z - lastX - lastY - lastZ ) / diffTime * 10000);
			var moveX = oneDecimal(Math.abs(x - lastX) / diffTime * 10000);
			var moveY = oneDecimal(Math.abs(y - lastY) / diffTime * 10000);
			var moveZ = oneDecimal(Math.abs(z - lastZ) / diffTime * 10000);
			if(speed > SHAKE_THRESHOLD && moveX > 100 && moveY > 100 && moveZ > 100){
				shakeTimes += 1;
				$num.html(shakeTimes + '[消耗时间: '+((curTime - startTime)/1000)+'秒]')
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

})