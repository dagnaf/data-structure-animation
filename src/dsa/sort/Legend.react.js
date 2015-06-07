var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    return (
      <svg className="legend" width="210" height="120" style={inlineStyle}>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="115"></rect>
        <g transform="translate(15,20)">
          <g transform="translate(0,0)">
            <line className="pt" stroke="#1f77b4" strokeWidth="5" strokeOpacity="0.5" markerEnd="url(#i-arr)" x1="0" x2="20" y1="0" y2="0"></line>
          </g>
          <g transform="translate(0,25)">
            <line className="pt" stroke="#ff7f0e" strokeWidth="5" strokeOpacity="0.5" markerEnd="url(#j-arr)" x1="0" x2="20" y1="0" y2="0"></line>
          </g>
          <g transform="translate(0,50)">
            <line className="mid" strokeOpacity="1" x1="0" x2="32" y1="0" y2="0" stroke="rgb(0, 191, 255)" strokeWidth="5" strokeDasharray="5px, 1.5px"></line>
          </g>

          <g transform="translate(0,68)">
            <rect width="15" height="15" fill="none" stroke="#1f77b4" />
          </g>
          <g transform="translate(0,5)">
            <text x="40" y="0">i 指针</text>
            <text x="40" y="25">j 指针</text>
            <text x="40" y="50">分区线</text>
            <text x="40" y="75">已完成排序的元素</text>
          </g>
        </g>
      </svg>
    )
  }
})
