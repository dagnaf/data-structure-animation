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
            <rect width="15" height="15" fill="green" />
            <text x="5" y="6" fontSize="10px" fill="black" >f</text>
            <text x="4" y="18" fontSize="10px" fill="green" >a</text>
          </g>
          <g transform="translate(0,25)">
            <rect y="5" width="8" height="8" fill="black" />
            <text x="1" y="6" fontSize="10px" fill="black" >s</text>
          </g>
          <g transform="translate(0,14)">
            <text x="40" y="0">字符和出现次数</text>
            <text x="40" y="25">树中结点和权值</text>
          </g>
        </g>
      </svg>
    )
  }
})
