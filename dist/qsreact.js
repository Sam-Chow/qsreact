/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createElement = function createElement(type, props) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var _ref;

  var children = (_ref = []).concat.apply(_ref, args);
  props = _extends({}, props, { children: children });
  return { type: type, props: props };
};

var instantiateComponent = function instantiateComponent(element) {
  if (!element) {
    return null;
  } else if (typeof element === 'string') {
    return new TextComponent(element);
  } else if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object') {
    throw new Error('wrong element type');
  } else if (typeof element.type === 'string') {
    return new DOMComponent(element);
  } else if (typeof element.type === 'function') {
    return new CompositeComponent(element);
  }
};

var TextComponent = function () {
  function TextComponent(element) {
    _classCallCheck(this, TextComponent);

    this.currentElement = element;
    this.node = null;
    // won't have any child
  }

  _createClass(TextComponent, [{
    key: 'getHostNode',
    value: function getHostNode() {
      return this.node;
    }
  }, {
    key: 'update',
    value: function update(nextElement) {
      this.currentElement = nextElement;
      var oldNode = this.node;
      var parentNode = oldNode.parentNode;
      this.node = this.mount();
      parentNode.replaceChild(this.node, oldNode);
    }
  }, {
    key: 'mount',
    value: function mount() {
      var node = document.createTextNode(this.currentElement);
      this.node = node;
      return node;
    }
  }]);

  return TextComponent;
}();

var DOMComponent = function () {
  function DOMComponent(element) {
    _classCallCheck(this, DOMComponent);

    this.currentElement = element;
    this.node = null;
    this.childComponentInstances = null; // for get childNodes
  }

  _createClass(DOMComponent, [{
    key: 'getHostNode',
    value: function getHostNode() {
      return this.node;
    }
  }, {
    key: 'calcDomProperties',
    value: function calcDomProperties(nextProps) {
      var _this = this;

      var isEvent = function isEvent(prop) {
        return prop.startsWith('on');
      };
      var isAttribute = function isAttribute(prop) {
        return !isEvent(prop) && prop != 'children';
      };

      var prevProps = this.currentElement ? this.currentElement.props : {};

      Object.keys(nextProps).filter(isAttribute).forEach(function (prop) {
        if (_typeof(_this.node[prop]) === 'object') {
          _this.node[prop] = Object.assign(_this.node[prop], nextProp[prop]);
        } else {
          _this.node[prop] = nextProps[prop];
        }
      });

      Object.keys(nextProps).filter(isEvent).forEach(function (prop) {
        var eventType = prop.toLowerCase().slice(2);
        _this.node.removeEventListener(eventType, _this.node[prop]);
        _this.node.addEventListener(eventType, nextProps[prop]);
      });
    }
  }, {
    key: 'constructChildNodes',
    value: function constructChildNodes(nextChildElements) {
      var prevChildElements = this.currentElement ? this.currentElement.props.children : [];

      var prevChildComponentInstances = this.childComponentInstances || [];
      var nextChildComponentInstances = [];

      var nextLen = nextChildElements.length;
      var prevLen = prevChildComponentInstances.length;
      var diffLen = nextLen - prevLen;
      var commonLen = diffLen >= 0 ? prevLen : nextLen;

      var i = 0;
      while (i < commonLen) {
        var nextChildElement = nextChildElements[i];
        var prevChildElement = prevChildElements[i];

        if (nextChildElement.type === prevChildElement.type) {
          prevChildComponentInstances[i].update(nextChildElement);
          nextChildComponentInstances.push(prevChildComponentInstances[i]);
        } else {
          var nextChildComponentInstance = instantiateComponent(nextChildElement);
          // replace old node with new node
          this.node.replaceChild(prevChildComponentInstances[i].getHostNode(), nextChildComponentInstance.mount());
          nextChildComponentInstances.push(nextChildComponentInstance);
        }

        i++;
      }

      if (diffLen > 0) {
        while (i < nextLen) {
          var _nextChildElement = nextChildElements[i];
          var _nextChildComponentInstance = instantiateComponent(_nextChildElement);
          nextChildComponentInstances.push(_nextChildComponentInstance);
          this.node.appendChild(_nextChildComponentInstance.mount());
          i++;
        }
      }

      if (diffLen < 0) {
        while (i < prevLen) {
          this.node.removeChild(prevChildComponentInstances[i].getHostNode());
          i++;
        }
      }

      this.childComponentInstances = nextChildComponentInstances;
    }
  }, {
    key: 'update',
    value: function update(nextElement) {
      this.calcDomProperties(nextElement.props);
      this.constructChildNodes(nextElement.props.children);
      this.currentElement = nextElement;
      return this.node;
    }
  }, {
    key: 'mount',
    value: function mount() {
      var _currentElement = this.currentElement,
          type = _currentElement.type,
          props = _currentElement.props;

      var node = document.createElement(type);
      this.node = node;
      this.calcDomProperties(props);
      this.constructChildNodes(props.children);
      return node;
    }
  }]);

  return DOMComponent;
}();

