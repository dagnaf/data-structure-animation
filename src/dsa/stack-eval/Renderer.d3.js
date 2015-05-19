var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh, status, delay;
var others;

var op_grid_text = [
  [ '#', '+', '-', '*', '/', '(', ')' ],
  [ '+', '>', '>', '<', '<', '<', '>' ],
  [ '-', '>', '>', '<', '<', '<', '>' ],
  [ '*', '>', '>', '>', '>', '<', '>' ],
  [ '/', '>', '>', '>', '>', '<', '>' ],
  [ '(', '<', '<', '<', '<', '<', '<' ],
  [ ')', '/', '/', '/', '/', '/', '/' ]
];

function _draw_chars () {
  var data = others.string.map(function (d, i) {
    var offset = status.iter[0] || 0;
    return { v: d, i: i-offset };
  });
  // *chars
  // enter
  gbase.selectAll('rect.char').data(data)
    .enter()
      .append('rect')
        .attr('class', 'char')
        .attr('width', '100')
        .attr('height', '50')
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100), 0];
          })
        )
  // update
  gbase.selectAll('rect.char').data(data)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [d.i*(100), 0];
      })
    );
  // exit
  gbase.selectAll('rect.char').data(data)
    .exit()
        .transition()
        .duration(delay)
      .remove();
  // *char-text
  // enter
  gtext.selectAll('text.char').data(data)
    .enter()
      .append('text')
        .attr('class', 'char')
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [50, 25+5];
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100)+50, 0+25+5];
          })
        )
        .text(function (d) { return d.v; });
  // update
  gtext.selectAll('text.char').data(data)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [d.i*(100)+50, 0+25+5];
      })
    )
    .text(function (d) { return d.v; });
  // exit
  gtext.selectAll('text.char').data(data)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _draw_stacks () {
  var data = d3.range(status.stack.length);
  // *stack
  // enter
  gbase.selectAll('rect.stack').data(data)
    .enter()
      .append('rect')
      .attr('class', 'stack')
      .attr('width', 100)
      .attr('height', 5*50)
      .attr('transform',d3Transform().translate(function (d,i) {
        return [i*(100), 0];
      }))
        .transition()
        .duration(delay)
      .attr('transform',d3Transform().translate(function (d, i) {
          return [i*(100), 50*3];
      }));
  // update
  // exit
  gbase.selectAll('rect.stack').data(data)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}
