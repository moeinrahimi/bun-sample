// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  var Events = function() {
  };
  var EE = function(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  };
  var addListener = function(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  };
  var clearEvent = function(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events;
    else
      delete emitter._events[evt];
  };
  var EventEmitter = function() {
    this._events = new Events;
    this._eventsCount = 0;
  };
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS((exports, module) => {
  var decodeURIComponent2 = function(uri) {
    var percentPosition = uri.indexOf("%");
    if (percentPosition === -1)
      return uri;
    var length = uri.length;
    var decoded = "";
    var last = 0;
    var codepoint = 0;
    var startOfOctets = percentPosition;
    var state = UTF8_ACCEPT;
    while (percentPosition > -1 && percentPosition < length) {
      var high = hexCodeToInt(uri[percentPosition + 1], 4);
      var low = hexCodeToInt(uri[percentPosition + 2], 0);
      var byte = high | low;
      var type47 = UTF8_DATA[byte];
      state = UTF8_DATA[256 + state + type47];
      codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type47];
      if (state === UTF8_ACCEPT) {
        decoded += uri.slice(last, startOfOctets);
        decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023));
        codepoint = 0;
        last = percentPosition + 3;
        percentPosition = startOfOctets = uri.indexOf("%", last);
      } else if (state === UTF8_REJECT) {
        return null;
      } else {
        percentPosition += 3;
        if (percentPosition < length && uri.charCodeAt(percentPosition) === 37)
          continue;
        return null;
      }
    }
    return decoded + uri.slice(last);
  };
  var hexCodeToInt = function(c, shift) {
    var i = HEX[c];
    return i === undefined ? 255 : i << shift;
  };
  var UTF8_ACCEPT = 12;
  var UTF8_REJECT = 0;
  var UTF8_DATA = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  var HEX = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  module.exports = decodeURIComponent2;
});

// node_modules/fast-querystring/lib/parse.js
var require_parse = __commonJS((exports, module) => {
  var parse5 = function(input) {
    const result = new Empty;
    if (typeof input !== "string") {
      return result;
    }
    let inputLength = input.length;
    let key = "";
    let value11 = "";
    let startingIndex = -1;
    let equalityIndex = -1;
    let shouldDecodeKey = false;
    let shouldDecodeValue = false;
    let keyHasPlus = false;
    let valueHasPlus = false;
    let hasBothKeyValuePair = false;
    let c = 0;
    for (let i = 0;i < inputLength + 1; i++) {
      c = i !== inputLength ? input.charCodeAt(i) : 38;
      if (c === 38) {
        hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair) {
          equalityIndex = i;
        }
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus) {
            key = key.replace(plusRegex, " ");
          }
          if (shouldDecodeKey) {
            key = fastDecode(key) || key;
          }
          if (hasBothKeyValuePair) {
            value11 = input.slice(equalityIndex + 1, i);
            if (valueHasPlus) {
              value11 = value11.replace(plusRegex, " ");
            }
            if (shouldDecodeValue) {
              value11 = fastDecode(value11) || value11;
            }
          }
          const currentValue = result[key];
          if (currentValue === undefined) {
            result[key] = value11;
          } else {
            if (currentValue.pop) {
              currentValue.push(value11);
            } else {
              result[key] = [currentValue, value11];
            }
          }
        }
        value11 = "";
        startingIndex = i;
        equalityIndex = i;
        shouldDecodeKey = false;
        shouldDecodeValue = false;
        keyHasPlus = false;
        valueHasPlus = false;
      } else if (c === 61) {
        if (equalityIndex <= startingIndex) {
          equalityIndex = i;
        } else {
          shouldDecodeValue = true;
        }
      } else if (c === 43) {
        if (equalityIndex > startingIndex) {
          valueHasPlus = true;
        } else {
          keyHasPlus = true;
        }
      } else if (c === 37) {
        if (equalityIndex > startingIndex) {
          shouldDecodeValue = true;
        } else {
          shouldDecodeKey = true;
        }
      }
    }
    return result;
  };
  var fastDecode = require_fast_decode_uri_component();
  var plusRegex = /\+/g;
  var Empty = function() {
  };
  Empty.prototype = Object.create(null);
  module.exports = parse5;
});

// node_modules/fast-querystring/lib/internals/querystring.js
var require_querystring = __commonJS((exports, module) => {
  var encodeString = function(str) {
    const len = str.length;
    if (len === 0)
      return "";
    let out = "";
    let lastPos = 0;
    let i = 0;
    outer:
      for (;i < len; i++) {
        let c = str.charCodeAt(i);
        while (c < 128) {
          if (noEscape[c] !== 1) {
            if (lastPos < i)
              out += str.slice(lastPos, i);
            lastPos = i + 1;
            out += hexTable[c];
          }
          if (++i === len)
            break outer;
          c = str.charCodeAt(i);
        }
        if (lastPos < i)
          out += str.slice(lastPos, i);
        if (c < 2048) {
          lastPos = i + 1;
          out += hexTable[192 | c >> 6] + hexTable[128 | c & 63];
          continue;
        }
        if (c < 55296 || c >= 57344) {
          lastPos = i + 1;
          out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          continue;
        }
        ++i;
        if (i >= len) {
          throw new Error("URI malformed");
        }
        const c2 = str.charCodeAt(i) & 1023;
        lastPos = i + 1;
        c = 65536 + ((c & 1023) << 10 | c2);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
    if (lastPos === 0)
      return str;
    if (lastPos < len)
      return out + str.slice(lastPos);
    return out;
  };
  var hexTable = Array.from({ length: 256 }, (_, i) => "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  var noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  module.exports = { encodeString };
});

// node_modules/fast-querystring/lib/stringify.js
var require_stringify = __commonJS((exports, module) => {
  var getAsPrimitive = function(value11) {
    const type47 = typeof value11;
    if (type47 === "string") {
      return encodeString(value11);
    } else if (type47 === "bigint") {
      return value11.toString();
    } else if (type47 === "boolean") {
      return value11 ? "true" : "false";
    } else if (type47 === "number" && Number.isFinite(value11)) {
      return value11 < 1000000000000000000000 ? "" + value11 : encodeString("" + value11);
    }
    return "";
  };
  var stringify = function(input) {
    let result = "";
    if (input === null || typeof input !== "object") {
      return result;
    }
    const separator = "&";
    const keys = Object.keys(input);
    const keyLength = keys.length;
    let valueLength = 0;
    for (let i = 0;i < keyLength; i++) {
      const key = keys[i];
      const value11 = input[key];
      const encodedKey = encodeString(key) + "=";
      if (i) {
        result += separator;
      }
      if (Array.isArray(value11)) {
        valueLength = value11.length;
        for (let j = 0;j < valueLength; j++) {
          if (j) {
            result += separator;
          }
          result += encodedKey;
          result += getAsPrimitive(value11[j]);
        }
      } else {
        result += encodedKey;
        result += getAsPrimitive(value11);
      }
    }
    return result;
  };
  var { encodeString } = require_querystring();
  module.exports = stringify;
});

// node_modules/fast-querystring/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var parse5 = require_parse();
  var stringify = require_stringify();
  var fastQuerystring = {
    parse: parse5,
    stringify
  };
  module.exports = fastQuerystring;
  module.exports.default = fastQuerystring;
  module.exports.parse = parse5;
  module.exports.stringify = stringify;
});

// node_modules/lodash.clonedeep/index.js
var require_lodash = __commonJS((exports, module) => {
  var addMapEntry = function(map3, pair) {
    map3.set(pair[0], pair[1]);
    return map3;
  };
  var addSetEntry = function(set2, value15) {
    set2.add(value15);
    return set2;
  };
  var arrayEach = function(array5, iteratee) {
    var index = -1, length = array5 ? array5.length : 0;
    while (++index < length) {
      if (iteratee(array5[index], index, array5) === false) {
        break;
      }
    }
    return array5;
  };
  var arrayPush = function(array5, values) {
    var index = -1, length = values.length, offset = array5.length;
    while (++index < length) {
      array5[offset + index] = values[index];
    }
    return array5;
  };
  var arrayReduce = function(array5, iteratee, accumulator, initAccum) {
    var index = -1, length = array5 ? array5.length : 0;
    if (initAccum && length) {
      accumulator = array5[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array5[index], index, array5);
    }
    return accumulator;
  };
  var baseTimes = function(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  };
  var getValue = function(object13, key) {
    return object13 == null ? undefined : object13[key];
  };
  var isHostObject = function(value15) {
    var result = false;
    if (value15 != null && typeof value15.toString != "function") {
      try {
        result = !!(value15 + "");
      } catch (e2) {
      }
    }
    return result;
  };
  var mapToArray = function(map3) {
    var index = -1, result = Array(map3.size);
    map3.forEach(function(value15, key) {
      result[++index] = [key, value15];
    });
    return result;
  };
  var overArg = function(func, transform7) {
    return function(arg) {
      return func(transform7(arg));
    };
  };
  var setToArray = function(set2) {
    var index = -1, result = Array(set2.size);
    set2.forEach(function(value15) {
      result[++index] = value15;
    });
    return result;
  };
  var Hash3 = function(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  };
  var hashClear = function() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  };
  var hashDelete = function(key) {
    return this.has(key) && delete this.__data__[key];
  };
  var hashGet = function(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  };
  var hashHas = function(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  };
  var hashSet = function(key, value15) {
    var data = this.__data__;
    data[key] = nativeCreate && value15 === undefined ? HASH_UNDEFINED : value15;
    return this;
  };
  var ListCache = function(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  };
  var listCacheClear = function() {
    this.__data__ = [];
  };
  var listCacheDelete = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  };
  var listCacheGet = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  };
  var listCacheHas = function(key) {
    return assocIndexOf(this.__data__, key) > -1;
  };
  var listCacheSet = function(key, value15) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value15]);
    } else {
      data[index][1] = value15;
    }
    return this;
  };
  var MapCache = function(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  };
  var mapCacheClear = function() {
    this.__data__ = {
      hash: new Hash3,
      map: new (Map2 || ListCache),
      string: new Hash3
    };
  };
  var mapCacheDelete = function(key) {
    return getMapData(this, key)["delete"](key);
  };
  var mapCacheGet = function(key) {
    return getMapData(this, key).get(key);
  };
  var mapCacheHas = function(key) {
    return getMapData(this, key).has(key);
  };
  var mapCacheSet = function(key, value15) {
    getMapData(this, key).set(key, value15);
    return this;
  };
  var Stack = function(entries) {
    this.__data__ = new ListCache(entries);
  };
  var stackClear = function() {
    this.__data__ = new ListCache;
  };
  var stackDelete = function(key) {
    return this.__data__["delete"](key);
  };
  var stackGet = function(key) {
    return this.__data__.get(key);
  };
  var stackHas = function(key) {
    return this.__data__.has(key);
  };
  var stackSet = function(key, value15) {
    var cache = this.__data__;
    if (cache instanceof ListCache) {
      var pairs = cache.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value15]);
        return this;
      }
      cache = this.__data__ = new MapCache(pairs);
    }
    cache.set(key, value15);
    return this;
  };
  var arrayLikeKeys = function(value15, inherited) {
    var result = isArray(value15) || isArguments(value15) ? baseTimes(value15.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value15) {
      if ((inherited || hasOwnProperty.call(value15, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  };
  var assignValue = function(object13, key, value15) {
    var objValue = object13[key];
    if (!(hasOwnProperty.call(object13, key) && eq(objValue, value15)) || value15 === undefined && !(key in object13)) {
      object13[key] = value15;
    }
  };
  var assocIndexOf = function(array5, key) {
    var length = array5.length;
    while (length--) {
      if (eq(array5[length][0], key)) {
        return length;
      }
    }
    return -1;
  };
  var baseAssign = function(object13, source) {
    return object13 && copyObject(source, keys(source), object13);
  };
  var baseClone = function(value15, isDeep, isFull, customizer, key, object13, stack) {
    var result;
    if (customizer) {
      result = object13 ? customizer(value15, key, object13, stack) : customizer(value15);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject2(value15)) {
      return value15;
    }
    var isArr = isArray(value15);
    if (isArr) {
      result = initCloneArray(value15);
      if (!isDeep) {
        return copyArray(value15, result);
      }
    } else {
      var tag = getTag(value15), isFunc = tag == funcTag || tag == genTag;
      if (isBuffer(value15)) {
        return cloneBuffer(value15, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object13) {
        if (isHostObject(value15)) {
          return object13 ? value15 : {};
        }
        result = initCloneObject(isFunc ? {} : value15);
        if (!isDeep) {
          return copySymbols(value15, baseAssign(result, value15));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object13 ? value15 : {};
        }
        result = initCloneByTag(value15, tag, baseClone, isDeep);
      }
    }
    stack || (stack = new Stack);
    var stacked = stack.get(value15);
    if (stacked) {
      return stacked;
    }
    stack.set(value15, result);
    if (!isArr) {
      var props = isFull ? getAllKeys(value15) : keys(value15);
    }
    arrayEach(props || value15, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value15[key2];
      }
      assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value15, stack));
    });
    return result;
  };
  var baseCreate = function(proto) {
    return isObject2(proto) ? objectCreate(proto) : {};
  };
  var baseGetAllKeys = function(object13, keysFunc, symbolsFunc) {
    var result = keysFunc(object13);
    return isArray(object13) ? result : arrayPush(result, symbolsFunc(object13));
  };
  var baseGetTag = function(value15) {
    return objectToString.call(value15);
  };
  var baseIsNative = function(value15) {
    if (!isObject2(value15) || isMasked(value15)) {
      return false;
    }
    var pattern3 = isFunction(value15) || isHostObject(value15) ? reIsNative : reIsHostCtor;
    return pattern3.test(toSource(value15));
  };
  var baseKeys = function(object13) {
    if (!isPrototype(object13)) {
      return nativeKeys(object13);
    }
    var result = [];
    for (var key in Object(object13)) {
      if (hasOwnProperty.call(object13, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  };
  var cloneBuffer = function(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  };
  var cloneArrayBuffer = function(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array3(result).set(new Uint8Array3(arrayBuffer));
    return result;
  };
  var cloneDataView = function(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  };
  var cloneMap = function(map3, isDeep, cloneFunc) {
    var array5 = isDeep ? cloneFunc(mapToArray(map3), true) : mapToArray(map3);
    return arrayReduce(array5, addMapEntry, new map3.constructor);
  };
  var cloneRegExp = function(regexp4) {
    var result = new regexp4.constructor(regexp4.source, reFlags.exec(regexp4));
    result.lastIndex = regexp4.lastIndex;
    return result;
  };
  var cloneSet = function(set2, isDeep, cloneFunc) {
    var array5 = isDeep ? cloneFunc(setToArray(set2), true) : setToArray(set2);
    return arrayReduce(array5, addSetEntry, new set2.constructor);
  };
  var cloneSymbol = function(symbol5) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol5)) : {};
  };
  var cloneTypedArray = function(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  };
  var copyArray = function(source, array5) {
    var index = -1, length = source.length;
    array5 || (array5 = Array(length));
    while (++index < length) {
      array5[index] = source[index];
    }
    return array5;
  };
  var copyObject = function(source, props, object13, customizer) {
    object13 || (object13 = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object13[key], source[key], key, object13, source) : undefined;
      assignValue(object13, key, newValue === undefined ? source[key] : newValue);
    }
    return object13;
  };
  var copySymbols = function(source, object13) {
    return copyObject(source, getSymbols(source), object13);
  };
  var getAllKeys = function(object13) {
    return baseGetAllKeys(object13, keys, getSymbols);
  };
  var getMapData = function(map3, key) {
    var data = map3.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  };
  var getNative = function(object13, key) {
    var value15 = getValue(object13, key);
    return baseIsNative(value15) ? value15 : undefined;
  };
  var initCloneArray = function(array5) {
    var length = array5.length, result = array5.constructor(length);
    if (length && typeof array5[0] == "string" && hasOwnProperty.call(array5, "index")) {
      result.index = array5.index;
      result.input = array5.input;
    }
    return result;
  };
  var initCloneObject = function(object13) {
    return typeof object13.constructor == "function" && !isPrototype(object13) ? baseCreate(getPrototype(object13)) : {};
  };
  var initCloneByTag = function(object13, tag, cloneFunc, isDeep) {
    var Ctor = object13.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object13);
      case boolTag:
      case dateTag:
        return new Ctor(+object13);
      case dataViewTag:
        return cloneDataView(object13, isDeep);
      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object13, isDeep);
      case mapTag:
        return cloneMap(object13, isDeep, cloneFunc);
      case numberTag:
      case stringTag:
        return new Ctor(object13);
      case regexpTag:
        return cloneRegExp(object13);
      case setTag:
        return cloneSet(object13, isDeep, cloneFunc);
      case symbolTag:
        return cloneSymbol(object13);
    }
  };
  var isIndex = function(value15, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value15 == "number" || reIsUint.test(value15)) && (value15 > -1 && value15 % 1 == 0 && value15 < length);
  };
  var isKeyable = function(value15) {
    var type47 = typeof value15;
    return type47 == "string" || type47 == "number" || type47 == "symbol" || type47 == "boolean" ? value15 !== "__proto__" : value15 === null;
  };
  var isMasked = function(func) {
    return !!maskSrcKey && maskSrcKey in func;
  };
  var isPrototype = function(value15) {
    var Ctor = value15 && value15.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value15 === proto;
  };
  var toSource = function(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e2) {
      }
      try {
        return func + "";
      } catch (e2) {
      }
    }
    return "";
  };
  var cloneDeep = function(value15) {
    return baseClone(value15, true, true);
  };
  var eq = function(value15, other) {
    return value15 === other || value15 !== value15 && other !== other;
  };
  var isArguments = function(value15) {
    return isArrayLikeObject(value15) && hasOwnProperty.call(value15, "callee") && (!propertyIsEnumerable.call(value15, "callee") || objectToString.call(value15) == argsTag);
  };
  var isArrayLike = function(value15) {
    return value15 != null && isLength(value15.length) && !isFunction(value15);
  };
  var isArrayLikeObject = function(value15) {
    return isObjectLike(value15) && isArrayLike(value15);
  };
  var isFunction = function(value15) {
    var tag = isObject2(value15) ? objectToString.call(value15) : "";
    return tag == funcTag || tag == genTag;
  };
  var isLength = function(value15) {
    return typeof value15 == "number" && value15 > -1 && value15 % 1 == 0 && value15 <= MAX_SAFE_INTEGER;
  };
  var isObject2 = function(value15) {
    var type47 = typeof value15;
    return !!value15 && (type47 == "object" || type47 == "function");
  };
  var isObjectLike = function(value15) {
    return !!value15 && typeof value15 == "object";
  };
  var keys = function(object13) {
    return isArrayLike(object13) ? arrayLikeKeys(object13) : baseKeys(object13);
  };
  var stubArray = function() {
    return [];
  };
  var stubFalse = function() {
    return false;
  };
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]";
  var arrayTag = "[object Array]";
  var boolTag = "[object Boolean]";
  var dateTag = "[object Date]";
  var errorTag = "[object Error]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var mapTag = "[object Map]";
  var numberTag = "[object Number]";
  var objectTag = "[object Object]";
  var promiseTag = "[object Promise]";
  var regexpTag = "[object RegExp]";
  var setTag = "[object Set]";
  var stringTag = "[object String]";
  var symbolTag = "[object Symbol]";
  var weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]";
  var dataViewTag = "[object DataView]";
  var float32Tag = "[object Float32Array]";
  var float64Tag = "[object Float64Array]";
  var int8Tag = "[object Int8Array]";
  var int16Tag = "[object Int16Array]";
  var int32Tag = "[object Int32Array]";
  var uint8Tag = "[object Uint8Array]";
  var uint8ClampedTag = "[object Uint8ClampedArray]";
  var uint16Tag = "[object Uint16Array]";
  var uint32Tag = "[object Uint32Array]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reFlags = /\w*$/;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var arrayProto = Array.prototype;
  var funcProto = Function.prototype;
  var objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  var Buffer2 = moduleExports ? root.Buffer : undefined;
  var Symbol3 = root.Symbol;
  var Uint8Array3 = root.Uint8Array;
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  var objectCreate = Object.create;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined;
  var nativeKeys = overArg(Object.keys, Object);
  var DataView2 = getNative(root, "DataView");
  var Map2 = getNative(root, "Map");
  var Promise3 = getNative(root, "Promise");
  var Set5 = getNative(root, "Set");
  var WeakMap2 = getNative(root, "WeakMap");
  var nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView2);
  var mapCtorString = toSource(Map2);
  var promiseCtorString = toSource(Promise3);
  var setCtorString = toSource(Set5);
  var weakMapCtorString = toSource(WeakMap2);
  var symbolProto = Symbol3 ? Symbol3.prototype : undefined;
  var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
  Hash3.prototype.clear = hashClear;
  Hash3.prototype["delete"] = hashDelete;
  Hash3.prototype.get = hashGet;
  Hash3.prototype.has = hashHas;
  Hash3.prototype.set = hashSet;
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;
  if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2) != mapTag || Promise3 && getTag(Promise3.resolve()) != promiseTag || Set5 && getTag(new Set5) != setTag || WeakMap2 && getTag(new WeakMap2) != weakMapTag) {
    getTag = function(value15) {
      var result = objectToString.call(value15), Ctor = result == objectTag ? value15.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : undefined;
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  var isArray = Array.isArray;
  var isBuffer = nativeIsBuffer || stubFalse;
  module.exports = cloneDeep;
});

// ../node_modules/negotiator/lib/charset.js
var require_charset = __commonJS((exports, module) => {
  var parseAcceptCharset = function(accept) {
    var accepts = accept.split(",");
    for (var i = 0, j = 0;i < accepts.length; i++) {
      var charset = parseCharset(accepts[i].trim(), i);
      if (charset) {
        accepts[j++] = charset;
      }
    }
    accepts.length = j;
    return accepts;
  };
  var parseCharset = function(str, i) {
    var match = simpleCharsetRegExp.exec(str);
    if (!match)
      return null;
    var charset = match[1];
    var q = 1;
    if (match[2]) {
      var params = match[2].split(";");
      for (var j = 0;j < params.length; j++) {
        var p = params[j].trim().split("=");
        if (p[0] === "q") {
          q = parseFloat(p[1]);
          break;
        }
      }
    }
    return {
      charset,
      q,
      i
    };
  };
  var getCharsetPriority = function(charset, accepted, index) {
    var priority = { o: -1, q: 0, s: 0 };
    for (var i = 0;i < accepted.length; i++) {
      var spec = specify(charset, accepted[i], index);
      if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
        priority = spec;
      }
    }
    return priority;
  };
  var specify = function(charset, spec, index) {
    var s = 0;
    if (spec.charset.toLowerCase() === charset.toLowerCase()) {
      s |= 1;
    } else if (spec.charset !== "*") {
      return null;
    }
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s
    };
  };
  var preferredCharsets = function(accept, provided) {
    var accepts = parseAcceptCharset(accept === undefined ? "*" : accept || "");
    if (!provided) {
      return accepts.filter(isQuality).sort(compareSpecs).map(getFullCharset);
    }
    var priorities = provided.map(function getPriority(type47, index) {
      return getCharsetPriority(type47, accepts, index);
    });
    return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
      return provided[priorities.indexOf(priority)];
    });
  };
  var compareSpecs = function(a2, b) {
    return b.q - a2.q || b.s - a2.s || a2.o - b.o || a2.i - b.i || 0;
  };
  var getFullCharset = function(spec) {
    return spec.charset;
  };
  var isQuality = function(spec) {
    return spec.q > 0;
  };
  module.exports = preferredCharsets;
  module.exports.preferredCharsets = preferredCharsets;
  var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
});

// ../node_modules/negotiator/lib/encoding.js
var require_encoding = __commonJS((exports, module) => {
  var parseAcceptEncoding = function(accept) {
    var accepts = accept.split(",");
    var hasIdentity = false;
    var minQuality = 1;
    for (var i = 0, j = 0;i < accepts.length; i++) {
      var encoding = parseEncoding(accepts[i].trim(), i);
      if (encoding) {
        accepts[j++] = encoding;
        hasIdentity = hasIdentity || specify("identity", encoding);
        minQuality = Math.min(minQuality, encoding.q || 1);
      }
    }
    if (!hasIdentity) {
      accepts[j++] = {
        encoding: "identity",
        q: minQuality,
        i
      };
    }
    accepts.length = j;
    return accepts;
  };
  var parseEncoding = function(str, i) {
    var match = simpleEncodingRegExp.exec(str);
    if (!match)
      return null;
    var encoding = match[1];
    var q = 1;
    if (match[2]) {
      var params = match[2].split(";");
      for (var j = 0;j < params.length; j++) {
        var p = params[j].trim().split("=");
        if (p[0] === "q") {
          q = parseFloat(p[1]);
          break;
        }
      }
    }
    return {
      encoding,
      q,
      i
    };
  };
  var getEncodingPriority = function(encoding, accepted, index) {
    var priority = { o: -1, q: 0, s: 0 };
    for (var i = 0;i < accepted.length; i++) {
      var spec = specify(encoding, accepted[i], index);
      if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
        priority = spec;
      }
    }
    return priority;
  };
  var specify = function(encoding, spec, index) {
    var s = 0;
    if (spec.encoding.toLowerCase() === encoding.toLowerCase()) {
      s |= 1;
    } else if (spec.encoding !== "*") {
      return null;
    }
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s
    };
  };
  var preferredEncodings = function(accept, provided) {
    var accepts = parseAcceptEncoding(accept || "");
    if (!provided) {
      return accepts.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
    }
    var priorities = provided.map(function getPriority(type47, index) {
      return getEncodingPriority(type47, accepts, index);
    });
    return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
      return provided[priorities.indexOf(priority)];
    });
  };
  var compareSpecs = function(a2, b) {
    return b.q - a2.q || b.s - a2.s || a2.o - b.o || a2.i - b.i || 0;
  };
  var getFullEncoding = function(spec) {
    return spec.encoding;
  };
  var isQuality = function(spec) {
    return spec.q > 0;
  };
  module.exports = preferredEncodings;
  module.exports.preferredEncodings = preferredEncodings;
  var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
});

// ../node_modules/negotiator/lib/language.js
var require_language = __commonJS((exports, module) => {
  var parseAcceptLanguage = function(accept) {
    var accepts = accept.split(",");
    for (var i = 0, j = 0;i < accepts.length; i++) {
      var language = parseLanguage(accepts[i].trim(), i);
      if (language) {
        accepts[j++] = language;
      }
    }
    accepts.length = j;
    return accepts;
  };
  var parseLanguage = function(str, i) {
    var match = simpleLanguageRegExp.exec(str);
    if (!match)
      return null;
    var prefix = match[1];
    var suffix = match[2];
    var full = prefix;
    if (suffix)
      full += "-" + suffix;
    var q = 1;
    if (match[3]) {
      var params = match[3].split(";");
      for (var j = 0;j < params.length; j++) {
        var p = params[j].split("=");
        if (p[0] === "q")
          q = parseFloat(p[1]);
      }
    }
    return {
      prefix,
      suffix,
      q,
      i,
      full
    };
  };
  var getLanguagePriority = function(language, accepted, index) {
    var priority = { o: -1, q: 0, s: 0 };
    for (var i = 0;i < accepted.length; i++) {
      var spec = specify(language, accepted[i], index);
      if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
        priority = spec;
      }
    }
    return priority;
  };
  var specify = function(language, spec, index) {
    var p = parseLanguage(language);
    if (!p)
      return null;
    var s = 0;
    if (spec.full.toLowerCase() === p.full.toLowerCase()) {
      s |= 4;
    } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
      s |= 2;
    } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
      s |= 1;
    } else if (spec.full !== "*") {
      return null;
    }
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s
    };
  };
  var preferredLanguages = function(accept, provided) {
    var accepts = parseAcceptLanguage(accept === undefined ? "*" : accept || "");
    if (!provided) {
      return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
    }
    var priorities = provided.map(function getPriority(type47, index) {
      return getLanguagePriority(type47, accepts, index);
    });
    return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
      return provided[priorities.indexOf(priority)];
    });
  };
  var compareSpecs = function(a2, b) {
    return b.q - a2.q || b.s - a2.s || a2.o - b.o || a2.i - b.i || 0;
  };
  var getFullLanguage = function(spec) {
    return spec.full;
  };
  var isQuality = function(spec) {
    return spec.q > 0;
  };
  module.exports = preferredLanguages;
  module.exports.preferredLanguages = preferredLanguages;
  var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
});

// ../node_modules/negotiator/lib/mediaType.js
var require_mediaType = __commonJS((exports, module) => {
  var parseAccept = function(accept) {
    var accepts = splitMediaTypes(accept);
    for (var i = 0, j = 0;i < accepts.length; i++) {
      var mediaType = parseMediaType(accepts[i].trim(), i);
      if (mediaType) {
        accepts[j++] = mediaType;
      }
    }
    accepts.length = j;
    return accepts;
  };
  var parseMediaType = function(str, i) {
    var match = simpleMediaTypeRegExp.exec(str);
    if (!match)
      return null;
    var params = Object.create(null);
    var q = 1;
    var subtype = match[2];
    var type47 = match[1];
    if (match[3]) {
      var kvps = splitParameters(match[3]).map(splitKeyValuePair);
      for (var j = 0;j < kvps.length; j++) {
        var pair = kvps[j];
        var key = pair[0].toLowerCase();
        var val = pair[1];
        var value15 = val && val[0] === '"' && val[val.length - 1] === '"' ? val.substr(1, val.length - 2) : val;
        if (key === "q") {
          q = parseFloat(value15);
          break;
        }
        params[key] = value15;
      }
    }
    return {
      type: type47,
      subtype,
      params,
      q,
      i
    };
  };
  var getMediaTypePriority = function(type47, accepted, index) {
    var priority = { o: -1, q: 0, s: 0 };
    for (var i = 0;i < accepted.length; i++) {
      var spec = specify(type47, accepted[i], index);
      if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
        priority = spec;
      }
    }
    return priority;
  };
  var specify = function(type47, spec, index) {
    var p = parseMediaType(type47);
    var s = 0;
    if (!p) {
      return null;
    }
    if (spec.type.toLowerCase() == p.type.toLowerCase()) {
      s |= 4;
    } else if (spec.type != "*") {
      return null;
    }
    if (spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
      s |= 2;
    } else if (spec.subtype != "*") {
      return null;
    }
    var keys = Object.keys(spec.params);
    if (keys.length > 0) {
      if (keys.every(function(k) {
        return spec.params[k] == "*" || (spec.params[k] || "").toLowerCase() == (p.params[k] || "").toLowerCase();
      })) {
        s |= 1;
      } else {
        return null;
      }
    }
    return {
      i: index,
      o: spec.i,
      q: spec.q,
      s
    };
  };
  var preferredMediaTypes = function(accept, provided) {
    var accepts = parseAccept(accept === undefined ? "*/*" : accept || "");
    if (!provided) {
      return accepts.filter(isQuality).sort(compareSpecs).map(getFullType);
    }
    var priorities = provided.map(function getPriority(type47, index) {
      return getMediaTypePriority(type47, accepts, index);
    });
    return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
      return provided[priorities.indexOf(priority)];
    });
  };
  var compareSpecs = function(a2, b) {
    return b.q - a2.q || b.s - a2.s || a2.o - b.o || a2.i - b.i || 0;
  };
  var getFullType = function(spec) {
    return spec.type + "/" + spec.subtype;
  };
  var isQuality = function(spec) {
    return spec.q > 0;
  };
  var quoteCount = function(string7) {
    var count = 0;
    var index = 0;
    while ((index = string7.indexOf('"', index)) !== -1) {
      count++;
      index++;
    }
    return count;
  };
  var splitKeyValuePair = function(str) {
    var index = str.indexOf("=");
    var key;
    var val;
    if (index === -1) {
      key = str;
    } else {
      key = str.substr(0, index);
      val = str.substr(index + 1);
    }
    return [key, val];
  };
  var splitMediaTypes = function(accept) {
    var accepts = accept.split(",");
    for (var i = 1, j = 0;i < accepts.length; i++) {
      if (quoteCount(accepts[j]) % 2 == 0) {
        accepts[++j] = accepts[i];
      } else {
        accepts[j] += "," + accepts[i];
      }
    }
    accepts.length = j + 1;
    return accepts;
  };
  var splitParameters = function(str) {
    var parameters4 = str.split(";");
    for (var i = 1, j = 0;i < parameters4.length; i++) {
      if (quoteCount(parameters4[j]) % 2 == 0) {
        parameters4[++j] = parameters4[i];
      } else {
        parameters4[j] += ";" + parameters4[i];
      }
    }
    parameters4.length = j + 1;
    for (var i = 0;i < parameters4.length; i++) {
      parameters4[i] = parameters4[i].trim();
    }
    return parameters4;
  };
  module.exports = preferredMediaTypes;
  module.exports.preferredMediaTypes = preferredMediaTypes;
  var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
});

// ../node_modules/negotiator/index.js
var require_negotiator = __commonJS((exports, module) => {
  var Negotiator = function(request) {
    if (!(this instanceof Negotiator)) {
      return new Negotiator(request);
    }
    this.request = request;
  };
  /*!
   * negotiator
   * Copyright(c) 2012 Federico Romero
   * Copyright(c) 2012-2014 Isaac Z. Schlueter
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */
  var preferredCharsets = require_charset();
  var preferredEncodings = require_encoding();
  var preferredLanguages = require_language();
  var preferredMediaTypes = require_mediaType();
  module.exports = Negotiator;
  module.exports.Negotiator = Negotiator;
  Negotiator.prototype.charset = function charset(available) {
    var set2 = this.charsets(available);
    return set2 && set2[0];
  };
  Negotiator.prototype.charsets = function charsets(available) {
    return preferredCharsets(this.request.headers["accept-charset"], available);
  };
  Negotiator.prototype.encoding = function encoding(available) {
    var set2 = this.encodings(available);
    return set2 && set2[0];
  };
  Negotiator.prototype.encodings = function encodings(available) {
    return preferredEncodings(this.request.headers["accept-encoding"], available);
  };
  Negotiator.prototype.language = function language(available) {
    var set2 = this.languages(available);
    return set2 && set2[0];
  };
  Negotiator.prototype.languages = function languages(available) {
    return preferredLanguages(this.request.headers["accept-language"], available);
  };
  Negotiator.prototype.mediaType = function mediaType(available) {
    var set2 = this.mediaTypes(available);
    return set2 && set2[0];
  };
  Negotiator.prototype.mediaTypes = function mediaTypes(available) {
    return preferredMediaTypes(this.request.headers.accept, available);
  };
  Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
  Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
  Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
  Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
  Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
  Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
  Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
  Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
});

// ../node_modules/mime-db/db.json
var require_db = __commonJS((exports, module) => {
  module.exports = {
    "application/1d-interleaved-parityfec": {
      source: "iana"
    },
    "application/3gpdash-qoe-report+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/3gpp-ims+xml": {
      source: "iana",
      compressible: true
    },
    "application/3gpphal+json": {
      source: "iana",
      compressible: true
    },
    "application/3gpphalforms+json": {
      source: "iana",
      compressible: true
    },
    "application/a2l": {
      source: "iana"
    },
    "application/ace+cbor": {
      source: "iana"
    },
    "application/activemessage": {
      source: "iana"
    },
    "application/activity+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-costmap+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-costmapfilter+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-directory+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-endpointcost+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-endpointcostparams+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-endpointprop+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-endpointpropparams+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-error+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-networkmap+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-networkmapfilter+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-updatestreamcontrol+json": {
      source: "iana",
      compressible: true
    },
    "application/alto-updatestreamparams+json": {
      source: "iana",
      compressible: true
    },
    "application/aml": {
      source: "iana"
    },
    "application/andrew-inset": {
      source: "iana",
      extensions: ["ez"]
    },
    "application/applefile": {
      source: "iana"
    },
    "application/applixware": {
      source: "apache",
      extensions: ["aw"]
    },
    "application/at+jwt": {
      source: "iana"
    },
    "application/atf": {
      source: "iana"
    },
    "application/atfx": {
      source: "iana"
    },
    "application/atom+xml": {
      source: "iana",
      compressible: true,
      extensions: ["atom"]
    },
    "application/atomcat+xml": {
      source: "iana",
      compressible: true,
      extensions: ["atomcat"]
    },
    "application/atomdeleted+xml": {
      source: "iana",
      compressible: true,
      extensions: ["atomdeleted"]
    },
    "application/atomicmail": {
      source: "iana"
    },
    "application/atomsvc+xml": {
      source: "iana",
      compressible: true,
      extensions: ["atomsvc"]
    },
    "application/atsc-dwd+xml": {
      source: "iana",
      compressible: true,
      extensions: ["dwd"]
    },
    "application/atsc-dynamic-event-message": {
      source: "iana"
    },
    "application/atsc-held+xml": {
      source: "iana",
      compressible: true,
      extensions: ["held"]
    },
    "application/atsc-rdt+json": {
      source: "iana",
      compressible: true
    },
    "application/atsc-rsat+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rsat"]
    },
    "application/atxml": {
      source: "iana"
    },
    "application/auth-policy+xml": {
      source: "iana",
      compressible: true
    },
    "application/bacnet-xdd+zip": {
      source: "iana",
      compressible: false
    },
    "application/batch-smtp": {
      source: "iana"
    },
    "application/bdoc": {
      compressible: false,
      extensions: ["bdoc"]
    },
    "application/beep+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/calendar+json": {
      source: "iana",
      compressible: true
    },
    "application/calendar+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xcs"]
    },
    "application/call-completion": {
      source: "iana"
    },
    "application/cals-1840": {
      source: "iana"
    },
    "application/captive+json": {
      source: "iana",
      compressible: true
    },
    "application/cbor": {
      source: "iana"
    },
    "application/cbor-seq": {
      source: "iana"
    },
    "application/cccex": {
      source: "iana"
    },
    "application/ccmp+xml": {
      source: "iana",
      compressible: true
    },
    "application/ccxml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["ccxml"]
    },
    "application/cdfx+xml": {
      source: "iana",
      compressible: true,
      extensions: ["cdfx"]
    },
    "application/cdmi-capability": {
      source: "iana",
      extensions: ["cdmia"]
    },
    "application/cdmi-container": {
      source: "iana",
      extensions: ["cdmic"]
    },
    "application/cdmi-domain": {
      source: "iana",
      extensions: ["cdmid"]
    },
    "application/cdmi-object": {
      source: "iana",
      extensions: ["cdmio"]
    },
    "application/cdmi-queue": {
      source: "iana",
      extensions: ["cdmiq"]
    },
    "application/cdni": {
      source: "iana"
    },
    "application/cea": {
      source: "iana"
    },
    "application/cea-2018+xml": {
      source: "iana",
      compressible: true
    },
    "application/cellml+xml": {
      source: "iana",
      compressible: true
    },
    "application/cfw": {
      source: "iana"
    },
    "application/city+json": {
      source: "iana",
      compressible: true
    },
    "application/clr": {
      source: "iana"
    },
    "application/clue+xml": {
      source: "iana",
      compressible: true
    },
    "application/clue_info+xml": {
      source: "iana",
      compressible: true
    },
    "application/cms": {
      source: "iana"
    },
    "application/cnrp+xml": {
      source: "iana",
      compressible: true
    },
    "application/coap-group+json": {
      source: "iana",
      compressible: true
    },
    "application/coap-payload": {
      source: "iana"
    },
    "application/commonground": {
      source: "iana"
    },
    "application/conference-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/cose": {
      source: "iana"
    },
    "application/cose-key": {
      source: "iana"
    },
    "application/cose-key-set": {
      source: "iana"
    },
    "application/cpl+xml": {
      source: "iana",
      compressible: true,
      extensions: ["cpl"]
    },
    "application/csrattrs": {
      source: "iana"
    },
    "application/csta+xml": {
      source: "iana",
      compressible: true
    },
    "application/cstadata+xml": {
      source: "iana",
      compressible: true
    },
    "application/csvm+json": {
      source: "iana",
      compressible: true
    },
    "application/cu-seeme": {
      source: "apache",
      extensions: ["cu"]
    },
    "application/cwt": {
      source: "iana"
    },
    "application/cybercash": {
      source: "iana"
    },
    "application/dart": {
      compressible: true
    },
    "application/dash+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mpd"]
    },
    "application/dash-patch+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mpp"]
    },
    "application/dashdelta": {
      source: "iana"
    },
    "application/davmount+xml": {
      source: "iana",
      compressible: true,
      extensions: ["davmount"]
    },
    "application/dca-rft": {
      source: "iana"
    },
    "application/dcd": {
      source: "iana"
    },
    "application/dec-dx": {
      source: "iana"
    },
    "application/dialog-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/dicom": {
      source: "iana"
    },
    "application/dicom+json": {
      source: "iana",
      compressible: true
    },
    "application/dicom+xml": {
      source: "iana",
      compressible: true
    },
    "application/dii": {
      source: "iana"
    },
    "application/dit": {
      source: "iana"
    },
    "application/dns": {
      source: "iana"
    },
    "application/dns+json": {
      source: "iana",
      compressible: true
    },
    "application/dns-message": {
      source: "iana"
    },
    "application/docbook+xml": {
      source: "apache",
      compressible: true,
      extensions: ["dbk"]
    },
    "application/dots+cbor": {
      source: "iana"
    },
    "application/dskpp+xml": {
      source: "iana",
      compressible: true
    },
    "application/dssc+der": {
      source: "iana",
      extensions: ["dssc"]
    },
    "application/dssc+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xdssc"]
    },
    "application/dvcs": {
      source: "iana"
    },
    "application/ecmascript": {
      source: "iana",
      compressible: true,
      extensions: ["es", "ecma"]
    },
    "application/edi-consent": {
      source: "iana"
    },
    "application/edi-x12": {
      source: "iana",
      compressible: false
    },
    "application/edifact": {
      source: "iana",
      compressible: false
    },
    "application/efi": {
      source: "iana"
    },
    "application/elm+json": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/elm+xml": {
      source: "iana",
      compressible: true
    },
    "application/emergencycalldata.cap+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/emergencycalldata.comment+xml": {
      source: "iana",
      compressible: true
    },
    "application/emergencycalldata.control+xml": {
      source: "iana",
      compressible: true
    },
    "application/emergencycalldata.deviceinfo+xml": {
      source: "iana",
      compressible: true
    },
    "application/emergencycalldata.ecall.msd": {
      source: "iana"
    },
    "application/emergencycalldata.providerinfo+xml": {
      source: "iana",
      compressible: true
    },
    "application/emergencycalldata.serviceinfo+xml": {
      source: "iana",
      compressible: true
    },
    "application/emergencycalldata.subscriberinfo+xml": {
      source: "iana",
      compressible: true
    },
    "application/emergencycalldata.veds+xml": {
      source: "iana",
      compressible: true
    },
    "application/emma+xml": {
      source: "iana",
      compressible: true,
      extensions: ["emma"]
    },
    "application/emotionml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["emotionml"]
    },
    "application/encaprtp": {
      source: "iana"
    },
    "application/epp+xml": {
      source: "iana",
      compressible: true
    },
    "application/epub+zip": {
      source: "iana",
      compressible: false,
      extensions: ["epub"]
    },
    "application/eshop": {
      source: "iana"
    },
    "application/exi": {
      source: "iana",
      extensions: ["exi"]
    },
    "application/expect-ct-report+json": {
      source: "iana",
      compressible: true
    },
    "application/express": {
      source: "iana",
      extensions: ["exp"]
    },
    "application/fastinfoset": {
      source: "iana"
    },
    "application/fastsoap": {
      source: "iana"
    },
    "application/fdt+xml": {
      source: "iana",
      compressible: true,
      extensions: ["fdt"]
    },
    "application/fhir+json": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/fhir+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/fido.trusted-apps+json": {
      compressible: true
    },
    "application/fits": {
      source: "iana"
    },
    "application/flexfec": {
      source: "iana"
    },
    "application/font-sfnt": {
      source: "iana"
    },
    "application/font-tdpfr": {
      source: "iana",
      extensions: ["pfr"]
    },
    "application/font-woff": {
      source: "iana",
      compressible: false
    },
    "application/framework-attributes+xml": {
      source: "iana",
      compressible: true
    },
    "application/geo+json": {
      source: "iana",
      compressible: true,
      extensions: ["geojson"]
    },
    "application/geo+json-seq": {
      source: "iana"
    },
    "application/geopackage+sqlite3": {
      source: "iana"
    },
    "application/geoxacml+xml": {
      source: "iana",
      compressible: true
    },
    "application/gltf-buffer": {
      source: "iana"
    },
    "application/gml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["gml"]
    },
    "application/gpx+xml": {
      source: "apache",
      compressible: true,
      extensions: ["gpx"]
    },
    "application/gxf": {
      source: "apache",
      extensions: ["gxf"]
    },
    "application/gzip": {
      source: "iana",
      compressible: false,
      extensions: ["gz"]
    },
    "application/h224": {
      source: "iana"
    },
    "application/held+xml": {
      source: "iana",
      compressible: true
    },
    "application/hjson": {
      extensions: ["hjson"]
    },
    "application/http": {
      source: "iana"
    },
    "application/hyperstudio": {
      source: "iana",
      extensions: ["stk"]
    },
    "application/ibe-key-request+xml": {
      source: "iana",
      compressible: true
    },
    "application/ibe-pkg-reply+xml": {
      source: "iana",
      compressible: true
    },
    "application/ibe-pp-data": {
      source: "iana"
    },
    "application/iges": {
      source: "iana"
    },
    "application/im-iscomposing+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/index": {
      source: "iana"
    },
    "application/index.cmd": {
      source: "iana"
    },
    "application/index.obj": {
      source: "iana"
    },
    "application/index.response": {
      source: "iana"
    },
    "application/index.vnd": {
      source: "iana"
    },
    "application/inkml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["ink", "inkml"]
    },
    "application/iotp": {
      source: "iana"
    },
    "application/ipfix": {
      source: "iana",
      extensions: ["ipfix"]
    },
    "application/ipp": {
      source: "iana"
    },
    "application/isup": {
      source: "iana"
    },
    "application/its+xml": {
      source: "iana",
      compressible: true,
      extensions: ["its"]
    },
    "application/java-archive": {
      source: "apache",
      compressible: false,
      extensions: ["jar", "war", "ear"]
    },
    "application/java-serialized-object": {
      source: "apache",
      compressible: false,
      extensions: ["ser"]
    },
    "application/java-vm": {
      source: "apache",
      compressible: false,
      extensions: ["class"]
    },
    "application/javascript": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["js", "mjs"]
    },
    "application/jf2feed+json": {
      source: "iana",
      compressible: true
    },
    "application/jose": {
      source: "iana"
    },
    "application/jose+json": {
      source: "iana",
      compressible: true
    },
    "application/jrd+json": {
      source: "iana",
      compressible: true
    },
    "application/jscalendar+json": {
      source: "iana",
      compressible: true
    },
    "application/json": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["json", "map"]
    },
    "application/json-patch+json": {
      source: "iana",
      compressible: true
    },
    "application/json-seq": {
      source: "iana"
    },
    "application/json5": {
      extensions: ["json5"]
    },
    "application/jsonml+json": {
      source: "apache",
      compressible: true,
      extensions: ["jsonml"]
    },
    "application/jwk+json": {
      source: "iana",
      compressible: true
    },
    "application/jwk-set+json": {
      source: "iana",
      compressible: true
    },
    "application/jwt": {
      source: "iana"
    },
    "application/kpml-request+xml": {
      source: "iana",
      compressible: true
    },
    "application/kpml-response+xml": {
      source: "iana",
      compressible: true
    },
    "application/ld+json": {
      source: "iana",
      compressible: true,
      extensions: ["jsonld"]
    },
    "application/lgr+xml": {
      source: "iana",
      compressible: true,
      extensions: ["lgr"]
    },
    "application/link-format": {
      source: "iana"
    },
    "application/load-control+xml": {
      source: "iana",
      compressible: true
    },
    "application/lost+xml": {
      source: "iana",
      compressible: true,
      extensions: ["lostxml"]
    },
    "application/lostsync+xml": {
      source: "iana",
      compressible: true
    },
    "application/lpf+zip": {
      source: "iana",
      compressible: false
    },
    "application/lxf": {
      source: "iana"
    },
    "application/mac-binhex40": {
      source: "iana",
      extensions: ["hqx"]
    },
    "application/mac-compactpro": {
      source: "apache",
      extensions: ["cpt"]
    },
    "application/macwriteii": {
      source: "iana"
    },
    "application/mads+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mads"]
    },
    "application/manifest+json": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["webmanifest"]
    },
    "application/marc": {
      source: "iana",
      extensions: ["mrc"]
    },
    "application/marcxml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mrcx"]
    },
    "application/mathematica": {
      source: "iana",
      extensions: ["ma", "nb", "mb"]
    },
    "application/mathml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mathml"]
    },
    "application/mathml-content+xml": {
      source: "iana",
      compressible: true
    },
    "application/mathml-presentation+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-associated-procedure-description+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-deregister+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-envelope+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-msk+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-msk-response+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-protection-description+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-reception-report+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-register+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-register-response+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-schedule+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbms-user-service-description+xml": {
      source: "iana",
      compressible: true
    },
    "application/mbox": {
      source: "iana",
      extensions: ["mbox"]
    },
    "application/media-policy-dataset+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mpf"]
    },
    "application/media_control+xml": {
      source: "iana",
      compressible: true
    },
    "application/mediaservercontrol+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mscml"]
    },
    "application/merge-patch+json": {
      source: "iana",
      compressible: true
    },
    "application/metalink+xml": {
      source: "apache",
      compressible: true,
      extensions: ["metalink"]
    },
    "application/metalink4+xml": {
      source: "iana",
      compressible: true,
      extensions: ["meta4"]
    },
    "application/mets+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mets"]
    },
    "application/mf4": {
      source: "iana"
    },
    "application/mikey": {
      source: "iana"
    },
    "application/mipc": {
      source: "iana"
    },
    "application/missing-blocks+cbor-seq": {
      source: "iana"
    },
    "application/mmt-aei+xml": {
      source: "iana",
      compressible: true,
      extensions: ["maei"]
    },
    "application/mmt-usd+xml": {
      source: "iana",
      compressible: true,
      extensions: ["musd"]
    },
    "application/mods+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mods"]
    },
    "application/moss-keys": {
      source: "iana"
    },
    "application/moss-signature": {
      source: "iana"
    },
    "application/mosskey-data": {
      source: "iana"
    },
    "application/mosskey-request": {
      source: "iana"
    },
    "application/mp21": {
      source: "iana",
      extensions: ["m21", "mp21"]
    },
    "application/mp4": {
      source: "iana",
      extensions: ["mp4s", "m4p"]
    },
    "application/mpeg4-generic": {
      source: "iana"
    },
    "application/mpeg4-iod": {
      source: "iana"
    },
    "application/mpeg4-iod-xmt": {
      source: "iana"
    },
    "application/mrb-consumer+xml": {
      source: "iana",
      compressible: true
    },
    "application/mrb-publish+xml": {
      source: "iana",
      compressible: true
    },
    "application/msc-ivr+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/msc-mixer+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/msword": {
      source: "iana",
      compressible: false,
      extensions: ["doc", "dot"]
    },
    "application/mud+json": {
      source: "iana",
      compressible: true
    },
    "application/multipart-core": {
      source: "iana"
    },
    "application/mxf": {
      source: "iana",
      extensions: ["mxf"]
    },
    "application/n-quads": {
      source: "iana",
      extensions: ["nq"]
    },
    "application/n-triples": {
      source: "iana",
      extensions: ["nt"]
    },
    "application/nasdata": {
      source: "iana"
    },
    "application/news-checkgroups": {
      source: "iana",
      charset: "US-ASCII"
    },
    "application/news-groupinfo": {
      source: "iana",
      charset: "US-ASCII"
    },
    "application/news-transmission": {
      source: "iana"
    },
    "application/nlsml+xml": {
      source: "iana",
      compressible: true
    },
    "application/node": {
      source: "iana",
      extensions: ["cjs"]
    },
    "application/nss": {
      source: "iana"
    },
    "application/oauth-authz-req+jwt": {
      source: "iana"
    },
    "application/oblivious-dns-message": {
      source: "iana"
    },
    "application/ocsp-request": {
      source: "iana"
    },
    "application/ocsp-response": {
      source: "iana"
    },
    "application/octet-stream": {
      source: "iana",
      compressible: false,
      extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
    },
    "application/oda": {
      source: "iana",
      extensions: ["oda"]
    },
    "application/odm+xml": {
      source: "iana",
      compressible: true
    },
    "application/odx": {
      source: "iana"
    },
    "application/oebps-package+xml": {
      source: "iana",
      compressible: true,
      extensions: ["opf"]
    },
    "application/ogg": {
      source: "iana",
      compressible: false,
      extensions: ["ogx"]
    },
    "application/omdoc+xml": {
      source: "apache",
      compressible: true,
      extensions: ["omdoc"]
    },
    "application/onenote": {
      source: "apache",
      extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
    },
    "application/opc-nodeset+xml": {
      source: "iana",
      compressible: true
    },
    "application/oscore": {
      source: "iana"
    },
    "application/oxps": {
      source: "iana",
      extensions: ["oxps"]
    },
    "application/p21": {
      source: "iana"
    },
    "application/p21+zip": {
      source: "iana",
      compressible: false
    },
    "application/p2p-overlay+xml": {
      source: "iana",
      compressible: true,
      extensions: ["relo"]
    },
    "application/parityfec": {
      source: "iana"
    },
    "application/passport": {
      source: "iana"
    },
    "application/patch-ops-error+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xer"]
    },
    "application/pdf": {
      source: "iana",
      compressible: false,
      extensions: ["pdf"]
    },
    "application/pdx": {
      source: "iana"
    },
    "application/pem-certificate-chain": {
      source: "iana"
    },
    "application/pgp-encrypted": {
      source: "iana",
      compressible: false,
      extensions: ["pgp"]
    },
    "application/pgp-keys": {
      source: "iana",
      extensions: ["asc"]
    },
    "application/pgp-signature": {
      source: "iana",
      extensions: ["asc", "sig"]
    },
    "application/pics-rules": {
      source: "apache",
      extensions: ["prf"]
    },
    "application/pidf+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/pidf-diff+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/pkcs10": {
      source: "iana",
      extensions: ["p10"]
    },
    "application/pkcs12": {
      source: "iana"
    },
    "application/pkcs7-mime": {
      source: "iana",
      extensions: ["p7m", "p7c"]
    },
    "application/pkcs7-signature": {
      source: "iana",
      extensions: ["p7s"]
    },
    "application/pkcs8": {
      source: "iana",
      extensions: ["p8"]
    },
    "application/pkcs8-encrypted": {
      source: "iana"
    },
    "application/pkix-attr-cert": {
      source: "iana",
      extensions: ["ac"]
    },
    "application/pkix-cert": {
      source: "iana",
      extensions: ["cer"]
    },
    "application/pkix-crl": {
      source: "iana",
      extensions: ["crl"]
    },
    "application/pkix-pkipath": {
      source: "iana",
      extensions: ["pkipath"]
    },
    "application/pkixcmp": {
      source: "iana",
      extensions: ["pki"]
    },
    "application/pls+xml": {
      source: "iana",
      compressible: true,
      extensions: ["pls"]
    },
    "application/poc-settings+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/postscript": {
      source: "iana",
      compressible: true,
      extensions: ["ai", "eps", "ps"]
    },
    "application/ppsp-tracker+json": {
      source: "iana",
      compressible: true
    },
    "application/problem+json": {
      source: "iana",
      compressible: true
    },
    "application/problem+xml": {
      source: "iana",
      compressible: true
    },
    "application/provenance+xml": {
      source: "iana",
      compressible: true,
      extensions: ["provx"]
    },
    "application/prs.alvestrand.titrax-sheet": {
      source: "iana"
    },
    "application/prs.cww": {
      source: "iana",
      extensions: ["cww"]
    },
    "application/prs.cyn": {
      source: "iana",
      charset: "7-BIT"
    },
    "application/prs.hpub+zip": {
      source: "iana",
      compressible: false
    },
    "application/prs.nprend": {
      source: "iana"
    },
    "application/prs.plucker": {
      source: "iana"
    },
    "application/prs.rdf-xml-crypt": {
      source: "iana"
    },
    "application/prs.xsf+xml": {
      source: "iana",
      compressible: true
    },
    "application/pskc+xml": {
      source: "iana",
      compressible: true,
      extensions: ["pskcxml"]
    },
    "application/pvd+json": {
      source: "iana",
      compressible: true
    },
    "application/qsig": {
      source: "iana"
    },
    "application/raml+yaml": {
      compressible: true,
      extensions: ["raml"]
    },
    "application/raptorfec": {
      source: "iana"
    },
    "application/rdap+json": {
      source: "iana",
      compressible: true
    },
    "application/rdf+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rdf", "owl"]
    },
    "application/reginfo+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rif"]
    },
    "application/relax-ng-compact-syntax": {
      source: "iana",
      extensions: ["rnc"]
    },
    "application/remote-printing": {
      source: "iana"
    },
    "application/reputon+json": {
      source: "iana",
      compressible: true
    },
    "application/resource-lists+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rl"]
    },
    "application/resource-lists-diff+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rld"]
    },
    "application/rfc+xml": {
      source: "iana",
      compressible: true
    },
    "application/riscos": {
      source: "iana"
    },
    "application/rlmi+xml": {
      source: "iana",
      compressible: true
    },
    "application/rls-services+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rs"]
    },
    "application/route-apd+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rapd"]
    },
    "application/route-s-tsid+xml": {
      source: "iana",
      compressible: true,
      extensions: ["sls"]
    },
    "application/route-usd+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rusd"]
    },
    "application/rpki-ghostbusters": {
      source: "iana",
      extensions: ["gbr"]
    },
    "application/rpki-manifest": {
      source: "iana",
      extensions: ["mft"]
    },
    "application/rpki-publication": {
      source: "iana"
    },
    "application/rpki-roa": {
      source: "iana",
      extensions: ["roa"]
    },
    "application/rpki-updown": {
      source: "iana"
    },
    "application/rsd+xml": {
      source: "apache",
      compressible: true,
      extensions: ["rsd"]
    },
    "application/rss+xml": {
      source: "apache",
      compressible: true,
      extensions: ["rss"]
    },
    "application/rtf": {
      source: "iana",
      compressible: true,
      extensions: ["rtf"]
    },
    "application/rtploopback": {
      source: "iana"
    },
    "application/rtx": {
      source: "iana"
    },
    "application/samlassertion+xml": {
      source: "iana",
      compressible: true
    },
    "application/samlmetadata+xml": {
      source: "iana",
      compressible: true
    },
    "application/sarif+json": {
      source: "iana",
      compressible: true
    },
    "application/sarif-external-properties+json": {
      source: "iana",
      compressible: true
    },
    "application/sbe": {
      source: "iana"
    },
    "application/sbml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["sbml"]
    },
    "application/scaip+xml": {
      source: "iana",
      compressible: true
    },
    "application/scim+json": {
      source: "iana",
      compressible: true
    },
    "application/scvp-cv-request": {
      source: "iana",
      extensions: ["scq"]
    },
    "application/scvp-cv-response": {
      source: "iana",
      extensions: ["scs"]
    },
    "application/scvp-vp-request": {
      source: "iana",
      extensions: ["spq"]
    },
    "application/scvp-vp-response": {
      source: "iana",
      extensions: ["spp"]
    },
    "application/sdp": {
      source: "iana",
      extensions: ["sdp"]
    },
    "application/secevent+jwt": {
      source: "iana"
    },
    "application/senml+cbor": {
      source: "iana"
    },
    "application/senml+json": {
      source: "iana",
      compressible: true
    },
    "application/senml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["senmlx"]
    },
    "application/senml-etch+cbor": {
      source: "iana"
    },
    "application/senml-etch+json": {
      source: "iana",
      compressible: true
    },
    "application/senml-exi": {
      source: "iana"
    },
    "application/sensml+cbor": {
      source: "iana"
    },
    "application/sensml+json": {
      source: "iana",
      compressible: true
    },
    "application/sensml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["sensmlx"]
    },
    "application/sensml-exi": {
      source: "iana"
    },
    "application/sep+xml": {
      source: "iana",
      compressible: true
    },
    "application/sep-exi": {
      source: "iana"
    },
    "application/session-info": {
      source: "iana"
    },
    "application/set-payment": {
      source: "iana"
    },
    "application/set-payment-initiation": {
      source: "iana",
      extensions: ["setpay"]
    },
    "application/set-registration": {
      source: "iana"
    },
    "application/set-registration-initiation": {
      source: "iana",
      extensions: ["setreg"]
    },
    "application/sgml": {
      source: "iana"
    },
    "application/sgml-open-catalog": {
      source: "iana"
    },
    "application/shf+xml": {
      source: "iana",
      compressible: true,
      extensions: ["shf"]
    },
    "application/sieve": {
      source: "iana",
      extensions: ["siv", "sieve"]
    },
    "application/simple-filter+xml": {
      source: "iana",
      compressible: true
    },
    "application/simple-message-summary": {
      source: "iana"
    },
    "application/simplesymbolcontainer": {
      source: "iana"
    },
    "application/sipc": {
      source: "iana"
    },
    "application/slate": {
      source: "iana"
    },
    "application/smil": {
      source: "iana"
    },
    "application/smil+xml": {
      source: "iana",
      compressible: true,
      extensions: ["smi", "smil"]
    },
    "application/smpte336m": {
      source: "iana"
    },
    "application/soap+fastinfoset": {
      source: "iana"
    },
    "application/soap+xml": {
      source: "iana",
      compressible: true
    },
    "application/sparql-query": {
      source: "iana",
      extensions: ["rq"]
    },
    "application/sparql-results+xml": {
      source: "iana",
      compressible: true,
      extensions: ["srx"]
    },
    "application/spdx+json": {
      source: "iana",
      compressible: true
    },
    "application/spirits-event+xml": {
      source: "iana",
      compressible: true
    },
    "application/sql": {
      source: "iana"
    },
    "application/srgs": {
      source: "iana",
      extensions: ["gram"]
    },
    "application/srgs+xml": {
      source: "iana",
      compressible: true,
      extensions: ["grxml"]
    },
    "application/sru+xml": {
      source: "iana",
      compressible: true,
      extensions: ["sru"]
    },
    "application/ssdl+xml": {
      source: "apache",
      compressible: true,
      extensions: ["ssdl"]
    },
    "application/ssml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["ssml"]
    },
    "application/stix+json": {
      source: "iana",
      compressible: true
    },
    "application/swid+xml": {
      source: "iana",
      compressible: true,
      extensions: ["swidtag"]
    },
    "application/tamp-apex-update": {
      source: "iana"
    },
    "application/tamp-apex-update-confirm": {
      source: "iana"
    },
    "application/tamp-community-update": {
      source: "iana"
    },
    "application/tamp-community-update-confirm": {
      source: "iana"
    },
    "application/tamp-error": {
      source: "iana"
    },
    "application/tamp-sequence-adjust": {
      source: "iana"
    },
    "application/tamp-sequence-adjust-confirm": {
      source: "iana"
    },
    "application/tamp-status-query": {
      source: "iana"
    },
    "application/tamp-status-response": {
      source: "iana"
    },
    "application/tamp-update": {
      source: "iana"
    },
    "application/tamp-update-confirm": {
      source: "iana"
    },
    "application/tar": {
      compressible: true
    },
    "application/taxii+json": {
      source: "iana",
      compressible: true
    },
    "application/td+json": {
      source: "iana",
      compressible: true
    },
    "application/tei+xml": {
      source: "iana",
      compressible: true,
      extensions: ["tei", "teicorpus"]
    },
    "application/tetra_isi": {
      source: "iana"
    },
    "application/thraud+xml": {
      source: "iana",
      compressible: true,
      extensions: ["tfi"]
    },
    "application/timestamp-query": {
      source: "iana"
    },
    "application/timestamp-reply": {
      source: "iana"
    },
    "application/timestamped-data": {
      source: "iana",
      extensions: ["tsd"]
    },
    "application/tlsrpt+gzip": {
      source: "iana"
    },
    "application/tlsrpt+json": {
      source: "iana",
      compressible: true
    },
    "application/tnauthlist": {
      source: "iana"
    },
    "application/token-introspection+jwt": {
      source: "iana"
    },
    "application/toml": {
      compressible: true,
      extensions: ["toml"]
    },
    "application/trickle-ice-sdpfrag": {
      source: "iana"
    },
    "application/trig": {
      source: "iana",
      extensions: ["trig"]
    },
    "application/ttml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["ttml"]
    },
    "application/tve-trigger": {
      source: "iana"
    },
    "application/tzif": {
      source: "iana"
    },
    "application/tzif-leap": {
      source: "iana"
    },
    "application/ubjson": {
      compressible: false,
      extensions: ["ubj"]
    },
    "application/ulpfec": {
      source: "iana"
    },
    "application/urc-grpsheet+xml": {
      source: "iana",
      compressible: true
    },
    "application/urc-ressheet+xml": {
      source: "iana",
      compressible: true,
      extensions: ["rsheet"]
    },
    "application/urc-targetdesc+xml": {
      source: "iana",
      compressible: true,
      extensions: ["td"]
    },
    "application/urc-uisocketdesc+xml": {
      source: "iana",
      compressible: true
    },
    "application/vcard+json": {
      source: "iana",
      compressible: true
    },
    "application/vcard+xml": {
      source: "iana",
      compressible: true
    },
    "application/vemmi": {
      source: "iana"
    },
    "application/vividence.scriptfile": {
      source: "apache"
    },
    "application/vnd.1000minds.decision-model+xml": {
      source: "iana",
      compressible: true,
      extensions: ["1km"]
    },
    "application/vnd.3gpp-prose+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp-prose-pc3ch+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp-v2x-local-service-information": {
      source: "iana"
    },
    "application/vnd.3gpp.5gnas": {
      source: "iana"
    },
    "application/vnd.3gpp.access-transfer-events+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.bsf+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.gmop+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.gtpc": {
      source: "iana"
    },
    "application/vnd.3gpp.interworking-data": {
      source: "iana"
    },
    "application/vnd.3gpp.lpp": {
      source: "iana"
    },
    "application/vnd.3gpp.mc-signalling-ear": {
      source: "iana"
    },
    "application/vnd.3gpp.mcdata-affiliation-command+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcdata-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcdata-payload": {
      source: "iana"
    },
    "application/vnd.3gpp.mcdata-service-config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcdata-signalling": {
      source: "iana"
    },
    "application/vnd.3gpp.mcdata-ue-config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcdata-user-profile+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-affiliation-command+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-floor-request+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-location-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-service-config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-signed+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-ue-config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-ue-init-config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcptt-user-profile+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-location-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-service-config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-transmission-request+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-ue-config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mcvideo-user-profile+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.mid-call+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.ngap": {
      source: "iana"
    },
    "application/vnd.3gpp.pfcp": {
      source: "iana"
    },
    "application/vnd.3gpp.pic-bw-large": {
      source: "iana",
      extensions: ["plb"]
    },
    "application/vnd.3gpp.pic-bw-small": {
      source: "iana",
      extensions: ["psb"]
    },
    "application/vnd.3gpp.pic-bw-var": {
      source: "iana",
      extensions: ["pvb"]
    },
    "application/vnd.3gpp.s1ap": {
      source: "iana"
    },
    "application/vnd.3gpp.sms": {
      source: "iana"
    },
    "application/vnd.3gpp.sms+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.srvcc-ext+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.srvcc-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.state-and-event-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp.ussd+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp2.bcmcsinfo+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.3gpp2.sms": {
      source: "iana"
    },
    "application/vnd.3gpp2.tcap": {
      source: "iana",
      extensions: ["tcap"]
    },
    "application/vnd.3lightssoftware.imagescal": {
      source: "iana"
    },
    "application/vnd.3m.post-it-notes": {
      source: "iana",
      extensions: ["pwn"]
    },
    "application/vnd.accpac.simply.aso": {
      source: "iana",
      extensions: ["aso"]
    },
    "application/vnd.accpac.simply.imp": {
      source: "iana",
      extensions: ["imp"]
    },
    "application/vnd.acucobol": {
      source: "iana",
      extensions: ["acu"]
    },
    "application/vnd.acucorp": {
      source: "iana",
      extensions: ["atc", "acutc"]
    },
    "application/vnd.adobe.air-application-installer-package+zip": {
      source: "apache",
      compressible: false,
      extensions: ["air"]
    },
    "application/vnd.adobe.flash.movie": {
      source: "iana"
    },
    "application/vnd.adobe.formscentral.fcdt": {
      source: "iana",
      extensions: ["fcdt"]
    },
    "application/vnd.adobe.fxp": {
      source: "iana",
      extensions: ["fxp", "fxpl"]
    },
    "application/vnd.adobe.partial-upload": {
      source: "iana"
    },
    "application/vnd.adobe.xdp+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xdp"]
    },
    "application/vnd.adobe.xfdf": {
      source: "iana",
      extensions: ["xfdf"]
    },
    "application/vnd.aether.imp": {
      source: "iana"
    },
    "application/vnd.afpc.afplinedata": {
      source: "iana"
    },
    "application/vnd.afpc.afplinedata-pagedef": {
      source: "iana"
    },
    "application/vnd.afpc.cmoca-cmresource": {
      source: "iana"
    },
    "application/vnd.afpc.foca-charset": {
      source: "iana"
    },
    "application/vnd.afpc.foca-codedfont": {
      source: "iana"
    },
    "application/vnd.afpc.foca-codepage": {
      source: "iana"
    },
    "application/vnd.afpc.modca": {
      source: "iana"
    },
    "application/vnd.afpc.modca-cmtable": {
      source: "iana"
    },
    "application/vnd.afpc.modca-formdef": {
      source: "iana"
    },
    "application/vnd.afpc.modca-mediummap": {
      source: "iana"
    },
    "application/vnd.afpc.modca-objectcontainer": {
      source: "iana"
    },
    "application/vnd.afpc.modca-overlay": {
      source: "iana"
    },
    "application/vnd.afpc.modca-pagesegment": {
      source: "iana"
    },
    "application/vnd.age": {
      source: "iana",
      extensions: ["age"]
    },
    "application/vnd.ah-barcode": {
      source: "iana"
    },
    "application/vnd.ahead.space": {
      source: "iana",
      extensions: ["ahead"]
    },
    "application/vnd.airzip.filesecure.azf": {
      source: "iana",
      extensions: ["azf"]
    },
    "application/vnd.airzip.filesecure.azs": {
      source: "iana",
      extensions: ["azs"]
    },
    "application/vnd.amadeus+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.amazon.ebook": {
      source: "apache",
      extensions: ["azw"]
    },
    "application/vnd.amazon.mobi8-ebook": {
      source: "iana"
    },
    "application/vnd.americandynamics.acc": {
      source: "iana",
      extensions: ["acc"]
    },
    "application/vnd.amiga.ami": {
      source: "iana",
      extensions: ["ami"]
    },
    "application/vnd.amundsen.maze+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.android.ota": {
      source: "iana"
    },
    "application/vnd.android.package-archive": {
      source: "apache",
      compressible: false,
      extensions: ["apk"]
    },
    "application/vnd.anki": {
      source: "iana"
    },
    "application/vnd.anser-web-certificate-issue-initiation": {
      source: "iana",
      extensions: ["cii"]
    },
    "application/vnd.anser-web-funds-transfer-initiation": {
      source: "apache",
      extensions: ["fti"]
    },
    "application/vnd.antix.game-component": {
      source: "iana",
      extensions: ["atx"]
    },
    "application/vnd.apache.arrow.file": {
      source: "iana"
    },
    "application/vnd.apache.arrow.stream": {
      source: "iana"
    },
    "application/vnd.apache.thrift.binary": {
      source: "iana"
    },
    "application/vnd.apache.thrift.compact": {
      source: "iana"
    },
    "application/vnd.apache.thrift.json": {
      source: "iana"
    },
    "application/vnd.api+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.aplextor.warrp+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.apothekende.reservation+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.apple.installer+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mpkg"]
    },
    "application/vnd.apple.keynote": {
      source: "iana",
      extensions: ["key"]
    },
    "application/vnd.apple.mpegurl": {
      source: "iana",
      extensions: ["m3u8"]
    },
    "application/vnd.apple.numbers": {
      source: "iana",
      extensions: ["numbers"]
    },
    "application/vnd.apple.pages": {
      source: "iana",
      extensions: ["pages"]
    },
    "application/vnd.apple.pkpass": {
      compressible: false,
      extensions: ["pkpass"]
    },
    "application/vnd.arastra.swi": {
      source: "iana"
    },
    "application/vnd.aristanetworks.swi": {
      source: "iana",
      extensions: ["swi"]
    },
    "application/vnd.artisan+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.artsquare": {
      source: "iana"
    },
    "application/vnd.astraea-software.iota": {
      source: "iana",
      extensions: ["iota"]
    },
    "application/vnd.audiograph": {
      source: "iana",
      extensions: ["aep"]
    },
    "application/vnd.autopackage": {
      source: "iana"
    },
    "application/vnd.avalon+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.avistar+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.balsamiq.bmml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["bmml"]
    },
    "application/vnd.balsamiq.bmpr": {
      source: "iana"
    },
    "application/vnd.banana-accounting": {
      source: "iana"
    },
    "application/vnd.bbf.usp.error": {
      source: "iana"
    },
    "application/vnd.bbf.usp.msg": {
      source: "iana"
    },
    "application/vnd.bbf.usp.msg+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.bekitzur-stech+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.bint.med-content": {
      source: "iana"
    },
    "application/vnd.biopax.rdf+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.blink-idb-value-wrapper": {
      source: "iana"
    },
    "application/vnd.blueice.multipass": {
      source: "iana",
      extensions: ["mpm"]
    },
    "application/vnd.bluetooth.ep.oob": {
      source: "iana"
    },
    "application/vnd.bluetooth.le.oob": {
      source: "iana"
    },
    "application/vnd.bmi": {
      source: "iana",
      extensions: ["bmi"]
    },
    "application/vnd.bpf": {
      source: "iana"
    },
    "application/vnd.bpf3": {
      source: "iana"
    },
    "application/vnd.businessobjects": {
      source: "iana",
      extensions: ["rep"]
    },
    "application/vnd.byu.uapi+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.cab-jscript": {
      source: "iana"
    },
    "application/vnd.canon-cpdl": {
      source: "iana"
    },
    "application/vnd.canon-lips": {
      source: "iana"
    },
    "application/vnd.capasystems-pg+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.cendio.thinlinc.clientconf": {
      source: "iana"
    },
    "application/vnd.century-systems.tcp_stream": {
      source: "iana"
    },
    "application/vnd.chemdraw+xml": {
      source: "iana",
      compressible: true,
      extensions: ["cdxml"]
    },
    "application/vnd.chess-pgn": {
      source: "iana"
    },
    "application/vnd.chipnuts.karaoke-mmd": {
      source: "iana",
      extensions: ["mmd"]
    },
    "application/vnd.ciedi": {
      source: "iana"
    },
    "application/vnd.cinderella": {
      source: "iana",
      extensions: ["cdy"]
    },
    "application/vnd.cirpack.isdn-ext": {
      source: "iana"
    },
    "application/vnd.citationstyles.style+xml": {
      source: "iana",
      compressible: true,
      extensions: ["csl"]
    },
    "application/vnd.claymore": {
      source: "iana",
      extensions: ["cla"]
    },
    "application/vnd.cloanto.rp9": {
      source: "iana",
      extensions: ["rp9"]
    },
    "application/vnd.clonk.c4group": {
      source: "iana",
      extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
    },
    "application/vnd.cluetrust.cartomobile-config": {
      source: "iana",
      extensions: ["c11amc"]
    },
    "application/vnd.cluetrust.cartomobile-config-pkg": {
      source: "iana",
      extensions: ["c11amz"]
    },
    "application/vnd.coffeescript": {
      source: "iana"
    },
    "application/vnd.collabio.xodocuments.document": {
      source: "iana"
    },
    "application/vnd.collabio.xodocuments.document-template": {
      source: "iana"
    },
    "application/vnd.collabio.xodocuments.presentation": {
      source: "iana"
    },
    "application/vnd.collabio.xodocuments.presentation-template": {
      source: "iana"
    },
    "application/vnd.collabio.xodocuments.spreadsheet": {
      source: "iana"
    },
    "application/vnd.collabio.xodocuments.spreadsheet-template": {
      source: "iana"
    },
    "application/vnd.collection+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.collection.doc+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.collection.next+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.comicbook+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.comicbook-rar": {
      source: "iana"
    },
    "application/vnd.commerce-battelle": {
      source: "iana"
    },
    "application/vnd.commonspace": {
      source: "iana",
      extensions: ["csp"]
    },
    "application/vnd.contact.cmsg": {
      source: "iana",
      extensions: ["cdbcmsg"]
    },
    "application/vnd.coreos.ignition+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.cosmocaller": {
      source: "iana",
      extensions: ["cmc"]
    },
    "application/vnd.crick.clicker": {
      source: "iana",
      extensions: ["clkx"]
    },
    "application/vnd.crick.clicker.keyboard": {
      source: "iana",
      extensions: ["clkk"]
    },
    "application/vnd.crick.clicker.palette": {
      source: "iana",
      extensions: ["clkp"]
    },
    "application/vnd.crick.clicker.template": {
      source: "iana",
      extensions: ["clkt"]
    },
    "application/vnd.crick.clicker.wordbank": {
      source: "iana",
      extensions: ["clkw"]
    },
    "application/vnd.criticaltools.wbs+xml": {
      source: "iana",
      compressible: true,
      extensions: ["wbs"]
    },
    "application/vnd.cryptii.pipe+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.crypto-shade-file": {
      source: "iana"
    },
    "application/vnd.cryptomator.encrypted": {
      source: "iana"
    },
    "application/vnd.cryptomator.vault": {
      source: "iana"
    },
    "application/vnd.ctc-posml": {
      source: "iana",
      extensions: ["pml"]
    },
    "application/vnd.ctct.ws+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.cups-pdf": {
      source: "iana"
    },
    "application/vnd.cups-postscript": {
      source: "iana"
    },
    "application/vnd.cups-ppd": {
      source: "iana",
      extensions: ["ppd"]
    },
    "application/vnd.cups-raster": {
      source: "iana"
    },
    "application/vnd.cups-raw": {
      source: "iana"
    },
    "application/vnd.curl": {
      source: "iana"
    },
    "application/vnd.curl.car": {
      source: "apache",
      extensions: ["car"]
    },
    "application/vnd.curl.pcurl": {
      source: "apache",
      extensions: ["pcurl"]
    },
    "application/vnd.cyan.dean.root+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.cybank": {
      source: "iana"
    },
    "application/vnd.cyclonedx+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.cyclonedx+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.d2l.coursepackage1p0+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.d3m-dataset": {
      source: "iana"
    },
    "application/vnd.d3m-problem": {
      source: "iana"
    },
    "application/vnd.dart": {
      source: "iana",
      compressible: true,
      extensions: ["dart"]
    },
    "application/vnd.data-vision.rdz": {
      source: "iana",
      extensions: ["rdz"]
    },
    "application/vnd.datapackage+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dataresource+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dbf": {
      source: "iana",
      extensions: ["dbf"]
    },
    "application/vnd.debian.binary-package": {
      source: "iana"
    },
    "application/vnd.dece.data": {
      source: "iana",
      extensions: ["uvf", "uvvf", "uvd", "uvvd"]
    },
    "application/vnd.dece.ttml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["uvt", "uvvt"]
    },
    "application/vnd.dece.unspecified": {
      source: "iana",
      extensions: ["uvx", "uvvx"]
    },
    "application/vnd.dece.zip": {
      source: "iana",
      extensions: ["uvz", "uvvz"]
    },
    "application/vnd.denovo.fcselayout-link": {
      source: "iana",
      extensions: ["fe_launch"]
    },
    "application/vnd.desmume.movie": {
      source: "iana"
    },
    "application/vnd.dir-bi.plate-dl-nosuffix": {
      source: "iana"
    },
    "application/vnd.dm.delegation+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dna": {
      source: "iana",
      extensions: ["dna"]
    },
    "application/vnd.document+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dolby.mlp": {
      source: "apache",
      extensions: ["mlp"]
    },
    "application/vnd.dolby.mobile.1": {
      source: "iana"
    },
    "application/vnd.dolby.mobile.2": {
      source: "iana"
    },
    "application/vnd.doremir.scorecloud-binary-document": {
      source: "iana"
    },
    "application/vnd.dpgraph": {
      source: "iana",
      extensions: ["dpg"]
    },
    "application/vnd.dreamfactory": {
      source: "iana",
      extensions: ["dfac"]
    },
    "application/vnd.drive+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ds-keypoint": {
      source: "apache",
      extensions: ["kpxx"]
    },
    "application/vnd.dtg.local": {
      source: "iana"
    },
    "application/vnd.dtg.local.flash": {
      source: "iana"
    },
    "application/vnd.dtg.local.html": {
      source: "iana"
    },
    "application/vnd.dvb.ait": {
      source: "iana",
      extensions: ["ait"]
    },
    "application/vnd.dvb.dvbisl+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.dvbj": {
      source: "iana"
    },
    "application/vnd.dvb.esgcontainer": {
      source: "iana"
    },
    "application/vnd.dvb.ipdcdftnotifaccess": {
      source: "iana"
    },
    "application/vnd.dvb.ipdcesgaccess": {
      source: "iana"
    },
    "application/vnd.dvb.ipdcesgaccess2": {
      source: "iana"
    },
    "application/vnd.dvb.ipdcesgpdd": {
      source: "iana"
    },
    "application/vnd.dvb.ipdcroaming": {
      source: "iana"
    },
    "application/vnd.dvb.iptv.alfec-base": {
      source: "iana"
    },
    "application/vnd.dvb.iptv.alfec-enhancement": {
      source: "iana"
    },
    "application/vnd.dvb.notif-aggregate-root+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.notif-container+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.notif-generic+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.notif-ia-msglist+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.notif-ia-registration-request+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.notif-ia-registration-response+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.notif-init+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.dvb.pfr": {
      source: "iana"
    },
    "application/vnd.dvb.service": {
      source: "iana",
      extensions: ["svc"]
    },
    "application/vnd.dxr": {
      source: "iana"
    },
    "application/vnd.dynageo": {
      source: "iana",
      extensions: ["geo"]
    },
    "application/vnd.dzr": {
      source: "iana"
    },
    "application/vnd.easykaraoke.cdgdownload": {
      source: "iana"
    },
    "application/vnd.ecdis-update": {
      source: "iana"
    },
    "application/vnd.ecip.rlp": {
      source: "iana"
    },
    "application/vnd.eclipse.ditto+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ecowin.chart": {
      source: "iana",
      extensions: ["mag"]
    },
    "application/vnd.ecowin.filerequest": {
      source: "iana"
    },
    "application/vnd.ecowin.fileupdate": {
      source: "iana"
    },
    "application/vnd.ecowin.series": {
      source: "iana"
    },
    "application/vnd.ecowin.seriesrequest": {
      source: "iana"
    },
    "application/vnd.ecowin.seriesupdate": {
      source: "iana"
    },
    "application/vnd.efi.img": {
      source: "iana"
    },
    "application/vnd.efi.iso": {
      source: "iana"
    },
    "application/vnd.emclient.accessrequest+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.enliven": {
      source: "iana",
      extensions: ["nml"]
    },
    "application/vnd.enphase.envoy": {
      source: "iana"
    },
    "application/vnd.eprints.data+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.epson.esf": {
      source: "iana",
      extensions: ["esf"]
    },
    "application/vnd.epson.msf": {
      source: "iana",
      extensions: ["msf"]
    },
    "application/vnd.epson.quickanime": {
      source: "iana",
      extensions: ["qam"]
    },
    "application/vnd.epson.salt": {
      source: "iana",
      extensions: ["slt"]
    },
    "application/vnd.epson.ssf": {
      source: "iana",
      extensions: ["ssf"]
    },
    "application/vnd.ericsson.quickcall": {
      source: "iana"
    },
    "application/vnd.espass-espass+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.eszigno3+xml": {
      source: "iana",
      compressible: true,
      extensions: ["es3", "et3"]
    },
    "application/vnd.etsi.aoc+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.asic-e+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.etsi.asic-s+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.etsi.cug+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvcommand+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvdiscovery+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvprofile+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvsad-bc+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvsad-cod+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvsad-npvr+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvservice+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvsync+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.iptvueprofile+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.mcid+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.mheg5": {
      source: "iana"
    },
    "application/vnd.etsi.overload-control-policy-dataset+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.pstn+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.sci+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.simservs+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.timestamp-token": {
      source: "iana"
    },
    "application/vnd.etsi.tsl+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.etsi.tsl.der": {
      source: "iana"
    },
    "application/vnd.eu.kasparian.car+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.eudora.data": {
      source: "iana"
    },
    "application/vnd.evolv.ecig.profile": {
      source: "iana"
    },
    "application/vnd.evolv.ecig.settings": {
      source: "iana"
    },
    "application/vnd.evolv.ecig.theme": {
      source: "iana"
    },
    "application/vnd.exstream-empower+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.exstream-package": {
      source: "iana"
    },
    "application/vnd.ezpix-album": {
      source: "iana",
      extensions: ["ez2"]
    },
    "application/vnd.ezpix-package": {
      source: "iana",
      extensions: ["ez3"]
    },
    "application/vnd.f-secure.mobile": {
      source: "iana"
    },
    "application/vnd.familysearch.gedcom+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.fastcopy-disk-image": {
      source: "iana"
    },
    "application/vnd.fdf": {
      source: "iana",
      extensions: ["fdf"]
    },
    "application/vnd.fdsn.mseed": {
      source: "iana",
      extensions: ["mseed"]
    },
    "application/vnd.fdsn.seed": {
      source: "iana",
      extensions: ["seed", "dataless"]
    },
    "application/vnd.ffsns": {
      source: "iana"
    },
    "application/vnd.ficlab.flb+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.filmit.zfc": {
      source: "iana"
    },
    "application/vnd.fints": {
      source: "iana"
    },
    "application/vnd.firemonkeys.cloudcell": {
      source: "iana"
    },
    "application/vnd.flographit": {
      source: "iana",
      extensions: ["gph"]
    },
    "application/vnd.fluxtime.clip": {
      source: "iana",
      extensions: ["ftc"]
    },
    "application/vnd.font-fontforge-sfd": {
      source: "iana"
    },
    "application/vnd.framemaker": {
      source: "iana",
      extensions: ["fm", "frame", "maker", "book"]
    },
    "application/vnd.frogans.fnc": {
      source: "iana",
      extensions: ["fnc"]
    },
    "application/vnd.frogans.ltf": {
      source: "iana",
      extensions: ["ltf"]
    },
    "application/vnd.fsc.weblaunch": {
      source: "iana",
      extensions: ["fsc"]
    },
    "application/vnd.fujifilm.fb.docuworks": {
      source: "iana"
    },
    "application/vnd.fujifilm.fb.docuworks.binder": {
      source: "iana"
    },
    "application/vnd.fujifilm.fb.docuworks.container": {
      source: "iana"
    },
    "application/vnd.fujifilm.fb.jfi+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.fujitsu.oasys": {
      source: "iana",
      extensions: ["oas"]
    },
    "application/vnd.fujitsu.oasys2": {
      source: "iana",
      extensions: ["oa2"]
    },
    "application/vnd.fujitsu.oasys3": {
      source: "iana",
      extensions: ["oa3"]
    },
    "application/vnd.fujitsu.oasysgp": {
      source: "iana",
      extensions: ["fg5"]
    },
    "application/vnd.fujitsu.oasysprs": {
      source: "iana",
      extensions: ["bh2"]
    },
    "application/vnd.fujixerox.art-ex": {
      source: "iana"
    },
    "application/vnd.fujixerox.art4": {
      source: "iana"
    },
    "application/vnd.fujixerox.ddd": {
      source: "iana",
      extensions: ["ddd"]
    },
    "application/vnd.fujixerox.docuworks": {
      source: "iana",
      extensions: ["xdw"]
    },
    "application/vnd.fujixerox.docuworks.binder": {
      source: "iana",
      extensions: ["xbd"]
    },
    "application/vnd.fujixerox.docuworks.container": {
      source: "iana"
    },
    "application/vnd.fujixerox.hbpl": {
      source: "iana"
    },
    "application/vnd.fut-misnet": {
      source: "iana"
    },
    "application/vnd.futoin+cbor": {
      source: "iana"
    },
    "application/vnd.futoin+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.fuzzysheet": {
      source: "iana",
      extensions: ["fzs"]
    },
    "application/vnd.genomatix.tuxedo": {
      source: "iana",
      extensions: ["txd"]
    },
    "application/vnd.gentics.grd+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.geo+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.geocube+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.geogebra.file": {
      source: "iana",
      extensions: ["ggb"]
    },
    "application/vnd.geogebra.slides": {
      source: "iana"
    },
    "application/vnd.geogebra.tool": {
      source: "iana",
      extensions: ["ggt"]
    },
    "application/vnd.geometry-explorer": {
      source: "iana",
      extensions: ["gex", "gre"]
    },
    "application/vnd.geonext": {
      source: "iana",
      extensions: ["gxt"]
    },
    "application/vnd.geoplan": {
      source: "iana",
      extensions: ["g2w"]
    },
    "application/vnd.geospace": {
      source: "iana",
      extensions: ["g3w"]
    },
    "application/vnd.gerber": {
      source: "iana"
    },
    "application/vnd.globalplatform.card-content-mgt": {
      source: "iana"
    },
    "application/vnd.globalplatform.card-content-mgt-response": {
      source: "iana"
    },
    "application/vnd.gmx": {
      source: "iana",
      extensions: ["gmx"]
    },
    "application/vnd.google-apps.document": {
      compressible: false,
      extensions: ["gdoc"]
    },
    "application/vnd.google-apps.presentation": {
      compressible: false,
      extensions: ["gslides"]
    },
    "application/vnd.google-apps.spreadsheet": {
      compressible: false,
      extensions: ["gsheet"]
    },
    "application/vnd.google-earth.kml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["kml"]
    },
    "application/vnd.google-earth.kmz": {
      source: "iana",
      compressible: false,
      extensions: ["kmz"]
    },
    "application/vnd.gov.sk.e-form+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.gov.sk.e-form+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.gov.sk.xmldatacontainer+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.grafeq": {
      source: "iana",
      extensions: ["gqf", "gqs"]
    },
    "application/vnd.gridmp": {
      source: "iana"
    },
    "application/vnd.groove-account": {
      source: "iana",
      extensions: ["gac"]
    },
    "application/vnd.groove-help": {
      source: "iana",
      extensions: ["ghf"]
    },
    "application/vnd.groove-identity-message": {
      source: "iana",
      extensions: ["gim"]
    },
    "application/vnd.groove-injector": {
      source: "iana",
      extensions: ["grv"]
    },
    "application/vnd.groove-tool-message": {
      source: "iana",
      extensions: ["gtm"]
    },
    "application/vnd.groove-tool-template": {
      source: "iana",
      extensions: ["tpl"]
    },
    "application/vnd.groove-vcard": {
      source: "iana",
      extensions: ["vcg"]
    },
    "application/vnd.hal+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.hal+xml": {
      source: "iana",
      compressible: true,
      extensions: ["hal"]
    },
    "application/vnd.handheld-entertainment+xml": {
      source: "iana",
      compressible: true,
      extensions: ["zmm"]
    },
    "application/vnd.hbci": {
      source: "iana",
      extensions: ["hbci"]
    },
    "application/vnd.hc+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.hcl-bireports": {
      source: "iana"
    },
    "application/vnd.hdt": {
      source: "iana"
    },
    "application/vnd.heroku+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.hhe.lesson-player": {
      source: "iana",
      extensions: ["les"]
    },
    "application/vnd.hl7cda+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/vnd.hl7v2+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/vnd.hp-hpgl": {
      source: "iana",
      extensions: ["hpgl"]
    },
    "application/vnd.hp-hpid": {
      source: "iana",
      extensions: ["hpid"]
    },
    "application/vnd.hp-hps": {
      source: "iana",
      extensions: ["hps"]
    },
    "application/vnd.hp-jlyt": {
      source: "iana",
      extensions: ["jlt"]
    },
    "application/vnd.hp-pcl": {
      source: "iana",
      extensions: ["pcl"]
    },
    "application/vnd.hp-pclxl": {
      source: "iana",
      extensions: ["pclxl"]
    },
    "application/vnd.httphone": {
      source: "iana"
    },
    "application/vnd.hydrostatix.sof-data": {
      source: "iana",
      extensions: ["sfd-hdstx"]
    },
    "application/vnd.hyper+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.hyper-item+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.hyperdrive+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.hzn-3d-crossword": {
      source: "iana"
    },
    "application/vnd.ibm.afplinedata": {
      source: "iana"
    },
    "application/vnd.ibm.electronic-media": {
      source: "iana"
    },
    "application/vnd.ibm.minipay": {
      source: "iana",
      extensions: ["mpy"]
    },
    "application/vnd.ibm.modcap": {
      source: "iana",
      extensions: ["afp", "listafp", "list3820"]
    },
    "application/vnd.ibm.rights-management": {
      source: "iana",
      extensions: ["irm"]
    },
    "application/vnd.ibm.secure-container": {
      source: "iana",
      extensions: ["sc"]
    },
    "application/vnd.iccprofile": {
      source: "iana",
      extensions: ["icc", "icm"]
    },
    "application/vnd.ieee.1905": {
      source: "iana"
    },
    "application/vnd.igloader": {
      source: "iana",
      extensions: ["igl"]
    },
    "application/vnd.imagemeter.folder+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.imagemeter.image+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.immervision-ivp": {
      source: "iana",
      extensions: ["ivp"]
    },
    "application/vnd.immervision-ivu": {
      source: "iana",
      extensions: ["ivu"]
    },
    "application/vnd.ims.imsccv1p1": {
      source: "iana"
    },
    "application/vnd.ims.imsccv1p2": {
      source: "iana"
    },
    "application/vnd.ims.imsccv1p3": {
      source: "iana"
    },
    "application/vnd.ims.lis.v2.result+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ims.lti.v2.toolproxy+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ims.lti.v2.toolproxy.id+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ims.lti.v2.toolsettings+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ims.lti.v2.toolsettings.simple+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.informedcontrol.rms+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.informix-visionary": {
      source: "iana"
    },
    "application/vnd.infotech.project": {
      source: "iana"
    },
    "application/vnd.infotech.project+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.innopath.wamp.notification": {
      source: "iana"
    },
    "application/vnd.insors.igm": {
      source: "iana",
      extensions: ["igm"]
    },
    "application/vnd.intercon.formnet": {
      source: "iana",
      extensions: ["xpw", "xpx"]
    },
    "application/vnd.intergeo": {
      source: "iana",
      extensions: ["i2g"]
    },
    "application/vnd.intertrust.digibox": {
      source: "iana"
    },
    "application/vnd.intertrust.nncp": {
      source: "iana"
    },
    "application/vnd.intu.qbo": {
      source: "iana",
      extensions: ["qbo"]
    },
    "application/vnd.intu.qfx": {
      source: "iana",
      extensions: ["qfx"]
    },
    "application/vnd.iptc.g2.catalogitem+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.iptc.g2.conceptitem+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.iptc.g2.knowledgeitem+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.iptc.g2.newsitem+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.iptc.g2.newsmessage+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.iptc.g2.packageitem+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.iptc.g2.planningitem+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ipunplugged.rcprofile": {
      source: "iana",
      extensions: ["rcprofile"]
    },
    "application/vnd.irepository.package+xml": {
      source: "iana",
      compressible: true,
      extensions: ["irp"]
    },
    "application/vnd.is-xpr": {
      source: "iana",
      extensions: ["xpr"]
    },
    "application/vnd.isac.fcs": {
      source: "iana",
      extensions: ["fcs"]
    },
    "application/vnd.iso11783-10+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.jam": {
      source: "iana",
      extensions: ["jam"]
    },
    "application/vnd.japannet-directory-service": {
      source: "iana"
    },
    "application/vnd.japannet-jpnstore-wakeup": {
      source: "iana"
    },
    "application/vnd.japannet-payment-wakeup": {
      source: "iana"
    },
    "application/vnd.japannet-registration": {
      source: "iana"
    },
    "application/vnd.japannet-registration-wakeup": {
      source: "iana"
    },
    "application/vnd.japannet-setstore-wakeup": {
      source: "iana"
    },
    "application/vnd.japannet-verification": {
      source: "iana"
    },
    "application/vnd.japannet-verification-wakeup": {
      source: "iana"
    },
    "application/vnd.jcp.javame.midlet-rms": {
      source: "iana",
      extensions: ["rms"]
    },
    "application/vnd.jisp": {
      source: "iana",
      extensions: ["jisp"]
    },
    "application/vnd.joost.joda-archive": {
      source: "iana",
      extensions: ["joda"]
    },
    "application/vnd.jsk.isdn-ngn": {
      source: "iana"
    },
    "application/vnd.kahootz": {
      source: "iana",
      extensions: ["ktz", "ktr"]
    },
    "application/vnd.kde.karbon": {
      source: "iana",
      extensions: ["karbon"]
    },
    "application/vnd.kde.kchart": {
      source: "iana",
      extensions: ["chrt"]
    },
    "application/vnd.kde.kformula": {
      source: "iana",
      extensions: ["kfo"]
    },
    "application/vnd.kde.kivio": {
      source: "iana",
      extensions: ["flw"]
    },
    "application/vnd.kde.kontour": {
      source: "iana",
      extensions: ["kon"]
    },
    "application/vnd.kde.kpresenter": {
      source: "iana",
      extensions: ["kpr", "kpt"]
    },
    "application/vnd.kde.kspread": {
      source: "iana",
      extensions: ["ksp"]
    },
    "application/vnd.kde.kword": {
      source: "iana",
      extensions: ["kwd", "kwt"]
    },
    "application/vnd.kenameaapp": {
      source: "iana",
      extensions: ["htke"]
    },
    "application/vnd.kidspiration": {
      source: "iana",
      extensions: ["kia"]
    },
    "application/vnd.kinar": {
      source: "iana",
      extensions: ["kne", "knp"]
    },
    "application/vnd.koan": {
      source: "iana",
      extensions: ["skp", "skd", "skt", "skm"]
    },
    "application/vnd.kodak-descriptor": {
      source: "iana",
      extensions: ["sse"]
    },
    "application/vnd.las": {
      source: "iana"
    },
    "application/vnd.las.las+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.las.las+xml": {
      source: "iana",
      compressible: true,
      extensions: ["lasxml"]
    },
    "application/vnd.laszip": {
      source: "iana"
    },
    "application/vnd.leap+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.liberty-request+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.llamagraphics.life-balance.desktop": {
      source: "iana",
      extensions: ["lbd"]
    },
    "application/vnd.llamagraphics.life-balance.exchange+xml": {
      source: "iana",
      compressible: true,
      extensions: ["lbe"]
    },
    "application/vnd.logipipe.circuit+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.loom": {
      source: "iana"
    },
    "application/vnd.lotus-1-2-3": {
      source: "iana",
      extensions: ["123"]
    },
    "application/vnd.lotus-approach": {
      source: "iana",
      extensions: ["apr"]
    },
    "application/vnd.lotus-freelance": {
      source: "iana",
      extensions: ["pre"]
    },
    "application/vnd.lotus-notes": {
      source: "iana",
      extensions: ["nsf"]
    },
    "application/vnd.lotus-organizer": {
      source: "iana",
      extensions: ["org"]
    },
    "application/vnd.lotus-screencam": {
      source: "iana",
      extensions: ["scm"]
    },
    "application/vnd.lotus-wordpro": {
      source: "iana",
      extensions: ["lwp"]
    },
    "application/vnd.macports.portpkg": {
      source: "iana",
      extensions: ["portpkg"]
    },
    "application/vnd.mapbox-vector-tile": {
      source: "iana",
      extensions: ["mvt"]
    },
    "application/vnd.marlin.drm.actiontoken+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.marlin.drm.conftoken+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.marlin.drm.license+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.marlin.drm.mdcf": {
      source: "iana"
    },
    "application/vnd.mason+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.maxar.archive.3tz+zip": {
      source: "iana",
      compressible: false
    },
    "application/vnd.maxmind.maxmind-db": {
      source: "iana"
    },
    "application/vnd.mcd": {
      source: "iana",
      extensions: ["mcd"]
    },
    "application/vnd.medcalcdata": {
      source: "iana",
      extensions: ["mc1"]
    },
    "application/vnd.mediastation.cdkey": {
      source: "iana",
      extensions: ["cdkey"]
    },
    "application/vnd.meridian-slingshot": {
      source: "iana"
    },
    "application/vnd.mfer": {
      source: "iana",
      extensions: ["mwf"]
    },
    "application/vnd.mfmp": {
      source: "iana",
      extensions: ["mfm"]
    },
    "application/vnd.micro+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.micrografx.flo": {
      source: "iana",
      extensions: ["flo"]
    },
    "application/vnd.micrografx.igx": {
      source: "iana",
      extensions: ["igx"]
    },
    "application/vnd.microsoft.portable-executable": {
      source: "iana"
    },
    "application/vnd.microsoft.windows.thumbnail-cache": {
      source: "iana"
    },
    "application/vnd.miele+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.mif": {
      source: "iana",
      extensions: ["mif"]
    },
    "application/vnd.minisoft-hp3000-save": {
      source: "iana"
    },
    "application/vnd.mitsubishi.misty-guard.trustweb": {
      source: "iana"
    },
    "application/vnd.mobius.daf": {
      source: "iana",
      extensions: ["daf"]
    },
    "application/vnd.mobius.dis": {
      source: "iana",
      extensions: ["dis"]
    },
    "application/vnd.mobius.mbk": {
      source: "iana",
      extensions: ["mbk"]
    },
    "application/vnd.mobius.mqy": {
      source: "iana",
      extensions: ["mqy"]
    },
    "application/vnd.mobius.msl": {
      source: "iana",
      extensions: ["msl"]
    },
    "application/vnd.mobius.plc": {
      source: "iana",
      extensions: ["plc"]
    },
    "application/vnd.mobius.txf": {
      source: "iana",
      extensions: ["txf"]
    },
    "application/vnd.mophun.application": {
      source: "iana",
      extensions: ["mpn"]
    },
    "application/vnd.mophun.certificate": {
      source: "iana",
      extensions: ["mpc"]
    },
    "application/vnd.motorola.flexsuite": {
      source: "iana"
    },
    "application/vnd.motorola.flexsuite.adsi": {
      source: "iana"
    },
    "application/vnd.motorola.flexsuite.fis": {
      source: "iana"
    },
    "application/vnd.motorola.flexsuite.gotap": {
      source: "iana"
    },
    "application/vnd.motorola.flexsuite.kmr": {
      source: "iana"
    },
    "application/vnd.motorola.flexsuite.ttc": {
      source: "iana"
    },
    "application/vnd.motorola.flexsuite.wem": {
      source: "iana"
    },
    "application/vnd.motorola.iprm": {
      source: "iana"
    },
    "application/vnd.mozilla.xul+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xul"]
    },
    "application/vnd.ms-3mfdocument": {
      source: "iana"
    },
    "application/vnd.ms-artgalry": {
      source: "iana",
      extensions: ["cil"]
    },
    "application/vnd.ms-asf": {
      source: "iana"
    },
    "application/vnd.ms-cab-compressed": {
      source: "iana",
      extensions: ["cab"]
    },
    "application/vnd.ms-color.iccprofile": {
      source: "apache"
    },
    "application/vnd.ms-excel": {
      source: "iana",
      compressible: false,
      extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
    },
    "application/vnd.ms-excel.addin.macroenabled.12": {
      source: "iana",
      extensions: ["xlam"]
    },
    "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
      source: "iana",
      extensions: ["xlsb"]
    },
    "application/vnd.ms-excel.sheet.macroenabled.12": {
      source: "iana",
      extensions: ["xlsm"]
    },
    "application/vnd.ms-excel.template.macroenabled.12": {
      source: "iana",
      extensions: ["xltm"]
    },
    "application/vnd.ms-fontobject": {
      source: "iana",
      compressible: true,
      extensions: ["eot"]
    },
    "application/vnd.ms-htmlhelp": {
      source: "iana",
      extensions: ["chm"]
    },
    "application/vnd.ms-ims": {
      source: "iana",
      extensions: ["ims"]
    },
    "application/vnd.ms-lrm": {
      source: "iana",
      extensions: ["lrm"]
    },
    "application/vnd.ms-office.activex+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ms-officetheme": {
      source: "iana",
      extensions: ["thmx"]
    },
    "application/vnd.ms-opentype": {
      source: "apache",
      compressible: true
    },
    "application/vnd.ms-outlook": {
      compressible: false,
      extensions: ["msg"]
    },
    "application/vnd.ms-package.obfuscated-opentype": {
      source: "apache"
    },
    "application/vnd.ms-pki.seccat": {
      source: "apache",
      extensions: ["cat"]
    },
    "application/vnd.ms-pki.stl": {
      source: "apache",
      extensions: ["stl"]
    },
    "application/vnd.ms-playready.initiator+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ms-powerpoint": {
      source: "iana",
      compressible: false,
      extensions: ["ppt", "pps", "pot"]
    },
    "application/vnd.ms-powerpoint.addin.macroenabled.12": {
      source: "iana",
      extensions: ["ppam"]
    },
    "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
      source: "iana",
      extensions: ["pptm"]
    },
    "application/vnd.ms-powerpoint.slide.macroenabled.12": {
      source: "iana",
      extensions: ["sldm"]
    },
    "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
      source: "iana",
      extensions: ["ppsm"]
    },
    "application/vnd.ms-powerpoint.template.macroenabled.12": {
      source: "iana",
      extensions: ["potm"]
    },
    "application/vnd.ms-printdevicecapabilities+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ms-printing.printticket+xml": {
      source: "apache",
      compressible: true
    },
    "application/vnd.ms-printschematicket+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ms-project": {
      source: "iana",
      extensions: ["mpp", "mpt"]
    },
    "application/vnd.ms-tnef": {
      source: "iana"
    },
    "application/vnd.ms-windows.devicepairing": {
      source: "iana"
    },
    "application/vnd.ms-windows.nwprinting.oob": {
      source: "iana"
    },
    "application/vnd.ms-windows.printerpairing": {
      source: "iana"
    },
    "application/vnd.ms-windows.wsd.oob": {
      source: "iana"
    },
    "application/vnd.ms-wmdrm.lic-chlg-req": {
      source: "iana"
    },
    "application/vnd.ms-wmdrm.lic-resp": {
      source: "iana"
    },
    "application/vnd.ms-wmdrm.meter-chlg-req": {
      source: "iana"
    },
    "application/vnd.ms-wmdrm.meter-resp": {
      source: "iana"
    },
    "application/vnd.ms-word.document.macroenabled.12": {
      source: "iana",
      extensions: ["docm"]
    },
    "application/vnd.ms-word.template.macroenabled.12": {
      source: "iana",
      extensions: ["dotm"]
    },
    "application/vnd.ms-works": {
      source: "iana",
      extensions: ["wps", "wks", "wcm", "wdb"]
    },
    "application/vnd.ms-wpl": {
      source: "iana",
      extensions: ["wpl"]
    },
    "application/vnd.ms-xpsdocument": {
      source: "iana",
      compressible: false,
      extensions: ["xps"]
    },
    "application/vnd.msa-disk-image": {
      source: "iana"
    },
    "application/vnd.mseq": {
      source: "iana",
      extensions: ["mseq"]
    },
    "application/vnd.msign": {
      source: "iana"
    },
    "application/vnd.multiad.creator": {
      source: "iana"
    },
    "application/vnd.multiad.creator.cif": {
      source: "iana"
    },
    "application/vnd.music-niff": {
      source: "iana"
    },
    "application/vnd.musician": {
      source: "iana",
      extensions: ["mus"]
    },
    "application/vnd.muvee.style": {
      source: "iana",
      extensions: ["msty"]
    },
    "application/vnd.mynfc": {
      source: "iana",
      extensions: ["taglet"]
    },
    "application/vnd.nacamar.ybrid+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.ncd.control": {
      source: "iana"
    },
    "application/vnd.ncd.reference": {
      source: "iana"
    },
    "application/vnd.nearst.inv+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.nebumind.line": {
      source: "iana"
    },
    "application/vnd.nervana": {
      source: "iana"
    },
    "application/vnd.netfpx": {
      source: "iana"
    },
    "application/vnd.neurolanguage.nlu": {
      source: "iana",
      extensions: ["nlu"]
    },
    "application/vnd.nimn": {
      source: "iana"
    },
    "application/vnd.nintendo.nitro.rom": {
      source: "iana"
    },
    "application/vnd.nintendo.snes.rom": {
      source: "iana"
    },
    "application/vnd.nitf": {
      source: "iana",
      extensions: ["ntf", "nitf"]
    },
    "application/vnd.noblenet-directory": {
      source: "iana",
      extensions: ["nnd"]
    },
    "application/vnd.noblenet-sealer": {
      source: "iana",
      extensions: ["nns"]
    },
    "application/vnd.noblenet-web": {
      source: "iana",
      extensions: ["nnw"]
    },
    "application/vnd.nokia.catalogs": {
      source: "iana"
    },
    "application/vnd.nokia.conml+wbxml": {
      source: "iana"
    },
    "application/vnd.nokia.conml+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.nokia.iptv.config+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.nokia.isds-radio-presets": {
      source: "iana"
    },
    "application/vnd.nokia.landmark+wbxml": {
      source: "iana"
    },
    "application/vnd.nokia.landmark+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.nokia.landmarkcollection+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.nokia.n-gage.ac+xml": {
      source: "iana",
      compressible: true,
      extensions: ["ac"]
    },
    "application/vnd.nokia.n-gage.data": {
      source: "iana",
      extensions: ["ngdat"]
    },
    "application/vnd.nokia.n-gage.symbian.install": {
      source: "iana",
      extensions: ["n-gage"]
    },
    "application/vnd.nokia.ncd": {
      source: "iana"
    },
    "application/vnd.nokia.pcd+wbxml": {
      source: "iana"
    },
    "application/vnd.nokia.pcd+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.nokia.radio-preset": {
      source: "iana",
      extensions: ["rpst"]
    },
    "application/vnd.nokia.radio-presets": {
      source: "iana",
      extensions: ["rpss"]
    },
    "application/vnd.novadigm.edm": {
      source: "iana",
      extensions: ["edm"]
    },
    "application/vnd.novadigm.edx": {
      source: "iana",
      extensions: ["edx"]
    },
    "application/vnd.novadigm.ext": {
      source: "iana",
      extensions: ["ext"]
    },
    "application/vnd.ntt-local.content-share": {
      source: "iana"
    },
    "application/vnd.ntt-local.file-transfer": {
      source: "iana"
    },
    "application/vnd.ntt-local.ogw_remote-access": {
      source: "iana"
    },
    "application/vnd.ntt-local.sip-ta_remote": {
      source: "iana"
    },
    "application/vnd.ntt-local.sip-ta_tcp_stream": {
      source: "iana"
    },
    "application/vnd.oasis.opendocument.chart": {
      source: "iana",
      extensions: ["odc"]
    },
    "application/vnd.oasis.opendocument.chart-template": {
      source: "iana",
      extensions: ["otc"]
    },
    "application/vnd.oasis.opendocument.database": {
      source: "iana",
      extensions: ["odb"]
    },
    "application/vnd.oasis.opendocument.formula": {
      source: "iana",
      extensions: ["odf"]
    },
    "application/vnd.oasis.opendocument.formula-template": {
      source: "iana",
      extensions: ["odft"]
    },
    "application/vnd.oasis.opendocument.graphics": {
      source: "iana",
      compressible: false,
      extensions: ["odg"]
    },
    "application/vnd.oasis.opendocument.graphics-template": {
      source: "iana",
      extensions: ["otg"]
    },
    "application/vnd.oasis.opendocument.image": {
      source: "iana",
      extensions: ["odi"]
    },
    "application/vnd.oasis.opendocument.image-template": {
      source: "iana",
      extensions: ["oti"]
    },
    "application/vnd.oasis.opendocument.presentation": {
      source: "iana",
      compressible: false,
      extensions: ["odp"]
    },
    "application/vnd.oasis.opendocument.presentation-template": {
      source: "iana",
      extensions: ["otp"]
    },
    "application/vnd.oasis.opendocument.spreadsheet": {
      source: "iana",
      compressible: false,
      extensions: ["ods"]
    },
    "application/vnd.oasis.opendocument.spreadsheet-template": {
      source: "iana",
      extensions: ["ots"]
    },
    "application/vnd.oasis.opendocument.text": {
      source: "iana",
      compressible: false,
      extensions: ["odt"]
    },
    "application/vnd.oasis.opendocument.text-master": {
      source: "iana",
      extensions: ["odm"]
    },
    "application/vnd.oasis.opendocument.text-template": {
      source: "iana",
      extensions: ["ott"]
    },
    "application/vnd.oasis.opendocument.text-web": {
      source: "iana",
      extensions: ["oth"]
    },
    "application/vnd.obn": {
      source: "iana"
    },
    "application/vnd.ocf+cbor": {
      source: "iana"
    },
    "application/vnd.oci.image.manifest.v1+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oftn.l10n+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.contentaccessdownload+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.contentaccessstreaming+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.cspg-hexbinary": {
      source: "iana"
    },
    "application/vnd.oipf.dae.svg+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.dae.xhtml+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.mippvcontrolmessage+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.pae.gem": {
      source: "iana"
    },
    "application/vnd.oipf.spdiscovery+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.spdlist+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.ueprofile+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oipf.userprofile+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.olpc-sugar": {
      source: "iana",
      extensions: ["xo"]
    },
    "application/vnd.oma-scws-config": {
      source: "iana"
    },
    "application/vnd.oma-scws-http-request": {
      source: "iana"
    },
    "application/vnd.oma-scws-http-response": {
      source: "iana"
    },
    "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.bcast.drm-trigger+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.bcast.imd+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.bcast.ltkm": {
      source: "iana"
    },
    "application/vnd.oma.bcast.notification+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.bcast.provisioningtrigger": {
      source: "iana"
    },
    "application/vnd.oma.bcast.sgboot": {
      source: "iana"
    },
    "application/vnd.oma.bcast.sgdd+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.bcast.sgdu": {
      source: "iana"
    },
    "application/vnd.oma.bcast.simple-symbol-container": {
      source: "iana"
    },
    "application/vnd.oma.bcast.smartcard-trigger+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.bcast.sprov+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.bcast.stkm": {
      source: "iana"
    },
    "application/vnd.oma.cab-address-book+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.cab-feature-handler+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.cab-pcc+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.cab-subs-invite+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.cab-user-prefs+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.dcd": {
      source: "iana"
    },
    "application/vnd.oma.dcdc": {
      source: "iana"
    },
    "application/vnd.oma.dd2+xml": {
      source: "iana",
      compressible: true,
      extensions: ["dd2"]
    },
    "application/vnd.oma.drm.risd+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.group-usage-list+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.lwm2m+cbor": {
      source: "iana"
    },
    "application/vnd.oma.lwm2m+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.lwm2m+tlv": {
      source: "iana"
    },
    "application/vnd.oma.pal+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.poc.detailed-progress-report+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.poc.final-report+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.poc.groups+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.poc.invocation-descriptor+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.poc.optimized-progress-report+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.push": {
      source: "iana"
    },
    "application/vnd.oma.scidm.messages+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oma.xcap-directory+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.omads-email+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/vnd.omads-file+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/vnd.omads-folder+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/vnd.omaloc-supl-init": {
      source: "iana"
    },
    "application/vnd.onepager": {
      source: "iana"
    },
    "application/vnd.onepagertamp": {
      source: "iana"
    },
    "application/vnd.onepagertamx": {
      source: "iana"
    },
    "application/vnd.onepagertat": {
      source: "iana"
    },
    "application/vnd.onepagertatp": {
      source: "iana"
    },
    "application/vnd.onepagertatx": {
      source: "iana"
    },
    "application/vnd.openblox.game+xml": {
      source: "iana",
      compressible: true,
      extensions: ["obgx"]
    },
    "application/vnd.openblox.game-binary": {
      source: "iana"
    },
    "application/vnd.openeye.oeb": {
      source: "iana"
    },
    "application/vnd.openofficeorg.extension": {
      source: "apache",
      extensions: ["oxt"]
    },
    "application/vnd.openstreetmap.data+xml": {
      source: "iana",
      compressible: true,
      extensions: ["osm"]
    },
    "application/vnd.opentimestamps.ots": {
      source: "iana"
    },
    "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.drawing+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
      source: "iana",
      compressible: false,
      extensions: ["pptx"]
    },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.slide": {
      source: "iana",
      extensions: ["sldx"]
    },
    "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
      source: "iana",
      extensions: ["ppsx"]
    },
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.template": {
      source: "iana",
      extensions: ["potx"]
    },
    "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      source: "iana",
      compressible: false,
      extensions: ["xlsx"]
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
      source: "iana",
      extensions: ["xltx"]
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.theme+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.vmldrawing": {
      source: "iana"
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      source: "iana",
      compressible: false,
      extensions: ["docx"]
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
      source: "iana",
      extensions: ["dotx"]
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-package.core-properties+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.openxmlformats-package.relationships+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oracle.resource+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.orange.indata": {
      source: "iana"
    },
    "application/vnd.osa.netdeploy": {
      source: "iana"
    },
    "application/vnd.osgeo.mapguide.package": {
      source: "iana",
      extensions: ["mgp"]
    },
    "application/vnd.osgi.bundle": {
      source: "iana"
    },
    "application/vnd.osgi.dp": {
      source: "iana",
      extensions: ["dp"]
    },
    "application/vnd.osgi.subsystem": {
      source: "iana",
      extensions: ["esa"]
    },
    "application/vnd.otps.ct-kip+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.oxli.countgraph": {
      source: "iana"
    },
    "application/vnd.pagerduty+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.palm": {
      source: "iana",
      extensions: ["pdb", "pqa", "oprc"]
    },
    "application/vnd.panoply": {
      source: "iana"
    },
    "application/vnd.paos.xml": {
      source: "iana"
    },
    "application/vnd.patentdive": {
      source: "iana"
    },
    "application/vnd.patientecommsdoc": {
      source: "iana"
    },
    "application/vnd.pawaafile": {
      source: "iana",
      extensions: ["paw"]
    },
    "application/vnd.pcos": {
      source: "iana"
    },
    "application/vnd.pg.format": {
      source: "iana",
      extensions: ["str"]
    },
    "application/vnd.pg.osasli": {
      source: "iana",
      extensions: ["ei6"]
    },
    "application/vnd.piaccess.application-licence": {
      source: "iana"
    },
    "application/vnd.picsel": {
      source: "iana",
      extensions: ["efif"]
    },
    "application/vnd.pmi.widget": {
      source: "iana",
      extensions: ["wg"]
    },
    "application/vnd.poc.group-advertisement+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.pocketlearn": {
      source: "iana",
      extensions: ["plf"]
    },
    "application/vnd.powerbuilder6": {
      source: "iana",
      extensions: ["pbd"]
    },
    "application/vnd.powerbuilder6-s": {
      source: "iana"
    },
    "application/vnd.powerbuilder7": {
      source: "iana"
    },
    "application/vnd.powerbuilder7-s": {
      source: "iana"
    },
    "application/vnd.powerbuilder75": {
      source: "iana"
    },
    "application/vnd.powerbuilder75-s": {
      source: "iana"
    },
    "application/vnd.preminet": {
      source: "iana"
    },
    "application/vnd.previewsystems.box": {
      source: "iana",
      extensions: ["box"]
    },
    "application/vnd.proteus.magazine": {
      source: "iana",
      extensions: ["mgz"]
    },
    "application/vnd.psfs": {
      source: "iana"
    },
    "application/vnd.publishare-delta-tree": {
      source: "iana",
      extensions: ["qps"]
    },
    "application/vnd.pvi.ptid1": {
      source: "iana",
      extensions: ["ptid"]
    },
    "application/vnd.pwg-multiplexed": {
      source: "iana"
    },
    "application/vnd.pwg-xhtml-print+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.qualcomm.brew-app-res": {
      source: "iana"
    },
    "application/vnd.quarantainenet": {
      source: "iana"
    },
    "application/vnd.quark.quarkxpress": {
      source: "iana",
      extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
    },
    "application/vnd.quobject-quoxdocument": {
      source: "iana"
    },
    "application/vnd.radisys.moml+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-audit+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-audit-conf+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-audit-conn+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-audit-dialog+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-audit-stream+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-conf+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-dialog+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-dialog-base+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-dialog-fax-detect+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-dialog-group+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-dialog-speech+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.radisys.msml-dialog-transform+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.rainstor.data": {
      source: "iana"
    },
    "application/vnd.rapid": {
      source: "iana"
    },
    "application/vnd.rar": {
      source: "iana",
      extensions: ["rar"]
    },
    "application/vnd.realvnc.bed": {
      source: "iana",
      extensions: ["bed"]
    },
    "application/vnd.recordare.musicxml": {
      source: "iana",
      extensions: ["mxl"]
    },
    "application/vnd.recordare.musicxml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["musicxml"]
    },
    "application/vnd.renlearn.rlprint": {
      source: "iana"
    },
    "application/vnd.resilient.logic": {
      source: "iana"
    },
    "application/vnd.restful+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.rig.cryptonote": {
      source: "iana",
      extensions: ["cryptonote"]
    },
    "application/vnd.rim.cod": {
      source: "apache",
      extensions: ["cod"]
    },
    "application/vnd.rn-realmedia": {
      source: "apache",
      extensions: ["rm"]
    },
    "application/vnd.rn-realmedia-vbr": {
      source: "apache",
      extensions: ["rmvb"]
    },
    "application/vnd.route66.link66+xml": {
      source: "iana",
      compressible: true,
      extensions: ["link66"]
    },
    "application/vnd.rs-274x": {
      source: "iana"
    },
    "application/vnd.ruckus.download": {
      source: "iana"
    },
    "application/vnd.s3sms": {
      source: "iana"
    },
    "application/vnd.sailingtracker.track": {
      source: "iana",
      extensions: ["st"]
    },
    "application/vnd.sar": {
      source: "iana"
    },
    "application/vnd.sbm.cid": {
      source: "iana"
    },
    "application/vnd.sbm.mid2": {
      source: "iana"
    },
    "application/vnd.scribus": {
      source: "iana"
    },
    "application/vnd.sealed.3df": {
      source: "iana"
    },
    "application/vnd.sealed.csf": {
      source: "iana"
    },
    "application/vnd.sealed.doc": {
      source: "iana"
    },
    "application/vnd.sealed.eml": {
      source: "iana"
    },
    "application/vnd.sealed.mht": {
      source: "iana"
    },
    "application/vnd.sealed.net": {
      source: "iana"
    },
    "application/vnd.sealed.ppt": {
      source: "iana"
    },
    "application/vnd.sealed.tiff": {
      source: "iana"
    },
    "application/vnd.sealed.xls": {
      source: "iana"
    },
    "application/vnd.sealedmedia.softseal.html": {
      source: "iana"
    },
    "application/vnd.sealedmedia.softseal.pdf": {
      source: "iana"
    },
    "application/vnd.seemail": {
      source: "iana",
      extensions: ["see"]
    },
    "application/vnd.seis+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.sema": {
      source: "iana",
      extensions: ["sema"]
    },
    "application/vnd.semd": {
      source: "iana",
      extensions: ["semd"]
    },
    "application/vnd.semf": {
      source: "iana",
      extensions: ["semf"]
    },
    "application/vnd.shade-save-file": {
      source: "iana"
    },
    "application/vnd.shana.informed.formdata": {
      source: "iana",
      extensions: ["ifm"]
    },
    "application/vnd.shana.informed.formtemplate": {
      source: "iana",
      extensions: ["itp"]
    },
    "application/vnd.shana.informed.interchange": {
      source: "iana",
      extensions: ["iif"]
    },
    "application/vnd.shana.informed.package": {
      source: "iana",
      extensions: ["ipk"]
    },
    "application/vnd.shootproof+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.shopkick+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.shp": {
      source: "iana"
    },
    "application/vnd.shx": {
      source: "iana"
    },
    "application/vnd.sigrok.session": {
      source: "iana"
    },
    "application/vnd.simtech-mindmapper": {
      source: "iana",
      extensions: ["twd", "twds"]
    },
    "application/vnd.siren+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.smaf": {
      source: "iana",
      extensions: ["mmf"]
    },
    "application/vnd.smart.notebook": {
      source: "iana"
    },
    "application/vnd.smart.teacher": {
      source: "iana",
      extensions: ["teacher"]
    },
    "application/vnd.snesdev-page-table": {
      source: "iana"
    },
    "application/vnd.software602.filler.form+xml": {
      source: "iana",
      compressible: true,
      extensions: ["fo"]
    },
    "application/vnd.software602.filler.form-xml-zip": {
      source: "iana"
    },
    "application/vnd.solent.sdkm+xml": {
      source: "iana",
      compressible: true,
      extensions: ["sdkm", "sdkd"]
    },
    "application/vnd.spotfire.dxp": {
      source: "iana",
      extensions: ["dxp"]
    },
    "application/vnd.spotfire.sfs": {
      source: "iana",
      extensions: ["sfs"]
    },
    "application/vnd.sqlite3": {
      source: "iana"
    },
    "application/vnd.sss-cod": {
      source: "iana"
    },
    "application/vnd.sss-dtf": {
      source: "iana"
    },
    "application/vnd.sss-ntf": {
      source: "iana"
    },
    "application/vnd.stardivision.calc": {
      source: "apache",
      extensions: ["sdc"]
    },
    "application/vnd.stardivision.draw": {
      source: "apache",
      extensions: ["sda"]
    },
    "application/vnd.stardivision.impress": {
      source: "apache",
      extensions: ["sdd"]
    },
    "application/vnd.stardivision.math": {
      source: "apache",
      extensions: ["smf"]
    },
    "application/vnd.stardivision.writer": {
      source: "apache",
      extensions: ["sdw", "vor"]
    },
    "application/vnd.stardivision.writer-global": {
      source: "apache",
      extensions: ["sgl"]
    },
    "application/vnd.stepmania.package": {
      source: "iana",
      extensions: ["smzip"]
    },
    "application/vnd.stepmania.stepchart": {
      source: "iana",
      extensions: ["sm"]
    },
    "application/vnd.street-stream": {
      source: "iana"
    },
    "application/vnd.sun.wadl+xml": {
      source: "iana",
      compressible: true,
      extensions: ["wadl"]
    },
    "application/vnd.sun.xml.calc": {
      source: "apache",
      extensions: ["sxc"]
    },
    "application/vnd.sun.xml.calc.template": {
      source: "apache",
      extensions: ["stc"]
    },
    "application/vnd.sun.xml.draw": {
      source: "apache",
      extensions: ["sxd"]
    },
    "application/vnd.sun.xml.draw.template": {
      source: "apache",
      extensions: ["std"]
    },
    "application/vnd.sun.xml.impress": {
      source: "apache",
      extensions: ["sxi"]
    },
    "application/vnd.sun.xml.impress.template": {
      source: "apache",
      extensions: ["sti"]
    },
    "application/vnd.sun.xml.math": {
      source: "apache",
      extensions: ["sxm"]
    },
    "application/vnd.sun.xml.writer": {
      source: "apache",
      extensions: ["sxw"]
    },
    "application/vnd.sun.xml.writer.global": {
      source: "apache",
      extensions: ["sxg"]
    },
    "application/vnd.sun.xml.writer.template": {
      source: "apache",
      extensions: ["stw"]
    },
    "application/vnd.sus-calendar": {
      source: "iana",
      extensions: ["sus", "susp"]
    },
    "application/vnd.svd": {
      source: "iana",
      extensions: ["svd"]
    },
    "application/vnd.swiftview-ics": {
      source: "iana"
    },
    "application/vnd.sycle+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.syft+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.symbian.install": {
      source: "apache",
      extensions: ["sis", "sisx"]
    },
    "application/vnd.syncml+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["xsm"]
    },
    "application/vnd.syncml.dm+wbxml": {
      source: "iana",
      charset: "UTF-8",
      extensions: ["bdm"]
    },
    "application/vnd.syncml.dm+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["xdm"]
    },
    "application/vnd.syncml.dm.notification": {
      source: "iana"
    },
    "application/vnd.syncml.dmddf+wbxml": {
      source: "iana"
    },
    "application/vnd.syncml.dmddf+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["ddf"]
    },
    "application/vnd.syncml.dmtnds+wbxml": {
      source: "iana"
    },
    "application/vnd.syncml.dmtnds+xml": {
      source: "iana",
      charset: "UTF-8",
      compressible: true
    },
    "application/vnd.syncml.ds.notification": {
      source: "iana"
    },
    "application/vnd.tableschema+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.tao.intent-module-archive": {
      source: "iana",
      extensions: ["tao"]
    },
    "application/vnd.tcpdump.pcap": {
      source: "iana",
      extensions: ["pcap", "cap", "dmp"]
    },
    "application/vnd.think-cell.ppttc+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.tmd.mediaflex.api+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.tml": {
      source: "iana"
    },
    "application/vnd.tmobile-livetv": {
      source: "iana",
      extensions: ["tmo"]
    },
    "application/vnd.tri.onesource": {
      source: "iana"
    },
    "application/vnd.trid.tpt": {
      source: "iana",
      extensions: ["tpt"]
    },
    "application/vnd.triscape.mxs": {
      source: "iana",
      extensions: ["mxs"]
    },
    "application/vnd.trueapp": {
      source: "iana",
      extensions: ["tra"]
    },
    "application/vnd.truedoc": {
      source: "iana"
    },
    "application/vnd.ubisoft.webplayer": {
      source: "iana"
    },
    "application/vnd.ufdl": {
      source: "iana",
      extensions: ["ufd", "ufdl"]
    },
    "application/vnd.uiq.theme": {
      source: "iana",
      extensions: ["utz"]
    },
    "application/vnd.umajin": {
      source: "iana",
      extensions: ["umj"]
    },
    "application/vnd.unity": {
      source: "iana",
      extensions: ["unityweb"]
    },
    "application/vnd.uoml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["uoml"]
    },
    "application/vnd.uplanet.alert": {
      source: "iana"
    },
    "application/vnd.uplanet.alert-wbxml": {
      source: "iana"
    },
    "application/vnd.uplanet.bearer-choice": {
      source: "iana"
    },
    "application/vnd.uplanet.bearer-choice-wbxml": {
      source: "iana"
    },
    "application/vnd.uplanet.cacheop": {
      source: "iana"
    },
    "application/vnd.uplanet.cacheop-wbxml": {
      source: "iana"
    },
    "application/vnd.uplanet.channel": {
      source: "iana"
    },
    "application/vnd.uplanet.channel-wbxml": {
      source: "iana"
    },
    "application/vnd.uplanet.list": {
      source: "iana"
    },
    "application/vnd.uplanet.list-wbxml": {
      source: "iana"
    },
    "application/vnd.uplanet.listcmd": {
      source: "iana"
    },
    "application/vnd.uplanet.listcmd-wbxml": {
      source: "iana"
    },
    "application/vnd.uplanet.signal": {
      source: "iana"
    },
    "application/vnd.uri-map": {
      source: "iana"
    },
    "application/vnd.valve.source.material": {
      source: "iana"
    },
    "application/vnd.vcx": {
      source: "iana",
      extensions: ["vcx"]
    },
    "application/vnd.vd-study": {
      source: "iana"
    },
    "application/vnd.vectorworks": {
      source: "iana"
    },
    "application/vnd.vel+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.verimatrix.vcas": {
      source: "iana"
    },
    "application/vnd.veritone.aion+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.veryant.thin": {
      source: "iana"
    },
    "application/vnd.ves.encrypted": {
      source: "iana"
    },
    "application/vnd.vidsoft.vidconference": {
      source: "iana"
    },
    "application/vnd.visio": {
      source: "iana",
      extensions: ["vsd", "vst", "vss", "vsw"]
    },
    "application/vnd.visionary": {
      source: "iana",
      extensions: ["vis"]
    },
    "application/vnd.vividence.scriptfile": {
      source: "iana"
    },
    "application/vnd.vsf": {
      source: "iana",
      extensions: ["vsf"]
    },
    "application/vnd.wap.sic": {
      source: "iana"
    },
    "application/vnd.wap.slc": {
      source: "iana"
    },
    "application/vnd.wap.wbxml": {
      source: "iana",
      charset: "UTF-8",
      extensions: ["wbxml"]
    },
    "application/vnd.wap.wmlc": {
      source: "iana",
      extensions: ["wmlc"]
    },
    "application/vnd.wap.wmlscriptc": {
      source: "iana",
      extensions: ["wmlsc"]
    },
    "application/vnd.webturbo": {
      source: "iana",
      extensions: ["wtb"]
    },
    "application/vnd.wfa.dpp": {
      source: "iana"
    },
    "application/vnd.wfa.p2p": {
      source: "iana"
    },
    "application/vnd.wfa.wsc": {
      source: "iana"
    },
    "application/vnd.windows.devicepairing": {
      source: "iana"
    },
    "application/vnd.wmc": {
      source: "iana"
    },
    "application/vnd.wmf.bootstrap": {
      source: "iana"
    },
    "application/vnd.wolfram.mathematica": {
      source: "iana"
    },
    "application/vnd.wolfram.mathematica.package": {
      source: "iana"
    },
    "application/vnd.wolfram.player": {
      source: "iana",
      extensions: ["nbp"]
    },
    "application/vnd.wordperfect": {
      source: "iana",
      extensions: ["wpd"]
    },
    "application/vnd.wqd": {
      source: "iana",
      extensions: ["wqd"]
    },
    "application/vnd.wrq-hp3000-labelled": {
      source: "iana"
    },
    "application/vnd.wt.stf": {
      source: "iana",
      extensions: ["stf"]
    },
    "application/vnd.wv.csp+wbxml": {
      source: "iana"
    },
    "application/vnd.wv.csp+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.wv.ssp+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.xacml+json": {
      source: "iana",
      compressible: true
    },
    "application/vnd.xara": {
      source: "iana",
      extensions: ["xar"]
    },
    "application/vnd.xfdl": {
      source: "iana",
      extensions: ["xfdl"]
    },
    "application/vnd.xfdl.webform": {
      source: "iana"
    },
    "application/vnd.xmi+xml": {
      source: "iana",
      compressible: true
    },
    "application/vnd.xmpie.cpkg": {
      source: "iana"
    },
    "application/vnd.xmpie.dpkg": {
      source: "iana"
    },
    "application/vnd.xmpie.plan": {
      source: "iana"
    },
    "application/vnd.xmpie.ppkg": {
      source: "iana"
    },
    "application/vnd.xmpie.xlim": {
      source: "iana"
    },
    "application/vnd.yamaha.hv-dic": {
      source: "iana",
      extensions: ["hvd"]
    },
    "application/vnd.yamaha.hv-script": {
      source: "iana",
      extensions: ["hvs"]
    },
    "application/vnd.yamaha.hv-voice": {
      source: "iana",
      extensions: ["hvp"]
    },
    "application/vnd.yamaha.openscoreformat": {
      source: "iana",
      extensions: ["osf"]
    },
    "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
      source: "iana",
      compressible: true,
      extensions: ["osfpvg"]
    },
    "application/vnd.yamaha.remote-setup": {
      source: "iana"
    },
    "application/vnd.yamaha.smaf-audio": {
      source: "iana",
      extensions: ["saf"]
    },
    "application/vnd.yamaha.smaf-phrase": {
      source: "iana",
      extensions: ["spf"]
    },
    "application/vnd.yamaha.through-ngn": {
      source: "iana"
    },
    "application/vnd.yamaha.tunnel-udpencap": {
      source: "iana"
    },
    "application/vnd.yaoweme": {
      source: "iana"
    },
    "application/vnd.yellowriver-custom-menu": {
      source: "iana",
      extensions: ["cmp"]
    },
    "application/vnd.youtube.yt": {
      source: "iana"
    },
    "application/vnd.zul": {
      source: "iana",
      extensions: ["zir", "zirz"]
    },
    "application/vnd.zzazz.deck+xml": {
      source: "iana",
      compressible: true,
      extensions: ["zaz"]
    },
    "application/voicexml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["vxml"]
    },
    "application/voucher-cms+json": {
      source: "iana",
      compressible: true
    },
    "application/vq-rtcpxr": {
      source: "iana"
    },
    "application/wasm": {
      source: "iana",
      compressible: true,
      extensions: ["wasm"]
    },
    "application/watcherinfo+xml": {
      source: "iana",
      compressible: true,
      extensions: ["wif"]
    },
    "application/webpush-options+json": {
      source: "iana",
      compressible: true
    },
    "application/whoispp-query": {
      source: "iana"
    },
    "application/whoispp-response": {
      source: "iana"
    },
    "application/widget": {
      source: "iana",
      extensions: ["wgt"]
    },
    "application/winhlp": {
      source: "apache",
      extensions: ["hlp"]
    },
    "application/wita": {
      source: "iana"
    },
    "application/wordperfect5.1": {
      source: "iana"
    },
    "application/wsdl+xml": {
      source: "iana",
      compressible: true,
      extensions: ["wsdl"]
    },
    "application/wspolicy+xml": {
      source: "iana",
      compressible: true,
      extensions: ["wspolicy"]
    },
    "application/x-7z-compressed": {
      source: "apache",
      compressible: false,
      extensions: ["7z"]
    },
    "application/x-abiword": {
      source: "apache",
      extensions: ["abw"]
    },
    "application/x-ace-compressed": {
      source: "apache",
      extensions: ["ace"]
    },
    "application/x-amf": {
      source: "apache"
    },
    "application/x-apple-diskimage": {
      source: "apache",
      extensions: ["dmg"]
    },
    "application/x-arj": {
      compressible: false,
      extensions: ["arj"]
    },
    "application/x-authorware-bin": {
      source: "apache",
      extensions: ["aab", "x32", "u32", "vox"]
    },
    "application/x-authorware-map": {
      source: "apache",
      extensions: ["aam"]
    },
    "application/x-authorware-seg": {
      source: "apache",
      extensions: ["aas"]
    },
    "application/x-bcpio": {
      source: "apache",
      extensions: ["bcpio"]
    },
    "application/x-bdoc": {
      compressible: false,
      extensions: ["bdoc"]
    },
    "application/x-bittorrent": {
      source: "apache",
      extensions: ["torrent"]
    },
    "application/x-blorb": {
      source: "apache",
      extensions: ["blb", "blorb"]
    },
    "application/x-bzip": {
      source: "apache",
      compressible: false,
      extensions: ["bz"]
    },
    "application/x-bzip2": {
      source: "apache",
      compressible: false,
      extensions: ["bz2", "boz"]
    },
    "application/x-cbr": {
      source: "apache",
      extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
    },
    "application/x-cdlink": {
      source: "apache",
      extensions: ["vcd"]
    },
    "application/x-cfs-compressed": {
      source: "apache",
      extensions: ["cfs"]
    },
    "application/x-chat": {
      source: "apache",
      extensions: ["chat"]
    },
    "application/x-chess-pgn": {
      source: "apache",
      extensions: ["pgn"]
    },
    "application/x-chrome-extension": {
      extensions: ["crx"]
    },
    "application/x-cocoa": {
      source: "nginx",
      extensions: ["cco"]
    },
    "application/x-compress": {
      source: "apache"
    },
    "application/x-conference": {
      source: "apache",
      extensions: ["nsc"]
    },
    "application/x-cpio": {
      source: "apache",
      extensions: ["cpio"]
    },
    "application/x-csh": {
      source: "apache",
      extensions: ["csh"]
    },
    "application/x-deb": {
      compressible: false
    },
    "application/x-debian-package": {
      source: "apache",
      extensions: ["deb", "udeb"]
    },
    "application/x-dgc-compressed": {
      source: "apache",
      extensions: ["dgc"]
    },
    "application/x-director": {
      source: "apache",
      extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
    },
    "application/x-doom": {
      source: "apache",
      extensions: ["wad"]
    },
    "application/x-dtbncx+xml": {
      source: "apache",
      compressible: true,
      extensions: ["ncx"]
    },
    "application/x-dtbook+xml": {
      source: "apache",
      compressible: true,
      extensions: ["dtb"]
    },
    "application/x-dtbresource+xml": {
      source: "apache",
      compressible: true,
      extensions: ["res"]
    },
    "application/x-dvi": {
      source: "apache",
      compressible: false,
      extensions: ["dvi"]
    },
    "application/x-envoy": {
      source: "apache",
      extensions: ["evy"]
    },
    "application/x-eva": {
      source: "apache",
      extensions: ["eva"]
    },
    "application/x-font-bdf": {
      source: "apache",
      extensions: ["bdf"]
    },
    "application/x-font-dos": {
      source: "apache"
    },
    "application/x-font-framemaker": {
      source: "apache"
    },
    "application/x-font-ghostscript": {
      source: "apache",
      extensions: ["gsf"]
    },
    "application/x-font-libgrx": {
      source: "apache"
    },
    "application/x-font-linux-psf": {
      source: "apache",
      extensions: ["psf"]
    },
    "application/x-font-pcf": {
      source: "apache",
      extensions: ["pcf"]
    },
    "application/x-font-snf": {
      source: "apache",
      extensions: ["snf"]
    },
    "application/x-font-speedo": {
      source: "apache"
    },
    "application/x-font-sunos-news": {
      source: "apache"
    },
    "application/x-font-type1": {
      source: "apache",
      extensions: ["pfa", "pfb", "pfm", "afm"]
    },
    "application/x-font-vfont": {
      source: "apache"
    },
    "application/x-freearc": {
      source: "apache",
      extensions: ["arc"]
    },
    "application/x-futuresplash": {
      source: "apache",
      extensions: ["spl"]
    },
    "application/x-gca-compressed": {
      source: "apache",
      extensions: ["gca"]
    },
    "application/x-glulx": {
      source: "apache",
      extensions: ["ulx"]
    },
    "application/x-gnumeric": {
      source: "apache",
      extensions: ["gnumeric"]
    },
    "application/x-gramps-xml": {
      source: "apache",
      extensions: ["gramps"]
    },
    "application/x-gtar": {
      source: "apache",
      extensions: ["gtar"]
    },
    "application/x-gzip": {
      source: "apache"
    },
    "application/x-hdf": {
      source: "apache",
      extensions: ["hdf"]
    },
    "application/x-httpd-php": {
      compressible: true,
      extensions: ["php"]
    },
    "application/x-install-instructions": {
      source: "apache",
      extensions: ["install"]
    },
    "application/x-iso9660-image": {
      source: "apache",
      extensions: ["iso"]
    },
    "application/x-iwork-keynote-sffkey": {
      extensions: ["key"]
    },
    "application/x-iwork-numbers-sffnumbers": {
      extensions: ["numbers"]
    },
    "application/x-iwork-pages-sffpages": {
      extensions: ["pages"]
    },
    "application/x-java-archive-diff": {
      source: "nginx",
      extensions: ["jardiff"]
    },
    "application/x-java-jnlp-file": {
      source: "apache",
      compressible: false,
      extensions: ["jnlp"]
    },
    "application/x-javascript": {
      compressible: true
    },
    "application/x-keepass2": {
      extensions: ["kdbx"]
    },
    "application/x-latex": {
      source: "apache",
      compressible: false,
      extensions: ["latex"]
    },
    "application/x-lua-bytecode": {
      extensions: ["luac"]
    },
    "application/x-lzh-compressed": {
      source: "apache",
      extensions: ["lzh", "lha"]
    },
    "application/x-makeself": {
      source: "nginx",
      extensions: ["run"]
    },
    "application/x-mie": {
      source: "apache",
      extensions: ["mie"]
    },
    "application/x-mobipocket-ebook": {
      source: "apache",
      extensions: ["prc", "mobi"]
    },
    "application/x-mpegurl": {
      compressible: false
    },
    "application/x-ms-application": {
      source: "apache",
      extensions: ["application"]
    },
    "application/x-ms-shortcut": {
      source: "apache",
      extensions: ["lnk"]
    },
    "application/x-ms-wmd": {
      source: "apache",
      extensions: ["wmd"]
    },
    "application/x-ms-wmz": {
      source: "apache",
      extensions: ["wmz"]
    },
    "application/x-ms-xbap": {
      source: "apache",
      extensions: ["xbap"]
    },
    "application/x-msaccess": {
      source: "apache",
      extensions: ["mdb"]
    },
    "application/x-msbinder": {
      source: "apache",
      extensions: ["obd"]
    },
    "application/x-mscardfile": {
      source: "apache",
      extensions: ["crd"]
    },
    "application/x-msclip": {
      source: "apache",
      extensions: ["clp"]
    },
    "application/x-msdos-program": {
      extensions: ["exe"]
    },
    "application/x-msdownload": {
      source: "apache",
      extensions: ["exe", "dll", "com", "bat", "msi"]
    },
    "application/x-msmediaview": {
      source: "apache",
      extensions: ["mvb", "m13", "m14"]
    },
    "application/x-msmetafile": {
      source: "apache",
      extensions: ["wmf", "wmz", "emf", "emz"]
    },
    "application/x-msmoney": {
      source: "apache",
      extensions: ["mny"]
    },
    "application/x-mspublisher": {
      source: "apache",
      extensions: ["pub"]
    },
    "application/x-msschedule": {
      source: "apache",
      extensions: ["scd"]
    },
    "application/x-msterminal": {
      source: "apache",
      extensions: ["trm"]
    },
    "application/x-mswrite": {
      source: "apache",
      extensions: ["wri"]
    },
    "application/x-netcdf": {
      source: "apache",
      extensions: ["nc", "cdf"]
    },
    "application/x-ns-proxy-autoconfig": {
      compressible: true,
      extensions: ["pac"]
    },
    "application/x-nzb": {
      source: "apache",
      extensions: ["nzb"]
    },
    "application/x-perl": {
      source: "nginx",
      extensions: ["pl", "pm"]
    },
    "application/x-pilot": {
      source: "nginx",
      extensions: ["prc", "pdb"]
    },
    "application/x-pkcs12": {
      source: "apache",
      compressible: false,
      extensions: ["p12", "pfx"]
    },
    "application/x-pkcs7-certificates": {
      source: "apache",
      extensions: ["p7b", "spc"]
    },
    "application/x-pkcs7-certreqresp": {
      source: "apache",
      extensions: ["p7r"]
    },
    "application/x-pki-message": {
      source: "iana"
    },
    "application/x-rar-compressed": {
      source: "apache",
      compressible: false,
      extensions: ["rar"]
    },
    "application/x-redhat-package-manager": {
      source: "nginx",
      extensions: ["rpm"]
    },
    "application/x-research-info-systems": {
      source: "apache",
      extensions: ["ris"]
    },
    "application/x-sea": {
      source: "nginx",
      extensions: ["sea"]
    },
    "application/x-sh": {
      source: "apache",
      compressible: true,
      extensions: ["sh"]
    },
    "application/x-shar": {
      source: "apache",
      extensions: ["shar"]
    },
    "application/x-shockwave-flash": {
      source: "apache",
      compressible: false,
      extensions: ["swf"]
    },
    "application/x-silverlight-app": {
      source: "apache",
      extensions: ["xap"]
    },
    "application/x-sql": {
      source: "apache",
      extensions: ["sql"]
    },
    "application/x-stuffit": {
      source: "apache",
      compressible: false,
      extensions: ["sit"]
    },
    "application/x-stuffitx": {
      source: "apache",
      extensions: ["sitx"]
    },
    "application/x-subrip": {
      source: "apache",
      extensions: ["srt"]
    },
    "application/x-sv4cpio": {
      source: "apache",
      extensions: ["sv4cpio"]
    },
    "application/x-sv4crc": {
      source: "apache",
      extensions: ["sv4crc"]
    },
    "application/x-t3vm-image": {
      source: "apache",
      extensions: ["t3"]
    },
    "application/x-tads": {
      source: "apache",
      extensions: ["gam"]
    },
    "application/x-tar": {
      source: "apache",
      compressible: true,
      extensions: ["tar"]
    },
    "application/x-tcl": {
      source: "apache",
      extensions: ["tcl", "tk"]
    },
    "application/x-tex": {
      source: "apache",
      extensions: ["tex"]
    },
    "application/x-tex-tfm": {
      source: "apache",
      extensions: ["tfm"]
    },
    "application/x-texinfo": {
      source: "apache",
      extensions: ["texinfo", "texi"]
    },
    "application/x-tgif": {
      source: "apache",
      extensions: ["obj"]
    },
    "application/x-ustar": {
      source: "apache",
      extensions: ["ustar"]
    },
    "application/x-virtualbox-hdd": {
      compressible: true,
      extensions: ["hdd"]
    },
    "application/x-virtualbox-ova": {
      compressible: true,
      extensions: ["ova"]
    },
    "application/x-virtualbox-ovf": {
      compressible: true,
      extensions: ["ovf"]
    },
    "application/x-virtualbox-vbox": {
      compressible: true,
      extensions: ["vbox"]
    },
    "application/x-virtualbox-vbox-extpack": {
      compressible: false,
      extensions: ["vbox-extpack"]
    },
    "application/x-virtualbox-vdi": {
      compressible: true,
      extensions: ["vdi"]
    },
    "application/x-virtualbox-vhd": {
      compressible: true,
      extensions: ["vhd"]
    },
    "application/x-virtualbox-vmdk": {
      compressible: true,
      extensions: ["vmdk"]
    },
    "application/x-wais-source": {
      source: "apache",
      extensions: ["src"]
    },
    "application/x-web-app-manifest+json": {
      compressible: true,
      extensions: ["webapp"]
    },
    "application/x-www-form-urlencoded": {
      source: "iana",
      compressible: true
    },
    "application/x-x509-ca-cert": {
      source: "iana",
      extensions: ["der", "crt", "pem"]
    },
    "application/x-x509-ca-ra-cert": {
      source: "iana"
    },
    "application/x-x509-next-ca-cert": {
      source: "iana"
    },
    "application/x-xfig": {
      source: "apache",
      extensions: ["fig"]
    },
    "application/x-xliff+xml": {
      source: "apache",
      compressible: true,
      extensions: ["xlf"]
    },
    "application/x-xpinstall": {
      source: "apache",
      compressible: false,
      extensions: ["xpi"]
    },
    "application/x-xz": {
      source: "apache",
      extensions: ["xz"]
    },
    "application/x-zmachine": {
      source: "apache",
      extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
    },
    "application/x400-bp": {
      source: "iana"
    },
    "application/xacml+xml": {
      source: "iana",
      compressible: true
    },
    "application/xaml+xml": {
      source: "apache",
      compressible: true,
      extensions: ["xaml"]
    },
    "application/xcap-att+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xav"]
    },
    "application/xcap-caps+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xca"]
    },
    "application/xcap-diff+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xdf"]
    },
    "application/xcap-el+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xel"]
    },
    "application/xcap-error+xml": {
      source: "iana",
      compressible: true
    },
    "application/xcap-ns+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xns"]
    },
    "application/xcon-conference-info+xml": {
      source: "iana",
      compressible: true
    },
    "application/xcon-conference-info-diff+xml": {
      source: "iana",
      compressible: true
    },
    "application/xenc+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xenc"]
    },
    "application/xhtml+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xhtml", "xht"]
    },
    "application/xhtml-voice+xml": {
      source: "apache",
      compressible: true
    },
    "application/xliff+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xlf"]
    },
    "application/xml": {
      source: "iana",
      compressible: true,
      extensions: ["xml", "xsl", "xsd", "rng"]
    },
    "application/xml-dtd": {
      source: "iana",
      compressible: true,
      extensions: ["dtd"]
    },
    "application/xml-external-parsed-entity": {
      source: "iana"
    },
    "application/xml-patch+xml": {
      source: "iana",
      compressible: true
    },
    "application/xmpp+xml": {
      source: "iana",
      compressible: true
    },
    "application/xop+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xop"]
    },
    "application/xproc+xml": {
      source: "apache",
      compressible: true,
      extensions: ["xpl"]
    },
    "application/xslt+xml": {
      source: "iana",
      compressible: true,
      extensions: ["xsl", "xslt"]
    },
    "application/xspf+xml": {
      source: "apache",
      compressible: true,
      extensions: ["xspf"]
    },
    "application/xv+xml": {
      source: "iana",
      compressible: true,
      extensions: ["mxml", "xhvml", "xvml", "xvm"]
    },
    "application/yang": {
      source: "iana",
      extensions: ["yang"]
    },
    "application/yang-data+json": {
      source: "iana",
      compressible: true
    },
    "application/yang-data+xml": {
      source: "iana",
      compressible: true
    },
    "application/yang-patch+json": {
      source: "iana",
      compressible: true
    },
    "application/yang-patch+xml": {
      source: "iana",
      compressible: true
    },
    "application/yin+xml": {
      source: "iana",
      compressible: true,
      extensions: ["yin"]
    },
    "application/zip": {
      source: "iana",
      compressible: false,
      extensions: ["zip"]
    },
    "application/zlib": {
      source: "iana"
    },
    "application/zstd": {
      source: "iana"
    },
    "audio/1d-interleaved-parityfec": {
      source: "iana"
    },
    "audio/32kadpcm": {
      source: "iana"
    },
    "audio/3gpp": {
      source: "iana",
      compressible: false,
      extensions: ["3gpp"]
    },
    "audio/3gpp2": {
      source: "iana"
    },
    "audio/aac": {
      source: "iana"
    },
    "audio/ac3": {
      source: "iana"
    },
    "audio/adpcm": {
      source: "apache",
      extensions: ["adp"]
    },
    "audio/amr": {
      source: "iana",
      extensions: ["amr"]
    },
    "audio/amr-wb": {
      source: "iana"
    },
    "audio/amr-wb+": {
      source: "iana"
    },
    "audio/aptx": {
      source: "iana"
    },
    "audio/asc": {
      source: "iana"
    },
    "audio/atrac-advanced-lossless": {
      source: "iana"
    },
    "audio/atrac-x": {
      source: "iana"
    },
    "audio/atrac3": {
      source: "iana"
    },
    "audio/basic": {
      source: "iana",
      compressible: false,
      extensions: ["au", "snd"]
    },
    "audio/bv16": {
      source: "iana"
    },
    "audio/bv32": {
      source: "iana"
    },
    "audio/clearmode": {
      source: "iana"
    },
    "audio/cn": {
      source: "iana"
    },
    "audio/dat12": {
      source: "iana"
    },
    "audio/dls": {
      source: "iana"
    },
    "audio/dsr-es201108": {
      source: "iana"
    },
    "audio/dsr-es202050": {
      source: "iana"
    },
    "audio/dsr-es202211": {
      source: "iana"
    },
    "audio/dsr-es202212": {
      source: "iana"
    },
    "audio/dv": {
      source: "iana"
    },
    "audio/dvi4": {
      source: "iana"
    },
    "audio/eac3": {
      source: "iana"
    },
    "audio/encaprtp": {
      source: "iana"
    },
    "audio/evrc": {
      source: "iana"
    },
    "audio/evrc-qcp": {
      source: "iana"
    },
    "audio/evrc0": {
      source: "iana"
    },
    "audio/evrc1": {
      source: "iana"
    },
    "audio/evrcb": {
      source: "iana"
    },
    "audio/evrcb0": {
      source: "iana"
    },
    "audio/evrcb1": {
      source: "iana"
    },
    "audio/evrcnw": {
      source: "iana"
    },
    "audio/evrcnw0": {
      source: "iana"
    },
    "audio/evrcnw1": {
      source: "iana"
    },
    "audio/evrcwb": {
      source: "iana"
    },
    "audio/evrcwb0": {
      source: "iana"
    },
    "audio/evrcwb1": {
      source: "iana"
    },
    "audio/evs": {
      source: "iana"
    },
    "audio/flexfec": {
      source: "iana"
    },
    "audio/fwdred": {
      source: "iana"
    },
    "audio/g711-0": {
      source: "iana"
    },
    "audio/g719": {
      source: "iana"
    },
    "audio/g722": {
      source: "iana"
    },
    "audio/g7221": {
      source: "iana"
    },
    "audio/g723": {
      source: "iana"
    },
    "audio/g726-16": {
      source: "iana"
    },
    "audio/g726-24": {
      source: "iana"
    },
    "audio/g726-32": {
      source: "iana"
    },
    "audio/g726-40": {
      source: "iana"
    },
    "audio/g728": {
      source: "iana"
    },
    "audio/g729": {
      source: "iana"
    },
    "audio/g7291": {
      source: "iana"
    },
    "audio/g729d": {
      source: "iana"
    },
    "audio/g729e": {
      source: "iana"
    },
    "audio/gsm": {
      source: "iana"
    },
    "audio/gsm-efr": {
      source: "iana"
    },
    "audio/gsm-hr-08": {
      source: "iana"
    },
    "audio/ilbc": {
      source: "iana"
    },
    "audio/ip-mr_v2.5": {
      source: "iana"
    },
    "audio/isac": {
      source: "apache"
    },
    "audio/l16": {
      source: "iana"
    },
    "audio/l20": {
      source: "iana"
    },
    "audio/l24": {
      source: "iana",
      compressible: false
    },
    "audio/l8": {
      source: "iana"
    },
    "audio/lpc": {
      source: "iana"
    },
    "audio/melp": {
      source: "iana"
    },
    "audio/melp1200": {
      source: "iana"
    },
    "audio/melp2400": {
      source: "iana"
    },
    "audio/melp600": {
      source: "iana"
    },
    "audio/mhas": {
      source: "iana"
    },
    "audio/midi": {
      source: "apache",
      extensions: ["mid", "midi", "kar", "rmi"]
    },
    "audio/mobile-xmf": {
      source: "iana",
      extensions: ["mxmf"]
    },
    "audio/mp3": {
      compressible: false,
      extensions: ["mp3"]
    },
    "audio/mp4": {
      source: "iana",
      compressible: false,
      extensions: ["m4a", "mp4a"]
    },
    "audio/mp4a-latm": {
      source: "iana"
    },
    "audio/mpa": {
      source: "iana"
    },
    "audio/mpa-robust": {
      source: "iana"
    },
    "audio/mpeg": {
      source: "iana",
      compressible: false,
      extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
    },
    "audio/mpeg4-generic": {
      source: "iana"
    },
    "audio/musepack": {
      source: "apache"
    },
    "audio/ogg": {
      source: "iana",
      compressible: false,
      extensions: ["oga", "ogg", "spx", "opus"]
    },
    "audio/opus": {
      source: "iana"
    },
    "audio/parityfec": {
      source: "iana"
    },
    "audio/pcma": {
      source: "iana"
    },
    "audio/pcma-wb": {
      source: "iana"
    },
    "audio/pcmu": {
      source: "iana"
    },
    "audio/pcmu-wb": {
      source: "iana"
    },
    "audio/prs.sid": {
      source: "iana"
    },
    "audio/qcelp": {
      source: "iana"
    },
    "audio/raptorfec": {
      source: "iana"
    },
    "audio/red": {
      source: "iana"
    },
    "audio/rtp-enc-aescm128": {
      source: "iana"
    },
    "audio/rtp-midi": {
      source: "iana"
    },
    "audio/rtploopback": {
      source: "iana"
    },
    "audio/rtx": {
      source: "iana"
    },
    "audio/s3m": {
      source: "apache",
      extensions: ["s3m"]
    },
    "audio/scip": {
      source: "iana"
    },
    "audio/silk": {
      source: "apache",
      extensions: ["sil"]
    },
    "audio/smv": {
      source: "iana"
    },
    "audio/smv-qcp": {
      source: "iana"
    },
    "audio/smv0": {
      source: "iana"
    },
    "audio/sofa": {
      source: "iana"
    },
    "audio/sp-midi": {
      source: "iana"
    },
    "audio/speex": {
      source: "iana"
    },
    "audio/t140c": {
      source: "iana"
    },
    "audio/t38": {
      source: "iana"
    },
    "audio/telephone-event": {
      source: "iana"
    },
    "audio/tetra_acelp": {
      source: "iana"
    },
    "audio/tetra_acelp_bb": {
      source: "iana"
    },
    "audio/tone": {
      source: "iana"
    },
    "audio/tsvcis": {
      source: "iana"
    },
    "audio/uemclip": {
      source: "iana"
    },
    "audio/ulpfec": {
      source: "iana"
    },
    "audio/usac": {
      source: "iana"
    },
    "audio/vdvi": {
      source: "iana"
    },
    "audio/vmr-wb": {
      source: "iana"
    },
    "audio/vnd.3gpp.iufp": {
      source: "iana"
    },
    "audio/vnd.4sb": {
      source: "iana"
    },
    "audio/vnd.audiokoz": {
      source: "iana"
    },
    "audio/vnd.celp": {
      source: "iana"
    },
    "audio/vnd.cisco.nse": {
      source: "iana"
    },
    "audio/vnd.cmles.radio-events": {
      source: "iana"
    },
    "audio/vnd.cns.anp1": {
      source: "iana"
    },
    "audio/vnd.cns.inf1": {
      source: "iana"
    },
    "audio/vnd.dece.audio": {
      source: "iana",
      extensions: ["uva", "uvva"]
    },
    "audio/vnd.digital-winds": {
      source: "iana",
      extensions: ["eol"]
    },
    "audio/vnd.dlna.adts": {
      source: "iana"
    },
    "audio/vnd.dolby.heaac.1": {
      source: "iana"
    },
    "audio/vnd.dolby.heaac.2": {
      source: "iana"
    },
    "audio/vnd.dolby.mlp": {
      source: "iana"
    },
    "audio/vnd.dolby.mps": {
      source: "iana"
    },
    "audio/vnd.dolby.pl2": {
      source: "iana"
    },
    "audio/vnd.dolby.pl2x": {
      source: "iana"
    },
    "audio/vnd.dolby.pl2z": {
      source: "iana"
    },
    "audio/vnd.dolby.pulse.1": {
      source: "iana"
    },
    "audio/vnd.dra": {
      source: "iana",
      extensions: ["dra"]
    },
    "audio/vnd.dts": {
      source: "iana",
      extensions: ["dts"]
    },
    "audio/vnd.dts.hd": {
      source: "iana",
      extensions: ["dtshd"]
    },
    "audio/vnd.dts.uhd": {
      source: "iana"
    },
    "audio/vnd.dvb.file": {
      source: "iana"
    },
    "audio/vnd.everad.plj": {
      source: "iana"
    },
    "audio/vnd.hns.audio": {
      source: "iana"
    },
    "audio/vnd.lucent.voice": {
      source: "iana",
      extensions: ["lvp"]
    },
    "audio/vnd.ms-playready.media.pya": {
      source: "iana",
      extensions: ["pya"]
    },
    "audio/vnd.nokia.mobile-xmf": {
      source: "iana"
    },
    "audio/vnd.nortel.vbk": {
      source: "iana"
    },
    "audio/vnd.nuera.ecelp4800": {
      source: "iana",
      extensions: ["ecelp4800"]
    },
    "audio/vnd.nuera.ecelp7470": {
      source: "iana",
      extensions: ["ecelp7470"]
    },
    "audio/vnd.nuera.ecelp9600": {
      source: "iana",
      extensions: ["ecelp9600"]
    },
    "audio/vnd.octel.sbc": {
      source: "iana"
    },
    "audio/vnd.presonus.multitrack": {
      source: "iana"
    },
    "audio/vnd.qcelp": {
      source: "iana"
    },
    "audio/vnd.rhetorex.32kadpcm": {
      source: "iana"
    },
    "audio/vnd.rip": {
      source: "iana",
      extensions: ["rip"]
    },
    "audio/vnd.rn-realaudio": {
      compressible: false
    },
    "audio/vnd.sealedmedia.softseal.mpeg": {
      source: "iana"
    },
    "audio/vnd.vmx.cvsd": {
      source: "iana"
    },
    "audio/vnd.wave": {
      compressible: false
    },
    "audio/vorbis": {
      source: "iana",
      compressible: false
    },
    "audio/vorbis-config": {
      source: "iana"
    },
    "audio/wav": {
      compressible: false,
      extensions: ["wav"]
    },
    "audio/wave": {
      compressible: false,
      extensions: ["wav"]
    },
    "audio/webm": {
      source: "apache",
      compressible: false,
      extensions: ["weba"]
    },
    "audio/x-aac": {
      source: "apache",
      compressible: false,
      extensions: ["aac"]
    },
    "audio/x-aiff": {
      source: "apache",
      extensions: ["aif", "aiff", "aifc"]
    },
    "audio/x-caf": {
      source: "apache",
      compressible: false,
      extensions: ["caf"]
    },
    "audio/x-flac": {
      source: "apache",
      extensions: ["flac"]
    },
    "audio/x-m4a": {
      source: "nginx",
      extensions: ["m4a"]
    },
    "audio/x-matroska": {
      source: "apache",
      extensions: ["mka"]
    },
    "audio/x-mpegurl": {
      source: "apache",
      extensions: ["m3u"]
    },
    "audio/x-ms-wax": {
      source: "apache",
      extensions: ["wax"]
    },
    "audio/x-ms-wma": {
      source: "apache",
      extensions: ["wma"]
    },
    "audio/x-pn-realaudio": {
      source: "apache",
      extensions: ["ram", "ra"]
    },
    "audio/x-pn-realaudio-plugin": {
      source: "apache",
      extensions: ["rmp"]
    },
    "audio/x-realaudio": {
      source: "nginx",
      extensions: ["ra"]
    },
    "audio/x-tta": {
      source: "apache"
    },
    "audio/x-wav": {
      source: "apache",
      extensions: ["wav"]
    },
    "audio/xm": {
      source: "apache",
      extensions: ["xm"]
    },
    "chemical/x-cdx": {
      source: "apache",
      extensions: ["cdx"]
    },
    "chemical/x-cif": {
      source: "apache",
      extensions: ["cif"]
    },
    "chemical/x-cmdf": {
      source: "apache",
      extensions: ["cmdf"]
    },
    "chemical/x-cml": {
      source: "apache",
      extensions: ["cml"]
    },
    "chemical/x-csml": {
      source: "apache",
      extensions: ["csml"]
    },
    "chemical/x-pdb": {
      source: "apache"
    },
    "chemical/x-xyz": {
      source: "apache",
      extensions: ["xyz"]
    },
    "font/collection": {
      source: "iana",
      extensions: ["ttc"]
    },
    "font/otf": {
      source: "iana",
      compressible: true,
      extensions: ["otf"]
    },
    "font/sfnt": {
      source: "iana"
    },
    "font/ttf": {
      source: "iana",
      compressible: true,
      extensions: ["ttf"]
    },
    "font/woff": {
      source: "iana",
      extensions: ["woff"]
    },
    "font/woff2": {
      source: "iana",
      extensions: ["woff2"]
    },
    "image/aces": {
      source: "iana",
      extensions: ["exr"]
    },
    "image/apng": {
      compressible: false,
      extensions: ["apng"]
    },
    "image/avci": {
      source: "iana",
      extensions: ["avci"]
    },
    "image/avcs": {
      source: "iana",
      extensions: ["avcs"]
    },
    "image/avif": {
      source: "iana",
      compressible: false,
      extensions: ["avif"]
    },
    "image/bmp": {
      source: "iana",
      compressible: true,
      extensions: ["bmp"]
    },
    "image/cgm": {
      source: "iana",
      extensions: ["cgm"]
    },
    "image/dicom-rle": {
      source: "iana",
      extensions: ["drle"]
    },
    "image/emf": {
      source: "iana",
      extensions: ["emf"]
    },
    "image/fits": {
      source: "iana",
      extensions: ["fits"]
    },
    "image/g3fax": {
      source: "iana",
      extensions: ["g3"]
    },
    "image/gif": {
      source: "iana",
      compressible: false,
      extensions: ["gif"]
    },
    "image/heic": {
      source: "iana",
      extensions: ["heic"]
    },
    "image/heic-sequence": {
      source: "iana",
      extensions: ["heics"]
    },
    "image/heif": {
      source: "iana",
      extensions: ["heif"]
    },
    "image/heif-sequence": {
      source: "iana",
      extensions: ["heifs"]
    },
    "image/hej2k": {
      source: "iana",
      extensions: ["hej2"]
    },
    "image/hsj2": {
      source: "iana",
      extensions: ["hsj2"]
    },
    "image/ief": {
      source: "iana",
      extensions: ["ief"]
    },
    "image/jls": {
      source: "iana",
      extensions: ["jls"]
    },
    "image/jp2": {
      source: "iana",
      compressible: false,
      extensions: ["jp2", "jpg2"]
    },
    "image/jpeg": {
      source: "iana",
      compressible: false,
      extensions: ["jpeg", "jpg", "jpe"]
    },
    "image/jph": {
      source: "iana",
      extensions: ["jph"]
    },
    "image/jphc": {
      source: "iana",
      extensions: ["jhc"]
    },
    "image/jpm": {
      source: "iana",
      compressible: false,
      extensions: ["jpm"]
    },
    "image/jpx": {
      source: "iana",
      compressible: false,
      extensions: ["jpx", "jpf"]
    },
    "image/jxr": {
      source: "iana",
      extensions: ["jxr"]
    },
    "image/jxra": {
      source: "iana",
      extensions: ["jxra"]
    },
    "image/jxrs": {
      source: "iana",
      extensions: ["jxrs"]
    },
    "image/jxs": {
      source: "iana",
      extensions: ["jxs"]
    },
    "image/jxsc": {
      source: "iana",
      extensions: ["jxsc"]
    },
    "image/jxsi": {
      source: "iana",
      extensions: ["jxsi"]
    },
    "image/jxss": {
      source: "iana",
      extensions: ["jxss"]
    },
    "image/ktx": {
      source: "iana",
      extensions: ["ktx"]
    },
    "image/ktx2": {
      source: "iana",
      extensions: ["ktx2"]
    },
    "image/naplps": {
      source: "iana"
    },
    "image/pjpeg": {
      compressible: false
    },
    "image/png": {
      source: "iana",
      compressible: false,
      extensions: ["png"]
    },
    "image/prs.btif": {
      source: "iana",
      extensions: ["btif"]
    },
    "image/prs.pti": {
      source: "iana",
      extensions: ["pti"]
    },
    "image/pwg-raster": {
      source: "iana"
    },
    "image/sgi": {
      source: "apache",
      extensions: ["sgi"]
    },
    "image/svg+xml": {
      source: "iana",
      compressible: true,
      extensions: ["svg", "svgz"]
    },
    "image/t38": {
      source: "iana",
      extensions: ["t38"]
    },
    "image/tiff": {
      source: "iana",
      compressible: false,
      extensions: ["tif", "tiff"]
    },
    "image/tiff-fx": {
      source: "iana",
      extensions: ["tfx"]
    },
    "image/vnd.adobe.photoshop": {
      source: "iana",
      compressible: true,
      extensions: ["psd"]
    },
    "image/vnd.airzip.accelerator.azv": {
      source: "iana",
      extensions: ["azv"]
    },
    "image/vnd.cns.inf2": {
      source: "iana"
    },
    "image/vnd.dece.graphic": {
      source: "iana",
      extensions: ["uvi", "uvvi", "uvg", "uvvg"]
    },
    "image/vnd.djvu": {
      source: "iana",
      extensions: ["djvu", "djv"]
    },
    "image/vnd.dvb.subtitle": {
      source: "iana",
      extensions: ["sub"]
    },
    "image/vnd.dwg": {
      source: "iana",
      extensions: ["dwg"]
    },
    "image/vnd.dxf": {
      source: "iana",
      extensions: ["dxf"]
    },
    "image/vnd.fastbidsheet": {
      source: "iana",
      extensions: ["fbs"]
    },
    "image/vnd.fpx": {
      source: "iana",
      extensions: ["fpx"]
    },
    "image/vnd.fst": {
      source: "iana",
      extensions: ["fst"]
    },
    "image/vnd.fujixerox.edmics-mmr": {
      source: "iana",
      extensions: ["mmr"]
    },
    "image/vnd.fujixerox.edmics-rlc": {
      source: "iana",
      extensions: ["rlc"]
    },
    "image/vnd.globalgraphics.pgb": {
      source: "iana"
    },
    "image/vnd.microsoft.icon": {
      source: "iana",
      compressible: true,
      extensions: ["ico"]
    },
    "image/vnd.mix": {
      source: "iana"
    },
    "image/vnd.mozilla.apng": {
      source: "iana"
    },
    "image/vnd.ms-dds": {
      compressible: true,
      extensions: ["dds"]
    },
    "image/vnd.ms-modi": {
      source: "iana",
      extensions: ["mdi"]
    },
    "image/vnd.ms-photo": {
      source: "apache",
      extensions: ["wdp"]
    },
    "image/vnd.net-fpx": {
      source: "iana",
      extensions: ["npx"]
    },
    "image/vnd.pco.b16": {
      source: "iana",
      extensions: ["b16"]
    },
    "image/vnd.radiance": {
      source: "iana"
    },
    "image/vnd.sealed.png": {
      source: "iana"
    },
    "image/vnd.sealedmedia.softseal.gif": {
      source: "iana"
    },
    "image/vnd.sealedmedia.softseal.jpg": {
      source: "iana"
    },
    "image/vnd.svf": {
      source: "iana"
    },
    "image/vnd.tencent.tap": {
      source: "iana",
      extensions: ["tap"]
    },
    "image/vnd.valve.source.texture": {
      source: "iana",
      extensions: ["vtf"]
    },
    "image/vnd.wap.wbmp": {
      source: "iana",
      extensions: ["wbmp"]
    },
    "image/vnd.xiff": {
      source: "iana",
      extensions: ["xif"]
    },
    "image/vnd.zbrush.pcx": {
      source: "iana",
      extensions: ["pcx"]
    },
    "image/webp": {
      source: "apache",
      extensions: ["webp"]
    },
    "image/wmf": {
      source: "iana",
      extensions: ["wmf"]
    },
    "image/x-3ds": {
      source: "apache",
      extensions: ["3ds"]
    },
    "image/x-cmu-raster": {
      source: "apache",
      extensions: ["ras"]
    },
    "image/x-cmx": {
      source: "apache",
      extensions: ["cmx"]
    },
    "image/x-freehand": {
      source: "apache",
      extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
    },
    "image/x-icon": {
      source: "apache",
      compressible: true,
      extensions: ["ico"]
    },
    "image/x-jng": {
      source: "nginx",
      extensions: ["jng"]
    },
    "image/x-mrsid-image": {
      source: "apache",
      extensions: ["sid"]
    },
    "image/x-ms-bmp": {
      source: "nginx",
      compressible: true,
      extensions: ["bmp"]
    },
    "image/x-pcx": {
      source: "apache",
      extensions: ["pcx"]
    },
    "image/x-pict": {
      source: "apache",
      extensions: ["pic", "pct"]
    },
    "image/x-portable-anymap": {
      source: "apache",
      extensions: ["pnm"]
    },
    "image/x-portable-bitmap": {
      source: "apache",
      extensions: ["pbm"]
    },
    "image/x-portable-graymap": {
      source: "apache",
      extensions: ["pgm"]
    },
    "image/x-portable-pixmap": {
      source: "apache",
      extensions: ["ppm"]
    },
    "image/x-rgb": {
      source: "apache",
      extensions: ["rgb"]
    },
    "image/x-tga": {
      source: "apache",
      extensions: ["tga"]
    },
    "image/x-xbitmap": {
      source: "apache",
      extensions: ["xbm"]
    },
    "image/x-xcf": {
      compressible: false
    },
    "image/x-xpixmap": {
      source: "apache",
      extensions: ["xpm"]
    },
    "image/x-xwindowdump": {
      source: "apache",
      extensions: ["xwd"]
    },
    "message/cpim": {
      source: "iana"
    },
    "message/delivery-status": {
      source: "iana"
    },
    "message/disposition-notification": {
      source: "iana",
      extensions: [
        "disposition-notification"
      ]
    },
    "message/external-body": {
      source: "iana"
    },
    "message/feedback-report": {
      source: "iana"
    },
    "message/global": {
      source: "iana",
      extensions: ["u8msg"]
    },
    "message/global-delivery-status": {
      source: "iana",
      extensions: ["u8dsn"]
    },
    "message/global-disposition-notification": {
      source: "iana",
      extensions: ["u8mdn"]
    },
    "message/global-headers": {
      source: "iana",
      extensions: ["u8hdr"]
    },
    "message/http": {
      source: "iana",
      compressible: false
    },
    "message/imdn+xml": {
      source: "iana",
      compressible: true
    },
    "message/news": {
      source: "iana"
    },
    "message/partial": {
      source: "iana",
      compressible: false
    },
    "message/rfc822": {
      source: "iana",
      compressible: true,
      extensions: ["eml", "mime"]
    },
    "message/s-http": {
      source: "iana"
    },
    "message/sip": {
      source: "iana"
    },
    "message/sipfrag": {
      source: "iana"
    },
    "message/tracking-status": {
      source: "iana"
    },
    "message/vnd.si.simp": {
      source: "iana"
    },
    "message/vnd.wfa.wsc": {
      source: "iana",
      extensions: ["wsc"]
    },
    "model/3mf": {
      source: "iana",
      extensions: ["3mf"]
    },
    "model/e57": {
      source: "iana"
    },
    "model/gltf+json": {
      source: "iana",
      compressible: true,
      extensions: ["gltf"]
    },
    "model/gltf-binary": {
      source: "iana",
      compressible: true,
      extensions: ["glb"]
    },
    "model/iges": {
      source: "iana",
      compressible: false,
      extensions: ["igs", "iges"]
    },
    "model/mesh": {
      source: "iana",
      compressible: false,
      extensions: ["msh", "mesh", "silo"]
    },
    "model/mtl": {
      source: "iana",
      extensions: ["mtl"]
    },
    "model/obj": {
      source: "iana",
      extensions: ["obj"]
    },
    "model/step": {
      source: "iana"
    },
    "model/step+xml": {
      source: "iana",
      compressible: true,
      extensions: ["stpx"]
    },
    "model/step+zip": {
      source: "iana",
      compressible: false,
      extensions: ["stpz"]
    },
    "model/step-xml+zip": {
      source: "iana",
      compressible: false,
      extensions: ["stpxz"]
    },
    "model/stl": {
      source: "iana",
      extensions: ["stl"]
    },
    "model/vnd.collada+xml": {
      source: "iana",
      compressible: true,
      extensions: ["dae"]
    },
    "model/vnd.dwf": {
      source: "iana",
      extensions: ["dwf"]
    },
    "model/vnd.flatland.3dml": {
      source: "iana"
    },
    "model/vnd.gdl": {
      source: "iana",
      extensions: ["gdl"]
    },
    "model/vnd.gs-gdl": {
      source: "apache"
    },
    "model/vnd.gs.gdl": {
      source: "iana"
    },
    "model/vnd.gtw": {
      source: "iana",
      extensions: ["gtw"]
    },
    "model/vnd.moml+xml": {
      source: "iana",
      compressible: true
    },
    "model/vnd.mts": {
      source: "iana",
      extensions: ["mts"]
    },
    "model/vnd.opengex": {
      source: "iana",
      extensions: ["ogex"]
    },
    "model/vnd.parasolid.transmit.binary": {
      source: "iana",
      extensions: ["x_b"]
    },
    "model/vnd.parasolid.transmit.text": {
      source: "iana",
      extensions: ["x_t"]
    },
    "model/vnd.pytha.pyox": {
      source: "iana"
    },
    "model/vnd.rosette.annotated-data-model": {
      source: "iana"
    },
    "model/vnd.sap.vds": {
      source: "iana",
      extensions: ["vds"]
    },
    "model/vnd.usdz+zip": {
      source: "iana",
      compressible: false,
      extensions: ["usdz"]
    },
    "model/vnd.valve.source.compiled-map": {
      source: "iana",
      extensions: ["bsp"]
    },
    "model/vnd.vtu": {
      source: "iana",
      extensions: ["vtu"]
    },
    "model/vrml": {
      source: "iana",
      compressible: false,
      extensions: ["wrl", "vrml"]
    },
    "model/x3d+binary": {
      source: "apache",
      compressible: false,
      extensions: ["x3db", "x3dbz"]
    },
    "model/x3d+fastinfoset": {
      source: "iana",
      extensions: ["x3db"]
    },
    "model/x3d+vrml": {
      source: "apache",
      compressible: false,
      extensions: ["x3dv", "x3dvz"]
    },
    "model/x3d+xml": {
      source: "iana",
      compressible: true,
      extensions: ["x3d", "x3dz"]
    },
    "model/x3d-vrml": {
      source: "iana",
      extensions: ["x3dv"]
    },
    "multipart/alternative": {
      source: "iana",
      compressible: false
    },
    "multipart/appledouble": {
      source: "iana"
    },
    "multipart/byteranges": {
      source: "iana"
    },
    "multipart/digest": {
      source: "iana"
    },
    "multipart/encrypted": {
      source: "iana",
      compressible: false
    },
    "multipart/form-data": {
      source: "iana",
      compressible: false
    },
    "multipart/header-set": {
      source: "iana"
    },
    "multipart/mixed": {
      source: "iana"
    },
    "multipart/multilingual": {
      source: "iana"
    },
    "multipart/parallel": {
      source: "iana"
    },
    "multipart/related": {
      source: "iana",
      compressible: false
    },
    "multipart/report": {
      source: "iana"
    },
    "multipart/signed": {
      source: "iana",
      compressible: false
    },
    "multipart/vnd.bint.med-plus": {
      source: "iana"
    },
    "multipart/voice-message": {
      source: "iana"
    },
    "multipart/x-mixed-replace": {
      source: "iana"
    },
    "text/1d-interleaved-parityfec": {
      source: "iana"
    },
    "text/cache-manifest": {
      source: "iana",
      compressible: true,
      extensions: ["appcache", "manifest"]
    },
    "text/calendar": {
      source: "iana",
      extensions: ["ics", "ifb"]
    },
    "text/calender": {
      compressible: true
    },
    "text/cmd": {
      compressible: true
    },
    "text/coffeescript": {
      extensions: ["coffee", "litcoffee"]
    },
    "text/cql": {
      source: "iana"
    },
    "text/cql-expression": {
      source: "iana"
    },
    "text/cql-identifier": {
      source: "iana"
    },
    "text/css": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["css"]
    },
    "text/csv": {
      source: "iana",
      compressible: true,
      extensions: ["csv"]
    },
    "text/csv-schema": {
      source: "iana"
    },
    "text/directory": {
      source: "iana"
    },
    "text/dns": {
      source: "iana"
    },
    "text/ecmascript": {
      source: "iana"
    },
    "text/encaprtp": {
      source: "iana"
    },
    "text/enriched": {
      source: "iana"
    },
    "text/fhirpath": {
      source: "iana"
    },
    "text/flexfec": {
      source: "iana"
    },
    "text/fwdred": {
      source: "iana"
    },
    "text/gff3": {
      source: "iana"
    },
    "text/grammar-ref-list": {
      source: "iana"
    },
    "text/html": {
      source: "iana",
      compressible: true,
      extensions: ["html", "htm", "shtml"]
    },
    "text/jade": {
      extensions: ["jade"]
    },
    "text/javascript": {
      source: "iana",
      compressible: true
    },
    "text/jcr-cnd": {
      source: "iana"
    },
    "text/jsx": {
      compressible: true,
      extensions: ["jsx"]
    },
    "text/less": {
      compressible: true,
      extensions: ["less"]
    },
    "text/markdown": {
      source: "iana",
      compressible: true,
      extensions: ["markdown", "md"]
    },
    "text/mathml": {
      source: "nginx",
      extensions: ["mml"]
    },
    "text/mdx": {
      compressible: true,
      extensions: ["mdx"]
    },
    "text/mizar": {
      source: "iana"
    },
    "text/n3": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["n3"]
    },
    "text/parameters": {
      source: "iana",
      charset: "UTF-8"
    },
    "text/parityfec": {
      source: "iana"
    },
    "text/plain": {
      source: "iana",
      compressible: true,
      extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
    },
    "text/provenance-notation": {
      source: "iana",
      charset: "UTF-8"
    },
    "text/prs.fallenstein.rst": {
      source: "iana"
    },
    "text/prs.lines.tag": {
      source: "iana",
      extensions: ["dsc"]
    },
    "text/prs.prop.logic": {
      source: "iana"
    },
    "text/raptorfec": {
      source: "iana"
    },
    "text/red": {
      source: "iana"
    },
    "text/rfc822-headers": {
      source: "iana"
    },
    "text/richtext": {
      source: "iana",
      compressible: true,
      extensions: ["rtx"]
    },
    "text/rtf": {
      source: "iana",
      compressible: true,
      extensions: ["rtf"]
    },
    "text/rtp-enc-aescm128": {
      source: "iana"
    },
    "text/rtploopback": {
      source: "iana"
    },
    "text/rtx": {
      source: "iana"
    },
    "text/sgml": {
      source: "iana",
      extensions: ["sgml", "sgm"]
    },
    "text/shaclc": {
      source: "iana"
    },
    "text/shex": {
      source: "iana",
      extensions: ["shex"]
    },
    "text/slim": {
      extensions: ["slim", "slm"]
    },
    "text/spdx": {
      source: "iana",
      extensions: ["spdx"]
    },
    "text/strings": {
      source: "iana"
    },
    "text/stylus": {
      extensions: ["stylus", "styl"]
    },
    "text/t140": {
      source: "iana"
    },
    "text/tab-separated-values": {
      source: "iana",
      compressible: true,
      extensions: ["tsv"]
    },
    "text/troff": {
      source: "iana",
      extensions: ["t", "tr", "roff", "man", "me", "ms"]
    },
    "text/turtle": {
      source: "iana",
      charset: "UTF-8",
      extensions: ["ttl"]
    },
    "text/ulpfec": {
      source: "iana"
    },
    "text/uri-list": {
      source: "iana",
      compressible: true,
      extensions: ["uri", "uris", "urls"]
    },
    "text/vcard": {
      source: "iana",
      compressible: true,
      extensions: ["vcard"]
    },
    "text/vnd.a": {
      source: "iana"
    },
    "text/vnd.abc": {
      source: "iana"
    },
    "text/vnd.ascii-art": {
      source: "iana"
    },
    "text/vnd.curl": {
      source: "iana",
      extensions: ["curl"]
    },
    "text/vnd.curl.dcurl": {
      source: "apache",
      extensions: ["dcurl"]
    },
    "text/vnd.curl.mcurl": {
      source: "apache",
      extensions: ["mcurl"]
    },
    "text/vnd.curl.scurl": {
      source: "apache",
      extensions: ["scurl"]
    },
    "text/vnd.debian.copyright": {
      source: "iana",
      charset: "UTF-8"
    },
    "text/vnd.dmclientscript": {
      source: "iana"
    },
    "text/vnd.dvb.subtitle": {
      source: "iana",
      extensions: ["sub"]
    },
    "text/vnd.esmertec.theme-descriptor": {
      source: "iana",
      charset: "UTF-8"
    },
    "text/vnd.familysearch.gedcom": {
      source: "iana",
      extensions: ["ged"]
    },
    "text/vnd.ficlab.flt": {
      source: "iana"
    },
    "text/vnd.fly": {
      source: "iana",
      extensions: ["fly"]
    },
    "text/vnd.fmi.flexstor": {
      source: "iana",
      extensions: ["flx"]
    },
    "text/vnd.gml": {
      source: "iana"
    },
    "text/vnd.graphviz": {
      source: "iana",
      extensions: ["gv"]
    },
    "text/vnd.hans": {
      source: "iana"
    },
    "text/vnd.hgl": {
      source: "iana"
    },
    "text/vnd.in3d.3dml": {
      source: "iana",
      extensions: ["3dml"]
    },
    "text/vnd.in3d.spot": {
      source: "iana",
      extensions: ["spot"]
    },
    "text/vnd.iptc.newsml": {
      source: "iana"
    },
    "text/vnd.iptc.nitf": {
      source: "iana"
    },
    "text/vnd.latex-z": {
      source: "iana"
    },
    "text/vnd.motorola.reflex": {
      source: "iana"
    },
    "text/vnd.ms-mediapackage": {
      source: "iana"
    },
    "text/vnd.net2phone.commcenter.command": {
      source: "iana"
    },
    "text/vnd.radisys.msml-basic-layout": {
      source: "iana"
    },
    "text/vnd.senx.warpscript": {
      source: "iana"
    },
    "text/vnd.si.uricatalogue": {
      source: "iana"
    },
    "text/vnd.sosi": {
      source: "iana"
    },
    "text/vnd.sun.j2me.app-descriptor": {
      source: "iana",
      charset: "UTF-8",
      extensions: ["jad"]
    },
    "text/vnd.trolltech.linguist": {
      source: "iana",
      charset: "UTF-8"
    },
    "text/vnd.wap.si": {
      source: "iana"
    },
    "text/vnd.wap.sl": {
      source: "iana"
    },
    "text/vnd.wap.wml": {
      source: "iana",
      extensions: ["wml"]
    },
    "text/vnd.wap.wmlscript": {
      source: "iana",
      extensions: ["wmls"]
    },
    "text/vtt": {
      source: "iana",
      charset: "UTF-8",
      compressible: true,
      extensions: ["vtt"]
    },
    "text/x-asm": {
      source: "apache",
      extensions: ["s", "asm"]
    },
    "text/x-c": {
      source: "apache",
      extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
    },
    "text/x-component": {
      source: "nginx",
      extensions: ["htc"]
    },
    "text/x-fortran": {
      source: "apache",
      extensions: ["f", "for", "f77", "f90"]
    },
    "text/x-gwt-rpc": {
      compressible: true
    },
    "text/x-handlebars-template": {
      extensions: ["hbs"]
    },
    "text/x-java-source": {
      source: "apache",
      extensions: ["java"]
    },
    "text/x-jquery-tmpl": {
      compressible: true
    },
    "text/x-lua": {
      extensions: ["lua"]
    },
    "text/x-markdown": {
      compressible: true,
      extensions: ["mkd"]
    },
    "text/x-nfo": {
      source: "apache",
      extensions: ["nfo"]
    },
    "text/x-opml": {
      source: "apache",
      extensions: ["opml"]
    },
    "text/x-org": {
      compressible: true,
      extensions: ["org"]
    },
    "text/x-pascal": {
      source: "apache",
      extensions: ["p", "pas"]
    },
    "text/x-processing": {
      compressible: true,
      extensions: ["pde"]
    },
    "text/x-sass": {
      extensions: ["sass"]
    },
    "text/x-scss": {
      extensions: ["scss"]
    },
    "text/x-setext": {
      source: "apache",
      extensions: ["etx"]
    },
    "text/x-sfv": {
      source: "apache",
      extensions: ["sfv"]
    },
    "text/x-suse-ymp": {
      compressible: true,
      extensions: ["ymp"]
    },
    "text/x-uuencode": {
      source: "apache",
      extensions: ["uu"]
    },
    "text/x-vcalendar": {
      source: "apache",
      extensions: ["vcs"]
    },
    "text/x-vcard": {
      source: "apache",
      extensions: ["vcf"]
    },
    "text/xml": {
      source: "iana",
      compressible: true,
      extensions: ["xml"]
    },
    "text/xml-external-parsed-entity": {
      source: "iana"
    },
    "text/yaml": {
      compressible: true,
      extensions: ["yaml", "yml"]
    },
    "video/1d-interleaved-parityfec": {
      source: "iana"
    },
    "video/3gpp": {
      source: "iana",
      extensions: ["3gp", "3gpp"]
    },
    "video/3gpp-tt": {
      source: "iana"
    },
    "video/3gpp2": {
      source: "iana",
      extensions: ["3g2"]
    },
    "video/av1": {
      source: "iana"
    },
    "video/bmpeg": {
      source: "iana"
    },
    "video/bt656": {
      source: "iana"
    },
    "video/celb": {
      source: "iana"
    },
    "video/dv": {
      source: "iana"
    },
    "video/encaprtp": {
      source: "iana"
    },
    "video/ffv1": {
      source: "iana"
    },
    "video/flexfec": {
      source: "iana"
    },
    "video/h261": {
      source: "iana",
      extensions: ["h261"]
    },
    "video/h263": {
      source: "iana",
      extensions: ["h263"]
    },
    "video/h263-1998": {
      source: "iana"
    },
    "video/h263-2000": {
      source: "iana"
    },
    "video/h264": {
      source: "iana",
      extensions: ["h264"]
    },
    "video/h264-rcdo": {
      source: "iana"
    },
    "video/h264-svc": {
      source: "iana"
    },
    "video/h265": {
      source: "iana"
    },
    "video/iso.segment": {
      source: "iana",
      extensions: ["m4s"]
    },
    "video/jpeg": {
      source: "iana",
      extensions: ["jpgv"]
    },
    "video/jpeg2000": {
      source: "iana"
    },
    "video/jpm": {
      source: "apache",
      extensions: ["jpm", "jpgm"]
    },
    "video/jxsv": {
      source: "iana"
    },
    "video/mj2": {
      source: "iana",
      extensions: ["mj2", "mjp2"]
    },
    "video/mp1s": {
      source: "iana"
    },
    "video/mp2p": {
      source: "iana"
    },
    "video/mp2t": {
      source: "iana",
      extensions: ["ts"]
    },
    "video/mp4": {
      source: "iana",
      compressible: false,
      extensions: ["mp4", "mp4v", "mpg4"]
    },
    "video/mp4v-es": {
      source: "iana"
    },
    "video/mpeg": {
      source: "iana",
      compressible: false,
      extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
    },
    "video/mpeg4-generic": {
      source: "iana"
    },
    "video/mpv": {
      source: "iana"
    },
    "video/nv": {
      source: "iana"
    },
    "video/ogg": {
      source: "iana",
      compressible: false,
      extensions: ["ogv"]
    },
    "video/parityfec": {
      source: "iana"
    },
    "video/pointer": {
      source: "iana"
    },
    "video/quicktime": {
      source: "iana",
      compressible: false,
      extensions: ["qt", "mov"]
    },
    "video/raptorfec": {
      source: "iana"
    },
    "video/raw": {
      source: "iana"
    },
    "video/rtp-enc-aescm128": {
      source: "iana"
    },
    "video/rtploopback": {
      source: "iana"
    },
    "video/rtx": {
      source: "iana"
    },
    "video/scip": {
      source: "iana"
    },
    "video/smpte291": {
      source: "iana"
    },
    "video/smpte292m": {
      source: "iana"
    },
    "video/ulpfec": {
      source: "iana"
    },
    "video/vc1": {
      source: "iana"
    },
    "video/vc2": {
      source: "iana"
    },
    "video/vnd.cctv": {
      source: "iana"
    },
    "video/vnd.dece.hd": {
      source: "iana",
      extensions: ["uvh", "uvvh"]
    },
    "video/vnd.dece.mobile": {
      source: "iana",
      extensions: ["uvm", "uvvm"]
    },
    "video/vnd.dece.mp4": {
      source: "iana"
    },
    "video/vnd.dece.pd": {
      source: "iana",
      extensions: ["uvp", "uvvp"]
    },
    "video/vnd.dece.sd": {
      source: "iana",
      extensions: ["uvs", "uvvs"]
    },
    "video/vnd.dece.video": {
      source: "iana",
      extensions: ["uvv", "uvvv"]
    },
    "video/vnd.directv.mpeg": {
      source: "iana"
    },
    "video/vnd.directv.mpeg-tts": {
      source: "iana"
    },
    "video/vnd.dlna.mpeg-tts": {
      source: "iana"
    },
    "video/vnd.dvb.file": {
      source: "iana",
      extensions: ["dvb"]
    },
    "video/vnd.fvt": {
      source: "iana",
      extensions: ["fvt"]
    },
    "video/vnd.hns.video": {
      source: "iana"
    },
    "video/vnd.iptvforum.1dparityfec-1010": {
      source: "iana"
    },
    "video/vnd.iptvforum.1dparityfec-2005": {
      source: "iana"
    },
    "video/vnd.iptvforum.2dparityfec-1010": {
      source: "iana"
    },
    "video/vnd.iptvforum.2dparityfec-2005": {
      source: "iana"
    },
    "video/vnd.iptvforum.ttsavc": {
      source: "iana"
    },
    "video/vnd.iptvforum.ttsmpeg2": {
      source: "iana"
    },
    "video/vnd.motorola.video": {
      source: "iana"
    },
    "video/vnd.motorola.videop": {
      source: "iana"
    },
    "video/vnd.mpegurl": {
      source: "iana",
      extensions: ["mxu", "m4u"]
    },
    "video/vnd.ms-playready.media.pyv": {
      source: "iana",
      extensions: ["pyv"]
    },
    "video/vnd.nokia.interleaved-multimedia": {
      source: "iana"
    },
    "video/vnd.nokia.mp4vr": {
      source: "iana"
    },
    "video/vnd.nokia.videovoip": {
      source: "iana"
    },
    "video/vnd.objectvideo": {
      source: "iana"
    },
    "video/vnd.radgamettools.bink": {
      source: "iana"
    },
    "video/vnd.radgamettools.smacker": {
      source: "iana"
    },
    "video/vnd.sealed.mpeg1": {
      source: "iana"
    },
    "video/vnd.sealed.mpeg4": {
      source: "iana"
    },
    "video/vnd.sealed.swf": {
      source: "iana"
    },
    "video/vnd.sealedmedia.softseal.mov": {
      source: "iana"
    },
    "video/vnd.uvvu.mp4": {
      source: "iana",
      extensions: ["uvu", "uvvu"]
    },
    "video/vnd.vivo": {
      source: "iana",
      extensions: ["viv"]
    },
    "video/vnd.youtube.yt": {
      source: "iana"
    },
    "video/vp8": {
      source: "iana"
    },
    "video/vp9": {
      source: "iana"
    },
    "video/webm": {
      source: "apache",
      compressible: false,
      extensions: ["webm"]
    },
    "video/x-f4v": {
      source: "apache",
      extensions: ["f4v"]
    },
    "video/x-fli": {
      source: "apache",
      extensions: ["fli"]
    },
    "video/x-flv": {
      source: "apache",
      compressible: false,
      extensions: ["flv"]
    },
    "video/x-m4v": {
      source: "apache",
      extensions: ["m4v"]
    },
    "video/x-matroska": {
      source: "apache",
      compressible: false,
      extensions: ["mkv", "mk3d", "mks"]
    },
    "video/x-mng": {
      source: "apache",
      extensions: ["mng"]
    },
    "video/x-ms-asf": {
      source: "apache",
      extensions: ["asf", "asx"]
    },
    "video/x-ms-vob": {
      source: "apache",
      extensions: ["vob"]
    },
    "video/x-ms-wm": {
      source: "apache",
      extensions: ["wm"]
    },
    "video/x-ms-wmv": {
      source: "apache",
      compressible: false,
      extensions: ["wmv"]
    },
    "video/x-ms-wmx": {
      source: "apache",
      extensions: ["wmx"]
    },
    "video/x-ms-wvx": {
      source: "apache",
      extensions: ["wvx"]
    },
    "video/x-msvideo": {
      source: "apache",
      extensions: ["avi"]
    },
    "video/x-sgi-movie": {
      source: "apache",
      extensions: ["movie"]
    },
    "video/x-smv": {
      source: "apache",
      extensions: ["smv"]
    },
    "x-conference/x-cooltalk": {
      source: "apache",
      extensions: ["ice"]
    },
    "x-shader/x-fragment": {
      compressible: true
    },
    "x-shader/x-vertex": {
      compressible: true
    }
  };
});

// ../node_modules/mime-db/index.js
var require_mime_db = __commonJS((exports, module) => {
  /*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   */
  module.exports = require_db();
});

// ../node_modules/mime-types/index.js
var require_mime_types = __commonJS((exports) => {
  var charset = function(type47) {
    if (!type47 || typeof type47 !== "string") {
      return false;
    }
    var match = EXTRACT_TYPE_REGEXP.exec(type47);
    var mime = match && db[match[1].toLowerCase()];
    if (mime && mime.charset) {
      return mime.charset;
    }
    if (match && TEXT_TYPE_REGEXP.test(match[1])) {
      return "UTF-8";
    }
    return false;
  };
  var contentType = function(str) {
    if (!str || typeof str !== "string") {
      return false;
    }
    var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
    if (!mime) {
      return false;
    }
    if (mime.indexOf("charset") === -1) {
      var charset2 = exports.charset(mime);
      if (charset2)
        mime += "; charset=" + charset2.toLowerCase();
    }
    return mime;
  };
  var extension = function(type47) {
    if (!type47 || typeof type47 !== "string") {
      return false;
    }
    var match = EXTRACT_TYPE_REGEXP.exec(type47);
    var exts = match && exports.extensions[match[1].toLowerCase()];
    if (!exts || !exts.length) {
      return false;
    }
    return exts[0];
  };
  var lookup = function(path) {
    if (!path || typeof path !== "string") {
      return false;
    }
    var extension2 = extname("x." + path).toLowerCase().substr(1);
    if (!extension2) {
      return false;
    }
    return exports.types[extension2] || false;
  };
  var populateMaps = function(extensions, types) {
    var preference = ["nginx", "apache", undefined, "iana"];
    Object.keys(db).forEach(function forEachMimeType(type47) {
      var mime = db[type47];
      var exts = mime.extensions;
      if (!exts || !exts.length) {
        return;
      }
      extensions[type47] = exts;
      for (var i = 0;i < exts.length; i++) {
        var extension2 = exts[i];
        if (types[extension2]) {
          var from = preference.indexOf(db[types[extension2]].source);
          var to = preference.indexOf(mime.source);
          if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
            continue;
          }
        }
        types[extension2] = type47;
      }
    });
  };
  /*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */
  var db = require_mime_db();
  var extname = import.meta.require("path").extname;
  var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
  var TEXT_TYPE_REGEXP = /^text\//i;
  exports.charset = charset;
  exports.charsets = { lookup: charset };
  exports.contentType = contentType;
  exports.extension = extension;
  exports.extensions = Object.create(null);
  exports.lookup = lookup;
  exports.types = Object.create(null);
  populateMaps(exports.extensions, exports.types);
});

// ../node_modules/accepts/index.js
var require_accepts = __commonJS((exports, module) => {
  var Accepts = function(req) {
    if (!(this instanceof Accepts)) {
      return new Accepts(req);
    }
    this.headers = req.headers;
    this.negotiator = new Negotiator(req);
  };
  var extToMime = function(type47) {
    return type47.indexOf("/") === -1 ? mime.lookup(type47) : type47;
  };
  var validMime = function(type47) {
    return typeof type47 === "string";
  };
  /*!
   * accepts
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */
  var Negotiator = require_negotiator();
  var mime = require_mime_types();
  module.exports = Accepts;
  Accepts.prototype.type = Accepts.prototype.types = function(types_) {
    var types = types_;
    if (types && !Array.isArray(types)) {
      types = new Array(arguments.length);
      for (var i = 0;i < types.length; i++) {
        types[i] = arguments[i];
      }
    }
    if (!types || types.length === 0) {
      return this.negotiator.mediaTypes();
    }
    if (!this.headers.accept) {
      return types[0];
    }
    var mimes = types.map(extToMime);
    var accepts = this.negotiator.mediaTypes(mimes.filter(validMime));
    var first = accepts[0];
    return first ? types[mimes.indexOf(first)] : false;
  };
  Accepts.prototype.encoding = Accepts.prototype.encodings = function(encodings_) {
    var encodings = encodings_;
    if (encodings && !Array.isArray(encodings)) {
      encodings = new Array(arguments.length);
      for (var i = 0;i < encodings.length; i++) {
        encodings[i] = arguments[i];
      }
    }
    if (!encodings || encodings.length === 0) {
      return this.negotiator.encodings();
    }
    return this.negotiator.encodings(encodings)[0] || false;
  };
  Accepts.prototype.charset = Accepts.prototype.charsets = function(charsets_) {
    var charsets = charsets_;
    if (charsets && !Array.isArray(charsets)) {
      charsets = new Array(arguments.length);
      for (var i = 0;i < charsets.length; i++) {
        charsets[i] = arguments[i];
      }
    }
    if (!charsets || charsets.length === 0) {
      return this.negotiator.charsets();
    }
    return this.negotiator.charsets(charsets)[0] || false;
  };
  Accepts.prototype.lang = Accepts.prototype.langs = Accepts.prototype.language = Accepts.prototype.languages = function(languages_) {
    var languages = languages_;
    if (languages && !Array.isArray(languages)) {
      languages = new Array(arguments.length);
      for (var i = 0;i < languages.length; i++) {
        languages[i] = arguments[i];
      }
    }
    if (!languages || languages.length === 0) {
      return this.negotiator.languages();
    }
    return this.negotiator.languages(languages)[0] || false;
  };
});

// ../node_modules/base64id/lib/base64id.js
var require_base64id = __commonJS((exports, module) => {
  /*!
   * base64id v0.1.0
   */
  var crypto2 = import.meta.require("crypto");
  var Base64Id = function() {
  };
  Base64Id.prototype.getRandomBytes = function(bytes) {
    var BUFFER_SIZE = 4096;
    var self2 = this;
    bytes = bytes || 12;
    if (bytes > BUFFER_SIZE) {
      return crypto2.randomBytes(bytes);
    }
    var bytesInBuffer = parseInt(BUFFER_SIZE / bytes);
    var threshold = parseInt(bytesInBuffer * 0.85);
    if (!threshold) {
      return crypto2.randomBytes(bytes);
    }
    if (this.bytesBufferIndex == null) {
      this.bytesBufferIndex = -1;
    }
    if (this.bytesBufferIndex == bytesInBuffer) {
      this.bytesBuffer = null;
      this.bytesBufferIndex = -1;
    }
    if (this.bytesBufferIndex == -1 || this.bytesBufferIndex > threshold) {
      if (!this.isGeneratingBytes) {
        this.isGeneratingBytes = true;
        crypto2.randomBytes(BUFFER_SIZE, function(err, bytes2) {
          self2.bytesBuffer = bytes2;
          self2.bytesBufferIndex = 0;
          self2.isGeneratingBytes = false;
        });
      }
      if (this.bytesBufferIndex == -1) {
        return crypto2.randomBytes(bytes);
      }
    }
    var result = this.bytesBuffer.slice(bytes * this.bytesBufferIndex, bytes * (this.bytesBufferIndex + 1));
    this.bytesBufferIndex++;
    return result;
  };
  Base64Id.prototype.generateId = function() {
    var rand = Buffer.alloc(15);
    if (!rand.writeInt32BE) {
      return Math.abs(Math.random() * Math.random() * Date.now() | 0).toString() + Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
    }
    this.sequenceNumber = this.sequenceNumber + 1 | 0;
    rand.writeInt32BE(this.sequenceNumber, 11);
    if (crypto2.randomBytes) {
      this.getRandomBytes(12).copy(rand);
    } else {
      [0, 4, 8].forEach(function(i) {
        rand.writeInt32BE(Math.random() * Math.pow(2, 32) | 0, i);
      });
    }
    return rand.toString("base64").replace(/\//g, "_").replace(/\+/g, "-");
  };
  exports = module.exports = new Base64Id;
});

// ../node_modules/engine.io-parser/build/cjs/commons.js
var require_commons = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ERROR_PACKET = exports.PACKET_TYPES_REVERSE = exports.PACKET_TYPES = undefined;
  var PACKET_TYPES = Object.create(null);
  exports.PACKET_TYPES = PACKET_TYPES;
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = Object.create(null);
  exports.PACKET_TYPES_REVERSE = PACKET_TYPES_REVERSE;
  Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = { type: "error", data: "parser error" };
  exports.ERROR_PACKET = ERROR_PACKET;
});

// ../node_modules/engine.io-parser/build/cjs/encodePacket.js
var require_encodePacket = __commonJS((exports) => {
  var encodePacketToBinary = function(packet, callback) {
    if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {
      return callback(toBuffer(packet.data, false));
    }
    (0, exports.encodePacket)(packet, true, (encoded) => {
      if (!TEXT_ENCODER) {
        TEXT_ENCODER = new TextEncoder;
      }
      callback(TEXT_ENCODER.encode(encoded));
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.encodePacketToBinary = exports.encodePacket = undefined;
  var commons_js_1 = require_commons();
  var encodePacket = ({ type: type47, data }, supportsBinary, callback) => {
    if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
      return callback(supportsBinary ? data : "b" + toBuffer(data, true).toString("base64"));
    }
    return callback(commons_js_1.PACKET_TYPES[type47] + (data || ""));
  };
  exports.encodePacket = encodePacket;
  var toBuffer = (data, forceBufferConversion) => {
    if (Buffer.isBuffer(data) || data instanceof Uint8Array && !forceBufferConversion) {
      return data;
    } else if (data instanceof ArrayBuffer) {
      return Buffer.from(data);
    } else {
      return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
    }
  };
  var TEXT_ENCODER;
  exports.encodePacketToBinary = encodePacketToBinary;
});

// ../node_modules/engine.io-parser/build/cjs/decodePacket.js
var require_decodePacket = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.decodePacket = undefined;
  var commons_js_1 = require_commons();
  var decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    const type47 = encodedPacket.charAt(0);
    if (type47 === "b") {
      const buffer = Buffer.from(encodedPacket.substring(1), "base64");
      return {
        type: "message",
        data: mapBinary(buffer, binaryType)
      };
    }
    if (!commons_js_1.PACKET_TYPES_REVERSE[type47]) {
      return commons_js_1.ERROR_PACKET;
    }
    return encodedPacket.length > 1 ? {
      type: commons_js_1.PACKET_TYPES_REVERSE[type47],
      data: encodedPacket.substring(1)
    } : {
      type: commons_js_1.PACKET_TYPES_REVERSE[type47]
    };
  };
  exports.decodePacket = decodePacket;
  var mapBinary = (data, binaryType) => {
    switch (binaryType) {
      case "arraybuffer":
        if (data instanceof ArrayBuffer) {
          return data;
        } else if (Buffer.isBuffer(data)) {
          return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        } else {
          return data.buffer;
        }
      case "nodebuffer":
      default:
        if (Buffer.isBuffer(data)) {
          return data;
        } else {
          return Buffer.from(data);
        }
    }
  };
});

// ../node_modules/engine.io-parser/build/cjs/index.js
var require_cjs = __commonJS((exports) => {
  var createPacketEncoderStream = function() {
    return new TransformStream({
      transform(packet, controller) {
        (0, encodePacket_js_1.encodePacketToBinary)(packet, (encodedPacket) => {
          const payloadLength = encodedPacket.length;
          let header;
          if (payloadLength < 126) {
            header = new Uint8Array(1);
            new DataView(header.buffer).setUint8(0, payloadLength);
          } else if (payloadLength < 65536) {
            header = new Uint8Array(3);
            const view = new DataView(header.buffer);
            view.setUint8(0, 126);
            view.setUint16(1, payloadLength);
          } else {
            header = new Uint8Array(9);
            const view = new DataView(header.buffer);
            view.setUint8(0, 127);
            view.setBigUint64(1, BigInt(payloadLength));
          }
          if (packet.data && typeof packet.data !== "string") {
            header[0] |= 128;
          }
          controller.enqueue(header);
          controller.enqueue(encodedPacket);
        });
      }
    });
  };
  var totalLength = function(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  };
  var concatChunks = function(chunks, size) {
    if (chunks[0].length === size) {
      return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i = 0;i < size; i++) {
      buffer[i] = chunks[0][j++];
      if (j === chunks[0].length) {
        chunks.shift();
        j = 0;
      }
    }
    if (chunks.length && j < chunks[0].length) {
      chunks[0] = chunks[0].slice(j);
    }
    return buffer;
  };
  var createPacketDecoderStream = function(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
      TEXT_DECODER = new TextDecoder;
    }
    const chunks = [];
    let state = 0;
    let expectedLength = -1;
    let isBinary = false;
    return new TransformStream({
      transform(chunk, controller) {
        chunks.push(chunk);
        while (true) {
          if (state === 0) {
            if (totalLength(chunks) < 1) {
              break;
            }
            const header = concatChunks(chunks, 1);
            isBinary = (header[0] & 128) === 128;
            expectedLength = header[0] & 127;
            if (expectedLength < 126) {
              state = 3;
            } else if (expectedLength === 126) {
              state = 1;
            } else {
              state = 2;
            }
          } else if (state === 1) {
            if (totalLength(chunks) < 2) {
              break;
            }
            const headerArray = concatChunks(chunks, 2);
            expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
            state = 3;
          } else if (state === 2) {
            if (totalLength(chunks) < 8) {
              break;
            }
            const headerArray = concatChunks(chunks, 8);
            const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
            const n = view.getUint32(0);
            if (n > Math.pow(2, 53 - 32) - 1) {
              controller.enqueue(commons_js_1.ERROR_PACKET);
              break;
            }
            expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
            state = 3;
          } else {
            if (totalLength(chunks) < expectedLength) {
              break;
            }
            const data = concatChunks(chunks, expectedLength);
            controller.enqueue((0, decodePacket_js_1.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
            state = 0;
          }
          if (expectedLength === 0 || expectedLength > maxPayload) {
            controller.enqueue(commons_js_1.ERROR_PACKET);
            break;
          }
        }
      }
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.decodePayload = exports.decodePacket = exports.encodePayload = exports.encodePacket = exports.protocol = exports.createPacketDecoderStream = exports.createPacketEncoderStream = undefined;
  var encodePacket_js_1 = require_encodePacket();
  Object.defineProperty(exports, "encodePacket", { enumerable: true, get: function() {
    return encodePacket_js_1.encodePacket;
  } });
  var decodePacket_js_1 = require_decodePacket();
  Object.defineProperty(exports, "decodePacket", { enumerable: true, get: function() {
    return decodePacket_js_1.decodePacket;
  } });
  var commons_js_1 = require_commons();
  var SEPARATOR = String.fromCharCode(30);
  var encodePayload = (packets, callback) => {
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
      (0, encodePacket_js_1.encodePacket)(packet, false, (encodedPacket) => {
        encodedPackets[i] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  exports.encodePayload = encodePayload;
  var decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0;i < encodedPackets.length; i++) {
      const decodedPacket = (0, decodePacket_js_1.decodePacket)(encodedPackets[i], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  exports.decodePayload = decodePayload;
  exports.createPacketEncoderStream = createPacketEncoderStream;
  var TEXT_DECODER;
  exports.createPacketDecoderStream = createPacketDecoderStream;
  exports.protocol = 4;
});

// ../node_modules/engine.io/build/parser-v3/utf8.js
var require_utf8 = __commonJS((exports, module) => {
  var ucs2decode = function(string7) {
    var output = [];
    var counter = 0;
    var length = string7.length;
    var value15;
    var extra;
    while (counter < length) {
      value15 = string7.charCodeAt(counter++);
      if (value15 >= 55296 && value15 <= 56319 && counter < length) {
        extra = string7.charCodeAt(counter++);
        if ((extra & 64512) == 56320) {
          output.push(((value15 & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          output.push(value15);
          counter--;
        }
      } else {
        output.push(value15);
      }
    }
    return output;
  };
  var ucs2encode = function(array5) {
    var length = array5.length;
    var index = -1;
    var value15;
    var output = "";
    while (++index < length) {
      value15 = array5[index];
      if (value15 > 65535) {
        value15 -= 65536;
        output += stringFromCharCode(value15 >>> 10 & 1023 | 55296);
        value15 = 56320 | value15 & 1023;
      }
      output += stringFromCharCode(value15);
    }
    return output;
  };
  var checkScalarValue = function(codePoint, strict4) {
    if (codePoint >= 55296 && codePoint <= 57343) {
      if (strict4) {
        throw Error("Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value");
      }
      return false;
    }
    return true;
  };
  var createByte = function(codePoint, shift) {
    return stringFromCharCode(codePoint >> shift & 63 | 128);
  };
  var encodeCodePoint = function(codePoint, strict4) {
    if ((codePoint & 4294967168) == 0) {
      return stringFromCharCode(codePoint);
    }
    var symbol5 = "";
    if ((codePoint & 4294965248) == 0) {
      symbol5 = stringFromCharCode(codePoint >> 6 & 31 | 192);
    } else if ((codePoint & 4294901760) == 0) {
      if (!checkScalarValue(codePoint, strict4)) {
        codePoint = 65533;
      }
      symbol5 = stringFromCharCode(codePoint >> 12 & 15 | 224);
      symbol5 += createByte(codePoint, 6);
    } else if ((codePoint & 4292870144) == 0) {
      symbol5 = stringFromCharCode(codePoint >> 18 & 7 | 240);
      symbol5 += createByte(codePoint, 12);
      symbol5 += createByte(codePoint, 6);
    }
    symbol5 += stringFromCharCode(codePoint & 63 | 128);
    return symbol5;
  };
  var utf8encode = function(string7, opts) {
    opts = opts || {};
    var strict4 = opts.strict !== false;
    var codePoints = ucs2decode(string7);
    var length = codePoints.length;
    var index = -1;
    var codePoint;
    var byteString = "";
    while (++index < length) {
      codePoint = codePoints[index];
      byteString += encodeCodePoint(codePoint, strict4);
    }
    return byteString;
  };
  var readContinuationByte = function() {
    if (byteIndex >= byteCount) {
      throw Error("Invalid byte index");
    }
    var continuationByte = byteArray[byteIndex] & 255;
    byteIndex++;
    if ((continuationByte & 192) == 128) {
      return continuationByte & 63;
    }
    throw Error("Invalid continuation byte");
  };
  var decodeSymbol = function(strict4) {
    var byte1;
    var byte2;
    var byte3;
    var byte4;
    var codePoint;
    if (byteIndex > byteCount) {
      throw Error("Invalid byte index");
    }
    if (byteIndex == byteCount) {
      return false;
    }
    byte1 = byteArray[byteIndex] & 255;
    byteIndex++;
    if ((byte1 & 128) == 0) {
      return byte1;
    }
    if ((byte1 & 224) == 192) {
      byte2 = readContinuationByte();
      codePoint = (byte1 & 31) << 6 | byte2;
      if (codePoint >= 128) {
        return codePoint;
      } else {
        throw Error("Invalid continuation byte");
      }
    }
    if ((byte1 & 240) == 224) {
      byte2 = readContinuationByte();
      byte3 = readContinuationByte();
      codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3;
      if (codePoint >= 2048) {
        return checkScalarValue(codePoint, strict4) ? codePoint : 65533;
      } else {
        throw Error("Invalid continuation byte");
      }
    }
    if ((byte1 & 248) == 240) {
      byte2 = readContinuationByte();
      byte3 = readContinuationByte();
      byte4 = readContinuationByte();
      codePoint = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (codePoint >= 65536 && codePoint <= 1114111) {
        return codePoint;
      }
    }
    throw Error("Invalid UTF-8 detected");
  };
  var utf8decode = function(byteString, opts) {
    opts = opts || {};
    var strict4 = opts.strict !== false;
    byteArray = ucs2decode(byteString);
    byteCount = byteArray.length;
    byteIndex = 0;
    var codePoints = [];
    var tmp;
    while ((tmp = decodeSymbol(strict4)) !== false) {
      codePoints.push(tmp);
    }
    return ucs2encode(codePoints);
  };
  /*! https://mths.be/utf8js v2.1.2 by @mathias */
  var stringFromCharCode = String.fromCharCode;
  var byteArray;
  var byteCount;
  var byteIndex;
  module.exports = {
    version: "2.1.2",
    encode: utf8encode,
    decode: utf8decode
  };
});

// ../node_modules/engine.io/build/parser-v3/index.js
var require_parser_v3 = __commonJS((exports) => {
  var encodePacket = function(packet, supportsBinary, utf8encode, callback) {
    if (typeof supportsBinary === "function") {
      callback = supportsBinary;
      supportsBinary = null;
    }
    if (typeof utf8encode === "function") {
      callback = utf8encode;
      utf8encode = null;
    }
    if (Buffer.isBuffer(packet.data)) {
      return encodeBuffer(packet, supportsBinary, callback);
    } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
      return encodeBuffer({ type: packet.type, data: arrayBufferToBuffer(packet.data) }, supportsBinary, callback);
    }
    var encoded = exports.packets[packet.type];
    if (packet.data !== undefined) {
      encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
    }
    return callback("" + encoded);
  };
  var encodeBuffer = function(packet, supportsBinary, callback) {
    if (!supportsBinary) {
      return encodeBase64Packet(packet, callback);
    }
    var data = packet.data;
    var typeBuffer = Buffer.allocUnsafe(1);
    typeBuffer[0] = exports.packets[packet.type];
    return callback(Buffer.concat([typeBuffer, data]));
  };
  var encodeBase64Packet = function(packet, callback) {
    var data = Buffer.isBuffer(packet.data) ? packet.data : arrayBufferToBuffer(packet.data);
    var message = "b" + exports.packets[packet.type];
    message += data.toString("base64");
    return callback(message);
  };
  var decodePacket = function(data, binaryType, utf8decode) {
    if (data === undefined) {
      return err;
    }
    var type47;
    if (typeof data === "string") {
      type47 = data.charAt(0);
      if (type47 === "b") {
        return decodeBase64Packet(data.slice(1), binaryType);
      }
      if (utf8decode) {
        data = tryDecode2(data);
        if (data === false) {
          return err;
        }
      }
      if (Number(type47) != type47 || !packetslist[type47]) {
        return err;
      }
      if (data.length > 1) {
        return { type: packetslist[type47], data: data.slice(1) };
      } else {
        return { type: packetslist[type47] };
      }
    }
    if (binaryType === "arraybuffer") {
      var intArray = new Uint8Array(data);
      type47 = intArray[0];
      return { type: packetslist[type47], data: intArray.buffer.slice(1) };
    }
    if (data instanceof ArrayBuffer) {
      data = arrayBufferToBuffer(data);
    }
    type47 = data[0];
    return { type: packetslist[type47], data: data.slice(1) };
  };
  var tryDecode2 = function(data) {
    try {
      data = utf8.decode(data, { strict: false });
    } catch (e2) {
      return false;
    }
    return data;
  };
  var decodeBase64Packet = function(msg, binaryType) {
    var type47 = packetslist[msg.charAt(0)];
    var data = Buffer.from(msg.slice(1), "base64");
    if (binaryType === "arraybuffer") {
      var abv = new Uint8Array(data.length);
      for (var i = 0;i < abv.length; i++) {
        abv[i] = data[i];
      }
      data = abv.buffer;
    }
    return { type: type47, data };
  };
  var encodePayload = function(packets, supportsBinary, callback) {
    if (typeof supportsBinary === "function") {
      callback = supportsBinary;
      supportsBinary = null;
    }
    if (supportsBinary && hasBinary(packets)) {
      return encodePayloadAsBinary(packets, callback);
    }
    if (!packets.length) {
      return callback("0:");
    }
    function encodeOne(packet, doneCallback) {
      encodePacket(packet, supportsBinary, false, function(message) {
        doneCallback(null, setLengthHeader(message));
      });
    }
    map3(packets, encodeOne, function(err2, results) {
      return callback(results.join(""));
    });
  };
  var setLengthHeader = function(message) {
    return message.length + ":" + message;
  };
  var map3 = function(ary, each, done) {
    const results = new Array(ary.length);
    let count = 0;
    for (let i = 0;i < ary.length; i++) {
      each(ary[i], (error23, msg) => {
        results[i] = msg;
        if (++count === ary.length) {
          done(null, results);
        }
      });
    }
  };
  var decodePayload = function(data, binaryType, callback) {
    if (typeof data !== "string") {
      return decodePayloadAsBinary(data, binaryType, callback);
    }
    if (typeof binaryType === "function") {
      callback = binaryType;
      binaryType = null;
    }
    if (data === "") {
      return callback(err, 0, 1);
    }
    var length = "", n, msg, packet;
    for (var i = 0, l = data.length;i < l; i++) {
      var chr = data.charAt(i);
      if (chr !== ":") {
        length += chr;
        continue;
      }
      if (length === "" || length != (n = Number(length))) {
        return callback(err, 0, 1);
      }
      msg = data.slice(i + 1, i + 1 + n);
      if (length != msg.length) {
        return callback(err, 0, 1);
      }
      if (msg.length) {
        packet = decodePacket(msg, binaryType, false);
        if (err.type === packet.type && err.data === packet.data) {
          return callback(err, 0, 1);
        }
        var more = callback(packet, i + n, l);
        if (more === false)
          return;
      }
      i += n;
      length = "";
    }
    if (length !== "") {
      return callback(err, 0, 1);
    }
  };
  var bufferToString = function(buffer) {
    var str = "";
    for (var i = 0, l = buffer.length;i < l; i++) {
      str += String.fromCharCode(buffer[i]);
    }
    return str;
  };
  var stringToBuffer = function(string7) {
    var buf = Buffer.allocUnsafe(string7.length);
    for (var i = 0, l = string7.length;i < l; i++) {
      buf.writeUInt8(string7.charCodeAt(i), i);
    }
    return buf;
  };
  var arrayBufferToBuffer = function(data) {
    var length = data.byteLength || data.length;
    var offset = data.byteOffset || 0;
    return Buffer.from(data.buffer || data, offset, length);
  };
  var encodePayloadAsBinary = function(packets, callback) {
    if (!packets.length) {
      return callback(EMPTY_BUFFER);
    }
    map3(packets, encodeOneBinaryPacket, function(err2, results) {
      return callback(Buffer.concat(results));
    });
  };
  var encodeOneBinaryPacket = function(p, doneCallback) {
    function onBinaryPacketEncode(packet) {
      var encodingLength = "" + packet.length;
      var sizeBuffer;
      if (typeof packet === "string") {
        sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
        sizeBuffer[0] = 0;
        for (var i = 0;i < encodingLength.length; i++) {
          sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
        }
        sizeBuffer[sizeBuffer.length - 1] = 255;
        return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
      }
      sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
      sizeBuffer[0] = 1;
      for (var i = 0;i < encodingLength.length; i++) {
        sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
      }
      sizeBuffer[sizeBuffer.length - 1] = 255;
      doneCallback(null, Buffer.concat([sizeBuffer, packet]));
    }
    encodePacket(p, true, true, onBinaryPacketEncode);
  };
  var decodePayloadAsBinary = function(data, binaryType, callback) {
    if (typeof binaryType === "function") {
      callback = binaryType;
      binaryType = null;
    }
    var bufferTail = data;
    var buffers = [];
    var i;
    while (bufferTail.length > 0) {
      var strLen = "";
      var isString = bufferTail[0] === 0;
      for (i = 1;; i++) {
        if (bufferTail[i] === 255)
          break;
        if (strLen.length > 310) {
          return callback(err, 0, 1);
        }
        strLen += "" + bufferTail[i];
      }
      bufferTail = bufferTail.slice(strLen.length + 1);
      var msgLength = parseInt(strLen, 10);
      var msg = bufferTail.slice(1, msgLength + 1);
      if (isString)
        msg = bufferToString(msg);
      buffers.push(msg);
      bufferTail = bufferTail.slice(msgLength + 1);
    }
    var total = buffers.length;
    for (i = 0;i < total; i++) {
      var buffer = buffers[i];
      callback(decodePacket(buffer, binaryType, true), i, total);
    }
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.decodePayloadAsBinary = exports.encodePayloadAsBinary = exports.decodePayload = exports.encodePayload = exports.decodeBase64Packet = exports.decodePacket = exports.encodeBase64Packet = exports.encodePacket = exports.packets = exports.protocol = undefined;
  var utf8 = require_utf8();
  exports.protocol = 3;
  var hasBinary = (packets) => {
    for (const packet of packets) {
      if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {
        return true;
      }
    }
    return false;
  };
  exports.packets = {
    open: 0,
    close: 1,
    ping: 2,
    pong: 3,
    message: 4,
    upgrade: 5,
    noop: 6
  };
  var packetslist = Object.keys(exports.packets);
  var err = { type: "error", data: "parser error" };
  var EMPTY_BUFFER = Buffer.concat([]);
  exports.encodePacket = encodePacket;
  exports.encodeBase64Packet = encodeBase64Packet;
  exports.decodePacket = decodePacket;
  exports.decodeBase64Packet = decodeBase64Packet;
  exports.encodePayload = encodePayload;
  exports.decodePayload = decodePayload;
  exports.encodePayloadAsBinary = encodePayloadAsBinary;
  exports.decodePayloadAsBinary = decodePayloadAsBinary;
});

// ../node_modules/ms/index.js
var require_ms = __commonJS((exports, module) => {
  var parse5 = function(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type47 = (match[2] || "ms").toLowerCase();
    switch (type47) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return;
    }
  };
  var fmtShort = function(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  };
  var fmtLong = function(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  };
  var plural = function(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  };
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type47 = typeof val;
    if (type47 === "string" && val.length > 0) {
      return parse5(val);
    } else if (type47 === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
});

// ../node_modules/debug/src/common.js
var require_common = __commonJS((exports, module) => {
  var setup = function(env2) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    createDebug.destroy = destroy;
    Object.keys(env2).forEach((key) => {
      createDebug[key] = env2[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash7 = 0;
      for (let i = 0;i < namespace.length; i++) {
        hash7 = (hash7 << 5) - hash7 + namespace.charCodeAt(i);
        hash7 |= 0;
      }
      return createDebug.colors[Math.abs(hash7) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self2 = debug;
        const curr = Number(new Date);
        const ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self2, args);
        const logFn = self2.log || createDebug.log;
        logFn.apply(self2, args);
      }
      debug.namespace = namespace;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace);
      debug.extend = extend;
      debug.destroy = createDebug.destroy;
      Object.defineProperty(debug, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      return debug;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0;i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      const namespaces = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length;i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length;i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp4) {
      return regexp4.toString().substring(2, regexp4.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  };
  module.exports = setup;
});

// ../node_modules/debug/src/browser.js
var require_browser = __commonJS((exports, module) => {
  var useColors = function() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  };
  var formatArgs = function(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  };
  var save = function(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error23) {
    }
  };
  var load = function() {
    let r2;
    try {
      r2 = exports.storage.getItem("debug");
    } catch (error23) {
    }
    if (!r2 && typeof process !== "undefined" && "env" in process) {
      r2 = process.env.DEBUG;
    }
    return r2;
  };
  var localstorage = function() {
    try {
      return localStorage;
    } catch (error23) {
    }
  };
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  exports.log = console.debug || console.log || (() => {
  });
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error23) {
      return "[UnexpectedJSONParseError]: " + error23.message;
    }
  };
});

// ../node_modules/has-flag/index.js
var require_has_flag = __commonJS((exports, module) => {
  module.exports = (flag, argv = process.argv) => {
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
  };
});

// ../node_modules/supports-color/index.js
var require_supports_color = __commonJS((exports, module) => {
  var translateLevel = function(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  };
  var supportsColor = function(haveStream, streamIsTTY) {
    if (forceColor === 0) {
      return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === undefined) {
      return 0;
    }
    const min = forceColor || 0;
    if (env2.TERM === "dumb") {
      return min;
    }
    if (process.platform === "win32") {
      const osRelease = os.release().split(".");
      if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env2) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => (sign in env2)) || env2.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env2) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env2.COLORTERM === "truecolor") {
      return 3;
    }
    if ("TERM_PROGRAM" in env2) {
      const version = parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env2.TERM_PROGRAM) {
        case "iTerm.app":
          return version >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env2.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env2) {
      return 1;
    }
    return min;
  };
  var getSupportLevel = function(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
  };
  var os = import.meta.require("os");
  var tty = import.meta.require("tty");
  var hasFlag = require_has_flag();
  var { env: env2 } = process;
  var forceColor;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
    forceColor = 0;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = 1;
  }
  if ("FORCE_COLOR" in env2) {
    if (env2.FORCE_COLOR === "true") {
      forceColor = 1;
    } else if (env2.FORCE_COLOR === "false") {
      forceColor = 0;
    } else {
      forceColor = env2.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env2.FORCE_COLOR, 10), 3);
    }
  }
  module.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
  };
});

// ../node_modules/debug/src/node.js
var require_node = __commonJS((exports, module) => {
  var useColors = function() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  };
  var formatArgs = function(args) {
    const { namespace: name, useColors: useColors2 } = this;
    if (useColors2) {
      const c = this.color;
      const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
      const prefix = `  ${colorCode};1m${name} \x1B[0m`;
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push(colorCode + "m+" + exports.humanize(this.diff) + "\x1B[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  };
  var getDate = function() {
    if (exports.inspectOpts.hideDate) {
      return "";
    }
    return new Date().toISOString() + " ";
  };
  var log = function(...args) {
    return process.stderr.write(util.format(...args) + "\n");
  };
  var save = function(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      delete process.env.DEBUG;
    }
  };
  var load = function() {
    return process.env.DEBUG;
  };
  var init = function(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for (let i = 0;i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  };
  var tty = import.meta.require("tty");
  var util = import.meta.require("util");
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.destroy = util.deprecate(() => {
  }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  exports.colors = [6, 2, 3, 4, 5, 1];
  try {
    const supportsColor = require_supports_color();
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (error23) {
  }
  exports.inspectOpts = Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase();
    });
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === "null") {
      val = null;
    } else {
      val = Number(val);
    }
    obj[prop] = val;
    return obj;
  }, {});
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
});

// ../node_modules/debug/src/index.js
var require_src = __commonJS((exports, module) => {
  if (typeof process === "undefined" || process.type === "renderer" || false || process.__nwjs) {
    module.exports = require_browser();
  } else {
    module.exports = require_node();
  }
});

// ../node_modules/engine.io/build/transport.js
var require_transport = __commonJS((exports) => {
  var noop = function() {
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Transport = undefined;
  var events_1 = import.meta.require("events");
  var parser_v4 = require_cjs();
  var parser_v3 = require_parser_v3();
  var debug_1 = require_src();
  var debug = (0, debug_1.default)("engine:transport");

  class Transport extends events_1.EventEmitter {
    constructor(req) {
      super();
      this.writable = false;
      this._readyState = "open";
      this.discarded = false;
      this.protocol = req._query.EIO === "4" ? 4 : 3;
      this.parser = this.protocol === 4 ? parser_v4 : parser_v3;
      this.supportsBinary = !(req._query && req._query.b64);
    }
    get readyState() {
      return this._readyState;
    }
    set readyState(state) {
      debug("readyState updated from %s to %s (%s)", this._readyState, state, this.name);
      this._readyState = state;
    }
    discard() {
      this.discarded = true;
    }
    onRequest(req) {
      debug("setting request");
      this.req = req;
    }
    close(fn) {
      if (this.readyState === "closed" || this.readyState === "closing")
        return;
      this.readyState = "closing";
      this.doClose(fn || noop);
    }
    onError(msg, desc) {
      if (this.listeners("error").length) {
        const err = new Error(msg);
        err.type = "TransportError";
        err.description = desc;
        this.emit("error", err);
      } else {
        debug("ignored transport error %s (%s)", msg, desc);
      }
    }
    onPacket(packet) {
      this.emit("packet", packet);
    }
    onData(data) {
      this.onPacket(this.parser.decodePacket(data));
    }
    onClose() {
      this.readyState = "closed";
      this.emit("close");
    }
  }
  exports.Transport = Transport;
});

// ../node_modules/engine.io/build/transports/polling.js
var require_polling = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Polling = undefined;
  var transport_1 = require_transport();
  var zlib_1 = import.meta.require("zlib");
  var accepts = require_accepts();
  var debug_1 = require_src();
  var debug = (0, debug_1.default)("engine:polling");
  var compressionMethods = {
    gzip: zlib_1.createGzip,
    deflate: zlib_1.createDeflate
  };

  class Polling extends transport_1.Transport {
    constructor(req) {
      super(req);
      this.closeTimeout = 30 * 1000;
    }
    get name() {
      return "polling";
    }
    get supportsFraming() {
      return false;
    }
    onRequest(req) {
      const res = req.res;
      req.res = null;
      if (req.method === "GET") {
        this.onPollRequest(req, res);
      } else if (req.method === "POST") {
        this.onDataRequest(req, res);
      } else {
        res.writeHead(500);
        res.end();
      }
    }
    onPollRequest(req, res) {
      if (this.req) {
        debug("request overlap");
        this.onError("overlap from client");
        res.writeHead(400);
        res.end();
        return;
      }
      debug("setting request");
      this.req = req;
      this.res = res;
      const onClose = () => {
        this.onError("poll connection closed prematurely");
      };
      const cleanup = () => {
        req.removeListener("close", onClose);
        this.req = this.res = null;
      };
      req.cleanup = cleanup;
      req.on("close", onClose);
      this.writable = true;
      this.emit("drain");
      if (this.writable && this.shouldClose) {
        debug("triggering empty send to append close packet");
        this.send([{ type: "noop" }]);
      }
    }
    onDataRequest(req, res) {
      if (this.dataReq) {
        this.onError("data request overlap from client");
        res.writeHead(400);
        res.end();
        return;
      }
      const isBinary = req.headers["content-type"] === "application/octet-stream";
      if (isBinary && this.protocol === 4) {
        return this.onError("invalid content");
      }
      this.dataReq = req;
      this.dataRes = res;
      let chunks = isBinary ? Buffer.concat([]) : "";
      const cleanup = () => {
        req.removeListener("data", onData);
        req.removeListener("end", onEnd);
        req.removeListener("close", onClose);
        this.dataReq = this.dataRes = chunks = null;
      };
      const onClose = () => {
        cleanup();
        this.onError("data request connection closed prematurely");
      };
      const onData = (data) => {
        let contentLength;
        if (isBinary) {
          chunks = Buffer.concat([chunks, data]);
          contentLength = chunks.length;
        } else {
          chunks += data;
          contentLength = Buffer.byteLength(chunks);
        }
        if (contentLength > this.maxHttpBufferSize) {
          res.writeHead(413).end();
          cleanup();
        }
      };
      const onEnd = () => {
        this.onData(chunks);
        const headers = {
          "Content-Type": "text/html",
          "Content-Length": 2
        };
        res.writeHead(200, this.headers(req, headers));
        res.end("ok");
        cleanup();
      };
      req.on("close", onClose);
      if (!isBinary)
        req.setEncoding("utf8");
      req.on("data", onData);
      req.on("end", onEnd);
    }
    onData(data) {
      debug('received "%s"', data);
      const callback = (packet) => {
        if (packet.type === "close") {
          debug("got xhr close packet");
          this.onClose();
          return false;
        }
        this.onPacket(packet);
      };
      if (this.protocol === 3) {
        this.parser.decodePayload(data, callback);
      } else {
        this.parser.decodePayload(data).forEach(callback);
      }
    }
    onClose() {
      if (this.writable) {
        this.send([{ type: "noop" }]);
      }
      super.onClose();
    }
    send(packets) {
      this.writable = false;
      if (this.shouldClose) {
        debug("appending close packet to payload");
        packets.push({ type: "close" });
        this.shouldClose();
        this.shouldClose = null;
      }
      const doWrite = (data) => {
        const compress = packets.some((packet) => {
          return packet.options && packet.options.compress;
        });
        this.write(data, { compress });
      };
      if (this.protocol === 3) {
        this.parser.encodePayload(packets, this.supportsBinary, doWrite);
      } else {
        this.parser.encodePayload(packets, doWrite);
      }
    }
    write(data, options) {
      debug('writing "%s"', data);
      this.doWrite(data, options, () => {
        this.req.cleanup();
      });
    }
    doWrite(data, options, callback) {
      const isString = typeof data === "string";
      const contentType = isString ? "text/plain; charset=UTF-8" : "application/octet-stream";
      const headers = {
        "Content-Type": contentType
      };
      const respond = (data2) => {
        headers["Content-Length"] = typeof data2 === "string" ? Buffer.byteLength(data2) : data2.length;
        this.res.writeHead(200, this.headers(this.req, headers));
        this.res.end(data2);
        callback();
      };
      if (!this.httpCompression || !options.compress) {
        respond(data);
        return;
      }
      const len = isString ? Buffer.byteLength(data) : data.length;
      if (len < this.httpCompression.threshold) {
        respond(data);
        return;
      }
      const encoding = accepts(this.req).encodings(["gzip", "deflate"]);
      if (!encoding) {
        respond(data);
        return;
      }
      this.compress(data, encoding, (err, data2) => {
        if (err) {
          this.res.writeHead(500);
          this.res.end();
          callback(err);
          return;
        }
        headers["Content-Encoding"] = encoding;
        respond(data2);
      });
    }
    compress(data, encoding, callback) {
      debug("compressing");
      const buffers = [];
      let nread = 0;
      compressionMethods[encoding](this.httpCompression).on("error", callback).on("data", function(chunk) {
        buffers.push(chunk);
        nread += chunk.length;
      }).on("end", function() {
        callback(null, Buffer.concat(buffers, nread));
      }).end(data);
    }
    doClose(fn) {
      debug("closing");
      let closeTimeoutTimer;
      if (this.dataReq) {
        debug("aborting ongoing data request");
        this.dataReq.destroy();
      }
      const onClose = () => {
        clearTimeout(closeTimeoutTimer);
        fn();
        this.onClose();
      };
      if (this.writable) {
        debug("transport writable - closing right away");
        this.send([{ type: "close" }]);
        onClose();
      } else if (this.discarded) {
        debug("transport discarded - closing right away");
        onClose();
      } else {
        debug("transport not writable - buffering orderly close");
        this.shouldClose = onClose;
        closeTimeoutTimer = setTimeout(onClose, this.closeTimeout);
      }
    }
    headers(req, headers) {
      headers = headers || {};
      const ua = req.headers["user-agent"];
      if (ua && (~ua.indexOf(";MSIE") || ~ua.indexOf("Trident/"))) {
        headers["X-XSS-Protection"] = "0";
      }
      headers["cache-control"] = "no-store";
      this.emit("headers", headers, req);
      return headers;
    }
  }
  exports.Polling = Polling;
});

// ../node_modules/engine.io/build/transports/polling-jsonp.js
var require_polling_jsonp = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.JSONP = undefined;
  var polling_1 = require_polling();
  var qs = import.meta.require("querystring");
  var rDoubleSlashes = /\\\\n/g;
  var rSlashes = /(\\)?\\n/g;

  class JSONP extends polling_1.Polling {
    constructor(req) {
      super(req);
      this.head = "___eio[" + (req._query.j || "").replace(/[^0-9]/g, "") + "](";
      this.foot = ");";
    }
    onData(data) {
      data = qs.parse(data).d;
      if (typeof data === "string") {
        data = data.replace(rSlashes, function(match, slashes) {
          return slashes ? match : "\n";
        });
        super.onData(data.replace(rDoubleSlashes, "\\n"));
      }
    }
    doWrite(data, options, callback) {
      const js = JSON.stringify(data).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
      data = this.head + js + this.foot;
      super.doWrite(data, options, callback);
    }
  }
  exports.JSONP = JSONP;
});

// ../node_modules/engine.io/build/transports/websocket.js
var require_websocket = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WebSocket = undefined;
  var transport_1 = require_transport();
  var debug_1 = require_src();
  var debug = (0, debug_1.default)("engine:ws");

  class WebSocket extends transport_1.Transport {
    constructor(req) {
      super(req);
      this.socket = req.websocket;
      this.socket.on("message", (data, isBinary) => {
        const message = isBinary ? data : data.toString();
        debug('received "%s"', message);
        super.onData(message);
      });
      this.socket.once("close", this.onClose.bind(this));
      this.socket.on("error", this.onError.bind(this));
      this.writable = true;
      this.perMessageDeflate = null;
    }
    get name() {
      return "websocket";
    }
    get handlesUpgrades() {
      return true;
    }
    get supportsFraming() {
      return true;
    }
    send(packets) {
      this.writable = false;
      for (let i = 0;i < packets.length; i++) {
        const packet = packets[i];
        const isLast = i + 1 === packets.length;
        const opts = {};
        if (packet.options) {
          opts.compress = packet.options.compress;
        }
        const onSent = (err) => {
          if (err) {
            return this.onError("write error", err.stack);
          } else if (isLast) {
            this.writable = true;
            this.emit("drain");
          }
        };
        const send = (data) => {
          if (this.perMessageDeflate) {
            const len = typeof data === "string" ? Buffer.byteLength(data) : data.length;
            if (len < this.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
          debug('writing "%s"', data);
          this.socket.send(data, opts, onSent);
        };
        if (packet.options && typeof packet.options.wsPreEncoded === "string") {
          send(packet.options.wsPreEncoded);
        } else if (this._canSendPreEncodedFrame(packet)) {
          this.socket._sender.sendFrame(packet.options.wsPreEncodedFrame, onSent);
        } else {
          this.parser.encodePacket(packet, this.supportsBinary, send);
        }
      }
    }
    _canSendPreEncodedFrame(packet) {
      var _a, _b, _c;
      return !this.perMessageDeflate && typeof ((_b = (_a = this.socket) === null || _a === undefined ? undefined : _a._sender) === null || _b === undefined ? undefined : _b.sendFrame) === "function" && ((_c = packet.options) === null || _c === undefined ? undefined : _c.wsPreEncodedFrame) !== undefined;
    }
    doClose(fn) {
      debug("closing");
      this.socket.close();
      fn && fn();
    }
  }
  exports.WebSocket = WebSocket;
});

// ../node_modules/engine.io/build/transports/webtransport.js
var require_webtransport = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WebTransport = undefined;
  var transport_1 = require_transport();
  var debug_1 = require_src();
  var engine_io_parser_1 = require_cjs();
  var debug = (0, debug_1.default)("engine:webtransport");

  class WebTransport extends transport_1.Transport {
    constructor(session, stream, reader) {
      super({ _query: { EIO: "4" } });
      this.session = session;
      const transformStream = (0, engine_io_parser_1.createPacketEncoderStream)();
      transformStream.readable.pipeTo(stream.writable).catch(() => {
        debug("the stream was closed");
      });
      this.writer = transformStream.writable.getWriter();
      (async () => {
        try {
          while (true) {
            const { value: value15, done } = await reader.read();
            if (done) {
              debug("session is closed");
              break;
            }
            debug("received chunk: %o", value15);
            this.onPacket(value15);
          }
        } catch (e2) {
          debug("error while reading: %s", e2.message);
        }
      })();
      session.closed.then(() => this.onClose());
      this.writable = true;
    }
    get name() {
      return "webtransport";
    }
    get supportsFraming() {
      return true;
    }
    async send(packets) {
      this.writable = false;
      try {
        for (let i = 0;i < packets.length; i++) {
          const packet = packets[i];
          await this.writer.write(packet);
        }
      } catch (e2) {
        debug("error while writing: %s", e2.message);
      }
      this.writable = true;
      this.emit("drain");
    }
    doClose(fn) {
      debug("closing WebTransport session");
      this.session.close();
      fn && fn();
    }
  }
  exports.WebTransport = WebTransport;
});

// ../node_modules/engine.io/build/transports/index.js
var require_transports = __commonJS((exports) => {
  var polling = function(req) {
    if (typeof req._query.j === "string") {
      return new polling_jsonp_1.JSONP(req);
    } else {
      return new polling_1.Polling(req);
    }
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var polling_1 = require_polling();
  var polling_jsonp_1 = require_polling_jsonp();
  var websocket_1 = require_websocket();
  var webtransport_1 = require_webtransport();
  exports.default = {
    polling,
    websocket: websocket_1.WebSocket,
    webtransport: webtransport_1.WebTransport
  };
  polling.upgradesTo = ["websocket", "webtransport"];
});

// ../node_modules/engine.io/build/socket.js
var require_socket = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Socket = undefined;
  var events_1 = import.meta.require("events");
  var debug_1 = require_src();
  var timers_1 = import.meta.require("timers");
  var debug = (0, debug_1.default)("engine:socket");

  class Socket extends events_1.EventEmitter {
    constructor(id, server, transport, req, protocol) {
      super();
      this._readyState = "opening";
      this.upgrading = false;
      this.upgraded = false;
      this.writeBuffer = [];
      this.packetsFn = [];
      this.sentCallbackFn = [];
      this.cleanupFn = [];
      this.id = id;
      this.server = server;
      this.request = req;
      this.protocol = protocol;
      if (req) {
        if (req.websocket && req.websocket._socket) {
          this.remoteAddress = req.websocket._socket.remoteAddress;
        } else {
          this.remoteAddress = req.connection.remoteAddress;
        }
      } else {
      }
      this.pingTimeoutTimer = null;
      this.pingIntervalTimer = null;
      this.setTransport(transport);
      this.onOpen();
    }
    get readyState() {
      return this._readyState;
    }
    set readyState(state) {
      debug("readyState updated from %s to %s", this._readyState, state);
      this._readyState = state;
    }
    onOpen() {
      this.readyState = "open";
      this.transport.sid = this.id;
      this.sendPacket("open", JSON.stringify({
        sid: this.id,
        upgrades: this.getAvailableUpgrades(),
        pingInterval: this.server.opts.pingInterval,
        pingTimeout: this.server.opts.pingTimeout,
        maxPayload: this.server.opts.maxHttpBufferSize
      }));
      if (this.server.opts.initialPacket) {
        this.sendPacket("message", this.server.opts.initialPacket);
      }
      this.emit("open");
      if (this.protocol === 3) {
        this.resetPingTimeout(this.server.opts.pingInterval + this.server.opts.pingTimeout);
      } else {
        this.schedulePing();
      }
    }
    onPacket(packet) {
      if (this.readyState !== "open") {
        return debug("packet received with closed socket");
      }
      debug(`received packet ${packet.type}`);
      this.emit("packet", packet);
      this.resetPingTimeout(this.server.opts.pingInterval + this.server.opts.pingTimeout);
      switch (packet.type) {
        case "ping":
          if (this.transport.protocol !== 3) {
            this.onError("invalid heartbeat direction");
            return;
          }
          debug("got ping");
          this.sendPacket("pong");
          this.emit("heartbeat");
          break;
        case "pong":
          if (this.transport.protocol === 3) {
            this.onError("invalid heartbeat direction");
            return;
          }
          debug("got pong");
          this.pingIntervalTimer.refresh();
          this.emit("heartbeat");
          break;
        case "error":
          this.onClose("parse error");
          break;
        case "message":
          this.emit("data", packet.data);
          this.emit("message", packet.data);
          break;
      }
    }
    onError(err) {
      debug("transport error");
      this.onClose("transport error", err);
    }
    schedulePing() {
      this.pingIntervalTimer = (0, timers_1.setTimeout)(() => {
        debug("writing ping packet - expecting pong within %sms", this.server.opts.pingTimeout);
        this.sendPacket("ping");
        this.resetPingTimeout(this.server.opts.pingTimeout);
      }, this.server.opts.pingInterval);
    }
    resetPingTimeout(timeout) {
      (0, timers_1.clearTimeout)(this.pingTimeoutTimer);
      this.pingTimeoutTimer = (0, timers_1.setTimeout)(() => {
        if (this.readyState === "closed")
          return;
        this.onClose("ping timeout");
      }, timeout);
    }
    setTransport(transport) {
      const onError = this.onError.bind(this);
      const onPacket = this.onPacket.bind(this);
      const flush = this.flush.bind(this);
      const onClose = this.onClose.bind(this, "transport close");
      this.transport = transport;
      this.transport.once("error", onError);
      this.transport.on("packet", onPacket);
      this.transport.on("drain", flush);
      this.transport.once("close", onClose);
      this.setupSendCallback();
      this.cleanupFn.push(function() {
        transport.removeListener("error", onError);
        transport.removeListener("packet", onPacket);
        transport.removeListener("drain", flush);
        transport.removeListener("close", onClose);
      });
    }
    maybeUpgrade(transport) {
      debug('might upgrade socket transport from "%s" to "%s"', this.transport.name, transport.name);
      this.upgrading = true;
      const upgradeTimeoutTimer = (0, timers_1.setTimeout)(() => {
        debug("client did not complete upgrade - closing transport");
        cleanup();
        if (transport.readyState === "open") {
          transport.close();
        }
      }, this.server.opts.upgradeTimeout);
      let checkIntervalTimer;
      const onPacket = (packet) => {
        if (packet.type === "ping" && packet.data === "probe") {
          debug("got probe ping packet, sending pong");
          transport.send([{ type: "pong", data: "probe" }]);
          this.emit("upgrading", transport);
          clearInterval(checkIntervalTimer);
          checkIntervalTimer = setInterval(check11, 100);
        } else if (packet.type === "upgrade" && this.readyState !== "closed") {
          debug("got upgrade packet - upgrading");
          cleanup();
          this.transport.discard();
          this.upgraded = true;
          this.clearTransport();
          this.setTransport(transport);
          this.emit("upgrade", transport);
          this.flush();
          if (this.readyState === "closing") {
            transport.close(() => {
              this.onClose("forced close");
            });
          }
        } else {
          cleanup();
          transport.close();
        }
      };
      const check11 = () => {
        if (this.transport.name === "polling" && this.transport.writable) {
          debug("writing a noop packet to polling for fast upgrade");
          this.transport.send([{ type: "noop" }]);
        }
      };
      const cleanup = () => {
        this.upgrading = false;
        clearInterval(checkIntervalTimer);
        (0, timers_1.clearTimeout)(upgradeTimeoutTimer);
        transport.removeListener("packet", onPacket);
        transport.removeListener("close", onTransportClose);
        transport.removeListener("error", onError);
        this.removeListener("close", onClose);
      };
      const onError = (err) => {
        debug("client did not complete upgrade - %s", err);
        cleanup();
        transport.close();
        transport = null;
      };
      const onTransportClose = () => {
        onError("transport closed");
      };
      const onClose = () => {
        onError("socket closed");
      };
      transport.on("packet", onPacket);
      transport.once("close", onTransportClose);
      transport.once("error", onError);
      this.once("close", onClose);
    }
    clearTransport() {
      let cleanup;
      const toCleanUp = this.cleanupFn.length;
      for (let i = 0;i < toCleanUp; i++) {
        cleanup = this.cleanupFn.shift();
        cleanup();
      }
      this.transport.on("error", function() {
        debug("error triggered by discarded transport");
      });
      this.transport.close();
      (0, timers_1.clearTimeout)(this.pingTimeoutTimer);
    }
    onClose(reason, description) {
      if (this.readyState !== "closed") {
        this.readyState = "closed";
        (0, timers_1.clearTimeout)(this.pingIntervalTimer);
        (0, timers_1.clearTimeout)(this.pingTimeoutTimer);
        process.nextTick(() => {
          this.writeBuffer = [];
        });
        this.packetsFn = [];
        this.sentCallbackFn = [];
        this.clearTransport();
        this.emit("close", reason, description);
      }
    }
    setupSendCallback() {
      const onDrain = () => {
        if (this.sentCallbackFn.length > 0) {
          const seqFn = this.sentCallbackFn.splice(0, 1)[0];
          if (typeof seqFn === "function") {
            debug("executing send callback");
            seqFn(this.transport);
          } else if (Array.isArray(seqFn)) {
            debug("executing batch send callback");
            const l = seqFn.length;
            let i = 0;
            for (;i < l; i++) {
              if (typeof seqFn[i] === "function") {
                seqFn[i](this.transport);
              }
            }
          }
        }
      };
      this.transport.on("drain", onDrain);
      this.cleanupFn.push(() => {
        this.transport.removeListener("drain", onDrain);
      });
    }
    send(data, options, callback) {
      this.sendPacket("message", data, options, callback);
      return this;
    }
    write(data, options, callback) {
      this.sendPacket("message", data, options, callback);
      return this;
    }
    sendPacket(type47, data, options = {}, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (this.readyState !== "closing" && this.readyState !== "closed") {
        debug('sending packet "%s" (%s)', type47, data);
        options.compress = options.compress !== false;
        const packet = {
          type: type47,
          options
        };
        if (data)
          packet.data = data;
        this.emit("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (callback)
          this.packetsFn.push(callback);
        this.flush();
      }
    }
    flush() {
      if (this.readyState !== "closed" && this.transport.writable && this.writeBuffer.length) {
        debug("flushing buffer to transport");
        this.emit("flush", this.writeBuffer);
        this.server.emit("flush", this, this.writeBuffer);
        const wbuf = this.writeBuffer;
        this.writeBuffer = [];
        if (!this.transport.supportsFraming) {
          this.sentCallbackFn.push(this.packetsFn);
        } else {
          this.sentCallbackFn.push.apply(this.sentCallbackFn, this.packetsFn);
        }
        this.packetsFn = [];
        this.transport.send(wbuf);
        this.emit("drain");
        this.server.emit("drain", this);
      }
    }
    getAvailableUpgrades() {
      const availableUpgrades = [];
      const allUpgrades = this.server.upgrades(this.transport.name);
      let i = 0;
      const l = allUpgrades.length;
      for (;i < l; ++i) {
        const upg = allUpgrades[i];
        if (this.server.opts.transports.indexOf(upg) !== -1) {
          availableUpgrades.push(upg);
        }
      }
      return availableUpgrades;
    }
    close(discard12) {
      if (this.readyState !== "open")
        return;
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        debug("there are %d remaining packets in the buffer, waiting for the 'drain' event", this.writeBuffer.length);
        this.once("drain", () => {
          debug("all packets have been sent, closing the transport");
          this.closeTransport(discard12);
        });
        return;
      }
      debug("the buffer is empty, closing the transport right away", discard12);
      this.closeTransport(discard12);
    }
    closeTransport(discard12) {
      debug("closing the transport (discard? %s)", discard12);
      if (discard12)
        this.transport.discard();
      this.transport.close(this.onClose.bind(this, "forced close"));
    }
  }
  exports.Socket = Socket;
});

// ../node_modules/cookie/index.js
var require_cookie = __commonJS((exports) => {
  var parse5 = function(str, options) {
    if (typeof str !== "string") {
      throw new TypeError("argument str must be a string");
    }
    var obj = {};
    var opt = options || {};
    var pairs = str.split(";");
    var dec = opt.decode || decode3;
    for (var i = 0;i < pairs.length; i++) {
      var pair = pairs[i];
      var index = pair.indexOf("=");
      if (index < 0) {
        continue;
      }
      var key = pair.substring(0, index).trim();
      if (obj[key] == undefined) {
        var val = pair.substring(index + 1, pair.length).trim();
        if (val[0] === '"') {
          val = val.slice(1, -1);
        }
        obj[key] = tryDecode2(val, dec);
      }
    }
    return obj;
  };
  var serialize2 = function(name, val, options) {
    var opt = options || {};
    var enc = opt.encode || encode3;
    if (typeof enc !== "function") {
      throw new TypeError("option encode is invalid");
    }
    if (!fieldContentRegExp2.test(name)) {
      throw new TypeError("argument name is invalid");
    }
    var value15 = enc(val);
    if (value15 && !fieldContentRegExp2.test(value15)) {
      throw new TypeError("argument val is invalid");
    }
    var str = name + "=" + value15;
    if (opt.maxAge != null) {
      var maxAge = opt.maxAge - 0;
      if (isNaN(maxAge) || !isFinite(maxAge)) {
        throw new TypeError("option maxAge is invalid");
      }
      str += "; Max-Age=" + Math.floor(maxAge);
    }
    if (opt.domain) {
      if (!fieldContentRegExp2.test(opt.domain)) {
        throw new TypeError("option domain is invalid");
      }
      str += "; Domain=" + opt.domain;
    }
    if (opt.path) {
      if (!fieldContentRegExp2.test(opt.path)) {
        throw new TypeError("option path is invalid");
      }
      str += "; Path=" + opt.path;
    }
    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== "function") {
        throw new TypeError("option expires is invalid");
      }
      str += "; Expires=" + opt.expires.toUTCString();
    }
    if (opt.httpOnly) {
      str += "; HttpOnly";
    }
    if (opt.secure) {
      str += "; Secure";
    }
    if (opt.sameSite) {
      var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
      switch (sameSite) {
        case true:
          str += "; SameSite=Strict";
          break;
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return str;
  };
  var tryDecode2 = function(str, decode4) {
    try {
      return decode4(str);
    } catch (e2) {
      return str;
    }
  };
  /*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */
  exports.parse = parse5;
  exports.serialize = serialize2;
  var decode3 = decodeURIComponent;
  var encode3 = encodeURIComponent;
  var fieldContentRegExp2 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
});

// ../node_modules/object-assign/index.js
var require_object_assign = __commonJS((exports, module) => {
  var toObject = function(val) {
    if (val === null || val === undefined) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  };
  var shouldUseNative = function() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0;i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  module.exports = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols69;
    for (var s = 1;s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols69 = getOwnPropertySymbols(from);
        for (var i = 0;i < symbols69.length; i++) {
          if (propIsEnumerable.call(from, symbols69[i])) {
            to[symbols69[i]] = from[symbols69[i]];
          }
        }
      }
    }
    return to;
  };
});

// ../node_modules/vary/index.js
var require_vary = __commonJS((exports, module) => {
  var append = function(header, field) {
    if (typeof header !== "string") {
      throw new TypeError("header argument is required");
    }
    if (!field) {
      throw new TypeError("field argument is required");
    }
    var fields = !Array.isArray(field) ? parse5(String(field)) : field;
    for (var j = 0;j < fields.length; j++) {
      if (!FIELD_NAME_REGEXP.test(fields[j])) {
        throw new TypeError("field argument contains an invalid header name");
      }
    }
    if (header === "*") {
      return header;
    }
    var val = header;
    var vals = parse5(header.toLowerCase());
    if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
      return "*";
    }
    for (var i = 0;i < fields.length; i++) {
      var fld = fields[i].toLowerCase();
      if (vals.indexOf(fld) === -1) {
        vals.push(fld);
        val = val ? val + ", " + fields[i] : fields[i];
      }
    }
    return val;
  };
  var parse5 = function(header) {
    var end = 0;
    var list = [];
    var start = 0;
    for (var i = 0, len = header.length;i < len; i++) {
      switch (header.charCodeAt(i)) {
        case 32:
          if (start === end) {
            start = end = i + 1;
          }
          break;
        case 44:
          list.push(header.substring(start, end));
          start = end = i + 1;
          break;
        default:
          end = i + 1;
          break;
      }
    }
    list.push(header.substring(start, end));
    return list;
  };
  var vary = function(res, field) {
    if (!res || !res.getHeader || !res.setHeader) {
      throw new TypeError("res argument is required");
    }
    var val = res.getHeader("Vary") || "";
    var header = Array.isArray(val) ? val.join(", ") : String(val);
    if (val = append(header, field)) {
      res.setHeader("Vary", val);
    }
  };
  /*!
   * vary
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   */
  module.exports = vary;
  module.exports.append = append;
  var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
});

// ../node_modules/cors/lib/index.js
var require_lib2 = __commonJS((exports, module) => {
  (function() {
    var assign = require_object_assign();
    var vary = require_vary();
    var defaults = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204
    };
    function isString(s) {
      return typeof s === "string" || s instanceof String;
    }
    function isOriginAllowed(origin, allowedOrigin) {
      if (Array.isArray(allowedOrigin)) {
        for (var i = 0;i < allowedOrigin.length; ++i) {
          if (isOriginAllowed(origin, allowedOrigin[i])) {
            return true;
          }
        }
        return false;
      } else if (isString(allowedOrigin)) {
        return origin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      } else {
        return !!allowedOrigin;
      }
    }
    function configureOrigin(options, req) {
      var requestOrigin = req.headers.origin, headers = [], isAllowed;
      if (!options.origin || options.origin === "*") {
        headers.push([{
          key: "Access-Control-Allow-Origin",
          value: "*"
        }]);
      } else if (isString(options.origin)) {
        headers.push([{
          key: "Access-Control-Allow-Origin",
          value: options.origin
        }]);
        headers.push([{
          key: "Vary",
          value: "Origin"
        }]);
      } else {
        isAllowed = isOriginAllowed(requestOrigin, options.origin);
        headers.push([{
          key: "Access-Control-Allow-Origin",
          value: isAllowed ? requestOrigin : false
        }]);
        headers.push([{
          key: "Vary",
          value: "Origin"
        }]);
      }
      return headers;
    }
    function configureMethods(options) {
      var methods = options.methods;
      if (methods.join) {
        methods = options.methods.join(",");
      }
      return {
        key: "Access-Control-Allow-Methods",
        value: methods
      };
    }
    function configureCredentials(options) {
      if (options.credentials === true) {
        return {
          key: "Access-Control-Allow-Credentials",
          value: "true"
        };
      }
      return null;
    }
    function configureAllowedHeaders(options, req) {
      var allowedHeaders = options.allowedHeaders || options.headers;
      var headers = [];
      if (!allowedHeaders) {
        allowedHeaders = req.headers["access-control-request-headers"];
        headers.push([{
          key: "Vary",
          value: "Access-Control-Request-Headers"
        }]);
      } else if (allowedHeaders.join) {
        allowedHeaders = allowedHeaders.join(",");
      }
      if (allowedHeaders && allowedHeaders.length) {
        headers.push([{
          key: "Access-Control-Allow-Headers",
          value: allowedHeaders
        }]);
      }
      return headers;
    }
    function configureExposedHeaders(options) {
      var headers = options.exposedHeaders;
      if (!headers) {
        return null;
      } else if (headers.join) {
        headers = headers.join(",");
      }
      if (headers && headers.length) {
        return {
          key: "Access-Control-Expose-Headers",
          value: headers
        };
      }
      return null;
    }
    function configureMaxAge(options) {
      var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
      if (maxAge && maxAge.length) {
        return {
          key: "Access-Control-Max-Age",
          value: maxAge
        };
      }
      return null;
    }
    function applyHeaders(headers, res) {
      for (var i = 0, n = headers.length;i < n; i++) {
        var header = headers[i];
        if (header) {
          if (Array.isArray(header)) {
            applyHeaders(header, res);
          } else if (header.key === "Vary" && header.value) {
            vary(res, header.value);
          } else if (header.value) {
            res.setHeader(header.key, header.value);
          }
        }
      }
    }
    function cors(options, req, res, next) {
      var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
      if (method === "OPTIONS") {
        headers.push(configureOrigin(options, req));
        headers.push(configureCredentials(options, req));
        headers.push(configureMethods(options, req));
        headers.push(configureAllowedHeaders(options, req));
        headers.push(configureMaxAge(options, req));
        headers.push(configureExposedHeaders(options, req));
        applyHeaders(headers, res);
        if (options.preflightContinue) {
          next();
        } else {
          res.statusCode = options.optionsSuccessStatus;
          res.setHeader("Content-Length", "0");
          res.end();
        }
      } else {
        headers.push(configureOrigin(options, req));
        headers.push(configureCredentials(options, req));
        headers.push(configureExposedHeaders(options, req));
        applyHeaders(headers, res);
        next();
      }
    }
    function middlewareWrapper(o) {
      var optionsCallback = null;
      if (typeof o === "function") {
        optionsCallback = o;
      } else {
        optionsCallback = function(req, cb) {
          cb(null, o);
        };
      }
      return function corsMiddleware(req, res, next) {
        optionsCallback(req, function(err, options) {
          if (err) {
            next(err);
          } else {
            var corsOptions = assign({}, defaults, options);
            var originCallback = null;
            if (corsOptions.origin && typeof corsOptions.origin === "function") {
              originCallback = corsOptions.origin;
            } else if (corsOptions.origin) {
              originCallback = function(origin, cb) {
                cb(null, corsOptions.origin);
              };
            }
            if (originCallback) {
              originCallback(req.headers.origin, function(err2, origin) {
                if (err2 || !origin) {
                  next(err2);
                } else {
                  corsOptions.origin = origin;
                  cors(corsOptions, req, res, next);
                }
              });
            } else {
              next();
            }
          }
        });
      };
    }
    module.exports = middlewareWrapper;
  })();
});

// ../node_modules/engine.io/build/server.js
var require_server = __commonJS((exports) => {
  var parseSessionId = function(data) {
    try {
      const parsed = JSON.parse(data);
      if (typeof parsed.sid === "string") {
        return parsed.sid;
      }
    } catch (e2) {
    }
  };
  var abortRequest = function(res, errorCode, errorContext) {
    const statusCode = errorCode === Server.errors.FORBIDDEN ? 403 : 400;
    const message = errorContext && errorContext.message ? errorContext.message : Server.errorMessages[errorCode];
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      code: errorCode,
      message
    }));
  };
  var abortUpgrade = function(socket, errorCode, errorContext = {}) {
    socket.on("error", () => {
      debug("ignoring error from closed connection");
    });
    if (socket.writable) {
      const message = errorContext.message || Server.errorMessages[errorCode];
      const length = Buffer.byteLength(message);
      socket.write("HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-type: text/html\r\nContent-Length: " + length + "\r\n\r\n" + message);
    }
    socket.destroy();
  };
  var checkInvalidHeaderChar = function(val) {
    val += "";
    if (val.length < 1)
      return false;
    if (!validHdrChars[val.charCodeAt(0)]) {
      debug('invalid header, index 0, char "%s"', val.charCodeAt(0));
      return true;
    }
    if (val.length < 2)
      return false;
    if (!validHdrChars[val.charCodeAt(1)]) {
      debug('invalid header, index 1, char "%s"', val.charCodeAt(1));
      return true;
    }
    if (val.length < 3)
      return false;
    if (!validHdrChars[val.charCodeAt(2)]) {
      debug('invalid header, index 2, char "%s"', val.charCodeAt(2));
      return true;
    }
    if (val.length < 4)
      return false;
    if (!validHdrChars[val.charCodeAt(3)]) {
      debug('invalid header, index 3, char "%s"', val.charCodeAt(3));
      return true;
    }
    for (let i = 4;i < val.length; ++i) {
      if (!validHdrChars[val.charCodeAt(i)]) {
        debug('invalid header, index "%i", char "%s"', i, val.charCodeAt(i));
        return true;
      }
    }
    return false;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Server = exports.BaseServer = undefined;
  var qs = import.meta.require("querystring");
  var url_1 = import.meta.require("url");
  var base64id = require_base64id();
  var transports_1 = require_transports();
  var events_1 = import.meta.require("events");
  var socket_1 = require_socket();
  var debug_1 = require_src();
  var cookie_1 = require_cookie();
  var ws_1 = import.meta.require("ws");
  var webtransport_1 = require_webtransport();
  var engine_io_parser_1 = require_cjs();
  var debug = (0, debug_1.default)("engine");
  var kResponseHeaders = Symbol("responseHeaders");

  class BaseServer extends events_1.EventEmitter {
    constructor(opts = {}) {
      super();
      this.middlewares = [];
      this.clients = {};
      this.clientsCount = 0;
      this.opts = Object.assign({
        wsEngine: ws_1.Server,
        pingTimeout: 20000,
        pingInterval: 25000,
        upgradeTimeout: 1e4,
        maxHttpBufferSize: 1e6,
        transports: ["polling", "websocket"],
        allowUpgrades: true,
        httpCompression: {
          threshold: 1024
        },
        cors: false,
        allowEIO3: false
      }, opts);
      if (opts.cookie) {
        this.opts.cookie = Object.assign({
          name: "io",
          path: "/",
          httpOnly: opts.cookie.path !== false,
          sameSite: "lax"
        }, opts.cookie);
      }
      if (this.opts.cors) {
        this.use(require_lib2()(this.opts.cors));
      }
      if (opts.perMessageDeflate) {
        this.opts.perMessageDeflate = Object.assign({
          threshold: 1024
        }, opts.perMessageDeflate);
      }
      this.init();
    }
    _computePath(options) {
      let path = (options.path || "/engine.io").replace(/\/$/, "");
      if (options.addTrailingSlash !== false) {
        path += "/";
      }
      return path;
    }
    upgrades(transport) {
      if (!this.opts.allowUpgrades)
        return [];
      return transports_1.default[transport].upgradesTo || [];
    }
    verify(req, upgrade, fn) {
      const transport = req._query.transport;
      if (!~this.opts.transports.indexOf(transport) || transport === "webtransport") {
        debug('unknown transport "%s"', transport);
        return fn(Server.errors.UNKNOWN_TRANSPORT, { transport });
      }
      const isOriginInvalid = checkInvalidHeaderChar(req.headers.origin);
      if (isOriginInvalid) {
        const origin = req.headers.origin;
        req.headers.origin = null;
        debug("origin header invalid");
        return fn(Server.errors.BAD_REQUEST, {
          name: "INVALID_ORIGIN",
          origin
        });
      }
      const sid = req._query.sid;
      if (sid) {
        if (!this.clients.hasOwnProperty(sid)) {
          debug('unknown sid "%s"', sid);
          return fn(Server.errors.UNKNOWN_SID, {
            sid
          });
        }
        const previousTransport = this.clients[sid].transport.name;
        if (!upgrade && previousTransport !== transport) {
          debug("bad request: unexpected transport without upgrade");
          return fn(Server.errors.BAD_REQUEST, {
            name: "TRANSPORT_MISMATCH",
            transport,
            previousTransport
          });
        }
      } else {
        if (req.method !== "GET") {
          return fn(Server.errors.BAD_HANDSHAKE_METHOD, {
            method: req.method
          });
        }
        if (transport === "websocket" && !upgrade) {
          debug("invalid transport upgrade");
          return fn(Server.errors.BAD_REQUEST, {
            name: "TRANSPORT_HANDSHAKE_ERROR"
          });
        }
        if (!this.opts.allowRequest)
          return fn();
        return this.opts.allowRequest(req, (message, success) => {
          if (!success) {
            return fn(Server.errors.FORBIDDEN, {
              message
            });
          }
          fn();
        });
      }
      fn();
    }
    use(fn) {
      this.middlewares.push(fn);
    }
    _applyMiddlewares(req, res, callback) {
      if (this.middlewares.length === 0) {
        debug("no middleware to apply, skipping");
        return callback();
      }
      const apply = (i) => {
        debug("applying middleware n\xB0%d", i + 1);
        this.middlewares[i](req, res, (err) => {
          if (err) {
            return callback(err);
          }
          if (i + 1 < this.middlewares.length) {
            apply(i + 1);
          } else {
            callback();
          }
        });
      };
      apply(0);
    }
    close() {
      debug("closing all open clients");
      for (let i in this.clients) {
        if (this.clients.hasOwnProperty(i)) {
          this.clients[i].close(true);
        }
      }
      this.cleanup();
      return this;
    }
    generateId(req) {
      return base64id.generateId();
    }
    async handshake(transportName, req, closeConnection) {
      const protocol = req._query.EIO === "4" ? 4 : 3;
      if (protocol === 3 && !this.opts.allowEIO3) {
        debug("unsupported protocol version");
        this.emit("connection_error", {
          req,
          code: Server.errors.UNSUPPORTED_PROTOCOL_VERSION,
          message: Server.errorMessages[Server.errors.UNSUPPORTED_PROTOCOL_VERSION],
          context: {
            protocol
          }
        });
        closeConnection(Server.errors.UNSUPPORTED_PROTOCOL_VERSION);
        return;
      }
      let id;
      try {
        id = await this.generateId(req);
      } catch (e2) {
        debug("error while generating an id");
        this.emit("connection_error", {
          req,
          code: Server.errors.BAD_REQUEST,
          message: Server.errorMessages[Server.errors.BAD_REQUEST],
          context: {
            name: "ID_GENERATION_ERROR",
            error: e2
          }
        });
        closeConnection(Server.errors.BAD_REQUEST);
        return;
      }
      debug('handshaking client "%s"', id);
      try {
        var transport = this.createTransport(transportName, req);
        if (transportName === "polling") {
          transport.maxHttpBufferSize = this.opts.maxHttpBufferSize;
          transport.httpCompression = this.opts.httpCompression;
        } else if (transportName === "websocket") {
          transport.perMessageDeflate = this.opts.perMessageDeflate;
        }
      } catch (e2) {
        debug('error handshaking to transport "%s"', transportName);
        this.emit("connection_error", {
          req,
          code: Server.errors.BAD_REQUEST,
          message: Server.errorMessages[Server.errors.BAD_REQUEST],
          context: {
            name: "TRANSPORT_HANDSHAKE_ERROR",
            error: e2
          }
        });
        closeConnection(Server.errors.BAD_REQUEST);
        return;
      }
      const socket = new socket_1.Socket(id, this, transport, req, protocol);
      transport.on("headers", (headers, req2) => {
        const isInitialRequest = !req2._query.sid;
        if (isInitialRequest) {
          if (this.opts.cookie) {
            headers["Set-Cookie"] = [
              (0, cookie_1.serialize)(this.opts.cookie.name, id, this.opts.cookie)
            ];
          }
          this.emit("initial_headers", headers, req2);
        }
        this.emit("headers", headers, req2);
      });
      transport.onRequest(req);
      this.clients[id] = socket;
      this.clientsCount++;
      socket.once("close", () => {
        delete this.clients[id];
        this.clientsCount--;
      });
      this.emit("connection", socket);
      return transport;
    }
    async onWebTransportSession(session) {
      const timeout = setTimeout(() => {
        debug("the client failed to establish a bidirectional stream in the given period");
        session.close();
      }, this.opts.upgradeTimeout);
      const streamReader = session.incomingBidirectionalStreams.getReader();
      const result = await streamReader.read();
      if (result.done) {
        debug("session is closed");
        return;
      }
      const stream = result.value;
      const transformStream = (0, engine_io_parser_1.createPacketDecoderStream)(this.opts.maxHttpBufferSize, "nodebuffer");
      const reader = stream.readable.pipeThrough(transformStream).getReader();
      const { value: value15, done } = await reader.read();
      if (done) {
        debug("stream is closed");
        return;
      }
      clearTimeout(timeout);
      if (value15.type !== "open") {
        debug("invalid WebTransport handshake");
        return session.close();
      }
      if (value15.data === undefined) {
        const transport = new webtransport_1.WebTransport(session, stream, reader);
        const id = base64id.generateId();
        debug('handshaking client "%s" (WebTransport)', id);
        const socket = new socket_1.Socket(id, this, transport, null, 4);
        this.clients[id] = socket;
        this.clientsCount++;
        socket.once("close", () => {
          delete this.clients[id];
          this.clientsCount--;
        });
        this.emit("connection", socket);
        return;
      }
      const sid = parseSessionId(value15.data);
      if (!sid) {
        debug("invalid WebTransport handshake");
        return session.close();
      }
      const client = this.clients[sid];
      if (!client) {
        debug("upgrade attempt for closed client");
        session.close();
      } else if (client.upgrading) {
        debug("transport has already been trying to upgrade");
        session.close();
      } else if (client.upgraded) {
        debug("transport had already been upgraded");
        session.close();
      } else {
        debug("upgrading existing transport");
        const transport = new webtransport_1.WebTransport(session, stream, reader);
        client.maybeUpgrade(transport);
      }
    }
  }
  exports.BaseServer = BaseServer;
  BaseServer.errors = {
    UNKNOWN_TRANSPORT: 0,
    UNKNOWN_SID: 1,
    BAD_HANDSHAKE_METHOD: 2,
    BAD_REQUEST: 3,
    FORBIDDEN: 4,
    UNSUPPORTED_PROTOCOL_VERSION: 5
  };
  BaseServer.errorMessages = {
    0: "Transport unknown",
    1: "Session ID unknown",
    2: "Bad handshake method",
    3: "Bad request",
    4: "Forbidden",
    5: "Unsupported protocol version"
  };

  class WebSocketResponse {
    constructor(req, socket) {
      this.req = req;
      this.socket = socket;
      req[kResponseHeaders] = {};
    }
    setHeader(name, value15) {
      this.req[kResponseHeaders][name] = value15;
    }
    getHeader(name) {
      return this.req[kResponseHeaders][name];
    }
    removeHeader(name) {
      delete this.req[kResponseHeaders][name];
    }
    write() {
    }
    writeHead() {
    }
    end() {
      this.socket.destroy();
    }
  }

  class Server extends BaseServer {
    init() {
      if (!~this.opts.transports.indexOf("websocket"))
        return;
      if (this.ws)
        this.ws.close();
      this.ws = new this.opts.wsEngine({
        noServer: true,
        clientTracking: false,
        perMessageDeflate: this.opts.perMessageDeflate,
        maxPayload: this.opts.maxHttpBufferSize
      });
      if (typeof this.ws.on === "function") {
        this.ws.on("headers", (headersArray, req) => {
          const additionalHeaders = req[kResponseHeaders] || {};
          delete req[kResponseHeaders];
          const isInitialRequest = !req._query.sid;
          if (isInitialRequest) {
            this.emit("initial_headers", additionalHeaders, req);
          }
          this.emit("headers", additionalHeaders, req);
          debug("writing headers: %j", additionalHeaders);
          Object.keys(additionalHeaders).forEach((key) => {
            headersArray.push(`${key}: ${additionalHeaders[key]}`);
          });
        });
      }
    }
    cleanup() {
      if (this.ws) {
        debug("closing webSocketServer");
        this.ws.close();
      }
    }
    prepare(req) {
      if (!req._query) {
        req._query = ~req.url.indexOf("?") ? qs.parse((0, url_1.parse)(req.url).query) : {};
      }
    }
    createTransport(transportName, req) {
      return new transports_1.default[transportName](req);
    }
    handleRequest(req, res) {
      debug('handling "%s" http request "%s"', req.method, req.url);
      this.prepare(req);
      req.res = res;
      const callback = (errorCode, errorContext) => {
        if (errorCode !== undefined) {
          this.emit("connection_error", {
            req,
            code: errorCode,
            message: Server.errorMessages[errorCode],
            context: errorContext
          });
          abortRequest(res, errorCode, errorContext);
          return;
        }
        if (req._query.sid) {
          debug("setting new request for existing client");
          this.clients[req._query.sid].transport.onRequest(req);
        } else {
          const closeConnection = (errorCode2, errorContext2) => abortRequest(res, errorCode2, errorContext2);
          this.handshake(req._query.transport, req, closeConnection);
        }
      };
      this._applyMiddlewares(req, res, (err) => {
        if (err) {
          callback(Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
        } else {
          this.verify(req, false, callback);
        }
      });
    }
    handleUpgrade(req, socket, upgradeHead) {
      this.prepare(req);
      const res = new WebSocketResponse(req, socket);
      const callback = (errorCode, errorContext) => {
        if (errorCode !== undefined) {
          this.emit("connection_error", {
            req,
            code: errorCode,
            message: Server.errorMessages[errorCode],
            context: errorContext
          });
          abortUpgrade(socket, errorCode, errorContext);
          return;
        }
        const head = Buffer.from(upgradeHead);
        upgradeHead = null;
        res.writeHead();
        this.ws.handleUpgrade(req, socket, head, (websocket2) => {
          this.onWebSocket(req, socket, websocket2);
        });
      };
      this._applyMiddlewares(req, res, (err) => {
        if (err) {
          callback(Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
        } else {
          this.verify(req, true, callback);
        }
      });
    }
    onWebSocket(req, socket, websocket2) {
      websocket2.on("error", onUpgradeError);
      if (transports_1.default[req._query.transport] !== undefined && !transports_1.default[req._query.transport].prototype.handlesUpgrades) {
        debug("transport doesnt handle upgraded requests");
        websocket2.close();
        return;
      }
      const id = req._query.sid;
      req.websocket = websocket2;
      if (id) {
        const client = this.clients[id];
        if (!client) {
          debug("upgrade attempt for closed client");
          websocket2.close();
        } else if (client.upgrading) {
          debug("transport has already been trying to upgrade");
          websocket2.close();
        } else if (client.upgraded) {
          debug("transport had already been upgraded");
          websocket2.close();
        } else {
          debug("upgrading existing transport");
          websocket2.removeListener("error", onUpgradeError);
          const transport = this.createTransport(req._query.transport, req);
          transport.perMessageDeflate = this.opts.perMessageDeflate;
          client.maybeUpgrade(transport);
        }
      } else {
        const closeConnection = (errorCode, errorContext) => abortUpgrade(socket, errorCode, errorContext);
        this.handshake(req._query.transport, req, closeConnection);
      }
      function onUpgradeError() {
        debug("websocket error before upgrade");
      }
    }
    attach(server, options = {}) {
      const path = this._computePath(options);
      const destroyUpgradeTimeout = options.destroyUpgradeTimeout || 1000;
      function check11(req) {
        return path === req.url.slice(0, path.length);
      }
      const listeners = server.listeners("request").slice(0);
      server.removeAllListeners("request");
      server.on("close", this.close.bind(this));
      server.on("listening", this.init.bind(this));
      server.on("request", (req, res) => {
        if (check11(req)) {
          debug('intercepting request for path "%s"', path);
          this.handleRequest(req, res);
        } else {
          let i = 0;
          const l = listeners.length;
          for (;i < l; i++) {
            listeners[i].call(server, req, res);
          }
        }
      });
      if (~this.opts.transports.indexOf("websocket")) {
        server.on("upgrade", (req, socket, head) => {
          if (check11(req)) {
            this.handleUpgrade(req, socket, head);
          } else if (options.destroyUpgrade !== false) {
            setTimeout(function() {
              if (socket.writable && socket.bytesWritten <= 0) {
                socket.on("error", (e2) => {
                  debug("error while destroying upgrade: %s", e2.message);
                });
                return socket.end();
              }
            }, destroyUpgradeTimeout);
          }
        });
      }
    }
  }
  exports.Server = Server;
  var validHdrChars = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
});

// ../node_modules/engine.io/build/transports-uws/polling.js
var require_polling2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Polling = undefined;
  var transport_1 = require_transport();
  var zlib_1 = import.meta.require("zlib");
  var accepts = require_accepts();
  var debug_1 = require_src();
  var debug = (0, debug_1.default)("engine:polling");
  var compressionMethods = {
    gzip: zlib_1.createGzip,
    deflate: zlib_1.createDeflate
  };

  class Polling extends transport_1.Transport {
    constructor(req) {
      super(req);
      this.closeTimeout = 30 * 1000;
    }
    get name() {
      return "polling";
    }
    get supportsFraming() {
      return false;
    }
    onRequest(req) {
      const res = req.res;
      req.res = null;
      if (req.getMethod() === "get") {
        this.onPollRequest(req, res);
      } else if (req.getMethod() === "post") {
        this.onDataRequest(req, res);
      } else {
        res.writeStatus("500 Internal Server Error");
        res.end();
      }
    }
    onPollRequest(req, res) {
      if (this.req) {
        debug("request overlap");
        this.onError("overlap from client");
        res.writeStatus("500 Internal Server Error");
        res.end();
        return;
      }
      debug("setting request");
      this.req = req;
      this.res = res;
      const onClose = () => {
        this.writable = false;
        this.onError("poll connection closed prematurely");
      };
      const cleanup = () => {
        this.req = this.res = null;
      };
      req.cleanup = cleanup;
      res.onAborted(onClose);
      this.writable = true;
      this.emit("drain");
      if (this.writable && this.shouldClose) {
        debug("triggering empty send to append close packet");
        this.send([{ type: "noop" }]);
      }
    }
    onDataRequest(req, res) {
      if (this.dataReq) {
        this.onError("data request overlap from client");
        res.writeStatus("500 Internal Server Error");
        res.end();
        return;
      }
      const expectedContentLength = Number(req.headers["content-length"]);
      if (!expectedContentLength) {
        this.onError("content-length header required");
        res.writeStatus("411 Length Required").end();
        return;
      }
      if (expectedContentLength > this.maxHttpBufferSize) {
        this.onError("payload too large");
        res.writeStatus("413 Payload Too Large").end();
        return;
      }
      const isBinary = req.headers["content-type"] === "application/octet-stream";
      if (isBinary && this.protocol === 4) {
        return this.onError("invalid content");
      }
      this.dataReq = req;
      this.dataRes = res;
      let buffer;
      let offset = 0;
      const headers = {
        "Content-Type": "text/html"
      };
      this.headers(req, headers);
      for (let key in headers) {
        res.writeHeader(key, String(headers[key]));
      }
      const onEnd = (buffer2) => {
        this.onData(buffer2.toString());
        this.onDataRequestCleanup();
        res.cork(() => {
          res.end("ok");
        });
      };
      res.onAborted(() => {
        this.onDataRequestCleanup();
        this.onError("data request connection closed prematurely");
      });
      res.onData((arrayBuffer, isLast) => {
        const totalLength = offset + arrayBuffer.byteLength;
        if (totalLength > expectedContentLength) {
          this.onError("content-length mismatch");
          res.close();
          return;
        }
        if (!buffer) {
          if (isLast) {
            onEnd(Buffer.from(arrayBuffer));
            return;
          }
          buffer = Buffer.allocUnsafe(expectedContentLength);
        }
        Buffer.from(arrayBuffer).copy(buffer, offset);
        if (isLast) {
          if (totalLength != expectedContentLength) {
            this.onError("content-length mismatch");
            res.writeStatus("400 Content-Length Mismatch").end();
            this.onDataRequestCleanup();
            return;
          }
          onEnd(buffer);
          return;
        }
        offset = totalLength;
      });
    }
    onDataRequestCleanup() {
      this.dataReq = this.dataRes = null;
    }
    onData(data) {
      debug('received "%s"', data);
      const callback = (packet) => {
        if (packet.type === "close") {
          debug("got xhr close packet");
          this.onClose();
          return false;
        }
        this.onPacket(packet);
      };
      if (this.protocol === 3) {
        this.parser.decodePayload(data, callback);
      } else {
        this.parser.decodePayload(data).forEach(callback);
      }
    }
    onClose() {
      if (this.writable) {
        this.send([{ type: "noop" }]);
      }
      super.onClose();
    }
    send(packets) {
      this.writable = false;
      if (this.shouldClose) {
        debug("appending close packet to payload");
        packets.push({ type: "close" });
        this.shouldClose();
        this.shouldClose = null;
      }
      const doWrite = (data) => {
        const compress = packets.some((packet) => {
          return packet.options && packet.options.compress;
        });
        this.write(data, { compress });
      };
      if (this.protocol === 3) {
        this.parser.encodePayload(packets, this.supportsBinary, doWrite);
      } else {
        this.parser.encodePayload(packets, doWrite);
      }
    }
    write(data, options) {
      debug('writing "%s"', data);
      this.doWrite(data, options, () => {
        this.req.cleanup();
      });
    }
    doWrite(data, options, callback) {
      const isString = typeof data === "string";
      const contentType = isString ? "text/plain; charset=UTF-8" : "application/octet-stream";
      const headers = {
        "Content-Type": contentType
      };
      const respond = (data2) => {
        this.headers(this.req, headers);
        this.res.cork(() => {
          Object.keys(headers).forEach((key) => {
            this.res.writeHeader(key, String(headers[key]));
          });
          this.res.end(data2);
        });
        callback();
      };
      if (!this.httpCompression || !options.compress) {
        respond(data);
        return;
      }
      const len = isString ? Buffer.byteLength(data) : data.length;
      if (len < this.httpCompression.threshold) {
        respond(data);
        return;
      }
      const encoding = accepts(this.req).encodings(["gzip", "deflate"]);
      if (!encoding) {
        respond(data);
        return;
      }
      this.compress(data, encoding, (err, data2) => {
        if (err) {
          this.res.writeStatus("500 Internal Server Error");
          this.res.end();
          callback(err);
          return;
        }
        headers["Content-Encoding"] = encoding;
        respond(data2);
      });
    }
    compress(data, encoding, callback) {
      debug("compressing");
      const buffers = [];
      let nread = 0;
      compressionMethods[encoding](this.httpCompression).on("error", callback).on("data", function(chunk) {
        buffers.push(chunk);
        nread += chunk.length;
      }).on("end", function() {
        callback(null, Buffer.concat(buffers, nread));
      }).end(data);
    }
    doClose(fn) {
      debug("closing");
      let closeTimeoutTimer;
      const onClose = () => {
        clearTimeout(closeTimeoutTimer);
        fn();
        this.onClose();
      };
      if (this.writable) {
        debug("transport writable - closing right away");
        this.send([{ type: "close" }]);
        onClose();
      } else if (this.discarded) {
        debug("transport discarded - closing right away");
        onClose();
      } else {
        debug("transport not writable - buffering orderly close");
        this.shouldClose = onClose;
        closeTimeoutTimer = setTimeout(onClose, this.closeTimeout);
      }
    }
    headers(req, headers) {
      headers = headers || {};
      const ua = req.headers["user-agent"];
      if (ua && (~ua.indexOf(";MSIE") || ~ua.indexOf("Trident/"))) {
        headers["X-XSS-Protection"] = "0";
      }
      headers["cache-control"] = "no-store";
      this.emit("headers", headers, req);
      return headers;
    }
  }
  exports.Polling = Polling;
});

// ../node_modules/engine.io/build/transports-uws/websocket.js
var require_websocket2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WebSocket = undefined;
  var transport_1 = require_transport();
  var debug_1 = require_src();
  var debug = (0, debug_1.default)("engine:ws");

  class WebSocket extends transport_1.Transport {
    constructor(req) {
      super(req);
      this.writable = false;
      this.perMessageDeflate = null;
    }
    get name() {
      return "websocket";
    }
    get handlesUpgrades() {
      return true;
    }
    get supportsFraming() {
      return true;
    }
    send(packets) {
      this.writable = false;
      for (let i = 0;i < packets.length; i++) {
        const packet = packets[i];
        const isLast = i + 1 === packets.length;
        const send = (data) => {
          const isBinary = typeof data !== "string";
          const compress = this.perMessageDeflate && Buffer.byteLength(data) > this.perMessageDeflate.threshold;
          debug('writing "%s"', data);
          this.socket.send(data, isBinary, compress);
          if (isLast) {
            this.writable = true;
            this.emit("drain");
          }
        };
        if (packet.options && typeof packet.options.wsPreEncoded === "string") {
          send(packet.options.wsPreEncoded);
        } else {
          this.parser.encodePacket(packet, this.supportsBinary, send);
        }
      }
    }
    doClose(fn) {
      debug("closing");
      fn && fn();
      this.socket.end();
    }
  }
  exports.WebSocket = WebSocket;
});

// ../node_modules/engine.io/build/transports-uws/index.js
var require_transports_uws = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var polling_1 = require_polling2();
  var websocket_1 = require_websocket2();
  exports.default = {
    polling: polling_1.Polling,
    websocket: websocket_1.WebSocket
  };
});

// ../node_modules/engine.io/build/userver.js
var require_userver = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.uServer = undefined;
  var debug_1 = require_src();
  var server_1 = require_server();
  var transports_uws_1 = require_transports_uws();
  var debug = (0, debug_1.default)("engine:uws");

  class uServer extends server_1.BaseServer {
    init() {
    }
    cleanup() {
    }
    prepare(req, res) {
      req.method = req.getMethod().toUpperCase();
      req.url = req.getUrl();
      const params = new URLSearchParams(req.getQuery());
      req._query = Object.fromEntries(params.entries());
      req.headers = {};
      req.forEach((key, value15) => {
        req.headers[key] = value15;
      });
      req.connection = {
        remoteAddress: Buffer.from(res.getRemoteAddressAsText()).toString()
      };
      res.onAborted(() => {
        debug("response has been aborted");
      });
    }
    createTransport(transportName, req) {
      return new transports_uws_1.default[transportName](req);
    }
    attach(app, options = {}) {
      const path = this._computePath(options);
      app.any(path, this.handleRequest.bind(this)).ws(path, {
        compression: options.compression,
        idleTimeout: options.idleTimeout,
        maxBackpressure: options.maxBackpressure,
        maxPayloadLength: this.opts.maxHttpBufferSize,
        upgrade: this.handleUpgrade.bind(this),
        open: (ws) => {
          const transport = ws.getUserData().transport;
          transport.socket = ws;
          transport.writable = true;
          transport.emit("drain");
        },
        message: (ws, message, isBinary) => {
          ws.getUserData().transport.onData(isBinary ? message : Buffer.from(message).toString());
        },
        close: (ws, code, message) => {
          ws.getUserData().transport.onClose(code, message);
        }
      });
    }
    _applyMiddlewares(req, res, callback) {
      if (this.middlewares.length === 0) {
        return callback();
      }
      req.res = new ResponseWrapper(res);
      super._applyMiddlewares(req, req.res, (err) => {
        req.res.writeHead();
        callback(err);
      });
    }
    handleRequest(res, req) {
      debug('handling "%s" http request "%s"', req.getMethod(), req.getUrl());
      this.prepare(req, res);
      req.res = res;
      const callback = (errorCode, errorContext) => {
        if (errorCode !== undefined) {
          this.emit("connection_error", {
            req,
            code: errorCode,
            message: server_1.Server.errorMessages[errorCode],
            context: errorContext
          });
          this.abortRequest(req.res, errorCode, errorContext);
          return;
        }
        if (req._query.sid) {
          debug("setting new request for existing client");
          this.clients[req._query.sid].transport.onRequest(req);
        } else {
          const closeConnection = (errorCode2, errorContext2) => this.abortRequest(res, errorCode2, errorContext2);
          this.handshake(req._query.transport, req, closeConnection);
        }
      };
      this._applyMiddlewares(req, res, (err) => {
        if (err) {
          callback(server_1.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
        } else {
          this.verify(req, false, callback);
        }
      });
    }
    handleUpgrade(res, req, context) {
      debug("on upgrade");
      this.prepare(req, res);
      req.res = res;
      const callback = async (errorCode, errorContext) => {
        if (errorCode !== undefined) {
          this.emit("connection_error", {
            req,
            code: errorCode,
            message: server_1.Server.errorMessages[errorCode],
            context: errorContext
          });
          this.abortRequest(res, errorCode, errorContext);
          return;
        }
        const id = req._query.sid;
        let transport;
        if (id) {
          const client = this.clients[id];
          if (!client) {
            debug("upgrade attempt for closed client");
            res.close();
          } else if (client.upgrading) {
            debug("transport has already been trying to upgrade");
            res.close();
          } else if (client.upgraded) {
            debug("transport had already been upgraded");
            res.close();
          } else {
            debug("upgrading existing transport");
            transport = this.createTransport(req._query.transport, req);
            client.maybeUpgrade(transport);
          }
        } else {
          transport = await this.handshake(req._query.transport, req, (errorCode2, errorContext2) => this.abortRequest(res, errorCode2, errorContext2));
          if (!transport) {
            return;
          }
        }
        req.res.writeStatus("101 Switching Protocols");
        res.upgrade({
          transport
        }, req.getHeader("sec-websocket-key"), req.getHeader("sec-websocket-protocol"), req.getHeader("sec-websocket-extensions"), context);
      };
      this._applyMiddlewares(req, res, (err) => {
        if (err) {
          callback(server_1.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" });
        } else {
          this.verify(req, true, callback);
        }
      });
    }
    abortRequest(res, errorCode, errorContext) {
      const statusCode = errorCode === server_1.Server.errors.FORBIDDEN ? "403 Forbidden" : "400 Bad Request";
      const message = errorContext && errorContext.message ? errorContext.message : server_1.Server.errorMessages[errorCode];
      res.writeStatus(statusCode);
      res.writeHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        code: errorCode,
        message
      }));
    }
  }
  exports.uServer = uServer;

  class ResponseWrapper {
    constructor(res) {
      this.res = res;
      this.statusWritten = false;
      this.headers = [];
      this.isAborted = false;
    }
    set statusCode(status) {
      if (!status) {
        return;
      }
      this.writeStatus(status === 200 ? "200 OK" : "204 No Content");
    }
    writeHead(status) {
      this.statusCode = status;
    }
    setHeader(key, value15) {
      if (Array.isArray(value15)) {
        value15.forEach((val) => {
          this.writeHeader(key, val);
        });
      } else {
        this.writeHeader(key, value15);
      }
    }
    removeHeader() {
    }
    getHeader() {
    }
    writeStatus(status) {
      if (this.isAborted)
        return;
      this.res.writeStatus(status);
      this.statusWritten = true;
      this.writeBufferedHeaders();
      return this;
    }
    writeHeader(key, value15) {
      if (this.isAborted)
        return;
      if (key === "Content-Length") {
        return;
      }
      if (this.statusWritten) {
        this.res.writeHeader(key, value15);
      } else {
        this.headers.push([key, value15]);
      }
    }
    writeBufferedHeaders() {
      this.headers.forEach(([key, value15]) => {
        this.res.writeHeader(key, value15);
      });
    }
    end(data) {
      if (this.isAborted)
        return;
      this.res.cork(() => {
        if (!this.statusWritten) {
          this.writeBufferedHeaders();
        }
        this.res.end(data);
      });
    }
    onData(fn) {
      if (this.isAborted)
        return;
      this.res.onData(fn);
    }
    onAborted(fn) {
      if (this.isAborted)
        return;
      this.res.onAborted(() => {
        this.isAborted = true;
        fn();
      });
    }
    cork(fn) {
      if (this.isAborted)
        return;
      this.res.cork(fn);
    }
  }
});

// ../node_modules/engine.io/build/engine.io.js
var require_engine_io = __commonJS((exports) => {
  var listen = function(port, options, fn) {
    if (typeof options === "function") {
      fn = options;
      options = {};
    }
    const server = (0, http_1.createServer)(function(req, res) {
      res.writeHead(501);
      res.end("Not Implemented");
    });
    const engine = attach(server, options);
    engine.httpServer = server;
    server.listen(port, fn);
    return engine;
  };
  var attach = function(server, options) {
    const engine = new server_1.Server(options);
    engine.attach(server, options);
    return engine;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.protocol = exports.Transport = exports.Socket = exports.uServer = exports.parser = exports.attach = exports.listen = exports.transports = exports.Server = undefined;
  var http_1 = import.meta.require("http");
  var server_1 = require_server();
  Object.defineProperty(exports, "Server", { enumerable: true, get: function() {
    return server_1.Server;
  } });
  var index_1 = require_transports();
  exports.transports = index_1.default;
  var parser = require_cjs();
  exports.parser = parser;
  var userver_1 = require_userver();
  Object.defineProperty(exports, "uServer", { enumerable: true, get: function() {
    return userver_1.uServer;
  } });
  var socket_1 = require_socket();
  Object.defineProperty(exports, "Socket", { enumerable: true, get: function() {
    return socket_1.Socket;
  } });
  var transport_1 = require_transport();
  Object.defineProperty(exports, "Transport", { enumerable: true, get: function() {
    return transport_1.Transport;
  } });
  exports.protocol = parser.protocol;
  exports.listen = listen;
  exports.attach = attach;
});

// ../node_modules/@socket.io/component-emitter/lib/cjs/index.js
var require_cjs2 = __commonJS((exports) => {
  var Emitter = function(obj) {
    if (obj)
      return mixin(obj);
  };
  var mixin = function(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  };
  exports.Emitter = Emitter;
  Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
  };
  Emitter.prototype.once = function(event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
  };
  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    if (arguments.length == 0) {
      this._callbacks = {};
      return this;
    }
    var callbacks = this._callbacks["$" + event];
    if (!callbacks)
      return this;
    if (arguments.length == 1) {
      delete this._callbacks["$" + event];
      return this;
    }
    var cb;
    for (var i = 0;i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    if (callbacks.length === 0) {
      delete this._callbacks["$" + event];
    }
    return this;
  };
  Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for (var i = 1;i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length;i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
    return this;
  };
  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
  };
  Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };
});

// ../node_modules/socket.io-parser/build/cjs/is-binary.js
var require_is_binary = __commonJS((exports) => {
  var isBinary = function(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
  };
  var hasBinary = function(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i = 0, l = obj.length;i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.hasBinary = exports.isBinary = undefined;
  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
  var isView = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  var toString = Object.prototype.toString;
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  exports.isBinary = isBinary;
  exports.hasBinary = hasBinary;
});

// ../node_modules/socket.io-parser/build/cjs/binary.js
var require_binary = __commonJS((exports) => {
  var deconstructPacket = function(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return { packet: pack, buffers };
  };
  var _deconstructPacket = function(data, buffers) {
    if (!data)
      return data;
    if ((0, is_binary_js_1.isBinary)(data)) {
      const placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      const newData = new Array(data.length);
      for (let i = 0;i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      const newData = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  };
  var reconstructPacket = function(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments;
    return packet;
  };
  var _reconstructPacket = function(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (let i = 0;i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.reconstructPacket = exports.deconstructPacket = undefined;
  var is_binary_js_1 = require_is_binary();
  exports.deconstructPacket = deconstructPacket;
  exports.reconstructPacket = reconstructPacket;
});

// ../node_modules/socket.io-parser/build/cjs/index.js
var require_cjs3 = __commonJS((exports) => {
  var isObject2 = function(value15) {
    return Object.prototype.toString.call(value15) === "[object Object]";
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = undefined;
  var component_emitter_1 = require_cjs2();
  var binary_js_1 = require_binary();
  var is_binary_js_1 = require_is_binary();
  var debug_1 = require_src();
  var debug = (0, debug_1.default)("socket.io-parser");
  var RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
  ];
  exports.protocol = 5;
  var PacketType;
  (function(PacketType2) {
    PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
    PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
    PacketType2[PacketType2["ACK"] = 3] = "ACK";
    PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType = exports.PacketType || (exports.PacketType = {}));

  class Encoder {
    constructor(replacer) {
      this.replacer = replacer;
    }
    encode(obj) {
      debug("encoding packet %j", obj);
      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
        if ((0, is_binary_js_1.hasBinary)(obj)) {
          return this.encodeAsBinary({
            type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
            nsp: obj.nsp,
            data: obj.data,
            id: obj.id
          });
        }
      }
      return [this.encodeAsString(obj)];
    }
    encodeAsString(obj) {
      let str = "" + obj.type;
      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && obj.nsp !== "/") {
        str += obj.nsp + ",";
      }
      if (obj.id != null) {
        str += obj.id;
      }
      if (obj.data != null) {
        str += JSON.stringify(obj.data, this.replacer);
      }
      debug("encoded %j as %s", obj, str);
      return str;
    }
    encodeAsBinary(obj) {
      const deconstruction = (0, binary_js_1.deconstructPacket)(obj);
      const pack = this.encodeAsString(deconstruction.packet);
      const buffers = deconstruction.buffers;
      buffers.unshift(pack);
      return buffers;
    }
  }
  exports.Encoder = Encoder;

  class Decoder extends component_emitter_1.Emitter {
    constructor(reviver) {
      super();
      this.reviver = reviver;
    }
    add(obj) {
      let packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = this.decodeString(obj);
        const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
        if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
          packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
          this.reconstructor = new BinaryReconstructor(packet);
          if (packet.attachments === 0) {
            super.emitReserved("decoded", packet);
          }
        } else {
          super.emitReserved("decoded", packet);
        }
      } else if ((0, is_binary_js_1.isBinary)(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            super.emitReserved("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    }
    decodeString(str) {
      let i = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === undefined) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i + 1;
        while (str.charAt(++i) !== "-" && i != str.length) {
        }
        const buf = str.substring(start, i);
        if (buf != Number(buf) || str.charAt(i) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if (str.charAt(i + 1) === "/") {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if (c === ",")
            break;
          if (i === str.length)
            break;
        }
        p.nsp = str.substring(start, i);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i + 1);
      if (next !== "" && Number(next) == next) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if (c == null || Number(c) != c) {
            --i;
            break;
          }
          if (i === str.length)
            break;
        }
        p.id = Number(str.substring(start, i + 1));
      }
      if (str.charAt(++i)) {
        const payload = this.tryParse(str.substr(i));
        if (Decoder.isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      debug("decoded %s as %j", str, p);
      return p;
    }
    tryParse(str) {
      try {
        return JSON.parse(str, this.reviver);
      } catch (e2) {
        return false;
      }
    }
    static isPayloadValid(type47, payload) {
      switch (type47) {
        case PacketType.CONNECT:
          return isObject2(payload);
        case PacketType.DISCONNECT:
          return payload === undefined;
        case PacketType.CONNECT_ERROR:
          return typeof payload === "string" || isObject2(payload);
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          return Array.isArray(payload);
      }
    }
    destroy() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
        this.reconstructor = null;
      }
    }
  }
  exports.Decoder = Decoder;

  class BinaryReconstructor {
    constructor(packet) {
      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    takeBinaryData(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        const packet = (0, binary_js_1.reconstructPacket)(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    }
    finishedReconstruction() {
      this.reconPack = null;
      this.buffers = [];
    }
  }
});

// ../node_modules/socket.io/dist/client.js
var require_client = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Client = undefined;
  var socket_io_parser_1 = require_cjs3();
  var debugModule = require_src();
  var url = import.meta.require("url");
  var debug = debugModule("socket.io:client");

  class Client {
    constructor(server, conn) {
      this.sockets = new Map;
      this.nsps = new Map;
      this.server = server;
      this.conn = conn;
      this.encoder = server.encoder;
      this.decoder = new server._parser.Decoder;
      this.id = conn.id;
      this.setup();
    }
    get request() {
      return this.conn.request;
    }
    setup() {
      this.onclose = this.onclose.bind(this);
      this.ondata = this.ondata.bind(this);
      this.onerror = this.onerror.bind(this);
      this.ondecoded = this.ondecoded.bind(this);
      this.decoder.on("decoded", this.ondecoded);
      this.conn.on("data", this.ondata);
      this.conn.on("error", this.onerror);
      this.conn.on("close", this.onclose);
      this.connectTimeout = setTimeout(() => {
        if (this.nsps.size === 0) {
          debug("no namespace joined yet, close the client");
          this.close();
        } else {
          debug("the client has already joined a namespace, nothing to do");
        }
      }, this.server._connectTimeout);
    }
    connect(name, auth = {}) {
      if (this.server._nsps.has(name)) {
        debug("connecting to namespace %s", name);
        return this.doConnect(name, auth);
      }
      this.server._checkNamespace(name, auth, (dynamicNspName) => {
        if (dynamicNspName) {
          this.doConnect(name, auth);
        } else {
          debug("creation of namespace %s was denied", name);
          this._packet({
            type: socket_io_parser_1.PacketType.CONNECT_ERROR,
            nsp: name,
            data: {
              message: "Invalid namespace"
            }
          });
        }
      });
    }
    doConnect(name, auth) {
      const nsp = this.server.of(name);
      nsp._add(this, auth, (socket) => {
        this.sockets.set(socket.id, socket);
        this.nsps.set(nsp.name, socket);
        if (this.connectTimeout) {
          clearTimeout(this.connectTimeout);
          this.connectTimeout = undefined;
        }
      });
    }
    _disconnect() {
      for (const socket of this.sockets.values()) {
        socket.disconnect();
      }
      this.sockets.clear();
      this.close();
    }
    _remove(socket) {
      if (this.sockets.has(socket.id)) {
        const nsp = this.sockets.get(socket.id).nsp.name;
        this.sockets.delete(socket.id);
        this.nsps.delete(nsp);
      } else {
        debug("ignoring remove for %s", socket.id);
      }
    }
    close() {
      if (this.conn.readyState === "open") {
        debug("forcing transport close");
        this.conn.close();
        this.onclose("forced server close");
      }
    }
    _packet(packet, opts = {}) {
      if (this.conn.readyState !== "open") {
        debug("ignoring packet write %j", packet);
        return;
      }
      const encodedPackets = opts.preEncoded ? packet : this.encoder.encode(packet);
      this.writeToEngine(encodedPackets, opts);
    }
    writeToEngine(encodedPackets, opts) {
      if (opts.volatile && !this.conn.transport.writable) {
        debug("volatile packet is discarded since the transport is not currently writable");
        return;
      }
      const packets = Array.isArray(encodedPackets) ? encodedPackets : [encodedPackets];
      for (const encodedPacket of packets) {
        this.conn.write(encodedPacket, opts);
      }
    }
    ondata(data) {
      try {
        this.decoder.add(data);
      } catch (e2) {
        debug("invalid packet format");
        this.onerror(e2);
      }
    }
    ondecoded(packet) {
      let namespace;
      let authPayload;
      if (this.conn.protocol === 3) {
        const parsed = url.parse(packet.nsp, true);
        namespace = parsed.pathname;
        authPayload = parsed.query;
      } else {
        namespace = packet.nsp;
        authPayload = packet.data;
      }
      const socket = this.nsps.get(namespace);
      if (!socket && packet.type === socket_io_parser_1.PacketType.CONNECT) {
        this.connect(namespace, authPayload);
      } else if (socket && packet.type !== socket_io_parser_1.PacketType.CONNECT && packet.type !== socket_io_parser_1.PacketType.CONNECT_ERROR) {
        process.nextTick(function() {
          socket._onpacket(packet);
        });
      } else {
        debug("invalid state (packet type: %s)", packet.type);
        this.close();
      }
    }
    onerror(err) {
      for (const socket of this.sockets.values()) {
        socket._onerror(err);
      }
      this.conn.close();
    }
    onclose(reason, description) {
      debug("client close with reason %s", reason);
      this.destroy();
      for (const socket of this.sockets.values()) {
        socket._onclose(reason, description);
      }
      this.sockets.clear();
      this.decoder.destroy();
    }
    destroy() {
      this.conn.removeListener("data", this.ondata);
      this.conn.removeListener("error", this.onerror);
      this.conn.removeListener("close", this.onclose);
      this.decoder.removeListener("decoded", this.ondecoded);
      if (this.connectTimeout) {
        clearTimeout(this.connectTimeout);
        this.connectTimeout = undefined;
      }
    }
  }
  exports.Client = Client;
});

// ../node_modules/socket.io/dist/typed-events.js
var require_typed_events = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.StrictEventEmitter = undefined;
  var events_1 = import.meta.require("events");

  class StrictEventEmitter extends events_1.EventEmitter {
    on(ev, listener) {
      return super.on(ev, listener);
    }
    once(ev, listener) {
      return super.once(ev, listener);
    }
    emit(ev, ...args) {
      return super.emit(ev, ...args);
    }
    emitReserved(ev, ...args) {
      return super.emit(ev, ...args);
    }
    emitUntyped(ev, ...args) {
      return super.emit(ev, ...args);
    }
    listeners(event) {
      return super.listeners(event);
    }
  }
  exports.StrictEventEmitter = StrictEventEmitter;
});

// ../node_modules/socket.io/dist/broadcast-operator.js
var require_broadcast_operator = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RemoteSocket = exports.BroadcastOperator = undefined;
  var socket_1 = require_socket2();
  var socket_io_parser_1 = require_cjs3();

  class BroadcastOperator {
    constructor(adapter, rooms = new Set, exceptRooms = new Set, flags = {}) {
      this.adapter = adapter;
      this.rooms = rooms;
      this.exceptRooms = exceptRooms;
      this.flags = flags;
    }
    to(room) {
      const rooms = new Set(this.rooms);
      if (Array.isArray(room)) {
        room.forEach((r2) => rooms.add(r2));
      } else {
        rooms.add(room);
      }
      return new BroadcastOperator(this.adapter, rooms, this.exceptRooms, this.flags);
    }
    in(room) {
      return this.to(room);
    }
    except(room) {
      const exceptRooms = new Set(this.exceptRooms);
      if (Array.isArray(room)) {
        room.forEach((r2) => exceptRooms.add(r2));
      } else {
        exceptRooms.add(room);
      }
      return new BroadcastOperator(this.adapter, this.rooms, exceptRooms, this.flags);
    }
    compress(compress) {
      const flags = Object.assign({}, this.flags, { compress });
      return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    get volatile() {
      const flags = Object.assign({}, this.flags, { volatile: true });
      return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    get local() {
      const flags = Object.assign({}, this.flags, { local: true });
      return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    timeout(timeout) {
      const flags = Object.assign({}, this.flags, { timeout });
      return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    emit(ev, ...args) {
      if (socket_1.RESERVED_EVENTS.has(ev)) {
        throw new Error(`"${String(ev)}" is a reserved event name`);
      }
      const data = [ev, ...args];
      const packet = {
        type: socket_io_parser_1.PacketType.EVENT,
        data
      };
      const withAck = typeof data[data.length - 1] === "function";
      if (!withAck) {
        this.adapter.broadcast(packet, {
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        });
        return true;
      }
      const ack = data.pop();
      let timedOut = false;
      let responses = [];
      const timer = setTimeout(() => {
        timedOut = true;
        ack.apply(this, [
          new Error("operation has timed out"),
          this.flags.expectSingleResponse ? null : responses
        ]);
      }, this.flags.timeout);
      let expectedServerCount = -1;
      let actualServerCount = 0;
      let expectedClientCount = 0;
      const checkCompleteness = () => {
        if (!timedOut && expectedServerCount === actualServerCount && responses.length === expectedClientCount) {
          clearTimeout(timer);
          ack.apply(this, [
            null,
            this.flags.expectSingleResponse ? responses[0] : responses
          ]);
        }
      };
      this.adapter.broadcastWithAck(packet, {
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, (clientCount) => {
        expectedClientCount += clientCount;
        actualServerCount++;
        checkCompleteness();
      }, (clientResponse) => {
        responses.push(clientResponse);
        checkCompleteness();
      });
      this.adapter.serverCount().then((serverCount) => {
        expectedServerCount = serverCount;
        checkCompleteness();
      });
      return true;
    }
    emitWithAck(ev, ...args) {
      return new Promise((resolve, reject) => {
        args.push((err, responses) => {
          if (err) {
            err.responses = responses;
            return reject(err);
          } else {
            return resolve(responses);
          }
        });
        this.emit(ev, ...args);
      });
    }
    allSockets() {
      if (!this.adapter) {
        throw new Error("No adapter for this namespace, are you trying to get the list of clients of a dynamic namespace?");
      }
      return this.adapter.sockets(this.rooms);
    }
    fetchSockets() {
      return this.adapter.fetchSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }).then((sockets) => {
        return sockets.map((socket) => {
          if (socket instanceof socket_1.Socket) {
            return socket;
          } else {
            return new RemoteSocket(this.adapter, socket);
          }
        });
      });
    }
    socketsJoin(room) {
      this.adapter.addSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, Array.isArray(room) ? room : [room]);
    }
    socketsLeave(room) {
      this.adapter.delSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, Array.isArray(room) ? room : [room]);
    }
    disconnectSockets(close = false) {
      this.adapter.disconnectSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, close);
    }
  }
  exports.BroadcastOperator = BroadcastOperator;

  class RemoteSocket {
    constructor(adapter, details) {
      this.id = details.id;
      this.handshake = details.handshake;
      this.rooms = new Set(details.rooms);
      this.data = details.data;
      this.operator = new BroadcastOperator(adapter, new Set([this.id]), new Set, {
        expectSingleResponse: true
      });
    }
    timeout(timeout) {
      return this.operator.timeout(timeout);
    }
    emit(ev, ...args) {
      return this.operator.emit(ev, ...args);
    }
    join(room) {
      return this.operator.socketsJoin(room);
    }
    leave(room) {
      return this.operator.socketsLeave(room);
    }
    disconnect(close = false) {
      this.operator.disconnectSockets(close);
      return this;
    }
  }
  exports.RemoteSocket = RemoteSocket;
});

// ../node_modules/socket.io/dist/socket.js
var require_socket2 = __commonJS((exports) => {
  var noop = function() {
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Socket = exports.RESERVED_EVENTS = undefined;
  var socket_io_parser_1 = require_cjs3();
  var debug_1 = __importDefault(require_src());
  var typed_events_1 = require_typed_events();
  var base64id_1 = __importDefault(require_base64id());
  var broadcast_operator_1 = require_broadcast_operator();
  var debug = (0, debug_1.default)("socket.io:socket");
  var RECOVERABLE_DISCONNECT_REASONS = new Set([
    "transport error",
    "transport close",
    "forced close",
    "ping timeout",
    "server shutting down",
    "forced server close"
  ]);
  exports.RESERVED_EVENTS = new Set([
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
  ]);

  class Socket extends typed_events_1.StrictEventEmitter {
    constructor(nsp, client, auth, previousSession) {
      super();
      this.nsp = nsp;
      this.client = client;
      this.recovered = false;
      this.data = {};
      this.connected = false;
      this.acks = new Map;
      this.fns = [];
      this.flags = {};
      this.server = nsp.server;
      this.adapter = this.nsp.adapter;
      if (previousSession) {
        this.id = previousSession.sid;
        this.pid = previousSession.pid;
        previousSession.rooms.forEach((room) => this.join(room));
        this.data = previousSession.data;
        previousSession.missedPackets.forEach((packet) => {
          this.packet({
            type: socket_io_parser_1.PacketType.EVENT,
            data: packet
          });
        });
        this.recovered = true;
      } else {
        if (client.conn.protocol === 3) {
          this.id = nsp.name !== "/" ? nsp.name + "#" + client.id : client.id;
        } else {
          this.id = base64id_1.default.generateId();
        }
        if (this.server._opts.connectionStateRecovery) {
          this.pid = base64id_1.default.generateId();
        }
      }
      this.handshake = this.buildHandshake(auth);
      this.on("error", noop);
    }
    buildHandshake(auth) {
      var _a, _b, _c, _d;
      return {
        headers: ((_a = this.request) === null || _a === undefined ? undefined : _a.headers) || {},
        time: new Date + "",
        address: this.conn.remoteAddress,
        xdomain: !!((_b = this.request) === null || _b === undefined ? undefined : _b.headers.origin),
        secure: !this.request || !!this.request.connection.encrypted,
        issued: +new Date,
        url: (_c = this.request) === null || _c === undefined ? undefined : _c.url,
        query: ((_d = this.request) === null || _d === undefined ? undefined : _d._query) || {},
        auth
      };
    }
    emit(ev, ...args) {
      if (exports.RESERVED_EVENTS.has(ev)) {
        throw new Error(`"${String(ev)}" is a reserved event name`);
      }
      const data = [ev, ...args];
      const packet = {
        type: socket_io_parser_1.PacketType.EVENT,
        data
      };
      if (typeof data[data.length - 1] === "function") {
        const id = this.nsp._ids++;
        debug("emitting packet with ack id %d", id);
        this.registerAckCallback(id, data.pop());
        packet.id = id;
      }
      const flags = Object.assign({}, this.flags);
      this.flags = {};
      if (this.nsp.server.opts.connectionStateRecovery) {
        this.adapter.broadcast(packet, {
          rooms: new Set([this.id]),
          except: new Set,
          flags
        });
      } else {
        this.notifyOutgoingListeners(packet);
        this.packet(packet, flags);
      }
      return true;
    }
    emitWithAck(ev, ...args) {
      const withErr = this.flags.timeout !== undefined;
      return new Promise((resolve, reject) => {
        args.push((arg1, arg2) => {
          if (withErr) {
            return arg1 ? reject(arg1) : resolve(arg2);
          } else {
            return resolve(arg1);
          }
        });
        this.emit(ev, ...args);
      });
    }
    registerAckCallback(id, ack) {
      const timeout = this.flags.timeout;
      if (timeout === undefined) {
        this.acks.set(id, ack);
        return;
      }
      const timer = setTimeout(() => {
        debug("event with ack id %d has timed out after %d ms", id, timeout);
        this.acks.delete(id);
        ack.call(this, new Error("operation has timed out"));
      }, timeout);
      this.acks.set(id, (...args) => {
        clearTimeout(timer);
        ack.apply(this, [null, ...args]);
      });
    }
    to(room) {
      return this.newBroadcastOperator().to(room);
    }
    in(room) {
      return this.newBroadcastOperator().in(room);
    }
    except(room) {
      return this.newBroadcastOperator().except(room);
    }
    send(...args) {
      this.emit("message", ...args);
      return this;
    }
    write(...args) {
      this.emit("message", ...args);
      return this;
    }
    packet(packet, opts = {}) {
      packet.nsp = this.nsp.name;
      opts.compress = opts.compress !== false;
      this.client._packet(packet, opts);
    }
    join(rooms) {
      debug("join room %s", rooms);
      return this.adapter.addAll(this.id, new Set(Array.isArray(rooms) ? rooms : [rooms]));
    }
    leave(room) {
      debug("leave room %s", room);
      return this.adapter.del(this.id, room);
    }
    leaveAll() {
      this.adapter.delAll(this.id);
    }
    _onconnect() {
      debug("socket connected - writing packet");
      this.connected = true;
      this.join(this.id);
      if (this.conn.protocol === 3) {
        this.packet({ type: socket_io_parser_1.PacketType.CONNECT });
      } else {
        this.packet({
          type: socket_io_parser_1.PacketType.CONNECT,
          data: { sid: this.id, pid: this.pid }
        });
      }
    }
    _onpacket(packet) {
      debug("got packet %j", packet);
      switch (packet.type) {
        case socket_io_parser_1.PacketType.EVENT:
          this.onevent(packet);
          break;
        case socket_io_parser_1.PacketType.BINARY_EVENT:
          this.onevent(packet);
          break;
        case socket_io_parser_1.PacketType.ACK:
          this.onack(packet);
          break;
        case socket_io_parser_1.PacketType.BINARY_ACK:
          this.onack(packet);
          break;
        case socket_io_parser_1.PacketType.DISCONNECT:
          this.ondisconnect();
          break;
      }
    }
    onevent(packet) {
      const args = packet.data || [];
      debug("emitting event %j", args);
      if (packet.id != null) {
        debug("attaching ack callback to event");
        args.push(this.ack(packet.id));
      }
      if (this._anyListeners && this._anyListeners.length) {
        const listeners = this._anyListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, args);
        }
      }
      this.dispatch(args);
    }
    ack(id) {
      const self2 = this;
      let sent = false;
      return function() {
        if (sent)
          return;
        const args = Array.prototype.slice.call(arguments);
        debug("sending ack %j", args);
        self2.packet({
          id,
          type: socket_io_parser_1.PacketType.ACK,
          data: args
        });
        sent = true;
      };
    }
    onack(packet) {
      const ack = this.acks.get(packet.id);
      if (typeof ack == "function") {
        debug("calling ack %s with %j", packet.id, packet.data);
        ack.apply(this, packet.data);
        this.acks.delete(packet.id);
      } else {
        debug("bad ack %s", packet.id);
      }
    }
    ondisconnect() {
      debug("got disconnect packet");
      this._onclose("client namespace disconnect");
    }
    _onerror(err) {
      this.emitReserved("error", err);
    }
    _onclose(reason, description) {
      if (!this.connected)
        return this;
      debug("closing socket - reason %s", reason);
      this.emitReserved("disconnecting", reason, description);
      if (this.server._opts.connectionStateRecovery && RECOVERABLE_DISCONNECT_REASONS.has(reason)) {
        debug("connection state recovery is enabled for sid %s", this.id);
        this.adapter.persistSession({
          sid: this.id,
          pid: this.pid,
          rooms: [...this.rooms],
          data: this.data
        });
      }
      this._cleanup();
      this.client._remove(this);
      this.connected = false;
      this.emitReserved("disconnect", reason, description);
      return;
    }
    _cleanup() {
      this.leaveAll();
      this.nsp._remove(this);
      this.join = noop;
    }
    _error(err) {
      this.packet({ type: socket_io_parser_1.PacketType.CONNECT_ERROR, data: err });
    }
    disconnect(close = false) {
      if (!this.connected)
        return this;
      if (close) {
        this.client._disconnect();
      } else {
        this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        this._onclose("server namespace disconnect");
      }
      return this;
    }
    compress(compress) {
      this.flags.compress = compress;
      return this;
    }
    get volatile() {
      this.flags.volatile = true;
      return this;
    }
    get broadcast() {
      return this.newBroadcastOperator();
    }
    get local() {
      return this.newBroadcastOperator().local;
    }
    timeout(timeout) {
      this.flags.timeout = timeout;
      return this;
    }
    dispatch(event) {
      debug("dispatching an event %j", event);
      this.run(event, (err) => {
        process.nextTick(() => {
          if (err) {
            return this._onerror(err);
          }
          if (this.connected) {
            super.emitUntyped.apply(this, event);
          } else {
            debug("ignore packet received after disconnection");
          }
        });
      });
    }
    use(fn) {
      this.fns.push(fn);
      return this;
    }
    run(event, fn) {
      const fns = this.fns.slice(0);
      if (!fns.length)
        return fn(null);
      function run(i) {
        fns[i](event, function(err) {
          if (err)
            return fn(err);
          if (!fns[i + 1])
            return fn(null);
          run(i + 1);
        });
      }
      run(0);
    }
    get disconnected() {
      return !this.connected;
    }
    get request() {
      return this.client.request;
    }
    get conn() {
      return this.client.conn;
    }
    get rooms() {
      return this.adapter.socketRooms(this.id) || new Set;
    }
    onAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.push(listener);
      return this;
    }
    prependAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.unshift(listener);
      return this;
    }
    offAny(listener) {
      if (!this._anyListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyListeners;
        for (let i = 0;i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
            return this;
          }
        }
      } else {
        this._anyListeners = [];
      }
      return this;
    }
    listenersAny() {
      return this._anyListeners || [];
    }
    onAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.push(listener);
      return this;
    }
    prependAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.unshift(listener);
      return this;
    }
    offAnyOutgoing(listener) {
      if (!this._anyOutgoingListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyOutgoingListeners;
        for (let i = 0;i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
            return this;
          }
        }
      } else {
        this._anyOutgoingListeners = [];
      }
      return this;
    }
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    notifyOutgoingListeners(packet) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const listeners = this._anyOutgoingListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, packet.data);
        }
      }
    }
    newBroadcastOperator() {
      const flags = Object.assign({}, this.flags);
      this.flags = {};
      return new broadcast_operator_1.BroadcastOperator(this.adapter, new Set, new Set([this.id]), flags);
    }
  }
  exports.Socket = Socket;
});

// ../node_modules/socket.io/dist/namespace.js
var require_namespace = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Namespace = exports.RESERVED_EVENTS = undefined;
  var socket_1 = require_socket2();
  var typed_events_1 = require_typed_events();
  var debug_1 = __importDefault(require_src());
  var broadcast_operator_1 = require_broadcast_operator();
  var debug = (0, debug_1.default)("socket.io:namespace");
  exports.RESERVED_EVENTS = new Set(["connect", "connection", "new_namespace"]);

  class Namespace extends typed_events_1.StrictEventEmitter {
    constructor(server, name) {
      super();
      this.sockets = new Map;
      this._fns = [];
      this._ids = 0;
      this.server = server;
      this.name = name;
      this._initAdapter();
    }
    _initAdapter() {
      this.adapter = new (this.server.adapter())(this);
    }
    use(fn) {
      this._fns.push(fn);
      return this;
    }
    run(socket, fn) {
      const fns = this._fns.slice(0);
      if (!fns.length)
        return fn(null);
      function run(i) {
        fns[i](socket, function(err) {
          if (err)
            return fn(err);
          if (!fns[i + 1])
            return fn(null);
          run(i + 1);
        });
      }
      run(0);
    }
    to(room) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).to(room);
    }
    in(room) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).in(room);
    }
    except(room) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).except(room);
    }
    async _add(client, auth, fn) {
      var _a;
      debug("adding socket to nsp %s", this.name);
      const socket = await this._createSocket(client, auth);
      if (((_a = this.server.opts.connectionStateRecovery) === null || _a === undefined ? undefined : _a.skipMiddlewares) && socket.recovered && client.conn.readyState === "open") {
        return this._doConnect(socket, fn);
      }
      this.run(socket, (err) => {
        process.nextTick(() => {
          if (client.conn.readyState !== "open") {
            debug("next called after client was closed - ignoring socket");
            socket._cleanup();
            return;
          }
          if (err) {
            debug("middleware error, sending CONNECT_ERROR packet to the client");
            socket._cleanup();
            if (client.conn.protocol === 3) {
              return socket._error(err.data || err.message);
            } else {
              return socket._error({
                message: err.message,
                data: err.data
              });
            }
          }
          this._doConnect(socket, fn);
        });
      });
    }
    async _createSocket(client, auth) {
      const sessionId = auth.pid;
      const offset = auth.offset;
      if (this.server.opts.connectionStateRecovery && typeof sessionId === "string" && typeof offset === "string") {
        let session;
        try {
          session = await this.adapter.restoreSession(sessionId, offset);
        } catch (e2) {
          debug("error while restoring session: %s", e2);
        }
        if (session) {
          debug("connection state recovered for sid %s", session.sid);
          return new socket_1.Socket(this, client, auth, session);
        }
      }
      return new socket_1.Socket(this, client, auth);
    }
    _doConnect(socket, fn) {
      this.sockets.set(socket.id, socket);
      socket._onconnect();
      if (fn)
        fn(socket);
      this.emitReserved("connect", socket);
      this.emitReserved("connection", socket);
    }
    _remove(socket) {
      if (this.sockets.has(socket.id)) {
        this.sockets.delete(socket.id);
      } else {
        debug("ignoring remove for %s", socket.id);
      }
    }
    emit(ev, ...args) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).emit(ev, ...args);
    }
    send(...args) {
      this.emit("message", ...args);
      return this;
    }
    write(...args) {
      this.emit("message", ...args);
      return this;
    }
    serverSideEmit(ev, ...args) {
      if (exports.RESERVED_EVENTS.has(ev)) {
        throw new Error(`"${String(ev)}" is a reserved event name`);
      }
      args.unshift(ev);
      this.adapter.serverSideEmit(args);
      return true;
    }
    serverSideEmitWithAck(ev, ...args) {
      return new Promise((resolve, reject) => {
        args.push((err, responses) => {
          if (err) {
            err.responses = responses;
            return reject(err);
          } else {
            return resolve(responses);
          }
        });
        this.serverSideEmit(ev, ...args);
      });
    }
    _onServerSideEmit(args) {
      super.emitUntyped.apply(this, args);
    }
    allSockets() {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).allSockets();
    }
    compress(compress) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).compress(compress);
    }
    get volatile() {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).volatile;
    }
    get local() {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).local;
    }
    timeout(timeout) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).timeout(timeout);
    }
    fetchSockets() {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).fetchSockets();
    }
    socketsJoin(room) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsJoin(room);
    }
    socketsLeave(room) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsLeave(room);
    }
    disconnectSockets(close = false) {
      return new broadcast_operator_1.BroadcastOperator(this.adapter).disconnectSockets(close);
    }
  }
  exports.Namespace = Namespace;
});

// ../node_modules/socket.io-adapter/dist/contrib/yeast.js
var require_yeast = __commonJS((exports) => {
  var encode3 = function(num) {
    let encoded = "";
    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
  };
  var decode3 = function(str) {
    let decoded = 0;
    for (i = 0;i < str.length; i++) {
      decoded = decoded * length + map3[str.charAt(i)];
    }
    return decoded;
  };
  var yeast = function() {
    const now = encode3(+new Date);
    if (now !== prev)
      return seed = 0, prev = now;
    return now + "." + encode3(seed++);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.yeast = exports.decode = exports.encode = undefined;
  var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
  var length = 64;
  var map3 = {};
  var seed = 0;
  var i = 0;
  var prev;
  exports.encode = encode3;
  exports.decode = decode3;
  exports.yeast = yeast;
  for (;i < length; i++)
    map3[alphabet[i]] = i;
});

// ../node_modules/socket.io-adapter/dist/in-memory-adapter.js
var require_in_memory_adapter = __commonJS((exports) => {
  var shouldIncludePacket = function(sessionRooms, opts) {
    const included = opts.rooms.size === 0 || sessionRooms.some((room) => opts.rooms.has(room));
    const notExcluded = sessionRooms.every((room) => !opts.except.has(room));
    return included && notExcluded;
  };
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SessionAwareAdapter = exports.Adapter = undefined;
  var events_1 = import.meta.require("events");
  var yeast_1 = require_yeast();
  var WebSocket = import.meta.require("ws");
  var canPreComputeFrame = typeof ((_a = WebSocket === null || WebSocket === undefined ? undefined : WebSocket.Sender) === null || _a === undefined ? undefined : _a.frame) === "function";

  class Adapter extends events_1.EventEmitter {
    constructor(nsp) {
      super();
      this.nsp = nsp;
      this.rooms = new Map;
      this.sids = new Map;
      this.encoder = nsp.server.encoder;
    }
    init() {
    }
    close() {
    }
    serverCount() {
      return Promise.resolve(1);
    }
    addAll(id, rooms) {
      if (!this.sids.has(id)) {
        this.sids.set(id, new Set);
      }
      for (const room of rooms) {
        this.sids.get(id).add(room);
        if (!this.rooms.has(room)) {
          this.rooms.set(room, new Set);
          this.emit("create-room", room);
        }
        if (!this.rooms.get(room).has(id)) {
          this.rooms.get(room).add(id);
          this.emit("join-room", room, id);
        }
      }
    }
    del(id, room) {
      if (this.sids.has(id)) {
        this.sids.get(id).delete(room);
      }
      this._del(room, id);
    }
    _del(room, id) {
      const _room = this.rooms.get(room);
      if (_room != null) {
        const deleted = _room.delete(id);
        if (deleted) {
          this.emit("leave-room", room, id);
        }
        if (_room.size === 0 && this.rooms.delete(room)) {
          this.emit("delete-room", room);
        }
      }
    }
    delAll(id) {
      if (!this.sids.has(id)) {
        return;
      }
      for (const room of this.sids.get(id)) {
        this._del(room, id);
      }
      this.sids.delete(id);
    }
    broadcast(packet, opts) {
      const flags = opts.flags || {};
      const packetOpts = {
        preEncoded: true,
        volatile: flags.volatile,
        compress: flags.compress
      };
      packet.nsp = this.nsp.name;
      const encodedPackets = this._encode(packet, packetOpts);
      this.apply(opts, (socket) => {
        if (typeof socket.notifyOutgoingListeners === "function") {
          socket.notifyOutgoingListeners(packet);
        }
        socket.client.writeToEngine(encodedPackets, packetOpts);
      });
    }
    broadcastWithAck(packet, opts, clientCountCallback, ack) {
      const flags = opts.flags || {};
      const packetOpts = {
        preEncoded: true,
        volatile: flags.volatile,
        compress: flags.compress
      };
      packet.nsp = this.nsp.name;
      packet.id = this.nsp._ids++;
      const encodedPackets = this._encode(packet, packetOpts);
      let clientCount = 0;
      this.apply(opts, (socket) => {
        clientCount++;
        socket.acks.set(packet.id, ack);
        if (typeof socket.notifyOutgoingListeners === "function") {
          socket.notifyOutgoingListeners(packet);
        }
        socket.client.writeToEngine(encodedPackets, packetOpts);
      });
      clientCountCallback(clientCount);
    }
    _encode(packet, packetOpts) {
      const encodedPackets = this.encoder.encode(packet);
      if (canPreComputeFrame && encodedPackets.length === 1 && typeof encodedPackets[0] === "string") {
        const data = Buffer.from("4" + encodedPackets[0]);
        packetOpts.wsPreEncodedFrame = WebSocket.Sender.frame(data, {
          readOnly: false,
          mask: false,
          rsv1: false,
          opcode: 1,
          fin: true
        });
      }
      return encodedPackets;
    }
    sockets(rooms) {
      const sids = new Set;
      this.apply({ rooms }, (socket) => {
        sids.add(socket.id);
      });
      return Promise.resolve(sids);
    }
    socketRooms(id) {
      return this.sids.get(id);
    }
    fetchSockets(opts) {
      const sockets = [];
      this.apply(opts, (socket) => {
        sockets.push(socket);
      });
      return Promise.resolve(sockets);
    }
    addSockets(opts, rooms) {
      this.apply(opts, (socket) => {
        socket.join(rooms);
      });
    }
    delSockets(opts, rooms) {
      this.apply(opts, (socket) => {
        rooms.forEach((room) => socket.leave(room));
      });
    }
    disconnectSockets(opts, close) {
      this.apply(opts, (socket) => {
        socket.disconnect(close);
      });
    }
    apply(opts, callback) {
      const rooms = opts.rooms;
      const except = this.computeExceptSids(opts.except);
      if (rooms.size) {
        const ids = new Set;
        for (const room of rooms) {
          if (!this.rooms.has(room))
            continue;
          for (const id of this.rooms.get(room)) {
            if (ids.has(id) || except.has(id))
              continue;
            const socket = this.nsp.sockets.get(id);
            if (socket) {
              callback(socket);
              ids.add(id);
            }
          }
        }
      } else {
        for (const [id] of this.sids) {
          if (except.has(id))
            continue;
          const socket = this.nsp.sockets.get(id);
          if (socket)
            callback(socket);
        }
      }
    }
    computeExceptSids(exceptRooms) {
      const exceptSids = new Set;
      if (exceptRooms && exceptRooms.size > 0) {
        for (const room of exceptRooms) {
          if (this.rooms.has(room)) {
            this.rooms.get(room).forEach((sid) => exceptSids.add(sid));
          }
        }
      }
      return exceptSids;
    }
    serverSideEmit(packet) {
      console.warn("this adapter does not support the serverSideEmit() functionality");
    }
    persistSession(session) {
    }
    restoreSession(pid, offset) {
      return null;
    }
  }
  exports.Adapter = Adapter;

  class SessionAwareAdapter extends Adapter {
    constructor(nsp) {
      super(nsp);
      this.nsp = nsp;
      this.sessions = new Map;
      this.packets = [];
      this.maxDisconnectionDuration = nsp.server.opts.connectionStateRecovery.maxDisconnectionDuration;
      const timer = setInterval(() => {
        const threshold = Date.now() - this.maxDisconnectionDuration;
        this.sessions.forEach((session, sessionId) => {
          const hasExpired = session.disconnectedAt < threshold;
          if (hasExpired) {
            this.sessions.delete(sessionId);
          }
        });
        for (let i = this.packets.length - 1;i >= 0; i--) {
          const hasExpired = this.packets[i].emittedAt < threshold;
          if (hasExpired) {
            this.packets.splice(0, i + 1);
            break;
          }
        }
      }, 60 * 1000);
      timer.unref();
    }
    persistSession(session) {
      session.disconnectedAt = Date.now();
      this.sessions.set(session.pid, session);
    }
    restoreSession(pid, offset) {
      const session = this.sessions.get(pid);
      if (!session) {
        return null;
      }
      const hasExpired = session.disconnectedAt + this.maxDisconnectionDuration < Date.now();
      if (hasExpired) {
        this.sessions.delete(pid);
        return null;
      }
      const index = this.packets.findIndex((packet) => packet.id === offset);
      if (index === -1) {
        return null;
      }
      const missedPackets = [];
      for (let i = index + 1;i < this.packets.length; i++) {
        const packet = this.packets[i];
        if (shouldIncludePacket(session.rooms, packet.opts)) {
          missedPackets.push(packet.data);
        }
      }
      return Promise.resolve(Object.assign(Object.assign({}, session), { missedPackets }));
    }
    broadcast(packet, opts) {
      var _a2;
      const isEventPacket = packet.type === 2;
      const withoutAcknowledgement = packet.id === undefined;
      const notVolatile = ((_a2 = opts.flags) === null || _a2 === undefined ? undefined : _a2.volatile) === undefined;
      if (isEventPacket && withoutAcknowledgement && notVolatile) {
        const id = (0, yeast_1.yeast)();
        packet.data.push(id);
        this.packets.push({
          id,
          opts,
          data: packet.data,
          emittedAt: Date.now()
        });
      }
      super.broadcast(packet, opts);
    }
  }
  exports.SessionAwareAdapter = SessionAwareAdapter;
});

// ../node_modules/socket.io-adapter/dist/cluster-adapter.js
var require_cluster_adapter = __commonJS((exports) => {
  var randomId = function() {
    return (0, crypto_1.randomBytes)(8).toString("hex");
  };
  var encodeOptions = function(opts) {
    return {
      rooms: [...opts.rooms],
      except: [...opts.except],
      flags: opts.flags
    };
  };
  var decodeOptions = function(opts) {
    return {
      rooms: new Set(opts.rooms),
      except: new Set(opts.except),
      flags: opts.flags
    };
  };
  var __rest = exports && exports.__rest || function(s, e2) {
    var t3 = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0)
        t3[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
        if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t3[p[i]] = s[p[i]];
      }
    return t3;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ClusterAdapterWithHeartbeat = exports.ClusterAdapter = exports.MessageType = undefined;
  var in_memory_adapter_1 = require_in_memory_adapter();
  var debug_1 = require_src();
  var crypto_1 = import.meta.require("crypto");
  var debug = (0, debug_1.debug)("socket.io-adapter");
  var EMITTER_UID = "emitter";
  var DEFAULT_TIMEOUT = 5000;
  var MessageType;
  (function(MessageType2) {
    MessageType2[MessageType2["INITIAL_HEARTBEAT"] = 1] = "INITIAL_HEARTBEAT";
    MessageType2[MessageType2["HEARTBEAT"] = 2] = "HEARTBEAT";
    MessageType2[MessageType2["BROADCAST"] = 3] = "BROADCAST";
    MessageType2[MessageType2["SOCKETS_JOIN"] = 4] = "SOCKETS_JOIN";
    MessageType2[MessageType2["SOCKETS_LEAVE"] = 5] = "SOCKETS_LEAVE";
    MessageType2[MessageType2["DISCONNECT_SOCKETS"] = 6] = "DISCONNECT_SOCKETS";
    MessageType2[MessageType2["FETCH_SOCKETS"] = 7] = "FETCH_SOCKETS";
    MessageType2[MessageType2["FETCH_SOCKETS_RESPONSE"] = 8] = "FETCH_SOCKETS_RESPONSE";
    MessageType2[MessageType2["SERVER_SIDE_EMIT"] = 9] = "SERVER_SIDE_EMIT";
    MessageType2[MessageType2["SERVER_SIDE_EMIT_RESPONSE"] = 10] = "SERVER_SIDE_EMIT_RESPONSE";
    MessageType2[MessageType2["BROADCAST_CLIENT_COUNT"] = 11] = "BROADCAST_CLIENT_COUNT";
    MessageType2[MessageType2["BROADCAST_ACK"] = 12] = "BROADCAST_ACK";
    MessageType2[MessageType2["ADAPTER_CLOSE"] = 13] = "ADAPTER_CLOSE";
  })(MessageType = exports.MessageType || (exports.MessageType = {}));

  class ClusterAdapter extends in_memory_adapter_1.Adapter {
    constructor(nsp) {
      super(nsp);
      this.requests = new Map;
      this.ackRequests = new Map;
      this.uid = randomId();
    }
    onMessage(message, offset) {
      if (message.uid === this.uid) {
        return debug("[%s] ignore message from self", this.uid);
      }
      debug("[%s] new event of type %d from %s", this.uid, message.type, message.uid);
      switch (message.type) {
        case MessageType.BROADCAST: {
          const withAck = message.data.requestId !== undefined;
          if (withAck) {
            super.broadcastWithAck(message.data.packet, decodeOptions(message.data.opts), (clientCount) => {
              debug("[%s] waiting for %d client acknowledgements", this.uid, clientCount);
              this.publishResponse(message.uid, {
                type: MessageType.BROADCAST_CLIENT_COUNT,
                data: {
                  requestId: message.data.requestId,
                  clientCount
                }
              });
            }, (arg) => {
              debug("[%s] received acknowledgement with value %j", this.uid, arg);
              this.publishResponse(message.uid, {
                type: MessageType.BROADCAST_ACK,
                data: {
                  requestId: message.data.requestId,
                  packet: arg
                }
              });
            });
          } else {
            const packet = message.data.packet;
            const opts = decodeOptions(message.data.opts);
            this.addOffsetIfNecessary(packet, opts, offset);
            super.broadcast(packet, opts);
          }
          break;
        }
        case MessageType.SOCKETS_JOIN:
          super.addSockets(decodeOptions(message.data.opts), message.data.rooms);
          break;
        case MessageType.SOCKETS_LEAVE:
          super.delSockets(decodeOptions(message.data.opts), message.data.rooms);
          break;
        case MessageType.DISCONNECT_SOCKETS:
          super.disconnectSockets(decodeOptions(message.data.opts), message.data.close);
          break;
        case MessageType.FETCH_SOCKETS: {
          debug("[%s] calling fetchSockets with opts %j", this.uid, message.data.opts);
          super.fetchSockets(decodeOptions(message.data.opts)).then((localSockets) => {
            this.publishResponse(message.uid, {
              type: MessageType.FETCH_SOCKETS_RESPONSE,
              data: {
                requestId: message.data.requestId,
                sockets: localSockets.map((socket) => {
                  const _a = socket.handshake, { sessionStore } = _a, handshake = __rest(_a, ["sessionStore"]);
                  return {
                    id: socket.id,
                    handshake,
                    rooms: [...socket.rooms],
                    data: socket.data
                  };
                })
              }
            });
          });
          break;
        }
        case MessageType.SERVER_SIDE_EMIT: {
          const packet = message.data.packet;
          const withAck = message.data.requestId !== undefined;
          if (!withAck) {
            this.nsp._onServerSideEmit(packet);
            return;
          }
          let called = false;
          const callback = (arg) => {
            if (called) {
              return;
            }
            called = true;
            debug("[%s] calling acknowledgement with %j", this.uid, arg);
            this.publishResponse(message.uid, {
              type: MessageType.SERVER_SIDE_EMIT_RESPONSE,
              data: {
                requestId: message.data.requestId,
                packet: arg
              }
            });
          };
          this.nsp._onServerSideEmit([...packet, callback]);
          break;
        }
        case MessageType.BROADCAST_CLIENT_COUNT:
        case MessageType.BROADCAST_ACK:
        case MessageType.FETCH_SOCKETS_RESPONSE:
        case MessageType.SERVER_SIDE_EMIT_RESPONSE:
          this.onResponse(message);
          break;
        default:
          debug("[%s] unknown message type: %s", this.uid, message.type);
      }
    }
    onResponse(response) {
      var _a, _b;
      const requestId2 = response.data.requestId;
      debug("[%s] received response %s to request %s", this.uid, response.type, requestId2);
      switch (response.type) {
        case MessageType.BROADCAST_CLIENT_COUNT: {
          (_a = this.ackRequests.get(requestId2)) === null || _a === undefined || _a.clientCountCallback(response.data.clientCount);
          break;
        }
        case MessageType.BROADCAST_ACK: {
          (_b = this.ackRequests.get(requestId2)) === null || _b === undefined || _b.ack(response.data.packet);
          break;
        }
        case MessageType.FETCH_SOCKETS_RESPONSE: {
          const request = this.requests.get(requestId2);
          if (!request) {
            return;
          }
          request.current++;
          response.data.sockets.forEach((socket) => request.responses.push(socket));
          if (request.current === request.expected) {
            clearTimeout(request.timeout);
            request.resolve(request.responses);
            this.requests.delete(requestId2);
          }
          break;
        }
        case MessageType.SERVER_SIDE_EMIT_RESPONSE: {
          const request = this.requests.get(requestId2);
          if (!request) {
            return;
          }
          request.current++;
          request.responses.push(response.data.packet);
          if (request.current === request.expected) {
            clearTimeout(request.timeout);
            request.resolve(null, request.responses);
            this.requests.delete(requestId2);
          }
          break;
        }
        default:
          debug("[%s] unknown response type: %s", this.uid, response.type);
      }
    }
    async broadcast(packet, opts) {
      var _a;
      const onlyLocal = (_a = opts.flags) === null || _a === undefined ? undefined : _a.local;
      if (!onlyLocal) {
        try {
          const offset = await this.publishAndReturnOffset({
            type: MessageType.BROADCAST,
            data: {
              packet,
              opts: encodeOptions(opts)
            }
          });
          this.addOffsetIfNecessary(packet, opts, offset);
        } catch (e2) {
          return debug("[%s] error while broadcasting message: %s", this.uid, e2.message);
        }
      }
      super.broadcast(packet, opts);
    }
    addOffsetIfNecessary(packet, opts, offset) {
      var _a;
      if (!this.nsp.server.opts.connectionStateRecovery) {
        return;
      }
      const isEventPacket = packet.type === 2;
      const withoutAcknowledgement = packet.id === undefined;
      const notVolatile = ((_a = opts.flags) === null || _a === undefined ? undefined : _a.volatile) === undefined;
      if (isEventPacket && withoutAcknowledgement && notVolatile) {
        packet.data.push(offset);
      }
    }
    broadcastWithAck(packet, opts, clientCountCallback, ack) {
      var _a;
      const onlyLocal = (_a = opts === null || opts === undefined ? undefined : opts.flags) === null || _a === undefined ? undefined : _a.local;
      if (!onlyLocal) {
        const requestId2 = randomId();
        this.ackRequests.set(requestId2, {
          clientCountCallback,
          ack
        });
        this.publish({
          type: MessageType.BROADCAST,
          data: {
            packet,
            requestId: requestId2,
            opts: encodeOptions(opts)
          }
        });
        setTimeout(() => {
          this.ackRequests.delete(requestId2);
        }, opts.flags.timeout);
      }
      super.broadcastWithAck(packet, opts, clientCountCallback, ack);
    }
    async addSockets(opts, rooms) {
      var _a;
      const onlyLocal = (_a = opts.flags) === null || _a === undefined ? undefined : _a.local;
      if (!onlyLocal) {
        try {
          await this.publishAndReturnOffset({
            type: MessageType.SOCKETS_JOIN,
            data: {
              opts: encodeOptions(opts),
              rooms
            }
          });
        } catch (e2) {
          debug("[%s] error while publishing message: %s", this.uid, e2.message);
        }
      }
      super.addSockets(opts, rooms);
    }
    async delSockets(opts, rooms) {
      var _a;
      const onlyLocal = (_a = opts.flags) === null || _a === undefined ? undefined : _a.local;
      if (!onlyLocal) {
        try {
          await this.publishAndReturnOffset({
            type: MessageType.SOCKETS_LEAVE,
            data: {
              opts: encodeOptions(opts),
              rooms
            }
          });
        } catch (e2) {
          debug("[%s] error while publishing message: %s", this.uid, e2.message);
        }
      }
      super.delSockets(opts, rooms);
    }
    async disconnectSockets(opts, close) {
      var _a;
      const onlyLocal = (_a = opts.flags) === null || _a === undefined ? undefined : _a.local;
      if (!onlyLocal) {
        try {
          await this.publishAndReturnOffset({
            type: MessageType.DISCONNECT_SOCKETS,
            data: {
              opts: encodeOptions(opts),
              close
            }
          });
        } catch (e2) {
          debug("[%s] error while publishing message: %s", this.uid, e2.message);
        }
      }
      super.disconnectSockets(opts, close);
    }
    async fetchSockets(opts) {
      var _a;
      const [localSockets, serverCount] = await Promise.all([
        super.fetchSockets(opts),
        this.serverCount()
      ]);
      const expectedResponseCount = serverCount - 1;
      if (((_a = opts.flags) === null || _a === undefined ? undefined : _a.local) || expectedResponseCount <= 0) {
        return localSockets;
      }
      const requestId2 = randomId();
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          const storedRequest2 = this.requests.get(requestId2);
          if (storedRequest2) {
            reject(new Error(`timeout reached: only ${storedRequest2.current} responses received out of ${storedRequest2.expected}`));
            this.requests.delete(requestId2);
          }
        }, opts.flags.timeout || DEFAULT_TIMEOUT);
        const storedRequest = {
          type: MessageType.FETCH_SOCKETS,
          resolve,
          timeout,
          current: 0,
          expected: expectedResponseCount,
          responses: localSockets
        };
        this.requests.set(requestId2, storedRequest);
        this.publish({
          type: MessageType.FETCH_SOCKETS,
          data: {
            opts: encodeOptions(opts),
            requestId: requestId2
          }
        });
      });
    }
    async serverSideEmit(packet) {
      const withAck = typeof packet[packet.length - 1] === "function";
      if (!withAck) {
        return this.publish({
          type: MessageType.SERVER_SIDE_EMIT,
          data: {
            packet
          }
        });
      }
      const ack = packet.pop();
      const expectedResponseCount = await this.serverCount() - 1;
      debug('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, expectedResponseCount);
      if (expectedResponseCount <= 0) {
        return ack(null, []);
      }
      const requestId2 = randomId();
      const timeout = setTimeout(() => {
        const storedRequest2 = this.requests.get(requestId2);
        if (storedRequest2) {
          ack(new Error(`timeout reached: only ${storedRequest2.current} responses received out of ${storedRequest2.expected}`), storedRequest2.responses);
          this.requests.delete(requestId2);
        }
      }, DEFAULT_TIMEOUT);
      const storedRequest = {
        type: MessageType.SERVER_SIDE_EMIT,
        resolve: ack,
        timeout,
        current: 0,
        expected: expectedResponseCount,
        responses: []
      };
      this.requests.set(requestId2, storedRequest);
      this.publish({
        type: MessageType.SERVER_SIDE_EMIT,
        data: {
          requestId: requestId2,
          packet
        }
      });
    }
    publish(message) {
      this.publishAndReturnOffset(message).catch((err) => {
        debug("[%s] error while publishing message: %s", this.uid, err);
      });
    }
    publishAndReturnOffset(message) {
      message.uid = this.uid;
      message.nsp = this.nsp.name;
      return this.doPublish(message);
    }
    publishResponse(requesterUid, response) {
      response.uid = this.uid;
      response.nsp = this.nsp.name;
      this.doPublishResponse(requesterUid, response).catch((err) => {
        debug("[%s] error while publishing response: %s", this.uid, err);
      });
    }
  }
  exports.ClusterAdapter = ClusterAdapter;

  class ClusterAdapterWithHeartbeat extends ClusterAdapter {
    constructor(nsp, opts) {
      super(nsp);
      this.nodesMap = new Map;
      this.customRequests = new Map;
      this._opts = Object.assign({
        heartbeatInterval: 5000,
        heartbeatTimeout: 1e4
      }, opts);
      this.cleanupTimer = setInterval(() => {
        const now = Date.now();
        this.nodesMap.forEach((lastSeen, uid) => {
          const nodeSeemsDown = now - lastSeen > this._opts.heartbeatTimeout;
          if (nodeSeemsDown) {
            debug("[%s] node %s seems down", this.uid, uid);
            this.removeNode(uid);
          }
        });
      }, 1000);
    }
    init() {
      this.publish({
        type: MessageType.INITIAL_HEARTBEAT
      });
    }
    scheduleHeartbeat() {
      if (this.heartbeatTimer) {
        this.heartbeatTimer.refresh();
      } else {
        this.heartbeatTimer = setTimeout(() => {
          this.publish({
            type: MessageType.HEARTBEAT
          });
        }, this._opts.heartbeatInterval);
      }
    }
    close() {
      this.publish({
        type: MessageType.ADAPTER_CLOSE
      });
      clearTimeout(this.heartbeatTimer);
      if (this.cleanupTimer) {
        clearInterval(this.cleanupTimer);
      }
    }
    onMessage(message, offset) {
      if (message.uid === this.uid) {
        return debug("[%s] ignore message from self", this.uid);
      }
      if (message.uid && message.uid !== EMITTER_UID) {
        this.nodesMap.set(message.uid, Date.now());
      }
      debug("[%s] new event of type %d from %s", this.uid, message.type, message.uid);
      switch (message.type) {
        case MessageType.INITIAL_HEARTBEAT:
          this.publish({
            type: MessageType.HEARTBEAT
          });
          break;
        case MessageType.HEARTBEAT:
          break;
        case MessageType.ADAPTER_CLOSE:
          this.removeNode(message.uid);
          break;
        default:
          super.onMessage(message, offset);
      }
    }
    serverCount() {
      return Promise.resolve(1 + this.nodesMap.size);
    }
    publish(message) {
      this.scheduleHeartbeat();
      return super.publish(message);
    }
    async serverSideEmit(packet) {
      const withAck = typeof packet[packet.length - 1] === "function";
      if (!withAck) {
        return this.publish({
          type: MessageType.SERVER_SIDE_EMIT,
          data: {
            packet
          }
        });
      }
      const ack = packet.pop();
      const expectedResponseCount = this.nodesMap.size;
      debug('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, expectedResponseCount);
      if (expectedResponseCount <= 0) {
        return ack(null, []);
      }
      const requestId2 = randomId();
      const timeout = setTimeout(() => {
        const storedRequest2 = this.customRequests.get(requestId2);
        if (storedRequest2) {
          ack(new Error(`timeout reached: missing ${storedRequest2.missingUids.size} responses`), storedRequest2.responses);
          this.customRequests.delete(requestId2);
        }
      }, DEFAULT_TIMEOUT);
      const storedRequest = {
        type: MessageType.SERVER_SIDE_EMIT,
        resolve: ack,
        timeout,
        missingUids: new Set([...this.nodesMap.keys()]),
        responses: []
      };
      this.customRequests.set(requestId2, storedRequest);
      this.publish({
        type: MessageType.SERVER_SIDE_EMIT,
        data: {
          requestId: requestId2,
          packet
        }
      });
    }
    async fetchSockets(opts) {
      var _a;
      const [localSockets, serverCount] = await Promise.all([
        super.fetchSockets({
          rooms: opts.rooms,
          except: opts.except,
          flags: {
            local: true
          }
        }),
        this.serverCount()
      ]);
      const expectedResponseCount = serverCount - 1;
      if (((_a = opts.flags) === null || _a === undefined ? undefined : _a.local) || expectedResponseCount <= 0) {
        return localSockets;
      }
      const requestId2 = randomId();
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          const storedRequest2 = this.customRequests.get(requestId2);
          if (storedRequest2) {
            reject(new Error(`timeout reached: missing ${storedRequest2.missingUids.size} responses`));
            this.customRequests.delete(requestId2);
          }
        }, opts.flags.timeout || DEFAULT_TIMEOUT);
        const storedRequest = {
          type: MessageType.FETCH_SOCKETS,
          resolve,
          timeout,
          missingUids: new Set([...this.nodesMap.keys()]),
          responses: localSockets
        };
        this.customRequests.set(requestId2, storedRequest);
        this.publish({
          type: MessageType.FETCH_SOCKETS,
          data: {
            opts: encodeOptions(opts),
            requestId: requestId2
          }
        });
      });
    }
    onResponse(response) {
      const requestId2 = response.data.requestId;
      debug("[%s] received response %s to request %s", this.uid, response.type, requestId2);
      switch (response.type) {
        case MessageType.FETCH_SOCKETS_RESPONSE: {
          const request = this.customRequests.get(requestId2);
          if (!request) {
            return;
          }
          response.data.sockets.forEach((socket) => request.responses.push(socket));
          request.missingUids.delete(response.uid);
          if (request.missingUids.size === 0) {
            clearTimeout(request.timeout);
            request.resolve(request.responses);
            this.customRequests.delete(requestId2);
          }
          break;
        }
        case MessageType.SERVER_SIDE_EMIT_RESPONSE: {
          const request = this.customRequests.get(requestId2);
          if (!request) {
            return;
          }
          request.responses.push(response.data.packet);
          request.missingUids.delete(response.uid);
          if (request.missingUids.size === 0) {
            clearTimeout(request.timeout);
            request.resolve(null, request.responses);
            this.customRequests.delete(requestId2);
          }
          break;
        }
        default:
          super.onResponse(response);
      }
    }
    removeNode(uid) {
      this.customRequests.forEach((request, requestId2) => {
        request.missingUids.delete(uid);
        if (request.missingUids.size === 0) {
          clearTimeout(request.timeout);
          if (request.type === MessageType.FETCH_SOCKETS) {
            request.resolve(request.responses);
          } else if (request.type === MessageType.SERVER_SIDE_EMIT) {
            request.resolve(null, request.responses);
          }
          this.customRequests.delete(requestId2);
        }
      });
      this.nodesMap.delete(uid);
    }
  }
  exports.ClusterAdapterWithHeartbeat = ClusterAdapterWithHeartbeat;
});

// ../node_modules/socket.io-adapter/dist/index.js
var require_dist = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MessageType = exports.ClusterAdapterWithHeartbeat = exports.ClusterAdapter = exports.SessionAwareAdapter = exports.Adapter = undefined;
  var in_memory_adapter_1 = require_in_memory_adapter();
  Object.defineProperty(exports, "Adapter", { enumerable: true, get: function() {
    return in_memory_adapter_1.Adapter;
  } });
  Object.defineProperty(exports, "SessionAwareAdapter", { enumerable: true, get: function() {
    return in_memory_adapter_1.SessionAwareAdapter;
  } });
  var cluster_adapter_1 = require_cluster_adapter();
  Object.defineProperty(exports, "ClusterAdapter", { enumerable: true, get: function() {
    return cluster_adapter_1.ClusterAdapter;
  } });
  Object.defineProperty(exports, "ClusterAdapterWithHeartbeat", { enumerable: true, get: function() {
    return cluster_adapter_1.ClusterAdapterWithHeartbeat;
  } });
  Object.defineProperty(exports, "MessageType", { enumerable: true, get: function() {
    return cluster_adapter_1.MessageType;
  } });
});

// ../node_modules/socket.io/dist/parent-namespace.js
var require_parent_namespace = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ParentNamespace = undefined;
  var namespace_1 = require_namespace();
  var socket_io_adapter_1 = require_dist();
  var debug_1 = __importDefault(require_src());
  var debug = (0, debug_1.default)("socket.io:parent-namespace");

  class ParentNamespace extends namespace_1.Namespace {
    constructor(server) {
      super(server, "/_" + ParentNamespace.count++);
      this.children = new Set;
    }
    _initAdapter() {
      this.adapter = new ParentBroadcastAdapter(this, this.children);
    }
    emit(ev, ...args) {
      this.children.forEach((nsp) => {
        nsp.emit(ev, ...args);
      });
      return true;
    }
    createChild(name) {
      debug("creating child namespace %s", name);
      const namespace = new namespace_1.Namespace(this.server, name);
      namespace._fns = this._fns.slice(0);
      this.listeners("connect").forEach((listener) => namespace.on("connect", listener));
      this.listeners("connection").forEach((listener) => namespace.on("connection", listener));
      this.children.add(namespace);
      if (this.server._opts.cleanupEmptyChildNamespaces) {
        const remove = namespace._remove;
        namespace._remove = (socket) => {
          remove.call(namespace, socket);
          if (namespace.sockets.size === 0) {
            debug("closing child namespace %s", name);
            namespace.adapter.close();
            this.server._nsps.delete(namespace.name);
            this.children.delete(namespace);
          }
        };
      }
      this.server._nsps.set(name, namespace);
      this.server.sockets.emitReserved("new_namespace", namespace);
      return namespace;
    }
    fetchSockets() {
      throw new Error("fetchSockets() is not supported on parent namespaces");
    }
  }
  exports.ParentNamespace = ParentNamespace;
  ParentNamespace.count = 0;

  class ParentBroadcastAdapter extends socket_io_adapter_1.Adapter {
    constructor(parentNsp, children) {
      super(parentNsp);
      this.children = children;
    }
    broadcast(packet, opts) {
      this.children.forEach((nsp) => {
        nsp.adapter.broadcast(packet, opts);
      });
    }
  }
});

// ../node_modules/socket.io/dist/uws.js
var require_uws = __commonJS((exports) => {
  var patchAdapter = function(app) {
    socket_io_adapter_1.Adapter.prototype.addAll = function(id, rooms) {
      const isNew = !this.sids.has(id);
      addAll.call(this, id, rooms);
      const socket = this.nsp.sockets.get(id);
      if (!socket) {
        return;
      }
      if (socket.conn.transport.name === "websocket") {
        subscribe(this.nsp.name, socket, isNew, rooms);
        return;
      }
      if (isNew) {
        socket.conn.on("upgrade", () => {
          const rooms2 = this.sids.get(id);
          if (rooms2) {
            subscribe(this.nsp.name, socket, isNew, rooms2);
          }
        });
      }
    };
    socket_io_adapter_1.Adapter.prototype.del = function(id, room) {
      del.call(this, id, room);
      const socket = this.nsp.sockets.get(id);
      if (socket && socket.conn.transport.name === "websocket") {
        const sessionId = socket.conn.id;
        const websocket2 = socket.conn.transport.socket;
        const topic = `${this.nsp.name}${SEPARATOR}${room}`;
        debug("unsubscribe connection %s from topic %s", sessionId, topic);
        websocket2.unsubscribe(topic);
      }
    };
    socket_io_adapter_1.Adapter.prototype.broadcast = function(packet, opts) {
      const useFastPublish = opts.rooms.size <= 1 && opts.except.size === 0;
      if (!useFastPublish) {
        broadcast.call(this, packet, opts);
        return;
      }
      const flags = opts.flags || {};
      const basePacketOpts = {
        preEncoded: true,
        volatile: flags.volatile,
        compress: flags.compress
      };
      packet.nsp = this.nsp.name;
      const encodedPackets = this.encoder.encode(packet);
      const topic = opts.rooms.size === 0 ? this.nsp.name : `${this.nsp.name}${SEPARATOR}${opts.rooms.keys().next().value}`;
      debug("fast publish to %s", topic);
      encodedPackets.forEach((encodedPacket) => {
        const isBinary = typeof encodedPacket !== "string";
        app.publish(topic, isBinary ? encodedPacket : "4" + encodedPacket, isBinary);
      });
      this.apply(opts, (socket) => {
        if (socket.conn.transport.name !== "websocket") {
          socket.client.writeToEngine(encodedPackets, basePacketOpts);
        }
      });
    };
  };
  var subscribe = function(namespaceName, socket, isNew, rooms) {
    const sessionId = socket.conn.id;
    const websocket2 = socket.conn.transport.socket;
    if (isNew) {
      debug("subscribe connection %s to topic %s", sessionId, namespaceName);
      websocket2.subscribe(namespaceName);
    }
    rooms.forEach((room) => {
      const topic = `${namespaceName}${SEPARATOR}${room}`;
      debug("subscribe connection %s to topic %s", sessionId, topic);
      websocket2.subscribe(topic);
    });
  };
  var restoreAdapter = function() {
    socket_io_adapter_1.Adapter.prototype.addAll = addAll;
    socket_io_adapter_1.Adapter.prototype.del = del;
    socket_io_adapter_1.Adapter.prototype.broadcast = broadcast;
  };
  var serveFile = function(res, filepath) {
    const { size } = (0, fs_1.statSync)(filepath);
    const readStream = (0, fs_1.createReadStream)(filepath);
    const destroyReadStream = () => !readStream.destroyed && readStream.destroy();
    const onError = (error23) => {
      destroyReadStream();
      throw error23;
    };
    const onDataChunk = (chunk) => {
      const arrayBufferChunk = toArrayBuffer(chunk);
      const lastOffset = res.getWriteOffset();
      const [ok, done] = res.tryEnd(arrayBufferChunk, size);
      if (!done && !ok) {
        readStream.pause();
        res.onWritable((offset) => {
          const [ok2, done2] = res.tryEnd(arrayBufferChunk.slice(offset - lastOffset), size);
          if (!done2 && ok2) {
            readStream.resume();
          }
          return ok2;
        });
      }
    };
    res.onAborted(destroyReadStream);
    readStream.on("data", onDataChunk).on("error", onError).on("end", destroyReadStream);
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.serveFile = exports.restoreAdapter = exports.patchAdapter = undefined;
  var socket_io_adapter_1 = require_dist();
  var fs_1 = import.meta.require("fs");
  var debug_1 = __importDefault(require_src());
  var debug = (0, debug_1.default)("socket.io:adapter-uws");
  var SEPARATOR = "\x1F";
  var { addAll, del, broadcast } = socket_io_adapter_1.Adapter.prototype;
  exports.patchAdapter = patchAdapter;
  exports.restoreAdapter = restoreAdapter;
  var toArrayBuffer = (buffer) => {
    const { buffer: arrayBuffer, byteOffset, byteLength } = buffer;
    return arrayBuffer.slice(byteOffset, byteOffset + byteLength);
  };
  exports.serveFile = serveFile;
});

// ../node_modules/socket.io/package.json
var require_package = __commonJS((exports, module) => {
  module.exports = {
    name: "socket.io",
    version: "4.7.5",
    description: "node.js realtime framework server",
    keywords: [
      "realtime",
      "framework",
      "websocket",
      "tcp",
      "events",
      "socket",
      "io"
    ],
    files: [
      "dist/",
      "client-dist/",
      "wrapper.mjs",
      "!**/*.tsbuildinfo"
    ],
    directories: {
      doc: "docs/",
      example: "example/",
      lib: "lib/",
      test: "test/"
    },
    type: "commonjs",
    main: "./dist/index.js",
    exports: {
      types: "./dist/index.d.ts",
      import: "./wrapper.mjs",
      require: "./dist/index.js"
    },
    types: "./dist/index.d.ts",
    license: "MIT",
    repository: {
      type: "git",
      url: "git://github.com/socketio/socket.io"
    },
    scripts: {
      compile: "rimraf ./dist && tsc",
      test: "npm run format:check && npm run compile && npm run test:types && npm run test:unit",
      "test:types": "tsd",
      "test:unit": "nyc mocha --require ts-node/register --reporter spec --slow 200 --bail --timeout 10000 test/index.ts",
      "format:check": "prettier --check \"lib/**/*.ts\" \"test/**/*.ts\"",
      "format:fix": "prettier --write \"lib/**/*.ts\" \"test/**/*.ts\"",
      prepack: "npm run compile"
    },
    dependencies: {
      accepts: "~1.3.4",
      base64id: "~2.0.0",
      cors: "~2.8.5",
      debug: "~4.3.2",
      "engine.io": "~6.5.2",
      "socket.io-adapter": "~2.5.2",
      "socket.io-parser": "~4.2.4"
    },
    devDependencies: {
      "@types/mocha": "^9.0.0",
      "expect.js": "0.3.1",
      mocha: "^10.0.0",
      nyc: "^15.1.0",
      prettier: "^2.3.2",
      rimraf: "^3.0.2",
      "socket.io-client": "4.7.5",
      "socket.io-client-v2": "npm:socket.io-client@^2.4.0",
      superagent: "^8.0.0",
      supertest: "^6.1.6",
      "ts-node": "^10.2.1",
      tsd: "^0.27.0",
      typescript: "^4.4.2",
      "uWebSockets.js": "github:uNetworking/uWebSockets.js#v20.30.0"
    },
    contributors: [
      {
        name: "Guillermo Rauch",
        email: "rauchg@gmail.com"
      },
      {
        name: "Arnout Kazemier",
        email: "info@3rd-eden.com"
      },
      {
        name: "Vladimir Dronnikov",
        email: "dronnikov@gmail.com"
      },
      {
        name: "Einar Otto Stangvik",
        email: "einaros@gmail.com"
      }
    ],
    engines: {
      node: ">=10.2.0"
    },
    tsd: {
      directory: "test"
    }
  };
});

// ../node_modules/socket.io/dist/index.js
var require_dist2 = __commonJS((exports, module) => {
  var __dirname = "E:\\Fanni\\bun\\node_modules\\socket.io\\dist";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Namespace = exports.Socket = exports.Server = undefined;
  var http = import.meta.require("http");
  var fs_1 = import.meta.require("fs");
  var zlib_1 = import.meta.require("zlib");
  var accepts = require_accepts();
  var stream_1 = import.meta.require("stream");
  var path = import.meta.require("path");
  var engine_io_1 = require_engine_io();
  var client_1 = require_client();
  var events_1 = import.meta.require("events");
  var namespace_1 = require_namespace();
  Object.defineProperty(exports, "Namespace", { enumerable: true, get: function() {
    return namespace_1.Namespace;
  } });
  var parent_namespace_1 = require_parent_namespace();
  var socket_io_adapter_1 = require_dist();
  var parser = __importStar(require_cjs3());
  var debug_1 = __importDefault(require_src());
  var socket_1 = require_socket2();
  Object.defineProperty(exports, "Socket", { enumerable: true, get: function() {
    return socket_1.Socket;
  } });
  var typed_events_1 = require_typed_events();
  var uws_1 = require_uws();
  var cors_1 = __importDefault(require_lib2());
  var debug = (0, debug_1.default)("socket.io:server");
  var clientVersion = require_package().version;
  var dotMapRegex = /\.map/;

  class Server extends typed_events_1.StrictEventEmitter {
    constructor(srv, opts = {}) {
      super();
      this._nsps = new Map;
      this.parentNsps = new Map;
      this.parentNamespacesFromRegExp = new Map;
      if (typeof srv === "object" && srv instanceof Object && !srv.listen) {
        opts = srv;
        srv = undefined;
      }
      this.path(opts.path || "/socket.io");
      this.connectTimeout(opts.connectTimeout || 45000);
      this.serveClient(opts.serveClient !== false);
      this._parser = opts.parser || parser;
      this.encoder = new this._parser.Encoder;
      this.opts = opts;
      if (opts.connectionStateRecovery) {
        opts.connectionStateRecovery = Object.assign({
          maxDisconnectionDuration: 2 * 60 * 1000,
          skipMiddlewares: true
        }, opts.connectionStateRecovery);
        this.adapter(opts.adapter || socket_io_adapter_1.SessionAwareAdapter);
      } else {
        this.adapter(opts.adapter || socket_io_adapter_1.Adapter);
      }
      opts.cleanupEmptyChildNamespaces = !!opts.cleanupEmptyChildNamespaces;
      this.sockets = this.of("/");
      if (srv || typeof srv == "number")
        this.attach(srv);
      if (this.opts.cors) {
        this._corsMiddleware = (0, cors_1.default)(this.opts.cors);
      }
    }
    get _opts() {
      return this.opts;
    }
    serveClient(v) {
      if (!arguments.length)
        return this._serveClient;
      this._serveClient = v;
      return this;
    }
    _checkNamespace(name, auth, fn) {
      if (this.parentNsps.size === 0)
        return fn(false);
      const keysIterator = this.parentNsps.keys();
      const run = () => {
        const nextFn = keysIterator.next();
        if (nextFn.done) {
          return fn(false);
        }
        nextFn.value(name, auth, (err, allow) => {
          if (err || !allow) {
            return run();
          }
          if (this._nsps.has(name)) {
            debug("dynamic namespace %s already exists", name);
            return fn(this._nsps.get(name));
          }
          const namespace = this.parentNsps.get(nextFn.value).createChild(name);
          debug("dynamic namespace %s was created", name);
          fn(namespace);
        });
      };
      run();
    }
    path(v) {
      if (!arguments.length)
        return this._path;
      this._path = v.replace(/\/$/, "");
      const escapedPath = this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      this.clientPathRegex = new RegExp("^" + escapedPath + "/socket\\.io(\\.msgpack|\\.esm)?(\\.min)?\\.js(\\.map)?(?:\\?|$)");
      return this;
    }
    connectTimeout(v) {
      if (v === undefined)
        return this._connectTimeout;
      this._connectTimeout = v;
      return this;
    }
    adapter(v) {
      if (!arguments.length)
        return this._adapter;
      this._adapter = v;
      for (const nsp of this._nsps.values()) {
        nsp._initAdapter();
      }
      return this;
    }
    listen(srv, opts = {}) {
      return this.attach(srv, opts);
    }
    attach(srv, opts = {}) {
      if (typeof srv == "function") {
        const msg = "You are trying to attach socket.io to an express request handler function. Please pass a http.Server instance.";
        throw new Error(msg);
      }
      if (Number(srv) == srv) {
        srv = Number(srv);
      }
      if (typeof srv == "number") {
        debug("creating http server and binding to %d", srv);
        const port = srv;
        srv = http.createServer((req, res) => {
          res.writeHead(404);
          res.end();
        });
        srv.listen(port);
      }
      Object.assign(opts, this.opts);
      opts.path = opts.path || this._path;
      this.initEngine(srv, opts);
      return this;
    }
    attachApp(app, opts = {}) {
      Object.assign(opts, this.opts);
      opts.path = opts.path || this._path;
      debug("creating uWebSockets.js-based engine with opts %j", opts);
      const engine = new engine_io_1.uServer(opts);
      engine.attach(app, opts);
      this.bind(engine);
      if (this._serveClient) {
        app.get(`${this._path}/*`, (res, req) => {
          if (!this.clientPathRegex.test(req.getUrl())) {
            req.setYield(true);
            return;
          }
          const filename = req.getUrl().replace(this._path, "").replace(/\?.*$/, "").replace(/^\//, "");
          const isMap = dotMapRegex.test(filename);
          const type47 = isMap ? "map" : "source";
          const expectedEtag = '"' + clientVersion + '"';
          const weakEtag = "W/" + expectedEtag;
          const etag = req.getHeader("if-none-match");
          if (etag) {
            if (expectedEtag === etag || weakEtag === etag) {
              debug("serve client %s 304", type47);
              res.writeStatus("304 Not Modified");
              res.end();
              return;
            }
          }
          debug("serve client %s", type47);
          res.writeHeader("cache-control", "public, max-age=0");
          res.writeHeader("content-type", "application/" + (isMap ? "json" : "javascript") + "; charset=utf-8");
          res.writeHeader("etag", expectedEtag);
          const filepath = path.join(__dirname, "../client-dist/", filename);
          (0, uws_1.serveFile)(res, filepath);
        });
      }
      (0, uws_1.patchAdapter)(app);
    }
    initEngine(srv, opts) {
      debug("creating engine.io instance with opts %j", opts);
      this.eio = (0, engine_io_1.attach)(srv, opts);
      if (this._serveClient)
        this.attachServe(srv);
      this.httpServer = srv;
      this.bind(this.eio);
    }
    attachServe(srv) {
      debug("attaching client serving req handler");
      const evs = srv.listeners("request").slice(0);
      srv.removeAllListeners("request");
      srv.on("request", (req, res) => {
        if (this.clientPathRegex.test(req.url)) {
          if (this._corsMiddleware) {
            this._corsMiddleware(req, res, () => {
              this.serve(req, res);
            });
          } else {
            this.serve(req, res);
          }
        } else {
          for (let i = 0;i < evs.length; i++) {
            evs[i].call(srv, req, res);
          }
        }
      });
    }
    serve(req, res) {
      const filename = req.url.replace(this._path, "").replace(/\?.*$/, "");
      const isMap = dotMapRegex.test(filename);
      const type47 = isMap ? "map" : "source";
      const expectedEtag = '"' + clientVersion + '"';
      const weakEtag = "W/" + expectedEtag;
      const etag = req.headers["if-none-match"];
      if (etag) {
        if (expectedEtag === etag || weakEtag === etag) {
          debug("serve client %s 304", type47);
          res.writeHead(304);
          res.end();
          return;
        }
      }
      debug("serve client %s", type47);
      res.setHeader("Cache-Control", "public, max-age=0");
      res.setHeader("Content-Type", "application/" + (isMap ? "json" : "javascript") + "; charset=utf-8");
      res.setHeader("ETag", expectedEtag);
      Server.sendFile(filename, req, res);
    }
    static sendFile(filename, req, res) {
      const readStream = (0, fs_1.createReadStream)(path.join(__dirname, "../client-dist/", filename));
      const encoding = accepts(req).encodings(["br", "gzip", "deflate"]);
      const onError = (err) => {
        if (err) {
          res.end();
        }
      };
      switch (encoding) {
        case "br":
          res.writeHead(200, { "content-encoding": "br" });
          (0, stream_1.pipeline)(readStream, (0, zlib_1.createBrotliCompress)(), res, onError);
          break;
        case "gzip":
          res.writeHead(200, { "content-encoding": "gzip" });
          (0, stream_1.pipeline)(readStream, (0, zlib_1.createGzip)(), res, onError);
          break;
        case "deflate":
          res.writeHead(200, { "content-encoding": "deflate" });
          (0, stream_1.pipeline)(readStream, (0, zlib_1.createDeflate)(), res, onError);
          break;
        default:
          res.writeHead(200);
          (0, stream_1.pipeline)(readStream, res, onError);
      }
    }
    bind(engine) {
      this.engine = engine;
      this.engine.on("connection", this.onconnection.bind(this));
      return this;
    }
    onconnection(conn) {
      debug("incoming connection with id %s", conn.id);
      const client = new client_1.Client(this, conn);
      if (conn.protocol === 3) {
        client.connect("/");
      }
      return this;
    }
    of(name, fn) {
      if (typeof name === "function" || name instanceof RegExp) {
        const parentNsp = new parent_namespace_1.ParentNamespace(this);
        debug("initializing parent namespace %s", parentNsp.name);
        if (typeof name === "function") {
          this.parentNsps.set(name, parentNsp);
        } else {
          this.parentNsps.set((nsp2, conn, next) => next(null, name.test(nsp2)), parentNsp);
          this.parentNamespacesFromRegExp.set(name, parentNsp);
        }
        if (fn) {
          parentNsp.on("connect", fn);
        }
        return parentNsp;
      }
      if (String(name)[0] !== "/")
        name = "/" + name;
      let nsp = this._nsps.get(name);
      if (!nsp) {
        for (const [regex2, parentNamespace] of this.parentNamespacesFromRegExp) {
          if (regex2.test(name)) {
            debug("attaching namespace %s to parent namespace %s", name, regex2);
            return parentNamespace.createChild(name);
          }
        }
        debug("initializing namespace %s", name);
        nsp = new namespace_1.Namespace(this, name);
        this._nsps.set(name, nsp);
        if (name !== "/") {
          this.sockets.emitReserved("new_namespace", nsp);
        }
      }
      if (fn)
        nsp.on("connect", fn);
      return nsp;
    }
    close(fn) {
      this._nsps.forEach((nsp) => {
        nsp.sockets.forEach((socket) => {
          socket._onclose("server shutting down");
        });
        nsp.adapter.close();
      });
      this.engine.close();
      (0, uws_1.restoreAdapter)();
      if (this.httpServer) {
        this.httpServer.close(fn);
      } else {
        fn && fn();
      }
    }
    use(fn) {
      this.sockets.use(fn);
      return this;
    }
    to(room) {
      return this.sockets.to(room);
    }
    in(room) {
      return this.sockets.in(room);
    }
    except(room) {
      return this.sockets.except(room);
    }
    send(...args) {
      this.sockets.emit("message", ...args);
      return this;
    }
    write(...args) {
      this.sockets.emit("message", ...args);
      return this;
    }
    serverSideEmit(ev, ...args) {
      return this.sockets.serverSideEmit(ev, ...args);
    }
    serverSideEmitWithAck(ev, ...args) {
      return this.sockets.serverSideEmitWithAck(ev, ...args);
    }
    allSockets() {
      return this.sockets.allSockets();
    }
    compress(compress) {
      return this.sockets.compress(compress);
    }
    get volatile() {
      return this.sockets.volatile;
    }
    get local() {
      return this.sockets.local;
    }
    timeout(timeout) {
      return this.sockets.timeout(timeout);
    }
    fetchSockets() {
      return this.sockets.fetchSockets();
    }
    socketsJoin(room) {
      return this.sockets.socketsJoin(room);
    }
    socketsLeave(room) {
      return this.sockets.socketsLeave(room);
    }
    disconnectSockets(close = false) {
      return this.sockets.disconnectSockets(close);
    }
  }
  exports.Server = Server;
  var emitterMethods = Object.keys(events_1.EventEmitter.prototype).filter(function(key) {
    return typeof events_1.EventEmitter.prototype[key] === "function";
  });
  emitterMethods.forEach(function(fn) {
    Server.prototype[fn] = function() {
      return this.sockets[fn].apply(this.sockets, arguments);
    };
  });
  module.exports = (srv, opts) => new Server(srv, opts);
  module.exports.Server = Server;
  module.exports.Namespace = namespace_1.Namespace;
  module.exports.Socket = socket_1.Socket;
  var socket_2 = require_socket2();
});

// node_modules/eventemitter3/index.mjs
var import_ = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_.default;

// node_modules/@sinclair/typebox/build/esm/value/guard/guard.mjs
function IsAsyncIterator(value) {
  return IsObject(value) && Symbol.asyncIterator in value;
}
function IsIterator(value) {
  return IsObject(value) && Symbol.iterator in value;
}
function IsStandardObject(value) {
  return IsObject(value) && !IsArray(value) && IsFunction(value.constructor) && value.constructor.name === "Object";
}
function IsPromise(value) {
  return value instanceof Promise;
}
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
function HasPropertyKey(value, key) {
  return key in value;
}
function IsObject(value) {
  return value !== null && typeof value === "object";
}
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
function IsUndefined(value) {
  return value === undefined;
}
function IsNull(value) {
  return value === null;
}
function IsBoolean(value) {
  return typeof value === "boolean";
}
function IsNumber(value) {
  return typeof value === "number";
}
function IsInteger(value) {
  return Number.isInteger(value);
}
function IsBigInt(value) {
  return typeof value === "bigint";
}
function IsString(value) {
  return typeof value === "string";
}
function IsFunction(value) {
  return typeof value === "function";
}
function IsSymbol(value) {
  return typeof value === "symbol";
}
function IsValueType(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
}
// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
var TypeSystemPolicy;
(function(TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  }
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject ? isObject : isObject && !IsArray(value);
  }
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  }
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy2.AllowNaN ? IsNumber(value) : Number.isFinite(value);
  }
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
  }
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));
// node_modules/@sinclair/typebox/build/esm/type/registry/format.mjs
var exports_format = {};
__export(exports_format, {
  Set: () => {
    {
      return Set2;
    }
  },
  Has: () => {
    {
      return Has;
    }
  },
  Get: () => {
    {
      return Get;
    }
  },
  Entries: () => {
    {
      return Entries;
    }
  },
  Delete: () => {
    {
      return Delete;
    }
  },
  Clear: () => {
    {
      return Clear;
    }
  }
});
function Entries() {
  return new Map(map);
}
function Clear() {
  return map.clear();
}
function Delete(format) {
  return map.delete(format);
}
function Has(format) {
  return map.has(format);
}
function Set2(format, func) {
  map.set(format, func);
}
function Get(format) {
  return map.get(format);
}
var map = new Map;
// node_modules/@sinclair/typebox/build/esm/type/registry/type.mjs
var exports_type = {};
__export(exports_type, {
  Set: () => {
    {
      return Set3;
    }
  },
  Has: () => {
    {
      return Has2;
    }
  },
  Get: () => {
    {
      return Get2;
    }
  },
  Entries: () => {
    {
      return Entries2;
    }
  },
  Delete: () => {
    {
      return Delete2;
    }
  },
  Clear: () => {
    {
      return Clear2;
    }
  }
});
function Entries2() {
  return new Map(map2);
}
function Clear2() {
  return map2.clear();
}
function Delete2(kind) {
  return map2.delete(kind);
}
function Has2(kind) {
  return map2.has(kind);
}
function Set3(kind, func) {
  map2.set(kind, func);
}
function Get2(kind) {
  return map2.get(kind);
}
var map2 = new Map;
// node_modules/@sinclair/typebox/build/esm/type/symbols/symbols.mjs
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");
// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/error/error.mjs
class TypeBoxError extends Error {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/system/system.mjs
class TypeSystemDuplicateTypeKind extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
}

class TypeSystemDuplicateFormat extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
}
var TypeSystem;
(function(TypeSystem2) {
  function Type(kind, check) {
    if (exports_type.Has(kind))
      throw new TypeSystemDuplicateTypeKind(kind);
    exports_type.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  TypeSystem2.Type = Type;
  function Format(format, check) {
    if (exports_format.Has(format))
      throw new TypeSystemDuplicateFormat(format);
    exports_format.Set(format, check);
    return format;
  }
  TypeSystem2.Format = Format;
})(TypeSystem || (TypeSystem = {}));
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-result.mjs
function MappedResult(properties) {
  return {
    [Kind]: "MappedResult",
    properties
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/value.mjs
var exports_value = {};
__export(exports_value, {
  IsUndefined: () => {
    {
      return IsUndefined2;
    }
  },
  IsUint8Array: () => {
    {
      return IsUint8Array2;
    }
  },
  IsSymbol: () => {
    {
      return IsSymbol2;
    }
  },
  IsString: () => {
    {
      return IsString2;
    }
  },
  IsRegExp: () => {
    {
      return IsRegExp;
    }
  },
  IsObject: () => {
    {
      return IsObject2;
    }
  },
  IsNumber: () => {
    {
      return IsNumber2;
    }
  },
  IsNull: () => {
    {
      return IsNull2;
    }
  },
  IsIterator: () => {
    {
      return IsIterator2;
    }
  },
  IsFunction: () => {
    {
      return IsFunction2;
    }
  },
  IsDate: () => {
    {
      return IsDate2;
    }
  },
  IsBoolean: () => {
    {
      return IsBoolean2;
    }
  },
  IsBigInt: () => {
    {
      return IsBigInt2;
    }
  },
  IsAsyncIterator: () => {
    {
      return IsAsyncIterator2;
    }
  },
  IsArray: () => {
    {
      return IsArray2;
    }
  }
});
function IsAsyncIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.asyncIterator in value;
}
function IsArray2(value) {
  return Array.isArray(value);
}
function IsBigInt2(value) {
  return typeof value === "bigint";
}
function IsBoolean2(value) {
  return typeof value === "boolean";
}
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
function IsFunction2(value) {
  return typeof value === "function";
}
function IsIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.iterator in value;
}
function IsNull2(value) {
  return value === null;
}
function IsNumber2(value) {
  return typeof value === "number";
}
function IsObject2(value) {
  return typeof value === "object" && value !== null;
}
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
function IsString2(value) {
  return typeof value === "string";
}
function IsSymbol2(value) {
  return typeof value === "symbol";
}
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
function IsUndefined2(value) {
  return value === undefined;
}

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
var ArrayType = function(value) {
  return value.map((value2) => Visit(value2));
};
var DateType = function(value) {
  return new Date(value.getTime());
};
var Uint8ArrayType = function(value) {
  return new Uint8Array(value);
};
var RegExpType = function(value) {
  return new RegExp(value.source, value.flags);
};
var ObjectType = function(value) {
  const result = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    result[key] = Visit(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    result[key] = Visit(value[key]);
  }
  return result;
};
var Visit = function(value) {
  return IsArray2(value) ? ArrayType(value) : IsDate2(value) ? DateType(value) : IsUint8Array2(value) ? Uint8ArrayType(value) : IsRegExp(value) ? RegExpType(value) : IsObject2(value) ? ObjectType(value) : value;
};
function Clone(value) {
  return Visit(value);
}

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}

// node_modules/@sinclair/typebox/build/esm/type/discard/discard.mjs
var DiscardKey = function(value2, key) {
  const { [key]: _, ...rest } = value2;
  return rest;
};
function Discard(value2, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value2);
}
// node_modules/@sinclair/typebox/build/esm/type/array/array.mjs
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/async-iterator/async-iterator.mjs
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/constructor/constructor.mjs
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/function/function.mjs
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/never/never.mjs
function Never(options = {}) {
  return {
    ...options,
    [Kind]: "Never",
    not: {}
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/kind.mjs
function IsReadonly(value2) {
  return IsObject2(value2) && value2[ReadonlyKind] === "Readonly";
}
function IsOptional(value2) {
  return IsObject2(value2) && value2[OptionalKind] === "Optional";
}
function IsAny(value2) {
  return IsKindOf(value2, "Any");
}
function IsArray3(value2) {
  return IsKindOf(value2, "Array");
}
function IsAsyncIterator3(value2) {
  return IsKindOf(value2, "AsyncIterator");
}
function IsBigInt3(value2) {
  return IsKindOf(value2, "BigInt");
}
function IsBoolean3(value2) {
  return IsKindOf(value2, "Boolean");
}
function IsConstructor(value2) {
  return IsKindOf(value2, "Constructor");
}
function IsDate3(value2) {
  return IsKindOf(value2, "Date");
}
function IsFunction3(value2) {
  return IsKindOf(value2, "Function");
}
function IsInteger2(value2) {
  return IsKindOf(value2, "Integer");
}
function IsIntersect(value2) {
  return IsKindOf(value2, "Intersect");
}
function IsIterator3(value2) {
  return IsKindOf(value2, "Iterator");
}
function IsKindOf(value2, kind) {
  return IsObject2(value2) && Kind in value2 && value2[Kind] === kind;
}
function IsLiteral(value2) {
  return IsKindOf(value2, "Literal");
}
function IsMappedKey(value2) {
  return IsKindOf(value2, "MappedKey");
}
function IsMappedResult(value2) {
  return IsKindOf(value2, "MappedResult");
}
function IsNever(value2) {
  return IsKindOf(value2, "Never");
}
function IsNot(value2) {
  return IsKindOf(value2, "Not");
}
function IsNull3(value2) {
  return IsKindOf(value2, "Null");
}
function IsNumber3(value2) {
  return IsKindOf(value2, "Number");
}
function IsObject3(value2) {
  return IsKindOf(value2, "Object");
}
function IsPromise2(value2) {
  return IsKindOf(value2, "Promise");
}
function IsRecord(value2) {
  return IsKindOf(value2, "Record");
}
function IsRef(value2) {
  return IsKindOf(value2, "Ref");
}
function IsRegExp2(value2) {
  return IsKindOf(value2, "RegExp");
}
function IsString3(value2) {
  return IsKindOf(value2, "String");
}
function IsSymbol3(value2) {
  return IsKindOf(value2, "Symbol");
}
function IsTemplateLiteral(value2) {
  return IsKindOf(value2, "TemplateLiteral");
}
function IsThis(value2) {
  return IsKindOf(value2, "This");
}
function IsTransform(value2) {
  return IsObject2(value2) && TransformKind in value2;
}
function IsTuple(value2) {
  return IsKindOf(value2, "Tuple");
}
function IsUndefined3(value2) {
  return IsKindOf(value2, "Undefined");
}
function IsUnion(value2) {
  return IsKindOf(value2, "Union");
}
function IsUint8Array3(value2) {
  return IsKindOf(value2, "Uint8Array");
}
function IsUnknown(value2) {
  return IsKindOf(value2, "Unknown");
}
function IsUnsafe(value2) {
  return IsKindOf(value2, "Unsafe");
}
function IsVoid(value2) {
  return IsKindOf(value2, "Void");
}
function IsKind(value2) {
  return IsObject2(value2) && Kind in value2 && IsString2(value2[Kind]);
}
function IsSchema(value2) {
  return IsAny(value2) || IsArray3(value2) || IsBoolean3(value2) || IsBigInt3(value2) || IsAsyncIterator3(value2) || IsConstructor(value2) || IsDate3(value2) || IsFunction3(value2) || IsInteger2(value2) || IsIntersect(value2) || IsIterator3(value2) || IsLiteral(value2) || IsMappedKey(value2) || IsMappedResult(value2) || IsNever(value2) || IsNot(value2) || IsNull3(value2) || IsNumber3(value2) || IsObject3(value2) || IsPromise2(value2) || IsRecord(value2) || IsRef(value2) || IsRegExp2(value2) || IsString3(value2) || IsSymbol3(value2) || IsTemplateLiteral(value2) || IsThis(value2) || IsTuple(value2) || IsUndefined3(value2) || IsUnion(value2) || IsUint8Array3(value2) || IsUnknown(value2) || IsUnsafe(value2) || IsVoid(value2) || IsKind(value2);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
var RemoveOptional = function(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
};
var AddOptional = function(schema) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
};
var OptionalWithFlag = function(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
};
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
var FromProperties = function(P, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Optional(P[K2], F);
  return Acc;
};
var FromMappedResult = function(R, F) {
  return FromProperties(R.properties, F);
};
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-create.mjs
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties) ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) } : {};
  return options.unevaluatedProperties === false || IsSchema(options.unevaluatedProperties) || allObjects ? { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", type: "object", allOf: CloneRest(T) } : { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", allOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
var IsIntersectOptional = function(T) {
  return T.every((L) => IsOptional(L));
};
var RemoveOptionalFromType = function(T) {
  return Discard(T, [OptionalKind]);
};
var RemoveOptionalFromRest = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType(L) : L);
};
var ResolveIntersect = function(T, options) {
  return IsIntersectOptional(T) ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options)) : IntersectCreate(RemoveOptionalFromRest(T), options);
};
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return ResolveIntersect(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect.mjs
function Intersect(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return IntersectCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union-create.mjs
function UnionCreate(T, options) {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
var IsUnionOptional = function(T) {
  return T.some((L) => IsOptional(L));
};
var RemoveOptionalFromRest2 = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType2(L) : L);
};
var RemoveOptionalFromType2 = function(T) {
  return Discard(T, [OptionalKind]);
};
var ResolveUnion = function(T, options) {
  return IsUnionOptional(T) ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options)) : UnionCreate(RemoveOptionalFromRest2(T), options);
};
function UnionEvaluated(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : ResolveUnion(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union.mjs
function Union(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : UnionCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/parse.mjs
var Unescape = function(pattern) {
  return pattern.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
};
var IsNonEscaped = function(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
};
var IsOpenParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, "(");
};
var IsCloseParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, ")");
};
var IsSeparator = function(pattern, index) {
  return IsNonEscaped(pattern, index, "|");
};
var IsGroup = function(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (count === 0 && index !== pattern.length - 1)
      return false;
  }
  return true;
};
var InGroup = function(pattern) {
  return pattern.slice(1, pattern.length - 1);
};
var IsPrecedenceOr = function(pattern) {
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0)
      return true;
  }
  return false;
};
var IsPrecedenceAnd = function(pattern) {
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      return true;
  }
  return false;
};
var Or = function(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0)
        expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0)
    expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0)
    return { type: "const", const: "" };
  if (expressions.length === 1)
    return expressions[0];
  return { type: "or", expr: expressions };
};
var And = function(pattern) {
  function Group(value2, index) {
    if (!IsOpenParen(value2, index))
      throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
    let count = 0;
    for (let scan = index;scan < value2.length; scan++) {
      if (IsOpenParen(value2, scan))
        count += 1;
      if (IsCloseParen(value2, scan))
        count -= 1;
      if (count === 0)
        return [index, scan];
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
  }
  function Range(pattern2, index) {
    for (let scan = index;scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan))
        return [index, scan];
    }
    return [index, pattern2.length];
  }
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0)
        expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
};
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: Unescape(pattern) };
}
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

class TemplateLiteralParserError extends TypeBoxError {
}

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
var IsNumberExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
};
var IsBooleanExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
};
var IsStringExpression = function(expression) {
  return expression.type === "const" && expression.const === ".*";
};
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression) ? false : IsBooleanExpression(expression) ? true : expression.type === "and" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "or" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "const" ? true : (() => {
    throw new TemplateLiteralFiniteError(`Unknown expression type`);
  })();
}
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}

class TemplateLiteralFiniteError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/generate.mjs
function* GenerateReduce(buffer) {
  if (buffer.length === 1)
    return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
function* GenerateAnd(expression) {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]));
}
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
function* GenerateConst(expression) {
  return yield expression.const;
}
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === "and" ? yield* GenerateAnd(expression) : expression.type === "or" ? yield* GenerateOr(expression) : expression.type === "const" ? yield* GenerateConst(expression) : (() => {
    throw new TemplateLiteralGenerateError("Unknown expression");
  })();
}
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression) ? [...TemplateLiteralExpressionGenerate(expression)] : [];
}

class TemplateLiteralGenerateError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/literal/literal.mjs
function Literal(value2, options = {}) {
  return {
    ...options,
    [Kind]: "Literal",
    const: value2,
    type: typeof value2
  };
}
// node_modules/@sinclair/typebox/build/esm/type/boolean/boolean.mjs
function Boolean2(options = {}) {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/bigint/bigint.mjs
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/number/number.mjs
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: "Number",
    type: "number"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/string/string.mjs
function String2(options = {}) {
  return { ...options, [Kind]: "String", type: "string" };
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean" ? yield Boolean2() : trim === "number" ? yield Number2() : trim === "bigint" ? yield BigInt2() : trim === "string" ? yield String2() : yield (() => {
    const literals = trim.split("|").map((literal3) => Literal(literal3.trim()));
    return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
  })();
}
function* FromTerminal(syntax) {
  if (syntax[1] !== "{") {
    const L = Literal("$");
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2;i < syntax.length; i++) {
    if (syntax[i] === "}") {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
function* FromSyntax(syntax) {
  for (let i = 0;i < syntax.length; i++) {
    if (syntax[i] === "$") {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
// node_modules/@sinclair/typebox/build/esm/type/patterns/patterns.mjs
var PatternBoolean = "(true|false)";
var PatternNumber = "(0|[1-9][0-9]*)";
var PatternString = "(.*)";
var PatternBooleanExact = `^${PatternBoolean}\$`;
var PatternNumberExact = `^${PatternNumber}\$`;
var PatternStringExact = `^${PatternString}\$`;
// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
var Escape = function(value2) {
  return value2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var Visit2 = function(schema, acc) {
  return IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : IsUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join("|")})` : IsNumber3(schema) ? `${acc}${PatternNumber}` : IsInteger2(schema) ? `${acc}${PatternNumber}` : IsBigInt3(schema) ? `${acc}${PatternNumber}` : IsString3(schema) ? `${acc}${PatternString}` : IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : IsBoolean3(schema) ? `${acc}${PatternBoolean}` : (() => {
    throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`);
  })();
};
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, "")).join("")}$`;
}

class TemplateLiteralPatternError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/union.mjs
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/template-literal.mjs
function TemplateLiteral(unresolved, options = {}) {
  const pattern2 = IsString2(unresolved) ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved)) : TemplateLiteralPattern(unresolved);
  return { ...options, [Kind]: "TemplateLiteral", type: "string", pattern: pattern2 };
}
// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
var FromTemplateLiteral = function(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
};
var FromUnion2 = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexPropertyKeys(L));
  return Acc;
};
var FromLiteral = function(T) {
  return [T.toString()];
};
function IndexPropertyKeys(T) {
  return [...new Set(IsTemplateLiteral(T) ? FromTemplateLiteral(T) : IsUnion(T) ? FromUnion2(T.anyOf) : IsLiteral(T) ? FromLiteral(T.const) : IsNumber3(T) ? ["[number]"] : IsInteger2(T) ? ["[number]"] : [])];
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-result.mjs
var FromProperties2 = function(T, P, options) {
  const Acc = {};
  for (const K2 of Object.getOwnPropertyNames(P)) {
    Acc[K2] = Index(T, IndexPropertyKeys(P[K2]), options);
  }
  return Acc;
};
var FromMappedResult2 = function(T, R, options) {
  return FromProperties2(T, R.properties, options);
};
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
var FromRest = function(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
};
var FromIntersectRest = function(T) {
  return T.filter((L) => !IsNever(L));
};
var FromIntersect = function(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
};
var FromUnionRest = function(T) {
  return T.some((L) => IsNever(L)) ? [] : T;
};
var FromUnion3 = function(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
};
var FromTuple = function(T, K) {
  return K in T ? T[K] : K === "[number]" ? UnionEvaluated(T) : Never();
};
var FromArray = function(T, K) {
  return K === "[number]" ? T : Never();
};
var FromProperty = function(T, K) {
  return K in T ? T[K] : Never();
};
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T) ? FromIntersect(T.allOf, K) : IsUnion(T) ? FromUnion3(T.anyOf, K) : IsTuple(T) ? FromTuple(T.items ?? [], K) : IsArray3(T) ? FromArray(T.items, K) : IsObject3(T) ? FromProperty(T.properties, K) : Never();
}
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
var FromSchema = function(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
};
function Index(T, K, options = {}) {
  return IsMappedResult(K) ? CloneType(IndexFromMappedResult(T, K, options)) : IsMappedKey(K) ? CloneType(IndexFromMappedKey(T, K, options)) : IsSchema(K) ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options) : CloneType(FromSchema(T, K), options);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
var MappedIndexPropertyKey = function(T, K, options) {
  return { [K]: Index(T, [K], options) };
};
var MappedIndexPropertyKeys = function(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
};
var MappedIndexProperties = function(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
};
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/iterator/iterator.mjs
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/object/object.mjs
var _Object = function(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties) ? { additionalProperties: CloneType(options.additionalProperties) } : {};
  const clonedProperties = {};
  for (const key of propertyKeys)
    clonedProperties[key] = CloneType(properties[key]);
  return requiredKeys.length > 0 ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys } : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties };
};
var Object2 = _Object;
// node_modules/@sinclair/typebox/build/esm/type/promise/promise.mjs
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly.mjs
var RemoveReadonly = function(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
};
var AddReadonly = function(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
};
var ReadonlyWithFlag = function(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
};
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
var FromProperties3 = function(K, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Readonly(K[K2], F);
  return Acc;
};
var FromMappedResult3 = function(R, F) {
  return FromProperties3(R.properties, F);
};
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/tuple/tuple.mjs
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  return items.length > 0 ? { ...options, [Kind]: "Tuple", type: "array", items: CloneRest(items), additionalItems, minItems, maxItems } : { ...options, [Kind]: "Tuple", type: "array", minItems, maxItems };
}
// node_modules/@sinclair/typebox/build/esm/type/sets/set.mjs
function SetIncludes(T, S) {
  return T.includes(S);
}
function SetDistinct(T) {
  return [...new Set(T)];
}
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
var SetIntersectManyResolve = function(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
};
function SetIntersectMany(T) {
  return T.length === 1 ? T[0] : T.length > 1 ? SetIntersectManyResolve(T.slice(1), T[0]) : [];
}
function SetUnionMany(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...L);
  return Acc;
}
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
var FromMappedResult4 = function(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
};
var MappedKeyToKnownMappedResultProperties = function(K) {
  return { [K]: Literal(K) };
};
var MappedKeyToUnknownMappedResultProperties = function(P) {
  const Acc = {};
  for (const L of P)
    Acc[L] = Literal(L);
  return Acc;
};
var MappedKeyToMappedResultProperties = function(K, P) {
  return SetIncludes(P, K) ? MappedKeyToKnownMappedResultProperties(K) : MappedKeyToUnknownMappedResultProperties(P);
};
var FromMappedKey = function(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
};
var FromRest2 = function(K, T) {
  return T.map((L) => FromSchemaType(K, L));
};
var FromProperties4 = function(K, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(T))
    Acc[K2] = FromSchemaType(K, T[K2]);
  return Acc;
};
var FromSchemaType = function(K, T) {
  return IsOptional(T) ? Optional(FromSchemaType(K, Discard(T, [OptionalKind]))) : IsReadonly(T) ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind]))) : IsMappedResult(T) ? FromMappedResult4(K, T.properties) : IsMappedKey(T) ? FromMappedKey(K, T.keys) : IsConstructor(T) ? Constructor(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsFunction3(T) ? Function2(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsAsyncIterator3(T) ? AsyncIterator(FromSchemaType(K, T.items)) : IsIterator3(T) ? Iterator(FromSchemaType(K, T.items)) : IsIntersect(T) ? Intersect(FromRest2(K, T.allOf)) : IsUnion(T) ? Union(FromRest2(K, T.anyOf)) : IsTuple(T) ? Tuple(FromRest2(K, T.items ?? [])) : IsObject3(T) ? Object2(FromProperties4(K, T.properties)) : IsArray3(T) ? Array2(FromSchemaType(K, T.items)) : IsPromise2(T) ? Promise2(FromSchemaType(K, T.item)) : T;
};
function MappedFunctionReturnType(K, T) {
  const Acc = {};
  for (const L of K)
    Acc[L] = FromSchemaType(L, T);
  return Acc;
}
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: "MappedKey", keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-keys.mjs
var FromRest3 = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(KeyOfPropertyKeys(L));
  return Acc;
};
var FromIntersect2 = function(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
};
var FromUnion4 = function(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
};
var FromTuple2 = function(T) {
  return T.map((_, I) => I.toString());
};
var FromArray2 = function(_) {
  return ["[number]"];
};
var FromProperties5 = function(T) {
  return globalThis.Object.getOwnPropertyNames(T);
};
var FromPatternProperties = function(patternProperties) {
  if (!includePatternProperties)
    return [];
  const patternPropertyKeys = globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
  });
};
function KeyOfPropertyKeys(T) {
  return IsIntersect(T) ? FromIntersect2(T.allOf) : IsUnion(T) ? FromUnion4(T.anyOf) : IsTuple(T) ? FromTuple2(T.items ?? []) : IsArray3(T) ? FromArray2(T.items) : IsObject3(T) ? FromProperties5(T.properties) : IsRecord(T) ? FromPatternProperties(T.patternProperties) : [];
}
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern3 = keys.map((key) => `(${key})`);
  return `^(${pattern3.join("|")})\$`;
}
var includePatternProperties = false;

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => L === "[number]" ? Number2() : Literal(L));
}
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
var FromProperties6 = function(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = KeyOf(K[K2], options);
  return Acc;
};
var FromMappedResult5 = function(R, options) {
  return FromProperties6(R.properties, options);
};
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-entries.mjs
function KeyOfPropertyEntries(schema) {
  const keys = KeyOfPropertyKeys(schema);
  const schemas = IndexFromPropertyKeys(schema, keys);
  return keys.map((_, index) => [keys[index], schemas[index]]);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-undefined.mjs
var Intersect2 = function(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
};
var Union2 = function(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
};
var Not = function(schema) {
  return !ExtendsUndefinedCheck(schema.not);
};
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === "Intersect" ? Intersect2(schema) : schema[Kind] === "Union" ? Union2(schema) : schema[Kind] === "Not" ? Not(schema) : schema[Kind] === "Undefined" ? true : false;
}

// node_modules/@sinclair/typebox/build/esm/errors/function.mjs
function DefaultErrorFunction(error7) {
  switch (error7.errorType) {
    case ValueErrorType.ArrayContains:
      return "Expected array to contain at least one matching value";
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error7.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error7.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error7.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error7.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case ValueErrorType.Array:
      return "Expected array";
    case ValueErrorType.AsyncIterator:
      return "Expected AsyncIterator";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return "Expected bigint";
    case ValueErrorType.Boolean:
      return "Expected boolean";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error7.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error7.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error7.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error7.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error7.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return "Expected Date";
    case ValueErrorType.Function:
      return "Expected function";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return "Expected integer";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case ValueErrorType.Intersect:
      return "Expected all values to match";
    case ValueErrorType.Iterator:
      return "Expected Iterator";
    case ValueErrorType.Literal:
      return `Expected ${typeof error7.schema.const === "string" ? `'${error7.schema.const}'` : error7.schema.const}`;
    case ValueErrorType.Never:
      return "Never";
    case ValueErrorType.Not:
      return "Value should not match";
    case ValueErrorType.Null:
      return "Expected null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Number:
      return "Expected number";
    case ValueErrorType.Object:
      return "Expected object";
    case ValueErrorType.ObjectAdditionalProperties:
      return "Unexpected property";
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error7.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error7.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return "Required property";
    case ValueErrorType.Promise:
      return "Expected Promise";
    case ValueErrorType.RegExp:
      return "Expected string to match regular expression";
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error7.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error7.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error7.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error7.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error7.schema.pattern}'`;
    case ValueErrorType.String:
      return "Expected string";
    case ValueErrorType.Symbol:
      return "Expected symbol";
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error7.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return "Expected tuple";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error7.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error7.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "Expected Uint8Array";
    case ValueErrorType.Undefined:
      return "Expected undefined";
    case ValueErrorType.Union:
      return "Expected union value";
    case ValueErrorType.Void:
      return "Expected void";
    case ValueErrorType.Kind:
      return `Expected kind '${error7.schema[Kind]}'`;
    default:
      return "Unknown error type";
  }
}
function GetErrorFunction() {
  return errorFunction;
}
var errorFunction = DefaultErrorFunction;

// node_modules/@sinclair/typebox/build/esm/value/deref/deref.mjs
function Deref(schema, references) {
  const index = references.findIndex((target) => target.$id === schema.$ref);
  if (index === -1)
    throw new TypeDereferenceError(schema);
  return references[index];
}

class TypeDereferenceError extends TypeBoxError {
  schema;
  constructor(schema) {
    super(`Unable to dereference schema with \$id '${schema.$id}'`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/hash/hash.mjs
function* NumberToBytes(value3) {
  const byteCount = value3 === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value3) + 1) / 8);
  for (let i = 0;i < byteCount; i++) {
    yield value3 >> 8 * (byteCount - 1 - i) & 255;
  }
}
var ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Array);
  for (const item of value3) {
    Visit3(item);
  }
};
var BooleanType = function(value3) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value3 ? 1 : 0);
};
var BigIntType = function(value3) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var DateType2 = function(value3) {
  FNV1A64(ByteMarker.Date);
  Visit3(value3.getTime());
};
var NullType = function(value3) {
  FNV1A64(ByteMarker.Null);
};
var NumberType = function(value3) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var ObjectType2 = function(value3) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.getOwnPropertyNames(value3).sort()) {
    Visit3(key);
    Visit3(value3[key]);
  }
};
var StringType = function(value3) {
  FNV1A64(ByteMarker.String);
  for (let i = 0;i < value3.length; i++) {
    for (const byte of NumberToBytes(value3.charCodeAt(i))) {
      FNV1A64(byte);
    }
  }
};
var SymbolType = function(value3) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value3.description);
};
var Uint8ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0;i < value3.length; i++) {
    FNV1A64(value3[i]);
  }
};
var UndefinedType = function(value3) {
  return FNV1A64(ByteMarker.Undefined);
};
var Visit3 = function(value3) {
  if (IsArray(value3))
    return ArrayType2(value3);
  if (IsBoolean(value3))
    return BooleanType(value3);
  if (IsBigInt(value3))
    return BigIntType(value3);
  if (IsDate(value3))
    return DateType2(value3);
  if (IsNull(value3))
    return NullType(value3);
  if (IsNumber(value3))
    return NumberType(value3);
  if (IsStandardObject(value3))
    return ObjectType2(value3);
  if (IsString(value3))
    return StringType(value3);
  if (IsSymbol(value3))
    return SymbolType(value3);
  if (IsUint8Array(value3))
    return Uint8ArrayType2(value3);
  if (IsUndefined(value3))
    return UndefinedType(value3);
  throw new ValueHashError(value3);
};
var FNV1A64 = function(byte) {
  Accumulator = Accumulator ^ Bytes[byte];
  Accumulator = Accumulator * Prime % Size;
};
function Hash(value3) {
  Accumulator = BigInt("14695981039346656037");
  Visit3(value3);
  return Accumulator;
}

class ValueHashError extends TypeBoxError {
  value;
  constructor(value3) {
    super(`Unable to hash value`);
    this.value = value3;
  }
}
var ByteMarker;
(function(ByteMarker2) {
  ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
  ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
  ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
  ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
  ByteMarker2[ByteMarker2["String"] = 4] = "String";
  ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
  ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
  ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
  ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
  ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
  ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt("14695981039346656037");
var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
var EscapeKey = function(key) {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
};
var IsDefined = function(value3) {
  return value3 !== undefined;
};
var Create = function(errorType, schema, path, value3) {
  return { type: errorType, schema, path, value: value3, message: GetErrorFunction()({ errorType, path, schema, value: value3 }) };
};
function* FromAny(schema, references, path, value3) {
}
function* FromArray3(schema, references, path, value3) {
  if (!IsArray(value3)) {
    return yield Create(ValueErrorType.Array, schema, path, value3);
  }
  if (IsDefined(schema.minItems) && !(value3.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path, value3);
  }
  if (IsDefined(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path, value3);
  }
  for (let i = 0;i < value3.length; i++) {
    yield* Visit4(schema.items, references, `${path}/${i}`, value3[i]);
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value3);
  }
  if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4, index) => Visit4(containsSchema, references, `${path}${index}`, value4).next().done === true ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path, value3);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path, value3);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path, value3);
  }
}
function* FromAsyncIterator(schema, references, path, value3) {
  if (!IsAsyncIterator(value3))
    yield Create(ValueErrorType.AsyncIterator, schema, path, value3);
}
function* FromBigInt(schema, references, path, value3) {
  if (!IsBigInt(value3))
    return yield Create(ValueErrorType.BigInt, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value3);
  }
}
function* FromBoolean(schema, references, path, value3) {
  if (!IsBoolean(value3))
    yield Create(ValueErrorType.Boolean, schema, path, value3);
}
function* FromConstructor(schema, references, path, value3) {
  yield* Visit4(schema.returns, references, path, value3.prototype);
}
function* FromDate(schema, references, path, value3) {
  if (!IsDate(value3))
    return yield Create(ValueErrorType.Date, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value3);
  }
}
function* FromFunction(schema, references, path, value3) {
  if (!IsFunction(value3))
    yield Create(ValueErrorType.Function, schema, path, value3);
}
function* FromInteger(schema, references, path, value3) {
  if (!IsInteger(value3))
    return yield Create(ValueErrorType.Integer, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value3);
  }
}
function* FromIntersect3(schema, references, path, value3) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path, value3).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path, value3);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path}/${valueKey}`, value3);
      }
    }
  }
  if (typeof schema.unevaluatedProperties === "object") {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value3[valueKey]).next();
        if (!next.done)
          yield next.value;
      }
    }
  }
}
function* FromIterator(schema, references, path, value3) {
  if (!IsIterator(value3))
    yield Create(ValueErrorType.Iterator, schema, path, value3);
}
function* FromLiteral2(schema, references, path, value3) {
  if (!(value3 === schema.const))
    yield Create(ValueErrorType.Literal, schema, path, value3);
}
function* FromNever(schema, references, path, value3) {
  yield Create(ValueErrorType.Never, schema, path, value3);
}
function* FromNot(schema, references, path, value3) {
  if (Visit4(schema.not, references, path, value3).next().done === true)
    yield Create(ValueErrorType.Not, schema, path, value3);
}
function* FromNull(schema, references, path, value3) {
  if (!IsNull(value3))
    yield Create(ValueErrorType.Null, schema, path, value3);
}
function* FromNumber(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return yield Create(ValueErrorType.Number, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path, value3);
  }
}
function* FromObject(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value3);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey))
      continue;
    yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path}/${EscapeKey(requiredKey)}`, undefined);
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
      }
    }
  }
  if (typeof schema.additionalProperties === "object") {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey))
        continue;
      yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value3)) {
        yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path}/${EscapeKey(knownKey)}`, undefined);
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey)) {
        yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      }
    }
  }
}
function* FromPromise(schema, references, path, value3) {
  if (!IsPromise(value3))
    yield Create(ValueErrorType.Promise, schema, path, value3);
}
function* FromRecord(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value3)) {
    if (regex.test(propertyKey))
      yield* Visit4(patternSchema, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
  }
  if (typeof schema.additionalProperties === "object") {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (!regex.test(propertyKey))
        yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (regex.test(propertyKey))
        continue;
      return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
}
function* FromRef(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromRegExp(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  const regex = new RegExp(schema.source, schema.flags);
  if (!regex.test(value3)) {
    return yield Create(ValueErrorType.RegExp, schema, path, value3);
  }
}
function* FromString(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  if (IsString(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value3);
    }
  }
  if (IsString(schema.format)) {
    if (!exports_format.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path, value3);
    } else {
      const format = exports_format.Get(schema.format);
      if (!format(value3)) {
        yield Create(ValueErrorType.StringFormat, schema, path, value3);
      }
    }
  }
}
function* FromSymbol(schema, references, path, value3) {
  if (!IsSymbol(value3))
    yield Create(ValueErrorType.Symbol, schema, path, value3);
}
function* FromTemplateLiteral2(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  const regex = new RegExp(schema.pattern);
  if (!regex.test(value3)) {
    yield Create(ValueErrorType.StringPattern, schema, path, value3);
  }
}
function* FromThis(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromTuple3(schema, references, path, value3) {
  if (!IsArray(value3))
    return yield Create(ValueErrorType.Tuple, schema, path, value3);
  if (schema.items === undefined && !(value3.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!(value3.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0;i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path}/${i}`, value3[i]);
  }
}
function* FromUndefined(schema, references, path, value3) {
  if (!IsUndefined(value3))
    yield Create(ValueErrorType.Undefined, schema, path, value3);
}
function* FromUnion5(schema, references, path, value3) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors2 = [...Visit4(subschema, references, path, value3)];
    if (errors2.length === 0)
      return;
    count += errors2.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path, value3);
  }
}
function* FromUint8Array(schema, references, path, value3) {
  if (!IsUint8Array(value3))
    return yield Create(ValueErrorType.Uint8Array, schema, path, value3);
  if (IsDefined(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value3);
  }
  if (IsDefined(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value3);
  }
}
function* FromUnknown(schema, references, path, value3) {
}
function* FromVoid(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsVoidLike(value3))
    yield Create(ValueErrorType.Void, schema, path, value3);
}
function* FromKind(schema, references, path, value3) {
  const check = exports_type.Get(schema[Kind]);
  if (!check(schema, value3))
    yield Create(ValueErrorType.Kind, schema, path, value3);
}
function* Visit4(schema, references, path, value3) {
  const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return yield* FromAny(schema_, references_, path, value3);
    case "Array":
      return yield* FromArray3(schema_, references_, path, value3);
    case "AsyncIterator":
      return yield* FromAsyncIterator(schema_, references_, path, value3);
    case "BigInt":
      return yield* FromBigInt(schema_, references_, path, value3);
    case "Boolean":
      return yield* FromBoolean(schema_, references_, path, value3);
    case "Constructor":
      return yield* FromConstructor(schema_, references_, path, value3);
    case "Date":
      return yield* FromDate(schema_, references_, path, value3);
    case "Function":
      return yield* FromFunction(schema_, references_, path, value3);
    case "Integer":
      return yield* FromInteger(schema_, references_, path, value3);
    case "Intersect":
      return yield* FromIntersect3(schema_, references_, path, value3);
    case "Iterator":
      return yield* FromIterator(schema_, references_, path, value3);
    case "Literal":
      return yield* FromLiteral2(schema_, references_, path, value3);
    case "Never":
      return yield* FromNever(schema_, references_, path, value3);
    case "Not":
      return yield* FromNot(schema_, references_, path, value3);
    case "Null":
      return yield* FromNull(schema_, references_, path, value3);
    case "Number":
      return yield* FromNumber(schema_, references_, path, value3);
    case "Object":
      return yield* FromObject(schema_, references_, path, value3);
    case "Promise":
      return yield* FromPromise(schema_, references_, path, value3);
    case "Record":
      return yield* FromRecord(schema_, references_, path, value3);
    case "Ref":
      return yield* FromRef(schema_, references_, path, value3);
    case "RegExp":
      return yield* FromRegExp(schema_, references_, path, value3);
    case "String":
      return yield* FromString(schema_, references_, path, value3);
    case "Symbol":
      return yield* FromSymbol(schema_, references_, path, value3);
    case "TemplateLiteral":
      return yield* FromTemplateLiteral2(schema_, references_, path, value3);
    case "This":
      return yield* FromThis(schema_, references_, path, value3);
    case "Tuple":
      return yield* FromTuple3(schema_, references_, path, value3);
    case "Undefined":
      return yield* FromUndefined(schema_, references_, path, value3);
    case "Union":
      return yield* FromUnion5(schema_, references_, path, value3);
    case "Uint8Array":
      return yield* FromUint8Array(schema_, references_, path, value3);
    case "Unknown":
      return yield* FromUnknown(schema_, references_, path, value3);
    case "Void":
      return yield* FromVoid(schema_, references_, path, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path, value3);
  }
}
function Errors(...args) {
  const iterator3 = args.length === 3 ? Visit4(args[0], args[1], "", args[2]) : Visit4(args[0], [], "", args[1]);
  return new ValueErrorIterator(iterator3);
}
var ValueErrorType;
(function(ValueErrorType2) {
  ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
  ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
  ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
  ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
  ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
  ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
  ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
  ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
  ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
  ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
  ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
  ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
  ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
  ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
  ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
  ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
  ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
  ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
  ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
  ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
  ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
  ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
  ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
  ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
  ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
  ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
  ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
  ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
  ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
  ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
  ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
  ValueErrorType2[ValueErrorType2["RegExp"] = 48] = "RegExp";
  ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 49] = "StringFormatUnknown";
  ValueErrorType2[ValueErrorType2["StringFormat"] = 50] = "StringFormat";
  ValueErrorType2[ValueErrorType2["StringMaxLength"] = 51] = "StringMaxLength";
  ValueErrorType2[ValueErrorType2["StringMinLength"] = 52] = "StringMinLength";
  ValueErrorType2[ValueErrorType2["StringPattern"] = 53] = "StringPattern";
  ValueErrorType2[ValueErrorType2["String"] = 54] = "String";
  ValueErrorType2[ValueErrorType2["Symbol"] = 55] = "Symbol";
  ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
  ValueErrorType2[ValueErrorType2["Tuple"] = 57] = "Tuple";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 58] = "Uint8ArrayMaxByteLength";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 59] = "Uint8ArrayMinByteLength";
  ValueErrorType2[ValueErrorType2["Uint8Array"] = 60] = "Uint8Array";
  ValueErrorType2[ValueErrorType2["Undefined"] = 61] = "Undefined";
  ValueErrorType2[ValueErrorType2["Union"] = 62] = "Union";
  ValueErrorType2[ValueErrorType2["Void"] = 63] = "Void";
})(ValueErrorType || (ValueErrorType = {}));

class ValueErrorsUnknownTypeError extends TypeBoxError {
  schema;
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
}

class ValueErrorIterator {
  iterator;
  constructor(iterator3) {
    this.iterator = iterator3;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const next = this.iterator.next();
    return next.done ? undefined : next.value;
  }
}
// node_modules/@sinclair/typebox/build/esm/type/any/any.mjs
function Any(options = {}) {
  return { ...options, [Kind]: "Any" };
}
// node_modules/@sinclair/typebox/build/esm/type/unknown/unknown.mjs
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: "Unknown"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/type.mjs
var exports_type2 = {};
__export(exports_type2, {
  TypeGuardUnknownTypeError: () => {
    {
      return TypeGuardUnknownTypeError;
    }
  },
  IsVoid: () => {
    {
      return IsVoid2;
    }
  },
  IsUnsafe: () => {
    {
      return IsUnsafe2;
    }
  },
  IsUnknown: () => {
    {
      return IsUnknown2;
    }
  },
  IsUnionLiteral: () => {
    {
      return IsUnionLiteral;
    }
  },
  IsUnion: () => {
    {
      return IsUnion2;
    }
  },
  IsUndefined: () => {
    {
      return IsUndefined4;
    }
  },
  IsUint8Array: () => {
    {
      return IsUint8Array4;
    }
  },
  IsTuple: () => {
    {
      return IsTuple2;
    }
  },
  IsTransform: () => {
    {
      return IsTransform2;
    }
  },
  IsThis: () => {
    {
      return IsThis2;
    }
  },
  IsTemplateLiteral: () => {
    {
      return IsTemplateLiteral2;
    }
  },
  IsSymbol: () => {
    {
      return IsSymbol4;
    }
  },
  IsString: () => {
    {
      return IsString4;
    }
  },
  IsSchema: () => {
    {
      return IsSchema2;
    }
  },
  IsRegExp: () => {
    {
      return IsRegExp3;
    }
  },
  IsRef: () => {
    {
      return IsRef2;
    }
  },
  IsRecursive: () => {
    {
      return IsRecursive;
    }
  },
  IsRecord: () => {
    {
      return IsRecord2;
    }
  },
  IsReadonly: () => {
    {
      return IsReadonly2;
    }
  },
  IsProperties: () => {
    {
      return IsProperties;
    }
  },
  IsPromise: () => {
    {
      return IsPromise3;
    }
  },
  IsOptional: () => {
    {
      return IsOptional2;
    }
  },
  IsObject: () => {
    {
      return IsObject4;
    }
  },
  IsNumber: () => {
    {
      return IsNumber4;
    }
  },
  IsNull: () => {
    {
      return IsNull4;
    }
  },
  IsNot: () => {
    {
      return IsNot2;
    }
  },
  IsNever: () => {
    {
      return IsNever2;
    }
  },
  IsMappedResult: () => {
    {
      return IsMappedResult2;
    }
  },
  IsMappedKey: () => {
    {
      return IsMappedKey2;
    }
  },
  IsLiteralValue: () => {
    {
      return IsLiteralValue;
    }
  },
  IsLiteralString: () => {
    {
      return IsLiteralString;
    }
  },
  IsLiteralNumber: () => {
    {
      return IsLiteralNumber;
    }
  },
  IsLiteralBoolean: () => {
    {
      return IsLiteralBoolean;
    }
  },
  IsLiteral: () => {
    {
      return IsLiteral2;
    }
  },
  IsKindOf: () => {
    {
      return IsKindOf2;
    }
  },
  IsKind: () => {
    {
      return IsKind2;
    }
  },
  IsIterator: () => {
    {
      return IsIterator4;
    }
  },
  IsIntersect: () => {
    {
      return IsIntersect2;
    }
  },
  IsInteger: () => {
    {
      return IsInteger3;
    }
  },
  IsFunction: () => {
    {
      return IsFunction4;
    }
  },
  IsDate: () => {
    {
      return IsDate4;
    }
  },
  IsConstructor: () => {
    {
      return IsConstructor2;
    }
  },
  IsBoolean: () => {
    {
      return IsBoolean4;
    }
  },
  IsBigInt: () => {
    {
      return IsBigInt4;
    }
  },
  IsAsyncIterator: () => {
    {
      return IsAsyncIterator4;
    }
  },
  IsArray: () => {
    {
      return IsArray4;
    }
  },
  IsAny: () => {
    {
      return IsAny2;
    }
  }
});
var IsPattern = function(value3) {
  try {
    new RegExp(value3);
    return true;
  } catch {
    return false;
  }
};
var IsControlCharacterFree = function(value3) {
  if (!IsString2(value3))
    return false;
  for (let i = 0;i < value3.length; i++) {
    const code = value3.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
};
var IsAdditionalProperties = function(value3) {
  return IsOptionalBoolean(value3) || IsSchema2(value3);
};
var IsOptionalBigInt = function(value3) {
  return IsUndefined2(value3) || IsBigInt2(value3);
};
var IsOptionalNumber = function(value3) {
  return IsUndefined2(value3) || IsNumber2(value3);
};
var IsOptionalBoolean = function(value3) {
  return IsUndefined2(value3) || IsBoolean2(value3);
};
var IsOptionalString = function(value3) {
  return IsUndefined2(value3) || IsString2(value3);
};
var IsOptionalPattern = function(value3) {
  return IsUndefined2(value3) || IsString2(value3) && IsControlCharacterFree(value3) && IsPattern(value3);
};
var IsOptionalFormat = function(value3) {
  return IsUndefined2(value3) || IsString2(value3) && IsControlCharacterFree(value3);
};
var IsOptionalSchema = function(value3) {
  return IsUndefined2(value3) || IsSchema2(value3);
};
function IsReadonly2(value3) {
  return IsObject2(value3) && value3[ReadonlyKind] === "Readonly";
}
function IsOptional2(value3) {
  return IsObject2(value3) && value3[OptionalKind] === "Optional";
}
function IsAny2(value3) {
  return IsKindOf2(value3, "Any") && IsOptionalString(value3.$id);
}
function IsArray4(value3) {
  return IsKindOf2(value3, "Array") && value3.type === "array" && IsOptionalString(value3.$id) && IsSchema2(value3.items) && IsOptionalNumber(value3.minItems) && IsOptionalNumber(value3.maxItems) && IsOptionalBoolean(value3.uniqueItems) && IsOptionalSchema(value3.contains) && IsOptionalNumber(value3.minContains) && IsOptionalNumber(value3.maxContains);
}
function IsAsyncIterator4(value3) {
  return IsKindOf2(value3, "AsyncIterator") && value3.type === "AsyncIterator" && IsOptionalString(value3.$id) && IsSchema2(value3.items);
}
function IsBigInt4(value3) {
  return IsKindOf2(value3, "BigInt") && value3.type === "bigint" && IsOptionalString(value3.$id) && IsOptionalBigInt(value3.exclusiveMaximum) && IsOptionalBigInt(value3.exclusiveMinimum) && IsOptionalBigInt(value3.maximum) && IsOptionalBigInt(value3.minimum) && IsOptionalBigInt(value3.multipleOf);
}
function IsBoolean4(value3) {
  return IsKindOf2(value3, "Boolean") && value3.type === "boolean" && IsOptionalString(value3.$id);
}
function IsConstructor2(value3) {
  return IsKindOf2(value3, "Constructor") && value3.type === "Constructor" && IsOptionalString(value3.$id) && IsArray2(value3.parameters) && value3.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value3.returns);
}
function IsDate4(value3) {
  return IsKindOf2(value3, "Date") && value3.type === "Date" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximumTimestamp) && IsOptionalNumber(value3.exclusiveMinimumTimestamp) && IsOptionalNumber(value3.maximumTimestamp) && IsOptionalNumber(value3.minimumTimestamp) && IsOptionalNumber(value3.multipleOfTimestamp);
}
function IsFunction4(value3) {
  return IsKindOf2(value3, "Function") && value3.type === "Function" && IsOptionalString(value3.$id) && IsArray2(value3.parameters) && value3.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value3.returns);
}
function IsInteger3(value3) {
  return IsKindOf2(value3, "Integer") && value3.type === "integer" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximum) && IsOptionalNumber(value3.exclusiveMinimum) && IsOptionalNumber(value3.maximum) && IsOptionalNumber(value3.minimum) && IsOptionalNumber(value3.multipleOf);
}
function IsProperties(value3) {
  return IsObject2(value3) && Object.entries(value3).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema2(schema));
}
function IsIntersect2(value3) {
  return IsKindOf2(value3, "Intersect") && (IsString2(value3.type) && value3.type !== "object" ? false : true) && IsArray2(value3.allOf) && value3.allOf.every((schema) => IsSchema2(schema) && !IsTransform2(schema)) && IsOptionalString(value3.type) && (IsOptionalBoolean(value3.unevaluatedProperties) || IsOptionalSchema(value3.unevaluatedProperties)) && IsOptionalString(value3.$id);
}
function IsIterator4(value3) {
  return IsKindOf2(value3, "Iterator") && value3.type === "Iterator" && IsOptionalString(value3.$id) && IsSchema2(value3.items);
}
function IsKindOf2(value3, kind14) {
  return IsObject2(value3) && Kind in value3 && value3[Kind] === kind14;
}
function IsLiteralString(value3) {
  return IsLiteral2(value3) && IsString2(value3.const);
}
function IsLiteralNumber(value3) {
  return IsLiteral2(value3) && IsNumber2(value3.const);
}
function IsLiteralBoolean(value3) {
  return IsLiteral2(value3) && IsBoolean2(value3.const);
}
function IsLiteral2(value3) {
  return IsKindOf2(value3, "Literal") && IsOptionalString(value3.$id) && IsLiteralValue(value3.const);
}
function IsLiteralValue(value3) {
  return IsBoolean2(value3) || IsNumber2(value3) || IsString2(value3);
}
function IsMappedKey2(value3) {
  return IsKindOf2(value3, "MappedKey") && IsArray2(value3.keys) && value3.keys.every((key) => IsNumber2(key) || IsString2(key));
}
function IsMappedResult2(value3) {
  return IsKindOf2(value3, "MappedResult") && IsProperties(value3.properties);
}
function IsNever2(value3) {
  return IsKindOf2(value3, "Never") && IsObject2(value3.not) && Object.getOwnPropertyNames(value3.not).length === 0;
}
function IsNot2(value3) {
  return IsKindOf2(value3, "Not") && IsSchema2(value3.not);
}
function IsNull4(value3) {
  return IsKindOf2(value3, "Null") && value3.type === "null" && IsOptionalString(value3.$id);
}
function IsNumber4(value3) {
  return IsKindOf2(value3, "Number") && value3.type === "number" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximum) && IsOptionalNumber(value3.exclusiveMinimum) && IsOptionalNumber(value3.maximum) && IsOptionalNumber(value3.minimum) && IsOptionalNumber(value3.multipleOf);
}
function IsObject4(value3) {
  return IsKindOf2(value3, "Object") && value3.type === "object" && IsOptionalString(value3.$id) && IsProperties(value3.properties) && IsAdditionalProperties(value3.additionalProperties) && IsOptionalNumber(value3.minProperties) && IsOptionalNumber(value3.maxProperties);
}
function IsPromise3(value3) {
  return IsKindOf2(value3, "Promise") && value3.type === "Promise" && IsOptionalString(value3.$id) && IsSchema2(value3.item);
}
function IsRecord2(value3) {
  return IsKindOf2(value3, "Record") && value3.type === "object" && IsOptionalString(value3.$id) && IsAdditionalProperties(value3.additionalProperties) && IsObject2(value3.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject2(schema.patternProperties) && IsSchema2(schema.patternProperties[keys[0]]);
  })(value3);
}
function IsRecursive(value3) {
  return IsObject2(value3) && Hint in value3 && value3[Hint] === "Recursive";
}
function IsRef2(value3) {
  return IsKindOf2(value3, "Ref") && IsOptionalString(value3.$id) && IsString2(value3.$ref);
}
function IsRegExp3(value3) {
  return IsKindOf2(value3, "RegExp") && IsOptionalString(value3.$id) && IsString2(value3.source) && IsString2(value3.flags) && IsOptionalNumber(value3.maxLength) && IsOptionalNumber(value3.minLength);
}
function IsString4(value3) {
  return IsKindOf2(value3, "String") && value3.type === "string" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.minLength) && IsOptionalNumber(value3.maxLength) && IsOptionalPattern(value3.pattern) && IsOptionalFormat(value3.format);
}
function IsSymbol4(value3) {
  return IsKindOf2(value3, "Symbol") && value3.type === "symbol" && IsOptionalString(value3.$id);
}
function IsTemplateLiteral2(value3) {
  return IsKindOf2(value3, "TemplateLiteral") && value3.type === "string" && IsString2(value3.pattern) && value3.pattern[0] === "^" && value3.pattern[value3.pattern.length - 1] === "$";
}
function IsThis2(value3) {
  return IsKindOf2(value3, "This") && IsOptionalString(value3.$id) && IsString2(value3.$ref);
}
function IsTransform2(value3) {
  return IsObject2(value3) && TransformKind in value3;
}
function IsTuple2(value3) {
  return IsKindOf2(value3, "Tuple") && value3.type === "array" && IsOptionalString(value3.$id) && IsNumber2(value3.minItems) && IsNumber2(value3.maxItems) && value3.minItems === value3.maxItems && (IsUndefined2(value3.items) && IsUndefined2(value3.additionalItems) && value3.minItems === 0 || IsArray2(value3.items) && value3.items.every((schema) => IsSchema2(schema)));
}
function IsUndefined4(value3) {
  return IsKindOf2(value3, "Undefined") && value3.type === "undefined" && IsOptionalString(value3.$id);
}
function IsUnionLiteral(value3) {
  return IsUnion2(value3) && value3.anyOf.every((schema) => IsLiteralString(schema) || IsLiteralNumber(schema));
}
function IsUnion2(value3) {
  return IsKindOf2(value3, "Union") && IsOptionalString(value3.$id) && IsObject2(value3) && IsArray2(value3.anyOf) && value3.anyOf.every((schema) => IsSchema2(schema));
}
function IsUint8Array4(value3) {
  return IsKindOf2(value3, "Uint8Array") && value3.type === "Uint8Array" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.minByteLength) && IsOptionalNumber(value3.maxByteLength);
}
function IsUnknown2(value3) {
  return IsKindOf2(value3, "Unknown") && IsOptionalString(value3.$id);
}
function IsUnsafe2(value3) {
  return IsKindOf2(value3, "Unsafe");
}
function IsVoid2(value3) {
  return IsKindOf2(value3, "Void") && value3.type === "void" && IsOptionalString(value3.$id);
}
function IsKind2(value3) {
  return IsObject2(value3) && Kind in value3 && IsString2(value3[Kind]) && !KnownTypes.includes(value3[Kind]);
}
function IsSchema2(value3) {
  return IsObject2(value3) && (IsAny2(value3) || IsArray4(value3) || IsBoolean4(value3) || IsBigInt4(value3) || IsAsyncIterator4(value3) || IsConstructor2(value3) || IsDate4(value3) || IsFunction4(value3) || IsInteger3(value3) || IsIntersect2(value3) || IsIterator4(value3) || IsLiteral2(value3) || IsMappedKey2(value3) || IsMappedResult2(value3) || IsNever2(value3) || IsNot2(value3) || IsNull4(value3) || IsNumber4(value3) || IsObject4(value3) || IsPromise3(value3) || IsRecord2(value3) || IsRef2(value3) || IsRegExp3(value3) || IsString4(value3) || IsSymbol4(value3) || IsTemplateLiteral2(value3) || IsThis2(value3) || IsTuple2(value3) || IsUndefined4(value3) || IsUnion2(value3) || IsUint8Array4(value3) || IsUnknown2(value3) || IsUnsafe2(value3) || IsVoid2(value3) || IsKind2(value3));
}

class TypeGuardUnknownTypeError extends TypeBoxError {
}
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
var IntoBooleanResult = function(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
};
var Throw = function(message) {
  throw new ExtendsResolverError(message);
};
var IsStructuralRight = function(right) {
  return exports_type2.IsNever(right) || exports_type2.IsIntersect(right) || exports_type2.IsUnion(right) || exports_type2.IsUnknown(right) || exports_type2.IsAny(right);
};
var StructuralRight = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : Throw("StructuralRight");
};
var FromAnyRight = function(left, right) {
  return ExtendsResult.True;
};
var FromAny2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) && right.anyOf.some((schema) => exports_type2.IsAny(schema) || exports_type2.IsUnknown(schema)) ? ExtendsResult.True : exports_type2.IsUnion(right) ? ExtendsResult.Union : exports_type2.IsUnknown(right) ? ExtendsResult.True : exports_type2.IsAny(right) ? ExtendsResult.True : ExtendsResult.Union;
};
var FromArrayRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromArray4 = function(left, right) {
  return exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsArray(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromAsyncIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsAsyncIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromBigInt2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBigInt(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBooleanRight = function(left, right) {
  return exports_type2.IsLiteralBoolean(left) ? ExtendsResult.True : exports_type2.IsBoolean(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBoolean2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBoolean(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromConstructor2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsConstructor(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromDate2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsDate(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromFunction2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsFunction(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromIntegerRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsNumber(left.const) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromInteger2 = function(left, right) {
  return exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : ExtendsResult.False;
};
var FromIntersectRight = function(left, right) {
  return right.allOf.every((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIntersect4 = function(left, right) {
  return left.allOf.some((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromLiteral3 = function(left, right) {
  return exports_type2.IsLiteral(right) && right.const === left.const ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : ExtendsResult.False;
};
var FromNeverRight = function(left, right) {
  return ExtendsResult.False;
};
var FromNever2 = function(left, right) {
  return ExtendsResult.True;
};
var UnwrapTNot = function(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!exports_type2.IsNot(current))
      break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
};
var FromNot2 = function(left, right) {
  return exports_type2.IsNot(left) ? Visit5(UnwrapTNot(left), right) : exports_type2.IsNot(right) ? Visit5(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
};
var FromNull2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsNull(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumberRight = function(left, right) {
  return exports_type2.IsLiteralNumber(left) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumber2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : ExtendsResult.False;
};
var IsObjectPropertyCount = function(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
};
var IsObjectStringLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectSymbolLike = function(schema) {
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && exports_type2.IsUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (exports_type2.IsString(schema.properties.description.anyOf[0]) && exports_type2.IsUndefined(schema.properties.description.anyOf[1]) || exports_type2.IsString(schema.properties.description.anyOf[1]) && exports_type2.IsUndefined(schema.properties.description.anyOf[0]));
};
var IsObjectNumberLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBooleanLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBigIntLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectDateLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectUint8ArrayLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectFunctionLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectConstructorLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectArrayLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectPromiseLike = function(schema) {
  const then = Function2([Any()], Any());
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit5(schema.properties["then"], then)) === ExtendsResult.True;
};
var Property = function(left, right) {
  return Visit5(left, right) === ExtendsResult.False ? ExtendsResult.False : exports_type2.IsOptional(left) && !exports_type2.IsOptional(right) ? ExtendsResult.False : ExtendsResult.True;
};
var FromObjectRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) || exports_type2.IsLiteralString(left) && IsObjectStringLike(right) || exports_type2.IsLiteralNumber(left) && IsObjectNumberLike(right) || exports_type2.IsLiteralBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsBigInt(left) && IsObjectBigIntLike(right) || exports_type2.IsString(left) && IsObjectStringLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsNumber(left) && IsObjectNumberLike(right) || exports_type2.IsInteger(left) && IsObjectNumberLike(right) || exports_type2.IsBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsUint8Array(left) && IsObjectUint8ArrayLike(right) || exports_type2.IsDate(left) && IsObjectDateLike(right) || exports_type2.IsConstructor(left) && IsObjectConstructorLike(right) || exports_type2.IsFunction(left) && IsObjectFunctionLike(right) ? ExtendsResult.True : exports_type2.IsRecord(left) && exports_type2.IsString(RecordKey(left)) ? (() => {
    return right[Hint] === "Record" ? ExtendsResult.True : ExtendsResult.False;
  })() : exports_type2.IsRecord(left) && exports_type2.IsNumber(RecordKey(left)) ? (() => {
    return IsObjectPropertyCount(right, 0) ? ExtendsResult.True : ExtendsResult.False;
  })() : ExtendsResult.False;
};
var FromObject2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : !exports_type2.IsObject(right) ? ExtendsResult.False : (() => {
    for (const key of Object.getOwnPropertyNames(right.properties)) {
      if (!(key in left.properties) && !exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.False;
      }
      if (exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.True;
      }
      if (Property(left.properties[key], right.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })();
};
var FromPromise2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectPromiseLike(right) ? ExtendsResult.True : !exports_type2.IsPromise(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.item, right.item));
};
var RecordKey = function(schema) {
  return PatternNumberExact in schema.patternProperties ? Number2() : (PatternStringExact in schema.patternProperties) ? String2() : Throw("Unknown record key pattern");
};
var RecordValue = function(schema) {
  return PatternNumberExact in schema.patternProperties ? schema.patternProperties[PatternNumberExact] : (PatternStringExact in schema.patternProperties) ? schema.patternProperties[PatternStringExact] : Throw("Unable to get record value schema");
};
var FromRecordRight = function(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return exports_type2.IsLiteralString(left) && exports_type2.IsNumber(Key) && IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True ? ExtendsResult.True : exports_type2.IsUint8Array(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsString(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsArray(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsObject(left) ? (() => {
    for (const key of Object.getOwnPropertyNames(left.properties)) {
      if (Property(Value, left.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })() : ExtendsResult.False;
};
var FromRecord2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsRecord(right) ? ExtendsResult.False : Visit5(RecordValue(left), RecordValue(right));
};
var FromRegExp2 = function(left, right) {
  const L = exports_type2.IsRegExp(left) ? String2() : left;
  const R = exports_type2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
};
var FromStringRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsString(left.const) ? ExtendsResult.True : exports_type2.IsString(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromString2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromSymbol2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsSymbol(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromTemplateLiteral3 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) ? Visit5(TemplateLiteralToUnion(left), right) : exports_type2.IsTemplateLiteral(right) ? Visit5(left, TemplateLiteralToUnion(right)) : Throw("Invalid fallthrough for TemplateLiteral");
};
var IsArrayOfTuple = function(left, right) {
  return exports_type2.IsArray(right) && left.items !== undefined && left.items.every((schema) => Visit5(schema, right.items) === ExtendsResult.True);
};
var FromTupleRight = function(left, right) {
  return exports_type2.IsNever(left) ? ExtendsResult.True : exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : ExtendsResult.False;
};
var FromTuple4 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : exports_type2.IsArray(right) && IsArrayOfTuple(left, right) ? ExtendsResult.True : !exports_type2.IsTuple(right) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) || !exports_value.IsUndefined(left.items) && exports_value.IsUndefined(right.items) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) ? ExtendsResult.True : left.items.every((schema, index) => Visit5(schema, right.items[index]) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUint8Array2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsUint8Array(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUndefined2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsVoid(right) ? FromVoidRight(left, right) : exports_type2.IsUndefined(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnionRight = function(left, right) {
  return right.anyOf.some((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnion6 = function(left, right) {
  return left.anyOf.every((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnknownRight = function(left, right) {
  return ExtendsResult.True;
};
var FromUnknown2 = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : exports_type2.IsArray(right) ? FromArrayRight(left, right) : exports_type2.IsTuple(right) ? FromTupleRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsUnknown(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoidRight = function(left, right) {
  return exports_type2.IsUndefined(left) ? ExtendsResult.True : exports_type2.IsUndefined(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoid2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsVoid(right) ? ExtendsResult.True : ExtendsResult.False;
};
var Visit5 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) || exports_type2.IsTemplateLiteral(right) ? FromTemplateLiteral3(left, right) : exports_type2.IsRegExp(left) || exports_type2.IsRegExp(right) ? FromRegExp2(left, right) : exports_type2.IsNot(left) || exports_type2.IsNot(right) ? FromNot2(left, right) : exports_type2.IsAny(left) ? FromAny2(left, right) : exports_type2.IsArray(left) ? FromArray4(left, right) : exports_type2.IsBigInt(left) ? FromBigInt2(left, right) : exports_type2.IsBoolean(left) ? FromBoolean2(left, right) : exports_type2.IsAsyncIterator(left) ? FromAsyncIterator2(left, right) : exports_type2.IsConstructor(left) ? FromConstructor2(left, right) : exports_type2.IsDate(left) ? FromDate2(left, right) : exports_type2.IsFunction(left) ? FromFunction2(left, right) : exports_type2.IsInteger(left) ? FromInteger2(left, right) : exports_type2.IsIntersect(left) ? FromIntersect4(left, right) : exports_type2.IsIterator(left) ? FromIterator2(left, right) : exports_type2.IsLiteral(left) ? FromLiteral3(left, right) : exports_type2.IsNever(left) ? FromNever2(left, right) : exports_type2.IsNull(left) ? FromNull2(left, right) : exports_type2.IsNumber(left) ? FromNumber2(left, right) : exports_type2.IsObject(left) ? FromObject2(left, right) : exports_type2.IsRecord(left) ? FromRecord2(left, right) : exports_type2.IsString(left) ? FromString2(left, right) : exports_type2.IsSymbol(left) ? FromSymbol2(left, right) : exports_type2.IsTuple(left) ? FromTuple4(left, right) : exports_type2.IsPromise(left) ? FromPromise2(left, right) : exports_type2.IsUint8Array(left) ? FromUint8Array2(left, right) : exports_type2.IsUndefined(left) ? FromUndefined2(left, right) : exports_type2.IsUnion(left) ? FromUnion6(left, right) : exports_type2.IsUnknown(left) ? FromUnknown2(left, right) : exports_type2.IsVoid(left) ? FromVoid2(left, right) : Throw(`Unknown left type operand '${left[Kind]}'`);
};
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}

class ExtendsResolverError extends TypeBoxError {
}
var ExtendsResult;
(function(ExtendsResult2) {
  ExtendsResult2[ExtendsResult2["Union"] = 0] = "Union";
  ExtendsResult2[ExtendsResult2["True"] = 1] = "True";
  ExtendsResult2[ExtendsResult2["False"] = 2] = "False";
})(ExtendsResult || (ExtendsResult = {}));
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-result.mjs
var FromProperties7 = function(P, Right, True, False, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extends(P[K2], Right, True, False, options);
  return Acc;
};
var FromMappedResult6 = function(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
};
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
var ExtendsResolve = function(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union ? Union([trueType, falseType]) : R === ExtendsResult.True ? trueType : falseType;
};
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L) ? ExtendsFromMappedResult(L, R, T, F, options) : IsMappedKey(L) ? CloneType(ExtendsFromMappedKey(L, R, T, F, options)) : CloneType(ExtendsResolve(L, R, T, F), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
var FromPropertyKey = function(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options)
  };
};
var FromPropertyKeys = function(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
};
var FromMappedKey2 = function(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
};
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
var IsAnyOrUnknown = function(schema) {
  return schema[Kind] === "Any" || schema[Kind] === "Unknown";
};
var IsDefined2 = function(value3) {
  return value3 !== undefined;
};
var FromAny3 = function(schema, references, value3) {
  return true;
};
var FromArray5 = function(schema, references, value3) {
  if (!IsArray(value3))
    return false;
  if (IsDefined2(schema.minItems) && !(value3.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    return false;
  }
  if (!value3.every((value4) => Visit6(schema.items, references, value4))) {
    return false;
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    return false;
  }
  if (!(IsDefined2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4) => Visit6(containsSchema, references, value4) ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
};
var FromAsyncIterator3 = function(schema, references, value3) {
  return IsAsyncIterator(value3);
};
var FromBigInt3 = function(schema, references, value3) {
  if (!IsBigInt(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    return false;
  }
  return true;
};
var FromBoolean3 = function(schema, references, value3) {
  return IsBoolean(value3);
};
var FromConstructor3 = function(schema, references, value3) {
  return Visit6(schema.returns, references, value3.prototype);
};
var FromDate3 = function(schema, references, value3) {
  if (!IsDate(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    return false;
  }
  return true;
};
var FromFunction3 = function(schema, references, value3) {
  return IsFunction(value3);
};
var FromInteger3 = function(schema, references, value3) {
  if (!IsInteger(value3)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromIntersect5 = function(schema, references, value3) {
  const check1 = schema.allOf.every((schema2) => Visit6(schema2, references, value3));
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyPattern.test(key));
    return check1 && check2;
  } else if (IsSchema2(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyCheck.test(key) || Visit6(schema.unevaluatedProperties, references, value3[key]));
    return check1 && check2;
  } else {
    return check1;
  }
};
var FromIterator3 = function(schema, references, value3) {
  return IsIterator(value3);
};
var FromLiteral4 = function(schema, references, value3) {
  return value3 === schema.const;
};
var FromNever3 = function(schema, references, value3) {
  return false;
};
var FromNot3 = function(schema, references, value3) {
  return !Visit6(schema.not, references, value3);
};
var FromNull3 = function(schema, references, value3) {
  return IsNull(value3);
};
var FromNumber3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromObject3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return false;
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value3[knownKey])) {
        return false;
      }
      if ((ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) && !(knownKey in value3)) {
        return false;
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey) && !Visit6(property, references, value3[knownKey])) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value3);
    if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === "object") {
    const valueKeys = Object.getOwnPropertyNames(value3);
    return valueKeys.every((key) => knownKeys.includes(key) || Visit6(schema.additionalProperties, references, value3[key]));
  } else {
    return true;
  }
};
var FromPromise3 = function(schema, references, value3) {
  return IsPromise(value3);
};
var FromRecord3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3)) {
    return false;
  }
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  const check1 = Object.entries(value3).every(([key, value4]) => {
    return regex.test(key) ? Visit6(patternSchema, references, value4) : true;
  });
  const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value3).every(([key, value4]) => {
    return !regex.test(key) ? Visit6(schema.additionalProperties, references, value4) : true;
  }) : true;
  const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value3).every((key) => {
    return regex.test(key);
  }) : true;
  return check1 && check2 && check3;
};
var FromRef2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromRegExp3 = function(schema, references, value3) {
  const regex = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  return regex.test(value3);
};
var FromString3 = function(schema, references, value3) {
  if (!IsString(value3)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3))
      return false;
  }
  if (IsDefined2(schema.format)) {
    if (!exports_format.Has(schema.format))
      return false;
    const func = exports_format.Get(schema.format);
    return func(value3);
  }
  return true;
};
var FromSymbol3 = function(schema, references, value3) {
  return IsSymbol(value3);
};
var FromTemplateLiteral4 = function(schema, references, value3) {
  return IsString(value3) && new RegExp(schema.pattern).test(value3);
};
var FromThis2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromTuple5 = function(schema, references, value3) {
  if (!IsArray(value3)) {
    return false;
  }
  if (schema.items === undefined && !(value3.length === 0)) {
    return false;
  }
  if (!(value3.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0;i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value3[i]))
      return false;
  }
  return true;
};
var FromUndefined3 = function(schema, references, value3) {
  return IsUndefined(value3);
};
var FromUnion7 = function(schema, references, value3) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value3));
};
var FromUint8Array3 = function(schema, references, value3) {
  if (!IsUint8Array(value3)) {
    return false;
  }
  if (IsDefined2(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    return false;
  }
  if (IsDefined2(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    return false;
  }
  return true;
};
var FromUnknown3 = function(schema, references, value3) {
  return true;
};
var FromVoid3 = function(schema, references, value3) {
  return TypeSystemPolicy.IsVoidLike(value3);
};
var FromKind2 = function(schema, references, value3) {
  if (!exports_type.Has(schema[Kind]))
    return false;
  const func = exports_type.Get(schema[Kind]);
  return func(schema, value3);
};
var Visit6 = function(schema, references, value3) {
  const references_ = IsDefined2(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny3(schema_, references_, value3);
    case "Array":
      return FromArray5(schema_, references_, value3);
    case "AsyncIterator":
      return FromAsyncIterator3(schema_, references_, value3);
    case "BigInt":
      return FromBigInt3(schema_, references_, value3);
    case "Boolean":
      return FromBoolean3(schema_, references_, value3);
    case "Constructor":
      return FromConstructor3(schema_, references_, value3);
    case "Date":
      return FromDate3(schema_, references_, value3);
    case "Function":
      return FromFunction3(schema_, references_, value3);
    case "Integer":
      return FromInteger3(schema_, references_, value3);
    case "Intersect":
      return FromIntersect5(schema_, references_, value3);
    case "Iterator":
      return FromIterator3(schema_, references_, value3);
    case "Literal":
      return FromLiteral4(schema_, references_, value3);
    case "Never":
      return FromNever3(schema_, references_, value3);
    case "Not":
      return FromNot3(schema_, references_, value3);
    case "Null":
      return FromNull3(schema_, references_, value3);
    case "Number":
      return FromNumber3(schema_, references_, value3);
    case "Object":
      return FromObject3(schema_, references_, value3);
    case "Promise":
      return FromPromise3(schema_, references_, value3);
    case "Record":
      return FromRecord3(schema_, references_, value3);
    case "Ref":
      return FromRef2(schema_, references_, value3);
    case "RegExp":
      return FromRegExp3(schema_, references_, value3);
    case "String":
      return FromString3(schema_, references_, value3);
    case "Symbol":
      return FromSymbol3(schema_, references_, value3);
    case "TemplateLiteral":
      return FromTemplateLiteral4(schema_, references_, value3);
    case "This":
      return FromThis2(schema_, references_, value3);
    case "Tuple":
      return FromTuple5(schema_, references_, value3);
    case "Undefined":
      return FromUndefined3(schema_, references_, value3);
    case "Union":
      return FromUnion7(schema_, references_, value3);
    case "Uint8Array":
      return FromUint8Array3(schema_, references_, value3);
    case "Unknown":
      return FromUnknown3(schema_, references_, value3);
    case "Void":
      return FromVoid3(schema_, references_, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value3);
  }
};
function Check(...args) {
  return args.length === 3 ? Visit6(args[0], args[1], args[2]) : Visit6(args[0], [], args[1]);
}

class ValueCheckUnknownTypeError extends TypeBoxError {
  schema;
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clone/clone.mjs
var ObjectType3 = function(value3) {
  const Acc = {};
  for (const key of Object.getOwnPropertyNames(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  return Acc;
};
var ArrayType3 = function(value3) {
  return value3.map((element) => Clone2(element));
};
var TypedArrayType = function(value3) {
  return value3.slice();
};
var DateType3 = function(value3) {
  return new Date(value3.toISOString());
};
var ValueType = function(value3) {
  return value3;
};
function Clone2(value3) {
  if (IsArray(value3))
    return ArrayType3(value3);
  if (IsDate(value3))
    return DateType3(value3);
  if (IsStandardObject(value3))
    return ObjectType3(value3);
  if (IsTypedArray(value3))
    return TypedArrayType(value3);
  if (IsValueType(value3))
    return ValueType(value3);
  throw new Error("ValueClone: Unable to clone value");
}
// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
var FromDefault = function(value3) {
  return typeof value3 === "function" ? value3 : Clone2(value3);
};
var FromAny4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromArray6 = function(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if ("contains" in schema && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
};
var FromAsyncIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return async function* () {
    }();
  }
};
var FromBigInt4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
};
var FromBoolean4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
};
var FromConstructor4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = Visit7(schema.returns, references);
    if (typeof value3 === "object" && !Array.isArray(value3)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value3)) {
            const self2 = this;
            self2[key] = val;
          }
        }
      };
    } else {
      return class {
      };
    }
  }
};
var FromDate4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date;
  }
};
var FromFunction4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
};
var FromInteger4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromIntersect6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === "object" ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value3))
      throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
    return value3;
  }
};
var FromIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return function* () {
    }();
  }
};
var FromLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
};
var FromNever4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
};
var FromNot4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
};
var FromNull4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
};
var FromNumber4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromObject4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    const Acc = {};
    for (const [key, subschema] of Object.entries(schema.properties)) {
      if (!required.has(key))
        continue;
      Acc[key] = Visit7(subschema, references);
    }
    return Acc;
  }
};
var FromPromise4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
};
var FromRecord4 = function(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    const Acc = {};
    for (const key of propertyKeys)
      Acc[key] = Visit7(valueSchema, references);
    return Acc;
  } else {
    return {};
  }
};
var FromRef3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromRegExp4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
};
var FromString4 = function(schema, references) {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== undefined) {
      return Array.from({ length: schema.minLength }).map(() => " ").join("");
    } else {
      return "";
    }
  }
};
var FromSymbol4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if ("value" in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
};
var FromTemplateLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
};
var FromThis3 = function(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromTuple6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit7(schema.items[index], references));
  }
};
var FromUndefined4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromUnion8 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit7(schema.anyOf[0], references);
  }
};
var FromUint8Array4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
};
var FromUnknown4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromVoid4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromKind3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new Error("User defined types must specify a default value");
  }
};
var Visit7 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny4(schema_, references_);
    case "Array":
      return FromArray6(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator4(schema_, references_);
    case "BigInt":
      return FromBigInt4(schema_, references_);
    case "Boolean":
      return FromBoolean4(schema_, references_);
    case "Constructor":
      return FromConstructor4(schema_, references_);
    case "Date":
      return FromDate4(schema_, references_);
    case "Function":
      return FromFunction4(schema_, references_);
    case "Integer":
      return FromInteger4(schema_, references_);
    case "Intersect":
      return FromIntersect6(schema_, references_);
    case "Iterator":
      return FromIterator4(schema_, references_);
    case "Literal":
      return FromLiteral5(schema_, references_);
    case "Never":
      return FromNever4(schema_, references_);
    case "Not":
      return FromNot4(schema_, references_);
    case "Null":
      return FromNull4(schema_, references_);
    case "Number":
      return FromNumber4(schema_, references_);
    case "Object":
      return FromObject4(schema_, references_);
    case "Promise":
      return FromPromise4(schema_, references_);
    case "Record":
      return FromRecord4(schema_, references_);
    case "Ref":
      return FromRef3(schema_, references_);
    case "RegExp":
      return FromRegExp4(schema_, references_);
    case "String":
      return FromString4(schema_, references_);
    case "Symbol":
      return FromSymbol4(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral5(schema_, references_);
    case "This":
      return FromThis3(schema_, references_);
    case "Tuple":
      return FromTuple6(schema_, references_);
    case "Undefined":
      return FromUndefined4(schema_, references_);
    case "Union":
      return FromUnion8(schema_, references_);
    case "Uint8Array":
      return FromUint8Array4(schema_, references_);
    case "Unknown":
      return FromUnknown4(schema_, references_);
    case "Void":
      return FromVoid4(schema_, references_);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, "Unknown type");
      return FromKind3(schema_, references_);
  }
};
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}

class ValueCreateError extends TypeBoxError {
  schema;
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
var ScoreUnion = function(schema, references, value3) {
  if (schema[Kind] === "Object" && typeof value3 === "object" && !IsNull(value3)) {
    const object3 = schema;
    const keys = Object.getOwnPropertyNames(value3);
    const entries = Object.entries(object3.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal7 = schema2[Kind] === "Literal" && schema2.const === value3[key] ? max : 0;
      const checks = Check(schema2, references, value3[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal7 + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value3) ? 1 : 0;
  }
};
var SelectUnion = function(union9, references, value3) {
  let [select, best] = [union9.anyOf[0], 0];
  for (const schema of union9.anyOf) {
    const score = ScoreUnion(schema, references, value3);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
};
var CastUnion = function(union9, references, value3) {
  if ("default" in union9) {
    return typeof value3 === "function" ? union9.default : Clone2(union9.default);
  } else {
    const schema = SelectUnion(union9, references, value3);
    return Cast(schema, references, value3);
  }
};
var DefaultClone = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : Create2(schema, references);
};
var Default = function(schema, references, value3) {
  return Check(schema, references, value3) ? value3 : Create2(schema, references);
};
var FromArray7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  const created = IsArray(value3) ? Clone2(value3) : Create2(schema, references);
  const minimum = IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
  const maximum = IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
  const casted = maximum.map((value4) => Visit8(schema.items, references, value4));
  if (schema.uniqueItems !== true)
    return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(schema, "Array cast produced invalid data due to uniqueItems constraint");
  return unique;
};
var FromConstructor5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = function() {
  };
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value3.prototype[key] === undefined)
      continue;
    result.prototype[key] = Visit8(property, references, value3.prototype[key]);
  }
  return result;
};
var FromIntersect7 = function(schema, references, value3) {
  const created = Create2(schema, references);
  const mapped9 = IsStandardObject(created) && IsStandardObject(value3) ? { ...created, ...value3 } : value3;
  return Check(schema, references, mapped9) ? mapped9 : Create2(schema, references);
};
var FromNever5 = function(schema, references, value3) {
  throw new ValueCastError(schema, "Never types cannot be cast");
};
var FromObject5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return value3;
  if (value3 === null || typeof value3 !== "object")
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value3[key] === undefined)
      continue;
    result[key] = Visit8(property, references, value3[key]);
  }
  if (typeof schema.additionalProperties === "object") {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value3)) {
      if (propertyNames.includes(propertyName))
        continue;
      result[propertyName] = Visit8(schema.additionalProperties, references, value3[propertyName]);
    }
  }
  return result;
};
var FromRecord5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (value3 === null || typeof value3 !== "object" || Array.isArray(value3) || value3 instanceof Date)
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
};
var FromRef4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromThis4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromTuple7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (!IsArray(value3))
    return Create2(schema, references);
  if (schema.items === undefined)
    return [];
  return schema.items.map((schema2, index) => Visit8(schema2, references, value3[index]));
};
var FromUnion9 = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : CastUnion(schema, references, value3);
};
var Visit8 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray7(schema_, references_, value3);
    case "Constructor":
      return FromConstructor5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect7(schema_, references_, value3);
    case "Never":
      return FromNever5(schema_, references_, value3);
    case "Object":
      return FromObject5(schema_, references_, value3);
    case "Record":
      return FromRecord5(schema_, references_, value3);
    case "Ref":
      return FromRef4(schema_, references_, value3);
    case "This":
      return FromThis4(schema_, references_, value3);
    case "Tuple":
      return FromTuple7(schema_, references_, value3);
    case "Union":
      return FromUnion9(schema_, references_, value3);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return DefaultClone(schema, references, value3);
    default:
      return Default(schema_, references_, value3);
  }
};
function Cast(...args) {
  return args.length === 3 ? Visit8(args[0], args[1], args[2]) : Visit8(args[0], [], args[1]);
}

class ValueCastError extends TypeBoxError {
  schema;
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clean/clean.mjs
var IsCheckable = function(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
};
var FromArray8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  return value3.map((value4) => Visit9(schema.items, references, value4));
};
var FromIntersect8 = function(schema, references, value3) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) => Visit9(schema2, references, Clone2(value3)));
  const composite = intersections.reduce((acc, value4) => IsObject(value4) ? { ...acc, ...value4 } : value4, {});
  if (!IsObject(value3) || !IsObject(composite) || !IsSchema2(unevaluatedProperties))
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (knownkeys.includes(key))
      continue;
    if (Check(unevaluatedProperties, references, value3[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value3[key]);
    }
  }
  return composite;
};
var FromObject6 = function(schema, references, value3) {
  if (!IsObject(value3) || IsArray(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (key in schema.properties) {
      value3[key] = Visit9(schema.properties[key], references, value3[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRecord6 = function(schema, references, value3) {
  if (!IsObject(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.getOwnPropertyNames(value3);
  const [propertyKey, propertySchema] = Object.entries(schema.patternProperties)[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value3[key] = Visit9(propertySchema, references, value3[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRef5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromThis5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromTuple8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  if (IsUndefined(schema.items))
    return [];
  const length = Math.min(value3.length, schema.items.length);
  for (let i = 0;i < length; i++) {
    value3[i] = Visit9(schema.items[i], references, value3[i]);
  }
  return value3.length > length ? value3.slice(0, length) : value3;
};
var FromUnion10 = function(schema, references, value3) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, references, value3)) {
      return Visit9(inner, references, value3);
    }
  }
  return value3;
};
var Visit9 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray8(schema_, references_, value3);
    case "Intersect":
      return FromIntersect8(schema_, references_, value3);
    case "Object":
      return FromObject6(schema_, references_, value3);
    case "Record":
      return FromRecord6(schema_, references_, value3);
    case "Ref":
      return FromRef5(schema_, references_, value3);
    case "This":
      return FromThis5(schema_, references_, value3);
    case "Tuple":
      return FromTuple8(schema_, references_, value3);
    case "Union":
      return FromUnion10(schema_, references_, value3);
    default:
      return value3;
  }
};
function Clean(...args) {
  return args.length === 3 ? Visit9(args[0], args[1], args[2]) : Visit9(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/convert/convert.mjs
var IsStringNumeric = function(value3) {
  return IsString(value3) && !isNaN(value3) && !isNaN(parseFloat(value3));
};
var IsValueToString = function(value3) {
  return IsBigInt(value3) || IsBoolean(value3) || IsNumber(value3);
};
var IsValueTrue = function(value3) {
  return value3 === true || IsNumber(value3) && value3 === 1 || IsBigInt(value3) && value3 === BigInt("1") || IsString(value3) && (value3.toLowerCase() === "true" || value3 === "1");
};
var IsValueFalse = function(value3) {
  return value3 === false || IsNumber(value3) && (value3 === 0 || Object.is(value3, -0)) || IsBigInt(value3) && value3 === BigInt("0") || IsString(value3) && (value3.toLowerCase() === "false" || value3 === "0" || value3 === "-0");
};
var IsTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsDateTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateString = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value3);
};
var TryConvertLiteralString = function(value3, target) {
  const conversion = TryConvertString(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralNumber = function(value3, target) {
  const conversion = TryConvertNumber(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralBoolean = function(value3, target) {
  const conversion = TryConvertBoolean(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteral = function(schema, value3) {
  return IsString(schema.const) ? TryConvertLiteralString(value3, schema.const) : IsNumber(schema.const) ? TryConvertLiteralNumber(value3, schema.const) : IsBoolean(schema.const) ? TryConvertLiteralBoolean(value3, schema.const) : Clone2(value3);
};
var TryConvertBoolean = function(value3) {
  return IsValueTrue(value3) ? true : IsValueFalse(value3) ? false : value3;
};
var TryConvertBigInt = function(value3) {
  return IsStringNumeric(value3) ? BigInt(parseInt(value3)) : IsNumber(value3) ? BigInt(value3 | 0) : IsValueFalse(value3) ? BigInt(0) : IsValueTrue(value3) ? BigInt(1) : value3;
};
var TryConvertString = function(value3) {
  return IsValueToString(value3) ? value3.toString() : IsSymbol(value3) && value3.description !== undefined ? value3.description.toString() : value3;
};
var TryConvertNumber = function(value3) {
  return IsStringNumeric(value3) ? parseFloat(value3) : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertInteger = function(value3) {
  return IsStringNumeric(value3) ? parseInt(value3) : IsNumber(value3) ? value3 | 0 : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertNull = function(value3) {
  return IsString(value3) && value3.toLowerCase() === "null" ? null : value3;
};
var TryConvertUndefined = function(value3) {
  return IsString(value3) && value3 === "undefined" ? undefined : value3;
};
var TryConvertDate = function(value3) {
  return IsDate(value3) ? value3 : IsNumber(value3) ? new Date(value3) : IsValueTrue(value3) ? new Date(1) : IsValueFalse(value3) ? new Date(0) : IsStringNumeric(value3) ? new Date(parseInt(value3)) : IsTimeStringWithoutTimeZone(value3) ? new Date(`1970-01-01T${value3}.000Z`) : IsTimeStringWithTimeZone(value3) ? new Date(`1970-01-01T${value3}`) : IsDateTimeStringWithoutTimeZone(value3) ? new Date(`${value3}.000Z`) : IsDateTimeStringWithTimeZone(value3) ? new Date(value3) : IsDateString(value3) ? new Date(`${value3}T00:00:00.000Z`) : value3;
};
var Default2 = function(value3) {
  return value3;
};
var FromArray9 = function(schema, references, value3) {
  const elements = IsArray(value3) ? value3 : [value3];
  return elements.map((element) => Visit10(schema.items, references, element));
};
var FromBigInt5 = function(schema, references, value3) {
  return TryConvertBigInt(value3);
};
var FromBoolean5 = function(schema, references, value3) {
  return TryConvertBoolean(value3);
};
var FromDate5 = function(schema, references, value3) {
  return TryConvertDate(value3);
};
var FromInteger5 = function(schema, references, value3) {
  return TryConvertInteger(value3);
};
var FromIntersect9 = function(schema, references, value3) {
  return schema.allOf.reduce((value4, schema2) => Visit10(schema2, references, value4), value3);
};
var FromLiteral6 = function(schema, references, value3) {
  return TryConvertLiteral(schema, value3);
};
var FromNull5 = function(schema, references, value3) {
  return TryConvertNull(value3);
};
var FromNumber5 = function(schema, references, value3) {
  return TryConvertNumber(value3);
};
var FromObject7 = function(schema, references, value3) {
  const isConvertable = IsObject(value3);
  if (!isConvertable)
    return value3;
  const result = {};
  for (const key of Object.keys(value3)) {
    result[key] = HasPropertyKey(schema.properties, key) ? Visit10(schema.properties[key], references, value3[key]) : value3[key];
  }
  return result;
};
var FromRecord7 = function(schema, references, value3) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
};
var FromRef6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromString5 = function(schema, references, value3) {
  return TryConvertString(value3);
};
var FromSymbol5 = function(schema, references, value3) {
  return IsString(value3) || IsNumber(value3) ? Symbol(value3) : value3;
};
var FromThis6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromTuple9 = function(schema, references, value3) {
  const isConvertable = IsArray(value3) && !IsUndefined(schema.items);
  if (!isConvertable)
    return value3;
  return value3.map((value4, index) => {
    return index < schema.items.length ? Visit10(schema.items[index], references, value4) : value4;
  });
};
var FromUndefined5 = function(schema, references, value3) {
  return TryConvertUndefined(value3);
};
var FromUnion11 = function(schema, references, value3) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value3);
    if (!Check(subschema, references, converted))
      continue;
    return converted;
  }
  return value3;
};
var Visit10 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray9(schema_, references_, value3);
    case "BigInt":
      return FromBigInt5(schema_, references_, value3);
    case "Boolean":
      return FromBoolean5(schema_, references_, value3);
    case "Date":
      return FromDate5(schema_, references_, value3);
    case "Integer":
      return FromInteger5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect9(schema_, references_, value3);
    case "Literal":
      return FromLiteral6(schema_, references_, value3);
    case "Null":
      return FromNull5(schema_, references_, value3);
    case "Number":
      return FromNumber5(schema_, references_, value3);
    case "Object":
      return FromObject7(schema_, references_, value3);
    case "Record":
      return FromRecord7(schema_, references_, value3);
    case "Ref":
      return FromRef6(schema_, references_, value3);
    case "String":
      return FromString5(schema_, references_, value3);
    case "Symbol":
      return FromSymbol5(schema_, references_, value3);
    case "This":
      return FromThis6(schema_, references_, value3);
    case "Tuple":
      return FromTuple9(schema_, references_, value3);
    case "Undefined":
      return FromUndefined5(schema_, references_, value3);
    case "Union":
      return FromUnion11(schema_, references_, value3);
    default:
      return Default2(value3);
  }
};
function Convert(...args) {
  return args.length === 3 ? Visit10(args[0], args[1], args[2]) : Visit10(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/default/default.mjs
var ValueOrDefault = function(schema, value3) {
  return value3 === undefined && "default" in schema ? Clone2(schema.default) : value3;
};
var IsCheckable2 = function(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
};
var IsDefaultSchema = function(value3) {
  return IsSchema2(value3) && "default" in value3;
};
var FromArray10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted))
    return defaulted;
  for (let i = 0;i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
};
var FromIntersect10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
};
var FromObject8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key]))
      continue;
    defaulted[key] = Visit11(schema.properties[key], references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRecord8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(schema.patternProperties)[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRef7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, ValueOrDefault(schema, value3));
};
var FromThis7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, value3);
};
var FromTuple10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted) || IsUndefined(schema.items))
    return defaulted;
  const [items, max] = [schema.items, Math.max(schema.items.length, defaulted.length)];
  for (let i = 0;i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
};
var FromUnion12 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
};
var Visit11 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray10(schema_, references_, value3);
    case "Intersect":
      return FromIntersect10(schema_, references_, value3);
    case "Object":
      return FromObject8(schema_, references_, value3);
    case "Record":
      return FromRecord8(schema_, references_, value3);
    case "Ref":
      return FromRef7(schema_, references_, value3);
    case "This":
      return FromThis7(schema_, references_, value3);
    case "Tuple":
      return FromTuple10(schema_, references_, value3);
    case "Union":
      return FromUnion12(schema_, references_, value3);
    default:
      return ValueOrDefault(schema_, value3);
  }
};
function Default3(...args) {
  return args.length === 3 ? Visit11(args[0], args[1], args[2]) : Visit11(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/pointer/pointer.mjs
var exports_pointer = {};
__export(exports_pointer, {
  ValuePointerRootSetError: () => {
    {
      return ValuePointerRootSetError;
    }
  },
  ValuePointerRootDeleteError: () => {
    {
      return ValuePointerRootDeleteError;
    }
  },
  Set: () => {
    {
      return Set4;
    }
  },
  Has: () => {
    {
      return Has3;
    }
  },
  Get: () => {
    {
      return Get3;
    }
  },
  Format: () => {
    {
      return Format;
    }
  },
  Delete: () => {
    {
      return Delete3;
    }
  }
});
var Escape2 = function(component) {
  return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
};
function* Format(pointer) {
  if (pointer === "")
    return;
  let [start, end] = [0, 0];
  for (let i = 0;i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === "/") {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
function Set4(value3, pointer, update) {
  if (pointer === "")
    throw new ValuePointerRootSetError(value3, pointer, update);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
function Delete3(value3, pointer) {
  if (pointer === "")
    throw new ValuePointerRootDeleteError(value3, pointer);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined || next[component] === null)
      return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
function Has3(value3, pointer) {
  if (pointer === "")
    return true;
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
function Get3(value3, pointer) {
  if (pointer === "")
    return value3;
  let current = value3;
  for (const component of Format(pointer)) {
    if (current[component] === undefined)
      return;
    current = current[component];
  }
  return current;
}

class ValuePointerRootSetError extends TypeBoxError {
  value;
  path;
  update;
  constructor(value3, path, update) {
    super("Cannot set root value");
    this.value = value3;
    this.path = path;
    this.update = update;
  }
}

class ValuePointerRootDeleteError extends TypeBoxError {
  value;
  path;
  constructor(value3, path) {
    super("Cannot delete root value");
    this.value = value3;
    this.path = path;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
var CreateUpdate = function(path, value3) {
  return { type: "update", path, value: value3 };
};
var CreateInsert = function(path, value3) {
  return { type: "insert", path, value: value3 };
};
var CreateDelete = function(path) {
  return { type: "delete", path };
};
function* ObjectType4(path, current, next) {
  if (!IsStandardObject(next))
    return yield CreateUpdate(path, next);
  const currentKeys = [...globalThis.Object.keys(current), ...globalThis.Object.getOwnPropertySymbols(current)];
  const nextKeys = [...globalThis.Object.keys(next), ...globalThis.Object.getOwnPropertySymbols(next)];
  for (const key of currentKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path}/${globalThis.String(key)}`, undefined);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key]))
      continue;
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    yield* Visit12(`${path}/${globalThis.String(key)}`, current[key], next[key]);
  }
  for (const key of nextKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path}/${globalThis.String(key)}`);
  }
}
function* ArrayType4(path, current, next) {
  if (!IsArray(next))
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
  for (let i = 0;i < next.length; i++) {
    if (i < current.length)
      continue;
    yield CreateInsert(`${path}/${i}`, next[i]);
  }
  for (let i = current.length - 1;i >= 0; i--) {
    if (i < next.length)
      continue;
    yield CreateDelete(`${path}/${i}`);
  }
}
function* TypedArrayType2(path, current, next) {
  if (!IsTypedArray(next) || current.length !== next.length || globalThis.Object.getPrototypeOf(current).constructor.name !== globalThis.Object.getPrototypeOf(next).constructor.name)
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
}
function* ValueType2(path, current, next) {
  if (current === next)
    return;
  yield CreateUpdate(path, next);
}
function* Visit12(path, current, next) {
  if (IsStandardObject(current))
    return yield* ObjectType4(path, current, next);
  if (IsArray(current))
    return yield* ArrayType4(path, current, next);
  if (IsTypedArray(current))
    return yield* TypedArrayType2(path, current, next);
  if (IsValueType(current))
    return yield* ValueType2(path, current, next);
  throw new ValueDeltaError(current, "Unable to create diff edits for unknown value");
}
function Diff(current, next) {
  return [...Visit12("", current, next)];
}
var IsRootUpdate = function(edits) {
  return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
};
var IsIdentity = function(edits) {
  return edits.length === 0;
};
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone8 = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case "insert": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "update": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "delete": {
        exports_pointer.Delete(clone8, edit.path);
        break;
      }
    }
  }
  return clone8;
}
var Insert = Object2({
  type: Literal("insert"),
  path: String2(),
  value: Unknown()
});
var Update = Object2({
  type: Literal("update"),
  path: String2(),
  value: Unknown()
});
var Delete4 = Object2({
  type: Literal("delete"),
  path: String2()
});
var Edit = Union([Insert, Update, Delete4]);

class ValueDeltaError extends TypeBoxError {
  value;
  constructor(value3, message) {
    super(message);
    this.value = value3;
  }
}

class ValueDeltaSymbolError extends ValueDeltaError {
  value;
  constructor(value3) {
    super(value3, "Cannot diff objects with symbol keys");
    this.value = value3;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/equal/equal.mjs
var ObjectType5 = function(left, right) {
  if (!IsStandardObject(right))
    return false;
  const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
  const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
  if (leftKeys.length !== rightKeys.length)
    return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
};
var DateType4 = function(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
};
var ArrayType5 = function(left, right) {
  if (!IsArray(right) || left.length !== right.length)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var TypedArrayType3 = function(left, right) {
  if (!IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var ValueType3 = function(left, right) {
  return left === right;
};
function Equal(left, right) {
  if (IsStandardObject(left))
    return ObjectType5(left, right);
  if (IsDate(left))
    return DateType4(left, right);
  if (IsTypedArray(left))
    return TypedArrayType3(left, right);
  if (IsArray(left))
    return ArrayType5(left, right);
  if (IsValueType(left))
    return ValueType3(left, right);
  throw new Error("ValueEquals: Unable to compare value");
}
// node_modules/@sinclair/typebox/build/esm/value/mutate/mutate.mjs
var ObjectType6 = function(root, path, current, next) {
  if (!IsStandardObject(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    const currentKeys = Object.getOwnPropertyNames(current);
    const nextKeys = Object.getOwnPropertyNames(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
};
var ArrayType6 = function(root, path, current, next) {
  if (!IsArray(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    for (let index = 0;index < next.length; index++) {
      Visit13(root, `${path}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
};
var TypedArrayType4 = function(root, path, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0;i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    exports_pointer.Set(root, path, Clone2(next));
  }
};
var ValueType4 = function(root, path, current, next) {
  if (current === next)
    return;
  exports_pointer.Set(root, path, next);
};
var Visit13 = function(root, path, current, next) {
  if (IsArray(next))
    return ArrayType6(root, path, current, next);
  if (IsTypedArray(next))
    return TypedArrayType4(root, path, current, next);
  if (IsStandardObject(next))
    return ObjectType6(root, path, current, next);
  if (IsValueType(next))
    return ValueType4(root, path, current, next);
};
var IsNonMutableValue = function(value3) {
  return IsTypedArray(value3) || IsValueType(value3);
};
var IsMismatchedValue = function(current, next) {
  return IsStandardObject(current) && IsArray(next) || IsArray(current) && IsStandardObject(next);
};
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError("Only object and array types can be mutated at the root level");
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError("Cannot assign due type mismatch of assignable values");
  Visit13(current, "", current, next);
}

class ValueMutateError extends TypeBoxError {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/decode.mjs
var Default4 = function(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Decode(value3) : value3;
  } catch (error19) {
    throw new TransformDecodeError(schema, path, value3, error19);
  }
};
var FromArray11 = function(schema, references, path, value3) {
  return IsArray(value3) ? Default4(schema, path, value3.map((value4, index) => Visit14(schema.items, references, `${path}/${index}`, value4))) : Default4(schema, path, value3);
};
var FromIntersect11 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3) || IsValueType(value3))
    return Default4(schema, path, value3);
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...value3 };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit14(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(unevaluatedProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromNot5 = function(schema, references, path, value3) {
  return Default4(schema, path, Visit14(schema.not, references, path, value3));
};
var FromObject9 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, path, value3);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...value3 };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit14(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromRecord9 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, path, value3);
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...value3 };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit14(schema.patternProperties[pattern3], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromRef8 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
};
var FromThis8 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
};
var FromTuple11 = function(schema, references, path, value3) {
  return IsArray(value3) && IsArray(schema.items) ? Default4(schema, path, schema.items.map((schema2, index) => Visit14(schema2, references, `${path}/${index}`, value3[index]))) : Default4(schema, path, value3);
};
var FromUnion13 = function(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const decoded = Visit14(subschema, references, path, value3);
    return Default4(schema, path, decoded);
  }
  return Default4(schema, path, value3);
};
var Visit14 = function(schema, references, path, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray11(schema_, references_, path, value3);
    case "Intersect":
      return FromIntersect11(schema_, references_, path, value3);
    case "Not":
      return FromNot5(schema_, references_, path, value3);
    case "Object":
      return FromObject9(schema_, references_, path, value3);
    case "Record":
      return FromRecord9(schema_, references_, path, value3);
    case "Ref":
      return FromRef8(schema_, references_, path, value3);
    case "Symbol":
      return Default4(schema_, path, value3);
    case "This":
      return FromThis8(schema_, references_, path, value3);
    case "Tuple":
      return FromTuple11(schema_, references_, path, value3);
    case "Union":
      return FromUnion13(schema_, references_, path, value3);
    default:
      return Default4(schema_, path, value3);
  }
};
function TransformDecode(schema, references, value3) {
  return Visit14(schema, references, "", value3);
}

class TransformDecodeCheckError extends TypeBoxError {
  schema;
  value;
  error;
  constructor(schema, value3, error19) {
    super(`Unable to decode value as it does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error19;
  }
}

class TransformDecodeError extends TypeBoxError {
  schema;
  path;
  value;
  error;
  constructor(schema, path, value3, error19) {
    super(error19 instanceof Error ? error19.message : "Unknown error");
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error19;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/encode.mjs
var Default5 = function(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Encode(value3) : value3;
  } catch (error20) {
    throw new TransformEncodeError(schema, path, value3, error20);
  }
};
var FromArray12 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  return IsArray(defaulted) ? defaulted.map((value4, index) => Visit15(schema.items, references, `${path}/${index}`, value4)) : defaulted;
};
var FromIntersect12 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3) || IsValueType(value3))
    return defaulted;
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...defaulted };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit15(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(unevaluatedProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromNot6 = function(schema, references, path, value3) {
  return Default5(schema.not, path, Default5(schema, path, value3));
};
var FromObject10 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(defaulted))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...defaulted };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit15(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromRecord10 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3))
    return defaulted;
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...defaulted };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit15(schema.patternProperties[pattern3], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromRef9 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
};
var FromThis9 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
};
var FromTuple12 = function(schema, references, path, value3) {
  const value1 = Default5(schema, path, value3);
  return IsArray(schema.items) ? schema.items.map((schema2, index) => Visit15(schema2, references, `${path}/${index}`, value1[index])) : [];
};
var FromUnion14 = function(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const value1 = Visit15(subschema, references, path, value3);
    return Default5(schema, path, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, path, value3);
    if (!Check(schema, references, value1))
      continue;
    return Default5(schema, path, value1);
  }
  return Default5(schema, path, value3);
};
var Visit15 = function(schema, references, path, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray12(schema_, references_, path, value3);
    case "Intersect":
      return FromIntersect12(schema_, references_, path, value3);
    case "Not":
      return FromNot6(schema_, references_, path, value3);
    case "Object":
      return FromObject10(schema_, references_, path, value3);
    case "Record":
      return FromRecord10(schema_, references_, path, value3);
    case "Ref":
      return FromRef9(schema_, references_, path, value3);
    case "This":
      return FromThis9(schema_, references_, path, value3);
    case "Tuple":
      return FromTuple12(schema_, references_, path, value3);
    case "Union":
      return FromUnion14(schema_, references_, path, value3);
    default:
      return Default5(schema_, path, value3);
  }
};
function TransformEncode(schema, references, value3) {
  return Visit15(schema, references, "", value3);
}

class TransformEncodeCheckError extends TypeBoxError {
  schema;
  value;
  error;
  constructor(schema, value3, error20) {
    super(`The encoded value does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error20;
  }
}

class TransformEncodeError extends TypeBoxError {
  schema;
  path;
  value;
  error;
  constructor(schema, path, value3, error20) {
    super(`${error20 instanceof Error ? error20.message : "Unknown error"}`);
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error20;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/has.mjs
var FromArray13 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromAsyncIterator5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromConstructor6 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromFunction5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromIntersect13 = function(schema, references) {
  return IsTransform2(schema) || IsTransform2(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit16(schema2, references));
};
var FromIterator5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromNot7 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.not, references);
};
var FromObject11 = function(schema, references) {
  return IsTransform2(schema) || Object.values(schema.properties).some((schema2) => Visit16(schema2, references)) || IsSchema2(schema.additionalProperties) && Visit16(schema.additionalProperties, references);
};
var FromPromise5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.item, references);
};
var FromRecord11 = function(schema, references) {
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern3];
  return IsTransform2(schema) || Visit16(property, references) || IsSchema2(schema.additionalProperties) && IsTransform2(schema.additionalProperties);
};
var FromRef10 = function(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromThis10 = function(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromTuple13 = function(schema, references) {
  return IsTransform2(schema) || !IsUndefined(schema.items) && schema.items.some((schema2) => Visit16(schema2, references));
};
var FromUnion15 = function(schema, references) {
  return IsTransform2(schema) || schema.anyOf.some((schema2) => Visit16(schema2, references));
};
var Visit16 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id))
    return false;
  if (schema.$id)
    visited.add(schema.$id);
  switch (schema[Kind]) {
    case "Array":
      return FromArray13(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator5(schema_, references_);
    case "Constructor":
      return FromConstructor6(schema_, references_);
    case "Function":
      return FromFunction5(schema_, references_);
    case "Intersect":
      return FromIntersect13(schema_, references_);
    case "Iterator":
      return FromIterator5(schema_, references_);
    case "Not":
      return FromNot7(schema_, references_);
    case "Object":
      return FromObject11(schema_, references_);
    case "Promise":
      return FromPromise5(schema_, references_);
    case "Record":
      return FromRecord11(schema_, references_);
    case "Ref":
      return FromRef10(schema_, references_);
    case "This":
      return FromThis10(schema_, references_);
    case "Tuple":
      return FromTuple13(schema_, references_);
    case "Union":
      return FromUnion15(schema_, references_);
    default:
      return IsTransform2(schema);
  }
};
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
var visited = new Set;
// node_modules/@sinclair/typebox/build/esm/value/value/value.mjs
var exports_value2 = {};
__export(exports_value2, {
  Patch: () => {
    {
      return Patch2;
    }
  },
  Mutate: () => {
    {
      return Mutate2;
    }
  },
  Hash: () => {
    {
      return Hash2;
    }
  },
  Errors: () => {
    {
      return Errors2;
    }
  },
  Equal: () => {
    {
      return Equal2;
    }
  },
  Encode: () => {
    {
      return Encode;
    }
  },
  Diff: () => {
    {
      return Diff2;
    }
  },
  Default: () => {
    {
      return Default6;
    }
  },
  Decode: () => {
    {
      return Decode;
    }
  },
  Create: () => {
    {
      return Create3;
    }
  },
  Convert: () => {
    {
      return Convert2;
    }
  },
  Clone: () => {
    {
      return Clone3;
    }
  },
  Clean: () => {
    {
      return Clean2;
    }
  },
  Check: () => {
    {
      return Check2;
    }
  },
  Cast: () => {
    {
      return Cast2;
    }
  }
});
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
function Create3(...args) {
  return Create2.apply(Create2, args);
}
function Check2(...args) {
  return Check.apply(Check, args);
}
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
function Clone3(value3) {
  return Clone2(value3);
}
function Decode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value3))
    throw new TransformDecodeCheckError(schema, value3, Errors2(schema, references, value3).First());
  return HasTransform(schema, references) ? TransformDecode(schema, references, value3) : value3;
}
function Default6(...args) {
  return Default3.apply(Default3, args);
}
function Encode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = HasTransform(schema, references) ? TransformEncode(schema, references, value3) : value3;
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(schema, encoded, Errors2(schema, references, encoded).First());
  return encoded;
}
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
function Equal2(left, right) {
  return Equal(left, right);
}
function Diff2(current, next) {
  return Diff(current, next);
}
function Hash2(value3) {
  return Hash(value3);
}
function Patch2(current, edits) {
  return Patch(current, edits);
}
function Mutate2(current, next) {
  Mutate(current, next);
}
// node_modules/@sinclair/typebox/build/esm/type/awaited/awaited.mjs
var FromRest4 = function(T) {
  return T.map((L) => AwaitedResolve(L));
};
var FromIntersect14 = function(T) {
  return Intersect(FromRest4(T));
};
var FromUnion16 = function(T) {
  return Union(FromRest4(T));
};
var FromPromise6 = function(T) {
  return AwaitedResolve(T);
};
var AwaitedResolve = function(T) {
  return IsIntersect(T) ? FromIntersect14(T.allOf) : IsUnion(T) ? FromUnion16(T.anyOf) : IsPromise2(T) ? FromPromise6(T.item) : T;
};
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
// node_modules/@sinclair/typebox/build/esm/type/composite/composite.mjs
var CompositeKeys = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...KeyOfPropertyKeys(L));
  return SetDistinct(Acc);
};
var FilterNever = function(T) {
  return T.filter((L) => !IsNever(L));
};
var CompositeProperty = function(T, K) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexFromPropertyKeys(L, [K]));
  return FilterNever(Acc);
};
var CompositeProperties = function(T, K) {
  const Acc = {};
  for (const L of K) {
    Acc[L] = IntersectEvaluated(CompositeProperty(T, L));
  }
  return Acc;
};
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
// node_modules/@sinclair/typebox/build/esm/type/date/date.mjs
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/null/null.mjs
function Null(options = {}) {
  return {
    ...options,
    [Kind]: "Null",
    type: "null"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/symbol/symbol.mjs
function Symbol2(options) {
  return { ...options, [Kind]: "Symbol", type: "symbol" };
}
// node_modules/@sinclair/typebox/build/esm/type/undefined/undefined.mjs
function Undefined(options = {}) {
  return { ...options, [Kind]: "Undefined", type: "undefined" };
}
// node_modules/@sinclair/typebox/build/esm/type/uint8array/uint8array.mjs
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" };
}
// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
var FromArray14 = function(T) {
  return T.map((L) => FromValue(L, false));
};
var FromProperties8 = function(value5) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(value5))
    Acc[K] = Readonly(FromValue(value5[K], false));
  return Acc;
};
var ConditionalReadonly = function(T, root) {
  return root === true ? T : Readonly(T);
};
var FromValue = function(value5, root) {
  return IsAsyncIterator2(value5) ? ConditionalReadonly(Any(), root) : IsIterator2(value5) ? ConditionalReadonly(Any(), root) : IsArray2(value5) ? Readonly(Tuple(FromArray14(value5))) : IsUint8Array2(value5) ? Uint8Array2() : IsDate2(value5) ? Date2() : IsObject2(value5) ? ConditionalReadonly(Object2(FromProperties8(value5)), root) : IsFunction2(value5) ? ConditionalReadonly(Function2([], Unknown()), root) : IsUndefined2(value5) ? Undefined() : IsNull2(value5) ? Null() : IsSymbol2(value5) ? Symbol2() : IsBigInt2(value5) ? BigInt2() : IsNumber2(value5) ? Literal(value5) : IsBoolean2(value5) ? Literal(value5) : IsString2(value5) ? Literal(value5) : Object2({});
};
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/constructor-parameters.mjs
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/deref/deref.mjs
var FromRest5 = function(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
};
var FromProperties9 = function(properties, references) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(properties)) {
    Acc[K] = Deref2(properties[K], references);
  }
  return Acc;
};
var FromConstructor7 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromFunction6 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromIntersect15 = function(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
};
var FromUnion17 = function(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
};
var FromTuple14 = function(schema, references) {
  if (IsUndefined2(schema.items))
    return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
};
var FromArray15 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromObject12 = function(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
};
var FromPromise7 = function(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
};
var FromAsyncIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromRef11 = function(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === undefined)
    throw Error(`Unable to dereference schema with \$id ${schema.$ref}`);
  const discard8 = Discard(target, ["$id"]);
  return Deref2(discard8, references);
};
var DerefResolve = function(schema, references) {
  return IsConstructor(schema) ? FromConstructor7(schema, references) : IsFunction3(schema) ? FromFunction6(schema, references) : IsIntersect(schema) ? FromIntersect15(schema, references) : IsUnion(schema) ? FromUnion17(schema, references) : IsTuple(schema) ? FromTuple14(schema, references) : IsArray3(schema) ? FromArray15(schema, references) : IsObject3(schema) ? FromObject12(schema, references) : IsPromise2(schema) ? FromPromise7(schema, references) : IsAsyncIterator3(schema) ? FromAsyncIterator6(schema, references) : IsIterator3(schema) ? FromIterator6(schema, references) : IsRef(schema) ? FromRef11(schema, references) : schema;
};
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
// node_modules/@sinclair/typebox/build/esm/type/enum/enum.mjs
function Enum(item, options = {}) {
  if (IsUndefined2(item))
    throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value7) => Literal(value7));
  return Union(anyOf, { ...options, [Hint]: "Enum" });
}
// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-template-literal.mjs
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
var ExcludeRest = function(L, R) {
  const excluded = L.filter((inner) => ExtendsCheck(inner, R) === ExtendsResult.False);
  return excluded.length === 1 ? excluded[0] : Union(excluded);
};
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExcludeRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? Never() : L, options);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
var FromProperties10 = function(P, U) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Exclude(P[K2], U);
  return Acc;
};
var FromMappedResult7 = function(R, T) {
  return FromProperties10(R.properties, T);
};
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-template-literal.mjs
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
var ExtractRest = function(L, R) {
  const extracted = L.filter((inner) => ExtendsCheck(inner, R) !== ExtendsResult.False);
  return extracted.length === 1 ? extracted[0] : Union(extracted);
};
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExtractRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? L : Never(), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
var FromProperties11 = function(P, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extract(P[K2], T);
  return Acc;
};
var FromMappedResult8 = function(R, T) {
  return FromProperties11(R.properties, T);
};
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/instance-type/instance-type.mjs
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/integer/integer.mjs
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic-from-mapped-key.mjs
var MappedIntrinsicPropertyKey = function(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options)
  };
};
var MappedIntrinsicPropertyKeys = function(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
};
var MappedIntrinsicProperties = function(T, M, options) {
  return MappedIntrinsicPropertyKeys(T["keys"], M, options);
};
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
var ApplyUncapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toLowerCase(), rest].join("");
};
var ApplyCapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toUpperCase(), rest].join("");
};
var ApplyUppercase = function(value7) {
  return value7.toUpperCase();
};
var ApplyLowercase = function(value7) {
  return value7.toLowerCase();
};
var FromTemplateLiteral6 = function(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite3 = IsTemplateLiteralExpressionFinite(expression);
  if (!finite3)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value7) => Literal(value7));
  const mapped12 = FromRest6(literals, mode);
  const union15 = Union(mapped12);
  return TemplateLiteral([union15], options);
};
var FromLiteralValue = function(value7, mode) {
  return typeof value7 === "string" ? mode === "Uncapitalize" ? ApplyUncapitalize(value7) : mode === "Capitalize" ? ApplyCapitalize(value7) : mode === "Uppercase" ? ApplyUppercase(value7) : mode === "Lowercase" ? ApplyLowercase(value7) : value7 : value7.toString();
};
var FromRest6 = function(T, M) {
  return T.map((L) => Intrinsic(L, M));
};
function Intrinsic(schema, mode, options = {}) {
  return IsMappedKey(schema) ? IntrinsicFromMappedKey(schema, mode, options) : IsTemplateLiteral(schema) ? FromTemplateLiteral6(schema, mode, schema) : IsUnion(schema) ? Union(FromRest6(schema.anyOf, mode), options) : IsLiteral(schema) ? Literal(FromLiteralValue(schema.const, mode), options) : schema;
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, "Capitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/lowercase.mjs
function Lowercase(T, options = {}) {
  return Intrinsic(T, "Lowercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uncapitalize.mjs
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, "Uncapitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uppercase.mjs
function Uppercase(T, options = {}) {
  return Intrinsic(T, "Uppercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/not/not.mjs
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-result.mjs
var FromProperties12 = function(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Omit(P[K2], K, options);
  return Acc;
};
var FromMappedResult9 = function(R, K, options) {
  return FromProperties12(R.properties, K, options);
};
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
var FromIntersect16 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromUnion18 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromProperty2 = function(T, K) {
  const { [K]: _, ...R } = T;
  return R;
};
var FromProperties13 = function(T, K) {
  return K.reduce((T2, K2) => FromProperty2(T2, K2), T);
};
var OmitResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect16(T.allOf, K)) : IsUnion(T) ? Union(FromUnion18(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties13(T.properties, K)) : Object2({});
};
function Omit(T, K, options = {}) {
  if (IsMappedKey(K))
    return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
var FromPropertyKey2 = function(T, K, options) {
  return {
    [K]: Omit(T, [K], options)
  };
};
var FromPropertyKeys2 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
};
var FromMappedKey3 = function(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
};
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/parameters/parameters.mjs
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/partial/partial.mjs
var FromRest7 = function(T) {
  return T.map((L) => PartialResolve(L));
};
var FromProperties14 = function(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Optional(T[K]);
  return Acc;
};
var PartialResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest7(T.allOf)) : IsUnion(T) ? Union(FromRest7(T.anyOf)) : IsObject3(T) ? Object2(FromProperties14(T.properties)) : Object2({});
};
function Partial(T, options = {}) {
  if (IsMappedResult(T))
    return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
var FromProperties15 = function(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Partial(K[K2], options);
  return Acc;
};
var FromMappedResult10 = function(R, options) {
  return FromProperties15(R.properties, options);
};
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-result.mjs
var FromProperties16 = function(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Pick(P[K2], K, options);
  return Acc;
};
var FromMappedResult11 = function(R, K, options) {
  return FromProperties16(R.properties, K, options);
};
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
var FromIntersect17 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromUnion19 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromProperties17 = function(T, K) {
  const Acc = {};
  for (const K2 of K)
    if (K2 in T)
      Acc[K2] = T[K2];
  return Acc;
};
var PickResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect17(T.allOf, K)) : IsUnion(T) ? Union(FromUnion19(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties17(T.properties, K)) : Object2({});
};
function Pick(T, K, options = {}) {
  if (IsMappedKey(K))
    return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
var FromPropertyKey3 = function(T, K, options) {
  return {
    [K]: Pick(T, [K], options)
  };
};
var FromPropertyKeys3 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
};
var FromMappedKey4 = function(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
};
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/readonly-optional.mjs
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
// node_modules/@sinclair/typebox/build/esm/type/record/record.mjs
var RecordCreateFromPattern = function(pattern3, T, options) {
  return {
    ...options,
    [Kind]: "Record",
    type: "object",
    patternProperties: { [pattern3]: CloneType(T) }
  };
};
var RecordCreateFromKeys = function(K, T, options) {
  const Acc = {};
  for (const K2 of K)
    Acc[K2] = CloneType(T);
  return Object2(Acc, { ...options, [Hint]: "Record" });
};
var FromTemplateLiteralKey = function(K, T, options) {
  return IsTemplateLiteralFinite(K) ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options) : RecordCreateFromPattern(K.pattern, T, options);
};
var FromUnionKey = function(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
};
var FromLiteralKey = function(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
};
var FromRegExpKey = function(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
};
var FromStringKey = function(K, T, options) {
  const pattern3 = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern3, T, options);
};
var FromIntegerKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
var FromNumberKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
function Record(K, T, options = {}) {
  return IsUnion(K) ? FromUnionKey(K.anyOf, T, options) : IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) : IsLiteral(K) ? FromLiteralKey(K.const, T, options) : IsInteger2(K) ? FromIntegerKey(K, T, options) : IsNumber3(K) ? FromNumberKey(K, T, options) : IsRegExp2(K) ? FromRegExpKey(K, T, options) : IsString3(K) ? FromStringKey(K, T, options) : Never(options);
}
// node_modules/@sinclair/typebox/build/esm/type/recursive/recursive.mjs
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id))
    options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: "Recursive", ...thisType });
}
var Ordinal = 0;
// node_modules/@sinclair/typebox/build/esm/type/ref/ref.mjs
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: "Ref", $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    $ref: unresolved.$id
  };
}
// node_modules/@sinclair/typebox/build/esm/type/regexp/regexp.mjs
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp", source: expr.source, flags: expr.flags };
}
// node_modules/@sinclair/typebox/build/esm/type/required/required.mjs
var FromRest8 = function(T) {
  return T.map((L) => RequiredResolve(L));
};
var FromProperties18 = function(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Discard(T[K], [OptionalKind]);
  return Acc;
};
var RequiredResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest8(T.allOf)) : IsUnion(T) ? Union(FromRest8(T.anyOf)) : IsObject3(T) ? Object2(FromProperties18(T.properties)) : Object2({});
};
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, "$id", "required"]);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
var FromProperties19 = function(P, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Required(P[K2], options);
  return Acc;
};
var FromMappedResult12 = function(R, options) {
  return FromProperties19(R.properties, options);
};
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/rest/rest.mjs
var RestResolve = function(T) {
  return IsIntersect(T) ? CloneRest(T.allOf) : IsUnion(T) ? CloneRest(T.anyOf) : IsTuple(T) ? CloneRest(T.items ?? []) : [];
};
function Rest(T) {
  return CloneRest(RestResolve(T));
}
// node_modules/@sinclair/typebox/build/esm/type/return-type/return-type.mjs
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/strict/strict.mjs
function Strict(schema2) {
  return JSON.parse(JSON.stringify(schema2));
}
// node_modules/@sinclair/typebox/build/esm/type/transform/transform.mjs
function Transform(schema2) {
  return new TransformDecodeBuilder(schema2);
}

class TransformDecodeBuilder {
  schema;
  constructor(schema2) {
    this.schema = schema2;
  }
  Decode(decode2) {
    return new TransformEncodeBuilder(this.schema, decode2);
  }
}

class TransformEncodeBuilder {
  schema;
  decode;
  constructor(schema2, decode2) {
    this.schema = schema2;
    this.decode = decode2;
  }
  EncodeTransform(encode2, schema2) {
    const Encode2 = (value11) => schema2[TransformKind].Encode(encode2(value11));
    const Decode2 = (value11) => this.decode(schema2[TransformKind].Decode(value11));
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  EncodeSchema(encode2, schema2) {
    const Codec = { Decode: this.decode, Encode: encode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  Encode(encode2) {
    const schema2 = CloneType(this.schema);
    return IsTransform(schema2) ? this.EncodeTransform(encode2, schema2) : this.EncodeSchema(encode2, schema2);
  }
}
// node_modules/@sinclair/typebox/build/esm/type/void/void.mjs
function Void(options = {}) {
  return {
    ...options,
    [Kind]: "Void",
    type: "void"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/type/type.mjs
var exports_type3 = {};
__export(exports_type3, {
  Void: () => {
    {
      return Void;
    }
  },
  Uppercase: () => {
    {
      return Uppercase;
    }
  },
  Unsafe: () => {
    {
      return Unsafe;
    }
  },
  Unknown: () => {
    {
      return Unknown;
    }
  },
  Union: () => {
    {
      return Union;
    }
  },
  Undefined: () => {
    {
      return Undefined;
    }
  },
  Uncapitalize: () => {
    {
      return Uncapitalize;
    }
  },
  Uint8Array: () => {
    {
      return Uint8Array2;
    }
  },
  Tuple: () => {
    {
      return Tuple;
    }
  },
  Transform: () => {
    {
      return Transform;
    }
  },
  TemplateLiteral: () => {
    {
      return TemplateLiteral;
    }
  },
  Symbol: () => {
    {
      return Symbol2;
    }
  },
  String: () => {
    {
      return String2;
    }
  },
  Strict: () => {
    {
      return Strict;
    }
  },
  ReturnType: () => {
    {
      return ReturnType;
    }
  },
  Rest: () => {
    {
      return Rest;
    }
  },
  Required: () => {
    {
      return Required;
    }
  },
  RegExp: () => {
    {
      return RegExp2;
    }
  },
  Ref: () => {
    {
      return Ref;
    }
  },
  Recursive: () => {
    {
      return Recursive;
    }
  },
  Record: () => {
    {
      return Record;
    }
  },
  ReadonlyOptional: () => {
    {
      return ReadonlyOptional;
    }
  },
  Readonly: () => {
    {
      return Readonly;
    }
  },
  Promise: () => {
    {
      return Promise2;
    }
  },
  Pick: () => {
    {
      return Pick;
    }
  },
  Partial: () => {
    {
      return Partial;
    }
  },
  Parameters: () => {
    {
      return Parameters;
    }
  },
  Optional: () => {
    {
      return Optional;
    }
  },
  Omit: () => {
    {
      return Omit;
    }
  },
  Object: () => {
    {
      return Object2;
    }
  },
  Number: () => {
    {
      return Number2;
    }
  },
  Null: () => {
    {
      return Null;
    }
  },
  Not: () => {
    {
      return Not2;
    }
  },
  Never: () => {
    {
      return Never;
    }
  },
  Mapped: () => {
    {
      return Mapped;
    }
  },
  Lowercase: () => {
    {
      return Lowercase;
    }
  },
  Literal: () => {
    {
      return Literal;
    }
  },
  KeyOf: () => {
    {
      return KeyOf;
    }
  },
  Iterator: () => {
    {
      return Iterator;
    }
  },
  Intersect: () => {
    {
      return Intersect;
    }
  },
  Integer: () => {
    {
      return Integer;
    }
  },
  InstanceType: () => {
    {
      return InstanceType;
    }
  },
  Index: () => {
    {
      return Index;
    }
  },
  Function: () => {
    {
      return Function2;
    }
  },
  Extract: () => {
    {
      return Extract;
    }
  },
  Extends: () => {
    {
      return Extends;
    }
  },
  Exclude: () => {
    {
      return Exclude;
    }
  },
  Enum: () => {
    {
      return Enum;
    }
  },
  Deref: () => {
    {
      return Deref2;
    }
  },
  Date: () => {
    {
      return Date2;
    }
  },
  ConstructorParameters: () => {
    {
      return ConstructorParameters;
    }
  },
  Constructor: () => {
    {
      return Constructor;
    }
  },
  Const: () => {
    {
      return Const;
    }
  },
  Composite: () => {
    {
      return Composite;
    }
  },
  Capitalize: () => {
    {
      return Capitalize;
    }
  },
  Boolean: () => {
    {
      return Boolean2;
    }
  },
  BigInt: () => {
    {
      return BigInt2;
    }
  },
  Awaited: () => {
    {
      return Awaited;
    }
  },
  AsyncIterator: () => {
    {
      return AsyncIterator;
    }
  },
  Array: () => {
    {
      return Array2;
    }
  },
  Any: () => {
    {
      return Any;
    }
  }
});

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
var Type = exports_type3;
// node_modules/@sinclair/typebox/build/esm/compiler/compiler.mjs
class TypeCheck {
  schema;
  references;
  checkFunc;
  code;
  hasTransform;
  constructor(schema3, references, checkFunc, code) {
    this.schema = schema3;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema3, references);
  }
  Code() {
    return this.code;
  }
  Errors(value11) {
    return Errors(this.schema, this.references, value11);
  }
  Check(value11) {
    return this.checkFunc(value11);
  }
  Decode(value11) {
    if (!this.checkFunc(value11))
      throw new TransformDecodeCheckError(this.schema, value11, this.Errors(value11).First());
    return this.hasTransform ? TransformDecode(this.schema, this.references, value11) : value11;
  }
  Encode(value11) {
    const encoded = this.hasTransform ? TransformEncode(this.schema, this.references, value11) : value11;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(this.schema, value11, this.Errors(value11).First());
    return encoded;
  }
}
var Character;
(function(Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
  }
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function(MemberExpression2) {
  function IsFirstCharacterNumeric(value11) {
    if (value11.length === 0)
      return false;
    return Character.IsNumeric(value11.charCodeAt(0));
  }
  function IsAccessor(value11) {
    if (IsFirstCharacterNumeric(value11))
      return false;
    for (let i = 0;i < value11.length; i++) {
      const code = value11.charCodeAt(i);
      const check11 = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
      if (!check11)
        return false;
    }
    return true;
  }
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  function Encode2(object13, key) {
    return IsAccessor(key) ? `${object13}.${key}` : `${object13}['${EscapeHyphen(key)}']`;
  }
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function(Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0;i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join("").replace(/__/g, "_");
  }
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function(LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));

class TypeCompilerUnknownTypeError extends TypeBoxError {
  schema;
  constructor(schema3) {
    super("Unknown type");
    this.schema = schema3;
  }
}

class TypeCompilerTypeGuardError extends TypeBoxError {
  schema;
  constructor(schema3) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = schema3;
  }
}
var Policy;
(function(Policy2) {
  function IsExactOptionalProperty(value11, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value11} ? ${expression} : true)` : `(${MemberExpression.Encode(value11, key)} !== undefined ? ${expression} : true)`;
  }
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}))` : `(typeof ${value11} === 'object' && ${value11} !== null)`;
  }
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}) && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))` : `(typeof ${value11} === 'object' && ${value11} !== null && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))`;
  }
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value11) {
    return TypeSystemPolicy.AllowNaN ? `typeof ${value11} === 'number'` : `Number.isFinite(${value11})`;
  }
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value11) {
    return TypeSystemPolicy.AllowNullVoid ? `(${value11} === undefined || ${value11} === null)` : `${value11} === undefined`;
  }
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function(TypeCompiler2) {
  function IsAnyOrUnknown2(schema3) {
    return schema3[Kind] === "Any" || schema3[Kind] === "Unknown";
  }
  function* FromAny5(schema3, references, value11) {
    yield "true";
  }
  function* FromArray16(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
    if (IsNumber(schema3.maxItems))
      yield `${value11}.length <= ${schema3.maxItems}`;
    if (IsNumber(schema3.minItems))
      yield `${value11}.length >= ${schema3.minItems}`;
    const elementExpression = CreateExpression(schema3.items, references, "value");
    yield `${value11}.every((${parameter}) => ${elementExpression})`;
    if (IsSchema2(schema3.contains) || IsNumber(schema3.minContains) || IsNumber(schema3.maxContains)) {
      const containsSchema = IsSchema2(schema3.contains) ? schema3.contains : Never();
      const checkExpression = CreateExpression(containsSchema, references, "value");
      const checkMinContains = IsNumber(schema3.minContains) ? [`(count >= ${schema3.minContains})`] : [];
      const checkMaxContains = IsNumber(schema3.maxContains) ? [`(count <= ${schema3.maxContains})`] : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check11 = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
      yield `((${parameter}) => { ${checkCount}; return ${check11}})(${value11})`;
    }
    if (schema3.uniqueItems === true) {
      const check11 = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check11} }`;
      yield `((${parameter}) => { ${block} )(${value11})`;
    }
  }
  function* FromAsyncIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value11})`;
  }
  function* FromBigInt6(schema3, references, value11) {
    yield `(typeof ${value11} === 'bigint')`;
    if (IsBigInt(schema3.exclusiveMaximum))
      yield `${value11} < BigInt(${schema3.exclusiveMaximum})`;
    if (IsBigInt(schema3.exclusiveMinimum))
      yield `${value11} > BigInt(${schema3.exclusiveMinimum})`;
    if (IsBigInt(schema3.maximum))
      yield `${value11} <= BigInt(${schema3.maximum})`;
    if (IsBigInt(schema3.minimum))
      yield `${value11} >= BigInt(${schema3.minimum})`;
    if (IsBigInt(schema3.multipleOf))
      yield `(${value11} % BigInt(${schema3.multipleOf})) === 0`;
  }
  function* FromBoolean6(schema3, references, value11) {
    yield `(typeof ${value11} === 'boolean')`;
  }
  function* FromConstructor8(schema3, references, value11) {
    yield* Visit17(schema3.returns, references, `${value11}.prototype`);
  }
  function* FromDate6(schema3, references, value11) {
    yield `(${value11} instanceof Date) && Number.isFinite(${value11}.getTime())`;
    if (IsNumber(schema3.exclusiveMaximumTimestamp))
      yield `${value11}.getTime() < ${schema3.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema3.exclusiveMinimumTimestamp))
      yield `${value11}.getTime() > ${schema3.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema3.maximumTimestamp))
      yield `${value11}.getTime() <= ${schema3.maximumTimestamp}`;
    if (IsNumber(schema3.minimumTimestamp))
      yield `${value11}.getTime() >= ${schema3.minimumTimestamp}`;
    if (IsNumber(schema3.multipleOfTimestamp))
      yield `(${value11}.getTime() % ${schema3.multipleOfTimestamp}) === 0`;
  }
  function* FromFunction7(schema3, references, value11) {
    yield `(typeof ${value11} === 'function')`;
  }
  function* FromInteger6(schema3, references, value11) {
    yield `Number.isInteger(${value11})`;
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromIntersect18(schema3, references, value11) {
    const check1 = schema3.allOf.map((schema4) => CreateExpression(schema4, references, value11)).join(" && ");
    if (schema3.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check22})`;
    } else if (IsSchema2(schema3.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema3.unevaluatedProperties, references, `${value11}[key]`)})`;
      yield `(${check1} && ${check22})`;
    } else {
      yield `(${check1})`;
    }
  }
  function* FromIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value11})`;
  }
  function* FromLiteral7(schema3, references, value11) {
    if (typeof schema3.const === "number" || typeof schema3.const === "boolean") {
      yield `(${value11} === ${schema3.const})`;
    } else {
      yield `(${value11} === '${LiteralString.Escape(schema3.const)}')`;
    }
  }
  function* FromNever6(schema3, references, value11) {
    yield `false`;
  }
  function* FromNot8(schema3, references, value11) {
    const expression = CreateExpression(schema3.not, references, value11);
    yield `(!${expression})`;
  }
  function* FromNull6(schema3, references, value11) {
    yield `(${value11} === null)`;
  }
  function* FromNumber6(schema3, references, value11) {
    yield Policy.IsNumberLike(value11);
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromObject13(schema3, references, value11) {
    yield Policy.IsObjectLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema3.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value11, knownKey);
      const property = schema3.properties[knownKey];
      if (schema3.required && schema3.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value11})`;
      } else {
        const expression = CreateExpression(property, references, memberExpression);
        yield Policy.IsExactOptionalProperty(value11, knownKey, expression);
      }
    }
    if (schema3.additionalProperties === false) {
      if (schema3.required && schema3.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value11}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema3.additionalProperties === "object") {
      const expression = CreateExpression(schema3.additionalProperties, references, `${value11}[key]`);
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  function* FromPromise8(schema3, references, value11) {
    yield `(typeof value === 'object' && typeof ${value11}.then === 'function')`;
  }
  function* FromRecord12(schema3, references, value11) {
    yield Policy.IsRecordLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(schema3.patternProperties)[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, "value");
    const check22 = IsSchema2(schema3.additionalProperties) ? CreateExpression(schema3.additionalProperties, references, value11) : schema3.additionalProperties === false ? "false" : "true";
    const expression = `(${variable}.test(key) ? ${check1} : ${check22})`;
    yield `(Object.entries(${value11}).every(([key, value]) => ${expression}))`;
  }
  function* FromRef12(schema3, references, value11) {
    const target = Deref(schema3, references);
    if (state.functions.has(schema3.$ref))
      return yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
    yield* Visit17(target, references, value11);
  }
  function* FromRegExp5(schema3, references, value11) {
    const variable = CreateVariable(`${new RegExp(schema3.source, schema3.flags)};`);
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    yield `${variable}.test(${value11})`;
  }
  function* FromString6(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    if (schema3.pattern !== undefined) {
      const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
      yield `${variable}.test(${value11})`;
    }
    if (schema3.format !== undefined) {
      yield `format('${schema3.format}', ${value11})`;
    }
  }
  function* FromSymbol6(schema3, references, value11) {
    yield `(typeof ${value11} === 'symbol')`;
  }
  function* FromTemplateLiteral7(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
    yield `${variable}.test(${value11})`;
  }
  function* FromThis11(schema3, references, value11) {
    yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
  }
  function* FromTuple15(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    if (schema3.items === undefined)
      return yield `${value11}.length === 0`;
    yield `(${value11}.length === ${schema3.maxItems})`;
    for (let i = 0;i < schema3.items.length; i++) {
      const expression = CreateExpression(schema3.items[i], references, `${value11}[${i}]`);
      yield `${expression}`;
    }
  }
  function* FromUndefined6(schema3, references, value11) {
    yield `${value11} === undefined`;
  }
  function* FromUnion20(schema3, references, value11) {
    const expressions = schema3.anyOf.map((schema4) => CreateExpression(schema4, references, value11));
    yield `(${expressions.join(" || ")})`;
  }
  function* FromUint8Array5(schema3, references, value11) {
    yield `${value11} instanceof Uint8Array`;
    if (IsNumber(schema3.maxByteLength))
      yield `(${value11}.length <= ${schema3.maxByteLength})`;
    if (IsNumber(schema3.minByteLength))
      yield `(${value11}.length >= ${schema3.minByteLength})`;
  }
  function* FromUnknown5(schema3, references, value11) {
    yield "true";
  }
  function* FromVoid5(schema3, references, value11) {
    yield Policy.IsVoidLike(value11);
  }
  function* FromKind4(schema3, references, value11) {
    const instance = state.instances.size;
    state.instances.set(instance, schema3);
    yield `kind('${schema3[Kind]}', ${instance}, ${value11})`;
  }
  function* Visit17(schema3, references, value11, useHoisting = true) {
    const references_ = IsString(schema3.$id) ? [...references, schema3] : references;
    const schema_ = schema3;
    if (useHoisting && IsString(schema3.$id)) {
      const functionName = CreateFunctionName(schema3.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value11})`;
      } else {
        const functionCode = CreateFunction(functionName, schema3, references, "value", false);
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value11})`;
      }
    }
    switch (schema_[Kind]) {
      case "Any":
        return yield* FromAny5(schema_, references_, value11);
      case "Array":
        return yield* FromArray16(schema_, references_, value11);
      case "AsyncIterator":
        return yield* FromAsyncIterator7(schema_, references_, value11);
      case "BigInt":
        return yield* FromBigInt6(schema_, references_, value11);
      case "Boolean":
        return yield* FromBoolean6(schema_, references_, value11);
      case "Constructor":
        return yield* FromConstructor8(schema_, references_, value11);
      case "Date":
        return yield* FromDate6(schema_, references_, value11);
      case "Function":
        return yield* FromFunction7(schema_, references_, value11);
      case "Integer":
        return yield* FromInteger6(schema_, references_, value11);
      case "Intersect":
        return yield* FromIntersect18(schema_, references_, value11);
      case "Iterator":
        return yield* FromIterator7(schema_, references_, value11);
      case "Literal":
        return yield* FromLiteral7(schema_, references_, value11);
      case "Never":
        return yield* FromNever6(schema_, references_, value11);
      case "Not":
        return yield* FromNot8(schema_, references_, value11);
      case "Null":
        return yield* FromNull6(schema_, references_, value11);
      case "Number":
        return yield* FromNumber6(schema_, references_, value11);
      case "Object":
        return yield* FromObject13(schema_, references_, value11);
      case "Promise":
        return yield* FromPromise8(schema_, references_, value11);
      case "Record":
        return yield* FromRecord12(schema_, references_, value11);
      case "Ref":
        return yield* FromRef12(schema_, references_, value11);
      case "RegExp":
        return yield* FromRegExp5(schema_, references_, value11);
      case "String":
        return yield* FromString6(schema_, references_, value11);
      case "Symbol":
        return yield* FromSymbol6(schema_, references_, value11);
      case "TemplateLiteral":
        return yield* FromTemplateLiteral7(schema_, references_, value11);
      case "This":
        return yield* FromThis11(schema_, references_, value11);
      case "Tuple":
        return yield* FromTuple15(schema_, references_, value11);
      case "Undefined":
        return yield* FromUndefined6(schema_, references_, value11);
      case "Union":
        return yield* FromUnion20(schema_, references_, value11);
      case "Uint8Array":
        return yield* FromUint8Array5(schema_, references_, value11);
      case "Unknown":
        return yield* FromUnknown5(schema_, references_, value11);
      case "Void":
        return yield* FromVoid5(schema_, references_, value11);
      default:
        if (!exports_type.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema3);
        return yield* FromKind4(schema_, references_, value11);
    }
  }
  const state = {
    language: "javascript",
    functions: new Map,
    variables: new Map,
    instances: new Map
  };
  function CreateExpression(schema3, references, value11, useHoisting = true) {
    return `(${[...Visit17(schema3, references, value11, useHoisting)].join(" && ")})`;
  }
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  function CreateFunction(name, schema3, references, value11, useHoisting = true) {
    const [newline, pad] = ["\n", (length) => "".padStart(length, " ")];
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const expression = [...Visit17(schema3, references, value11, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})\n}`;
  }
  function CreateParameter(name, type47) {
    const annotation = state.language === "typescript" ? `: ${type47}` : "";
    return `${name}${annotation}`;
  }
  function CreateReturns(type47) {
    return state.language === "typescript" ? `: ${type47}` : "";
  }
  function Build(schema3, references, options) {
    const functionCode = CreateFunction("check", schema3, references, "value");
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema3.$id) ? `return function check(${parameter})${returns} {\n  return ${CreateFunctionName(schema3.$id)}(value)\n}` : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join("\n");
  }
  function Code(...args) {
    const defaults = { language: "javascript" };
    const [schema3, references, options] = args.length === 2 && IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema2(schema3))
      throw new TypeCompilerTypeGuardError(schema3);
    for (const schema4 of references)
      if (!IsSchema2(schema4))
        throw new TypeCompilerTypeGuardError(schema4);
    return Build(schema3, references, options);
  }
  TypeCompiler2.Code = Code;
  function Compile(schema3, references = []) {
    const generatedCode = Code(schema3, references, { language: "javascript" });
    const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind28, instance, value11) {
      if (!exports_type.Has(kind28) || !instances.has(instance))
        return false;
      const checkFunc = exports_type.Get(kind28);
      const schema4 = instances.get(instance);
      return checkFunc(schema4, value11);
    }
    function formatRegistryFunction(format, value11) {
      if (!exports_format.Has(format))
        return false;
      const checkFunc = exports_format.Get(format);
      return checkFunc(value11);
    }
    function hashFunction(value11) {
      return Hash(value11);
    }
    const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
    return new TypeCheck(schema3, references, checkFunction, generatedCode);
  }
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));
// node_modules/cookie/index.js
var parse4 = function(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode2;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (obj[key] === undefined) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
};
var serialize = function(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode2;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value11 = enc(val);
  if (value11 && !fieldContentRegExp.test(value11)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value11;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
};
var decode2 = function(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
};
var encode2 = function(val) {
  return encodeURIComponent(val);
};
var isDate = function(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
};
var tryDecode = function(str, decode3) {
  try {
    return decode3(str);
  } catch (e) {
    return str;
  }
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var $parse = parse4;
var $serialize = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

// node_modules/elysia/dist/index.mjs
var import_fast_decode_uri_component = __toESM(require_fast_decode_uri_component(), 1);
var removeTrailingEquals = function(digest) {
  let trimmedDigest = digest;
  while (trimmedDigest.endsWith("=")) {
    trimmedDigest = trimmedDigest.slice(0, -1);
  }
  return trimmedDigest;
};
var import_fast_querystring = __toESM(require_lib(), 1);
var import_fast_decode_uri_component2 = __toESM(require_fast_decode_uri_component(), 1);
var import_fast_querystring2 = __toESM(require_lib(), 1);
var isLeapYear = function(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
var date5 = function(str) {
  const matches = DATE.exec(str);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
};
var getTime = function(strictTimeZone) {
  return function time(str) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hr = +matches[1];
    const min = +matches[2];
    const sec = +matches[3];
    const tz = matches[4];
    const tzSign = matches[5] === "-" ? -1 : 1;
    const tzH = +(matches[6] || 0);
    const tzM = +(matches[7] || 0);
    if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
      return false;
    if (hr <= 23 && min <= 59 && sec < 60)
      return true;
    const utcMin = min - tzM * tzSign;
    const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
    return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
  };
};
var getDateTime = function(strictTimeZone) {
  const time = getTime(strictTimeZone);
  return function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date5(dateTime[0]) && time(dateTime[1]);
  };
};
var uri = function(str) {
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
};
var byte = function(str) {
  BYTE.lastIndex = 0;
  return BYTE.test(str);
};
var validateInt32 = function(value15) {
  return Number.isInteger(value15) && value15 <= MAX_INT32 && value15 >= MIN_INT32;
};
var validateInt64 = function(value15) {
  return Number.isInteger(value15);
};
var validateNumber = function() {
  return true;
};
var regex = function(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str);
    return true;
  } catch (e2) {
    return false;
  }
};
var e = (e2, t3) => ({ part: e2, store: null, inert: t3 !== undefined ? new Map(t3.map((e3) => [e3.part.charCodeAt(0), e3])) : null, params: null, wildcardStore: null });
var t = (e2, t3) => ({ ...e2, part: t3 });
var r = (e2) => ({ paramName: e2, store: null, inert: null });
var Memoirist = class _Memoirist {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g };
  add(a2, l, i) {
    let s;
    if (typeof l != "string")
      throw TypeError("Route path must be a string");
    l === "" ? l = "/" : l[0] !== "/" && (l = `/${l}`), this.history.push([a2, l, i]);
    let n = l[l.length - 1] === "*";
    n && (l = l.slice(0, -1));
    let o = l.split(_Memoirist.regex.static), u = l.match(_Memoirist.regex.params) || [];
    o[o.length - 1] === "" && o.pop(), s = this.root[a2] ? this.root[a2] : this.root[a2] = e("/");
    let p = 0;
    for (let a3 = 0;a3 < o.length; ++a3) {
      let i2 = o[a3];
      if (a3 > 0) {
        let t3 = u[p++].slice(1);
        if (s.params === null)
          s.params = r(t3);
        else if (s.params.paramName !== t3)
          throw Error(`Cannot create route "${l}" with parameter "${t3}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
        let a4 = s.params;
        if (a4.inert === null) {
          s = a4.inert = e(i2);
          continue;
        }
        s = a4.inert;
      }
      for (let r2 = 0;; ) {
        if (r2 === i2.length) {
          if (r2 < s.part.length) {
            let a4 = t(s, s.part.slice(r2));
            Object.assign(s, e(i2, [a4]));
          }
          break;
        }
        if (r2 === s.part.length) {
          if (s.inert === null)
            s.inert = new Map;
          else if (s.inert.has(i2.charCodeAt(r2))) {
            s = s.inert.get(i2.charCodeAt(r2)), i2 = i2.slice(r2), r2 = 0;
            continue;
          }
          let t3 = e(i2.slice(r2));
          s.inert.set(i2.charCodeAt(r2), t3), s = t3;
          break;
        }
        if (i2[r2] !== s.part[r2]) {
          let a4 = t(s, s.part.slice(r2)), l2 = e(i2.slice(r2));
          Object.assign(s, e(s.part.slice(0, r2), [a4, l2])), s = l2;
          break;
        }
        ++r2;
      }
    }
    if (p < u.length) {
      let e2 = u[p], t3 = e2.slice(1);
      if (s.params === null)
        s.params = r(t3);
      else if (s.params.paramName !== t3)
        throw Error(`Cannot create route "${l}" with parameter "${t3}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
      return s.params.store === null && (s.params.store = i), s.params.store;
    }
    return n ? (s.wildcardStore === null && (s.wildcardStore = i), s.wildcardStore) : (s.store === null && (s.store = i), s.store);
  }
  find(e2, t3) {
    let r2 = this.root[e2];
    return r2 ? a(t3, t3.length, r2, 0) : null;
  }
};
var a = (e2, t3, r2, l) => {
  let i = r2?.part, s = l + i.length;
  if (i.length > 1) {
    if (s > t3)
      return null;
    if (i.length < 15) {
      for (let t4 = 1, r3 = l + 1;t4 < i.length; ++t4, ++r3)
        if (i.charCodeAt(t4) !== e2.charCodeAt(r3))
          return null;
    } else if (e2.substring(l, s) !== i)
      return null;
  }
  if (s === t3)
    return r2.store !== null ? { store: r2.store, params: {} } : r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": "" } } : null;
  if (r2.inert !== null) {
    let l2 = r2.inert.get(e2.charCodeAt(s));
    if (l2 !== undefined) {
      let r3 = a(e2, t3, l2, s);
      if (r3 !== null)
        return r3;
    }
  }
  if (r2.params !== null) {
    let l2 = r2.params, i2 = e2.indexOf("/", s);
    if (i2 !== s) {
      if (i2 === -1 || i2 >= t3) {
        if (l2.store !== null) {
          let r3 = {};
          return r3[l2.paramName] = e2.substring(s, t3), { store: l2.store, params: r3 };
        }
      } else if (l2.inert !== null) {
        let r3 = a(e2, t3, l2.inert, i2);
        if (r3 !== null)
          return r3.params[l2.paramName] = e2.substring(s, i2), r3;
      }
    }
  }
  return r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": e2.substring(s, t3) } } : null;
};
var resolver = () => {
  let resolve;
  const promise5 = new Promise((r2) => {
    resolve = r2;
  });
  return [promise5, resolve];
};
var createSignal = () => {
  const [start, resolveStart] = resolver();
  const [end, resolveEnd] = resolver();
  const children = [];
  const resolvers = [];
  return {
    signal: start,
    consume: (trace) => {
      switch (trace.type) {
        case "begin":
          if (trace.unit && children.length === 0)
            for (let i = 0;i < trace.unit; i++) {
              const [start2, resolveStart2] = resolver();
              const [end2, resolveEnd2] = resolver();
              children.push(start2);
              resolvers.push([
                (trace2) => {
                  resolveStart2({
                    children: [],
                    end: end2,
                    name: trace2.name ?? "",
                    skip: false,
                    time: trace2.time
                  });
                },
                (time) => {
                  resolveEnd2(time);
                }
              ]);
            }
          resolveStart({
            children,
            end,
            name: trace.name ?? "",
            skip: false,
            time: trace.time
          });
          break;
        case "end":
          resolveEnd(trace.time);
          break;
      }
    },
    consumeChild(trace) {
      switch (trace.type) {
        case "begin":
          if (!resolvers[0])
            return;
          const [resolveStart2] = resolvers[0];
          resolveStart2({
            children: [],
            end,
            name: trace.name ?? "",
            skip: false,
            time: trace.time
          });
          break;
        case "end":
          const child = resolvers.shift();
          if (!child)
            return;
          child[1](trace.time);
      }
    },
    resolve() {
      resolveStart({
        children: [],
        end: new Promise((resolve) => resolve(0)),
        name: "",
        skip: true,
        time: 0
      });
      for (const [resolveStart2, resolveEnd2] of resolvers) {
        resolveStart2({
          children: [],
          end: new Promise((resolve) => resolve(0)),
          name: "",
          skip: true,
          time: 0
        });
        resolveEnd2(0);
      }
      resolveEnd(0);
    }
  };
};
var createTraceListener = (getReporter, totalListener, handler) => {
  if (typeof handler === "object")
    handler = handler.fn;
  return async function trace(trace) {
    if (trace.event !== "request" || trace.type !== "begin")
      return;
    const id = trace.id;
    const reporter = getReporter();
    const request = createSignal();
    const parse22 = createSignal();
    const transform7 = createSignal();
    const beforeHandle = createSignal();
    const handle = createSignal();
    const afterHandle = createSignal();
    const error22 = createSignal();
    const response = createSignal();
    request.consume(trace);
    const reducer = (event) => {
      if (event.id === id)
        switch (event.event) {
          case "request":
            request.consume(event);
            break;
          case "request.unit":
            request.consumeChild(event);
            break;
          case "parse":
            parse22.consume(event);
            break;
          case "parse.unit":
            parse22.consumeChild(event);
            break;
          case "transform":
            transform7.consume(event);
            break;
          case "transform.unit":
            transform7.consumeChild(event);
            break;
          case "beforeHandle":
            beforeHandle.consume(event);
            break;
          case "beforeHandle.unit":
            beforeHandle.consumeChild(event);
            break;
          case "handle":
            handle.consume(event);
            break;
          case "afterHandle":
            afterHandle.consume(event);
            break;
          case "afterHandle.unit":
            afterHandle.consumeChild(event);
            break;
          case "error":
            error22.consume(event);
            break;
          case "error.unit":
            error22.consumeChild(event);
            break;
          case "response":
            if (event.type === "begin") {
              request.resolve();
              parse22.resolve();
              transform7.resolve();
              beforeHandle.resolve();
              handle.resolve();
              afterHandle.resolve();
              error22.resolve();
            } else
              reporter.off("event", reducer);
            response.consume(event);
            break;
          case "response.unit":
            response.consumeChild(event);
            break;
          case "exit":
            request.resolve();
            parse22.resolve();
            transform7.resolve();
            beforeHandle.resolve();
            handle.resolve();
            afterHandle.resolve();
            error22.resolve();
            break;
        }
    };
    reporter.on("event", reducer);
    await handler({
      id,
      context: trace.ctx,
      set: trace.ctx?.set,
      store: trace.ctx?.store,
      time: trace.time,
      request: request.signal,
      parse: parse22.signal,
      transform: transform7.signal,
      beforeHandle: beforeHandle.signal,
      handle: handle.signal,
      afterHandle: afterHandle.signal,
      error: error22.signal,
      response: response.signal
    });
    reporter.emit(`res${id}.${totalListener}`, undefined);
  };
};
var separateFunction = (code) => {
  if (code.startsWith("async"))
    code = code.slice(6);
  let index = -1;
  if (code.charCodeAt(0) === 40) {
    index = code.indexOf(") => {\n");
    if (index !== -1)
      return [
        code.slice(1, index),
        code.slice(index + 5),
        { isArrowReturn: false }
      ];
    index = code.indexOf(") => ");
    if (index !== -1)
      return [
        code.slice(1, index),
        code.slice(index + 5),
        { isArrowReturn: true }
      ];
  }
  if (code.startsWith("function")) {
    index = code.indexOf("(");
    const end = code.indexOf(")");
    return [
      code.slice(index + 1, end),
      code.slice(end + 2),
      {
        isArrowReturn: false
      }
    ];
  }
  const start = code.indexOf("(");
  if (start !== -1) {
    const [parameter, body] = code.split("\n", 2);
    const end = parameter.lastIndexOf(")") + 1;
    return [
      parameter.slice(start, end),
      "{" + body,
      {
        isArrowReturn: false
      }
    ];
  }
  const x = code.split("\n", 2);
  return [x[0], x[1], { isArrowReturn: false }];
};
var bracketPairRange = (parameter) => {
  const start = parameter.indexOf("{");
  if (start === -1)
    return [-1, 0];
  let end = start + 1;
  let deep = 1;
  for (;end < parameter.length; end++) {
    const char = parameter.charCodeAt(end);
    if (char === 123)
      deep++;
    else if (char === 125)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [0, parameter.length];
  return [start, end + 1];
};
var bracketPairRangeReverse = (parameter) => {
  const end = parameter.lastIndexOf("}");
  if (end === -1)
    return [-1, 0];
  let start = end - 1;
  let deep = 1;
  for (;start >= 0; start--) {
    const char = parameter.charCodeAt(start);
    if (char === 125)
      deep++;
    else if (char === 123)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [-1, 0];
  return [start, end + 1];
};
var retrieveRootParamters = (parameter) => {
  if (parameter.charCodeAt(0) === 40)
    parameter = parameter.slice(1, -1);
  if (parameter.charCodeAt(0) === 123)
    parameter = parameter.slice(2, -2);
  while (true) {
    const [start, end] = bracketPairRange(parameter);
    if (start === -1)
      break;
    parameter = parameter.slice(0, start - 2) + parameter.slice(end + 1);
  }
  return parameter.replace(/:/g, "").trim();
};
var findParameterReference = (parameter, inference) => {
  const root = retrieveRootParamters(parameter);
  if (!inference.query && root.includes("query"))
    inference.query = true;
  if (!inference.headers && root.includes("headers"))
    inference.headers = true;
  if (!inference.body && root.includes("body"))
    inference.body = true;
  if (!inference.cookie && root.includes("cookie"))
    inference.cookie = true;
  if (!inference.set && root.includes("set"))
    inference.set = true;
  return root;
};
var findTraceParameterReference = (parameter, inference) => {
  const root = retrieveRootParamters(parameter);
  if (!inference.request && root.includes("request"))
    inference.request = true;
  if (!inference.parse && root.includes("parse"))
    inference.parse = true;
  if (!inference.transform && root.includes("transform"))
    inference.transform = true;
  if (!inference.handle && root.includes("handle"))
    inference.handle = true;
  if (!inference.beforeHandle && root.includes("beforeHandle"))
    inference.beforeHandle = true;
  if (!inference.afterHandle && root.includes("afterHandle"))
    inference.afterHandle = true;
  if (!inference.error && root.includes("error"))
    inference.error = true;
  if (!inference.context && root.includes("context"))
    inference.context = true;
  if (!inference.store && root.includes("store"))
    inference.store = true;
  if (!inference.set && root.includes("set"))
    inference.set = true;
  return root;
};
var findEndIndex = (type47, content, index) => {
  const newLineIndex = content.indexOf(type47 + "\n", index);
  const newTabIndex = content.indexOf(type47 + "	", index);
  const commaIndex = content.indexOf(type47 + ",", index);
  const semicolonIndex = content.indexOf(type47 + ";", index);
  const emptyIndex = content.indexOf(type47 + " ", index);
  return [newLineIndex, newTabIndex, commaIndex, semicolonIndex, emptyIndex].filter((i) => i > 0).sort((a2, b) => a2 - b)[0] || -1;
};
var findAlias = (type47, body, depth = 0) => {
  if (depth > 5)
    return [];
  const aliases = [];
  let content = body;
  while (true) {
    let index = findEndIndex(" = " + type47, content);
    if (index === -1) {
      const lastIndex = content.indexOf(" = " + type47);
      if (lastIndex + 3 + type47.length !== content.length)
        break;
      index = lastIndex;
    }
    const part = content.slice(0, index);
    let variable = part.slice(part.lastIndexOf(" ") + 1);
    if (variable === "}") {
      const [start, end] = bracketPairRangeReverse(part);
      aliases.push(content.slice(start, end));
      content = content.slice(index + 3 + type47.length);
      continue;
    }
    while (variable.charCodeAt(0) === 44)
      variable = variable.slice(1);
    while (variable.charCodeAt(0) === 9)
      variable = variable.slice(1);
    aliases.push(variable);
    content = content.slice(index + 3 + type47.length);
  }
  for (const alias of aliases) {
    if (alias.charCodeAt(0) === 123)
      continue;
    const deepAlias = findAlias(alias, body);
    if (deepAlias.length > 0)
      aliases.push(...deepAlias);
  }
  return aliases;
};
var extractMainParameter = (parameter) => {
  if (!parameter)
    return;
  const hasComma = parameter.includes(",");
  if (!hasComma) {
    if (parameter.includes("..."))
      return parameter.slice(parameter.indexOf("...") + 3);
    return parameter;
  }
  const spreadIndex = parameter.indexOf("...");
  if (spreadIndex === -1)
    return;
  return parameter.slice(spreadIndex + 3).trimEnd();
};
var inferBodyReference = (code, aliases, inference) => {
  const access = (type47, alias) => code.includes(alias + "." + type47) || code.includes(alias + '["' + type47 + '"]') || code.includes(alias + "['" + type47 + "']");
  for (let alias of aliases) {
    if (!alias)
      continue;
    if (alias.charCodeAt(0) === 123) {
      alias = retrieveRootParamters(alias);
      if (!inference.query && alias.includes("query"))
        inference.query = true;
      if (!inference.headers && alias.includes("headers"))
        inference.headers = true;
      if (!inference.body && alias.includes("body"))
        inference.body = true;
      if (!inference.cookie && alias.includes("cookie"))
        inference.cookie = true;
      if (!inference.set && alias.includes("set"))
        inference.set = true;
      continue;
    }
    if (code.includes("(" + alias + ")")) {
      inference.query = true;
      inference.headers = true;
      inference.body = true;
      inference.cookie = true;
      inference.set = true;
      inference.queries = [];
      inference.unknownQueries = true;
      break;
    }
    if (!inference.query && access("query", alias))
      inference.query = true;
    if (code.includes("return " + alias) || code.includes("return " + alias + ".query")) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (!inference.unknownQueries && inference.query) {
      let keyword = alias + ".";
      if (code.includes(keyword + "query"))
        keyword = alias + ".query";
      while (true) {
        let start = code.indexOf(keyword);
        if (start === -1 && code.indexOf(alias + "[") !== -1) {
          inference.queries = [];
          inference.unknownQueries = true;
          break;
        }
        if (start !== -1) {
          let end = findEndIndex("", code, start + keyword.length + 1);
          if (end === -1)
            end = undefined;
          const index = start + alias.length + 1;
          code = code.slice(start + alias.length + 1);
          let query = code.slice(0, end ? end - index : end).trimEnd();
          while (start !== -1) {
            start = query.indexOf(".");
            if (start !== -1)
              query = query.slice(start + 1);
          }
          if (query.charCodeAt(query.length - 1) === 59)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 44)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 93)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 41)
            query = query.slice(0, -1);
          if (query && !inference.queries.includes(query)) {
            inference.queries.push(query);
            continue;
          }
        }
        break;
      }
    }
    if (!inference.headers && access("headers", alias))
      inference.headers = true;
    if (!inference.body && access("body", alias))
      inference.body = true;
    if (!inference.cookie && access("cookie", alias))
      inference.cookie = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set)
      break;
  }
  return aliases;
};
var removeDefaultParameter = (parameter) => {
  while (true) {
    const index = parameter.indexOf("=");
    if (index === -1)
      break;
    const commaIndex = parameter.indexOf(",", index);
    const bracketIndex = parameter.indexOf("}", index);
    const end = [commaIndex, bracketIndex].filter((i) => i > 0).sort((a2, b) => a2 - b)[0] || -1;
    if (end === -1) {
      parameter = parameter.slice(0, index);
      break;
    }
    parameter = parameter.slice(0, index) + parameter.slice(end);
  }
  return parameter.split(",").map((i) => i.trim()).join(", ");
};
var validateInferencedQueries = (queries) => {
  for (const query of queries) {
    if (query.charCodeAt(0) === 123)
      return false;
    if (query.indexOf("'") !== -1)
      return false;
    if (query.indexOf('"') !== -1)
      return false;
    if (query.indexOf("\n") !== -1)
      return false;
    if (query.indexOf("	") !== -1)
      return false;
  }
  return true;
};
var inferTraceBodyReference = (code, aliases, inference) => {
  const access = (type47, alias) => code.includes(type47 + "." + alias) || code.includes(type47 + '["' + alias + '"]') || code.includes(type47 + "['" + alias + "']");
  for (let alias of aliases) {
    if (alias.charCodeAt(0) === 123) {
      alias = retrieveRootParamters(alias);
      if (!inference.request && alias.includes("request"))
        inference.request = true;
      if (!inference.parse && alias.includes("parse"))
        inference.parse = true;
      if (!inference.transform && alias.includes("transform"))
        inference.transform = true;
      if (!inference.handle && alias.includes("handle"))
        inference.handle = true;
      if (!inference.beforeHandle && alias.includes("beforeHandle"))
        inference.beforeHandle = true;
      if (!inference.afterHandle && alias.includes("afterHandle"))
        inference.afterHandle = true;
      if (!inference.error && alias.includes("error"))
        inference.error = true;
      if (!inference.context && alias.includes("context"))
        inference.context = true;
      if (!inference.store && alias.includes("store"))
        inference.store = true;
      if (!inference.set && alias.includes("set"))
        inference.set = true;
      continue;
    }
    if (code.includes("(" + alias + ")")) {
      inference.request = true;
      inference.parse = true;
      inference.transform = true;
      inference.handle = true;
      inference.beforeHandle = true;
      inference.afterHandle = true;
      inference.error = true;
      inference.context = true;
      inference.store = true;
      inference.set = true;
      break;
    }
    if (!inference.request && access("request", alias))
      inference.request = true;
    if (!inference.parse && access("parse", alias))
      inference.parse = true;
    if (!inference.transform && access("transform", alias))
      inference.transform = true;
    if (!inference.handle && access("handle", alias))
      inference.handle = true;
    if (!inference.beforeHandle && access("beforeHandle", alias))
      inference.beforeHandle = true;
    if (!inference.afterHandle && access("afterHandle", alias))
      inference.afterHandle = true;
    if (!inference.error && access("error", alias))
      inference.error = true;
    if (!inference.context && access("context", alias))
      inference.context = true;
    if (!inference.store && access("store", alias))
      inference.store = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (inference.request && inference.parse && inference.transform && inference.handle && inference.beforeHandle && inference.afterHandle && inference.error && inference.context && inference.store && inference.set)
      break;
  }
  return aliases;
};
var sucrose = (lifeCycle, inference = {
  queries: [],
  query: false,
  headers: false,
  body: false,
  cookie: false,
  set: false,
  unknownQueries: false
}) => {
  const events = [];
  if (lifeCycle.handler && typeof lifeCycle.handler === "function")
    events.push(lifeCycle.handler);
  if (lifeCycle.beforeHandle?.length)
    events.push(...lifeCycle.beforeHandle);
  if (lifeCycle.parse?.length)
    events.push(...lifeCycle.parse);
  if (lifeCycle.error?.length)
    events.push(...lifeCycle.error);
  if (lifeCycle.transform?.length)
    events.push(...lifeCycle.transform);
  if (lifeCycle.afterHandle?.length)
    events.push(...lifeCycle.afterHandle);
  if (lifeCycle.mapResponse?.length)
    events.push(...lifeCycle.mapResponse);
  if (lifeCycle.request?.length)
    events.push(...lifeCycle.request);
  if (lifeCycle.onResponse?.length)
    events.push(...lifeCycle.onResponse);
  for (const e2 of events) {
    if (!e2)
      continue;
    const event = "fn" in e2 ? e2.fn : e2;
    const [parameter, body, { isArrowReturn }] = separateFunction(event.toString());
    const rootParameters = findParameterReference(parameter, inference);
    const mainParameter = extractMainParameter(rootParameters);
    if (isArrowReturn && (body === "query" || rootParameters && body.startsWith(rootParameters + ".query"))) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (mainParameter) {
      const aliases = findAlias(mainParameter, body);
      aliases.splice(0, -1, mainParameter);
      inferBodyReference(body, aliases, inference);
    }
    const context = rootParameters || mainParameter;
    if (context && body.includes("return " + context + ".query")) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (inference.query) {
      inferBodyReference(body, ["query"], inference);
      const queryIndex = parameter.indexOf("query: {");
      if (queryIndex !== -1) {
        const part = parameter.slice(queryIndex + 7);
        const [start, end] = bracketPairRange(part);
        const queryBracket = removeDefaultParameter(part.slice(start, end));
        for (let query of queryBracket.slice(1, -1).split(",")) {
          const index = query.indexOf(":");
          if (index !== -1)
            query = query.slice(0, index);
          query = query.trim();
          if (query && !inference.queries.includes(query))
            inference.queries.push(query.trim());
        }
      }
    }
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set)
      break;
  }
  if (!validateInferencedQueries(inference.queries)) {
    inference.unknownQueries = true;
    inference.queries = [];
  }
  return inference;
};
var sucroseTrace = (traces, inference = {
  request: false,
  parse: false,
  transform: false,
  handle: false,
  beforeHandle: false,
  afterHandle: false,
  error: false,
  context: false,
  store: false,
  set: false
}) => {
  for (const handler of traces) {
    const [parameter, body] = separateFunction(handler.toString());
    const rootParameters = findTraceParameterReference(parameter, inference);
    const mainParameter = extractMainParameter(rootParameters);
    if (mainParameter) {
      const aliases = findAlias(mainParameter, body);
      aliases.splice(0, -1, mainParameter);
      inferTraceBodyReference(body, aliases, inference);
      continue;
    }
    if (inference.request && inference.parse && inference.transform && inference.handle && inference.beforeHandle && inference.afterHandle && inference.error && inference.context && inference.store && inference.set)
      break;
  }
  return inference;
};
var Cookie = class {
  constructor(name, jar, initial = {}) {
    this.name = name;
    this.jar = jar;
    this.initial = initial;
  }
  get cookie() {
    if (!(this.name in this.jar))
      return this.initial;
    return this.jar[this.name];
  }
  set cookie(jar) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = jar;
  }
  get value() {
    return this.cookie.value;
  }
  set value(value15) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name].value = value15;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(expires) {
    this.cookie.expires = expires;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(maxAge) {
    this.cookie.maxAge = maxAge;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(domain) {
    this.cookie.domain = domain;
  }
  get path() {
    return this.cookie.path;
  }
  set path(path) {
    this.cookie.path = path;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(secure) {
    this.cookie.secure = secure;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(httpOnly) {
    this.cookie.httpOnly = httpOnly;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(sameSite) {
    this.cookie.sameSite = sameSite;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(priority) {
    this.cookie.priority = priority;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(secrets) {
    this.cookie.secrets = secrets;
  }
  update(config) {
    this.cookie = Object.assign(this.cookie, typeof config === "function" ? config(this.cookie) : config);
    return this;
  }
  set(config) {
    this.cookie = Object.assign({
      ...this.initial,
      value: this.value
    }, typeof config === "function" ? config(this.cookie) : config);
    return this;
  }
  remove() {
    if (this.value === undefined)
      return;
    this.set({
      expires: new Date(0),
      maxAge: 0,
      value: ""
    });
    return this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
};
var createCookieJar = (set2, store, initial) => {
  if (!set2.cookie)
    set2.cookie = {};
  return new Proxy(store, {
    get(_, key) {
      if (key in store)
        return new Cookie(key, set2.cookie, Object.assign({}, initial ?? {}, store[key]));
      return new Cookie(key, set2.cookie, Object.assign({}, initial));
    }
  });
};
var parseCookie = async (set2, cookieString, {
  secrets,
  sign,
  ...initial
} = {}) => {
  if (!cookieString)
    return createCookieJar(set2, {}, initial);
  const isStringKey = typeof secrets === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  const jar = {};
  const cookies = $parse(cookieString);
  for (const [name, v] of Object.entries(cookies)) {
    let value15 = import_fast_decode_uri_component.default(v);
    if (sign === true || sign?.includes(name)) {
      if (!secrets)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        const temp = await unsignCookie(value15, secrets);
        if (temp === false)
          throw new InvalidCookieSignature(name);
        value15 = temp;
      } else {
        let decoded = true;
        for (let i = 0;i < secrets.length; i++) {
          const temp = await unsignCookie(value15, secrets[i]);
          if (temp !== false) {
            decoded = true;
            value15 = temp;
            break;
          }
        }
        if (!decoded)
          throw new InvalidCookieSignature(name);
      }
    }
    const start = value15.charCodeAt(0);
    if (start === 123 || start === 91)
      try {
        jar[name] = {
          value: JSON.parse(value15)
        };
        continue;
      } catch {
      }
    if (isNumericString(value15)) {
      jar[name] = {
        value: parseInt(value15)
      };
      continue;
    }
    if (value15 === "true") {
      jar[name] = {
        value: true
      };
      continue;
    }
    if (value15 === "false") {
      jar[name] = {
        value: false
      };
      continue;
    }
    jar[name] = {
      value: value15
    };
  }
  return createCookieJar(set2, jar, initial);
};
var hasHeaderShorthand = "toJSON" in new Headers;
var isNotEmpty = (obj) => {
  if (!obj)
    return false;
  for (const x in obj)
    return true;
  return false;
};
var handleFile = (response, set2) => {
  const size = response.size;
  if (!set2 && size || size && set2 && set2.status !== 206 && set2.status !== 304 && set2.status !== 412 && set2.status !== 416) {
    if (set2) {
      if (set2.headers instanceof Headers) {
        if (hasHeaderShorthand)
          set2.headers = set2.headers.toJSON();
        else
          for (const [key, value15] of set2.headers.entries())
            if (key in set2.headers)
              set2.headers[key] = value15;
      }
      return new Response(response, {
        status: set2.status,
        headers: Object.assign({
          "accept-ranges": "bytes",
          "content-range": `bytes 0-${size - 1}/${size}`
        }, set2.headers)
      });
    }
    return new Response(response, {
      headers: {
        "accept-ranges": "bytes",
        "content-range": `bytes 0-${size - 1}/${size}`
      }
    });
  }
  return new Response(response);
};
var parseSetCookies = (headers, setCookie) => {
  if (!headers)
    return headers;
  headers.delete("Set-Cookie");
  for (let i = 0;i < setCookie.length; i++) {
    const index = setCookie[i].indexOf("=");
    headers.append("Set-Cookie", `${setCookie[i].slice(0, index)}=${setCookie[i].slice(index + 1) || ""}`);
  }
  return headers;
};
var serializeCookie = (cookies) => {
  if (!cookies || !isNotEmpty(cookies))
    return;
  const set2 = [];
  for (const [key, property] of Object.entries(cookies)) {
    if (!key || !property)
      continue;
    const value15 = property.value;
    if (value15 === undefined || value15 === null)
      continue;
    set2.push($serialize(key, typeof value15 === "object" ? JSON.stringify(value15) : value15 + "", property));
  }
  if (set2.length === 0)
    return;
  if (set2.length === 1)
    return set2[0];
  return set2;
};
var mapResponse = (response, set2, request) => {
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set2.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie))
      set2.headers["Set-Cookie"] = serializeCookie(set2.cookie);
    if (set2.headers["Set-Cookie"] && Array.isArray(set2.headers["Set-Cookie"]))
      set2.headers = parseSetCookies(new Headers(set2.headers), set2.headers["Set-Cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return Response.json(response, set2);
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith("text/event-stream"))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, set2);
      case undefined:
        if (!response)
          return new Response("", set2);
        return Response.json(response, set2);
      case "Response":
        const inherits = { ...set2.headers };
        if (hasHeaderShorthand)
          set2.headers = response.headers.toJSON();
        else
          for (const [key, value15] of response.headers.entries())
            if (key in set2.headers)
              set2.headers[key] = value15;
        for (const key in inherits)
          response.headers.append(key, inherits[key]);
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then((x) => mapResponse(x, set2));
      case "Function":
        return mapResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set2);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response) {
          const inherits2 = Object.assign({}, set2.headers);
          if (hasHeaderShorthand)
            set2.headers = response.headers.toJSON();
          else
            for (const [key, value15] of response.headers.entries())
              if (key in set2.headers)
                set2.headers[key] = value15;
          for (const key in inherits2)
            response.headers.append(key, inherits2[key]);
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "ReadableStream":
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then((x) => {
          const r2 = mapCompactResponse(x);
          if (r2 !== undefined)
            return r2;
          return new Response("");
        });
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response);
    }
};
var mapEarlyResponse = (response, set2, request) => {
  if (response === undefined || response === null)
    return;
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set2.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie))
      set2.headers["Set-Cookie"] = serializeCookie(set2.cookie);
    if (set2.headers["Set-Cookie"] && Array.isArray(set2.headers["Set-Cookie"]))
      set2.headers = parseSetCookies(new Headers(set2.headers), set2.headers["Set-Cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return Response.json(response, set2);
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith("text/event-stream"))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, set2);
      case undefined:
        if (!response)
          return;
        return Response.json(response, set2);
      case "Response":
        const inherits = Object.assign({}, set2.headers);
        if (hasHeaderShorthand)
          set2.headers = response.headers.toJSON();
        else
          for (const [key, value15] of response.headers.entries())
            if (!(key in set2.headers))
              set2.headers[key] = value15;
        for (const key in inherits)
          response.headers.append(key, inherits[key]);
        if (response.status !== set2.status)
          set2.status = response.status;
        return response;
      case "Promise":
        return response.then((x) => {
          const r2 = mapEarlyResponse(x, set2);
          if (r2 !== undefined)
            return r2;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapEarlyResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set2);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response) {
          const inherits2 = { ...set2.headers };
          if (hasHeaderShorthand)
            set2.headers = response.headers.toJSON();
          else
            for (const [key, value15] of response.headers.entries())
              if (key in set2.headers)
                set2.headers[key] = value15;
          for (const key in inherits2)
            response.headers.append(key, inherits2[key]);
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "ReadableStream":
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Promise":
        return response.then((x) => {
          const r2 = mapEarlyResponse(x, set2);
          if (r2 !== undefined)
            return r2;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response);
    }
};
var mapCompactResponse = (response, request) => {
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE])
    return mapResponse(response.response, {
      status: response[ELYSIA_RESPONSE],
      headers: {}
    });
  switch (response?.constructor?.name) {
    case "String":
      return new Response(response);
    case "Blob":
      return handleFile(response);
    case "Object":
    case "Array":
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "ReadableStream":
      request?.signal.addEventListener("abort", {
        handleEvent() {
          if (!request?.signal.aborted)
            response.cancel(request);
        }
      }, {
        once: true
      });
      return new Response(response, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8"
        }
      });
    case undefined:
      if (!response)
        return new Response("");
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "Response":
      return response;
    case "Error":
      return errorToResponse(response);
    case "Promise":
      return response.then(mapCompactResponse);
    case "Function":
      return mapCompactResponse(response());
    case "Number":
    case "Boolean":
      return new Response(response.toString());
    default:
      if (response instanceof Response)
        return new Response(response.body, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      if (response instanceof Promise)
        return response.then(mapCompactResponse);
      if (response instanceof Error)
        return errorToResponse(response);
      if ("charCodeAt" in response) {
        const code = response.charCodeAt(0);
        if (code === 123 || code === 91) {
          return new Response(JSON.stringify(response), {
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      }
      return new Response(response);
  }
};
var errorToResponse = (error22, set2) => new Response(JSON.stringify({
  name: error22?.name,
  message: error22?.message,
  cause: error22?.cause
}), {
  status: set2?.status !== 200 ? set2?.status ?? 500 : 500,
  headers: set2?.headers
});
var replaceUrlPath = (url, pathname) => {
  const urlObject = new URL(url);
  urlObject.pathname = pathname;
  return urlObject.toString();
};
var isClass = (v) => typeof v === "function" && /^\s*class\s+/.test(v.toString()) || v.toString().startsWith("[object ") || isNotEmpty(Object.getPrototypeOf(v));
var isObject = (item) => item && typeof item === "object" && !Array.isArray(item);
var mergeDeep = (target, source, {
  skipKeys
} = {}) => {
  if (isObject(target) && isObject(source))
    for (const [key, value15] of Object.entries(source)) {
      if (skipKeys?.includes(key))
        continue;
      if (!isObject(value15) || !(key in target) || isClass(value15)) {
        target[key] = value15;
        continue;
      }
      target[key] = mergeDeep(target[key], value15);
    }
  return target;
};
var mergeCookie = (a2, b) => {
  const { properties: _, ...target } = a2 ?? {};
  const { properties: __, ...source } = b ?? {};
  return mergeDeep(target, source);
};
var mergeObjectArray = (a2 = [], b = []) => {
  if (!a2)
    return [];
  if (!b)
    return a2;
  const array5 = [];
  const checksums = [];
  if (!Array.isArray(a2))
    a2 = [a2];
  if (!Array.isArray(b))
    b = [b];
  for (const item of a2) {
    array5.push(item);
    if (item.checksum)
      checksums.push(item.checksum);
  }
  for (const item of b)
    if (!checksums.includes(item.checksum))
      array5.push(item);
  return array5;
};
var primitiveHooks = [
  "start",
  "request",
  "parse",
  "transform",
  "resolve",
  "beforeHandle",
  "afterHandle",
  "onResponse",
  "mapResponse",
  "trace",
  "error",
  "stop",
  "body",
  "headers",
  "params",
  "query",
  "response",
  "type",
  "detail"
];
var primitiveHookMap = primitiveHooks.reduce((acc, x) => (acc[x] = true, acc), {});
var mergeResponse = (a2, b) => {
  const isRecordNumber = (x) => typeof x === "object" && Object.keys(x).every(isNumericString);
  if (isRecordNumber(a2) && isRecordNumber(b))
    return { ...a2, ...b };
  return b ?? a2;
};
var mergeHook = (a2, b, { allowMacro = false } = {}) => {
  const rest4 = allowMacro ? {
    ...a2,
    ...b
  } : undefined;
  return {
    ...rest4,
    body: b?.body ?? a2?.body,
    headers: b?.headers ?? a2?.headers,
    params: b?.params ?? a2?.params,
    query: b?.query ?? a2?.query,
    response: mergeResponse(a2?.response, b?.response),
    type: a2?.type || b?.type,
    detail: mergeDeep(b?.detail ?? {}, a2?.detail ?? {}),
    parse: mergeObjectArray(a2?.parse, b?.parse),
    transform: mergeObjectArray(a2?.transform, b?.transform),
    beforeHandle: mergeObjectArray(a2?.beforeHandle, b?.beforeHandle),
    afterHandle: mergeObjectArray(a2?.afterHandle, b?.afterHandle),
    onResponse: mergeObjectArray(a2?.onResponse, b?.onResponse),
    mapResponse: mergeObjectArray(a2?.mapResponse, b?.mapResponse),
    trace: mergeObjectArray(a2?.trace, b?.trace),
    error: mergeObjectArray(a2?.error, b?.error)
  };
};
var getSchemaValidator = (s, {
  models = {},
  dynamic = false,
  normalize = false,
  additionalProperties = normalize
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const schema3 = typeof s === "string" ? models[s] : s;
  if (schema3.type === "object" && "additionalProperties" in schema3 === false)
    schema3.additionalProperties = additionalProperties;
  const cleaner = (value15) => exports_value2.Clean(schema3, value15);
  if (dynamic) {
    const validator = {
      schema: schema3,
      references: "",
      checkFunc: () => {
      },
      code: "",
      Check: (value15) => exports_value2.Check(schema3, value15),
      Errors: (value15) => exports_value2.Errors(schema3, value15),
      Code: () => ""
    };
    if (normalize && schema3.additionalProperties === true)
      validator.Clean = cleaner;
    if (schema3.config) {
      validator.config = schema3.config;
      if (validator?.schema?.config)
        delete validator.schema.config;
    }
    return validator;
  }
  const compiled = TypeCompiler.Compile(schema3, Object.values(models));
  compiled.Clean = cleaner;
  if (schema3.config) {
    compiled.config = schema3.config;
    if (compiled?.schema?.config)
      delete compiled.schema.config;
  }
  return compiled;
};
var getResponseSchemaValidator = (s, {
  models = {},
  dynamic = false,
  normalize = false,
  additionalProperties = normalize
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const maybeSchemaOrRecord = typeof s === "string" ? models[s] : s;
  const compile = (schema3, references) => {
    const cleaner = (value15) => exports_value2.Clean(schema3, value15);
    if (dynamic)
      return {
        schema: schema3,
        references: "",
        checkFunc: () => {
        },
        code: "",
        Check: (value15) => exports_value2.Check(schema3, value15),
        Errors: (value15) => exports_value2.Errors(schema3, value15),
        Code: () => ""
      };
    const compiledValidator = TypeCompiler.Compile(schema3, references);
    if (normalize && schema3.additionalProperties === true)
      compiledValidator.Clean = cleaner;
    return compiledValidator;
  };
  if (Kind in maybeSchemaOrRecord) {
    if ("additionalProperties" in maybeSchemaOrRecord === false)
      maybeSchemaOrRecord.additionalProperties = additionalProperties;
    return {
      200: compile(maybeSchemaOrRecord, Object.values(models))
    };
  }
  const record4 = {};
  Object.keys(maybeSchemaOrRecord).forEach((status) => {
    const maybeNameOrSchema = maybeSchemaOrRecord[+status];
    if (typeof maybeNameOrSchema === "string") {
      if (maybeNameOrSchema in models) {
        const schema3 = models[maybeNameOrSchema];
        schema3.type === "object" && "additionalProperties" in schema3;
        record4[+status] = Kind in schema3 ? compile(schema3, Object.values(models)) : schema3;
      }
      return;
    }
    if (maybeNameOrSchema.type === "object" && "additionalProperties" in maybeNameOrSchema === false)
      maybeNameOrSchema.additionalProperties = additionalProperties;
    record4[+status] = Kind in maybeNameOrSchema ? compile(maybeNameOrSchema, Object.values(models)) : maybeNameOrSchema;
  });
  return record4;
};
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var checksum = (s) => {
  if (hasHash)
    return Bun.hash(s);
  let h = 9;
  for (let i = 0;i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return h = h ^ h >>> 9;
};
var getCookieValidator = ({
  validator,
  defaultConfig = {},
  config,
  dynamic,
  models
}) => {
  let cookieValidator = getSchemaValidator(validator, {
    dynamic,
    models,
    additionalProperties: true
  });
  if (isNotEmpty(defaultConfig)) {
    if (cookieValidator) {
      cookieValidator.config = mergeCookie(cookieValidator.config, config);
    } else {
      cookieValidator = getSchemaValidator(t2.Cookie({}), {
        dynamic,
        models,
        additionalProperties: true
      });
      cookieValidator.config = defaultConfig;
    }
  }
  return cookieValidator;
};
var mergeLifeCycle = (a2, b, checksum2) => {
  const injectChecksum = (x) => {
    if (!x)
      return;
    if (!Array.isArray(x)) {
      const fn = x;
      if (checksum2 && !fn.checksum)
        fn.checksum = checksum2;
      if (fn.scope === "scoped")
        fn.scope = "local";
      return fn;
    }
    const fns = [...x];
    for (const fn of fns) {
      if (checksum2 && !fn.checksum)
        fn.checksum = checksum2;
      if (fn.scope === "scoped")
        fn.scope = "local";
    }
    return fns;
  };
  return {
    start: mergeObjectArray(a2.start, injectChecksum(b?.start)),
    request: mergeObjectArray(a2.request, injectChecksum(b?.request)),
    parse: mergeObjectArray(a2.parse, injectChecksum(b?.parse)),
    transform: mergeObjectArray(a2.transform, injectChecksum(b?.transform)),
    beforeHandle: mergeObjectArray(a2.beforeHandle, injectChecksum(b?.beforeHandle)),
    afterHandle: mergeObjectArray(a2.afterHandle, injectChecksum(b?.afterHandle)),
    mapResponse: mergeObjectArray(a2.mapResponse, injectChecksum(b?.mapResponse)),
    onResponse: mergeObjectArray(a2.onResponse, injectChecksum(b?.onResponse)),
    trace: a2.trace,
    error: mergeObjectArray(a2.error, injectChecksum(b?.error)),
    stop: mergeObjectArray(a2.stop, injectChecksum(b?.stop))
  };
};
var asHookType = (fn, inject, { skipIfHasType = false } = {}) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (skipIfHasType)
      fn.scope ??= inject;
    else
      fn.scope = inject;
    return fn;
  }
  for (const x of fn)
    if (skipIfHasType)
      x.scope ??= inject;
    else
      x.scope = inject;
  return fn;
};
var filterGlobal = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn))
    switch (fn.scope) {
      case "global":
      case "scoped":
        return { ...fn };
      default:
        return { fn };
    }
  const array5 = [];
  for (const x of fn)
    switch (x.scope) {
      case "global":
      case "scoped":
        array5.push({
          ...x
        });
        break;
    }
  return array5;
};
var filterGlobalHook = (hook) => {
  return {
    ...hook,
    type: hook?.type,
    detail: hook?.detail,
    parse: filterGlobal(hook?.parse),
    transform: filterGlobal(hook?.transform),
    beforeHandle: filterGlobal(hook?.beforeHandle),
    afterHandle: filterGlobal(hook?.afterHandle),
    onResponse: filterGlobal(hook?.onResponse),
    error: filterGlobal(hook?.error),
    mapResponse: filterGlobal(hook?.mapResponse)
  };
};
var StatusMap = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511
};
var InvertedStatusMap = Object.fromEntries(Object.entries(StatusMap).map(([k, v]) => [v, k]));
var encoder = new TextEncoder;
var signCookie = async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const secretKey = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const hmacBuffer = await crypto.subtle.sign("HMAC", secretKey, encoder.encode(val));
  return val + "." + removeTrailingEquals(Buffer.from(hmacBuffer).toString("base64"));
};
var unsignCookie = async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  const expectedInput = await signCookie(tentativeValue, secret);
  return expectedInput === input ? tentativeValue : false;
};
var traceBackMacro = (extension, property, hooks = property) => {
  if (!extension || typeof extension !== "object" || !property)
    return;
  for (const [key, value15] of Object.entries(property)) {
    if (key in primitiveHookMap || !(key in extension))
      continue;
    const v = extension[key];
    if (typeof v === "function") {
      v(value15);
    } else if (typeof v === "object")
      traceBackMacro(v, value15, hooks);
  }
};
var createMacroManager = ({
  globalHook,
  localHook
}) => (stackName) => (type47, fn) => {
  if (typeof type47 === "function")
    type47 = {
      fn: type47
    };
  if ("fn" in type47 || Array.isArray(type47)) {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (Array.isArray(type47))
      localHook[stackName] = localHook[stackName].concat(type47);
    else
      localHook[stackName].push(type47);
    return;
  }
  const { insert = "after", stack = "local" } = type47;
  if (typeof fn === "function")
    fn = { fn };
  if (stack === "global") {
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        globalHook[stackName].unshift(fn);
      } else {
        globalHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        globalHook[stackName] = fn.concat(globalHook[stackName]);
      } else {
        globalHook[stackName] = globalHook[stackName].concat(fn);
      }
    }
  } else {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        localHook[stackName].unshift(fn);
      } else {
        localHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        localHook[stackName] = fn.concat(localHook[stackName]);
      } else {
        localHook[stackName] = localHook[stackName].concat(fn);
      }
    }
  }
};
var isNumericString = (message) => {
  if (message.length < 16)
    return message.trim().length !== 0 && !Number.isNaN(Number(message));
  if (message.length === 16) {
    const numVal = Number(message);
    if (numVal.toString() === message)
      return message.trim().length !== 0 && !Number.isNaN(numVal);
  }
  return false;
};
var PromiseGroup = class {
  constructor(onError = console.error) {
    this.onError = onError;
    this.root = null;
    this.promises = [];
  }
  get size() {
    return this.promises.length;
  }
  add(promise5) {
    this.promises.push(promise5);
    this.root ||= this.drain();
    return promise5;
  }
  async drain() {
    while (this.promises.length > 0) {
      try {
        await this.promises[0];
      } catch (error22) {
        this.onError(error22);
      }
      this.promises.shift();
    }
    this.root = null;
  }
  then(onfulfilled, onrejected) {
    return (this.root ?? Promise.resolve()).then(onfulfilled, onrejected);
  }
};
var fnToContainer = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (typeof fn === "function")
      return { fn };
    else if ("fn" in fn)
      return fn;
  }
  const fns = [];
  for (const x of fn) {
    if (typeof x === "function")
      fns.push({ fn: x });
    else if ("fn" in x)
      fns.push(x);
  }
  return fns;
};
var localHookToLifeCycleStore = (a2) => {
  return {
    ...a2,
    start: fnToContainer(a2?.start),
    request: fnToContainer(a2?.request),
    parse: fnToContainer(a2?.parse),
    transform: fnToContainer(a2?.transform),
    beforeHandle: fnToContainer(a2?.beforeHandle),
    afterHandle: fnToContainer(a2?.afterHandle),
    onResponse: fnToContainer(a2?.onResponse),
    mapResponse: fnToContainer(a2?.mapResponse),
    trace: fnToContainer(a2?.trace),
    error: fnToContainer(a2?.error),
    stop: fnToContainer(a2?.stop)
  };
};
var lifeCycleToFn = (a2) => {
  return {
    ...a2,
    start: a2.start?.map((x) => x.fn),
    request: a2.request?.map((x) => x.fn),
    parse: a2.parse?.map((x) => x.fn),
    transform: a2.transform?.map((x) => x.fn),
    beforeHandle: a2.beforeHandle?.map((x) => x.fn),
    afterHandle: a2.afterHandle?.map((x) => x.fn),
    onResponse: a2.onResponse?.map((x) => x.fn),
    mapResponse: a2.mapResponse?.map((x) => x.fn),
    trace: a2.trace?.map((x) => x.fn),
    error: a2.error?.map((x) => x.fn),
    stop: a2.stop?.map((x) => x.fn)
  };
};
var cloneInference = (inference) => ({
  event: {
    body: inference.event.body,
    cookie: inference.event.cookie,
    headers: inference.event.headers,
    queries: [...inference.event.queries],
    query: inference.event.query,
    set: inference.event.set,
    unknownQueries: inference.event.unknownQueries
  },
  trace: {
    request: inference.trace.request,
    parse: inference.trace.parse,
    transform: inference.trace.transform,
    handle: inference.trace.handle,
    beforeHandle: inference.trace.beforeHandle,
    afterHandle: inference.trace.afterHandle,
    error: inference.trace.error,
    context: inference.trace.context,
    store: inference.trace.store,
    set: inference.trace.set
  }
});
var redirect = (url, status = 301) => new Response(null, {
  status,
  headers: {
    Location: url
  }
});
var env = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var ELYSIA_RESPONSE = Symbol("ElysiaResponse");
var isProduction = (env?.NODE_ENV ?? env?.ENV) === "production";
var error22 = (code, response) => ({
  [ELYSIA_RESPONSE]: StatusMap[code] ?? code,
  response: response ?? (code in InvertedStatusMap ? InvertedStatusMap[code] : code),
  _type: undefined
});
var InternalServerError = class extends Error {
  constructor(message) {
    super(message ?? "INTERNAL_SERVER_ERROR");
    this.code = "INTERNAL_SERVER_ERROR";
    this.status = 500;
  }
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message ?? "NOT_FOUND");
    this.code = "NOT_FOUND";
    this.status = 404;
  }
};
var ParseError = class extends Error {
  constructor(message, body) {
    super(message ?? "PARSE");
    this.body = body;
    this.code = "PARSE";
    this.status = 400;
  }
};
var InvalidCookieSignature = class extends Error {
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
    this.code = "INVALID_COOKIE_SIGNATURE";
    this.status = 400;
  }
};
var ValidationError = class _ValidationError extends Error {
  constructor(type47, validator, value15) {
    if (typeof value15 === "object" && ELYSIA_RESPONSE in value15)
      value15 = value15.response;
    const error23 = isProduction ? undefined : ("Errors" in validator) ? validator.Errors(value15).First() : exports_value2.Errors(validator, value15).First();
    const customError = error23?.schema.error ? typeof error23.schema.error === "function" ? error23.schema.error(type47, validator, value15) : error23.schema.error : undefined;
    const accessor = error23?.path || "root";
    let message = "";
    if (customError) {
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    } else if (isProduction) {
      message = JSON.stringify({
        type: "validation",
        on: type47,
        message: error23?.message,
        found: value15
      });
    } else {
      const schema3 = validator?.schema ?? validator;
      const errors5 = "Errors" in validator ? [...validator.Errors(value15)] : [...exports_value2.Errors(validator, value15)];
      let expected;
      try {
        expected = exports_value2.Create(schema3);
      } catch (error32) {
        expected = {
          type: "Could not create expected value",
          message: error32?.message,
          error: error32
        };
      }
      message = JSON.stringify({
        type: "validation",
        on: type47,
        property: accessor,
        message: error23?.message,
        expected,
        found: value15,
        errors: errors5
      }, null, 2);
    }
    super(message);
    this.type = type47;
    this.validator = validator;
    this.value = value15;
    this.code = "VALIDATION";
    this.status = 422;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  static simplifyModel(validator) {
    const model = "schema" in validator ? validator.schema : validator;
    try {
      return exports_value2.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return _ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, {
      status: 400,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
  }
};
var websocket = {
  open(ws) {
    ws.data.open?.(ws);
  },
  message(ws, message) {
    ws.data.message?.(ws, message);
  },
  drain(ws) {
    ws.data.drain?.(ws);
  },
  close(ws, code, reason) {
    ws.data.close?.(ws, code, reason);
  }
};
var ElysiaWS = class {
  constructor(raw, data) {
    this.raw = raw;
    this.data = data;
    this.validator = raw.data.validator;
    if (raw.data.id) {
      this.id = raw.data.id;
    } else {
      const array5 = new Uint32Array(1);
      crypto.getRandomValues(array5);
      this.id = array5[0].toString();
    }
  }
  get id() {
    return this.raw.data.id;
  }
  set id(newID) {
    this.raw.data.id = newID;
  }
  get publish() {
    return (topic, data = undefined, compress) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.publish(topic, data, compress);
      return this;
    };
  }
  get send() {
    return (data) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (Buffer.isBuffer(data)) {
        this.raw.send(data);
        return this;
      }
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.send(data);
      return this;
    };
  }
  get subscribe() {
    return (room) => {
      this.raw.subscribe(room);
      return this;
    };
  }
  get unsubscribe() {
    return (room) => {
      this.raw.unsubscribe(room);
      return this;
    };
  }
  get cork() {
    return (callback) => {
      this.raw.cork(callback);
      return this;
    };
  }
  get close() {
    return () => {
      this.raw.close();
      return this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
};
var headersHasToJSON = new Headers().toJSON;
var requestId = { value: 0 };
var createReport = ({
  hasTrace,
  hasTraceSet = false,
  addFn,
  condition = {}
}) => {
  if (hasTrace) {
    addFn(`
const reporter = getReporter()
`);
    return (event, {
      name,
      attribute = "",
      unit = 0
    } = {}) => {
      const dotIndex = event.indexOf(".");
      const isGroup = dotIndex === -1;
      if (event !== "request" && event !== "response" && !condition[isGroup ? event : event.slice(0, dotIndex)])
        return () => {
          if (hasTraceSet && event === "afterHandle")
            addFn(`
await traceDone
`);
        };
      if (isGroup)
        name ||= event;
      else
        name ||= "anonymous";
      addFn("\n" + `reporter.emit('event', {
					id,
					event: '${event}',
					type: 'begin',
					name: '${name}',
					time: performance.now(),
					${isGroup ? `unit: ${unit},` : ""}
					${attribute}
				})`.replace(/(\t| |\n)/g, "") + "\n");
      return () => {
        addFn("\n" + `reporter.emit('event', {
							id,
							event: '${event}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") + "\n");
        if (hasTraceSet && event === "afterHandle")
          addFn(`
await traceDone
`);
      };
    };
  } else {
    return () => () => {
    };
  }
};
var hasReturn = (fnLiteral) => {
  const parenthesisEnd = fnLiteral.indexOf(")");
  if (fnLiteral.charCodeAt(parenthesisEnd + 2) === 61 && fnLiteral.charCodeAt(parenthesisEnd + 5) !== 123) {
    return true;
  }
  return fnLiteral.includes("return");
};
var composeValidationFactory = (hasErrorHandler, {
  injectResponse = "",
  normalize = false
} = {}) => ({
  composeValidation: (type47, value15 = `c.${type47}`) => hasErrorHandler ? `c.set.status = 422; throw new ValidationError('${type47}', ${type47}, ${value15})` : `c.set.status = 422; return new ValidationError('${type47}', ${type47}, ${value15}).toResponse(c.set.headers)`,
  composeResponseValidation: (name = "r") => {
    const returnError = hasErrorHandler ? `throw new ValidationError('response', response[c.set.status], ${name})` : `return new ValidationError('response', response[c.set.status], ${name}).toResponse(c.set.headers)`;
    let code = "\n" + injectResponse + "\n";
    code += `let er

		if(${name} && typeof ${name} === "object" && ELYSIA_RESPONSE in ${name})
			er = ${name}[ELYSIA_RESPONSE]
`;
    if (normalize)
      code += `
			if(!er && response[c.set.status]?.Clean)
				${name} = response[c.set.status]?.Clean(${name})
			else if(response[er]?.Clean)
				${name}.response = response[er]?.Clean(${name}.response)`;
    code += `
			if(er) {
				if(!(${name} instanceof Response) && response[er]?.Check(${name}.response) === false) {
					if(!(response instanceof Error)) {
						c.set.status = ${name}[ELYSIA_RESPONSE]

						${returnError}
					}
				}
			} else if(!(${name} instanceof Response) && response[c.set.status]?.Check(${name}) === false) {
				if(!(response instanceof Error))
					${returnError}
			}
`;
    return code;
  }
});
var KindSymbol = Symbol.for("TypeBox.Kind");
var hasProperty = (expectedProperty, schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object") {
    const properties = schema3.properties;
    if (!properties)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (expectedProperty in property)
        return true;
      if (property.type === "object") {
        if (hasProperty(expectedProperty, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++) {
          if (hasProperty(expectedProperty, property.anyOf[i]))
            return true;
        }
      }
    }
    return false;
  }
  return expectedProperty in schema3;
};
var TransformSymbol = Symbol.for("TypeBox.Transform");
var hasTransform = (schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object" && schema3.properties) {
    const properties = schema3.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasTransform(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasTransform(property.anyOf[i]))
            return true;
      }
      const hasTransformSymbol = TransformSymbol in property;
      if (hasTransformSymbol)
        return true;
    }
    return false;
  }
  return TransformSymbol in schema3 || schema3.properties && TransformSymbol in schema3.properties;
};
var matchFnReturn = /(?:return|=>) \S+\(/g;
var isAsync = (v) => {
  const fn = "fn" in v ? v.fn : v;
  if (fn.constructor.name === "AsyncFunction")
    return true;
  const literal14 = fn.toString();
  if (literal14.includes("=> response.clone("))
    return false;
  if (literal14.includes("await"))
    return true;
  if (literal14.includes("async"))
    return true;
  return !!literal14.match(matchFnReturn);
};
var composeHandler = ({
  app,
  path,
  method,
  localHook,
  hooks,
  validator,
  handler,
  allowMeta = false,
  appInference: { event: eventInference, trace: traceInference }
}) => {
  const isHandleFn = typeof handler === "function";
  if (!isHandleFn)
    handler = mapResponse(handler, {
      headers: app.setHeaders ?? {}
    });
  const hasErrorHandler = app.config.forceErrorEncapsulation && (isHandleFn || hooks.afterHandle.length > 0 || hooks.beforeHandle.length > 0 || hooks.transform.length > 0) || hooks.error.length > 0 || app.event.error.length > 0 || typeof Bun === "undefined" || hooks.onResponse.length > 0 || !!hooks.trace.length;
  const handle = isHandleFn ? `handler(c)` : `handler`;
  const handleResponse = hooks.onResponse.length ? `
;(async () => {${hooks.onResponse.map((_, i) => `await res${i}(c)`).join(";")}})();
` : "";
  const traceConditions = traceInference;
  const hasTrace = hooks.trace.length > 0;
  let fnLiteral = "";
  const inference = sucrose(Object.assign(localHook, {
    handler
  }), eventInference);
  const hasQuery = inference.query || !!validator.query;
  const hasBody = method !== "$INTERNALWS" && method !== "GET" && method !== "HEAD" && hooks.type !== "none" && (inference.body || !!validator.body);
  const defaultHeaders = app.setHeaders;
  const hasDefaultHeaders = defaultHeaders && !!Object.keys(defaultHeaders).length;
  const hasHeaders = inference.headers || validator.headers;
  const hasCookie = inference.cookie || !!validator.cookie;
  const cookieValidator = hasCookie ? getCookieValidator({
    validator: validator.cookie,
    defaultConfig: app.config.cookie,
    dynamic: !!app.config.aot,
    config: validator.cookie?.config ?? {},
    models: app.definitions.type
  }) : undefined;
  const cookieMeta = cookieValidator?.config;
  let encodeCookie = "";
  if (cookieMeta?.sign) {
    if (!cookieMeta.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${method}) ${path}.`);
    const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
    encodeCookie += `const _setCookie = c.set.cookie
		if(_setCookie) {`;
    if (cookieMeta.sign === true) {
      encodeCookie += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${secret}')
			}`;
    } else
      for (const name of cookieMeta.sign) {
        encodeCookie += `if(_setCookie['${name}']?.value) { c.set.cookie['${name}'].value = await signCookie(_setCookie['${name}'].value, '${secret}') }
`;
      }
    encodeCookie += "}\n";
  }
  const normalize = app.config.normalize;
  const { composeValidation, composeResponseValidation } = composeValidationFactory(hasErrorHandler, {
    normalize
  });
  if (hasHeaders) {
    fnLiteral += headersHasToJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  }
  if (hasCookie) {
    const get = (name, defaultValue) => {
      const value15 = cookieMeta?.[name] ?? defaultValue;
      if (!value15)
        return typeof defaultValue === "string" ? `${name}: "${defaultValue}",` : `${name}: ${defaultValue},`;
      if (typeof value15 === "string")
        return `${name}: '${value15}',`;
      if (value15 instanceof Date)
        return `${name}: new Date(${value15.getTime()}),`;
      return `${name}: ${value15},`;
    };
    const options = cookieMeta ? `{
			secrets: ${cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? `'${cookieMeta.secrets}'` : "[" + cookieMeta.secrets.reduce((a2, b) => a2 + `'${b}',`, "") + "]" : "undefined"},
			sign: ${cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? "[" + cookieMeta.sign.reduce((a2, b) => a2 + `'${b}',`, "") + "]" : "undefined"},
			${get("domain")}
			${get("expires")}
			${get("httpOnly")}
			${get("maxAge")}
			${get("path", "/")}
			${get("priority")}
			${get("sameSite")}
			${get("secure")}
		}` : "undefined";
    if (hasHeaders)
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${options})
`;
    else
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${options})
`;
  }
  if (hasQuery) {
    let destructured = [];
    if (validator.query && validator.query.schema.type === "object") {
      destructured = Object.keys(validator.query.schema.properties);
    } else
      for (const query of inference.queries)
        if (destructured.indexOf(query) === -1)
          destructured.push(query);
    if (app.config.forceDynamicQuery === true || inference.unknownQueries === true || !destructured.length) {
      fnLiteral += `if(c.qi !== -1) {
				c.query = parseQuery(c.request.url.slice(c.qi + 1).replace(/\\+/g, ' '))

				for(const key of Object.keys(c.query))
					c.query[key] = decodeURIComponent(c.query[key])
			} else c.query = {}`;
    } else {
      fnLiteral += `if(c.qi !== -1) {
				let url = c.request.url.slice(c.qi).replace(/\\+/g, ' ')

				${destructured.map((name, index) => `
						${index === 0 ? "let" : ""} memory = url.indexOf('&${name}=')
						if(memory === -1) memory = url.indexOf('?${name}=')
						let a${index}

						if(memory !== -1) {
							const start = memory + ${name.length + 2}
							memory = url.indexOf('&', start)

							if(memory === -1) a${index} = decodeURIComponent(url.slice(start))
							else a${index} = decodeURIComponent(url.slice(start, memory))
						}`).join("\n")}

				c.query = {
					${destructured.map((name, index) => `'${name}': a${index}`).join(", ")}
				}
			} else {
				c.query = {}
			}`;
    }
  }
  const hasTraceSet = traceInference.set;
  const hasSet = inference.cookie || inference.set || hasTraceSet || hasHeaders || isHandleFn && hasDefaultHeaders;
  if (hasTrace)
    fnLiteral += "\nconst id = c.$$requestId\n";
  const report = createReport({
    hasTrace,
    hasTraceSet,
    condition: traceConditions,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += hasErrorHandler ? "\n try {\n" : "";
  if (hasTraceSet) {
    fnLiteral += `
const traceDone = Promise.all([`;
    for (let i = 0;i < hooks.trace.length; i++) {
      fnLiteral += `new Promise(r => { reporter.once(\`res\${id}.${i}\`, r) }),`;
    }
    fnLiteral += `])
`;
  }
  const isAsyncHandler = typeof handler === "function" && isAsync(handler);
  const maybeAsync = hasCookie || hasBody || hasTraceSet || isAsyncHandler || !!hooks.mapResponse.length || hooks.parse.length > 0 || hooks.afterHandle.some(isAsync) || hooks.beforeHandle.some(isAsync) || hooks.transform.some(isAsync);
  const endParse = report("parse", {
    unit: hooks.parse.length
  });
  if (hasBody) {
    const hasBodyInference = hooks.parse.length || inference.body || validator.body;
    if (hooks.type && !hooks.parse.length) {
      switch (hooks.type) {
        case "json":
        case "application/json":
          if (hasErrorHandler)
            fnLiteral += `const tempBody = await c.request.text()

							try {
								c.body = JSON.parse(tempBody)
							} catch {
								throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
							}`;
          else
            fnLiteral += `c.body = await c.request.json()`;
          break;
        case "text":
        case "text/plain":
          fnLiteral += `c.body = await c.request.text()
`;
          break;
        case "urlencoded":
        case "application/x-www-form-urlencoded":
          fnLiteral += `c.body = parseQuery(await c.request.text())
`;
          break;
        case "arrayBuffer":
        case "application/octet-stream":
          fnLiteral += `c.body = await c.request.arrayBuffer()
`;
          break;
        case "formdata":
        case "multipart/form-data":
          fnLiteral += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
`;
          break;
      }
    } else if (hasBodyInference) {
      fnLiteral += "\n";
      fnLiteral += hasHeaders ? `let contentType = c.headers['content-type']` : `let contentType = c.request.headers.get('content-type')`;
      fnLiteral += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)

					c.contentType = contentType
`;
      if (hooks.parse.length) {
        fnLiteral += `let used = false
`;
        const endReport = report("parse", {
          unit: hooks.parse.length
        });
        for (let i = 0;i < hooks.parse.length; i++) {
          const endUnit = report("parse.unit", {
            name: hooks.parse[i].fn.name
          });
          const name = `bo${i}`;
          if (i !== 0)
            fnLiteral += `if(!used) {
`;
          fnLiteral += `let ${name} = parse[${i}](c, contentType)
`;
          fnLiteral += `if(${name} instanceof Promise) ${name} = await ${name}
`;
          fnLiteral += `if(${name} !== undefined) { c.body = ${name}; used = true }
`;
          endUnit();
          if (i !== 0)
            fnLiteral += `}`;
        }
        endReport();
      }
      fnLiteral += "\ndelete c.contentType\n";
      if (hooks.parse.length)
        fnLiteral += `if (!used) {`;
      if (hooks.type && !Array.isArray(hooks.type)) {
        switch (hooks.type) {
          case "json":
          case "application/json":
            if (hasErrorHandler)
              fnLiteral += `const tempBody = await c.request.text()

								try {
									c.body = JSON.parse(tempBody)
								} catch {
									throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
								}`;
            else
              fnLiteral += `c.body = await c.request.json()`;
            break;
          case "text":
          case "text/plain":
            fnLiteral += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            fnLiteral += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            fnLiteral += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            fnLiteral += `c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}
`;
            break;
        }
      } else {
        fnLiteral += `
					switch (contentType) {
						case 'application/json':
							${hasErrorHandler ? `
							const tempBody = await c.request.text()

							try {
								c.body = JSON.parse(tempBody)
							} catch {
								throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
							}
							` : `c.body = await c.request.json()
`}
							break

						case 'text/plain':
							c.body = await c.request.text()
							break

						case 'application/x-www-form-urlencoded':
							c.body = parseQuery(await c.request.text())
							break

						case 'application/octet-stream':
							c.body = await c.request.arrayBuffer();
							break

						case 'multipart/form-data':
							c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}

							break
					}`;
      }
      if (hooks.parse.length)
        fnLiteral += `}`;
      fnLiteral += "}\n";
    }
    fnLiteral += "\n";
  }
  endParse();
  if (hooks?.transform) {
    const endTransform = report("transform", {
      unit: hooks.transform.length
    });
    if (hooks.transform.length)
      fnLiteral += "\nlet transformed\n";
    for (let i = 0;i < hooks.transform.length; i++) {
      const transform7 = hooks.transform[i];
      const endUnit = report("transform.unit", {
        name: transform7.fn.name
      });
      fnLiteral += isAsync(transform7) ? `transformed = await transform[${i}](c)
` : `transformed = transform[${i}](c)
`;
      fnLiteral += `if(transformed?.[ELYSIA_RESPONSE])
				throw transformed
			else
				Object.assign(c, transformed)
`;
      endUnit();
    }
    endTransform();
  }
  if (validator) {
    fnLiteral += "\n";
    if (validator.headers) {
      if (hasProperty("default", validator.headers.params))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.headers.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : `'${value15}'`;
          if (parsed)
            fnLiteral += `c.headers['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(headers.Check(c.headers) === false) {
				${composeValidation("headers")}
			}`;
      if (hasTransform(validator.headers.schema))
        fnLiteral += `
c.headers = headers.Decode(c.headers)
`;
    }
    if (validator.params) {
      if (hasProperty("default", validator.params.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.params.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : `'${value15}'`;
          if (parsed)
            fnLiteral += `c.params['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(params.Check(c.params) === false) {
				${composeValidation("params")}
			}`;
      if (hasTransform(validator.params.schema))
        fnLiteral += `
c.params = params.Decode(c.params)
`;
    }
    if (validator.query) {
      if (normalize)
        fnLiteral += "c.query = query.Clean(c.query);\n";
      if (hasProperty("default", validator.query.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.query.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : `'${value15}'`;
          if (parsed)
            fnLiteral += `c.query['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(query.Check(c.query) === false) {
				${composeValidation("query")}
			}`;
      if (hasTransform(validator.query.schema))
        fnLiteral += `
c.query = query.Decode(Object.assign({}, c.query))
`;
    }
    if (validator.body) {
      if (normalize)
        fnLiteral += "c.body = body.Clean(c.body);\n";
      if (hasProperty("default", validator.body.schema))
        fnLiteral += `if(body.Check(c.body) === false) {
    				c.body = Object.assign(${JSON.stringify(exports_value2.Default(validator.body.schema, null) ?? {})}, c.body)

    				if(body.Check(c.query) === false) {
        				${composeValidation("body")}
     			}
            }`;
      else
        fnLiteral += `if(body.Check(c.body) === false) {
			${composeValidation("body")}
		}`;
      if (hasTransform(validator.body.schema))
        fnLiteral += `
c.body = body.Decode(c.body)
`;
    }
    if (isNotEmpty(cookieValidator?.schema.properties ?? {})) {
      fnLiteral += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value
`;
      if (hasProperty("default", cookieValidator.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(cookieValidator.schema, {}))) {
          fnLiteral += `cookieValue['${key}'] = ${typeof value15 === "object" ? JSON.stringify(value15) : value15}
`;
        }
      fnLiteral += `if(cookie.Check(cookieValue) === false) {
				${composeValidation("cookie", "cookieValue")}
			}`;
    }
  }
  if (hooks?.beforeHandle) {
    const endBeforeHandle = report("beforeHandle", {
      unit: hooks.beforeHandle.length
    });
    let hasResolve = false;
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      const beforeHandle = hooks.beforeHandle[i];
      const endUnit = report("beforeHandle.unit", {
        name: beforeHandle.fn.name
      });
      const returning = hasReturn(beforeHandle.fn.toString());
      const isResolver = beforeHandle.subType === "resolve";
      if (isResolver) {
        if (!hasResolve) {
          hasResolve = true;
          fnLiteral += "\nlet resolved\n";
        }
        fnLiteral += isAsync(beforeHandle) ? `resolved = await beforeHandle[${i}](c);
` : `resolved = beforeHandle[${i}](c);
`;
        fnLiteral += `if(resolved[ELYSIA_RESPONSE])
						throw resolved
					else
						Object.assign(c, resolved)
`;
      } else if (!returning) {
        fnLiteral += isAsync(beforeHandle) ? `await beforeHandle[${i}](c);
` : `beforeHandle[${i}](c);
`;
        endUnit();
      } else {
        fnLiteral += `Object.assign(c, be);`;
        fnLiteral += isAsync(beforeHandle) ? `be = await beforeHandle[${i}](c);
` : `be = beforeHandle[${i}](c);
`;
        endUnit();
        fnLiteral += `if(be !== undefined) {
`;
        endBeforeHandle();
        if (hooks.afterHandle?.length) {
          const endAfterHandle = report("afterHandle", {
            unit: hooks.transform.length
          });
          report("handle", {
            name: isHandleFn ? handler.name : undefined
          })();
          for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
            const hook = hooks.afterHandle[i2];
            const returning2 = hasReturn(hook.fn.toString());
            const endUnit2 = report("afterHandle.unit", {
              name: hook.fn.name
            });
            fnLiteral += `c.response = be
`;
            if (!returning2) {
              fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i2}](c, be)
` : `afterHandle[${i2}](c, be)
`;
            } else {
              fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i2}](c)
` : `af = afterHandle[${i2}](c)
`;
              fnLiteral += `if(af !== undefined) { c.response = be = af }
`;
            }
            endUnit2();
          }
          endAfterHandle();
        }
        if (validator.response)
          fnLiteral += composeResponseValidation("be");
        if (hooks.mapResponse.length) {
          fnLiteral += `c.response = be`;
          for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
            fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i2}](c)
							if(mr instanceof Promise) mr = await mr
							if(mr !== undefined) c.response = mr
						}
`;
          }
        }
        fnLiteral += encodeCookie;
        fnLiteral += `return mapEarlyResponse(be, c.set, c.request)}
`;
      }
    }
    endBeforeHandle();
  }
  if (hooks?.afterHandle.length) {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (hooks.afterHandle.length)
      fnLiteral += isAsyncHandler ? `let r = c.response = await ${handle};
` : `let r = c.response = ${handle};
`;
    else
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
    endHandle();
    const endAfterHandle = report("afterHandle", {
      unit: hooks.afterHandle.length
    });
    for (let i = 0;i < hooks.afterHandle.length; i++) {
      const hook = hooks.afterHandle[i];
      const returning = hasReturn(hook.fn.toString());
      const endUnit = report("afterHandle.unit", {
        name: hook.fn.name
      });
      if (!returning) {
        fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i}](c)
` : `afterHandle[${i}](c)
`;
        endUnit();
      } else {
        fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i}](c)
` : `af = afterHandle[${i}](c)
`;
        endUnit();
        if (validator.response) {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += composeResponseValidation("af");
          fnLiteral += `c.response = af }`;
        } else {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += `c.response = af}
`;
        }
      }
    }
    endAfterHandle();
    fnLiteral += `r = c.response
`;
    if (validator.response)
      fnLiteral += composeResponseValidation();
    fnLiteral += encodeCookie;
    if (hooks.mapResponse.length) {
      for (let i = 0;i < hooks.mapResponse.length; i++) {
        fnLiteral += `
mr = onMapResponse[${i}](c)
				if(mr instanceof Promise) mr = await mr
				if(mr !== undefined) c.response = mr
`;
      }
    }
    if (hasSet)
      fnLiteral += `return mapResponse(r, c.set, c.request)
`;
    else
      fnLiteral += `return mapCompactResponse(r, c.request)
`;
  } else {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (validator.response || hooks.mapResponse.length) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      endHandle();
      if (validator.response)
        fnLiteral += composeResponseValidation();
      report("afterHandle")();
      if (hooks.mapResponse.length) {
        fnLiteral += "c.response = r";
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          fnLiteral += `
if(mr === undefined) {
						mr = onMapResponse[${i}](c)
						if(mr instanceof Promise) mr = await mr
    					if(mr !== undefined) r = c.response = mr
					}
`;
        }
      }
      fnLiteral += encodeCookie;
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${handle}.clone(), c.set, c.request)
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(r, c.set, c.request)
`;
      else
        fnLiteral += `return mapCompactResponse(r, c.request)
`;
    } else if (traceConditions.handle || hasCookie) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      endHandle();
      report("afterHandle")();
      if (hooks.mapResponse.length) {
        fnLiteral += "c.response = r";
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i}](c)
							if(mr instanceof Promise) mr = await mr
    						if(mr !== undefined) r = c.response = mr
						}
`;
        }
      }
      fnLiteral += encodeCookie;
      if (hasSet)
        fnLiteral += `return mapResponse(r, c.set, c.request)
`;
      else
        fnLiteral += `return mapCompactResponse(r, c.request)
`;
    } else {
      endHandle();
      const handled = isAsyncHandler ? `await ${handle}` : handle;
      report("afterHandle")();
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${handle}.clone(), c.set, c.request)
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(${handled}, c.set, c.request)
`;
      else
        fnLiteral += `return mapCompactResponse(${handled}, c.request)
`;
    }
  }
  if (hasErrorHandler || handleResponse) {
    fnLiteral += `
} catch(error) {`;
    if (!maybeAsync)
      fnLiteral += `return (async () => {`;
    fnLiteral += `const set = c.set
if (!set.status || set.status < 300) set.status = error?.status || 500
`;
    const endError = report("error", {
      unit: hooks.error.length
    });
    if (hooks.error.length) {
      fnLiteral += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
			`;
      for (let i = 0;i < hooks.error.length; i++) {
        const name = `er${i}`;
        const endUnit = report("error.unit", {
          name: hooks.error[i].fn.name
        });
        fnLiteral += `
let ${name} = handleErrors[${i}](c)
`;
        if (isAsync(hooks.error[i]))
          fnLiteral += `if (${name} instanceof Promise) ${name} = await ${name}
`;
        endUnit();
        fnLiteral += `${name} = mapEarlyResponse(${name}, set, c.request)
`;
        fnLiteral += `if (${name}) {`;
        fnLiteral += `return ${name} }
`;
      }
    }
    endError();
    fnLiteral += `return handleError(c, error, true)

`;
    if (!maybeAsync)
      fnLiteral += "})()";
    fnLiteral += "}";
    if (handleResponse || hasTrace) {
      fnLiteral += ` finally { `;
      const endResponse = report("response", {
        unit: hooks.onResponse.length
      });
      fnLiteral += handleResponse;
      endResponse();
      fnLiteral += `}`;
    }
  }
  fnLiteral = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery,
			isNotEmpty
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError,
			ParseError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie,
		decodeURIComponent,
		ELYSIA_RESPONSE
	} = hooks

	${hooks.onResponse.length ? `const ${hooks.onResponse.map((x, i) => `res${i} = onResponse[${i}]`).join(",")}` : ""}

	return ${maybeAsync ? "async" : ""} function handle(c) {
		${hooks.beforeHandle.length ? "let be" : ""}
		${hooks.afterHandle.length ? "let af" : ""}
		${hooks.mapResponse.length ? "let mr" : ""}

		${allowMeta ? "c.schema = schema; c.defs = definitions" : ""}
		${fnLiteral}
	}`;
  const createHandler = Function("hooks", fnLiteral);
  return createHandler({
    handler,
    hooks: lifeCycleToFn(hooks),
    validator,
    handleError: app.handleError,
    utils: {
      mapResponse,
      mapCompactResponse,
      mapEarlyResponse,
      parseQuery: import_fast_querystring.parse,
      isNotEmpty
    },
    error: {
      NotFoundError,
      ValidationError,
      InternalServerError,
      ParseError
    },
    schema: app.router.history,
    definitions: app.definitions.type,
    ERROR_CODE,
    getReporter: () => app.reporter,
    requestId,
    parseCookie,
    signCookie,
    decodeURIComponent: import_fast_decode_uri_component2.default,
    ELYSIA_RESPONSE
  });
};
var composeGeneralHandler = (app) => {
  const inference = {
    event: {
      ...app.inference.event,
      queries: [...app.inference.event.queries]
    },
    trace: { ...app.inference.trace }
  };
  let decoratorsLiteral = "";
  let fnLiteral = "";
  const defaultHeaders = app.setHeaders;
  for (const key of Object.keys(app.singleton.decorator))
    decoratorsLiteral += `,${key}: app.singleton.decorator.${key}`;
  const router = app.router;
  const hasTrace = app.event.trace.length > 0;
  let findDynamicRoute = `
	const route = router.find(request.method, path) ${router.http.root.ALL ? '?? router.find("ALL", path)' : ""}

	if (route === null)
		return ${app.event.error.length ? `app.handleError(ctx, notFound)` : app.event.request.length ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})` : `error404.clone()`}

	ctx.params = route.params
`;
  const shouldPrecompile = app.config.precompile === true || typeof app.config.precompile === "object" && app.config.precompile.compose === true;
  if (!shouldPrecompile)
    findDynamicRoute += `
			if(route.store.composed)
				return route.store.composed(ctx)

			if(route.store.compose)
				return (route.store.compose())(ctx)`;
  else
    findDynamicRoute += `return route.store(ctx)`;
  findDynamicRoute += "\n";
  let switchMap = ``;
  for (const [path, { code, all }] of Object.entries(router.static.http.map))
    switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
  const maybeAsync = app.event.request.some(isAsync);
  const init = `

	const url = request.url
	const s = url.indexOf('/', 11)
	const qi = url.indexOf('?', s + 1)
	let path
	if(qi === -1)
		path = url.substring(s)
	else
		path = url.substring(s, qi)
`;
  fnLiteral += `const {
		app,
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter,
		handleError,
		error,
		redirect
	} = data

	const store = app.singleton.store
	const staticRouter = app.router.static.http
	const wsRouter = app.router.ws
	const router = app.router.http

	const notFound = new NotFoundError()

	${app.event.request.length ? `const onRequest = app.event.request.map(x => x.fn)` : ""}
	${router.static.http.variables}
	${app.event.error.length ? "" : `
	const error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });
	`}

	return ${maybeAsync ? "async" : ""} function map(request) {
`;
  if (app.event.request.length)
    fnLiteral += `let re`;
  const report = createReport({
    hasTrace,
    hasTraceSet: inference.trace.set,
    condition: {
      request: inference.trace.request
    },
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  if (app.event.request.length) {
    fnLiteral += `
			${hasTrace ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				redirect,
				set: {
					headers: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
					status: 200
				},
				error
				${hasTrace ? ",$$requestId: +id" : ""}
				${decoratorsLiteral}
			}
		`;
    const endReport = report("request", {
      attribute: "ctx",
      unit: app.event.request.length
    });
    fnLiteral += `
 try {
`;
    for (let i = 0;i < app.event.request.length; i++) {
      const hook = app.event.request[i];
      const withReturn = hasReturn(hook.fn.toString());
      const maybeAsync2 = isAsync(hook);
      const endUnit = report("request.unit", {
        name: app.event.request[i].fn.name
      });
      if (withReturn) {
        fnLiteral += `re = mapEarlyResponse(
					${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx),
					ctx.set,
					request
				)
`;
        endUnit();
        fnLiteral += `if(re !== undefined) return re
`;
      } else {
        fnLiteral += `${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx)
`;
        endUnit();
      }
    }
    fnLiteral += `} catch (error) {
			return app.handleError(ctx, error)
		}`;
    endReport();
    fnLiteral += init;
    fnLiteral += `
ctx.qi = qi
 ctx.path = path
`;
  } else {
    fnLiteral += init;
    fnLiteral += `${hasTrace ? "const id = +requestId.value++" : ""}
		const ctx = {
			request,
			store,
			qi,
			path,
			redirect,
			set: {
				headers: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
				status: 200
			},
			error
			${hasTrace ? ",$$requestId: id" : ""}
			${decoratorsLiteral}
		}`;
    report("request", {
      unit: app.event.request.length,
      attribute: inference.trace.context || inference.trace.store || inference.trace.set ? "ctx" : ""
    })();
  }
  const wsPaths = app.router.static.ws;
  const wsRouter = app.router.ws;
  if (Object.keys(wsPaths).length || wsRouter.history.length) {
    fnLiteral += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (const [path, index] of Object.entries(wsPaths)) {
      fnLiteral += `
					case '${path}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${index}(ctx)

						break`;
    }
    fnLiteral += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}
`;
  }
  fnLiteral += `
		map: switch(path) {
			${switchMap}

			default:
				break
		}

		${findDynamicRoute}
	}`;
  const handleError = composeErrorHandler(app);
  app.handleError = handleError;
  return Function("data", fnLiteral)({
    app,
    mapEarlyResponse,
    NotFoundError,
    getReporter: () => app.reporter,
    requestId,
    handleError,
    error: error22,
    redirect
  });
};
var composeErrorHandler = (app) => {
  let fnLiteral = `const {
		app: { event: { error: onErrorContainer, onResponse: resContainer } },
		mapResponse,
		ERROR_CODE,
		ELYSIA_RESPONSE
	} = inject

	const onError = onErrorContainer.map(x => x.fn)
	const res = resContainer.map(x => x.fn)

	return ${app.event.error.find(isAsync) ? "async" : ""} function(context, error, skipGlobal) {
		let r

		const { set } = context

		context.code = error.code
		context.error = error

		if(typeof error === "object" && ELYSIA_RESPONSE in error) {
			error.status = error[ELYSIA_RESPONSE]
			error.message = error.response
		}
`;
  for (let i = 0;i < app.event.error.length; i++) {
    const handler = app.event.error[i];
    const response = `${isAsync(handler) ? "await " : ""}onError[${i}](context)`;
    fnLiteral += "\nif(skipGlobal !== true) {\n";
    if (hasReturn(handler.fn.toString()))
      fnLiteral += `r = ${response}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r[ELYSIA_RESPONSE]) {
					error.status = error[ELYSIA_RESPONSE]
					error.message = error.response
				}

				if(set.status === 200) set.status = error.status
				return mapResponse(r, set, context.request)
			}
`;
    else
      fnLiteral += response + "\n";
    fnLiteral += "\n}\n";
  }
  fnLiteral += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 422
		return new Response(
			error.message,
			{
				headers: Object.assign(
					{ 'content-type': 'application/json'},
					set.headers
				),
				status: set.status
			}
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)

		return mapResponse(error, set, context.request)
	}
}`;
  return Function("inject", fnLiteral)({
    app,
    mapResponse,
    ERROR_CODE,
    ELYSIA_RESPONSE
  });
};
var jitRoute = (index) => `if(stc${index}) return stc${index}(ctx)
if(st${index}.compose) return (stc${index} = st${index}.compose())(ctx)

return st${index}(ctx)`;
var createDynamicHandler = (app) => async (request) => {
  const url = request.url, s = url.indexOf("/", 11), qi = url.indexOf("?", s + 1), path = qi === -1 ? url.substring(s) : url.substring(s, qi);
  const set2 = {
    cookie: {},
    status: 200,
    headers: {}
  };
  const context = Object.assign({}, app.singleton.decorator, {
    set: set2,
    store: app.singleton.store,
    request,
    path,
    qi
  });
  try {
    for (let i = 0;i < app.event.request.length; i++) {
      const onRequest = app.event.request[i].fn;
      let response2 = onRequest(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      response2 = mapEarlyResponse(response2, set2);
      if (response2)
        return response2;
    }
    const handler = app.router.dynamic.find(request.method, path) ?? app.router.dynamic.find("ALL", path);
    if (!handler)
      throw new NotFoundError;
    const { handle, hooks, validator, content } = handler.store;
    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      if (content) {
        switch (content) {
          case "application/json":
            body = await request.json();
            break;
          case "text/plain":
            body = await request.text();
            break;
          case "application/x-www-form-urlencoded":
            body = import_fast_querystring2.parse(await request.text());
            break;
          case "application/octet-stream":
            body = await request.arrayBuffer();
            break;
          case "multipart/form-data":
            body = {};
            const form = await request.formData();
            for (const key of form.keys()) {
              if (body[key])
                continue;
              const value15 = form.getAll(key);
              if (value15.length === 1)
                body[key] = value15[0];
              else
                body[key] = value15;
            }
            break;
        }
      } else {
        let contentType = request.headers.get("content-type");
        if (contentType) {
          const index = contentType.indexOf(";");
          if (index !== -1)
            contentType = contentType.slice(0, index);
          context.contentType = contentType;
          for (let i = 0;i < hooks.parse.length; i++) {
            const hook = hooks.parse[i].fn;
            let temp = hook(context, contentType);
            if (temp instanceof Promise)
              temp = await temp;
            if (temp) {
              body = temp;
              break;
            }
          }
          delete context.contentType;
          if (body === undefined) {
            switch (contentType) {
              case "application/json":
                body = await request.json();
                break;
              case "text/plain":
                body = await request.text();
                break;
              case "application/x-www-form-urlencoded":
                body = import_fast_querystring2.parse(await request.text());
                break;
              case "application/octet-stream":
                body = await request.arrayBuffer();
                break;
              case "multipart/form-data":
                body = {};
                const form = await request.formData();
                for (const key of form.keys()) {
                  if (body[key])
                    continue;
                  const value15 = form.getAll(key);
                  if (value15.length === 1)
                    body[key] = value15[0];
                  else
                    body[key] = value15;
                }
                break;
            }
          }
        }
      }
    }
    context.body = body;
    context.params = handler?.params || undefined;
    context.query = qi === -1 ? {} : import_fast_querystring2.parse(url.substring(qi + 1));
    context.headers = {};
    for (const [key, value15] of request.headers.entries())
      context.headers[key] = value15;
    const cookieMeta = Object.assign({}, app.config?.cookie, validator?.cookie?.config);
    const cookieHeaderValue = request.headers.get("cookie");
    context.cookie = await parseCookie(context.set, cookieHeaderValue, cookieMeta ? {
      secrets: cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets.join(",") : undefined,
      sign: cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? typeof cookieMeta.sign === "string" ? cookieMeta.sign : cookieMeta.sign.join(",") : undefined
    } : undefined);
    for (let i = 0;i < hooks.transform.length; i++) {
      const hook = hooks.transform[i];
      const operation = hook.fn(context);
      if (hook.subType === "derive") {
        if (operation instanceof Promise)
          Object.assign(context, await operation);
        else
          Object.assign(context, operation);
      } else if (operation instanceof Promise)
        await operation;
    }
    if (validator) {
      if (validator.headers) {
        const _header = {};
        for (const key in request.headers)
          _header[key] = request.headers.get(key);
        if (validator.headers.Check(_header) === false)
          throw new ValidationError("header", validator.headers, _header);
      }
      if (validator.params?.Check(context.params) === false)
        throw new ValidationError("params", validator.params, context.params);
      if (validator.query?.Check(context.query) === false)
        throw new ValidationError("query", validator.query, context.query);
      if (validator.cookie) {
        const cookieValue = {};
        for (const [key, value15] of Object.entries(context.cookie))
          cookieValue[key] = value15.value;
        if (validator.cookie?.Check(cookieValue) === false)
          throw new ValidationError("cookie", validator.cookie, cookieValue);
      }
      if (validator.body?.Check(body) === false)
        throw new ValidationError("body", validator.body, body);
    }
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      let response2 = hooks.beforeHandle[i].fn(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      if (response2 !== undefined) {
        context.response = response2;
        for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
          let newResponse = hooks.afterHandle[i2].fn(context);
          if (newResponse instanceof Promise)
            newResponse = await newResponse;
          if (newResponse)
            response2 = newResponse;
        }
        const result = mapEarlyResponse(response2, context.set);
        if (result)
          return result;
      }
    }
    let response = handle(context);
    if (response instanceof Promise)
      response = await response;
    if (!hooks.afterHandle.length) {
      const responseValidator = validator?.response?.[response.status];
      if (responseValidator?.Check(response) === false)
        throw new ValidationError("response", responseValidator, response);
    } else {
      context.response = response;
      for (let i = 0;i < hooks.afterHandle.length; i++) {
        let newResponse = hooks.afterHandle[i].fn(context);
        if (newResponse instanceof Promise)
          newResponse = await newResponse;
        const result = mapEarlyResponse(newResponse, context.set);
        if (result !== undefined) {
          const responseValidator = validator?.response?.[response.status];
          if (responseValidator?.Check(result) === false)
            throw new ValidationError("response", responseValidator, result);
          return result;
        }
      }
    }
    if (context.set.cookie && cookieMeta?.sign) {
      const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
      if (cookieMeta.sign === true)
        for (const [key, cookie] of Object.entries(context.set.cookie))
          context.set.cookie[key].value = await signCookie(cookie.value, "${secret}");
      else {
        const properties = validator?.cookie?.schema?.properties;
        for (const name of cookieMeta.sign) {
          if (!(name in properties))
            continue;
          if (context.set.cookie[name]?.value) {
            context.set.cookie[name].value = await signCookie(context.set.cookie[name].value, secret);
          }
        }
      }
    }
    return mapResponse(response, context.set);
  } catch (error23) {
    if (error23.status)
      set2.status = error23.status;
    return app.handleError(context, error23);
  } finally {
    for (const onResponse of app.event.onResponse)
      await onResponse.fn(context);
  }
};
var createDynamicErrorHandler = (app) => async (context, error23) => {
  const errorContext = Object.assign(context, { error: error23, code: error23.code });
  errorContext.set = context.set;
  for (let i = 0;i < app.event.error.length; i++) {
    const hook = app.event.error[i];
    let response = hook.fn(errorContext);
    if (response instanceof Promise)
      response = await response;
    if (response !== undefined && response !== null)
      return mapResponse(response, context.set);
  }
  return new Response(typeof error23.cause === "string" ? error23.cause : error23.message, {
    headers: context.set.headers,
    status: error23.status ?? 500
  });
};
var fullFormats = {
  date: date5,
  time: getTime(true),
  "date-time": getDateTime(true),
  "iso-time": getTime(false),
  "iso-date-time": getDateTime(false),
  duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
  uri,
  "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
  "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
  url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
  regex,
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
  "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  byte,
  int32: { type: "number", validate: validateInt32 },
  int64: { type: "number", validate: validateInt64 },
  float: { type: "number", validate: validateNumber },
  double: { type: "number", validate: validateNumber },
  password: true,
  binary: true
};
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
var DATE_TIME_SEPARATOR = /t|\s/i;
var NOT_URI_FRAGMENT = /\/|:/;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
var MIN_INT32 = -(2 ** 31);
var MAX_INT32 = 2 ** 31 - 1;
var Z_ANCHOR = /[^\\]\\Z/;
var isISO8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var isFormalDate = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var isShortenDate = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var _validateDate = fullFormats.date;
var _validateDateTime = fullFormats["date-time"];
if (!exports_format.Has("date"))
  TypeSystem.Format("date", (value15) => {
    const temp = value15.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDate(temp)) {
      const date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
if (!exports_format.Has("date-time"))
  TypeSystem.Format("date-time", (value15) => {
    const temp = value15.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDateTime(temp)) {
      const date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
Object.entries(fullFormats).forEach((formatEntry) => {
  const [formatName, formatValue] = formatEntry;
  if (!exports_format.Has(formatName)) {
    if (formatValue instanceof RegExp)
      TypeSystem.Format(formatName, (value15) => formatValue.test(value15));
    else if (typeof formatValue === "function")
      TypeSystem.Format(formatName, formatValue);
  }
});
var t2 = Object.assign({}, Type);
var parseFileUnit = (size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
};
var validateFile = (options, value15) => {
  if (!(value15 instanceof Blob))
    return false;
  if (options.minSize && value15.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value15.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value15.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0;i < options.extension.length; i++)
        if (value15.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
};
var File2 = exports_type.Get("Files") ?? TypeSystem.Type("File", validateFile);
var Files = exports_type.Get("Files") ?? TypeSystem.Type("Files", (options, value15) => {
  if (!Array.isArray(value15))
    return validateFile(options, value15);
  if (options.minItems && value15.length < options.minItems)
    return false;
  if (options.maxItems && value15.length > options.maxItems)
    return false;
  for (let i = 0;i < value15.length; i++)
    if (!validateFile(options, value15[i]))
      return false;
  return true;
});
if (!exports_format.Has("numeric"))
  exports_format.Set("numeric", (value15) => !!value15 && !isNaN(+value15));
if (!exports_format.Has("boolean"))
  exports_format.Set("boolean", (value15) => value15 === "true" || value15 === "false");
if (!exports_format.Has("ObjectString"))
  exports_format.Set("ObjectString", (value15) => {
    let start = value15.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value15.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value15);
      return true;
    } catch {
      return false;
    }
  });
var ElysiaType = {
  Numeric: (property) => {
    const schema3 = Type.Number(property);
    return t2.Transform(t2.Union([
      t2.String({
        format: "numeric",
        default: 0
      }),
      t2.Number(property)
    ], property)).Decode((value15) => {
      const number7 = +value15;
      if (isNaN(number7))
        return value15;
      if (property && !exports_value2.Check(schema3, number7))
        throw new ValidationError("property", schema3, number7);
      return number7;
    }).Encode((value15) => value15);
  },
  Date: (property) => {
    const schema3 = Type.Date(property);
    return t2.Transform(t2.Union([
      Type.Date(property),
      t2.String({
        format: "date",
        default: (new Date()).toISOString()
      }),
      t2.String({
        format: "date-time",
        default: (new Date()).toISOString()
      })
    ], property)).Decode((value15) => {
      if (value15 instanceof Date)
        return value15;
      const date22 = new Date(value15);
      if (!exports_value2.Check(schema3, date22))
        throw new ValidationError("property", schema3, date22);
      return date22;
    }).Encode((value15) => {
      if (typeof value15 === "string")
        return new Date(value15);
      return value15;
    });
  },
  BooleanString: (property) => {
    const schema3 = Type.Boolean(property);
    return t2.Transform(t2.Union([
      t2.String({
        format: "boolean",
        default: false
      }),
      t2.Boolean(property)
    ], property)).Decode((value15) => {
      if (typeof value15 === "string")
        return value15 === "true";
      if (property && !exports_value2.Check(schema3, value15))
        throw new ValidationError("property", schema3, value15);
      return value15;
    }).Encode((value15) => value15);
  },
  ObjectString: (properties = {}, options) => {
    const schema3 = t2.Object(properties, options);
    const defaultValue = JSON.stringify(exports_value2.Create(schema3));
    return t2.Transform(t2.Union([
      t2.String({
        format: "ObjectString",
        default: defaultValue
      }),
      schema3
    ])).Decode((value15) => {
      if (typeof value15 === "string") {
        try {
          value15 = JSON.parse(value15);
        } catch {
          throw new ValidationError("property", schema3, value15);
        }
        if (!exports_value2.Check(schema3, value15))
          throw new ValidationError("property", schema3, value15);
        return value15;
      }
      return value15;
    }).Encode((value15) => {
      if (typeof value15 === "string")
        try {
          value15 = JSON.parse(value15);
        } catch {
          throw new ValidationError("property", schema3, value15);
        }
      if (!exports_value2.Check(schema3, value15))
        throw new ValidationError("property", schema3, value15);
      return JSON.stringify(value15);
    });
  },
  File: File2,
  Files: (options = {}) => t2.Transform(Files(options)).Decode((value15) => {
    if (Array.isArray(value15))
      return value15;
    return [value15];
  }).Encode((value15) => value15),
  Nullable: (schema3) => t2.Union([t2.Null(), schema3]),
  MaybeEmpty: (schema3) => t2.Union([t2.Null(), t2.Undefined(), schema3]),
  Cookie: (properties, {
    domain,
    expires,
    httpOnly,
    maxAge,
    path,
    priority,
    sameSite,
    secure,
    secrets,
    sign,
    ...options
  } = {}) => {
    const v = t2.Object(properties, options);
    v.config = {
      domain,
      expires,
      httpOnly,
      maxAge,
      path,
      priority,
      sameSite,
      secure,
      secrets,
      sign
    };
    return v;
  }
};
t2.BooleanString = ElysiaType.BooleanString;
t2.ObjectString = ElysiaType.ObjectString;
t2.Numeric = ElysiaType.Numeric;
t2.File = (arg = {}) => ElysiaType.File({
  default: "File",
  ...arg,
  extension: arg?.type,
  type: "string",
  format: "binary"
});
t2.Files = (arg = {}) => ElysiaType.Files({
  ...arg,
  elysiaMeta: "Files",
  default: "Files",
  extension: arg?.type,
  type: "array",
  items: {
    ...arg,
    default: "Files",
    type: "string",
    format: "binary"
  }
});
t2.Nullable = (schema3) => ElysiaType.Nullable(schema3);
t2.MaybeEmpty = ElysiaType.MaybeEmpty;
t2.Cookie = ElysiaType.Cookie;
t2.Date = ElysiaType.Date;
var Elysia = class _Elysia {
  constructor(config) {
    this.server = null;
    this.dependencies = {};
    this.reporter = new eventemitter3_default;
    this._routes = {};
    this._types = {
      Prefix: "",
      Scoped: false,
      Singleton: {},
      Definitions: {},
      Metadata: {}
    };
    this._ephemeral = {};
    this._volatile = {};
    this.singleton = {
      decorator: {},
      store: {},
      derive: {},
      resolve: {}
    };
    this.definitions = {
      type: {},
      error: {}
    };
    this.extender = {
      macros: []
    };
    this.validator = null;
    this.event = {
      start: [],
      request: [],
      parse: [],
      transform: [],
      beforeHandle: [],
      afterHandle: [],
      mapResponse: [],
      onResponse: [],
      trace: [],
      error: [],
      stop: []
    };
    this.telemetry = {
      stack: undefined
    };
    this.router = {
      http: new Memoirist,
      ws: new Memoirist,
      dynamic: new Memoirist,
      static: {
        http: {
          handlers: [],
          variables: "",
          map: {},
          all: ""
        },
        ws: {}
      },
      history: []
    };
    this.inference = {
      event: {
        body: false,
        cookie: false,
        headers: false,
        queries: [],
        query: false,
        set: false,
        unknownQueries: false
      },
      trace: {
        request: false,
        parse: false,
        transform: false,
        handle: false,
        beforeHandle: false,
        afterHandle: false,
        error: false,
        context: false,
        store: false,
        set: false
      }
    };
    this.promisedModules = new PromiseGroup;
    this.routeTree = new Map;
    this.handle = async (request) => this.fetch(request);
    this.fetch = (request) => {
      if (false)
        ;
      return (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(request);
    };
    this.handleError = async (context, error23) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(context, error23);
    this.outerErrorHandler = (error23) => new Response(error23.message || error23.name || "Error", {
      status: error23?.status ?? 500
    });
    this.listen = (options, callback) => {
      if (typeof Bun === "undefined")
        throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
      this.compile();
      if (typeof options === "string") {
        if (!isNumericString(options))
          throw new Error("Port must be a numeric value");
        options = parseInt(options);
      }
      const fetch = this.fetch;
      const serve = typeof options === "object" ? {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        ...options || {},
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        fetch,
        error: this.outerErrorHandler
      } : {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        port: options,
        fetch,
        error: this.outerErrorHandler
      };
      this.server = Bun?.serve(serve);
      for (let i = 0;i < this.event.start.length; i++)
        this.event.start[i].fn(this);
      if (callback)
        callback(this.server);
      process.on("beforeExit", () => {
        if (this.server) {
          this.server.stop();
          this.server = null;
          for (let i = 0;i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
        }
      });
      this.promisedModules.then(() => {
        Bun?.gc(false);
      });
      return this;
    };
    this.stop = async () => {
      if (!this.server)
        throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
      if (this.server) {
        this.server.stop();
        this.server = null;
        if (this.event.stop.length)
          for (let i = 0;i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
      }
    };
    if (config?.tags) {
      if (!config.detail)
        config.detail = {
          tags: config.tags
        };
      else
        config.detail.tags = config.tags;
    }
    this.config = {
      forceErrorEncapsulation: true,
      prefix: "",
      aot: true,
      strictPath: false,
      global: false,
      cookie: {},
      analytic: false,
      ...config,
      experimental: config?.experimental ?? {},
      seed: config?.seed === undefined ? "" : config?.seed
    };
    if (config?.analytic && (config?.name || config?.seed !== undefined))
      this.telemetry.stack = new Error().stack;
  }
  get store() {
    return this.singleton.store;
  }
  get decorator() {
    return this.singleton.decorator;
  }
  get _scoped() {
    return this.config.scoped;
  }
  getServer() {
    return this.server;
  }
  get routes() {
    return this.router.history;
  }
  applyMacro(localHook) {
    if (this.extender.macros.length) {
      const manage = createMacroManager({
        globalHook: this.event,
        localHook
      });
      const manager = {
        events: {
          global: this.event,
          local: localHook
        },
        onParse: manage("parse"),
        onTransform: manage("transform"),
        onBeforeHandle: manage("beforeHandle"),
        onAfterHandle: manage("afterHandle"),
        onResponse: manage("onResponse"),
        mapResponse: manage("mapResponse"),
        onError: manage("error")
      };
      for (const macro of this.extender.macros)
        traceBackMacro(macro.fn(manager), localHook);
    }
  }
  add(method, path, handle, localHook, { allowMeta = false, skipPrefix = false } = {
    allowMeta: false,
    skipPrefix: false
  }) {
    localHook = localHookToLifeCycleStore(localHook);
    if (path !== "" && path.charCodeAt(0) !== 47)
      path = "/" + path;
    if (this.config.prefix && !skipPrefix && !this.config.scoped)
      path = this.config.prefix + path;
    if (localHook?.type)
      switch (localHook.type) {
        case "text":
          localHook.type = "text/plain";
          break;
        case "json":
          localHook.type = "application/json";
          break;
        case "formdata":
          localHook.type = "multipart/form-data";
          break;
        case "urlencoded":
          localHook.type = "application/x-www-form-urlencoded";
          break;
        case "arrayBuffer":
          localHook.type = "application/octet-stream";
          break;
        default:
          break;
      }
    const models = this.definitions.type;
    let _body, _headers, _params, _query, _cookie, _response;
    const dynamic = !this.config.aot;
    const cloned = {
      body: localHook?.body ?? this.validator?.body,
      headers: localHook?.headers ?? this.validator?.headers,
      params: localHook?.params ?? this.validator?.params,
      query: localHook?.query ?? this.validator?.query,
      cookie: localHook?.cookie ?? this.validator?.cookie,
      response: localHook?.response ?? this.validator?.response
    };
    const cookieValidator = () => cloned.cookie ? getCookieValidator({
      validator: cloned.cookie,
      defaultConfig: this.config.cookie,
      config: cloned.cookie?.config ?? {},
      dynamic,
      models
    }) : undefined;
    const normalize = this.config.normalize;
    const validator = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.schema === true ? {
      body: getSchemaValidator(cloned.body, {
        dynamic,
        models,
        normalize
      }),
      headers: getSchemaValidator(cloned.headers, {
        dynamic,
        models,
        additionalProperties: true
      }),
      params: getSchemaValidator(cloned.params, {
        dynamic,
        models
      }),
      query: getSchemaValidator(cloned.query, {
        dynamic,
        models,
        normalize
      }),
      cookie: cookieValidator(),
      response: getResponseSchemaValidator(cloned.response, {
        dynamic,
        models,
        normalize
      })
    } : {
      get body() {
        if (_body)
          return _body;
        return _body = getSchemaValidator(cloned.body, {
          dynamic,
          models,
          normalize
        });
      },
      get headers() {
        if (_headers)
          return _headers;
        return getSchemaValidator(cloned.headers, {
          dynamic,
          models,
          additionalProperties: true
        });
      },
      get params() {
        if (_params)
          return _params;
        return _params = getSchemaValidator(cloned.params, {
          dynamic,
          models
        });
      },
      get query() {
        if (_query)
          return _query;
        return _query = getSchemaValidator(cloned.query, {
          dynamic,
          models
        });
      },
      get cookie() {
        if (_cookie)
          return _cookie;
        return _cookie = cookieValidator();
      },
      get response() {
        if (_response)
          return _response;
        return _response = getResponseSchemaValidator(cloned.response, {
          dynamic,
          models,
          normalize
        });
      }
    };
    const loosePath = path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
    localHook = mergeHook(localHook, {}, { allowMacro: true });
    if (localHook.tags) {
      if (!localHook.detail)
        localHook.detail = {
          tags: localHook.tags
        };
      else
        localHook.detail.tags = localHook.tags;
    }
    if (isNotEmpty(this.config.detail))
      localHook.detail = mergeDeep(Object.assign({}, this.config.detail), localHook.detail);
    this.applyMacro(localHook);
    const hooks = mergeHook(this.event, localHook);
    if (this.config.aot === false) {
      this.router.dynamic.add(method, path, {
        validator,
        hooks,
        content: localHook?.type,
        handle
      });
      if (this.config.strictPath === false) {
        this.router.dynamic.add(method, loosePath, {
          validator,
          hooks,
          content: localHook?.type,
          handle
        });
      }
      this.router.history.push({
        method,
        path,
        composed: null,
        handler: handle,
        hooks
      });
      return;
    }
    let composed = undefined;
    const shouldPrecompile = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.compose === true;
    const appInference = cloneInference(this.inference);
    const mainHandler = shouldPrecompile ? composeHandler({
      app: this,
      path,
      method,
      localHook: mergeHook(localHook),
      hooks,
      validator,
      handler: handle,
      allowMeta,
      appInference
    }) : (context) => {
      if (composed)
        return composed(context);
      return (composed = composeHandler({
        app: this,
        path,
        method,
        localHook: mergeHook(localHook),
        hooks,
        validator,
        handler: handle,
        allowMeta,
        appInference
      }))(context);
    };
    if (!shouldPrecompile)
      mainHandler.compose = () => {
        return mainHandler.composed = composeHandler({
          app: this,
          path,
          method,
          localHook: mergeHook(localHook),
          hooks,
          validator,
          handler: handle,
          allowMeta,
          appInference
        });
      };
    let routeIndex = this.router.history.length;
    if (this.routeTree.has(method + path)) {
      routeIndex = this.router.history.findIndex((route) => route.path === path && route.method === method);
      if (routeIndex !== -1) {
        const removed = this.router.history.splice(routeIndex, 1)[0];
        if (removed && this.routeTree.has(removed?.method + removed?.path))
          this.routeTree.delete(removed.method + removed.path);
      }
    }
    this.routeTree.set(method + path, routeIndex);
    this.router.history.push({
      method,
      path,
      composed: mainHandler,
      handler: handle,
      hooks
    });
    const staticRouter = this.router.static.http;
    if (method === "$INTERNALWS") {
      const loose = this.config.strictPath ? undefined : path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
      if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
        const index = staticRouter.handlers.length;
        staticRouter.handlers.push(mainHandler);
        staticRouter.variables += `const st${index} = staticRouter.handlers[${index}]
`;
        this.router.static.ws[path] = index;
        if (loose)
          this.router.static.ws[loose] = index;
      } else {
        this.router.ws.add("ws", path, mainHandler);
        if (loose)
          this.router.ws.add("ws", loose, mainHandler);
      }
      return;
    }
    if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
      const index = staticRouter.handlers.length;
      staticRouter.handlers.push(mainHandler);
      staticRouter.variables += shouldPrecompile ? `const st${index} = staticRouter.handlers[${index}]
` : `let st${index} = staticRouter.handlers[${index}]
let stc${index}
`;
      if (!staticRouter.map[path])
        staticRouter.map[path] = {
          code: ""
        };
      if (method === "ALL")
        staticRouter.map[path].all = shouldPrecompile ? `default: return st${index}(ctx)
` : `default: ${jitRoute(index)}
`;
      else
        staticRouter.map[path].code = shouldPrecompile ? `case '${method}': return st${index}(ctx)
${staticRouter.map[path].code}` : `case '${method}': ${jitRoute(index)}
${staticRouter.map[path].code}`;
      if (!this.config.strictPath) {
        if (!staticRouter.map[loosePath])
          staticRouter.map[loosePath] = {
            code: ""
          };
        if (method === "ALL")
          staticRouter.map[loosePath].all = shouldPrecompile ? `default: return st${index}(ctx)
` : `default: ${jitRoute(index)}
`;
        else
          staticRouter.map[loosePath].code = shouldPrecompile ? `case '${method}': return st${index}(ctx)
${staticRouter.map[loosePath].code}` : `case '${method}': ${jitRoute(index)}
${staticRouter.map[loosePath].code}`;
      }
    } else {
      this.router.http.add(method, path, mainHandler);
      if (!this.config.strictPath)
        this.router.http.add(method, path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/", mainHandler);
    }
  }
  headers(header) {
    if (!header)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    this.setHeaders = mergeDeep(this.setHeaders, header);
    return this;
  }
  onStart(handler) {
    this.on("start", handler);
    return this;
  }
  onRequest(handler) {
    this.on("request", handler);
    return this;
  }
  onParse(options, handler) {
    if (!handler)
      return this.on("parse", options);
    return this.on(options, "parse", handler);
  }
  onTransform(options, handler) {
    if (!handler)
      return this.on("transform", options);
    return this.on(options, "transform", handler);
  }
  resolve(optionsOrResolve, resolve) {
    if (!resolve) {
      resolve = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "resolve",
      fn: resolve
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  mapResolve(optionsOrResolve, mapper) {
    if (!mapper) {
      mapper = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "resolve",
      fn: mapper
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  onBeforeHandle(options, handler) {
    if (!handler)
      return this.on("beforeHandle", options);
    return this.on(options, "beforeHandle", handler);
  }
  onAfterHandle(options, handler) {
    if (!handler)
      return this.on("afterHandle", options);
    return this.on(options, "afterHandle", handler);
  }
  mapResponse(options, handler) {
    if (!handler)
      return this.on("mapResponse", options);
    return this.on(options, "mapResponse", handler);
  }
  onResponse(options, handler) {
    if (!handler)
      return this.on("response", options);
    return this.on(options, "response", handler);
  }
  trace(options, handler) {
    if (!handler) {
      handler = options;
      options = { as: "local" };
    }
    if (!Array.isArray(handler))
      handler = [handler];
    for (const fn of handler)
      this.reporter.on("event", createTraceListener(() => this.reporter, this.event.trace.length, fn));
    this.on(options, "trace", handler);
    return this;
  }
  error(name, error23) {
    switch (typeof name) {
      case "string":
        error23.prototype[ERROR_CODE] = name;
        this.definitions.error[name] = error23;
        return this;
      case "function":
        this.definitions.error = name(this.definitions.error);
        return this;
    }
    for (const [code, error32] of Object.entries(name)) {
      error32.prototype[ERROR_CODE] = code;
      this.definitions.error[code] = error32;
    }
    return this;
  }
  onError(options, handler) {
    if (!handler)
      return this.on("error", options);
    return this.on(options, "error", handler);
  }
  onStop(handler) {
    this.on("stop", handler);
    return this;
  }
  on(optionsOrType, typeOrHandlers, handlers) {
    let type47;
    switch (typeof optionsOrType) {
      case "string":
        type47 = optionsOrType;
        handlers = typeOrHandlers;
        break;
      case "object":
        type47 = typeOrHandlers;
        break;
    }
    if (type47 === "response")
      type47 = "onResponse";
    if (Array.isArray(handlers))
      handlers = fnToContainer(handlers);
    else {
      if (typeof handlers === "function")
        handlers = [
          {
            fn: handlers
          }
        ];
      else
        handlers = [handlers];
    }
    const handles = handlers;
    for (const handle of handles)
      handle.scope = typeof optionsOrType === "string" ? "local" : optionsOrType?.as ?? "local";
    if (type47 === "trace")
      sucroseTrace(handles.map((x) => x.fn), this.inference.trace);
    else
      sucrose({
        [type47]: handles.map((x) => x.fn)
      }, this.inference.event);
    for (const handle of handles) {
      const fn = asHookType(handle, "global", { skipIfHasType: true });
      switch (type47) {
        case "start":
          this.event.start.push(fn);
          break;
        case "request":
          this.event.request.push(fn);
          break;
        case "parse":
          this.event.parse.push(fn);
          break;
        case "transform":
          this.event.transform.push(fn);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(fn);
          break;
        case "afterHandle":
          this.event.afterHandle.push(fn);
          break;
        case "mapResponse":
          this.event.mapResponse.push(fn);
          break;
        case "onResponse":
          this.event.onResponse.push(fn);
          break;
        case "trace":
          this.event.trace.push(fn);
          break;
        case "error":
          this.event.error.push(fn);
          break;
        case "stop":
          this.event.stop.push(fn);
          break;
      }
    }
    return this;
  }
  propagate() {
    const promoteEvent = (events) => {
      for (const event of events) {
        if ("scope" in event && event.scope === "local")
          event.scope = "scoped";
      }
    };
    promoteEvent(this.event.parse);
    promoteEvent(this.event.transform);
    promoteEvent(this.event.beforeHandle);
    promoteEvent(this.event.afterHandle);
    promoteEvent(this.event.mapResponse);
    promoteEvent(this.event.onResponse);
    promoteEvent(this.event.trace);
    promoteEvent(this.event.error);
    return this;
  }
  group(prefix, schemaOrRun, run) {
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.getServer = () => this.server;
    instance.inference = cloneInference(this.inference);
    const isSchema = typeof schemaOrRun === "object";
    const sandbox = (isSchema ? run : schemaOrRun)(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.onResponse.length)
      this.event.onResponse = [
        ...this.event.onResponse || [],
        ...sandbox.event.onResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(({ method, path, handler, hooks }) => {
      path = (isSchema ? "" : this.config.prefix) + prefix + path;
      if (isSchema) {
        const hook = schemaOrRun;
        const localHook = hooks;
        this.add(method, path, handler, mergeHook(hook, {
          ...localHook || {},
          error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
            ...localHook.error || {},
            ...sandbox.event.error || {}
          ] : [
            localHook.error,
            ...sandbox.event.error || {}
          ]
        }));
      } else {
        this.add(method, path, handler, mergeHook(hooks, {
          error: sandbox.event.error
        }), {
          skipPrefix: true
        });
      }
    });
    return this;
  }
  guard(hook, run) {
    if (!run) {
      if (typeof hook === "object") {
        this.applyMacro(hook);
        this.event = mergeLifeCycle(this.event, hook);
        this.validator = {
          body: hook.body ?? this.validator?.body,
          headers: hook.headers ?? this.validator?.headers,
          params: hook.params ?? this.validator?.params,
          query: hook.query ?? this.validator?.query,
          response: hook.response ?? this.validator?.response,
          cookie: hook.cookie ?? this.validator?.cookie
        };
        if (hook.detail) {
          if (this.config.detail)
            this.config.detail = mergeDeep(Object.assign({}, this.config.detail), hook.detail);
          else
            this.config.detail = hook.detail;
        }
        if (hook?.tags) {
          if (!this.config.detail)
            this.config.detail = {
              tags: hook.tags
            };
          else
            this.config.detail.tags = hook.tags;
        }
        return this;
      }
      return this.guard({}, hook);
    }
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.inference = cloneInference(this.inference);
    const sandbox = run(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    sandbox.getServer = () => this.server;
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.onResponse.length)
      this.event.onResponse = [
        ...this.event.onResponse || [],
        ...sandbox.event.onResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(({ method, path, handler, hooks: localHook }) => {
      this.add(method, path, handler, mergeHook(hook, {
        ...localHook || {},
        error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
          ...localHook.error || {},
          ...sandbox.event.error || []
        ] : [
          localHook.error,
          ...sandbox.event.error || []
        ]
      }, {
        allowMacro: true
      }));
    });
    return this;
  }
  use(plugin, options) {
    if (options?.scoped)
      return this.guard({}, (app) => app.use(plugin));
    if (Array.isArray(plugin)) {
      let current = this;
      for (const p of plugin)
        current = this.use(p);
      return current;
    }
    if (plugin instanceof Promise) {
      this.promisedModules.add(plugin.then((plugin2) => {
        if (typeof plugin2 === "function")
          return plugin2(this);
        if (plugin2 instanceof _Elysia)
          return this._use(plugin2);
        if (typeof plugin2.default === "function")
          return plugin2.default(this);
        if (plugin2.default instanceof _Elysia)
          return this._use(plugin2.default);
        throw new Error('Invalid plugin type. Expected Elysia instance, function, or module with "default" as Elysia instance or function that returns Elysia instance.');
      }).then((x) => x.compile()));
      return this;
    }
    return this._use(plugin);
  }
  _use(plugin) {
    if (typeof plugin === "function") {
      const instance = plugin(this);
      if (instance instanceof Promise) {
        this.promisedModules.add(instance.then((plugin2) => {
          if (plugin2 instanceof _Elysia) {
            this.compile();
            for (const {
              method,
              path,
              handler,
              hooks
            } of Object.values(plugin2.router.history)) {
              this.add(method, path, handler, mergeHook(hooks, {
                error: plugin2.event.error
              }));
            }
            return plugin2;
          }
          if (typeof plugin2 === "function")
            return plugin2(this);
          if (typeof plugin2.default === "function")
            return plugin2.default(this);
          return this._use(plugin2);
        }).then((x) => x.compile()));
        return this;
      }
      return instance;
    }
    if (plugin.promisedModules.size) {
      this.promisedModules.add(plugin.modules.then(() => this._use(plugin)).then((x) => x.compile()));
      return this;
    }
    const { name, seed } = plugin.config;
    plugin.getServer = () => this.getServer();
    plugin.model(this.definitions.type);
    plugin.error(this.definitions.error);
    const isScoped = plugin.config.scoped;
    if (isScoped) {
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.telemetry.stack,
          routes: plugin.router.history,
          decorators: plugin.singleton.decorator,
          store: plugin.singleton.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
            fn: x.fn.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
            fn: x.fn.toString(),
            stack: new Error().stack ?? ""
          }))
        });
      }
      plugin.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      const macroHashes = [];
      for (let i = 0;i < plugin.extender.macros.length; i++) {
        const macro = this.extender.macros[i];
        if (macroHashes.includes(macro.checksum)) {
          plugin.extender.macros.splice(i, 1);
          i--;
        }
        macroHashes.push(macro.checksum);
      }
      plugin.onRequest((context) => {
        Object.assign(context, this.singleton.decorator);
        Object.assign(context.store, this.singleton.store);
      });
      if (plugin.event.trace.length)
        plugin.event.trace.push(...plugin.event.trace);
      if (!plugin.config.prefix)
        console.warn("It's recommended to use scoped instance with a prefix to prevent collision routing with other instance.");
      if (plugin.event.error.length)
        plugin.event.error.push(...this.event.error);
      if (plugin.config.aot)
        plugin.compile();
      if (isScoped === true && plugin.config.prefix) {
        this.mount(plugin.config.prefix + "/", plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length);
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      } else {
        this.mount(plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length);
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      }
      return this;
    } else {
      this.headers(plugin.setHeaders);
      plugin.reporter = this.reporter;
      for (const trace of plugin.event.trace)
        if (trace.scope && trace.scope !== "local")
          this.trace(trace);
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (!this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          this.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      } else {
        this.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      }
      const macroHashes = [];
      for (let i = 0;i < this.extender.macros.length; i++) {
        const macro = this.extender.macros[i];
        if (macro.checksum) {
          if (macroHashes.includes(macro.checksum)) {
            this.extender.macros.splice(i, 1);
            i--;
          }
          macroHashes.push(macro.checksum);
        }
      }
      this.inference = {
        event: {
          body: this.inference.event.body || plugin.inference.event.body,
          cookie: this.inference.event.cookie || plugin.inference.event.cookie,
          headers: this.inference.event.headers || plugin.inference.event.headers,
          queries: [
            ...this.inference.event.queries,
            ...plugin.inference.event.queries
          ],
          query: this.inference.event.query || plugin.inference.event.query,
          set: this.inference.event.set || plugin.inference.event.set,
          unknownQueries: this.inference.event.unknownQueries || plugin.inference.event.unknownQueries
        },
        trace: {
          request: this.inference.trace.request || plugin.inference.trace.request,
          parse: this.inference.trace.parse || plugin.inference.trace.parse,
          transform: this.inference.trace.transform || plugin.inference.trace.transform,
          handle: this.inference.trace.handle || plugin.inference.trace.handle,
          beforeHandle: this.inference.trace.beforeHandle || plugin.inference.trace.beforeHandle,
          afterHandle: this.inference.trace.afterHandle || plugin.inference.trace.afterHandle,
          error: this.inference.trace.error || plugin.inference.trace.error,
          context: this.inference.trace.context || plugin.inference.trace.context,
          store: this.inference.trace.store || plugin.inference.trace.store,
          set: this.inference.trace.set || plugin.inference.trace.set
        }
      };
    }
    this.decorate(plugin.singleton.decorator);
    this.state(plugin.singleton.store);
    this.model(plugin.definitions.type);
    this.error(plugin.definitions.error);
    for (const { method, path, handler, hooks } of Object.values(plugin.router.history)) {
      this.add(method, path, handler, mergeHook(hooks, {
        error: plugin.event.error
      }));
    }
    if (!isScoped)
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.telemetry.stack,
          routes: plugin.router.history,
          decorators: plugin.singleton,
          store: plugin.singleton.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x?.subType === "derive").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x?.subType === "resolve").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          }))
        });
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event), current);
      } else {
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event));
      }
    return this;
  }
  macro(macro) {
    const hook = {
      checksum: checksum(JSON.stringify({
        name: this.config.name,
        seed: this.config.seed,
        content: macro.toString()
      })),
      fn: macro
    };
    this.extender.macros.push(hook);
    return this;
  }
  mount(path, handle) {
    if (path instanceof _Elysia || typeof path === "function" || path.length === 0 || path === "/") {
      const run = typeof path === "function" ? path : path instanceof _Elysia ? path.compile().fetch : handle instanceof _Elysia ? handle.compile().fetch : handle;
      const handler2 = async ({ request, path: path2 }) => run(new Request(replaceUrlPath(request.url, path2 || "/"), request));
      this.all("/*", handler2, {
        type: "none"
      });
      return this;
    }
    const length = path.length;
    if (handle instanceof _Elysia)
      handle = handle.compile().fetch;
    const handler = async ({ request, path: path2 }) => handle(new Request(replaceUrlPath(request.url, path2.slice(length) || "/"), request));
    this.all(path, handler, {
      type: "none"
    });
    this.all(path + (path.endsWith("/") ? "*" : "/*"), handler, {
      type: "none"
    });
    return this;
  }
  get(path, handler, hook) {
    this.add("GET", path, handler, hook);
    return this;
  }
  post(path, handler, hook) {
    this.add("POST", path, handler, hook);
    return this;
  }
  put(path, handler, hook) {
    this.add("PUT", path, handler, hook);
    return this;
  }
  patch(path, handler, hook) {
    this.add("PATCH", path, handler, hook);
    return this;
  }
  delete(path, handler, hook) {
    this.add("DELETE", path, handler, hook);
    return this;
  }
  options(path, handler, hook) {
    this.add("OPTIONS", path, handler, hook);
    return this;
  }
  all(path, handler, hook) {
    this.add("ALL", path, handler, hook);
    return this;
  }
  head(path, handler, hook) {
    this.add("HEAD", path, handler, hook);
    return this;
  }
  connect(path, handler, hook) {
    this.add("CONNECT", path, handler, hook);
    return this;
  }
  route(method, path, handler, hook) {
    this.add(method.toUpperCase(), path, handler, hook, hook?.config);
    return this;
  }
  ws(path, options) {
    const transform7 = options.transformMessage ? Array.isArray(options.transformMessage) ? options.transformMessage : [options.transformMessage] : undefined;
    let server = null;
    const validateMessage = getSchemaValidator(options?.body, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const validateResponse = getSchemaValidator(options?.response, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const parseMessage = (message) => {
      if (typeof message === "string") {
        const start = message?.charCodeAt(0);
        if (start === 47 || start === 123)
          try {
            message = JSON.parse(message);
          } catch {
          }
        else if (isNumericString(message))
          message = +message;
      }
      if (transform7?.length)
        for (let i = 0;i < transform7.length; i++) {
          const temp = transform7[i](message);
          if (temp !== undefined)
            message = temp;
        }
      return message;
    };
    this.route("$INTERNALWS", path, (context) => {
      const { set: set2, path: path2, qi, headers, query, params } = context;
      if (server === null)
        server = this.getServer();
      if (server?.upgrade(context.request, {
        headers: typeof options.upgrade === "function" ? options.upgrade(context) : options.upgrade,
        data: {
          validator: validateResponse,
          open(ws) {
            options.open?.(new ElysiaWS(ws, context));
          },
          message: (ws, msg) => {
            const message = parseMessage(msg);
            if (validateMessage?.Check(message) === false)
              return void ws.send(new ValidationError("message", validateMessage, message).message);
            options.message?.(new ElysiaWS(ws, context), message);
          },
          drain(ws) {
            options.drain?.(new ElysiaWS(ws, context));
          },
          close(ws, code, reason) {
            options.close?.(new ElysiaWS(ws, context), code, reason);
          }
        }
      }))
        return;
      set2.status = 400;
      return "Expected a websocket connection";
    }, {
      beforeHandle: options.beforeHandle,
      transform: options.transform,
      headers: options.headers,
      params: options.params,
      query: options.query
    });
    return this;
  }
  state(name, value15) {
    switch (typeof name) {
      case "object":
        this.singleton.store = mergeDeep(this.singleton.store, name);
        return this;
      case "function":
        this.singleton.store = name(this.singleton.store);
        return this;
    }
    if (!(name in this.singleton.store)) {
      this.singleton.store[name] = value15;
    }
    return this;
  }
  decorate(name, value15) {
    switch (typeof name) {
      case "object":
        this.singleton.decorator = mergeDeep(this.singleton.decorator, name);
        return this;
      case "function":
        this.singleton.decorator = name(this.singleton.decorator);
        return this;
    }
    if (!(name in this.singleton.decorator))
      this.singleton.decorator[name] = value15;
    return this;
  }
  derive(optionsOrTransform, transform7) {
    if (!transform7) {
      transform7 = optionsOrTransform;
      optionsOrTransform = { as: "local" };
    }
    const hook = {
      subType: "derive",
      fn: transform7
    };
    return this.onTransform(optionsOrTransform, hook);
  }
  model(name, model) {
    switch (typeof name) {
      case "object":
        Object.entries(name).forEach(([key, value15]) => {
          if (!(key in this.definitions.type))
            this.definitions.type[key] = value15;
        });
        return this;
      case "function":
        this.definitions.type = name(this.definitions.type);
        return this;
    }
    this.definitions.type[name] = model;
    return this;
  }
  mapDerive(optionsOrDerive, mapper) {
    if (!mapper) {
      mapper = optionsOrDerive;
      optionsOrDerive = { as: "local" };
    }
    const hook = {
      subType: "derive",
      fn: mapper
    };
    return this.onTransform(optionsOrDerive, hook);
  }
  affix(base, type47, word) {
    if (word === "")
      return this;
    const delimieter = ["_", "-", " "];
    const capitalize2 = (word2) => word2[0].toUpperCase() + word2.slice(1);
    const joinKey = base === "prefix" ? (prefix, word2) => delimieter.includes(prefix.at(-1) ?? "") ? prefix + word2 : prefix + capitalize2(word2) : delimieter.includes(word.at(-1) ?? "") ? (suffix, word2) => word2 + suffix : (suffix, word2) => word2 + capitalize2(suffix);
    const remap = (type210) => {
      const store = {};
      switch (type210) {
        case "decorator":
          for (const key in this.singleton.decorator) {
            store[joinKey(word, key)] = this.singleton.decorator[key];
          }
          this.singleton.decorator = store;
          break;
        case "state":
          for (const key in this.singleton.store)
            store[joinKey(word, key)] = this.singleton.store[key];
          this.singleton.store = store;
          break;
        case "model":
          for (const key in this.definitions.type)
            store[joinKey(word, key)] = this.definitions.type[key];
          this.definitions.type = store;
          break;
        case "error":
          for (const key in this.definitions.error)
            store[joinKey(word, key)] = this.definitions.error[key];
          this.definitions.error = store;
          break;
      }
    };
    const types = Array.isArray(type47) ? type47 : [type47];
    for (const type210 of types.some((x) => x === "all") ? ["decorator", "state", "model", "error"] : types)
      remap(type210);
    return this;
  }
  prefix(type47, word) {
    return this.affix("prefix", type47, word);
  }
  suffix(type47, word) {
    return this.affix("suffix", type47, word);
  }
  compile() {
    this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this);
    if (typeof this.server?.reload === "function")
      this.server.reload({
        ...this.server || {},
        fetch: this.fetch
      });
    return this;
  }
  get modules() {
    return Promise.all(this.promisedModules.promises);
  }
};

// node_modules/@elysiajs/swagger/dist/swagger/index.js
var SwaggerUIRender = (info, version, theme, stringifiedSwaggerOptions, autoDarkMode) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${info.title}</title>
    <meta
        name="description"
        content="${info.description}"
    />
    <meta
        name="og:description"
        content="${info.description}"
    />
    ${autoDarkMode && typeof theme === "string" ? `
    <style>
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #222;
                color: #faf9a;
            }
            .swagger-ui {
                filter: invert(92%) hue-rotate(180deg);
            }

            .swagger-ui .microlight {
                filter: invert(100%) hue-rotate(180deg);
            }
        }
    </style>` : ""}
    ${typeof theme === "string" ? `<link rel="stylesheet" href="${theme}" />` : `<link rel="stylesheet" media="(prefers-color-scheme: light)" href="${theme.light}" />
<link rel="stylesheet" media="(prefers-color-scheme: dark)" href="${theme.dark}" />`}
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@${version}/swagger-ui-bundle.js" crossorigin></script>
    <script>
        window.onload = () => {
            window.ui = SwaggerUIBundle(${stringifiedSwaggerOptions});
        };
    </script>
</body>
</html>`;

// node_modules/@elysiajs/swagger/dist/scalar/theme.js
var theme_default = `
/* basic theme */
.light-mode {
  --theme-color-1: #2a2f45;
  --theme-color-2: #757575;
  --theme-color-3: #8e8e8e;
  --theme-color-accent: #f06292;

  --theme-background-1: #fff;
  --theme-background-2: #f6f6f6;
  --theme-background-3: #e7e7e7;
  --theme-background-accent: #f062921f;

  --theme-border-color: rgba(0, 0, 0, 0.1);
}
.dark-mode {
  --theme-color-1: rgba(255, 255, 255, 0.9);
  --theme-color-2: rgba(156, 163, 175, 1);
  --theme-color-3: rgba(255, 255, 255, 0.44);
  --theme-color-accent: #f06292;

  --theme-background-1: #111728;
  --theme-background-2: #1e293b;
  --theme-background-3: #334155;
  --theme-background-accent: #f062921f;

  --theme-border-color: rgba(255, 255, 255, 0.1);
}
/* Document Sidebar */
.light-mode .sidebar,
.dark-mode .sidebar {
  --sidebar-background-1: var(--theme-background-1);
  --sidebar-item-hover-color: currentColor;
  --sidebar-item-hover-background: var(--theme-background-2);
  --sidebar-item-active-background: var(--theme-background-accent);
  --sidebar-border-color: transparent;
  --sidebar-color-1: var(--theme-color-1);
  --sidebar-color-2: var(--theme-color-2);
  --sidebar-color-active: var(--theme-color-accent);
  --sidebar-search-background: transparent;
  --sidebar-search-border-color: var(--theme-border-color);
  --sidebar-search--color: var(--theme-color-3);
}
/* Document header only shows on mobile*/
.dark-mode .t-doc__header,
.light-mode .t-doc__header {
  --header-background-1: rgba(255, 255, 255, 0.85);
  --header-border-color: transparent;
  --header-color-1: var(--theme-color-1);
  --header-color-2: var(--theme-color-2);
  --header-background-toggle: var(--theme-color-3);
  --header-call-to-action-color: var(--theme-color-accent);
}

.dark-mode .t-doc__header {
  --header-background-1: rgba(17, 23, 40, 0.75);
}

/* advanced */
.light-mode {
  --theme-button-1: rgb(49 53 56);
  --theme-button-1-color: #fff;
  --theme-button-1-hover: rgb(28 31 33);

  --theme-color-green: #069061;
  --theme-color-red: #ef0006;
  --theme-color-yellow: #edbe20;
  --theme-color-blue: #0082d0;
  --theme-color-orange: #fb892c;
  --theme-color-purple: #5203d1;

  --theme-scrollbar-color: rgba(0, 0, 0, 0.18);
  --theme-scrollbar-color-active: rgba(0, 0, 0, 0.36);
}
.dark-mode {
  --theme-button-1: #f6f6f6;
  --theme-button-1-color: #000;
  --theme-button-1-hover: #e7e7e7;

  --theme-color-green: #a3ffa9;
  --theme-color-red: #ffa3a3;
  --theme-color-yellow: #fffca3;
  --theme-color-blue: #a5d6ff;
  --theme-color-orange: #e2ae83;
  --theme-color-purple: #d2a8ff;

  --theme-scrollbar-color: rgba(255, 255, 255, 0.24);
  --theme-scrollbar-color-active: rgba(255, 255, 255, 0.48);
}
/* Elysia Specific */
.scalar-api-client__send-request-button,
.show-api-client-button {
  background: #3c82f6 !important;
}
.show-api-client-button:before {
  display: none;
}

.sidebar-search:hover {
  transition: all 0.15s ease-in-out;
  --sidebar-search-border-color: var(--theme-color-accent) !important;
  color: var(--sidebar-color-1) !important;
}
.scalar-api-client__container .sidebar {
  --sidebar-border-color: var(--theme-border-color);
}
@media (min-width: 1150px) {
  .section-container:has( ~ .footer):before,
  .tag-section-container:before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(90deg, var(--theme-background-1) 3%,transparent 10%);
  }
}
.section-flare {
  position: absolute;
  width: 100vw;
  height: 300px;
  --stripes: repeating-linear-gradient(
    100deg,
    #fff 0%,
    #fff 7%,
    transparent 10%,
    transparent 12%,
    #fff 16%
  );
  --stripesDark: repeating-linear-gradient(
    100deg,
    #000 0%,
    #000 7%,
    transparent 10%,
    transparent 12%,
    #000 16%
  );
  --rainbow: repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 16%,
    #5eead4 22%,
    #60a5fa 30%
  );
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: invert(100%);
  -webkit-mask-image: radial-gradient(
    ellipse at 100% 0%,
    black 40%,
    transparent 70%
  );
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  pointer-events: none;
  opacity: 0.15;
}
.dark-mode .section-flare {
  background-image: var(--stripesDark), var(--rainbow);
  filter: opacity(50%) saturate(200%);
  opacity: 0.25;
}
.section-flare:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
}
.dark-mode .section-flare:after {
  background-image: var(--stripesDark), var(--rainbow);
}
@keyframes headerbackground {
  from {
    background: transparent;
    backdrop-filter: none;
  }
  to {
    background: var(--header-background-1);
    backdrop-filter: blur(12px);
  }
}
.light-mode .t-doc__header,
.dark-mode .t-doc__header {
  animation: headerbackground forwards;
  animation-timeline: scroll();
  animation-range: 0px 200px;
  --header-border-color: transparent;
}
`;

// node_modules/@elysiajs/swagger/dist/scalar/index.js
var ScalarRender = (version, config, cdn) => `<!doctype html>
<html>
  <head>
    <title>API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
    <style>
      body {
        margin: 0;
      }
    </style>
    <style>
      ${config.customCss ?? theme_default}
    </style>
  </head>
  <body>
    <script
      id="api-reference"
      data-url="${config.spec?.url}"
      data-configuration='${JSON.stringify(config)}'
    >
    </script>
    <script src="${cdn ? cdn : `https://cdn.jsdelivr.net/npm/@scalar/api-reference@${version}/dist/browser/standalone.min.js`}" crossorigin></script>
  </body>
</html>`;

// node_modules/@elysiajs/swagger/dist/utils.js
var import_lodash = __toESM(require_lodash(), 1);
var toOpenAPIPath = (path) => path.split("/").map((x) => x.startsWith(":") ? `{${x.slice(1, x.length)}}` : x).join("/");
var mapProperties = (name, schema3, models) => {
  if (schema3 === undefined)
    return [];
  if (typeof schema3 === "string")
    if (schema3 in models)
      schema3 = models[schema3];
    else
      throw new Error(`Can't find model ${schema3}`);
  return Object.entries(schema3?.properties ?? []).map(([key, value15]) => {
    const { type: valueType = undefined, description, examples, ...schemaKeywords } = value15;
    return {
      description,
      examples,
      schema: { type: valueType, ...schemaKeywords },
      in: name,
      name: key,
      required: schema3.required?.includes(key) ?? false
    };
  });
};
var mapTypesResponse = (types, schema3) => {
  if (typeof schema3 === "object" && ["void", "undefined", "null"].includes(schema3.type))
    return;
  const responses = {};
  for (const type47 of types)
    responses[type47] = {
      schema: typeof schema3 === "string" ? {
        $ref: `#/components/schemas/${schema3}`
      } : { ...schema3 }
    };
  return responses;
};
var capitalize2 = (word) => word.charAt(0).toUpperCase() + word.slice(1);
var generateOperationId = (method, paths) => {
  let operationId = method.toLowerCase();
  if (paths === "/")
    return operationId + "Index";
  for (const path of paths.split("/")) {
    if (path.charCodeAt(0) === 123) {
      operationId += "By" + capitalize2(path.slice(1, -1));
    } else {
      operationId += capitalize2(path);
    }
  }
  return operationId;
};
var registerSchemaPath = ({ schema: schema3, path, method, hook, models }) => {
  if (hook)
    hook = import_lodash.default(hook);
  const contentType = hook?.type ?? [
    "application/json",
    "multipart/form-data",
    "text/plain"
  ];
  path = toOpenAPIPath(path);
  const contentTypes = typeof contentType === "string" ? [contentType] : contentType ?? ["application/json"];
  const bodySchema = hook?.body;
  const paramsSchema = hook?.params;
  const headerSchema = hook?.headers;
  const querySchema = hook?.query;
  let responseSchema = hook?.response;
  if (typeof responseSchema === "object") {
    if (Kind in responseSchema) {
      const { type: type47, properties, required: required5, additionalProperties, patternProperties, ...rest4 } = responseSchema;
      responseSchema = {
        "200": {
          ...rest4,
          description: rest4.description,
          content: mapTypesResponse(contentTypes, type47 === "object" || type47 === "array" ? {
            type: type47,
            properties,
            patternProperties,
            items: responseSchema.items,
            required: required5
          } : responseSchema)
        }
      };
    } else {
      Object.entries(responseSchema).forEach(([key, value15]) => {
        if (typeof value15 === "string") {
          if (!models[value15])
            return;
          const { type: type47, properties, required: required5, additionalProperties: _1, patternProperties: _2, ...rest4 } = models[value15];
          responseSchema[key] = {
            ...rest4,
            description: rest4.description,
            content: mapTypesResponse(contentTypes, value15)
          };
        } else {
          const { type: type47, properties, required: required5, additionalProperties, patternProperties, ...rest4 } = value15;
          responseSchema[key] = {
            ...rest4,
            description: rest4.description,
            content: mapTypesResponse(contentTypes, type47 === "object" || type47 === "array" ? {
              type: type47,
              properties,
              patternProperties,
              items: value15.items,
              required: required5
            } : value15)
          };
        }
      });
    }
  } else if (typeof responseSchema === "string") {
    if (!(responseSchema in models))
      return;
    const { type: type47, properties, required: required5, additionalProperties: _1, patternProperties: _2, ...rest4 } = models[responseSchema];
    responseSchema = {
      "200": {
        ...rest4,
        content: mapTypesResponse(contentTypes, responseSchema)
      }
    };
  }
  const parameters4 = [
    ...mapProperties("header", headerSchema, models),
    ...mapProperties("path", paramsSchema, models),
    ...mapProperties("query", querySchema, models)
  ];
  schema3[path] = {
    ...schema3[path] ? schema3[path] : {},
    [method.toLowerCase()]: {
      ...headerSchema || paramsSchema || querySchema || bodySchema ? { parameters: parameters4 } : {},
      ...responseSchema ? {
        responses: responseSchema
      } : {},
      operationId: hook?.detail?.operationId ?? generateOperationId(method, path),
      ...hook?.detail,
      ...bodySchema ? {
        requestBody: {
          required: true,
          content: mapTypesResponse(contentTypes, typeof bodySchema === "string" ? {
            $ref: `#/components/schemas/${bodySchema}`
          } : bodySchema)
        }
      } : null
    }
  };
};
var filterPaths = (paths, { excludeStaticFile = true, exclude: exclude6 = [] }) => {
  const newPaths = {};
  for (const [key, value15] of Object.entries(paths))
    if (!exclude6.some((x) => {
      if (typeof x === "string")
        return key === x;
      return x.test(key);
    }) && !key.includes("/swagger") && !key.includes("*") && (excludeStaticFile ? !key.includes(".") : true)) {
      Object.keys(value15).forEach((method) => {
        const schema3 = value15[method];
        if (key.includes("{")) {
          if (!schema3.parameters)
            schema3.parameters = [];
          schema3.parameters = [
            ...key.split("/").filter((x) => x.startsWith("{") && !schema3.parameters.find((params) => params.in === "path" && params.name === x.slice(1, x.length - 1))).map((x) => ({
              schema: { type: "string" },
              in: "path",
              name: x.slice(1, x.length - 1),
              required: true
            })),
            ...schema3.parameters
          ];
        }
        if (!schema3.responses)
          schema3.responses = {
            200: {}
          };
      });
      newPaths[key] = value15;
    }
  return newPaths;
};

// node_modules/@elysiajs/swagger/dist/index.js
var swagger2 = ({ provider = "scalar", scalarVersion = "latest", scalarCDN = "", scalarConfig = {}, documentation = {}, version = "5.9.0", excludeStaticFile = true, path = "/swagger", exclude: exclude6 = [], swaggerOptions = {}, theme: theme2 = `https://unpkg.com/swagger-ui-dist@${version}/swagger-ui.css`, autoDarkMode = true, excludeMethods = ["OPTIONS"], excludeTags = [] } = {
  provider: "scalar",
  scalarVersion: "latest",
  scalarCDN: "",
  scalarConfig: {},
  documentation: {},
  version: "5.9.0",
  excludeStaticFile: true,
  path: "/swagger",
  exclude: [],
  swaggerOptions: {},
  autoDarkMode: true,
  excludeMethods: ["OPTIONS"],
  excludeTags: []
}) => (app) => {
  const schema3 = {};
  let totalRoutes = 0;
  if (!version)
    version = `https://unpkg.com/swagger-ui-dist@${version}/swagger-ui.css`;
  const info = {
    title: "Elysia Documentation",
    description: "Development documentation",
    version: "0.0.0",
    ...documentation.info
  };
  const relativePath = path.startsWith("/") ? path.slice(1) : path;
  app.get(path, () => {
    const combinedSwaggerOptions = {
      url: `${relativePath}/json`,
      dom_id: "#swagger-ui",
      ...swaggerOptions
    };
    const stringifiedSwaggerOptions = JSON.stringify(combinedSwaggerOptions, (key, value15) => {
      if (typeof value15 == "function")
        return;
      return value15;
    });
    const scalarConfiguration = {
      spec: {
        ...scalarConfig.spec,
        url: `${relativePath}/json`
      },
      ...scalarConfig
    };
    return new Response(provider === "swagger-ui" ? SwaggerUIRender(info, version, theme2, stringifiedSwaggerOptions, autoDarkMode) : ScalarRender(scalarVersion, scalarConfiguration, scalarCDN), {
      headers: {
        "content-type": "text/html; charset=utf8"
      }
    });
  }).get(path === "/" ? "/json" : `${path}/json`, () => {
    const routes = app.routes;
    if (routes.length !== totalRoutes) {
      totalRoutes = routes.length;
      routes.forEach((route) => {
        if (excludeMethods.includes(route.method))
          return;
        registerSchemaPath({
          schema: schema3,
          hook: route.hooks,
          method: route.method,
          path: route.path,
          models: app.definitions?.type,
          contentType: route.hooks.type
        });
      });
    }
    return {
      openapi: "3.0.3",
      ...{
        ...documentation,
        tags: documentation.tags?.filter((tag) => !excludeTags?.includes(tag?.name)),
        info: {
          title: "Elysia Documentation",
          description: "Development documentation",
          version: "0.0.0",
          ...documentation.info
        }
      },
      paths: {
        ...filterPaths(schema3, {
          excludeStaticFile,
          exclude: Array.isArray(exclude6) ? exclude6 : [exclude6]
        }),
        ...documentation.paths
      },
      components: {
        ...documentation.components,
        schemas: {
          ...app.definitions?.type,
          ...documentation.components?.schemas
        }
      }
    };
  });
  return app;
};

// src/index.ts
import http from "http";

// ../node_modules/socket.io/wrapper.mjs
var dist = __toESM(require_dist2(), 1);
var { Server, Namespace, Socket } = dist.default;

// src/index.ts
var app = new Elysia().use(swagger2()).get("/", () => "Hello eeee 21");
var server = http.createServer(app);
var io2 = new Server(server);
io2.on("connection", (socket) => {
  console.log("a user connected");
  io2.emit("test", { hello: 1 });
  socket.on("ping", (e2) => {
    console.log(e2, "ping sent");
    socket.emit("pong", "pong!");
  });
});
server.listen(3000);
console.log(`\uD83E\uDD8A Elysia is running at `);
var b;
console.log(b.a);
