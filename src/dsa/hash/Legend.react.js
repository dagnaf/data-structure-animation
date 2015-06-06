var React = require('react');
module.exports = React.createClass({
  render: function () {
    var inlineStyle = {
      display: this.props.show ? 'block' : 'none'
    };
    return (
      <svg className="legend" width="210" height="190" style={inlineStyle}>
        <rect className="outline" stroke="black" x="0" y="0" width="200" height="160"></rect>
        <g transform="translate(15,10)">
          <g transform="translate(0,0)">
            <rect width="15" height="15" fill="green" />
          </g>
          <g transform="translate(0,25)">
            <rect width="15" height="15" fill="deepskyblue" />
          </g>
          <g transform="translate(0,50)">
            <rect width="15" height="15" fill="red" />
          </g>

          <g transform="translate(0,83)">
            <path markerEnd="url(#arrow)" d="M0,0L20,0" stroke="deepskyblue" strokeWidth="5"/>
          </g>

          <g transform="translate(0,100)">
            <rect width="15" height="15" fill="coral" stroke="black" />
          </g>
          <g transform="translate(0,125)">
            <rect width="15" height="15" fill="coral" />
            <text x="4" y="12" fontSize="10px" fill="red" >X</text>
          </g>
          <g transform="translate(0,14)">
            <text x="40" y="0">操作成功</text>
            <text x="40" y="25">当前输入</text>
            <text x="40" y="50">操作失败</text>
            <text x="40" y="75">散列函数</text>
            <text x="40" y="100">循环指针</text>
            <text x="40" y="125">已删除</text>
          </g>
        </g>
      </svg>
    )
  }
})
