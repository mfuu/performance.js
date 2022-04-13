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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    define(Gp, iteratorSymbol, function () {
      return this;
    });
    define(Gp, "toString", function () {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  });

  var regenerator = runtime_1;

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
  var isNaN$1 = Number.isNaN || window.isNaN;
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
  function onload(callback) {
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
    if (isNaN$1(value)) return;
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
    _FirstInput = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback) {
      return regenerator.wrap(function _callee$(_context) {
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
    _Resources = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback) {
      var resources, result;
      return regenerator.wrap(function _callee$(_context) {
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
    _Navigation = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback) {
      var _ref, connection, result, _yield$getEntries, _yield$getEntries2, _yield$getEntries2$, _yield$getEntries2$$n, navigation;

      return regenerator.wrap(function _callee$(_context) {
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
    _Paint = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback) {
      var _ref;

      var entries, result;
      return regenerator.wrap(function _callee$(_context) {
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
    var _ref = element || {},
        id = _ref.id,
        className = _ref.className,
        nodeName = _ref.nodeName;

    if (id) {
      return "#" + id;
    } else if (className) {
      // 过滤空白符 + 拼接
      return "." + className.split(" ").filter(function (item) {
        return !!item;
      }).join(".");
    } else {
      return nodeName === null || nodeName === void 0 ? void 0 : nodeName.toLowerCase();
    }
  }

  var Performance = /*#__PURE__*/function () {
    function Performance(options) {
      _classCallCheck(this, Performance);

      this.options = options || {}; // requestAnimationFrame(this.init.bind(this))
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
        onload(function () {
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
