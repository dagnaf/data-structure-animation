var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    var cursorTag = '<use xlink:href="#cursor">';
    var crossTag = '<use xlink:href="#cross">';
    var a = 12, b = 6, sqrt3=Math.sqrt(3);
    var d = 'M'+[
      [0,0],[0,a],[sqrt3*a/6,-a/6],[b/2,b/2*sqrt3],[sqrt3*a/6,-a/6],[-b/2,-b/2*sqrt3],[sqrt3*a/6,-a/6]
    ].map(function (d) { return d.toString(); }).join('l')+'z';
    return (
      <svg className="legend" width="210" height="230" style={inlineStyle}>
        <defs>
          <path id="cursor" d={d} stroke="black" strokeWidth="1.2" fill="white"></path>
          <g id="cross">
            <path d="M-6,-6L6,6" stroke="gray" strokeWidth="2"></path>
            <path d="M-6,6L6,-6" stroke="gray" strokeWidth="2"></path>
          </g>
        </defs>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="210"></rect>
        <g transform="translate(15,20)">
          <g transform="translate(8,0)">
            <path d="M2,0L8,0" markerEnd="url(#arrow-end)" strokeWidth="2" stroke="black"></path>
            <path d="M-2,0L-8,0" markerEnd="url(#arrow-end)" strokeWidth="2" stroke="black"></path>
            <path d="M0,2L0,8" markerEnd="url(#arrow-end)" strokeWidth="2" stroke="black"></path>
            <path d="M0,-2L0,-8" markerEnd="url(#arrow-end)" strokeWidth="2" stroke="black"></path>
          </g>
          <g transform="translate(6,25)">
            <line x1="0" y1="0" x2="10" y2="10" stroke="black" strokeWidth="3"></line>
            <circle cx="0" cy="0" r="6" fill="white" stroke="black" strokeWidth="2"></circle>
          </g>
          <g transform="translate(6,50)">
            <circle cx="0" cy="0" r="6" className="node"></circle>
            <g transform="translate(2,-2)" dangerouslySetInnerHTML={{__html: cursorTag}}></g>
          </g>

          <g transform="translate(6,75)">
            <circle cx="0" cy="0" r="6" className="node" style={{opacity:"0.33"}}></circle>
            <circle cx="6" cy="0" r="6" className="node" style={{opacity:"0.67"}}></circle>
            <circle cx="12" cy="0" r="6" className="node" style={{opacity:"1"}}></circle>
            <g transform="translate(12,-2)" dangerouslySetInnerHTML={{__html: cursorTag}}></g>
          </g>
          <g transform="translate(6,100)">
            <circle cx="0" cy="0" r="6" className="node painter-selected" style={{opacity:"1"}}></circle>
            <g transform="translate(0,0)" dangerouslySetInnerHTML={{__html: crossTag}}></g>
          </g>
          <g transform="translate(6,125)">
            <path d="M0,0L20,0" markerEnd="url(#arrow-end)" stroke="black" strokeWidth="2"></path>
            <circle r="6" className="node"></circle>
          </g>
          <g transform="translate(0,150)">
            <g transform="scale(0.5)">
              <path d="M0,0L40,0" className="edge painter-selected" markerEnd="url(#arrow-end)" stroke="black" strokeWidth="2"></path>
            </g>
            <g transform="translate(10,0)" dangerouslySetInnerHTML={{__html: crossTag}}></g>
          </g>
          <g transform="translate(0,175)">
            <g transform="scale(0.5)">
              <path d="M0,0L40,0" className="edge painter-selected" markerEnd="url(#arrow-end)" stroke="black" strokeWidth="2"></path>
            </g>
            <text x="3" y="5">a</text>
          </g>
          <g transform="translate(0,5)">
            <text x="40" y="0">拖动空白区域</text>
            <text x="40" y="25">滚动鼠标轴</text>
            <text x="40" y="50">双击空白区</text>
            <text x="40" y="75">shift键后拖动结点</text>
            <text x="40" y="100">退格键删除结点</text>
            <text x="40" y="125">结点上新建边</text>
            <text x="40" y="150">退格键删除边</text>
            <text x="40" y="175">回车键输入权值</text>
          </g>
        </g>
      </svg>
    )
  }
})
