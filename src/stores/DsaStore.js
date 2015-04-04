// DsaStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DsaConstants = require('../constants/DsaConstants');
var assign = require('object-assign');
var File = require('../models/File');
var Demo = require('../models/Demo');

var CHANGE_EVENT = 'change';

var _demo = new Demo();
var _file = new File();

var DsaStore = assign({}, EventEmitter.prototype, {
  getIndex: function () {
    return _file.index;
  },
  getFiles: function () {
    return _file.list;
  },
  get: function (prop) {
    return _demo[prop];
  },
  isRunning: function () {
    return _demo.isRunning();
  },
  getActiveLine: function () {
    return _demo.breakpoint();
  },

  emitChange: function() {
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

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case DsaConstants.DSA_UPDATE_FILE:
      _file.update(action.oldLine);
      _file.open(action.newIndex)
      DsaStore.emitChange();
      break;

    case DsaConstants.DSA_PAUSE_DEMO:
      _demo.pause();
      DsaStore.emitChange();
      break;

    case DsaConstants.DSA_PLAY_DEMO:
      if (_demo.isPlaying) break;
      _demo.play();
      DsaStore.emitChange();
      break;

    case DsaConstants.DSA_REPLAY_DEMO:
      _demo.replay();
      DsaStore.emitChange();
      break;

    case DsaConstants.DSA_UPDATE_STAMP:
      if (_demo.stamp === action.newStamp) break;
      _demo.stamp = action.newStamp;
      DsaStore.emitChange();
      break;

    case DsaConstants.DSA_RUN_DEMO:
      _demo.run(action.text);
      DsaStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = DsaStore;
