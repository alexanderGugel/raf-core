[![Build Status](https://travis-ci.org/alexanderGugel/raf-core.svg)](https://travis-ci.org/alexanderGugel/raf-core)

# raf-core

> Request Animation Frame as a beating heart.

## Idea

Using requestAnimationFrame in a similar way as setTimeout is counterintuitive
and cumbersome. This package introduces a new way of performing certain actions
on every repaint by wiring up an EventEmitter as a single source of truth for
window repaints.

## Installation

- **Node.js, browserify** `npm install raf-core --save` (yes, it even works on servers)
- **Require.js** `require(["raf-core"], ...`

## Example

```javascript
var rafCore = require('raf-core');

// Executes a function on every window repaint
rafCore.on('beat', function () {
    console.log('Repaint');
});
```

Since rafCore is an instance of Node's EventEmitter, you can exploit all its
features.

```javascript
var rafCore = require('raf-core');

var onBeat = function () {
    console.log('Repaint');
};

rafCore.on('beat', onBeat);

// Removes the onBeat event listener after 5 seconds
setTimeout(function () {
    rafCore.removeEventListener('beat', onBeat);
}, 5000);
```
