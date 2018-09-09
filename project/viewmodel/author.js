define(function() {

    app = {

        depts: { //相关依赖
            common: [//公共依赖
                '~/lib/js/bootstrap-require.js',
                
            ],
            me: ['text!VIEW/auth/index'],//各个模块的依赖
            add: ['text!VIEW/auth/add']//各个模块的依赖
        },

        //公共初始化
        init: function (table,jui) {
            app.table = table;
            app.next();
        },
        //对应方法
        me: function (auth) {
            $('#content').html(auth);
            column = [
                {
                    checkbox: true, // 显示一个勾选框
                    align: 'center', // 居中显示
                },{
                    field: 'id', // 返回json数据中的name
                    title: 'ID', // 表格表头显示文字
                    search: true,
                },{
                    field: 'code',
                    title: '编号',
                    search: true,
                },{
                    field: 'name',
                    title: '名称',
                    search: true,
                }
            ];
             
            app.table.init('#table',column,'index.php');
        },

        add: function (add) {

           app.table.form.init('myModal',add,'添加');
        }

    };  

    return app;
});