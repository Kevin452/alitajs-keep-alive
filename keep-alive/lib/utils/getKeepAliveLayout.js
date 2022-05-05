"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(absTmpPath) {
  return "\nimport React from 'react';\nimport { getRoutes } from '".concat(absTmpPath, "/core/routes'; \nconst routes = getRoutes();  \nimport { setLayoutInstance } from './KeepAliveModel';\nimport pathToRegexp from 'path-to-regexp';\nimport { matchRoutes } from 'react-router-config';\nconst isKeepPath = (aliveList:any[],path:string, keepAliveMap: {}, element: any)=>{\n  let isKeep = false;\n  aliveList.map(item=>{\n    if(item === path){\n      isKeep = true;\n    }\n    if(item instanceof RegExp && item.test(path)){\n      isKeep = true;\n    }\n    if(typeof item === 'string' && item.toLowerCase() === path){\n      isKeep = true;\n    }\n   if(path.indexOf('/:id') != -1){\n  const temp = path.split(':id')[0];\n  if(item.indexOf(temp) != -1){\n  isKeep = true; \n   keepAliveMap[item] = element; \n }\n  }\n  })\n  return isKeep;\n}\nconst getKeepAliveViewMap = (routeList:any[],aliveList:any[])=>{\n  let keepAliveMap = {};\n  function find(routess: any[], list:any[]) {\n    if(!routess|| !list ){\n      return routess;\n    }\n    return routess.map(element => {\n      if (!Array.isArray(element.routes)&&isKeepPath(list,element.path?element.path.toLowerCase():'', keepAliveMap, element)) {\n        element.recreateTimes = 0;\n        keepAliveMap[element.path.toLowerCase()] = element;\n      }else{\n        element.routes = find(element.routes,aliveList);\n      }\n      return element;\n    });\n  }\n  find(routeList,aliveList)\n  return keepAliveMap;\n}\nconst getView = (\n  pathname: string,\n  keepAliveViewMap: { [key: string]: any },\n) => {\n  let View;\n  for (const key in keepAliveViewMap) {\n    if (pathToRegexp(key).test(pathname)) {\n      View = keepAliveViewMap[key]\n      break;\n    }\n  }\n  return View;\n};\ninterface PageProps {\n  location: {\n    pathname: string;\n  };\n}\nexport default class BasicLayout extends React.Component<PageProps> {\n  constructor(props: any) {\n    super(props);\n    this.keepAliveViewMap = getKeepAliveViewMap(routes,props.keepalive);\n  }\n  componentDidMount() {\n    setLayoutInstance(this);\n  }\n\n    shouldComponentUpdate(nextProps){\n     if(nextProps.location.pathname != this.props.location.pathname){\n   return true \n   }\n   return false \n    }\n     keepAliveViewMap = {};\n\n  alivePathnames: string[] = [];\n\n  render() {\n    const {\n      location: { pathname },\n  keepalive,\n    moreTabsData = [],\n  } = this.props;\n    const temp = [...keepalive];\n  if(moreTabsData.length){\n   moreTabsData.forEach(item => {\n  if(pathname.indexOf(item) != -1) {\n   temp.unshift(pathname)\n }\n   })\n   }\n   if(temp.length != keepalive.length){\n  this.keepAliveViewMap = getKeepAliveViewMap(routes, temp);\n   }\n   const showKeepAlive = !!getView(pathname, this.keepAliveViewMap);\n    if (showKeepAlive) {\n      const index = this.alivePathnames.findIndex(\n        tPathname => tPathname === pathname.toLowerCase(),\n      );\n      if (index === -1) {\n        this.alivePathnames.push(pathname.toLowerCase());\n      }\n    }\n    return (\n      <>\n        <div\n          style={{ position: 'relative' }}\n          hidden={!showKeepAlive}\n          className=\"rumtime-keep-alive-layout\"\n        >\n          {this.alivePathnames.map(curPathname => {\n            const currentView = getView(curPathname, this.keepAliveViewMap);\n            const { component: View, recreateTimes } = currentView;\n            const matchRoute = matchRoutes([currentView], curPathname)[0];\n            const pageProps: any = { ...this.props,...matchRoute };\n            return View ? (\n              <div\n                id={`BasicLayout-${curPathname}`}\n                key={\n                  curPathname + recreateTimes\n                }\n                style={{\n                  position: 'absolute',\n                  left: 0,\n                  top: 0,\n                  right: 0,\n                  bottom: 0,\n                }}\n                hidden={curPathname !== pathname.toLowerCase()}\n              >\n                <View {...pageProps} />\n              </div>\n            ) : null;\n          })}\n        </div>\n        <div hidden={showKeepAlive} className=\"rumtime-keep-alive-layout-no\">\n          {!showKeepAlive && this.props.children}\n        </div>\n      </>\n    )\n  }\n}\n");
};

exports.default = _default;