require("./painter.less");
var svgDom;
var weighted;
var directional;
var width;
var height;
var graph = {};
var gtranslate = [0, 0];
var gscale = 1;
var radius = 15;
var linkDistance = 150;
var charge = -600;
var markerWidth = 3;
var selected;
var _onSelected;
var force = d3.layout.force()
    .linkDistance(linkDistance)
    .charge(charge)
    .on("tick", tick);
var drag = d3.behavior.drag()
    .origin(function (d) { return d; })
    .on("dragstart", _onDragstart)
    .on("drag", _onDrag)
    .on("dragend", _onDragend);
var zoom = d3.behavior.zoom()
    .scaleExtent([.1,10])
    .on("zoom", _onZoom);
var svg;
var gbase;
var gedges;
var gnodes;
var gtexts;
var source = undefined;
var dragging = false;
var offsetTop = 0;
var offsetLeft = 0;
var container;

function init (opt) {
  container = opt.container || document.body;
  svgDom = d3.select(opt.container).append("svg").node();
  weighted = opt.weighted || false;
  directional = opt.directional || false;
  width  = opt.width || svgDom.clientWidth || opt.container.clientWidth;
  height = opt.height || svgDom.clientHeight || opt.container.clientHeight;
  offsetLeft = opt.offsetLeft || 0;
  offsetTop = opt.offsetTop || 0;

  graph.nodes = d3.range(opt.n || 5).map(function () { return {}; })
  graph.edges = opt.edges || d3.range(5).map(function (i) { return {
    source: graph.nodes[i], target: graph.nodes[(i+1)%5]
  }});

  selected = undefined;
  _onSelected = opt._onSelected || undefined;
  source = undefined;
  dragging = false;

  svg = d3.select(svgDom)
    .call(zoom)
    .on("dblclick.zoom", null)
    .on("dblclick.svg", _onDblclickSvg)
    .append("g");
  var defs = svg.append("defs");
  defs.append("marker")
      .attr("id", "arrow-end")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 7/*10*/)
      .attr("refY", 0)
      .attr("markerWidth", markerWidth)
      .attr("markerHeight", markerWidth)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M0,-5L10,0L0,5")
  defs.append("marker")
      .attr("id", "arrow-start")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 3/*0*/)
      .attr("refY", 0)
      .attr("markerWidth", markerWidth)
      .attr("markerHeight", markerWidth)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M10,-5L0,0L10,5")
  gbase = svg.append("g").attr("class", "base");
  gedges = gbase.append("g").attr("class", "edges");
  gnodes = gbase.append("g").attr("class", "nodes");
  gtexts = svg.append("g").attr("class", "texts").attr("transform","translate(0,7)");

  gedges.append("path")
      .attr("class", "drag")
      .attr("marker-end", "url(#arrow-end)")
      .style("display", "none");

  d3.select(window).on('keydown.window', _onKeydownWindow);

  force
    .nodes(graph.nodes)
    .links(graph.edges)
    .size([width, height])
  update();
  stop(false);
  //force.resume();
  force.on("end", function () {
    stop();
    this.on("end", null);
  })

  return this;
}

