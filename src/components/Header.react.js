var React = require('react');

module.exports = React.createClass({

  render: function () {
    var inlineStyle = {
        width: 0 + '%'
    };
    return (
      <header>
        <div className="header-left"></div>
        <div className="range-bar header-middle">
          <div className="progress" style={inlineStyle}></div>
        </div>
        <div className="header-right"></div>
      </header>
    )
  }
});
