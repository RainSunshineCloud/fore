define(function() {

    app = {

        depts: { //相关依赖
            common: ['bootstrap-table', 'boot'],
            me: ['text!auth']
        },

        //公共初始化
        init: function (table, boot) {
            app.table = table;
            app.next();
        },

        me: function (auth) {
            $('#content').html(auth);
        },

        author: function () {

        }
    };









    return app;
});