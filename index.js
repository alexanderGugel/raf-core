//     raf-core 1.0.0
//     (c) 2014 Alexander Gugel <alexander.gugel@gmail.com>
//     raf-core may be freely distributed under the ISC license.

////////////////////////////////////////////////////////////////////////////////
// Core beats before every repaint, but ony if there are listeners attached   //
// to the "beat" event.                                                       //

var EventEmitter = require('events').EventEmitter;

var _requestAnimationFrame = function () {
    var window = window || {};

    var nativeRequestAnimationFrame =
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame;

    var before = 0;

    var _requestAnimationFrame = nativeRequestAnimationFrame ||
    function (callback, element) {
        var now = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (now - before));
        var id = setTimeout(function() { callback(now + timeToCall); },
        timeToCall);
        before = now + timeToCall;
        return id;
    };

    return _requestAnimationFrame;
}();

var _core = new EventEmitter();

// _core only beats when dead === false
var dead = true;

var beat = function () {
    _core.emit('beat');
    if (!dead) _requestAnimationFrame(beat);
};

_core.on('newListener', function (eventName) {
    if (dead && eventName === 'beat') {
        dead = false;
        beat();
    }
});

_core.on('removeListener', function (eventName) {
    if (eventName === 'beat' && EventEmitter.listenerCount(this, eventName) === 0) {
        dead = true;
    }
});

if (module) {
    module.exports = _core;
} else if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('raf-core', function () { return _core; });
} else {
    global.window.rafCore = _core;
}
