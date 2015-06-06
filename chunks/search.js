webpackJsonpdsa([7],{2:function(e,n,t){e.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;stdlib.h></span>\n<span class="comment">#include &lt;string.h></span>\n<span class="comment">#include "./util.h"</span>\n\nvoid* SafeMalloc(size_t size) {\n    void* m;\n    <span class="keyword">if</span> ((m = malloc(size))) {\n        <span class="keyword">return</span> m;\n    } <span class="keyword">else</span> {\n        printf(<span class="string">"memory overflow\\n"</span>);\n        <span class="keyword">exit</span>(-<span class="number">1</span>);\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n}\n\nvoid MemoryCopy(void *a, <span class="keyword">const</span> void *b, size_t size) {\n    <span class="comment">// size_t i;</span>\n    <span class="comment">// size_t n = size / sizeof(char);</span>\n    <span class="comment">// for (i = 0; i &lt; n; ++i) {</span>\n    <span class="comment">//     *((char *)a + i) = *((char *)b + i);</span>\n    <span class="comment">// }</span>\n    memcpy(a, b, size);\n}\n\nvoid MemorySwap(void *a, void *b, size_t size) {\n    <span class="comment">// size_t i;</span>\n    <span class="comment">// size_t n = size / sizeof(char);</span>\n    <span class="comment">// char t;</span>\n    <span class="comment">// for (i = 0; i &lt; n; ++i) {</span>\n    <span class="comment">//     t = *(char *)a;</span>\n    <span class="comment">//     *((char *)a + i) = *((char *)b + i);</span>\n    <span class="comment">//     *((char *)b + i) = t;</span>\n    <span class="comment">// }</span>\n    void *t = SafeMalloc(size);\n    memcpy(t, a, size);\n    memcpy(a, b, size);\n    memcpy(b, t, size);\n}\n\nvoid MemoryClear(void *a, size_t size) {\n    memset(a, <span class="number">0</span>, size);\n}\n\nvoid *MemoryAddress(void *a, int i, size_t size) {\n    <span class="keyword">return</span> (char *)a + i*size;\n}'},3:function(e,n,t){e.exports='<span class="comment">#ifndef UTIL_H</span>\n<span class="comment">#define UTIL_H</span>\n\n<span class="comment">#include &lt;stddef.h></span>\n\nvoid * SafeMalloc(size_t size);\nvoid MemoryCopy(void *a, <span class="keyword">const</span> void *b, size_t size);\nvoid MemorySwap(void *a, void *b, size_t size);\nvoid MemoryClear(void *a, size_t size);\n\n<span class="comment">#endif</span>'},34:function(e,n,t){function a(e,n,t,a){var s,i;for(s=0;p(7,1),c([s,t-1]),t>s;++s){if(r([s,s]),f.k=e,p(8,1),i=a(n[s],e),o([s]),p(9,1),0===i)return p(10,1),c([s,s]),l(1),s;if(p(11,1),i>0){p(12,1),o();break}o()}return p(15,1),l(-1),-1}function s(e,n,t,a){p(19,1);var s,i=0,d=t-1;for(c([i,d]),r([i,d]),f.k=e;p(20,1),d>i;)p(21,1),s=Math.floor((i+d)/2),c([s,s]),p(22,1),o([s]),a(e,n[s])>0?(p(23,1),i=s+1):(p(25,1),d=s),r([i,d]),c([i,d]),o();return p(28,1),o([i]),0!=a(e,n[i])?(p(29,1),l(-1),-1):(p(31,1),l(1),i)}function r(e){f.p=e||[]}function o(e){f.c=e||[]}function c(e){f.hl=e||[]}function l(e){f.r=e}function p(e,n,t){1===n&&(lastStatus=f.clone()),m.push({status:lastStatus,line:e,animation:t,id:h}),h++}function d(){0===m.length?0:m[m.length-1].line;p(86,1)}var u=t(6),m=[],h=0,f={},g=0,y=[];f.clone=function(){return{arr:y,p:u(this.p)||[],hl:u(this.hl)||[],k:this.k,c:u(this.c)||[],r:this.r}},f.init=function(e){this.p=[],this.c=[],this.hl=[],this.k=void 0,this.r=0},lastStatus={},e.exports={getInitialDescriptions:function(){this.initialize(!0);var e=11,n=[1,1];for(i=2;i<e;++i)n.push(n[i-1]+n[i-2]);return this.run("create",n.join(" "))},initialize:function(e){return m=[],h=0,g=0,f.init(e),lastStatus=f.clone(),this},lsearch:function(e){a(Math.max(1,parseInt(e)),y,y.length,function(e,n){return e-n})},bsearch:function(e){s(Math.max(1,parseInt(e)),y,y.length,function(e,n){return e-n})},create:function(e){y=e.split(" ").map(function(e){return parseInt(e)}).filter(function(e){return e>0}),p(0)},run:function(e,n){return this.initialize()[e](n),d(),{frames:m,others:{}}}}},44:function(e,n,t){n=e.exports=t(7)(),n.push([e.id,"#right-arr path{-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}line.ptr{stroke:#00bfff;stroke-width:10px;stroke-opacity:1}",""])},71:function(e,n,t){var a=t(1);e.exports=a.createClass({displayName:"module.exports",render:function(){var e={display:this.props.show?"block":"none"};return a.createElement("svg",{className:"legend",width:"210",height:"210",style:e},a.createElement("rect",{className:"outline",stroke:"black",x:"0",y:"0",width:"200",height:"190"}),a.createElement("g",{transform:"translate(15,20)"},a.createElement("g",{transform:"translate(0,0)"},a.createElement("g",{transform:"scale(0.5)"},a.createElement("path",{d:"M0,0L50,0",className:"edge painter-selected",markerEnd:"url(#arrow-end)"}))),a.createElement("g",{transform:"translate(0,25)"},a.createElement("g",{transform:"scale(0.5)"},a.createElement("path",{d:"M0,0L50,0",className:"ine"}))),a.createElement("g",{transform:"translate(6,50)"},a.createElement("circle",{cx:"0",cy:"0",r:"6",className:"node highlighted"})),a.createElement("g",{transform:"translate(6,75)"},a.createElement("circle",{cx:"0",cy:"0",r:"6",className:"node visited"})),a.createElement("g",{transform:"translate(6,100)"},a.createElement("circle",{r:"6",className:"node"}),a.createElement("path",{d:"M0,0L0,-6A6,6 0 0,1 5.19,3Z",className:"inq"})),a.createElement("g",{transform:"translate(6,125)"},a.createElement("circle",{r:"6",className:"node"}),a.createElement("text",{x:"2",y:"-2",fontSize:"10px"},"[a]")),a.createElement("g",{transform:"translate(6,150)"},a.createElement("circle",{r:"6",className:"node"}),a.createElement("text",{x:"2",y:"-2",fontSize:"10px"},"(a,b)")),a.createElement("g",{transform:"translate(0,5)"},a.createElement("text",{x:"40",y:"0"},"当前边"),a.createElement("text",{x:"40",y:"25"},"遍历边"),a.createElement("text",{x:"40",y:"50"},"当前结点"),a.createElement("text",{x:"40",y:"75"},"已访问的结点"),a.createElement("text",{x:"40",y:"100"},"访问中的结点"),a.createElement("text",{x:"40",y:"125"},"结点拓扑序号"),a.createElement("text",{x:"40",y:"150"},"时间戳和最远结点"))))}})},72:function(e,n,t){var a=t(1),s=t(5),r=t(150),i=t(71);e.exports=a.createClass({displayName:"module.exports",getInitialState:function(){return{text:"5",demo:"bsearch",help:!0}},componentDidMount:function(){r.init.bind(this)(),s.runDemo("create","1 1 2 3 5 8 13 21 34 55 89"),s.runDemo("bsearch",5,!1)},componentDidUpdate:function(e){this.props!==e&&void 0!==this.props.frame&&r.render(this.props.frame.status,this.props.delay,this.props.others)},render:function(){var e=[{button:{demo:"create",onClick:this._onClick.bind(this,"create"),value:"新数组"},items:[{onChange:this._onChange,value:this.state.text,placeholder:"数组"}]},{button:{demo:"lsearch",onClick:this._onClick.bind(this,"lsearch"),value:"线性查找"},items:[{onChange:this._onChange,value:this.state.text,placeholder:"数字"}]},{button:{demo:"bsearch",onClick:this._onClick.bind(this,"bsearch"),value:"二分查找"},items:[{onChange:this._onChange,value:this.state.text,placeholder:"数字"}]},{button:{help:this.state.help,onClick:this._onHelp,value:"帮助"}}],n=this;return a.createElement("div",{className:"wrapper-code"},a.createElement("div",{className:"list"},e.map(function(e,t){var s="input-group"+(e.button.help||e.button.demo===n.state.demo?" input-current":""),r=e.items?e.items:[];return a.createElement("div",{key:t,className:s},a.createElement("input",{className:"input-button",readOnly:!0,onClick:e.button.onClick,value:e.button.value,title:e.button.value}),a.createElement("div",null,r.map(function(e,n){return a.createElement("input",{key:n,className:"input-item",onChange:e.onChange,value:e.value,title:e.value,placeholder:e.placeholder})})))})),a.createElement("div",{ref:"svg",className:"scene"}),a.createElement(i,{show:this.state.help}))},_onChange:function(e){this.setState({text:e.target.value})},_onClick:function(e){this.setState({demo:e}),s.runDemo(e,this.state.text)},_onHelp:function(){this.setState({help:!this.state.help})}})},111:function(e,n,t){e.exports="CC=gcc\nCFLAGS=-c -Wall\nLDFLAGS=\nSOURCES=test.c search.c search.h ../common/util.c ../common/util.h\nOBJECTS=$(SOURCES:.c=.o)\nEXECUTABLE=a.out\n\nall: $(SOURCES) $(EXECUTABLE)\n\n$(EXECUTABLE): $(OBJECTS)\n    $(CC) $(LDFLAGS) $(OBJECTS) -o $@\n\n.cpp.o:\n    $(CC) $(CFLAGS) $&lt; -o $@\n\nclean:\n    rm -rf *.o a.out"},112:function(e,n,t){e.exports='<span class="comment">#include &lt;stddef.h></span>\n<span class="comment">#include "search.h"</span>\n\nvoid *LinearSearch (void *k, void *a, int n, int s, int(*Compare)(<span class="keyword">const</span> void *,<span class="keyword">const</span> void *)) {\n    char *p;\n    int r;\n    <span class="keyword">for</span> (p = (char *)a; p &lt; (char *)a + n*s; p += s) {\n        r = Compare(p, k);\n        <span class="keyword">if</span> (r == <span class="number">0</span>) {\n            <span class="keyword">return</span> p;\n        } <span class="keyword">else</span> <span class="keyword">if</span> (r > <span class="number">0</span>) {\n            <span class="keyword">break</span>;\n        }\n    }\n    <span class="keyword">return</span> <span class="keyword">NULL</span>;\n}\n\nvoid *BinarySearch (void *k, void *a, int n, int s, int(*Compare)(<span class="keyword">const</span> void *,<span class="keyword">const</span> void *)) {\n    int l = <span class="number">0</span>, m, r = n-<span class="number">1</span>;\n    <span class="keyword">while</span> (l &lt; r) {\n        m = (l+r) / <span class="number">2</span>;\n        <span class="keyword">if</span> (Compare(k, (char *)a + m*s) > <span class="number">0</span>) {\n            l = m+<span class="number">1</span>;\n        } <span class="keyword">else</span> {\n            r = m;\n        }\n    }\n    <span class="keyword">if</span> (Compare(k, (char *)a + l*s) != <span class="number">0</span>) {\n      <span class="keyword">return</span> <span class="keyword">NULL</span>;\n    }\n    <span class="keyword">return</span>  (char *)a + l*s;\n}'},113:function(e,n,t){e.exports='<span class="comment">#ifndef SEARCH_H</span>\n<span class="comment">#define SEARCH_H</span>\n\nvoid *LinearSearch (void *k, void *a, int n, int s, int(*Compare)(<span class="keyword">const</span> void *, <span class="keyword">const</span> void *));\nvoid *BinarySearch (void *k, void *a, int n, int s, int(*Compare)(<span class="keyword">const</span> void *, <span class="keyword">const</span> void *));\n\n<span class="comment">#endif</span>'},114:function(e,n,t){e.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;assert.h></span>\n<span class="comment">#include "./search.h"</span>\n<span class="comment">#include "../common/util.h"</span>\n\nint cf(<span class="keyword">const</span> void *a, <span class="keyword">const</span> void *b) {\n    <span class="keyword">return</span> *(int *)a - *(int *)b;\n}\n\nint main(int argc, char <span class="keyword">const</span> *argv[])\n{\n    int i;\n    int n, m;\n    int *a;\n    int x;\n    scanf(<span class="string">"%d%d"</span>, &amp;n, &amp;m);\n    a = SafeMalloc(sizeof(int)*n);\n    <span class="keyword">for</span> (i = <span class="number">0</span>; i &lt; n; ++i) {\n        scanf(<span class="string">"%d"</span>, a+i);\n    }\n    <span class="keyword">for</span> (i = <span class="number">0</span>; i &lt; m; ++i) {\n        scanf(<span class="string">"%d"</span>, &amp;x);\n        printf(<span class="string">"test %d search %d "</span>, i+<span class="number">1</span>, x);\n        assert(LinearSearch(&amp;x,a,n,sizeof(int),cf) == BinarySearch(&amp;x,a,n,sizeof(int),cf));\n        printf(<span class="string">"passed\\n"</span>);\n    }\n    printf(<span class="string">"all %d tests passed\\n"</span>, m);\n    <span class="keyword">return</span> <span class="number">0</span>;\n}'},134:function(e,n,t){var a=t(44);"string"==typeof a&&(a=[[e.id,a,""]]);t(9)(a,{})},150:function(e,n,t){function a(){function e(e,n){return m.hl[0]+1<=n&&n<=m.hl[1]+1||0==n?1:.2}var n=[m.k].concat(m.arr);p.selectAll("rect.chart").data(n).enter().append("rect").attr("class","chart").attr("x",function(e,n){return k(n)}).attr("y",function(){return w(0)}).attr("height",0),p.selectAll("rect.chart").data(n).transition().duration(h).attr("x",function(e,n){return k(n)}).attr("y",function(e){return w(e)}).attr("height",function(e){return w(0)-w(e)}).attr("width",function(){return k.rangeBand()}).style("opacity",e).style("fill",function(e,n){return 0===n?_:null}),p.selectAll("rect.chart").data(n).exit().remove(),d.selectAll("text.chart").data(n).enter().append("text").attr("class","chart").attr("x",function(e,n){return k(n)+k.rangeBand()/2}).attr("y",function(){return w(0)}).text(function(e){return e?e:""}),d.selectAll("text.chart").data(n).transition().duration(h).style("opacity",e).attr("x",function(e,n){return k(n)+k.rangeBand()/2}).attr("y",function(e){return w(e)-20}).text(function(e){return e?e:""}),d.selectAll("text.chart").data(n).exit().remove()}function s(){var e=m.c;u.selectAll("rect.cf").data(e).enter().append("rect").attr("class","cf").attr("x",k(0)).attr("y",w(m.k)).attr("height",w(0)-w(m.k)).attr("width",k.rangeBand()).style("opacity",.6).style("fill",_),u.selectAll("rect.cf").data(e).transition().duration(h).attr("width",k.rangeBand()).attr("height",w(0)-w(m.k)).attr("y",w(m.k)).attr("x",function(e){return k(e+1)}),u.selectAll("rect.cf").data(e).exit().remove()}function r(){function e(){return 0===m.r?_:1===m.r?"green":"red"}f.select("#left-arr").select("path").transition().duration(h).style("stroke",e()),f.select("#right-arr").select("path").transition().duration(h).style("stroke",e());var n,t,a,s,r,i,o=m.p;1===o.length?(n="right",t="left",a=r=k(o[0]+1)+k.rangeBand()/2,s=i=w(m.arr[o[0]])-40):2===o.length&&(o[0]===o[1]?(n="left",t=null,a=r=k(o[0]+1)+k.rangeBand()/2,i=w(m.arr[o[0]])-60,s=i-60):(n="left",t="right",a=k(o[0]+1)+10,r=k(o[1]+1)+k.rangeBand()-15,s=i=y+20));var c=0===o.length?[]:[1];p.selectAll("line.ptr").data(c).enter().append("line").attr("class","ptr").attr("x1",a).attr("x2",r).attr("y1",s).attr("y2",i).attr("marker-start",t?"url(#"+t+"-arr)":null).attr("marker-end",n?"url(#"+n+"-arr)":null),p.selectAll("line.ptr").data(c).attr("marker-start",t?"url(#"+t+"-arr)":null).attr("marker-end",n?"url(#"+n+"-arr)":null).transition().duration(h).style("stroke",e).attr("x1",a).attr("x2",r).attr("y1",s).attr("y2",i),p.selectAll("line.ptr").data(c).exit().remove()}function i(){m.k=m.k||0,0===m.hl.length&&(m.hl=[0,m.arr.length-1]),k.domain(f.range(m.arr.length+1)),w.domain([0,Math.max(m.k,f.max(m.arr))])}function o(e,n){m=e,h=n}function c(e,n){o(e,n),i(),a(),s(),r()}function l(){var e=this,n=f.behavior.zoom().scaleExtent([.1,10]).on("zoom",function(){e.svg.attr("transform",g().translate(f.event.translate).scale(f.event.scale))});this.svg=f.select(this.refs.svg.getDOMNode()).append("svg").call(n).append("g");this.svg.append("defs").selectAll("marker").data(["left","right"]).enter().append("marker").attr("id",function(e){return e+"-arr"}).attr("viewBox","-5 -5 20 15").attr("markerWidth",x).attr("markerHeight",x).attr("orient","auto").attr("refX",function(e){return"left"===e?7:1}).append("path").attr("d","M0,-5L10,0L0,5").attr("fill","none").attr("stroke",_).attr("stroke-width",3);this.g=this.svg.append("g").attr("transform",g().translate(100,200).scale(.5)),p=this.g.append("g").attr("class","base"),u=this.g.append("g").attr("class","high"),d=this.g.append("g").attr("class","text")}t(134);var p,d,u,m,h,f=t(4),g=t(8),y=600,v=720,k=f.scale.ordinal().rangeRoundBands([0,v],.08),w=f.scale.linear().range([y,0]),x=5,_="deepskyblue";e.exports={init:l,render:c}}});