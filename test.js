/**
 * server.js
 */
/**主入口 js*/

var test = require("./server/serverUtil"); //获取路由模块

let staticWeb = test.listen({
    use: [],
    prepare:function (server) {
        server.get('/getName',(req,res,next)=>{
            res.send('Ok! You have got my name, just remember is !(Chivenh FhTiger)');
        });
    }
}); //开启服务(默认8049).
