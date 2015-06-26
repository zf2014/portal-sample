define(['jquery', 'utils', 'common/fast-jquery'], function($, S, $$){
	
	var $dom = $(document),
		$prevActiveGroup,
		$prevActiveLinker,
		$frame,
		navOpenClassname = 'sideNav-group__is-open',
		navLinkerActiveClassname = 'sideNav-linker__is-active',
		switching = false,
		linking = false
	;

	init();



	// 初始化
	function init(){

		setInitialAsideitemAndGroup()

		// 设置iframe初始页面
		$frame = $('#J-manageFrame');
		if(!$frame.attr('src') && $prevActiveLinker.length){
			$frame.attr('src', $prevActiveLinker.attr('href'));
		}


		bindNavFold();
		bindNavShow();
	}

	// 设置初始激活状态
	function setInitialAsideitemAndGroup(){
		var _asideId = global['asideId'],
			$item
		;

		$item = $('.J-group-linker[data-id='+_asideId+']');

		if($item.length){
			$prevActiveLinker = $item.addClass(navLinkerActiveClassname);
			$prevActiveGroup = $item.closest('.J-group').addClass(navOpenClassname);
		}else{
			$prevActiveGroup = $('.J-group' + '.' + navOpenClassname).first();
			if($prevActiveGroup.length === 0 ){
				$prevActiveGroup = $('.J-group:first').addClass(navOpenClassname);
			}
			$prevActiveLinker = $('.J-group-linker' + '.' + navLinkerActiveClassname).first();
			if($prevActiveLinker.length === 0 ){
				$prevActiveLinker = $('.J-group-linker:first').addClass(navLinkerActiveClassname);
			}
		}


	}


	// 导航栏折叠
	function bindNavFold(){
		$dom.on('click', '.J-group-title', function(){

			var $this, $group;

			if(switching === true){
				return false;
			}

			switching = true;
			
			$this = $$(this);
			$group = $this.closest('.J-group');

			if($group.hasClass(navOpenClassname)){
				$group.removeClass(navOpenClassname);
				$prevActiveGroup = null;
			}else{
				$group.addClass(navOpenClassname);
				if($prevActiveGroup && $prevActiveGroup.length){
					$prevActiveGroup.removeClass(navOpenClassname);
				}

				$prevActiveGroup = $group;
			}

			switching = false;
			return false;
		});
	}

	// 导航栏重定向
	function bindNavShow(){
		$dom.on('click', '.J-group-linker', function(){
			var $this;
			if(linking === true){
				return false;
			}

			$this = $(this);
			linking = true;

			if(!$this.hasClass(navLinkerActiveClassname)){
				$$(this).addClass(navLinkerActiveClassname);
				if($prevActiveLinker && $prevActiveLinker.length){
					$prevActiveLinker.removeClass(navLinkerActiveClassname)
				}
				$prevActiveLinker = $this;
			}

			linking = false;
			return true;
		});
	}

});

// define(['jquery', 'utils', 'common/fast-jquery'], function($, S, $$){
	
// 	var $dom = $(document),
// 		$prevActiveGroup,
// 		$prevActiveLinker,
// 		navOpenClassname = 'sideNav-group__is-open',
// 		navLinkerActiveClassname = 'sideNav-linker__is-active',
// 		switching = false,
// 		linking = false
// 	;

// 	init();



// 	// 初始化
// 	function init(){

// 		$prevActiveGroup = $('.J-group' + '.' + navOpenClassname).first();
// 		if($prevActiveGroup.lenght === 0 ){
// 			$prevActiveGroup = null;
// 		}

// 		$prevActiveLinker = $('.J-group-linker' + '.' + navLinkerActiveClassname).first();
// 		if($prevActiveLinker.lenght === 0 ){
// 			$prevActiveLinker = null;
// 		}

// 		bindNavFold();
// 		bindNavShow();
// 	}

// 	// 导航栏折叠
// 	function bindNavFold(){
// 		$dom.on('click', '.J-group-title', function(){

// 			var $this, $group;

// 			if(switching === true){
// 				return false;
// 			}

// 			switching = true;
			
// 			$this = $$(this);
// 			$group = $this.closest('.J-group');

// 			if($group.hasClass(navOpenClassname)){
// 				$group.removeClass(navOpenClassname);
// 				$prevActiveGroup = null;
// 			}else{
// 				$group.addClass(navOpenClassname);
// 				if($prevActiveGroup && $prevActiveGroup.length){
// 					$prevActiveGroup.removeClass(navOpenClassname);
// 				}

// 				$prevActiveGroup = $group;
// 			}

// 			switching = false;
// 			return false;
// 		});
// 	}

// 	// 导航栏重定向
// 	function bindNavShow(){
// 		$dom.on('click', '.J-group-linker', function(){
// 			var $this;
// 			if(linking === true){
// 				return false;
// 			}

// 			$this = $(this);
// 			linking = true;

// 			if(!$this.hasClass(navLinkerActiveClassname)){
// 				$$(this).addClass(navLinkerActiveClassname);
// 				if($prevActiveLinker && $prevActiveLinker.length){
// 					$prevActiveLinker.removeClass(navLinkerActiveClassname)
// 				}
// 				$prevActiveLinker = $this;
// 			}

// 			linking = false;
// 			return true;
// 		});
// 	}
// });