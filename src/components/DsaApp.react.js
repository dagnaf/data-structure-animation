require('./DsaApp.react.less');
var React = require('react');
var DsaStore = require('../stores/DsaStore');
var Scene = require('../routers/require-dsa').required.scene;
var Editor = require('./Editor.react');
var Header = require('./Header.react');
var Footer = require('./Footer.react');

function getDsaState () {
  return {
    isRunning: DsaStore.isRunning(),
    isPlaying: DsaStore.get('isPlaying'),
    stamp: DsaStore.get('stamp'),
    length: DsaStore.get('length'),
    delay: DsaStore.get('delay'),
  }
}

module.exports = React.createClass({
  getInitialState: function () {
    return getDsaState();
  },

  componentDidMount: function () {
    console.log("event change registered");
    DsaStore.addChangeListener(this._onchange);
    this.setState(getDsaState());
  },

  componentWillUnmount: function () {
    DsaStore.removeChangeListener(this._onchange);
  },

  render: function () {
    return (
      <div className="wrapper">
        <Header
          val={this.state.delay}
          domain={[DsaStore.get('minDelay'), DsaStore.get('maxDelay')]} />
        <div className="wrapper-row">
          <Scene
            frame={DsaStore.getActiveFrame()[this.state.isPlaying ? 'next' : 'current']}
            delay={this.state.isPlaying ? this.state.delay*0.75 : 15}
            others={DsaStore.getOthers()} />
          <Editor
            files={DsaStore.getFiles()}
            isRunning={this.state.isRunning}
            isPlaying={this.state.isPlaying}
            activeLine={DsaStore.getActiveLine()} />
        </div>
        <Footer
          val={this.state.stamp}
          delay={this.state.delay}
          domain={[0, this.state.length]}
          isRunning={this.state.isRunning}
          isPlaying={this.state.isPlaying} />
      </div>
    );
  },

  _onchange: function () {
    console.log('setState ' + JSON.stringify(getDsaState()));
    this.setState(getDsaState());
  },
});