// _onResize();
// d3.select(window).on("resize", _onResize);
function _inCircle(a, c) {
  var dx = a.x - c.x;
  var dy = a.y - c.y;
  return dx*dx + dy*dy <= radius*radius;
}
function rotate(pos, deg) {
  var r = Math.PI*deg/180;
  return {
    x: pos.x *  Math.cos(r) + pos.y * Math.sin(r),
    y: pos.x * -Math.sin(r) + pos.y * Math.cos(r),
  }
}
function transform(d) { return "translate(" + d.x + "," + d.y + ")"; }
function neg(pos) { return { x: -pos.x, y: -pos.y }; }
function translate(pos, vec) { return { x: pos.x - vec.x, y: pos.y - vec.y, }; }
function textEdge(d) { return d.val === undefined ? '' : d.val; }
function link(d) {
  var dx = d.target.x - d.source.x;
  var dy = d.target.y - d.source.y;
  var dr = Math.sqrt(dx*dx + dy*dy);
  dx *= radius/dr
  dy *= radius/dr
  var source = { x: d.source.x + dx, y: d.source.y + dy };
  var target = { x: d.target.x - dx, y: d.target.y - dy };
  // directional and weighted
  if (directional && weighted) {
    var redge = graph.edges.filter(function (e) {
      return e.target === d.source && (e.source === d.target || _inCircle(d.target, e.source));
    });
    if (redge.length > 0) {
      source = translate(rotate(translate(source, d.source), 30), neg(d.source));
      target = translate(rotate(translate(target, d.target), -30), neg(d.target));
      return "M" + source.x + "," + source.y + "A" + dr + "," + dr + " 0 0,1 "+target.x + ","+target.y;
      // return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 "+d.target.x + ","+d.target.y;
    } else {
      return "M" + source.x + "," + source.y + "L" + target.x + ","+target.y;
      // return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + ","+d.target.y;
    }
  } else {
    // unidirectional or unweighted
    return "M" + source.x + "," + source.y + "L" + target.x + ","+target.y;
  }
}

function tick() {
  // node
  // update
  gnodes.selectAll(".node")
      .data(graph.nodes)
    .classed("painter-selected", function (d) { return d === selected; })
    .attr("transform", transform)
    // .attr("cx", function (d) { return d.x; })
    // .attr("cy", function (d) { return d.y; })
  // node text
  // update
  gtexts.selectAll(".node")
      .data(graph.nodes)
    .attr("transform", transform)
    .text(function (d,i) { return i; })

  // edge
  // update
  gedges.selectAll(".edge")
      .data(graph.edges)
    .classed("painter-selected", function (d) { return d === selected; })
    .attr("marker-end", directional ? "url(#arrow-end)" : null)
    .attr("marker-start", (directional && weighted === false) ? function (d) {
      return d.reflexive ? "url(#arrow-start)" : null;
    } : null)
    .attr("d", link);
  // edge text
  // update
  if (weighted) {
    gedges.selectAll(".edge").each(function (d) {
      var pos = this.getPointAtLength(this.getTotalLength()/2);
      d.x = pos.x;
      d.y = pos.y;
    })
    gtexts.selectAll(".edge")
        .data(graph.edges)
      .attr("transform", transform)
      .text(textEdge)
  }
}

function update() {
  // node
  // enter
  gnodes.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", radius)
    // .attr("transform", transform)
    // .attr("cx", function (d) { return d.x; })
    // .attr("cy", function (d) { return d.y; })
    .on("dblclick.node", _onDblclickNode)
    .call(drag)
    .on('click.select', _onClickSelect)
    .on("mousedown.node", _onMousedownNode)
    .on("mouseup.node", _onMouseupNode);
  // exit
  gnodes.selectAll(".node")
      .data(graph.nodes)
    .exit().remove();
  // node text
  // enter
  gtexts.selectAll(".node")
      .data(graph.nodes)
    .enter().append("text")
      .attr("class", "node")
      // .attr("transform", transform);
  // exit
  gtexts.selectAll(".node")
      .data(graph.nodes)
    .exit().remove();

  // edge
  // enter
  gedges.selectAll(".edge")
      .data(graph.edges)
    .enter().append("path")
      .attr("class", "edge")
      .on('click.select', _onClickSelect)
  // exit
  gedges.selectAll(".edge")
      .data(graph.edges)
    .exit().remove();
  // edge text
  if (weighted) {
    gtexts.selectAll(".edge")
        .data(graph.edges)
      .enter().append("text")
        .attr("class", "edge")
        // transform depends on edge d prop updated in tick
    gtexts.selectAll(".edge")
        .data(graph.edges)
      .exit().remove();
  } else {
    gtexts.selectAll(".edge")
      .remove();
  }

  force.start();
}

