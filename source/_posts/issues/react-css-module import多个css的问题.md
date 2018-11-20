
---
title: react-css-module import多个css的问题
date: Tue Nov 20 2018 10:35:43 GMT+0800 (CST)
tags:
 - react
 - css-module
---

```
import './CoolList.css'
import utils from 'Utils.css'

<ol styleName="cool-list utils.unstyled-list">
</ol>
```

>P.S. When I reference to style like pageStyles.regForm or like this it works. But I cannot merge multiple styles in one to use it in default namespace, without any prefixes.

Thats true, you cannot do that. You will need to use named imports or do the import from within the CSS. **You can use a CSS preprocessor for that, such as SASS.**

### 官方建议使用sass @import以避免在组件中同时依赖多个css文件

https://github.com/gajus/babel-plugin-react-css-modules/issues/80