#前端手脚架
1.使用director.js / require.js / jquery.js /knockout.js 作为核心，搭建手脚架。
2.通过require-conf.js 调用对应的viewmodel。

3. project/viewmodel 采用author 的组织架构。

4. project/view/ 请自行通过jquery 进行调用。

5. router.js 是路由路径

6. project/layout.js 用于搭载整体框架 (只会执行一次);

7. project/common.js 用于公共执行(每次调用路由都会执行);

8. conf/pub.js 是公共的参数。

9 通过核心组件暴露出以下几个全局函数

a. conf(对应pub.js)
b. route (对用于director.js 和 router.js)
c. $ (对应于jq 和 自定义方法$.loadCss)
d. ko (对应于konckout.js)

10. 除核心组件外，还增加了一些功能组件 bootstrap 