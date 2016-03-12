angular.module('wq-wall-directive', [])

// 跑男 -- 组件
.directive('wqRunmanRuleMembers', [function(){
	var linkFn = function($scope, $element, attrs, ctrl){
	}
	return {
		restrict: 'EA', 
		scope: {},
		controller: ['$interval', 'runmanService', function($interval, runmanService){
			var self = this;
			runmanService.getLastMembers().then(function(members){
				self.members = members;
			})
		}],
		controllerAs: 'memberCtrl',
		templateUrl: 'include/runmanRuleMemberFTL.html',
		link: linkFn
	}
}])
// 跑男 -- 组件
.directive('wqRunmanMember', ['$routeParams', 'runmanService', function($routeParams, runmanService){
	return {
		restrict: 'A', 
		scope: {},
		controller: ['$interval',function($interval){
			var self = this;
			runmanService.members.then(function(members){
				self.members = members;
			})

		}],
		controllerAs: 'memberCtrl',
		templateUrl: 'include/runmanMemberFTL.html',
		link: function(){}
	}
}])
// 跑男 -- 组件
.directive('wqRunmanDoll', ['$routeParams', 'runmanService', function($routeParams, runmanService){
	var linkFn = function($scope, $element, attrs, ctrl){
		var tl = new TimelineMax({onComplete: onComplete});
		
		var totalSec = $routeParams.secs;
		var durationSec = 10;
		var totalTimes = totalSec/durationSec;
		var percent = 100/totalTimes;
		var runData = []
		var runPercent = 0 ;
		var runTimes = 1;

		var index = attrs.index;

		tl.add(TweenLite.to($element[0], durationSec, {left: '+='+percent+'%', ease: Power0.easeNone, onComplete: function(){
			runPercent = percent;
		}}));


		function onComplete(){
			var max;
			var prev;
			var next;
			if( totalTimes !== runTimes ){
				runTimes += 1;
				runmanService.getRunMessage().then(function(runData){
					console.log('[%s]总共跑了 %s', index, runPercent);
					max = Math.max.apply(Math, runData)
					prev = runPercent;
					next = (runTimes*percent - prev)*(runData[index]/max);
					tl.add(TweenLite.to($element[0], durationSec, {left: '+='+(next)+'%', ease: Power0.easeNone, onComplete: function(){
						runPercent = prev + next;
					}}))
				});
			}else{
				console.log('>[%s]总共跑了 %s', index, runPercent);

				tl.add(TweenLite.to($element[0], 2, {left: '+=100%', ease: Power0.easeNone, onComplete: function(){
					tl.kill();
				}}));
				
			}
		}
	};
		return {
		restrict: 'A',
		scope: {},
		controller: ['$interval', function($interval){
		}],
		controllerAs: 'dollCtrl',
		link: linkFn
	}
}])
// 跑男 -- 组件
.directive('wqRunmanRank', ['$routeParams', 'runmanService', function($routeParams, runmanService){
	return {
		restrict: 'A',
		scope: {},
		controller: [function(){
			var self = this;
			runmanService.getRank().then(function(data){
				self.ranks = data;
			})
		}],
		controllerAs: 'rankCtrl',
		templateUrl: 'include/runmanRankFTL.html',
		link: function($scope, $element, attrs, ctrl){
			console.log(ctrl)
		}
	}
}])
