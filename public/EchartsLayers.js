(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("echarts"));
	else if(typeof define === 'function' && define.amd)
		define(["echarts"], factory);
	else if(typeof exports === 'object')
		exports["EChartsLayer"] = factory(require("echarts"));
	else
		root["EChartsLayer"] = factory(root["echarts"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_echarts__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./lib/GLGlobe.js */ "./lib/GLGlobe.js")
var EChartsLayer = __webpack_require__(/*! ./lib/EChartsLayer.js */ "./lib/EChartsLayer.js")
module.exports = EChartsLayer;


/***/ }),

/***/ "./lib/EChartsLayer.js":
/*!*****************************!*\
  !*** ./lib/EChartsLayer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function EChartsLayer(globeControl) {
  var globe = globeControl.getGlobe();
  // //this._container = document.createElement('div');
  // this._container = document.getElementById("EChartsContainer");
  // this._container.style.width = globeControl.canvas.clientWidth + "px";
  // this._container.style.height = globeControl.canvas.clientHeight + "px";
  // this._container.setAttribute('id', 'echarts');
  // this._container.setAttribute('class', 'echartGlobe');
  //   this._globe = globeControl;
  // globeContainer.appendChild(this._container);

  this._container = document.createElement("div");
  const canvas = globeControl.canvas;
  this._container.style.width = canvas.clientWidth + "px";
  this._container.style.height = canvas.clientHeight + "px";
  this._globe = globeControl;
  this._container.style.setProperty("position", "absolute");
  this._container.style.setProperty(
    "-webkit-tap-highlight-color",
    "transparent"
  );
  this._container.style.setProperty("top", 0);
  this._container.style.setProperty("left", 0);
  this._container.style.setProperty("user-select", "none");
  this._container.style.setProperty("background", "transparent");
  this._container.style.setProperty("pointer-events", "none");
  canvas.parentNode.appendChild(this._container);
  this.chart = echarts.init(this._container);
  echarts.glGlobe = globeControl;
  echarts.glContainer = this._container;
  this.resize();
}

EChartsLayer.prototype.remove = function () {
  var _this = this;
  this.chart.clear();
  if (this._container.parentNode)
    this._container.parentNode.removeChild(this._container);
  this._globe = undefined;
};
EChartsLayer.prototype.resize = function () {
  const _this = this;
  window.onresize = function () {
    if (_this._container != null && _this._globe != null) {
      _this._container.style.width = _this._globe.canvas.clientWidth + "px";
      _this._container.style.height = _this._globe.canvas.clientHeight + "px";
    }
    _this.chart.resize();
  };
};
module.exports = EChartsLayer;


/***/ }),

/***/ "./lib/GLGlobe.js":
/*!************************!*\
  !*** ./lib/GLGlobe.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * GLGlobe component extension
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
    __webpack_require__(/*! echarts */ "echarts").registerCoordinateSystem(
        'GLGlobe', __webpack_require__(/*! ./GLGlobeCoordSys */ "./lib/GLGlobeCoordSys.js")
    )
    __webpack_require__(/*! ./GLGlobeModel */ "./lib/GLGlobeModel.js")
    __webpack_require__(/*! ./GLGlobeView */ "./lib/GLGlobeView.js")

    // Action
    __webpack_require__(/*! echarts */ "echarts").registerAction({
        type: 'GLGlobeRoam',
        event: 'GLGlobeRoam',
        update: 'updateLayout'
    }, function (payload, ecModel) {
    })

    return {
        version: '1.0.0'
    }
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))




/***/ }),