var CompositeComponent = function () {
  function CompositeComponent(element) {
    _classCallCheck(this, CompositeComponent);

    this.currentElement = element;
    this.childComponentInstance = null;
    this.publicInstance = null;
  }

  _createClass(CompositeComponent, [{
    key: 'getPublicInstance',
    value: function getPublicInstance() {
      return this.publicInstance;
    }
  }, {
    key: 'getHostNode',
    value: function getHostNode() {
      return this.childComponentInstance.getHostNode(); // util get a text component node or dom component node
    }
  }, {
    key: 'createPublicInstance',
    value: function createPublicInstance() {
      var _currentElement2 = this.currentElement,
          type = _currentElement2.type,
          props = _currentElement2.props;

      if (!(type.prototype && type.prototype.isReactComponent)) {
        return null;
      }
      var publicInstance = new type(props);
      publicInstance.props = props;
      publicInstance._internalInstance = this;
      this.publicInstance = publicInstance;
    }
  }, {
    key: 'createChildComponentInstance',
    value: function createChildComponentInstance() {
      var _currentElement3 = this.currentElement,
          type = _currentElement3.type,
          props = _currentElement3.props;

      if (type.prototype && type.prototype.isReactComponent) {
        this.publicInstance.componentWillMount();
        this.childComponentInstance = instantiateComponent(this.publicInstance.render());
        this.publicInstance.componentDidMount();
      } else {
        this.childComponentInstance = instantiateComponent(type(props));
      }
    }
  }, {
    key: 'updateChildComponentInstances',
    value: function updateChildComponentInstances(_ref2) {
      var nextProps = _ref2.props;
      var _currentElement4 = this.currentElement,
          type = _currentElement4.type,
          props = _currentElement4.props;

      if (type.prototype && type.prototype.isReactComponent) {
        this.publicInstance.componentWillUpdate(nextProps);
        this.publicInstance.props = nextProps;
        this.childComponentInstance.update(this.publicInstance.render());
        this.publicInstance.componentDidUpdate(props);
      } else {
        this.childComponentInstance.update(type(nextProps));
      }
    }
  }, {
    key: 'update',
    value: function update(nextElement) {
      if (this.currentElement.type === nextElement.type) {
        this.updateChildComponentInstances(nextElement);
        this.currentElement = nextElement;
      } else {
        this.currentElement = nextElement;
        var oldNode = this.getHostNode();
        var parentNode = oldNode.parentNode;
        this.node = this.mount();
        parentNode.replaceChild(this.node, oldNode);
      }

      return this.node;
    }
  }, {
    key: 'mount',
    value: function mount() {
      this.createPublicInstance();
      this.createChildComponentInstance();

      var node = this.childComponentInstance.mount();
      return node;
    }
  }]);

  return CompositeComponent;
}();

var Component = function () {
  function Component() {
    _classCallCheck(this, Component);

    this.isReactComponent = true;
  }

  _createClass(Component, [{
    key: 'setState',
    value: function setState(partialState) {
      var state = _extends({}, this.state || {}, partialState);
      this._internalInstance.update();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}
  }, {
    key: 'render',
    value: function render() {
      throw new Error('Component must have a render method!');
    }
  }]);

  return Component;
}();

Component.prototype.isReactComponent = true;

var rootInstance = null;
var render = function render(element, containerDOM) {
  rootInstance = reconcile(element, containerDOM, rootInstance);
};

var reconcile = function reconcile(element, dom, instance) {
  var nextInstance = void 0;
  if (!instance) {
    nextInstance = instantiateComponent(element);
    dom.appendChild(nextInstance.mount());
  } else {
    nextInstance = instance;
    nextInstance.update(element);
  }

  return nextInstance;
};

exports.render = render;
exports.createElement = createElement;
exports.Component = Component;

/***/ })
/******/ ]);