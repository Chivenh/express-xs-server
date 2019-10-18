*The simple test creator based on `Express` by Chivenh FhTiger *

#### Example
```js
    let test = require("express-xs-test");
    let staticWeb = test.listen({
        use: ['/web', '/main','/modulesHandler'],//static source
        prepare:function (test) {
            //init before test created.
            test.post(/*......*/);
            test.get(/*......*/);
            /*add so on ......*/
        },
       port:8049    //port,if not set ,the default value is 8049.
    }); //开启服务(默认8049).

```
