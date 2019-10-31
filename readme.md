*The simple server creator based on `Express` by Chivenh FhTiger*

#### Example
```js
    let testServer = require("express-xs-server");
    let staticWeb = testServer.listen({
        use: ['/web', '/main','/modulesHandler'],//static source
        prepare:function (testServer) {
            //init before test created.
            testServer.post(/*......*/);
            testServer.get(/*......*/);
            /*add so on ......*/
        },
       port:8049    //port,if not set ,the default value is 8049.
    }); //开启服务(默认8049).

```
