(this["webpackJsonpdsearch-console"]=this["webpackJsonpdsearch-console"]||[]).push([[71],{1029:function(e,t,a){"use strict";a.r(t);var n=a(890),r=a(16),l=a(0),c=a.n(l),i=a(14),u=a(4),o=new(a(70).a),s=function(e){return function(e){return o.call({uri:"/elasticsearch/.dsearch_index_history/_search",method:"post",data:{query:{bool:{minimum_should_match:1,should:[{term:{jobType:"FULL_INDEX"}},{term:{"jobType.keyword":"FULL_INDEX"}}]}},sort:[{endTime:{order:"desc"}}]}}).then((function(t){return e({type:u.D,payload:t.data})})).catch((function(e){return console.error(e)}))}},m=a(134),d=a.n(m),E=a(94),h=a(769),f=a(684),g=a(711),p=a(665),v=a(689),b=a(692),x=a(346),y=a(683),j=a(99),T=a(690),O=a(691),S=a(618),_=a(717),w=a(685),k=a(588),C=a(656),F=a(655),z=a(688),D=a(13),M=a(20),B=a(39),I=a(891),R=a.n(I);function L(){var e=Object(r.a)(["\n    min-width: 25px;\n    max-width: 25px;\n    width: 25px;\n    margin: 2px;\n    min-height: 25px;\n    max-height: 25px;\n    height: 25px;\n    font-size: 0.9em;\n    padding: 2px;\n"]);return L=function(){return e},e}function N(){var e=Object(r.a)(["\n    border: 1px solid rgba(224, 224, 224, 1);\n    padding: 3px;\n"]);return N=function(){return e},e}var A=Object(z.a)((function(e){return{headerField:{fontSize:"1.2em",fontWeight:"bold"},headerValue:{fontSize:"1.2em",fontWeight:"bold"},primaryShard:{border:"1px solid"},replicaShard:{border:"1px dashed"},margin:{margin:e.spacing(1)},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary}}})),U=Object(D.a)({root:{height:10,backgroundColor:Object(M.i)("#A9D0F5",.5)},bar:{borderRadius:20,backgroundColor:"#013ADF"}})(h.a),W=Object(i.c)(f.a)(k.a,C.a),J=Object(i.c)(g.a)(k.a,C.a),X=Object(i.c)(p.a)(k.a,C.a),q=Object(i.c)(v.a)(k.a,C.a,F.a),G=Object(i.c)(b.a)(N()),H=(Object(i.c)(x.a)(L()),function(e,t){return((new Date).getTime()-new Date(e).getTime()).valueOf()/t*100}),V=function(e){var t=((new Date).getTime()-new Date(e).getTime())/3600/1e3*60,a=Math.floor(t/60),n=Math.floor(t%60);if(a>=720){var r=a/30/24;return Math.ceil(r)+"\uac1c\uc6d4"}if(a>=24){var l=a/24;return Math.ceil(l)+"\uc77c"}return 0!==a&&0!==n?a+"\uc2dc\uac04 "+n+"\ubd84":0!==a&&0===n?a+"\uc2dc\uac04":n+"\ubd84"};function Y(e){var t=e.status,a=e.indices,n=(A(),Object(E.f)());var r=[];return Object.values(t).map((function(e){if("green"!==e.health){var t="";Object.values(a).forEach((function(a){a.index===e.index&&(t=a.uuid)}));var n=e;n.uuid=t,r.push(n)}})),c.a.createElement(W,null,c.a.createElement(y.a,null,c.a.createElement(j.a,{variant:"h4",gutterBottom:!0,display:"inline"},"\uc8fc\uc758\ud560 \uc778\ub371\uc2a4"),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(T.a,null,c.a.createElement(O.a,null,r.length>0?r.map((function(e){return c.a.createElement(q,{key:e.index},c.a.createElement(G,{align:"center"},c.a.createElement(S.a,{display:"flex",justifyContent:"left",alignItems:"center"},c.a.createElement(R.a,{style:{color:e.health,marginRight:"5px"}}),c.a.createElement(_.a,{style:{cursor:"pointer"},onClick:function(){return t=e.uuid,void n.push("./indices/".concat(t));var t}},c.a.createElement(j.a,{variant:"h5"},e.index)))),c.a.createElement(G,{align:"center"},"yellow"===e.health?c.a.createElement("font",{color:"orange"}," \ub808\ud50c\ub9ac\uce74 \uc0e4\ub4dc \uc774\uc0c1 "):c.a.createElement("font",{color:"red"}," \ud504\ub77c\uc774\uba38\ub9ac \uc0e4\ub4dc \uc774\uc0c1 ")))})):c.a.createElement(q,null,c.a.createElement(G,{colSpan:2,style:{border:"0px"}},c.a.createElement(S.a,{align:"center",style:{height:"24px"}})))))))}function K(e){var t=e.result,a=e.running,r=(e.status,e.indices),l=Object(E.f)(),i=A(),u=(new Map,[]),o={};if(t.hits.hits.length>=0){var s,m=Object(n.a)(t.hits.hits);try{for(m.s();!(s=m.n()).done;){var d=s.value;o[d._source.index]=d._source}}catch(v){m.e(v)}finally{m.f()}}var h=Object.keys(a);if(0!==h.length){var f,g=Object(n.a)(h);try{var p=function(){var e=f.value,t=a[e].server;if(void 0!==t){var n="";if(Object.values(r).forEach((function(e){e.index===t.index&&(n=e.uuid)})),void 0!==o[t.index]&&void 0!==o[t.index].endTime&&void 0!==o[t.index].startTime&&void 0!==o[t.index].docSize){var l=o[t.index].endTime-o[t.index].startTime,c=o[t.index].docSize;H(t.startTime,l),u.push({startTime:t.startTime,index:t.index,estimatedTime:l,docSize:c,uuid:n})}else u.push({startTime:t.startTime,index:t.index,uuid:n})}};for(g.s();!(f=g.n()).done;)p()}catch(v){g.e(v)}finally{g.f()}}return c.a.createElement(W,null,c.a.createElement(y.a,null,c.a.createElement(j.a,{variant:"h4",gutterBottom:!0,display:"inline"},"\uc804\uccb4\uc0c9\uc778 \uc2e4\ud589\uc911"),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(T.a,null,c.a.createElement(O.a,null,0===u.length?c.a.createElement(q,null,c.a.createElement(G,{align:"center"}," ",c.a.createElement(S.a,{display:"flex",alignItems:"center",justifyContent:"center"}," ",c.a.createElement(j.a,null,"\ud604\uc7ac \uc2e4\ud589\uc911\uc778 \uc0c9\uc778 \uc791\uc5c5\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.")),"  ")):Object.values(u).map((function(e){return c.a.createElement(q,{key:e.index},c.a.createElement(G,{align:"center"},c.a.createElement(_.a,{style:{cursor:"pointer"},onClick:function(){return t=e.uuid,void l.push("./indices/".concat(t));var t}},c.a.createElement(j.a,{variant:"h5"},e.index))),c.a.createElement(G,{align:"center"},c.a.createElement(S.a,{display:"flex",alignItems:"center",justifyContent:"center"},c.a.createElement(S.a,{width:"100%",mr:1},c.a.createElement(U,{className:i.margin,variant:"determinate",color:"secondary",value:Number(H(e.startTime,e.estimatedTime))})),c.a.createElement(S.a,{minWidth:15},c.a.createElement(j.a,{variant:"body2",color:"textSecondary"}," "))),void 0!==e.estimatedTime?c.a.createElement(c.a.Fragment,null," \uc608\uc0c1 \uc885\ub8cc \uc2dc\uac04 : ",function(e){e/=1e3;var t=Math.floor(e/3600),a=Math.ceil((e-3600*t)/60);return 0!==t?t+"\uc2dc\uac04 "+a+"\ubd84":a+"\ubd84"}(e.estimatedTime)," ",c.a.createElement("br",null)," "):c.a.createElement(c.a.Fragment,null,"\uc608\uc0c1 \uc885\ub8cc \uc2dc\uac04 : - ",c.a.createElement("br",null)),void 0!==e.docSize?c.a.createElement(c.a.Fragment,null," \uc608\uc0c1 \ucc98\ub9ac \ubb38\uc11c \uac74\uc218 : ",e.docSize," ",c.a.createElement("br",null)," "):c.a.createElement(c.a.Fragment,null,"\uc608\uc0c1 \ucc98\ub9ac \ubb38\uc11c \uac74\uc218 : - ",c.a.createElement("br",null)),"\uc2dc\uc791\uc2dc\uac04 : ",V(e.startTime)," \uc804 \uc2dc\uc791",c.a.createElement("br",null)))}))))))}function P(e){var t=e.result,a=e.running,n=e.status,r=e.indices;A();return c.a.createElement(X,{container:!0,spacing:3},c.a.createElement(X,{item:!0,xs:6},c.a.createElement(K,{result:t,running:a,status:n,indices:r})),c.a.createElement(X,{item:!0,xs:6},c.a.createElement(Y,{status:n,indices:r})))}function Q(e){var t=e.result,a=e.alias,n=e.indices,r=Object(E.f)(),l=[];return Object.values(t.hits.hits).forEach((function(e){var t="";Object.values(a).forEach((function(a){e._source.index===a.index&&(t=a.alias)}));var r="";Object.values(n).forEach((function(t){t.index===e._source.index&&(r=t.uuid)})),l.push({index:e._source.index,alias:t,status:e._source.status,startTime:e._source.startTime,endTime:e._source.endTime,docSize:e._source.docSize,storage:e._source.store,uuid:r})})),c.a.createElement(c.a.Fragment,null,c.a.createElement(W,{mt:2,style:{overflow:"auto"}},c.a.createElement(y.a,null,c.a.createElement(j.a,{variant:"h4",gutterBottom:!0,display:"inline"},"\uc804\uccb4\uc0c9\uc778 \uacb0\uacfc"),c.a.createElement("br",null)," ",c.a.createElement("br",null),c.a.createElement(T.a,null,c.a.createElement(w.a,null,c.a.createElement(q,null,c.a.createElement(G,{align:"center"},"\uc0c9\uc778 \uacb0\uacfc"),c.a.createElement(G,{align:"center"},"\uc778\ub371\uc2a4"),c.a.createElement(G,{align:"center"},"\ubcc4\uce6d"),c.a.createElement(G,{align:"center"},"\ucd5c\uadfc \uc131\uacf5"),c.a.createElement(G,{align:"center"},"\uc18c\uc694 \uc2dc\uac04"),c.a.createElement(G,{align:"center"},"\ubb38\uc11c\uc218"),c.a.createElement(G,{align:"center"},"\uc2a4\ud1a0\ub9ac\uc9c0 \uc6a9\ub7c9"))),c.a.createElement(O.a,null,0===l.length?c.a.createElement(q,null,c.a.createElement(G,{colSpan:7,align:"center"}," ",c.a.createElement(S.a,{display:"flex",alignItems:"center",justifyContent:"center"}," ",c.a.createElement(j.a,null,"\uc804\uccb4 \uc0c9\uc778 \uacb0\uacfc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."))," ")):Object.values(l).map((function(e){return c.a.createElement(q,{key:e.index},c.a.createElement(G,{align:"center"},c.a.createElement(S.a,{display:"flex",justifyContent:"left",alignItems:"center"},e.status&&"SUCCESS"===e.status?c.a.createElement(R.a,{color:"primary"}):c.a.createElement(R.a,{style:{color:"red"}}),c.a.createElement(j.a,{style:{marginLeft:"5px"}},e.status))),c.a.createElement(G,{align:"center"},c.a.createElement(_.a,{style:{cursor:"pointer"},onClick:function(){return t=e.uuid,void r.push("./indices/".concat(t));var t}},c.a.createElement(j.a,{variant:"h5"},e.index))),c.a.createElement(G,{align:"center"},e.alias),c.a.createElement(G,{align:"center"},c.a.createElement("b",null,V(e.endTime)," \uc804 "),c.a.createElement("br",null),function(e){var t=new Date(e);return t.getFullYear()+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+("0"+t.getDate()).slice(-2)+" "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)}(e.endTime)),c.a.createElement(G,{align:"center"},function(e){e/=1e3;var t=Math.floor(e/3600),a=Math.ceil((e-3600*t)/60);return 0!==t?t+"\uc2dc\uac04 "+a+"\ubd84":a+"\ubd84"}(e.endTime-e.startTime)),c.a.createElement(G,{align:"center"},void 0===(t=e.docSize)||null===t?"":t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),c.a.createElement(G,{align:"center"},e.storage));var t})))))))}t.default=Object(B.b)((function(e){return{result:e.dashBoardReducers.result,running:e.dashBoardReducers.running,status:e.dashBoardReducers.status,alias:e.dashBoardReducers.alias,indices:e.dashBoardReducers.indices}}))((function(e){var t=e.dispatch,a=e.result,n=e.running,r=e.status,i=e.alias,m=e.indices;return A(),Object(l.useEffect)((function(){t(s()),setInterval((function(){t(s())}),18e4),t((function(e){return o.call({uri:"/dashboard/indexing"}).then((function(t){return e({type:u.fb,payload:t.data})})).catch((function(e){return console.error(e)}))})),t((function(e){return o.call({uri:"/elasticsearch/_cat/indices?format=json"}).then((function(t){return e({type:u.G,payload:t.data})})).catch((function(e){return console.error(e)}))})),t((function(e){return o.call({uri:"/elasticsearch/_cat/aliases?format=json"}).then((function(t){return e({type:u.x,payload:t.data})})).catch((function(e){return console.error(e)}))})),t((function(e){return o.call({uri:"/elasticsearch/_cat/indices",params:{format:"json"}}).then((function(t){return e({type:u.p,payload:t.data})})).catch((function(e){return console.error(e)}))}))}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement(d.a,{title:"\ub300\uc2dc\ubcf4\ub4dc"}),c.a.createElement(j.a,{variant:"h3",gutterBottom:!0,display:"inline"}," \ub300\uc2dc\ubcf4\ub4dc "),c.a.createElement(J,{my:6}),c.a.createElement(P,{result:a,running:n,status:r,indices:m}),c.a.createElement(Q,{result:a,alias:i,status:r,indices:m}))}))}}]);
//# sourceMappingURL=71.ab9821fd.chunk.js.map