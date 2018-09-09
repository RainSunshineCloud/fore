define([
    basePath + 'lib/js/bootstrap-table-develop/src/bootstrap-table.js'
],function (tables) {
    require([basePath + 'lib/js/bootstrap-table-develop/src/locale/bootstrap-table-zh-CN.js']);
    $.loadCss(basePath+'lib/js/bootstrap-table-develop/src/bootstrap-table.css');
    var table = {};
    table.toolList = {
        'btn_add':{
            func:function (){return table.toolList.actionFunc('btn_add');},
            title:'新增',
            classes:'default',
            icon:'plus'
        },
        'btn_edit':{
            func:function () {return table.toolList.actionFunc('btn_edit');},
            title:'修改',
            classes:'default',
            icon:'pencil'
        },
        'btn_delete':{
            func:function () { return table.toolList.actionFunc('btn_delete');},
            title:'删除',
            classes:'default',
            icon:'remove'
        }
    };

    table.toolList.actionFunc = function(ac) {
        action = table.param.defaultBar[ac].action;

        url = route.getRoute();
        url.pop();
        url.push(action);
        url = '/'+ url.join('/');
        route.dispatch('on',url);
    };

    table.tooldefault = function () {
        $.each(table.param.defaultBar,function (k,v) {
            if (table.toolList[k]) {
                tmp = table.toolList[k];
                table.tooladd(tmp.func,k,tmp.title,tmp.classes,tmp.icon,tmp.event);
            }
            
        });  
    }
    
    table.tooladd = function (func,id,title,classes,icon,event) {
        title = '<span class="glyphicon glyphicon-' + icon + '" aria-hidden="true"></span>' + title;
        var button = '<button id=' + id + ' type="button" class="btn btn-' + classes + '">'+ title + '</button>';
        $(button).appendTo(table.param.toolbar);
        event = event || 'click';
        $("#" + id).on(event,func);
    };

    table.param = {
        cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
        striped: false,  //表格显示条纹，默认为false
        pagination: true, // 在表格底部显示分页组件，默认false
        searchable:true,
        pageSize: 10, // 页面数据条数
        pageList:[1,5,10,20,50],
        showPaginationSwitch :true,
        smartDisplay:true,
        defaultBar:{'btn_add':{action:'add'},'btn_delete':{action:'del'},'btn_edit':{action:'edit'}},
        pageNumber: 1, // 首页页码
        sidePagination: 'server', // 设置为服务器端分页
        showToggle : true,
        showSearchButton:true,
        showRefresh: true,
        strictSearch : true,
        pagination : true,
        showColumns: true,
        locale: "zh-CN",
        searchable: true,
        toolbar: '#toolbar'
    };

    table.init = function (id,columns,url,queryFunc,defaults) {
        if (url.indexOf('http://') == -1) {
            url = conf.server + url;
        }
        
        if (!queryFunc) {
            queryFunc = function (params) {
                param = $('#search form').serializeArray();
                var p = {};
                $.each(param,function (k,v) {
                    if (v.value != '') {
                        p[v.name] = v.value;
                    }
                });

                return {
                    offset: params.offset,
                    limit: params.limit,
                    param:p, //定义传输的搜索参数
                    order:params.sortOrder,
                    sort:params.sortName
                };
                
            };
        }
        
        $.extend(table.param,defaults,{ url: url,queryParams:queryFunc,columns: columns});
        $(id).bootstrapTable(table.param);
        $($(id).find("th")[0]).parent().css({background:'#3A5FCD',color:'#fff'});
        

        var  txt = '<div class="panel-body" style="padding-bottom:0px;"><div  class="panel panel-default"><form  class="form-horizontal"><div class="form-group" style="margin-top:15px">';
        var flag = 0;
        $.each(table.param.columns ,function (k,v) {
            if (v.search) {
                flag = 1;
                txt += '<div class="col-sm-6 col-md-4" style="text-align:left;margin-top:10px;"><label class="control-label col-sm-5" for="txt_search_"'+v.field+'>'+v.title+'</label><div class="col-sm-7"><input type="text" class="form-control " id="txt_search_'+v.field+'" name="'+v.field+'" ></div></div>';  
            }
        });
         txt += '</div></form></div></div>';
        if (flag == 1) {
            $(txt).appendTo('#search');
        }
        $('#search').hide();
        table.tooldefault();
    }
    table.form = {};
    table.form.btn = {
        '关闭':{class: 'btn-default',id:'modal',close:true},
    };

    table.form.init = function (modal_id,content,title) {
        if ($('#'+modal_id).length >= 1) {
            $('#' + modal_id).modal();
            return ;
        }
        button = '';
        tmp = '<div class="modal fade" id="'+modal_id+'" tabindex="-1" role="dialog" aria-hidden="true">';
        $.each(table.form.btn,function(k,v) {

            if (v.close) {
                dismiss = 'data-dismiss="modal"';
            }
            if(!v.id) {
                v.id = '';
            }
            button +=  '<button type="button" class="btn '+v.class+'" id= "'+v.id+'" '+dismiss+'>'+k+'</button>';
        });
        tmp += '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">'+title+'</h4></div><div class="modal-body" style="max-height:400px;min-height:300px;overflow-y:scroll;">'+content+'</div><div class="modal-footer">'+button+'</div></div></div></div>'
        
        $(tmp).appendTo('body');
        $('#' + modal_id).modal();
    };

   
    return table;

});