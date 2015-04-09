var React = require('react');
var D3 = require('d3');

function _item(d, i) {
  return 'translate(0,'+(350-i*50)+')';
}
function _text (d) {
  return d
};

module.exports = React.createClass({
  _zoom: function () {
      this.svg.attr("transform", "translate("
          + D3.event.translate
          + ")scale(" + D3.event.scale + ")");
  },
  createItems: function (s, option) {
    var items = s.append('g')
      .attr('class', 'item')
    items.append('rect')
      .attr('height', '50')
      .attr('width', '200');
    items.append('text')
      .attr('x', '100')
      .attr('y', '30')
      .attr('text-anchor', "middle")
    return items;
  },
  componentDidMount: function () {
    this.transitions = [];
    var self = this;
    window.scene = this;
    this.svg = D3.select(this.getDOMNode()).append('svg')
      .call(
        D3.behavior.zoom()
          .scaleExtent([0.1,10])
          .on("zoom", self._zoom)
      ).append('g');
    this.g = this.svg.append('g')
      .attr('transform', 'translate('+100+','+100+')');

    // Create stack layer
    this.g.append('rect')
      .attr('class', 'stack')
      .attr('height', 400)
      .attr('width', 200);

    // Create top layer
    this.gTop = this.g.append('g')
        .attr('class', 'top-pointer')
        .attr('transform', 'translate('+0+','+
          (350-this.props.frame.current.before.length*50)+')');
    this.gTop.append('rect')
      .attr('height', 50)
      .attr('width', 200);
    this.gTop.append('text')
      .attr('x', '100')
      .attr('y', '30')
      .attr('text-anchor', "middle")
      .text('栈顶');

    // Create items layer
    this.gItems = this.g.append('g').attr('class', 'items');

    // Create items
    var items = this.createItems(this.gItems.selectAll('g.item')
      .data(this.props.frame.current.before)
        .enter());
    items.attr('transform', _item);
    items.selectAll('text').text(_text);
    // console.log(this.props.frame.current);
  },
  componentDidUpdate: function(prevProps, prevState) {
    // Delay changes, do nothing
    if (this.props.delay !== prevProps.delay) {
      return;
    }
    // Stop previous transition if playing
    if (!this.props.isPlaying && prevProps.isPlaying) {
      this.transitions.forEach(function (t) {
        if (!!t && !!t.transition){
          t.transition().duration(0);
        }
      });
    }
    // clear transition array
    this.transitions = [];
    // Demo paused, show exact frame or replay or new demo start
    if (!this.props.isPlaying ||
      (!prevProps.isRunning && this.props.isRunning) ||
      this.props.isFirstFrame) {
      this.gTop.attr('transform', 'translate('+0+','+
          (350-this.props.frame.current.before.length*50)+')')
      // .classed('warning', false);

      this.createItems(this.gItems.selectAll('g.item')
        .data(this.props.frame.current.before)
          .enter());
      this.gItems.selectAll('g.item')
        .data(this.props.frame.current.before)
          .exit()
            .remove();
      this.gItems.selectAll('g.item')
        // .data(this.props.frame.current.before)
        .attr('transform', _item)
        .selectAll('text')
          .text(function (d) { return d});
    }
    // Demo playing or demo replay or demo start with animation
    // Animation name no specified, line animation
    if (!this.props.isPlaying || this.props.frame.current.name === undefined){
      return;
    }
    // Specified, add transitions
    switch (this.props.frame.current.name) {
      case 'push-ok':
        var item = this.createItems(this.gItems.selectAll('g.item')
          .data(this.props.frame.next.before)
          .enter())
        item.select('text').text(_text);
        item.attr('transform', 'translate(0,-50)')
          .transition().duration(this.props.delay)
          .attr('transform', _item);
        this.gTop
          .transition()
          .duration(this.props.delay)
          .attr('transform', _item(null, this.props.frame.next.before.length));
        this.transitions.push(this.gTop);
        this.transitions.push(item);
        break;
      case 'pop-empty': case 'peak-empty': case 'push-full':
        this.gTop
          .transition()
          .duration(this.props.delay/2)
          .attr('transform', _item(null,this.props.frame.next.before.length+1))
          .transition()
          .duration(this.props.delay/2)
          .attr('transform', _item(null,this.props.frame.next.before.length));
        this.transitions.push(this.gTop);
        break;
      case 'pop-top': case 'init-top':
        this.gItems.selectAll('g.item')
          .data(this.props.frame.next.before)
            .exit()
            .remove();
        this.gTop
          .transition()
          .duration(this.props.delay)
          .attr('transform', _item(null, this.props.frame.next.before.length));
        this.transitions.push(this.gTop);
        break;
      case 'peak-val':
        var item = this.createItems(this.gItems);
        var i = this.props.frame.current.before.length-1;
        var d = this.props.frame.current.before[i];
        item.select('text').text(d);
        item.attr('transform', _item(null,i))
          .transition()
          .duration(this.props.delay)
          .attr('transform', 'translate(0,-50)')
          .remove();
        this.transitions.push(item);
        break;
      // case 'init-top':

      //   break;
      default: break;
    }
    // this.props.frame.next.before
  },
  render: function () {
    return (
      <div className="scene"></div>
    )
  }
});
