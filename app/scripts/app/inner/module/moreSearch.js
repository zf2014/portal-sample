define(['jquery', 'utils', 'common/fast-jquery'], function($, S, $$){

	var $searchContainer = $('#J-searchContainer'),
		$searchMoreBtn = $('#J-moreSearch'),

		searchClassname = 'search__is-simple',
		searchOpenClassname = 'btn-search-more__is-open'
	;

	$searchMoreBtn.click(function(){
		var isopen = $searchMoreBtn.hasClass(searchOpenClassname);
		$searchContainer[isopen? 'addClass': 'removeClass'](searchClassname);
		$searchMoreBtn[isopen? 'removeClass': 'addClass'](searchOpenClassname);
	});

})