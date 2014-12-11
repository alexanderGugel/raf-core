var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var _core = require('./index');

var _noop = function () {};

describe('index.js', function () {
    it('should expose EventEmitter', function() {
        assert(_core instanceof EventEmitter, 'Should be EventEmitter');
    });

    it('should beat when listener is attached to it', function (done) {
        var onBeat = function () {
            done();
        };

        _core.on('beat', onBeat);
    });
});
