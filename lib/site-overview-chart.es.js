var Gg = (O) => {
  throw TypeError(O);
};
var $p = (O, x, L) => x.has(O) || Gg("Cannot " + L);
var X = (O, x, L) => ($p(O, x, "read from private field"), L ? L.call(O) : x.get(O)), Ht = (O, x, L) => x.has(O) ? Gg("Cannot add the same private member more than once") : x instanceof WeakSet ? x.add(O) : x.set(O, L), bt = (O, x, L, D) => ($p(O, x, "write to private field"), D ? D.call(O, L) : x.set(O, L), L), It = (O, x, L) => ($p(O, x, "access private method"), L);
var jf = (O, x, L, D) => ({
  set _(Q) {
    bt(O, x, Q, L);
  },
  get _() {
    return X(O, x, D);
  }
});
import * as Ga from "react";
import Kf from "react";
import jm from "react-dom";
function gm(O) {
  return O && O.__esModule && Object.prototype.hasOwnProperty.call(O, "default") ? O.default : O;
}
var tg = { exports: {} }, Lc = {}, eg = { exports: {} }, ig = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yg;
function Pm() {
  return Yg || (Yg = 1, function(O) {
    function x(K, ut) {
      var Rt = K.length;
      K.push(ut);
      t: for (; 0 < Rt; ) {
        var pe = Rt - 1 >>> 1, se = K[pe];
        if (0 < Q(se, ut))
          K[pe] = ut, K[Rt] = se, Rt = pe;
        else break t;
      }
    }
    function L(K) {
      return K.length === 0 ? null : K[0];
    }
    function D(K) {
      if (K.length === 0) return null;
      var ut = K[0], Rt = K.pop();
      if (Rt !== ut) {
        K[0] = Rt;
        t: for (var pe = 0, se = K.length, ai = se >>> 1; pe < ai; ) {
          var Te = 2 * (pe + 1) - 1, Ft = K[Te], ke = Te + 1, Qi = K[ke];
          if (0 > Q(Ft, Rt))
            ke < se && 0 > Q(Qi, Ft) ? (K[pe] = Qi, K[ke] = Rt, pe = ke) : (K[pe] = Ft, K[Te] = Rt, pe = Te);
          else if (ke < se && 0 > Q(Qi, Rt))
            K[pe] = Qi, K[ke] = Rt, pe = ke;
          else break t;
        }
      }
      return ut;
    }
    function Q(K, ut) {
      var Rt = K.sortIndex - ut.sortIndex;
      return Rt !== 0 ? Rt : K.id - ut.id;
    }
    if (O.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var et = performance;
      O.unstable_now = function() {
        return et.now();
      };
    } else {
      var at = Date, lt = at.now();
      O.unstable_now = function() {
        return at.now() - lt;
      };
    }
    var ct = [], Ot = [], pt = 1, ot = null, yt = 3, dt = !1, ft = !1, St = !1, xt = !1, Xt = typeof setTimeout == "function" ? setTimeout : null, st = typeof clearTimeout == "function" ? clearTimeout : null, mt = typeof setImmediate < "u" ? setImmediate : null;
    function Lt(K) {
      for (var ut = L(Ot); ut !== null; ) {
        if (ut.callback === null) D(Ot);
        else if (ut.startTime <= K)
          D(Ot), ut.sortIndex = ut.expirationTime, x(ct, ut);
        else break;
        ut = L(Ot);
      }
    }
    function _t(K) {
      if (St = !1, Lt(K), !ft)
        if (L(ct) !== null)
          ft = !0, te || (te = !0, Ce());
        else {
          var ut = L(Ot);
          ut !== null && _i(_t, ut.startTime - K);
        }
    }
    var te = !1, _e = -1, Z = 5, ee = -1;
    function ie() {
      return xt ? !0 : !(O.unstable_now() - ee < Z);
    }
    function Xe() {
      if (xt = !1, te) {
        var K = O.unstable_now();
        ee = K;
        var ut = !0;
        try {
          t: {
            ft = !1, St && (St = !1, st(_e), _e = -1), dt = !0;
            var Rt = yt;
            try {
              e: {
                for (Lt(K), ot = L(ct); ot !== null && !(ot.expirationTime > K && ie()); ) {
                  var pe = ot.callback;
                  if (typeof pe == "function") {
                    ot.callback = null, yt = ot.priorityLevel;
                    var se = pe(
                      ot.expirationTime <= K
                    );
                    if (K = O.unstable_now(), typeof se == "function") {
                      ot.callback = se, Lt(K), ut = !0;
                      break e;
                    }
                    ot === L(ct) && D(ct), Lt(K);
                  } else D(ct);
                  ot = L(ct);
                }
                if (ot !== null) ut = !0;
                else {
                  var ai = L(Ot);
                  ai !== null && _i(
                    _t,
                    ai.startTime - K
                  ), ut = !1;
                }
              }
              break t;
            } finally {
              ot = null, yt = Rt, dt = !1;
            }
            ut = void 0;
          }
        } finally {
          ut ? Ce() : te = !1;
        }
      }
    }
    var Ce;
    if (typeof mt == "function")
      Ce = function() {
        mt(Xe);
      };
    else if (typeof MessageChannel < "u") {
      var xa = new MessageChannel(), Ya = xa.port2;
      xa.port1.onmessage = Xe, Ce = function() {
        Ya.postMessage(null);
      };
    } else
      Ce = function() {
        Xt(Xe, 0);
      };
    function _i(K, ut) {
      _e = Xt(function() {
        K(O.unstable_now());
      }, ut);
    }
    O.unstable_IdlePriority = 5, O.unstable_ImmediatePriority = 1, O.unstable_LowPriority = 4, O.unstable_NormalPriority = 3, O.unstable_Profiling = null, O.unstable_UserBlockingPriority = 2, O.unstable_cancelCallback = function(K) {
      K.callback = null;
    }, O.unstable_forceFrameRate = function(K) {
      0 > K || 125 < K ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Z = 0 < K ? Math.floor(1e3 / K) : 5;
    }, O.unstable_getCurrentPriorityLevel = function() {
      return yt;
    }, O.unstable_next = function(K) {
      switch (yt) {
        case 1:
        case 2:
        case 3:
          var ut = 3;
          break;
        default:
          ut = yt;
      }
      var Rt = yt;
      yt = ut;
      try {
        return K();
      } finally {
        yt = Rt;
      }
    }, O.unstable_requestPaint = function() {
      xt = !0;
    }, O.unstable_runWithPriority = function(K, ut) {
      switch (K) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          K = 3;
      }
      var Rt = yt;
      yt = K;
      try {
        return ut();
      } finally {
        yt = Rt;
      }
    }, O.unstable_scheduleCallback = function(K, ut, Rt) {
      var pe = O.unstable_now();
      switch (typeof Rt == "object" && Rt !== null ? (Rt = Rt.delay, Rt = typeof Rt == "number" && 0 < Rt ? pe + Rt : pe) : Rt = pe, K) {
        case 1:
          var se = -1;
          break;
        case 2:
          se = 250;
          break;
        case 5:
          se = 1073741823;
          break;
        case 4:
          se = 1e4;
          break;
        default:
          se = 5e3;
      }
      return se = Rt + se, K = {
        id: pt++,
        callback: ut,
        priorityLevel: K,
        startTime: Rt,
        expirationTime: se,
        sortIndex: -1
      }, Rt > pe ? (K.sortIndex = Rt, x(Ot, K), L(ct) === null && K === L(Ot) && (St ? (st(_e), _e = -1) : St = !0, _i(_t, Rt - pe))) : (K.sortIndex = se, x(ct, K), ft || dt || (ft = !0, te || (te = !0, Ce()))), K;
    }, O.unstable_shouldYield = ie, O.unstable_wrapCallback = function(K) {
      var ut = yt;
      return function() {
        var Rt = yt;
        yt = ut;
        try {
          return K.apply(this, arguments);
        } finally {
          yt = Rt;
        }
      };
    };
  }(ig)), ig;
}
var jg;
function qm() {
  return jg || (jg = 1, eg.exports = Pm()), eg.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pg;
function _m() {
  if (Pg) return Lc;
  Pg = 1;
  var O = qm(), x = Kf, L = jm;
  function D(t) {
    var i = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      i += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var s = 2; s < arguments.length; s++)
        i += "&args[]=" + encodeURIComponent(arguments[s]);
    }
    return "Minified React error #" + t + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Q(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function et(t) {
    var i = t, s = t;
    if (t.alternate) for (; i.return; ) i = i.return;
    else {
      t = i;
      do
        i = t, (i.flags & 4098) !== 0 && (s = i.return), t = i.return;
      while (t);
    }
    return i.tag === 3 ? s : null;
  }
  function at(t) {
    if (t.tag === 13) {
      var i = t.memoizedState;
      if (i === null && (t = t.alternate, t !== null && (i = t.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function lt(t) {
    if (et(t) !== t)
      throw Error(D(188));
  }
  function ct(t) {
    var i = t.alternate;
    if (!i) {
      if (i = et(t), i === null) throw Error(D(188));
      return i !== t ? null : t;
    }
    for (var s = t, r = i; ; ) {
      var d = s.return;
      if (d === null) break;
      var m = d.alternate;
      if (m === null) {
        if (r = d.return, r !== null) {
          s = r;
          continue;
        }
        break;
      }
      if (d.child === m.child) {
        for (m = d.child; m; ) {
          if (m === s) return lt(d), t;
          if (m === r) return lt(d), i;
          m = m.sibling;
        }
        throw Error(D(188));
      }
      if (s.return !== r.return) s = d, r = m;
      else {
        for (var A = !1, k = d.child; k; ) {
          if (k === s) {
            A = !0, s = d, r = m;
            break;
          }
          if (k === r) {
            A = !0, r = d, s = m;
            break;
          }
          k = k.sibling;
        }
        if (!A) {
          for (k = m.child; k; ) {
            if (k === s) {
              A = !0, s = m, r = d;
              break;
            }
            if (k === r) {
              A = !0, r = m, s = d;
              break;
            }
            k = k.sibling;
          }
          if (!A) throw Error(D(189));
        }
      }
      if (s.alternate !== r) throw Error(D(190));
    }
    if (s.tag !== 3) throw Error(D(188));
    return s.stateNode.current === s ? t : i;
  }
  function Ot(t) {
    var i = t.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return t;
    for (t = t.child; t !== null; ) {
      if (i = Ot(t), i !== null) return i;
      t = t.sibling;
    }
    return null;
  }
  var pt = Object.assign, ot = Symbol.for("react.element"), yt = Symbol.for("react.transitional.element"), dt = Symbol.for("react.portal"), ft = Symbol.for("react.fragment"), St = Symbol.for("react.strict_mode"), xt = Symbol.for("react.profiler"), Xt = Symbol.for("react.provider"), st = Symbol.for("react.consumer"), mt = Symbol.for("react.context"), Lt = Symbol.for("react.forward_ref"), _t = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), _e = Symbol.for("react.memo"), Z = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), ie = Symbol.for("react.memo_cache_sentinel"), Xe = Symbol.iterator;
  function Ce(t) {
    return t === null || typeof t != "object" ? null : (t = Xe && t[Xe] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var xa = Symbol.for("react.client.reference");
  function Ya(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === xa ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case ft:
        return "Fragment";
      case xt:
        return "Profiler";
      case St:
        return "StrictMode";
      case _t:
        return "Suspense";
      case te:
        return "SuspenseList";
      case ee:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case dt:
          return "Portal";
        case mt:
          return (t.displayName || "Context") + ".Provider";
        case st:
          return (t._context.displayName || "Context") + ".Consumer";
        case Lt:
          var i = t.render;
          return t = t.displayName, t || (t = i.displayName || i.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case _e:
          return i = t.displayName || null, i !== null ? i : Ya(t.type) || "Memo";
        case Z:
          i = t._payload, t = t._init;
          try {
            return Ya(t(i));
          } catch {
          }
      }
    return null;
  }
  var _i = Array.isArray, K = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ut = L.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Rt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, pe = [], se = -1;
  function ai(t) {
    return { current: t };
  }
  function Te(t) {
    0 > se || (t.current = pe[se], pe[se] = null, se--);
  }
  function Ft(t, i) {
    se++, pe[se] = t.current, t.current = i;
  }
  var ke = ai(null), Qi = ai(null), ja = ai(null), Ln = ai(null);
  function Vr(t, i) {
    switch (Ft(ja, i), Ft(Qi, t), Ft(ke, null), i.nodeType) {
      case 9:
      case 11:
        t = (t = i.documentElement) && (t = t.namespaceURI) ? C(t) : 0;
        break;
      default:
        if (t = i.tagName, i = i.namespaceURI)
          i = C(i), t = B(i, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Te(ke), Ft(ke, t);
  }
  function Zi() {
    Te(ke), Te(Qi), Te(ja);
  }
  function Wr(t) {
    t.memoizedState !== null && Ft(Ln, t);
    var i = ke.current, s = B(i, t.type);
    i !== s && (Ft(Qi, t), Ft(ke, s));
  }
  function zn(t) {
    Qi.current === t && (Te(ke), Te(Qi)), Ln.current === t && (Te(Ln), Ec._currentValue = Rt);
  }
  var Bh = Object.prototype.hasOwnProperty, Mt = O.unstable_scheduleCallback, Hh = O.unstable_cancelCallback, Kr = O.unstable_shouldYield, jc = O.unstable_requestPaint, ua = O.unstable_now, Uh = O.unstable_getCurrentPriorityLevel, Xh = O.unstable_ImmediatePriority, Fr = O.unstable_UserBlockingPriority, ds = O.unstable_NormalPriority, Ff = O.unstable_LowPriority, Pc = O.unstable_IdlePriority, fs = O.log, If = O.unstable_setDisableYieldValue, Ks = null, Di = null;
  function ps(t) {
    if (typeof fs == "function" && If(t), Di && typeof Di.setStrictMode == "function")
      try {
        Di.setStrictMode(Ks, t);
      } catch {
      }
  }
  var Li = Math.clz32 ? Math.clz32 : $f, Jf = Math.log, qc = Math.LN2;
  function $f(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Jf(t) / qc | 0) | 0;
  }
  var Ae = 256, Dl = 4194304;
  function Fs(t) {
    var i = t & 42;
    if (i !== 0) return i;
    switch (t & -t) {
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
        return 64;
      case 128:
        return 128;
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
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Ir(t, i, s) {
    var r = t.pendingLanes;
    if (r === 0) return 0;
    var d = 0, m = t.suspendedLanes, A = t.pingedLanes;
    t = t.warmLanes;
    var k = r & 134217727;
    return k !== 0 ? (r = k & ~m, r !== 0 ? d = Fs(r) : (A &= k, A !== 0 ? d = Fs(A) : s || (s = k & ~t, s !== 0 && (d = Fs(s))))) : (k = r & ~m, k !== 0 ? d = Fs(k) : A !== 0 ? d = Fs(A) : s || (s = r & ~t, s !== 0 && (d = Fs(s)))), d === 0 ? 0 : i !== 0 && i !== d && (i & m) === 0 && (m = d & -d, s = i & -i, m >= s || m === 32 && (s & 4194048) !== 0) ? i : d;
  }
  function Rn(t, i) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & i) === 0;
  }
  function Pa(t, i) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return i + 250;
      case 16:
      case 32:
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
        return i + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Jr() {
    var t = Ae;
    return Ae <<= 1, (Ae & 4194048) === 0 && (Ae = 256), t;
  }
  function zi() {
    var t = Dl;
    return Dl <<= 1, (Dl & 62914560) === 0 && (Dl = 4194304), t;
  }
  function Gh(t) {
    for (var i = [], s = 0; 31 > s; s++) i.push(t);
    return i;
  }
  function qa(t, i) {
    t.pendingLanes |= i, i !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function tp(t, i, s, r, d, m) {
    var A = t.pendingLanes;
    t.pendingLanes = s, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= s, t.entangledLanes &= s, t.errorRecoveryDisabledLanes &= s, t.shellSuspendCounter = 0;
    var k = t.entanglements, N = t.expirationTimes, q = t.hiddenUpdates;
    for (s = A & ~s; 0 < s; ) {
      var F = 31 - Li(s), $ = 1 << F;
      k[F] = 0, N[F] = -1;
      var _ = q[F];
      if (_ !== null)
        for (q[F] = null, F = 0; F < _.length; F++) {
          var V = _[F];
          V !== null && (V.lane &= -536870913);
        }
      s &= ~$;
    }
    r !== 0 && _c(t, r, 0), m !== 0 && d === 0 && t.tag !== 0 && (t.suspendedLanes |= m & ~(A & ~i));
  }
  function _c(t, i, s) {
    t.pendingLanes |= i, t.suspendedLanes &= ~i;
    var r = 31 - Li(i);
    t.entangledLanes |= i, t.entanglements[r] = t.entanglements[r] | 1073741824 | s & 4194090;
  }
  function si(t, i) {
    var s = t.entangledLanes |= i;
    for (t = t.entanglements; s; ) {
      var r = 31 - Li(s), d = 1 << r;
      d & i | t[r] & i && (t[r] |= i), s &= ~d;
    }
  }
  function $r(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function to(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function eo() {
    var t = ut.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Rg(t.type));
  }
  function Oe(t, i) {
    var s = ut.p;
    try {
      return ut.p = t, i();
    } finally {
      ut.p = s;
    }
  }
  var _a = Math.random().toString(36).slice(2), li = "__reactFiber$" + _a, ni = "__reactProps$" + _a, Ll = "__reactContainer$" + _a, ti = "__reactEvents$" + _a, ep = "__reactListeners$" + _a, ip = "__reactHandles$" + _a, Qc = "__reactResources$" + _a, Nn = "__reactMarker$" + _a;
  function Bn(t) {
    delete t[li], delete t[ni], delete t[ti], delete t[ep], delete t[ip];
  }
  function Is(t) {
    var i = t[li];
    if (i) return i;
    for (var s = t.parentNode; s; ) {
      if (i = s[Ll] || s[li]) {
        if (s = i.alternate, i.child !== null || s !== null && s.child !== null)
          for (t = $e(t); t !== null; ) {
            if (s = t[li]) return s;
            t = $e(t);
          }
        return i;
      }
      t = s, s = t.parentNode;
    }
    return null;
  }
  function zl(t) {
    if (t = t[li] || t[Ll]) {
      var i = t.tag;
      if (i === 5 || i === 6 || i === 13 || i === 26 || i === 27 || i === 3)
        return t;
    }
    return null;
  }
  function Hn(t) {
    var i = t.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return t.stateNode;
    throw Error(D(33));
  }
  function gs(t) {
    var i = t[Qc];
    return i || (i = t[Qc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), i;
  }
  function Qe(t) {
    t[Nn] = !0;
  }
  var We = /* @__PURE__ */ new Set(), Yh = {};
  function Js(t, i) {
    Rl(t, i), Rl(t + "Capture", i);
  }
  function Rl(t, i) {
    for (Yh[t] = i, t = 0; t < i.length; t++)
      We.add(i[t]);
  }
  var ap = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Zc = {}, jh = {};
  function sp(t) {
    return Bh.call(jh, t) ? !0 : Bh.call(Zc, t) ? !1 : ap.test(t) ? jh[t] = !0 : (Zc[t] = !0, !1);
  }
  function Un(t, i, s) {
    if (sp(i))
      if (s === null) t.removeAttribute(i);
      else {
        switch (typeof s) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(i);
            return;
          case "boolean":
            var r = i.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              t.removeAttribute(i);
              return;
            }
        }
        t.setAttribute(i, "" + s);
      }
  }
  function Xn(t, i, s) {
    if (s === null) t.removeAttribute(i);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(i);
          return;
      }
      t.setAttribute(i, "" + s);
    }
  }
  function Qa(t, i, s, r) {
    if (r === null) t.removeAttribute(s);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(s);
          return;
      }
      t.setAttributeNS(i, s, "" + r);
    }
  }
  var Gn, Yn;
  function Nl(t) {
    if (Gn === void 0)
      try {
        throw Error();
      } catch (s) {
        var i = s.stack.trim().match(/\n( *(at )?)/);
        Gn = i && i[1] || "", Yn = -1 < s.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < s.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Gn + t + Yn;
  }
  var ge = !1;
  function io(t, i) {
    if (!t || ge) return "";
    ge = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (i) {
              var $ = function() {
                throw Error();
              };
              if (Object.defineProperty($.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct($, []);
                } catch (V) {
                  var _ = V;
                }
                Reflect.construct(t, [], $);
              } else {
                try {
                  $.call();
                } catch (V) {
                  _ = V;
                }
                t.call($.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                _ = V;
              }
              ($ = t()) && typeof $.catch == "function" && $.catch(function() {
              });
            }
          } catch (V) {
            if (V && _ && typeof V.stack == "string")
              return [V.stack, _.stack];
          }
          return [null, null];
        }
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var d = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      d && d.configurable && Object.defineProperty(
        r.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var m = r.DetermineComponentFrameRoot(), A = m[0], k = m[1];
      if (A && k) {
        var N = A.split(`
`), q = k.split(`
`);
        for (d = r = 0; r < N.length && !N[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; d < q.length && !q[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (r === N.length || d === q.length)
          for (r = N.length - 1, d = q.length - 1; 1 <= r && 0 <= d && N[r] !== q[d]; )
            d--;
        for (; 1 <= r && 0 <= d; r--, d--)
          if (N[r] !== q[d]) {
            if (r !== 1 || d !== 1)
              do
                if (r--, d--, 0 > d || N[r] !== q[d]) {
                  var F = `
` + N[r].replace(" at new ", " at ");
                  return t.displayName && F.includes("<anonymous>") && (F = F.replace("<anonymous>", t.displayName)), F;
                }
              while (1 <= r && 0 <= d);
            break;
          }
      }
    } finally {
      ge = !1, Error.prepareStackTrace = s;
    }
    return (s = t ? t.displayName || t.name : "") ? Nl(s) : "";
  }
  function Vc(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Nl(t.type);
      case 16:
        return Nl("Lazy");
      case 13:
        return Nl("Suspense");
      case 19:
        return Nl("SuspenseList");
      case 0:
      case 15:
        return io(t.type, !1);
      case 11:
        return io(t.type.render, !1);
      case 1:
        return io(t.type, !0);
      case 31:
        return Nl("Activity");
      default:
        return "";
    }
  }
  function Wc(t) {
    try {
      var i = "";
      do
        i += Vc(t), t = t.return;
      while (t);
      return i;
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack;
    }
  }
  function Vi(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Kc(t) {
    var i = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function lp(t) {
    var i = Kc(t) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      i
    ), r = "" + t[i];
    if (!t.hasOwnProperty(i) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var d = s.get, m = s.set;
      return Object.defineProperty(t, i, {
        configurable: !0,
        get: function() {
          return d.call(this);
        },
        set: function(A) {
          r = "" + A, m.call(this, A);
        }
      }), Object.defineProperty(t, i, {
        enumerable: s.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(A) {
          r = "" + A;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[i];
        }
      };
    }
  }
  function jn(t) {
    t._valueTracker || (t._valueTracker = lp(t));
  }
  function Fc(t) {
    if (!t) return !1;
    var i = t._valueTracker;
    if (!i) return !0;
    var s = i.getValue(), r = "";
    return t && (r = Kc(t) ? t.checked ? "true" : "false" : t.value), t = r, t !== s ? (i.setValue(t), !0) : !1;
  }
  function ao(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var np = /[\n"\\]/g;
  function Wi(t) {
    return t.replace(
      np,
      function(i) {
        return "\\" + i.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Bl(t, i, s, r, d, m, A, k) {
    t.name = "", A != null && typeof A != "function" && typeof A != "symbol" && typeof A != "boolean" ? t.type = A : t.removeAttribute("type"), i != null ? A === "number" ? (i === 0 && t.value === "" || t.value != i) && (t.value = "" + Vi(i)) : t.value !== "" + Vi(i) && (t.value = "" + Vi(i)) : A !== "submit" && A !== "reset" || t.removeAttribute("value"), i != null ? so(t, A, Vi(i)) : s != null ? so(t, A, Vi(s)) : r != null && t.removeAttribute("value"), d == null && m != null && (t.defaultChecked = !!m), d != null && (t.checked = d && typeof d != "function" && typeof d != "symbol"), k != null && typeof k != "function" && typeof k != "symbol" && typeof k != "boolean" ? t.name = "" + Vi(k) : t.removeAttribute("name");
  }
  function Ph(t, i, s, r, d, m, A, k) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.type = m), i != null || s != null) {
      if (!(m !== "submit" && m !== "reset" || i != null))
        return;
      s = s != null ? "" + Vi(s) : "", i = i != null ? "" + Vi(i) : s, k || i === t.value || (t.value = i), t.defaultValue = i;
    }
    r = r ?? d, r = typeof r != "function" && typeof r != "symbol" && !!r, t.checked = k ? t.checked : !!r, t.defaultChecked = !!r, A != null && typeof A != "function" && typeof A != "symbol" && typeof A != "boolean" && (t.name = A);
  }
  function so(t, i, s) {
    i === "number" && ao(t.ownerDocument) === t || t.defaultValue === "" + s || (t.defaultValue = "" + s);
  }
  function Za(t, i, s, r) {
    if (t = t.options, i) {
      i = {};
      for (var d = 0; d < s.length; d++)
        i["$" + s[d]] = !0;
      for (s = 0; s < t.length; s++)
        d = i.hasOwnProperty("$" + t[s].value), t[s].selected !== d && (t[s].selected = d), d && r && (t[s].defaultSelected = !0);
    } else {
      for (s = "" + Vi(s), i = null, d = 0; d < t.length; d++) {
        if (t[d].value === s) {
          t[d].selected = !0, r && (t[d].defaultSelected = !0);
          return;
        }
        i !== null || t[d].disabled || (i = t[d]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function qh(t, i, s) {
    if (i != null && (i = "" + Vi(i), i !== t.value && (t.value = i), s == null)) {
      t.defaultValue !== i && (t.defaultValue = i);
      return;
    }
    t.defaultValue = s != null ? "" + Vi(s) : "";
  }
  function Ri(t, i, s, r) {
    if (i == null) {
      if (r != null) {
        if (s != null) throw Error(D(92));
        if (_i(r)) {
          if (1 < r.length) throw Error(D(93));
          r = r[0];
        }
        s = r;
      }
      s == null && (s = ""), i = s;
    }
    s = Vi(i), t.defaultValue = s, r = t.textContent, r === s && r !== "" && r !== null && (t.value = r);
  }
  function Sa(t, i) {
    if (i) {
      var s = t.firstChild;
      if (s && s === t.lastChild && s.nodeType === 3) {
        s.nodeValue = i;
        return;
      }
    }
    t.textContent = i;
  }
  var rp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ic(t, i, s) {
    var r = i.indexOf("--") === 0;
    s == null || typeof s == "boolean" || s === "" ? r ? t.setProperty(i, "") : i === "float" ? t.cssFloat = "" : t[i] = "" : r ? t.setProperty(i, s) : typeof s != "number" || s === 0 || rp.has(i) ? i === "float" ? t.cssFloat = s : t[i] = ("" + s).trim() : t[i] = s + "px";
  }
  function Jc(t, i, s) {
    if (i != null && typeof i != "object")
      throw Error(D(62));
    if (t = t.style, s != null) {
      for (var r in s)
        !s.hasOwnProperty(r) || i != null && i.hasOwnProperty(r) || (r.indexOf("--") === 0 ? t.setProperty(r, "") : r === "float" ? t.cssFloat = "" : t[r] = "");
      for (var d in i)
        r = i[d], i.hasOwnProperty(d) && s[d] !== r && Ic(t, d, r);
    } else
      for (var m in i)
        i.hasOwnProperty(m) && Ic(t, m, i[m]);
  }
  function Pn(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var lo = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), op = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function no(t) {
    return op.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var ro = null;
  function oo(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var ca = null, Hl = null;
  function qn(t) {
    var i = zl(t);
    if (i && (t = i.stateNode)) {
      var s = t[ni] || null;
      t: switch (t = i.stateNode, i.type) {
        case "input":
          if (Bl(
            t,
            s.value,
            s.defaultValue,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name
          ), i = s.name, s.type === "radio" && i != null) {
            for (s = t; s.parentNode; ) s = s.parentNode;
            for (s = s.querySelectorAll(
              'input[name="' + Wi(
                "" + i
              ) + '"][type="radio"]'
            ), i = 0; i < s.length; i++) {
              var r = s[i];
              if (r !== t && r.form === t.form) {
                var d = r[ni] || null;
                if (!d) throw Error(D(90));
                Bl(
                  r,
                  d.value,
                  d.defaultValue,
                  d.defaultValue,
                  d.checked,
                  d.defaultChecked,
                  d.type,
                  d.name
                );
              }
            }
            for (i = 0; i < s.length; i++)
              r = s[i], r.form === t.form && Fc(r);
          }
          break t;
        case "textarea":
          qh(t, s.value, s.defaultValue);
          break t;
        case "select":
          i = s.value, i != null && Za(t, !!s.multiple, i, !1);
      }
    }
  }
  var _h = !1;
  function $c(t, i, s) {
    if (_h) return t(i, s);
    _h = !0;
    try {
      var r = t(i);
      return r;
    } finally {
      if (_h = !1, (ca !== null || Hl !== null) && (ch(), ca && (i = ca, t = Hl, Hl = ca = null, qn(i), t)))
        for (i = 0; i < t.length; i++) qn(t[i]);
    }
  }
  function _n(t, i) {
    var s = t.stateNode;
    if (s === null) return null;
    var r = s[ni] || null;
    if (r === null) return null;
    s = r[i];
    t: switch (i) {
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
        (r = !r.disabled) || (t = t.type, r = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !r;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (s && typeof s != "function")
      throw Error(
        D(231, i, typeof s)
      );
    return s;
  }
  var da = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Qh = !1;
  if (da)
    try {
      var ms = {};
      Object.defineProperty(ms, "passive", {
        get: function() {
          Qh = !0;
        }
      }), window.addEventListener("test", ms, ms), window.removeEventListener("test", ms, ms);
    } catch {
      Qh = !1;
    }
  var Va = null, Ki = null, ho = null;
  function Ul() {
    if (ho) return ho;
    var t, i = Ki, s = i.length, r, d = "value" in Va ? Va.value : Va.textContent, m = d.length;
    for (t = 0; t < s && i[t] === d[t]; t++) ;
    var A = s - t;
    for (r = 1; r <= A && i[s - r] === d[m - r]; r++) ;
    return ho = d.slice(t, 1 < r ? 1 - r : void 0);
  }
  function Xl(t) {
    var i = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && i === 13 && (t = 13)) : t = i, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Gl() {
    return !0;
  }
  function Zh() {
    return !1;
  }
  function fi(t) {
    function i(s, r, d, m, A) {
      this._reactName = s, this._targetInst = d, this.type = r, this.nativeEvent = m, this.target = A, this.currentTarget = null;
      for (var k in t)
        t.hasOwnProperty(k) && (s = t[k], this[k] = s ? s(m) : m[k]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Gl : Zh, this.isPropagationStopped = Zh, this;
    }
    return pt(i.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var s = this.nativeEvent;
        s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Gl);
      },
      stopPropagation: function() {
        var s = this.nativeEvent;
        s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Gl);
      },
      persist: function() {
      },
      isPersistent: Gl
    }), i;
  }
  var $s = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, uo = fi($s), Yl = pt({}, $s, { view: 0, detail: 0 }), Vh = fi(Yl), ys, fa, vs, co = pt({}, Yl, {
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
    getModifierState: el,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== vs && (vs && t.type === "mousemove" ? (ys = t.screenX - vs.screenX, fa = t.screenY - vs.screenY) : fa = ys = 0, vs = t), ys);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : fa;
    }
  }), td = fi(co), hp = pt({}, co, { dataTransfer: 0 }), ed = fi(hp), Ze = pt({}, Yl, { relatedTarget: 0 }), Fi = fi(Ze), id = pt({}, $s, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), up = fi(id), ad = pt({}, $s, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Qn = fi(ad), cp = pt({}, $s, { data: 0 }), Zn = fi(cp), sd = {
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
    MozPrintableKey: "Unidentified"
  }, tl = {
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
    224: "Meta"
  }, ld = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function dp(t) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(t) : (t = ld[t]) ? !!i[t] : !1;
  }
  function el() {
    return dp;
  }
  var nd = pt({}, Yl, {
    key: function(t) {
      if (t.key) {
        var i = sd[t.key] || t.key;
        if (i !== "Unidentified") return i;
      }
      return t.type === "keypress" ? (t = Xl(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? tl[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: el,
    charCode: function(t) {
      return t.type === "keypress" ? Xl(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Xl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), rd = fi(nd), Wh = pt({}, co, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Kh = fi(Wh), Fh = pt({}, Yl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: el
  }), fp = fi(Fh), od = pt({}, $s, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ih = fi(od), pp = pt({}, co, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gp = fi(pp), mp = pt({}, $s, {
    newState: 0,
    oldState: 0
  }), yp = fi(mp), vp = [9, 13, 27, 32], Vn = da && "CompositionEvent" in window, Wn = null;
  da && "documentMode" in document && (Wn = document.documentMode);
  var bp = da && "TextEvent" in window && !Wn, hd = da && (!Vn || Wn && 8 < Wn && 11 >= Wn), Jh = " ", il = !1;
  function $h(t, i) {
    switch (t) {
      case "keyup":
        return vp.indexOf(i.keyCode) !== -1;
      case "keydown":
        return i.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function tu(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var jl = !1;
  function xp(t, i) {
    switch (t) {
      case "compositionend":
        return tu(i);
      case "keypress":
        return i.which !== 32 ? null : (il = !0, Jh);
      case "textInput":
        return t = i.data, t === Jh && il ? null : t;
      default:
        return null;
    }
  }
  function Sp(t, i) {
    if (jl)
      return t === "compositionend" || !Vn && $h(t, i) ? (t = Ul(), ho = Ki = Va = null, jl = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(i.ctrlKey || i.altKey || i.metaKey) || i.ctrlKey && i.altKey) {
          if (i.char && 1 < i.char.length)
            return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case "compositionend":
        return hd && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var eu = {
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
    week: !0
  };
  function fo(t) {
    var i = t && t.nodeName && t.nodeName.toLowerCase();
    return i === "input" ? !!eu[t.type] : i === "textarea";
  }
  function Kn(t, i, s, r) {
    ca ? Hl ? Hl.push(r) : Hl = [r] : ca = r, i = n(i, "onChange"), 0 < i.length && (s = new uo(
      "onChange",
      "change",
      null,
      s,
      r
    ), t.push({ event: s, listeners: i }));
  }
  var bs = null, Fn = null;
  function ud(t) {
    kf(t, 0);
  }
  function al(t) {
    var i = Hn(t);
    if (Fc(i)) return t;
  }
  function xs(t, i) {
    if (t === "change") return i;
  }
  var cd = !1;
  if (da) {
    var Wa;
    if (da) {
      var iu = "oninput" in document;
      if (!iu) {
        var sl = document.createElement("div");
        sl.setAttribute("oninput", "return;"), iu = typeof sl.oninput == "function";
      }
      Wa = iu;
    } else Wa = !1;
    cd = Wa && (!document.documentMode || 9 < document.documentMode);
  }
  function Pl() {
    bs && (bs.detachEvent("onpropertychange", dd), Fn = bs = null);
  }
  function dd(t) {
    if (t.propertyName === "value" && al(Fn)) {
      var i = [];
      Kn(
        i,
        Fn,
        t,
        oo(t)
      ), $c(ud, i);
    }
  }
  function au(t, i, s) {
    t === "focusin" ? (Pl(), bs = i, Fn = s, bs.attachEvent("onpropertychange", dd)) : t === "focusout" && Pl();
  }
  function su(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return al(Fn);
  }
  function Mp(t, i) {
    if (t === "click") return al(i);
  }
  function Tp(t, i) {
    if (t === "input" || t === "change")
      return al(i);
  }
  function Ap(t, i) {
    return t === i && (t !== 0 || 1 / t === 1 / i) || t !== t && i !== i;
  }
  var ri = typeof Object.is == "function" ? Object.is : Ap;
  function In(t, i) {
    if (ri(t, i)) return !0;
    if (typeof t != "object" || t === null || typeof i != "object" || i === null)
      return !1;
    var s = Object.keys(t), r = Object.keys(i);
    if (s.length !== r.length) return !1;
    for (r = 0; r < s.length; r++) {
      var d = s[r];
      if (!Bh.call(i, d) || !ri(t[d], i[d]))
        return !1;
    }
    return !0;
  }
  function fd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function pd(t, i) {
    var s = fd(t);
    t = 0;
    for (var r; s; ) {
      if (s.nodeType === 3) {
        if (r = t + s.textContent.length, t <= i && r >= i)
          return { node: s, offset: i - t };
        t = r;
      }
      t: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break t;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = fd(s);
    }
  }
  function Ka(t, i) {
    return t && i ? t === i ? !0 : t && t.nodeType === 3 ? !1 : i && i.nodeType === 3 ? Ka(t, i.parentNode) : "contains" in t ? t.contains(i) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function gd(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var i = ao(t.document); i instanceof t.HTMLIFrameElement; ) {
      try {
        var s = typeof i.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) t = i.contentWindow;
      else break;
      i = ao(t.document);
    }
    return i;
  }
  function po(t) {
    var i = t && t.nodeName && t.nodeName.toLowerCase();
    return i && (i === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || i === "textarea" || t.contentEditable === "true");
  }
  var Op = da && "documentMode" in document && 11 >= document.documentMode, ql = null, _l = null, Jn = null, lu = !1;
  function nu(t, i, s) {
    var r = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    lu || ql == null || ql !== ao(r) || (r = ql, "selectionStart" in r && po(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), Jn && In(Jn, r) || (Jn = r, r = n(_l, "onSelect"), 0 < r.length && (i = new uo(
      "onSelect",
      "select",
      null,
      i,
      s
    ), t.push({ event: i, listeners: r }), i.target = ql)));
  }
  function ll(t, i) {
    var s = {};
    return s[t.toLowerCase()] = i.toLowerCase(), s["Webkit" + t] = "webkit" + i, s["Moz" + t] = "moz" + i, s;
  }
  var pa = {
    animationend: ll("Animation", "AnimationEnd"),
    animationiteration: ll("Animation", "AnimationIteration"),
    animationstart: ll("Animation", "AnimationStart"),
    transitionrun: ll("Transition", "TransitionRun"),
    transitionstart: ll("Transition", "TransitionStart"),
    transitioncancel: ll("Transition", "TransitionCancel"),
    transitionend: ll("Transition", "TransitionEnd")
  }, Fa = {}, md = {};
  da && (md = document.createElement("div").style, "AnimationEvent" in window || (delete pa.animationend.animation, delete pa.animationiteration.animation, delete pa.animationstart.animation), "TransitionEvent" in window || delete pa.transitionend.transition);
  function nl(t) {
    if (Fa[t]) return Fa[t];
    if (!pa[t]) return t;
    var i = pa[t], s;
    for (s in i)
      if (i.hasOwnProperty(s) && s in md)
        return Fa[t] = i[s];
    return t;
  }
  var yd = nl("animationend"), vd = nl("animationiteration"), bd = nl("animationstart"), go = nl("transitionrun"), ru = nl("transitionstart"), Ep = nl("transitioncancel"), $n = nl("transitionend"), mo = /* @__PURE__ */ new Map(), ou = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ou.push("scrollEnd");
  function Ii(t, i) {
    mo.set(t, i), Js(i, [t]);
  }
  var Ql = /* @__PURE__ */ new WeakMap();
  function Ji(t, i) {
    if (typeof t == "object" && t !== null) {
      var s = Ql.get(t);
      return s !== void 0 ? s : (i = {
        value: t,
        source: i,
        stack: Wc(i)
      }, Ql.set(t, i), i);
    }
    return {
      value: t,
      source: i,
      stack: Wc(i)
    };
  }
  var pi = [], Zl = 0, hu = 0;
  function Ni() {
    for (var t = Zl, i = hu = Zl = 0; i < t; ) {
      var s = pi[i];
      pi[i++] = null;
      var r = pi[i];
      pi[i++] = null;
      var d = pi[i];
      pi[i++] = null;
      var m = pi[i];
      if (pi[i++] = null, r !== null && d !== null) {
        var A = r.pending;
        A === null ? d.next = d : (d.next = A.next, A.next = d), r.pending = d;
      }
      m !== 0 && xd(s, d, m);
    }
  }
  function Ia(t, i, s, r) {
    pi[Zl++] = t, pi[Zl++] = i, pi[Zl++] = s, pi[Zl++] = r, hu |= r, t.lanes |= r, t = t.alternate, t !== null && (t.lanes |= r);
  }
  function uu(t, i, s, r) {
    return Ia(t, i, s, r), Vl(t);
  }
  function rl(t, i) {
    return Ia(t, null, null, i), Vl(t);
  }
  function xd(t, i, s) {
    t.lanes |= s;
    var r = t.alternate;
    r !== null && (r.lanes |= s);
    for (var d = !1, m = t.return; m !== null; )
      m.childLanes |= s, r = m.alternate, r !== null && (r.childLanes |= s), m.tag === 22 && (t = m.stateNode, t === null || t._visibility & 1 || (d = !0)), t = m, m = m.return;
    return t.tag === 3 ? (m = t.stateNode, d && i !== null && (d = 31 - Li(s), t = m.hiddenUpdates, r = t[d], r === null ? t[d] = [i] : r.push(i), i.lane = s | 536870912), m) : null;
  }
  function Vl(t) {
    if (50 < Ps)
      throw Ps = 0, hh = null, Error(D(185));
    for (var i = t.return; i !== null; )
      t = i, i = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Wl = {};
  function wp(t, i, s, r) {
    this.tag = t, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function bi(t, i, s, r) {
    return new wp(t, i, s, r);
  }
  function cu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function ga(t, i) {
    var s = t.alternate;
    return s === null ? (s = bi(
      t.tag,
      i,
      t.key,
      t.mode
    ), s.elementType = t.elementType, s.type = t.type, s.stateNode = t.stateNode, s.alternate = t, t.alternate = s) : (s.pendingProps = i, s.type = t.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = t.flags & 65011712, s.childLanes = t.childLanes, s.lanes = t.lanes, s.child = t.child, s.memoizedProps = t.memoizedProps, s.memoizedState = t.memoizedState, s.updateQueue = t.updateQueue, i = t.dependencies, s.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, s.sibling = t.sibling, s.index = t.index, s.ref = t.ref, s.refCleanup = t.refCleanup, s;
  }
  function xi(t, i) {
    t.flags &= 65011714;
    var s = t.alternate;
    return s === null ? (t.childLanes = 0, t.lanes = i, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = s.childLanes, t.lanes = s.lanes, t.child = s.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = s.memoizedProps, t.memoizedState = s.memoizedState, t.updateQueue = s.updateQueue, t.type = s.type, i = s.dependencies, t.dependencies = i === null ? null : {
      lanes: i.lanes,
      firstContext: i.firstContext
    }), t;
  }
  function ae(t, i, s, r, d, m) {
    var A = 0;
    if (r = t, typeof t == "function") cu(t) && (A = 1);
    else if (typeof t == "string")
      A = Cm(
        t,
        s,
        ke.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case ee:
          return t = bi(31, s, i, d), t.elementType = ee, t.lanes = m, t;
        case ft:
          return ol(s.children, d, m, i);
        case St:
          A = 8, d |= 24;
          break;
        case xt:
          return t = bi(12, s, i, d | 2), t.elementType = xt, t.lanes = m, t;
        case _t:
          return t = bi(13, s, i, d), t.elementType = _t, t.lanes = m, t;
        case te:
          return t = bi(19, s, i, d), t.elementType = te, t.lanes = m, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Xt:
              case mt:
                A = 10;
                break t;
              case st:
                A = 9;
                break t;
              case Lt:
                A = 11;
                break t;
              case _e:
                A = 14;
                break t;
              case Z:
                A = 16, r = null;
                break t;
            }
          A = 29, s = Error(
            D(130, t === null ? "null" : typeof t, "")
          ), r = null;
      }
    return i = bi(A, s, i, d), i.elementType = t, i.type = r, i.lanes = m, i;
  }
  function ol(t, i, s, r) {
    return t = bi(7, t, r, i), t.lanes = s, t;
  }
  function yo(t, i, s) {
    return t = bi(6, t, null, i), t.lanes = s, t;
  }
  function tr(t, i, s) {
    return i = bi(
      4,
      t.children !== null ? t.children : [],
      t.key,
      i
    ), i.lanes = s, i.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, i;
  }
  var Ja = [], ne = 0, er = null, vo = 0, Bi = [], gt = 0, Ss = null, $i = 1, $a = "";
  function Ma(t, i) {
    Ja[ne++] = vo, Ja[ne++] = er, er = t, vo = i;
  }
  function Ut(t, i, s) {
    Bi[gt++] = $i, Bi[gt++] = $a, Bi[gt++] = Ss, Ss = t;
    var r = $i;
    t = $a;
    var d = 32 - Li(r) - 1;
    r &= ~(1 << d), s += 1;
    var m = 32 - Li(i) + d;
    if (30 < m) {
      var A = d - d % 5;
      m = (r & (1 << A) - 1).toString(32), r >>= A, d -= A, $i = 1 << 32 - Li(i) + d | s << d | r, $a = m + t;
    } else
      $i = 1 << m | s << d | r, $a = t;
  }
  function Kl(t) {
    t.return !== null && (Ma(t, 1), Ut(t, 1, 0));
  }
  function du(t) {
    for (; t === er; )
      er = Ja[--ne], Ja[ne] = null, vo = Ja[--ne], Ja[ne] = null;
    for (; t === Ss; )
      Ss = Bi[--gt], Bi[gt] = null, $a = Bi[--gt], Bi[gt] = null, $i = Bi[--gt], Bi[gt] = null;
  }
  var gi = null, De = null, $t = !1, ta = null, Ta = !1, fu = Error(D(519));
  function hl(t) {
    var i = Error(D(418, ""));
    throw sr(Ji(i, t)), fu;
  }
  function ir(t) {
    var i = t.stateNode, s = t.type, r = t.memoizedProps;
    switch (i[li] = t, i[ni] = r, s) {
      case "dialog":
        Qt("cancel", i), Qt("close", i);
        break;
      case "iframe":
      case "object":
      case "embed":
        Qt("load", i);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Rr.length; s++)
          Qt(Rr[s], i);
        break;
      case "source":
        Qt("error", i);
        break;
      case "img":
      case "image":
      case "link":
        Qt("error", i), Qt("load", i);
        break;
      case "details":
        Qt("toggle", i);
        break;
      case "input":
        Qt("invalid", i), Ph(
          i,
          r.value,
          r.defaultValue,
          r.checked,
          r.defaultChecked,
          r.type,
          r.name,
          !0
        ), jn(i);
        break;
      case "select":
        Qt("invalid", i);
        break;
      case "textarea":
        Qt("invalid", i), Ri(i, r.value, r.defaultValue, r.children), jn(i);
    }
    s = r.children, typeof s != "string" && typeof s != "number" && typeof s != "bigint" || i.textContent === "" + s || r.suppressHydrationWarning === !0 || y(i.textContent, s) ? (r.popover != null && (Qt("beforetoggle", i), Qt("toggle", i)), r.onScroll != null && Qt("scroll", i), r.onScrollEnd != null && Qt("scrollend", i), r.onClick != null && (i.onclick = g), i = !0) : i = !1, i || hl(t);
  }
  function Sd(t) {
    for (gi = t.return; gi; )
      switch (gi.tag) {
        case 5:
        case 13:
          Ta = !1;
          return;
        case 27:
        case 3:
          Ta = !0;
          return;
        default:
          gi = gi.return;
      }
  }
  function Fl(t) {
    if (t !== gi) return !1;
    if (!$t) return Sd(t), $t = !0, !1;
    var i = t.tag, s;
    if ((s = i !== 3 && i !== 27) && ((s = i === 5) && (s = t.type, s = !(s !== "form" && s !== "button") || z(t.type, t.memoizedProps)), s = !s), s && De && hl(t), Sd(t), i === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(D(317));
      t: {
        for (t = t.nextSibling, i = 0; t; ) {
          if (t.nodeType === 8)
            if (s = t.data, s === "/$") {
              if (i === 0) {
                De = kt(t.nextSibling);
                break t;
              }
              i--;
            } else
              s !== "$" && s !== "$!" && s !== "$?" || i++;
          t = t.nextSibling;
        }
        De = null;
      }
    } else
      i === 27 ? (i = De, J(t.type) ? (t = jt, jt = null, De = t) : De = i) : De = gi ? kt(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ar() {
    De = gi = null, $t = !1;
  }
  function Md() {
    var t = ta;
    return t !== null && (wi === null ? wi = t : wi.push.apply(
      wi,
      t
    ), ta = null), t;
  }
  function sr(t) {
    ta === null ? ta = [t] : ta.push(t);
  }
  var pu = ai(null), ul = null, Aa = null;
  function Ms(t, i, s) {
    Ft(pu, i._currentValue), i._currentValue = s;
  }
  function ts(t) {
    t._currentValue = pu.current, Te(pu);
  }
  function bo(t, i, s) {
    for (; t !== null; ) {
      var r = t.alternate;
      if ((t.childLanes & i) !== i ? (t.childLanes |= i, r !== null && (r.childLanes |= i)) : r !== null && (r.childLanes & i) !== i && (r.childLanes |= i), t === s) break;
      t = t.return;
    }
  }
  function xo(t, i, s, r) {
    var d = t.child;
    for (d !== null && (d.return = t); d !== null; ) {
      var m = d.dependencies;
      if (m !== null) {
        var A = d.child;
        m = m.firstContext;
        t: for (; m !== null; ) {
          var k = m;
          m = d;
          for (var N = 0; N < i.length; N++)
            if (k.context === i[N]) {
              m.lanes |= s, k = m.alternate, k !== null && (k.lanes |= s), bo(
                m.return,
                s,
                t
              ), r || (A = null);
              break t;
            }
          m = k.next;
        }
      } else if (d.tag === 18) {
        if (A = d.return, A === null) throw Error(D(341));
        A.lanes |= s, m = A.alternate, m !== null && (m.lanes |= s), bo(A, s, t), A = null;
      } else A = d.child;
      if (A !== null) A.return = d;
      else
        for (A = d; A !== null; ) {
          if (A === t) {
            A = null;
            break;
          }
          if (d = A.sibling, d !== null) {
            d.return = A.return, A = d;
            break;
          }
          A = A.return;
        }
      d = A;
    }
  }
  function Si(t, i, s, r) {
    t = null;
    for (var d = i, m = !1; d !== null; ) {
      if (!m) {
        if ((d.flags & 524288) !== 0) m = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var A = d.alternate;
        if (A === null) throw Error(D(387));
        if (A = A.memoizedProps, A !== null) {
          var k = d.type;
          ri(d.pendingProps.value, A.value) || (t !== null ? t.push(k) : t = [k]);
        }
      } else if (d === Ln.current) {
        if (A = d.alternate, A === null) throw Error(D(387));
        A.memoizedState.memoizedState !== d.memoizedState.memoizedState && (t !== null ? t.push(Ec) : t = [Ec]);
      }
      d = d.return;
    }
    t !== null && xo(
      i,
      t,
      s,
      r
    ), i.flags |= 262144;
  }
  function So(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ri(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function cl(t) {
    ul = t, Aa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function oi(t) {
    return Td(ul, t);
  }
  function lr(t, i) {
    return ul === null && cl(t), Td(t, i);
  }
  function Td(t, i) {
    var s = i._currentValue;
    if (i = { context: i, memoizedValue: s, next: null }, Aa === null) {
      if (t === null) throw Error(D(308));
      Aa = i, t.dependencies = { lanes: 0, firstContext: i }, t.flags |= 524288;
    } else Aa = Aa.next = i;
    return s;
  }
  var Cp = typeof AbortController < "u" ? AbortController : function() {
    var t = [], i = this.signal = {
      aborted: !1,
      addEventListener: function(s, r) {
        t.push(r);
      }
    };
    this.abort = function() {
      i.aborted = !0, t.forEach(function(s) {
        return s();
      });
    };
  }, Mo = O.unstable_scheduleCallback, kp = O.unstable_NormalPriority, Ge = {
    $$typeof: mt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function gu() {
    return {
      controller: new Cp(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function nr(t) {
    t.refCount--, t.refCount === 0 && Mo(kp, function() {
      t.controller.abort();
    });
  }
  var Il = null, mu = 0, Jl = 0, $l = null;
  function tn(t, i) {
    if (Il === null) {
      var s = Il = [];
      mu = 0, Jl = xc(), $l = {
        status: "pending",
        value: void 0,
        then: function(r) {
          s.push(r);
        }
      };
    }
    return mu++, i.then(yu, yu), i;
  }
  function yu() {
    if (--mu === 0 && Il !== null) {
      $l !== null && ($l.status = "fulfilled");
      var t = Il;
      Il = null, Jl = 0, $l = null;
      for (var i = 0; i < t.length; i++) (0, t[i])();
    }
  }
  function Dp(t, i) {
    var s = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(d) {
        s.push(d);
      }
    };
    return t.then(
      function() {
        r.status = "fulfilled", r.value = i;
        for (var d = 0; d < s.length; d++) (0, s[d])(i);
      },
      function(d) {
        for (r.status = "rejected", r.reason = d, d = 0; d < s.length; d++)
          (0, s[d])(void 0);
      }
    ), r;
  }
  var Ad = K.S;
  K.S = function(t, i) {
    typeof i == "object" && i !== null && typeof i.then == "function" && tn(t, i), Ad !== null && Ad(t, i);
  };
  var Ts = ai(null);
  function To() {
    var t = Ts.current;
    return t !== null ? t : oe.pooledCache;
  }
  function Ao(t, i) {
    i === null ? Ft(Ts, Ts.current) : Ft(Ts, i.pool);
  }
  function Od() {
    var t = To();
    return t === null ? null : { parent: Ge._currentValue, pool: t };
  }
  var rr = Error(D(460)), Oo = Error(D(474)), Eo = Error(D(542)), As = { then: function() {
  } };
  function Ed(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function en() {
  }
  function wd(t, i, s) {
    switch (s = t[s], s === void 0 ? t.push(i) : s !== i && (i.then(en, en), i = s), i.status) {
      case "fulfilled":
        return i.value;
      case "rejected":
        throw t = i.reason, Cd(t), t;
      default:
        if (typeof i.status == "string") i.then(en, en);
        else {
          if (t = oe, t !== null && 100 < t.shellSuspendCounter)
            throw Error(D(482));
          t = i, t.status = "pending", t.then(
            function(r) {
              if (i.status === "pending") {
                var d = i;
                d.status = "fulfilled", d.value = r;
              }
            },
            function(r) {
              if (i.status === "pending") {
                var d = i;
                d.status = "rejected", d.reason = r;
              }
            }
          );
        }
        switch (i.status) {
          case "fulfilled":
            return i.value;
          case "rejected":
            throw t = i.reason, Cd(t), t;
        }
        throw dl = i, rr;
    }
  }
  var dl = null;
  function vu() {
    if (dl === null) throw Error(D(459));
    var t = dl;
    return dl = null, t;
  }
  function Cd(t) {
    if (t === rr || t === Eo)
      throw Error(D(483));
  }
  var Os = !1;
  function bu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function xu(t, i) {
    t = t.updateQueue, i.updateQueue === t && (i.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Es(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ws(t, i, s) {
    var r = t.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (re & 2) !== 0) {
      var d = r.pending;
      return d === null ? i.next = i : (i.next = d.next, d.next = i), r.pending = i, i = Vl(t), xd(t, null, s), i;
    }
    return Ia(t, r, i, s), Vl(t);
  }
  function Cs(t, i, s) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (s & 4194048) !== 0)) {
      var r = i.lanes;
      r &= t.pendingLanes, s |= r, i.lanes = s, si(t, s);
    }
  }
  function or(t, i) {
    var s = t.updateQueue, r = t.alternate;
    if (r !== null && (r = r.updateQueue, s === r)) {
      var d = null, m = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var A = {
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          };
          m === null ? d = m = A : m = m.next = A, s = s.next;
        } while (s !== null);
        m === null ? d = m = i : m = m.next = i;
      } else d = m = i;
      s = {
        baseState: r.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: m,
        shared: r.shared,
        callbacks: r.callbacks
      }, t.updateQueue = s;
      return;
    }
    t = s.lastBaseUpdate, t === null ? s.firstBaseUpdate = i : t.next = i, s.lastBaseUpdate = i;
  }
  var Su = !1;
  function hr() {
    if (Su) {
      var t = $l;
      if (t !== null) throw t;
    }
  }
  function ur(t, i, s, r) {
    Su = !1;
    var d = t.updateQueue;
    Os = !1;
    var m = d.firstBaseUpdate, A = d.lastBaseUpdate, k = d.shared.pending;
    if (k !== null) {
      d.shared.pending = null;
      var N = k, q = N.next;
      N.next = null, A === null ? m = q : A.next = q, A = N;
      var F = t.alternate;
      F !== null && (F = F.updateQueue, k = F.lastBaseUpdate, k !== A && (k === null ? F.firstBaseUpdate = q : k.next = q, F.lastBaseUpdate = N));
    }
    if (m !== null) {
      var $ = d.baseState;
      A = 0, F = q = N = null, k = m;
      do {
        var _ = k.lane & -536870913, V = _ !== k.lane;
        if (V ? (Kt & _) === _ : (r & _) === _) {
          _ !== 0 && _ === Jl && (Su = !0), F !== null && (F = F.next = {
            lane: 0,
            tag: k.tag,
            payload: k.payload,
            callback: null,
            next: null
          });
          t: {
            var Bt = t, Dt = k;
            _ = i;
            var ve = s;
            switch (Dt.tag) {
              case 1:
                if (Bt = Dt.payload, typeof Bt == "function") {
                  $ = Bt.call(ve, $, _);
                  break t;
                }
                $ = Bt;
                break t;
              case 3:
                Bt.flags = Bt.flags & -65537 | 128;
              case 0:
                if (Bt = Dt.payload, _ = typeof Bt == "function" ? Bt.call(ve, $, _) : Bt, _ == null) break t;
                $ = pt({}, $, _);
                break t;
              case 2:
                Os = !0;
            }
          }
          _ = k.callback, _ !== null && (t.flags |= 64, V && (t.flags |= 8192), V = d.callbacks, V === null ? d.callbacks = [_] : V.push(_));
        } else
          V = {
            lane: _,
            tag: k.tag,
            payload: k.payload,
            callback: k.callback,
            next: null
          }, F === null ? (q = F = V, N = $) : F = F.next = V, A |= _;
        if (k = k.next, k === null) {
          if (k = d.shared.pending, k === null)
            break;
          V = k, k = V.next, V.next = null, d.lastBaseUpdate = V, d.shared.pending = null;
        }
      } while (!0);
      F === null && (N = $), d.baseState = N, d.firstBaseUpdate = q, d.lastBaseUpdate = F, m === null && (d.shared.lanes = 0), sa |= A, t.lanes = A, t.memoizedState = $;
    }
  }
  function es(t, i) {
    if (typeof t != "function")
      throw Error(D(191, t));
    t.call(i);
  }
  function cr(t, i) {
    var s = t.callbacks;
    if (s !== null)
      for (t.callbacks = null, t = 0; t < s.length; t++)
        es(s[t], i);
  }
  var fl = ai(null), ma = ai(0);
  function kd(t, i) {
    t = ui, Ft(ma, t), Ft(fl, i), ui = t | i.baseLanes;
  }
  function wo() {
    Ft(ma, ui), Ft(fl, fl.current);
  }
  function Mu() {
    ui = ma.current, Te(fl), Te(ma);
  }
  var ea = 0, Nt = null, ue = null, Le = null, Co = !1, an = !1, Ke = !1, ko = 0, pl = 0, ks = null, Dd = 0;
  function ce() {
    throw Error(D(321));
  }
  function sn(t, i) {
    if (i === null) return !1;
    for (var s = 0; s < i.length && s < t.length; s++)
      if (!ri(t[s], i[s])) return !1;
    return !0;
  }
  function ln(t, i, s, r, d, m) {
    return ea = m, Nt = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, K.H = t === null || t.memoizedState === null ? wa : Uu, Ke = !1, m = s(r, d), Ke = !1, an && (m = zd(
      i,
      s,
      r,
      d
    )), Ld(t), m;
  }
  function Ld(t) {
    K.H = Yo;
    var i = ue !== null && ue.next !== null;
    if (ea = 0, Le = ue = Nt = null, Co = !1, pl = 0, ks = null, i) throw Error(D(300));
    t === null || Fe || (t = t.dependencies, t !== null && So(t) && (Fe = !0));
  }
  function zd(t, i, s, r) {
    Nt = t;
    var d = 0;
    do {
      if (an && (ks = null), pl = 0, an = !1, 25 <= d) throw Error(D(301));
      if (d += 1, Le = ue = null, t.updateQueue != null) {
        var m = t.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      K.H = vl, m = i(s, r);
    } while (an);
    return m;
  }
  function Oa() {
    var t = K.H, i = t.useState()[0];
    return i = typeof i.then == "function" ? gl(i) : i, t = t.useState()[0], (ue !== null ? ue.memoizedState : null) !== t && (Nt.flags |= 1024), i;
  }
  function Tu() {
    var t = ko !== 0;
    return ko = 0, t;
  }
  function Do(t, i, s) {
    i.updateQueue = t.updateQueue, i.flags &= -2053, t.lanes &= ~s;
  }
  function Re(t) {
    if (Co) {
      for (t = t.memoizedState; t !== null; ) {
        var i = t.queue;
        i !== null && (i.pending = null), t = t.next;
      }
      Co = !1;
    }
    ea = 0, Le = ue = Nt = null, an = !1, pl = ko = 0, ks = null;
  }
  function mi() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Le === null ? Nt.memoizedState = Le = t : Le = Le.next = t, Le;
  }
  function Ye() {
    if (ue === null) {
      var t = Nt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = ue.next;
    var i = Le === null ? Nt.memoizedState : Le.next;
    if (i !== null)
      Le = i, ue = t;
    else {
      if (t === null)
        throw Nt.alternate === null ? Error(D(467)) : Error(D(310));
      ue = t, t = {
        memoizedState: ue.memoizedState,
        baseState: ue.baseState,
        baseQueue: ue.baseQueue,
        queue: ue.queue,
        next: null
      }, Le === null ? Nt.memoizedState = Le = t : Le = Le.next = t;
    }
    return Le;
  }
  function Lo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function gl(t) {
    var i = pl;
    return pl += 1, ks === null && (ks = []), t = wd(ks, t, i), i = Nt, (Le === null ? i.memoizedState : Le.next) === null && (i = i.alternate, K.H = i === null || i.memoizedState === null ? wa : Uu), t;
  }
  function Ds(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return gl(t);
      if (t.$$typeof === mt) return oi(t);
    }
    throw Error(D(438, String(t)));
  }
  function ml(t) {
    var i = null, s = Nt.updateQueue;
    if (s !== null && (i = s.memoCache), i == null) {
      var r = Nt.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (i = {
        data: r.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (i == null && (i = { data: [], index: 0 }), s === null && (s = Lo(), Nt.updateQueue = s), s.memoCache = i, s = i.data[i.index], s === void 0)
      for (s = i.data[i.index] = Array(t), r = 0; r < t; r++)
        s[r] = ie;
    return i.index++, s;
  }
  function ia(t, i) {
    return typeof i == "function" ? i(t) : i;
  }
  function zo(t) {
    var i = Ye();
    return Au(i, ue, t);
  }
  function Au(t, i, s) {
    var r = t.queue;
    if (r === null) throw Error(D(311));
    r.lastRenderedReducer = s;
    var d = t.baseQueue, m = r.pending;
    if (m !== null) {
      if (d !== null) {
        var A = d.next;
        d.next = m.next, m.next = A;
      }
      i.baseQueue = d = m, r.pending = null;
    }
    if (m = t.baseState, d === null) t.memoizedState = m;
    else {
      i = d.next;
      var k = A = null, N = null, q = i, F = !1;
      do {
        var $ = q.lane & -536870913;
        if ($ !== q.lane ? (Kt & $) === $ : (ea & $) === $) {
          var _ = q.revertLane;
          if (_ === 0)
            N !== null && (N = N.next = {
              lane: 0,
              revertLane: 0,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }), $ === Jl && (F = !0);
          else if ((ea & _) === _) {
            q = q.next, _ === Jl && (F = !0);
            continue;
          } else
            $ = {
              lane: 0,
              revertLane: q.revertLane,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }, N === null ? (k = N = $, A = m) : N = N.next = $, Nt.lanes |= _, sa |= _;
          $ = q.action, Ke && s(m, $), m = q.hasEagerState ? q.eagerState : s(m, $);
        } else
          _ = {
            lane: $,
            revertLane: q.revertLane,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, N === null ? (k = N = _, A = m) : N = N.next = _, Nt.lanes |= $, sa |= $;
        q = q.next;
      } while (q !== null && q !== i);
      if (N === null ? A = m : N.next = k, !ri(m, t.memoizedState) && (Fe = !0, F && (s = $l, s !== null)))
        throw s;
      t.memoizedState = m, t.baseState = A, t.baseQueue = N, r.lastRenderedState = m;
    }
    return d === null && (r.lanes = 0), [t.memoizedState, r.dispatch];
  }
  function Ro(t) {
    var i = Ye(), s = i.queue;
    if (s === null) throw Error(D(311));
    s.lastRenderedReducer = t;
    var r = s.dispatch, d = s.pending, m = i.memoizedState;
    if (d !== null) {
      s.pending = null;
      var A = d = d.next;
      do
        m = t(m, A.action), A = A.next;
      while (A !== d);
      ri(m, i.memoizedState) || (Fe = !0), i.memoizedState = m, i.baseQueue === null && (i.baseState = m), s.lastRenderedState = m;
    }
    return [m, r];
  }
  function Ou(t, i, s) {
    var r = Nt, d = Ye(), m = $t;
    if (m) {
      if (s === void 0) throw Error(D(407));
      s = s();
    } else s = i();
    var A = !ri(
      (ue || d).memoizedState,
      s
    );
    A && (d.memoizedState = s, Fe = !0), d = d.queue;
    var k = Nd.bind(null, r, d, t);
    if (Ea(2048, 8, k, [t]), d.getSnapshot !== i || A || Le !== null && Le.memoizedState.tag & 1) {
      if (r.flags |= 2048, nn(
        9,
        Uo(),
        Rd.bind(
          null,
          r,
          d,
          s,
          i
        ),
        null
      ), oe === null) throw Error(D(349));
      m || (ea & 124) !== 0 || Eu(r, i, s);
    }
    return s;
  }
  function Eu(t, i, s) {
    t.flags |= 16384, t = { getSnapshot: i, value: s }, i = Nt.updateQueue, i === null ? (i = Lo(), Nt.updateQueue = i, i.stores = [t]) : (s = i.stores, s === null ? i.stores = [t] : s.push(t));
  }
  function Rd(t, i, s, r) {
    i.value = s, i.getSnapshot = r, Bd(i) && Ee(t);
  }
  function Nd(t, i, s) {
    return s(function() {
      Bd(i) && Ee(t);
    });
  }
  function Bd(t) {
    var i = t.getSnapshot;
    t = t.value;
    try {
      var s = i();
      return !ri(t, s);
    } catch {
      return !0;
    }
  }
  function Ee(t) {
    var i = rl(t, 2);
    i !== null && ci(i, t, 2);
  }
  function No(t) {
    var i = mi();
    if (typeof t == "function") {
      var s = t;
      if (t = s(), Ke) {
        ps(!0);
        try {
          s();
        } finally {
          ps(!1);
        }
      }
    }
    return i.memoizedState = i.baseState = t, i.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ia,
      lastRenderedState: t
    }, i;
  }
  function Hd(t, i, s, r) {
    return t.baseState = s, Au(
      t,
      ue,
      typeof r == "function" ? r : ia
    );
  }
  function Bo(t, i, s, r, d) {
    if (Xo(t)) throw Error(D(485));
    if (t = i.action, t !== null) {
      var m = {
        payload: d,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(A) {
          m.listeners.push(A);
        }
      };
      K.T !== null ? s(!0) : m.isTransition = !1, r(m), s = i.pending, s === null ? (m.next = i.pending = m, Ud(i, m)) : (m.next = s.next, i.pending = s.next = m);
    }
  }
  function Ud(t, i) {
    var s = i.action, r = i.payload, d = t.state;
    if (i.isTransition) {
      var m = K.T, A = {};
      K.T = A;
      try {
        var k = s(d, r), N = K.S;
        N !== null && N(A, k), Xd(t, i, k);
      } catch (q) {
        Ls(t, i, q);
      } finally {
        K.T = m;
      }
    } else
      try {
        m = s(d, r), Xd(t, i, m);
      } catch (q) {
        Ls(t, i, q);
      }
  }
  function Xd(t, i, s) {
    s !== null && typeof s == "object" && typeof s.then == "function" ? s.then(
      function(r) {
        Gd(t, i, r);
      },
      function(r) {
        return Ls(t, i, r);
      }
    ) : Gd(t, i, s);
  }
  function Gd(t, i, s) {
    i.status = "fulfilled", i.value = s, Yd(i), t.state = s, i = t.pending, i !== null && (s = i.next, s === i ? t.pending = null : (s = s.next, i.next = s, Ud(t, s)));
  }
  function Ls(t, i, s) {
    var r = t.pending;
    if (t.pending = null, r !== null) {
      r = r.next;
      do
        i.status = "rejected", i.reason = s, Yd(i), i = i.next;
      while (i !== r);
    }
    t.action = null;
  }
  function Yd(t) {
    t = t.listeners;
    for (var i = 0; i < t.length; i++) (0, t[i])();
  }
  function Ho(t, i) {
    return i;
  }
  function wu(t, i) {
    if ($t) {
      var s = oe.formState;
      if (s !== null) {
        t: {
          var r = Nt;
          if ($t) {
            if (De) {
              e: {
                for (var d = De, m = Ta; d.nodeType !== 8; ) {
                  if (!m) {
                    d = null;
                    break e;
                  }
                  if (d = kt(
                    d.nextSibling
                  ), d === null) {
                    d = null;
                    break e;
                  }
                }
                m = d.data, d = m === "F!" || m === "F" ? d : null;
              }
              if (d) {
                De = kt(
                  d.nextSibling
                ), r = d.data === "F!";
                break t;
              }
            }
            hl(r);
          }
          r = !1;
        }
        r && (i = s[0]);
      }
    }
    return s = mi(), s.memoizedState = s.baseState = i, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ho,
      lastRenderedState: i
    }, s.queue = r, s = Kd.bind(
      null,
      Nt,
      r
    ), r.dispatch = s, r = No(!1), m = Hu.bind(
      null,
      Nt,
      !1,
      r.queue
    ), r = mi(), d = {
      state: i,
      dispatch: null,
      action: t,
      pending: null
    }, r.queue = d, s = Bo.bind(
      null,
      Nt,
      d,
      m,
      s
    ), d.dispatch = s, r.memoizedState = t, [i, s, !1];
  }
  function Cu(t) {
    var i = Ye();
    return ku(i, ue, t);
  }
  function ku(t, i, s) {
    if (i = Au(
      t,
      i,
      Ho
    )[0], t = zo(ia)[0], typeof i == "object" && i !== null && typeof i.then == "function")
      try {
        var r = gl(i);
      } catch (A) {
        throw A === rr ? Eo : A;
      }
    else r = i;
    i = Ye();
    var d = i.queue, m = d.dispatch;
    return s !== i.memoizedState && (Nt.flags |= 2048, nn(
      9,
      Uo(),
      Lp.bind(null, d, s),
      null
    )), [r, m, t];
  }
  function Lp(t, i) {
    t.action = i;
  }
  function Ne(t) {
    var i = Ye(), s = ue;
    if (s !== null)
      return ku(i, s, t);
    Ye(), i = i.memoizedState, s = Ye();
    var r = s.queue.dispatch;
    return s.memoizedState = t, [i, r, !1];
  }
  function nn(t, i, s, r) {
    return t = { tag: t, create: s, deps: r, inst: i, next: null }, i = Nt.updateQueue, i === null && (i = Lo(), Nt.updateQueue = i), s = i.lastEffect, s === null ? i.lastEffect = t.next = t : (r = s.next, s.next = t, t.next = r, i.lastEffect = t), t;
  }
  function Uo() {
    return { destroy: void 0, resource: void 0 };
  }
  function Du() {
    return Ye().memoizedState;
  }
  function yl(t, i, s, r) {
    var d = mi();
    r = r === void 0 ? null : r, Nt.flags |= t, d.memoizedState = nn(
      1 | i,
      Uo(),
      s,
      r
    );
  }
  function Ea(t, i, s, r) {
    var d = Ye();
    r = r === void 0 ? null : r;
    var m = d.memoizedState.inst;
    ue !== null && r !== null && sn(r, ue.memoizedState.deps) ? d.memoizedState = nn(i, m, s, r) : (Nt.flags |= t, d.memoizedState = nn(
      1 | i,
      m,
      s,
      r
    ));
  }
  function jd(t, i) {
    yl(8390656, 8, t, i);
  }
  function we(t, i) {
    Ea(2048, 8, t, i);
  }
  function Pd(t, i) {
    return Ea(4, 2, t, i);
  }
  function Lu(t, i) {
    return Ea(4, 4, t, i);
  }
  function zu(t, i) {
    if (typeof i == "function") {
      t = t();
      var s = i(t);
      return function() {
        typeof s == "function" ? s() : i(null);
      };
    }
    if (i != null)
      return t = t(), i.current = t, function() {
        i.current = null;
      };
  }
  function Ru(t, i, s) {
    s = s != null ? s.concat([t]) : null, Ea(4, 4, zu.bind(null, i, t), s);
  }
  function Be() {
  }
  function qd(t, i) {
    var s = Ye();
    i = i === void 0 ? null : i;
    var r = s.memoizedState;
    return i !== null && sn(i, r[1]) ? r[0] : (s.memoizedState = [t, i], t);
  }
  function rn(t, i) {
    var s = Ye();
    i = i === void 0 ? null : i;
    var r = s.memoizedState;
    if (i !== null && sn(i, r[1]))
      return r[0];
    if (r = t(), Ke) {
      ps(!0);
      try {
        t();
      } finally {
        ps(!1);
      }
    }
    return s.memoizedState = [r, i], r;
  }
  function dr(t, i, s) {
    return s === void 0 || (ea & 1073741824) !== 0 ? t.memoizedState = i : (t.memoizedState = s, t = uh(), Nt.lanes |= t, sa |= t, s);
  }
  function be(t, i, s, r) {
    return ri(s, i) ? s : fl.current !== null ? (t = dr(t, s, r), ri(t, i) || (Fe = !0), t) : (ea & 42) === 0 ? (Fe = !0, t.memoizedState = s) : (t = uh(), Nt.lanes |= t, sa |= t, i);
  }
  function _d(t, i, s, r, d) {
    var m = ut.p;
    ut.p = m !== 0 && 8 > m ? m : 8;
    var A = K.T, k = {};
    K.T = k, Hu(t, !1, i, s);
    try {
      var N = d(), q = K.S;
      if (q !== null && q(k, N), N !== null && typeof N == "object" && typeof N.then == "function") {
        var F = Dp(
          N,
          r
        );
        zs(
          t,
          i,
          F,
          Yi(t)
        );
      } else
        zs(
          t,
          i,
          r,
          Yi(t)
        );
    } catch ($) {
      zs(
        t,
        i,
        { then: function() {
        }, status: "rejected", reason: $ },
        Yi()
      );
    } finally {
      ut.p = m, K.T = A;
    }
  }
  function Qd() {
  }
  function Hi(t, i, s, r) {
    if (t.tag !== 5) throw Error(D(476));
    var d = Mi(t).queue;
    _d(
      t,
      d,
      i,
      Rt,
      s === null ? Qd : function() {
        return Zd(t), s(r);
      }
    );
  }
  function Mi(t) {
    var i = t.memoizedState;
    if (i !== null) return i;
    i = {
      memoizedState: Rt,
      baseState: Rt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: Rt
      },
      next: null
    };
    var s = {};
    return i.next = {
      memoizedState: s,
      baseState: s,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: s
      },
      next: null
    }, t.memoizedState = i, t = t.alternate, t !== null && (t.memoizedState = i), i;
  }
  function Zd(t) {
    var i = Mi(t).next.queue;
    zs(t, i, {}, Yi());
  }
  function Nu() {
    return oi(Ec);
  }
  function Bu() {
    return Ye().memoizedState;
  }
  function Vd() {
    return Ye().memoizedState;
  }
  function Wd(t) {
    for (var i = t.return; i !== null; ) {
      switch (i.tag) {
        case 24:
        case 3:
          var s = Yi();
          t = Es(s);
          var r = ws(i, t, s);
          r !== null && (ci(r, i, s), Cs(r, i, s)), i = { cache: gu() }, t.payload = i;
          return;
      }
      i = i.return;
    }
  }
  function zp(t, i, s) {
    var r = Yi();
    s = {
      lane: r,
      revertLane: 0,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xo(t) ? Go(i, s) : (s = uu(t, i, s, r), s !== null && (ci(s, t, r), Fd(s, i, r)));
  }
  function Kd(t, i, s) {
    var r = Yi();
    zs(t, i, s, r);
  }
  function zs(t, i, s, r) {
    var d = {
      lane: r,
      revertLane: 0,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xo(t)) Go(i, d);
    else {
      var m = t.alternate;
      if (t.lanes === 0 && (m === null || m.lanes === 0) && (m = i.lastRenderedReducer, m !== null))
        try {
          var A = i.lastRenderedState, k = m(A, s);
          if (d.hasEagerState = !0, d.eagerState = k, ri(k, A))
            return Ia(t, i, d, 0), oe === null && Ni(), !1;
        } catch {
        } finally {
        }
      if (s = uu(t, i, d, r), s !== null)
        return ci(s, t, r), Fd(s, i, r), !0;
    }
    return !1;
  }
  function Hu(t, i, s, r) {
    if (r = {
      lane: 2,
      revertLane: xc(),
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xo(t)) {
      if (i) throw Error(D(479));
    } else
      i = uu(
        t,
        s,
        r,
        2
      ), i !== null && ci(i, t, 2);
  }
  function Xo(t) {
    var i = t.alternate;
    return t === Nt || i !== null && i === Nt;
  }
  function Go(t, i) {
    an = Co = !0;
    var s = t.pending;
    s === null ? i.next = i : (i.next = s.next, s.next = i), t.pending = i;
  }
  function Fd(t, i, s) {
    if ((s & 4194048) !== 0) {
      var r = i.lanes;
      r &= t.pendingLanes, s |= r, i.lanes = s, si(t, s);
    }
  }
  var Yo = {
    readContext: oi,
    use: Ds,
    useCallback: ce,
    useContext: ce,
    useEffect: ce,
    useImperativeHandle: ce,
    useLayoutEffect: ce,
    useInsertionEffect: ce,
    useMemo: ce,
    useReducer: ce,
    useRef: ce,
    useState: ce,
    useDebugValue: ce,
    useDeferredValue: ce,
    useTransition: ce,
    useSyncExternalStore: ce,
    useId: ce,
    useHostTransitionStatus: ce,
    useFormState: ce,
    useActionState: ce,
    useOptimistic: ce,
    useMemoCache: ce,
    useCacheRefresh: ce
  }, wa = {
    readContext: oi,
    use: Ds,
    useCallback: function(t, i) {
      return mi().memoizedState = [
        t,
        i === void 0 ? null : i
      ], t;
    },
    useContext: oi,
    useEffect: jd,
    useImperativeHandle: function(t, i, s) {
      s = s != null ? s.concat([t]) : null, yl(
        4194308,
        4,
        zu.bind(null, i, t),
        s
      );
    },
    useLayoutEffect: function(t, i) {
      return yl(4194308, 4, t, i);
    },
    useInsertionEffect: function(t, i) {
      yl(4, 2, t, i);
    },
    useMemo: function(t, i) {
      var s = mi();
      i = i === void 0 ? null : i;
      var r = t();
      if (Ke) {
        ps(!0);
        try {
          t();
        } finally {
          ps(!1);
        }
      }
      return s.memoizedState = [r, i], r;
    },
    useReducer: function(t, i, s) {
      var r = mi();
      if (s !== void 0) {
        var d = s(i);
        if (Ke) {
          ps(!0);
          try {
            s(i);
          } finally {
            ps(!1);
          }
        }
      } else d = i;
      return r.memoizedState = r.baseState = d, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: d
      }, r.queue = t, t = t.dispatch = zp.bind(
        null,
        Nt,
        t
      ), [r.memoizedState, t];
    },
    useRef: function(t) {
      var i = mi();
      return t = { current: t }, i.memoizedState = t;
    },
    useState: function(t) {
      t = No(t);
      var i = t.queue, s = Kd.bind(null, Nt, i);
      return i.dispatch = s, [t.memoizedState, s];
    },
    useDebugValue: Be,
    useDeferredValue: function(t, i) {
      var s = mi();
      return dr(s, t, i);
    },
    useTransition: function() {
      var t = No(!1);
      return t = _d.bind(
        null,
        Nt,
        t.queue,
        !0,
        !1
      ), mi().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, i, s) {
      var r = Nt, d = mi();
      if ($t) {
        if (s === void 0)
          throw Error(D(407));
        s = s();
      } else {
        if (s = i(), oe === null)
          throw Error(D(349));
        (Kt & 124) !== 0 || Eu(r, i, s);
      }
      d.memoizedState = s;
      var m = { value: s, getSnapshot: i };
      return d.queue = m, jd(Nd.bind(null, r, m, t), [
        t
      ]), r.flags |= 2048, nn(
        9,
        Uo(),
        Rd.bind(
          null,
          r,
          m,
          s,
          i
        ),
        null
      ), s;
    },
    useId: function() {
      var t = mi(), i = oe.identifierPrefix;
      if ($t) {
        var s = $a, r = $i;
        s = (r & ~(1 << 32 - Li(r) - 1)).toString(32) + s, i = "«" + i + "R" + s, s = ko++, 0 < s && (i += "H" + s.toString(32)), i += "»";
      } else
        s = Dd++, i = "«" + i + "r" + s.toString(32) + "»";
      return t.memoizedState = i;
    },
    useHostTransitionStatus: Nu,
    useFormState: wu,
    useActionState: wu,
    useOptimistic: function(t) {
      var i = mi();
      i.memoizedState = i.baseState = t;
      var s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return i.queue = s, i = Hu.bind(
        null,
        Nt,
        !0,
        s
      ), s.dispatch = i, [t, i];
    },
    useMemoCache: ml,
    useCacheRefresh: function() {
      return mi().memoizedState = Wd.bind(
        null,
        Nt
      );
    }
  }, Uu = {
    readContext: oi,
    use: Ds,
    useCallback: qd,
    useContext: oi,
    useEffect: we,
    useImperativeHandle: Ru,
    useInsertionEffect: Pd,
    useLayoutEffect: Lu,
    useMemo: rn,
    useReducer: zo,
    useRef: Du,
    useState: function() {
      return zo(ia);
    },
    useDebugValue: Be,
    useDeferredValue: function(t, i) {
      var s = Ye();
      return be(
        s,
        ue.memoizedState,
        t,
        i
      );
    },
    useTransition: function() {
      var t = zo(ia)[0], i = Ye().memoizedState;
      return [
        typeof t == "boolean" ? t : gl(t),
        i
      ];
    },
    useSyncExternalStore: Ou,
    useId: Bu,
    useHostTransitionStatus: Nu,
    useFormState: Cu,
    useActionState: Cu,
    useOptimistic: function(t, i) {
      var s = Ye();
      return Hd(s, ue, t, i);
    },
    useMemoCache: ml,
    useCacheRefresh: Vd
  }, vl = {
    readContext: oi,
    use: Ds,
    useCallback: qd,
    useContext: oi,
    useEffect: we,
    useImperativeHandle: Ru,
    useInsertionEffect: Pd,
    useLayoutEffect: Lu,
    useMemo: rn,
    useReducer: Ro,
    useRef: Du,
    useState: function() {
      return Ro(ia);
    },
    useDebugValue: Be,
    useDeferredValue: function(t, i) {
      var s = Ye();
      return ue === null ? dr(s, t, i) : be(
        s,
        ue.memoizedState,
        t,
        i
      );
    },
    useTransition: function() {
      var t = Ro(ia)[0], i = Ye().memoizedState;
      return [
        typeof t == "boolean" ? t : gl(t),
        i
      ];
    },
    useSyncExternalStore: Ou,
    useId: Bu,
    useHostTransitionStatus: Nu,
    useFormState: Ne,
    useActionState: Ne,
    useOptimistic: function(t, i) {
      var s = Ye();
      return ue !== null ? Hd(s, ue, t, i) : (s.baseState = t, [t, s.queue.dispatch]);
    },
    useMemoCache: ml,
    useCacheRefresh: Vd
  }, ei = null, fr = 0;
  function jo(t) {
    var i = fr;
    return fr += 1, ei === null && (ei = []), wd(ei, t, i);
  }
  function pr(t, i) {
    i = i.props.ref, t.ref = i !== void 0 ? i : null;
  }
  function Po(t, i) {
    throw i.$$typeof === ot ? Error(D(525)) : (t = Object.prototype.toString.call(i), Error(
      D(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : t
      )
    ));
  }
  function qo(t) {
    var i = t._init;
    return i(t._payload);
  }
  function Xu(t) {
    function i(G, U) {
      if (t) {
        var P = G.deletions;
        P === null ? (G.deletions = [U], G.flags |= 16) : P.push(U);
      }
    }
    function s(G, U) {
      if (!t) return null;
      for (; U !== null; )
        i(G, U), U = U.sibling;
      return null;
    }
    function r(G) {
      for (var U = /* @__PURE__ */ new Map(); G !== null; )
        G.key !== null ? U.set(G.key, G) : U.set(G.index, G), G = G.sibling;
      return U;
    }
    function d(G, U) {
      return G = ga(G, U), G.index = 0, G.sibling = null, G;
    }
    function m(G, U, P) {
      return G.index = P, t ? (P = G.alternate, P !== null ? (P = P.index, P < U ? (G.flags |= 67108866, U) : P) : (G.flags |= 67108866, U)) : (G.flags |= 1048576, U);
    }
    function A(G) {
      return t && G.alternate === null && (G.flags |= 67108866), G;
    }
    function k(G, U, P, I) {
      return U === null || U.tag !== 6 ? (U = yo(P, G.mode, I), U.return = G, U) : (U = d(U, P), U.return = G, U);
    }
    function N(G, U, P, I) {
      var vt = P.type;
      return vt === ft ? F(
        G,
        U,
        P.props.children,
        I,
        P.key
      ) : U !== null && (U.elementType === vt || typeof vt == "object" && vt !== null && vt.$$typeof === Z && qo(vt) === U.type) ? (U = d(U, P.props), pr(U, P), U.return = G, U) : (U = ae(
        P.type,
        P.key,
        P.props,
        null,
        G.mode,
        I
      ), pr(U, P), U.return = G, U);
    }
    function q(G, U, P, I) {
      return U === null || U.tag !== 4 || U.stateNode.containerInfo !== P.containerInfo || U.stateNode.implementation !== P.implementation ? (U = tr(P, G.mode, I), U.return = G, U) : (U = d(U, P.children || []), U.return = G, U);
    }
    function F(G, U, P, I, vt) {
      return U === null || U.tag !== 7 ? (U = ol(
        P,
        G.mode,
        I,
        vt
      ), U.return = G, U) : (U = d(U, P), U.return = G, U);
    }
    function $(G, U, P) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return U = yo(
          "" + U,
          G.mode,
          P
        ), U.return = G, U;
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case yt:
            return P = ae(
              U.type,
              U.key,
              U.props,
              null,
              G.mode,
              P
            ), pr(P, U), P.return = G, P;
          case dt:
            return U = tr(
              U,
              G.mode,
              P
            ), U.return = G, U;
          case Z:
            var I = U._init;
            return U = I(U._payload), $(G, U, P);
        }
        if (_i(U) || Ce(U))
          return U = ol(
            U,
            G.mode,
            P,
            null
          ), U.return = G, U;
        if (typeof U.then == "function")
          return $(G, jo(U), P);
        if (U.$$typeof === mt)
          return $(
            G,
            lr(G, U),
            P
          );
        Po(G, U);
      }
      return null;
    }
    function _(G, U, P, I) {
      var vt = U !== null ? U.key : null;
      if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint")
        return vt !== null ? null : k(G, U, "" + P, I);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case yt:
            return P.key === vt ? N(G, U, P, I) : null;
          case dt:
            return P.key === vt ? q(G, U, P, I) : null;
          case Z:
            return vt = P._init, P = vt(P._payload), _(G, U, P, I);
        }
        if (_i(P) || Ce(P))
          return vt !== null ? null : F(G, U, P, I, null);
        if (typeof P.then == "function")
          return _(
            G,
            U,
            jo(P),
            I
          );
        if (P.$$typeof === mt)
          return _(
            G,
            U,
            lr(G, P),
            I
          );
        Po(G, P);
      }
      return null;
    }
    function V(G, U, P, I, vt) {
      if (typeof I == "string" && I !== "" || typeof I == "number" || typeof I == "bigint")
        return G = G.get(P) || null, k(U, G, "" + I, vt);
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case yt:
            return G = G.get(
              I.key === null ? P : I.key
            ) || null, N(U, G, I, vt);
          case dt:
            return G = G.get(
              I.key === null ? P : I.key
            ) || null, q(U, G, I, vt);
          case Z:
            var Wt = I._init;
            return I = Wt(I._payload), V(
              G,
              U,
              P,
              I,
              vt
            );
        }
        if (_i(I) || Ce(I))
          return G = G.get(P) || null, F(U, G, I, vt, null);
        if (typeof I.then == "function")
          return V(
            G,
            U,
            P,
            jo(I),
            vt
          );
        if (I.$$typeof === mt)
          return V(
            G,
            U,
            P,
            lr(U, I),
            vt
          );
        Po(U, I);
      }
      return null;
    }
    function Bt(G, U, P, I) {
      for (var vt = null, Wt = null, Et = U, zt = U = 0, di = null; Et !== null && zt < P.length; zt++) {
        Et.index > zt ? (di = Et, Et = null) : di = Et.sibling;
        var le = _(
          G,
          Et,
          P[zt],
          I
        );
        if (le === null) {
          Et === null && (Et = di);
          break;
        }
        t && Et && le.alternate === null && i(G, Et), U = m(le, U, zt), Wt === null ? vt = le : Wt.sibling = le, Wt = le, Et = di;
      }
      if (zt === P.length)
        return s(G, Et), $t && Ma(G, zt), vt;
      if (Et === null) {
        for (; zt < P.length; zt++)
          Et = $(G, P[zt], I), Et !== null && (U = m(
            Et,
            U,
            zt
          ), Wt === null ? vt = Et : Wt.sibling = Et, Wt = Et);
        return $t && Ma(G, zt), vt;
      }
      for (Et = r(Et); zt < P.length; zt++)
        di = V(
          Et,
          G,
          zt,
          P[zt],
          I
        ), di !== null && (t && di.alternate !== null && Et.delete(
          di.key === null ? zt : di.key
        ), U = m(
          di,
          U,
          zt
        ), Wt === null ? vt = di : Wt.sibling = di, Wt = di);
      return t && Et.forEach(function(Sn) {
        return i(G, Sn);
      }), $t && Ma(G, zt), vt;
    }
    function Dt(G, U, P, I) {
      if (P == null) throw Error(D(151));
      for (var vt = null, Wt = null, Et = U, zt = U = 0, di = null, le = P.next(); Et !== null && !le.done; zt++, le = P.next()) {
        Et.index > zt ? (di = Et, Et = null) : di = Et.sibling;
        var Sn = _(G, Et, le.value, I);
        if (Sn === null) {
          Et === null && (Et = di);
          break;
        }
        t && Et && Sn.alternate === null && i(G, Et), U = m(Sn, U, zt), Wt === null ? vt = Sn : Wt.sibling = Sn, Wt = Sn, Et = di;
      }
      if (le.done)
        return s(G, Et), $t && Ma(G, zt), vt;
      if (Et === null) {
        for (; !le.done; zt++, le = P.next())
          le = $(G, le.value, I), le !== null && (U = m(le, U, zt), Wt === null ? vt = le : Wt.sibling = le, Wt = le);
        return $t && Ma(G, zt), vt;
      }
      for (Et = r(Et); !le.done; zt++, le = P.next())
        le = V(Et, G, zt, le.value, I), le !== null && (t && le.alternate !== null && Et.delete(le.key === null ? zt : le.key), U = m(le, U, zt), Wt === null ? vt = le : Wt.sibling = le, Wt = le);
      return t && Et.forEach(function(Ym) {
        return i(G, Ym);
      }), $t && Ma(G, zt), vt;
    }
    function ve(G, U, P, I) {
      if (typeof P == "object" && P !== null && P.type === ft && P.key === null && (P = P.props.children), typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case yt:
            t: {
              for (var vt = P.key; U !== null; ) {
                if (U.key === vt) {
                  if (vt = P.type, vt === ft) {
                    if (U.tag === 7) {
                      s(
                        G,
                        U.sibling
                      ), I = d(
                        U,
                        P.props.children
                      ), I.return = G, G = I;
                      break t;
                    }
                  } else if (U.elementType === vt || typeof vt == "object" && vt !== null && vt.$$typeof === Z && qo(vt) === U.type) {
                    s(
                      G,
                      U.sibling
                    ), I = d(U, P.props), pr(I, P), I.return = G, G = I;
                    break t;
                  }
                  s(G, U);
                  break;
                } else i(G, U);
                U = U.sibling;
              }
              P.type === ft ? (I = ol(
                P.props.children,
                G.mode,
                I,
                P.key
              ), I.return = G, G = I) : (I = ae(
                P.type,
                P.key,
                P.props,
                null,
                G.mode,
                I
              ), pr(I, P), I.return = G, G = I);
            }
            return A(G);
          case dt:
            t: {
              for (vt = P.key; U !== null; ) {
                if (U.key === vt)
                  if (U.tag === 4 && U.stateNode.containerInfo === P.containerInfo && U.stateNode.implementation === P.implementation) {
                    s(
                      G,
                      U.sibling
                    ), I = d(U, P.children || []), I.return = G, G = I;
                    break t;
                  } else {
                    s(G, U);
                    break;
                  }
                else i(G, U);
                U = U.sibling;
              }
              I = tr(P, G.mode, I), I.return = G, G = I;
            }
            return A(G);
          case Z:
            return vt = P._init, P = vt(P._payload), ve(
              G,
              U,
              P,
              I
            );
        }
        if (_i(P))
          return Bt(
            G,
            U,
            P,
            I
          );
        if (Ce(P)) {
          if (vt = Ce(P), typeof vt != "function") throw Error(D(150));
          return P = vt.call(P), Dt(
            G,
            U,
            P,
            I
          );
        }
        if (typeof P.then == "function")
          return ve(
            G,
            U,
            jo(P),
            I
          );
        if (P.$$typeof === mt)
          return ve(
            G,
            U,
            lr(G, P),
            I
          );
        Po(G, P);
      }
      return typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint" ? (P = "" + P, U !== null && U.tag === 6 ? (s(G, U.sibling), I = d(U, P), I.return = G, G = I) : (s(G, U), I = yo(P, G.mode, I), I.return = G, G = I), A(G)) : s(G, U);
    }
    return function(G, U, P, I) {
      try {
        fr = 0;
        var vt = ve(
          G,
          U,
          P,
          I
        );
        return ei = null, vt;
      } catch (Et) {
        if (Et === rr || Et === Eo) throw Et;
        var Wt = bi(29, Et, null, G.mode);
        return Wt.lanes = I, Wt.return = G, Wt;
      } finally {
      }
    };
  }
  var Rs = Xu(!0), Id = Xu(!1), Ti = ai(null), aa = null;
  function Ns(t) {
    var i = t.alternate;
    Ft(je, je.current & 1), Ft(Ti, t), aa === null && (i === null || fl.current !== null || i.memoizedState !== null) && (aa = t);
  }
  function Gu(t) {
    if (t.tag === 22) {
      if (Ft(je, je.current), Ft(Ti, t), aa === null) {
        var i = t.alternate;
        i !== null && i.memoizedState !== null && (aa = t);
      }
    } else Ai();
  }
  function Ai() {
    Ft(je, je.current), Ft(Ti, Ti.current);
  }
  function Ui(t) {
    Te(Ti), aa === t && (aa = null), Te(je);
  }
  var je = ai(0);
  function _o(t) {
    for (var i = t; i !== null; ) {
      if (i.tag === 13) {
        var s = i.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || s.data === "$?" || wt(s)))
          return i;
      } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === t) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === t) return null;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
    return null;
  }
  function Qo(t, i, s, r) {
    i = t.memoizedState, s = s(r, i), s = s == null ? i : pt({}, i, s), t.memoizedState = s, t.lanes === 0 && (t.updateQueue.baseState = s);
  }
  var gr = {
    enqueueSetState: function(t, i, s) {
      t = t._reactInternals;
      var r = Yi(), d = Es(r);
      d.payload = i, s != null && (d.callback = s), i = ws(t, d, r), i !== null && (ci(i, t, r), Cs(i, t, r));
    },
    enqueueReplaceState: function(t, i, s) {
      t = t._reactInternals;
      var r = Yi(), d = Es(r);
      d.tag = 1, d.payload = i, s != null && (d.callback = s), i = ws(t, d, r), i !== null && (ci(i, t, r), Cs(i, t, r));
    },
    enqueueForceUpdate: function(t, i) {
      t = t._reactInternals;
      var s = Yi(), r = Es(s);
      r.tag = 2, i != null && (r.callback = i), i = ws(t, r, s), i !== null && (ci(i, t, s), Cs(i, t, s));
    }
  };
  function Zo(t, i, s, r, d, m, A) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(r, m, A) : i.prototype && i.prototype.isPureReactComponent ? !In(s, r) || !In(d, m) : !0;
  }
  function Yu(t, i, s, r) {
    t = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(s, r), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(s, r), i.state !== t && gr.enqueueReplaceState(i, i.state, null);
  }
  function is(t, i) {
    var s = i;
    if ("ref" in i) {
      s = {};
      for (var r in i)
        r !== "ref" && (s[r] = i[r]);
    }
    if (t = t.defaultProps) {
      s === i && (s = pt({}, s));
      for (var d in t)
        s[d] === void 0 && (s[d] = t[d]);
    }
    return s;
  }
  var Oi = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var i = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(i)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function as(t) {
    Oi(t);
  }
  function ju(t) {
    console.error(t);
  }
  function Jd(t) {
    Oi(t);
  }
  function Vo(t, i) {
    try {
      var s = t.onUncaughtError;
      s(i.value, { componentStack: i.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Wo(t, i, s) {
    try {
      var r = t.onCaughtError;
      r(s.value, {
        componentStack: s.stack,
        errorBoundary: i.tag === 1 ? i.stateNode : null
      });
    } catch (d) {
      setTimeout(function() {
        throw d;
      });
    }
  }
  function Ca(t, i, s) {
    return s = Es(s), s.tag = 3, s.payload = { element: null }, s.callback = function() {
      Vo(t, i);
    }, s;
  }
  function Ko(t) {
    return t = Es(t), t.tag = 3, t;
  }
  function Zt(t, i, s, r) {
    var d = s.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var m = r.value;
      t.payload = function() {
        return d(m);
      }, t.callback = function() {
        Wo(i, s, r);
      };
    }
    var A = s.stateNode;
    A !== null && typeof A.componentDidCatch == "function" && (t.callback = function() {
      Wo(i, s, r), typeof d != "function" && (js === null ? js = /* @__PURE__ */ new Set([this]) : js.add(this));
      var k = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: k !== null ? k : ""
      });
    });
  }
  function Rp(t, i, s, r, d) {
    if (s.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (i = s.alternate, i !== null && Si(
        i,
        s,
        d,
        !0
      ), s = Ti.current, s !== null) {
        switch (s.tag) {
          case 13:
            return aa === null ? cc() : s.alternate === null && ye === 0 && (ye = 3), s.flags &= -257, s.flags |= 65536, s.lanes = d, r === As ? s.flags |= 16384 : (i = s.updateQueue, i === null ? s.updateQueue = /* @__PURE__ */ new Set([r]) : i.add(r), mc(t, r, d)), !1;
          case 22:
            return s.flags |= 65536, r === As ? s.flags |= 16384 : (i = s.updateQueue, i === null ? (i = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, s.updateQueue = i) : (s = i.retryQueue, s === null ? i.retryQueue = /* @__PURE__ */ new Set([r]) : s.add(r)), mc(t, r, d)), !1;
        }
        throw Error(D(435, s.tag));
      }
      return mc(t, r, d), cc(), !1;
    }
    if ($t)
      return i = Ti.current, i !== null ? ((i.flags & 65536) === 0 && (i.flags |= 256), i.flags |= 65536, i.lanes = d, r !== fu && (t = Error(D(422), { cause: r }), sr(Ji(t, s)))) : (r !== fu && (i = Error(D(423), {
        cause: r
      }), sr(
        Ji(i, s)
      )), t = t.current.alternate, t.flags |= 65536, d &= -d, t.lanes |= d, r = Ji(r, s), d = Ca(
        t.stateNode,
        r,
        d
      ), or(t, d), ye !== 4 && (ye = 2)), !1;
    var m = Error(D(520), { cause: r });
    if (m = Ji(m, s), Ys === null ? Ys = [m] : Ys.push(m), ye !== 4 && (ye = 2), i === null) return !0;
    r = Ji(r, s), s = i;
    do {
      switch (s.tag) {
        case 3:
          return s.flags |= 65536, t = d & -d, s.lanes |= t, t = Ca(s.stateNode, r, t), or(s, t), !1;
        case 1:
          if (i = s.type, m = s.stateNode, (s.flags & 128) === 0 && (typeof i.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (js === null || !js.has(m))))
            return s.flags |= 65536, d &= -d, s.lanes |= d, d = Ko(d), Zt(
              d,
              t,
              s,
              r
            ), or(s, d), !1;
      }
      s = s.return;
    } while (s !== null);
    return !1;
  }
  var Fo = Error(D(461)), Fe = !1;
  function ze(t, i, s, r) {
    i.child = t === null ? Id(i, null, s, r) : Rs(
      i,
      t.child,
      s,
      r
    );
  }
  function $d(t, i, s, r, d) {
    s = s.render;
    var m = i.ref;
    if ("ref" in r) {
      var A = {};
      for (var k in r)
        k !== "ref" && (A[k] = r[k]);
    } else A = r;
    return cl(i), r = ln(
      t,
      i,
      s,
      A,
      m,
      d
    ), k = Tu(), t !== null && !Fe ? (Do(t, i, d), La(t, i, d)) : ($t && k && Kl(i), i.flags |= 1, ze(t, i, r, d), i.child);
  }
  function mr(t, i, s, r, d) {
    if (t === null) {
      var m = s.type;
      return typeof m == "function" && !cu(m) && m.defaultProps === void 0 && s.compare === null ? (i.tag = 15, i.type = m, ya(
        t,
        i,
        m,
        r,
        d
      )) : (t = ae(
        s.type,
        null,
        r,
        i,
        i.mode,
        d
      ), t.ref = i.ref, t.return = i, i.child = t);
    }
    if (m = t.child, !Vu(t, d)) {
      var A = m.memoizedProps;
      if (s = s.compare, s = s !== null ? s : In, s(A, r) && t.ref === i.ref)
        return La(t, i, d);
    }
    return i.flags |= 1, t = ga(m, r), t.ref = i.ref, t.return = i, i.child = t;
  }
  function ya(t, i, s, r, d) {
    if (t !== null) {
      var m = t.memoizedProps;
      if (In(m, r) && t.ref === i.ref)
        if (Fe = !1, i.pendingProps = r = m, Vu(t, d))
          (t.flags & 131072) !== 0 && (Fe = !0);
        else
          return i.lanes = t.lanes, La(t, i, d);
    }
    return $o(
      t,
      i,
      s,
      r,
      d
    );
  }
  function Io(t, i, s) {
    var r = i.pendingProps, d = r.children, m = t !== null ? t.memoizedState : null;
    if (r.mode === "hidden") {
      if ((i.flags & 128) !== 0) {
        if (r = m !== null ? m.baseLanes | s : s, t !== null) {
          for (d = i.child = t.child, m = 0; d !== null; )
            m = m | d.lanes | d.childLanes, d = d.sibling;
          i.childLanes = m & ~r;
        } else i.childLanes = 0, i.child = null;
        return Ie(
          t,
          i,
          r,
          s
        );
      }
      if ((s & 536870912) !== 0)
        i.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ao(
          i,
          m !== null ? m.cachePool : null
        ), m !== null ? kd(i, m) : wo(), Gu(i);
      else
        return i.lanes = i.childLanes = 536870912, Ie(
          t,
          i,
          m !== null ? m.baseLanes | s : s,
          s
        );
    } else
      m !== null ? (Ao(i, m.cachePool), kd(i, m), Ai(), i.memoizedState = null) : (t !== null && Ao(i, null), wo(), Ai());
    return ze(t, i, d, s), i.child;
  }
  function Ie(t, i, s, r) {
    var d = To();
    return d = d === null ? null : { parent: Ge._currentValue, pool: d }, i.memoizedState = {
      baseLanes: s,
      cachePool: d
    }, t !== null && Ao(i, null), wo(), Gu(i), t !== null && Si(t, i, r, !0), null;
  }
  function Jo(t, i) {
    var s = i.ref;
    if (s === null)
      t !== null && t.ref !== null && (i.flags |= 4194816);
    else {
      if (typeof s != "function" && typeof s != "object")
        throw Error(D(284));
      (t === null || t.ref !== s) && (i.flags |= 4194816);
    }
  }
  function $o(t, i, s, r, d) {
    return cl(i), s = ln(
      t,
      i,
      s,
      r,
      void 0,
      d
    ), r = Tu(), t !== null && !Fe ? (Do(t, i, d), La(t, i, d)) : ($t && r && Kl(i), i.flags |= 1, ze(t, i, s, d), i.child);
  }
  function Pu(t, i, s, r, d, m) {
    return cl(i), i.updateQueue = null, s = zd(
      i,
      r,
      s,
      d
    ), Ld(t), r = Tu(), t !== null && !Fe ? (Do(t, i, m), La(t, i, m)) : ($t && r && Kl(i), i.flags |= 1, ze(t, i, s, m), i.child);
  }
  function yr(t, i, s, r, d) {
    if (cl(i), i.stateNode === null) {
      var m = Wl, A = s.contextType;
      typeof A == "object" && A !== null && (m = oi(A)), m = new s(r, m), i.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = gr, i.stateNode = m, m._reactInternals = i, m = i.stateNode, m.props = r, m.state = i.memoizedState, m.refs = {}, bu(i), A = s.contextType, m.context = typeof A == "object" && A !== null ? oi(A) : Wl, m.state = i.memoizedState, A = s.getDerivedStateFromProps, typeof A == "function" && (Qo(
        i,
        s,
        A,
        r
      ), m.state = i.memoizedState), typeof s.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (A = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), A !== m.state && gr.enqueueReplaceState(m, m.state, null), ur(i, r, m, d), hr(), m.state = i.memoizedState), typeof m.componentDidMount == "function" && (i.flags |= 4194308), r = !0;
    } else if (t === null) {
      m = i.stateNode;
      var k = i.memoizedProps, N = is(s, k);
      m.props = N;
      var q = m.context, F = s.contextType;
      A = Wl, typeof F == "object" && F !== null && (A = oi(F));
      var $ = s.getDerivedStateFromProps;
      F = typeof $ == "function" || typeof m.getSnapshotBeforeUpdate == "function", k = i.pendingProps !== k, F || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (k || q !== A) && Yu(
        i,
        m,
        r,
        A
      ), Os = !1;
      var _ = i.memoizedState;
      m.state = _, ur(i, r, m, d), hr(), q = i.memoizedState, k || _ !== q || Os ? (typeof $ == "function" && (Qo(
        i,
        s,
        $,
        r
      ), q = i.memoizedState), (N = Os || Zo(
        i,
        s,
        N,
        r,
        _,
        q,
        A
      )) ? (F || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = r, i.memoizedState = q), m.props = r, m.state = q, m.context = A, r = N) : (typeof m.componentDidMount == "function" && (i.flags |= 4194308), r = !1);
    } else {
      m = i.stateNode, xu(t, i), A = i.memoizedProps, F = is(s, A), m.props = F, $ = i.pendingProps, _ = m.context, q = s.contextType, N = Wl, typeof q == "object" && q !== null && (N = oi(q)), k = s.getDerivedStateFromProps, (q = typeof k == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (A !== $ || _ !== N) && Yu(
        i,
        m,
        r,
        N
      ), Os = !1, _ = i.memoizedState, m.state = _, ur(i, r, m, d), hr();
      var V = i.memoizedState;
      A !== $ || _ !== V || Os || t !== null && t.dependencies !== null && So(t.dependencies) ? (typeof k == "function" && (Qo(
        i,
        s,
        k,
        r
      ), V = i.memoizedState), (F = Os || Zo(
        i,
        s,
        F,
        r,
        _,
        V,
        N
      ) || t !== null && t.dependencies !== null && So(t.dependencies)) ? (q || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(r, V, N), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        r,
        V,
        N
      )), typeof m.componentDidUpdate == "function" && (i.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || A === t.memoizedProps && _ === t.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || A === t.memoizedProps && _ === t.memoizedState || (i.flags |= 1024), i.memoizedProps = r, i.memoizedState = V), m.props = r, m.state = V, m.context = N, r = F) : (typeof m.componentDidUpdate != "function" || A === t.memoizedProps && _ === t.memoizedState || (i.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || A === t.memoizedProps && _ === t.memoizedState || (i.flags |= 1024), r = !1);
    }
    return m = r, Jo(t, i), r = (i.flags & 128) !== 0, m || r ? (m = i.stateNode, s = r && typeof s.getDerivedStateFromError != "function" ? null : m.render(), i.flags |= 1, t !== null && r ? (i.child = Rs(
      i,
      t.child,
      null,
      d
    ), i.child = Rs(
      i,
      null,
      s,
      d
    )) : ze(t, i, s, d), i.memoizedState = m.state, t = i.child) : t = La(
      t,
      i,
      d
    ), t;
  }
  function tf(t, i, s, r) {
    return ar(), i.flags |= 256, ze(t, i, s, r), i.child;
  }
  var qu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ka(t) {
    return { baseLanes: t, cachePool: Od() };
  }
  function _u(t, i, s) {
    return t = t !== null ? t.childLanes & ~s : 0, i && (t |= la), t;
  }
  function ef(t, i, s) {
    var r = i.pendingProps, d = !1, m = (i.flags & 128) !== 0, A;
    if ((A = m) || (A = t !== null && t.memoizedState === null ? !1 : (je.current & 2) !== 0), A && (d = !0, i.flags &= -129), A = (i.flags & 32) !== 0, i.flags &= -33, t === null) {
      if ($t) {
        if (d ? Ns(i) : Ai(), $t) {
          var k = De, N;
          if (N = k) {
            t: {
              for (N = k, k = Ta; N.nodeType !== 8; ) {
                if (!k) {
                  k = null;
                  break t;
                }
                if (N = kt(
                  N.nextSibling
                ), N === null) {
                  k = null;
                  break t;
                }
              }
              k = N;
            }
            k !== null ? (i.memoizedState = {
              dehydrated: k,
              treeContext: Ss !== null ? { id: $i, overflow: $a } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, N = bi(
              18,
              null,
              null,
              0
            ), N.stateNode = k, N.return = i, i.child = N, gi = i, De = null, N = !0) : N = !1;
          }
          N || hl(i);
        }
        if (k = i.memoizedState, k !== null && (k = k.dehydrated, k !== null))
          return wt(k) ? i.lanes = 32 : i.lanes = 536870912, null;
        Ui(i);
      }
      return k = r.children, r = r.fallback, d ? (Ai(), d = i.mode, k = bl(
        { mode: "hidden", children: k },
        d
      ), r = ol(
        r,
        d,
        s,
        null
      ), k.return = i, r.return = i, k.sibling = r, i.child = k, d = i.child, d.memoizedState = ka(s), d.childLanes = _u(
        t,
        A,
        s
      ), i.memoizedState = qu, r) : (Ns(i), Da(i, k));
    }
    if (N = t.memoizedState, N !== null && (k = N.dehydrated, k !== null)) {
      if (m)
        i.flags & 256 ? (Ns(i), i.flags &= -257, i = vr(
          t,
          i,
          s
        )) : i.memoizedState !== null ? (Ai(), i.child = t.child, i.flags |= 128, i = null) : (Ai(), d = r.fallback, k = i.mode, r = bl(
          { mode: "visible", children: r.children },
          k
        ), d = ol(
          d,
          k,
          s,
          null
        ), d.flags |= 2, r.return = i, d.return = i, r.sibling = d, i.child = r, Rs(
          i,
          t.child,
          null,
          s
        ), r = i.child, r.memoizedState = ka(s), r.childLanes = _u(
          t,
          A,
          s
        ), i.memoizedState = qu, i = d);
      else if (Ns(i), wt(k)) {
        if (A = k.nextSibling && k.nextSibling.dataset, A) var q = A.dgst;
        A = q, r = Error(D(419)), r.stack = "", r.digest = A, sr({ value: r, source: null, stack: null }), i = vr(
          t,
          i,
          s
        );
      } else if (Fe || Si(t, i, s, !1), A = (s & t.childLanes) !== 0, Fe || A) {
        if (A = oe, A !== null && (r = s & -s, r = (r & 42) !== 0 ? 1 : $r(r), r = (r & (A.suspendedLanes | s)) !== 0 ? 0 : r, r !== 0 && r !== N.retryLane))
          throw N.retryLane = r, rl(t, r), ci(A, t, r), Fo;
        k.data === "$?" || cc(), i = vr(
          t,
          i,
          s
        );
      } else
        k.data === "$?" ? (i.flags |= 192, i.child = t.child, i = null) : (t = N.treeContext, De = kt(
          k.nextSibling
        ), gi = i, $t = !0, ta = null, Ta = !1, t !== null && (Bi[gt++] = $i, Bi[gt++] = $a, Bi[gt++] = Ss, $i = t.id, $a = t.overflow, Ss = i), i = Da(
          i,
          r.children
        ), i.flags |= 4096);
      return i;
    }
    return d ? (Ai(), d = r.fallback, k = i.mode, N = t.child, q = N.sibling, r = ga(N, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = N.subtreeFlags & 65011712, q !== null ? d = ga(q, d) : (d = ol(
      d,
      k,
      s,
      null
    ), d.flags |= 2), d.return = i, r.return = i, r.sibling = d, i.child = r, r = d, d = i.child, k = t.child.memoizedState, k === null ? k = ka(s) : (N = k.cachePool, N !== null ? (q = Ge._currentValue, N = N.parent !== q ? { parent: q, pool: q } : N) : N = Od(), k = {
      baseLanes: k.baseLanes | s,
      cachePool: N
    }), d.memoizedState = k, d.childLanes = _u(
      t,
      A,
      s
    ), i.memoizedState = qu, r) : (Ns(i), s = t.child, t = s.sibling, s = ga(s, {
      mode: "visible",
      children: r.children
    }), s.return = i, s.sibling = null, t !== null && (A = i.deletions, A === null ? (i.deletions = [t], i.flags |= 16) : A.push(t)), i.child = s, i.memoizedState = null, s);
  }
  function Da(t, i) {
    return i = bl(
      { mode: "visible", children: i },
      t.mode
    ), i.return = t, t.child = i;
  }
  function bl(t, i) {
    return t = bi(22, t, null, i), t.lanes = 0, t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, t;
  }
  function vr(t, i, s) {
    return Rs(i, t.child, null, s), t = Da(
      i,
      i.pendingProps.children
    ), t.flags |= 2, i.memoizedState = null, t;
  }
  function th(t, i, s) {
    t.lanes |= i;
    var r = t.alternate;
    r !== null && (r.lanes |= i), bo(t.return, i, s);
  }
  function Qu(t, i, s, r, d) {
    var m = t.memoizedState;
    m === null ? t.memoizedState = {
      isBackwards: i,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: s,
      tailMode: d
    } : (m.isBackwards = i, m.rendering = null, m.renderingStartTime = 0, m.last = r, m.tail = s, m.tailMode = d);
  }
  function Zu(t, i, s) {
    var r = i.pendingProps, d = r.revealOrder, m = r.tail;
    if (ze(t, i, r.children, s), r = je.current, (r & 2) !== 0)
      r = r & 1 | 2, i.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = i.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && th(t, s, i);
          else if (t.tag === 19)
            th(t, s, i);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === i) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === i)
              break t;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      r &= 1;
    }
    switch (Ft(je, r), d) {
      case "forwards":
        for (s = i.child, d = null; s !== null; )
          t = s.alternate, t !== null && _o(t) === null && (d = s), s = s.sibling;
        s = d, s === null ? (d = i.child, i.child = null) : (d = s.sibling, s.sibling = null), Qu(
          i,
          !1,
          d,
          s,
          m
        );
        break;
      case "backwards":
        for (s = null, d = i.child, i.child = null; d !== null; ) {
          if (t = d.alternate, t !== null && _o(t) === null) {
            i.child = d;
            break;
          }
          t = d.sibling, d.sibling = s, s = d, d = t;
        }
        Qu(
          i,
          !0,
          s,
          null,
          m
        );
        break;
      case "together":
        Qu(i, !1, null, null, void 0);
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function La(t, i, s) {
    if (t !== null && (i.dependencies = t.dependencies), sa |= i.lanes, (s & i.childLanes) === 0)
      if (t !== null) {
        if (Si(
          t,
          i,
          s,
          !1
        ), (s & i.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && i.child !== t.child)
      throw Error(D(153));
    if (i.child !== null) {
      for (t = i.child, s = ga(t, t.pendingProps), i.child = s, s.return = i; t.sibling !== null; )
        t = t.sibling, s = s.sibling = ga(t, t.pendingProps), s.return = i;
      s.sibling = null;
    }
    return i.child;
  }
  function Vu(t, i) {
    return (t.lanes & i) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && So(t)));
  }
  function af(t, i, s) {
    switch (i.tag) {
      case 3:
        Vr(i, i.stateNode.containerInfo), Ms(i, Ge, t.memoizedState.cache), ar();
        break;
      case 27:
      case 5:
        Wr(i);
        break;
      case 4:
        Vr(i, i.stateNode.containerInfo);
        break;
      case 10:
        Ms(
          i,
          i.type,
          i.memoizedProps.value
        );
        break;
      case 13:
        var r = i.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (Ns(i), i.flags |= 128, null) : (s & i.child.childLanes) !== 0 ? ef(t, i, s) : (Ns(i), t = La(
            t,
            i,
            s
          ), t !== null ? t.sibling : null);
        Ns(i);
        break;
      case 19:
        var d = (t.flags & 128) !== 0;
        if (r = (s & i.childLanes) !== 0, r || (Si(
          t,
          i,
          s,
          !1
        ), r = (s & i.childLanes) !== 0), d) {
          if (r)
            return Zu(
              t,
              i,
              s
            );
          i.flags |= 128;
        }
        if (d = i.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), Ft(je, je.current), r) break;
        return null;
      case 22:
      case 23:
        return i.lanes = 0, Io(t, i, s);
      case 24:
        Ms(i, Ge, t.memoizedState.cache);
    }
    return La(t, i, s);
  }
  function on(t, i, s) {
    if (t !== null)
      if (t.memoizedProps !== i.pendingProps)
        Fe = !0;
      else {
        if (!Vu(t, s) && (i.flags & 128) === 0)
          return Fe = !1, af(
            t,
            i,
            s
          );
        Fe = (t.flags & 131072) !== 0;
      }
    else
      Fe = !1, $t && (i.flags & 1048576) !== 0 && Ut(i, vo, i.index);
    switch (i.lanes = 0, i.tag) {
      case 16:
        t: {
          t = i.pendingProps;
          var r = i.elementType, d = r._init;
          if (r = d(r._payload), i.type = r, typeof r == "function")
            cu(r) ? (t = is(r, t), i.tag = 1, i = yr(
              null,
              i,
              r,
              t,
              s
            )) : (i.tag = 0, i = $o(
              null,
              i,
              r,
              t,
              s
            ));
          else {
            if (r != null) {
              if (d = r.$$typeof, d === Lt) {
                i.tag = 11, i = $d(
                  null,
                  i,
                  r,
                  t,
                  s
                );
                break t;
              } else if (d === _e) {
                i.tag = 14, i = mr(
                  null,
                  i,
                  r,
                  t,
                  s
                );
                break t;
              }
            }
            throw i = Ya(r) || r, Error(D(306, i, ""));
          }
        }
        return i;
      case 0:
        return $o(
          t,
          i,
          i.type,
          i.pendingProps,
          s
        );
      case 1:
        return r = i.type, d = is(
          r,
          i.pendingProps
        ), yr(
          t,
          i,
          r,
          d,
          s
        );
      case 3:
        t: {
          if (Vr(
            i,
            i.stateNode.containerInfo
          ), t === null) throw Error(D(387));
          r = i.pendingProps;
          var m = i.memoizedState;
          d = m.element, xu(t, i), ur(i, r, null, s);
          var A = i.memoizedState;
          if (r = A.cache, Ms(i, Ge, r), r !== m.cache && xo(
            i,
            [Ge],
            s,
            !0
          ), hr(), r = A.element, m.isDehydrated)
            if (m = {
              element: r,
              isDehydrated: !1,
              cache: A.cache
            }, i.updateQueue.baseState = m, i.memoizedState = m, i.flags & 256) {
              i = tf(
                t,
                i,
                r,
                s
              );
              break t;
            } else if (r !== d) {
              d = Ji(
                Error(D(424)),
                i
              ), sr(d), i = tf(
                t,
                i,
                r,
                s
              );
              break t;
            } else {
              switch (t = i.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (De = kt(t.firstChild), gi = i, $t = !0, ta = null, Ta = !0, s = Id(
                i,
                null,
                r,
                s
              ), i.child = s; s; )
                s.flags = s.flags & -3 | 4096, s = s.sibling;
            }
          else {
            if (ar(), r === d) {
              i = La(
                t,
                i,
                s
              );
              break t;
            }
            ze(
              t,
              i,
              r,
              s
            );
          }
          i = i.child;
        }
        return i;
      case 26:
        return Jo(t, i), t === null ? (s = ra(
          i.type,
          null,
          i.pendingProps,
          null
        )) ? i.memoizedState = s : $t || (s = i.type, t = i.pendingProps, r = w(
          ja.current
        ).createElement(s), r[li] = i, r[ni] = t, S(r, s, t), Qe(r), i.stateNode = r) : i.memoizedState = ra(
          i.type,
          t.memoizedProps,
          i.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Wr(i), t === null && $t && (r = i.stateNode = Pt(
          i.type,
          i.pendingProps,
          ja.current
        ), gi = i, Ta = !0, d = De, J(i.type) ? (jt = d, De = kt(
          r.firstChild
        )) : De = d), ze(
          t,
          i,
          i.pendingProps.children,
          s
        ), Jo(t, i), t === null && (i.flags |= 4194304), i.child;
      case 5:
        return t === null && $t && ((d = r = De) && (r = Ct(
          r,
          i.type,
          i.pendingProps,
          Ta
        ), r !== null ? (i.stateNode = r, gi = i, De = kt(
          r.firstChild
        ), Ta = !1, d = !0) : d = !1), d || hl(i)), Wr(i), d = i.type, m = i.pendingProps, A = t !== null ? t.memoizedProps : null, r = m.children, z(d, m) ? r = null : A !== null && z(d, A) && (i.flags |= 32), i.memoizedState !== null && (d = ln(
          t,
          i,
          Oa,
          null,
          null,
          s
        ), Ec._currentValue = d), Jo(t, i), ze(t, i, r, s), i.child;
      case 6:
        return t === null && $t && ((t = s = De) && (s = ht(
          s,
          i.pendingProps,
          Ta
        ), s !== null ? (i.stateNode = s, gi = i, De = null, t = !0) : t = !1), t || hl(i)), null;
      case 13:
        return ef(t, i, s);
      case 4:
        return Vr(
          i,
          i.stateNode.containerInfo
        ), r = i.pendingProps, t === null ? i.child = Rs(
          i,
          null,
          r,
          s
        ) : ze(
          t,
          i,
          r,
          s
        ), i.child;
      case 11:
        return $d(
          t,
          i,
          i.type,
          i.pendingProps,
          s
        );
      case 7:
        return ze(
          t,
          i,
          i.pendingProps,
          s
        ), i.child;
      case 8:
        return ze(
          t,
          i,
          i.pendingProps.children,
          s
        ), i.child;
      case 12:
        return ze(
          t,
          i,
          i.pendingProps.children,
          s
        ), i.child;
      case 10:
        return r = i.pendingProps, Ms(i, i.type, r.value), ze(
          t,
          i,
          r.children,
          s
        ), i.child;
      case 9:
        return d = i.type._context, r = i.pendingProps.children, cl(i), d = oi(d), r = r(d), i.flags |= 1, ze(t, i, r, s), i.child;
      case 14:
        return mr(
          t,
          i,
          i.type,
          i.pendingProps,
          s
        );
      case 15:
        return ya(
          t,
          i,
          i.type,
          i.pendingProps,
          s
        );
      case 19:
        return Zu(t, i, s);
      case 31:
        return r = i.pendingProps, s = i.mode, r = {
          mode: r.mode,
          children: r.children
        }, t === null ? (s = bl(
          r,
          s
        ), s.ref = i.ref, i.child = s, s.return = i, i = s) : (s = ga(t.child, r), s.ref = i.ref, i.child = s, s.return = i, i = s), i;
      case 22:
        return Io(t, i, s);
      case 24:
        return cl(i), r = oi(Ge), t === null ? (d = To(), d === null && (d = oe, m = gu(), d.pooledCache = m, m.refCount++, m !== null && (d.pooledCacheLanes |= s), d = m), i.memoizedState = {
          parent: r,
          cache: d
        }, bu(i), Ms(i, Ge, d)) : ((t.lanes & s) !== 0 && (xu(t, i), ur(i, null, null, s), hr()), d = t.memoizedState, m = i.memoizedState, d.parent !== r ? (d = { parent: r, cache: r }, i.memoizedState = d, i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = d), Ms(i, Ge, r)) : (r = m.cache, Ms(i, Ge, r), r !== d.cache && xo(
          i,
          [Ge],
          s,
          !0
        ))), ze(
          t,
          i,
          i.pendingProps.children,
          s
        ), i.child;
      case 29:
        throw i.pendingProps;
    }
    throw Error(D(156, i.tag));
  }
  function ss(t) {
    t.flags |= 4;
  }
  function sf(t, i) {
    if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !wg(i)) {
      if (i = Ti.current, i !== null && ((Kt & 4194048) === Kt ? aa !== null : (Kt & 62914560) !== Kt && (Kt & 536870912) === 0 || i !== aa))
        throw dl = As, Oo;
      t.flags |= 8192;
    }
  }
  function eh(t, i) {
    i !== null && (t.flags |= 4), t.flags & 16384 && (i = t.tag !== 22 ? zi() : 536870912, t.lanes |= i, Ml |= i);
  }
  function hn(t, i) {
    if (!$t)
      switch (t.tailMode) {
        case "hidden":
          i = t.tail;
          for (var s = null; i !== null; )
            i.alternate !== null && (s = i), i = i.sibling;
          s === null ? t.tail = null : s.sibling = null;
          break;
        case "collapsed":
          s = t.tail;
          for (var r = null; s !== null; )
            s.alternate !== null && (r = s), s = s.sibling;
          r === null ? i || t.tail === null ? t.tail = null : t.tail.sibling = null : r.sibling = null;
      }
  }
  function xe(t) {
    var i = t.alternate !== null && t.alternate.child === t.child, s = 0, r = 0;
    if (i)
      for (var d = t.child; d !== null; )
        s |= d.lanes | d.childLanes, r |= d.subtreeFlags & 65011712, r |= d.flags & 65011712, d.return = t, d = d.sibling;
    else
      for (d = t.child; d !== null; )
        s |= d.lanes | d.childLanes, r |= d.subtreeFlags, r |= d.flags, d.return = t, d = d.sibling;
    return t.subtreeFlags |= r, t.childLanes = s, i;
  }
  function Wu(t, i, s) {
    var r = i.pendingProps;
    switch (du(i), i.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return xe(i), null;
      case 1:
        return xe(i), null;
      case 3:
        return s = i.stateNode, r = null, t !== null && (r = t.memoizedState.cache), i.memoizedState.cache !== r && (i.flags |= 2048), ts(Ge), Zi(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (t === null || t.child === null) && (Fl(i) ? ss(i) : t === null || t.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, Md())), xe(i), null;
      case 26:
        return s = i.memoizedState, t === null ? (ss(i), s !== null ? (xe(i), sf(i, s)) : (xe(i), i.flags &= -16777217)) : s ? s !== t.memoizedState ? (ss(i), xe(i), sf(i, s)) : (xe(i), i.flags &= -16777217) : (t.memoizedProps !== r && ss(i), xe(i), i.flags &= -16777217), null;
      case 27:
        zn(i), s = ja.current;
        var d = i.type;
        if (t !== null && i.stateNode != null)
          t.memoizedProps !== r && ss(i);
        else {
          if (!r) {
            if (i.stateNode === null)
              throw Error(D(166));
            return xe(i), null;
          }
          t = ke.current, Fl(i) ? ir(i) : (t = Pt(d, r, s), i.stateNode = t, ss(i));
        }
        return xe(i), null;
      case 5:
        if (zn(i), s = i.type, t !== null && i.stateNode != null)
          t.memoizedProps !== r && ss(i);
        else {
          if (!r) {
            if (i.stateNode === null)
              throw Error(D(166));
            return xe(i), null;
          }
          if (t = ke.current, Fl(i))
            ir(i);
          else {
            switch (d = w(
              ja.current
            ), t) {
              case 1:
                t = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                t = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    t = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    t = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    t = d.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
                    break;
                  case "select":
                    t = typeof r.is == "string" ? d.createElement("select", { is: r.is }) : d.createElement("select"), r.multiple ? t.multiple = !0 : r.size && (t.size = r.size);
                    break;
                  default:
                    t = typeof r.is == "string" ? d.createElement(s, { is: r.is }) : d.createElement(s);
                }
            }
            t[li] = i, t[ni] = r;
            t: for (d = i.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6)
                t.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                d.child.return = d, d = d.child;
                continue;
              }
              if (d === i) break t;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === i)
                  break t;
                d = d.return;
              }
              d.sibling.return = d.return, d = d.sibling;
            }
            i.stateNode = t;
            t: switch (S(t, s, r), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!r.autoFocus;
                break t;
              case "img":
                t = !0;
                break t;
              default:
                t = !1;
            }
            t && ss(i);
          }
        }
        return xe(i), i.flags &= -16777217, null;
      case 6:
        if (t && i.stateNode != null)
          t.memoizedProps !== r && ss(i);
        else {
          if (typeof r != "string" && i.stateNode === null)
            throw Error(D(166));
          if (t = ja.current, Fl(i)) {
            if (t = i.stateNode, s = i.memoizedProps, r = null, d = gi, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  r = d.memoizedProps;
              }
            t[li] = i, t = !!(t.nodeValue === s || r !== null && r.suppressHydrationWarning === !0 || y(t.nodeValue, s)), t || hl(i);
          } else
            t = w(t).createTextNode(
              r
            ), t[li] = i, i.stateNode = t;
        }
        return xe(i), null;
      case 13:
        if (r = i.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (d = Fl(i), r !== null && r.dehydrated !== null) {
            if (t === null) {
              if (!d) throw Error(D(318));
              if (d = i.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(D(317));
              d[li] = i;
            } else
              ar(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            xe(i), d = !1;
          } else
            d = Md(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return i.flags & 256 ? (Ui(i), i) : (Ui(i), null);
        }
        if (Ui(i), (i.flags & 128) !== 0)
          return i.lanes = s, i;
        if (s = r !== null, t = t !== null && t.memoizedState !== null, s) {
          r = i.child, d = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (d = r.alternate.memoizedState.cachePool.pool);
          var m = null;
          r.memoizedState !== null && r.memoizedState.cachePool !== null && (m = r.memoizedState.cachePool.pool), m !== d && (r.flags |= 2048);
        }
        return s !== t && s && (i.child.flags |= 8192), eh(i, i.updateQueue), xe(i), null;
      case 4:
        return Zi(), t === null && p(i.stateNode.containerInfo), xe(i), null;
      case 10:
        return ts(i.type), xe(i), null;
      case 19:
        if (Te(je), d = i.memoizedState, d === null) return xe(i), null;
        if (r = (i.flags & 128) !== 0, m = d.rendering, m === null)
          if (r) hn(d, !1);
          else {
            if (ye !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = i.child; t !== null; ) {
                if (m = _o(t), m !== null) {
                  for (i.flags |= 128, hn(d, !1), t = m.updateQueue, i.updateQueue = t, eh(i, t), i.subtreeFlags = 0, t = s, s = i.child; s !== null; )
                    xi(s, t), s = s.sibling;
                  return Ft(
                    je,
                    je.current & 1 | 2
                  ), i.child;
                }
                t = t.sibling;
              }
            d.tail !== null && ua() > rh && (i.flags |= 128, r = !0, hn(d, !1), i.lanes = 4194304);
          }
        else {
          if (!r)
            if (t = _o(m), t !== null) {
              if (i.flags |= 128, r = !0, t = t.updateQueue, i.updateQueue = t, eh(i, t), hn(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !$t)
                return xe(i), null;
            } else
              2 * ua() - d.renderingStartTime > rh && s !== 536870912 && (i.flags |= 128, r = !0, hn(d, !1), i.lanes = 4194304);
          d.isBackwards ? (m.sibling = i.child, i.child = m) : (t = d.last, t !== null ? t.sibling = m : i.child = m, d.last = m);
        }
        return d.tail !== null ? (i = d.tail, d.rendering = i, d.tail = i.sibling, d.renderingStartTime = ua(), i.sibling = null, t = je.current, Ft(je, r ? t & 1 | 2 : t & 1), i) : (xe(i), null);
      case 22:
      case 23:
        return Ui(i), Mu(), r = i.memoizedState !== null, t !== null ? t.memoizedState !== null !== r && (i.flags |= 8192) : r && (i.flags |= 8192), r ? (s & 536870912) !== 0 && (i.flags & 128) === 0 && (xe(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : xe(i), s = i.updateQueue, s !== null && eh(i, s.retryQueue), s = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (s = t.memoizedState.cachePool.pool), r = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (r = i.memoizedState.cachePool.pool), r !== s && (i.flags |= 2048), t !== null && Te(Ts), null;
      case 24:
        return s = null, t !== null && (s = t.memoizedState.cache), i.memoizedState.cache !== s && (i.flags |= 2048), ts(Ge), xe(i), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(D(156, i.tag));
  }
  function br(t, i) {
    switch (du(i), i.tag) {
      case 1:
        return t = i.flags, t & 65536 ? (i.flags = t & -65537 | 128, i) : null;
      case 3:
        return ts(Ge), Zi(), t = i.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (i.flags = t & -65537 | 128, i) : null;
      case 26:
      case 27:
      case 5:
        return zn(i), null;
      case 13:
        if (Ui(i), t = i.memoizedState, t !== null && t.dehydrated !== null) {
          if (i.alternate === null)
            throw Error(D(340));
          ar();
        }
        return t = i.flags, t & 65536 ? (i.flags = t & -65537 | 128, i) : null;
      case 19:
        return Te(je), null;
      case 4:
        return Zi(), null;
      case 10:
        return ts(i.type), null;
      case 22:
      case 23:
        return Ui(i), Mu(), t !== null && Te(Ts), t = i.flags, t & 65536 ? (i.flags = t & -65537 | 128, i) : null;
      case 24:
        return ts(Ge), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ku(t, i) {
    switch (du(i), i.tag) {
      case 3:
        ts(Ge), Zi();
        break;
      case 26:
      case 27:
      case 5:
        zn(i);
        break;
      case 4:
        Zi();
        break;
      case 13:
        Ui(i);
        break;
      case 19:
        Te(je);
        break;
      case 10:
        ts(i.type);
        break;
      case 22:
      case 23:
        Ui(i), Mu(), t !== null && Te(Ts);
        break;
      case 24:
        ts(Ge);
    }
  }
  function xr(t, i) {
    try {
      var s = i.updateQueue, r = s !== null ? s.lastEffect : null;
      if (r !== null) {
        var d = r.next;
        s = d;
        do {
          if ((s.tag & t) === t) {
            r = void 0;
            var m = s.create, A = s.inst;
            r = m(), A.destroy = r;
          }
          s = s.next;
        } while (s !== d);
      }
    } catch (k) {
      me(i, i.return, k);
    }
  }
  function Bs(t, i, s) {
    try {
      var r = i.updateQueue, d = r !== null ? r.lastEffect : null;
      if (d !== null) {
        var m = d.next;
        r = m;
        do {
          if ((r.tag & t) === t) {
            var A = r.inst, k = A.destroy;
            if (k !== void 0) {
              A.destroy = void 0, d = i;
              var N = s, q = k;
              try {
                q();
              } catch (F) {
                me(
                  d,
                  N,
                  F
                );
              }
            }
          }
          r = r.next;
        } while (r !== m);
      }
    } catch (F) {
      me(i, i.return, F);
    }
  }
  function Fu(t) {
    var i = t.updateQueue;
    if (i !== null) {
      var s = t.stateNode;
      try {
        cr(i, s);
      } catch (r) {
        me(t, t.return, r);
      }
    }
  }
  function un(t, i, s) {
    s.props = is(
      t.type,
      t.memoizedProps
    ), s.state = t.memoizedState;
    try {
      s.componentWillUnmount();
    } catch (r) {
      me(t, i, r);
    }
  }
  function cn(t, i) {
    try {
      var s = t.ref;
      if (s !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var r = t.stateNode;
            break;
          case 30:
            r = t.stateNode;
            break;
          default:
            r = t.stateNode;
        }
        typeof s == "function" ? t.refCleanup = s(r) : s.current = r;
      }
    } catch (d) {
      me(t, i, d);
    }
  }
  function za(t, i) {
    var s = t.ref, r = t.refCleanup;
    if (s !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (d) {
          me(t, i, d);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof s == "function")
        try {
          s(null);
        } catch (d) {
          me(t, i, d);
        }
      else s.current = null;
  }
  function lf(t) {
    var i = t.type, s = t.memoizedProps, r = t.stateNode;
    try {
      t: switch (i) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          s.autoFocus && r.focus();
          break t;
        case "img":
          s.src ? r.src = s.src : s.srcSet && (r.srcset = s.srcSet);
      }
    } catch (d) {
      me(t, t.return, d);
    }
  }
  function Sr(t, i, s) {
    try {
      var r = t.stateNode;
      E(r, t.type, s, i), r[ni] = i;
    } catch (d) {
      me(t, t.return, d);
    }
  }
  function Hs(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && J(t.type) || t.tag === 4;
  }
  function Mr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Hs(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && J(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Iu(t, i, s) {
    var r = t.tag;
    if (r === 5 || r === 6)
      t = t.stateNode, i ? (s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s).insertBefore(t, i) : (i = s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s, i.appendChild(t), s = s._reactRootContainer, s != null || i.onclick !== null || (i.onclick = g));
    else if (r !== 4 && (r === 27 && J(t.type) && (s = t.stateNode, i = null), t = t.child, t !== null))
      for (Iu(t, i, s), t = t.sibling; t !== null; )
        Iu(t, i, s), t = t.sibling;
  }
  function ih(t, i, s) {
    var r = t.tag;
    if (r === 5 || r === 6)
      t = t.stateNode, i ? s.insertBefore(t, i) : s.appendChild(t);
    else if (r !== 4 && (r === 27 && J(t.type) && (s = t.stateNode), t = t.child, t !== null))
      for (ih(t, i, s), t = t.sibling; t !== null; )
        ih(t, i, s), t = t.sibling;
  }
  function nf(t) {
    var i = t.stateNode, s = t.memoizedProps;
    try {
      for (var r = t.type, d = i.attributes; d.length; )
        i.removeAttributeNode(d[0]);
      S(i, r, s), i[li] = t, i[ni] = s;
    } catch (m) {
      me(t, t.return, m);
    }
  }
  var ls = !1, He = !1, Ju = !1, rf = typeof WeakSet == "function" ? WeakSet : Set, Je = null;
  function Np(t, i) {
    if (t = t.containerInfo, T = Nf, t = gd(t), po(t)) {
      if ("selectionStart" in t)
        var s = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          s = (s = t.ownerDocument) && s.defaultView || window;
          var r = s.getSelection && s.getSelection();
          if (r && r.rangeCount !== 0) {
            s = r.anchorNode;
            var d = r.anchorOffset, m = r.focusNode;
            r = r.focusOffset;
            try {
              s.nodeType, m.nodeType;
            } catch {
              s = null;
              break t;
            }
            var A = 0, k = -1, N = -1, q = 0, F = 0, $ = t, _ = null;
            e: for (; ; ) {
              for (var V; $ !== s || d !== 0 && $.nodeType !== 3 || (k = A + d), $ !== m || r !== 0 && $.nodeType !== 3 || (N = A + r), $.nodeType === 3 && (A += $.nodeValue.length), (V = $.firstChild) !== null; )
                _ = $, $ = V;
              for (; ; ) {
                if ($ === t) break e;
                if (_ === s && ++q === d && (k = A), _ === m && ++F === r && (N = A), (V = $.nextSibling) !== null) break;
                $ = _, _ = $.parentNode;
              }
              $ = V;
            }
            s = k === -1 || N === -1 ? null : { start: k, end: N };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (M = { focusedElem: t, selectionRange: s }, Nf = !1, Je = i; Je !== null; )
      if (i = Je, t = i.child, (i.subtreeFlags & 1024) !== 0 && t !== null)
        t.return = i, Je = t;
      else
        for (; Je !== null; ) {
          switch (i = Je, m = i.alternate, t = i.flags, i.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && m !== null) {
                t = void 0, s = i, d = m.memoizedProps, m = m.memoizedState, r = s.stateNode;
                try {
                  var Bt = is(
                    s.type,
                    d,
                    s.elementType === s.type
                  );
                  t = r.getSnapshotBeforeUpdate(
                    Bt,
                    m
                  ), r.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Dt) {
                  me(
                    s,
                    s.return,
                    Dt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = i.stateNode.containerInfo, s = t.nodeType, s === 9)
                  nt(t);
                else if (s === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      nt(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(D(163));
          }
          if (t = i.sibling, t !== null) {
            t.return = i.return, Je = t;
            break;
          }
          Je = i.return;
        }
  }
  function of(t, i, s) {
    var r = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        Na(t, s), r & 4 && xr(5, s);
        break;
      case 1:
        if (Na(t, s), r & 4)
          if (t = s.stateNode, i === null)
            try {
              t.componentDidMount();
            } catch (A) {
              me(s, s.return, A);
            }
          else {
            var d = is(
              s.type,
              i.memoizedProps
            );
            i = i.memoizedState;
            try {
              t.componentDidUpdate(
                d,
                i,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (A) {
              me(
                s,
                s.return,
                A
              );
            }
          }
        r & 64 && Fu(s), r & 512 && cn(s, s.return);
        break;
      case 3:
        if (Na(t, s), r & 64 && (t = s.updateQueue, t !== null)) {
          if (i = null, s.child !== null)
            switch (s.child.tag) {
              case 27:
              case 5:
                i = s.child.stateNode;
                break;
              case 1:
                i = s.child.stateNode;
            }
          try {
            cr(t, i);
          } catch (A) {
            me(s, s.return, A);
          }
        }
        break;
      case 27:
        i === null && r & 4 && nf(s);
      case 26:
      case 5:
        Na(t, s), i === null && r & 4 && lf(s), r & 512 && cn(s, s.return);
        break;
      case 12:
        Na(t, s);
        break;
      case 13:
        Na(t, s), r & 4 && uf(t, s), r & 64 && (t = s.memoizedState, t !== null && (t = t.dehydrated, t !== null && (s = Mf.bind(
          null,
          s
        ), Yt(t, s))));
        break;
      case 22:
        if (r = s.memoizedState !== null || ls, !r) {
          i = i !== null && i.memoizedState !== null || He, d = ls;
          var m = He;
          ls = r, (He = i) && !m ? Xs(
            t,
            s,
            (s.subtreeFlags & 8772) !== 0
          ) : Na(t, s), ls = d, He = m;
        }
        break;
      case 30:
        break;
      default:
        Na(t, s);
    }
  }
  function hf(t) {
    var i = t.alternate;
    i !== null && (t.alternate = null, hf(i)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (i = t.stateNode, i !== null && Bn(i)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Se = null, Ei = !1;
  function Ra(t, i, s) {
    for (s = s.child; s !== null; )
      ah(t, i, s), s = s.sibling;
  }
  function ah(t, i, s) {
    if (Di && typeof Di.onCommitFiberUnmount == "function")
      try {
        Di.onCommitFiberUnmount(Ks, s);
      } catch {
      }
    switch (s.tag) {
      case 26:
        He || za(s, i), Ra(
          t,
          i,
          s
        ), s.memoizedState ? s.memoizedState.count-- : s.stateNode && (s = s.stateNode, s.parentNode.removeChild(s));
        break;
      case 27:
        He || za(s, i);
        var r = Se, d = Ei;
        J(s.type) && (Se = s.stateNode, Ei = !1), Ra(
          t,
          i,
          s
        ), Vt(s.stateNode), Se = r, Ei = d;
        break;
      case 5:
        He || za(s, i);
      case 6:
        if (r = Se, d = Ei, Se = null, Ra(
          t,
          i,
          s
        ), Se = r, Ei = d, Se !== null)
          if (Ei)
            try {
              (Se.nodeType === 9 ? Se.body : Se.nodeName === "HTML" ? Se.ownerDocument.body : Se).removeChild(s.stateNode);
            } catch (m) {
              me(
                s,
                i,
                m
              );
            }
          else
            try {
              Se.removeChild(s.stateNode);
            } catch (m) {
              me(
                s,
                i,
                m
              );
            }
        break;
      case 18:
        Se !== null && (Ei ? (t = Se, rt(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          s.stateNode
        ), Dc(t)) : rt(Se, s.stateNode));
        break;
      case 4:
        r = Se, d = Ei, Se = s.stateNode.containerInfo, Ei = !0, Ra(
          t,
          i,
          s
        ), Se = r, Ei = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        He || Bs(2, s, i), He || Bs(4, s, i), Ra(
          t,
          i,
          s
        );
        break;
      case 1:
        He || (za(s, i), r = s.stateNode, typeof r.componentWillUnmount == "function" && un(
          s,
          i,
          r
        )), Ra(
          t,
          i,
          s
        );
        break;
      case 21:
        Ra(
          t,
          i,
          s
        );
        break;
      case 22:
        He = (r = He) || s.memoizedState !== null, Ra(
          t,
          i,
          s
        ), He = r;
        break;
      default:
        Ra(
          t,
          i,
          s
        );
    }
  }
  function uf(t, i) {
    if (i.memoizedState === null && (t = i.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Dc(t);
      } catch (s) {
        me(i, i.return, s);
      }
  }
  function Bp(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var i = t.stateNode;
        return i === null && (i = t.stateNode = new rf()), i;
      case 22:
        return t = t.stateNode, i = t._retryCache, i === null && (i = t._retryCache = new rf()), i;
      default:
        throw Error(D(435, t.tag));
    }
  }
  function $u(t, i) {
    var s = Bp(t);
    i.forEach(function(r) {
      var d = Tf.bind(null, t, r);
      s.has(r) || (s.add(r), r.then(d, d));
    });
  }
  function hi(t, i) {
    var s = i.deletions;
    if (s !== null)
      for (var r = 0; r < s.length; r++) {
        var d = s[r], m = t, A = i, k = A;
        t: for (; k !== null; ) {
          switch (k.tag) {
            case 27:
              if (J(k.type)) {
                Se = k.stateNode, Ei = !1;
                break t;
              }
              break;
            case 5:
              Se = k.stateNode, Ei = !1;
              break t;
            case 3:
            case 4:
              Se = k.stateNode.containerInfo, Ei = !0;
              break t;
          }
          k = k.return;
        }
        if (Se === null) throw Error(D(160));
        ah(m, A, d), Se = null, Ei = !1, m = d.alternate, m !== null && (m.return = null), d.return = null;
      }
    if (i.subtreeFlags & 13878)
      for (i = i.child; i !== null; )
        tc(i, t), i = i.sibling;
  }
  var Xi = null;
  function tc(t, i) {
    var s = t.alternate, r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        hi(i, t), Gi(t), r & 4 && (Bs(3, t, t.return), xr(3, t), Bs(5, t, t.return));
        break;
      case 1:
        hi(i, t), Gi(t), r & 512 && (He || s === null || za(s, s.return)), r & 64 && ls && (t = t.updateQueue, t !== null && (r = t.callbacks, r !== null && (s = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = s === null ? r : s.concat(r))));
        break;
      case 26:
        var d = Xi;
        if (hi(i, t), Gi(t), r & 512 && (He || s === null || za(s, s.return)), r & 4) {
          var m = s !== null ? s.memoizedState : null;
          if (r = t.memoizedState, s === null)
            if (r === null)
              if (t.stateNode === null) {
                t: {
                  r = t.type, s = t.memoizedProps, d = d.ownerDocument || d;
                  e: switch (r) {
                    case "title":
                      m = d.getElementsByTagName("title")[0], (!m || m[Nn] || m[li] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = d.createElement(r), d.head.insertBefore(
                        m,
                        d.querySelector("head > title")
                      )), S(m, r, s), m[li] = t, Qe(m), r = m;
                      break t;
                    case "link":
                      var A = Og(
                        "link",
                        "href",
                        d
                      ).get(r + (s.href || ""));
                      if (A) {
                        for (var k = 0; k < A.length; k++)
                          if (m = A[k], m.getAttribute("href") === (s.href == null || s.href === "" ? null : s.href) && m.getAttribute("rel") === (s.rel == null ? null : s.rel) && m.getAttribute("title") === (s.title == null ? null : s.title) && m.getAttribute("crossorigin") === (s.crossOrigin == null ? null : s.crossOrigin)) {
                            A.splice(k, 1);
                            break e;
                          }
                      }
                      m = d.createElement(r), S(m, r, s), d.head.appendChild(m);
                      break;
                    case "meta":
                      if (A = Og(
                        "meta",
                        "content",
                        d
                      ).get(r + (s.content || ""))) {
                        for (k = 0; k < A.length; k++)
                          if (m = A[k], m.getAttribute("content") === (s.content == null ? null : "" + s.content) && m.getAttribute("name") === (s.name == null ? null : s.name) && m.getAttribute("property") === (s.property == null ? null : s.property) && m.getAttribute("http-equiv") === (s.httpEquiv == null ? null : s.httpEquiv) && m.getAttribute("charset") === (s.charSet == null ? null : s.charSet)) {
                            A.splice(k, 1);
                            break e;
                          }
                      }
                      m = d.createElement(r), S(m, r, s), d.head.appendChild(m);
                      break;
                    default:
                      throw Error(D(468, r));
                  }
                  m[li] = t, Qe(m), r = m;
                }
                t.stateNode = r;
              } else
                Eg(
                  d,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Ag(
                d,
                r,
                t.memoizedProps
              );
          else
            m !== r ? (m === null ? s.stateNode !== null && (s = s.stateNode, s.parentNode.removeChild(s)) : m.count--, r === null ? Eg(
              d,
              t.type,
              t.stateNode
            ) : Ag(
              d,
              r,
              t.memoizedProps
            )) : r === null && t.stateNode !== null && Sr(
              t,
              t.memoizedProps,
              s.memoizedProps
            );
        }
        break;
      case 27:
        hi(i, t), Gi(t), r & 512 && (He || s === null || za(s, s.return)), s !== null && r & 4 && Sr(
          t,
          t.memoizedProps,
          s.memoizedProps
        );
        break;
      case 5:
        if (hi(i, t), Gi(t), r & 512 && (He || s === null || za(s, s.return)), t.flags & 32) {
          d = t.stateNode;
          try {
            Sa(d, "");
          } catch (V) {
            me(t, t.return, V);
          }
        }
        r & 4 && t.stateNode != null && (d = t.memoizedProps, Sr(
          t,
          d,
          s !== null ? s.memoizedProps : d
        )), r & 1024 && (Ju = !0);
        break;
      case 6:
        if (hi(i, t), Gi(t), r & 4) {
          if (t.stateNode === null)
            throw Error(D(162));
          r = t.memoizedProps, s = t.stateNode;
          try {
            s.nodeValue = r;
          } catch (V) {
            me(t, t.return, V);
          }
        }
        break;
      case 3:
        if (Lf = null, d = Xi, Xi = Me(i.containerInfo), hi(i, t), Xi = d, Gi(t), r & 4 && s !== null && s.memoizedState.isDehydrated)
          try {
            Dc(i.containerInfo);
          } catch (V) {
            me(t, t.return, V);
          }
        Ju && (Ju = !1, Tr(t));
        break;
      case 4:
        r = Xi, Xi = Me(
          t.stateNode.containerInfo
        ), hi(i, t), Gi(t), Xi = r;
        break;
      case 12:
        hi(i, t), Gi(t);
        break;
      case 13:
        hi(i, t), Gi(t), t.child.flags & 8192 && t.memoizedState !== null != (s !== null && s.memoizedState !== null) && (lc = ua()), r & 4 && (r = t.updateQueue, r !== null && (t.updateQueue = null, $u(t, r)));
        break;
      case 22:
        d = t.memoizedState !== null;
        var N = s !== null && s.memoizedState !== null, q = ls, F = He;
        if (ls = q || d, He = F || N, hi(i, t), He = F, ls = q, Gi(t), r & 8192)
          t: for (i = t.stateNode, i._visibility = d ? i._visibility & -2 : i._visibility | 1, d && (s === null || N || ls || He || Us(t)), s = null, i = t; ; ) {
            if (i.tag === 5 || i.tag === 26) {
              if (s === null) {
                N = s = i;
                try {
                  if (m = N.stateNode, d)
                    A = m.style, typeof A.setProperty == "function" ? A.setProperty("display", "none", "important") : A.display = "none";
                  else {
                    k = N.stateNode;
                    var $ = N.memoizedProps.style, _ = $ != null && $.hasOwnProperty("display") ? $.display : null;
                    k.style.display = _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (V) {
                  me(N, N.return, V);
                }
              }
            } else if (i.tag === 6) {
              if (s === null) {
                N = i;
                try {
                  N.stateNode.nodeValue = d ? "" : N.memoizedProps;
                } catch (V) {
                  me(N, N.return, V);
                }
              }
            } else if ((i.tag !== 22 && i.tag !== 23 || i.memoizedState === null || i === t) && i.child !== null) {
              i.child.return = i, i = i.child;
              continue;
            }
            if (i === t) break t;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === t) break t;
              s === i && (s = null), i = i.return;
            }
            s === i && (s = null), i.sibling.return = i.return, i = i.sibling;
          }
        r & 4 && (r = t.updateQueue, r !== null && (s = r.retryQueue, s !== null && (r.retryQueue = null, $u(t, s))));
        break;
      case 19:
        hi(i, t), Gi(t), r & 4 && (r = t.updateQueue, r !== null && (t.updateQueue = null, $u(t, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        hi(i, t), Gi(t);
    }
  }
  function Gi(t) {
    var i = t.flags;
    if (i & 2) {
      try {
        for (var s, r = t.return; r !== null; ) {
          if (Hs(r)) {
            s = r;
            break;
          }
          r = r.return;
        }
        if (s == null) throw Error(D(160));
        switch (s.tag) {
          case 27:
            var d = s.stateNode, m = Mr(t);
            ih(t, m, d);
            break;
          case 5:
            var A = s.stateNode;
            s.flags & 32 && (Sa(A, ""), s.flags &= -33);
            var k = Mr(t);
            ih(t, k, A);
            break;
          case 3:
          case 4:
            var N = s.stateNode.containerInfo, q = Mr(t);
            Iu(
              t,
              q,
              N
            );
            break;
          default:
            throw Error(D(161));
        }
      } catch (F) {
        me(t, t.return, F);
      }
      t.flags &= -3;
    }
    i & 4096 && (t.flags &= -4097);
  }
  function Tr(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var i = t;
        Tr(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), t = t.sibling;
      }
  }
  function Na(t, i) {
    if (i.subtreeFlags & 8772)
      for (i = i.child; i !== null; )
        of(t, i.alternate, i), i = i.sibling;
  }
  function Us(t) {
    for (t = t.child; t !== null; ) {
      var i = t;
      switch (i.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Bs(4, i, i.return), Us(i);
          break;
        case 1:
          za(i, i.return);
          var s = i.stateNode;
          typeof s.componentWillUnmount == "function" && un(
            i,
            i.return,
            s
          ), Us(i);
          break;
        case 27:
          Vt(i.stateNode);
        case 26:
        case 5:
          za(i, i.return), Us(i);
          break;
        case 22:
          i.memoizedState === null && Us(i);
          break;
        case 30:
          Us(i);
          break;
        default:
          Us(i);
      }
      t = t.sibling;
    }
  }
  function Xs(t, i, s) {
    for (s = s && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
      var r = i.alternate, d = t, m = i, A = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Xs(
            d,
            m,
            s
          ), xr(4, m);
          break;
        case 1:
          if (Xs(
            d,
            m,
            s
          ), r = m, d = r.stateNode, typeof d.componentDidMount == "function")
            try {
              d.componentDidMount();
            } catch (q) {
              me(r, r.return, q);
            }
          if (r = m, d = r.updateQueue, d !== null) {
            var k = r.stateNode;
            try {
              var N = d.shared.hiddenCallbacks;
              if (N !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < N.length; d++)
                  es(N[d], k);
            } catch (q) {
              me(r, r.return, q);
            }
          }
          s && A & 64 && Fu(m), cn(m, m.return);
          break;
        case 27:
          nf(m);
        case 26:
        case 5:
          Xs(
            d,
            m,
            s
          ), s && r === null && A & 4 && lf(m), cn(m, m.return);
          break;
        case 12:
          Xs(
            d,
            m,
            s
          );
          break;
        case 13:
          Xs(
            d,
            m,
            s
          ), s && A & 4 && uf(d, m);
          break;
        case 22:
          m.memoizedState === null && Xs(
            d,
            m,
            s
          ), cn(m, m.return);
          break;
        case 30:
          break;
        default:
          Xs(
            d,
            m,
            s
          );
      }
      i = i.sibling;
    }
  }
  function Ar(t, i) {
    var s = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (s = t.memoizedState.cachePool.pool), t = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (t = i.memoizedState.cachePool.pool), t !== s && (t != null && t.refCount++, s != null && nr(s));
  }
  function ec(t, i) {
    t = null, i.alternate !== null && (t = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== t && (i.refCount++, t != null && nr(t));
  }
  function Ba(t, i, s, r) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; )
        sh(
          t,
          i,
          s,
          r
        ), i = i.sibling;
  }
  function sh(t, i, s, r) {
    var d = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Ba(
          t,
          i,
          s,
          r
        ), d & 2048 && xr(9, i);
        break;
      case 1:
        Ba(
          t,
          i,
          s,
          r
        );
        break;
      case 3:
        Ba(
          t,
          i,
          s,
          r
        ), d & 2048 && (t = null, i.alternate !== null && (t = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== t && (i.refCount++, t != null && nr(t)));
        break;
      case 12:
        if (d & 2048) {
          Ba(
            t,
            i,
            s,
            r
          ), t = i.stateNode;
          try {
            var m = i.memoizedProps, A = m.id, k = m.onPostCommit;
            typeof k == "function" && k(
              A,
              i.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (N) {
            me(i, i.return, N);
          }
        } else
          Ba(
            t,
            i,
            s,
            r
          );
        break;
      case 13:
        Ba(
          t,
          i,
          s,
          r
        );
        break;
      case 23:
        break;
      case 22:
        m = i.stateNode, A = i.alternate, i.memoizedState !== null ? m._visibility & 2 ? Ba(
          t,
          i,
          s,
          r
        ) : Or(t, i) : m._visibility & 2 ? Ba(
          t,
          i,
          s,
          r
        ) : (m._visibility |= 2, dn(
          t,
          i,
          s,
          r,
          (i.subtreeFlags & 10256) !== 0
        )), d & 2048 && Ar(A, i);
        break;
      case 24:
        Ba(
          t,
          i,
          s,
          r
        ), d & 2048 && ec(i.alternate, i);
        break;
      default:
        Ba(
          t,
          i,
          s,
          r
        );
    }
  }
  function dn(t, i, s, r, d) {
    for (d = d && (i.subtreeFlags & 10256) !== 0, i = i.child; i !== null; ) {
      var m = t, A = i, k = s, N = r, q = A.flags;
      switch (A.tag) {
        case 0:
        case 11:
        case 15:
          dn(
            m,
            A,
            k,
            N,
            d
          ), xr(8, A);
          break;
        case 23:
          break;
        case 22:
          var F = A.stateNode;
          A.memoizedState !== null ? F._visibility & 2 ? dn(
            m,
            A,
            k,
            N,
            d
          ) : Or(
            m,
            A
          ) : (F._visibility |= 2, dn(
            m,
            A,
            k,
            N,
            d
          )), d && q & 2048 && Ar(
            A.alternate,
            A
          );
          break;
        case 24:
          dn(
            m,
            A,
            k,
            N,
            d
          ), d && q & 2048 && ec(A.alternate, A);
          break;
        default:
          dn(
            m,
            A,
            k,
            N,
            d
          );
      }
      i = i.sibling;
    }
  }
  function Or(t, i) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; ) {
        var s = t, r = i, d = r.flags;
        switch (r.tag) {
          case 22:
            Or(s, r), d & 2048 && Ar(
              r.alternate,
              r
            );
            break;
          case 24:
            Or(s, r), d & 2048 && ec(r.alternate, r);
            break;
          default:
            Or(s, r);
        }
        i = i.sibling;
      }
  }
  var Er = 8192;
  function ns(t) {
    if (t.subtreeFlags & Er)
      for (t = t.child; t !== null; )
        wr(t), t = t.sibling;
  }
  function wr(t) {
    switch (t.tag) {
      case 26:
        ns(t), t.flags & Er && t.memoizedState !== null && Dm(
          Xi,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        ns(t);
        break;
      case 3:
      case 4:
        var i = Xi;
        Xi = Me(t.stateNode.containerInfo), ns(t), Xi = i;
        break;
      case 22:
        t.memoizedState === null && (i = t.alternate, i !== null && i.memoizedState !== null ? (i = Er, Er = 16777216, ns(t), Er = i) : ns(t));
        break;
      default:
        ns(t);
    }
  }
  function ic(t) {
    var i = t.alternate;
    if (i !== null && (t = i.child, t !== null)) {
      i.child = null;
      do
        i = t.sibling, t.sibling = null, t = i;
      while (t !== null);
    }
  }
  function fn(t) {
    var i = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (i !== null)
        for (var s = 0; s < i.length; s++) {
          var r = i[s];
          Je = r, kr(
            r,
            t
          );
        }
      ic(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ac(t), t = t.sibling;
  }
  function ac(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        fn(t), t.flags & 2048 && Bs(9, t, t.return);
        break;
      case 3:
        fn(t);
        break;
      case 12:
        fn(t);
        break;
      case 22:
        var i = t.stateNode;
        t.memoizedState !== null && i._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (i._visibility &= -3, Cr(t)) : fn(t);
        break;
      default:
        fn(t);
    }
  }
  function Cr(t) {
    var i = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (i !== null)
        for (var s = 0; s < i.length; s++) {
          var r = i[s];
          Je = r, kr(
            r,
            t
          );
        }
      ic(t);
    }
    for (t = t.child; t !== null; ) {
      switch (i = t, i.tag) {
        case 0:
        case 11:
        case 15:
          Bs(8, i, i.return), Cr(i);
          break;
        case 22:
          s = i.stateNode, s._visibility & 2 && (s._visibility &= -3, Cr(i));
          break;
        default:
          Cr(i);
      }
      t = t.sibling;
    }
  }
  function kr(t, i) {
    for (; Je !== null; ) {
      var s = Je;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Bs(8, s, i);
          break;
        case 23:
        case 22:
          if (s.memoizedState !== null && s.memoizedState.cachePool !== null) {
            var r = s.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          nr(s.memoizedState.cache);
      }
      if (r = s.child, r !== null) r.return = s, Je = r;
      else
        t: for (s = t; Je !== null; ) {
          r = Je;
          var d = r.sibling, m = r.return;
          if (hf(r), r === s) {
            Je = null;
            break t;
          }
          if (d !== null) {
            d.return = m, Je = d;
            break t;
          }
          Je = m;
        }
    }
  }
  var sc = {
    getCacheForType: function(t) {
      var i = oi(Ge), s = i.data.get(t);
      return s === void 0 && (s = t(), i.data.set(t, s)), s;
    }
  }, Dr = typeof WeakMap == "function" ? WeakMap : Map, re = 0, oe = null, Gt = null, Kt = 0, he = 0, Ve = null, rs = !1, Gs = !1, lh = !1, ui = 0, ye = 0, sa = 0, xl = 0, Sl = 0, la = 0, Ml = 0, Ys = null, wi = null, nh = !1, lc = 0, rh = 1 / 0, oh = null, js = null, ii = 0, Ha = null, pn = null, Tl = 0, nc = 0, rc = null, cf = null, Ps = 0, hh = null;
  function Yi() {
    if ((re & 2) !== 0 && Kt !== 0)
      return Kt & -Kt;
    if (K.T !== null) {
      var t = Jl;
      return t !== 0 ? t : xc();
    }
    return eo();
  }
  function uh() {
    la === 0 && (la = (Kt & 536870912) === 0 || $t ? Jr() : 536870912);
    var t = Ti.current;
    return t !== null && (t.flags |= 32), la;
  }
  function ci(t, i, s) {
    (t === oe && (he === 2 || he === 9) || t.cancelPendingCommit !== null) && (gn(t, 0), os(
      t,
      Kt,
      la,
      !1
    )), qa(t, s), ((re & 2) === 0 || t !== oe) && (t === oe && ((re & 2) === 0 && (xl |= s), ye === 4 && os(
      t,
      Kt,
      la,
      !1
    )), va(t));
  }
  function df(t, i, s) {
    if ((re & 6) !== 0) throw Error(D(327));
    var r = !s && (i & 124) === 0 && (i & t.expiredLanes) === 0 || Rn(t, i), d = r ? Xp(t, i) : dh(t, i, !0), m = r;
    do {
      if (d === 0) {
        Gs && !r && os(t, i, 0, !1);
        break;
      } else {
        if (s = t.current.alternate, m && !Hp(s)) {
          d = dh(t, i, !1), m = !1;
          continue;
        }
        if (d === 2) {
          if (m = i, t.errorRecoveryDisabledLanes & m)
            var A = 0;
          else
            A = t.pendingLanes & -536870913, A = A !== 0 ? A : A & 536870912 ? 536870912 : 0;
          if (A !== 0) {
            i = A;
            t: {
              var k = t;
              d = Ys;
              var N = k.current.memoizedState.isDehydrated;
              if (N && (gn(k, A).flags |= 256), A = dh(
                k,
                A,
                !1
              ), A !== 2) {
                if (lh && !N) {
                  k.errorRecoveryDisabledLanes |= m, xl |= m, d = 4;
                  break t;
                }
                m = wi, wi = d, m !== null && (wi === null ? wi = m : wi.push.apply(
                  wi,
                  m
                ));
              }
              d = A;
            }
            if (m = !1, d !== 2) continue;
          }
        }
        if (d === 1) {
          gn(t, 0), os(t, i, 0, !0);
          break;
        }
        t: {
          switch (r = t, m = d, m) {
            case 0:
            case 1:
              throw Error(D(345));
            case 4:
              if ((i & 4194048) !== i) break;
            case 6:
              os(
                r,
                i,
                la,
                !rs
              );
              break t;
            case 2:
              wi = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(D(329));
          }
          if ((i & 62914560) === i && (d = lc + 300 - ua(), 10 < d)) {
            if (os(
              r,
              i,
              la,
              !rs
            ), Ir(r, 0, !0) !== 0) break t;
            r.timeoutHandle = H(
              oc.bind(
                null,
                r,
                s,
                wi,
                oh,
                nh,
                i,
                la,
                xl,
                Ml,
                rs,
                m,
                2,
                -0,
                0
              ),
              d
            );
            break t;
          }
          oc(
            r,
            s,
            wi,
            oh,
            nh,
            i,
            la,
            xl,
            Ml,
            rs,
            m,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    va(t);
  }
  function oc(t, i, s, r, d, m, A, k, N, q, F, $, _, V) {
    if (t.timeoutHandle = -1, $ = i.subtreeFlags, ($ & 8192 || ($ & 16785408) === 16785408) && (Oc = { stylesheets: null, count: 0, unsuspend: km }, wr(i), $ = Lm(), $ !== null)) {
      t.cancelPendingCommit = $(
        vf.bind(
          null,
          t,
          i,
          m,
          s,
          r,
          d,
          A,
          k,
          N,
          F,
          1,
          _,
          V
        )
      ), os(t, m, A, !q);
      return;
    }
    vf(
      t,
      i,
      m,
      s,
      r,
      d,
      A,
      k,
      N
    );
  }
  function Hp(t) {
    for (var i = t; ; ) {
      var s = i.tag;
      if ((s === 0 || s === 11 || s === 15) && i.flags & 16384 && (s = i.updateQueue, s !== null && (s = s.stores, s !== null)))
        for (var r = 0; r < s.length; r++) {
          var d = s[r], m = d.getSnapshot;
          d = d.value;
          try {
            if (!ri(m(), d)) return !1;
          } catch {
            return !1;
          }
        }
      if (s = i.child, i.subtreeFlags & 16384 && s !== null)
        s.return = i, i = s;
      else {
        if (i === t) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === t) return !0;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    return !0;
  }
  function os(t, i, s, r) {
    i &= ~Sl, i &= ~xl, t.suspendedLanes |= i, t.pingedLanes &= ~i, r && (t.warmLanes |= i), r = t.expirationTimes;
    for (var d = i; 0 < d; ) {
      var m = 31 - Li(d), A = 1 << m;
      r[m] = -1, d &= ~A;
    }
    s !== 0 && _c(t, s, i);
  }
  function ch() {
    return (re & 6) === 0 ? (zr(0), !1) : !0;
  }
  function hc() {
    if (Gt !== null) {
      if (he === 0)
        var t = Gt.return;
      else
        t = Gt, Aa = ul = null, Re(t), ei = null, fr = 0, t = Gt;
      for (; t !== null; )
        Ku(t.alternate, t), t = t.return;
      Gt = null;
    }
  }
  function gn(t, i) {
    var s = t.timeoutHandle;
    s !== -1 && (t.timeoutHandle = -1, j(s)), s = t.cancelPendingCommit, s !== null && (t.cancelPendingCommit = null, s()), hc(), oe = t, Gt = s = ga(t.current, null), Kt = i, he = 0, Ve = null, rs = !1, Gs = Rn(t, i), lh = !1, Ml = la = Sl = xl = sa = ye = 0, wi = Ys = null, nh = !1, (i & 8) !== 0 && (i |= i & 32);
    var r = t.entangledLanes;
    if (r !== 0)
      for (t = t.entanglements, r &= i; 0 < r; ) {
        var d = 31 - Li(r), m = 1 << d;
        i |= t[d], r &= ~m;
      }
    return ui = i, Ni(), s;
  }
  function ff(t, i) {
    Nt = null, K.H = Yo, i === rr || i === Eo ? (i = vu(), he = 3) : i === Oo ? (i = vu(), he = 4) : he = i === Fo ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1, Ve = i, Gt === null && (ye = 1, Vo(
      t,
      Ji(i, t.current)
    ));
  }
  function pf() {
    var t = K.H;
    return K.H = Yo, t === null ? Yo : t;
  }
  function uc() {
    var t = K.A;
    return K.A = sc, t;
  }
  function cc() {
    ye = 4, rs || (Kt & 4194048) !== Kt && Ti.current !== null || (Gs = !0), (sa & 134217727) === 0 && (xl & 134217727) === 0 || oe === null || os(
      oe,
      Kt,
      la,
      !1
    );
  }
  function dh(t, i, s) {
    var r = re;
    re |= 2;
    var d = pf(), m = uc();
    (oe !== t || Kt !== i) && (oh = null, gn(t, i)), i = !1;
    var A = ye;
    t: do
      try {
        if (he !== 0 && Gt !== null) {
          var k = Gt, N = Ve;
          switch (he) {
            case 8:
              hc(), A = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ti.current === null && (i = !0);
              var q = he;
              if (he = 0, Ve = null, qs(t, k, N, q), s && Gs) {
                A = 0;
                break t;
              }
              break;
            default:
              q = he, he = 0, Ve = null, qs(t, k, N, q);
          }
        }
        Up(), A = ye;
        break;
      } catch (F) {
        ff(t, F);
      }
    while (!0);
    return i && t.shellSuspendCounter++, Aa = ul = null, re = r, K.H = d, K.A = m, Gt === null && (oe = null, Kt = 0, Ni()), A;
  }
  function Up() {
    for (; Gt !== null; ) fh(Gt);
  }
  function Xp(t, i) {
    var s = re;
    re |= 2;
    var r = pf(), d = uc();
    oe !== t || Kt !== i ? (oh = null, rh = ua() + 500, gn(t, i)) : Gs = Rn(
      t,
      i
    );
    t: do
      try {
        if (he !== 0 && Gt !== null) {
          i = Gt;
          var m = Ve;
          e: switch (he) {
            case 1:
              he = 0, Ve = null, qs(t, i, m, 1);
              break;
            case 2:
            case 9:
              if (Ed(m)) {
                he = 0, Ve = null, mf(i);
                break;
              }
              i = function() {
                he !== 2 && he !== 9 || oe !== t || (he = 7), va(t);
              }, m.then(i, i);
              break t;
            case 3:
              he = 7;
              break t;
            case 4:
              he = 5;
              break t;
            case 7:
              Ed(m) ? (he = 0, Ve = null, mf(i)) : (he = 0, Ve = null, qs(t, i, m, 7));
              break;
            case 5:
              var A = null;
              switch (Gt.tag) {
                case 26:
                  A = Gt.memoizedState;
                case 5:
                case 27:
                  var k = Gt;
                  if (!A || wg(A)) {
                    he = 0, Ve = null;
                    var N = k.sibling;
                    if (N !== null) Gt = N;
                    else {
                      var q = k.return;
                      q !== null ? (Gt = q, ph(q)) : Gt = null;
                    }
                    break e;
                  }
              }
              he = 0, Ve = null, qs(t, i, m, 5);
              break;
            case 6:
              he = 0, Ve = null, qs(t, i, m, 6);
              break;
            case 8:
              hc(), ye = 6;
              break t;
            default:
              throw Error(D(462));
          }
        }
        gf();
        break;
      } catch (F) {
        ff(t, F);
      }
    while (!0);
    return Aa = ul = null, K.H = r, K.A = d, re = s, Gt !== null ? 0 : (oe = null, Kt = 0, Ni(), ye);
  }
  function gf() {
    for (; Gt !== null && !Kr(); )
      fh(Gt);
  }
  function fh(t) {
    var i = on(t.alternate, t, ui);
    t.memoizedProps = t.pendingProps, i === null ? ph(t) : Gt = i;
  }
  function mf(t) {
    var i = t, s = i.alternate;
    switch (i.tag) {
      case 15:
      case 0:
        i = Pu(
          s,
          i,
          i.pendingProps,
          i.type,
          void 0,
          Kt
        );
        break;
      case 11:
        i = Pu(
          s,
          i,
          i.pendingProps,
          i.type.render,
          i.ref,
          Kt
        );
        break;
      case 5:
        Re(i);
      default:
        Ku(s, i), i = Gt = xi(i, ui), i = on(s, i, ui);
    }
    t.memoizedProps = t.pendingProps, i === null ? ph(t) : Gt = i;
  }
  function qs(t, i, s, r) {
    Aa = ul = null, Re(i), ei = null, fr = 0;
    var d = i.return;
    try {
      if (Rp(
        t,
        d,
        i,
        s,
        Kt
      )) {
        ye = 1, Vo(
          t,
          Ji(s, t.current)
        ), Gt = null;
        return;
      }
    } catch (m) {
      if (d !== null) throw Gt = d, m;
      ye = 1, Vo(
        t,
        Ji(s, t.current)
      ), Gt = null;
      return;
    }
    i.flags & 32768 ? ($t || r === 1 ? t = !0 : Gs || (Kt & 536870912) !== 0 ? t = !1 : (rs = t = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ti.current, r !== null && r.tag === 13 && (r.flags |= 16384))), yf(i, t)) : ph(i);
  }
  function ph(t) {
    var i = t;
    do {
      if ((i.flags & 32768) !== 0) {
        yf(
          i,
          rs
        );
        return;
      }
      t = i.return;
      var s = Wu(
        i.alternate,
        i,
        ui
      );
      if (s !== null) {
        Gt = s;
        return;
      }
      if (i = i.sibling, i !== null) {
        Gt = i;
        return;
      }
      Gt = i = t;
    } while (i !== null);
    ye === 0 && (ye = 5);
  }
  function yf(t, i) {
    do {
      var s = br(t.alternate, t);
      if (s !== null) {
        s.flags &= 32767, Gt = s;
        return;
      }
      if (s = t.return, s !== null && (s.flags |= 32768, s.subtreeFlags = 0, s.deletions = null), !i && (t = t.sibling, t !== null)) {
        Gt = t;
        return;
      }
      Gt = t = s;
    } while (t !== null);
    ye = 6, Gt = null;
  }
  function vf(t, i, s, r, d, m, A, k, N) {
    t.cancelPendingCommit = null;
    do
      gh();
    while (ii !== 0);
    if ((re & 6) !== 0) throw Error(D(327));
    if (i !== null) {
      if (i === t.current) throw Error(D(177));
      if (m = i.lanes | i.childLanes, m |= hu, tp(
        t,
        s,
        m,
        A,
        k,
        N
      ), t === oe && (Gt = oe = null, Kt = 0), pn = i, Ha = t, Tl = s, nc = m, rc = d, cf = r, (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Yp(ds, function() {
        return xf(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), r = (i.flags & 13878) !== 0, (i.subtreeFlags & 13878) !== 0 || r) {
        r = K.T, K.T = null, d = ut.p, ut.p = 2, A = re, re |= 4;
        try {
          Np(t, i, s);
        } finally {
          re = A, ut.p = d, K.T = r;
        }
      }
      ii = 1, dc(), bf(), fc();
    }
  }
  function dc() {
    if (ii === 1) {
      ii = 0;
      var t = Ha, i = pn, s = (i.flags & 13878) !== 0;
      if ((i.subtreeFlags & 13878) !== 0 || s) {
        s = K.T, K.T = null;
        var r = ut.p;
        ut.p = 2;
        var d = re;
        re |= 4;
        try {
          tc(i, t);
          var m = M, A = gd(t.containerInfo), k = m.focusedElem, N = m.selectionRange;
          if (A !== k && k && k.ownerDocument && Ka(
            k.ownerDocument.documentElement,
            k
          )) {
            if (N !== null && po(k)) {
              var q = N.start, F = N.end;
              if (F === void 0 && (F = q), "selectionStart" in k)
                k.selectionStart = q, k.selectionEnd = Math.min(
                  F,
                  k.value.length
                );
              else {
                var $ = k.ownerDocument || document, _ = $ && $.defaultView || window;
                if (_.getSelection) {
                  var V = _.getSelection(), Bt = k.textContent.length, Dt = Math.min(N.start, Bt), ve = N.end === void 0 ? Dt : Math.min(N.end, Bt);
                  !V.extend && Dt > ve && (A = ve, ve = Dt, Dt = A);
                  var G = pd(
                    k,
                    Dt
                  ), U = pd(
                    k,
                    ve
                  );
                  if (G && U && (V.rangeCount !== 1 || V.anchorNode !== G.node || V.anchorOffset !== G.offset || V.focusNode !== U.node || V.focusOffset !== U.offset)) {
                    var P = $.createRange();
                    P.setStart(G.node, G.offset), V.removeAllRanges(), Dt > ve ? (V.addRange(P), V.extend(U.node, U.offset)) : (P.setEnd(U.node, U.offset), V.addRange(P));
                  }
                }
              }
            }
            for ($ = [], V = k; V = V.parentNode; )
              V.nodeType === 1 && $.push({
                element: V,
                left: V.scrollLeft,
                top: V.scrollTop
              });
            for (typeof k.focus == "function" && k.focus(), k = 0; k < $.length; k++) {
              var I = $[k];
              I.element.scrollLeft = I.left, I.element.scrollTop = I.top;
            }
          }
          Nf = !!T, M = T = null;
        } finally {
          re = d, ut.p = r, K.T = s;
        }
      }
      t.current = i, ii = 2;
    }
  }
  function bf() {
    if (ii === 2) {
      ii = 0;
      var t = Ha, i = pn, s = (i.flags & 8772) !== 0;
      if ((i.subtreeFlags & 8772) !== 0 || s) {
        s = K.T, K.T = null;
        var r = ut.p;
        ut.p = 2;
        var d = re;
        re |= 4;
        try {
          of(t, i.alternate, i);
        } finally {
          re = d, ut.p = r, K.T = s;
        }
      }
      ii = 3;
    }
  }
  function fc() {
    if (ii === 4 || ii === 3) {
      ii = 0, jc();
      var t = Ha, i = pn, s = Tl, r = cf;
      (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? ii = 5 : (ii = 0, pn = Ha = null, pc(t, t.pendingLanes));
      var d = t.pendingLanes;
      if (d === 0 && (js = null), to(s), i = i.stateNode, Di && typeof Di.onCommitFiberRoot == "function")
        try {
          Di.onCommitFiberRoot(
            Ks,
            i,
            void 0,
            (i.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        i = K.T, d = ut.p, ut.p = 2, K.T = null;
        try {
          for (var m = t.onRecoverableError, A = 0; A < r.length; A++) {
            var k = r[A];
            m(k.value, {
              componentStack: k.stack
            });
          }
        } finally {
          K.T = i, ut.p = d;
        }
      }
      (Tl & 3) !== 0 && gh(), va(t), d = t.pendingLanes, (s & 4194090) !== 0 && (d & 42) !== 0 ? t === hh ? Ps++ : (Ps = 0, hh = t) : Ps = 0, zr(0);
    }
  }
  function pc(t, i) {
    (t.pooledCacheLanes &= i) === 0 && (i = t.pooledCache, i != null && (t.pooledCache = null, nr(i)));
  }
  function gh(t) {
    return dc(), bf(), fc(), xf();
  }
  function xf() {
    if (ii !== 5) return !1;
    var t = Ha, i = nc;
    nc = 0;
    var s = to(Tl), r = K.T, d = ut.p;
    try {
      ut.p = 32 > s ? 32 : s, K.T = null, s = rc, rc = null;
      var m = Ha, A = Tl;
      if (ii = 0, pn = Ha = null, Tl = 0, (re & 6) !== 0) throw Error(D(331));
      var k = re;
      if (re |= 4, ac(m.current), sh(
        m,
        m.current,
        A,
        s
      ), re = k, zr(0, !1), Di && typeof Di.onPostCommitFiberRoot == "function")
        try {
          Di.onPostCommitFiberRoot(Ks, m);
        } catch {
        }
      return !0;
    } finally {
      ut.p = d, K.T = r, pc(t, i);
    }
  }
  function gc(t, i, s) {
    i = Ji(s, i), i = Ca(t.stateNode, i, 2), t = ws(t, i, 2), t !== null && (qa(t, 2), va(t));
  }
  function me(t, i, s) {
    if (t.tag === 3)
      gc(t, t, s);
    else
      for (; i !== null; ) {
        if (i.tag === 3) {
          gc(
            i,
            t,
            s
          );
          break;
        } else if (i.tag === 1) {
          var r = i.stateNode;
          if (typeof i.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (js === null || !js.has(r))) {
            t = Ji(s, t), s = Ko(2), r = ws(i, s, 2), r !== null && (Zt(
              s,
              r,
              i,
              t
            ), qa(r, 2), va(r));
            break;
          }
        }
        i = i.return;
      }
  }
  function mc(t, i, s) {
    var r = t.pingCache;
    if (r === null) {
      r = t.pingCache = new Dr();
      var d = /* @__PURE__ */ new Set();
      r.set(i, d);
    } else
      d = r.get(i), d === void 0 && (d = /* @__PURE__ */ new Set(), r.set(i, d));
    d.has(s) || (lh = !0, d.add(s), t = Gp.bind(null, t, i, s), i.then(t, t));
  }
  function Gp(t, i, s) {
    var r = t.pingCache;
    r !== null && r.delete(i), t.pingedLanes |= t.suspendedLanes & s, t.warmLanes &= ~s, oe === t && (Kt & s) === s && (ye === 4 || ye === 3 && (Kt & 62914560) === Kt && 300 > ua() - lc ? (re & 2) === 0 && gn(t, 0) : Sl |= s, Ml === Kt && (Ml = 0)), va(t);
  }
  function Sf(t, i) {
    i === 0 && (i = zi()), t = rl(t, i), t !== null && (qa(t, i), va(t));
  }
  function Mf(t) {
    var i = t.memoizedState, s = 0;
    i !== null && (s = i.retryLane), Sf(t, s);
  }
  function Tf(t, i) {
    var s = 0;
    switch (t.tag) {
      case 13:
        var r = t.stateNode, d = t.memoizedState;
        d !== null && (s = d.retryLane);
        break;
      case 19:
        r = t.stateNode;
        break;
      case 22:
        r = t.stateNode._retryCache;
        break;
      default:
        throw Error(D(314));
    }
    r !== null && r.delete(i), Sf(t, s);
  }
  function Yp(t, i) {
    return Mt(t, i);
  }
  var mh = null, Al = null, yc = !1, Lr = !1, vc = !1, _s = 0;
  function va(t) {
    t !== Al && t.next === null && (Al === null ? mh = Al = t : Al = Al.next = t), Lr = !0, yc || (yc = !0, wf());
  }
  function zr(t, i) {
    if (!vc && Lr) {
      vc = !0;
      do
        for (var s = !1, r = mh; r !== null; ) {
          if (t !== 0) {
            var d = r.pendingLanes;
            if (d === 0) var m = 0;
            else {
              var A = r.suspendedLanes, k = r.pingedLanes;
              m = (1 << 31 - Li(42 | t) + 1) - 1, m &= d & ~(A & ~k), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (s = !0, bc(r, m));
          } else
            m = Kt, m = Ir(
              r,
              r === oe ? m : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (m & 3) === 0 || Rn(r, m) || (s = !0, bc(r, m));
          r = r.next;
        }
      while (s);
      vc = !1;
    }
  }
  function Af() {
    Of();
  }
  function Of() {
    Lr = yc = !1;
    var t = 0;
    _s !== 0 && (Y() && (t = _s), _s = 0);
    for (var i = ua(), s = null, r = mh; r !== null; ) {
      var d = r.next, m = yh(r, i);
      m === 0 ? (r.next = null, s === null ? mh = d : s.next = d, d === null && (Al = s)) : (s = r, (t !== 0 || (m & 3) !== 0) && (Lr = !0)), r = d;
    }
    zr(t);
  }
  function yh(t, i) {
    for (var s = t.suspendedLanes, r = t.pingedLanes, d = t.expirationTimes, m = t.pendingLanes & -62914561; 0 < m; ) {
      var A = 31 - Li(m), k = 1 << A, N = d[A];
      N === -1 ? ((k & s) === 0 || (k & r) !== 0) && (d[A] = Pa(k, i)) : N <= i && (t.expiredLanes |= k), m &= ~k;
    }
    if (i = oe, s = Kt, s = Ir(
      t,
      t === i ? s : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), r = t.callbackNode, s === 0 || t === i && (he === 2 || he === 9) || t.cancelPendingCommit !== null)
      return r !== null && r !== null && Hh(r), t.callbackNode = null, t.callbackPriority = 0;
    if ((s & 3) === 0 || Rn(t, s)) {
      if (i = s & -s, i === t.callbackPriority) return i;
      switch (r !== null && Hh(r), to(s)) {
        case 2:
        case 8:
          s = Fr;
          break;
        case 32:
          s = ds;
          break;
        case 268435456:
          s = Pc;
          break;
        default:
          s = ds;
      }
      return r = Ef.bind(null, t), s = Mt(s, r), t.callbackPriority = i, t.callbackNode = s, i;
    }
    return r !== null && r !== null && Hh(r), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Ef(t, i) {
    if (ii !== 0 && ii !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var s = t.callbackNode;
    if (gh() && t.callbackNode !== s)
      return null;
    var r = Kt;
    return r = Ir(
      t,
      t === oe ? r : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), r === 0 ? null : (df(t, r, i), yh(t, ua()), t.callbackNode != null && t.callbackNode === s ? Ef.bind(null, t) : null);
  }
  function bc(t, i) {
    if (gh()) return null;
    df(t, i, !0);
  }
  function wf() {
    tt(function() {
      (re & 6) !== 0 ? Mt(
        Xh,
        Af
      ) : Of();
    });
  }
  function xc() {
    return _s === 0 && (_s = Jr()), _s;
  }
  function Cf(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : no("" + t);
  }
  function vh(t, i) {
    var s = i.ownerDocument.createElement("input");
    return s.name = i.name, s.value = i.value, t.id && s.setAttribute("form", t.id), i.parentNode.insertBefore(s, i), t = new FormData(t), s.parentNode.removeChild(s), t;
  }
  function jp(t, i, s, r, d) {
    if (i === "submit" && s && s.stateNode === d) {
      var m = Cf(
        (d[ni] || null).action
      ), A = r.submitter;
      A && (i = (i = A[ni] || null) ? Cf(i.formAction) : A.getAttribute("formAction"), i !== null && (m = i, A = null));
      var k = new uo(
        "action",
        "action",
        null,
        r,
        d
      );
      t.push({
        event: k,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (_s !== 0) {
                  var N = A ? vh(d, A) : new FormData(d);
                  Hi(
                    s,
                    {
                      pending: !0,
                      data: N,
                      method: d.method,
                      action: m
                    },
                    null,
                    N
                  );
                }
              } else
                typeof m == "function" && (k.preventDefault(), N = A ? vh(d, A) : new FormData(d), Hi(
                  s,
                  {
                    pending: !0,
                    data: N,
                    method: d.method,
                    action: m
                  },
                  m,
                  N
                ));
            },
            currentTarget: d
          }
        ]
      });
    }
  }
  for (var Sc = 0; Sc < ou.length; Sc++) {
    var Mc = ou[Sc], Pp = Mc.toLowerCase(), qp = Mc[0].toUpperCase() + Mc.slice(1);
    Ii(
      Pp,
      "on" + qp
    );
  }
  Ii(yd, "onAnimationEnd"), Ii(vd, "onAnimationIteration"), Ii(bd, "onAnimationStart"), Ii("dblclick", "onDoubleClick"), Ii("focusin", "onFocus"), Ii("focusout", "onBlur"), Ii(go, "onTransitionRun"), Ii(ru, "onTransitionStart"), Ii(Ep, "onTransitionCancel"), Ii($n, "onTransitionEnd"), Rl("onMouseEnter", ["mouseout", "mouseover"]), Rl("onMouseLeave", ["mouseout", "mouseover"]), Rl("onPointerEnter", ["pointerout", "pointerover"]), Rl("onPointerLeave", ["pointerout", "pointerover"]), Js(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Js(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Js("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Js(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Js(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Js(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Rr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), bh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Rr)
  );
  function kf(t, i) {
    i = (i & 4) !== 0;
    for (var s = 0; s < t.length; s++) {
      var r = t[s], d = r.event;
      r = r.listeners;
      t: {
        var m = void 0;
        if (i)
          for (var A = r.length - 1; 0 <= A; A--) {
            var k = r[A], N = k.instance, q = k.currentTarget;
            if (k = k.listener, N !== m && d.isPropagationStopped())
              break t;
            m = k, d.currentTarget = q;
            try {
              m(d);
            } catch (F) {
              Oi(F);
            }
            d.currentTarget = null, m = N;
          }
        else
          for (A = 0; A < r.length; A++) {
            if (k = r[A], N = k.instance, q = k.currentTarget, k = k.listener, N !== m && d.isPropagationStopped())
              break t;
            m = k, d.currentTarget = q;
            try {
              m(d);
            } catch (F) {
              Oi(F);
            }
            d.currentTarget = null, m = N;
          }
      }
    }
  }
  function Qt(t, i) {
    var s = i[ti];
    s === void 0 && (s = i[ti] = /* @__PURE__ */ new Set());
    var r = t + "__bubble";
    s.has(r) || (e(i, t, 2, !1), s.add(r));
  }
  function Tc(t, i, s) {
    var r = 0;
    i && (r |= 4), e(
      s,
      t,
      r,
      i
    );
  }
  var Nr = "_reactListening" + Math.random().toString(36).slice(2);
  function p(t) {
    if (!t[Nr]) {
      t[Nr] = !0, We.forEach(function(s) {
        s !== "selectionchange" && (bh.has(s) || Tc(s, !1, t), Tc(s, !0, t));
      });
      var i = t.nodeType === 9 ? t : t.ownerDocument;
      i === null || i[Nr] || (i[Nr] = !0, Tc("selectionchange", !1, i));
    }
  }
  function e(t, i, s, r) {
    switch (Rg(i)) {
      case 2:
        var d = Nm;
        break;
      case 8:
        d = Bm;
        break;
      default:
        d = Wp;
    }
    s = d.bind(
      null,
      i,
      s,
      t
    ), d = void 0, !Qh || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (d = !0), r ? d !== void 0 ? t.addEventListener(i, s, {
      capture: !0,
      passive: d
    }) : t.addEventListener(i, s, !0) : d !== void 0 ? t.addEventListener(i, s, {
      passive: d
    }) : t.addEventListener(i, s, !1);
  }
  function a(t, i, s, r, d) {
    var m = r;
    if ((i & 1) === 0 && (i & 2) === 0 && r !== null)
      t: for (; ; ) {
        if (r === null) return;
        var A = r.tag;
        if (A === 3 || A === 4) {
          var k = r.stateNode.containerInfo;
          if (k === d) break;
          if (A === 4)
            for (A = r.return; A !== null; ) {
              var N = A.tag;
              if ((N === 3 || N === 4) && A.stateNode.containerInfo === d)
                return;
              A = A.return;
            }
          for (; k !== null; ) {
            if (A = Is(k), A === null) return;
            if (N = A.tag, N === 5 || N === 6 || N === 26 || N === 27) {
              r = m = A;
              continue t;
            }
            k = k.parentNode;
          }
        }
        r = r.return;
      }
    $c(function() {
      var q = m, F = oo(s), $ = [];
      t: {
        var _ = mo.get(t);
        if (_ !== void 0) {
          var V = uo, Bt = t;
          switch (t) {
            case "keypress":
              if (Xl(s) === 0) break t;
            case "keydown":
            case "keyup":
              V = rd;
              break;
            case "focusin":
              Bt = "focus", V = Fi;
              break;
            case "focusout":
              Bt = "blur", V = Fi;
              break;
            case "beforeblur":
            case "afterblur":
              V = Fi;
              break;
            case "click":
              if (s.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              V = td;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              V = ed;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              V = fp;
              break;
            case yd:
            case vd:
            case bd:
              V = up;
              break;
            case $n:
              V = Ih;
              break;
            case "scroll":
            case "scrollend":
              V = Vh;
              break;
            case "wheel":
              V = gp;
              break;
            case "copy":
            case "cut":
            case "paste":
              V = Qn;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              V = Kh;
              break;
            case "toggle":
            case "beforetoggle":
              V = yp;
          }
          var Dt = (i & 4) !== 0, ve = !Dt && (t === "scroll" || t === "scrollend"), G = Dt ? _ !== null ? _ + "Capture" : null : _;
          Dt = [];
          for (var U = q, P; U !== null; ) {
            var I = U;
            if (P = I.stateNode, I = I.tag, I !== 5 && I !== 26 && I !== 27 || P === null || G === null || (I = _n(U, G), I != null && Dt.push(
              l(U, I, P)
            )), ve) break;
            U = U.return;
          }
          0 < Dt.length && (_ = new V(
            _,
            Bt,
            null,
            s,
            F
          ), $.push({ event: _, listeners: Dt }));
        }
      }
      if ((i & 7) === 0) {
        t: {
          if (_ = t === "mouseover" || t === "pointerover", V = t === "mouseout" || t === "pointerout", _ && s !== ro && (Bt = s.relatedTarget || s.fromElement) && (Is(Bt) || Bt[Ll]))
            break t;
          if ((V || _) && (_ = F.window === F ? F : (_ = F.ownerDocument) ? _.defaultView || _.parentWindow : window, V ? (Bt = s.relatedTarget || s.toElement, V = q, Bt = Bt ? Is(Bt) : null, Bt !== null && (ve = et(Bt), Dt = Bt.tag, Bt !== ve || Dt !== 5 && Dt !== 27 && Dt !== 6) && (Bt = null)) : (V = null, Bt = q), V !== Bt)) {
            if (Dt = td, I = "onMouseLeave", G = "onMouseEnter", U = "mouse", (t === "pointerout" || t === "pointerover") && (Dt = Kh, I = "onPointerLeave", G = "onPointerEnter", U = "pointer"), ve = V == null ? _ : Hn(V), P = Bt == null ? _ : Hn(Bt), _ = new Dt(
              I,
              U + "leave",
              V,
              s,
              F
            ), _.target = ve, _.relatedTarget = P, I = null, Is(F) === q && (Dt = new Dt(
              G,
              U + "enter",
              Bt,
              s,
              F
            ), Dt.target = P, Dt.relatedTarget = ve, I = Dt), ve = I, V && Bt)
              e: {
                for (Dt = V, G = Bt, U = 0, P = Dt; P; P = o(P))
                  U++;
                for (P = 0, I = G; I; I = o(I))
                  P++;
                for (; 0 < U - P; )
                  Dt = o(Dt), U--;
                for (; 0 < P - U; )
                  G = o(G), P--;
                for (; U--; ) {
                  if (Dt === G || G !== null && Dt === G.alternate)
                    break e;
                  Dt = o(Dt), G = o(G);
                }
                Dt = null;
              }
            else Dt = null;
            V !== null && h(
              $,
              _,
              V,
              Dt,
              !1
            ), Bt !== null && ve !== null && h(
              $,
              ve,
              Bt,
              Dt,
              !0
            );
          }
        }
        t: {
          if (_ = q ? Hn(q) : window, V = _.nodeName && _.nodeName.toLowerCase(), V === "select" || V === "input" && _.type === "file")
            var vt = xs;
          else if (fo(_))
            if (cd)
              vt = Tp;
            else {
              vt = su;
              var Wt = au;
            }
          else
            V = _.nodeName, !V || V.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? q && Pn(q.elementType) && (vt = xs) : vt = Mp;
          if (vt && (vt = vt(t, q))) {
            Kn(
              $,
              vt,
              s,
              F
            );
            break t;
          }
          Wt && Wt(t, _, q), t === "focusout" && q && _.type === "number" && q.memoizedProps.value != null && so(_, "number", _.value);
        }
        switch (Wt = q ? Hn(q) : window, t) {
          case "focusin":
            (fo(Wt) || Wt.contentEditable === "true") && (ql = Wt, _l = q, Jn = null);
            break;
          case "focusout":
            Jn = _l = ql = null;
            break;
          case "mousedown":
            lu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            lu = !1, nu($, s, F);
            break;
          case "selectionchange":
            if (Op) break;
          case "keydown":
          case "keyup":
            nu($, s, F);
        }
        var Et;
        if (Vn)
          t: {
            switch (t) {
              case "compositionstart":
                var zt = "onCompositionStart";
                break t;
              case "compositionend":
                zt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                zt = "onCompositionUpdate";
                break t;
            }
            zt = void 0;
          }
        else
          jl ? $h(t, s) && (zt = "onCompositionEnd") : t === "keydown" && s.keyCode === 229 && (zt = "onCompositionStart");
        zt && (hd && s.locale !== "ko" && (jl || zt !== "onCompositionStart" ? zt === "onCompositionEnd" && jl && (Et = Ul()) : (Va = F, Ki = "value" in Va ? Va.value : Va.textContent, jl = !0)), Wt = n(q, zt), 0 < Wt.length && (zt = new Zn(
          zt,
          t,
          null,
          s,
          F
        ), $.push({ event: zt, listeners: Wt }), Et ? zt.data = Et : (Et = tu(s), Et !== null && (zt.data = Et)))), (Et = bp ? xp(t, s) : Sp(t, s)) && (zt = n(q, "onBeforeInput"), 0 < zt.length && (Wt = new Zn(
          "onBeforeInput",
          "beforeinput",
          null,
          s,
          F
        ), $.push({
          event: Wt,
          listeners: zt
        }), Wt.data = Et)), jp(
          $,
          t,
          q,
          s,
          F
        );
      }
      kf($, i);
    });
  }
  function l(t, i, s) {
    return {
      instance: t,
      listener: i,
      currentTarget: s
    };
  }
  function n(t, i) {
    for (var s = i + "Capture", r = []; t !== null; ) {
      var d = t, m = d.stateNode;
      if (d = d.tag, d !== 5 && d !== 26 && d !== 27 || m === null || (d = _n(t, s), d != null && r.unshift(
        l(t, d, m)
      ), d = _n(t, i), d != null && r.push(
        l(t, d, m)
      )), t.tag === 3) return r;
      t = t.return;
    }
    return [];
  }
  function o(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function h(t, i, s, r, d) {
    for (var m = i._reactName, A = []; s !== null && s !== r; ) {
      var k = s, N = k.alternate, q = k.stateNode;
      if (k = k.tag, N !== null && N === r) break;
      k !== 5 && k !== 26 && k !== 27 || q === null || (N = q, d ? (q = _n(s, m), q != null && A.unshift(
        l(s, q, N)
      )) : d || (q = _n(s, m), q != null && A.push(
        l(s, q, N)
      ))), s = s.return;
    }
    A.length !== 0 && t.push({ event: i, listeners: A });
  }
  var u = /\r\n?/g, c = /\u0000|\uFFFD/g;
  function f(t) {
    return (typeof t == "string" ? t : "" + t).replace(u, `
`).replace(c, "");
  }
  function y(t, i) {
    return i = f(i), f(t) === i;
  }
  function g() {
  }
  function v(t, i, s, r, d, m) {
    switch (s) {
      case "children":
        typeof r == "string" ? i === "body" || i === "textarea" && r === "" || Sa(t, r) : (typeof r == "number" || typeof r == "bigint") && i !== "body" && Sa(t, "" + r);
        break;
      case "className":
        Xn(t, "class", r);
        break;
      case "tabIndex":
        Xn(t, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xn(t, s, r);
        break;
      case "style":
        Jc(t, r, m);
        break;
      case "data":
        if (i !== "object") {
          Xn(t, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (i !== "a" || s !== "href")) {
          t.removeAttribute(s);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          t.removeAttribute(s);
          break;
        }
        r = no("" + r), t.setAttribute(s, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          t.setAttribute(
            s,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof m == "function" && (s === "formAction" ? (i !== "input" && v(t, i, "name", d.name, d, null), v(
            t,
            i,
            "formEncType",
            d.formEncType,
            d,
            null
          ), v(
            t,
            i,
            "formMethod",
            d.formMethod,
            d,
            null
          ), v(
            t,
            i,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (v(t, i, "encType", d.encType, d, null), v(t, i, "method", d.method, d, null), v(t, i, "target", d.target, d, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          t.removeAttribute(s);
          break;
        }
        r = no("" + r), t.setAttribute(s, r);
        break;
      case "onClick":
        r != null && (t.onclick = g);
        break;
      case "onScroll":
        r != null && Qt("scroll", t);
        break;
      case "onScrollEnd":
        r != null && Qt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(D(61));
          if (s = r.__html, s != null) {
            if (d.children != null) throw Error(D(60));
            t.innerHTML = s;
          }
        }
        break;
      case "multiple":
        t.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        t.muted = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        s = no("" + r), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          s
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        r != null && typeof r != "function" && typeof r != "symbol" ? t.setAttribute(s, "" + r) : t.removeAttribute(s);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        r && typeof r != "function" && typeof r != "symbol" ? t.setAttribute(s, "") : t.removeAttribute(s);
        break;
      case "capture":
      case "download":
        r === !0 ? t.setAttribute(s, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? t.setAttribute(s, r) : t.removeAttribute(s);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? t.setAttribute(s, r) : t.removeAttribute(s);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? t.removeAttribute(s) : t.setAttribute(s, r);
        break;
      case "popover":
        Qt("beforetoggle", t), Qt("toggle", t), Un(t, "popover", r);
        break;
      case "xlinkActuate":
        Qa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        Qa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        Qa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        Qa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        Qa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        Qa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        Qa(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        Qa(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        Qa(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        Un(t, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < s.length) || s[0] !== "o" && s[0] !== "O" || s[1] !== "n" && s[1] !== "N") && (s = lo.get(s) || s, Un(t, s, r));
    }
  }
  function b(t, i, s, r, d, m) {
    switch (s) {
      case "style":
        Jc(t, r, m);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(D(61));
          if (s = r.__html, s != null) {
            if (d.children != null) throw Error(D(60));
            t.innerHTML = s;
          }
        }
        break;
      case "children":
        typeof r == "string" ? Sa(t, r) : (typeof r == "number" || typeof r == "bigint") && Sa(t, "" + r);
        break;
      case "onScroll":
        r != null && Qt("scroll", t);
        break;
      case "onScrollEnd":
        r != null && Qt("scrollend", t);
        break;
      case "onClick":
        r != null && (t.onclick = g);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Yh.hasOwnProperty(s))
          t: {
            if (s[0] === "o" && s[1] === "n" && (d = s.endsWith("Capture"), i = s.slice(2, d ? s.length - 7 : void 0), m = t[ni] || null, m = m != null ? m[s] : null, typeof m == "function" && t.removeEventListener(i, m, d), typeof r == "function")) {
              typeof m != "function" && m !== null && (s in t ? t[s] = null : t.hasAttribute(s) && t.removeAttribute(s)), t.addEventListener(i, r, d);
              break t;
            }
            s in t ? t[s] = r : r === !0 ? t.setAttribute(s, "") : Un(t, s, r);
          }
    }
  }
  function S(t, i, s) {
    switch (i) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Qt("error", t), Qt("load", t);
        var r = !1, d = !1, m;
        for (m in s)
          if (s.hasOwnProperty(m)) {
            var A = s[m];
            if (A != null)
              switch (m) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  d = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(D(137, i));
                default:
                  v(t, i, m, A, s, null);
              }
          }
        d && v(t, i, "srcSet", s.srcSet, s, null), r && v(t, i, "src", s.src, s, null);
        return;
      case "input":
        Qt("invalid", t);
        var k = m = A = d = null, N = null, q = null;
        for (r in s)
          if (s.hasOwnProperty(r)) {
            var F = s[r];
            if (F != null)
              switch (r) {
                case "name":
                  d = F;
                  break;
                case "type":
                  A = F;
                  break;
                case "checked":
                  N = F;
                  break;
                case "defaultChecked":
                  q = F;
                  break;
                case "value":
                  m = F;
                  break;
                case "defaultValue":
                  k = F;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (F != null)
                    throw Error(D(137, i));
                  break;
                default:
                  v(t, i, r, F, s, null);
              }
          }
        Ph(
          t,
          m,
          k,
          N,
          q,
          A,
          d,
          !1
        ), jn(t);
        return;
      case "select":
        Qt("invalid", t), r = A = m = null;
        for (d in s)
          if (s.hasOwnProperty(d) && (k = s[d], k != null))
            switch (d) {
              case "value":
                m = k;
                break;
              case "defaultValue":
                A = k;
                break;
              case "multiple":
                r = k;
              default:
                v(t, i, d, k, s, null);
            }
        i = m, s = A, t.multiple = !!r, i != null ? Za(t, !!r, i, !1) : s != null && Za(t, !!r, s, !0);
        return;
      case "textarea":
        Qt("invalid", t), m = d = r = null;
        for (A in s)
          if (s.hasOwnProperty(A) && (k = s[A], k != null))
            switch (A) {
              case "value":
                r = k;
                break;
              case "defaultValue":
                d = k;
                break;
              case "children":
                m = k;
                break;
              case "dangerouslySetInnerHTML":
                if (k != null) throw Error(D(91));
                break;
              default:
                v(t, i, A, k, s, null);
            }
        Ri(t, r, d, m), jn(t);
        return;
      case "option":
        for (N in s)
          if (s.hasOwnProperty(N) && (r = s[N], r != null))
            switch (N) {
              case "selected":
                t.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                v(t, i, N, r, s, null);
            }
        return;
      case "dialog":
        Qt("beforetoggle", t), Qt("toggle", t), Qt("cancel", t), Qt("close", t);
        break;
      case "iframe":
      case "object":
        Qt("load", t);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Rr.length; r++)
          Qt(Rr[r], t);
        break;
      case "image":
        Qt("error", t), Qt("load", t);
        break;
      case "details":
        Qt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Qt("error", t), Qt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (q in s)
          if (s.hasOwnProperty(q) && (r = s[q], r != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(D(137, i));
              default:
                v(t, i, q, r, s, null);
            }
        return;
      default:
        if (Pn(i)) {
          for (F in s)
            s.hasOwnProperty(F) && (r = s[F], r !== void 0 && b(
              t,
              i,
              F,
              r,
              s,
              void 0
            ));
          return;
        }
    }
    for (k in s)
      s.hasOwnProperty(k) && (r = s[k], r != null && v(t, i, k, r, s, null));
  }
  function E(t, i, s, r) {
    switch (i) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var d = null, m = null, A = null, k = null, N = null, q = null, F = null;
        for (V in s) {
          var $ = s[V];
          if (s.hasOwnProperty(V) && $ != null)
            switch (V) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                N = $;
              default:
                r.hasOwnProperty(V) || v(t, i, V, null, r, $);
            }
        }
        for (var _ in r) {
          var V = r[_];
          if ($ = s[_], r.hasOwnProperty(_) && (V != null || $ != null))
            switch (_) {
              case "type":
                m = V;
                break;
              case "name":
                d = V;
                break;
              case "checked":
                q = V;
                break;
              case "defaultChecked":
                F = V;
                break;
              case "value":
                A = V;
                break;
              case "defaultValue":
                k = V;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null)
                  throw Error(D(137, i));
                break;
              default:
                V !== $ && v(
                  t,
                  i,
                  _,
                  V,
                  r,
                  $
                );
            }
        }
        Bl(
          t,
          A,
          k,
          N,
          q,
          F,
          m,
          d
        );
        return;
      case "select":
        V = A = k = _ = null;
        for (m in s)
          if (N = s[m], s.hasOwnProperty(m) && N != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                V = N;
              default:
                r.hasOwnProperty(m) || v(
                  t,
                  i,
                  m,
                  null,
                  r,
                  N
                );
            }
        for (d in r)
          if (m = r[d], N = s[d], r.hasOwnProperty(d) && (m != null || N != null))
            switch (d) {
              case "value":
                _ = m;
                break;
              case "defaultValue":
                k = m;
                break;
              case "multiple":
                A = m;
              default:
                m !== N && v(
                  t,
                  i,
                  d,
                  m,
                  r,
                  N
                );
            }
        i = k, s = A, r = V, _ != null ? Za(t, !!s, _, !1) : !!r != !!s && (i != null ? Za(t, !!s, i, !0) : Za(t, !!s, s ? [] : "", !1));
        return;
      case "textarea":
        V = _ = null;
        for (k in s)
          if (d = s[k], s.hasOwnProperty(k) && d != null && !r.hasOwnProperty(k))
            switch (k) {
              case "value":
                break;
              case "children":
                break;
              default:
                v(t, i, k, null, r, d);
            }
        for (A in r)
          if (d = r[A], m = s[A], r.hasOwnProperty(A) && (d != null || m != null))
            switch (A) {
              case "value":
                _ = d;
                break;
              case "defaultValue":
                V = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(D(91));
                break;
              default:
                d !== m && v(t, i, A, d, r, m);
            }
        qh(t, _, V);
        return;
      case "option":
        for (var Bt in s)
          if (_ = s[Bt], s.hasOwnProperty(Bt) && _ != null && !r.hasOwnProperty(Bt))
            switch (Bt) {
              case "selected":
                t.selected = !1;
                break;
              default:
                v(
                  t,
                  i,
                  Bt,
                  null,
                  r,
                  _
                );
            }
        for (N in r)
          if (_ = r[N], V = s[N], r.hasOwnProperty(N) && _ !== V && (_ != null || V != null))
            switch (N) {
              case "selected":
                t.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                v(
                  t,
                  i,
                  N,
                  _,
                  r,
                  V
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Dt in s)
          _ = s[Dt], s.hasOwnProperty(Dt) && _ != null && !r.hasOwnProperty(Dt) && v(t, i, Dt, null, r, _);
        for (q in r)
          if (_ = r[q], V = s[q], r.hasOwnProperty(q) && _ !== V && (_ != null || V != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(D(137, i));
                break;
              default:
                v(
                  t,
                  i,
                  q,
                  _,
                  r,
                  V
                );
            }
        return;
      default:
        if (Pn(i)) {
          for (var ve in s)
            _ = s[ve], s.hasOwnProperty(ve) && _ !== void 0 && !r.hasOwnProperty(ve) && b(
              t,
              i,
              ve,
              void 0,
              r,
              _
            );
          for (F in r)
            _ = r[F], V = s[F], !r.hasOwnProperty(F) || _ === V || _ === void 0 && V === void 0 || b(
              t,
              i,
              F,
              _,
              r,
              V
            );
          return;
        }
    }
    for (var G in s)
      _ = s[G], s.hasOwnProperty(G) && _ != null && !r.hasOwnProperty(G) && v(t, i, G, null, r, _);
    for ($ in r)
      _ = r[$], V = s[$], !r.hasOwnProperty($) || _ === V || _ == null && V == null || v(t, i, $, _, r, V);
  }
  var T = null, M = null;
  function w(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function C(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function B(t, i) {
    if (t === 0)
      switch (i) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && i === "foreignObject" ? 0 : t;
  }
  function z(t, i) {
    return t === "textarea" || t === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.children == "bigint" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var R = null;
  function Y() {
    var t = window.event;
    return t && t.type === "popstate" ? t === R ? !1 : (R = t, !0) : (R = null, !1);
  }
  var H = typeof setTimeout == "function" ? setTimeout : void 0, j = typeof clearTimeout == "function" ? clearTimeout : void 0, W = typeof Promise == "function" ? Promise : void 0, tt = typeof queueMicrotask == "function" ? queueMicrotask : typeof W < "u" ? function(t) {
    return W.resolve(null).then(t).catch(it);
  } : H;
  function it(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function J(t) {
    return t === "head";
  }
  function rt(t, i) {
    var s = i, r = 0, d = 0;
    do {
      var m = s.nextSibling;
      if (t.removeChild(s), m && m.nodeType === 8)
        if (s = m.data, s === "/$") {
          if (0 < r && 8 > r) {
            s = r;
            var A = t.ownerDocument;
            if (s & 1 && Vt(A.documentElement), s & 2 && Vt(A.body), s & 4)
              for (s = A.head, Vt(s), A = s.firstChild; A; ) {
                var k = A.nextSibling, N = A.nodeName;
                A[Nn] || N === "SCRIPT" || N === "STYLE" || N === "LINK" && A.rel.toLowerCase() === "stylesheet" || s.removeChild(A), A = k;
              }
          }
          if (d === 0) {
            t.removeChild(m), Dc(i);
            return;
          }
          d--;
        } else
          s === "$" || s === "$?" || s === "$!" ? d++ : r = s.charCodeAt(0) - 48;
      else r = 0;
      s = m;
    } while (s);
    Dc(i);
  }
  function nt(t) {
    var i = t.firstChild;
    for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
      var s = i;
      switch (i = i.nextSibling, s.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          nt(s), Bn(s);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (s.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(s);
    }
  }
  function Ct(t, i, s, r) {
    for (; t.nodeType === 1; ) {
      var d = s;
      if (t.nodeName.toLowerCase() !== i.toLowerCase()) {
        if (!r && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (r) {
        if (!t[Nn])
          switch (i) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (m = t.getAttribute("rel"), m === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (m !== d.rel || t.getAttribute("href") !== (d.href == null || d.href === "" ? null : d.href) || t.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin) || t.getAttribute("title") !== (d.title == null ? null : d.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (m = t.getAttribute("src"), (m !== (d.src == null ? null : d.src) || t.getAttribute("type") !== (d.type == null ? null : d.type) || t.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin)) && m && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (i === "input" && t.type === "hidden") {
        var m = d.name == null ? null : "" + d.name;
        if (d.type === "hidden" && t.getAttribute("name") === m)
          return t;
      } else return t;
      if (t = kt(t.nextSibling), t === null) break;
    }
    return null;
  }
  function ht(t, i, s) {
    if (i === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !s || (t = kt(t.nextSibling), t === null)) return null;
    return t;
  }
  function wt(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
  }
  function Yt(t, i) {
    var s = t.ownerDocument;
    if (t.data !== "$?" || s.readyState === "complete")
      i();
    else {
      var r = function() {
        i(), s.removeEventListener("DOMContentLoaded", r);
      };
      s.addEventListener("DOMContentLoaded", r), t._reactRetry = r;
    }
  }
  function kt(t) {
    for (; t != null; t = t.nextSibling) {
      var i = t.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (i = t.data, i === "$" || i === "$!" || i === "$?" || i === "F!" || i === "F")
          break;
        if (i === "/$") return null;
      }
    }
    return t;
  }
  var jt = null;
  function $e(t) {
    t = t.previousSibling;
    for (var i = 0; t; ) {
      if (t.nodeType === 8) {
        var s = t.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (i === 0) return t;
          i--;
        } else s === "/$" && i++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Pt(t, i, s) {
    switch (i = w(s), t) {
      case "html":
        if (t = i.documentElement, !t) throw Error(D(452));
        return t;
      case "head":
        if (t = i.head, !t) throw Error(D(453));
        return t;
      case "body":
        if (t = i.body, !t) throw Error(D(454));
        return t;
      default:
        throw Error(D(451));
    }
  }
  function Vt(t) {
    for (var i = t.attributes; i.length; )
      t.removeAttributeNode(i[0]);
    Bn(t);
  }
  var Tt = /* @__PURE__ */ new Map(), At = /* @__PURE__ */ new Set();
  function Me(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var qt = ut.d;
  ut.d = {
    f: de,
    r: Pe,
    D: na,
    C: yi,
    L: Ue,
    m: Br,
    X: Ol,
    S: Qs,
    M: Hr
  };
  function de() {
    var t = qt.f(), i = ch();
    return t || i;
  }
  function Pe(t) {
    var i = zl(t);
    i !== null && i.tag === 5 && i.type === "form" ? Zd(i) : qt.r(t);
  }
  var Ci = typeof document > "u" ? null : document;
  function ji(t, i, s) {
    var r = Ci;
    if (r && typeof i == "string" && i) {
      var d = Wi(i);
      d = 'link[rel="' + t + '"][href="' + d + '"]', typeof s == "string" && (d += '[crossorigin="' + s + '"]'), At.has(d) || (At.add(d), t = { rel: t, crossOrigin: s, href: i }, r.querySelector(d) === null && (i = r.createElement("link"), S(i, "link", t), Qe(i), r.head.appendChild(i)));
    }
  }
  function na(t) {
    qt.D(t), ji("dns-prefetch", t, null);
  }
  function yi(t, i) {
    qt.C(t, i), ji("preconnect", t, i);
  }
  function Ue(t, i, s) {
    qt.L(t, i, s);
    var r = Ci;
    if (r && t && i) {
      var d = 'link[rel="preload"][as="' + Wi(i) + '"]';
      i === "image" && s && s.imageSrcSet ? (d += '[imagesrcset="' + Wi(
        s.imageSrcSet
      ) + '"]', typeof s.imageSizes == "string" && (d += '[imagesizes="' + Wi(
        s.imageSizes
      ) + '"]')) : d += '[href="' + Wi(t) + '"]';
      var m = d;
      switch (i) {
        case "style":
          m = ba(t);
          break;
        case "script":
          m = xh(t);
      }
      Tt.has(m) || (t = pt(
        {
          rel: "preload",
          href: i === "image" && s && s.imageSrcSet ? void 0 : t,
          as: i
        },
        s
      ), Tt.set(m, t), r.querySelector(d) !== null || i === "style" && r.querySelector(mn(m)) || i === "script" && r.querySelector(Ac(m)) || (i = r.createElement("link"), S(i, "link", t), Qe(i), r.head.appendChild(i)));
    }
  }
  function Br(t, i) {
    qt.m(t, i);
    var s = Ci;
    if (s && t) {
      var r = i && typeof i.as == "string" ? i.as : "script", d = 'link[rel="modulepreload"][as="' + Wi(r) + '"][href="' + Wi(t) + '"]', m = d;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = xh(t);
      }
      if (!Tt.has(m) && (t = pt({ rel: "modulepreload", href: t }, i), Tt.set(m, t), s.querySelector(d) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (s.querySelector(Ac(m)))
              return;
        }
        r = s.createElement("link"), S(r, "link", t), Qe(r), s.head.appendChild(r);
      }
    }
  }
  function Qs(t, i, s) {
    qt.S(t, i, s);
    var r = Ci;
    if (r && t) {
      var d = gs(r).hoistableStyles, m = ba(t);
      i = i || "default";
      var A = d.get(m);
      if (!A) {
        var k = { loading: 0, preload: null };
        if (A = r.querySelector(
          mn(m)
        ))
          k.loading = 5;
        else {
          t = pt(
            { rel: "stylesheet", href: t, "data-precedence": i },
            s
          ), (s = Tt.get(m)) && _p(t, s);
          var N = A = r.createElement("link");
          Qe(N), S(N, "link", t), N._p = new Promise(function(q, F) {
            N.onload = q, N.onerror = F;
          }), N.addEventListener("load", function() {
            k.loading |= 1;
          }), N.addEventListener("error", function() {
            k.loading |= 2;
          }), k.loading |= 4, Df(A, i, r);
        }
        A = {
          type: "stylesheet",
          instance: A,
          count: 1,
          state: k
        }, d.set(m, A);
      }
    }
  }
  function Ol(t, i) {
    qt.X(t, i);
    var s = Ci;
    if (s && t) {
      var r = gs(s).hoistableScripts, d = xh(t), m = r.get(d);
      m || (m = s.querySelector(Ac(d)), m || (t = pt({ src: t, async: !0 }, i), (i = Tt.get(d)) && Qp(t, i), m = s.createElement("script"), Qe(m), S(m, "link", t), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, r.set(d, m));
    }
  }
  function Hr(t, i) {
    qt.M(t, i);
    var s = Ci;
    if (s && t) {
      var r = gs(s).hoistableScripts, d = xh(t), m = r.get(d);
      m || (m = s.querySelector(Ac(d)), m || (t = pt({ src: t, async: !0, type: "module" }, i), (i = Tt.get(d)) && Qp(t, i), m = s.createElement("script"), Qe(m), S(m, "link", t), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, r.set(d, m));
    }
  }
  function ra(t, i, s, r) {
    var d = (d = ja.current) ? Me(d) : null;
    if (!d) throw Error(D(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof s.precedence == "string" && typeof s.href == "string" ? (i = ba(s.href), s = gs(
          d
        ).hoistableStyles, r = s.get(i), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, s.set(i, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (s.rel === "stylesheet" && typeof s.href == "string" && typeof s.precedence == "string") {
          t = ba(s.href);
          var m = gs(
            d
          ).hoistableStyles, A = m.get(t);
          if (A || (d = d.ownerDocument || d, A = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, m.set(t, A), (m = d.querySelector(
            mn(t)
          )) && !m._p && (A.instance = m, A.state.loading = 5), Tt.has(t) || (s = {
            rel: "preload",
            as: "style",
            href: s.href,
            crossOrigin: s.crossOrigin,
            integrity: s.integrity,
            media: s.media,
            hrefLang: s.hrefLang,
            referrerPolicy: s.referrerPolicy
          }, Tt.set(t, s), m || wm(
            d,
            t,
            s,
            A.state
          ))), i && r === null)
            throw Error(D(528, ""));
          return A;
        }
        if (i && r !== null)
          throw Error(D(529, ""));
        return null;
      case "script":
        return i = s.async, s = s.src, typeof s == "string" && i && typeof i != "function" && typeof i != "symbol" ? (i = xh(s), s = gs(
          d
        ).hoistableScripts, r = s.get(i), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, s.set(i, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(D(444, t));
    }
  }
  function ba(t) {
    return 'href="' + Wi(t) + '"';
  }
  function mn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Tg(t) {
    return pt({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function wm(t, i, s, r) {
    t.querySelector('link[rel="preload"][as="style"][' + i + "]") ? r.loading = 1 : (i = t.createElement("link"), r.preload = i, i.addEventListener("load", function() {
      return r.loading |= 1;
    }), i.addEventListener("error", function() {
      return r.loading |= 2;
    }), S(i, "link", s), Qe(i), t.head.appendChild(i));
  }
  function xh(t) {
    return '[src="' + Wi(t) + '"]';
  }
  function Ac(t) {
    return "script[async]" + t;
  }
  function Ag(t, i, s) {
    if (i.count++, i.instance === null)
      switch (i.type) {
        case "style":
          var r = t.querySelector(
            'style[data-href~="' + Wi(s.href) + '"]'
          );
          if (r)
            return i.instance = r, Qe(r), r;
          var d = pt({}, s, {
            "data-href": s.href,
            "data-precedence": s.precedence,
            href: null,
            precedence: null
          });
          return r = (t.ownerDocument || t).createElement(
            "style"
          ), Qe(r), S(r, "style", d), Df(r, s.precedence, t), i.instance = r;
        case "stylesheet":
          d = ba(s.href);
          var m = t.querySelector(
            mn(d)
          );
          if (m)
            return i.state.loading |= 4, i.instance = m, Qe(m), m;
          r = Tg(s), (d = Tt.get(d)) && _p(r, d), m = (t.ownerDocument || t).createElement("link"), Qe(m);
          var A = m;
          return A._p = new Promise(function(k, N) {
            A.onload = k, A.onerror = N;
          }), S(m, "link", r), i.state.loading |= 4, Df(m, s.precedence, t), i.instance = m;
        case "script":
          return m = xh(s.src), (d = t.querySelector(
            Ac(m)
          )) ? (i.instance = d, Qe(d), d) : (r = s, (d = Tt.get(m)) && (r = pt({}, s), Qp(r, d)), t = t.ownerDocument || t, d = t.createElement("script"), Qe(d), S(d, "link", r), t.head.appendChild(d), i.instance = d);
        case "void":
          return null;
        default:
          throw Error(D(443, i.type));
      }
    else
      i.type === "stylesheet" && (i.state.loading & 4) === 0 && (r = i.instance, i.state.loading |= 4, Df(r, s.precedence, t));
    return i.instance;
  }
  function Df(t, i, s) {
    for (var r = s.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), d = r.length ? r[r.length - 1] : null, m = d, A = 0; A < r.length; A++) {
      var k = r[A];
      if (k.dataset.precedence === i) m = k;
      else if (m !== d) break;
    }
    m ? m.parentNode.insertBefore(t, m.nextSibling) : (i = s.nodeType === 9 ? s.head : s, i.insertBefore(t, i.firstChild));
  }
  function _p(t, i) {
    t.crossOrigin == null && (t.crossOrigin = i.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = i.referrerPolicy), t.title == null && (t.title = i.title);
  }
  function Qp(t, i) {
    t.crossOrigin == null && (t.crossOrigin = i.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = i.referrerPolicy), t.integrity == null && (t.integrity = i.integrity);
  }
  var Lf = null;
  function Og(t, i, s) {
    if (Lf === null) {
      var r = /* @__PURE__ */ new Map(), d = Lf = /* @__PURE__ */ new Map();
      d.set(s, r);
    } else
      d = Lf, r = d.get(s), r || (r = /* @__PURE__ */ new Map(), d.set(s, r));
    if (r.has(t)) return r;
    for (r.set(t, null), s = s.getElementsByTagName(t), d = 0; d < s.length; d++) {
      var m = s[d];
      if (!(m[Nn] || m[li] || t === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var A = m.getAttribute(i) || "";
        A = t + A;
        var k = r.get(A);
        k ? k.push(m) : r.set(A, [m]);
      }
    }
    return r;
  }
  function Eg(t, i, s) {
    t = t.ownerDocument || t, t.head.insertBefore(
      s,
      i === "title" ? t.querySelector("head > title") : null
    );
  }
  function Cm(t, i, s) {
    if (s === 1 || i.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof i.precedence != "string" || typeof i.href != "string" || i.href === "")
          break;
        return !0;
      case "link":
        if (typeof i.rel != "string" || typeof i.href != "string" || i.href === "" || i.onLoad || i.onError)
          break;
        switch (i.rel) {
          case "stylesheet":
            return t = i.disabled, typeof i.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (i.async && typeof i.async != "function" && typeof i.async != "symbol" && !i.onLoad && !i.onError && i.src && typeof i.src == "string")
          return !0;
    }
    return !1;
  }
  function wg(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var Oc = null;
  function km() {
  }
  function Dm(t, i, s) {
    if (Oc === null) throw Error(D(475));
    var r = Oc;
    if (i.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var d = ba(s.href), m = t.querySelector(
          mn(d)
        );
        if (m) {
          t = m._p, t !== null && typeof t == "object" && typeof t.then == "function" && (r.count++, r = zf.bind(r), t.then(r, r)), i.state.loading |= 4, i.instance = m, Qe(m);
          return;
        }
        m = t.ownerDocument || t, s = Tg(s), (d = Tt.get(d)) && _p(s, d), m = m.createElement("link"), Qe(m);
        var A = m;
        A._p = new Promise(function(k, N) {
          A.onload = k, A.onerror = N;
        }), S(m, "link", s), i.instance = m;
      }
      r.stylesheets === null && (r.stylesheets = /* @__PURE__ */ new Map()), r.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (r.count++, i = zf.bind(r), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  function Lm() {
    if (Oc === null) throw Error(D(475));
    var t = Oc;
    return t.stylesheets && t.count === 0 && Zp(t, t.stylesheets), 0 < t.count ? function(i) {
      var s = setTimeout(function() {
        if (t.stylesheets && Zp(t, t.stylesheets), t.unsuspend) {
          var r = t.unsuspend;
          t.unsuspend = null, r();
        }
      }, 6e4);
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(s);
      };
    } : null;
  }
  function zf() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Zp(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Rf = null;
  function Zp(t, i) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Rf = /* @__PURE__ */ new Map(), i.forEach(zm, t), Rf = null, zf.call(t));
  }
  function zm(t, i) {
    if (!(i.state.loading & 4)) {
      var s = Rf.get(t);
      if (s) var r = s.get(null);
      else {
        s = /* @__PURE__ */ new Map(), Rf.set(t, s);
        for (var d = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < d.length; m++) {
          var A = d[m];
          (A.nodeName === "LINK" || A.getAttribute("media") !== "not all") && (s.set(A.dataset.precedence, A), r = A);
        }
        r && s.set(null, r);
      }
      d = i.instance, A = d.getAttribute("data-precedence"), m = s.get(A) || r, m === r && s.set(null, d), s.set(A, d), this.count++, r = zf.bind(this), d.addEventListener("load", r), d.addEventListener("error", r), m ? m.parentNode.insertBefore(d, m.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(d, t.firstChild)), i.state.loading |= 4;
    }
  }
  var Ec = {
    $$typeof: mt,
    Provider: null,
    Consumer: null,
    _currentValue: Rt,
    _currentValue2: Rt,
    _threadCount: 0
  };
  function Rm(t, i, s, r, d, m, A, k) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Gh(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Gh(0), this.hiddenUpdates = Gh(null), this.identifierPrefix = r, this.onUncaughtError = d, this.onCaughtError = m, this.onRecoverableError = A, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = k, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Cg(t, i, s, r, d, m, A, k, N, q, F, $) {
    return t = new Rm(
      t,
      i,
      s,
      A,
      k,
      N,
      q,
      $
    ), i = 1, m === !0 && (i |= 24), m = bi(3, null, null, i), t.current = m, m.stateNode = t, i = gu(), i.refCount++, t.pooledCache = i, i.refCount++, m.memoizedState = {
      element: r,
      isDehydrated: s,
      cache: i
    }, bu(m), t;
  }
  function kg(t) {
    return t ? (t = Wl, t) : Wl;
  }
  function Dg(t, i, s, r, d, m) {
    d = kg(d), r.context === null ? r.context = d : r.pendingContext = d, r = Es(i), r.payload = { element: s }, m = m === void 0 ? null : m, m !== null && (r.callback = m), s = ws(t, r, i), s !== null && (ci(s, t, i), Cs(s, t, i));
  }
  function Lg(t, i) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var s = t.retryLane;
      t.retryLane = s !== 0 && s < i ? s : i;
    }
  }
  function Vp(t, i) {
    Lg(t, i), (t = t.alternate) && Lg(t, i);
  }
  function zg(t) {
    if (t.tag === 13) {
      var i = rl(t, 67108864);
      i !== null && ci(i, t, 67108864), Vp(t, 67108864);
    }
  }
  var Nf = !0;
  function Nm(t, i, s, r) {
    var d = K.T;
    K.T = null;
    var m = ut.p;
    try {
      ut.p = 2, Wp(t, i, s, r);
    } finally {
      ut.p = m, K.T = d;
    }
  }
  function Bm(t, i, s, r) {
    var d = K.T;
    K.T = null;
    var m = ut.p;
    try {
      ut.p = 8, Wp(t, i, s, r);
    } finally {
      ut.p = m, K.T = d;
    }
  }
  function Wp(t, i, s, r) {
    if (Nf) {
      var d = Kp(r);
      if (d === null)
        a(
          t,
          i,
          r,
          Bf,
          s
        ), Ng(t, r);
      else if (Um(
        d,
        t,
        i,
        s,
        r
      ))
        r.stopPropagation();
      else if (Ng(t, r), i & 4 && -1 < Hm.indexOf(t)) {
        for (; d !== null; ) {
          var m = zl(d);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var A = Fs(m.pendingLanes);
                  if (A !== 0) {
                    var k = m;
                    for (k.pendingLanes |= 2, k.entangledLanes |= 2; A; ) {
                      var N = 1 << 31 - Li(A);
                      k.entanglements[1] |= N, A &= ~N;
                    }
                    va(m), (re & 6) === 0 && (rh = ua() + 500, zr(0));
                  }
                }
                break;
              case 13:
                k = rl(m, 2), k !== null && ci(k, m, 2), ch(), Vp(m, 2);
            }
          if (m = Kp(r), m === null && a(
            t,
            i,
            r,
            Bf,
            s
          ), m === d) break;
          d = m;
        }
        d !== null && r.stopPropagation();
      } else
        a(
          t,
          i,
          r,
          null,
          s
        );
    }
  }
  function Kp(t) {
    return t = oo(t), Fp(t);
  }
  var Bf = null;
  function Fp(t) {
    if (Bf = null, t = Is(t), t !== null) {
      var i = et(t);
      if (i === null) t = null;
      else {
        var s = i.tag;
        if (s === 13) {
          if (t = at(i), t !== null) return t;
          t = null;
        } else if (s === 3) {
          if (i.stateNode.current.memoizedState.isDehydrated)
            return i.tag === 3 ? i.stateNode.containerInfo : null;
          t = null;
        } else i !== t && (t = null);
      }
    }
    return Bf = t, null;
  }
  function Rg(t) {
    switch (t) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Uh()) {
          case Xh:
            return 2;
          case Fr:
            return 8;
          case ds:
          case Ff:
            return 32;
          case Pc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ip = !1, yn = null, vn = null, bn = null, wc = /* @__PURE__ */ new Map(), Cc = /* @__PURE__ */ new Map(), xn = [], Hm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Ng(t, i) {
    switch (t) {
      case "focusin":
      case "focusout":
        yn = null;
        break;
      case "dragenter":
      case "dragleave":
        vn = null;
        break;
      case "mouseover":
      case "mouseout":
        bn = null;
        break;
      case "pointerover":
      case "pointerout":
        wc.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cc.delete(i.pointerId);
    }
  }
  function kc(t, i, s, r, d, m) {
    return t === null || t.nativeEvent !== m ? (t = {
      blockedOn: i,
      domEventName: s,
      eventSystemFlags: r,
      nativeEvent: m,
      targetContainers: [d]
    }, i !== null && (i = zl(i), i !== null && zg(i)), t) : (t.eventSystemFlags |= r, i = t.targetContainers, d !== null && i.indexOf(d) === -1 && i.push(d), t);
  }
  function Um(t, i, s, r, d) {
    switch (i) {
      case "focusin":
        return yn = kc(
          yn,
          t,
          i,
          s,
          r,
          d
        ), !0;
      case "dragenter":
        return vn = kc(
          vn,
          t,
          i,
          s,
          r,
          d
        ), !0;
      case "mouseover":
        return bn = kc(
          bn,
          t,
          i,
          s,
          r,
          d
        ), !0;
      case "pointerover":
        var m = d.pointerId;
        return wc.set(
          m,
          kc(
            wc.get(m) || null,
            t,
            i,
            s,
            r,
            d
          )
        ), !0;
      case "gotpointercapture":
        return m = d.pointerId, Cc.set(
          m,
          kc(
            Cc.get(m) || null,
            t,
            i,
            s,
            r,
            d
          )
        ), !0;
    }
    return !1;
  }
  function Bg(t) {
    var i = Is(t.target);
    if (i !== null) {
      var s = et(i);
      if (s !== null) {
        if (i = s.tag, i === 13) {
          if (i = at(s), i !== null) {
            t.blockedOn = i, Oe(t.priority, function() {
              if (s.tag === 13) {
                var r = Yi();
                r = $r(r);
                var d = rl(s, r);
                d !== null && ci(d, s, r), Vp(s, r);
              }
            });
            return;
          }
        } else if (i === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Hf(t) {
    if (t.blockedOn !== null) return !1;
    for (var i = t.targetContainers; 0 < i.length; ) {
      var s = Kp(t.nativeEvent);
      if (s === null) {
        s = t.nativeEvent;
        var r = new s.constructor(
          s.type,
          s
        );
        ro = r, s.target.dispatchEvent(r), ro = null;
      } else
        return i = zl(s), i !== null && zg(i), t.blockedOn = s, !1;
      i.shift();
    }
    return !0;
  }
  function Hg(t, i, s) {
    Hf(t) && s.delete(i);
  }
  function Xm() {
    Ip = !1, yn !== null && Hf(yn) && (yn = null), vn !== null && Hf(vn) && (vn = null), bn !== null && Hf(bn) && (bn = null), wc.forEach(Hg), Cc.forEach(Hg);
  }
  function Uf(t, i) {
    t.blockedOn === i && (t.blockedOn = null, Ip || (Ip = !0, O.unstable_scheduleCallback(
      O.unstable_NormalPriority,
      Xm
    )));
  }
  var Xf = null;
  function Ug(t) {
    Xf !== t && (Xf = t, O.unstable_scheduleCallback(
      O.unstable_NormalPriority,
      function() {
        Xf === t && (Xf = null);
        for (var i = 0; i < t.length; i += 3) {
          var s = t[i], r = t[i + 1], d = t[i + 2];
          if (typeof r != "function") {
            if (Fp(r || s) === null)
              continue;
            break;
          }
          var m = zl(s);
          m !== null && (t.splice(i, 3), i -= 3, Hi(
            m,
            {
              pending: !0,
              data: d,
              method: s.method,
              action: r
            },
            r,
            d
          ));
        }
      }
    ));
  }
  function Dc(t) {
    function i(N) {
      return Uf(N, t);
    }
    yn !== null && Uf(yn, t), vn !== null && Uf(vn, t), bn !== null && Uf(bn, t), wc.forEach(i), Cc.forEach(i);
    for (var s = 0; s < xn.length; s++) {
      var r = xn[s];
      r.blockedOn === t && (r.blockedOn = null);
    }
    for (; 0 < xn.length && (s = xn[0], s.blockedOn === null); )
      Bg(s), s.blockedOn === null && xn.shift();
    if (s = (t.ownerDocument || t).$$reactFormReplay, s != null)
      for (r = 0; r < s.length; r += 3) {
        var d = s[r], m = s[r + 1], A = d[ni] || null;
        if (typeof m == "function")
          A || Ug(s);
        else if (A) {
          var k = null;
          if (m && m.hasAttribute("formAction")) {
            if (d = m, A = m[ni] || null)
              k = A.formAction;
            else if (Fp(d) !== null) continue;
          } else k = A.action;
          typeof k == "function" ? s[r + 1] = k : (s.splice(r, 3), r -= 3), Ug(s);
        }
      }
  }
  function Jp(t) {
    this._internalRoot = t;
  }
  Gf.prototype.render = Jp.prototype.render = function(t) {
    var i = this._internalRoot;
    if (i === null) throw Error(D(409));
    var s = i.current, r = Yi();
    Dg(s, r, t, i, null, null);
  }, Gf.prototype.unmount = Jp.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var i = t.containerInfo;
      Dg(t.current, 2, null, t, null, null), ch(), i[Ll] = null;
    }
  };
  function Gf(t) {
    this._internalRoot = t;
  }
  Gf.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var i = eo();
      t = { blockedOn: null, target: t, priority: i };
      for (var s = 0; s < xn.length && i !== 0 && i < xn[s].priority; s++) ;
      xn.splice(s, 0, t), s === 0 && Bg(t);
    }
  };
  var Xg = x.version;
  if (Xg !== "19.1.0")
    throw Error(
      D(
        527,
        Xg,
        "19.1.0"
      )
    );
  ut.findDOMNode = function(t) {
    var i = t._reactInternals;
    if (i === void 0)
      throw typeof t.render == "function" ? Error(D(188)) : (t = Object.keys(t).join(","), Error(D(268, t)));
    return t = ct(i), t = t !== null ? Ot(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Gm = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: K,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Yf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Yf.isDisabled && Yf.supportsFiber)
      try {
        Ks = Yf.inject(
          Gm
        ), Di = Yf;
      } catch {
      }
  }
  return Lc.createRoot = function(t, i) {
    if (!Q(t)) throw Error(D(299));
    var s = !1, r = "", d = as, m = ju, A = Jd, k = null;
    return i != null && (i.unstable_strictMode === !0 && (s = !0), i.identifierPrefix !== void 0 && (r = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (m = i.onCaughtError), i.onRecoverableError !== void 0 && (A = i.onRecoverableError), i.unstable_transitionCallbacks !== void 0 && (k = i.unstable_transitionCallbacks)), i = Cg(
      t,
      1,
      !1,
      null,
      null,
      s,
      r,
      d,
      m,
      A,
      k,
      null
    ), t[Ll] = i.current, p(t), new Jp(i);
  }, Lc.hydrateRoot = function(t, i, s) {
    if (!Q(t)) throw Error(D(299));
    var r = !1, d = "", m = as, A = ju, k = Jd, N = null, q = null;
    return s != null && (s.unstable_strictMode === !0 && (r = !0), s.identifierPrefix !== void 0 && (d = s.identifierPrefix), s.onUncaughtError !== void 0 && (m = s.onUncaughtError), s.onCaughtError !== void 0 && (A = s.onCaughtError), s.onRecoverableError !== void 0 && (k = s.onRecoverableError), s.unstable_transitionCallbacks !== void 0 && (N = s.unstable_transitionCallbacks), s.formState !== void 0 && (q = s.formState)), i = Cg(
      t,
      1,
      !0,
      i,
      s ?? null,
      r,
      d,
      m,
      A,
      k,
      N,
      q
    ), i.context = kg(null), s = i.current, r = Yi(), r = $r(r), d = Es(r), d.callback = null, ws(s, d, r), s = r, i.current.lanes = s, qa(i, s), va(i), t[Ll] = i.current, p(t), new Gf(i);
  }, Lc.version = "19.1.0", Lc;
}
var qg;
function Qm() {
  if (qg) return tg.exports;
  qg = 1;
  function O() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(O);
      } catch (x) {
        console.error(x);
      }
  }
  return O(), tg.exports = _m(), tg.exports;
}
var Zm = Qm(), Vm = Object.defineProperty, Wm = (O, x, L) => x in O ? Vm(O, x, { enumerable: !0, configurable: !0, writable: !0, value: L }) : O[x] = L, Pf = (O, x, L) => Wm(O, typeof x != "symbol" ? x + "" : x, L);
const Km = {
  stringify: (O) => O ? "true" : "false",
  parse: (O) => /^[ty1-9]/i.test(O)
}, Fm = {
  stringify: (O) => O.name,
  parse: (O, x, L) => {
    const D = (() => {
      if (typeof window < "u" && O in window)
        return window[O];
      if (typeof global < "u" && O in global)
        return global[O];
    })();
    return typeof D == "function" ? D.bind(L) : void 0;
  }
}, Im = {
  stringify: (O) => JSON.stringify(O),
  parse: (O) => JSON.parse(O)
}, Jm = {
  stringify: (O) => `${O}`,
  parse: (O) => parseFloat(O)
}, $m = {
  stringify: (O) => O,
  parse: (O) => O
}, ag = {
  string: $m,
  number: Jm,
  boolean: Km,
  function: Fm,
  json: Im
};
function ty(O) {
  return O.replace(
    /([a-z0-9])([A-Z])/g,
    (x, L, D) => `${L}-${D.toLowerCase()}`
  );
}
const qf = Symbol.for("r2wc.render"), _f = Symbol.for("r2wc.connected"), Ur = Symbol.for("r2wc.context"), El = Symbol.for("r2wc.props");
function ey(O, x, L) {
  var D, Q, et;
  x.props || (x.props = O.propTypes ? Object.keys(O.propTypes) : []), x.events || (x.events = []);
  const at = Array.isArray(x.props) ? x.props.slice() : Object.keys(x.props), lt = Array.isArray(x.events) ? x.events.slice() : Object.keys(x.events), ct = {}, Ot = {}, pt = {}, ot = {};
  for (const dt of at) {
    ct[dt] = Array.isArray(x.props) ? "string" : x.props[dt];
    const ft = ty(dt);
    pt[dt] = ft, ot[ft] = dt;
  }
  for (const dt of lt)
    Ot[dt] = Array.isArray(x.events) ? {} : x.events[dt];
  class yt extends HTMLElement {
    constructor() {
      super(), Pf(this, et, !0), Pf(this, Q), Pf(this, D, {}), Pf(this, "container"), x.shadow ? this.container = this.attachShadow({
        mode: x.shadow
      }) : this.container = this, this[El].container = this.container;
      for (const ft of at) {
        const St = pt[ft], xt = this.getAttribute(St), Xt = ct[ft], st = Xt ? ag[Xt] : null;
        st != null && st.parse && xt && (this[El][ft] = st.parse(xt, St, this));
      }
      for (const ft of lt)
        this[El][ft] = (St) => {
          const xt = ft.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(xt, { detail: St, ...Ot[ft] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(ot);
    }
    connectedCallback() {
      this[_f] = !0, this[qf]();
    }
    disconnectedCallback() {
      this[_f] = !1, this[Ur] && L.unmount(this[Ur]), delete this[Ur];
    }
    attributeChangedCallback(ft, St, xt) {
      const Xt = ot[ft], st = ct[Xt], mt = st ? ag[st] : null;
      Xt in ct && mt != null && mt.parse && xt && (this[El][Xt] = mt.parse(xt, ft, this), this[qf]());
    }
    [(et = _f, Q = Ur, D = El, qf)]() {
      this[_f] && (this[Ur] ? L.update(this[Ur], this[El]) : this[Ur] = L.mount(
        this.container,
        O,
        this[El]
      ));
    }
  }
  for (const dt of at) {
    const ft = pt[dt], St = ct[dt];
    Object.defineProperty(yt.prototype, dt, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[El][dt];
      },
      set(xt) {
        this[El][dt] = xt;
        const Xt = St ? ag[St] : null;
        if (Xt != null && Xt.stringify) {
          const st = Xt.stringify(xt, ft, this);
          this.getAttribute(ft) !== st && this.setAttribute(ft, st);
        } else
          this[qf]();
      }
    });
  }
  return yt;
}
function iy(O, x, L) {
  const D = Zm.createRoot(O), Q = Kf.createElement(x, L);
  return D.render(Q), {
    root: D,
    ReactComponent: x
  };
}
function ay({ root: O, ReactComponent: x }, L) {
  const D = Kf.createElement(x, L);
  O.render(D);
}
function sy({ root: O }) {
  O.unmount();
}
function ly(O, x = {}) {
  return ey(O, x, { mount: iy, update: ay, unmount: sy });
}
var sg = { exports: {} }, zc = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _g;
function ny() {
  if (_g) return zc;
  _g = 1;
  var O = Symbol.for("react.transitional.element"), x = Symbol.for("react.fragment");
  function L(D, Q, et) {
    var at = null;
    if (et !== void 0 && (at = "" + et), Q.key !== void 0 && (at = "" + Q.key), "key" in Q) {
      et = {};
      for (var lt in Q)
        lt !== "key" && (et[lt] = Q[lt]);
    } else et = Q;
    return Q = et.ref, {
      $$typeof: O,
      type: D,
      key: at,
      ref: Q !== void 0 ? Q : null,
      props: et
    };
  }
  return zc.Fragment = x, zc.jsx = L, zc.jsxs = L, zc;
}
var Qg;
function ry() {
  return Qg || (Qg = 1, sg.exports = ny()), sg.exports;
}
var ha = ry();
const oy = async (O) => {
  const x = await fetch(O);
  if (!x.ok)
    throw new Error(`HTTP error! status: ${x.status}`);
  return await x.json();
}, hy = "https://3792f998-96be-4327-8204-4d908ecf4e19.mock.pstmn.io", uy = async () => await oy(`${hy}/site-overview`);
var Yc = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(O) {
    return this.listeners.add(O), this.onSubscribe(), () => {
      this.listeners.delete(O), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Zr = typeof window > "u" || "Deno" in globalThis;
function Xa() {
}
function cy(O, x) {
  return typeof O == "function" ? O(x) : O;
}
function ng(O) {
  return typeof O == "number" && O >= 0 && O !== 1 / 0;
}
function mm(O, x) {
  return Math.max(O + (x || 0) - Date.now(), 0);
}
function Sh(O, x) {
  return typeof O == "function" ? O(x) : O;
}
function cs(O, x) {
  return typeof O == "function" ? O(x) : O;
}
function Zg(O, x) {
  const {
    type: L = "all",
    exact: D,
    fetchStatus: Q,
    predicate: et,
    queryKey: at,
    stale: lt
  } = O;
  if (at) {
    if (D) {
      if (x.queryHash !== bg(at, x.options))
        return !1;
    } else if (!Bc(x.queryKey, at))
      return !1;
  }
  if (L !== "all") {
    const ct = x.isActive();
    if (L === "active" && !ct || L === "inactive" && ct)
      return !1;
  }
  return !(typeof lt == "boolean" && x.isStale() !== lt || Q && Q !== x.state.fetchStatus || et && !et(x));
}
function Vg(O, x) {
  const { exact: L, status: D, predicate: Q, mutationKey: et } = O;
  if (et) {
    if (!x.options.mutationKey)
      return !1;
    if (L) {
      if (Nc(x.options.mutationKey) !== Nc(et))
        return !1;
    } else if (!Bc(x.options.mutationKey, et))
      return !1;
  }
  return !(D && x.state.status !== D || Q && !Q(x));
}
function bg(O, x) {
  return ((x == null ? void 0 : x.queryKeyHashFn) || Nc)(O);
}
function Nc(O) {
  return JSON.stringify(
    O,
    (x, L) => og(L) ? Object.keys(L).sort().reduce((D, Q) => (D[Q] = L[Q], D), {}) : L
  );
}
function Bc(O, x) {
  return O === x ? !0 : typeof O != typeof x ? !1 : O && x && typeof O == "object" && typeof x == "object" ? Object.keys(x).every((L) => Bc(O[L], x[L])) : !1;
}
function ym(O, x) {
  if (O === x)
    return O;
  const L = Wg(O) && Wg(x);
  if (L || og(O) && og(x)) {
    const D = L ? O : Object.keys(O), Q = D.length, et = L ? x : Object.keys(x), at = et.length, lt = L ? [] : {};
    let ct = 0;
    for (let Ot = 0; Ot < at; Ot++) {
      const pt = L ? Ot : et[Ot];
      (!L && D.includes(pt) || L) && O[pt] === void 0 && x[pt] === void 0 ? (lt[pt] = void 0, ct++) : (lt[pt] = ym(O[pt], x[pt]), lt[pt] === O[pt] && O[pt] !== void 0 && ct++);
    }
    return Q === at && ct === Q ? O : lt;
  }
  return x;
}
function rg(O, x) {
  if (!x || Object.keys(O).length !== Object.keys(x).length)
    return !1;
  for (const L in O)
    if (O[L] !== x[L])
      return !1;
  return !0;
}
function Wg(O) {
  return Array.isArray(O) && O.length === Object.keys(O).length;
}
function og(O) {
  if (!Kg(O))
    return !1;
  const x = O.constructor;
  if (x === void 0)
    return !0;
  const L = x.prototype;
  return !(!Kg(L) || !L.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(O) !== Object.prototype);
}
function Kg(O) {
  return Object.prototype.toString.call(O) === "[object Object]";
}
function dy(O) {
  return new Promise((x) => {
    setTimeout(x, O);
  });
}
function hg(O, x, L) {
  return typeof L.structuralSharing == "function" ? L.structuralSharing(O, x) : L.structuralSharing !== !1 ? ym(O, x) : x;
}
function fy(O, x, L = 0) {
  const D = [...O, x];
  return L && D.length > L ? D.slice(1) : D;
}
function py(O, x, L = 0) {
  const D = [x, ...O];
  return L && D.length > L ? D.slice(0, -1) : D;
}
var xg = Symbol();
function vm(O, x) {
  return !O.queryFn && (x != null && x.initialPromise) ? () => x.initialPromise : !O.queryFn || O.queryFn === xg ? () => Promise.reject(new Error(`Missing queryFn: '${O.queryHash}'`)) : O.queryFn;
}
var Xr, Tn, Mh, nm, gy = (nm = class extends Yc {
  constructor() {
    super();
    Ht(this, Xr);
    Ht(this, Tn);
    Ht(this, Mh);
    bt(this, Mh, (x) => {
      if (!Zr && window.addEventListener) {
        const L = () => x();
        return window.addEventListener("visibilitychange", L, !1), () => {
          window.removeEventListener("visibilitychange", L);
        };
      }
    });
  }
  onSubscribe() {
    X(this, Tn) || this.setEventListener(X(this, Mh));
  }
  onUnsubscribe() {
    var x;
    this.hasListeners() || ((x = X(this, Tn)) == null || x.call(this), bt(this, Tn, void 0));
  }
  setEventListener(x) {
    var L;
    bt(this, Mh, x), (L = X(this, Tn)) == null || L.call(this), bt(this, Tn, x((D) => {
      typeof D == "boolean" ? this.setFocused(D) : this.onFocus();
    }));
  }
  setFocused(x) {
    X(this, Xr) !== x && (bt(this, Xr, x), this.onFocus());
  }
  onFocus() {
    const x = this.isFocused();
    this.listeners.forEach((L) => {
      L(x);
    });
  }
  isFocused() {
    var x;
    return typeof X(this, Xr) == "boolean" ? X(this, Xr) : ((x = globalThis.document) == null ? void 0 : x.visibilityState) !== "hidden";
  }
}, Xr = new WeakMap(), Tn = new WeakMap(), Mh = new WeakMap(), nm), Sg = new gy(), Th, An, Ah, rm, my = (rm = class extends Yc {
  constructor() {
    super();
    Ht(this, Th, !0);
    Ht(this, An);
    Ht(this, Ah);
    bt(this, Ah, (x) => {
      if (!Zr && window.addEventListener) {
        const L = () => x(!0), D = () => x(!1);
        return window.addEventListener("online", L, !1), window.addEventListener("offline", D, !1), () => {
          window.removeEventListener("online", L), window.removeEventListener("offline", D);
        };
      }
    });
  }
  onSubscribe() {
    X(this, An) || this.setEventListener(X(this, Ah));
  }
  onUnsubscribe() {
    var x;
    this.hasListeners() || ((x = X(this, An)) == null || x.call(this), bt(this, An, void 0));
  }
  setEventListener(x) {
    var L;
    bt(this, Ah, x), (L = X(this, An)) == null || L.call(this), bt(this, An, x(this.setOnline.bind(this)));
  }
  setOnline(x) {
    X(this, Th) !== x && (bt(this, Th, x), this.listeners.forEach((D) => {
      D(x);
    }));
  }
  isOnline() {
    return X(this, Th);
  }
}, Th = new WeakMap(), An = new WeakMap(), Ah = new WeakMap(), rm), Wf = new my();
function ug() {
  let O, x;
  const L = new Promise((Q, et) => {
    O = Q, x = et;
  });
  L.status = "pending", L.catch(() => {
  });
  function D(Q) {
    Object.assign(L, Q), delete L.resolve, delete L.reject;
  }
  return L.resolve = (Q) => {
    D({
      status: "fulfilled",
      value: Q
    }), O(Q);
  }, L.reject = (Q) => {
    D({
      status: "rejected",
      reason: Q
    }), x(Q);
  }, L;
}
function yy(O) {
  return Math.min(1e3 * 2 ** O, 3e4);
}
function bm(O) {
  return (O ?? "online") === "online" ? Wf.isOnline() : !0;
}
var xm = class extends Error {
  constructor(O) {
    super("CancelledError"), this.revert = O == null ? void 0 : O.revert, this.silent = O == null ? void 0 : O.silent;
  }
};
function lg(O) {
  return O instanceof xm;
}
function Sm(O) {
  let x = !1, L = 0, D = !1, Q;
  const et = ug(), at = (St) => {
    var xt;
    D || (yt(new xm(St)), (xt = O.abort) == null || xt.call(O));
  }, lt = () => {
    x = !0;
  }, ct = () => {
    x = !1;
  }, Ot = () => Sg.isFocused() && (O.networkMode === "always" || Wf.isOnline()) && O.canRun(), pt = () => bm(O.networkMode) && O.canRun(), ot = (St) => {
    var xt;
    D || (D = !0, (xt = O.onSuccess) == null || xt.call(O, St), Q == null || Q(), et.resolve(St));
  }, yt = (St) => {
    var xt;
    D || (D = !0, (xt = O.onError) == null || xt.call(O, St), Q == null || Q(), et.reject(St));
  }, dt = () => new Promise((St) => {
    var xt;
    Q = (Xt) => {
      (D || Ot()) && St(Xt);
    }, (xt = O.onPause) == null || xt.call(O);
  }).then(() => {
    var St;
    Q = void 0, D || (St = O.onContinue) == null || St.call(O);
  }), ft = () => {
    if (D)
      return;
    let St;
    const xt = L === 0 ? O.initialPromise : void 0;
    try {
      St = xt ?? O.fn();
    } catch (Xt) {
      St = Promise.reject(Xt);
    }
    Promise.resolve(St).then(ot).catch((Xt) => {
      var te;
      if (D)
        return;
      const st = O.retry ?? (Zr ? 0 : 3), mt = O.retryDelay ?? yy, Lt = typeof mt == "function" ? mt(L, Xt) : mt, _t = st === !0 || typeof st == "number" && L < st || typeof st == "function" && st(L, Xt);
      if (x || !_t) {
        yt(Xt);
        return;
      }
      L++, (te = O.onFail) == null || te.call(O, L, Xt), dy(Lt).then(() => Ot() ? void 0 : dt()).then(() => {
        x ? yt(Xt) : ft();
      });
    });
  };
  return {
    promise: et,
    cancel: at,
    continue: () => (Q == null || Q(), et),
    cancelRetry: lt,
    continueRetry: ct,
    canStart: pt,
    start: () => (pt() ? ft() : dt().then(ft), et)
  };
}
var vy = (O) => setTimeout(O, 0);
function by() {
  let O = [], x = 0, L = (lt) => {
    lt();
  }, D = (lt) => {
    lt();
  }, Q = vy;
  const et = (lt) => {
    x ? O.push(lt) : Q(() => {
      L(lt);
    });
  }, at = () => {
    const lt = O;
    O = [], lt.length && Q(() => {
      D(() => {
        lt.forEach((ct) => {
          L(ct);
        });
      });
    });
  };
  return {
    batch: (lt) => {
      let ct;
      x++;
      try {
        ct = lt();
      } finally {
        x--, x || at();
      }
      return ct;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (lt) => (...ct) => {
      et(() => {
        lt(...ct);
      });
    },
    schedule: et,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (lt) => {
      L = lt;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (lt) => {
      D = lt;
    },
    setScheduler: (lt) => {
      Q = lt;
    }
  };
}
var vi = by(), Gr, om, Mm = (om = class {
  constructor() {
    Ht(this, Gr);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), ng(this.gcTime) && bt(this, Gr, setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(O) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      O ?? (Zr ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    X(this, Gr) && (clearTimeout(X(this, Gr)), bt(this, Gr, void 0));
  }
}, Gr = new WeakMap(), om), Oh, Eh, Ua, Yr, ki, Hc, jr, hs, wl, hm, xy = (hm = class extends Mm {
  constructor(x) {
    super();
    Ht(this, hs);
    Ht(this, Oh);
    Ht(this, Eh);
    Ht(this, Ua);
    Ht(this, Yr);
    Ht(this, ki);
    Ht(this, Hc);
    Ht(this, jr);
    bt(this, jr, !1), bt(this, Hc, x.defaultOptions), this.setOptions(x.options), this.observers = [], bt(this, Yr, x.client), bt(this, Ua, X(this, Yr).getQueryCache()), this.queryKey = x.queryKey, this.queryHash = x.queryHash, bt(this, Oh, Sy(this.options)), this.state = x.state ?? X(this, Oh), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var x;
    return (x = X(this, ki)) == null ? void 0 : x.promise;
  }
  setOptions(x) {
    this.options = { ...X(this, Hc), ...x }, this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && X(this, Ua).remove(this);
  }
  setData(x, L) {
    const D = hg(this.state.data, x, this.options);
    return It(this, hs, wl).call(this, {
      data: D,
      type: "success",
      dataUpdatedAt: L == null ? void 0 : L.updatedAt,
      manual: L == null ? void 0 : L.manual
    }), D;
  }
  setState(x, L) {
    It(this, hs, wl).call(this, { type: "setState", state: x, setStateOptions: L });
  }
  cancel(x) {
    var D, Q;
    const L = (D = X(this, ki)) == null ? void 0 : D.promise;
    return (Q = X(this, ki)) == null || Q.cancel(x), L ? L.then(Xa).catch(Xa) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(X(this, Oh));
  }
  isActive() {
    return this.observers.some(
      (x) => cs(x.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === xg || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStale() {
    return this.state.isInvalidated ? !0 : this.getObserversCount() > 0 ? this.observers.some(
      (x) => x.getCurrentResult().isStale
    ) : this.state.data === void 0;
  }
  isStaleByTime(x = 0) {
    return this.state.isInvalidated || this.state.data === void 0 || !mm(this.state.dataUpdatedAt, x);
  }
  onFocus() {
    var L;
    const x = this.observers.find((D) => D.shouldFetchOnWindowFocus());
    x == null || x.refetch({ cancelRefetch: !1 }), (L = X(this, ki)) == null || L.continue();
  }
  onOnline() {
    var L;
    const x = this.observers.find((D) => D.shouldFetchOnReconnect());
    x == null || x.refetch({ cancelRefetch: !1 }), (L = X(this, ki)) == null || L.continue();
  }
  addObserver(x) {
    this.observers.includes(x) || (this.observers.push(x), this.clearGcTimeout(), X(this, Ua).notify({ type: "observerAdded", query: this, observer: x }));
  }
  removeObserver(x) {
    this.observers.includes(x) && (this.observers = this.observers.filter((L) => L !== x), this.observers.length || (X(this, ki) && (X(this, jr) ? X(this, ki).cancel({ revert: !0 }) : X(this, ki).cancelRetry()), this.scheduleGc()), X(this, Ua).notify({ type: "observerRemoved", query: this, observer: x }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || It(this, hs, wl).call(this, { type: "invalidate" });
  }
  fetch(x, L) {
    var ct, Ot, pt;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && (L != null && L.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (X(this, ki))
        return X(this, ki).continueRetry(), X(this, ki).promise;
    }
    if (x && this.setOptions(x), !this.options.queryFn) {
      const ot = this.observers.find((yt) => yt.options.queryFn);
      ot && this.setOptions(ot.options);
    }
    const D = new AbortController(), Q = (ot) => {
      Object.defineProperty(ot, "signal", {
        enumerable: !0,
        get: () => (bt(this, jr, !0), D.signal)
      });
    }, et = () => {
      const ot = vm(this.options, L), yt = {
        client: X(this, Yr),
        queryKey: this.queryKey,
        meta: this.meta
      };
      return Q(yt), bt(this, jr, !1), this.options.persister ? this.options.persister(
        ot,
        yt,
        this
      ) : ot(yt);
    }, at = {
      fetchOptions: L,
      options: this.options,
      queryKey: this.queryKey,
      client: X(this, Yr),
      state: this.state,
      fetchFn: et
    };
    Q(at), (ct = this.options.behavior) == null || ct.onFetch(
      at,
      this
    ), bt(this, Eh, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((Ot = at.fetchOptions) == null ? void 0 : Ot.meta)) && It(this, hs, wl).call(this, { type: "fetch", meta: (pt = at.fetchOptions) == null ? void 0 : pt.meta });
    const lt = (ot) => {
      var yt, dt, ft, St;
      lg(ot) && ot.silent || It(this, hs, wl).call(this, {
        type: "error",
        error: ot
      }), lg(ot) || ((dt = (yt = X(this, Ua).config).onError) == null || dt.call(
        yt,
        ot,
        this
      ), (St = (ft = X(this, Ua).config).onSettled) == null || St.call(
        ft,
        this.state.data,
        ot,
        this
      )), this.scheduleGc();
    };
    return bt(this, ki, Sm({
      initialPromise: L == null ? void 0 : L.initialPromise,
      fn: at.fetchFn,
      abort: D.abort.bind(D),
      onSuccess: (ot) => {
        var yt, dt, ft, St;
        if (ot === void 0) {
          lt(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(ot);
        } catch (xt) {
          lt(xt);
          return;
        }
        (dt = (yt = X(this, Ua).config).onSuccess) == null || dt.call(yt, ot, this), (St = (ft = X(this, Ua).config).onSettled) == null || St.call(
          ft,
          ot,
          this.state.error,
          this
        ), this.scheduleGc();
      },
      onError: lt,
      onFail: (ot, yt) => {
        It(this, hs, wl).call(this, { type: "failed", failureCount: ot, error: yt });
      },
      onPause: () => {
        It(this, hs, wl).call(this, { type: "pause" });
      },
      onContinue: () => {
        It(this, hs, wl).call(this, { type: "continue" });
      },
      retry: at.options.retry,
      retryDelay: at.options.retryDelay,
      networkMode: at.options.networkMode,
      canRun: () => !0
    })), X(this, ki).start();
  }
}, Oh = new WeakMap(), Eh = new WeakMap(), Ua = new WeakMap(), Yr = new WeakMap(), ki = new WeakMap(), Hc = new WeakMap(), jr = new WeakMap(), hs = new WeakSet(), wl = function(x) {
  const L = (D) => {
    switch (x.type) {
      case "failed":
        return {
          ...D,
          fetchFailureCount: x.failureCount,
          fetchFailureReason: x.error
        };
      case "pause":
        return {
          ...D,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...D,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...D,
          ...Tm(D.data, this.options),
          fetchMeta: x.meta ?? null
        };
      case "success":
        return {
          ...D,
          data: x.data,
          dataUpdateCount: D.dataUpdateCount + 1,
          dataUpdatedAt: x.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: !1,
          status: "success",
          ...!x.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const Q = x.error;
        return lg(Q) && Q.revert && X(this, Eh) ? { ...X(this, Eh), fetchStatus: "idle" } : {
          ...D,
          error: Q,
          errorUpdateCount: D.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: D.fetchFailureCount + 1,
          fetchFailureReason: Q,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...D,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...D,
          ...x.state
        };
    }
  };
  this.state = L(this.state), vi.batch(() => {
    this.observers.forEach((D) => {
      D.onQueryUpdate();
    }), X(this, Ua).notify({ query: this, type: "updated", action: x });
  });
}, hm);
function Tm(O, x) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: bm(x.networkMode) ? "fetching" : "paused",
    ...O === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function Sy(O) {
  const x = typeof O.initialData == "function" ? O.initialData() : O.initialData, L = x !== void 0, D = L ? typeof O.initialDataUpdatedAt == "function" ? O.initialDataUpdatedAt() : O.initialDataUpdatedAt : 0;
  return {
    data: x,
    dataUpdateCount: 0,
    dataUpdatedAt: L ? D ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: L ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var Zs, um, My = (um = class extends Yc {
  constructor(x = {}) {
    super();
    Ht(this, Zs);
    this.config = x, bt(this, Zs, /* @__PURE__ */ new Map());
  }
  build(x, L, D) {
    const Q = L.queryKey, et = L.queryHash ?? bg(Q, L);
    let at = this.get(et);
    return at || (at = new xy({
      client: x,
      queryKey: Q,
      queryHash: et,
      options: x.defaultQueryOptions(L),
      state: D,
      defaultOptions: x.getQueryDefaults(Q)
    }), this.add(at)), at;
  }
  add(x) {
    X(this, Zs).has(x.queryHash) || (X(this, Zs).set(x.queryHash, x), this.notify({
      type: "added",
      query: x
    }));
  }
  remove(x) {
    const L = X(this, Zs).get(x.queryHash);
    L && (x.destroy(), L === x && X(this, Zs).delete(x.queryHash), this.notify({ type: "removed", query: x }));
  }
  clear() {
    vi.batch(() => {
      this.getAll().forEach((x) => {
        this.remove(x);
      });
    });
  }
  get(x) {
    return X(this, Zs).get(x);
  }
  getAll() {
    return [...X(this, Zs).values()];
  }
  find(x) {
    const L = { exact: !0, ...x };
    return this.getAll().find(
      (D) => Zg(L, D)
    );
  }
  findAll(x = {}) {
    const L = this.getAll();
    return Object.keys(x).length > 0 ? L.filter((D) => Zg(x, D)) : L;
  }
  notify(x) {
    vi.batch(() => {
      this.listeners.forEach((L) => {
        L(x);
      });
    });
  }
  onFocus() {
    vi.batch(() => {
      this.getAll().forEach((x) => {
        x.onFocus();
      });
    });
  }
  onOnline() {
    vi.batch(() => {
      this.getAll().forEach((x) => {
        x.onOnline();
      });
    });
  }
}, Zs = new WeakMap(), um), Vs, Pi, Pr, Ws, Mn, cm, Ty = (cm = class extends Mm {
  constructor(x) {
    super();
    Ht(this, Ws);
    Ht(this, Vs);
    Ht(this, Pi);
    Ht(this, Pr);
    this.mutationId = x.mutationId, bt(this, Pi, x.mutationCache), bt(this, Vs, []), this.state = x.state || Ay(), this.setOptions(x.options), this.scheduleGc();
  }
  setOptions(x) {
    this.options = x, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(x) {
    X(this, Vs).includes(x) || (X(this, Vs).push(x), this.clearGcTimeout(), X(this, Pi).notify({
      type: "observerAdded",
      mutation: this,
      observer: x
    }));
  }
  removeObserver(x) {
    bt(this, Vs, X(this, Vs).filter((L) => L !== x)), this.scheduleGc(), X(this, Pi).notify({
      type: "observerRemoved",
      mutation: this,
      observer: x
    });
  }
  optionalRemove() {
    X(this, Vs).length || (this.state.status === "pending" ? this.scheduleGc() : X(this, Pi).remove(this));
  }
  continue() {
    var x;
    return ((x = X(this, Pr)) == null ? void 0 : x.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(x) {
    var et, at, lt, ct, Ot, pt, ot, yt, dt, ft, St, xt, Xt, st, mt, Lt, _t, te, _e, Z;
    const L = () => {
      It(this, Ws, Mn).call(this, { type: "continue" });
    };
    bt(this, Pr, Sm({
      fn: () => this.options.mutationFn ? this.options.mutationFn(x) : Promise.reject(new Error("No mutationFn found")),
      onFail: (ee, ie) => {
        It(this, Ws, Mn).call(this, { type: "failed", failureCount: ee, error: ie });
      },
      onPause: () => {
        It(this, Ws, Mn).call(this, { type: "pause" });
      },
      onContinue: L,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => X(this, Pi).canRun(this)
    }));
    const D = this.state.status === "pending", Q = !X(this, Pr).canStart();
    try {
      if (D)
        L();
      else {
        It(this, Ws, Mn).call(this, { type: "pending", variables: x, isPaused: Q }), await ((at = (et = X(this, Pi).config).onMutate) == null ? void 0 : at.call(
          et,
          x,
          this
        ));
        const ie = await ((ct = (lt = this.options).onMutate) == null ? void 0 : ct.call(lt, x));
        ie !== this.state.context && It(this, Ws, Mn).call(this, {
          type: "pending",
          context: ie,
          variables: x,
          isPaused: Q
        });
      }
      const ee = await X(this, Pr).start();
      return await ((pt = (Ot = X(this, Pi).config).onSuccess) == null ? void 0 : pt.call(
        Ot,
        ee,
        x,
        this.state.context,
        this
      )), await ((yt = (ot = this.options).onSuccess) == null ? void 0 : yt.call(ot, ee, x, this.state.context)), await ((ft = (dt = X(this, Pi).config).onSettled) == null ? void 0 : ft.call(
        dt,
        ee,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((xt = (St = this.options).onSettled) == null ? void 0 : xt.call(St, ee, null, x, this.state.context)), It(this, Ws, Mn).call(this, { type: "success", data: ee }), ee;
    } catch (ee) {
      try {
        throw await ((st = (Xt = X(this, Pi).config).onError) == null ? void 0 : st.call(
          Xt,
          ee,
          x,
          this.state.context,
          this
        )), await ((Lt = (mt = this.options).onError) == null ? void 0 : Lt.call(
          mt,
          ee,
          x,
          this.state.context
        )), await ((te = (_t = X(this, Pi).config).onSettled) == null ? void 0 : te.call(
          _t,
          void 0,
          ee,
          this.state.variables,
          this.state.context,
          this
        )), await ((Z = (_e = this.options).onSettled) == null ? void 0 : Z.call(
          _e,
          void 0,
          ee,
          x,
          this.state.context
        )), ee;
      } finally {
        It(this, Ws, Mn).call(this, { type: "error", error: ee });
      }
    } finally {
      X(this, Pi).runNext(this);
    }
  }
}, Vs = new WeakMap(), Pi = new WeakMap(), Pr = new WeakMap(), Ws = new WeakSet(), Mn = function(x) {
  const L = (D) => {
    switch (x.type) {
      case "failed":
        return {
          ...D,
          failureCount: x.failureCount,
          failureReason: x.error
        };
      case "pause":
        return {
          ...D,
          isPaused: !0
        };
      case "continue":
        return {
          ...D,
          isPaused: !1
        };
      case "pending":
        return {
          ...D,
          context: x.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: x.isPaused,
          status: "pending",
          variables: x.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...D,
          data: x.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...D,
          data: void 0,
          error: x.error,
          failureCount: D.failureCount + 1,
          failureReason: x.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = L(this.state), vi.batch(() => {
    X(this, Vs).forEach((D) => {
      D.onMutationUpdate(x);
    }), X(this, Pi).notify({
      mutation: this,
      type: "updated",
      action: x
    });
  });
}, cm);
function Ay() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var kl, us, Uc, dm, Oy = (dm = class extends Yc {
  constructor(x = {}) {
    super();
    Ht(this, kl);
    Ht(this, us);
    Ht(this, Uc);
    this.config = x, bt(this, kl, /* @__PURE__ */ new Set()), bt(this, us, /* @__PURE__ */ new Map()), bt(this, Uc, 0);
  }
  build(x, L, D) {
    const Q = new Ty({
      mutationCache: this,
      mutationId: ++jf(this, Uc)._,
      options: x.defaultMutationOptions(L),
      state: D
    });
    return this.add(Q), Q;
  }
  add(x) {
    X(this, kl).add(x);
    const L = Qf(x);
    if (typeof L == "string") {
      const D = X(this, us).get(L);
      D ? D.push(x) : X(this, us).set(L, [x]);
    }
    this.notify({ type: "added", mutation: x });
  }
  remove(x) {
    if (X(this, kl).delete(x)) {
      const L = Qf(x);
      if (typeof L == "string") {
        const D = X(this, us).get(L);
        if (D)
          if (D.length > 1) {
            const Q = D.indexOf(x);
            Q !== -1 && D.splice(Q, 1);
          } else D[0] === x && X(this, us).delete(L);
      }
    }
    this.notify({ type: "removed", mutation: x });
  }
  canRun(x) {
    const L = Qf(x);
    if (typeof L == "string") {
      const D = X(this, us).get(L), Q = D == null ? void 0 : D.find(
        (et) => et.state.status === "pending"
      );
      return !Q || Q === x;
    } else
      return !0;
  }
  runNext(x) {
    var D;
    const L = Qf(x);
    if (typeof L == "string") {
      const Q = (D = X(this, us).get(L)) == null ? void 0 : D.find((et) => et !== x && et.state.isPaused);
      return (Q == null ? void 0 : Q.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    vi.batch(() => {
      X(this, kl).forEach((x) => {
        this.notify({ type: "removed", mutation: x });
      }), X(this, kl).clear(), X(this, us).clear();
    });
  }
  getAll() {
    return Array.from(X(this, kl));
  }
  find(x) {
    const L = { exact: !0, ...x };
    return this.getAll().find(
      (D) => Vg(L, D)
    );
  }
  findAll(x = {}) {
    return this.getAll().filter((L) => Vg(x, L));
  }
  notify(x) {
    vi.batch(() => {
      this.listeners.forEach((L) => {
        L(x);
      });
    });
  }
  resumePausedMutations() {
    const x = this.getAll().filter((L) => L.state.isPaused);
    return vi.batch(
      () => Promise.all(
        x.map((L) => L.continue().catch(Xa))
      )
    );
  }
}, kl = new WeakMap(), us = new WeakMap(), Uc = new WeakMap(), dm);
function Qf(O) {
  var x;
  return (x = O.options.scope) == null ? void 0 : x.id;
}
function Fg(O) {
  return {
    onFetch: (x, L) => {
      var pt, ot, yt, dt, ft;
      const D = x.options, Q = (yt = (ot = (pt = x.fetchOptions) == null ? void 0 : pt.meta) == null ? void 0 : ot.fetchMore) == null ? void 0 : yt.direction, et = ((dt = x.state.data) == null ? void 0 : dt.pages) || [], at = ((ft = x.state.data) == null ? void 0 : ft.pageParams) || [];
      let lt = { pages: [], pageParams: [] }, ct = 0;
      const Ot = async () => {
        let St = !1;
        const xt = (mt) => {
          Object.defineProperty(mt, "signal", {
            enumerable: !0,
            get: () => (x.signal.aborted ? St = !0 : x.signal.addEventListener("abort", () => {
              St = !0;
            }), x.signal)
          });
        }, Xt = vm(x.options, x.fetchOptions), st = async (mt, Lt, _t) => {
          if (St)
            return Promise.reject();
          if (Lt == null && mt.pages.length)
            return Promise.resolve(mt);
          const te = {
            client: x.client,
            queryKey: x.queryKey,
            pageParam: Lt,
            direction: _t ? "backward" : "forward",
            meta: x.options.meta
          };
          xt(te);
          const _e = await Xt(
            te
          ), { maxPages: Z } = x.options, ee = _t ? py : fy;
          return {
            pages: ee(mt.pages, _e, Z),
            pageParams: ee(mt.pageParams, Lt, Z)
          };
        };
        if (Q && et.length) {
          const mt = Q === "backward", Lt = mt ? Ey : Ig, _t = {
            pages: et,
            pageParams: at
          }, te = Lt(D, _t);
          lt = await st(_t, te, mt);
        } else {
          const mt = O ?? et.length;
          do {
            const Lt = ct === 0 ? at[0] ?? D.initialPageParam : Ig(D, lt);
            if (ct > 0 && Lt == null)
              break;
            lt = await st(lt, Lt), ct++;
          } while (ct < mt);
        }
        return lt;
      };
      x.options.persister ? x.fetchFn = () => {
        var St, xt;
        return (xt = (St = x.options).persister) == null ? void 0 : xt.call(
          St,
          Ot,
          {
            client: x.client,
            queryKey: x.queryKey,
            meta: x.options.meta,
            signal: x.signal
          },
          L
        );
      } : x.fetchFn = Ot;
    }
  };
}
function Ig(O, { pages: x, pageParams: L }) {
  const D = x.length - 1;
  return x.length > 0 ? O.getNextPageParam(
    x[D],
    x,
    L[D],
    L
  ) : void 0;
}
function Ey(O, { pages: x, pageParams: L }) {
  var D;
  return x.length > 0 ? (D = O.getPreviousPageParam) == null ? void 0 : D.call(O, x[0], x, L[0], L) : void 0;
}
var qe, On, En, wh, Ch, wn, kh, Dh, fm, wy = (fm = class {
  constructor(O = {}) {
    Ht(this, qe);
    Ht(this, On);
    Ht(this, En);
    Ht(this, wh);
    Ht(this, Ch);
    Ht(this, wn);
    Ht(this, kh);
    Ht(this, Dh);
    bt(this, qe, O.queryCache || new My()), bt(this, On, O.mutationCache || new Oy()), bt(this, En, O.defaultOptions || {}), bt(this, wh, /* @__PURE__ */ new Map()), bt(this, Ch, /* @__PURE__ */ new Map()), bt(this, wn, 0);
  }
  mount() {
    jf(this, wn)._++, X(this, wn) === 1 && (bt(this, kh, Sg.subscribe(async (O) => {
      O && (await this.resumePausedMutations(), X(this, qe).onFocus());
    })), bt(this, Dh, Wf.subscribe(async (O) => {
      O && (await this.resumePausedMutations(), X(this, qe).onOnline());
    })));
  }
  unmount() {
    var O, x;
    jf(this, wn)._--, X(this, wn) === 0 && ((O = X(this, kh)) == null || O.call(this), bt(this, kh, void 0), (x = X(this, Dh)) == null || x.call(this), bt(this, Dh, void 0));
  }
  isFetching(O) {
    return X(this, qe).findAll({ ...O, fetchStatus: "fetching" }).length;
  }
  isMutating(O) {
    return X(this, On).findAll({ ...O, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(O) {
    var L;
    const x = this.defaultQueryOptions({ queryKey: O });
    return (L = X(this, qe).get(x.queryHash)) == null ? void 0 : L.state.data;
  }
  ensureQueryData(O) {
    const x = this.defaultQueryOptions(O), L = X(this, qe).build(this, x), D = L.state.data;
    return D === void 0 ? this.fetchQuery(O) : (O.revalidateIfStale && L.isStaleByTime(Sh(x.staleTime, L)) && this.prefetchQuery(x), Promise.resolve(D));
  }
  getQueriesData(O) {
    return X(this, qe).findAll(O).map(({ queryKey: x, state: L }) => {
      const D = L.data;
      return [x, D];
    });
  }
  setQueryData(O, x, L) {
    const D = this.defaultQueryOptions({ queryKey: O }), Q = X(this, qe).get(
      D.queryHash
    ), et = Q == null ? void 0 : Q.state.data, at = cy(x, et);
    if (at !== void 0)
      return X(this, qe).build(this, D).setData(at, { ...L, manual: !0 });
  }
  setQueriesData(O, x, L) {
    return vi.batch(
      () => X(this, qe).findAll(O).map(({ queryKey: D }) => [
        D,
        this.setQueryData(D, x, L)
      ])
    );
  }
  getQueryState(O) {
    var L;
    const x = this.defaultQueryOptions({ queryKey: O });
    return (L = X(this, qe).get(
      x.queryHash
    )) == null ? void 0 : L.state;
  }
  removeQueries(O) {
    const x = X(this, qe);
    vi.batch(() => {
      x.findAll(O).forEach((L) => {
        x.remove(L);
      });
    });
  }
  resetQueries(O, x) {
    const L = X(this, qe);
    return vi.batch(() => (L.findAll(O).forEach((D) => {
      D.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...O
      },
      x
    )));
  }
  cancelQueries(O, x = {}) {
    const L = { revert: !0, ...x }, D = vi.batch(
      () => X(this, qe).findAll(O).map((Q) => Q.cancel(L))
    );
    return Promise.all(D).then(Xa).catch(Xa);
  }
  invalidateQueries(O, x = {}) {
    return vi.batch(() => (X(this, qe).findAll(O).forEach((L) => {
      L.invalidate();
    }), (O == null ? void 0 : O.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...O,
        type: (O == null ? void 0 : O.refetchType) ?? (O == null ? void 0 : O.type) ?? "active"
      },
      x
    )));
  }
  refetchQueries(O, x = {}) {
    const L = {
      ...x,
      cancelRefetch: x.cancelRefetch ?? !0
    }, D = vi.batch(
      () => X(this, qe).findAll(O).filter((Q) => !Q.isDisabled()).map((Q) => {
        let et = Q.fetch(void 0, L);
        return L.throwOnError || (et = et.catch(Xa)), Q.state.fetchStatus === "paused" ? Promise.resolve() : et;
      })
    );
    return Promise.all(D).then(Xa);
  }
  fetchQuery(O) {
    const x = this.defaultQueryOptions(O);
    x.retry === void 0 && (x.retry = !1);
    const L = X(this, qe).build(this, x);
    return L.isStaleByTime(
      Sh(x.staleTime, L)
    ) ? L.fetch(x) : Promise.resolve(L.state.data);
  }
  prefetchQuery(O) {
    return this.fetchQuery(O).then(Xa).catch(Xa);
  }
  fetchInfiniteQuery(O) {
    return O.behavior = Fg(O.pages), this.fetchQuery(O);
  }
  prefetchInfiniteQuery(O) {
    return this.fetchInfiniteQuery(O).then(Xa).catch(Xa);
  }
  ensureInfiniteQueryData(O) {
    return O.behavior = Fg(O.pages), this.ensureQueryData(O);
  }
  resumePausedMutations() {
    return Wf.isOnline() ? X(this, On).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return X(this, qe);
  }
  getMutationCache() {
    return X(this, On);
  }
  getDefaultOptions() {
    return X(this, En);
  }
  setDefaultOptions(O) {
    bt(this, En, O);
  }
  setQueryDefaults(O, x) {
    X(this, wh).set(Nc(O), {
      queryKey: O,
      defaultOptions: x
    });
  }
  getQueryDefaults(O) {
    const x = [...X(this, wh).values()], L = {};
    return x.forEach((D) => {
      Bc(O, D.queryKey) && Object.assign(L, D.defaultOptions);
    }), L;
  }
  setMutationDefaults(O, x) {
    X(this, Ch).set(Nc(O), {
      mutationKey: O,
      defaultOptions: x
    });
  }
  getMutationDefaults(O) {
    const x = [...X(this, Ch).values()], L = {};
    return x.forEach((D) => {
      Bc(O, D.mutationKey) && Object.assign(L, D.defaultOptions);
    }), L;
  }
  defaultQueryOptions(O) {
    if (O._defaulted)
      return O;
    const x = {
      ...X(this, En).queries,
      ...this.getQueryDefaults(O.queryKey),
      ...O,
      _defaulted: !0
    };
    return x.queryHash || (x.queryHash = bg(
      x.queryKey,
      x
    )), x.refetchOnReconnect === void 0 && (x.refetchOnReconnect = x.networkMode !== "always"), x.throwOnError === void 0 && (x.throwOnError = !!x.suspense), !x.networkMode && x.persister && (x.networkMode = "offlineFirst"), x.queryFn === xg && (x.enabled = !1), x;
  }
  defaultMutationOptions(O) {
    return O != null && O._defaulted ? O : {
      ...X(this, En).mutations,
      ...(O == null ? void 0 : O.mutationKey) && this.getMutationDefaults(O.mutationKey),
      ...O,
      _defaulted: !0
    };
  }
  clear() {
    X(this, qe).clear(), X(this, On).clear();
  }
}, qe = new WeakMap(), On = new WeakMap(), En = new WeakMap(), wh = new WeakMap(), Ch = new WeakMap(), wn = new WeakMap(), kh = new WeakMap(), Dh = new WeakMap(), fm), oa, Jt, Xc, qi, qr, Lh, Cn, kn, Gc, zh, Rh, _r, Qr, Dn, Nh, fe, Rc, cg, dg, fg, pg, gg, mg, yg, Am, pm, Cy = (pm = class extends Yc {
  constructor(x, L) {
    super();
    Ht(this, fe);
    Ht(this, oa);
    Ht(this, Jt);
    Ht(this, Xc);
    Ht(this, qi);
    Ht(this, qr);
    Ht(this, Lh);
    Ht(this, Cn);
    Ht(this, kn);
    Ht(this, Gc);
    Ht(this, zh);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    Ht(this, Rh);
    Ht(this, _r);
    Ht(this, Qr);
    Ht(this, Dn);
    Ht(this, Nh, /* @__PURE__ */ new Set());
    this.options = L, bt(this, oa, x), bt(this, kn, null), bt(this, Cn, ug()), this.options.experimental_prefetchInRender || X(this, Cn).reject(
      new Error("experimental_prefetchInRender feature flag is not enabled")
    ), this.bindMethods(), this.setOptions(L);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (X(this, Jt).addObserver(this), Jg(X(this, Jt), this.options) ? It(this, fe, Rc).call(this) : this.updateResult(), It(this, fe, pg).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return vg(
      X(this, Jt),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return vg(
      X(this, Jt),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), It(this, fe, gg).call(this), It(this, fe, mg).call(this), X(this, Jt).removeObserver(this);
  }
  setOptions(x) {
    const L = this.options, D = X(this, Jt);
    if (this.options = X(this, oa).defaultQueryOptions(x), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof cs(this.options.enabled, X(this, Jt)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    It(this, fe, yg).call(this), X(this, Jt).setOptions(this.options), L._defaulted && !rg(this.options, L) && X(this, oa).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: X(this, Jt),
      observer: this
    });
    const Q = this.hasListeners();
    Q && $g(
      X(this, Jt),
      D,
      this.options,
      L
    ) && It(this, fe, Rc).call(this), this.updateResult(), Q && (X(this, Jt) !== D || cs(this.options.enabled, X(this, Jt)) !== cs(L.enabled, X(this, Jt)) || Sh(this.options.staleTime, X(this, Jt)) !== Sh(L.staleTime, X(this, Jt))) && It(this, fe, cg).call(this);
    const et = It(this, fe, dg).call(this);
    Q && (X(this, Jt) !== D || cs(this.options.enabled, X(this, Jt)) !== cs(L.enabled, X(this, Jt)) || et !== X(this, Dn)) && It(this, fe, fg).call(this, et);
  }
  getOptimisticResult(x) {
    const L = X(this, oa).getQueryCache().build(X(this, oa), x), D = this.createResult(L, x);
    return Dy(this, D) && (bt(this, qi, D), bt(this, Lh, this.options), bt(this, qr, X(this, Jt).state)), D;
  }
  getCurrentResult() {
    return X(this, qi);
  }
  trackResult(x, L) {
    const D = {};
    return Object.keys(x).forEach((Q) => {
      Object.defineProperty(D, Q, {
        configurable: !1,
        enumerable: !0,
        get: () => (this.trackProp(Q), L == null || L(Q), x[Q])
      });
    }), D;
  }
  trackProp(x) {
    X(this, Nh).add(x);
  }
  getCurrentQuery() {
    return X(this, Jt);
  }
  refetch({ ...x } = {}) {
    return this.fetch({
      ...x
    });
  }
  fetchOptimistic(x) {
    const L = X(this, oa).defaultQueryOptions(x), D = X(this, oa).getQueryCache().build(X(this, oa), L);
    return D.fetch().then(() => this.createResult(D, L));
  }
  fetch(x) {
    return It(this, fe, Rc).call(this, {
      ...x,
      cancelRefetch: x.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), X(this, qi)));
  }
  createResult(x, L) {
    var ee;
    const D = X(this, Jt), Q = this.options, et = X(this, qi), at = X(this, qr), lt = X(this, Lh), Ot = x !== D ? x.state : X(this, Xc), { state: pt } = x;
    let ot = { ...pt }, yt = !1, dt;
    if (L._optimisticResults) {
      const ie = this.hasListeners(), Xe = !ie && Jg(x, L), Ce = ie && $g(x, D, L, Q);
      (Xe || Ce) && (ot = {
        ...ot,
        ...Tm(pt.data, x.options)
      }), L._optimisticResults === "isRestoring" && (ot.fetchStatus = "idle");
    }
    let { error: ft, errorUpdatedAt: St, status: xt } = ot;
    dt = ot.data;
    let Xt = !1;
    if (L.placeholderData !== void 0 && dt === void 0 && xt === "pending") {
      let ie;
      et != null && et.isPlaceholderData && L.placeholderData === (lt == null ? void 0 : lt.placeholderData) ? (ie = et.data, Xt = !0) : ie = typeof L.placeholderData == "function" ? L.placeholderData(
        (ee = X(this, Rh)) == null ? void 0 : ee.state.data,
        X(this, Rh)
      ) : L.placeholderData, ie !== void 0 && (xt = "success", dt = hg(
        et == null ? void 0 : et.data,
        ie,
        L
      ), yt = !0);
    }
    if (L.select && dt !== void 0 && !Xt)
      if (et && dt === (at == null ? void 0 : at.data) && L.select === X(this, Gc))
        dt = X(this, zh);
      else
        try {
          bt(this, Gc, L.select), dt = L.select(dt), dt = hg(et == null ? void 0 : et.data, dt, L), bt(this, zh, dt), bt(this, kn, null);
        } catch (ie) {
          bt(this, kn, ie);
        }
    X(this, kn) && (ft = X(this, kn), dt = X(this, zh), St = Date.now(), xt = "error");
    const st = ot.fetchStatus === "fetching", mt = xt === "pending", Lt = xt === "error", _t = mt && st, te = dt !== void 0, Z = {
      status: xt,
      fetchStatus: ot.fetchStatus,
      isPending: mt,
      isSuccess: xt === "success",
      isError: Lt,
      isInitialLoading: _t,
      isLoading: _t,
      data: dt,
      dataUpdatedAt: ot.dataUpdatedAt,
      error: ft,
      errorUpdatedAt: St,
      failureCount: ot.fetchFailureCount,
      failureReason: ot.fetchFailureReason,
      errorUpdateCount: ot.errorUpdateCount,
      isFetched: ot.dataUpdateCount > 0 || ot.errorUpdateCount > 0,
      isFetchedAfterMount: ot.dataUpdateCount > Ot.dataUpdateCount || ot.errorUpdateCount > Ot.errorUpdateCount,
      isFetching: st,
      isRefetching: st && !mt,
      isLoadingError: Lt && !te,
      isPaused: ot.fetchStatus === "paused",
      isPlaceholderData: yt,
      isRefetchError: Lt && te,
      isStale: Mg(x, L),
      refetch: this.refetch,
      promise: X(this, Cn)
    };
    if (this.options.experimental_prefetchInRender) {
      const ie = (xa) => {
        Z.status === "error" ? xa.reject(Z.error) : Z.data !== void 0 && xa.resolve(Z.data);
      }, Xe = () => {
        const xa = bt(this, Cn, Z.promise = ug());
        ie(xa);
      }, Ce = X(this, Cn);
      switch (Ce.status) {
        case "pending":
          x.queryHash === D.queryHash && ie(Ce);
          break;
        case "fulfilled":
          (Z.status === "error" || Z.data !== Ce.value) && Xe();
          break;
        case "rejected":
          (Z.status !== "error" || Z.error !== Ce.reason) && Xe();
          break;
      }
    }
    return Z;
  }
  updateResult() {
    const x = X(this, qi), L = this.createResult(X(this, Jt), this.options);
    if (bt(this, qr, X(this, Jt).state), bt(this, Lh, this.options), X(this, qr).data !== void 0 && bt(this, Rh, X(this, Jt)), rg(L, x))
      return;
    bt(this, qi, L);
    const D = () => {
      if (!x)
        return !0;
      const { notifyOnChangeProps: Q } = this.options, et = typeof Q == "function" ? Q() : Q;
      if (et === "all" || !et && !X(this, Nh).size)
        return !0;
      const at = new Set(
        et ?? X(this, Nh)
      );
      return this.options.throwOnError && at.add("error"), Object.keys(X(this, qi)).some((lt) => {
        const ct = lt;
        return X(this, qi)[ct] !== x[ct] && at.has(ct);
      });
    };
    It(this, fe, Am).call(this, { listeners: D() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && It(this, fe, pg).call(this);
  }
}, oa = new WeakMap(), Jt = new WeakMap(), Xc = new WeakMap(), qi = new WeakMap(), qr = new WeakMap(), Lh = new WeakMap(), Cn = new WeakMap(), kn = new WeakMap(), Gc = new WeakMap(), zh = new WeakMap(), Rh = new WeakMap(), _r = new WeakMap(), Qr = new WeakMap(), Dn = new WeakMap(), Nh = new WeakMap(), fe = new WeakSet(), Rc = function(x) {
  It(this, fe, yg).call(this);
  let L = X(this, Jt).fetch(
    this.options,
    x
  );
  return x != null && x.throwOnError || (L = L.catch(Xa)), L;
}, cg = function() {
  It(this, fe, gg).call(this);
  const x = Sh(
    this.options.staleTime,
    X(this, Jt)
  );
  if (Zr || X(this, qi).isStale || !ng(x))
    return;
  const D = mm(X(this, qi).dataUpdatedAt, x) + 1;
  bt(this, _r, setTimeout(() => {
    X(this, qi).isStale || this.updateResult();
  }, D));
}, dg = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(X(this, Jt)) : this.options.refetchInterval) ?? !1;
}, fg = function(x) {
  It(this, fe, mg).call(this), bt(this, Dn, x), !(Zr || cs(this.options.enabled, X(this, Jt)) === !1 || !ng(X(this, Dn)) || X(this, Dn) === 0) && bt(this, Qr, setInterval(() => {
    (this.options.refetchIntervalInBackground || Sg.isFocused()) && It(this, fe, Rc).call(this);
  }, X(this, Dn)));
}, pg = function() {
  It(this, fe, cg).call(this), It(this, fe, fg).call(this, It(this, fe, dg).call(this));
}, gg = function() {
  X(this, _r) && (clearTimeout(X(this, _r)), bt(this, _r, void 0));
}, mg = function() {
  X(this, Qr) && (clearInterval(X(this, Qr)), bt(this, Qr, void 0));
}, yg = function() {
  const x = X(this, oa).getQueryCache().build(X(this, oa), this.options);
  if (x === X(this, Jt))
    return;
  const L = X(this, Jt);
  bt(this, Jt, x), bt(this, Xc, x.state), this.hasListeners() && (L == null || L.removeObserver(this), x.addObserver(this));
}, Am = function(x) {
  vi.batch(() => {
    x.listeners && this.listeners.forEach((L) => {
      L(X(this, qi));
    }), X(this, oa).getQueryCache().notify({
      query: X(this, Jt),
      type: "observerResultsUpdated"
    });
  });
}, pm);
function ky(O, x) {
  return cs(x.enabled, O) !== !1 && O.state.data === void 0 && !(O.state.status === "error" && x.retryOnMount === !1);
}
function Jg(O, x) {
  return ky(O, x) || O.state.data !== void 0 && vg(O, x, x.refetchOnMount);
}
function vg(O, x, L) {
  if (cs(x.enabled, O) !== !1) {
    const D = typeof L == "function" ? L(O) : L;
    return D === "always" || D !== !1 && Mg(O, x);
  }
  return !1;
}
function $g(O, x, L, D) {
  return (O !== x || cs(D.enabled, O) === !1) && (!L.suspense || O.state.status !== "error") && Mg(O, L);
}
function Mg(O, x) {
  return cs(x.enabled, O) !== !1 && O.isStaleByTime(Sh(x.staleTime, O));
}
function Dy(O, x) {
  return !rg(O.getCurrentResult(), x);
}
var Om = Ga.createContext(
  void 0
), Ly = (O) => {
  const x = Ga.useContext(Om);
  if (!x)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return x;
}, zy = ({
  client: O,
  children: x
}) => (Ga.useEffect(() => (O.mount(), () => {
  O.unmount();
}), [O]), /* @__PURE__ */ ha.jsx(Om.Provider, { value: O, children: x })), Em = Ga.createContext(!1), Ry = () => Ga.useContext(Em);
Em.Provider;
function Ny() {
  let O = !1;
  return {
    clearReset: () => {
      O = !1;
    },
    reset: () => {
      O = !0;
    },
    isReset: () => O
  };
}
var By = Ga.createContext(Ny()), Hy = () => Ga.useContext(By);
function Uy(O, x) {
  return typeof O == "function" ? O(...x) : !!O;
}
function tm() {
}
var Xy = (O, x) => {
  (O.suspense || O.throwOnError || O.experimental_prefetchInRender) && (x.isReset() || (O.retryOnMount = !1));
}, Gy = (O) => {
  Ga.useEffect(() => {
    O.clearReset();
  }, [O]);
}, Yy = ({
  result: O,
  errorResetBoundary: x,
  throwOnError: L,
  query: D,
  suspense: Q
}) => O.isError && !x.isReset() && !O.isFetching && D && (Q && O.data === void 0 || Uy(L, [O.error, D])), jy = (O) => {
  const x = O.staleTime;
  O.suspense && (O.staleTime = typeof x == "function" ? (...L) => Math.max(x(...L), 1e3) : Math.max(x ?? 1e3, 1e3), typeof O.gcTime == "number" && (O.gcTime = Math.max(O.gcTime, 1e3)));
}, Py = (O, x) => O.isLoading && O.isFetching && !x, qy = (O, x) => (O == null ? void 0 : O.suspense) && x.isPending, em = (O, x, L) => x.fetchOptimistic(O).catch(() => {
  L.clearReset();
});
function _y(O, x, L) {
  var ot, yt, dt, ft, St;
  const D = Ly(), Q = Ry(), et = Hy(), at = D.defaultQueryOptions(O);
  (yt = (ot = D.getDefaultOptions().queries) == null ? void 0 : ot._experimental_beforeQuery) == null || yt.call(
    ot,
    at
  ), at._optimisticResults = Q ? "isRestoring" : "optimistic", jy(at), Xy(at, et), Gy(et);
  const lt = !D.getQueryCache().get(at.queryHash), [ct] = Ga.useState(
    () => new x(
      D,
      at
    )
  ), Ot = ct.getOptimisticResult(at), pt = !Q && O.subscribed !== !1;
  if (Ga.useSyncExternalStore(
    Ga.useCallback(
      (xt) => {
        const Xt = pt ? ct.subscribe(vi.batchCalls(xt)) : tm;
        return ct.updateResult(), Xt;
      },
      [ct, pt]
    ),
    () => ct.getCurrentResult(),
    () => ct.getCurrentResult()
  ), Ga.useEffect(() => {
    ct.setOptions(at);
  }, [at, ct]), qy(at, Ot))
    throw em(at, ct, et);
  if (Yy({
    result: Ot,
    errorResetBoundary: et,
    throwOnError: at.throwOnError,
    query: D.getQueryCache().get(at.queryHash),
    suspense: at.suspense
  }))
    throw Ot.error;
  if ((ft = (dt = D.getDefaultOptions().queries) == null ? void 0 : dt._experimental_afterQuery) == null || ft.call(
    dt,
    at,
    Ot
  ), at.experimental_prefetchInRender && !Zr && Py(Ot, Q)) {
    const xt = lt ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      em(at, ct, et)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      (St = D.getQueryCache().get(at.queryHash)) == null ? void 0 : St.promise
    );
    xt == null || xt.catch(tm).finally(() => {
      ct.updateResult();
    });
  }
  return at.notifyOnChangeProps ? Ot : ct.trackResult(Ot);
}
function Qy(O, x) {
  return _y(O, Cy);
}
const Cl = {
  // Status colors
  NORMAL: "#00adef",
  WARNING: "#ffde68",
  ERROR: "#f06280",
  OFFLINE: "#8b8b8b",
  INCOMPLETE: "#ff8c38",
  // UI colors
  TOOLTIP_BORDER: "#8ae"
}, im = {
  PIE: {
    SIZE: "100%",
    BORDER_WIDTH: 1
  }
}, Zy = {
  chart: {
    type: "pie"
  },
  title: {
    text: ""
  },
  credits: {
    enabled: !1
  },
  tooltip: {
    borderColor: Cl.TOOLTIP_BORDER
  },
  accessibility: {
    point: {
      valueSuffix: "%"
    }
  }
}, Vy = (O) => ({
  ...Zy,
  plotOptions: {
    pie: {
      size: im.PIE.SIZE,
      dataLabels: {
        enabled: !0,
        format: "<b>{point.name}</b> : {point.y}"
      },
      borderWidth: im.PIE.BORDER_WIDTH,
      cursor: "pointer"
    }
  },
  series: [
    {
      type: "pie",
      data: O
    }
  ]
}), Wy = (O) => {
  const {
    onRunCnt: x,
    onWarnCnt: L,
    onErrCnt: D,
    disconRunCnt: Q,
    disconWarnCnt: et,
    disconErrCnt: at,
    offlineCnt: lt,
    stdCnt: ct
  } = O, Ot = (yt, dt, ft) => ({
    name: yt,
    y: dt,
    color: ft
  }), pt = [
    Ot("Normal", x, Cl.NORMAL),
    Ot("Warning", L, Cl.WARNING),
    Ot("Error", D, Cl.ERROR)
  ], ot = [
    Ot("Normal", Q, Cl.NORMAL),
    Ot("Warning", et, Cl.WARNING),
    Ot("Error", at, Cl.ERROR),
    Ot("Offline", lt, Cl.OFFLINE),
    Ot("Incomplete", ct, Cl.INCOMPLETE)
  ];
  return {
    onlineSeriesList: pt,
    offlineSeriesList: ot
  };
};
var Zf = { exports: {} }, Ky = Zf.exports, am;
function Fy() {
  return am || (am = 1, function(O, x) {
    (function(L, D) {
      L._Highcharts = D(), O.exports = L._Highcharts;
    })(typeof window > "u" ? Ky : window, () => (() => {
      var Nr;
      let L, D;
      var Q, et, at, lt, ct, Ot, pt, ot, yt, dt, ft, St, xt, Xt, st, mt, Lt, _t, te = {};
      te.d = (p, e) => {
        for (var a in e) te.o(e, a) && !te.o(p, a) && Object.defineProperty(p, a, { enumerable: !0, get: e[a] });
      }, te.o = (p, e) => Object.prototype.hasOwnProperty.call(p, e);
      var _e = {};
      te.d(_e, { default: () => Tc }), function(p) {
        var e, a, l, n, o, h, u;
        p.SVG_NS = "http://www.w3.org/2000/svg", p.product = "Highcharts", p.version = "12.2.0", p.win = typeof window < "u" ? window : {}, p.doc = p.win.document, p.svg = !!((l = (a = (e = p.doc) == null ? void 0 : e.createElementNS) == null ? void 0 : a.call(e, p.SVG_NS, "svg")) != null && l.createSVGRect), p.pageLang = (h = (o = (n = p.doc) == null ? void 0 : n.documentElement) == null ? void 0 : o.closest("[lang]")) == null ? void 0 : h.lang, p.userAgent = ((u = p.win.navigator) == null ? void 0 : u.userAgent) || "", p.isChrome = p.win.chrome, p.isFirefox = p.userAgent.indexOf("Firefox") !== -1, p.isMS = /(edge|msie|trident)/i.test(p.userAgent) && !p.win.opera, p.isSafari = !p.isChrome && p.userAgent.indexOf("Safari") !== -1, p.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(p.userAgent), p.isWebKit = p.userAgent.indexOf("AppleWebKit") !== -1, p.deg2rad = 2 * Math.PI / 360, p.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"], p.noop = function() {
        }, p.supportsPassiveEvents = function() {
          let c = !1;
          if (!p.isMS) {
            let f = Object.defineProperty({}, "passive", { get: function() {
              c = !0;
            } });
            p.win.addEventListener && p.win.removeEventListener && (p.win.addEventListener("testPassive", p.noop, f), p.win.removeEventListener("testPassive", p.noop, f));
          }
          return c;
        }(), p.charts = [], p.composed = [], p.dateFormats = {}, p.seriesTypes = {}, p.symbolSizes = {}, p.chartCount = 0;
      }(Q || (Q = {}));
      let Z = Q, { charts: ee, doc: ie, win: Xe } = Z;
      function Ce(p, e, a, l) {
        let n = e ? "Highcharts error" : "Highcharts warning";
        p === 32 && (p = `${n}: Deprecated member`);
        let o = pe(p), h = o ? `${n} #${p}: www.highcharts.com/errors/${p}/` : p.toString();
        if (l !== void 0) {
          let u = "";
          o && (h += "?"), Zi(l, function(c, f) {
            u += `
 - ${f}: ${c}`, o && (h += encodeURI(f) + "=" + encodeURI(c));
          }), h += u;
        }
        zn(Z, "displayError", { chart: a, code: p, message: h, params: l }, function() {
          if (e) throw Error(h);
          Xe.console && Ce.messages.indexOf(h) === -1 && console.warn(h);
        }), Ce.messages.push(h);
      }
      function xa(p, e) {
        return parseInt(p, e || 10);
      }
      function Ya(p) {
        return typeof p == "string";
      }
      function _i(p) {
        let e = Object.prototype.toString.call(p);
        return e === "[object Array]" || e === "[object Array Iterator]";
      }
      function K(p, e) {
        return !!p && typeof p == "object" && (!e || !_i(p));
      }
      function ut(p) {
        return K(p) && typeof p.nodeType == "number";
      }
      function Rt(p) {
        let e = p == null ? void 0 : p.constructor;
        return !!(K(p, !0) && !ut(p) && (e != null && e.name) && e.name !== "Object");
      }
      function pe(p) {
        return typeof p == "number" && !isNaN(p) && p < 1 / 0 && p > -1 / 0;
      }
      function se(p) {
        return p != null;
      }
      function ai(p, e, a) {
        let l, n = Ya(e) && !se(a), o = (h, u) => {
          se(h) ? p.setAttribute(u, h) : n ? (l = p.getAttribute(u)) || u !== "class" || (l = p.getAttribute(u + "Name")) : p.removeAttribute(u);
        };
        return Ya(e) ? o(a, e) : Zi(e, o), l;
      }
      function Te(p) {
        return _i(p) ? p : [p];
      }
      function Ft(p, e) {
        let a;
        for (a in p || (p = {}), e) p[a] = e[a];
        return p;
      }
      function ke() {
        let p = arguments, e = p.length;
        for (let a = 0; a < e; a++) {
          let l = p[a];
          if (l != null) return l;
        }
      }
      function Qi(p, e) {
        Ft(p.style, e);
      }
      function ja(p) {
        return Math.pow(10, Math.floor(Math.log(p) / Math.LN10));
      }
      function Ln(p, e) {
        return p > 1e14 ? p : parseFloat(p.toPrecision(e || 14));
      }
      (Ce || (Ce = {})).messages = [], Math.easeInOutSine = function(p) {
        return -0.5 * (Math.cos(Math.PI * p) - 1);
      };
      let Vr = Array.prototype.find ? function(p, e) {
        return p.find(e);
      } : function(p, e) {
        let a, l = p.length;
        for (a = 0; a < l; a++) if (e(p[a], a)) return p[a];
      };
      function Zi(p, e, a) {
        for (let l in p) Object.hasOwnProperty.call(p, l) && e.call(a || p[l], p[l], l, p);
      }
      function Wr(p, e, a) {
        function l(h, u) {
          let c = p.removeEventListener;
          c && c.call(p, h, u, !1);
        }
        function n(h) {
          let u, c;
          p.nodeName && (e ? (u = {})[e] = !0 : u = h, Zi(u, function(f, y) {
            if (h[y]) for (c = h[y].length; c--; ) l(y, h[y][c].fn);
          }));
        }
        let o = typeof p == "function" && p.prototype || p;
        if (Object.hasOwnProperty.call(o, "hcEvents")) {
          let h = o.hcEvents;
          if (e) {
            let u = h[e] || [];
            a ? (h[e] = u.filter(function(c) {
              return a !== c.fn;
            }), l(e, a)) : (n(h), h[e] = []);
          } else n(h), delete o.hcEvents;
        }
      }
      function zn(p, e, a, l) {
        if (a = a || {}, (ie == null ? void 0 : ie.createEvent) && (p.dispatchEvent || p.fireEvent && p !== Z)) {
          let n = ie.createEvent("Events");
          n.initEvent(e, !0, !0), a = Ft(n, a), p.dispatchEvent ? p.dispatchEvent(a) : p.fireEvent(e, a);
        } else if (p.hcEvents) {
          a.target || Ft(a, { preventDefault: function() {
            a.defaultPrevented = !0;
          }, target: p, type: e });
          let n = [], o = p, h = !1;
          for (; o.hcEvents; ) Object.hasOwnProperty.call(o, "hcEvents") && o.hcEvents[e] && (n.length && (h = !0), n.unshift.apply(n, o.hcEvents[e])), o = Object.getPrototypeOf(o);
          h && n.sort((u, c) => u.order - c.order), n.forEach((u) => {
            u.fn.call(p, a) === !1 && a.preventDefault();
          });
        }
        l && !a.defaultPrevented && l.call(p, a);
      }
      let Bh = function() {
        let p = Math.random().toString(36).substring(2, 9) + "-", e = 0;
        return function() {
          return "highcharts-" + (L ? "" : p) + e++;
        };
      }();
      Xe.jQuery && (Xe.jQuery.fn.highcharts = function() {
        let p = [].slice.call(arguments);
        if (this[0]) return p[0] ? (new Z[Ya(p[0]) ? p.shift() : "Chart"](this[0], p[0], p[1]), this) : ee[ai(this[0], "data-highcharts-chart")];
      });
      let Mt = { addEvent: function(p, e, a, l = {}) {
        let n = typeof p == "function" && p.prototype || p;
        Object.hasOwnProperty.call(n, "hcEvents") || (n.hcEvents = {});
        let o = n.hcEvents;
        Z.Point && p instanceof Z.Point && p.series && p.series.chart && (p.series.chart.runTrackerClick = !0);
        let h = p.addEventListener;
        h && h.call(p, e, a, !!Z.supportsPassiveEvents && { passive: l.passive === void 0 ? e.indexOf("touch") !== -1 : l.passive, capture: !1 }), o[e] || (o[e] = []);
        let u = { fn: a, order: typeof l.order == "number" ? l.order : 1 / 0 };
        return o[e].push(u), o[e].sort((c, f) => c.order - f.order), function() {
          Wr(p, e, a);
        };
      }, arrayMax: function(p) {
        let e = p.length, a = p[0];
        for (; e--; ) p[e] > a && (a = p[e]);
        return a;
      }, arrayMin: function(p) {
        let e = p.length, a = p[0];
        for (; e--; ) p[e] < a && (a = p[e]);
        return a;
      }, attr: ai, clamp: function(p, e, a) {
        return p > e ? p < a ? p : a : e;
      }, clearTimeout: function(p) {
        se(p) && clearTimeout(p);
      }, correctFloat: Ln, createElement: function(p, e, a, l, n) {
        let o = ie.createElement(p);
        return e && Ft(o, e), n && Qi(o, { padding: "0", border: "none", margin: "0" }), a && Qi(o, a), l && l.appendChild(o), o;
      }, crisp: function(p, e = 0, a) {
        let l = e % 2 / 2, n = a ? -1 : 1;
        return (Math.round(p * n - l) + l) * n;
      }, css: Qi, defined: se, destroyObjectProperties: function(p, e, a) {
        Zi(p, function(l, n) {
          l !== e && (l != null && l.destroy) && l.destroy(), (l != null && l.destroy || !a) && delete p[n];
        });
      }, diffObjects: function(p, e, a, l) {
        let n = {};
        return function o(h, u, c, f) {
          let y = a ? u : h;
          Zi(h, function(g, v) {
            if (!f && l && l.indexOf(v) > -1 && u[v]) {
              g = Te(g), c[v] = [];
              for (let b = 0; b < Math.max(g.length, u[v].length); b++) u[v][b] && (g[b] === void 0 ? c[v][b] = u[v][b] : (c[v][b] = {}, o(g[b], u[v][b], c[v][b], f + 1)));
            } else K(g, !0) && !g.nodeType ? (c[v] = _i(g) ? [] : {}, o(g, u[v] || {}, c[v], f + 1), Object.keys(c[v]).length === 0 && (v !== "colorAxis" || f !== 0) && delete c[v]) : (h[v] !== u[v] || v in h && !(v in u)) && v !== "__proto__" && v !== "constructor" && (c[v] = y[v]);
          });
        }(p, e, n, 0), n;
      }, discardElement: function(p) {
        var e;
        (e = p == null ? void 0 : p.parentElement) == null || e.removeChild(p);
      }, erase: function(p, e) {
        let a = p.length;
        for (; a--; ) if (p[a] === e) {
          p.splice(a, 1);
          break;
        }
      }, error: Ce, extend: Ft, extendClass: function(p, e) {
        let a = function() {
        };
        return a.prototype = new p(), Ft(a.prototype, e), a;
      }, find: Vr, fireEvent: zn, getAlignFactor: (p = "") => ({ center: 0.5, right: 1, middle: 0.5, bottom: 1 })[p] || 0, getClosestDistance: function(p, e) {
        let a, l, n, o = !e;
        return p.forEach((h) => {
          if (h.length > 1) for (n = h.length - 1; n > 0; n--) (l = h[n] - h[n - 1]) < 0 && !o ? (e == null || e(), e = void 0) : l && (a === void 0 || l < a) && (a = l);
        }), a;
      }, getMagnitude: ja, getNestedProperty: function(p, e) {
        let a = p.split(".");
        for (; a.length && se(e); ) {
          let l = a.shift();
          if (l === void 0 || l === "__proto__") return;
          if (l === "this") {
            let o;
            return K(e) && (o = e["@this"]), o ?? e;
          }
          let n = e[l.replace(/[\\'"]/g, "")];
          if (!se(n) || typeof n == "function" || typeof n.nodeType == "number" || n === Xe) return;
          e = n;
        }
        return e;
      }, getStyle: function p(e, a, l) {
        var h;
        let n;
        if (a === "width") {
          let u = Math.min(e.offsetWidth, e.scrollWidth), c = (h = e.getBoundingClientRect) == null ? void 0 : h.call(e).width;
          return c < u && c >= u - 1 && (u = Math.floor(c)), Math.max(0, u - (p(e, "padding-left", !0) || 0) - (p(e, "padding-right", !0) || 0));
        }
        if (a === "height") return Math.max(0, Math.min(e.offsetHeight, e.scrollHeight) - (p(e, "padding-top", !0) || 0) - (p(e, "padding-bottom", !0) || 0));
        let o = Xe.getComputedStyle(e, void 0);
        return o && (n = o.getPropertyValue(a), ke(l, a !== "opacity") && (n = xa(n))), n;
      }, insertItem: function(p, e) {
        let a, l = p.options.index, n = e.length;
        for (a = p.options.isInternal ? n : 0; a < n + 1; a++) if (!e[a] || pe(l) && l < ke(e[a].options.index, e[a]._i) || e[a].options.isInternal) {
          e.splice(a, 0, p);
          break;
        }
        return a;
      }, isArray: _i, isClass: Rt, isDOMElement: ut, isFunction: function(p) {
        return typeof p == "function";
      }, isNumber: pe, isObject: K, isString: Ya, merge: function(p, ...e) {
        let a, l = [p, ...e], n = {}, o = function(u, c) {
          return typeof u != "object" && (u = {}), Zi(c, function(f, y) {
            y !== "__proto__" && y !== "constructor" && (!K(f, !0) || Rt(f) || ut(f) ? u[y] = c[y] : u[y] = o(u[y] || {}, f));
          }), u;
        };
        p === !0 && (n = l[1], l = Array.prototype.slice.call(l, 2));
        let h = l.length;
        for (a = 0; a < h; a++) n = o(n, l[a]);
        return n;
      }, normalizeTickInterval: function(p, e, a, l, n) {
        let o, h = p;
        a = ke(a, ja(p));
        let u = p / a;
        for (!e && (e = n ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], l === !1 && (a === 1 ? e = e.filter(function(c) {
          return c % 1 == 0;
        }) : a <= 0.1 && (e = [1 / a]))), o = 0; o < e.length && (h = e[o], (!n || !(h * a >= p)) && (n || !(u <= (e[o] + (e[o + 1] || e[o])) / 2))); o++) ;
        return Ln(h * a, -Math.round(Math.log(1e-3) / Math.LN10));
      }, objectEach: Zi, offset: function(p) {
        let e = ie.documentElement, a = p.parentElement || p.parentNode ? p.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
        return { top: a.top + (Xe.pageYOffset || e.scrollTop) - (e.clientTop || 0), left: a.left + (Xe.pageXOffset || e.scrollLeft) - (e.clientLeft || 0), width: a.width, height: a.height };
      }, pad: function(p, e, a) {
        return Array((e || 2) + 1 - String(p).replace("-", "").length).join(a || "0") + p;
      }, pick: ke, pInt: xa, pushUnique: function(p, e) {
        return 0 > p.indexOf(e) && !!p.push(e);
      }, relativeLength: function(p, e, a) {
        return /%$/.test(p) ? e * parseFloat(p) / 100 + (a || 0) : parseFloat(p);
      }, removeEvent: Wr, replaceNested: function(p, ...e) {
        let a, l;
        do
          for (l of (a = p, e)) p = p.replace(l[0], l[1]);
        while (p !== a);
        return p;
      }, splat: Te, stableSort: function(p, e) {
        let a, l, n = p.length;
        for (l = 0; l < n; l++) p[l].safeI = l;
        for (p.sort(function(o, h) {
          return (a = e(o, h)) === 0 ? o.safeI - h.safeI : a;
        }), l = 0; l < n; l++) delete p[l].safeI;
      }, syncTimeout: function(p, e, a) {
        return e > 0 ? setTimeout(p, e, a) : (p.call(0, a), -1);
      }, timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }, ucfirst: function(p) {
        return Ya(p) ? p.substring(0, 1).toUpperCase() + p.substring(1) : String(p);
      }, uniqueKey: Bh, useSerialIds: function(p) {
        return L = ke(p, L);
      }, wrap: function(p, e, a) {
        let l = p[e];
        p[e] = function() {
          let n = arguments, o = this;
          return a.apply(this, [function() {
            return l.apply(o, arguments.length ? arguments : n);
          }].concat([].slice.call(arguments)));
        };
      } }, { pageLang: Hh, win: Kr } = Z, { defined: jc, error: ua, extend: Uh, isNumber: Xh, isObject: Fr, isString: ds, merge: Ff, objectEach: Pc, pad: fs, splat: If, timeUnits: Ks, ucfirst: Di } = Mt, ps = Z.isSafari && Kr.Intl && !Kr.Intl.DateTimeFormat.prototype.formatRange, Li = (p) => p.main === void 0, Jf = class {
        constructor(p, e) {
          this.options = { timezone: "UTC" }, this.variableTimezone = !1, this.Date = Kr.Date, this.update(p), this.lang = e;
        }
        update(p = {}) {
          this.dTLCache = {}, this.options = p = Ff(!0, this.options, p);
          let { timezoneOffset: e, useUTC: a } = p;
          this.Date = p.Date || Kr.Date || Date;
          let l = p.timezone;
          jc(a) && (l = a ? "UTC" : void 0), e && e % 60 == 0 && (l = "Etc/GMT" + (e > 0 ? "+" : "") + e / 60), this.variableTimezone = l !== "UTC" && (l == null ? void 0 : l.indexOf("Etc/GMT")) !== 0, this.timezone = l, ["months", "shortMonths", "weekdays", "shortWeekdays"].forEach((n) => {
            let o = /months/i.test(n), h = /short/.test(n), u = { timeZone: "UTC" };
            u[o ? "month" : "weekday"] = h ? "short" : "long", this[n] = (o ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [3, 4, 5, 6, 7, 8, 9]).map((c) => this.dateFormat(u, (o ? 31 : 1) * 24 * 36e5 * c));
          });
        }
        toParts(p) {
          let [e, a, l, n, o, h, u] = this.dateTimeFormat({ weekday: "narrow", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }, p, "es").split(/(?:, | |\/|:)/g);
          return [n, +l - 1, a, o, h, u, Math.floor(Number(p) || 0) % 1e3, "DLMXJVS".indexOf(e)].map(Number);
        }
        dateTimeFormat(p, e, a = this.options.locale || Hh) {
          let l = JSON.stringify(p) + a;
          ds(p) && (p = this.str2dtf(p));
          let n = this.dTLCache[l];
          if (!n) {
            p.timeZone ?? (p.timeZone = this.timezone);
            try {
              n = new Intl.DateTimeFormat(a, p);
            } catch (o) {
              /Invalid time zone/i.test(o.message) ? (ua(34), p.timeZone = "UTC", n = new Intl.DateTimeFormat(a, p)) : ua(o.message, !1);
            }
          }
          return this.dTLCache[l] = n, (n == null ? void 0 : n.format(e)) || "";
        }
        str2dtf(p, e = {}) {
          let a = { L: { fractionalSecondDigits: 3 }, S: { second: "2-digit" }, M: { minute: "numeric" }, H: { hour: "2-digit" }, k: { hour: "numeric" }, E: { weekday: "narrow" }, a: { weekday: "short" }, A: { weekday: "long" }, d: { day: "2-digit" }, e: { day: "numeric" }, b: { month: "short" }, B: { month: "long" }, m: { month: "2-digit" }, o: { month: "numeric" }, y: { year: "2-digit" }, Y: { year: "numeric" } };
          return Object.keys(a).forEach((l) => {
            p.indexOf(l) !== -1 && Uh(e, a[l]);
          }), e;
        }
        makeTime(p, e, a = 1, l = 0, n, o, h) {
          let u = this.Date.UTC(p, e, a, l, n || 0, o || 0, h || 0);
          if (this.timezone !== "UTC") {
            let c = this.getTimezoneOffset(u);
            if (u += c, [2, 3, 8, 9, 10, 11].indexOf(e) !== -1 && (l < 5 || l > 20)) {
              let f = this.getTimezoneOffset(u);
              c !== f ? u += f - c : c - 36e5 !== this.getTimezoneOffset(u - 36e5) || ps || (u -= 36e5);
            }
          }
          return u;
        }
        parse(p) {
          if (!ds(p)) return p ?? void 0;
          let e = (p = p.replace(/\//g, "-").replace(/(GMT|UTC)/, "")).indexOf("Z") > -1 || /([+-][0-9]{2}):?[0-9]{2}$/.test(p), a = /^[0-9]{4}-[0-9]{2}(-[0-9]{2}|)$/.test(p);
          e || a || (p += "Z");
          let l = Date.parse(p);
          if (Xh(l)) return l + (!e || a ? this.getTimezoneOffset(l) : 0);
        }
        getTimezoneOffset(p) {
          if (this.timezone !== "UTC") {
            let [e, a, l, n, o = 0] = this.dateTimeFormat({ timeZoneName: "shortOffset" }, p, "en").split(/(GMT|:)/).map(Number), h = -(36e5 * (l + o / 60));
            if (Xh(h)) return h;
          }
          return 0;
        }
        dateFormat(p, e, a) {
          let l = this.lang;
          if (!jc(e) || isNaN(e)) return (l == null ? void 0 : l.invalidDate) || "";
          if (ds(p = p ?? "%Y-%m-%d %H:%M:%S")) {
            let n, o = /%\[([a-zA-Z]+)\]/g;
            for (; n = o.exec(p); ) p = p.replace(n[0], this.dateTimeFormat(n[1], e, l == null ? void 0 : l.locale));
          }
          if (ds(p) && p.indexOf("%") !== -1) {
            let n = this, [o, h, u, c, f, y, g, v] = this.toParts(e), b = (l == null ? void 0 : l.weekdays) || this.weekdays, S = (l == null ? void 0 : l.shortWeekdays) || this.shortWeekdays, E = (l == null ? void 0 : l.months) || this.months, T = (l == null ? void 0 : l.shortMonths) || this.shortMonths;
            Pc(Uh({ a: S ? S[v] : b[v].substr(0, 3), A: b[v], d: fs(u), e: fs(u, 2, " "), w: v, v: (l == null ? void 0 : l.weekFrom) ?? "", b: T[h], B: E[h], m: fs(h + 1), o: h + 1, y: o.toString().substr(2, 2), Y: o, H: fs(c), k: c, I: fs(c % 12 || 12), l: c % 12 || 12, M: fs(f), p: c < 12 ? "AM" : "PM", P: c < 12 ? "am" : "pm", S: fs(y), L: fs(g, 3) }, Z.dateFormats), function(M, w) {
              if (ds(p)) for (; p.indexOf("%" + w) !== -1; ) p = p.replace("%" + w, typeof M == "function" ? M.call(n, e) : M);
            });
          } else if (Fr(p)) {
            let n = (this.getTimezoneOffset(e) || 0) / 36e5, o = this.timezone || "Etc/GMT" + (n >= 0 ? "+" : "") + n, { prefix: h = "", suffix: u = "" } = p;
            p = h + this.dateTimeFormat(Uh({ timeZone: o }, p), e) + u;
          }
          return a ? Di(p) : p;
        }
        resolveDTLFormat(p) {
          return Fr(p, !0) ? Fr(p, !0) && Li(p) ? { main: p } : p : { main: (p = If(p))[0], from: p[1], to: p[2] };
        }
        getDateFormat(p, e, a, l) {
          let n = this.dateFormat("%m-%d %H:%M:%S.%L", e), o = "01-01 00:00:00.000", h = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, u = "millisecond", c = u;
          for (u in Ks) {
            if (p && p === Ks.week && +this.dateFormat("%w", e) === a && n.substr(6) === o.substr(6)) {
              u = "week";
              break;
            }
            if (p && Ks[u] > p) {
              u = c;
              break;
            }
            if (h[u] && n.substr(h[u]) !== o.substr(h[u])) break;
            u !== "week" && (c = u);
          }
          return this.resolveDTLFormat(l[u]).main;
        }
      }, { defined: qc, extend: $f, timeUnits: Ae } = Mt, Dl = class extends Jf {
        getTimeTicks(p, e, a, l) {
          let n = this, o = [], h = {}, { count: u = 1, unitRange: c } = p, [f, y, g, v, b, S] = n.toParts(e), E = (e || 0) % 1e3, T;
          if (l ?? (l = 1), qc(e)) {
            if (E = c >= Ae.second ? 0 : u * Math.floor(E / u), c >= Ae.second && (S = c >= Ae.minute ? 0 : u * Math.floor(S / u)), c >= Ae.minute && (b = c >= Ae.hour ? 0 : u * Math.floor(b / u)), c >= Ae.hour && (v = c >= Ae.day ? 0 : u * Math.floor(v / u)), c >= Ae.day && (g = c >= Ae.month ? 1 : Math.max(1, u * Math.floor(g / u))), c >= Ae.month && (y = c >= Ae.year ? 0 : u * Math.floor(y / u)), c >= Ae.year && (f -= f % u), c === Ae.week) {
              u && (e = n.makeTime(f, y, g, v, b, S, E));
              let C = this.dateTimeFormat({ timeZone: this.timezone, weekday: "narrow" }, e, "es"), B = "DLMXJVS".indexOf(C);
              g += -B + l + (B < l ? -7 : 0);
            }
            e = n.makeTime(f, y, g, v, b, S, E), n.variableTimezone && qc(a) && (T = a - e > 4 * Ae.month || n.getTimezoneOffset(e) !== n.getTimezoneOffset(a));
            let M = e, w = 1;
            for (; M < a; ) o.push(M), c === Ae.year ? M = n.makeTime(f + w * u, 0) : c === Ae.month ? M = n.makeTime(f, y + w * u) : T && (c === Ae.day || c === Ae.week) ? M = n.makeTime(f, y, g + w * u * (c === Ae.day ? 1 : 7)) : T && c === Ae.hour && u > 1 ? M = n.makeTime(f, y, g, v + w * u) : M += c * u, w++;
            o.push(M), c <= Ae.hour && o.length < 1e4 && o.forEach((C) => {
              C % 18e5 == 0 && n.dateFormat("%H%M%S%L", C) === "000000000" && (h[C] = "day");
            });
          }
          return o.info = $f(p, { higherRanks: h, totalRange: c * u }), o;
        }
      }, { isTouchDevice: Fs } = Z, { fireEvent: Ir, merge: Rn } = Mt, Pa = { colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"], symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { weekFrom: "week from", chartTitle: "Chart title", locale: void 0, loading: "Loading...", months: void 0, seriesName: "Series {add index 1}", shortMonths: void 0, weekdays: void 0, numericSymbols: ["k", "M", "G", "T", "P", "E"], pieSliceName: "Slice", resetZoom: "Reset zoom", yAxisTitle: "Values", resetZoomTitle: "Reset zoom level 1:1" }, global: { buttonTheme: { fill: "#f7f7f7", padding: 8, r: 2, stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontSize: "0.8em", fontWeight: "normal" }, states: { hover: { fill: "#e6e6e6" }, select: { fill: "#e6e9ff", style: { color: "#000000", fontWeight: "bold" } }, disabled: { style: { color: "#cccccc" } } } } }, time: { Date: void 0, timezone: "UTC", timezoneOffset: 0, useUTC: void 0 }, chart: { alignThresholds: !1, panning: { enabled: !1, type: "x" }, styledMode: !1, borderRadius: 0, colorCount: 10, allowMutatingData: !0, ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: {}, position: {} }, reflow: !0, type: "line", zooming: { singleTouch: !1, resetButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } } }, width: null, height: null, borderColor: "#334eff", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { style: { color: "#333333", fontWeight: "bold" }, text: "Chart title", margin: 15, minScale: 0.67 }, subtitle: { style: { color: "#666666", fontSize: "0.8em" }, text: "" }, caption: { margin: 15, style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, legend: { enabled: !0, align: "center", alignColumns: !0, className: "highcharts-no-tooltip", events: {}, layout: "horizontal", itemMarginBottom: 2, itemMarginTop: 2, labelFormatter: function() {
        return this.name;
      }, borderColor: "#999999", borderRadius: 0, navigation: { style: { fontSize: "0.8em" }, activeColor: "#0022ff", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "0.8em", textDecoration: "none", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#666666", textDecoration: "line-through" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontSize: "0.8em", fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } }, tooltip: { enabled: !0, animation: { duration: 300, easing: (p) => Math.sqrt(1 - Math.pow(p - 1, 2)) }, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%[AebHMSL]", second: "%[AebHMS]", minute: "%[AebHM]", hour: "%[AebHM]", day: "%[AebY]", week: "%v %[AebY]", month: "%[BY]", year: "%Y" }, footerFormat: "", headerShape: "callout", hideDelay: 500, padding: 8, position: { x: 0, y: 3 }, shared: !1, snap: Fs ? 25 : 10, headerFormat: '<span style="font-size: 0.8em">{ucfirst point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: "#ffffff", borderWidth: void 0, stickOnContact: !1, style: { color: "#333333", cursor: "default", fontSize: "0.8em" }, useHTML: !1 }, credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" }, text: "Highcharts.com" } }, Jr = new Dl(Pa.time, Pa.lang), zi = { defaultOptions: Pa, defaultTime: Jr, getOptions: function() {
        return Pa;
      }, setOptions: function(p) {
        var e;
        return Ir(Z, "setOptions", { options: p }), Rn(!0, Pa, p), p.time && Jr.update(Pa.time), p.lang && "locale" in p.lang && Jr.update({ locale: p.lang.locale }), (e = p.lang) != null && e.chartTitle && (Pa.title = { ...Pa.title, text: p.lang.chartTitle }), Pa;
      } }, { win: Gh } = Z, { isNumber: qa, isString: tp, merge: _c, pInt: si, defined: $r } = Mt, to = (p, e, a) => `color-mix(in srgb,${p},${e} ${100 * a}%)`, eo = (p) => tp(p) && !!p && p !== "none";
      class Oe {
        static parse(e) {
          return e ? new Oe(e) : Oe.None;
        }
        constructor(e) {
          let a, l, n, o;
          this.rgba = [NaN, NaN, NaN, NaN], this.input = e;
          let h = Z.Color;
          if (h && h !== Oe) return new h(e);
          if (typeof e == "object" && e.stops !== void 0) this.stops = e.stops.map((u) => new Oe(u[1]));
          else if (typeof e == "string") for (this.input = e = Oe.names[e.toLowerCase()] || e, n = Oe.parsers.length; n-- && !l; ) (a = (o = Oe.parsers[n]).regex.exec(e)) && (l = o.parse(a));
          l && (this.rgba = l);
        }
        get(e) {
          let a = this.input, l = this.rgba;
          if (this.output) return this.output;
          if (typeof a == "object" && this.stops !== void 0) {
            let n = _c(a);
            return n.stops = [].slice.call(n.stops), this.stops.forEach((o, h) => {
              n.stops[h] = [n.stops[h][0], o.get(e)];
            }), n;
          }
          return l && qa(l[0]) ? e !== "rgb" && (e || l[3] !== 1) ? e === "a" ? `${l[3]}` : "rgba(" + l.join(",") + ")" : "rgb(" + l[0] + "," + l[1] + "," + l[2] + ")" : a;
        }
        brighten(e) {
          let a = this.rgba;
          if (this.stops) this.stops.forEach(function(l) {
            l.brighten(e);
          });
          else if (qa(e) && e !== 0)
            if (qa(a[0])) for (let l = 0; l < 3; l++) a[l] += si(255 * e), a[l] < 0 && (a[l] = 0), a[l] > 255 && (a[l] = 255);
            else Oe.useColorMix && eo(this.input) && (this.output = to(this.input, e > 0 ? "white" : "black", Math.abs(e)));
          return this;
        }
        setOpacity(e) {
          return this.rgba[3] = e, this;
        }
        tweenTo(e, a) {
          let l = this.rgba, n = e.rgba;
          if (!qa(l[0]) || !qa(n[0])) return Oe.useColorMix && eo(this.input) && eo(e.input) && a < 0.99 ? to(this.input, e.input, a) : e.input || "none";
          let o = n[3] !== 1 || l[3] !== 1, h = (c, f) => c + (l[f] - c) * (1 - a), u = n.slice(0, 3).map(h).map(Math.round);
          return o && u.push(h(n[3], 3)), (o ? "rgba(" : "rgb(") + u.join(",") + ")";
        }
      }
      Oe.names = { white: "#ffffff", black: "#000000" }, Oe.parsers = [{ regex: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?(?:\.\d+)?)\s*\)/, parse: function(p) {
        return [si(p[1]), si(p[2]), si(p[3]), parseFloat(p[4], 10)];
      } }, { regex: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/, parse: function(p) {
        return [si(p[1]), si(p[2]), si(p[3]), 1];
      } }, { regex: /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i, parse: function(p) {
        return [si(p[1] + p[1], 16), si(p[2] + p[2], 16), si(p[3] + p[3], 16), $r(p[4]) ? si(p[4] + p[4], 16) / 255 : 1];
      } }, { regex: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i, parse: function(p) {
        return [si(p[1], 16), si(p[2], 16), si(p[3], 16), $r(p[4]) ? si(p[4], 16) / 255 : 1];
      } }], Oe.useColorMix = (Nr = Gh.CSS) == null ? void 0 : Nr.supports("color", "color-mix(in srgb,red,blue 9%)"), Oe.None = new Oe("");
      let { parse: _a } = Oe, { win: li } = Z, { isNumber: ni, objectEach: Ll } = Mt;
      class ti {
        constructor(e, a, l) {
          this.pos = NaN, this.options = a, this.elem = e, this.prop = l;
        }
        dSetter() {
          let e = this.paths, a = e == null ? void 0 : e[0], l = e == null ? void 0 : e[1], n = this.now || 0, o = [];
          if (n !== 1 && a && l)
            if (a.length === l.length && n < 1) for (let h = 0; h < l.length; h++) {
              let u = a[h], c = l[h], f = [];
              for (let y = 0; y < c.length; y++) {
                let g = u[y], v = c[y];
                ni(g) && ni(v) && (c[0] !== "A" || y !== 4 && y !== 5) ? f[y] = g + n * (v - g) : f[y] = v;
              }
              o.push(f);
            }
            else o = l;
          else o = this.toD || [];
          this.elem.attr("d", o, void 0, !0);
        }
        update() {
          let e = this.elem, a = this.prop, l = this.now, n = this.options.step;
          this[a + "Setter"] ? this[a + "Setter"]() : e.attr ? e.element && e.attr(a, l, null, !0) : e.style[a] = l + this.unit, n && n.call(e, l, this);
        }
        run(e, a, l) {
          let n = this, o = n.options, h = function(f) {
            return !h.stopped && n.step(f);
          }, u = li.requestAnimationFrame || function(f) {
            setTimeout(f, 13);
          }, c = function() {
            for (let f = 0; f < ti.timers.length; f++) ti.timers[f]() || ti.timers.splice(f--, 1);
            ti.timers.length && u(c);
          };
          e !== a || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +/* @__PURE__ */ new Date(), this.start = e, this.end = a, this.unit = l, this.now = this.start, this.pos = 0, h.elem = this.elem, h.prop = this.prop, h() && ti.timers.push(h) === 1 && u(c)) : (delete o.curAnim[this.prop], o.complete && Object.keys(o.curAnim).length === 0 && o.complete.call(this.elem));
        }
        step(e) {
          let a, l, n = +/* @__PURE__ */ new Date(), o = this.options, h = this.elem, u = o.complete, c = o.duration, f = o.curAnim;
          return h.attr && !h.element ? a = !1 : e || n >= c + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), f[this.prop] = !0, l = !0, Ll(f, function(y) {
            y !== !0 && (l = !1);
          }), l && u && u.call(h), a = !1) : (this.pos = o.easing((n - this.startTime) / c), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a = !0), a;
        }
        initPath(e, a, l) {
          let n = e.startX, o = e.endX, h = l.slice(), u = e.isArea, c = u ? 2 : 1, f = a && l.length > a.length && l.hasStackedCliffs, y, g, v, b, S = a == null ? void 0 : a.slice();
          if (!S || f) return [h, h];
          function E(M, w) {
            for (; M.length < g; ) {
              let C = M[0], B = w[g - M.length];
              if (B && C[0] === "M" && (B[0] === "C" ? M[0] = ["C", C[1], C[2], C[1], C[2], C[1], C[2]] : M[0] = ["L", C[1], C[2]]), M.unshift(C), u) {
                let z = M.pop();
                M.push(M[M.length - 1], z);
              }
            }
          }
          function T(M) {
            for (; M.length < g; ) {
              let w = M[Math.floor(M.length / c) - 1].slice();
              if (w[0] === "C" && (w[1] = w[5], w[2] = w[6]), u) {
                let C = M[Math.floor(M.length / c)].slice();
                M.splice(M.length / 2, 0, w, C);
              } else M.push(w);
            }
          }
          if (n && o && o.length) {
            for (v = 0; v < n.length; v++) {
              if (n[v] === o[0]) {
                y = v;
                break;
              }
              if (n[0] === o[o.length - n.length + v]) {
                y = v, b = !0;
                break;
              }
              if (n[n.length - 1] === o[o.length - n.length + v]) {
                y = n.length - v;
                break;
              }
            }
            y === void 0 && (S = []);
          }
          return S.length && ni(y) && (g = h.length + y * c, b ? (E(S, h), T(h)) : (E(h, S), T(S))), [S, h];
        }
        fillSetter() {
          ti.prototype.strokeSetter.apply(this, arguments);
        }
        strokeSetter() {
          this.elem.attr(this.prop, _a(this.start).tweenTo(_a(this.end), this.pos), void 0, !0);
        }
      }
      ti.timers = [];
      let { defined: ep, getStyle: ip, isArray: Qc, isNumber: Nn, isObject: Bn, merge: Is, objectEach: zl, pick: Hn } = Mt;
      function gs(p) {
        return Bn(p) ? Is({ duration: 500, defer: 0 }, p) : { duration: 500 * !!p, defer: 0 };
      }
      function Qe(p, e) {
        let a = ti.timers.length;
        for (; a--; ) ti.timers[a].elem !== p || e && e !== ti.timers[a].prop || (ti.timers[a].stopped = !0);
      }
      let We = { animate: function(p, e, a) {
        let l, n = "", o, h, u;
        Bn(a) || (u = arguments, a = { duration: u[2], easing: u[3], complete: u[4] }), Nn(a.duration) || (a.duration = 400), a.easing = typeof a.easing == "function" ? a.easing : Math[a.easing] || Math.easeInOutSine, a.curAnim = Is(e), zl(e, function(c, f) {
          Qe(p, f), h = new ti(p, a, f), o = void 0, f === "d" && Qc(e.d) ? (h.paths = h.initPath(p, p.pathArray, e.d), h.toD = e.d, l = 0, o = 1) : p.attr ? l = p.attr(f) : (l = parseFloat(ip(p, f)) || 0, f !== "opacity" && (n = "px")), o || (o = c), typeof o == "string" && o.match("px") && (o = o.replace(/px/g, "")), h.run(l, o, n);
        });
      }, animObject: gs, getDeferredAnimation: function(p, e, a) {
        let l = gs(e), n = a ? [a] : p.series, o = 0, h = 0;
        return n.forEach((u) => {
          let c = gs(u.options.animation);
          o = Bn(e) && ep(e.defer) ? l.defer : Math.max(o, c.duration + c.defer), h = Math.min(l.duration, c.duration);
        }), p.renderer.forExport && (o = 0), { defer: Math.max(0, o - h), duration: Math.min(o, h) };
      }, setAnimation: function(p, e) {
        e.renderer.globalAnimation = Hn(p, e.options.chart.animation, !0);
      }, stop: Qe }, { SVG_NS: Yh, win: Js } = Z, { attr: Rl, createElement: ap, css: Zc, error: jh, isFunction: sp, isString: Un, objectEach: Xn, splat: Qa } = Mt, { trustedTypes: Gn } = Js, Yn = Gn && sp(Gn.createPolicy) && Gn.createPolicy("highcharts", { createHTML: (p) => p }), Nl = Yn ? Yn.createHTML("") : "";
      class ge {
        static filterUserAttributes(e) {
          return Xn(e, (a, l) => {
            let n = !0;
            ge.allowedAttributes.indexOf(l) === -1 && (n = !1), ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(l) !== -1 && (n = Un(a) && ge.allowedReferences.some((o) => a.indexOf(o) === 0)), n || (jh(33, !1, void 0, { "Invalid attribute in config": `${l}` }), delete e[l]), Un(a) && e[l] && (e[l] = a.replace(/</g, "&lt;"));
          }), e;
        }
        static parseStyle(e) {
          return e.split(";").reduce((a, l) => {
            let n = l.split(":").map((h) => h.trim()), o = n.shift();
            return o && n.length && (a[o.replace(/-([a-z])/g, (h) => h[1].toUpperCase())] = n.join(":")), a;
          }, {});
        }
        static setElementHTML(e, a) {
          e.innerHTML = ge.emptyHTML, a && new ge(a).addToDOM(e);
        }
        constructor(e) {
          this.nodes = typeof e == "string" ? this.parseMarkup(e) : e;
        }
        addToDOM(e) {
          return function a(l, n) {
            let o;
            return Qa(l).forEach(function(h) {
              let u, c = h.tagName, f = h.textContent ? Z.doc.createTextNode(h.textContent) : void 0, y = ge.bypassHTMLFiltering;
              if (c)
                if (c === "#text") u = f;
                else if (ge.allowedTags.indexOf(c) !== -1 || y) {
                  let g = c === "svg" ? Yh : n.namespaceURI || Yh, v = Z.doc.createElementNS(g, c), b = h.attributes || {};
                  Xn(h, function(S, E) {
                    E !== "tagName" && E !== "attributes" && E !== "children" && E !== "style" && E !== "textContent" && (b[E] = S);
                  }), Rl(v, y ? b : ge.filterUserAttributes(b)), h.style && Zc(v, h.style), f && v.appendChild(f), a(h.children || [], v), u = v;
                } else jh(33, !1, void 0, { "Invalid tagName in config": c });
              u && n.appendChild(u), o = u;
            }), o;
          }(this.nodes, e);
        }
        parseMarkup(e) {
          let a, l = [];
          e = e.trim().replace(/ style=(["'])/g, " data-style=$1");
          try {
            a = new DOMParser().parseFromString(Yn ? Yn.createHTML(e) : e, "text/html");
          } catch {
          }
          if (!a) {
            let o = ap("div");
            o.innerHTML = e, a = { body: o };
          }
          let n = (o, h) => {
            let u = o.nodeName.toLowerCase(), c = { tagName: u };
            u === "#text" && (c.textContent = o.textContent || "");
            let f = o.attributes;
            if (f) {
              let y = {};
              [].forEach.call(f, (g) => {
                g.name === "data-style" ? c.style = ge.parseStyle(g.value) : y[g.name] = g.value;
              }), c.attributes = y;
            }
            if (o.childNodes.length) {
              let y = [];
              [].forEach.call(o.childNodes, (g) => {
                n(g, y);
              }), y.length && (c.children = y);
            }
            h.push(c);
          };
          return [].forEach.call(a.body.childNodes, (o) => n(o, l)), l;
        }
      }
      ge.allowedAttributes = ["alt", "aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup", "aria-hidden", "aria-label", "aria-labelledby", "aria-live", "aria-pressed", "aria-readonly", "aria-roledescription", "aria-selected", "class", "clip-path", "color", "colspan", "cx", "cy", "d", "dx", "dy", "disabled", "fill", "filterUnits", "flood-color", "flood-opacity", "height", "href", "id", "in", "in2", "markerHeight", "markerWidth", "offset", "opacity", "operator", "orient", "padding", "paddingLeft", "paddingRight", "patternUnits", "r", "radius", "refX", "refY", "role", "scope", "slope", "src", "startOffset", "stdDeviation", "stroke", "stroke-linecap", "stroke-width", "style", "tableValues", "result", "rowspan", "summary", "target", "tabindex", "text-align", "text-anchor", "textAnchor", "textLength", "title", "type", "valign", "width", "x", "x1", "x2", "xlink:href", "y", "y1", "y2", "zIndex"], ge.allowedReferences = ["https://", "http://", "mailto:", "/", "../", "./", "#"], ge.allowedTags = ["a", "abbr", "b", "br", "button", "caption", "circle", "clipPath", "code", "dd", "defs", "div", "dl", "dt", "em", "feComponentTransfer", "feComposite", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMorphology", "feOffset", "feMerge", "feMergeNode", "filter", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "linearGradient", "marker", "ol", "p", "path", "pattern", "pre", "rect", "small", "span", "stop", "strong", "style", "sub", "sup", "svg", "table", "text", "textPath", "thead", "title", "tbody", "tspan", "td", "th", "tr", "u", "ul", "#text"], ge.emptyHTML = Nl, ge.bypassHTMLFiltering = !1;
      let { defaultOptions: io, defaultTime: Vc } = zi, { pageLang: Wc } = Z, { extend: Vi, getNestedProperty: Kc, isArray: lp, isNumber: jn, isObject: Fc, isString: ao, pick: np, ucfirst: Wi } = Mt, Bl = { add: (p, e) => p + e, divide: (p, e) => e !== 0 ? p / e : "", eq: (p, e) => p == e, each: function(p) {
        let e = arguments[arguments.length - 1];
        return !!lp(p) && p.map((a, l) => Za(e.body, Vi(Fc(a) ? a : { "@this": a }, { "@index": l, "@first": l === 0, "@last": l === p.length - 1 }))).join("");
      }, ge: (p, e) => p >= e, gt: (p, e) => p > e, if: (p) => !!p, le: (p, e) => p <= e, lt: (p, e) => p < e, multiply: (p, e) => p * e, ne: (p, e) => p != e, subtract: (p, e) => p - e, ucfirst: Wi, unless: (p) => !p }, Ph = {}, so = (p) => /^["'].+["']$/.test(p);
      function Za(p = "", e, a) {
        var T;
        let l = /\{([a-zA-Z\u00C0-\u017F\d:\.,;\-\/<>\[\]%_@+"'’= #\(\)]+)\}/g, n = /\(([a-zA-Z\u00C0-\u017F\d:\.,;\-\/<>\[\]%_@+"'= ]+)\)/g, o = [], h = /f$/, u = /\.(\d)/, c = ((T = a == null ? void 0 : a.options) == null ? void 0 : T.lang) || io.lang, f = (a == null ? void 0 : a.time) || Vc, y = (a == null ? void 0 : a.numberFormatter) || qh, g = (M = "") => {
          let w;
          return M === "true" || M !== "false" && ((w = Number(M)).toString() === M ? w : so(M) ? M.slice(1, -1) : Kc(M, e));
        }, v, b, S = 0, E;
        for (; (v = l.exec(p)) !== null; ) {
          let M = v, w = n.exec(v[1]);
          w && (v = w, E = !0), b != null && b.isBlock || (b = { ctx: e, expression: v[1], find: v[0], isBlock: v[1].charAt(0) === "#", start: v.index, startInner: v.index + v[0].length, length: v[0].length });
          let C = (b.isBlock ? M : v)[1].split(" ")[0].replace("#", "");
          Bl[C] && (b.isBlock && C === b.fn && S++, b.fn || (b.fn = C));
          let B = v[1] === "else";
          if (b.isBlock && b.fn && (v[1] === `/${b.fn}` || B))
            if (S) !B && S--;
            else {
              let z = b.startInner, R = p.substr(z, v.index - z);
              b.body === void 0 ? (b.body = R, b.startInner = v.index + v[0].length) : b.elseBody = R, b.find += R + v[0], B || (o.push(b), b = void 0);
            }
          else b.isBlock || o.push(b);
          if (w && !(b != null && b.isBlock)) break;
        }
        return o.forEach((M) => {
          let w, C, { body: B, elseBody: z, expression: R, fn: Y } = M;
          if (Y) {
            let H = [M], j = [], W = R.length, tt = 0, it;
            for (C = 0; C <= W; C++) {
              let J = R.charAt(C);
              it || J !== '"' && J !== "'" ? it === J && (it = "") : it = J, it || J !== " " && C !== W || (j.push(R.substr(tt, C - tt)), tt = C + 1);
            }
            for (C = Bl[Y].length; C--; ) H.unshift(g(j[C + 1]));
            w = Bl[Y].apply(e, H), M.isBlock && typeof w == "boolean" && (w = Za(w ? B : z, e, a));
          } else {
            let H = so(R) ? [R] : R.split(":");
            if (w = g(H.shift() || ""), H.length && typeof w == "number") {
              let j = H.join(":");
              if (h.test(j)) {
                let W = parseInt((j.match(u) || ["", "-1"])[1], 10);
                w !== null && (w = y(w, W, c.decimalPoint, j.indexOf(",") > -1 ? c.thousandsSep : ""));
              } else w = f.dateFormat(j, w);
            }
            n.lastIndex = 0, n.test(M.find) && ao(w) && (w = `"${w}"`);
          }
          p = p.replace(M.find, np(w, ""));
        }), E ? Za(p, e, a) : p;
      }
      function qh(p, e, a, l) {
        var E;
        e *= 1;
        let n, o, [h, u] = (p = +p || 0).toString().split("e").map(Number), c = ((E = this == null ? void 0 : this.options) == null ? void 0 : E.lang) || io.lang, f = (p.toString().split(".")[1] || "").split("e")[0].length, y = e, g = {};
        a ?? (a = c.decimalPoint), l ?? (l = c.thousandsSep), e === -1 ? e = Math.min(f, 20) : jn(e) ? e && u < 0 && ((o = e + u) >= 0 ? (h = +h.toExponential(o).split("e")[0], e = o) : (h = Math.floor(h), p = e < 20 ? +(h * Math.pow(10, u)).toFixed(e) : 0, u = 0)) : e = 2, u && (e ?? (e = 2), p = h), jn(e) && e >= 0 && (g.minimumFractionDigits = e, g.maximumFractionDigits = e), l === "" && (g.useGrouping = !1);
        let v = l || a, b = v ? "en" : (this == null ? void 0 : this.locale) || c.locale || Wc, S = JSON.stringify(g) + b;
        return n = (Ph[S] ?? (Ph[S] = new Intl.NumberFormat(b, g))).format(p), v && (n = n.replace(/([,\.])/g, "_$1").replace(/_\,/g, l ?? ",").replace("_.", a ?? ".")), (e || +n != 0) && (!(u < 0) || y) || (n = "0"), u && +n != 0 && (n += "e" + (u < 0 ? "" : "+") + u), n;
      }
      let Ri = { dateFormat: function(p, e, a) {
        return Vc.dateFormat(p, e, a);
      }, format: Za, helpers: Bl, numberFormat: qh };
      (function(p) {
        let e;
        p.rendererTypes = {}, p.getRendererType = function(a = e) {
          return p.rendererTypes[a] || p.rendererTypes[e];
        }, p.registerRendererType = function(a, l, n) {
          p.rendererTypes[a] = l, (!e || n) && (e = a, Z.Renderer = l);
        };
      })(et || (et = {}));
      let Sa = et, { clamp: rp, pick: Ic, pushUnique: Jc, stableSort: Pn } = Mt;
      (at || (at = {})).distribute = function p(e, a, l) {
        let n = e, o = n.reducedLen || a, h = (C, B) => C.target - B.target, u = [], c = e.length, f = [], y = u.push, g, v, b, S = !0, E, T, M = 0, w;
        for (g = c; g--; ) M += e[g].size;
        if (M > o) {
          for (Pn(e, (C, B) => (B.rank || 0) - (C.rank || 0)), b = (w = e[0].rank === e[e.length - 1].rank) ? c / 2 : -1, v = w ? b : c - 1; b && M > o; ) E = e[g = Math.floor(v)], Jc(f, g) && (M -= E.size), v += b, w && v >= e.length && (b /= 2, v = b);
          f.sort((C, B) => B - C).forEach((C) => y.apply(u, e.splice(C, 1)));
        }
        for (Pn(e, h), e = e.map((C) => ({ size: C.size, targets: [C.target], align: Ic(C.align, 0.5) })); S; ) {
          for (g = e.length; g--; ) E = e[g], T = (Math.min.apply(0, E.targets) + Math.max.apply(0, E.targets)) / 2, E.pos = rp(T - E.size * E.align, 0, a - E.size);
          for (g = e.length, S = !1; g--; ) g > 0 && e[g - 1].pos + e[g - 1].size > e[g].pos && (e[g - 1].size += e[g].size, e[g - 1].targets = e[g - 1].targets.concat(e[g].targets), e[g - 1].align = 0.5, e[g - 1].pos + e[g - 1].size > a && (e[g - 1].pos = a - e[g - 1].size), e.splice(g, 1), S = !0);
        }
        return y.apply(n, u), g = 0, e.some((C) => {
          let B = 0;
          return (C.targets || []).some(() => (n[g].pos = C.pos + B, l !== void 0 && Math.abs(n[g].pos - n[g].target) > l ? (n.slice(0, g + 1).forEach((z) => delete z.pos), n.reducedLen = (n.reducedLen || a) - 0.1 * a, n.reducedLen > 0.1 * a && p(n, a, l), !0) : (B += n[g].size, g++, !1)));
        }), Pn(n, h), n;
      };
      let lo = at, { animate: op, animObject: no, stop: ro } = We, { deg2rad: oo, doc: ca, svg: Hl, SVG_NS: qn, win: _h, isFirefox: $c } = Z, { addEvent: _n, attr: da, createElement: Qh, crisp: ms, css: Va, defined: Ki, erase: ho, extend: Ul, fireEvent: Xl, getAlignFactor: Gl, isArray: Zh, isFunction: fi, isNumber: $s, isObject: uo, isString: Yl, merge: Vh, objectEach: ys, pick: fa, pInt: vs, pushUnique: co, replaceNested: td, syncTimeout: hp, uniqueKey: ed } = Mt;
      class Ze {
        _defaultGetter(e) {
          let a = fa(this[e + "Value"], this[e], this.element ? this.element.getAttribute(e) : null, 0);
          return /^-?[\d\.]+$/.test(a) && (a = parseFloat(a)), a;
        }
        _defaultSetter(e, a, l) {
          l.setAttribute(a, e);
        }
        add(e) {
          let a, l = this.renderer, n = this.element;
          return e && (this.parentGroup = e), this.textStr !== void 0 && this.element.nodeName === "text" && l.buildText(this), this.added = !0, (!e || e.handleZ || this.zIndex) && (a = this.zIndexSetter()), a || (e ? e.element : l.box).appendChild(n), this.onAdd && this.onAdd(), this;
        }
        addClass(e, a) {
          let l = a ? "" : this.attr("class") || "";
          return (e = (e || "").split(/ /g).reduce(function(n, o) {
            return l.indexOf(o) === -1 && n.push(o), n;
          }, l ? [l] : []).join(" ")) !== l && this.attr("class", e), this;
        }
        afterSetters() {
          this.doTransform && (this.updateTransform(), this.doTransform = !1);
        }
        align(e, a, l, n = !0) {
          let o = this.renderer, h = o.alignedObjects, u = !!e;
          e ? (this.alignOptions = e, this.alignByTranslate = a, this.alignTo = l) : (e = this.alignOptions || {}, a = this.alignByTranslate, l = this.alignTo);
          let c = !l || Yl(l) ? l || "renderer" : void 0;
          c && (u && co(h, this), l = void 0);
          let f = fa(l, o[c], o), y = (f.x || 0) + (e.x || 0) + ((f.width || 0) - (e.width || 0)) * Gl(e.align), g = (f.y || 0) + (e.y || 0) + ((f.height || 0) - (e.height || 0)) * Gl(e.verticalAlign), v = { "text-align": e == null ? void 0 : e.align };
          return v[a ? "translateX" : "x"] = Math.round(y), v[a ? "translateY" : "y"] = Math.round(g), n && (this[this.placed ? "animate" : "attr"](v), this.placed = !0), this.alignAttr = v, this;
        }
        alignSetter(e) {
          let a = { left: "start", center: "middle", right: "end" };
          a[e] && (this.alignValue = e, this.element.setAttribute("text-anchor", a[e]));
        }
        animate(e, a, l) {
          let n = no(fa(a, this.renderer.globalAnimation, !0)), o = n.defer;
          return ca.hidden && (n.duration = 0), n.duration !== 0 ? (l && (n.complete = l), hp(() => {
            this.element && op(this, e, n);
          }, o)) : (this.attr(e, void 0, l || n.complete), ys(e, function(h, u) {
            n.step && n.step.call(this, h, { prop: u, pos: 1, elem: this });
          }, this)), this;
        }
        applyTextOutline(e) {
          let a = this.element;
          e.indexOf("contrast") !== -1 && (e = e.replace(/contrast/g, this.renderer.getContrast(a.style.fill)));
          let l = e.indexOf(" "), n = e.substring(l + 1), o = e.substring(0, l);
          if (o && o !== "none" && Z.svg) {
            this.fakeTS = !0, o = o.replace(/(^[\d\.]+)(.*?)$/g, function(y, g, v) {
              return 2 * Number(g) + v;
            }), this.removeTextOutline();
            let h = ca.createElementNS(qn, "tspan");
            da(h, { class: "highcharts-text-outline", fill: n, stroke: n, "stroke-width": o, "stroke-linejoin": "round" });
            let u = a.querySelector("textPath") || a;
            [].forEach.call(u.childNodes, (y) => {
              let g = y.cloneNode(!0);
              g.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach((v) => g.removeAttribute(v)), h.appendChild(g);
            });
            let c = 0;
            [].forEach.call(u.querySelectorAll("text tspan"), (y) => {
              c += Number(y.getAttribute("dy"));
            });
            let f = ca.createElementNS(qn, "tspan");
            f.textContent = "​", da(f, { x: Number(a.getAttribute("x")), dy: -c }), h.appendChild(f), u.insertBefore(h, u.firstChild);
          }
        }
        attr(e, a, l, n) {
          let { element: o } = this, h = Ze.symbolCustomAttribs, u, c, f = this, y;
          return typeof e == "string" && a !== void 0 && (u = e, (e = {})[u] = a), typeof e == "string" ? f = (this[e + "Getter"] || this._defaultGetter).call(this, e, o) : (ys(e, function(g, v) {
            y = !1, n || ro(this, v), this.symbolName && h.indexOf(v) !== -1 && (c || (this.symbolAttr(e), c = !0), y = !0), this.rotation && (v === "x" || v === "y") && (this.doTransform = !0), y || (this[v + "Setter"] || this._defaultSetter).call(this, g, v, o);
          }, this), this.afterSetters()), l && l.call(this), f;
        }
        clip(e) {
          if (e && !e.clipPath) {
            let a = ed() + "-", l = this.renderer.createElement("clipPath").attr({ id: a }).add(this.renderer.defs);
            Ul(e, { clipPath: l, id: a, count: 0 }), e.add(l);
          }
          return this.attr("clip-path", e ? `url(${this.renderer.url}#${e.id})` : "none");
        }
        crisp(e, a) {
          a = Math.round(a || e.strokeWidth || 0);
          let l = e.x || this.x || 0, n = e.y || this.y || 0, o = (e.width || this.width || 0) + l, h = (e.height || this.height || 0) + n, u = ms(l, a), c = ms(n, a);
          return Ul(e, { x: u, y: c, width: ms(o, a) - u, height: ms(h, a) - c }), Ki(e.strokeWidth) && (e.strokeWidth = a), e;
        }
        complexColor(e, a, l) {
          let n = this.renderer, o, h, u, c, f, y, g, v, b, S, E = [], T;
          Xl(this.renderer, "complexColor", { args: arguments }, function() {
            if (e.radialGradient ? h = "radialGradient" : e.linearGradient && (h = "linearGradient"), h) {
              if (u = e[h], f = n.gradients, y = e.stops, b = l.radialReference, Zh(u) && (e[h] = u = { x1: u[0], y1: u[1], x2: u[2], y2: u[3], gradientUnits: "userSpaceOnUse" }), h === "radialGradient" && b && !Ki(u.gradientUnits) && (c = u, u = Vh(u, n.getRadialAttr(b, c), { gradientUnits: "userSpaceOnUse" })), ys(u, function(M, w) {
                w !== "id" && E.push(w, M);
              }), ys(y, function(M) {
                E.push(M);
              }), f[E = E.join(",")]) S = f[E].attr("id");
              else {
                u.id = S = ed();
                let M = f[E] = n.createElement(h).attr(u).add(n.defs);
                M.radAttr = c, M.stops = [], y.forEach(function(w) {
                  w[1].indexOf("rgba") === 0 ? (g = (o = Oe.parse(w[1])).get("rgb"), v = o.get("a")) : (g = w[1], v = 1);
                  let C = n.createElement("stop").attr({ offset: w[0], "stop-color": g, "stop-opacity": v }).add(M);
                  M.stops.push(C);
                });
              }
              T = "url(" + n.url + "#" + S + ")", l.setAttribute(a, T), l.gradient = E, e.toString = function() {
                return T;
              };
            }
          });
        }
        css(e) {
          let a = this.styles, l = {}, n = this.element, o, h = !a;
          if (a && ys(e, function(u, c) {
            a && a[c] !== u && (l[c] = u, h = !0);
          }), h) {
            a && (e = Ul(a, l)), e.width === null || e.width === "auto" ? delete this.textWidth : n.nodeName.toLowerCase() === "text" && e.width && (o = this.textWidth = vs(e.width)), Ul(this.styles, e), o && !Hl && this.renderer.forExport && delete e.width;
            let u = $c && e.fontSize || null;
            u && ($s(u) || /^\d+$/.test(u)) && (e.fontSize += "px");
            let c = Vh(e);
            n.namespaceURI === this.SVG_NS && (["textOutline", "textOverflow", "whiteSpace", "width"].forEach((f) => c && delete c[f]), c.color && (c.fill = c.color, delete c.color)), Va(n, c);
          }
          return this.added && (this.element.nodeName === "text" && this.renderer.buildText(this), e.textOutline && this.applyTextOutline(e.textOutline)), this;
        }
        dashstyleSetter(e) {
          let a, l = this["stroke-width"];
          if (l === "inherit" && (l = 1), e) {
            let n = (e = e.toLowerCase()).replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
            for (a = n.length; a--; ) n[a] = "" + vs(n[a]) * fa(l, NaN);
            e = n.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", e);
          }
        }
        destroy() {
          let e = this, a = e.element || {}, l = e.renderer, n = a.ownerSVGElement, o = a.nodeName === "SPAN" && e.parentGroup || void 0, h, u;
          if (a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null, ro(e), e.clipPath && n) {
            let c = e.clipPath;
            [].forEach.call(n.querySelectorAll("[clip-path],[CLIP-PATH]"), function(f) {
              f.getAttribute("clip-path").indexOf(c.element.id) > -1 && f.removeAttribute("clip-path");
            }), e.clipPath = c.destroy();
          }
          if (e.stops) {
            for (u = 0; u < e.stops.length; u++) e.stops[u].destroy();
            e.stops.length = 0, e.stops = void 0;
          }
          for (e.safeRemoveChild(a); o != null && o.div && o.div.childNodes.length === 0; ) h = o.parentGroup, e.safeRemoveChild(o.div), delete o.div, o = h;
          e.alignOptions && ho(l.alignedObjects, e), ys(e, (c, f) => {
            var y, g, v;
            (((y = e[f]) == null ? void 0 : y.parentGroup) === e || ["connector", "foreignObject"].indexOf(f) !== -1) && ((v = (g = e[f]) == null ? void 0 : g.destroy) == null || v.call(g)), delete e[f];
          });
        }
        dSetter(e, a, l) {
          Zh(e) && (typeof e[0] == "string" && (e = this.renderer.pathToSegments(e)), this.pathArray = e, e = e.reduce((n, o, h) => o != null && o.join ? (h ? n + " " : "") + o.join(" ") : (o || "").toString(), "")), /(NaN| {2}|^$)/.test(e) && (e = "M 0 0"), this[a] !== e && (l.setAttribute(a, e), this[a] = e);
        }
        fillSetter(e, a, l) {
          typeof e == "string" ? l.setAttribute(a, e) : e && this.complexColor(e, a, l);
        }
        hrefSetter(e, a, l) {
          l.setAttributeNS("http://www.w3.org/1999/xlink", a, e);
        }
        getBBox(e, a) {
          let l, n, o, h, { alignValue: u, element: c, renderer: f, styles: y, textStr: g } = this, { cache: v, cacheKeys: b } = f, S = c.namespaceURI === this.SVG_NS, E = fa(a, this.rotation, 0), T = f.styledMode ? c && Ze.prototype.getStyle.call(c, "font-size") : y.fontSize;
          if (Ki(g) && ((h = g.toString()).indexOf("<") === -1 && (h = h.replace(/\d/g, "0")), h += ["", f.rootFontSize, T, E, this.textWidth, u, y.lineClamp, y.textOverflow, y.fontWeight].join(",")), h && !e && (l = v[h]), !l || l.polygon) {
            if (S || f.forExport) {
              try {
                o = this.fakeTS && function(w) {
                  let C = c.querySelector(".highcharts-text-outline");
                  C && Va(C, { display: w });
                }, fi(o) && o("none"), l = c.getBBox ? Ul({}, c.getBBox()) : { width: c.offsetWidth, height: c.offsetHeight, x: 0, y: 0 }, fi(o) && o("");
              } catch {
              }
              (!l || l.width < 0) && (l = { x: 0, y: 0, width: 0, height: 0 });
            } else l = this.htmlGetBBox();
            n = l.height, S && (l.height = n = { "11px,17": 14, "13px,20": 16 }[`${T || ""},${Math.round(n)}`] || n), E && (l = this.getRotatedBox(l, E));
            let M = { bBox: l };
            Xl(this, "afterGetBBox", M), l = M.bBox;
          }
          if (h && (g === "" || l.height > 0)) {
            for (; b.length > 250; ) delete v[b.shift()];
            v[h] || b.push(h), v[h] = l;
          }
          return l;
        }
        getRotatedBox(e, a) {
          let { x: l, y: n, width: o, height: h } = e, { alignValue: u, translateY: c, rotationOriginX: f = 0, rotationOriginY: y = 0 } = this, g = Gl(u), v = Number(this.element.getAttribute("y") || 0) - (c ? 0 : n), b = a * oo, S = (a - 90) * oo, E = Math.cos(b), T = Math.sin(b), M = o * E, w = o * T, C = Math.cos(S), B = Math.sin(S), [[z, R], [Y, H]] = [f, y].map((jt) => [jt - jt * E, jt * T]), j = l + g * (o - M) + z + H + v * C, W = j + M, tt = W - h * C, it = tt - M, J = n + v - g * w - R + Y + v * B, rt = J + w, nt = rt - h * B, Ct = nt - w, ht = Math.min(j, W, tt, it), wt = Math.min(J, rt, nt, Ct), Yt = Math.max(j, W, tt, it) - ht, kt = Math.max(J, rt, nt, Ct) - wt;
          return { x: ht, y: wt, width: Yt, height: kt, polygon: [[j, J], [W, rt], [tt, nt], [it, Ct]] };
        }
        getStyle(e) {
          return _h.getComputedStyle(this.element || this, "").getPropertyValue(e);
        }
        hasClass(e) {
          return ("" + this.attr("class")).split(" ").indexOf(e) !== -1;
        }
        hide() {
          return this.attr({ visibility: "hidden" });
        }
        htmlGetBBox() {
          return { height: 0, width: 0, x: 0, y: 0 };
        }
        constructor(e, a) {
          this.onEvents = {}, this.opacity = 1, this.SVG_NS = qn, this.element = a === "span" || a === "body" ? Qh(a) : ca.createElementNS(this.SVG_NS, a), this.renderer = e, this.styles = {}, Xl(this, "afterInit");
        }
        on(e, a) {
          let { onEvents: l } = this;
          return l[e] && l[e](), l[e] = _n(this.element, e, a), this;
        }
        opacitySetter(e, a, l) {
          let n = Number(Number(e).toFixed(3));
          this.opacity = n, l.setAttribute(a, n);
        }
        reAlign() {
          var e;
          (e = this.alignOptions) != null && e.width && this.alignOptions.align !== "left" && (this.alignOptions.width = this.getBBox().width, this.placed = !1, this.align());
        }
        removeClass(e) {
          return this.attr("class", ("" + this.attr("class")).replace(Yl(e) ? RegExp(`(^| )${e}( |$)`) : e, " ").replace(/ +/g, " ").trim());
        }
        removeTextOutline() {
          let e = this.element.querySelector("tspan.highcharts-text-outline");
          e && this.safeRemoveChild(e);
        }
        safeRemoveChild(e) {
          let a = e.parentNode;
          a && a.removeChild(e);
        }
        setRadialReference(e) {
          let a = this.element.gradient && this.renderer.gradients[this.element.gradient] || void 0;
          return this.element.radialReference = e, a != null && a.radAttr && a.animate(this.renderer.getRadialAttr(e, a.radAttr)), this;
        }
        shadow(e) {
          var o;
          let { renderer: a } = this, l = Vh(((o = this.parentGroup) == null ? void 0 : o.rotation) === 90 ? { offsetX: -1, offsetY: -1 } : {}, uo(e) ? e : {}), n = a.shadowDefinition(l);
          return this.attr({ filter: e ? `url(${a.url}#${n})` : "none" });
        }
        show(e = !0) {
          return this.attr({ visibility: e ? "inherit" : "visible" });
        }
        "stroke-widthSetter"(e, a, l) {
          this[a] = e, l.setAttribute(a, e);
        }
        strokeWidth() {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          let e = this.getStyle("stroke-width"), a = 0, l;
          return /px$/.test(e) ? a = vs(e) : e !== "" && (da(l = ca.createElementNS(qn, "rect"), { width: e, "stroke-width": 0 }), this.element.parentNode.appendChild(l), a = l.getBBox().width, l.parentNode.removeChild(l)), a;
        }
        symbolAttr(e) {
          let a = this;
          Ze.symbolCustomAttribs.forEach(function(l) {
            a[l] = fa(e[l], a[l]);
          }), a.attr({ d: a.renderer.symbols[a.symbolName](a.x, a.y, a.width, a.height, a) });
        }
        textSetter(e) {
          e !== this.textStr && (delete this.textPxLength, this.textStr = e, this.added && this.renderer.buildText(this), this.reAlign());
        }
        titleSetter(e) {
          let a = this.element, l = a.getElementsByTagName("title")[0] || ca.createElementNS(this.SVG_NS, "title");
          a.insertBefore ? a.insertBefore(l, a.firstChild) : a.appendChild(l), l.textContent = td(fa(e, ""), [/<[^>]*>/g, ""]).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
        toFront() {
          let e = this.element;
          return e.parentNode.appendChild(e), this;
        }
        translate(e, a) {
          return this.attr({ translateX: e, translateY: a });
        }
        updateTransform(e = "transform") {
          let { element: a, foreignObject: l, matrix: n, padding: o, rotation: h = 0, rotationOriginX: u, rotationOriginY: c, scaleX: f, scaleY: y, text: g, translateX: v = 0, translateY: b = 0 } = this, S = ["translate(" + v + "," + b + ")"];
          Ki(n) && S.push("matrix(" + n.join(",") + ")"), h && (S.push("rotate(" + h + " " + (u ?? a.getAttribute("x") ?? this.x ?? 0) + " " + (c ?? a.getAttribute("y") ?? this.y ?? 0) + ")"), (g == null ? void 0 : g.element.tagName) !== "SPAN" || g != null && g.foreignObject || g.attr({ rotation: h, rotationOriginX: (u || 0) - o, rotationOriginY: (c || 0) - o })), (Ki(f) || Ki(y)) && S.push("scale(" + fa(f, 1) + " " + fa(y, 1) + ")"), S.length && !(g || this).textPath && ((l == null ? void 0 : l.element) || a).setAttribute(e, S.join(" "));
        }
        visibilitySetter(e, a, l) {
          e === "inherit" ? l.removeAttribute(a) : this[a] !== e && l.setAttribute(a, e), this[a] = e;
        }
        xGetter(e) {
          return this.element.nodeName === "circle" && (e === "x" ? e = "cx" : e === "y" && (e = "cy")), this._defaultGetter(e);
        }
        zIndexSetter(e, a) {
          let l = this.renderer, n = this.parentGroup, o = (n || l).element || l.box, h = this.element, u = o === l.box, c, f, y, g = !1, v, b = this.added, S;
          if (Ki(e) ? (h.setAttribute("data-z-index", e), e *= 1, this[a] === e && (b = !1)) : Ki(this[a]) && h.removeAttribute("data-z-index"), this[a] = e, b) {
            for ((e = this.zIndex) && n && (n.handleZ = !0), S = (c = o.childNodes).length - 1; S >= 0 && !g; S--) v = !Ki(y = (f = c[S]).getAttribute("data-z-index")), f !== h && (e < 0 && v && !u && !S ? (o.insertBefore(h, c[S]), g = !0) : (vs(y) <= e || v && (!Ki(e) || e >= 0)) && (o.insertBefore(h, c[S + 1]), g = !0));
            g || (o.insertBefore(h, c[3 * !!u]), g = !0);
          }
          return g;
        }
      }
      Ze.symbolCustomAttribs = ["anchorX", "anchorY", "clockwise", "end", "height", "innerR", "r", "start", "width", "x", "y"], Ze.prototype.strokeSetter = Ze.prototype.fillSetter, Ze.prototype.yGetter = Ze.prototype.xGetter, Ze.prototype.matrixSetter = Ze.prototype.rotationOriginXSetter = Ze.prototype.rotationOriginYSetter = Ze.prototype.rotationSetter = Ze.prototype.scaleXSetter = Ze.prototype.scaleYSetter = Ze.prototype.translateXSetter = Ze.prototype.translateYSetter = Ze.prototype.verticalAlignSetter = function(p, e) {
        this[e] = p, this.doTransform = !0;
      };
      let Fi = Ze, { defined: id, extend: up, getAlignFactor: ad, isNumber: Qn, merge: cp, pick: Zn, removeEvent: sd } = Mt;
      class tl extends Fi {
        constructor(e, a, l, n, o, h, u, c, f, y) {
          let g;
          super(e, "g"), this.paddingLeftSetter = this.paddingSetter, this.paddingRightSetter = this.paddingSetter, this.doUpdate = !1, this.textStr = a, this.x = l, this.y = n, this.anchorX = h, this.anchorY = u, this.baseline = f, this.className = y, this.addClass(y === "button" ? "highcharts-no-tooltip" : "highcharts-label"), y && this.addClass("highcharts-" + y), this.text = e.text(void 0, 0, 0, c).attr({ zIndex: 1 }), typeof o == "string" && ((g = /^url\((.*?)\)$/.test(o)) || this.renderer.symbols[o]) && (this.symbolKey = o), this.bBox = tl.emptyBBox, this.padding = 3, this.baselineOffset = 0, this.needsBox = e.styledMode || g, this.deferredAttr = {}, this.alignFactor = 0;
        }
        alignSetter(e) {
          let a = ad(e);
          this.textAlign = e, a !== this.alignFactor && (this.alignFactor = a, this.bBox && Qn(this.xSetting) && this.attr({ x: this.xSetting }));
        }
        anchorXSetter(e, a) {
          this.anchorX = e, this.boxAttr(a, Math.round(e) - this.getCrispAdjust() - this.xSetting);
        }
        anchorYSetter(e, a) {
          this.anchorY = e, this.boxAttr(a, e - this.ySetting);
        }
        boxAttr(e, a) {
          this.box ? this.box.attr(e, a) : this.deferredAttr[e] = a;
        }
        css(e) {
          if (e) {
            let a = {};
            e = cp(e), tl.textProps.forEach((l) => {
              e[l] !== void 0 && (a[l] = e[l], delete e[l]);
            }), this.text.css(a), "fontSize" in a || "fontWeight" in a ? this.updateTextPadding() : ("width" in a || "textOverflow" in a) && this.updateBoxSize();
          }
          return Fi.prototype.css.call(this, e);
        }
        destroy() {
          sd(this.element, "mouseenter"), sd(this.element, "mouseleave"), this.text && this.text.destroy(), this.box && (this.box = this.box.destroy()), Fi.prototype.destroy.call(this);
        }
        fillSetter(e, a) {
          e && (this.needsBox = !0), this.fill = e, this.boxAttr(a, e);
        }
        getBBox(e, a) {
          this.textStr && this.bBox.width === 0 && this.bBox.height === 0 && this.updateBoxSize();
          let { padding: l, height: n = 0, translateX: o = 0, translateY: h = 0, width: u = 0 } = this, c = Zn(this.paddingLeft, l), f = a ?? (this.rotation || 0), y = { width: u, height: n, x: o + this.bBox.x - c, y: h + this.bBox.y - l + this.baselineOffset };
          return f && (y = this.getRotatedBox(y, f)), y;
        }
        getCrispAdjust() {
          return (this.renderer.styledMode && this.box ? this.box.strokeWidth() : this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2;
        }
        heightSetter(e) {
          this.heightSetting = e, this.doUpdate = !0;
        }
        afterSetters() {
          super.afterSetters(), this.doUpdate && (this.updateBoxSize(), this.doUpdate = !1);
        }
        onAdd() {
          this.text.add(this), this.attr({ text: Zn(this.textStr, ""), x: this.x || 0, y: this.y || 0 }), this.box && id(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        }
        paddingSetter(e, a) {
          Qn(e) ? e !== this[a] && (this[a] = e, this.updateTextPadding()) : this[a] = void 0;
        }
        rSetter(e, a) {
          this.boxAttr(a, e);
        }
        strokeSetter(e, a) {
          this.stroke = e, this.boxAttr(a, e);
        }
        "stroke-widthSetter"(e, a) {
          e && (this.needsBox = !0), this["stroke-width"] = e, this.boxAttr(a, e);
        }
        "text-alignSetter"(e) {
          this.textAlign = this["text-align"] = e, this.updateTextPadding();
        }
        textSetter(e) {
          e !== void 0 && this.text.attr({ text: e }), this.updateTextPadding(), this.reAlign();
        }
        updateBoxSize() {
          let e, a = this.text, l = {}, n = this.padding, o = this.bBox = (!Qn(this.widthSetting) || !Qn(this.heightSetting) || this.textAlign) && id(a.textStr) ? a.getBBox(void 0, 0) : tl.emptyBBox;
          this.width = this.getPaddedWidth(), this.height = (this.heightSetting || o.height || 0) + 2 * n;
          let h = this.renderer.fontMetrics(a);
          if (this.baselineOffset = n + Math.min((this.text.firstLineMetrics || h).b, o.height || 1 / 0), this.heightSetting && (this.baselineOffset += (this.heightSetting - h.h) / 2), this.needsBox && !a.textPath) {
            if (!this.box) {
              let u = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect();
              u.addClass((this.className === "button" ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), u.add(this);
            }
            l.x = e = this.getCrispAdjust(), l.y = (this.baseline ? -this.baselineOffset : 0) + e, l.width = Math.round(this.width), l.height = Math.round(this.height), this.box.attr(up(l, this.deferredAttr)), this.deferredAttr = {};
          }
        }
        updateTextPadding() {
          let e = this.text, a = e.styles.textAlign || this.textAlign;
          if (!e.textPath) {
            this.updateBoxSize();
            let l = this.baseline ? 0 : this.baselineOffset, n = (this.paddingLeft ?? this.padding) + ad(a) * (this.widthSetting ?? this.bBox.width);
            (n !== e.x || l !== e.y) && (e.attr({ align: a, x: n }), l !== void 0 && e.attr("y", l)), e.x = n, e.y = l;
          }
        }
        widthSetter(e) {
          this.widthSetting = Qn(e) ? e : void 0, this.doUpdate = !0;
        }
        getPaddedWidth() {
          let e = this.padding, a = Zn(this.paddingLeft, e), l = Zn(this.paddingRight, e);
          return (this.widthSetting || this.bBox.width || 0) + a + l;
        }
        xSetter(e) {
          this.x = e, this.alignFactor && (e -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0), this.xSetting = Math.round(e), this.attr("translateX", this.xSetting);
        }
        ySetter(e) {
          this.ySetting = this.y = Math.round(e), this.attr("translateY", this.ySetting);
        }
      }
      tl.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }, tl.textProps = ["color", "direction", "fontFamily", "fontSize", "fontStyle", "fontWeight", "lineClamp", "lineHeight", "textAlign", "textDecoration", "textOutline", "textOverflow", "whiteSpace", "width"];
      let { defined: ld, isNumber: dp, pick: el } = Mt;
      function nd(p, e, a, l, n) {
        let o = [];
        if (n) {
          let h = n.start || 0, u = n.end || 0, c = el(n.r, a), f = el(n.r, l || a), y = 2e-4 / (n.borderRadius ? 1 : Math.max(c, 1)), g = Math.abs(u - h - 2 * Math.PI) < y;
          g && (h = Math.PI / 2, u = 2.5 * Math.PI - y);
          let v = n.innerR, b = el(n.open, g), S = Math.cos(h), E = Math.sin(h), T = Math.cos(u), M = Math.sin(u), w = el(n.longArc, u - h - Math.PI < y ? 0 : 1), C = ["A", c, f, 0, w, el(n.clockwise, 1), p + c * T, e + f * M];
          C.params = { start: h, end: u, cx: p, cy: e }, o.push(["M", p + c * S, e + f * E], C), ld(v) && ((C = ["A", v, v, 0, w, ld(n.clockwise) ? 1 - n.clockwise : 0, p + v * S, e + v * E]).params = { start: u, end: h, cx: p, cy: e }, o.push(b ? ["M", p + v * T, e + v * M] : ["L", p + v * T, e + v * M], C)), b || o.push(["Z"]);
        }
        return o;
      }
      function rd(p, e, a, l, n) {
        return n != null && n.r ? Wh(p, e, a, l, n) : [["M", p, e], ["L", p + a, e], ["L", p + a, e + l], ["L", p, e + l], ["Z"]];
      }
      function Wh(p, e, a, l, n) {
        let o = (n == null ? void 0 : n.r) || 0;
        return [["M", p + o, e], ["L", p + a - o, e], ["A", o, o, 0, 0, 1, p + a, e + o], ["L", p + a, e + l - o], ["A", o, o, 0, 0, 1, p + a - o, e + l], ["L", p + o, e + l], ["A", o, o, 0, 0, 1, p, e + l - o], ["L", p, e + o], ["A", o, o, 0, 0, 1, p + o, e], ["Z"]];
      }
      let Kh = { arc: nd, callout: function(p, e, a, l, n) {
        let o = Math.min((n == null ? void 0 : n.r) || 0, a, l), h = o + 6, u = n == null ? void 0 : n.anchorX, c = (n == null ? void 0 : n.anchorY) || 0, f = Wh(p, e, a, l, { r: o });
        if (!dp(u) || u < a && u > 0 && c < l && c > 0) return f;
        if (p + u > a - h)
          if (c > e + h && c < e + l - h) f.splice(3, 1, ["L", p + a, c - 6], ["L", p + a + 6, c], ["L", p + a, c + 6], ["L", p + a, e + l - o]);
          else if (u < a) {
            let y = c < e + h, g = y ? e : e + l;
            f.splice(y ? 2 : 5, 0, ["L", u, c], ["L", p + a - o, g]);
          } else f.splice(3, 1, ["L", p + a, l / 2], ["L", u, c], ["L", p + a, l / 2], ["L", p + a, e + l - o]);
        else if (p + u < h)
          if (c > e + h && c < e + l - h) f.splice(7, 1, ["L", p, c + 6], ["L", p - 6, c], ["L", p, c - 6], ["L", p, e + o]);
          else if (u > 0) {
            let y = c < e + h, g = y ? e : e + l;
            f.splice(y ? 1 : 6, 0, ["L", u, c], ["L", p + o, g]);
          } else f.splice(7, 1, ["L", p, l / 2], ["L", u, c], ["L", p, l / 2], ["L", p, e + o]);
        else c > l && u < a - h ? f.splice(5, 1, ["L", u + 6, e + l], ["L", u, e + l + 6], ["L", u - 6, e + l], ["L", p + o, e + l]) : c < 0 && u > h && f.splice(1, 1, ["L", u - 6, e], ["L", u, e - 6], ["L", u + 6, e], ["L", a - o, e]);
        return f;
      }, circle: function(p, e, a, l) {
        return nd(p + a / 2, e + l / 2, a / 2, l / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: !1 });
      }, diamond: function(p, e, a, l) {
        return [["M", p + a / 2, e], ["L", p + a, e + l / 2], ["L", p + a / 2, e + l], ["L", p, e + l / 2], ["Z"]];
      }, rect: rd, roundedRect: Wh, square: rd, triangle: function(p, e, a, l) {
        return [["M", p + a / 2, e], ["L", p + a, e + l], ["L", p, e + l], ["Z"]];
      }, "triangle-down": function(p, e, a, l) {
        return [["M", p, e], ["L", p + a, e], ["L", p + a / 2, e + l], ["Z"]];
      } }, { doc: Fh, SVG_NS: fp, win: od } = Z, { attr: Ih, extend: pp, fireEvent: gp, isString: mp, objectEach: yp, pick: vp } = Mt, Vn = (p, e) => p.substring(0, e) + "…", Wn = class {
        constructor(p) {
          let e = p.styles;
          this.renderer = p.renderer, this.svgElement = p, this.width = p.textWidth, this.textLineHeight = e == null ? void 0 : e.lineHeight, this.textOutline = e == null ? void 0 : e.textOutline, this.ellipsis = (e == null ? void 0 : e.textOverflow) === "ellipsis", this.lineClamp = e == null ? void 0 : e.lineClamp, this.noWrap = (e == null ? void 0 : e.whiteSpace) === "nowrap";
        }
        buildSVG() {
          let p = this.svgElement, e = p.element, a = p.renderer, l = vp(p.textStr, "").toString(), n = l.indexOf("<") !== -1, o = e.childNodes, h = !p.added && a.box, u = [l, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, p.getStyle("font-size"), p.styles.lineClamp, this.width].join(",");
          if (u !== p.textCache) {
            p.textCache = u, delete p.actualWidth;
            for (let c = o.length; c--; ) e.removeChild(o[c]);
            if (n || this.ellipsis || this.width || p.textPath || l.indexOf(" ") !== -1 && (!this.noWrap || /<br.*?>/g.test(l))) {
              if (l !== "") {
                h && h.appendChild(e);
                let c = new ge(l);
                this.modifyTree(c.nodes), c.addToDOM(e), this.modifyDOM(), this.ellipsis && (e.textContent || "").indexOf("…") !== -1 && p.attr("title", this.unescapeEntities(p.textStr || "", ["&lt;", "&gt;"])), h && h.removeChild(e);
              }
            } else e.appendChild(Fh.createTextNode(this.unescapeEntities(l)));
            mp(this.textOutline) && p.applyTextOutline && p.applyTextOutline(this.textOutline);
          }
        }
        modifyDOM() {
          let p, e = this.svgElement, a = Ih(e.element, "x");
          for (e.firstLineMetrics = void 0; (p = e.element.firstChild) && /^[\s\u200B]*$/.test(p.textContent || " "); ) e.element.removeChild(p);
          [].forEach.call(e.element.querySelectorAll("tspan.highcharts-br"), (h, u) => {
            h.nextSibling && h.previousSibling && (u === 0 && h.previousSibling.nodeType === 1 && (e.firstLineMetrics = e.renderer.fontMetrics(h.previousSibling)), Ih(h, { dy: this.getLineHeight(h.nextSibling), x: a }));
          });
          let l = this.width || 0;
          if (!l) return;
          let n = (h, u) => {
            var E;
            let c = h.textContent || "", f = c.replace(/([^\^])-/g, "$1- ").split(" "), y = !this.noWrap && (f.length > 1 || e.element.childNodes.length > 1), g = this.getLineHeight(u), v = Math.max(0, l - 0.8 * g), b = 0, S = e.actualWidth;
            if (y) {
              let T = [], M = [];
              for (; u.firstChild && u.firstChild !== h; ) M.push(u.firstChild), u.removeChild(u.firstChild);
              for (; f.length; ) if (f.length && !this.noWrap && b > 0 && (T.push(h.textContent || ""), h.textContent = f.join(" ").replace(/- /g, "-")), this.truncate(h, void 0, f, b === 0 && S || 0, l, v, (w, C) => f.slice(0, C).join(" ").replace(/- /g, "-")), S = e.actualWidth, b++, this.lineClamp && b >= this.lineClamp) {
                f.length && (this.truncate(h, h.textContent || "", void 0, 0, l, v, Vn), h.textContent = ((E = h.textContent) == null ? void 0 : E.replace("…", "")) + "…");
                break;
              }
              M.forEach((w) => {
                u.insertBefore(w, h);
              }), T.forEach((w) => {
                u.insertBefore(Fh.createTextNode(w), h);
                let C = Fh.createElementNS(fp, "tspan");
                C.textContent = "​", Ih(C, { dy: g, x: a }), u.insertBefore(C, h);
              });
            } else this.ellipsis && c && this.truncate(h, c, void 0, 0, l, v, Vn);
          }, o = (h) => {
            [].slice.call(h.childNodes).forEach((u) => {
              u.nodeType === od.Node.TEXT_NODE ? n(u, h) : (u.className.baseVal.indexOf("highcharts-br") !== -1 && (e.actualWidth = 0), o(u));
            });
          };
          o(e.element);
        }
        getLineHeight(p) {
          let e = p.nodeType === od.Node.TEXT_NODE ? p.parentElement : p;
          return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(e || this.svgElement.element).h;
        }
        modifyTree(p) {
          let e = (a, l) => {
            let { attributes: n = {}, children: o, style: h = {}, tagName: u } = a, c = this.renderer.styledMode;
            if (u === "b" || u === "strong" ? c ? n.class = "highcharts-strong" : h.fontWeight = "bold" : (u === "i" || u === "em") && (c ? n.class = "highcharts-emphasized" : h.fontStyle = "italic"), h != null && h.color && (h.fill = h.color), u === "br") {
              n.class = "highcharts-br", a.textContent = "​";
              let f = p[l + 1];
              f != null && f.textContent && (f.textContent = f.textContent.replace(/^ +/gm, ""));
            } else u === "a" && o && o.some((f) => f.tagName === "#text") && (a.children = [{ children: o, tagName: "tspan" }]);
            u !== "#text" && u !== "a" && (a.tagName = "tspan"), pp(a, { attributes: n, style: h }), o && o.filter((f) => f.tagName !== "#text").forEach(e);
          };
          p.forEach(e), gp(this.svgElement, "afterModifyTree", { nodes: p });
        }
        truncate(p, e, a, l, n, o, h) {
          let u, c, f = this.svgElement, { rotation: y } = f, g = [], v = a && !l ? 1 : 0, b = (e || a || "").length, S = b;
          a || (n = o);
          let E = function(T, M) {
            let w = M || T, C = p.parentNode;
            if (C && g[w] === void 0 && C.getSubStringLength) try {
              g[w] = l + C.getSubStringLength(0, a ? w + 1 : w);
            } catch {
            }
            return g[w];
          };
          if (f.rotation = 0, l + (c = E(p.textContent.length)) > n) {
            for (; v <= b; ) S = Math.ceil((v + b) / 2), a && (u = h(a, S)), c = E(S, u && u.length - 1), v === b ? v = b + 1 : c > n ? b = S - 1 : v = S;
            b === 0 ? p.textContent = "" : e && b === e.length - 1 || (p.textContent = u || h(e || a, S)), this.ellipsis && c > n && this.truncate(p, p.textContent || "", void 0, 0, n, o, Vn);
          }
          a && a.splice(0, S), f.actualWidth = c, f.rotation = y;
        }
        unescapeEntities(p, e) {
          return yp(this.renderer.escapes, function(a, l) {
            e && e.indexOf(a) !== -1 || (p = p.toString().replace(RegExp(a, "g"), l));
          }), p;
        }
      }, { defaultOptions: bp } = zi, { charts: hd, deg2rad: Jh, doc: il, isFirefox: $h, isMS: tu, isWebKit: jl, noop: xp, SVG_NS: Sp, symbolSizes: eu, win: fo } = Z, { addEvent: Kn, attr: bs, createElement: Fn, crisp: ud, css: al, defined: xs, destroyObjectProperties: cd, extend: Wa, isArray: iu, isNumber: sl, isObject: Pl, isString: dd, merge: au, pick: su, pInt: Mp, replaceNested: Tp, uniqueKey: Ap } = Mt;
      class ri {
        constructor(e, a, l, n, o, h, u) {
          let c, f;
          this.x = 0, this.y = 0;
          let y = this.createElement("svg").attr({ version: "1.1", class: "highcharts-root" }), g = y.element;
          u || y.css(this.getStyle(n || {})), e.appendChild(g), bs(e, "dir", "ltr"), e.innerHTML.indexOf("xmlns") === -1 && bs(g, "xmlns", this.SVG_NS), this.box = g, this.boxWrapper = y, this.alignedObjects = [], this.url = this.getReferenceURL(), this.createElement("desc").add().element.appendChild(il.createTextNode("Created with Highcharts 12.2.0")), this.defs = this.createElement("defs").add(), this.allowHTML = h, this.forExport = o, this.styledMode = u, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.rootFontSize = y.getStyle("font-size"), this.setSize(a, l, !1), $h && e.getBoundingClientRect && ((c = function() {
            al(e, { left: 0, top: 0 }), f = e.getBoundingClientRect(), al(e, { left: Math.ceil(f.left) - f.left + "px", top: Math.ceil(f.top) - f.top + "px" });
          })(), this.unSubPixelFix = Kn(fo, "resize", c));
        }
        definition(e) {
          return new ge([e]).addToDOM(this.defs.element);
        }
        getReferenceURL() {
          if (($h || jl) && il.getElementsByTagName("base").length) {
            if (!xs(D)) {
              let e = Ap(), a = new ge([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: e }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": `url(#${e})`, fill: "rgba(0,0,0,0.001)" } }] }]).addToDOM(il.body);
              al(a, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              let l = il.elementFromPoint(6, 6);
              D = (l == null ? void 0 : l.id) === "hitme", il.body.removeChild(a);
            }
            if (D) return Tp(fo.location.href.split("#")[0], [/<[^>]*>/g, ""], [/([\('\)])/g, "\\$1"], [/ /g, "%20"]);
          }
          return "";
        }
        getStyle(e) {
          return this.style = Wa({ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontSize: "1rem" }, e), this.style;
        }
        setStyle(e) {
          this.boxWrapper.css(this.getStyle(e));
        }
        isHidden() {
          return !this.boxWrapper.getBBox().width;
        }
        destroy() {
          let e = this.defs;
          return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), cd(this.gradients || {}), this.gradients = null, this.defs = e.destroy(), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null, null;
        }
        createElement(e) {
          return new this.Element(this, e);
        }
        getRadialAttr(e, a) {
          return { cx: e[0] - e[2] / 2 + (a.cx || 0) * e[2], cy: e[1] - e[2] / 2 + (a.cy || 0) * e[2], r: (a.r || 0) * e[2] };
        }
        shadowDefinition(e) {
          let a = [`highcharts-drop-shadow-${this.chartIndex}`, ...Object.keys(e).map((n) => `${n}-${e[n]}`)].join("-").toLowerCase().replace(/[^a-z\d\-]/g, ""), l = au({ color: "#000000", offsetX: 1, offsetY: 1, opacity: 0.15, width: 5 }, e);
          return this.defs.element.querySelector(`#${a}`) || this.definition({ tagName: "filter", attributes: { id: a, filterUnits: l.filterUnits }, children: this.getShadowFilterContent(l) }), a;
        }
        getShadowFilterContent(e) {
          return [{ tagName: "feDropShadow", attributes: { dx: e.offsetX, dy: e.offsetY, "flood-color": e.color, "flood-opacity": Math.min(5 * e.opacity, 1), stdDeviation: e.width / 2 } }];
        }
        buildText(e) {
          new Wn(e).buildSVG();
        }
        getContrast(e) {
          let a = Oe.parse(e).rgba, l = " clamp(0,calc(9e9*(0.5 - (0.2126*r + 0.7152*g + 0.0722*b))),1)";
          if (sl(a[0]) || !Oe.useColorMix) {
            let n = a.map((h) => {
              let u = h / 255;
              return u <= 0.04 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
            }), o = 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
            return 1.05 / (o + 0.05) > (o + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
          }
          return "color(from " + e + " srgb" + l + l + l + ")";
        }
        button(e, a, l, n, o = {}, h, u, c, f, y) {
          let g = this.label(e, a, l, f, void 0, void 0, y, void 0, "button"), v = this.styledMode, b = arguments, S = 0;
          o = au(bp.global.buttonTheme, o), v && (delete o.fill, delete o.stroke, delete o["stroke-width"]);
          let E = o.states || {}, T = o.style || {};
          delete o.states, delete o.style;
          let M = [ge.filterUserAttributes(o)], w = [T];
          return v || ["hover", "select", "disabled"].forEach((C, B) => {
            M.push(au(M[0], ge.filterUserAttributes(b[B + 5] || E[C] || {}))), w.push(M[B + 1].style), delete M[B + 1].style;
          }), Kn(g.element, tu ? "mouseover" : "mouseenter", function() {
            S !== 3 && g.setState(1);
          }), Kn(g.element, tu ? "mouseout" : "mouseleave", function() {
            S !== 3 && g.setState(S);
          }), g.setState = (C = 0) => {
            if (C !== 1 && (g.state = S = C), g.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][C]), !v) {
              g.attr(M[C]);
              let B = w[C];
              Pl(B) && g.css(B);
            }
          }, g.attr(M[0]), !v && (g.css(Wa({ cursor: "default" }, T)), y && g.text.css({ pointerEvents: "none" })), g.on("touchstart", (C) => C.stopPropagation()).on("click", function(C) {
            S !== 3 && (n == null || n.call(g, C));
          });
        }
        crispLine(e, a) {
          let [l, n] = e;
          return xs(l[1]) && l[1] === n[1] && (l[1] = n[1] = ud(l[1], a)), xs(l[2]) && l[2] === n[2] && (l[2] = n[2] = ud(l[2], a)), e;
        }
        path(e) {
          let a = this.styledMode ? {} : { fill: "none" };
          return iu(e) ? a.d = e : Pl(e) && Wa(a, e), this.createElement("path").attr(a);
        }
        circle(e, a, l) {
          let n = Pl(e) ? e : e === void 0 ? {} : { x: e, y: a, r: l }, o = this.createElement("circle");
          return o.xSetter = o.ySetter = function(h, u, c) {
            c.setAttribute("c" + u, h);
          }, o.attr(n);
        }
        arc(e, a, l, n, o, h) {
          let u;
          Pl(e) ? (a = (u = e).y, l = u.r, n = u.innerR, o = u.start, h = u.end, e = u.x) : u = { innerR: n, start: o, end: h };
          let c = this.symbol("arc", e, a, l, l, u);
          return c.r = l, c;
        }
        rect(e, a, l, n, o, h) {
          let u = Pl(e) ? e : e === void 0 ? {} : { x: e, y: a, r: o, width: Math.max(l || 0, 0), height: Math.max(n || 0, 0) }, c = this.createElement("rect");
          return this.styledMode || (h !== void 0 && (u["stroke-width"] = h, Wa(u, c.crisp(u))), u.fill = "none"), c.rSetter = function(f, y, g) {
            c.r = f, bs(g, { rx: f, ry: f });
          }, c.rGetter = function() {
            return c.r || 0;
          }, c.attr(u);
        }
        roundedRect(e) {
          return this.symbol("roundedRect").attr(e);
        }
        setSize(e, a, l) {
          this.width = e, this.height = a, this.boxWrapper.animate({ width: e, height: a }, { step: function() {
            this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
          }, duration: su(l, !0) ? void 0 : 0 }), this.alignElements();
        }
        g(e) {
          let a = this.createElement("g");
          return e ? a.attr({ class: "highcharts-" + e }) : a;
        }
        image(e, a, l, n, o, h) {
          let u = { preserveAspectRatio: "none" };
          sl(a) && (u.x = a), sl(l) && (u.y = l), sl(n) && (u.width = n), sl(o) && (u.height = o);
          let c = this.createElement("image").attr(u), f = function(y) {
            c.attr({ href: e }), h.call(c, y);
          };
          if (h) {
            c.attr({ href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" });
            let y = new fo.Image();
            Kn(y, "load", f), y.src = e, y.complete && f({});
          } else c.attr({ href: e });
          return c;
        }
        symbol(e, a, l, n, o, h) {
          var T, M;
          let u, c, f, y, g = this, v = /^url\((.*?)\)$/, b = v.test(e), S = !b && (this.symbols[e] ? e : "circle"), E = S && this.symbols[S];
          if (E) typeof a == "number" && (c = E.call(this.symbols, a || 0, l || 0, n || 0, o || 0, h)), u = this.path(c), g.styledMode || u.attr("fill", "none"), Wa(u, { symbolName: S || void 0, x: a, y: l, width: n, height: o }), h && Wa(u, h);
          else if (b) {
            f = e.match(v)[1];
            let w = u = this.image(f);
            w.imgwidth = su(h == null ? void 0 : h.width, (T = eu[f]) == null ? void 0 : T.width), w.imgheight = su(h == null ? void 0 : h.height, (M = eu[f]) == null ? void 0 : M.height), y = (C) => C.attr({ width: C.width, height: C.height }), ["width", "height"].forEach((C) => {
              w[`${C}Setter`] = function(B, z) {
                this[z] = B;
                let { alignByTranslate: R, element: Y, width: H, height: j, imgwidth: W, imgheight: tt } = this, it = z === "width" ? W : tt, J = 1;
                h && h.backgroundSize === "within" && H && j && W && tt ? (J = Math.min(H / W, j / tt), bs(Y, { width: Math.round(W * J), height: Math.round(tt * J) })) : Y && it && Y.setAttribute(z, it), !R && W && tt && this.translate(((H || 0) - W * J) / 2, ((j || 0) - tt * J) / 2);
              };
            }), xs(a) && w.attr({ x: a, y: l }), w.isImg = !0, w.symbolUrl = e, xs(w.imgwidth) && xs(w.imgheight) ? y(w) : (w.attr({ width: 0, height: 0 }), Fn("img", { onload: function() {
              let C = hd[g.chartIndex];
              this.width === 0 && (al(this, { position: "absolute", top: "-999em" }), il.body.appendChild(this)), eu[f] = { width: this.width, height: this.height }, w.imgwidth = this.width, w.imgheight = this.height, w.element && y(w), this.parentNode && this.parentNode.removeChild(this), g.imgCount--, g.imgCount || !C || C.hasLoaded || C.onload();
            }, src: f }), this.imgCount++);
          }
          return u;
        }
        clipRect(e, a, l, n) {
          return this.rect(e, a, l, n, 0);
        }
        text(e, a, l, n) {
          let o = {};
          if (n && (this.allowHTML || !this.forExport)) return this.html(e, a, l);
          o.x = Math.round(a || 0), l && (o.y = Math.round(l)), xs(e) && (o.text = e);
          let h = this.createElement("text").attr(o);
          return n && (!this.forExport || this.allowHTML) || (h.xSetter = function(u, c, f) {
            let y = f.getElementsByTagName("tspan"), g = f.getAttribute(c);
            for (let v = 0, b; v < y.length; v++) (b = y[v]).getAttribute(c) === g && b.setAttribute(c, u);
            f.setAttribute(c, u);
          }), h;
        }
        fontMetrics(e) {
          let a = Mp(Fi.prototype.getStyle.call(e, "font-size") || 0), l = a < 24 ? a + 3 : Math.round(1.2 * a), n = Math.round(0.8 * l);
          return { h: l, b: n, f: a };
        }
        rotCorr(e, a, l) {
          let n = e;
          return a && l && (n = Math.max(n * Math.cos(a * Jh), 4)), { x: -e / 3 * Math.sin(a * Jh), y: n };
        }
        pathToSegments(e) {
          let a = [], l = [], n = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
          for (let o = 0; o < e.length; o++) dd(l[0]) && sl(e[o]) && l.length === n[l[0].toUpperCase()] && e.splice(o, 0, l[0].replace("M", "L").replace("m", "l")), typeof e[o] == "string" && (l.length && a.push(l.slice(0)), l.length = 0), l.push(e[o]);
          return a.push(l.slice(0)), a;
        }
        label(e, a, l, n, o, h, u, c, f) {
          return new tl(this, e, a, l, n, o, h, u, c, f);
        }
        alignElements() {
          this.alignedObjects.forEach((e) => e.align());
        }
      }
      Wa(ri.prototype, { Element: Fi, SVG_NS: Sp, escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: Kh, draw: xp }), Sa.registerRendererType("svg", ri, !0);
      let { composed: In, isFirefox: fd } = Z, { attr: pd, css: Ka, createElement: gd, defined: po, extend: Op, getAlignFactor: ql, isNumber: _l, pInt: Jn, pushUnique: lu } = Mt;
      function nu(p, e, a) {
        var n;
        let l = ((n = this.div) == null ? void 0 : n.style) || a.style;
        Fi.prototype[`${e}Setter`].call(this, p, e, a), l && (l[e] = p);
      }
      let ll = (p, e) => {
        var a;
        if (!p.div) {
          let l = pd(p.element, "class"), n = p.css, o = gd("div", l ? { className: l } : void 0, { position: "absolute", left: `${p.translateX || 0}px`, top: `${p.translateY || 0}px`, ...p.styles, display: p.display, opacity: p.opacity, visibility: p.visibility }, ((a = p.parentGroup) == null ? void 0 : a.div) || e);
          p.classSetter = (h, u, c) => {
            c.setAttribute("class", h), o.className = h;
          }, p.translateXSetter = p.translateYSetter = (h, u) => {
            p[u] = h, o.style[u === "translateX" ? "left" : "top"] = `${h}px`, p.doTransform = !0;
          }, p.opacitySetter = p.visibilitySetter = nu, p.css = (h) => (n.call(p, h), h.cursor && (o.style.cursor = h.cursor), h.pointerEvents && (o.style.pointerEvents = h.pointerEvents), p), p.on = function() {
            return Fi.prototype.on.apply({ element: o, onEvents: p.onEvents }, arguments), p;
          }, p.div = o;
        }
        return p.div;
      };
      class pa extends Fi {
        static compose(e) {
          lu(In, this.compose) && (e.prototype.html = function(a, l, n) {
            return new pa(this, "span").attr({ text: a, x: Math.round(l), y: Math.round(n) });
          });
        }
        constructor(e, a) {
          super(e, a), pa.useForeignObject ? this.foreignObject = e.createElement("foreignObject").attr({ zIndex: 2 }) : this.css({ position: "absolute", ...e.styledMode ? {} : { fontFamily: e.style.fontFamily, fontSize: e.style.fontSize } }), this.element.style.whiteSpace = "nowrap";
        }
        getSpanCorrection(e, a, l) {
          this.xCorr = -e * l, this.yCorr = -a;
        }
        css(e) {
          let a, { element: l } = this, n = l.tagName === "SPAN" && e && "width" in e, o = n && e.width;
          return n && (delete e.width, this.textWidth = Jn(o) || void 0, a = !0), (e == null ? void 0 : e.textOverflow) === "ellipsis" && (e.overflow = "hidden", e.whiteSpace = "nowrap"), e != null && e.lineClamp && (e.display = "-webkit-box", e.WebkitLineClamp = e.lineClamp, e.WebkitBoxOrient = "vertical", e.overflow = "hidden"), _l(Number(e == null ? void 0 : e.fontSize)) && (e.fontSize += "px"), Op(this.styles, e), Ka(l, e), a && this.updateTransform(), this;
        }
        htmlGetBBox() {
          let { element: e } = this;
          return { x: e.offsetLeft, y: e.offsetTop, width: e.offsetWidth, height: e.offsetHeight };
        }
        updateTransform() {
          var w;
          if (!this.added) {
            this.alignOnAdd = !0;
            return;
          }
          let { element: e, foreignObject: a, oldTextWidth: l, renderer: n, rotation: o, rotationOriginX: h, rotationOriginY: u, scaleX: c, scaleY: f, styles: { display: y = "inline-block", whiteSpace: g }, textAlign: v = "left", textWidth: b, translateX: S = 0, translateY: E = 0, x: T = 0, y: M = 0 } = this;
          if (a || Ka(e, { marginLeft: `${S}px`, marginTop: `${E}px` }), e.tagName === "SPAN") {
            let C, B = [o, v, e.innerHTML, b, this.textAlign].join(","), z = -(((w = this.parentGroup) == null ? void 0 : w.padding) * 1) || 0;
            if (b !== l) {
              let j = this.textPxLength ? this.textPxLength : (Ka(e, { width: "", whiteSpace: g || "nowrap" }), e.offsetWidth), W = b || 0, tt = e.style.textOverflow === "" && e.style.webkitLineClamp;
              (W > l || j > W || tt) && (/[\-\s\u00AD]/.test(e.textContent || e.innerText) || e.style.textOverflow === "ellipsis") && (Ka(e, { width: (o || c || j > W || tt) && _l(b) ? b + "px" : "auto", display: y, whiteSpace: g || "normal" }), this.oldTextWidth = b);
            }
            a && (Ka(e, { display: "inline-block", verticalAlign: "top" }), a.attr({ width: n.width, height: n.height })), B !== this.cTT && (C = n.fontMetrics(e).b, po(o) && !a && (o !== (this.oldRotation || 0) || v !== this.oldAlign) && Ka(e, { transform: `rotate(${o}deg)`, transformOrigin: `${z}% ${z}px` }), this.getSpanCorrection(!po(o) && !this.textWidth && this.textPxLength || e.offsetWidth, C, ql(v)));
            let { xCorr: R = 0, yCorr: Y = 0 } = this, H = { left: `${T + R}px`, top: `${M + Y}px`, textAlign: v, transformOrigin: `${(h ?? T) - R - T - z}px ${(u ?? M) - Y - M - z}px` };
            (c || f) && (H.transform = `scale(${c ?? 1},${f ?? 1})`), a ? (super.updateTransform(), _l(T) && _l(M) ? (a.attr({ x: T + R, y: M + Y, width: e.offsetWidth + 3, height: e.offsetHeight, "transform-origin": e.getAttribute("transform-origin") || "0 0" }), Ka(e, { display: y, textAlign: v })) : fd && a.attr({ width: 0, height: 0 })) : Ka(e, H), this.cTT = B, this.oldRotation = o, this.oldAlign = v;
          }
        }
        add(e) {
          let { foreignObject: a, renderer: l } = this, n = l.box.parentNode, o = [];
          if (a) a.add(e), super.add(l.createElement("body").attr({ xmlns: "http://www.w3.org/1999/xhtml" }).css({ background: "transparent", margin: "0 3px 0 0" }).add(a));
          else {
            let h;
            if (this.parentGroup = e, e && !(h = e.div)) {
              let u = e;
              for (; u; ) o.push(u), u = u.parentGroup;
              for (let c of o.reverse()) h = ll(c, n);
            }
            (h || n).appendChild(this.element);
          }
          return this.added = !0, this.alignOnAdd && this.updateTransform(), this;
        }
        textSetter(e) {
          e !== this.textStr && (delete this.bBox, delete this.oldTextWidth, ge.setElementHTML(this.element, e ?? ""), this.textStr = e, this.doTransform = !0);
        }
        alignSetter(e) {
          this.alignValue = this.textAlign = e, this.doTransform = !0;
        }
        xSetter(e, a) {
          this[a] = e, this.doTransform = !0;
        }
      }
      let Fa = pa.prototype;
      Fa.visibilitySetter = Fa.opacitySetter = nu, Fa.ySetter = Fa.rotationSetter = Fa.rotationOriginXSetter = Fa.rotationOriginYSetter = Fa.xSetter, function(p) {
        p.xAxis = { alignTicks: !0, allowDecimals: void 0, panningEnabled: !0, zIndex: 2, zoomEnabled: !0, dateTimeLabelFormats: { millisecond: { main: "%[HMSL]", range: !1 }, second: { main: "%[HMS]", range: !1 }, minute: { main: "%[HM]", range: !1 }, hour: { main: "%[HM]", range: !1 }, day: { main: "%[eb]" }, week: { main: "%[eb]" }, month: { main: "%[bY]" }, year: { main: "%Y" } }, endOnTick: !1, gridLineDashStyle: "Solid", gridZIndex: 1, labels: { autoRotationLimit: 80, distance: 15, enabled: !0, indentation: 10, overflow: "justify", reserveSpace: void 0, rotation: void 0, staggerLines: 0, step: 0, useHTML: !1, zIndex: 7, style: { color: "#333333", cursor: "default", fontSize: "0.8em", textOverflow: "ellipsis" } }, maxPadding: 0.01, minorGridLineDashStyle: "Solid", minorTickLength: 2, minorTickPosition: "outside", minorTicksPerMajor: 5, minPadding: 0.01, offset: void 0, reversed: void 0, reversedStacks: !1, showEmpty: !0, showFirstLabel: !0, showLastLabel: !0, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", useHTML: !1, x: 0, y: 0, style: { color: "#666666", fontSize: "0.8em" } }, visible: !0, minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#333333", lineWidth: 1, gridLineColor: "#e6e6e6", gridLineWidth: void 0, tickColor: "#333333" }, p.yAxis = { reversedStacks: !0, endOnTick: !0, maxPadding: 0.05, minPadding: 0.05, tickPixelInterval: 72, showLastLabel: !0, labels: { x: void 0 }, startOnTick: !0, title: {}, stackLabels: { animation: {}, allowOverlap: !1, enabled: !1, crop: !0, overflow: "justify", formatter: function() {
          let { numberFormatter: e } = this.axis.chart;
          return e(this.total || 0, -1);
        }, style: { color: "#000000", fontSize: "0.7em", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 };
      }(lt || (lt = {}));
      let md = lt, { addEvent: nl, isFunction: yd, objectEach: vd, removeEvent: bd } = Mt;
      (ct || (ct = {})).registerEventOptions = function(p, e) {
        p.eventOptions = p.eventOptions || {}, vd(e.events, function(a, l) {
          p.eventOptions[l] !== a && (p.eventOptions[l] && (bd(p, l, p.eventOptions[l]), delete p.eventOptions[l]), yd(a) && (p.eventOptions[l] = a, nl(p, l, a, { order: 0 })));
        });
      };
      let go = ct, { deg2rad: ru } = Z, { clamp: Ep, correctFloat: $n, defined: mo, destroyObjectProperties: ou, extend: Ii, fireEvent: Ql, getAlignFactor: Ji, isNumber: pi, merge: Zl, objectEach: hu, pick: Ni } = Mt, Ia = class {
        constructor(p, e, a, l, n) {
          this.isNew = !0, this.isNewLabel = !0, this.axis = p, this.pos = e, this.type = a || "", this.parameters = n || {}, this.tickmarkOffset = this.parameters.tickmarkOffset, this.options = this.parameters.options, Ql(this, "init"), a || l || this.addLabel();
        }
        addLabel() {
          var Y;
          let p = this, e = p.axis, a = e.options, l = e.chart, n = e.categories, o = e.logarithmic, h = e.names, u = p.pos, c = Ni((Y = p.options) == null ? void 0 : Y.labels, a.labels), f = e.tickPositions, y = u === f[0], g = u === f[f.length - 1], v = (!c.step || c.step === 1) && e.tickInterval === 1, b = f.info, S = p.label, E, T, M, w = this.parameters.category || (n ? Ni(n[u], h[u], u) : u);
          o && pi(w) && (w = $n(o.lin2log(w))), e.dateTime && (b ? E = (T = l.time.resolveDTLFormat(a.dateTimeLabelFormats[!a.grid && b.higherRanks[u] || b.unitName])).main : pi(w) && (E = e.dateTime.getXDateFormat(w, a.dateTimeLabelFormats || {}))), p.isFirst = y, p.isLast = g;
          let C = { axis: e, chart: l, dateTimeLabelFormat: E, isFirst: y, isLast: g, pos: u, tick: p, tickPositionInfo: b, value: w };
          Ql(this, "labelFormat", C);
          let B = (H) => c.formatter ? c.formatter.call(H, H) : c.format ? (H.text = e.defaultLabelFormatter.call(H), Ri.format(c.format, H, l)) : e.defaultLabelFormatter.call(H), z = B.call(C, C), R = T == null ? void 0 : T.list;
          R ? p.shortenLabel = function() {
            for (M = 0; M < R.length; M++) if (Ii(C, { dateTimeLabelFormat: R[M] }), S.attr({ text: B.call(C, C) }), S.getBBox().width < e.getSlotWidth(p) - 2 * (c.padding || 0)) return;
            S.attr({ text: "" });
          } : p.shortenLabel = void 0, v && e._addedPlotLB && p.moveLabel(z, c), mo(S) || p.movedLabel ? S && S.textStr !== z && !v && (!S.textWidth || c.style.width || S.styles.width || S.css({ width: null }), S.attr({ text: z }), S.textPxLength = S.getBBox().width) : (p.label = S = p.createLabel(z, c), p.rotation = 0);
        }
        createLabel(p, e, a) {
          let l = this.axis, { renderer: n, styledMode: o } = l.chart, h = e.style.whiteSpace, u = mo(p) && e.enabled ? n.text(p, a == null ? void 0 : a.x, a == null ? void 0 : a.y, e.useHTML).add(l.labelGroup) : void 0;
          return u && (o || u.css(Zl(e.style)), u.textPxLength = u.getBBox().width, !o && h && u.css({ whiteSpace: h })), u;
        }
        destroy() {
          ou(this, this.axis);
        }
        getPosition(p, e, a, l) {
          let n = this.axis, o = n.chart, h = l && o.oldChartHeight || o.chartHeight, u = { x: p ? $n(n.translate(e + a, void 0, void 0, l) + n.transB) : n.left + n.offset + (n.opposite ? (l && o.oldChartWidth || o.chartWidth) - n.right - n.left : 0), y: p ? h - n.bottom + n.offset - (n.opposite ? n.height : 0) : $n(h - n.translate(e + a, void 0, void 0, l) - n.transB) };
          return u.y = Ep(u.y, -1e9, 1e9), Ql(this, "afterGetPosition", { pos: u }), u;
        }
        getLabelPosition(p, e, a, l, n, o, h, u) {
          let c, f, y = this.axis, g = y.transA, v = y.isLinked && y.linkedParent ? y.linkedParent.reversed : y.reversed, b = y.staggerLines, S = y.tickRotCorr || { x: 0, y: 0 }, E = l || y.reserveSpaceDefault ? 0 : -y.labelOffset * (y.labelAlign === "center" ? 0.5 : 1), T = n.distance, M = {};
          return c = y.side === 0 ? a.rotation ? -T : -a.getBBox().height : y.side === 2 ? S.y + T : Math.cos(a.rotation * ru) * (S.y - a.getBBox(!1, 0).height / 2), mo(n.y) && (c = y.side === 0 && y.horiz ? n.y + c : n.y), p = p + Ni(n.x, [0, 1, 0, -1][y.side] * T) + E + S.x - (o && l ? o * g * (v ? -1 : 1) : 0), e = e + c - (o && !l ? o * g * (v ? 1 : -1) : 0), b && (f = h / (u || 1) % b, y.opposite && (f = b - f - 1), e += f * (y.labelOffset / b)), M.x = p, M.y = Math.round(e), Ql(this, "afterGetLabelPosition", { pos: M, tickmarkOffset: o, index: h }), M;
        }
        getLabelSize() {
          return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
        }
        getMarkPath(p, e, a, l, n = !1, o) {
          return o.crispLine([["M", p, e], ["L", p + (n ? 0 : -a), e + (n ? a : 0)]], l);
        }
        handleOverflow(p) {
          var T;
          let e = this.axis, a = e.options.labels, l = p.x, n = e.chart.chartWidth, o = e.chart.spacing, h = Ni(e.labelLeft, Math.min(e.pos, o[3])), u = Ni(e.labelRight, Math.max(e.isRadial ? 0 : e.pos + e.len, n - o[1])), c = this.label, f = this.rotation, y = Ji(e.labelAlign || c.attr("align")), g = c.getBBox().width, v = e.getSlotWidth(this), b = v, S = 1, E;
          f || a.overflow !== "justify" ? f < 0 && l - y * g < h ? E = Math.round(l / Math.cos(f * ru) - h) : f > 0 && l + y * g > u && (E = Math.round((n - l) / Math.cos(f * ru))) : (l - y * g < h ? b = p.x + b * (1 - y) - h : l + (1 - y) * g > u && (b = u - p.x + b * y, S = -1), (b = Math.min(v, b)) < v && e.labelAlign === "center" && (p.x += S * (v - b - y * (v - Math.min(g, b)))), (g > b || e.autoRotation && ((T = c == null ? void 0 : c.styles) != null && T.width)) && (E = b)), E && c && (this.shortenLabel ? this.shortenLabel() : c.css(Ii({}, { width: Math.floor(E) + "px", lineClamp: +!e.isRadial })));
        }
        moveLabel(p, e) {
          let a = this, l = a.label, n = a.axis, o = !1, h;
          l && l.textStr === p ? (a.movedLabel = l, o = !0, delete a.label) : hu(n.ticks, function(u) {
            o || u.isNew || u === a || !u.label || u.label.textStr !== p || (a.movedLabel = u.label, o = !0, u.labelPos = a.movedLabel.xy, delete u.label);
          }), !o && (a.labelPos || l) && (h = a.labelPos || l.xy, a.movedLabel = a.createLabel(p, e, h), a.movedLabel && a.movedLabel.attr({ opacity: 0 }));
        }
        render(p, e, a) {
          var S;
          let l = this.axis, n = l.horiz, o = this.pos, h = Ni(this.tickmarkOffset, l.tickmarkOffset), u = this.getPosition(n, o, h, e), c = u.x, f = u.y, y = l.pos, g = y + l.len, v = n ? c : f, b = Ni(a, (S = this.label) == null ? void 0 : S.newOpacity, 1);
          !l.chart.polar && ($n(v) < y || v > g) && (a = 0), a ?? (a = 1), this.isActive = !0, this.renderGridLine(e, a), this.renderMark(u, a), this.renderLabel(u, e, b, p), this.isNew = !1, Ql(this, "afterRender");
        }
        renderGridLine(p, e) {
          let a = this.axis, l = a.options, n = {}, o = this.pos, h = this.type, u = Ni(this.tickmarkOffset, a.tickmarkOffset), c = a.chart.renderer, f = this.gridLine, y, g = l.gridLineWidth, v = l.gridLineColor, b = l.gridLineDashStyle;
          this.type === "minor" && (g = l.minorGridLineWidth, v = l.minorGridLineColor, b = l.minorGridLineDashStyle), f || (a.chart.styledMode || (n.stroke = v, n["stroke-width"] = g || 0, n.dashstyle = b), h || (n.zIndex = 1), p && (e = 0), this.gridLine = f = c.path().attr(n).addClass("highcharts-" + (h ? h + "-" : "") + "grid-line").add(a.gridGroup)), f && (y = a.getPlotLinePath({ value: o + u, lineWidth: f.strokeWidth(), force: "pass", old: p, acrossPanes: !1 })) && f[p || this.isNew ? "attr" : "animate"]({ d: y, opacity: e });
        }
        renderMark(p, e) {
          let a = this.axis, l = a.options, n = a.chart.renderer, o = this.type, h = a.tickSize(o ? o + "Tick" : "tick"), u = p.x, c = p.y, f = Ni(l[o !== "minor" ? "tickWidth" : "minorTickWidth"], !o && a.isXAxis ? 1 : 0), y = l[o !== "minor" ? "tickColor" : "minorTickColor"], g = this.mark, v = !g;
          h && (a.opposite && (h[0] = -h[0]), g || (this.mark = g = n.path().addClass("highcharts-" + (o ? o + "-" : "") + "tick").add(a.axisGroup), a.chart.styledMode || g.attr({ stroke: y, "stroke-width": f })), g[v ? "attr" : "animate"]({ d: this.getMarkPath(u, c, h[0], g.strokeWidth(), a.horiz, n), opacity: e }));
        }
        renderLabel(p, e, a, l) {
          let n = this.axis, o = n.horiz, h = n.options, u = this.label, c = h.labels, f = c.step, y = Ni(this.tickmarkOffset, n.tickmarkOffset), g = p.x, v = p.y, b = !0;
          u && pi(g) && (u.xy = p = this.getLabelPosition(g, v, u, o, c, y, l, f), (!this.isFirst || this.isLast || h.showFirstLabel) && (!this.isLast || this.isFirst || h.showLastLabel) ? !o || c.step || c.rotation || e || a === 0 || this.handleOverflow(p) : b = !1, f && l % f && (b = !1), b && pi(p.y) ? (p.opacity = a, u[this.isNewLabel ? "attr" : "animate"](p).show(!0), this.isNewLabel = !1) : (u.hide(), this.isNewLabel = !0));
        }
        replaceMovedLabel() {
          let p = this.label, e = this.axis;
          p && !this.isNew && (p.animate({ opacity: 0 }, void 0, p.destroy), delete this.label), e.isDirty = !0, this.label = this.movedLabel, delete this.movedLabel;
        }
      }, { animObject: uu } = We, { xAxis: rl, yAxis: xd } = md, { defaultOptions: Vl } = zi, { registerEventOptions: Wl } = go, { deg2rad: wp } = Z, { arrayMax: bi, arrayMin: cu, clamp: ga, correctFloat: xi, defined: ae, destroyObjectProperties: ol, erase: yo, error: tr, extend: Ja, fireEvent: ne, getClosestDistance: er, insertItem: vo, isArray: Bi, isNumber: gt, isString: Ss, merge: $i, normalizeTickInterval: $a, objectEach: Ma, pick: Ut, relativeLength: Kl, removeEvent: du, splat: gi, syncTimeout: De } = Mt, $t = (p, e) => $a(e, void 0, void 0, Ut(p.options.allowDecimals, e < 0.5 || p.tickAmount !== void 0), !!p.tickAmount);
      Ja(Vl, { xAxis: rl, yAxis: $i(rl, xd) });
      class ta {
        constructor(e, a, l) {
          this.init(e, a, l);
        }
        init(e, a, l = this.coll) {
          let n = l === "xAxis", o = this.isZAxis || (e.inverted ? !n : n);
          this.chart = e, this.horiz = o, this.isXAxis = n, this.coll = l, ne(this, "init", { userOptions: a }), this.opposite = Ut(a.opposite, this.opposite), this.side = Ut(a.side, this.side, o ? 2 * !this.opposite : this.opposite ? 1 : 3), this.setOptions(a);
          let h = this.options, u = h.labels;
          this.type ?? (this.type = h.type || "linear"), this.uniqueNames ?? (this.uniqueNames = h.uniqueNames ?? !0), ne(this, "afterSetType"), this.userOptions = a, this.minPixelPadding = 0, this.reversed = Ut(h.reversed, this.reversed), this.visible = h.visible, this.zoomEnabled = h.zoomEnabled, this.hasNames = this.type === "category" || h.categories === !0, this.categories = Bi(h.categories) && h.categories || (this.hasNames ? [] : void 0), this.names || (this.names = [], this.names.keys = {}), this.plotLinesAndBandsGroups = {}, this.positiveValuesOnly = !!this.logarithmic, this.isLinked = ae(h.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len ?? (this.len = 0), this.minRange = this.userMinRange = h.minRange || h.maxZoom, this.range = h.range, this.offset = h.offset || 0, this.max = void 0, this.min = void 0;
          let c = Ut(h.crosshair, gi(e.options.tooltip.crosshairs)[+!n]);
          this.crosshair = c === !0 ? {} : c, e.axes.indexOf(this) === -1 && (n ? e.axes.splice(e.xAxis.length, 0, this) : e.axes.push(this), vo(this, e[this.coll])), e.orderItems(this.coll), this.series = this.series || [], e.inverted && !this.isZAxis && n && !ae(this.reversed) && (this.reversed = !0), this.labelRotation = gt(u.rotation) ? u.rotation : void 0, Wl(this, h), ne(this, "afterInit");
        }
        setOptions(e) {
          let a = this.horiz ? { labels: { autoRotation: [-45], padding: 3 }, margin: 15 } : { labels: { padding: 1 }, title: { rotation: 90 * this.side } };
          this.options = $i(a, this.coll === "yAxis" ? { title: { text: this.chart.options.lang.yAxisTitle } } : {}, Vl[this.coll], e), ne(this, "afterSetOptions", { userOptions: e });
        }
        defaultLabelFormatter() {
          let e = this.axis, { numberFormatter: a } = this.chart, l = gt(this.value) ? this.value : NaN, n = e.chart.time, o = e.categories, h = this.dateTimeLabelFormat, u = Vl.lang, c = u.numericSymbols, f = u.numericSymbolMagnitude || 1e3, y = e.logarithmic ? Math.abs(l) : e.tickInterval, g = c == null ? void 0 : c.length, v, b;
          if (o) b = `${this.value}`;
          else if (h) b = n.dateFormat(h, l, !0);
          else if (g && c && y >= 1e3) for (; g-- && b === void 0; ) y >= (v = Math.pow(f, g + 1)) && 10 * l % v == 0 && c[g] !== null && l !== 0 && (b = a(l / v, -1) + c[g]);
          return b === void 0 && (b = Math.abs(l) >= 1e4 ? a(l, -1) : a(l, -1, void 0, "")), b;
        }
        getSeriesExtremes() {
          let e, a = this;
          ne(this, "getSeriesExtremes", null, function() {
            a.hasVisibleSeries = !1, a.dataMin = a.dataMax = a.threshold = void 0, a.softThreshold = !a.isXAxis, a.series.forEach((l) => {
              if (l.reserveSpace()) {
                let n = l.options, o, h = n.threshold, u, c;
                if (a.hasVisibleSeries = !0, a.positiveValuesOnly && 0 >= (h || 0) && (h = void 0), a.isXAxis) (o = l.getColumn("x")).length && (o = a.logarithmic ? o.filter((f) => f > 0) : o, u = (e = l.getXExtremes(o)).min, c = e.max, gt(u) || u instanceof Date || (o = o.filter(gt), u = (e = l.getXExtremes(o)).min, c = e.max), o.length && (a.dataMin = Math.min(Ut(a.dataMin, u), u), a.dataMax = Math.max(Ut(a.dataMax, c), c)));
                else {
                  let f = l.applyExtremes();
                  gt(f.dataMin) && (u = f.dataMin, a.dataMin = Math.min(Ut(a.dataMin, u), u)), gt(f.dataMax) && (c = f.dataMax, a.dataMax = Math.max(Ut(a.dataMax, c), c)), ae(h) && (a.threshold = h), (!n.softThreshold || a.positiveValuesOnly) && (a.softThreshold = !1);
                }
              }
            });
          }), ne(this, "afterGetSeriesExtremes");
        }
        translate(e, a, l, n, o, h) {
          var E;
          let u = this.linkedParent || this, c = n && u.old ? u.old.min : u.min;
          if (!gt(c)) return NaN;
          let f = u.minPixelPadding, y = (u.isOrdinal || ((E = u.brokenAxis) == null ? void 0 : E.hasBreaks) || u.logarithmic && o) && u.lin2val, g = 1, v = 0, b = n && u.old ? u.old.transA : u.transA, S = 0;
          return b || (b = u.transA), l && (g *= -1, v = u.len), u.reversed && (g *= -1, v -= g * (u.sector || u.len)), a ? (S = (e = e * g + v - f) / b + c, y && (S = u.lin2val(S))) : (y && (e = u.val2lin(e)), S = g * (e - c) * b + v + g * f + (gt(h) ? b * h : 0), u.isRadial || (S = xi(S))), S;
        }
        toPixels(e, a) {
          var l;
          return this.translate(((l = this.chart) == null ? void 0 : l.time.parse(e)) ?? NaN, !1, !this.horiz, void 0, !0) + (a ? 0 : this.pos);
        }
        toValue(e, a) {
          return this.translate(e - (a ? 0 : this.pos), !0, !this.horiz, void 0, !0);
        }
        getPlotLinePath(e) {
          let a = this, l = a.chart, n = a.left, o = a.top, h = e.old, u = e.value, c = e.lineWidth, f = h && l.oldChartHeight || l.chartHeight, y = h && l.oldChartWidth || l.chartWidth, g = a.transB, v = e.translatedValue, b = e.force, S, E, T, M, w;
          function C(z, R, Y) {
            return b !== "pass" && (z < R || z > Y) && (b ? z = ga(z, R, Y) : w = !0), z;
          }
          let B = { value: u, lineWidth: c, old: h, force: b, acrossPanes: e.acrossPanes, translatedValue: v };
          return ne(this, "getPlotLinePath", B, function(z) {
            S = T = (v = ga(v = Ut(v, a.translate(u, void 0, void 0, h)), -1e9, 1e9)) + g, E = M = f - v - g, gt(v) ? a.horiz ? (E = o, M = f - a.bottom + (a.options.isInternal ? 0 : l.scrollablePixelsY || 0), S = T = C(S, n, n + a.width)) : (S = n, T = y - a.right + (l.scrollablePixelsX || 0), E = M = C(E, o, o + a.height)) : (w = !0, b = !1), z.path = w && !b ? void 0 : l.renderer.crispLine([["M", S, E], ["L", T, M]], c || 1);
          }), B.path;
        }
        getLinearTickPositions(e, a, l) {
          let n, o, h, u = xi(Math.floor(a / e) * e), c = xi(Math.ceil(l / e) * e), f = [];
          if (xi(u + e) === u && (h = 20), this.single) return [a];
          for (n = u; n <= c && (f.push(n), (n = xi(n + e, h)) !== o); ) o = n;
          return f;
        }
        getMinorTickInterval() {
          let { minorTicks: e, minorTickInterval: a } = this.options;
          return e === !0 ? Ut(a, "auto") : e !== !1 ? a : void 0;
        }
        getMinorTickPositions() {
          var y;
          let e = this.options, a = this.tickPositions, l = this.minorTickInterval, n = this.pointRangePadding || 0, o = (this.min || 0) - n, h = (this.max || 0) + n, u = (y = this.brokenAxis) != null && y.hasBreaks ? this.brokenAxis.unitLength : h - o, c = [], f;
          if (u && u / l < this.len / 3) {
            let g = this.logarithmic;
            if (g) this.paddedTicks.forEach(function(v, b, S) {
              b && c.push.apply(c, g.getLogTickPositions(l, S[b - 1], S[b], !0));
            });
            else if (this.dateTime && this.getMinorTickInterval() === "auto") c = c.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(l), o, h, e.startOfWeek));
            else for (f = o + (a[0] - o) % l; f <= h && f !== c[0]; f += l) c.push(f);
          }
          return c.length !== 0 && this.trimTicks(c), c;
        }
        adjustForMinRange() {
          let e = this.options, a = this.logarithmic, l = this.chart.time, { max: n, min: o, minRange: h } = this, u, c, f, y;
          this.isXAxis && h === void 0 && !a && (h = ae(e.min) || ae(e.max) || ae(e.floor) || ae(e.ceiling) ? null : Math.min(5 * (er(this.series.map((g) => {
            let v = g.getColumn("x");
            return g.xIncrement ? v.slice(0, 2) : v;
          })) || 0), this.dataMax - this.dataMin)), gt(n) && gt(o) && gt(h) && n - o < h && (c = this.dataMax - this.dataMin >= h, u = (h - n + o) / 2, f = [o - u, l.parse(e.min) ?? o - u], c && (f[2] = a ? a.log2lin(this.dataMin) : this.dataMin), y = [(o = bi(f)) + h, l.parse(e.max) ?? o + h], c && (y[2] = a ? a.log2lin(this.dataMax) : this.dataMax), (n = cu(y)) - o < h && (f[0] = n - h, f[1] = l.parse(e.min) ?? n - h, o = bi(f))), this.minRange = h, this.min = o, this.max = n;
        }
        getClosest() {
          let e, a;
          if (this.categories) a = 1;
          else {
            let l = [];
            this.series.forEach(function(n) {
              let o = n.closestPointRange, h = n.getColumn("x");
              h.length === 1 ? l.push(h[0]) : n.sorted && ae(o) && n.reserveSpace() && (a = ae(a) ? Math.min(a, o) : o);
            }), l.length && (l.sort((n, o) => n - o), e = er([l]));
          }
          return e && a ? Math.min(e, a) : e || a;
        }
        nameToX(e) {
          let a = Bi(this.options.categories), l = a ? this.categories : this.names, n = e.options.x, o;
          return e.series.requireSorting = !1, ae(n) || (n = this.uniqueNames && l ? a ? l.indexOf(e.name) : Ut(l.keys[e.name], -1) : e.series.autoIncrement()), n === -1 ? !a && l && (o = l.length) : gt(n) && (o = n), o !== void 0 ? (this.names[o] = e.name, this.names.keys[e.name] = o) : e.x && (o = e.x), o;
        }
        updateNames() {
          let e = this, a = this.names;
          a.length > 0 && (Object.keys(a.keys).forEach(function(l) {
            delete a.keys[l];
          }), a.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach((l) => {
            l.xIncrement = null, (!l.points || l.isDirtyData) && (e.max = Math.max(e.max || 0, l.dataTable.rowCount - 1), l.processData(), l.generatePoints());
            let n = l.getColumn("x").slice();
            l.data.forEach((o, h) => {
              let u = n[h];
              o != null && o.options && o.name !== void 0 && (u = e.nameToX(o)) !== void 0 && u !== o.x && (n[h] = o.x = u);
            }), l.dataTable.setColumn("x", n);
          }));
        }
        setAxisTranslation() {
          var v;
          let e = this, a = e.max - e.min, l = e.linkedParent, n = !!e.categories, o = e.isXAxis, h = e.axisPointRange || 0, u, c = 0, f = 0, y, g = e.transA;
          (o || n || h) && (u = e.getClosest(), l ? (c = l.minPointOffset, f = l.pointRangePadding) : e.series.forEach(function(b) {
            let S = n ? 1 : o ? Ut(b.options.pointRange, u, 0) : e.axisPointRange || 0, E = b.options.pointPlacement;
            if (h = Math.max(h, S), !e.single || n) {
              let T = b.is("xrange") ? !o : o;
              c = Math.max(c, T && Ss(E) ? 0 : S / 2), f = Math.max(f, T && E === "on" ? 0 : S);
            }
          }), y = (v = e.ordinal) != null && v.slope && u ? e.ordinal.slope / u : 1, e.minPointOffset = c *= y, e.pointRangePadding = f *= y, e.pointRange = Math.min(h, e.single && n ? 1 : a), o && (e.closestPointRange = u)), e.translationSlope = e.transA = g = e.staticScale || e.len / (a + f || 1), e.transB = e.horiz ? e.left : e.bottom, e.minPixelPadding = g * c, ne(this, "afterSetAxisTranslation");
        }
        minFromRange() {
          let { max: e, min: a } = this;
          return gt(e) && gt(a) && e - a || void 0;
        }
        setTickInterval(e) {
          var nt, Ct, ht, wt;
          let { categories: a, chart: l, dataMax: n, dataMin: o, dateTime: h, isXAxis: u, logarithmic: c, options: f, softThreshold: y } = this, g = l.time, v = gt(this.threshold) ? this.threshold : void 0, b = this.minRange || 0, { ceiling: S, floor: E, linkedTo: T, softMax: M, softMin: w } = f, C = gt(T) && ((nt = l[this.coll]) == null ? void 0 : nt[T]), B = f.tickPixelInterval, z = f.maxPadding, R = f.minPadding, Y = 0, H, j = gt(f.tickInterval) && f.tickInterval >= 0 ? f.tickInterval : void 0, W, tt, it, J;
          if (h || a || C || this.getTickAmount(), it = Ut(this.userMin, g.parse(f.min)), J = Ut(this.userMax, g.parse(f.max)), C ? (this.linkedParent = C, H = C.getExtremes(), this.min = Ut(H.min, H.dataMin), this.max = Ut(H.max, H.dataMax), this.type !== C.type && tr(11, !0, l)) : (y && ae(v) && gt(n) && gt(o) && (o >= v ? (W = v, R = 0) : n <= v && (tt = v, z = 0)), this.min = Ut(it, W, o), this.max = Ut(J, tt, n)), gt(this.max) && gt(this.min) && (c && (this.positiveValuesOnly && !e && 0 >= Math.min(this.min, Ut(o, this.min)) && tr(10, !0, l), this.min = xi(c.log2lin(this.min), 16), this.max = xi(c.log2lin(this.max), 16)), this.range && gt(o) && (this.userMin = this.min = it = Math.max(o, this.minFromRange() || 0), this.userMax = J = this.max, this.range = void 0)), ne(this, "foundExtremes"), this.adjustForMinRange(), gt(this.min) && gt(this.max)) {
            if (!gt(this.userMin) && gt(w) && w < this.min && (this.min = it = w), !gt(this.userMax) && gt(M) && M > this.max && (this.max = J = M), a || this.axisPointRange || (Ct = this.stacking) != null && Ct.usePercentage || C || !(Y = this.max - this.min) || (!ae(it) && R && (this.min -= Y * R), ae(J) || !z || (this.max += Y * z)), !gt(this.userMin) && gt(E) && (this.min = Math.max(this.min, E)), !gt(this.userMax) && gt(S) && (this.max = Math.min(this.max, S)), y && gt(o) && gt(n)) {
              let Yt = v || 0;
              !ae(it) && this.min < Yt && o >= Yt ? this.min = f.minRange ? Math.min(Yt, this.max - b) : Yt : !ae(J) && this.max > Yt && n <= Yt && (this.max = f.minRange ? Math.max(Yt, this.min + b) : Yt);
            }
            !l.polar && this.min > this.max && (ae(f.min) ? this.max = this.min : ae(f.max) && (this.min = this.max)), Y = this.max - this.min;
          }
          if (this.min !== this.max && gt(this.min) && gt(this.max) ? C && !j && B === C.options.tickPixelInterval ? this.tickInterval = j = C.tickInterval : this.tickInterval = Ut(j, this.tickAmount ? Y / Math.max(this.tickAmount - 1, 1) : void 0, a ? 1 : Y * B / Math.max(this.len, B)) : this.tickInterval = 1, u && !e) {
            let Yt = this.min !== ((ht = this.old) == null ? void 0 : ht.min) || this.max !== ((wt = this.old) == null ? void 0 : wt.max);
            this.series.forEach(function(kt) {
              var jt;
              kt.forceCrop = (jt = kt.forceCropping) == null ? void 0 : jt.call(kt), kt.processData(Yt);
            }), ne(this, "postProcessData", { hasExtremesChanged: Yt });
          }
          this.setAxisTranslation(), ne(this, "initialAxisTranslation"), this.pointRange && !j && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          let rt = Ut(f.minTickInterval, h && !this.series.some((Yt) => !Yt.sorted) ? this.closestPointRange : 0);
          !j && rt && this.tickInterval < rt && (this.tickInterval = rt), h || c || j || (this.tickInterval = $t(this, this.tickInterval)), this.tickAmount || (this.tickInterval = this.unsquish()), this.setTickPositions();
        }
        setTickPositions() {
          var y, g;
          let e = this.options, a = e.tickPositions, l = e.tickPositioner, n = this.getMinorTickInterval(), o = !this.isPanning, h = o && e.startOnTick, u = o && e.endOnTick, c = [], f;
          if (this.tickmarkOffset = this.categories && e.tickmarkPlacement === "between" && this.tickInterval === 1 ? 0.5 : 0, this.single = this.min === this.max && ae(this.min) && !this.tickAmount && (this.min % 1 == 0 || e.allowDecimals !== !1), a) c = a.slice();
          else if (gt(this.min) && gt(this.max)) {
            if (!((y = this.ordinal) != null && y.positions) && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) c = [this.min, this.max], tr(19, !1, this.chart);
            else if (this.dateTime) c = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, e.units), this.min, this.max, e.startOfWeek, (g = this.ordinal) == null ? void 0 : g.positions, this.closestPointRange, !0);
            else if (this.logarithmic) c = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
            else {
              let v = this.tickInterval, b = v;
              for (; b <= 2 * v && (c = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && c.length > this.tickAmount); ) this.tickInterval = $t(this, b *= 1.1);
            }
            c.length > this.len && (c = [c[0], c[c.length - 1]])[0] === c[1] && (c.length = 1), l && (this.tickPositions = c, (f = l.apply(this, [this.min, this.max])) && (c = f));
          }
          this.tickPositions = c, this.minorTickInterval = n === "auto" && this.tickInterval ? this.tickInterval / e.minorTicksPerMajor : n, this.paddedTicks = c.slice(0), this.trimTicks(c, h, u), !this.isLinked && gt(this.min) && gt(this.max) && (this.single && c.length < 2 && !this.categories && !this.series.some((v) => v.is("heatmap") && v.options.pointPlacement === "between") && (this.min -= 0.5, this.max += 0.5), a || f || this.adjustTickAmount()), ne(this, "afterSetTickPositions");
        }
        trimTicks(e, a, l) {
          let n = e[0], o = e[e.length - 1], h = !this.isOrdinal && this.minPointOffset || 0;
          if (ne(this, "trimTicks"), !this.isLinked || !this.grid) {
            if (a && n !== -1 / 0) this.min = n;
            else for (; this.min - h > e[0]; ) e.shift();
            if (l) this.max = o;
            else for (; this.max + h < e[e.length - 1]; ) e.pop();
            e.length === 0 && ae(n) && !this.options.tickPositions && e.push((o + n) / 2);
          }
        }
        alignToOthers() {
          let e, a = this, l = a.chart, n = [this], o = a.options, h = l.options.chart, u = this.coll === "yAxis" && h.alignThresholds, c = [];
          if (a.thresholdAlignment = void 0, (h.alignTicks !== !1 && o.alignTicks || u) && o.startOnTick !== !1 && o.endOnTick !== !1 && !a.logarithmic) {
            let f = (g) => {
              let { horiz: v, options: b } = g;
              return [v ? b.left : b.top, b.width, b.height, b.pane].join(",");
            }, y = f(this);
            l[this.coll].forEach(function(g) {
              let { series: v } = g;
              v.length && v.some((b) => b.visible) && g !== a && f(g) === y && (e = !0, n.push(g));
            });
          }
          if (e && u) {
            n.forEach((y) => {
              let g = y.getThresholdAlignment(a);
              gt(g) && c.push(g);
            });
            let f = c.length > 1 ? c.reduce((y, g) => y += g, 0) / c.length : void 0;
            n.forEach((y) => {
              y.thresholdAlignment = f;
            });
          }
          return e;
        }
        getThresholdAlignment(e) {
          if ((!gt(this.dataMin) || this !== e && this.series.some((a) => a.isDirty || a.isDirtyData)) && this.getSeriesExtremes(), gt(this.threshold)) {
            let a = ga((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1);
            return this.options.reversed && (a = 1 - a), a;
          }
        }
        getTickAmount() {
          let e = this.options, a = e.tickPixelInterval, l = e.tickAmount;
          ae(e.tickInterval) || l || !(this.len < a) || this.isRadial || this.logarithmic || !e.startOnTick || !e.endOnTick || (l = 2), !l && this.alignToOthers() && (l = Math.ceil(this.len / a) + 1), l < 4 && (this.finalTickAmt = l, l = 5), this.tickAmount = l;
        }
        adjustTickAmount() {
          let e = this, { finalTickAmt: a, max: l, min: n, options: o, tickPositions: h, tickAmount: u, thresholdAlignment: c } = e, f = h == null ? void 0 : h.length, y = Ut(e.threshold, e.softThreshold ? 0 : null), g, v, b = e.tickInterval, S, E = () => h.push(xi(h[h.length - 1] + b)), T = () => h.unshift(xi(h[0] - b));
          if (gt(c) && (S = c < 0.5 ? Math.ceil(c * (u - 1)) : Math.floor(c * (u - 1)), o.reversed && (S = u - 1 - S)), e.hasData() && gt(n) && gt(l)) {
            let M = () => {
              e.transA *= (f - 1) / (u - 1), e.min = o.startOnTick ? h[0] : Math.min(n, h[0]), e.max = o.endOnTick ? h[h.length - 1] : Math.max(l, h[h.length - 1]);
            };
            if (gt(S) && gt(e.threshold)) {
              for (; h[S] !== y || h.length !== u || h[0] > n || h[h.length - 1] < l; ) {
                for (h.length = 0, h.push(e.threshold); h.length < u; ) h[S] === void 0 || h[S] > e.threshold ? T() : E();
                if (b > 8 * e.tickInterval) break;
                b *= 2;
              }
              M();
            } else if (f < u) {
              for (; h.length < u; ) h.length % 2 || n === y ? E() : T();
              M();
            }
            if (ae(a)) {
              for (v = g = h.length; v--; ) (a === 3 && v % 2 == 1 || a <= 2 && v > 0 && v < g - 1) && h.splice(v, 1);
              e.finalTickAmt = void 0;
            }
          }
        }
        setScale() {
          var h, u, c, f, y;
          let { coll: e, stacking: a } = this, l = !1, n = !1;
          this.series.forEach((g) => {
            var v;
            l = l || g.isDirtyData || g.isDirty, n = n || ((v = g.xAxis) == null ? void 0 : v.isDirty) || !1;
          }), this.setAxisSize();
          let o = this.len !== ((h = this.old) == null ? void 0 : h.len);
          o || l || n || this.isLinked || this.forceRedraw || this.userMin !== ((u = this.old) == null ? void 0 : u.userMin) || this.userMax !== ((c = this.old) == null ? void 0 : c.userMax) || this.alignToOthers() ? (a && e === "yAxis" && a.buildStacks(), this.forceRedraw = !1, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), a && e === "xAxis" && a.buildStacks(), this.isDirty || (this.isDirty = o || this.min !== ((f = this.old) == null ? void 0 : f.min) || this.max !== ((y = this.old) == null ? void 0 : y.max))) : a && a.cleanStacks(), l && delete this.allExtremes, ne(this, "afterSetScale");
        }
        setExtremes(e, a, l = !0, n, o) {
          let h = this.chart;
          this.series.forEach((u) => {
            delete u.kdTree;
          }), e = h.time.parse(e), a = h.time.parse(a), ne(this, "setExtremes", o = Ja(o, { min: e, max: a }), (u) => {
            this.userMin = u.min, this.userMax = u.max, this.eventArgs = u, l && h.redraw(n);
          });
        }
        setAxisSize() {
          let e = this.chart, a = this.options, l = a.offsets || [0, 0, 0, 0], n = this.horiz, o = this.width = Math.round(Kl(Ut(a.width, e.plotWidth - l[3] + l[1]), e.plotWidth)), h = this.height = Math.round(Kl(Ut(a.height, e.plotHeight - l[0] + l[2]), e.plotHeight)), u = this.top = Math.round(Kl(Ut(a.top, e.plotTop + l[0]), e.plotHeight, e.plotTop)), c = this.left = Math.round(Kl(Ut(a.left, e.plotLeft + l[3]), e.plotWidth, e.plotLeft));
          this.bottom = e.chartHeight - h - u, this.right = e.chartWidth - o - c, this.len = Math.max(n ? o : h, 0), this.pos = n ? c : u;
        }
        getExtremes() {
          let e = this.logarithmic;
          return { min: e ? xi(e.lin2log(this.min)) : this.min, max: e ? xi(e.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
        }
        getThreshold(e) {
          let a = this.logarithmic, l = a ? a.lin2log(this.min) : this.min, n = a ? a.lin2log(this.max) : this.max;
          return e === null || e === -1 / 0 ? e = l : e === 1 / 0 ? e = n : l > e ? e = l : n < e && (e = n), this.translate(e, 0, 1, 0, 1);
        }
        autoLabelAlign(e) {
          let a = (Ut(e, 0) - 90 * this.side + 720) % 360, l = { align: "center" };
          return ne(this, "autoLabelAlign", l, function(n) {
            a > 15 && a < 165 ? n.align = "right" : a > 195 && a < 345 && (n.align = "left");
          }), l.align;
        }
        tickSize(e) {
          let a = this.options, l = Ut(a[e === "tick" ? "tickWidth" : "minorTickWidth"], e === "tick" && this.isXAxis && !this.categories ? 1 : 0), n = a[e === "tick" ? "tickLength" : "minorTickLength"], o;
          l && n && (a[e + "Position"] === "inside" && (n = -n), o = [n, l]);
          let h = { tickSize: o };
          return ne(this, "afterTickSize", h), h.tickSize;
        }
        labelMetrics() {
          let e = this.chart.renderer, a = this.ticks, l = a[Object.keys(a)[0]] || {};
          return this.chart.renderer.fontMetrics(l.label || l.movedLabel || e.box);
        }
        unsquish() {
          let e = this.options.labels, a = e.padding || 0, l = this.horiz, n = this.tickInterval, o = this.len / ((+!!this.categories + this.max - this.min) / n), h = e.rotation, u = xi(0.8 * this.labelMetrics().h), c = Math.max(this.max - this.min, 0), f = function(S) {
            let E = (S + 2 * a) / (o || 1);
            return (E = E > 1 ? Math.ceil(E) : 1) * n > c && S !== 1 / 0 && o !== 1 / 0 && c && (E = Math.ceil(c / n)), xi(E * n);
          }, y = n, g, v = Number.MAX_VALUE, b;
          if (l) {
            if (!e.staggerLines && (gt(h) ? b = [h] : o < e.autoRotationLimit && (b = e.autoRotation)), b) {
              let S, E;
              for (let T of b) (T === h || T && T >= -90 && T <= 90) && (E = (S = f(Math.abs(u / Math.sin(wp * T)))) + Math.abs(T / 360)) < v && (v = E, g = T, y = S);
            }
          } else y = f(0.75 * u);
          return this.autoRotation = b, this.labelRotation = Ut(g, gt(h) ? h : 0), e.step ? n : y;
        }
        getSlotWidth(e) {
          let a = this.chart, l = this.horiz, n = this.options.labels, o = Math.max(this.tickPositions.length - +!this.categories, 1), h = a.margin[3];
          if (e && gt(e.slotWidth)) return e.slotWidth;
          if (l && n.step < 2 && !this.isRadial) return n.rotation ? 0 : (this.staggerLines || 1) * this.len / o;
          if (!l) {
            let u = n.style.width;
            if (u !== void 0) return parseInt(String(u), 10);
            if (h) return h - a.spacing[3];
          }
          return 0.33 * a.chartWidth;
        }
        renderUnsquish() {
          let e = this.chart, a = e.renderer, l = this.tickPositions, n = this.ticks, o = this.options.labels, h = o.style, u = this.horiz, c = this.getSlotWidth(), f = Math.max(1, Math.round(c - (u ? 2 * (o.padding || 0) : o.distance || 0))), y = {}, g = this.labelMetrics(), v = h.lineClamp, b, S = v ?? (Math.floor(this.len / (l.length * g.h)) || 1), E = 0;
          Ss(o.rotation) || (y.rotation = o.rotation || 0), l.forEach(function(T) {
            var C;
            let M = n[T];
            M.movedLabel && M.replaceMovedLabel();
            let w = ((C = M.label) == null ? void 0 : C.textPxLength) || 0;
            w > E && (E = w);
          }), this.maxLabelLength = E, this.autoRotation ? E > f && E > g.h ? y.rotation = this.labelRotation : this.labelRotation = 0 : c && (b = f), y.rotation && (b = E > 0.5 * e.chartHeight ? 0.33 * e.chartHeight : E, v || (S = 1)), this.labelAlign = o.align || this.autoLabelAlign(this.labelRotation), this.labelAlign && (y.align = this.labelAlign), l.forEach(function(T) {
            let M = n[T], w = M == null ? void 0 : M.label, C = h.width, B = {};
            w && (w.attr(y), M.shortenLabel ? M.shortenLabel() : b && !C && h.whiteSpace !== "nowrap" && (b < (w.textPxLength || 0) || w.element.tagName === "SPAN") ? w.css(Ja(B, { width: `${b}px`, lineClamp: S })) : !w.styles.width || B.width || C || w.css({ width: "auto" }), M.rotation = y.rotation);
          }, this), this.tickRotCorr = a.rotCorr(g.b, this.labelRotation || 0, this.side !== 0);
        }
        hasData() {
          return this.series.some(function(e) {
            return e.hasData();
          }) || this.options.showEmpty && ae(this.min) && ae(this.max);
        }
        addTitle(e) {
          let a, l = this.chart.renderer, n = this.horiz, o = this.opposite, h = this.options.title, u = this.chart.styledMode;
          this.axisTitle || ((a = h.textAlign) || (a = (n ? { low: "left", middle: "center", high: "right" } : { low: o ? "right" : "left", middle: "center", high: o ? "left" : "right" })[h.align]), this.axisTitle = l.text(h.text || "", 0, 0, h.useHTML).attr({ zIndex: 7, rotation: h.rotation || 0, align: a }).addClass("highcharts-axis-title"), u || this.axisTitle.css($i(h.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0), u || h.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" }), this.axisTitle[e ? "show" : "hide"](e);
        }
        generateTick(e) {
          let a = this.ticks;
          a[e] ? a[e].addLabel() : a[e] = new Ia(this, e);
        }
        createGroups() {
          let { axisParent: e, chart: a, coll: l, options: n } = this, o = a.renderer, h = (u, c, f) => o.g(u).attr({ zIndex: f }).addClass(`highcharts-${l.toLowerCase()}${c} ` + (this.isRadial ? `highcharts-radial-axis${c} ` : "") + (n.className || "")).add(e);
          this.axisGroup || (this.gridGroup = h("grid", "-grid", n.gridZIndex), this.axisGroup = h("axis", "", n.zIndex), this.labelGroup = h("axis-labels", "-labels", n.labels.zIndex));
        }
        getOffset() {
          let e = this, { chart: a, horiz: l, options: n, side: o, ticks: h, tickPositions: u, coll: c } = e, f = a.inverted && !e.isZAxis ? [1, 0, 3, 2][o] : o, y = e.hasData(), g = n.title, v = n.labels, b = gt(n.crossing), S = a.axisOffset, E = a.clipOffset, T = [-1, 1, 1, -1][o], M, w = 0, C, B = 0, z = 0, R, Y;
          if (e.showAxis = M = y || n.showEmpty, e.staggerLines = e.horiz && v.staggerLines || void 0, e.createGroups(), y || e.isLinked ? (u.forEach(function(H) {
            e.generateTick(H);
          }), e.renderUnsquish(), e.reserveSpaceDefault = o === 0 || o === 2 || { 1: "left", 3: "right" }[o] === e.labelAlign, Ut(v.reserveSpace, !b && null, e.labelAlign === "center" || null, e.reserveSpaceDefault) && u.forEach(function(H) {
            z = Math.max(h[H].getLabelSize(), z);
          }), e.staggerLines && (z *= e.staggerLines), e.labelOffset = z * (e.opposite ? -1 : 1)) : Ma(h, function(H, j) {
            H.destroy(), delete h[j];
          }), g != null && g.text && g.enabled !== !1 && (e.addTitle(M), M && !b && g.reserveSpace !== !1 && (e.titleOffset = w = e.axisTitle.getBBox()[l ? "height" : "width"], B = ae(C = g.offset) ? 0 : Ut(g.margin, l ? 5 : 10))), e.renderLine(), e.offset = T * Ut(n.offset, S[o] ? S[o] + (n.margin || 0) : 0), e.tickRotCorr = e.tickRotCorr || { x: 0, y: 0 }, Y = o === 0 ? -e.labelMetrics().h : o === 2 ? e.tickRotCorr.y : 0, R = Math.abs(z) + B, z && (R -= Y, R += T * (l ? Ut(v.y, e.tickRotCorr.y + T * v.distance) : Ut(v.x, T * v.distance))), e.axisTitleMargin = Ut(C, R), e.getMaxLabelDimensions && (e.maxLabelDimensions = e.getMaxLabelDimensions(h, u)), c !== "colorAxis" && E) {
            let H = this.tickSize("tick");
            S[o] = Math.max(S[o], (e.axisTitleMargin || 0) + w + T * e.offset, R, u != null && u.length && H ? H[0] + T * e.offset : 0);
            let j = !e.axisLine || n.offset ? 0 : e.axisLine.strokeWidth() / 2;
            E[f] = Math.max(E[f], j);
          }
          ne(this, "afterGetOffset");
        }
        getLinePath(e) {
          let a = this.chart, l = this.opposite, n = this.offset, o = this.horiz, h = this.left + (l ? this.width : 0) + n, u = a.chartHeight - this.bottom - (l ? this.height : 0) + n;
          return l && (e *= -1), a.renderer.crispLine([["M", o ? this.left : h, o ? u : this.top], ["L", o ? a.chartWidth - this.right : h, o ? u : a.chartHeight - this.bottom]], e);
        }
        renderLine() {
          this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
        }
        getTitlePosition(e) {
          let a = this.horiz, l = this.left, n = this.top, o = this.len, h = this.options.title, u = a ? l : n, c = this.opposite, f = this.offset, y = h.x, g = h.y, v = this.chart.renderer.fontMetrics(e), b = e ? Math.max(e.getBBox(!1, 0).height - v.h - 1, 0) : 0, S = { low: u + (a ? 0 : o), middle: u + o / 2, high: u + (a ? o : 0) }[h.align], E = (a ? n + this.height : l) + (a ? 1 : -1) * (c ? -1 : 1) * (this.axisTitleMargin || 0) + [-b, b, v.f, -b][this.side], T = { x: a ? S + y : E + (c ? this.width : 0) + f + y, y: a ? E + g - (c ? this.height : 0) + f : S + g };
          return ne(this, "afterGetTitlePosition", { titlePosition: T }), T;
        }
        renderMinorTick(e, a) {
          let l = this.minorTicks;
          l[e] || (l[e] = new Ia(this, e, "minor")), a && l[e].isNew && l[e].render(null, !0), l[e].render(null, !1, 1);
        }
        renderTick(e, a, l) {
          var h;
          let n = this.isLinked, o = this.ticks;
          (!n || e >= this.min && e <= this.max || (h = this.grid) != null && h.isColumn) && (o[e] || (o[e] = new Ia(this, e)), l && o[e].isNew && o[e].render(a, !0, -1), o[e].render(a));
        }
        render() {
          let e, a, l = this, n = l.chart, o = l.logarithmic, h = n.renderer, u = l.options, c = l.isLinked, f = l.tickPositions, y = l.axisTitle, g = l.ticks, v = l.minorTicks, b = l.alternateBands, S = u.stackLabels, E = u.alternateGridColor, T = u.crossing, M = l.tickmarkOffset, w = l.axisLine, C = l.showAxis, B = uu(h.globalAnimation);
          if (l.labelEdge.length = 0, l.overlap = !1, [g, v, b].forEach(function(z) {
            Ma(z, function(R) {
              R.isActive = !1;
            });
          }), gt(T)) {
            let z = this.isXAxis ? n.yAxis[0] : n.xAxis[0], R = [1, -1, -1, 1][this.side];
            if (z) {
              let Y = z.toPixels(T, !0);
              l.horiz && (Y = z.len - Y), l.offset = R * Y;
            }
          }
          if (l.hasData() || c) {
            let z = l.chart.hasRendered && l.old && gt(l.old.min);
            l.minorTickInterval && !l.categories && l.getMinorTickPositions().forEach(function(R) {
              l.renderMinorTick(R, z);
            }), f.length && (f.forEach(function(R, Y) {
              l.renderTick(R, Y, z);
            }), M && (l.min === 0 || l.single) && (g[-1] || (g[-1] = new Ia(l, -1, null, !0)), g[-1].render(-1))), E && f.forEach(function(R, Y) {
              a = f[Y + 1] !== void 0 ? f[Y + 1] + M : l.max - M, Y % 2 == 0 && R < l.max && a <= l.max + (n.polar ? -M : M) && (b[R] || (b[R] = new Z.PlotLineOrBand(l, {})), e = R + M, b[R].options = { from: o ? o.lin2log(e) : e, to: o ? o.lin2log(a) : a, color: E, className: "highcharts-alternate-grid" }, b[R].render(), b[R].isActive = !0);
            }), l._addedPlotLB || (l._addedPlotLB = !0, (u.plotLines || []).concat(u.plotBands || []).forEach(function(R) {
              l.addPlotBandOrLine(R);
            }));
          }
          [g, v, b].forEach(function(z) {
            let R = [], Y = B.duration;
            Ma(z, function(H, j) {
              H.isActive || (H.render(j, !1, 0), H.isActive = !1, R.push(j));
            }), De(function() {
              let H = R.length;
              for (; H--; ) z[R[H]] && !z[R[H]].isActive && (z[R[H]].destroy(), delete z[R[H]]);
            }, z !== b && n.hasRendered && Y ? Y : 0);
          }), w && (w[w.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(w.strokeWidth()) }), w.isPlaced = !0, w[C ? "show" : "hide"](C)), y && C && (y[y.isNew ? "attr" : "animate"](l.getTitlePosition(y)), y.isNew = !1), S != null && S.enabled && l.stacking && l.stacking.renderStackTotals(), l.old = { len: l.len, max: l.max, min: l.min, transA: l.transA, userMax: l.userMax, userMin: l.userMin }, l.isDirty = !1, ne(this, "afterRender");
        }
        redraw() {
          this.visible && (this.render(), this.plotLinesAndBands.forEach(function(e) {
            e.render();
          })), this.series.forEach(function(e) {
            e.isDirty = !0;
          });
        }
        getKeepProps() {
          return this.keepProps || ta.keepProps;
        }
        destroy(e) {
          let a = this, l = a.plotLinesAndBands, n = this.eventOptions;
          if (ne(this, "destroy", { keepEvents: e }), e || du(a), [a.ticks, a.minorTicks, a.alternateBands].forEach(function(o) {
            ol(o);
          }), l) {
            let o = l.length;
            for (; o--; ) l[o].destroy();
          }
          for (let o in ["axisLine", "axisTitle", "axisGroup", "gridGroup", "labelGroup", "cross", "scrollbar"].forEach(function(h) {
            a[h] && (a[h] = a[h].destroy());
          }), a.plotLinesAndBandsGroups) a.plotLinesAndBandsGroups[o] = a.plotLinesAndBandsGroups[o].destroy();
          Ma(a, function(o, h) {
            a.getKeepProps().indexOf(h) === -1 && delete a[h];
          }), this.eventOptions = n;
        }
        drawCrosshair(e, a) {
          var g;
          let l = this.crosshair, n = (l == null ? void 0 : l.snap) ?? !0, o = this.chart, h, u, c, f = this.cross, y;
          if (ne(this, "drawCrosshair", { e, point: a }), e || (e = (g = this.cross) == null ? void 0 : g.e), l && (ae(a) || !n) !== !1) {
            if (n ? ae(a) && (u = Ut(this.coll !== "colorAxis" ? a.crosshairPos : null, this.isXAxis ? a.plotX : this.len - a.plotY)) : u = e && (this.horiz ? e.chartX - this.pos : this.len - e.chartY + this.pos), ae(u) && (y = { value: a && (this.isXAxis ? a.x : Ut(a.stackY, a.y)), translatedValue: u }, o.polar && Ja(y, { isCrosshair: !0, chartX: e == null ? void 0 : e.chartX, chartY: e == null ? void 0 : e.chartY, point: a }), h = this.getPlotLinePath(y) || null), !ae(h)) {
              this.hideCrosshair();
              return;
            }
            c = this.categories && !this.isRadial, f || (this.cross = f = o.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (c ? "category " : "thin ") + (l.className || "")).attr({ zIndex: Ut(l.zIndex, 2) }).add(), !o.styledMode && (f.attr({ stroke: l.color || (c ? Oe.parse("#ccd3ff").setOpacity(0.25).get() : "#cccccc"), "stroke-width": Ut(l.width, 1) }).css({ "pointer-events": "none" }), l.dashStyle && f.attr({ dashstyle: l.dashStyle }))), f.show().attr({ d: h }), c && !l.width && f.attr({ "stroke-width": this.transA }), this.cross.e = e;
          } else this.hideCrosshair();
          ne(this, "afterDrawCrosshair", { e, point: a });
        }
        hideCrosshair() {
          this.cross && this.cross.hide(), ne(this, "afterHideCrosshair");
        }
        update(e, a) {
          let l = this.chart;
          e = $i(this.userOptions, e), this.destroy(!0), this.init(l, e), l.isDirtyBox = !0, Ut(a, !0) && l.redraw();
        }
        remove(e) {
          let a = this.chart, l = this.coll, n = this.series, o = n.length;
          for (; o--; ) n[o] && n[o].remove(!1);
          yo(a.axes, this), yo(a[l] || [], this), a.orderItems(l), this.destroy(), a.isDirtyBox = !0, Ut(e, !0) && a.redraw();
        }
        setTitle(e, a) {
          this.update({ title: e }, a);
        }
        setCategories(e, a) {
          this.update({ categories: e }, a);
        }
      }
      ta.keepProps = ["coll", "extKey", "hcEvents", "len", "names", "series", "userMax", "userMin"];
      let { addEvent: Ta, getMagnitude: fu, normalizeTickInterval: hl, timeUnits: ir } = Mt;
      (function(p) {
        function e() {
          return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
        }
        function a() {
          if (this.type !== "datetime") {
            this.dateTime = void 0;
            return;
          }
          this.dateTime || (this.dateTime = new l(this));
        }
        p.compose = function(n) {
          return n.keepProps.includes("dateTime") || (n.keepProps.push("dateTime"), n.prototype.getTimeTicks = e, Ta(n, "afterSetType", a)), n;
        };
        class l {
          constructor(o) {
            this.axis = o;
          }
          normalizeTimeTickInterval(o, h) {
            let u = h || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], c = u[u.length - 1], f = ir[c[0]], y = c[1], g;
            for (g = 0; g < u.length && (f = ir[(c = u[g])[0]], y = c[1], !u[g + 1] || !(o <= (f * y[y.length - 1] + ir[u[g + 1][0]]) / 2)); g++) ;
            f === ir.year && o < 5 * f && (y = [1, 2, 5]);
            let v = hl(o / f, y, c[0] === "year" ? Math.max(fu(o / f), 1) : 1);
            return { unitRange: f, count: v, unitName: c[0] };
          }
          getXDateFormat(o, h) {
            let { axis: u } = this, c = u.chart.time;
            return u.closestPointRange ? c.getDateFormat(u.closestPointRange, o, u.options.startOfWeek, h) || c.resolveDTLFormat(h.year).main : c.resolveDTLFormat(h.day).main;
          }
        }
        p.Additions = l;
      })(Ot || (Ot = {}));
      let Sd = Ot, { addEvent: Fl, normalizeTickInterval: ar, pick: Md } = Mt;
      (function(p) {
        function e() {
          this.type !== "logarithmic" ? this.logarithmic = void 0 : this.logarithmic ?? (this.logarithmic = new l(this));
        }
        function a() {
          let n = this.logarithmic;
          n && (this.lin2val = function(o) {
            return n.lin2log(o);
          }, this.val2lin = function(o) {
            return n.log2lin(o);
          });
        }
        p.compose = function(n) {
          return n.keepProps.includes("logarithmic") || (n.keepProps.push("logarithmic"), Fl(n, "afterSetType", e), Fl(n, "afterInit", a)), n;
        };
        class l {
          constructor(o) {
            this.axis = o;
          }
          getLogTickPositions(o, h, u, c) {
            let f = this.axis, y = f.len, g = f.options, v = [];
            if (c || (this.minorAutoInterval = void 0), o >= 0.5) o = Math.round(o), v = f.getLinearTickPositions(o, h, u);
            else if (o >= 0.08) {
              let b, S, E, T, M, w, C, B = Math.floor(h);
              for (b = o > 0.3 ? [1, 2, 4] : o > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9], S = B; S < u + 1 && !C; S++) for (E = 0, T = b.length; E < T && !C; E++) (M = this.log2lin(this.lin2log(S) * b[E])) > h && (!c || w <= u) && w !== void 0 && v.push(w), w > u && (C = !0), w = M;
            } else {
              let b = this.lin2log(h), S = this.lin2log(u), E = c ? f.getMinorTickInterval() : g.tickInterval, T = g.tickPixelInterval / (c ? 5 : 1), M = c ? y / f.tickPositions.length : y;
              o = ar(o = Md(E === "auto" ? null : E, this.minorAutoInterval, (S - b) * T / (M || 1))), v = f.getLinearTickPositions(o, b, S).map(this.log2lin), c || (this.minorAutoInterval = o / 5);
            }
            return c || (f.tickInterval = o), v;
          }
          lin2log(o) {
            return Math.pow(10, o);
          }
          log2lin(o) {
            return Math.log(o) / Math.LN10;
          }
        }
        p.Additions = l;
      })(pt || (pt = {}));
      let sr = pt, { erase: pu, extend: ul, isNumber: Aa } = Mt;
      (function(p) {
        let e;
        function a(f) {
          return this.addPlotBandOrLine(f, "plotBands");
        }
        function l(f, y) {
          let g = this.userOptions, v = new e(this, f);
          if (this.visible && (v = v.render()), v) {
            if (this._addedPlotLB || (this._addedPlotLB = !0, (g.plotLines || []).concat(g.plotBands || []).forEach((b) => {
              this.addPlotBandOrLine(b);
            })), y) {
              let b = g[y] || [];
              b.push(f), g[y] = b;
            }
            this.plotLinesAndBands.push(v);
          }
          return v;
        }
        function n(f) {
          return this.addPlotBandOrLine(f, "plotLines");
        }
        function o(f, y, g) {
          g = g || this.options;
          let v = this.getPlotLinePath({ value: y, force: !0, acrossPanes: g.acrossPanes }), b = [], S = this.horiz, E = !Aa(this.min) || !Aa(this.max) || f < this.min && y < this.min || f > this.max && y > this.max, T = this.getPlotLinePath({ value: f, force: !0, acrossPanes: g.acrossPanes }), M, w = 1, C;
          if (T && v) for (E && (C = T.toString() === v.toString(), w = 0), M = 0; M < T.length; M += 2) {
            let B = T[M], z = T[M + 1], R = v[M], Y = v[M + 1];
            (B[0] === "M" || B[0] === "L") && (z[0] === "M" || z[0] === "L") && (R[0] === "M" || R[0] === "L") && (Y[0] === "M" || Y[0] === "L") && (S && R[1] === B[1] ? (R[1] += w, Y[1] += w) : S || R[2] !== B[2] || (R[2] += w, Y[2] += w), b.push(["M", B[1], B[2]], ["L", z[1], z[2]], ["L", Y[1], Y[2]], ["L", R[1], R[2]], ["Z"])), b.isFlat = C;
          }
          return b;
        }
        function h(f) {
          this.removePlotBandOrLine(f);
        }
        function u(f) {
          let y = this.plotLinesAndBands, g = this.options, v = this.userOptions;
          if (y) {
            let b = y.length;
            for (; b--; ) y[b].id === f && y[b].destroy();
            [g.plotLines || [], v.plotLines || [], g.plotBands || [], v.plotBands || []].forEach(function(S) {
              var E;
              for (b = S.length; b--; ) ((E = S[b]) == null ? void 0 : E.id) === f && pu(S, S[b]);
            });
          }
        }
        function c(f) {
          this.removePlotBandOrLine(f);
        }
        p.compose = function(f, y) {
          let g = y.prototype;
          return g.addPlotBand || (e = f, ul(g, { addPlotBand: a, addPlotLine: n, addPlotBandOrLine: l, getPlotBandPath: o, removePlotBand: h, removePlotLine: c, removePlotBandOrLine: u })), y;
        };
      })(ot || (ot = {}));
      let Ms = ot, { addEvent: ts, arrayMax: bo, arrayMin: xo, defined: Si, destroyObjectProperties: So, erase: cl, fireEvent: oi, merge: lr, objectEach: Td, pick: Cp } = Mt;
      class Mo {
        static compose(e, a) {
          return ts(e, "afterInit", function() {
            this.labelCollectors.push(() => {
              var n;
              let l = [];
              for (let o of this.axes) for (let { label: h, options: u } of o.plotLinesAndBands) h && !((n = u == null ? void 0 : u.label) != null && n.allowOverlap) && l.push(h);
              return l;
            });
          }), Ms.compose(Mo, a);
        }
        constructor(e, a) {
          this.axis = e, this.options = a, this.id = a.id;
        }
        render() {
          oi(this, "render");
          let { axis: e, options: a } = this, { horiz: l, logarithmic: n } = e, { color: o, events: h, zIndex: u = 0 } = a, { renderer: c, time: f } = e.chart, y = {}, g = f.parse(a.to), v = f.parse(a.from), b = f.parse(a.value), S = a.borderWidth, E = a.label, { label: T, svgElem: M } = this, w = [], C, B = Si(v) && Si(g), z = Si(b), R = !M, Y = { class: "highcharts-plot-" + (B ? "band " : "line ") + (a.className || "") }, H = B ? "bands" : "lines";
          if (!e.chart.styledMode && (z ? (Y.stroke = o || "#999999", Y["stroke-width"] = Cp(a.width, 1), a.dashStyle && (Y.dashstyle = a.dashStyle)) : B && (Y.fill = o || "#e6e9ff", S && (Y.stroke = a.borderColor, Y["stroke-width"] = S))), y.zIndex = u, H += "-" + u, (C = e.plotLinesAndBandsGroups[H]) || (e.plotLinesAndBandsGroups[H] = C = c.g("plot-" + H).attr(y).add()), M || (this.svgElem = M = c.path().attr(Y).add(C)), Si(b)) w = e.getPlotLinePath({ value: (n == null ? void 0 : n.log2lin(b)) ?? b, lineWidth: M.strokeWidth(), acrossPanes: a.acrossPanes });
          else {
            if (!(Si(v) && Si(g))) return;
            w = e.getPlotBandPath((n == null ? void 0 : n.log2lin(v)) ?? v, (n == null ? void 0 : n.log2lin(g)) ?? g, a);
          }
          return !this.eventsAdded && h && (Td(h, (j, W) => {
            M == null || M.on(W, (tt) => {
              h[W].apply(this, [tt]);
            });
          }), this.eventsAdded = !0), (R || !M.d) && (w != null && w.length) ? M.attr({ d: w }) : M && (w ? (M.show(), M.animate({ d: w })) : M.d && (M.hide(), T && (this.label = T = T.destroy()))), E && (Si(E.text) || Si(E.formatter)) && (w != null && w.length) && e.width > 0 && e.height > 0 && !w.isFlat ? (E = lr({ align: l && B ? "center" : void 0, x: l ? !B && 4 : 10, verticalAlign: !l && B ? "middle" : void 0, y: l ? B ? 16 : 10 : B ? 6 : -4, rotation: l && !B ? 90 : 0, ...B ? { inside: !0 } : {} }, E), this.renderLabel(E, w, B, u)) : T && T.hide(), this;
        }
        renderLabel(e, a, l, n) {
          var S;
          let o = this.axis, h = o.chart.renderer, u = e.inside, c = this.label;
          c || (this.label = c = h.text(this.getLabelText(e), 0, 0, e.useHTML).attr({ align: e.textAlign || e.align, rotation: e.rotation, class: "highcharts-plot-" + (l ? "band" : "line") + "-label " + (e.className || ""), zIndex: n }), o.chart.styledMode || c.css(lr({ fontSize: "0.8em", textOverflow: l && !u ? "" : "ellipsis" }, e.style)), c.add());
          let f = a.xBounds || [a[0][1], a[1][1], l ? a[2][1] : a[0][1]], y = a.yBounds || [a[0][2], a[1][2], l ? a[2][2] : a[0][2]], g = xo(f), v = xo(y), b = bo(f) - g;
          c.align(e, !1, { x: g, y: v, width: b, height: bo(y) - v }), c.alignAttr.y -= h.fontMetrics(c).b, (!c.alignValue || c.alignValue === "left" || Si(u)) && c.css({ width: (((S = e.style) == null ? void 0 : S.width) || (l && u ? b : c.rotation === 90 ? o.height - (c.alignAttr.y - o.top) : (e.clip ? o.width : o.chart.chartWidth) - (c.alignAttr.x - o.left))) + "px" }), c.show(!0);
        }
        getLabelText(e) {
          return Si(e.formatter) ? e.formatter.call(this) : e.text;
        }
        destroy() {
          cl(this.axis.plotLinesAndBands, this), delete this.axis, So(this);
        }
      }
      let { animObject: kp } = We, { format: Ge } = Ri, { composed: gu, dateFormats: nr, doc: Il, isSafari: mu } = Z, { distribute: Jl } = lo, { addEvent: $l, clamp: tn, css: yu, discardElement: Dp, extend: Ad, fireEvent: Ts, getAlignFactor: To, isArray: Ao, isNumber: Od, isObject: rr, isString: Oo, merge: Eo, pick: As, pushUnique: Ed, splat: en, syncTimeout: wd } = Mt;
      class dl {
        constructor(e, a, l) {
          this.allowShared = !0, this.crosshairs = [], this.distance = 0, this.isHidden = !0, this.isSticky = !1, this.options = {}, this.outside = !1, this.chart = e, this.init(e, a), this.pointer = l;
        }
        bodyFormatter(e) {
          return e.map((a) => {
            let l = a.series.tooltipOptions, n = a.formatPrefix || "point";
            return (l[n + "Formatter"] || a.tooltipFormatter).call(a, l[n + "Format"] || "");
          });
        }
        cleanSplit(e) {
          this.chart.series.forEach(function(a) {
            let l = a == null ? void 0 : a.tt;
            l && (!l.isActive || e ? a.tt = l.destroy() : l.isActive = !1);
          });
        }
        defaultFormatter(e) {
          let a, l = this.points || en(this);
          return (a = (a = [e.headerFooterFormatter(l[0])]).concat(e.bodyFormatter(l))).push(e.headerFooterFormatter(l[0], !0)), a;
        }
        destroy() {
          this.label && (this.label = this.label.destroy()), this.split && (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy())), this.renderer && (this.renderer = this.renderer.destroy(), Dp(this.container)), Mt.clearTimeout(this.hideTimer);
        }
        getAnchor(e, a) {
          var f;
          let l, { chart: n, pointer: o } = this, h = n.inverted, u = n.plotTop, c = n.plotLeft;
          if (e = en(e), (f = e[0].series) != null && f.yAxis && !e[0].series.yAxis.options.reversedStacks && (e = e.slice().reverse()), this.followPointer && a) a.chartX === void 0 && (a = o.normalize(a)), l = [a.chartX - c, a.chartY - u];
          else if (e[0].tooltipPos) l = e[0].tooltipPos;
          else {
            let y = 0, g = 0;
            e.forEach(function(v) {
              let b = v.pos(!0);
              b && (y += b[0], g += b[1]);
            }), y /= e.length, g /= e.length, this.shared && e.length > 1 && a && (h ? y = a.chartX : g = a.chartY), l = [y - c, g - u];
          }
          return l.map(Math.round);
        }
        getClassName(e, a, l) {
          let n = this.options, o = e.series, h = o.options;
          return [n.className, "highcharts-label", l && "highcharts-tooltip-header", a ? "highcharts-tooltip-box" : "highcharts-tooltip", !l && "highcharts-color-" + As(e.colorIndex, o.colorIndex), h == null ? void 0 : h.className].filter(Oo).join(" ");
        }
        getLabel({ anchorX: e, anchorY: a } = { anchorX: 0, anchorY: 0 }) {
          let l = this, n = this.chart.styledMode, o = this.options, h = this.split && this.allowShared, u = this.container, c = this.chart.renderer;
          if (this.label) {
            let f = !this.label.hasClass("highcharts-label");
            (!h && f || h && !f) && this.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              let f = this.chart, y = f.options.chart.style, g = Sa.getRendererType();
              this.container = u = Z.doc.createElement("div"), u.className = "highcharts-tooltip-container " + (f.renderTo.className.match(/(highcharts[a-zA-Z0-9-]+)\s?/gm) || ""), yu(u, { position: "absolute", top: "1px", pointerEvents: "none", zIndex: Math.max(this.options.style.zIndex || 0, ((y == null ? void 0 : y.zIndex) || 0) + 3) }), this.renderer = c = new g(u, 0, 0, y, void 0, void 0, c.styledMode);
            }
            if (h ? this.label = c.g("tooltip") : (this.label = c.label("", e, a, o.shape || "callout", void 0, void 0, o.useHTML, void 0, "tooltip").attr({ padding: o.padding, r: o.borderRadius }), n || this.label.attr({ fill: o.backgroundColor, "stroke-width": o.borderWidth || 0 }).css(o.style).css({ pointerEvents: o.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none") })), l.outside) {
              let f = this.label;
              [f.xSetter, f.ySetter].forEach((y, g) => {
                f[g ? "ySetter" : "xSetter"] = (v) => {
                  y.call(f, l.distance), f[g ? "y" : "x"] = v, u && (u.style[g ? "top" : "left"] = `${v}px`);
                };
              });
            }
            this.label.attr({ zIndex: 8 }).shadow(o.shadow ?? !o.fixed).add();
          }
          return u && !u.parentElement && Z.doc.body.appendChild(u), this.label;
        }
        getPlayingField() {
          let { body: e, documentElement: a } = Il, { chart: l, distance: n, outside: o } = this;
          return { width: o ? Math.max(e.scrollWidth, a.scrollWidth, e.offsetWidth, a.offsetWidth, a.clientWidth) - 2 * n - 2 : l.chartWidth, height: o ? Math.max(e.scrollHeight, a.scrollHeight, e.offsetHeight, a.offsetHeight, a.clientHeight) : l.chartHeight };
        }
        getPosition(e, a, l) {
          var nt, Ct;
          let { distance: n, chart: o, outside: h, pointer: u } = this, { inverted: c, plotLeft: f, plotTop: y, polar: g } = o, { plotX: v = 0, plotY: b = 0 } = l, S = {}, E = c && l.h || 0, { height: T, width: M } = this.getPlayingField(), w = u.getChartPosition(), C = (ht) => ht * w.scaleX, B = (ht) => ht * w.scaleY, z = (ht) => {
            let wt = ht === "x";
            return [ht, wt ? M : T, wt ? e : a].concat(h ? [wt ? C(e) : B(a), wt ? w.left - n + C(v + f) : w.top - n + B(b + y), 0, wt ? M : T] : [wt ? e : a, wt ? v + f : b + y, wt ? f : y, wt ? f + o.plotWidth : y + o.plotHeight]);
          }, R = z("y"), Y = z("x"), H, j = !!l.negative;
          !g && ((Ct = (nt = o.hoverSeries) == null ? void 0 : nt.yAxis) != null && Ct.reversed) && (j = !j);
          let W = !this.followPointer && As(l.ttBelow, !g && !c === j), tt = function(ht, wt, Yt, kt, jt, $e, Pt) {
            let Vt = h ? ht === "y" ? B(n) : C(n) : n, Tt = (Yt - kt) / 2, At = kt < jt - n, Me = jt + n + kt < wt, qt = jt - Vt - Yt + Tt, de = jt + Vt - Tt;
            if (W && Me) S[ht] = de;
            else if (!W && At) S[ht] = qt;
            else if (At) S[ht] = Math.min(Pt - kt, qt - E < 0 ? qt : qt - E);
            else {
              if (!Me) return S[ht] = 0, !1;
              S[ht] = Math.max($e, de + E + Yt > wt ? de : de + E);
            }
          }, it = function(ht, wt, Yt, kt, jt) {
            if (jt < n || jt > wt - n) return !1;
            jt < Yt / 2 ? S[ht] = 1 : jt > wt - kt / 2 ? S[ht] = wt - kt - 2 : S[ht] = jt - Yt / 2;
          }, J = function(ht) {
            [R, Y] = [Y, R], H = ht;
          }, rt = () => {
            tt.apply(0, R) !== !1 ? it.apply(0, Y) !== !1 || H || (J(!0), rt()) : H ? S.x = S.y = 0 : (J(!0), rt());
          };
          return (c && !g || this.len > 1) && J(), rt(), S;
        }
        getFixedPosition(e, a, l) {
          var v;
          let n = l.series, { chart: o, options: h, split: u } = this, c = h.position, f = c.relativeTo, y = h.shared || (v = n == null ? void 0 : n.yAxis) != null && v.isRadial && (f === "pane" || !f) ? "plotBox" : f, g = y === "chart" ? o.renderer : o[y] || o.getClipBox(n, !0);
          return { x: g.x + (g.width - e) * To(c.align) + c.x, y: g.y + (g.height - a) * To(c.verticalAlign) + (!u && c.y || 0) };
        }
        hide(e) {
          let a = this;
          Mt.clearTimeout(this.hideTimer), e = As(e, this.options.hideDelay), this.isHidden || (this.hideTimer = wd(function() {
            let l = a.getLabel();
            a.getLabel().animate({ opacity: 0 }, { duration: e && 150, complete: () => {
              l.hide(), a.container && a.container.remove();
            } }), a.isHidden = !0;
          }, e));
        }
        init(e, a) {
          this.chart = e, this.options = a, this.crosshairs = [], this.isHidden = !0, this.split = a.split && !e.inverted && !e.polar, this.shared = a.shared || this.split, this.outside = As(a.outside, !!(e.scrollablePixelsX || e.scrollablePixelsY));
        }
        shouldStickOnContact(e) {
          return !!(!this.followPointer && this.options.stickOnContact && (!e || this.pointer.inClass(e.target, "highcharts-tooltip")));
        }
        move(e, a, l, n) {
          let { followPointer: o, options: h } = this, u = kp(!o && !this.isHidden && !h.fixed && h.animation), c = o || (this.len || 0) > 1, f = { x: e, y: a };
          c ? f.anchorX = f.anchorY = NaN : (f.anchorX = l, f.anchorY = n), u.step = () => this.drawTracker(), this.getLabel().animate(f, u);
        }
        refresh(e, a) {
          let { chart: l, options: n, pointer: o, shared: h } = this, u = en(e), c = u[0], f = n.format, y = n.formatter || this.defaultFormatter, g = l.styledMode, v = this.allowShared;
          if (!n.enabled || !c.series) return;
          Mt.clearTimeout(this.hideTimer), this.allowShared = !(!Ao(e) && e.series && e.series.noSharedTooltip), v = v && !this.allowShared, this.followPointer = !this.split && c.series.tooltipOptions.followPointer;
          let b = this.getAnchor(e, a), S = b[0], E = b[1];
          h && this.allowShared && (o.applyInactiveState(u), u.forEach((w) => w.setState("hover")), c.points = u), this.len = u.length;
          let T = Oo(f) ? Ge(f, c, l) : y.call(c, this);
          c.points = void 0;
          let M = c.series;
          if (this.distance = As(M.tooltipOptions.distance, 16), T === !1) this.hide();
          else {
            if (this.split && this.allowShared) this.renderSplit(T, u);
            else {
              let w = S, C = E;
              if (a && o.isDirectTouch && (w = a.chartX - l.plotLeft, C = a.chartY - l.plotTop), l.polar || M.options.clip === !1 || u.some((B) => o.isDirectTouch || B.series.shouldShowTooltip(w, C))) {
                let B = this.getLabel(v && this.tt || {});
                (!n.style.width || g) && B.css({ width: (this.outside ? this.getPlayingField() : l.spacingBox).width + "px" }), B.attr({ class: this.getClassName(c), text: T && T.join ? T.join("") : T }), this.outside && B.attr({ x: tn(B.x || 0, 0, this.getPlayingField().width - (B.width || 0) - 1) }), g || B.attr({ stroke: n.borderColor || c.color || M.color || "#666666" }), this.updatePosition({ plotX: S, plotY: E, negative: c.negative, ttBelow: c.ttBelow, series: M, h: b[2] || 0 });
              } else {
                this.hide();
                return;
              }
            }
            this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden = !1;
          }
          Ts(this, "refresh");
        }
        renderSplit(e, a) {
          var jt, $e;
          let l = this, { chart: n, chart: { chartWidth: o, chartHeight: h, plotHeight: u, plotLeft: c, plotTop: f, scrollablePixelsY: y = 0, scrollablePixelsX: g, styledMode: v }, distance: b, options: S, options: { fixed: E, position: T, positioner: M }, pointer: w } = l, { scrollLeft: C = 0, scrollTop: B = 0 } = ((jt = n.scrollablePlotArea) == null ? void 0 : jt.scrollingContainer) || {}, z = l.outside && typeof g != "number" ? Il.documentElement.getBoundingClientRect() : { left: C, right: C + o }, R = l.getLabel(), Y = this.renderer || n.renderer, H = !!(($e = n.xAxis[0]) != null && $e.opposite), { left: j, top: W } = w.getChartPosition(), tt = M || E, it = f + B, J = 0, rt = u - y, nt = function(Pt, Vt, Tt, At = [0, 0], Me = !0) {
            let qt, de;
            if (Tt.isHeader) de = H ? 0 : rt, qt = tn(At[0] - Pt / 2, z.left, z.right - Pt - (l.outside ? j : 0));
            else if (E && Tt) {
              let Pe = l.getFixedPosition(Pt, Vt, Tt);
              qt = Pe.x, de = Pe.y - it;
            } else de = At[1] - it, qt = tn(qt = Me ? At[0] - Pt - b : At[0] + b, Me ? qt : z.left, z.right);
            return { x: qt, y: de };
          };
          Oo(e) && (e = [!1, e]);
          let Ct = e.slice(0, a.length + 1).reduce(function(Pt, Vt, Tt) {
            if (Vt !== !1 && Vt !== "") {
              let At = a[Tt - 1] || { isHeader: !0, plotX: a[0].plotX, plotY: u, series: {} }, Me = At.isHeader, qt = Me ? l : At.series, de = qt.tt = function(yi, Ue, Br) {
                let Qs = yi, { isHeader: Ol, series: Hr } = Ue, ra = Hr.tooltipOptions || S;
                if (!Qs) {
                  let ba = { padding: ra.padding, r: ra.borderRadius };
                  v || (ba.fill = ra.backgroundColor, ba["stroke-width"] = ra.borderWidth ?? (E && !Ol ? 0 : 1)), Qs = Y.label("", 0, 0, ra[Ol ? "headerShape" : "shape"] || (E && !Ol ? "rect" : "callout"), void 0, void 0, ra.useHTML).addClass(l.getClassName(Ue, !0, Ol)).attr(ba).add(R);
                }
                return Qs.isActive = !0, Qs.attr({ text: Br }), v || Qs.css(ra.style).attr({ stroke: ra.borderColor || Ue.color || Hr.color || "#333333" }), Qs;
              }(qt.tt, At, Vt.toString()), Pe = de.getBBox(), Ci = Pe.width + de.strokeWidth();
              Me && (J = Pe.height, rt += J, H && (it -= J));
              let { anchorX: ji, anchorY: na } = function(yi) {
                let Ue, Br, { isHeader: Qs, plotX: Ol = 0, plotY: Hr = 0, series: ra } = yi;
                if (Qs) Ue = Math.max(c + Ol, c), Br = f + u / 2;
                else {
                  let { xAxis: ba, yAxis: mn } = ra;
                  Ue = ba.pos + tn(Ol, -b, ba.len + b), ra.shouldShowTooltip(0, mn.pos - f + Hr, { ignoreX: !0 }) && (Br = mn.pos + Hr);
                }
                return { anchorX: Ue = tn(Ue, z.left - b, z.right + b), anchorY: Br };
              }(At);
              if (typeof na == "number") {
                let yi = Pe.height + 1, Ue = (M || nt).call(l, Ci, yi, At, [ji, na]);
                Pt.push({ align: tt ? 0 : void 0, anchorX: ji, anchorY: na, boxWidth: Ci, point: At, rank: As(Ue.rank, +!!Me), size: yi, target: Ue.y, tt: de, x: Ue.x });
              } else de.isActive = !1;
            }
            return Pt;
          }, []);
          !tt && Ct.some((Pt) => {
            let { outside: Vt } = l, Tt = (Vt ? j : 0) + Pt.anchorX;
            return Tt < z.left && Tt + Pt.boxWidth < z.right || Tt < j - z.left + Pt.boxWidth && z.right - Tt > Tt;
          }) && (Ct = Ct.map((Pt) => {
            let { x: Vt, y: Tt } = nt.call(this, Pt.boxWidth, Pt.size, Pt.point, [Pt.anchorX, Pt.anchorY], !1);
            return Ad(Pt, { target: Tt, x: Vt });
          })), l.cleanSplit(), Jl(Ct, rt);
          let ht = { left: j, right: j };
          Ct.forEach(function(Pt) {
            let { x: Vt, boxWidth: Tt, isHeader: At } = Pt;
            !At && (l.outside && j + Vt < ht.left && (ht.left = j + Vt), !At && l.outside && ht.left + Tt > ht.right && (ht.right = j + Vt));
          }), Ct.forEach(function(Pt) {
            let { x: Vt, anchorX: Tt, anchorY: At, pos: Me, point: { isHeader: qt } } = Pt, de = { visibility: Me === void 0 ? "hidden" : "inherit", x: Vt, y: (Me || 0) + it + (E && T.y || 0), anchorX: Tt, anchorY: At };
            if (l.outside && Vt < Tt) {
              let Pe = j - ht.left;
              Pe > 0 && (qt || (de.x = Vt + Pe, de.anchorX = Tt + Pe), qt && (de.x = (ht.right - ht.left) / 2, de.anchorX = Tt + Pe));
            }
            Pt.tt.attr(de);
          });
          let { container: wt, outside: Yt, renderer: kt } = l;
          if (Yt && wt && kt) {
            let { width: Pt, height: Vt, x: Tt, y: At } = R.getBBox();
            kt.setSize(Pt + Tt, Vt + At, !1), wt.style.left = ht.left + "px", wt.style.top = W + "px";
          }
          mu && R.attr({ opacity: R.opacity === 1 ? 0.999 : 1 });
        }
        drawTracker() {
          if (!this.shouldStickOnContact()) {
            this.tracker && (this.tracker = this.tracker.destroy());
            return;
          }
          let e = this.chart, a = this.label, l = this.shared ? e.hoverPoints : e.hoverPoint;
          if (!a || !l) return;
          let n = { x: 0, y: 0, width: 0, height: 0 }, o = this.getAnchor(l), h = a.getBBox();
          o[0] += e.plotLeft - (a.translateX || 0), o[1] += e.plotTop - (a.translateY || 0), n.x = Math.min(0, o[0]), n.y = Math.min(0, o[1]), n.width = o[0] < 0 ? Math.max(Math.abs(o[0]), h.width - o[0]) : Math.max(Math.abs(o[0]), h.width), n.height = o[1] < 0 ? Math.max(Math.abs(o[1]), h.height - Math.abs(o[1])) : Math.max(Math.abs(o[1]), h.height), this.tracker ? this.tracker.attr(n) : (this.tracker = a.renderer.rect(n).addClass("highcharts-tracker").add(a), e.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
        }
        styledModeFormat(e) {
          return e.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"');
        }
        headerFooterFormatter(e, a) {
          let l = e.series, n = l.tooltipOptions, o = l.xAxis, h = o == null ? void 0 : o.dateTime, u = { isFooter: a, point: e }, c = n.xDateFormat || "", f = n[a ? "footerFormat" : "headerFormat"];
          return Ts(this, "headerFormatter", u, function(y) {
            if (h && !c && Od(e.key) && (c = h.getXDateFormat(e.key, n.dateTimeLabelFormats)), h && c) {
              if (rr(c)) {
                let g = c;
                nr[0] = (v) => l.chart.time.dateFormat(g, v), c = "%0";
              }
              (e.tooltipDateKeys || ["key"]).forEach((g) => {
                f = f.replace(RegExp("point\\." + g + "([ \\)}])"), `(point.${g}:${c})$1`);
              });
            }
            l.chart.styledMode && (f = this.styledModeFormat(f)), y.text = Ge(f, e, this.chart);
          }), u.text || "";
        }
        update(e) {
          this.destroy(), this.init(this.chart, Eo(!0, this.options, e));
        }
        updatePosition(e) {
          var z;
          let { chart: a, container: l, distance: n, options: o, pointer: h, renderer: u } = this, { height: c = 0, width: f = 0 } = this.getLabel(), { fixed: y, positioner: g } = o, { left: v, top: b, scaleX: S, scaleY: E } = h.getChartPosition(), T = (g || y && this.getFixedPosition || this.getPosition).call(this, f, c, e), M = Z.doc, w = (e.plotX || 0) + a.plotLeft, C = (e.plotY || 0) + a.plotTop, B;
          if (u && l) {
            if (g || y) {
              let { scrollLeft: R = 0, scrollTop: Y = 0 } = ((z = a.scrollablePlotArea) == null ? void 0 : z.scrollingContainer) || {};
              T.x += R + v - n, T.y += Y + b - n;
            }
            B = (o.borderWidth || 0) + 2 * n + 2, u.setSize(tn(f + B, 0, M.documentElement.clientWidth) - 1, c + B, !1), (S !== 1 || E !== 1) && (yu(l, { transform: `scale(${S}, ${E})` }), w *= S, C *= E), w += v - T.x, C += b - T.y;
          }
          this.move(Math.round(T.x), Math.round(T.y || 0), w, C);
        }
      }
      (function(p) {
        p.compose = function(e) {
          Ed(gu, "Core.Tooltip") && $l(e, "afterInit", function() {
            let a = this.chart;
            a.options.tooltip && (a.tooltip = new p(a, a.options.tooltip, this));
          });
        };
      })(dl || (dl = {}));
      let vu = dl, { animObject: Cd } = We, { defaultOptions: Os } = zi, { format: bu } = Ri, { addEvent: xu, crisp: Es, erase: ws, extend: Cs, fireEvent: or, getNestedProperty: Su, isArray: hr, isFunction: ur, isNumber: es, isObject: cr, merge: fl, pick: ma, syncTimeout: kd, removeEvent: wo, uniqueKey: Mu } = Mt;
      class ea {
        animateBeforeDestroy() {
          let e = this, a = { x: e.startXPos, opacity: 0 }, l = e.getGraphicalProps();
          l.singular.forEach(function(n) {
            e[n] = e[n].animate(n === "dataLabel" ? { x: e[n].startXPos, y: e[n].startYPos, opacity: 0 } : a);
          }), l.plural.forEach(function(n) {
            e[n].forEach(function(o) {
              o.element && o.animate(Cs({ x: e.startXPos }, o.startYPos ? { x: o.startXPos, y: o.startYPos } : {}));
            });
          });
        }
        applyOptions(e, a) {
          let l = this.series, n = l.options.pointValKey || l.pointValKey;
          return Cs(this, e = ea.prototype.optionsToObject.call(this, e)), this.options = this.options ? Cs(this.options, e) : e, e.group && delete this.group, e.dataLabels && delete this.dataLabels, n && (this.y = ea.prototype.getNestedProperty.call(this, n)), this.selected && (this.state = "select"), "name" in this && a === void 0 && l.xAxis && l.xAxis.hasNames && (this.x = l.xAxis.nameToX(this)), this.x === void 0 && l ? this.x = a ?? l.autoIncrement() : es(e.x) && l.options.relativeXValue ? this.x = l.autoIncrement(e.x) : typeof this.x == "string" && (a ?? (a = l.chart.time.parse(this.x)), es(a) && (this.x = a)), this.isNull = this.isValid && !this.isValid(), this.formatPrefix = this.isNull ? "null" : "point", this;
        }
        destroy() {
          if (!this.destroyed) {
            let e = this, a = e.series, l = a.chart, n = a.options.dataSorting, o = l.hoverPoints, h = Cd(e.series.chart.renderer.globalAnimation), u = () => {
              for (let c in (e.graphic || e.graphics || e.dataLabel || e.dataLabels) && (wo(e), e.destroyElements()), e) delete e[c];
            };
            e.legendItem && l.legend.destroyItem(e), o && (e.setState(), ws(o, e), o.length || (l.hoverPoints = null)), e === l.hoverPoint && e.onMouseOut(), n != null && n.enabled ? (this.animateBeforeDestroy(), kd(u, h.duration)) : u(), l.pointCount--;
          }
          this.destroyed = !0;
        }
        destroyElements(e) {
          let a = this, l = a.getGraphicalProps(e);
          l.singular.forEach(function(n) {
            a[n] = a[n].destroy();
          }), l.plural.forEach(function(n) {
            a[n].forEach(function(o) {
              o != null && o.element && o.destroy();
            }), delete a[n];
          });
        }
        firePointEvent(e, a, l) {
          let n = this, o = this.series.options;
          n.manageEvent(e), e === "click" && o.allowPointSelect && (l = function(h) {
            !n.destroyed && n.select && n.select(null, h.ctrlKey || h.metaKey || h.shiftKey);
          }), or(n, e, a, l);
        }
        getClassName() {
          var e;
          return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (this.colorIndex !== void 0 ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + ((e = this.zone) != null && e.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
        }
        getGraphicalProps(e) {
          let a, l, n = this, o = [], h = { singular: [], plural: [] };
          for ((e = e || { graphic: 1, dataLabel: 1 }).graphic && o.push("graphic", "connector"), e.dataLabel && o.push("dataLabel", "dataLabelPath", "dataLabelUpper"), l = o.length; l--; ) n[a = o[l]] && h.singular.push(a);
          return ["graphic", "dataLabel"].forEach(function(u) {
            let c = u + "s";
            e[u] && n[c] && h.plural.push(c);
          }), h;
        }
        getNestedProperty(e) {
          return e ? e.indexOf("custom.") === 0 ? Su(e, this.options) : this[e] : void 0;
        }
        getZone() {
          let e = this.series, a = e.zones, l = e.zoneAxis || "y", n, o = 0;
          for (n = a[0]; this[l] >= n.value; ) n = a[++o];
          return this.nonZonedColor || (this.nonZonedColor = this.color), n != null && n.color && !this.options.color ? this.color = n.color : this.color = this.nonZonedColor, n;
        }
        hasNewShapeType() {
          return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
        }
        constructor(e, a, l) {
          this.formatPrefix = "point", this.visible = !0, this.point = this, this.series = e, this.applyOptions(a, l), this.id ?? (this.id = Mu()), this.resolveColor(), this.dataLabelOnNull ?? (this.dataLabelOnNull = e.options.nullInteraction), e.chart.pointCount++, or(this, "afterInit");
        }
        isValid() {
          return (es(this.x) || this.x instanceof Date) && es(this.y);
        }
        optionsToObject(e) {
          var y;
          let a = this.series, l = a.options.keys, n = l || a.pointArrayMap || ["y"], o = n.length, h = {}, u, c = 0, f = 0;
          if (es(e) || e === null) h[n[0]] = e;
          else if (hr(e)) for (!l && e.length > o && ((u = typeof e[0]) == "string" ? (y = a.xAxis) != null && y.dateTime ? h.x = a.chart.time.parse(e[0]) : h.name = e[0] : u === "number" && (h.x = e[0]), c++); f < o; ) l && e[c] === void 0 || (n[f].indexOf(".") > 0 ? ea.prototype.setNestedProperty(h, e[c], n[f]) : h[n[f]] = e[c]), c++, f++;
          else typeof e == "object" && (h = e, e.dataLabels && (a.hasDataLabels = () => !0), e.marker && (a._hasPointMarkers = !0));
          return h;
        }
        pos(e, a = this.plotY) {
          if (!this.destroyed) {
            let { plotX: l, series: n } = this, { chart: o, xAxis: h, yAxis: u } = n, c = 0, f = 0;
            if (es(l) && es(a)) return e && (c = h ? h.pos : o.plotLeft, f = u ? u.pos : o.plotTop), o.inverted && h && u ? [u.len - a + f, h.len - l + c] : [l + c, a + f];
          }
        }
        resolveColor() {
          let e = this.series, a = e.chart.options.chart, l = e.chart.styledMode, n, o, h = a.colorCount, u;
          delete this.nonZonedColor, e.options.colorByPoint ? (l || (n = (o = e.options.colors || e.chart.options.colors)[e.colorCounter], h = o.length), u = e.colorCounter, e.colorCounter++, e.colorCounter === h && (e.colorCounter = 0)) : (l || (n = e.color), u = e.colorIndex), this.colorIndex = ma(this.options.colorIndex, u), this.color = ma(this.options.color, n);
        }
        setNestedProperty(e, a, l) {
          return l.split(".").reduce(function(n, o, h, u) {
            let c = u.length - 1 === h;
            return n[o] = c ? a : cr(n[o], !0) ? n[o] : {}, n[o];
          }, e), e;
        }
        shouldDraw() {
          return !this.isNull;
        }
        tooltipFormatter(e) {
          var c;
          let { chart: a, pointArrayMap: l = ["y"], tooltipOptions: n } = this.series, { valueDecimals: o = "", valuePrefix: h = "", valueSuffix: u = "" } = n;
          return a.styledMode && (e = ((c = a.tooltip) == null ? void 0 : c.styledModeFormat(e)) || e), l.forEach((f) => {
            f = "{point." + f, (h || u) && (e = e.replace(RegExp(f + "}", "g"), h + f + "}" + u)), e = e.replace(RegExp(f + "}", "g"), f + ":,." + o + "f}");
          }), bu(e, this, a);
        }
        update(e, a, l, n) {
          let o, h = this, u = h.series, c = h.graphic, f = u.chart, y = u.options;
          function g() {
            h.applyOptions(e);
            let v = c && h.hasMockGraphic, b = h.y === null ? !v : v;
            c && b && (h.graphic = c.destroy(), delete h.hasMockGraphic), cr(e, !0) && (c != null && c.element && e && e.marker && e.marker.symbol !== void 0 && (h.graphic = c.destroy()), e != null && e.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy())), o = h.index;
            let S = {};
            for (let E of u.dataColumnKeys()) S[E] = h[E];
            u.dataTable.setRow(S, o), y.data[o] = cr(y.data[o], !0) || cr(e, !0) ? h.options : ma(e, y.data[o]), u.isDirty = u.isDirtyData = !0, !u.fixedBox && u.hasCartesianSeries && (f.isDirtyBox = !0), y.legendType === "point" && (f.isDirtyLegend = !0), a && f.redraw(l);
          }
          a = ma(a, !0), n === !1 ? g() : h.firePointEvent("update", { options: e }, g);
        }
        remove(e, a) {
          this.series.removePoint(this.series.data.indexOf(this), e, a);
        }
        select(e, a) {
          let l = this, n = l.series, o = n.chart;
          e = ma(e, !l.selected), this.selectedStaging = e, l.firePointEvent(e ? "select" : "unselect", { accumulate: a }, function() {
            l.selected = l.options.selected = e, n.options.data[n.data.indexOf(l)] = l.options, l.setState(e && "select"), a || o.getSelectedPoints().forEach(function(h) {
              let u = h.series;
              h.selected && h !== l && (h.selected = h.options.selected = !1, u.options.data[u.data.indexOf(h)] = h.options, h.setState(o.hoverPoints && u.options.inactiveOtherPoints ? "inactive" : ""), h.firePointEvent("unselect"));
            });
          }), delete this.selectedStaging;
        }
        onMouseOver(e) {
          let { inverted: a, pointer: l } = this.series.chart;
          l && (e = e ? l.normalize(e) : l.getChartCoordinatesFromPoint(this, a), l.runPointActions(e, this));
        }
        onMouseOut() {
          let e = this.series.chart;
          this.firePointEvent("mouseOut"), this.series.options.inactiveOtherPoints || (e.hoverPoints || []).forEach(function(a) {
            a.setState();
          }), e.hoverPoints = e.hoverPoint = null;
        }
        manageEvent(e) {
          var n, o, h, u, c, f, y;
          let a = fl(this.series.options.point, this.options), l = (n = a.events) == null ? void 0 : n[e];
          ur(l) && (!((o = this.hcEvents) != null && o[e]) || ((u = (h = this.hcEvents) == null ? void 0 : h[e]) == null ? void 0 : u.map((g) => g.fn).indexOf(l)) === -1) ? ((c = this.importedUserEvent) == null || c.call(this), this.importedUserEvent = xu(this, e, l), this.hcEvents && (this.hcEvents[e].userEvent = !0)) : this.importedUserEvent && !l && ((f = this.hcEvents) != null && f[e]) && ((y = this.hcEvents) != null && y[e].userEvent) && (wo(this, e), delete this.hcEvents[e], Object.keys(this.hcEvents) || delete this.importedUserEvent);
        }
        setState(e, a) {
          var R, Y;
          let l = this.series, n = this.state, o = l.options.states[e || "normal"] || {}, h = Os.plotOptions[l.type].marker && l.options.marker, u = h && h.enabled === !1, c = ((R = h == null ? void 0 : h.states) == null ? void 0 : R[e || "normal"]) || {}, f = c.enabled === !1, y = this.marker || {}, g = l.chart, v = h && l.markerAttribs, b = l.halo, S, E, T, M = l.stateMarkerGraphic, w;
          if ((e = e || "") === this.state && !a || this.selected && e !== "select" || o.enabled === !1 || e && (f || u && c.enabled === !1) || e && y.states && y.states[e] && y.states[e].enabled === !1) return;
          if (this.state = e, v && (S = l.markerAttribs(this, e)), this.graphic && !this.hasMockGraphic) {
            if (n && this.graphic.removeClass("highcharts-point-" + n), e && this.graphic.addClass("highcharts-point-" + e), !g.styledMode) {
              E = l.pointAttribs(this, e), T = ma(g.options.chart.animation, o.animation);
              let H = E.opacity;
              l.options.inactiveOtherPoints && es(H) && (this.dataLabels || []).forEach(function(j) {
                j && !j.hasClass("highcharts-data-label-hidden") && (j.animate({ opacity: H }, T), j.connector && j.connector.animate({ opacity: H }, T));
              }), this.graphic.animate(E, T);
            }
            S && this.graphic.animate(S, ma(g.options.chart.animation, c.animation, h.animation)), M && M.hide();
          } else e && c && (w = y.symbol || l.symbol, M && M.currentSymbol !== w && (M = M.destroy()), S && (M ? M[a ? "animate" : "attr"]({ x: S.x, y: S.y }) : w && (l.stateMarkerGraphic = M = g.renderer.symbol(w, S.x, S.y, S.width, S.height, fl(h, c)).add(l.markerGroup), M.currentSymbol = w)), !g.styledMode && M && this.state !== "inactive" && M.attr(l.pointAttribs(this, e))), M && (M[e && this.isInside ? "show" : "hide"](), M.element.point = this, M.addClass(this.getClassName(), !0));
          let C = o.halo, B = this.graphic || M, z = (B == null ? void 0 : B.visibility) || "inherit";
          C != null && C.size && B && z !== "hidden" && !this.isCluster ? (b || (l.halo = b = g.renderer.path().add(B.parentGroup)), b.show()[a ? "animate" : "attr"]({ d: this.haloPath(C.size) }), b.attr({ class: "highcharts-halo highcharts-color-" + ma(this.colorIndex, l.colorIndex) + (this.className ? " " + this.className : ""), visibility: z, zIndex: -1 }), b.point = this, g.styledMode || b.attr(Cs({ fill: this.color || l.color, "fill-opacity": C.opacity }, ge.filterUserAttributes(C.attributes || {})))) : (Y = b == null ? void 0 : b.point) != null && Y.haloPath && !b.point.destroyed && b.animate({ d: b.point.haloPath(0) }, null, b.hide), or(this, "afterSetState", { state: e });
        }
        haloPath(e) {
          let a = this.pos();
          return a ? this.series.chart.renderer.symbols.circle(Es(a[0], 1) - e, a[1] - e, 2 * e, 2 * e) : [];
        }
      }
      let Nt = ea, { parse: ue } = Oe, { charts: Le, composed: Co, isTouchDevice: an } = Z, { addEvent: Ke, attr: ko, css: pl, extend: ks, find: Dd, fireEvent: ce, isNumber: sn, isObject: ln, objectEach: Ld, offset: zd, pick: Oa, pushUnique: Tu, splat: Do } = Mt;
      class Re {
        applyInactiveState(e = []) {
          let a = [];
          e.forEach((l) => {
            let n = l.series;
            a.push(n), n.linkedParent && a.push(n.linkedParent), n.linkedSeries && a.push.apply(a, n.linkedSeries), n.navigatorSeries && a.push(n.navigatorSeries), n.boosted && n.markerGroup && a.push.apply(a, this.chart.series.filter((o) => o.markerGroup === n.markerGroup));
          }), this.chart.series.forEach((l) => {
            a.indexOf(l) === -1 ? l.setState("inactive", !0) : l.options.inactiveOtherPoints && l.setAllPointsToState("inactive");
          });
        }
        destroy() {
          let e = this;
          this.eventsToUnbind.forEach((a) => a()), this.eventsToUnbind = [], !Z.chartCount && (Re.unbindDocumentMouseUp.forEach((a) => a.unbind()), Re.unbindDocumentMouseUp.length = 0, Re.unbindDocumentTouchEnd && (Re.unbindDocumentTouchEnd = Re.unbindDocumentTouchEnd())), clearInterval(e.tooltipTimeout), Ld(e, function(a, l) {
            e[l] = void 0;
          });
        }
        getSelectionMarkerAttrs(e, a) {
          let l = { args: { chartX: e, chartY: a }, attrs: {}, shapeType: "rect" };
          return ce(this, "getSelectionMarkerAttrs", l, (n) => {
            let o, { chart: h, zoomHor: u, zoomVert: c } = this, { mouseDownX: f = 0, mouseDownY: y = 0 } = h, g = n.attrs;
            g.x = h.plotLeft, g.y = h.plotTop, g.width = u ? 1 : h.plotWidth, g.height = c ? 1 : h.plotHeight, u && (g.width = Math.max(1, Math.abs(o = e - f)), g.x = (o > 0 ? 0 : o) + f), c && (g.height = Math.max(1, Math.abs(o = a - y)), g.y = (o > 0 ? 0 : o) + y);
          }), l;
        }
        drag(e) {
          let { chart: a } = this, { mouseDownX: l = 0, mouseDownY: n = 0 } = a, { panning: o, panKey: h, selectionMarkerFill: u } = a.options.chart, c = a.plotLeft, f = a.plotTop, y = a.plotWidth, g = a.plotHeight, v = ln(o) ? o.enabled : o, b = h && e[`${h}Key`], S = e.chartX, E = e.chartY, T, M = this.selectionMarker;
          if ((!M || !M.touch) && (S < c ? S = c : S > c + y && (S = c + y), E < f ? E = f : E > f + g && (E = f + g), this.hasDragged = Math.sqrt(Math.pow(l - S, 2) + Math.pow(n - E, 2)), this.hasDragged > 10)) {
            T = a.isInsidePlot(l - c, n - f, { visiblePlotOnly: !0 });
            let { shapeType: w, attrs: C } = this.getSelectionMarkerAttrs(S, E);
            (a.hasCartesianSeries || a.mapView) && this.hasZoom && T && !b && !M && (this.selectionMarker = M = a.renderer[w](), M.attr({ class: "highcharts-selection-marker", zIndex: 7 }).add(), a.styledMode || M.attr({ fill: u || ue("#334eff").setOpacity(0.25).get() })), M && M.attr(C), T && !M && v && a.pan(e, o);
          }
        }
        dragStart(e) {
          let a = this.chart;
          a.mouseIsDown = e.type, a.cancelClick = !1, a.mouseDownX = e.chartX, a.mouseDownY = e.chartY;
        }
        getSelectionBox(e) {
          let a = { args: { marker: e }, result: e.getBBox() };
          return ce(this, "getSelectionBox", a), a.result;
        }
        drop(e) {
          let a, { chart: l, selectionMarker: n } = this;
          for (let o of l.axes) o.isPanning && (o.isPanning = !1, (o.options.startOnTick || o.options.endOnTick || o.series.some((h) => h.boosted)) && (o.forceRedraw = !0, o.setExtremes(o.userMin, o.userMax, !1), a = !0));
          if (a && l.redraw(), n && e) {
            if (this.hasDragged) {
              let o = this.getSelectionBox(n);
              l.transform({ axes: l.axes.filter((h) => h.zoomEnabled && (h.coll === "xAxis" && this.zoomX || h.coll === "yAxis" && this.zoomY)), selection: { originalEvent: e, xAxis: [], yAxis: [], ...o }, from: o });
            }
            sn(l.index) && (this.selectionMarker = n.destroy());
          }
          l && sn(l.index) && (pl(l.container, { cursor: l._cursor }), l.cancelClick = this.hasDragged > 10, l.mouseIsDown = !1, this.hasDragged = 0, this.pinchDown = []);
        }
        findNearestKDPoint(e, a, l) {
          let n;
          return e.forEach(function(o) {
            let h = !(o.noSharedTooltip && a) && 0 > o.options.findNearestPointBy.indexOf("y"), u = o.searchPoint(l, h);
            ln(u, !0) && u.series && (!ln(n, !0) || function(c, f) {
              var b, S;
              let y = c.distX - f.distX, g = c.dist - f.dist, v = ((b = f.series.group) == null ? void 0 : b.zIndex) - ((S = c.series.group) == null ? void 0 : S.zIndex);
              return y !== 0 && a ? y : g !== 0 ? g : v !== 0 ? v : c.series.index > f.series.index ? -1 : 1;
            }(n, u) > 0) && (n = u);
          }), n;
        }
        getChartCoordinatesFromPoint(e, a) {
          let { xAxis: l, yAxis: n } = e.series, o = e.shapeArgs;
          if (l && n) {
            let h = e.clientX ?? e.plotX ?? 0, u = e.plotY || 0;
            return e.isNode && o && sn(o.x) && sn(o.y) && (h = o.x, u = o.y), a ? { chartX: n.len + n.pos - u, chartY: l.len + l.pos - h } : { chartX: h + l.pos, chartY: u + n.pos };
          }
          if (o != null && o.x && o.y) return { chartX: o.x, chartY: o.y };
        }
        getChartPosition() {
          if (this.chartPosition) return this.chartPosition;
          let { container: e } = this.chart, a = zd(e);
          this.chartPosition = { left: a.left, top: a.top, scaleX: 1, scaleY: 1 };
          let { offsetHeight: l, offsetWidth: n } = e;
          return n > 2 && l > 2 && (this.chartPosition.scaleX = a.width / n, this.chartPosition.scaleY = a.height / l), this.chartPosition;
        }
        getCoordinates(e) {
          let a = { xAxis: [], yAxis: [] };
          for (let l of this.chart.axes) a[l.isXAxis ? "xAxis" : "yAxis"].push({ axis: l, value: l.toValue(e[l.horiz ? "chartX" : "chartY"]) });
          return a;
        }
        getHoverData(e, a, l, n, o, h) {
          let u = [], c = function(b) {
            return b.visible && !(!o && b.directTouch) && Oa(b.options.enableMouseTracking, !0);
          }, f = a, y, g = { chartX: h ? h.chartX : void 0, chartY: h ? h.chartY : void 0, shared: o };
          ce(this, "beforeGetHoverData", g), y = f && !f.stickyTracking ? [f] : l.filter((b) => b.stickyTracking && (g.filter || c)(b));
          let v = n && e || !h ? e : this.findNearestKDPoint(y, o, h);
          return f = v == null ? void 0 : v.series, v && (o && !f.noSharedTooltip ? (y = l.filter(function(b) {
            return g.filter ? g.filter(b) : c(b) && !b.noSharedTooltip;
          })).forEach(function(b) {
            var T;
            let S = (T = b.options) == null ? void 0 : T.nullInteraction, E = Dd(b.points, function(M) {
              return M.x === v.x && (!M.isNull || !!S);
            });
            ln(E) && (b.boosted && b.boost && (E = b.boost.getPoint(E)), u.push(E));
          }) : u.push(v)), ce(this, "afterGetHoverData", g = { hoverPoint: v }), { hoverPoint: g.hoverPoint, hoverSeries: f, hoverPoints: u };
        }
        getPointFromEvent(e) {
          let a = e.target, l;
          for (; a && !l; ) l = a.point, a = a.parentNode;
          return l;
        }
        onTrackerMouseOut(e) {
          let a = this.chart, l = e.relatedTarget, n = a.hoverSeries;
          this.isDirectTouch = !1, !n || !l || n.stickyTracking || this.inClass(l, "highcharts-tooltip") || this.inClass(l, "highcharts-series-" + n.index) && this.inClass(l, "highcharts-tracker") || n.onMouseOut();
        }
        inClass(e, a) {
          let l = e, n;
          for (; l; ) {
            if (n = ko(l, "class")) {
              if (n.indexOf(a) !== -1) return !0;
              if (n.indexOf("highcharts-container") !== -1) return !1;
            }
            l = l.parentElement;
          }
        }
        constructor(e, a) {
          var l;
          this.hasDragged = 0, this.pointerCaptureEventsToUnbind = [], this.eventsToUnbind = [], this.options = a, this.chart = e, this.runChartClick = !!((l = a.chart.events) != null && l.click), this.pinchDown = [], this.setDOMEvents(), ce(this, "afterInit");
        }
        normalize(e, a) {
          let l = e.touches, n = l ? l.length ? l.item(0) : Oa(l.changedTouches, e.changedTouches)[0] : e;
          a || (a = this.getChartPosition());
          let o = n.pageX - a.left, h = n.pageY - a.top;
          return ks(e, { chartX: Math.round(o /= a.scaleX), chartY: Math.round(h /= a.scaleY) });
        }
        onContainerClick(e) {
          let a = this.chart, l = a.hoverPoint, n = this.normalize(e), o = a.plotLeft, h = a.plotTop;
          !a.cancelClick && (l && this.inClass(n.target, "highcharts-tracker") ? (ce(l.series, "click", ks(n, { point: l })), a.hoverPoint && l.firePointEvent("click", n)) : (ks(n, this.getCoordinates(n)), a.isInsidePlot(n.chartX - o, n.chartY - h, { visiblePlotOnly: !0 }) && ce(a, "click", n)));
        }
        onContainerMouseDown(e) {
          var l;
          let a = (1 & (e.buttons || e.button)) == 1;
          e = this.normalize(e), Z.isFirefox && e.button !== 0 && this.onContainerMouseMove(e), (e.button === void 0 || a) && (this.zoomOption(e), a && ((l = e.preventDefault) == null || l.call(e)), this.dragStart(e));
        }
        onContainerMouseLeave(e) {
          let { pointer: a } = Le[Oa(Re.hoverChartIndex, -1)] || {};
          e = this.normalize(e), this.onContainerMouseMove(e), a && !this.inClass(e.relatedTarget, "highcharts-tooltip") && (a.reset(), a.chartPosition = void 0);
        }
        onContainerMouseEnter() {
          delete this.chartPosition;
        }
        onContainerMouseMove(e) {
          let a = this.chart, l = a.tooltip, n = this.normalize(e);
          this.setHoverChartIndex(e), (a.mouseIsDown === "mousedown" || this.touchSelect(n)) && this.drag(n), !a.openMenu && (this.inClass(n.target, "highcharts-tracker") || a.isInsidePlot(n.chartX - a.plotLeft, n.chartY - a.plotTop, { visiblePlotOnly: !0 })) && !(l != null && l.shouldStickOnContact(n)) && (this.inClass(n.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(n));
        }
        onDocumentTouchEnd(e) {
          this.onDocumentMouseUp(e);
        }
        onContainerTouchMove(e) {
          this.touchSelect(e) ? this.onContainerMouseMove(e) : this.touch(e);
        }
        onContainerTouchStart(e) {
          this.touchSelect(e) ? this.onContainerMouseDown(e) : (this.zoomOption(e), this.touch(e, !0));
        }
        onDocumentMouseMove(e) {
          let a = this.chart, l = a.tooltip, n = this.chartPosition, o = this.normalize(e, n);
          !n || a.isInsidePlot(o.chartX - a.plotLeft, o.chartY - a.plotTop, { visiblePlotOnly: !0 }) || l != null && l.shouldStickOnContact(o) || o.target !== a.container.ownerDocument && this.inClass(o.target, "highcharts-tracker") || this.reset();
        }
        onDocumentMouseUp(e) {
          var a, l;
          (l = (a = Le[Oa(Re.hoverChartIndex, -1)]) == null ? void 0 : a.pointer) == null || l.drop(e);
        }
        pinch(e) {
          let a = this, { chart: l, hasZoom: n, lastTouches: o } = a, h = [].map.call(e.touches || [], (g) => a.normalize(g)), u = h.length, c = u === 1 && (a.inClass(e.target, "highcharts-tracker") && l.runTrackerClick || a.runChartClick), f = l.tooltip, y = u === 1 && Oa(f == null ? void 0 : f.options.followTouchMove, !0);
          u > 1 ? a.initiated = !0 : y && (a.initiated = !1), n && a.initiated && !c && e.cancelable !== !1 && e.preventDefault(), e.type === "touchstart" ? (a.pinchDown = h, a.res = !0, l.mouseDownX = e.chartX) : y ? this.runPointActions(a.normalize(e)) : o && (ce(l, "touchpan", { originalEvent: e, touches: h }, () => {
            let g = (v) => {
              let b = v[0], S = v[1] || b;
              return { x: b.chartX, y: b.chartY, width: S.chartX - b.chartX, height: S.chartY - b.chartY };
            };
            l.transform({ axes: l.axes.filter((v) => v.zoomEnabled && (this.zoomHor && v.horiz || this.zoomVert && !v.horiz)), to: g(h), from: g(o), trigger: e.type });
          }), a.res && (a.res = !1, this.reset(!1, 0))), a.lastTouches = h;
        }
        reset(e, a) {
          let l = this.chart, n = l.hoverSeries, o = l.hoverPoint, h = l.hoverPoints, u = l.tooltip, c = u != null && u.shared ? h : o;
          e && c && Do(c).forEach(function(f) {
            f.series.isCartesian && f.plotX === void 0 && (e = !1);
          }), e ? u && c && Do(c).length && (u.refresh(c), u.shared && h ? h.forEach(function(f) {
            f.setState(f.state, !0), f.series.isCartesian && (f.series.xAxis.crosshair && f.series.xAxis.drawCrosshair(null, f), f.series.yAxis.crosshair && f.series.yAxis.drawCrosshair(null, f));
          }) : o && (o.setState(o.state, !0), l.axes.forEach(function(f) {
            f.crosshair && o.series[f.coll] === f && f.drawCrosshair(null, o);
          }))) : (o && o.onMouseOut(), h && h.forEach(function(f) {
            f.setState();
          }), n && n.onMouseOut(), u && u.hide(a), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), l.axes.forEach(function(f) {
            f.hideCrosshair();
          }), l.hoverPoints = l.hoverPoint = void 0);
        }
        runPointActions(e, a, l) {
          var E;
          let n = this.chart, o = n.series, h = (E = n.tooltip) != null && E.options.enabled ? n.tooltip : void 0, u = !!h && h.shared, c = a || n.hoverPoint, f = (c == null ? void 0 : c.series) || n.hoverSeries, y = (!e || e.type !== "touchmove") && (!!a || (f == null ? void 0 : f.directTouch) && this.isDirectTouch), g = this.getHoverData(c, f, o, y, u, e);
          c = g.hoverPoint, f = g.hoverSeries;
          let v = g.hoverPoints, b = (f == null ? void 0 : f.tooltipOptions.followPointer) && !f.tooltipOptions.split, S = u && f && !f.noSharedTooltip;
          if (c && (l || c !== n.hoverPoint || h != null && h.isHidden)) {
            if ((n.hoverPoints || []).forEach(function(T) {
              v.indexOf(T) === -1 && T.setState();
            }), n.hoverSeries !== f && f.onMouseOver(), this.applyInactiveState(v), (v || []).forEach(function(T) {
              T.setState("hover");
            }), n.hoverPoint && n.hoverPoint.firePointEvent("mouseOut"), !c.series) return;
            n.hoverPoints = v, n.hoverPoint = c, c.firePointEvent("mouseOver", void 0, () => {
              h && c && h.refresh(S ? v : c, e);
            });
          } else if (b && h && !h.isHidden) {
            let T = h.getAnchor([{}], e);
            n.isInsidePlot(T[0], T[1], { visiblePlotOnly: !0 }) && h.updatePosition({ plotX: T[0], plotY: T[1] });
          }
          this.unDocMouseMove || (this.unDocMouseMove = Ke(n.container.ownerDocument, "mousemove", (T) => {
            var M, w;
            return (w = (M = Le[Re.hoverChartIndex ?? -1]) == null ? void 0 : M.pointer) == null ? void 0 : w.onDocumentMouseMove(T);
          }), this.eventsToUnbind.push(this.unDocMouseMove)), n.axes.forEach(function(T) {
            var C;
            let M, w = ((C = T.crosshair) == null ? void 0 : C.snap) ?? !0;
            !w || (M = n.hoverPoint) && M.series[T.coll] === T || (M = Dd(v, (B) => {
              var z;
              return ((z = B.series) == null ? void 0 : z[T.coll]) === T;
            })), M || !w ? T.drawCrosshair(e, M) : T.hideCrosshair();
          });
        }
        setDOMEvents() {
          let e = this.chart.container, a = e.ownerDocument;
          e.onmousedown = this.onContainerMouseDown.bind(this), e.onmousemove = this.onContainerMouseMove.bind(this), e.onclick = this.onContainerClick.bind(this), this.eventsToUnbind.push(Ke(e, "mouseenter", this.onContainerMouseEnter.bind(this)), Ke(e, "mouseleave", this.onContainerMouseLeave.bind(this))), Re.unbindDocumentMouseUp.some((n) => n.doc === a) || Re.unbindDocumentMouseUp.push({ doc: a, unbind: Ke(a, "mouseup", this.onDocumentMouseUp.bind(this)) });
          let l = this.chart.renderTo.parentElement;
          for (; l && l.tagName !== "BODY"; ) this.eventsToUnbind.push(Ke(l, "scroll", () => {
            delete this.chartPosition;
          })), l = l.parentElement;
          this.eventsToUnbind.push(Ke(e, "touchstart", this.onContainerTouchStart.bind(this), { passive: !1 }), Ke(e, "touchmove", this.onContainerTouchMove.bind(this), { passive: !1 })), Re.unbindDocumentTouchEnd || (Re.unbindDocumentTouchEnd = Ke(a, "touchend", this.onDocumentTouchEnd.bind(this), { passive: !1 })), this.setPointerCapture(), Ke(this.chart, "redraw", this.setPointerCapture.bind(this));
        }
        setPointerCapture() {
          var o, h;
          if (!an) return;
          let e = this.pointerCaptureEventsToUnbind, a = this.chart, l = a.container, n = Oa((o = a.options.tooltip) == null ? void 0 : o.followTouchMove, !0) && a.series.some((u) => u.options.findNearestPointBy.indexOf("y") > -1);
          !this.hasPointerCapture && n ? (e.push(Ke(l, "pointerdown", (u) => {
            var c, f;
            (c = u.target) != null && c.hasPointerCapture(u.pointerId) && ((f = u.target) == null || f.releasePointerCapture(u.pointerId));
          }), Ke(l, "pointermove", (u) => {
            var c, f;
            (f = (c = a.pointer) == null ? void 0 : c.getPointFromEvent(u)) == null || f.onMouseOver(u);
          })), a.styledMode || pl(l, { "touch-action": "none" }), l.className += " highcharts-no-touch-action", this.hasPointerCapture = !0) : this.hasPointerCapture && !n && (e.forEach((u) => u()), e.length = 0, a.styledMode || pl(l, { "touch-action": Oa((h = a.options.chart.style) == null ? void 0 : h["touch-action"], "manipulation") }), l.className = l.className.replace(" highcharts-no-touch-action", ""), this.hasPointerCapture = !1);
        }
        setHoverChartIndex(e) {
          var n;
          let a = this.chart, l = Z.charts[Oa(Re.hoverChartIndex, -1)];
          if (l && l !== a) {
            let o = { relatedTarget: a.container };
            e && !(e != null && e.relatedTarget) && Object.assign({}, e, o), (n = l.pointer) == null || n.onContainerMouseLeave(e || o);
          }
          l != null && l.mouseIsDown || (Re.hoverChartIndex = a.index);
        }
        touch(e, a) {
          let l, { chart: n, pinchDown: o = [] } = this;
          this.setHoverChartIndex(), (e = this.normalize(e)).touches.length === 1 ? n.isInsidePlot(e.chartX - n.plotLeft, e.chartY - n.plotTop, { visiblePlotOnly: !0 }) && !n.openMenu ? (a && this.runPointActions(e), e.type === "touchmove" && (l = !!o[0] && Math.pow(o[0].chartX - e.chartX, 2) + Math.pow(o[0].chartY - e.chartY, 2) >= 16), Oa(l, !0) && this.pinch(e)) : a && this.reset() : e.touches.length === 2 && this.pinch(e);
        }
        touchSelect(e) {
          return !!(this.chart.zooming.singleTouch && e.touches && e.touches.length === 1);
        }
        zoomOption(e) {
          let a = this.chart, l = a.inverted, n = a.zooming.type || "", o, h;
          /touch/.test(e.type) && (n = Oa(a.zooming.pinchType, n)), this.zoomX = o = /x/.test(n), this.zoomY = h = /y/.test(n), this.zoomHor = o && !l || h && l, this.zoomVert = h && !l || o && l, this.hasZoom = o || h;
        }
      }
      Re.unbindDocumentMouseUp = [], function(p) {
        p.compose = function(e) {
          Tu(Co, "Core.Pointer") && Ke(e, "beforeRender", function() {
            this.pointer = new p(this, this.options);
          });
        };
      }(Re || (Re = {}));
      let mi = Re;
      (function(p) {
        p.setLength = function(e, a, l) {
          return Array.isArray(e) ? (e.length = a, e) : e[l ? "subarray" : "slice"](0, a);
        }, p.splice = function(e, a, l, n, o = []) {
          if (Array.isArray(e)) return Array.isArray(o) || (o = Array.from(o)), { removed: e.splice(a, l, ...o), array: e };
          let h = Object.getPrototypeOf(e).constructor, u = e[n ? "subarray" : "slice"](a, a + l), c = new h(e.length - l + o.length);
          return c.set(e.subarray(0, a), 0), c.set(o, a), c.set(e.subarray(a + l), a + o.length), { removed: u, array: c };
        };
      })(yt || (yt = {}));
      let { setLength: Ye, splice: Lo } = yt, { fireEvent: gl, objectEach: Ds, uniqueKey: ml } = Mt, ia = class {
        constructor(p = {}) {
          this.autoId = !p.id, this.columns = {}, this.id = p.id || ml(), this.modified = this, this.rowCount = 0, this.versionTag = ml();
          let e = 0;
          Ds(p.columns || {}, (a, l) => {
            this.columns[l] = a.slice(), e = Math.max(e, a.length);
          }), this.applyRowCount(e);
        }
        applyRowCount(p) {
          this.rowCount = p, Ds(this.columns, (e, a) => {
            e.length !== p && (this.columns[a] = Ye(e, p));
          });
        }
        deleteRows(p, e = 1) {
          if (e > 0 && p < this.rowCount) {
            let a = 0;
            Ds(this.columns, (l, n) => {
              this.columns[n] = Lo(l, p, e).array, a = l.length;
            }), this.rowCount = a;
          }
          gl(this, "afterDeleteRows", { rowIndex: p, rowCount: e }), this.versionTag = ml();
        }
        getColumn(p, e) {
          return this.columns[p];
        }
        getColumns(p, e) {
          return (p || Object.keys(this.columns)).reduce((a, l) => (a[l] = this.columns[l], a), {});
        }
        getRow(p, e) {
          return (e || Object.keys(this.columns)).map((a) => {
            var l;
            return (l = this.columns[a]) == null ? void 0 : l[p];
          });
        }
        setColumn(p, e = [], a = 0, l) {
          this.setColumns({ [p]: e }, a, l);
        }
        setColumns(p, e, a) {
          let l = this.rowCount;
          Ds(p, (n, o) => {
            this.columns[o] = n.slice(), l = n.length;
          }), this.applyRowCount(l), a != null && a.silent || (gl(this, "afterSetColumns"), this.versionTag = ml());
        }
        setRow(p, e = this.rowCount, a, l) {
          let { columns: n } = this, o = a ? this.rowCount + 1 : e + 1;
          Ds(p, (h, u) => {
            let c = n[u] || (l == null ? void 0 : l.addColumns) !== !1 && Array(o);
            c && (a ? c = Lo(c, e, 0, !0, [h]).array : c[e] = h, n[u] = c);
          }), o > this.rowCount && this.applyRowCount(o), l != null && l.silent || (gl(this, "afterSetRows"), this.versionTag = ml());
        }
      }, { extend: zo, merge: Au, pick: Ro } = Mt;
      (function(p) {
        function e(a, l, n) {
          var B, z;
          let o = this.legendItem = this.legendItem || {}, { chart: h, options: u } = this, { baseline: c = 0, symbolWidth: f, symbolHeight: y } = a, g = this.symbol || "circle", v = y / 2, b = h.renderer, S = o.group, E = c - Math.round((((B = a.fontMetrics) == null ? void 0 : B.b) || y) * (n ? 0.4 : 0.3)), T = {}, M, w = u.marker, C = 0;
          if (h.styledMode || (T["stroke-width"] = Math.min(u.lineWidth || 0, 24), u.dashStyle ? T.dashstyle = u.dashStyle : u.linecap === "square" || (T["stroke-linecap"] = "round")), o.line = b.path().addClass("highcharts-graph").attr(T).add(S), n && (o.area = b.path().addClass("highcharts-area").add(S)), T["stroke-linecap"] && (C = Math.min(o.line.strokeWidth(), f) / 2), f) {
            let R = [["M", C, E], ["L", f - C, E]];
            o.line.attr({ d: R }), (z = o.area) == null || z.attr({ d: [...R, ["L", f - C, c], ["L", C, c]] });
          }
          if (w && w.enabled !== !1 && f) {
            let R = Math.min(Ro(w.radius, v), v);
            g.indexOf("url") === 0 && (w = Au(w, { width: y, height: y }), R = 0), o.symbol = M = b.symbol(g, f / 2 - R, E - R, 2 * R, 2 * R, zo({ context: "legend" }, w)).addClass("highcharts-point").add(S), M.isMarker = !0;
          }
        }
        p.areaMarker = function(a, l) {
          e.call(this, a, l, !0);
        }, p.lineMarker = e, p.rectangle = function(a, l) {
          let n = l.legendItem || {}, o = a.options, h = a.symbolHeight, u = o.squareSymbol, c = u ? h : a.symbolWidth;
          n.symbol = this.chart.renderer.rect(u ? (a.symbolWidth - h) / 2 : 0, a.baseline - h + 1, c, h, Ro(a.options.symbolRadius, h / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(n.group);
        };
      })(dt || (dt = {}));
      let Ou = dt, { defaultOptions: Eu } = zi, { extend: Rd, extendClass: Nd, merge: Bd } = Mt;
      (function(p) {
        function e(a, l) {
          let n = Eu.plotOptions || {}, o = l.defaultOptions, h = l.prototype;
          return h.type = a, h.pointClass || (h.pointClass = Nt), !p.seriesTypes[a] && (o && (n[a] = o), p.seriesTypes[a] = l, !0);
        }
        p.seriesTypes = Z.seriesTypes, p.registerSeriesType = e, p.seriesType = function(a, l, n, o, h) {
          let u = Eu.plotOptions || {};
          if (l = l || "", u[a] = Bd(u[l], n), delete p.seriesTypes[a], e(a, Nd(p.seriesTypes[l] || function() {
          }, o)), p.seriesTypes[a].prototype.type = a, h) {
            class c extends Nt {
            }
            Rd(c.prototype, h), p.seriesTypes[a].prototype.pointClass = c;
          }
          return p.seriesTypes[a];
        };
      })(ft || (ft = {}));
      let Ee = ft, { animObject: No, setAnimation: Hd } = We, { defaultOptions: Bo } = zi, { registerEventOptions: Ud } = go, { svg: Xd, win: Gd } = Z, { seriesTypes: Ls } = Ee, { format: Yd } = Ri, { arrayMax: Ho, arrayMin: wu, clamp: Cu, correctFloat: ku, crisp: Lp, defined: Ne, destroyObjectProperties: nn, diffObjects: Uo, erase: Du, error: yl, extend: Ea, find: jd, fireEvent: we, getClosestDistance: Pd, getNestedProperty: Lu, insertItem: zu, isArray: Ru, isNumber: Be, isString: qd, merge: rn, objectEach: dr, pick: be, removeEvent: _d, syncTimeout: Qd } = Mt;
      class Hi {
        constructor() {
          this.zoneAxis = "y";
        }
        init(e, a) {
          var c, f, y;
          let l;
          we(this, "init", { options: a }), this.dataTable ?? (this.dataTable = new ia());
          let n = e.series;
          this.eventsToUnbind = [], this.chart = e, this.options = this.setOptions(a);
          let o = this.options, h = o.visible !== !1;
          this.linkedSeries = [], this.bindAxes(), Ea(this, { name: o.name, state: "", visible: h, selected: o.selected === !0 }), Ud(this, o);
          let u = o.events;
          (u != null && u.click || (f = (c = o.point) == null ? void 0 : c.events) != null && f.click || o.allowPointSelect) && (e.runTrackerClick = !0), this.getColor(), this.getSymbol(), this.isCartesian && (e.hasCartesianSeries = !0), n.length && (l = n[n.length - 1]), this._i = be(l == null ? void 0 : l._i, -1) + 1, this.opacity = this.options.opacity, e.orderItems("series", zu(this, n)), (y = o.dataSorting) != null && y.enabled ? this.setDataSortingOptions() : this.points || this.data || this.setData(o.data, !1), we(this, "afterInit");
        }
        is(e) {
          return Ls[e] && this instanceof Ls[e];
        }
        bindAxes() {
          let e, a = this, l = a.options, n = a.chart;
          we(this, "bindAxes", null, function() {
            (a.axisTypes || []).forEach(function(o) {
              (n[o] || []).forEach(function(h) {
                e = h.options, (be(l[o], 0) === h.index || l[o] !== void 0 && l[o] === e.id) && (zu(a, h.series), a[o] = h, h.isDirty = !0);
              }), a[o] || a.optionalAxis === o || yl(18, !0, n);
            });
          }), we(this, "afterBindAxes");
        }
        hasData() {
          return this.visible && this.dataMax !== void 0 && this.dataMin !== void 0 || this.visible && this.dataTable.rowCount > 0;
        }
        hasMarkerChanged(e, a) {
          let l = e.marker, n = a.marker || {};
          return l && (n.enabled && !l.enabled || n.symbol !== l.symbol || n.height !== l.height || n.width !== l.width);
        }
        autoIncrement(e) {
          let a, l = this.options, { pointIntervalUnit: n, relativeXValue: o } = this.options, h = this.chart.time, u = this.xIncrement ?? h.parse(l.pointStart) ?? 0;
          if (this.pointInterval = a = be(this.pointInterval, l.pointInterval, 1), o && Be(e) && (a *= e), n) {
            let c = h.toParts(u);
            n === "day" ? c[2] += a : n === "month" ? c[1] += a : n === "year" && (c[0] += a), a = h.makeTime.apply(h, c) - u;
          }
          return o && Be(e) ? u + a : (this.xIncrement = u + a, u);
        }
        setDataSortingOptions() {
          let e = this.options;
          Ea(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 }), Ne(e.pointRange) || (e.pointRange = 1);
        }
        setOptions(e) {
          var T, M;
          let a, l = this.chart, n = l.options.plotOptions, o = l.userOptions || {}, h = rn(e), u = l.styledMode, c = { plotOptions: n, userOptions: h };
          we(this, "setOptions", c);
          let f = c.plotOptions[this.type], y = o.plotOptions || {}, g = y.series || {}, v = Bo.plotOptions[this.type] || {}, b = y[this.type] || {};
          f.dataLabels = this.mergeArrays(v.dataLabels, f.dataLabels), this.userOptions = c.userOptions;
          let S = rn(f, n.series, b, h);
          this.tooltipOptions = rn(Bo.tooltip, (T = Bo.plotOptions.series) == null ? void 0 : T.tooltip, v == null ? void 0 : v.tooltip, l.userOptions.tooltip, (M = y.series) == null ? void 0 : M.tooltip, b.tooltip, h.tooltip), this.stickyTracking = be(h.stickyTracking, b.stickyTracking, g.stickyTracking, !!this.tooltipOptions.shared && !this.noSharedTooltip || S.stickyTracking), f.marker === null && delete S.marker, this.zoneAxis = S.zoneAxis || "y";
          let E = this.zones = (S.zones || []).map((w) => ({ ...w }));
          return (S.negativeColor || S.negativeFillColor) && !S.zones && (a = { value: S[this.zoneAxis + "Threshold"] || S.threshold || 0, className: "highcharts-negative" }, u || (a.color = S.negativeColor, a.fillColor = S.negativeFillColor), E.push(a)), E.length && Ne(E[E.length - 1].value) && E.push(u ? {} : { color: this.color, fillColor: this.fillColor }), we(this, "afterSetOptions", { options: S }), S;
        }
        getName() {
          return this.options.name ?? Yd(this.chart.options.lang.seriesName, this, this.chart);
        }
        getCyclic(e, a, l) {
          let n, o, h = this.chart, u = `${e}Index`, c = `${e}Counter`, f = (l == null ? void 0 : l.length) || h.options.chart.colorCount;
          !a && (Ne(o = be(e === "color" ? this.options.colorIndex : void 0, this[u])) ? n = o : (h.series.length || (h[c] = 0), n = h[c] % f, h[c] += 1), l && (a = l[n])), n !== void 0 && (this[u] = n), this[e] = a;
        }
        getColor() {
          this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || Bo.plotOptions[this.type].color, this.chart.options.colors);
        }
        getPointsCollection() {
          return (this.hasGroupedData ? this.points : this.data) || [];
        }
        getSymbol() {
          let e = this.options.marker;
          this.getCyclic("symbol", e.symbol, this.chart.options.symbols);
        }
        getColumn(e, a) {
          return (a ? this.dataTable.modified : this.dataTable).getColumn(e, !0) || [];
        }
        findPointIndex(e, a) {
          var g;
          let l, n, o, { id: h, x: u } = e, c = this.points, f = this.options.dataSorting, y = this.cropStart || 0;
          if (h) {
            let v = this.chart.get(h);
            v instanceof Nt && (l = v);
          } else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) {
            let v = (b) => !b.touched && b.index === e.index;
            if (f != null && f.matchByName ? v = (b) => !b.touched && b.name === e.name : this.options.relativeXValue && (v = (b) => !b.touched && b.options.x === e.x), !(l = jd(c, v))) return;
          }
          return l && (o = l == null ? void 0 : l.index) !== void 0 && (n = !0), o === void 0 && Be(u) && (o = this.getColumn("x").indexOf(u, a)), o !== -1 && o !== void 0 && this.cropped && (o = o >= y ? o - y : o), !n && Be(o) && ((g = c[o]) != null && g.touched) && (o = void 0), o;
        }
        updateData(e, a) {
          var E;
          let { options: l, requireSorting: n } = this, o = l.dataSorting, h = this.points, u = [], c = e.length === h.length, f, y, g, v, b = !0;
          if (this.xIncrement = null, e.forEach((T, M) => {
            var R;
            let w, C = Ne(T) && this.pointClass.prototype.optionsToObject.call({ series: this }, T) || {}, { id: B, x: z } = C;
            B || Be(z) ? ((w = this.findPointIndex(C, v)) === -1 || w === void 0 ? u.push(T) : h[w] && T !== ((R = l.data) == null ? void 0 : R[w]) ? (h[w].update(T, !1, void 0, !1), h[w].touched = !0, n && (v = w + 1)) : h[w] && (h[w].touched = !0), (!c || M !== w || o != null && o.enabled || this.hasDerivedData) && (f = !0)) : u.push(T);
          }, this), f) for (y = h.length; y--; ) (g = h[y]) && !g.touched && ((E = g.remove) == null || E.call(g, !1, a));
          else c && !(o != null && o.enabled) ? (e.forEach((T, M) => {
            T === h[M].y || h[M].destroyed || h[M].update(T, !1, void 0, !1);
          }), u.length = 0) : b = !1;
          if (h.forEach((T) => {
            T && (T.touched = !1);
          }), !b) return !1;
          u.forEach((T) => {
            this.addPoint(T, !1, void 0, void 0, !1);
          }, this);
          let S = this.getColumn("x");
          return this.xIncrement === null && S.length && (this.xIncrement = Ho(S), this.autoIncrement()), !0;
        }
        dataColumnKeys() {
          return ["x", ...this.pointArrayMap || ["y"]];
        }
        setData(e, a = !0, l, n) {
          var Y, H;
          let o = this.points, h = (o == null ? void 0 : o.length) || 0, u = this.options, c = this.chart, f = u.dataSorting, y = this.xAxis, g = u.turboThreshold, v = this.dataTable, b = this.dataColumnKeys(), S = this.pointValKey || "y", E = (this.pointArrayMap || []).length, T = u.keys, M, w, C = 0, B = 1, z;
          c.options.chart.allowMutatingData || (u.data && delete this.options.data, this.userOptions.data && delete this.userOptions.data, z = rn(!0, e));
          let R = (e = z || e || []).length;
          if (f != null && f.enabled && (e = this.sortData(e)), c.options.chart.allowMutatingData && n !== !1 && R && h && !this.cropped && !this.hasGroupedData && this.visible && !this.boosted && (w = this.updateData(e, l)), !w) {
            this.xIncrement = null, this.colorCounter = 0;
            let j = g && R > g;
            if (j) {
              let W = this.getFirstValidPoint(e), tt = this.getFirstValidPoint(e, R - 1, -1), it = (J) => !!(Ru(J) && (T || Be(J[0])));
              if (Be(W) && Be(tt)) {
                let J = [], rt = [];
                for (let nt of e) J.push(this.autoIncrement()), rt.push(nt);
                v.setColumns({ x: J, [S]: rt });
              } else if (it(W) && it(tt))
                if (E) {
                  let J = +(W.length === E), rt = Array(b.length).fill(0).map(() => []);
                  for (let nt of e) {
                    J && rt[0].push(this.autoIncrement());
                    for (let Ct = J; Ct <= E; Ct++) (Y = rt[Ct]) == null || Y.push(nt[Ct - J]);
                  }
                  v.setColumns(b.reduce((nt, Ct, ht) => (nt[Ct] = rt[ht], nt), {}));
                } else {
                  T && (C = T.indexOf("x"), B = T.indexOf("y"), C = C >= 0 ? C : 0, B = B >= 0 ? B : 1), W.length === 1 && (B = 0);
                  let J = [], rt = [];
                  if (C === B) for (let nt of e) J.push(this.autoIncrement()), rt.push(nt[B]);
                  else for (let nt of e) J.push(nt[C]), rt.push(nt[B]);
                  v.setColumns({ x: J, [S]: rt });
                }
              else j = !1;
            }
            if (!j) {
              let W = b.reduce((tt, it) => (tt[it] = [], tt), {});
              for (M = 0; M < R; M++) {
                let tt = this.pointClass.prototype.applyOptions.apply({ series: this }, [e[M]]);
                for (let it of b) W[it][M] = tt[it];
              }
              v.setColumns(W);
            }
            for (qd(this.getColumn("y")[0]) && yl(14, !0, c), this.data = [], this.options.data = this.userOptions.data = e, M = h; M--; ) (H = o[M]) == null || H.destroy();
            y && (y.minRange = y.userMinRange), this.isDirty = c.isDirtyBox = !0, this.isDirtyData = !!o, l = !1;
          }
          u.legendType === "point" && (this.processData(), this.generatePoints()), a && c.redraw(l);
        }
        sortData(e) {
          let a = this, l = a.options.dataSorting.sortKey || "y", n = function(o, h) {
            return Ne(h) && o.pointClass.prototype.optionsToObject.call({ series: o }, h) || {};
          };
          return e.forEach(function(o, h) {
            e[h] = n(a, o), e[h].index = h;
          }, this), e.concat().sort((o, h) => {
            let u = Lu(l, o), c = Lu(l, h);
            return c < u ? -1 : +(c > u);
          }).forEach(function(o, h) {
            o.x = h;
          }, this), a.linkedSeries && a.linkedSeries.forEach(function(o) {
            var c;
            let h = o.options, u = h.data;
            !((c = h.dataSorting) != null && c.enabled) && u && (u.forEach(function(f, y) {
              u[y] = n(o, f), e[y] && (u[y].x = e[y].x, u[y].index = y);
            }), o.setData(u, !1));
          }), e;
        }
        getProcessedData(e) {
          let a = this, { dataTable: l, isCartesian: n, options: o, xAxis: h } = a, u = o.cropThreshold, c = e || a.getExtremesFromAll, f = h == null ? void 0 : h.logarithmic, y = l.rowCount, g, v, b = 0, S, E, T, M = a.getColumn("x"), w = l, C = !1;
          return h && (E = (S = h.getExtremes()).min, T = S.max, C = !!(h.categories && !h.names.length), n && a.sorted && !c && (!u || y > u || a.forceCrop) && (M[y - 1] < E || M[0] > T ? w = new ia() : a.getColumn(a.pointValKey || "y").length && (M[0] < E || M[y - 1] > T) && (w = (g = this.cropData(l, E, T)).modified, b = g.start, v = !0))), M = w.getColumn("x") || [], { modified: w, cropped: v, cropStart: b, closestPointRange: Pd([f ? M.map(f.log2lin) : M], () => a.requireSorting && !C && yl(15, !1, a.chart)) };
        }
        processData(e) {
          let a = this.xAxis, l = this.dataTable;
          if (this.isCartesian && !this.isDirty && !a.isDirty && !this.yAxis.isDirty && !e) return !1;
          let n = this.getProcessedData();
          l.modified = n.modified, this.cropped = n.cropped, this.cropStart = n.cropStart, this.closestPointRange = this.basePointRange = n.closestPointRange, we(this, "afterProcessData");
        }
        cropData(e, a, l) {
          let n = e.getColumn("x", !0) || [], o = n.length, h = {}, u, c, f = 0, y = o;
          for (u = 0; u < o; u++) if (n[u] >= a) {
            f = Math.max(0, u - 1);
            break;
          }
          for (c = u; c < o; c++) if (n[c] > l) {
            y = c + 1;
            break;
          }
          for (let g of this.dataColumnKeys()) {
            let v = e.getColumn(g, !0);
            v && (h[g] = v.slice(f, y));
          }
          return { modified: new ia({ columns: h }), start: f, end: y };
        }
        generatePoints() {
          var z, R, Y;
          let e = this.options, a = this.processedData || e.data, l = this.dataTable.modified, n = this.getColumn("x", !0), o = this.pointClass, h = l.rowCount, u = this.cropStart || 0, c = this.hasGroupedData, f = e.keys, y = [], g = (z = e.dataGrouping) != null && z.groupAll ? u : 0, v = (R = this.xAxis) == null ? void 0 : R.categories, b = this.pointArrayMap || ["y"], S = this.dataColumnKeys(), E, T, M, w, C = this.data, B;
          if (!C && !c) {
            let H = [];
            H.length = (a == null ? void 0 : a.length) || 0, C = this.data = H;
          }
          for (f && c && (this.options.keys = !1), w = 0; w < h; w++) T = u + w, c ? ((M = new o(this, l.getRow(w, S) || [])).dataGroup = this.groupMap[g + w], (Y = M.dataGroup) != null && Y.options && (M.options = M.dataGroup.options, Ea(M, M.dataGroup.options), delete M.dataLabels)) : (M = C[T], B = a ? a[T] : l.getRow(w, b), M || B === void 0 || (C[T] = M = new o(this, B, n[w]))), M && (M.index = c ? g + w : T, y[w] = M, M.category = (v == null ? void 0 : v[M.x]) ?? M.x, M.key = M.name ?? M.category);
          if (this.options.keys = f, C && (h !== (E = C.length) || c)) for (w = 0; w < E; w++) w !== u || c || (w += h), C[w] && (C[w].destroyElements(), C[w].plotX = void 0);
          this.data = C, this.points = y, we(this, "afterGeneratePoints");
        }
        getXExtremes(e) {
          return { min: wu(e), max: Ho(e) };
        }
        getExtremes(e, a) {
          var z;
          let { xAxis: l, yAxis: n } = this, o = a || this.getExtremesFromAll || this.options.getExtremesFromAll, h = o && this.cropped ? this.dataTable : this.dataTable.modified, u = h.rowCount, c = e || this.stackedYData, f = c ? [c] : ((z = this.keysAffectYAxis || this.pointArrayMap || ["y"]) == null ? void 0 : z.map((R) => h.getColumn(R, !0) || [])) || [], y = this.getColumn("x", !0), g = [], v = this.requireSorting && !this.is("column") ? 1 : 0, b = !!n && n.positiveValuesOnly, S = o || this.cropped || !l, E, T, M, w = 0, C = 0;
          for (l && (w = (E = l.getExtremes()).min, C = E.max), M = 0; M < u; M++) if (T = y[M], S || (y[M + v] || T) >= w && (y[M - v] || T) <= C) for (let R of f) {
            let Y = R[M];
            Be(Y) && (Y > 0 || !b) && g.push(Y);
          }
          let B = { activeYData: g, dataMin: wu(g), dataMax: Ho(g) };
          return we(this, "afterGetExtremes", { dataExtremes: B }), B;
        }
        applyExtremes() {
          let e = this.getExtremes();
          return this.dataMin = e.dataMin, this.dataMax = e.dataMax, e;
        }
        getFirstValidPoint(e, a = 0, l = 1) {
          let n = e.length, o = a;
          for (; o >= 0 && o < n; ) {
            if (Ne(e[o])) return e[o];
            o += l;
          }
        }
        translate() {
          var C;
          this.generatePoints();
          let e = this.options, a = e.stacking, l = this.xAxis, n = this.enabledDataSorting, o = this.yAxis, h = this.points, u = h.length, c = this.pointPlacementToXValue(), f = !!c, y = e.threshold, g = e.startFromThreshold ? y : 0, v = (e == null ? void 0 : e.nullInteraction) && o.len, b, S, E, T, M = Number.MAX_VALUE;
          function w(B) {
            return Cu(B, -1e9, 1e9);
          }
          for (b = 0; b < u; b++) {
            let B, z = h[b], R = z.x, Y, H, j = z.y, W = z.low, tt = a && ((C = o.stacking) == null ? void 0 : C.stacks[(this.negStacks && j < (g ? 0 : y) ? "-" : "") + this.stackKey]);
            z.plotX = Be(S = l.translate(R, !1, !1, !1, !0, c)) ? ku(w(S)) : void 0, a && this.visible && tt && tt[R] && (T = this.getStackIndicator(T, R, this.index), !z.isNull && T.key && (H = (Y = tt[R]).points[T.key]), Y && Ru(H) && (W = H[0], j = H[1], W === g && T.key === tt[R].base && (W = be(Be(y) ? y : o.min)), o.positiveValuesOnly && Ne(W) && W <= 0 && (W = void 0), z.total = z.stackTotal = be(Y.total), z.percentage = Ne(z.y) && Y.total ? z.y / Y.total * 100 : void 0, z.stackY = j, this.irregularWidths || Y.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis))), z.yBottom = Ne(W) ? w(o.translate(W, !1, !0, !1, !0)) : void 0, this.dataModify && (j = this.dataModify.modifyValue(j, b)), Be(j) && z.plotX !== void 0 ? B = Be(B = o.translate(j, !1, !0, !1, !0)) ? w(B) : void 0 : !Be(j) && v && (B = v), z.plotY = B, z.isInside = this.isPointInside(z), z.clientX = f ? ku(l.translate(R, !1, !1, !1, !0, c)) : S, z.negative = (z.y || 0) < (y || 0), z.isNull || z.visible === !1 || (E !== void 0 && (M = Math.min(M, Math.abs(S - E))), E = S), z.zone = this.zones.length ? z.getZone() : void 0, !z.graphic && this.group && n && (z.isNew = !0);
          }
          this.closestPointRangePx = M, we(this, "afterTranslate");
        }
        getValidPoints(e, a, l) {
          let n = this.chart;
          return (e || this.points || []).filter(function(o) {
            let { plotX: h, plotY: u } = o;
            return !!((l || !o.isNull && Be(u)) && (!a || n.isInsidePlot(h, u, { inverted: n.inverted }))) && o.visible !== !1;
          });
        }
        getSharedClipKey() {
          return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0), this.sharedClipKey;
        }
        setClip() {
          let { chart: e, group: a, markerGroup: l } = this, n = e.sharedClips, o = e.renderer, h = e.getClipBox(this), u = this.getSharedClipKey(), c = n[u];
          c ? c.animate(h) : n[u] = c = o.clipRect(h), a && a.clip(this.options.clip === !1 ? void 0 : c), l && l.clip();
        }
        animate(e) {
          let { chart: a, group: l, markerGroup: n } = this, o = a.inverted, h = No(this.options.animation), u = [this.getSharedClipKey(), h.duration, h.easing, h.defer].join(","), c = a.sharedClips[u], f = a.sharedClips[u + "m"];
          if (e && l) {
            let y = a.getClipBox(this);
            if (c) c.attr("height", y.height);
            else {
              y.width = 0, o && (y.x = a.plotHeight), c = a.renderer.clipRect(y), a.sharedClips[u] = c;
              let g = { x: -99, y: -99, width: o ? a.plotWidth + 199 : 99, height: o ? 99 : a.plotHeight + 199 };
              f = a.renderer.clipRect(g), a.sharedClips[u + "m"] = f;
            }
            l.clip(c), n == null || n.clip(f);
          } else if (c && !c.hasClass("highcharts-animating")) {
            let y = a.getClipBox(this), g = h.step;
            (n != null && n.element.childNodes.length || a.series.length > 1) && (h.step = function(v, b) {
              g && g.apply(b, arguments), b.prop === "width" && (f != null && f.element) && f.attr(o ? "height" : "width", v + 99);
            }), c.addClass("highcharts-animating").animate(y, h);
          }
        }
        afterAnimate() {
          this.setClip(), dr(this.chart.sharedClips, (e, a, l) => {
            e && !this.chart.container.querySelector(`[clip-path="url(#${e.id})"]`) && (e.destroy(), delete l[a]);
          }), this.finishedAnimating = !0, we(this, "afterAnimate");
        }
        drawPoints(e = this.points) {
          let a, l, n, o, h, u, c, f = this.chart, y = f.styledMode, { colorAxis: g, options: v } = this, b = v.marker, S = v.nullInteraction, E = this[this.specialGroup || "markerGroup"], T = this.xAxis, M = be(b.enabled, !T || !!T.isRadial || null, this.closestPointRangePx >= b.enabledThreshold * b.radius);
          if (b.enabled !== !1 || this._hasPointMarkers) for (a = 0; a < e.length; a++) {
            o = (n = (l = e[a]).graphic) ? "animate" : "attr", h = l.marker || {}, u = !!l.marker;
            let w = l.isNull;
            if ((M && !Ne(h.enabled) || h.enabled) && (!w || S) && l.visible !== !1) {
              let C = be(h.symbol, this.symbol, "rect");
              c = this.markerAttribs(l, l.selected && "select"), this.enabledDataSorting && (l.startXPos = T.reversed ? -(c.width || 0) : T.width);
              let B = l.isInside !== !1;
              if (!n && B && ((c.width || 0) > 0 || l.hasImage) && (l.graphic = n = f.renderer.symbol(C, c.x, c.y, c.width, c.height, u ? h : b).add(E), this.enabledDataSorting && f.hasRendered && (n.attr({ x: l.startXPos }), o = "animate")), n && o === "animate" && n[B ? "show" : "hide"](B).animate(c), n) {
                let z = this.pointAttribs(l, y || !l.selected ? void 0 : "select");
                y ? g && n.css({ fill: z.fill }) : n[o](z);
              }
              n && n.addClass(l.getClassName(), !0);
            } else n && (l.graphic = n.destroy());
          }
        }
        markerAttribs(e, a) {
          let l = this.options, n = l.marker, o = e.marker || {}, h = o.symbol || n.symbol, u = {}, c, f, y = be(o.radius, n == null ? void 0 : n.radius);
          a && (c = n.states[a], f = o.states && o.states[a], y = be(f == null ? void 0 : f.radius, c == null ? void 0 : c.radius, y && y + ((c == null ? void 0 : c.radiusPlus) || 0))), e.hasImage = h && h.indexOf("url") === 0, e.hasImage && (y = 0);
          let g = e.pos();
          return Be(y) && g && (l.crisp && (g[0] = Lp(g[0], e.hasImage ? 0 : h === "rect" ? (n == null ? void 0 : n.lineWidth) || 0 : 1)), u.x = g[0] - y, u.y = g[1] - y), y && (u.width = u.height = 2 * y), u;
        }
        pointAttribs(e, a) {
          var M;
          let l = this.options, n = l.marker, o = e == null ? void 0 : e.options, h = (o == null ? void 0 : o.marker) || {}, u = o == null ? void 0 : o.color, c = e == null ? void 0 : e.color, f = (M = e == null ? void 0 : e.zone) == null ? void 0 : M.color, y, g, v = this.color, b, S, E = be(h.lineWidth, n.lineWidth), T = e != null && e.isNull && l.nullInteraction ? 0 : 1;
          return v = u || f || c || v, b = h.fillColor || n.fillColor || v, S = h.lineColor || n.lineColor || v, a = a || "normal", y = n.states[a] || {}, E = be((g = h.states && h.states[a] || {}).lineWidth, y.lineWidth, E + be(g.lineWidthPlus, y.lineWidthPlus, 0)), b = g.fillColor || y.fillColor || b, S = g.lineColor || y.lineColor || S, { stroke: S, "stroke-width": E, fill: b, opacity: T = be(g.opacity, y.opacity, T) };
        }
        destroy(e) {
          var c, f;
          let a, l, n = this, o = n.chart, h = /AppleWebKit\/533/.test(Gd.navigator.userAgent), u = n.data || [];
          for (we(n, "destroy", { keepEventsForUpdate: e }), this.removeEvents(e), (n.axisTypes || []).forEach(function(y) {
            l = n[y], l != null && l.series && (Du(l.series, n), l.isDirty = l.forceRedraw = !0);
          }), n.legendItem && n.chart.legend.destroyItem(n), a = u.length; a--; ) (f = (c = u[a]) == null ? void 0 : c.destroy) == null || f.call(c);
          for (let y of n.zones) nn(y, void 0, !0);
          Mt.clearTimeout(n.animationTimeout), dr(n, function(y, g) {
            y instanceof Fi && !y.survive && y[h && g === "group" ? "hide" : "destroy"]();
          }), o.hoverSeries === n && (o.hoverSeries = void 0), Du(o.series, n), o.orderItems("series"), dr(n, function(y, g) {
            e && g === "hcEvents" || delete n[g];
          });
        }
        applyZones() {
          let { area: e, chart: a, graph: l, zones: n, points: o, xAxis: h, yAxis: u, zoneAxis: c } = this, { inverted: f, renderer: y } = a, g = this[`${c}Axis`], { isXAxis: v, len: b = 0, minPointOffset: S = 0 } = g || {}, E = ((l == null ? void 0 : l.strokeWidth()) || 0) / 2 + 1, T = (M, w = 0, C = 0) => {
            f && (C = b - C);
            let { translated: B = 0, lineClip: z } = M, R = C - B;
            z == null || z.push(["L", w, Math.abs(R) < E ? C - E * (R <= 0 ? -1 : 1) : B]);
          };
          if (n.length && (l || e) && g && Be(g.min)) {
            let M = g.getExtremes().max + S, w = (z) => {
              z.forEach((R, Y) => {
                (R[0] === "M" || R[0] === "L") && (z[Y] = [R[0], v ? b - R[1] : R[1], v ? R[2] : b - R[2]]);
              });
            };
            if (n.forEach((z) => {
              z.lineClip = [], z.translated = Cu(g.toPixels(be(z.value, M), !0) || 0, 0, b);
            }), l && !this.showLine && l.hide(), e && e.hide(), c === "y" && o.length < h.len) for (let z of o) {
              let { plotX: R, plotY: Y, zone: H } = z, j = H && n[n.indexOf(H) - 1];
              H && T(H, R, Y), j && T(j, R, Y);
            }
            let C = [], B = g.toPixels(g.getExtremes().min - S, !0);
            n.forEach((z) => {
              var Ct, ht;
              let R = z.lineClip || [], Y = Math.round(z.translated || 0);
              h.reversed && R.reverse();
              let { clip: H, simpleClip: j } = z, W = 0, tt = 0, it = h.len, J = u.len;
              v ? (W = Y, it = B) : (tt = Y, J = B);
              let rt = [["M", W, tt], ["L", it, tt], ["L", it, J], ["L", W, J], ["Z"]], nt = [rt[0], ...R, rt[1], rt[2], ...C, rt[3], rt[4]];
              C = R.reverse(), B = Y, f && (w(nt), e && w(rt)), H ? (H.animate({ d: nt }), j == null || j.animate({ d: rt })) : (H = z.clip = y.path(nt), e && (j = z.simpleClip = y.path(rt))), l && ((Ct = z.graph) == null || Ct.clip(H)), e && ((ht = z.area) == null || ht.clip(j));
            });
          } else this.visible && (l && l.show(), e && e.show());
        }
        plotGroup(e, a, l, n, o) {
          let h = this[e], u = !h, c = { visibility: l, zIndex: n || 0.1 };
          return Ne(this.opacity) && !this.chart.styledMode && this.state !== "inactive" && (c.opacity = this.opacity), h || (this[e] = h = this.chart.renderer.g().add(o)), h.addClass("highcharts-" + a + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (Ne(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (h.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0), h.attr(c)[u ? "attr" : "animate"](this.getPlotBox(a)), h;
        }
        getPlotBox(e) {
          let a = this.xAxis, l = this.yAxis, n = this.chart, o = n.inverted && !n.polar && a && this.invertible && e === "series";
          return n.inverted && (a = l, l = this.xAxis), { translateX: a ? a.left : n.plotLeft, translateY: l ? l.top : n.plotTop, rotation: 90 * !!o, rotationOriginX: o ? (a.len - l.len) / 2 : 0, rotationOriginY: o ? (a.len + l.len) / 2 : 0, scaleX: o ? -1 : 1, scaleY: 1 };
        }
        removeEvents(e) {
          let { eventsToUnbind: a } = this;
          e || _d(this), a.length && (a.forEach((l) => {
            l();
          }), a.length = 0);
        }
        render() {
          var y, g, v, b, S;
          let e = this, { chart: a, options: l, hasRendered: n } = e, o = No(l.animation), h = e.visible ? "inherit" : "hidden", u = l.zIndex, c = a.seriesGroup, f = e.finishedAnimating ? 0 : o.duration;
          we(this, "render"), e.plotGroup("group", "series", h, u, c), e.markerGroup = e.plotGroup("markerGroup", "markers", h, u, c), l.clip !== !1 && e.setClip(), f && ((y = e.animate) == null || y.call(e, !0)), e.drawGraph && (e.drawGraph(), e.applyZones()), e.visible && e.drawPoints(), (g = e.drawDataLabels) == null || g.call(e), (v = e.redrawPoints) == null || v.call(e), l.enableMouseTracking && ((b = e.drawTracker) == null || b.call(e)), f && ((S = e.animate) == null || S.call(e)), n || (f && o.defer && (f += o.defer), e.animationTimeout = Qd(() => {
            e.afterAnimate();
          }, f || 0)), e.isDirty = !1, e.hasRendered = !0, we(e, "afterRender");
        }
        redraw() {
          let e = this.isDirty || this.isDirtyData;
          this.translate(), this.render(), e && delete this.kdTree;
        }
        reserveSpace() {
          return this.visible || !this.chart.options.chart.ignoreHiddenSeries;
        }
        searchPoint(e, a) {
          let { xAxis: l, yAxis: n } = this, o = this.chart.inverted;
          return this.searchKDTree({ clientX: o ? l.len - e.chartY + l.pos : e.chartX - l.pos, plotY: o ? n.len - e.chartX + n.pos : e.chartY - n.pos }, a, e);
        }
        buildKDTree(e) {
          this.buildingKdTree = !0;
          let a = this, l = a.options, n = l.findNearestPointBy.indexOf("y") > -1 ? 2 : 1;
          delete a.kdTree, Qd(function() {
            a.kdTree = function o(h, u, c) {
              let f, y, g = h == null ? void 0 : h.length;
              if (g) return f = a.kdAxisArray[u % c], h.sort((v, b) => (v[f] || 0) - (b[f] || 0)), { point: h[y = Math.floor(g / 2)], left: o(h.slice(0, y), u + 1, c), right: o(h.slice(y + 1), u + 1, c) };
            }(a.getValidPoints(void 0, !a.directTouch, l == null ? void 0 : l.nullInteraction), n, n), a.buildingKdTree = !1;
          }, l.kdNow || (e == null ? void 0 : e.type) === "touchstart" ? 0 : 1);
        }
        searchKDTree(e, a, l, n, o) {
          let h = this, [u, c] = this.kdAxisArray, f = a ? "distX" : "dist", y = (h.options.findNearestPointBy || "").indexOf("y") > -1 ? 2 : 1, g = !!h.isBubble, v = n || ((S, E, T) => {
            let M = S[T] || 0, w = E[T] || 0;
            return [M === w && S.index > E.index || M < w ? S : E, !1];
          }), b = o || ((S, E) => S < E);
          if (this.kdTree || this.buildingKdTree || this.buildKDTree(l), this.kdTree) return function S(E, T, M, w) {
            var W;
            let C = T.point, B = h.kdAxisArray[M % w], z = C, R = !1;
            (function(tt, it) {
              var kt;
              let J = tt[u], rt = it[u], nt = Ne(J) && Ne(rt) ? J - rt : null, Ct = tt[c], ht = it[c], wt = Ne(Ct) && Ne(ht) ? Ct - ht : 0, Yt = g && ((kt = it.marker) == null ? void 0 : kt.radius) || 0;
              it.dist = Math.sqrt((nt && nt * nt || 0) + wt * wt) - Yt, it.distX = Ne(nt) ? Math.abs(nt) - Yt : Number.MAX_VALUE;
            })(E, C);
            let Y = (E[B] || 0) - (C[B] || 0) + (g && ((W = C.marker) == null ? void 0 : W.radius) || 0), H = Y < 0 ? "left" : "right", j = Y < 0 ? "right" : "left";
            return T[H] && ([z, R] = v(C, S(E, T[H], M + 1, w), f)), T[j] && b(Math.sqrt(Y * Y), z[f], R) && (z = v(z, S(E, T[j], M + 1, w), f)[0]), z;
          }(e, this.kdTree, y, y);
        }
        pointPlacementToXValue() {
          let { options: e, xAxis: a } = this, l = e.pointPlacement;
          return l === "between" && (l = a.reversed ? -0.5 : 0.5), Be(l) ? l * (e.pointRange || a.pointRange) : 0;
        }
        isPointInside(e) {
          let { chart: a, xAxis: l, yAxis: n } = this, { plotX: o = -1, plotY: h = -1 } = e;
          return h >= 0 && h <= (n ? n.len : a.plotHeight) && o >= 0 && o <= (l ? l.len : a.plotWidth);
        }
        drawTracker() {
          var v;
          let e = this, a = e.options, l = a.trackByArea, n = [].concat((l ? e.areaPath : e.graphPath) || []), o = e.chart, h = o.pointer, u = o.renderer, c = ((v = o.options.tooltip) == null ? void 0 : v.snap) || 0, f = () => {
            a.enableMouseTracking && o.hoverSeries !== e && e.onMouseOver();
          }, y = "rgba(192,192,192," + (Xd ? 1e-4 : 2e-3) + ")", g = e.tracker;
          g ? g.attr({ d: n }) : e.graph && (e.tracker = g = u.path(n).attr({ visibility: e.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(l ? "highcharts-tracker-area" : "highcharts-tracker-line").add(e.group), o.styledMode || g.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: y, fill: l ? y : "none", "stroke-width": e.graph.strokeWidth() + (l ? 0 : 2 * c) }), [e.tracker, e.markerGroup, e.dataLabelsGroup].forEach((b) => {
            b && (b.addClass("highcharts-tracker").on("mouseover", f).on("mouseout", (S) => {
              h == null || h.onTrackerMouseOut(S);
            }), a.cursor && !o.styledMode && b.css({ cursor: a.cursor }), b.on("touchstart", f));
          })), we(this, "afterDrawTracker");
        }
        addPoint(e, a, l, n, o) {
          let h, u, c = this.options, { chart: f, data: y, dataTable: g, xAxis: v } = this, b = (v == null ? void 0 : v.hasNames) && v.names, S = c.data, E = this.getColumn("x");
          a = be(a, !0);
          let T = { series: this };
          this.pointClass.prototype.applyOptions.apply(T, [e]);
          let M = T.x;
          if (u = E.length, this.requireSorting && M < E[u - 1]) for (h = !0; u && E[u - 1] > M; ) u--;
          g.setRow(T, u, !0, { addColumns: !1 }), b && T.name && (b[M] = T.name), S == null || S.splice(u, 0, e), (h || this.processedData) && (this.data.splice(u, 0, null), this.processData()), c.legendType === "point" && this.generatePoints(), l && (y[0] && y[0].remove ? y[0].remove(!1) : ([y, S].filter(Ne).forEach((w) => {
            w.shift();
          }), g.deleteRows(0))), o !== !1 && we(this, "addPoint", { point: T }), this.isDirty = !0, this.isDirtyData = !0, a && f.redraw(n);
        }
        removePoint(e, a, l) {
          let n = this, { chart: o, data: h, points: u, dataTable: c } = n, f = h[e], y = function() {
            [(u == null ? void 0 : u.length) === h.length ? u : void 0, h, n.options.data].filter(Ne).forEach((g) => {
              g.splice(e, 1);
            }), c.deleteRows(e), f == null || f.destroy(), n.isDirty = !0, n.isDirtyData = !0, a && o.redraw();
          };
          Hd(l, o), a = be(a, !0), f ? f.firePointEvent("remove", null, y) : y();
        }
        remove(e, a, l, n) {
          let o = this, h = o.chart;
          function u() {
            o.destroy(n), h.isDirtyLegend = h.isDirtyBox = !0, h.linkSeries(n), be(e, !0) && h.redraw(a);
          }
          l !== !1 ? we(o, "remove", null, u) : u();
        }
        update(e, a) {
          var M, w;
          we(this, "update", { options: e = Uo(e, this.userOptions) });
          let l = this, n = l.chart, o = l.userOptions, h = l.initialType || l.type, u = n.options.plotOptions, c = Ls[h].prototype, f = l.finishedAnimating && { animation: !1 }, y = {}, g, v, b = Hi.keepProps.slice(), S = e.type || o.type || n.options.chart.type, E = !(this.hasDerivedData || S && S !== this.type || e.keys !== void 0 || e.pointStart !== void 0 || e.pointInterval !== void 0 || e.relativeXValue !== void 0 || e.joinBy || e.mapData || ["dataGrouping", "pointStart", "pointInterval", "pointIntervalUnit", "keys"].some((C) => l.hasOptionChanged(C)));
          S = S || h, E ? (b.push.apply(b, Hi.keepPropsForPoints), e.visible !== !1 && b.push("area", "graph"), l.parallelArrays.forEach(function(C) {
            b.push(C + "Data");
          }), e.data && (e.dataSorting && Ea(l.options.dataSorting, e.dataSorting), this.setData(e.data, !1))) : this.dataTable.modified = this.dataTable, e = rn(o, { index: o.index === void 0 ? l.index : o.index, pointStart: ((M = u == null ? void 0 : u.series) == null ? void 0 : M.pointStart) ?? o.pointStart ?? l.getColumn("x")[0] }, !E && { data: l.options.data }, e, f), E && e.data && (e.data = l.options.data), (b = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(b)).forEach(function(C) {
            b[C] = l[C], delete l[C];
          });
          let T = !1;
          if (Ls[S]) {
            if (T = S !== l.type, l.remove(!1, !1, !1, !0), T)
              if (n.propFromSeries(), Object.setPrototypeOf) Object.setPrototypeOf(l, Ls[S].prototype);
              else {
                let C = Object.hasOwnProperty.call(l, "hcEvents") && l.hcEvents;
                for (v in c) l[v] = void 0;
                Ea(l, Ls[S].prototype), C ? l.hcEvents = C : delete l.hcEvents;
              }
          } else yl(17, !0, n, { missingModuleFor: S });
          if (b.forEach(function(C) {
            l[C] = b[C];
          }), l.init(n, e), E && this.points) for (let C of ((g = l.options).visible === !1 ? (y.graphic = 1, y.dataLabel = 1) : (this.hasMarkerChanged(g, o) && (y.graphic = 1), (w = l.hasDataLabels) != null && w.call(l) || (y.dataLabel = 1)), this.points)) C != null && C.series && (C.resolveColor(), Object.keys(y).length && C.destroyElements(y), g.showInLegend === !1 && C.legendItem && n.legend.destroyItem(C));
          l.initialType = h, n.linkSeries(), n.setSortedData(), T && l.linkedSeries.length && (l.isDirtyData = !0), we(this, "afterUpdate"), be(a, !0) && n.redraw(!!E && void 0);
        }
        setName(e) {
          this.name = this.options.name = this.userOptions.name = e, this.chart.isDirtyLegend = !0;
        }
        hasOptionChanged(e) {
          var u, c;
          let a = this.chart, l = this.options[e], n = a.options.plotOptions, o = this.userOptions[e], h = be((u = n == null ? void 0 : n[this.type]) == null ? void 0 : u[e], (c = n == null ? void 0 : n.series) == null ? void 0 : c[e]);
          return o && !Ne(h) ? l !== o : l !== be(h, l);
        }
        onMouseOver() {
          let e = this.chart, a = e.hoverSeries, l = e.pointer;
          l == null || l.setHoverChartIndex(), a && a !== this && a.onMouseOut(), this.options.events.mouseOver && we(this, "mouseOver"), this.setState("hover"), e.hoverSeries = this;
        }
        onMouseOut() {
          let e = this.options, a = this.chart, l = a.tooltip, n = a.hoverPoint;
          a.hoverSeries = null, n && n.onMouseOut(), this && e.events.mouseOut && we(this, "mouseOut"), l && !this.stickyTracking && (!l.shared || this.noSharedTooltip) && l.hide(), a.series.forEach(function(o) {
            o.setState("", !0);
          });
        }
        setState(e, a) {
          let l = this, n = l.options, o = l.graph, h = n.inactiveOtherPoints, u = n.states, c = be(u[e || "normal"] && u[e || "normal"].animation, l.chart.options.chart.animation), f = n.lineWidth, y = n.opacity;
          if (e = e || "", l.state !== e && ([l.group, l.markerGroup, l.dataLabelsGroup].forEach(function(g) {
            g && (l.state && g.removeClass("highcharts-series-" + l.state), e && g.addClass("highcharts-series-" + e));
          }), l.state = e, !l.chart.styledMode)) {
            if (u[e] && u[e].enabled === !1) return;
            if (e && (f = u[e].lineWidth || f + (u[e].lineWidthPlus || 0), y = be(u[e].opacity, y)), o && !o.dashstyle && Be(f)) for (let g of [o, ...this.zones.map((v) => v.graph)]) g == null || g.animate({ "stroke-width": f }, c);
            h || [l.group, l.markerGroup, l.dataLabelsGroup, l.labelBySeries].forEach(function(g) {
              g && g.animate({ opacity: y }, c);
            });
          }
          a && h && l.points && l.setAllPointsToState(e || void 0);
        }
        setAllPointsToState(e) {
          this.points.forEach(function(a) {
            a.setState && a.setState(e);
          });
        }
        setVisible(e, a) {
          var c;
          let l = this, n = l.chart, o = n.options.chart.ignoreHiddenSeries, h = l.visible;
          l.visible = e = l.options.visible = l.userOptions.visible = e === void 0 ? !h : e;
          let u = e ? "show" : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach((f) => {
            var y;
            (y = l[f]) == null || y[u]();
          }), (n.hoverSeries === l || ((c = n.hoverPoint) == null ? void 0 : c.series) === l) && l.onMouseOut(), l.legendItem && n.legend.colorizeItem(l, e), l.isDirty = !0, l.options.stacking && n.series.forEach((f) => {
            f.options.stacking && f.visible && (f.isDirty = !0);
          }), l.linkedSeries.forEach((f) => {
            f.setVisible(e, !1);
          }), o && (n.isDirtyBox = !0), we(l, u), a !== !1 && n.redraw();
        }
        show() {
          this.setVisible(!0);
        }
        hide() {
          this.setVisible(!1);
        }
        select(e) {
          this.selected = e = this.options.selected = e === void 0 ? !this.selected : e, this.checkbox && (this.checkbox.checked = e), we(this, e ? "select" : "unselect");
        }
        shouldShowTooltip(e, a, l = {}) {
          return l.series = this, l.visiblePlotOnly = !0, this.chart.isInsidePlot(e, a, l);
        }
        drawLegendSymbol(e, a) {
          var l;
          (l = Ou[this.options.legendSymbol || "rectangle"]) == null || l.call(this, e, a);
        }
      }
      Hi.defaultOptions = { lineWidth: 2, allowPointSelect: !1, crisp: !0, showCheckbox: !1, animation: { duration: 1e3 }, enableMouseTracking: !0, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 150 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { animation: {}, align: "center", borderWidth: 0, defer: !0, formatter: function() {
        let { numberFormatter: p } = this.series.chart;
        return typeof this.y != "number" ? "" : p(this.y, -1);
      }, padding: 5, style: { fontSize: "0.7em", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: !0, states: { normal: { animation: !0 }, hover: { animation: { duration: 150 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 150 }, opacity: 0.2 } }, stickyTracking: !0, turboThreshold: 1e3, findNearestPointBy: "x" }, Hi.types = Ee.seriesTypes, Hi.registerType = Ee.registerSeriesType, Hi.keepProps = ["colorIndex", "eventOptions", "navigatorSeries", "symbolIndex", "baseSeries"], Hi.keepPropsForPoints = ["data", "isDirtyData", "isDirtyCanvas", "points", "dataTable", "processedData", "xIncrement", "cropped", "_hasPointMarkers", "hasDataLabels", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX", "transformGroups"], Ea(Hi.prototype, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, directTouch: !1, invertible: !0, isCartesian: !0, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: Nt, requireSorting: !0, sorted: !0 }), Ee.series = Hi;
      let Mi = Hi, { animObject: Zd, setAnimation: Nu } = We, { registerEventOptions: Bu } = go, { composed: Vd, marginNames: Wd } = Z, { distribute: zp } = lo, { format: Kd } = Ri, { addEvent: zs, createElement: Hu, css: Xo, defined: Go, discardElement: Fd, find: Yo, fireEvent: wa, isNumber: Uu, merge: vl, pick: ei, pushUnique: fr, relativeLength: jo, stableSort: pr, syncTimeout: Po } = Mt;
      class qo {
        constructor(e, a) {
          this.allItems = [], this.initialItemY = 0, this.itemHeight = 0, this.itemMarginBottom = 0, this.itemMarginTop = 0, this.itemX = 0, this.itemY = 0, this.lastItemY = 0, this.lastLineHeight = 0, this.legendHeight = 0, this.legendWidth = 0, this.maxItemWidth = 0, this.maxLegendWidth = 0, this.offsetWidth = 0, this.padding = 0, this.pages = [], this.symbolHeight = 0, this.symbolWidth = 0, this.titleHeight = 0, this.totalItemWidth = 0, this.widthOption = 0, this.chart = e, this.setOptions(a), a.enabled && (this.render(), Bu(this, a), zs(this.chart, "endResize", function() {
            this.legend.positionCheckboxes();
          })), zs(this.chart, "render", () => {
            this.options.enabled && this.proximate && (this.proximatePositions(), this.positionItems());
          });
        }
        setOptions(e) {
          let a = ei(e.padding, 8);
          this.options = e, this.chart.styledMode || (this.itemStyle = e.itemStyle, this.itemHiddenStyle = vl(this.itemStyle, e.itemHiddenStyle)), this.itemMarginTop = e.itemMarginTop, this.itemMarginBottom = e.itemMarginBottom, this.padding = a, this.initialItemY = a - 5, this.symbolWidth = ei(e.symbolWidth, 16), this.pages = [], this.proximate = e.layout === "proximate" && !this.chart.inverted, this.baseline = void 0;
        }
        update(e, a) {
          let l = this.chart;
          this.setOptions(vl(!0, this.options, e)), "events" in this.options && Bu(this, this.options), this.destroy(), l.isDirtyLegend = l.isDirtyBox = !0, ei(a, !0) && l.redraw(), wa(this, "afterUpdate", { redraw: a });
        }
        colorizeItem(e, a) {
          var f;
          let l = e.color, { area: n, group: o, label: h, line: u, symbol: c } = e.legendItem || {};
          if ((e instanceof Mi || e instanceof Nt) && (e.color = ((f = e.options) == null ? void 0 : f.legendSymbolColor) || l), o == null || o[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), !this.chart.styledMode) {
            let { itemHiddenStyle: y = {} } = this, g = y.color, { fillColor: v, fillOpacity: b, lineColor: S, marker: E } = e.options, T = (M) => (!a && (M.fill && (M.fill = g), M.stroke && (M.stroke = g)), M);
            h == null || h.css(vl(a ? this.itemStyle : y)), u == null || u.attr(T({ stroke: S || e.color })), c && c.attr(T(E && c.isMarker ? e.pointAttribs() : { fill: e.color })), n == null || n.attr(T({ fill: v || e.color, "fill-opacity": v ? 1 : b ?? 0.75 }));
          }
          e.color = l, wa(this, "afterColorizeItem", { item: e, visible: a });
        }
        positionItems() {
          this.allItems.forEach(this.positionItem, this), this.chart.isResizing || this.positionCheckboxes();
        }
        positionItem(e) {
          let { group: a, x: l = 0, y: n = 0 } = e.legendItem || {}, o = this.options, h = o.symbolPadding, u = !o.rtl, c = e.checkbox;
          if (a != null && a.element) {
            let f = { translateX: u ? l : this.legendWidth - l - 2 * h - 4, translateY: n };
            a[Go(a.translateY) ? "animate" : "attr"](f, void 0, () => {
              wa(this, "afterPositionItem", { item: e });
            });
          }
          c && (c.x = l, c.y = n);
        }
        destroyItem(e) {
          let a = e.checkbox, l = e.legendItem || {};
          for (let n of ["group", "label", "line", "symbol"]) l[n] && (l[n] = l[n].destroy());
          a && Fd(a), e.legendItem = void 0;
        }
        destroy() {
          for (let e of this.getAllItems()) this.destroyItem(e);
          for (let e of ["clipRect", "up", "down", "pager", "nav", "box", "title", "group"]) this[e] && (this[e] = this[e].destroy());
          this.display = null;
        }
        positionCheckboxes() {
          var o;
          let e, a = (o = this.group) == null ? void 0 : o.alignAttr, l = this.clipHeight || this.legendHeight, n = this.titleHeight;
          a && (e = a.translateY, this.allItems.forEach(function(h) {
            let u, c = h.checkbox;
            c && (u = e + n + c.y + (this.scrollOffset || 0) + 3, Xo(c, { left: a.translateX + h.checkboxOffset + c.x - 20 + "px", top: u + "px", display: this.proximate || u > e - 6 && u < e + l - 6 ? "" : "none" }));
          }, this));
        }
        renderTitle() {
          let e = this.options, a = this.padding, l = e.title, n, o = 0;
          l.text && (this.title || (this.title = this.chart.renderer.label(l.text, a - 3, a - 4, void 0, void 0, void 0, e.useHTML, void 0, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(l.style), this.title.add(this.group)), l.width || this.title.css({ width: this.maxLegendWidth + "px" }), o = (n = this.title.getBBox()).height, this.offsetWidth = n.width, this.contentGroup.attr({ translateY: o })), this.titleHeight = o;
        }
        setText(e) {
          let a = this.options;
          e.legendItem.label.attr({ text: a.labelFormat ? Kd(a.labelFormat, e, this.chart) : a.labelFormatter.call(e) });
        }
        renderItem(e) {
          var Y;
          let a = e.legendItem = e.legendItem || {}, l = this.chart, n = l.renderer, o = this.options, h = o.layout === "horizontal", u = this.symbolWidth, c = o.symbolPadding || 0, f = this.itemStyle, y = this.itemHiddenStyle, g = h ? ei(o.itemDistance, 20) : 0, v = !o.rtl, b = !e.series, S = !b && e.series.drawLegendSymbol ? e.series : e, E = S.options, T = !!this.createCheckboxForItem && E && E.showCheckbox, M = o.useHTML, w = e.options.className, C = a.label, B = u + c + g + 20 * !!T;
          !C && (a.group = n.g("legend-item").addClass("highcharts-" + S.type + "-series highcharts-color-" + e.colorIndex + (w ? " " + w : "") + (b ? " highcharts-series-" + e.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.label = C = n.text("", v ? u + c : -c, this.baseline || 0, M), l.styledMode || C.css(vl(e.visible ? f : y)), C.attr({ align: v ? "left" : "right", zIndex: 2 }).add(a.group), !this.baseline && (this.fontMetrics = n.fontMetrics(C), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, C.attr("y", this.baseline), this.symbolHeight = ei(o.symbolHeight, this.fontMetrics.f), o.squareSymbol && (this.symbolWidth = ei(o.symbolWidth, Math.max(this.symbolHeight, 16)), B = this.symbolWidth + c + g + 20 * !!T, v && C.attr("x", this.symbolWidth + c))), S.drawLegendSymbol(this, e), this.setItemEvents && this.setItemEvents(e, C, M)), T && !e.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(e), this.colorizeItem(e, e.visible), (l.styledMode || !f.width) && C.css({ width: (o.itemWidth || this.widthOption || l.spacingBox.width) - B + "px" }), this.setText(e);
          let z = C.getBBox(), R = ((Y = this.fontMetrics) == null ? void 0 : Y.h) || 0;
          e.itemWidth = e.checkboxOffset = o.itemWidth || a.labelWidth || z.width + B, this.maxItemWidth = Math.max(this.maxItemWidth, e.itemWidth), this.totalItemWidth += e.itemWidth, this.itemHeight = e.itemHeight = Math.round(a.labelHeight || (z.height > 1.5 * R ? z.height : R));
        }
        layoutItem(e) {
          let a = this.options, l = this.padding, n = a.layout === "horizontal", o = e.itemHeight, h = this.itemMarginBottom, u = this.itemMarginTop, c = n ? ei(a.itemDistance, 20) : 0, f = this.maxLegendWidth, y = a.alignColumns && this.totalItemWidth > f ? this.maxItemWidth : e.itemWidth, g = e.legendItem || {};
          n && this.itemX - l + y > f && (this.itemX = l, this.lastLineHeight && (this.itemY += u + this.lastLineHeight + h), this.lastLineHeight = 0), this.lastItemY = u + this.itemY + h, this.lastLineHeight = Math.max(o, this.lastLineHeight), g.x = this.itemX, g.y = this.itemY, n ? this.itemX += y : (this.itemY += u + o + h, this.lastLineHeight = o), this.offsetWidth = this.widthOption || Math.max((n ? this.itemX - l - (e.checkbox ? 0 : c) : y) + l, this.offsetWidth);
        }
        getAllItems() {
          let e = [];
          return this.chart.series.forEach(function(a) {
            var n;
            let l = a == null ? void 0 : a.options;
            a && ei(l.showInLegend, !Go(l.linkedTo) && void 0, !0) && (e = e.concat(((n = a.legendItem) == null ? void 0 : n.labels) || (l.legendType === "point" ? a.data : a)));
          }), wa(this, "afterGetAllItems", { allItems: e }), e;
        }
        getAlignment() {
          let e = this.options;
          return this.proximate ? e.align.charAt(0) + "tv" : e.floating ? "" : e.align.charAt(0) + e.verticalAlign.charAt(0) + e.layout.charAt(0);
        }
        adjustMargins(e, a) {
          let l = this.chart, n = this.options, o = this.getAlignment();
          o && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(h, u) {
            h.test(o) && !Go(e[u]) && (l[Wd[u]] = Math.max(l[Wd[u]], l.legend[(u + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][u] * n[u % 2 ? "x" : "y"] + ei(n.margin, 12) + a[u] + (l.titleOffset[u] || 0)));
          });
        }
        proximatePositions() {
          let e, a = this.chart, l = [], n = this.options.align === "left";
          for (let o of (this.allItems.forEach(function(h) {
            let u, c, f = n, y, g;
            h.yAxis && (h.xAxis.options.reversed && (f = !f), h.points && (u = Yo(f ? h.points : h.points.slice(0).reverse(), function(v) {
              return Uu(v.plotY);
            })), c = this.itemMarginTop + h.legendItem.label.getBBox().height + this.itemMarginBottom, g = h.yAxis.top - a.plotTop, y = h.visible ? (u ? u.plotY : h.yAxis.height) + (g - 0.3 * c) : g + h.yAxis.height, l.push({ target: y, size: c, item: h }));
          }, this), zp(l, a.plotHeight))) e = o.item.legendItem || {}, Uu(o.pos) && (e.y = a.plotTop - a.spacing[0] + o.pos);
        }
        render() {
          let e = this.chart, a = e.renderer, l = this.options, n = this.padding, o = this.getAllItems(), h, u, c, f = this.group, y, g = this.box;
          this.itemX = n, this.itemY = this.initialItemY, this.offsetWidth = 0, this.lastItemY = 0, this.widthOption = jo(l.width, e.spacingBox.width - n), y = e.spacingBox.width - 2 * n - l.x, ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) > -1 && (y /= 2), this.maxLegendWidth = this.widthOption || y, f || (this.group = f = a.g("legend").addClass(l.className || "").attr({ zIndex: 7 }).add(), this.contentGroup = a.g().attr({ zIndex: 1 }).add(f), this.scrollGroup = a.g().add(this.contentGroup)), this.renderTitle(), pr(o, (v, b) => {
            var S, E;
            return (((S = v.options) == null ? void 0 : S.legendIndex) || 0) - (((E = b.options) == null ? void 0 : E.legendIndex) || 0);
          }), l.reversed && o.reverse(), this.allItems = o, this.display = h = !!o.length, this.lastLineHeight = 0, this.maxItemWidth = 0, this.totalItemWidth = 0, this.itemHeight = 0, o.forEach(this.renderItem, this), o.forEach(this.layoutItem, this), u = (this.widthOption || this.offsetWidth) + n, c = this.lastItemY + this.lastLineHeight + this.titleHeight, c = this.handleOverflow(c) + n, g || (this.box = g = a.rect().addClass("highcharts-legend-box").attr({ r: l.borderRadius }).add(f)), e.styledMode || g.attr({ stroke: l.borderColor, "stroke-width": l.borderWidth || 0, fill: l.backgroundColor || "none" }).shadow(l.shadow), u > 0 && c > 0 && g[g.placed ? "animate" : "attr"](g.crisp.call({}, { x: 0, y: 0, width: u, height: c }, g.strokeWidth())), f[h ? "show" : "hide"](), e.styledMode && f.getStyle("display") === "none" && (u = c = 0), this.legendWidth = u, this.legendHeight = c, h && this.align(), this.proximate || this.positionItems(), wa(this, "afterRender");
        }
        align(e = this.chart.spacingBox) {
          let a = this.chart, l = this.options, n = e.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && a.titleOffset[0] > 0 ? n += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && a.titleOffset[2] > 0 && (n -= a.titleOffset[2]), n !== e.y && (e = vl(e, { y: n })), a.hasRendered || (this.group.placed = !1), this.group.align(vl(l, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : l.verticalAlign }), !0, e);
        }
        handleOverflow(e) {
          let a = this, l = this.chart, n = l.renderer, o = this.options, h = o.y, u = o.verticalAlign === "top", c = this.padding, f = o.maxHeight, y = o.navigation, g = ei(y.animation, !0), v = y.arrowSize || 12, b = this.pages, S = this.allItems, E = function(H) {
            typeof H == "number" ? Y.attr({ height: H }) : Y && (a.clipRect = Y.destroy(), a.contentGroup.clip()), a.contentGroup.div && (a.contentGroup.div.style.clip = H ? "rect(" + c + "px,9999px," + (c + H) + "px,0)" : "auto");
          }, T = function(H) {
            return a[H] = n.circle(0, 0, 1.3 * v).translate(v / 2, v / 2).add(R), l.styledMode || a[H].attr("fill", "rgba(0,0,0,0.0001)"), a[H];
          }, M, w, C, B, z = l.spacingBox.height + (u ? -h : h) - c, R = this.nav, Y = this.clipRect;
          return o.layout !== "horizontal" || o.verticalAlign === "middle" || o.floating || (z /= 2), f && (z = Math.min(z, f)), b.length = 0, e && z > 0 && e > z && y.enabled !== !1 ? (this.clipHeight = M = Math.max(z - 20 - this.titleHeight - c, 0), this.currentPage = ei(this.currentPage, 1), this.fullHeight = e, S.forEach((H, j) => {
            let W = (C = H.legendItem || {}).y || 0, tt = Math.round(C.label.getBBox().height), it = b.length;
            (!it || W - b[it - 1] > M && (w || W) !== b[it - 1]) && (b.push(w || W), it++), C.pageIx = it - 1, w && B && (B.pageIx = it - 1), j === S.length - 1 && W + tt - b[it - 1] > M && W > b[it - 1] && (b.push(W), C.pageIx = it), W !== w && (w = W), B = C;
          }), Y || (Y = a.clipRect = n.clipRect(0, c - 2, 9999, 0), a.contentGroup.clip(Y)), E(M), R || (this.nav = R = n.g().attr({ zIndex: 1 }).add(this.group), this.up = n.symbol("triangle", 0, 0, v, v).add(R), T("upTracker").on("click", function() {
            a.scroll(-1, g);
          }), this.pager = n.text("", 15, 10).addClass("highcharts-legend-navigation"), !l.styledMode && y.style && this.pager.css(y.style), this.pager.add(R), this.down = n.symbol("triangle-down", 0, 0, v, v).add(R), T("downTracker").on("click", function() {
            a.scroll(1, g);
          })), a.scroll(0), e = z) : R && (E(), this.nav = R.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0), e;
        }
        scroll(e, a) {
          let l = this.chart, n = this.pages, o = n.length, h = this.clipHeight, u = this.options.navigation, c = this.pager, f = this.padding, y = this.currentPage + e;
          y > o && (y = o), y > 0 && (a !== void 0 && Nu(a, l), this.nav.attr({ translateX: f, translateY: h + this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function(g) {
            g.attr({ class: y === 1 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }), c.attr({ text: y + "/" + o }), [this.down, this.downTracker].forEach(function(g) {
            g.attr({ x: 18 + this.pager.getBBox().width, class: y === o ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }, this), l.styledMode || (this.up.attr({ fill: y === 1 ? u.inactiveColor : u.activeColor }), this.upTracker.css({ cursor: y === 1 ? "default" : "pointer" }), this.down.attr({ fill: y === o ? u.inactiveColor : u.activeColor }), this.downTracker.css({ cursor: y === o ? "default" : "pointer" })), this.scrollOffset = -n[y - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = y, this.positionCheckboxes(), Po(() => {
            wa(this, "afterScroll", { currentPage: y });
          }, Zd(ei(a, l.renderer.globalAnimation, !0)).duration));
        }
        setItemEvents(e, a, l) {
          let n = this, o = e.legendItem || {}, h = n.chart.renderer.boxWrapper, u = e instanceof Nt, c = e instanceof Mi, f = "highcharts-legend-" + (u ? "point" : "series") + "-active", y = n.chart.styledMode, g = l ? [a, o.symbol] : [o.group], v = (b) => {
            n.allItems.forEach((S) => {
              e !== S && [S].concat(S.linkedSeries || []).forEach((E) => {
                E.setState(b, !u);
              });
            });
          };
          for (let b of g) b && b.on("mouseover", function() {
            e.visible && v("inactive"), e.setState("hover"), e.visible && h.addClass(f), y || a.css(n.options.itemHoverStyle);
          }).on("mouseout", function() {
            n.chart.styledMode || a.css(vl(e.visible ? n.itemStyle : n.itemHiddenStyle)), v(""), h.removeClass(f), e.setState();
          }).on("click", function(S) {
            let E = function() {
              e.setVisible && e.setVisible(), v(e.visible ? "inactive" : "");
            };
            h.removeClass(f), wa(n, "itemClick", { browserEvent: S, legendItem: e }, E), u ? e.firePointEvent("legendItemClick", { browserEvent: S }) : c && wa(e, "legendItemClick", { browserEvent: S });
          });
        }
        createCheckboxForItem(e) {
          e.checkbox = Hu("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: e.selected, defaultChecked: e.selected }, this.options.itemCheckboxStyle, this.chart.container), zs(e.checkbox, "click", function(a) {
            let l = a.target;
            wa(e.series || e, "checkboxClick", { checked: l.checked, item: e }, function() {
              e.select();
            });
          });
        }
      }
      (function(p) {
        p.compose = function(e) {
          fr(Vd, "Core.Legend") && zs(e, "beforeMargins", function() {
            this.legend = new p(this, this.options.legend);
          });
        };
      })(qo || (qo = {}));
      let Xu = qo, { animate: Rs, animObject: Id, setAnimation: Ti } = We, { defaultOptions: aa } = zi, { numberFormat: Ns } = Ri, { registerEventOptions: Gu } = go, { charts: Ai, doc: Ui, marginNames: je, svg: _o, win: Qo } = Z, { seriesTypes: gr } = Ee, { addEvent: Zo, attr: Yu, createElement: is, css: Oi, defined: as, diffObjects: ju, discardElement: Jd, erase: Vo, error: Wo, extend: Ca, find: Ko, fireEvent: Zt, getAlignFactor: Rp, getStyle: Fo, isArray: Fe, isNumber: ze, isObject: $d, isString: mr, merge: ya, objectEach: Io, pick: Ie, pInt: Jo, relativeLength: $o, removeEvent: Pu, splat: yr, syncTimeout: tf, uniqueKey: qu } = Mt;
      class ka {
        static chart(e, a, l) {
          return new ka(e, a, l);
        }
        constructor(e, a, l) {
          this.sharedClips = {};
          let n = [...arguments];
          (mr(e) || e.nodeName) && (this.renderTo = n.shift()), this.init(n[0], n[1]);
        }
        setZoomOptions() {
          let e = this.options.chart, a = e.zooming;
          this.zooming = { ...a, type: Ie(e.zoomType, a.type), key: Ie(e.zoomKey, a.key), pinchType: Ie(e.pinchType, a.pinchType), singleTouch: Ie(e.zoomBySingleTouch, a.singleTouch, !1), resetButton: ya(a.resetButton, e.resetZoomButton) };
        }
        init(e, a) {
          Zt(this, "init", { args: arguments }, function() {
            var h;
            let l = ya(aa, e), n = l.chart, o = this.renderTo || n.renderTo;
            this.userOptions = Ca({}, e), (this.renderTo = mr(o) ? Ui.getElementById(o) : o) || Wo(13, !0, this), this.margin = [], this.spacing = [], this.labelCollectors = [], this.callback = a, this.isResizing = 0, this.options = l, this.axes = [], this.series = [], this.locale = l.lang.locale ?? ((h = this.renderTo.closest("[lang]")) == null ? void 0 : h.lang), this.time = new Dl(Ca(l.time || {}, { locale: this.locale }), l.lang), l.time = this.time.options, this.numberFormatter = (n.numberFormatter || Ns).bind(this), this.styledMode = n.styledMode, this.hasCartesianSeries = n.showAxes, this.index = Ai.length, Ai.push(this), Z.chartCount++, Gu(this, n), this.xAxis = [], this.yAxis = [], this.pointCount = this.colorCounter = this.symbolCounter = 0, this.setZoomOptions(), Zt(this, "afterInit"), this.firstRender();
          });
        }
        initSeries(e) {
          let a = this.options.chart, l = e.type || a.type, n = gr[l];
          n || Wo(17, !0, this, { missingModuleFor: l });
          let o = new n();
          return typeof o.init == "function" && o.init(this, e), o;
        }
        setSortedData() {
          this.getSeriesOrderByLinks().forEach(function(e) {
            e.points || e.data || !e.enabledDataSorting || e.setData(e.options.data, !1);
          });
        }
        getSeriesOrderByLinks() {
          return this.series.concat().sort(function(e, a) {
            return e.linkedSeries.length || a.linkedSeries.length ? a.linkedSeries.length - e.linkedSeries.length : 0;
          });
        }
        orderItems(e, a = 0) {
          let l = this[e], n = this.options[e] = yr(this.options[e]).slice(), o = this.userOptions[e] = this.userOptions[e] ? yr(this.userOptions[e]).slice() : [];
          if (this.hasRendered && (n.splice(a), o.splice(a)), l) for (let h = a, u = l.length; h < u; ++h) {
            let c = l[h];
            c && (c.index = h, c instanceof Mi && (c.name = c.getName()), c.options.isInternal || (n[h] = c.options, o[h] = c.userOptions));
          }
        }
        getClipBox(e, a) {
          var y, g;
          let l = this.inverted, { xAxis: n, yAxis: o } = e || {}, { x: h, y: u, width: c, height: f } = ya(this.clipBox);
          return e && (n && n.len !== this.plotSizeX && (c = n.len), o && o.len !== this.plotSizeY && (f = o.len), l && !e.invertible && ([c, f] = [f, c])), a && (h += ((y = l ? o : n) == null ? void 0 : y.pos) ?? this.plotLeft, u += ((g = l ? n : o) == null ? void 0 : g.pos) ?? this.plotTop), { x: h, y: u, width: c, height: f };
        }
        isInsidePlot(e, a, l = {}) {
          var T;
          let { inverted: n, plotBox: o, plotLeft: h, plotTop: u, scrollablePlotBox: c } = this, { scrollLeft: f = 0, scrollTop: y = 0 } = l.visiblePlotOnly && ((T = this.scrollablePlotArea) == null ? void 0 : T.scrollingContainer) || {}, g = l.series, v = l.visiblePlotOnly && c || o, b = l.inverted ? a : e, S = l.inverted ? e : a, E = { x: b, y: S, isInsidePlot: !0, options: l };
          if (!l.ignoreX) {
            let M = g && (n && !this.polar ? g.yAxis : g.xAxis) || { pos: h, len: 1 / 0 }, w = l.paneCoordinates ? M.pos + b : h + b;
            w >= Math.max(f + h, M.pos) && w <= Math.min(f + h + v.width, M.pos + M.len) || (E.isInsidePlot = !1);
          }
          if (!l.ignoreY && E.isInsidePlot) {
            let M = !n && l.axis && !l.axis.isXAxis && l.axis || g && (n ? g.xAxis : g.yAxis) || { pos: u, len: 1 / 0 }, w = l.paneCoordinates ? M.pos + S : u + S;
            w >= Math.max(y + u, M.pos) && w <= Math.min(y + u + v.height, M.pos + M.len) || (E.isInsidePlot = !1);
          }
          return Zt(this, "afterIsInsidePlot", E), E.isInsidePlot;
        }
        redraw(e) {
          Zt(this, "beforeRedraw");
          let a = this.hasCartesianSeries ? this.axes : this.colorAxis || [], l = this.series, n = this.pointer, o = this.legend, h = this.userOptions.legend, u = this.renderer, c = u.isHidden(), f = [], y, g, v, b = this.isDirtyBox, S = this.isDirtyLegend, E;
          for (u.rootFontSize = u.boxWrapper.getStyle("font-size"), this.setResponsive && this.setResponsive(!1), Ti(!!this.hasRendered && e, this), c && this.temporaryDisplay(), this.layOutTitles(!1), v = l.length; v--; ) if (((E = l[v]).options.stacking || E.options.centerInCategory) && (g = !0, E.isDirty)) {
            y = !0;
            break;
          }
          if (y) for (v = l.length; v--; ) (E = l[v]).options.stacking && (E.isDirty = !0);
          l.forEach(function(T) {
            T.isDirty && (T.options.legendType === "point" ? (typeof T.updateTotals == "function" && T.updateTotals(), S = !0) : h && (h.labelFormatter || h.labelFormat) && (S = !0)), T.isDirtyData && Zt(T, "updatedData");
          }), S && o && o.options.enabled && (o.render(), this.isDirtyLegend = !1), g && this.getStacks(), a.forEach(function(T) {
            T.updateNames(), T.setScale();
          }), this.getMargins(), a.forEach(function(T) {
            T.isDirty && (b = !0);
          }), a.forEach(function(T) {
            let M = T.min + "," + T.max;
            T.extKey !== M && (T.extKey = M, f.push(function() {
              Zt(T, "afterSetExtremes", Ca(T.eventArgs, T.getExtremes())), delete T.eventArgs;
            })), (b || g) && T.redraw();
          }), b && this.drawChartBox(), Zt(this, "predraw"), l.forEach(function(T) {
            (b || T.isDirty) && T.visible && T.redraw(), T.isDirtyData = !1;
          }), n && n.reset(!0), u.draw(), Zt(this, "redraw"), Zt(this, "render"), c && this.temporaryDisplay(!0), f.forEach(function(T) {
            T.call();
          });
        }
        get(e) {
          let a = this.series;
          function l(o) {
            return o.id === e || o.options && o.options.id === e;
          }
          let n = Ko(this.axes, l) || Ko(this.series, l);
          for (let o = 0; !n && o < a.length; o++) n = Ko(a[o].points || [], l);
          return n;
        }
        createAxes() {
          let e = this.userOptions;
          for (let a of (Zt(this, "createAxes"), ["xAxis", "yAxis"])) for (let l of e[a] = yr(e[a] || {})) new ta(this, l, a);
          Zt(this, "afterCreateAxes");
        }
        getSelectedPoints() {
          return this.series.reduce((e, a) => (a.getPointsCollection().forEach((l) => {
            Ie(l.selectedStaging, l.selected) && e.push(l);
          }), e), []);
        }
        getSelectedSeries() {
          return this.series.filter((e) => e.selected);
        }
        setTitle(e, a, l) {
          this.applyDescription("title", e), this.applyDescription("subtitle", a), this.applyDescription("caption", void 0), this.layOutTitles(l);
        }
        applyDescription(e, a) {
          var h;
          let l = this, n = this.options[e] = ya(this.options[e], a), o = this[e];
          o && a && (this[e] = o = o.destroy()), n && !o && ((o = this.renderer.text(n.text, 0, 0, n.useHTML).attr({ align: n.align, class: "highcharts-" + e, zIndex: n.zIndex || 4 }).css({ textOverflow: "ellipsis", whiteSpace: "nowrap" }).add()).update = function(u, c) {
            l.applyDescription(e, u), l.layOutTitles(c);
          }, this.styledMode || o.css(Ca(e === "title" ? { fontSize: this.options.isStock ? "1em" : "1.2em" } : {}, n.style)), o.textPxLength = o.getBBox().width, o.css({ whiteSpace: (h = n.style) == null ? void 0 : h.whiteSpace }), this[e] = o);
        }
        layOutTitles(e = !0) {
          var u, c, f, y;
          let a = [0, 0, 0], { options: l, renderer: n, spacingBox: o } = this;
          ["title", "subtitle", "caption"].forEach((g) => {
            var T;
            let v = this[g], b = this.options[g], S = ya(o), E = (v == null ? void 0 : v.textPxLength) || 0;
            if (v && b) {
              Zt(this, "layOutTitle", { alignTo: S, key: g, textPxLength: E });
              let M = n.fontMetrics(v), w = M.b, C = M.h, B = b.verticalAlign || "top", z = B === "top", R = z && b.minScale || 1, Y = g === "title" ? z ? -3 : 0 : z ? a[0] + 2 : 0, H = Math.min(S.width / E, 1), j = Math.max(R, H), W = ya({ y: B === "bottom" ? w : Y + w }, { align: g === "title" ? H < R ? "left" : "center" : (T = this.title) == null ? void 0 : T.alignValue }, b), tt = (b.width || (H > R ? this.chartWidth : S.width) / j) + "px";
              v.alignValue !== W.align && (v.placed = !1);
              let it = Math.round(v.css({ width: tt }).getBBox(b.useHTML).height);
              if (W.height = it, v.align(W, !1, S).attr({ align: W.align, scaleX: j, scaleY: j, "transform-origin": `${S.x + E * j * Rp(W.align)} ${C}` }), !b.floating) {
                let J = it * (it < 1.2 * C ? 1 : j);
                B === "top" ? a[0] = Math.ceil(a[0] + J) : B === "bottom" && (a[2] = Math.ceil(a[2] + J));
              }
            }
          }, this), a[0] && (((u = l.title) == null ? void 0 : u.verticalAlign) || "top") === "top" && (a[0] += ((c = l.title) == null ? void 0 : c.margin) || 0), a[2] && ((f = l.caption) == null ? void 0 : f.verticalAlign) === "bottom" && (a[2] += ((y = l.caption) == null ? void 0 : y.margin) || 0);
          let h = !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
          this.titleOffset = a, Zt(this, "afterLayOutTitles"), !this.isDirtyBox && h && (this.isDirtyBox = this.isDirtyLegend = h, this.hasRendered && e && this.isDirtyBox && this.redraw());
        }
        getContainerBox() {
          let e = [].map.call(this.renderTo.children, (l) => {
            if (l !== this.container) {
              let n = l.style.display;
              return l.style.display = "none", [l, n];
            }
          }), a = { width: Fo(this.renderTo, "width", !0) || 0, height: Fo(this.renderTo, "height", !0) || 0 };
          return e.filter(Boolean).forEach(([l, n]) => {
            l.style.display = n;
          }), a;
        }
        getChartSize() {
          var h;
          let e = this.options.chart, a = e.width, l = e.height, n = this.getContainerBox(), o = n.height <= 1 || !((h = this.renderTo.parentElement) != null && h.style.height) && this.renderTo.style.height === "100%";
          this.chartWidth = Math.max(0, a || n.width || 600), this.chartHeight = Math.max(0, $o(l, this.chartWidth) || (o ? 400 : n.height)), this.containerBox = n;
        }
        temporaryDisplay(e) {
          let a = this.renderTo, l;
          if (e) for (; a != null && a.style; ) a.hcOrigStyle && (Oi(a, a.hcOrigStyle), delete a.hcOrigStyle), a.hcOrigDetached && (Ui.body.removeChild(a), a.hcOrigDetached = !1), a = a.parentNode;
          else for (; a != null && a.style && (Ui.body.contains(a) || a.parentNode || (a.hcOrigDetached = !0, Ui.body.appendChild(a)), (Fo(a, "display", !1) === "none" || a.hcOricDetached) && (a.hcOrigStyle = { display: a.style.display, height: a.style.height, overflow: a.style.overflow }, l = { display: "block", overflow: "hidden" }, a !== this.renderTo && (l.height = 0), Oi(a, l), a.offsetWidth || a.style.setProperty("display", "block", "important")), (a = a.parentNode) !== Ui.body); ) ;
        }
        setClassName(e) {
          this.container.className = "highcharts-container " + (e || "");
        }
        getContainer() {
          var v, b;
          let e, a = this.options, l = a.chart, n = "data-highcharts-chart", o = qu(), h = this.renderTo, u = Jo(Yu(h, n));
          ze(u) && Ai[u] && Ai[u].hasRendered && Ai[u].destroy(), Yu(h, n, this.index), h.innerHTML = ge.emptyHTML, l.skipClone || h.offsetWidth || this.temporaryDisplay(), this.getChartSize();
          let c = this.chartHeight, f = this.chartWidth;
          Oi(h, { overflow: "hidden" }), this.styledMode || (e = Ca({ position: "relative", overflow: "hidden", width: f + "px", height: c + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none", "touch-action": "manipulation", outline: "none", padding: "0px" }, l.style || {}));
          let y = is("div", { id: o }, e, h);
          this.container = y, this.getChartSize(), f === this.chartWidth || (f = this.chartWidth, this.styledMode || Oi(y, { width: Ie((v = l.style) == null ? void 0 : v.width, f + "px") })), this.containerBox = this.getContainerBox(), this._cursor = y.style.cursor;
          let g = l.renderer || !_o ? Sa.getRendererType(l.renderer) : ri;
          if (this.renderer = new g(y, f, c, void 0, l.forExport, (b = a.exporting) == null ? void 0 : b.allowHTML, this.styledMode), Ti(void 0, this), this.setClassName(l.className), this.styledMode) for (let S in a.defs) this.renderer.definition(a.defs[S]);
          else this.renderer.setStyle(l.style);
          this.renderer.chartIndex = this.index, Zt(this, "afterGetContainer");
        }
        getMargins(e) {
          var o;
          let { spacing: a, margin: l, titleOffset: n } = this;
          this.resetMargins(), n[0] && !as(l[0]) && (this.plotTop = Math.max(this.plotTop, n[0] + a[0])), n[2] && !as(l[2]) && (this.marginBottom = Math.max(this.marginBottom, n[2] + a[2])), (o = this.legend) != null && o.display && this.legend.adjustMargins(l, a), Zt(this, "getMargins"), e || this.getAxisMargins();
        }
        getAxisMargins() {
          let e = this, a = e.axisOffset = [0, 0, 0, 0], l = e.colorAxis, n = e.margin, o = function(h) {
            h.forEach(function(u) {
              u.visible && u.getOffset();
            });
          };
          e.hasCartesianSeries ? o(e.axes) : l != null && l.length && o(l), je.forEach(function(h, u) {
            as(n[u]) || (e[h] += a[u]);
          }), e.setChartSize();
        }
        getOptions() {
          return ju(this.userOptions, aa);
        }
        reflow(e) {
          var o;
          let a = this, l = a.containerBox, n = a.getContainerBox();
          (o = a.pointer) == null || delete o.chartPosition, !a.isPrinting && !a.isResizing && l && n.width && ((n.width !== l.width || n.height !== l.height) && (Mt.clearTimeout(a.reflowTimeout), a.reflowTimeout = tf(function() {
            a.container && a.setSize(void 0, void 0, !1);
          }, 100 * !!e)), a.containerBox = n);
        }
        setReflow() {
          let e = this, a = (l) => {
            var n;
            (n = e.options) != null && n.chart.reflow && e.hasLoaded && e.reflow(l);
          };
          if (typeof ResizeObserver == "function") new ResizeObserver(a).observe(e.renderTo);
          else {
            let l = Zo(Qo, "resize", a);
            Zo(this, "destroy", l);
          }
        }
        setSize(e, a, l) {
          let n = this, o = n.renderer;
          n.isResizing += 1, Ti(l, n);
          let h = o.globalAnimation;
          n.oldChartHeight = n.chartHeight, n.oldChartWidth = n.chartWidth, e !== void 0 && (n.options.chart.width = e), a !== void 0 && (n.options.chart.height = a), n.getChartSize();
          let { chartWidth: u, chartHeight: c, scrollablePixelsX: f = 0, scrollablePixelsY: y = 0 } = n;
          (n.isDirtyBox || u !== n.oldChartWidth || c !== n.oldChartHeight) && (n.styledMode || (h ? Rs : Oi)(n.container, { width: `${u + f}px`, height: `${c + y}px` }, h), n.setChartSize(!0), o.setSize(u, c, h), n.axes.forEach(function(g) {
            g.isDirty = !0, g.setScale();
          }), n.isDirtyLegend = !0, n.isDirtyBox = !0, n.layOutTitles(), n.getMargins(), n.redraw(h), n.oldChartHeight = void 0, Zt(n, "resize"), setTimeout(() => {
            n && Zt(n, "endResize");
          }, Id(h).duration)), n.isResizing -= 1;
        }
        setChartSize(e) {
          let a, l, n, o, { chartHeight: h, chartWidth: u, inverted: c, spacing: f, renderer: y } = this, g = this.clipOffset, v = Math[c ? "floor" : "round"];
          this.plotLeft = a = Math.round(this.plotLeft), this.plotTop = l = Math.round(this.plotTop), this.plotWidth = n = Math.max(0, Math.round(u - a - (this.marginRight ?? 0))), this.plotHeight = o = Math.max(0, Math.round(h - l - (this.marginBottom ?? 0))), this.plotSizeX = c ? o : n, this.plotSizeY = c ? n : o, this.spacingBox = y.spacingBox = { x: f[3], y: f[0], width: u - f[3] - f[1], height: h - f[0] - f[2] }, this.plotBox = y.plotBox = { x: a, y: l, width: n, height: o }, g && (this.clipBox = { x: v(g[3]), y: v(g[0]), width: v(this.plotSizeX - g[1] - g[3]), height: v(this.plotSizeY - g[0] - g[2]) }), e || (this.axes.forEach(function(b) {
            b.setAxisSize(), b.setAxisTranslation();
          }), y.alignElements()), Zt(this, "afterSetChartSize", { skipAxes: e });
        }
        resetMargins() {
          Zt(this, "resetMargins");
          let e = this, a = e.options.chart, l = a.plotBorderWidth || 0, n = Math.round(l) / 2;
          ["margin", "spacing"].forEach(function(o) {
            let h = a[o], u = $d(h) ? h : [h, h, h, h];
            ["Top", "Right", "Bottom", "Left"].forEach(function(c, f) {
              e[o][f] = Ie(a[o + c], u[f]);
            });
          }), je.forEach(function(o, h) {
            e[o] = Ie(e.margin[h], e.spacing[h]);
          }), e.axisOffset = [0, 0, 0, 0], e.clipOffset = [n, n, n, n], e.plotBorderWidth = l;
        }
        drawChartBox() {
          let e = this.options.chart, a = this.renderer, l = this.chartWidth, n = this.chartHeight, o = this.styledMode, h = this.plotBGImage, u = e.backgroundColor, c = e.plotBackgroundColor, f = e.plotBackgroundImage, y = this.plotLeft, g = this.plotTop, v = this.plotWidth, b = this.plotHeight, S = this.plotBox, E = this.clipRect, T = this.clipBox, M = this.chartBackground, w = this.plotBackground, C = this.plotBorder, B, z, R, Y = "animate";
          M || (this.chartBackground = M = a.rect().addClass("highcharts-background").add(), Y = "attr"), o ? B = z = M.strokeWidth() : (z = (B = e.borderWidth || 0) + 8 * !!e.shadow, R = { fill: u || "none" }, (B || M["stroke-width"]) && (R.stroke = e.borderColor, R["stroke-width"] = B), M.attr(R).shadow(e.shadow)), M[Y]({ x: z / 2, y: z / 2, width: l - z - B % 2, height: n - z - B % 2, r: e.borderRadius }), Y = "animate", w || (Y = "attr", this.plotBackground = w = a.rect().addClass("highcharts-plot-background").add()), w[Y](S), !o && (w.attr({ fill: c || "none" }).shadow(e.plotShadow), f && (h ? (f !== h.attr("href") && h.attr("href", f), h.animate(S)) : this.plotBGImage = a.image(f, y, g, v, b).add())), E ? E.animate({ width: T.width, height: T.height }) : this.clipRect = a.clipRect(T), Y = "animate", C || (Y = "attr", this.plotBorder = C = a.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()), o || C.attr({ stroke: e.plotBorderColor, "stroke-width": e.plotBorderWidth || 0, fill: "none" }), C[Y](C.crisp(S, -C.strokeWidth())), this.isDirtyBox = !1, Zt(this, "afterDrawChartBox");
        }
        propFromSeries() {
          let e, a, l, n = this, o = n.options.chart, h = n.options.series;
          ["inverted", "angular", "polar"].forEach(function(u) {
            for (a = gr[o.type], l = o[u] || a && a.prototype[u], e = h == null ? void 0 : h.length; !l && e--; ) (a = gr[h[e].type]) && a.prototype[u] && (l = !0);
            n[u] = l;
          });
        }
        linkSeries(e) {
          let a = this, l = a.series;
          l.forEach(function(n) {
            n.linkedSeries.length = 0;
          }), l.forEach(function(n) {
            let { linkedTo: o } = n.options;
            if (mr(o)) {
              let h;
              (h = o === ":previous" ? a.series[n.index - 1] : a.get(o)) && h.linkedParent !== n && (h.linkedSeries.push(n), n.linkedParent = h, h.enabledDataSorting && n.setDataSortingOptions(), n.visible = Ie(n.options.visible, h.options.visible, n.visible));
            }
          }), Zt(this, "afterLinkSeries", { isUpdating: e });
        }
        renderSeries() {
          this.series.forEach(function(e) {
            e.translate(), e.render();
          });
        }
        render() {
          var y;
          let e = this.axes, a = this.colorAxis, l = this.renderer, n = this.options.chart.axisLayoutRuns || 2, o = (g) => {
            g.forEach((v) => {
              v.visible && v.render();
            });
          }, h = 0, u = !0, c, f = 0;
          for (let g of (this.setTitle(), Zt(this, "beforeMargins"), (y = this.getStacks) == null || y.call(this), this.getMargins(!0), this.setChartSize(), e)) {
            let { options: v } = g, { labels: b } = v;
            if (this.hasCartesianSeries && g.horiz && g.visible && b.enabled && g.series.length && g.coll !== "colorAxis" && !this.polar) {
              h = v.tickLength, g.createGroups();
              let S = new Ia(g, 0, "", !0), E = S.createLabel("x", b);
              if (S.destroy(), E && Ie(b.reserveSpace, !ze(v.crossing)) && (h = E.getBBox().height + b.distance + Math.max(v.offset || 0, 0)), h) {
                E == null || E.destroy();
                break;
              }
            }
          }
          for (this.plotHeight = Math.max(this.plotHeight - h, 0); (u || c || n > 1) && f < n; ) {
            let g = this.plotWidth, v = this.plotHeight;
            for (let b of e) f === 0 ? b.setScale() : (b.horiz && u || !b.horiz && c) && b.setTickInterval(!0);
            f === 0 ? this.getAxisMargins() : this.getMargins(), u = g / this.plotWidth > (f ? 1 : 1.1), c = v / this.plotHeight > (f ? 1 : 1.05), f++;
          }
          this.drawChartBox(), this.hasCartesianSeries ? o(e) : a != null && a.length && o(a), this.seriesGroup || (this.seriesGroup = l.g("series-group").attr({ zIndex: 3 }).shadow(this.options.chart.seriesGroupShadow).add()), this.renderSeries(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = !0;
        }
        addCredits(e) {
          let a = this, l = ya(!0, this.options.credits, e);
          l.enabled && !this.credits && (this.credits = this.renderer.text(l.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
            l.href && (Qo.location.href = l.href);
          }).attr({ align: l.position.align, zIndex: 8 }), a.styledMode || this.credits.css(l.style), this.credits.add().align(l.position), this.credits.update = function(n) {
            a.credits = a.credits.destroy(), a.addCredits(n);
          });
        }
        destroy() {
          var u, c;
          let e, a = this, l = a.axes, n = a.series, o = a.container, h = o == null ? void 0 : o.parentNode;
          for (Zt(a, "destroy"), a.renderer.forExport ? Vo(Ai, a) : Ai[a.index] = void 0, Z.chartCount--, a.renderTo.removeAttribute("data-highcharts-chart"), Pu(a), e = l.length; e--; ) l[e] = l[e].destroy();
          for ((c = (u = this.scroller) == null ? void 0 : u.destroy) == null || c.call(u), e = n.length; e--; ) n[e] = n[e].destroy();
          ["title", "subtitle", "chartBackground", "plotBackground", "plotBGImage", "plotBorder", "seriesGroup", "clipRect", "credits", "pointer", "rangeSelector", "legend", "resetZoomButton", "tooltip", "renderer"].forEach((f) => {
            var y, g;
            a[f] = (g = (y = a[f]) == null ? void 0 : y.destroy) == null ? void 0 : g.call(y);
          }), o && (o.innerHTML = ge.emptyHTML, Pu(o), h && Jd(o)), Io(a, function(f, y) {
            delete a[y];
          });
        }
        firstRender() {
          var n;
          let e = this, a = e.options;
          e.getContainer(), e.resetMargins(), e.setChartSize(), e.propFromSeries(), e.createAxes();
          let l = Fe(a.series) ? a.series : [];
          a.series = [], l.forEach(function(o) {
            e.initSeries(o);
          }), e.linkSeries(), e.setSortedData(), Zt(e, "beforeRender"), e.render(), (n = e.pointer) == null || n.getChartPosition(), e.renderer.imgCount || e.hasLoaded || e.onload(), e.temporaryDisplay(!0);
        }
        onload() {
          this.callbacks.concat([this.callback]).forEach(function(e) {
            e && this.index !== void 0 && e.apply(this, [this]);
          }, this), Zt(this, "load"), Zt(this, "render"), as(this.index) && this.setReflow(), this.warnIfA11yModuleNotLoaded(), this.hasLoaded = !0;
        }
        warnIfA11yModuleNotLoaded() {
          let { options: e, title: a } = this;
          !e || this.accessibility || (this.renderer.boxWrapper.attr({ role: "img", "aria-label": ((a == null ? void 0 : a.element.textContent) || "").replace(/</g, "&lt;") }), e.accessibility && e.accessibility.enabled === !1 || Wo('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', !1, this));
        }
        addSeries(e, a, l) {
          let n, o = this;
          return e && (a = Ie(a, !0), Zt(o, "addSeries", { options: e }, function() {
            n = o.initSeries(e), o.isDirtyLegend = !0, o.linkSeries(), n.enabledDataSorting && n.setData(e.data, !1), Zt(o, "afterAddSeries", { series: n }), a && o.redraw(l);
          })), n;
        }
        addAxis(e, a, l, n) {
          return this.createAxis(a ? "xAxis" : "yAxis", { axis: e, redraw: l, animation: n });
        }
        addColorAxis(e, a, l) {
          return this.createAxis("colorAxis", { axis: e, redraw: a, animation: l });
        }
        createAxis(e, a) {
          let l = new ta(this, a.axis, e);
          return Ie(a.redraw, !0) && this.redraw(a.animation), l;
        }
        showLoading(e) {
          let a = this, l = a.options, n = l.loading, o = function() {
            h && Oi(h, { left: a.plotLeft + "px", top: a.plotTop + "px", width: a.plotWidth + "px", height: a.plotHeight + "px" });
          }, h = a.loadingDiv, u = a.loadingSpan;
          h || (a.loadingDiv = h = is("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, a.container)), u || (a.loadingSpan = u = is("span", { className: "highcharts-loading-inner" }, null, h), Zo(a, "redraw", o)), h.className = "highcharts-loading", ge.setElementHTML(u, Ie(e, l.lang.loading, "")), a.styledMode || (Oi(h, Ca(n.style, { zIndex: 10 })), Oi(u, n.labelStyle), a.loadingShown || (Oi(h, { opacity: 0, display: "" }), Rs(h, { opacity: n.style.opacity || 0.5 }, { duration: n.showDuration || 0 }))), a.loadingShown = !0, o();
        }
        hideLoading() {
          let e = this.options, a = this.loadingDiv;
          a && (a.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || Rs(a, { opacity: 0 }, { duration: e.loading.hideDuration || 100, complete: function() {
            Oi(a, { display: "none" });
          } })), this.loadingShown = !1;
        }
        update(e, a, l, n) {
          let o, h, u, c = this, f = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, y = e.isResponsiveOptions, g = [];
          Zt(c, "update", { options: e }), y || c.setResponsive(!1, !0), e = ju(e, c.options), c.userOptions = ya(c.userOptions, e);
          let v = e.chart;
          v && (ya(!0, c.options.chart, v), this.setZoomOptions(), "className" in v && c.setClassName(v.className), ("inverted" in v || "polar" in v || "type" in v) && (c.propFromSeries(), o = !0), "alignTicks" in v && (o = !0), "events" in v && Gu(this, v), Io(v, function(E, T) {
            c.propsRequireUpdateSeries.indexOf("chart." + T) !== -1 && (h = !0), c.propsRequireDirtyBox.indexOf(T) !== -1 && (c.isDirtyBox = !0), c.propsRequireReflow.indexOf(T) === -1 || (c.isDirtyBox = !0, y || (u = !0));
          }), !c.styledMode && v.style && c.renderer.setStyle(c.options.chart.style || {})), !c.styledMode && e.colors && (this.options.colors = e.colors), Io(e, function(E, T) {
            c[T] && typeof c[T].update == "function" ? c[T].update(E, !1) : typeof c[f[T]] == "function" ? c[f[T]](E) : T !== "colors" && c.collectionsWithUpdate.indexOf(T) === -1 && ya(!0, c.options[T], e[T]), T !== "chart" && c.propsRequireUpdateSeries.indexOf(T) !== -1 && (h = !0);
          }), this.collectionsWithUpdate.forEach(function(E) {
            e[E] && (yr(e[E]).forEach(function(T, M) {
              let w, C = as(T.id);
              C && (w = c.get(T.id)), !w && c[E] && (w = c[E][Ie(T.index, M)]) && (C && as(w.options.id) || w.options.isInternal) && (w = void 0), w && w.coll === E && (w.update(T, !1), l && (w.touched = !0)), !w && l && c.collectionsWithInit[E] && (c.collectionsWithInit[E][0].apply(c, [T].concat(c.collectionsWithInit[E][1] || []).concat([!1])).touched = !0);
            }), l && c[E].forEach(function(T) {
              T.touched || T.options.isInternal ? delete T.touched : g.push(T);
            }));
          }), g.forEach(function(E) {
            E.chart && E.remove && E.remove(!1);
          }), o && c.axes.forEach(function(E) {
            E.update({}, !1);
          }), h && c.getSeriesOrderByLinks().forEach(function(E) {
            E.chart && E.update({}, !1);
          }, this);
          let b = v == null ? void 0 : v.width, S = v && (mr(v.height) ? $o(v.height, b || c.chartWidth) : v.height);
          u || ze(b) && b !== c.chartWidth || ze(S) && S !== c.chartHeight ? c.setSize(b, S, n) : Ie(a, !0) && c.redraw(n), Zt(c, "afterUpdate", { options: e, redraw: a, animation: n });
        }
        setSubtitle(e, a) {
          this.applyDescription("subtitle", e), this.layOutTitles(a);
        }
        setCaption(e, a) {
          this.applyDescription("caption", e), this.layOutTitles(a);
        }
        showResetZoom() {
          let e = this, a = aa.lang, l = e.zooming.resetButton, n = l.theme, o = l.relativeTo === "chart" || l.relativeTo === "spacingBox" ? null : "plotBox";
          function h() {
            e.zoomOut();
          }
          Zt(this, "beforeShowResetZoom", null, function() {
            e.resetZoomButton = e.renderer.button(a.resetZoom, null, null, h, n).attr({ align: l.position.align, title: a.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(l.position, !1, o);
          }), Zt(this, "afterShowResetZoom");
        }
        zoomOut() {
          Zt(this, "selection", { resetSelection: !0 }, () => this.transform({ reset: !0, trigger: "zoom" }));
        }
        pan(e, a) {
          let l = this, n = typeof a == "object" ? a : { enabled: a, type: "x" }, o = n.type, h = o && l[{ x: "xAxis", xy: "axes", y: "yAxis" }[o]].filter((c) => c.options.panningEnabled && !c.options.isInternal), u = l.options.chart;
          u != null && u.panning && (u.panning = n), Zt(this, "pan", { originalEvent: e }, () => {
            l.transform({ axes: h, event: e, to: { x: e.chartX - (l.mouseDownX || 0), y: e.chartY - (l.mouseDownY || 0) }, trigger: "pan" }), Oi(l.container, { cursor: "move" });
          });
        }
        transform(e) {
          var S;
          let { axes: a = this.axes, event: l, from: n = {}, reset: o, selection: h, to: u = {}, trigger: c } = e, { inverted: f, time: y } = this, g = !1, v, b;
          for (let E of ((S = this.hoverPoints) == null || S.forEach((T) => T.setState()), a)) {
            let { horiz: T, len: M, minPointOffset: w = 0, options: C, reversed: B } = E, z = T ? "width" : "height", R = T ? "x" : "y", Y = Ie(u[z], E.len), H = Ie(n[z], E.len), j = 10 > Math.abs(Y) ? 1 : Y / H, W = (n[R] || 0) + H / 2 - E.pos, tt = W - ((u[R] ?? E.pos) + Y / 2 - E.pos) / j, it = B && !f || !B && f ? -1 : 1;
            if (!o && (W < 0 || W > E.len)) continue;
            let J = E.toValue(tt, !0) + (h || E.isOrdinal ? 0 : w * it), rt = E.toValue(tt + M / j, !0) - (h || E.isOrdinal ? 0 : w * it || 0), nt = E.allExtremes;
            if (J > rt && ([J, rt] = [rt, J]), j === 1 && !o && E.coll === "yAxis" && !nt) {
              for (let Ci of E.series) {
                let ji = Ci.getExtremes(Ci.getProcessedData(!0).modified.getColumn("y") || [], !0);
                nt ?? (nt = { dataMin: Number.MAX_VALUE, dataMax: -Number.MAX_VALUE }), ze(ji.dataMin) && ze(ji.dataMax) && (nt.dataMin = Math.min(ji.dataMin, nt.dataMin), nt.dataMax = Math.max(ji.dataMax, nt.dataMax));
              }
              E.allExtremes = nt;
            }
            let { dataMin: Ct, dataMax: ht, min: wt, max: Yt } = Ca(E.getExtremes(), nt || {}), kt = y.parse(C.min), jt = y.parse(C.max), $e = Ct ?? kt, Pt = ht ?? jt, Vt = rt - J, Tt = E.categories ? 0 : Math.min(Vt, Pt - $e), At = $e - Tt * (as(kt) ? 0 : C.minPadding), Me = Pt + Tt * (as(jt) ? 0 : C.maxPadding), qt = E.allowZoomOutside || j === 1 || c !== "zoom" && j > 1, de = Math.min(kt ?? At, At, qt ? wt : At), Pe = Math.max(jt ?? Me, Me, qt ? Yt : Me);
            (!E.isOrdinal || E.options.overscroll || j !== 1 || o) && (J < de && (J = de, j >= 1 && (rt = J + Vt)), rt > Pe && (rt = Pe, j >= 1 && (J = rt - Vt)), (o || E.series.length && (J !== wt || rt !== Yt) && J >= de && rt <= Pe) && (h ? h[E.coll].push({ axis: E, min: J, max: rt }) : (E.isPanning = c !== "zoom", E.isPanning && (b = !0), E.setExtremes(o ? void 0 : J, o ? void 0 : rt, !1, !1, { move: tt, trigger: c, scale: j }), !o && (J > de || rt < Pe) && c !== "mousewheel" && (v = !0)), g = !0), l && (this[T ? "mouseDownX" : "mouseDownY"] = l[T ? "chartX" : "chartY"]));
          }
          return g && (h ? Zt(this, "selection", h, () => {
            delete e.selection, e.trigger = "zoom", this.transform(e);
          }) : (!v || b || this.resetZoomButton ? !v && this.resetZoomButton && (this.resetZoomButton = this.resetZoomButton.destroy()) : this.showResetZoom(), this.redraw(c === "zoom" && (this.options.chart.animation ?? this.pointCount < 100)))), g;
        }
      }
      Ca(ka.prototype, { callbacks: [], collectionsWithInit: { xAxis: [ka.prototype.addAxis, [!0]], yAxis: [ka.prototype.addAxis, [!1]], series: [ka.prototype.addSeries] }, collectionsWithUpdate: ["xAxis", "yAxis", "series"], propsRequireDirtyBox: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "plotBackgroundColor", "plotBackgroundImage", "plotBorderColor", "plotBorderWidth", "plotShadow", "shadow"], propsRequireReflow: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "spacing", "spacingTop", "spacingRight", "spacingBottom", "spacingLeft"], propsRequireUpdateSeries: ["chart.inverted", "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions", "time", "tooltip"] });
      let { stop: _u } = We, { composed: ef } = Z, { addEvent: Da, createElement: bl, css: vr, defined: th, erase: Qu, merge: Zu, pushUnique: La } = Mt;
      function Vu() {
        let p = this.scrollablePlotArea;
        (this.scrollablePixelsX || this.scrollablePixelsY) && !p && (this.scrollablePlotArea = p = new on(this)), p == null || p.applyFixed();
      }
      function af() {
        this.chart.scrollablePlotArea && (this.chart.scrollablePlotArea.isDirty = !0);
      }
      class on {
        static compose(e, a, l) {
          La(ef, this.compose) && (Da(e, "afterInit", af), Da(a, "afterSetChartSize", (n) => this.afterSetSize(n.target, n)), Da(a, "render", Vu), Da(l, "show", af));
        }
        static afterSetSize(e, a) {
          let l, n, o, { minWidth: h, minHeight: u } = e.options.chart.scrollablePlotArea || {}, { clipBox: c, plotBox: f, inverted: y, renderer: g } = e;
          if (!g.forExport && (h ? (e.scrollablePixelsX = l = Math.max(0, h - e.chartWidth), l && (e.scrollablePlotBox = Zu(e.plotBox), f.width = e.plotWidth += l, c[y ? "height" : "width"] += l, o = !0)) : u && (e.scrollablePixelsY = n = Math.max(0, u - e.chartHeight), th(n) && (e.scrollablePlotBox = Zu(e.plotBox), f.height = e.plotHeight += n, c[y ? "width" : "height"] += n, o = !1)), th(o) && !a.skipAxes)) for (let v of e.axes) (v.horiz === o || e.hasParallelCoordinates && v.coll === "yAxis") && (v.setAxisSize(), v.setAxisTranslation());
        }
        constructor(e) {
          var b;
          let a, l = e.options.chart, n = Sa.getRendererType(), o = l.scrollablePlotArea || {}, h = this.moveFixedElements.bind(this), u = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
          e.scrollablePixelsX && (u.overflowX = "auto"), e.scrollablePixelsY && (u.overflowY = "auto"), this.chart = e;
          let c = this.parentDiv = bl("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, e.renderTo), f = this.scrollingContainer = bl("div", { className: "highcharts-scrolling" }, u, c), y = this.innerContainer = bl("div", { className: "highcharts-inner-container" }, void 0, f), g = this.fixedDiv = bl("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (((b = l.style) == null ? void 0 : b.zIndex) || 0) + 2, top: 0 }, void 0, !0), v = this.fixedRenderer = new n(g, e.chartWidth, e.chartHeight, l.style);
          this.mask = v.path().attr({ fill: l.backgroundColor || "#fff", "fill-opacity": o.opacity ?? 0.85, zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), f.parentNode.insertBefore(g, f), vr(e.renderTo, { overflow: "visible" }), Da(e, "afterShowResetZoom", h), Da(e, "afterApplyDrilldown", h), Da(e, "afterLayOutTitles", h), Da(f, "scroll", () => {
            let { pointer: S, hoverPoint: E } = e;
            S && (delete S.chartPosition, E && (a = E), S.runPointActions(void 0, a, !0));
          }), y.appendChild(e.container);
        }
        applyFixed() {
          var W;
          let { chart: e, fixedRenderer: a, isDirty: l, scrollingContainer: n } = this, { axisOffset: o, chartWidth: h, chartHeight: u, container: c, plotHeight: f, plotLeft: y, plotTop: g, plotWidth: v, scrollablePixelsX: b = 0, scrollablePixelsY: S = 0 } = e, { scrollPositionX: E = 0, scrollPositionY: T = 0 } = e.options.chart.scrollablePlotArea || {}, M = h + b, w = u + S;
          a.setSize(h, u), (l ?? !0) && (this.isDirty = !1, this.moveFixedElements()), _u(e.container), vr(c, { width: `${M}px`, height: `${w}px` }), e.renderer.boxWrapper.attr({ width: M, height: w, viewBox: [0, 0, M, w].join(" ") }), (W = e.chartBackground) == null || W.attr({ width: M, height: w }), vr(n, { width: `${h}px`, height: `${u}px` }), th(l) || (n.scrollLeft = b * E, n.scrollTop = S * T);
          let C = g - o[0] - 1, B = y - o[3] - 1, z = g + f + o[2] + 1, R = y + v + o[1] + 1, Y = y + v - b, H = g + f - S, j = [["M", 0, 0]];
          b ? j = [["M", 0, C], ["L", y - 1, C], ["L", y - 1, z], ["L", 0, z], ["Z"], ["M", Y, C], ["L", h, C], ["L", h, z], ["L", Y, z], ["Z"]] : S && (j = [["M", B, 0], ["L", B, g - 1], ["L", R, g - 1], ["L", R, 0], ["Z"], ["M", B, H], ["L", B, u], ["L", R, u], ["L", R, H], ["Z"]]), e.redrawTrigger !== "adjustHeight" && this.mask.attr({ d: j });
        }
        moveFixedElements() {
          let e, { container: a, inverted: l, scrollablePixelsX: n, scrollablePixelsY: o } = this.chart, h = this.fixedRenderer, u = on.fixedSelectors;
          if (n && !l ? e = ".highcharts-yaxis" : n && l || o && !l ? e = ".highcharts-xaxis" : o && l && (e = ".highcharts-yaxis"), e && !(this.chart.hasParallelCoordinates && e === ".highcharts-yaxis")) for (let c of [`${e}:not(.highcharts-radial-axis)`, `${e}-labels:not(.highcharts-radial-axis-labels)`]) La(u, c);
          else for (let c of [".highcharts-xaxis", ".highcharts-yaxis"]) for (let f of [`${c}:not(.highcharts-radial-axis)`, `${c}-labels:not(.highcharts-radial-axis-labels)`]) Qu(u, f);
          for (let c of u) [].forEach.call(a.querySelectorAll(c), (f) => {
            (f.namespaceURI === h.SVG_NS ? h.box : h.box.parentNode).appendChild(f), f.style.pointerEvents = "auto";
          });
        }
      }
      on.fixedSelectors = [".highcharts-breadcrumbs-group", ".highcharts-contextbutton", ".highcharts-caption", ".highcharts-credits", ".highcharts-drillup-button", ".highcharts-legend", ".highcharts-legend-checkbox", ".highcharts-navigator-series", ".highcharts-navigator-xaxis", ".highcharts-navigator-yaxis", ".highcharts-navigator", ".highcharts-range-selector-group", ".highcharts-reset-zoom", ".highcharts-scrollbar", ".highcharts-subtitle", ".highcharts-title"];
      let { format: ss } = Ri, { series: sf } = Ee, { destroyObjectProperties: eh, fireEvent: hn, getAlignFactor: xe, isNumber: Wu, pick: br } = Mt, Ku = class {
        constructor(p, e, a, l, n) {
          let o = p.chart.inverted, h = p.reversed;
          this.axis = p;
          let u = this.isNegative = !!a != !!h;
          this.options = e = e || {}, this.x = l, this.total = null, this.cumulative = null, this.points = {}, this.hasValidPoints = !1, this.stack = n, this.leftCliff = 0, this.rightCliff = 0, this.alignOptions = { align: e.align || (o ? u ? "left" : "right" : "center"), verticalAlign: e.verticalAlign || (o ? "middle" : u ? "bottom" : "top"), y: e.y, x: e.x }, this.textAlign = e.textAlign || (o ? u ? "right" : "left" : "center");
        }
        destroy() {
          eh(this, this.axis);
        }
        render(p) {
          let e = this.axis.chart, a = this.options, l = a.format, n = l ? ss(l, this, e) : a.formatter.call(this);
          if (this.label) this.label.attr({ text: n, visibility: "hidden" });
          else {
            this.label = e.renderer.label(n, null, void 0, a.shape, void 0, void 0, a.useHTML, !1, "stack-labels");
            let o = { r: a.borderRadius || 0, text: n, padding: br(a.padding, 5), visibility: "hidden" };
            e.styledMode || (o.fill = a.backgroundColor, o.stroke = a.borderColor, o["stroke-width"] = a.borderWidth, this.label.css(a.style || {})), this.label.attr(o), this.label.added || this.label.add(p);
          }
          this.label.labelrank = e.plotSizeY, hn(this, "afterRender");
        }
        setOffset(p, e, a, l, n, o) {
          let { alignOptions: h, axis: u, label: c, options: f, textAlign: y } = this, g = u.chart, v = this.getStackBox({ xOffset: p, width: e, boxBottom: a, boxTop: l, defaultX: n, xAxis: o }), { verticalAlign: b } = h;
          if (c && v) {
            let S = c.getBBox(void 0, 0), E = c.padding, T = br(f.overflow, "justify") === "justify", M;
            h.x = f.x || 0, h.y = f.y || 0;
            let { x: w, y: C } = this.adjustStackPosition({ labelBox: S, verticalAlign: b, textAlign: y });
            v.x -= w, v.y -= C, c.align(h, !1, v), (M = g.isInsidePlot(c.alignAttr.x + h.x + w, c.alignAttr.y + h.y + C)) || (T = !1), T && sf.prototype.justifyDataLabel.call(u, c, h, c.alignAttr, S, v), c.attr({ x: c.alignAttr.x, y: c.alignAttr.y, rotation: f.rotation, rotationOriginX: S.width * xe(f.textAlign || "center"), rotationOriginY: S.height / 2 }), br(!T && f.crop, !0) && (M = Wu(c.x) && Wu(c.y) && g.isInsidePlot(c.x - E + (c.width || 0), c.y) && g.isInsidePlot(c.x + E, c.y)), c[M ? "show" : "hide"]();
          }
          hn(this, "afterSetOffset", { xOffset: p, width: e });
        }
        adjustStackPosition({ labelBox: p, verticalAlign: e, textAlign: a }) {
          return { x: p.width / 2 + p.width / 2 * (2 * xe(a) - 1), y: p.height / 2 * 2 * (1 - xe(e)) };
        }
        getStackBox(p) {
          let e = this.axis, a = e.chart, { boxTop: l, defaultX: n, xOffset: o, width: h, boxBottom: u } = p, c = e.stacking.usePercentage ? 100 : br(l, this.total, 0), f = e.toPixels(c), y = p.xAxis || a.xAxis[0], g = br(n, y.translate(this.x)) + o, v = Math.abs(f - e.toPixels(u || Wu(e.min) && e.logarithmic && e.logarithmic.lin2log(e.min) || 0)), b = a.inverted, S = this.isNegative;
          return b ? { x: (S ? f : f - v) - a.plotLeft, y: y.height - g - h + y.top - a.plotTop, width: v, height: h } : { x: g + y.transB - a.plotLeft, y: (S ? f - v : f) - a.plotTop, width: h, height: v };
        }
      }, { getDeferredAnimation: xr } = We, { series: { prototype: Bs } } = Ee, { addEvent: Fu, correctFloat: un, defined: cn, destroyObjectProperties: za, fireEvent: lf, isNumber: Sr, objectEach: Hs, pick: Mr } = Mt;
      function Iu() {
        let p = this.inverted;
        this.axes.forEach((e) => {
          var a;
          (a = e.stacking) != null && a.stacks && e.hasVisibleSeries && (e.stacking.oldStacks = e.stacking.stacks);
        }), this.series.forEach((e) => {
          var l;
          let a = ((l = e.xAxis) == null ? void 0 : l.options) || {};
          e.options.stacking && e.reserveSpace() && (e.stackKey = [e.type, Mr(e.options.stack, ""), p ? a.top : a.left, p ? a.height : a.width].join(","));
        });
      }
      function ih() {
        var e;
        let p = this.stacking;
        if (p) {
          let a = p.stacks;
          Hs(a, (l, n) => {
            za(l), delete a[n];
          }), (e = p.stackTotalGroup) == null || e.destroy();
        }
      }
      function nf() {
        this.stacking || (this.stacking = new Np(this));
      }
      function ls(p, e, a, l) {
        return !cn(p) || p.x !== e || l && p.stackKey !== l ? p = { x: e, index: 0, key: l, stackKey: l } : p.index++, p.key = [a, e, p.index].join(","), p;
      }
      function He() {
        let p, e = this, a = e.yAxis, l = e.stackKey || "", n = a.stacking.stacks, o = e.getColumn("x", !0), h = e.options.stacking, u = e[h + "Stacker"];
        u && [l, "-" + l].forEach((c) => {
          var b;
          let f = o.length, y, g, v;
          for (; f--; ) y = o[f], p = e.getStackIndicator(p, y, e.index, c), g = (b = n[c]) == null ? void 0 : b[y], (v = g == null ? void 0 : g.points[p.key || ""]) && u.call(e, v, g, f);
        });
      }
      function Ju(p, e, a) {
        let l = e.total ? 100 / e.total : 0;
        p[0] = un(p[0] * l), p[1] = un(p[1] * l), this.stackedYData[a] = p[1];
      }
      function rf(p) {
        (this.is("column") || this.is("columnrange")) && (this.options.centerInCategory && this.chart.series.length > 1 ? Bs.setStackedPoints.call(this, p, "group") : p.stacking.resetStacks());
      }
      function Je(p, e) {
        var H, j;
        let a, l, n, o, h, u, c, f = e || this.options.stacking;
        if (!f || !this.reserveSpace() || ({ group: "xAxis" }[f] || "yAxis") !== p.coll) return;
        let y = this.getColumn("x", !0), g = this.getColumn(this.pointValKey || "y", !0), v = [], b = g.length, S = this.options, E = S.threshold || 0, T = S.startFromThreshold ? E : 0, M = S.stack, w = e ? `${this.type},${f}` : this.stackKey || "", C = "-" + w, B = this.negStacks, z = p.stacking, R = z.stacks, Y = z.oldStacks;
        for (z.stacksTouched += 1, c = 0; c < b; c++) {
          let W = y[c] || 0, tt = g[c], it = Sr(tt) && tt || 0;
          u = (a = this.getStackIndicator(a, W, this.index)).key || "", R[h = (l = B && it < (T ? 0 : E)) ? C : w] || (R[h] = {}), R[h][W] || ((H = Y[h]) != null && H[W] ? (R[h][W] = Y[h][W], R[h][W].total = null) : R[h][W] = new Ku(p, p.options.stackLabels, !!l, W, M)), n = R[h][W], tt !== null ? (n.points[u] = n.points[this.index] = [Mr(n.cumulative, T)], cn(n.cumulative) || (n.base = u), n.touched = z.stacksTouched, a.index > 0 && this.singleStacks === !1 && (n.points[u][0] = n.points[this.index + "," + W + ",0"][0])) : (delete n.points[u], delete n.points[this.index]);
          let J = n.total || 0;
          f === "percent" ? (o = l ? w : C, J = B && ((j = R[o]) != null && j[W]) ? (o = R[o][W]).total = Math.max(o.total || 0, J) + Math.abs(it) : un(J + Math.abs(it))) : f === "group" ? Sr(tt) && J++ : J = un(J + it), f === "group" ? n.cumulative = (J || 1) - 1 : n.cumulative = un(Mr(n.cumulative, T) + it), n.total = J, tt !== null && (n.points[u].push(n.cumulative), v[c] = n.cumulative, n.hasValidPoints = !0);
        }
        f === "percent" && (z.usePercentage = !0), f !== "group" && (this.stackedYData = v), z.oldStacks = {};
      }
      class Np {
        constructor(e) {
          this.oldStacks = {}, this.stacks = {}, this.stacksTouched = 0, this.axis = e;
        }
        buildStacks() {
          let e, a, l = this.axis, n = l.series, o = l.coll === "xAxis", h = l.options.reversedStacks, u = n.length;
          for (this.resetStacks(), this.usePercentage = !1, a = u; a--; ) e = n[h ? a : u - a - 1], o && e.setGroupedPoints(l), e.setStackedPoints(l);
          if (!o) for (a = 0; a < u; a++) n[a].modifyStacks();
          lf(l, "afterBuildStacks");
        }
        cleanStacks() {
          this.oldStacks && (this.stacks = this.oldStacks, Hs(this.stacks, (e) => {
            Hs(e, (a) => {
              a.cumulative = a.total;
            });
          }));
        }
        resetStacks() {
          Hs(this.stacks, (e) => {
            Hs(e, (a, l) => {
              Sr(a.touched) && a.touched < this.stacksTouched ? (a.destroy(), delete e[l]) : (a.total = null, a.cumulative = null);
            });
          });
        }
        renderStackTotals() {
          var u;
          let e = this.axis, a = e.chart, l = a.renderer, n = this.stacks, o = xr(a, ((u = e.options.stackLabels) == null ? void 0 : u.animation) || !1), h = this.stackTotalGroup = this.stackTotalGroup || l.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add();
          h.translate(a.plotLeft, a.plotTop), Hs(n, (c) => {
            Hs(c, (f) => {
              f.render(h);
            });
          }), h.animate({ opacity: 1 }, o);
        }
      }
      (St || (St = {})).compose = function(p, e, a) {
        let l = e.prototype, n = a.prototype;
        l.getStacks || (Fu(p, "init", nf), Fu(p, "destroy", ih), l.getStacks = Iu, n.getStackIndicator = ls, n.modifyStacks = He, n.percentStacker = Ju, n.setGroupedPoints = rf, n.setStackedPoints = Je);
      };
      let of = St, { defined: hf, merge: Se, isObject: Ei } = Mt;
      class Ra extends Mi {
        drawGraph() {
          let e = this.options, a = (this.gappedPath || this.getGraphPath).call(this), l = this.chart.styledMode;
          [this, ...this.zones].forEach((n, o) => {
            let h, u = n.graph, c = u ? "animate" : "attr", f = n.dashStyle || e.dashStyle;
            u ? (u.endX = this.preventGraphAnimation ? null : a.xMap, u.animate({ d: a })) : a.length && (n.graph = u = this.chart.renderer.path(a).addClass("highcharts-graph" + (o ? ` highcharts-zone-graph-${o - 1} ` : " ") + (o && n.className || "")).attr({ zIndex: 1 }).add(this.group)), u && !l && (h = { stroke: !o && e.lineColor || n.color || this.color || "#cccccc", "stroke-width": e.lineWidth || 0, fill: this.fillGraph && this.color || "none" }, f ? h.dashstyle = f : e.linecap !== "square" && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), u[c](h).shadow(e.shadow && Se({ filterUnits: "userSpaceOnUse" }, Ei(e.shadow) ? e.shadow : {}))), u && (u.startX = a.xMap, u.isArea = a.isArea);
          });
        }
        getGraphPath(e, a, l) {
          let n = this, o = n.options, h = [], u = [], c, f = o.step, y = (e = e || n.points).reversed;
          return y && e.reverse(), (f = { right: 1, center: 2 }[f] || f && 3) && y && (f = 4 - f), (e = this.getValidPoints(e, !1, o.nullInteraction || !(o.connectNulls && !a && !l))).forEach(function(g, v) {
            let b, S = g.plotX, E = g.plotY, T = e[v - 1], M = g.isNull || typeof E != "number";
            (g.leftCliff || T != null && T.rightCliff) && !l && (c = !0), M && !hf(a) && v > 0 ? c = !o.connectNulls : M && !a ? c = !0 : (v === 0 || c ? b = [["M", g.plotX, g.plotY]] : n.getPointSpline ? b = [n.getPointSpline(e, g, v)] : f ? (b = f === 1 ? [["L", T.plotX, E]] : f === 2 ? [["L", (T.plotX + S) / 2, T.plotY], ["L", (T.plotX + S) / 2, E]] : [["L", S, T.plotY]]).push(["L", S, E]) : b = [["L", S, E]], u.push(g.x), f && (u.push(g.x), f === 2 && u.push(g.x)), h.push.apply(h, b), c = !1);
          }), h.xMap = u, n.graphPath = h, h;
        }
      }
      Ra.defaultOptions = Se(Mi.defaultOptions, { legendSymbol: "lineMarker" }), Ee.registerSeriesType("line", Ra);
      let { seriesTypes: { line: ah } } = Ee, { extend: uf, merge: Bp, objectEach: $u, pick: hi } = Mt;
      class Xi extends ah {
        drawGraph() {
          this.areaPath = [], super.drawGraph.apply(this);
          let { areaPath: e, options: a } = this;
          [this, ...this.zones].forEach((l, n) => {
            let o = {}, h = l.fillColor || a.fillColor, u = l.area, c = u ? "animate" : "attr";
            u ? (u.endX = this.preventGraphAnimation ? null : e.xMap, u.animate({ d: e })) : (o.zIndex = 0, (u = l.area = this.chart.renderer.path(e).addClass("highcharts-area" + (n ? ` highcharts-zone-area-${n - 1} ` : " ") + (n && l.className || "")).add(this.group)).isArea = !0), this.chart.styledMode || (o.fill = h || l.color || this.color, o["fill-opacity"] = h ? 1 : a.fillOpacity ?? 0.75, u.css({ pointerEvents: this.stickyTracking ? "none" : "auto" })), u[c](o), u.startX = e.xMap, u.shiftUnit = a.step ? 2 : 1;
          });
        }
        getGraphPath(e) {
          let a, l, n, o = ah.prototype.getGraphPath, h = this.options, u = h.stacking, c = this.yAxis, f = [], y = [], g = this.index, v = c.stacking.stacks[this.stackKey], b = h.threshold, S = Math.round(c.getThreshold(h.threshold)), E = hi(h.connectNulls, u === "percent"), T = function(R, Y, H) {
            let j = e[R], W = u && v[j.x].points[g], tt = j[H + "Null"] || 0, it = j[H + "Cliff"] || 0, J, rt, nt = !0;
            it || tt ? (J = (tt ? W[0] : W[1]) + it, rt = W[0] + it, nt = !!tt) : !u && e[Y] && e[Y].isNull && (J = rt = b), J !== void 0 && (y.push({ plotX: a, plotY: J === null ? S : c.getThreshold(J), isNull: nt, isCliff: !0 }), f.push({ plotX: a, plotY: rt === null ? S : c.getThreshold(rt), doCurve: !1 }));
          };
          e = e || this.points, u && (e = this.getStackPoints(e));
          for (let R = 0, Y = e.length; R < Y; ++R) u || (e[R].leftCliff = e[R].rightCliff = e[R].leftNull = e[R].rightNull = void 0), l = e[R].isNull, a = hi(e[R].rectPlotX, e[R].plotX), n = u ? hi(e[R].yBottom, S) : S, l && !E || (E || T(R, R - 1, "left"), l && !u && E || (y.push(e[R]), f.push({ x: R, plotX: a, plotY: n })), E || T(R, R + 1, "right"));
          let M = o.call(this, y, !0, !0);
          f.reversed = !0;
          let w = o.call(this, f, !0, !0), C = w[0];
          C && C[0] === "M" && (w[0] = ["L", C[1], C[2]]);
          let B = M.concat(w);
          B.length && B.push(["Z"]);
          let z = o.call(this, y, !1, E);
          return this.chart.series.length > 1 && u && y.some((R) => R.isCliff) && (B.hasStackedCliffs = z.hasStackedCliffs = !0), B.xMap = M.xMap, this.areaPath = B, z;
        }
        getStackPoints(e) {
          let a = this, l = [], n = [], o = this.xAxis, h = this.yAxis, u = h.stacking.stacks[this.stackKey], c = {}, f = h.series, y = f.length, g = h.options.reversedStacks ? 1 : -1, v = f.indexOf(a);
          if (e = e || this.points, this.options.stacking) {
            for (let S = 0; S < e.length; S++) e[S].leftNull = e[S].rightNull = void 0, c[e[S].x] = e[S];
            $u(u, function(S, E) {
              S.total !== null && n.push(E);
            }), n.sort(function(S, E) {
              return S - E;
            });
            let b = f.map((S) => S.visible);
            n.forEach(function(S, E) {
              let T = 0, M, w;
              if (c[S] && !c[S].isNull) l.push(c[S]), [-1, 1].forEach(function(C) {
                let B = C === 1 ? "rightNull" : "leftNull", z = u[n[E + C]], R = 0;
                if (z) {
                  let Y = v;
                  for (; Y >= 0 && Y < y; ) {
                    let H = f[Y].index;
                    !(M = z.points[H]) && (H === a.index ? c[S][B] = !0 : b[Y] && (w = u[S].points[H]) && (R -= w[1] - w[0])), Y += g;
                  }
                }
                c[S][C === 1 ? "rightCliff" : "leftCliff"] = R;
              });
              else {
                let C = v;
                for (; C >= 0 && C < y; ) {
                  let B = f[C].index;
                  if (M = u[S].points[B]) {
                    T = M[1];
                    break;
                  }
                  C += g;
                }
                T = hi(T, 0), T = h.translate(T, 0, 1, 0, 1), l.push({ isNull: !0, plotX: o.translate(S, 0, 0, 0, 1), x: S, plotY: T, yBottom: T });
              }
            });
          }
          return l;
        }
      }
      Xi.defaultOptions = Bp(ah.defaultOptions, { threshold: 0, legendSymbol: "areaMarker" }), uf(Xi.prototype, { singleStacks: !1 }), Ee.registerSeriesType("area", Xi);
      let { line: tc } = Ee.seriesTypes, { merge: Gi, pick: Tr } = Mt;
      class Na extends tc {
        getPointSpline(e, a, l) {
          let n, o, h, u, c = a.plotX || 0, f = a.plotY || 0, y = e[l - 1], g = e[l + 1];
          function v(S) {
            return S && !S.isNull && S.doCurve !== !1 && !a.isCliff;
          }
          if (v(y) && v(g)) {
            let S = y.plotX || 0, E = y.plotY || 0, T = g.plotX || 0, M = g.plotY || 0, w = 0;
            n = (1.5 * c + S) / 2.5, o = (1.5 * f + E) / 2.5, h = (1.5 * c + T) / 2.5, u = (1.5 * f + M) / 2.5, h !== n && (w = (u - o) * (h - c) / (h - n) + f - u), o += w, u += w, o > E && o > f ? (o = Math.max(E, f), u = 2 * f - o) : o < E && o < f && (o = Math.min(E, f), u = 2 * f - o), u > M && u > f ? (u = Math.max(M, f), o = 2 * f - u) : u < M && u < f && (u = Math.min(M, f), o = 2 * f - u), a.rightContX = h, a.rightContY = u, a.controlPoints = { low: [n, o], high: [h, u] };
          }
          let b = ["C", Tr(y.rightContX, y.plotX, 0), Tr(y.rightContY, y.plotY, 0), Tr(n, c, 0), Tr(o, f, 0), c, f];
          return y.rightContX = y.rightContY = void 0, b;
        }
      }
      Na.defaultOptions = Gi(tc.defaultOptions), Ee.registerSeriesType("spline", Na);
      let Us = Na, { area: Xs, area: { prototype: Ar } } = Ee.seriesTypes, { extend: ec, merge: Ba } = Mt;
      class sh extends Us {
      }
      sh.defaultOptions = Ba(Us.defaultOptions, Xs.defaultOptions), ec(sh.prototype, { getGraphPath: Ar.getGraphPath, getStackPoints: Ar.getStackPoints, drawGraph: Ar.drawGraph }), Ee.registerSeriesType("areaspline", sh);
      let { animObject: dn } = We, { parse: Or } = Oe, { noop: Er } = Z, { clamp: ns, crisp: wr, defined: ic, extend: fn, fireEvent: ac, isArray: Cr, isNumber: kr, merge: sc, pick: Dr, objectEach: re } = Mt;
      class oe extends Mi {
        animate(e) {
          let a, l, n = this, o = this.yAxis, h = o.pos, u = o.reversed, c = n.options, { clipOffset: f, inverted: y } = this.chart, g = {}, v = y ? "translateX" : "translateY";
          e && f ? (g.scaleY = 1e-3, l = ns(o.toPixels(c.threshold || 0), h, h + o.len), y ? g.translateX = (l += u ? -Math.floor(f[0]) : Math.ceil(f[2])) - o.len : g.translateY = l += u ? Math.ceil(f[0]) : -Math.floor(f[2]), n.clipBox && n.setClip(), n.group.attr(g)) : (a = Number(n.group.attr(v)), n.group.animate({ scaleY: 1 }, fn(dn(n.options.animation), { step: function(b, S) {
            n.group && (g[v] = a + S.pos * (h - a), n.group.attr(g));
          } })));
        }
        init(e, a) {
          super.init.apply(this, arguments);
          let l = this;
          (e = l.chart).hasRendered && e.series.forEach(function(n) {
            n.type === l.type && (n.isDirty = !0);
          });
        }
        getColumnMetrics() {
          var E, T;
          let e = this, a = e.options, l = e.xAxis, n = e.yAxis, o = l.options.reversedStacks, h = l.reversed && !o || !l.reversed && o, u = {}, c, f = 0;
          a.grouping === !1 ? f = 1 : e.chart.series.forEach(function(M) {
            let w, C = M.yAxis, B = M.options;
            M.type === e.type && M.reserveSpace() && n.len === C.len && n.pos === C.pos && (B.stacking && B.stacking !== "group" ? (u[c = M.stackKey] === void 0 && (u[c] = f++), w = u[c]) : B.grouping !== !1 && (w = f++), M.columnIndex = w);
          });
          let y = Math.min(Math.abs(l.transA) * (!((E = l.brokenAxis) != null && E.hasBreaks) && ((T = l.ordinal) == null ? void 0 : T.slope) || a.pointRange || l.closestPointRange || l.tickInterval || 1), l.len), g = y * a.groupPadding, v = (y - 2 * g) / (f || 1), b = Math.min(a.maxPointWidth || l.len, Dr(a.pointWidth, v * (1 - 2 * a.pointPadding))), S = (e.columnIndex || 0) + +!!h;
          return e.columnMetrics = { width: b, offset: (v - b) / 2 + (g + S * v - y / 2) * (h ? -1 : 1), paddedWidth: v, columnCount: f }, e.columnMetrics;
        }
        crispCol(e, a, l, n) {
          let o = this.borderWidth, h = this.chart.inverted;
          return n = wr(a + n, o, h) - (a = wr(a, o, h)), this.options.crisp && (l = wr(e + l, o) - (e = wr(e, o))), { x: e, y: a, width: l, height: n };
        }
        adjustForMissingColumns(e, a, l, n) {
          var o;
          if (!l.isNull && n.columnCount > 1) {
            let h = this.xAxis.series.filter((y) => y.visible).map((y) => y.index), u = 0, c = 0;
            re((o = this.xAxis.stacking) == null ? void 0 : o.stacks, (y) => {
              var S;
              let g = typeof l.x == "number" ? (S = y[l.x.toString()]) == null ? void 0 : S.points : void 0, v = g == null ? void 0 : g[this.index], b = {};
              if (g && Cr(v)) {
                let E = this.index, T = Object.keys(g).filter((M) => !M.match(",") && g[M] && g[M].length > 1).map(parseFloat).filter((M) => h.indexOf(M) !== -1).filter((M) => {
                  let w = this.chart.series[M].options, C = w.stacking && w.stack;
                  if (ic(C)) {
                    if (kr(b[C])) return E === M && (E = b[C]), !1;
                    b[C] = M;
                  }
                  return !0;
                }).sort((M, w) => w - M);
                u = T.indexOf(E), c = T.length;
              }
            }), u = this.xAxis.reversed ? c - 1 - u : u;
            let f = (c - 1) * n.paddedWidth + a;
            e = (l.plotX || 0) + f / 2 - a - u * n.paddedWidth;
          }
          return e;
        }
        translate() {
          let e = this, a = e.chart, l = e.options, n = e.dense = e.closestPointRange * e.xAxis.transA < 2, o = e.borderWidth = Dr(l.borderWidth, +!n), h = e.xAxis, u = e.yAxis, c = l.threshold, f = Dr(l.minPointLength, 5), y = e.getColumnMetrics(), g = y.width, v = e.pointXOffset = y.offset, b = e.dataMin, S = e.dataMax, E = e.translatedThreshold = u.getThreshold(c), T = e.barW = Math.max(g, 1 + 2 * o);
          l.pointPadding && l.crisp && (T = Math.ceil(T)), Mi.prototype.translate.apply(e), e.points.forEach(function(M) {
            let w = Dr(M.yBottom, E), C = 999 + Math.abs(w), B = M.plotX || 0, z = ns(M.plotY, -C, u.len + C), R, Y = Math.min(z, w), H = Math.max(z, w) - Y, j = g, W = B + v, tt = T;
            f && Math.abs(H) < f && (H = f, R = !u.reversed && !M.negative || u.reversed && M.negative, kr(c) && kr(S) && M.y === c && S <= c && (u.min || 0) < c && (b !== S || (u.max || 0) <= c) && (R = !R, M.negative = !M.negative), Y = Math.abs(Y - E) > f ? w - f : E - (R ? f : 0)), ic(M.options.pointWidth) && (W -= Math.round(((j = tt = Math.ceil(M.options.pointWidth)) - g) / 2)), l.centerInCategory && (W = e.adjustForMissingColumns(W, j, M, y)), M.barX = W, M.pointWidth = j, M.tooltipPos = a.inverted ? [ns(u.len + u.pos - a.plotLeft - z, u.pos - a.plotLeft, u.len + u.pos - a.plotLeft), h.len + h.pos - a.plotTop - W - tt / 2, H] : [h.left - a.plotLeft + W + tt / 2, ns(z + u.pos - a.plotTop, u.pos - a.plotTop, u.len + u.pos - a.plotTop), H], M.shapeType = e.pointClass.prototype.shapeType || "roundedRect", M.shapeArgs = e.crispCol(W, Y, tt, M.isNull ? 0 : H);
          }), ac(this, "afterColumnTranslate");
        }
        drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
        }
        pointAttribs(e, a) {
          let l = this.options, n = this.pointAttrToOptions || {}, o = n.stroke || "borderColor", h = n["stroke-width"] || "borderWidth", u, c, f, y = e && e.color || this.color, g = e && e[o] || l[o] || y, v = e && e.options.dashStyle || l.dashStyle, b = e && e[h] || l[h] || this[h] || 0, S = e != null && e.isNull && l.nullInteraction ? 0 : (e == null ? void 0 : e.opacity) ?? l.opacity ?? 1;
          e && this.zones.length && (c = e.getZone(), y = e.options.color || c && (c.color || e.nonZonedColor) || this.color, c && (g = c.borderColor || g, v = c.dashStyle || v, b = c.borderWidth || b)), a && e && (f = (u = sc(l.states[a], e.options.states && e.options.states[a] || {})).brightness, y = u.color || f !== void 0 && Or(y).brighten(u.brightness).get() || y, g = u[o] || g, b = u[h] || b, v = u.dashStyle || v, S = Dr(u.opacity, S));
          let E = { fill: y, stroke: g, "stroke-width": b, opacity: S };
          return v && (E.dashstyle = v), E;
        }
        drawPoints(e = this.points) {
          let a, l = this, n = this.chart, o = l.options, h = o.nullInteraction, u = n.renderer, c = o.animationLimit || 250;
          e.forEach(function(f) {
            let y = f.plotY, g = f.graphic, v = !!g, b = g && n.pointCount < c ? "animate" : "attr";
            kr(y) && (f.y !== null || h) ? (a = f.shapeArgs, g && f.hasNewShapeType() && (g = g.destroy()), l.enabledDataSorting && (f.startXPos = l.xAxis.reversed ? -(a && a.width || 0) : l.xAxis.width), !g && (f.graphic = g = u[f.shapeType](a).add(f.group || l.group), g && l.enabledDataSorting && n.hasRendered && n.pointCount < c && (g.attr({ x: f.startXPos }), v = !0, b = "animate")), g && v && g[b](sc(a)), n.styledMode || g[b](l.pointAttribs(f, f.selected && "select")).shadow(f.allowShadow !== !1 && o.shadow), g && (g.addClass(f.getClassName(), !0), g.attr({ visibility: f.visible ? "inherit" : "hidden" }))) : g && (f.graphic = g.destroy());
          });
        }
        drawTracker(e = this.points) {
          let a, l = this, n = l.chart, o = n.pointer, h = function(u) {
            o == null || o.normalize(u);
            let c = o == null ? void 0 : o.getPointFromEvent(u);
            o && c && l.options.enableMouseTracking && (n.isInsidePlot(u.chartX - n.plotLeft, u.chartY - n.plotTop, { visiblePlotOnly: !0 }) || o != null && o.inClass(u.target, "highcharts-data-label")) && (o.isDirectTouch = !0, c.onMouseOver(u));
          };
          e.forEach(function(u) {
            a = Cr(u.dataLabels) ? u.dataLabels : u.dataLabel ? [u.dataLabel] : [], u.graphic && (u.graphic.element.point = u), a.forEach(function(c) {
              (c.div || c.element).point = u;
            });
          }), l._hasTracking || (l.trackerGroups.forEach(function(u) {
            l[u] && (l[u].addClass("highcharts-tracker").on("mouseover", h).on("mouseout", function(c) {
              o == null || o.onTrackerMouseOut(c);
            }).on("touchstart", h), !n.styledMode && l.options.cursor && l[u].css({ cursor: l.options.cursor }));
          }), l._hasTracking = !0), ac(this, "afterDrawTracker");
        }
        remove() {
          let e = this, a = e.chart;
          a.hasRendered && a.series.forEach(function(l) {
            l.type === e.type && (l.isDirty = !0);
          }), Mi.prototype.remove.apply(e, arguments);
        }
      }
      oe.defaultOptions = sc(Mi.defaultOptions, { borderRadius: 3, centerInCategory: !1, groupPadding: 0.2, marker: null, pointPadding: 0.1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }), fn(oe.prototype, { directTouch: !0, getSymbol: Er, negStacks: !0, trackerGroups: ["group", "dataLabelsGroup"] }), Ee.registerSeriesType("column", oe);
      let Gt = oe, { getDeferredAnimation: Kt } = We, { format: he } = Ri, { defined: Ve, extend: rs, fireEvent: Gs, getAlignFactor: lh, isArray: ui, isString: ye, merge: sa, objectEach: xl, pick: Sl, pInt: la, splat: Ml } = Mt;
      (function(p) {
        function e() {
          return c(this).some((y) => y == null ? void 0 : y.enabled);
        }
        function a(y, g, v, b, S) {
          var W;
          let { chart: E, enabledDataSorting: T } = this, M = this.isCartesian && E.inverted, w = y.plotX, C = y.plotY, B = v.rotation || 0, z = Ve(w) && Ve(C) && E.isInsidePlot(w, Math.round(C), { inverted: M, paneCoordinates: !0, series: this }), R = B === 0 && Sl(v.overflow, T ? "none" : "justify") === "justify", Y = this.visible && y.visible !== !1 && Ve(w) && (y.series.forceDL || T && !R || z || Sl(v.inside, !!this.options.stacking) && b && E.isInsidePlot(w, M ? b.x + 1 : b.y + b.height - 1, { inverted: M, paneCoordinates: !0, series: this })), H = y.pos();
          if (Y && H) {
            var j;
            let tt = g.getBBox(), it = g.getBBox(void 0, 0);
            if (b = rs({ x: H[0], y: Math.round(H[1]), width: 0, height: 0 }, b || {}), v.alignTo === "plotEdges" && this.isCartesian && (b[M ? "x" : "y"] = 0, b[M ? "width" : "height"] = ((W = this.yAxis) == null ? void 0 : W.len) || 0), rs(v, { width: tt.width, height: tt.height }), j = b, T && this.xAxis && !R && this.setDataLabelStartPos(y, g, S, z, j), g.align(sa(v, { width: it.width, height: it.height }), !1, b, !1), g.alignAttr.x += lh(v.align) * (it.width - tt.width), g.alignAttr.y += lh(v.verticalAlign) * (it.height - tt.height), g[g.placed ? "animate" : "attr"]({ "text-align": g.alignAttr["text-align"] || "center", x: g.alignAttr.x + (tt.width - it.width) / 2, y: g.alignAttr.y + (tt.height - it.height) / 2, rotationOriginX: (g.width || 0) / 2, rotationOriginY: (g.height || 0) / 2 }), R && b.height >= 0) this.justifyDataLabel(g, v, g.alignAttr, tt, b, S);
            else if (Sl(v.crop, !0)) {
              let { x: J, y: rt } = g.alignAttr;
              Y = E.isInsidePlot(J, rt, { paneCoordinates: !0, series: this }) && E.isInsidePlot(J + tt.width - 1, rt + tt.height - 1, { paneCoordinates: !0, series: this });
            }
            v.shape && !B && g[S ? "attr" : "animate"]({ anchorX: H[0], anchorY: H[1] });
          }
          S && T && (g.placed = !1), Y || T && !R ? (g.show(), g.placed = !0) : (g.hide(), g.placed = !1);
        }
        function l() {
          return this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", this.options.dataLabels.zIndex || 6);
        }
        function n(y) {
          let g = this.hasRendered || 0, v = this.initDataLabelsGroup().attr({ opacity: +g });
          return !g && v && (this.visible && v.show(), this.options.animation ? v.animate({ opacity: 1 }, y) : v.attr({ opacity: 1 })), v;
        }
        function o(y) {
          var Y;
          let g;
          y = y || this.points;
          let v = this, b = v.chart, S = v.options, E = b.renderer, { backgroundColor: T, plotBackgroundColor: M } = b.options.chart, w = E.getContrast(ye(M) && M || ye(T) && T || "#000000"), C = c(v), { animation: B, defer: z } = C[0], R = z ? Kt(b, B, v) : { defer: 0, duration: 0 };
          Gs(this, "drawDataLabels"), (Y = v.hasDataLabels) != null && Y.call(v) && (g = this.initDataLabels(R), y.forEach((H) => {
            var it, J, rt;
            let j = H.dataLabels || [], W = H.color || v.color;
            Ml(u(C, H.dlOptions || ((it = H.options) == null ? void 0 : it.dataLabels))).forEach((nt, Ct) => {
              var de;
              let ht = nt.enabled && (H.visible || H.dataLabelOnHidden) && (!H.isNull || H.dataLabelOnNull) && function(Pe, Ci) {
                let ji = Ci.filter;
                if (ji) {
                  let na = ji.operator, yi = Pe[ji.property], Ue = ji.value;
                  return na === ">" && yi > Ue || na === "<" && yi < Ue || na === ">=" && yi >= Ue || na === "<=" && yi <= Ue || na === "==" && yi == Ue || na === "===" && yi === Ue || na === "!=" && yi != Ue || na === "!==" && yi !== Ue || !1;
                }
                return !0;
              }(H, nt), { backgroundColor: wt, borderColor: Yt, distance: kt, style: jt = {} } = nt, $e, Pt, Vt, Tt = {}, At = j[Ct], Me = !At, qt;
              ht && (Pt = Ve($e = Sl(nt[H.formatPrefix + "Format"], nt.format)) ? he($e, H, b) : (nt[H.formatPrefix + "Formatter"] || nt.formatter).call(H, nt), Vt = nt.rotation, !b.styledMode && (jt.color = Sl(nt.color, jt.color, ye(v.color) ? v.color : void 0, "#000000"), jt.color === "contrast" ? (wt !== "none" && (qt = wt), H.contrastColor = E.getContrast(qt !== "auto" && ye(qt) && qt || (ye(W) ? W : "")), jt.color = qt || !Ve(kt) && nt.inside || 0 > la(kt || 0) || S.stacking ? H.contrastColor : w) : delete H.contrastColor, S.cursor && (jt.cursor = S.cursor)), Tt = { r: nt.borderRadius || 0, rotation: Vt, padding: nt.padding, zIndex: 1 }, b.styledMode || (Tt.fill = wt === "auto" ? H.color : wt, Tt.stroke = Yt === "auto" ? H.color : Yt, Tt["stroke-width"] = nt.borderWidth), xl(Tt, (Pe, Ci) => {
                Pe === void 0 && delete Tt[Ci];
              })), !At || ht && Ve(Pt) && !!(At.div || (de = At.text) != null && de.foreignObject) == !!nt.useHTML && (At.rotation && nt.rotation || At.rotation === nt.rotation) || (At = void 0, Me = !0), ht && Ve(Pt) && (At ? Tt.text = Pt : (At = E.label(Pt, 0, 0, nt.shape, void 0, void 0, nt.useHTML, void 0, "data-label")).addClass(" highcharts-data-label-color-" + H.colorIndex + " " + (nt.className || "") + (nt.useHTML ? " highcharts-tracker" : "")), At && (At.options = nt, At.attr(Tt), b.styledMode ? jt.width && At.css({ width: jt.width, textOverflow: jt.textOverflow, whiteSpace: jt.whiteSpace }) : At.css(jt).shadow(nt.shadow), Gs(At, "beforeAddingDataLabel", { labelOptions: nt, point: H }), At.added || At.add(g), v.alignDataLabel(H, At, nt, void 0, Me), At.isActive = !0, j[Ct] && j[Ct] !== At && j[Ct].destroy(), j[Ct] = At));
            });
            let tt = j.length;
            for (; tt--; ) (J = j[tt]) != null && J.isActive ? j[tt].isActive = !1 : ((rt = j[tt]) == null || rt.destroy(), j.splice(tt, 1));
            H.dataLabel = j[0], H.dataLabels = j;
          })), Gs(this, "afterDrawDataLabels");
        }
        function h(y, g, v, b, S, E) {
          let T = this.chart, M = g.align, w = g.verticalAlign, C = y.box ? 0 : y.padding || 0, B = T.inverted ? this.yAxis : this.xAxis, z = B ? B.left - T.plotLeft : 0, R = T.inverted ? this.xAxis : this.yAxis, Y = R ? R.top - T.plotTop : 0, { x: H = 0, y: j = 0 } = g, W, tt;
          return (W = (v.x || 0) + C + z) < 0 && (M === "right" && H >= 0 ? (g.align = "left", g.inside = !0) : H -= W, tt = !0), (W = (v.x || 0) + b.width - C + z) > T.plotWidth && (M === "left" && H <= 0 ? (g.align = "right", g.inside = !0) : H += T.plotWidth - W, tt = !0), (W = v.y + C + Y) < 0 && (w === "bottom" && j >= 0 ? (g.verticalAlign = "top", g.inside = !0) : j -= W, tt = !0), (W = (v.y || 0) + b.height - C + Y) > T.plotHeight && (w === "top" && j <= 0 ? (g.verticalAlign = "bottom", g.inside = !0) : j += T.plotHeight - W, tt = !0), tt && (g.x = H, g.y = j, y.placed = !E, y.align(g, void 0, S)), tt;
        }
        function u(y, g) {
          let v = [], b;
          if (ui(y) && !ui(g)) v = y.map(function(S) {
            return sa(S, g);
          });
          else if (ui(g) && !ui(y)) v = g.map(function(S) {
            return sa(y, S);
          });
          else if (ui(y) || ui(g)) {
            if (ui(y) && ui(g)) for (b = Math.max(y.length, g.length); b--; ) v[b] = sa(y[b], g[b]);
          } else v = sa(y, g);
          return v;
        }
        function c(y) {
          var v, b;
          let g = y.chart.options.plotOptions;
          return Ml(u(u((v = g == null ? void 0 : g.series) == null ? void 0 : v.dataLabels, (b = g == null ? void 0 : g[y.type]) == null ? void 0 : b.dataLabels), y.options.dataLabels));
        }
        function f(y, g, v, b, S) {
          let E = this.chart, T = E.inverted, M = this.xAxis, w = M.reversed, C = ((T ? g.height : g.width) || 0) / 2, B = y.pointWidth, z = B ? B / 2 : 0;
          g.startXPos = T ? S.x : w ? -C - z : M.width - C + z, g.startYPos = T ? w ? this.yAxis.height - C + z : -C - z : S.y, b ? g.visibility === "hidden" && (g.show(), g.attr({ opacity: 0 }).animate({ opacity: 1 })) : g.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, g.hide), E.hasRendered && (v && g.attr({ x: g.startXPos, y: g.startYPos }), g.placed = !0);
        }
        p.compose = function(y) {
          let g = y.prototype;
          g.initDataLabels || (g.initDataLabels = n, g.initDataLabelsGroup = l, g.alignDataLabel = a, g.drawDataLabels = o, g.justifyDataLabel = h, g.mergeArrays = u, g.setDataLabelStartPos = f, g.hasDataLabels = e);
        };
      })(xt || (xt = {}));
      let Ys = xt, { composed: wi } = Z, { series: nh } = Ee, { merge: lc, pushUnique: rh } = Mt;
      (function(p) {
        function e(a, l, n, o, h) {
          var E, T;
          let { chart: u, options: c } = this, f = u.inverted, y = ((E = this.xAxis) == null ? void 0 : E.len) || u.plotSizeX || 0, g = ((T = this.yAxis) == null ? void 0 : T.len) || u.plotSizeY || 0, v = a.dlBox || a.shapeArgs, b = a.below ?? (a.plotY || 0) > (this.translatedThreshold ?? g), S = n.inside ?? !!c.stacking;
          if (v) {
            if (o = lc(v), n.overflow !== "allow" || n.crop !== !1 || c.clip !== !1) {
              o.y < 0 && (o.height += o.y, o.y = 0);
              let M = o.y + o.height - g;
              M > 0 && M < o.height - 1 && (o.height -= M);
            }
            f && (o = { x: g - o.y - o.height, y: y - o.x - o.width, width: o.height, height: o.width }), S || (f ? (o.x += b ? 0 : o.width, o.width = 0) : (o.y += b ? o.height : 0, o.height = 0));
          }
          n.align ?? (n.align = !f || S ? "center" : b ? "right" : "left"), n.verticalAlign ?? (n.verticalAlign = f || S ? "middle" : b ? "top" : "bottom"), nh.prototype.alignDataLabel.call(this, a, l, n, o, h), n.inside && a.contrastColor && l.css({ color: a.contrastColor });
        }
        p.compose = function(a) {
          Ys.compose(nh), rh(wi, "ColumnDataLabel") && (a.prototype.alignDataLabel = e);
        };
      })(Xt || (Xt = {}));
      let oh = Xt, { extend: js, merge: ii } = Mt;
      class Ha extends Gt {
      }
      Ha.defaultOptions = ii(Gt.defaultOptions, {}), js(Ha.prototype, { inverted: !0 }), Ee.registerSeriesType("bar", Ha);
      let { column: pn, line: Tl } = Ee.seriesTypes, { addEvent: nc, extend: rc, merge: cf } = Mt;
      class Ps extends Tl {
        applyJitter() {
          let e = this, a = this.options.jitter, l = this.points.length;
          a && this.points.forEach(function(n, o) {
            ["x", "y"].forEach(function(h, u) {
              if (a[h] && !n.isNull) {
                let c = `plot${h.toUpperCase()}`, f = e[`${h}Axis`], y = a[h] * f.transA;
                if (f && !f.logarithmic) {
                  let g = Math.max(0, (n[c] || 0) - y), v = Math.min(f.len, (n[c] || 0) + y);
                  n[c] = g + (v - g) * function(b) {
                    let S = 1e4 * Math.sin(b);
                    return S - Math.floor(S);
                  }(o + u * l), h === "x" && (n.clientX = n.plotX);
                }
              }
            });
          });
        }
        drawGraph() {
          this.options.lineWidth ? super.drawGraph() : this.graph && (this.graph = this.graph.destroy());
        }
      }
      Ps.defaultOptions = cf(Tl.defaultOptions, { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 }, tooltip: { headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.8em"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } }), rc(Ps.prototype, { drawTracker: pn.prototype.drawTracker, sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"] }), nc(Ps, "afterTranslate", function() {
        this.applyJitter();
      }), Ee.registerSeriesType("scatter", Ps);
      let { deg2rad: hh } = Z, { fireEvent: Yi, isNumber: uh, pick: ci, relativeLength: df } = Mt;
      (function(p) {
        p.getCenter = function() {
          let e = this.options, a = this.chart, l = 2 * (e.slicedOffset || 0), n = a.plotWidth - 2 * l, o = a.plotHeight - 2 * l, h = e.center, u = Math.min(n, o), c = e.thickness, f, y = e.size, g = e.innerSize || 0, v, b;
          typeof y == "string" && (y = parseFloat(y)), typeof g == "string" && (g = parseFloat(g));
          let S = [ci(h == null ? void 0 : h[0], "50%"), ci(h == null ? void 0 : h[1], "50%"), ci(y && y < 0 ? void 0 : e.size, "100%"), ci(g && g < 0 ? void 0 : e.innerSize || 0, "0%")];
          for (!a.angular || this instanceof Mi || (S[3] = 0), v = 0; v < 4; ++v) b = S[v], f = v < 2 || v === 2 && /%$/.test(b), S[v] = df(b, [n, o, u, S[2]][v]) + (f ? l : 0);
          return S[3] > S[2] && (S[3] = S[2]), uh(c) && 2 * c < S[2] && c > 0 && (S[3] = S[2] - 2 * c), Yi(this, "afterGetCenter", { positions: S }), S;
        }, p.getStartAndEndRadians = function(e, a) {
          let l = uh(e) ? e : 0, n = uh(a) && a > l && a - l < 360 ? a : l + 360;
          return { start: hh * (l + -90), end: hh * (n + -90) };
        };
      })(st || (st = {}));
      let oc = st, { setAnimation: Hp } = We, { addEvent: os, defined: ch, extend: hc, isNumber: gn, pick: ff, relativeLength: pf } = Mt;
      class uc extends Nt {
        getConnectorPath(e) {
          let a = e.dataLabelPosition, l = e.options || {}, n = l.connectorShape, o = this.connectorShapes[n] || n;
          return a && o.call(this, { ...a.computed, alignment: a.alignment }, a.connectorPosition, l) || [];
        }
        getTranslate() {
          return this.sliced && this.slicedTranslation || { translateX: 0, translateY: 0 };
        }
        haloPath(e) {
          let a = this.shapeArgs;
          return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(a.x, a.y, a.r + e, a.r + e, { innerR: a.r - 1, start: a.start, end: a.end, borderRadius: a.borderRadius });
        }
        constructor(e, a, l) {
          super(e, a, l), this.half = 0, this.name ?? (this.name = e.chart.options.lang.pieSliceName);
          let n = (o) => {
            this.slice(o.type === "select");
          };
          os(this, "select", n), os(this, "unselect", n);
        }
        isValid() {
          return gn(this.y) && this.y >= 0;
        }
        setVisible(e, a = !0) {
          e !== this.visible && this.update({ visible: e ?? !this.visible }, a, void 0, !1);
        }
        slice(e, a, l) {
          let n = this.series;
          Hp(l, n.chart), a = ff(a, !0), this.sliced = this.options.sliced = e = ch(e) ? e : !this.sliced, n.options.data[n.data.indexOf(this)] = this.options, this.graphic && this.graphic.animate(this.getTranslate());
        }
      }
      hc(uc.prototype, { connectorShapes: { fixedOffset: function(p, e, a) {
        let l = e.breakAt, n = e.touchingSliceAt, o = a.softConnector ? ["C", p.x + (p.alignment === "left" ? -5 : 5), p.y, 2 * l.x - n.x, 2 * l.y - n.y, l.x, l.y] : ["L", l.x, l.y];
        return [["M", p.x, p.y], o, ["L", n.x, n.y]];
      }, straight: function(p, e) {
        let a = e.touchingSliceAt;
        return [["M", p.x, p.y], ["L", a.x, a.y]];
      }, crookedLine: function(p, e, a) {
        let { angle: l = this.angle || 0, breakAt: n, touchingSliceAt: o } = e, { series: h } = this, [u, c, f] = h.center, y = f / 2, { plotLeft: g, plotWidth: v } = h.chart, b = p.alignment === "left", { x: S, y: E } = p, T = n.x;
        if (a.crookDistance) {
          let w = pf(a.crookDistance, 1);
          T = b ? u + y + (v + g - u - y) * (1 - w) : g + (u - y) * w;
        } else T = u + (c - E) * Math.tan(l - Math.PI / 2);
        let M = [["M", S, E]];
        return (b ? T <= S && T >= n.x : T >= S && T <= n.x) && M.push(["L", T, E]), M.push(["L", n.x, n.y], ["L", o.x, o.y]), M;
      } } });
      let { getStartAndEndRadians: cc } = oc, { noop: dh } = Z, { clamp: Up, extend: Xp, fireEvent: gf, merge: fh, pick: mf } = Mt;
      class qs extends Mi {
        animate(e) {
          let a = this, l = a.points, n = a.startAngleRad;
          e || l.forEach(function(o) {
            let h = o.graphic, u = o.shapeArgs;
            h && u && (h.attr({ r: mf(o.startR, a.center && a.center[3] / 2), start: n, end: n }), h.animate({ r: u.r, start: u.start, end: u.end }, a.options.animation));
          });
        }
        drawEmpty() {
          let e, a, l = this.startAngleRad, n = this.endAngleRad, o = this.options;
          this.total === 0 && this.center ? (e = this.center[0], a = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(e, a, this.center[1] / 2, 0, l, n).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({ d: Kh.arc(e, a, this.center[2] / 2, 0, { start: l, end: n, innerR: this.center[3] / 2 }) }), this.chart.styledMode || this.graph.attr({ "stroke-width": o.borderWidth, fill: o.fillColor || "none", stroke: o.color || "#cccccc" })) : this.graph && (this.graph = this.graph.destroy());
        }
        drawPoints() {
          let e = this.chart.renderer;
          this.points.forEach(function(a) {
            a.graphic && a.hasNewShapeType() && (a.graphic = a.graphic.destroy()), a.graphic || (a.graphic = e[a.shapeType](a.shapeArgs).add(a.series.group), a.delayedRendering = !0);
          });
        }
        generatePoints() {
          super.generatePoints(), this.updateTotals();
        }
        getX(e, a, l, n) {
          let o = this.center, h = this.radii ? this.radii[l.index] || 0 : o[2] / 2, u = n.dataLabelPosition, c = (u == null ? void 0 : u.distance) || 0, f = Math.asin(Up((e - o[1]) / (h + c), -1, 1));
          return o[0] + Math.cos(f) * (h + c) * (a ? -1 : 1) + (c > 0 ? (a ? -1 : 1) * (n.padding || 0) : 0);
        }
        hasData() {
          return !!this.dataTable.rowCount;
        }
        redrawPoints() {
          let e, a, l, n, o = this, h = o.chart;
          this.drawEmpty(), o.group && !h.styledMode && o.group.shadow(o.options.shadow), o.points.forEach(function(u) {
            let c = {};
            a = u.graphic, !u.isNull && a ? (n = u.shapeArgs, e = u.getTranslate(), h.styledMode || (l = o.pointAttribs(u, u.selected && "select")), u.delayedRendering ? (a.setRadialReference(o.center).attr(n).attr(e), h.styledMode || a.attr(l).attr({ "stroke-linejoin": "round" }), u.delayedRendering = !1) : (a.setRadialReference(o.center), h.styledMode || fh(!0, c, l), fh(!0, c, n, e), a.animate(c)), a.attr({ visibility: u.visible ? "inherit" : "hidden" }), a.addClass(u.getClassName(), !0)) : a && (u.graphic = a.destroy());
          });
        }
        sortByAngle(e, a) {
          e.sort(function(l, n) {
            return l.angle !== void 0 && (n.angle - l.angle) * a;
          });
        }
        translate(e) {
          gf(this, "translate"), this.generatePoints();
          let a = this.options, l = a.slicedOffset, n = cc(a.startAngle, a.endAngle), o = this.startAngleRad = n.start, h = (this.endAngleRad = n.end) - o, u = this.points, c = a.ignoreHiddenPoint, f = u.length, y, g, v, b, S, E, T, M = 0;
          for (e || (this.center = e = this.getCenter()), E = 0; E < f; E++) {
            T = u[E], y = o + M * h, T.isValid() && (!c || T.visible) && (M += T.percentage / 100), g = o + M * h;
            let w = { x: e[0], y: e[1], r: e[2] / 2, innerR: e[3] / 2, start: Math.round(1e3 * y) / 1e3, end: Math.round(1e3 * g) / 1e3 };
            T.shapeType = "arc", T.shapeArgs = w, (v = (g + y) / 2) > 1.5 * Math.PI ? v -= 2 * Math.PI : v < -Math.PI / 2 && (v += 2 * Math.PI), T.slicedTranslation = { translateX: Math.round(Math.cos(v) * l), translateY: Math.round(Math.sin(v) * l) }, b = Math.cos(v) * e[2] / 2, S = Math.sin(v) * e[2] / 2, T.tooltipPos = [e[0] + 0.7 * b, e[1] + 0.7 * S], T.half = +(v < -Math.PI / 2 || v > Math.PI / 2), T.angle = v;
          }
          gf(this, "afterTranslate");
        }
        updateTotals() {
          let e = this.points, a = e.length, l = this.options.ignoreHiddenPoint, n, o, h = 0;
          for (n = 0; n < a; n++) (o = e[n]).isValid() && (!l || o.visible) && (h += o.y);
          for (n = 0, this.total = h; n < a; n++) (o = e[n]).percentage = h > 0 && (o.visible || !l) ? o.y / h * 100 : 0, o.total = h;
        }
      }
      qs.defaultOptions = fh(Mi.defaultOptions, { borderRadius: 3, center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { connectorPadding: 5, connectorShape: "crookedLine", crookDistance: void 0, distance: 30, enabled: !0, formatter: function() {
        return this.isNull ? void 0 : this.name;
      }, softConnector: !0, x: 0 }, fillColor: void 0, ignoreHiddenPoint: !0, inactiveOtherPoints: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: 0.1 } } }), Xp(qs.prototype, { axisTypes: [], directTouch: !0, drawGraph: void 0, drawTracker: Gt.prototype.drawTracker, getCenter: oc.getCenter, getSymbol: dh, invertible: !1, isCartesian: !1, noSharedTooltip: !0, pointAttribs: Gt.prototype.pointAttribs, pointClass: uc, requireSorting: !1, searchPoint: dh, trackerGroups: ["group", "dataLabelsGroup"] }), Ee.registerSeriesType("pie", qs);
      let { composed: ph, noop: yf } = Z, { distribute: vf } = lo, { series: dc } = Ee, { arrayMax: bf, clamp: fc, defined: pc, pick: gh, pushUnique: xf, relativeLength: gc } = Mt;
      (function(p) {
        let e = { radialDistributionY: function(h, u) {
          var c;
          return (((c = u.dataLabelPosition) == null ? void 0 : c.top) || 0) + h.distributeBox.pos;
        }, radialDistributionX: function(h, u, c, f, y) {
          let g = y.dataLabelPosition;
          return h.getX(c < ((g == null ? void 0 : g.top) || 0) + 2 || c > ((g == null ? void 0 : g.bottom) || 0) - 2 ? f : c, u.half, u, y);
        }, justify: function(h, u, c, f) {
          var y;
          return f[0] + (h.half ? -1 : 1) * (c + (((y = u.dataLabelPosition) == null ? void 0 : y.distance) || 0));
        }, alignToPlotEdges: function(h, u, c, f) {
          let y = h.getBBox().width;
          return u ? y + f : c - y - f;
        }, alignToConnectors: function(h, u, c, f) {
          let y = 0, g;
          return h.forEach(function(v) {
            (g = v.dataLabel.getBBox().width) > y && (y = g);
          }), u ? y + f : c - y - f;
        } };
        function a(h, u) {
          let c = Math.PI / 2, { start: f = 0, end: y = 0 } = h.shapeArgs || {}, g = h.angle || 0;
          u > 0 && f < c && y > c && g > c / 2 && g < 1.5 * c && (g = g <= c ? Math.max(c / 2, (f + c) / 2) : Math.min(1.5 * c, (c + y) / 2));
          let { center: v, options: b } = this, S = v[2] / 2, E = Math.cos(g), T = Math.sin(g), M = v[0] + E * S, w = v[1] + T * S, C = Math.min((b.slicedOffset || 0) + (b.borderWidth || 0), u / 5);
          return { natural: { x: M + E * u, y: w + T * u }, computed: {}, alignment: u < 0 ? "center" : h.half ? "right" : "left", connectorPosition: { angle: g, breakAt: { x: M + E * C, y: w + T * C }, touchingSliceAt: { x: M, y: w } }, distance: u };
        }
        function l() {
          var Y;
          let h = this, u = h.points, c = h.chart, f = c.plotWidth, y = c.plotHeight, g = c.plotLeft, v = Math.round(c.chartWidth / 3), b = h.center, S = b[2] / 2, E = b[1], T = [[], []], M = [0, 0, 0, 0], w = h.dataLabelPositioners, C, B, z, R = 0;
          h.visible && ((Y = h.hasDataLabels) != null && Y.call(h)) && (u.forEach((H) => {
            (H.dataLabels || []).forEach((j) => {
              j.shortened && (j.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), j.shortened = !1);
            });
          }), dc.prototype.drawDataLabels.apply(h), u.forEach((H) => {
            (H.dataLabels || []).forEach((j, W) => {
              var rt;
              let tt = b[2] / 2, it = j.options, J = gc((it == null ? void 0 : it.distance) || 0, tt);
              W === 0 && T[H.half].push(H), !pc((rt = it == null ? void 0 : it.style) == null ? void 0 : rt.width) && j.getBBox().width > v && (j.css({ width: Math.round(0.7 * v) + "px" }), j.shortened = !0), j.dataLabelPosition = this.getDataLabelPosition(H, J), R = Math.max(R, J);
            });
          }), T.forEach((H, j) => {
            let W = H.length, tt = [], it, J, rt = 0, nt;
            W && (h.sortByAngle(H, j - 0.5), R > 0 && (it = Math.max(0, E - S - R), J = Math.min(E + S + R, c.plotHeight), H.forEach((Ct) => {
              (Ct.dataLabels || []).forEach((ht) => {
                var Yt;
                let wt = ht.dataLabelPosition;
                wt && wt.distance > 0 && (wt.top = Math.max(0, E - S - wt.distance), wt.bottom = Math.min(E + S + wt.distance, c.plotHeight), rt = ht.getBBox().height || 21, ht.lineHeight = c.renderer.fontMetrics(ht.text || ht).h + 2 * ht.padding, Ct.distributeBox = { target: (((Yt = ht.dataLabelPosition) == null ? void 0 : Yt.natural.y) || 0) - wt.top + ht.lineHeight / 2, size: rt, rank: Ct.y }, tt.push(Ct.distributeBox));
              });
            }), vf(tt, nt = J + rt - it, nt / 5)), H.forEach((Ct) => {
              (Ct.dataLabels || []).forEach((ht) => {
                let wt = ht.options || {}, Yt = Ct.distributeBox, kt = ht.dataLabelPosition, jt = (kt == null ? void 0 : kt.natural.y) || 0, $e = wt.connectorPadding || 0, Pt = ht.lineHeight || 21, Vt = (Pt - ht.getBBox().height) / 2, Tt = 0, At = jt, Me = "inherit";
                if (kt) {
                  if (tt && pc(Yt) && kt.distance > 0 && (Yt.pos === void 0 ? Me = "hidden" : (z = Yt.size, At = w.radialDistributionY(Ct, ht))), wt.justify) Tt = w.justify(Ct, ht, S, b);
                  else switch (wt.alignTo) {
                    case "connectors":
                      Tt = w.alignToConnectors(H, j, f, g);
                      break;
                    case "plotEdges":
                      Tt = w.alignToPlotEdges(ht, j, f, g);
                      break;
                    default:
                      Tt = w.radialDistributionX(h, Ct, At - Vt, jt, ht);
                  }
                  if (kt.attribs = { visibility: Me, align: kt.alignment }, kt.posAttribs = { x: Tt + (wt.x || 0) + ({ left: $e, right: -$e }[kt.alignment] || 0), y: At + (wt.y || 0) - Pt / 2 }, kt.computed.x = Tt, kt.computed.y = At - Vt, gh(wt.crop, !0)) {
                    let qt;
                    Tt - (B = ht.getBBox().width) < $e && j === 1 ? (qt = Math.round(B - Tt + $e), M[3] = Math.max(qt, M[3])) : Tt + B > f - $e && j === 0 && (qt = Math.round(Tt + B - f + $e), M[1] = Math.max(qt, M[1])), At - z / 2 < 0 ? M[0] = Math.max(Math.round(-At + z / 2), M[0]) : At + z / 2 > y && (M[2] = Math.max(Math.round(At + z / 2 - y), M[2])), kt.sideOverflow = qt;
                  }
                }
              });
            }));
          }), (bf(M) === 0 || this.verifyDataLabelOverflow(M)) && (this.placeDataLabels(), this.points.forEach((H) => {
            (H.dataLabels || []).forEach((j) => {
              var J;
              let { connectorColor: W, connectorWidth: tt = 1 } = j.options || {}, it = j.dataLabelPosition;
              if (tt) {
                let rt;
                C = j.connector, it && it.distance > 0 ? (rt = !C, C || (j.connector = C = c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + H.colorIndex + (H.className ? " " + H.className : "")).add(h.dataLabelsGroup)), c.styledMode || C.attr({ "stroke-width": tt, stroke: W || H.color || "#666666" }), C[rt ? "attr" : "animate"]({ d: H.getConnectorPath(j) }), C.attr({ visibility: (J = it.attribs) == null ? void 0 : J.visibility })) : C && (j.connector = C.destroy());
              }
            });
          })));
        }
        function n() {
          this.points.forEach((h) => {
            (h.dataLabels || []).forEach((u) => {
              var f, y;
              let c = u.dataLabelPosition;
              c ? (c.sideOverflow && (u.css({ width: Math.max(u.getBBox().width - c.sideOverflow, 0) + "px", textOverflow: ((y = (f = u.options) == null ? void 0 : f.style) == null ? void 0 : y.textOverflow) || "ellipsis" }), u.shortened = !0), u.attr(c.attribs), u[u.moved ? "animate" : "attr"](c.posAttribs), u.moved = !0) : u && u.attr({ y: -9999 });
            }), delete h.distributeBox;
          }, this);
        }
        function o(h) {
          let u = this.center, c = this.options, f = c.center, y = c.minSize || 80, g = y, v = c.size !== null;
          return !v && (f[0] !== null ? g = Math.max(u[2] - Math.max(h[1], h[3]), y) : (g = Math.max(u[2] - h[1] - h[3], y), u[0] += (h[3] - h[1]) / 2), f[1] !== null ? g = fc(g, y, u[2] - Math.max(h[0], h[2])) : (g = fc(g, y, u[2] - h[0] - h[2]), u[1] += (h[0] - h[2]) / 2), g < u[2] ? (u[2] = g, u[3] = Math.min(c.thickness ? Math.max(0, g - 2 * c.thickness) : Math.max(0, gc(c.innerSize || 0, g)), g), this.translate(u), this.drawDataLabels && this.drawDataLabels()) : v = !0), v;
        }
        p.compose = function(h) {
          if (Ys.compose(dc), xf(ph, "PieDataLabel")) {
            let u = h.prototype;
            u.dataLabelPositioners = e, u.alignDataLabel = yf, u.drawDataLabels = l, u.getDataLabelPosition = a, u.placeDataLabels = n, u.verifyDataLabelOverflow = o;
          }
        };
      })(mt || (mt = {}));
      let me = mt;
      (function(p) {
        p.getCenterOfPoints = function(e) {
          let a = e.reduce((l, n) => (l.x += n.x, l.y += n.y, l), { x: 0, y: 0 });
          return { x: a.x / e.length, y: a.y / e.length };
        }, p.getDistanceBetweenPoints = function(e, a) {
          return Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
        }, p.getAngleBetweenPoints = function(e, a) {
          return Math.atan2(a.x - e.x, a.y - e.y);
        }, p.pointInPolygon = function({ x: e, y: a }, l) {
          let n = l.length, o, h, u = !1;
          for (o = 0, h = n - 1; o < n; h = o++) {
            let [c, f] = l[o], [y, g] = l[h];
            f > a != g > a && e < (y - c) * (a - f) / (g - f) + c && (u = !u);
          }
          return u;
        };
      })(Lt || (Lt = {}));
      let { pointInPolygon: mc } = Lt, { addEvent: Gp, getAlignFactor: Sf, fireEvent: Mf, objectEach: Tf, pick: Yp } = Mt;
      function mh(p) {
        let e = p.length, a = (y, g) => !(g.x >= y.x + y.width || g.x + g.width <= y.x || g.y >= y.y + y.height || g.y + g.height <= y.y), l = (y, g) => {
          for (let v of y) if (mc({ x: v[0], y: v[1] }, g)) return !0;
          return !1;
        }, n, o, h, u, c, f = !1;
        for (let y = 0; y < e; y++) (n = p[y]) && (n.oldOpacity = n.opacity, n.newOpacity = 1, n.absoluteBox = function(g) {
          var v, b;
          if (g && (!g.alignAttr || g.placed)) {
            let S = g.box ? 0 : g.padding || 0, E = g.alignAttr || { x: g.attr("x"), y: g.attr("y") }, { height: T, polygon: M, width: w } = g.getBBox(), C = Sf(g.alignValue) * w;
            return g.width = w, g.height = T, { x: E.x + (((v = g.parentGroup) == null ? void 0 : v.translateX) || 0) + S - C, y: E.y + (((b = g.parentGroup) == null ? void 0 : b.translateY) || 0) + S, width: w - 2 * S, height: T - 2 * S, polygon: M };
          }
        }(n));
        p.sort((y, g) => (g.labelrank || 0) - (y.labelrank || 0));
        for (let y = 0; y < e; ++y) {
          u = (o = p[y]) && o.absoluteBox;
          let g = u == null ? void 0 : u.polygon;
          for (let v = y + 1; v < e; ++v) {
            c = (h = p[v]) && h.absoluteBox;
            let b = !1;
            if (u && c && o !== h && o.newOpacity !== 0 && h.newOpacity !== 0 && o.visibility !== "hidden" && h.visibility !== "hidden") {
              let S = c.polygon;
              if (g && S && g !== S ? l(g, S) && (b = !0) : a(u, c) && (b = !0), b) {
                let E = o.labelrank < h.labelrank ? o : h, T = E.text;
                E.newOpacity = 0, T != null && T.element.querySelector("textPath") && T.hide();
              }
            }
          }
        }
        for (let y of p) Al(y, this) && (f = !0);
        f && Mf(this, "afterHideAllOverlappingLabels");
      }
      function Al(p, e) {
        let a, l = !1;
        return p && (a = p.newOpacity, p.oldOpacity !== a && (p.hasClass("highcharts-data-label") ? (p[a ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), l = !0, p[p.isOld ? "animate" : "attr"]({ opacity: a }, void 0, function() {
          e.styledMode || p.css({ pointerEvents: a ? "auto" : "none" });
        }), Mf(e, "afterHideOverlappingLabel")) : p.attr({ opacity: a })), p.isOld = !0), l;
      }
      function yc() {
        var a;
        let p = this, e = [];
        for (let l of p.labelCollectors || []) e = e.concat(l());
        for (let l of p.yAxis || []) l.stacking && l.options.stackLabels && !l.options.stackLabels.allowOverlap && Tf(l.stacking.stacks, (n) => {
          Tf(n, (o) => {
            o.label && e.push(o.label);
          });
        });
        for (let l of p.series || []) if (l.visible && ((a = l.hasDataLabels) != null && a.call(l))) {
          let n = (o) => {
            for (let h of o) h.visible && (h.dataLabels || []).forEach((u) => {
              var f;
              let c = u.options || {};
              u.labelrank = Yp(c.labelrank, h.labelrank, (f = h.shapeArgs) == null ? void 0 : f.height), c.allowOverlap ?? Number(c.distance) > 0 ? (u.oldOpacity = u.opacity, u.newOpacity = 1, Al(u, p)) : e.push(u);
            });
          };
          n(l.nodes || []), n(l.points);
        }
        this.hideOverlappingLabels(e);
      }
      let Lr = { compose: function(p) {
        let e = p.prototype;
        e.hideOverlappingLabels || (e.hideOverlappingLabels = mh, Gp(p, "render", yc));
      } }, { defaultOptions: vc } = zi, { noop: _s } = Z, { addEvent: va, extend: zr, isObject: Af, merge: Of, relativeLength: yh } = Mt, Ef = { radius: 0, scope: "stack", where: void 0 }, bc = _s, wf = _s;
      function xc(p, e, a, l, n = {}) {
        let o = bc(p, e, a, l, n), { innerR: h = 0, r: u = a, start: c = 0, end: f = 0 } = n;
        if (n.open || !n.borderRadius) return o;
        let y = f - c, g = Math.sin(y / 2), v = Math.max(Math.min(yh(n.borderRadius || 0, u - h), (u - h) / 2, u * g / (1 + g)), 0), b = Math.min(v, y / Math.PI * 2 * h), S = o.length - 1;
        for (; S--; ) (function(E, T, M) {
          let w, C, B, z = E[T], R = E[T + 1];
          if (R[0] === "Z" && (R = E[0]), (z[0] === "M" || z[0] === "L") && R[0] === "A" ? (w = z, C = R, B = !0) : z[0] === "A" && (R[0] === "M" || R[0] === "L") && (w = R, C = z), w && C && C.params) {
            let Y = C[1], H = C[5], j = C.params, { start: W, end: tt, cx: it, cy: J } = j, rt = H ? Y - M : Y + M, nt = rt ? Math.asin(M / rt) : 0, Ct = H ? nt : -nt, ht = Math.cos(nt) * rt;
            B ? (j.start = W + Ct, w[1] = it + ht * Math.cos(W), w[2] = J + ht * Math.sin(W), E.splice(T + 1, 0, ["A", M, M, 0, 0, 1, it + Y * Math.cos(j.start), J + Y * Math.sin(j.start)])) : (j.end = tt - Ct, C[6] = it + Y * Math.cos(j.end), C[7] = J + Y * Math.sin(j.end), E.splice(T + 1, 0, ["A", M, M, 0, 0, 1, it + ht * Math.cos(tt), J + ht * Math.sin(tt)])), C[4] = Math.abs(j.end - j.start) < Math.PI ? 0 : 1;
          }
        })(o, S, S > 1 ? b : v);
        return o;
      }
      function Cf() {
        var p, e;
        if (this.options.borderRadius && !(this.chart.is3d && this.chart.is3d())) {
          let { options: a, yAxis: l } = this, n = a.stacking === "percent", o = (e = (p = vc.plotOptions) == null ? void 0 : p[this.type]) == null ? void 0 : e.borderRadius, h = vh(a.borderRadius, Af(o) ? o : {}), u = l.options.reversed;
          for (let c of this.points) {
            let { shapeArgs: f } = c;
            if (c.shapeType === "roundedRect" && f) {
              let { width: y = 0, height: g = 0, y: v = 0 } = f, b = v, S = g;
              if (h.scope === "stack" && c.stackTotal) {
                let w = l.translate(n ? 100 : c.stackTotal, !1, !0, !1, !0), C = l.translate(a.threshold || 0, !1, !0, !1, !0), B = this.crispCol(0, Math.min(w, C), 0, Math.abs(w - C));
                b = B.y, S = B.height;
              }
              let E = (c.negative ? -1 : 1) * (u ? -1 : 1) == -1, T = h.where;
              !T && this.is("waterfall") && Math.abs((c.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (T = "all"), T || (T = "end");
              let M = Math.min(yh(h.radius, y), y / 2, T === "all" ? g / 2 : 1 / 0) || 0;
              T === "end" && (E && (b -= M), S += M), zr(f, { brBoxHeight: S, brBoxY: b, r: M });
            }
          }
        }
      }
      function vh(p, e) {
        return Af(p) || (p = { radius: p || 0 }), Of(Ef, e, p);
      }
      function jp() {
        let p = vh(this.options.borderRadius);
        for (let e of this.points) {
          let a = e.shapeArgs;
          a && (a.borderRadius = yh(p.radius, (a.r || 0) - (a.innerR || 0)));
        }
      }
      function Sc(p, e, a, l, n = {}) {
        let o = wf(p, e, a, l, n), { r: h = 0, brBoxHeight: u = l, brBoxY: c = e } = n, f = e - c, y = c + u - (e + l), g = f - h > -0.1 ? 0 : h, v = y - h > -0.1 ? 0 : h, b = Math.max(g && f, 0), S = Math.max(v && y, 0), E = [p + g, e], T = [p + a - g, e], M = [p + a, e + g], w = [p + a, e + l - v], C = [p + a - v, e + l], B = [p + v, e + l], z = [p, e + l - v], R = [p, e + g], Y = (H, j) => Math.sqrt(Math.pow(H, 2) - Math.pow(j, 2));
        if (b) {
          let H = Y(g, g - b);
          E[0] -= H, T[0] += H, M[1] = R[1] = e + g - b;
        }
        if (l < g - b) {
          let H = Y(g, g - b - l);
          M[0] = w[0] = p + a - g + H, C[0] = Math.min(M[0], C[0]), B[0] = Math.max(w[0], B[0]), z[0] = R[0] = p + g - H, M[1] = R[1] = e + l;
        }
        if (S) {
          let H = Y(v, v - S);
          C[0] += H, B[0] -= H, w[1] = z[1] = e + l - v + S;
        }
        if (l < v - S) {
          let H = Y(v, v - S - l);
          M[0] = w[0] = p + a - v + H, T[0] = Math.min(M[0], T[0]), E[0] = Math.max(w[0], E[0]), z[0] = R[0] = p + v - H, w[1] = z[1] = e;
        }
        return o.length = 0, o.push(["M", ...E], ["L", ...T], ["A", g, g, 0, 0, 1, ...M], ["L", ...w], ["A", v, v, 0, 0, 1, ...C], ["L", ...B], ["A", v, v, 0, 0, 1, ...z], ["L", ...R], ["A", g, g, 0, 0, 1, ...E], ["Z"]), o;
      }
      let { diffObjects: Mc, extend: Pp, find: qp, merge: Rr, pick: bh, uniqueKey: kf } = Mt;
      (function(p) {
        function e(l, n) {
          let o = l.condition;
          (o.callback || function() {
            return this.chartWidth <= bh(o.maxWidth, Number.MAX_VALUE) && this.chartHeight <= bh(o.maxHeight, Number.MAX_VALUE) && this.chartWidth >= bh(o.minWidth, 0) && this.chartHeight >= bh(o.minHeight, 0);
          }).call(this) && n.push(l._id);
        }
        function a(l, n) {
          let o = this.options.responsive, h = this.currentResponsive, u = [], c;
          !n && o && o.rules && o.rules.forEach((g) => {
            g._id === void 0 && (g._id = kf()), this.matchResponsiveRule(g, u);
          }, this);
          let f = Rr(...u.map((g) => qp((o == null ? void 0 : o.rules) || [], (v) => v._id === g)).map((g) => g == null ? void 0 : g.chartOptions));
          f.isResponsiveOptions = !0, u = u.toString() || void 0;
          let y = h == null ? void 0 : h.ruleIds;
          u === y || (h && (this.currentResponsive = void 0, this.updatingResponsive = !0, this.update(h.undoOptions, l, !0), this.updatingResponsive = !1), u ? ((c = Mc(f, this.options, !0, this.collectionsWithUpdate)).isResponsiveOptions = !0, this.currentResponsive = { ruleIds: u, mergedOptions: f, undoOptions: c }, this.updatingResponsive || this.update(f, l, !0)) : this.currentResponsive = void 0);
        }
        p.compose = function(l) {
          let n = l.prototype;
          return n.matchResponsiveRule || Pp(n, { matchResponsiveRule: e, setResponsive: a }), l;
        };
      })(_t || (_t = {}));
      let Qt = _t;
      Z.AST = ge, Z.Axis = ta, Z.Chart = ka, Z.Color = Oe, Z.DataLabel = Ys, Z.DataTableCore = ia, Z.Fx = ti, Z.HTMLElement = pa, Z.Legend = Xu, Z.LegendSymbol = Ou, Z.OverlappingDataLabels = Z.OverlappingDataLabels || Lr, Z.PlotLineOrBand = Mo, Z.Point = Nt, Z.Pointer = mi, Z.RendererRegistry = Sa, Z.Series = Mi, Z.SeriesRegistry = Ee, Z.StackItem = Ku, Z.SVGElement = Fi, Z.SVGRenderer = ri, Z.Templating = Ri, Z.Tick = Ia, Z.Time = Dl, Z.Tooltip = vu, Z.animate = We.animate, Z.animObject = We.animObject, Z.chart = ka.chart, Z.color = Oe.parse, Z.dateFormat = Ri.dateFormat, Z.defaultOptions = zi.defaultOptions, Z.distribute = lo.distribute, Z.format = Ri.format, Z.getDeferredAnimation = We.getDeferredAnimation, Z.getOptions = zi.getOptions, Z.numberFormat = Ri.numberFormat, Z.seriesType = Ee.seriesType, Z.setAnimation = We.setAnimation, Z.setOptions = zi.setOptions, Z.stop = We.stop, Z.time = zi.defaultTime, Z.timers = ti.timers, { compose: function(p, e, a) {
        let l = p.types.pie;
        if (!e.symbolCustomAttribs.includes("borderRadius")) {
          let n = a.prototype.symbols;
          va(p, "afterColumnTranslate", Cf, { order: 9 }), va(l, "afterTranslate", jp), e.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY"), bc = n.arc, wf = n.roundedRect, n.arc = xc, n.roundedRect = Sc;
        }
      }, optionsToObject: vh }.compose(Z.Series, Z.SVGElement, Z.SVGRenderer), oh.compose(Z.Series.types.column), Ys.compose(Z.Series), Sd.compose(Z.Axis), pa.compose(Z.SVGRenderer), Xu.compose(Z.Chart), sr.compose(Z.Axis), Lr.compose(Z.Chart), me.compose(Z.Series.types.pie), Mo.compose(Z.Chart, Z.Axis), mi.compose(Z.Chart), Qt.compose(Z.Chart), on.compose(Z.Axis, Z.Chart, Z.Series), of.compose(Z.Axis, Z.Chart, Z.Series), vu.compose(Z.Pointer), Mt.extend(Z, Mt);
      let Tc = Z;
      return _e.default;
    })());
  }(Zf)), Zf.exports;
}
var Iy = Fy();
const Jy = /* @__PURE__ */ gm(Iy);
var Vf = { exports: {} }, $y = Vf.exports, sm;
function t0() {
  return sm || (sm = 1, function(O, x) {
    (function(L, D) {
      O.exports = D(Kf);
    })(typeof self < "u" ? self : $y, function(L) {
      return function(D) {
        function Q(at) {
          if (et[at]) return et[at].exports;
          var lt = et[at] = { i: at, l: !1, exports: {} };
          return D[at].call(lt.exports, lt, lt.exports, Q), lt.l = !0, lt.exports;
        }
        var et = {};
        return Q.m = D, Q.c = et, Q.d = function(at, lt, ct) {
          Q.o(at, lt) || Object.defineProperty(at, lt, { configurable: !1, enumerable: !0, get: ct });
        }, Q.n = function(at) {
          var lt = at && at.__esModule ? function() {
            return at.default;
          } : function() {
            return at;
          };
          return Q.d(lt, "a", lt), lt;
        }, Q.o = function(at, lt) {
          return Object.prototype.hasOwnProperty.call(at, lt);
        }, Q.p = "", Q(Q.s = 0);
      }([function(D, Q, et) {
        function at() {
          return at = Object.assign ? Object.assign.bind() : function(st) {
            for (var mt = 1; mt < arguments.length; mt++) {
              var Lt = arguments[mt];
              for (var _t in Lt) Object.prototype.hasOwnProperty.call(Lt, _t) && (st[_t] = Lt[_t]);
            }
            return st;
          }, at.apply(this, arguments);
        }
        function lt(st) {
          return ot(st) || pt(st) || Ot(st) || ct();
        }
        function ct() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function Ot(st, mt) {
          if (st) {
            if (typeof st == "string") return yt(st, mt);
            var Lt = Object.prototype.toString.call(st).slice(8, -1);
            return Lt === "Object" && st.constructor && (Lt = st.constructor.name), Lt === "Map" || Lt === "Set" ? Array.from(st) : Lt === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Lt) ? yt(st, mt) : void 0;
          }
        }
        function pt(st) {
          if (typeof Symbol < "u" && st[Symbol.iterator] != null || st["@@iterator"] != null) return Array.from(st);
        }
        function ot(st) {
          if (Array.isArray(st)) return yt(st);
        }
        function yt(st, mt) {
          (mt == null || mt > st.length) && (mt = st.length);
          for (var Lt = 0, _t = new Array(mt); Lt < mt; Lt++) _t[Lt] = st[Lt];
          return _t;
        }
        function dt(st) {
          "@babel/helpers - typeof";
          return (dt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(mt) {
            return typeof mt;
          } : function(mt) {
            return mt && typeof Symbol == "function" && mt.constructor === Symbol && mt !== Symbol.prototype ? "symbol" : typeof mt;
          })(st);
        }
        Object.defineProperty(Q, "__esModule", { value: !0 }), et.d(Q, "HighchartsReact", function() {
          return Xt;
        });
        var ft = et(1), St = et.n(ft), xt = typeof window < "u" ? ft.useLayoutEffect : ft.useEffect, Xt = Object(ft.memo)(Object(ft.forwardRef)(function(st, mt) {
          var Lt = Object(ft.useRef)(), _t = Object(ft.useRef)(), te = Object(ft.useRef)(st.constructorType), _e = Object(ft.useRef)(st.highcharts);
          return xt(function() {
            function Z() {
              var ie = st.highcharts || (typeof window > "u" ? "undefined" : dt(window)) === "object" && window.Highcharts, Xe = st.constructorType || "chart";
              ie ? ie[Xe] ? st.options ? _t.current = ie[Xe](Lt.current, st.options, st.callback) : console.warn('The "options" property was not passed.') : console.warn('The "constructorType" property is incorrect or some required module is not imported.') : console.warn('The "highcharts" property was not passed.');
            }
            if (_t.current) {
              if (st.allowChartUpdate !== !1) if (st.constructorType !== te.current || st.highcharts !== _e.current) te.current = st.constructorType, _e.current = st.highcharts, Z();
              else if (!st.immutable && _t.current) {
                var ee;
                (ee = _t.current).update.apply(ee, [st.options].concat(lt(st.updateArgs || [!0, !0])));
              } else Z();
            } else Z();
          }, [st.options, st.allowChartUpdate, st.updateArgs, st.containerProps, st.highcharts, st.constructorType]), xt(function() {
            return function() {
              _t.current && (_t.current.destroy(), _t.current = null);
            };
          }, []), Object(ft.useImperativeHandle)(mt, function() {
            return { get chart() {
              return _t.current;
            }, container: Lt };
          }, []), St.a.createElement("div", at({}, st.containerProps, { ref: Lt }));
        }));
        Q.default = Xt;
      }, function(D, Q) {
        D.exports = L;
      }]);
    });
  }(Vf)), Vf.exports;
}
var e0 = t0();
const i0 = /* @__PURE__ */ gm(e0), lm = ({ series: O }) => {
  const x = Vy(O);
  return /* @__PURE__ */ ha.jsx("div", { className: "pie-chart", children: /* @__PURE__ */ ha.jsx(
    i0,
    {
      highcharts: Jy,
      options: {
        ...x,
        chart: {
          ...x.chart,
          width: null,
          height: null
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                plotOptions: {
                  pie: {
                    dataLabels: {
                      format: "<b>{point.name}</b>: {point.y}",
                      style: {
                        fontSize: "10px"
                      }
                    }
                  }
                }
              }
            },
            {
              condition: {
                maxWidth: 300
              },
              chartOptions: {
                plotOptions: {
                  pie: {
                    dataLabels: {
                      format: "{point.name}",
                      style: {
                        fontSize: "9px"
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  ) });
}, a0 = new wy(), s0 = () => {
  const { isLoading: O, data: x = null } = Qy({
    queryKey: ["siteOverview"],
    queryFn: uy
  });
  if (O)
    return /* @__PURE__ */ ha.jsx("div", { children: "Loading..." });
  if (!x)
    return /* @__PURE__ */ ha.jsx("div", { children: "No data available" });
  const { onlineSeriesList: L, offlineSeriesList: D } = Wy(x);
  return /* @__PURE__ */ ha.jsxs("div", { className: "chart-container", children: [
    /* @__PURE__ */ ha.jsxs("div", { className: "chart-wrapper", children: [
      /* @__PURE__ */ ha.jsx("h3", { className: "chart-title", children: "Online Sites" }),
      /* @__PURE__ */ ha.jsx(lm, { series: L })
    ] }),
    /* @__PURE__ */ ha.jsxs("div", { className: "chart-wrapper", children: [
      /* @__PURE__ */ ha.jsx("h3", { className: "chart-title", children: "Offline Sites" }),
      /* @__PURE__ */ ha.jsx(lm, { series: D })
    ] })
  ] });
}, l0 = () => /* @__PURE__ */ ha.jsx(zy, { client: a0, children: /* @__PURE__ */ ha.jsx(s0, {}) }), n0 = ly(l0, {
  shadow: "closed",
  props: {
    siteId: "number"
  }
});
customElements.define("site-overview-chart", n0);
