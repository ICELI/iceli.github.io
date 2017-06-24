---
title: webpack loader sass+postcss 报错 Module build failed Unknown word
date: 2017-06-24 11:04:40
tags:
 - sass-loader
 - postcss-loader
 - webpack
---

代码：
```scss
@function zeroize($i) {
  @if ($i < 10) {
    $i : '0' + $i
  }
  @return $i
}

@for $i from 1 through 9 {
  &.nav#{ zeroize($i) } i {
    background: url('./sprite/float-nav#{ zeroize($i) }.png')
  }
}
```

报错：
```bash
Module build failed: Unknown word (73:15)

  71 |     }
  72 |     @for $i from 1 through 9 {
> 73 |       &.nav#{ zeroize($i) } i {
     |               ^
  74 |         background: url('./sprite/float-nav#{ zeroize($i) }.png')
  75 |       }
```
当同时用了sass+postcss时，需要注意loader的顺序，需**先用`sass`再用`postcss`**。

否则当`postcss-sprites`和`sass`方法都对背景图片做处理时，sass语法就会报错。

所以得先让`sass`处理完生成css代码后，再通过`postcss-sprites`对代码中的图片做雪碧图处理。

```js
{
    test: /\.scss$/i,
    loader: extractSASS.extract(['css', 'postcss!sass?config=sassLoaderConfig'])
    // 在loader中先用的放右边，后用的放左边
}
```