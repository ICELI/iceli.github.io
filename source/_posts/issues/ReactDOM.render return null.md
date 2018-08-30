
---
title: ReactDOM.render return null
date: Thu Aug 30 2018 20:59:23 GMT+0800 (CST)
tags:

---

```jsx
import React, { Component } from 'react';

export default class extends Component {

    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        
        let div = document.createElement( 'div' );
        document.body.appendChild( div );
        let aaa = ReactDOM.render( <p>123123</p>, div );
        console.log( aaa );// return null

        setTimeout( () => {
            let div = document.createElement( 'div' );
            document.body.appendChild( div );
            let bbb = ReactDOM.render( <p>123123</p>, div );
            console.log( bbb );// return element string
        }, 100 );
    }

    render() {
        return (
            <div>
                <h1>123</h1>
            </div>
        );
    }
}
```

Nested ReactDOM.render calls inside a component are no longer guaranteed to be synchronous, see [#12227](https://github.com/facebook/react/issues/12227).

Per https://reactjs.org/docs/react-dom.html#render, the return of render should not be relied upon and a top level `ref` should be used instead.

https://github.com/facebook/react/issues/12315

```jsx
 const ref = (notices) => {
    // console.log(notices, 'notices')
    // rerender 先unmout（此时notices为null），然后mount
    // notices && cb(notices)
    noticesInstance = notices
    cb(noticesInstance)
}

ReactDOM.render(<Notices ref={ref} />, div)
```