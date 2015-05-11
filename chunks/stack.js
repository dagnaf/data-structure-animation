webpackJsonpdsa([5],{13:function(t,n,e){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include "./stack.h"</span>\n\nvoid init(Stack *s) {\n    s->top = <span class="number">0</span>;\n};\n\nint isFull(Stack *s) {\n    <span class="keyword">if</span> (s->top == N) {\n        <span class="keyword">return</span> <span class="number">1</span>;\n    } <span class="keyword">else</span> {\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n};\n\nint isEmpty(Stack *s) {\n    <span class="keyword">if</span> (s->top == <span class="number">0</span>) {\n        <span class="keyword">return</span> <span class="number">1</span>;\n    } <span class="keyword">else</span> {\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n};\n\nvoid push(Stack *s, int val) {\n    <span class="keyword">if</span> (isFull(s) == <span class="number">1</span>) {\n        printf(<span class="string">"stack full.\\n"</span>);\n    } <span class="keyword">else</span> {\n        s->data[s->top++] = val;\n    }\n};\n\nvoid pop(Stack *s) {\n    <span class="keyword">if</span> (isEmpty(s) == <span class="number">1</span>) {\n        printf(<span class="string">"stack empty.\\n"</span>);\n    } <span class="keyword">else</span> {\n        s->top = s->top - <span class="number">1</span>;\n    }\n};\n\nint peak(Stack *s) {\n    <span class="keyword">if</span> (isEmpty(s) == <span class="number">1</span>) {\n        printf(<span class="string">"stack empty.\\n"</span>);\n        <span class="keyword">return</span> -<span class="number">1</span>;\n    } <span class="keyword">else</span> {\n        <span class="keyword">return</span> s->data[s->top - <span class="number">1</span>];\n    }\n};'},14:function(t,n,e){t.exports='<span class="comment">#define N 5</span>\n\ntypedef struct {\n    int top;\n    int data[N];\n} Stack;\n\nvoid init(Stack *s);\nint isFull(Stack *s);\nint isEmpty(Stack *s);\nvoid push(Stack *s, int val);\nvoid pop(Stack *s);\nint peak(Stack *s);'},23:function(t,n,e){function r(t){currentStatus.topush=void 0===t?[]:[t]}function a(t){currentStatus.stacktop=void 0===t?[]:[1]}function s(t){currentStatus.topeak=[t]}function i(t,n,e){1===n&&(lastStatus=c(currentStatus)),p.push({status:lastStatus,line:t,animation:e,id:u}),u++}function o(){i(p[p.length-1].line,1)}var l,c=e(4),p=[],u=0,f=[],d=5,h=function(){i(5,1),f=[],currentStatus.stack=f},m=function(){return a(1),i(9,1),f.length===d?(i(10,1),!0):(i(12,1),a(),!1)},y=function(){return a(1),i(17,1),0===f.length?(i(18,1),!0):(i(20,1),a(),!1)},g=function(t){r(t),i(25,1),m()?(i(26,1),console.log("stack full.")):(i(28,1),f.push(t),r())},v=function(){i(33,1),y()?(i(34,1),console.log("stack empty.")):(i(36,1),f.pop())},x=function(){return i(41,1),y()?(i(42,1),console.log("stack empty."),i(43,1),-1):(i(45,1),l=f[f.length-1],s(l),l)};currentStatus={},lastStatus={},t.exports={getInitialDescriptions:function(){return this.initialize(!0),g(0),g(50),this.run("push",100)},initialize:function(t){return p=[],u=0,t&&(f=[]),currentStatus={stack:f,topush:[],topeak:[],stacktop:[]},lastStatus=c(currentStatus),this},push:g,pop:v,peak:x,init:h,run:function(t,n){return this.initialize()[t](n),o(),{frames:p}}}},42:function(t,n,e){var r=e(1),a=e(2);t.exports=r.createClass({displayName:"module.exports",getInitialState:function(){return{text:""}},render:function(){return r.createElement("div",{className:"list"},r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"init"),value:"初始化"}),r.createElement("input",{onChange:this._onChange,value:this.state.text,placeholder:"整数"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"push"),value:"入栈"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"pop"),value:"出栈"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"peak"),value:"栈顶"}))},_onChange:function(t){this.setState({text:t.target.value})},_onClick:function(t){a.runDemo(t,this.state.text)}})},67:function(t,n,e){t.exports="CC=gcc\nCFLAGS=-c -Wall\nLDFLAGS=\nSOURCES=main.c stack.c\nOBJECTS=$(SOURCES:.cpp=.o)\nEXECUTABLE=a.out\n\nall: $(SOURCES) $(EXECUTABLE)\n\n$(EXECUTABLE): $(OBJECTS)\n    $(CC) $(LDFLAGS) $(OBJECTS) -o $@\n\n.cpp.o:\n    $(CC) $(CFLAGS) $&lt; -o $@\n\nclean:\n    rm -rf *.o a.out"},68:function(t,n,e){t.exports='<span class="comment">#include "./stack.h"</span>\n\nint main(int argc, char <span class="keyword">const</span> *argv[]) {\n  Stack stack;\n  init(&amp;stack);\n  push(&amp;stack, <span class="number">0</span>);\n  push(&amp;stack, <span class="number">50</span>);\n  push(&amp;stack, <span class="number">100</span>);\n  <span class="comment">// 在系统中运行命令：</span>\n  <span class="comment">// 初始化、入栈、出栈、栈顶</span>\n  <span class="keyword">return</span> <span class="number">0</span>;\n};'},82:function(t,n,e){function r(){u.selectAll("rect.stack-top").data([h.stack.length]).enter().append("rect").attr("class","stack-top").attr("width",100).attr("height",50).attr("transform",g().translate(function(){return[0,-50]})).transition().duration(m).attr("transform",g().translate(function(t,n){return[0,50*(5-t-1)]})),u.selectAll("rect.stack-top").data([h.stack.length]).transition().duration(m).attr("transform",g().translate(function(t,n){return[0,50*(5-t-1)]})),f.selectAll("text.stack-top").data([h.stack.length]).enter().append("text").attr("class","stack-top").attr("transform",g().translate(function(t,n){return[50,-20]})).transition().duration(m).attr("transform",g().translate(function(t,n){return[50,50*(5-t-1)+25+5]})).text(function(){return"栈顶"}),f.selectAll("text.stack-top").data([h.stack.length]).transition().duration(m).attr("transform",g().translate(function(t,n){return[50,50*(5-t-1)+25+5]}))}function a(){u.selectAll("rect.item").data(h.stack).enter().append("rect").attr("class","item").attr("width",100).attr("height",50).attr("transform",g().translate(function(t){return[0,-100]})).transition().duration(m).attr("transform",g().translate(function(t,n){return[0,50*(5-n-1)]})),u.selectAll("rect.item").data(h.stack).transition().duration(m).attr("transform",g().translate(function(t,n){return[0,50*(5-n-1)]})),u.selectAll("rect.item").data(h.stack).exit().transition().duration(m).remove(),f.selectAll("text.item").data(h.stack).enter().append("text").attr("class","item").attr("transform",g().translate(function(t){return[50,-70]})).transition().duration(m).attr("transform",g().translate(function(t,n){return[50,50*(5-n-1)+25+5]})).text(function(t){return t}),f.selectAll("text.item").data(h.stack).transition().duration(m).attr("transform",g().translate(function(t,n){return[50,50*(5-n-1)+25+5]})).text(function(t){return t}),f.selectAll("text.item").data(h.stack).exit().transition().duration(m).remove()}function s(){u.selectAll("rect.peak").data(h.topeak).enter().append("rect").attr("class","peak").attr("width",100).attr("height",50).attr("transform",g().translate(function(t,n){var e=h.stack.length-1;return[0,50*(5-e-1)]})).transition().duration(m).attr("transform",g().translate(function(t,n){return[0,-100]})),u.selectAll("rect.peak").data(h.topeak).exit().transition().duration(m).remove(),f.selectAll("text.peak").data(h.topeak).enter().append("text").attr("class","peak").attr("transform",g().translate(function(t,n){var e=h.stack.length-1;return[50,50*(5-e-1)+25+5]})).transition().duration(m).attr("transform",g().translate(function(t,n){return[50,-70]})).text(function(t){return t}),f.selectAll("text.peak").data(h.topeak).text(function(t){return t}),f.selectAll("text.peak").data(h.topeak).exit().transition().duration(m).remove()}function i(){u.selectAll("rect.push").data(h.topush).enter().append("rect").attr("class","push").attr("width",100).attr("height",50).attr("transform",g().translate(function(t,n){return[0,-100]})).style("opacity",0).transition().duration(m).style("opacity",1),u.selectAll("rect.push").data(h.topush).exit().transition().duration(m).remove(),f.selectAll("text.push").data(h.topush).enter().append("text").attr("class","push").attr("transform",g().translate(function(t,n){return[50,-70]})).style("opacity",0).transition().duration(m).style("opacity",1).text(function(t){return t}),f.selectAll("text.push").data(h.topush).text(function(t){return t}),f.selectAll("text.push").data(h.topush).exit().transition().duration(m).remove()}function o(){d.selectAll("rect.stack-top-high").data(h.stacktop).enter().append("rect").attr("class","stack-top-high").attr("width",100).attr("height",50).attr("transform",g().translate(function(t,n){var e=h.stack.length;return[0,50*(5-e-1)]})).style("opacity",0).transition().duration(m).style("opacity",1),d.selectAll("rect.stack-top-high").data(h.stacktop).attr("transform",g().translate(function(t,n){var e=h.stack.length;return[0,50*(5-e-1)]})),d.selectAll("rect.stack-top-high").data(h.stacktop).exit().transition().duration(m).remove()}function l(t,n){h=t,m=n}function c(t,n){l(t,n),r(),a(),s(),i(),o()}function p(){var t=this,n=y.behavior.zoom().scaleExtent([.1,10]).on("zoom",function(){t.svg.attr("transform",g().translate(y.event.translate).scale(y.event.scale))});this.svg=y.select(this.refs.svg.getDOMNode()).append("svg").call(n).append("g"),this.g=this.svg.append("g").attr("transform",g().translate(200,200).scale(1)),this.gbase=this.g.append("g").attr("class","base"),this.ghigh=this.g.append("g").attr("class","high"),this.gtext=this.g.append("g").attr("class","text"),this.gbase.append("rect").attr("class","stack").attr("width",100).attr("height",250).attr("transform",g().translate(function(t,n){return[0,-250]})).transition().duration(.75*this.props.delay).attr("transform",g().translate(function(t,n){return[0,0]})),u=this.gbase,f=this.gtext,d=this.ghigh}var u,f,d,h,m,y=e(3),g=e(5);t.exports={init:p,render:c}}});