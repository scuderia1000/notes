(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o,c=n(1),r=n.n(c),i=n(6),a=n.n(i),s=(n(15),n(16),n(4)),u=n(3),l=n(2),d=(n(17),n(0)),f={noteId:"",text:"",top:120,left:30,order:0,width:200,height:200,minWidth:50,minHeight:50},h=c.forwardRef((function(e,t){var n=e.text,o=e.left,c=e.top,r=e.zIndex,i=e.onTextChange,a=e.onMouseDown,s=e.width,u=e.height,l=e.onDblClick,f=e.isEditMode;return Object(d.jsx)("textarea",{ref:t,className:"note",style:{left:o,top:c,zIndex:r,width:s,height:u},value:n,readOnly:!f,onMouseDown:a,onChange:i,onDoubleClick:l})}));n(19);!function(e){e.XS="XS",e.S="S",e.M="M",e.L="L"}(o||(o={}));var j="button",b=function(e){var t=e.onClick,n=e.icon,c=e.className,r=void 0===c?"":c,i=e.size,a=void 0===i?o.M:i;return Object(d.jsx)("div",{className:"".concat(j," ").concat(r," ").concat(j,"_size-").concat(a),onClick:t,children:n})},g=(n(20),function(){return Object(d.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(d.jsx)("rect",{x:"5",y:"11",width:"14",height:"2",fill:"currentColor"}),Object(d.jsx)("rect",{x:"13",y:"5",width:"14",height:"2",transform:"rotate(90 13 5)",fill:"currentColor"})]})}),v=function(){return Object(d.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(d.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z",fill:"currentColor"})})},O=function(e){var t=e.onClick;return Object(d.jsx)("div",{className:"button__add",children:Object(d.jsx)(b,{onClick:t,icon:Object(d.jsx)(g,{})})})},m=function(){var e=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return"".concat(e()+e(),"-").concat(e(),"-").concat(e(),"-").concat(e(),"-").concat(e()).concat(e()).concat(e())},p=(n(21),n(7)),x=n(8),w=n(10),I=n(9);function S(){var e=function(e,t){var n,o=null!==(n=localStorage.getItem(e))&&void 0!==n?n:"",c=JSON.parse(o),r=Object(l.a)(Object(l.a)({},c),t);localStorage.setItem(e,JSON.stringify(r))};return{storageReplaceItem:e,storageUpdateItemsProp:function(t,n){Object.keys(t).forEach((function(o){var c=t[o];e(o,Object(s.a)({},n,c[n]))}))},storageSaveItem:function(e,t){localStorage.setItem(e,JSON.stringify(t))},storageDeleteItem:function(e){localStorage.removeItem(e)},storageGetAll:function(){return Object.keys(localStorage).reduce((function(e,t){return Object(l.a)(Object(l.a)({},e),{},Object(s.a)({},t,JSON.parse(localStorage[t])))}),{})},storageClearAll:function(){return localStorage.clear()}}}var N=function(e){return function(t){var n=S(),o=n.storageReplaceItem,c=n.storageSaveItem,r=n.storageDeleteItem,i=n.storageUpdateItemsProp;return Object(d.jsx)(e,Object(l.a)(Object(l.a)({},t),{},{storageReplaceItem:o,storageSaveItem:c,storageDeleteItem:r,storageUpdateItemsProp:i}))}},C=(n(22),function(e){return function(t){var n=t.noteId,o=t.width,r=t.height,i=t.left,a=t.top,s=t.isSelected,h=t.forwardRef,j=S().storageReplaceItem,b=Object(c.useState)({x:0,y:0}),g=Object(u.a)(b,2),v=g[0],O=g[1],m=Object(c.useState)({width:o,height:r}),p=Object(u.a)(m,2),x=p[0],w=p[1],I=Object(c.useState)({width:o,height:r}),N=Object(u.a)(I,2),C=N[0],k=N[1],M=Object(c.useState)(1),y=Object(u.a)(M,2),E=y[0],R=y[1],z=Object(c.useState)(!1),D=Object(u.a)(z,2),L=D[0],H=D[1],T=Object(c.useCallback)((function(e){if(L){var t=e.pageX-v.x,n=e.pageY-v.y,o=x.width+t,c=x.height+n;f.minWidth&&o<f.minWidth&&(o=f.minWidth),f.minHeight&&c<f.minHeight&&(c=f.minHeight),k({width:o,height:c}),e.preventDefault()}}),[v,x,k,L]),B=Object(c.useCallback)((function(){if(L){var e=C.width,t=C.height;w({width:e,height:t}),R(1),H(!1),O({x:0,y:0}),j(n,{width:e,height:t})}}),[j,C,w,R,n,L]),U=Object(c.useCallback)((function(e){O({x:e.pageX,y:e.pageY}),R(999),H(!0)}),[T,B]);return Object(c.useEffect)((function(){return L&&document.addEventListener("mousemove",T),function(){document.removeEventListener("mousemove",T)}}),[L]),Object(c.useEffect)((function(){return L&&document.addEventListener("mouseup",B),function(){document.removeEventListener("mouseup",B)}}),[L,C]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"resize",style:{left:i-10,top:a-10,opacity:s?1:0,width:C.width+20,height:C.height+30,zIndex:E},children:Object(d.jsx)("div",{className:"resize-corner",onMouseDown:U})}),Object(d.jsx)(e,Object(l.a)(Object(l.a)({},t),{},{ref:h,width:C.width,height:C.height}))]})}}(h)),k=N(function(e){Object(w.a)(n,e);var t=Object(I.a)(n);function n(e){var o;Object(p.a)(this,n),(o=t.call(this,e)).noteRef=void 0,o.onMouseDown=function(e){var t=o.props,n=t.setSelectedNoteId,c=t.noteId,r=o.noteRef.current;if(r){var i=r.getBoundingClientRect();o.setState({mouseNoteOffset:{x:e.pageX-i.left,y:e.pageY-i.top},zIndex:999}),document.addEventListener("mousemove",o.onMouseMove),document.addEventListener("mouseup",o.onMouseUp),n(c)}},o.onMouseMove=function(e){var t=o.state.mouseNoteOffset,n=o.noteRef.current;if(n){var c=n.getBoundingClientRect(),r=t.x,i=t.y,a=e.pageX-r,s=e.pageY-i;s<0?s=0:s+c.height>window.innerHeight&&(s=window.innerHeight-c.height),o.setState({position:{left:a,top:s}}),e.preventDefault()}},o.onMouseUp=function(){document.removeEventListener("mousemove",o.onMouseMove),document.removeEventListener("mouseup",o.onMouseUp);var e=o.props,t=e.storageReplaceItem,n=e.moveNoteToFront,c=e.noteId;if(!o.deleteNoteIfNeeded()){var r=o.state.position;n(c),t&&t(c,r),o.setState({zIndex:1})}},o.onTextChange=function(e){var t=o.props,n=t.storageReplaceItem,c=t.noteId,r=e.currentTarget.value;o.setState({text:r}),n&&n(c,{text:r})},o.deleteNoteIfNeeded=function(){var e=o.props,t=e.noteId,n=e.deleteNote,c=o.noteRef.current,r=document.getElementsByClassName("trash")[0];return!(!c||!r)&&(!!function(e,t){var n=e.left,o=e.left+e.width,c=e.top,r=e.top+e.height,i=t.left,a=t.left+t.width,s=t.top,u=t.top+t.height;return!(n>a||o<i||c>u||r<s)}(c.getBoundingClientRect(),r.getBoundingClientRect())&&(n(t),!0))},o.onDblClick=function(){o.setState({isEditMode:!0})};var r=e.note,i=r.left,a=r.top;return o.state={zIndex:1,text:r.text,position:{left:i,top:a},mouseNoteOffset:{x:0,y:0},observer:void 0,isEditMode:!1},o.noteRef=c.createRef(),o}return Object(x.a)(n,[{key:"render",value:function(){var e=this.props,t=e.noteId,n=e.isSelected,o=e.note,c=o.width,r=o.height,i=this.state,a=i.position,s=i.zIndex,u=i.text,l=i.isEditMode;return Object(d.jsx)(C,{noteId:t,text:u,left:a.left,top:a.top,forwardRef:this.noteRef,zIndex:s,width:c,height:r,isEditMode:l,isSelected:n,onTextChange:this.onTextChange,onMouseDown:this.onMouseDown,onDblClick:this.onDblClick})}}]),n}(c.Component)),M=function(e){var t=e.items,n=e.moveNoteToFront,o=e.deleteNote,r=Object(c.useState)(""),i=Object(u.a)(r,2),a=i[0],s=i[1],l=Object(c.useCallback)((function(e){var t=e.target;if(t){var n=t.className;["note","resize-corner","resize"].includes(n)||s("")}}),[s]);return Object(c.useEffect)((function(){return document.addEventListener("click",l),function(){document.removeEventListener("click",l)}}),[]),Object(d.jsx)(d.Fragment,{children:Object.keys(t).map((function(e){return Object(d.jsx)(k,{note:t[e],noteId:e,moveNoteToFront:n,deleteNote:o,isSelected:a===e,setSelectedNoteId:s},e)}))})},y=function(e,t){var n=Object.keys(t),o=0;n.forEach((function(c,r){c===e&&(o=r,t[c].order=n.length-1),r>o&&(t[c].order=r-1)}))},E=function(){var e=Object(c.useState)({}),t=Object(u.a)(e,2),n=t[0],r=t[1],i=S(),a=i.storageSaveItem,h=i.storageDeleteItem,j=i.storageUpdateItemsProp,g=i.storageGetAll,p=i.storageClearAll,x=Object(c.useCallback)((function(){var e,t=Object.keys(n),o=(e=t.length,Object(l.a)(Object(l.a)({},f),{},{top:f.top+20*e,left:f.left+20*e,noteId:m(),order:e}));r(Object(l.a)(Object(l.a)({},n),{},Object(s.a)({},o.noteId,o))),a(o.noteId,o)}),[n,a]),w=Object(c.useCallback)((function(e){var t=Object(l.a)({},n);y(e,t);var o=Object(l.a)({},t[e]);delete t[e];var c=Object(l.a)(Object(l.a)({},t),{},Object(s.a)({},e,o));r(c),j(c,"order")}),[n,j]),I=Object(c.useCallback)((function(e){var t=Object(l.a)({},n);y(e,t),delete t[e];var o=Object(l.a)({},t);r(o),h(e)}),[n,h]);return Object(c.useEffect)((function(){var e=g(),t=Object.keys(e).sort((function(t,n){return e[t].order-e[n].order})).reduce((function(t,n){return Object(l.a)(Object(l.a)({},t),{},Object(s.a)({},n,e[n]))}),{});return r(t),function(){return p()}}),[]),Object(d.jsxs)("div",{className:"workspace",children:[Object(d.jsx)("header",{className:"header",children:"Sticky Notes"}),Object(d.jsx)(O,{onClick:x}),Object(d.jsx)(M,{items:n,moveNoteToFront:w,deleteNote:I}),Object(d.jsx)("div",{className:"trash",children:Object(d.jsx)(b,{className:"delete-button",icon:Object(d.jsx)(v,{}),size:o.L})})]})};var R=function(){return Object(d.jsx)("div",{className:"app",children:Object(d.jsx)(E,{})})};a.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(R,{})}),document.getElementById("root"))}],[[23,1,2]]]);
//# sourceMappingURL=main.27e6ccaa.chunk.js.map