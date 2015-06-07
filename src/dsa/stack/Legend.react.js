var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    return (
      <svg className="legend" width="210" height="70" style={inlineStyle}>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="60"></rect>
        <g transform="translate(15,10)">
          <g transform="translate(0,0)">
            <rect width="30" height="15" fill="brown" />
          </g>
          <g transform="translate(0,25)">
            <rect width="30" height="15" fill="coral" />
          </g>
          <g transform="translate(0,14)">
            <text x="40" y="0">栈</text>
            <text x="40" y="25">数据</text>
          </g>
        </g>
      </svg>
    )
  }
})