function _onResize() {
  width = svgDom.clientWidth || container.clientWidth;
  height = svgDom.clientHeight || container.clientHeight;
  force.size([width, height]).resume();
}

function _onDblclickNode(d) {
  d3.event.stopPropagation();
  d3.select(this).classed("fixed", d.fixed = false);
  force.resume();
}

function _onDragstart(d) { d.fixed |= 2; }
function _onDrag(d) {
  if (source) {
    if (dragging) {
      d3.select(this).classed("fixed", d.fixed = true);
      d.px = d3.event.x || d3.event.clientX, d.py = d3.event.y || d3.event.clientY;
      force.resume();
    } else {
      // console.log(d);
      if (_inCircle(d3.event, d) === false) {
        gedges.select("path.drag").datum({ source: d, target: { x:d3.event.x || d3.event.clientX, y:d3.event.y || d3.event.clientY } })
          .attr("d", link)
          .style("display", null);
      } else {
        gedges.select("path.drag").style("display", "none");
      }
    }
  }
}
function _onDragend(d) { d.fixed &= ~6; gedges.select('path.drag').style("display", "none"); }

function _onMousedownNode(d) {
  if (d3.event.ctrlKey === false || d3.event.ctrlKey === undefined) {
    d3.event.stopPropagation();
    source = d;
    dragging = d3.event.shiftKey ? true : false;
  }
}
function _onMouseupNode(d) {
  if (source && source !== d) {
    var newEdge = { source: source, target: d };
    pushEdge(newEdge)
    // graph.edges.push(newEdge);
    // _onClickSelect(newEdge);
    update();
  }
  source = undefined;
  dragging = false;
}

function _onClickSelect(d, unconditional) {
  selected = selected === d ? undefined : d;
  if (unconditional === true) {
    selected = d;
  }
  if (selected && _onSelected) {
    _onSelected();
  }
  force.resume();
}
function pushEdge(newEdge) {
  var redge;
  // unidirectional
  if (directional === false) {
    redge = graph.edges.filter(function (d) {
      return (d.source === newEdge.source && d.target === newEdge.target) ||
          (d.target === newEdge.source && d.source === newEdge.target);
    });
    if (redge.length > 0) {
      newEdge = redge[0];
    } else {
      graph.edges.push(newEdge);
    }
  } else {
    // directional weighted
    if (weighted) {
      redge = graph.edges.filter(function (d) {
        return (d.source === newEdge.source && d.target === newEdge.target);
      });
      if (redge.length > 0) {
        newEdge = redge[0];
      } else {
        graph.edges.push(newEdge);
      }
    } else {
      // directional unweighted
      redge = graph.edges.filter(function (d) {
        return (d.source === newEdge.source && d.target === newEdge.target) ||
            (d.target === newEdge.source && d.source === newEdge.target);
      });
      if (redge.length > 0) {
        if (redge[0].source === newEdge.target) {
          redge[0].reflexive = true;
        }
        newEdge = redge[0];
      } else {
        graph.edges.push(newEdge);
      }
    }
  }
  _onClickSelect(newEdge, true);
}

function getWeightInput() {
  var w = (selected === undefined || selected.val === undefined) ? "数字" : selected.val;
  return parseFloat(prompt("权值", w));
}
function weighSelected(getWeightInput) {
  var w = getWeightInput();
  if (isNaN(w) || selected.val === w) {
    return;
  }
  selected.val = w; // force-graph with weight property itself
  update();
  return this;
}
function _onKeydownWindow() {
  if (selected) {
    if (d3.event.keyCode === 8/*backspace*/) {
      d3.event.preventDefault(); // history pop state
      deleteSelected();
    } else if (d3.event.keyCode === 13/*enter*/) {
      if (weighted) {
        weighSelected(getWeightInput);
      }
    }
  }
}
function deleteSelected() {
  var i = graph.nodes.indexOf(selected);
  if (i !== -1) {
    graph.nodes.splice(i, 1);
    graph.edges.filter(function (d) {
      return d.source === selected || d.target === selected;
    }).forEach(function (d) {
      graph.edges.splice(graph.edges.indexOf(d), 1);
    })
  } else {
    i = graph.edges.indexOf(selected);
    if (i != -1) {
      graph.edges.splice(graph.edges.indexOf(selected), 1);
    }
  }
  selected = undefined;
  update();
  return this;
}

