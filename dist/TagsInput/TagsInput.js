"use strict";require("core-js/modules/web.dom-collections.iterator.js"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("./TagsInput.css");var _react=_interopRequireWildcard(require("react")),_LazyTag=_interopRequireDefault(require("./LazyTag")),_LazyShowMore=_interopRequireDefault(require("./LazyShowMore"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function(a){return a?c:b})(a)}function _interopRequireWildcard(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=_getRequireWildcardCache(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in a)if("default"!=f&&Object.prototype.hasOwnProperty.call(a,f)){var g=e?Object.getOwnPropertyDescriptor(a,f):null;g&&(g.get||g.set)?Object.defineProperty(d,f,g):d[f]=a[f]}return d.default=a,c&&c.set(a,d),d}const TagsInput=/*#__PURE__*/_react.default.memo(a=>{const{uniqueKey:b,displayBy:c,Filterable:d,placeHolder:e,selectedDataList:f,renderedSelectedDataList:g,onSearchChange:h,searchValue:i,handleOptionSelectedUnselected:j,displayShowMoreOption:k,maximunOptionToShow:l,displayShowMoreOptionCallBack:m,tagsInputDisabled:n,RenderTagComponent:o,RenderLimitComponent:p,RenderInputComponent:q,OnInputPasteHandler:r}=a,s=(0,_react.useRef)(null);(0,_react.useEffect)(()=>{if(!n){var a;null===(a=s.current)||void 0===a?void 0:a.focus()}},[n]);const t=(a,b,c,d)=>null==o?/*#__PURE__*/_react.default.createElement(_LazyTag.default,{key:a,optionValue:b,displayBy:c,handleOptionSelectedUnselected:d}):o({key:a,optionValue:b,handleOptionSelectedUnselected:d});return/*#__PURE__*/_react.default.createElement("div",{className:"tags-input"},/*#__PURE__*/_react.default.createElement("ul",{id:"tags"},g.map((a,b)=>t(b,a,c,j)),f.length>l&&k&&((a,b,c)=>null==p?/*#__PURE__*/_react.default.createElement(_LazyShowMore.default,{selectedDataList:a,maximunOptionToShow:b,displayShowMoreOptionCallBack:c}):p(a))(f,l,m)),d&&(null==q?/*#__PURE__*/_react.default.createElement("input",{ref:s,autoFocus:!0,disabled:n,type:"text",value:i,onChange:h,placeholder:e,onPaste:r}):q({ref:s,disabled:n,type:"text",value:i,onChange:h,placeholder:e})))});var _default=TagsInput;exports.default=_default;