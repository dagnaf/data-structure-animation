var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    return (
      <svg className="legend" width="210" height="200" style={inlineStyle}>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="190"></rect>
        <g transform="translate(15,20)">
          <g transform="translate(0,0)">
            <g transform="scale(0.5)">
              <path d="M0,0L50,0" className="edge painter-selected" markerEnd="url(#arrow-end)"></path>
            </g>
          </g>
          <g transform="translate(0,25)">
            <g transform="scale(0.5)">
              <path d="M0,0L50,0" className="ine"></path>
            </g>
          </g>
          <g transform="translate(6,50)">
            <circle cx="0" cy="0" r="6" className="node highlighted"></circle>
          </g>

          <g transform="translate(6,75)">
            <circle cx="0" cy="0" r="6" className="node visited"></circle>
          </g>

          <g transform="translate(6,100)">
            <circle r="6" className="node"></circle>
            <path d="M0,0L0,-6A6,6 0 0,1 5.19,3Z" className="inq"></path>
          </g>
          <g transform="translate(6,125)">
            <circle r="6" className="node"></circle>
            <text x="2" y="-2" fontSize="10px">[a]</text>
          </g>
          <g transform="translate(6,150)">
            <circle r="6" className="node"></circle>
            <text x="2" y="-2" fontSize="10px">(a,b)</text>
          </g>
          <g transform="translate(0,5)">
            <text x="40" y="0">当前边</text>
            <text x="40" y="25">遍历边</text>
            <text x="40" y="50">当前结点</text>
            <text x="40" y="75">已访问的结点</text>
            <text x="40" y="100">访问中的结点</text>
            <text x="40" y="125">结点拓扑序号</text>
            <text x="40" y="150">时间戳和最远结点</text>
          </g>
        </g>
      </svg>
    )
  }
})