/***/ "./lib/GLGlobeCoordSys.js":
/*!********************************!*\
  !*** ./lib/GLGlobeCoordSys.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
    var echarts = __webpack_require__(/*! echarts */ "echarts")

    function GLGlobeCoordSys(GLGlobe, api) {
        this._GLGlobe = GLGlobe
        this.dimensions = ['lng', 'lat']
        this._mapOffset = [0, 0]

        this._api = api
    }

    GLGlobeCoordSys.prototype.dimensions = ['lng', 'lat']

    GLGlobeCoordSys.prototype.setMapOffset = function (mapOffset) {
        this._mapOffset = mapOffset
    }

    GLGlobeCoordSys.prototype.getBMap = function () {
        return this._GLGlobe
    }

    GLGlobeCoordSys.prototype.dataToPoint = function (data) {
        var globe = this._GLGlobe.getGlobe();
        var worldPoint = globe.geoToWorld(data, 0);
        var cameraPosition = globe.getWorldCamera().getCameraPosition();
        if (worldPoint.dot(cameraPosition.sub(worldPoint)) > 0.0) {
            var devicePoint = globe.worldToDevice(worldPoint);
            return [devicePoint.x, devicePoint.y];
        }
        return [1e308, 1e308];
        /*
        var position = Cesium.Cartesian3.fromDegrees(data[0], data[1]);
        var cameraPosition = this._GLGlobe.scene.camera.positionWC;
        var dot = Cesium.Cartesian3.dot(Cesium.Cartesian3.subtract(cameraPosition, position, new Cesium.Cartesian3()), position);
        if (dot > 0.0) {
            var px = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._GLGlobe.scene, position);
            var mapOffset = this._mapOffset
            return [px.x - mapOffset[0], px.y - mapOffset[1]]
        }
        return [1e308, 1e308];
        */
    }

    GLGlobeCoordSys.prototype.pointToData = function (pt) {
        var globe = this._GLGlobe.getGlobe();
        var worldPoint = globe.deviceToWorld(pt);
        var geoPoint = globe.worldToGeo(worldPoint);
        return [geoPoint.x, geoPoint.y];
        /*
        var mapOffset = this._mapOffset
        var worldSpace = this._GLGlobe.scene.camera.pickEllipsoid(new Cesium.Cartesian2(pt[0] + mapOffset[0], pt[1] + mapOffset[1]), this._GLGlobe.scene.globe.ellipsoid);
        var geographySpace = this._GLGlobe.scene.globe.ellipsoid.cartesianToCartographic(worldSpace);
        var pt = [geographySpace.x + mapOffset[0], geographySpace.y + mapOffset[1]];
        return pt
        */
    }

    GLGlobeCoordSys.prototype.getViewRect = function () {
        var api = this._api
        return new echarts.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight())
    }

    GLGlobeCoordSys.prototype.getRoamTransform = function () {
        return echarts.matrix.create()
    }


    // For deciding which dimensions to use when creating list data
    GLGlobeCoordSys.dimensions = GLGlobeCoordSys.prototype.dimensions

    GLGlobeCoordSys.create = function (ecModel, api) {
        var coordSys;

        ecModel.eachComponent('GLGlobe', function (GLGlobeModel) {
            var viewportRoot = api.getZr().painter.getViewportRoot()
            var glGlobe = echarts.glGlobe;
            coordSys = new GLGlobeCoordSys(glGlobe, api)
            coordSys.setMapOffset(GLGlobeModel.__mapOffset || [0, 0])
            GLGlobeModel.coordinateSystem = coordSys
        })

        ecModel.eachSeries(function (seriesModel) {
            if (seriesModel.get('coordinateSystem') === 'GLGlobe') {
                seriesModel.coordinateSystem = coordSys
            }
        })
    }

    return GLGlobeCoordSys
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ }),

/***/ "./lib/GLGlobeModel.js":
/*!*****************************!*\
  !*** ./lib/GLGlobeModel.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

    return __webpack_require__(/*! echarts */ "echarts").extendComponentModel({
        type: 'GLGlobe',

        getBMap: function () {
            return this.__GLGlobe;
        },

        defaultOption: {
            roam: false
        }
    });
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/GLGlobeView.js":
/*!****************************!*\
  !*** ./lib/GLGlobeView.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
    return __webpack_require__(/*! echarts */ "echarts").extendComponentView({
        type: 'GLGlobe',

        render: function (GLGlobeModel, ecModel, api) {
            var rendering = true

            var glGlobe = echarts.glGlobe
            var glContainer = echarts.glContainer;
            var viewportRoot = api.getZr().painter.getViewportRoot()
            var coordSys = GLGlobeModel.coordinateSystem
            var moveHandler = function (type, target) {
                if (rendering) {
                    return
                }
                var offsetEl = glContainer;

                var mapOffset = [
                    -parseInt(offsetEl.style.left, 10) || 0,
                    -parseInt(offsetEl.style.top, 10) || 0
                ]
                viewportRoot.style.left = mapOffset[0] + 'px'
                viewportRoot.style.top = mapOffset[1] + 'px'

                coordSys.setMapOffset(mapOffset)
                GLGlobeModel.__mapOffset = mapOffset

                api.dispatchAction({
                    type: 'GLGlobeRoam'
                })
            }

            function zoomEndHandler() {
                if (rendering) {
                    return
                }
                api.dispatchAction({
                    type: 'GLGlobeRoam'
                })
            }

            glGlobe.getPostRender().removeEventListener(moveHandler);
            glGlobe.getPostRender().addEventListener(moveHandler);

            this._oldMoveHandler = moveHandler
            this._oldZoomEndHandler = zoomEndHandler

            var roam = GLGlobeModel.get('roam')
            if (roam && roam !== 'scale') {
                // todo 允许拖拽
            } else {
                // todo 不允许拖拽
            }
            if (roam && roam !== 'move') {
                // todo 允许移动
            } else {
                // todo 不允许允许移动
            }

            rendering = false
        }
    })
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ }),

/***/ "echarts":
/*!**************************!*\
  !*** external "echarts" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_echarts__;

/***/ })

/******/ });
});
//# sourceMappingURL=EChartsLayer.js.map