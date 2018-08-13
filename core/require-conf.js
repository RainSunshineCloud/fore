//调用require.config 写入

require.config({
    context:'_',
    baseUrl: '/',
    paths: {
        'ko': "./core/lib/knockout-3.4.2",
        'jquery' : './core/lib/jquery',
        'text' : './core/lib/text',
        'domReady' : './core/lib/domReady',
        'director' : './core/lib/director',
        'router' : './project/router',
        'layout' : './core/layout',
        'conf'   : './conf/pub'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        director: {
            exports: 'director'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(['jquery','ko','domReady','director','router','conf'],function($,ko,domReady,director,router,conf){
    window.ko = ko;
    window.route =  Router();
    route.rs = router;
    domReady(function () {


        if (router.common) {
            bindVM = function (ps) {
                res = function () {
                    path = ps.split('/');
                    if (path[0] == '') {
                        path.shift();
                        if (path.length == 0) {
                            path = conf.index;
                        }
                    }
                    if (path.length > 1) {
                        action = path.pop();
                    }


                    require([conf.vmPath + path],function(controller) {

                        if (!controller.depts.common) {
                            controller.depts[action] = [];
                        }

                        if (!controller.depts[action]) {
                            controller.depts[action] = [];
                        }

                        if (!controller.viewPath) {
                            controller.viewPath = conf.viewPath;
                        }

                        if (!controller.jsPath) {
                            controller.jsPath = conf.jsPath;
                        }

                        res[action] = [];
                        res.common = [];
                        $.each(controller.depts[action],function(k,v) {

                            tmp = v.split('!');
                            if (tmp.length == 2) {
                                v = tmp[0] + '!' + controller.viewPath + tmp[1] + '.html';
                            } else {
                                v = controller.jsPath + tmp[0];
                            }

                            res[action].push(v);
                        });

                        $.each(controller.depts.common,function(k,v) {
                            tmp = v.split('!');
                            if (tmp.length == 2) {
                                if (tmp[0] == 'css') {
                                    v = 'text!' + controller.viewPath + tmp[1] + '.css';
                                } else {
                                    v = 'text!' + controller.viewPath + tmp[1] + '.html';
                                }

                            } else {
                                v = controller.jsPath + tmp[0];
                            }

                            res.common[k] = v;
                        });

                        controller.next = function(){
                            require(res[action],controller[action]);
                        };

                        require(res.common,controller.init);

                    });

                };

                return res;

            };

            require ([router.common],function() {



                $.each (router ,function (path,module) {
                    if (typeof module == "object") {
                        $.each (module,function (_,mo) {
                            p= path +'/'+ mo;
                            route.on(p,bindVM(mo));
                        });

                    }

                });
            });

        } else {


            $.each (router ,function (path,module) {

                route.on(path,bindVM(module));
            });
        }








    });

    route.init();
});


