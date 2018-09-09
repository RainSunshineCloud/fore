//调用require.config 写入
var basePath = "/git/fore/";
require.config({
    context:'_',
    baseUrl: '/',
    paths: {
        'ko': basePath + "core/lib/knockout-3.4.2",
        'jquery' : basePath + 'core/lib/jquery',
        'text' : basePath + 'core/lib/text',
        'css'  : basePath + 'core/lib/css',
        'domReady' : basePath + 'core/lib/domReady',
        'director' : basePath + 'core/lib/director',
        'router' : basePath + 'project/router',
        'conf'   : basePath + './conf/pub',
        'commonFile': basePath + 'project/common'
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

require(['jquery','ko','domReady','director','router','conf','css','commonFile'],function($,ko,domReady,director,router,conf,css,commonFile){
    window.ko = ko;
    window.route =  Router();
    window.conf = conf;
    route.rs = router;
    $.loadCss = css;

     bindVM = function (ps) {
                
                
                res = function () {
                    
                    if (conf.needLogIn && !commonFile.Login()) {
                        ps = route.rs.login;
                    } 
                   
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

                        res[action] = [];
                        res.common = [];
                        $.each(controller.depts[action],function(k,v) {
                            v = v.replace('~/',basePath).replace('VIEW/',controller.viewPath);
                            tmp = v.split('!');
                            if (tmp.length == 2) {
                                v = tmp[0] + '!' + tmp[1] + '.html';
                            } else {
                                v = tmp[0];
                            }

                            res[action].push(v);
                        });

                        $.each(controller.depts.common,function(k,v) {
                            v = v.replace('~/',basePath).replace('VIEW/',controller.viewPath);

                            tmp = v.split('!');

                            if (tmp.length == 2) {
                                if (tmp[0] == 'css') {
                                    v = tmp[1] + '.css';
                                    $.loadCss(v);
                                    return;
                                } else  {
                                    v = 'text!'  + tmp[1] + '.html';
                                }

                            } else {
                                v = tmp[0];
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
    domReady(function () {
        if (router.common) {
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