function _onZoom() {
  gtranslate = d3.event.translate;
  gscale = d3.event.scale;
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function _scroll() {
  var doc = document.documentElement;
  return {
    left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
    top: (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
  }
}
function _onDblclickSvg() {
  if (d3.event.target !== this) {
    return;
  }
  var x = d3.event.x || d3.event.clientX || d3.event.clientX;
  var y = d3.event.y || d3.event.clientY || d3.event.clientY;
  var scroll = _scroll();
  x += scroll.left - offsetLeft;
  y += scroll.top - offsetTop;
  var newNode = {
    x: (x-gtranslate[0])/gscale,
    y: (y-gtranslate[1])/gscale,
  };
  graph.nodes.push(newNode);
  _onClickSelect(newNode);
  update();
}

function stop(wait) {
  if (selected) {
    gedges.select('.painter-selected').classed('painter-selected', false);
    gnodes.select('.painter-selected').classed('painter-selected', false);
    selected = undefined;
  }
  if (wait !== false) {
    force.stop();
  }
  d3.select(window)
    .on('resize',null)
    .on('keydown.window',null);
  d3.select(svgDom).on("dblclick.svg", null);
  gnodes.selectAll("circle.node")
    // .classed("fixed", function(d) { return d.fixed = true; })
    .on("dblclick.node",null)
    .on("dragstart",null)
    .on("drag",null)
    .on("dragend",null)
    .on("click.select",null)
    .on("mousedown.node",null)
    .on("mouseup.node",null);
  gedges.selectAll("path.edge").on("click.select",null);
  return this;
}

function convert(_directional, _weighted) {
  if (directional === _directional && weighted === _weighted) {
    return;
  }
  pd = directional;
  directional = _directional;
  weighted = _weighted;
  var edges = [];
  function r(a,b) {
    return a.source === b.target && a.target === b.source;
  }
  graph.edges.forEach(function (d) {
    if (directional) {
      if (weighted) {
        if (pd === false || d.reflexive) {
          edges.push({ source: d.target, target: d.source, val: d.val })
        }
        delete d.reflexive;
        edges.push(d);
      } else {
        delete d.reflexive;
        if (edges.some(function (e) { return r(d,e) }) === false) {
          if (pd === false || graph.edges.some(function (e) { return r(d,e) }) === true) {
            d.reflexive = true;
          }
          edges.push(d);
        }
      }
    } else {
      if (edges.some(function (e) { return r(d,e) }) === false) {
        delete d.reflexive;
        edges.push(d);
      }
    }
  });
  graph.edges = edges;
  update();
  return this;
}

function onSelected(f) { _onSelected = f; return this; }

function restart() {
  force.start();
  d3.select(window)
    .on('resize', _onResize)
    .on('keydown.window', _onKeydownWindow);
  d3.select(svgDom).on("dblclick.svg", _onDblclickSvg);
  gnodes.selectAll("circle.node")
    .on("dblclick.node", _onDblclickNode)
    .call(drag)
    .on("click.select", _onClickSelect)
    .on("mousedown.node", _onMousedownNode)
    .on("mouseup.node",_onMouseupNode);
  gedges.selectAll("path.edge").on("click.select", _onClickSelect);
}

module.exports = {
  stop: stop,
  convert: convert,
  weighSelected: weighSelected,
  deleteSelected: deleteSelected,
  onSelected: onSelected,
  init: init,
  restart: restart,
  data: function () {
    return graph;
  }
};
