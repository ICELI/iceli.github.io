---
title: vuex 文档速读
date: 2017-06-03 19:39:42
tags:
 - vue2
 - vue
 - vuex
---

# store
每个应用将仅仅包含一个 store 实例

```js
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

然而，这种模式导致组件依赖的全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。（ng-seed里的服务:cry:）

通过Vue的store配置项，可以实现全局注入，直接通过this.$store获取store

## state
**如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时会 store 或模块间数据互相污染的问题。**

实际上这和 Vue 组件内的 data 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（==仅 2.3.0+ 支持==）：
```js
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}
```

如何在 Vue 组件中展示状态呢？由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
```js
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```
mapState  Helper（辅助函数） => computed

## getters
『getters』（可以认为是 store 的计算属性）
 ```js
 computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
 ```
 mapGetters Helper（辅助函数） => computed
 ```js
 mapGetters({
  // 映射 this.doneCount 为 this.$store.getters.doneTodosCount
  doneCount: 'doneTodosCount'
})
 ```

## Mutations commit

在 Vuex 中，mutation 都是**同步事务**

每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数

Mutations 需遵守 Vue 的响应规则

mapMutations Helper（辅助函数） => methods 映射为 store.commit
this.increment() 为 this.$store.commit('increment')

## Actions dispatch

Action 类似于 mutation，不同在于：

**Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。**

通过提交 mutation 来记录 action 产生的**副作用（即状态变更）**。

mapActions Helper（辅助函数） => methods 映射为 store.dispatch

## Modules
Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

命名空间 namespaced: true
```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },
      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,
          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

模块动态注册 store.registerModule
vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

## 其它

在发布阶段，你需要使用 Webpack 的 DefinePlugin 或者是 Browserify 的 envify 使 process.env.NODE_ENV !== 'production' 为 false

内置 Logger 插件
如果正在使用 vue-devtools，你可能不需要此插件。
