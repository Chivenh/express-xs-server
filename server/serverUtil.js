/**
 * serverUtil
 */
/**
 * http://usejsdoc.org/
 * 使用express 创建服务器.监听端口,绑定路由.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');//此模块处理post请求体
var Server = express();

let webPath = path.resolve('./');

/**此两行代码必须写在下面所有路由的前面*/
Server.use(bodyParser.json()); // for parsing application/json
/** for parsing application/x-www-form-urlencoded
 *  and set post body limit size;*/
Server.use(bodyParser.urlencoded({ extended: true ,limit:"10mb"}));

/* GET home page. */
Server.get("/", (req, res, next)=>{
    //deprecated res.sendfile to sendFile
    res.sendFile( webPath+ "/index.html");
});

Server.all("*",(req, res, next)=>{
    let url = req.url;
    if(/.*[\u4e00-\u9fa5]+.*/.test(url)){
        //将中文路径转为可识别路径.
        url.replace(/([\u4e00-\u9fa5])/g, (str) => encodeURIComponent(str) );
        req.url=url;
    }
    next();
});

let modulesResource=/^\/modules\/(.+\..+)/;

//前端加载模块依赖,前端用modules为加载根目录,后端转向到node_modules
Server.get(modulesResource,(req,res,next)=>{
    let url=req.url.replace(modulesResource,'/node_modules/$1');
    if(/(?:%[A-F0-9]{2})+/.test(url)){
        //将中文路径还原
        url = decodeURIComponent(url);
    }
    try {
        res.sendFile(webPath+ url);
    }catch (e) {
        res.status(401).send('Sorry! You have no permission to request the source!');
    }
});

/*服务监听绑定*/
class Listen{
    constructor(server){
        this.server=server;
    }
    use(options=[]){
        options.forEach(opt=>{
            if(opt&&typeof opt==='string'&&opt.length){
                this.server.use(opt, express.static(opt.replace(/^\//, '')));
            }else if(opt&&opt.path&&opt.source){
                this.server.use(path, express.static(opt.source));
            }
        });
        return this;
    }
    port(port=8049){
        this.server.listen(port);
        console.info(`已开启[(${port})]服务!`);
        return  this;
    }
    prepare(prepare){
        prepare&&typeof prepare==='function'&&prepare(this.server);
        return this;
    }
}

const ListenInstance = new Listen(Server);

module.exports={
    exit:function () {
        // ListenInstance.server
    },
    listen:function({use,port,prepare}){
        ListenInstance.prepare(prepare).use(use).port(port);

        // console.info(staticWeb);
        var process = require("process"); //进程模块
        /**捕捉进程异常,进行相关处理,以免关掉整个主进程*/
        process.on('uncaughtException', (err) => {
            console.log('Caught exception: ' + err);
            setTimeout(() => {
                console.log("错误待修复...");
            }, 3000);
        });

        return ListenInstance.server;
    }
};

module.exports.utils={
    fs: require("./unlinkDirSync")
};