"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("core-js/modules/web.dom-collections.iterator.js"),require("core-js/modules/es.promise.js"),require("core-js/modules/es.string.includes.js"),require("./LazySelect.css");var _react=_interopRequireWildcard(require("react")),_reactDom=_interopRequireDefault(require("react-dom")),_TagsInput=_interopRequireDefault(require("../TagsInput/TagsInput")),_HTTPHelper=require("../Common/HTTPHelper"),_ScrollHelper=require("../Common/ScrollHelper"),_LogHelper=_interopRequireDefault(require("../Common/LogHelper")),_CommonHelper=require("../Common/CommonHelper"),_LazyOption=_interopRequireDefault(require("./LazyOption")),_uuid=require("uuid");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function(a){return a?c:b})(a)}function _interopRequireWildcard(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=_getRequireWildcardCache(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in a)if("default"!=f&&Object.prototype.hasOwnProperty.call(a,f)){var g=e?Object.getOwnPropertyDescriptor(a,f):null;g&&(g.get||g.set)?Object.defineProperty(d,f,g):d[f]=a[f]}return d.default=a,c&&c.set(a,d),d}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}const LazySelect=/*#__PURE__*/_react.default.memo(a=>{var b;const{ApiURL:c,UniqueKey:d,DisplayBy:e,Filterable:f=!0,PlaceHolder:g="Select Items ...",AxiosInstance:h=null,useQueryParams:i=!1,useBodyParams:j=!1,RequestMethod:k="post",ExistingRequestParams:l={},ExistingRequestHeaders:m={},usePathParams:n=!1,PathParameterArrangement:o=[],PageSize:p=10,useStartFromApproach:q=!0,usePageNumberApproach:r=!1,InitialStartFromOrPageNumber:s=1,SearchRequestParamName:t="search",StartFromRequestParamName:u="from",PageSizeRequestParamName:v="size",ResponseResultsHierarchy:w="",DisplayCheckBoxForOptions:x=!0,DisplayShowMoreOption:y=!0,MaximunOptionToShow:z=1,DisplayShowMoreOptionCallBack:A=()=>{},SelectionChangedCallBack:B=()=>{},SelectedDataList:C=[],IsMulti:D=!0,DisplayTags:E=!0,Virtualized:F=!1,numVisibleItems:G=10,itemheight:H=36.4,OptionsBoxHeight:I=250,OpenOnRendering:J=!1,AlwaysOpenMode:K=!1,PerformCustomLoginOnOption:L=null,OnDropDownClosed:M=()=>{},RenderOptionComponent:N=null,RenderTagComponent:O=null,RenderInputComponent:P=null,RenderLimitComponent:Q=null,OnInputPasteHandler:R=()=>{},EnsureSelectedDataListRenderedInOptions:S=!1,ForceCloseDropDown:T=!1,SetForceCloseDropDown:U=null,DisplayUnselectAllButton:V=!0,SelectAllOptions:W=!1}=a;if(!d)throw new Error("the name of the UniqueKey of your data must be provided");if(!c)throw new Error("ApiURL for your data must be provided");const X=(0,_uuid.v4)(),[Y,Z]=(0,_react.useState)(""),[$,_]=(0,_react.useState)(!1),[aa,ba]=(0,_react.useState)(!1),[ca,da]=(0,_react.useState)(!1),[ea,fa]=(0,_react.useState)(!1),[ga,ha]=(0,_react.useState)(!1),[ia,ja]=(0,_react.useState)(!1),[ka,la]=(0,_react.useState)([]),[ma,na]=(0,_react.useState)(C),[oa,pa]=(0,_react.useState)(!0),[qa,ra]=(0,_react.useState)(s),[sa,ta]=(0,_react.useState)(-1),[ua,va]=(0,_react.useState)({start:0,end:G}),wa=(0,_react.useRef)(null),xa=(0,_react.useRef)(null),ya=(0,_react.useRef)(null),za=(0,_react.useRef)(null),Aa=function(){let a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,b=c,d={};if(i){for(const a in b+="?",l)b+="".concat(a,"=").concat(l[a],"&");b+="".concat(t,"=").concat(Y,"&"),b+="".concat(u,"=").concat(null==a?qa:a,"&"),b+="".concat(v,"=").concat(p)}else if(n){const c=_objectSpread(_objectSpread({},(0,_CommonHelper.flattenObject)(l)),{},{[t]:Y,[u]:null==a?qa:a,[v]:p});o.forEach(a=>{c.hasOwnProperty(a)&&(b+="/".concat(c[a]))})}else j&&(d=_objectSpread({},l),d[t]=Y,d[u]=null==a?qa:a,d[v]=p);return{method:k,baseURL:b,data:d,headers:m}},Ba=(0,_react.useRef)(Aa(null)),Ca=async function(){let a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;da(!0),fa(!1);const b=Aa(a);if(_LogHelper.default.LogMessage("Request Info FROM",b.data[u]),_LogHelper.default.LogMessage("previous request info FROM",Ba.current.data[u]),b.data[u]===s||b.data[u]!==Ba.current.data[u]){let a=await(0,_HTTPHelper.getDataList)(h,b.method,b.baseURL,b.data,b.headers);if(a.success){let b=s;la(c=>{var e,f,g;let h=(0,_HTTPHelper.parseResponseResultsHierarchy)(w,a.data);if(null!=L){var i;h=null===(i=h)||void 0===i?void 0:i.map((a,b)=>L(a,b,b+c.length))}const j=null===c||void 0===c?void 0:c.map(a=>a[d]),k=null!==(e=null===(f=h)||void 0===f?void 0:f.filter(a=>j.includes(a[d])))&&void 0!==e?e:[];if(0<k.length){var l,m;_LogHelper.default.LogWarning("there is some duplication in the data, we will remove the duplicated options for you, but you need to fix this issue, the duplicated data are:"),_LogHelper.default.LogWarning(k),h=null!==(l=null===(m=h)||void 0===m?void 0:m.filter(a=>!j.includes(a[d])))&&void 0!==l?l:[]}if(S){var n,o;const a=ma.map(a=>a[d]);h=null!==(n=null===(o=h)||void 0===o?void 0:o.filter(b=>!a.includes(b[d])))&&void 0!==n?n:[]}const p=[...(null!==c&&void 0!==c?c:[]),...(null!==(g=h)&&void 0!==g?g:[])];return b=0===p.length?s:p.length,p}),ra(a=>{let c=s;return q&&(c=b+s),r&&(c=++a),c})}else fa(!0);Ba.current=b}$&&_(!1),aa&&ba(!1),ia&&ja(!1),da(!1)};(0,_react.useEffect)(()=>{ia&&(ra(s),la([]),Ca(s))},[ia]),(0,_react.useEffect)(()=>{$&&Ca()},[$]),(0,_react.useEffect)(()=>{ca?pa(!0):ga&&pa(!1)},[ca]),(0,_react.useEffect)(()=>{if(!oa){var a;null===za||void 0===za||null===(a=za.current)||void 0===a?void 0:a.focus()}},[oa]),(0,_react.useEffect)(()=>{const a=setTimeout(()=>{aa&&(ra(s),la([]),Ca(s))},500);return()=>clearTimeout(a)},[Y]);const Da=(0,_react.useCallback)((a,b)=>{D?na(c=>a?[...c,b]:[...c.filter(a=>a[d]!==b[d])]):na(()=>a?(Z(b[e]),[b]):[]),!S||a||ka.find(a=>a[d]===b[d])||la(a=>[b,...a])}),Ea=()=>{na(a=>{if(S){const b=ka.map(a=>a[d]),c=a.filter(a=>!b.includes(a[d]));la(a=>[...c,...a])}return[]})},Fa=()=>{na(a=>[...a,...ka])},Ga=(a,b)=>{let c=b.find(b=>b[d]===a[d]);return!!c},Ha=a=>{a.target.value!==Y&&(Z(a.target.value),ba(!0))},Ia=()=>{ha(!0),ja(!0),pa(!1)},Ja=()=>{ha(!1),Z(""),ra(s),la([]),pa(!0),M(ma)},Ka=()=>{ga?Ja():Ia()};(0,_react.useEffect)(()=>{(J||K)&&Ka()},[J,K]);const La=a=>{let b=Math.trunc(a.scrollTop/H);b=b-G>=ka.length?b-G:b,b!==ua.start&&va({start:b,end:b+G>=ka.length?ka.length-1:b+G})},Ma=(0,_react.useRef)(!1),Na=(0,_react.useRef)(!0);(0,_react.useLayoutEffect)(()=>Na.current?void(Na.current=!1):void(B(ma),Oa.current=ma.map(a=>a[d]).join(",")),[ma]);const Oa=(0,_react.useRef)(null);(0,_react.useEffect)(()=>{const a=C.map(a=>a[d]).join(",");a!=Oa.current&&(Oa.current=a,na(C))},[C]);const Pa=(0,_react.useRef)(!0);(0,_react.useLayoutEffect)(()=>Pa.current?void(Pa.current=!1):void(W?D&&Fa():Ea()),[W]);const Qa=a=>{_LogHelper.default.LogMessage("from key down",ka);let b=-1,c=ka;if(S){const a=null===ka||void 0===ka?void 0:ka.map(a=>a[d]);c=[...ma.filter(b=>!a.includes(b[d])),...ka]}if(0!==c.length)if(38===a.keyCode&&0<sa)ta(a=>(b=a-1,b)),Ra();else if(40===a.keyCode&&sa<c.length-1)ta(a=>(b=a+1,b)),Ra();else if(13===a.keyCode){var e;let a=_objectSpread({},c[sa]),b=null!==(e=ma.find(b=>b[d]===a[d]))&&void 0!==e&&e;Da(!b,a)}},Ra=()=>{xa.current&&xa.current.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})},Sa=F?{height:ka.length*H,minHeight:ka.length*H}:{};let Ta=null===(b=ya.current)||void 0===b?void 0:b.getBoundingClientRect();return(0,_react.useEffect)(()=>(document.addEventListener("keydown",Qa),()=>{document.removeEventListener("keydown",Qa)})),(0,_react.useEffect)(()=>{T&&(Ja(),U(!1))},[T]),/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select",ref:ya},/*#__PURE__*/_react.default.createElement("div",{onClick:K?()=>{}:a=>{(a.target.classList.contains("icon")||a.target.classList.contains("lazyselect-select-output")||a.target.classList.contains("arrow"))&&!a.target.classList.contains("unselect-all")&&Ka()},className:ga?"lazyselect-select-output active":"lazyselect-select-output"},(()=>D?/*#__PURE__*/_react.default.createElement(_TagsInput.default,{uniqueKey:d,displayBy:e,Filterable:f,placeHolder:g,selectedDataList:ma,renderedSelectedDataList:0>=z?ma:ma.slice(0,z),onSearchChange:Ha,searchValue:Y,handleOptionSelectedUnselected:Da,displayShowMoreOption:y,maximunOptionToShow:z,displayShowMoreOptionCallBack:A,tagsInputDisabled:oa,RenderTagComponent:O,RenderLimitComponent:Q,RenderInputComponent:P,OnInputPasteHandler:R/* handleKeyDown={handleKeyDown} */,DisplayTags:E}):ma[0]?/*#__PURE__*/_react.default.createElement("div",{className:"tags-input"},null==P?/*#__PURE__*/_react.default.createElement("input",{ref:za,autoFocus:!0,disabled:oa||!f,type:"text",value:Y,onChange:Ha,placeholder:ma[0][e],title:ma[0][e],onPaste:R/* onKeyDown={handleKeyDown} */}):P({ref:za,disabled:oa||!f,type:"text",value:Y,onChange:Ha,placeholder:ma[0][e],title:ma[0][e]/* onKeyDown: handleKeyDown, */})):/*#__PURE__*/_react.default.createElement("div",{className:"tags-input"},null==P?/*#__PURE__*/_react.default.createElement("input",{ref:za,autoFocus:!0,disabled:oa||!f,type:"text",onChange:Ha,value:Y,placeholder:g,onPaste:R/* onKeyDown={handleKeyDown} */}):P({ref:za,disabled:oa||!f,type:"text",onChange:Ha,value:Y,placeholder:g/* onKeyDown: handleKeyDown, */})))(),V&&/*#__PURE__*/_react.default.createElement("div",{style:{fontSize:"larger",fontWeight:"bold"},className:"unselect-all icon",onClick:Ea},"\xD7"),!K&&/*#__PURE__*/_react.default.createElement("div",{className:"icon"},/*#__PURE__*/_react.default.createElement("i",{className:"arrow ".concat(ga?"up":"down")}))),ga&&/*#__PURE__*/_reactDom.default.createPortal(/*#__PURE__*/_react.default.createElement("div",{ref:wa,className:ga?"lazyselect-select-box show":"lazyselect-select-box",onScroll:()=>{const a=wa.current;F&&La(a);const b=(0,_ScrollHelper.isElementAtBottom)(a,.98);b&&b!==Ma.current&&_(!0),Ma.current=b},style:{width:Ta.width,minWidth:Ta.width,height:I}},/*#__PURE__*/_react.default.createElement("div",{className:"lazyselectcheckbox-list-container",style:Sa},(()=>{let a=ka;if(S){const b=null===ka||void 0===ka?void 0:ka.map(a=>a[d]);a=[...ma.filter(a=>!b.includes(a[d])),...ka]}return a.map((a,b)=>{if(F&&!(b>=ua.start&&b<=ua.end))return null;let c=Ga(a,ma),d=sa===b;return null==N?/*#__PURE__*/_react.default.createElement(_LazyOption.default,{InstanceId:X,key:b,index:b,oRef:d?xa:null,id:"lazyselectcheckbox-container-".concat(X,"-").concat(b),setCursor:ta,optionSelected:c,optionActive:d,DisplayCheckBoxForOptions:x,handleOptionSelectedUnselected:Da,value:a,DisplayBy:e,itemheight:H,Virtualized:F,FirstVirtualOption:!!F&&b===ua.start}):N({key:b,index:b,ref:d?xa:null,id:"lazyselectcheckbox-container-".concat(X,"-").concat(b),setCursor:ta,optionSelected:c,optionActive:d,DisplayCheckBoxForOptions:x,handleOptionSelectedUnselected:Da,optionValue:a,DisplayBy:e,itemheight:H,Virtualized:F,FirstVirtualOption:!!F&&b===ua.start})})})()),ca&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"Loading ...."),ea&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"Somthing went wrong!, Check your server!"),!ca&&!ea&&0===ka.length&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"No Items Found!..")),ya.current))});var _default=LazySelect;exports.default=_default;