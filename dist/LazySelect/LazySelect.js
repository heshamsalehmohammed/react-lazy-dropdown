"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("core-js/modules/web.dom-collections.iterator.js"),require("core-js/modules/es.promise.js"),require("core-js/modules/es.string.includes.js"),require("./LazySelect.css");var _react=_interopRequireWildcard(require("react")),_reactDom=_interopRequireDefault(require("react-dom")),_TagsInput=_interopRequireDefault(require("../TagsInput/TagsInput")),_HTTPHelper=require("../Common/HTTPHelper"),_ScrollHelper=require("../Common/ScrollHelper"),_LogHelper=_interopRequireDefault(require("../Common/LogHelper")),_CommonHelper=require("../Common/CommonHelper"),_LazyOption=_interopRequireDefault(require("./LazyOption"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function(a){return a?c:b})(a)}function _interopRequireWildcard(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=_getRequireWildcardCache(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in a)if("default"!=f&&Object.prototype.hasOwnProperty.call(a,f)){var g=e?Object.getOwnPropertyDescriptor(a,f):null;g&&(g.get||g.set)?Object.defineProperty(d,f,g):d[f]=a[f]}return d.default=a,c&&c.set(a,d),d}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}const LazySelect=/*#__PURE__*/_react.default.memo(a=>{var b;const{ApiURL:c,UniqueKey:d,DisplayBy:e,Filterable:f=!0,PlaceHolder:g="Select Items ...",AxiosInstance:h=null,useQueryParams:i=!1,useBodyParams:j=!1,RequestMethod:k="post",ExistingRequestParams:l={},ExistingRequestHeaders:m={},usePathParams:n=!1,PathParameterArrangement:o=[],PageSize:p=10,InitialStartFrom:q=1,SearchRequestParamName:r="search",StartFromRequestParamName:s="from",PageSizeRequestParamName:t="size",ResponseResultsHierarchy:u="",DisplayCheckBoxForOptions:v=!0,DisplayShowMoreOption:w=!0,MaximunOptionToShow:x=-1,DisplayShowMoreOptionCallBack:y=()=>{},SelectionChangedCallBack:z=()=>{},SelectedDataList:A=[],IsMulti:B=!0,ShowTags:C=!0,TagComponent:D=null,ShowMoreComponent:E=null,Virtualized:F=!1,numVisibleItems:G=10,itemheight:H=36.4,OptionsBoxHeight:I=250,OpenOnRendering:J=!1,PerformCustomLoginOnOption:K=null,OnDropDownClosed:L=()=>{}}=a;if(!d)throw new Error("the name of the UniqueKey of your data must be provided");if(!c)throw new Error("ApiURL for your data must be provided");const[M,N]=(0,_react.useState)(""),[O,P]=(0,_react.useState)(!1),[Q,R]=(0,_react.useState)(!1),[S,T]=(0,_react.useState)(!1),[U,V]=(0,_react.useState)(!1),[W,X]=(0,_react.useState)(!1),[Y,Z]=(0,_react.useState)(!1),[$,_]=(0,_react.useState)([]),[aa,ba]=(0,_react.useState)(A),[ca,da]=(0,_react.useState)(!0),[ea,fa]=(0,_react.useState)(q),[ga,ha]=(0,_react.useState)({start:0,end:G}),ia=(0,_react.useRef)(null),ja=(0,_react.useRef)(null),ka=(0,_react.useRef)(null);(0,_react.useEffect)(()=>()=>{L(aa)},[]);const la=function(){let a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null,b=c,d={};if(i){for(const a in b+="?",l)b+="".concat(a,"=").concat(l[a],"&");b+="".concat(r,"=").concat(M,"&"),b+="".concat(s,"=").concat(null==a?ea:a,"&"),b+="".concat(t,"=").concat(p)}else if(n){const c=_objectSpread(_objectSpread({},(0,_CommonHelper.flattenObject)(l)),{},{[r]:M,[s]:null==a?ea:a,[t]:p});_LogHelper.default.LogMessage("flatten object",c),o.forEach(a=>{c.hasOwnProperty(a)&&(b+="/".concat(c[a]))}),_LogHelper.default.LogMessage("base url ",b)}else j&&(d=_objectSpread({},l),d[r]=M,d[s]=null==a?ea:a,d[t]=p);return{method:k,baseURL:b,data:d,headers:m}},ma=(0,_react.useRef)(la(null)),na=async function(){let a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;T(!0),V(!1);const b=la(a);if(_LogHelper.default.LogMessage("Request Info FROM",b.data[s]),_LogHelper.default.LogMessage("previous request info FROM",ma.current.data[s]),b.data[s]===q||b.data[s]!==ma.current.data[s]){let a=await(0,_HTTPHelper.getDataList)(h,b.method,b.baseURL,b.data,b.headers);if(a.success){let b=q;_(c=>{var e,f,g;_LogHelper.default.LogMessage(a.data);let h=(0,_HTTPHelper.parseResponseResultsHierarchy)(u,a.data);if(_LogHelper.default.LogMessage(h),null!=K){var i;h=null===(i=h)||void 0===i?void 0:i.map(a=>K(a))}const j=null===c||void 0===c?void 0:c.map(a=>a[d]),k=null!==(e=null===(f=h)||void 0===f?void 0:f.filter(a=>j.includes(a[d])))&&void 0!==e?e:[];if(0<k.length){var l,m;_LogHelper.default.LogWarning("there is some duplication in the data, we will remove the duplicated options for you, but you need to fix this issue, the duplicated data are:"),_LogHelper.default.LogWarning(k),h=null!==(l=null===(m=h)||void 0===m?void 0:m.filter(a=>!j.includes(a[d])))&&void 0!==l?l:[]}const n=[...(null!==c&&void 0!==c?c:[]),...(null!==(g=h)&&void 0!==g?g:[])];return b=0===n.length?q:n.length,n}),fa(b+q),_LogHelper.default.LogMessage("new start from",b+q)}else V(!0);ma.current=b}O&&P(!1),Q&&R(!1),Y&&Z(!1),T(!1)};(0,_react.useEffect)(()=>{Y&&(fa(q),_([]),na(q))},[Y]),(0,_react.useEffect)(()=>{O&&(_LogHelper.default.LogMessage("useEffect for scroll"),na())},[O]),(0,_react.useEffect)(()=>{S?da(!0):W&&da(!1)},[S]),(0,_react.useEffect)(()=>{if(!ca){var a;null===ka||void 0===ka||null===(a=ka.current)||void 0===a?void 0:a.focus()}},[ca]),(0,_react.useEffect)(()=>{const a=setTimeout(()=>{Q&&(fa(q),_([]),_LogHelper.default.LogMessage("useEffect for search"),na(q))},500);return()=>clearTimeout(a)},[M]);const oa=(0,_react.useCallback)((a,b)=>{B?ba(c=>a?[...c,b]:[...c.filter(a=>a[d]!==b[d])]):ba(()=>a?(N(b[e]),[b]):[])}),pa=(a,b)=>{let c=b.find(b=>b[d]===a[d]);return!!c},qa=a=>{a.target.value!==M&&(N(a.target.value),R(!0))},ra=()=>{W?(X(!1),N(""),fa(q),_([]),da(!0),L(aa)):(X(!0),Z(!0),da(!1))};(0,_react.useEffect)(()=>{ra()},[J]);const sa=a=>{let b=Math.trunc(a.scrollTop/H);b=b-G>=$.length?b-G:b,b!==ga.start&&ha({start:b,end:b+G>=$.length?$.length-1:b+G})},ta=(0,_react.useRef)(!1);(0,_react.useEffect)(()=>{z(aa)},[aa]);_LogHelper.default.LogMessage("local data length",$.length);const ua=F?{height:$.length*H,minHeight:$.length*H}:{};let va=null===(b=ja.current)||void 0===b?void 0:b.getBoundingClientRect();return/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select",ref:ja},/*#__PURE__*/_react.default.createElement("div",{onClick:a=>{(a.target.classList.contains("icon")||a.target.classList.contains("lazyselect-select-output")||a.target.classList.contains("arrow"))&&ra()},className:W?"lazyselect-select-output active":"lazyselect-select-output"},(()=>{if(B){if(C)return/*#__PURE__*/_react.default.createElement(_TagsInput.default,{uniqueKey:d,displayBy:e,Filterable:f,placeHolder:g,selectedDataList:aa,renderedSelectedDataList:0>=x?aa:aa.slice(0,x),onSearchChange:qa,searchValue:M,handleOptionSelectedUnselected:oa,displayShowMoreOption:w,maximunOptionToShow:x,displayShowMoreOptionCallBack:y,tagsInputDisabled:ca,TagComponent:D,ShowMoreComponent:E});}else if(aa[0])return/*#__PURE__*/_react.default.createElement("div",{className:"tags-input"},/*#__PURE__*/_react.default.createElement("input",{style:{height:"100%"},ref:ka,autoFocus:!0,disabled:ca||!f,type:"text",value:M,onChange:qa,placeholder:aa[0][e],title:aa[0][e]}));return/*#__PURE__*/_react.default.createElement("div",{className:"tags-input"},/*#__PURE__*/_react.default.createElement("input",{style:{height:"100%"},ref:ka,autoFocus:!0,disabled:ca||!f,type:"text",onChange:qa,value:M,placeholder:g}))})(),/*#__PURE__*/_react.default.createElement("div",{className:"icon"},/*#__PURE__*/_react.default.createElement("i",{className:"arrow ".concat(W?"up":"down")}))),W&&/*#__PURE__*/_reactDom.default.createPortal(/*#__PURE__*/_react.default.createElement("div",{ref:ia,className:W?"lazyselect-select-box show":"lazyselect-select-box",onScroll:()=>{const a=ia.current;F&&sa(a);const b=(0,_ScrollHelper.isElementAtBottom)(a,.98);b&&b!==ta.current&&P(!0),ta.current=b},style:{width:va.width,height:I}},/*#__PURE__*/_react.default.createElement("div",{className:"lazyselectcheckbox-list-container",style:ua},(()=>$.map((a,b)=>{if(F&&!(b>=ga.start&&b<=ga.end))return null;let c=pa(a,aa);return/*#__PURE__*/_react.default.createElement(_LazyOption.default,{key:b,index:b,optionSelected:c,DisplayCheckBoxForOptions:v,handleOptionSelectedUnselected:oa,value:a,DisplayBy:e,itemheight:H,Virtualized:F,FirstVirtualOption:!!F&&b===ga.start})}))()),S&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"Loading ...."),U&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"Somthing went wrong!, Check your server!"),!S&&!U&&0===$.length&&/*#__PURE__*/_react.default.createElement("div",{className:"lazyselect-select-buttons"},"No Items Found!..")),ja.current))});var _default=LazySelect;exports.default=_default;