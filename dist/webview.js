"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/json5/dist/index.js
  var require_dist = __commonJS({
    "node_modules/json5/dist/index.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSON5 = factory();
      })(exports, (function() {
        "use strict";
        function createCommonjsModule(fn, module2) {
          return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
        }
        var _global = createCommonjsModule(function(module2) {
          var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
          if (typeof __g == "number") {
            __g = global;
          }
        });
        var _core = createCommonjsModule(function(module2) {
          var core = module2.exports = { version: "2.6.5" };
          if (typeof __e == "number") {
            __e = core;
          }
        });
        var _core_1 = _core.version;
        var _isObject = function(it) {
          return typeof it === "object" ? it !== null : typeof it === "function";
        };
        var _anObject = function(it) {
          if (!_isObject(it)) {
            throw TypeError(it + " is not an object!");
          }
          return it;
        };
        var _fails = function(exec) {
          try {
            return !!exec();
          } catch (e) {
            return true;
          }
        };
        var _descriptors = !_fails(function() {
          return Object.defineProperty({}, "a", { get: function() {
            return 7;
          } }).a != 7;
        });
        var document2 = _global.document;
        var is = _isObject(document2) && _isObject(document2.createElement);
        var _domCreate = function(it) {
          return is ? document2.createElement(it) : {};
        };
        var _ie8DomDefine = !_descriptors && !_fails(function() {
          return Object.defineProperty(_domCreate("div"), "a", { get: function() {
            return 7;
          } }).a != 7;
        });
        var _toPrimitive = function(it, S) {
          if (!_isObject(it)) {
            return it;
          }
          var fn, val;
          if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
            return val;
          }
          throw TypeError("Can't convert object to primitive value");
        };
        var dP = Object.defineProperty;
        var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
          _anObject(O);
          P = _toPrimitive(P, true);
          _anObject(Attributes);
          if (_ie8DomDefine) {
            try {
              return dP(O, P, Attributes);
            } catch (e) {
            }
          }
          if ("get" in Attributes || "set" in Attributes) {
            throw TypeError("Accessors not supported!");
          }
          if ("value" in Attributes) {
            O[P] = Attributes.value;
          }
          return O;
        };
        var _objectDp = {
          f
        };
        var _propertyDesc = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value
          };
        };
        var _hide = _descriptors ? function(object, key2, value) {
          return _objectDp.f(object, key2, _propertyDesc(1, value));
        } : function(object, key2, value) {
          object[key2] = value;
          return object;
        };
        var hasOwnProperty = {}.hasOwnProperty;
        var _has = function(it, key2) {
          return hasOwnProperty.call(it, key2);
        };
        var id = 0;
        var px = Math.random();
        var _uid = function(key2) {
          return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
        };
        var _library = false;
        var _shared = createCommonjsModule(function(module2) {
          var SHARED = "__core-js_shared__";
          var store = _global[SHARED] || (_global[SHARED] = {});
          (module2.exports = function(key2, value) {
            return store[key2] || (store[key2] = value !== void 0 ? value : {});
          })("versions", []).push({
            version: _core.version,
            mode: _library ? "pure" : "global",
            copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
          });
        });
        var _functionToString = _shared("native-function-to-string", Function.toString);
        var _redefine = createCommonjsModule(function(module2) {
          var SRC = _uid("src");
          var TO_STRING = "toString";
          var TPL = ("" + _functionToString).split(TO_STRING);
          _core.inspectSource = function(it) {
            return _functionToString.call(it);
          };
          (module2.exports = function(O, key2, val, safe) {
            var isFunction = typeof val == "function";
            if (isFunction) {
              _has(val, "name") || _hide(val, "name", key2);
            }
            if (O[key2] === val) {
              return;
            }
            if (isFunction) {
              _has(val, SRC) || _hide(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
            }
            if (O === _global) {
              O[key2] = val;
            } else if (!safe) {
              delete O[key2];
              _hide(O, key2, val);
            } else if (O[key2]) {
              O[key2] = val;
            } else {
              _hide(O, key2, val);
            }
          })(Function.prototype, TO_STRING, function toString() {
            return typeof this == "function" && this[SRC] || _functionToString.call(this);
          });
        });
        var _aFunction = function(it) {
          if (typeof it != "function") {
            throw TypeError(it + " is not a function!");
          }
          return it;
        };
        var _ctx = function(fn, that, length) {
          _aFunction(fn);
          if (that === void 0) {
            return fn;
          }
          switch (length) {
            case 1:
              return function(a) {
                return fn.call(that, a);
              };
            case 2:
              return function(a, b) {
                return fn.call(that, a, b);
              };
            case 3:
              return function(a, b, c2) {
                return fn.call(that, a, b, c2);
              };
          }
          return function() {
            return fn.apply(that, arguments);
          };
        };
        var PROTOTYPE = "prototype";
        var $export = function(type, name, source2) {
          var IS_FORCED = type & $export.F;
          var IS_GLOBAL = type & $export.G;
          var IS_STATIC = type & $export.S;
          var IS_PROTO = type & $export.P;
          var IS_BIND = type & $export.B;
          var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
          var exports2 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
          var expProto = exports2[PROTOTYPE] || (exports2[PROTOTYPE] = {});
          var key2, own, out, exp;
          if (IS_GLOBAL) {
            source2 = name;
          }
          for (key2 in source2) {
            own = !IS_FORCED && target && target[key2] !== void 0;
            out = (own ? target : source2)[key2];
            exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
            if (target) {
              _redefine(target, key2, out, type & $export.U);
            }
            if (exports2[key2] != out) {
              _hide(exports2, key2, exp);
            }
            if (IS_PROTO && expProto[key2] != out) {
              expProto[key2] = out;
            }
          }
        };
        _global.core = _core;
        $export.F = 1;
        $export.G = 2;
        $export.S = 4;
        $export.P = 8;
        $export.B = 16;
        $export.W = 32;
        $export.U = 64;
        $export.R = 128;
        var _export = $export;
        var ceil = Math.ceil;
        var floor = Math.floor;
        var _toInteger = function(it) {
          return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
        var _defined = function(it) {
          if (it == void 0) {
            throw TypeError("Can't call method on  " + it);
          }
          return it;
        };
        var _stringAt = function(TO_STRING) {
          return function(that, pos2) {
            var s = String(_defined(that));
            var i = _toInteger(pos2);
            var l = s.length;
            var a, b;
            if (i < 0 || i >= l) {
              return TO_STRING ? "" : void 0;
            }
            a = s.charCodeAt(i);
            return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
          };
        };
        var $at = _stringAt(false);
        _export(_export.P, "String", {
          // 21.1.3.3 String.prototype.codePointAt(pos)
          codePointAt: function codePointAt2(pos2) {
            return $at(this, pos2);
          }
        });
        var codePointAt = _core.String.codePointAt;
        var max = Math.max;
        var min = Math.min;
        var _toAbsoluteIndex = function(index, length) {
          index = _toInteger(index);
          return index < 0 ? max(index + length, 0) : min(index, length);
        };
        var fromCharCode = String.fromCharCode;
        var $fromCodePoint = String.fromCodePoint;
        _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
          // 21.1.2.2 String.fromCodePoint(...codePoints)
          fromCodePoint: function fromCodePoint2(x) {
            var arguments$1 = arguments;
            var res = [];
            var aLen = arguments.length;
            var i = 0;
            var code;
            while (aLen > i) {
              code = +arguments$1[i++];
              if (_toAbsoluteIndex(code, 1114111) !== code) {
                throw RangeError(code + " is not a valid code point");
              }
              res.push(
                code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320)
              );
            }
            return res.join("");
          }
        });
        var fromCodePoint = _core.String.fromCodePoint;
        var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
        var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
        var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
        var unicode = {
          Space_Separator,
          ID_Start,
          ID_Continue
        };
        var util = {
          isSpaceSeparator: function isSpaceSeparator(c2) {
            return typeof c2 === "string" && unicode.Space_Separator.test(c2);
          },
          isIdStartChar: function isIdStartChar(c2) {
            return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
          },
          isIdContinueChar: function isIdContinueChar(c2) {
            return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
          },
          isDigit: function isDigit(c2) {
            return typeof c2 === "string" && /[0-9]/.test(c2);
          },
          isHexDigit: function isHexDigit(c2) {
            return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
          }
        };
        var source;
        var parseState;
        var stack;
        var pos;
        var line;
        var column;
        var token;
        var key;
        var root;
        var parse2 = function parse3(text, reviver) {
          source = String(text);
          parseState = "start";
          stack = [];
          pos = 0;
          line = 1;
          column = 0;
          token = void 0;
          key = void 0;
          root = void 0;
          do {
            token = lex();
            parseStates[parseState]();
          } while (token.type !== "eof");
          if (typeof reviver === "function") {
            return internalize({ "": root }, "", reviver);
          }
          return root;
        };
        function internalize(holder, name, reviver) {
          var value = holder[name];
          if (value != null && typeof value === "object") {
            if (Array.isArray(value)) {
              for (var i = 0; i < value.length; i++) {
                var key2 = String(i);
                var replacement = internalize(value, key2, reviver);
                if (replacement === void 0) {
                  delete value[key2];
                } else {
                  Object.defineProperty(value, key2, {
                    value: replacement,
                    writable: true,
                    enumerable: true,
                    configurable: true
                  });
                }
              }
            } else {
              for (var key$1 in value) {
                var replacement$1 = internalize(value, key$1, reviver);
                if (replacement$1 === void 0) {
                  delete value[key$1];
                } else {
                  Object.defineProperty(value, key$1, {
                    value: replacement$1,
                    writable: true,
                    enumerable: true,
                    configurable: true
                  });
                }
              }
            }
          }
          return reviver.call(holder, name, value);
        }
        var lexState;
        var buffer;
        var doubleQuote;
        var sign;
        var c;
        function lex() {
          lexState = "default";
          buffer = "";
          doubleQuote = false;
          sign = 1;
          for (; ; ) {
            c = peek();
            var token2 = lexStates[lexState]();
            if (token2) {
              return token2;
            }
          }
        }
        function peek() {
          if (source[pos]) {
            return String.fromCodePoint(source.codePointAt(pos));
          }
        }
        function read() {
          var c2 = peek();
          if (c2 === "\n") {
            line++;
            column = 0;
          } else if (c2) {
            column += c2.length;
          } else {
            column++;
          }
          if (c2) {
            pos += c2.length;
          }
          return c2;
        }
        var lexStates = {
          default: function default$1() {
            switch (c) {
              case "	":
              case "\v":
              case "\f":
              case " ":
              case "\xA0":
              case "\uFEFF":
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                read();
                return;
              case "/":
                read();
                lexState = "comment";
                return;
              case void 0:
                read();
                return newToken("eof");
            }
            if (util.isSpaceSeparator(c)) {
              read();
              return;
            }
            return lexStates[parseState]();
          },
          comment: function comment() {
            switch (c) {
              case "*":
                read();
                lexState = "multiLineComment";
                return;
              case "/":
                read();
                lexState = "singleLineComment";
                return;
            }
            throw invalidChar(read());
          },
          multiLineComment: function multiLineComment() {
            switch (c) {
              case "*":
                read();
                lexState = "multiLineCommentAsterisk";
                return;
              case void 0:
                throw invalidChar(read());
            }
            read();
          },
          multiLineCommentAsterisk: function multiLineCommentAsterisk() {
            switch (c) {
              case "*":
                read();
                return;
              case "/":
                read();
                lexState = "default";
                return;
              case void 0:
                throw invalidChar(read());
            }
            read();
            lexState = "multiLineComment";
          },
          singleLineComment: function singleLineComment() {
            switch (c) {
              case "\n":
              case "\r":
              case "\u2028":
              case "\u2029":
                read();
                lexState = "default";
                return;
              case void 0:
                read();
                return newToken("eof");
            }
            read();
          },
          value: function value() {
            switch (c) {
              case "{":
              case "[":
                return newToken("punctuator", read());
              case "n":
                read();
                literal("ull");
                return newToken("null", null);
              case "t":
                read();
                literal("rue");
                return newToken("boolean", true);
              case "f":
                read();
                literal("alse");
                return newToken("boolean", false);
              case "-":
              case "+":
                if (read() === "-") {
                  sign = -1;
                }
                lexState = "sign";
                return;
              case ".":
                buffer = read();
                lexState = "decimalPointLeading";
                return;
              case "0":
                buffer = read();
                lexState = "zero";
                return;
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                buffer = read();
                lexState = "decimalInteger";
                return;
              case "I":
                read();
                literal("nfinity");
                return newToken("numeric", Infinity);
              case "N":
                read();
                literal("aN");
                return newToken("numeric", NaN);
              case '"':
              case "'":
                doubleQuote = read() === '"';
                buffer = "";
                lexState = "string";
                return;
            }
            throw invalidChar(read());
          },
          identifierNameStartEscape: function identifierNameStartEscape() {
            if (c !== "u") {
              throw invalidChar(read());
            }
            read();
            var u = unicodeEscape();
            switch (u) {
              case "$":
              case "_":
                break;
              default:
                if (!util.isIdStartChar(u)) {
                  throw invalidIdentifier();
                }
                break;
            }
            buffer += u;
            lexState = "identifierName";
          },
          identifierName: function identifierName() {
            switch (c) {
              case "$":
              case "_":
              case "\u200C":
              case "\u200D":
                buffer += read();
                return;
              case "\\":
                read();
                lexState = "identifierNameEscape";
                return;
            }
            if (util.isIdContinueChar(c)) {
              buffer += read();
              return;
            }
            return newToken("identifier", buffer);
          },
          identifierNameEscape: function identifierNameEscape() {
            if (c !== "u") {
              throw invalidChar(read());
            }
            read();
            var u = unicodeEscape();
            switch (u) {
              case "$":
              case "_":
              case "\u200C":
              case "\u200D":
                break;
              default:
                if (!util.isIdContinueChar(u)) {
                  throw invalidIdentifier();
                }
                break;
            }
            buffer += u;
            lexState = "identifierName";
          },
          sign: function sign$1() {
            switch (c) {
              case ".":
                buffer = read();
                lexState = "decimalPointLeading";
                return;
              case "0":
                buffer = read();
                lexState = "zero";
                return;
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                buffer = read();
                lexState = "decimalInteger";
                return;
              case "I":
                read();
                literal("nfinity");
                return newToken("numeric", sign * Infinity);
              case "N":
                read();
                literal("aN");
                return newToken("numeric", NaN);
            }
            throw invalidChar(read());
          },
          zero: function zero() {
            switch (c) {
              case ".":
                buffer += read();
                lexState = "decimalPoint";
                return;
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
              case "x":
              case "X":
                buffer += read();
                lexState = "hexadecimal";
                return;
            }
            return newToken("numeric", sign * 0);
          },
          decimalInteger: function decimalInteger() {
            switch (c) {
              case ".":
                buffer += read();
                lexState = "decimalPoint";
                return;
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalPointLeading: function decimalPointLeading() {
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalFraction";
              return;
            }
            throw invalidChar(read());
          },
          decimalPoint: function decimalPoint() {
            switch (c) {
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalFraction";
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalFraction: function decimalFraction() {
            switch (c) {
              case "e":
              case "E":
                buffer += read();
                lexState = "decimalExponent";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          decimalExponent: function decimalExponent() {
            switch (c) {
              case "+":
              case "-":
                buffer += read();
                lexState = "decimalExponentSign";
                return;
            }
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalExponentInteger";
              return;
            }
            throw invalidChar(read());
          },
          decimalExponentSign: function decimalExponentSign() {
            if (util.isDigit(c)) {
              buffer += read();
              lexState = "decimalExponentInteger";
              return;
            }
            throw invalidChar(read());
          },
          decimalExponentInteger: function decimalExponentInteger() {
            if (util.isDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          hexadecimal: function hexadecimal() {
            if (util.isHexDigit(c)) {
              buffer += read();
              lexState = "hexadecimalInteger";
              return;
            }
            throw invalidChar(read());
          },
          hexadecimalInteger: function hexadecimalInteger() {
            if (util.isHexDigit(c)) {
              buffer += read();
              return;
            }
            return newToken("numeric", sign * Number(buffer));
          },
          string: function string() {
            switch (c) {
              case "\\":
                read();
                buffer += escape();
                return;
              case '"':
                if (doubleQuote) {
                  read();
                  return newToken("string", buffer);
                }
                buffer += read();
                return;
              case "'":
                if (!doubleQuote) {
                  read();
                  return newToken("string", buffer);
                }
                buffer += read();
                return;
              case "\n":
              case "\r":
                throw invalidChar(read());
              case "\u2028":
              case "\u2029":
                separatorChar(c);
                break;
              case void 0:
                throw invalidChar(read());
            }
            buffer += read();
          },
          start: function start() {
            switch (c) {
              case "{":
              case "[":
                return newToken("punctuator", read());
            }
            lexState = "value";
          },
          beforePropertyName: function beforePropertyName() {
            switch (c) {
              case "$":
              case "_":
                buffer = read();
                lexState = "identifierName";
                return;
              case "\\":
                read();
                lexState = "identifierNameStartEscape";
                return;
              case "}":
                return newToken("punctuator", read());
              case '"':
              case "'":
                doubleQuote = read() === '"';
                lexState = "string";
                return;
            }
            if (util.isIdStartChar(c)) {
              buffer += read();
              lexState = "identifierName";
              return;
            }
            throw invalidChar(read());
          },
          afterPropertyName: function afterPropertyName() {
            if (c === ":") {
              return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          beforePropertyValue: function beforePropertyValue() {
            lexState = "value";
          },
          afterPropertyValue: function afterPropertyValue() {
            switch (c) {
              case ",":
              case "}":
                return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          beforeArrayValue: function beforeArrayValue() {
            if (c === "]") {
              return newToken("punctuator", read());
            }
            lexState = "value";
          },
          afterArrayValue: function afterArrayValue() {
            switch (c) {
              case ",":
              case "]":
                return newToken("punctuator", read());
            }
            throw invalidChar(read());
          },
          end: function end() {
            throw invalidChar(read());
          }
        };
        function newToken(type, value) {
          return {
            type,
            value,
            line,
            column
          };
        }
        function literal(s) {
          for (var i = 0, list = s; i < list.length; i += 1) {
            var c2 = list[i];
            var p = peek();
            if (p !== c2) {
              throw invalidChar(read());
            }
            read();
          }
        }
        function escape() {
          var c2 = peek();
          switch (c2) {
            case "b":
              read();
              return "\b";
            case "f":
              read();
              return "\f";
            case "n":
              read();
              return "\n";
            case "r":
              read();
              return "\r";
            case "t":
              read();
              return "	";
            case "v":
              read();
              return "\v";
            case "0":
              read();
              if (util.isDigit(peek())) {
                throw invalidChar(read());
              }
              return "\0";
            case "x":
              read();
              return hexEscape();
            case "u":
              read();
              return unicodeEscape();
            case "\n":
            case "\u2028":
            case "\u2029":
              read();
              return "";
            case "\r":
              read();
              if (peek() === "\n") {
                read();
              }
              return "";
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              throw invalidChar(read());
            case void 0:
              throw invalidChar(read());
          }
          return read();
        }
        function hexEscape() {
          var buffer2 = "";
          var c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
          c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
          return String.fromCodePoint(parseInt(buffer2, 16));
        }
        function unicodeEscape() {
          var buffer2 = "";
          var count = 4;
          while (count-- > 0) {
            var c2 = peek();
            if (!util.isHexDigit(c2)) {
              throw invalidChar(read());
            }
            buffer2 += read();
          }
          return String.fromCodePoint(parseInt(buffer2, 16));
        }
        var parseStates = {
          start: function start() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            push();
          },
          beforePropertyName: function beforePropertyName() {
            switch (token.type) {
              case "identifier":
              case "string":
                key = token.value;
                parseState = "afterPropertyName";
                return;
              case "punctuator":
                pop();
                return;
              case "eof":
                throw invalidEOF();
            }
          },
          afterPropertyName: function afterPropertyName() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            parseState = "beforePropertyValue";
          },
          beforePropertyValue: function beforePropertyValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            push();
          },
          beforeArrayValue: function beforeArrayValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            if (token.type === "punctuator" && token.value === "]") {
              pop();
              return;
            }
            push();
          },
          afterPropertyValue: function afterPropertyValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            switch (token.value) {
              case ",":
                parseState = "beforePropertyName";
                return;
              case "}":
                pop();
            }
          },
          afterArrayValue: function afterArrayValue() {
            if (token.type === "eof") {
              throw invalidEOF();
            }
            switch (token.value) {
              case ",":
                parseState = "beforeArrayValue";
                return;
              case "]":
                pop();
            }
          },
          end: function end() {
          }
        };
        function push() {
          var value;
          switch (token.type) {
            case "punctuator":
              switch (token.value) {
                case "{":
                  value = {};
                  break;
                case "[":
                  value = [];
                  break;
              }
              break;
            case "null":
            case "boolean":
            case "numeric":
            case "string":
              value = token.value;
              break;
          }
          if (root === void 0) {
            root = value;
          } else {
            var parent = stack[stack.length - 1];
            if (Array.isArray(parent)) {
              parent.push(value);
            } else {
              Object.defineProperty(parent, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
          if (value !== null && typeof value === "object") {
            stack.push(value);
            if (Array.isArray(value)) {
              parseState = "beforeArrayValue";
            } else {
              parseState = "beforePropertyName";
            }
          } else {
            var current = stack[stack.length - 1];
            if (current == null) {
              parseState = "end";
            } else if (Array.isArray(current)) {
              parseState = "afterArrayValue";
            } else {
              parseState = "afterPropertyValue";
            }
          }
        }
        function pop() {
          stack.pop();
          var current = stack[stack.length - 1];
          if (current == null) {
            parseState = "end";
          } else if (Array.isArray(current)) {
            parseState = "afterArrayValue";
          } else {
            parseState = "afterPropertyValue";
          }
        }
        function invalidChar(c2) {
          if (c2 === void 0) {
            return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
          }
          return syntaxError("JSON5: invalid character '" + formatChar(c2) + "' at " + line + ":" + column);
        }
        function invalidEOF() {
          return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
        }
        function invalidIdentifier() {
          column -= 5;
          return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
        }
        function separatorChar(c2) {
          console.warn("JSON5: '" + formatChar(c2) + "' in strings is not valid ECMAScript; consider escaping");
        }
        function formatChar(c2) {
          var replacements = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
          };
          if (replacements[c2]) {
            return replacements[c2];
          }
          if (c2 < " ") {
            var hexString = c2.charCodeAt(0).toString(16);
            return "\\x" + ("00" + hexString).substring(hexString.length);
          }
          return c2;
        }
        function syntaxError(message) {
          var err = new SyntaxError(message);
          err.lineNumber = line;
          err.columnNumber = column;
          return err;
        }
        var stringify = function stringify2(value, replacer, space) {
          var stack2 = [];
          var indent = "";
          var propertyList;
          var replacerFunc;
          var gap = "";
          var quote;
          if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
            space = replacer.space;
            quote = replacer.quote;
            replacer = replacer.replacer;
          }
          if (typeof replacer === "function") {
            replacerFunc = replacer;
          } else if (Array.isArray(replacer)) {
            propertyList = [];
            for (var i = 0, list = replacer; i < list.length; i += 1) {
              var v = list[i];
              var item = void 0;
              if (typeof v === "string") {
                item = v;
              } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
                item = String(v);
              }
              if (item !== void 0 && propertyList.indexOf(item) < 0) {
                propertyList.push(item);
              }
            }
          }
          if (space instanceof Number) {
            space = Number(space);
          } else if (space instanceof String) {
            space = String(space);
          }
          if (typeof space === "number") {
            if (space > 0) {
              space = Math.min(10, Math.floor(space));
              gap = "          ".substr(0, space);
            }
          } else if (typeof space === "string") {
            gap = space.substr(0, 10);
          }
          return serializeProperty("", { "": value });
          function serializeProperty(key2, holder) {
            var value2 = holder[key2];
            if (value2 != null) {
              if (typeof value2.toJSON5 === "function") {
                value2 = value2.toJSON5(key2);
              } else if (typeof value2.toJSON === "function") {
                value2 = value2.toJSON(key2);
              }
            }
            if (replacerFunc) {
              value2 = replacerFunc.call(holder, key2, value2);
            }
            if (value2 instanceof Number) {
              value2 = Number(value2);
            } else if (value2 instanceof String) {
              value2 = String(value2);
            } else if (value2 instanceof Boolean) {
              value2 = value2.valueOf();
            }
            switch (value2) {
              case null:
                return "null";
              case true:
                return "true";
              case false:
                return "false";
            }
            if (typeof value2 === "string") {
              return quoteString(value2, false);
            }
            if (typeof value2 === "number") {
              return String(value2);
            }
            if (typeof value2 === "object") {
              return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
            }
            return void 0;
          }
          function quoteString(value2) {
            var quotes = {
              "'": 0.1,
              '"': 0.2
            };
            var replacements = {
              "'": "\\'",
              '"': '\\"',
              "\\": "\\\\",
              "\b": "\\b",
              "\f": "\\f",
              "\n": "\\n",
              "\r": "\\r",
              "	": "\\t",
              "\v": "\\v",
              "\0": "\\0",
              "\u2028": "\\u2028",
              "\u2029": "\\u2029"
            };
            var product = "";
            for (var i2 = 0; i2 < value2.length; i2++) {
              var c2 = value2[i2];
              switch (c2) {
                case "'":
                case '"':
                  quotes[c2]++;
                  product += c2;
                  continue;
                case "\0":
                  if (util.isDigit(value2[i2 + 1])) {
                    product += "\\x00";
                    continue;
                  }
              }
              if (replacements[c2]) {
                product += replacements[c2];
                continue;
              }
              if (c2 < " ") {
                var hexString = c2.charCodeAt(0).toString(16);
                product += "\\x" + ("00" + hexString).substring(hexString.length);
                continue;
              }
              product += c2;
            }
            var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
              return quotes[a] < quotes[b] ? a : b;
            });
            product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
            return quoteChar + product + quoteChar;
          }
          function serializeObject(value2) {
            if (stack2.indexOf(value2) >= 0) {
              throw TypeError("Converting circular structure to JSON5");
            }
            stack2.push(value2);
            var stepback = indent;
            indent = indent + gap;
            var keys = propertyList || Object.keys(value2);
            var partial = [];
            for (var i2 = 0, list2 = keys; i2 < list2.length; i2 += 1) {
              var key2 = list2[i2];
              var propertyString = serializeProperty(key2, value2);
              if (propertyString !== void 0) {
                var member = serializeKey(key2) + ":";
                if (gap !== "") {
                  member += " ";
                }
                member += propertyString;
                partial.push(member);
              }
            }
            var final;
            if (partial.length === 0) {
              final = "{}";
            } else {
              var properties;
              if (gap === "") {
                properties = partial.join(",");
                final = "{" + properties + "}";
              } else {
                var separator = ",\n" + indent;
                properties = partial.join(separator);
                final = "{\n" + indent + properties + ",\n" + stepback + "}";
              }
            }
            stack2.pop();
            indent = stepback;
            return final;
          }
          function serializeKey(key2) {
            if (key2.length === 0) {
              return quoteString(key2, true);
            }
            var firstChar = String.fromCodePoint(key2.codePointAt(0));
            if (!util.isIdStartChar(firstChar)) {
              return quoteString(key2, true);
            }
            for (var i2 = firstChar.length; i2 < key2.length; i2++) {
              if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i2)))) {
                return quoteString(key2, true);
              }
            }
            return key2;
          }
          function serializeArray(value2) {
            if (stack2.indexOf(value2) >= 0) {
              throw TypeError("Converting circular structure to JSON5");
            }
            stack2.push(value2);
            var stepback = indent;
            indent = indent + gap;
            var partial = [];
            for (var i2 = 0; i2 < value2.length; i2++) {
              var propertyString = serializeProperty(String(i2), value2);
              partial.push(propertyString !== void 0 ? propertyString : "null");
            }
            var final;
            if (partial.length === 0) {
              final = "[]";
            } else {
              if (gap === "") {
                var properties = partial.join(",");
                final = "[" + properties + "]";
              } else {
                var separator = ",\n" + indent;
                var properties$1 = partial.join(separator);
                final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
              }
            }
            stack2.pop();
            indent = stepback;
            return final;
          }
        };
        var JSON5 = {
          parse: parse2,
          stringify
        };
        var lib = JSON5;
        var es5 = lib;
        return es5;
      }));
    }
  });

  // node_modules/diff-match-patch/index.js
  var require_diff_match_patch = __commonJS({
    "node_modules/diff-match-patch/index.js"(exports, module) {
      var diff_match_patch = function() {
        this.Diff_Timeout = 1;
        this.Diff_EditCost = 4;
        this.Match_Threshold = 0.5;
        this.Match_Distance = 1e3;
        this.Patch_DeleteThreshold = 0.5;
        this.Patch_Margin = 4;
        this.Match_MaxBits = 32;
      };
      var DIFF_DELETE = -1;
      var DIFF_INSERT = 1;
      var DIFF_EQUAL = 0;
      diff_match_patch.Diff = function(op, text) {
        return [op, text];
      };
      diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines, opt_deadline) {
        if (typeof opt_deadline == "undefined") {
          if (this.Diff_Timeout <= 0) {
            opt_deadline = Number.MAX_VALUE;
          } else {
            opt_deadline = (/* @__PURE__ */ new Date()).getTime() + this.Diff_Timeout * 1e3;
          }
        }
        var deadline = opt_deadline;
        if (text1 == null || text2 == null) {
          throw new Error("Null input. (diff_main)");
        }
        if (text1 == text2) {
          if (text1) {
            return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
          }
          return [];
        }
        if (typeof opt_checklines == "undefined") {
          opt_checklines = true;
        }
        var checklines = opt_checklines;
        var commonlength = this.diff_commonPrefix(text1, text2);
        var commonprefix = text1.substring(0, commonlength);
        text1 = text1.substring(commonlength);
        text2 = text2.substring(commonlength);
        commonlength = this.diff_commonSuffix(text1, text2);
        var commonsuffix = text1.substring(text1.length - commonlength);
        text1 = text1.substring(0, text1.length - commonlength);
        text2 = text2.substring(0, text2.length - commonlength);
        var diffs = this.diff_compute_(text1, text2, checklines, deadline);
        if (commonprefix) {
          diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
        }
        if (commonsuffix) {
          diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
        }
        this.diff_cleanupMerge(diffs);
        return diffs;
      };
      diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines, deadline) {
        var diffs;
        if (!text1) {
          return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
        }
        if (!text2) {
          return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        var i = longtext.indexOf(shorttext);
        if (i != -1) {
          diffs = [
            new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)),
            new diff_match_patch.Diff(DIFF_EQUAL, shorttext),
            new diff_match_patch.Diff(
              DIFF_INSERT,
              longtext.substring(i + shorttext.length)
            )
          ];
          if (text1.length > text2.length) {
            diffs[0][0] = diffs[2][0] = DIFF_DELETE;
          }
          return diffs;
        }
        if (shorttext.length == 1) {
          return [
            new diff_match_patch.Diff(DIFF_DELETE, text1),
            new diff_match_patch.Diff(DIFF_INSERT, text2)
          ];
        }
        var hm = this.diff_halfMatch_(text1, text2);
        if (hm) {
          var text1_a = hm[0];
          var text1_b = hm[1];
          var text2_a = hm[2];
          var text2_b = hm[3];
          var mid_common = hm[4];
          var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
          var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
          return diffs_a.concat(
            [new diff_match_patch.Diff(DIFF_EQUAL, mid_common)],
            diffs_b
          );
        }
        if (checklines && text1.length > 100 && text2.length > 100) {
          return this.diff_lineMode_(text1, text2, deadline);
        }
        return this.diff_bisect_(text1, text2, deadline);
      };
      diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
        var a = this.diff_linesToChars_(text1, text2);
        text1 = a.chars1;
        text2 = a.chars2;
        var linearray = a.lineArray;
        var diffs = this.diff_main(text1, text2, false, deadline);
        this.diff_charsToLines_(diffs, linearray);
        this.diff_cleanupSemantic(diffs);
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = "";
        var text_insert = "";
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              break;
            case DIFF_EQUAL:
              if (count_delete >= 1 && count_insert >= 1) {
                diffs.splice(
                  pointer - count_delete - count_insert,
                  count_delete + count_insert
                );
                pointer = pointer - count_delete - count_insert;
                var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
                for (var j = subDiff.length - 1; j >= 0; j--) {
                  diffs.splice(pointer, 0, subDiff[j]);
                }
                pointer = pointer + subDiff.length;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = "";
              text_insert = "";
              break;
          }
          pointer++;
        }
        diffs.pop();
        return diffs;
      };
      diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        var max_d = Math.ceil((text1_length + text2_length) / 2);
        var v_offset = max_d;
        var v_length = 2 * max_d;
        var v1 = new Array(v_length);
        var v2 = new Array(v_length);
        for (var x = 0; x < v_length; x++) {
          v1[x] = -1;
          v2[x] = -1;
        }
        v1[v_offset + 1] = 0;
        v2[v_offset + 1] = 0;
        var delta = text1_length - text2_length;
        var front = delta % 2 != 0;
        var k1start = 0;
        var k1end = 0;
        var k2start = 0;
        var k2end = 0;
        for (var d = 0; d < max_d; d++) {
          if ((/* @__PURE__ */ new Date()).getTime() > deadline) {
            break;
          }
          for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
            var k1_offset = v_offset + k1;
            var x1;
            if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
              x1 = v1[k1_offset + 1];
            } else {
              x1 = v1[k1_offset - 1] + 1;
            }
            var y1 = x1 - k1;
            while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
              x1++;
              y1++;
            }
            v1[k1_offset] = x1;
            if (x1 > text1_length) {
              k1end += 2;
            } else if (y1 > text2_length) {
              k1start += 2;
            } else if (front) {
              var k2_offset = v_offset + delta - k1;
              if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
                var x2 = text1_length - v2[k2_offset];
                if (x1 >= x2) {
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }
          for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
            var k2_offset = v_offset + k2;
            var x2;
            if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
              x2 = v2[k2_offset + 1];
            } else {
              x2 = v2[k2_offset - 1] + 1;
            }
            var y2 = x2 - k2;
            while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
              x2++;
              y2++;
            }
            v2[k2_offset] = x2;
            if (x2 > text1_length) {
              k2end += 2;
            } else if (y2 > text2_length) {
              k2start += 2;
            } else if (!front) {
              var k1_offset = v_offset + delta - k2;
              if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
                var x1 = v1[k1_offset];
                var y1 = v_offset + x1 - k1_offset;
                x2 = text1_length - x2;
                if (x1 >= x2) {
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }
        }
        return [
          new diff_match_patch.Diff(DIFF_DELETE, text1),
          new diff_match_patch.Diff(DIFF_INSERT, text2)
        ];
      };
      diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y, deadline) {
        var text1a = text1.substring(0, x);
        var text2a = text2.substring(0, y);
        var text1b = text1.substring(x);
        var text2b = text2.substring(y);
        var diffs = this.diff_main(text1a, text2a, false, deadline);
        var diffsb = this.diff_main(text1b, text2b, false, deadline);
        return diffs.concat(diffsb);
      };
      diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
        var lineArray = [];
        var lineHash = {};
        lineArray[0] = "";
        function diff_linesToCharsMunge_(text) {
          var chars = "";
          var lineStart = 0;
          var lineEnd = -1;
          var lineArrayLength = lineArray.length;
          while (lineEnd < text.length - 1) {
            lineEnd = text.indexOf("\n", lineStart);
            if (lineEnd == -1) {
              lineEnd = text.length - 1;
            }
            var line = text.substring(lineStart, lineEnd + 1);
            if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) {
              chars += String.fromCharCode(lineHash[line]);
            } else {
              if (lineArrayLength == maxLines) {
                line = text.substring(lineStart);
                lineEnd = text.length;
              }
              chars += String.fromCharCode(lineArrayLength);
              lineHash[line] = lineArrayLength;
              lineArray[lineArrayLength++] = line;
            }
            lineStart = lineEnd + 1;
          }
          return chars;
        }
        var maxLines = 4e4;
        var chars1 = diff_linesToCharsMunge_(text1);
        maxLines = 65535;
        var chars2 = diff_linesToCharsMunge_(text2);
        return { chars1, chars2, lineArray };
      };
      diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
        for (var i = 0; i < diffs.length; i++) {
          var chars = diffs[i][1];
          var text = [];
          for (var j = 0; j < chars.length; j++) {
            text[j] = lineArray[chars.charCodeAt(j)];
          }
          diffs[i][1] = text.join("");
        }
      };
      diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
        if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerstart = 0;
        while (pointermin < pointermid) {
          if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
            pointermin = pointermid;
            pointerstart = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };
      diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
        if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
          return 0;
        }
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerend = 0;
        while (pointermin < pointermid) {
          if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
            pointermin = pointermid;
            pointerend = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };
      diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
        var text1_length = text1.length;
        var text2_length = text2.length;
        if (text1_length == 0 || text2_length == 0) {
          return 0;
        }
        if (text1_length > text2_length) {
          text1 = text1.substring(text1_length - text2_length);
        } else if (text1_length < text2_length) {
          text2 = text2.substring(0, text1_length);
        }
        var text_length = Math.min(text1_length, text2_length);
        if (text1 == text2) {
          return text_length;
        }
        var best = 0;
        var length = 1;
        while (true) {
          var pattern = text1.substring(text_length - length);
          var found = text2.indexOf(pattern);
          if (found == -1) {
            return best;
          }
          length += found;
          if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
            best = length;
            length++;
          }
        }
      };
      diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
        if (this.Diff_Timeout <= 0) {
          return null;
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
          return null;
        }
        var dmp = this;
        function diff_halfMatchI_(longtext2, shorttext2, i) {
          var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
          var j = -1;
          var best_common = "";
          var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
          while ((j = shorttext2.indexOf(seed, j + 1)) != -1) {
            var prefixLength = dmp.diff_commonPrefix(
              longtext2.substring(i),
              shorttext2.substring(j)
            );
            var suffixLength = dmp.diff_commonSuffix(
              longtext2.substring(0, i),
              shorttext2.substring(0, j)
            );
            if (best_common.length < suffixLength + prefixLength) {
              best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
              best_longtext_a = longtext2.substring(0, i - suffixLength);
              best_longtext_b = longtext2.substring(i + prefixLength);
              best_shorttext_a = shorttext2.substring(0, j - suffixLength);
              best_shorttext_b = shorttext2.substring(j + prefixLength);
            }
          }
          if (best_common.length * 2 >= longtext2.length) {
            return [
              best_longtext_a,
              best_longtext_b,
              best_shorttext_a,
              best_shorttext_b,
              best_common
            ];
          } else {
            return null;
          }
        }
        var hm1 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 4)
        );
        var hm2 = diff_halfMatchI_(
          longtext,
          shorttext,
          Math.ceil(longtext.length / 2)
        );
        var hm;
        if (!hm1 && !hm2) {
          return null;
        } else if (!hm2) {
          hm = hm1;
        } else if (!hm1) {
          hm = hm2;
        } else {
          hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
        }
        var text1_a, text1_b, text2_a, text2_b;
        if (text1.length > text2.length) {
          text1_a = hm[0];
          text1_b = hm[1];
          text2_a = hm[2];
          text2_b = hm[3];
        } else {
          text2_a = hm[0];
          text2_b = hm[1];
          text1_a = hm[2];
          text1_b = hm[3];
        }
        var mid_common = hm[4];
        return [text1_a, text1_b, text2_a, text2_b, mid_common];
      };
      diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
        var changes = false;
        var equalities = [];
        var equalitiesLength = 0;
        var lastEquality = null;
        var pointer = 0;
        var length_insertions1 = 0;
        var length_deletions1 = 0;
        var length_insertions2 = 0;
        var length_deletions2 = 0;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            equalities[equalitiesLength++] = pointer;
            length_insertions1 = length_insertions2;
            length_deletions1 = length_deletions2;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = diffs[pointer][1];
          } else {
            if (diffs[pointer][0] == DIFF_INSERT) {
              length_insertions2 += diffs[pointer][1].length;
            } else {
              length_deletions2 += diffs[pointer][1].length;
            }
            if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(
              length_insertions2,
              length_deletions2
            )) {
              diffs.splice(
                equalities[equalitiesLength - 1],
                0,
                new diff_match_patch.Diff(DIFF_DELETE, lastEquality)
              );
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--;
              equalitiesLength--;
              pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
              length_insertions1 = 0;
              length_deletions1 = 0;
              length_insertions2 = 0;
              length_deletions2 = 0;
              lastEquality = null;
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
        this.diff_cleanupSemanticLossless(diffs);
        pointer = 1;
        while (pointer < diffs.length) {
          if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
            var deletion = diffs[pointer - 1][1];
            var insertion = diffs[pointer][1];
            var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
            var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
            if (overlap_length1 >= overlap_length2) {
              if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
                diffs.splice(pointer, 0, new diff_match_patch.Diff(
                  DIFF_EQUAL,
                  insertion.substring(0, overlap_length1)
                ));
                diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
                diffs[pointer + 1][1] = insertion.substring(overlap_length1);
                pointer++;
              }
            } else {
              if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
                diffs.splice(pointer, 0, new diff_match_patch.Diff(
                  DIFF_EQUAL,
                  deletion.substring(0, overlap_length2)
                ));
                diffs[pointer - 1][0] = DIFF_INSERT;
                diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
                diffs[pointer + 1][0] = DIFF_DELETE;
                diffs[pointer + 1][1] = deletion.substring(overlap_length2);
                pointer++;
              }
            }
            pointer++;
          }
          pointer++;
        }
      };
      diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
        function diff_cleanupSemanticScore_(one, two) {
          if (!one || !two) {
            return 6;
          }
          var char1 = one.charAt(one.length - 1);
          var char2 = two.charAt(0);
          var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
          var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
          var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
          var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
          var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
          var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
          var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
          var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);
          if (blankLine1 || blankLine2) {
            return 5;
          } else if (lineBreak1 || lineBreak2) {
            return 4;
          } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
            return 3;
          } else if (whitespace1 || whitespace2) {
            return 2;
          } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
            return 1;
          }
          return 0;
        }
        var pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            var equality1 = diffs[pointer - 1][1];
            var edit = diffs[pointer][1];
            var equality2 = diffs[pointer + 1][1];
            var commonOffset = this.diff_commonSuffix(equality1, edit);
            if (commonOffset) {
              var commonString = edit.substring(edit.length - commonOffset);
              equality1 = equality1.substring(0, equality1.length - commonOffset);
              edit = commonString + edit.substring(0, edit.length - commonOffset);
              equality2 = commonString + equality2;
            }
            var bestEquality1 = equality1;
            var bestEdit = edit;
            var bestEquality2 = equality2;
            var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            while (edit.charAt(0) === equality2.charAt(0)) {
              equality1 += edit.charAt(0);
              edit = edit.substring(1) + equality2.charAt(0);
              equality2 = equality2.substring(1);
              var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
              if (score >= bestScore) {
                bestScore = score;
                bestEquality1 = equality1;
                bestEdit = edit;
                bestEquality2 = equality2;
              }
            }
            if (diffs[pointer - 1][1] != bestEquality1) {
              if (bestEquality1) {
                diffs[pointer - 1][1] = bestEquality1;
              } else {
                diffs.splice(pointer - 1, 1);
                pointer--;
              }
              diffs[pointer][1] = bestEdit;
              if (bestEquality2) {
                diffs[pointer + 1][1] = bestEquality2;
              } else {
                diffs.splice(pointer + 1, 1);
                pointer--;
              }
            }
          }
          pointer++;
        }
      };
      diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
      diff_match_patch.whitespaceRegex_ = /\s/;
      diff_match_patch.linebreakRegex_ = /[\r\n]/;
      diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
      diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
      diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
        var changes = false;
        var equalities = [];
        var equalitiesLength = 0;
        var lastEquality = null;
        var pointer = 0;
        var pre_ins = false;
        var pre_del = false;
        var post_ins = false;
        var post_del = false;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
              equalities[equalitiesLength++] = pointer;
              pre_ins = post_ins;
              pre_del = post_del;
              lastEquality = diffs[pointer][1];
            } else {
              equalitiesLength = 0;
              lastEquality = null;
            }
            post_ins = post_del = false;
          } else {
            if (diffs[pointer][0] == DIFF_DELETE) {
              post_del = true;
            } else {
              post_ins = true;
            }
            if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
              diffs.splice(
                equalities[equalitiesLength - 1],
                0,
                new diff_match_patch.Diff(DIFF_DELETE, lastEquality)
              );
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--;
              lastEquality = null;
              if (pre_ins && pre_del) {
                post_ins = post_del = true;
                equalitiesLength = 0;
              } else {
                equalitiesLength--;
                pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
                post_ins = post_del = false;
              }
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };
      diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = "";
        var text_insert = "";
        var commonlength;
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_EQUAL:
              if (count_delete + count_insert > 1) {
                if (count_delete !== 0 && count_insert !== 0) {
                  commonlength = this.diff_commonPrefix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                      diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                    } else {
                      diffs.splice(0, 0, new diff_match_patch.Diff(
                        DIFF_EQUAL,
                        text_insert.substring(0, commonlength)
                      ));
                      pointer++;
                    }
                    text_insert = text_insert.substring(commonlength);
                    text_delete = text_delete.substring(commonlength);
                  }
                  commonlength = this.diff_commonSuffix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                    text_insert = text_insert.substring(0, text_insert.length - commonlength);
                    text_delete = text_delete.substring(0, text_delete.length - commonlength);
                  }
                }
                pointer -= count_delete + count_insert;
                diffs.splice(pointer, count_delete + count_insert);
                if (text_delete.length) {
                  diffs.splice(
                    pointer,
                    0,
                    new diff_match_patch.Diff(DIFF_DELETE, text_delete)
                  );
                  pointer++;
                }
                if (text_insert.length) {
                  diffs.splice(
                    pointer,
                    0,
                    new diff_match_patch.Diff(DIFF_INSERT, text_insert)
                  );
                  pointer++;
                }
                pointer++;
              } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
                diffs[pointer - 1][1] += diffs[pointer][1];
                diffs.splice(pointer, 1);
              } else {
                pointer++;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = "";
              text_insert = "";
              break;
          }
        }
        if (diffs[diffs.length - 1][1] === "") {
          diffs.pop();
        }
        var changes = false;
        pointer = 1;
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
              diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
              diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
              diffs.splice(pointer - 1, 1);
              changes = true;
            } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
              diffs[pointer - 1][1] += diffs[pointer + 1][1];
              diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
              diffs.splice(pointer + 1, 1);
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };
      diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
        var chars1 = 0;
        var chars2 = 0;
        var last_chars1 = 0;
        var last_chars2 = 0;
        var x;
        for (x = 0; x < diffs.length; x++) {
          if (diffs[x][0] !== DIFF_INSERT) {
            chars1 += diffs[x][1].length;
          }
          if (diffs[x][0] !== DIFF_DELETE) {
            chars2 += diffs[x][1].length;
          }
          if (chars1 > loc) {
            break;
          }
          last_chars1 = chars1;
          last_chars2 = chars2;
        }
        if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
          return last_chars2;
        }
        return last_chars2 + (loc - last_chars1);
      };
      diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
        var html = [];
        var pattern_amp = /&/g;
        var pattern_lt = /</g;
        var pattern_gt = />/g;
        var pattern_para = /\n/g;
        for (var x = 0; x < diffs.length; x++) {
          var op = diffs[x][0];
          var data = diffs[x][1];
          var text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
          switch (op) {
            case DIFF_INSERT:
              html[x] = '<ins style="background:#e6ffe6;">' + text + "</ins>";
              break;
            case DIFF_DELETE:
              html[x] = '<del style="background:#ffe6e6;">' + text + "</del>";
              break;
            case DIFF_EQUAL:
              html[x] = "<span>" + text + "</span>";
              break;
          }
        }
        return html.join("");
      };
      diff_match_patch.prototype.diff_text1 = function(diffs) {
        var text = [];
        for (var x = 0; x < diffs.length; x++) {
          if (diffs[x][0] !== DIFF_INSERT) {
            text[x] = diffs[x][1];
          }
        }
        return text.join("");
      };
      diff_match_patch.prototype.diff_text2 = function(diffs) {
        var text = [];
        for (var x = 0; x < diffs.length; x++) {
          if (diffs[x][0] !== DIFF_DELETE) {
            text[x] = diffs[x][1];
          }
        }
        return text.join("");
      };
      diff_match_patch.prototype.diff_levenshtein = function(diffs) {
        var levenshtein = 0;
        var insertions = 0;
        var deletions = 0;
        for (var x = 0; x < diffs.length; x++) {
          var op = diffs[x][0];
          var data = diffs[x][1];
          switch (op) {
            case DIFF_INSERT:
              insertions += data.length;
              break;
            case DIFF_DELETE:
              deletions += data.length;
              break;
            case DIFF_EQUAL:
              levenshtein += Math.max(insertions, deletions);
              insertions = 0;
              deletions = 0;
              break;
          }
        }
        levenshtein += Math.max(insertions, deletions);
        return levenshtein;
      };
      diff_match_patch.prototype.diff_toDelta = function(diffs) {
        var text = [];
        for (var x = 0; x < diffs.length; x++) {
          switch (diffs[x][0]) {
            case DIFF_INSERT:
              text[x] = "+" + encodeURI(diffs[x][1]);
              break;
            case DIFF_DELETE:
              text[x] = "-" + diffs[x][1].length;
              break;
            case DIFF_EQUAL:
              text[x] = "=" + diffs[x][1].length;
              break;
          }
        }
        return text.join("	").replace(/%20/g, " ");
      };
      diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
        var diffs = [];
        var diffsLength = 0;
        var pointer = 0;
        var tokens = delta.split(/\t/g);
        for (var x = 0; x < tokens.length; x++) {
          var param = tokens[x].substring(1);
          switch (tokens[x].charAt(0)) {
            case "+":
              try {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
              } catch (ex) {
                throw new Error("Illegal escape in diff_fromDelta: " + param);
              }
              break;
            case "-":
            // Fall through.
            case "=":
              var n = parseInt(param, 10);
              if (isNaN(n) || n < 0) {
                throw new Error("Invalid number in diff_fromDelta: " + param);
              }
              var text = text1.substring(pointer, pointer += n);
              if (tokens[x].charAt(0) == "=") {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
              } else {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
              }
              break;
            default:
              if (tokens[x]) {
                throw new Error("Invalid diff operation in diff_fromDelta: " + tokens[x]);
              }
          }
        }
        if (pointer != text1.length) {
          throw new Error("Delta length (" + pointer + ") does not equal source text length (" + text1.length + ").");
        }
        return diffs;
      };
      diff_match_patch.prototype.match_main = function(text, pattern, loc) {
        if (text == null || pattern == null || loc == null) {
          throw new Error("Null input. (match_main)");
        }
        loc = Math.max(0, Math.min(loc, text.length));
        if (text == pattern) {
          return 0;
        } else if (!text.length) {
          return -1;
        } else if (text.substring(loc, loc + pattern.length) == pattern) {
          return loc;
        } else {
          return this.match_bitap_(text, pattern, loc);
        }
      };
      diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
        if (pattern.length > this.Match_MaxBits) {
          throw new Error("Pattern too long for this browser.");
        }
        var s = this.match_alphabet_(pattern);
        var dmp = this;
        function match_bitapScore_(e, x) {
          var accuracy = e / pattern.length;
          var proximity = Math.abs(loc - x);
          if (!dmp.Match_Distance) {
            return proximity ? 1 : accuracy;
          }
          return accuracy + proximity / dmp.Match_Distance;
        }
        var score_threshold = this.Match_Threshold;
        var best_loc = text.indexOf(pattern, loc);
        if (best_loc != -1) {
          score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          best_loc = text.lastIndexOf(pattern, loc + pattern.length);
          if (best_loc != -1) {
            score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          }
        }
        var matchmask = 1 << pattern.length - 1;
        best_loc = -1;
        var bin_min, bin_mid;
        var bin_max = pattern.length + text.length;
        var last_rd;
        for (var d = 0; d < pattern.length; d++) {
          bin_min = 0;
          bin_mid = bin_max;
          while (bin_min < bin_mid) {
            if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
              bin_min = bin_mid;
            } else {
              bin_max = bin_mid;
            }
            bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
          }
          bin_max = bin_mid;
          var start = Math.max(1, loc - bin_mid + 1);
          var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
          var rd = Array(finish + 2);
          rd[finish + 1] = (1 << d) - 1;
          for (var j = finish; j >= start; j--) {
            var charMatch = s[text.charAt(j - 1)];
            if (d === 0) {
              rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
            } else {
              rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
            }
            if (rd[j] & matchmask) {
              var score = match_bitapScore_(d, j - 1);
              if (score <= score_threshold) {
                score_threshold = score;
                best_loc = j - 1;
                if (best_loc > loc) {
                  start = Math.max(1, 2 * loc - best_loc);
                } else {
                  break;
                }
              }
            }
          }
          if (match_bitapScore_(d + 1, loc) > score_threshold) {
            break;
          }
          last_rd = rd;
        }
        return best_loc;
      };
      diff_match_patch.prototype.match_alphabet_ = function(pattern) {
        var s = {};
        for (var i = 0; i < pattern.length; i++) {
          s[pattern.charAt(i)] = 0;
        }
        for (var i = 0; i < pattern.length; i++) {
          s[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
        }
        return s;
      };
      diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
        if (text.length == 0) {
          return;
        }
        if (patch.start2 === null) {
          throw Error("patch not initialized");
        }
        var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
        var padding = 0;
        while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
          padding += this.Patch_Margin;
          pattern = text.substring(
            patch.start2 - padding,
            patch.start2 + patch.length1 + padding
          );
        }
        padding += this.Patch_Margin;
        var prefix = text.substring(patch.start2 - padding, patch.start2);
        if (prefix) {
          patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
        }
        var suffix = text.substring(
          patch.start2 + patch.length1,
          patch.start2 + patch.length1 + padding
        );
        if (suffix) {
          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
        }
        patch.start1 -= prefix.length;
        patch.start2 -= prefix.length;
        patch.length1 += prefix.length + suffix.length;
        patch.length2 += prefix.length + suffix.length;
      };
      diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
        var text1, diffs;
        if (typeof a == "string" && typeof opt_b == "string" && typeof opt_c == "undefined") {
          text1 = /** @type {string} */
          a;
          diffs = this.diff_main(
            text1,
            /** @type {string} */
            opt_b,
            true
          );
          if (diffs.length > 2) {
            this.diff_cleanupSemantic(diffs);
            this.diff_cleanupEfficiency(diffs);
          }
        } else if (a && typeof a == "object" && typeof opt_b == "undefined" && typeof opt_c == "undefined") {
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          a;
          text1 = this.diff_text1(diffs);
        } else if (typeof a == "string" && opt_b && typeof opt_b == "object" && typeof opt_c == "undefined") {
          text1 = /** @type {string} */
          a;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          opt_b;
        } else if (typeof a == "string" && typeof opt_b == "string" && opt_c && typeof opt_c == "object") {
          text1 = /** @type {string} */
          a;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */
          opt_c;
        } else {
          throw new Error("Unknown call format to patch_make.");
        }
        if (diffs.length === 0) {
          return [];
        }
        var patches = [];
        var patch = new diff_match_patch.patch_obj();
        var patchDiffLength = 0;
        var char_count1 = 0;
        var char_count2 = 0;
        var prepatch_text = text1;
        var postpatch_text = text1;
        for (var x = 0; x < diffs.length; x++) {
          var diff_type = diffs[x][0];
          var diff_text = diffs[x][1];
          if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
            patch.start1 = char_count1;
            patch.start2 = char_count2;
          }
          switch (diff_type) {
            case DIFF_INSERT:
              patch.diffs[patchDiffLength++] = diffs[x];
              patch.length2 += diff_text.length;
              postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
              break;
            case DIFF_DELETE:
              patch.length1 += diff_text.length;
              patch.diffs[patchDiffLength++] = diffs[x];
              postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
              break;
            case DIFF_EQUAL:
              if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x + 1) {
                patch.diffs[patchDiffLength++] = diffs[x];
                patch.length1 += diff_text.length;
                patch.length2 += diff_text.length;
              } else if (diff_text.length >= 2 * this.Patch_Margin) {
                if (patchDiffLength) {
                  this.patch_addContext_(patch, prepatch_text);
                  patches.push(patch);
                  patch = new diff_match_patch.patch_obj();
                  patchDiffLength = 0;
                  prepatch_text = postpatch_text;
                  char_count1 = char_count2;
                }
              }
              break;
          }
          if (diff_type !== DIFF_INSERT) {
            char_count1 += diff_text.length;
          }
          if (diff_type !== DIFF_DELETE) {
            char_count2 += diff_text.length;
          }
        }
        if (patchDiffLength) {
          this.patch_addContext_(patch, prepatch_text);
          patches.push(patch);
        }
        return patches;
      };
      diff_match_patch.prototype.patch_deepCopy = function(patches) {
        var patchesCopy = [];
        for (var x = 0; x < patches.length; x++) {
          var patch = patches[x];
          var patchCopy = new diff_match_patch.patch_obj();
          patchCopy.diffs = [];
          for (var y = 0; y < patch.diffs.length; y++) {
            patchCopy.diffs[y] = new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
          }
          patchCopy.start1 = patch.start1;
          patchCopy.start2 = patch.start2;
          patchCopy.length1 = patch.length1;
          patchCopy.length2 = patch.length2;
          patchesCopy[x] = patchCopy;
        }
        return patchesCopy;
      };
      diff_match_patch.prototype.patch_apply = function(patches, text) {
        if (patches.length == 0) {
          return [text, []];
        }
        patches = this.patch_deepCopy(patches);
        var nullPadding = this.patch_addPadding(patches);
        text = nullPadding + text + nullPadding;
        this.patch_splitMax(patches);
        var delta = 0;
        var results = [];
        for (var x = 0; x < patches.length; x++) {
          var expected_loc = patches[x].start2 + delta;
          var text1 = this.diff_text1(patches[x].diffs);
          var start_loc;
          var end_loc = -1;
          if (text1.length > this.Match_MaxBits) {
            start_loc = this.match_main(
              text,
              text1.substring(0, this.Match_MaxBits),
              expected_loc
            );
            if (start_loc != -1) {
              end_loc = this.match_main(
                text,
                text1.substring(text1.length - this.Match_MaxBits),
                expected_loc + text1.length - this.Match_MaxBits
              );
              if (end_loc == -1 || start_loc >= end_loc) {
                start_loc = -1;
              }
            }
          } else {
            start_loc = this.match_main(text, text1, expected_loc);
          }
          if (start_loc == -1) {
            results[x] = false;
            delta -= patches[x].length2 - patches[x].length1;
          } else {
            results[x] = true;
            delta = start_loc - expected_loc;
            var text2;
            if (end_loc == -1) {
              text2 = text.substring(start_loc, start_loc + text1.length);
            } else {
              text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
            }
            if (text1 == text2) {
              text = text.substring(0, start_loc) + this.diff_text2(patches[x].diffs) + text.substring(start_loc + text1.length);
            } else {
              var diffs = this.diff_main(text1, text2, false);
              if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
                results[x] = false;
              } else {
                this.diff_cleanupSemanticLossless(diffs);
                var index1 = 0;
                var index2;
                for (var y = 0; y < patches[x].diffs.length; y++) {
                  var mod = patches[x].diffs[y];
                  if (mod[0] !== DIFF_EQUAL) {
                    index2 = this.diff_xIndex(diffs, index1);
                  }
                  if (mod[0] === DIFF_INSERT) {
                    text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
                  } else if (mod[0] === DIFF_DELETE) {
                    text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(
                      diffs,
                      index1 + mod[1].length
                    ));
                  }
                  if (mod[0] !== DIFF_DELETE) {
                    index1 += mod[1].length;
                  }
                }
              }
            }
          }
        }
        text = text.substring(nullPadding.length, text.length - nullPadding.length);
        return [text, results];
      };
      diff_match_patch.prototype.patch_addPadding = function(patches) {
        var paddingLength = this.Patch_Margin;
        var nullPadding = "";
        for (var x = 1; x <= paddingLength; x++) {
          nullPadding += String.fromCharCode(x);
        }
        for (var x = 0; x < patches.length; x++) {
          patches[x].start1 += paddingLength;
          patches[x].start2 += paddingLength;
        }
        var patch = patches[0];
        var diffs = patch.diffs;
        if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
          diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
          patch.start1 -= paddingLength;
          patch.start2 -= paddingLength;
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[0][1].length) {
          var extraLength = paddingLength - diffs[0][1].length;
          diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
          patch.start1 -= extraLength;
          patch.start2 -= extraLength;
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }
        patch = patches[patches.length - 1];
        diffs = patch.diffs;
        if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
          diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[diffs.length - 1][1].length) {
          var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
          diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }
        return nullPadding;
      };
      diff_match_patch.prototype.patch_splitMax = function(patches) {
        var patch_size = this.Match_MaxBits;
        for (var x = 0; x < patches.length; x++) {
          if (patches[x].length1 <= patch_size) {
            continue;
          }
          var bigpatch = patches[x];
          patches.splice(x--, 1);
          var start1 = bigpatch.start1;
          var start2 = bigpatch.start2;
          var precontext = "";
          while (bigpatch.diffs.length !== 0) {
            var patch = new diff_match_patch.patch_obj();
            var empty = true;
            patch.start1 = start1 - precontext.length;
            patch.start2 = start2 - precontext.length;
            if (precontext !== "") {
              patch.length1 = patch.length2 = precontext.length;
              patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
            }
            while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
              var diff_type = bigpatch.diffs[0][0];
              var diff_text = bigpatch.diffs[0][1];
              if (diff_type === DIFF_INSERT) {
                patch.length2 += diff_text.length;
                start2 += diff_text.length;
                patch.diffs.push(bigpatch.diffs.shift());
                empty = false;
              } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                empty = false;
                patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                bigpatch.diffs.shift();
              } else {
                diff_text = diff_text.substring(
                  0,
                  patch_size - patch.length1 - this.Patch_Margin
                );
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                if (diff_type === DIFF_EQUAL) {
                  patch.length2 += diff_text.length;
                  start2 += diff_text.length;
                } else {
                  empty = false;
                }
                patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                if (diff_text == bigpatch.diffs[0][1]) {
                  bigpatch.diffs.shift();
                } else {
                  bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
                }
              }
            }
            precontext = this.diff_text2(patch.diffs);
            precontext = precontext.substring(precontext.length - this.Patch_Margin);
            var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
            if (postcontext !== "") {
              patch.length1 += postcontext.length;
              patch.length2 += postcontext.length;
              if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
                patch.diffs[patch.diffs.length - 1][1] += postcontext;
              } else {
                patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
              }
            }
            if (!empty) {
              patches.splice(++x, 0, patch);
            }
          }
        }
      };
      diff_match_patch.prototype.patch_toText = function(patches) {
        var text = [];
        for (var x = 0; x < patches.length; x++) {
          text[x] = patches[x];
        }
        return text.join("");
      };
      diff_match_patch.prototype.patch_fromText = function(textline) {
        var patches = [];
        if (!textline) {
          return patches;
        }
        var text = textline.split("\n");
        var textPointer = 0;
        var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
        while (textPointer < text.length) {
          var m = text[textPointer].match(patchHeader);
          if (!m) {
            throw new Error("Invalid patch string: " + text[textPointer]);
          }
          var patch = new diff_match_patch.patch_obj();
          patches.push(patch);
          patch.start1 = parseInt(m[1], 10);
          if (m[2] === "") {
            patch.start1--;
            patch.length1 = 1;
          } else if (m[2] == "0") {
            patch.length1 = 0;
          } else {
            patch.start1--;
            patch.length1 = parseInt(m[2], 10);
          }
          patch.start2 = parseInt(m[3], 10);
          if (m[4] === "") {
            patch.start2--;
            patch.length2 = 1;
          } else if (m[4] == "0") {
            patch.length2 = 0;
          } else {
            patch.start2--;
            patch.length2 = parseInt(m[4], 10);
          }
          textPointer++;
          while (textPointer < text.length) {
            var sign = text[textPointer].charAt(0);
            try {
              var line = decodeURI(text[textPointer].substring(1));
            } catch (ex) {
              throw new Error("Illegal escape in patch_fromText: " + line);
            }
            if (sign == "-") {
              patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
            } else if (sign == "+") {
              patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
            } else if (sign == " ") {
              patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
            } else if (sign == "@") {
              break;
            } else if (sign === "") {
            } else {
              throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
            }
            textPointer++;
          }
        }
        return patches;
      };
      diff_match_patch.patch_obj = function() {
        this.diffs = [];
        this.start1 = null;
        this.start2 = null;
        this.length1 = 0;
        this.length2 = 0;
      };
      diff_match_patch.patch_obj.prototype.toString = function() {
        var coords1, coords2;
        if (this.length1 === 0) {
          coords1 = this.start1 + ",0";
        } else if (this.length1 == 1) {
          coords1 = this.start1 + 1;
        } else {
          coords1 = this.start1 + 1 + "," + this.length1;
        }
        if (this.length2 === 0) {
          coords2 = this.start2 + ",0";
        } else if (this.length2 == 1) {
          coords2 = this.start2 + 1;
        } else {
          coords2 = this.start2 + 1 + "," + this.length2;
        }
        var text = ["@@ -" + coords1 + " +" + coords2 + " @@\n"];
        var op;
        for (var x = 0; x < this.diffs.length; x++) {
          switch (this.diffs[x][0]) {
            case DIFF_INSERT:
              op = "+";
              break;
            case DIFF_DELETE:
              op = "-";
              break;
            case DIFF_EQUAL:
              op = " ";
              break;
          }
          text[x + 1] = op + encodeURI(this.diffs[x][1]) + "\n";
        }
        return text.join("").replace(/%20/g, " ");
      };
      module.exports = diff_match_patch;
      module.exports["diff_match_patch"] = diff_match_patch;
      module.exports["DIFF_DELETE"] = DIFF_DELETE;
      module.exports["DIFF_INSERT"] = DIFF_INSERT;
      module.exports["DIFF_EQUAL"] = DIFF_EQUAL;
    }
  });

  // vditor-master/src/ts/constants.ts
  var _VDITOR_VERSION = "4.0.1";
  var Constants = class _Constants {
    static {
      this.ZWSP = "\u200B";
    }
    static {
      this.DROP_EDITOR = "application/editor";
    }
    static {
      this.MOBILE_WIDTH = 520;
    }
    static {
      this.CLASS_MENU_DISABLED = "vditor-menu--disabled";
    }
    static {
      this.EDIT_TOOLBARS = [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "list",
        "ordered-list",
        "outdent",
        "indent",
        "check",
        "line",
        "quote",
        "code",
        "inline-code",
        "insert-after",
        "insert-before",
        "upload",
        "record",
        "table"
      ];
    }
    static {
      this.CODE_THEME = [
        "a11y-dark",
        "agate",
        "an-old-hope",
        "androidstudio",
        "arta",
        "atom-one-dark",
        "atom-one-dark-reasonable",
        "base16/3024",
        "base16/apathy",
        "base16/apprentice",
        "base16/ashes",
        "base16/atelier-cave",
        "base16/atelier-dune",
        "base16/atelier-estuary",
        "base16/atelier-forest",
        "base16/atelier-heath",
        "base16/atelier-lakeside",
        "base16/atelier-plateau",
        "base16/atelier-savanna",
        "base16/atelier-seaside",
        "base16/atelier-sulphurpool",
        "base16/atlas",
        "base16/bespin",
        "base16/black-metal",
        "base16/black-metal-bathory",
        "base16/black-metal-burzum",
        "base16/black-metal-dark-funeral",
        "base16/black-metal-gorgoroth",
        "base16/black-metal-immortal",
        "base16/black-metal-khold",
        "base16/black-metal-marduk",
        "base16/black-metal-mayhem",
        "base16/black-metal-nile",
        "base16/black-metal-venom",
        "base16/brewer",
        "base16/bright",
        "base16/brogrammer",
        "base16/brush-trees-dark",
        "base16/chalk",
        "base16/circus",
        "base16/classic-dark",
        "base16/codeschool",
        "base16/colors",
        "base16/danqing",
        "base16/darcula",
        "base16/dark-violet",
        "base16/darkmoss",
        "base16/darktooth",
        "base16/decaf",
        "base16/default-dark",
        "base16/dracula",
        "base16/edge-dark",
        "base16/eighties",
        "base16/embers",
        "base16/equilibrium-dark",
        "base16/equilibrium-gray-dark",
        "base16/espresso",
        "base16/eva",
        "base16/eva-dim",
        "base16/flat",
        "base16/framer",
        "base16/gigavolt",
        "base16/google-dark",
        "base16/grayscale-dark",
        "base16/green-screen",
        "base16/gruvbox-dark-hard",
        "base16/gruvbox-dark-medium",
        "base16/gruvbox-dark-pale",
        "base16/gruvbox-dark-soft",
        "base16/hardcore",
        "base16/harmonic16-dark",
        "base16/heetch-dark",
        "base16/helios",
        "base16/hopscotch",
        "base16/horizon-dark",
        "base16/humanoid-dark",
        "base16/ia-dark",
        "base16/icy-dark",
        "base16/ir-black",
        "base16/isotope",
        "base16/kimber",
        "base16/london-tube",
        "base16/macintosh",
        "base16/marrakesh",
        "base16/materia",
        "base16/material",
        "base16/material-darker",
        "base16/material-palenight",
        "base16/material-vivid",
        "base16/mellow-purple",
        "base16/mocha",
        "base16/monokai",
        "base16/nebula",
        "base16/nord",
        "base16/nova",
        "base16/ocean",
        "base16/oceanicnext",
        "base16/onedark",
        "base16/outrun-dark",
        "base16/papercolor-dark",
        "base16/paraiso",
        "base16/pasque",
        "base16/phd",
        "base16/pico",
        "base16/pop",
        "base16/porple",
        "base16/qualia",
        "base16/railscasts",
        "base16/rebecca",
        "base16/ros-pine",
        "base16/ros-pine-moon",
        "base16/sandcastle",
        "base16/seti-ui",
        "base16/silk-dark",
        "base16/snazzy",
        "base16/solar-flare",
        "base16/solarized-dark",
        "base16/spacemacs",
        "base16/summercamp",
        "base16/summerfruit-dark",
        "base16/synth-midnight-terminal-dark",
        "base16/tango",
        "base16/tender",
        "base16/tomorrow-night",
        "base16/twilight",
        "base16/unikitty-dark",
        "base16/vulcan",
        "base16/windows-10",
        "base16/windows-95",
        "base16/windows-high-contrast",
        "base16/windows-nt",
        "base16/woodland",
        "base16/xcode-dusk",
        "base16/zenburn",
        "codepen-embed",
        "dark",
        "devibeans",
        "far",
        "felipec",
        "github-dark",
        "github-dark-dimmed",
        "gml",
        "gradient-dark",
        "hybrid",
        "ir-black",
        "isbl-editor-dark",
        "kimbie-dark",
        "lioshi",
        "monokai",
        "monokai-sublime",
        "night-owl",
        "nnfx-dark",
        "nord",
        "obsidian",
        "panda-syntax-dark",
        "paraiso-dark",
        "pojoaque",
        "qtcreator-dark",
        "rainbow",
        "shades-of-purple",
        "srcery",
        "stackoverflow-dark",
        "sunburst",
        "tomorrow-night-blue",
        "tomorrow-night-bright",
        "tokyo-night-dark",
        "vs2015",
        "xt256",
        "ant-design",
        "a11y-light",
        "arduino-light",
        "ascetic",
        "atom-one-light",
        "base16/atelier-cave-light",
        "base16/atelier-dune-light",
        "base16/atelier-estuary-light",
        "base16/atelier-forest-light",
        "base16/atelier-heath-light",
        "base16/atelier-lakeside-light",
        "base16/atelier-plateau-light",
        "base16/atelier-savanna-light",
        "base16/atelier-seaside-light",
        "base16/atelier-sulphurpool-light",
        "base16/brush-trees",
        "base16/classic-light",
        "base16/cupcake",
        "base16/cupertino",
        "base16/default-light",
        "base16/dirtysea",
        "base16/edge-light",
        "base16/equilibrium-gray-light",
        "base16/equilibrium-light",
        "base16/fruit-soda",
        "base16/github",
        "base16/google-light",
        "base16/grayscale-light",
        "base16/gruvbox-light-hard",
        "base16/gruvbox-light-medium",
        "base16/gruvbox-light-soft",
        "base16/harmonic16-light",
        "base16/heetch-light",
        "base16/humanoid-light",
        "base16/horizon-light",
        "base16/ia-light",
        "base16/material-lighter",
        "base16/mexico-light",
        "base16/one-light",
        "base16/papercolor-light",
        "base16/ros-pine-dawn",
        "base16/sagelight",
        "base16/shapeshifter",
        "base16/silk-light",
        "base16/solar-flare-light",
        "base16/solarized-light",
        "base16/summerfruit-light",
        "base16/synth-midnight-terminal-light",
        "base16/tomorrow",
        "base16/unikitty-light",
        "base16/windows-10-light",
        "base16/windows-95-light",
        "base16/windows-high-contrast-light",
        "brown-paper",
        "base16/windows-nt-light",
        "color-brewer",
        "docco",
        "foundation",
        "github",
        "googlecode",
        "gradient-light",
        "grayscale",
        "idea",
        "intellij-light",
        "isbl-editor-light",
        "kimbie-light",
        "lightfair",
        "magula",
        "mono-blue",
        "nnfx-light",
        "panda-syntax-light",
        "paraiso-light",
        "purebasic",
        "qtcreator-light",
        "routeros",
        "school-book",
        "stackoverflow-light",
        "tokyo-night-light",
        "vs",
        "xcode",
        "default"
      ];
    }
    static {
      this.ALIAS_CODE_LANGUAGES = [
        // 自定义
        "abc",
        "plantuml",
        "mermaid",
        "flowchart",
        "echarts",
        "mindmap",
        "graphviz",
        "wavedrom",
        "math",
        "markmap",
        "smiles",
        // 别名
        "js",
        "ts",
        "html",
        "toml",
        "c#",
        "bat"
      ];
    }
    static {
      this.CDN = `https://unpkg.com/vditor@${"4.0.1"}`;
    }
    static {
      this.MARKDOWN_OPTIONS = {
        autoSpace: false,
        callout: true,
        inlineMath: true,
        gfmAutoLink: true,
        codeBlockPreview: true,
        fixTermTypo: false,
        footnotes: true,
        imageCaption: false,
        linkBase: "",
        linkPrefix: "",
        listStyle: false,
        mark: false,
        mathBlockPreview: true,
        paragraphBeginningSpace: false,
        sanitize: true,
        sub: false,
        sup: false,
        toc: false
      };
    }
    static {
      this.HLJS_OPTIONS = {
        enable: true,
        lineNumber: false,
        defaultLang: "",
        style: "github"
      };
    }
    static {
      this.MATH_OPTIONS = {
        engine: "KaTeX",
        inlineDigit: false,
        macros: {}
      };
    }
    static {
      this.THEME_OPTIONS = {
        current: "light",
        list: {
          "ant-design": "Ant Design",
          "dark": "Dark",
          "light": "Light",
          "wechat": "WeChat"
        },
        path: `${_Constants.CDN}/dist/css/content-theme`
      };
    }
  };

  // vditor-master/src/ts/util/addScript.ts
  var addScriptSync = (path, id) => {
    if (document.getElementById(id)) {
      return false;
    }
    const scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.src = path;
    scriptElement.async = false;
    scriptElement.id = id;
    document.head.appendChild(scriptElement);
  };
  var addScript = (path, id) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        resolve(true);
        return false;
      }
      const scriptElement = document.createElement("script");
      scriptElement.src = path;
      scriptElement.async = true;
      document.head.appendChild(scriptElement);
      scriptElement.onerror = (event) => {
        reject(event);
      };
      scriptElement.onload = () => {
        if (document.getElementById(id)) {
          scriptElement.remove();
          resolve(true);
          return false;
        }
        scriptElement.id = id;
        resolve(true);
      };
    });
  };

  // vditor-master/src/ts/markdown/adapterRender.ts
  var adapterRender_exports = {};
  __export(adapterRender_exports, {
    SMILESRenderAdapter: () => SMILESRenderAdapter,
    abcRenderAdapter: () => abcRenderAdapter,
    chartRenderAdapter: () => chartRenderAdapter,
    flowchartRenderAdapter: () => flowchartRenderAdapter,
    graphvizRenderAdapter: () => graphvizRenderAdapter,
    markmapRenderAdapter: () => markmapRenderAdapter,
    mathRenderAdapter: () => mathRenderAdapter,
    mermaidRenderAdapter: () => mermaidRenderAdapter,
    mindmapRenderAdapter: () => mindmapRenderAdapter,
    plantumlRenderAdapter: () => plantumlRenderAdapter,
    wavedromRenderAdapter: () => wavedromRenderAdapter
  });
  var mathRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (element) => element.querySelectorAll(".language-math")
  };
  var SMILESRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (element) => element.querySelectorAll(".language-smiles")
  };
  var mermaidRenderAdapter = {
    /** 不仅要返回code，并且需要将 code 设置为 el 的 innerHTML */
    getCode: (el) => el.textContent,
    getElements: (element) => element.querySelectorAll(".language-mermaid")
  };
  var markmapRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (element) => element.querySelectorAll(".language-markmap")
  };
  var mindmapRenderAdapter = {
    getCode: (el) => el.getAttribute("data-code"),
    getElements: (el) => el.querySelectorAll(".language-mindmap")
  };
  var chartRenderAdapter = {
    getCode: (el) => el.innerText,
    getElements: (el) => el.querySelectorAll(".language-echarts")
  };
  var abcRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (el) => el.querySelectorAll(".language-abc")
  };
  var graphvizRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (el) => el.querySelectorAll(".language-graphviz")
  };
  var wavedromRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (el) => el.querySelectorAll(".language-wavedrom")
  };
  var flowchartRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (el) => el.querySelectorAll(".language-flowchart")
  };
  var plantumlRenderAdapter = {
    getCode: (el) => el.textContent,
    getElements: (el) => el.querySelectorAll(".language-plantuml")
  };

  // vditor-master/src/ts/markdown/abcRender.ts
  var abcRender = (element = document, cdn = Constants.CDN) => {
    const abcElements = abcRenderAdapter.getElements(element);
    if (abcElements.length > 0) {
      addScript(`${cdn}/dist/js/abcjs/abcjs_basic.min.js`, "vditorAbcjsScript").then(() => {
        abcElements.forEach((item) => {
          if (item.parentElement.classList.contains("vditor-wysiwyg__pre") || item.parentElement.classList.contains("vditor-ir__marker--pre")) {
            return;
          }
          if (item.getAttribute("data-processed") === "true") {
            return;
          }
          ABCJS.renderAbc(item, abcRenderAdapter.getCode(item).trim());
          item.style.overflowX = "auto";
          item.setAttribute("data-processed", "true");
        });
      });
    }
  };

  // vditor-master/src/ts/util/function.ts
  var import_json5 = __toESM(require_dist());
  var genUUID = () => ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c) => (parseInt(c, 10) ^ window.crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> parseInt(c, 10) / 4).toString(16)
  );
  var getSearch = (key, link = window.location.search) => {
    const params = link.substring(link.indexOf("?"));
    const hashIndex = params.indexOf("#");
    const urlSearchParams = new URLSearchParams(params.substring(0, hashIndex >= 0 ? hashIndex : void 0));
    return urlSearchParams.get(key);
  };
  var looseJsonParse = (text) => {
    return (0, import_json5.parse)(text);
  };

  // vditor-master/src/ts/markdown/chartRender.ts
  var chartRender = (element = document, cdn = Constants.CDN, theme) => {
    const echartsElements = chartRenderAdapter.getElements(element);
    if (echartsElements.length > 0) {
      addScript(`${cdn}/dist/js/echarts/echarts.min.js?v=5.5.1`, "vditorEchartsScript").then(() => {
        echartsElements.forEach(async (e) => {
          if (e.parentElement.classList.contains("vditor-wysiwyg__pre") || e.parentElement.classList.contains("vditor-ir__marker--pre")) {
            return;
          }
          const text = chartRenderAdapter.getCode(e).trim();
          if (!text) {
            return;
          }
          try {
            if (e.getAttribute("data-processed") === "true") {
              return;
            }
            const option = await looseJsonParse(text);
            echarts.init(e, theme === "dark" ? "dark" : void 0).setOption(option);
            e.setAttribute("data-processed", "true");
          } catch (error) {
            e.className = "vditor-reset--error";
            e.innerHTML = `echarts render error: <br>${error}`;
          }
        });
      });
    }
  };

  // vditor-master/src/ts/util/code160to32.ts
  var code160to32 = (text) => {
    return text.replace(/\u00a0/g, " ");
  };

  // vditor-master/src/ts/markdown/codeRender.ts
  var codeRender = (element, option) => {
    Array.from(element.querySelectorAll("pre > code")).filter((e, index) => {
      if (e.parentElement.classList.contains("vditor-wysiwyg__pre") || e.parentElement.classList.contains("vditor-ir__marker--pre")) {
        return false;
      }
      if (e.classList.contains("language-mermaid") || e.classList.contains("language-flowchart") || e.classList.contains("language-echarts") || e.classList.contains("language-mindmap") || e.classList.contains("language-plantuml") || e.classList.contains("language-markmap") || e.classList.contains("language-abc") || e.classList.contains("language-graphviz") || e.classList.contains("language-math") || e.classList.contains("language-smiles")) {
        return false;
      }
      if (e.style.maxHeight.indexOf("px") > -1) {
        return false;
      }
      if (element.classList.contains("vditor-preview") && index > 5) {
        return false;
      }
      return true;
    }).forEach((e) => {
      let codeText = e.innerText;
      if (e.classList.contains("highlight-chroma")) {
        const codeElement = e.cloneNode(true);
        codeElement.querySelectorAll(".highlight-ln").forEach((item) => {
          item.remove();
        });
        codeText = codeElement.innerText;
      } else if (codeText.endsWith("\n")) {
        codeText = codeText.substr(0, codeText.length - 1);
      }
      let iconHTML = '<svg><use xlink:href="#vditor-icon-copy"></use></svg>';
      if (!document.getElementById("vditorIconScript")) {
        iconHTML = '<svg viewBox="0 0 32 32"><path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path></svg>';
      }
      const divElement = document.createElement("div");
      divElement.className = "vditor-copy";
      divElement.innerHTML = `<span aria-label="${window.VditorI18n?.copy || "\u590D\u5236"}"
class="vditor-tooltipped vditor-tooltipped__w">${iconHTML}</span>`;
      const textarea = document.createElement("textarea");
      textarea.value = code160to32(codeText);
      divElement.insertAdjacentElement("afterbegin", textarea);
      divElement.lastElementChild.addEventListener("mouseover", () => {
        divElement.lastElementChild.setAttribute("aria-label", window.VditorI18n?.copy || "\u590D\u5236");
      });
      divElement.lastElementChild.addEventListener("click", (event) => {
        event.stopPropagation();
        textarea.select();
        document.execCommand("copy");
        divElement.lastElementChild.setAttribute("aria-label", window.VditorI18n?.copied || "\u5DF2\u590D\u5236");
        textarea.blur();
      });
      if (option && option.renderMenu) {
        option.renderMenu(e, divElement);
      }
      e.before(divElement);
      e.style.maxHeight = window.outerHeight - 40 + "px";
      e.insertAdjacentHTML("afterend", `<span style="position: absolute">${Constants.ZWSP}</span>`);
    });
  };

  // vditor-master/src/ts/markdown/flowchartRender.ts
  var flowchartRender = (element, cdn = Constants.CDN) => {
    const flowchartElements = flowchartRenderAdapter.getElements(element);
    if (flowchartElements.length === 0) {
      return;
    }
    addScript(`${cdn}/dist/js/flowchart.js/flowchart.min.js`, "vditorFlowchartScript").then(() => {
      flowchartElements.forEach((item) => {
        if (item.getAttribute("data-processed") === "true") {
          return;
        }
        const flowchartObj = flowchart.parse(flowchartRenderAdapter.getCode(item));
        item.innerHTML = "";
        flowchartObj.drawSVG(item);
        item.setAttribute("data-processed", "true");
      });
    });
  };

  // vditor-master/src/ts/markdown/graphvizRender.ts
  var graphvizRender = (element, cdn = Constants.CDN) => {
    const graphvizElements = graphvizRenderAdapter.getElements(element);
    if (graphvizElements.length === 0) {
      return;
    }
    addScript(`${cdn}/dist/js/graphviz/viz.js`, "vditorGraphVizScript").then(
      () => addScript(`${cdn}/dist/js/graphviz/full.render.js`, "vditorGraphVizFullScript")
    ).then(() => {
      graphvizElements.forEach((e) => {
        const code = graphvizRenderAdapter.getCode(e);
        if (e.parentElement.classList.contains("vditor-wysiwyg__pre") || e.parentElement.classList.contains("vditor-ir__marker--pre")) {
          return;
        }
        if (e.getAttribute("data-processed") === "true" || code.trim() === "") {
          return;
        }
        try {
          new Viz().renderSVGElement(code).then((result) => {
            e.innerHTML = result.outerHTML;
          }).catch((error) => {
            e.innerHTML = `graphviz render error: <br>${error}`;
            e.className = "vditor-reset--error";
          });
        } catch (e2) {
          console.error("graphviz error", e2);
        }
        e.setAttribute("data-processed", "true");
      });
    });
  };

  // vditor-master/src/ts/util/addStyle.ts
  var addStyle = (url, id) => {
    if (!document.getElementById(id)) {
      const styleElement = document.createElement("link");
      styleElement.id = id;
      styleElement.rel = "stylesheet";
      styleElement.type = "text/css";
      styleElement.href = url;
      document.getElementsByTagName("head")[0].appendChild(styleElement);
    }
  };

  // vditor-master/src/ts/markdown/highlightRender.ts
  var highlightRender = (hljsOption, element = document, cdn = Constants.CDN) => {
    let style = hljsOption.style;
    if (!Constants.CODE_THEME.includes(style)) {
      style = "github";
    }
    const vditorHljsStyle = document.getElementById("vditorHljsStyle");
    const href = `${cdn}/dist/js/highlight.js/styles/${style}.min.css`;
    if (vditorHljsStyle && vditorHljsStyle.getAttribute("href") !== href) {
      vditorHljsStyle.remove();
    }
    addStyle(`${cdn}/dist/js/highlight.js/styles/${style}.min.css`, "vditorHljsStyle");
    if (hljsOption.enable === false) {
      return;
    }
    const codes = element.querySelectorAll("pre > code");
    if (codes.length === 0) {
      return;
    }
    addScript(`${cdn}/dist/js/highlight.js/highlight.min.js?v=11.7.0`, "vditorHljsScript").then(() => {
      addScript(`${cdn}/dist/js/highlight.js/third-languages.js?v=1.0.1`, "vditorHljsThirdScript").then(() => {
        element.querySelectorAll("pre > code").forEach((block) => {
          if (block.parentElement.classList.contains("vditor-ir__marker--pre") || block.parentElement.classList.contains("vditor-wysiwyg__pre")) {
            return;
          }
          if (block.classList.contains("language-mermaid") || block.classList.contains("language-flowchart") || block.classList.contains("language-echarts") || block.classList.contains("language-mindmap") || block.classList.contains("language-plantuml") || block.classList.contains("language-smiles") || block.classList.contains("language-abc") || block.classList.contains("language-graphviz") || block.classList.contains("language-math")) {
            return;
          }
          if (hljsOption.defaultLang !== "" && block.className.indexOf("language-") === -1) {
            block.classList.add("language-" + hljsOption.defaultLang);
          }
          let language = block.className.replace("language-", "");
          if (!window.hljs.getLanguage(language)) {
            language = "plaintext";
          }
          block.innerHTML = window.hljs.highlight(
            block.textContent,
            {
              language,
              ignoreIllegals: true
            }
          ).value;
          block.classList.add("hljs");
          if (!hljsOption.lineNumber) {
            return;
          }
          block.classList.add("vditor-linenumber");
          let linenNumberTemp = block.querySelector(".vditor-linenumber__temp");
          if (!linenNumberTemp) {
            linenNumberTemp = document.createElement("div");
            linenNumberTemp.className = "vditor-linenumber__temp";
            block.insertAdjacentElement("beforeend", linenNumberTemp);
          }
          const whiteSpace = getComputedStyle(block).whiteSpace;
          let isSoftWrap = false;
          if (whiteSpace === "pre-wrap" || whiteSpace === "pre-line") {
            isSoftWrap = true;
          }
          let lineNumberHTML = "";
          const lineList = block.textContent.split(/\r\n|\r|\n/g);
          lineList.pop();
          lineList.map((line) => {
            let lineHeight = "";
            if (isSoftWrap) {
              linenNumberTemp.textContent = line || "\n";
              lineHeight = ` style="height:${linenNumberTemp.getBoundingClientRect().height}px"`;
            }
            lineNumberHTML += `<span${lineHeight}></span>`;
          });
          linenNumberTemp.style.display = "none";
          lineNumberHTML = `<span class="vditor-linenumber__rows">${lineNumberHTML}</span>`;
          block.insertAdjacentHTML("beforeend", lineNumberHTML);
        });
      });
    });
  };

  // vditor-master/src/ts/markdown/lazyLoadImageRender.ts
  var lazyLoadImageRender = (element = document) => {
    const loadImg = (it) => {
      const testImage = document.createElement("img");
      testImage.src = it.getAttribute("data-src");
      testImage.addEventListener("load", () => {
        if (!it.getAttribute("style") && !it.getAttribute("class") && !it.getAttribute("width") && !it.getAttribute("height")) {
          if (testImage.naturalHeight > testImage.naturalWidth && testImage.naturalWidth / testImage.naturalHeight < document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) && testImage.naturalHeight > window.innerHeight - 40) {
            it.style.height = window.innerHeight - 40 + "px";
          }
        }
        it.src = testImage.src;
      });
      it.removeAttribute("data-src");
    };
    if (!("IntersectionObserver" in window)) {
      element.querySelectorAll("img").forEach((imgElement) => {
        if (imgElement.getAttribute("data-src")) {
          loadImg(imgElement);
        }
      });
      return false;
    }
    if (window.vditorImageIntersectionObserver) {
      window.vditorImageIntersectionObserver.disconnect();
      element.querySelectorAll("img").forEach((imgElement) => {
        window.vditorImageIntersectionObserver.observe(imgElement);
      });
    } else {
      window.vditorImageIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entrie) => {
          if ((typeof entrie.isIntersecting === "undefined" ? entrie.intersectionRatio !== 0 : entrie.isIntersecting) && entrie.target.getAttribute("data-src")) {
            loadImg(entrie.target);
          }
        });
      });
      element.querySelectorAll("img").forEach((imgElement) => {
        window.vditorImageIntersectionObserver.observe(imgElement);
      });
    }
  };

  // vditor-master/src/ts/markdown/mathRender.ts
  var mathRender = (element = document, options) => {
    const mathElements = mathRenderAdapter.getElements(element);
    if (mathElements.length === 0) {
      return;
    }
    const defaultOptions = {
      cdn: Constants.CDN,
      math: {
        engine: "KaTeX",
        inlineDigit: false,
        macros: {}
      }
    };
    if (options && options.math) {
      options.math = Object.assign({}, defaultOptions.math, options.math);
    }
    options = Object.assign({}, defaultOptions, options);
    if (options.math.engine === "KaTeX") {
      addStyle(`${options.cdn}/dist/js/katex/katex.min.css?v=0.16.9`, "vditorKatexStyle");
      addScript(`${options.cdn}/dist/js/katex/katex.min.js?v=0.16.9`, "vditorKatexScript").then(() => {
        addScript(`${options.cdn}/dist/js/katex/mhchem.min.js?v=0.16.9`, "vditorKatexChemScript").then(() => {
          mathElements.forEach((mathElement) => {
            if (mathElement.parentElement.classList.contains("vditor-wysiwyg__pre") || mathElement.parentElement.classList.contains("vditor-ir__marker--pre")) {
              return;
            }
            if (mathElement.getAttribute("data-math")) {
              return;
            }
            const math = code160to32(mathRenderAdapter.getCode(mathElement));
            mathElement.setAttribute("data-math", math);
            try {
              mathElement.innerHTML = katex.renderToString(math, {
                displayMode: mathElement.tagName === "DIV",
                output: "html",
                macros: options.math.macros
              });
            } catch (e) {
              mathElement.innerHTML = e.message;
              mathElement.className = "language-math vditor-reset--error";
            }
            mathElement.addEventListener("copy", (event) => {
              event.stopPropagation();
              event.preventDefault();
              const vditorMathElement = event.currentTarget.closest(".language-math");
              event.clipboardData.setData("text/html", vditorMathElement.innerHTML);
              event.clipboardData.setData(
                "text/plain",
                vditorMathElement.getAttribute("data-math")
              );
            });
          });
        });
      });
    } else if (options.math.engine === "MathJax") {
      const chainAsync = (fns) => {
        if (fns.length === 0) {
          return;
        }
        let curr = 0;
        const last = fns[fns.length - 1];
        const next = () => {
          const fn = fns[curr++];
          fn === last ? fn() : fn(next);
        };
        next();
      };
      if (!window.MathJax) {
        window.MathJax = {
          loader: {
            paths: { mathjax: `${options.cdn}/dist/js/mathjax` }
          },
          startup: {
            typeset: false
          },
          tex: {
            macros: options.math.macros
          }
        };
        Object.assign(window.MathJax, options.math.mathJaxOptions);
      }
      addScriptSync(`${options.cdn}/dist/js/mathjax/tex-svg-full.js`, "protyleMathJaxScript");
      const renderMath = (mathElement, next) => {
        const math = code160to32(mathElement.textContent).trim();
        const mathOptions = window.MathJax.getMetricsFor(mathElement);
        mathOptions.display = mathElement.tagName === "DIV";
        window.MathJax.tex2svgPromise(math, mathOptions).then((node) => {
          mathElement.innerHTML = "";
          mathElement.setAttribute("data-math", math);
          mathElement.append(node);
          window.MathJax.startup.document.clear();
          window.MathJax.startup.document.updateDocument();
          const errorTextElement = node.querySelector('[data-mml-node="merror"]');
          if (errorTextElement && errorTextElement.textContent.trim() !== "") {
            mathElement.innerHTML = errorTextElement.textContent.trim();
            mathElement.className = "vditor-reset--error";
          }
          if (next) {
            next();
          }
        });
      };
      window.MathJax.startup.promise.then(() => {
        const chains = [];
        for (let i = 0; i < mathElements.length; i++) {
          const mathElement = mathElements[i];
          if (!mathElement.parentElement.classList.contains("vditor-wysiwyg__pre") && !mathElement.parentElement.classList.contains("vditor-ir__marker--pre") && !mathElement.getAttribute("data-math") && code160to32(mathElement.textContent).trim()) {
            chains.push((next) => {
              if (i === mathElements.length - 1) {
                renderMath(mathElement);
              } else {
                renderMath(mathElement, next);
              }
            });
          }
        }
        chainAsync(chains);
      });
    }
  };

  // vditor-master/src/ts/markdown/mediaRender.ts
  var replaceMedia = (element, tag, url) => {
    const media = element.ownerDocument.createElement(tag);
    if (tag === "iframe") {
      media.className = "iframe__video";
    } else {
      media.setAttribute("controls", "controls");
    }
    media.setAttribute("src", url);
    element.replaceWith(media);
  };
  var iframeRender = (element, url) => {
    const youtubeMatch = url.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/);
    const youkuMatch = url.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/);
    const qqMatch = url.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/);
    const coubMatch = url.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/);
    const facebookMatch = url.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/);
    const dailymotionMatch = url.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/);
    const bilibiliMatch = url.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/);
    const tedMatch = url.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
    if (youtubeMatch && youtubeMatch[1].length === 11) {
      replaceMedia(element, "iframe", `//www.youtube.com/embed/${youtubeMatch[1] + (youtubeMatch[2] ? "?start=" + youtubeMatch[2] : "")}`);
    } else if (youkuMatch && youkuMatch[1]) {
      replaceMedia(element, "iframe", `//player.youku.com/embed/${youkuMatch[1]}`);
    } else if (qqMatch && qqMatch[1]) {
      replaceMedia(element, "iframe", `https://v.qq.com/txp/iframe/player.html?vid=${qqMatch[1]}`);
    } else if (coubMatch && coubMatch[1]) {
      replaceMedia(
        element,
        "iframe",
        `//coub.com/embed/${coubMatch[1]}?muted=false&autostart=false&originalSize=true&startWithHD=true`
      );
    } else if (facebookMatch && facebookMatch[0]) {
      replaceMedia(
        element,
        "iframe",
        `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(facebookMatch[0])}`
      );
    } else if (dailymotionMatch && dailymotionMatch[2]) {
      replaceMedia(element, "iframe", `https://www.dailymotion.com/embed/video/${dailymotionMatch[2]}`);
    } else if (url.indexOf("bilibili.com") > -1 && (url.indexOf("bvid=") > -1 || bilibiliMatch && bilibiliMatch[1])) {
      const params = {
        bvid: getSearch("bvid", url) || bilibiliMatch && bilibiliMatch[1],
        page: "1",
        high_quality: "1",
        as_wide: "1",
        allowfullscreen: "true",
        autoplay: "0"
      };
      new URL(url.startsWith("http") ? url : "https:" + url).search.split("&").forEach((item, index) => {
        if (!item) {
          return;
        }
        if (index === 0) {
          item = item.substr(1);
        }
        const keyValue = item.split("=");
        params[keyValue[0]] = keyValue[1];
      });
      let src = "https://player.bilibili.com/player.html?";
      const keys = Object.keys(params);
      keys.forEach((key, index) => {
        src += `${key}=${params[key]}`;
        if (index < keys.length - 1) {
          src += "&";
        }
      });
      replaceMedia(element, "iframe", src);
    } else if (tedMatch && tedMatch[1]) {
      replaceMedia(element, "iframe", `//embed.ted.com/talks/${tedMatch[1]}`);
    }
  };
  var mediaRender = (element) => {
    if (!element) {
      return;
    }
    element.querySelectorAll("a").forEach((aElement) => {
      const url = aElement.getAttribute("href");
      if (!url) {
        return;
      }
      if (url.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/)) {
        replaceMedia(aElement, "video", url);
      } else if (url.match(/^.+.(mp3|wav|flac)$/)) {
        replaceMedia(aElement, "audio", url);
      } else {
        iframeRender(aElement, url);
      }
    });
  };

  // vditor-master/src/ts/markdown/mermaidRender.ts
  var mermaidRender = (element = document, cdn = Constants.CDN, theme) => {
    const mermaidElements = mermaidRenderAdapter.getElements(element);
    if (mermaidElements.length === 0) {
      return;
    }
    addScript(`${cdn}/dist/js/mermaid/mermaid.min.js?v=11.17.2`, "vditorMermaidScript").then(() => {
      const config = {
        securityLevel: "strict",
        altFontFamily: "sans-serif",
        fontFamily: "sans-serif",
        startOnLoad: false,
        flowchart: {
          htmlLabels: true,
          useMaxWidth: true
        },
        sequence: {
          useMaxWidth: true,
          diagramMarginX: 8,
          diagramMarginY: 8,
          boxMargin: 8,
          showSequenceNumbers: true
          // Mermaid 时序图增加序号 https://github.com/siyuan-note/siyuan/pull/6992 https://mermaid.js.org/syntax/sequenceDiagram.html#sequencenumbers
        },
        gantt: {
          leftPadding: 75,
          rightPadding: 20
        }
      };
      if (theme === "dark") {
        config.theme = "dark";
      }
      mermaid.initialize(config);
      mermaidElements.forEach(async (item) => {
        const code = mermaidRenderAdapter.getCode(item);
        if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
          return;
        }
        const id = "mermaid" + genUUID();
        try {
          const mermaidData = await mermaid.render(id, item.textContent);
          item.innerHTML = mermaidData.svg;
        } catch (e) {
          const errorElement = document.querySelector("#" + id);
          item.innerHTML = `${errorElement.outerHTML}<br>
<div style="text-align: left"><small>${e.message.replace(/\n/, "<br>")}</small></div>`;
          errorElement.parentElement.remove();
        }
        item.setAttribute("data-processed", "true");
      });
    });
  };

  // vditor-master/src/ts/markdown/SMILESRender.ts
  var SMILESRender = (element = document, cdn = Constants.CDN, theme) => {
    const SMILESElements = SMILESRenderAdapter.getElements(element);
    if (SMILESElements.length > 0) {
      addScript(`${cdn}/dist/js/smiles-drawer/smiles-drawer.min.js?v=2.1.7`, "vditorSmilesScript").then(() => {
        let sd = new SmiDrawer({}, {});
        SMILESElements.forEach((item) => {
          if (item.parentElement.classList.contains("vditor-wysiwyg__pre") || item.parentElement.classList.contains("vditor-ir__marker--pre")) {
            return;
          }
          if (item.tagName === "PRE" && item.querySelector("code.language-smiles")) {
            return;
          }
          const code = SMILESRenderAdapter.getCode(item).trim();
          if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
            return;
          }
          const id = "smiles" + genUUID();
          const target = document.createElement("div");
          target.className = "language-smiles";
          target.innerHTML = `<svg id="${id}"></svg>`;
          if (item.tagName === "CODE" && item.parentElement.tagName === "PRE") {
            item.parentElement.replaceWith(target);
          } else {
            item.replaceWith(target);
          }
          sd.draw(code, "#" + id, theme === "dark" ? "dark" : void 0);
          target.setAttribute("data-processed", "true");
        });
      });
    }
  };

  // vditor-master/src/ts/markdown/markmapRender.ts
  var enabled = {};
  var transform = (transformer, content) => {
    const result = transformer.transform(content);
    const keys = Object.keys(result.features).filter((key) => !enabled[key]);
    keys.forEach((key) => {
      enabled[key] = true;
    });
    const { styles, scripts } = transformer.getAssets(keys);
    const { markmap } = window;
    if (styles) markmap.loadCSS(styles);
    if (scripts) markmap.loadJS(scripts);
    return result;
  };
  var init = (el, code) => {
    const { Transformer, Markmap, deriveOptions, globalCSS } = window.markmap;
    const transformer = new Transformer();
    el.innerHTML = '<svg style="width:100%"></svg>';
    const svg = el.firstChild;
    const mm = Markmap.create(svg, null);
    const { root, frontmatter } = transform(transformer, code);
    const markmapOptions = frontmatter?.markmap;
    const frontmatterOptions = deriveOptions(markmapOptions);
    mm.setData(root, frontmatterOptions);
    mm.fit();
  };
  var markmapRender = (element = document, cdn = Constants.CDN) => {
    const markmapElements = markmapRenderAdapter.getElements(element);
    if (markmapElements.length === 0) {
      return;
    }
    addScript(`${cdn}/dist/js/markmap/markmap.min.js`, "vditorMarkerScript").then(() => {
      markmapElements.forEach((item) => {
        const code = markmapRenderAdapter.getCode(item);
        if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
          return;
        }
        const render = document.createElement("div");
        render.className = "language-markmap";
        item.parentNode.appendChild(render);
        init(render, code);
        if (item.parentNode.childNodes[0].nodeName == "CODE") {
          item.parentNode.removeChild(item.parentNode.childNodes[0]);
        }
      });
    });
  };

  // vditor-master/src/ts/markdown/mindmapRender.ts
  var mindmapRender = (element = document, cdn = Constants.CDN, theme) => {
    const mindmapElements = mindmapRenderAdapter.getElements(element);
    if (mindmapElements.length > 0) {
      addScript(`${cdn}/dist/js/echarts/echarts.min.js?v=5.5.1`, "vditorEchartsScript").then(() => {
        mindmapElements.forEach((e) => {
          if (e.parentElement.classList.contains("vditor-wysiwyg__pre") || e.parentElement.classList.contains("vditor-ir__marker--pre")) {
            return;
          }
          const text = mindmapRenderAdapter.getCode(e);
          if (!text) {
            return;
          }
          try {
            if (e.getAttribute("data-processed") === "true") {
              return;
            }
            echarts.init(e, theme === "dark" ? "dark" : void 0).setOption({
              series: [
                {
                  data: [JSON.parse(decodeURIComponent(text))],
                  initialTreeDepth: -1,
                  itemStyle: {
                    borderWidth: 0,
                    color: "#4285f4"
                  },
                  label: {
                    backgroundColor: "#f6f8fa",
                    borderColor: "#d1d5da",
                    borderRadius: 5,
                    borderWidth: 0.5,
                    color: "#586069",
                    lineHeight: 20,
                    offset: [-5, 0],
                    padding: [0, 5],
                    position: "insideRight"
                  },
                  lineStyle: {
                    color: "#d1d5da",
                    width: 1
                  },
                  roam: true,
                  symbol: (value, params) => {
                    if (params?.data?.children) {
                      return "circle";
                    } else {
                      return "path://";
                    }
                  },
                  type: "tree"
                }
              ],
              tooltip: {
                trigger: "item",
                triggerOn: "mousemove"
              }
            });
            e.setAttribute("data-processed", "true");
          } catch (error) {
            e.className = "vditor-reset--error";
            e.innerHTML = `mindmap render error: <br>${error}`;
          }
        });
      });
    }
  };

  // vditor-master/src/ts/util/hasClosestByHeadings.ts
  var hasClosestByTag = (element, nodeName) => {
    if (!element) {
      return false;
    }
    if (element.nodeType === 3) {
      element = element.parentElement;
    }
    let e = element;
    let isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
      if (e.nodeName.indexOf(nodeName) === 0) {
        isClosest = true;
      } else {
        e = e.parentElement;
      }
    }
    return isClosest && e;
  };
  var hasClosestByHeadings = (element) => {
    const headingElement = hasClosestByTag(element, "H");
    if (headingElement && headingElement.tagName.length === 2 && headingElement.tagName !== "HR") {
      return headingElement;
    }
    return false;
  };

  // vditor-master/src/ts/markdown/outlineRender.ts
  var outlineRender = (contentElement, targetElement, vditor) => {
    let tocHTML = "";
    const ids = [];
    Array.from(contentElement.children).forEach((item, index) => {
      if (hasClosestByHeadings(item)) {
        if (vditor) {
          const lastIndex = item.id.lastIndexOf("_");
          item.id = item.id.substring(0, lastIndex === -1 ? void 0 : lastIndex) + "_" + index;
        }
        ids.push(item.id);
        tocHTML += item.outerHTML.replace("<wbr>", "");
      }
    });
    if (tocHTML === "") {
      targetElement.innerHTML = "";
      return "";
    }
    const tempElement = document.createElement("div");
    if (vditor) {
      vditor.lute.SetToC(true);
      if (vditor.currentMode === "wysiwyg" && !vditor.preview.element.contains(contentElement)) {
        tempElement.innerHTML = vditor.lute.SpinVditorDOM("<p>[ToC]</p>" + tocHTML);
      } else if (vditor.currentMode === "ir" && !vditor.preview.element.contains(contentElement)) {
        tempElement.innerHTML = vditor.lute.SpinVditorIRDOM("<p>[ToC]</p>" + tocHTML);
      } else {
        tempElement.innerHTML = vditor.lute.HTML2VditorDOM("<p>[ToC]</p>" + tocHTML);
      }
      vditor.lute.SetToC(vditor.options.preview.markdown.toc);
    } else {
      targetElement.classList.add("vditor-outline");
      const lute = Lute.New();
      lute.SetToC(true);
      tempElement.innerHTML = lute.HTML2VditorDOM("<p>[ToC]</p>" + tocHTML);
    }
    const headingsElement = tempElement.firstElementChild.querySelectorAll("li > span[data-target-id]");
    headingsElement.forEach((item, index) => {
      if (item.nextElementSibling && item.nextElementSibling.tagName === "UL") {
        let iconHTML = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
        if (!document.getElementById("vditorIconScript")) {
          iconHTML = '<svg class="vditor-outline__action" viewBox="0 0 32 32"><path d="M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z"></path></svg>';
        }
        item.innerHTML = `${iconHTML}<span>${item.innerHTML}</span>`;
      } else {
        item.innerHTML = `<svg></svg><span>${item.innerHTML}</span>`;
      }
      item.setAttribute("data-target-id", ids[index]);
    });
    tocHTML = tempElement.firstElementChild.innerHTML;
    if (headingsElement.length === 0) {
      targetElement.innerHTML = "";
      return tocHTML;
    }
    targetElement.innerHTML = tocHTML;
    if (vditor) {
      mathRender(targetElement, {
        cdn: vditor.options.cdn,
        math: vditor.options.preview.math
      });
    }
    targetElement.firstElementChild.addEventListener("click", (event) => {
      let target = event.target;
      while (target && !target.isEqualNode(targetElement)) {
        if (target.classList.contains("vditor-outline__action")) {
          if (target.classList.contains("vditor-outline__action--close")) {
            target.classList.remove("vditor-outline__action--close");
            target.parentElement.nextElementSibling.setAttribute("style", "display:block");
          } else {
            target.classList.add("vditor-outline__action--close");
            target.parentElement.nextElementSibling.setAttribute("style", "display:none");
          }
          event.preventDefault();
          event.stopPropagation();
          break;
        } else if (target.getAttribute("data-target-id")) {
          event.preventDefault();
          event.stopPropagation();
          const idElement = document.getElementById(target.getAttribute("data-target-id"));
          if (!idElement) {
            return;
          }
          if (vditor) {
            if (vditor.options.height === "auto") {
              let windowScrollY = idElement.offsetTop + vditor.element.offsetTop;
              if (!vditor.options.toolbarConfig.pin) {
                windowScrollY += vditor.toolbar.element.offsetHeight;
              }
              window.scrollTo(window.scrollX, windowScrollY);
            } else {
              if (vditor.element.offsetTop < window.scrollY) {
                window.scrollTo(window.scrollX, vditor.element.offsetTop);
              }
              if (vditor.preview.element.contains(contentElement)) {
                contentElement.parentElement.scrollTop = idElement.offsetTop;
              } else {
                contentElement.scrollTop = idElement.offsetTop;
              }
            }
          } else {
            window.scrollTo(window.scrollX, idElement.offsetTop);
          }
          break;
        }
        target = target.parentElement;
      }
    });
    return tocHTML;
  };

  // vditor-master/src/ts/markdown/plantumlRender.ts
  var plantumlRender = (element = document, cdn = Constants.CDN) => {
    const plantumlElements = plantumlRenderAdapter.getElements(element);
    if (plantumlElements.length === 0) {
      return;
    }
    addScript(`${cdn}/dist/js/plantuml/plantuml-encoder.min.js`, "vditorPlantumlScript").then(() => {
      plantumlElements.forEach((e) => {
        if (e.parentElement.classList.contains("vditor-wysiwyg__pre") || e.parentElement.classList.contains("vditor-ir__marker--pre")) {
          return;
        }
        const text = plantumlRenderAdapter.getCode(e).trim();
        if (!text) {
          return;
        }
        try {
          e.innerHTML = `<object type="image/svg+xml" data="https://www.plantuml.com/plantuml/svg/~1${plantumlEncoder.encode(text)}"/>`;
        } catch (error) {
          e.className = "vditor-reset--error";
          e.innerHTML = `plantuml render error: <br>${error}`;
        }
      });
    });
  };

  // vditor-master/src/ts/markdown/wavedromRender.ts
  var wavedromIndex = 0;
  var wavedromRender = (element = document, cdn = Constants.CDN) => {
    const wavedromElements = wavedromRenderAdapter.getElements(element);
    if (wavedromElements.length === 0) {
      return;
    }
    addScript(`${cdn}/dist/js/wavedrom/wavedrom.min.js?v=3.6.2`, "vditorWavedromScript").then(() => {
      wavedromElements.forEach(async (item) => {
        if (item.parentElement.classList.contains("vditor-wysiwyg__pre") || item.parentElement.classList.contains("vditor-ir__marker--pre")) {
          return;
        }
        const code = wavedromRenderAdapter.getCode(item);
        if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
          return;
        }
        let renderElement = item;
        if (item.tagName === "CODE") {
          renderElement = document.createElement("div");
          Array.from(item.attributes).forEach((attribute) => {
            renderElement.setAttribute(attribute.name, attribute.value);
          });
          item.replaceWith(renderElement);
        }
        try {
          const source = await looseJsonParse(code);
          wavedrom.renderWaveElement(wavedromIndex, source, renderElement, wavedrom.waveSkin, false);
          wavedromIndex++;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const lineBreak = document.createElement("br");
          renderElement.replaceChildren(
            document.createTextNode("wavedrom render error:"),
            lineBreak,
            document.createTextNode(message)
          );
          renderElement.classList.add("vditor-reset--error");
        }
        renderElement.setAttribute("data-processed", "true");
      });
    });
  };

  // vditor-master/src/ts/ui/setContentTheme.ts
  var setContentTheme = (contentTheme, path) => {
    if (!contentTheme || !path) {
      return;
    }
    const vditorContentTheme = document.getElementById("vditorContentTheme");
    const cssPath = `${path}/${contentTheme}.css`;
    if (!vditorContentTheme) {
      addStyle(cssPath, "vditorContentTheme");
    } else if (vditorContentTheme.getAttribute("href") !== cssPath) {
      vditorContentTheme.remove();
      addStyle(cssPath, "vditorContentTheme");
    }
  };

  // vditor-master/src/ts/util/hasClosest.ts
  var hasTopClosestByClassName = (element, className) => {
    let closest = hasClosestByClassName(element, className);
    let parentClosest = false;
    let findTop = false;
    while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
      parentClosest = hasClosestByClassName(closest.parentElement, className);
      if (parentClosest) {
        closest = parentClosest;
      } else {
        findTop = true;
      }
    }
    return closest || false;
  };
  var hasTopClosestByTag = (element, nodeName) => {
    let closest = hasClosestByTag(element, nodeName);
    let parentClosest = false;
    let findTop = false;
    while (closest && !closest.classList.contains("vditor-reset") && !findTop) {
      parentClosest = hasClosestByTag(closest.parentElement, nodeName);
      if (parentClosest) {
        closest = parentClosest;
      } else {
        findTop = true;
      }
    }
    return closest || false;
  };
  var getTopList = (element) => {
    const topUlElement = hasTopClosestByTag(element, "UL");
    const topOlElement = hasTopClosestByTag(element, "OL");
    let topListElement = topUlElement;
    if (topOlElement && (!topUlElement || topUlElement && topOlElement.contains(topUlElement))) {
      topListElement = topOlElement;
    }
    return topListElement;
  };
  var hasClosestByAttribute = (element, attr, value) => {
    if (!element) {
      return false;
    }
    if (element.nodeType === 3) {
      element = element.parentElement;
    }
    let e = element;
    let isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
      if (e.getAttribute(attr) === value) {
        isClosest = true;
      } else {
        e = e.parentElement;
      }
    }
    return isClosest && e;
  };
  var hasClosestBlock = (element) => {
    if (!element) {
      return false;
    }
    if (element.nodeType === 3) {
      element = element.parentElement;
    }
    let e = element;
    let isClosest = false;
    const blockElement = hasClosestByAttribute(element, "data-block", "0");
    if (blockElement) {
      return blockElement;
    }
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
      if (e.tagName === "H1" || e.tagName === "H2" || e.tagName === "H3" || e.tagName === "H4" || e.tagName === "H5" || e.tagName === "H6" || e.tagName === "P" || e.tagName === "BLOCKQUOTE" || e.tagName === "OL" || e.tagName === "UL") {
        isClosest = true;
      } else {
        e = e.parentElement;
      }
    }
    return isClosest && e;
  };
  var hasClosestByMatchTag = (element, nodeName) => {
    if (!element) {
      return false;
    }
    if (element.nodeType === 3) {
      element = element.parentElement;
    }
    let e = element;
    let isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
      if (e.nodeName === nodeName) {
        isClosest = true;
      } else {
        e = e.parentElement;
      }
    }
    return isClosest && e;
  };
  var hasClosestByClassName = (element, className) => {
    if (!element) {
      return false;
    }
    if (element.nodeType === 3) {
      element = element.parentElement;
    }
    let e = element;
    let isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-reset")) {
      if (e.classList.contains(className)) {
        isClosest = true;
      } else {
        e = e.parentElement;
      }
    }
    return isClosest && e;
  };
  var getLastNode = (node) => {
    while (node && node.lastChild) {
      node = node.lastChild;
    }
    return node;
  };

  // vditor-master/src/ts/util/merge.ts
  var merge = (...options) => {
    const target = {};
    const merger = (obj) => {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
            target[prop] = merge(target[prop], obj[prop]);
          } else {
            target[prop] = obj[prop];
          }
        }
      }
    };
    for (let i = 0; i < options.length; i++) {
      merger(options[i]);
    }
    return target;
  };

  // vditor-master/src/ts/markdown/anchorRender.ts
  var anchorRender = (type) => {
    document.querySelectorAll(".vditor-anchor").forEach((anchor) => {
      if (type === 1) {
        anchor.classList.add("vditor-anchor--left");
      }
      anchor.onclick = () => {
        const id = anchor.getAttribute("href").substr(1);
        const top = document.getElementById("vditorAnchor-" + id).offsetTop;
        document.querySelector("html").scrollTop = top;
      };
    });
    window.onhashchange = () => {
      const element = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
      if (element) {
        document.querySelector("html").scrollTop = element.offsetTop;
      }
    };
  };

  // vditor-master/src/ts/markdown/imageCaptionRender.ts
  var getContentNodes = (element, ignoreIRMarkers = false) => {
    return Array.from(element.childNodes).filter((node) => {
      if (node.nodeType === Node.COMMENT_NODE) {
        return false;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.replace(/\u200b/g, "").trim() !== "";
      }
      if (!(node instanceof HTMLElement)) {
        return true;
      }
      if (node.tagName === "WBR") {
        return false;
      }
      return !ignoreIRMarkers || !node.classList.contains("vditor-ir__marker");
    });
  };
  var getWYSIWYGImage = (paragraph) => {
    const nodes = getContentNodes(paragraph);
    if (nodes.length !== 1 || !(nodes[0] instanceof HTMLElement)) {
      return void 0;
    }
    const container = nodes[0];
    if (container instanceof HTMLImageElement) {
      return {
        container,
        image: container
      };
    }
    if (container instanceof HTMLAnchorElement) {
      const linkNodes = getContentNodes(container);
      if (linkNodes.length === 1 && linkNodes[0] instanceof HTMLImageElement) {
        return {
          container,
          image: linkNodes[0]
        };
      }
    }
    return void 0;
  };
  var getIRImage = (paragraph) => {
    const nodes = getContentNodes(paragraph);
    if (nodes.length !== 1 || !(nodes[0] instanceof HTMLElement)) {
      return void 0;
    }
    let imageNode = nodes[0];
    if (imageNode.getAttribute("data-type") === "a") {
      const linkNodes = getContentNodes(imageNode, true);
      if (linkNodes.length !== 1 || !(linkNodes[0] instanceof HTMLElement)) {
        return void 0;
      }
      imageNode = linkNodes[0];
    }
    if (imageNode.getAttribute("data-type") !== "img") {
      return void 0;
    }
    const image = imageNode.querySelector(":scope > img");
    const titleMarker = imageNode.querySelector(":scope > .vditor-ir__marker--title");
    if (!(image instanceof HTMLImageElement) || !titleMarker) {
      return void 0;
    }
    const markerText = titleMarker.textContent.trim();
    const closeMarker = markerText[0] === "(" ? ")" : markerText[0];
    if (markerText.length < 2 || !['"', "'", "("].includes(markerText[0]) || markerText[markerText.length - 1] !== closeMarker) {
      return void 0;
    }
    return {
      caption: markerText.slice(1, -1).trim(),
      container: imageNode,
      image
    };
  };
  var unwrapWYSIWYGCaptions = (element) => {
    element.querySelectorAll("span.vditor-image[data-image-caption]").forEach((wrapper) => {
      while (wrapper.firstChild) {
        wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
      }
      wrapper.remove();
    });
  };
  var resetIRCaptions = (element) => {
    element.querySelectorAll(".vditor-image[data-image-caption]").forEach((imageNode) => {
      imageNode.classList.remove("vditor-image");
      imageNode.removeAttribute("data-image-caption");
    });
  };
  var renderPreviewCaptions = (element) => {
    element.querySelectorAll("p").forEach((paragraph) => {
      const imageData = getWYSIWYGImage(paragraph);
      const caption = imageData?.image.getAttribute("title")?.trim();
      if (!imageData || !caption) {
        return;
      }
      const figure = document.createElement("figure");
      Array.from(paragraph.attributes).forEach((attribute) => {
        figure.setAttribute(attribute.name, attribute.value);
      });
      figure.classList.add("vditor-image");
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = caption;
      figure.append(imageData.container, figcaption);
      paragraph.replaceWith(figure);
    });
  };
  var renderWYSIWYGCaptions = (element) => {
    element.querySelectorAll("p").forEach((paragraph) => {
      const imageData = getWYSIWYGImage(paragraph);
      const caption = imageData?.image.getAttribute("title")?.trim();
      if (!imageData || !caption) {
        return;
      }
      const wrapper = document.createElement("span");
      wrapper.className = "vditor-image";
      wrapper.setAttribute("data-image-caption", caption);
      imageData.container.replaceWith(wrapper);
      wrapper.append(imageData.container);
    });
  };
  var renderIRCaptions = (element) => {
    element.querySelectorAll("p").forEach((paragraph) => {
      const imageData = getIRImage(paragraph);
      if (!imageData?.caption) {
        return;
      }
      imageData.container.classList.add("vditor-image");
      imageData.container.setAttribute("data-image-caption", imageData.caption);
    });
  };
  var renderImageCaptions = (element, mode, enable) => {
    if (mode === "wysiwyg") {
      unwrapWYSIWYGCaptions(element);
    } else if (mode === "ir") {
      resetIRCaptions(element);
    }
    if (!enable) {
      return;
    }
    if (mode === "preview") {
      renderPreviewCaptions(element);
    } else if (mode === "wysiwyg") {
      renderWYSIWYGCaptions(element);
    } else {
      renderIRCaptions(element);
    }
  };
  var renderImageCaptionHTML = (html, enable) => {
    if (!enable) {
      return html;
    }
    const container = document.createElement("div");
    container.innerHTML = html;
    renderImageCaptions(container, "preview", true);
    return container.innerHTML;
  };

  // vditor-master/src/ts/markdown/setLute.ts
  var setLute = (options) => {
    const lute = Lute.New();
    lute.PutEmojis(options.emojis);
    lute.SetEmojiSite(options.emojiSite);
    lute.SetHeadingAnchor(options.headingAnchor);
    lute.SetInlineMathAllowDigitAfterOpenMarker(options.inlineMathDigit);
    lute.SetAutoSpace(options.autoSpace);
    lute.SetCallout(options.callout);
    lute.SetInlineMath(options.inlineMath);
    lute.SetToC(options.toc);
    lute.SetFootnotes(options.footnotes);
    lute.SetFixTermTypo(options.fixTermTypo);
    lute.SetVditorCodeBlockPreview(options.codeBlockPreview);
    lute.SetVditorMathBlockPreview(options.mathBlockPreview);
    lute.SetSanitize(options.sanitize);
    lute.SetChineseParagraphBeginningSpace(options.paragraphBeginningSpace);
    lute.SetRenderListStyle(options.listStyle);
    lute.SetLinkBase(options.linkBase);
    lute.SetLinkPrefix(options.linkPrefix);
    lute.SetMark(options.mark);
    lute.SetGFMAutoLink(options.gfmAutoLink);
    if (options.lazyLoadImage) {
      lute.SetImageLazyLoading(options.lazyLoadImage);
    }
    lute.SetSup(options.sup);
    lute.SetSub(options.sub);
    return lute;
  };

  // vditor-master/src/ts/util/compatibility.ts
  var isSafari = () => {
    return navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1;
  };
  var isFirefox = () => {
    return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  };
  var accessLocalStorage = () => {
    try {
      return typeof localStorage !== "undefined";
    } catch (e) {
      return false;
    }
  };
  var getEventName = () => {
    if (navigator.userAgent.indexOf("iPhone") > -1) {
      return "touchstart";
    } else {
      return "click";
    }
  };
  var isCtrl = (event) => {
    if (navigator.platform.toUpperCase().indexOf("MAC") >= 0) {
      if (event.metaKey && !event.ctrlKey) {
        return true;
      }
      return false;
    } else {
      if (!event.metaKey && event.ctrlKey) {
        return true;
      }
      return false;
    }
  };
  var updateHotkeyTip = (hotkey) => {
    if (/Mac/.test(navigator.platform) || navigator.platform === "iPhone") {
      if (hotkey.indexOf("\u21E7") > -1 && isFirefox()) {
        hotkey = hotkey.replace(";", ":").replace("=", "+").replace("-", "_");
      }
    } else {
      if (hotkey.startsWith("\u2318")) {
        hotkey = hotkey.replace("\u2318", "\u2318+");
      } else if (hotkey.startsWith("\u2325") && hotkey.substr(1, 1) !== "\u2318") {
        hotkey = hotkey.replace("\u2325", "\u2325+");
      } else {
        hotkey = hotkey.replace("\u21E7\u2318", "\u2318+\u21E7+").replace("\u2325\u2318", "\u2325+\u2318+");
      }
      hotkey = hotkey.replace("\u2318", "Ctrl").replace("\u21E7", "Shift").replace("\u2325", "Alt");
      if (hotkey.indexOf("Shift") > -1) {
        hotkey = hotkey.replace(";", ":").replace("=", "+").replace("-", "_");
      }
    }
    return hotkey;
  };
  var isChrome = () => {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  };

  // vditor-master/src/ts/util/selection.ts
  var getEditorRange = (vditor) => {
    if (vditor.currentMode === "sv") {
      throw new Error("SV mode uses textarea selection");
    }
    let range;
    const element = vditor[vditor.currentMode].element;
    if (getSelection().rangeCount > 0) {
      range = getSelection().getRangeAt(0);
      if (element.isEqualNode(range.startContainer) || element.contains(range.startContainer)) {
        return range;
      }
    }
    const lastRange = vditor.currentMode === "ir" ? vditor.ir.range : vditor.wysiwyg.range;
    if (lastRange) {
      return lastRange;
    }
    element.focus();
    range = element.ownerDocument.createRange();
    range.setStart(element, 0);
    range.collapse(true);
    return range;
  };
  var getCursorPosition = (editor2) => {
    const range = window.getSelection().getRangeAt(0);
    if (!editor2.contains(range.startContainer) && !hasClosestByClassName(range.startContainer, "vditor-panel--none")) {
      return {
        left: 0,
        top: 0
      };
    }
    const parentRect = editor2.parentElement.getBoundingClientRect();
    let cursorRect;
    if (range.getClientRects().length === 0) {
      if (range.startContainer.nodeType === 3) {
        const parent = range.startContainer.parentElement;
        if (parent && parent.getClientRects().length > 0) {
          cursorRect = parent.getClientRects()[0];
        } else {
          return {
            left: 0,
            top: 0
          };
        }
      } else {
        const children = range.startContainer.children;
        if (children[range.startOffset] && children[range.startOffset].getClientRects().length > 0) {
          cursorRect = children[range.startOffset].getClientRects()[0];
        } else if (range.startContainer.childNodes.length > 0) {
          const cloneRange = range.cloneRange();
          range.selectNode(range.startContainer.childNodes[Math.max(0, range.startOffset - 1)]);
          cursorRect = range.getClientRects()[0];
          range.setEnd(cloneRange.endContainer, cloneRange.endOffset);
          range.setStart(cloneRange.startContainer, cloneRange.startOffset);
        } else {
          cursorRect = range.startContainer.getClientRects()[0];
        }
        if (!cursorRect) {
          let parentElement = range.startContainer.childNodes[range.startOffset];
          while (!parentElement.getClientRects || parentElement.getClientRects && parentElement.getClientRects().length === 0) {
            parentElement = parentElement.parentElement;
          }
          cursorRect = parentElement.getClientRects()[0];
        }
      }
    } else {
      cursorRect = range.getClientRects()[0];
    }
    return {
      left: cursorRect.left - parentRect.left,
      top: cursorRect.top - parentRect.top
    };
  };
  var selectIsEditor = (editor2, range) => {
    if (!range) {
      if (getSelection().rangeCount === 0) {
        return false;
      } else {
        range = getSelection().getRangeAt(0);
      }
    }
    const container = range.commonAncestorContainer;
    return editor2.isEqualNode(container) || editor2.contains(container);
  };
  var setSelectionFocus = (range) => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };
  var getSelectPosition = (selectElement, editorElement, range) => {
    const position = {
      end: 0,
      start: 0
    };
    if (!range) {
      if (getSelection().rangeCount === 0) {
        return position;
      }
      range = window.getSelection().getRangeAt(0);
    }
    if (selectIsEditor(editorElement, range)) {
      const preSelectionRange = range.cloneRange();
      if (selectElement.childNodes[0] && selectElement.childNodes[0].childNodes[0]) {
        preSelectionRange.setStart(selectElement.childNodes[0].childNodes[0], 0);
      } else {
        preSelectionRange.selectNodeContents(selectElement);
      }
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      position.start = preSelectionRange.toString().length;
      position.end = position.start + range.toString().length;
    }
    return position;
  };
  var setSelectionByPosition = (start, end, editor2) => {
    let charIndex = 0;
    let line = 0;
    let pNode = editor2.childNodes[line];
    let foundStart = false;
    let stop = false;
    start = Math.max(0, start);
    end = Math.max(0, end);
    const range = editor2.ownerDocument.createRange();
    range.setStart(pNode || editor2, 0);
    range.collapse(true);
    while (!stop && pNode) {
      const nextCharIndex = charIndex + pNode.textContent.length;
      if (!foundStart && start >= charIndex && start <= nextCharIndex) {
        if (start === 0) {
          range.setStart(pNode, 0);
        } else {
          if (pNode.childNodes[0].nodeType === 3) {
            range.setStart(pNode.childNodes[0], start - charIndex);
          } else if (pNode.nextSibling) {
            range.setStartBefore(pNode.nextSibling);
          } else {
            range.setStartAfter(pNode);
          }
        }
        foundStart = true;
        if (start === end) {
          stop = true;
          break;
        }
      }
      if (foundStart && end >= charIndex && end <= nextCharIndex) {
        if (end === 0) {
          range.setEnd(pNode, 0);
        } else {
          if (pNode.childNodes[0].nodeType === 3) {
            range.setEnd(pNode.childNodes[0], end - charIndex);
          } else if (pNode.nextSibling) {
            range.setEndBefore(pNode.nextSibling);
          } else {
            range.setEndAfter(pNode);
          }
        }
        stop = true;
      }
      charIndex = nextCharIndex;
      pNode = editor2.childNodes[++line];
    }
    if (!stop && editor2.childNodes[line - 1]) {
      range.setStartBefore(editor2.childNodes[line - 1]);
    }
    setSelectionFocus(range);
    return range;
  };
  var setRangeByWbr = (element, range) => {
    const wbrElement = element.querySelector("wbr");
    if (!wbrElement) {
      return;
    }
    if (!wbrElement.previousElementSibling) {
      if (wbrElement.previousSibling) {
        range.setStart(wbrElement.previousSibling, wbrElement.previousSibling.textContent.length);
      } else if (wbrElement.nextSibling) {
        if (wbrElement.nextSibling.nodeType === 3) {
          range.setStart(wbrElement.nextSibling, 0);
        } else {
          range.setStartBefore(wbrElement.nextSibling);
        }
      } else {
        range.setStart(wbrElement.parentElement, 0);
      }
    } else {
      if (wbrElement.previousElementSibling.isSameNode(wbrElement.previousSibling)) {
        if (wbrElement.previousElementSibling.lastChild) {
          range.setStartBefore(wbrElement);
          range.collapse(true);
          setSelectionFocus(range);
          if (isChrome() && (wbrElement.previousElementSibling.tagName === "EM" || wbrElement.previousElementSibling.tagName === "STRONG" || wbrElement.previousElementSibling.tagName === "S")) {
            range.insertNode(document.createTextNode(Constants.ZWSP));
            range.collapse(false);
          }
          wbrElement.remove();
          return;
        } else {
          range.setStartAfter(wbrElement.previousElementSibling);
        }
      } else {
        range.setStart(wbrElement.previousSibling, wbrElement.previousSibling.textContent.length);
      }
    }
    range.collapse(true);
    wbrElement.remove();
    setSelectionFocus(range);
  };
  var insertHTML = (html, vditor) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const tempBlockElement = tempElement.querySelectorAll("p");
    if (tempBlockElement.length === 1 && !tempBlockElement[0].previousSibling && !tempBlockElement[0].nextSibling && vditor[vditor.currentMode].element.children.length > 0 && tempElement.firstElementChild.tagName === "P") {
      html = tempBlockElement[0].innerHTML.trim();
    }
    const pasteElement = document.createElement("div");
    pasteElement.innerHTML = html;
    const range = getEditorRange(vditor);
    if (range.toString() !== "") {
      if (vditor.currentMode === "ir") {
        vditor.ir.preventInput = true;
      } else if (vditor.currentMode === "wysiwyg") {
        vditor.wysiwyg.preventInput = true;
      }
      document.execCommand("delete", false, "");
    }
    if (pasteElement.firstElementChild && pasteElement.firstElementChild.getAttribute("data-block") === "0") {
      pasteElement.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
      const blockElement = hasClosestBlock(range.startContainer);
      if (!blockElement) {
        vditor[vditor.currentMode].element.insertAdjacentHTML("beforeend", pasteElement.innerHTML);
      } else {
        const liElement = hasClosestByMatchTag(range.startContainer, "LI");
        if (liElement && pasteElement.firstElementChild.tagName === "UL") {
          liElement.insertAdjacentHTML("afterend", pasteElement.firstElementChild.innerHTML);
        } else {
          blockElement.insertAdjacentHTML("afterend", pasteElement.innerHTML);
        }
      }
      setRangeByWbr(vditor[vditor.currentMode].element, range);
    } else {
      const pasteTemplate = document.createElement("template");
      pasteTemplate.innerHTML = html;
      range.insertNode(pasteTemplate.content.cloneNode(true));
      range.collapse(false);
      setSelectionFocus(range);
    }
  };

  // vditor-master/src/ts/markdown/speechRender.ts
  var speechRender = (element, lang = "zh_CN") => {
    if (typeof speechSynthesis === "undefined" || typeof SpeechSynthesisUtterance === "undefined") {
      return;
    }
    const getVoice = () => {
      const voices = speechSynthesis.getVoices();
      let currentVoice;
      let defaultVoice;
      voices.forEach((item) => {
        if (item.lang === lang.replace("_", "-")) {
          currentVoice = item;
        }
        if (item.default) {
          defaultVoice = item;
        }
      });
      if (!currentVoice) {
        currentVoice = defaultVoice;
      }
      return currentVoice;
    };
    let playSVG = '<svg><use xlink:href="#vditor-icon-play"></use></svg>';
    let pauseSVG = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
    if (!document.getElementById("vditorIconScript")) {
      playSVG = '<svg viewBox="0 0 32 32"><path d="M3.436 0l25.128 16-25.128 16v-32z"></path></svg>';
      pauseSVG = '<svg viewBox="0 0 32 32"><path d="M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z"></path></svg>';
    }
    let speechDom = document.querySelector(".vditor-speech");
    if (!speechDom) {
      speechDom = document.createElement("button");
      speechDom.className = "vditor-speech";
      element.insertAdjacentElement("beforeend", speechDom);
      if (speechSynthesis.onvoiceschanged !== void 0) {
        speechSynthesis.onvoiceschanged = getVoice;
      }
    }
    const voice = getVoice();
    const utterThis = new SpeechSynthesisUtterance();
    utterThis.voice = voice;
    utterThis.onend = utterThis.onerror = () => {
      speechDom.style.display = "none";
      speechSynthesis.cancel();
      speechDom.classList.remove("vditor-speech--current");
      speechDom.innerHTML = playSVG;
    };
    element.addEventListener(window.ontouchstart !== void 0 ? "touchend" : "click", (event) => {
      const target = event.target;
      if (target.classList.contains("vditor-speech") || target.parentElement.classList.contains("vditor-speech")) {
        if (!speechDom.classList.contains("vditor-speech--current")) {
          utterThis.text = speechDom.getAttribute("data-text");
          speechSynthesis.speak(utterThis);
          speechDom.classList.add("vditor-speech--current");
          speechDom.innerHTML = pauseSVG;
        } else {
          if (speechSynthesis.speaking) {
            if (speechSynthesis.paused) {
              speechSynthesis.resume();
              speechDom.innerHTML = pauseSVG;
            } else {
              speechSynthesis.pause();
              speechDom.innerHTML = playSVG;
            }
          }
        }
        setSelectionFocus(window.vditorSpeechRange);
        element.focus();
        return;
      }
      speechDom.style.display = "none";
      speechSynthesis.cancel();
      speechDom.classList.remove("vditor-speech--current");
      speechDom.innerHTML = playSVG;
      if (getSelection().rangeCount === 0) {
        return;
      }
      const range = getSelection().getRangeAt(0);
      const text = range.toString().trim();
      if (!text) {
        return;
      }
      window.vditorSpeechRange = range.cloneRange();
      const rect = range.getBoundingClientRect();
      speechDom.innerHTML = playSVG;
      speechDom.style.display = "block";
      speechDom.style.top = rect.top + rect.height + document.querySelector("html").scrollTop - 20 + "px";
      if (window.ontouchstart !== void 0) {
        speechDom.style.left = event.changedTouches[event.changedTouches.length - 1].pageX + 2 + "px";
      } else {
        speechDom.style.left = event.clientX + 2 + "px";
      }
      speechDom.setAttribute("data-text", text);
    });
  };

  // vditor-master/src/ts/markdown/previewRender.ts
  var mergeOptions = (options) => {
    const defaultOption = {
      anchor: 0,
      cdn: Constants.CDN,
      customEmoji: {},
      emojiPath: `${Constants.CDN}/dist/images/emoji`,
      hljs: Constants.HLJS_OPTIONS,
      icon: "ant",
      lang: "zh_CN",
      markdown: Constants.MARKDOWN_OPTIONS,
      math: Constants.MATH_OPTIONS,
      mode: "light",
      speech: {
        enable: false
      },
      render: {
        media: {
          enable: true
        }
      },
      theme: Constants.THEME_OPTIONS
    };
    if (options.cdn) {
      if (!options.theme?.path) {
        defaultOption.theme.path = `${options.cdn}/dist/css/content-theme`;
      }
      if (!options.emojiPath) {
        defaultOption.emojiPath = `${options.cdn}/dist/images/emoji`;
      }
    }
    return merge(defaultOption, options);
  };
  var md2html = (mdText, options) => {
    const mergedOptions = mergeOptions(options);
    return addScript(`${mergedOptions.cdn}/dist/js/lute/lute.min.js`, "vditorLuteScript").then(() => {
      const lute = setLute({
        autoSpace: mergedOptions.markdown.autoSpace,
        callout: mergedOptions.markdown.callout,
        inlineMath: mergedOptions.markdown.inlineMath,
        gfmAutoLink: mergedOptions.markdown.gfmAutoLink,
        codeBlockPreview: mergedOptions.markdown.codeBlockPreview,
        emojiSite: mergedOptions.emojiPath,
        emojis: mergedOptions.customEmoji,
        fixTermTypo: mergedOptions.markdown.fixTermTypo,
        footnotes: mergedOptions.markdown.footnotes,
        headingAnchor: mergedOptions.anchor !== 0,
        inlineMathDigit: mergedOptions.math.inlineDigit,
        lazyLoadImage: mergedOptions.lazyLoadImage,
        linkBase: mergedOptions.markdown.linkBase,
        linkPrefix: mergedOptions.markdown.linkPrefix,
        listStyle: mergedOptions.markdown.listStyle,
        mark: mergedOptions.markdown.mark,
        mathBlockPreview: mergedOptions.markdown.mathBlockPreview,
        paragraphBeginningSpace: mergedOptions.markdown.paragraphBeginningSpace,
        sanitize: mergedOptions.markdown.sanitize,
        sub: mergedOptions.markdown.sub,
        sup: mergedOptions.markdown.sup,
        toc: mergedOptions.markdown.toc
      });
      if (options?.renderers) {
        lute.SetJSRenderers({
          renderers: {
            Md2HTML: options.renderers
          }
        });
      }
      lute.SetHeadingID(true);
      return renderImageCaptionHTML(lute.Md2HTML(mdText), mergedOptions.markdown.imageCaption);
    });
  };
  var previewRender = async (previewElement, markdown, options) => {
    const mergedOptions = mergeOptions(options);
    let html = await md2html(markdown, mergedOptions);
    if (mergedOptions.transform) {
      html = mergedOptions.transform(html);
    }
    previewElement.innerHTML = html;
    previewElement.classList.add("vditor-reset");
    if (!mergedOptions.i18n) {
      if (!["de_DE", "en_US", "es_ES", "fr_FR", "ja_JP", "ko_KR", "pt_BR", "ru_RU", "sv_SE", "vi_VN", "zh_CN", "zh_TW"].includes(mergedOptions.lang)) {
        throw new Error(
          "options.lang error, see https://ld246.com/article/1549638745630#options"
        );
      } else {
        const i18nScriptPrefix = "vditorI18nScript";
        const i18nScriptID = i18nScriptPrefix + mergedOptions.lang;
        document.querySelectorAll(`head script[id^="${i18nScriptPrefix}"]`).forEach((el) => {
          if (el.id !== i18nScriptID) {
            document.head.removeChild(el);
          }
        });
        await addScript(`${mergedOptions.cdn}/dist/js/i18n/${mergedOptions.lang}.js`, i18nScriptID);
      }
    } else {
      window.VditorI18n = mergedOptions.i18n;
    }
    if (mergedOptions.icon) {
      await addScript(`${mergedOptions.cdn}/dist/js/icons/${mergedOptions.icon}.js`, "vditorIconScript");
    }
    setContentTheme(mergedOptions.theme.current, mergedOptions.theme.path);
    if (mergedOptions.anchor === 1) {
      previewElement.classList.add("vditor-reset--anchor");
    }
    codeRender(previewElement, mergedOptions.hljs);
    highlightRender(mergedOptions.hljs, previewElement, mergedOptions.cdn);
    mathRender(previewElement, {
      cdn: mergedOptions.cdn,
      math: mergedOptions.math
    });
    mermaidRender(previewElement, mergedOptions.cdn, mergedOptions.mode);
    SMILESRender(previewElement, mergedOptions.cdn, mergedOptions.mode);
    markmapRender(previewElement, mergedOptions.cdn);
    flowchartRender(previewElement, mergedOptions.cdn);
    graphvizRender(previewElement, mergedOptions.cdn);
    wavedromRender(previewElement, mergedOptions.cdn);
    chartRender(previewElement, mergedOptions.cdn, mergedOptions.mode);
    mindmapRender(previewElement, mergedOptions.cdn, mergedOptions.mode);
    plantumlRender(previewElement, mergedOptions.cdn);
    abcRender(previewElement, mergedOptions.cdn);
    if (mergedOptions.render.media.enable) {
      mediaRender(previewElement);
    }
    if (mergedOptions.speech.enable) {
      speechRender(previewElement);
    }
    if (mergedOptions.anchor !== 0) {
      anchorRender(mergedOptions.anchor);
    }
    if (mergedOptions.after) {
      mergedOptions.after();
    }
    if (mergedOptions.lazyLoadImage) {
      lazyLoadImageRender(previewElement);
    }
    previewElement.addEventListener("click", (event) => {
      const spanElement = hasClosestByMatchTag(event.target, "SPAN");
      if (spanElement && hasClosestByClassName(spanElement, "vditor-toc")) {
        const headingElement = previewElement.querySelector("#" + spanElement.getAttribute("data-target-id"));
        if (headingElement) {
          window.scrollTo(window.scrollX, headingElement.offsetTop);
        }
        return;
      }
    });
  };

  // vditor-master/src/ts/preview/image.ts
  var previewImage = (oldImgElement, lang = "zh_CN", theme = "classic") => {
    const oldImgRect = oldImgElement.getBoundingClientRect();
    const height = 36;
    document.body.insertAdjacentHTML("beforeend", `<div class="vditor vditor-img${theme === "dark" ? " vditor--dark" : ""}">
    <div class="vditor-img__bar">
      <span class="vditor-img__btn" data-deg="0">
        <svg><use xlink:href="#vditor-icon-redo"></use></svg>
        ${window.VditorI18n.spin}
      </span>
      <span class="vditor-img__btn"  onclick="this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''">
        X &nbsp;${window.VditorI18n.close}
      </span>
    </div>
    <div class="vditor-img__img" onclick="this.parentElement.outerHTML = '';document.body.style.overflow = ''">
      <img style="width: ${oldImgElement.width}px;height:${oldImgElement.height}px;transform: translate3d(${oldImgRect.left}px, ${oldImgRect.top - height}px, 0)" src="${oldImgElement.getAttribute("src")}">
    </div>
</div>`);
    document.body.style.overflow = "hidden";
    const imgElement = document.querySelector(".vditor-img img");
    const translate3d = `translate3d(${Math.max(0, window.innerWidth - oldImgElement.naturalWidth) / 2}px, ${Math.max(0, window.innerHeight - height - oldImgElement.naturalHeight) / 2}px, 0)`;
    setTimeout(() => {
      imgElement.setAttribute("style", `transition: transform .3s ease-in-out;transform: ${translate3d}`);
      setTimeout(() => {
        imgElement.parentElement.scrollTo(
          (imgElement.parentElement.scrollWidth - imgElement.parentElement.clientWidth) / 2,
          (imgElement.parentElement.scrollHeight - imgElement.parentElement.clientHeight) / 2
        );
      }, 400);
    });
    const btnElement = document.querySelector(".vditor-img__btn");
    btnElement.addEventListener("click", () => {
      const deg = parseInt(btnElement.getAttribute("data-deg"), 10) + 90;
      if (deg / 90 % 2 === 1 && oldImgElement.naturalWidth > imgElement.parentElement.clientHeight) {
        imgElement.style.transform = `translate3d(${Math.max(0, window.innerWidth - oldImgElement.naturalWidth) / 2}px, ${oldImgElement.naturalWidth / 2 - oldImgElement.naturalHeight / 2}px, 0) rotateZ(${deg}deg)`;
      } else {
        imgElement.style.transform = `${translate3d} rotateZ(${deg}deg)`;
      }
      btnElement.setAttribute("data-deg", deg.toString());
      setTimeout(() => {
        imgElement.parentElement.scrollTo(
          (imgElement.parentElement.scrollWidth - imgElement.parentElement.clientWidth) / 2,
          (imgElement.parentElement.scrollHeight - imgElement.parentElement.clientHeight) / 2
        );
      }, 400);
    });
  };

  // vditor-master/src/ts/ui/setCodeTheme.ts
  var setCodeTheme = (codeTheme, cdn = Constants.CDN) => {
    if (!Constants.CODE_THEME.includes(codeTheme)) {
      codeTheme = "github";
    }
    const vditorHljsStyle = document.getElementById("vditorHljsStyle");
    const href = `${cdn}/dist/js/highlight.js/styles/${codeTheme}.min.css`;
    if (!vditorHljsStyle) {
      addStyle(href, "vditorHljsStyle");
    } else if (vditorHljsStyle.getAttribute("href") !== href) {
      vditorHljsStyle.remove();
      addStyle(href, "vditorHljsStyle");
    }
  };

  // vditor-master/src/method.ts
  var Vditor = class {
    static {
      /** 点击图片放大 */
      this.adapterRender = adapterRender_exports;
    }
    static {
      /** 点击图片放大 */
      this.previewImage = previewImage;
    }
    static {
      /** 为 element 中的代码块添加复制按钮 */
      this.codeRender = codeRender;
    }
    static {
      /** 对 graphviz 进行渲染 */
      this.graphvizRender = graphvizRender;
    }
    static {
      /** 对数字波形图进行渲染 */
      this.wavedromRender = wavedromRender;
    }
    static {
      /** 为 element 中的代码块进行高亮渲染 */
      this.highlightRender = highlightRender;
    }
    static {
      /** 对数学公式进行渲染 */
      this.mathRender = mathRender;
    }
    static {
      /** 流程图/时序图/甘特图渲染 */
      this.mermaidRender = mermaidRender;
    }
    static {
      /** 化学物质结构渲染 */
      this.SMILESRender = SMILESRender;
    }
    static {
      /** 支持 markdown 的思维导图 */
      this.markmapRender = markmapRender;
    }
    static {
      /** flowchart.js 渲染 */
      this.flowchartRender = flowchartRender;
    }
    static {
      /** 图表渲染 */
      this.chartRender = chartRender;
    }
    static {
      /** 五线谱渲染 */
      this.abcRender = abcRender;
    }
    static {
      /** 脑图渲染 */
      this.mindmapRender = mindmapRender;
    }
    static {
      /** plantuml渲染 */
      this.plantumlRender = plantumlRender;
    }
    static {
      /** 大纲渲染 */
      this.outlineRender = outlineRender;
    }
    static {
      /** 为[特定链接](https://github.com/Vanessa219/vditor/issues/7)分别渲染为视频、音频、嵌入的 iframe */
      this.mediaRender = mediaRender;
    }
    static {
      /** 对选中的文字进行阅读 */
      this.speechRender = speechRender;
    }
    static {
      /** 对图片进行懒加载 */
      this.lazyLoadImageRender = lazyLoadImageRender;
    }
    static {
      /** Markdown 文本转换为 HTML，该方法需使用[异步编程](https://ld246.com/article/1546828434083?r=Vaness) */
      this.md2html = md2html;
    }
    static {
      /** 页面 Markdown 文章渲染 */
      this.preview = previewRender;
    }
    static {
      /** 设置代码主题 */
      this.setCodeTheme = setCodeTheme;
    }
    static {
      /** 设置内容主题 */
      this.setContentTheme = setContentTheme;
    }
  };
  var method_default = Vditor;

  // vditor-master/src/ts/markdown/getMarkdown.ts
  var getMarkdown = (vditor) => {
    if (vditor.currentMode === "sv") {
      return code160to32(`${vditor.sv.element.value}
`.replace(/\n\n$/, "\n"));
    } else if (vditor.currentMode === "wysiwyg") {
      return code160to32(vditor.lute.VditorDOM2Md(vditor.wysiwyg.element.innerHTML));
    } else if (vditor.currentMode === "ir") {
      return code160to32(vditor.lute.VditorIRDOM2Md(vditor.ir.element.innerHTML));
    }
    return "";
  };

  // vditor-master/src/ts/devtools/index.ts
  var DevTools = class {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "vditor-devtools";
      this.element.innerHTML = '<div class="vditor-reset--error"></div><div style="height: 100%;"></div>';
    }
    renderEchart(vditor) {
      if (vditor.devtools.element.style.display !== "block") {
        return;
      }
      addScript(`${vditor.options.cdn}/dist/js/echarts/echarts.min.js?v=5.5.1`, "vditorEchartsScript").then(() => {
        if (!this.ASTChart) {
          this.ASTChart = echarts.init(vditor.devtools.element.lastElementChild);
        }
        try {
          this.element.lastElementChild.style.display = "block";
          this.element.firstElementChild.innerHTML = "";
          this.ASTChart.setOption({
            series: [
              {
                data: JSON.parse(vditor.lute.RenderEChartsJSON(getMarkdown(vditor))),
                initialTreeDepth: -1,
                label: {
                  align: "left",
                  backgroundColor: "rgba(68, 77, 86, .68)",
                  borderRadius: 3,
                  color: "#d1d5da",
                  fontSize: 12,
                  lineHeight: 12,
                  offset: [9, 12],
                  padding: [2, 4, 2, 4],
                  position: "top",
                  verticalAlign: "middle"
                },
                lineStyle: {
                  color: "#4285f4",
                  type: "curve",
                  width: 1
                },
                orient: "vertical",
                roam: true,
                type: "tree"
              }
            ],
            toolbox: {
              bottom: 25,
              emphasis: {
                iconStyle: {
                  color: "#4285f4"
                }
              },
              feature: {
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              },
              right: 15,
              show: true
            }
          });
          this.ASTChart.resize();
        } catch (e) {
          this.element.lastElementChild.style.display = "none";
          this.element.firstElementChild.innerHTML = e;
        }
      });
    }
  };

  // vditor-master/src/ts/toolbar/setToolbar.ts
  var removeCurrentToolbar = (toolbar2, names) => {
    names.forEach((name) => {
      if (!toolbar2[name]) {
        return;
      }
      const itemElement = toolbar2[name].children[0];
      if (itemElement && itemElement.classList.contains("vditor-menu--current")) {
        itemElement.classList.remove("vditor-menu--current");
      }
    });
  };
  var setCurrentToolbar = (toolbar2, names) => {
    names.forEach((name) => {
      if (!toolbar2[name]) {
        return;
      }
      const itemElement = toolbar2[name].children[0];
      if (itemElement && !itemElement.classList.contains("vditor-menu--current")) {
        itemElement.classList.add("vditor-menu--current");
      }
    });
  };
  var enableToolbar = (toolbar2, names) => {
    names.forEach((name) => {
      if (!toolbar2[name]) {
        return;
      }
      const itemElement = toolbar2[name].children[0];
      if (itemElement && itemElement.classList.contains(Constants.CLASS_MENU_DISABLED)) {
        itemElement.classList.remove(Constants.CLASS_MENU_DISABLED);
      }
    });
  };
  var disableToolbar = (toolbar2, names) => {
    names.forEach((name) => {
      if (!toolbar2[name]) {
        return;
      }
      const itemElement = toolbar2[name].children[0];
      if (itemElement && !itemElement.classList.contains(Constants.CLASS_MENU_DISABLED)) {
        itemElement.classList.add(Constants.CLASS_MENU_DISABLED);
      }
    });
  };
  var hideToolbar = (toolbar2, names) => {
    names.forEach((name) => {
      if (!toolbar2[name]) {
        return;
      }
      if (toolbar2[name]) {
        toolbar2[name].style.display = "none";
      }
    });
  };
  var showToolbar = (toolbar2, names) => {
    names.forEach((name) => {
      if (!toolbar2[name]) {
        return;
      }
      if (toolbar2[name]) {
        toolbar2[name].style.display = "block";
      }
    });
  };
  var hidePanel = (vditor, panels, exceptElement) => {
    if (panels.includes("subToolbar")) {
      vditor.toolbar.element.querySelectorAll(".vditor-hint").forEach((item) => {
        if (exceptElement && item.isEqualNode(exceptElement)) {
          return;
        }
        item.style.display = "none";
      });
      if (vditor.toolbar.elements.emoji) {
        vditor.toolbar.elements.emoji.lastElementChild.style.display = "none";
      }
    }
    if (panels.includes("hint")) {
      vditor.hint.element.style.display = "none";
    }
    if (vditor.wysiwyg.popover && panels.includes("popover")) {
      vditor.wysiwyg.popover.style.display = "none";
    }
  };
  var toggleSubMenu = (vditor, panelElement, actionBtn, level) => {
    actionBtn.addEventListener(getEventName(), (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (actionBtn.classList.contains(Constants.CLASS_MENU_DISABLED)) {
        return;
      }
      vditor.toolbar.element.querySelectorAll(".vditor-hint--current").forEach((item) => {
        item.classList.remove("vditor-hint--current");
      });
      if (panelElement.style.display === "block") {
        panelElement.style.display = "none";
      } else {
        hidePanel(vditor, ["subToolbar", "hint", "popover"], actionBtn.parentElement.parentElement);
        if (!actionBtn.classList.contains("vditor-tooltipped")) {
          actionBtn.classList.add("vditor-hint--current");
        }
        panelElement.style.display = "block";
        if (vditor.toolbar.element.getBoundingClientRect().right - actionBtn.getBoundingClientRect().right < 250) {
          panelElement.classList.add("vditor-panel--left");
        } else {
          panelElement.classList.remove("vditor-panel--left");
        }
      }
    });
  };

  // vditor-master/src/ts/util/log.ts
  var log = (method, content, type, print) => {
    if (print) {
      console.log(`${method} - ${type}: ${content}`);
    }
  };

  // vditor-master/src/ts/util/processCode.ts
  var processPasteCode = (html, text, type = "sv") => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    let isCode = false;
    if (tempElement.childElementCount === 1 && tempElement.lastElementChild.style.fontFamily.indexOf("monospace") > -1) {
      isCode = true;
    }
    const pres = tempElement.querySelectorAll("pre");
    if (tempElement.childElementCount === 1 && pres.length === 1 && pres[0].className !== "vditor-wysiwyg" && pres[0].className !== "vditor-sv") {
      isCode = true;
    }
    if (html.indexOf('\n<p class="p1">') === 0) {
      isCode = true;
    }
    if (tempElement.childElementCount === 1 && tempElement.firstElementChild.tagName === "TABLE" && tempElement.querySelector(".line-number") && tempElement.querySelector(".line-content")) {
      isCode = true;
    }
    if (isCode) {
      const code = text || html;
      if (/\n/.test(code) || pres.length === 1) {
        if (type === "wysiwyg") {
          return `<div class="vditor-wysiwyg__block" data-block="0" data-type="code-block"><pre><code>${code.replace(/&/g, "&amp;").replace(/</g, "&lt;")}<wbr></code></pre></div>`;
        }
        return "\n```\n" + code.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n```";
      } else {
        if (type === "wysiwyg") {
          return `<code>${code.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</code><wbr>`;
        }
        return `\`${code}\``;
      }
    }
    return false;
  };
  var processCodeRender = (previewPanel, vditor) => {
    if (!previewPanel) {
      return;
    }
    if (previewPanel.parentElement.getAttribute("data-type") === "html-block") {
      previewPanel.setAttribute("data-render", "1");
      return;
    }
    const language = previewPanel.firstElementChild.className.replace("language-", "");
    if (language === "abc") {
      abcRender(previewPanel, vditor.options.cdn);
    } else if (language === "mermaid") {
      mermaidRender(previewPanel, vditor.options.cdn, vditor.options.theme);
    } else if (language === "smiles") {
      SMILESRender(previewPanel, vditor.options.cdn, vditor.options.theme);
    } else if (language === "markmap") {
      markmapRender(previewPanel, vditor.options.cdn);
    } else if (language === "flowchart") {
      flowchartRender(previewPanel, vditor.options.cdn);
    } else if (language === "echarts") {
      chartRender(previewPanel, vditor.options.cdn, vditor.options.theme);
    } else if (language === "mindmap") {
      mindmapRender(previewPanel, vditor.options.cdn, vditor.options.theme);
    } else if (language === "plantuml") {
      plantumlRender(previewPanel, vditor.options.cdn);
    } else if (language === "graphviz") {
      graphvizRender(previewPanel, vditor.options.cdn);
    } else if (language === "wavedrom") {
      wavedromRender(previewPanel, vditor.options.cdn);
    } else if (language === "math") {
      mathRender(previewPanel, { cdn: vditor.options.cdn, math: vditor.options.preview.math });
    } else {
      const cRender = vditor.options.customRenders.find((item) => {
        if (item.language === language) {
          item.render(previewPanel, vditor);
          return true;
        }
      });
      if (!cRender) {
        highlightRender(Object.assign({}, vditor.options.preview.hljs), previewPanel, vditor.options.cdn);
        codeRender(previewPanel, vditor.options.preview.hljs);
      }
    }
    previewPanel.setAttribute("data-render", "1");
  };

  // vditor-master/src/ts/util/toc.ts
  var renderToc = (vditor) => {
    if (vditor.currentMode === "sv") {
      return;
    }
    const editorElement = vditor[vditor.currentMode].element;
    let tocHTML = vditor.outline.render(vditor);
    if (tocHTML === "") {
      tocHTML = "[ToC]";
    }
    editorElement.querySelectorAll('[data-type="toc-block"]').forEach((item) => {
      item.innerHTML = tocHTML;
      mathRender(item, {
        cdn: vditor.options.cdn,
        math: vditor.options.preview.math
      });
    });
  };
  var clickToc = (event, vditor) => {
    const spanElement = hasClosestByMatchTag(event.target, "SPAN");
    if (spanElement && hasClosestByClassName(spanElement, "vditor-toc")) {
      const headingElement = vditor[vditor.currentMode].element.querySelector("#" + spanElement.getAttribute("data-target-id"));
      if (headingElement) {
        if (vditor.options.height === "auto") {
          let windowScrollY = headingElement.offsetTop + vditor.element.offsetTop;
          if (!vditor.options.toolbarConfig.pin) {
            windowScrollY += vditor.toolbar.element.offsetHeight;
          }
          window.scrollTo(window.scrollX, windowScrollY);
        } else {
          if (vditor.element.offsetTop < window.scrollY) {
            window.scrollTo(window.scrollX, vditor.element.offsetTop);
          }
          vditor[vditor.currentMode].element.scrollTop = headingElement.offsetTop;
        }
      }
      return;
    }
  };
  var keydownToc = (blockElement, vditor, event, range) => {
    if (blockElement.previousElementSibling && blockElement.previousElementSibling.classList.contains("vditor-toc")) {
      if (event.key === "Backspace" && getSelectPosition(blockElement, vditor[vditor.currentMode].element, range).start === 0) {
        blockElement.previousElementSibling.remove();
        execAfterRender(vditor);
        return true;
      }
      if (insertBeforeBlock(vditor, event, range, blockElement, blockElement.previousElementSibling)) {
        return true;
      }
    }
    if (blockElement.nextElementSibling && blockElement.nextElementSibling.classList.contains("vditor-toc")) {
      if (event.key === "Delete" && getSelectPosition(blockElement, vditor[vditor.currentMode].element, range).start >= blockElement.textContent.trimRight().length) {
        blockElement.nextElementSibling.remove();
        execAfterRender(vditor);
        return true;
      }
      if (insertAfterBlock(vditor, event, range, blockElement, blockElement.nextElementSibling)) {
        return true;
      }
    }
    if (event.key === "Backspace" || event.key === "Delete") {
      const tocElement = hasClosestByClassName(range.startContainer, "vditor-toc");
      if (tocElement) {
        tocElement.remove();
        execAfterRender(vditor);
        return true;
      }
    }
  };

  // vditor-master/src/ts/ir/input.ts
  var input = (vditor, range, ignoreSpace = false, event) => {
    let blockElement = hasClosestBlock(range.startContainer);
    if (blockElement && !ignoreSpace && blockElement.getAttribute("data-type") !== "code-block") {
      if (isHrMD(blockElement.innerHTML) && blockElement.previousElementSibling || isHeadingMD(blockElement.innerHTML)) {
        return;
      }
      const startOffset = getSelectPosition(blockElement, vditor.ir.element, range).start;
      let startSpace = true;
      for (
        let i = startOffset - 1;
        // 软换行后有空格
        i > blockElement.textContent.substr(0, startOffset).lastIndexOf("\n");
        i--
      ) {
        if (blockElement.textContent.charAt(i) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
        blockElement.textContent.charAt(i) !== "	") {
          startSpace = false;
          break;
        }
      }
      if (startOffset === 0) {
        startSpace = false;
      }
      let endSpace = true;
      for (let i = startOffset - 1; i < blockElement.textContent.length; i++) {
        if (blockElement.textContent.charAt(i) !== " " && blockElement.textContent.charAt(i) !== "\n") {
          endSpace = false;
          break;
        }
      }
      if (startSpace) {
        if (typeof vditor.options.input === "function") {
          vditor.options.input(getMarkdown(vditor));
        }
        return;
      }
      if (endSpace && /^#{1,6} $/.test(blockElement.textContent)) {
        endSpace = false;
      }
      if (endSpace) {
        const markerElement = hasClosestByClassName(range.startContainer, "vditor-ir__marker");
        if (markerElement) {
        } else {
          const previousNode = range.startContainer.previousSibling;
          if (previousNode && previousNode.nodeType !== 3 && previousNode.classList.contains("vditor-ir__node--expand")) {
            previousNode.classList.remove("vditor-ir__node--expand");
          }
          if (typeof vditor.options.input === "function") {
            vditor.options.input(getMarkdown(vditor));
          }
          return;
        }
      }
    }
    vditor.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach((item) => {
      item.classList.remove("vditor-ir__node--expand");
    });
    if (!blockElement) {
      blockElement = vditor.ir.element;
    }
    if (!blockElement.querySelector("wbr")) {
      const previewRenderElement = hasClosestByClassName(range.startContainer, "vditor-ir__preview");
      if (previewRenderElement) {
        previewRenderElement.previousElementSibling.insertAdjacentHTML("beforeend", "<wbr>");
      } else {
        range.insertNode(document.createElement("wbr"));
      }
    }
    blockElement.querySelectorAll("[style]").forEach((item) => {
      item.removeAttribute("style");
    });
    if (blockElement.getAttribute("data-type") === "link-ref-defs-block") {
      blockElement = vditor.ir.element;
    }
    const isIRElement = blockElement.isEqualNode(vditor.ir.element);
    const footnoteElement = hasClosestByAttribute(blockElement, "data-type", "footnotes-block");
    let html = "";
    if (!isIRElement) {
      const blockquoteElement = hasClosestByTag(range.startContainer, "BLOCKQUOTE");
      const topListElement = getTopList(range.startContainer);
      if (topListElement) {
        blockElement = topListElement;
      }
      if (blockquoteElement && (!topListElement || topListElement && !blockquoteElement.contains(topListElement))) {
        blockElement = blockquoteElement;
      }
      if (footnoteElement) {
        blockElement = footnoteElement;
      }
      html = blockElement.outerHTML;
      if (blockElement.tagName === "UL" || blockElement.tagName === "OL") {
        const listPrevElement = blockElement.previousElementSibling;
        const listNextElement = blockElement.nextElementSibling;
        if (listPrevElement && (listPrevElement.tagName === "UL" || listPrevElement.tagName === "OL")) {
          html = listPrevElement.outerHTML + html;
          listPrevElement.remove();
        }
        if (listNextElement && (listNextElement.tagName === "UL" || listNextElement.tagName === "OL")) {
          html = html + listNextElement.outerHTML;
          listNextElement.remove();
        }
        html = html.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
      } else if (blockElement.previousElementSibling && blockElement.previousElementSibling.textContent.replace(Constants.ZWSP, "") !== "" && event && event.inputType === "insertParagraph") {
        html = blockElement.previousElementSibling.outerHTML + html;
        blockElement.previousElementSibling.remove();
      }
      if (!blockElement.innerText.startsWith("```")) {
        vditor.ir.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach((item) => {
          if (item && !blockElement.isEqualNode(item)) {
            html += item.outerHTML;
            item.remove();
          }
        });
        vditor.ir.element.querySelectorAll("[data-type='footnotes-block']").forEach((item) => {
          if (item && !blockElement.isEqualNode(item)) {
            html += item.outerHTML;
            item.remove();
          }
        });
      }
    } else {
      html = blockElement.innerHTML;
    }
    log("SpinVditorIRDOM", html, "argument", vditor.options.debugger);
    html = vditor.lute.SpinVditorIRDOM(html);
    log("SpinVditorIRDOM", html, "result", vditor.options.debugger);
    if (isIRElement) {
      blockElement.innerHTML = html;
    } else {
      blockElement.outerHTML = html;
      if (footnoteElement) {
        const footnoteItemElement = hasClosestByAttribute(
          vditor.ir.element.querySelector("wbr"),
          "data-type",
          "footnotes-def"
        );
        if (footnoteItemElement) {
          const footnoteItemText = footnoteItemElement.textContent;
          const marker = footnoteItemText.substring(1, footnoteItemText.indexOf("]:"));
          const footnoteRefElement = vditor.ir.element.querySelector(`sup[data-type="footnotes-ref"][data-footnotes-label="${marker}"]`);
          if (footnoteRefElement) {
            footnoteRefElement.setAttribute(
              "aria-label",
              footnoteItemText.substr(marker.length + 3).trim().substr(0, 24)
            );
          }
        }
      }
    }
    let firstLinkRefDefElement;
    const allLinkRefDefsElement = vditor.ir.element.querySelectorAll("[data-type='link-ref-defs-block']");
    allLinkRefDefsElement.forEach((item, index) => {
      if (index === 0) {
        firstLinkRefDefElement = item;
      } else {
        firstLinkRefDefElement.insertAdjacentHTML("beforeend", item.innerHTML);
        item.remove();
      }
    });
    if (allLinkRefDefsElement.length > 0) {
      vditor.ir.element.insertAdjacentElement("beforeend", allLinkRefDefsElement[0]);
    }
    let firstFootnoteElement;
    const allFootnoteElement = vditor.ir.element.querySelectorAll("[data-type='footnotes-block']");
    allFootnoteElement.forEach((item, index) => {
      if (index === 0) {
        firstFootnoteElement = item;
      } else {
        firstFootnoteElement.insertAdjacentHTML("beforeend", item.innerHTML);
        item.remove();
      }
    });
    if (allFootnoteElement.length > 0) {
      vditor.ir.element.insertAdjacentElement("beforeend", allFootnoteElement[0]);
    }
    setRangeByWbr(vditor.ir.element, range);
    vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach((item) => {
      processCodeRender(item, vditor);
    });
    renderToc(vditor);
    processAfterRender(vditor, {
      enableAddUndoStack: true,
      enableHint: true,
      enableInput: true
    });
  };

  // vditor-master/src/ts/sv/process.ts
  var replaceSelection = (vditor, text, selectionMode = "end") => {
    const element = vditor.sv.element;
    element.setRangeText(text, element.selectionStart, element.selectionEnd, selectionMode);
    element.focus();
  };
  var processPaste = (vditor, text) => {
    replaceSelection(vditor, text);
  };
  var processAfterRender2 = (vditor, options = {
    enableAddUndoStack: true,
    enableHint: false,
    enableInput: true
  }) => {
    vditor.preview.render(vditor);
    const text = getMarkdown(vditor);
    if (typeof vditor.options.input === "function" && options.enableInput) {
      vditor.options.input(text);
    }
    if (vditor.options.counter.enable) {
      vditor.counter.render(vditor, text);
    }
    if (vditor.options.cache.enable && accessLocalStorage()) {
      localStorage.setItem(vditor.options.cache.id, text);
      if (vditor.options.cache.after) {
        vditor.options.cache.after(text);
      }
    }
    if (vditor.devtools) {
      vditor.devtools.renderEchart(vditor);
    }
    clearTimeout(vditor.sv.processTimeoutId);
    vditor.sv.processTimeoutId = window.setTimeout(() => {
      if (options.enableAddUndoStack && !vditor.sv.composingLock) {
        vditor.undo.addToUndoStack(vditor);
      }
    }, vditor.options.undoDelay);
  };
  var processHeading = (vditor, value) => {
    const element = vditor.sv.element;
    const lineStart = element.value.lastIndexOf("\n", element.selectionStart - 1) + 1;
    const lineEndIndex = element.value.indexOf("\n", element.selectionEnd);
    const lineEnd = lineEndIndex === -1 ? element.value.length : lineEndIndex;
    const selectedLines = element.value.substring(lineStart, lineEnd);
    const heading = value ? value + selectedLines.replace(/^#{1,6}\s+/, "") : selectedLines.replace(/^#{1,6}\s+/, "");
    element.setRangeText(heading, lineStart, lineEnd, "select");
    element.focus();
    processAfterRender2(vditor);
  };
  var processToolbar = (vditor, actionBtn, prefix, suffix) => {
    const element = vditor.sv.element;
    const commandName = actionBtn.getAttribute("data-type");
    const start = element.selectionStart;
    const end = element.selectionEnd;
    const selectedText = element.value.substring(start, end);
    let text = "";
    let selectionStart = start + prefix.length;
    let selectionEnd = selectionStart + selectedText.length;
    if (commandName === "check" || commandName === "list" || commandName === "ordered-list" || commandName === "quote") {
      const lineStart = element.value.lastIndexOf("\n", start - 1) + 1;
      const lineEndIndex = element.value.indexOf("\n", end);
      const lineEnd = lineEndIndex === -1 ? element.value.length : lineEndIndex;
      const lines = element.value.substring(lineStart, lineEnd);
      text = lines.split("\n").map((line) => prefix + line).join("\n");
      element.setRangeText(text, lineStart, lineEnd, "select");
    } else if (commandName === "line") {
      text = `${start === 0 ? "" : "\n\n"}${prefix}
`;
      element.setRangeText(text, start, end, "end");
    } else if (commandName === "code") {
      text = `${prefix}
${selectedText}${suffix}`;
      element.setRangeText(text, start, end, "end");
      selectionStart = start + prefix.length + 1;
      selectionEnd = selectionStart + selectedText.length;
      element.setSelectionRange(selectionStart, selectionEnd);
    } else if (commandName === "table") {
      text = `${start === 0 ? "" : "\n\n"}${prefix}${suffix}`;
      element.setRangeText(text, start, end, "end");
    } else {
      text = `${prefix}${selectedText}${suffix}`;
      element.setRangeText(text, start, end, "end");
      element.setSelectionRange(selectionStart, selectionEnd);
    }
    element.focus();
    processAfterRender2(vditor);
  };

  // vditor-master/src/ts/upload/getElement.ts
  var getElement = (vditor) => {
    switch (vditor.currentMode) {
      case "ir":
        return vditor.ir.element;
      case "wysiwyg":
        return vditor.wysiwyg.element;
      case "sv":
        return vditor.sv.element;
    }
  };

  // vditor-master/src/ts/upload/setHeaders.ts
  var setHeaders = (vditor, xhr) => {
    if (vditor.options.upload.setHeaders) {
      vditor.options.upload.headers = vditor.options.upload.setHeaders();
    }
    if (vditor.options.upload.headers) {
      Object.keys(vditor.options.upload.headers).forEach((key) => {
        xhr.setRequestHeader(key, vditor.options.upload.headers[key]);
      });
    }
  };

  // vditor-master/src/ts/upload/index.ts
  var Upload = class {
    constructor() {
      this.isUploading = false;
      this.element = document.createElement("div");
      this.element.className = "vditor-upload";
    }
  };
  var validateFile = (vditor, files) => {
    vditor.tip.hide();
    const uploadFileList = [];
    let errorTip = "";
    let uploadingStr = "";
    const lang = vditor.options.lang;
    const options = vditor.options;
    for (let iMax = files.length, i = 0; i < iMax; i++) {
      const file = files[i];
      let validate = true;
      if (!file.name) {
        errorTip += `<li>${window.VditorI18n.nameEmpty}</li>`;
        validate = false;
      }
      if (file.size > vditor.options.upload.max) {
        errorTip += `<li>${file.name} ${window.VditorI18n.over} ${vditor.options.upload.max / 1024 / 1024}M</li>`;
        validate = false;
      }
      const lastIndex = file.name.lastIndexOf(".");
      const fileExt = file.name.substr(lastIndex);
      const filename = vditor.options.upload.filename(file.name.substr(0, lastIndex)) + fileExt;
      if (vditor.options.upload.accept) {
        const isAccept = vditor.options.upload.accept.split(",").some((item) => {
          const type = item.trim();
          if (type.indexOf(".") === 0) {
            if (fileExt.toLowerCase() === type.toLowerCase()) {
              return true;
            }
          } else {
            if (file.type.split("/")[0] === type.split("/")[0]) {
              return true;
            }
          }
          return false;
        });
        if (!isAccept) {
          errorTip += `<li>${file.name} ${window.VditorI18n.fileTypeError}</li>`;
          validate = false;
        }
      }
      if (validate) {
        uploadFileList.push(file);
        uploadingStr += `<li>${filename} ${window.VditorI18n.uploading} <a class="vditorCancelUpload" href="javascript:void(0)">${window.VditorI18n.cancelUpload}</a></li>`;
      }
    }
    vditor.tip.show(`<ul>${errorTip}${uploadingStr}</ul>`);
    if (vditor.options.upload.cancel) {
      const vditorCancelUploadElement = vditor.tip.element.querySelector(".vditorCancelUpload");
      if (vditorCancelUploadElement) {
        vditorCancelUploadElement.addEventListener("click", () => {
          vditor.options.upload.cancel(uploadFileList);
          vditor.tip.hide();
          vditor.upload.isUploading = false;
        });
      }
    }
    return uploadFileList;
  };
  var genUploadedLabel = (responseText, vditor) => {
    const editorElement = getElement(vditor);
    editorElement.focus();
    const response = JSON.parse(responseText);
    let errorTip = "";
    if (response.code === 1) {
      errorTip = `${response.msg}`;
    }
    if (response.data.errFiles && response.data.errFiles.length > 0) {
      errorTip = `<ul><li>${errorTip}</li>`;
      response.data.errFiles.forEach((data) => {
        const lastIndex = data.lastIndexOf(".");
        const filename = vditor.options.upload.filename(data.substr(0, lastIndex)) + data.substr(lastIndex);
        errorTip += `<li>${filename} ${window.VditorI18n.uploadError}</li>`;
      });
      errorTip += "</ul>";
    }
    if (errorTip) {
      vditor.tip.show(errorTip);
    } else {
      vditor.tip.hide();
    }
    let succFileText = "";
    Object.keys(response.data.succMap).forEach((key) => {
      const path = response.data.succMap[key];
      const lastIndex = key.lastIndexOf(".");
      let type = key.substr(lastIndex);
      const filename = vditor.options.upload.filename(key.substr(0, lastIndex)) + type;
      type = type.toLowerCase();
      if (type.indexOf(".wav") === 0 || type.indexOf(".mp3") === 0 || type.indexOf(".ogg") === 0) {
        if (vditor.currentMode === "wysiwyg") {
          succFileText += `<div class="vditor-wysiwyg__block" data-type="html-block"
 data-block="0"><pre><code>&lt;audio controls="controls" src="${path}"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="${path}"></audio></pre></div>
`;
        } else if (vditor.currentMode === "ir") {
          succFileText += `<audio controls="controls" src="${path}"></audio>
`;
        } else {
          succFileText += `[${filename}](${path})
`;
        }
      } else if (type.indexOf(".apng") === 0 || type.indexOf(".bmp") === 0 || type.indexOf(".gif") === 0 || type.indexOf(".ico") === 0 || type.indexOf(".cur") === 0 || type.indexOf(".jpg") === 0 || type.indexOf(".jpeg") === 0 || type.indexOf(".jfif") === 0 || type.indexOf(".pjp") === 0 || type.indexOf(".pjpeg") === 0 || type.indexOf(".png") === 0 || type.indexOf(".svg") === 0 || type.indexOf(".webp") === 0) {
        if (vditor.currentMode === "wysiwyg") {
          succFileText += `<img alt="${filename}" src="${path}">
`;
        } else {
          succFileText += `![${filename}](${path})
`;
        }
      } else {
        if (vditor.currentMode === "wysiwyg") {
          succFileText += `<a href="${path}">${filename}</a>
`;
        } else {
          succFileText += `[${filename}](${path})
`;
        }
      }
    });
    if (!succFileText) {
      if (vditor.currentMode === "sv") {
        vditor.sv.element.setSelectionRange(vditor.upload.selectionStart, vditor.upload.selectionEnd);
      } else {
        setSelectionFocus(vditor.upload.range);
      }
      return;
    }
    if (vditor.currentMode === "sv") {
      vditor.sv.element.setSelectionRange(vditor.upload.selectionStart, vditor.upload.selectionEnd);
      processPaste(vditor, succFileText);
      processAfterRender2(vditor);
      vditor.upload.selectionStart = vditor.sv.element.selectionStart;
      vditor.upload.selectionEnd = vditor.sv.element.selectionEnd;
    } else {
      setSelectionFocus(vditor.upload.range);
      document.execCommand("insertHTML", false, succFileText);
      vditor.upload.range = getSelection().getRangeAt(0).cloneRange();
    }
  };
  var uploadFiles = async (vditor, files, element) => {
    let fileList = [];
    const filesMax = vditor.options.upload.multiple === true ? files.length : 1;
    for (let i = 0; i < filesMax; i++) {
      let fileItem = files[i];
      if (fileItem instanceof DataTransferItem) {
        fileItem = fileItem.getAsFile();
      }
      fileList.push(fileItem);
    }
    if (vditor.options.upload.handler) {
      const isValidate = await vditor.options.upload.handler(fileList);
      if (element) {
        element.value = "";
      }
      if (typeof isValidate === "string") {
        vditor.tip.show(isValidate);
        return;
      }
      return;
    }
    if (!vditor.options.upload.url || !vditor.upload) {
      if (element) {
        element.value = "";
      }
      vditor.tip.show("please config: options.upload.url");
      return;
    }
    if (vditor.options.upload.file) {
      fileList = await vditor.options.upload.file(fileList);
    }
    if (vditor.options.upload.validate) {
      const isValidate = vditor.options.upload.validate(fileList);
      if (typeof isValidate === "string") {
        vditor.tip.show(isValidate);
        return;
      }
    }
    const editorElement = getElement(vditor);
    if (vditor.currentMode === "sv") {
      vditor.upload.selectionStart = vditor.sv.element.selectionStart;
      vditor.upload.selectionEnd = vditor.sv.element.selectionEnd;
    } else {
      vditor.upload.range = getEditorRange(vditor);
    }
    const validateResult = validateFile(vditor, fileList);
    if (validateResult.length === 0) {
      if (element) {
        element.value = "";
      }
      return;
    }
    const formData = new FormData();
    const extraData = vditor.options.upload.extraData;
    for (const key of Object.keys(extraData)) {
      formData.append(key, extraData[key]);
    }
    for (let i = 0, iMax = validateResult.length; i < iMax; i++) {
      formData.append(vditor.options.upload.fieldName, validateResult[i]);
    }
    const xhr = new XMLHttpRequest();
    vditor.upload.xhr = xhr;
    xhr.open("POST", vditor.options.upload.url);
    if (vditor.options.upload.token) {
      xhr.setRequestHeader("X-Upload-Token", vditor.options.upload.token);
    }
    if (vditor.options.upload.withCredentials) {
      xhr.withCredentials = true;
    }
    setHeaders(vditor, xhr);
    vditor.upload.isUploading = true;
    if (vditor.currentMode === "sv") {
      vditor.sv.element.disabled = true;
    } else {
      editorElement.setAttribute("contenteditable", "false");
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        vditor.upload.isUploading = false;
        if (vditor.currentMode === "sv") {
          vditor.sv.element.disabled = false;
        } else {
          editorElement.setAttribute("contenteditable", "true");
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          if (vditor.options.upload.success) {
            vditor.options.upload.success(editorElement, xhr.responseText);
          } else {
            let responseText = xhr.responseText;
            if (vditor.options.upload.format) {
              responseText = vditor.options.upload.format(files, xhr.responseText);
            }
            genUploadedLabel(responseText, vditor);
          }
        } else {
          if (vditor.options.upload.error) {
            vditor.options.upload.error(xhr.responseText);
          } else {
            vditor.tip.show(xhr.responseText);
          }
        }
        if (element) {
          element.value = "";
        }
        vditor.upload.element.style.display = "none";
        vditor.upload.xhr = void 0;
      }
    };
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return;
      }
      const progress = event.loaded / event.total * 100;
      vditor.upload.element.style.display = "block";
      const progressBar = vditor.upload.element;
      progressBar.style.width = progress + "%";
    };
    xhr.send(formData);
  };

  // vditor-master/src/ts/wysiwyg/afterRenderEvent.ts
  var afterRenderEvent = (vditor, options = {
    enableAddUndoStack: true,
    enableHint: false,
    enableInput: true
  }) => {
    renderImageCaptions(vditor.wysiwyg.element, "wysiwyg", vditor.options.preview.markdown.imageCaption);
    if (options.enableHint) {
      vditor.hint.render(vditor);
    }
    clearTimeout(vditor.wysiwyg.afterRenderTimeoutId);
    vditor.wysiwyg.afterRenderTimeoutId = window.setTimeout(() => {
      if (vditor.wysiwyg.composingLock) {
        return;
      }
      const text = getMarkdown(vditor);
      if (typeof vditor.options.input === "function" && options.enableInput) {
        vditor.options.input(text);
      }
      if (vditor.options.counter.enable) {
        vditor.counter.render(vditor, text);
      }
      if (vditor.options.cache.enable && accessLocalStorage()) {
        localStorage.setItem(vditor.options.cache.id, text);
        if (vditor.options.cache.after) {
          vditor.options.cache.after(text);
        }
      }
      if (vditor.devtools) {
        vditor.devtools.renderEchart(vditor);
      }
      if (options.enableAddUndoStack) {
        vditor.undo.addToUndoStack(vditor);
      }
    }, vditor.options.undoDelay);
  };

  // vditor-master/src/ts/wysiwyg/inlineTag.ts
  var previoueIsEmptyA = (node) => {
    let previousNode = node.previousSibling;
    while (previousNode) {
      if (previousNode.nodeType !== 3 && previousNode.tagName === "A" && !previousNode.previousSibling && previousNode.innerHTML.replace(Constants.ZWSP, "") === "" && previousNode.nextSibling) {
        return previousNode;
      }
      previousNode = previousNode.previousSibling;
    }
    return false;
  };
  var nextIsCode = (range) => {
    let nextNode = range.startContainer.nextSibling;
    while (nextNode && nextNode.textContent === "") {
      nextNode = nextNode.nextSibling;
    }
    if (nextNode && nextNode.nodeType !== 3 && (nextNode.tagName === "CODE" || nextNode.getAttribute("data-type") === "math-inline" || nextNode.getAttribute("data-type") === "html-entity" || nextNode.getAttribute("data-type") === "html-inline")) {
      return true;
    }
    return false;
  };
  var getNextHTML = (node) => {
    let html = "";
    let nextNode = node.nextSibling;
    while (nextNode) {
      if (nextNode.nodeType === 3) {
        html += nextNode.textContent;
      } else {
        html += nextNode.outerHTML;
      }
      nextNode = nextNode.nextSibling;
    }
    return html;
  };
  var getPreviousHTML = (node) => {
    let html = "";
    let previousNode = node.previousSibling;
    while (previousNode) {
      if (previousNode.nodeType === 3) {
        html = previousNode.textContent + html;
      } else {
        html = previousNode.outerHTML + html;
      }
      previousNode = previousNode.previousSibling;
    }
    return html;
  };
  var getRenderElementNextNode = (blockCodeElement) => {
    let nextNode = blockCodeElement;
    while (nextNode && !nextNode.nextSibling) {
      nextNode = nextNode.parentElement;
    }
    return nextNode.nextSibling;
  };
  var splitElement = (range) => {
    const previousHTML = getPreviousHTML(range.startContainer);
    const nextHTML = getNextHTML(range.startContainer);
    const text = range.startContainer.textContent;
    const offset = range.startOffset;
    let beforeHTML = "";
    let afterHTML = "";
    if (text.substr(0, offset) !== "" && text.substr(0, offset) !== Constants.ZWSP || previousHTML) {
      beforeHTML = `${previousHTML}${text.substr(0, offset)}`;
    }
    if (text.substr(offset) !== "" && text.substr(offset) !== Constants.ZWSP || nextHTML) {
      afterHTML = `${text.substr(offset)}${nextHTML}`;
    }
    return {
      afterHTML,
      beforeHTML
    };
  };
  var modifyPre = (vditor, range) => {
    Array.from(vditor.wysiwyg.element.childNodes).find((node) => {
      if (node.nodeType === 3) {
        const pElement = document.createElement("p");
        pElement.setAttribute("data-block", "0");
        pElement.textContent = node.textContent;
        const cloneRangeOffset = range.startContainer.nodeType === 3 ? range.startOffset : node.textContent.length;
        node.parentNode.insertBefore(pElement, node);
        node.remove();
        range.setStart(pElement.firstChild, Math.min(pElement.firstChild.textContent.length, cloneRangeOffset));
        range.collapse(true);
        setSelectionFocus(range);
        return true;
      } else if (!node.getAttribute("data-block")) {
        if (node.tagName === "P") {
          node.remove();
        } else {
          if (node.tagName === "DIV") {
            range.insertNode(document.createElement("wbr"));
            node.outerHTML = `<p data-block="0">${node.innerHTML}</p>`;
          } else {
            if (node.tagName === "BR") {
              node.outerHTML = `<p data-block="0">${node.outerHTML}<wbr></p>`;
            } else {
              range.insertNode(document.createElement("wbr"));
              node.outerHTML = `<p data-block="0">${node.outerHTML}</p>`;
            }
          }
          setRangeByWbr(vditor.wysiwyg.element, range);
          range = getSelection().getRangeAt(0);
        }
        return true;
      }
    });
  };

  // vditor-master/src/ts/wysiwyg/input.ts
  var input2 = (vditor, range, event) => {
    let blockElement = hasClosestBlock(range.startContainer);
    if (!blockElement) {
      blockElement = vditor.wysiwyg.element;
    }
    if (event && event.inputType !== "formatItalic" && event.inputType !== "deleteByDrag" && event.inputType !== "insertFromDrop" && event.inputType !== "formatBold" && event.inputType !== "formatRemove" && event.inputType !== "formatStrikeThrough" && event.inputType !== "insertUnorderedList" && event.inputType !== "insertOrderedList" && event.inputType !== "formatOutdent" && event.inputType !== "formatIndent" && event.inputType !== "" || !event) {
      const previousAEmptyElement = previoueIsEmptyA(range.startContainer);
      if (previousAEmptyElement) {
        previousAEmptyElement.remove();
      }
      vditor.wysiwyg.element.querySelectorAll("wbr").forEach((wbr) => {
        wbr.remove();
      });
      range.insertNode(document.createElement("wbr"));
      blockElement.querySelectorAll("[style]").forEach((item) => {
        item.removeAttribute("style");
      });
      blockElement.querySelectorAll(".vditor-comment").forEach((item) => {
        if (item.textContent.trim() === "") {
          item.classList.remove("vditor-comment", "vditor-comment--focus");
          item.removeAttribute("data-cmtids");
        }
      });
      blockElement.previousElementSibling?.querySelectorAll(".vditor-comment").forEach((item) => {
        if (item.textContent.trim() === "") {
          item.classList.remove("vditor-comment", "vditor-comment--focus");
          item.removeAttribute("data-cmtids");
        }
      });
      let html = "";
      if (blockElement.getAttribute("data-type") === "link-ref-defs-block") {
        blockElement = vditor.wysiwyg.element;
      }
      const isWYSIWYGElement = blockElement.isEqualNode(vditor.wysiwyg.element);
      const footnoteElement = hasClosestByAttribute(blockElement, "data-type", "footnotes-block");
      const calloutElement = hasClosestByAttribute(range.startContainer, "data-type", "callout");
      if (!isWYSIWYGElement) {
        const topListElement = getTopList(range.startContainer);
        if (topListElement && !footnoteElement) {
          const blockquoteElement = hasClosestByTag(range.startContainer, "BLOCKQUOTE");
          if (blockquoteElement) {
            blockElement = hasClosestBlock(range.startContainer) || blockElement;
          } else {
            blockElement = topListElement;
          }
        }
        if (footnoteElement) {
          blockElement = footnoteElement;
        }
        if (calloutElement) {
          blockElement = calloutElement;
        }
        html = blockElement.outerHTML;
        if (blockElement.tagName === "UL" || blockElement.tagName === "OL") {
          const listPrevElement = blockElement.previousElementSibling;
          const listNextElement = blockElement.nextElementSibling;
          if (listPrevElement && (listPrevElement.tagName === "UL" || listPrevElement.tagName === "OL")) {
            html = listPrevElement.outerHTML + html;
            listPrevElement.remove();
          }
          if (listNextElement && (listNextElement.tagName === "UL" || listNextElement.tagName === "OL")) {
            html = html + listNextElement.outerHTML;
            listNextElement.remove();
          }
          html = html.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
        }
        if (!blockElement.innerText.startsWith("```")) {
          vditor.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach((item) => {
            if (item && !blockElement.isEqualNode(item)) {
              html += item.outerHTML;
              item.remove();
            }
          });
          vditor.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']").forEach((item) => {
            if (item && !blockElement.isEqualNode(item)) {
              html += item.outerHTML;
              item.remove();
            }
          });
        }
      } else {
        html = blockElement.innerHTML;
      }
      html = html.replace(/<\/(strong|b)><strong data-marker="\W{2}">/g, "").replace(/<\/(em|i)><em data-marker="\W{1}">/g, "").replace(/<\/(s|strike)><s data-marker="~{1,2}">/g, "");
      if (html === '<p data-block="0">```<wbr></p>' && vditor.hint.recentLanguage) {
        html = '<p data-block="0">```<wbr></p>'.replace("```", "```" + vditor.hint.recentLanguage);
      }
      log("SpinVditorDOM", html, "argument", vditor.options.debugger);
      html = vditor.lute.SpinVditorDOM(html);
      log("SpinVditorDOM", html, "result", vditor.options.debugger);
      if (isWYSIWYGElement) {
        blockElement.innerHTML = html;
      } else {
        blockElement.outerHTML = html;
        if (footnoteElement) {
          const footnoteItemElement = hasTopClosestByTag(vditor.wysiwyg.element.querySelector("wbr"), "LI");
          if (footnoteItemElement) {
            const footnoteRefElement = vditor.wysiwyg.element.querySelector(`sup[data-type="footnotes-ref"][data-footnotes-label="${footnoteItemElement.getAttribute("data-marker")}"]`);
            if (footnoteRefElement) {
              footnoteRefElement.setAttribute(
                "aria-label",
                footnoteItemElement.textContent.trim().substr(0, 24)
              );
            }
          }
        }
      }
      let firstLinkRefDefElement;
      const allLinkRefDefsElement = vditor.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']");
      allLinkRefDefsElement.forEach((item, index) => {
        if (index === 0) {
          firstLinkRefDefElement = item;
        } else {
          firstLinkRefDefElement.insertAdjacentHTML("beforeend", item.innerHTML);
          item.remove();
        }
      });
      if (allLinkRefDefsElement.length > 0) {
        vditor.wysiwyg.element.insertAdjacentElement("beforeend", allLinkRefDefsElement[0]);
      }
      let firstFootnoteElement;
      const allFootnoteElement = vditor.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']");
      allFootnoteElement.forEach((item, index) => {
        if (index === 0) {
          firstFootnoteElement = item;
        } else {
          firstFootnoteElement.insertAdjacentHTML("beforeend", item.innerHTML);
          item.remove();
        }
      });
      if (allFootnoteElement.length > 0) {
        vditor.wysiwyg.element.insertAdjacentElement("beforeend", allFootnoteElement[0]);
      }
      setRangeByWbr(vditor.wysiwyg.element, range);
      vditor.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach((item) => {
        processCodeRender(item, vditor);
      });
      if (event && (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") && vditor.options.comment.enable) {
        vditor.wysiwyg.triggerRemoveComment(vditor);
        vditor.options.comment.adjustTop(vditor.wysiwyg.getComments(vditor, true));
      }
    }
    renderToc(vditor);
    afterRenderEvent(vditor, {
      enableAddUndoStack: true,
      enableHint: true,
      enableInput: true
    });
  };

  // vditor-master/src/ts/util/hotKey.ts
  var matchHotKey = (hotKey, event) => {
    if (hotKey === "") {
      return false;
    }
    if (hotKey.indexOf("\u21E7") === -1 && hotKey.indexOf("\u2318") === -1 && hotKey.indexOf("\u2325") === -1) {
      if (!isCtrl(event) && !event.altKey && !event.shiftKey && event.code === hotKey) {
        return true;
      }
      return false;
    }
    if (hotKey === "\u21E7Tab") {
      if (!isCtrl(event) && !event.altKey && event.shiftKey && event.code === "Tab") {
        return true;
      }
      return false;
    }
    let hotKeys = hotKey.split("");
    if (hotKey.startsWith("\u2325")) {
      const keyCode = hotKeys.length === 3 ? hotKeys[2] : hotKeys[1];
      if ((hotKeys.length === 3 ? isCtrl(event) : !isCtrl(event)) && event.altKey && !event.shiftKey && event.code === (/^[0-9]$/.test(keyCode) ? "Digit" : "Key") + keyCode) {
        return true;
      }
      return false;
    }
    if (hotKey === "\u2318Enter") {
      hotKeys = ["\u2318", "Enter"];
    }
    const hasShift = hotKeys.length > 2 && hotKeys[0] === "\u21E7";
    let key = hasShift ? hotKeys[2] : hotKeys[1];
    if (hasShift && (isFirefox() || !/Mac/.test(navigator.platform))) {
      if (key === "-") {
        key = "_";
      } else if (key === "=") {
        key = "+";
      }
    }
    if (isCtrl(event) && event.key.toLowerCase() === key.toLowerCase() && !event.altKey && (!hasShift && !event.shiftKey || hasShift && event.shiftKey)) {
      return true;
    }
    return false;
  };

  // vditor-master/src/ts/ir/expandMarker.ts
  var nextIsNode = (range) => {
    const startContainer = range.startContainer;
    if (startContainer.nodeType === 3 && startContainer.nodeValue.length !== range.startOffset) {
      return false;
    }
    let nextNode = startContainer.nextSibling;
    while (nextNode && nextNode.textContent === "") {
      nextNode = nextNode.nextSibling;
    }
    if (!nextNode) {
      const markerElement = hasClosestByClassName(startContainer, "vditor-ir__marker");
      if (markerElement && !markerElement.nextSibling) {
        const parentNextNode = startContainer.parentElement.parentElement.nextSibling;
        if (parentNextNode && parentNextNode.nodeType !== 3 && parentNextNode.classList.contains("vditor-ir__node")) {
          return parentNextNode;
        }
      }
      return false;
    } else if (nextNode && nextNode.nodeType !== 3 && nextNode.classList.contains("vditor-ir__node") && !nextNode.getAttribute("data-block")) {
      return nextNode;
    }
    return false;
  };
  var previousIsNode = (range) => {
    const startContainer = range.startContainer;
    const previousNode = startContainer.previousSibling;
    if (startContainer.nodeType === 3 && range.startOffset === 0 && previousNode && previousNode.nodeType !== 3 && // *em*|text
    previousNode.classList.contains("vditor-ir__node") && !previousNode.getAttribute("data-block")) {
      return previousNode;
    }
    return false;
  };
  var expandMarker = (range, vditor) => {
    vditor.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach((item) => {
      item.classList.remove("vditor-ir__node--expand");
    });
    const nodeElement = hasTopClosestByClassName(range.startContainer, "vditor-ir__node");
    const nodeElementEnd = !range.collapsed && hasTopClosestByClassName(range.endContainer, "vditor-ir__node");
    if (!range.collapsed && (!nodeElement || nodeElement !== nodeElementEnd)) {
      return;
    }
    if (nodeElement) {
      nodeElement.classList.add("vditor-ir__node--expand");
      nodeElement.classList.remove("vditor-ir__node--hidden");
      setSelectionFocus(range);
    }
    const nextNode = nextIsNode(range);
    if (nextNode) {
      nextNode.classList.add("vditor-ir__node--expand");
      nextNode.classList.remove("vditor-ir__node--hidden");
      return;
    }
    const previousNode = previousIsNode(range);
    if (previousNode) {
      previousNode.classList.add("vditor-ir__node--expand");
      previousNode.classList.remove("vditor-ir__node--hidden");
      return;
    }
  };

  // vditor-master/src/ts/ir/processKeydown.ts
  var processKeydown = (vditor, event) => {
    vditor.ir.composingLock = event.isComposing;
    if (event.isComposing) {
      return false;
    }
    if (event.key.indexOf("Arrow") === -1 && event.key !== "Meta" && event.key !== "Control" && event.key !== "Alt" && event.key !== "Shift" && event.key !== "CapsLock" && event.key !== "Escape" && !/^F\d{1,2}$/.test(event.key)) {
      vditor.undo.recordFirstPosition(vditor, event);
    }
    const range = getEditorRange(vditor);
    const startContainer = range.startContainer;
    if (!fixGSKeyBackspace(event, vditor, startContainer)) {
      return false;
    }
    fixCJKPosition(range, vditor, event);
    fixHR(range);
    if (event.key !== "Enter" && event.key !== "Tab" && event.key !== "Backspace" && event.key.indexOf("Arrow") === -1 && !isCtrl(event) && event.key !== "Escape" && event.key !== "Delete") {
      return false;
    }
    const newlineElement = hasClosestByAttribute(startContainer, "data-newline", "1");
    if (!isCtrl(event) && !event.altKey && !event.shiftKey && event.key === "Enter" && newlineElement && range.startOffset < newlineElement.textContent.length) {
      const beforeMarkerElement = newlineElement.previousElementSibling;
      if (beforeMarkerElement) {
        range.insertNode(document.createTextNode(beforeMarkerElement.textContent));
        range.collapse(false);
      }
      const afterMarkerElement = newlineElement.nextSibling;
      if (afterMarkerElement) {
        range.insertNode(document.createTextNode(afterMarkerElement.textContent));
        range.collapse(true);
      }
    }
    const pElement = hasClosestByMatchTag(startContainer, "P");
    if (fixMarkdown(event, vditor, pElement, range)) {
      return true;
    }
    if (fixList(range, vditor, pElement, event)) {
      return true;
    }
    if (fixBlockquote(vditor, range, event, pElement)) {
      return true;
    }
    const preRenderElement = hasClosestByClassName(startContainer, "vditor-ir__marker--pre");
    if (preRenderElement && preRenderElement.tagName === "PRE") {
      const codeRenderElement = preRenderElement.firstChild;
      if (fixCodeBlock(vditor, event, preRenderElement, range)) {
        return true;
      }
      if ((codeRenderElement.getAttribute("data-type") === "math-block" || codeRenderElement.getAttribute("data-type") === "html-block") && insertBeforeBlock(vditor, event, range, codeRenderElement, preRenderElement.parentElement)) {
        return true;
      }
      if (insertAfterBlock(vditor, event, range, codeRenderElement, preRenderElement.parentElement)) {
        return true;
      }
    }
    const preBeforeElement = hasClosestByAttribute(startContainer, "data-type", "code-block-info");
    if (preBeforeElement) {
      if (event.key === "Enter" || event.key === "Tab") {
        range.selectNodeContents(preBeforeElement.nextElementSibling.firstChild);
        range.collapse(true);
        event.preventDefault();
        hidePanel(vditor, ["hint"]);
        return true;
      }
      if (event.key === "Backspace") {
        const start = getSelectPosition(preBeforeElement, vditor.ir.element).start;
        if (start === 1) {
          range.setStart(startContainer, 0);
        }
        if (start === 2) {
          vditor.hint.recentLanguage = "";
        }
      }
      if (insertBeforeBlock(vditor, event, range, preBeforeElement, preBeforeElement.parentElement)) {
        hidePanel(vditor, ["hint"]);
        return true;
      }
    }
    const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
    if (event.key.indexOf("Arrow") > -1 && cellElement) {
      const tableElement = isFirstCell(cellElement);
      if (tableElement && insertBeforeBlock(vditor, event, range, cellElement, tableElement)) {
        return true;
      }
      const table2Element = isLastCell(cellElement);
      if (table2Element && insertAfterBlock(vditor, event, range, cellElement, table2Element)) {
        return true;
      }
    }
    if (fixTable(vditor, event, range)) {
      return true;
    }
    if (fixTask(vditor, range, event)) {
      return true;
    }
    if (fixTab(vditor, range, event)) {
      return true;
    }
    const headingElement = hasClosestByHeadings(startContainer);
    if (headingElement) {
      if (matchHotKey("\u2318=", event)) {
        const headingMarkerElement = headingElement.querySelector(".vditor-ir__marker--heading");
        if (headingMarkerElement && headingMarkerElement.textContent.trim().length > 1) {
          processHeading2(vditor, headingMarkerElement.textContent.substr(1));
        }
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u2318-", event)) {
        const headingMarkerElement = headingElement.querySelector(".vditor-ir__marker--heading");
        if (headingMarkerElement && headingMarkerElement.textContent.trim().length < 6) {
          processHeading2(vditor, headingMarkerElement.textContent.trim() + "# ");
        }
        event.preventDefault();
        return true;
      }
    }
    const blockElement = hasClosestBlock(startContainer);
    if (event.key === "Backspace" && !isCtrl(event) && !event.shiftKey && !event.altKey && range.toString() === "") {
      if (fixDelete(vditor, range, event, pElement)) {
        return true;
      }
      if (blockElement && blockElement.previousElementSibling && blockElement.tagName !== "UL" && blockElement.tagName !== "OL" && (blockElement.previousElementSibling.getAttribute("data-type") === "code-block" || blockElement.previousElementSibling.getAttribute("data-type") === "math-block")) {
        const rangeStart = getSelectPosition(blockElement, vditor.ir.element, range).start;
        if (rangeStart === 0 || rangeStart === 1 && blockElement.innerText.startsWith(Constants.ZWSP)) {
          range.selectNodeContents(blockElement.previousElementSibling.querySelector(".vditor-ir__marker--pre code"));
          range.collapse(false);
          expandMarker(range, vditor);
          if (blockElement.textContent.trim().replace(Constants.ZWSP, "") === "") {
            blockElement.remove();
            processAfterRender(vditor);
          }
          event.preventDefault();
          return true;
        }
      }
      if (headingElement) {
        const headingLength = headingElement.firstElementChild.textContent.length;
        if (getSelectPosition(headingElement, vditor.ir.element).start === headingLength && headingLength !== 0) {
          range.setStart(headingElement.firstElementChild.firstChild, headingLength - 1);
          range.collapse(true);
          setSelectionFocus(range);
        }
      }
    }
    if ((event.key === "ArrowUp" || event.key === "ArrowDown") && blockElement) {
      blockElement.querySelectorAll(".vditor-ir__node").forEach((item) => {
        if (!item.contains(startContainer)) {
          item.classList.add("vditor-ir__node--hidden");
        }
      });
      if (fixFirefoxArrowUpTable(event, blockElement, range)) {
        return true;
      }
    }
    fixCursorDownInlineMath(range, event.key);
    if (blockElement && keydownToc(blockElement, vditor, event, range)) {
      event.preventDefault();
      return true;
    }
    return false;
  };

  // vditor-master/src/ts/sv/processKeydown.ts
  var processKeydown2 = (vditor, event) => {
    vditor.sv.composingLock = event.isComposing;
    if (event.isComposing) {
      return false;
    }
    if (event.key.indexOf("Arrow") === -1 && event.key !== "Meta" && event.key !== "Control" && event.key !== "Alt" && event.key !== "Shift" && event.key !== "CapsLock" && event.key !== "Escape" && !/^F\d{1,2}$/.test(event.key)) {
      vditor.undo.recordFirstPosition(vditor, event);
    }
    if (event.key !== "Tab" || isCtrl(event) || event.altKey) {
      return false;
    }
    const element = vditor.sv.element;
    const start = element.selectionStart;
    const end = element.selectionEnd;
    if (event.shiftKey) {
      const lineStart = element.value.lastIndexOf("\n", start - 1) + 1;
      const indentation = element.value.substring(lineStart, start).match(/^(\t| {1,4})/);
      if (indentation) {
        element.setRangeText("", lineStart, lineStart + indentation[0].length, "end");
        element.setSelectionRange(start - indentation[0].length, end - indentation[0].length);
      }
    } else {
      element.setRangeText(vditor.options.tab, start, end, "end");
    }
    processAfterRender2(vditor);
    event.preventDefault();
    return true;
  };

  // vditor-master/src/ts/ui/setTheme.ts
  var setTheme = (vditor) => {
    if (vditor.options.theme === "dark") {
      vditor.element.classList.add("vditor--dark");
    } else {
      vditor.element.classList.remove("vditor--dark");
    }
  };

  // vditor-master/src/ts/ui/initUI.ts
  var initUI = (vditor) => {
    vditor.element.innerHTML = "";
    vditor.element.classList.add("vditor");
    if (vditor.options.rtl) {
      vditor.element.setAttribute("dir", "rtl");
    }
    setTheme(vditor);
    setContentTheme(vditor.options.preview.theme.current, vditor.options.preview.theme.path);
    if (typeof vditor.options.height === "number") {
      vditor.element.style.height = vditor.options.height + "px";
    } else {
      vditor.element.style.height = vditor.options.height;
    }
    if (typeof vditor.options.minHeight === "number") {
      vditor.element.style.minHeight = vditor.options.minHeight + "px";
    }
    if (typeof vditor.options.width === "number") {
      vditor.element.style.width = vditor.options.width + "px";
    } else {
      vditor.element.style.width = vditor.options.width;
    }
    vditor.element.appendChild(vditor.toolbar.element);
    const contentElement = document.createElement("div");
    contentElement.className = "vditor-content";
    if (vditor.options.outline.position === "left") {
      contentElement.appendChild(vditor.outline.element);
    }
    contentElement.appendChild(vditor.wysiwyg.element.parentElement);
    contentElement.appendChild(vditor.sv.element);
    contentElement.appendChild(vditor.ir.element.parentElement);
    contentElement.appendChild(vditor.preview.element);
    if (vditor.toolbar.elements.devtools) {
      contentElement.appendChild(vditor.devtools.element);
    }
    if (vditor.options.outline.position === "right") {
      vditor.outline.element.classList.add("vditor-outline--right");
      contentElement.appendChild(vditor.outline.element);
    }
    if (vditor.upload) {
      contentElement.appendChild(vditor.upload.element);
    }
    if (vditor.options.resize.enable) {
      contentElement.appendChild(vditor.resize.element);
    }
    contentElement.appendChild(vditor.hint.element);
    contentElement.appendChild(vditor.tip.element);
    vditor.element.appendChild(contentElement);
    contentElement.addEventListener("click", () => {
      hidePanel(vditor, ["subToolbar"]);
    });
    if (vditor.toolbar.elements.export) {
      vditor.element.insertAdjacentHTML(
        "beforeend",
        '<iframe id="vditorExportIframe" style="width: 100%;height: 0;border: 0"></iframe>'
      );
    }
    setEditMode(vditor, vditor.options.mode, afterRender(vditor));
    document.execCommand("DefaultParagraphSeparator", false, "p");
    if (navigator.userAgent.indexOf("iPhone") > -1 && typeof window.visualViewport !== "undefined") {
      let pendingUpdate = false;
      const viewportHandler = (event) => {
        if (pendingUpdate) {
          return;
        }
        pendingUpdate = true;
        requestAnimationFrame(() => {
          pendingUpdate = false;
          const layoutViewport = vditor.toolbar.element;
          layoutViewport.style.transform = "none";
          if (layoutViewport.getBoundingClientRect().top < 0) {
            layoutViewport.style.transform = `translate(0, ${-layoutViewport.getBoundingClientRect().top}px)`;
          }
        });
      };
      window.visualViewport.addEventListener("scroll", viewportHandler);
      window.visualViewport.addEventListener("resize", viewportHandler);
    }
  };
  var setPadding = (vditor) => {
    const minPadding = window.innerWidth <= Constants.MOBILE_WIDTH ? 10 : 35;
    if (vditor.wysiwyg.element.parentElement.style.display !== "none") {
      const padding = (vditor.wysiwyg.element.parentElement.clientWidth - vditor.options.preview.maxWidth) / 2;
      vditor.wysiwyg.element.style.padding = `10px ${Math.max(minPadding, padding)}px`;
    }
    if (vditor.ir.element.parentElement.style.display !== "none") {
      const padding = (vditor.ir.element.parentElement.clientWidth - vditor.options.preview.maxWidth) / 2;
      vditor.ir.element.style.padding = `10px ${Math.max(minPadding, padding)}px`;
    }
    if (vditor.preview.element.style.display !== "block") {
      vditor.toolbar.element.style.paddingLeft = Math.max(
        5,
        parseInt(vditor[vditor.currentMode].element.style.paddingLeft || "0", 10) + (vditor.options.outline.position === "left" ? vditor.outline.element.offsetWidth : 0)
      ) + "px";
    } else {
      vditor.toolbar.element.style.paddingLeft = 5 + (vditor.options.outline.position === "left" ? vditor.outline.element.offsetWidth : 0) + "px";
    }
  };
  var setTypewriterPosition = (vditor) => {
    if (!vditor.options.typewriterMode) {
      return;
    }
    let height = window.innerHeight;
    if (typeof vditor.options.height === "number") {
      height = vditor.options.height;
      if (typeof vditor.options.minHeight === "number") {
        height = Math.max(height, vditor.options.minHeight);
      }
      height = Math.min(window.innerHeight, height);
    } else {
      height = vditor.element.clientHeight;
    }
    if (vditor.element.classList.contains("vditor--fullscreen")) {
      height = window.innerHeight;
    }
    const editorBottom = (height - vditor.toolbar.element.offsetHeight) / 2 + "px";
    if (vditor.currentMode === "sv") {
      vditor.sv.element.style.paddingBottom = editorBottom;
    } else {
      vditor[vditor.currentMode].element.style.setProperty("--editor-bottom", editorBottom);
    }
  };
  var resizeCb;
  function UIUnbindListener() {
    window.removeEventListener("resize", resizeCb);
  }
  var afterRender = (vditor) => {
    setTypewriterPosition(vditor);
    UIUnbindListener();
    window.addEventListener("resize", resizeCb = () => {
      setPadding(vditor);
      setTypewriterPosition(vditor);
    });
    let initValue = accessLocalStorage() && localStorage.getItem(vditor.options.cache.id);
    if (!vditor.options.cache.enable || !initValue) {
      if (vditor.options.value) {
        initValue = vditor.options.value;
      } else if (vditor.originalInnerHTML) {
        initValue = vditor.lute.HTML2Md(vditor.originalInnerHTML);
      } else if (!vditor.options.cache.enable) {
        initValue = "";
      }
    }
    return initValue || "";
  };

  // vditor-master/src/ts/ir/highlightToolbarIR.ts
  var highlightToolbarIR = (vditor) => {
    clearTimeout(vditor.ir.hlToolbarTimeoutId);
    vditor.ir.hlToolbarTimeoutId = window.setTimeout(() => {
      if (vditor.ir.element.getAttribute("contenteditable") === "false") {
        return;
      }
      if (!selectIsEditor(vditor.ir.element)) {
        return;
      }
      removeCurrentToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);
      enableToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);
      const range = getEditorRange(vditor);
      let typeElement = range.startContainer;
      if (range.startContainer.nodeType === 3) {
        typeElement = range.startContainer.parentElement;
      }
      if (typeElement.classList.contains("vditor-reset")) {
        typeElement = typeElement.childNodes[range.startOffset];
      }
      const headingElement = vditor.currentMode === "sv" ? hasClosestByAttribute(typeElement, "data-type", "heading") : hasClosestByHeadings(typeElement);
      if (headingElement) {
        setCurrentToolbar(vditor.toolbar.elements, ["headings"]);
      }
      const quoteElement = vditor.currentMode === "sv" ? hasClosestByAttribute(typeElement, "data-type", "blockquote") : hasClosestByMatchTag(typeElement, "BLOCKQUOTE");
      if (quoteElement) {
        setCurrentToolbar(vditor.toolbar.elements, ["quote"]);
      }
      const strongElement = hasClosestByAttribute(typeElement, "data-type", "strong");
      if (strongElement) {
        setCurrentToolbar(vditor.toolbar.elements, ["bold"]);
      }
      const emElement = hasClosestByAttribute(typeElement, "data-type", "em");
      if (emElement) {
        setCurrentToolbar(vditor.toolbar.elements, ["italic"]);
      }
      const sElement = hasClosestByAttribute(typeElement, "data-type", "s");
      if (sElement) {
        setCurrentToolbar(vditor.toolbar.elements, ["strike"]);
      }
      const aElement = hasClosestByAttribute(typeElement, "data-type", "a");
      if (aElement) {
        setCurrentToolbar(vditor.toolbar.elements, ["link"]);
      }
      const liElement = hasClosestByMatchTag(typeElement, "LI");
      if (liElement) {
        if (liElement.classList.contains("vditor-task")) {
          setCurrentToolbar(vditor.toolbar.elements, ["check"]);
        } else if (liElement.parentElement.tagName === "OL") {
          setCurrentToolbar(vditor.toolbar.elements, ["ordered-list"]);
        } else if (liElement.parentElement.tagName === "UL") {
          setCurrentToolbar(vditor.toolbar.elements, ["list"]);
        }
        enableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
      } else {
        disableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
      }
      const codeBlockElement = hasClosestByAttribute(typeElement, "data-type", "code-block");
      if (codeBlockElement) {
        disableToolbar(vditor.toolbar.elements, [
          "headings",
          "bold",
          "italic",
          "strike",
          "line",
          "quote",
          "list",
          "ordered-list",
          "check",
          "code",
          "inline-code",
          "upload",
          "link",
          "table",
          "record"
        ]);
        setCurrentToolbar(vditor.toolbar.elements, ["code"]);
      }
      const codeElement = hasClosestByAttribute(typeElement, "data-type", "code");
      if (codeElement) {
        disableToolbar(vditor.toolbar.elements, [
          "headings",
          "bold",
          "italic",
          "strike",
          "line",
          "quote",
          "list",
          "ordered-list",
          "check",
          "code",
          "upload",
          "link",
          "table",
          "record"
        ]);
        setCurrentToolbar(vditor.toolbar.elements, ["inline-code"]);
      }
      const tableElement = hasClosestByAttribute(typeElement, "data-type", "table");
      if (tableElement) {
        disableToolbar(vditor.toolbar.elements, [
          "headings",
          "list",
          "ordered-list",
          "check",
          "line",
          "quote",
          "code",
          "table"
        ]);
      }
    }, 200);
  };

  // vditor-master/src/ts/wysiwyg/setHeading.ts
  var createBlockElement = (element, tagName) => {
    const blockElement = element.ownerDocument.createElement(tagName);
    blockElement.setAttribute("data-block", "0");
    return blockElement;
  };
  var replaceBlockElement = (element, tagName) => {
    const blockElement = createBlockElement(element, tagName);
    while (element.firstChild) {
      blockElement.appendChild(element.firstChild);
    }
    element.replaceWith(blockElement);
    return blockElement;
  };
  var isListItemBlock = (node) => {
    if (node.nodeType !== 1) {
      return false;
    }
    const element = node;
    return element.getAttribute("data-block") === "0" || element.tagName === "INPUT";
  };
  var getListItemInlineNodes = (itemElement, wbrElement) => {
    let anchorNode = wbrElement;
    while (anchorNode.parentNode && !anchorNode.parentNode.isSameNode(itemElement)) {
      anchorNode = anchorNode.parentNode;
    }
    if (!anchorNode.parentNode?.isSameNode(itemElement)) {
      return [];
    }
    let firstNode = anchorNode;
    let lastNode = anchorNode;
    while (firstNode.previousSibling && !isListItemBlock(firstNode.previousSibling)) {
      firstNode = firstNode.previousSibling;
    }
    while (lastNode.nextSibling && !isListItemBlock(lastNode.nextSibling)) {
      lastNode = lastNode.nextSibling;
    }
    if (firstNode.previousSibling instanceof HTMLInputElement && firstNode.nodeType === 3) {
      const leadingWhitespace = firstNode.textContent.match(/^\s+/)?.[0];
      if (leadingWhitespace) {
        firstNode.textContent = firstNode.textContent.substring(leadingWhitespace.length);
        itemElement.insertBefore(itemElement.ownerDocument.createTextNode(leadingWhitespace), firstNode);
      }
    }
    const nodes = [];
    let node = firstNode;
    while (node) {
      nodes.push(node);
      if (node.isSameNode(lastNode)) {
        break;
      }
      node = node.nextSibling;
    }
    return nodes;
  };
  var setListItemHeading = (itemElement, wbrElement, tagName) => {
    const inlineNodes = getListItemInlineNodes(itemElement, wbrElement);
    if (inlineNodes.length === 0) {
      return false;
    }
    const headingElement = createBlockElement(itemElement, tagName);
    itemElement.insertBefore(headingElement, inlineNodes[0]);
    inlineNodes.forEach((node) => {
      headingElement.appendChild(node);
    });
    if (headingElement.innerHTML.trim() === "<wbr>") {
      headingElement.appendChild(itemElement.ownerDocument.createElement("br"));
    }
    return true;
  };
  var unwrapBlockElement = (element) => {
    const fragment = element.ownerDocument.createDocumentFragment();
    while (element.firstChild) {
      fragment.appendChild(element.firstChild);
    }
    element.replaceWith(fragment);
  };
  var setHeading = (vditor, tagName) => {
    const range = getEditorRange(vditor);
    let blockElement = hasClosestBlock(range.startContainer);
    if (!blockElement) {
      blockElement = range.startContainer.childNodes[range.startOffset];
    }
    if (!blockElement && vditor.wysiwyg.element.children.length === 0) {
      blockElement = vditor.wysiwyg.element;
    }
    if (blockElement && !blockElement.classList.contains("vditor-wysiwyg__block")) {
      const wbrElement = document.createElement("wbr");
      range.insertNode(wbrElement);
      if (blockElement.innerHTML.trim() === "<wbr>") {
        blockElement.innerHTML = "<wbr><br>";
      }
      const itemElement = hasClosestByMatchTag(wbrElement, "LI");
      if (itemElement && blockElement.isSameNode(itemElement.parentElement)) {
        if (!setListItemHeading(itemElement, wbrElement, tagName)) {
          wbrElement.remove();
          return;
        }
      } else if (blockElement.tagName === "BLOCKQUOTE" || blockElement.classList.contains("vditor-reset")) {
        const headingElement = createBlockElement(blockElement, tagName);
        while (blockElement.firstChild) {
          headingElement.appendChild(blockElement.firstChild);
        }
        blockElement.appendChild(headingElement);
      } else {
        replaceBlockElement(blockElement, tagName);
      }
      setRangeByWbr(vditor.wysiwyg.element, range);
      renderToc(vditor);
    }
  };
  var removeHeading = (vditor) => {
    const range = getSelection().getRangeAt(0);
    let blockElement = hasClosestBlock(range.startContainer);
    if (!blockElement) {
      blockElement = range.startContainer.childNodes[range.startOffset];
    }
    if (blockElement) {
      range.insertNode(document.createElement("wbr"));
      if (blockElement.parentElement?.tagName === "LI" && blockElement.parentElement.parentElement?.getAttribute("data-tight") === "true") {
        unwrapBlockElement(blockElement);
      } else {
        replaceBlockElement(blockElement, "p");
      }
      setRangeByWbr(vditor.wysiwyg.element, range);
      renderToc(vditor);
    }
    vditor.wysiwyg.popover.style.display = "none";
  };

  // vditor-master/src/ts/wysiwyg/showCode.ts
  var showCode = (previewElement, vditor, first = true) => {
    const previousElement = previewElement.previousElementSibling;
    const range = previousElement.ownerDocument.createRange();
    if (previousElement.tagName === "CODE") {
      previousElement.style.display = "inline-block";
      if (first) {
        range.setStart(previousElement.firstChild, 1);
      } else {
        range.selectNodeContents(previousElement);
      }
    } else {
      previousElement.style.display = "block";
      if (!previousElement.firstChild.firstChild) {
        previousElement.firstChild.appendChild(document.createTextNode(""));
      }
      range.selectNodeContents(previousElement.firstChild);
    }
    if (first) {
      range.collapse(true);
    } else {
      range.collapse(false);
    }
    setSelectionFocus(range);
    if (previewElement.firstElementChild.classList.contains("language-mindmap")) {
      return;
    }
    scrollCenter(vditor);
  };

  // vditor-master/src/ts/wysiwyg/processKeydown.ts
  var fixAndroidCursor = (vditor, range, event) => {
    if (navigator.userAgent.indexOf("Android") === -1 || event.ctrlKey || event.metaKey || event.altKey) {
      return false;
    }
    const pElement = hasClosestByMatchTag(range.startContainer, "P");
    const startElement = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
    if (!pElement || !pElement.isSameNode(startElement) || !pElement.parentElement.isSameNode(vditor.wysiwyg.element)) {
      return false;
    }
    let direction;
    let granularity;
    if (event.key === "ArrowLeft") {
      direction = "backward";
      granularity = "character";
    } else if (event.key === "ArrowRight") {
      direction = "forward";
      granularity = "character";
    } else if (event.key === "ArrowUp") {
      direction = "backward";
      granularity = "line";
    } else if (event.key === "ArrowDown") {
      direction = "forward";
      granularity = "line";
    } else if (event.key === "End") {
      direction = "forward";
      granularity = "documentboundary";
    } else {
      return false;
    }
    const selection = window.getSelection();
    if (typeof selection.modify !== "function") {
      return false;
    }
    selection.modify(event.shiftKey ? "extend" : "move", direction, granularity);
    event.preventDefault();
    return true;
  };
  var processKeydown3 = (vditor, event) => {
    vditor.wysiwyg.composingLock = event.isComposing;
    if (event.isComposing) {
      return false;
    }
    if (event.key.indexOf("Arrow") === -1 && event.key !== "Meta" && event.key !== "Control" && event.key !== "Alt" && event.key !== "Shift" && event.key !== "CapsLock" && event.key !== "Escape" && !/^F\d{1,2}$/.test(event.key)) {
      vditor.undo.recordFirstPosition(vditor, event);
    }
    const range = getEditorRange(vditor);
    const startContainer = range.startContainer;
    if (fixAndroidCursor(vditor, range, event)) {
      return true;
    }
    if (!fixGSKeyBackspace(event, vditor, startContainer)) {
      return false;
    }
    fixCJKPosition(range, vditor, event);
    fixHR(range);
    if (event.key !== "Enter" && event.key !== "Tab" && event.key !== "Backspace" && event.key.indexOf("Arrow") === -1 && !isCtrl(event) && event.key !== "Escape" && event.key !== "Delete") {
      return false;
    }
    const blockElement = hasClosestBlock(startContainer);
    const pElement = hasClosestByMatchTag(startContainer, "P");
    if (fixMarkdown(event, vditor, pElement, range)) {
      return true;
    }
    if (fixList(range, vditor, pElement, event)) {
      return true;
    }
    if (fixTable(vditor, event, range)) {
      return true;
    }
    const codeRenderElement = hasClosestByClassName(startContainer, "vditor-wysiwyg__block");
    if (codeRenderElement) {
      if (event.key === "Escape" && codeRenderElement.children.length === 2) {
        vditor.wysiwyg.popover.style.display = "none";
        codeRenderElement.firstElementChild.style.display = "none";
        vditor.wysiwyg.element.blur();
        event.preventDefault();
        return true;
      }
      if (!isCtrl(event) && !event.shiftKey && event.altKey && event.key === "Enter" && codeRenderElement.getAttribute("data-type") === "code-block") {
        const inputElemment = vditor.wysiwyg.popover.querySelector(".vditor-input");
        inputElemment.focus();
        inputElemment.select();
        event.preventDefault();
        return true;
      }
      if (codeRenderElement.getAttribute("data-block") === "0") {
        if (fixCodeBlock(vditor, event, codeRenderElement.firstElementChild, range)) {
          return true;
        }
        if (insertAfterBlock(
          vditor,
          event,
          range,
          codeRenderElement.firstElementChild,
          codeRenderElement
        )) {
          return true;
        }
        if (codeRenderElement.getAttribute("data-type") !== "yaml-front-matter" && insertBeforeBlock(
          vditor,
          event,
          range,
          codeRenderElement.firstElementChild,
          codeRenderElement
        )) {
          return true;
        }
      }
    }
    if (fixBlockquote(vditor, range, event, pElement)) {
      return true;
    }
    const topBQElement = hasTopClosestByTag(startContainer, "BLOCKQUOTE");
    if (topBQElement) {
      if (!event.shiftKey && event.altKey && event.key === "Enter") {
        if (!isCtrl(event)) {
          range.setStartAfter(topBQElement);
        } else {
          range.setStartBefore(topBQElement);
        }
        setSelectionFocus(range);
        const node = document.createElement("p");
        node.setAttribute("data-block", "0");
        node.innerHTML = "\n";
        range.insertNode(node);
        range.collapse(true);
        setSelectionFocus(range);
        afterRenderEvent(vditor);
        scrollCenter(vditor);
        event.preventDefault();
        return true;
      }
    }
    const headingElement = hasClosestByHeadings(startContainer);
    if (headingElement) {
      if (headingElement.tagName === "H6" && startContainer.textContent.length === range.startOffset && !isCtrl(event) && !event.shiftKey && !event.altKey && event.key === "Enter") {
        const pTempElement = document.createElement("p");
        pTempElement.textContent = "\n";
        pTempElement.setAttribute("data-block", "0");
        startContainer.parentElement.insertAdjacentElement("afterend", pTempElement);
        range.setStart(pTempElement, 0);
        setSelectionFocus(range);
        afterRenderEvent(vditor);
        scrollCenter(vditor);
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u2318=", event)) {
        const index = parseInt(headingElement.tagName.substr(1), 10) - 1;
        if (index > 0) {
          setHeading(vditor, `h${index}`);
          afterRenderEvent(vditor);
        }
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u2318-", event)) {
        const index = parseInt(headingElement.tagName.substr(1), 10) + 1;
        if (index < 7) {
          setHeading(vditor, `h${index}`);
          afterRenderEvent(vditor);
        }
        event.preventDefault();
        return true;
      }
      if (event.key === "Backspace" && !isCtrl(event) && !event.shiftKey && !event.altKey && headingElement.textContent.length === 1) {
        removeHeading(vditor);
      }
    }
    if (fixTask(vditor, range, event)) {
      return true;
    }
    if (event.altKey && event.key === "Enter" && !isCtrl(event) && !event.shiftKey) {
      const aElement = hasClosestByMatchTag(startContainer, "A");
      const linRefElement = hasClosestByAttribute(startContainer, "data-type", "link-ref");
      const footnoteRefElement = hasClosestByAttribute(startContainer, "data-type", "footnotes-ref");
      if (aElement || linRefElement || footnoteRefElement || headingElement && headingElement.tagName.length === 2) {
        const inputElement = vditor.wysiwyg.popover.querySelector("input");
        inputElement.focus();
        inputElement.select();
      }
    }
    if (removeBlockElement(vditor, event)) {
      return true;
    }
    if (matchHotKey("\u21E7\u2318U", event)) {
      const itemElement = vditor.wysiwyg.popover.querySelector('[data-type="up"]');
      if (itemElement) {
        itemElement.click();
        event.preventDefault();
        return true;
      }
    }
    if (matchHotKey("\u21E7\u2318D", event)) {
      const itemElement = vditor.wysiwyg.popover.querySelector('[data-type="down"]');
      if (itemElement) {
        itemElement.click();
        event.preventDefault();
        return true;
      }
    }
    if (fixTab(vditor, range, event)) {
      return true;
    }
    if (!isCtrl(event) && event.shiftKey && !event.altKey && event.key === "Enter" && startContainer.parentElement.tagName !== "LI" && startContainer.parentElement.tagName !== "P") {
      if (["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(startContainer.parentElement.tagName)) {
        range.insertNode(document.createTextNode("\n" + Constants.ZWSP));
      } else {
        range.insertNode(document.createTextNode("\n"));
      }
      range.collapse(false);
      setSelectionFocus(range);
      afterRenderEvent(vditor);
      scrollCenter(vditor);
      event.preventDefault();
      return true;
    }
    if (event.key === "Backspace" && !isCtrl(event) && !event.shiftKey && !event.altKey && range.toString() === "") {
      if (fixDelete(vditor, range, event, pElement)) {
        return true;
      }
      if (blockElement) {
        if (blockElement.previousElementSibling && blockElement.previousElementSibling.classList.contains("vditor-wysiwyg__block") && blockElement.previousElementSibling.getAttribute("data-block") === "0" && blockElement.tagName !== "UL" && blockElement.tagName !== "OL") {
          const rangeStart = getSelectPosition(blockElement, vditor.wysiwyg.element, range).start;
          if (rangeStart === 0 && range.startOffset === 0 || // https://github.com/Vanessa219/vditor/issues/894
          rangeStart === 1 && blockElement.innerText.startsWith(Constants.ZWSP)) {
            showCode(blockElement.previousElementSibling.lastElementChild, vditor, false);
            if (blockElement.innerHTML.trim().replace(Constants.ZWSP, "") === "") {
              blockElement.remove();
              afterRenderEvent(vditor);
            }
            event.preventDefault();
            return true;
          }
        }
        const rangeStartOffset = range.startOffset;
        if (range.toString() === "" && startContainer.nodeType === 3 && startContainer.textContent.charAt(rangeStartOffset - 2) === "\n" && startContainer.textContent.charAt(rangeStartOffset - 1) !== Constants.ZWSP && ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(startContainer.parentElement.tagName)) {
          startContainer.textContent = startContainer.textContent.substring(0, rangeStartOffset - 1) + Constants.ZWSP;
          range.setStart(startContainer, rangeStartOffset);
          range.collapse(true);
          afterRenderEvent(vditor);
          event.preventDefault();
          return true;
        }
        if (startContainer.textContent === Constants.ZWSP && range.startOffset === 1 && !startContainer.previousSibling && nextIsCode(range)) {
          startContainer.textContent = "";
        }
        blockElement.querySelectorAll("span.vditor-wysiwyg__block[data-type='math-inline']").forEach((item) => {
          item.firstElementChild.style.display = "inline";
          item.lastElementChild.style.display = "none";
        });
        blockElement.querySelectorAll("span.vditor-wysiwyg__block[data-type='html-entity']").forEach((item) => {
          item.firstElementChild.style.display = "inline";
          item.lastElementChild.style.display = "none";
        });
      }
    }
    if (isFirefox() && range.startOffset === 1 && startContainer.textContent.indexOf(Constants.ZWSP) > -1 && startContainer.previousSibling && startContainer.previousSibling.nodeType !== 3 && startContainer.previousSibling.tagName === "CODE" && (event.key === "Backspace" || event.key === "ArrowLeft")) {
      range.selectNodeContents(startContainer.previousSibling);
      range.collapse(false);
      event.preventDefault();
      return true;
    }
    if (fixFirefoxArrowUpTable(event, blockElement, range)) {
      event.preventDefault();
      return true;
    }
    fixCursorDownInlineMath(range, event.key);
    if (event.key === "ArrowDown") {
      const nextElement = startContainer.nextSibling;
      if (nextElement && nextElement.nodeType !== 3 && nextElement.getAttribute("data-type") === "math-inline") {
        range.setStartAfter(nextElement);
      }
    }
    if (blockElement && keydownToc(blockElement, vditor, event, range)) {
      event.preventDefault();
      return true;
    }
    return false;
  };
  var removeBlockElement = (vditor, event) => {
    if (matchHotKey("\u21E7\u2318X", event)) {
      const itemElement = vditor.wysiwyg.popover.querySelector('[data-type="remove"]');
      if (itemElement) {
        itemElement.click();
      }
      event.preventDefault();
      return true;
    }
  };

  // vditor-master/src/ts/wysiwyg/highlightToolbarWYSIWYG.ts
  var highlightToolbarWYSIWYG = (vditor) => {
    clearTimeout(vditor.wysiwyg.hlToolbarTimeoutId);
    vditor.wysiwyg.hlToolbarTimeoutId = window.setTimeout(() => {
      if (vditor.wysiwyg.element.getAttribute("contenteditable") === "false") {
        return;
      }
      if (!selectIsEditor(vditor.wysiwyg.element)) {
        return;
      }
      removeCurrentToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);
      enableToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);
      const range = getSelection().getRangeAt(0);
      let typeElement = range.startContainer;
      if (range.startContainer.nodeType === 3) {
        typeElement = range.startContainer.parentElement;
      } else {
        typeElement = typeElement.childNodes[range.startOffset >= typeElement.childNodes.length ? typeElement.childNodes.length - 1 : range.startOffset];
      }
      const footnotesElement = hasClosestByAttribute(typeElement, "data-type", "footnotes-block");
      if (footnotesElement) {
        vditor.wysiwyg.popover.innerHTML = "";
        genClose(footnotesElement, vditor);
        customWysiwygToolbar(vditor, "footnotes-block");
        setPopoverPosition(vditor, footnotesElement);
        return;
      }
      const liElement = hasClosestByMatchTag(typeElement, "LI");
      if (liElement) {
        if (liElement.classList.contains("vditor-task")) {
          setCurrentToolbar(vditor.toolbar.elements, ["check"]);
        } else if (liElement.parentElement.tagName === "OL") {
          setCurrentToolbar(vditor.toolbar.elements, ["ordered-list"]);
        } else if (liElement.parentElement.tagName === "UL") {
          setCurrentToolbar(vditor.toolbar.elements, ["list"]);
        }
        enableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
      } else {
        disableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
      }
      if (hasClosestByMatchTag(typeElement, "BLOCKQUOTE")) {
        setCurrentToolbar(vditor.toolbar.elements, ["quote"]);
      }
      if (hasClosestByMatchTag(typeElement, "B") || hasClosestByMatchTag(typeElement, "STRONG")) {
        setCurrentToolbar(vditor.toolbar.elements, ["bold"]);
      }
      if (hasClosestByMatchTag(typeElement, "I") || hasClosestByMatchTag(typeElement, "EM")) {
        setCurrentToolbar(vditor.toolbar.elements, ["italic"]);
      }
      if (hasClosestByMatchTag(typeElement, "STRIKE") || hasClosestByMatchTag(typeElement, "S")) {
        setCurrentToolbar(vditor.toolbar.elements, ["strike"]);
      }
      vditor.wysiwyg.element.querySelectorAll(".vditor-comment--focus").forEach((item) => {
        item.classList.remove("vditor-comment--focus");
      });
      const commentElement = hasClosestByClassName(typeElement, "vditor-comment");
      if (commentElement) {
        let ids = commentElement.getAttribute("data-cmtids").split(" ");
        if (ids.length > 1 && commentElement.nextSibling.isSameNode(commentElement.nextElementSibling)) {
          const nextIds = commentElement.nextElementSibling.getAttribute("data-cmtids").split(" ");
          ids.find((id) => {
            if (nextIds.includes(id)) {
              ids = [id];
              return true;
            }
          });
        }
        vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach((item) => {
          if (item.getAttribute("data-cmtids").indexOf(ids[0]) > -1) {
            item.classList.add("vditor-comment--focus");
          }
        });
      }
      const aElement = hasClosestByMatchTag(typeElement, "A");
      if (aElement) {
        setCurrentToolbar(vditor.toolbar.elements, ["link"]);
      }
      const tableElement = hasClosestByMatchTag(typeElement, "TABLE");
      const headingElement = hasClosestByHeadings(typeElement);
      if (hasClosestByMatchTag(typeElement, "CODE")) {
        if (hasClosestByMatchTag(typeElement, "PRE")) {
          disableToolbar(vditor.toolbar.elements, [
            "headings",
            "bold",
            "italic",
            "strike",
            "line",
            "quote",
            "list",
            "ordered-list",
            "check",
            "code",
            "inline-code",
            "upload",
            "link",
            "table",
            "record"
          ]);
          setCurrentToolbar(vditor.toolbar.elements, ["code"]);
        } else {
          disableToolbar(vditor.toolbar.elements, [
            "headings",
            "bold",
            "italic",
            "strike",
            "line",
            "quote",
            "list",
            "ordered-list",
            "check",
            "code",
            "upload",
            "link",
            "table",
            "record"
          ]);
          setCurrentToolbar(vditor.toolbar.elements, ["inline-code"]);
        }
      } else if (headingElement) {
        disableToolbar(vditor.toolbar.elements, ["bold"]);
        setCurrentToolbar(vditor.toolbar.elements, ["headings"]);
      } else if (tableElement) {
        disableToolbar(vditor.toolbar.elements, ["table"]);
      }
      const tocElement = hasClosestByClassName(typeElement, "vditor-toc");
      if (tocElement) {
        vditor.wysiwyg.popover.innerHTML = "";
        genClose(tocElement, vditor);
        customWysiwygToolbar(vditor, "vditor-toc");
        setPopoverPosition(vditor, tocElement);
        return;
      }
      const blockquoteElement = hasClosestByTag(typeElement, "BLOCKQUOTE");
      if (blockquoteElement) {
        vditor.wysiwyg.popover.innerHTML = "";
        genUp(range, blockquoteElement, vditor);
        genDown(range, blockquoteElement, vditor);
        genClose(blockquoteElement, vditor);
        customWysiwygToolbar(vditor, "blockquote");
        setPopoverPosition(vditor, blockquoteElement);
      }
      if (liElement) {
        vditor.wysiwyg.popover.innerHTML = "";
        genUp(range, liElement, vditor);
        genDown(range, liElement, vditor);
        genClose(liElement, vditor);
        customWysiwygToolbar(vditor, "li");
        setPopoverPosition(vditor, liElement);
      }
      if (tableElement) {
        const lang = vditor.options.lang;
        const options = vditor.options;
        vditor.wysiwyg.popover.innerHTML = "";
        const updateTable = () => {
          const oldRow = tableElement.rows.length;
          const oldColumn = tableElement.rows[0].cells.length;
          const row = parseInt(input3.value, 10) || oldRow;
          const column = parseInt(input22.value, 10) || oldColumn;
          if (row === oldRow && oldColumn === column) {
            return;
          }
          if (oldColumn !== column) {
            const columnDiff = column - oldColumn;
            for (let i = 0; i < tableElement.rows.length; i++) {
              if (columnDiff > 0) {
                for (let j = 0; j < columnDiff; j++) {
                  if (i === 0) {
                    tableElement.rows[i].lastElementChild.insertAdjacentHTML("afterend", "<th> </th>");
                  } else {
                    tableElement.rows[i].lastElementChild.insertAdjacentHTML("afterend", "<td> </td>");
                  }
                }
              } else {
                for (let k = oldColumn - 1; k >= column; k--) {
                  tableElement.rows[i].cells[k].remove();
                }
              }
            }
          }
          if (oldRow !== row) {
            const rowDiff = row - oldRow;
            if (rowDiff > 0) {
              let rowHTML = "<tr>";
              for (let m = 0; m < column; m++) {
                rowHTML += "<td> </td>";
              }
              for (let l = 0; l < rowDiff; l++) {
                if (tableElement.querySelector("tbody")) {
                  tableElement.querySelector("tbody").insertAdjacentHTML("beforeend", rowHTML);
                } else {
                  tableElement.querySelector("thead").insertAdjacentHTML("afterend", rowHTML + "</tr>");
                }
              }
            } else {
              for (let m = oldRow - 1; m >= row; m--) {
                tableElement.rows[m].remove();
                if (tableElement.rows.length === 1) {
                  tableElement.querySelector("tbody").remove();
                }
              }
            }
          }
          if (typeof vditor.options.input === "function") {
            vditor.options.input(getMarkdown(vditor));
          }
        };
        const setAlign = (type) => {
          setTableAlign(tableElement, type);
          if (type === "right") {
            left.classList.remove("vditor-icon--current");
            center.classList.remove("vditor-icon--current");
            right.classList.add("vditor-icon--current");
          } else if (type === "center") {
            left.classList.remove("vditor-icon--current");
            right.classList.remove("vditor-icon--current");
            center.classList.add("vditor-icon--current");
          } else {
            center.classList.remove("vditor-icon--current");
            right.classList.remove("vditor-icon--current");
            left.classList.add("vditor-icon--current");
          }
          setSelectionFocus(range);
          afterRenderEvent(vditor);
        };
        const td = hasClosestByMatchTag(typeElement, "TD");
        const th = hasClosestByMatchTag(typeElement, "TH");
        let alignType = "left";
        if (td) {
          alignType = td.getAttribute("align") || "left";
        } else if (th) {
          alignType = th.getAttribute("align") || "center";
        }
        const left = document.createElement("button");
        left.setAttribute("type", "button");
        left.setAttribute("aria-label", window.VditorI18n.alignLeft + "<" + updateHotkeyTip("\u21E7\u2318L") + ">");
        left.setAttribute("data-type", "left");
        left.innerHTML = '<svg><use xlink:href="#vditor-icon-align-left"></use></svg>';
        left.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (alignType === "left" ? " vditor-icon--current" : "");
        left.onclick = () => {
          setAlign("left");
        };
        const center = document.createElement("button");
        center.setAttribute("type", "button");
        center.setAttribute("aria-label", window.VditorI18n.alignCenter + "<" + updateHotkeyTip("\u21E7\u2318C") + ">");
        center.setAttribute("data-type", "center");
        center.innerHTML = '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>';
        center.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (alignType === "center" ? " vditor-icon--current" : "");
        center.onclick = () => {
          setAlign("center");
        };
        const right = document.createElement("button");
        right.setAttribute("type", "button");
        right.setAttribute("aria-label", window.VditorI18n.alignRight + "<" + updateHotkeyTip("\u21E7\u2318R") + ">");
        right.setAttribute("data-type", "right");
        right.innerHTML = '<svg><use xlink:href="#vditor-icon-align-right"></use></svg>';
        right.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (alignType === "right" ? " vditor-icon--current" : "");
        right.onclick = () => {
          setAlign("right");
        };
        const insertRowElement = document.createElement("button");
        insertRowElement.setAttribute("type", "button");
        insertRowElement.setAttribute("aria-label", window.VditorI18n.insertRowBelow + "<" + updateHotkeyTip("\u2318=") + ">");
        insertRowElement.setAttribute("data-type", "insertRow");
        insertRowElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-row"></use></svg>';
        insertRowElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
        insertRowElement.onclick = () => {
          const startContainer = getSelection().getRangeAt(0).startContainer;
          const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
          if (cellElement) {
            insertRow(vditor, range, cellElement);
          }
        };
        const insertRowBElement = document.createElement("button");
        insertRowBElement.setAttribute("type", "button");
        insertRowBElement.setAttribute(
          "aria-label",
          window.VditorI18n.insertRowAbove + "<" + updateHotkeyTip("\u21E7\u2318F") + ">"
        );
        insertRowBElement.setAttribute("data-type", "insertRow");
        insertRowBElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-rowb"></use></svg>';
        insertRowBElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
        insertRowBElement.onclick = () => {
          const startContainer = getSelection().getRangeAt(0).startContainer;
          const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
          if (cellElement) {
            insertRowAbove(vditor, range, cellElement);
          }
        };
        const insertColumnElement = document.createElement("button");
        insertColumnElement.setAttribute("type", "button");
        insertColumnElement.setAttribute("aria-label", window.VditorI18n.insertColumnRight + "<" + updateHotkeyTip("\u21E7\u2318=") + ">");
        insertColumnElement.setAttribute("data-type", "insertColumn");
        insertColumnElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-column"></use></svg>';
        insertColumnElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
        insertColumnElement.onclick = () => {
          const startContainer = getSelection().getRangeAt(0).startContainer;
          const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
          if (cellElement) {
            insertColumn(vditor, tableElement, cellElement);
          }
        };
        const insertColumnBElement = document.createElement("button");
        insertColumnBElement.setAttribute("type", "button");
        insertColumnBElement.setAttribute("aria-label", window.VditorI18n.insertColumnLeft + "<" + updateHotkeyTip("\u21E7\u2318G") + ">");
        insertColumnBElement.setAttribute("data-type", "insertColumn");
        insertColumnBElement.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-columnb"></use></svg>';
        insertColumnBElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
        insertColumnBElement.onclick = () => {
          const startContainer = getSelection().getRangeAt(0).startContainer;
          const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
          if (cellElement) {
            insertColumn(vditor, tableElement, cellElement, "beforebegin");
          }
        };
        const deleteRowElement = document.createElement("button");
        deleteRowElement.setAttribute("type", "button");
        deleteRowElement.setAttribute("aria-label", window.VditorI18n["delete-row"] + "<" + updateHotkeyTip("\u2318-") + ">");
        deleteRowElement.setAttribute("data-type", "deleteRow");
        deleteRowElement.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-row"></use></svg>';
        deleteRowElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
        deleteRowElement.onclick = () => {
          const startContainer = getSelection().getRangeAt(0).startContainer;
          const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
          if (cellElement) {
            deleteRow(vditor, range, cellElement);
          }
        };
        const deleteColumnElement = document.createElement("button");
        deleteColumnElement.setAttribute("type", "button");
        deleteColumnElement.setAttribute("aria-label", window.VditorI18n["delete-column"] + "<" + updateHotkeyTip("\u21E7\u2318-") + ">");
        deleteColumnElement.setAttribute("data-type", "deleteColumn");
        deleteColumnElement.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-column"></use></svg>';
        deleteColumnElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
        deleteColumnElement.onclick = () => {
          const startContainer = getSelection().getRangeAt(0).startContainer;
          const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
          if (cellElement) {
            deleteColumn(vditor, range, tableElement, cellElement);
          }
        };
        const inputWrap = document.createElement("span");
        inputWrap.setAttribute("aria-label", window.VditorI18n.row);
        inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
        const input3 = document.createElement("input");
        inputWrap.appendChild(input3);
        input3.type = "number";
        input3.min = "1";
        input3.className = "vditor-input";
        input3.style.width = "42px";
        input3.style.textAlign = "center";
        input3.setAttribute("placeholder", window.VditorI18n.row);
        input3.value = tableElement.rows.length.toString();
        input3.oninput = () => {
          updateTable();
        };
        input3.onkeydown = (event) => {
          if (event.isComposing) {
            return;
          }
          if (event.key === "Tab") {
            input22.focus();
            input22.select();
            event.preventDefault();
            return;
          }
          if (removeBlockElement(vditor, event)) {
            return;
          }
          if (focusToElement(event, range)) {
            return;
          }
        };
        const input2Wrap = document.createElement("span");
        input2Wrap.setAttribute("aria-label", window.VditorI18n.column);
        input2Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
        const input22 = document.createElement("input");
        input2Wrap.appendChild(input22);
        input22.type = "number";
        input22.min = "1";
        input22.className = "vditor-input";
        input22.style.width = "42px";
        input22.style.textAlign = "center";
        input22.setAttribute("placeholder", window.VditorI18n.column);
        input22.value = tableElement.rows[0].cells.length.toString();
        input22.oninput = () => {
          updateTable();
        };
        input22.onkeydown = (event) => {
          if (event.isComposing) {
            return;
          }
          if (event.key === "Tab") {
            input3.focus();
            input3.select();
            event.preventDefault();
            return;
          }
          if (removeBlockElement(vditor, event)) {
            return;
          }
          if (focusToElement(event, range)) {
            return;
          }
        };
        genUp(range, tableElement, vditor);
        genDown(range, tableElement, vditor);
        genClose(tableElement, vditor);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", left);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", center);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", right);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertRowBElement);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertRowElement);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertColumnBElement);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", insertColumnElement);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", deleteRowElement);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", deleteColumnElement);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
        vditor.wysiwyg.popover.insertAdjacentHTML("beforeend", " x ");
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input2Wrap);
        customWysiwygToolbar(vditor, "table");
        setPopoverPosition(vditor, tableElement);
      }
      const linkRefElement = hasClosestByAttribute(typeElement, "data-type", "link-ref");
      if (linkRefElement) {
        genLinkRefPopover(vditor, linkRefElement, range);
      }
      const footnotesRefElement = hasClosestByAttribute(typeElement, "data-type", "footnotes-ref");
      if (footnotesRefElement) {
        const lang = vditor.options.lang;
        const options = vditor.options;
        vditor.wysiwyg.popover.innerHTML = "";
        const inputWrap = document.createElement("span");
        inputWrap.setAttribute("aria-label", window.VditorI18n.footnoteRef + "<" + updateHotkeyTip("\u2325Enter") + ">");
        inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
        const input3 = document.createElement("input");
        inputWrap.appendChild(input3);
        input3.className = "vditor-input";
        input3.setAttribute("placeholder", window.VditorI18n.footnoteRef + "<" + updateHotkeyTip("\u2325Enter") + ">");
        input3.style.width = "120px";
        input3.value = footnotesRefElement.getAttribute("data-footnotes-label");
        input3.oninput = () => {
          if (input3.value.trim() !== "") {
            footnotesRefElement.setAttribute("data-footnotes-label", input3.value);
          }
          if (typeof vditor.options.input === "function") {
            vditor.options.input(getMarkdown(vditor));
          }
        };
        input3.onkeydown = (event) => {
          if (event.isComposing) {
            return;
          }
          if (removeBlockElement(vditor, event)) {
            return;
          }
          if (focusToElement(event, range)) {
            return;
          }
        };
        genClose(footnotesRefElement, vditor);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
        customWysiwygToolbar(vditor, "footnotes-ref");
        setPopoverPosition(vditor, footnotesRefElement);
      }
      let blockRenderElement = hasClosestByClassName(typeElement, "vditor-wysiwyg__block");
      const isBlock = blockRenderElement ? blockRenderElement.getAttribute("data-type").indexOf("block") > -1 : false;
      vditor.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview").forEach((itemElement) => {
        if (!blockRenderElement || blockRenderElement && isBlock && !blockRenderElement.contains(itemElement)) {
          const previousElement = itemElement.previousElementSibling;
          previousElement.style.display = "none";
        }
      });
      if (blockRenderElement && isBlock) {
        vditor.wysiwyg.popover.innerHTML = "";
        genUp(range, blockRenderElement, vditor);
        genDown(range, blockRenderElement, vditor);
        genClose(blockRenderElement, vditor);
        if (blockRenderElement.getAttribute("data-type") === "code-block") {
          const languageWrap = document.createElement("span");
          languageWrap.setAttribute("aria-label", window.VditorI18n.language + "<" + updateHotkeyTip("\u2325Enter") + ">");
          languageWrap.className = "vditor-tooltipped vditor-tooltipped__n";
          const language = document.createElement("input");
          languageWrap.appendChild(language);
          const codeElement = blockRenderElement.firstElementChild.firstElementChild;
          language.className = "vditor-input";
          language.setAttribute(
            "placeholder",
            window.VditorI18n.language + "<" + updateHotkeyTip("\u2325Enter") + ">"
          );
          language.value = codeElement.className.indexOf("language-") > -1 ? codeElement.className.split("-")[1].split(" ")[0] : "";
          language.oninput = (e) => {
            if (language.value.trim() !== "") {
              codeElement.className = `language-${language.value}`;
            } else {
              codeElement.className = "";
              vditor.hint.recentLanguage = "";
            }
            if (blockRenderElement.lastElementChild.classList.contains("vditor-wysiwyg__preview")) {
              blockRenderElement.lastElementChild.innerHTML = blockRenderElement.firstElementChild.innerHTML;
              processCodeRender(blockRenderElement.lastElementChild, vditor);
            }
            afterRenderEvent(vditor);
            if (e.detail === 1) {
              range.setStart(codeElement.firstChild, 0);
              range.collapse(true);
              setSelectionFocus(range);
            }
          };
          language.onkeydown = (event) => {
            if (event.isComposing) {
              return;
            }
            if (removeBlockElement(vditor, event)) {
              return;
            }
            if (event.key === "Escape" && vditor.hint.element.style.display === "block") {
              vditor.hint.element.style.display = "none";
              event.preventDefault();
              return;
            }
            vditor.hint.select(event, vditor);
            focusToElement(event, range);
          };
          language.onkeyup = (event) => {
            if (event.isComposing || event.key === "Enter" || event.key === "ArrowUp" || event.key === "Escape" || event.key === "ArrowDown") {
              return;
            }
            const matchLangData = [];
            const key = language.value.substring(0, language.selectionStart);
            (vditor.options.preview.hljs.langs || Constants.ALIAS_CODE_LANGUAGES.concat((window.hljs?.listLanguages() ?? []).sort())).forEach((keyName) => {
              if (keyName.indexOf(key.toLowerCase()) > -1) {
                matchLangData.push({
                  html: keyName,
                  value: keyName
                });
              }
            });
            vditor.hint.genHTML(matchLangData, key, vditor);
            event.preventDefault();
          };
          vditor.wysiwyg.popover.insertAdjacentElement("beforeend", languageWrap);
          customWysiwygToolbar(vditor, "code-block");
        } else {
          customWysiwygToolbar(vditor, "block");
        }
        setPopoverPosition(vditor, blockRenderElement);
      } else {
        blockRenderElement = void 0;
      }
      if (headingElement) {
        vditor.wysiwyg.popover.innerHTML = "";
        const inputWrap = document.createElement("span");
        inputWrap.setAttribute("aria-label", "ID<" + updateHotkeyTip("\u2325Enter") + ">");
        inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
        const input3 = document.createElement("input");
        inputWrap.appendChild(input3);
        input3.className = "vditor-input";
        input3.setAttribute("placeholder", "ID<" + updateHotkeyTip("\u2325Enter") + ">");
        input3.style.width = "120px";
        input3.value = headingElement.getAttribute("data-id") || "";
        input3.oninput = () => {
          headingElement.setAttribute("data-id", input3.value);
          if (typeof vditor.options.input === "function") {
            vditor.options.input(getMarkdown(vditor));
          }
        };
        input3.onkeydown = (event) => {
          if (event.isComposing) {
            return;
          }
          if (removeBlockElement(vditor, event)) {
            return;
          }
          if (focusToElement(event, range)) {
            return;
          }
        };
        genUp(range, headingElement, vditor);
        genDown(range, headingElement, vditor);
        genClose(headingElement, vditor);
        vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
        customWysiwygToolbar(vditor, "heading");
        setPopoverPosition(vditor, headingElement);
      }
      if (aElement) {
        genAPopover(vditor, aElement, range);
      }
      if (!blockquoteElement && !liElement && !tableElement && !blockRenderElement && !aElement && !linkRefElement && !footnotesRefElement && !headingElement && !tocElement) {
        const blockElement = hasClosestByAttribute(typeElement, "data-block", "0");
        if (blockElement && blockElement.parentElement.isEqualNode(vditor.wysiwyg.element)) {
          vditor.wysiwyg.popover.innerHTML = "";
          genUp(range, blockElement, vditor);
          genDown(range, blockElement, vditor);
          genClose(blockElement, vditor);
          customWysiwygToolbar(vditor, "block");
          setPopoverPosition(vditor, blockElement);
        } else {
          vditor.wysiwyg.popover.style.display = "none";
        }
      }
      vditor.wysiwyg.element.querySelectorAll('span[data-type="backslash"] > span').forEach((item) => {
        item.style.display = "none";
      });
      const backslashElement = hasClosestByAttribute(range.startContainer, "data-type", "backslash");
      if (backslashElement) {
        backslashElement.querySelector("span").style.display = "inline";
      }
    }, 200);
  };
  var genMobileToolbar = (type, vditor) => {
    const customToolbar = vditor.options.customWysiwygMobileToolbar;
    if (!customToolbar || window.innerWidth > 520) {
      return;
    }
    const toolbarElement = document.createElement("div");
    toolbarElement.className = "vditor-wysiwyg__mobile-toolbar";
    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.className = "vditor-icon";
    menuButton.setAttribute("data-type", "mobile-menu");
    menuButton.setAttribute("aria-label", window.VditorI18n.more);
    menuButton.textContent = "+";
    const actionsElement = document.createElement("div");
    actionsElement.className = "vditor-panel vditor-wysiwyg__mobile-actions";
    const savedRange2 = getEditorRange(vditor).cloneRange();
    customToolbar(type, actionsElement);
    if (!actionsElement.hasChildNodes()) {
      return;
    }
    const restoreSelection2 = () => {
      if (!vditor.wysiwyg.element.contains(savedRange2.commonAncestorContainer)) {
        return;
      }
      const restoredRange = savedRange2.cloneRange();
      vditor.wysiwyg.range = restoredRange;
      setSelectionFocus(restoredRange);
      actionsElement.classList.remove("vditor-wysiwyg__mobile-actions--open");
    };
    actionsElement.addEventListener("touchstart", restoreSelection2, true);
    actionsElement.addEventListener("click", restoreSelection2, true);
    menuButton.addEventListener(getEventName(), (event) => {
      event.preventDefault();
      event.stopPropagation();
      actionsElement.classList.toggle("vditor-wysiwyg__mobile-actions--open");
      actionsElement.classList.remove("vditor-panel--left");
      if (actionsElement.getBoundingClientRect().right > window.innerWidth) {
        actionsElement.classList.add("vditor-panel--left");
      }
    });
    toolbarElement.appendChild(menuButton);
    toolbarElement.appendChild(actionsElement);
    vditor.wysiwyg.popover.insertAdjacentElement("afterbegin", toolbarElement);
  };
  var setPopoverPosition = (vditor, element) => {
    let targetElement = element;
    const tableElement = hasClosestByMatchTag(element, "TABLE");
    if (tableElement) {
      targetElement = tableElement;
    }
    vditor.wysiwyg.popover.style.left = "0";
    vditor.wysiwyg.popover.style.display = "block";
    vditor.wysiwyg.popover.style.top = Math.max(-8, targetElement.offsetTop - 21 - vditor.wysiwyg.element.scrollTop) + "px";
    vditor.wysiwyg.popover.style.left = Math.min(targetElement.offsetLeft, vditor.wysiwyg.element.clientWidth - vditor.wysiwyg.popover.clientWidth) + "px";
    vditor.wysiwyg.popover.setAttribute("data-top", (targetElement.offsetTop - 21).toString());
  };
  var genLinkRefPopover = (vditor, linkRefElement, range = getSelection().getRangeAt(0)) => {
    vditor.wysiwyg.popover.innerHTML = "";
    const updateLinkRef = () => {
      if (input3.value.trim() !== "") {
        if (linkRefElement.tagName === "IMG") {
          linkRefElement.setAttribute("alt", input3.value);
        } else {
          linkRefElement.textContent = input3.value;
        }
      }
      if (input1.value.trim() !== "") {
        linkRefElement.setAttribute("data-link-label", input1.value);
      }
      if (typeof vditor.options.input === "function") {
        vditor.options.input(getMarkdown(vditor));
      }
    };
    const inputWrap = document.createElement("span");
    inputWrap.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty);
    inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const input3 = document.createElement("input");
    inputWrap.appendChild(input3);
    input3.className = "vditor-input";
    input3.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty);
    input3.style.width = "120px";
    input3.value = linkRefElement.getAttribute("alt") || linkRefElement.textContent;
    input3.oninput = () => {
      updateLinkRef();
    };
    input3.onkeydown = (event) => {
      if (removeBlockElement(vditor, event)) {
        return;
      }
      if (focusToElement(event, range)) {
        return;
      }
      linkHotkey(vditor, linkRefElement, event, input1);
    };
    const input1Wrap = document.createElement("span");
    input1Wrap.setAttribute("aria-label", window.VditorI18n.linkRef);
    input1Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const input1 = document.createElement("input");
    input1Wrap.appendChild(input1);
    input1.className = "vditor-input";
    input1.setAttribute("placeholder", window.VditorI18n.linkRef);
    input1.value = linkRefElement.getAttribute("data-link-label");
    input1.oninput = () => {
      updateLinkRef();
    };
    input1.onkeydown = (event) => {
      if (removeBlockElement(vditor, event)) {
        return;
      }
      if (focusToElement(event, range)) {
        return;
      }
      linkHotkey(vditor, linkRefElement, event, input3);
    };
    genClose(linkRefElement, vditor);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input1Wrap);
    customWysiwygToolbar(vditor, "link-ref");
    setPopoverPosition(vditor, linkRefElement);
  };
  var genUp = (range, element, vditor) => {
    const previousElement = element.previousElementSibling;
    if (!previousElement || !element.parentElement.isEqualNode(vditor.wysiwyg.element) && element.tagName !== "LI") {
      return;
    }
    const upElement = document.createElement("button");
    upElement.setAttribute("type", "button");
    upElement.setAttribute("data-type", "up");
    upElement.setAttribute("aria-label", window.VditorI18n.up + "<" + updateHotkeyTip("\u21E7\u2318U") + ">");
    upElement.innerHTML = '<svg><use xlink:href="#vditor-icon-up"></use></svg>';
    upElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
    upElement.onclick = () => {
      range.insertNode(document.createElement("wbr"));
      previousElement.insertAdjacentElement("beforebegin", element);
      setRangeByWbr(vditor.wysiwyg.element, range);
      afterRenderEvent(vditor);
      highlightToolbarWYSIWYG(vditor);
      scrollCenter(vditor);
    };
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", upElement);
  };
  var genDown = (range, element, vditor) => {
    const nextElement = element.nextElementSibling;
    if (!nextElement || !element.parentElement.isEqualNode(vditor.wysiwyg.element) && element.tagName !== "LI") {
      return;
    }
    const downElement = document.createElement("button");
    downElement.setAttribute("type", "button");
    downElement.setAttribute("data-type", "down");
    downElement.setAttribute("aria-label", window.VditorI18n.down + "<" + updateHotkeyTip("\u21E7\u2318D") + ">");
    downElement.innerHTML = '<svg><use xlink:href="#vditor-icon-down"></use></svg>';
    downElement.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
    downElement.onclick = () => {
      range.insertNode(document.createElement("wbr"));
      nextElement.insertAdjacentElement("afterend", element);
      setRangeByWbr(vditor.wysiwyg.element, range);
      afterRenderEvent(vditor);
      highlightToolbarWYSIWYG(vditor);
      scrollCenter(vditor);
    };
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", downElement);
  };
  var genClose = (element, vditor) => {
    const close = document.createElement("button");
    close.setAttribute("type", "button");
    close.setAttribute("data-type", "remove");
    close.setAttribute("aria-label", window.VditorI18n.remove + "<" + updateHotkeyTip("\u21E7\u2318X") + ">");
    close.innerHTML = '<svg><use xlink:href="#vditor-icon-trashcan"></use></svg>';
    close.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n";
    close.onclick = () => {
      const range = getEditorRange(vditor);
      range.setStartAfter(element);
      setSelectionFocus(range);
      element.remove();
      afterRenderEvent(vditor);
      highlightToolbarWYSIWYG(vditor);
      if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(element.tagName)) {
        renderToc(vditor);
      }
    };
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", close);
  };
  var linkHotkey = (vditor, element, event, nextInputElement) => {
    if (event.isComposing) {
      return;
    }
    if (event.key === "Tab") {
      nextInputElement.focus();
      nextInputElement.select();
      event.preventDefault();
      return;
    }
    if (!isCtrl(event) && !event.shiftKey && event.altKey && event.key === "Enter") {
      const range = getEditorRange(vditor);
      element.insertAdjacentHTML("afterend", Constants.ZWSP);
      range.setStartAfter(element.nextSibling);
      range.collapse(true);
      setSelectionFocus(range);
      event.preventDefault();
    }
  };
  var genAPopover = (vditor, aElement, range) => {
    vditor.wysiwyg.popover.innerHTML = "";
    const updateA = () => {
      if (input3.value.trim() !== "") {
        aElement.innerHTML = input3.value;
      }
      aElement.setAttribute("href", input1.value);
      aElement.setAttribute("title", input22.value);
      afterRenderEvent(vditor);
    };
    aElement.querySelectorAll("[data-marker]").forEach((item) => {
      item.removeAttribute("data-marker");
    });
    const inputWrap = document.createElement("span");
    inputWrap.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty);
    inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const input3 = document.createElement("input");
    inputWrap.appendChild(input3);
    input3.className = "vditor-input";
    input3.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty);
    input3.style.width = "120px";
    input3.value = aElement.innerHTML || "";
    input3.oninput = () => {
      updateA();
    };
    input3.onkeydown = (event) => {
      if (removeBlockElement(vditor, event)) {
        return;
      }
      if (focusToElement(event, range)) {
        return;
      }
      linkHotkey(vditor, aElement, event, input1);
    };
    const input1Wrap = document.createElement("span");
    input1Wrap.setAttribute("aria-label", window.VditorI18n.link);
    input1Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const input1 = document.createElement("input");
    input1Wrap.appendChild(input1);
    input1.className = "vditor-input";
    input1.setAttribute("placeholder", window.VditorI18n.link);
    input1.value = aElement.getAttribute("href") || "";
    input1.oninput = () => {
      updateA();
    };
    input1.onkeydown = (event) => {
      if (removeBlockElement(vditor, event)) {
        return;
      }
      if (focusToElement(event, range)) {
        return;
      }
      linkHotkey(vditor, aElement, event, input22);
    };
    const input2Wrap = document.createElement("span");
    input2Wrap.setAttribute("aria-label", window.VditorI18n.tooltipText);
    input2Wrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const input22 = document.createElement("input");
    input2Wrap.appendChild(input22);
    input22.className = "vditor-input";
    input22.setAttribute("placeholder", window.VditorI18n.tooltipText);
    input22.style.width = "60px";
    input22.value = aElement.getAttribute("title") || "";
    input22.oninput = () => {
      updateA();
    };
    input22.onkeydown = (event) => {
      if (removeBlockElement(vditor, event)) {
        return;
      }
      if (focusToElement(event, range)) {
        return;
      }
      linkHotkey(vditor, aElement, event, input3);
    };
    genClose(aElement, vditor);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input1Wrap);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", input2Wrap);
    customWysiwygToolbar(vditor, "a");
    setPopoverPosition(vditor, aElement);
  };
  var genImagePopover = (event, vditor) => {
    const imgElement = event.target;
    vditor.wysiwyg.popover.innerHTML = "";
    const updateImg = () => {
      imgElement.setAttribute("src", inputElement.value);
      imgElement.setAttribute("alt", alt.value);
      imgElement.setAttribute("title", title.value);
      renderImageCaptions(vditor.wysiwyg.element, "wysiwyg", vditor.options.preview.markdown.imageCaption);
      if (typeof vditor.options.input === "function") {
        vditor.options.input(getMarkdown(vditor));
      }
    };
    const inputWrap = document.createElement("span");
    inputWrap.setAttribute("aria-label", window.VditorI18n.imageURL);
    inputWrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const inputElement = document.createElement("input");
    inputWrap.appendChild(inputElement);
    inputElement.className = "vditor-input";
    inputElement.setAttribute("placeholder", window.VditorI18n.imageURL);
    inputElement.value = imgElement.getAttribute("src") || "";
    inputElement.oninput = () => {
      updateImg();
    };
    inputElement.onkeydown = (elementEvent) => {
      removeBlockElement(vditor, elementEvent);
    };
    const altWrap = document.createElement("span");
    altWrap.setAttribute("aria-label", window.VditorI18n.alternateText);
    altWrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const alt = document.createElement("input");
    altWrap.appendChild(alt);
    alt.className = "vditor-input";
    alt.setAttribute("placeholder", window.VditorI18n.alternateText);
    alt.style.width = "52px";
    alt.value = imgElement.getAttribute("alt") || "";
    alt.oninput = () => {
      updateImg();
    };
    alt.onkeydown = (elementEvent) => {
      removeBlockElement(vditor, elementEvent);
    };
    const titleWrap = document.createElement("span");
    titleWrap.setAttribute("aria-label", window.VditorI18n.title);
    titleWrap.className = "vditor-tooltipped vditor-tooltipped__n";
    const title = document.createElement("input");
    titleWrap.appendChild(title);
    title.className = "vditor-input";
    title.setAttribute("placeholder", window.VditorI18n.title);
    title.value = imgElement.getAttribute("title") || "";
    title.oninput = () => {
      updateImg();
    };
    title.onkeydown = (elementEvent) => {
      removeBlockElement(vditor, elementEvent);
    };
    genClose(imgElement, vditor);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", inputWrap);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", altWrap);
    vditor.wysiwyg.popover.insertAdjacentElement("beforeend", titleWrap);
    customWysiwygToolbar(vditor, "image");
    setPopoverPosition(vditor, imgElement);
  };
  var focusToElement = (event, range) => {
    if (!isCtrl(event) && !event.shiftKey && event.key === "Enter" || event.key === "Escape") {
      if (range) {
        setSelectionFocus(range);
      }
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
  };
  var customWysiwygToolbar = (vditor, type) => {
    genMobileToolbar(type, vditor);
    if (vditor.options.customWysiwygToolbar) {
      vditor.options.customWysiwygToolbar(type, vditor.wysiwyg.popover);
    }
  };

  // vditor-master/src/ts/util/highlightToolbar.ts
  var highlightToolbar = (vditor) => {
    if (vditor.currentMode === "wysiwyg") {
      highlightToolbarWYSIWYG(vditor);
    } else if (vditor.currentMode === "ir") {
      highlightToolbarIR(vditor);
    }
  };

  // vditor-master/src/ts/wysiwyg/renderDomByMd.ts
  var renderDomByMd = (vditor, md, options = {
    enableAddUndoStack: true,
    enableHint: false,
    enableInput: true
  }) => {
    const editorElement = vditor.wysiwyg.element;
    editorElement.innerHTML = vditor.lute.Md2VditorDOM(md);
    editorElement.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach((item) => {
      processCodeRender(item, vditor);
      item.previousElementSibling.setAttribute("style", "display:none");
    });
    afterRenderEvent(vditor, options);
  };

  // vditor-master/src/ts/wysiwyg/toolbarEvent.ts
  var cancelBES = (range, vditor, commandName) => {
    let element = range.startContainer.parentElement;
    let jump = false;
    let lastTagName = "";
    let lastEndTagName = "";
    const splitHTML = splitElement(range);
    let lastBeforeHTML = splitHTML.beforeHTML;
    let lastAfterHTML = splitHTML.afterHTML;
    while (element && !jump) {
      let tagName = element.tagName;
      if (tagName === "STRIKE") {
        tagName = "S";
      }
      if (tagName === "I") {
        tagName = "EM";
      }
      if (tagName === "B") {
        tagName = "STRONG";
      }
      if (tagName === "S" || tagName === "STRONG" || tagName === "EM") {
        let insertHTML2 = "";
        let previousHTML = "";
        let nextHTML = "";
        if (element.parentElement.getAttribute("data-block") !== "0") {
          previousHTML = getPreviousHTML(element);
          nextHTML = getNextHTML(element);
        }
        if (lastBeforeHTML || previousHTML) {
          insertHTML2 = `${previousHTML}<${tagName}>${lastBeforeHTML}</${tagName}>`;
          lastBeforeHTML = insertHTML2;
        }
        if (commandName === "bold" && tagName === "STRONG" || commandName === "italic" && tagName === "EM" || commandName === "strikeThrough" && tagName === "S") {
          insertHTML2 += `${lastTagName}${Constants.ZWSP}<wbr>${lastEndTagName}`;
          jump = true;
        }
        if (lastAfterHTML || nextHTML) {
          lastAfterHTML = `<${tagName}>${lastAfterHTML}</${tagName}>${nextHTML}`;
          insertHTML2 += lastAfterHTML;
        }
        if (element.parentElement.getAttribute("data-block") !== "0") {
          element = element.parentElement;
          element.innerHTML = insertHTML2;
        } else {
          element.outerHTML = insertHTML2;
          element = element.parentElement;
        }
        lastTagName = `<${tagName}>` + lastTagName;
        lastEndTagName = `</${tagName}>` + lastEndTagName;
      } else {
        jump = true;
      }
    }
    setRangeByWbr(vditor.wysiwyg.element, range);
  };
  var toolbarEvent = (vditor, actionBtn, event) => {
    if (vditor.wysiwyg.composingLock && event instanceof CustomEvent) {
      return;
    }
    let useHighlight = true;
    let useRender = true;
    if (vditor.wysiwyg.element.querySelector("wbr")) {
      vditor.wysiwyg.element.querySelector("wbr").remove();
    }
    const range = getEditorRange(vditor);
    let commandName = actionBtn.getAttribute("data-type");
    if (actionBtn.classList.contains("vditor-menu--current")) {
      if (commandName === "strike") {
        commandName = "strikeThrough";
      }
      if (commandName === "quote") {
        let quoteElement = hasClosestByMatchTag(range.startContainer, "BLOCKQUOTE");
        if (!quoteElement) {
          quoteElement = range.startContainer.childNodes[range.startOffset];
        }
        if (quoteElement) {
          useHighlight = false;
          actionBtn.classList.remove("vditor-menu--current");
          range.insertNode(document.createElement("wbr"));
          quoteElement.outerHTML = quoteElement.innerHTML.trim() === "" ? `<p data-block="0">${quoteElement.innerHTML}</p>` : quoteElement.innerHTML;
          setRangeByWbr(vditor.wysiwyg.element, range);
        }
      } else if (commandName === "inline-code") {
        let inlineCodeElement = hasClosestByMatchTag(range.startContainer, "CODE");
        if (!inlineCodeElement) {
          inlineCodeElement = range.startContainer.childNodes[range.startOffset];
        }
        if (inlineCodeElement) {
          inlineCodeElement.outerHTML = inlineCodeElement.innerHTML.replace(Constants.ZWSP, "") + "<wbr>";
          setRangeByWbr(vditor.wysiwyg.element, range);
        }
      } else if (commandName === "link") {
        if (!range.collapsed) {
          document.execCommand("unlink", false, "");
        } else {
          range.selectNode(range.startContainer.parentElement);
          document.execCommand("unlink", false, "");
        }
      } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
        listToggle(vditor, range, commandName);
        setRangeByWbr(vditor.wysiwyg.element, range);
        useHighlight = false;
        actionBtn.classList.remove("vditor-menu--current");
      } else {
        useHighlight = false;
        actionBtn.classList.remove("vditor-menu--current");
        if (range.toString() === "") {
          cancelBES(range, vditor, commandName);
        } else {
          document.execCommand(commandName, false, "");
        }
      }
    } else {
      if (vditor.wysiwyg.element.childNodes.length === 0) {
        vditor.wysiwyg.element.innerHTML = '<p data-block="0"><wbr></p>';
        setRangeByWbr(vditor.wysiwyg.element, range);
      }
      let blockElement = hasClosestBlock(range.startContainer);
      if (commandName === "quote") {
        if (!blockElement) {
          blockElement = range.startContainer.childNodes[range.startOffset];
        }
        if (blockElement) {
          useHighlight = false;
          actionBtn.classList.add("vditor-menu--current");
          range.insertNode(document.createElement("wbr"));
          const liElement = hasClosestByMatchTag(range.startContainer, "LI");
          if (liElement && blockElement.contains(liElement)) {
            liElement.innerHTML = `<blockquote data-block="0">${liElement.innerHTML}</blockquote>`;
          } else {
            blockElement.outerHTML = `<blockquote data-block="0">${blockElement.outerHTML}</blockquote>`;
          }
          setRangeByWbr(vditor.wysiwyg.element, range);
        }
      } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
        listToggle(vditor, range, commandName, false);
        setRangeByWbr(vditor.wysiwyg.element, range);
        useHighlight = false;
        removeCurrentToolbar(vditor.toolbar.elements, ["check", "list", "ordered-list"]);
        actionBtn.classList.add("vditor-menu--current");
      } else if (commandName === "inline-code") {
        if (range.toString() === "") {
          const node = document.createElement("code");
          node.textContent = Constants.ZWSP;
          range.insertNode(node);
          range.setStart(node.firstChild, 1);
          range.collapse(true);
          setSelectionFocus(range);
        } else if (range.startContainer.nodeType === 3) {
          const node = document.createElement("code");
          range.surroundContents(node);
          range.insertNode(node);
          setSelectionFocus(range);
        }
        actionBtn.classList.add("vditor-menu--current");
      } else if (commandName === "code") {
        const node = document.createElement("div");
        node.className = "vditor-wysiwyg__block";
        node.setAttribute("data-type", "code-block");
        node.setAttribute("data-block", "0");
        node.setAttribute("data-marker", "```");
        if (range.toString() === "") {
          node.innerHTML = "<pre><code><wbr>\n</code></pre>";
        } else {
          node.innerHTML = `<pre><code>${range.toString()}<wbr></code></pre>`;
          range.deleteContents();
        }
        range.insertNode(node);
        if (blockElement) {
          blockElement.outerHTML = vditor.lute.SpinVditorDOM(blockElement.outerHTML);
        }
        setRangeByWbr(vditor.wysiwyg.element, range);
        vditor.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(
          (item) => {
            processCodeRender(item, vditor);
          }
        );
        actionBtn.classList.add("vditor-menu--disabled");
      } else if (commandName === "link") {
        if (range.toString() === "") {
          const aElement = document.createElement("a");
          aElement.innerText = Constants.ZWSP;
          range.insertNode(aElement);
          range.setStart(aElement.firstChild, 1);
          range.collapse(true);
          genAPopover(vditor, aElement, range);
          const textInputElement = vditor.wysiwyg.popover.querySelector("input");
          textInputElement.value = "";
          textInputElement.focus();
          useRender = false;
        } else {
          const node = document.createElement("a");
          node.setAttribute("href", "");
          node.innerHTML = range.toString();
          range.surroundContents(node);
          range.insertNode(node);
          setSelectionFocus(range);
          genAPopover(vditor, node, range);
          const textInputElements = vditor.wysiwyg.popover.querySelectorAll("input");
          textInputElements[0].value = node.innerText;
          textInputElements[1].focus();
        }
        useHighlight = false;
        actionBtn.classList.add("vditor-menu--current");
      } else if (commandName === "table") {
        let tableHTML = `<table data-block="0"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>`;
        if (range.toString().trim() === "") {
          if (blockElement && blockElement.innerHTML.trim().replace(Constants.ZWSP, "") === "") {
            blockElement.outerHTML = tableHTML;
          } else {
            document.execCommand("insertHTML", false, tableHTML);
          }
          range.selectNode(vditor.wysiwyg.element.querySelector("wbr").previousSibling);
          vditor.wysiwyg.element.querySelector("wbr").remove();
          setSelectionFocus(range);
        } else {
          tableHTML = `<table data-block="0"><thead><tr>`;
          const tableText = range.toString().split("\n");
          const delimiter = tableText[0].split(",").length > tableText[0].split("	").length ? "," : "	";
          tableText.forEach((rows, index) => {
            if (index === 0) {
              rows.split(delimiter).forEach((header, subIndex) => {
                if (subIndex === 0) {
                  tableHTML += `<th>${header}<wbr></th>`;
                } else {
                  tableHTML += `<th>${header}</th>`;
                }
              });
              tableHTML += "</tr></thead>";
            } else {
              if (index === 1) {
                tableHTML += "<tbody><tr>";
              } else {
                tableHTML += "<tr>";
              }
              rows.split(delimiter).forEach((cell) => {
                tableHTML += `<td>${cell}</td>`;
              });
              tableHTML += `</tr>`;
            }
          });
          tableHTML += "</tbody></table>";
          document.execCommand("insertHTML", false, tableHTML);
          setRangeByWbr(vditor.wysiwyg.element, range);
        }
        useHighlight = false;
        actionBtn.classList.add("vditor-menu--disabled");
      } else if (commandName === "line") {
        if (blockElement) {
          const hrHTML = '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
          if (blockElement.innerHTML.trim() === "") {
            blockElement.outerHTML = hrHTML;
          } else {
            blockElement.insertAdjacentHTML("afterend", hrHTML);
          }
          setRangeByWbr(vditor.wysiwyg.element, range);
        }
      } else {
        useHighlight = false;
        actionBtn.classList.add("vditor-menu--current");
        if (commandName === "strike") {
          commandName = "strikeThrough";
        }
        if (range.toString() === "" && (commandName === "bold" || commandName === "italic" || commandName === "strikeThrough")) {
          let tagName = "strong";
          if (commandName === "italic") {
            tagName = "em";
          } else if (commandName === "strikeThrough") {
            tagName = "s";
          }
          const node = document.createElement(tagName);
          node.textContent = Constants.ZWSP;
          range.insertNode(node);
          if (node.previousSibling && node.previousSibling.textContent === Constants.ZWSP) {
            node.previousSibling.textContent = "";
          }
          range.setStart(node.firstChild, 1);
          range.collapse(true);
          setSelectionFocus(range);
        } else {
          document.execCommand(commandName, false, "");
        }
      }
    }
    if (useHighlight) {
      highlightToolbarWYSIWYG(vditor);
    }
    if (useRender) {
      afterRenderEvent(vditor);
    }
  };

  // vditor-master/src/ts/toolbar/MenuItem.ts
  var MenuItem = class {
    constructor(vditor, menuItem) {
      this.element = document.createElement("div");
      if (menuItem.className) {
        this.element.classList.add(...menuItem.className.split(" "));
      }
      let hotkey = menuItem.hotkey ? ` <${updateHotkeyTip(menuItem.hotkey)}>` : "";
      if (menuItem.level === 2) {
        hotkey = menuItem.hotkey ? ` &lt;${updateHotkeyTip(menuItem.hotkey)}&gt;` : "";
      }
      const tip = menuItem.tip ? menuItem.tip + hotkey : `${window.VditorI18n[menuItem.name]}${hotkey}`;
      const tagName = menuItem.name === "upload" ? "div" : "button";
      if (menuItem.level === 2) {
        this.element.innerHTML = `<${tagName} data-type="${menuItem.name}">${tip}</${tagName}>`;
      } else {
        this.element.classList.add("vditor-toolbar__item");
        const iconElement = document.createElement(tagName);
        iconElement.setAttribute("data-type", menuItem.name);
        iconElement.className = `vditor-tooltipped vditor-tooltipped__${menuItem.tipPosition}`;
        iconElement.setAttribute("aria-label", tip);
        iconElement.innerHTML = menuItem.icon;
        this.element.appendChild(iconElement);
      }
      if (!menuItem.prefix) {
        return;
      }
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        if (vditor.currentMode === "wysiwyg") {
          toolbarEvent(vditor, this.element.children[0], event);
        } else if (vditor.currentMode === "ir") {
          processToolbar2(
            vditor,
            this.element.children[0],
            menuItem.prefix || "",
            menuItem.suffix || ""
          );
        } else {
          processToolbar(
            vditor,
            this.element.children[0],
            menuItem.prefix || "",
            menuItem.suffix || ""
          );
        }
      });
    }
  };

  // vditor-master/src/ts/toolbar/EditMode.ts
  var setEditMode = (vditor, type, event) => {
    let markdownText;
    if (typeof event !== "string") {
      hidePanel(vditor, ["subToolbar", "hint"]);
      event.preventDefault();
      markdownText = getMarkdown(vditor);
    } else {
      markdownText = event;
    }
    if (vditor.currentMode === type && typeof event !== "string") {
      return;
    }
    if (vditor.devtools) {
      vditor.devtools.renderEchart(vditor);
    }
    if (vditor.options.preview.mode === "both" && type === "sv") {
      vditor.preview.element.style.display = "block";
    } else {
      vditor.preview.element.style.display = "none";
    }
    enableToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);
    removeCurrentToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);
    disableToolbar(vditor.toolbar.elements, ["outdent", "indent"]);
    if (type === "ir") {
      hideToolbar(vditor.toolbar.elements, ["both"]);
      showToolbar(vditor.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]);
      vditor.sv.element.style.display = "none";
      vditor.wysiwyg.element.parentElement.style.display = "none";
      vditor.ir.element.parentElement.style.display = "block";
      vditor.lute.SetVditorIR(true);
      vditor.lute.SetVditorWYSIWYG(false);
      vditor.lute.SetVditorSV(false);
      vditor.currentMode = "ir";
      vditor.ir.element.innerHTML = vditor.lute.Md2VditorIRDOM(markdownText);
      processAfterRender(vditor, {
        enableAddUndoStack: true,
        enableHint: false,
        enableInput: false
      });
      setPadding(vditor);
      vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach((item) => {
        processCodeRender(item, vditor);
      });
      vditor.ir.element.querySelectorAll(".vditor-toc").forEach((item) => {
        mathRender(item, {
          cdn: vditor.options.cdn,
          math: vditor.options.preview.math
        });
      });
    } else if (type === "wysiwyg") {
      hideToolbar(vditor.toolbar.elements, ["both"]);
      showToolbar(vditor.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]);
      vditor.sv.element.style.display = "none";
      vditor.wysiwyg.element.parentElement.style.display = "block";
      vditor.ir.element.parentElement.style.display = "none";
      vditor.lute.SetVditorIR(false);
      vditor.lute.SetVditorWYSIWYG(true);
      vditor.lute.SetVditorSV(false);
      vditor.currentMode = "wysiwyg";
      setPadding(vditor);
      renderDomByMd(vditor, markdownText, {
        enableAddUndoStack: true,
        enableHint: false,
        enableInput: false
      });
      vditor.wysiwyg.element.querySelectorAll(".vditor-toc").forEach((item) => {
        mathRender(item, {
          cdn: vditor.options.cdn,
          math: vditor.options.preview.math
        });
      });
      vditor.wysiwyg.popover.style.display = "none";
    } else if (type === "sv") {
      showToolbar(vditor.toolbar.elements, ["both"]);
      hideToolbar(vditor.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]);
      vditor.wysiwyg.element.parentElement.style.display = "none";
      vditor.ir.element.parentElement.style.display = "none";
      if (vditor.options.preview.mode === "both") {
        vditor.sv.element.style.display = "block";
      } else if (vditor.options.preview.mode === "editor") {
        vditor.sv.element.style.display = "block";
      }
      vditor.lute.SetVditorIR(false);
      vditor.lute.SetVditorWYSIWYG(false);
      vditor.lute.SetVditorSV(false);
      vditor.currentMode = "sv";
      vditor.sv.element.value = markdownText;
      processAfterRender2(vditor, {
        enableAddUndoStack: true,
        enableHint: false,
        enableInput: false
      });
      setPadding(vditor);
    }
    vditor.undo.resetIcon(vditor);
    if (typeof event !== "string") {
      vditor[vditor.currentMode].element.focus();
      highlightToolbar(vditor);
    }
    renderToc(vditor);
    setTypewriterPosition(vditor);
    if (vditor.toolbar.elements["edit-mode"]) {
      vditor.toolbar.elements["edit-mode"].querySelectorAll("button").forEach((item) => {
        item.classList.remove("vditor-menu--current");
      });
      vditor.toolbar.elements["edit-mode"].querySelector(`button[data-mode="${vditor.currentMode}"]`).classList.add("vditor-menu--current");
    }
    vditor.outline.toggle(vditor, vditor.currentMode !== "sv" && vditor.options.outline.enable, typeof event !== "string");
  };
  var EditMode = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      const panelElement = document.createElement("div");
      panelElement.className = `vditor-hint${menuItem.level === 2 ? "" : " vditor-panel--arrow"}`;
      panelElement.innerHTML = `<button data-mode="wysiwyg">${window.VditorI18n.wysiwyg} &lt;${updateHotkeyTip("\u2325\u23187")}></button>
<button data-mode="ir">${window.VditorI18n.instantRendering} &lt;${updateHotkeyTip("\u2325\u23188")}></button>
<button data-mode="sv">${window.VditorI18n.splitView} &lt;${updateHotkeyTip("\u2325\u23189")}></button>`;
      this.element.appendChild(panelElement);
      this._bindEvent(vditor, panelElement, menuItem);
    }
    _bindEvent(vditor, panelElement, menuItem) {
      const actionBtn = this.element.children[0];
      toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
      panelElement.children.item(0).addEventListener(getEventName(), (event) => {
        setEditMode(vditor, "wysiwyg", event);
        event.preventDefault();
        event.stopPropagation();
      });
      panelElement.children.item(1).addEventListener(getEventName(), (event) => {
        setEditMode(vditor, "ir", event);
        event.preventDefault();
        event.stopPropagation();
      });
      panelElement.children.item(2).addEventListener(getEventName(), (event) => {
        setEditMode(vditor, "sv", event);
        event.preventDefault();
        event.stopPropagation();
      });
    }
  };

  // vditor-master/src/ts/util/getSelectText.ts
  var getSelectText = (editor2, range) => {
    if (selectIsEditor(editor2, range)) {
      return getSelection().toString();
    }
    return "";
  };

  // vditor-master/src/ts/util/editorCommonEvent.ts
  var focusEvent = (vditor, editorElement) => {
    editorElement.addEventListener("focus", () => {
      if (vditor.options.focus) {
        vditor.options.focus(getMarkdown(vditor));
      }
      hidePanel(vditor, ["subToolbar", "hint"]);
    });
  };
  var dblclickEvent = (vditor, editorElement) => {
    editorElement.addEventListener("dblclick", (event) => {
      if (event.target.tagName === "IMG") {
        if (vditor.options.image.preview) {
          vditor.options.image.preview(event.target);
        } else if (vditor.options.image.isPreview) {
          previewImage(event.target, vditor.options.lang, vditor.options.theme);
        }
      }
    });
  };
  var blurEvent = (vditor, editorElement) => {
    editorElement.addEventListener("blur", (event) => {
      if (vditor.currentMode === "ir") {
        const expandElement = vditor.ir.element.querySelector(".vditor-ir__node--expand");
        if (expandElement) {
          expandElement.classList.remove("vditor-ir__node--expand");
        }
        vditor.ir.range = getEditorRange(vditor);
      } else if (vditor.currentMode === "wysiwyg") {
        if (!vditor.wysiwyg.selectPopover.contains(event.relatedTarget)) {
          vditor.wysiwyg.hideComment();
        }
        vditor.wysiwyg.range = getEditorRange(vditor);
      }
      if (vditor.options.blur) {
        vditor.options.blur(getMarkdown(vditor));
      }
    });
  };
  var dropEvent = (vditor, editorElement, pasteCode = (code) => {
    document.execCommand("insertHTML", false, code);
  }) => {
    editorElement.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData(Constants.DROP_EDITOR, Constants.DROP_EDITOR);
    });
    editorElement.addEventListener(
      "drop",
      (event) => {
        if (event.dataTransfer.getData(Constants.DROP_EDITOR)) {
          execAfterRender(vditor);
        } else if (event.dataTransfer.types.includes("Files") || event.dataTransfer.types.includes("text/html")) {
          paste(vditor, event, {
            pasteCode
          });
        }
      }
    );
  };
  var copyEvent = (vditor, editorElement, copy) => {
    editorElement.addEventListener("copy", (event) => copy(event, vditor));
  };
  var cutEvent = (vditor, editorElement, copy) => {
    editorElement.addEventListener("cut", (event) => {
      copy(event, vditor);
      if (vditor.options.comment.enable && vditor.currentMode === "wysiwyg") {
        vditor.wysiwyg.getComments(vditor);
      }
      document.execCommand("delete");
    });
  };
  var scrollCenter = (vditor) => {
    if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
      vditor.options.comment.adjustTop(vditor.wysiwyg.getComments(vditor, true));
    }
    if (!vditor.options.typewriterMode) {
      return;
    }
    const editorElement = vditor[vditor.currentMode].element;
    let cursorTop;
    if (vditor.currentMode === "sv") {
      const lineHeight = parseInt(getComputedStyle(vditor.sv.element).lineHeight, 10) || 22;
      cursorTop = (vditor.sv.element.value.substring(0, vditor.sv.element.selectionStart).split("\n").length - 1) * lineHeight;
    } else {
      cursorTop = getCursorPosition(editorElement).top;
    }
    if (vditor.options.height === "auto" && !vditor.element.classList.contains("vditor--fullscreen")) {
      window.scrollTo(
        window.scrollX,
        cursorTop + vditor.element.offsetTop + vditor.toolbar.element.offsetHeight - window.innerHeight / 2 + 10
      );
    }
    if (vditor.options.height !== "auto" || vditor.element.classList.contains("vditor--fullscreen")) {
      editorElement.scrollTop = cursorTop + editorElement.scrollTop - editorElement.clientHeight / 2 + 10;
    }
  };
  var hotkeyEvent = (vditor, editorElement) => {
    editorElement.addEventListener("keydown", (event) => {
      if (!event.isComposing && vditor.options.keydown) {
        vditor.options.keydown(event);
      }
      if ((vditor.options.hint.extend.length > 1 || vditor.toolbar.elements.emoji) && vditor.hint.select(event, vditor)) {
        return;
      }
      if (vditor.options.comment.enable && vditor.currentMode === "wysiwyg" && (event.key === "Backspace" || matchHotKey("\u2318X", event))) {
        vditor.wysiwyg.getComments(vditor);
      }
      if (vditor.currentMode === "sv") {
        if (processKeydown2(vditor, event)) {
          return;
        }
      } else if (vditor.currentMode === "wysiwyg") {
        if (processKeydown3(vditor, event)) {
          return;
        }
      } else if (vditor.currentMode === "ir") {
        if (processKeydown(vditor, event)) {
          return;
        }
      }
      if (vditor.options.ctrlEnter && matchHotKey("\u2318Enter", event)) {
        vditor.options.ctrlEnter(getMarkdown(vditor));
        event.preventDefault();
        return;
      }
      if (matchHotKey("\u2318Z", event) && !vditor.toolbar.elements.undo) {
        vditor.undo.undo(vditor);
        event.preventDefault();
        return;
      }
      if (matchHotKey("\u2318Y", event) && !vditor.toolbar.elements.redo) {
        vditor.undo.redo(vditor);
        event.preventDefault();
        return;
      }
      if (event.key === "Escape") {
        if (vditor.hint.element.style.display === "block") {
          vditor.hint.element.style.display = "none";
        } else if (vditor.options.esc && !event.isComposing) {
          vditor.options.esc(getMarkdown(vditor));
        }
        event.preventDefault();
        return;
      }
      if (isCtrl(event) && event.altKey && !event.shiftKey && /^Digit[1-6]$/.test(event.code)) {
        if (vditor.currentMode === "wysiwyg") {
          const tagName = event.code.replace("Digit", "H");
          if (hasClosestByMatchTag(getSelection().getRangeAt(0).startContainer, tagName)) {
            removeHeading(vditor);
          } else {
            setHeading(vditor, tagName);
          }
          afterRenderEvent(vditor);
        } else if (vditor.currentMode === "sv") {
          processHeading(vditor, "#".repeat(parseInt(event.code.replace("Digit", ""), 10)) + " ");
        } else if (vditor.currentMode === "ir") {
          processHeading2(vditor, "#".repeat(parseInt(event.code.replace("Digit", ""), 10)) + " ");
        }
        event.preventDefault();
        return true;
      }
      if (isCtrl(event) && event.altKey && !event.shiftKey && /^Digit[7-9]$/.test(event.code)) {
        if (event.code === "Digit7") {
          setEditMode(vditor, "wysiwyg", event);
        } else if (event.code === "Digit8") {
          setEditMode(vditor, "ir", event);
        } else if (event.code === "Digit9") {
          setEditMode(vditor, "sv", event);
        }
        return true;
      }
      vditor.options.toolbar.find((menuItem) => {
        if (!menuItem.hotkey || menuItem.toolbar) {
          if (menuItem.toolbar) {
            const sub = menuItem.toolbar.find((subMenuItem) => {
              if (!subMenuItem.hotkey) {
                return false;
              }
              if (matchHotKey(subMenuItem.hotkey, event)) {
                vditor.toolbar.elements[subMenuItem.name].children[0].dispatchEvent(new CustomEvent(getEventName()));
                event.preventDefault();
                return true;
              }
            });
            return sub ? true : false;
          }
          return false;
        }
        if (matchHotKey(menuItem.hotkey, event)) {
          vditor.toolbar.elements[menuItem.name].children[0].dispatchEvent(new CustomEvent(getEventName()));
          event.preventDefault();
          return true;
        }
      });
    });
  };
  var selectEvent = (vditor, editorElement) => {
    editorElement.addEventListener("selectstart", (event) => {
      editorElement.onmouseup = () => {
        setTimeout(() => {
          const selectText = getSelectText(vditor[vditor.currentMode].element);
          if (selectText.trim()) {
            if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
              if (!hasClosestByAttribute(event.target, "data-type", "footnotes-block") && !hasClosestByAttribute(event.target, "data-type", "link-ref-defs-block")) {
                vditor.wysiwyg.showComment();
              } else {
                vditor.wysiwyg.hideComment();
              }
            }
            if (vditor.options.select) {
              vditor.options.select(selectText);
            }
          } else {
            if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
              vditor.wysiwyg.hideComment();
            }
            if (typeof vditor.options.unSelect === "function") {
              vditor.options.unSelect();
            }
          }
        });
      };
    });
  };

  // vditor-master/src/ts/util/fixBrowserBehavior.ts
  var fixGSKeyBackspace = (event, vditor, startContainer) => {
    if (event.keyCode === 229 && event.code === "" && event.key === "Unidentified" && vditor.currentMode !== "sv") {
      const blockElement = hasClosestBlock(startContainer);
      if (blockElement && blockElement.textContent.trim() === "") {
        vditor[vditor.currentMode].composingLock = true;
        return false;
      }
    }
    return true;
  };
  var fixCJKPosition = (range, vditor, event) => {
    if (event.key === "Enter" || event.key === "Tab" || event.key === "Backspace" || event.key.indexOf("Arrow") > -1 || isCtrl(event) || event.key === "Escape" || event.shiftKey || event.altKey) {
      return;
    }
    const pLiElement = hasClosestByMatchTag(range.startContainer, "P") || hasClosestByMatchTag(range.startContainer, "LI");
    if (pLiElement && getSelectPosition(pLiElement, vditor[vditor.currentMode].element, range).start === 0) {
      if (pLiElement.nodeValue) {
        pLiElement.nodeValue = pLiElement.nodeValue.replace(/\u2006/g, "");
      }
      const zwspNode = document.createTextNode(Constants.ZWSP);
      range.insertNode(zwspNode);
      range.setStartAfter(zwspNode);
    }
  };
  var fixCursorDownInlineMath = (range, key) => {
    if (key === "ArrowDown" || key === "ArrowUp") {
      const inlineElement = hasClosestByAttribute(range.startContainer, "data-type", "math-inline") || hasClosestByAttribute(range.startContainer, "data-type", "html-entity") || hasClosestByAttribute(range.startContainer, "data-type", "html-inline");
      if (inlineElement) {
        if (key === "ArrowDown") {
          range.setStartAfter(inlineElement.parentElement);
        }
        if (key === "ArrowUp") {
          range.setStartBefore(inlineElement.parentElement);
        }
      }
    }
  };
  var insertEmptyBlock = (vditor, position) => {
    if (vditor.currentMode === "sv") {
      const element = vditor.sv.element;
      if (position === "beforebegin") {
        const lineStart = element.value.lastIndexOf("\n", element.selectionStart - 1) + 1;
        element.setRangeText("\n", lineStart, lineStart, "end");
        element.setSelectionRange(lineStart, lineStart);
      } else {
        const lineEndIndex = element.value.indexOf("\n", element.selectionEnd);
        const lineEnd = lineEndIndex === -1 ? element.value.length : lineEndIndex;
        element.setRangeText("\n", lineEnd, lineEnd, "end");
      }
      element.focus();
      processAfterRender2(vditor);
      return;
    }
    const range = getEditorRange(vditor);
    const blockElement = hasClosestBlock(range.startContainer);
    if (blockElement) {
      blockElement.insertAdjacentHTML(position, `<p data-block="0">${Constants.ZWSP}<wbr>
</p>`);
      setRangeByWbr(vditor[vditor.currentMode].element, range);
      highlightToolbar(vditor);
      execAfterRender(vditor);
    }
  };
  var isFirstCell = (cellElement) => {
    const tableElement = hasClosestByMatchTag(cellElement, "TABLE");
    if (tableElement && tableElement.rows[0].cells[0].isSameNode(cellElement)) {
      return tableElement;
    }
    return false;
  };
  var isLastCell = (cellElement) => {
    const tableElement = hasClosestByMatchTag(cellElement, "TABLE");
    if (tableElement && tableElement.lastElementChild.lastElementChild.lastElementChild.isSameNode(cellElement)) {
      return tableElement;
    }
    return false;
  };
  var goPreviousCell = (cellElement, range, isSelected = true) => {
    let previousElement = cellElement.previousElementSibling;
    if (!previousElement) {
      if (cellElement.parentElement.previousElementSibling) {
        previousElement = cellElement.parentElement.previousElementSibling.lastElementChild;
      } else if (cellElement.parentElement.parentElement.tagName === "TBODY" && cellElement.parentElement.parentElement.previousElementSibling) {
        previousElement = cellElement.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild;
      } else {
        previousElement = null;
      }
    }
    if (previousElement) {
      range.selectNodeContents(previousElement);
      if (!isSelected) {
        range.collapse(false);
      }
      setSelectionFocus(range);
    }
    return previousElement;
  };
  var insertAfterBlock = (vditor, event, range, element, blockElement) => {
    const position = getSelectPosition(element, vditor[vditor.currentMode].element, range);
    if (event.key === "ArrowDown" && element.textContent.trimRight().substr(position.start).indexOf("\n") === -1 || event.key === "ArrowRight" && position.start >= element.textContent.trimRight().length) {
      const nextElement = blockElement.nextElementSibling;
      if (!nextElement || nextElement && (nextElement.tagName === "TABLE" || nextElement.getAttribute("data-type"))) {
        blockElement.insertAdjacentHTML(
          "afterend",
          `<p data-block="0">${Constants.ZWSP}<wbr></p>`
        );
        setRangeByWbr(vditor[vditor.currentMode].element, range);
      } else {
        range.selectNodeContents(nextElement);
        range.collapse(true);
        setSelectionFocus(range);
      }
      event.preventDefault();
      return true;
    }
    return false;
  };
  var insertBeforeBlock = (vditor, event, range, element, blockElement) => {
    const position = getSelectPosition(element, vditor[vditor.currentMode].element, range);
    if (event.key === "ArrowUp" && element.textContent.substr(0, position.start).indexOf("\n") === -1 || (event.key === "ArrowLeft" || event.key === "Backspace" && range.toString() === "") && position.start === 0) {
      const previousElement = blockElement.previousElementSibling;
      if (!previousElement || previousElement && (previousElement.tagName === "TABLE" || previousElement.getAttribute("data-type"))) {
        blockElement.insertAdjacentHTML(
          "beforebegin",
          `<p data-block="0">${Constants.ZWSP}<wbr></p>`
        );
        setRangeByWbr(vditor[vditor.currentMode].element, range);
      } else {
        range.selectNodeContents(previousElement);
        range.collapse(false);
        setSelectionFocus(range);
      }
      event.preventDefault();
      return true;
    }
    return false;
  };
  var listToggle = (vditor, range, type, cancel = true) => {
    const itemElement = hasClosestByMatchTag(range.startContainer, "LI");
    const selectedBlockElements = [];
    const startBlockElement = hasClosestByAttribute(range.startContainer, "data-block", "0");
    const endBlockElement = hasClosestByAttribute(range.endContainer, "data-block", "0");
    if (startBlockElement && endBlockElement && startBlockElement.parentElement.isSameNode(endBlockElement.parentElement)) {
      let blockElement = startBlockElement;
      while (blockElement) {
        selectedBlockElements.push(blockElement);
        if (blockElement.isSameNode(endBlockElement)) {
          break;
        }
        blockElement = blockElement.nextElementSibling;
      }
    }
    vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach((wbr) => {
      wbr.remove();
    });
    const keepSelection = !range.collapsed;
    if (keepSelection) {
      const endRange = range.cloneRange();
      endRange.collapse(false);
      const endElement = document.createElement("wbr");
      endElement.setAttribute("data-type", "list-selection-end");
      endRange.insertNode(endElement);
      const startRange = range.cloneRange();
      startRange.collapse(true);
      const startElement = document.createElement("wbr");
      startElement.setAttribute("data-type", "list-selection-start");
      startRange.insertNode(startElement);
    } else {
      range.insertNode(document.createElement("wbr"));
    }
    if (cancel && itemElement) {
      let pHTML = "";
      for (let i = 0; i < itemElement.parentElement.childElementCount; i++) {
        const inputElement = itemElement.parentElement.children[i].querySelector("input");
        if (inputElement) {
          inputElement.remove();
        }
        pHTML += `<p data-block="0">${itemElement.parentElement.children[i].innerHTML.trimLeft()}</p>`;
      }
      itemElement.parentElement.insertAdjacentHTML("beforebegin", pHTML);
      itemElement.parentElement.remove();
    } else {
      if (!itemElement) {
        if (selectedBlockElements.length === 0) {
          vditor[vditor.currentMode].element.querySelector("wbr").remove();
          const blockElement = vditor[vditor.currentMode].element.querySelector("p");
          blockElement.innerHTML = "<wbr>";
          selectedBlockElements.push(blockElement);
        }
        let listHTML = "";
        selectedBlockElements.forEach((blockElement) => {
          if (type === "check") {
            listHTML += `<li class="vditor-task"><input type="checkbox" /> ${blockElement.innerHTML}</li>`;
          } else {
            listHTML += `<li>${blockElement.innerHTML}</li>`;
          }
        });
        const listTagName = type === "ordered-list" ? "ol" : "ul";
        selectedBlockElements[0].insertAdjacentHTML(
          "beforebegin",
          `<${listTagName} data-block="0">${listHTML}</${listTagName}>`
        );
        selectedBlockElements.forEach((blockElement) => blockElement.remove());
      } else {
        if (type === "check") {
          itemElement.parentElement.querySelectorAll("li").forEach((item) => {
            item.insertAdjacentHTML(
              "afterbegin",
              `<input type="checkbox" />${item.textContent.indexOf(" ") === 0 ? "" : " "}`
            );
            item.classList.add("vditor-task");
          });
        } else {
          if (itemElement.querySelector("input")) {
            itemElement.parentElement.querySelectorAll("li").forEach((item) => {
              const inputElement = item.querySelector("input");
              if (inputElement) {
                const nextSibling = inputElement.nextSibling;
                inputElement.remove();
                if (nextSibling && nextSibling.nodeType === 3 && nextSibling.textContent.startsWith(" ")) {
                  nextSibling.textContent = nextSibling.textContent.substring(1);
                }
              }
              item.classList.remove("vditor-task");
            });
          }
          let element;
          if (type === "list") {
            element = document.createElement("ul");
            element.setAttribute("data-marker", "*");
          } else {
            element = document.createElement("ol");
            element.setAttribute("data-marker", "1.");
          }
          element.setAttribute("data-block", "0");
          element.setAttribute("data-tight", itemElement.parentElement.getAttribute("data-tight"));
          element.innerHTML = itemElement.parentElement.innerHTML;
          itemElement.parentElement.parentNode.replaceChild(element, itemElement.parentElement);
        }
      }
    }
    if (keepSelection) {
      const editorElement = vditor[vditor.currentMode].element;
      const startElement = editorElement.querySelector('[data-type="list-selection-start"]');
      const endElement = editorElement.querySelector('[data-type="list-selection-end"]');
      if (startElement && endElement) {
        range.setStartAfter(startElement);
        range.setEndBefore(endElement);
        startElement.remove();
        endElement.remove();
        setSelectionFocus(range);
      }
    }
  };
  var listIndent = (vditor, liElement, range) => {
    const previousElement = liElement.previousElementSibling;
    if (liElement && previousElement) {
      const liElements = [liElement];
      Array.from(range.cloneContents().children).forEach((item, index) => {
        if (item.nodeType !== 3 && liElement && item.textContent.trim() !== "" && liElement.getAttribute("data-node-id") === item.getAttribute("data-node-id")) {
          if (index !== 0) {
            liElements.push(liElement);
          }
          liElement = liElement.nextElementSibling;
        }
      });
      vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach((wbr) => {
        wbr.remove();
      });
      range.insertNode(document.createElement("wbr"));
      const liParentElement = previousElement.parentElement;
      let liHTML = "";
      liElements.forEach((item) => {
        let marker = item.getAttribute("data-marker");
        if (marker.length !== 1) {
          marker = `1${marker.slice(-1)}`;
        }
        liHTML += `<li data-node-id="${item.getAttribute("data-node-id")}" data-marker="${marker}">${item.innerHTML}</li>`;
        item.remove();
      });
      previousElement.insertAdjacentHTML(
        "beforeend",
        `<${liParentElement.tagName} data-block="0">${liHTML}</${liParentElement.tagName}>`
      );
      if (vditor.currentMode === "wysiwyg") {
        liParentElement.outerHTML = vditor.lute.SpinVditorDOM(liParentElement.outerHTML);
      } else {
        liParentElement.outerHTML = vditor.lute.SpinVditorIRDOM(liParentElement.outerHTML);
      }
      setRangeByWbr(vditor[vditor.currentMode].element, range);
      const tempTopListElement = getTopList(range.startContainer);
      if (tempTopListElement) {
        tempTopListElement.querySelectorAll(`.vditor-${vditor.currentMode}__preview[data-render='2']`).forEach((item) => {
          processCodeRender(item, vditor);
          if (vditor.currentMode === "wysiwyg") {
            item.previousElementSibling.setAttribute("style", "display:none");
          }
        });
      }
      execAfterRender(vditor);
      highlightToolbar(vditor);
    } else {
      vditor[vditor.currentMode].element.focus();
    }
  };
  var listOutdent = (vditor, liElement, range, topListElement) => {
    const liParentLiElement = hasClosestByMatchTag(liElement.parentElement, "LI");
    if (liParentLiElement) {
      vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach((wbr) => {
        wbr.remove();
      });
      range.insertNode(document.createElement("wbr"));
      const liParentElement = liElement.parentElement;
      const liParentAfterElement = liParentElement.cloneNode();
      const liElements = [liElement];
      Array.from(range.cloneContents().children).forEach((item, index) => {
        if (item.nodeType !== 3 && liElement && item.textContent.trim() !== "" && liElement.getAttribute("data-node-id") === item.getAttribute("data-node-id")) {
          if (index !== 0) {
            liElements.push(liElement);
          }
          liElement = liElement.nextElementSibling;
        }
      });
      let isMatch = false;
      let afterHTML = "";
      liParentElement.querySelectorAll("li").forEach((item) => {
        if (isMatch) {
          afterHTML += item.outerHTML;
          if (!item.nextElementSibling && !item.previousElementSibling) {
            item.parentElement.remove();
          } else {
            item.remove();
          }
        }
        if (item.isSameNode(liElements[liElements.length - 1])) {
          isMatch = true;
        }
      });
      liElements.reverse().forEach((item) => {
        liParentLiElement.insertAdjacentElement("afterend", item);
      });
      if (afterHTML) {
        liParentAfterElement.innerHTML = afterHTML;
        liElements[0].insertAdjacentElement("beforeend", liParentAfterElement);
      }
      if (vditor.currentMode === "wysiwyg") {
        topListElement.outerHTML = vditor.lute.SpinVditorDOM(topListElement.outerHTML);
      } else {
        topListElement.outerHTML = vditor.lute.SpinVditorIRDOM(topListElement.outerHTML);
      }
      setRangeByWbr(vditor[vditor.currentMode].element, range);
      const tempTopListElement = getTopList(range.startContainer);
      if (tempTopListElement) {
        tempTopListElement.querySelectorAll(`.vditor-${vditor.currentMode}__preview[data-render='2']`).forEach((item) => {
          processCodeRender(item, vditor);
          if (vditor.currentMode === "wysiwyg") {
            item.previousElementSibling.setAttribute("style", "display:none");
          }
        });
      }
      execAfterRender(vditor);
      highlightToolbar(vditor);
    } else {
      vditor[vditor.currentMode].element.focus();
    }
  };
  var setTableAlign = (tableElement, type) => {
    const cell = getSelection().getRangeAt(0).startContainer.parentElement;
    const columnCnt = tableElement.rows[0].cells.length;
    const rowCnt = tableElement.rows.length;
    let currentColumn = 0;
    for (let i = 0; i < rowCnt; i++) {
      for (let j = 0; j < columnCnt; j++) {
        if (tableElement.rows[i].cells[j].isSameNode(cell)) {
          currentColumn = j;
          break;
        }
      }
    }
    for (let k = 0; k < rowCnt; k++) {
      tableElement.rows[k].cells[currentColumn].setAttribute("align", type);
    }
  };
  var isHrMD = (text) => {
    const marker = text.trimRight().split("\n").pop();
    if (marker === "") {
      return false;
    }
    if (marker.replace(/ |-/g, "") === "" || marker.replace(/ |_/g, "") === "" || marker.replace(/ |\*/g, "") === "") {
      if (marker.replace(/ /g, "").length > 2) {
        if (marker.indexOf("-") > -1 && marker.trimLeft().indexOf(" ") === -1 && text.trimRight().split("\n").length > 1) {
          return false;
        }
        if (marker.indexOf("    ") === 0 || marker.indexOf("	") === 0) {
          return false;
        }
        return true;
      }
      return false;
    }
    return false;
  };
  var isHeadingMD = (text) => {
    const textArray = text.trimRight().split("\n");
    text = textArray.pop();
    if (text.indexOf("    ") === 0 || text.indexOf("	") === 0) {
      return false;
    }
    text = text.trimLeft();
    if (text === "" || textArray.length === 0) {
      return false;
    }
    if (text.replace(/-/g, "") === "" || text.replace(/=/g, "") === "") {
      return true;
    }
    return false;
  };
  var execAfterRender = (vditor, options = {
    enableAddUndoStack: true,
    enableHint: false,
    enableInput: true
  }) => {
    if (vditor.currentMode === "wysiwyg") {
      afterRenderEvent(vditor, options);
    } else if (vditor.currentMode === "ir") {
      processAfterRender(vditor, options);
    } else if (vditor.currentMode === "sv") {
      processAfterRender2(vditor, options);
    }
  };
  var isEmptyListItem = (liElement) => {
    if (liElement.textContent.split(Constants.ZWSP).join("").trim() !== "") {
      return false;
    }
    return !liElement.querySelector([
      "audio",
      "canvas",
      "embed",
      "hr",
      "iframe",
      "img",
      "object",
      "ol",
      "pre",
      "svg",
      "table",
      "ul",
      "video",
      "input:not([type='checkbox'])"
    ].join(", "));
  };
  var exitEmptyListItem = (liElement) => {
    const listElement = liElement.parentElement;
    const listParent = listElement.parentElement;
    const paragraphElement = document.createElement("p");
    paragraphElement.setAttribute("data-block", "0");
    paragraphElement.innerHTML = "<wbr>";
    let trailingListElement;
    if (liElement.nextElementSibling) {
      trailingListElement = listElement.cloneNode(false);
      while (liElement.nextElementSibling) {
        trailingListElement.appendChild(liElement.nextElementSibling);
      }
      listParent.insertBefore(trailingListElement, listElement.nextSibling);
    }
    liElement.remove();
    if (listElement.childElementCount === 0) {
      listParent.replaceChild(paragraphElement, listElement);
    } else {
      listParent.insertBefore(paragraphElement, trailingListElement || listElement.nextSibling);
    }
    return paragraphElement;
  };
  var fixList = (range, vditor, pElement, event) => {
    const startContainer = range.startContainer;
    const liElement = hasClosestByMatchTag(startContainer, "LI");
    if (liElement) {
      if (!isCtrl(event) && !event.altKey && event.key === "Enter" && // fix li 中有多个 P 时，在第一个 P 中换行会在下方生成新的 li
      (!event.shiftKey && pElement && liElement.contains(pElement) && pElement.nextElementSibling)) {
        if (liElement && !liElement.textContent.endsWith("\n")) {
          liElement.insertAdjacentText("beforeend", "\n");
        }
        range.insertNode(document.createTextNode("\n\n"));
        range.collapse(false);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (!isCtrl(event) && !event.shiftKey && !event.altKey && event.key === "Enter" && range.collapsed && !liElement.nextElementSibling && liElement.parentElement.parentElement.tagName === "LI" && isEmptyListItem(liElement)) {
        const paragraphElement = exitEmptyListItem(liElement);
        setRangeByWbr(paragraphElement, range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (!isCtrl(event) && !event.shiftKey && !event.altKey && event.key === "Backspace" && liElement.textContent.trim().replace(Constants.ZWSP, "") === "" && range.toString() === "") {
        const paragraphElement = exitEmptyListItem(liElement);
        setRangeByWbr(paragraphElement, range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (!isCtrl(event) && !event.shiftKey && !event.altKey && event.key === "Backspace" && !liElement.previousElementSibling && range.toString() === "" && getSelectPosition(liElement, vditor[vditor.currentMode].element, range).start === 0) {
        if (liElement.nextElementSibling) {
          liElement.parentElement.insertAdjacentHTML(
            "beforebegin",
            `<p data-block="0"><wbr>${liElement.innerHTML}</p>`
          );
          liElement.remove();
        } else {
          liElement.parentElement.outerHTML = `<p data-block="0"><wbr>${liElement.innerHTML}</p>`;
        }
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (!isCtrl(event) && !event.altKey && event.key === "Tab") {
        let isFirst = false;
        if (range.startOffset === 0 && (startContainer.nodeType === 3 && !startContainer.previousSibling || startContainer.nodeType !== 3 && startContainer.nodeName === "LI")) {
          isFirst = true;
        } else if (liElement.classList.contains("vditor-task") && range.startOffset === 1 && startContainer.previousSibling.nodeType !== 3 && startContainer.previousSibling.tagName === "INPUT") {
          isFirst = true;
        }
        if (isFirst || range.toString() !== "") {
          if (event.shiftKey) {
            listOutdent(vditor, liElement, range, liElement.parentElement);
          } else {
            listIndent(vditor, liElement, range);
          }
          event.preventDefault();
          return true;
        }
      }
    }
    return false;
  };
  var fixTab = (vditor, range, event) => {
    if (vditor.options.tab && event.key === "Tab") {
      if (event.shiftKey) {
      } else {
        if (range.toString() === "") {
          range.insertNode(document.createTextNode(vditor.options.tab));
          range.collapse(false);
        } else {
          range.extractContents();
          range.insertNode(document.createTextNode(vditor.options.tab));
          range.collapse(false);
        }
      }
      setSelectionFocus(range);
      execAfterRender(vditor);
      event.preventDefault();
      return true;
    }
  };
  var fixMarkdown = (event, vditor, pElement, range) => {
    if (!pElement) {
      return;
    }
    if (!isCtrl(event) && !event.altKey && event.key === "Enter") {
      const pText = String.raw`${pElement.textContent}`.replace(/\\\|/g, "").trim();
      const pTextList = pText.split("|");
      if (pText.startsWith("|") && pText.endsWith("|") && pTextList.length > 3) {
        let tableHeaderMD = pTextList.map(() => "---").join("|");
        tableHeaderMD = pElement.textContent + "\n" + tableHeaderMD.substring(3, tableHeaderMD.length - 3) + "\n|<wbr>";
        pElement.outerHTML = vditor.lute.SpinVditorDOM(tableHeaderMD);
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        scrollCenter(vditor);
        event.preventDefault();
        return true;
      }
      if (isHrMD(pElement.innerHTML) && pElement.previousElementSibling) {
        let pInnerHTML = "";
        const innerHTMLList = pElement.innerHTML.trimRight().split("\n");
        if (innerHTMLList.length > 1) {
          innerHTMLList.pop();
          pInnerHTML = `<p data-block="0">${innerHTMLList.join("\n")}</p>`;
        }
        pElement.insertAdjacentHTML(
          "afterend",
          `${pInnerHTML}<hr data-block="0"><p data-block="0"><wbr>
</p>`
        );
        pElement.remove();
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        scrollCenter(vditor);
        event.preventDefault();
        return true;
      }
      if (isHeadingMD(pElement.innerHTML)) {
        if (vditor.currentMode === "wysiwyg") {
          pElement.outerHTML = vditor.lute.SpinVditorDOM(pElement.innerHTML + '<p data-block="0"><wbr>\n</p>');
        } else {
          pElement.outerHTML = vditor.lute.SpinVditorIRDOM(pElement.innerHTML + '<p data-block="0"><wbr>\n</p>');
        }
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        scrollCenter(vditor);
        event.preventDefault();
        return true;
      }
    }
    if (range.collapsed && pElement.previousElementSibling && event.key === "Backspace" && !isCtrl(event) && !event.altKey && !event.shiftKey && pElement.textContent.trimRight().split("\n").length > 1 && getSelectPosition(pElement, vditor[vditor.currentMode].element, range).start === 0) {
      const lastElement = getLastNode(pElement.previousElementSibling);
      if (!lastElement.textContent.endsWith("\n")) {
        lastElement.textContent = lastElement.textContent + "\n";
      }
      lastElement.parentElement.insertAdjacentHTML("beforeend", `<wbr>${pElement.innerHTML}`);
      pElement.remove();
      setRangeByWbr(vditor[vditor.currentMode].element, range);
      return false;
    }
    return false;
  };
  var insertRow = (vditor, range, cellElement) => {
    let rowHTML = "";
    for (let m = 0; m < cellElement.parentElement.childElementCount; m++) {
      rowHTML += `<td align="${cellElement.parentElement.children[m].getAttribute("align")}"> </td>`;
    }
    if (cellElement.tagName === "TH") {
      cellElement.parentElement.parentElement.insertAdjacentHTML(
        "afterend",
        `<tbody><tr>${rowHTML}</tr></tbody>`
      );
    } else {
      cellElement.parentElement.insertAdjacentHTML("afterend", `<tr>${rowHTML}</tr>`);
    }
    execAfterRender(vditor);
  };
  var insertRowAbove = (vditor, range, cellElement) => {
    let rowHTML = "";
    for (let m = 0; m < cellElement.parentElement.childElementCount; m++) {
      if (cellElement.tagName === "TH") {
        rowHTML += `<th align="${cellElement.parentElement.children[m].getAttribute("align")}"> </th>`;
      } else {
        rowHTML += `<td align="${cellElement.parentElement.children[m].getAttribute("align")}"> </td>`;
      }
    }
    if (cellElement.tagName === "TH") {
      cellElement.parentElement.parentElement.insertAdjacentHTML("beforebegin", `<thead><tr>${rowHTML}</tr></thead>`);
      range.insertNode(document.createElement("wbr"));
      const theadHTML = cellElement.parentElement.innerHTML.replace(/<th>/g, "<td>").replace(/<\/th>/g, "</td>");
      cellElement.parentElement.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", theadHTML);
      cellElement.parentElement.parentElement.remove();
      setRangeByWbr(vditor.ir.element, range);
    } else {
      cellElement.parentElement.insertAdjacentHTML("beforebegin", `<tr>${rowHTML}</tr>`);
    }
    execAfterRender(vditor);
  };
  var insertColumn = (vditor, tableElement, cellElement, type = "afterend") => {
    let index = 0;
    let previousElement = cellElement.previousElementSibling;
    while (previousElement) {
      index++;
      previousElement = previousElement.previousElementSibling;
    }
    for (let i = 0; i < tableElement.rows.length; i++) {
      if (i === 0) {
        tableElement.rows[i].cells[index].insertAdjacentHTML(type, "<th> </th>");
      } else {
        tableElement.rows[i].cells[index].insertAdjacentHTML(type, "<td> </td>");
      }
    }
    execAfterRender(vditor);
  };
  var deleteRow = (vditor, range, cellElement) => {
    if (cellElement.tagName === "TD") {
      const tbodyElement = cellElement.parentElement.parentElement;
      if (cellElement.parentElement.previousElementSibling) {
        range.selectNodeContents(cellElement.parentElement.previousElementSibling.lastElementChild);
      } else {
        range.selectNodeContents(tbodyElement.previousElementSibling.lastElementChild.lastElementChild);
      }
      if (tbodyElement.childElementCount === 1) {
        tbodyElement.remove();
      } else {
        cellElement.parentElement.remove();
      }
      range.collapse(false);
      setSelectionFocus(range);
      execAfterRender(vditor);
    }
  };
  var deleteColumn = (vditor, range, tableElement, cellElement) => {
    let index = 0;
    let previousElement = cellElement.previousElementSibling;
    while (previousElement) {
      index++;
      previousElement = previousElement.previousElementSibling;
    }
    if (cellElement.previousElementSibling || cellElement.nextElementSibling) {
      range.selectNodeContents(cellElement.previousElementSibling || cellElement.nextElementSibling);
      range.collapse(true);
    }
    for (let i = 0; i < tableElement.rows.length; i++) {
      const cells = tableElement.rows[i].cells;
      if (cells.length === 1) {
        tableElement.remove();
        highlightToolbar(vditor);
        break;
      }
      cells[index].remove();
    }
    setSelectionFocus(range);
    execAfterRender(vditor);
  };
  var fixTable = (vditor, event, range) => {
    const startContainer = range.startContainer;
    const cellElement = hasClosestByMatchTag(startContainer, "TD") || hasClosestByMatchTag(startContainer, "TH");
    if (cellElement) {
      if (!isCtrl(event) && !event.altKey && event.key === "Enter") {
        if (!cellElement.lastElementChild || cellElement.lastElementChild && (!cellElement.lastElementChild.isSameNode(cellElement.lastChild) || cellElement.lastElementChild.tagName !== "BR")) {
          cellElement.insertAdjacentHTML("beforeend", "<br>");
        }
        const brElement = document.createElement("br");
        range.insertNode(brElement);
        range.setStartAfter(brElement);
        execAfterRender(vditor);
        scrollCenter(vditor);
        event.preventDefault();
        return true;
      }
      if (event.key === "Tab") {
        if (event.shiftKey) {
          goPreviousCell(cellElement, range);
          event.preventDefault();
          return true;
        }
        let nextElement = cellElement.nextElementSibling;
        if (!nextElement) {
          if (cellElement.parentElement.nextElementSibling) {
            nextElement = cellElement.parentElement.nextElementSibling.firstElementChild;
          } else if (cellElement.parentElement.parentElement.tagName === "THEAD" && cellElement.parentElement.parentElement.nextElementSibling) {
            nextElement = cellElement.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild;
          } else {
            nextElement = null;
          }
        }
        if (nextElement) {
          range.selectNodeContents(nextElement);
          setSelectionFocus(range);
        }
        event.preventDefault();
        return true;
      }
      const tableElement = cellElement.parentElement.parentElement.parentElement;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (cellElement.tagName === "TH") {
          if (tableElement.previousElementSibling) {
            range.selectNodeContents(tableElement.previousElementSibling);
            range.collapse(false);
            setSelectionFocus(range);
          } else {
            insertEmptyBlock(vditor, "beforebegin");
          }
          return true;
        }
        let m = 0;
        const trElement = cellElement.parentElement;
        for (; m < trElement.cells.length; m++) {
          if (trElement.cells[m].isSameNode(cellElement)) {
            break;
          }
        }
        let previousElement = trElement.previousElementSibling;
        if (!previousElement) {
          previousElement = trElement.parentElement.previousElementSibling.firstChild;
        }
        range.selectNodeContents(previousElement.cells[m]);
        range.collapse(false);
        setSelectionFocus(range);
        return true;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const trElement = cellElement.parentElement;
        if (!trElement.nextElementSibling && cellElement.tagName === "TD") {
          if (tableElement.nextElementSibling) {
            range.selectNodeContents(tableElement.nextElementSibling);
            range.collapse(true);
            setSelectionFocus(range);
          } else {
            insertEmptyBlock(vditor, "afterend");
          }
          return true;
        }
        let m = 0;
        for (; m < trElement.cells.length; m++) {
          if (trElement.cells[m].isSameNode(cellElement)) {
            break;
          }
        }
        let nextElement = trElement.nextElementSibling;
        if (!nextElement) {
          nextElement = trElement.parentElement.nextElementSibling.firstChild;
        }
        range.selectNodeContents(nextElement.cells[m]);
        range.collapse(true);
        setSelectionFocus(range);
        return true;
      }
      if (vditor.currentMode === "wysiwyg" && !isCtrl(event) && event.key === "Enter" && !event.shiftKey && event.altKey) {
        const inputElement = vditor.wysiwyg.popover.querySelector(".vditor-input");
        inputElement.focus();
        inputElement.select();
        event.preventDefault();
        return true;
      }
      if (!isCtrl(event) && !event.shiftKey && !event.altKey && event.key === "Backspace" && range.startOffset === 0 && range.toString() === "") {
        const previousCellElement = goPreviousCell(cellElement, range, false);
        if (!previousCellElement && tableElement) {
          if (tableElement.textContent.trim() === "") {
            tableElement.outerHTML = `<p data-block="0"><wbr>
</p>`;
            setRangeByWbr(vditor[vditor.currentMode].element, range);
          } else {
            range.setStartBefore(tableElement);
            range.collapse(true);
          }
          execAfterRender(vditor);
        }
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u21E7\u2318F", event)) {
        insertRowAbove(vditor, range, cellElement);
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u2318=", event)) {
        insertRow(vditor, range, cellElement);
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u21E7\u2318G", event)) {
        insertColumn(vditor, tableElement, cellElement, "beforebegin");
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u21E7\u2318=", event)) {
        insertColumn(vditor, tableElement, cellElement);
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u2318-", event)) {
        deleteRow(vditor, range, cellElement);
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u21E7\u2318-", event)) {
        deleteColumn(vditor, range, tableElement, cellElement);
        event.preventDefault();
        return true;
      }
      if (matchHotKey("\u21E7\u2318L", event)) {
        if (vditor.currentMode === "ir") {
          setTableAlign(tableElement, "left");
          execAfterRender(vditor);
          event.preventDefault();
          return true;
        } else {
          const itemElement = vditor.wysiwyg.popover.querySelector('[data-type="left"]');
          if (itemElement) {
            itemElement.click();
            event.preventDefault();
            return true;
          }
        }
      }
      if (matchHotKey("\u21E7\u2318C", event)) {
        if (vditor.currentMode === "ir") {
          setTableAlign(tableElement, "center");
          execAfterRender(vditor);
          event.preventDefault();
          return true;
        } else {
          const itemElement = vditor.wysiwyg.popover.querySelector('[data-type="center"]');
          if (itemElement) {
            itemElement.click();
            event.preventDefault();
            return true;
          }
        }
      }
      if (matchHotKey("\u21E7\u2318R", event)) {
        if (vditor.currentMode === "ir") {
          setTableAlign(tableElement, "right");
          execAfterRender(vditor);
          event.preventDefault();
          return true;
        } else {
          const itemElement = vditor.wysiwyg.popover.querySelector('[data-type="right"]');
          if (itemElement) {
            itemElement.click();
            event.preventDefault();
            return true;
          }
        }
      }
    }
    return false;
  };
  var fixCodeBlock = (vditor, event, codeRenderElement, range) => {
    if (codeRenderElement.tagName === "PRE" && matchHotKey("\u2318A", event)) {
      range.selectNodeContents(codeRenderElement.firstElementChild);
      event.preventDefault();
      return true;
    }
    if (vditor.options.tab && event.key === "Tab" && !event.shiftKey && range.toString() === "") {
      range.insertNode(document.createTextNode(vditor.options.tab));
      range.collapse(false);
      execAfterRender(vditor);
      event.preventDefault();
      return true;
    }
    if (event.key === "Backspace" && !isCtrl(event) && !event.shiftKey && !event.altKey) {
      const codePosition = getSelectPosition(codeRenderElement, vditor[vditor.currentMode].element, range);
      if ((codePosition.start === 0 || codePosition.start === 1 && codeRenderElement.innerText === "\n") && range.toString() === "") {
        codeRenderElement.parentElement.outerHTML = `<p data-block="0"><wbr>${codeRenderElement.firstElementChild.innerHTML}</p>`;
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
    }
    if (!isCtrl(event) && !event.altKey && event.key === "Enter") {
      if (!codeRenderElement.firstElementChild.textContent.endsWith("\n")) {
        codeRenderElement.firstElementChild.insertAdjacentText("beforeend", "\n");
      }
      range.extractContents();
      range.insertNode(document.createTextNode("\n"));
      range.collapse(false);
      setSelectionFocus(range);
      if (!isFirefox()) {
        if (vditor.currentMode === "wysiwyg") {
          input2(vditor, range);
        } else {
          input(vditor, range);
        }
      }
      scrollCenter(vditor);
      event.preventDefault();
      return true;
    }
    return false;
  };
  var fixBlockquote = (vditor, range, event, pElement) => {
    const startContainer = range.startContainer;
    const blockquoteElement = hasClosestByMatchTag(startContainer, "BLOCKQUOTE");
    if (blockquoteElement && range.toString() === "") {
      if (pElement && event.key === "Enter" && !isCtrl(event) && !event.shiftKey && !event.altKey && pElement.parentElement.isSameNode(blockquoteElement) && hasClosestByMatchTag(blockquoteElement.parentElement, "LI") && (range.collapsed || !range.cloneContents().firstElementChild) && pElement.innerHTML.replace(Constants.ZWSP, "") !== "\n" && pElement.innerHTML.replace(Constants.ZWSP, "") !== "") {
        const trailingRange = range.cloneRange();
        trailingRange.setEnd(pElement, pElement.childNodes.length);
        const paragraphElement = document.createElement("p");
        paragraphElement.setAttribute("data-block", "0");
        paragraphElement.appendChild(trailingRange.extractContents());
        pElement.insertAdjacentElement("afterend", paragraphElement);
        range.setStart(paragraphElement, 0);
        range.collapse(true);
        setSelectionFocus(range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (event.key === "Backspace" && !isCtrl(event) && !event.shiftKey && !event.altKey && getSelectPosition(blockquoteElement, vditor[vditor.currentMode].element, range).start === 0) {
        range.insertNode(document.createElement("wbr"));
        blockquoteElement.outerHTML = blockquoteElement.innerHTML;
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (pElement && event.key === "Enter" && !isCtrl(event) && !event.shiftKey && !event.altKey && pElement.parentElement.tagName === "BLOCKQUOTE") {
        let isEmpty = false;
        if (pElement.innerHTML.replace(Constants.ZWSP, "") === "\n" || pElement.innerHTML.replace(Constants.ZWSP, "") === "") {
          isEmpty = true;
          pElement.remove();
        } else if (pElement.innerHTML.endsWith("\n\n") && getSelectPosition(pElement, vditor[vditor.currentMode].element, range).start === pElement.textContent.length - 1) {
          pElement.innerHTML = pElement.innerHTML.substr(0, pElement.innerHTML.length - 2);
          isEmpty = true;
        }
        if (isEmpty) {
          blockquoteElement.insertAdjacentHTML("afterend", `<p data-block="0">${Constants.ZWSP}<wbr>
</p>`);
          setRangeByWbr(vditor[vditor.currentMode].element, range);
          execAfterRender(vditor);
          event.preventDefault();
          return true;
        }
      }
      const blockElement = hasClosestBlock(startContainer);
      if (vditor.currentMode === "wysiwyg" && blockElement && matchHotKey("\u21E7\u2318;", event)) {
        range.insertNode(document.createElement("wbr"));
        blockElement.outerHTML = `<blockquote data-block="0">${blockElement.outerHTML}</blockquote>`;
        setRangeByWbr(vditor.wysiwyg.element, range);
        afterRenderEvent(vditor);
        event.preventDefault();
        return true;
      }
      const itemElement = blockquoteElement.parentElement.tagName === "LI" ? blockquoteElement.parentElement : null;
      const afterBlockElement = !blockquoteElement.nextElementSibling && itemElement?.nextElementSibling?.tagName === "LI" ? itemElement : blockquoteElement;
      if (insertAfterBlock(vditor, event, range, blockquoteElement, afterBlockElement)) {
        return true;
      }
      if (event.key === "ArrowUp" && itemElement && !blockquoteElement.previousElementSibling) {
        return false;
      }
      if (insertBeforeBlock(vditor, event, range, blockquoteElement, blockquoteElement)) {
        return true;
      }
    }
    return false;
  };
  var fixTask = (vditor, range, event) => {
    const startContainer = range.startContainer;
    const taskItemElement = hasClosestByMatchTag(startContainer, "LI");
    if (taskItemElement && taskItemElement.classList.contains("vditor-task")) {
      if (matchHotKey("\u21E7\u2318J", event)) {
        const inputElement = taskItemElement.firstElementChild;
        if (inputElement.checked) {
          inputElement.removeAttribute("checked");
        } else {
          inputElement.setAttribute("checked", "checked");
        }
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (event.key === "Backspace" && !isCtrl(event) && !event.shiftKey && !event.altKey && range.toString() === "" && range.startOffset === 1 && (startContainer.nodeType === 3 && startContainer.previousSibling && startContainer.previousSibling.tagName === "INPUT" || startContainer.nodeType !== 3)) {
        const previousElement = taskItemElement.previousElementSibling;
        taskItemElement.querySelector("input").remove();
        if (previousElement) {
          const lastNode = getLastNode(previousElement);
          lastNode.parentElement.insertAdjacentHTML("beforeend", "<wbr>" + taskItemElement.innerHTML.trim());
          taskItemElement.remove();
        } else {
          taskItemElement.parentElement.insertAdjacentHTML(
            "beforebegin",
            `<p data-block="0"><wbr>${taskItemElement.innerHTML.trim() || "\n"}</p>`
          );
          if (taskItemElement.nextElementSibling) {
            taskItemElement.remove();
          } else {
            taskItemElement.parentElement.remove();
          }
        }
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
      if (event.key === "Enter" && !isCtrl(event) && !event.shiftKey && !event.altKey) {
        if (taskItemElement.textContent.trim() === "") {
          if (hasClosestByClassName(taskItemElement.parentElement, "vditor-task")) {
            const topListElement = getTopList(startContainer);
            if (topListElement) {
              listOutdent(vditor, taskItemElement, range, topListElement);
            }
          } else {
            if (taskItemElement.nextElementSibling) {
              let afterHTML = "";
              let beforeHTML = "";
              let isAfter = false;
              Array.from(taskItemElement.parentElement.children).forEach((taskItem) => {
                if (taskItemElement.isSameNode(taskItem)) {
                  isAfter = true;
                } else {
                  if (isAfter) {
                    afterHTML += taskItem.outerHTML;
                  } else {
                    beforeHTML += taskItem.outerHTML;
                  }
                }
              });
              const parentTagName = taskItemElement.parentElement.tagName;
              const dataMarker = taskItemElement.parentElement.tagName === "OL" ? "" : ` data-marker="${taskItemElement.parentElement.getAttribute("data-marker")}"`;
              let startAttribute = "";
              if (beforeHTML) {
                startAttribute = taskItemElement.parentElement.tagName === "UL" ? "" : ` start="1"`;
                beforeHTML = `<${parentTagName} data-tight="true"${dataMarker} data-block="0">${beforeHTML}</${parentTagName}>`;
              }
              taskItemElement.parentElement.outerHTML = `${beforeHTML}<p data-block="0"><wbr>
</p><${parentTagName}
 data-tight="true"${dataMarker} data-block="0"${startAttribute}>${afterHTML}</${parentTagName}>`;
            } else {
              taskItemElement.parentElement.insertAdjacentHTML("afterend", `<p data-block="0"><wbr>
</p>`);
              if (taskItemElement.parentElement.querySelectorAll("li").length === 1) {
                taskItemElement.parentElement.remove();
              } else {
                taskItemElement.remove();
              }
            }
          }
        } else if (startContainer.nodeType !== 3 && range.startOffset === 0 && startContainer.firstChild.tagName === "INPUT") {
          range.setStart(startContainer.childNodes[1], 1);
        } else {
          range.setEndAfter(taskItemElement.lastChild);
          taskItemElement.insertAdjacentHTML("afterend", `<li class="vditor-task" data-marker="${taskItemElement.getAttribute("data-marker")}"><input type="checkbox"> <wbr></li>`);
          document.querySelector("wbr").after(range.extractContents());
        }
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        scrollCenter(vditor);
        event.preventDefault();
        return true;
      }
    }
    return false;
  };
  var fixDelete = (vditor, range, event, pElement) => {
    if (range.startContainer.nodeType !== 3) {
      const rangeElement = range.startContainer.children[range.startOffset];
      if (rangeElement && rangeElement.tagName === "HR") {
        range.selectNodeContents(rangeElement.previousElementSibling);
        range.collapse(false);
        event.preventDefault();
        return true;
      }
    }
    if (pElement) {
      const previousElement = pElement.previousElementSibling;
      if (previousElement && getSelectPosition(pElement, vditor[vditor.currentMode].element, range).start === 0 && (isFirefox() && previousElement.tagName === "HR" || previousElement.tagName === "TABLE")) {
        if (previousElement.tagName === "TABLE") {
          const lastCellElement = previousElement.lastElementChild.lastElementChild.lastElementChild;
          lastCellElement.innerHTML = lastCellElement.innerHTML.trimLeft() + "<wbr>" + pElement.textContent.trim();
          pElement.remove();
        } else {
          previousElement.remove();
        }
        setRangeByWbr(vditor[vditor.currentMode].element, range);
        execAfterRender(vditor);
        event.preventDefault();
        return true;
      }
    }
    return false;
  };
  var fixHR = (range) => {
    if (isFirefox() && range.startContainer.nodeType !== 3 && range.startContainer.tagName === "HR") {
      range.setStartBefore(range.startContainer);
    }
  };
  var fixFirefoxArrowUpTable = (event, blockElement, range) => {
    if (!isFirefox()) {
      return false;
    }
    if (event.key === "ArrowUp" && blockElement && blockElement.previousElementSibling?.tagName === "TABLE") {
      const tableElement = blockElement.previousElementSibling;
      range.selectNodeContents(tableElement.rows[tableElement.rows.length - 1].lastElementChild);
      range.collapse(false);
      event.preventDefault();
      return true;
    }
    if (event.key === "ArrowDown" && blockElement && blockElement.nextElementSibling?.tagName === "TABLE") {
      range.selectNodeContents(blockElement.nextElementSibling.rows[0].cells[0]);
      range.collapse(true);
      event.preventDefault();
      return true;
    }
    return false;
  };
  var paste = async (vditor, event, callback) => {
    if (vditor.currentMode === "sv" ? vditor.sv.element.disabled : vditor[vditor.currentMode].element.getAttribute("contenteditable") !== "true") {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    let textHTML;
    let textPlain;
    let files;
    if ("clipboardData" in event) {
      textHTML = event.clipboardData.getData("text/html");
      textPlain = event.clipboardData.getData("text/plain");
      files = event.clipboardData.files;
    } else {
      textHTML = event.dataTransfer.getData("text/html");
      textPlain = event.dataTransfer.getData("text/plain");
      if (event.dataTransfer.types.includes("Files")) {
        files = event.dataTransfer.items;
      }
    }
    const renderers = {};
    const renderLinkDest = (node, entering) => {
      if (!entering) {
        return ["", Lute.WalkContinue];
      }
      const parent = node.__internal_object__.Parent;
      if (parent.Type === 33 && parent.LinkType === 3) {
        return ["", Lute.WalkContinue];
      }
      if (vditor.options.upload.renderLinkDest) {
        return vditor.options.upload.renderLinkDest(vditor, node, entering);
      }
      const src = node.TokensStr();
      if (node.__internal_object__.Parent.Type === 34 && src && src.indexOf("file://") === -1 && vditor.options.upload.linkToImgUrl) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", vditor.options.upload.linkToImgUrl);
        if (vditor.options.upload.token) {
          xhr.setRequestHeader("X-Upload-Token", vditor.options.upload.token);
        }
        if (vditor.options.upload.withCredentials) {
          xhr.withCredentials = true;
        }
        setHeaders(vditor, xhr);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              let responseText = xhr.responseText;
              if (vditor.options.upload.linkToImgFormat) {
                responseText = vditor.options.upload.linkToImgFormat(xhr.responseText);
              }
              const responseJSON = JSON.parse(responseText);
              if (responseJSON.code !== 0) {
                vditor.tip.show(responseJSON.msg);
                return;
              }
              const original = responseJSON.data.originalURL;
              if (vditor.currentMode === "sv") {
                const selectionStart = vditor.sv.element.selectionStart;
                const selectionEnd = vditor.sv.element.selectionEnd;
                vditor.sv.element.value = vditor.sv.element.value.split(original).join(responseJSON.data.url);
                vditor.sv.element.setSelectionRange(selectionStart, selectionEnd);
              } else {
                const imgElement = vditor[vditor.currentMode].element.querySelector(`img[src="${original}"]`);
                imgElement.src = responseJSON.data.url;
                if (vditor.currentMode === "ir") {
                  imgElement.previousElementSibling.previousElementSibling.innerHTML = responseJSON.data.url;
                }
              }
              execAfterRender(vditor);
            } else {
              vditor.tip.show(xhr.responseText);
            }
            if (vditor.options.upload.linkToImgCallback) {
              vditor.options.upload.linkToImgCallback(xhr.responseText);
            }
          }
        };
        xhr.send(JSON.stringify({ url: src }));
      }
      if (vditor.currentMode === "ir") {
        return [`<span class="vditor-ir__marker vditor-ir__marker--link">${Lute.EscapeHTMLStr(src)}</span>`, Lute.WalkContinue];
      } else if (vditor.currentMode === "wysiwyg") {
        return ["", Lute.WalkContinue];
      } else {
        return ["", Lute.WalkContinue];
      }
    };
    if (textHTML.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === `<a href="${textPlain}">${textPlain}</a>` || textHTML.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === `<!--StartFragment--><a href="${textPlain}">${textPlain}</a><!--EndFragment-->`) {
      textHTML = "";
    }
    const doc = new DOMParser().parseFromString(textHTML, "text/html");
    if (doc.body) {
      textHTML = doc.body.innerHTML;
    }
    textHTML = Lute.Sanitize(textHTML);
    vditor.wysiwyg.getComments(vditor);
    const height = vditor[vditor.currentMode].element.scrollHeight;
    const code = processPasteCode(textHTML, textPlain, vditor.currentMode);
    const codeElement = vditor.currentMode === "sv" ? hasClosestByAttribute(event.target, "data-type", "code-block") : hasClosestByMatchTag(event.target, "CODE");
    const cellElement = vditor.currentMode === "wysiwyg" && (hasClosestByMatchTag(getEditorRange(vditor).startContainer, "TD") || hasClosestByMatchTag(getEditorRange(vditor).startContainer, "TH"));
    if (cellElement && /[\r\n]/.test(textPlain)) {
      insertHTML(Lute.EscapeHTMLStr(textPlain).replace(/\r\n|\r|\n/g, "<br>"), vditor);
    } else if (codeElement) {
      if (vditor.currentMode === "sv") {
        document.execCommand("insertHTML", false, textPlain.replace(/&/g, "&amp;").replace(/</g, "&lt;"));
      } else {
        const position = getSelectPosition(event.target, vditor[vditor.currentMode].element);
        if (codeElement.parentElement.tagName !== "PRE") {
          textPlain += Constants.ZWSP;
        }
        codeElement.textContent = codeElement.textContent.substring(0, position.start) + textPlain + codeElement.textContent.substring(position.end);
        setSelectionByPosition(
          position.start + textPlain.length,
          position.start + textPlain.length,
          codeElement.parentElement
        );
        if (codeElement.parentElement?.nextElementSibling.classList.contains(`vditor-${vditor.currentMode}__preview`)) {
          codeElement.parentElement.nextElementSibling.innerHTML = codeElement.outerHTML;
          processCodeRender(codeElement.parentElement.nextElementSibling, vditor);
        }
      }
    } else if (code) {
      callback.pasteCode(code);
    } else {
      if (textHTML.trim() !== "") {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = textHTML;
        if (!vditor.options.upload.base64ToLink) {
          await processVMLImage(vditor, tempElement, ("clipboardData" in event ? event.clipboardData : event.dataTransfer).getData("text/rtf"));
        }
        tempElement.querySelectorAll("[style]").forEach((e) => {
          e.removeAttribute("style");
        });
        tempElement.querySelectorAll(".vditor-copy").forEach((e) => {
          e.remove();
        });
        if (vditor.currentMode === "ir") {
          renderers.HTML2VditorIRDOM = { renderLinkDest };
          vditor.lute.SetJSRenderers({ renderers });
          insertHTML(vditor.lute.HTML2VditorIRDOM(tempElement.innerHTML), vditor);
        } else if (vditor.currentMode === "wysiwyg") {
          renderers.HTML2VditorDOM = { renderLinkDest };
          vditor.lute.SetJSRenderers({ renderers });
          insertHTML(vditor.lute.HTML2VditorDOM(tempElement.innerHTML), vditor);
        } else {
          processPaste(vditor, vditor.lute.HTML2Md(tempElement.innerHTML).trimRight());
        }
        vditor.outline.render(vditor);
      } else if (files.length > 0) {
        if (vditor.options.upload.url || vditor.options.upload.handler) {
          await uploadFiles(vditor, files);
        } else {
          const fileReader = new FileReader();
          let file;
          if ("clipboardData" in event) {
            files = event.clipboardData.files;
            file = files[0];
          } else if (event.dataTransfer.types.includes("Files")) {
            files = event.dataTransfer.items;
            file = files[0].getAsFile();
          }
          if (file && file.type.startsWith("image")) {
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              let imgHTML = "";
              if (vditor.currentMode === "wysiwyg") {
                imgHTML += `<img alt="${file.name}" src="${fileReader.result.toString()}">
`;
              } else {
                imgHTML += `![${file.name}](${fileReader.result.toString()})
`;
              }
              if (vditor.currentMode === "sv") {
                processPaste(vditor, imgHTML);
                execAfterRender(vditor);
              } else {
                document.execCommand("insertHTML", false, imgHTML);
              }
            };
          }
        }
      } else if (textPlain.trim() !== "" && files.length === 0) {
        const selectedText = vditor.currentMode === "sv" ? vditor.sv.element.value.substring(
          vditor.sv.element.selectionStart,
          vditor.sv.element.selectionEnd
        ) : getEditorRange(vditor).toString();
        if (selectedText !== "" && vditor.lute.IsValidLinkDest(textPlain)) {
          textPlain = `[${selectedText}](${textPlain})`;
        }
        if (vditor.currentMode === "ir") {
          renderers.Md2VditorIRDOM = { renderLinkDest };
          vditor.lute.SetJSRenderers({ renderers });
          insertHTML(Lute.Sanitize(vditor.lute.Md2VditorIRDOM(textPlain)), vditor);
        } else if (vditor.currentMode === "wysiwyg") {
          renderers.Md2VditorDOM = { renderLinkDest };
          vditor.lute.SetJSRenderers({ renderers });
          insertHTML(Lute.Sanitize(vditor.lute.Md2VditorDOM(textPlain)), vditor);
        } else {
          processPaste(vditor, textPlain);
        }
        vditor.outline.render(vditor);
      }
    }
    if (vditor.currentMode !== "sv") {
      const blockElement = hasClosestBlock(getEditorRange(vditor).startContainer);
      if (blockElement) {
        const range = getEditorRange(vditor);
        vditor[vditor.currentMode].element.querySelectorAll("wbr").forEach((wbr) => {
          wbr.remove();
        });
        range.insertNode(document.createElement("wbr"));
        if (vditor.currentMode === "wysiwyg") {
          blockElement.outerHTML = vditor.lute.SpinVditorDOM(blockElement.outerHTML);
        } else {
          blockElement.outerHTML = vditor.lute.SpinVditorIRDOM(blockElement.outerHTML);
        }
        setRangeByWbr(vditor[vditor.currentMode].element, range);
      }
      vditor[vditor.currentMode].element.querySelectorAll(`.vditor-${vditor.currentMode}__preview[data-render='2']`).forEach((item) => {
        processCodeRender(item, vditor);
      });
    }
    vditor.wysiwyg.triggerRemoveComment(vditor);
    execAfterRender(vditor);
    if (vditor[vditor.currentMode].element.scrollHeight - height > Math.min(vditor[vditor.currentMode].element.clientHeight, window.innerHeight) / 2) {
      scrollCenter(vditor);
    }
  };
  var processVMLImage = async (vditor, root, rtfData) => {
    if (!rtfData) {
      return;
    }
    const regexPictureHeader = /{\\pict[\s\S]+?\\bliptag-?\d+(\\blipupi-?\d+)?({\\\*\\blipuid\s?[\da-fA-F]+)?[\s}]*?/;
    const regexPicture = new RegExp("(?:(" + regexPictureHeader.source + "))([\\da-fA-F\\s]+)\\}", "g");
    const regImages = rtfData.match(regexPicture);
    const images = [];
    if (regImages) {
      for (const image of regImages) {
        let imageType;
        if (image.includes("\\pngblip")) {
          imageType = "image/png";
        } else if (image.includes("\\jpegblip")) {
          imageType = "image/jpeg";
        }
        if (imageType) {
          images.push({
            hex: image.replace(regexPictureHeader, "").replace(/[^\da-fA-F]/g, ""),
            type: imageType
          });
        }
      }
    }
    const shapes = [];
    walk(root, (child) => {
      if (child.tagName === "V:SHAPE") {
        walk(child, (sub) => {
          if (sub.tagName === "V:IMAGEDATA") shapes.push({ shape: child, img: sub });
        });
        return false;
      }
    });
    for (let i = 0; i < shapes.length; i++) {
      const img = document.createElement("img");
      const newSrc = "data:" + images[i].type + ";base64," + btoa((images[i].hex.match(/\w{2}/g) || []).map((char) => {
        return String.fromCharCode(parseInt(char, 16));
      }).join(""));
      img.src = newSrc;
      img.title = shapes[i].img.getAttribute("title");
      shapes[i].shape.parentNode.replaceChild(img, shapes[i].shape);
    }
    const imgs = root.querySelectorAll("img");
    for (let i = 0; i < imgs.length; i++) {
      const src = imgs[i].src || "";
      if (src) imgs[i].src = await vditor.options.upload.base64ToLink(src);
    }
  };
  var walk = (el, fn) => {
    const goNext = fn(el);
    if (goNext !== false)
      for (let i = 0; i < el.children.length; i++) {
        walk(el.children[i], fn);
      }
  };

  // vditor-master/src/ts/ir/process.ts
  var processHint = (vditor) => {
    vditor.hint.render(vditor);
    const startContainer = getEditorRange(vditor).startContainer;
    const preBeforeElement = hasClosestByAttribute(startContainer, "data-type", "code-block-info");
    if (preBeforeElement) {
      if (preBeforeElement.textContent.replace(Constants.ZWSP, "") === "" && vditor.hint.recentLanguage) {
        preBeforeElement.textContent = Constants.ZWSP + vditor.hint.recentLanguage;
        const range = getEditorRange(vditor);
        range.selectNodeContents(preBeforeElement);
      } else {
        const matchLangData = [];
        const key = preBeforeElement.textContent.substring(0, getSelectPosition(preBeforeElement, vditor.ir.element).start).replace(Constants.ZWSP, "");
        (vditor.options.preview.hljs.langs || Constants.ALIAS_CODE_LANGUAGES.concat((window.hljs?.listLanguages() ?? []).sort())).forEach((keyName) => {
          if (keyName.indexOf(key.toLowerCase()) > -1) {
            matchLangData.push({
              html: keyName,
              value: keyName
            });
          }
        });
        vditor.hint.genHTML(matchLangData, key, vditor);
      }
    }
  };
  var processAfterRender = (vditor, options = {
    enableAddUndoStack: true,
    enableHint: false,
    enableInput: true
  }) => {
    renderImageCaptions(vditor.ir.element, "ir", vditor.options.preview.markdown.imageCaption);
    if (options.enableHint) {
      processHint(vditor);
    }
    clearTimeout(vditor.ir.processTimeoutId);
    vditor.ir.processTimeoutId = window.setTimeout(() => {
      if (vditor.ir.composingLock) {
        return;
      }
      const text = getMarkdown(vditor);
      if (typeof vditor.options.input === "function" && options.enableInput) {
        vditor.options.input(text);
      }
      if (vditor.options.counter.enable) {
        vditor.counter.render(vditor, text);
      }
      if (vditor.options.cache.enable && accessLocalStorage()) {
        localStorage.setItem(vditor.options.cache.id, text);
        if (vditor.options.cache.after) {
          vditor.options.cache.after(text);
        }
      }
      if (vditor.devtools) {
        vditor.devtools.renderEchart(vditor);
      }
      if (options.enableAddUndoStack) {
        vditor.undo.addToUndoStack(vditor);
      }
    }, vditor.options.undoDelay);
  };
  var processHeading2 = (vditor, value) => {
    const range = getEditorRange(vditor);
    const headingElement = hasClosestBlock(range.startContainer) || range.startContainer;
    if (headingElement) {
      const headingMarkerElement = headingElement.querySelector(".vditor-ir__marker--heading");
      if (headingMarkerElement) {
        headingMarkerElement.innerHTML = value;
      } else {
        headingElement.insertAdjacentText("afterbegin", value);
        range.selectNodeContents(headingElement);
        range.collapse(false);
      }
      input(vditor, range.cloneRange());
      highlightToolbarIR(vditor);
    }
  };
  var removeInline = (range, vditor, type) => {
    const inlineElement = hasClosestByAttribute(range.startContainer, "data-type", type);
    if (inlineElement) {
      const keepSelection = !range.collapsed;
      inlineElement.firstElementChild.remove();
      inlineElement.lastElementChild.remove();
      if (keepSelection) {
        const endRange = range.cloneRange();
        endRange.collapse(false);
        endRange.insertNode(document.createElement("wbr"));
      }
      range.insertNode(document.createElement("wbr"));
      const tempElement = document.createElement("div");
      tempElement.innerHTML = vditor.lute.SpinVditorIRDOM(inlineElement.outerHTML);
      inlineElement.outerHTML = tempElement.firstElementChild.innerHTML.trim();
      if (keepSelection) {
        setRangeByWbr(vditor.ir.element, range);
        const endWbrElement = vditor.ir.element.querySelector("wbr");
        range.setEndBefore(endWbrElement);
        endWbrElement.remove();
        setSelectionFocus(range);
      }
    }
  };
  var processToolbar2 = (vditor, actionBtn, prefix, suffix) => {
    const range = getEditorRange(vditor);
    const commandName = actionBtn.getAttribute("data-type");
    let typeElement = range.startContainer;
    if (typeElement.nodeType === 3) {
      typeElement = typeElement.parentElement;
    }
    let useHighlight = true;
    if (actionBtn.classList.contains("vditor-menu--current")) {
      if (commandName === "quote") {
        const quoteElement = hasClosestByMatchTag(typeElement, "BLOCKQUOTE");
        if (quoteElement) {
          range.insertNode(document.createElement("wbr"));
          quoteElement.outerHTML = quoteElement.innerHTML.trim() === "" ? `<p data-block="0">${quoteElement.innerHTML}</p>` : quoteElement.innerHTML;
        }
      } else if (commandName === "link") {
        const aElement = hasClosestByAttribute(range.startContainer, "data-type", "a");
        if (aElement) {
          const aTextElement = hasClosestByClassName(range.startContainer, "vditor-ir__link");
          if (aTextElement) {
            range.insertNode(document.createElement("wbr"));
            aElement.outerHTML = aTextElement.innerHTML;
          } else {
            aElement.outerHTML = aElement.querySelector(".vditor-ir__link").innerHTML + "<wbr>";
          }
        }
      } else if (commandName === "italic") {
        removeInline(range, vditor, "em");
      } else if (commandName === "bold") {
        removeInline(range, vditor, "strong");
      } else if (commandName === "strike") {
        removeInline(range, vditor, "s");
      } else if (commandName === "inline-code") {
        removeInline(range, vditor, "code");
      } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
        listToggle(vditor, range, commandName);
        useHighlight = false;
        actionBtn.classList.remove("vditor-menu--current");
      }
    } else {
      if (vditor.ir.element.childNodes.length === 0) {
        vditor.ir.element.innerHTML = '<p data-block="0"><wbr></p>';
        setRangeByWbr(vditor.ir.element, range);
      }
      const blockElement = hasClosestBlock(range.startContainer);
      if (commandName === "line") {
        if (blockElement) {
          const hrHTML = '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
          if (blockElement.innerHTML.trim() === "") {
            blockElement.outerHTML = hrHTML;
          } else {
            blockElement.insertAdjacentHTML("afterend", hrHTML);
          }
        }
      } else if (commandName === "quote") {
        if (blockElement) {
          range.insertNode(document.createElement("wbr"));
          blockElement.outerHTML = `<blockquote data-block="0">${blockElement.outerHTML}</blockquote>`;
          useHighlight = false;
          actionBtn.classList.add("vditor-menu--current");
        }
      } else if (commandName === "link") {
        let html;
        if (range.toString() === "") {
          html = `${prefix}<wbr>${suffix}`;
        } else {
          html = `${prefix}${range.toString()}${suffix.replace(")", "<wbr>)")}`;
        }
        document.execCommand("insertHTML", false, html);
        useHighlight = false;
        actionBtn.classList.add("vditor-menu--current");
      } else if (commandName === "italic" || commandName === "bold" || commandName === "strike" || commandName === "inline-code" || commandName === "code" || commandName === "table") {
        let html;
        let keepSelection = false;
        if (range.toString() === "") {
          html = `${prefix}<wbr>${suffix}`;
        } else {
          if (commandName === "code") {
            html = `${prefix}
${range.toString()}<wbr>${suffix}`;
          } else if (commandName === "table") {
            html = `${prefix}${range.toString()}<wbr>${suffix}`;
          } else {
            html = `${prefix}<wbr>${range.toString()}<wbr>${suffix}`;
            keepSelection = true;
          }
          range.deleteContents();
        }
        if (commandName === "table" || commandName === "code") {
          html = "\n" + html + "\n\n";
        }
        const spanElement = document.createElement("span");
        spanElement.innerHTML = html;
        range.insertNode(spanElement);
        input(vditor, range);
        if (keepSelection) {
          const endWbrElement = vditor.ir.element.querySelector("wbr");
          range.setEndBefore(endWbrElement);
          endWbrElement.remove();
          setSelectionFocus(range);
        }
        if (commandName === "table") {
          range.selectNodeContents(getSelection().getRangeAt(0).startContainer.parentElement);
          setSelectionFocus(range);
        }
      } else if (commandName === "check" || commandName === "list" || commandName === "ordered-list") {
        listToggle(vditor, range, commandName, false);
        useHighlight = false;
        removeCurrentToolbar(vditor.toolbar.elements, ["check", "list", "ordered-list"]);
        actionBtn.classList.add("vditor-menu--current");
      }
    }
    setRangeByWbr(vditor.ir.element, range);
    processAfterRender(vditor);
    if (useHighlight) {
      highlightToolbarIR(vditor);
    }
  };

  // vditor-master/src/ts/hint/index.ts
  var Hint = class {
    constructor(hintExtends) {
      this.splitChar = "";
      this.lastIndex = -1;
      this.fillEmoji = (element, vditor) => {
        this.element.style.display = "none";
        if (vditor.currentMode === "sv") {
          return;
        }
        const value = decodeURIComponent(element.getAttribute("data-value"));
        const range = window.getSelection().getRangeAt(0);
        if (vditor.currentMode === "ir") {
          const preBeforeElement = hasClosestByAttribute(range.startContainer, "data-type", "code-block-info");
          if (preBeforeElement) {
            preBeforeElement.textContent = Constants.ZWSP + value.trimRight();
            range.selectNodeContents(preBeforeElement);
            range.collapse(false);
            processAfterRender(vditor);
            preBeforeElement.parentElement.querySelectorAll("code").forEach((item) => {
              item.className = "language-" + value.trimRight();
            });
            processCodeRender(preBeforeElement.parentElement.querySelector(".vditor-ir__preview"), vditor);
            this.recentLanguage = value.trimRight();
            return;
          }
        }
        if (vditor.currentMode === "wysiwyg" && range.startContainer.nodeType !== 3) {
          const startContainer = range.startContainer;
          let inputElement;
          if (startContainer.classList.contains("vditor-input")) {
            inputElement = startContainer;
          } else {
            inputElement = startContainer.firstElementChild;
          }
          if (inputElement && inputElement.classList.contains("vditor-input")) {
            inputElement.value = value.trimRight();
            range.selectNodeContents(inputElement);
            range.collapse(false);
            inputElement.dispatchEvent(new CustomEvent("input", { detail: 1 }));
            this.recentLanguage = value.trimRight();
            return;
          }
        }
        range.setStart(range.startContainer, this.lastIndex);
        range.deleteContents();
        if (vditor.options.hint.parse) {
          if (vditor.currentMode === "wysiwyg") {
            insertHTML(vditor.lute.SpinVditorDOM(value), vditor);
          } else {
            insertHTML(vditor.lute.SpinVditorIRDOM(value), vditor);
          }
        } else {
          insertHTML(value, vditor);
        }
        if (this.splitChar === ":" && value.indexOf(":") > -1) {
          range.insertNode(document.createTextNode(" "));
        }
        range.collapse(false);
        setSelectionFocus(range);
        if (vditor.currentMode === "wysiwyg") {
          const preElement = hasClosestByClassName(range.startContainer, "vditor-wysiwyg__block");
          if (preElement && preElement.lastElementChild.classList.contains("vditor-wysiwyg__preview")) {
            preElement.lastElementChild.innerHTML = preElement.firstElementChild.innerHTML;
            processCodeRender(preElement.lastElementChild, vditor);
          }
        } else if (vditor.currentMode === "ir") {
          const preElement = hasClosestByClassName(range.startContainer, "vditor-ir__marker--pre");
          if (preElement && preElement.nextElementSibling.classList.contains("vditor-ir__preview")) {
            preElement.nextElementSibling.innerHTML = preElement.innerHTML;
            processCodeRender(preElement.nextElementSibling, vditor);
          }
        }
        execAfterRender(vditor);
      };
      this.timeId = -1;
      this.element = document.createElement("div");
      this.element.className = "vditor-hint";
      this.recentLanguage = "";
      hintExtends.push({ key: ":" });
    }
    render(vditor) {
      if (vditor.currentMode === "sv") {
        this.element.style.display = "none";
        return;
      }
      if (!window.getSelection().focusNode) {
        return;
      }
      let currentLineValue;
      const range = getSelection().getRangeAt(0);
      currentLineValue = range.startContainer.textContent.substring(0, range.startOffset) || "";
      const key = this.getKey(currentLineValue, vditor.options.hint.extend);
      if (typeof key === "undefined") {
        this.element.style.display = "none";
        clearTimeout(this.timeId);
      } else {
        if (this.splitChar === ":") {
          const emojiHint = key === "" ? vditor.options.hint.emoji : vditor.lute.GetEmojis();
          const matchEmojiData = [];
          Object.keys(emojiHint).forEach((keyName) => {
            if (keyName.indexOf(key.toLowerCase()) === 0) {
              if (emojiHint[keyName].indexOf(".") > -1) {
                matchEmojiData.push({
                  html: `<img src="${emojiHint[keyName]}" title=":${keyName}:"/> :${keyName}:`,
                  value: `:${keyName}:`
                });
              } else {
                matchEmojiData.push({
                  html: `<span class="vditor-hint__emoji">${emojiHint[keyName]}</span>${keyName}`,
                  value: emojiHint[keyName]
                });
              }
            }
          });
          this.genHTML(matchEmojiData, key, vditor);
        } else {
          vditor.options.hint.extend.forEach((item) => {
            if (item.key === this.splitChar) {
              clearTimeout(this.timeId);
              this.timeId = window.setTimeout(async () => {
                this.genHTML(await item.hint(key), key, vditor);
              }, vditor.options.hint.delay);
            }
          });
        }
      }
    }
    genHTML(data, key, vditor) {
      if (data.length === 0) {
        this.element.style.display = "none";
        return;
      }
      const editorElement = vditor[vditor.currentMode].element;
      const textareaPosition = getCursorPosition(editorElement);
      const x = textareaPosition.left + (vditor.options.outline.position === "left" ? vditor.outline.element.offsetWidth : 0);
      const y = textareaPosition.top;
      let hintsHTML = "";
      data.forEach((hintData, i) => {
        if (i > 7) {
          return;
        }
        let html = hintData.html;
        if (key !== "") {
          const lastIndex = html.lastIndexOf(">") + 1;
          let replaceHtml = html.substr(lastIndex);
          const replaceIndex = replaceHtml.toLowerCase().indexOf(key.toLowerCase());
          if (replaceIndex > -1) {
            replaceHtml = replaceHtml.substring(0, replaceIndex) + "<b>" + replaceHtml.substring(replaceIndex, replaceIndex + key.length) + "</b>" + replaceHtml.substring(replaceIndex + key.length);
            html = html.substr(0, lastIndex) + replaceHtml;
          }
        }
        hintsHTML += `<button type="button" data-value="${encodeURIComponent(hintData.value)} "
${i === 0 ? "class='vditor-hint--current'" : ""}> ${html}</button>`;
      });
      this.element.innerHTML = hintsHTML;
      const lineHeight = parseInt(document.defaultView.getComputedStyle(editorElement, null).getPropertyValue("line-height"), 10);
      this.element.style.top = `${y + (lineHeight || 22)}px`;
      this.element.style.left = `${x}px`;
      this.element.style.display = "block";
      this.element.style.right = "auto";
      this.element.querySelectorAll("button").forEach((element) => {
        element.addEventListener("click", (event) => {
          this.fillEmoji(element, vditor);
          event.preventDefault();
        });
      });
      if (this.element.getBoundingClientRect().bottom > window.innerHeight) {
        this.element.style.top = `${y - this.element.offsetHeight}px`;
      }
      if (this.element.getBoundingClientRect().right > window.innerWidth) {
        this.element.style.left = "auto";
        this.element.style.right = "0";
      }
    }
    select(event, vditor) {
      if (this.element.querySelectorAll("button").length === 0 || this.element.style.display === "none") {
        return false;
      }
      const currentHintElement = this.element.querySelector(".vditor-hint--current");
      if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        currentHintElement.removeAttribute("class");
        if (!currentHintElement.nextElementSibling) {
          this.element.children[0].className = "vditor-hint--current";
        } else {
          currentHintElement.nextElementSibling.className = "vditor-hint--current";
        }
        return true;
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        currentHintElement.removeAttribute("class");
        if (!currentHintElement.previousElementSibling) {
          const length = this.element.children.length;
          this.element.children[length - 1].className = "vditor-hint--current";
        } else {
          currentHintElement.previousElementSibling.className = "vditor-hint--current";
        }
        return true;
      } else if (!isCtrl(event) && !event.shiftKey && !event.altKey && event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        event.stopPropagation();
        this.fillEmoji(currentHintElement, vditor);
        return true;
      }
      return false;
    }
    getKey(currentLineValue, extend) {
      this.lastIndex = -1;
      this.splitChar = "";
      extend.forEach((item) => {
        const currentLastIndex = currentLineValue.lastIndexOf(item.key);
        if (this.lastIndex < currentLastIndex) {
          this.splitChar = item.key;
          this.lastIndex = currentLastIndex;
        }
      });
      let key;
      if (this.lastIndex === -1) {
        return key;
      }
      const lineArray = currentLineValue.split(this.splitChar);
      const lastItem = lineArray[lineArray.length - 1];
      const maxLength = 32;
      if (lineArray.length > 1 && lastItem.trim() === lastItem) {
        if (lineArray.length === 2 && lineArray[0] === "" && lineArray[1].length < maxLength) {
          key = lineArray[1];
        } else {
          const preChar = lineArray[lineArray.length - 2].slice(-1);
          if (code160to32(preChar) === " " && lastItem.length < maxLength) {
            key = lastItem;
          }
        }
      }
      return key;
    }
  };

  // vditor-master/src/ts/ir/index.ts
  var getHeadingMarker = (headingElement) => {
    return Array.from(headingElement.children).find((item) => item.getAttribute("data-type") === "heading-marker");
  };
  var restoreHeadingMarker = (sourceHeading, copiedHeading) => {
    if (!sourceHeading || !copiedHeading || sourceHeading.tagName !== copiedHeading.tagName || sourceHeading.getAttribute("data-marker") !== copiedHeading.getAttribute("data-marker") || copiedHeading.textContent.trim() === "" || getHeadingMarker(copiedHeading)) {
      return;
    }
    const markerElement = getHeadingMarker(sourceHeading);
    if (!markerElement) {
      return;
    }
    if (sourceHeading.firstElementChild === markerElement) {
      copiedHeading.insertBefore(markerElement.cloneNode(true), copiedHeading.firstChild);
    } else if (sourceHeading.lastElementChild === markerElement) {
      copiedHeading.appendChild(markerElement.cloneNode(true));
    }
  };
  var IR = class {
    constructor(vditor) {
      this.composingLock = false;
      const divElement = document.createElement("div");
      divElement.className = "vditor-ir";
      divElement.innerHTML = `<pre class="vditor-reset" placeholder="${vditor.options.placeholder}"
 contenteditable="true" spellcheck="false"></pre>`;
      this.element = divElement.firstElementChild;
      this.bindEvent(vditor);
      focusEvent(vditor, this.element);
      dblclickEvent(vditor, this.element);
      blurEvent(vditor, this.element);
      hotkeyEvent(vditor, this.element);
      selectEvent(vditor, this.element);
      dropEvent(vditor, this.element);
      copyEvent(vditor, this.element, this.copy);
      cutEvent(vditor, this.element, this.copy);
    }
    copy(event, vditor) {
      const range = getSelection().getRangeAt(0);
      if (range.toString() === "") {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      const tempElement = document.createElement("div");
      tempElement.appendChild(range.cloneContents());
      const copiedHeadings = tempElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
      restoreHeadingMarker(hasClosestByHeadings(range.startContainer), copiedHeadings.item(0));
      restoreHeadingMarker(hasClosestByHeadings(range.endContainer), copiedHeadings.item(copiedHeadings.length - 1));
      event.clipboardData.setData("text/plain", vditor.lute.VditorIRDOM2Md(tempElement.innerHTML).trim());
      event.clipboardData.setData("text/html", "");
    }
    bindEvent(vditor) {
      this.element.addEventListener("paste", (event) => {
        paste(vditor, event, {
          pasteCode: (code) => {
            document.execCommand("insertHTML", false, code);
          }
        });
      });
      this.element.addEventListener("scroll", () => {
        hidePanel(vditor, ["hint"]);
      });
      this.element.addEventListener("compositionstart", (event) => {
        this.composingLock = true;
      });
      this.element.addEventListener("compositionend", (event) => {
        if (!isFirefox()) {
          input(vditor, getSelection().getRangeAt(0).cloneRange());
        }
        this.composingLock = false;
      });
      this.element.addEventListener("input", (event) => {
        if (event.inputType === "deleteByDrag" || event.inputType === "insertFromDrop") {
          return;
        }
        if (this.preventInput) {
          this.preventInput = false;
          processAfterRender(vditor, {
            enableAddUndoStack: true,
            enableHint: true,
            enableInput: true
          });
          return;
        }
        if (this.composingLock || event.data === "\u2018" || event.data === "\u201C" || event.data === "\u300A") {
          return;
        }
        input(vditor, getSelection().getRangeAt(0).cloneRange(), false, event);
      });
      this.element.addEventListener("click", (event) => {
        if (event.target.tagName === "INPUT") {
          if (event.target.checked) {
            event.target.setAttribute("checked", "checked");
          } else {
            event.target.removeAttribute("checked");
          }
          this.preventInput = true;
          processAfterRender(vditor);
          return;
        }
        const range = getEditorRange(vditor);
        let previewElement = hasClosestByClassName(event.target, "vditor-ir__preview");
        if (!previewElement) {
          previewElement = hasClosestByClassName(
            range.startContainer,
            "vditor-ir__preview"
          );
        }
        if (previewElement) {
          if (previewElement.previousElementSibling.firstElementChild) {
            range.selectNodeContents(previewElement.previousElementSibling.firstElementChild);
          } else {
            range.selectNodeContents(previewElement.previousElementSibling);
          }
          range.collapse(true);
          setSelectionFocus(range);
          scrollCenter(vditor);
        }
        if (event.target.tagName === "IMG") {
          const linkElement = event.target.parentElement.querySelector(".vditor-ir__marker--link");
          if (linkElement) {
            range.selectNode(linkElement);
            setSelectionFocus(range);
          }
        }
        const aElement = hasClosestByAttribute(event.target, "data-type", "a");
        if (aElement && !aElement.classList.contains("vditor-ir__node--expand")) {
          if (vditor.options.link.click) {
            vditor.options.link.click(aElement.querySelector(":scope > .vditor-ir__marker--link"));
          } else if (vditor.options.link.isOpen) {
            window.open(aElement.querySelector(":scope > .vditor-ir__marker--link").textContent);
          }
          return;
        }
        if (event.target.isEqualNode(this.element) && this.element.lastElementChild && range.collapsed) {
          const lastRect = this.element.lastElementChild.getBoundingClientRect();
          if (event.y > lastRect.top + lastRect.height) {
            if (this.element.lastElementChild.tagName === "P" && this.element.lastElementChild.textContent.trim().replace(Constants.ZWSP, "") === "") {
              range.selectNodeContents(this.element.lastElementChild);
              range.collapse(false);
            } else {
              this.element.insertAdjacentHTML(
                "beforeend",
                `<p data-block="0">${Constants.ZWSP}<wbr></p>`
              );
              setRangeByWbr(this.element, range);
            }
          }
        }
        if (range.toString() === "") {
          expandMarker(range, vditor);
        } else {
          setTimeout(() => {
            expandMarker(getEditorRange(vditor), vditor);
          });
        }
        clickToc(event, vditor);
        highlightToolbarIR(vditor);
      });
      this.element.addEventListener("keyup", (event) => {
        if (event.isComposing || isCtrl(event)) {
          return;
        }
        if (event.key === "Enter") {
          scrollCenter(vditor);
        }
        highlightToolbarIR(vditor);
        if ((event.key === "Backspace" || event.key === "Delete") && vditor.ir.element.innerHTML !== "" && vditor.ir.element.childNodes.length === 1 && vditor.ir.element.firstElementChild && vditor.ir.element.firstElementChild.tagName === "P" && vditor.ir.element.firstElementChild.childElementCount === 0 && (vditor.ir.element.textContent === "" || vditor.ir.element.textContent === "\n")) {
          vditor.ir.element.innerHTML = "";
          return;
        }
        const range = getEditorRange(vditor);
        if (event.key === "Backspace") {
          if (isFirefox() && range.startContainer.textContent === "\n" && range.startOffset === 1) {
            range.startContainer.textContent = "";
            expandMarker(range, vditor);
          }
          this.element.querySelectorAll(".language-math").forEach((item) => {
            const brElement = item.querySelector("br");
            if (brElement) {
              brElement.remove();
            }
          });
        } else if (event.key.indexOf("Arrow") > -1) {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            processHint(vditor);
          }
          expandMarker(range, vditor);
        } else if (event.keyCode === 229 && event.code === "" && event.key === "Unidentified") {
          expandMarker(range, vditor);
        }
        const previewRenderElement = hasClosestByClassName(range.startContainer, "vditor-ir__preview");
        if (previewRenderElement) {
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            if (previewRenderElement.previousElementSibling.firstElementChild) {
              range.selectNodeContents(previewRenderElement.previousElementSibling.firstElementChild);
            } else {
              range.selectNodeContents(previewRenderElement.previousElementSibling);
            }
            range.collapse(false);
            event.preventDefault();
            return true;
          }
          if (previewRenderElement.tagName === "SPAN" && (event.key === "ArrowDown" || event.key === "ArrowRight")) {
            if (previewRenderElement.parentElement.getAttribute("data-type") === "html-entity") {
              previewRenderElement.parentElement.insertAdjacentText("afterend", Constants.ZWSP);
              range.setStart(previewRenderElement.parentElement.nextSibling, 1);
            } else {
              range.selectNodeContents(previewRenderElement.parentElement.lastElementChild);
            }
            range.collapse(false);
            event.preventDefault();
            return true;
          }
        }
      });
    }
  };

  // vditor-master/src/ts/markdown/getHTML.ts
  var getHTML = (vditor) => {
    let html = "";
    if (vditor.currentMode === "sv") {
      html = vditor.lute.Md2HTML(getMarkdown(vditor));
    } else if (vditor.currentMode === "wysiwyg") {
      html = vditor.lute.VditorDOM2HTML(vditor.wysiwyg.element.innerHTML);
    } else if (vditor.currentMode === "ir") {
      html = vditor.lute.VditorIRDOM2HTML(vditor.ir.element.innerHTML);
    }
    return renderImageCaptionHTML(html, vditor.options.preview.markdown.imageCaption);
  };

  // vditor-master/src/ts/outline/index.ts
  var Outline = class {
    constructor(outlineLabel) {
      this.element = document.createElement("div");
      this.element.className = "vditor-outline";
      this.element.innerHTML = `<div class="vditor-outline__title">${outlineLabel}</div>
<div class="vditor-outline__content"></div>`;
    }
    render(vditor) {
      let html = "";
      if (vditor.preview.element.style.display === "block") {
        html = outlineRender(
          vditor.preview.previewElement,
          this.element.lastElementChild,
          vditor
        );
      } else {
        html = outlineRender(vditor[vditor.currentMode].element, this.element.lastElementChild, vditor);
      }
      return html;
    }
    toggle(vditor, show = true, focus = true) {
      const btnElement = vditor.toolbar.elements.outline?.firstElementChild;
      if (show && window.innerWidth >= Constants.MOBILE_WIDTH) {
        this.element.style.display = "block";
        this.render(vditor);
        btnElement?.classList.add("vditor-menu--current");
      } else {
        this.element.style.display = "none";
        btnElement?.classList.remove("vditor-menu--current");
      }
      if (focus && getSelection().rangeCount > 0) {
        const range = getSelection().getRangeAt(0);
        if (vditor[vditor.currentMode].element.contains(range.startContainer)) {
          setSelectionFocus(range);
        }
      }
      setPadding(vditor);
    }
  };

  // vditor-master/src/ts/preview/index.ts
  var Preview = class {
    constructor(vditor) {
      this.element = document.createElement("div");
      this.element.className = `vditor-preview`;
      this.previewElement = document.createElement("div");
      this.previewElement.className = "vditor-reset";
      if (vditor.options.classes.preview) {
        this.previewElement.classList.add(vditor.options.classes.preview);
      }
      this.previewElement.style.maxWidth = vditor.options.preview.maxWidth + "px";
      this.previewElement.addEventListener("copy", (event) => {
        if (event.target.tagName === "TEXTAREA") {
          return;
        }
        const tempElement = document.createElement("div");
        tempElement.className = "vditor-reset";
        tempElement.appendChild(getSelection().getRangeAt(0).cloneContents());
        this.copyToX(vditor, tempElement, "default");
        event.preventDefault();
      });
      this.previewElement.addEventListener("click", (event) => {
        const spanElement = hasClosestByMatchTag(event.target, "SPAN");
        if (spanElement && hasClosestByClassName(spanElement, "vditor-toc")) {
          const headingElement = this.previewElement.querySelector("#" + spanElement.getAttribute("data-target-id"));
          if (headingElement) {
            this.element.scrollTop = headingElement.offsetTop;
          }
          return;
        }
        if (event.target.tagName === "A") {
          if (vditor.options.link.click) {
            vditor.options.link.click(event.target);
          } else if (vditor.options.link.isOpen) {
            window.open(event.target.getAttribute("href"));
          }
          event.preventDefault();
          return;
        }
        if (event.target.tagName === "IMG") {
          if (vditor.options.image.preview) {
            vditor.options.image.preview(event.target);
          } else if (vditor.options.image.isPreview) {
            previewImage(event.target, vditor.options.lang, vditor.options.theme);
          }
        }
      });
      this.element.appendChild(this.previewElement);
      const actions2 = vditor.options.preview.actions;
      if (actions2.length === 0) {
        return;
      }
      const actionElement = document.createElement("div");
      actionElement.className = "vditor-preview__action";
      const actionHtml = [];
      for (let i = 0; i < actions2.length; i++) {
        const action2 = actions2[i];
        if (typeof action2 === "object") {
          actionHtml.push(`<button type="button" data-type="${action2.key}" class="${action2.className}"${action2.tooltip ? ` aria-label="${action2.tooltip}"` : ""}">${action2.text}</button>`);
          continue;
        }
        switch (action2) {
          case "desktop":
            actionHtml.push(`<button type="button" class="vditor-preview__action--current" data-type="desktop">Desktop</button>`);
            break;
          case "tablet":
            actionHtml.push(`<button type="button" data-type="tablet">Tablet</button>`);
            break;
          case "mobile":
            actionHtml.push(`<button type="button" data-type="mobile">Mobile/Wechat</button>`);
            break;
          case "mp-wechat":
            actionHtml.push(`<button type="button" data-type="mp-wechat" class="vditor-tooltipped vditor-tooltipped__w" aria-label="\u590D\u5236\u5230\u516C\u4F17\u53F7"><svg><use xlink:href="#vditor-icon-mp-wechat"></use></svg></button>`);
            break;
          case "zhihu":
            actionHtml.push(`<button type="button" data-type="zhihu" class="vditor-tooltipped vditor-tooltipped__w" aria-label="\u590D\u5236\u5230\u77E5\u4E4E"><svg><use xlink:href="#vditor-icon-zhihu"></use></svg></button>`);
            break;
        }
      }
      actionElement.innerHTML = actionHtml.join("");
      actionElement.addEventListener(getEventName(), (event) => {
        const btn = hasClosestByTag(event.target, "BUTTON");
        if (!btn) {
          return;
        }
        const type = btn.getAttribute("data-type");
        const actionCustom = actions2.find((w) => w?.key === type);
        if (actionCustom) {
          actionCustom.click(type);
          return;
        }
        if (type === "mp-wechat" || type === "zhihu") {
          this.copyToX(vditor, this.previewElement.cloneNode(true), type);
          return;
        }
        if (type === "desktop") {
          this.previewElement.style.width = "auto";
        } else if (type === "tablet") {
          this.previewElement.style.width = "780px";
        } else {
          this.previewElement.style.width = "360px";
        }
        if (this.previewElement.scrollWidth > this.previewElement.parentElement.clientWidth) {
          this.previewElement.style.width = "auto";
        }
        this.render(vditor);
        actionElement.querySelectorAll("button").forEach((item) => {
          item.classList.remove("vditor-preview__action--current");
        });
        btn.classList.add("vditor-preview__action--current");
      });
      this.element.insertBefore(actionElement, this.previewElement);
    }
    render(vditor, value) {
      clearTimeout(this.mdTimeoutId);
      if (this.element.style.display === "none") {
        if (this.element.getAttribute("data-type") === "renderPerformance") {
          vditor.tip.hide();
        }
        return;
      }
      if (value) {
        this.previewElement.innerHTML = value;
        renderImageCaptions(this.previewElement, "preview", vditor.options.preview.markdown.imageCaption);
        return;
      }
      if (getMarkdown(vditor).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === "") {
        this.previewElement.innerHTML = "";
        return;
      }
      const renderStartTime = (/* @__PURE__ */ new Date()).getTime();
      const markdownText = getMarkdown(vditor);
      this.mdTimeoutId = window.setTimeout(() => {
        if (vditor.options.preview.url) {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", vditor.options.preview.url);
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                const responseJSON = JSON.parse(xhr.responseText);
                if (responseJSON.code !== 0) {
                  vditor.tip.show(responseJSON.msg);
                  return;
                }
                if (vditor.options.preview.transform) {
                  responseJSON.data = vditor.options.preview.transform(responseJSON.data);
                }
                this.previewElement.innerHTML = responseJSON.data;
                this.afterRender(vditor, renderStartTime);
              } else {
                let html = vditor.lute.Md2HTML(markdownText);
                if (vditor.options.preview.transform) {
                  html = vditor.options.preview.transform(html);
                }
                this.previewElement.innerHTML = html;
                this.afterRender(vditor, renderStartTime);
              }
            }
          };
          xhr.send(JSON.stringify({ markdownText }));
        } else {
          let html = vditor.lute.Md2HTML(markdownText);
          if (vditor.options.preview.transform) {
            html = vditor.options.preview.transform(html);
          }
          this.previewElement.innerHTML = html;
          this.afterRender(vditor, renderStartTime);
        }
      }, vditor.options.preview.delay);
    }
    afterRender(vditor, startTime) {
      renderImageCaptions(this.previewElement, "preview", vditor.options.preview.markdown.imageCaption);
      if (vditor.options.preview.parse) {
        vditor.options.preview.parse(this.element);
      }
      const time = (/* @__PURE__ */ new Date()).getTime() - startTime;
      if ((/* @__PURE__ */ new Date()).getTime() - startTime > 2600) {
        vditor.tip.show(window.VditorI18n.performanceTip.replace("${x}", time.toString()));
        vditor.preview.element.setAttribute("data-type", "renderPerformance");
      } else if (vditor.preview.element.getAttribute("data-type") === "renderPerformance") {
        vditor.tip.hide();
        vditor.preview.element.removeAttribute("data-type");
      }
      const cmtFocusElement = vditor.preview.element.querySelector(".vditor-comment--focus");
      if (cmtFocusElement) {
        cmtFocusElement.classList.remove("vditor-comment--focus");
      }
      codeRender(vditor.preview.previewElement, vditor.options.preview.hljs);
      highlightRender(
        vditor.options.preview.hljs,
        vditor.preview.previewElement,
        vditor.options.cdn
      );
      mermaidRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
      markmapRender(vditor.preview.previewElement, vditor.options.cdn);
      SMILESRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
      flowchartRender(vditor.preview.previewElement, vditor.options.cdn);
      graphvizRender(vditor.preview.previewElement, vditor.options.cdn);
      wavedromRender(vditor.preview.previewElement, vditor.options.cdn);
      chartRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
      mindmapRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
      plantumlRender(vditor.preview.previewElement, vditor.options.cdn);
      abcRender(vditor.preview.previewElement, vditor.options.cdn);
      if (vditor.options.preview.render.media.enable) {
        mediaRender(vditor.preview.previewElement);
      }
      vditor.options.customRenders.forEach((item) => {
        item.render(vditor.preview.previewElement, vditor);
      });
      const editorElement = vditor.preview.element;
      let tocHTML = vditor.outline.render(vditor);
      if (tocHTML === "") {
        tocHTML = "[ToC]";
      }
      editorElement.querySelectorAll('[data-type="toc-block"]').forEach((item) => {
        item.innerHTML = tocHTML;
        mathRender(item, {
          cdn: vditor.options.cdn,
          math: vditor.options.preview.math
        });
      });
      mathRender(vditor.preview.previewElement, {
        cdn: vditor.options.cdn,
        math: vditor.options.preview.math
      });
    }
    copyToX(vditor, copyElement, type = "mp-wechat") {
      if (type !== "zhihu") {
        copyElement.querySelectorAll(".katex-html .base").forEach((item) => {
          item.style.display = "initial";
        });
      } else {
        copyElement.querySelectorAll(".language-math").forEach((item) => {
          item.outerHTML = `<img class="Formula-image" data-eeimg="true" src="//www.zhihu.com/equation?tex=" alt="${item.getAttribute("data-math")}\\" style="display: block; margin: 0 auto; max-width: 100%;">`;
        });
      }
      copyElement.style.backgroundColor = "#fff";
      copyElement.querySelectorAll("code").forEach((item) => {
        item.style.backgroundImage = "none";
      });
      this.element.append(copyElement);
      const range = copyElement.ownerDocument.createRange();
      range.selectNode(copyElement);
      setSelectionFocus(range);
      document.execCommand("copy");
      copyElement.remove();
      vditor.tip.show(["zhihu", "mp-wechat"].includes(type) ? `\u5DF2\u590D\u5236\uFF0C\u53EF\u5230${type === "zhihu" ? "\u77E5\u4E4E" : "\u5FAE\u4FE1\u516C\u4F17\u53F7\u5E73\u53F0"}\u8FDB\u884C\u7C98\u8D34` : `\u5DF2\u590D\u5236\u5230\u526A\u5207\u677F`);
    }
  };

  // vditor-master/src/ts/resize/index.ts
  var Resize = class {
    constructor(vditor) {
      this.element = document.createElement("div");
      this.element.className = `vditor-resize vditor-resize--${vditor.options.resize.position}`;
      this.element.innerHTML = `<div><svg><use xlink:href="#vditor-icon-resize"></use></svg></div>`;
      this.bindEvent(vditor);
    }
    bindEvent(vditor) {
      this.element.addEventListener("mousedown", (event) => {
        const documentSelf = document;
        const y = event.clientY;
        const height = vditor.element.offsetHeight;
        const minHeight = 63 + vditor.element.querySelector(".vditor-toolbar").clientHeight;
        documentSelf.ondragstart = () => false;
        if (window.captureEvents) {
          window.captureEvents();
        }
        this.element.classList.add("vditor-resize--selected");
        documentSelf.onmousemove = (moveEvent) => {
          if (vditor.options.resize.position === "top") {
            vditor.element.style.height = Math.max(minHeight, height + (y - moveEvent.clientY)) + "px";
          } else {
            vditor.element.style.height = Math.max(minHeight, height + (moveEvent.clientY - y)) + "px";
          }
          if (vditor.options.typewriterMode) {
            vditor.sv.element.style.paddingBottom = vditor.sv.element.parentElement.offsetHeight / 2 + "px";
          }
        };
        documentSelf.onmouseup = () => {
          if (vditor.options.resize.after) {
            vditor.options.resize.after(vditor.element.offsetHeight - height);
          }
          if (window.captureEvents) {
            window.captureEvents();
          }
          documentSelf.onmousemove = null;
          documentSelf.onmouseup = null;
          documentSelf.ondragstart = null;
          documentSelf.onselectstart = null;
          documentSelf.onselect = null;
          this.element.classList.remove("vditor-resize--selected");
        };
      });
    }
  };

  // vditor-master/src/ts/sv/index.ts
  var Editor = class {
    constructor(vditor) {
      this.composingLock = false;
      this.element = document.createElement("textarea");
      this.element.className = "vditor-sv vditor-reset";
      this.element.placeholder = vditor.options.placeholder;
      this.element.spellcheck = false;
      this.bindEvent(vditor);
      focusEvent(vditor, this.element);
      hotkeyEvent(vditor, this.element);
      dropEvent(vditor, this.element, (code) => {
        processPaste(vditor, code.replace(/&lt;/g, "<").replace(/&amp;/g, "&"));
      });
    }
    bindEvent(vditor) {
      this.element.addEventListener("blur", () => {
        if (vditor.options.blur) {
          vditor.options.blur(getMarkdown(vditor));
        }
      });
      this.element.addEventListener("paste", (event) => {
        paste(vditor, event, {
          pasteCode: (code) => {
            processPaste(vditor, code.replace(/&lt;/g, "<").replace(/&amp;/g, "&"));
          }
        });
      });
      this.element.addEventListener("scroll", () => {
        if (vditor.preview.element.style.display !== "block") {
          return;
        }
        const textScrollTop = this.element.scrollTop;
        const textHeight = this.element.clientHeight;
        const textScrollHeight = this.element.scrollHeight - parseFloat(this.element.style.paddingBottom || "0");
        const preview = vditor.preview.element;
        if (textScrollTop / textHeight > 0.5) {
          preview.scrollTop = (textScrollTop + textHeight) * preview.scrollHeight / textScrollHeight - textHeight;
        } else {
          preview.scrollTop = textScrollTop * preview.scrollHeight / textScrollHeight;
        }
      });
      this.element.addEventListener("compositionstart", () => {
        this.composingLock = true;
      });
      this.element.addEventListener("compositionend", () => {
        this.composingLock = false;
        if (!isFirefox()) {
          processAfterRender2(vditor);
        }
      });
      this.element.addEventListener("input", () => {
        if (!this.composingLock) {
          processAfterRender2(vditor);
        }
      });
      this.element.addEventListener("select", () => {
        const selectedText = this.element.value.substring(this.element.selectionStart, this.element.selectionEnd);
        if (selectedText.trim()) {
          if (vditor.options.select) {
            vditor.options.select(selectedText);
          }
        } else if (vditor.options.unSelect) {
          vditor.options.unSelect();
        }
      });
    }
  };

  // vditor-master/src/ts/tip/index.ts
  var Tip = class {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "vditor-tip";
    }
    show(text, time = 6e3) {
      this.element.className = "vditor-tip vditor-tip--show";
      if (time === 0) {
        this.element.innerHTML = `<div class="vditor-tip__content">${text}
<div class="vditor-tip__close">X</div></div>`;
        this.element.querySelector(".vditor-tip__close").addEventListener("click", () => {
          this.hide();
        });
      } else {
        this.element.innerHTML = `<div class="vditor-tip__content">${text}</div>`;
        setTimeout(() => {
          this.hide();
        }, time);
      }
      this.element.removeAttribute("style");
      setTimeout(() => {
        const rect = this.element.getBoundingClientRect();
        if (rect.top < 46) {
          this.element.style.position = "fixed";
          this.element.style.top = "46px";
        }
      }, 150);
    }
    hide() {
      this.element.className = "vditor-messageElementtip";
      this.element.innerHTML = "";
    }
  };

  // vditor-master/src/ts/ui/setPreviewMode.ts
  var setPreviewMode = (mode, vditor) => {
    if (vditor.options.preview.mode === mode) {
      return;
    }
    vditor.options.preview.mode = mode;
    switch (mode) {
      case "both":
        vditor.sv.element.style.display = "block";
        vditor.preview.element.style.display = "block";
        vditor.preview.render(vditor);
        setCurrentToolbar(vditor.toolbar.elements, ["both"]);
        break;
      case "editor":
        vditor.sv.element.style.display = "block";
        vditor.preview.element.style.display = "none";
        removeCurrentToolbar(vditor.toolbar.elements, ["both"]);
        break;
      default:
        break;
    }
    if (vditor.devtools) {
      vditor.devtools.renderEchart(vditor);
    }
  };

  // vditor-master/src/ts/toolbar/Both.ts
  var Both = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      if (vditor.options.preview.mode === "both") {
        this.element.children[0].classList.add("vditor-menu--current");
      }
      this.element.children[0].addEventListener(getEventName(), (event) => {
        const btnElement = this.element.firstElementChild;
        if (btnElement.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        event.preventDefault();
        if (vditor.currentMode !== "sv") {
          return;
        }
        if (vditor.options.preview.mode === "both") {
          setPreviewMode("editor", vditor);
        } else {
          setPreviewMode("both", vditor);
        }
      });
    }
  };

  // vditor-master/src/ts/toolbar/Br.ts
  var Br = class {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "vditor-toolbar__br";
    }
  };

  // vditor-master/src/ts/toolbar/CodeTheme.ts
  var CodeTheme = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      const actionBtn = this.element.children[0];
      const panelElement = document.createElement("div");
      panelElement.className = `vditor-hint${menuItem.level === 2 ? "" : " vditor-panel--arrow"}`;
      let innerHTML = "";
      Constants.CODE_THEME.forEach((theme) => {
        innerHTML += `<button>${theme}</button>`;
      });
      panelElement.innerHTML = `<div style="overflow: auto;max-height:${window.innerHeight / 2}px">${innerHTML}</div>`;
      panelElement.addEventListener(getEventName(), (event) => {
        if (event.target.tagName === "BUTTON") {
          hidePanel(vditor, ["subToolbar"]);
          vditor.options.preview.hljs.style = event.target.textContent;
          setCodeTheme(event.target.textContent, vditor.options.cdn);
          event.preventDefault();
          event.stopPropagation();
        }
      });
      this.element.appendChild(panelElement);
      toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
    }
  };

  // vditor-master/src/ts/toolbar/ContentTheme.ts
  var ContentTheme = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      const actionBtn = this.element.children[0];
      const panelElement = document.createElement("div");
      panelElement.className = `vditor-hint${menuItem.level === 2 ? "" : " vditor-panel--arrow"}`;
      let innerHTML = "";
      Object.keys(vditor.options.preview.theme.list).forEach((key) => {
        innerHTML += `<button data-type="${key}">${vditor.options.preview.theme.list[key]}</button>`;
      });
      panelElement.innerHTML = `<div style="overflow: auto;max-height:${window.innerHeight / 2}px">${innerHTML}</div>`;
      panelElement.addEventListener(getEventName(), (event) => {
        if (event.target.tagName === "BUTTON") {
          hidePanel(vditor, ["subToolbar"]);
          vditor.options.preview.theme.current = event.target.getAttribute("data-type");
          setContentTheme(vditor.options.preview.theme.current, vditor.options.preview.theme.path);
          event.preventDefault();
          event.stopPropagation();
        }
      });
      this.element.appendChild(panelElement);
      toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
    }
  };

  // vditor-master/src/ts/toolbar/Counter.ts
  var Counter = class {
    constructor(vditor) {
      this.element = document.createElement("span");
      this.element.className = "vditor-counter vditor-tooltipped vditor-tooltipped__nw";
      this.render(vditor, "");
    }
    render(vditor, mdText) {
      let length = mdText.endsWith("\n") ? mdText.length - 1 : mdText.length;
      if (vditor.options.counter.type === "text" && vditor[vditor.currentMode]) {
        const tempElement = vditor[vditor.currentMode].element.cloneNode(true);
        tempElement.querySelectorAll(".vditor-wysiwyg__preview").forEach((item) => {
          item.remove();
        });
        length = tempElement.textContent.length;
      }
      if (typeof vditor.options.counter.max === "number") {
        if (length > vditor.options.counter.max) {
          this.element.className = "vditor-counter vditor-counter--error";
        } else {
          this.element.className = "vditor-counter";
        }
        this.element.innerHTML = `${length}/${vditor.options.counter.max}`;
      } else {
        this.element.innerHTML = `${length}`;
      }
      this.element.setAttribute("aria-label", vditor.options.counter.type);
      if (vditor.options.counter.after) {
        vditor.options.counter.after(length, {
          enable: vditor.options.counter.enable,
          max: vditor.options.counter.max,
          type: vditor.options.counter.type
        });
      }
    }
  };

  // vditor-master/src/ts/toolbar/Custom.ts
  var Custom = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.children[0].innerHTML = menuItem.icon;
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (event.currentTarget.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        menuItem.click(event, vditor);
      });
    }
  };

  // vditor-master/src/ts/toolbar/Devtools.ts
  var Devtools = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.firstElementChild.addEventListener(getEventName(), (event) => {
        const btnElement = this.element.firstElementChild;
        if (btnElement.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        event.preventDefault();
        if (btnElement.classList.contains("vditor-menu--current")) {
          btnElement.classList.remove("vditor-menu--current");
          vditor.devtools.element.style.display = "none";
          setPadding(vditor);
        } else {
          btnElement.classList.add("vditor-menu--current");
          vditor.devtools.element.style.display = "block";
          setPadding(vditor);
          vditor.devtools.renderEchart(vditor);
        }
      });
    }
  };

  // vditor-master/src/ts/toolbar/Divider.ts
  var Divider = class {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "vditor-toolbar__divider";
    }
  };

  // vditor-master/src/ts/toolbar/Emoji.ts
  var Emoji = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      const panelElement = document.createElement("div");
      panelElement.className = "vditor-panel vditor-panel--arrow";
      let commonEmojiHTML = "";
      Object.keys(vditor.options.hint.emoji).forEach((key) => {
        const emojiValue = vditor.options.hint.emoji[key];
        if (emojiValue.indexOf(".") > -1) {
          commonEmojiHTML += `<button data-value=":${key}: " data-key=":${key}:"><img
data-value=":${key}: " data-key=":${key}:" class="vditor-emojis__icon" src="${emojiValue}"/></button>`;
        } else {
          commonEmojiHTML += `<button data-value="${emojiValue} "
 data-key="${key}"><span class="vditor-emojis__icon">${emojiValue}</span></button>`;
        }
      });
      panelElement.innerHTML = `<div class="vditor-emojis" style="max-height: ${vditor.options.height === "auto" ? "auto" : vditor.options.height - 80}px">${commonEmojiHTML}</div><div class="vditor-emojis__tail">
    <span class="vditor-emojis__tip"></span><span>${vditor.options.hint.emojiTail || ""}</span>
</div>`;
      this.element.appendChild(panelElement);
      toggleSubMenu(vditor, panelElement, this.element.firstElementChild, menuItem.level);
      this.bindEvent(vditor);
    }
    bindEvent(vditor) {
      this.element.lastElementChild.addEventListener(getEventName(), (event) => {
        const btnElement = hasClosestByTag(event.target, "BUTTON");
        if (btnElement) {
          event.preventDefault();
          const value = btnElement.getAttribute("data-value");
          if (vditor.currentMode === "sv") {
            processPaste(vditor, value);
            this.element.lastElementChild.style.display = "none";
            execAfterRender(vditor);
            return;
          }
          const range = getEditorRange(vditor);
          let html = value;
          if (vditor.currentMode === "wysiwyg") {
            html = vditor.lute.SpinVditorDOM(value);
          } else if (vditor.currentMode === "ir") {
            html = vditor.lute.SpinVditorIRDOM(value);
          }
          if (value.indexOf(":") > -1) {
            const tempElement = document.createElement("div");
            tempElement.innerHTML = html;
            html = tempElement.firstElementChild.firstElementChild.outerHTML + " ";
            insertHTML(html, vditor);
          } else {
            range.extractContents();
            range.insertNode(document.createTextNode(value));
            if (!hasClosestBlock(range.startContainer)) {
              modifyPre(vditor, range);
            }
          }
          range.collapse(false);
          setSelectionFocus(range);
          this.element.lastElementChild.style.display = "none";
          execAfterRender(vditor);
        }
      });
      this.element.lastElementChild.addEventListener("mouseover", (event) => {
        const btnElement = hasClosestByTag(event.target, "BUTTON");
        if (btnElement) {
          this.element.querySelector(".vditor-emojis__tip").innerHTML = btnElement.getAttribute("data-key");
        }
      });
    }
  };

  // vditor-master/src/ts/export/index.ts
  var download = (vditor, content, filename) => {
    const aElement = document.createElement("a");
    if ("download" in aElement) {
      aElement.download = filename;
      aElement.style.display = "none";
      aElement.href = URL.createObjectURL(new Blob([content]));
      document.body.appendChild(aElement);
      aElement.click();
      aElement.remove();
    } else {
      vditor.tip.show(window.VditorI18n.downloadTip, 0);
    }
  };
  var exportMarkdown = (vditor) => {
    const content = getMarkdown(vditor);
    download(vditor, content, content.substr(0, 10) + ".md");
  };
  var exportPDF = (vditor) => {
    vditor.tip.show(window.VditorI18n.generate, 3800);
    const iframe = document.querySelector("#vditorExportIframe");
    iframe.contentDocument.open();
    iframe.contentDocument.write(`<link rel="stylesheet" href="${vditor.options.cdn}/dist/index.css"/>
<script src="${vditor.options.cdn}/dist/method.min.js"><\/script>
<div id="preview" style="width: 800px"></div>
<script>
window.addEventListener("message", (e) => {
  if(!e.data) {
    return;
  }
  Vditor.preview(document.getElementById('preview'), e.data, {
    cdn: "${vditor.options.cdn}",
    markdown: {
      callout: ${JSON.stringify(vditor.options.preview.markdown.callout)},
      inlineMath: ${JSON.stringify(vditor.options.preview.markdown.inlineMath)},
      theme: ${JSON.stringify(vditor.options.preview.theme)}
    },
    hljs: {
      style: "${vditor.options.preview.hljs.style}"
    }
  });
  setTimeout(() => {
        window.print();
    }, 3600);
}, false);
<\/script>`);
    iframe.contentDocument.close();
    setTimeout(() => {
      iframe.contentWindow.postMessage(getMarkdown(vditor), "*");
    }, 200);
  };
  var exportHTML = (vditor) => {
    const content = getHTML(vditor);
    const html = `<html><head><link rel="stylesheet" type="text/css" href="${vditor.options.cdn}/dist/index.css"/>
<script src="${vditor.options.cdn}/dist/js/i18n/${vditor.options.lang}.js"><\/script>
<script src="${vditor.options.cdn}/dist/method.min.js"><\/script></head>
<body><div class="vditor-reset" id="preview">${content}</div>
<script>
    const previewElement = document.getElementById('preview')
    Vditor.setContentTheme('${vditor.options.preview.theme.current}', '${vditor.options.preview.theme.path}');
    Vditor.codeRender(previewElement);
    Vditor.highlightRender(${JSON.stringify(vditor.options.preview.hljs)}, previewElement, '${vditor.options.cdn}');
    Vditor.mathRender(previewElement, {
        cdn: '${vditor.options.cdn}',
        math: ${JSON.stringify(vditor.options.preview.math)},
    });
    Vditor.mermaidRender(previewElement, '${vditor.options.cdn}', '${vditor.options.theme}');
    Vditor.SMILESRender(previewElement, '${vditor.options.cdn}', '${vditor.options.theme}');
    Vditor.markmapRender(previewElement, '${vditor.options.cdn}');
    Vditor.flowchartRender(previewElement, '${vditor.options.cdn}');
    Vditor.graphvizRender(previewElement, '${vditor.options.cdn}');
    Vditor.wavedromRender(previewElement, '${vditor.options.cdn}');
    Vditor.chartRender(previewElement, '${vditor.options.cdn}', '${vditor.options.theme}');
    Vditor.mindmapRender(previewElement, '${vditor.options.cdn}', '${vditor.options.theme}');
    Vditor.abcRender(previewElement, '${vditor.options.cdn}');
    ${vditor.options.preview.render.media.enable ? "Vditor.mediaRender(previewElement);" : ""}
    Vditor.speechRender(previewElement);
<\/script>
<script src="${vditor.options.cdn}/dist/js/icons/${vditor.options.icon}.js"><\/script></body></html>`;
    download(vditor, html, content.substr(0, 10) + ".html");
  };

  // vditor-master/src/ts/toolbar/Export.ts
  var Export = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      const actionBtn = this.element.children[0];
      const panelElement = document.createElement("div");
      panelElement.className = `vditor-hint${menuItem.level === 2 ? "" : " vditor-panel--arrow"}`;
      panelElement.innerHTML = `<button data-type="markdown">Markdown</button>
<button data-type="pdf">PDF</button>
<button data-type="html">HTML</button>`;
      panelElement.addEventListener(getEventName(), (event) => {
        const btnElement = event.target;
        if (btnElement.tagName === "BUTTON") {
          switch (btnElement.getAttribute("data-type")) {
            case "markdown":
              exportMarkdown(vditor);
              break;
            case "pdf":
              exportPDF(vditor);
              break;
            case "html":
              exportHTML(vditor);
              break;
            default:
              break;
          }
          hidePanel(vditor, ["subToolbar"]);
          event.preventDefault();
          event.stopPropagation();
        }
      });
      this.element.appendChild(panelElement);
      toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
    }
  };

  // vditor-master/src/ts/toolbar/Fullscreen.ts
  var Fullscreen = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this._bindEvent(vditor, menuItem);
    }
    _bindEvent(vditor, menuItem) {
      this.element.children[0].addEventListener(getEventName(), function(event) {
        event.preventDefault();
        if (vditor.element.className.includes("vditor--fullscreen")) {
          if (!menuItem.level) {
            this.innerHTML = menuItem.icon;
          }
          vditor.element.style.zIndex = "";
          document.body.style.overflow = "";
          vditor.element.classList.remove("vditor--fullscreen");
          Object.keys(vditor.toolbar.elements).forEach((key) => {
            const svgElement = vditor.toolbar.elements[key].firstChild;
            if (svgElement) {
              svgElement.className = svgElement.className.replace("__s", "__n");
              vditor.options.toolbar.forEach((item) => {
                if (typeof item !== "string" && item.tipPosition && item.name === svgElement.dataset.type) {
                  svgElement.className = `vditor-tooltipped vditor-tooltipped__${item.tipPosition}`;
                }
              });
            }
          });
          if (vditor.counter) {
            vditor.counter.element.className = vditor.counter.element.className.replace("__s", "__n");
          }
        } else {
          if (!menuItem.level) {
            this.innerHTML = '<svg><use xlink:href="#vditor-icon-contract"></use></svg>';
          }
          vditor.element.style.zIndex = vditor.options.fullscreen.index.toString();
          document.body.style.overflow = "hidden";
          vditor.element.classList.add("vditor--fullscreen");
          Object.keys(vditor.toolbar.elements).forEach((key) => {
            const svgElement = vditor.toolbar.elements[key].firstChild;
            if (svgElement) {
              svgElement.className = svgElement.className.replace("__n", "__s");
            }
          });
          if (vditor.counter) {
            vditor.counter.element.className = vditor.counter.element.className.replace("__n", "__s");
          }
        }
        if (vditor.devtools) {
          vditor.devtools.renderEchart(vditor);
        }
        if (menuItem.click) {
          menuItem.click(event, vditor);
        }
        setPadding(vditor);
        setTypewriterPosition(vditor);
      });
    }
  };

  // vditor-master/src/ts/toolbar/Headings.ts
  var Headings = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      const panelElement = document.createElement("div");
      panelElement.className = "vditor-hint vditor-panel--arrow";
      panelElement.innerHTML = `<button data-tag="h1" data-value="# ">${window.VditorI18n.heading1} ${updateHotkeyTip("&lt;\u2325\u23181>")}</button>
<button data-tag="h2" data-value="## ">${window.VditorI18n.heading2} &lt;${updateHotkeyTip("\u2325\u23182")}></button>
<button data-tag="h3" data-value="### ">${window.VditorI18n.heading3} &lt;${updateHotkeyTip("\u2325\u23183")}></button>
<button data-tag="h4" data-value="#### ">${window.VditorI18n.heading4} &lt;${updateHotkeyTip("\u2325\u23184")}></button>
<button data-tag="h5" data-value="##### ">${window.VditorI18n.heading5} &lt;${updateHotkeyTip("\u2325\u23185")}></button>
<button data-tag="h6" data-value="###### ">${window.VditorI18n.heading6} &lt;${updateHotkeyTip("\u2325\u23186")}></button>`;
      this.element.appendChild(panelElement);
      this._bindEvent(vditor, panelElement);
    }
    _bindEvent(vditor, panelElement) {
      const actionBtn = this.element.children[0];
      actionBtn.addEventListener(getEventName(), (event) => {
        event.preventDefault();
        clearTimeout(vditor.wysiwyg.afterRenderTimeoutId);
        clearTimeout(vditor.ir.processTimeoutId);
        clearTimeout(vditor.sv.processTimeoutId);
        if (actionBtn.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        actionBtn.blur();
        if (actionBtn.classList.contains("vditor-menu--current")) {
          if (vditor.currentMode === "wysiwyg") {
            removeHeading(vditor);
            afterRenderEvent(vditor);
          } else if (vditor.currentMode === "ir") {
            processHeading2(vditor, "");
          }
          actionBtn.classList.remove("vditor-menu--current");
        } else {
          hidePanel(vditor, ["subToolbar"]);
          panelElement.style.display = "block";
        }
      });
      for (let i = 0; i < 6; i++) {
        panelElement.children.item(i).addEventListener(getEventName(), (event) => {
          event.preventDefault();
          if (vditor.currentMode === "wysiwyg") {
            setHeading(vditor, event.target.getAttribute("data-tag"));
            afterRenderEvent(vditor);
            actionBtn.classList.add("vditor-menu--current");
          } else if (vditor.currentMode === "ir") {
            processHeading2(vditor, event.target.getAttribute("data-value"));
            actionBtn.classList.add("vditor-menu--current");
          } else {
            processHeading(vditor, event.target.getAttribute("data-value"));
          }
          panelElement.style.display = "none";
        });
      }
    }
  };

  // vditor-master/src/ts/toolbar/Help.ts
  var Help = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        vditor.tip.show(`<div style="margin-bottom:14px;font-size: 14px;line-height: 22px;min-width:300px;max-width: 360px;display: flex;">
<div style="margin-top: 14px;flex: 1">
    <div>Markdown \u4F7F\u7528\u6307\u5357</div>
    <ul style="list-style: none">
        <li><a href="https://ld246.com/article/1583308420519" target="_blank">\u8BED\u6CD5\u901F\u67E5\u624B\u518C</a></li>
        <li><a href="https://ld246.com/article/1583129520165" target="_blank">\u57FA\u7840\u8BED\u6CD5</a></li>
        <li><a href="https://ld246.com/article/1583305480675" target="_blank">\u6269\u5C55\u8BED\u6CD5</a></li>
        <li><a href="https://ld246.com/article/1582778815353" target="_blank">\u952E\u76D8\u5FEB\u6377\u952E</a></li>
    </ul>
</div>
<div style="margin-top: 14px;flex: 1">
    <div>Vditor \u652F\u6301</div>
    <ul style="list-style: none">
        <li><a href="https://github.com/Vanessa219/vditor/issues" target="_blank">Issues</a></li>
        <li><a href="https://ld246.com/tag/vditor" target="_blank">\u5B98\u65B9\u8BA8\u8BBA\u533A</a></li>
        <li><a href="https://ld246.com/article/1549638745630" target="_blank">\u5F00\u53D1\u624B\u518C</a></li>
        <li><a href="https://ld246.com/guide/markdown" target="_blank">\u6F14\u793A\u5730\u5740</a></li>
    </ul>
</div></div>`, 0);
      });
    }
  };

  // vditor-master/src/ts/toolbar/Indent.ts
  var Indent = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
          return;
        }
        const range = getEditorRange(vditor);
        const liElement = hasClosestByMatchTag(range.startContainer, "LI");
        if (liElement) {
          listIndent(vditor, liElement, range);
        }
      });
    }
  };

  // vditor-master/src/ts/toolbar/Info.ts
  var Info = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        vditor.tip.show(`<div style="max-width: 520px; font-size: 14px;line-height: 22px;margin-bottom: 14px;">
<p style="text-align: center;margin: 14px 0">
    <em>\u4E0B\u4E00\u4EE3\u7684 Markdown \u7F16\u8F91\u5668\uFF0C\u4E3A\u672A\u6765\u800C\u6784\u5EFA</em>
</p>
<div style="display: flex;margin-bottom: 14px;flex-wrap: wrap;align-items: center">
    <img src="https://unpkg.com/vditor/dist/images/logo.png" style="margin: 0 auto;height: 68px"/>
    <div>&nbsp;&nbsp;</div>
    <div style="flex: 1;min-width: 250px">
        Vditor \u662F\u4E00\u6B3E\u6D4F\u89C8\u5668\u7AEF\u7684 Markdown \u7F16\u8F91\u5668\uFF0C\u652F\u6301\u6240\u89C1\u5373\u6240\u5F97\u3001\u5373\u65F6\u6E32\u67D3\uFF08\u7C7B\u4F3C Typora\uFF09\u548C\u5206\u5C4F\u9884\u89C8\u6A21\u5F0F\u3002
        \u5B83\u4F7F\u7528 TypeScript \u5B9E\u73B0\uFF0C\u652F\u6301\u539F\u751F JavaScript \u4EE5\u53CA Vue\u3001React\u3001Angular \u548C Svelte \u7B49\u6846\u67B6\u3002
    </div>
</div>
<div style="display: flex;flex-wrap: wrap;">
    <ul style="list-style: none;flex: 1;min-width:148px">
        <li>
        \u9879\u76EE\u5730\u5740\uFF1A<a href="https://b3log.org/vditor" target="_blank">b3log.org/vditor</a>
        </li>
        <li>
        \u5F00\u6E90\u534F\u8BAE\uFF1AMIT
        </li>
    </ul>
    <ul style="list-style: none;margin-right: 18px">
        <li>
        \u7EC4\u4EF6\u7248\u672C\uFF1AVditor v${_VDITOR_VERSION} / Lute v${Lute.Version}
        </li>
        <li>
        \u8D5E\u52A9\u6350\u8D60\uFF1A<a href="https://ld246.com/sponsor" target="_blank">https://ld246.com/sponsor</a>
        </li>
    </ul>
</div>
</div>`, 0);
      });
    }
  };

  // vditor-master/src/ts/toolbar/InsertAfter.ts
  var InsertAfter = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
          return;
        }
        insertEmptyBlock(vditor, "afterend");
      });
    }
  };

  // vditor-master/src/ts/toolbar/InsertBefore.ts
  var InsertBefore = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
          return;
        }
        insertEmptyBlock(vditor, "beforebegin");
      });
    }
  };

  // vditor-master/src/ts/toolbar/Outdent.ts
  var Outdent = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED) || vditor.currentMode === "sv") {
          return;
        }
        const range = getEditorRange(vditor);
        const liElement = hasClosestByMatchTag(range.startContainer, "LI");
        if (liElement) {
          listOutdent(vditor, liElement, range, liElement.parentElement);
        }
      });
    }
  };

  // vditor-master/src/ts/toolbar/Outline.ts
  var Outline2 = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      if (vditor.options.outline) {
        this.element.firstElementChild.classList.add("vditor-menu--current");
      }
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        const btnElement = vditor.toolbar.elements.outline.firstElementChild;
        if (btnElement.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        vditor.options.outline.enable = !this.element.firstElementChild.classList.contains("vditor-menu--current");
        vditor.outline.toggle(vditor, vditor.options.outline.enable);
      });
    }
  };

  // vditor-master/src/ts/toolbar/Preview.ts
  var Preview2 = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this._bindEvent(vditor);
    }
    _bindEvent(vditor) {
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        const btnElement = this.element.firstElementChild;
        if (btnElement.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        const toolbars = Constants.EDIT_TOOLBARS.concat(["both", "edit-mode", "devtools"]);
        if (btnElement.classList.contains("vditor-menu--current")) {
          btnElement.classList.remove("vditor-menu--current");
          if (vditor.currentMode === "sv") {
            vditor.sv.element.style.display = "block";
            if (vditor.options.preview.mode === "both") {
              vditor.preview.element.style.display = "block";
            } else {
              vditor.preview.element.style.display = "none";
            }
          } else {
            vditor[vditor.currentMode].element.parentElement.style.display = "block";
            vditor.preview.element.style.display = "none";
          }
          enableToolbar(vditor.toolbar.elements, toolbars);
          vditor.outline.render(vditor);
        } else {
          disableToolbar(vditor.toolbar.elements, toolbars);
          vditor.preview.element.style.display = "block";
          if (vditor.currentMode === "sv") {
            vditor.sv.element.style.display = "none";
          } else {
            vditor[vditor.currentMode].element.parentElement.style.display = "none";
          }
          vditor.preview.render(vditor);
          btnElement.classList.add("vditor-menu--current");
          hidePanel(vditor, ["subToolbar", "hint", "popover"]);
          setTimeout(() => {
            vditor.outline.render(vditor);
          }, vditor.options.preview.delay + 10);
        }
        setPadding(vditor);
      });
    }
  };

  // vditor-master/src/ts/util/RecordMedia.ts
  var RecordMedia = class {
    constructor(e) {
      this.SAMPLE_RATE = 5e3;
      this.isRecording = false;
      this.readyFlag = false;
      this.leftChannel = [];
      this.rightChannel = [];
      this.recordingLength = 0;
      let context;
      if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
      } else if (webkitAudioContext) {
        context = new webkitAudioContext();
      } else {
        return;
      }
      this.DEFAULT_SAMPLE_RATE = context.sampleRate;
      const volume = context.createGain();
      const audioInput = context.createMediaStreamSource(e);
      audioInput.connect(volume);
      this.recorder = context.createScriptProcessor(2048, 2, 1);
      this.recorder.onaudioprocess = null;
      volume.connect(this.recorder);
      this.recorder.connect(context.destination);
      this.readyFlag = true;
    }
    // Publicly accessible methods:
    cloneChannelData(leftChannelData, rightChannelData) {
      this.leftChannel.push(new Float32Array(leftChannelData));
      this.rightChannel.push(new Float32Array(rightChannelData));
      this.recordingLength += 2048;
    }
    startRecordingNewWavFile() {
      if (this.readyFlag) {
        this.isRecording = true;
        this.leftChannel.length = this.rightChannel.length = 0;
        this.recordingLength = 0;
      }
    }
    stopRecording() {
      this.isRecording = false;
    }
    buildWavFileBlob() {
      const leftBuffer = this.mergeBuffers(this.leftChannel);
      const rightBuffer = this.mergeBuffers(this.rightChannel);
      let interleaved = new Float32Array(leftBuffer.length);
      for (let i = 0; i < leftBuffer.length; ++i) {
        interleaved[i] = 0.5 * (leftBuffer[i] + rightBuffer[i]);
      }
      if (this.DEFAULT_SAMPLE_RATE > this.SAMPLE_RATE) {
        interleaved = this.downSampleBuffer(interleaved, this.SAMPLE_RATE);
      }
      const totalByteCount = 44 + interleaved.length * 2;
      const buffer = new ArrayBuffer(totalByteCount);
      const view = new DataView(buffer);
      this.writeUTFBytes(view, 0, "RIFF");
      view.setUint32(4, totalByteCount, true);
      this.writeUTFBytes(view, 8, "WAVE");
      this.writeUTFBytes(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, this.SAMPLE_RATE, true);
      view.setUint32(28, this.SAMPLE_RATE * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      const subChunk2ByteCount = interleaved.length * 2;
      this.writeUTFBytes(view, 36, "data");
      view.setUint32(40, subChunk2ByteCount, true);
      const lng = interleaved.length;
      let index = 44;
      const volume = 1;
      for (let j = 0; j < lng; j++) {
        view.setInt16(index, interleaved[j] * (32767 * volume), true);
        index += 2;
      }
      return new Blob([view], { type: "audio/wav" });
    }
    downSampleBuffer(buffer, rate) {
      if (rate === this.DEFAULT_SAMPLE_RATE) {
        return buffer;
      }
      if (rate > this.DEFAULT_SAMPLE_RATE) {
        return buffer;
      }
      const sampleRateRatio = this.DEFAULT_SAMPLE_RATE / rate;
      const newLength = Math.round(buffer.length / sampleRateRatio);
      const result = new Float32Array(newLength);
      let offsetResult = 0;
      let offsetBuffer = 0;
      while (offsetResult < result.length) {
        const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        let accum = 0;
        let count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
          accum += buffer[i];
          count++;
        }
        result[offsetResult] = accum / count;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
      }
      return result;
    }
    mergeBuffers(desiredChannelBuffer) {
      const result = new Float32Array(this.recordingLength);
      let offset = 0;
      const lng = desiredChannelBuffer.length;
      for (let i = 0; i < lng; ++i) {
        const buffer = desiredChannelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
      }
      return result;
    }
    writeUTFBytes(view, offset, value) {
      const lng = value.length;
      for (let i = 0; i < lng; i++) {
        view.setUint8(offset + i, value.charCodeAt(i));
      }
    }
  };

  // vditor-master/src/ts/toolbar/Record.ts
  var Record = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      this._bindEvent(vditor);
    }
    _bindEvent(vditor) {
      let mediaRecorder;
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        const editorElement = vditor[vditor.currentMode].element;
        if (!mediaRecorder) {
          navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
            mediaRecorder = new RecordMedia(mediaStream);
            mediaRecorder.recorder.onaudioprocess = (e) => {
              if (!mediaRecorder.isRecording) {
                return;
              }
              const left = e.inputBuffer.getChannelData(0);
              const right = e.inputBuffer.getChannelData(1);
              mediaRecorder.cloneChannelData(left, right);
            };
            mediaRecorder.startRecordingNewWavFile();
            vditor.tip.show(window.VditorI18n.recording);
            if (vditor.currentMode === "sv") {
              vditor.sv.element.disabled = true;
            } else {
              editorElement.setAttribute("contenteditable", "false");
            }
            this.element.children[0].classList.add("vditor-menu--current");
          }).catch(() => {
            vditor.tip.show(window.VditorI18n["record-tip"]);
          });
          return;
        }
        if (mediaRecorder.isRecording) {
          mediaRecorder.stopRecording();
          vditor.tip.hide();
          const file = new File(
            [mediaRecorder.buildWavFileBlob()],
            `record${(/* @__PURE__ */ new Date()).getTime()}.wav`,
            { type: "video/webm" }
          );
          uploadFiles(vditor, [file]);
          this.element.children[0].classList.remove("vditor-menu--current");
        } else {
          vditor.tip.show(window.VditorI18n.recording);
          if (vditor.currentMode === "sv") {
            vditor.sv.element.disabled = true;
          } else {
            editorElement.setAttribute("contenteditable", "false");
          }
          mediaRecorder.startRecordingNewWavFile();
          this.element.children[0].classList.add("vditor-menu--current");
        }
      });
    }
  };

  // vditor-master/src/ts/toolbar/Redo.ts
  var Redo = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      disableToolbar({ redo: this.element }, ["redo"]);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        vditor.undo.redo(vditor);
      });
    }
  };

  // vditor-master/src/ts/toolbar/Undo.ts
  var Undo = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      disableToolbar({ undo: this.element }, ["undo"]);
      this.element.children[0].addEventListener(getEventName(), (event) => {
        event.preventDefault();
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          return;
        }
        vditor.undo.undo(vditor);
      });
    }
  };

  // vditor-master/src/ts/toolbar/Upload.ts
  var Upload2 = class extends MenuItem {
    constructor(vditor, menuItem) {
      super(vditor, menuItem);
      let inputHTML = '<input type="file"';
      if (vditor.options.upload.multiple) {
        inputHTML += ' multiple="multiple"';
      }
      if (vditor.options.upload.accept) {
        inputHTML += ` accept="${vditor.options.upload.accept}"`;
      }
      this.element.children[0].innerHTML = `${menuItem.icon || '<svg><use xlink:href="#vditor-icon-upload"></use></svg>'}${inputHTML}>`;
      this._bindEvent(vditor);
    }
    _bindEvent(vditor) {
      this.element.children[0].addEventListener(getEventName(), (event) => {
        if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED)) {
          event.stopPropagation();
          event.preventDefault();
          return;
        }
      });
      this.element.querySelector("input").addEventListener(
        "change",
        (event) => {
          if (this.element.firstElementChild.classList.contains(Constants.CLASS_MENU_DISABLED)) {
            event.stopPropagation();
            event.preventDefault();
            return;
          }
          if (event.target.files.length === 0) {
            return;
          }
          uploadFiles(vditor, event.target.files, event.target);
        }
      );
    }
  };

  // vditor-master/src/ts/toolbar/index.ts
  var Toolbar = class {
    constructor(vditor) {
      const options = vditor.options;
      this.elements = {};
      this.element = document.createElement("div");
      this.element.className = "vditor-toolbar";
      options.toolbar.forEach((menuItem, i) => {
        const itemElement = this.genItem(vditor, menuItem, i);
        this.element.appendChild(itemElement);
        if (menuItem.toolbar) {
          const panelElement = document.createElement("div");
          panelElement.className = "vditor-hint vditor-panel--arrow";
          panelElement.addEventListener(getEventName(), (event) => {
            panelElement.style.display = "none";
          });
          menuItem.toolbar.forEach((subMenuItem, subI) => {
            subMenuItem.level = 2;
            panelElement.appendChild(this.genItem(vditor, subMenuItem, i + subI));
          });
          itemElement.appendChild(panelElement);
          toggleSubMenu(vditor, panelElement, itemElement.children[0], 2);
        }
      });
      if (vditor.options.toolbarConfig.hide) {
        this.element.classList.add("vditor-toolbar--hide");
      }
      if (vditor.options.toolbarConfig.pin) {
        this.element.classList.add("vditor-toolbar--pin");
      }
      if (vditor.options.counter.enable) {
        vditor.counter = new Counter(vditor);
        this.element.appendChild(vditor.counter.element);
      }
    }
    updateConfig(vditor, options) {
      vditor.options.toolbarConfig = Object.assign({
        hide: false,
        pin: false
      }, options);
      if (vditor.options.toolbarConfig.hide) {
        this.element.classList.add("vditor-toolbar--hide");
      } else {
        this.element.classList.remove("vditor-toolbar--hide");
      }
      if (vditor.options.toolbarConfig.pin) {
        this.element.classList.add("vditor-toolbar--pin");
      } else {
        this.element.classList.remove("vditor-toolbar--pin");
      }
    }
    genItem(vditor, menuItem, index) {
      let menuItemObj;
      switch (menuItem.name) {
        case "bold":
        case "italic":
        case "more":
        case "strike":
        case "line":
        case "quote":
        case "list":
        case "ordered-list":
        case "check":
        case "code":
        case "inline-code":
        case "link":
        case "table":
          menuItemObj = new MenuItem(vditor, menuItem);
          break;
        case "emoji":
          menuItemObj = new Emoji(vditor, menuItem);
          break;
        case "headings":
          menuItemObj = new Headings(vditor, menuItem);
          break;
        case "|":
          menuItemObj = new Divider();
          break;
        case "br":
          menuItemObj = new Br();
          break;
        case "undo":
          menuItemObj = new Undo(vditor, menuItem);
          break;
        case "redo":
          menuItemObj = new Redo(vditor, menuItem);
          break;
        case "help":
          menuItemObj = new Help(vditor, menuItem);
          break;
        case "both":
          menuItemObj = new Both(vditor, menuItem);
          break;
        case "preview":
          menuItemObj = new Preview2(vditor, menuItem);
          break;
        case "fullscreen":
          menuItemObj = new Fullscreen(vditor, menuItem);
          break;
        case "upload":
          menuItemObj = new Upload2(vditor, menuItem);
          break;
        case "record":
          menuItemObj = new Record(vditor, menuItem);
          break;
        case "info":
          menuItemObj = new Info(vditor, menuItem);
          break;
        case "edit-mode":
          menuItemObj = new EditMode(vditor, menuItem);
          break;
        case "devtools":
          menuItemObj = new Devtools(vditor, menuItem);
          break;
        case "outdent":
          menuItemObj = new Outdent(vditor, menuItem);
          break;
        case "indent":
          menuItemObj = new Indent(vditor, menuItem);
          break;
        case "outline":
          menuItemObj = new Outline2(vditor, menuItem);
          break;
        case "insert-after":
          menuItemObj = new InsertAfter(vditor, menuItem);
          break;
        case "insert-before":
          menuItemObj = new InsertBefore(vditor, menuItem);
          break;
        case "code-theme":
          menuItemObj = new CodeTheme(vditor, menuItem);
          break;
        case "content-theme":
          menuItemObj = new ContentTheme(vditor, menuItem);
          break;
        case "export":
          menuItemObj = new Export(vditor, menuItem);
          break;
        default:
          menuItemObj = new Custom(vditor, menuItem);
          break;
      }
      if (!menuItemObj) {
        return;
      }
      menuItemObj.element.querySelectorAll("button").forEach((button) => {
        button.setAttribute("type", "button");
      });
      let key = menuItem.name;
      if (key === "br" || key === "|") {
        key = key + index;
      }
      this.elements[key] = menuItemObj.element;
      return menuItemObj.element;
    }
  };

  // vditor-master/src/ts/undo/index.ts
  var import_diff_match_patch = __toESM(require_diff_match_patch());
  var Undo2 = class {
    constructor() {
      this.stackSize = 50;
      this.resetStack();
      this.dmp = new import_diff_match_patch.default();
    }
    clearStack(vditor) {
      this.resetStack();
      this.resetIcon(vditor);
    }
    resetIcon(vditor) {
      if (!vditor.toolbar) {
        return;
      }
      if (this[vditor.currentMode].undoStack.length > 1) {
        enableToolbar(vditor.toolbar.elements, ["undo"]);
      } else {
        disableToolbar(vditor.toolbar.elements, ["undo"]);
      }
      if (this[vditor.currentMode].redoStack.length !== 0) {
        enableToolbar(vditor.toolbar.elements, ["redo"]);
      } else {
        disableToolbar(vditor.toolbar.elements, ["redo"]);
      }
    }
    undo(vditor) {
      if (vditor.currentMode === "sv" ? vditor.sv.element.disabled : vditor[vditor.currentMode].element.getAttribute("contenteditable") === "false") {
        return;
      }
      if (this[vditor.currentMode].undoStack.length < 2) {
        return;
      }
      const state = this[vditor.currentMode].undoStack.pop();
      if (!state) {
        return;
      }
      this[vditor.currentMode].redoStack.push(state);
      this.renderDiff(state, vditor);
      this[vditor.currentMode].hasUndo = true;
      hidePanel(vditor, ["hint"]);
    }
    redo(vditor) {
      if (vditor.currentMode === "sv" ? vditor.sv.element.disabled : vditor[vditor.currentMode].element.getAttribute("contenteditable") === "false") {
        return;
      }
      const state = this[vditor.currentMode].redoStack.pop();
      if (!state) {
        return;
      }
      this[vditor.currentMode].undoStack.push(state);
      this.renderDiff(state, vditor, true);
    }
    recordFirstPosition(vditor, event) {
      if (vditor.currentMode !== "sv" && getSelection().rangeCount === 0) {
        return;
      }
      if (this[vditor.currentMode].undoStack.length !== 1 || this[vditor.currentMode].undoStack[0].length === 0 || this[vditor.currentMode].redoStack.length > 0) {
        return;
      }
      if (isFirefox() && event.key === "Backspace") {
        return;
      }
      if (isSafari()) {
        return;
      }
      const text = this.addCaret(vditor);
      if (text.replace("<wbr>", "").replace(" vditor-ir__node--expand", "") !== this[vditor.currentMode].undoStack[0][0].diffs[0][1].replace("<wbr>", "")) {
        return;
      }
      this[vditor.currentMode].undoStack[0][0].diffs[0][1] = text;
      this[vditor.currentMode].lastText = text;
    }
    addToUndoStack(vditor) {
      const text = this.addCaret(vditor, true);
      const diff = this.dmp.diff_main(text, this[vditor.currentMode].lastText, true);
      const patchList = this.dmp.patch_make(text, this[vditor.currentMode].lastText, diff);
      if (patchList.length === 0 && this[vditor.currentMode].undoStack.length > 0) {
        return;
      }
      this[vditor.currentMode].lastText = text;
      this[vditor.currentMode].undoStack.push(patchList);
      if (this[vditor.currentMode].undoStack.length > this.stackSize) {
        this[vditor.currentMode].undoStack.shift();
      }
      if (this[vditor.currentMode].hasUndo) {
        this[vditor.currentMode].redoStack = [];
        this[vditor.currentMode].hasUndo = false;
        disableToolbar(vditor.toolbar.elements, ["redo"]);
      }
      if (this[vditor.currentMode].undoStack.length > 1) {
        enableToolbar(vditor.toolbar.elements, ["undo"]);
      }
    }
    renderDiff(state, vditor, isRedo = false) {
      let text;
      if (isRedo) {
        const redoPatchList = this.dmp.patch_deepCopy(state).reverse();
        redoPatchList.forEach((patch) => {
          patch.diffs.forEach((diff) => {
            diff[0] = -diff[0];
          });
        });
        text = this.dmp.patch_apply(redoPatchList, this[vditor.currentMode].lastText)[0];
      } else {
        text = this.dmp.patch_apply(state, this[vditor.currentMode].lastText)[0];
      }
      this[vditor.currentMode].lastText = text;
      if (vditor.currentMode === "sv") {
        const caretIndex = text.indexOf("<wbr>");
        vditor.sv.element.value = text.replace("<wbr>", "");
        vditor.sv.element.focus();
        if (caretIndex > -1) {
          vditor.sv.element.setSelectionRange(caretIndex, caretIndex);
        }
      } else {
        vditor[vditor.currentMode].element.innerHTML = text;
        vditor[vditor.currentMode].element.querySelectorAll(`.vditor-${vditor.currentMode}__preview`).forEach((blockElement) => {
          if (blockElement.parentElement.querySelector(".language-echarts")) {
            if (vditor.currentMode === "ir") {
              blockElement.parentElement.outerHTML = vditor.lute.SpinVditorIRDOM(blockElement.parentElement.outerHTML);
            } else {
              blockElement.parentElement.outerHTML = vditor.lute.SpinVditorDOM(blockElement.parentElement.outerHTML);
            }
          }
        });
        vditor[vditor.currentMode].element.querySelectorAll(`.vditor-${vditor.currentMode}__preview[data-render='2']`).forEach((blockElement) => {
          processCodeRender(blockElement, vditor);
        });
        if (!vditor[vditor.currentMode].element.querySelector("wbr")) {
          const range = getSelection().getRangeAt(0);
          range.setEndBefore(vditor[vditor.currentMode].element);
          range.collapse(false);
        } else {
          setRangeByWbr(
            vditor[vditor.currentMode].element,
            vditor[vditor.currentMode].element.ownerDocument.createRange()
          );
          scrollCenter(vditor);
        }
      }
      renderToc(vditor);
      execAfterRender(vditor, {
        enableAddUndoStack: false,
        enableHint: false,
        enableInput: true
      });
      if (vditor.currentMode !== "sv") {
        highlightToolbar(vditor);
      }
      vditor[vditor.currentMode].element.querySelectorAll(`.vditor-${vditor.currentMode}__preview[data-render='2']`).forEach((item) => {
        processCodeRender(item, vditor);
      });
      if (this[vditor.currentMode].undoStack.length > 1) {
        enableToolbar(vditor.toolbar.elements, ["undo"]);
      } else {
        disableToolbar(vditor.toolbar.elements, ["undo"]);
      }
      if (this[vditor.currentMode].redoStack.length !== 0) {
        enableToolbar(vditor.toolbar.elements, ["redo"]);
      } else {
        disableToolbar(vditor.toolbar.elements, ["redo"]);
      }
    }
    resetStack() {
      this.ir = {
        hasUndo: false,
        lastText: "",
        redoStack: [],
        undoStack: []
      };
      this.sv = {
        hasUndo: false,
        lastText: "",
        redoStack: [],
        undoStack: []
      };
      this.wysiwyg = {
        hasUndo: false,
        lastText: "",
        redoStack: [],
        undoStack: []
      };
    }
    addCaret(vditor, setFocus = false) {
      if (vditor.currentMode === "sv") {
        const element = vditor.sv.element;
        return element.value.substring(0, element.selectionStart) + "<wbr>" + element.value.substring(element.selectionStart);
      }
      let cloneRange;
      if (getSelection().rangeCount !== 0 && !vditor[vditor.currentMode].element.querySelector("wbr")) {
        const range = getSelection().getRangeAt(0);
        if (vditor[vditor.currentMode].element.contains(range.startContainer)) {
          cloneRange = range.cloneRange();
          const wbrElement = document.createElement("span");
          wbrElement.className = "vditor-wbr";
          range.insertNode(wbrElement);
        }
      }
      const cloneElement = vditor[vditor.currentMode].element.cloneNode(true);
      cloneElement.querySelectorAll(`.vditor-${vditor.currentMode}__preview[data-render='1']`).forEach((item) => {
        if (!item.firstElementChild) {
          return;
        }
        if (item.firstElementChild.classList.contains("language-echarts") || item.firstElementChild.classList.contains("language-plantuml") || item.firstElementChild.classList.contains("language-mindmap")) {
          item.firstElementChild.removeAttribute("_echarts_instance_");
          item.firstElementChild.removeAttribute("data-processed");
          item.firstElementChild.innerHTML = item.previousElementSibling.firstElementChild.innerHTML;
          item.setAttribute("data-render", "2");
        } else if (item.firstElementChild.classList.contains("language-math")) {
          item.setAttribute("data-render", "2");
          item.firstElementChild.textContent = item.firstElementChild.getAttribute("data-math");
          item.firstElementChild.removeAttribute("data-math");
        }
      });
      const text = cloneElement.innerHTML;
      vditor[vditor.currentMode].element.querySelectorAll(".vditor-wbr").forEach((item) => {
        item.remove();
      });
      if (setFocus && cloneRange) {
        setSelectionFocus(cloneRange);
      }
      return text.replace('<span class="vditor-wbr"></span>', "<wbr>");
    }
  };

  // vditor-master/src/ts/util/Options.ts
  var Options = class {
    constructor(options) {
      this.defaultOptions = {
        rtl: false,
        after: void 0,
        cache: {
          enable: true
        },
        cdn: Constants.CDN,
        classes: {
          preview: ""
        },
        comment: {
          enable: false
        },
        counter: {
          enable: false,
          type: "markdown"
        },
        customRenders: [],
        debugger: false,
        fullscreen: {
          index: 90
        },
        height: "auto",
        hint: {
          delay: 200,
          emoji: {
            "+1": "\u{1F44D}",
            "-1": "\u{1F44E}",
            "confused": "\u{1F615}",
            "eyes": "\u{1F440}\uFE0F",
            "heart": "\u2764\uFE0F",
            "rocket": "\u{1F680}\uFE0F",
            "smile": "\u{1F604}",
            "tada": "\u{1F389}\uFE0F"
          },
          emojiPath: `${Constants.CDN}/dist/images/emoji`,
          extend: [],
          parse: true
        },
        icon: "ant",
        lang: "zh_CN",
        mode: "ir",
        outline: {
          enable: false,
          position: "left"
        },
        placeholder: "",
        preview: {
          actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"],
          delay: 1e3,
          hljs: Constants.HLJS_OPTIONS,
          markdown: Constants.MARKDOWN_OPTIONS,
          math: Constants.MATH_OPTIONS,
          maxWidth: 800,
          mode: "both",
          theme: Constants.THEME_OPTIONS,
          render: {
            media: {
              enable: true
            }
          }
        },
        link: {
          isOpen: true
        },
        image: {
          isPreview: true
        },
        resize: {
          enable: false,
          position: "bottom"
        },
        theme: "classic",
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          "upload",
          "record",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              "code-theme",
              "content-theme",
              "export",
              "outline",
              "preview",
              "devtools",
              "info",
              "help"
            ]
          }
        ],
        toolbarConfig: {
          hide: false,
          pin: false
        },
        typewriterMode: false,
        undoDelay: 800,
        upload: {
          extraData: {},
          fieldName: "file[]",
          filename: (name) => name.replace(/\W/g, ""),
          linkToImgUrl: "",
          max: 10 * 1024 * 1024,
          multiple: true,
          url: "",
          withCredentials: false
        },
        value: "",
        width: "auto"
      };
      this.options = options;
    }
    merge() {
      if (this.options) {
        if (this.options.toolbar) {
          this.options.toolbar = this.mergeToolbar(this.options.toolbar);
        } else {
          this.options.toolbar = this.mergeToolbar(this.defaultOptions.toolbar);
        }
        if (this.options.preview?.theme?.list) {
          this.defaultOptions.preview.theme.list = this.options.preview.theme.list;
        }
        if (this.options.preview?.render?.media?.enable) {
          this.defaultOptions.preview.render.media.enable = this.options.preview.render.media.enable;
        }
        if (this.options.hint?.emoji) {
          this.defaultOptions.hint.emoji = this.options.hint.emoji;
        }
        if (this.options.comment) {
          this.defaultOptions.comment = this.options.comment;
        }
        if (this.options.cdn) {
          if (!this.options.preview?.theme?.path) {
            this.defaultOptions.preview.theme.path = `${this.options.cdn}/dist/css/content-theme`;
          }
          if (!this.options.hint?.emojiPath) {
            this.defaultOptions.hint.emojiPath = `${this.options.cdn}/dist/images/emoji`;
          }
        }
      }
      const mergedOptions = merge(this.defaultOptions, this.options);
      if (mergedOptions.cache.enable && !mergedOptions.cache.id) {
        throw new Error(
          "need options.cache.id, see https://ld246.com/article/1549638745630#options"
        );
      }
      return mergedOptions;
    }
    mergeToolbar(toolbar2) {
      const toolbarItem = [
        {
          icon: '<svg><use xlink:href="#vditor-icon-export"></use></svg>',
          name: "export",
          tipPosition: "ne"
        },
        {
          hotkey: "\u2318E",
          icon: '<svg><use xlink:href="#vditor-icon-emoji"></use></svg>',
          name: "emoji",
          tipPosition: "ne"
        },
        {
          hotkey: "\u2318H",
          icon: '<svg><use xlink:href="#vditor-icon-headings"></use></svg>',
          name: "headings",
          tipPosition: "ne"
        },
        {
          hotkey: "\u2318B",
          icon: '<svg><use xlink:href="#vditor-icon-bold"></use></svg>',
          name: "bold",
          prefix: "**",
          suffix: "**",
          tipPosition: "ne"
        },
        {
          hotkey: "\u2318I",
          icon: '<svg><use xlink:href="#vditor-icon-italic"></use></svg>',
          name: "italic",
          prefix: "*",
          suffix: "*",
          tipPosition: "ne"
        },
        {
          hotkey: "\u2318D",
          icon: '<svg><use xlink:href="#vditor-icon-strike"></use></svg>',
          name: "strike",
          prefix: "~~",
          suffix: "~~",
          tipPosition: "ne"
        },
        {
          hotkey: "\u2318K",
          icon: '<svg><use xlink:href="#vditor-icon-link"></use></svg>',
          name: "link",
          prefix: "[",
          suffix: "](https://)",
          tipPosition: "n"
        },
        {
          name: "|"
        },
        {
          hotkey: "\u2318L",
          icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
          name: "list",
          prefix: "* ",
          tipPosition: "n"
        },
        {
          hotkey: "\u2318O",
          icon: '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>',
          name: "ordered-list",
          prefix: "1. ",
          tipPosition: "n"
        },
        {
          hotkey: "\u2318J",
          icon: '<svg><use xlink:href="#vditor-icon-check"></use></svg>',
          name: "check",
          prefix: "* [ ] ",
          tipPosition: "n"
        },
        {
          hotkey: "\u21E7\u2318I",
          icon: '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>',
          name: "outdent",
          tipPosition: "n"
        },
        {
          hotkey: "\u21E7\u2318O",
          icon: '<svg><use xlink:href="#vditor-icon-indent"></use></svg>',
          name: "indent",
          tipPosition: "n"
        },
        {
          name: "|"
        },
        {
          hotkey: "\u2318;",
          icon: '<svg><use xlink:href="#vditor-icon-quote"></use></svg>',
          name: "quote",
          prefix: "> ",
          tipPosition: "n"
        },
        {
          hotkey: "\u21E7\u2318H",
          icon: '<svg><use xlink:href="#vditor-icon-line"></use></svg>',
          name: "line",
          prefix: "***",
          tipPosition: "n"
        },
        {
          hotkey: "\u2318U",
          icon: '<svg><use xlink:href="#vditor-icon-code"></use></svg>',
          name: "code",
          prefix: "```",
          suffix: "\n```",
          tipPosition: "n"
        },
        {
          hotkey: "\u2318G",
          icon: '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>',
          name: "inline-code",
          prefix: "`",
          suffix: "`",
          tipPosition: "n"
        },
        {
          hotkey: "\u21E7\u2318B",
          icon: '<svg><use xlink:href="#vditor-icon-before"></use></svg>',
          name: "insert-before",
          tipPosition: "n"
        },
        {
          hotkey: "\u21E7\u2318E",
          icon: '<svg><use xlink:href="#vditor-icon-after"></use></svg>',
          name: "insert-after",
          tipPosition: "n"
        },
        {
          name: "|"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
          name: "upload",
          tipPosition: "n"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-record"></use></svg>',
          name: "record",
          tipPosition: "n"
        },
        {
          hotkey: "\u2318M",
          icon: '<svg><use xlink:href="#vditor-icon-table"></use></svg>',
          name: "table",
          prefix: "| col1",
          suffix: " | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |",
          tipPosition: "n"
        },
        {
          name: "|"
        },
        {
          hotkey: "\u2318Z",
          icon: '<svg><use xlink:href="#vditor-icon-undo"></use></svg>',
          name: "undo",
          tipPosition: "nw"
        },
        {
          hotkey: "\u2318Y",
          icon: '<svg><use xlink:href="#vditor-icon-redo"></use></svg>',
          name: "redo",
          tipPosition: "nw"
        },
        {
          name: "|"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-more"></use></svg>',
          name: "more",
          tipPosition: "e"
        },
        {
          hotkey: "\u2318'",
          icon: '<svg><use xlink:href="#vditor-icon-fullscreen"></use></svg>',
          name: "fullscreen",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-edit"></use></svg>',
          name: "edit-mode",
          tipPosition: "nw"
        },
        {
          hotkey: "\u2318P",
          icon: '<svg><use xlink:href="#vditor-icon-both"></use></svg>',
          name: "both",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-preview"></use></svg>',
          name: "preview",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>',
          name: "outline",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-theme"></use></svg>',
          name: "content-theme",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>',
          name: "code-theme",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-bug"></use></svg>',
          name: "devtools",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-info"></use></svg>',
          name: "info",
          tipPosition: "nw"
        },
        {
          icon: '<svg><use xlink:href="#vditor-icon-help"></use></svg>',
          name: "help",
          tipPosition: "nw"
        },
        {
          name: "br"
        }
      ];
      const toolbarResult = [];
      toolbar2.forEach((menuItem) => {
        let currentMenuItem = menuItem;
        toolbarItem.forEach((defaultMenuItem) => {
          if (typeof menuItem === "string" && defaultMenuItem.name === menuItem) {
            currentMenuItem = defaultMenuItem;
          }
          if (typeof menuItem === "object" && defaultMenuItem.name === menuItem.name) {
            currentMenuItem = Object.assign({}, defaultMenuItem, menuItem);
          }
        });
        if (menuItem.toolbar) {
          currentMenuItem.toolbar = this.mergeToolbar(menuItem.toolbar);
        }
        toolbarResult.push(currentMenuItem);
      });
      return toolbarResult;
    }
  };

  // vditor-master/src/ts/wysiwyg/index.ts
  var WYSIWYG = class {
    constructor(vditor) {
      this.composingLock = false;
      this.commentIds = [];
      const divElement = document.createElement("div");
      divElement.className = "vditor-wysiwyg";
      divElement.innerHTML = `<pre class="vditor-reset" placeholder="${vditor.options.placeholder}"
 contenteditable="true" spellcheck="false"></pre>
<div class="vditor-panel vditor-panel--none"></div>
<div class="vditor-panel vditor-panel--none">
    <button type="button" aria-label="${window.VditorI18n.comment}" class="vditor-icon vditor-tooltipped vditor-tooltipped__n">
        <svg><use xlink:href="#vditor-icon-comment"></use></svg>
    </button>
</div>`;
      this.element = divElement.firstElementChild;
      this.popover = divElement.firstElementChild.nextElementSibling;
      this.selectPopover = divElement.lastElementChild;
      this.bindEvent(vditor);
      focusEvent(vditor, this.element);
      dblclickEvent(vditor, this.element);
      blurEvent(vditor, this.element);
      hotkeyEvent(vditor, this.element);
      selectEvent(vditor, this.element);
      dropEvent(vditor, this.element);
      copyEvent(vditor, this.element, this.copy);
      cutEvent(vditor, this.element, this.copy);
      if (vditor.options.comment.enable) {
        this.selectPopover.querySelector("button").onclick = () => {
          const id = Lute.NewNodeID();
          const range = getSelection().getRangeAt(0);
          const rangeClone = range.cloneRange();
          const contents = range.extractContents();
          let blockStartElement;
          let blockEndElement;
          let removeStart = false;
          let removeEnd = false;
          contents.childNodes.forEach((item, index) => {
            let wrap = false;
            if (item.nodeType === 3) {
              wrap = true;
            } else if (!item.classList.contains("vditor-comment")) {
              wrap = true;
            } else if (item.classList.contains("vditor-comment")) {
              item.setAttribute("data-cmtids", item.getAttribute("data-cmtids") + " " + id);
            }
            if (wrap) {
              if (item.nodeType !== 3 && item.getAttribute("data-block") === "0" && index === 0 && rangeClone.startOffset > 0) {
                item.innerHTML = `<span class="vditor-comment" data-cmtids="${id}">${item.innerHTML}</span>`;
                blockStartElement = item;
              } else if (item.nodeType !== 3 && item.getAttribute("data-block") === "0" && index === contents.childNodes.length - 1 && rangeClone.endOffset < rangeClone.endContainer.textContent.length) {
                item.innerHTML = `<span class="vditor-comment" data-cmtids="${id}">${item.innerHTML}</span>`;
                blockEndElement = item;
              } else if (item.nodeType !== 3 && item.getAttribute("data-block") === "0") {
                if (index === 0) {
                  removeStart = true;
                } else if (index === contents.childNodes.length - 1) {
                  removeEnd = true;
                }
                item.innerHTML = `<span class="vditor-comment" data-cmtids="${id}">${item.innerHTML}</span>`;
              } else {
                const commentElement = document.createElement("span");
                commentElement.classList.add("vditor-comment");
                commentElement.setAttribute("data-cmtids", id);
                item.parentNode.insertBefore(commentElement, item);
                commentElement.appendChild(item);
              }
            }
          });
          const startElement = hasClosestBlock(rangeClone.startContainer);
          if (startElement) {
            if (blockStartElement) {
              startElement.insertAdjacentHTML("beforeend", blockStartElement.innerHTML);
              blockStartElement.remove();
            } else if (startElement.textContent.trim().replace(Constants.ZWSP, "") === "" && removeStart) {
              startElement.remove();
            }
          }
          const endElement = hasClosestBlock(rangeClone.endContainer);
          if (endElement) {
            if (blockEndElement) {
              endElement.insertAdjacentHTML("afterbegin", blockEndElement.innerHTML);
              blockEndElement.remove();
            } else if (endElement.textContent.trim().replace(Constants.ZWSP, "") === "" && removeEnd) {
              endElement.remove();
            }
          }
          range.insertNode(contents);
          vditor.options.comment.add(id, range.toString(), this.getComments(vditor, true));
          afterRenderEvent(vditor, {
            enableAddUndoStack: true,
            enableHint: false,
            enableInput: false
          });
          this.hideComment();
        };
      }
    }
    getComments(vditor, getData = false) {
      if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable) {
        this.commentIds = [];
        this.element.querySelectorAll(".vditor-comment").forEach((item) => {
          this.commentIds = this.commentIds.concat(item.getAttribute("data-cmtids").split(" "));
        });
        this.commentIds = Array.from(new Set(this.commentIds));
        const comments = [];
        if (getData) {
          this.commentIds.forEach((id) => {
            comments.push({
              id,
              top: this.element.querySelector(`.vditor-comment[data-cmtids="${id}"]`).offsetTop
            });
          });
          return comments;
        }
      } else {
        return [];
      }
    }
    triggerRemoveComment(vditor) {
      const difference = (a, b) => {
        const s = new Set(b);
        return a.filter((x) => !s.has(x));
      };
      if (vditor.currentMode === "wysiwyg" && vditor.options.comment.enable && vditor.wysiwyg.commentIds.length > 0) {
        const oldIds = JSON.parse(JSON.stringify(this.commentIds));
        this.getComments(vditor);
        const removedIds = difference(oldIds, this.commentIds);
        if (removedIds.length > 0) {
          vditor.options.comment.remove(removedIds);
        }
      }
    }
    showComment() {
      const position = getCursorPosition(this.element);
      this.selectPopover.setAttribute("style", `left:${position.left}px;display:block;top:${Math.max(-8, position.top - 21)}px`);
    }
    hideComment() {
      this.selectPopover.setAttribute("style", "display:none");
    }
    unbindListener() {
      window.removeEventListener("scroll", this.scrollListener);
    }
    copy(event, vditor) {
      const range = getSelection().getRangeAt(0);
      if (range.toString() === "") {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      const codeElement = hasClosestByMatchTag(range.startContainer, "CODE");
      const codeEndElement = hasClosestByMatchTag(range.endContainer, "CODE");
      if (codeElement && codeEndElement && codeEndElement.isSameNode(codeElement)) {
        let codeText = "";
        if (codeElement.parentElement.tagName === "PRE") {
          codeText = range.toString();
        } else {
          codeText = "`" + range.toString() + "`";
        }
        event.clipboardData.setData("text/plain", codeText);
        event.clipboardData.setData("text/html", "");
        return;
      }
      const aElement = hasClosestByMatchTag(range.startContainer, "A");
      const aEndElement = hasClosestByMatchTag(range.endContainer, "A");
      if (aElement && aEndElement && aEndElement.isSameNode(aElement)) {
        let aTitle = aElement.getAttribute("title") || "";
        if (aTitle) {
          aTitle = ` "${aTitle}"`;
        }
        event.clipboardData.setData(
          "text/plain",
          `[${range.toString()}](${aElement.getAttribute("href")}${aTitle})`
        );
        event.clipboardData.setData("text/html", "");
        return;
      }
      const tempElement = document.createElement("div");
      tempElement.appendChild(range.cloneContents());
      event.clipboardData.setData("text/plain", vditor.lute.VditorDOM2Md(tempElement.innerHTML).trim());
      event.clipboardData.setData("text/html", "");
    }
    bindEvent(vditor) {
      this.unbindListener();
      window.addEventListener("scroll", this.scrollListener = () => {
        hidePanel(vditor, ["hint"]);
        if (this.popover.style.display !== "block" || this.selectPopover.style.display !== "block") {
          return;
        }
        const top = parseInt(this.popover.getAttribute("data-top"), 10);
        if (vditor.options.height !== "auto") {
          if (vditor.options.toolbarConfig.pin && vditor.toolbar.element.getBoundingClientRect().top === 0) {
            const popoverTop = Math.max(
              window.scrollY - vditor.element.offsetTop - 8,
              Math.min(top - vditor.wysiwyg.element.scrollTop, this.element.clientHeight - 21)
            ) + "px";
            if (this.popover.style.display === "block") {
              this.popover.style.top = popoverTop;
            }
            if (this.selectPopover.style.display === "block") {
              this.selectPopover.style.top = popoverTop;
            }
          }
          return;
        } else if (!vditor.options.toolbarConfig.pin) {
          return;
        }
        const popoverTop1 = Math.max(top, window.scrollY - vditor.element.offsetTop - 8) + "px";
        if (this.popover.style.display === "block") {
          this.popover.style.top = popoverTop1;
        }
        if (this.selectPopover.style.display === "block") {
          this.selectPopover.style.top = popoverTop1;
        }
      });
      this.element.addEventListener("scroll", () => {
        hidePanel(vditor, ["hint"]);
        if (vditor.options.comment && vditor.options.comment.enable && vditor.options.comment.scroll) {
          vditor.options.comment.scroll(vditor.wysiwyg.element.scrollTop);
        }
        if (this.popover.style.display !== "block") {
          return;
        }
        const top = parseInt(this.popover.getAttribute("data-top"), 10) - vditor.wysiwyg.element.scrollTop;
        let max = -8;
        if (vditor.options.toolbarConfig.pin && vditor.toolbar.element.getBoundingClientRect().top === 0) {
          max = window.scrollY - vditor.element.offsetTop + max;
        }
        const topPx = Math.max(max, Math.min(top, this.element.clientHeight - 21)) + "px";
        this.popover.style.top = topPx;
        this.selectPopover.style.top = topPx;
      });
      this.element.addEventListener("paste", (event) => {
        paste(vditor, event, {
          pasteCode: (code) => {
            const range = getEditorRange(vditor);
            const node = document.createElement("template");
            node.innerHTML = code;
            range.insertNode(node.content.cloneNode(true));
            const blockElement = hasClosestByAttribute(range.startContainer, "data-block", "0");
            if (blockElement) {
              blockElement.outerHTML = vditor.lute.SpinVditorDOM(blockElement.outerHTML);
            } else {
              vditor.wysiwyg.element.innerHTML = vditor.lute.SpinVditorDOM(vditor.wysiwyg.element.innerHTML);
            }
            setRangeByWbr(vditor.wysiwyg.element, range);
          }
        });
      });
      this.element.addEventListener("compositionstart", () => {
        this.composingLock = true;
      });
      this.element.addEventListener("compositionend", (event) => {
        const headingElement = hasClosestByHeadings(getSelection().getRangeAt(0).startContainer);
        if (headingElement && headingElement.textContent === "") {
          renderToc(vditor);
          return;
        }
        if (!isFirefox()) {
          input2(vditor, getSelection().getRangeAt(0).cloneRange(), event);
        }
        this.composingLock = false;
      });
      this.element.addEventListener("input", (event) => {
        if (event.inputType === "deleteByDrag" || event.inputType === "insertFromDrop") {
          return;
        }
        if (this.preventInput) {
          this.preventInput = false;
          afterRenderEvent(vditor);
          return;
        }
        if (this.composingLock || event.data === "\u2018" || event.data === "\u201C" || event.data === "\u300A") {
          afterRenderEvent(vditor);
          return;
        }
        const range = getSelection().getRangeAt(0);
        let blockElement = hasClosestBlock(range.startContainer);
        if (!blockElement) {
          modifyPre(vditor, range);
          blockElement = hasClosestBlock(range.startContainer);
        }
        if (!blockElement) {
          return;
        }
        const startOffset = getSelectPosition(blockElement, vditor.wysiwyg.element, range).start;
        let startSpace = true;
        for (let i = startOffset - 1; i > blockElement.textContent.substr(0, startOffset).lastIndexOf("\n"); i--) {
          if (blockElement.textContent.charAt(i) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
          blockElement.textContent.charAt(i) !== "	") {
            startSpace = false;
            break;
          }
        }
        if (startOffset === 0) {
          startSpace = false;
        }
        let endSpace = true;
        for (let i = startOffset - 1; i < blockElement.textContent.length; i++) {
          if (blockElement.textContent.charAt(i) !== " " && blockElement.textContent.charAt(i) !== "\n") {
            endSpace = false;
            break;
          }
        }
        if (endSpace && /^#{1,6} $/.test(blockElement.textContent)) {
          endSpace = false;
        }
        const headingElement = hasClosestByHeadings(getSelection().getRangeAt(0).startContainer);
        if (headingElement && headingElement.textContent === "") {
          renderToc(vditor);
          headingElement.remove();
        }
        if (startSpace && blockElement.getAttribute("data-type") !== "code-block" || endSpace || isHeadingMD(blockElement.innerHTML) || isHrMD(blockElement.innerHTML) && blockElement.previousElementSibling) {
          if (typeof vditor.options.input === "function") {
            vditor.options.input(getMarkdown(vditor));
          }
          return;
        }
        if (event.inputType === "insertParagraph" && this.element.innerHTML === "<p><br></p><p><br></p>") {
          blockElement.previousElementSibling.remove();
        }
        input2(vditor, range, event);
      });
      this.element.addEventListener("click", (event) => {
        if (event.target.tagName === "INPUT") {
          const checkElement = event.target;
          if (checkElement.checked) {
            checkElement.setAttribute("checked", "checked");
          } else {
            checkElement.removeAttribute("checked");
          }
          this.preventInput = true;
          if (getSelection().rangeCount > 0) {
            setSelectionFocus(getSelection().getRangeAt(0));
          }
          afterRenderEvent(vditor);
          return;
        }
        if (event.target.tagName === "IMG" && // plantuml 图片渲染不进行提示
        !event.target.parentElement.classList.contains("vditor-wysiwyg__preview")) {
          if (event.target.getAttribute("data-type") === "link-ref") {
            genLinkRefPopover(vditor, event.target);
          } else {
            genImagePopover(event, vditor);
          }
          return;
        }
        const a = hasClosestByMatchTag(event.target, "A");
        if (a) {
          if (vditor.options.link.click) {
            vditor.options.link.click(a);
          } else if (vditor.options.link.isOpen) {
            window.open(a.getAttribute("href"));
          }
          event.preventDefault();
          return;
        }
        const range = getEditorRange(vditor);
        if (event.target.isEqualNode(this.element) && this.element.lastElementChild && range.collapsed) {
          const lastRect = this.element.lastElementChild.getBoundingClientRect();
          if (event.y > lastRect.top + lastRect.height) {
            if (this.element.lastElementChild.tagName === "P" && this.element.lastElementChild.textContent.trim().replace(Constants.ZWSP, "") === "") {
              range.selectNodeContents(this.element.lastElementChild);
              range.collapse(false);
            } else {
              this.element.insertAdjacentHTML(
                "beforeend",
                `<p data-block="0">${Constants.ZWSP}<wbr></p>`
              );
              setRangeByWbr(this.element, range);
            }
          }
        }
        highlightToolbarWYSIWYG(vditor);
        let previewElement = hasClosestByClassName(event.target, "vditor-wysiwyg__preview");
        if (!previewElement) {
          previewElement = hasClosestByClassName(getEditorRange(vditor).startContainer, "vditor-wysiwyg__preview");
        }
        if (previewElement) {
          showCode(previewElement, vditor);
        }
        clickToc(event, vditor);
      });
      this.element.addEventListener("keyup", (event) => {
        if (event.isComposing || isCtrl(event)) {
          return;
        }
        if (event.key === "Enter") {
          scrollCenter(vditor);
        }
        if ((event.key === "Backspace" || event.key === "Delete") && vditor.wysiwyg.element.innerHTML !== "" && vditor.wysiwyg.element.childNodes.length === 1 && vditor.wysiwyg.element.firstElementChild && vditor.wysiwyg.element.firstElementChild.tagName === "P" && vditor.wysiwyg.element.firstElementChild.childElementCount === 0 && (vditor.wysiwyg.element.textContent === "" || vditor.wysiwyg.element.textContent === "\n")) {
          vditor.wysiwyg.element.innerHTML = "";
        }
        const range = getEditorRange(vditor);
        if (event.key === "Backspace") {
          if (isFirefox() && range.startContainer.textContent === "\n" && range.startOffset === 1) {
            range.startContainer.textContent = "";
          }
        }
        modifyPre(vditor, range);
        highlightToolbarWYSIWYG(vditor);
        if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "Backspace" && event.key !== "ArrowLeft" && event.key !== "ArrowUp") {
          return;
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          vditor.hint.render(vditor);
        }
        let previewElement = hasClosestByClassName(range.startContainer, "vditor-wysiwyg__preview");
        if (!previewElement && range.startContainer.nodeType !== 3 && range.startOffset > 0) {
          const blockRenderElement = range.startContainer;
          if (blockRenderElement.classList.contains("vditor-wysiwyg__block")) {
            previewElement = blockRenderElement.lastElementChild;
          }
        }
        if (!previewElement) {
          return;
        }
        const previousElement = previewElement.previousElementSibling;
        if (previousElement.style.display === "none") {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            showCode(previewElement, vditor);
          } else {
            showCode(previewElement, vditor, false);
          }
          return;
        }
        let codeElement = previewElement.previousElementSibling;
        if (codeElement.tagName === "PRE") {
          codeElement = codeElement.firstElementChild;
        }
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          const blockRenderElement = previewElement.parentElement;
          let nextNode = getRenderElementNextNode(blockRenderElement);
          if (nextNode && nextNode.nodeType !== 3) {
            const nextRenderElement = nextNode.querySelector(".vditor-wysiwyg__preview");
            if (nextRenderElement) {
              showCode(nextRenderElement, vditor);
              return;
            }
          }
          if (nextNode.nodeType === 3) {
            while (nextNode.textContent.length === 0 && nextNode.nextSibling) {
              nextNode = nextNode.nextSibling;
            }
            range.setStart(nextNode, 1);
          } else {
            range.setStart(nextNode.firstChild, 0);
          }
        } else {
          range.selectNodeContents(codeElement);
          range.collapse(false);
        }
      });
    }
  };

  // vditor-master/src/index.ts
  var Vditor2 = class extends method_default {
    /**
     * @param id 要挂载 Vditor 的元素或者元素 ID。
     * @param options Vditor 参数
     */
    constructor(id, options) {
      super();
      this.isDestroyed = false;
      this.version = _VDITOR_VERSION;
      if (typeof id === "string") {
        if (!options) {
          options = {
            cache: {
              id: `vditor${id}`
            }
          };
        } else if (!options.cache) {
          options.cache = { id: `vditor${id}` };
        } else if (!options.cache.id) {
          options.cache.id = `vditor${id}`;
        }
        if (!document.getElementById(id)) {
          this.showErrorTip(`Failed to get element by id: ${id}`);
          return;
        }
        id = document.getElementById(id);
      }
      const getOptions = new Options(options);
      const mergedOptions = getOptions.merge();
      if (!mergedOptions.i18n) {
        if (!["de_DE", "en_US", "es_ES", "fr_FR", "ja_JP", "ko_KR", "pt_BR", "ru_RU", "sv_SE", "vi_VN", "zh_CN", "zh_TW"].includes(mergedOptions.lang)) {
          throw new Error(
            "options.lang error, see https://ld246.com/article/1549638745630#options"
          );
        } else {
          const i18nScriptPrefix = "vditorI18nScript";
          const i18nScriptID = i18nScriptPrefix + mergedOptions.lang;
          document.querySelectorAll(`head script[id^="${i18nScriptPrefix}"]`).forEach((el) => {
            if (el.id !== i18nScriptID) {
              document.head.removeChild(el);
            }
          });
          addScript(`${mergedOptions.cdn}/dist/js/i18n/${mergedOptions.lang}.js`, i18nScriptID).then(() => {
            this.init(id, mergedOptions);
          }).catch((error) => {
            this.showErrorTip(`GET ${mergedOptions.cdn}/dist/js/i18n/${mergedOptions.lang}.js net::ERR_ABORTED 404 (Not Found)`);
          });
        }
      } else {
        window.VditorI18n = mergedOptions.i18n;
        this.init(id, mergedOptions);
      }
    }
    showErrorTip(error) {
      const tip = new Tip();
      document.body.appendChild(tip.element);
      tip.show(error, 0);
    }
    updateToolbarConfig(options) {
      this.vditor.toolbar.updateConfig(this.vditor, options);
    }
    /** 设置主题 */
    setTheme(theme, contentTheme, codeTheme, contentThemePath) {
      this.vditor.options.theme = theme;
      setTheme(this.vditor);
      if (contentTheme) {
        this.vditor.options.preview.theme.current = contentTheme;
        setContentTheme(contentTheme, contentThemePath || this.vditor.options.preview.theme.path);
      }
      if (codeTheme) {
        this.vditor.options.preview.hljs.style = codeTheme;
        setCodeTheme(codeTheme, this.vditor.options.cdn);
      }
    }
    /** 获取 Markdown 内容 */
    getValue() {
      return getMarkdown(this.vditor);
    }
    /** 获取编辑器当前编辑模式 */
    getCurrentMode() {
      return this.vditor.currentMode;
    }
    /** 聚焦到编辑器 */
    focus() {
      if (this.vditor.currentMode === "sv") {
        this.vditor.sv.element.focus();
      } else if (this.vditor.currentMode === "wysiwyg") {
        this.vditor.wysiwyg.element.focus();
      } else if (this.vditor.currentMode === "ir") {
        this.vditor.ir.element.focus();
      }
    }
    /** 让编辑器失焦 */
    blur() {
      if (this.vditor.currentMode === "sv") {
        this.vditor.sv.element.blur();
      } else if (this.vditor.currentMode === "wysiwyg") {
        this.vditor.wysiwyg.element.blur();
      } else if (this.vditor.currentMode === "ir") {
        this.vditor.ir.element.blur();
      }
    }
    /** 禁用编辑器 */
    disabled() {
      hidePanel(this.vditor, ["subToolbar", "hint", "popover"]);
      disableToolbar(
        this.vditor.toolbar.elements,
        Constants.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])
      );
      if (this.vditor.currentMode === "sv") {
        this.vditor.sv.element.disabled = true;
      } else {
        this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "false");
      }
    }
    /** 解除编辑器禁用 */
    enable() {
      enableToolbar(
        this.vditor.toolbar.elements,
        Constants.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])
      );
      this.vditor.undo.resetIcon(this.vditor);
      if (this.vditor.currentMode === "sv") {
        this.vditor.sv.element.disabled = false;
      } else {
        this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
      }
    }
    /** 返回选中的字符串 */
    getSelection() {
      if (this.vditor.currentMode === "wysiwyg") {
        return getSelectText(this.vditor.wysiwyg.element);
      } else if (this.vditor.currentMode === "sv") {
        return this.vditor.sv.element.value.substring(
          this.vditor.sv.element.selectionStart,
          this.vditor.sv.element.selectionEnd
        );
      } else if (this.vditor.currentMode === "ir") {
        return getSelectText(this.vditor.ir.element);
      }
    }
    /** 设置预览区域内容 */
    renderPreview(value) {
      this.vditor.preview.render(this.vditor, value);
    }
    /** 获取焦点位置 */
    getCursorPosition() {
      if (this.vditor.currentMode === "sv") {
        const element = this.vditor.sv.element;
        const lineHeight = parseInt(getComputedStyle(element).lineHeight, 10) || 22;
        const line = element.value.substring(0, element.selectionStart).split("\n").length - 1;
        return {
          left: 0,
          top: line * lineHeight - element.scrollTop
        };
      }
      return getCursorPosition(this.vditor[this.vditor.currentMode].element);
    }
    /** 上传是否还在进行中 */
    isUploading() {
      return this.vditor.upload.isUploading;
    }
    /** 清除缓存 */
    clearCache() {
      if (this.vditor.options.cache.enable && accessLocalStorage()) {
        localStorage.removeItem(this.vditor.options.cache.id);
      }
    }
    /** 禁用缓存 */
    disabledCache() {
      this.vditor.options.cache.enable = false;
    }
    /** 启用缓存 */
    enableCache() {
      if (!this.vditor.options.cache.id) {
        throw new Error(
          "need options.cache.id, see https://ld246.com/article/1549638745630#options"
        );
      }
      this.vditor.options.cache.enable = true;
    }
    /** HTML 转 md */
    html2md(value) {
      return this.vditor.lute.HTML2Md(value);
    }
    /** markdown 转 JSON 输出 */
    exportJSON(value) {
      return this.vditor.lute.RenderJSON(value);
    }
    /** 获取 HTML */
    getHTML() {
      return getHTML(this.vditor);
    }
    /** 消息提示。time 为 0 将一直显示 */
    tip(text, time) {
      this.vditor.tip.show(text, time);
    }
    /** 设置预览模式 */
    setPreviewMode(mode) {
      setPreviewMode(mode, this.vditor);
    }
    /** 删除选中内容 */
    deleteValue() {
      if (this.vditor.currentMode === "sv") {
        if (this.vditor.sv.element.selectionStart === this.vditor.sv.element.selectionEnd) {
          return;
        }
        processPaste(this.vditor, "");
        processAfterRender2(this.vditor);
        return;
      }
      if (window.getSelection().isCollapsed) {
        return;
      }
      document.execCommand("delete", false);
    }
    /** 更新选中内容 */
    updateValue(value) {
      if (this.vditor.currentMode === "sv") {
        processPaste(this.vditor, value);
        processAfterRender2(this.vditor);
        return;
      }
      document.execCommand("insertHTML", false, value);
    }
    /** 在焦点处插入内容，并默认进行 Markdown 渲染 */
    insertValue(value, render = true) {
      if (this.vditor.currentMode === "sv") {
        processPaste(this.vditor, value);
        if (render) {
          processAfterRender2(this.vditor);
        }
        return;
      }
      const range = getEditorRange(this.vditor);
      range.collapse(true);
      const tmpElement = document.createElement("template");
      tmpElement.innerHTML = value;
      range.insertNode(tmpElement.content.cloneNode(true));
      range.collapse(false);
      if (this.vditor.currentMode === "wysiwyg") {
        if (render) {
          input2(this.vditor, getSelection().getRangeAt(0));
        }
      } else if (this.vditor.currentMode === "ir") {
        this.vditor.ir.preventInput = true;
        if (render) {
          input(this.vditor, getSelection().getRangeAt(0), true);
        }
      }
    }
    /** 在焦点处插入 Markdown */
    insertMD(md) {
      if (this.vditor.currentMode === "ir") {
        insertHTML(this.vditor.lute.Md2VditorIRDOM(md), this.vditor);
      } else if (this.vditor.currentMode === "wysiwyg") {
        insertHTML(this.vditor.lute.Md2VditorDOM(md), this.vditor);
      } else {
        processPaste(this.vditor, md);
      }
      this.vditor.outline.render(this.vditor);
      execAfterRender(this.vditor);
    }
    /** 设置编辑器内容 */
    setValue(markdown, clearStack = false) {
      if (this.vditor.currentMode === "sv") {
        this.vditor.sv.element.value = markdown;
        processAfterRender2(this.vditor, {
          enableAddUndoStack: true,
          enableHint: false,
          enableInput: false
        });
      } else if (this.vditor.currentMode === "wysiwyg") {
        renderDomByMd(this.vditor, markdown, {
          enableAddUndoStack: true,
          enableHint: false,
          enableInput: false
        });
      } else {
        this.vditor.ir.element.innerHTML = this.vditor.lute.Md2VditorIRDOM(markdown);
        this.vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach((item) => {
          processCodeRender(item, this.vditor);
        });
        processAfterRender(this.vditor, {
          enableAddUndoStack: true,
          enableHint: false,
          enableInput: false
        });
      }
      this.vditor.outline.render(this.vditor);
      if (!markdown) {
        hidePanel(this.vditor, ["emoji", "headings", "submenu", "hint"]);
        if (this.vditor.wysiwyg.popover) {
          this.vditor.wysiwyg.popover.style.display = "none";
        }
        this.clearCache();
      }
      if (clearStack) {
        this.clearStack();
      }
    }
    /** 空块 */
    insertEmptyBlock(position) {
      insertEmptyBlock(this.vditor, position);
    }
    /** 清空 undo & redo 栈 */
    clearStack() {
      this.vditor.undo.clearStack(this.vditor);
      this.vditor.undo.addToUndoStack(this.vditor);
    }
    /** 销毁编辑器 */
    destroy() {
      this.vditor.element.innerHTML = this.vditor.originalInnerHTML;
      this.vditor.element.classList.remove("vditor");
      this.vditor.element.removeAttribute("style");
      const iconScript = document.getElementById("vditorIconScript");
      if (iconScript) {
        iconScript.remove();
      }
      this.clearCache();
      UIUnbindListener();
      this.vditor.wysiwyg.unbindListener();
      this.vditor.options.after = void 0;
      this.isDestroyed = true;
    }
    /** 获取评论 ID */
    getCommentIds() {
      if (this.vditor.currentMode !== "wysiwyg") {
        return [];
      }
      return this.vditor.wysiwyg.getComments(this.vditor, true);
    }
    /** 高亮评论 */
    hlCommentIds(ids) {
      if (this.vditor.currentMode !== "wysiwyg") {
        return;
      }
      const hlItem = (item) => {
        item.classList.remove("vditor-comment--hover");
        ids.forEach((id) => {
          if (item.getAttribute("data-cmtids").indexOf(id) > -1) {
            item.classList.add("vditor-comment--hover");
          }
        });
      };
      this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach((item) => {
        hlItem(item);
      });
      if (this.vditor.preview.element.style.display !== "none") {
        this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach((item) => {
          hlItem(item);
        });
      }
    }
    /** 取消评论高亮 */
    unHlCommentIds(ids) {
      if (this.vditor.currentMode !== "wysiwyg") {
        return;
      }
      const unHlItem = (item) => {
        ids.forEach((id) => {
          if (item.getAttribute("data-cmtids").indexOf(id) > -1) {
            item.classList.remove("vditor-comment--hover");
          }
        });
      };
      this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach((item) => {
        unHlItem(item);
      });
      if (this.vditor.preview.element.style.display !== "none") {
        this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach((item) => {
          unHlItem(item);
        });
      }
    }
    /** 删除评论 */
    removeCommentIds(removeIds) {
      if (this.vditor.currentMode !== "wysiwyg") {
        return;
      }
      const removeItem = (item, removeId) => {
        const ids = item.getAttribute("data-cmtids").split(" ");
        ids.find((id, index) => {
          if (id === removeId) {
            ids.splice(index, 1);
            return true;
          }
        });
        if (ids.length === 0) {
          item.outerHTML = item.innerHTML;
          getEditorRange(this.vditor).collapse(true);
        } else {
          item.setAttribute("data-cmtids", ids.join(" "));
        }
      };
      removeIds.forEach((removeId) => {
        this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach((item) => {
          removeItem(item, removeId);
        });
        if (this.vditor.preview.element.style.display !== "none") {
          this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach((item) => {
            removeItem(item, removeId);
          });
        }
      });
      afterRenderEvent(this.vditor, {
        enableAddUndoStack: true,
        enableHint: false,
        enableInput: false
      });
    }
    init(id, mergedOptions) {
      if (this.isDestroyed) {
        return;
      }
      this.vditor = {
        currentMode: mergedOptions.mode,
        element: id,
        hint: new Hint(mergedOptions.hint.extend),
        lute: void 0,
        options: mergedOptions,
        originalInnerHTML: id.innerHTML,
        outline: new Outline(window.VditorI18n.outline),
        tip: new Tip()
      };
      this.vditor.sv = new Editor(this.vditor);
      this.vditor.undo = new Undo2();
      this.vditor.wysiwyg = new WYSIWYG(this.vditor);
      this.vditor.ir = new IR(this.vditor);
      this.vditor.toolbar = new Toolbar(this.vditor);
      if (mergedOptions.resize.enable) {
        this.vditor.resize = new Resize(this.vditor);
      }
      if (this.vditor.toolbar.elements.devtools) {
        this.vditor.devtools = new DevTools();
      }
      if (mergedOptions.upload.url || mergedOptions.upload.handler) {
        this.vditor.upload = new Upload();
      }
      addScript(
        mergedOptions._lutePath || `${mergedOptions.cdn}/dist/js/lute/lute.min.js`,
        "vditorLuteScript"
      ).then(() => {
        this.vditor.lute = setLute({
          autoSpace: this.vditor.options.preview.markdown.autoSpace,
          callout: this.vditor.options.preview.markdown.callout,
          inlineMath: this.vditor.options.preview.markdown.inlineMath,
          gfmAutoLink: this.vditor.options.preview.markdown.gfmAutoLink,
          codeBlockPreview: this.vditor.options.preview.markdown.codeBlockPreview,
          emojiSite: this.vditor.options.hint.emojiPath,
          emojis: this.vditor.options.hint.emoji,
          fixTermTypo: this.vditor.options.preview.markdown.fixTermTypo,
          footnotes: this.vditor.options.preview.markdown.footnotes,
          headingAnchor: false,
          inlineMathDigit: this.vditor.options.preview.math.inlineDigit,
          linkBase: this.vditor.options.preview.markdown.linkBase,
          linkPrefix: this.vditor.options.preview.markdown.linkPrefix,
          listStyle: this.vditor.options.preview.markdown.listStyle,
          mark: this.vditor.options.preview.markdown.mark,
          mathBlockPreview: this.vditor.options.preview.markdown.mathBlockPreview,
          paragraphBeginningSpace: this.vditor.options.preview.markdown.paragraphBeginningSpace,
          sanitize: this.vditor.options.preview.markdown.sanitize,
          sub: this.vditor.options.preview.markdown.sub,
          sup: this.vditor.options.preview.markdown.sup,
          toc: this.vditor.options.preview.markdown.toc
        });
        this.vditor.preview = new Preview(this.vditor);
        initUI(this.vditor);
        if (mergedOptions.after) {
          mergedOptions.after();
        }
        if (mergedOptions.icon) {
          addScriptSync(`${mergedOptions.cdn}/dist/js/icons/${mergedOptions.icon}.js`, "vditorIconScript");
        }
      });
    }
  };
  var src_default = Vditor2;


  // node_modules/@vscode/codicons/src/icons/list-tree.svg
  var list_tree_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M2 3.5C2 3.22386 2.22386 3 2.5 3H13.5C13.7761 3 14 3.22386 14 3.5C14 3.77614 13.7761 4 13.5 4H6V6H13.5C13.7761 6 14 6.22386 14 6.5C14 6.77614 13.7761 7 13.5 7H6V9H13.5C13.7761 9 14 9.22386 14 9.5C14 9.77614 13.7761 10 13.5 10H6V12H13.5C13.7761 12 14 12.2239 14 12.5C14 12.7761 13.7761 13 13.5 13H5.5C5.22386 13 5 12.7761 5 12.5V4H2.5C2.22386 4 2 3.77614 2 3.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/vscode.svg
  var vscode_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M15.434 1.72887L12.14 0.144875C12.002 0.078875 11.855 0.046875 11.709 0.046875C11.353 0.046875 11.18 0.211875 11.155 0.228875C11.073 0.270875 11.005 0.337875 11.004 0.338875L4.698 6.08888L1.951 4.00488C1.832 3.91388 1.69 3.86987 1.548 3.86987C1.387 3.86987 1.226 3.92788 1.1 4.04288L0.219 4.84387C0.074 4.97587 0.001 5.15688 0.001 5.33687C0.001 5.51687 0.073 5.69688 0.218 5.82888L2.6 8.00088L0.217 10.1719C0.072 10.3039 0 10.4839 0 10.6639C0 10.8439 0.073 11.0249 0.218 11.1569L1.099 11.9579C1.226 12.0729 1.386 12.1309 1.547 12.1309C1.688 12.1309 1.83 12.0859 1.95 11.9959L4.697 9.91187L11.003 15.6619C11.003 15.6619 11.072 15.7299 11.155 15.7719C11.179 15.7889 11.353 15.9529 11.709 15.9529C11.855 15.9529 12.003 15.9209 12.141 15.8549L15.435 14.2709C15.781 14.1049 16.001 13.7539 16.001 13.3699V2.62888C16.001 2.24487 15.781 1.89488 15.435 1.72787L15.434 1.72887ZM7.217 7.99988L12.002 4.36987V11.6299L7.217 7.99988Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/save.svg
  var save_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M14.414 3.207L12.793 1.586C12.421 1.213 11.905 1 11.379 1H3C1.897 1 1 1.897 1 3V13C1 14.103 1.897 15 3 15H13C14.103 15 15 14.103 15 13V4.621C15 4.095 14.787 3.579 14.414 3.207ZM9 2V3.5C9 3.776 8.776 4 8.5 4H6.5C6.224 4 6 3.776 6 3.5V2H9ZM5 14V9.5C5 9.224 5.224 9 5.5 9H10.5C10.776 9 11 9.224 11 9.5V14H5ZM14 13C14 13.551 13.551 14 13 14H12V9.5C12 8.673 11.327 8 10.5 8H5.5C4.673 8 4 8.673 4 9.5V14H3C2.449 14 2 13.551 2 13V3C2 2.449 2.449 2 3 2H5V3.5C5 4.327 5.673 5 6.5 5H8.5C9.327 5 10 4.327 10 3.5V2H11.379C11.642 2 11.9 2.107 12.086 2.293L13.707 3.914C13.893 4.1 14 4.358 14 4.621V13Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/text-size.svg
  var text_size_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M10.9699 2.32913C10.8981 2.13153 10.7103 2 10.5 2C10.2898 2 10.102 2.13153 10.0301 2.32913L6.46834 12.124L6.13267 11.3184C6.12991 11.3113 6.12699 11.3043 6.12391 11.2974L4.46155 7.30769C4.38391 7.12137 4.20186 7 4.00001 7C3.79816 7 3.6161 7.12137 3.53847 7.30769L1.8761 11.2974C1.87303 11.3043 1.87011 11.3113 1.86735 11.3184L1.03847 13.3077C0.932261 13.5626 1.0528 13.8553 1.3077 13.9615C1.5626 14.0677 1.85534 13.9472 1.96155 13.6923L2.66667 12H5.33334L6.03776 13.6906C6.03897 13.6935 6.04021 13.6965 6.04148 13.6994C6.06887 13.7624 6.10777 13.817 6.15467 13.8618C6.20148 13.9065 6.25776 13.9428 6.32193 13.9672C6.33406 13.9718 6.34638 13.976 6.35885 13.9797C6.46237 14.0102 6.56886 14.0056 6.66467 13.9721C6.67641 13.968 6.688 13.9635 6.69939 13.9585C6.76233 13.9312 6.81686 13.8924 6.86155 13.8456C6.90638 13.7987 6.94275 13.7423 6.96722 13.6781C6.96834 13.6751 6.96944 13.6722 6.9705 13.6692L8.30477 10H12.6952L14.0301 13.6709C14.1245 13.9304 14.4114 14.0643 14.6709 13.9699C14.9304 13.8755 15.0643 13.5886 14.9699 13.3291L10.9699 2.32913ZM10.5 3.96309L12.3316 9H8.6684L10.5 3.96309ZM4.00001 8.8L4.91668 11H3.08334L4.00001 8.8Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/bold.svg
  var bold_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M4 3.1C4 2.5 4.5 2 5.1 2H8.1C10.2 2 11.5 3.4 11.5 5.4C11.5 6.3 11.2 7.4 10.8 8C11.6 8.6 12.2 9.2 12.2 10.5C12.2 13.2 10.1 14 8.6 14H5.1C4.5 14 4 13.5 4 12.9V3.1ZM6 9V12H8.4C9.1 12 9.9 11.5 9.9 10.5C9.9 9.5 9.1 9 8.4 9H6ZM6 7H8.2C9.1 7 9.7 6.3 9.7 5.5C9.7 4.7 9.1 4 8.3 4H6V7Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/italic.svg
  var italic_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M13 2.00014H7C6.72386 2.00014 6.5 2.22399 6.5 2.50014C6.5 2.77628 6.72386 3.00014 7 3.00014H9.47388L5.65575 13L3 13.0001C2.72386 13.0001 2.5 13.224 2.5 13.5001C2.5 13.7763 2.72386 14.0001 3 14.0001H5.98833C5.99606 14.0003 6.00378 14.0003 6.01148 14.0001H9C9.27614 14.0001 9.5 13.7763 9.5 13.5001C9.5 13.224 9.27614 13.0001 9 13.0001L6.72617 13L10.5443 3.00014H13C13.2761 3.00014 13.5 2.77628 13.5 2.50014C13.5 2.22399 13.2761 2.00014 13 2.00014Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/strikethrough.svg
  var strikethrough_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M5 5.1C5 4.5456 5.29153 4.03507 5.83988 3.6449C6.39218 3.25191 7.18666 3 8.1 3C9.39792 3 10.4839 3.56064 10.8629 4.24282C10.997 4.48421 11.3014 4.57119 11.5428 4.43708C11.7842 4.30297 11.8712 3.99857 11.7371 3.75718C11.1161 2.63936 9.60209 2 8.1 2C7.01334 2 6.00782 2.29809 5.26012 2.8301C4.50847 3.36493 4 4.1544 4 5.1C4 5.8196 4.30015 6.47451 4.78915 7H6.51156C5.55248 6.59331 5 5.83014 5 5.1ZM13.5 8C13.7761 8 14 8.22386 14 8.5C14 8.77614 13.7761 9 13.5 9H11.1582C11.6751 9.50409 12 10.1489 12 10.9C12 11.8018 11.4854 12.5876 10.745 13.1287C10.0019 13.6717 8.99641 14 7.9 14C6.27633 14 4.89849 13.3491 4.18397 12.2774C4.0308 12.0476 4.09289 11.7372 4.32265 11.584C4.55241 11.4308 4.86285 11.4929 5.01603 11.7226C5.50151 12.4509 6.52367 13 7.9 13C8.80359 13 9.5981 12.7283 10.155 12.3213C10.7146 11.9124 11 11.3982 11 10.9C11 10.1248 10.3695 9.37447 9.22269 9H2.5C2.22386 9 2 8.77614 2 8.5C2 8.22386 2.22386 8 2.5 8H13.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/link.svg
  var link_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M9.49999 4H10.5C12.433 4 14 5.567 14 7.5C14 9.36856 12.5357 10.8951 10.6941 10.9948L10.5023 11L9.5023 11.0046C9.22616 11.0059 9.00127 10.783 8.99999 10.5069C8.99888 10.2614 9.17481 10.0565 9.40787 10.0131L9.4977 10.0046L10.5 10C11.8807 10 13 8.88071 13 7.5C13 6.17452 11.9685 5.08996 10.6644 5.00532L10.5 5H9.49999C9.22386 5 8.99999 4.77614 8.99999 4.5C8.99999 4.25454 9.17687 4.05039 9.41012 4.00806L9.49999 4H10.5H9.49999ZM5.5 4H6.5C6.77614 4 7 4.22386 7 4.5C7 4.74546 6.82312 4.94961 6.58988 4.99194L6.5 5H5.5C4.11929 5 3 6.11929 3 7.5C3 8.82548 4.03154 9.91004 5.33562 9.99468L5.5 10H6.5C6.77614 10 7 10.2239 7 10.5C7 10.7455 6.82312 10.9496 6.58988 10.9919L6.5 11H5.5C3.567 11 2 9.433 2 7.5C2 5.63144 3.46428 4.10487 5.30796 4.00518L5.5 4H6.5H5.5ZM5.50023 7L10.5002 7.0023C10.7764 7.00242 11.0001 7.22638 11 7.50252C10.9999 7.74798 10.8229 7.95205 10.5897 7.99428L10.4998 8.0023L5.49977 8C5.22363 7.99987 4.99987 7.77591 5 7.49977C5.00011 7.25431 5.17708 7.05024 5.41035 7.00801L5.50023 7Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/symbol-color.svg
  var symbol_color_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8.00101 1C4.13401 1 1.00101 3.8 1.00101 7.667C1.00101 8.956 2.04501 10 3.33401 10C4.75101 10 4.72101 9 6.00001 9C6.64401 9 7.00001 9.606 7.00001 10.25V11.5C7.00001 13.433 8.56701 15 10.5 15C13.653 15 14.999 11.215 14.999 8C14.999 4.134 11.866 1 8.00001 1H8.00101ZM10.5 14C9.12201 14 8.00001 12.878 8.00001 11.5V10.25C8.00001 8.967 7.14001 8 6.00001 8C5.04001 8 4.49801 8.412 4.13901 8.685C3.85401 8.902 3.72401 9 3.33401 9C2.59901 9 2.00101 8.402 2.00101 7.667C2.00101 4.436 4.58001 2 8.00101 2C11.309 2 14 4.692 14 8C14 10.412 13.068 14 10.501 14H10.5ZM12 11C12 11.552 11.552 12 11 12C10.448 12 10 11.552 10 11C10 10.448 10.448 10 11 10C11.552 10 12 10.448 12 11ZM13 8C13 8.552 12.552 9 12 9C11.448 9 11 8.552 11 8C11 7.448 11.448 7 12 7C12.552 7 13 7.448 13 8ZM6.00001 5C6.00001 5.552 5.55201 6 5.00001 6C4.44801 6 4.00001 5.552 4.00001 5C4.00001 4.448 4.44801 4 5.00001 4C5.55201 4 6.00001 4.448 6.00001 5ZM10 5C10 4.448 10.448 4 11 4C11.552 4 12 4.448 12 5C12 5.552 11.552 6 11 6C10.448 6 10 5.552 10 5ZM9.00001 4C9.00001 4.552 8.55201 5 8.00001 5C7.44801 5 7.00001 4.552 7.00001 4C7.00001 3.448 7.44801 3 8.00001 3C8.55201 3 9.00001 3.448 9.00001 4Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/paintcan.svg
  var paintcan_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.49998 1C7.77613 1 7.99998 1.22386 7.99998 1.5V2.42763C8.15702 2.4998 8.30415 2.60053 8.43355 2.72983L12.1458 6.43921C12.7319 7.02493 12.7321 7.97499 12.1462 8.56093L7.0781 13.629C6.48218 14.2249 5.51243 14.2131 4.93123 13.6028L1.31095 9.80152C0.749447 9.21194 0.760786 8.28209 1.3365 7.70638L6.31263 2.73023C6.50977 2.53309 6.74814 2.4023 6.99998 2.33785V1.5C6.99998 1.22386 7.22384 1 7.49998 1ZM6.99998 4.5V3.4571L2.45709 8H11.2929L11.4391 7.85383C11.6344 7.65851 11.6343 7.34182 11.4389 7.14658L7.99998 3.71027V4.5C7.99998 4.77614 7.77613 5 7.49998 5C7.22384 5 6.99998 4.77614 6.99998 4.5ZM1.95461 9C1.97565 9.03992 2.00247 9.07761 2.03509 9.11187L5.65537 12.9132C5.8491 13.1166 6.17235 13.1205 6.37099 12.9219L10.2929 9H1.95461ZM12.9211 10.222C12.6981 9.96719 12.3018 9.96719 12.0789 10.222L10.9285 11.5367C9.74705 12.8869 10.7059 15 12.5 15C14.2941 15 15.2529 12.8869 14.0715 11.5367L12.9211 10.222ZM11.681 12.1952L12.5 11.2593L13.3189 12.1952C13.9346 12.8989 13.4349 14 12.5 14C11.5651 14 11.0654 12.8989 11.681 12.1952Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/export.svg
  var export_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M1.5 2.99976C1.776 2.99976 2 3.22376 2 3.49976V11.4998C2 11.7758 1.776 11.9998 1.5 11.9998C1.224 11.9998 1 11.7758 1 11.4998V3.49976C1 3.22376 1.224 2.99976 1.5 2.99976ZM10.146 3.14576C10.341 2.95076 10.658 2.95076 10.853 3.14576L14.853 7.14576C15.048 7.34076 15.048 7.65776 14.853 7.85276L10.853 11.8528C10.658 12.0478 10.341 12.0478 10.146 11.8528C9.951 11.6578 9.951 11.3408 10.146 11.1458L13.293 7.99976H4.5C4.224 7.99976 4 7.77576 4 7.49976C4 7.22376 4.224 6.99976 4.5 6.99976H13.293L10.147 3.85376C9.952 3.65876 9.952 3.34176 10.147 3.14676L10.146 3.14576Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/color-mode.svg
  var color_mode_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8 1.00195C6.61553 1.00195 5.26216 1.4125 4.11101 2.18167C2.95987 2.95084 2.06266 4.04409 1.53285 5.32317C1.00303 6.60225 0.86441 8.00972 1.13451 9.36759C1.4046 10.7255 2.07129 11.9727 3.05026 12.9517C4.02922 13.9307 5.27651 14.5974 6.63437 14.8675C7.99224 15.1375 9.3997 14.9989 10.6788 14.4691C11.9579 13.9393 13.0511 13.0421 13.8203 11.8909C14.5895 10.7398 15 9.38642 15 8.00195C15 6.14544 14.2625 4.36496 12.9498 3.05221C11.637 1.73945 9.85652 1.00195 8 1.00195ZM8 14.002V2.00195C9.5913 2.00195 11.1174 2.63409 12.2426 3.75931C13.3679 4.88453 14 6.41065 14 8.00195C14 9.59325 13.3679 11.1194 12.2426 12.2446C11.1174 13.3698 9.5913 14.002 8 14.002Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/lightbulb.svg
  var lightbulb_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8 1C5.419 1 2.75 2.964 2.75 6.25C2.75 8.167 3.637 9.184 4.224 9.856C4.408 10.067 4.598 10.285 4.628 10.398L5.568 13.889C5.744 14.543 6.34 14.999 7.017 14.999H8.984C9.662 14.999 10.257 14.542 10.432 13.889L11.372 10.397C11.402 10.285 11.593 10.067 11.776 9.856C12.363 9.183 13.25 8.167 13.25 6.25C13.25 3.355 10.895 1 8 1ZM9.467 13.63C9.408 13.848 9.209 14 8.984 14H7.017C6.791 14 6.593 13.848 6.534 13.63L6.095 12H9.906L9.467 13.63ZM11.022 9.199C10.741 9.522 10.497 9.802 10.407 10.137L10.175 10.999H5.826L5.594 10.138C5.503 9.801 5.26 9.522 4.977 9.199C4.43 8.572 3.75 7.792 3.75 6.25C3.75 3.59 5.911 2 8 2C10.344 2 12.25 3.907 12.25 6.25C12.25 7.792 11.569 8.572 11.022 9.199Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/list-unordered.svg
  var list_unordered_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M2 4.5C2.55228 4.5 3 4.05228 3 3.5C3 2.94772 2.55228 2.5 2 2.5C1.44772 2.5 1 2.94772 1 3.5C1 4.05228 1.44772 4.5 2 4.5ZM2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7C1.44772 7 1 7.44772 1 8C1 8.55228 1.44772 9 2 9ZM3 12.5C3 13.0523 2.55228 13.5 2 13.5C1.44772 13.5 1 13.0523 1 12.5C1 11.9477 1.44772 11.5 2 11.5C2.55228 11.5 3 11.9477 3 12.5ZM5.5 3C5.22386 3 5 3.22386 5 3.5C5 3.77614 5.22386 4 5.5 4H14.5C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3H5.5ZM5 8C5 7.72386 5.22386 7.5 5.5 7.5H14.5C14.7761 7.5 15 7.72386 15 8C15 8.27614 14.7761 8.5 14.5 8.5H5.5C5.22386 8.5 5 8.27614 5 8ZM5.5 12C5.22386 12 5 12.2239 5 12.5C5 12.7761 5.22386 13 5.5 13H14.5C14.7761 13 15 12.7761 15 12.5C15 12.2239 14.7761 12 14.5 12H5.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/list-ordered.svg
  var list_ordered_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M3.68423 1.01091C3.87729 1.05479 4.01368 1.2207 4.01368 1.41166V4.70581C4.01368 4.93322 3.82219 5.11757 3.58596 5.11757C3.34974 5.11757 3.15825 4.93322 3.15825 4.70581V2.57963C2.97169 2.73831 2.75056 2.89181 2.49409 3.01526C2.28281 3.11697 2.02589 3.03452 1.92025 2.83112C1.81461 2.62771 1.90025 2.38037 2.11153 2.27867C2.46535 2.10836 2.74051 1.84713 2.93118 1.61767C3.02531 1.50441 3.09555 1.40286 3.1415 1.33097C3.1627 1.2978 3.18339 1.26423 3.20219 1.22973C3.29453 1.06158 3.48853 0.966435 3.68423 1.01091ZM2.15471 7.05586C1.98767 6.89507 1.98765 6.63435 2.15467 6.47354L2.15572 6.47253L2.15693 6.47137L2.15988 6.46859L2.16776 6.46129C2.17391 6.45568 2.18184 6.44859 2.19152 6.44025C2.21087 6.42357 2.23731 6.40176 2.27057 6.3766C2.33688 6.32642 2.43152 6.26193 2.55214 6.19802C2.79299 6.07042 3.1454 5.94109 3.58393 5.94111L3.59112 5.94117C3.91125 5.94637 4.25871 6.0263 4.53792 6.22535C4.83289 6.43563 5.02344 6.76107 5.02344 7.17649C5.02344 7.62757 4.81618 7.94311 4.53538 8.16839C4.32073 8.34059 4.04529 8.47067 3.82121 8.5765C3.78525 8.59348 3.7506 8.60985 3.7177 8.62568C3.45144 8.75385 3.24954 8.86678 3.10777 9.01691C3.05092 9.07712 2.99998 9.14746 2.96119 9.23535H4.59572C4.83194 9.23535 5.02344 9.4197 5.02344 9.64712C5.02344 9.87453 4.83146 10.0589 4.59524 10.0589H2.45713C2.22091 10.0589 2.02941 9.87453 2.02941 9.64712C2.02941 9.13717 2.19981 8.75415 2.4748 8.46294C2.73402 8.18843 3.06676 8.01827 3.33515 7.88909C3.37811 7.86841 3.41971 7.84859 3.45892 7.8299C3.69012 7.71973 3.85827 7.6396 3.98775 7.53573C4.10794 7.4393 4.168 7.34307 4.168 7.17649C4.168 7.02774 4.11074 6.94556 4.02884 6.88718C3.93179 6.81799 3.77468 6.76838 3.58027 6.76465C3.3214 6.76534 3.1117 6.84157 2.9646 6.91951C2.89091 6.95855 2.83494 6.99702 2.7992 7.02406C2.78144 7.0375 2.76901 7.04787 2.76223 7.05372L2.7566 7.05867C2.58935 7.21663 2.32076 7.2157 2.15471 7.05586ZM3.09366 12.9412C3.09366 12.7137 3.28516 12.5294 3.52138 12.5294C3.81461 12.5294 3.97666 12.4498 4.05829 12.3786C4.13892 12.3083 4.17203 12.221 4.1686 12.1331C4.1624 11.9737 4.00959 11.7059 3.52138 11.7059C3.16851 11.7059 2.98575 11.7896 2.9032 11.8426C2.85995 11.8703 2.8367 11.8944 2.82745 11.9051L2.82395 11.9093C2.82756 11.9032 2.83103 11.8969 2.83435 11.8906L2.83348 11.8922L2.83236 11.8943L2.83029 11.8981L2.82682 11.9042C2.82481 11.9077 2.82222 11.9116 2.82222 11.9116L2.82395 11.9093C2.71246 12.0985 2.46527 12.1726 2.2608 12.0742C2.04952 11.9725 1.96388 11.7251 2.06952 11.5217L2.07013 11.5205L2.07077 11.5193L2.07213 11.5168L2.07516 11.5112L2.08257 11.4982C2.08813 11.4888 2.09495 11.4778 2.10316 11.4655C2.11958 11.4409 2.14161 11.411 2.17029 11.3779C2.22786 11.3114 2.31154 11.2325 2.42869 11.1574C2.66693 11.0045 3.01882 10.8823 3.52138 10.8823C4.40187 10.8823 4.99757 11.438 5.02344 12.1022C5.03523 12.4048 4.92247 12.7081 4.68433 12.9412C4.92247 13.1743 5.03523 13.4775 5.02344 13.7801C4.99757 14.4443 4.40187 15 3.52138 15C3.01882 15 2.66693 14.8779 2.42869 14.725C2.31154 14.6498 2.22786 14.5709 2.17029 14.5044C2.14161 14.4713 2.11958 14.4414 2.10316 14.4168C2.09495 14.4045 2.08813 14.3935 2.08257 14.3841L2.07516 14.3711L2.07213 14.3655L2.07077 14.363L2.07013 14.3618L2.06952 14.3606C1.96388 14.1572 2.04952 13.9099 2.2608 13.8082C2.46527 13.7098 2.71246 13.7838 2.82395 13.973L2.82745 13.9772C2.8367 13.9879 2.85995 14.012 2.9032 14.0397C2.98575 14.0927 3.16851 14.1765 3.52138 14.1765C4.00959 14.1765 4.1624 13.9086 4.1686 13.7493C4.17203 13.6613 4.13892 13.574 4.05829 13.5037C3.97666 13.4325 3.81461 13.3529 3.52138 13.3529C3.28516 13.3529 3.09366 13.1686 3.09366 12.9412ZM7.5 3C7.22386 3 7 3.22386 7 3.5C7 3.77614 7.22386 4 7.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H7.5ZM7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H7.5ZM7.5 11C7.22386 11 7 11.2239 7 11.5C7 11.7761 7.22386 12 7.5 12H13.5C13.7761 12 14 11.7761 14 11.5C14 11.2239 13.7761 11 13.5 11H7.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/checklist.svg
  var checklist_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M4.85401 2.146C5.04901 2.341 5.04901 2.658 4.85401 2.853L2.85401 4.853C2.65901 5.048 2.34201 5.048 2.14701 4.853L1.14701 3.853C0.952013 3.658 0.952013 3.341 1.14701 3.146C1.34201 2.951 1.65901 2.951 1.85401 3.146L2.50001 3.792L4.14601 2.146C4.34101 1.951 4.65901 1.951 4.85401 2.146ZM14.5 4H6.50001C6.22401 4 6.00001 3.776 6.00001 3.5C6.00001 3.224 6.22401 3 6.50001 3H14.5C14.776 3 15 3.224 15 3.5C15 3.776 14.776 4 14.5 4ZM4.85401 11.146C5.04901 11.341 5.04901 11.658 4.85401 11.853L2.85401 13.853C2.65901 14.048 2.34201 14.048 2.14701 13.853L1.14701 12.853C0.952013 12.658 0.952013 12.341 1.14701 12.146C1.34201 11.951 1.65901 11.951 1.85401 12.146L2.50001 12.792L4.14601 11.146C4.34101 10.951 4.65901 10.951 4.85401 11.146ZM14.5 13H6.50001C6.22401 13 6.00001 12.776 6.00001 12.5C6.00001 12.224 6.22401 12 6.50001 12H14.5C14.776 12 15 12.224 15 12.5C15 12.776 14.776 13 14.5 13ZM4.85401 6.646C5.04901 6.841 5.04901 7.158 4.85401 7.353L2.85401 9.353C2.65901 9.548 2.34201 9.548 2.14701 9.353L1.14701 8.353C0.952013 8.158 0.952013 7.841 1.14701 7.646C1.34201 7.451 1.65901 7.451 1.85401 7.646L2.50001 8.292L4.14601 6.646C4.34101 6.451 4.65901 6.451 4.85401 6.646ZM14.5 8.5H6.50001C6.22401 8.5 6.00001 8.276 6.00001 8C6.00001 7.724 6.22401 7.5 6.50001 7.5H14.5C14.776 7.5 15 7.724 15 8C15 8.276 14.776 8.5 14.5 8.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/table.svg
  var table_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M1 3.5C1 2.11929 2.11929 1 3.5 1H12.5C13.8807 1 15 2.11929 15 3.5V12.5C15 13.8807 13.8807 15 12.5 15H3.5C2.11929 15 1 13.8807 1 12.5V3.5ZM6 14H10V11L6 11V14ZM5 11H2V12.5C2 13.3284 2.67157 14 3.5 14H5V11ZM6 10L10 10V6L6 6V10ZM5 6H2V10H5V6ZM6 5L10 5V2H6V5ZM5 2H3.5C2.67157 2 2 2.67157 2 3.5V5H5V2ZM14 6H11V10H14V6ZM14 11H11V14H12.5C13.3284 14 14 13.3284 14 12.5V11ZM14 5V3.5C14 2.67157 13.3284 2 12.5 2H11V5H14Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/quote.svg
  var quote_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M5.99902 2.99902C6.55101 2.99904 6.99902 3.44703 6.99902 3.99902V4.99902C6.99902 7.59102 6.47153 9.73354 4.35254 11.8525C4.15754 12.0475 3.84148 12.0475 3.64648 11.8525C3.45148 11.6575 3.45148 11.3415 3.64648 11.1465C5.03348 9.76049 5.65377 8.38594 5.88477 6.79395C5.61781 6.9259 5.31794 7 5 7H4C3.448 7 3 6.552 3 6V4C3.00001 3.44801 3.44801 3 4 3H6L5.99902 2.99902Z"/><path d="M11.999 2.99902C12.551 2.99904 12.999 3.44703 12.999 3.99902V4.99902C12.999 7.59102 12.4715 9.73354 10.3525 11.8525C10.1575 12.0475 9.84148 12.0475 9.64648 11.8525C9.45148 11.6575 9.45148 11.3415 9.64648 11.1465C11.0335 9.76049 11.6538 8.38594 11.8848 6.79395C11.6178 6.9259 11.3179 7 11 7H10C9.448 7 9 6.552 9 6V4C9.00001 3.44801 9.44801 3 10 3H12L11.999 2.99902Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/code.svg
  var code_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M9.80307 3.0431C10.0554 3.15525 10.1691 3.45073 10.0569 3.70307L6.05691 12.7031C5.94475 12.9554 5.64927 13.0691 5.39693 12.9569C5.14459 12.8448 5.03094 12.5493 5.14309 12.2969L9.14309 3.29693C9.25525 3.04459 9.55073 2.93094 9.80307 3.0431ZM4.33218 5.3763C4.53857 5.55976 4.55716 5.87579 4.3737 6.08218L2.66898 8L4.3737 9.91782C4.55716 10.1242 4.53857 10.4402 4.33218 10.6237C4.12579 10.8072 3.80975 10.7886 3.6263 10.5822L1.6263 8.33218C1.4579 8.14274 1.4579 7.85726 1.6263 7.66782L3.6263 5.41782C3.80975 5.21143 4.12579 5.19284 4.33218 5.3763ZM11.6678 5.3763C11.8742 5.19284 12.1902 5.21143 12.3737 5.41782L14.3737 7.66782C14.5421 7.85726 14.5421 8.14274 14.3737 8.33218L12.3737 10.5822C12.1902 10.7886 11.8742 10.8072 11.6678 10.6237C11.4614 10.4402 11.4428 10.1242 11.6263 9.91782L13.331 8L11.6263 6.08218C11.4428 5.87579 11.4614 5.55976 11.6678 5.3763Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/discard.svg
  var discard_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M3.00098 2.5C3.00098 2.22386 3.22483 2 3.50098 2C3.77712 2 4.00098 2.22386 4.00098 2.5V6.34262L7.17202 3.17157C8.73412 1.60948 11.2668 1.60948 12.8289 3.17157C14.391 4.73367 14.391 7.26633 12.8289 8.82843L7.80375 13.8536C7.60849 14.0488 7.2919 14.0488 7.09664 13.8536C6.90138 13.6583 6.90138 13.3417 7.09664 13.1464L12.1218 8.12132C13.2933 6.94975 13.2933 5.05025 12.1218 3.87868C10.9502 2.70711 9.0507 2.70711 7.87913 3.87868L4.75781 7H8.50098C8.77712 7 9.00098 7.22386 9.00098 7.5C9.00098 7.77614 8.77712 8 8.50098 8H3.60098C3.26961 8 3.00098 7.73137 3.00098 7.4V2.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/redo.svg
  var redo_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M13.0004 2.5C13.0004 2.22386 12.7766 2 12.5004 2C12.2243 2 12.0004 2.22386 12.0004 2.5V6.34262L8.8294 3.17157C7.26731 1.60948 4.73465 1.60948 3.17255 3.17157C1.61045 4.73367 1.61045 7.26633 3.17255 8.82843L8.19768 13.8536C8.39294 14.0488 8.70952 14.0488 8.90478 13.8536C9.10004 13.6583 9.10004 13.3417 8.90478 13.1464L3.87966 8.12132C2.70808 6.94975 2.70808 5.05025 3.87966 3.87868C5.05123 2.70711 6.95072 2.70711 8.1223 3.87868L11.2436 7H7.50045C7.22431 7 7.00045 7.22386 7.00045 7.5C7.00045 7.77614 7.22431 8 7.50045 8H12.4004C12.7318 8 13.0004 7.73137 13.0004 7.4V2.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/search.svg
  var search_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M10.0195 10.7266C9.06578 11.5217 7.83875 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5C12 7.83875 11.5217 9.06578 10.7266 10.0195L13.8535 13.1464C14.0488 13.3417 14.0488 13.6583 13.8535 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L10.0195 10.7266ZM11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11C8.98528 11 11 8.98528 11 6.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/record-keys.svg
  var record_keys_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M3 10.5C3 10.2239 3.22386 10 3.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H3.5C3.22386 11 3 10.7761 3 10.5ZM3.25 7C3.66421 7 4 6.66421 4 6.25C4 5.83579 3.66421 5.5 3.25 5.5C2.83579 5.5 2.5 5.83579 2.5 6.25C2.5 6.66421 2.83579 7 3.25 7ZM10 6.25C10 6.66421 9.66421 7 9.25 7C8.83579 7 8.5 6.66421 8.5 6.25C8.5 5.83579 8.83579 5.5 9.25 5.5C9.66421 5.5 10 5.83579 10 6.25ZM6.25 7C6.66421 7 7 6.66421 7 6.25C7 5.83579 6.66421 5.5 6.25 5.5C5.83579 5.5 5.5 5.83579 5.5 6.25C5.5 6.66421 5.83579 7 6.25 7ZM13 6.25C13 6.66421 12.6642 7 12.25 7C11.8358 7 11.5 6.66421 11.5 6.25C11.5 5.83579 11.8358 5.5 12.25 5.5C12.6642 5.5 13 5.83579 13 6.25ZM5.25 9C5.66421 9 6 8.66421 6 8.25C6 7.83579 5.66421 7.5 5.25 7.5C4.83579 7.5 4.5 7.83579 4.5 8.25C4.5 8.66421 4.83579 9 5.25 9ZM9 8.25C9 8.66421 8.66421 9 8.25 9C7.83579 9 7.5 8.66421 7.5 8.25C7.5 7.83579 7.83579 7.5 8.25 7.5C8.66421 7.5 9 7.83579 9 8.25ZM11.25 9C11.6642 9 12 8.66421 12 8.25C12 7.83579 11.6642 7.5 11.25 7.5C10.8358 7.5 10.5 7.83579 10.5 8.25C10.5 8.66421 10.8358 9 11.25 9ZM1 4.75C1 3.7835 1.7835 3 2.75 3H13.25C14.2165 3 15 3.7835 15 4.75V11.25C15 12.2165 14.2165 13 13.25 13H2.75C1.7835 13 1 12.2165 1 11.25V4.75ZM2.75 4C2.33579 4 2 4.33579 2 4.75V11.25C2 11.6642 2.33579 12 2.75 12H13.25C13.6642 12 14 11.6642 14 11.25V4.75C14 4.33579 13.6642 4 13.25 4H2.75Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/settings-gear.svg
  var settings_gear_default = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 9C10.3425 9 9.00002 10.3425 9.00002 12C9.00002 13.6575 10.3425 15 12 15C13.6575 15 15 13.6575 15 12C15 10.3425 13.6575 9 12 9ZM12 13.5C11.172 13.5 10.5 12.828 10.5 12C10.5 11.172 11.172 10.5 12 10.5C12.828 10.5 13.5 11.172 13.5 12C13.5 12.828 12.828 13.5 12 13.5ZM21.8475 14.5725L19.9185 12.942C19.8675 12.8985 19.8195 12.8505 19.776 12.7995C19.332 12.279 19.3965 11.5005 19.9185 11.058L21.8475 9.4275C22.0395 9.2655 22.113 9.0045 22.0365 8.766C21.579 7.3545 20.823 6.06 19.8285 4.962C19.7085 4.83 19.5405 4.758 19.368 4.758C19.2975 4.758 19.227 4.77 19.1595 4.794L16.779 5.6415C16.716 5.664 16.65 5.682 16.584 5.694C16.509 5.7075 16.434 5.715 16.3605 5.715C15.7725 5.715 15.2505 5.298 15.141 4.701L14.6865 2.223C14.6415 1.977 14.451 1.782 14.205 1.7295C13.485 1.5765 12.7485 1.5 12.0015 1.5C11.2545 1.5 10.5165 1.578 9.79652 1.7295C9.55052 1.782 9.36002 1.977 9.31502 2.223L8.86202 4.701C8.85002 4.767 8.83202 4.8315 8.80952 4.8945C8.62802 5.4 8.15102 5.715 7.64102 5.715C7.50302 5.715 7.36202 5.691 7.22402 5.643L4.84352 4.7955C4.77602 4.7715 4.70402 4.7595 4.63502 4.7595C4.46252 4.7595 4.29452 4.8315 4.17452 4.9635C3.17852 6.0615 2.42402 7.356 1.96502 8.7675C1.88702 9.006 1.96202 9.267 2.15402 9.429L4.08302 11.0595C4.13402 11.103 4.18202 11.151 4.22552 11.202C4.66952 11.7225 4.60502 12.501 4.08302 12.9435L2.15402 14.574C1.96202 14.736 1.88852 14.997 1.96502 15.2355C2.42252 16.647 3.17852 17.9415 4.17452 19.0395C4.29452 19.1715 4.46252 19.2435 4.63502 19.2435C4.70552 19.2435 4.77602 19.2315 4.84352 19.2075L7.22402 18.36C7.28702 18.3375 7.35302 18.3195 7.41902 18.3075C7.49402 18.294 7.56902 18.288 7.64252 18.288C8.23052 18.288 8.75252 18.705 8.86202 19.302L9.31502 21.78C9.36002 22.026 9.55052 22.221 9.79652 22.2735C10.5165 22.4265 11.2545 22.503 12.0015 22.503C12.7485 22.503 13.4865 22.425 14.205 22.2735C14.451 22.221 14.6415 22.026 14.6865 21.78L15.141 19.302C15.153 19.236 15.171 19.1715 15.1935 19.1085C15.375 18.603 15.852 18.288 16.362 18.288C16.5 18.288 16.641 18.312 16.779 18.36L19.158 19.2075C19.227 19.2315 19.2975 19.2435 19.3665 19.2435C19.539 19.2435 19.707 19.1715 19.827 19.0395C20.823 17.9415 21.5775 16.647 22.035 15.2355C22.113 14.997 22.038 14.736 21.846 14.574L21.8475 14.5725ZM19.092 17.589L17.2815 16.944C16.9845 16.839 16.6755 16.785 16.362 16.785C15.2085 16.785 14.1705 17.514 13.782 18.5985C13.731 18.738 13.6935 18.882 13.6665 19.029L13.3215 20.9055C12.8865 20.9685 12.444 21 12.0015 21C11.559 21 11.1165 20.9685 10.68 20.904L10.3365 19.0275C10.098 17.727 8.96552 16.7835 7.64252 16.7835C7.48052 16.7835 7.31552 16.7985 7.14902 16.8285C7.00352 16.8555 6.86102 16.893 6.72002 16.9425L4.90952 17.5875C4.35752 16.896 3.91652 16.1385 3.59102 15.321L5.05202 14.0865C5.61152 13.614 5.95202 12.951 6.01202 12.222C6.07202 11.493 5.84252 10.785 5.36702 10.227C5.27102 10.1145 5.16452 10.008 5.05202 9.912L3.59102 8.6775C3.91652 7.86 4.35752 7.101 4.90952 6.411L6.72002 7.056C7.01702 7.161 7.32602 7.215 7.64102 7.215C8.79452 7.215 9.83252 6.486 10.221 5.4015C10.272 5.2605 10.3095 5.1165 10.3365 4.971L10.68 3.0945C11.1165 3.0315 11.559 2.9985 12.0015 2.9985C12.444 2.9985 12.8865 3.03 13.3215 3.093L13.665 4.9695C13.9035 6.27 15.036 7.2135 16.359 7.2135C16.521 7.2135 16.686 7.1985 16.851 7.1685C16.9965 7.1415 17.1405 7.104 17.2815 7.0545L19.092 6.4095C19.644 7.0995 20.085 7.8585 20.4105 8.676L18.951 9.9105C18.3915 10.383 18.0495 11.046 17.991 11.775C17.931 12.504 18.1605 13.2135 18.636 13.77C18.7335 13.884 18.8385 13.989 18.9525 14.085L20.4135 15.3195C20.088 16.137 19.647 16.896 19.095 17.586L19.092 17.589Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/copy.svg
  var copy_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M3 5V12.73C2.4 12.38 2 11.74 2 11V5C2 2.79 3.79 1 6 1H9C9.74 1 10.38 1.4 10.73 2H6C4.35 2 3 3.35 3 5ZM11 15H6C4.897 15 4 14.103 4 13V5C4 3.897 4.897 3 6 3H11C12.103 3 13 3.897 13 5V13C13 14.103 12.103 15 11 15ZM12 5C12 4.448 11.552 4 11 4H6C5.448 4 5 4.448 5 5V13C5 13.552 5.448 14 6 14H11C11.552 14 12 13.552 12 13V5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/clippy.svg
  var clippy_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.08535 2.00049C5.29127 1.41789 5.84689 1.00049 6.5 1.00049H9.5C10.1531 1.00049 10.7087 1.41789 10.9146 2.00049H11.5C12.3284 2.00049 13 2.67206 13 3.50049V8.10026C12.919 8.12889 12.8402 8.16457 12.7646 8.20715C12.4603 8.37833 12.2253 8.65027 12.1 8.97611L12 8.87618V3.50049C12 3.22435 11.7761 3.00049 11.5 3.00049H10.9146C10.7087 3.58308 10.1531 4.00049 9.5 4.00049H6.5C5.84689 4.00049 5.29127 3.58308 5.08535 3.00049H4.5C4.22386 3.00049 4 3.22435 4 3.50049V13.5005C4 13.7766 4.22386 14.0005 4.5 14.0005H8V14.5001C8.00164 14.6722 8.03284 14.8413 8.09101 15.0005H4.5C3.67157 15.0005 3 14.3289 3 13.5005V3.50049C3 2.67206 3.67157 2.00049 4.5 2.00049H5.08535ZM6.5 2.00049C6.22386 2.00049 6 2.22435 6 2.50049C6 2.77663 6.22386 3.00049 6.5 3.00049H9.5C9.77614 3.00049 10 2.77663 10 2.50049C10 2.22435 9.77614 2.00049 9.5 2.00049H6.5Z"/><path d="M11.916 10.7783C11.971 10.6959 12.0002 10.599 12 10.5C11.9998 10.4345 11.9869 10.3696 11.962 10.309C11.937 10.2484 11.9003 10.1934 11.854 10.147L9.85401 8.147C9.80801 8.09999 9.75288 8.0629 9.69201 8.038C9.63109 8.01296 9.56587 8.00005 9.50001 8C9.36766 8.00003 9.24071 8.05253 9.14701 8.146L7.14701 10.146C7.10043 10.1924 7.06346 10.2476 7.03824 10.3084C7.01301 10.3691 7.00002 10.4342 7.00001 10.5C6.99943 10.5993 7.02844 10.6965 7.08334 10.7793C7.13824 10.8621 7.21655 10.9266 7.30827 10.9647C7.39999 11.0028 7.50098 11.0127 7.59835 10.9931C7.69572 10.9736 7.78507 10.9255 7.85501 10.855L9.00001 9.708L9.00001 14.5C9.00001 14.6326 9.05269 14.7598 9.14645 14.8536C9.24022 14.9473 9.3674 15 9.50001 15C9.63262 15 9.75979 14.9473 9.85356 14.8536C9.94733 14.7598 10 14.6326 10 14.5L10 9.708L11.146 10.854C11.2159 10.9241 11.3051 10.9719 11.4022 10.9912C11.4993 11.0106 11.6 11.0007 11.6915 10.9628C11.7829 10.9249 11.8611 10.8606 11.916 10.7783Z"/><path d="M11.084 13.2217C11.0291 13.3041 10.9998 13.401 11 13.5C11.0002 13.5655 11.0131 13.6304 11.038 13.691C11.063 13.7516 11.0997 13.8066 11.146 13.853L13.146 15.853C13.192 15.9 13.2471 15.9371 13.308 15.962C13.3689 15.987 13.4341 16 13.5 16C13.6324 16 13.7593 15.9475 13.853 15.854L15.853 13.854C15.8996 13.8076 15.9365 13.7524 15.9618 13.6916C15.987 13.6309 16 13.5658 16 13.5C16.0006 13.4007 15.9716 13.3035 15.9167 13.2207C15.8618 13.1379 15.7835 13.0734 15.6917 13.0353C15.6 12.9972 15.499 12.9873 15.4017 13.0069C15.3043 13.0264 15.2149 13.0745 15.145 13.145L14 14.292V9.5C14 9.36739 13.9473 9.24021 13.8536 9.14645C13.7598 9.05268 13.6326 9 13.5 9C13.3674 9 13.2402 9.05268 13.1464 9.14645C13.0527 9.24021 13 9.36739 13 9.5V14.292L11.854 13.146C11.7841 13.0759 11.6949 13.0281 11.5978 13.0088C11.5007 12.9894 11.4 12.9993 11.3085 13.0372C11.2171 13.0751 11.1389 13.1394 11.084 13.2217Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/trash.svg
  var trash_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M14 2H10C10 0.897 9.103 0 8 0C6.897 0 6 0.897 6 2H2C1.724 2 1.5 2.224 1.5 2.5C1.5 2.776 1.724 3 2 3H2.54L3.349 12.708C3.456 13.994 4.55 15 5.84 15H10.159C11.449 15 12.543 13.993 12.65 12.708L13.459 3H13.999C14.275 3 14.499 2.776 14.499 2.5C14.499 2.224 14.275 2 13.999 2H14ZM8 1C8.551 1 9 1.449 9 2H7C7 1.449 7.449 1 8 1ZM11.655 12.625C11.591 13.396 10.934 14 10.16 14H5.841C5.067 14 4.41 13.396 4.346 12.625L3.544 3H12.458L11.656 12.625H11.655ZM7 5.5V11.5C7 11.776 6.776 12 6.5 12C6.224 12 6 11.776 6 11.5V5.5C6 5.224 6.224 5 6.5 5C6.776 5 7 5.224 7 5.5ZM10 5.5V11.5C10 11.776 9.776 12 9.5 12C9.224 12 9 11.776 9 11.5V5.5C9 5.224 9.224 5 9.5 5C9.776 5 10 5.224 10 5.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/gripper.svg
  var gripper_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7 4C7 4.552 6.552 5 6 5C5.448 5 5 4.552 5 4C5 3.448 5.448 3 6 3C6.552 3 7 3.448 7 4ZM10 3C9.448 3 9 3.448 9 4C9 4.552 9.448 5 10 5C10.552 5 11 4.552 11 4C11 3.448 10.552 3 10 3ZM6 7C5.448 7 5 7.448 5 8C5 8.552 5.448 9 6 9C6.552 9 7 8.552 7 8C7 7.448 6.552 7 6 7ZM10 7C9.448 7 9 7.448 9 8C9 8.552 9.448 9 10 9C10.552 9 11 8.552 11 8C11 7.448 10.552 7 10 7ZM6 11C5.448 11 5 11.448 5 12C5 12.552 5.448 13 6 13C6.552 13 7 12.552 7 12C7 11.448 6.552 11 6 11ZM10 11C9.448 11 9 11.448 9 12C9 12.552 9.448 13 10 13C10.552 13 11 12.552 11 12C11 11.448 10.552 11 10 11Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/screen-cut.svg
  var screen_cut_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.2002 5.10059C5.4302 4.93059 5.74039 4.9802 5.90039 5.2002L10.2568 11.1436C10.4868 11.0516 10.738 11 11 11C12.1029 11 12.9999 11.8981 13 13.001C13 14.104 12.103 15.001 11 15.001C9.897 15.001 9 14.104 9 13.001C9.00004 12.523 9.16921 12.0832 9.45117 11.7383L8 9.75098L6.54883 11.7383C6.83079 12.0822 6.99996 12.522 7 13.001C7 14.104 6.103 15.001 5 15.001C3.897 15.001 3 14.104 3 13.001C3.00009 11.8981 3.89706 11.001 5 11.001C5.263 11.001 5.51316 11.0525 5.74316 11.1445L7.37988 8.91016L5.09961 5.7998C4.92999 5.56987 4.98039 5.26051 5.2002 5.10059ZM5 12C4.44905 12 4.00008 12.4491 4 13C4 13.551 4.449 14 5 14C5.551 14 6 13.551 6 13C5.99992 12.4491 5.55095 12 5 12ZM11 12C10.449 12 10.0001 12.4491 10 13C10 13.551 10.449 14 11 14C11.551 14 12 13.551 12 13C11.9999 12.4491 11.551 12 11 12Z"/><path d="M0.5 9C0.776 9 1 9.224 1 9.5V10C1 10.426 1.27087 10.8063 1.67285 10.9463C1.93381 11.0363 2.07237 11.3211 1.98145 11.582C1.91045 11.789 1.71579 11.918 1.50879 11.918C1.45485 11.9179 1.39866 11.9086 1.34473 11.8896C0.540921 11.6105 0 10.8519 0 10V9.5C0 9.224 0.224 9 0.5 9Z"/><path d="M15.5 8.99902C15.776 8.99903 16 9.22303 16 9.49902V9.99902C16 10.844 15.4649 11.6017 14.668 11.8848C14.613 11.9048 14.557 11.9141 14.501 11.9141C14.296 11.9141 14.1033 11.786 14.0303 11.5811C13.9383 11.3211 14.0741 11.0354 14.334 10.9434C14.732 10.8024 15 10.423 15 10V9.5C15 9.22401 15.224 8.99902 15.5 8.99902Z"/><path d="M10.0996 5.2002C10.2596 4.9802 10.5698 4.93059 10.7998 5.10059C11.0196 5.26051 11.07 5.56988 10.9004 5.7998L9.24023 8.06055L8.62012 7.21973L10.0996 5.2002Z"/><path d="M0.5 6C0.776 6 1 6.224 1 6.5V7.5C1 7.776 0.776 8 0.5 8C0.224 8 0 7.776 0 7.5V6.5C0 6.224 0.224 6 0.5 6Z"/><path d="M15.5 6C15.776 6 16 6.224 16 6.5V7.5C16 7.776 15.776 8 15.5 8C15.224 8 15 7.776 15 7.5V6.5C15 6.224 15.224 6 15.5 6Z"/><path d="M2.5 2C2.776 2 3 2.224 3 2.5C3 2.776 2.776 3 2.5 3H2C1.449 3 1 3.449 1 4V4.5C1 4.776 0.776 5 0.5 5C0.224 5 0 4.776 0 4.5V4C0 2.897 0.897 2 2 2H2.5Z"/><path d="M14 2C15.103 2 16 2.897 16 4V4.5C16 4.776 15.776 5 15.5 5C15.224 5 15 4.776 15 4.5V4C15 3.449 14.551 3 14 3H13.5C13.224 3 13 2.776 13 2.5C13 2.224 13.224 2 13.5 2H14Z"/><path d="M7 2C7.276 2 7.5 2.224 7.5 2.5C7.5 2.776 7.276 3 7 3H4.5C4.224 3 4 2.776 4 2.5C4 2.224 4.224 2 4.5 2H7Z"/><path d="M11.5 2C11.776 2 12 2.224 12 2.5C12 2.776 11.776 3 11.5 3H9C8.724 3 8.5 2.776 8.5 2.5C8.5 2.224 8.724 2 9 2H11.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/indent.svg
  var indent_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M2.50002 3C2.77602 3 3.00002 3.224 3.00002 3.5V6.5C3.00002 7.327 3.67302 8 4.50002 8H12.293L9.64702 5.354C9.45202 5.159 9.45202 4.842 9.64702 4.647C9.84202 4.452 10.159 4.452 10.354 4.647L13.854 8.147C14.049 8.342 14.049 8.659 13.854 8.854L10.354 12.354C10.256 12.452 10.128 12.5 10 12.5C9.87202 12.5 9.74402 12.451 9.64602 12.354C9.45102 12.159 9.45102 11.842 9.64602 11.647L12.292 9.001H4.49902C3.12002 9.001 1.99902 7.88 1.99902 6.501V3.501C1.99902 3.225 2.22302 3.001 2.49902 3.001L2.50002 3Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/add.svg
  var add_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8 1.5C8 1.22386 7.77614 1 7.5 1C7.22386 1 7 1.22386 7 1.5V7H1.5C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H7V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H8V1.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/sync.svg
  var sync_default = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 3.5V6.5C14 6.78 13.78 7 13.5 7H10.5C10.22 7 9.99999 6.78 9.99999 6.5C9.99999 6.22 10.22 6 10.5 6H12.58C11.78 4.17 10.01 3 7.99999 3C5.77999 3 3.79999 4.5 3.18999 6.64C3.12999 6.86 2.92999 7 2.70999 7C2.65999 7 2.61999 7 2.56999 6.98C2.29999 6.9 2.14999 6.63 2.22999 6.36C2.95999 3.79 5.32999 2 7.99999 2C10.05 2 11.91 3.02 13 4.69V3.5C13 3.22 13.22 3 13.5 3C13.78 3 14 3.22 14 3.5ZM13.42 9.02C13.16 8.95 12.88 9.1 12.8 9.37C12.19 11.51 10.22 13.01 7.98999 13.01C5.97999 13.01 4.20999 11.84 3.40999 10.01H5.48999C5.76999 10.01 5.98999 9.79 5.98999 9.51C5.98999 9.23 5.76999 9.01 5.48999 9.01H2.48999C2.20999 9.01 1.98999 9.23 1.98999 9.51V12.51C1.98999 12.79 2.20999 13.01 2.48999 13.01C2.76999 13.01 2.98999 12.79 2.98999 12.51V11.32C4.07999 12.98 5.93999 14.01 7.98999 14.01C10.66 14.01 13.03 12.22 13.76 9.65C13.84 9.38 13.68 9.11 13.41 9.03L13.42 9.02Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/split-horizontal.svg
  var split_horizontal_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12.5 1H3.5C2.122 1 1 2.122 1 3.5V12.5C1 13.878 2.122 15 3.5 15H12.5C13.878 15 15 13.878 15 12.5V3.5C15 2.122 13.878 1 12.5 1ZM2 12.5V3.5C2 2.673 2.673 2 3.5 2H7.5V14H3.5C2.673 14 2 13.327 2 12.5ZM14 12.5C14 13.327 13.327 14 12.5 14H8.5V2H12.5C13.327 2 14 2.673 14 3.5V12.5Z"/></svg>';

  // node_modules/@vscode/codicons/src/icons/fold.svg
  var fold_default = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M11.8536 3.35355L8.35355 6.85355C8.15829 7.04882 7.84171 7.04882 7.64645 6.85355L4.14645 3.35355C3.95118 3.15829 3.95118 2.84171 4.14645 2.64645C4.34171 2.45118 4.65829 2.45118 4.85355 2.64645L8 5.79289L11.1464 2.64645C11.3417 2.45118 11.6583 2.45118 11.8536 2.64645C12.0488 2.84171 12.0488 3.15829 11.8536 3.35355ZM11.8536 12.6464L8.35355 9.14645C8.15829 8.95118 7.84171 8.95118 7.64645 9.14645L4.14645 12.6464C3.95118 12.8417 3.95118 13.1583 4.14645 13.3536C4.34171 13.5488 4.65829 13.5488 4.85355 13.3536L8 10.2071L11.1464 13.3536C11.3417 13.5488 11.6583 13.5488 11.8536 13.3536C12.0488 13.1583 12.0488 12.8417 11.8536 12.6464Z"/></svg>';


  const __shared = // src/shared.ts
(() => {
const VIEW_TYPE = "vditorMarkdown.editor";
const PREFIX = "vditorMarkdown";
const APP_NAME = "墨尔 markdown editor";

const actions                     = [
  ["outline", "大纲"],
  ["source", "在 VS Code 中编辑"],
  ["save", "保存"],
  ["headings", "标题"],
  ["bold", "粗体"],
  ["italic", "斜体"],
  ["strike", "删除线"],
  ["link", "链接"],
  ["textColor", "设置字体配色"],
  ["backgroundColor", "设置背景配色"],
  ["export", "导出"],
  ["theme", "选择主题"],
  ["brightness", "切换明暗主题"],
  ["list", "无序列表"],
  ["ordered-list", "有序列表"],
  ["check", "任务列表"],
  ["table", "表格"],
  ["quote", "引用"],
  ["code", "代码块"],
  ["undo", "撤销"],
  ["redo", "重做"],
  ["search", "搜索"],
  ["shortcuts", "快捷键配置"],
  ["settings", "设置"]
];

const defaultColors = [
  "#ffd400",
  "#ff6268",
  "#62ad2e",
  "#26a7df",
  "#a68be3",
  "#e46ae8",
  "#f49a35",
  "#aaaaaa"
];

function validPalette(value         )                    {
  return (
    Array.isArray(value) &&
    value.length >= 1 &&
    value.length <= 8 &&
    value.every((color) => typeof color === "string" && /^#[\da-f]{6}$/i.test(color))
  );
}

const defaults = {
  mode: "ir",
  theme: "auto",
  colorMode: "auto",
  uiFontSize: 13,
  editorFontSize: 13,
  fontFamily: "",
  boldColor: "",
  pageWidth: "100%",
  lineHeight: 1.7,
  typewriterMode: false,
  codeFontFamily: "",
  codeMaxHeight: "none",
  codeTheme: "auto",
  imageMaxWidth: 100,
  imageMaxHeight: 70,
  outline: true,
  outlineWidth: 216,
  browserPath: "",
  textColors: [...defaultColors],
  backgroundColors: [...defaultColors]
};

const pageWidths                     = [
  ["100%", "100%"],
  ["210mm", "A4 (210mm)"],
  ["148mm", "A5 (148mm)"],
  ["176mm", "B5 (176mm)"],
  ["8.5in", "Letter (8.5in)"],
  ["768px", "768px"],
  ["960px", "960px"]
];

function pageWidthPixels(value        )                     {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(px|mm|in)$/);
  return match
    ? Number(match[1]) * ({ px: 1, mm: 96 / 25.4, in: 96 }                          )[match[2]]
    : undefined;
}

function validPageWidth(value         )          {
  if (value === "100%") return true;
  const pixels = typeof value === "string" ? pageWidthPixels(value) : undefined;
  return pixels !== undefined && pixels >= 240 && pixels <= 6000;
}

const exportDefaults = {
  format: "pdf",
  topMargin: 25,
  toc: true,
  beautify: false,
  theme: false,
  paperSize: "A4",
  font: "",
  fontSize: 13,
  directory: "${fileDir}"
};

function minimalEdit(before        , after        ) {
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start++;
  if (start === before.length && start === after.length) return undefined;
  if (start > 0 && /[\uDC00-\uDFFF]/.test(before[start] || after[start] || "")) start--;
  let endBefore = before.length;
  let endAfter = after.length;
  while (endBefore > start && endAfter > start && before[endBefore - 1] === after[endAfter - 1]) {
    endBefore--;
    endAfter--;
  }
  if (/[\uDC00-\uDFFF]/.test(before[endBefore] || after[endAfter] || "")) {
    endBefore++;
    endAfter++;
  }
  return { start, end: endBefore, text: after.slice(start, endAfter) };
}

function validateExport(input     ) {
  const x = input;
  if (
    !x ||
    !["pdf", "html", "docx"].includes(x.format) ||
    !["A4", "A3", "Letter"].includes(x.paperSize) ||
    !Number.isFinite(x.topMargin) ||
    x.topMargin < 0 ||
    x.topMargin > 300 ||
    !Number.isFinite(x.fontSize) ||
    x.fontSize < 8 ||
    x.fontSize > 72 ||
    typeof x.font !== "string" ||
    x.font.length > 200 ||
    typeof x.directory !== "string" ||
    ["toc", "beautify", "theme"].some((k) => typeof x[k] !== "boolean")
  ) {
    throw new Error("导出参数无效。请检查边距、字号和导出目录。");
  }
  return x;
}

const escapeHTML = (value        ) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ));

return { validPalette, pageWidthPixels, validPageWidth, minimalEdit, validateExport, VIEW_TYPE, PREFIX, APP_NAME, actions, defaultColors, defaults, pageWidths, exportDefaults, escapeHTML };
})();
  const __colors = // src/webview/colors.ts
(() => {
const SUPPORTED = /^<span\s+style\s*=\s*["']([^"']+)["']\s*>$/i;

function colorStyle(tag        )                     {
  const match = tag.replace(/\u200b/g, "").trim().match(SUPPORTED);
  if (!match) return undefined;
  const declarations = match[1].split(";").map((s) => s.trim()).filter(Boolean);
  const result           = [];
  for (const declaration of declarations) {
    const size = declaration.match(/^font-size\s*:\s*(\d+(?:\.\d+)?(?:px|pt|em|rem|%))$/i);
    if (size && CSS.supports("font-size", size[1])) {
      result.push(`font-size:${size[1]}`);
      continue;
    }
    const pair = declaration.match(/^(color|background-color)\s*:\s*(#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i);
    if (!pair || !CSS.supports(pair[1], pair[2])) return undefined;
    result.push(`${pair[1]}:${pair[2]}`);
  }
  return result.length ? result.join(";") : undefined;
}

function editTextStyles(target         , changes                               , lute     , mode        )          {
  if (mode === "ir") {
    const surface = target.closest("[contenteditable=true]") ;
    let block = target;
    while (block.parentElement !== surface) block = block.parentElement ;
    const index = [...block.querySelectorAll("[data-vm-color]")].indexOf(target);
    const holder = document.createElement("div");
    holder.innerHTML = lute.Md2VditorDOM(lute.VditorIRDOM2Md(block.outerHTML));
    const selected = holder.querySelectorAll("[data-vm-color]")[index];
    if (!selected) throw new Error("文字格式已变化，请重新点击后修改。");
    editTextStyles(selected, changes, lute, "wysiwyg");
    const replacement = document.createElement("div");
    replacement.innerHTML = lute.Md2VditorIRDOM(lute.VditorDOM2Md(holder.innerHTML));
    const caret = replacement.firstElementChild ;
    block.replaceWith(...replacement.childNodes);
    return caret;
  }
  let highest = target;
  for (let parent = target.parentElement; parent && !parent.matches("[data-block]"); parent = parent.parentElement) {
    if (parent.matches("[data-vm-color]")) highest = parent;
  }
  const index = [highest, ...highest.querySelectorAll("[data-vm-color]")].indexOf(target);
  const copy = highest.cloneNode(true)           ;
  const selected = [copy, ...copy.querySelectorAll("[data-vm-color]")][index]               ;
  copy.querySelectorAll(".vm-color-token").forEach((token) => token.remove());
  const range = document.createRange();
  let before = document.createDocumentFragment();
  let after = document.createDocumentFragment();
  if (highest !== target) {
    range.selectNodeContents(copy);
    range.setEndBefore(selected);
    before = range.cloneContents();
    range.selectNodeContents(copy);
    range.setStartAfter(selected);
    after = range.cloneContents();
  }
  const style = document.createElement("span").style;
  const ancestry                = [];
  for (let node                     = selected; node; node = node.parentElement) {
    ancestry.unshift(node);
    if (node === copy) break;
  }
  for (const node of ancestry) {
    if (node.hasAttribute("data-vm-color")) {
      for (const property of ["color", "background-color", "font-size"]) {
        if (node.style.getPropertyValue(property)) style.setProperty(property, node.style.getPropertyValue(property));
      }
    }
  }
  let middle = selected.cloneNode(true)               ;
  middle.removeAttribute("style");
  middle.removeAttribute("data-vm-color");
  for (let node = selected.parentElement; node && node !== copy; node = node.parentElement) {
    const wrapper = node.cloneNode(false)               ;
    if (wrapper.hasAttribute("data-vm-color")) {
      wrapper.removeAttribute("style");
      wrapper.removeAttribute("data-vm-color");
    }
    wrapper.append(middle);
    middle = wrapper;
  }
  for (const [property, value] of Object.entries(changes)) {
    value === null ? style.removeProperty(property) : style.setProperty(property, value);
    for (const span of middle.querySelectorAll             ("[data-vm-color]")) span.style.removeProperty(property);
  }
  const container = document.createElement("div");
  const part = (contents                  ) => {
    if (!contents.textContent?.replace(/\u200b/g, "").trim()) return;
    const wrapper = copy.cloneNode(false)           ;
    wrapper.append(contents);
    container.append(wrapper);
  };
  if (highest !== target) part(before);
  if (style.length) {
    const wrapper = document.createElement("span");
    wrapper.dataset.vmColor = "1";
    wrapper.setAttribute("style", style.cssText);
    wrapper.append(middle);
    container.append(wrapper);
  } else container.append(middle);
  if (highest !== target) part(after);
  for (const span of [...container.querySelectorAll             ("[data-vm-color]")].reverse()) {
    if (!span.style.length) {
      span.replaceWith(...span.childNodes);
      continue;
    }
    const template = document.createElement("div");
    template.innerHTML =
      mode === "ir"
        ? lute.Md2VditorIRDOM(`<span style="${span.style.cssText}">x</span>`)
        : lute.Md2VditorDOM(`<span style="${span.style.cssText}">x</span>`);
    const decorated = template.querySelector("[data-vm-color]") ;
    span.prepend(decorated.firstChild .cloneNode(true));
    span.append(decorated.lastChild .cloneNode(true));
  }
  highest.replaceWith(...container.childNodes);
  return middle;
}

function undecorate(html        )         {
  const root = document.createElement("div");
  root.innerHTML = html;
  for (const span of [...root.querySelectorAll("[data-vm-color]")].reverse()) span.replaceWith(...span.childNodes);
  for (const token of root.querySelectorAll(".vm-color-token")) token.classList.remove("vm-color-token");
  return root.innerHTML;
}

function decorate(html        )         {
  const root = document.createElement("div");
  root.innerHTML = html;
  for (const block of root.querySelectorAll("p,h1,h2,h3,h4,h5,h6,li,td,th,blockquote")) {
    const stack                                                  = [];
    for (const token of [...block.querySelectorAll('[data-type="html-inline"]')]) {
      if (token.closest("p,h1,h2,h3,h4,h5,h6,li,td,th,blockquote") !== block || token.closest("[data-vm-color]")) continue;
      const text = (token.textContent || "").replace(/\u200b/g, "").trim();
      if (/^<span\b/i.test(text)) stack.push({ token, style: colorStyle(text) });
      else if (/^<\/span\s*>$/i.test(text)) {
        const start = stack.pop();
        if (!start?.style || start.token.parentNode !== token.parentNode) continue;
        const span = document.createElement("span");
        span.dataset.vmColor = "1";
        span.setAttribute("style", start.style);
        start.token.before(span);
        let node                   = start.token;
        while (node) {
          const next                   = node.nextSibling;
          span.append(node);
          if (node === token) break;
          node = next;
        }
        start.token.classList.add("vm-color-token");
        token.classList.add("vm-color-token");
      }
    }
  }
  return root.innerHTML;
}

function installColorAdapter(lute     ) {
  const produced = ["Md2VditorDOM", "Md2VditorIRDOM", "HTML2VditorDOM", "HTML2VditorIRDOM", "SpinVditorDOM", "SpinVditorIRDOM"];
  const consumed = ["SpinVditorDOM", "SpinVditorIRDOM", "VditorDOM2Md", "VditorIRDOM2Md", "VditorDOM2HTML", "VditorIRDOM2HTML"];
  for (const name of new Set([...produced, ...consumed])) {
    if (typeof lute[name] !== "function") continue;
    const original = lute[name].bind(lute);
    lute[name] = (value        , ...rest       ) => {
      const output = original(consumed.includes(name) ? undecorate(value) : value, ...rest);
      return produced.includes(name) ? decorate(output) : output;
    };
  }
}

return { colorStyle, editTextStyles, undecorate, decorate, installColorAdapter };
})();
  const __icons = // src/webview/icons.ts
(() => {
                                        
                                     
                                   
                                        
                                   
                                     
                                            
                                   
                                           
                                       
                                     
                                         
                                        
                                             
                                           
                                        
                                    
                                    
                                   
                                      
                                   
                                     
                                          
                                            
                                   
                                     
                                    
                                      
                                         
                                     
                                  
                                   
                                               
                                   

const eraser =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 5 5a2 2 0 0 1 0 3L11 21H6l-4-4a2 2 0 0 1 0-3L13 3a2 2 0 0 1 3 0Z"/><path d="m7 9 8 8M10 21h11"/></svg>';

const icons                         = {
  outline: list_tree_default,
  source: vscode_default,
  save: save_default,
  headings: text_size_default,
  bold: bold_default,
  italic: italic_default,
  strike: strikethrough_default,
  link: link_default,
  textColor: symbol_color_default,
  backgroundColor: paintcan_default,
  export: export_default,
  theme: color_mode_default,
  brightness: lightbulb_default,
  list: list_unordered_default,
  "ordered-list": list_ordered_default,
  check: checklist_default,
  table: table_default,
  quote: quote_default,
  code: code_default,
  undo: discard_default,
  redo: redo_default,
  search: search_default,
  shortcuts: record_keys_default,
  settings: settings_gear_default,
  copy: copy_default,
  paste: clippy_default,
  trash: trash_default,
  grip: gripper_default,
  cut: screen_cut_default,
  indent: indent_default,
  add: add_default,
  convert: sync_default,
  columns: split_horizontal_default,
  fold: fold_default,
  eraser
};

const icon = (id        ) =>
  (icons[id] || settings_gear_default).replace("<svg ", '<svg aria-hidden="true" focusable="false" ');

return { icon };
})();
  const __viewportLayer = // src/webview/viewportLayer.ts
(() => {
function viewportLayer(wrapper         , layers                              , className        ) {
  const parent = wrapper.parentElement ;
  let layer = layers.get(wrapper);
  if (!layer) {
    layer = document.createElement("div");
    layer.className = className;
    parent.append(layer);
    layers.set(wrapper, layer);
  }
  const origin = wrapper.getBoundingClientRect();
  const bounds = parent.getBoundingClientRect();
  Object.assign(layer.style, {
    left: `${origin.left - bounds.left}px`,
    top: `${origin.top - bounds.top}px`,
    width: `${wrapper.clientWidth}px`,
    height: `${wrapper.clientHeight}px`
  });
  return { layer, origin };
}

return { viewportLayer };
})();
  const __codeBlocks = // src/webview/codeBlocks.ts
(() => {
const { escapeHTML } = __shared;
const { icon } = __icons;
const { viewportLayer } = __viewportLayer;

                                                                        

const languages = [
  "",
  "plaintext",
  "javascript",
  "typescript",
  "json",
  "json5",
  "html",
  "css",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "rust",
  "bash",
  "powershell",
  "sql",
  "yaml",
  "xml",
  "markdown",
  "vue",
  "jsx",
  "tsx",
  "kotlin",
  "swift",
  "ruby",
  "php",
  "diff",
  "dockerfile",
  "mermaid",
  "graphviz",
  "echarts",
  "flowchart",
  "wavedrom",
  "markmap",
  "mindmap",
  "plantuml",
  "abc",
  "smiles"
];

function installCodeBlocks(editor     , options     ) {
  const bars = new Map                         ();
  const layers = new Map                         ();
  let scheduled = false;
  const sourceOf = (block         ) => block.querySelector("pre > code");
  const languageOf = (source         ) => source.className.match(/(?:^|\s)language-([^\s]+)/)?.[1] || "";
  const render = (block         ) => {
    const preview = block.querySelector(".vditor-ir__preview,.vditor-wysiwyg__preview");
    const source = sourceOf(block);
    if (preview && source) {
      preview.innerHTML = source.outerHTML;
      processCodeRender(preview, editor.vditor);
    }
    options.submit();
    schedule();
  };
  function createBar(block         , layer                ) {
    const bar = document.createElement("div");
    bar.className = "vm-code-toolbar";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "代码块操作");
    bar.innerHTML = `<select class="vm-code-language" aria-label="代码语言"></select><span class="vm-code-actions"><button type="button" class="vm-code-theme" aria-label="代码块主题" aria-haspopup="menu" title="代码块主题（所有代码块）">${icon("theme")}</button>${[
      ["trash", "删除代码块"],
      ["copy", "复制代码"],
      ["paste", "粘贴代码"]
    ]
      .map(([id, label]) => `<button type="button" data-code-action="${id}" aria-label="${label}" title="${label}">${icon(id)}</button>`)
      .join("")}</span>`;
    bar.addEventListener("pointerdown", (event) => {
      if ((event.target           ).closest("button")) event.preventDefault();
    });
    (bar.querySelector(".vm-code-language")                     ).onchange = (event) => {
      const language = (event.target                     ).value;
      const source = sourceOf(block) ;
      source.className = language ? `language-${language}` : "";
      const info = block.querySelector('[data-type="code-block-info"]');
      if (info) info.textContent = "\u200B" + language;
      render(block);
    };
    (bar.querySelector(".vm-code-theme")                     ).onclick = (event) =>
      options.openThemeMenu(event.currentTarget);
    bar.addEventListener("click", async (event) => {
      const action = (event.target           ).closest             ("[data-code-action]")?.dataset.codeAction;
      if (!action) return;
      const source = sourceOf(block) ;
      try {
        if (action === "copy") {
          await options.rpc("clipboardWrite", { text: source.textContent || "" });
          options.toast("代码已复制");
        } else if (action === "paste") {
          const selection = window.getSelection();
          const selected =
            selection?.rangeCount && source.contains(selection.getRangeAt(0).commonAncestorContainer)
              ? selection.getRangeAt(0).cloneRange()
              : undefined;
          const text = await options.rpc("clipboardRead");
          if (!text || !source.isConnected) return;
          const validSelection = selected?.startContainer.isConnected && source.contains(selected.commonAncestorContainer);
          const range = validSelection ? selected  : document.createRange();
          if (!validSelection) {
            range.selectNodeContents(source);
            range.collapse(false);
          }
          range.deleteContents();
          const node = document.createTextNode(String(text).replace(/\r\n?/g, "\n"));
          range.insertNode(node);
          range.setStartAfter(node);
          range.collapse(true);
          source.parentElement .style.display = "block";
          block.classList.add("vditor-ir__node--expand");
          const surface = editor.vditor[editor.vditor.currentMode].element;
          surface.focus({ preventScroll: true });
          selection?.removeAllRanges();
          selection?.addRange(range);
          render(block);
        } else if (action === "trash") {
          const surface = block.closest("[contenteditable=true]")               ;
          const next = block.nextElementSibling;
          const previous = block.previousElementSibling;
          block.remove();
          if (!surface.children.length) surface.innerHTML = '<p data-block="0">\n</p>';
          surface.focus({ preventScroll: true });
          const range = document.createRange();
          range.selectNodeContents(next || previous || surface.firstElementChild );
          range.collapse(!!next);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          options.submit();
          schedule();
        }
      } catch (error     ) {
        options.toast(error.message, true);
      }
    });
    layer.append(bar);
    bars.set(block, bar);
    return bar;
  }
  function refresh() {
    scheduled = false;
    const mode = editor.vditor.currentMode;
    const surface = mode === "sv" ? null : editor.vditor[mode].element;
    for (const [block, bar] of bars) {
      if (!block.isConnected || !surface?.contains(block)) {
        bar.remove();
        bars.delete(block);
      }
    }
    if (!surface) return;
    const { layer, origin } = viewportLayer(surface.parentElement, layers, "vm-code-layer");
    for (const block of surface.querySelectorAll('[data-type="code-block"]')) {
      const source = sourceOf(block);
      if (!source) continue;
      if (!block.classList.contains("vm-code-block")) block.classList.add("vm-code-block");
      const bar = bars.get(block) || createBar(block, layer);
      const rect = block.getBoundingClientRect();
      bar.style.transform = `translate(${rect.left - origin.left + 8}px,${rect.top - origin.top + 6}px)`;
      bar.style.width = `${Math.max(0, rect.width - 16)}px`;
      bar.hidden = rect.bottom < origin.top || rect.top > origin.bottom;
      const language = languageOf(source);
      const selectEl = bar.querySelector(".vm-code-language")                     ;
      const all = [...new Set([...languages, ...((window       ).hljs?.listLanguages() || []), language])];
      const choices = all
        .map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value || "纯文本")}</option>`)
        .join("");
      if (selectEl.dataset.choices !== choices) {
        selectEl.innerHTML = choices;
        selectEl.dataset.choices = choices;
      }
      selectEl.value = language;
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(refresh);
    }
  }
  const observer = new MutationObserver(schedule);
  for (const mode of ["ir", "wysiwyg"]) {
    const surface = editor.vditor[mode].element;
    observer.observe(surface, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class", "style", "data-render"]
    });
    surface.addEventListener("scroll", schedule, { passive: true });
    surface.parentElement.addEventListener("scroll", schedule, { passive: true });
    new ResizeObserver(schedule).observe(surface);
  }
  window.addEventListener("resize", schedule);
  schedule();
  return { refresh: schedule };
}

return { installCodeBlocks };
})();
  const __themes = // src/webview/themes.ts
(() => {
const { escapeHTML } = __shared;

const isDarkTheme = (theme     ) => theme?.kind === "dark" || theme?.kind === "hc-dark";

function installThemeMenu(options     ) {
  let menu                            ;
  let anchor                         ;
  function close(focus = false) {
    menu?.remove();
    menu = undefined;
    anchor?.setAttribute("aria-expanded", "false");
    if (focus && anchor?.isConnected) anchor.focus({ preventScroll: true });
    anchor = undefined;
  }
  function show(button             , target        ) {
    if (menu && anchor === button) {
      close();
      return;
    }
    close();
    options.beforeOpen();
    anchor = button;
    const catalog = options.catalog();
    const value = options.current(target);
    const item = (id        , label        ) =>
      `<button type="button" role="menuitemradio" data-theme-id="${escapeHTML(id)}" aria-checked="${
        value === id
      }"><span>${escapeHTML(label)}</span><span class="theme-check" aria-hidden="true">${
        value === id ? "✓" : ""
      }</span></button>`;
    const groups                                      = [
      ["亮色主题", (theme) => theme.kind === "light"],
      ["暗色主题", (theme) => theme.kind === "dark"],
      ["高对比度主题", (theme) => theme.kind.startsWith("hc-")]
    ];
    menu = document.createElement("div");
    menu.id = "theme-menu";
    menu.className = "theme-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", target === "theme" ? "界面主题" : "代码块主题");
    menu.innerHTML = `<div class="theme-group">系统</div>${item("auto", "Auto · 跟随 VS Code")}${groups
      .map(([label, filter]) => {
        const themes = catalog.themes.filter(filter);
        return themes.length
          ? `<div class="theme-group">${label}</div>${themes.map((theme     ) => item(theme.id, theme.label)).join("")}`
          : "";
      })
      .join("")}`;
    document.body.append(menu);
    button.setAttribute("aria-expanded", "true");
    const rect = button.getBoundingClientRect();
    const width = Math.min(280, innerWidth - 16);
    menu.style.width = `${width}px`;
    menu.style.maxHeight = `${Math.min(520, innerHeight - 24)}px`;
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - width - 8))}px`;
    const below = innerHeight - rect.bottom - 8;
    const above = rect.top - 8;
    if (below >= Math.min(menu.scrollHeight, 240) || below >= above) {
      menu.style.top = `${rect.bottom + 4}px`;
      menu.style.maxHeight = `${Math.min(520, below - 4)}px`;
    } else {
      menu.style.bottom = `${innerHeight - rect.top + 4}px`;
      menu.style.maxHeight = `${Math.min(520, above - 4)}px`;
    }
    menu.addEventListener("pointerdown", (event) => event.preventDefault());
    menu.addEventListener("click", (event) => {
      const selected = (event.target           ).closest             ("[data-theme-id]");
      if (selected) {
        const id = selected.dataset.themeId;
        close();
        options.choose(target, id);
      }
    });
    menu.addEventListener("keydown", (event) => {
      const buttons = [...menu .querySelectorAll("button")];
      let index = buttons.indexOf(document.activeElement                     );
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close(true);
      } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        index =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
        buttons[index]?.focus({ preventScroll: true });
        buttons[index]?.scrollIntoView({ block: "nearest" });
      } else if (event.key === "Tab") close();
    });
    menu.querySelector             ("[aria-checked=true]")?.focus({ preventScroll: true });
  }
  document.addEventListener("pointerdown", (event) => {
    if (menu && !menu.contains(event.target        ) && !anchor?.contains(event.target        )) close();
  });
  document.addEventListener(
    "scroll",
    (event) => {
      if (menu && !menu.contains(event.target        )) close();
    },
    true
  );
  window.addEventListener("resize", () => close());
  return { show, close, isOpen: () => !!menu };
}

function themeSelectOptions(catalog     , value        ) {
  return `<option value="auto" ${value === "auto" ? "selected" : ""}>Auto · 跟随 VS Code</option>${[
    ["light", "亮色主题"],
    ["dark", "暗色主题"],
    ["hc-light", "高对比度亮色"],
    ["hc-dark", "高对比度暗色"]
  ]
    .map(
      ([kind, label]) =>
        `<optgroup label="${label}">${catalog.themes
          .filter((theme     ) => theme.kind === kind)
          .map(
            (theme     ) =>
              `<option value="${escapeHTML(theme.id)}" ${value === theme.id ? "selected" : ""}>${escapeHTML(
                theme.label
              )}</option>`
          )
          .join("")}</optgroup>`
    )
    .join("")}`;
}

return { installThemeMenu, themeSelectOptions, isDarkTheme };
})();
  const __selectionColors = // src/webview/selectionColors.ts
(() => {
function textareaRect(surface                     ) {
  const mirror = document.createElement("div");
  const style = getComputedStyle(surface);
  const rect = surface.getBoundingClientRect();
  for (const key of ["font", "lineHeight", "letterSpacing", "padding", "border", "boxSizing", "wordBreak", "tabSize"]) {
    (mirror.style       )[key] = (style       )[key];
  }
  Object.assign(mirror.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${surface.clientWidth}px`,
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word"
  });
  mirror.textContent = surface.value.slice(0, surface.selectionEnd);
  const marker = document.createElement("span");
  marker.textContent = "\u200B";
  mirror.append(marker);
  document.body.append(mirror);
  const point = new DOMRect(
    rect.left + marker.offsetLeft - surface.scrollLeft,
    rect.top + marker.offsetTop - surface.scrollTop,
    1,
    parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.7
  );
  mirror.remove();
  return point;
}

function installSelectionColors(options     ) {
  const bar = document.createElement("div");
  bar.id = "selection-colors";
  bar.hidden = true;
  bar.setAttribute("role", "toolbar");
  bar.setAttribute("aria-label", "文字颜色");
  let signature = "";
  function render() {
    const next = JSON.stringify([options.palette("background-color"), options.palette("color")]);
    if (signature === next) return;
    signature = next;
    bar.innerHTML = ["background-color", "color"]
      .map(
        (property) =>
          `<div class="selection-color-row" role="group" aria-label="${
            property === "color" ? "字体颜色" : "背景颜色"
          }">${options
            .palette(property)
            .map(
              (color        ) =>
                `<button type="button" data-color-property="${property}" ${
                  property === "color" ? "data-text-color" : "data-highlight-color"
                }="${color}" style="--swatch:${color}" aria-label="${
                  property === "color" ? "字体颜色" : "标记背景色"
                } ${color}" title="${color}">${property === "color" ? "A" : ""}</button>`
            )
            .join("")}</div>`
      )
      .join("");
  }
  render();
  document.body.append(bar);
  let timer = 0;
  let dragging = false;
  function hide() {
    clearTimeout(timer);
    bar.hidden = true;
  }
  function update() {
    if (dragging || options.blocked()) {
      hide();
      return;
    }
    const surface = options.surface();
    if (!surface) {
      hide();
      return;
    }
    let rect         ;
    if (surface instanceof HTMLTextAreaElement) {
      if (
        document.activeElement !== surface ||
        surface.selectionStart === surface.selectionEnd ||
        !surface.value.slice(surface.selectionStart, surface.selectionEnd).trim()
      ) {
        hide();
        return;
      }
      const prefix = surface.value.slice(0, surface.selectionStart);
      const fence = /^\s*(?:>\s*)*(?:```|~~~)/m;
      if (
        prefix.split("\n").filter((line) => fence.test(line)).length % 2 ||
        fence.test(surface.value.slice(surface.selectionStart, surface.selectionEnd))
      ) {
        hide();
        return;
      }
      rect = textareaRect(surface);
    } else {
      const selection = window.getSelection();
      if (!selection?.rangeCount || selection.isCollapsed || !selection.toString().trim()) {
        hide();
        return;
      }
      const range = selection.getRangeAt(0);
      if (!surface.contains(range.startContainer) || !surface.contains(range.endContainer)) {
        hide();
        return;
      }
      const contents = range.cloneContents();
      const parent = range.startContainer.parentElement;
      if (
        parent?.closest('[data-type="code-block"],.vditor-ir__preview,.vditor-wysiwyg__preview') ||
        contents.querySelector('[data-type="code-block"],pre')
      ) {
        hide();
        return;
      }
      const bounds = surface.getBoundingClientRect();
      const visible = [...range.getClientRects()].filter(
        (r) => r.width && r.height && r.bottom > bounds.top && r.top < bounds.bottom
      );
      if (!visible.length) {
        hide();
        return;
      }
      rect = visible[visible.length - 1];
    }
    const bounds = surface.getBoundingClientRect();
    if (rect.bottom < bounds.top || rect.top > bounds.bottom) {
      hide();
      return;
    }
    options.remember();
    render();
    bar.hidden = false;
    const width = bar.offsetWidth;
    const height = bar.offsetHeight;
    bar.style.left = `${Math.max(8, Math.min(rect.left + rect.width / 2 - width / 2, innerWidth - width - 8))}px`;
    const below = rect.bottom + 9;
    const top =
      below + height <= Math.min(bounds.bottom, innerHeight - 8)
        ? below
        : Math.max(bounds.top + 4, rect.top - height - 9);
    bar.style.top = `${top}px`;
  }
  function schedule() {
    clearTimeout(timer);
    timer = window.setTimeout(update, 100);
  }
  bar.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  bar.addEventListener("click", (event) => {
    const button = (event.target           ).closest             ("[data-color-property]");
    const color = button?.dataset.highlightColor || button?.dataset.textColor;
    if (color) {
      hide();
      options.apply(button .dataset.colorProperty, color);
    }
  });
  document.addEventListener("selectionchange", schedule);
  document.addEventListener("pointerdown", (event) => {
    if (!bar.contains(event.target        )) {
      dragging = !!options.surface()?.contains(event.target        );
      hide();
    }
  });
  window.addEventListener("pointerup", () => {
    dragging = false;
    schedule();
  });
  window.addEventListener("pointercancel", () => {
    dragging = false;
    hide();
  });
  document.addEventListener("keyup", schedule);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hide();
  });
  document.addEventListener("scroll", hide, true);
  window.addEventListener("resize", hide);
  window.addEventListener("blur", hide);
  return { hide, refresh: render };
}

return { installSelectionColors };
})();
  const __outlineResize = // src/webview/outlineResize.ts
(() => {
function installOutlineResize(outline             , separator             , options     ) {
  const container = outline.parentElement ;
  const limit = (width        ) =>
    Math.max(120, Math.min(Math.min(1600, Math.max(120, container.clientWidth - 220)), width));
  const update = (width = options.width()) => {
    const value = limit(Number.isFinite(width) ? width : 216);
    outline.style.width = `${value}px`;
    separator.setAttribute("aria-valuenow", String(Math.round(value)));
    separator.setAttribute("aria-valuemin", "120");
    separator.setAttribute("aria-valuemax", String(Math.max(120, container.clientWidth - 220)));
  };
  let dragging = false;
  let start = 0;
  let width = 216;
  separator.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    dragging = true;
    start = event.clientX;
    width = outline.getBoundingClientRect().width;
    separator.setPointerCapture(event.pointerId);
    document.documentElement.classList.add("resizing-outline");
  });
  separator.addEventListener("pointermove", (event) => {
    if (dragging) update(width + event.clientX - start);
  });
  const finish = () => {
    if (!dragging) return;
    dragging = false;
    document.documentElement.classList.remove("resizing-outline");
    options.change(Math.round(outline.getBoundingClientRect().width));
  };
  separator.addEventListener("pointerup", finish);
  separator.addEventListener("lostpointercapture", finish);
  separator.addEventListener("keydown", (event) => {
    const delta = event.key === "ArrowLeft" ? -10 : event.key === "ArrowRight" ? 10 : 0;
    if (delta) {
      event.preventDefault();
      const value = limit(outline.getBoundingClientRect().width + delta);
      update(value);
      options.change(Math.round(value));
    }
  });
  separator.addEventListener("dblclick", () => {
    update(216);
    options.change(216);
  });
  new ResizeObserver(() => {
    if (!dragging) update();
  }).observe(container);
  update();
  return { update };
}

return { installOutlineResize };
})();
  const __blocks = // src/webview/blocks.ts
(() => {
const { icon } = __icons;
const { viewportLayer } = __viewportLayer;

                                                                        
                                                                
                                                            

const types                     = [
  ["p", "文本"],
  ["ordered-list", "有序列表"],
  ["list", "无序列表"],
  ["check", "任务列表"],
  ["code", "代码块"],
  ["callout", "高亮块"],
  ["quote", "引用"],
  ["columns", "分栏"],
  ["fold", "折叠块"]
];

const typeIcons                         = {
  p: "headings",
  "ordered-list": "ordered-list",
  list: "list",
  check: "check",
  code: "code",
  callout: "backgroundColor",
  quote: "quote",
  columns: "columns",
  fold: "fold"
};

function installBlockMenus(editor     , options     ) {
  const handles = new Map                            ();
  const layers = new Map                         ();
  let menu                            ;
  let activeBlock                     ;
  let scheduled = false;
  let nativeHome                     ;
  const surface = () => (editor.vditor.currentMode === "sv" ? undefined : editor.vditor[editor.vditor.currentMode].element);
  function close() {
    const wasOpen = !!menu;
    if (nativeHome) {
      const native = editor.vditor.wysiwyg.popover;
      nativeHome.append(native);
      native.classList.remove("vm-native-in-menu");
      native.style.display = "none";
      nativeHome = undefined;
    }
    menu?.remove();
    menu = undefined;
    activeBlock = undefined;
    handles.forEach((handle) => handle.setAttribute("aria-expanded", "false"));
    if (wasOpen) options.menuState(false);
  }
  function markdown(block         ) {
    let html = block.outerHTML;
    if (block.tagName === "LI") {
      const list = block.parentElement .cloneNode(false)           ;
      list.append(block.cloneNode(true));
      html = list.outerHTML;
    }
    return (
      editor.vditor.currentMode === "ir"
        ? editor.vditor.lute.VditorIRDOM2Md(html)
        : editor.vditor.lute.VditorDOM2Md(html)
    ).trimEnd();
  }
  function focus(block         , end = false) {
    const root = surface();
    if (!root || !block.isConnected) return;
    const code = block.matches('[data-type="code-block"]') ? block.querySelector(":scope>pre>code") : null;
    let target          = block;
    if (code) {
      code.parentElement .style.display = "block";
      block.classList.add("vditor-ir__node--expand");
      target = code;
    } else {
      target =
        block.querySelector("[data-vm-block]>:first-child") ||
        block.querySelector("td,th,p,.vditor-ir__preview,.vditor-wysiwyg__preview") ||
        block;
    }
    root.focus({ preventScroll: true });
    const range = document.createRange();
    range.selectNodeContents(target);
    range.collapse(!end);
    getSelection()?.removeAllRanges();
    getSelection()?.addRange(range);
  }
  function nodes(text        ) {
    const root = document.createElement("div");
    const mode = editor.vditor.currentMode;
    root.innerHTML =
      mode === "ir" ? editor.vditor.lute.Md2VditorIRDOM(text) : editor.vditor.lute.Md2VditorDOM(text);
    return [...root.children];
  }
  function render(elements           ) {
    for (const element of elements) {
      for (const preview of element.querySelectorAll('.vditor-ir__preview[data-render="2"],.vditor-wysiwyg__preview[data-render="2"]')) {
        if (editor.vditor.currentMode === "wysiwyg") {
          const code = preview.previousElementSibling                      ;
          code?.classList.add("vditor-wysiwyg__pre");
          if (code) code.style.display = "none";
        }
        processCodeRender(preview, editor.vditor);
      }
    }
  }
  function replace(block         , text        ) {
    const elements = nodes(text);
    if (block.tagName === "LI") {
      const list = block.parentElement ;
      const items = [...list.children];
      const index = items.indexOf(block);
      const before = list.cloneNode(false)           ;
      const after = list.cloneNode(false)           ;
      before.append(...items.slice(0, index));
      after.append(...items.slice(index + 1));
      if (list.tagName === "OL") after.setAttribute("start", String(Number(list.getAttribute("start") || 1) + index + 1));
      list.replaceWith(...(before.children.length ? [before] : []), ...elements, ...(after.children.length ? [after] : []));
    } else block.replaceWith(...elements);
    render(elements);
    close();
    if (elements[0]) focus(elements[0]);
    options.submit();
    schedule();
  }
  function plain(text        ) {
    if (/^\s*(`{3,}|~{3,})/.test(text)) return text.split("\n").slice(1, -1).join("\n");
    return text
      .replace(/^>\s?\[![A-Z]+\].*\n?/, "")
      .replace(/^>\s?/gm, "")
      .replace(/^#{1,6}\s+/, "")
      .replace(/^(?:[-+*]|\d+[.)])\s+(?:\[[ xX]\]\s+)?/, "");
  }
  function converted(type        , text        ) {
    const body = plain(text) || "新段落";
    if (/^h[1-6]$/.test(type)) return `${"#".repeat(Number(type[1]))} ${body}`;
    if (type === "list" || type === "ordered-list" || type === "check") {
      return `${type === "list" ? "- " : type === "check" ? "- [ ] " : "1. "}${body.replace(/\n/g, "\n  ")}`;
    }
    if (type === "quote" || type === "callout") {
      return `${type === "callout" ? "> [!NOTE]\n" : ""}${body
        .split("\n")
        .map((line) => "> " + line)
        .join("\n")}`;
    }
    if (type === "code") {
      const fence = "`".repeat(Math.max(3, ...[...body.matchAll(/`+/g)].map((match) => match[0].length + 1)));
      return `${fence}plaintext\n${body}\n${fence}`;
    }
    const html = editor.vditor.lute.Md2HTML(body).replace(/\n/g, "");
    if (type === "columns") {
      return `<div data-vm-block="columns" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px"><div>${html}</div><div><p>第二栏</p></div></div>`;
    }
    if (type === "fold") return `<details data-vm-block="fold" open><summary>折叠块</summary><div>${html}</div></details>`;
    return body;
  }
  function remove(block         ) {
    const root = surface();
    const next = block.nextElementSibling;
    const previous = block.previousElementSibling;
    const parent = block.parentElement ;
    block.remove();
    if (/^(UL|OL)$/.test(parent.tagName) && !parent.children.length) parent.remove();
    if (!root.children.length) root.innerHTML = '<p data-block="0">\n</p>';
    close();
    focus(next?.isConnected ? next : previous?.isConnected ? previous : root.firstElementChild);
    options.submit();
    schedule();
  }
  function indent(block         , out         ) {
    if (block.tagName === "LI") {
      const list = block.parentElement ;
      const owner = list.parentElement ;
      if (out && owner.tagName === "LI") {
        owner.after(block);
        if (!list.children.length) list.remove();
      } else if (!out && block.previousElementSibling) {
        const previous = block.previousElementSibling;
        const nested =
          previous.querySelector(`:scope>${list.tagName.toLowerCase()}`) ||
          document.createElement(list.tagName.toLowerCase());
        previous.append(nested);
        nested.append(block);
      } else if (out) {
        replace(block, plain(markdown(block)));
        return;
      }
    } else {
      replace(
        block,
        out
          ? plain(markdown(block))
          : markdown(block)
              .split("\n")
              .map((line        ) => "> " + line)
              .join("\n")
      );
      return;
    }
    close();
    focus(block);
    options.submit();
    schedule();
  }
  function submenu(kind        ) {
    if (!menu || !activeBlock) return;
    const panel = menu.querySelector(".block-menu-sub")               ;
    if (panel.dataset.kind === kind) return;
    panel.dataset.kind = kind;
    panel.hidden = false;
    panel.style.top = "0";
    if (nativeHome) {
      const native = editor.vditor.wysiwyg.popover;
      nativeHome.append(native);
      native.classList.remove("vm-native-in-menu");
      native.style.display = "none";
      nativeHome = undefined;
    }
    if (kind === "convert" || kind === "add") {
      const action = kind === "convert" ? "convert" : "add";
      panel.innerHTML = `<div class="block-heading-grid">${[1, 2, 3, 4, 5, 6]
        .map((n) => `<button type="button" role="menuitem" data-block-action="${action}:h${n}">H${n}</button>`)
        .join("")}</div><div class="block-type-grid">${types
        .map(
          ([type, label]) =>
            `<button type="button" role="menuitem" data-block-action="${action}:${type}">${icon(
              typeIcons[type]
            )}<span>${label}</span></button>`
        )
        .join("")}</div>`;
    } else if (kind === "indent") {
      panel.innerHTML = `${[
        ["in", "增加缩进"],
        ["out", "减少缩进"],
        ["up", "上移"],
        ["down", "下移"]
      ]
        .map(([action, label]) => `<button type="button" role="menuitem" data-block-action="${action}">${label}</button>`)
        .join("")}`;
    } else if (kind === "properties" && editor.vditor.currentMode === "wysiwyg") {
      focus(activeBlock);
      const img = activeBlock.querySelector("img");
      if (img) genImagePopover({ target: img }, editor.vditor);
      else highlightToolbarWYSIWYG(editor.vditor);
      panel.innerHTML = '<p class="muted">正在读取编辑选项…</p>';
      const currentMenu = menu;
      const currentBlock = activeBlock;
      window.setTimeout(() => {
        if (menu !== currentMenu || activeBlock !== currentBlock || !panel.isConnected) return;
        const native = editor.vditor.wysiwyg.popover;
        nativeHome = native.parentElement;
        native.classList.add("vm-native-in-menu");
        panel.replaceChildren(native);
      }, img ? 0 : 230);
    }
    const rect = menu.getBoundingClientRect();
    panel.style.left = rect.right + panel.offsetWidth + 8 <= innerWidth ? "100%" : "auto";
    panel.style.right = panel.style.left === "auto" ? "100%" : "auto";
    if (rect.left < panel.offsetWidth && panel.style.left === "auto") {
      panel.style.left = "0";
      panel.style.right = "auto";
      panel.style.top = "100%";
    }
    const top = panel.getBoundingClientRect().top;
    if (top + panel.offsetHeight > innerHeight - 8) {
      panel.style.top = `${Math.max(8, innerHeight - panel.offsetHeight - 8) - rect.top}px`;
    }
  }
  async function run(action        ) {
    const block = activeBlock;
    if (!block?.isConnected) return;
    if (["convert", "indent", "add", "properties"].includes(action)) {
      submenu(action);
      return;
    }
    try {
      const text = markdown(block);
      if (action === "copy" || action === "cut") {
        await options.rpc("clipboardWrite", { text: text + "\n" });
        if (action === "cut" && block.isConnected) remove(block);
        else {
          close();
          options.toast("段落已复制");
        }
      } else if (action === "delete") remove(block);
      else if (action.startsWith("convert:")) replace(block, converted(action.slice(8), text));
      else if (action.startsWith("add:")) {
        const added = converted(action.slice(4), "新段落");
        if (block.tagName === "LI") replace(block, text + "\n\n" + added);
        else {
          const elements = nodes(added);
          block.after(...elements);
          render(elements);
          close();
          if (elements[0]) focus(elements[0]);
          options.submit();
          schedule();
        }
      } else if (action === "in" || action === "out") indent(block, action === "out");
      else if (action === "up" || action === "down") {
        const sibling = action === "up" ? block.previousElementSibling : block.nextElementSibling;
        if (sibling) action === "up" ? sibling.before(block) : sibling.after(block);
        close();
        focus(block);
        options.submit();
        schedule();
      }
    } catch (error     ) {
      options.toast(error.message, true);
    }
  }
  function open(block         , handle             ) {
    if (activeBlock === block && menu) {
      close();
      return;
    }
    close();
    options.beforeOpen();
    activeBlock = block;
    handle.setAttribute("aria-expanded", "true");
    const buttons                                      = [
      ["convert", "convert", "转化为", true],
      ["delete", "trash", "删除", false],
      ["copy", "copy", "复制", false],
      ["cut", "cut", "剪切", false],
      ["indent", "indent", "缩进", true],
      ["add", "add", "在下方添加", true]
    ];
    menu = document.createElement("div");
    menu.id = "block-menu";
    menu.className = "block-menu";
    menu.innerHTML = `<div class="block-menu-main" role="menu" aria-label="段落操作">${buttons
      .map(
        ([action, image, label, sub]) =>
          `<button type="button" role="menuitem" data-block-action="${action}" ${
            sub ? 'aria-haspopup="menu"' : ""
          }>${icon(image)}<span>${label}</span>${sub ? '<span class="block-chevron">›</span>' : ""}</button>`
      )
      .join("")}${
      editor.vditor.currentMode === "wysiwyg" && block.querySelector("img,td,th")
        ? '<button type="button" role="menuitem" data-block-action="properties">编辑属性 <span class="block-chevron">›</span></button>'
        : ""
    }</div><div class="block-menu-sub" role="menu" aria-label="段落子菜单" hidden></div>`;
    document.body.append(menu);
    const rect = handle.getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - menu.offsetWidth - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(rect.bottom + 3, innerHeight - menu.offsetHeight - 8))}px`;
    menu.addEventListener("pointerdown", (event) => {
      if (!(event.target           ).closest("input,select,textarea")) event.preventDefault();
    });
    menu.addEventListener("click", (event) => {
      const action = (event.target           ).closest             ("[data-block-action]")?.dataset.blockAction;
      if (action) void run(action);
    });
    menu.querySelectorAll             ("[aria-haspopup]").forEach((button) =>
      button.addEventListener("pointerenter", () => submenu(button.dataset.blockAction ))
    );
    menu.addEventListener("keydown", (event) => {
      const buttons2 = [...menu .querySelectorAll("button")].filter((button) => !!button.getClientRects().length);
      const current = buttons2.indexOf(document.activeElement                     );
      if (event.key === "Escape") {
        event.preventDefault();
        const target = activeBlock;
        close();
        if (target) focus(target);
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        buttons2[(current + (event.key === "ArrowDown" ? 1 : -1) + buttons2.length) % buttons2.length]?.focus();
      } else if (event.key === "ArrowRight") {
        const action = (document.activeElement               )?.dataset.blockAction;
        if (action) submenu(action);
      }
    });
    menu.querySelector("button")?.focus({ preventScroll: true });
    options.menuState(true);
  }
  function refresh() {
    scheduled = false;
    const root = surface();
    const blocks = root
      ? [...root.children].flatMap((element         ) => (/^(UL|OL)$/.test(element.tagName) ? [...element.querySelectorAll("li")] : [element]))
      : [];
    const current = new Set(blocks);
    for (const [block, handle] of handles) {
      if (!current.has(block)) {
        handle.remove();
        handles.delete(block);
      }
    }
    if (activeBlock && !activeBlock.isConnected) close();
    if (!root) return;
    const { layer, origin } = viewportLayer(root.parentElement, layers, "vm-block-layer");
    const gutter = Math.max(4, root.getBoundingClientRect().left - origin.left + parseFloat(getComputedStyle(root).paddingLeft) - 27);
    for (const block of blocks) {
      if (block.tagName === "WBR" || !block.getClientRects().length) continue;
      let handle = handles.get(block);
      if (!handle) {
        handle = document.createElement("button");
        handle.className = "vm-block-handle";
        handle.type = "button";
        handle.setAttribute("aria-label", "段落操作");
        handle.setAttribute("aria-haspopup", "menu");
        handle.innerHTML = icon("grip");
        handle.onpointerdown = (event) => event.preventDefault();
        handle.onclick = () => open(block, handle );
        handles.set(block, handle);
        layer.append(handle);
      }
      const rect = block.getBoundingClientRect();
      handle.style.transform = `translate(${gutter}px,${rect.top - origin.top + 2}px)`;
      handle.hidden = rect.bottom < origin.top || rect.top > origin.bottom;
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(refresh);
    }
  }
  const observer = new MutationObserver(schedule);
  for (const mode of ["ir", "wysiwyg"]) {
    const root = editor.vditor[mode].element;
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["style", "class"] });
    root.addEventListener("scroll", schedule, { passive: true });
    root.parentElement.addEventListener("scroll", schedule, { passive: true });
    new ResizeObserver(schedule).observe(root);
  }
  document.addEventListener("pointerdown", (event) => {
    if (menu && !menu.contains(event.target        ) && !(event.target           ).closest(".vm-block-handle")) close();
  });
  document.addEventListener(
    "scroll",
    (event) => {
      if (menu && !menu.contains(event.target        )) close();
    },
    true
  );
  window.addEventListener("resize", () => {
    close();
    schedule();
  });
  schedule();
  return { close, refresh: schedule, isOpen: () => !!menu };
}

return { installBlockMenus };
})();
  const __structures = // src/webview/structures.ts
(() => {
function installStructures(editor     , submit            ) {
  let scheduled = false;
  const roots = () => ["ir", "wysiwyg"].map((mode) => editor.vditor[mode].element);
  function refresh() {
    scheduled = false;
    for (const surface of roots()) {
      for (const block of surface.querySelectorAll('[data-type="html-block"]')) {
        const preview = block.querySelector(".vditor-ir__preview,.vditor-wysiwyg__preview");
        const structure = preview?.querySelector('[data-vm-block="columns"],[data-vm-block="fold"]')                      ;
        if (!structure || structure.classList.contains("vm-structure")) continue;
        block.classList.add("vm-structure-block");
        block.classList.remove("vditor-ir__node--expand");
        structure.classList.add("vm-structure");
        structure.contentEditable = "false";
        for (const child of structure.children) {
          (child               ).contentEditable = "true";
          (child               ).dataset.vmEditable = "1";
        }
      }
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(refresh);
    }
  }
  const observer = new MutationObserver(schedule);
  for (const surface of roots()) {
    observer.observe(surface, { childList: true, subtree: true });
    for (const name of ["click", "keydown", "keyup", "paste"]) {
      surface.addEventListener(
        name,
        (event       ) => {
          if ((event.target           ).closest?.(".vm-structure")) event.stopImmediatePropagation();
        },
        true
      );
    }
    surface.addEventListener(
      "input",
      (event       ) => {
        const structure = (event.target           ).closest?.(".vm-structure");
        if (!structure) return;
        event.stopImmediatePropagation();
        const block = structure.closest('[data-type="html-block"]') ;
        const source = block.querySelector("pre>code") ;
        const copy = structure.cloneNode(true)           ;
        copy.classList.remove("vm-structure");
        if (!copy.className) copy.removeAttribute("class");
        copy.removeAttribute("contenteditable");
        copy.querySelectorAll("[data-vm-editable]").forEach((node) => {
          node.removeAttribute("data-vm-editable");
          node.removeAttribute("contenteditable");
        });
        if (copy.tagName === "DETAILS") copy.setAttribute("open", "");
        source.textContent = copy.outerHTML.replace(/\n/g, "");
        submit();
      },
      true
    );
  }
  schedule();
  return { refresh: schedule };
}

return { installStructures };
})();
  const __colorMenus = // src/webview/colorMenus.ts
(() => {
const { defaultColors } = __shared;
const { icon } = __icons;

function installColorMenus(options     ) {
  let menu                         ;
  let paletteProperty                    ;
  let target                     ;
  let dragIndex = -1;
  function close() {
    if (!menu) return;
    menu.remove();
    menu = undefined;
    target = undefined;
    paletteProperty = undefined;
    options.menuState(false);
  }
  function show(id        , label        , anchor         ) {
    close();
    options.beforeOpen();
    menu = document.createElement("section");
    menu.id = id;
    menu.className = "color-menu";
    menu.setAttribute("role", "region");
    menu.setAttribute("aria-label", label);
    document.body.append(menu);
    options.menuState(true);
    const position = () => {
      if (!menu) return;
      menu.style.left = `${Math.max(8, Math.min(anchor.left, innerWidth - menu.offsetWidth - 8))}px`;
      menu.style.top = `${
        anchor.bottom + menu.offsetHeight + 5 <= innerHeight - 8
          ? anchor.bottom + 5
          : Math.max(8, anchor.top - menu.offsetHeight - 5)
      }px`;
    };
    menu.addEventListener("pointerdown", (event) => {
      if (!(event.target           ).closest("input,[draggable=true]")) event.preventDefault();
    });
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    });
    return position;
  }
  function renderPalette() {
    if (!menu || !paletteProperty) return;
    const colors           = options.palette(paletteProperty);
    const label = paletteProperty === "color" ? "字体颜色配色" : "背景颜色配色";
    menu.innerHTML = `<header><strong>${label}</strong><button data-color-close aria-label="关闭配色菜单">×</button></header><p class="muted">保留 1–8 色；拖动六点号调整顺序。</p><div class="palette-list">${colors
      .map(
        (color, i) =>
          `<div class="palette-color-row" draggable="true" data-palette-index="${i}"><span class="palette-grip" title="拖动排序">${icon(
            "grip"
          )}</span><input type="color" value="${color}" data-palette-edit="${i}" aria-label="颜色 ${i + 1}"><span class="palette-hex">${color.toUpperCase()}</span><button data-palette-move="${i}" data-direction="-1" aria-label="上移颜色 ${
            i + 1
          }" ${i === 0 ? "disabled" : ""}>↑</button><button data-palette-move="${i}" data-direction="1" aria-label="下移颜色 ${
            i + 1
          }" ${i === colors.length - 1 ? "disabled" : ""}>↓</button><button data-palette-delete="${i}" aria-label="删除颜色 ${
            i + 1
          }" ${colors.length === 1 ? "disabled" : ""}>${icon("trash")}</button></div>`
      )
      .join("")}</div><footer><button id="palette-add" ${colors.length === 8 ? "disabled" : ""}>${icon(
      "add"
    )}添加颜色</button><button id="palette-default">恢复默认</button></footer>`;
    (menu.querySelector("[data-color-close]")                     ).onclick = close;
    const update = (next          ) => options.changePalette(paletteProperty, next);
    menu.querySelectorAll                  ("[data-palette-edit]").forEach(
      (input) =>
        (input.onchange = () => {
          const next = [...colors];
          next[Number(input.dataset.paletteEdit)] = input.value;
          update(next);
        })
    );
    menu.querySelectorAll                   ("[data-palette-delete]").forEach(
      (button) =>
        (button.onclick = () => {
          if (colors.length > 1) update(colors.filter((_, i) => i !== Number(button.dataset.paletteDelete)));
        })
    );
    const move = (from        , to        ) => {
      if (from < 0 || to < 0 || to >= colors.length || from === to) return;
      const next = [...colors];
      next.splice(to, 0, next.splice(from, 1)[0]);
      update(next);
    };
    menu.querySelectorAll                   ("[data-palette-move]").forEach(
      (button) =>
        (button.onclick = () => move(Number(button.dataset.paletteMove), Number(button.dataset.paletteMove) + Number(button.dataset.direction)))
    );
    menu.querySelectorAll             ("[data-palette-index]").forEach((row) => {
      row.ondragstart = (event) => {
        dragIndex = Number(row.dataset.paletteIndex);
        event.dataTransfer .effectAllowed = "move";
        event.dataTransfer .setData("text/plain", String(dragIndex));
        row.classList.add("dragging");
      };
      row.ondragover = (event) => {
        if (dragIndex >= 0) {
          event.preventDefault();
          event.dataTransfer .dropEffect = "move";
        }
      };
      row.ondrop = (event) => {
        event.preventDefault();
        move(dragIndex, Number(row.dataset.paletteIndex));
        dragIndex = -1;
      };
      row.ondragend = () => {
        dragIndex = -1;
        row.classList.remove("dragging");
      };
    });
    (menu.querySelector("#palette-add")                     ).onclick = () => {
      if (colors.length < 8) update([...colors, "#007c91"]);
    };
    (menu.querySelector("#palette-default")                     ).onclick = () => update([...defaultColors]);
  }
  function showPalette(anchor         , property        ) {
    if (menu?.id === "palette-menu" && paletteProperty === property) {
      close();
      return;
    }
    const position = show("palette-menu", property === "color" ? "字体颜色配色" : "背景颜色配色", anchor.getBoundingClientRect());
    paletteProperty = property;
    renderPalette();
    position();
    menu .dataset.palette = property;
    menu .querySelector("button")?.focus({ preventScroll: true });
  }
  function showAnnotation(span             ) {
    const position = show("annotation-menu", "修改文字格式", span.getBoundingClientRect());
    target = span;
    const computed = getComputedStyle(span);
    const hex = (value        ) => {
      const rgb = value.match(/\d+(?:\.\d+)?/g);
      return rgb && rgb.length >= 3
        ? "#" + rgb.slice(0, 3).map((n) => Math.round(Number(n)).toString(16).padStart(2, "0")).join("")
        : "#000000";
    };
    let background = span.style.backgroundColor;
    for (let parent = span.parentElement; !background && parent?.closest("[data-vm-color]"); parent = parent.parentElement) {
      if (parent.matches("[data-vm-color]")) background = parent.style.backgroundColor;
    }
    const foreground = hex(computed.color);
    const bg = background ? hex(background) : options.palette("background-color")[0];
    const size = Math.round(parseFloat(computed.fontSize));
    menu .innerHTML = `<div class="annotation-fields"><label>字体颜色<input type="color" id="annotation-color" value="${foreground}"></label><label>背景颜色<input type="color" id="annotation-background" value="${bg}"></label><label>字号<input type="number" id="annotation-size" min="8" max="96" value="${size}" aria-label="文字字号"><span>px</span></label><button id="annotation-clear" title="清除字体色与背景色" aria-label="清除字体色与背景色">${icon(
      "eraser"
    )}</button><button id="annotation-save" class="primary">保存</button></div><small id="annotation-error" role="status"></small>`;
    const changes                         = {};
    (menu .querySelector("#annotation-color")                    ).onchange = (event) => {
      changes.color = (event.target                    ).value;
    };
    (menu .querySelector("#annotation-background")                    ).onchange = (event) => {
      changes["background-color"] = (event.target                    ).value;
    };
    (menu .querySelector("#annotation-size")                    ).oninput = (event) => {
      changes["font-size"] = (event.target                    ).value + "px";
    };
    (menu .querySelector("#annotation-save")                     ).onclick = () => {
      const input = menu .querySelector("#annotation-size")                    ;
      if (!input.checkValidity() || !input.value) {
        menu .querySelector("#annotation-error") .textContent = "字号范围为 8–96px";
        return;
      }
      const selected = target;
      close();
      if (selected?.isConnected && Object.keys(changes).length) options.edit(selected, changes);
    };
    (menu .querySelector("#annotation-clear")                     ).onclick = () => {
      const selected = target;
      close();
      if (selected?.isConnected) options.edit(selected, { color: null, "background-color": null });
    };
    position();
  }
  document.addEventListener("pointerdown", (event) => {
    if (menu && !menu.contains(event.target        ) && !(event.target           ).closest("[data-action=textColor],[data-action=backgroundColor]")) {
      close();
    }
  });
  document.addEventListener("click", (event) => {
    if (options.blocked() || menu?.contains(event.target        ) || !getSelection()?.isCollapsed) return;
    const span = (event.target           ).closest             ("[data-vm-color]");
    if (span && options.surface()?.contains(span) && !span.closest("[data-type=code-block],.vm-color-token")) {
      showAnnotation(span);
    }
  });
  document.addEventListener(
    "scroll",
    (event) => {
      if (menu && !menu.contains(event.target        )) close();
    },
    true
  );
  window.addEventListener("resize", close);
  return {
    close,
    showPalette,
    refresh: () => {
      if (paletteProperty) renderPalette();
    },
    isOpen: () => !!menu
  };
}

return { installColorMenus };
})();
  const __toolbarState = // src/webview/toolbarState.ts
(() => {
function installToolbarState(toolbar             , native             , overlay             ) {
  const formats = ["headings", "bold", "italic", "strike", "link", "list", "ordered-list", "check", "table", "quote", "code"];
  const menus                         = {
    headings: ".heading-picker",
    export: "#perform-export",
    search: "#search-bar",
    settings: "#settings-menu",
    textColor: '#palette-menu[data-palette="color"]',
    backgroundColor: '#palette-menu[data-palette="background-color"]'
  };
  let scheduled = false;
  const set = (button                , attribute        , value         ) => {
    if (button && button.getAttribute(attribute) !== String(value)) button.setAttribute(attribute, String(value));
  };
  function update() {
    scheduled = false;
    for (const action of formats) {
      set(
        toolbar.querySelector(`[data-action="${action}"]`),
        "aria-pressed",
        !!native.querySelector(`[data-type="${action}"].vditor-menu--current`)
      );
    }
    for (const [action, selector] of Object.entries(menus)) {
      set(toolbar.querySelector(`[data-action="${action}"]`), "aria-expanded", !!document.querySelector(selector));
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  const observer = new MutationObserver(schedule);
  observer.observe(native, { subtree: true, attributes: true, attributeFilter: ["class"] });
  observer.observe(overlay, { childList: true, subtree: true });
  observer.observe(document.body, { childList: true });
  observer.observe(toolbar.parentElement , { childList: true });
  schedule();
  return { refresh: schedule };
}

return { installToolbarState };
})();
  // src/webview/main.ts
(() => {
const Vditor = src_default;
const { actions, defaultColors, defaults, escapeHTML, exportDefaults, pageWidthPixels, pageWidths, validPageWidth, validPalette } = __shared;
const { editTextStyles, installColorAdapter } = __colors;
const { icon } = __icons;
const { installCodeBlocks } = __codeBlocks;
const { installThemeMenu, isDarkTheme, themeSelectOptions } = __themes;
const { installSelectionColors } = __selectionColors;
const { installOutlineResize } = __outlineResize;
const { installBlockMenus } = __blocks;
const { installStructures } = __structures;
const { installColorMenus } = __colorMenus;
const { installToolbarState } = __toolbarState;

                          
                                                                        
                                                                          

const boot = (window       ).VM_BOOT;
const bridge = (window       ).acquireVsCodeApi?.() || {
  postMessage: (message     ) => console.log("bridge", message),
  getState: () => ({}),
  setState: () => {}
};
let settings      = { ...defaults, ...boot.settings };
let dark = !!boot.dark;
let editor     ;
let initialized = false;
let baseline = "";
let lastSent = "";
let version = 0;
let seq = 0;
let eol = "\n";
let suppress = false;
let codeBlocks     ;
let catalog = { themes: boot.themes || [], activeTheme: boot.activeTheme || "" };
let selectionColors     ;
let outlineResize     ;
let blockMenus     ;
let structures     ;
let colorMenus     ;
let toolbarState     ;
let toastTimer = 0;
let savedRange                   ;
let savedTextarea                              ;
let previousFocus                 = null;
let exportOptions      = { ...exportDefaults };
let searchIndex = -1;
const pending = new Set        ();
const requests = new Map                                                                   ();
const pendingSettings = new Map                        ();

const overlay = document.getElementById("overlay") ;
const status = document.getElementById("status") ;
status.hidden = true;
const base = document.createElement("base");
base.href = boot.base;
document.head.append(base);

const toolbar = document.createElement("div");
toolbar.id = "toolbar";
toolbar.setAttribute("role", "toolbar");
toolbar.setAttribute("aria-label", "Markdown 编辑工具栏");
const separators = new Set([0, 2, 7, 10, 12, 16, 18, 20]);
toolbar.innerHTML = `<div id="toolbar-controls">${actions
  .map(
    ([id, label], i) =>
      `<button type="button" data-action="${id}" title="${label}" aria-label="${label}">${icon(id)}</button>${
        separators.has(i) ? '<span class="separator" role="separator"></span>' : ""
      }`
  )
  .join("")}</div>`;
document.getElementById("app") .prepend(toolbar);

const nativeTools = [
  "headings",
  "bold",
  "italic",
  "strike",
  "link",
  "list",
  "ordered-list",
  "check",
  "table",
  "quote",
  "code",
  "undo",
  "redo",
  "emoji",
  "line",
  "inline-code",
  "outdent",
  "indent",
  "preview",
  "code-theme",
  "content-theme"
];

toolbar.querySelector("[data-action=theme]") .setAttribute("aria-haspopup", "menu");
const themeMenu = installThemeMenu({
  catalog: () => catalog,
  current: (target        ) => (catalog.themes.some((theme     ) => theme.id === settings[target]) ? settings[target] : "auto"),
  choose: (target        , id        ) => {
    void changeSetting(target, id);
  },
  beforeOpen: () => {
    if (overlay.querySelector("#settings-menu")) closeDialog(false);
    colorMenus?.close();
    blockMenus?.close();
    rememberSelection();
    selectionColors?.hide();
  }
});

function post(type        , data                      = {}) {
  bridge.postMessage({ type, ...data });
}

function rpc(type        , data                      = {}) {
  const requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return new Promise     ((resolve, reject) => {
    requests.set(requestId, { resolve, reject });
    post(type, { requestId, ...data });
  });
}

function toast(text        , error = false) {
  clearTimeout(toastTimer);
  status.textContent = text;
  status.hidden = false;
  status.classList.toggle("error", error);
  toastTimer = window.setTimeout(() => {
    status.hidden = true;
  }, error ? 6000 : 2500);
}

function getValue() {
  return editor.getValue().replace(/\r?\n/g, eol);
}

function submit() {
  if (!initialized || suppress) return;
  const text = getValue();
  if (text === baseline) return;
  baseline = text;
  if (text === lastSent) return;
  const baseText = lastSent;
  lastSent = text;
  seq++;
  pending.add(seq);
  post("edit", { text, baseText, seq, version });
  updateStatus();
  updateOutline();
}

function applyDocument(text        , nextVersion        ) {
  selectionColors?.hide();
  themeMenu.close();
  blockMenus?.close();
  colorMenus?.close();
  eol = text.includes("\r\n") ? "\r\n" : "\n";
  const surface = getSurface();
  const scrollTop = surface?.scrollTop || 0;
  suppress = true;
  editor.setValue(text, true);
  baseline = getValue();
  lastSent = text;
  version = nextVersion;
  pending.clear();
  suppress = false;
  if (surface) surface.scrollTop = scrollTop;
  updateOutline();
  updateStatus();
}

function updateStatus() {
  toolbar.querySelector("[data-action=save]")?.setAttribute("aria-busy", String(!!pending.size));
}

function getSurface()                          {
  return editor?.vditor[editor.vditor.currentMode]?.element;
}

function rememberSelection() {
  if (!initialized) return;
  const surface = getSurface();
  if (surface instanceof HTMLTextAreaElement) savedTextarea = [surface.selectionStart, surface.selectionEnd];
  else {
    const selection = window.getSelection();
    if (selection?.rangeCount && surface?.contains(selection.anchorNode)) savedRange = selection.getRangeAt(0).cloneRange();
  }
}

function restoreSelection() {
  const surface = getSurface();
  surface?.focus();
  if (surface instanceof HTMLTextAreaElement && savedTextarea) surface.setSelectionRange(...savedTextarea);
  else if (savedRange?.startContainer.isConnected) {
    const selection = window.getSelection() ;
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }
}

function nativeAction(id        , selector         ) {
  restoreSelection();
  const root = editor.vditor.toolbar.elements[id];
  root?.querySelector(selector || "button")?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  setTimeout(submit, 30);
}

function applySettings() {
  const selected = catalog.themes.find((theme     ) => theme.id === settings.theme);
  const code = catalog.themes.find((theme     ) => theme.id === settings.codeTheme);
  const activeTheme = catalog.themes.find((theme     ) => theme.id === catalog.activeTheme);
  const isDark = selected ? isDarkTheme(selected) : dark;
  document.documentElement.dataset.mode = isDark ? "dark" : "light";
  document.documentElement.dataset.appearance = "auto";
  document.documentElement.dataset.theme = selected ? "installed" : "auto";
  document.documentElement.dataset.codeTheme = code ? "installed" : "auto";
  document.documentElement.dataset.hostMode = dark ? "dark" : "light";
  for (const key of ["bg", "fg", "panel", "border", "muted", "accent"]) {
    document.documentElement.style.removeProperty(`--${key}`);
    if (selected) document.documentElement.style.setProperty(`--${key}`, selected.colors[key]);
  }
  document.documentElement.style.removeProperty("--code-bg");
  document.documentElement.style.removeProperty("--code-fg");
  if (code) {
    document.documentElement.style.setProperty("--code-bg", code.colors.codeBg);
    document.documentElement.style.setProperty("--code-fg", code.colors.fg);
  }
  const codePalette = (code || activeTheme)?.tokens || boot.codePalette || {};
  for (const key of ["keyword", "string", "number", "comment", "function", "type", "variable", "literal", "property"]) {
    document.documentElement.style.removeProperty(`--host-code-${key}`);
    if (/^#[\da-f]{3,8}$/i.test(codePalette[key] || "")) document.documentElement.style.setProperty(`--host-code-${key}`, codePalette[key]);
  }
  const vars                         = {
    "--ui-size": `${settings.uiFontSize}px`,
    "--editor-size": `${settings.editorFontSize}px`,
    "--line-height": String(settings.lineHeight),
    "--body-font": settings.fontFamily || 'system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    "--code-font": settings.codeFontFamily || 'var(--vscode-editor-font-family, ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace)',
    "--bold-color": /^#[0-9a-f]{3,8}$/i.test(settings.boldColor) ? settings.boldColor : "inherit",
    "--page-width": validPageWidth(settings.pageWidth) ? settings.pageWidth : "100%",
    "--code-height": settings.codeMaxHeight,
    "--image-width": `${settings.imageMaxWidth}%`,
    "--image-height": `${settings.imageMaxHeight}vh`
  };
  for (const [key, value] of Object.entries(vars)) document.documentElement.style.setProperty(key, value);
  if (!initialized) return;
  editor.setTheme(isDark ? "dark" : "classic", isDark ? "dark" : "light", isDark ? "github-dark" : "github");
  editor.vditor.options.typewriterMode = settings.typewriterMode;
  const width = pageWidthPixels(settings.pageWidth) || getSurface() .clientWidth;
  editor.vditor.options.preview.maxWidth = Math.max(240, width - 64);
  const outline = document.getElementById("outline");
  if (outline) outline.hidden = !settings.outline;
  const divider = document.getElementById("outline-resizer");
  if (divider) divider.hidden = !settings.outline;
  outlineResize?.update();
  toolbar.querySelector('[data-action="outline"]')?.setAttribute("aria-pressed", String(settings.outline));
  if (editor.vditor.currentMode !== settings.mode) {
    submit();
    const text = editor.getValue();
    suppress = true;
    setEditMode(editor.vditor, settings.mode, text);
    baseline = getValue();
    suppress = false;
    updateOutline();
    updateStatus();
  }
  codeBlocks?.refresh();
  blockMenus?.refresh();
  structures?.refresh();
  selectionColors?.refresh();
  colorMenus?.refresh();
  toolbarState?.refresh();
}

function headings() {
  const root = document.createElement("div");
  root.innerHTML = editor.vditor.lute.Md2HTML(editor.getValue());
  return [...root.querySelectorAll("h1,h2,h3,h4,h5,h6")];
}

function updateOutline() {
  const outline = document.getElementById("outline");
  if (!outline) return;
  const list = headings();
  outline.innerHTML = `<div class="outline-title">文档大纲 <span>${list.length}</span></div>${
    list.length
      ? list
          .map((h, i) => `<button data-heading="${i}" style="--level:${Number(h.tagName.slice(1))}">${escapeHTML(h.textContent || "未命名标题")}</button>`)
          .join("")
      : '<p class="muted">使用标题组织文档</p>'
  }`;
}

function navigateHeading(index        ) {
  const surface = getSurface();
  if (surface instanceof HTMLTextAreaElement) {
    let fenced = false;
    let count = -1;
    let offset = 0;
    const lines = surface.value.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
      const heading = /^\s{0,3}(?:>\s*)*#{1,6}\s/.test(line) || (line.trim() && /^\s{0,3}(?:=+|-+)\s*$/.test(lines[i + 1] || ""));
      if (!fenced && heading && ++count === index) {
        surface.focus();
        surface.setSelectionRange(offset, offset + line.length);
        surface.scrollTop = Math.max(
          0,
          surface.value.slice(0, offset).split("\n").length * settings.editorFontSize * settings.lineHeight - 80
        );
        return;
      }
      offset += line.length + 1;
    }
  } else {
    surface?.querySelectorAll("h1,h2,h3,h4,h5,h6")[index]?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function showDialog(title        , body        , footer = "", wide = false) {
  themeMenu.close();
  selectionColors?.hide();
  blockMenus?.close();
  colorMenus?.close();
  rememberSelection();
  previousFocus = document.activeElement;
  overlay.innerHTML = `<div class="scrim"><section class="dialog${
    wide ? " wide" : ""
  }" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header><h2 id="dialog-title">${title}</h2><button class="close" aria-label="关闭">×</button></header><div class="dialog-body">${body}</div>${
    footer ? `<footer>${footer}</footer>` : ""
  }</section></div>`;
  post("dialog", { open: true });
  overlay.querySelector(".close") .addEventListener("click", () => closeDialog());
  overlay.querySelector(".scrim") .addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeDialog();
  });
  overlay.querySelector             ("button,input,select")?.focus();
}

function closeDialog(restoreFocus                  = true) {
  if (overlay.querySelector("[data-export-running]")) return;
  overlay.innerHTML = "";
  toolbar.querySelector("[data-action=settings]") .setAttribute("aria-expanded", "false");
  post("dialog", { open: false });
  if (restoreFocus !== false) (previousFocus                      )?.focus();
}

function showSettingsMenu(body        ) {
  themeMenu.close();
  selectionColors?.hide();
  blockMenus?.close();
  colorMenus?.close();
  rememberSelection();
  previousFocus = document.activeElement;
  const anchor = toolbar.querySelector("[data-action=settings]") ;
  const rect = anchor.getBoundingClientRect();
  overlay.innerHTML = `<section id="settings-menu" class="settings-dropdown" role="region" aria-label="设置"><header><strong>设置</strong><button class="close" aria-label="关闭设置">×</button></header><div class="settings-body">${body}</div><footer><button id="reset-settings">恢复默认</button><button id="settings-done" class="primary">完成</button></footer></section>`;
  const menu = overlay.firstElementChild               ;
  const width = Math.min(450, innerWidth - 16);
  const top = rect.bottom + 4;
  menu.style.width = `${width}px`;
  menu.style.left = `${Math.max(8, Math.min(rect.right - width, innerWidth - width - 8))}px`;
  menu.style.top = `${top}px`;
  menu.style.maxHeight = `${innerHeight - top - 8}px`;
  menu.querySelector(".close") .addEventListener("click", () => closeDialog());
  post("dialog", { open: true });
  anchor.setAttribute("aria-expanded", "true");
  menu.querySelector             ("button")?.focus({ preventScroll: true });
}

function pageWidthControl() {
  const custom = !pageWidths.some(([value]) => value === settings.pageWidth);
  const value = Math.round(pageWidthPixels(settings.pageWidth) || getSurface()?.clientWidth || 960);
  return `<div id="page-width-control"><select id="page-width-select" aria-label="页面宽度">${pageWidths
    .map(([width, label]) => `<option value="${width}" ${settings.pageWidth === width ? "selected" : ""}>${label}</option>`)
    .join("")}<option value="custom" ${custom ? "selected" : ""}>自定义 px</option></select><div id="page-width-custom" ${
    custom ? "" : "hidden"
  }><input id="page-width-pixels" type="number" min="240" max="6000" step="1" value="${value}" aria-label="自定义页面宽度"><span>px</span><button id="page-width-apply" type="button">应用</button></div><small id="page-width-error" role="status"></small></div>`;
}

function bindPageWidth() {
  const picker = overlay.querySelector("#page-width-select")                     ;
  const custom = overlay.querySelector("#page-width-custom")               ;
  const input = overlay.querySelector("#page-width-pixels")                    ;
  picker.onchange = () => {
    custom.hidden = picker.value !== "custom";
    if (picker.value === "custom") {
      input.focus();
      input.select();
    } else void changeSetting("pageWidth", picker.value);
  };
  const apply = () => {
    const width = `${input.value}px`;
    const feedback = overlay.querySelector("#page-width-error") ;
    if (!validPageWidth(width)) {
      feedback.textContent = "请输入 240–6000px 的宽度";
      return;
    }
    feedback.textContent = "";
    if (settings.pageWidth !== width) void changeSetting("pageWidth", width);
  };
  input.onchange = apply;
  input.onkeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      apply();
    }
  };
  (overlay.querySelector("#page-width-apply")                     ).onclick = apply;
}

function showHeadingDialog() {
  showDialog(
    "标题",
    `<div class="heading-picker">${[1, 2, 3, 4, 5, 6]
      .map((n) => `<button data-level="${n}"><strong>H${n}</strong><span>${n} 级标题</span></button>`)
      .join("")}</div>`
  );
  overlay.querySelectorAll             ("[data-level]").forEach(
    (button) =>
      (button.onclick = () => {
        const n = button.dataset.level;
        closeDialog();
        nativeAction("headings", `[data-tag="h${n}"]`);
      })
  );
}

function selectedMarkdown() {
  const surface = getSurface();
  if (surface instanceof HTMLTextAreaElement) return surface.value.slice(surface.selectionStart, surface.selectionEnd);
  const selection = window.getSelection();
  if (!selection?.rangeCount) return "";
  const range = selection.getRangeAt(0);
  const root = document.createElement("div");
  root.append(range.cloneContents());
  let ancestor                 =
    range.commonAncestorContainer instanceof Element ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
  while (ancestor && ancestor !== surface && !/^(P|H[1-6]|LI|TD|TH|PRE|BLOCKQUOTE)$/.test(ancestor.tagName)) {
    if (/^(STRONG|B|EM|I|S|DEL|CODE|A)$/.test(ancestor.tagName)) {
      const wrapper = ancestor.cloneNode(false)           ;
      wrapper.append(...root.childNodes);
      root.append(wrapper);
    }
    ancestor = ancestor.parentElement;
  }
  const html = root.querySelector("p,h1,h2,h3,li") ? root.innerHTML : `<p data-block="0">${root.innerHTML}</p>`;
  return (
    editor.vditor.currentMode === "ir" ? editor.vditor.lute.VditorIRDOM2Md(html) : editor.vditor.lute.VditorDOM2Md(html)
  ).trimEnd();
}

function setColor(property        , color               ) {
  restoreSelection();
  const surface = getSurface();
  if (!(surface instanceof HTMLTextAreaElement)) {
    const node = window.getSelection()?.anchorNode;
    const parent = node instanceof Element ? node : node?.parentElement;
    const span = parent?.closest             ("[data-vm-color]");
    if (span && (window.getSelection()?.isCollapsed || color === null)) {
      if (color) span.style.setProperty(property, color);
      else span.style.removeProperty(property);
      const tokens = [...span.children].filter((c) => c.classList.contains("vm-color-token"));
      if (span.style.length) tokens[0].textContent = `<span style="${span.getAttribute("style")}">`;
      else {
        tokens.forEach((t) => t.remove());
        span.replaceWith(...span.childNodes);
      }
      surface .dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "formatFontColor" }));
      submit();
      return;
    }
  }
  let text = selectedMarkdown();
  if (!text) {
    toast("请先选中需要设置颜色的文字。");
    return;
  }
  if (color === null) text = text.replace(/<span\s+style=["'][^"']*(?:color|background-color)[^"']*["']\s*>|<\/span\s*>/gi, "");
  else {
    text = text
      .split("\n")
      .map((line        ) => {
        if (!line) return "";
        const [, prefix, content] = line.match(/^(\s*(?:(?:#{1,6}|>|[-+*]|\d+[.)])\s+)*(?:\[[ xX]\]\s+)?)(.*)$/) ;
        return `${prefix}<span style="${property}: ${color}">${content}</span>`;
      })
      .join("\n");
  }
  editor.insertMD(text);
  submit();
}

function palette(property        ) {
  const colors = settings[property === "color" ? "textColors" : "backgroundColors"];
  return validPalette(colors) ? colors : defaultColors;
}

async function changeSetting(key        , value     ) {
  const previous = settings[key];
  const update = { value };
  pendingSettings.set(key, update);
  if (key === "theme") settings = { ...settings, colorMode: "auto" };
  settings = { ...settings, [key]: value };
  applySettings();
  try {
    await rpc("setting", { key, value });
  } catch (error     ) {
    if (pendingSettings.get(key) === update) {
      settings = { ...settings, [key]: previous };
      applySettings();
    }
    toast(error.message, true);
  } finally {
    if (pendingSettings.get(key) === update) pendingSettings.delete(key);
  }
}

const select = (key        , values                    ) =>
  `<select data-setting="${key}">${values
    .map(([v, label]) => `<option value="${escapeHTML(v)}" ${String(settings[key]) === v ? "selected" : ""}>${label}</option>`)
    .join("")}</select>`;

const stepper = (key        , suffix        , step        , min        , max        ) =>
  `<div class="stepper"><button data-step="${key}" data-delta="-${step}" aria-label="减小">−</button><output data-output="${key}">${settings[key]}${suffix}</output><button data-step="${key}" data-delta="${step}" aria-label="增大">＋</button><input type="hidden" data-bound="${key}" data-min="${min}" data-max="${max}" data-suffix="${suffix}"></div>`;

function showSettings() {
  if (overlay.querySelector("#settings-menu")) {
    closeDialog();
    return;
  }
  const fonts                     = [
    ["", "默认"],
    ["PingFang SC", "苹方"],
    ["Heiti SC", "黑体"],
    ["Songti SC", "华文宋体"],
    ["Kaiti SC", "华文楷体"],
    ["Microsoft YaHei", "微软雅黑"],
    ["SimSun", "宋体"],
    ["KaiTi", "楷体"],
    ["Arial", "Arial"],
    ["Georgia", "Georgia"],
    ["SF Mono", "SF Mono"],
    ["Menlo", "Menlo"],
    ["Monaco", "Monaco"],
    ["Consolas", "Consolas"]
  ];
  const row = (label        , control        ) => `<div class="setting-row"><span>${label}</span>${control}</div>`;
  showSettingsMenu(
    `<h3>编辑模式</h3><div class="settings-group">${row(
      "模式",
      select("mode", [
        ["ir", "即时渲染"],
        ["wysiwyg", "所见即所得"],
        ["sv", "分屏预览"]
      ])
    )}<button id="configure-shortcuts" class="settings-link">${icon("shortcuts")} 快捷键配置 <span>›</span></button></div>
  <h3>字号</h3><div class="settings-group">${row("UI", stepper("uiFontSize", "px", 1, 10, 24))}${row(
      "正文",
      stepper("editorFontSize", "px", 1, 10, 40)
    )}</div>
  <h3>排版</h3><div class="settings-group">${row("字体", select("fontFamily", fonts))}${row(
      "粗体颜色",
      select("boldColor", [
        ["", "默认"],
        ["#007c91", "青色"],
        ["#1971c2", "蓝色"],
        ["#e53935", "红色"],
        ["#7048e8", "紫色"]
      ])
    )}${row("页面宽度", pageWidthControl())}${row("行高", stepper("lineHeight", "", 0.1, 1, 3))}${row(
      "打字机模式",
      `<input type="checkbox" class="switch" data-setting="typewriterMode" ${settings.typewriterMode ? "checked" : ""} aria-label="打字机模式">`
    )}</div>
  <h3>代码块</h3><div class="settings-group">${row("字体", select("codeFontFamily", fonts))}${row(
      "主题",
      `<select data-setting="codeTheme">${themeSelectOptions(catalog, settings.codeTheme)}</select>`
    )}${row(
      "最大高度",
      select("codeMaxHeight", [
        ["none", "默认"],
        ["240px", "240px"],
        ["400px", "400px"],
        ["60vh", "60vh"]
      ])
    )}</div>
  <h3>图片尺寸</h3><div class="settings-group">${row("最大宽度", stepper("imageMaxWidth", "%", 5, 10, 100))}${row(
      "最大高度",
      stepper("imageMaxHeight", "vh", 5, 10, 100)
    )}</div>
  <h3>更多功能</h3><div class="extra-tools"><button data-extra="image">插入图片</button><button data-extra="emoji">表情</button><button data-extra="line">分隔线</button><button data-extra="inline-code">行内代码</button><button data-extra="outdent">减少缩进</button><button data-extra="indent">增加缩进</button><button data-extra="preview">预览</button></div>
  <h3>导出浏览器</h3><label class="browser-path">Edge / Chrome 路径<input data-setting="browserPath" value="${escapeHTML(
    settings.browserPath
  )}" placeholder="留空自动检测本机浏览器"></label>`
  );
  bindPageWidth();
  overlay.querySelectorAll                                      ("[data-setting]").forEach(
    (input) =>
      (input.onchange = () => {
        void changeSetting(
          input.dataset.setting ,
          input instanceof HTMLInputElement && input.type === "checkbox" ? input.checked : input.value
        );
      })
  );
  overlay.querySelectorAll             ("[data-step]").forEach(
    (button) =>
      (button.onclick = () => {
        const key = button.dataset.step ;
        const bound = overlay.querySelector                  (`[data-bound="${key}"]`) ;
        const value = Math.min(
          Number(bound.dataset.max),
          Math.max(Number(bound.dataset.min), Math.round((Number(settings[key]) + Number(button.dataset.delta)) * 10) / 10)
        );
        void changeSetting(key, value);
        overlay.querySelector(`[data-output="${key}"]`) .textContent = `${value}${bound.dataset.suffix}`;
      })
  );
  (overlay.querySelector("#configure-shortcuts")                     ).onclick = () => {
    closeDialog();
    post("shortcuts");
  };
  (overlay.querySelector("#settings-done")                     ).onclick = closeDialog;
  (overlay.querySelector("#reset-settings")                     ).onclick = async () => {
    await rpc("resetSettings");
    settings = { ...defaults };
    applySettings();
    closeDialog();
    showSettings();
  };
  overlay.querySelectorAll             ("[data-extra]").forEach(
    (b) =>
      (b.onclick = () => {
        closeDialog();
        if (b.dataset.extra === "image") insertImage();
        else if (b.dataset.extra === "emoji") {
          showDialog(
            "插入表情",
            `<div class="emoji-picker">${["😀", "😊", "👍", "❤️", "🎉", "🚀", "✅", "⚠️", "💡", "📌", "📝", "🔥", "👀", "🙏", "✨", "🐱"]
              .map((emoji) => `<button data-emoji="${emoji}">${emoji}</button>`)
              .join("")}</div>`
          );
          overlay.querySelectorAll             ("[data-emoji]").forEach(
            (button) =>
              (button.onclick = () => {
                const emoji = button.dataset.emoji ;
                closeDialog();
                restoreSelection();
                editor.insertMD(emoji);
                submit();
              })
          );
        } else nativeAction(b.dataset.extra );
      })
  );
}

function showTheme() {
  themeMenu.show(toolbar.querySelector("[data-action=theme]") , "theme");
}

function showExport() {
  const x = exportOptions;
  const toggle = (id        , label        , help        ) =>
    `<label class="export-row"><span><strong>${label}</strong><small>${help}</small></span><input type="checkbox" class="switch" id="export-${id}" ${
      x[id] ? "checked" : ""
    }></label>`;
  showDialog(
    `${icon("export")} 导出`,
    `<form id="export-form"><div class="export-row"><strong>格式</strong><div class="format-picker">${["pdf", "html", "docx"]
      .map((v) => `<button type="button" data-format="${v}" class="${x.format === v ? "selected" : ""}">${v.toUpperCase()}</button>`)
      .join("")}</div></div>
  <label class="export-row"><span><strong>顶部边距</strong><small>以像素为单位</small></span><input id="export-topMargin" type="number" min="0" max="300" value="${
    x.topMargin
  }" required></label>
  ${toggle("toc", "目录", "包含可点击目录，PDF 同时生成书签")}${toggle(
      "beautify",
      "美化导出",
      "优化表格、代码块、图片与分页"
    )}${toggle("theme", "应用主题", "使用当前编辑器的颜色")}
  <label class="export-row"><strong>纸张大小</strong><select id="export-paperSize">${["A4", "A3", "Letter"]
      .map((v) => `<option ${x.paperSize === v ? "selected" : ""}>${v}</option>`)
      .join("")}</select></label>
  <div class="export-fonts"><label>字体<select id="export-font">${[
      ["", "默认"],
      ["PingFang SC", "苹方"],
      ["Heiti SC", "黑体"],
      ["Songti SC", "华文宋体"],
      ["Kaiti SC", "华文楷体"],
      ["Microsoft YaHei", "微软雅黑"],
      ["SimSun", "宋体"],
      ["Arial", "Arial"],
      ["Georgia", "Georgia"]
    ]
      .map(([v, label]) => `<option value="${v}" ${x.font === v ? "selected" : ""}>${label}</option>`)
      .join("")}</select></label><label>字号<input type="number" id="export-fontSize" min="8" max="72" value="${
      x.fontSize
    }" required><span>px</span></label></div>
  <label class="export-path">导出目录<div><input id="export-directory" value="${escapeHTML(
    x.directory
  )}" required><button type="button" id="browse-directory">浏览…</button></div></label><p id="export-note" class="muted"></p><p id="export-feedback" role="status"></p></form>`,
    '<button id="cancel-export">取消</button><button id="perform-export" class="primary">导出</button>',
    true
  );
  const setFormat = (format        ) => {
    exportOptions.format = format;
    overlay.querySelectorAll             ("[data-format]").forEach((b) => b.classList.toggle("selected", b.dataset.format === format));
    (overlay.querySelector("#export-paperSize")                     ).disabled = format === "html";
    overlay.querySelector("#export-note") .textContent =
      format === "docx"
        ? "正文与表格可编辑，公式及复杂图表以图片保留。"
        : format === "html"
          ? "生成独立 HTML 文件；纸张大小不适用于 HTML。"
          : "自动使用本机 Edge 或 Chrome，无需打开打印窗口。";
  };
  setFormat(x.format);
  overlay.querySelectorAll             ("[data-format]").forEach((b) => (b.onclick = () => setFormat(b.dataset.format )));
  (overlay.querySelector("#browse-directory")                     ).onclick = async () => {
    const folder = await rpc("browse");
    if (folder) (overlay.querySelector("#export-directory")                    ).value = folder;
  };
  (overlay.querySelector("#cancel-export")                     ).onclick = closeDialog;
  (overlay.querySelector("#perform-export")                     ).onclick = async () => {
    const form = overlay.querySelector("#export-form")                   ;
    if (!form.reportValidity()) return;
    const value = (key        ) => (overlay.querySelector(`#export-${key}`)                                        ).value;
    const checked = (key        ) => (overlay.querySelector(`#export-${key}`)                    ).checked;
    exportOptions = {
      format: exportOptions.format,
      topMargin: Number(value("topMargin")),
      toc: checked("toc"),
      beautify: checked("beautify"),
      theme: checked("theme"),
      paperSize: value("paperSize"),
      font: value("font"),
      fontSize: Number(value("fontSize")),
      directory: value("directory")
    };
    submit();
    const button = overlay.querySelector("#perform-export")                     ;
    button.disabled = true;
    button.dataset.exportRunning = "1";
    button.textContent = "正在导出…";
    try {
      const result = await rpc("export", { options: exportOptions });
      delete button.dataset.exportRunning;
      if (!result?.cancelled) {
        closeDialog();
        toast("导出完成");
      }
    } catch (error     ) {
      overlay.querySelector("#export-feedback") .textContent = error.message;
    } finally {
      delete button.dataset.exportRunning;
      button.disabled = false;
      button.textContent = "导出";
    }
  };
}

function showSearch() {
  let bar = document.getElementById("search-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "search-bar";
    bar.innerHTML =
      '<input id="search-input" type="search" placeholder="搜索当前文档" aria-label="搜索当前文档"><label><input type="checkbox" id="search-case">Aa</label><output id="search-count">0 项</output><button id="search-prev" aria-label="上一处">↑</button><button id="search-next" aria-label="下一处">↓</button><button id="search-close" aria-label="关闭搜索">×</button>';
    toolbar.after(bar);
    bar.querySelector("#search-input") .addEventListener("input", () => {
      searchIndex = -1;
      findText(1);
    });
    bar.querySelector("#search-case") .addEventListener("change", () => {
      searchIndex = -1;
      findText(1);
    });
    bar.querySelector("#search-prev") .addEventListener("click", () => findText(-1));
    bar.querySelector("#search-next") .addEventListener("click", () => findText(1));
    bar.querySelector("#search-close") .addEventListener("click", () => {
      (CSS       ).highlights?.delete("vm-find");
      bar .remove();
    });
    bar.querySelector("#search-input") .addEventListener("keydown", (e) => {
      const key = e                 ;
      if (key.key === "Enter") {
        key.preventDefault();
        findText(key.shiftKey ? -1 : 1);
      }
      if (key.key === "Escape") {
        bar .remove();
        getSurface()?.focus();
      }
    });
  }
  bar.querySelector("input") .focus();
}

function findText(direction        ) {
  const query = (document.getElementById("search-input")                    ).value;
  const matchCase = (document.getElementById("search-case")                    ).checked;
  const surface = getSurface() ;
  const nodes         = [];
  let text = "";
  if (surface instanceof HTMLTextAreaElement) text = surface.value;
  else {
    const walker = document.createTreeWalker(surface, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement ;
        if (!parent.getClientRects().length || parent.closest(".vm-color-token,.vditor-ir__marker,.vditor-wysiwyg__pre,.vditor-ir__marker--pre,script,style")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node             ;
    while ((node = walker.nextNode())) {
      nodes.push(node        );
      text += node.textContent;
    }
  }
  const haystack = matchCase ? text : text.toLocaleLowerCase();
  const needle = matchCase ? query : query.toLocaleLowerCase();
  const matches           = [];
  if (needle) {
    let at = haystack.indexOf(needle);
    while (at >= 0) {
      matches.push(at);
      at = haystack.indexOf(needle, at + Math.max(1, needle.length));
    }
  }
  searchIndex = matches.length ? (searchIndex + direction + matches.length) % matches.length : -1;
  document.getElementById("search-count") .textContent = `${searchIndex < 0 ? 0 : searchIndex + 1} / ${matches.length}`;
  (CSS       ).highlights?.delete("vm-find");
  if (searchIndex < 0) return;
  const start = matches[searchIndex];
  const end = start + query.length;
  if (surface instanceof HTMLTextAreaElement) {
    surface.setSelectionRange(start, end);
    surface.scrollTop = Math.max(
      0,
      text.slice(0, start).split("\n").length * settings.editorFontSize * settings.lineHeight - surface.clientHeight / 2
    );
  } else {
    const range = document.createRange();
    let offset = 0;
    let started = false;
    for (const node of nodes) {
      const next = offset + node.length;
      if (!started && start < next) {
        range.setStart(node, start - offset);
        started = true;
      }
      if (started && end <= next) {
        range.setEnd(node, end - offset);
        break;
      }
      offset = next;
    }
    if ((window       ).Highlight) (CSS       ).highlights.set("vm-find", new (window       ).Highlight(range));
    range.startContainer.parentElement?.scrollIntoView({ block: "center" });
  }
}

function insertImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/png,image/jpeg,image/gif,image/webp,image/bmp";
  input.multiple = true;
  input.onchange = () => {
    if (input.files) void uploadImages([...input.files]);
  };
  input.click();
}

async function uploadImages(files        ) {
  for (const file of files) {
    if (file.size > 20 * 1024 * 1024) {
      toast("图片不能超过 20MB。", true);
      continue;
    }
    try {
      const data = await new Promise        ((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const relative = await rpc("image", { data, mime: file.type });
      restoreSelection();
      editor.insertMD(`![${file.name.replace(/[\[\]]/g, "")}](<${relative}>)`);
      submit();
    } catch (error     ) {
      toast(error.message, true);
    }
  }
}

function action(id        ) {
  if (!initialized) return;
  if (["save", "source", "undo", "redo"].includes(id)) {
    submit();
    post(id);
    return;
  }
  if (id === "outline") {
    void changeSetting("outline", !settings.outline);
    return;
  }
  if (id === "headings") return showHeadingDialog();
  if (id === "textColor" || id === "backgroundColor") {
    return colorMenus?.showPalette(toolbar.querySelector(`[data-action=${id}]`), id === "textColor" ? "color" : "background-color");
  }
  if (id === "settings") return showSettings();
  if (id === "export") return showExport();
  if (id === "theme") return showTheme();
  if (id === "brightness") {
    const next = catalog.themes.find((theme     ) => theme.kind === (document.documentElement.dataset.mode === "dark" ? "light" : "dark"));
    if (next) void changeSetting("theme", next.id);
    return;
  }
  if (id === "shortcuts") {
    post("shortcuts");
    return;
  }
  if (id === "search") return showSearch();
  nativeAction(id);
}

toolbar.addEventListener("pointerdown", (e) => {
  rememberSelection();
  if ((e.target           ).closest("button")) e.preventDefault();
});
toolbar.addEventListener("click", (e) => {
  const button = (e.target           ).closest             ("[data-action]");
  if (button) action(button.dataset.action );
});
document.addEventListener("selectionchange", rememberSelection);
document.addEventListener("keydown", (e) => {
  if (!overlay.childElementCount) return;
  if (e.key === "Escape") {
    e.preventDefault();
    closeDialog();
  }
  if (e.key === "Tab" && overlay.querySelector(".scrim")) {
    const focusable = [...overlay.querySelectorAll             ("button:not(:disabled),input:not([type=hidden]):not(:disabled),select:not(:disabled)")];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
});
document.addEventListener("pointerdown", (event) => {
  const menu = overlay.querySelector("#settings-menu");
  if (menu && !menu.contains(event.target        ) && !(event.target           ).closest("[data-action=settings]")) closeDialog(false);
});
window.addEventListener("resize", () => {
  if (overlay.querySelector("#settings-menu")) closeDialog(false);
});
document.addEventListener("click", (e) => {
  const anchor = (e.target           ).closest("#editor a");
  if (!anchor) return;
  e.preventDefault();
  const href = anchor.getAttribute("href") || "";
  if (href.startsWith("#")) document.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView();
  else post("openLink", { href });
});
document.addEventListener("beforeinput", (e) => {
  if (
    (window       ).acquireVsCodeApi &&
    !overlay.childElementCount &&
    getSurface()?.contains(e.target        ) &&
    (e.inputType === "historyUndo" || e.inputType === "historyRedo")
  ) {
    e.preventDefault();
    action(e.inputType === "historyUndo" ? "undo" : "redo");
  }
});
document.addEventListener(
  "paste",
  (e) => {
    if (!getSurface()?.contains(e.target        )) return;
    let files = [...(e.clipboardData?.files || [])].filter((f) => f.type.startsWith("image/"));
    if (!files.length) {
      files = [...(e.clipboardData?.items || [])]
        .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
        .map((item) => item.getAsFile())
        .filter((file)               => !!file);
    }
    if (files.length) {
      e.preventDefault();
      e.stopImmediatePropagation();
      rememberSelection();
      void uploadImages(files);
    }
  },
  true
);
document.addEventListener(
  "drop",
  (e) => {
    const files = [...(e.dataTransfer?.files || [])].filter((f) => f.type.startsWith("image/"));
    if (files.length && getSurface()?.contains(e.target        )) {
      e.preventDefault();
      e.stopImmediatePropagation();
      rememberSelection();
      void uploadImages(files);
    }
  },
  true
);
window.addEventListener("message", (e) => {
  const m = e.data;
  if (!m || typeof m.type !== "string") return;
  if (m.type === "result" || m.type === "error") {
    const request = requests.get(m.requestId);
    if (request) {
      requests.delete(m.requestId);
      m.type === "error" ? request.reject(new Error(m.message)) : request.resolve(m.value);
    }
    if (m.type === "error") toast(m.message, true);
  } else if (m.type === "document" && initialized) {
    if (m.initial || m.text !== lastSent) applyDocument(m.text, m.version);
    else version = m.version;
  } else if (m.type === "ack") {
    pending.delete(m.seq);
    version = m.version;
    updateStatus();
  } else if (m.type === "saved") toast("已保存");
  else if (m.type === "command") action(m.action);
  else if (m.type === "config") {
    settings = { ...defaults, ...m.settings, ...Object.fromEntries([...pendingSettings].map(([key, update]) => [key, update.value])) };
    dark = m.dark;
    catalog = { themes: m.themes || catalog.themes, activeTheme: m.activeTheme || catalog.activeTheme };
    exportOptions = { ...exportDefaults, ...m.exportDefaults };
    applySettings();
  }
});

applySettings();
editor = new Vditor("editor", {
  cdn: boot.cdn,
  lang: "zh_CN",
  mode: settings.mode,
  height: "100%",
  cache: { enable: false },
  theme: document.documentElement.dataset.mode === "dark" ? "dark" : "classic",
  value: "",
  placeholder: "开始书写 Markdown…",
  outline: { enable: false },
  toolbar: nativeTools.map((name) => ({ name, hotkey: "" })),
  toolbarConfig: { hide: true },
  preview: {
    maxWidth: 1200,
    delay: 200,
    math: { engine: "KaTeX" },
    markdown: { sanitize: true, toc: true, mark: true },
    theme: { current: "light", path: `${boot.cdn}/dist/css/content-theme` }
  },
  input: () => {
    submit();
  },
  after: () => {
    installColorAdapter(editor.vditor.lute);
    toolbarState = installToolbarState(toolbar, editor.vditor.toolbar.element, overlay);
    codeBlocks = installCodeBlocks(editor, {
      openThemeMenu: (anchor             ) => themeMenu.show(anchor, "codeTheme"),
      rpc,
      submit,
      toast
    });
    structures = installStructures(editor, submit);
    blockMenus = installBlockMenus(editor, {
      submit,
      rpc,
      toast,
      beforeOpen: () => {
        closeDialog(false);
        themeMenu.close();
        colorMenus?.close();
        selectionColors?.hide();
      },
      menuState: (open         ) => post("dialog", { open })
    });
    colorMenus = installColorMenus({
      surface: getSurface,
      palette,
      changePalette: (property        , colors          ) => {
        void changeSetting(property === "color" ? "textColors" : "backgroundColors", colors);
      },
      edit: (target         , styles                               ) => {
        try {
          const caret = editTextStyles(target, styles, editor.vditor.lute, editor.vditor.currentMode);
          for (const preview of caret.querySelectorAll('.vditor-ir__preview[data-render="2"]')) {
            processCodeRender(preview, editor.vditor);
          }
          const surface = getSurface() ;
          surface.focus({ preventScroll: true });
          const range = document.createRange();
          range.selectNodeContents(caret);
          range.collapse(false);
          getSelection()?.removeAllRanges();
          getSelection()?.addRange(range);
          surface.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "formatFontColor" }));
          submit();
        } catch (error     ) {
          toast(error.message, true);
        }
      },
      blocked: () => !!overlay.childElementCount || themeMenu.isOpen() || !!blockMenus?.isOpen(),
      beforeOpen: () => {
        closeDialog(false);
        themeMenu.close();
        blockMenus?.close();
        selectionColors?.hide();
      },
      menuState: (open         ) => post("dialog", { open })
    });
    const outline = document.createElement("nav");
    outline.id = "outline";
    outline.setAttribute("aria-label", "文档大纲");
    const divider = document.createElement("div");
    divider.id = "outline-resizer";
    divider.tabIndex = 0;
    divider.setAttribute("role", "separator");
    divider.setAttribute("aria-label", "调整大纲宽度");
    divider.setAttribute("aria-orientation", "vertical");
    editor.vditor.element.querySelector(".vditor-content").prepend(outline, divider);
    outlineResize = installOutlineResize(outline, divider, {
      width: () => settings.outlineWidth,
      change: (width        ) => {
        void changeSetting("outlineWidth", width);
      }
    });
    outline.addEventListener("click", (e) => {
      const heading = (e.target           ).closest             ("[data-heading]");
      if (heading) navigateHeading(Number(heading.dataset.heading));
    });
    initialized = true;
    baseline = getValue();
    applySettings();
    post("ready");
    selectionColors = installSelectionColors({
      surface: getSurface,
      palette,
      blocked: () => !!overlay.childElementCount || themeMenu.isOpen() || !!blockMenus?.isOpen() || !!colorMenus?.isOpen(),
      remember: rememberSelection,
      apply: setColor
    });
    (window       ).VM_APP = { editor, action, getValue, applyDocument, submit, settings: () => settings, documentVersion: () => version, ready: true };
  }
});

})();
})();