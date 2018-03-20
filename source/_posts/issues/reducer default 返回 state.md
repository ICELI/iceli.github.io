
---
title: reducer default 返回 state
date: Tue Mar 20 2018 15:10:42 GMT+0800 (CST)
tags:
 - redux
 - react
---

```js
import { resetShare } from 'utils/wxUtil'

const initialData = {
	shareStatus: false,
	goods: {}
}

export default function (state = initialData, action) {
	switch (action.type) {
		case 'SHARE_SHOW':
			return {
				shareStatus: true,
				goods: action.goods
			}
		case 'SHARE_HIDE':
			resetShare()
			return {
				shareStatus: false,
				goods: {}
			}
		default:
			return state
	}
}
```

所有action都会进入default，此时一定要回传state