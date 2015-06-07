var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    return (
      <svg className="legend" width="210" height="100" style={inlineStyle}>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="90"></rect>
        <g transform="translate(15,20)">
          <g transform="translate(6,0)">
            <circle cx="0" cy="0" r="6" fill="coral"></circle>
          </g>
          <g transform="translate(6,25)">
            <circle cx="0" cy="0" r="6" fill="deepskyblue"></circle>
          </g>
          <g transform="translate(6,50)">
            <circle cx="0" cy="0" r="6" fill="deepskyblue" stroke="gray" strokeWidth="4"></circle>
          </g>
          <g transform="translate(0,5)">
            <text x="40" y="0">已经出队的元素</text>
            <text x="40" y="25">队列中的元素</text>
            <text x="40" y="50">正在计算的元素</text>
          </g>
        </g>
      </svg>
    )
  }
})
