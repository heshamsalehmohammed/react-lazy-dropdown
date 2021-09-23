"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("core-js/modules/web.dom-collections.iterator.js"),require("core-js/modules/es.promise.js"),require("core-js/modules/es.string.includes.js"),require("./LazySelect.css");var _react=_interopRequireWildcard(require("react")),_reactDom=_interopRequireDefault(require("react-dom")),_TagsInput=_interopRequireDefault(require("../TagsInput/TagsInput")),_HTTPHelper=require("../Common/HTTPHelper"),_ScrollHelper=require("../Common/ScrollHelper"),_LogHelper=_interopRequireDefault(require("../Common/LogHelper")),_CommonHelper=require("../Common/CommonHelper"),_LazyOption=_interopRequireDefault(require("./LazyOption"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function(a){return a?c:b})(a)}function _interopRequireWildcard(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=_getRequireWildcardCache(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in a)if("default"!=f&&Object.prototype.hasOwnProperty.call(a,f)){var g=e?Object.getOwnPropertyDescriptor(a,f):null;g&&(g.get||g.set)?Object.defineProperty(d,f,g):d[f]=a[f]}return d.default=a,c&&c.set(a,d),d}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}const LazySelect=/*#__PURE__*/_react.default.memo(a=>{var b;const{ApiURL:c,UniqueKey:d,DisplayBy:e,Filterable:f=!0,PlaceHolder:g="Select Items ...",AxiosInstance:h=null,useQueryParams:i=!1,useBodyParams:j=!1,RequestMethod:k="post",ExistingRequestParams:l={},ExistingRequestHeaders:m={},usePathParams:n=!1,PathParameterArrangement:o=[],PageSize:p=10,InitialStartFrom:q=1,SearchRequestParamName:r="search",StartFromRequestParamName:s="from",PageSizeRequestParamName:t="size",ResponseResultsHierarchy:u="",DisplayCheckBoxForOptions:v=!0,DisplayShowMoreOption:w=!0,MaximunOptionToShow:x=-1,DisplayShowMoreOptionCallBack:y=()=>{},SelectionChangedCallBack:z=()=>{},SelectedDataList:A=[],FillSelectedDataListUniqueKeyFromServer:B=!1,IsMulti:C=!0,ShowTags:D=!0,TagComponent:E=null,ShowMoreComponent:F=null,Virtualized:G=!1,numVisibleItems:H=10,itemheight:I=36.4,OptionsBoxHeight:J=250,OpenOnRendering:K=!1,PerformCustomLoginOnOption:L=null,OnDropDownClosed:M=()=>{}}=a;if(!d)throw new Error("the name of the UniqueKey of your data must be provided");if(!c)throw new Error("ApiURL for your data must be provided");const[N,O]=(0,_react.useState)(""),[P,Q]=(0,_react.useState)(!1),[R,S]=(0,_react.useState)(!1),[T,U]=(0,_react.useState)(!1),[V,W]=(0,_react.useState)(!1),[X,Y]=(0,_react.useState)(!1),[Z,$]=(0,_react.useState)(!1),[_,aa]=(0,_react.useState)([]),[ba,ca]=(0,_react.useState)(A),[da,ea]=(0,_react.useState)(!0),[fa,ga]=(0,_react.useState)(q),[ha,ia]=(0,_react.useState)({start:0,end:H}),ja=(0,_react.useRef)(null),ka=(0,_react.useRef)(null),la=(0,_react.useRef)(null),ma=function(){let a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null,b=c,d={};if(i){for(const a in b+="?",l)b+="".concat(a,"=").concat(l[a],"&");b+="".concat(r,"=").concat(N,"&"),b+="".concat(s,"=").concat(null==a?fa:a,"&"),b+="".concat(t,"=").concat(p)}else if(n){const c=_objectSpread(_objectSpread({},(0,_CommonHelper.flattenObject)(l)),{},{[r]:N,[s]:null==a?fa:a,[t]:p});_LogHelper.default.LogMessage("flatten object",c),o.forEach(a=>{c.hasOwnProperty(a)&&(b+="/".concat(c[a]))}),_LogHelper.default.LogMessage("base url ",b)}else j&&(d=_objectSpread({},l),d[r]=N,d[s]=null==a?fa:a,d[t]=p);return{method:k,baseURL:b,data:d,headers:m}},na=(0,_react.useRef)(ma(null)),oa=async function(){let a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;U(!0),W(!1);const b=ma(a);if(_LogHelper.default.LogMessage("Request Info FROM",b.data[s]),_LogHelper.default.LogMessage("previous request info FROM",na.current.data[s]),b.data[s]===q||b.data[s]!==na.current.data[s]){let a=await(0,_HTTPHelper.getDataList)(h,b.method,b.baseURL,b.data,b.headers);if(a.success){let b=q;aa(c=>{var e,f,g;_LogHelper.default.LogMessage(a.data);let h=(0,_HTTPHelper.parseResponseResultsHierarchy)(u,a.data);if(_LogHelper.default.LogMessage(h),null!=L){var i;h=null===(i=h)||void 0===i?void 0:i.map((a,b)=>L(a,b))}const j=null===c||void 0===c?void 0:c.map(a=>a[d]),k=null!==(e=null===(f=h)||void 0===f?void 0:f.filter(a=>j.includes(a[d])))&&void 0!==e?e:[];if(0<k.length){var l,m;_LogHelper.default.LogWarning("there is some duplication in the data, we will remove the duplicated options for you, but you need to fix this issue, the duplicated data are:"),_LogHelper.default.LogWarning(k),h=null!==(l=null===(m=h)||void 0===m?void 0:m.filter(a=>!j.includes(a[d])))&&void 0!==l?l:[]}const n=[...(null!==c&&void 0!==c?c:[]),...(null!==(g=h)&&void 0!==g?g:[])];return b=0===n.length?q:n.length,n}),ga(b+q),_LogHelper.default.LogMessage("new start from",b+q)}else W(!0);na.current=b}P&&Q(!1),R&&S(!1),Z&&$(!1),U(!1)};(0,_react.useEffect)(()=>{Z&&(ga(q),aa([]),oa(q))},[Z]),(0,_react.useEffect)(()=>{P&&(_LogHelper.default.LogMessage("useEffect for scroll"),oa())},[P]),(0,_react.useEffect)(()=>{T?ea(!0):X&&ea(!1)},[T]),(0,_react.useEffect)(()=>{if(!da){var a;null===la||void 0===la||null===(a=la.current)||void 0===a?void 0:a.focus()}},[da]),(0,_react.useEffect)(()=>{const a=setTimeout(()=>{R&&(ga(q),aa([]),_LogHelper.default.LogMessage("useEffect for search"),oa(q))},500);return()=>clearTimeout(a)},[N]);const pa=(0,_react.useCallback)((a,b)=>{C?ca(c=>a?[...c,b]:[...c.filter(a=>a[d]!==b[d])]):ca(()=>a?(O(b[e]),[b]):[])}),qa=(a,b)=>{let c=b.find(b=>b[d]===a[d]);return!!c},ra=a=>{a.target.value!==N&&(O(a.target.value),S(!0))},sa=()=>{X?(Y(!1),O(""),ga(q),aa([]),ea(!0),M(ba)):(Y(!0),$(!0),ea(!1))};(0,_react.useEffect)(()=>{sa()},[K]);const ta=a=>{let b=Math.trunc(a.scrollTop/I);b=b-H>=_.length?b-H:b,b!==ha.start&&ia({start:b,end:b+H>=_.length?_.length-1:b+H})},ua=(0,_react.useRef)(!1);(0,_react.useEffect)(()=>{z(ba)},[ba]);_LogHelper.default.LogMessage("local data length",_.length);const va=G?{height:_.length*I,minHeight:_.length*I}:{};let wa=null===(b=ka.current)||void 0===b?void 0:b.getBoundingClientRect();return/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select",ref:ka},/*#__PURE__*/_react.default.createElement("div",{onClick:a=>{(a.target.classList.contains("icon")||a.target.classList.contains("lazyselect-select-output")||a.target.classList.contains("arrow"))&&sa()},className:X?"lazyselect-select-output active":"lazyselect-select-output"},(()=>{if(C){if(D)return/*#__PURE__*/_react.default.createElement(_TagsInput.default,{uniqueKey:d,displayBy:e,Filterable:f,placeHolder:g,selectedDataList:ba,renderedSelectedDataList:0>=x?ba:ba.slice(0,x),onSearchChange:ra,searchValue:N,handleOptionSelectedUnselected:pa,displayShowMoreOption:w,maximunOptionToShow:x,displayShowMoreOptionCallBack:y,tagsInputDisabled:da,TagComponent:E,ShowMoreComponent:F});}else if(ba[0])return/*#__PURE__*/_react.default.createElement("div",{className:"tags-input"},/*#__PURE__*/_react.default.createElement("input",{style:{height:"100%"},ref:la,autoFocus:!0,disabled:da||!f,type:"text",value:N,onChange:ra,placeholder:ba[0][e],title:ba[0][e]}));return/*#__PURE__*/_react.default.createElement("div",{className:"tags-input"},/*#__PURE__*/_react.default.createElement("input",{style:{height:"100%"},ref:la,autoFocus:!0,disabled:da||!f,type:"text",onChange:ra,value:N,placeholder:g}))})(),/*#__PURE__*/_react.default.createElement("div",{className:"icon"},/*#__PURE__*/_react.default.createElement("i",{className:"arrow ".concat(X?"up":"down")}))),X&&/*#__PURE__*/_reactDom.default.createPortal(/*#__PURE__*/_react.default.createElement("div",{ref:ja,className:X?"lazyselect-select-box show":"lazyselect-select-box",onScroll:()=>{const a=ja.current;G&&ta(a);const b=(0,_ScrollHelper.isElementAtBottom)(a,.98);b&&b!==ua.current&&Q(!0),ua.current=b},style:{width:wa.width,height:J}},/*#__PURE__*/_react.default.createElement("div",{className:"lazyselectcheckbox-list-container",style:va},(()=>_.map((a,b)=>{if(G&&!(b>=ha.start&&b<=ha.end))return null;let c=qa(a,ba);return/*#__PURE__*/_react.default.createElement(_LazyOption.default,{key:b,index:b,optionSelected:c,DisplayCheckBoxForOptions:v,handleOptionSelectedUnselected:pa,value:a,DisplayBy:e,itemheight:I,Virtualized:G,FirstVirtualOption:!!G&&b===ha.start})}))()),T&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"Loading ...."),V&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"Somthing went wrong!, Check your server!"),!T&&!V&&0===_.length&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"No Items Found!..")),ka.current))});var _default=LazySelect;exports.default=_default;