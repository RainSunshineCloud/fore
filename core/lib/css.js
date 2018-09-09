define(function() {
	return function (path) {
		$('<link>').attr({
        	type: 'text/css',
        	href:  path,
        	rel : 'stylesheet'
    	}).appendTo("head");
	}
});