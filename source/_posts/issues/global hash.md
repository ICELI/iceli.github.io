
---
title: global hash
date: Mon Sep 03 2018 19:10:03 GMT+0800 (CST)
tags:
 - webpack
---

### bug analyze
Compare with `APIPlugin.js` and `ExtendedAPIPlugin.js`, we will find this line:  
[ExtendedAPIPlugin.js#L35](https://github.com/webpack/webpack/blob/v3.3.0/lib/ExtendedAPIPlugin.js#L35)
```js
compilation.mainTemplate.plugin("global-hash", () => true);
```

so, `useChunkHash` fn always return `false`
[MainTemplate.js#L229](https://github.com/webpack/webpack/blob/v3.3.0/lib/MainTemplate.js#L229)
```js
useChunkHash(chunk) {
	const paths = this.applyPluginsWaterfall("global-hash-paths", []);
	return !this.applyPluginsBailResult("global-hash", chunk, paths); // always return `false`
}
```
then `noChunkHash` always `true`  
[Compilation.js#L1266](https://github.com/webpack/webpack/blob/v3.3.0/lib/Compilation.js#L1266)
```js
file = this.getPath(filenameTemplate, {
	noChunkHash: !useChunkHash,
	chunk
});
```
then `asset-path` plugin will throw the error
```
Cannot use [chunkhash] for chunk in '${path}' (use [hash] instead)
```
[TemplatedPathPlugin.js#L63](https://github.com/webpack/webpack/blob/v3.3.0/lib/TemplatedPathPlugin.js#L63)
```js
// replacePathVariables
if(data.noChunkHash && REGEXP_CHUNKHASH_FOR_TEST.test(path)) {
	throw new Error(`Cannot use [chunkhash] for chunk in '${path}' (use [hash] instead)`);
}
```

by commenting out the following line in the [ExtendedAPIPlugin.js#L35](https://github.com/webpack/webpack/blob/v3.3.0/lib/ExtendedAPIPlugin.js#L35), it works fine.

### hack fix:  
1. create `ExtendedAPIPlugin.js`
```js
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ConstDependency = require("webpack/lib/dependencies/ConstDependency");
const ParserHelpers = require("webpack/lib/ParserHelpers");
const NullFactory = require("webpack/lib/NullFactory");

const REPLACEMENTS = {
	__webpack_hash__: "__webpack_require__.h", // eslint-disable-line camelcase
	__webpack_chunkname__: "__webpack_require__.cn" // eslint-disable-line camelcase
};
const REPLACEMENT_TYPES = {
	__webpack_hash__: "string", // eslint-disable-line camelcase
	__webpack_chunkname__: "string" // eslint-disable-line camelcase
};

class ExtendedAPIPlugin {
	apply(compiler) {
		compiler.plugin("compilation", (compilation, params) => {
			compilation.dependencyFactories.set(ConstDependency, new NullFactory());
			compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
			compilation.mainTemplate.plugin("require-extensions", function(source, chunk, hash) {
				const buf = [source];
				buf.push("");
				buf.push("// __webpack_hash__");
				buf.push(`${this.requireFn}.h = ${JSON.stringify(hash)};`);
				buf.push("");
				buf.push("// __webpack_chunkname__");
				buf.push(`${this.requireFn}.cn = ${JSON.stringify(chunk.name)};`);
				return this.asString(buf);
			});
			// compilation.mainTemplate.plugin("global-hash", () => true);

			params.normalModuleFactory.plugin("parser", (parser, parserOptions) => {
				Object.keys(REPLACEMENTS).forEach(key => {
					parser.plugin(`expression ${key}`, ParserHelpers.toConstantDependency(REPLACEMENTS[key]));
					parser.plugin(`evaluate typeof ${key}`, ParserHelpers.evaluateToString(REPLACEMENT_TYPES[key]));
				});
			});
		});
	}
}

module.exports = ExtendedAPIPlugin;
```

2. import the custom plugin in `webpack.config.prod.js`
```
const ExtendedAPIPlugin = require('./ExtendedAPIPlugin');
// ...
plugins: [
    // ...
    new ExtendedAPIPlugin()
]
```