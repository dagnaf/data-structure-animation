var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    return (
      <svg className="legend" width="210" height="120" style={inlineStyle}>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="110"></rect>
        <g transform="translate(15,10)">
          <g transform="translate(0,0)">
            <rect width="45" height="15" fill="brown" />
          </g>
          <g transform="translate(0,25)">
            <rect width="45" height="15" fill="coral" />
          </g>
          <g transform="translate(0,50)">
            <rect width="45" height="15" fill="deepskyblue" />
          </g>
          <g transform="translate(0,75)">
            <rect width="15" height="15" fill="tomato" />
            <rect x="15" width="15" height="15" fill="coral" />
            <rect x="30" width="15" height="15" fill="deepskyblue" />
          </g>
          <g transform="translate(0,14)">
            <text x="60" y="0">栈</text>
            <text x="60" y="25">数据</text>
            <text x="60" y="50">当前字符</text>
            <text x="60" y="75">优先级表</text>
          </g>
        </g>
      </svg>
    )
  }
})