function _draw_stack_tops () {
  // *stack-top
  // enter
  gbase.selectAll('rect.stack-top').data(status.stack)
    .enter()
      .append('rect')
        .attr('class', 'stack-top')
        .attr('width', 100)
        .attr('height', 50)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [(100)*i, 0]
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [(100)*i, 50*3+(5-d.length-1)*50]
          })
        );
  // update
  gbase.selectAll('rect.stack-top').data(status.stack)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [(100)*i, 50*3+(5-d.length-1)*50]
      })
    );
  // exit
  gbase.selectAll('rect.stack-top').data(status.stack)
    .exit()
        .transition()
        .duration(delay)
      .remove()
  // *stack-top-text
  // enter
  gtext.selectAll('text.stack-top').data(status.stack)
    .enter()
      .append('text')
        .attr('class', 'stack-top')
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [(100)*i+50, 25+5]
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [(100)*i+50, 50*3+(5-d.length-1)*50+25+5]
          })
        )
        .text(function () { return '栈顶'; });
  // update
  gtext.selectAll('text.stack-top').data(status.stack)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [(100)*i+50, 50*3+(5-d.length-1)*50+25+5]
      }));// .text(function (d) { return d.length; });
  // exit
  gtext.selectAll('text.stack-top').data(status.stack)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _draw_items () {
  var data = status.stack.reduce(function (a,b,c) {
    return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
  }, []);
  var fnid = function (d) { return (d.i ? 'ops' : 'nums')+d.j; };
  // *stack-item
  // enter
  gbase.selectAll('rect.item').data(data, fnid)
    .enter()
      .append('rect')
        .attr('class', 'item')
        .attr('width', 100)
        .attr('height', 50)
        .attr('transform',
          d3Transform().translate(function (d) {
            return [d.i*(100), 50*2];
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d) {
            return [d.i*(100), 50*3+(5-d.j-1)*50];
          })
        );
  // update
  gbase.selectAll('rect.item').data(data, fnid)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d) {
        return [d.i*(100), 50*3+(5-d.j-1)*50];
      })
    );
  // exit
  gbase.selectAll('rect.item').data(data, fnid)
    .exit()
        .transition()
        .duration(delay)
      .remove();
  // *stack-item-text
  // enter
  gtext.selectAll('text.item').data(data, fnid)
    .enter()
      .append('text')
        .attr('class', 'item')
        .attr('transform',
          d3Transform().translate(function (d) {
            return [d.i*(100)+50, 50*2+25+5];
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d) {
            return [d.i*(100)+50, 50*3+(5-d.j-1)*50+25+5];
          })
        )
        .text(function (d) { return d.v });
  // update
  gtext.selectAll('text.item').data(data, fnid)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d) {
        return [d.i*(100)+50, 50*3+(5-d.j-1)*50+25+5];
      })
    )
    .text(function (d) { return d.v });
  // exit
  gtext.selectAll('text.item').data(data, fnid)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _draw_peaks () {
  var data = status.peak.reduce(function (a,b,c) {
    return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e}; }));
  }, []);
  // *peak-item
  // enter
  gbase.selectAll('rect.peak').data(data)
    .enter()
      .append('rect')
        .attr('class', 'peak')
        .attr('width', 100)
        .attr('height', 50)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            var j = status.stack[d.i].length-1;
            return [d.i*(100), 50*3+(5-d.j-1)*50];
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100), 50*1+(2-d.j-1)*50];
          })
        );
  // udpate
  // FIXME
  gbase.selectAll('rect.peak').data(data)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [d.i*(100), 50*1+(2-d.j-1)*50];
      })
    );
  // exit
  gbase.selectAll('rect.peak').data(data)
    .exit()
        .transition()
        .duration(delay)
      .remove();
  // *peak-item-text
  // enter
  gtext.selectAll('text.peak').data(data)
    .enter()
      .append('text')
        .attr('class', 'peak')
        .attr('transform',
          d3Transform().translate(function (d, i) {
            var j = status.stack[d.i].length-1;
            return [d.i*(100)+50, 50*3+(5-d.j-1)*50+25+5];
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100)+50, 50*1+(2-d.j-1)*50+25+5];
          })
        )
        .text(function (d) { return d.v; });
  // update
  gtext.selectAll('text.peak').data(data)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [d.i*(100)+50, 50*1+(2-d.j-1)*50+25+5];
      })
    )
    .text(function (d) { return d.v; });
  // exit
  gtext.selectAll('text.peak').data(data)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _draw_iter () {
  // *iter
  // enter
  ghigh.selectAll('rect.char').data(status.iter)
    .enter()
      .append('rect')
      .attr('class', 'char')
      .attr('width', 100)
      .attr('height', 50)
        .transition()
        .duration(delay)
      .attr('transform',
        d3Transform().translate(function (d) {
          return [0, 0]
        })
      );
  // update
  // exit
  ghigh.selectAll('rect.char').data(status.iter)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _draw_table () {
  var data = status.table.map(function (a,b) {
    var e = op_grid_text[0].indexOf(a);
    return d3.range(7).map(function (d) {
      return b ? { r: d, c: e, t: b} : { r: e, c: d, t: b};
    });
  }).reduce(function (a, b) { return a.concat(b); }, []);
  // *table
  // enter
  ghigh.selectAll('rect.op-grid').data(data)
    .enter()
      .append('rect')
      .attr('class', 'op-grid')
      .attr('width', function (d) { return d.t ? 0 : 50})
      .attr('height', function (d) { return d.t ? 50 : 0})
      .attr('transform',
        d3Transform().translate(function (d) {
          return d.t ? [(100)*2, (50)+(50)*d.r] : [(100)*2+(50)*d.c, 50];
        })
      )
        .transition()
        .duration(delay)
      .attr('width', 50)
      .attr('height', 50)
      .attr('transform',
        d3Transform().translate(function (d) {
          return [(100)*2+(50)*d.c, (50)+(50)*d.r];
        })
      )
  // update
  // exit
  var exit = ghigh.selectAll('rect.op-grid').data(data)
    .exit();
  var ctr = exit[0].map(function (d) {return d.__data__})
    .sort(function (a,b) {return a.r === b.r ? a.c - b.c : a.r - b.r})
    .reduce(function (a,b,c) {return (a.s || (a.r === b.r && a.c === b.c)) ? {r:a.r, c:a.c, s:1} : b}, [])
  ctr.r = ctr.r || 0;
  ctr.c = ctr.c || 0;
  exit
    .transition()
    .duration(delay/2)
  .attr('transform',
    d3Transform().translate(function (d, i, l) {
      return [(100)*2+(50)*ctr.c, (50)+(50)*ctr.r];
    })
  )
    .transition()
    .duration(delay/2)
  .remove();
}


function _init (_status, _delay, _others) {
  status = _status;
  delay = _delay;
  others = _others;
}

function render (status, delay, others) {
  _init(status, delay, others);
  _draw_chars();
  _draw_stacks();
  _draw_stack_tops();
  _draw_items();
  _draw_peaks();
  _draw_iter();
  _draw_table();
}

function init () {
  var self = this;
  var zoom = d3.behavior.zoom()
    .scaleExtent([0.1,10])
    .on('zoom', function () {
      self.svg.attr("transform", d3Transform()
        .translate(d3.event.translate)
        .scale(d3.event.scale))
    });

  this.svg = d3.select(this.refs.svg.getDOMNode()).append('svg').call(zoom)
    .append('g');
  this.g = this.svg.append('g')
    .attr('transform', d3Transform().translate(10, 10).scale(1));

  this.gbase = this.g.append('g').attr('class', 'base');
  this.ghigh = this.g.append('g').attr('class', 'high');
  this.gtext = this.g.append('g').attr('class', 'text');

  // *table-grid
  // enter
  this.gbase.selectAll('rect.op-grid')
    .data(d3.range(7*7).map(function (d) {
      return { r: Math.floor(d/7), c: d%7 };
    }))
      .enter()
        .append('rect')
          .attr('class', 'op-grid')
          .attr('transform',
            d3Transform().translate(function (d, i) {
              return [2*(100)+(50)*d.c, (50)+(50)*d.r];
            })
          )
          .attr('width', function (d) { return (d.r+d.c)%2 ? 0 : 50})
          .attr('height', function (d) { return (d.r+d.c)%2 ? 50 : 0})
            .transition()
            .duration(this.props.delay*0.75)
          .attr('width', 50)
          .attr('height', 50);
  // update
  // exit
  // *table-grid-text
  // enter
  this.gtext.selectAll('text.op-grid')
    .data(op_grid_text.reduce(function (a,b,d) {
      return a.concat(b.map(function (e, f) {
        return { v: e, r: d, c: f};
      }));
    }, []))
      .enter()
        .append('text')
          .attr('class', 'op-grid')
          .attr('transform',
            d3Transform().translate(function (d, i) {
              return [2*(100)+(50)*d.c+25, (50)+(50)*d.r+25+5];
            })
          )
          .text('')
            .transition()
            .duration(this.props.delay*0.75)
          .text(function (d) { return d.v;});

  gbase = this.gbase;
  gtext = this.gtext;
  ghigh = this.ghigh;
  others = this.props.others;
}

module.exports = {
  init: init,
  render: render
}
