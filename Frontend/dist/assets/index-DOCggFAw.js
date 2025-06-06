(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const i of l)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const i = {};
    return (
      l.integrity && (i.integrity = l.integrity),
      l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i);
  }
})();
function Ef(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ba = { exports: {} },
  _l = {},
  Ha = { exports: {} },
  O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fr = Symbol.for("react.element"),
  Cf = Symbol.for("react.portal"),
  Nf = Symbol.for("react.fragment"),
  _f = Symbol.for("react.strict_mode"),
  jf = Symbol.for("react.profiler"),
  Pf = Symbol.for("react.provider"),
  Rf = Symbol.for("react.context"),
  Lf = Symbol.for("react.forward_ref"),
  zf = Symbol.for("react.suspense"),
  Tf = Symbol.for("react.memo"),
  Of = Symbol.for("react.lazy"),
  ku = Symbol.iterator;
function Mf(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ku && e[ku]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Wa = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Va = Object.assign,
  Qa = {};
function gn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Qa),
    (this.updater = n || Wa);
}
gn.prototype.isReactComponent = {};
gn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
gn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ka() {}
Ka.prototype = gn.prototype;
function yo(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Qa),
    (this.updater = n || Wa);
}
var go = (yo.prototype = new Ka());
go.constructor = yo;
Va(go, gn.prototype);
go.isPureReactComponent = !0;
var Su = Array.isArray,
  Ya = Object.prototype.hasOwnProperty,
  xo = { current: null },
  Ga = { key: !0, ref: !0, __self: !0, __source: !0 };
