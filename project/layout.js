define([
        'text!./view/layout/nav.html',
        'text!./view/layout/siderbar.html',
        'lib/js/bootstrap.min.js'
    ],function (nav,siderbar,layout) {
    $('#nav').html(nav);
    $('#sidebar-wrapper').html(siderbar);

    $('.sidebar-menu li').on("click",function () {
        tree = $(this).hasClass('treeview');
        $('.sidebar-menu li a').removeClass('active');
        if (tree) {
            $('li.treeview').not(this).removeClass('menu-open');
            $(this).toggleClass('menu-open');
            $('li.treeview').not(this).removeClass('active');
            $(this).addClass('active');
            $(this).siblings().find('ul.treeview-menu').slideUp();
            $(this).find('ul.treeview-menu').slideToggle();
        } else {
            
            $(this).find('a').addClass('active');
        }

        event.stopPropagation();
        return ;
    });
    
    $('.sidebar-toggle').on('click',function() {
        if ($(window).width() < 678 ) {
            $('body').toggleClass('sidebar-open');
        } else {
            $('body').toggleClass('sidebar-collapse');
        }
      
    });
   
});



