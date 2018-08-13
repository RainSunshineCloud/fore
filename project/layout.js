define([
        'text!./view/layout/headers.html',
        'text!./view/layout/nav.html',
        '../lib/js/bootstrap.min.js'
    ],function (header,nav) {
    $('#menu').html(nav);
    $('#header').html(header);
});