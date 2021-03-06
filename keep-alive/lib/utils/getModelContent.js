"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  return "\ninterface LayoutInstanceProps {\n  alivePathnames:string[],\n  keepAliveViewMap:{}\n}\nlet LayoutInstance:LayoutInstanceProps;\nfunction dropByCacheKey(pathname: string) {\n  if (LayoutInstance) {\n    const { alivePathnames, keepAliveViewMap } = LayoutInstance;\n    const index = alivePathnames.findIndex(item => item === pathname);\n    if (index !== -1) {\n      alivePathnames.splice(index, 1);\n      if (pathname.indexOf('detail') !== -1){\n        const tempName = pathname.split('/').slice(0, 4).join('/');\n        if(tempName !== pathname){\n          pathname = `${tempName}/:id`;\n        }\n      }\n     // \u7528\u6765\u5F53\u4F5Ckey\uFF0C\u53EA\u6709key\u53D1\u751F\u53D8\u5316\u624D\u4F1Aremout\u7EC4\u4EF6\n     if(keepAliveViewMap[pathname]){\n   keepAliveViewMap[pathname].recreateTimes += 1;\n   }\n   }\n  }\n }\nconst setLayoutInstance = (value:any)=>{\n  LayoutInstance=value\n}\nconst getLayoutInstance = ()=>LayoutInstance;\n\nexport {\n  setLayoutInstance,getLayoutInstance,dropByCacheKey\n}\n";
};

exports.default = _default;