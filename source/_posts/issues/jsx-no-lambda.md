
---
title: jsx-no-lambda
date: Sun Nov 11 2018 15:28:17 GMT+0800 (CST)
tags:
 - lint
 - react
---

"jsx-no-lambda"
在jsx中使用箭头函数，如果需要传参
```
customers.map( c => <Btn onClick={ () => this.deleteCust(c.id) } /> );
```

https://github.com/palantir/tslint-react/issues/96