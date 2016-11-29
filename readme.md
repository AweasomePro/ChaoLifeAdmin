
## fetch

**fetch** 是新一代的网络请求api,用来代替 XMLHttpRequest。由于目前大多数浏览器原生还不支持它，所以
需要使用兼容库  **isomorphic-fetch**

```javascirpt
//每次使用fetch前都需要这样调用一下
import fetch from 'isomorphic0-fetch'
```
在底层，它在流量器端使用 **whatwg-techt** polyfill,在服务端使用 **node-fetch**,所以如果当你把
应用改成 同构 时，并不需要改变 API 请求
!!!warn
fetch polyfill 假设你已经使用 了 Promise 的polyfill。确保你使用 Promise polyfill 的一个简单的方法是在
所有应用代码前启用 Babel 的 ES6 polyfill
```javasciprt
// 在应用中其他如何代码执行前 调用
import 'babel-polyfill'
```

### use it like
```javascript
require('es6-promise').polyfill();
require('isomorphic-fetch');

fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });
```


## 异步Action 与 Middleware
在Store 中引入 Middleware, 使得 dispatch 方法 支持 函数或其他对象。