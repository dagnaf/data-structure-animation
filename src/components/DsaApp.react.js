var React = require('react');
var Input = require('./Inputs.react');
var Scene = require('./Scene.react');
var Editor = require('./Editor.react');
var Header = require('./Header.react');
var Footer = require('./Footer.react');
var DsaStore = require('../stores/DsaStore');


function getDsaState () {
  return {
    fileIndex: DsaStore.getIndex(),
    isRunning: DsaStore.isRunning(),
    hasDemo: DsaStore.get('hasDemo'),
    isPlaying: DsaStore.get('isPlaying'),
    stamp: DsaStore.get('stamp'),
    length: DsaStore.get('length'),
    delay: DsaStore.get('delay'),
    activeLine: DsaStore.get('stamp')
  }
}

var DsaApp = React.createClass({
  getInitialState: function () {
    return getDsaState();
  },

  componentDidMount: function () {
    DsaStore.addChangeListener(this._onchange);
  },

  componentWillUnmount: function () {
    DsaStore.removeChangeListener(this._onchange);
  },

  render: function () {
    // if (this.state.isPlaying) _onNextStamp();
    return (
      <div className="wrapper">
        <Header
          val={this.state.delay}
          domain={[DsaStore.get('minDelay'), DsaStore.get('maxDelay')]}
        />
        <div className="wrapper-row">
          <Input />
          <Scene
            frame={DsaStore.getActiveFrame()}
            isRunning={this.state.isRunning}
            isPlaying={this.state.isPlaying}
            delay={this.state.delay}
            isFirstFrame={this.state.stamp === 0}
          />
          <Editor
            files={DsaStore.getFiles()}
            index={this.state.fileIndex}
            isRunning={this.state.isRunning}
            isPlaying={this.state.isPlaying}
            activeLine={DsaStore.getActiveLine()}
          />
        </div>
        <Footer
          val={this.state.stamp}
          delay={this.state.delay}
          domain={[0, this.state.length]}
          isRunning={this.state.isRunning}
          isPlaying={this.state.isPlaying}
        />
      </div>
    );
  },

  _onchange: function () {
    console.log('setstage ' + JSON.stringify(getDsaState()));
    this.setState(getDsaState());
  },

  // _onNextStamp: function () {
  //   DsaActions.
  // }
});

module.exports = DsaApp;
