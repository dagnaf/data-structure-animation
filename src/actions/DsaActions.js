var AppDispatcher = require('../dispatcher/AppDispatcher');
var DsaConstants = require('../constants/DsaConstants');
var debounce = require('lodash.debounce');

// FIXME: Put debounced in actions or in store? it has been a
//   mess!

// return a debounced function, after invoke with specified
// newStamp to update, it waits for delayed time
var createDebounced = function (delay) {
  return debounce(
    function (newStamp, length) {
      if (newStamp <= length) {
        AppDispatcher.dispatch({
          actionType: DsaConstants.DSA_UPDATE_STAMP,
          newStamp: newStamp
        });
      }
      AppDispatcher.dispatch(newStamp >= length ? {
        actionType: DsaConstants.DSA_PAUSE_DEMO,
      } : {
        actionType: DsaConstants.DSA_PLAY_DEMO,
        callback: createDebounced
      });
    }, delay);
};
var DsaActions = {

  updateFile: function (newIndex, oldLine) {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_UPDATE_FILE,
      newIndex: newIndex,
      oldLine: oldLine
    });
  },
  updateDelay: function (newDelay) {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_UPDATE_DELAY,
      newDelay: newDelay
    });
  },
  pauseDemo: function () {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_PAUSE_DEMO
    });
  },
  playDemo: function () {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_PLAY_DEMO,
      callback: createDebounced
    });
  },
  replayDemo: function () {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_UPDATE_STAMP,
      newStamp: 0
    });
    this.playDemo();
  },
  updateStamp: function (newStamp, pause) {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_UPDATE_STAMP,
      newStamp: newStamp,
      pause: pause
    });
  },
  runDemo: function (command, text, check) {
    // if (text && text.trim() === '') return;
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_PAUSE_DEMO,
      // end: true
    });
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_RUN_DEMO,
      command: command,
      text: text
    });
    this.replayDemo();
  }

};

module.exports = DsaActions;