function Xa(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      Ya.call(t, r) && !Ga.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var a = Array(u), s = 0; s < u; s++) a[s] = arguments[s + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
  return {
    $$typeof: fr,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: xo.current,
  };
}
function If(e, t) {
  return {
    $$typeof: fr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function wo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === fr;
}
function Ff(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Eu = /\/+/g;
function Gl(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Ff("" + e.key)
    : t.toString(36);
}
function Ur(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (i) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case fr:
          case Cf:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (l = l(o)),
      (e = r === "" ? "." + Gl(o, 0) : r),
      Su(l)
        ? ((n = ""),
          e != null && (n = e.replace(Eu, "$&/") + "/"),
          Ur(l, t, n, "", function (s) {
            return s;
          }))
        : l != null &&
          (wo(l) &&
            (l = If(
              l,
              n +
                (!l.key || (o && o.key === l.key)
                  ? ""
                  : ("" + l.key).replace(Eu, "$&/") + "/") +
                e,
            )),
          t.push(l)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Su(e)))
    for (var u = 0; u < e.length; u++) {
      i = e[u];
      var a = r + Gl(i, u);
      o += Ur(i, t, n, a, l);
    }
  else if (((a = Mf(e)), typeof a == "function"))
    for (e = a.call(e), u = 0; !(i = e.next()).done; )
      (i = i.value), (a = r + Gl(i, u++)), (o += Ur(i, t, n, a, l));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      ))
    );
  return o;
}
function kr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Ur(e, r, "", "", function (i) {
      return t.call(n, i, l++);
    }),
    r
  );
}
function $f(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ce = { current: null },
  Ar = { transition: null },
  Df = {
    ReactCurrentDispatcher: ce,
    ReactCurrentBatchConfig: Ar,
    ReactCurrentOwner: xo,
  };
function Za() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = {
  map: kr,
  forEach: function (e, t, n) {
    kr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      kr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      kr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!wo(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
O.Component = gn;
O.Fragment = Nf;
O.Profiler = jf;
O.PureComponent = yo;
O.StrictMode = _f;
O.Suspense = zf;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Df;
O.act = Za;
O.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = Va({}, e.props),
    l = e.key,
    i = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (o = xo.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (a in t)
      Ya.call(t, a) &&
        !Ga.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    u = Array(a);
    for (var s = 0; s < a; s++) u[s] = arguments[s + 2];
    r.children = u;
  }
  return { $$typeof: fr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
O.createContext = function (e) {
  return (
    (e = {
      $$typeof: Rf,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Pf, _context: e }),
    (e.Consumer = e)
  );
};
O.createElement = Xa;
O.createFactory = function (e) {
  var t = Xa.bind(null, e);
  return (t.type = e), t;
};
O.createRef = function () {
  return { current: null };
};
O.forwardRef = function (e) {
  return { $$typeof: Lf, render: e };
};
O.isValidElement = wo;
O.lazy = function (e) {
  return { $$typeof: Of, _payload: { _status: -1, _result: e }, _init: $f };
};
O.memo = function (e, t) {
  return { $$typeof: Tf, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function (e) {
  var t = Ar.transition;
  Ar.transition = {};
  try {
    e();
  } finally {
    Ar.transition = t;
  }
};
O.unstable_act = Za;
O.useCallback = function (e, t) {
  return ce.current.useCallback(e, t);
};
O.useContext = function (e) {
  return ce.current.useContext(e);
};
O.useDebugValue = function () {};
O.useDeferredValue = function (e) {
  return ce.current.useDeferredValue(e);
};
O.useEffect = function (e, t) {
  return ce.current.useEffect(e, t);
};
O.useId = function () {
  return ce.current.useId();
};
O.useImperativeHandle = function (e, t, n) {
  return ce.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function (e, t) {
  return ce.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function (e, t) {
  return ce.current.useLayoutEffect(e, t);
};
O.useMemo = function (e, t) {
  return ce.current.useMemo(e, t);
};
O.useReducer = function (e, t, n) {
  return ce.current.useReducer(e, t, n);
};
O.useRef = function (e) {
  return ce.current.useRef(e);
};
O.useState = function (e) {
  return ce.current.useState(e);
};
O.useSyncExternalStore = function (e, t, n) {
  return ce.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function () {
  return ce.current.useTransition();
};
O.version = "18.3.1";
Ha.exports = O;
var y = Ha.exports;
const Ot = Ef(y);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uf = y,
  Af = Symbol.for("react.element"),
  Bf = Symbol.for("react.fragment"),
  Hf = Object.prototype.hasOwnProperty,
  Wf = Uf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Vf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ja(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) Hf.call(t, r) && !Vf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Af,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: Wf.current,
  };
}
_l.Fragment = Bf;
_l.jsx = Ja;
_l.jsxs = Ja;
Ba.exports = _l;
var p = Ba.exports,
  qa = { exports: {} },
  Ee = {},
  ba = { exports: {} },
  es = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(_, z) {
    var T = _.length;
    _.push(z);
    e: for (; 0 < T; ) {
      var K = (T - 1) >>> 1,
        J = _[K];
      if (0 < l(J, z)) (_[K] = z), (_[T] = J), (T = K);
      else break e;
    }
  }
  function n(_) {
    return _.length === 0 ? null : _[0];
  }
  function r(_) {
    if (_.length === 0) return null;
    var z = _[0],
      T = _.pop();
    if (T !== z) {
      _[0] = T;
      e: for (var K = 0, J = _.length, xr = J >>> 1; K < xr; ) {
        var _t = 2 * (K + 1) - 1,
          Yl = _[_t],
          jt = _t + 1,
          wr = _[jt];
        if (0 > l(Yl, T))
          jt < J && 0 > l(wr, Yl)
            ? ((_[K] = wr), (_[jt] = T), (K = jt))
            : ((_[K] = Yl), (_[_t] = T), (K = _t));
        else if (jt < J && 0 > l(wr, T)) (_[K] = wr), (_[jt] = T), (K = jt);
        else break e;
      }
    }
    return z;
  }
  function l(_, z) {
    var T = _.sortIndex - z.sortIndex;
    return T !== 0 ? T : _.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      u = o.now();
    e.unstable_now = function () {
      return o.now() - u;
    };
  }
  var a = [],
    s = [],
    m = 1,
    h = null,
    v = 3,
    g = !1,
    x = !1,
    k = !1,
    C = typeof setTimeout == "function" ? setTimeout : null,
    f = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(_) {
    for (var z = n(s); z !== null; ) {
      if (z.callback === null) r(s);
      else if (z.startTime <= _)
        r(s), (z.sortIndex = z.expirationTime), t(a, z);
      else break;
      z = n(s);
    }
  }
  function w(_) {
    if (((k = !1), d(_), !x))
      if (n(a) !== null) (x = !0), Ql(E);
      else {
        var z = n(s);
        z !== null && Kl(w, z.startTime - _);
      }
  }
  function E(_, z) {
    (x = !1), k && ((k = !1), f(R), (R = -1)), (g = !0);
    var T = v;
    try {
      for (
        d(z), h = n(a);
        h !== null && (!(h.expirationTime > z) || (_ && !de()));

      ) {
        var K = h.callback;
        if (typeof K == "function") {
          (h.callback = null), (v = h.priorityLevel);
          var J = K(h.expirationTime <= z);
          (z = e.unstable_now()),
            typeof J == "function" ? (h.callback = J) : h === n(a) && r(a),
            d(z);
        } else r(a);
        h = n(a);
      }
      if (h !== null) var xr = !0;
      else {
        var _t = n(s);
        _t !== null && Kl(w, _t.startTime - z), (xr = !1);
      }
      return xr;
    } finally {
      (h = null), (v = T), (g = !1);
    }
  }
  var P = !1,
    j = null,
    R = -1,
    M = 5,
    L = -1;
  function de() {
    return !(e.unstable_now() - L < M);
  }
  function En() {
    if (j !== null) {
      var _ = e.unstable_now();
      L = _;
      var z = !0;
      try {
        z = j(!0, _);
      } finally {
        z ? Cn() : ((P = !1), (j = null));
      }
    } else P = !1;
  }
  var Cn;
  if (typeof c == "function")
    Cn = function () {
      c(En);
    };
  else if (typeof MessageChannel < "u") {
    var wu = new MessageChannel(),
      Sf = wu.port2;
    (wu.port1.onmessage = En),
      (Cn = function () {
        Sf.postMessage(null);
      });
  } else
    Cn = function () {
      C(En, 0);
    };
  function Ql(_) {
    (j = _), P || ((P = !0), Cn());
  }
  function Kl(_, z) {
    R = C(function () {
      _(e.unstable_now());
    }, z);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (_) {
      _.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      x || g || ((x = !0), Ql(E));
    }),
    (e.unstable_forceFrameRate = function (_) {
      0 > _ || 125 < _
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (M = 0 < _ ? Math.floor(1e3 / _) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (_) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = v;
      }
      var T = v;
      v = z;
      try {
        return _();
      } finally {
        v = T;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (_, z) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var T = v;
      v = _;
      try {
        return z();
      } finally {
        v = T;
      }
    }),
    (e.unstable_scheduleCallback = function (_, z, T) {
      var K = e.unstable_now();
      switch (
        (typeof T == "object" && T !== null
          ? ((T = T.delay), (T = typeof T == "number" && 0 < T ? K + T : K))
          : (T = K),
        _)
      ) {
        case 1:
          var J = -1;
          break;
        case 2:
          J = 250;
          break;
        case 5:
          J = 1073741823;
          break;
        case 4:
          J = 1e4;
          break;
        default:
          J = 5e3;
      }
      return (
        (J = T + J),
        (_ = {
          id: m++,
          callback: z,
          priorityLevel: _,
          startTime: T,
          expirationTime: J,
          sortIndex: -1,
        }),
        T > K
          ? ((_.sortIndex = T),
            t(s, _),
            n(a) === null &&
              _ === n(s) &&
              (k ? (f(R), (R = -1)) : (k = !0), Kl(w, T - K)))
          : ((_.sortIndex = J), t(a, _), x || g || ((x = !0), Ql(E))),
        _
      );
    }),
    (e.unstable_shouldYield = de),
    (e.unstable_wrapCallback = function (_) {
      var z = v;
      return function () {
        var T = v;
        v = z;
        try {
          return _.apply(this, arguments);
        } finally {
          v = T;
        }
      };
    });
})(es);
ba.exports = es;
var Qf = ba.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kf = y,
  Se = Qf;
function S(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var ts = new Set(),
  Yn = {};
function Bt(e, t) {
  fn(e, t), fn(e + "Capture", t);
}
function fn(e, t) {
  for (Yn[e] = t, e = 0; e < t.length; e++) ts.add(t[e]);
}
var qe = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Si = Object.prototype.hasOwnProperty,
  Yf =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Cu = {},
  Nu = {};
function Gf(e) {
  return Si.call(Nu, e)
    ? !0
    : Si.call(Cu, e)
      ? !1
      : Yf.test(e)
        ? (Nu[e] = !0)
        : ((Cu[e] = !0), !1);
}
function Xf(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Zf(e, t, n, r) {
  if (t === null || typeof t > "u" || Xf(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function fe(e, t, n, r, l, i, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o);
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ne[e] = new fe(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ne[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ne[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ne[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ne[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ne[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ne[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ne[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ne[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ko = /[\-:]([a-z])/g;
function So(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ko, So);
    ne[t] = new fe(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ko, So);
    ne[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ko, So);
  ne[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ne[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new fe(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ne[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Eo(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Zf(t, n, l, r) && (n = null),
    r || l === null
      ? Gf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var rt = Kf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Sr = Symbol.for("react.element"),
  Kt = Symbol.for("react.portal"),
  Yt = Symbol.for("react.fragment"),
  Co = Symbol.for("react.strict_mode"),
  Ei = Symbol.for("react.profiler"),
  ns = Symbol.for("react.provider"),
  rs = Symbol.for("react.context"),
  No = Symbol.for("react.forward_ref"),
  Ci = Symbol.for("react.suspense"),
  Ni = Symbol.for("react.suspense_list"),
  _o = Symbol.for("react.memo"),
  ot = Symbol.for("react.lazy"),
  ls = Symbol.for("react.offscreen"),
  _u = Symbol.iterator;
function Nn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (_u && e[_u]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var V = Object.assign,
  Xl;
function Mn(e) {
  if (Xl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Xl = (t && t[1]) || "";
    }
  return (
    `
` +
    Xl +
    e
  );
}
var Zl = !1;
function Jl(e, t) {
  if (!e || Zl) return "";
  Zl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (s) {
          var r = s;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (s) {
          r = s;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (
        var l = s.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          u = i.length - 1;
        1 <= o && 0 <= u && l[o] !== i[u];

      )
        u--;
      for (; 1 <= o && 0 <= u; o--, u--)
        if (l[o] !== i[u]) {
          if (o !== 1 || u !== 1)
            do
              if ((o--, u--, 0 > u || l[o] !== i[u])) {
                var a =
                  `
` + l[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= o && 0 <= u);
          break;
        }
    }
  } finally {
    (Zl = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Mn(e) : "";
}
function Jf(e) {
  switch (e.tag) {
    case 5:
      return Mn(e.type);
    case 16:
      return Mn("Lazy");
    case 13:
      return Mn("Suspense");
    case 19:
      return Mn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Jl(e.type, !1)), e;
    case 11:
      return (e = Jl(e.type.render, !1)), e;
    case 1:
      return (e = Jl(e.type, !0)), e;
    default:
      return "";
  }
}
function _i(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Yt:
      return "Fragment";
    case Kt:
      return "Portal";
    case Ei:
      return "Profiler";
    case Co:
      return "StrictMode";
    case Ci:
      return "Suspense";
    case Ni:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case rs:
        return (e.displayName || "Context") + ".Consumer";
      case ns:
        return (e._context.displayName || "Context") + ".Provider";
      case No:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case _o:
        return (
          (t = e.displayName || null), t !== null ? t : _i(e.type) || "Memo"
        );
      case ot:
        (t = e._payload), (e = e._init);
        try {
          return _i(e(t));
        } catch {}
    }
  return null;
}
function qf(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return _i(t);
    case 8:
      return t === Co ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function wt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function is(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function bf(e) {
  var t = is(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          (r = "" + o), i.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Er(e) {
  e._valueTracker || (e._valueTracker = bf(e));
}
function os(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = is(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function br(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ji(e, t) {
  var n = t.checked;
  return V({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function ju(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = wt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function us(e, t) {
  (t = t.checked), t != null && Eo(e, "checked", t, !1);
}
function Pi(e, t) {
  us(e, t);
  var n = wt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Ri(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ri(e, t.type, wt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Pu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Ri(e, t, n) {
  (t !== "number" || br(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var In = Array.isArray;
function ln(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + wt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Li(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
  return V({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ru(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(S(92));
      if (In(n)) {
        if (1 < n.length) throw Error(S(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: wt(n) };
}
function as(e, t) {
  var n = wt(t.value),
    r = wt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Lu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ss(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function zi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? ss(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Cr,
  cs = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Cr = Cr || document.createElement("div"),
          Cr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Cr.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Gn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Dn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  ed = ["Webkit", "ms", "Moz", "O"];
Object.keys(Dn).forEach(function (e) {
  ed.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Dn[t] = Dn[e]);
  });
});
function fs(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Dn.hasOwnProperty(e) && Dn[e])
      ? ("" + t).trim()
      : t + "px";
}
function ds(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = fs(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var td = V(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Ti(e, t) {
  if (t) {
    if (td[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(S(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(S(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(S(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(S(62));
  }
}
function Oi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Mi = null;
function jo(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Ii = null,
  on = null,
  un = null;
function zu(e) {
  if ((e = mr(e))) {
    if (typeof Ii != "function") throw Error(S(280));
    var t = e.stateNode;
    t && ((t = zl(t)), Ii(e.stateNode, e.type, t));
  }
}
function ps(e) {
  on ? (un ? un.push(e) : (un = [e])) : (on = e);
}
function ms() {
  if (on) {
    var e = on,
      t = un;
    if (((un = on = null), zu(e), t)) for (e = 0; e < t.length; e++) zu(t[e]);
  }
}
function hs(e, t) {
  return e(t);
}
function vs() {}
var ql = !1;
function ys(e, t, n) {
  if (ql) return e(t, n);
  ql = !0;
  try {
    return hs(e, t, n);
  } finally {
    (ql = !1), (on !== null || un !== null) && (vs(), ms());
  }
}
function Xn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = zl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(S(231, t, typeof n));
  return n;
}
var Fi = !1;
if (qe)
  try {
    var _n = {};
    Object.defineProperty(_n, "passive", {
      get: function () {
        Fi = !0;
      },
    }),
      window.addEventListener("test", _n, _n),
      window.removeEventListener("test", _n, _n);
  } catch {
    Fi = !1;
  }
function nd(e, t, n, r, l, i, o, u, a) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (m) {
    this.onError(m);
  }
}
var Un = !1,
  el = null,
  tl = !1,
  $i = null,
  rd = {
    onError: function (e) {
      (Un = !0), (el = e);
    },
  };
function ld(e, t, n, r, l, i, o, u, a) {
  (Un = !1), (el = null), nd.apply(rd, arguments);
}
function id(e, t, n, r, l, i, o, u, a) {
  if ((ld.apply(this, arguments), Un)) {
    if (Un) {
      var s = el;
      (Un = !1), (el = null);
    } else throw Error(S(198));
    tl || ((tl = !0), ($i = s));
  }
}
function Ht(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function gs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Tu(e) {
  if (Ht(e) !== e) throw Error(S(188));
}
function od(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Ht(e)), t === null)) throw Error(S(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return Tu(l), e;
        if (i === r) return Tu(l), t;
        i = i.sibling;
      }
      throw Error(S(188));
    }
    if (n.return !== r.return) (n = l), (r = i);
    else {
      for (var o = !1, u = l.child; u; ) {
        if (u === n) {
          (o = !0), (n = l), (r = i);
          break;
        }
        if (u === r) {
          (o = !0), (r = l), (n = i);
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = i.child; u; ) {
          if (u === n) {
            (o = !0), (n = i), (r = l);
            break;
          }
          if (u === r) {
            (o = !0), (r = i), (n = l);
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(S(189));
      }
    }
    if (n.alternate !== r) throw Error(S(190));
  }
  if (n.tag !== 3) throw Error(S(188));
  return n.stateNode.current === n ? e : t;
}
function xs(e) {
  return (e = od(e)), e !== null ? ws(e) : null;
}
function ws(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ws(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ks = Se.unstable_scheduleCallback,
  Ou = Se.unstable_cancelCallback,
  ud = Se.unstable_shouldYield,
  ad = Se.unstable_requestPaint,
  Y = Se.unstable_now,
  sd = Se.unstable_getCurrentPriorityLevel,
  Po = Se.unstable_ImmediatePriority,
  Ss = Se.unstable_UserBlockingPriority,
  nl = Se.unstable_NormalPriority,
  cd = Se.unstable_LowPriority,
  Es = Se.unstable_IdlePriority,
  jl = null,
  He = null;
function fd(e) {
  if (He && typeof He.onCommitFiberRoot == "function")
    try {
      He.onCommitFiberRoot(jl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Fe = Math.clz32 ? Math.clz32 : md,
  dd = Math.log,
  pd = Math.LN2;
function md(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((dd(e) / pd) | 0)) | 0;
}
var Nr = 64,
  _r = 4194304;
function Fn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function rl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var u = o & ~l;
    u !== 0 ? (r = Fn(u)) : ((i &= o), i !== 0 && (r = Fn(i)));
  } else (o = n & ~l), o !== 0 ? (r = Fn(o)) : i !== 0 && (r = Fn(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Fe(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function hd(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function vd(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var o = 31 - Fe(i),
      u = 1 << o,
      a = l[o];
    a === -1
      ? (!(u & n) || u & r) && (l[o] = hd(u, t))
      : a <= t && (e.expiredLanes |= u),
      (i &= ~u);
  }
}
function Di(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Cs() {
  var e = Nr;
  return (Nr <<= 1), !(Nr & 4194240) && (Nr = 64), e;
}
function bl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function dr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Fe(t)),
    (e[t] = n);
}
function yd(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Fe(n),
      i = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i);
  }
}
function Ro(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var F = 0;
function Ns(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var _s,
  Lo,
  js,
  Ps,
  Rs,
  Ui = !1,
  jr = [],
  dt = null,
  pt = null,
  mt = null,
  Zn = new Map(),
  Jn = new Map(),
  at = [],
  gd =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Mu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      dt = null;
      break;
    case "dragenter":
    case "dragleave":
      pt = null;
      break;
    case "mouseover":
    case "mouseout":
      mt = null;
      break;
    case "pointerover":
    case "pointerout":
      Zn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Jn.delete(t.pointerId);
  }
}
function jn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = mr(t)), t !== null && Lo(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function xd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (dt = jn(dt, e, t, n, r, l)), !0;
    case "dragenter":
      return (pt = jn(pt, e, t, n, r, l)), !0;
    case "mouseover":
      return (mt = jn(mt, e, t, n, r, l)), !0;
    case "pointerover":
      var i = l.pointerId;
      return Zn.set(i, jn(Zn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (i = l.pointerId), Jn.set(i, jn(Jn.get(i) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function Ls(e) {
  var t = Lt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = gs(n)), t !== null)) {
          (e.blockedOn = t),
            Rs(e.priority, function () {
              js(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Br(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ai(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Mi = r), n.target.dispatchEvent(r), (Mi = null);
    } else return (t = mr(n)), t !== null && Lo(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Iu(e, t, n) {
  Br(e) && n.delete(t);
}
function wd() {
  (Ui = !1),
    dt !== null && Br(dt) && (dt = null),
    pt !== null && Br(pt) && (pt = null),
    mt !== null && Br(mt) && (mt = null),
    Zn.forEach(Iu),
    Jn.forEach(Iu);
}
function Pn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ui ||
      ((Ui = !0),
      Se.unstable_scheduleCallback(Se.unstable_NormalPriority, wd)));
}
function qn(e) {
  function t(l) {
    return Pn(l, e);
  }
  if (0 < jr.length) {
    Pn(jr[0], e);
    for (var n = 1; n < jr.length; n++) {
      var r = jr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    dt !== null && Pn(dt, e),
      pt !== null && Pn(pt, e),
      mt !== null && Pn(mt, e),
      Zn.forEach(t),
      Jn.forEach(t),
      n = 0;
    n < at.length;
    n++
  )
    (r = at[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < at.length && ((n = at[0]), n.blockedOn === null); )
    Ls(n), n.blockedOn === null && at.shift();
}
var an = rt.ReactCurrentBatchConfig,
  ll = !0;
function kd(e, t, n, r) {
  var l = F,
    i = an.transition;
  an.transition = null;
  try {
    (F = 1), zo(e, t, n, r);
  } finally {
    (F = l), (an.transition = i);
  }
}
function Sd(e, t, n, r) {
  var l = F,
    i = an.transition;
  an.transition = null;
  try {
    (F = 4), zo(e, t, n, r);
  } finally {
    (F = l), (an.transition = i);
  }
}
function zo(e, t, n, r) {
  if (ll) {
    var l = Ai(e, t, n, r);
    if (l === null) si(e, t, r, il, n), Mu(e, r);
    else if (xd(l, e, t, n, r)) r.stopPropagation();
    else if ((Mu(e, r), t & 4 && -1 < gd.indexOf(e))) {
      for (; l !== null; ) {
        var i = mr(l);
        if (
          (i !== null && _s(i),
          (i = Ai(e, t, n, r)),
          i === null && si(e, t, r, il, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else si(e, t, r, null, n);
  }
}
var il = null;
function Ai(e, t, n, r) {
  if (((il = null), (e = jo(r)), (e = Lt(e)), e !== null))
    if (((t = Ht(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = gs(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (il = e), null;
}
function zs(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (sd()) {
        case Po:
          return 1;
        case Ss:
          return 4;
        case nl:
        case cd:
          return 16;
        case Es:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ct = null,
  To = null,
  Hr = null;
function Ts() {
  if (Hr) return Hr;
  var e,
    t = To,
    n = t.length,
    r,
    l = "value" in ct ? ct.value : ct.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (Hr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Wr(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Pr() {
  return !0;
}
function Fu() {
  return !1;
}
function Ce(e) {
  function t(n, r, l, i, o) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null);
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(i) : i[u]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Pr
        : Fu),
      (this.isPropagationStopped = Fu),
      this
    );
  }
  return (
    V(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Pr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Pr));
      },
      persist: function () {},
      isPersistent: Pr,
    }),
    t
  );
}
var xn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Oo = Ce(xn),
  pr = V({}, xn, { view: 0, detail: 0 }),
  Ed = Ce(pr),
  ei,
  ti,
  Rn,
  Pl = V({}, pr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Mo,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Rn &&
            (Rn && e.type === "mousemove"
              ? ((ei = e.screenX - Rn.screenX), (ti = e.screenY - Rn.screenY))
              : (ti = ei = 0),
            (Rn = e)),
          ei);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ti;
    },
  }),
  $u = Ce(Pl),
  Cd = V({}, Pl, { dataTransfer: 0 }),
  Nd = Ce(Cd),
  _d = V({}, pr, { relatedTarget: 0 }),
  ni = Ce(_d),
  jd = V({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Pd = Ce(jd),
  Rd = V({}, xn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Ld = Ce(Rd),
  zd = V({}, xn, { data: 0 }),
  Du = Ce(zd),
  Td = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Od = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Md = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Id(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Md[e]) ? !!t[e] : !1;
}
function Mo() {
  return Id;
}
var Fd = V({}, pr, {
    key: function (e) {
      if (e.key) {
        var t = Td[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Wr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Od[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Mo,
    charCode: function (e) {
      return e.type === "keypress" ? Wr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Wr(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  $d = Ce(Fd),
  Dd = V({}, Pl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Uu = Ce(Dd),
  Ud = V({}, pr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Mo,
  }),
  Ad = Ce(Ud),
  Bd = V({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Hd = Ce(Bd),
  Wd = V({}, Pl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Vd = Ce(Wd),
  Qd = [9, 13, 27, 32],
  Io = qe && "CompositionEvent" in window,
  An = null;
qe && "documentMode" in document && (An = document.documentMode);
var Kd = qe && "TextEvent" in window && !An,
  Os = qe && (!Io || (An && 8 < An && 11 >= An)),
  Au = " ",
  Bu = !1;
function Ms(e, t) {
  switch (e) {
    case "keyup":
      return Qd.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Is(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Gt = !1;
function Yd(e, t) {
  switch (e) {
    case "compositionend":
      return Is(t);
    case "keypress":
      return t.which !== 32 ? null : ((Bu = !0), Au);
    case "textInput":
      return (e = t.data), e === Au && Bu ? null : e;
    default:
      return null;
  }
}
function Gd(e, t) {
  if (Gt)
    return e === "compositionend" || (!Io && Ms(e, t))
      ? ((e = Ts()), (Hr = To = ct = null), (Gt = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Os && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Xd = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Hu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Xd[e.type] : t === "textarea";
}
function Fs(e, t, n, r) {
  ps(r),
    (t = ol(t, "onChange")),
    0 < t.length &&
      ((n = new Oo("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Bn = null,
  bn = null;
function Zd(e) {
  Ys(e, 0);
}
function Rl(e) {
  var t = Jt(e);
  if (os(t)) return e;
}
function Jd(e, t) {
  if (e === "change") return t;
}
var $s = !1;
if (qe) {
  var ri;
  if (qe) {
    var li = "oninput" in document;
    if (!li) {
      var Wu = document.createElement("div");
      Wu.setAttribute("oninput", "return;"),
        (li = typeof Wu.oninput == "function");
    }
    ri = li;
  } else ri = !1;
  $s = ri && (!document.documentMode || 9 < document.documentMode);
}
function Vu() {
  Bn && (Bn.detachEvent("onpropertychange", Ds), (bn = Bn = null));
}
function Ds(e) {
  if (e.propertyName === "value" && Rl(bn)) {
    var t = [];
    Fs(t, bn, e, jo(e)), ys(Zd, t);
  }
}
function qd(e, t, n) {
  e === "focusin"
    ? (Vu(), (Bn = t), (bn = n), Bn.attachEvent("onpropertychange", Ds))
    : e === "focusout" && Vu();
}
function bd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Rl(bn);
}
function ep(e, t) {
  if (e === "click") return Rl(t);
}
function tp(e, t) {
  if (e === "input" || e === "change") return Rl(t);
}
function np(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var De = typeof Object.is == "function" ? Object.is : np;
function er(e, t) {
  if (De(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Si.call(t, l) || !De(e[l], t[l])) return !1;
  }
  return !0;
}
function Qu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ku(e, t) {
  var n = Qu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Qu(n);
  }
}
function Us(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Us(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function As() {
  for (var e = window, t = br(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = br(e.document);
  }
  return t;
}
function Fo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function rp(e) {
  var t = As(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Us(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Fo(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        (r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Ku(n, i));
        var o = Ku(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var lp = qe && "documentMode" in document && 11 >= document.documentMode,
  Xt = null,
  Bi = null,
  Hn = null,
  Hi = !1;
function Yu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Hi ||
    Xt == null ||
    Xt !== br(r) ||
    ((r = Xt),
    "selectionStart" in r && Fo(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Hn && er(Hn, r)) ||
      ((Hn = r),
      (r = ol(Bi, "onSelect")),
      0 < r.length &&
        ((t = new Oo("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Xt))));
}
function Rr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Zt = {
    animationend: Rr("Animation", "AnimationEnd"),
    animationiteration: Rr("Animation", "AnimationIteration"),
    animationstart: Rr("Animation", "AnimationStart"),
    transitionend: Rr("Transition", "TransitionEnd"),
  },
  ii = {},
  Bs = {};
qe &&
  ((Bs = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Zt.animationend.animation,
    delete Zt.animationiteration.animation,
    delete Zt.animationstart.animation),
  "TransitionEvent" in window || delete Zt.transitionend.transition);
function Ll(e) {
  if (ii[e]) return ii[e];
  if (!Zt[e]) return e;
  var t = Zt[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Bs) return (ii[e] = t[n]);
  return e;
}
var Hs = Ll("animationend"),
  Ws = Ll("animationiteration"),
  Vs = Ll("animationstart"),
  Qs = Ll("transitionend"),
  Ks = new Map(),
  Gu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Et(e, t) {
  Ks.set(e, t), Bt(t, [e]);
}
for (var oi = 0; oi < Gu.length; oi++) {
  var ui = Gu[oi],
    ip = ui.toLowerCase(),
    op = ui[0].toUpperCase() + ui.slice(1);
  Et(ip, "on" + op);
}
Et(Hs, "onAnimationEnd");
Et(Ws, "onAnimationIteration");
Et(Vs, "onAnimationStart");
Et("dblclick", "onDoubleClick");
Et("focusin", "onFocus");
Et("focusout", "onBlur");
Et(Qs, "onTransitionEnd");
fn("onMouseEnter", ["mouseout", "mouseover"]);
fn("onMouseLeave", ["mouseout", "mouseover"]);
fn("onPointerEnter", ["pointerout", "pointerover"]);
fn("onPointerLeave", ["pointerout", "pointerover"]);
Bt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Bt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Bt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Bt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Bt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var $n =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  up = new Set("cancel close invalid load scroll toggle".split(" ").concat($n));
function Xu(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), id(r, t, void 0, e), (e.currentTarget = null);
}
function Ys(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var u = r[o],
            a = u.instance,
            s = u.currentTarget;
          if (((u = u.listener), a !== i && l.isPropagationStopped())) break e;
          Xu(l, u, s), (i = a);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((u = r[o]),
            (a = u.instance),
            (s = u.currentTarget),
            (u = u.listener),
            a !== i && l.isPropagationStopped())
          )
            break e;
          Xu(l, u, s), (i = a);
        }
    }
  }
  if (tl) throw ((e = $i), (tl = !1), ($i = null), e);
}
function D(e, t) {
  var n = t[Yi];
  n === void 0 && (n = t[Yi] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Gs(t, e, 2, !1), n.add(r));
}
function ai(e, t, n) {
  var r = 0;
  t && (r |= 4), Gs(n, e, r, t);
}
var Lr = "_reactListening" + Math.random().toString(36).slice(2);
function tr(e) {
  if (!e[Lr]) {
    (e[Lr] = !0),
      ts.forEach(function (n) {
        n !== "selectionchange" && (up.has(n) || ai(n, !1, e), ai(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Lr] || ((t[Lr] = !0), ai("selectionchange", !1, t));
  }
}
function Gs(e, t, n, r) {
  switch (zs(t)) {
    case 1:
      var l = kd;
      break;
    case 4:
      l = Sd;
      break;
    default:
      l = zo;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !Fi ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1);
}
function si(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var a = o.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = o.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            o = o.return;
          }
        for (; u !== null; ) {
          if (((o = Lt(u)), o === null)) return;
          if (((a = o.tag), a === 5 || a === 6)) {
            r = i = o;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  ys(function () {
    var s = i,
      m = jo(n),
      h = [];
    e: {
      var v = Ks.get(e);
      if (v !== void 0) {
        var g = Oo,
          x = e;
        switch (e) {
          case "keypress":
            if (Wr(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = $d;
            break;
          case "focusin":
            (x = "focus"), (g = ni);
            break;
          case "focusout":
            (x = "blur"), (g = ni);
            break;
          case "beforeblur":
          case "afterblur":
            g = ni;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = $u;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Nd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Ad;
            break;
          case Hs:
          case Ws:
          case Vs:
            g = Pd;
            break;
          case Qs:
            g = Hd;
            break;
          case "scroll":
            g = Ed;
            break;
          case "wheel":
            g = Vd;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Ld;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Uu;
        }
        var k = (t & 4) !== 0,
          C = !k && e === "scroll",
          f = k ? (v !== null ? v + "Capture" : null) : v;
        k = [];
        for (var c = s, d; c !== null; ) {
          d = c;
          var w = d.stateNode;
          if (
            (d.tag === 5 &&
              w !== null &&
              ((d = w),
              f !== null && ((w = Xn(c, f)), w != null && k.push(nr(c, w, d)))),
            C)
          )
            break;
          c = c.return;
        }
        0 < k.length &&
          ((v = new g(v, x, null, n, m)), h.push({ event: v, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          v &&
            n !== Mi &&
            (x = n.relatedTarget || n.fromElement) &&
            (Lt(x) || x[be]))
        )
          break e;
        if (
          (g || v) &&
          ((v =
            m.window === m
              ? m
              : (v = m.ownerDocument)
                ? v.defaultView || v.parentWindow
                : window),
          g
            ? ((x = n.relatedTarget || n.toElement),
              (g = s),
              (x = x ? Lt(x) : null),
              x !== null &&
                ((C = Ht(x)), x !== C || (x.tag !== 5 && x.tag !== 6)) &&
                (x = null))
            : ((g = null), (x = s)),
          g !== x)
        ) {
          if (
            ((k = $u),
            (w = "onMouseLeave"),
            (f = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((k = Uu),
              (w = "onPointerLeave"),
              (f = "onPointerEnter"),
              (c = "pointer")),
            (C = g == null ? v : Jt(g)),
            (d = x == null ? v : Jt(x)),
            (v = new k(w, c + "leave", g, n, m)),
            (v.target = C),
            (v.relatedTarget = d),
            (w = null),
            Lt(m) === s &&
              ((k = new k(f, c + "enter", x, n, m)),
              (k.target = d),
              (k.relatedTarget = C),
              (w = k)),
            (C = w),
            g && x)
          )
            t: {
              for (k = g, f = x, c = 0, d = k; d; d = Vt(d)) c++;
              for (d = 0, w = f; w; w = Vt(w)) d++;
              for (; 0 < c - d; ) (k = Vt(k)), c--;
              for (; 0 < d - c; ) (f = Vt(f)), d--;
              for (; c--; ) {
                if (k === f || (f !== null && k === f.alternate)) break t;
                (k = Vt(k)), (f = Vt(f));
              }
              k = null;
            }
          else k = null;
          g !== null && Zu(h, v, g, k, !1),
            x !== null && C !== null && Zu(h, C, x, k, !0);
        }
      }
      e: {
        if (
          ((v = s ? Jt(s) : window),
          (g = v.nodeName && v.nodeName.toLowerCase()),
          g === "select" || (g === "input" && v.type === "file"))
        )
          var E = Jd;
        else if (Hu(v))
          if ($s) E = tp;
          else {
            E = bd;
            var P = qd;
          }
        else
          (g = v.nodeName) &&
            g.toLowerCase() === "input" &&
            (v.type === "checkbox" || v.type === "radio") &&
            (E = ep);
        if (E && (E = E(e, s))) {
          Fs(h, E, n, m);
          break e;
        }
        P && P(e, v, s),
          e === "focusout" &&
            (P = v._wrapperState) &&
            P.controlled &&
            v.type === "number" &&
            Ri(v, "number", v.value);
      }
      switch (((P = s ? Jt(s) : window), e)) {
        case "focusin":
          (Hu(P) || P.contentEditable === "true") &&
            ((Xt = P), (Bi = s), (Hn = null));
          break;
        case "focusout":
          Hn = Bi = Xt = null;
          break;
        case "mousedown":
          Hi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Hi = !1), Yu(h, n, m);
          break;
        case "selectionchange":
          if (lp) break;
        case "keydown":
        case "keyup":
          Yu(h, n, m);
      }
      var j;
      if (Io)
        e: {
          switch (e) {
            case "compositionstart":
              var R = "onCompositionStart";
              break e;
            case "compositionend":
              R = "onCompositionEnd";
              break e;
            case "compositionupdate":
              R = "onCompositionUpdate";
              break e;
          }
          R = void 0;
        }
      else
        Gt
          ? Ms(e, n) && (R = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (R = "onCompositionStart");
      R &&
        (Os &&
          n.locale !== "ko" &&
          (Gt || R !== "onCompositionStart"
            ? R === "onCompositionEnd" && Gt && (j = Ts())
            : ((ct = m),
              (To = "value" in ct ? ct.value : ct.textContent),
              (Gt = !0))),
        (P = ol(s, R)),
        0 < P.length &&
          ((R = new Du(R, e, null, n, m)),
          h.push({ event: R, listeners: P }),
          j ? (R.data = j) : ((j = Is(n)), j !== null && (R.data = j)))),
        (j = Kd ? Yd(e, n) : Gd(e, n)) &&
          ((s = ol(s, "onBeforeInput")),
          0 < s.length &&
            ((m = new Du("onBeforeInput", "beforeinput", null, n, m)),
            h.push({ event: m, listeners: s }),
            (m.data = j)));
    }
    Ys(h, t);
  });
}
function nr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ol(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = Xn(e, n)),
      i != null && r.unshift(nr(e, i, l)),
      (i = Xn(e, t)),
      i != null && r.push(nr(e, i, l))),
      (e = e.return);
  }
  return r;
}
function Vt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Zu(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var u = n,
      a = u.alternate,
      s = u.stateNode;
    if (a !== null && a === r) break;
    u.tag === 5 &&
      s !== null &&
      ((u = s),
      l
        ? ((a = Xn(n, i)), a != null && o.unshift(nr(n, a, u)))
        : l || ((a = Xn(n, i)), a != null && o.push(nr(n, a, u)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var ap = /\r\n?/g,
  sp = /\u0000|\uFFFD/g;
function Ju(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      ap,
      `
`,
    )
    .replace(sp, "");
}
function zr(e, t, n) {
  if (((t = Ju(t)), Ju(e) !== t && n)) throw Error(S(425));
}
function ul() {}
var Wi = null,
  Vi = null;
function Qi(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ki = typeof setTimeout == "function" ? setTimeout : void 0,
  cp = typeof clearTimeout == "function" ? clearTimeout : void 0,
  qu = typeof Promise == "function" ? Promise : void 0,
  fp =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof qu < "u"
        ? function (e) {
            return qu.resolve(null).then(e).catch(dp);
          }
        : Ki;
function dp(e) {
  setTimeout(function () {
    throw e;
  });
}
function ci(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), qn(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  qn(t);
}
function ht(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function bu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var wn = Math.random().toString(36).slice(2),
  Be = "__reactFiber$" + wn,
  rr = "__reactProps$" + wn,
  be = "__reactContainer$" + wn,
  Yi = "__reactEvents$" + wn,
  pp = "__reactListeners$" + wn,
  mp = "__reactHandles$" + wn;
function Lt(e) {
  var t = e[Be];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[be] || n[Be])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = bu(e); e !== null; ) {
          if ((n = e[Be])) return n;
          e = bu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function mr(e) {
  return (
    (e = e[Be] || e[be]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Jt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(S(33));
}
function zl(e) {
  return e[rr] || null;
}
var Gi = [],
  qt = -1;
function Ct(e) {
  return { current: e };
}
function U(e) {
  0 > qt || ((e.current = Gi[qt]), (Gi[qt] = null), qt--);
}
function $(e, t) {
  qt++, (Gi[qt] = e.current), (e.current = t);
}
var kt = {},
  ue = Ct(kt),
  he = Ct(!1),
  Ft = kt;
function dn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return kt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ve(e) {
  return (e = e.childContextTypes), e != null;
}
function al() {
  U(he), U(ue);
}
function ea(e, t, n) {
  if (ue.current !== kt) throw Error(S(168));
  $(ue, t), $(he, n);
}
function Xs(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(S(108, qf(e) || "Unknown", l));
  return V({}, n, r);
}
function sl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || kt),
    (Ft = ue.current),
    $(ue, e),
    $(he, he.current),
    !0
  );
}
function ta(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(S(169));
  n
    ? ((e = Xs(e, t, Ft)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      U(he),
      U(ue),
      $(ue, e))
    : U(he),
    $(he, n);
}
var Ye = null,
  Tl = !1,
  fi = !1;
function Zs(e) {
  Ye === null ? (Ye = [e]) : Ye.push(e);
}
function hp(e) {
  (Tl = !0), Zs(e);
}
function Nt() {
  if (!fi && Ye !== null) {
    fi = !0;
    var e = 0,
      t = F;
    try {
      var n = Ye;
      for (F = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ye = null), (Tl = !1);
    } catch (l) {
      throw (Ye !== null && (Ye = Ye.slice(e + 1)), ks(Po, Nt), l);
    } finally {
      (F = t), (fi = !1);
    }
  }
  return null;
}
var bt = [],
  en = 0,
  cl = null,
  fl = 0,
  Ne = [],
  _e = 0,
  $t = null,
  Ge = 1,
  Xe = "";
function Pt(e, t) {
  (bt[en++] = fl), (bt[en++] = cl), (cl = e), (fl = t);
}
function Js(e, t, n) {
  (Ne[_e++] = Ge), (Ne[_e++] = Xe), (Ne[_e++] = $t), ($t = e);
  var r = Ge;
  e = Xe;
  var l = 32 - Fe(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var i = 32 - Fe(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    (i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (Ge = (1 << (32 - Fe(t) + l)) | (n << l) | r),
      (Xe = i + e);
  } else (Ge = (1 << i) | (n << l) | r), (Xe = e);
}
function $o(e) {
  e.return !== null && (Pt(e, 1), Js(e, 1, 0));
}
function Do(e) {
  for (; e === cl; )
    (cl = bt[--en]), (bt[en] = null), (fl = bt[--en]), (bt[en] = null);
  for (; e === $t; )
    ($t = Ne[--_e]),
      (Ne[_e] = null),
      (Xe = Ne[--_e]),
      (Ne[_e] = null),
      (Ge = Ne[--_e]),
      (Ne[_e] = null);
}
var ke = null,
  we = null,
  A = !1,
  Ie = null;
function qs(e, t) {
  var n = je(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function na(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ke = e), (we = ht(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ke = e), (we = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = $t !== null ? { id: Ge, overflow: Xe } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = je(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ke = e),
            (we = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Xi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Zi(e) {
  if (A) {
    var t = we;
    if (t) {
      var n = t;
      if (!na(e, t)) {
        if (Xi(e)) throw Error(S(418));
        t = ht(n.nextSibling);
        var r = ke;
        t && na(e, t)
          ? qs(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (A = !1), (ke = e));
      }
    } else {
      if (Xi(e)) throw Error(S(418));
      (e.flags = (e.flags & -4097) | 2), (A = !1), (ke = e);
    }
  }
}
function ra(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ke = e;
}
function Tr(e) {
  if (e !== ke) return !1;
  if (!A) return ra(e), (A = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Qi(e.type, e.memoizedProps))),
    t && (t = we))
  ) {
    if (Xi(e)) throw (bs(), Error(S(418)));
    for (; t; ) qs(e, t), (t = ht(t.nextSibling));
  }
  if ((ra(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = ht(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? ht(e.stateNode.nextSibling) : null;
  return !0;
}
function bs() {
  for (var e = we; e; ) e = ht(e.nextSibling);
}
function pn() {
  (we = ke = null), (A = !1);
}
function Uo(e) {
  Ie === null ? (Ie = [e]) : Ie.push(e);
}
var vp = rt.ReactCurrentBatchConfig;
function Ln(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(S(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(S(147, e));
      var l = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (o) {
            var u = l.refs;
            o === null ? delete u[i] : (u[i] = o);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(S(284));
    if (!n._owner) throw Error(S(290, e));
  }
  return e;
}
function Or(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      S(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    ))
  );
}
function la(e) {
  var t = e._init;
  return t(e._payload);
}
function ec(e) {
  function t(f, c) {
    if (e) {
      var d = f.deletions;
      d === null ? ((f.deletions = [c]), (f.flags |= 16)) : d.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) t(f, c), (c = c.sibling);
    return null;
  }
  function r(f, c) {
    for (f = new Map(); c !== null; )
      c.key !== null ? f.set(c.key, c) : f.set(c.index, c), (c = c.sibling);
    return f;
  }
  function l(f, c) {
    return (f = xt(f, c)), (f.index = 0), (f.sibling = null), f;
  }
  function i(f, c, d) {
    return (
      (f.index = d),
      e
        ? ((d = f.alternate),
          d !== null
            ? ((d = d.index), d < c ? ((f.flags |= 2), c) : d)
            : ((f.flags |= 2), c))
        : ((f.flags |= 1048576), c)
    );
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, c, d, w) {
    return c === null || c.tag !== 6
      ? ((c = gi(d, f.mode, w)), (c.return = f), c)
      : ((c = l(c, d)), (c.return = f), c);
  }
  function a(f, c, d, w) {
    var E = d.type;
    return E === Yt
      ? m(f, c, d.props.children, w, d.key)
      : c !== null &&
          (c.elementType === E ||
            (typeof E == "object" &&
              E !== null &&
              E.$$typeof === ot &&
              la(E) === c.type))
        ? ((w = l(c, d.props)), (w.ref = Ln(f, c, d)), (w.return = f), w)
        : ((w = Zr(d.type, d.key, d.props, null, f.mode, w)),
          (w.ref = Ln(f, c, d)),
          (w.return = f),
          w);
  }
  function s(f, c, d, w) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== d.containerInfo ||
      c.stateNode.implementation !== d.implementation
      ? ((c = xi(d, f.mode, w)), (c.return = f), c)
      : ((c = l(c, d.children || [])), (c.return = f), c);
  }
  function m(f, c, d, w, E) {
    return c === null || c.tag !== 7
      ? ((c = It(d, f.mode, w, E)), (c.return = f), c)
      : ((c = l(c, d)), (c.return = f), c);
  }
  function h(f, c, d) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = gi("" + c, f.mode, d)), (c.return = f), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case Sr:
          return (
            (d = Zr(c.type, c.key, c.props, null, f.mode, d)),
            (d.ref = Ln(f, null, c)),
            (d.return = f),
            d
          );
        case Kt:
          return (c = xi(c, f.mode, d)), (c.return = f), c;
        case ot:
          var w = c._init;
          return h(f, w(c._payload), d);
      }
      if (In(c) || Nn(c))
        return (c = It(c, f.mode, d, null)), (c.return = f), c;
      Or(f, c);
    }
    return null;
  }
  function v(f, c, d, w) {
    var E = c !== null ? c.key : null;
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return E !== null ? null : u(f, c, "" + d, w);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Sr:
          return d.key === E ? a(f, c, d, w) : null;
        case Kt:
          return d.key === E ? s(f, c, d, w) : null;
        case ot:
          return (E = d._init), v(f, c, E(d._payload), w);
      }
      if (In(d) || Nn(d)) return E !== null ? null : m(f, c, d, w, null);
      Or(f, d);
    }
    return null;
  }
  function g(f, c, d, w, E) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return (f = f.get(d) || null), u(c, f, "" + w, E);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Sr:
          return (f = f.get(w.key === null ? d : w.key) || null), a(c, f, w, E);
        case Kt:
          return (f = f.get(w.key === null ? d : w.key) || null), s(c, f, w, E);
        case ot:
          var P = w._init;
          return g(f, c, d, P(w._payload), E);
      }
      if (In(w) || Nn(w)) return (f = f.get(d) || null), m(c, f, w, E, null);
      Or(c, w);
    }
    return null;
  }
  function x(f, c, d, w) {
    for (
      var E = null, P = null, j = c, R = (c = 0), M = null;
      j !== null && R < d.length;
      R++
    ) {
      j.index > R ? ((M = j), (j = null)) : (M = j.sibling);
      var L = v(f, j, d[R], w);
      if (L === null) {
        j === null && (j = M);
        break;
      }
      e && j && L.alternate === null && t(f, j),
        (c = i(L, c, R)),
        P === null ? (E = L) : (P.sibling = L),
        (P = L),
        (j = M);
    }
    if (R === d.length) return n(f, j), A && Pt(f, R), E;
    if (j === null) {
      for (; R < d.length; R++)
        (j = h(f, d[R], w)),
          j !== null &&
            ((c = i(j, c, R)), P === null ? (E = j) : (P.sibling = j), (P = j));
      return A && Pt(f, R), E;
    }
    for (j = r(f, j); R < d.length; R++)
      (M = g(j, f, R, d[R], w)),
        M !== null &&
          (e && M.alternate !== null && j.delete(M.key === null ? R : M.key),
          (c = i(M, c, R)),
          P === null ? (E = M) : (P.sibling = M),
          (P = M));
    return (
      e &&
        j.forEach(function (de) {
          return t(f, de);
        }),
      A && Pt(f, R),
      E
    );
  }
  function k(f, c, d, w) {
    var E = Nn(d);
    if (typeof E != "function") throw Error(S(150));
    if (((d = E.call(d)), d == null)) throw Error(S(151));
    for (
      var P = (E = null), j = c, R = (c = 0), M = null, L = d.next();
      j !== null && !L.done;
      R++, L = d.next()
    ) {
      j.index > R ? ((M = j), (j = null)) : (M = j.sibling);
      var de = v(f, j, L.value, w);
      if (de === null) {
        j === null && (j = M);
        break;
      }
      e && j && de.alternate === null && t(f, j),
        (c = i(de, c, R)),
        P === null ? (E = de) : (P.sibling = de),
        (P = de),
        (j = M);
    }
    if (L.done) return n(f, j), A && Pt(f, R), E;
    if (j === null) {
      for (; !L.done; R++, L = d.next())
        (L = h(f, L.value, w)),
          L !== null &&
            ((c = i(L, c, R)), P === null ? (E = L) : (P.sibling = L), (P = L));
      return A && Pt(f, R), E;
    }
    for (j = r(f, j); !L.done; R++, L = d.next())
      (L = g(j, f, R, L.value, w)),
        L !== null &&
          (e && L.alternate !== null && j.delete(L.key === null ? R : L.key),
          (c = i(L, c, R)),
          P === null ? (E = L) : (P.sibling = L),
          (P = L));
    return (
      e &&
        j.forEach(function (En) {
          return t(f, En);
        }),
      A && Pt(f, R),
      E
    );
  }
  function C(f, c, d, w) {
    if (
      (typeof d == "object" &&
        d !== null &&
        d.type === Yt &&
        d.key === null &&
        (d = d.props.children),
      typeof d == "object" && d !== null)
    ) {
      switch (d.$$typeof) {
        case Sr:
          e: {
            for (var E = d.key, P = c; P !== null; ) {
              if (P.key === E) {
                if (((E = d.type), E === Yt)) {
                  if (P.tag === 7) {
                    n(f, P.sibling),
                      (c = l(P, d.props.children)),
                      (c.return = f),
                      (f = c);
                    break e;
                  }
                } else if (
                  P.elementType === E ||
                  (typeof E == "object" &&
                    E !== null &&
                    E.$$typeof === ot &&
                    la(E) === P.type)
                ) {
                  n(f, P.sibling),
                    (c = l(P, d.props)),
                    (c.ref = Ln(f, P, d)),
                    (c.return = f),
                    (f = c);
                  break e;
                }
                n(f, P);
                break;
              } else t(f, P);
              P = P.sibling;
            }
            d.type === Yt
              ? ((c = It(d.props.children, f.mode, w, d.key)),
                (c.return = f),
                (f = c))
              : ((w = Zr(d.type, d.key, d.props, null, f.mode, w)),
                (w.ref = Ln(f, c, d)),
                (w.return = f),
                (f = w));
          }
          return o(f);
        case Kt:
          e: {
            for (P = d.key; c !== null; ) {
              if (c.key === P)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === d.containerInfo &&
                  c.stateNode.implementation === d.implementation
                ) {
                  n(f, c.sibling),
                    (c = l(c, d.children || [])),
                    (c.return = f),
                    (f = c);
                  break e;
                } else {
                  n(f, c);
                  break;
                }
              else t(f, c);
              c = c.sibling;
            }
            (c = xi(d, f.mode, w)), (c.return = f), (f = c);
          }
          return o(f);
        case ot:
          return (P = d._init), C(f, c, P(d._payload), w);
      }
      if (In(d)) return x(f, c, d, w);
      if (Nn(d)) return k(f, c, d, w);
      Or(f, d);
    }
    return (typeof d == "string" && d !== "") || typeof d == "number"
      ? ((d = "" + d),
        c !== null && c.tag === 6
          ? (n(f, c.sibling), (c = l(c, d)), (c.return = f), (f = c))
          : (n(f, c), (c = gi(d, f.mode, w)), (c.return = f), (f = c)),
        o(f))
      : n(f, c);
  }
  return C;
}
var mn = ec(!0),
  tc = ec(!1),
  dl = Ct(null),
  pl = null,
  tn = null,
  Ao = null;
function Bo() {
  Ao = tn = pl = null;
}
function Ho(e) {
  var t = dl.current;
  U(dl), (e._currentValue = t);
}
function Ji(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function sn(e, t) {
  (pl = e),
    (Ao = tn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (me = !0), (e.firstContext = null));
}
function Re(e) {
  var t = e._currentValue;
  if (Ao !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), tn === null)) {
      if (pl === null) throw Error(S(308));
      (tn = e), (pl.dependencies = { lanes: 0, firstContext: e });
    } else tn = tn.next = e;
  return t;
}
var zt = null;
function Wo(e) {
  zt === null ? (zt = [e]) : zt.push(e);
}
function nc(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Wo(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    et(e, r)
  );
}
function et(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var ut = !1;
function Vo(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function rc(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Ze(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), I & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      et(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Wo(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    et(e, n)
  );
}
function Vr(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ro(e, n);
  }
}
function ia(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (l = i = o) : (i = i.next = o), (n = n.next);
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ml(e, t, n, r) {
  var l = e.updateQueue;
  ut = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u,
      s = a.next;
    (a.next = null), o === null ? (i = s) : (o.next = s), (o = a);
    var m = e.alternate;
    m !== null &&
      ((m = m.updateQueue),
      (u = m.lastBaseUpdate),
      u !== o &&
        (u === null ? (m.firstBaseUpdate = s) : (u.next = s),
        (m.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var h = l.baseState;
    (o = 0), (m = s = a = null), (u = i);
    do {
      var v = u.lane,
        g = u.eventTime;
      if ((r & v) === v) {
        m !== null &&
          (m = m.next =
            {
              eventTime: g,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var x = e,
            k = u;
          switch (((v = t), (g = n), k.tag)) {
            case 1:
              if (((x = k.payload), typeof x == "function")) {
                h = x.call(g, h, v);
                break e;
              }
              h = x;
              break e;
            case 3:
              x.flags = (x.flags & -65537) | 128;
            case 0:
              if (
                ((x = k.payload),
                (v = typeof x == "function" ? x.call(g, h, v) : x),
                v == null)
              )
                break e;
              h = V({}, h, v);
              break e;
            case 2:
              ut = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (v = l.effects),
          v === null ? (l.effects = [u]) : v.push(u));
      } else
        (g = {
          eventTime: g,
          lane: v,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          m === null ? ((s = m = g), (a = h)) : (m = m.next = g),
          (o |= v);
      if (((u = u.next), u === null)) {
        if (((u = l.shared.pending), u === null)) break;
        (v = u),
          (u = v.next),
          (v.next = null),
          (l.lastBaseUpdate = v),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (m === null && (a = h),
      (l.baseState = a),
      (l.firstBaseUpdate = s),
      (l.lastBaseUpdate = m),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (o |= l.lane), (l = l.next);
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    (Ut |= o), (e.lanes = o), (e.memoizedState = h);
  }
}
function oa(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(S(191, l));
        l.call(r);
      }
    }
}
var hr = {},
  We = Ct(hr),
  lr = Ct(hr),
  ir = Ct(hr);
function Tt(e) {
  if (e === hr) throw Error(S(174));
  return e;
}
function Qo(e, t) {
  switch (($(ir, t), $(lr, e), $(We, hr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : zi(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = zi(t, e));
  }
  U(We), $(We, t);
}
function hn() {
  U(We), U(lr), U(ir);
}
function lc(e) {
  Tt(ir.current);
  var t = Tt(We.current),
    n = zi(t, e.type);
  t !== n && ($(lr, e), $(We, n));
}
function Ko(e) {
  lr.current === e && (U(We), U(lr));
}
var B = Ct(0);
function hl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var di = [];
function Yo() {
  for (var e = 0; e < di.length; e++)
    di[e]._workInProgressVersionPrimary = null;
  di.length = 0;
}
var Qr = rt.ReactCurrentDispatcher,
  pi = rt.ReactCurrentBatchConfig,
  Dt = 0,
  H = null,
  X = null,
  q = null,
  vl = !1,
  Wn = !1,
  or = 0,
  yp = 0;
function re() {
  throw Error(S(321));
}
function Go(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!De(e[n], t[n])) return !1;
  return !0;
}
function Xo(e, t, n, r, l, i) {
  if (
    ((Dt = i),
    (H = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Qr.current = e === null || e.memoizedState === null ? kp : Sp),
    (e = n(r, l)),
    Wn)
  ) {
    i = 0;
    do {
      if (((Wn = !1), (or = 0), 25 <= i)) throw Error(S(301));
      (i += 1),
        (q = X = null),
        (t.updateQueue = null),
        (Qr.current = Ep),
        (e = n(r, l));
    } while (Wn);
  }
  if (
    ((Qr.current = yl),
    (t = X !== null && X.next !== null),
    (Dt = 0),
    (q = X = H = null),
    (vl = !1),
    t)
  )
    throw Error(S(300));
  return e;
}
function Zo() {
  var e = or !== 0;
  return (or = 0), e;
}
function Ae() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return q === null ? (H.memoizedState = q = e) : (q = q.next = e), q;
}
function Le() {
  if (X === null) {
    var e = H.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = X.next;
  var t = q === null ? H.memoizedState : q.next;
  if (t !== null) (q = t), (X = e);
  else {
    if (e === null) throw Error(S(310));
    (X = e),
      (e = {
        memoizedState: X.memoizedState,
        baseState: X.baseState,
        baseQueue: X.baseQueue,
        queue: X.queue,
        next: null,
      }),
      q === null ? (H.memoizedState = q = e) : (q = q.next = e);
  }
  return q;
}
function ur(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function mi(e) {
  var t = Le(),
    n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = X,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      (l.next = i.next), (i.next = o);
    }
    (r.baseQueue = l = i), (n.pending = null);
  }
  if (l !== null) {
    (i = l.next), (r = r.baseState);
    var u = (o = null),
      a = null,
      s = i;
    do {
      var m = s.lane;
      if ((Dt & m) === m)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action));
      else {
        var h = {
          lane: m,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        };
        a === null ? ((u = a = h), (o = r)) : (a = a.next = h),
          (H.lanes |= m),
          (Ut |= m);
      }
      s = s.next;
    } while (s !== null && s !== i);
    a === null ? (o = r) : (a.next = u),
      De(r, t.memoizedState) || (me = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (i = l.lane), (H.lanes |= i), (Ut |= i), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function hi(e) {
  var t = Le(),
    n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do (i = e(i, o.action)), (o = o.next);
    while (o !== l);
    De(i, t.memoizedState) || (me = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function ic() {}
function oc(e, t) {
  var n = H,
    r = Le(),
    l = t(),
    i = !De(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (me = !0)),
    (r = r.queue),
    Jo(sc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (q !== null && q.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      ar(9, ac.bind(null, n, r, l, t), void 0, null),
      b === null)
    )
      throw Error(S(349));
    Dt & 30 || uc(n, t, l);
  }
  return l;
}
function uc(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = H.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (H.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function ac(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), cc(t) && fc(e);
}
function sc(e, t, n) {
  return n(function () {
    cc(t) && fc(e);
  });
}
function cc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !De(e, n);
  } catch {
    return !0;
  }
}
function fc(e) {
  var t = et(e, 1);
  t !== null && $e(t, e, 1, -1);
}
function ua(e) {
  var t = Ae();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ur,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = wp.bind(null, H, e)),
    [t.memoizedState, e]
  );
}
function ar(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = H.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (H.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function dc() {
  return Le().memoizedState;
}
function Kr(e, t, n, r) {
  var l = Ae();
  (H.flags |= e),
    (l.memoizedState = ar(1 | t, n, void 0, r === void 0 ? null : r));
}
function Ol(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (((i = o.destroy), r !== null && Go(r, o.deps))) {
      l.memoizedState = ar(t, n, i, r);
      return;
    }
  }
  (H.flags |= e), (l.memoizedState = ar(1 | t, n, i, r));
}
function aa(e, t) {
  return Kr(8390656, 8, e, t);
}
function Jo(e, t) {
  return Ol(2048, 8, e, t);
}
function pc(e, t) {
  return Ol(4, 2, e, t);
}
function mc(e, t) {
  return Ol(4, 4, e, t);
}
function hc(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function vc(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Ol(4, 4, hc.bind(null, t, e), n)
  );
}
function qo() {}
function yc(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Go(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function gc(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Go(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function xc(e, t, n) {
  return Dt & 21
    ? (De(n, t) || ((n = Cs()), (H.lanes |= n), (Ut |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (me = !0)), (e.memoizedState = n));
}
function gp(e, t) {
  var n = F;
  (F = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = pi.transition;
  pi.transition = {};
  try {
    e(!1), t();
  } finally {
    (F = n), (pi.transition = r);
  }
}
function wc() {
  return Le().memoizedState;
}
function xp(e, t, n) {
  var r = gt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    kc(e))
  )
    Sc(t, n);
  else if (((n = nc(e, t, n, r)), n !== null)) {
    var l = se();
    $e(n, e, r, l), Ec(n, t, r);
  }
}
function wp(e, t, n) {
  var r = gt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (kc(e)) Sc(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var o = t.lastRenderedState,
          u = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), De(u, o))) {
          var a = t.interleaved;
          a === null
            ? ((l.next = l), Wo(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = nc(e, t, l, r)),
      n !== null && ((l = se()), $e(n, e, r, l), Ec(n, t, r));
  }
}
function kc(e) {
  var t = e.alternate;
  return e === H || (t !== null && t === H);
}
function Sc(e, t) {
  Wn = vl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Ec(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ro(e, n);
  }
}
var yl = {
    readContext: Re,
    useCallback: re,
    useContext: re,
    useEffect: re,
    useImperativeHandle: re,
    useInsertionEffect: re,
    useLayoutEffect: re,
    useMemo: re,
    useReducer: re,
    useRef: re,
    useState: re,
    useDebugValue: re,
    useDeferredValue: re,
    useTransition: re,
    useMutableSource: re,
    useSyncExternalStore: re,
    useId: re,
    unstable_isNewReconciler: !1,
  },
  kp = {
    readContext: Re,
    useCallback: function (e, t) {
      return (Ae().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Re,
    useEffect: aa,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Kr(4194308, 4, hc.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Kr(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Kr(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ae();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ae();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = xp.bind(null, H, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ae();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ua,
    useDebugValue: qo,
    useDeferredValue: function (e) {
      return (Ae().memoizedState = e);
    },
    useTransition: function () {
      var e = ua(!1),
        t = e[0];
      return (e = gp.bind(null, e[1])), (Ae().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = H,
        l = Ae();
      if (A) {
        if (n === void 0) throw Error(S(407));
        n = n();
      } else {
        if (((n = t()), b === null)) throw Error(S(349));
        Dt & 30 || uc(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        aa(sc.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        ar(9, ac.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ae(),
        t = b.identifierPrefix;
      if (A) {
        var n = Xe,
          r = Ge;
        (n = (r & ~(1 << (32 - Fe(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = or++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = yp++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Sp = {
    readContext: Re,
    useCallback: yc,
    useContext: Re,
    useEffect: Jo,
    useImperativeHandle: vc,
    useInsertionEffect: pc,
    useLayoutEffect: mc,
    useMemo: gc,
    useReducer: mi,
    useRef: dc,
    useState: function () {
      return mi(ur);
    },
    useDebugValue: qo,
    useDeferredValue: function (e) {
      var t = Le();
      return xc(t, X.memoizedState, e);
    },
    useTransition: function () {
      var e = mi(ur)[0],
        t = Le().memoizedState;
      return [e, t];
    },
    useMutableSource: ic,
    useSyncExternalStore: oc,
    useId: wc,
    unstable_isNewReconciler: !1,
  },
  Ep = {
    readContext: Re,
    useCallback: yc,
    useContext: Re,
    useEffect: Jo,
    useImperativeHandle: vc,
    useInsertionEffect: pc,
    useLayoutEffect: mc,
    useMemo: gc,
    useReducer: hi,
    useRef: dc,
    useState: function () {
      return hi(ur);
    },
    useDebugValue: qo,
    useDeferredValue: function (e) {
      var t = Le();
      return X === null ? (t.memoizedState = e) : xc(t, X.memoizedState, e);
    },
    useTransition: function () {
      var e = hi(ur)[0],
        t = Le().memoizedState;
      return [e, t];
    },
    useMutableSource: ic,
    useSyncExternalStore: oc,
    useId: wc,
    unstable_isNewReconciler: !1,
  };
function Te(e, t) {
  if (e && e.defaultProps) {
    (t = V({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function qi(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : V({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ml = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Ht(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = se(),
      l = gt(e),
      i = Ze(r, l);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = vt(e, i, l)),
      t !== null && ($e(t, e, l, r), Vr(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = se(),
      l = gt(e),
      i = Ze(r, l);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = vt(e, i, l)),
      t !== null && ($e(t, e, l, r), Vr(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = se(),
      r = gt(e),
      l = Ze(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = vt(e, l, r)),
      t !== null && ($e(t, e, r, n), Vr(t, e, r));
  },
};
function sa(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !er(n, r) || !er(l, i)
        : !0
  );
}
function Cc(e, t, n) {
  var r = !1,
    l = kt,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Re(i))
      : ((l = ve(t) ? Ft : ue.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? dn(e, l) : kt)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ml),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function ca(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ml.enqueueReplaceState(t, t.state, null);
}
function bi(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Vo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (l.context = Re(i))
    : ((i = ve(t) ? Ft : ue.current), (l.context = dn(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (qi(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && Ml.enqueueReplaceState(l, l.state, null),
      ml(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function vn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Jf(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function vi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function eo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Cp = typeof WeakMap == "function" ? WeakMap : Map;
function Nc(e, t, n) {
  (n = Ze(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      xl || ((xl = !0), (co = r)), eo(e, t);
    }),
    n
  );
}
function _c(e, t, n) {
  (n = Ze(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        eo(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        eo(e, t),
          typeof r != "function" &&
            (yt === null ? (yt = new Set([this])) : yt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function fa(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Cp();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = Dp.bind(null, e, t, n)), t.then(e, e));
}
function da(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function pa(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Ze(-1, 1)), (t.tag = 2), vt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Np = rt.ReactCurrentOwner,
  me = !1;
function ae(e, t, n, r) {
  t.child = e === null ? tc(t, null, n, r) : mn(t, e.child, n, r);
}
function ma(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    sn(t, l),
    (r = Xo(e, t, n, r, i, l)),
    (n = Zo()),
    e !== null && !me
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        tt(e, t, l))
      : (A && n && $o(t), (t.flags |= 1), ae(e, t, r, l), t.child)
  );
}
function ha(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !ou(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), jc(e, t, i, r, l))
      : ((e = Zr(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : er), n(o, r) && e.ref === t.ref)
    )
      return tt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = xt(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function jc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (er(i, r) && e.ref === t.ref)
      if (((me = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (me = !0);
      else return (t.lanes = e.lanes), tt(e, t, l);
  }
  return to(e, t, n, r, l);
}
function Pc(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        $(rn, xe),
        (xe |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          $(rn, xe),
          (xe |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        $(rn, xe),
        (xe |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      $(rn, xe),
      (xe |= r);
  return ae(e, t, l, n), t.child;
}
function Rc(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function to(e, t, n, r, l) {
  var i = ve(n) ? Ft : ue.current;
  return (
    (i = dn(t, i)),
    sn(t, l),
    (n = Xo(e, t, n, r, i, l)),
    (r = Zo()),
    e !== null && !me
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        tt(e, t, l))
      : (A && r && $o(t), (t.flags |= 1), ae(e, t, n, l), t.child)
  );
}
function va(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    sl(t);
  } else i = !1;
  if ((sn(t, l), t.stateNode === null))
    Yr(e, t), Cc(t, n, r), bi(t, n, r, l), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      u = t.memoizedProps;
    o.props = u;
    var a = o.context,
      s = n.contextType;
    typeof s == "object" && s !== null
      ? (s = Re(s))
      : ((s = ve(n) ? Ft : ue.current), (s = dn(t, s)));
    var m = n.getDerivedStateFromProps,
      h =
        typeof m == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    h ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== r || a !== s) && ca(t, o, r, s)),
      (ut = !1);
    var v = t.memoizedState;
    (o.state = v),
      ml(t, r, o, l),
      (a = t.memoizedState),
      u !== r || v !== a || he.current || ut
        ? (typeof m == "function" && (qi(t, n, m, r), (a = t.memoizedState)),
          (u = ut || sa(t, n, u, r, v, a, s))
            ? (h ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (o.props = r),
          (o.state = a),
          (o.context = s),
          (r = u))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      rc(e, t),
      (u = t.memoizedProps),
      (s = t.type === t.elementType ? u : Te(t.type, u)),
      (o.props = s),
      (h = t.pendingProps),
      (v = o.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Re(a))
        : ((a = ve(n) ? Ft : ue.current), (a = dn(t, a)));
    var g = n.getDerivedStateFromProps;
    (m =
      typeof g == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== h || v !== a) && ca(t, o, r, a)),
      (ut = !1),
      (v = t.memoizedState),
      (o.state = v),
      ml(t, r, o, l);
    var x = t.memoizedState;
    u !== h || v !== x || he.current || ut
      ? (typeof g == "function" && (qi(t, n, g, r), (x = t.memoizedState)),
        (s = ut || sa(t, n, s, r, v, x, a) || !1)
          ? (m ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, x, a),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, x, a)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = x)),
        (o.props = r),
        (o.state = x),
        (o.context = a),
        (r = s))
      : (typeof o.componentDidUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return no(e, t, n, r, i, l);
}
function no(e, t, n, r, l, i) {
  Rc(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && ta(t, n, !1), tt(e, t, i);
  (r = t.stateNode), (Np.current = t);
  var u =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = mn(t, e.child, null, i)), (t.child = mn(t, null, u, i)))
      : ae(e, t, u, i),
    (t.memoizedState = r.state),
    l && ta(t, n, !0),
    t.child
  );
}
function Lc(e) {
  var t = e.stateNode;
  t.pendingContext
    ? ea(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ea(e, t.context, !1),
    Qo(e, t.containerInfo);
}
function ya(e, t, n, r, l) {
  return pn(), Uo(l), (t.flags |= 256), ae(e, t, n, r), t.child;
}
var ro = { dehydrated: null, treeContext: null, retryLane: 0 };
function lo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function zc(e, t, n) {
  var r = t.pendingProps,
    l = B.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    u;
  if (
    ((u = o) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    $(B, l & 1),
    e === null)
  )
    return (
      Zi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = $l(o, r, 0, null)),
              (e = It(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = lo(n)),
              (t.memoizedState = ro),
              e)
            : bo(t, o))
    );
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return _p(e, t, o, r, u, l, n);
  if (i) {
    (i = r.fallback), (o = t.mode), (l = e.child), (u = l.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = xt(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (i = xt(u, i)) : ((i = It(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? lo(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = ro),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = xt(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function bo(e, t) {
  return (
    (t = $l({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Mr(e, t, n, r) {
  return (
    r !== null && Uo(r),
    mn(t, e.child, null, n),
    (e = bo(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function _p(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = vi(Error(S(422)))), Mr(e, t, o, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (l = t.mode),
          (r = $l({ mode: "visible", children: r.children }, l, 0, null)),
          (i = It(i, l, o, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && mn(t, e.child, null, o),
          (t.child.memoizedState = lo(o)),
          (t.memoizedState = ro),
          i);
  if (!(t.mode & 1)) return Mr(e, t, o, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (r = u), (i = Error(S(419))), (r = vi(i, r, void 0)), Mr(e, t, o, r);
  }
  if (((u = (o & e.childLanes) !== 0), me || u)) {
    if (((r = b), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | o) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), et(e, l), $e(r, e, l, -1));
    }
    return iu(), (r = vi(Error(S(421)))), Mr(e, t, o, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Up.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (we = ht(l.nextSibling)),
      (ke = t),
      (A = !0),
      (Ie = null),
      e !== null &&
        ((Ne[_e++] = Ge),
        (Ne[_e++] = Xe),
        (Ne[_e++] = $t),
        (Ge = e.id),
        (Xe = e.overflow),
        ($t = t)),
      (t = bo(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ga(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ji(e.return, t, n);
}
function yi(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function Tc(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((ae(e, t, r.children, n), (r = B.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ga(e, n, t);
        else if (e.tag === 19) ga(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if (($(B, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && hl(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          yi(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && hl(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        yi(t, !0, n, null, i);
        break;
      case "together":
        yi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Yr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function tt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Ut |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(S(153));
  if (t.child !== null) {
    for (
      e = t.child, n = xt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = xt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function jp(e, t, n) {
  switch (t.tag) {
    case 3:
      Lc(t), pn();
      break;
    case 5:
      lc(t);
      break;
    case 1:
      ve(t.type) && sl(t);
      break;
    case 4:
      Qo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      $(dl, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? ($(B, B.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? zc(e, t, n)
            : ($(B, B.current & 1),
              (e = tt(e, t, n)),
              e !== null ? e.sibling : null);
      $(B, B.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Tc(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        $(B, B.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Pc(e, t, n);
  }
  return tt(e, t, n);
}
var Oc, io, Mc, Ic;
Oc = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
io = function () {};
Mc = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Tt(We.current);
    var i = null;
    switch (n) {
      case "input":
        (l = ji(e, l)), (r = ji(e, r)), (i = []);
        break;
      case "select":
        (l = V({}, l, { value: void 0 })),
          (r = V({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (l = Li(e, l)), (r = Li(e, r)), (i = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ul);
    }
    Ti(n, r);
    var o;
    n = null;
    for (s in l)
      if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
        if (s === "style") {
          var u = l[s];
          for (o in u) u.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          s !== "dangerouslySetInnerHTML" &&
            s !== "children" &&
            s !== "suppressContentEditableWarning" &&
            s !== "suppressHydrationWarning" &&
            s !== "autoFocus" &&
            (Yn.hasOwnProperty(s)
              ? i || (i = [])
              : (i = i || []).push(s, null));
    for (s in r) {
      var a = r[s];
      if (
        ((u = l != null ? l[s] : void 0),
        r.hasOwnProperty(s) && a !== u && (a != null || u != null))
      )
        if (s === "style")
          if (u) {
            for (o in u)
              !u.hasOwnProperty(o) ||
                (a && a.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in a)
              a.hasOwnProperty(o) &&
                u[o] !== a[o] &&
                (n || (n = {}), (n[o] = a[o]));
          } else n || (i || (i = []), i.push(s, n)), (n = a);
        else
          s === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (u = u ? u.__html : void 0),
              a != null && u !== a && (i = i || []).push(s, a))
            : s === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (i = i || []).push(s, "" + a)
              : s !== "suppressContentEditableWarning" &&
                s !== "suppressHydrationWarning" &&
                (Yn.hasOwnProperty(s)
                  ? (a != null && s === "onScroll" && D("scroll", e),
                    i || u === a || (i = []))
                  : (i = i || []).push(s, a));
    }
    n && (i = i || []).push("style", n);
    var s = i;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
Ic = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function zn(e, t) {
  if (!A)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Pp(e, t, n) {
  var r = t.pendingProps;
  switch ((Do(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return le(t), null;
    case 1:
      return ve(t.type) && al(), le(t), null;
    case 3:
      return (
        (r = t.stateNode),
        hn(),
        U(he),
        U(ue),
        Yo(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Tr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ie !== null && (mo(Ie), (Ie = null)))),
        io(e, t),
        le(t),
        null
      );
    case 5:
      Ko(t);
      var l = Tt(ir.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Mc(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(S(166));
          return le(t), null;
        }
        if (((e = Tt(We.current)), Tr(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[Be] = t), (r[rr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              D("cancel", r), D("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < $n.length; l++) D($n[l], r);
              break;
            case "source":
              D("error", r);
              break;
            case "img":
            case "image":
            case "link":
              D("error", r), D("load", r);
              break;
            case "details":
              D("toggle", r);
              break;
            case "input":
              ju(r, i), D("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                D("invalid", r);
              break;
            case "textarea":
              Ru(r, i), D("invalid", r);
          }
          Ti(n, i), (l = null);
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var u = i[o];
              o === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (i.suppressHydrationWarning !== !0 &&
                      zr(r.textContent, u, e),
                    (l = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (i.suppressHydrationWarning !== !0 &&
                      zr(r.textContent, u, e),
                    (l = ["children", "" + u]))
                : Yn.hasOwnProperty(o) &&
                  u != null &&
                  o === "onScroll" &&
                  D("scroll", r);
            }
          switch (n) {
            case "input":
              Er(r), Pu(r, i, !0);
              break;
            case "textarea":
              Er(r), Lu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = ul);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = ss(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[Be] = t),
            (e[rr] = r),
            Oc(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = Oi(n, r)), n)) {
              case "dialog":
                D("cancel", e), D("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < $n.length; l++) D($n[l], e);
                l = r;
                break;
              case "source":
                D("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                D("error", e), D("load", e), (l = r);
                break;
              case "details":
                D("toggle", e), (l = r);
                break;
              case "input":
                ju(e, r), (l = ji(e, r)), D("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = V({}, r, { value: void 0 })),
                  D("invalid", e);
                break;
              case "textarea":
                Ru(e, r), (l = Li(e, r)), D("invalid", e);
                break;
              default:
                l = r;
            }
            Ti(n, l), (u = l);
            for (i in u)
              if (u.hasOwnProperty(i)) {
                var a = u[i];
                i === "style"
                  ? ds(e, a)
                  : i === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && cs(e, a))
                    : i === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && Gn(e, a)
                        : typeof a == "number" && Gn(e, "" + a)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (Yn.hasOwnProperty(i)
                          ? a != null && i === "onScroll" && D("scroll", e)
                          : a != null && Eo(e, i, a, o));
              }
            switch (n) {
              case "input":
                Er(e), Pu(e, r, !1);
                break;
              case "textarea":
                Er(e), Lu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + wt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? ln(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      ln(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ul);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return le(t), null;
    case 6:
      if (e && t.stateNode != null) Ic(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(S(166));
        if (((n = Tt(ir.current)), Tt(We.current), Tr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Be] = t),
            (i = r.nodeValue !== n) && ((e = ke), e !== null))
          )
            switch (e.tag) {
              case 3:
                zr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  zr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Be] = t),
            (t.stateNode = r);
      }
      return le(t), null;
    case 13:
      if (
        (U(B),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (A && we !== null && t.mode & 1 && !(t.flags & 128))
          bs(), pn(), (t.flags |= 98560), (i = !1);
        else if (((i = Tr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(S(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(S(317));
            i[Be] = t;
          } else
            pn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          le(t), (i = !1);
        } else Ie !== null && (mo(Ie), (Ie = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || B.current & 1 ? Z === 0 && (Z = 3) : iu())),
          t.updateQueue !== null && (t.flags |= 4),
          le(t),
          null);
    case 4:
      return (
        hn(), io(e, t), e === null && tr(t.stateNode.containerInfo), le(t), null
      );
    case 10:
      return Ho(t.type._context), le(t), null;
    case 17:
      return ve(t.type) && al(), le(t), null;
    case 19:
      if ((U(B), (i = t.memoizedState), i === null)) return le(t), null;
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) zn(i, !1);
        else {
          if (Z !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = hl(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    zn(i, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return $(B, (B.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            Y() > yn &&
            ((t.flags |= 128), (r = !0), zn(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = hl(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              zn(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !A)
            )
              return le(t), null;
          } else
            2 * Y() - i.renderingStartTime > yn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), zn(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (i.last = o));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = Y()),
          (t.sibling = null),
          (n = B.current),
          $(B, r ? (n & 1) | 2 : n & 1),
          t)
        : (le(t), null);
    case 22:
    case 23:
      return (
        lu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? xe & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : le(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Rp(e, t) {
  switch ((Do(t), t.tag)) {
    case 1:
      return (
        ve(t.type) && al(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        hn(),
        U(he),
        U(ue),
        Yo(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ko(t), null;
    case 13:
      if ((U(B), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(S(340));
        pn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return U(B), null;
    case 4:
      return hn(), null;
    case 10:
      return Ho(t.type._context), null;
    case 22:
    case 23:
      return lu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ir = !1,
  ie = !1,
  Lp = typeof WeakSet == "function" ? WeakSet : Set,
  N = null;
function nn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Q(e, t, r);
      }
    else n.current = null;
}
function oo(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var xa = !1;
function zp(e, t) {
  if (((Wi = ll), (e = As()), Fo(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            u = -1,
            a = -1,
            s = 0,
            m = 0,
            h = e,
            v = null;
          t: for (;;) {
            for (
              var g;
              h !== n || (l !== 0 && h.nodeType !== 3) || (u = o + l),
                h !== i || (r !== 0 && h.nodeType !== 3) || (a = o + r),
                h.nodeType === 3 && (o += h.nodeValue.length),
                (g = h.firstChild) !== null;

            )
              (v = h), (h = g);
            for (;;) {
              if (h === e) break t;
              if (
                (v === n && ++s === l && (u = o),
                v === i && ++m === r && (a = o),
                (g = h.nextSibling) !== null)
              )
                break;
              (h = v), (v = h.parentNode);
            }
            h = g;
          }
          n = u === -1 || a === -1 ? null : { start: u, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Vi = { focusedElem: e, selectionRange: n }, ll = !1, N = t; N !== null; )
    if (((t = N), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (N = e);
    else
      for (; N !== null; ) {
        t = N;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var k = x.memoizedProps,
                    C = x.memoizedState,
                    f = t.stateNode,
                    c = f.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? k : Te(t.type, k),
                      C,
                    );
                  f.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var d = t.stateNode.containerInfo;
                d.nodeType === 1
                  ? (d.textContent = "")
                  : d.nodeType === 9 &&
                    d.documentElement &&
                    d.removeChild(d.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(S(163));
            }
        } catch (w) {
          Q(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (N = e);
          break;
        }
        N = t.return;
      }
  return (x = xa), (xa = !1), x;
}
function Vn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        (l.destroy = void 0), i !== void 0 && oo(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Il(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function uo(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Fc(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Fc(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Be], delete t[rr], delete t[Yi], delete t[pp], delete t[mp])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function $c(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function wa(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || $c(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ao(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ul));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ao(e, t, n), e = e.sibling; e !== null; ) ao(e, t, n), (e = e.sibling);
}
function so(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (so(e, t, n), e = e.sibling; e !== null; ) so(e, t, n), (e = e.sibling);
}
var ee = null,
  Oe = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) Dc(e, t, n), (n = n.sibling);
}
function Dc(e, t, n) {
  if (He && typeof He.onCommitFiberUnmount == "function")
    try {
      He.onCommitFiberUnmount(jl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ie || nn(n, t);
    case 6:
      var r = ee,
        l = Oe;
      (ee = null),
        it(e, t, n),
        (ee = r),
        (Oe = l),
        ee !== null &&
          (Oe
            ? ((e = ee),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null &&
        (Oe
          ? ((e = ee),
            (n = n.stateNode),
            e.nodeType === 8
              ? ci(e.parentNode, n)
              : e.nodeType === 1 && ci(e, n),
            qn(e))
          : ci(ee, n.stateNode));
      break;
    case 4:
      (r = ee),
        (l = Oe),
        (ee = n.stateNode.containerInfo),
        (Oe = !0),
        it(e, t, n),
        (ee = r),
        (Oe = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ie &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          (i = i.tag),
            o !== void 0 && (i & 2 || i & 4) && oo(n, t, o),
            (l = l.next);
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (
        !ie &&
        (nn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (u) {
          Q(n, t, u);
        }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ie = (r = ie) || n.memoizedState !== null), it(e, t, n), (ie = r))
        : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function ka(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Lp()),
      t.forEach(function (r) {
        var l = Ap.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function ze(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          u = o;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              (ee = u.stateNode), (Oe = !1);
              break e;
            case 3:
              (ee = u.stateNode.containerInfo), (Oe = !0);
              break e;
            case 4:
              (ee = u.stateNode.containerInfo), (Oe = !0);
              break e;
          }
          u = u.return;
        }
        if (ee === null) throw Error(S(160));
        Dc(i, o, l), (ee = null), (Oe = !1);
        var a = l.alternate;
        a !== null && (a.return = null), (l.return = null);
      } catch (s) {
        Q(l, t, s);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Uc(t, e), (t = t.sibling);
}
function Uc(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ze(t, e), Ue(e), r & 4)) {
        try {
          Vn(3, e, e.return), Il(3, e);
        } catch (k) {
          Q(e, e.return, k);
        }
        try {
          Vn(5, e, e.return);
        } catch (k) {
          Q(e, e.return, k);
        }
      }
      break;
    case 1:
      ze(t, e), Ue(e), r & 512 && n !== null && nn(n, n.return);
      break;
    case 5:
      if (
        (ze(t, e),
        Ue(e),
        r & 512 && n !== null && nn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Gn(l, "");
        } catch (k) {
          Q(e, e.return, k);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          u = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            u === "input" && i.type === "radio" && i.name != null && us(l, i),
              Oi(u, o);
            var s = Oi(u, i);
            for (o = 0; o < a.length; o += 2) {
              var m = a[o],
                h = a[o + 1];
              m === "style"
                ? ds(l, h)
                : m === "dangerouslySetInnerHTML"
                  ? cs(l, h)
                  : m === "children"
                    ? Gn(l, h)
                    : Eo(l, m, h, s);
            }
            switch (u) {
              case "input":
                Pi(l, i);
                break;
              case "textarea":
                as(l, i);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var g = i.value;
                g != null
                  ? ln(l, !!i.multiple, g, !1)
                  : v !== !!i.multiple &&
                    (i.defaultValue != null
                      ? ln(l, !!i.multiple, i.defaultValue, !0)
                      : ln(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[rr] = i;
          } catch (k) {
            Q(e, e.return, k);
          }
      }
      break;
    case 6:
      if ((ze(t, e), Ue(e), r & 4)) {
        if (e.stateNode === null) throw Error(S(162));
        (l = e.stateNode), (i = e.memoizedProps);
        try {
          l.nodeValue = i;
        } catch (k) {
          Q(e, e.return, k);
        }
      }
      break;
    case 3:
      if (
        (ze(t, e), Ue(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          qn(t.containerInfo);
        } catch (k) {
          Q(e, e.return, k);
        }
      break;
    case 4:
      ze(t, e), Ue(e);
      break;
    case 13:
      ze(t, e),
        Ue(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (nu = Y())),
        r & 4 && ka(e);
      break;
    case 22:
      if (
        ((m = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ie = (s = ie) || m), ze(t, e), (ie = s)) : ze(t, e),
        Ue(e),
        r & 8192)
      ) {
        if (
          ((s = e.memoizedState !== null),
          (e.stateNode.isHidden = s) && !m && e.mode & 1)
        )
          for (N = e, m = e.child; m !== null; ) {
            for (h = N = m; N !== null; ) {
              switch (((v = N), (g = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Vn(4, v, v.return);
                  break;
                case 1:
                  nn(v, v.return);
                  var x = v.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    (r = v), (n = v.return);
                    try {
                      (t = r),
                        (x.props = t.memoizedProps),
                        (x.state = t.memoizedState),
                        x.componentWillUnmount();
                    } catch (k) {
                      Q(r, n, k);
                    }
                  }
                  break;
                case 5:
                  nn(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    Ea(h);
                    continue;
                  }
              }
              g !== null ? ((g.return = v), (N = g)) : Ea(h);
            }
            m = m.sibling;
          }
        e: for (m = null, h = e; ; ) {
          if (h.tag === 5) {
            if (m === null) {
              m = h;
              try {
                (l = h.stateNode),
                  s
                    ? ((i = l.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((u = h.stateNode),
                      (a = h.memoizedProps.style),
                      (o =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (u.style.display = fs("display", o)));
              } catch (k) {
                Q(e, e.return, k);
              }
            }
          } else if (h.tag === 6) {
            if (m === null)
              try {
                h.stateNode.nodeValue = s ? "" : h.memoizedProps;
              } catch (k) {
                Q(e, e.return, k);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            (h.child.return = h), (h = h.child);
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            m === h && (m = null), (h = h.return);
          }
          m === h && (m = null), (h.sibling.return = h.return), (h = h.sibling);
        }
      }
      break;
    case 19:
      ze(t, e), Ue(e), r & 4 && ka(e);
      break;
    case 21:
      break;
    default:
      ze(t, e), Ue(e);
  }
}
function Ue(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if ($c(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(S(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Gn(l, ""), (r.flags &= -33));
          var i = wa(e);
          so(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            u = wa(e);
          ao(e, u, o);
          break;
        default:
          throw Error(S(161));
      }
    } catch (a) {
      Q(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Tp(e, t, n) {
  (N = e), Ac(e);
}
function Ac(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var l = N,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Ir;
      if (!o) {
        var u = l.alternate,
          a = (u !== null && u.memoizedState !== null) || ie;
        u = Ir;
        var s = ie;
        if (((Ir = o), (ie = a) && !s))
          for (N = l; N !== null; )
            (o = N),
              (a = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Ca(l)
                : a !== null
                  ? ((a.return = o), (N = a))
                  : Ca(l);
        for (; i !== null; ) (N = i), Ac(i), (i = i.sibling);
        (N = l), (Ir = u), (ie = s);
      }
      Sa(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (N = i)) : Sa(e);
  }
}
function Sa(e) {
  for (; N !== null; ) {
    var t = N;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ie || Il(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ie)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Te(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && oa(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                oa(t, o, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate;
                if (s !== null) {
                  var m = s.memoizedState;
                  if (m !== null) {
                    var h = m.dehydrated;
                    h !== null && qn(h);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(S(163));
          }
        ie || (t.flags & 512 && uo(t));
      } catch (v) {
        Q(t, t.return, v);
      }
    }
    if (t === e) {
      N = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (N = n);
      break;
    }
    N = t.return;
  }
}
function Ea(e) {
  for (; N !== null; ) {
    var t = N;
    if (t === e) {
      N = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (N = n);
      break;
    }
    N = t.return;
  }
}
function Ca(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Il(4, t);
          } catch (a) {
            Q(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              Q(t, l, a);
            }
          }
          var i = t.return;
          try {
            uo(t);
          } catch (a) {
            Q(t, i, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            uo(t);
          } catch (a) {
            Q(t, o, a);
          }
      }
    } catch (a) {
      Q(t, t.return, a);
    }
    if (t === e) {
      N = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      (u.return = t.return), (N = u);
      break;
    }
    N = t.return;
  }
}
var Op = Math.ceil,
  gl = rt.ReactCurrentDispatcher,
  eu = rt.ReactCurrentOwner,
  Pe = rt.ReactCurrentBatchConfig,
  I = 0,
  b = null,
  G = null,
  te = 0,
  xe = 0,
  rn = Ct(0),
  Z = 0,
  sr = null,
  Ut = 0,
  Fl = 0,
  tu = 0,
  Qn = null,
  pe = null,
  nu = 0,
  yn = 1 / 0,
  Ke = null,
  xl = !1,
  co = null,
  yt = null,
  Fr = !1,
  ft = null,
  wl = 0,
  Kn = 0,
  fo = null,
  Gr = -1,
  Xr = 0;
function se() {
  return I & 6 ? Y() : Gr !== -1 ? Gr : (Gr = Y());
}
function gt(e) {
  return e.mode & 1
    ? I & 2 && te !== 0
      ? te & -te
      : vp.transition !== null
        ? (Xr === 0 && (Xr = Cs()), Xr)
        : ((e = F),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : zs(e.type))),
          e)
    : 1;
}
function $e(e, t, n, r) {
  if (50 < Kn) throw ((Kn = 0), (fo = null), Error(S(185)));
  dr(e, n, r),
    (!(I & 2) || e !== b) &&
      (e === b && (!(I & 2) && (Fl |= n), Z === 4 && st(e, te)),
      ye(e, r),
      n === 1 && I === 0 && !(t.mode & 1) && ((yn = Y() + 500), Tl && Nt()));
}
function ye(e, t) {
  var n = e.callbackNode;
  vd(e, t);
  var r = rl(e, e === b ? te : 0);
  if (r === 0)
    n !== null && Ou(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ou(n), t === 1))
      e.tag === 0 ? hp(Na.bind(null, e)) : Zs(Na.bind(null, e)),
        fp(function () {
          !(I & 6) && Nt();
        }),
        (n = null);
    else {
      switch (Ns(r)) {
        case 1:
          n = Po;
          break;
        case 4:
          n = Ss;
          break;
        case 16:
          n = nl;
          break;
        case 536870912:
          n = Es;
          break;
        default:
          n = nl;
      }
      n = Gc(n, Bc.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Bc(e, t) {
  if (((Gr = -1), (Xr = 0), I & 6)) throw Error(S(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = rl(e, e === b ? te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = kl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var i = Wc();
    (b !== e || te !== t) && ((Ke = null), (yn = Y() + 500), Mt(e, t));
    do
      try {
        Fp();
        break;
      } catch (u) {
        Hc(e, u);
      }
    while (!0);
    Bo(),
      (gl.current = i),
      (I = l),
      G !== null ? (t = 0) : ((b = null), (te = 0), (t = Z));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Di(e)), l !== 0 && ((r = l), (t = po(e, l)))), t === 1)
    )
      throw ((n = sr), Mt(e, 0), st(e, r), ye(e, Y()), n);
    if (t === 6) st(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Mp(l) &&
          ((t = kl(e, r)),
          t === 2 && ((i = Di(e)), i !== 0 && ((r = i), (t = po(e, i)))),
          t === 1))
      )
        throw ((n = sr), Mt(e, 0), st(e, r), ye(e, Y()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          Rt(e, pe, Ke);
          break;
        case 3:
          if (
            (st(e, r), (r & 130023424) === r && ((t = nu + 500 - Y()), 10 < t))
          ) {
            if (rl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              se(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Ki(Rt.bind(null, e, pe, Ke), t);
            break;
          }
          Rt(e, pe, Ke);
          break;
        case 4:
          if ((st(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Fe(r);
            (i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i);
          }
          if (
            ((r = l),
            (r = Y() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Op(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ki(Rt.bind(null, e, pe, Ke), r);
            break;
          }
          Rt(e, pe, Ke);
          break;
        case 5:
          Rt(e, pe, Ke);
          break;
        default:
          throw Error(S(329));
      }
    }
  }
  return ye(e, Y()), e.callbackNode === n ? Bc.bind(null, e) : null;
}
function po(e, t) {
  var n = Qn;
  return (
    e.current.memoizedState.isDehydrated && (Mt(e, t).flags |= 256),
    (e = kl(e, t)),
    e !== 2 && ((t = pe), (pe = n), t !== null && mo(t)),
    e
  );
}
function mo(e) {
  pe === null ? (pe = e) : pe.push.apply(pe, e);
}
function Mp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!De(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function st(e, t) {
  for (
    t &= ~tu,
      t &= ~Fl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Fe(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Na(e) {
  if (I & 6) throw Error(S(327));
  cn();
  var t = rl(e, 0);
  if (!(t & 1)) return ye(e, Y()), null;
  var n = kl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Di(e);
    r !== 0 && ((t = r), (n = po(e, r)));
  }
  if (n === 1) throw ((n = sr), Mt(e, 0), st(e, t), ye(e, Y()), n);
  if (n === 6) throw Error(S(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Rt(e, pe, Ke),
    ye(e, Y()),
    null
  );
}
function ru(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    (I = n), I === 0 && ((yn = Y() + 500), Tl && Nt());
  }
}
function At(e) {
  ft !== null && ft.tag === 0 && !(I & 6) && cn();
  var t = I;
  I |= 1;
  var n = Pe.transition,
    r = F;
  try {
    if (((Pe.transition = null), (F = 1), e)) return e();
  } finally {
    (F = r), (Pe.transition = n), (I = t), !(I & 6) && Nt();
  }
}
function lu() {
  (xe = rn.current), U(rn);
}
function Mt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), cp(n)), G !== null))
    for (n = G.return; n !== null; ) {
      var r = n;
      switch ((Do(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && al();
          break;
        case 3:
          hn(), U(he), U(ue), Yo();
          break;
        case 5:
          Ko(r);
          break;
        case 4:
          hn();
          break;
        case 13:
          U(B);
          break;
        case 19:
          U(B);
          break;
        case 10:
          Ho(r.type._context);
          break;
        case 22:
        case 23:
          lu();
      }
      n = n.return;
    }
  if (
    ((b = e),
    (G = e = xt(e.current, null)),
    (te = xe = t),
    (Z = 0),
    (sr = null),
    (tu = Fl = Ut = 0),
    (pe = Qn = null),
    zt !== null)
  ) {
    for (t = 0; t < zt.length; t++)
      if (((n = zt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          (i.next = l), (r.next = o);
        }
        n.pending = r;
      }
    zt = null;
  }
  return e;
}
function Hc(e, t) {
  do {
    var n = G;
    try {
      if ((Bo(), (Qr.current = yl), vl)) {
        for (var r = H.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        vl = !1;
      }
      if (
        ((Dt = 0),
        (q = X = H = null),
        (Wn = !1),
        (or = 0),
        (eu.current = null),
        n === null || n.return === null)
      ) {
        (Z = 1), (sr = t), (G = null);
        break;
      }
      e: {
        var i = e,
          o = n.return,
          u = n,
          a = t;
        if (
          ((t = te),
          (u.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var s = a,
            m = u,
            h = m.tag;
          if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var v = m.alternate;
            v
              ? ((m.updateQueue = v.updateQueue),
                (m.memoizedState = v.memoizedState),
                (m.lanes = v.lanes))
              : ((m.updateQueue = null), (m.memoizedState = null));
          }
          var g = da(o);
          if (g !== null) {
            (g.flags &= -257),
              pa(g, o, u, i, t),
              g.mode & 1 && fa(i, s, t),
              (t = g),
              (a = s);
            var x = t.updateQueue;
            if (x === null) {
              var k = new Set();
              k.add(a), (t.updateQueue = k);
            } else x.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              fa(i, s, t), iu();
              break e;
            }
            a = Error(S(426));
          }
        } else if (A && u.mode & 1) {
          var C = da(o);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256),
              pa(C, o, u, i, t),
              Uo(vn(a, u));
            break e;
          }
        }
        (i = a = vn(a, u)),
          Z !== 4 && (Z = 2),
          Qn === null ? (Qn = [i]) : Qn.push(i),
          (i = o);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var f = Nc(i, a, t);
              ia(i, f);
              break e;
            case 1:
              u = a;
              var c = i.type,
                d = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (d !== null &&
                    typeof d.componentDidCatch == "function" &&
                    (yt === null || !yt.has(d))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var w = _c(i, u, t);
                ia(i, w);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Qc(n);
    } catch (E) {
      (t = E), G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Wc() {
  var e = gl.current;
  return (gl.current = yl), e === null ? yl : e;
}
function iu() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4),
    b === null || (!(Ut & 268435455) && !(Fl & 268435455)) || st(b, te);
}
function kl(e, t) {
  var n = I;
  I |= 2;
  var r = Wc();
  (b !== e || te !== t) && ((Ke = null), Mt(e, t));
  do
    try {
      Ip();
      break;
    } catch (l) {
      Hc(e, l);
    }
  while (!0);
  if ((Bo(), (I = n), (gl.current = r), G !== null)) throw Error(S(261));
  return (b = null), (te = 0), Z;
}
function Ip() {
  for (; G !== null; ) Vc(G);
}
function Fp() {
  for (; G !== null && !ud(); ) Vc(G);
}
function Vc(e) {
  var t = Yc(e.alternate, e, xe);
  (e.memoizedProps = e.pendingProps),
    t === null ? Qc(e) : (G = t),
    (eu.current = null);
}
function Qc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Rp(n, t)), n !== null)) {
        (n.flags &= 32767), (G = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Z = 6), (G = null);
        return;
      }
    } else if (((n = Pp(n, t, xe)), n !== null)) {
      G = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function Rt(e, t, n) {
  var r = F,
    l = Pe.transition;
  try {
    (Pe.transition = null), (F = 1), $p(e, t, n, r);
  } finally {
    (Pe.transition = l), (F = r);
  }
  return null;
}
function $p(e, t, n, r) {
  do cn();
  while (ft !== null);
  if (I & 6) throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(S(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (yd(e, i),
    e === b && ((G = b = null), (te = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Fr ||
      ((Fr = !0),
      Gc(nl, function () {
        return cn(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = Pe.transition), (Pe.transition = null);
    var o = F;
    F = 1;
    var u = I;
    (I |= 4),
      (eu.current = null),
      zp(e, n),
      Uc(n, e),
      rp(Vi),
      (ll = !!Wi),
      (Vi = Wi = null),
      (e.current = n),
      Tp(n),
      ad(),
      (I = u),
      (F = o),
      (Pe.transition = i);
  } else e.current = n;
  if (
    (Fr && ((Fr = !1), (ft = e), (wl = l)),
    (i = e.pendingLanes),
    i === 0 && (yt = null),
    fd(n.stateNode),
    ye(e, Y()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (xl) throw ((xl = !1), (e = co), (co = null), e);
  return (
    wl & 1 && e.tag !== 0 && cn(),
    (i = e.pendingLanes),
    i & 1 ? (e === fo ? Kn++ : ((Kn = 0), (fo = e))) : (Kn = 0),
    Nt(),
    null
  );
}
function cn() {
  if (ft !== null) {
    var e = Ns(wl),
      t = Pe.transition,
      n = F;
    try {
      if (((Pe.transition = null), (F = 16 > e ? 16 : e), ft === null))
        var r = !1;
      else {
        if (((e = ft), (ft = null), (wl = 0), I & 6)) throw Error(S(331));
        var l = I;
        for (I |= 4, N = e.current; N !== null; ) {
          var i = N,
            o = i.child;
          if (N.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var s = u[a];
                for (N = s; N !== null; ) {
                  var m = N;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Vn(8, m, i);
                  }
                  var h = m.child;
                  if (h !== null) (h.return = m), (N = h);
                  else
                    for (; N !== null; ) {
                      m = N;
                      var v = m.sibling,
                        g = m.return;
                      if ((Fc(m), m === s)) {
                        N = null;
                        break;
                      }
                      if (v !== null) {
                        (v.return = g), (N = v);
                        break;
                      }
                      N = g;
                    }
                }
              }
              var x = i.alternate;
              if (x !== null) {
                var k = x.child;
                if (k !== null) {
                  x.child = null;
                  do {
                    var C = k.sibling;
                    (k.sibling = null), (k = C);
                  } while (k !== null);
                }
              }
              N = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) (o.return = i), (N = o);
          else
            e: for (; N !== null; ) {
              if (((i = N), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Vn(9, i, i.return);
                }
              var f = i.sibling;
              if (f !== null) {
                (f.return = i.return), (N = f);
                break e;
              }
              N = i.return;
            }
        }
        var c = e.current;
        for (N = c; N !== null; ) {
          o = N;
          var d = o.child;
          if (o.subtreeFlags & 2064 && d !== null) (d.return = o), (N = d);
          else
            e: for (o = c; N !== null; ) {
              if (((u = N), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Il(9, u);
                  }
                } catch (E) {
                  Q(u, u.return, E);
                }
              if (u === o) {
                N = null;
                break e;
              }
              var w = u.sibling;
              if (w !== null) {
                (w.return = u.return), (N = w);
                break e;
              }
              N = u.return;
            }
        }
        if (
          ((I = l), Nt(), He && typeof He.onPostCommitFiberRoot == "function")
        )
          try {
            He.onPostCommitFiberRoot(jl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (F = n), (Pe.transition = t);
    }
  }
  return !1;
}
function _a(e, t, n) {
  (t = vn(n, t)),
    (t = Nc(e, t, 1)),
    (e = vt(e, t, 1)),
    (t = se()),
    e !== null && (dr(e, 1, t), ye(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3) _a(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        _a(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (yt === null || !yt.has(r)))
        ) {
          (e = vn(n, e)),
            (e = _c(t, e, 1)),
            (t = vt(t, e, 1)),
            (e = se()),
            t !== null && (dr(t, 1, e), ye(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Dp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = se()),
    (e.pingedLanes |= e.suspendedLanes & n),
    b === e &&
      (te & n) === n &&
      (Z === 4 || (Z === 3 && (te & 130023424) === te && 500 > Y() - nu)
        ? Mt(e, 0)
        : (tu |= n)),
    ye(e, t);
}
function Kc(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = _r), (_r <<= 1), !(_r & 130023424) && (_r = 4194304))
      : (t = 1));
  var n = se();
  (e = et(e, t)), e !== null && (dr(e, t, n), ye(e, n));
}
function Up(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Kc(e, n);
}
function Ap(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(S(314));
  }
  r !== null && r.delete(t), Kc(e, n);
}
var Yc;
Yc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || he.current) me = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (me = !1), jp(e, t, n);
      me = !!(e.flags & 131072);
    }
  else (me = !1), A && t.flags & 1048576 && Js(t, fl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Yr(e, t), (e = t.pendingProps);
      var l = dn(t, ue.current);
      sn(t, n), (l = Xo(null, t, r, e, l, n));
      var i = Zo();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ve(r) ? ((i = !0), sl(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Vo(t),
            (l.updater = Ml),
            (t.stateNode = l),
            (l._reactInternals = t),
            bi(t, r, e, n),
            (t = no(null, t, r, !0, i, n)))
          : ((t.tag = 0), A && i && $o(t), ae(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Yr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Hp(r)),
          (e = Te(r, e)),
          l)
        ) {
          case 0:
            t = to(null, t, r, e, n);
            break e;
          case 1:
            t = va(null, t, r, e, n);
            break e;
          case 11:
            t = ma(null, t, r, e, n);
            break e;
          case 14:
            t = ha(null, t, r, Te(r.type, e), n);
            break e;
        }
        throw Error(S(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Te(r, l)),
        to(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Te(r, l)),
        va(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Lc(t), e === null)) throw Error(S(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          rc(e, t),
          ml(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (l = vn(Error(S(423)), t)), (t = ya(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = vn(Error(S(424)), t)), (t = ya(e, t, r, n, l));
            break e;
          } else
            for (
              we = ht(t.stateNode.containerInfo.firstChild),
                ke = t,
                A = !0,
                Ie = null,
                n = tc(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((pn(), r === l)) {
            t = tt(e, t, n);
            break e;
          }
          ae(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        lc(t),
        e === null && Zi(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (o = l.children),
        Qi(r, l) ? (o = null) : i !== null && Qi(r, i) && (t.flags |= 32),
        Rc(e, t),
        ae(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && Zi(t), null;
    case 13:
      return zc(e, t, n);
    case 4:
      return (
        Qo(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = mn(t, null, r, n)) : ae(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Te(r, l)),
        ma(e, t, r, l, n)
      );
    case 7:
      return ae(e, t, t.pendingProps, n), t.child;
    case 8:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (o = l.value),
          $(dl, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (De(i.value, o)) {
            if (i.children === l.children && !he.current) {
              t = tt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var u = i.dependencies;
              if (u !== null) {
                o = i.child;
                for (var a = u.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      (a = Ze(-1, n & -n)), (a.tag = 2);
                      var s = i.updateQueue;
                      if (s !== null) {
                        s = s.shared;
                        var m = s.pending;
                        m === null
                          ? (a.next = a)
                          : ((a.next = m.next), (m.next = a)),
                          (s.pending = a);
                      }
                    }
                    (i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      Ji(i.return, n, t),
                      (u.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(S(341));
                (o.lanes |= n),
                  (u = o.alternate),
                  u !== null && (u.lanes |= n),
                  Ji(o, n, t),
                  (o = i.sibling);
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    (i.return = o.return), (o = i);
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        ae(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        sn(t, n),
        (l = Re(l)),
        (r = r(l)),
        (t.flags |= 1),
        ae(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Te(r, t.pendingProps)),
        (l = Te(r.type, l)),
        ha(e, t, r, l, n)
      );
    case 15:
      return jc(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Te(r, l)),
        Yr(e, t),
        (t.tag = 1),
        ve(r) ? ((e = !0), sl(t)) : (e = !1),
        sn(t, n),
        Cc(t, r, l),
        bi(t, r, l, n),
        no(null, t, r, !0, e, n)
      );
    case 19:
      return Tc(e, t, n);
    case 22:
      return Pc(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function Gc(e, t) {
  return ks(e, t);
}
function Bp(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function je(e, t, n, r) {
  return new Bp(e, t, n, r);
}
function ou(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Hp(e) {
  if (typeof e == "function") return ou(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === No)) return 11;
    if (e === _o) return 14;
  }
  return 2;
}
function xt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = je(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Zr(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e == "function")) ou(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Yt:
        return It(n.children, l, i, t);
      case Co:
        (o = 8), (l |= 8);
        break;
      case Ei:
        return (
          (e = je(12, n, t, l | 2)), (e.elementType = Ei), (e.lanes = i), e
        );
      case Ci:
        return (e = je(13, n, t, l)), (e.elementType = Ci), (e.lanes = i), e;
      case Ni:
        return (e = je(19, n, t, l)), (e.elementType = Ni), (e.lanes = i), e;
      case ls:
        return $l(n, l, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case ns:
              o = 10;
              break e;
            case rs:
              o = 9;
              break e;
            case No:
              o = 11;
              break e;
            case _o:
              o = 14;
              break e;
            case ot:
              (o = 16), (r = null);
              break e;
          }
        throw Error(S(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = je(o, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function It(e, t, n, r) {
  return (e = je(7, e, r, t)), (e.lanes = n), e;
}
function $l(e, t, n, r) {
  return (
    (e = je(22, e, r, t)),
    (e.elementType = ls),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function gi(e, t, n) {
  return (e = je(6, e, null, t)), (e.lanes = n), e;
}
function xi(e, t, n) {
  return (
    (t = je(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Wp(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = bl(0)),
    (this.expirationTimes = bl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = bl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function uu(e, t, n, r, l, i, o, u, a) {
  return (
    (e = new Wp(e, t, n, u, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = je(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Vo(i),
    e
  );
}
function Vp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Kt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Xc(e) {
  if (!e) return kt;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(S(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(S(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return Xs(e, n, t);
  }
  return t;
}
function Zc(e, t, n, r, l, i, o, u, a) {
  return (
    (e = uu(n, r, !0, e, l, i, o, u, a)),
    (e.context = Xc(null)),
    (n = e.current),
    (r = se()),
    (l = gt(n)),
    (i = Ze(r, l)),
    (i.callback = t ?? null),
    vt(n, i, l),
    (e.current.lanes = l),
    dr(e, l, r),
    ye(e, r),
    e
  );
}
function Dl(e, t, n, r) {
  var l = t.current,
    i = se(),
    o = gt(l);
  return (
    (n = Xc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Ze(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = vt(l, t, o)),
    e !== null && ($e(e, l, o, i), Vr(e, l, o)),
    o
  );
}
function Sl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ja(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function au(e, t) {
  ja(e, t), (e = e.alternate) && ja(e, t);
}
function Qp() {
  return null;
}
var Jc =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function su(e) {
  this._internalRoot = e;
}
Ul.prototype.render = su.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  Dl(e, t, null, null);
};
Ul.prototype.unmount = su.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    At(function () {
      Dl(null, e, null, null);
    }),
      (t[be] = null);
  }
};
function Ul(e) {
  this._internalRoot = e;
}
Ul.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Ps();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < at.length && t !== 0 && t < at[n].priority; n++);
    at.splice(n, 0, e), n === 0 && Ls(e);
  }
};
function cu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Al(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Pa() {}
function Kp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var s = Sl(o);
        i.call(s);
      };
    }
    var o = Zc(t, r, e, 0, null, !1, !1, "", Pa);
    return (
      (e._reactRootContainer = o),
      (e[be] = o.current),
      tr(e.nodeType === 8 ? e.parentNode : e),
      At(),
      o
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var s = Sl(a);
      u.call(s);
    };
  }
  var a = uu(e, 0, !1, null, null, !1, !1, "", Pa);
  return (
    (e._reactRootContainer = a),
    (e[be] = a.current),
    tr(e.nodeType === 8 ? e.parentNode : e),
    At(function () {
      Dl(t, a, n, r);
    }),
    a
  );
}
function Bl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var u = l;
      l = function () {
        var a = Sl(o);
        u.call(a);
      };
    }
    Dl(t, o, e, l);
  } else o = Kp(n, t, e, l, r);
  return Sl(o);
}
_s = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Fn(t.pendingLanes);
        n !== 0 &&
          (Ro(t, n | 1), ye(t, Y()), !(I & 6) && ((yn = Y() + 500), Nt()));
      }
      break;
    case 13:
      At(function () {
        var r = et(e, 1);
        if (r !== null) {
          var l = se();
          $e(r, e, 1, l);
        }
      }),
        au(e, 1);
  }
};
Lo = function (e) {
  if (e.tag === 13) {
    var t = et(e, 134217728);
    if (t !== null) {
      var n = se();
      $e(t, e, 134217728, n);
    }
    au(e, 134217728);
  }
};
js = function (e) {
  if (e.tag === 13) {
    var t = gt(e),
      n = et(e, t);
    if (n !== null) {
      var r = se();
      $e(n, e, t, r);
    }
    au(e, t);
  }
};
Ps = function () {
  return F;
};
Rs = function (e, t) {
  var n = F;
  try {
    return (F = e), t();
  } finally {
    F = n;
  }
};
Ii = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Pi(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = zl(r);
            if (!l) throw Error(S(90));
            os(r), Pi(r, l);
          }
        }
      }
      break;
    case "textarea":
      as(e, n);
      break;
    case "select":
      (t = n.value), t != null && ln(e, !!n.multiple, t, !1);
  }
};
hs = ru;
vs = At;
var Yp = { usingClientEntryPoint: !1, Events: [mr, Jt, zl, ps, ms, ru] },
  Tn = {
    findFiberByHostInstance: Lt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Gp = {
    bundleType: Tn.bundleType,
    version: Tn.version,
    rendererPackageName: Tn.rendererPackageName,
    rendererConfig: Tn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: rt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = xs(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Tn.findFiberByHostInstance || Qp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var $r = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!$r.isDisabled && $r.supportsFiber)
    try {
      (jl = $r.inject(Gp)), (He = $r);
    } catch {}
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Yp;
Ee.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!cu(t)) throw Error(S(200));
  return Vp(e, t, null, n);
};
Ee.createRoot = function (e, t) {
  if (!cu(e)) throw Error(S(299));
  var n = !1,
    r = "",
    l = Jc;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = uu(e, 1, !1, null, null, n, !1, r, l)),
    (e[be] = t.current),
    tr(e.nodeType === 8 ? e.parentNode : e),
    new su(t)
  );
};
Ee.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(S(188))
      : ((e = Object.keys(e).join(",")), Error(S(268, e)));
  return (e = xs(t)), (e = e === null ? null : e.stateNode), e;
};
Ee.flushSync = function (e) {
  return At(e);
};
Ee.hydrate = function (e, t, n) {
  if (!Al(t)) throw Error(S(200));
  return Bl(null, e, t, !0, n);
};
Ee.hydrateRoot = function (e, t, n) {
  if (!cu(e)) throw Error(S(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = "",
    o = Jc;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Zc(t, null, e, 1, n ?? null, l, !1, i, o)),
    (e[be] = t.current),
    tr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new Ul(t);
};
Ee.render = function (e, t, n) {
  if (!Al(t)) throw Error(S(200));
  return Bl(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function (e) {
  if (!Al(e)) throw Error(S(40));
  return e._reactRootContainer
    ? (At(function () {
        Bl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[be] = null);
        });
      }),
      !0)
    : !1;
};
Ee.unstable_batchedUpdates = ru;
Ee.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Al(n)) throw Error(S(200));
  if (e == null || e._reactInternals === void 0) throw Error(S(38));
  return Bl(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function qc() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qc);
    } catch (e) {
      console.error(e);
    }
}
qc(), (qa.exports = Ee);
var Xp = qa.exports,
  bc,
  Ra = Xp;
(bc = Ra.createRoot), Ra.hydrateRoot;
const St = (e) => {
  const { title: t, icon: n, position: r, handleClick: l, otherClasses: i } = e;
  return p.jsxs("button", {
    className: `relative inline-flex h-12 w-full overflow-hidden rounded-2xl p-[1px] 
                   focus:outline-none md:w-60 md:mt-10`,
    onClick: l,
    children: [
      p.jsx("span", {
        className: `absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
    bg-[conic-gradient(from_90deg_at_50%_50%,#f8ff99_0%,#f4ff54_50%,#f0ff17_100%)]`,
      }),
      p.jsxs("span", {
        className: `inline-flex h-full w-full hover:bg-[#000310fa] cursor-pointer items-center 
    justify-center rounded-2xl bg-[#1A1A1A] px-7 text-lg font-bold font-[Montserrat] text-[#f6ff75] backdrop-blur-3xl gap-2 ${i}`,
        children: [r === "left" && n, t, r === "right" && n],
      }),
    ],
  });
};
var fu = {};
Object.defineProperty(fu, "__esModule", { value: !0 });
fu.parse = nm;
fu.serialize = rm;
const Zp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
  Jp = /^[\u0021-\u003A\u003C-\u007E]*$/,
  qp =
    /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  bp = /^[\u0020-\u003A\u003D-\u007E]*$/,
  em = Object.prototype.toString,
  tm = (() => {
    const e = function () {};
    return (e.prototype = Object.create(null)), e;
  })();
function nm(e, t) {
  const n = new tm(),
    r = e.length;
  if (r < 2) return n;
  const l = (t == null ? void 0 : t.decode) || lm;
  let i = 0;
  do {
    const o = e.indexOf("=", i);
    if (o === -1) break;
    const u = e.indexOf(";", i),
      a = u === -1 ? r : u;
    if (o > a) {
      i = e.lastIndexOf(";", o - 1) + 1;
      continue;
    }
    const s = La(e, i, o),
      m = za(e, o, s),
      h = e.slice(s, m);
    if (n[h] === void 0) {
      let v = La(e, o + 1, a),
        g = za(e, a, v);
      const x = l(e.slice(v, g));
      n[h] = x;
    }
    i = a + 1;
  } while (i < r);
  return n;
}
function La(e, t, n) {
  do {
    const r = e.charCodeAt(t);
    if (r !== 32 && r !== 9) return t;
  } while (++t < n);
  return n;
}
function za(e, t, n) {
  for (; t > n; ) {
    const r = e.charCodeAt(--t);
    if (r !== 32 && r !== 9) return t + 1;
  }
  return n;
}
function rm(e, t, n) {
  const r = (n == null ? void 0 : n.encode) || encodeURIComponent;
  if (!Zp.test(e)) throw new TypeError(`argument name is invalid: ${e}`);
  const l = r(t);
  if (!Jp.test(l)) throw new TypeError(`argument val is invalid: ${t}`);
  let i = e + "=" + l;
  if (!n) return i;
  if (n.maxAge !== void 0) {
    if (!Number.isInteger(n.maxAge))
      throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);
    i += "; Max-Age=" + n.maxAge;
  }
  if (n.domain) {
    if (!qp.test(n.domain))
      throw new TypeError(`option domain is invalid: ${n.domain}`);
    i += "; Domain=" + n.domain;
  }
  if (n.path) {
    if (!bp.test(n.path))
      throw new TypeError(`option path is invalid: ${n.path}`);
    i += "; Path=" + n.path;
  }
  if (n.expires) {
    if (!im(n.expires) || !Number.isFinite(n.expires.valueOf()))
      throw new TypeError(`option expires is invalid: ${n.expires}`);
    i += "; Expires=" + n.expires.toUTCString();
  }
  if (
    (n.httpOnly && (i += "; HttpOnly"),
    n.secure && (i += "; Secure"),
    n.partitioned && (i += "; Partitioned"),
    n.priority)
  )
    switch (typeof n.priority == "string" ? n.priority.toLowerCase() : void 0) {
      case "low":
        i += "; Priority=Low";
        break;
      case "medium":
        i += "; Priority=Medium";
        break;
      case "high":
        i += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${n.priority}`);
    }
  if (n.sameSite)
    switch (
      typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite
    ) {
      case !0:
      case "strict":
        i += "; SameSite=Strict";
        break;
      case "lax":
        i += "; SameSite=Lax";
        break;
      case "none":
        i += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${n.sameSite}`);
    }
  return i;
}
function lm(e) {
  if (e.indexOf("%") === -1) return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
function im(e) {
  return em.call(e) === "[object Date]";
}
/**
 * react-router v7.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Ta = "popstate";
function om(e = {}) {
  function t(r, l) {
    let { pathname: i, search: o, hash: u } = r.location;
    return ho(
      "",
      { pathname: i, search: o, hash: u },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default",
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : cr(l);
  }
  return am(t, n, null, e);
}
function W(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Ve(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function um() {
  return Math.random().toString(36).substring(2, 10);
}
function Oa(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function ho(e, t, n = null, r) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? kn(t) : t),
    state: n,
    key: (t && t.key) || r || um(),
  };
}
function cr({ pathname: e = "/", search: t = "", hash: n = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n),
    e
  );
}
function kn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function am(e, t, n, r = {}) {
  let { window: l = document.defaultView, v5Compat: i = !1 } = r,
    o = l.history,
    u = "POP",
    a = null,
    s = m();
  s == null && ((s = 0), o.replaceState({ ...o.state, idx: s }, ""));
  function m() {
    return (o.state || { idx: null }).idx;
  }
  function h() {
    u = "POP";
    let C = m(),
      f = C == null ? null : C - s;
    (s = C), a && a({ action: u, location: k.location, delta: f });
  }
  function v(C, f) {
    u = "PUSH";
    let c = ho(k.location, C, f);
    s = m() + 1;
    let d = Oa(c, s),
      w = k.createHref(c);
    try {
      o.pushState(d, "", w);
    } catch (E) {
      if (E instanceof DOMException && E.name === "DataCloneError") throw E;
      l.location.assign(w);
    }
    i && a && a({ action: u, location: k.location, delta: 1 });
  }
  function g(C, f) {
    u = "REPLACE";
    let c = ho(k.location, C, f);
    s = m();
    let d = Oa(c, s),
      w = k.createHref(c);
    o.replaceState(d, "", w),
      i && a && a({ action: u, location: k.location, delta: 0 });
  }
  function x(C) {
    let f = l.location.origin !== "null" ? l.location.origin : l.location.href,
      c = typeof C == "string" ? C : cr(C);
    return (
      (c = c.replace(/ $/, "%20")),
      W(
        f,
        `No window.location.(origin|href) available to create URL for href: ${c}`,
      ),
      new URL(c, f)
    );
  }
  let k = {
    get action() {
      return u;
    },
    get location() {
      return e(l, o);
    },
    listen(C) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Ta, h),
        (a = C),
        () => {
          l.removeEventListener(Ta, h), (a = null);
        }
      );
    },
    createHref(C) {
      return t(l, C);
    },
    createURL: x,
    encodeLocation(C) {
      let f = x(C);
      return { pathname: f.pathname, search: f.search, hash: f.hash };
    },
    push: v,
    replace: g,
    go(C) {
      return o.go(C);
    },
  };
  return k;
}
function ef(e, t, n = "/") {
  return sm(e, t, n, !1);
}
function sm(e, t, n, r) {
  let l = typeof t == "string" ? kn(t) : t,
    i = nt(l.pathname || "/", n);
  if (i == null) return null;
  let o = tf(e);
  cm(o);
  let u = null;
  for (let a = 0; u == null && a < o.length; ++a) {
    let s = km(i);
    u = xm(o[a], s, r);
  }
  return u;
}
function tf(e, t = [], n = [], r = "") {
  let l = (i, o, u) => {
    let a = {
      relativePath: u === void 0 ? i.path || "" : u,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i,
    };
    a.relativePath.startsWith("/") &&
      (W(
        a.relativePath.startsWith(r),
        `Absolute route path "${a.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let s = Je([r, a.relativePath]),
      m = n.concat(a);
    i.children &&
      i.children.length > 0 &&
      (W(
        i.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${s}".`,
      ),
      tf(i.children, t, m, s)),
      !(i.path == null && !i.index) &&
        t.push({ path: s, score: ym(s, i.index), routesMeta: m });
  };
  return (
    e.forEach((i, o) => {
      var u;
      if (i.path === "" || !((u = i.path) != null && u.includes("?"))) l(i, o);
      else for (let a of nf(i.path)) l(i, o, a);
    }),
    t
  );
}
function nf(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [i, ""] : [i];
  let o = nf(r.join("/")),
    u = [];
  return (
    u.push(...o.map((a) => (a === "" ? i : [i, a].join("/")))),
    l && u.push(...o),
    u.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function cm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : gm(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
var fm = /^:[\w-]+$/,
  dm = 3,
  pm = 2,
  mm = 1,
  hm = 10,
  vm = -2,
  Ma = (e) => e === "*";
function ym(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Ma) && (r += vm),
    t && (r += pm),
    n
      .filter((l) => !Ma(l))
      .reduce((l, i) => l + (fm.test(i) ? dm : i === "" ? mm : hm), r)
  );
}
function gm(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function xm(e, t, n = !1) {
  let { routesMeta: r } = e,
    l = {},
    i = "/",
    o = [];
  for (let u = 0; u < r.length; ++u) {
    let a = r[u],
      s = u === r.length - 1,
      m = i === "/" ? t : t.slice(i.length) || "/",
      h = El(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: s },
        m,
      ),
      v = a.route;
    if (
      (!h &&
        s &&
        n &&
        !r[r.length - 1].route.index &&
        (h = El(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          m,
        )),
      !h)
    )
      return null;
    Object.assign(l, h.params),
      o.push({
        params: l,
        pathname: Je([i, h.pathname]),
        pathnameBase: Nm(Je([i, h.pathnameBase])),
        route: v,
      }),
      h.pathnameBase !== "/" && (i = Je([i, h.pathnameBase]));
  }
  return o;
}
function El(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = wm(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let i = l[0],
    o = i.replace(/(.)\/+$/, "$1"),
    u = l.slice(1);
  return {
    params: r.reduce((s, { paramName: m, isOptional: h }, v) => {
      if (m === "*") {
        let x = u[v] || "";
        o = i.slice(0, i.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const g = u[v];
      return (
        h && !g ? (s[m] = void 0) : (s[m] = (g || "").replace(/%2F/g, "/")), s
      );
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e,
  };
}
function wm(e, t = !1, n = !0) {
  Ve(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, u, a) => (
            r.push({ paramName: u, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function km(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Ve(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function nt(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Sm(e, t = "/") {
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? kn(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Em(n, t)) : t,
    search: _m(r),
    hash: jm(l),
  };
}
function Em(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function wi(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Cm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function rf(e) {
  let t = Cm(e);
  return t.map((n, r) => (r === t.length - 1 ? n.pathname : n.pathnameBase));
}
function lf(e, t, n, r = !1) {
  let l;
  typeof e == "string"
    ? (l = kn(e))
    : ((l = { ...e }),
      W(
        !l.pathname || !l.pathname.includes("?"),
        wi("?", "pathname", "search", l),
      ),
      W(
        !l.pathname || !l.pathname.includes("#"),
        wi("#", "pathname", "hash", l),
      ),
      W(!l.search || !l.search.includes("#"), wi("#", "search", "hash", l)));
  let i = e === "" || l.pathname === "",
    o = i ? "/" : l.pathname,
    u;
  if (o == null) u = n;
  else {
    let h = t.length - 1;
    if (!r && o.startsWith("..")) {
      let v = o.split("/");
      for (; v[0] === ".."; ) v.shift(), (h -= 1);
      l.pathname = v.join("/");
    }
    u = h >= 0 ? t[h] : "/";
  }
  let a = Sm(l, u),
    s = o && o !== "/" && o.endsWith("/"),
    m = (i || o === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (s || m) && (a.pathname += "/"), a;
}
var Je = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Nm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  _m = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  jm = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Pm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
var of = ["POST", "PUT", "PATCH", "DELETE"];
new Set(of);
var Rm = ["GET", ...of];
new Set(Rm);
var Sn = y.createContext(null);
Sn.displayName = "DataRouter";
var Hl = y.createContext(null);
Hl.displayName = "DataRouterState";
var uf = y.createContext({ isTransitioning: !1 });
uf.displayName = "ViewTransition";
var Lm = y.createContext(new Map());
Lm.displayName = "Fetchers";
var zm = y.createContext(null);
zm.displayName = "Await";
var Qe = y.createContext(null);
Qe.displayName = "Navigation";
var vr = y.createContext(null);
vr.displayName = "Location";
var lt = y.createContext({ outlet: null, matches: [], isDataRoute: !1 });
lt.displayName = "Route";
var du = y.createContext(null);
du.displayName = "RouteError";
function Tm(e, { relative: t } = {}) {
  W(yr(), "useHref() may be used only in the context of a <Router> component.");
  let { basename: n, navigator: r } = y.useContext(Qe),
    { hash: l, pathname: i, search: o } = gr(e, { relative: t }),
    u = i;
  return (
    n !== "/" && (u = i === "/" ? n : Je([n, i])),
    r.createHref({ pathname: u, search: o, hash: l })
  );
}
function yr() {
  return y.useContext(vr) != null;
}
function Wt() {
  return (
    W(
      yr(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    y.useContext(vr).location
  );
}
var af =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function sf(e) {
  y.useContext(Qe).static || y.useLayoutEffect(e);
}
function Om() {
  let { isDataRoute: e } = y.useContext(lt);
  return e ? Km() : Mm();
}
function Mm() {
  W(
    yr(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = y.useContext(Sn),
    { basename: t, navigator: n } = y.useContext(Qe),
    { matches: r } = y.useContext(lt),
    { pathname: l } = Wt(),
    i = JSON.stringify(rf(r)),
    o = y.useRef(!1);
  return (
    sf(() => {
      o.current = !0;
    }),
    y.useCallback(
      (a, s = {}) => {
        if ((Ve(o.current, af), !o.current)) return;
        if (typeof a == "number") {
          n.go(a);
          return;
        }
        let m = lf(a, JSON.parse(i), l, s.relative === "path");
        e == null &&
          t !== "/" &&
          (m.pathname = m.pathname === "/" ? t : Je([t, m.pathname])),
          (s.replace ? n.replace : n.push)(m, s.state, s);
      },
      [t, n, i, l, e],
    )
  );
}
y.createContext(null);
function gr(e, { relative: t } = {}) {
  let { matches: n } = y.useContext(lt),
    { pathname: r } = Wt(),
    l = JSON.stringify(rf(n));
  return y.useMemo(() => lf(e, JSON.parse(l), r, t === "path"), [e, l, r, t]);
}
function Im(e, t) {
  return cf(e, t);
}
function cf(e, t, n, r) {
  var c;
  W(
    yr(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: l, static: i } = y.useContext(Qe),
    { matches: o } = y.useContext(lt),
    u = o[o.length - 1],
    a = u ? u.params : {},
    s = u ? u.pathname : "/",
    m = u ? u.pathnameBase : "/",
    h = u && u.route;
  {
    let d = (h && h.path) || "";
    ff(
      s,
      !h || d.endsWith("*") || d.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${d}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${d}"> to <Route path="${d === "/" ? "*" : `${d}/*`}">.`,
    );
  }
  let v = Wt(),
    g;
  if (t) {
    let d = typeof t == "string" ? kn(t) : t;
    W(
      m === "/" || ((c = d.pathname) == null ? void 0 : c.startsWith(m)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${d.pathname}" was given in the \`location\` prop.`,
    ),
      (g = d);
  } else g = v;
  let x = g.pathname || "/",
    k = x;
  if (m !== "/") {
    let d = m.replace(/^\//, "").split("/");
    k = "/" + x.replace(/^\//, "").split("/").slice(d.length).join("/");
  }
  let C =
    !i && n && n.matches && n.matches.length > 0
      ? n.matches
      : ef(e, { pathname: k });
  Ve(
    h || C != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `,
  ),
    Ve(
      C == null ||
        C[C.length - 1].route.element !== void 0 ||
        C[C.length - 1].route.Component !== void 0 ||
        C[C.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let f = Am(
    C &&
      C.map((d) =>
        Object.assign({}, d, {
          params: Object.assign({}, a, d.params),
          pathname: Je([
            m,
            l.encodeLocation
              ? l.encodeLocation(d.pathname).pathname
              : d.pathname,
          ]),
          pathnameBase:
            d.pathnameBase === "/"
              ? m
              : Je([
                  m,
                  l.encodeLocation
                    ? l.encodeLocation(d.pathnameBase).pathname
                    : d.pathnameBase,
                ]),
        }),
      ),
    o,
    n,
    r,
  );
  return t && f
    ? y.createElement(
        vr.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...g,
            },
            navigationType: "POP",
          },
        },
        f,
      )
    : f;
}
function Fm() {
  let e = Qm(),
    t = Pm(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = "rgba(200,200,200, 0.5)",
    l = { padding: "0.5rem", backgroundColor: r },
    i = { padding: "2px 4px", backgroundColor: r },
    o = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (o = y.createElement(
      y.Fragment,
      null,
      y.createElement("p", null, "💿 Hey developer 👋"),
      y.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        y.createElement("code", { style: i }, "ErrorBoundary"),
        " or",
        " ",
        y.createElement("code", { style: i }, "errorElement"),
        " prop on your route.",
      ),
    )),
    y.createElement(
      y.Fragment,
      null,
      y.createElement("h2", null, "Unexpected Application Error!"),
      y.createElement("h3", { style: { fontStyle: "italic" } }, t),
      n ? y.createElement("pre", { style: l }, n) : null,
      o,
    )
  );
}
var $m = y.createElement(Fm, null),
  Dm = class extends y.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      console.error(
        "React Router caught the following error during render",
        e,
        t,
      );
    }
    render() {
      return this.state.error !== void 0
        ? y.createElement(
            lt.Provider,
            { value: this.props.routeContext },
            y.createElement(du.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function Um({ routeContext: e, match: t, children: n }) {
  let r = y.useContext(Sn);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    y.createElement(lt.Provider, { value: e }, n)
  );
}
function Am(e, t = [], n = null, r = null) {
  if (e == null) {
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else return null;
  }
  let l = e,
    i = n == null ? void 0 : n.errors;
  if (i != null) {
    let a = l.findIndex(
      (s) => s.route.id && (i == null ? void 0 : i[s.route.id]) !== void 0,
    );
    W(
      a >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`,
    ),
      (l = l.slice(0, Math.min(l.length, a + 1)));
  }
  let o = !1,
    u = -1;
  if (n)
    for (let a = 0; a < l.length; a++) {
      let s = l[a];
      if (
        ((s.route.HydrateFallback || s.route.hydrateFallbackElement) && (u = a),
        s.route.id)
      ) {
        let { loaderData: m, errors: h } = n,
          v =
            s.route.loader &&
            !m.hasOwnProperty(s.route.id) &&
            (!h || h[s.route.id] === void 0);
        if (s.route.lazy || v) {
          (o = !0), u >= 0 ? (l = l.slice(0, u + 1)) : (l = [l[0]]);
          break;
        }
      }
    }
  return l.reduceRight((a, s, m) => {
    let h,
      v = !1,
      g = null,
      x = null;
    n &&
      ((h = i && s.route.id ? i[s.route.id] : void 0),
      (g = s.route.errorElement || $m),
      o &&
        (u < 0 && m === 0
          ? (ff(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (v = !0),
            (x = null))
          : u === m &&
            ((v = !0), (x = s.route.hydrateFallbackElement || null))));
    let k = t.concat(l.slice(0, m + 1)),
      C = () => {
        let f;
        return (
          h
            ? (f = g)
            : v
              ? (f = x)
              : s.route.Component
                ? (f = y.createElement(s.route.Component, null))
                : s.route.element
                  ? (f = s.route.element)
                  : (f = a),
          y.createElement(Um, {
            match: s,
            routeContext: { outlet: a, matches: k, isDataRoute: n != null },
            children: f,
          })
        );
      };
    return n && (s.route.ErrorBoundary || s.route.errorElement || m === 0)
      ? y.createElement(Dm, {
          location: n.location,
          revalidation: n.revalidation,
          component: g,
          error: h,
          children: C(),
          routeContext: { outlet: null, matches: k, isDataRoute: !0 },
        })
      : C();
  }, null);
}
function pu(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Bm(e) {
  let t = y.useContext(Sn);
  return W(t, pu(e)), t;
}
function Hm(e) {
  let t = y.useContext(Hl);
  return W(t, pu(e)), t;
}
function Wm(e) {
  let t = y.useContext(lt);
  return W(t, pu(e)), t;
}
function mu(e) {
  let t = Wm(e),
    n = t.matches[t.matches.length - 1];
  return (
    W(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
    n.route.id
  );
}
function Vm() {
  return mu("useRouteId");
}
function Qm() {
  var r;
  let e = y.useContext(du),
    t = Hm("useRouteError"),
    n = mu("useRouteError");
  return e !== void 0 ? e : (r = t.errors) == null ? void 0 : r[n];
}
function Km() {
  let { router: e } = Bm("useNavigate"),
    t = mu("useNavigate"),
    n = y.useRef(!1);
  return (
    sf(() => {
      n.current = !0;
    }),
    y.useCallback(
      async (l, i = {}) => {
        Ve(n.current, af),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : await e.navigate(l, { fromRouteId: t, ...i }));
      },
      [e, t],
    )
  );
}
var Ia = {};
function ff(e, t, n) {
  !t && !Ia[e] && ((Ia[e] = !0), Ve(!1, n));
}
y.memo(Ym);
function Ym({ routes: e, future: t, state: n }) {
  return cf(e, void 0, n, t);
}
function Qt(e) {
  W(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function Gm({
  basename: e = "/",
  children: t = null,
  location: n,
  navigationType: r = "POP",
  navigator: l,
  static: i = !1,
}) {
  W(
    !yr(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let o = e.replace(/^\/*/, "/"),
    u = y.useMemo(
      () => ({ basename: o, navigator: l, static: i, future: {} }),
      [o, l, i],
    );
  typeof n == "string" && (n = kn(n));
  let {
      pathname: a = "/",
      search: s = "",
      hash: m = "",
      state: h = null,
      key: v = "default",
    } = n,
    g = y.useMemo(() => {
      let x = nt(a, o);
      return x == null
        ? null
        : {
            location: { pathname: x, search: s, hash: m, state: h, key: v },
            navigationType: r,
          };
    }, [o, a, s, m, h, v, r]);
  return (
    Ve(
      g != null,
      `<Router basename="${o}"> is not able to match the URL "${a}${s}${m}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    g == null
      ? null
      : y.createElement(
          Qe.Provider,
          { value: u },
          y.createElement(vr.Provider, { children: t, value: g }),
        )
  );
}
function Xm({ children: e, location: t }) {
  return Im(vo(e), t);
}
function vo(e, t = []) {
  let n = [];
  return (
    y.Children.forEach(e, (r, l) => {
      if (!y.isValidElement(r)) return;
      let i = [...t, l];
      if (r.type === y.Fragment) {
        n.push.apply(n, vo(r.props.children, i));
        return;
      }
      W(
        r.type === Qt,
        `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        W(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes.",
        );
      let o = {
        id: r.props.id || i.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (o.children = vo(r.props.children, i)), n.push(o);
    }),
    n
  );
}
var Jr = "get",
  qr = "application/x-www-form-urlencoded";
function Wl(e) {
  return e != null && typeof e.tagName == "string";
}
function Zm(e) {
  return Wl(e) && e.tagName.toLowerCase() === "button";
}
function Jm(e) {
  return Wl(e) && e.tagName.toLowerCase() === "form";
}
function qm(e) {
  return Wl(e) && e.tagName.toLowerCase() === "input";
}
function bm(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function eh(e, t) {
  return e.button === 0 && (!t || t === "_self") && !bm(e);
}
var Dr = null;
function th() {
  if (Dr === null)
    try {
      new FormData(document.createElement("form"), 0), (Dr = !1);
    } catch {
      Dr = !0;
    }
  return Dr;
}
var nh = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function ki(e) {
  return e != null && !nh.has(e)
    ? (Ve(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${qr}"`,
      ),
      null)
    : e;
}
function rh(e, t) {
  let n, r, l, i, o;
  if (Jm(e)) {
    let u = e.getAttribute("action");
    (r = u ? nt(u, t) : null),
      (n = e.getAttribute("method") || Jr),
      (l = ki(e.getAttribute("enctype")) || qr),
      (i = new FormData(e));
  } else if (Zm(e) || (qm(e) && (e.type === "submit" || e.type === "image"))) {
    let u = e.form;
    if (u == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let a = e.getAttribute("formaction") || u.getAttribute("action");
    if (
      ((r = a ? nt(a, t) : null),
      (n = e.getAttribute("formmethod") || u.getAttribute("method") || Jr),
      (l =
        ki(e.getAttribute("formenctype")) ||
        ki(u.getAttribute("enctype")) ||
        qr),
      (i = new FormData(u, e)),
      !th())
    ) {
      let { name: s, type: m, value: h } = e;
      if (m === "image") {
        let v = s ? `${s}.` : "";
        i.append(`${v}x`, "0"), i.append(`${v}y`, "0");
      } else s && i.append(s, h);
    }
  } else {
    if (Wl(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (n = Jr), (r = null), (l = qr), (o = e);
  }
  return (
    i && l === "text/plain" && ((o = i), (i = void 0)),
    { action: r, method: n.toLowerCase(), encType: l, formData: i, body: o }
  );
}
function hu(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
async function lh(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await import(e.module);
    return (t[e.id] = n), n;
  } catch (n) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(n),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function ih(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function oh(e, t, n) {
  let r = await Promise.all(
    e.map(async (l) => {
      let i = t.routes[l.route.id];
      if (i) {
        let o = await lh(i, n);
        return o.links ? o.links() : [];
      }
      return [];
    }),
  );
  return ch(
    r
      .flat(1)
      .filter(ih)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" },
      ),
  );
}
function Fa(e, t, n, r, l, i) {
  let o = (a, s) => (n[s] ? a.route.id !== n[s].route.id : !0),
    u = (a, s) => {
      var m;
      return (
        n[s].pathname !== a.pathname ||
        (((m = n[s].route.path) == null ? void 0 : m.endsWith("*")) &&
          n[s].params["*"] !== a.params["*"])
      );
    };
  return i === "assets"
    ? t.filter((a, s) => o(a, s) || u(a, s))
    : i === "data"
      ? t.filter((a, s) => {
          var h;
          let m = r.routes[a.route.id];
          if (!m || !m.hasLoader) return !1;
          if (o(a, s) || u(a, s)) return !0;
          if (a.route.shouldRevalidate) {
            let v = a.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin,
              ),
              currentParams: ((h = n[0]) == null ? void 0 : h.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: a.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof v == "boolean") return v;
          }
          return !0;
        })
      : [];
}
function uh(e, t, { includeHydrateFallback: n } = {}) {
  return ah(
    e
      .map((r) => {
        let l = t.routes[r.route.id];
        if (!l) return [];
        let i = [l.module];
        return (
          l.clientActionModule && (i = i.concat(l.clientActionModule)),
          l.clientLoaderModule && (i = i.concat(l.clientLoaderModule)),
          n &&
            l.hydrateFallbackModule &&
            (i = i.concat(l.hydrateFallbackModule)),
          l.imports && (i = i.concat(l.imports)),
          i
        );
      })
      .flat(1),
  );
}
function ah(e) {
  return [...new Set(e)];
}
function sh(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function ch(e, t) {
  let n = new Set();
  return (
    new Set(t),
    e.reduce((r, l) => {
      let i = JSON.stringify(sh(l));
      return n.has(i) || (n.add(i), r.push({ key: i, link: l })), r;
    }, [])
  );
}
function fh(e, t) {
  let n =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    n.pathname === "/"
      ? (n.pathname = "_root.data")
      : t && nt(n.pathname, t) === "/"
        ? (n.pathname = `${t.replace(/\/$/, "")}/_root.data`)
        : (n.pathname = `${n.pathname.replace(/\/$/, "")}.data`),
    n
  );
}
function df() {
  let e = y.useContext(Sn);
  return (
    hu(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function dh() {
  let e = y.useContext(Hl);
  return (
    hu(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var vu = y.createContext(void 0);
vu.displayName = "FrameworkContext";
function pf() {
  let e = y.useContext(vu);
  return (
    hu(e, "You must render this element inside a <HydratedRouter> element"), e
  );
}
function ph(e, t) {
  let n = y.useContext(vu),
    [r, l] = y.useState(!1),
    [i, o] = y.useState(!1),
    {
      onFocus: u,
      onBlur: a,
      onMouseEnter: s,
      onMouseLeave: m,
      onTouchStart: h,
    } = t,
    v = y.useRef(null);
  y.useEffect(() => {
    if ((e === "render" && o(!0), e === "viewport")) {
      let k = (f) => {
          f.forEach((c) => {
            o(c.isIntersecting);
          });
        },
        C = new IntersectionObserver(k, { threshold: 0.5 });
      return (
        v.current && C.observe(v.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [e]),
    y.useEffect(() => {
      if (r) {
        let k = setTimeout(() => {
          o(!0);
        }, 100);
        return () => {
          clearTimeout(k);
        };
      }
    }, [r]);
  let g = () => {
      l(!0);
    },
    x = () => {
      l(!1), o(!1);
    };
  return n
    ? e !== "intent"
      ? [i, v, {}]
      : [
          i,
          v,
          {
            onFocus: On(u, g),
            onBlur: On(a, x),
            onMouseEnter: On(s, g),
            onMouseLeave: On(m, x),
            onTouchStart: On(h, g),
          },
        ]
    : [!1, v, {}];
}
function On(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function mh({ page: e, ...t }) {
  let { router: n } = df(),
    r = y.useMemo(() => ef(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return r ? y.createElement(vh, { page: e, matches: r, ...t }) : null;
}
function hh(e) {
  let { manifest: t, routeModules: n } = pf(),
    [r, l] = y.useState([]);
  return (
    y.useEffect(() => {
      let i = !1;
      return (
        oh(e, t, n).then((o) => {
          i || l(o);
        }),
        () => {
          i = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function vh({ page: e, matches: t, ...n }) {
  let r = Wt(),
    { manifest: l, routeModules: i } = pf(),
    { basename: o } = df(),
    { loaderData: u, matches: a } = dh(),
    s = y.useMemo(() => Fa(e, t, a, l, r, "data"), [e, t, a, l, r]),
    m = y.useMemo(() => Fa(e, t, a, l, r, "assets"), [e, t, a, l, r]),
    h = y.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let x = new Set(),
        k = !1;
      if (
        (t.forEach((f) => {
          var d;
          let c = l.routes[f.route.id];
          !c ||
            !c.hasLoader ||
            ((!s.some((w) => w.route.id === f.route.id) &&
              f.route.id in u &&
              (d = i[f.route.id]) != null &&
              d.shouldRevalidate) ||
            c.hasClientLoader
              ? (k = !0)
              : x.add(f.route.id));
        }),
        x.size === 0)
      )
        return [];
      let C = fh(e, o);
      return (
        k &&
          x.size > 0 &&
          C.searchParams.set(
            "_routes",
            t
              .filter((f) => x.has(f.route.id))
              .map((f) => f.route.id)
              .join(","),
          ),
        [C.pathname + C.search]
      );
    }, [o, u, r, l, s, t, e, i]),
    v = y.useMemo(() => uh(m, l), [m, l]),
    g = hh(m);
  return y.createElement(
    y.Fragment,
    null,
    h.map((x) =>
      y.createElement("link", {
        key: x,
        rel: "prefetch",
        as: "fetch",
        href: x,
        ...n,
      }),
    ),
    v.map((x) =>
      y.createElement("link", { key: x, rel: "modulepreload", href: x, ...n }),
    ),
    g.map(({ key: x, link: k }) => y.createElement("link", { key: x, ...k })),
  );
}
function yh(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
var mf =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  mf && (window.__reactRouterVersion = "7.3.0");
} catch {}
function gh({ basename: e, children: t, window: n }) {
  let r = y.useRef();
  r.current == null && (r.current = om({ window: n, v5Compat: !0 }));
  let l = r.current,
    [i, o] = y.useState({ action: l.action, location: l.location }),
    u = y.useCallback(
      (a) => {
        y.startTransition(() => o(a));
      },
      [o],
    );
  return (
    y.useLayoutEffect(() => l.listen(u), [l, u]),
    y.createElement(Gm, {
      basename: e,
      children: t,
      location: i.location,
      navigationType: i.action,
      navigator: l,
    })
  );
}
var hf = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  oe = y.forwardRef(function (
    {
      onClick: t,
      discover: n = "render",
      prefetch: r = "none",
      relative: l,
      reloadDocument: i,
      replace: o,
      state: u,
      target: a,
      to: s,
      preventScrollReset: m,
      viewTransition: h,
      ...v
    },
    g,
  ) {
    let { basename: x } = y.useContext(Qe),
      k = typeof s == "string" && hf.test(s),
      C,
      f = !1;
    if (typeof s == "string" && k && ((C = s), mf))
      try {
        let M = new URL(window.location.href),
          L = s.startsWith("//") ? new URL(M.protocol + s) : new URL(s),
          de = nt(L.pathname, x);
        L.origin === M.origin && de != null
          ? (s = de + L.search + L.hash)
          : (f = !0);
      } catch {
        Ve(
          !1,
          `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let c = Tm(s, { relative: l }),
      [d, w, E] = ph(r, v),
      P = Sh(s, {
        replace: o,
        state: u,
        target: a,
        preventScrollReset: m,
        relative: l,
        viewTransition: h,
      });
    function j(M) {
      t && t(M), M.defaultPrevented || P(M);
    }
    let R = y.createElement("a", {
      ...v,
      ...E,
      href: C || c,
      onClick: f || i ? t : j,
      ref: yh(g, w),
      target: a,
      "data-discover": !k && n === "render" ? "true" : void 0,
    });
    return d && !k
      ? y.createElement(y.Fragment, null, R, y.createElement(mh, { page: c }))
      : R;
  });
oe.displayName = "Link";
var xh = y.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: n = !1,
    className: r = "",
    end: l = !1,
    style: i,
    to: o,
    viewTransition: u,
    children: a,
    ...s
  },
  m,
) {
  let h = gr(o, { relative: s.relative }),
    v = Wt(),
    g = y.useContext(Hl),
    { navigator: x, basename: k } = y.useContext(Qe),
    C = g != null && jh(h) && u === !0,
    f = x.encodeLocation ? x.encodeLocation(h).pathname : h.pathname,
    c = v.pathname,
    d =
      g && g.navigation && g.navigation.location
        ? g.navigation.location.pathname
        : null;
  n ||
    ((c = c.toLowerCase()),
    (d = d ? d.toLowerCase() : null),
    (f = f.toLowerCase())),
    d && k && (d = nt(d, k) || d);
  const w = f !== "/" && f.endsWith("/") ? f.length - 1 : f.length;
  let E = c === f || (!l && c.startsWith(f) && c.charAt(w) === "/"),
    P =
      d != null &&
      (d === f || (!l && d.startsWith(f) && d.charAt(f.length) === "/")),
    j = { isActive: E, isPending: P, isTransitioning: C },
    R = E ? t : void 0,
    M;
  typeof r == "function"
    ? (M = r(j))
    : (M = [
        r,
        E ? "active" : null,
        P ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let L = typeof i == "function" ? i(j) : i;
  return y.createElement(
    oe,
    {
      ...s,
      "aria-current": R,
      className: M,
      ref: m,
      style: L,
      to: o,
      viewTransition: u,
    },
    typeof a == "function" ? a(j) : a,
  );
});
xh.displayName = "NavLink";
var wh = y.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: l,
      state: i,
      method: o = Jr,
      action: u,
      onSubmit: a,
      relative: s,
      preventScrollReset: m,
      viewTransition: h,
      ...v
    },
    g,
  ) => {
    let x = Nh(),
      k = _h(u, { relative: s }),
      C = o.toLowerCase() === "get" ? "get" : "post",
      f = typeof u == "string" && hf.test(u),
      c = (d) => {
        if ((a && a(d), d.defaultPrevented)) return;
        d.preventDefault();
        let w = d.nativeEvent.submitter,
          E = (w == null ? void 0 : w.getAttribute("formmethod")) || o;
        x(w || d.currentTarget, {
          fetcherKey: t,
          method: E,
          navigate: n,
          replace: l,
          state: i,
          relative: s,
          preventScrollReset: m,
          viewTransition: h,
        });
      };
    return y.createElement("form", {
      ref: g,
      method: C,
      action: k,
      onSubmit: r ? a : c,
      ...v,
      "data-discover": !f && e === "render" ? "true" : void 0,
    });
  },
);
wh.displayName = "Form";
function kh(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function vf(e) {
  let t = y.useContext(Sn);
  return W(t, kh(e)), t;
}
function Sh(
  e,
  {
    target: t,
    replace: n,
    state: r,
    preventScrollReset: l,
    relative: i,
    viewTransition: o,
  } = {},
) {
  let u = Om(),
    a = Wt(),
    s = gr(e, { relative: i });
  return y.useCallback(
    (m) => {
      if (eh(m, t)) {
        m.preventDefault();
        let h = n !== void 0 ? n : cr(a) === cr(s);
        u(e, {
          replace: h,
          state: r,
          preventScrollReset: l,
          relative: i,
          viewTransition: o,
        });
      }
    },
    [a, u, s, n, r, t, e, l, i, o],
  );
}
var Eh = 0,
  Ch = () => `__${String(++Eh)}__`;
function Nh() {
  let { router: e } = vf("useSubmit"),
    { basename: t } = y.useContext(Qe),
    n = Vm();
  return y.useCallback(
    async (r, l = {}) => {
      let { action: i, method: o, encType: u, formData: a, body: s } = rh(r, t);
      if (l.navigate === !1) {
        let m = l.fetcherKey || Ch();
        await e.fetch(m, n, l.action || i, {
          preventScrollReset: l.preventScrollReset,
          formData: a,
          body: s,
          formMethod: l.method || o,
          formEncType: l.encType || u,
          flushSync: l.flushSync,
        });
      } else
        await e.navigate(l.action || i, {
          preventScrollReset: l.preventScrollReset,
          formData: a,
          body: s,
          formMethod: l.method || o,
          formEncType: l.encType || u,
          replace: l.replace,
          state: l.state,
          fromRouteId: n,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        });
    },
    [e, t, n],
  );
}
function _h(e, { relative: t } = {}) {
  let { basename: n } = y.useContext(Qe),
    r = y.useContext(lt);
  W(r, "useFormAction must be used inside a RouteContext");
  let [l] = r.matches.slice(-1),
    i = { ...gr(e || ".", { relative: t }) },
    o = Wt();
  if (e == null) {
    i.search = o.search;
    let u = new URLSearchParams(i.search),
      a = u.getAll("index");
    if (a.some((m) => m === "")) {
      u.delete("index"),
        a.filter((h) => h).forEach((h) => u.append("index", h));
      let m = u.toString();
      i.search = m ? `?${m}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      l.route.index &&
      (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"),
    n !== "/" && (i.pathname = i.pathname === "/" ? n : Je([n, i.pathname])),
    cr(i)
  );
}
function jh(e, t = {}) {
  let n = y.useContext(uf);
  W(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = vf("useViewTransitionState"),
    l = gr(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let i = nt(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = nt(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return El(l.pathname, o) != null || El(l.pathname, i) != null;
}
new TextEncoder();
const Ph = "_header_77urf_11",
  Rh = "_glow_77urf_20",
  Lh = "_lcab_77urf_34",
  zh = "_logo_77urf_49",
  Th = "_register_link_77urf_65",
  Me = { header: Ph, glow: Rh, lcab: Lh, logo: zh, register_link: Th },
  Vl = "/assets/logo1-CTk4f3bk.png",
  Oh = () =>
    p.jsx("div", {
      className: "h-screen flex items-center justify-center",
      children: p.jsxs("div", {
        className:
          "flex flex-col p-5 bg-[#1A1A1A] rounded-xl h-[500px] w-[600px] justify-between",
        children: [
          p.jsxs("div", {
            className: "flex items-center",
            children: [
              p.jsx(oe, {
                to: "/",
                children: p.jsx("img", {
                  src: Vl,
                  className: `${Me.logo} ml-8 mr-16`,
                }),
              }),
              p.jsx("p", {
                className:
                  "text-[#d1e349] text-center text-3xl font-[Montserrat] pt-2",
                children: "Авторизация",
              }),
            ],
          }),
          p.jsxs("form", {
            method: "post",
            action: "/api/login",
            children: [
              p.jsx("label", {
                class: "block mb-2 text-[#d1e349] font-[Montserrat] ml-10",
                children: "Email:",
              }),
              p.jsx("input", {
                type: "email",
                name: "email",
                required: !0,
                className:
                  "p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349]",
              }),
              p.jsx("label", {
                class: "block mb-2 text-[#d1e349] font-[Montserrat] ml-10",
                children: "Пароль:",
              }),
              p.jsx("input", {
                type: "password",
                name: "password",
                required: !0,
                className:
                  "p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116]",
              }),
              p.jsx("div", {
                className: "flex w-[560px] px-10 py-[30px]",
                children: p.jsx(St, { title: "Войти" }),
              }),
            ],
          }),
          p.jsxs("div", {
            className: "flex flex-row items-center justify-center",
            children: [
              p.jsx("p", {
                className:
                  "text-[#d1e349] text-center text-sm mr-1 font-[Montserrat]",
                children: "У вас еще нет аккаунта?",
              }),
              p.jsx(oe, {
                to: "/register",
                children: p.jsx("p", {
                  className: `${Me.glow} text-center text-l underline`,
                  children: "Зарегистрируйтесь!",
                }),
              }),
            ],
          }),
        ],
      }),
    }),
  Mh = "/assets/lk-GR7a3H4D.png";
function yu({ user: e }) {
  return p.jsx("header", {
    className: Me.header,
    children: p.jsxs("div", {
      className: "l:w-[92%] h-full mx-auto my-0 block clear-fix",
      children: [
        p.jsx("div", {
          className: "float-left table h-full px-[1%]",
          children: p.jsx(oe, {
            to: "/",
            children: p.jsx("img", { src: Vl, className: Me.logo }),
          }),
        }),
        p.jsxs("div", {
          className: "l:text-2xl m:text-lg s:text-lg  table h-full float-right",
          children: [
            p.jsx("div", {
              className: "l:px-10 m:px-7 s:hidden align-middle table-cell",
              children: p.jsx("h1", {
                className: Me.glow,
                children: "Рекомендации",
              }),
            }),
            p.jsx("div", {
              className: "l:px-10 m:px-7 s:px-3 align-middle table-cell",
              children: p.jsxs("h1", {
                className: Me.glow,
                children: [
                  p.jsx("div", {
                    className: "float-left px-0",
                    children: "💛",
                  }),
                  " Избранное ",
                ],
              }),
            }),
            p.jsx("form", {
              method: "post",
              action: "/",
              className: "l:px-10 m:px-5 s:px-3  align-middle table-cell",
              children: p.jsx("input", {
                className:
                  "h-1/2 l:w-[600px] m:w-[400px] s:w-60 rounded-3xl outline-none px-6 mx-0 bg-[#4d4d4d] flex",
                placeholder: "Поиск",
              }),
            }),
            p.jsx("div", {
              className: "flex justify-center items-center h-full",
              children: e
                ? p.jsx("div", {
                    className: "l:px-0 m:px-5 s:px-3",
                    children: p.jsx(oe, {
                      to: "/user",
                      children: p.jsx("img", { src: Mh, className: Me.lcab }),
                    }),
                  })
                : p.jsxs(p.Fragment, {
                    children: [
                      p.jsx(oe, {
                        to: "/login",
                        children: p.jsx(St, {
                          title: "Войти",
                          children: p.jsx("p", {
                            className: `${Me.glow} l:text-m px-2 s:text-sm`,
                            children: "Войти",
                          }),
                        }),
                      }),
                      p.jsx("div", {
                        className: "l:px-0 m:px-5 s:px-3",
                        children: "/",
                      }),
                      p.jsx(oe, {
                        to: "/register",
                        children: p.jsx(St, {
                          title: "Регистрация",
                          children: p.jsx("p", {
                            className: `${Me.glow} l:text-m px-2 s:text-sm`,
                            children: "Регистрация",
                          }),
                        }),
                      }),
                    ],
                  }),
            }),
          ],
        }),
      ],
    }),
  });
}
function Ih({ props: e }) {
  return p.jsxs("div", {
    className: "bg-[#222222] my-8 mx-10",
    children: [
      p.jsxs("div", {
        className: "h-[400px] bg-[#2e2c2c] w-1/4 min-w-80",
        id: "Description",
        children: [
          p.jsx("h1", {
            className: "text-[#DBF231] text-4xl px-20 py-5",
            children: e.logo,
          }),
          p.jsxs("div", {
            className: "description px-16 text-xl",
            children: [
              p.jsx("p", { className: "", children: e.description }),
              p.jsx("p", { className: "py-1", children: "Ну актеры мб" }),
            ],
          }),
        ],
      }),
      p.jsx("div", { className: "premiere-image" }),
    ],
  });
}
const Fh = {};
function $h(e) {
  return e.length > 35 ? e.slice(0, 35) + "..." : e;
}
const ge = (e) =>
    p.jsxs("div", {
      className: "overflow-hidden",
      children: [
        p.jsxs("div", {
          className:
            "mx-7 my-5 center border border-sky-50 w-[150px]  h-[240px]",
          id: "FilmCard",
          children: [
            p.jsxs("div", {
              id: "Image",
              className: "max-w-[150px] max-h-[240px] relative",
              children: [
                p.jsx("img", {
                  src: Vl,
                  alt: "Логотип",
                  className: Fh.picture,
                }),
                p.jsx("div", {
                  id: "rate",
                  className: `absolute top-1 right-1 px-2 rounded-lg ${e.rate < 5 ? "bg-red-500" : e.rate >= 7 ? "bg-green-500" : "bg-gray-500"}`,
                  children: p.jsx("p", { children: e.rate }),
                }),
              ],
            }),
            p.jsx("p", {}),
          ],
        }),
        p.jsx("p", {
          id: "description",
          className: "translate-x-7 -translate-y-5  w-[160px] my-6",
          children: $h(e.name),
        }),
      ],
    }),
  Dh = "_glow_gdwvv_1",
  Uh = "_scrollbar_hidden_gdwvv_14",
  Ah = { glow: Dh, scrollbar_hidden: Uh };
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bh = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Hh = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, n, r) =>
      r ? r.toUpperCase() : n.toLowerCase(),
    ),
  $a = (e) => {
    const t = Hh(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  yf = (...e) =>
    e
      .filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Wh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vh = y.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: l = "",
      children: i,
      iconNode: o,
      ...u
    },
    a,
  ) =>
    y.createElement(
      "svg",
      {
        ref: a,
        ...Wh,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: yf("lucide", l),
        ...u,
      },
      [
        ...o.map(([s, m]) => y.createElement(s, m)),
        ...(Array.isArray(i) ? i : [i]),
      ],
    ),
);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gf = (e, t) => {
  const n = y.forwardRef(({ className: r, ...l }, i) =>
    y.createElement(Vh, {
      ref: i,
      iconNode: t,
      className: yf(`lucide-${Bh($a(e))}`, `lucide-${e}`, r),
      ...l,
    }),
  );
  return (n.displayName = $a(e)), n;
};
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qh = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  Kh = gf("chevron-left", Qh);
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yh = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  Gh = gf("chevron-right", Yh),
  Xh = "_scrollbar_hidden_gxkyx_1",
  Zh = { scrollbar_hidden: Xh },
  gu = () => {
    const e = y.useRef(null),
      t = (n) => {
        e.current &&
          e.current.scrollBy({
            left: n === "left" ? -450 : 450,
            behavior: "smooth",
          });
      };
    return p.jsx("div", {
      className: "relative",
      children: p.jsxs("div", {
        className: "relative my-20 mx-14 bg-[#807878] h-[320px]",
        children: [
          p.jsx("button", {
            onClick: () => t("left"),
            className:
              "absolute left-2 top-[50%] transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80",
            children: p.jsx(Kh, { className: "text-white w-6 h-6" }),
          }),
          p.jsx("div", {
            className: `h-full overflow-x-auto ${Zh.scrollbar_hidden}`,
            ref: e,
            children: p.jsxs("div", {
              className: "flex flex-nowrap w-max",
              children: [
                p.jsx(ge, { name: "", rate: "7.5" }),
                p.jsx(ge, {
                  name: "",
                  image: "../../assets/pictues/search.png",
                }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
                p.jsx(ge, { name: "" }),
              ],
            }),
          }),
          p.jsx("button", {
            onClick: () => t("right"),
            className:
              "absolute right-2 top-[50%] transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80",
            children: p.jsx(Gh, { className: "text-white w-6 h-6" }),
          }),
        ],
      }),
    });
  },
  xu = () => (
    y.useRef(null),
    p.jsxs(p.Fragment, {
      children: [
        p.jsx(oe, {
          to: "/features",
          children: p.jsxs("h1", {
            className: `mx-20 translate-y-[60px] text-3xl ${Ah.glow} w-[240px]`,
            children: ["Уже в кино ", ">", " "],
          }),
        }),
        p.jsx(gu, {}),
      ],
    })
  );
var xf = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Da = Ot.createContext && Ot.createContext(xf),
  Jh = ["attr", "size", "title"];
function qh(e, t) {
  if (e == null) return {};
  var n = bh(e, t),
    r,
    l;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (l = 0; l < i.length; l++)
      (r = i[l]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function bh(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Cl() {
  return (
    (Cl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Cl.apply(this, arguments)
  );
}
function Ua(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (l) {
        return Object.getOwnPropertyDescriptor(e, l).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Nl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ua(Object(n), !0).forEach(function (r) {
          ev(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ua(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function ev(e, t, n) {
  return (
    (t = tv(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function tv(e) {
  var t = nv(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nv(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wf(e) {
  return (
    e &&
    e.map((t, n) =>
      Ot.createElement(t.tag, Nl({ key: n }, t.attr), wf(t.child)),
    )
  );
}
function kf(e) {
  return (t) =>
    Ot.createElement(rv, Cl({ attr: Nl({}, e.attr) }, t), wf(e.child));
}
function rv(e) {
  var t = (n) => {
    var { attr: r, size: l, title: i } = e,
      o = qh(e, Jh),
      u = l || n.size || "1em",
      a;
    return (
      n.className && (a = n.className),
      e.className && (a = (a ? a + " " : "") + e.className),
      Ot.createElement(
        "svg",
        Cl(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          o,
          {
            className: a,
            style: Nl(Nl({ color: e.color || n.color }, n.style), e.style),
            height: u,
            width: u,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        i && Ot.createElement("title", null, i),
        e.children,
      )
    );
  };
  return Da !== void 0
    ? Ot.createElement(Da.Consumer, null, (n) => t(n))
    : t(xf);
}
function lv(e) {
  return kf({
    tag: "svg",
    attr: { viewBox: "0 0 496 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
        },
        child: [],
      },
    ],
  })(e);
}
function iv(e) {
  return kf({
    tag: "svg",
    attr: { viewBox: "0 0 496 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z",
        },
        child: [],
      },
    ],
  })(e);
}
const ov = "_glow_6e9a5_1",
  Aa = { glow: ov },
  uv = () =>
    p.jsxs("div", {
      className: "bg-black h-[110px] flex items-center justify-end",
      children: [
        p.jsx("div", {}),
        p.jsxs("div", {
          className: "items-center flex",
          children: [
            p.jsx("div", {
              className: `${Aa.glow} text-3xl justify-center `,
              id: "Contacts",
              children: p.jsx(oe, {
                to: "https://github.com/REL4T1N/it_project",
                children: p.jsx(lv, {}),
              }),
            }),
            p.jsx("div", {
              className: `${Aa.glow} text-3xl justify-center px-5`,
              id: "Contacts",
              children: p.jsx(oe, {
                to: "https://www.google.com/",
                children: p.jsx(iv, {}),
              }),
            }),
          ],
        }),
      ],
    }),
  av = "_glow_1g3ld_1",
  sv = { glow: av },
  cv = () =>
    p.jsxs("div", {
      children: [
        p.jsx(oe, {
          to: "/articles",
          children: p.jsxs("h1", {
            className: `mx-20 translate-y-[60px] text-3xl ${sv.glow} w-[240px]`,
            children: ["Статьи ", ">", " "],
          }),
        }),
        p.jsx(gu, {}),
      ],
    });
function fv() {
  async function e() {
    const r = await fetch("api/users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (r.ok) {
      const l = await r.json();
      n(l.user);
    }
  }
  const [t, n] = y.useState(null);
  return (
    y.useEffect(() => {
      e();
    }, []),
    p.jsxs(p.Fragment, {
      children: [
        p.jsx(yu, { user: t }),
        p.jsx(Ih, { props: { description: "Длинное описание" } }),
        p.jsx(xu, {}),
        p.jsx(cv, {}),
        p.jsx(gu, {}),
        p.jsx(uv, {}),
      ],
    })
  );
}
const dv = () =>
    p.jsx("div", {
      className: "h-screen flex items-center justify-center",
      children: p.jsxs("div", {
        className:
          "flex flex-col p-5 bg-[#1A1A1A] rounded-xl h-[600px] w-[600px] justify-between",
        children: [
          p.jsxs("div", {
            className: "flex items-center",
            children: [
              p.jsx(oe, {
                to: "/",
                children: p.jsx("img", {
                  src: Vl,
                  className: `${Me.logo} ml-8 mr-16`,
                }),
              }),
              p.jsx("p", {
                className:
                  "text-[#d1e349] text-center text-3xl font-[Montserrat] pt-2",
                children: "Регистрация",
              }),
            ],
          }),
          p.jsx("label", {
            className: "block mb-2 text-[#d1e349] font-[Montserrat] ml-10",
            children: "Имя пользователя:",
          }),
          p.jsx("input", {
            type: "text",
            name: "username",
            required: !0,
            className:
              "p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349]",
          }),
          p.jsx("label", {
            className: "block mb-2 text-[#d1e349] font-[Montserrat] ml-10",
            children: "Email:",
          }),
          p.jsx("input", {
            type: "email",
            name: "email",
            required: !0,
            className:
              "p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349]",
          }),
          p.jsx("label", {
            className: "block mb-2 text-[#d1e349] font-[Montserrat] ml-10",
            children: "Пароль:",
          }),
          p.jsx("input", {
            type: "password",
            name: "password",
            required: !0,
            className:
              "p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116]",
          }),
          p.jsx("div", {
            className: "flex w-[560px] px-10 py-[30px]",
            children: p.jsx(St, { title: "Зарегистрироваться" }),
          }),
          p.jsxs("div", {
            className: "flex flex-row items-center justify-center",
            children: [
              p.jsx("p", {
                className:
                  "text-[#d1e349] text-center text-sm mr-1 font-[Montserrat]",
                children: "Уже есть аккаунт?",
              }),
              p.jsx(oe, {
                to: "/login",
                children: p.jsx("p", {
                  className: `${Me.glow} text-center text-l underline`,
                  children: "Вход",
                }),
              }),
            ],
          }),
        ],
      }),
    }),
  pv = () => {
    async function e() {
      const r = await fetch("http://localhost:8000/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (r.ok) {
        const l = await r.json();
        n(l.user);
      }
    }
    const [t, n] = y.useState(null);
    return (
      y.useEffect(() => {
        e();
      }, []),
      p.jsxs(p.Fragment, {
        children: [
          p.jsx(yu, { user: t }),
          p.jsxs("div", {
            className: "py-[100px]",
            children: [
              p.jsxs("div", {
                className: "h-[90%] flex px-[7%] items-start justify-center",
                children: [
                  p.jsxs("div", {
                    children: [
                      p.jsx("div", {
                        className:
                          "flex flex-col p-5 bg-[#1A1A1A] rounded-full h-[400px] w-[400px] justify-between mx-32 -translate-x-35 relative",
                      }),
                      p.jsx("div", {
                        className: "flex items-center justify-center mt-4",
                        children: p.jsx("p", {
                          className:
                            "text-[#f4ff54] text-center text-3xl font-[Montserrat]",
                          children: "Nickname",
                        }),
                      }),
                      p.jsx("div", {
                        children: p.jsx("div", {
                          className: "flex items-start justify-center",
                          children: p.jsx(oe, {
                            to: "/user/settings",
                            children: p.jsx("div", {
                              className: "flex w-[400px] px-10 py-[30px]",
                              children: p.jsx(St, {
                                title: "Редактировать профиль",
                              }),
                            }),
                          }),
                        }),
                      }),
                      p.jsx("div", {
                        className: "flex items-start justify-center",
                        children: p.jsx("form", {
                          method: "post",
                          action: "/api/logout",
                          children: p.jsx("div", {
                            className: "flex w-[400px] px-10 py-[10px]",
                            children: p.jsx(St, { title: "Выйти" }),
                          }),
                        }),
                      }),
                    ],
                  }),
                  p.jsxs("div", {
                    className:
                      "flex flex-col p-5 bg-[#1A1A1A] w-[900px] h-[600px] justify-beetwen py-[80px] px-[-20] rounded-xl",
                    children: [
                      p.jsx("div", {
                        className: "flex items-center",
                        children: p.jsx("p", {
                          className:
                            "text-[#f4ff54] text-center text-3xl font-[Montserrat] pt-2",
                          children: "Личный профиль",
                        }),
                      }),
                      p.jsxs("div", {
                        className: "flex flex-col items-start",
                        children: [
                          p.jsx("p", {
                            className:
                              "text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2",
                            children: "Имя: бебра",
                          }),
                          p.jsx("p", {
                            className:
                              "text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2",
                            children: "Email: бебра.com",
                          }),
                          p.jsx("p", {
                            className:
                              "text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2",
                            children: "О себе:",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              p.jsx(xu, {}),
            ],
          }),
        ],
      })
    );
  },
  mv = () => {
    async function e() {
      const l = await fetch("api/users/{user.id}", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (l.ok) {
        const i = await l.json();
        r(i.user);
      }
    }
    async function t(l, i, o, u) {
      (
        await fetch("http://localhost:8000/user", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: l,
            email: i,
            password: o,
            image: u,
          }),
        })
      ).ok && alert("User updated successfully");
    }
    const [n, r] = y.useState(null);
    return (
      y.useEffect(() => {
        e(), t();
      }, []),
      p.jsxs(p.Fragment, {
        children: [
          p.jsx(yu, { user: n }),
          p.jsxs("div", {
            className:
              "h-[90%] flex px-[7%] items-start justify-center py-[100px]",
            children: [
              p.jsxs("div", {
                children: [
                  p.jsx("div", {
                    className:
                      "flex flex-col p-5 bg-[#1A1A1A] rounded-full h-[400px] w-[400px] justify-between mx-32 -translate-x-35",
                    children: p.jsx("div", { className: "flex items-center" }),
                  }),
                  p.jsx("div", {
                    children: p.jsx("div", {
                      className: "flex items-start justify-center",
                      children: p.jsx(oe, {
                        to: "/user/settings",
                        children: p.jsx("div", {
                          className: "flex w-[400px] px-10 py-[30px]",
                          children: p.jsx(St, {
                            title: "Редактировать профиль",
                          }),
                        }),
                      }),
                    }),
                  }),
                  p.jsx("div", {
                    className: "flex items-start justify-center",
                    children: p.jsx("form", {
                      method: "post",
                      action: "/api/logout",
                      children: p.jsx("div", {
                        className: "flex w-[400px] px-10 py-[10px]",
                        children: p.jsx(St, { title: "Выйти" }),
                      }),
                    }),
                  }),
                ],
              }),
              p.jsxs("div", {
                className:
                  "flex flex-col p-5 bg-[#1A1A1A] w-[900px] h-[600px] justify-beetwen py-[80px] px-[-20]",
                children: [
                  p.jsx("div", {
                    className: "flex items-center",
                    children: p.jsx("p", {
                      className:
                        "text-[#f4ff54] text-center text-3xl font-[Montserrat] pt-2",
                      children: "Личный профиль",
                    }),
                  }),
                  p.jsxs("div", {
                    className: "flex flex-col items-center",
                    children: [
                      p.jsx("p", {
                        className:
                          "text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2",
                        children: "Имя: бебра",
                      }),
                      p.jsx("p", {
                        className:
                          "text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2",
                        children: "Email: бебра.com",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          p.jsx(xu, {}),
        ],
      })
    );
  };
function hv() {
  return p.jsx(gh, {
    children: p.jsxs(Xm, {
      children: [
        p.jsx(Qt, { path: "/", element: p.jsx(fv, {}) }),
        p.jsx(Qt, { path: "/login", element: p.jsx(Oh, {}) }),
        p.jsx(Qt, { path: "/register", element: p.jsx(dv, {}) }),
        p.jsx(Qt, { path: "/user", element: p.jsx(pv, {}) }),
        p.jsx(Qt, { path: "/user/settings", element: p.jsx(mv, {}) }),
      ],
    }),
  });
}
bc(document.getElementById("root")).render(
  p.jsx(y.StrictMode, { children: p.jsx(hv, {}) }),
);
