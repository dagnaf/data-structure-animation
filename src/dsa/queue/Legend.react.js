var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    return (
      <svg className="legend" width="210" height="90" style={inlineStyle}>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="90"></rect>
        <g transform="translate(15,20)">
          <g transform="translate(12,0)">
            <path d="M0,12A12,12 0 1,1 0,-12A12,12 0 1,1 0,12M0,6A6,6 0 1,0 0,-6A6,6 0 1,0 0,6Z" fill="brown"/>
          </g>
          <g transform="translate(12,20)">
            <path d="M0,12A12,12 0 0,1 -12,0L-6,0A6,6 0 0,0 0,6Z" fill="coral"/>
          </g>
          <g transform="translate(3,55)">
            <path d="M0,0L8.5,-8.5A12,12 0 0,1 12,0Z" fill="coral"/>
          </g>

          <g transform="translate(0,5)">
            <text x="40" y="0">循环队列</text>
            <text x="40" y="25">队列元素</text>
            <text x="40" y="50">取出队首</text>
          </g>
        </g>
      </svg>
    )
  }
})
