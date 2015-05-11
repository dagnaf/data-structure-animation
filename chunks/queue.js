webpackJsonpdsa([6],{11:function(t,n,e){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include "./queue.h"</span>\n\nvoid init(Queue *q) {\n    q->head = <span class="number">0</span>;\n    q->tail = <span class="number">1</span>;\n}\n\nint isFull(Queue *q) {\n    <span class="keyword">if</span> (q->head == q->tail) {\n        <span class="keyword">return</span> <span class="number">1</span>;\n    } <span class="keyword">else</span> {\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n}\n\nint isEmpty(Queue *q) {\n    <span class="keyword">if</span> ((q->head + <span class="number">1</span>) % N == q->tail) {\n        <span class="keyword">return</span> <span class="number">1</span>;\n    } <span class="keyword">else</span> {\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n}\n\nvoid enque(Queue *q, int val) {\n    <span class="keyword">if</span> (isFull(q) == <span class="number">1</span>) {\n        printf(<span class="string">"queue full.\\n"</span>);\n    } <span class="keyword">else</span> {\n        q->data[q->tail] = val;\n        q->tail = (q->tail + <span class="number">1</span>) % N;\n    }\n}\n\nvoid deque(Queue *q) {\n    <span class="keyword">if</span> (isEmpty(q) == <span class="number">1</span>) {\n        printf(<span class="string">"queue empty.\\n"</span>);\n    } <span class="keyword">else</span> {\n        q->head = (q->head + <span class="number">1</span>) % N;\n    }\n}\n\nint front(Queue *q) {\n    <span class="keyword">if</span> (isEmpty(q) == <span class="number">1</span>) {\n        printf(<span class="string">"queue empty.\\n"</span>);\n        <span class="keyword">return</span> -<span class="number">1</span>;\n    } <span class="keyword">else</span> {\n        <span class="keyword">return</span> q->data[(q->head + <span class="number">1</span>) % N];\n    }\n}'},12:function(t,n,e){t.exports='<span class="comment">#define N 15</span>\n\ntypedef struct {\n    int head;\n    int tail;\n    int data[N];\n} Queue;\n\nvoid init(Queue *q);\nint isFull(Queue *q);\nint isEmpty(Queue *q);\nvoid enque(Queue *q, int val);\nvoid deque(Queue *q);\nint front(Queue *q);'},20:function(t,n,e){function r(t){currentStatus.headtail=void 0===t?0:1}function a(t){currentStatus.toque=void 0===t?[]:[t]}function s(t){currentStatus.tofront=void 0===t?[]:[t]}function i(t,n,e){1===n&&(lastStatus=c(currentStatus)),p.push({status:lastStatus,line:t,animation:e,id:u}),u++}function o(){i(p[p.length-1].line,1)}var l,c=e(4),p=[],u=0,d=8;_id=0;var f=function(){i(5,1),currentStatus.head=0,i(6,1),currentStatus.tail=1,queue=[],currentStatus.queue=queue},h=function(){return i(10,1),r(1),queue.length===d-1?(i(11,1),!0):(i(13,1),r(),!1)},m=function(){return r(1),i(18,1),0===queue.length?(i(19,1),!0):(i(21,1),r(),!1)},y=function(t){a(t),i(26,1),h()?(i(27,1),console.log("queue full."),a()):(i(29,1),queue.push({v:t,i:_id++}),a(),i(30,1),currentStatus.tail++)},g=function(){i(35,1),m()?(i(36,1),console.log("queue empty.")):(i(38,1),queue.shift(),currentStatus.head++)},v=function(){return i(43,1),m()?(i(44,1),console.log("queue empty."),i(45,1),-1):(i(47,1),l=queue[0].v,s(l),l)};currentStatus={},lastStatus={},t.exports={getInitialDescriptions:function(){return this.initialize(!0),y(0),y(50),this.run("enque",100)},initialize:function(t){return p=[],u=0,t&&(queue=[]),currentStatus={queue:queue,tofront:[],toque:[],headtail:0,head:currentStatus.head||0,tail:currentStatus.tail||1},lastStatus=c(currentStatus),this},enque:y,deque:g,front:v,init:f,run:function(t,n){return this.initialize()[t](n),o(),{frames:p,others:{N:d}}}}},39:function(t,n,e){var r=e(1),a=e(2);t.exports=r.createClass({displayName:"module.exports",getInitialState:function(){return{text:""}},render:function(){return r.createElement("div",{className:"list"},r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"init"),value:"初始化"}),r.createElement("input",{onChange:this._onChange,value:this.state.text,placeholder:"整数"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"enque"),value:"入队"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"deque"),value:"出队"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"front"),value:"队首"}))},_onChange:function(t){this.setState({text:t.target.value})},_onClick:function(t){a.runDemo(t,this.state.text)}})},57:function(t,n,e){t.exports="CC=gcc\nCFLAGS=-c -Wall\nLDFLAGS=\nSOURCES=main.c queue.c\nOBJECTS=$(SOURCES:.cpp=.o)\nEXECUTABLE=a.out\n\nall: $(SOURCES) $(EXECUTABLE)\n\n$(EXECUTABLE): $(OBJECTS)\n    $(CC) $(LDFLAGS) $(OBJECTS) -o $@\n\n.cpp.o:\n    $(CC) $(CFLAGS) $&lt; -o $@\n\nclean:\n    rm -rf *.o a.out"},58:function(t,n,e){t.exports='<span class="comment">#include "./queue.h"</span>\n\nint main(int argc, char <span class="keyword">const</span> *argv[]) {\n  Queue queue;\n  init(&amp;stack);\n  enque(&amp;stack, <span class="number">0</span>);\n  enque(&amp;stack, <span class="number">50</span>);\n  euque(&amp;stack, <span class="number">100</span>);\n  <span class="comment">// 在系统中运行命令：</span>\n  <span class="comment">// 初始化、入栈、出栈、栈顶</span>\n  <span class="keyword">return</span> <span class="number">0</span>;\n};'},79:function(t,n,e){function r(t){return t=t||0,_.svg.arc().innerRadius(k+t).outerRadius(b+t)}function a(t){return E*t/x}function s(t,n){return void 0===n&&(n=t+1),{startAngle:a(t),endAngle:a(n)}}function i(t,n){return void 0===n&&(n=t+50),{innerRadius:t,outerRadius:n}}function o(){var t=[g.head,g.tail];h.selectAll("path.head").data(t).enter().append("path").attr("class","head"),h.selectAll("path.head").data(t).transition().duration(v).style("fill",function(t,n){return g.headtail?A:"tomato"}).attrTween("d",function(t,n){if(void 0===this.__prev__){var e=_.interpolate(i(n?150:200),i(n?100:150));return this.__prev__=s(t),function(n){return _.svg.arc().startAngle(a(t)).endAngle(a(t+1))(e(n))}}var e=_.interpolate(this.__prev__,s(t));return this.__prev__=s(t),function(t){return _.svg.arc().innerRadius(n?100:150).outerRadius(n?150:200)(e(t))}}),m.selectAll("text.head").data(t).enter().append("text").attr("class","head").attr("dy",5).attr("transform",w().translate(function(t,n){return _.svg.arc().innerRadius(n?150:200).outerRadius(n?200:250).centroid(s(t))})).text(function(t,n){return n?"队尾":"队首"}),m.selectAll("text.head").data(t).transition().duration(v).attr("transform",w().translate(function(t,n){return _.svg.arc().innerRadius(n?100:150).outerRadius(n?150:200).centroid(s(t,t+1))}))}function l(){var t=g.queue,n=function(t){return t.i};h.selectAll("path.item").data(t,n).enter().append("path").attr("class","item"),h.selectAll("path.item").data(t,n).style("opacity",1).transition().duration(v).attrTween("d",function(t,n){if(void 0===this.__prev__){var e=_.interpolate(i(200),i(150));return this.__prev__=s(g.head+1+n),function(t){return _.svg.arc().startAngle(a(g.head+1+n)).endAngle(a(g.head+1+n+1))(e(t))}}var e=_.interpolate(this.__prev__,s(g.head+1+n));return this.__prev__=s(g.head+1+n),function(t){return r()(e(t))}}),h.selectAll("path.item").data(t,n).exit().style("opacity",1).transition().duration(v).style("opacity",0).remove(),m.selectAll("text.item").data(t,n).enter().append("text").attr("class","item").attr("dy",5).text(function(t){return t.v}),m.selectAll("text.item").data(t,n).style("opacity",1).transition().duration(v).attrTween("transform",function(t,n){if(void 0===this.__prev__){var e=_.interpolate(w().translate(r(50).centroid(s(g.head+1+n)))(),w().translate(r().centroid(s(g.head+1+n)))());this.__prev__=g.head+1+n}else{var e=_.interpolate(w().translate(r().centroid(s(this.__prev__)))(),w().translate(r().centroid(s(g.head+1+n)))());this.__prev__=g.head+1+n}return function(t){return e(t)}}),m.selectAll("text.item").data(t,n).exit().style("opacity",1).transition().duration(v).style("opacity",0).remove()}function c(){h.selectAll("path.toque").data(g.toque).enter().append("path").attr("class","toque"),h.selectAll("path.toque").data(g.toque).style("opacity",1).transition().duration(v).attrTween("d",function(t,n){if(void 0===this.__prev__){var e=_.interpolate(i(250),i(200));return this.__prev__=s(g.tail),function(t){return _.svg.arc().startAngle(a(g.tail)).endAngle(a(g.tail+1))(e(t))}}var e=_.interpolate(this.__prev__,s(g.tail));return this.__prev__=s(g.tail),function(t){return _.svg.arc().innerRadius(200).outerRadius(250)(e(t))}}),h.selectAll("path.toque").data(g.toque).exit().style("opacity",1).transition().duration(v).style("opacity",0).remove(),m.selectAll("text.toque").data(g.toque).enter().append("text").attr("class","toque").attr("dy",5).text(function(t){return t}),m.selectAll("text.toque").data(g.toque).style("opacity",1).transition().duration(v).attrTween("transform",function(t,n){if(void 0===this.__prev__){var e=_.interpolate(w().translate(_.svg.arc().innerRadius(250).outerRadius(300).centroid(s(g.tail)))(),w().translate(_.svg.arc().innerRadius(200).outerRadius(250).centroid(s(g.tail)))());this.__prev__=g.tail}else{var e=_.interpolate(w().translate(r(50).centroid(s(this.__prev__)))(),w().translate(r(50).centroid(s(g.tail)))());this.__prev__=g.tail}return function(t){return e(t)}}),m.selectAll("text.toque").data(g.toque).exit().style("opacity",1).transition().duration(v).style("opacity",0).remove()}function p(){h.selectAll("path.tofront").data(g.tofront).enter().append("path").attr("class","tofront"),h.selectAll("path.tofront").data(g.tofront).style("opacity",1).transition().duration(v).attrTween("d",function(t,n){if(void 0===this.__prev__){var e=_.interpolate(i(150),i(200));return this.__prev__=s(g.head+1),function(t){return _.svg.arc().startAngle(a(g.head+1)).endAngle(a(g.head+1+1))(e(t))}}var e=_.interpolate(this.__prev__,s(g.head+1));return this.__prev__=s(g.head+1),function(t){return _.svg.arc().innerRadius(200).outerRadius(250)(e(t))}}),h.selectAll("path.tofront").data(g.tofront).exit().style("opacity",1).transition().duration(v).style("opacity",0).remove(),m.selectAll("text.tofront").data(g.tofront).enter().append("text").attr("class","tofront").attr("dy",5).text(function(t){return t}),m.selectAll("text.tofront").data(g.tofront).style("opacity",1).transition().duration(v).attrTween("transform",function(t,n){if(void 0===this.__prev__){var e=_.interpolate(w().translate(_.svg.arc().innerRadius(150).outerRadius(200).centroid(s(g.head+1)))(),w().translate(_.svg.arc().innerRadius(200).outerRadius(250).centroid(s(g.head+1)))());this.__prev__=g.head+1}else{var e=_.interpolate(w().translate(r(50).centroid(s(this.__prev__)))(),w().translate(r(50).centroid(s(g.head+1)))());this.__prev__=g.head+1}return function(t){return e(t)}}),m.selectAll("text.tofront").data(g.tofront).exit().style("opacity",1).transition().duration(v).style("opacity",0).remove()}function u(t,n){g=t,v=n}function d(t,n){u(t,n),o(),l(),c(),p()}function f(){x=this.props.others.N;var t=this,n=_.behavior.zoom().scaleExtent([.1,10]).on("zoom",function(){t.svg.attr("transform",w().translate(_.event.translate).scale(_.event.scale))});this.svg=_.select(this.refs.svg.getDOMNode()).append("svg").call(n).append("g"),this.g=this.svg.append("g").attr("transform",w().translate(300,250).scale(1)),this.gbase=this.g.append("g").attr("class","base"),this.ghigh=this.g.append("g").attr("class","high"),this.gtext=this.g.append("g").attr("class","text"),this.gbase.append("path").attr("class","queue"),this.gbase.select("path.queue").transition().duration(this.props.delay/3).attrTween("d",function(t){var n=_.interpolate(s(0,0),s(0,x));return function(t){return r()(n(t))}}),h=this.gbase,m=this.gtext,y=this.ghigh}var h,m,y,g,v,g,v,x,_=e(3),w=e(5),k=150,b=200,E=2*Math.PI,A="deepskyblue";t.exports={init:f,render:d}}});