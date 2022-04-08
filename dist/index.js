/*!
 * performance v0.0.1
 * open source under the MIT license
 * https://github.com/mfuu/performance#readme
 */

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function getTiming() {
    var timing = {};

    if (!window.performance.timing && !window.PerformanceNavigationTiming) {
      console.error('Performance Error: this browser does not support performance timing');
      return {};
    }

    if (window.performance.timing) {
      timing = window.performance.timing;
    } // 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/


    if (typeof window.PerformanceNavigationTiming === 'function') {
      try {
        var nt2Timing = performance.getEntriesByType('navigation')[0];
        if (nt2Timing) timing = nt2Timing;
      } catch (err) {//
      }
    }

    if (timing.loadEventEnd - timing.navigationStart < 0) {
      console.info('Page is still loading');
    }

    return timing;
  }
  var getEntries = function getEntries() {
    for (var _len = arguments.length, entryTypes = new Array(_len), _key = 0; _key < _len; _key++) {
      entryTypes[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      try {
        var _ref;

        if (!window.performance) {
          reject(new Error('Performance Error: Performance API is not supported'));
          return;
        }

        if (!entryTypes.length) {
          reject(new TypeError('Performance Error: A Performance Observer must have a non-empty entryTypes attribute'));
          return;
        }

        var getEntryMethod = window.performance.getEntriesByType ? 'getEntriesByType' : window.performance.webkitGetEntriesByType ? 'webkitGetEntriesByType' : '';
        var entries = getEntryMethod ? (_ref = []).concat.apply(_ref, _toConsumableArray(entryTypes.map(function (entryType) {
          return window.performance[getEntryMethod](entryType);
        }))) : [];

        if (entries.length) {
          resolve(entries);
          return;
        }

        if (typeof window.PerformanceObserver !== 'function') {
          reject(new Error('Performance Error: PerformanceObserver is not supported'));
          return;
        }

        var observer = new window.PerformanceObserver(function (entryList, observer) {
          resolve(entryList.getEntries());
          observer.disconnect();
        });

        try {
          observer.observe({
            entryTypes: entryTypes
          });
        } catch (e) {
          observer.disconnect();
          reject(e);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  /**
   * @type {string}
   */
  var IMAGES = 'images';
  /**
   * @type {string}
   */

  var CSS = 'css';
  /**
   * @type {string}
   */

  var JAVASCRIPT = 'javascript';
  /**
   * @type {string}
   */

  var VIDEO = 'video';
  /**
   * @type {string}
   */

  var OTHERS = 'others';
  var eventList = ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'];
  var isNaN = Number.isNaN || window.isNaN;
  var isFinite = Number.isFinite || window.isFinite;
  var parseFloat = Number.parseFloat || window.parseFloat;
  var _Number$MAX_SAFE_INTE = Number.MAX_SAFE_INTEGER,
      MAX_SAFE_INTEGER = _Number$MAX_SAFE_INTE === void 0 ? 9007199254740991 : _Number$MAX_SAFE_INTE;

  var handleAddEventListener = function handleAddEventListener(type, fn) {
    if (window.addEventListener) {
      window.addEventListener(type, fn, {
        once: true
      });
    } else {
      window.attachEvent('on' + type, fn, {
        once: true
      });
    }
  };

  function getLastEvent() {
    var lastEvent;
    eventList.forEach(function (eventType) {
      document.addEventListener(eventType, function (event) {
        lastEvent = event;
      }, {
        capture: true,
        // 是在捕获阶段还是冒泡阶段执行
        passive: true // 默认不阻止默认事件

      });
    });
    return lastEvent;
  }
  function onload$1(callback) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      handleAddEventListener('load', callback);
    }
  }
  function getFirstPaintTime(timing) {
    var firstPaintTime = 0;

    if (window.chrome && typeof window.chrome.loadTimes === 'function') {
      firstPaintTime = window.chrome.loadTimes().firstPaintTime * 1000;
    } else if (typeof timing.msFirstPaint === 'number') {
      firstPaintTime = timing.msFirstPaint;
    }

    return Math.round(firstPaintTime);
  }
  function formatMs(ms) {
    var readable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (!ms) ms = 0;
    var ret = "".concat(ms.toFixed(2), " ms");
    if (!readable) return ret;
    var ONE_SECOND = 1000;
    var ONE_MINUTE = 60 * ONE_SECOND;
    var ONE_HORE = 60 * ONE_MINUTE; // 小于1秒，那么用毫秒为单位

    if (ms >= ONE_SECOND && ms < ONE_MINUTE) {
      // 大于一秒小于一分钟，用秒作为单位
      ret = "".concat((ms / 1000).toFixed(2), " s");
    } else if (ms >= ONE_MINUTE && ms < ONE_HORE) {
      // 大于一分钟，小于一小时，用分钟作单位
      ret = "".concat((ms / 1000 / 60).toFixed(2), " m");
    } else if (ms >= ONE_HORE) {
      // 大于一个小时，用小时作单位
      ret = "".concat((ms / 1000 / 60 / 60).toFixed(2), " h");
    }

    return ret;
  }
  function checkNumber(number) {
    if (typeof number !== 'number') return;
    var value = parseFloat(number);
    if (isNaN(value)) return;
    if (value < 0) return;
    if (!isFinite(value)) return;
    if (value > MAX_SAFE_INTEGER) return MAX_SAFE_INTEGER;
    return value;
  }
  function checkResourceType(name) {
    if (/\.(gif|jpg|jpeg|png|webp|svg)/i.test(name)) {
      return IMAGES;
    }

    if (/\.(js)/i.test(name)) {
      return JAVASCRIPT;
    }

    if (/\.(css)/i.test(name)) {
      return CSS;
    }

    if (/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(name)) {
      return VIDEO;
    }

    return OTHERS;
  }
  function formatKey(key) {
    return key.replace(/([A-Z])/g, '_$1').replace(/-/g, '_').toLowerCase().replace(/_j_s_/g, '_js_');
  }

  function Timing(callback) {
    var timing = getTiming();
    var startTime = timing.navigationStart || timing.fetchStart;
    var result = {
      // 重定向时间
      redirect_time: timing.redirectEnd - timing.redirectStart,
      // dns查询耗时
      dns_time: timing.domainLookupEnd - timing.domainLookupStart,
      // TTFB 读取页面第一个字节的时间
      ttfb_time: timing.responseStart - startTime,
      // DNS 缓存时间
      appcache_time: timing.domainLookupStart - startTime,
      // 卸载页面的时间
      unload_time: timing.unloadEventEnd - timing.unloadEventStart,
      // tcp连接耗时
      tcp_time: timing.connectEnd - timing.connectStart,
      // request请求耗时
      request_time: timing.responseEnd - timing.responseStart,
      // 解析dom树耗时
      analysis_time: timing.domComplete - timing.domInteractive,
      // 白屏时间
      blank_time: (timing.domInteractive || timing.domLoading) - startTime,
      // 首屏时间
      firstPaint_time: getFirstPaintTime() - startTime,
      // domReadyTime
      dom_ready_time: timing.domContentLoadedEventEnd - startTime,
      // 页面加载完成的时间
      page_loaded_time: timing.loadEventEnd - startTime,
      // 开始加载文档到文档资源全部加载完毕的时间
      processing_time: timing.loadEventStart - timing.domLoading,
      // 执行 onload 回调函数的时间
      onload_time: timing.loadEventEnd - timing.loadEventStart,
      redirectStart: timing.redirectStart ? timing.redirectStart - startTime : 0,
      AppCacheStart: timing.fetchStart - startTime,
      dnsStart: timing.domainLookupStart ? timing.domainLookupStart - startTime : 0,
      connectStart: timing.connectStart - startTime,
      sslStart: timing.secureConnectionStart ? timing.secureConnectionStart - startTime : 0,
      requestStart: timing.requestStart - startTime,
      downloadStart: timing.responseStart - startTime,
      processingStart: timing.responseEnd - startTime,
      domLoadingStart: timing.domLoading - startTime,
      loadEventStart: timing.loadEventStart - startTime,
      firstByteTime: timing.responseStart - timing.requestStart,
      domInteractiveTime: timing.domInteractive - startTime,
      domCompleteTime: timing.domComplete - startTime,
      pageLoadTime: timing.loadEventStart - startTime,
      visualCompleteTime: timing.visualCompleteTime - startTime,
      redirectTime: timing.redirectEnd - timing.redirectStart,
      appCacheTime: timing.domainLookupStart - timing.fetchStart,
      dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
      // connectTime and sslTime time depend on whether secureConnectionStart has a value > 0
      connectTime: (timing.secureConnectionStart || timing.connectEnd) - timing.connectStart,
      sslTime: timing.connectEnd - (timing.secureConnectionStart || timing.connectEnd),
      downloadTime: timing.responseEnd - timing.responseStart,
      processingTime: timing.loadEventStart - timing.responseEnd,
      loadingTime: timing.loadEventEnd - timing.loadEventStart
    };

    for (var key in result) {
      // 删除无用数据，避免干扰(小于等于0或大于两分钟)
      if (result[key] <= 0 || result[key] >= 120000) delete result[key];
    }

    callback(result);
  }
  function FirstInput(_x) {
    return _FirstInput.apply(this, arguments);
  }

  function _FirstInput() {
    _FirstInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 观察首次交互
              new PerformanceObserver(function (entryList, observer) {
                var firstInput = entryList.getEntries()[0];

                if (firstInput) {
                  // 处理延迟 = 开始处理的时间 - 开始点击的时间
                  var inputDelay = firstInput.processingStart - firstInput.startTime;
                  var duration = firstInput.duration; // 处理的耗时

                  if (inputDelay > 0 || duration > 0) {
                    var data = {
                      first_input_delay: inputDelay,
                      first_input_duration: duration,
                      first_input_start_time: firstInput.startTime // 开始处理的时间

                    };
                    callback(data);
                  }
                }

                observer.disconnect();
              }).observe({
                type: 'first-input',
                buffered: true
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _FirstInput.apply(this, arguments);
  }

  var RESOURCES = 'resources';
  function Resources(_x) {
    return _Resources.apply(this, arguments);
  }

  function _Resources() {
    _Resources = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
      var resources, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getEntries('resource');

            case 2:
              resources = _context.sent;

              if (resources.length) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              result = {};
              resources.forEach(function (item) {
                var type = checkResourceType(item.name);
                add(result, type, 'count', 1);
                add(result, type, 'duration', item.duration);
                add(result, type, 'size', item.decodedBodySize);
                result["".concat(RESOURCES, "_").concat(type, "_source")] = result["".concat(RESOURCES, "_").concat(type, "_source")] || [];
                result["".concat(RESOURCES, "_").concat(type, "_source")].push(item);
              });
              callback(result);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _Resources.apply(this, arguments);
  }

  function add(result, type, key, value) {
    var field = [RESOURCES, type, key].join('_');
    result[field] = result[field] || 0;
    result[field] += checkNumber(value);
  }

  var NAVIGATION_TYPES = {
    0: 'navagate',
    // 网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载
    1: 'reload',
    // 用户通过刷新，包括JS调用刷新接口等方式访问页面
    2: 'history',
    // 用户通过后退按钮访问本页面
    255: 'unknown' // 任何其他来源的加载，相当于常数performance.navigation.TYPE_RESERVED

  };
  function Navigation(_x) {
    return _Navigation.apply(this, arguments);
  }

  function _Navigation() {
    _Navigation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
      var _ref, connection, result, _yield$getEntries, _yield$getEntries2, _yield$getEntries2$, _yield$getEntries2$$n, navigation;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref = window.navigator || {}, connection = _ref.connection;
              result = {};
              _context.next = 4;
              return getEntries('navigation');

            case 4:
              _yield$getEntries = _context.sent;
              _yield$getEntries2 = _slicedToArray(_yield$getEntries, 1);
              _yield$getEntries2$ = _yield$getEntries2[0];
              _yield$getEntries2$ = _yield$getEntries2$ === void 0 ? {} : _yield$getEntries2$;
              _yield$getEntries2$$n = _yield$getEntries2$.navigation, navigation = _yield$getEntries2$$n === void 0 ? performance.navigation : _yield$getEntries2$$n;
              result.navigation_type = typeof navigation.type === 'number' ? NAVIGATION_TYPES[navigation.type] : navigation.type;

              if (connection) {
                Object.assign(result, {
                  redirect_count: navigation.redirectCount,
                  // 重定向的数量（只读），但是这个接口有同源策略限制，即仅能检测同源的重定向；
                  connection_type: connection.type,
                  effective_connection_type: connection.effectiveType
                });
              }

              callback(result);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _Navigation.apply(this, arguments);
  }

  var MEMORY_TYPES = ['jsHeapSizeLimit', // 内存大小限制
  'totalJSHeapSize', // 可使用的内存
  'usedJSHeapSize' // JS 对象（包括V8引擎内部对象）占用的内存
  ];
  function Memory(callback) {
    var _ref = window.performance || {},
        memory = _ref.memory;

    if (!memory) return {};
    var result = Object.assign.apply(Object, _toConsumableArray(MEMORY_TYPES.map(function (item) {
      return _defineProperty({}, formatKey(item), checkNumber(memory[item]));
    })));
    callback(result);
  }

  function Paint(_x) {
    return _Paint.apply(this, arguments);
  }

  function _Paint() {
    _Paint = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
      var _ref;

      var entries, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getEntries('paint');

            case 2:
              entries = _context.sent;
              result = Object.assign.apply(Object, [{}].concat(_toConsumableArray((_ref = []).concat.apply(_ref, _toConsumableArray(entries.map(function (_ref2) {
                var name = _ref2.name,
                    startTime = _ref2.startTime;
                return _defineProperty({}, name, checkNumber(startTime));
              }))))));
              callback(result);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _Paint.apply(this, arguments);
  }

  function Errors(callback) {
    // js 运行时的错误捕获
    window.addEventListener('error', function (event) {
      var lastEvent = getLastEvent(); // 获取最后一个交互事件

      if (event.target && (event.target.src || event.target.href || e.target.currentSrc)) {
        callback({
          error_listener: {
            filename: event.target.src || event.target.href || e.target.currentSrc,
            tagName: event.target.tagName,
            message: event.target.localName + ' is load error',
            selector: event.target,
            time: Date.now()
          }
        });
      } else {
        callback({
          error_listener: {
            filename: event.filename,
            // 报错文件
            position: "".concat(event.lineno, ":").concat(event.colno),
            // 行列位置
            message: event.message,
            selector: lastEvent || lastEvent.path,
            time: Date.now()
          }
        });
      }
    }, true);

    window.onerror = function (event, source, lineno, colno, error) {
      setTimeout(function () {
        colno = colno || window.event && window.event.errorCharacter || 0;
        var result = {
          filename: source,
          position: "".concat(lineno, ":").concat(colno),
          message: error && error.stack ? error.stack.toString() : event,
          time: Date.now()
        };
        callback({
          window_onerror: result
        });
      }, 0);
    }; // 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件


    window.addEventListener('unhandledrejection', function (event) {
      var lastEvent = getLastEvent();
      var result = {
        message: error.message,
        filename: '',
        position: '',
        stack: null
      };
      result.message = typeof event.reason === 'string' ? event.reason : event.reason.message;

      if (_typeof(event.reason) === 'object') {
        if (event.reason.stack) {
          var match = event.reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          result.filename = match[1];
          result.position = "".concat(match[2], ":").concat(match[3]);
        }

        stack = getLines(event.reason.stack);
      }

      callback({
        promise_error: _objectSpread2(_objectSpread2({}, result), {}, {
          selector: lastEvent ? lastEvent.path : ''
        })
      });
    }, true);
  }

  function getLines(stack) {
    return stack.split('\n').slice(1).map(function (item) {
      return item.replace(/^\s+at\s+/g, '');
    }).join('^');
  }

  function PageView(callback) {
    var connection = navigator.connection;
    callback({
      pv: {
        effectiveType: connection.effectiveType,
        //网络环境
        rtt: connection.rtt,
        //往返时间
        screen: "".concat(window.screen.width, "x").concat(window.screen.height) //设备分辨率

      }
    });
    var startTime = Date.now();
    window.addEventListener('unload', function () {
      var stayTime = Date.now() - startTime;
      callback({
        pv_stay_time: stayTime
      });
    }, false);
  }

  var ELEMENTS = ['html', 'body']; // 白屏

  function BlankScreen(callback) {
    var wrapperElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var elements = [].concat(ELEMENTS, _toConsumableArray(wrapperElements));
    var emptyPoints = 0;

    function isWrapper(element) {
      var selector = getSelector(element);

      if (elements.indexOf(selector) !== -1) {
        emptyPoints++;
      }
    }

    onload(function () {
      var x, y;

      for (var i = 0; i < 9; i++) {
        x = document.elementFromPoint(window.innerWidth * i / 10, window.innerHeight / 2);
        y = document.elementFromPoint(window.innerWidth / 2, window.innerHeight * i / 10);
        isWrapper(x[0]);
        isWrapper(y[0]);
      }

      if (emptyPoints > 0) {
        var centerElements = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        callback({
          blank_screen: {
            emptyPoints: emptyPoints,
            screen: window.screen.width + 'X' + window.screen.height,
            viewPoint: window.innerWidth + 'X' + window.innerHeight,
            selector: centerElements[0]
          }
        });
      }
    });
  }

  function getSelector(element) {
    var id = element.id,
        className = element.className,
        nodeName = element.nodeName;

    if (id) {
      return "#" + id;
    } else if (className) {
      // 过滤空白符 + 拼接
      return "." + className.split(" ").filter(function (item) {
        return !!item;
      }).join(".");
    } else {
      return nodeName.toLowerCase();
    }
  }

  var Performance = /*#__PURE__*/function () {
    function Performance(options) {
      _classCallCheck(this, Performance);

      this.options = options; // requestAnimationFrame(this.init.bind(this))
      // this._addEventListener()

      this.init();
    }

    _createClass(Performance, [{
      key: "init",
      value: function init() {
        var _this = this;

        window.performance_information = {
          domain: encodeURIComponent(document.domain),
          path: encodeURIComponent(window.location.pathname.toLowerCase().replace(/\//g, '_'))
        };
        onload$1(function () {
          Timing(_this._callback);
          FirstInput(_this._callback);
          Resources(_this._callback);
          Navigation(_this._callback);
          BlankScreen(_this._callback, _this.options.wrapperElements);
          Memory(_this._callback);
          Paint(_this._callback);
          Errors(_this._callback);
          PageView(_this._callback);
        });
      }
    }, {
      key: "_callback",
      value: function _callback(data) {
        window.performance_information = window.performance_information || {};
        Object.assign(window.performance_information, data);
        console.log(window.performance_information);
        console.log('DNS查询耗时：', formatMs(window.performance_information.dnsTime));
        console.log('TCP连接耗时:', formatMs(window.performance_information.tcpTime));
        console.log('解析dom树耗时:', formatMs(window.performance_information.analysisTime));
        console.log('白屏时间:', formatMs(window.performance_information.blankTime));
        console.log('重定向耗时:', formatMs(window.performance_information.redirectTime));
        console.log('读取页面第一个字节耗时:', formatMs(window.performance_information.ttfbTime));
        console.log('DOM Ready耗时:', formatMs(window.performance_information.domReadyTime));
        console.log('DNS 缓存时间:', formatMs(window.performance_information.appcacheTime));
        console.log('执行 onload 回调函数耗时:', formatMs(window.performance_information.onload));
        console.log('页面完全加载耗时:', formatMs(window.performance_information.loadPage));
        console.log('js文件加载总耗时：', formatMs(window.performance_information.resources_javascript_duration));
      }
    }, {
      key: "_print",
      value: function _print(result) {
        var table = document.createElement('table');
        table.innerHTML = Object.entries(result).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return "<tr><td>".concat(key, "</td><td>").concat(value, "</td></tr>");
        }).join('');
        document.body.appendChild(table);
      }
    }, {
      key: "_addEventListener",
      value: function _addEventListener() {// document.addEventListener('popstate', this.init())
        // document.addEventListener('hashchange', this.init())
      }
    }]);

    return Performance;
  }();

  if (typeof require === 'function' && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
    module.exports = Performance;
  } else {
    window.Performance = Performance;
  }

}));
