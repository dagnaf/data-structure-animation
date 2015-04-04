var AppDispatcher = require('../dispatcher/AppDispatcher');
var DsaConstants = require('../constants/DsaConstants');

var DsaActions = {

  updateFile: function (newIndex, oldLine) {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_UPDATE_FILE,
      newIndex: newIndex,
      oldLine: oldLine
    });
  },
  pauseDemo: function () {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_PAUSE_DEMO
    });
  },
  playDemo: function () {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_PLAY_DEMO
    });
  },
  replayDemo: function () {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_REPLAY_DEMO
    });
  },
  updateStamp: function (newStamp, pause) {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_UPDATE_STAMP,
      newStamp: newStamp,
      pause: pause
    });
  },
  runDemo: function (text) {
    AppDispatcher.dispatch({
      actionType: DsaConstants.DSA_RUN_DEMO,
      text: text
    });
  }

};

module.exports = DsaActions;
