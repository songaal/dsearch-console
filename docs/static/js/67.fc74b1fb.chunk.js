(this["webpackJsonpdsearch-console"]=this["webpackJsonpdsearch-console"]||[]).push([[67],{1030:function(e,t,a){"use strict";a.r(t);var l=a(61),n=a(0),r=a.n(n),c=a(14),u=a(71),i=a(39),s=a(134),o=a.n(s),m=a(688),E=a(4),d=new(a(70).a),f=function(){return function(e){return d.call({uri:"/elasticsearch/_all/_settings"}).then((function(t){return e({type:E.kb,payload:t.data})}))}},h=function(){return function(e){return d.call({uri:"/tools/plugins"}).then((function(t){return e({type:E.nb,payload:t.data})}))}},v=a(684),y=a(711),p=a(700),g=a(690),b=a(691),k=a(689),L=a(692),_=a(99),z=a(683),O=a(618),T=a(755),j=a(860),M=a(740),B=a(1027),w=a(880),S=a(623),I=a(346),x=a(665),D=a(588),H=Object(m.a)((function(e){return{formControl:{minWidth:250},select:{minWidth:120,marginLeft:e.spacing(1),flex:1,borderBottom:"1px solid gray","&:hover":{borderBottom:"1px solid black"}}}})),C=(r.a.forwardRef((function(e,t){return r.a.createElement(u.c,Object.assign({innerRef:t},e))})),Object(c.c)(v.a)(D.a)),P=Object(c.c)(y.a)(D.a),R=Object(c.c)(p.a)(D.a);function Y(e){var t=e.resultBrief,a=[];if(t.tokens)for(var l=0;l<t.tokens.length;l++)l%5===0&&a.push([]),a[a.length-1].push(t.tokens[l].token);return r.a.createElement(g.a,null,r.a.createElement("colgroup",null,r.a.createElement("col",{width:"20%"}),r.a.createElement("col",{width:"20%"}),r.a.createElement("col",{width:"20%"}),r.a.createElement("col",{width:"20%"}),r.a.createElement("col",{width:"20%"})),r.a.createElement(b.a,null,a.length>0?a.map((function(e,t){return r.a.createElement(k.a,{hover:!0,key:t},e.map((function(e){return r.a.createElement(L.a,null," ",e)})))})):r.a.createElement(k.a,{hover:!0,key:"nothing"},r.a.createElement(L.a,null,"\uac80\uc0c9\ub41c \uacb0\uacfc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4"))))}function W(e){var t=e.resultDetail;return t.result?r.a.createElement(g.a,{key:"detailResult"},r.a.createElement(b.a,null,r.a.createElement(k.a,{hover:!0},r.a.createElement(L.a,null,r.a.createElement(_.a,{variant:"h4"},"1. ",t.result[2].key),r.a.createElement("br",null),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.result[2].value}}))),r.a.createElement(k.a,{hover:!0},r.a.createElement(L.a,null,r.a.createElement(_.a,{variant:"h4"},"2. ",t.result[3].key),r.a.createElement("br",null),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.result[3].value}}))),r.a.createElement(k.a,{hover:!0},r.a.createElement(L.a,null,r.a.createElement(_.a,{variant:"h4"},"3. ",t.result[4].key),r.a.createElement("br",null),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.result[4].value}}))),r.a.createElement(k.a,{hover:!0},r.a.createElement(L.a,null,r.a.createElement(_.a,{variant:"h4"},"4. ",t.result[5].key),r.a.createElement("br",null),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.result[5].value}}))),r.a.createElement(k.a,{hover:!0},r.a.createElement(L.a,null,r.a.createElement(_.a,{variant:"h4"},"5. ",t.result[6].key),r.a.createElement("br",null),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.result[6].value}}))),r.a.createElement(k.a,{hover:!0},r.a.createElement(L.a,null,r.a.createElement(_.a,{variant:"h4"},"6. ",t.result[7].key),r.a.createElement("br",null),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.result[7].value}}))))):r.a.createElement(g.a,{key:"empltyDetail"},r.a.createElement(b.a,null,r.a.createElement(k.a,null,r.a.createElement(L.a,null,"\uac80\uc0c9\ub41c \uacb0\uacfc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."))))}function J(e){var t=e.dispatch,a=e.analyzerList,c=e.pluginList,u=e.resultBrief,i=e.resultDetail,s=Object(n.useState)("EMPTY"),o=Object(l.a)(s,2),m=o[0],v=o[1],y=Object(n.useState)("brief"),p=Object(l.a)(y,2),g=p[0],b=p[1],k=H(),L=[];void 0!==a&&null!==a&&Object.keys(a).filter((function(e){return!e.startsWith(".")})).map((function(e){var t=a[e].settings.index.analysis;void 0!==t&&void 0!==t.analyzer&&Object.keys(t.analyzer).map((function(t){return L.push(e+"/"+t)}))}));return r.a.createElement(C,{mb:6},r.a.createElement(z.a,null,r.a.createElement(R,{id:"analyzer_contents",label:"\ubd84\uc11d\ud560 \ub0b4\uc6a9\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694.",multiline:!0,rows:2,variant:"outlined",fullWidth:!0}," "),r.a.createElement(O.a,{display:"flex",alignItems:"center",justifyContent:"left"},r.a.createElement(O.a,{p:3},r.a.createElement(T.a,null,r.a.createElement(j.a,{value:g,row:!0,onChange:function(e){"brief"===g?(0!==((c||{}).plugins||[]).length?v(((c||{}).plugins||[])[0]):v("EMPTY"),t(f())):(0!==L.length?v(L[0]):v("EMPTY"),t(h())),b(e.target.value)}},r.a.createElement(M.a,{value:"brief",control:r.a.createElement(B.a,{size:"small"}),label:"\uac04\ub7b5"}),r.a.createElement(M.a,{value:"detail",control:r.a.createElement(B.a,{size:"small"}),label:"\uc0c1\uc138"})))),r.a.createElement(O.a,{p:3},r.a.createElement(T.a,{className:k.formControl},r.a.createElement(w.a,{id:"analyzer_select",value:m,onChange:function(e){v(e.target.value)},defaultValue:"",displayEmpty:!0},"brief"===g?0===L.length?r.a.createElement(S.a,{key:"no",selected:!0,disabled:!0,value:"EMPTY"}," \ubd84\uc11d\uae30\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. "):L.map((function(e,t){return 0===t?r.a.createElement(S.a,{key:e,selected:!0,value:e}," ",e," "):r.a.createElement(S.a,{key:e,value:e}," ",e," ")})):0===((c||{}).plugins||[]).length?r.a.createElement(S.a,{key:"no",selected:!0,disabled:!0,value:"EMPTY"}," \ubd84\uc11d\uae30\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. "):((c||{}).plugins||[]).map((function(e,t){return 0===t?r.a.createElement(S.a,{key:e,selected:!0,value:e}," ",e," "):r.a.createElement(S.a,{key:e,value:e}," ",e," ")}))))),r.a.createElement(I.a,{variant:"outlined",color:"secondary",onClick:function(){var e=document.getElementById("analyzer_contents"),a=document.getElementById("analyzer_select"),l={};if("brief"===g){var n=a.innerHTML.split("/");if(n&&2===n.length){var r=n[0].replace(" ",""),c=n[1].replace(" ","");l.text=e.value,l.analyzer=c,t(function(e,t){return function(a){return d.call({uri:"/elasticsearch/"+e+"/_analyze",method:"POST",data:t}).then((function(e){return a({type:E.lb,payload:e.data})}))}}(r,l)).catch((function(e){console.log(e)}))}else console.error("err",n)}else{var u=a.innerHTML;u=u.replace(/ /gi,""),l.plugin=u,l.text=e.value,t(function(e){return function(t){return d.call({uri:"/tools/detail/analysis",method:"POST",data:e}).then((function(e){return t({type:E.mb,payload:e.data})}))}}(l))}}},"\ubd84\uc11d")),r.a.createElement(O.a,{m:2},r.a.createElement(_.a,{variant:"h4",display:"inline"},"\ubd84\uc11d \uacb0\uacfc")),r.a.createElement(O.a,{p:2},"brief"==g?r.a.createElement(Y,{resultBrief:u}):r.a.createElement(W,{resultDetail:i}))))}t.default=Object(i.b)((function(e){return{pluginList:e.toolsReducers.pluginList,analyzerList:e.toolsReducers.analyzerList,resultBrief:e.toolsReducers.resultBrief,resultDetail:e.toolsReducers.resultDetail}}))((function(e){var t=e.dispatch,a=e.analyzerList,l=e.pluginList,c=e.resultBrief,u=e.resultDetail;return Object(n.useEffect)((function(){t(f()),t(h())}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{title:"Blank"}),r.a.createElement(_.a,{variant:"h3",display:"inline"},"\ubd84\uc11d\ub3c4\uad6c"),r.a.createElement(P,{my:6}),r.a.createElement(x.a,{container:!0,spacing:6},r.a.createElement(x.a,{item:!0,xs:12},r.a.createElement(J,{dispatch:t,analyzerList:a,pluginList:l,resultBrief:c,resultDetail:u,onClick:function(){return console.log("click")}}))))}))}}]);
//# sourceMappingURL=67.fc74b1fb.chunk.js.map