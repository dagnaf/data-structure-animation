var React = require('react');
var d3 = require('d3');
var d3Transform = require('d3-transform');

function _item(d, i) {
  return 'translate(0,'+(350-i*50)+')';
}
function _text (d) {
  return d
};
var op_grid_text = [
 [ '#', '+', '-', '*', '/', '(', ')' ],
 [ '+', '>', '>', '<', '<', '<', '>' ],
 [ '-', '>', '>', '<', '<', '<', '>' ],
 [ '*', '>', '>', '>', '>', '<', '>' ],
 [ '/', '>', '>', '>', '>', '<', '>' ],
 [ '(', '<', '<', '<', '<', '<', '<' ],
 [ ')', '/', '/', '/', '/', '/', '/' ]
];

module.exports = React.createClass({
  _update_with_props: function (status, _delay) {
    // *chars
    // enter
    this.gbase.selectAll('rect.char')
      .data(this.props.others.string.map(function (d, i) {
        var offset = status.iter[0] || 0;
        return { v: d, i: i-offset };
       }))
         .enter()
            .append('rect')
              .attr('class', 'char')
              .attr('width', '100')
              .attr('height', '50')
              .transition()
                .duration(_delay*0.75)
              .attr('transform',
                d3Transform().translate(function (d, i) {
                  return [d.i*(100), 0];
                })
              )
    // update
    this.gbase.selectAll('rect.char')
      .data(this.props.others.string.map(function (d, i) {
        var offset = status.iter[0] || 0;
        return { v: d, i: i-offset };
       }))
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100), 0];
          })
        );
    // exit
    this.gbase.selectAll('rect.char')
      .data(this.props.others.string.map(function (d, i) {
        var offset = status.iter[0] || 0;
        return { v: d, i: i-offset };
      }))
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *char-text
    // enter
    this.gtext.selectAll('text.char')
      .data(this.props.others.string.map(function (d, i) {
        var offset = status.iter[0] || 0;
        return { v: d, i: i-offset };
      }))
        .enter()
          .append('text')
            .attr('class', 'char')
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [50, 25+5];
              })
            )
            .transition()
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [d.i*(100)+50, 0+25+5];
              })
            )
            .text(function (d) { return d.v; });
    // update
    this.gtext.selectAll('text.char')
      .data(this.props.others.string.map(function (d, i) {
        var offset = status.iter[0] || 0;
        return { v: d, i: i-offset };
      }))
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100)+50, 0+25+5];
          })
        )
        .text(function (d) { return d.v; });
    // exit
    this.gtext.selectAll('text.char')
      .data(this.props.others.string.map(function (d, i) {
        var offset = status.iter[0] || 0;
        return { v: d, i: i-offset };
      }))
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *stack
    // enter
    this.gbase.selectAll('rect.stack')
      .data(d3.range(status.stack.length))
        .enter()
          .append('rect')
          .attr('class', 'stack')
          .attr('width', 100)
          .attr('height', 5*50)
          .attr('transform',d3Transform().translate(function (d,i) {
            return [i*(100), 0];
          }))
          .transition()
          .duration(_delay*0.75)
          .attr('transform',d3Transform().translate(function (d, i) {
              return [i*(100), 50*3];
          }));
    // update
    // exit
    this.gbase.selectAll('rect.stack')
      .data(d3.range(status.stack.length))
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *stack-top
    // enter
    this.gbase.selectAll('rect.stack-top')
      .data(status.stack)
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
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [(100)*i, 50*3+(5-d.length-1)*50]
              })
            );
    // update
    this.gbase.selectAll('rect.stack-top')
      .data(status.stack)
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [(100)*i, 50*3+(5-d.length-1)*50]
          })
        );
    // exit
    this.gbase.selectAll('rect.stack-top')
      .data(status.stack)
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove()
    // *stack-top-text
    // enter
    this.gtext.selectAll('text.stack-top')
      .data(status.stack)
        .enter()
          .append('text')
            .attr('class', 'stack-top')
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [(100)*i+50, 25+5]
              })
            )
            .transition()
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [(100)*i+50, 50*3+(5-d.length-1)*50+25+5]
              })
            )
            .text(function () { return '栈顶'; });
    // update
    this.gtext.selectAll('text.stack-top')
      .data(status.stack)
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [(100)*i+50, 50*3+(5-d.length-1)*50+25+5]
          }))
        ;// .text(function (d) { return d.length; });
    // exit
    this.gtext.selectAll('text.stack-top')
      .data(status.stack)
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *stack-item
    // enter
    this.gbase.selectAll('rect.item')
      .data(status.stack.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []), function (d) { return (d.i ? 'ops' : 'nums')+d.j})
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
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d) {
                return [d.i*(100), 50*3+(5-d.j-1)*50];
              })
            );
    // update
    this.gbase.selectAll('rect.item')
      .data(status.stack.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []), function (d) { return (d.i ? 'ops' : 'nums')+d.j})
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d) {
            return [d.i*(100), 50*3+(5-d.j-1)*50];
          })
        );
    // exit
    this.gbase.selectAll('rect.item')
      .data(status.stack.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []), function (d) { return (d.i ? 'ops' : 'nums')+d.j})
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *stack-item-text
    // enter
    this.gtext.selectAll('text.item')
      .data(status.stack.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []), function (d) { return (d.i ? 'ops' : 'nums')+d.j})
        .enter()
          .append('text')
            .attr('class', 'item')
            .attr('transform',
              d3Transform().translate(function (d) {
                return [d.i*(100)+50, 50*2+25+5];
              })
            )
            .transition()
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d) {
                return [d.i*(100)+50, 50*3+(5-d.j-1)*50+25+5];
              })
            )
            .text(function (d) { return d.v });
    // update
    this.gtext.selectAll('text.item')
      .data(status.stack.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []), function (d) { return (d.i ? 'ops' : 'nums')+d.j})
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d) {
            return [d.i*(100)+50, 50*3+(5-d.j-1)*50+25+5];
          })
        )
        .text(function (d) { return d.v });
    // exit
    this.gtext.selectAll('text.item')
      .data(status.stack.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []), function (d) { return (d.i ? 'ops' : 'nums')+d.j})
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *peak-item
    // enter
    this.gbase.selectAll('rect.peak')
      .data(status.peak.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e}; }));
      }, []))
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
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [d.i*(100), 50*1+(2-d.j-1)*50];
              })
            );
    // udpate
    // FIXME
    this.gbase.selectAll('rect.peak')
      .data(status.peak.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []))
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100), 50*1+(2-d.j-1)*50];
          })
        );
    // exit
    this.gbase.selectAll('rect.peak')
      .data(status.peak.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []))
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *peak-item-text
    // enter
    this.gtext.selectAll('text.peak')
      .data(status.peak.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []))
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
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [d.i*(100)+50, 50*1+(2-d.j-1)*50+25+5];
              })
            )
            .text(function (d) { return d.v; });
    // update
    this.gtext.selectAll('text.peak')
      .data(status.peak.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []))
        .transition()
        .duration(_delay*0.75)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [d.i*(100)+50, 50*1+(2-d.j-1)*50+25+5];
          })
        )
        .text(function (d) { return d.v; });
    // exit
    this.gtext.selectAll('text.peak')
      .data(status.peak.reduce(function (a,b,c) {
        return a.concat(b.map(function (d,e) { return { v: d, i: c, j: e }; }));
      }, []))
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *iter
    // enter
    this.ghigh.selectAll('rect.char')
      .data(status.iter)
        .enter()
          .append('rect')
          .attr('class', 'char')
          .attr('width', 100)
          .attr('height', 50)
          .transition()
          .duration(_delay*0.75)
          .attr('transform',
            d3Transform().translate(function (d) {
              return [0, 0]
            })
          );
    // update
    // exit
    this.ghigh.selectAll('rect.char')
      .data(status.iter)
        .exit()
        .transition()
        .duration(_delay*0.75)
        .remove();
    // *table
    // enter
    this.ghigh.selectAll('rect.op-grid')
      .data(status.table.map(function (a,b) {
        var e = op_grid_text[0].indexOf(a);
        return d3.range(7).map(function (d) {
          return b ? { r: d, c: e, t: b} : { r: e, c: d, t: b};
        });
      }).reduce(function (a, b) { return a.concat(b); }, []))
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
          .duration(_delay*0.75)
          .attr('width', 50)
          .attr('height', 50)
          .attr('transform',
            d3Transform().translate(function (d) {
              return [(100)*2+(50)*d.c, (50)+(50)*d.r];
            })
          )
    // update
    // exit

    var exit = this.ghigh.selectAll('rect.op-grid')
      .data(status.table.map(function (a,b) {
        var e = op_grid_text[0].indexOf(a);
        return d3.range(7).map(function (d) {
          return b ? { r: d, c: e, t: b} : { r: e, c: d, t: b};
        });
      }).reduce(function (a, b) { return a.concat(b); }, []))
        .exit();
    var ctr = exit[0].map(function (d) {return d.__data__})
      .sort(function (a,b) {return a.r === b.r ? a.c - b.c : a.r - b.r})
      .reduce(function (a,b,c) {return (a.s || (a.r === b.r && a.c === b.c)) ? {r:a.r, c:a.c, s:1} : b}, [])
    ctr.r = ctr.r || 0;
    ctr.c = ctr.c || 0;
    exit.transition()
        .duration(_delay*0.75/2)
        .attr('transform',
          d3Transform().translate(function (d, i, l) {
            return [(100)*2+(50)*ctr.c, (50)+(50)*ctr.r];
          })
        )
        .transition()
        .duration(_delay*0.75/2)
        .remove();
  },
  // _zoom: function () {
  //     this.svg.attr("transform", "translate("
  //         + d3.event.translate
  //         + ")scale(" + d3.event.scale + ")");
  // },
  componentDidMount: function () {
    // this.transitions = [];
    var self = this;
    window.scene = this;
    var zoom = d3.behavior.zoom()
      .scaleExtent([0.1,10])
      .on('zoom', function () {
        self.svg.attr("transform", d3Transform()
          .translate(d3.event.translate)
          .scale(d3.event.scale))
      });
    this.svg = d3.select(this.getDOMNode()).append('svg').call(zoom)
      .append('g');
    this.g = this.svg.append('g')
      .attr('transform', d3Transform().translate(10, 10));

    this.gbase = this.g.append('g').attr('class', 'base');
    this.ghigh = this.g.append('g').attr('class', 'high');
    this.gtext = this.g.append('g').attr('class', 'text');

    // this.chars = '1+(1*3)='.split('');//this.props.accessories.string.split('');

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
    // update
    // exit
    this._update_with_props(this.props.frame.current.status, 15);
    // this.componentDidUpdate(this.props, this.props);
  },
  componentDidUpdate: function(prevProps, prevState) {
    console.log('%cScene update\n'+JSON.stringify(prevProps)+'\n'+JSON.stringify(this.props), 'color:purple')
    if (this.props.delay !== prevProps.delay) {
      return;
    }
    if (this.props.isPlaying === true && this.props.frame.current.id === 0) {
      // this._update_with_props(this.props.frame.current.status, 15);
    }
    if (this.props.isPlaying && this.props.frame.next) {
      if (this.props.frame.next === undefined) return;
      this._update_with_props(this.props.frame.next.status, this.props.delay);
      console.log('%cSCENE playing '+this.props.frame.current.id+' to '+this.props.frame.next.id, 'color:purple');
    } else {
      if (this.props.frame.current === undefined) return;
      this._update_with_props(this.props.frame.current.status,15);
    }
    // Delay changes, do nothing
    // if (this.props.delay !== prevProps.delay) {
    //   return;
    // }
    // // Stop previous transition if playing
    // if (!this.props.isPlaying && prevProps.isPlaying) {
    //   this.transitions.forEach(function (t) {
    //     if (t !== undefined && t.transition !== undefined){
    //       t.transition().duration(0);
    //     }
    //   });
    // }
    // // clear transition array
    // this.transitions = [];
    // Demo paused, show exact frame or replay or new demo start
    // if (
    //     // demo paused
    //     !this.props.isPlaying ||
    //     // previous: no demo or demo over, now: has demo or replay
    //     (!prevProps.isRunning && this.props.isRunning) // ||
    //     // this.props.isFirstFrame
    //   )
    // {
    //     // enter: number of data
    //     // update: property of data: color,position,text,etc.
    //     // exit: number of data
    //     var status;
    //     var _delay;
    //     if (this.props.isPlaying && this.props.frame.next) {
    //       if (this.props.frame.next === undefined) return;
    //       status = this.props.frame.next.status;
    //       _delay = this.props.delay;
    //     } else {
    //       if (this.props.frame.current === undefined) return;
    //       status = this.props.frame.current.status;
    //       _delay = 15;
    //     }
    //     console.log('now stop at ',this.props.frame.current.id, status);


    // }
  },
  render: function () {
    return (
      <div className="scene"></div>
    )
  }
});
