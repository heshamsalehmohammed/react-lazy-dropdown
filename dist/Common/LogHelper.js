"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("core-js/modules/web.dom-collections.iterator.js");var _enums=require("./enums"),_config=require("../config.json");const LogMessage=function(){_config.mode===_enums.modesEnum.Development&&console.log(...arguments)},LogWarning=function(){console.warn(...arguments)},LogError=function(){console.error(...arguments)};var _default={LogMessage,LogWarning,LogError};exports.default=_default;