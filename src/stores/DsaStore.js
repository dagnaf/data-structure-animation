module.exports = function (arg) {

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DsaConstants = require('../constants/DsaConstants');
var assign = require('object-assign');
var File = require('../models/File')(arg);
var Demo = require('../models/Demo')(arg);

var CHANGE_EVENT = 'change';

var _demo = Demo;
var _file = File;

var DsaStore = assign({}, EventEmitter.prototype, {
  getIndex: function () {
    return _file.index();
  },
  getFiles: function () {
    return _file.list();
  },
  get: function (prop) {
    return _demo[prop]();
  },
  isRunning: function () {
    return _demo.isRunning();
  },
  getActiveLine: function () {
    return _demo.activeLine();
  },
  getActiveFrame: function () {
    return _demo.activeFrame();
  },
  getOthers: function () {
    return _demo.others();
  },
  emitChange: function(src) {
    console.log('%cEMIT FROM ' + src, 'color:red');
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});
var callback;
// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case DsaConstants.DSA_UPDATE_FILE:
      _file.update(action.oldLine);
      _file.open(action.newIndex)
      DsaStore.emitChange(action.actionType);
      break;

    case DsaConstants.DSA_PAUSE_DEMO:
      // If callback exists, then cancel, even if cancelled
      if (!!_demo.callback) _demo.callback.cancel();
      // Set isPlaying false
      if (_demo.isPlaying()) {
        _demo.pause();
        // if (action.end) _demo.update(_demo.length);
        DsaStore.emitChange(action.actionType);
      }
      break;

    case DsaConstants.DSA_PLAY_DEMO:
      // Set isPlaying true naively, stop will be handled by
      // dispatching new actions
      // _demo.play()
      // Save action.callback in _demo, it return a debounced
      //   function that dispatch DSA_UPDATE_STAMP (with
      //   newStamp), then DSA_PLAY_DEMO (with callback), when
      //   stamp equals length, it stops dispatching
      //   DSA_PLAY_DEMO, instead it dispatches DSA_PAUSE_DEMO
      _demo.callback = action.callback(_demo.delay());
      // FIXME: using callback that passed from actions, without
      //   relation to view, the callback was created in ACTIONS!
      // The _demo.callback(...) will execute in delay
      //   milliseconds
      _demo.callback(_demo.stamp()+1, _demo.length());
      if (!_demo.isPlaying()) {
        _demo.play()
        DsaStore.emitChange(action.actionType);
      }
      break;

    case DsaConstants.DSA_REPLAY_DEMO:
      // Should be empty, its real action has dispatch to other
      // actionType: DSA_UPDATE_STAMP & DSA_PLAY_DEMO
      break;

    case DsaConstants.DSA_UPDATE_STAMP:
      if (_demo.stamp() === action.newStamp) break;
      _demo.update(action.newStamp);
      // FIXME
      if (action.ignore) break;
      DsaStore.emitChange(action.actionType);
      break;
    // Actions have checked the text
    case DsaConstants.DSA_RUN_DEMO:
      _demo.run(action.command, action.text);
      DsaStore.emitChange(action.actionType);
      break;

    case DsaConstants.DSA_UPDATE_DELAY:
      _demo.setDelay(action.newDelay);
      DsaStore.emitChange(action.actionType);
    default:
      // no op
  }
});

return DsaStore;
// end of module exports
};

