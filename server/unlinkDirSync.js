/**
 * unlinkDirSync
 * 扩展fs,增加同步清空目录下的所有文件的方法
 */
let fs =require("fs");

let unlinkDirSync= fs.unlinkDirSync=function (dir) {
    if(fs.existsSync(dir)){
        let files = fs.readdirSync(dir);
        files.forEach((file,index)=>{
            let path = dir+'/'+file;
            if(fs.statSync(path).isDirectory()){
                return unlinkDirSync(path);//为了触发尾调用优化.
            }
            return fs.unlinkSync(path);
        });
    }
};

module.exports=fs;