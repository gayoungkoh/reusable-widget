(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".chart-container{display:flex;justify-content:space-around;gap:2rem;width:100%}.chart-wrapper{text-align:center;width:50%;min-width:250px}.chart-title{font-size:1rem;margin-bottom:1rem}.pie-chart{width:100%;height:auto;margin:0 auto;max-width:500px}@media (max-width: 768px){.pie-chart{max-width:400px}}@media (max-width: 576px){.pie-chart{max-width:300px}}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
var Ql = (b) => {
  throw TypeError(b);
};
var ta = (b, f, k) => f.has(b) || Ql("Cannot " + k);
var O = (b, f, k) => (ta(b, f, "read from private field"), k ? k.call(b) : f.get(b)), at = (b, f, k) => f.has(b) ? Ql("Cannot add the same private member more than once") : f instanceof WeakSet ? f.add(b) : f.set(b, k), q = (b, f, k, C) => (ta(b, f, "write to private field"), C ? C.call(b, k) : f.set(b, k), k), mt = (b, f, k) => (ta(b, f, "access private method"), k);
var Tr = (b, f, k, C) => ({
  set _(I) {
    q(b, f, I, k);
  },
  get _() {
    return O(b, f, C);
  }
});
import * as ue from "react";
import Dr from "react";
import { createRoot as _f } from "react-dom/client";
var Zf = Object.defineProperty, Jf = (b, f, k) => f in b ? Zf(b, f, { enumerable: !0, configurable: !0, writable: !0, value: k }) : b[f] = k, Ar = (b, f, k) => Jf(b, typeof f != "symbol" ? f + "" : f, k);
const tg = {
  stringify: (b) => b ? "true" : "false",
  parse: (b) => /^[ty1-9]/i.test(b)
}, eg = {
  stringify: (b) => b.name,
  parse: (b, f, k) => {
    const C = (() => {
      if (typeof window < "u" && b in window)
        return window[b];
      if (typeof global < "u" && b in global)
        return global[b];
    })();
    return typeof C == "function" ? C.bind(k) : void 0;
  }
}, ig = {
  stringify: (b) => JSON.stringify(b),
  parse: (b) => JSON.parse(b)
}, sg = {
  stringify: (b) => `${b}`,
  parse: (b) => parseFloat(b)
}, rg = {
  stringify: (b) => b,
  parse: (b) => b
}, ea = {
  string: rg,
  number: sg,
  boolean: tg,
  function: eg,
  json: ig
};
function og(b) {
  return b.replace(
    /([a-z0-9])([A-Z])/g,
    (f, k, C) => `${k}-${C.toLowerCase()}`
  );
}
const Or = Symbol.for("r2wc.render"), Pr = Symbol.for("r2wc.connected"), gi = Symbol.for("r2wc.context"), Re = Symbol.for("r2wc.props");
function ag(b, f, k) {
  var C, I, F;
  f.props || (f.props = b.propTypes ? Object.keys(b.propTypes) : []), f.events || (f.events = []);
  const z = Array.isArray(f.props) ? f.props.slice() : Object.keys(f.props), W = Array.isArray(f.events) ? f.events.slice() : Object.keys(f.events), Y = {}, rt = {}, st = {}, U = {};
  for (const $ of z) {
    Y[$] = Array.isArray(f.props) ? "string" : f.props[$];
    const K = og($);
    st[$] = K, U[K] = $;
  }
  for (const $ of W)
    rt[$] = Array.isArray(f.events) ? {} : f.events[$];
  class nt extends HTMLElement {
    constructor() {
      super(), Ar(this, F, !0), Ar(this, I), Ar(this, C, {}), Ar(this, "container"), f.shadow ? this.container = this.attachShadow({
        mode: f.shadow
      }) : this.container = this, this[Re].container = this.container;
      for (const K of z) {
        const J = st[K], _ = this.getAttribute(J), ft = Y[K], H = ft ? ea[ft] : null;
        H != null && H.parse && _ && (this[Re][K] = H.parse(_, J, this));
      }
      for (const K of W)
        this[Re][K] = (J) => {
          const _ = K.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(_, { detail: J, ...rt[K] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(U);
    }
    connectedCallback() {
      this[Pr] = !0, this[Or]();
    }
    disconnectedCallback() {
      this[Pr] = !1, this[gi] && k.unmount(this[gi]), delete this[gi];
    }
    attributeChangedCallback(K, J, _) {
      const ft = U[K], H = Y[ft], tt = H ? ea[H] : null;
      ft in Y && tt != null && tt.parse && _ && (this[Re][ft] = tt.parse(_, K, this), this[Or]());
    }
    [(F = Pr, I = gi, C = Re, Or)]() {
      this[Pr] && (this[gi] ? k.update(this[gi], this[Re]) : this[gi] = k.mount(
        this.container,
        b,
        this[Re]
      ));
    }
  }
  for (const $ of z) {
    const K = st[$], J = Y[$];
    Object.defineProperty(nt.prototype, $, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[Re][$];
      },
      set(_) {
        this[Re][$] = _;
        const ft = J ? ea[J] : null;
        if (ft != null && ft.stringify) {
          const H = ft.stringify(_, K, this);
          this.getAttribute(K) !== H && this.setAttribute(K, H);
        } else
          this[Or]();
      }
    });
  }
  return nt;
}
function ng(b, f, k) {
  const C = _f(b), I = Dr.createElement(f, k);
  return C.render(I), {
    root: C,
    ReactComponent: f
  };
}
function lg({ root: b, ReactComponent: f }, k) {
  const C = Dr.createElement(f, k);
  b.render(C);
}
function hg({ root: b }) {
  b.unmount();
}
function dg(b, f = {}) {
  return ag(b, f, { mount: ng, update: lg, unmount: hg });
}
function kh(b) {
  return b && b.__esModule && Object.prototype.hasOwnProperty.call(b, "default") ? b.default : b;
}
var ia = { exports: {} }, Cs = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _l;
function cg() {
  if (_l) return Cs;
  _l = 1;
  var b = Dr, f = Symbol.for("react.element"), k = Symbol.for("react.fragment"), C = Object.prototype.hasOwnProperty, I = b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, F = { key: !0, ref: !0, __self: !0, __source: !0 };
  function z(W, Y, rt) {
    var st, U = {}, nt = null, $ = null;
    rt !== void 0 && (nt = "" + rt), Y.key !== void 0 && (nt = "" + Y.key), Y.ref !== void 0 && ($ = Y.ref);
    for (st in Y) C.call(Y, st) && !F.hasOwnProperty(st) && (U[st] = Y[st]);
    if (W && W.defaultProps) for (st in Y = W.defaultProps, Y) U[st] === void 0 && (U[st] = Y[st]);
    return { $$typeof: f, type: W, key: nt, ref: $, props: U, _owner: I.current };
  }
  return Cs.Fragment = k, Cs.jsx = z, Cs.jsxs = z, Cs;
}
var Zl;
function ug() {
  return Zl || (Zl = 1, ia.exports = cg()), ia.exports;
}
var te = ug();
const pg = async (b) => {
  const f = await fetch(b);
  if (!f.ok)
    throw new Error(`HTTP error! status: ${f.status}`);
  return await f.json();
}, fg = "https://3792f998-96be-4327-8204-4d908ecf4e19.mock.pstmn.io", gg = async () => await pg(`${fg}/site-overview`);
var Rs = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(b) {
    return this.listeners.add(b), this.onSubscribe(), () => {
      this.listeners.delete(b), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Mi = typeof window > "u" || "Deno" in globalThis;
function ce() {
}
function mg(b, f) {
  return typeof b == "function" ? b(f) : b;
}
function ra(b) {
  return typeof b == "number" && b >= 0 && b !== 1 / 0;
}
function Sh(b, f) {
  return Math.max(b + (f || 0) - Date.now(), 0);
}
function ji(b, f) {
  return typeof b == "function" ? b(f) : b;
}
function be(b, f) {
  return typeof b == "function" ? b(f) : b;
}
function Jl(b, f) {
  const {
    type: k = "all",
    exact: C,
    fetchStatus: I,
    predicate: F,
    queryKey: z,
    stale: W
  } = b;
  if (z) {
    if (C) {
      if (f.queryHash !== ya(z, f.options))
        return !1;
    } else if (!Os(f.queryKey, z))
      return !1;
  }
  if (k !== "all") {
    const Y = f.isActive();
    if (k === "active" && !Y || k === "inactive" && Y)
      return !1;
  }
  return !(typeof W == "boolean" && f.isStale() !== W || I && I !== f.state.fetchStatus || F && !F(f));
}
function th(b, f) {
  const { exact: k, status: C, predicate: I, mutationKey: F } = b;
  if (F) {
    if (!f.options.mutationKey)
      return !1;
    if (k) {
      if (As(f.options.mutationKey) !== As(F))
        return !1;
    } else if (!Os(f.options.mutationKey, F))
      return !1;
  }
  return !(C && f.state.status !== C || I && !I(f));
}
function ya(b, f) {
  return ((f == null ? void 0 : f.queryKeyHashFn) || As)(b);
}
function As(b) {
  return JSON.stringify(
    b,
    (f, k) => aa(k) ? Object.keys(k).sort().reduce((C, I) => (C[I] = k[I], C), {}) : k
  );
}
function Os(b, f) {
  return b === f ? !0 : typeof b != typeof f ? !1 : b && f && typeof b == "object" && typeof f == "object" ? Object.keys(f).every((k) => Os(b[k], f[k])) : !1;
}
function Mh(b, f) {
  if (b === f)
    return b;
  const k = eh(b) && eh(f);
  if (k || aa(b) && aa(f)) {
    const C = k ? b : Object.keys(b), I = C.length, F = k ? f : Object.keys(f), z = F.length, W = k ? [] : {};
    let Y = 0;
    for (let rt = 0; rt < z; rt++) {
      const st = k ? rt : F[rt];
      (!k && C.includes(st) || k) && b[st] === void 0 && f[st] === void 0 ? (W[st] = void 0, Y++) : (W[st] = Mh(b[st], f[st]), W[st] === b[st] && b[st] !== void 0 && Y++);
    }
    return I === z && Y === I ? b : W;
  }
  return f;
}
function oa(b, f) {
  if (!f || Object.keys(b).length !== Object.keys(f).length)
    return !1;
  for (const k in b)
    if (b[k] !== f[k])
      return !1;
  return !0;
}
function eh(b) {
  return Array.isArray(b) && b.length === Object.keys(b).length;
}
function aa(b) {
  if (!ih(b))
    return !1;
  const f = b.constructor;
  if (f === void 0)
    return !0;
  const k = f.prototype;
  return !(!ih(k) || !k.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(b) !== Object.prototype);
}
function ih(b) {
  return Object.prototype.toString.call(b) === "[object Object]";
}
function yg(b) {
  return new Promise((f) => {
    setTimeout(f, b);
  });
}
function na(b, f, k) {
  return typeof k.structuralSharing == "function" ? k.structuralSharing(b, f) : k.structuralSharing !== !1 ? Mh(b, f) : f;
}
function xg(b, f, k = 0) {
  const C = [...b, f];
  return k && C.length > k ? C.slice(1) : C;
}
function bg(b, f, k = 0) {
  const C = [f, ...b];
  return k && C.length > k ? C.slice(0, -1) : C;
}
var xa = Symbol();
function Ch(b, f) {
  return !b.queryFn && (f != null && f.initialPromise) ? () => f.initialPromise : !b.queryFn || b.queryFn === xa ? () => Promise.reject(new Error(`Missing queryFn: '${b.queryHash}'`)) : b.queryFn;
}
var mi, Qe, Xi, ph, vg = (ph = class extends Rs {
  constructor() {
    super();
    at(this, mi);
    at(this, Qe);
    at(this, Xi);
    q(this, Xi, (f) => {
      if (!Mi && window.addEventListener) {
        const k = () => f();
        return window.addEventListener("visibilitychange", k, !1), () => {
          window.removeEventListener("visibilitychange", k);
        };
      }
    });
  }
  onSubscribe() {
    O(this, Qe) || this.setEventListener(O(this, Xi));
  }
  onUnsubscribe() {
    var f;
    this.hasListeners() || ((f = O(this, Qe)) == null || f.call(this), q(this, Qe, void 0));
  }
  setEventListener(f) {
    var k;
    q(this, Xi, f), (k = O(this, Qe)) == null || k.call(this), q(this, Qe, f((C) => {
      typeof C == "boolean" ? this.setFocused(C) : this.onFocus();
    }));
  }
  setFocused(f) {
    O(this, mi) !== f && (q(this, mi, f), this.onFocus());
  }
  onFocus() {
    const f = this.isFocused();
    this.listeners.forEach((k) => {
      k(f);
    });
  }
  isFocused() {
    var f;
    return typeof O(this, mi) == "boolean" ? O(this, mi) : ((f = globalThis.document) == null ? void 0 : f.visibilityState) !== "hidden";
  }
}, mi = new WeakMap(), Qe = new WeakMap(), Xi = new WeakMap(), ph), ba = new vg(), Gi, _e, Yi, fh, wg = (fh = class extends Rs {
  constructor() {
    super();
    at(this, Gi, !0);
    at(this, _e);
    at(this, Yi);
    q(this, Yi, (f) => {
      if (!Mi && window.addEventListener) {
        const k = () => f(!0), C = () => f(!1);
        return window.addEventListener("online", k, !1), window.addEventListener("offline", C, !1), () => {
          window.removeEventListener("online", k), window.removeEventListener("offline", C);
        };
      }
    });
  }
  onSubscribe() {
    O(this, _e) || this.setEventListener(O(this, Yi));
  }
  onUnsubscribe() {
    var f;
    this.hasListeners() || ((f = O(this, _e)) == null || f.call(this), q(this, _e, void 0));
  }
  setEventListener(f) {
    var k;
    q(this, Yi, f), (k = O(this, _e)) == null || k.call(this), q(this, _e, f(this.setOnline.bind(this)));
  }
  setOnline(f) {
    O(this, Gi) !== f && (q(this, Gi, f), this.listeners.forEach((C) => {
      C(f);
    }));
  }
  isOnline() {
    return O(this, Gi);
  }
}, Gi = new WeakMap(), _e = new WeakMap(), Yi = new WeakMap(), fh), Rr = new wg();
function la() {
  let b, f;
  const k = new Promise((I, F) => {
    b = I, f = F;
  });
  k.status = "pending", k.catch(() => {
  });
  function C(I) {
    Object.assign(k, I), delete k.resolve, delete k.reject;
  }
  return k.resolve = (I) => {
    C({
      status: "fulfilled",
      value: I
    }), b(I);
  }, k.reject = (I) => {
    C({
      status: "rejected",
      reason: I
    }), f(I);
  }, k;
}
function kg(b) {
  return Math.min(1e3 * 2 ** b, 3e4);
}
function Th(b) {
  return (b ?? "online") === "online" ? Rr.isOnline() : !0;
}
var Ah = class extends Error {
  constructor(b) {
    super("CancelledError"), this.revert = b == null ? void 0 : b.revert, this.silent = b == null ? void 0 : b.silent;
  }
};
function sa(b) {
  return b instanceof Ah;
}
function Oh(b) {
  let f = !1, k = 0, C = !1, I;
  const F = la(), z = (J) => {
    var _;
    C || (nt(new Ah(J)), (_ = b.abort) == null || _.call(b));
  }, W = () => {
    f = !0;
  }, Y = () => {
    f = !1;
  }, rt = () => ba.isFocused() && (b.networkMode === "always" || Rr.isOnline()) && b.canRun(), st = () => Th(b.networkMode) && b.canRun(), U = (J) => {
    var _;
    C || (C = !0, (_ = b.onSuccess) == null || _.call(b, J), I == null || I(), F.resolve(J));
  }, nt = (J) => {
    var _;
    C || (C = !0, (_ = b.onError) == null || _.call(b, J), I == null || I(), F.reject(J));
  }, $ = () => new Promise((J) => {
    var _;
    I = (ft) => {
      (C || rt()) && J(ft);
    }, (_ = b.onPause) == null || _.call(b);
  }).then(() => {
    var J;
    I = void 0, C || (J = b.onContinue) == null || J.call(b);
  }), K = () => {
    if (C)
      return;
    let J;
    const _ = k === 0 ? b.initialPromise : void 0;
    try {
      J = _ ?? b.fn();
    } catch (ft) {
      J = Promise.reject(ft);
    }
    Promise.resolve(J).then(U).catch((ft) => {
      var It;
      if (C)
        return;
      const H = b.retry ?? (Mi ? 0 : 3), tt = b.retryDelay ?? kg, ht = typeof tt == "function" ? tt(k, ft) : tt, xt = H === !0 || typeof H == "number" && k < H || typeof H == "function" && H(k, ft);
      if (f || !xt) {
        nt(ft);
        return;
      }
      k++, (It = b.onFail) == null || It.call(b, k, ft), yg(ht).then(() => rt() ? void 0 : $()).then(() => {
        f ? nt(ft) : K();
      });
    });
  };
  return {
    promise: F,
    cancel: z,
    continue: () => (I == null || I(), F),
    cancelRetry: W,
    continueRetry: Y,
    canStart: st,
    start: () => (st() ? K() : $().then(K), F)
  };
}
var Sg = (b) => setTimeout(b, 0);
function Mg() {
  let b = [], f = 0, k = (W) => {
    W();
  }, C = (W) => {
    W();
  }, I = Sg;
  const F = (W) => {
    f ? b.push(W) : I(() => {
      k(W);
    });
  }, z = () => {
    const W = b;
    b = [], W.length && I(() => {
      C(() => {
        W.forEach((Y) => {
          k(Y);
        });
      });
    });
  };
  return {
    batch: (W) => {
      let Y;
      f++;
      try {
        Y = W();
      } finally {
        f--, f || z();
      }
      return Y;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (W) => (...Y) => {
      F(() => {
        W(...Y);
      });
    },
    schedule: F,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (W) => {
      k = W;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (W) => {
      C = W;
    },
    setScheduler: (W) => {
      I = W;
    }
  };
}
var Ut = Mg(), yi, gh, Ph = (gh = class {
  constructor() {
    at(this, yi);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), ra(this.gcTime) && q(this, yi, setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(b) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      b ?? (Mi ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    O(this, yi) && (clearTimeout(O(this, yi)), q(this, yi, void 0));
  }
}, yi = new WeakMap(), gh), Ui, qi, de, xi, qt, Ps, bi, ye, De, mh, Cg = (mh = class extends Ph {
  constructor(f) {
    super();
    at(this, ye);
    at(this, Ui);
    at(this, qi);
    at(this, de);
    at(this, xi);
    at(this, qt);
    at(this, Ps);
    at(this, bi);
    q(this, bi, !1), q(this, Ps, f.defaultOptions), this.setOptions(f.options), this.observers = [], q(this, xi, f.client), q(this, de, O(this, xi).getQueryCache()), this.queryKey = f.queryKey, this.queryHash = f.queryHash, q(this, Ui, Tg(this.options)), this.state = f.state ?? O(this, Ui), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var f;
    return (f = O(this, qt)) == null ? void 0 : f.promise;
  }
  setOptions(f) {
    this.options = { ...O(this, Ps), ...f }, this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && O(this, de).remove(this);
  }
  setData(f, k) {
    const C = na(this.state.data, f, this.options);
    return mt(this, ye, De).call(this, {
      data: C,
      type: "success",
      dataUpdatedAt: k == null ? void 0 : k.updatedAt,
      manual: k == null ? void 0 : k.manual
    }), C;
  }
  setState(f, k) {
    mt(this, ye, De).call(this, { type: "setState", state: f, setStateOptions: k });
  }
  cancel(f) {
    var C, I;
    const k = (C = O(this, qt)) == null ? void 0 : C.promise;
    return (I = O(this, qt)) == null || I.cancel(f), k ? k.then(ce).catch(ce) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(O(this, Ui));
  }
  isActive() {
    return this.observers.some(
      (f) => be(f.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === xa || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStale() {
    return this.state.isInvalidated ? !0 : this.getObserversCount() > 0 ? this.observers.some(
      (f) => f.getCurrentResult().isStale
    ) : this.state.data === void 0;
  }
  isStaleByTime(f = 0) {
    return this.state.isInvalidated || this.state.data === void 0 || !Sh(this.state.dataUpdatedAt, f);
  }
  onFocus() {
    var k;
    const f = this.observers.find((C) => C.shouldFetchOnWindowFocus());
    f == null || f.refetch({ cancelRefetch: !1 }), (k = O(this, qt)) == null || k.continue();
  }
  onOnline() {
    var k;
    const f = this.observers.find((C) => C.shouldFetchOnReconnect());
    f == null || f.refetch({ cancelRefetch: !1 }), (k = O(this, qt)) == null || k.continue();
  }
  addObserver(f) {
    this.observers.includes(f) || (this.observers.push(f), this.clearGcTimeout(), O(this, de).notify({ type: "observerAdded", query: this, observer: f }));
  }
  removeObserver(f) {
    this.observers.includes(f) && (this.observers = this.observers.filter((k) => k !== f), this.observers.length || (O(this, qt) && (O(this, bi) ? O(this, qt).cancel({ revert: !0 }) : O(this, qt).cancelRetry()), this.scheduleGc()), O(this, de).notify({ type: "observerRemoved", query: this, observer: f }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || mt(this, ye, De).call(this, { type: "invalidate" });
  }
  fetch(f, k) {
    var Y, rt, st;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && (k != null && k.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (O(this, qt))
        return O(this, qt).continueRetry(), O(this, qt).promise;
    }
    if (f && this.setOptions(f), !this.options.queryFn) {
      const U = this.observers.find((nt) => nt.options.queryFn);
      U && this.setOptions(U.options);
    }
    const C = new AbortController(), I = (U) => {
      Object.defineProperty(U, "signal", {
        enumerable: !0,
        get: () => (q(this, bi, !0), C.signal)
      });
    }, F = () => {
      const U = Ch(this.options, k), nt = {
        client: O(this, xi),
        queryKey: this.queryKey,
        meta: this.meta
      };
      return I(nt), q(this, bi, !1), this.options.persister ? this.options.persister(
        U,
        nt,
        this
      ) : U(nt);
    }, z = {
      fetchOptions: k,
      options: this.options,
      queryKey: this.queryKey,
      client: O(this, xi),
      state: this.state,
      fetchFn: F
    };
    I(z), (Y = this.options.behavior) == null || Y.onFetch(
      z,
      this
    ), q(this, qi, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((rt = z.fetchOptions) == null ? void 0 : rt.meta)) && mt(this, ye, De).call(this, { type: "fetch", meta: (st = z.fetchOptions) == null ? void 0 : st.meta });
    const W = (U) => {
      var nt, $, K, J;
      sa(U) && U.silent || mt(this, ye, De).call(this, {
        type: "error",
        error: U
      }), sa(U) || (($ = (nt = O(this, de).config).onError) == null || $.call(
        nt,
        U,
        this
      ), (J = (K = O(this, de).config).onSettled) == null || J.call(
        K,
        this.state.data,
        U,
        this
      )), this.scheduleGc();
    };
    return q(this, qt, Oh({
      initialPromise: k == null ? void 0 : k.initialPromise,
      fn: z.fetchFn,
      abort: C.abort.bind(C),
      onSuccess: (U) => {
        var nt, $, K, J;
        if (U === void 0) {
          W(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(U);
        } catch (_) {
          W(_);
          return;
        }
        ($ = (nt = O(this, de).config).onSuccess) == null || $.call(nt, U, this), (J = (K = O(this, de).config).onSettled) == null || J.call(
          K,
          U,
          this.state.error,
          this
        ), this.scheduleGc();
      },
      onError: W,
      onFail: (U, nt) => {
        mt(this, ye, De).call(this, { type: "failed", failureCount: U, error: nt });
      },
      onPause: () => {
        mt(this, ye, De).call(this, { type: "pause" });
      },
      onContinue: () => {
        mt(this, ye, De).call(this, { type: "continue" });
      },
      retry: z.options.retry,
      retryDelay: z.options.retryDelay,
      networkMode: z.options.networkMode,
      canRun: () => !0
    })), O(this, qt).start();
  }
}, Ui = new WeakMap(), qi = new WeakMap(), de = new WeakMap(), xi = new WeakMap(), qt = new WeakMap(), Ps = new WeakMap(), bi = new WeakMap(), ye = new WeakSet(), De = function(f) {
  const k = (C) => {
    switch (f.type) {
      case "failed":
        return {
          ...C,
          fetchFailureCount: f.failureCount,
          fetchFailureReason: f.error
        };
      case "pause":
        return {
          ...C,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...C,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...C,
          ...Lh(C.data, this.options),
          fetchMeta: f.meta ?? null
        };
      case "success":
        return {
          ...C,
          data: f.data,
          dataUpdateCount: C.dataUpdateCount + 1,
          dataUpdatedAt: f.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: !1,
          status: "success",
          ...!f.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const I = f.error;
        return sa(I) && I.revert && O(this, qi) ? { ...O(this, qi), fetchStatus: "idle" } : {
          ...C,
          error: I,
          errorUpdateCount: C.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: C.fetchFailureCount + 1,
          fetchFailureReason: I,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...C,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...C,
          ...f.state
        };
    }
  };
  this.state = k(this.state), Ut.batch(() => {
    this.observers.forEach((C) => {
      C.onQueryUpdate();
    }), O(this, de).notify({ query: this, type: "updated", action: f });
  });
}, mh);
function Lh(b, f) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Th(f.networkMode) ? "fetching" : "paused",
    ...b === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function Tg(b) {
  const f = typeof b.initialData == "function" ? b.initialData() : b.initialData, k = f !== void 0, C = k ? typeof b.initialDataUpdatedAt == "function" ? b.initialDataUpdatedAt() : b.initialDataUpdatedAt : 0;
  return {
    data: f,
    dataUpdateCount: 0,
    dataUpdatedAt: k ? C ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: k ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var Te, yh, Ag = (yh = class extends Rs {
  constructor(f = {}) {
    super();
    at(this, Te);
    this.config = f, q(this, Te, /* @__PURE__ */ new Map());
  }
  build(f, k, C) {
    const I = k.queryKey, F = k.queryHash ?? ya(I, k);
    let z = this.get(F);
    return z || (z = new Cg({
      client: f,
      queryKey: I,
      queryHash: F,
      options: f.defaultQueryOptions(k),
      state: C,
      defaultOptions: f.getQueryDefaults(I)
    }), this.add(z)), z;
  }
  add(f) {
    O(this, Te).has(f.queryHash) || (O(this, Te).set(f.queryHash, f), this.notify({
      type: "added",
      query: f
    }));
  }
  remove(f) {
    const k = O(this, Te).get(f.queryHash);
    k && (f.destroy(), k === f && O(this, Te).delete(f.queryHash), this.notify({ type: "removed", query: f }));
  }
  clear() {
    Ut.batch(() => {
      this.getAll().forEach((f) => {
        this.remove(f);
      });
    });
  }
  get(f) {
    return O(this, Te).get(f);
  }
  getAll() {
    return [...O(this, Te).values()];
  }
  find(f) {
    const k = { exact: !0, ...f };
    return this.getAll().find(
      (C) => Jl(k, C)
    );
  }
  findAll(f = {}) {
    const k = this.getAll();
    return Object.keys(f).length > 0 ? k.filter((C) => Jl(f, C)) : k;
  }
  notify(f) {
    Ut.batch(() => {
      this.listeners.forEach((k) => {
        k(f);
      });
    });
  }
  onFocus() {
    Ut.batch(() => {
      this.getAll().forEach((f) => {
        f.onFocus();
      });
    });
  }
  onOnline() {
    Ut.batch(() => {
      this.getAll().forEach((f) => {
        f.onOnline();
      });
    });
  }
}, Te = new WeakMap(), yh), Ae, _t, vi, Oe, Ke, xh, Og = (xh = class extends Ph {
  constructor(f) {
    super();
    at(this, Oe);
    at(this, Ae);
    at(this, _t);
    at(this, vi);
    this.mutationId = f.mutationId, q(this, _t, f.mutationCache), q(this, Ae, []), this.state = f.state || Pg(), this.setOptions(f.options), this.scheduleGc();
  }
  setOptions(f) {
    this.options = f, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(f) {
    O(this, Ae).includes(f) || (O(this, Ae).push(f), this.clearGcTimeout(), O(this, _t).notify({
      type: "observerAdded",
      mutation: this,
      observer: f
    }));
  }
  removeObserver(f) {
    q(this, Ae, O(this, Ae).filter((k) => k !== f)), this.scheduleGc(), O(this, _t).notify({
      type: "observerRemoved",
      mutation: this,
      observer: f
    });
  }
  optionalRemove() {
    O(this, Ae).length || (this.state.status === "pending" ? this.scheduleGc() : O(this, _t).remove(this));
  }
  continue() {
    var f;
    return ((f = O(this, vi)) == null ? void 0 : f.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(f) {
    var F, z, W, Y, rt, st, U, nt, $, K, J, _, ft, H, tt, ht, xt, It, pe, E;
    const k = () => {
      mt(this, Oe, Ke).call(this, { type: "continue" });
    };
    q(this, vi, Oh({
      fn: () => this.options.mutationFn ? this.options.mutationFn(f) : Promise.reject(new Error("No mutationFn found")),
      onFail: (Ct, kt) => {
        mt(this, Oe, Ke).call(this, { type: "failed", failureCount: Ct, error: kt });
      },
      onPause: () => {
        mt(this, Oe, Ke).call(this, { type: "pause" });
      },
      onContinue: k,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => O(this, _t).canRun(this)
    }));
    const C = this.state.status === "pending", I = !O(this, vi).canStart();
    try {
      if (C)
        k();
      else {
        mt(this, Oe, Ke).call(this, { type: "pending", variables: f, isPaused: I }), await ((z = (F = O(this, _t).config).onMutate) == null ? void 0 : z.call(
          F,
          f,
          this
        ));
        const kt = await ((Y = (W = this.options).onMutate) == null ? void 0 : Y.call(W, f));
        kt !== this.state.context && mt(this, Oe, Ke).call(this, {
          type: "pending",
          context: kt,
          variables: f,
          isPaused: I
        });
      }
      const Ct = await O(this, vi).start();
      return await ((st = (rt = O(this, _t).config).onSuccess) == null ? void 0 : st.call(
        rt,
        Ct,
        f,
        this.state.context,
        this
      )), await ((nt = (U = this.options).onSuccess) == null ? void 0 : nt.call(U, Ct, f, this.state.context)), await ((K = ($ = O(this, _t).config).onSettled) == null ? void 0 : K.call(
        $,
        Ct,
        null,
        this.state.variables,
        this.state.context,
        this
      )), await ((_ = (J = this.options).onSettled) == null ? void 0 : _.call(J, Ct, null, f, this.state.context)), mt(this, Oe, Ke).call(this, { type: "success", data: Ct }), Ct;
    } catch (Ct) {
      try {
        throw await ((H = (ft = O(this, _t).config).onError) == null ? void 0 : H.call(
          ft,
          Ct,
          f,
          this.state.context,
          this
        )), await ((ht = (tt = this.options).onError) == null ? void 0 : ht.call(
          tt,
          Ct,
          f,
          this.state.context
        )), await ((It = (xt = O(this, _t).config).onSettled) == null ? void 0 : It.call(
          xt,
          void 0,
          Ct,
          this.state.variables,
          this.state.context,
          this
        )), await ((E = (pe = this.options).onSettled) == null ? void 0 : E.call(
          pe,
          void 0,
          Ct,
          f,
          this.state.context
        )), Ct;
      } finally {
        mt(this, Oe, Ke).call(this, { type: "error", error: Ct });
      }
    } finally {
      O(this, _t).runNext(this);
    }
  }
}, Ae = new WeakMap(), _t = new WeakMap(), vi = new WeakMap(), Oe = new WeakSet(), Ke = function(f) {
  const k = (C) => {
    switch (f.type) {
      case "failed":
        return {
          ...C,
          failureCount: f.failureCount,
          failureReason: f.error
        };
      case "pause":
        return {
          ...C,
          isPaused: !0
        };
      case "continue":
        return {
          ...C,
          isPaused: !1
        };
      case "pending":
        return {
          ...C,
          context: f.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: f.isPaused,
          status: "pending",
          variables: f.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...C,
          data: f.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...C,
          data: void 0,
          error: f.error,
          failureCount: C.failureCount + 1,
          failureReason: f.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = k(this.state), Ut.batch(() => {
    O(this, Ae).forEach((C) => {
      C.onMutationUpdate(f);
    }), O(this, _t).notify({
      mutation: this,
      type: "updated",
      action: f
    });
  });
}, xh);
function Pg() {
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
var Ne, xe, Ls, bh, Lg = (bh = class extends Rs {
  constructor(f = {}) {
    super();
    at(this, Ne);
    at(this, xe);
    at(this, Ls);
    this.config = f, q(this, Ne, /* @__PURE__ */ new Set()), q(this, xe, /* @__PURE__ */ new Map()), q(this, Ls, 0);
  }
  build(f, k, C) {
    const I = new Og({
      mutationCache: this,
      mutationId: ++Tr(this, Ls)._,
      options: f.defaultMutationOptions(k),
      state: C
    });
    return this.add(I), I;
  }
  add(f) {
    O(this, Ne).add(f);
    const k = Lr(f);
    if (typeof k == "string") {
      const C = O(this, xe).get(k);
      C ? C.push(f) : O(this, xe).set(k, [f]);
    }
    this.notify({ type: "added", mutation: f });
  }
  remove(f) {
    if (O(this, Ne).delete(f)) {
      const k = Lr(f);
      if (typeof k == "string") {
        const C = O(this, xe).get(k);
        if (C)
          if (C.length > 1) {
            const I = C.indexOf(f);
            I !== -1 && C.splice(I, 1);
          } else C[0] === f && O(this, xe).delete(k);
      }
    }
    this.notify({ type: "removed", mutation: f });
  }
  canRun(f) {
    const k = Lr(f);
    if (typeof k == "string") {
      const C = O(this, xe).get(k), I = C == null ? void 0 : C.find(
        (F) => F.state.status === "pending"
      );
      return !I || I === f;
    } else
      return !0;
  }
  runNext(f) {
    var C;
    const k = Lr(f);
    if (typeof k == "string") {
      const I = (C = O(this, xe).get(k)) == null ? void 0 : C.find((F) => F !== f && F.state.isPaused);
      return (I == null ? void 0 : I.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    Ut.batch(() => {
      O(this, Ne).forEach((f) => {
        this.notify({ type: "removed", mutation: f });
      }), O(this, Ne).clear(), O(this, xe).clear();
    });
  }
  getAll() {
    return Array.from(O(this, Ne));
  }
  find(f) {
    const k = { exact: !0, ...f };
    return this.getAll().find(
      (C) => th(k, C)
    );
  }
  findAll(f = {}) {
    return this.getAll().filter((k) => th(f, k));
  }
  notify(f) {
    Ut.batch(() => {
      this.listeners.forEach((k) => {
        k(f);
      });
    });
  }
  resumePausedMutations() {
    const f = this.getAll().filter((k) => k.state.isPaused);
    return Ut.batch(
      () => Promise.all(
        f.map((k) => k.continue().catch(ce))
      )
    );
  }
}, Ne = new WeakMap(), xe = new WeakMap(), Ls = new WeakMap(), bh);
function Lr(b) {
  var f;
  return (f = b.options.scope) == null ? void 0 : f.id;
}
function sh(b) {
  return {
    onFetch: (f, k) => {
      var st, U, nt, $, K;
      const C = f.options, I = (nt = (U = (st = f.fetchOptions) == null ? void 0 : st.meta) == null ? void 0 : U.fetchMore) == null ? void 0 : nt.direction, F = (($ = f.state.data) == null ? void 0 : $.pages) || [], z = ((K = f.state.data) == null ? void 0 : K.pageParams) || [];
      let W = { pages: [], pageParams: [] }, Y = 0;
      const rt = async () => {
        let J = !1;
        const _ = (tt) => {
          Object.defineProperty(tt, "signal", {
            enumerable: !0,
            get: () => (f.signal.aborted ? J = !0 : f.signal.addEventListener("abort", () => {
              J = !0;
            }), f.signal)
          });
        }, ft = Ch(f.options, f.fetchOptions), H = async (tt, ht, xt) => {
          if (J)
            return Promise.reject();
          if (ht == null && tt.pages.length)
            return Promise.resolve(tt);
          const It = {
            client: f.client,
            queryKey: f.queryKey,
            pageParam: ht,
            direction: xt ? "backward" : "forward",
            meta: f.options.meta
          };
          _(It);
          const pe = await ft(
            It
          ), { maxPages: E } = f.options, Ct = xt ? bg : xg;
          return {
            pages: Ct(tt.pages, pe, E),
            pageParams: Ct(tt.pageParams, ht, E)
          };
        };
        if (I && F.length) {
          const tt = I === "backward", ht = tt ? Eg : rh, xt = {
            pages: F,
            pageParams: z
          }, It = ht(C, xt);
          W = await H(xt, It, tt);
        } else {
          const tt = b ?? F.length;
          do {
            const ht = Y === 0 ? z[0] ?? C.initialPageParam : rh(C, W);
            if (Y > 0 && ht == null)
              break;
            W = await H(W, ht), Y++;
          } while (Y < tt);
        }
        return W;
      };
      f.options.persister ? f.fetchFn = () => {
        var J, _;
        return (_ = (J = f.options).persister) == null ? void 0 : _.call(
          J,
          rt,
          {
            client: f.client,
            queryKey: f.queryKey,
            meta: f.options.meta,
            signal: f.signal
          },
          k
        );
      } : f.fetchFn = rt;
    }
  };
}
function rh(b, { pages: f, pageParams: k }) {
  const C = f.length - 1;
  return f.length > 0 ? b.getNextPageParam(
    f[C],
    f,
    k[C],
    k
  ) : void 0;
}
function Eg(b, { pages: f, pageParams: k }) {
  var C;
  return f.length > 0 ? (C = b.getPreviousPageParam) == null ? void 0 : C.call(b, f[0], f, k[0], k) : void 0;
}
var Dt, Ze, Je, $i, Vi, ti, Ki, Qi, vh, Ig = (vh = class {
  constructor(b = {}) {
    at(this, Dt);
    at(this, Ze);
    at(this, Je);
    at(this, $i);
    at(this, Vi);
    at(this, ti);
    at(this, Ki);
    at(this, Qi);
    q(this, Dt, b.queryCache || new Ag()), q(this, Ze, b.mutationCache || new Lg()), q(this, Je, b.defaultOptions || {}), q(this, $i, /* @__PURE__ */ new Map()), q(this, Vi, /* @__PURE__ */ new Map()), q(this, ti, 0);
  }
  mount() {
    Tr(this, ti)._++, O(this, ti) === 1 && (q(this, Ki, ba.subscribe(async (b) => {
      b && (await this.resumePausedMutations(), O(this, Dt).onFocus());
    })), q(this, Qi, Rr.subscribe(async (b) => {
      b && (await this.resumePausedMutations(), O(this, Dt).onOnline());
    })));
  }
  unmount() {
    var b, f;
    Tr(this, ti)._--, O(this, ti) === 0 && ((b = O(this, Ki)) == null || b.call(this), q(this, Ki, void 0), (f = O(this, Qi)) == null || f.call(this), q(this, Qi, void 0));
  }
  isFetching(b) {
    return O(this, Dt).findAll({ ...b, fetchStatus: "fetching" }).length;
  }
  isMutating(b) {
    return O(this, Ze).findAll({ ...b, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(b) {
    var k;
    const f = this.defaultQueryOptions({ queryKey: b });
    return (k = O(this, Dt).get(f.queryHash)) == null ? void 0 : k.state.data;
  }
  ensureQueryData(b) {
    const f = this.defaultQueryOptions(b), k = O(this, Dt).build(this, f), C = k.state.data;
    return C === void 0 ? this.fetchQuery(b) : (b.revalidateIfStale && k.isStaleByTime(ji(f.staleTime, k)) && this.prefetchQuery(f), Promise.resolve(C));
  }
  getQueriesData(b) {
    return O(this, Dt).findAll(b).map(({ queryKey: f, state: k }) => {
      const C = k.data;
      return [f, C];
    });
  }
  setQueryData(b, f, k) {
    const C = this.defaultQueryOptions({ queryKey: b }), I = O(this, Dt).get(
      C.queryHash
    ), F = I == null ? void 0 : I.state.data, z = mg(f, F);
    if (z !== void 0)
      return O(this, Dt).build(this, C).setData(z, { ...k, manual: !0 });
  }
  setQueriesData(b, f, k) {
    return Ut.batch(
      () => O(this, Dt).findAll(b).map(({ queryKey: C }) => [
        C,
        this.setQueryData(C, f, k)
      ])
    );
  }
  getQueryState(b) {
    var k;
    const f = this.defaultQueryOptions({ queryKey: b });
    return (k = O(this, Dt).get(
      f.queryHash
    )) == null ? void 0 : k.state;
  }
  removeQueries(b) {
    const f = O(this, Dt);
    Ut.batch(() => {
      f.findAll(b).forEach((k) => {
        f.remove(k);
      });
    });
  }
  resetQueries(b, f) {
    const k = O(this, Dt);
    return Ut.batch(() => (k.findAll(b).forEach((C) => {
      C.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...b
      },
      f
    )));
  }
  cancelQueries(b, f = {}) {
    const k = { revert: !0, ...f }, C = Ut.batch(
      () => O(this, Dt).findAll(b).map((I) => I.cancel(k))
    );
    return Promise.all(C).then(ce).catch(ce);
  }
  invalidateQueries(b, f = {}) {
    return Ut.batch(() => (O(this, Dt).findAll(b).forEach((k) => {
      k.invalidate();
    }), (b == null ? void 0 : b.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...b,
        type: (b == null ? void 0 : b.refetchType) ?? (b == null ? void 0 : b.type) ?? "active"
      },
      f
    )));
  }
  refetchQueries(b, f = {}) {
    const k = {
      ...f,
      cancelRefetch: f.cancelRefetch ?? !0
    }, C = Ut.batch(
      () => O(this, Dt).findAll(b).filter((I) => !I.isDisabled()).map((I) => {
        let F = I.fetch(void 0, k);
        return k.throwOnError || (F = F.catch(ce)), I.state.fetchStatus === "paused" ? Promise.resolve() : F;
      })
    );
    return Promise.all(C).then(ce);
  }
  fetchQuery(b) {
    const f = this.defaultQueryOptions(b);
    f.retry === void 0 && (f.retry = !1);
    const k = O(this, Dt).build(this, f);
    return k.isStaleByTime(
      ji(f.staleTime, k)
    ) ? k.fetch(f) : Promise.resolve(k.state.data);
  }
  prefetchQuery(b) {
    return this.fetchQuery(b).then(ce).catch(ce);
  }
  fetchInfiniteQuery(b) {
    return b.behavior = sh(b.pages), this.fetchQuery(b);
  }
  prefetchInfiniteQuery(b) {
    return this.fetchInfiniteQuery(b).then(ce).catch(ce);
  }
  ensureInfiniteQueryData(b) {
    return b.behavior = sh(b.pages), this.ensureQueryData(b);
  }
  resumePausedMutations() {
    return Rr.isOnline() ? O(this, Ze).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return O(this, Dt);
  }
  getMutationCache() {
    return O(this, Ze);
  }
  getDefaultOptions() {
    return O(this, Je);
  }
  setDefaultOptions(b) {
    q(this, Je, b);
  }
  setQueryDefaults(b, f) {
    O(this, $i).set(As(b), {
      queryKey: b,
      defaultOptions: f
    });
  }
  getQueryDefaults(b) {
    const f = [...O(this, $i).values()], k = {};
    return f.forEach((C) => {
      Os(b, C.queryKey) && Object.assign(k, C.defaultOptions);
    }), k;
  }
  setMutationDefaults(b, f) {
    O(this, Vi).set(As(b), {
      mutationKey: b,
      defaultOptions: f
    });
  }
  getMutationDefaults(b) {
    const f = [...O(this, Vi).values()], k = {};
    return f.forEach((C) => {
      Os(b, C.mutationKey) && Object.assign(k, C.defaultOptions);
    }), k;
  }
  defaultQueryOptions(b) {
    if (b._defaulted)
      return b;
    const f = {
      ...O(this, Je).queries,
      ...this.getQueryDefaults(b.queryKey),
      ...b,
      _defaulted: !0
    };
    return f.queryHash || (f.queryHash = ya(
      f.queryKey,
      f
    )), f.refetchOnReconnect === void 0 && (f.refetchOnReconnect = f.networkMode !== "always"), f.throwOnError === void 0 && (f.throwOnError = !!f.suspense), !f.networkMode && f.persister && (f.networkMode = "offlineFirst"), f.queryFn === xa && (f.enabled = !1), f;
  }
  defaultMutationOptions(b) {
    return b != null && b._defaulted ? b : {
      ...O(this, Je).mutations,
      ...(b == null ? void 0 : b.mutationKey) && this.getMutationDefaults(b.mutationKey),
      ...b,
      _defaulted: !0
    };
  }
  clear() {
    O(this, Dt).clear(), O(this, Ze).clear();
  }
}, Dt = new WeakMap(), Ze = new WeakMap(), Je = new WeakMap(), $i = new WeakMap(), Vi = new WeakMap(), ti = new WeakMap(), Ki = new WeakMap(), Qi = new WeakMap(), vh), Jt, yt, Es, Zt, wi, _i, ei, ii, Is, Zi, Ji, ki, Si, si, ts, wt, Ts, ha, da, ca, ua, pa, fa, ga, Eh, wh, Rg = (wh = class extends Rs {
  constructor(f, k) {
    super();
    at(this, wt);
    at(this, Jt);
    at(this, yt);
    at(this, Es);
    at(this, Zt);
    at(this, wi);
    at(this, _i);
    at(this, ei);
    at(this, ii);
    at(this, Is);
    at(this, Zi);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    at(this, Ji);
    at(this, ki);
    at(this, Si);
    at(this, si);
    at(this, ts, /* @__PURE__ */ new Set());
    this.options = k, q(this, Jt, f), q(this, ii, null), q(this, ei, la()), this.options.experimental_prefetchInRender || O(this, ei).reject(
      new Error("experimental_prefetchInRender feature flag is not enabled")
    ), this.bindMethods(), this.setOptions(k);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (O(this, yt).addObserver(this), oh(O(this, yt), this.options) ? mt(this, wt, Ts).call(this) : this.updateResult(), mt(this, wt, ua).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return ma(
      O(this, yt),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return ma(
      O(this, yt),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), mt(this, wt, pa).call(this), mt(this, wt, fa).call(this), O(this, yt).removeObserver(this);
  }
  setOptions(f) {
    const k = this.options, C = O(this, yt);
    if (this.options = O(this, Jt).defaultQueryOptions(f), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof be(this.options.enabled, O(this, yt)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    mt(this, wt, ga).call(this), O(this, yt).setOptions(this.options), k._defaulted && !oa(this.options, k) && O(this, Jt).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: O(this, yt),
      observer: this
    });
    const I = this.hasListeners();
    I && ah(
      O(this, yt),
      C,
      this.options,
      k
    ) && mt(this, wt, Ts).call(this), this.updateResult(), I && (O(this, yt) !== C || be(this.options.enabled, O(this, yt)) !== be(k.enabled, O(this, yt)) || ji(this.options.staleTime, O(this, yt)) !== ji(k.staleTime, O(this, yt))) && mt(this, wt, ha).call(this);
    const F = mt(this, wt, da).call(this);
    I && (O(this, yt) !== C || be(this.options.enabled, O(this, yt)) !== be(k.enabled, O(this, yt)) || F !== O(this, si)) && mt(this, wt, ca).call(this, F);
  }
  getOptimisticResult(f) {
    const k = O(this, Jt).getQueryCache().build(O(this, Jt), f), C = this.createResult(k, f);
    return Bg(this, C) && (q(this, Zt, C), q(this, _i, this.options), q(this, wi, O(this, yt).state)), C;
  }
  getCurrentResult() {
    return O(this, Zt);
  }
  trackResult(f, k) {
    const C = {};
    return Object.keys(f).forEach((I) => {
      Object.defineProperty(C, I, {
        configurable: !1,
        enumerable: !0,
        get: () => (this.trackProp(I), k == null || k(I), f[I])
      });
    }), C;
  }
  trackProp(f) {
    O(this, ts).add(f);
  }
  getCurrentQuery() {
    return O(this, yt);
  }
  refetch({ ...f } = {}) {
    return this.fetch({
      ...f
    });
  }
  fetchOptimistic(f) {
    const k = O(this, Jt).defaultQueryOptions(f), C = O(this, Jt).getQueryCache().build(O(this, Jt), k);
    return C.fetch().then(() => this.createResult(C, k));
  }
  fetch(f) {
    return mt(this, wt, Ts).call(this, {
      ...f,
      cancelRefetch: f.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), O(this, Zt)));
  }
  createResult(f, k) {
    var Ct;
    const C = O(this, yt), I = this.options, F = O(this, Zt), z = O(this, wi), W = O(this, _i), rt = f !== C ? f.state : O(this, Es), { state: st } = f;
    let U = { ...st }, nt = !1, $;
    if (k._optimisticResults) {
      const kt = this.hasListeners(), $t = !kt && oh(f, k), se = kt && ah(f, C, k, I);
      ($t || se) && (U = {
        ...U,
        ...Lh(st.data, f.options)
      }), k._optimisticResults === "isRestoring" && (U.fetchStatus = "idle");
    }
    let { error: K, errorUpdatedAt: J, status: _ } = U;
    $ = U.data;
    let ft = !1;
    if (k.placeholderData !== void 0 && $ === void 0 && _ === "pending") {
      let kt;
      F != null && F.isPlaceholderData && k.placeholderData === (W == null ? void 0 : W.placeholderData) ? (kt = F.data, ft = !0) : kt = typeof k.placeholderData == "function" ? k.placeholderData(
        (Ct = O(this, Ji)) == null ? void 0 : Ct.state.data,
        O(this, Ji)
      ) : k.placeholderData, kt !== void 0 && (_ = "success", $ = na(
        F == null ? void 0 : F.data,
        kt,
        k
      ), nt = !0);
    }
    if (k.select && $ !== void 0 && !ft)
      if (F && $ === (z == null ? void 0 : z.data) && k.select === O(this, Is))
        $ = O(this, Zi);
      else
        try {
          q(this, Is, k.select), $ = k.select($), $ = na(F == null ? void 0 : F.data, $, k), q(this, Zi, $), q(this, ii, null);
        } catch (kt) {
          q(this, ii, kt);
        }
    O(this, ii) && (K = O(this, ii), $ = O(this, Zi), J = Date.now(), _ = "error");
    const H = U.fetchStatus === "fetching", tt = _ === "pending", ht = _ === "error", xt = tt && H, It = $ !== void 0, E = {
      status: _,
      fetchStatus: U.fetchStatus,
      isPending: tt,
      isSuccess: _ === "success",
      isError: ht,
      isInitialLoading: xt,
      isLoading: xt,
      data: $,
      dataUpdatedAt: U.dataUpdatedAt,
      error: K,
      errorUpdatedAt: J,
      failureCount: U.fetchFailureCount,
      failureReason: U.fetchFailureReason,
      errorUpdateCount: U.errorUpdateCount,
      isFetched: U.dataUpdateCount > 0 || U.errorUpdateCount > 0,
      isFetchedAfterMount: U.dataUpdateCount > rt.dataUpdateCount || U.errorUpdateCount > rt.errorUpdateCount,
      isFetching: H,
      isRefetching: H && !tt,
      isLoadingError: ht && !It,
      isPaused: U.fetchStatus === "paused",
      isPlaceholderData: nt,
      isRefetchError: ht && It,
      isStale: va(f, k),
      refetch: this.refetch,
      promise: O(this, ei)
    };
    if (this.options.experimental_prefetchInRender) {
      const kt = (ri) => {
        E.status === "error" ? ri.reject(E.error) : E.data !== void 0 && ri.resolve(E.data);
      }, $t = () => {
        const ri = q(this, ei, E.promise = la());
        kt(ri);
      }, se = O(this, ei);
      switch (se.status) {
        case "pending":
          f.queryHash === C.queryHash && kt(se);
          break;
        case "fulfilled":
          (E.status === "error" || E.data !== se.value) && $t();
          break;
        case "rejected":
          (E.status !== "error" || E.error !== se.reason) && $t();
          break;
      }
    }
    return E;
  }
  updateResult() {
    const f = O(this, Zt), k = this.createResult(O(this, yt), this.options);
    if (q(this, wi, O(this, yt).state), q(this, _i, this.options), O(this, wi).data !== void 0 && q(this, Ji, O(this, yt)), oa(k, f))
      return;
    q(this, Zt, k);
    const C = () => {
      if (!f)
        return !0;
      const { notifyOnChangeProps: I } = this.options, F = typeof I == "function" ? I() : I;
      if (F === "all" || !F && !O(this, ts).size)
        return !0;
      const z = new Set(
        F ?? O(this, ts)
      );
      return this.options.throwOnError && z.add("error"), Object.keys(O(this, Zt)).some((W) => {
        const Y = W;
        return O(this, Zt)[Y] !== f[Y] && z.has(Y);
      });
    };
    mt(this, wt, Eh).call(this, { listeners: C() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && mt(this, wt, ua).call(this);
  }
}, Jt = new WeakMap(), yt = new WeakMap(), Es = new WeakMap(), Zt = new WeakMap(), wi = new WeakMap(), _i = new WeakMap(), ei = new WeakMap(), ii = new WeakMap(), Is = new WeakMap(), Zi = new WeakMap(), Ji = new WeakMap(), ki = new WeakMap(), Si = new WeakMap(), si = new WeakMap(), ts = new WeakMap(), wt = new WeakSet(), Ts = function(f) {
  mt(this, wt, ga).call(this);
  let k = O(this, yt).fetch(
    this.options,
    f
  );
  return f != null && f.throwOnError || (k = k.catch(ce)), k;
}, ha = function() {
  mt(this, wt, pa).call(this);
  const f = ji(
    this.options.staleTime,
    O(this, yt)
  );
  if (Mi || O(this, Zt).isStale || !ra(f))
    return;
  const C = Sh(O(this, Zt).dataUpdatedAt, f) + 1;
  q(this, ki, setTimeout(() => {
    O(this, Zt).isStale || this.updateResult();
  }, C));
}, da = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(O(this, yt)) : this.options.refetchInterval) ?? !1;
}, ca = function(f) {
  mt(this, wt, fa).call(this), q(this, si, f), !(Mi || be(this.options.enabled, O(this, yt)) === !1 || !ra(O(this, si)) || O(this, si) === 0) && q(this, Si, setInterval(() => {
    (this.options.refetchIntervalInBackground || ba.isFocused()) && mt(this, wt, Ts).call(this);
  }, O(this, si)));
}, ua = function() {
  mt(this, wt, ha).call(this), mt(this, wt, ca).call(this, mt(this, wt, da).call(this));
}, pa = function() {
  O(this, ki) && (clearTimeout(O(this, ki)), q(this, ki, void 0));
}, fa = function() {
  O(this, Si) && (clearInterval(O(this, Si)), q(this, Si, void 0));
}, ga = function() {
  const f = O(this, Jt).getQueryCache().build(O(this, Jt), this.options);
  if (f === O(this, yt))
    return;
  const k = O(this, yt);
  q(this, yt, f), q(this, Es, f.state), this.hasListeners() && (k == null || k.removeObserver(this), f.addObserver(this));
}, Eh = function(f) {
  Ut.batch(() => {
    f.listeners && this.listeners.forEach((k) => {
      k(O(this, Zt));
    }), O(this, Jt).getQueryCache().notify({
      query: O(this, yt),
      type: "observerResultsUpdated"
    });
  });
}, wh);
function Dg(b, f) {
  return be(f.enabled, b) !== !1 && b.state.data === void 0 && !(b.state.status === "error" && f.retryOnMount === !1);
}
function oh(b, f) {
  return Dg(b, f) || b.state.data !== void 0 && ma(b, f, f.refetchOnMount);
}
function ma(b, f, k) {
  if (be(f.enabled, b) !== !1) {
    const C = typeof k == "function" ? k(b) : k;
    return C === "always" || C !== !1 && va(b, f);
  }
  return !1;
}
function ah(b, f, k, C) {
  return (b !== f || be(C.enabled, b) === !1) && (!k.suspense || b.state.status !== "error") && va(b, k);
}
function va(b, f) {
  return be(f.enabled, b) !== !1 && b.isStaleByTime(ji(f.staleTime, b));
}
function Bg(b, f) {
  return !oa(b.getCurrentResult(), f);
}
var Ih = ue.createContext(
  void 0
), Ng = (b) => {
  const f = ue.useContext(Ih);
  if (!f)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return f;
}, zg = ({
  client: b,
  children: f
}) => (ue.useEffect(() => (b.mount(), () => {
  b.unmount();
}), [b]), /* @__PURE__ */ te.jsx(Ih.Provider, { value: b, children: f })), Rh = ue.createContext(!1), Fg = () => ue.useContext(Rh);
Rh.Provider;
function Wg() {
  let b = !1;
  return {
    clearReset: () => {
      b = !1;
    },
    reset: () => {
      b = !0;
    },
    isReset: () => b
  };
}
var Hg = ue.createContext(Wg()), jg = () => ue.useContext(Hg);
function Xg(b, f) {
  return typeof b == "function" ? b(...f) : !!b;
}
function nh() {
}
var Gg = (b, f) => {
  (b.suspense || b.throwOnError || b.experimental_prefetchInRender) && (f.isReset() || (b.retryOnMount = !1));
}, Yg = (b) => {
  ue.useEffect(() => {
    b.clearReset();
  }, [b]);
}, Ug = ({
  result: b,
  errorResetBoundary: f,
  throwOnError: k,
  query: C,
  suspense: I
}) => b.isError && !f.isReset() && !b.isFetching && C && (I && b.data === void 0 || Xg(k, [b.error, C])), qg = (b) => {
  const f = b.staleTime;
  b.suspense && (b.staleTime = typeof f == "function" ? (...k) => Math.max(f(...k), 1e3) : Math.max(f ?? 1e3, 1e3), typeof b.gcTime == "number" && (b.gcTime = Math.max(b.gcTime, 1e3)));
}, $g = (b, f) => b.isLoading && b.isFetching && !f, Vg = (b, f) => (b == null ? void 0 : b.suspense) && f.isPending, lh = (b, f, k) => f.fetchOptimistic(b).catch(() => {
  k.clearReset();
});
function Kg(b, f, k) {
  var U, nt, $, K, J;
  const C = Ng(), I = Fg(), F = jg(), z = C.defaultQueryOptions(b);
  (nt = (U = C.getDefaultOptions().queries) == null ? void 0 : U._experimental_beforeQuery) == null || nt.call(
    U,
    z
  ), z._optimisticResults = I ? "isRestoring" : "optimistic", qg(z), Gg(z, F), Yg(F);
  const W = !C.getQueryCache().get(z.queryHash), [Y] = ue.useState(
    () => new f(
      C,
      z
    )
  ), rt = Y.getOptimisticResult(z), st = !I && b.subscribed !== !1;
  if (ue.useSyncExternalStore(
    ue.useCallback(
      (_) => {
        const ft = st ? Y.subscribe(Ut.batchCalls(_)) : nh;
        return Y.updateResult(), ft;
      },
      [Y, st]
    ),
    () => Y.getCurrentResult(),
    () => Y.getCurrentResult()
  ), ue.useEffect(() => {
    Y.setOptions(z);
  }, [z, Y]), Vg(z, rt))
    throw lh(z, Y, F);
  if (Ug({
    result: rt,
    errorResetBoundary: F,
    throwOnError: z.throwOnError,
    query: C.getQueryCache().get(z.queryHash),
    suspense: z.suspense
  }))
    throw rt.error;
  if ((K = ($ = C.getDefaultOptions().queries) == null ? void 0 : $._experimental_afterQuery) == null || K.call(
    $,
    z,
    rt
  ), z.experimental_prefetchInRender && !Mi && $g(rt, I)) {
    const _ = W ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      lh(z, Y, F)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      (J = C.getQueryCache().get(z.queryHash)) == null ? void 0 : J.promise
    );
    _ == null || _.catch(nh).finally(() => {
      Y.updateResult();
    });
  }
  return z.notifyOnChangeProps ? rt : Y.trackResult(rt);
}
function Qg(b, f) {
  return Kg(b, Rg);
}
const Be = {
  // Status colors
  NORMAL: "#00adef",
  WARNING: "#ffde68",
  ERROR: "#f06280",
  OFFLINE: "#8b8b8b",
  INCOMPLETE: "#ff8c38",
  // UI colors
  TOOLTIP_BORDER: "#8ae"
}, hh = {
  PIE: {
    SIZE: "100%",
    BORDER_WIDTH: 1
  }
}, _g = {
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
    borderColor: Be.TOOLTIP_BORDER
  },
  accessibility: {
    point: {
      valueSuffix: "%"
    }
  }
}, Zg = (b) => ({
  ..._g,
  plotOptions: {
    pie: {
      size: hh.PIE.SIZE,
      dataLabels: {
        enabled: !0,
        format: "<b>{point.name}</b> : {point.y}"
      },
      borderWidth: hh.PIE.BORDER_WIDTH,
      cursor: "pointer"
    }
  },
  series: [
    {
      type: "pie",
      data: b
    }
  ]
}), Jg = (b) => {
  const {
    onRunCnt: f,
    onWarnCnt: k,
    onErrCnt: C,
    disconRunCnt: I,
    disconWarnCnt: F,
    disconErrCnt: z,
    offlineCnt: W,
    stdCnt: Y
  } = b, rt = (nt, $, K) => ({
    name: nt,
    y: $,
    color: K
  }), st = [
    rt("Normal", f, Be.NORMAL),
    rt("Warning", k, Be.WARNING),
    rt("Error", C, Be.ERROR)
  ], U = [
    rt("Normal", I, Be.NORMAL),
    rt("Warning", F, Be.WARNING),
    rt("Error", z, Be.ERROR),
    rt("Offline", W, Be.OFFLINE),
    rt("Incomplete", Y, Be.INCOMPLETE)
  ];
  return {
    onlineSeriesList: st,
    offlineSeriesList: U
  };
};
var Er = { exports: {} }, tm = Er.exports, dh;
function em() {
  return dh || (dh = 1, function(b, f) {
    (function(k, C) {
      k._Highcharts = C(), b.exports = k._Highcharts;
    })(typeof window > "u" ? tm : window, () => (() => {
      var Vl;
      let k, C;
      var I, F, z, W, Y, rt, st, U, nt, $, K, J, _, ft, H, tt, ht, xt, It = {};
      It.d = (h, t) => {
        for (var e in t) It.o(t, e) && !It.o(h, e) && Object.defineProperty(h, e, { enumerable: !0, get: t[e] });
      }, It.o = (h, t) => Object.prototype.hasOwnProperty.call(h, t);
      var pe = {};
      It.d(pe, { default: () => Qf }), function(h) {
        var t, e, i, s, r, o, a;
        h.SVG_NS = "http://www.w3.org/2000/svg", h.product = "Highcharts", h.version = "12.2.0", h.win = typeof window < "u" ? window : {}, h.doc = h.win.document, h.svg = !!((i = (e = (t = h.doc) == null ? void 0 : t.createElementNS) == null ? void 0 : e.call(t, h.SVG_NS, "svg")) != null && i.createSVGRect), h.pageLang = (o = (r = (s = h.doc) == null ? void 0 : s.documentElement) == null ? void 0 : r.closest("[lang]")) == null ? void 0 : o.lang, h.userAgent = ((a = h.win.navigator) == null ? void 0 : a.userAgent) || "", h.isChrome = h.win.chrome, h.isFirefox = h.userAgent.indexOf("Firefox") !== -1, h.isMS = /(edge|msie|trident)/i.test(h.userAgent) && !h.win.opera, h.isSafari = !h.isChrome && h.userAgent.indexOf("Safari") !== -1, h.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(h.userAgent), h.isWebKit = h.userAgent.indexOf("AppleWebKit") !== -1, h.deg2rad = 2 * Math.PI / 360, h.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"], h.noop = function() {
        }, h.supportsPassiveEvents = function() {
          let n = !1;
          if (!h.isMS) {
            let l = Object.defineProperty({}, "passive", { get: function() {
              n = !0;
            } });
            h.win.addEventListener && h.win.removeEventListener && (h.win.addEventListener("testPassive", h.noop, l), h.win.removeEventListener("testPassive", h.noop, l));
          }
          return n;
        }(), h.charts = [], h.composed = [], h.dateFormats = {}, h.seriesTypes = {}, h.symbolSizes = {}, h.chartCount = 0;
      }(I || (I = {}));
      let E = I, { charts: Ct, doc: kt, win: $t } = E;
      function se(h, t, e, i) {
        let s = t ? "Highcharts error" : "Highcharts warning";
        h === 32 && (h = `${s}: Deprecated member`);
        let r = Nr(h), o = r ? `${s} #${h}: www.highcharts.com/errors/${h}/` : h.toString();
        if (i !== void 0) {
          let a = "";
          r && (o += "?"), oi(i, function(n, l) {
            a += `
 - ${l}: ${n}`, r && (o += encodeURI(l) + "=" + encodeURI(n));
          }), o += a;
        }
        Aa(E, "displayError", { chart: e, code: h, message: o, params: i }, function() {
          if (t) throw Error(o);
          $t.console && se.messages.indexOf(o) === -1 && console.warn(o);
        }), se.messages.push(o);
      }
      function ri(h, t) {
        return parseInt(h, t || 10);
      }
      function es(h) {
        return typeof h == "string";
      }
      function Ds(h) {
        let t = Object.prototype.toString.call(h);
        return t === "[object Array]" || t === "[object Array Iterator]";
      }
      function Ci(h, t) {
        return !!h && typeof h == "object" && (!t || !Ds(h));
      }
      function Br(h) {
        return Ci(h) && typeof h.nodeType == "number";
      }
      function wa(h) {
        let t = h == null ? void 0 : h.constructor;
        return !!(Ci(h, !0) && !Br(h) && (t != null && t.name) && t.name !== "Object");
      }
      function Nr(h) {
        return typeof h == "number" && !isNaN(h) && h < 1 / 0 && h > -1 / 0;
      }
      function Ti(h) {
        return h != null;
      }
      function ka(h, t, e) {
        let i, s = es(t) && !Ti(e), r = (o, a) => {
          Ti(o) ? h.setAttribute(a, o) : s ? (i = h.getAttribute(a)) || a !== "class" || (i = h.getAttribute(a + "Name")) : h.removeAttribute(a);
        };
        return es(t) ? r(e, t) : oi(t, r), i;
      }
      function Sa(h) {
        return Ds(h) ? h : [h];
      }
      function Ai(h, t) {
        let e;
        for (e in h || (h = {}), t) h[e] = t[e];
        return h;
      }
      function is() {
        let h = arguments, t = h.length;
        for (let e = 0; e < t; e++) {
          let i = h[e];
          if (i != null) return i;
        }
      }
      function zr(h, t) {
        Ai(h.style, t);
      }
      function Ma(h) {
        return Math.pow(10, Math.floor(Math.log(h) / Math.LN10));
      }
      function Ca(h, t) {
        return h > 1e14 ? h : parseFloat(h.toPrecision(t || 14));
      }
      (se || (se = {})).messages = [], Math.easeInOutSine = function(h) {
        return -0.5 * (Math.cos(Math.PI * h) - 1);
      };
      let Dh = Array.prototype.find ? function(h, t) {
        return h.find(t);
      } : function(h, t) {
        let e, i = h.length;
        for (e = 0; e < i; e++) if (t(h[e], e)) return h[e];
      };
      function oi(h, t, e) {
        for (let i in h) Object.hasOwnProperty.call(h, i) && t.call(e || h[i], h[i], i, h);
      }
      function Ta(h, t, e) {
        function i(o, a) {
          let n = h.removeEventListener;
          n && n.call(h, o, a, !1);
        }
        function s(o) {
          let a, n;
          h.nodeName && (t ? (a = {})[t] = !0 : a = o, oi(a, function(l, c) {
            if (o[c]) for (n = o[c].length; n--; ) i(c, o[c][n].fn);
          }));
        }
        let r = typeof h == "function" && h.prototype || h;
        if (Object.hasOwnProperty.call(r, "hcEvents")) {
          let o = r.hcEvents;
          if (t) {
            let a = o[t] || [];
            e ? (o[t] = a.filter(function(n) {
              return e !== n.fn;
            }), i(t, e)) : (s(o), o[t] = []);
          } else s(o), delete r.hcEvents;
        }
      }
      function Aa(h, t, e, i) {
        if (e = e || {}, (kt == null ? void 0 : kt.createEvent) && (h.dispatchEvent || h.fireEvent && h !== E)) {
          let s = kt.createEvent("Events");
          s.initEvent(t, !0, !0), e = Ai(s, e), h.dispatchEvent ? h.dispatchEvent(e) : h.fireEvent(t, e);
        } else if (h.hcEvents) {
          e.target || Ai(e, { preventDefault: function() {
            e.defaultPrevented = !0;
          }, target: h, type: t });
          let s = [], r = h, o = !1;
          for (; r.hcEvents; ) Object.hasOwnProperty.call(r, "hcEvents") && r.hcEvents[t] && (s.length && (o = !0), s.unshift.apply(s, r.hcEvents[t])), r = Object.getPrototypeOf(r);
          o && s.sort((a, n) => a.order - n.order), s.forEach((a) => {
            a.fn.call(h, e) === !1 && e.preventDefault();
          });
        }
        i && !e.defaultPrevented && i.call(h, e);
      }
      let Bh = function() {
        let h = Math.random().toString(36).substring(2, 9) + "-", t = 0;
        return function() {
          return "highcharts-" + (k ? "" : h) + t++;
        };
      }();
      $t.jQuery && ($t.jQuery.fn.highcharts = function() {
        let h = [].slice.call(arguments);
        if (this[0]) return h[0] ? (new E[es(h[0]) ? h.shift() : "Chart"](this[0], h[0], h[1]), this) : Ct[ka(this[0], "data-highcharts-chart")];
      });
      let V = { addEvent: function(h, t, e, i = {}) {
        let s = typeof h == "function" && h.prototype || h;
        Object.hasOwnProperty.call(s, "hcEvents") || (s.hcEvents = {});
        let r = s.hcEvents;
        E.Point && h instanceof E.Point && h.series && h.series.chart && (h.series.chart.runTrackerClick = !0);
        let o = h.addEventListener;
        o && o.call(h, t, e, !!E.supportsPassiveEvents && { passive: i.passive === void 0 ? t.indexOf("touch") !== -1 : i.passive, capture: !1 }), r[t] || (r[t] = []);
        let a = { fn: e, order: typeof i.order == "number" ? i.order : 1 / 0 };
        return r[t].push(a), r[t].sort((n, l) => n.order - l.order), function() {
          Ta(h, t, e);
        };
      }, arrayMax: function(h) {
        let t = h.length, e = h[0];
        for (; t--; ) h[t] > e && (e = h[t]);
        return e;
      }, arrayMin: function(h) {
        let t = h.length, e = h[0];
        for (; t--; ) h[t] < e && (e = h[t]);
        return e;
      }, attr: ka, clamp: function(h, t, e) {
        return h > t ? h < e ? h : e : t;
      }, clearTimeout: function(h) {
        Ti(h) && clearTimeout(h);
      }, correctFloat: Ca, createElement: function(h, t, e, i, s) {
        let r = kt.createElement(h);
        return t && Ai(r, t), s && zr(r, { padding: "0", border: "none", margin: "0" }), e && zr(r, e), i && i.appendChild(r), r;
      }, crisp: function(h, t = 0, e) {
        let i = t % 2 / 2, s = e ? -1 : 1;
        return (Math.round(h * s - i) + i) * s;
      }, css: zr, defined: Ti, destroyObjectProperties: function(h, t, e) {
        oi(h, function(i, s) {
          i !== t && (i != null && i.destroy) && i.destroy(), (i != null && i.destroy || !e) && delete h[s];
        });
      }, diffObjects: function(h, t, e, i) {
        let s = {};
        return function r(o, a, n, l) {
          let c = e ? a : o;
          oi(o, function(d, u) {
            if (!l && i && i.indexOf(u) > -1 && a[u]) {
              d = Sa(d), n[u] = [];
              for (let p = 0; p < Math.max(d.length, a[u].length); p++) a[u][p] && (d[p] === void 0 ? n[u][p] = a[u][p] : (n[u][p] = {}, r(d[p], a[u][p], n[u][p], l + 1)));
            } else Ci(d, !0) && !d.nodeType ? (n[u] = Ds(d) ? [] : {}, r(d, a[u] || {}, n[u], l + 1), Object.keys(n[u]).length === 0 && (u !== "colorAxis" || l !== 0) && delete n[u]) : (o[u] !== a[u] || u in o && !(u in a)) && u !== "__proto__" && u !== "constructor" && (n[u] = c[u]);
          });
        }(h, t, s, 0), s;
      }, discardElement: function(h) {
        var t;
        (t = h == null ? void 0 : h.parentElement) == null || t.removeChild(h);
      }, erase: function(h, t) {
        let e = h.length;
        for (; e--; ) if (h[e] === t) {
          h.splice(e, 1);
          break;
        }
      }, error: se, extend: Ai, extendClass: function(h, t) {
        let e = function() {
        };
        return e.prototype = new h(), Ai(e.prototype, t), e;
      }, find: Dh, fireEvent: Aa, getAlignFactor: (h = "") => ({ center: 0.5, right: 1, middle: 0.5, bottom: 1 })[h] || 0, getClosestDistance: function(h, t) {
        let e, i, s, r = !t;
        return h.forEach((o) => {
          if (o.length > 1) for (s = o.length - 1; s > 0; s--) (i = o[s] - o[s - 1]) < 0 && !r ? (t == null || t(), t = void 0) : i && (e === void 0 || i < e) && (e = i);
        }), e;
      }, getMagnitude: Ma, getNestedProperty: function(h, t) {
        let e = h.split(".");
        for (; e.length && Ti(t); ) {
          let i = e.shift();
          if (i === void 0 || i === "__proto__") return;
          if (i === "this") {
            let r;
            return Ci(t) && (r = t["@this"]), r ?? t;
          }
          let s = t[i.replace(/[\\'"]/g, "")];
          if (!Ti(s) || typeof s == "function" || typeof s.nodeType == "number" || s === $t) return;
          t = s;
        }
        return t;
      }, getStyle: function h(t, e, i) {
        var o;
        let s;
        if (e === "width") {
          let a = Math.min(t.offsetWidth, t.scrollWidth), n = (o = t.getBoundingClientRect) == null ? void 0 : o.call(t).width;
          return n < a && n >= a - 1 && (a = Math.floor(n)), Math.max(0, a - (h(t, "padding-left", !0) || 0) - (h(t, "padding-right", !0) || 0));
        }
        if (e === "height") return Math.max(0, Math.min(t.offsetHeight, t.scrollHeight) - (h(t, "padding-top", !0) || 0) - (h(t, "padding-bottom", !0) || 0));
        let r = $t.getComputedStyle(t, void 0);
        return r && (s = r.getPropertyValue(e), is(i, e !== "opacity") && (s = ri(s))), s;
      }, insertItem: function(h, t) {
        let e, i = h.options.index, s = t.length;
        for (e = h.options.isInternal ? s : 0; e < s + 1; e++) if (!t[e] || Nr(i) && i < is(t[e].options.index, t[e]._i) || t[e].options.isInternal) {
          t.splice(e, 0, h);
          break;
        }
        return e;
      }, isArray: Ds, isClass: wa, isDOMElement: Br, isFunction: function(h) {
        return typeof h == "function";
      }, isNumber: Nr, isObject: Ci, isString: es, merge: function(h, ...t) {
        let e, i = [h, ...t], s = {}, r = function(a, n) {
          return typeof a != "object" && (a = {}), oi(n, function(l, c) {
            c !== "__proto__" && c !== "constructor" && (!Ci(l, !0) || wa(l) || Br(l) ? a[c] = n[c] : a[c] = r(a[c] || {}, l));
          }), a;
        };
        h === !0 && (s = i[1], i = Array.prototype.slice.call(i, 2));
        let o = i.length;
        for (e = 0; e < o; e++) s = r(s, i[e]);
        return s;
      }, normalizeTickInterval: function(h, t, e, i, s) {
        let r, o = h;
        e = is(e, Ma(h));
        let a = h / e;
        for (!t && (t = s ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], i === !1 && (e === 1 ? t = t.filter(function(n) {
          return n % 1 == 0;
        }) : e <= 0.1 && (t = [1 / e]))), r = 0; r < t.length && (o = t[r], (!s || !(o * e >= h)) && (s || !(a <= (t[r] + (t[r + 1] || t[r])) / 2))); r++) ;
        return Ca(o * e, -Math.round(Math.log(1e-3) / Math.LN10));
      }, objectEach: oi, offset: function(h) {
        let t = kt.documentElement, e = h.parentElement || h.parentNode ? h.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
        return { top: e.top + ($t.pageYOffset || t.scrollTop) - (t.clientTop || 0), left: e.left + ($t.pageXOffset || t.scrollLeft) - (t.clientLeft || 0), width: e.width, height: e.height };
      }, pad: function(h, t, e) {
        return Array((t || 2) + 1 - String(h).replace("-", "").length).join(e || "0") + h;
      }, pick: is, pInt: ri, pushUnique: function(h, t) {
        return 0 > h.indexOf(t) && !!h.push(t);
      }, relativeLength: function(h, t, e) {
        return /%$/.test(h) ? t * parseFloat(h) / 100 + (e || 0) : parseFloat(h);
      }, removeEvent: Ta, replaceNested: function(h, ...t) {
        let e, i;
        do
          for (i of (e = h, t)) h = h.replace(i[0], i[1]);
        while (h !== e);
        return h;
      }, splat: Sa, stableSort: function(h, t) {
        let e, i, s = h.length;
        for (i = 0; i < s; i++) h[i].safeI = i;
        for (h.sort(function(r, o) {
          return (e = t(r, o)) === 0 ? r.safeI - o.safeI : e;
        }), i = 0; i < s; i++) delete h[i].safeI;
      }, syncTimeout: function(h, t, e) {
        return t > 0 ? setTimeout(h, t, e) : (h.call(0, e), -1);
      }, timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }, ucfirst: function(h) {
        return es(h) ? h.substring(0, 1).toUpperCase() + h.substring(1) : String(h);
      }, uniqueKey: Bh, useSerialIds: function(h) {
        return k = is(h, k);
      }, wrap: function(h, t, e) {
        let i = h[t];
        h[t] = function() {
          let s = arguments, r = this;
          return e.apply(this, [function() {
            return i.apply(r, arguments.length ? arguments : s);
          }].concat([].slice.call(arguments)));
        };
      } }, { pageLang: Nh, win: Bs } = E, { defined: Oa, error: Pa, extend: Fr, isNumber: La, isObject: Wr, isString: ss, merge: zh, objectEach: Fh, pad: ze, splat: Wh, timeUnits: Hr, ucfirst: Hh } = V, jh = E.isSafari && Bs.Intl && !Bs.Intl.DateTimeFormat.prototype.formatRange, Xh = (h) => h.main === void 0, Gh = class {
        constructor(h, t) {
          this.options = { timezone: "UTC" }, this.variableTimezone = !1, this.Date = Bs.Date, this.update(h), this.lang = t;
        }
        update(h = {}) {
          this.dTLCache = {}, this.options = h = zh(!0, this.options, h);
          let { timezoneOffset: t, useUTC: e } = h;
          this.Date = h.Date || Bs.Date || Date;
          let i = h.timezone;
          Oa(e) && (i = e ? "UTC" : void 0), t && t % 60 == 0 && (i = "Etc/GMT" + (t > 0 ? "+" : "") + t / 60), this.variableTimezone = i !== "UTC" && (i == null ? void 0 : i.indexOf("Etc/GMT")) !== 0, this.timezone = i, ["months", "shortMonths", "weekdays", "shortWeekdays"].forEach((s) => {
            let r = /months/i.test(s), o = /short/.test(s), a = { timeZone: "UTC" };
            a[r ? "month" : "weekday"] = o ? "short" : "long", this[s] = (r ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [3, 4, 5, 6, 7, 8, 9]).map((n) => this.dateFormat(a, (r ? 31 : 1) * 24 * 36e5 * n));
          });
        }
        toParts(h) {
          let [t, e, i, s, r, o, a] = this.dateTimeFormat({ weekday: "narrow", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }, h, "es").split(/(?:, | |\/|:)/g);
          return [s, +i - 1, e, r, o, a, Math.floor(Number(h) || 0) % 1e3, "DLMXJVS".indexOf(t)].map(Number);
        }
        dateTimeFormat(h, t, e = this.options.locale || Nh) {
          let i = JSON.stringify(h) + e;
          ss(h) && (h = this.str2dtf(h));
          let s = this.dTLCache[i];
          if (!s) {
            h.timeZone ?? (h.timeZone = this.timezone);
            try {
              s = new Intl.DateTimeFormat(e, h);
            } catch (r) {
              /Invalid time zone/i.test(r.message) ? (Pa(34), h.timeZone = "UTC", s = new Intl.DateTimeFormat(e, h)) : Pa(r.message, !1);
            }
          }
          return this.dTLCache[i] = s, (s == null ? void 0 : s.format(t)) || "";
        }
        str2dtf(h, t = {}) {
          let e = { L: { fractionalSecondDigits: 3 }, S: { second: "2-digit" }, M: { minute: "numeric" }, H: { hour: "2-digit" }, k: { hour: "numeric" }, E: { weekday: "narrow" }, a: { weekday: "short" }, A: { weekday: "long" }, d: { day: "2-digit" }, e: { day: "numeric" }, b: { month: "short" }, B: { month: "long" }, m: { month: "2-digit" }, o: { month: "numeric" }, y: { year: "2-digit" }, Y: { year: "numeric" } };
          return Object.keys(e).forEach((i) => {
            h.indexOf(i) !== -1 && Fr(t, e[i]);
          }), t;
        }
        makeTime(h, t, e = 1, i = 0, s, r, o) {
          let a = this.Date.UTC(h, t, e, i, s || 0, r || 0, o || 0);
          if (this.timezone !== "UTC") {
            let n = this.getTimezoneOffset(a);
            if (a += n, [2, 3, 8, 9, 10, 11].indexOf(t) !== -1 && (i < 5 || i > 20)) {
              let l = this.getTimezoneOffset(a);
              n !== l ? a += l - n : n - 36e5 !== this.getTimezoneOffset(a - 36e5) || jh || (a -= 36e5);
            }
          }
          return a;
        }
        parse(h) {
          if (!ss(h)) return h ?? void 0;
          let t = (h = h.replace(/\//g, "-").replace(/(GMT|UTC)/, "")).indexOf("Z") > -1 || /([+-][0-9]{2}):?[0-9]{2}$/.test(h), e = /^[0-9]{4}-[0-9]{2}(-[0-9]{2}|)$/.test(h);
          t || e || (h += "Z");
          let i = Date.parse(h);
          if (La(i)) return i + (!t || e ? this.getTimezoneOffset(i) : 0);
        }
        getTimezoneOffset(h) {
          if (this.timezone !== "UTC") {
            let [t, e, i, s, r = 0] = this.dateTimeFormat({ timeZoneName: "shortOffset" }, h, "en").split(/(GMT|:)/).map(Number), o = -(36e5 * (i + r / 60));
            if (La(o)) return o;
          }
          return 0;
        }
        dateFormat(h, t, e) {
          let i = this.lang;
          if (!Oa(t) || isNaN(t)) return (i == null ? void 0 : i.invalidDate) || "";
          if (ss(h = h ?? "%Y-%m-%d %H:%M:%S")) {
            let s, r = /%\[([a-zA-Z]+)\]/g;
            for (; s = r.exec(h); ) h = h.replace(s[0], this.dateTimeFormat(s[1], t, i == null ? void 0 : i.locale));
          }
          if (ss(h) && h.indexOf("%") !== -1) {
            let s = this, [r, o, a, n, l, c, d, u] = this.toParts(t), p = (i == null ? void 0 : i.weekdays) || this.weekdays, g = (i == null ? void 0 : i.shortWeekdays) || this.shortWeekdays, x = (i == null ? void 0 : i.months) || this.months, y = (i == null ? void 0 : i.shortMonths) || this.shortMonths;
            Fh(Fr({ a: g ? g[u] : p[u].substr(0, 3), A: p[u], d: ze(a), e: ze(a, 2, " "), w: u, v: (i == null ? void 0 : i.weekFrom) ?? "", b: y[o], B: x[o], m: ze(o + 1), o: o + 1, y: r.toString().substr(2, 2), Y: r, H: ze(n), k: n, I: ze(n % 12 || 12), l: n % 12 || 12, M: ze(l), p: n < 12 ? "AM" : "PM", P: n < 12 ? "am" : "pm", S: ze(c), L: ze(d, 3) }, E.dateFormats), function(m, v) {
              if (ss(h)) for (; h.indexOf("%" + v) !== -1; ) h = h.replace("%" + v, typeof m == "function" ? m.call(s, t) : m);
            });
          } else if (Wr(h)) {
            let s = (this.getTimezoneOffset(t) || 0) / 36e5, r = this.timezone || "Etc/GMT" + (s >= 0 ? "+" : "") + s, { prefix: o = "", suffix: a = "" } = h;
            h = o + this.dateTimeFormat(Fr({ timeZone: r }, h), t) + a;
          }
          return e ? Hh(h) : h;
        }
        resolveDTLFormat(h) {
          return Wr(h, !0) ? Wr(h, !0) && Xh(h) ? { main: h } : h : { main: (h = Wh(h))[0], from: h[1], to: h[2] };
        }
        getDateFormat(h, t, e, i) {
          let s = this.dateFormat("%m-%d %H:%M:%S.%L", t), r = "01-01 00:00:00.000", o = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, a = "millisecond", n = a;
          for (a in Hr) {
            if (h && h === Hr.week && +this.dateFormat("%w", t) === e && s.substr(6) === r.substr(6)) {
              a = "week";
              break;
            }
            if (h && Hr[a] > h) {
              a = n;
              break;
            }
            if (o[a] && s.substr(o[a]) !== r.substr(o[a])) break;
            a !== "week" && (n = a);
          }
          return this.resolveDTLFormat(i[a]).main;
        }
      }, { defined: Ea, extend: Yh, timeUnits: Bt } = V, jr = class extends Gh {
        getTimeTicks(h, t, e, i) {
          let s = this, r = [], o = {}, { count: a = 1, unitRange: n } = h, [l, c, d, u, p, g] = s.toParts(t), x = (t || 0) % 1e3, y;
          if (i ?? (i = 1), Ea(t)) {
            if (x = n >= Bt.second ? 0 : a * Math.floor(x / a), n >= Bt.second && (g = n >= Bt.minute ? 0 : a * Math.floor(g / a)), n >= Bt.minute && (p = n >= Bt.hour ? 0 : a * Math.floor(p / a)), n >= Bt.hour && (u = n >= Bt.day ? 0 : a * Math.floor(u / a)), n >= Bt.day && (d = n >= Bt.month ? 1 : Math.max(1, a * Math.floor(d / a))), n >= Bt.month && (c = n >= Bt.year ? 0 : a * Math.floor(c / a)), n >= Bt.year && (l -= l % a), n === Bt.week) {
              a && (t = s.makeTime(l, c, d, u, p, g, x));
              let w = this.dateTimeFormat({ timeZone: this.timezone, weekday: "narrow" }, t, "es"), T = "DLMXJVS".indexOf(w);
              d += -T + i + (T < i ? -7 : 0);
            }
            t = s.makeTime(l, c, d, u, p, g, x), s.variableTimezone && Ea(e) && (y = e - t > 4 * Bt.month || s.getTimezoneOffset(t) !== s.getTimezoneOffset(e));
            let m = t, v = 1;
            for (; m < e; ) r.push(m), n === Bt.year ? m = s.makeTime(l + v * a, 0) : n === Bt.month ? m = s.makeTime(l, c + v * a) : y && (n === Bt.day || n === Bt.week) ? m = s.makeTime(l, c, d + v * a * (n === Bt.day ? 1 : 7)) : y && n === Bt.hour && a > 1 ? m = s.makeTime(l, c, d, u + v * a) : m += n * a, v++;
            r.push(m), n <= Bt.hour && r.length < 1e4 && r.forEach((w) => {
              w % 18e5 == 0 && s.dateFormat("%H%M%S%L", w) === "000000000" && (o[w] = "day");
            });
          }
          return r.info = Yh(h, { higherRanks: o, totalRange: n * a }), r;
        }
      }, { isTouchDevice: Uh } = E, { fireEvent: qh, merge: $h } = V, Pe = { colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"], symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { weekFrom: "week from", chartTitle: "Chart title", locale: void 0, loading: "Loading...", months: void 0, seriesName: "Series {add index 1}", shortMonths: void 0, weekdays: void 0, numericSymbols: ["k", "M", "G", "T", "P", "E"], pieSliceName: "Slice", resetZoom: "Reset zoom", yAxisTitle: "Values", resetZoomTitle: "Reset zoom level 1:1" }, global: { buttonTheme: { fill: "#f7f7f7", padding: 8, r: 2, stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontSize: "0.8em", fontWeight: "normal" }, states: { hover: { fill: "#e6e6e6" }, select: { fill: "#e6e9ff", style: { color: "#000000", fontWeight: "bold" } }, disabled: { style: { color: "#cccccc" } } } } }, time: { Date: void 0, timezone: "UTC", timezoneOffset: 0, useUTC: void 0 }, chart: { alignThresholds: !1, panning: { enabled: !1, type: "x" }, styledMode: !1, borderRadius: 0, colorCount: 10, allowMutatingData: !0, ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: {}, position: {} }, reflow: !0, type: "line", zooming: { singleTouch: !1, resetButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } } }, width: null, height: null, borderColor: "#334eff", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { style: { color: "#333333", fontWeight: "bold" }, text: "Chart title", margin: 15, minScale: 0.67 }, subtitle: { style: { color: "#666666", fontSize: "0.8em" }, text: "" }, caption: { margin: 15, style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, legend: { enabled: !0, align: "center", alignColumns: !0, className: "highcharts-no-tooltip", events: {}, layout: "horizontal", itemMarginBottom: 2, itemMarginTop: 2, labelFormatter: function() {
        return this.name;
      }, borderColor: "#999999", borderRadius: 0, navigation: { style: { fontSize: "0.8em" }, activeColor: "#0022ff", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "0.8em", textDecoration: "none", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#666666", textDecoration: "line-through" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontSize: "0.8em", fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } }, tooltip: { enabled: !0, animation: { duration: 300, easing: (h) => Math.sqrt(1 - Math.pow(h - 1, 2)) }, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%[AebHMSL]", second: "%[AebHMS]", minute: "%[AebHM]", hour: "%[AebHM]", day: "%[AebY]", week: "%v %[AebY]", month: "%[BY]", year: "%Y" }, footerFormat: "", headerShape: "callout", hideDelay: 500, padding: 8, position: { x: 0, y: 3 }, shared: !1, snap: Uh ? 25 : 10, headerFormat: '<span style="font-size: 0.8em">{ucfirst point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: "#ffffff", borderWidth: void 0, stickOnContact: !1, style: { color: "#333333", cursor: "default", fontSize: "0.8em" }, useHTML: !1 }, credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" }, text: "Highcharts.com" } }, Xr = new jr(Pe.time, Pe.lang), re = { defaultOptions: Pe, defaultTime: Xr, getOptions: function() {
        return Pe;
      }, setOptions: function(h) {
        var t;
        return qh(E, "setOptions", { options: h }), $h(!0, Pe, h), h.time && Xr.update(Pe.time), h.lang && "locale" in h.lang && Xr.update({ locale: h.lang.locale }), (t = h.lang) != null && t.chartTitle && (Pe.title = { ...Pe.title, text: h.lang.chartTitle }), Pe;
      } }, { win: Vh } = E, { isNumber: rs, isString: Kh, merge: Qh, pInt: Vt, defined: Ia } = V, Ra = (h, t, e) => `color-mix(in srgb,${h},${t} ${100 * e}%)`, Gr = (h) => Kh(h) && !!h && h !== "none";
      class At {
        static parse(t) {
          return t ? new At(t) : At.None;
        }
        constructor(t) {
          let e, i, s, r;
          this.rgba = [NaN, NaN, NaN, NaN], this.input = t;
          let o = E.Color;
          if (o && o !== At) return new o(t);
          if (typeof t == "object" && t.stops !== void 0) this.stops = t.stops.map((a) => new At(a[1]));
          else if (typeof t == "string") for (this.input = t = At.names[t.toLowerCase()] || t, s = At.parsers.length; s-- && !i; ) (e = (r = At.parsers[s]).regex.exec(t)) && (i = r.parse(e));
          i && (this.rgba = i);
        }
        get(t) {
          let e = this.input, i = this.rgba;
          if (this.output) return this.output;
          if (typeof e == "object" && this.stops !== void 0) {
            let s = Qh(e);
            return s.stops = [].slice.call(s.stops), this.stops.forEach((r, o) => {
              s.stops[o] = [s.stops[o][0], r.get(t)];
            }), s;
          }
          return i && rs(i[0]) ? t !== "rgb" && (t || i[3] !== 1) ? t === "a" ? `${i[3]}` : "rgba(" + i.join(",") + ")" : "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")" : e;
        }
        brighten(t) {
          let e = this.rgba;
          if (this.stops) this.stops.forEach(function(i) {
            i.brighten(t);
          });
          else if (rs(t) && t !== 0)
            if (rs(e[0])) for (let i = 0; i < 3; i++) e[i] += Vt(255 * t), e[i] < 0 && (e[i] = 0), e[i] > 255 && (e[i] = 255);
            else At.useColorMix && Gr(this.input) && (this.output = Ra(this.input, t > 0 ? "white" : "black", Math.abs(t)));
          return this;
        }
        setOpacity(t) {
          return this.rgba[3] = t, this;
        }
        tweenTo(t, e) {
          let i = this.rgba, s = t.rgba;
          if (!rs(i[0]) || !rs(s[0])) return At.useColorMix && Gr(this.input) && Gr(t.input) && e < 0.99 ? Ra(this.input, t.input, e) : t.input || "none";
          let r = s[3] !== 1 || i[3] !== 1, o = (n, l) => n + (i[l] - n) * (1 - e), a = s.slice(0, 3).map(o).map(Math.round);
          return r && a.push(o(s[3], 3)), (r ? "rgba(" : "rgb(") + a.join(",") + ")";
        }
      }
      At.names = { white: "#ffffff", black: "#000000" }, At.parsers = [{ regex: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?(?:\.\d+)?)\s*\)/, parse: function(h) {
        return [Vt(h[1]), Vt(h[2]), Vt(h[3]), parseFloat(h[4], 10)];
      } }, { regex: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/, parse: function(h) {
        return [Vt(h[1]), Vt(h[2]), Vt(h[3]), 1];
      } }, { regex: /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i, parse: function(h) {
        return [Vt(h[1] + h[1], 16), Vt(h[2] + h[2], 16), Vt(h[3] + h[3], 16), Ia(h[4]) ? Vt(h[4] + h[4], 16) / 255 : 1];
      } }, { regex: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i, parse: function(h) {
        return [Vt(h[1], 16), Vt(h[2], 16), Vt(h[3], 16), Ia(h[4]) ? Vt(h[4], 16) / 255 : 1];
      } }], At.useColorMix = (Vl = Vh.CSS) == null ? void 0 : Vl.supports("color", "color-mix(in srgb,red,blue 9%)"), At.None = new At("");
      let { parse: Da } = At, { win: _h } = E, { isNumber: Yr, objectEach: Zh } = V;
      class Kt {
        constructor(t, e, i) {
          this.pos = NaN, this.options = e, this.elem = t, this.prop = i;
        }
        dSetter() {
          let t = this.paths, e = t == null ? void 0 : t[0], i = t == null ? void 0 : t[1], s = this.now || 0, r = [];
          if (s !== 1 && e && i)
            if (e.length === i.length && s < 1) for (let o = 0; o < i.length; o++) {
              let a = e[o], n = i[o], l = [];
              for (let c = 0; c < n.length; c++) {
                let d = a[c], u = n[c];
                Yr(d) && Yr(u) && (n[0] !== "A" || c !== 4 && c !== 5) ? l[c] = d + s * (u - d) : l[c] = u;
              }
              r.push(l);
            }
            else r = i;
          else r = this.toD || [];
          this.elem.attr("d", r, void 0, !0);
        }
        update() {
          let t = this.elem, e = this.prop, i = this.now, s = this.options.step;
          this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i, null, !0) : t.style[e] = i + this.unit, s && s.call(t, i, this);
        }
        run(t, e, i) {
          let s = this, r = s.options, o = function(l) {
            return !o.stopped && s.step(l);
          }, a = _h.requestAnimationFrame || function(l) {
            setTimeout(l, 13);
          }, n = function() {
            for (let l = 0; l < Kt.timers.length; l++) Kt.timers[l]() || Kt.timers.splice(l--, 1);
            Kt.timers.length && a(n);
          };
          t !== e || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +/* @__PURE__ */ new Date(), this.start = t, this.end = e, this.unit = i, this.now = this.start, this.pos = 0, o.elem = this.elem, o.prop = this.prop, o() && Kt.timers.push(o) === 1 && a(n)) : (delete r.curAnim[this.prop], r.complete && Object.keys(r.curAnim).length === 0 && r.complete.call(this.elem));
        }
        step(t) {
          let e, i, s = +/* @__PURE__ */ new Date(), r = this.options, o = this.elem, a = r.complete, n = r.duration, l = r.curAnim;
          return o.attr && !o.element ? e = !1 : t || s >= n + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), l[this.prop] = !0, i = !0, Zh(l, function(c) {
            c !== !0 && (i = !1);
          }), i && a && a.call(o), e = !1) : (this.pos = r.easing((s - this.startTime) / n), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e = !0), e;
        }
        initPath(t, e, i) {
          let s = t.startX, r = t.endX, o = i.slice(), a = t.isArea, n = a ? 2 : 1, l = e && i.length > e.length && i.hasStackedCliffs, c, d, u, p, g = e == null ? void 0 : e.slice();
          if (!g || l) return [o, o];
          function x(m, v) {
            for (; m.length < d; ) {
              let w = m[0], T = v[d - m.length];
              if (T && w[0] === "M" && (T[0] === "C" ? m[0] = ["C", w[1], w[2], w[1], w[2], w[1], w[2]] : m[0] = ["L", w[1], w[2]]), m.unshift(w), a) {
                let S = m.pop();
                m.push(m[m.length - 1], S);
              }
            }
          }
          function y(m) {
            for (; m.length < d; ) {
              let v = m[Math.floor(m.length / n) - 1].slice();
              if (v[0] === "C" && (v[1] = v[5], v[2] = v[6]), a) {
                let w = m[Math.floor(m.length / n)].slice();
                m.splice(m.length / 2, 0, v, w);
              } else m.push(v);
            }
          }
          if (s && r && r.length) {
            for (u = 0; u < s.length; u++) {
              if (s[u] === r[0]) {
                c = u;
                break;
              }
              if (s[0] === r[r.length - s.length + u]) {
                c = u, p = !0;
                break;
              }
              if (s[s.length - 1] === r[r.length - s.length + u]) {
                c = s.length - u;
                break;
              }
            }
            c === void 0 && (g = []);
          }
          return g.length && Yr(c) && (d = o.length + c * n, p ? (x(g, o), y(o)) : (x(o, g), y(g))), [g, o];
        }
        fillSetter() {
          Kt.prototype.strokeSetter.apply(this, arguments);
        }
        strokeSetter() {
          this.elem.attr(this.prop, Da(this.start).tweenTo(Da(this.end), this.pos), void 0, !0);
        }
      }
      Kt.timers = [];
      let { defined: Jh, getStyle: td, isArray: ed, isNumber: id, isObject: Ur, merge: Ba, objectEach: sd, pick: rd } = V;
      function qr(h) {
        return Ur(h) ? Ba({ duration: 500, defer: 0 }, h) : { duration: 500 * !!h, defer: 0 };
      }
      function Na(h, t) {
        let e = Kt.timers.length;
        for (; e--; ) Kt.timers[e].elem !== h || t && t !== Kt.timers[e].prop || (Kt.timers[e].stopped = !0);
      }
      let Xt = { animate: function(h, t, e) {
        let i, s = "", r, o, a;
        Ur(e) || (a = arguments, e = { duration: a[2], easing: a[3], complete: a[4] }), id(e.duration) || (e.duration = 400), e.easing = typeof e.easing == "function" ? e.easing : Math[e.easing] || Math.easeInOutSine, e.curAnim = Ba(t), sd(t, function(n, l) {
          Na(h, l), o = new Kt(h, e, l), r = void 0, l === "d" && ed(t.d) ? (o.paths = o.initPath(h, h.pathArray, t.d), o.toD = t.d, i = 0, r = 1) : h.attr ? i = h.attr(l) : (i = parseFloat(td(h, l)) || 0, l !== "opacity" && (s = "px")), r || (r = n), typeof r == "string" && r.match("px") && (r = r.replace(/px/g, "")), o.run(i, r, s);
        });
      }, animObject: qr, getDeferredAnimation: function(h, t, e) {
        let i = qr(t), s = e ? [e] : h.series, r = 0, o = 0;
        return s.forEach((a) => {
          let n = qr(a.options.animation);
          r = Ur(t) && Jh(t.defer) ? i.defer : Math.max(r, n.duration + n.defer), o = Math.min(i.duration, n.duration);
        }), h.renderer.forExport && (r = 0), { defer: Math.max(0, r - o), duration: Math.min(r, o) };
      }, setAnimation: function(h, t) {
        t.renderer.globalAnimation = rd(h, t.options.chart.animation, !0);
      }, stop: Na }, { SVG_NS: za, win: od } = E, { attr: ad, createElement: nd, css: ld, error: Fa, isFunction: hd, isString: Wa, objectEach: Ha, splat: dd } = V, { trustedTypes: $r } = od, Ns = $r && hd($r.createPolicy) && $r.createPolicy("highcharts", { createHTML: (h) => h }), cd = Ns ? Ns.createHTML("") : "";
      class Tt {
        static filterUserAttributes(t) {
          return Ha(t, (e, i) => {
            let s = !0;
            Tt.allowedAttributes.indexOf(i) === -1 && (s = !1), ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(i) !== -1 && (s = Wa(e) && Tt.allowedReferences.some((r) => e.indexOf(r) === 0)), s || (Fa(33, !1, void 0, { "Invalid attribute in config": `${i}` }), delete t[i]), Wa(e) && t[i] && (t[i] = e.replace(/</g, "&lt;"));
          }), t;
        }
        static parseStyle(t) {
          return t.split(";").reduce((e, i) => {
            let s = i.split(":").map((o) => o.trim()), r = s.shift();
            return r && s.length && (e[r.replace(/-([a-z])/g, (o) => o[1].toUpperCase())] = s.join(":")), e;
          }, {});
        }
        static setElementHTML(t, e) {
          t.innerHTML = Tt.emptyHTML, e && new Tt(e).addToDOM(t);
        }
        constructor(t) {
          this.nodes = typeof t == "string" ? this.parseMarkup(t) : t;
        }
        addToDOM(t) {
          return function e(i, s) {
            let r;
            return dd(i).forEach(function(o) {
              let a, n = o.tagName, l = o.textContent ? E.doc.createTextNode(o.textContent) : void 0, c = Tt.bypassHTMLFiltering;
              if (n)
                if (n === "#text") a = l;
                else if (Tt.allowedTags.indexOf(n) !== -1 || c) {
                  let d = n === "svg" ? za : s.namespaceURI || za, u = E.doc.createElementNS(d, n), p = o.attributes || {};
                  Ha(o, function(g, x) {
                    x !== "tagName" && x !== "attributes" && x !== "children" && x !== "style" && x !== "textContent" && (p[x] = g);
                  }), ad(u, c ? p : Tt.filterUserAttributes(p)), o.style && ld(u, o.style), l && u.appendChild(l), e(o.children || [], u), a = u;
                } else Fa(33, !1, void 0, { "Invalid tagName in config": n });
              a && s.appendChild(a), r = a;
            }), r;
          }(this.nodes, t);
        }
        parseMarkup(t) {
          let e, i = [];
          t = t.trim().replace(/ style=(["'])/g, " data-style=$1");
          try {
            e = new DOMParser().parseFromString(Ns ? Ns.createHTML(t) : t, "text/html");
          } catch {
          }
          if (!e) {
            let r = nd("div");
            r.innerHTML = t, e = { body: r };
          }
          let s = (r, o) => {
            let a = r.nodeName.toLowerCase(), n = { tagName: a };
            a === "#text" && (n.textContent = r.textContent || "");
            let l = r.attributes;
            if (l) {
              let c = {};
              [].forEach.call(l, (d) => {
                d.name === "data-style" ? n.style = Tt.parseStyle(d.value) : c[d.name] = d.value;
              }), n.attributes = c;
            }
            if (r.childNodes.length) {
              let c = [];
              [].forEach.call(r.childNodes, (d) => {
                s(d, c);
              }), c.length && (n.children = c);
            }
            o.push(n);
          };
          return [].forEach.call(e.body.childNodes, (r) => s(r, i)), i;
        }
      }
      Tt.allowedAttributes = ["alt", "aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup", "aria-hidden", "aria-label", "aria-labelledby", "aria-live", "aria-pressed", "aria-readonly", "aria-roledescription", "aria-selected", "class", "clip-path", "color", "colspan", "cx", "cy", "d", "dx", "dy", "disabled", "fill", "filterUnits", "flood-color", "flood-opacity", "height", "href", "id", "in", "in2", "markerHeight", "markerWidth", "offset", "opacity", "operator", "orient", "padding", "paddingLeft", "paddingRight", "patternUnits", "r", "radius", "refX", "refY", "role", "scope", "slope", "src", "startOffset", "stdDeviation", "stroke", "stroke-linecap", "stroke-width", "style", "tableValues", "result", "rowspan", "summary", "target", "tabindex", "text-align", "text-anchor", "textAnchor", "textLength", "title", "type", "valign", "width", "x", "x1", "x2", "xlink:href", "y", "y1", "y2", "zIndex"], Tt.allowedReferences = ["https://", "http://", "mailto:", "/", "../", "./", "#"], Tt.allowedTags = ["a", "abbr", "b", "br", "button", "caption", "circle", "clipPath", "code", "dd", "defs", "div", "dl", "dt", "em", "feComponentTransfer", "feComposite", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMorphology", "feOffset", "feMerge", "feMergeNode", "filter", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "linearGradient", "marker", "ol", "p", "path", "pattern", "pre", "rect", "small", "span", "stop", "strong", "style", "sub", "sup", "svg", "table", "text", "textPath", "thead", "title", "tbody", "tspan", "td", "th", "tr", "u", "ul", "#text"], Tt.emptyHTML = cd, Tt.bypassHTMLFiltering = !1;
      let { defaultOptions: ja, defaultTime: Xa } = re, { pageLang: ud } = E, { extend: pd, getNestedProperty: fd, isArray: gd, isNumber: Ga, isObject: md, isString: yd, pick: xd, ucfirst: bd } = V, zs = { add: (h, t) => h + t, divide: (h, t) => t !== 0 ? h / t : "", eq: (h, t) => h == t, each: function(h) {
        let t = arguments[arguments.length - 1];
        return !!gd(h) && h.map((e, i) => Fs(t.body, pd(md(e) ? e : { "@this": e }, { "@index": i, "@first": i === 0, "@last": i === h.length - 1 }))).join("");
      }, ge: (h, t) => h >= t, gt: (h, t) => h > t, if: (h) => !!h, le: (h, t) => h <= t, lt: (h, t) => h < t, multiply: (h, t) => h * t, ne: (h, t) => h != t, subtract: (h, t) => h - t, ucfirst: bd, unless: (h) => !h }, Ya = {}, Ua = (h) => /^["'].+["']$/.test(h);
      function Fs(h = "", t, e) {
        var y;
        let i = /\{([a-zA-Z\u00C0-\u017F\d:\.,;\-\/<>\[\]%_@+"'’= #\(\)]+)\}/g, s = /\(([a-zA-Z\u00C0-\u017F\d:\.,;\-\/<>\[\]%_@+"'= ]+)\)/g, r = [], o = /f$/, a = /\.(\d)/, n = ((y = e == null ? void 0 : e.options) == null ? void 0 : y.lang) || ja.lang, l = (e == null ? void 0 : e.time) || Xa, c = (e == null ? void 0 : e.numberFormatter) || qa, d = (m = "") => {
          let v;
          return m === "true" || m !== "false" && ((v = Number(m)).toString() === m ? v : Ua(m) ? m.slice(1, -1) : fd(m, t));
        }, u, p, g = 0, x;
        for (; (u = i.exec(h)) !== null; ) {
          let m = u, v = s.exec(u[1]);
          v && (u = v, x = !0), p != null && p.isBlock || (p = { ctx: t, expression: u[1], find: u[0], isBlock: u[1].charAt(0) === "#", start: u.index, startInner: u.index + u[0].length, length: u[0].length });
          let w = (p.isBlock ? m : u)[1].split(" ")[0].replace("#", "");
          zs[w] && (p.isBlock && w === p.fn && g++, p.fn || (p.fn = w));
          let T = u[1] === "else";
          if (p.isBlock && p.fn && (u[1] === `/${p.fn}` || T))
            if (g) !T && g--;
            else {
              let S = p.startInner, M = h.substr(S, u.index - S);
              p.body === void 0 ? (p.body = M, p.startInner = u.index + u[0].length) : p.elseBody = M, p.find += M + u[0], T || (r.push(p), p = void 0);
            }
          else p.isBlock || r.push(p);
          if (v && !(p != null && p.isBlock)) break;
        }
        return r.forEach((m) => {
          let v, w, { body: T, elseBody: S, expression: M, fn: P } = m;
          if (P) {
            let A = [m], L = [], R = M.length, D = 0, N;
            for (w = 0; w <= R; w++) {
              let B = M.charAt(w);
              N || B !== '"' && B !== "'" ? N === B && (N = "") : N = B, N || B !== " " && w !== R || (L.push(M.substr(D, w - D)), D = w + 1);
            }
            for (w = zs[P].length; w--; ) A.unshift(d(L[w + 1]));
            v = zs[P].apply(t, A), m.isBlock && typeof v == "boolean" && (v = Fs(v ? T : S, t, e));
          } else {
            let A = Ua(M) ? [M] : M.split(":");
            if (v = d(A.shift() || ""), A.length && typeof v == "number") {
              let L = A.join(":");
              if (o.test(L)) {
                let R = parseInt((L.match(a) || ["", "-1"])[1], 10);
                v !== null && (v = c(v, R, n.decimalPoint, L.indexOf(",") > -1 ? n.thousandsSep : ""));
              } else v = l.dateFormat(L, v);
            }
            s.lastIndex = 0, s.test(m.find) && yd(v) && (v = `"${v}"`);
          }
          h = h.replace(m.find, xd(v, ""));
        }), x ? Fs(h, t, e) : h;
      }
      function qa(h, t, e, i) {
        var x;
        t *= 1;
        let s, r, [o, a] = (h = +h || 0).toString().split("e").map(Number), n = ((x = this == null ? void 0 : this.options) == null ? void 0 : x.lang) || ja.lang, l = (h.toString().split(".")[1] || "").split("e")[0].length, c = t, d = {};
        e ?? (e = n.decimalPoint), i ?? (i = n.thousandsSep), t === -1 ? t = Math.min(l, 20) : Ga(t) ? t && a < 0 && ((r = t + a) >= 0 ? (o = +o.toExponential(r).split("e")[0], t = r) : (o = Math.floor(o), h = t < 20 ? +(o * Math.pow(10, a)).toFixed(t) : 0, a = 0)) : t = 2, a && (t ?? (t = 2), h = o), Ga(t) && t >= 0 && (d.minimumFractionDigits = t, d.maximumFractionDigits = t), i === "" && (d.useGrouping = !1);
        let u = i || e, p = u ? "en" : (this == null ? void 0 : this.locale) || n.locale || ud, g = JSON.stringify(d) + p;
        return s = (Ya[g] ?? (Ya[g] = new Intl.NumberFormat(p, d))).format(h), u && (s = s.replace(/([,\.])/g, "_$1").replace(/_\,/g, i ?? ",").replace("_.", e ?? ".")), (t || +s != 0) && (!(a < 0) || c) || (s = "0"), a && +s != 0 && (s += "e" + (a < 0 ? "" : "+") + a), s;
      }
      let oe = { dateFormat: function(h, t, e) {
        return Xa.dateFormat(h, t, e);
      }, format: Fs, helpers: zs, numberFormat: qa };
      (function(h) {
        let t;
        h.rendererTypes = {}, h.getRendererType = function(e = t) {
          return h.rendererTypes[e] || h.rendererTypes[t];
        }, h.registerRendererType = function(e, i, s) {
          h.rendererTypes[e] = i, (!t || s) && (t = e, E.Renderer = i);
        };
      })(F || (F = {}));
      let os = F, { clamp: vd, pick: wd, pushUnique: kd, stableSort: Vr } = V;
      (z || (z = {})).distribute = function h(t, e, i) {
        let s = t, r = s.reducedLen || e, o = (w, T) => w.target - T.target, a = [], n = t.length, l = [], c = a.push, d, u, p, g = !0, x, y, m = 0, v;
        for (d = n; d--; ) m += t[d].size;
        if (m > r) {
          for (Vr(t, (w, T) => (T.rank || 0) - (w.rank || 0)), p = (v = t[0].rank === t[t.length - 1].rank) ? n / 2 : -1, u = v ? p : n - 1; p && m > r; ) x = t[d = Math.floor(u)], kd(l, d) && (m -= x.size), u += p, v && u >= t.length && (p /= 2, u = p);
          l.sort((w, T) => T - w).forEach((w) => c.apply(a, t.splice(w, 1)));
        }
        for (Vr(t, o), t = t.map((w) => ({ size: w.size, targets: [w.target], align: wd(w.align, 0.5) })); g; ) {
          for (d = t.length; d--; ) x = t[d], y = (Math.min.apply(0, x.targets) + Math.max.apply(0, x.targets)) / 2, x.pos = vd(y - x.size * x.align, 0, e - x.size);
          for (d = t.length, g = !1; d--; ) d > 0 && t[d - 1].pos + t[d - 1].size > t[d].pos && (t[d - 1].size += t[d].size, t[d - 1].targets = t[d - 1].targets.concat(t[d].targets), t[d - 1].align = 0.5, t[d - 1].pos + t[d - 1].size > e && (t[d - 1].pos = e - t[d - 1].size), t.splice(d, 1), g = !0);
        }
        return c.apply(s, a), d = 0, t.some((w) => {
          let T = 0;
          return (w.targets || []).some(() => (s[d].pos = w.pos + T, i !== void 0 && Math.abs(s[d].pos - s[d].target) > i ? (s.slice(0, d + 1).forEach((S) => delete S.pos), s.reducedLen = (s.reducedLen || e) - 0.1 * e, s.reducedLen > 0.1 * e && h(s, e, i), !0) : (T += s[d].size, d++, !1)));
        }), Vr(s, o), s;
      };
      let Ws = z, { animate: Sd, animObject: Md, stop: $a } = Xt, { deg2rad: Va, doc: Oi, svg: Cd, SVG_NS: Hs, win: Td, isFirefox: Ad } = E, { addEvent: Od, attr: Kr, createElement: Pd, crisp: js, css: Ka, defined: ve, erase: Ld, extend: as, fireEvent: Qr, getAlignFactor: _r, isArray: Qa, isFunction: _a, isNumber: Ed, isObject: Id, isString: Za, merge: Zr, objectEach: Pi, pick: Le, pInt: Xs, pushUnique: Rd, replaceNested: Dd, syncTimeout: Bd, uniqueKey: Ja } = V;
      class Wt {
        _defaultGetter(t) {
          let e = Le(this[t + "Value"], this[t], this.element ? this.element.getAttribute(t) : null, 0);
          return /^-?[\d\.]+$/.test(e) && (e = parseFloat(e)), e;
        }
        _defaultSetter(t, e, i) {
          i.setAttribute(e, t);
        }
        add(t) {
          let e, i = this.renderer, s = this.element;
          return t && (this.parentGroup = t), this.textStr !== void 0 && this.element.nodeName === "text" && i.buildText(this), this.added = !0, (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()), e || (t ? t.element : i.box).appendChild(s), this.onAdd && this.onAdd(), this;
        }
        addClass(t, e) {
          let i = e ? "" : this.attr("class") || "";
          return (t = (t || "").split(/ /g).reduce(function(s, r) {
            return i.indexOf(r) === -1 && s.push(r), s;
          }, i ? [i] : []).join(" ")) !== i && this.attr("class", t), this;
        }
        afterSetters() {
          this.doTransform && (this.updateTransform(), this.doTransform = !1);
        }
        align(t, e, i, s = !0) {
          let r = this.renderer, o = r.alignedObjects, a = !!t;
          t ? (this.alignOptions = t, this.alignByTranslate = e, this.alignTo = i) : (t = this.alignOptions || {}, e = this.alignByTranslate, i = this.alignTo);
          let n = !i || Za(i) ? i || "renderer" : void 0;
          n && (a && Rd(o, this), i = void 0);
          let l = Le(i, r[n], r), c = (l.x || 0) + (t.x || 0) + ((l.width || 0) - (t.width || 0)) * _r(t.align), d = (l.y || 0) + (t.y || 0) + ((l.height || 0) - (t.height || 0)) * _r(t.verticalAlign), u = { "text-align": t == null ? void 0 : t.align };
          return u[e ? "translateX" : "x"] = Math.round(c), u[e ? "translateY" : "y"] = Math.round(d), s && (this[this.placed ? "animate" : "attr"](u), this.placed = !0), this.alignAttr = u, this;
        }
        alignSetter(t) {
          let e = { left: "start", center: "middle", right: "end" };
          e[t] && (this.alignValue = t, this.element.setAttribute("text-anchor", e[t]));
        }
        animate(t, e, i) {
          let s = Md(Le(e, this.renderer.globalAnimation, !0)), r = s.defer;
          return Oi.hidden && (s.duration = 0), s.duration !== 0 ? (i && (s.complete = i), Bd(() => {
            this.element && Sd(this, t, s);
          }, r)) : (this.attr(t, void 0, i || s.complete), Pi(t, function(o, a) {
            s.step && s.step.call(this, o, { prop: a, pos: 1, elem: this });
          }, this)), this;
        }
        applyTextOutline(t) {
          let e = this.element;
          t.indexOf("contrast") !== -1 && (t = t.replace(/contrast/g, this.renderer.getContrast(e.style.fill)));
          let i = t.indexOf(" "), s = t.substring(i + 1), r = t.substring(0, i);
          if (r && r !== "none" && E.svg) {
            this.fakeTS = !0, r = r.replace(/(^[\d\.]+)(.*?)$/g, function(c, d, u) {
              return 2 * Number(d) + u;
            }), this.removeTextOutline();
            let o = Oi.createElementNS(Hs, "tspan");
            Kr(o, { class: "highcharts-text-outline", fill: s, stroke: s, "stroke-width": r, "stroke-linejoin": "round" });
            let a = e.querySelector("textPath") || e;
            [].forEach.call(a.childNodes, (c) => {
              let d = c.cloneNode(!0);
              d.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach((u) => d.removeAttribute(u)), o.appendChild(d);
            });
            let n = 0;
            [].forEach.call(a.querySelectorAll("text tspan"), (c) => {
              n += Number(c.getAttribute("dy"));
            });
            let l = Oi.createElementNS(Hs, "tspan");
            l.textContent = "​", Kr(l, { x: Number(e.getAttribute("x")), dy: -n }), o.appendChild(l), a.insertBefore(o, a.firstChild);
          }
        }
        attr(t, e, i, s) {
          let { element: r } = this, o = Wt.symbolCustomAttribs, a, n, l = this, c;
          return typeof t == "string" && e !== void 0 && (a = t, (t = {})[a] = e), typeof t == "string" ? l = (this[t + "Getter"] || this._defaultGetter).call(this, t, r) : (Pi(t, function(d, u) {
            c = !1, s || $a(this, u), this.symbolName && o.indexOf(u) !== -1 && (n || (this.symbolAttr(t), n = !0), c = !0), this.rotation && (u === "x" || u === "y") && (this.doTransform = !0), c || (this[u + "Setter"] || this._defaultSetter).call(this, d, u, r);
          }, this), this.afterSetters()), i && i.call(this), l;
        }
        clip(t) {
          if (t && !t.clipPath) {
            let e = Ja() + "-", i = this.renderer.createElement("clipPath").attr({ id: e }).add(this.renderer.defs);
            as(t, { clipPath: i, id: e, count: 0 }), t.add(i);
          }
          return this.attr("clip-path", t ? `url(${this.renderer.url}#${t.id})` : "none");
        }
        crisp(t, e) {
          e = Math.round(e || t.strokeWidth || 0);
          let i = t.x || this.x || 0, s = t.y || this.y || 0, r = (t.width || this.width || 0) + i, o = (t.height || this.height || 0) + s, a = js(i, e), n = js(s, e);
          return as(t, { x: a, y: n, width: js(r, e) - a, height: js(o, e) - n }), ve(t.strokeWidth) && (t.strokeWidth = e), t;
        }
        complexColor(t, e, i) {
          let s = this.renderer, r, o, a, n, l, c, d, u, p, g, x = [], y;
          Qr(this.renderer, "complexColor", { args: arguments }, function() {
            if (t.radialGradient ? o = "radialGradient" : t.linearGradient && (o = "linearGradient"), o) {
              if (a = t[o], l = s.gradients, c = t.stops, p = i.radialReference, Qa(a) && (t[o] = a = { x1: a[0], y1: a[1], x2: a[2], y2: a[3], gradientUnits: "userSpaceOnUse" }), o === "radialGradient" && p && !ve(a.gradientUnits) && (n = a, a = Zr(a, s.getRadialAttr(p, n), { gradientUnits: "userSpaceOnUse" })), Pi(a, function(m, v) {
                v !== "id" && x.push(v, m);
              }), Pi(c, function(m) {
                x.push(m);
              }), l[x = x.join(",")]) g = l[x].attr("id");
              else {
                a.id = g = Ja();
                let m = l[x] = s.createElement(o).attr(a).add(s.defs);
                m.radAttr = n, m.stops = [], c.forEach(function(v) {
                  v[1].indexOf("rgba") === 0 ? (d = (r = At.parse(v[1])).get("rgb"), u = r.get("a")) : (d = v[1], u = 1);
                  let w = s.createElement("stop").attr({ offset: v[0], "stop-color": d, "stop-opacity": u }).add(m);
                  m.stops.push(w);
                });
              }
              y = "url(" + s.url + "#" + g + ")", i.setAttribute(e, y), i.gradient = x, t.toString = function() {
                return y;
              };
            }
          });
        }
        css(t) {
          let e = this.styles, i = {}, s = this.element, r, o = !e;
          if (e && Pi(t, function(a, n) {
            e && e[n] !== a && (i[n] = a, o = !0);
          }), o) {
            e && (t = as(e, i)), t.width === null || t.width === "auto" ? delete this.textWidth : s.nodeName.toLowerCase() === "text" && t.width && (r = this.textWidth = Xs(t.width)), as(this.styles, t), r && !Cd && this.renderer.forExport && delete t.width;
            let a = Ad && t.fontSize || null;
            a && (Ed(a) || /^\d+$/.test(a)) && (t.fontSize += "px");
            let n = Zr(t);
            s.namespaceURI === this.SVG_NS && (["textOutline", "textOverflow", "whiteSpace", "width"].forEach((l) => n && delete n[l]), n.color && (n.fill = n.color, delete n.color)), Ka(s, n);
          }
          return this.added && (this.element.nodeName === "text" && this.renderer.buildText(this), t.textOutline && this.applyTextOutline(t.textOutline)), this;
        }
        dashstyleSetter(t) {
          let e, i = this["stroke-width"];
          if (i === "inherit" && (i = 1), t) {
            let s = (t = t.toLowerCase()).replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
            for (e = s.length; e--; ) s[e] = "" + Xs(s[e]) * Le(i, NaN);
            t = s.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t);
          }
        }
        destroy() {
          let t = this, e = t.element || {}, i = t.renderer, s = e.ownerSVGElement, r = e.nodeName === "SPAN" && t.parentGroup || void 0, o, a;
          if (e.onclick = e.onmouseout = e.onmouseover = e.onmousemove = e.point = null, $a(t), t.clipPath && s) {
            let n = t.clipPath;
            [].forEach.call(s.querySelectorAll("[clip-path],[CLIP-PATH]"), function(l) {
              l.getAttribute("clip-path").indexOf(n.element.id) > -1 && l.removeAttribute("clip-path");
            }), t.clipPath = n.destroy();
          }
          if (t.stops) {
            for (a = 0; a < t.stops.length; a++) t.stops[a].destroy();
            t.stops.length = 0, t.stops = void 0;
          }
          for (t.safeRemoveChild(e); r != null && r.div && r.div.childNodes.length === 0; ) o = r.parentGroup, t.safeRemoveChild(r.div), delete r.div, r = o;
          t.alignOptions && Ld(i.alignedObjects, t), Pi(t, (n, l) => {
            var c, d, u;
            (((c = t[l]) == null ? void 0 : c.parentGroup) === t || ["connector", "foreignObject"].indexOf(l) !== -1) && ((u = (d = t[l]) == null ? void 0 : d.destroy) == null || u.call(d)), delete t[l];
          });
        }
        dSetter(t, e, i) {
          Qa(t) && (typeof t[0] == "string" && (t = this.renderer.pathToSegments(t)), this.pathArray = t, t = t.reduce((s, r, o) => r != null && r.join ? (o ? s + " " : "") + r.join(" ") : (r || "").toString(), "")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), this[e] !== t && (i.setAttribute(e, t), this[e] = t);
        }
        fillSetter(t, e, i) {
          typeof t == "string" ? i.setAttribute(e, t) : t && this.complexColor(t, e, i);
        }
        hrefSetter(t, e, i) {
          i.setAttributeNS("http://www.w3.org/1999/xlink", e, t);
        }
        getBBox(t, e) {
          let i, s, r, o, { alignValue: a, element: n, renderer: l, styles: c, textStr: d } = this, { cache: u, cacheKeys: p } = l, g = n.namespaceURI === this.SVG_NS, x = Le(e, this.rotation, 0), y = l.styledMode ? n && Wt.prototype.getStyle.call(n, "font-size") : c.fontSize;
          if (ve(d) && ((o = d.toString()).indexOf("<") === -1 && (o = o.replace(/\d/g, "0")), o += ["", l.rootFontSize, y, x, this.textWidth, a, c.lineClamp, c.textOverflow, c.fontWeight].join(",")), o && !t && (i = u[o]), !i || i.polygon) {
            if (g || l.forExport) {
              try {
                r = this.fakeTS && function(v) {
                  let w = n.querySelector(".highcharts-text-outline");
                  w && Ka(w, { display: v });
                }, _a(r) && r("none"), i = n.getBBox ? as({}, n.getBBox()) : { width: n.offsetWidth, height: n.offsetHeight, x: 0, y: 0 }, _a(r) && r("");
              } catch {
              }
              (!i || i.width < 0) && (i = { x: 0, y: 0, width: 0, height: 0 });
            } else i = this.htmlGetBBox();
            s = i.height, g && (i.height = s = { "11px,17": 14, "13px,20": 16 }[`${y || ""},${Math.round(s)}`] || s), x && (i = this.getRotatedBox(i, x));
            let m = { bBox: i };
            Qr(this, "afterGetBBox", m), i = m.bBox;
          }
          if (o && (d === "" || i.height > 0)) {
            for (; p.length > 250; ) delete u[p.shift()];
            u[o] || p.push(o), u[o] = i;
          }
          return i;
        }
        getRotatedBox(t, e) {
          let { x: i, y: s, width: r, height: o } = t, { alignValue: a, translateY: n, rotationOriginX: l = 0, rotationOriginY: c = 0 } = this, d = _r(a), u = Number(this.element.getAttribute("y") || 0) - (n ? 0 : s), p = e * Va, g = (e - 90) * Va, x = Math.cos(p), y = Math.sin(p), m = r * x, v = r * y, w = Math.cos(g), T = Math.sin(g), [[S, M], [P, A]] = [l, c].map((pt) => [pt - pt * x, pt * y]), L = i + d * (r - m) + S + A + u * w, R = L + m, D = R - o * w, N = D - m, B = s + u - d * v - M + P + u * T, X = B + v, j = X - o * T, it = j - v, G = Math.min(L, R, D, N), et = Math.min(B, X, j, it), ct = Math.max(L, R, D, N) - G, dt = Math.max(B, X, j, it) - et;
          return { x: G, y: et, width: ct, height: dt, polygon: [[L, B], [R, X], [D, j], [N, it]] };
        }
        getStyle(t) {
          return Td.getComputedStyle(this.element || this, "").getPropertyValue(t);
        }
        hasClass(t) {
          return ("" + this.attr("class")).split(" ").indexOf(t) !== -1;
        }
        hide() {
          return this.attr({ visibility: "hidden" });
        }
        htmlGetBBox() {
          return { height: 0, width: 0, x: 0, y: 0 };
        }
        constructor(t, e) {
          this.onEvents = {}, this.opacity = 1, this.SVG_NS = Hs, this.element = e === "span" || e === "body" ? Pd(e) : Oi.createElementNS(this.SVG_NS, e), this.renderer = t, this.styles = {}, Qr(this, "afterInit");
        }
        on(t, e) {
          let { onEvents: i } = this;
          return i[t] && i[t](), i[t] = Od(this.element, t, e), this;
        }
        opacitySetter(t, e, i) {
          let s = Number(Number(t).toFixed(3));
          this.opacity = s, i.setAttribute(e, s);
        }
        reAlign() {
          var t;
          (t = this.alignOptions) != null && t.width && this.alignOptions.align !== "left" && (this.alignOptions.width = this.getBBox().width, this.placed = !1, this.align());
        }
        removeClass(t) {
          return this.attr("class", ("" + this.attr("class")).replace(Za(t) ? RegExp(`(^| )${t}( |$)`) : t, " ").replace(/ +/g, " ").trim());
        }
        removeTextOutline() {
          let t = this.element.querySelector("tspan.highcharts-text-outline");
          t && this.safeRemoveChild(t);
        }
        safeRemoveChild(t) {
          let e = t.parentNode;
          e && e.removeChild(t);
        }
        setRadialReference(t) {
          let e = this.element.gradient && this.renderer.gradients[this.element.gradient] || void 0;
          return this.element.radialReference = t, e != null && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)), this;
        }
        shadow(t) {
          var r;
          let { renderer: e } = this, i = Zr(((r = this.parentGroup) == null ? void 0 : r.rotation) === 90 ? { offsetX: -1, offsetY: -1 } : {}, Id(t) ? t : {}), s = e.shadowDefinition(i);
          return this.attr({ filter: t ? `url(${e.url}#${s})` : "none" });
        }
        show(t = !0) {
          return this.attr({ visibility: t ? "inherit" : "visible" });
        }
        "stroke-widthSetter"(t, e, i) {
          this[e] = t, i.setAttribute(e, t);
        }
        strokeWidth() {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          let t = this.getStyle("stroke-width"), e = 0, i;
          return /px$/.test(t) ? e = Xs(t) : t !== "" && (Kr(i = Oi.createElementNS(Hs, "rect"), { width: t, "stroke-width": 0 }), this.element.parentNode.appendChild(i), e = i.getBBox().width, i.parentNode.removeChild(i)), e;
        }
        symbolAttr(t) {
          let e = this;
          Wt.symbolCustomAttribs.forEach(function(i) {
            e[i] = Le(t[i], e[i]);
          }), e.attr({ d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e) });
        }
        textSetter(t) {
          t !== this.textStr && (delete this.textPxLength, this.textStr = t, this.added && this.renderer.buildText(this), this.reAlign());
        }
        titleSetter(t) {
          let e = this.element, i = e.getElementsByTagName("title")[0] || Oi.createElementNS(this.SVG_NS, "title");
          e.insertBefore ? e.insertBefore(i, e.firstChild) : e.appendChild(i), i.textContent = Dd(Le(t, ""), [/<[^>]*>/g, ""]).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
        toFront() {
          let t = this.element;
          return t.parentNode.appendChild(t), this;
        }
        translate(t, e) {
          return this.attr({ translateX: t, translateY: e });
        }
        updateTransform(t = "transform") {
          let { element: e, foreignObject: i, matrix: s, padding: r, rotation: o = 0, rotationOriginX: a, rotationOriginY: n, scaleX: l, scaleY: c, text: d, translateX: u = 0, translateY: p = 0 } = this, g = ["translate(" + u + "," + p + ")"];
          ve(s) && g.push("matrix(" + s.join(",") + ")"), o && (g.push("rotate(" + o + " " + (a ?? e.getAttribute("x") ?? this.x ?? 0) + " " + (n ?? e.getAttribute("y") ?? this.y ?? 0) + ")"), (d == null ? void 0 : d.element.tagName) !== "SPAN" || d != null && d.foreignObject || d.attr({ rotation: o, rotationOriginX: (a || 0) - r, rotationOriginY: (n || 0) - r })), (ve(l) || ve(c)) && g.push("scale(" + Le(l, 1) + " " + Le(c, 1) + ")"), g.length && !(d || this).textPath && ((i == null ? void 0 : i.element) || e).setAttribute(t, g.join(" "));
        }
        visibilitySetter(t, e, i) {
          t === "inherit" ? i.removeAttribute(e) : this[e] !== t && i.setAttribute(e, t), this[e] = t;
        }
        xGetter(t) {
          return this.element.nodeName === "circle" && (t === "x" ? t = "cx" : t === "y" && (t = "cy")), this._defaultGetter(t);
        }
        zIndexSetter(t, e) {
          let i = this.renderer, s = this.parentGroup, r = (s || i).element || i.box, o = this.element, a = r === i.box, n, l, c, d = !1, u, p = this.added, g;
          if (ve(t) ? (o.setAttribute("data-z-index", t), t *= 1, this[e] === t && (p = !1)) : ve(this[e]) && o.removeAttribute("data-z-index"), this[e] = t, p) {
            for ((t = this.zIndex) && s && (s.handleZ = !0), g = (n = r.childNodes).length - 1; g >= 0 && !d; g--) u = !ve(c = (l = n[g]).getAttribute("data-z-index")), l !== o && (t < 0 && u && !a && !g ? (r.insertBefore(o, n[g]), d = !0) : (Xs(c) <= t || u && (!ve(t) || t >= 0)) && (r.insertBefore(o, n[g + 1]), d = !0));
            d || (r.insertBefore(o, n[3 * !!a]), d = !0);
          }
          return d;
        }
      }
      Wt.symbolCustomAttribs = ["anchorX", "anchorY", "clockwise", "end", "height", "innerR", "r", "start", "width", "x", "y"], Wt.prototype.strokeSetter = Wt.prototype.fillSetter, Wt.prototype.yGetter = Wt.prototype.xGetter, Wt.prototype.matrixSetter = Wt.prototype.rotationOriginXSetter = Wt.prototype.rotationOriginYSetter = Wt.prototype.rotationSetter = Wt.prototype.scaleXSetter = Wt.prototype.scaleYSetter = Wt.prototype.translateXSetter = Wt.prototype.translateYSetter = Wt.prototype.verticalAlignSetter = function(h, t) {
        this[t] = h, this.doTransform = !0;
      };
      let we = Wt, { defined: tn, extend: Nd, getAlignFactor: en, isNumber: ns, merge: zd, pick: Gs, removeEvent: sn } = V;
      class ai extends we {
        constructor(t, e, i, s, r, o, a, n, l, c) {
          let d;
          super(t, "g"), this.paddingLeftSetter = this.paddingSetter, this.paddingRightSetter = this.paddingSetter, this.doUpdate = !1, this.textStr = e, this.x = i, this.y = s, this.anchorX = o, this.anchorY = a, this.baseline = l, this.className = c, this.addClass(c === "button" ? "highcharts-no-tooltip" : "highcharts-label"), c && this.addClass("highcharts-" + c), this.text = t.text(void 0, 0, 0, n).attr({ zIndex: 1 }), typeof r == "string" && ((d = /^url\((.*?)\)$/.test(r)) || this.renderer.symbols[r]) && (this.symbolKey = r), this.bBox = ai.emptyBBox, this.padding = 3, this.baselineOffset = 0, this.needsBox = t.styledMode || d, this.deferredAttr = {}, this.alignFactor = 0;
        }
        alignSetter(t) {
          let e = en(t);
          this.textAlign = t, e !== this.alignFactor && (this.alignFactor = e, this.bBox && ns(this.xSetting) && this.attr({ x: this.xSetting }));
        }
        anchorXSetter(t, e) {
          this.anchorX = t, this.boxAttr(e, Math.round(t) - this.getCrispAdjust() - this.xSetting);
        }
        anchorYSetter(t, e) {
          this.anchorY = t, this.boxAttr(e, t - this.ySetting);
        }
        boxAttr(t, e) {
          this.box ? this.box.attr(t, e) : this.deferredAttr[t] = e;
        }
        css(t) {
          if (t) {
            let e = {};
            t = zd(t), ai.textProps.forEach((i) => {
              t[i] !== void 0 && (e[i] = t[i], delete t[i]);
            }), this.text.css(e), "fontSize" in e || "fontWeight" in e ? this.updateTextPadding() : ("width" in e || "textOverflow" in e) && this.updateBoxSize();
          }
          return we.prototype.css.call(this, t);
        }
        destroy() {
          sn(this.element, "mouseenter"), sn(this.element, "mouseleave"), this.text && this.text.destroy(), this.box && (this.box = this.box.destroy()), we.prototype.destroy.call(this);
        }
        fillSetter(t, e) {
          t && (this.needsBox = !0), this.fill = t, this.boxAttr(e, t);
        }
        getBBox(t, e) {
          this.textStr && this.bBox.width === 0 && this.bBox.height === 0 && this.updateBoxSize();
          let { padding: i, height: s = 0, translateX: r = 0, translateY: o = 0, width: a = 0 } = this, n = Gs(this.paddingLeft, i), l = e ?? (this.rotation || 0), c = { width: a, height: s, x: r + this.bBox.x - n, y: o + this.bBox.y - i + this.baselineOffset };
          return l && (c = this.getRotatedBox(c, l)), c;
        }
        getCrispAdjust() {
          return (this.renderer.styledMode && this.box ? this.box.strokeWidth() : this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2;
        }
        heightSetter(t) {
          this.heightSetting = t, this.doUpdate = !0;
        }
        afterSetters() {
          super.afterSetters(), this.doUpdate && (this.updateBoxSize(), this.doUpdate = !1);
        }
        onAdd() {
          this.text.add(this), this.attr({ text: Gs(this.textStr, ""), x: this.x || 0, y: this.y || 0 }), this.box && tn(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        }
        paddingSetter(t, e) {
          ns(t) ? t !== this[e] && (this[e] = t, this.updateTextPadding()) : this[e] = void 0;
        }
        rSetter(t, e) {
          this.boxAttr(e, t);
        }
        strokeSetter(t, e) {
          this.stroke = t, this.boxAttr(e, t);
        }
        "stroke-widthSetter"(t, e) {
          t && (this.needsBox = !0), this["stroke-width"] = t, this.boxAttr(e, t);
        }
        "text-alignSetter"(t) {
          this.textAlign = this["text-align"] = t, this.updateTextPadding();
        }
        textSetter(t) {
          t !== void 0 && this.text.attr({ text: t }), this.updateTextPadding(), this.reAlign();
        }
        updateBoxSize() {
          let t, e = this.text, i = {}, s = this.padding, r = this.bBox = (!ns(this.widthSetting) || !ns(this.heightSetting) || this.textAlign) && tn(e.textStr) ? e.getBBox(void 0, 0) : ai.emptyBBox;
          this.width = this.getPaddedWidth(), this.height = (this.heightSetting || r.height || 0) + 2 * s;
          let o = this.renderer.fontMetrics(e);
          if (this.baselineOffset = s + Math.min((this.text.firstLineMetrics || o).b, r.height || 1 / 0), this.heightSetting && (this.baselineOffset += (this.heightSetting - o.h) / 2), this.needsBox && !e.textPath) {
            if (!this.box) {
              let a = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect();
              a.addClass((this.className === "button" ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), a.add(this);
            }
            i.x = t = this.getCrispAdjust(), i.y = (this.baseline ? -this.baselineOffset : 0) + t, i.width = Math.round(this.width), i.height = Math.round(this.height), this.box.attr(Nd(i, this.deferredAttr)), this.deferredAttr = {};
          }
        }
        updateTextPadding() {
          let t = this.text, e = t.styles.textAlign || this.textAlign;
          if (!t.textPath) {
            this.updateBoxSize();
            let i = this.baseline ? 0 : this.baselineOffset, s = (this.paddingLeft ?? this.padding) + en(e) * (this.widthSetting ?? this.bBox.width);
            (s !== t.x || i !== t.y) && (t.attr({ align: e, x: s }), i !== void 0 && t.attr("y", i)), t.x = s, t.y = i;
          }
        }
        widthSetter(t) {
          this.widthSetting = ns(t) ? t : void 0, this.doUpdate = !0;
        }
        getPaddedWidth() {
          let t = this.padding, e = Gs(this.paddingLeft, t), i = Gs(this.paddingRight, t);
          return (this.widthSetting || this.bBox.width || 0) + e + i;
        }
        xSetter(t) {
          this.x = t, this.alignFactor && (t -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0), this.xSetting = Math.round(t), this.attr("translateX", this.xSetting);
        }
        ySetter(t) {
          this.ySetting = this.y = Math.round(t), this.attr("translateY", this.ySetting);
        }
      }
      ai.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }, ai.textProps = ["color", "direction", "fontFamily", "fontSize", "fontStyle", "fontWeight", "lineClamp", "lineHeight", "textAlign", "textDecoration", "textOutline", "textOverflow", "whiteSpace", "width"];
      let { defined: rn, isNumber: Fd, pick: ls } = V;
      function on(h, t, e, i, s) {
        let r = [];
        if (s) {
          let o = s.start || 0, a = s.end || 0, n = ls(s.r, e), l = ls(s.r, i || e), c = 2e-4 / (s.borderRadius ? 1 : Math.max(n, 1)), d = Math.abs(a - o - 2 * Math.PI) < c;
          d && (o = Math.PI / 2, a = 2.5 * Math.PI - c);
          let u = s.innerR, p = ls(s.open, d), g = Math.cos(o), x = Math.sin(o), y = Math.cos(a), m = Math.sin(a), v = ls(s.longArc, a - o - Math.PI < c ? 0 : 1), w = ["A", n, l, 0, v, ls(s.clockwise, 1), h + n * y, t + l * m];
          w.params = { start: o, end: a, cx: h, cy: t }, r.push(["M", h + n * g, t + l * x], w), rn(u) && ((w = ["A", u, u, 0, v, rn(s.clockwise) ? 1 - s.clockwise : 0, h + u * g, t + u * x]).params = { start: a, end: o, cx: h, cy: t }, r.push(p ? ["M", h + u * y, t + u * m] : ["L", h + u * y, t + u * m], w)), p || r.push(["Z"]);
        }
        return r;
      }
      function an(h, t, e, i, s) {
        return s != null && s.r ? Jr(h, t, e, i, s) : [["M", h, t], ["L", h + e, t], ["L", h + e, t + i], ["L", h, t + i], ["Z"]];
      }
      function Jr(h, t, e, i, s) {
        let r = (s == null ? void 0 : s.r) || 0;
        return [["M", h + r, t], ["L", h + e - r, t], ["A", r, r, 0, 0, 1, h + e, t + r], ["L", h + e, t + i - r], ["A", r, r, 0, 0, 1, h + e - r, t + i], ["L", h + r, t + i], ["A", r, r, 0, 0, 1, h, t + i - r], ["L", h, t + r], ["A", r, r, 0, 0, 1, h + r, t], ["Z"]];
      }
      let nn = { arc: on, callout: function(h, t, e, i, s) {
        let r = Math.min((s == null ? void 0 : s.r) || 0, e, i), o = r + 6, a = s == null ? void 0 : s.anchorX, n = (s == null ? void 0 : s.anchorY) || 0, l = Jr(h, t, e, i, { r });
        if (!Fd(a) || a < e && a > 0 && n < i && n > 0) return l;
        if (h + a > e - o)
          if (n > t + o && n < t + i - o) l.splice(3, 1, ["L", h + e, n - 6], ["L", h + e + 6, n], ["L", h + e, n + 6], ["L", h + e, t + i - r]);
          else if (a < e) {
            let c = n < t + o, d = c ? t : t + i;
            l.splice(c ? 2 : 5, 0, ["L", a, n], ["L", h + e - r, d]);
          } else l.splice(3, 1, ["L", h + e, i / 2], ["L", a, n], ["L", h + e, i / 2], ["L", h + e, t + i - r]);
        else if (h + a < o)
          if (n > t + o && n < t + i - o) l.splice(7, 1, ["L", h, n + 6], ["L", h - 6, n], ["L", h, n - 6], ["L", h, t + r]);
          else if (a > 0) {
            let c = n < t + o, d = c ? t : t + i;
            l.splice(c ? 1 : 6, 0, ["L", a, n], ["L", h + r, d]);
          } else l.splice(7, 1, ["L", h, i / 2], ["L", a, n], ["L", h, i / 2], ["L", h, t + r]);
        else n > i && a < e - o ? l.splice(5, 1, ["L", a + 6, t + i], ["L", a, t + i + 6], ["L", a - 6, t + i], ["L", h + r, t + i]) : n < 0 && a > o && l.splice(1, 1, ["L", a - 6, t], ["L", a, t - 6], ["L", a + 6, t], ["L", e - r, t]);
        return l;
      }, circle: function(h, t, e, i) {
        return on(h + e / 2, t + i / 2, e / 2, i / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: !1 });
      }, diamond: function(h, t, e, i) {
        return [["M", h + e / 2, t], ["L", h + e, t + i / 2], ["L", h + e / 2, t + i], ["L", h, t + i / 2], ["Z"]];
      }, rect: an, roundedRect: Jr, square: an, triangle: function(h, t, e, i) {
        return [["M", h + e / 2, t], ["L", h + e, t + i], ["L", h, t + i], ["Z"]];
      }, "triangle-down": function(h, t, e, i) {
        return [["M", h, t], ["L", h + e, t], ["L", h + e / 2, t + i], ["Z"]];
      } }, { doc: to, SVG_NS: Wd, win: ln } = E, { attr: eo, extend: Hd, fireEvent: jd, isString: Xd, objectEach: Gd, pick: Yd } = V, io = (h, t) => h.substring(0, t) + "…", Ud = class {
        constructor(h) {
          let t = h.styles;
          this.renderer = h.renderer, this.svgElement = h, this.width = h.textWidth, this.textLineHeight = t == null ? void 0 : t.lineHeight, this.textOutline = t == null ? void 0 : t.textOutline, this.ellipsis = (t == null ? void 0 : t.textOverflow) === "ellipsis", this.lineClamp = t == null ? void 0 : t.lineClamp, this.noWrap = (t == null ? void 0 : t.whiteSpace) === "nowrap";
        }
        buildSVG() {
          let h = this.svgElement, t = h.element, e = h.renderer, i = Yd(h.textStr, "").toString(), s = i.indexOf("<") !== -1, r = t.childNodes, o = !h.added && e.box, a = [i, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, h.getStyle("font-size"), h.styles.lineClamp, this.width].join(",");
          if (a !== h.textCache) {
            h.textCache = a, delete h.actualWidth;
            for (let n = r.length; n--; ) t.removeChild(r[n]);
            if (s || this.ellipsis || this.width || h.textPath || i.indexOf(" ") !== -1 && (!this.noWrap || /<br.*?>/g.test(i))) {
              if (i !== "") {
                o && o.appendChild(t);
                let n = new Tt(i);
                this.modifyTree(n.nodes), n.addToDOM(t), this.modifyDOM(), this.ellipsis && (t.textContent || "").indexOf("…") !== -1 && h.attr("title", this.unescapeEntities(h.textStr || "", ["&lt;", "&gt;"])), o && o.removeChild(t);
              }
            } else t.appendChild(to.createTextNode(this.unescapeEntities(i)));
            Xd(this.textOutline) && h.applyTextOutline && h.applyTextOutline(this.textOutline);
          }
        }
        modifyDOM() {
          let h, t = this.svgElement, e = eo(t.element, "x");
          for (t.firstLineMetrics = void 0; (h = t.element.firstChild) && /^[\s\u200B]*$/.test(h.textContent || " "); ) t.element.removeChild(h);
          [].forEach.call(t.element.querySelectorAll("tspan.highcharts-br"), (o, a) => {
            o.nextSibling && o.previousSibling && (a === 0 && o.previousSibling.nodeType === 1 && (t.firstLineMetrics = t.renderer.fontMetrics(o.previousSibling)), eo(o, { dy: this.getLineHeight(o.nextSibling), x: e }));
          });
          let i = this.width || 0;
          if (!i) return;
          let s = (o, a) => {
            var x;
            let n = o.textContent || "", l = n.replace(/([^\^])-/g, "$1- ").split(" "), c = !this.noWrap && (l.length > 1 || t.element.childNodes.length > 1), d = this.getLineHeight(a), u = Math.max(0, i - 0.8 * d), p = 0, g = t.actualWidth;
            if (c) {
              let y = [], m = [];
              for (; a.firstChild && a.firstChild !== o; ) m.push(a.firstChild), a.removeChild(a.firstChild);
              for (; l.length; ) if (l.length && !this.noWrap && p > 0 && (y.push(o.textContent || ""), o.textContent = l.join(" ").replace(/- /g, "-")), this.truncate(o, void 0, l, p === 0 && g || 0, i, u, (v, w) => l.slice(0, w).join(" ").replace(/- /g, "-")), g = t.actualWidth, p++, this.lineClamp && p >= this.lineClamp) {
                l.length && (this.truncate(o, o.textContent || "", void 0, 0, i, u, io), o.textContent = ((x = o.textContent) == null ? void 0 : x.replace("…", "")) + "…");
                break;
              }
              m.forEach((v) => {
                a.insertBefore(v, o);
              }), y.forEach((v) => {
                a.insertBefore(to.createTextNode(v), o);
                let w = to.createElementNS(Wd, "tspan");
                w.textContent = "​", eo(w, { dy: d, x: e }), a.insertBefore(w, o);
              });
            } else this.ellipsis && n && this.truncate(o, n, void 0, 0, i, u, io);
          }, r = (o) => {
            [].slice.call(o.childNodes).forEach((a) => {
              a.nodeType === ln.Node.TEXT_NODE ? s(a, o) : (a.className.baseVal.indexOf("highcharts-br") !== -1 && (t.actualWidth = 0), r(a));
            });
          };
          r(t.element);
        }
        getLineHeight(h) {
          let t = h.nodeType === ln.Node.TEXT_NODE ? h.parentElement : h;
          return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(t || this.svgElement.element).h;
        }
        modifyTree(h) {
          let t = (e, i) => {
            let { attributes: s = {}, children: r, style: o = {}, tagName: a } = e, n = this.renderer.styledMode;
            if (a === "b" || a === "strong" ? n ? s.class = "highcharts-strong" : o.fontWeight = "bold" : (a === "i" || a === "em") && (n ? s.class = "highcharts-emphasized" : o.fontStyle = "italic"), o != null && o.color && (o.fill = o.color), a === "br") {
              s.class = "highcharts-br", e.textContent = "​";
              let l = h[i + 1];
              l != null && l.textContent && (l.textContent = l.textContent.replace(/^ +/gm, ""));
            } else a === "a" && r && r.some((l) => l.tagName === "#text") && (e.children = [{ children: r, tagName: "tspan" }]);
            a !== "#text" && a !== "a" && (e.tagName = "tspan"), Hd(e, { attributes: s, style: o }), r && r.filter((l) => l.tagName !== "#text").forEach(t);
          };
          h.forEach(t), jd(this.svgElement, "afterModifyTree", { nodes: h });
        }
        truncate(h, t, e, i, s, r, o) {
          let a, n, l = this.svgElement, { rotation: c } = l, d = [], u = e && !i ? 1 : 0, p = (t || e || "").length, g = p;
          e || (s = r);
          let x = function(y, m) {
            let v = m || y, w = h.parentNode;
            if (w && d[v] === void 0 && w.getSubStringLength) try {
              d[v] = i + w.getSubStringLength(0, e ? v + 1 : v);
            } catch {
            }
            return d[v];
          };
          if (l.rotation = 0, i + (n = x(h.textContent.length)) > s) {
            for (; u <= p; ) g = Math.ceil((u + p) / 2), e && (a = o(e, g)), n = x(g, a && a.length - 1), u === p ? u = p + 1 : n > s ? p = g - 1 : u = g;
            p === 0 ? h.textContent = "" : t && p === t.length - 1 || (h.textContent = a || o(t || e, g)), this.ellipsis && n > s && this.truncate(h, h.textContent || "", void 0, 0, s, r, io);
          }
          e && e.splice(0, g), l.actualWidth = n, l.rotation = c;
        }
        unescapeEntities(h, t) {
          return Gd(this.renderer.escapes, function(e, i) {
            t && t.indexOf(e) !== -1 || (h = h.toString().replace(RegExp(e, "g"), i));
          }), h;
        }
      }, { defaultOptions: qd } = re, { charts: $d, deg2rad: hn, doc: Li, isFirefox: dn, isMS: cn, isWebKit: Vd, noop: Kd, SVG_NS: Qd, symbolSizes: so, win: ro } = E, { addEvent: Ys, attr: Us, createElement: _d, crisp: un, css: qs, defined: ni, destroyObjectProperties: Zd, extend: li, isArray: Jd, isNumber: Ei, isObject: hs, isString: tc, merge: oo, pick: ao, pInt: ec, replaceNested: ic, uniqueKey: sc } = V;
      class $s {
        constructor(t, e, i, s, r, o, a) {
          let n, l;
          this.x = 0, this.y = 0;
          let c = this.createElement("svg").attr({ version: "1.1", class: "highcharts-root" }), d = c.element;
          a || c.css(this.getStyle(s || {})), t.appendChild(d), Us(t, "dir", "ltr"), t.innerHTML.indexOf("xmlns") === -1 && Us(d, "xmlns", this.SVG_NS), this.box = d, this.boxWrapper = c, this.alignedObjects = [], this.url = this.getReferenceURL(), this.createElement("desc").add().element.appendChild(Li.createTextNode("Created with Highcharts 12.2.0")), this.defs = this.createElement("defs").add(), this.allowHTML = o, this.forExport = r, this.styledMode = a, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.rootFontSize = c.getStyle("font-size"), this.setSize(e, i, !1), dn && t.getBoundingClientRect && ((n = function() {
            qs(t, { left: 0, top: 0 }), l = t.getBoundingClientRect(), qs(t, { left: Math.ceil(l.left) - l.left + "px", top: Math.ceil(l.top) - l.top + "px" });
          })(), this.unSubPixelFix = Ys(ro, "resize", n));
        }
        definition(t) {
          return new Tt([t]).addToDOM(this.defs.element);
        }
        getReferenceURL() {
          if ((dn || Vd) && Li.getElementsByTagName("base").length) {
            if (!ni(C)) {
              let t = sc(), e = new Tt([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: t }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": `url(#${t})`, fill: "rgba(0,0,0,0.001)" } }] }]).addToDOM(Li.body);
              qs(e, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              let i = Li.elementFromPoint(6, 6);
              C = (i == null ? void 0 : i.id) === "hitme", Li.body.removeChild(e);
            }
            if (C) return ic(ro.location.href.split("#")[0], [/<[^>]*>/g, ""], [/([\('\)])/g, "\\$1"], [/ /g, "%20"]);
          }
          return "";
        }
        getStyle(t) {
          return this.style = li({ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontSize: "1rem" }, t), this.style;
        }
        setStyle(t) {
          this.boxWrapper.css(this.getStyle(t));
        }
        isHidden() {
          return !this.boxWrapper.getBBox().width;
        }
        destroy() {
          let t = this.defs;
          return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), Zd(this.gradients || {}), this.gradients = null, this.defs = t.destroy(), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null, null;
        }
        createElement(t) {
          return new this.Element(this, t);
        }
        getRadialAttr(t, e) {
          return { cx: t[0] - t[2] / 2 + (e.cx || 0) * t[2], cy: t[1] - t[2] / 2 + (e.cy || 0) * t[2], r: (e.r || 0) * t[2] };
        }
        shadowDefinition(t) {
          let e = [`highcharts-drop-shadow-${this.chartIndex}`, ...Object.keys(t).map((s) => `${s}-${t[s]}`)].join("-").toLowerCase().replace(/[^a-z\d\-]/g, ""), i = oo({ color: "#000000", offsetX: 1, offsetY: 1, opacity: 0.15, width: 5 }, t);
          return this.defs.element.querySelector(`#${e}`) || this.definition({ tagName: "filter", attributes: { id: e, filterUnits: i.filterUnits }, children: this.getShadowFilterContent(i) }), e;
        }
        getShadowFilterContent(t) {
          return [{ tagName: "feDropShadow", attributes: { dx: t.offsetX, dy: t.offsetY, "flood-color": t.color, "flood-opacity": Math.min(5 * t.opacity, 1), stdDeviation: t.width / 2 } }];
        }
        buildText(t) {
          new Ud(t).buildSVG();
        }
        getContrast(t) {
          let e = At.parse(t).rgba, i = " clamp(0,calc(9e9*(0.5 - (0.2126*r + 0.7152*g + 0.0722*b))),1)";
          if (Ei(e[0]) || !At.useColorMix) {
            let s = e.map((o) => {
              let a = o / 255;
              return a <= 0.04 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
            }), r = 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
            return 1.05 / (r + 0.05) > (r + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
          }
          return "color(from " + t + " srgb" + i + i + i + ")";
        }
        button(t, e, i, s, r = {}, o, a, n, l, c) {
          let d = this.label(t, e, i, l, void 0, void 0, c, void 0, "button"), u = this.styledMode, p = arguments, g = 0;
          r = oo(qd.global.buttonTheme, r), u && (delete r.fill, delete r.stroke, delete r["stroke-width"]);
          let x = r.states || {}, y = r.style || {};
          delete r.states, delete r.style;
          let m = [Tt.filterUserAttributes(r)], v = [y];
          return u || ["hover", "select", "disabled"].forEach((w, T) => {
            m.push(oo(m[0], Tt.filterUserAttributes(p[T + 5] || x[w] || {}))), v.push(m[T + 1].style), delete m[T + 1].style;
          }), Ys(d.element, cn ? "mouseover" : "mouseenter", function() {
            g !== 3 && d.setState(1);
          }), Ys(d.element, cn ? "mouseout" : "mouseleave", function() {
            g !== 3 && d.setState(g);
          }), d.setState = (w = 0) => {
            if (w !== 1 && (d.state = g = w), d.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][w]), !u) {
              d.attr(m[w]);
              let T = v[w];
              hs(T) && d.css(T);
            }
          }, d.attr(m[0]), !u && (d.css(li({ cursor: "default" }, y)), c && d.text.css({ pointerEvents: "none" })), d.on("touchstart", (w) => w.stopPropagation()).on("click", function(w) {
            g !== 3 && (s == null || s.call(d, w));
          });
        }
        crispLine(t, e) {
          let [i, s] = t;
          return ni(i[1]) && i[1] === s[1] && (i[1] = s[1] = un(i[1], e)), ni(i[2]) && i[2] === s[2] && (i[2] = s[2] = un(i[2], e)), t;
        }
        path(t) {
          let e = this.styledMode ? {} : { fill: "none" };
          return Jd(t) ? e.d = t : hs(t) && li(e, t), this.createElement("path").attr(e);
        }
        circle(t, e, i) {
          let s = hs(t) ? t : t === void 0 ? {} : { x: t, y: e, r: i }, r = this.createElement("circle");
          return r.xSetter = r.ySetter = function(o, a, n) {
            n.setAttribute("c" + a, o);
          }, r.attr(s);
        }
        arc(t, e, i, s, r, o) {
          let a;
          hs(t) ? (e = (a = t).y, i = a.r, s = a.innerR, r = a.start, o = a.end, t = a.x) : a = { innerR: s, start: r, end: o };
          let n = this.symbol("arc", t, e, i, i, a);
          return n.r = i, n;
        }
        rect(t, e, i, s, r, o) {
          let a = hs(t) ? t : t === void 0 ? {} : { x: t, y: e, r, width: Math.max(i || 0, 0), height: Math.max(s || 0, 0) }, n = this.createElement("rect");
          return this.styledMode || (o !== void 0 && (a["stroke-width"] = o, li(a, n.crisp(a))), a.fill = "none"), n.rSetter = function(l, c, d) {
            n.r = l, Us(d, { rx: l, ry: l });
          }, n.rGetter = function() {
            return n.r || 0;
          }, n.attr(a);
        }
        roundedRect(t) {
          return this.symbol("roundedRect").attr(t);
        }
        setSize(t, e, i) {
          this.width = t, this.height = e, this.boxWrapper.animate({ width: t, height: e }, { step: function() {
            this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
          }, duration: ao(i, !0) ? void 0 : 0 }), this.alignElements();
        }
        g(t) {
          let e = this.createElement("g");
          return t ? e.attr({ class: "highcharts-" + t }) : e;
        }
        image(t, e, i, s, r, o) {
          let a = { preserveAspectRatio: "none" };
          Ei(e) && (a.x = e), Ei(i) && (a.y = i), Ei(s) && (a.width = s), Ei(r) && (a.height = r);
          let n = this.createElement("image").attr(a), l = function(c) {
            n.attr({ href: t }), o.call(n, c);
          };
          if (o) {
            n.attr({ href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" });
            let c = new ro.Image();
            Ys(c, "load", l), c.src = t, c.complete && l({});
          } else n.attr({ href: t });
          return n;
        }
        symbol(t, e, i, s, r, o) {
          var y, m;
          let a, n, l, c, d = this, u = /^url\((.*?)\)$/, p = u.test(t), g = !p && (this.symbols[t] ? t : "circle"), x = g && this.symbols[g];
          if (x) typeof e == "number" && (n = x.call(this.symbols, e || 0, i || 0, s || 0, r || 0, o)), a = this.path(n), d.styledMode || a.attr("fill", "none"), li(a, { symbolName: g || void 0, x: e, y: i, width: s, height: r }), o && li(a, o);
          else if (p) {
            l = t.match(u)[1];
            let v = a = this.image(l);
            v.imgwidth = ao(o == null ? void 0 : o.width, (y = so[l]) == null ? void 0 : y.width), v.imgheight = ao(o == null ? void 0 : o.height, (m = so[l]) == null ? void 0 : m.height), c = (w) => w.attr({ width: w.width, height: w.height }), ["width", "height"].forEach((w) => {
              v[`${w}Setter`] = function(T, S) {
                this[S] = T;
                let { alignByTranslate: M, element: P, width: A, height: L, imgwidth: R, imgheight: D } = this, N = S === "width" ? R : D, B = 1;
                o && o.backgroundSize === "within" && A && L && R && D ? (B = Math.min(A / R, L / D), Us(P, { width: Math.round(R * B), height: Math.round(D * B) })) : P && N && P.setAttribute(S, N), !M && R && D && this.translate(((A || 0) - R * B) / 2, ((L || 0) - D * B) / 2);
              };
            }), ni(e) && v.attr({ x: e, y: i }), v.isImg = !0, v.symbolUrl = t, ni(v.imgwidth) && ni(v.imgheight) ? c(v) : (v.attr({ width: 0, height: 0 }), _d("img", { onload: function() {
              let w = $d[d.chartIndex];
              this.width === 0 && (qs(this, { position: "absolute", top: "-999em" }), Li.body.appendChild(this)), so[l] = { width: this.width, height: this.height }, v.imgwidth = this.width, v.imgheight = this.height, v.element && c(v), this.parentNode && this.parentNode.removeChild(this), d.imgCount--, d.imgCount || !w || w.hasLoaded || w.onload();
            }, src: l }), this.imgCount++);
          }
          return a;
        }
        clipRect(t, e, i, s) {
          return this.rect(t, e, i, s, 0);
        }
        text(t, e, i, s) {
          let r = {};
          if (s && (this.allowHTML || !this.forExport)) return this.html(t, e, i);
          r.x = Math.round(e || 0), i && (r.y = Math.round(i)), ni(t) && (r.text = t);
          let o = this.createElement("text").attr(r);
          return s && (!this.forExport || this.allowHTML) || (o.xSetter = function(a, n, l) {
            let c = l.getElementsByTagName("tspan"), d = l.getAttribute(n);
            for (let u = 0, p; u < c.length; u++) (p = c[u]).getAttribute(n) === d && p.setAttribute(n, a);
            l.setAttribute(n, a);
          }), o;
        }
        fontMetrics(t) {
          let e = ec(we.prototype.getStyle.call(t, "font-size") || 0), i = e < 24 ? e + 3 : Math.round(1.2 * e), s = Math.round(0.8 * i);
          return { h: i, b: s, f: e };
        }
        rotCorr(t, e, i) {
          let s = t;
          return e && i && (s = Math.max(s * Math.cos(e * hn), 4)), { x: -t / 3 * Math.sin(e * hn), y: s };
        }
        pathToSegments(t) {
          let e = [], i = [], s = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
          for (let r = 0; r < t.length; r++) tc(i[0]) && Ei(t[r]) && i.length === s[i[0].toUpperCase()] && t.splice(r, 0, i[0].replace("M", "L").replace("m", "l")), typeof t[r] == "string" && (i.length && e.push(i.slice(0)), i.length = 0), i.push(t[r]);
          return e.push(i.slice(0)), e;
        }
        label(t, e, i, s, r, o, a, n, l) {
          return new ai(this, t, e, i, s, r, o, a, n, l);
        }
        alignElements() {
          this.alignedObjects.forEach((t) => t.align());
        }
      }
      li($s.prototype, { Element: we, SVG_NS: Qd, escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: nn, draw: Kd }), os.registerRendererType("svg", $s, !0);
      let { composed: rc, isFirefox: oc } = E, { attr: ac, css: Fe, createElement: nc, defined: pn, extend: lc, getAlignFactor: hc, isNumber: Vs, pInt: dc, pushUnique: cc } = V;
      function fn(h, t, e) {
        var s;
        let i = ((s = this.div) == null ? void 0 : s.style) || e.style;
        we.prototype[`${t}Setter`].call(this, h, t, e), i && (i[t] = h);
      }
      let uc = (h, t) => {
        var e;
        if (!h.div) {
          let i = ac(h.element, "class"), s = h.css, r = nc("div", i ? { className: i } : void 0, { position: "absolute", left: `${h.translateX || 0}px`, top: `${h.translateY || 0}px`, ...h.styles, display: h.display, opacity: h.opacity, visibility: h.visibility }, ((e = h.parentGroup) == null ? void 0 : e.div) || t);
          h.classSetter = (o, a, n) => {
            n.setAttribute("class", o), r.className = o;
          }, h.translateXSetter = h.translateYSetter = (o, a) => {
            h[a] = o, r.style[a === "translateX" ? "left" : "top"] = `${o}px`, h.doTransform = !0;
          }, h.opacitySetter = h.visibilitySetter = fn, h.css = (o) => (s.call(h, o), o.cursor && (r.style.cursor = o.cursor), o.pointerEvents && (r.style.pointerEvents = o.pointerEvents), h), h.on = function() {
            return we.prototype.on.apply({ element: r, onEvents: h.onEvents }, arguments), h;
          }, h.div = r;
        }
        return h.div;
      };
      class Ii extends we {
        static compose(t) {
          cc(rc, this.compose) && (t.prototype.html = function(e, i, s) {
            return new Ii(this, "span").attr({ text: e, x: Math.round(i), y: Math.round(s) });
          });
        }
        constructor(t, e) {
          super(t, e), Ii.useForeignObject ? this.foreignObject = t.createElement("foreignObject").attr({ zIndex: 2 }) : this.css({ position: "absolute", ...t.styledMode ? {} : { fontFamily: t.style.fontFamily, fontSize: t.style.fontSize } }), this.element.style.whiteSpace = "nowrap";
        }
        getSpanCorrection(t, e, i) {
          this.xCorr = -t * i, this.yCorr = -e;
        }
        css(t) {
          let e, { element: i } = this, s = i.tagName === "SPAN" && t && "width" in t, r = s && t.width;
          return s && (delete t.width, this.textWidth = dc(r) || void 0, e = !0), (t == null ? void 0 : t.textOverflow) === "ellipsis" && (t.overflow = "hidden", t.whiteSpace = "nowrap"), t != null && t.lineClamp && (t.display = "-webkit-box", t.WebkitLineClamp = t.lineClamp, t.WebkitBoxOrient = "vertical", t.overflow = "hidden"), Vs(Number(t == null ? void 0 : t.fontSize)) && (t.fontSize += "px"), lc(this.styles, t), Fe(i, t), e && this.updateTransform(), this;
        }
        htmlGetBBox() {
          let { element: t } = this;
          return { x: t.offsetLeft, y: t.offsetTop, width: t.offsetWidth, height: t.offsetHeight };
        }
        updateTransform() {
          var v;
          if (!this.added) {
            this.alignOnAdd = !0;
            return;
          }
          let { element: t, foreignObject: e, oldTextWidth: i, renderer: s, rotation: r, rotationOriginX: o, rotationOriginY: a, scaleX: n, scaleY: l, styles: { display: c = "inline-block", whiteSpace: d }, textAlign: u = "left", textWidth: p, translateX: g = 0, translateY: x = 0, x: y = 0, y: m = 0 } = this;
          if (e || Fe(t, { marginLeft: `${g}px`, marginTop: `${x}px` }), t.tagName === "SPAN") {
            let w, T = [r, u, t.innerHTML, p, this.textAlign].join(","), S = -(((v = this.parentGroup) == null ? void 0 : v.padding) * 1) || 0;
            if (p !== i) {
              let L = this.textPxLength ? this.textPxLength : (Fe(t, { width: "", whiteSpace: d || "nowrap" }), t.offsetWidth), R = p || 0, D = t.style.textOverflow === "" && t.style.webkitLineClamp;
              (R > i || L > R || D) && (/[\-\s\u00AD]/.test(t.textContent || t.innerText) || t.style.textOverflow === "ellipsis") && (Fe(t, { width: (r || n || L > R || D) && Vs(p) ? p + "px" : "auto", display: c, whiteSpace: d || "normal" }), this.oldTextWidth = p);
            }
            e && (Fe(t, { display: "inline-block", verticalAlign: "top" }), e.attr({ width: s.width, height: s.height })), T !== this.cTT && (w = s.fontMetrics(t).b, pn(r) && !e && (r !== (this.oldRotation || 0) || u !== this.oldAlign) && Fe(t, { transform: `rotate(${r}deg)`, transformOrigin: `${S}% ${S}px` }), this.getSpanCorrection(!pn(r) && !this.textWidth && this.textPxLength || t.offsetWidth, w, hc(u)));
            let { xCorr: M = 0, yCorr: P = 0 } = this, A = { left: `${y + M}px`, top: `${m + P}px`, textAlign: u, transformOrigin: `${(o ?? y) - M - y - S}px ${(a ?? m) - P - m - S}px` };
            (n || l) && (A.transform = `scale(${n ?? 1},${l ?? 1})`), e ? (super.updateTransform(), Vs(y) && Vs(m) ? (e.attr({ x: y + M, y: m + P, width: t.offsetWidth + 3, height: t.offsetHeight, "transform-origin": t.getAttribute("transform-origin") || "0 0" }), Fe(t, { display: c, textAlign: u })) : oc && e.attr({ width: 0, height: 0 })) : Fe(t, A), this.cTT = T, this.oldRotation = r, this.oldAlign = u;
          }
        }
        add(t) {
          let { foreignObject: e, renderer: i } = this, s = i.box.parentNode, r = [];
          if (e) e.add(t), super.add(i.createElement("body").attr({ xmlns: "http://www.w3.org/1999/xhtml" }).css({ background: "transparent", margin: "0 3px 0 0" }).add(e));
          else {
            let o;
            if (this.parentGroup = t, t && !(o = t.div)) {
              let a = t;
              for (; a; ) r.push(a), a = a.parentGroup;
              for (let n of r.reverse()) o = uc(n, s);
            }
            (o || s).appendChild(this.element);
          }
          return this.added = !0, this.alignOnAdd && this.updateTransform(), this;
        }
        textSetter(t) {
          t !== this.textStr && (delete this.bBox, delete this.oldTextWidth, Tt.setElementHTML(this.element, t ?? ""), this.textStr = t, this.doTransform = !0);
        }
        alignSetter(t) {
          this.alignValue = this.textAlign = t, this.doTransform = !0;
        }
        xSetter(t, e) {
          this[e] = t, this.doTransform = !0;
        }
      }
      let hi = Ii.prototype;
      hi.visibilitySetter = hi.opacitySetter = fn, hi.ySetter = hi.rotationSetter = hi.rotationOriginXSetter = hi.rotationOriginYSetter = hi.xSetter, function(h) {
        h.xAxis = { alignTicks: !0, allowDecimals: void 0, panningEnabled: !0, zIndex: 2, zoomEnabled: !0, dateTimeLabelFormats: { millisecond: { main: "%[HMSL]", range: !1 }, second: { main: "%[HMS]", range: !1 }, minute: { main: "%[HM]", range: !1 }, hour: { main: "%[HM]", range: !1 }, day: { main: "%[eb]" }, week: { main: "%[eb]" }, month: { main: "%[bY]" }, year: { main: "%Y" } }, endOnTick: !1, gridLineDashStyle: "Solid", gridZIndex: 1, labels: { autoRotationLimit: 80, distance: 15, enabled: !0, indentation: 10, overflow: "justify", reserveSpace: void 0, rotation: void 0, staggerLines: 0, step: 0, useHTML: !1, zIndex: 7, style: { color: "#333333", cursor: "default", fontSize: "0.8em", textOverflow: "ellipsis" } }, maxPadding: 0.01, minorGridLineDashStyle: "Solid", minorTickLength: 2, minorTickPosition: "outside", minorTicksPerMajor: 5, minPadding: 0.01, offset: void 0, reversed: void 0, reversedStacks: !1, showEmpty: !0, showFirstLabel: !0, showLastLabel: !0, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", useHTML: !1, x: 0, y: 0, style: { color: "#666666", fontSize: "0.8em" } }, visible: !0, minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#333333", lineWidth: 1, gridLineColor: "#e6e6e6", gridLineWidth: void 0, tickColor: "#333333" }, h.yAxis = { reversedStacks: !0, endOnTick: !0, maxPadding: 0.05, minPadding: 0.05, tickPixelInterval: 72, showLastLabel: !0, labels: { x: void 0 }, startOnTick: !0, title: {}, stackLabels: { animation: {}, allowOverlap: !1, enabled: !1, crop: !0, overflow: "justify", formatter: function() {
          let { numberFormatter: t } = this.axis.chart;
          return t(this.total || 0, -1);
        }, style: { color: "#000000", fontSize: "0.7em", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 };
      }(W || (W = {}));
      let pc = W, { addEvent: fc, isFunction: gc, objectEach: mc, removeEvent: yc } = V;
      (Y || (Y = {})).registerEventOptions = function(h, t) {
        h.eventOptions = h.eventOptions || {}, mc(t.events, function(e, i) {
          h.eventOptions[i] !== e && (h.eventOptions[i] && (yc(h, i, h.eventOptions[i]), delete h.eventOptions[i]), gc(e) && (h.eventOptions[i] = e, fc(h, i, e, { order: 0 })));
        });
      };
      let Ks = Y, { deg2rad: no } = E, { clamp: xc, correctFloat: Qs, defined: lo, destroyObjectProperties: bc, extend: gn, fireEvent: ds, getAlignFactor: vc, isNumber: _s, merge: wc, objectEach: kc, pick: ke } = V, Ri = class {
        constructor(h, t, e, i, s) {
          this.isNew = !0, this.isNewLabel = !0, this.axis = h, this.pos = t, this.type = e || "", this.parameters = s || {}, this.tickmarkOffset = this.parameters.tickmarkOffset, this.options = this.parameters.options, ds(this, "init"), e || i || this.addLabel();
        }
        addLabel() {
          var P;
          let h = this, t = h.axis, e = t.options, i = t.chart, s = t.categories, r = t.logarithmic, o = t.names, a = h.pos, n = ke((P = h.options) == null ? void 0 : P.labels, e.labels), l = t.tickPositions, c = a === l[0], d = a === l[l.length - 1], u = (!n.step || n.step === 1) && t.tickInterval === 1, p = l.info, g = h.label, x, y, m, v = this.parameters.category || (s ? ke(s[a], o[a], a) : a);
          r && _s(v) && (v = Qs(r.lin2log(v))), t.dateTime && (p ? x = (y = i.time.resolveDTLFormat(e.dateTimeLabelFormats[!e.grid && p.higherRanks[a] || p.unitName])).main : _s(v) && (x = t.dateTime.getXDateFormat(v, e.dateTimeLabelFormats || {}))), h.isFirst = c, h.isLast = d;
          let w = { axis: t, chart: i, dateTimeLabelFormat: x, isFirst: c, isLast: d, pos: a, tick: h, tickPositionInfo: p, value: v };
          ds(this, "labelFormat", w);
          let T = (A) => n.formatter ? n.formatter.call(A, A) : n.format ? (A.text = t.defaultLabelFormatter.call(A), oe.format(n.format, A, i)) : t.defaultLabelFormatter.call(A), S = T.call(w, w), M = y == null ? void 0 : y.list;
          M ? h.shortenLabel = function() {
            for (m = 0; m < M.length; m++) if (gn(w, { dateTimeLabelFormat: M[m] }), g.attr({ text: T.call(w, w) }), g.getBBox().width < t.getSlotWidth(h) - 2 * (n.padding || 0)) return;
            g.attr({ text: "" });
          } : h.shortenLabel = void 0, u && t._addedPlotLB && h.moveLabel(S, n), lo(g) || h.movedLabel ? g && g.textStr !== S && !u && (!g.textWidth || n.style.width || g.styles.width || g.css({ width: null }), g.attr({ text: S }), g.textPxLength = g.getBBox().width) : (h.label = g = h.createLabel(S, n), h.rotation = 0);
        }
        createLabel(h, t, e) {
          let i = this.axis, { renderer: s, styledMode: r } = i.chart, o = t.style.whiteSpace, a = lo(h) && t.enabled ? s.text(h, e == null ? void 0 : e.x, e == null ? void 0 : e.y, t.useHTML).add(i.labelGroup) : void 0;
          return a && (r || a.css(wc(t.style)), a.textPxLength = a.getBBox().width, !r && o && a.css({ whiteSpace: o })), a;
        }
        destroy() {
          bc(this, this.axis);
        }
        getPosition(h, t, e, i) {
          let s = this.axis, r = s.chart, o = i && r.oldChartHeight || r.chartHeight, a = { x: h ? Qs(s.translate(t + e, void 0, void 0, i) + s.transB) : s.left + s.offset + (s.opposite ? (i && r.oldChartWidth || r.chartWidth) - s.right - s.left : 0), y: h ? o - s.bottom + s.offset - (s.opposite ? s.height : 0) : Qs(o - s.translate(t + e, void 0, void 0, i) - s.transB) };
          return a.y = xc(a.y, -1e9, 1e9), ds(this, "afterGetPosition", { pos: a }), a;
        }
        getLabelPosition(h, t, e, i, s, r, o, a) {
          let n, l, c = this.axis, d = c.transA, u = c.isLinked && c.linkedParent ? c.linkedParent.reversed : c.reversed, p = c.staggerLines, g = c.tickRotCorr || { x: 0, y: 0 }, x = i || c.reserveSpaceDefault ? 0 : -c.labelOffset * (c.labelAlign === "center" ? 0.5 : 1), y = s.distance, m = {};
          return n = c.side === 0 ? e.rotation ? -y : -e.getBBox().height : c.side === 2 ? g.y + y : Math.cos(e.rotation * no) * (g.y - e.getBBox(!1, 0).height / 2), lo(s.y) && (n = c.side === 0 && c.horiz ? s.y + n : s.y), h = h + ke(s.x, [0, 1, 0, -1][c.side] * y) + x + g.x - (r && i ? r * d * (u ? -1 : 1) : 0), t = t + n - (r && !i ? r * d * (u ? 1 : -1) : 0), p && (l = o / (a || 1) % p, c.opposite && (l = p - l - 1), t += l * (c.labelOffset / p)), m.x = h, m.y = Math.round(t), ds(this, "afterGetLabelPosition", { pos: m, tickmarkOffset: r, index: o }), m;
        }
        getLabelSize() {
          return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
        }
        getMarkPath(h, t, e, i, s = !1, r) {
          return r.crispLine([["M", h, t], ["L", h + (s ? 0 : -e), t + (s ? e : 0)]], i);
        }
        handleOverflow(h) {
          var y;
          let t = this.axis, e = t.options.labels, i = h.x, s = t.chart.chartWidth, r = t.chart.spacing, o = ke(t.labelLeft, Math.min(t.pos, r[3])), a = ke(t.labelRight, Math.max(t.isRadial ? 0 : t.pos + t.len, s - r[1])), n = this.label, l = this.rotation, c = vc(t.labelAlign || n.attr("align")), d = n.getBBox().width, u = t.getSlotWidth(this), p = u, g = 1, x;
          l || e.overflow !== "justify" ? l < 0 && i - c * d < o ? x = Math.round(i / Math.cos(l * no) - o) : l > 0 && i + c * d > a && (x = Math.round((s - i) / Math.cos(l * no))) : (i - c * d < o ? p = h.x + p * (1 - c) - o : i + (1 - c) * d > a && (p = a - h.x + p * c, g = -1), (p = Math.min(u, p)) < u && t.labelAlign === "center" && (h.x += g * (u - p - c * (u - Math.min(d, p)))), (d > p || t.autoRotation && ((y = n == null ? void 0 : n.styles) != null && y.width)) && (x = p)), x && n && (this.shortenLabel ? this.shortenLabel() : n.css(gn({}, { width: Math.floor(x) + "px", lineClamp: +!t.isRadial })));
        }
        moveLabel(h, t) {
          let e = this, i = e.label, s = e.axis, r = !1, o;
          i && i.textStr === h ? (e.movedLabel = i, r = !0, delete e.label) : kc(s.ticks, function(a) {
            r || a.isNew || a === e || !a.label || a.label.textStr !== h || (e.movedLabel = a.label, r = !0, a.labelPos = e.movedLabel.xy, delete a.label);
          }), !r && (e.labelPos || i) && (o = e.labelPos || i.xy, e.movedLabel = e.createLabel(h, t, o), e.movedLabel && e.movedLabel.attr({ opacity: 0 }));
        }
        render(h, t, e) {
          var g;
          let i = this.axis, s = i.horiz, r = this.pos, o = ke(this.tickmarkOffset, i.tickmarkOffset), a = this.getPosition(s, r, o, t), n = a.x, l = a.y, c = i.pos, d = c + i.len, u = s ? n : l, p = ke(e, (g = this.label) == null ? void 0 : g.newOpacity, 1);
          !i.chart.polar && (Qs(u) < c || u > d) && (e = 0), e ?? (e = 1), this.isActive = !0, this.renderGridLine(t, e), this.renderMark(a, e), this.renderLabel(a, t, p, h), this.isNew = !1, ds(this, "afterRender");
        }
        renderGridLine(h, t) {
          let e = this.axis, i = e.options, s = {}, r = this.pos, o = this.type, a = ke(this.tickmarkOffset, e.tickmarkOffset), n = e.chart.renderer, l = this.gridLine, c, d = i.gridLineWidth, u = i.gridLineColor, p = i.gridLineDashStyle;
          this.type === "minor" && (d = i.minorGridLineWidth, u = i.minorGridLineColor, p = i.minorGridLineDashStyle), l || (e.chart.styledMode || (s.stroke = u, s["stroke-width"] = d || 0, s.dashstyle = p), o || (s.zIndex = 1), h && (t = 0), this.gridLine = l = n.path().attr(s).addClass("highcharts-" + (o ? o + "-" : "") + "grid-line").add(e.gridGroup)), l && (c = e.getPlotLinePath({ value: r + a, lineWidth: l.strokeWidth(), force: "pass", old: h, acrossPanes: !1 })) && l[h || this.isNew ? "attr" : "animate"]({ d: c, opacity: t });
        }
        renderMark(h, t) {
          let e = this.axis, i = e.options, s = e.chart.renderer, r = this.type, o = e.tickSize(r ? r + "Tick" : "tick"), a = h.x, n = h.y, l = ke(i[r !== "minor" ? "tickWidth" : "minorTickWidth"], !r && e.isXAxis ? 1 : 0), c = i[r !== "minor" ? "tickColor" : "minorTickColor"], d = this.mark, u = !d;
          o && (e.opposite && (o[0] = -o[0]), d || (this.mark = d = s.path().addClass("highcharts-" + (r ? r + "-" : "") + "tick").add(e.axisGroup), e.chart.styledMode || d.attr({ stroke: c, "stroke-width": l })), d[u ? "attr" : "animate"]({ d: this.getMarkPath(a, n, o[0], d.strokeWidth(), e.horiz, s), opacity: t }));
        }
        renderLabel(h, t, e, i) {
          let s = this.axis, r = s.horiz, o = s.options, a = this.label, n = o.labels, l = n.step, c = ke(this.tickmarkOffset, s.tickmarkOffset), d = h.x, u = h.y, p = !0;
          a && _s(d) && (a.xy = h = this.getLabelPosition(d, u, a, r, n, c, i, l), (!this.isFirst || this.isLast || o.showFirstLabel) && (!this.isLast || this.isFirst || o.showLastLabel) ? !r || n.step || n.rotation || t || e === 0 || this.handleOverflow(h) : p = !1, l && i % l && (p = !1), p && _s(h.y) ? (h.opacity = e, a[this.isNewLabel ? "attr" : "animate"](h).show(!0), this.isNewLabel = !1) : (a.hide(), this.isNewLabel = !0));
        }
        replaceMovedLabel() {
          let h = this.label, t = this.axis;
          h && !this.isNew && (h.animate({ opacity: 0 }, void 0, h.destroy), delete this.label), t.isDirty = !0, this.label = this.movedLabel, delete this.movedLabel;
        }
      }, { animObject: Sc } = Xt, { xAxis: mn, yAxis: Mc } = pc, { defaultOptions: ho } = re, { registerEventOptions: Cc } = Ks, { deg2rad: Tc } = E, { arrayMax: yn, arrayMin: Ac, clamp: co, correctFloat: ee, defined: St, destroyObjectProperties: Oc, erase: xn, error: uo, extend: Zs, fireEvent: Ot, getClosestDistance: bn, insertItem: Pc, isArray: vn, isNumber: Z, isString: wn, merge: Js, normalizeTickInterval: Lc, objectEach: tr, pick: lt, relativeLength: er, removeEvent: Ec, splat: Ic, syncTimeout: Rc } = V, kn = (h, t) => Lc(t, void 0, void 0, lt(h.options.allowDecimals, t < 0.5 || h.tickAmount !== void 0), !!h.tickAmount);
      Zs(ho, { xAxis: mn, yAxis: Js(mn, Mc) });
      class Di {
        constructor(t, e, i) {
          this.init(t, e, i);
        }
        init(t, e, i = this.coll) {
          let s = i === "xAxis", r = this.isZAxis || (t.inverted ? !s : s);
          this.chart = t, this.horiz = r, this.isXAxis = s, this.coll = i, Ot(this, "init", { userOptions: e }), this.opposite = lt(e.opposite, this.opposite), this.side = lt(e.side, this.side, r ? 2 * !this.opposite : this.opposite ? 1 : 3), this.setOptions(e);
          let o = this.options, a = o.labels;
          this.type ?? (this.type = o.type || "linear"), this.uniqueNames ?? (this.uniqueNames = o.uniqueNames ?? !0), Ot(this, "afterSetType"), this.userOptions = e, this.minPixelPadding = 0, this.reversed = lt(o.reversed, this.reversed), this.visible = o.visible, this.zoomEnabled = o.zoomEnabled, this.hasNames = this.type === "category" || o.categories === !0, this.categories = vn(o.categories) && o.categories || (this.hasNames ? [] : void 0), this.names || (this.names = [], this.names.keys = {}), this.plotLinesAndBandsGroups = {}, this.positiveValuesOnly = !!this.logarithmic, this.isLinked = St(o.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len ?? (this.len = 0), this.minRange = this.userMinRange = o.minRange || o.maxZoom, this.range = o.range, this.offset = o.offset || 0, this.max = void 0, this.min = void 0;
          let n = lt(o.crosshair, Ic(t.options.tooltip.crosshairs)[+!s]);
          this.crosshair = n === !0 ? {} : n, t.axes.indexOf(this) === -1 && (s ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), Pc(this, t[this.coll])), t.orderItems(this.coll), this.series = this.series || [], t.inverted && !this.isZAxis && s && !St(this.reversed) && (this.reversed = !0), this.labelRotation = Z(a.rotation) ? a.rotation : void 0, Cc(this, o), Ot(this, "afterInit");
        }
        setOptions(t) {
          let e = this.horiz ? { labels: { autoRotation: [-45], padding: 3 }, margin: 15 } : { labels: { padding: 1 }, title: { rotation: 90 * this.side } };
          this.options = Js(e, this.coll === "yAxis" ? { title: { text: this.chart.options.lang.yAxisTitle } } : {}, ho[this.coll], t), Ot(this, "afterSetOptions", { userOptions: t });
        }
        defaultLabelFormatter() {
          let t = this.axis, { numberFormatter: e } = this.chart, i = Z(this.value) ? this.value : NaN, s = t.chart.time, r = t.categories, o = this.dateTimeLabelFormat, a = ho.lang, n = a.numericSymbols, l = a.numericSymbolMagnitude || 1e3, c = t.logarithmic ? Math.abs(i) : t.tickInterval, d = n == null ? void 0 : n.length, u, p;
          if (r) p = `${this.value}`;
          else if (o) p = s.dateFormat(o, i, !0);
          else if (d && n && c >= 1e3) for (; d-- && p === void 0; ) c >= (u = Math.pow(l, d + 1)) && 10 * i % u == 0 && n[d] !== null && i !== 0 && (p = e(i / u, -1) + n[d]);
          return p === void 0 && (p = Math.abs(i) >= 1e4 ? e(i, -1) : e(i, -1, void 0, "")), p;
        }
        getSeriesExtremes() {
          let t, e = this;
          Ot(this, "getSeriesExtremes", null, function() {
            e.hasVisibleSeries = !1, e.dataMin = e.dataMax = e.threshold = void 0, e.softThreshold = !e.isXAxis, e.series.forEach((i) => {
              if (i.reserveSpace()) {
                let s = i.options, r, o = s.threshold, a, n;
                if (e.hasVisibleSeries = !0, e.positiveValuesOnly && 0 >= (o || 0) && (o = void 0), e.isXAxis) (r = i.getColumn("x")).length && (r = e.logarithmic ? r.filter((l) => l > 0) : r, a = (t = i.getXExtremes(r)).min, n = t.max, Z(a) || a instanceof Date || (r = r.filter(Z), a = (t = i.getXExtremes(r)).min, n = t.max), r.length && (e.dataMin = Math.min(lt(e.dataMin, a), a), e.dataMax = Math.max(lt(e.dataMax, n), n)));
                else {
                  let l = i.applyExtremes();
                  Z(l.dataMin) && (a = l.dataMin, e.dataMin = Math.min(lt(e.dataMin, a), a)), Z(l.dataMax) && (n = l.dataMax, e.dataMax = Math.max(lt(e.dataMax, n), n)), St(o) && (e.threshold = o), (!s.softThreshold || e.positiveValuesOnly) && (e.softThreshold = !1);
                }
              }
            });
          }), Ot(this, "afterGetSeriesExtremes");
        }
        translate(t, e, i, s, r, o) {
          var x;
          let a = this.linkedParent || this, n = s && a.old ? a.old.min : a.min;
          if (!Z(n)) return NaN;
          let l = a.minPixelPadding, c = (a.isOrdinal || ((x = a.brokenAxis) == null ? void 0 : x.hasBreaks) || a.logarithmic && r) && a.lin2val, d = 1, u = 0, p = s && a.old ? a.old.transA : a.transA, g = 0;
          return p || (p = a.transA), i && (d *= -1, u = a.len), a.reversed && (d *= -1, u -= d * (a.sector || a.len)), e ? (g = (t = t * d + u - l) / p + n, c && (g = a.lin2val(g))) : (c && (t = a.val2lin(t)), g = d * (t - n) * p + u + d * l + (Z(o) ? p * o : 0), a.isRadial || (g = ee(g))), g;
        }
        toPixels(t, e) {
          var i;
          return this.translate(((i = this.chart) == null ? void 0 : i.time.parse(t)) ?? NaN, !1, !this.horiz, void 0, !0) + (e ? 0 : this.pos);
        }
        toValue(t, e) {
          return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, void 0, !0);
        }
        getPlotLinePath(t) {
          let e = this, i = e.chart, s = e.left, r = e.top, o = t.old, a = t.value, n = t.lineWidth, l = o && i.oldChartHeight || i.chartHeight, c = o && i.oldChartWidth || i.chartWidth, d = e.transB, u = t.translatedValue, p = t.force, g, x, y, m, v;
          function w(S, M, P) {
            return p !== "pass" && (S < M || S > P) && (p ? S = co(S, M, P) : v = !0), S;
          }
          let T = { value: a, lineWidth: n, old: o, force: p, acrossPanes: t.acrossPanes, translatedValue: u };
          return Ot(this, "getPlotLinePath", T, function(S) {
            g = y = (u = co(u = lt(u, e.translate(a, void 0, void 0, o)), -1e9, 1e9)) + d, x = m = l - u - d, Z(u) ? e.horiz ? (x = r, m = l - e.bottom + (e.options.isInternal ? 0 : i.scrollablePixelsY || 0), g = y = w(g, s, s + e.width)) : (g = s, y = c - e.right + (i.scrollablePixelsX || 0), x = m = w(x, r, r + e.height)) : (v = !0, p = !1), S.path = v && !p ? void 0 : i.renderer.crispLine([["M", g, x], ["L", y, m]], n || 1);
          }), T.path;
        }
        getLinearTickPositions(t, e, i) {
          let s, r, o, a = ee(Math.floor(e / t) * t), n = ee(Math.ceil(i / t) * t), l = [];
          if (ee(a + t) === a && (o = 20), this.single) return [e];
          for (s = a; s <= n && (l.push(s), (s = ee(s + t, o)) !== r); ) r = s;
          return l;
        }
        getMinorTickInterval() {
          let { minorTicks: t, minorTickInterval: e } = this.options;
          return t === !0 ? lt(e, "auto") : t !== !1 ? e : void 0;
        }
        getMinorTickPositions() {
          var c;
          let t = this.options, e = this.tickPositions, i = this.minorTickInterval, s = this.pointRangePadding || 0, r = (this.min || 0) - s, o = (this.max || 0) + s, a = (c = this.brokenAxis) != null && c.hasBreaks ? this.brokenAxis.unitLength : o - r, n = [], l;
          if (a && a / i < this.len / 3) {
            let d = this.logarithmic;
            if (d) this.paddedTicks.forEach(function(u, p, g) {
              p && n.push.apply(n, d.getLogTickPositions(i, g[p - 1], g[p], !0));
            });
            else if (this.dateTime && this.getMinorTickInterval() === "auto") n = n.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(i), r, o, t.startOfWeek));
            else for (l = r + (e[0] - r) % i; l <= o && l !== n[0]; l += i) n.push(l);
          }
          return n.length !== 0 && this.trimTicks(n), n;
        }
        adjustForMinRange() {
          let t = this.options, e = this.logarithmic, i = this.chart.time, { max: s, min: r, minRange: o } = this, a, n, l, c;
          this.isXAxis && o === void 0 && !e && (o = St(t.min) || St(t.max) || St(t.floor) || St(t.ceiling) ? null : Math.min(5 * (bn(this.series.map((d) => {
            let u = d.getColumn("x");
            return d.xIncrement ? u.slice(0, 2) : u;
          })) || 0), this.dataMax - this.dataMin)), Z(s) && Z(r) && Z(o) && s - r < o && (n = this.dataMax - this.dataMin >= o, a = (o - s + r) / 2, l = [r - a, i.parse(t.min) ?? r - a], n && (l[2] = e ? e.log2lin(this.dataMin) : this.dataMin), c = [(r = yn(l)) + o, i.parse(t.max) ?? r + o], n && (c[2] = e ? e.log2lin(this.dataMax) : this.dataMax), (s = Ac(c)) - r < o && (l[0] = s - o, l[1] = i.parse(t.min) ?? s - o, r = yn(l))), this.minRange = o, this.min = r, this.max = s;
        }
        getClosest() {
          let t, e;
          if (this.categories) e = 1;
          else {
            let i = [];
            this.series.forEach(function(s) {
              let r = s.closestPointRange, o = s.getColumn("x");
              o.length === 1 ? i.push(o[0]) : s.sorted && St(r) && s.reserveSpace() && (e = St(e) ? Math.min(e, r) : r);
            }), i.length && (i.sort((s, r) => s - r), t = bn([i]));
          }
          return t && e ? Math.min(t, e) : t || e;
        }
        nameToX(t) {
          let e = vn(this.options.categories), i = e ? this.categories : this.names, s = t.options.x, r;
          return t.series.requireSorting = !1, St(s) || (s = this.uniqueNames && i ? e ? i.indexOf(t.name) : lt(i.keys[t.name], -1) : t.series.autoIncrement()), s === -1 ? !e && i && (r = i.length) : Z(s) && (r = s), r !== void 0 ? (this.names[r] = t.name, this.names.keys[t.name] = r) : t.x && (r = t.x), r;
        }
        updateNames() {
          let t = this, e = this.names;
          e.length > 0 && (Object.keys(e.keys).forEach(function(i) {
            delete e.keys[i];
          }), e.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach((i) => {
            i.xIncrement = null, (!i.points || i.isDirtyData) && (t.max = Math.max(t.max || 0, i.dataTable.rowCount - 1), i.processData(), i.generatePoints());
            let s = i.getColumn("x").slice();
            i.data.forEach((r, o) => {
              let a = s[o];
              r != null && r.options && r.name !== void 0 && (a = t.nameToX(r)) !== void 0 && a !== r.x && (s[o] = r.x = a);
            }), i.dataTable.setColumn("x", s);
          }));
        }
        setAxisTranslation() {
          var u;
          let t = this, e = t.max - t.min, i = t.linkedParent, s = !!t.categories, r = t.isXAxis, o = t.axisPointRange || 0, a, n = 0, l = 0, c, d = t.transA;
          (r || s || o) && (a = t.getClosest(), i ? (n = i.minPointOffset, l = i.pointRangePadding) : t.series.forEach(function(p) {
            let g = s ? 1 : r ? lt(p.options.pointRange, a, 0) : t.axisPointRange || 0, x = p.options.pointPlacement;
            if (o = Math.max(o, g), !t.single || s) {
              let y = p.is("xrange") ? !r : r;
              n = Math.max(n, y && wn(x) ? 0 : g / 2), l = Math.max(l, y && x === "on" ? 0 : g);
            }
          }), c = (u = t.ordinal) != null && u.slope && a ? t.ordinal.slope / a : 1, t.minPointOffset = n *= c, t.pointRangePadding = l *= c, t.pointRange = Math.min(o, t.single && s ? 1 : e), r && (t.closestPointRange = a)), t.translationSlope = t.transA = d = t.staticScale || t.len / (e + l || 1), t.transB = t.horiz ? t.left : t.bottom, t.minPixelPadding = d * n, Ot(this, "afterSetAxisTranslation");
        }
        minFromRange() {
          let { max: t, min: e } = this;
          return Z(t) && Z(e) && t - e || void 0;
        }
        setTickInterval(t) {
          var j, it, G, et;
          let { categories: e, chart: i, dataMax: s, dataMin: r, dateTime: o, isXAxis: a, logarithmic: n, options: l, softThreshold: c } = this, d = i.time, u = Z(this.threshold) ? this.threshold : void 0, p = this.minRange || 0, { ceiling: g, floor: x, linkedTo: y, softMax: m, softMin: v } = l, w = Z(y) && ((j = i[this.coll]) == null ? void 0 : j[y]), T = l.tickPixelInterval, S = l.maxPadding, M = l.minPadding, P = 0, A, L = Z(l.tickInterval) && l.tickInterval >= 0 ? l.tickInterval : void 0, R, D, N, B;
          if (o || e || w || this.getTickAmount(), N = lt(this.userMin, d.parse(l.min)), B = lt(this.userMax, d.parse(l.max)), w ? (this.linkedParent = w, A = w.getExtremes(), this.min = lt(A.min, A.dataMin), this.max = lt(A.max, A.dataMax), this.type !== w.type && uo(11, !0, i)) : (c && St(u) && Z(s) && Z(r) && (r >= u ? (R = u, M = 0) : s <= u && (D = u, S = 0)), this.min = lt(N, R, r), this.max = lt(B, D, s)), Z(this.max) && Z(this.min) && (n && (this.positiveValuesOnly && !t && 0 >= Math.min(this.min, lt(r, this.min)) && uo(10, !0, i), this.min = ee(n.log2lin(this.min), 16), this.max = ee(n.log2lin(this.max), 16)), this.range && Z(r) && (this.userMin = this.min = N = Math.max(r, this.minFromRange() || 0), this.userMax = B = this.max, this.range = void 0)), Ot(this, "foundExtremes"), this.adjustForMinRange(), Z(this.min) && Z(this.max)) {
            if (!Z(this.userMin) && Z(v) && v < this.min && (this.min = N = v), !Z(this.userMax) && Z(m) && m > this.max && (this.max = B = m), e || this.axisPointRange || (it = this.stacking) != null && it.usePercentage || w || !(P = this.max - this.min) || (!St(N) && M && (this.min -= P * M), St(B) || !S || (this.max += P * S)), !Z(this.userMin) && Z(x) && (this.min = Math.max(this.min, x)), !Z(this.userMax) && Z(g) && (this.max = Math.min(this.max, g)), c && Z(r) && Z(s)) {
              let ct = u || 0;
              !St(N) && this.min < ct && r >= ct ? this.min = l.minRange ? Math.min(ct, this.max - p) : ct : !St(B) && this.max > ct && s <= ct && (this.max = l.minRange ? Math.max(ct, this.min + p) : ct);
            }
            !i.polar && this.min > this.max && (St(l.min) ? this.max = this.min : St(l.max) && (this.min = this.max)), P = this.max - this.min;
          }
          if (this.min !== this.max && Z(this.min) && Z(this.max) ? w && !L && T === w.options.tickPixelInterval ? this.tickInterval = L = w.tickInterval : this.tickInterval = lt(L, this.tickAmount ? P / Math.max(this.tickAmount - 1, 1) : void 0, e ? 1 : P * T / Math.max(this.len, T)) : this.tickInterval = 1, a && !t) {
            let ct = this.min !== ((G = this.old) == null ? void 0 : G.min) || this.max !== ((et = this.old) == null ? void 0 : et.max);
            this.series.forEach(function(dt) {
              var pt;
              dt.forceCrop = (pt = dt.forceCropping) == null ? void 0 : pt.call(dt), dt.processData(ct);
            }), Ot(this, "postProcessData", { hasExtremesChanged: ct });
          }
          this.setAxisTranslation(), Ot(this, "initialAxisTranslation"), this.pointRange && !L && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          let X = lt(l.minTickInterval, o && !this.series.some((ct) => !ct.sorted) ? this.closestPointRange : 0);
          !L && X && this.tickInterval < X && (this.tickInterval = X), o || n || L || (this.tickInterval = kn(this, this.tickInterval)), this.tickAmount || (this.tickInterval = this.unsquish()), this.setTickPositions();
        }
        setTickPositions() {
          var c, d;
          let t = this.options, e = t.tickPositions, i = t.tickPositioner, s = this.getMinorTickInterval(), r = !this.isPanning, o = r && t.startOnTick, a = r && t.endOnTick, n = [], l;
          if (this.tickmarkOffset = this.categories && t.tickmarkPlacement === "between" && this.tickInterval === 1 ? 0.5 : 0, this.single = this.min === this.max && St(this.min) && !this.tickAmount && (this.min % 1 == 0 || t.allowDecimals !== !1), e) n = e.slice();
          else if (Z(this.min) && Z(this.max)) {
            if (!((c = this.ordinal) != null && c.positions) && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) n = [this.min, this.max], uo(19, !1, this.chart);
            else if (this.dateTime) n = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, t.units), this.min, this.max, t.startOfWeek, (d = this.ordinal) == null ? void 0 : d.positions, this.closestPointRange, !0);
            else if (this.logarithmic) n = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
            else {
              let u = this.tickInterval, p = u;
              for (; p <= 2 * u && (n = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && n.length > this.tickAmount); ) this.tickInterval = kn(this, p *= 1.1);
            }
            n.length > this.len && (n = [n[0], n[n.length - 1]])[0] === n[1] && (n.length = 1), i && (this.tickPositions = n, (l = i.apply(this, [this.min, this.max])) && (n = l));
          }
          this.tickPositions = n, this.minorTickInterval = s === "auto" && this.tickInterval ? this.tickInterval / t.minorTicksPerMajor : s, this.paddedTicks = n.slice(0), this.trimTicks(n, o, a), !this.isLinked && Z(this.min) && Z(this.max) && (this.single && n.length < 2 && !this.categories && !this.series.some((u) => u.is("heatmap") && u.options.pointPlacement === "between") && (this.min -= 0.5, this.max += 0.5), e || l || this.adjustTickAmount()), Ot(this, "afterSetTickPositions");
        }
        trimTicks(t, e, i) {
          let s = t[0], r = t[t.length - 1], o = !this.isOrdinal && this.minPointOffset || 0;
          if (Ot(this, "trimTicks"), !this.isLinked || !this.grid) {
            if (e && s !== -1 / 0) this.min = s;
            else for (; this.min - o > t[0]; ) t.shift();
            if (i) this.max = r;
            else for (; this.max + o < t[t.length - 1]; ) t.pop();
            t.length === 0 && St(s) && !this.options.tickPositions && t.push((r + s) / 2);
          }
        }
        alignToOthers() {
          let t, e = this, i = e.chart, s = [this], r = e.options, o = i.options.chart, a = this.coll === "yAxis" && o.alignThresholds, n = [];
          if (e.thresholdAlignment = void 0, (o.alignTicks !== !1 && r.alignTicks || a) && r.startOnTick !== !1 && r.endOnTick !== !1 && !e.logarithmic) {
            let l = (d) => {
              let { horiz: u, options: p } = d;
              return [u ? p.left : p.top, p.width, p.height, p.pane].join(",");
            }, c = l(this);
            i[this.coll].forEach(function(d) {
              let { series: u } = d;
              u.length && u.some((p) => p.visible) && d !== e && l(d) === c && (t = !0, s.push(d));
            });
          }
          if (t && a) {
            s.forEach((c) => {
              let d = c.getThresholdAlignment(e);
              Z(d) && n.push(d);
            });
            let l = n.length > 1 ? n.reduce((c, d) => c += d, 0) / n.length : void 0;
            s.forEach((c) => {
              c.thresholdAlignment = l;
            });
          }
          return t;
        }
        getThresholdAlignment(t) {
          if ((!Z(this.dataMin) || this !== t && this.series.some((e) => e.isDirty || e.isDirtyData)) && this.getSeriesExtremes(), Z(this.threshold)) {
            let e = co((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1);
            return this.options.reversed && (e = 1 - e), e;
          }
        }
        getTickAmount() {
          let t = this.options, e = t.tickPixelInterval, i = t.tickAmount;
          St(t.tickInterval) || i || !(this.len < e) || this.isRadial || this.logarithmic || !t.startOnTick || !t.endOnTick || (i = 2), !i && this.alignToOthers() && (i = Math.ceil(this.len / e) + 1), i < 4 && (this.finalTickAmt = i, i = 5), this.tickAmount = i;
        }
        adjustTickAmount() {
          let t = this, { finalTickAmt: e, max: i, min: s, options: r, tickPositions: o, tickAmount: a, thresholdAlignment: n } = t, l = o == null ? void 0 : o.length, c = lt(t.threshold, t.softThreshold ? 0 : null), d, u, p = t.tickInterval, g, x = () => o.push(ee(o[o.length - 1] + p)), y = () => o.unshift(ee(o[0] - p));
          if (Z(n) && (g = n < 0.5 ? Math.ceil(n * (a - 1)) : Math.floor(n * (a - 1)), r.reversed && (g = a - 1 - g)), t.hasData() && Z(s) && Z(i)) {
            let m = () => {
              t.transA *= (l - 1) / (a - 1), t.min = r.startOnTick ? o[0] : Math.min(s, o[0]), t.max = r.endOnTick ? o[o.length - 1] : Math.max(i, o[o.length - 1]);
            };
            if (Z(g) && Z(t.threshold)) {
              for (; o[g] !== c || o.length !== a || o[0] > s || o[o.length - 1] < i; ) {
                for (o.length = 0, o.push(t.threshold); o.length < a; ) o[g] === void 0 || o[g] > t.threshold ? y() : x();
                if (p > 8 * t.tickInterval) break;
                p *= 2;
              }
              m();
            } else if (l < a) {
              for (; o.length < a; ) o.length % 2 || s === c ? x() : y();
              m();
            }
            if (St(e)) {
              for (u = d = o.length; u--; ) (e === 3 && u % 2 == 1 || e <= 2 && u > 0 && u < d - 1) && o.splice(u, 1);
              t.finalTickAmt = void 0;
            }
          }
        }
        setScale() {
          var o, a, n, l, c;
          let { coll: t, stacking: e } = this, i = !1, s = !1;
          this.series.forEach((d) => {
            var u;
            i = i || d.isDirtyData || d.isDirty, s = s || ((u = d.xAxis) == null ? void 0 : u.isDirty) || !1;
          }), this.setAxisSize();
          let r = this.len !== ((o = this.old) == null ? void 0 : o.len);
          r || i || s || this.isLinked || this.forceRedraw || this.userMin !== ((a = this.old) == null ? void 0 : a.userMin) || this.userMax !== ((n = this.old) == null ? void 0 : n.userMax) || this.alignToOthers() ? (e && t === "yAxis" && e.buildStacks(), this.forceRedraw = !1, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), e && t === "xAxis" && e.buildStacks(), this.isDirty || (this.isDirty = r || this.min !== ((l = this.old) == null ? void 0 : l.min) || this.max !== ((c = this.old) == null ? void 0 : c.max))) : e && e.cleanStacks(), i && delete this.allExtremes, Ot(this, "afterSetScale");
        }
        setExtremes(t, e, i = !0, s, r) {
          let o = this.chart;
          this.series.forEach((a) => {
            delete a.kdTree;
          }), t = o.time.parse(t), e = o.time.parse(e), Ot(this, "setExtremes", r = Zs(r, { min: t, max: e }), (a) => {
            this.userMin = a.min, this.userMax = a.max, this.eventArgs = a, i && o.redraw(s);
          });
        }
        setAxisSize() {
          let t = this.chart, e = this.options, i = e.offsets || [0, 0, 0, 0], s = this.horiz, r = this.width = Math.round(er(lt(e.width, t.plotWidth - i[3] + i[1]), t.plotWidth)), o = this.height = Math.round(er(lt(e.height, t.plotHeight - i[0] + i[2]), t.plotHeight)), a = this.top = Math.round(er(lt(e.top, t.plotTop + i[0]), t.plotHeight, t.plotTop)), n = this.left = Math.round(er(lt(e.left, t.plotLeft + i[3]), t.plotWidth, t.plotLeft));
          this.bottom = t.chartHeight - o - a, this.right = t.chartWidth - r - n, this.len = Math.max(s ? r : o, 0), this.pos = s ? n : a;
        }
        getExtremes() {
          let t = this.logarithmic;
          return { min: t ? ee(t.lin2log(this.min)) : this.min, max: t ? ee(t.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
        }
        getThreshold(t) {
          let e = this.logarithmic, i = e ? e.lin2log(this.min) : this.min, s = e ? e.lin2log(this.max) : this.max;
          return t === null || t === -1 / 0 ? t = i : t === 1 / 0 ? t = s : i > t ? t = i : s < t && (t = s), this.translate(t, 0, 1, 0, 1);
        }
        autoLabelAlign(t) {
          let e = (lt(t, 0) - 90 * this.side + 720) % 360, i = { align: "center" };
          return Ot(this, "autoLabelAlign", i, function(s) {
            e > 15 && e < 165 ? s.align = "right" : e > 195 && e < 345 && (s.align = "left");
          }), i.align;
        }
        tickSize(t) {
          let e = this.options, i = lt(e[t === "tick" ? "tickWidth" : "minorTickWidth"], t === "tick" && this.isXAxis && !this.categories ? 1 : 0), s = e[t === "tick" ? "tickLength" : "minorTickLength"], r;
          i && s && (e[t + "Position"] === "inside" && (s = -s), r = [s, i]);
          let o = { tickSize: r };
          return Ot(this, "afterTickSize", o), o.tickSize;
        }
        labelMetrics() {
          let t = this.chart.renderer, e = this.ticks, i = e[Object.keys(e)[0]] || {};
          return this.chart.renderer.fontMetrics(i.label || i.movedLabel || t.box);
        }
        unsquish() {
          let t = this.options.labels, e = t.padding || 0, i = this.horiz, s = this.tickInterval, r = this.len / ((+!!this.categories + this.max - this.min) / s), o = t.rotation, a = ee(0.8 * this.labelMetrics().h), n = Math.max(this.max - this.min, 0), l = function(g) {
            let x = (g + 2 * e) / (r || 1);
            return (x = x > 1 ? Math.ceil(x) : 1) * s > n && g !== 1 / 0 && r !== 1 / 0 && n && (x = Math.ceil(n / s)), ee(x * s);
          }, c = s, d, u = Number.MAX_VALUE, p;
          if (i) {
            if (!t.staggerLines && (Z(o) ? p = [o] : r < t.autoRotationLimit && (p = t.autoRotation)), p) {
              let g, x;
              for (let y of p) (y === o || y && y >= -90 && y <= 90) && (x = (g = l(Math.abs(a / Math.sin(Tc * y)))) + Math.abs(y / 360)) < u && (u = x, d = y, c = g);
            }
          } else c = l(0.75 * a);
          return this.autoRotation = p, this.labelRotation = lt(d, Z(o) ? o : 0), t.step ? s : c;
        }
        getSlotWidth(t) {
          let e = this.chart, i = this.horiz, s = this.options.labels, r = Math.max(this.tickPositions.length - +!this.categories, 1), o = e.margin[3];
          if (t && Z(t.slotWidth)) return t.slotWidth;
          if (i && s.step < 2 && !this.isRadial) return s.rotation ? 0 : (this.staggerLines || 1) * this.len / r;
          if (!i) {
            let a = s.style.width;
            if (a !== void 0) return parseInt(String(a), 10);
            if (o) return o - e.spacing[3];
          }
          return 0.33 * e.chartWidth;
        }
        renderUnsquish() {
          let t = this.chart, e = t.renderer, i = this.tickPositions, s = this.ticks, r = this.options.labels, o = r.style, a = this.horiz, n = this.getSlotWidth(), l = Math.max(1, Math.round(n - (a ? 2 * (r.padding || 0) : r.distance || 0))), c = {}, d = this.labelMetrics(), u = o.lineClamp, p, g = u ?? (Math.floor(this.len / (i.length * d.h)) || 1), x = 0;
          wn(r.rotation) || (c.rotation = r.rotation || 0), i.forEach(function(y) {
            var w;
            let m = s[y];
            m.movedLabel && m.replaceMovedLabel();
            let v = ((w = m.label) == null ? void 0 : w.textPxLength) || 0;
            v > x && (x = v);
          }), this.maxLabelLength = x, this.autoRotation ? x > l && x > d.h ? c.rotation = this.labelRotation : this.labelRotation = 0 : n && (p = l), c.rotation && (p = x > 0.5 * t.chartHeight ? 0.33 * t.chartHeight : x, u || (g = 1)), this.labelAlign = r.align || this.autoLabelAlign(this.labelRotation), this.labelAlign && (c.align = this.labelAlign), i.forEach(function(y) {
            let m = s[y], v = m == null ? void 0 : m.label, w = o.width, T = {};
            v && (v.attr(c), m.shortenLabel ? m.shortenLabel() : p && !w && o.whiteSpace !== "nowrap" && (p < (v.textPxLength || 0) || v.element.tagName === "SPAN") ? v.css(Zs(T, { width: `${p}px`, lineClamp: g })) : !v.styles.width || T.width || w || v.css({ width: "auto" }), m.rotation = c.rotation);
          }, this), this.tickRotCorr = e.rotCorr(d.b, this.labelRotation || 0, this.side !== 0);
        }
        hasData() {
          return this.series.some(function(t) {
            return t.hasData();
          }) || this.options.showEmpty && St(this.min) && St(this.max);
        }
        addTitle(t) {
          let e, i = this.chart.renderer, s = this.horiz, r = this.opposite, o = this.options.title, a = this.chart.styledMode;
          this.axisTitle || ((e = o.textAlign) || (e = (s ? { low: "left", middle: "center", high: "right" } : { low: r ? "right" : "left", middle: "center", high: r ? "left" : "right" })[o.align]), this.axisTitle = i.text(o.text || "", 0, 0, o.useHTML).attr({ zIndex: 7, rotation: o.rotation || 0, align: e }).addClass("highcharts-axis-title"), a || this.axisTitle.css(Js(o.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0), a || o.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" }), this.axisTitle[t ? "show" : "hide"](t);
        }
        generateTick(t) {
          let e = this.ticks;
          e[t] ? e[t].addLabel() : e[t] = new Ri(this, t);
        }
        createGroups() {
          let { axisParent: t, chart: e, coll: i, options: s } = this, r = e.renderer, o = (a, n, l) => r.g(a).attr({ zIndex: l }).addClass(`highcharts-${i.toLowerCase()}${n} ` + (this.isRadial ? `highcharts-radial-axis${n} ` : "") + (s.className || "")).add(t);
          this.axisGroup || (this.gridGroup = o("grid", "-grid", s.gridZIndex), this.axisGroup = o("axis", "", s.zIndex), this.labelGroup = o("axis-labels", "-labels", s.labels.zIndex));
        }
        getOffset() {
          let t = this, { chart: e, horiz: i, options: s, side: r, ticks: o, tickPositions: a, coll: n } = t, l = e.inverted && !t.isZAxis ? [1, 0, 3, 2][r] : r, c = t.hasData(), d = s.title, u = s.labels, p = Z(s.crossing), g = e.axisOffset, x = e.clipOffset, y = [-1, 1, 1, -1][r], m, v = 0, w, T = 0, S = 0, M, P;
          if (t.showAxis = m = c || s.showEmpty, t.staggerLines = t.horiz && u.staggerLines || void 0, t.createGroups(), c || t.isLinked ? (a.forEach(function(A) {
            t.generateTick(A);
          }), t.renderUnsquish(), t.reserveSpaceDefault = r === 0 || r === 2 || { 1: "left", 3: "right" }[r] === t.labelAlign, lt(u.reserveSpace, !p && null, t.labelAlign === "center" || null, t.reserveSpaceDefault) && a.forEach(function(A) {
            S = Math.max(o[A].getLabelSize(), S);
          }), t.staggerLines && (S *= t.staggerLines), t.labelOffset = S * (t.opposite ? -1 : 1)) : tr(o, function(A, L) {
            A.destroy(), delete o[L];
          }), d != null && d.text && d.enabled !== !1 && (t.addTitle(m), m && !p && d.reserveSpace !== !1 && (t.titleOffset = v = t.axisTitle.getBBox()[i ? "height" : "width"], T = St(w = d.offset) ? 0 : lt(d.margin, i ? 5 : 10))), t.renderLine(), t.offset = y * lt(s.offset, g[r] ? g[r] + (s.margin || 0) : 0), t.tickRotCorr = t.tickRotCorr || { x: 0, y: 0 }, P = r === 0 ? -t.labelMetrics().h : r === 2 ? t.tickRotCorr.y : 0, M = Math.abs(S) + T, S && (M -= P, M += y * (i ? lt(u.y, t.tickRotCorr.y + y * u.distance) : lt(u.x, y * u.distance))), t.axisTitleMargin = lt(w, M), t.getMaxLabelDimensions && (t.maxLabelDimensions = t.getMaxLabelDimensions(o, a)), n !== "colorAxis" && x) {
            let A = this.tickSize("tick");
            g[r] = Math.max(g[r], (t.axisTitleMargin || 0) + v + y * t.offset, M, a != null && a.length && A ? A[0] + y * t.offset : 0);
            let L = !t.axisLine || s.offset ? 0 : t.axisLine.strokeWidth() / 2;
            x[l] = Math.max(x[l], L);
          }
          Ot(this, "afterGetOffset");
        }
        getLinePath(t) {
          let e = this.chart, i = this.opposite, s = this.offset, r = this.horiz, o = this.left + (i ? this.width : 0) + s, a = e.chartHeight - this.bottom - (i ? this.height : 0) + s;
          return i && (t *= -1), e.renderer.crispLine([["M", r ? this.left : o, r ? a : this.top], ["L", r ? e.chartWidth - this.right : o, r ? a : e.chartHeight - this.bottom]], t);
        }
        renderLine() {
          this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
        }
        getTitlePosition(t) {
          let e = this.horiz, i = this.left, s = this.top, r = this.len, o = this.options.title, a = e ? i : s, n = this.opposite, l = this.offset, c = o.x, d = o.y, u = this.chart.renderer.fontMetrics(t), p = t ? Math.max(t.getBBox(!1, 0).height - u.h - 1, 0) : 0, g = { low: a + (e ? 0 : r), middle: a + r / 2, high: a + (e ? r : 0) }[o.align], x = (e ? s + this.height : i) + (e ? 1 : -1) * (n ? -1 : 1) * (this.axisTitleMargin || 0) + [-p, p, u.f, -p][this.side], y = { x: e ? g + c : x + (n ? this.width : 0) + l + c, y: e ? x + d - (n ? this.height : 0) + l : g + d };
          return Ot(this, "afterGetTitlePosition", { titlePosition: y }), y;
        }
        renderMinorTick(t, e) {
          let i = this.minorTicks;
          i[t] || (i[t] = new Ri(this, t, "minor")), e && i[t].isNew && i[t].render(null, !0), i[t].render(null, !1, 1);
        }
        renderTick(t, e, i) {
          var o;
          let s = this.isLinked, r = this.ticks;
          (!s || t >= this.min && t <= this.max || (o = this.grid) != null && o.isColumn) && (r[t] || (r[t] = new Ri(this, t)), i && r[t].isNew && r[t].render(e, !0, -1), r[t].render(e));
        }
        render() {
          let t, e, i = this, s = i.chart, r = i.logarithmic, o = s.renderer, a = i.options, n = i.isLinked, l = i.tickPositions, c = i.axisTitle, d = i.ticks, u = i.minorTicks, p = i.alternateBands, g = a.stackLabels, x = a.alternateGridColor, y = a.crossing, m = i.tickmarkOffset, v = i.axisLine, w = i.showAxis, T = Sc(o.globalAnimation);
          if (i.labelEdge.length = 0, i.overlap = !1, [d, u, p].forEach(function(S) {
            tr(S, function(M) {
              M.isActive = !1;
            });
          }), Z(y)) {
            let S = this.isXAxis ? s.yAxis[0] : s.xAxis[0], M = [1, -1, -1, 1][this.side];
            if (S) {
              let P = S.toPixels(y, !0);
              i.horiz && (P = S.len - P), i.offset = M * P;
            }
          }
          if (i.hasData() || n) {
            let S = i.chart.hasRendered && i.old && Z(i.old.min);
            i.minorTickInterval && !i.categories && i.getMinorTickPositions().forEach(function(M) {
              i.renderMinorTick(M, S);
            }), l.length && (l.forEach(function(M, P) {
              i.renderTick(M, P, S);
            }), m && (i.min === 0 || i.single) && (d[-1] || (d[-1] = new Ri(i, -1, null, !0)), d[-1].render(-1))), x && l.forEach(function(M, P) {
              e = l[P + 1] !== void 0 ? l[P + 1] + m : i.max - m, P % 2 == 0 && M < i.max && e <= i.max + (s.polar ? -m : m) && (p[M] || (p[M] = new E.PlotLineOrBand(i, {})), t = M + m, p[M].options = { from: r ? r.lin2log(t) : t, to: r ? r.lin2log(e) : e, color: x, className: "highcharts-alternate-grid" }, p[M].render(), p[M].isActive = !0);
            }), i._addedPlotLB || (i._addedPlotLB = !0, (a.plotLines || []).concat(a.plotBands || []).forEach(function(M) {
              i.addPlotBandOrLine(M);
            }));
          }
          [d, u, p].forEach(function(S) {
            let M = [], P = T.duration;
            tr(S, function(A, L) {
              A.isActive || (A.render(L, !1, 0), A.isActive = !1, M.push(L));
            }), Rc(function() {
              let A = M.length;
              for (; A--; ) S[M[A]] && !S[M[A]].isActive && (S[M[A]].destroy(), delete S[M[A]]);
            }, S !== p && s.hasRendered && P ? P : 0);
          }), v && (v[v.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(v.strokeWidth()) }), v.isPlaced = !0, v[w ? "show" : "hide"](w)), c && w && (c[c.isNew ? "attr" : "animate"](i.getTitlePosition(c)), c.isNew = !1), g != null && g.enabled && i.stacking && i.stacking.renderStackTotals(), i.old = { len: i.len, max: i.max, min: i.min, transA: i.transA, userMax: i.userMax, userMin: i.userMin }, i.isDirty = !1, Ot(this, "afterRender");
        }
        redraw() {
          this.visible && (this.render(), this.plotLinesAndBands.forEach(function(t) {
            t.render();
          })), this.series.forEach(function(t) {
            t.isDirty = !0;
          });
        }
        getKeepProps() {
          return this.keepProps || Di.keepProps;
        }
        destroy(t) {
          let e = this, i = e.plotLinesAndBands, s = this.eventOptions;
          if (Ot(this, "destroy", { keepEvents: t }), t || Ec(e), [e.ticks, e.minorTicks, e.alternateBands].forEach(function(r) {
            Oc(r);
          }), i) {
            let r = i.length;
            for (; r--; ) i[r].destroy();
          }
          for (let r in ["axisLine", "axisTitle", "axisGroup", "gridGroup", "labelGroup", "cross", "scrollbar"].forEach(function(o) {
            e[o] && (e[o] = e[o].destroy());
          }), e.plotLinesAndBandsGroups) e.plotLinesAndBandsGroups[r] = e.plotLinesAndBandsGroups[r].destroy();
          tr(e, function(r, o) {
            e.getKeepProps().indexOf(o) === -1 && delete e[o];
          }), this.eventOptions = s;
        }
        drawCrosshair(t, e) {
          var d;
          let i = this.crosshair, s = (i == null ? void 0 : i.snap) ?? !0, r = this.chart, o, a, n, l = this.cross, c;
          if (Ot(this, "drawCrosshair", { e: t, point: e }), t || (t = (d = this.cross) == null ? void 0 : d.e), i && (St(e) || !s) !== !1) {
            if (s ? St(e) && (a = lt(this.coll !== "colorAxis" ? e.crosshairPos : null, this.isXAxis ? e.plotX : this.len - e.plotY)) : a = t && (this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos), St(a) && (c = { value: e && (this.isXAxis ? e.x : lt(e.stackY, e.y)), translatedValue: a }, r.polar && Zs(c, { isCrosshair: !0, chartX: t == null ? void 0 : t.chartX, chartY: t == null ? void 0 : t.chartY, point: e }), o = this.getPlotLinePath(c) || null), !St(o)) {
              this.hideCrosshair();
              return;
            }
            n = this.categories && !this.isRadial, l || (this.cross = l = r.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (n ? "category " : "thin ") + (i.className || "")).attr({ zIndex: lt(i.zIndex, 2) }).add(), !r.styledMode && (l.attr({ stroke: i.color || (n ? At.parse("#ccd3ff").setOpacity(0.25).get() : "#cccccc"), "stroke-width": lt(i.width, 1) }).css({ "pointer-events": "none" }), i.dashStyle && l.attr({ dashstyle: i.dashStyle }))), l.show().attr({ d: o }), n && !i.width && l.attr({ "stroke-width": this.transA }), this.cross.e = t;
          } else this.hideCrosshair();
          Ot(this, "afterDrawCrosshair", { e: t, point: e });
        }
        hideCrosshair() {
          this.cross && this.cross.hide(), Ot(this, "afterHideCrosshair");
        }
        update(t, e) {
          let i = this.chart;
          t = Js(this.userOptions, t), this.destroy(!0), this.init(i, t), i.isDirtyBox = !0, lt(e, !0) && i.redraw();
        }
        remove(t) {
          let e = this.chart, i = this.coll, s = this.series, r = s.length;
          for (; r--; ) s[r] && s[r].remove(!1);
          xn(e.axes, this), xn(e[i] || [], this), e.orderItems(i), this.destroy(), e.isDirtyBox = !0, lt(t, !0) && e.redraw();
        }
        setTitle(t, e) {
          this.update({ title: t }, e);
        }
        setCategories(t, e) {
          this.update({ categories: t }, e);
        }
      }
      Di.keepProps = ["coll", "extKey", "hcEvents", "len", "names", "series", "userMax", "userMin"];
      let { addEvent: Dc, getMagnitude: Bc, normalizeTickInterval: Nc, timeUnits: ir } = V;
      (function(h) {
        function t() {
          return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
        }
        function e() {
          if (this.type !== "datetime") {
            this.dateTime = void 0;
            return;
          }
          this.dateTime || (this.dateTime = new i(this));
        }
        h.compose = function(s) {
          return s.keepProps.includes("dateTime") || (s.keepProps.push("dateTime"), s.prototype.getTimeTicks = t, Dc(s, "afterSetType", e)), s;
        };
        class i {
          constructor(r) {
            this.axis = r;
          }
          normalizeTimeTickInterval(r, o) {
            let a = o || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], n = a[a.length - 1], l = ir[n[0]], c = n[1], d;
            for (d = 0; d < a.length && (l = ir[(n = a[d])[0]], c = n[1], !a[d + 1] || !(r <= (l * c[c.length - 1] + ir[a[d + 1][0]]) / 2)); d++) ;
            l === ir.year && r < 5 * l && (c = [1, 2, 5]);
            let u = Nc(r / l, c, n[0] === "year" ? Math.max(Bc(r / l), 1) : 1);
            return { unitRange: l, count: u, unitName: n[0] };
          }
          getXDateFormat(r, o) {
            let { axis: a } = this, n = a.chart.time;
            return a.closestPointRange ? n.getDateFormat(a.closestPointRange, r, a.options.startOfWeek, o) || n.resolveDTLFormat(o.year).main : n.resolveDTLFormat(o.day).main;
          }
        }
        h.Additions = i;
      })(rt || (rt = {}));
      let zc = rt, { addEvent: Sn, normalizeTickInterval: Fc, pick: Wc } = V;
      (function(h) {
        function t() {
          this.type !== "logarithmic" ? this.logarithmic = void 0 : this.logarithmic ?? (this.logarithmic = new i(this));
        }
        function e() {
          let s = this.logarithmic;
          s && (this.lin2val = function(r) {
            return s.lin2log(r);
          }, this.val2lin = function(r) {
            return s.log2lin(r);
          });
        }
        h.compose = function(s) {
          return s.keepProps.includes("logarithmic") || (s.keepProps.push("logarithmic"), Sn(s, "afterSetType", t), Sn(s, "afterInit", e)), s;
        };
        class i {
          constructor(r) {
            this.axis = r;
          }
          getLogTickPositions(r, o, a, n) {
            let l = this.axis, c = l.len, d = l.options, u = [];
            if (n || (this.minorAutoInterval = void 0), r >= 0.5) r = Math.round(r), u = l.getLinearTickPositions(r, o, a);
            else if (r >= 0.08) {
              let p, g, x, y, m, v, w, T = Math.floor(o);
              for (p = r > 0.3 ? [1, 2, 4] : r > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9], g = T; g < a + 1 && !w; g++) for (x = 0, y = p.length; x < y && !w; x++) (m = this.log2lin(this.lin2log(g) * p[x])) > o && (!n || v <= a) && v !== void 0 && u.push(v), v > a && (w = !0), v = m;
            } else {
              let p = this.lin2log(o), g = this.lin2log(a), x = n ? l.getMinorTickInterval() : d.tickInterval, y = d.tickPixelInterval / (n ? 5 : 1), m = n ? c / l.tickPositions.length : c;
              r = Fc(r = Wc(x === "auto" ? null : x, this.minorAutoInterval, (g - p) * y / (m || 1))), u = l.getLinearTickPositions(r, p, g).map(this.log2lin), n || (this.minorAutoInterval = r / 5);
            }
            return n || (l.tickInterval = r), u;
          }
          lin2log(r) {
            return Math.pow(10, r);
          }
          log2lin(r) {
            return Math.log(r) / Math.LN10;
          }
        }
        h.Additions = i;
      })(st || (st = {}));
      let Hc = st, { erase: jc, extend: Xc, isNumber: Mn } = V;
      (function(h) {
        let t;
        function e(l) {
          return this.addPlotBandOrLine(l, "plotBands");
        }
        function i(l, c) {
          let d = this.userOptions, u = new t(this, l);
          if (this.visible && (u = u.render()), u) {
            if (this._addedPlotLB || (this._addedPlotLB = !0, (d.plotLines || []).concat(d.plotBands || []).forEach((p) => {
              this.addPlotBandOrLine(p);
            })), c) {
              let p = d[c] || [];
              p.push(l), d[c] = p;
            }
            this.plotLinesAndBands.push(u);
          }
          return u;
        }
        function s(l) {
          return this.addPlotBandOrLine(l, "plotLines");
        }
        function r(l, c, d) {
          d = d || this.options;
          let u = this.getPlotLinePath({ value: c, force: !0, acrossPanes: d.acrossPanes }), p = [], g = this.horiz, x = !Mn(this.min) || !Mn(this.max) || l < this.min && c < this.min || l > this.max && c > this.max, y = this.getPlotLinePath({ value: l, force: !0, acrossPanes: d.acrossPanes }), m, v = 1, w;
          if (y && u) for (x && (w = y.toString() === u.toString(), v = 0), m = 0; m < y.length; m += 2) {
            let T = y[m], S = y[m + 1], M = u[m], P = u[m + 1];
            (T[0] === "M" || T[0] === "L") && (S[0] === "M" || S[0] === "L") && (M[0] === "M" || M[0] === "L") && (P[0] === "M" || P[0] === "L") && (g && M[1] === T[1] ? (M[1] += v, P[1] += v) : g || M[2] !== T[2] || (M[2] += v, P[2] += v), p.push(["M", T[1], T[2]], ["L", S[1], S[2]], ["L", P[1], P[2]], ["L", M[1], M[2]], ["Z"])), p.isFlat = w;
          }
          return p;
        }
        function o(l) {
          this.removePlotBandOrLine(l);
        }
        function a(l) {
          let c = this.plotLinesAndBands, d = this.options, u = this.userOptions;
          if (c) {
            let p = c.length;
            for (; p--; ) c[p].id === l && c[p].destroy();
            [d.plotLines || [], u.plotLines || [], d.plotBands || [], u.plotBands || []].forEach(function(g) {
              var x;
              for (p = g.length; p--; ) ((x = g[p]) == null ? void 0 : x.id) === l && jc(g, g[p]);
            });
          }
        }
        function n(l) {
          this.removePlotBandOrLine(l);
        }
        h.compose = function(l, c) {
          let d = c.prototype;
          return d.addPlotBand || (t = l, Xc(d, { addPlotBand: e, addPlotLine: s, addPlotBandOrLine: i, getPlotBandPath: r, removePlotBand: o, removePlotLine: n, removePlotBandOrLine: a })), c;
        };
      })(U || (U = {}));
      let Gc = U, { addEvent: Yc, arrayMax: Cn, arrayMin: Tn, defined: Se, destroyObjectProperties: Uc, erase: qc, fireEvent: $c, merge: An, objectEach: Vc, pick: Kc } = V;
      class sr {
        static compose(t, e) {
          return Yc(t, "afterInit", function() {
            this.labelCollectors.push(() => {
              var s;
              let i = [];
              for (let r of this.axes) for (let { label: o, options: a } of r.plotLinesAndBands) o && !((s = a == null ? void 0 : a.label) != null && s.allowOverlap) && i.push(o);
              return i;
            });
          }), Gc.compose(sr, e);
        }
        constructor(t, e) {
          this.axis = t, this.options = e, this.id = e.id;
        }
        render() {
          $c(this, "render");
          let { axis: t, options: e } = this, { horiz: i, logarithmic: s } = t, { color: r, events: o, zIndex: a = 0 } = e, { renderer: n, time: l } = t.chart, c = {}, d = l.parse(e.to), u = l.parse(e.from), p = l.parse(e.value), g = e.borderWidth, x = e.label, { label: y, svgElem: m } = this, v = [], w, T = Se(u) && Se(d), S = Se(p), M = !m, P = { class: "highcharts-plot-" + (T ? "band " : "line ") + (e.className || "") }, A = T ? "bands" : "lines";
          if (!t.chart.styledMode && (S ? (P.stroke = r || "#999999", P["stroke-width"] = Kc(e.width, 1), e.dashStyle && (P.dashstyle = e.dashStyle)) : T && (P.fill = r || "#e6e9ff", g && (P.stroke = e.borderColor, P["stroke-width"] = g))), c.zIndex = a, A += "-" + a, (w = t.plotLinesAndBandsGroups[A]) || (t.plotLinesAndBandsGroups[A] = w = n.g("plot-" + A).attr(c).add()), m || (this.svgElem = m = n.path().attr(P).add(w)), Se(p)) v = t.getPlotLinePath({ value: (s == null ? void 0 : s.log2lin(p)) ?? p, lineWidth: m.strokeWidth(), acrossPanes: e.acrossPanes });
          else {
            if (!(Se(u) && Se(d))) return;
            v = t.getPlotBandPath((s == null ? void 0 : s.log2lin(u)) ?? u, (s == null ? void 0 : s.log2lin(d)) ?? d, e);
          }
          return !this.eventsAdded && o && (Vc(o, (L, R) => {
            m == null || m.on(R, (D) => {
              o[R].apply(this, [D]);
            });
          }), this.eventsAdded = !0), (M || !m.d) && (v != null && v.length) ? m.attr({ d: v }) : m && (v ? (m.show(), m.animate({ d: v })) : m.d && (m.hide(), y && (this.label = y = y.destroy()))), x && (Se(x.text) || Se(x.formatter)) && (v != null && v.length) && t.width > 0 && t.height > 0 && !v.isFlat ? (x = An({ align: i && T ? "center" : void 0, x: i ? !T && 4 : 10, verticalAlign: !i && T ? "middle" : void 0, y: i ? T ? 16 : 10 : T ? 6 : -4, rotation: i && !T ? 90 : 0, ...T ? { inside: !0 } : {} }, x), this.renderLabel(x, v, T, a)) : y && y.hide(), this;
        }
        renderLabel(t, e, i, s) {
          var g;
          let r = this.axis, o = r.chart.renderer, a = t.inside, n = this.label;
          n || (this.label = n = o.text(this.getLabelText(t), 0, 0, t.useHTML).attr({ align: t.textAlign || t.align, rotation: t.rotation, class: "highcharts-plot-" + (i ? "band" : "line") + "-label " + (t.className || ""), zIndex: s }), r.chart.styledMode || n.css(An({ fontSize: "0.8em", textOverflow: i && !a ? "" : "ellipsis" }, t.style)), n.add());
          let l = e.xBounds || [e[0][1], e[1][1], i ? e[2][1] : e[0][1]], c = e.yBounds || [e[0][2], e[1][2], i ? e[2][2] : e[0][2]], d = Tn(l), u = Tn(c), p = Cn(l) - d;
          n.align(t, !1, { x: d, y: u, width: p, height: Cn(c) - u }), n.alignAttr.y -= o.fontMetrics(n).b, (!n.alignValue || n.alignValue === "left" || Se(a)) && n.css({ width: (((g = t.style) == null ? void 0 : g.width) || (i && a ? p : n.rotation === 90 ? r.height - (n.alignAttr.y - r.top) : (t.clip ? r.width : r.chart.chartWidth) - (n.alignAttr.x - r.left))) + "px" }), n.show(!0);
        }
        getLabelText(t) {
          return Se(t.formatter) ? t.formatter.call(this) : t.text;
        }
        destroy() {
          qc(this.axis.plotLinesAndBands, this), delete this.axis, Uc(this);
        }
      }
      let { animObject: Qc } = Xt, { format: On } = oe, { composed: _c, dateFormats: Zc, doc: Pn, isSafari: Jc } = E, { distribute: tu } = Ws, { addEvent: eu, clamp: Bi, css: Ln, discardElement: iu, extend: su, fireEvent: En, getAlignFactor: In, isArray: ru, isNumber: ou, isObject: au, isString: po, merge: nu, pick: Ni, pushUnique: lu, splat: fo, syncTimeout: hu } = V;
      class go {
        constructor(t, e, i) {
          this.allowShared = !0, this.crosshairs = [], this.distance = 0, this.isHidden = !0, this.isSticky = !1, this.options = {}, this.outside = !1, this.chart = t, this.init(t, e), this.pointer = i;
        }
        bodyFormatter(t) {
          return t.map((e) => {
            let i = e.series.tooltipOptions, s = e.formatPrefix || "point";
            return (i[s + "Formatter"] || e.tooltipFormatter).call(e, i[s + "Format"] || "");
          });
        }
        cleanSplit(t) {
          this.chart.series.forEach(function(e) {
            let i = e == null ? void 0 : e.tt;
            i && (!i.isActive || t ? e.tt = i.destroy() : i.isActive = !1);
          });
        }
        defaultFormatter(t) {
          let e, i = this.points || fo(this);
          return (e = (e = [t.headerFooterFormatter(i[0])]).concat(t.bodyFormatter(i))).push(t.headerFooterFormatter(i[0], !0)), e;
        }
        destroy() {
          this.label && (this.label = this.label.destroy()), this.split && (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy())), this.renderer && (this.renderer = this.renderer.destroy(), iu(this.container)), V.clearTimeout(this.hideTimer);
        }
        getAnchor(t, e) {
          var l;
          let i, { chart: s, pointer: r } = this, o = s.inverted, a = s.plotTop, n = s.plotLeft;
          if (t = fo(t), (l = t[0].series) != null && l.yAxis && !t[0].series.yAxis.options.reversedStacks && (t = t.slice().reverse()), this.followPointer && e) e.chartX === void 0 && (e = r.normalize(e)), i = [e.chartX - n, e.chartY - a];
          else if (t[0].tooltipPos) i = t[0].tooltipPos;
          else {
            let c = 0, d = 0;
            t.forEach(function(u) {
              let p = u.pos(!0);
              p && (c += p[0], d += p[1]);
            }), c /= t.length, d /= t.length, this.shared && t.length > 1 && e && (o ? c = e.chartX : d = e.chartY), i = [c - n, d - a];
          }
          return i.map(Math.round);
        }
        getClassName(t, e, i) {
          let s = this.options, r = t.series, o = r.options;
          return [s.className, "highcharts-label", i && "highcharts-tooltip-header", e ? "highcharts-tooltip-box" : "highcharts-tooltip", !i && "highcharts-color-" + Ni(t.colorIndex, r.colorIndex), o == null ? void 0 : o.className].filter(po).join(" ");
        }
        getLabel({ anchorX: t, anchorY: e } = { anchorX: 0, anchorY: 0 }) {
          let i = this, s = this.chart.styledMode, r = this.options, o = this.split && this.allowShared, a = this.container, n = this.chart.renderer;
          if (this.label) {
            let l = !this.label.hasClass("highcharts-label");
            (!o && l || o && !l) && this.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              let l = this.chart, c = l.options.chart.style, d = os.getRendererType();
              this.container = a = E.doc.createElement("div"), a.className = "highcharts-tooltip-container " + (l.renderTo.className.match(/(highcharts[a-zA-Z0-9-]+)\s?/gm) || ""), Ln(a, { position: "absolute", top: "1px", pointerEvents: "none", zIndex: Math.max(this.options.style.zIndex || 0, ((c == null ? void 0 : c.zIndex) || 0) + 3) }), this.renderer = n = new d(a, 0, 0, c, void 0, void 0, n.styledMode);
            }
            if (o ? this.label = n.g("tooltip") : (this.label = n.label("", t, e, r.shape || "callout", void 0, void 0, r.useHTML, void 0, "tooltip").attr({ padding: r.padding, r: r.borderRadius }), s || this.label.attr({ fill: r.backgroundColor, "stroke-width": r.borderWidth || 0 }).css(r.style).css({ pointerEvents: r.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none") })), i.outside) {
              let l = this.label;
              [l.xSetter, l.ySetter].forEach((c, d) => {
                l[d ? "ySetter" : "xSetter"] = (u) => {
                  c.call(l, i.distance), l[d ? "y" : "x"] = u, a && (a.style[d ? "top" : "left"] = `${u}px`);
                };
              });
            }
            this.label.attr({ zIndex: 8 }).shadow(r.shadow ?? !r.fixed).add();
          }
          return a && !a.parentElement && E.doc.body.appendChild(a), this.label;
        }
        getPlayingField() {
          let { body: t, documentElement: e } = Pn, { chart: i, distance: s, outside: r } = this;
          return { width: r ? Math.max(t.scrollWidth, e.scrollWidth, t.offsetWidth, e.offsetWidth, e.clientWidth) - 2 * s - 2 : i.chartWidth, height: r ? Math.max(t.scrollHeight, e.scrollHeight, t.offsetHeight, e.offsetHeight, e.clientHeight) : i.chartHeight };
        }
        getPosition(t, e, i) {
          var j, it;
          let { distance: s, chart: r, outside: o, pointer: a } = this, { inverted: n, plotLeft: l, plotTop: c, polar: d } = r, { plotX: u = 0, plotY: p = 0 } = i, g = {}, x = n && i.h || 0, { height: y, width: m } = this.getPlayingField(), v = a.getChartPosition(), w = (G) => G * v.scaleX, T = (G) => G * v.scaleY, S = (G) => {
            let et = G === "x";
            return [G, et ? m : y, et ? t : e].concat(o ? [et ? w(t) : T(e), et ? v.left - s + w(u + l) : v.top - s + T(p + c), 0, et ? m : y] : [et ? t : e, et ? u + l : p + c, et ? l : c, et ? l + r.plotWidth : c + r.plotHeight]);
          }, M = S("y"), P = S("x"), A, L = !!i.negative;
          !d && ((it = (j = r.hoverSeries) == null ? void 0 : j.yAxis) != null && it.reversed) && (L = !L);
          let R = !this.followPointer && Ni(i.ttBelow, !d && !n === L), D = function(G, et, ct, dt, pt, Yt, ut) {
            let bt = o ? G === "y" ? T(s) : w(s) : s, ot = (ct - dt) / 2, Q = dt < pt - s, Rt = pt + s + dt < et, vt = pt - bt - ct + ot, Mt = pt + bt - ot;
            if (R && Rt) g[G] = Mt;
            else if (!R && Q) g[G] = vt;
            else if (Q) g[G] = Math.min(ut - dt, vt - x < 0 ? vt : vt - x);
            else {
              if (!Rt) return g[G] = 0, !1;
              g[G] = Math.max(Yt, Mt + x + ct > et ? Mt : Mt + x);
            }
          }, N = function(G, et, ct, dt, pt) {
            if (pt < s || pt > et - s) return !1;
            pt < ct / 2 ? g[G] = 1 : pt > et - dt / 2 ? g[G] = et - dt - 2 : g[G] = pt - ct / 2;
          }, B = function(G) {
            [M, P] = [P, M], A = G;
          }, X = () => {
            D.apply(0, M) !== !1 ? N.apply(0, P) !== !1 || A || (B(!0), X()) : A ? g.x = g.y = 0 : (B(!0), X());
          };
          return (n && !d || this.len > 1) && B(), X(), g;
        }
        getFixedPosition(t, e, i) {
          var u;
          let s = i.series, { chart: r, options: o, split: a } = this, n = o.position, l = n.relativeTo, c = o.shared || (u = s == null ? void 0 : s.yAxis) != null && u.isRadial && (l === "pane" || !l) ? "plotBox" : l, d = c === "chart" ? r.renderer : r[c] || r.getClipBox(s, !0);
          return { x: d.x + (d.width - t) * In(n.align) + n.x, y: d.y + (d.height - e) * In(n.verticalAlign) + (!a && n.y || 0) };
        }
        hide(t) {
          let e = this;
          V.clearTimeout(this.hideTimer), t = Ni(t, this.options.hideDelay), this.isHidden || (this.hideTimer = hu(function() {
            let i = e.getLabel();
            e.getLabel().animate({ opacity: 0 }, { duration: t && 150, complete: () => {
              i.hide(), e.container && e.container.remove();
            } }), e.isHidden = !0;
          }, t));
        }
        init(t, e) {
          this.chart = t, this.options = e, this.crosshairs = [], this.isHidden = !0, this.split = e.split && !t.inverted && !t.polar, this.shared = e.shared || this.split, this.outside = Ni(e.outside, !!(t.scrollablePixelsX || t.scrollablePixelsY));
        }
        shouldStickOnContact(t) {
          return !!(!this.followPointer && this.options.stickOnContact && (!t || this.pointer.inClass(t.target, "highcharts-tooltip")));
        }
        move(t, e, i, s) {
          let { followPointer: r, options: o } = this, a = Qc(!r && !this.isHidden && !o.fixed && o.animation), n = r || (this.len || 0) > 1, l = { x: t, y: e };
          n ? l.anchorX = l.anchorY = NaN : (l.anchorX = i, l.anchorY = s), a.step = () => this.drawTracker(), this.getLabel().animate(l, a);
        }
        refresh(t, e) {
          let { chart: i, options: s, pointer: r, shared: o } = this, a = fo(t), n = a[0], l = s.format, c = s.formatter || this.defaultFormatter, d = i.styledMode, u = this.allowShared;
          if (!s.enabled || !n.series) return;
          V.clearTimeout(this.hideTimer), this.allowShared = !(!ru(t) && t.series && t.series.noSharedTooltip), u = u && !this.allowShared, this.followPointer = !this.split && n.series.tooltipOptions.followPointer;
          let p = this.getAnchor(t, e), g = p[0], x = p[1];
          o && this.allowShared && (r.applyInactiveState(a), a.forEach((v) => v.setState("hover")), n.points = a), this.len = a.length;
          let y = po(l) ? On(l, n, i) : c.call(n, this);
          n.points = void 0;
          let m = n.series;
          if (this.distance = Ni(m.tooltipOptions.distance, 16), y === !1) this.hide();
          else {
            if (this.split && this.allowShared) this.renderSplit(y, a);
            else {
              let v = g, w = x;
              if (e && r.isDirectTouch && (v = e.chartX - i.plotLeft, w = e.chartY - i.plotTop), i.polar || m.options.clip === !1 || a.some((T) => r.isDirectTouch || T.series.shouldShowTooltip(v, w))) {
                let T = this.getLabel(u && this.tt || {});
                (!s.style.width || d) && T.css({ width: (this.outside ? this.getPlayingField() : i.spacingBox).width + "px" }), T.attr({ class: this.getClassName(n), text: y && y.join ? y.join("") : y }), this.outside && T.attr({ x: Bi(T.x || 0, 0, this.getPlayingField().width - (T.width || 0) - 1) }), d || T.attr({ stroke: s.borderColor || n.color || m.color || "#666666" }), this.updatePosition({ plotX: g, plotY: x, negative: n.negative, ttBelow: n.ttBelow, series: m, h: p[2] || 0 });
              } else {
                this.hide();
                return;
              }
            }
            this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden = !1;
          }
          En(this, "refresh");
        }
        renderSplit(t, e) {
          var pt, Yt;
          let i = this, { chart: s, chart: { chartWidth: r, chartHeight: o, plotHeight: a, plotLeft: n, plotTop: l, scrollablePixelsY: c = 0, scrollablePixelsX: d, styledMode: u }, distance: p, options: g, options: { fixed: x, position: y, positioner: m }, pointer: v } = i, { scrollLeft: w = 0, scrollTop: T = 0 } = ((pt = s.scrollablePlotArea) == null ? void 0 : pt.scrollingContainer) || {}, S = i.outside && typeof d != "number" ? Pn.documentElement.getBoundingClientRect() : { left: w, right: w + r }, M = i.getLabel(), P = this.renderer || s.renderer, A = !!((Yt = s.xAxis[0]) != null && Yt.opposite), { left: L, top: R } = v.getChartPosition(), D = m || x, N = l + T, B = 0, X = a - c, j = function(ut, bt, ot, Q = [0, 0], Rt = !0) {
            let vt, Mt;
            if (ot.isHeader) Mt = A ? 0 : X, vt = Bi(Q[0] - ut / 2, S.left, S.right - ut - (i.outside ? L : 0));
            else if (x && ot) {
              let Ft = i.getFixedPosition(ut, bt, ot);
              vt = Ft.x, Mt = Ft.y - N;
            } else Mt = Q[1] - N, vt = Bi(vt = Rt ? Q[0] - ut - p : Q[0] + p, Rt ? vt : S.left, S.right);
            return { x: vt, y: Mt };
          };
          po(t) && (t = [!1, t]);
          let it = t.slice(0, e.length + 1).reduce(function(ut, bt, ot) {
            if (bt !== !1 && bt !== "") {
              let Q = e[ot - 1] || { isHeader: !0, plotX: e[0].plotX, plotY: a, series: {} }, Rt = Q.isHeader, vt = Rt ? i : Q.series, Mt = vt.tt = function(Qt, Nt, Ss) {
                let Ve = Qt, { isHeader: fi, series: Ms } = Nt, me = Ms.tooltipOptions || g;
                if (!Ve) {
                  let Hi = { padding: me.padding, r: me.borderRadius };
                  u || (Hi.fill = me.backgroundColor, Hi["stroke-width"] = me.borderWidth ?? (x && !fi ? 0 : 1)), Ve = P.label("", 0, 0, me[fi ? "headerShape" : "shape"] || (x && !fi ? "rect" : "callout"), void 0, void 0, me.useHTML).addClass(i.getClassName(Nt, !0, fi)).attr(Hi).add(M);
                }
                return Ve.isActive = !0, Ve.attr({ text: Ss }), u || Ve.css(me.style).attr({ stroke: me.borderColor || Nt.color || Ms.color || "#333333" }), Ve;
              }(vt.tt, Q, bt.toString()), Ft = Mt.getBBox(), Ie = Ft.width + Mt.strokeWidth();
              Rt && (B = Ft.height, X += B, A && (N -= B));
              let { anchorX: le, anchorY: he } = function(Qt) {
                let Nt, Ss, { isHeader: Ve, plotX: fi = 0, plotY: Ms = 0, series: me } = Qt;
                if (Ve) Nt = Math.max(n + fi, n), Ss = l + a / 2;
                else {
                  let { xAxis: Hi, yAxis: Kl } = me;
                  Nt = Hi.pos + Bi(fi, -p, Hi.len + p), me.shouldShowTooltip(0, Kl.pos - l + Ms, { ignoreX: !0 }) && (Ss = Kl.pos + Ms);
                }
                return { anchorX: Nt = Bi(Nt, S.left - p, S.right + p), anchorY: Ss };
              }(Q);
              if (typeof he == "number") {
                let Qt = Ft.height + 1, Nt = (m || j).call(i, Ie, Qt, Q, [le, he]);
                ut.push({ align: D ? 0 : void 0, anchorX: le, anchorY: he, boxWidth: Ie, point: Q, rank: Ni(Nt.rank, +!!Rt), size: Qt, target: Nt.y, tt: Mt, x: Nt.x });
              } else Mt.isActive = !1;
            }
            return ut;
          }, []);
          !D && it.some((ut) => {
            let { outside: bt } = i, ot = (bt ? L : 0) + ut.anchorX;
            return ot < S.left && ot + ut.boxWidth < S.right || ot < L - S.left + ut.boxWidth && S.right - ot > ot;
          }) && (it = it.map((ut) => {
            let { x: bt, y: ot } = j.call(this, ut.boxWidth, ut.size, ut.point, [ut.anchorX, ut.anchorY], !1);
            return su(ut, { target: ot, x: bt });
          })), i.cleanSplit(), tu(it, X);
          let G = { left: L, right: L };
          it.forEach(function(ut) {
            let { x: bt, boxWidth: ot, isHeader: Q } = ut;
            !Q && (i.outside && L + bt < G.left && (G.left = L + bt), !Q && i.outside && G.left + ot > G.right && (G.right = L + bt));
          }), it.forEach(function(ut) {
            let { x: bt, anchorX: ot, anchorY: Q, pos: Rt, point: { isHeader: vt } } = ut, Mt = { visibility: Rt === void 0 ? "hidden" : "inherit", x: bt, y: (Rt || 0) + N + (x && y.y || 0), anchorX: ot, anchorY: Q };
            if (i.outside && bt < ot) {
              let Ft = L - G.left;
              Ft > 0 && (vt || (Mt.x = bt + Ft, Mt.anchorX = ot + Ft), vt && (Mt.x = (G.right - G.left) / 2, Mt.anchorX = ot + Ft));
            }
            ut.tt.attr(Mt);
          });
          let { container: et, outside: ct, renderer: dt } = i;
          if (ct && et && dt) {
            let { width: ut, height: bt, x: ot, y: Q } = M.getBBox();
            dt.setSize(ut + ot, bt + Q, !1), et.style.left = G.left + "px", et.style.top = R + "px";
          }
          Jc && M.attr({ opacity: M.opacity === 1 ? 0.999 : 1 });
        }
        drawTracker() {
          if (!this.shouldStickOnContact()) {
            this.tracker && (this.tracker = this.tracker.destroy());
            return;
          }
          let t = this.chart, e = this.label, i = this.shared ? t.hoverPoints : t.hoverPoint;
          if (!e || !i) return;
          let s = { x: 0, y: 0, width: 0, height: 0 }, r = this.getAnchor(i), o = e.getBBox();
          r[0] += t.plotLeft - (e.translateX || 0), r[1] += t.plotTop - (e.translateY || 0), s.x = Math.min(0, r[0]), s.y = Math.min(0, r[1]), s.width = r[0] < 0 ? Math.max(Math.abs(r[0]), o.width - r[0]) : Math.max(Math.abs(r[0]), o.width), s.height = r[1] < 0 ? Math.max(Math.abs(r[1]), o.height - Math.abs(r[1])) : Math.max(Math.abs(r[1]), o.height), this.tracker ? this.tracker.attr(s) : (this.tracker = e.renderer.rect(s).addClass("highcharts-tracker").add(e), t.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
        }
        styledModeFormat(t) {
          return t.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"');
        }
        headerFooterFormatter(t, e) {
          let i = t.series, s = i.tooltipOptions, r = i.xAxis, o = r == null ? void 0 : r.dateTime, a = { isFooter: e, point: t }, n = s.xDateFormat || "", l = s[e ? "footerFormat" : "headerFormat"];
          return En(this, "headerFormatter", a, function(c) {
            if (o && !n && ou(t.key) && (n = o.getXDateFormat(t.key, s.dateTimeLabelFormats)), o && n) {
              if (au(n)) {
                let d = n;
                Zc[0] = (u) => i.chart.time.dateFormat(d, u), n = "%0";
              }
              (t.tooltipDateKeys || ["key"]).forEach((d) => {
                l = l.replace(RegExp("point\\." + d + "([ \\)}])"), `(point.${d}:${n})$1`);
              });
            }
            i.chart.styledMode && (l = this.styledModeFormat(l)), c.text = On(l, t, this.chart);
          }), a.text || "";
        }
        update(t) {
          this.destroy(), this.init(this.chart, nu(!0, this.options, t));
        }
        updatePosition(t) {
          var S;
          let { chart: e, container: i, distance: s, options: r, pointer: o, renderer: a } = this, { height: n = 0, width: l = 0 } = this.getLabel(), { fixed: c, positioner: d } = r, { left: u, top: p, scaleX: g, scaleY: x } = o.getChartPosition(), y = (d || c && this.getFixedPosition || this.getPosition).call(this, l, n, t), m = E.doc, v = (t.plotX || 0) + e.plotLeft, w = (t.plotY || 0) + e.plotTop, T;
          if (a && i) {
            if (d || c) {
              let { scrollLeft: M = 0, scrollTop: P = 0 } = ((S = e.scrollablePlotArea) == null ? void 0 : S.scrollingContainer) || {};
              y.x += M + u - s, y.y += P + p - s;
            }
            T = (r.borderWidth || 0) + 2 * s + 2, a.setSize(Bi(l + T, 0, m.documentElement.clientWidth) - 1, n + T, !1), (g !== 1 || x !== 1) && (Ln(i, { transform: `scale(${g}, ${x})` }), v *= g, w *= x), v += u - y.x, w += p - y.y;
          }
          this.move(Math.round(y.x), Math.round(y.y || 0), v, w);
        }
      }
      (function(h) {
        h.compose = function(t) {
          lu(_c, "Core.Tooltip") && eu(t, "afterInit", function() {
            let e = this.chart;
            e.options.tooltip && (e.tooltip = new h(e, e.options.tooltip, this));
          });
        };
      })(go || (go = {}));
      let Rn = go, { animObject: du } = Xt, { defaultOptions: cu } = re, { format: uu } = oe, { addEvent: pu, crisp: fu, erase: gu, extend: rr, fireEvent: mo, getNestedProperty: mu, isArray: yu, isFunction: xu, isNumber: We, isObject: or, merge: Dn, pick: He, syncTimeout: bu, removeEvent: Bn, uniqueKey: vu } = V;
      class cs {
        animateBeforeDestroy() {
          let t = this, e = { x: t.startXPos, opacity: 0 }, i = t.getGraphicalProps();
          i.singular.forEach(function(s) {
            t[s] = t[s].animate(s === "dataLabel" ? { x: t[s].startXPos, y: t[s].startYPos, opacity: 0 } : e);
          }), i.plural.forEach(function(s) {
            t[s].forEach(function(r) {
              r.element && r.animate(rr({ x: t.startXPos }, r.startYPos ? { x: r.startXPos, y: r.startYPos } : {}));
            });
          });
        }
        applyOptions(t, e) {
          let i = this.series, s = i.options.pointValKey || i.pointValKey;
          return rr(this, t = cs.prototype.optionsToObject.call(this, t)), this.options = this.options ? rr(this.options, t) : t, t.group && delete this.group, t.dataLabels && delete this.dataLabels, s && (this.y = cs.prototype.getNestedProperty.call(this, s)), this.selected && (this.state = "select"), "name" in this && e === void 0 && i.xAxis && i.xAxis.hasNames && (this.x = i.xAxis.nameToX(this)), this.x === void 0 && i ? this.x = e ?? i.autoIncrement() : We(t.x) && i.options.relativeXValue ? this.x = i.autoIncrement(t.x) : typeof this.x == "string" && (e ?? (e = i.chart.time.parse(this.x)), We(e) && (this.x = e)), this.isNull = this.isValid && !this.isValid(), this.formatPrefix = this.isNull ? "null" : "point", this;
        }
        destroy() {
          if (!this.destroyed) {
            let t = this, e = t.series, i = e.chart, s = e.options.dataSorting, r = i.hoverPoints, o = du(t.series.chart.renderer.globalAnimation), a = () => {
              for (let n in (t.graphic || t.graphics || t.dataLabel || t.dataLabels) && (Bn(t), t.destroyElements()), t) delete t[n];
            };
            t.legendItem && i.legend.destroyItem(t), r && (t.setState(), gu(r, t), r.length || (i.hoverPoints = null)), t === i.hoverPoint && t.onMouseOut(), s != null && s.enabled ? (this.animateBeforeDestroy(), bu(a, o.duration)) : a(), i.pointCount--;
          }
          this.destroyed = !0;
        }
        destroyElements(t) {
          let e = this, i = e.getGraphicalProps(t);
          i.singular.forEach(function(s) {
            e[s] = e[s].destroy();
          }), i.plural.forEach(function(s) {
            e[s].forEach(function(r) {
              r != null && r.element && r.destroy();
            }), delete e[s];
          });
        }
        firePointEvent(t, e, i) {
          let s = this, r = this.series.options;
          s.manageEvent(t), t === "click" && r.allowPointSelect && (i = function(o) {
            !s.destroyed && s.select && s.select(null, o.ctrlKey || o.metaKey || o.shiftKey);
          }), mo(s, t, e, i);
        }
        getClassName() {
          var t;
          return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (this.colorIndex !== void 0 ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + ((t = this.zone) != null && t.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
        }
        getGraphicalProps(t) {
          let e, i, s = this, r = [], o = { singular: [], plural: [] };
          for ((t = t || { graphic: 1, dataLabel: 1 }).graphic && r.push("graphic", "connector"), t.dataLabel && r.push("dataLabel", "dataLabelPath", "dataLabelUpper"), i = r.length; i--; ) s[e = r[i]] && o.singular.push(e);
          return ["graphic", "dataLabel"].forEach(function(a) {
            let n = a + "s";
            t[a] && s[n] && o.plural.push(n);
          }), o;
        }
        getNestedProperty(t) {
          return t ? t.indexOf("custom.") === 0 ? mu(t, this.options) : this[t] : void 0;
        }
        getZone() {
          let t = this.series, e = t.zones, i = t.zoneAxis || "y", s, r = 0;
          for (s = e[0]; this[i] >= s.value; ) s = e[++r];
          return this.nonZonedColor || (this.nonZonedColor = this.color), s != null && s.color && !this.options.color ? this.color = s.color : this.color = this.nonZonedColor, s;
        }
        hasNewShapeType() {
          return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
        }
        constructor(t, e, i) {
          this.formatPrefix = "point", this.visible = !0, this.point = this, this.series = t, this.applyOptions(e, i), this.id ?? (this.id = vu()), this.resolveColor(), this.dataLabelOnNull ?? (this.dataLabelOnNull = t.options.nullInteraction), t.chart.pointCount++, mo(this, "afterInit");
        }
        isValid() {
          return (We(this.x) || this.x instanceof Date) && We(this.y);
        }
        optionsToObject(t) {
          var c;
          let e = this.series, i = e.options.keys, s = i || e.pointArrayMap || ["y"], r = s.length, o = {}, a, n = 0, l = 0;
          if (We(t) || t === null) o[s[0]] = t;
          else if (yu(t)) for (!i && t.length > r && ((a = typeof t[0]) == "string" ? (c = e.xAxis) != null && c.dateTime ? o.x = e.chart.time.parse(t[0]) : o.name = t[0] : a === "number" && (o.x = t[0]), n++); l < r; ) i && t[n] === void 0 || (s[l].indexOf(".") > 0 ? cs.prototype.setNestedProperty(o, t[n], s[l]) : o[s[l]] = t[n]), n++, l++;
          else typeof t == "object" && (o = t, t.dataLabels && (e.hasDataLabels = () => !0), t.marker && (e._hasPointMarkers = !0));
          return o;
        }
        pos(t, e = this.plotY) {
          if (!this.destroyed) {
            let { plotX: i, series: s } = this, { chart: r, xAxis: o, yAxis: a } = s, n = 0, l = 0;
            if (We(i) && We(e)) return t && (n = o ? o.pos : r.plotLeft, l = a ? a.pos : r.plotTop), r.inverted && o && a ? [a.len - e + l, o.len - i + n] : [i + n, e + l];
          }
        }
        resolveColor() {
          let t = this.series, e = t.chart.options.chart, i = t.chart.styledMode, s, r, o = e.colorCount, a;
          delete this.nonZonedColor, t.options.colorByPoint ? (i || (s = (r = t.options.colors || t.chart.options.colors)[t.colorCounter], o = r.length), a = t.colorCounter, t.colorCounter++, t.colorCounter === o && (t.colorCounter = 0)) : (i || (s = t.color), a = t.colorIndex), this.colorIndex = He(this.options.colorIndex, a), this.color = He(this.options.color, s);
        }
        setNestedProperty(t, e, i) {
          return i.split(".").reduce(function(s, r, o, a) {
            let n = a.length - 1 === o;
            return s[r] = n ? e : or(s[r], !0) ? s[r] : {}, s[r];
          }, t), t;
        }
        shouldDraw() {
          return !this.isNull;
        }
        tooltipFormatter(t) {
          var n;
          let { chart: e, pointArrayMap: i = ["y"], tooltipOptions: s } = this.series, { valueDecimals: r = "", valuePrefix: o = "", valueSuffix: a = "" } = s;
          return e.styledMode && (t = ((n = e.tooltip) == null ? void 0 : n.styledModeFormat(t)) || t), i.forEach((l) => {
            l = "{point." + l, (o || a) && (t = t.replace(RegExp(l + "}", "g"), o + l + "}" + a)), t = t.replace(RegExp(l + "}", "g"), l + ":,." + r + "f}");
          }), uu(t, this, e);
        }
        update(t, e, i, s) {
          let r, o = this, a = o.series, n = o.graphic, l = a.chart, c = a.options;
          function d() {
            o.applyOptions(t);
            let u = n && o.hasMockGraphic, p = o.y === null ? !u : u;
            n && p && (o.graphic = n.destroy(), delete o.hasMockGraphic), or(t, !0) && (n != null && n.element && t && t.marker && t.marker.symbol !== void 0 && (o.graphic = n.destroy()), t != null && t.dataLabels && o.dataLabel && (o.dataLabel = o.dataLabel.destroy())), r = o.index;
            let g = {};
            for (let x of a.dataColumnKeys()) g[x] = o[x];
            a.dataTable.setRow(g, r), c.data[r] = or(c.data[r], !0) || or(t, !0) ? o.options : He(t, c.data[r]), a.isDirty = a.isDirtyData = !0, !a.fixedBox && a.hasCartesianSeries && (l.isDirtyBox = !0), c.legendType === "point" && (l.isDirtyLegend = !0), e && l.redraw(i);
          }
          e = He(e, !0), s === !1 ? d() : o.firePointEvent("update", { options: t }, d);
        }
        remove(t, e) {
          this.series.removePoint(this.series.data.indexOf(this), t, e);
        }
        select(t, e) {
          let i = this, s = i.series, r = s.chart;
          t = He(t, !i.selected), this.selectedStaging = t, i.firePointEvent(t ? "select" : "unselect", { accumulate: e }, function() {
            i.selected = i.options.selected = t, s.options.data[s.data.indexOf(i)] = i.options, i.setState(t && "select"), e || r.getSelectedPoints().forEach(function(o) {
              let a = o.series;
              o.selected && o !== i && (o.selected = o.options.selected = !1, a.options.data[a.data.indexOf(o)] = o.options, o.setState(r.hoverPoints && a.options.inactiveOtherPoints ? "inactive" : ""), o.firePointEvent("unselect"));
            });
          }), delete this.selectedStaging;
        }
        onMouseOver(t) {
          let { inverted: e, pointer: i } = this.series.chart;
          i && (t = t ? i.normalize(t) : i.getChartCoordinatesFromPoint(this, e), i.runPointActions(t, this));
        }
        onMouseOut() {
          let t = this.series.chart;
          this.firePointEvent("mouseOut"), this.series.options.inactiveOtherPoints || (t.hoverPoints || []).forEach(function(e) {
            e.setState();
          }), t.hoverPoints = t.hoverPoint = null;
        }
        manageEvent(t) {
          var s, r, o, a, n, l, c;
          let e = Dn(this.series.options.point, this.options), i = (s = e.events) == null ? void 0 : s[t];
          xu(i) && (!((r = this.hcEvents) != null && r[t]) || ((a = (o = this.hcEvents) == null ? void 0 : o[t]) == null ? void 0 : a.map((d) => d.fn).indexOf(i)) === -1) ? ((n = this.importedUserEvent) == null || n.call(this), this.importedUserEvent = pu(this, t, i), this.hcEvents && (this.hcEvents[t].userEvent = !0)) : this.importedUserEvent && !i && ((l = this.hcEvents) != null && l[t]) && ((c = this.hcEvents) != null && c[t].userEvent) && (Bn(this, t), delete this.hcEvents[t], Object.keys(this.hcEvents) || delete this.importedUserEvent);
        }
        setState(t, e) {
          var M, P;
          let i = this.series, s = this.state, r = i.options.states[t || "normal"] || {}, o = cu.plotOptions[i.type].marker && i.options.marker, a = o && o.enabled === !1, n = ((M = o == null ? void 0 : o.states) == null ? void 0 : M[t || "normal"]) || {}, l = n.enabled === !1, c = this.marker || {}, d = i.chart, u = o && i.markerAttribs, p = i.halo, g, x, y, m = i.stateMarkerGraphic, v;
          if ((t = t || "") === this.state && !e || this.selected && t !== "select" || r.enabled === !1 || t && (l || a && n.enabled === !1) || t && c.states && c.states[t] && c.states[t].enabled === !1) return;
          if (this.state = t, u && (g = i.markerAttribs(this, t)), this.graphic && !this.hasMockGraphic) {
            if (s && this.graphic.removeClass("highcharts-point-" + s), t && this.graphic.addClass("highcharts-point-" + t), !d.styledMode) {
              x = i.pointAttribs(this, t), y = He(d.options.chart.animation, r.animation);
              let A = x.opacity;
              i.options.inactiveOtherPoints && We(A) && (this.dataLabels || []).forEach(function(L) {
                L && !L.hasClass("highcharts-data-label-hidden") && (L.animate({ opacity: A }, y), L.connector && L.connector.animate({ opacity: A }, y));
              }), this.graphic.animate(x, y);
            }
            g && this.graphic.animate(g, He(d.options.chart.animation, n.animation, o.animation)), m && m.hide();
          } else t && n && (v = c.symbol || i.symbol, m && m.currentSymbol !== v && (m = m.destroy()), g && (m ? m[e ? "animate" : "attr"]({ x: g.x, y: g.y }) : v && (i.stateMarkerGraphic = m = d.renderer.symbol(v, g.x, g.y, g.width, g.height, Dn(o, n)).add(i.markerGroup), m.currentSymbol = v)), !d.styledMode && m && this.state !== "inactive" && m.attr(i.pointAttribs(this, t))), m && (m[t && this.isInside ? "show" : "hide"](), m.element.point = this, m.addClass(this.getClassName(), !0));
          let w = r.halo, T = this.graphic || m, S = (T == null ? void 0 : T.visibility) || "inherit";
          w != null && w.size && T && S !== "hidden" && !this.isCluster ? (p || (i.halo = p = d.renderer.path().add(T.parentGroup)), p.show()[e ? "animate" : "attr"]({ d: this.haloPath(w.size) }), p.attr({ class: "highcharts-halo highcharts-color-" + He(this.colorIndex, i.colorIndex) + (this.className ? " " + this.className : ""), visibility: S, zIndex: -1 }), p.point = this, d.styledMode || p.attr(rr({ fill: this.color || i.color, "fill-opacity": w.opacity }, Tt.filterUserAttributes(w.attributes || {})))) : (P = p == null ? void 0 : p.point) != null && P.haloPath && !p.point.destroyed && p.animate({ d: p.point.haloPath(0) }, null, p.hide), mo(this, "afterSetState", { state: t });
        }
        haloPath(t) {
          let e = this.pos();
          return e ? this.series.chart.renderer.symbols.circle(fu(e[0], 1) - t, e[1] - t, 2 * t, 2 * t) : [];
        }
      }
      let je = cs, { parse: wu } = At, { charts: yo, composed: ku, isTouchDevice: Su } = E, { addEvent: ae, attr: Mu, css: xo, extend: bo, find: Nn, fireEvent: Xe, isNumber: ar, isObject: nr, objectEach: Cu, offset: Tu, pick: Me, pushUnique: Au, splat: zn } = V;
      class Ht {
        applyInactiveState(t = []) {
          let e = [];
          t.forEach((i) => {
            let s = i.series;
            e.push(s), s.linkedParent && e.push(s.linkedParent), s.linkedSeries && e.push.apply(e, s.linkedSeries), s.navigatorSeries && e.push(s.navigatorSeries), s.boosted && s.markerGroup && e.push.apply(e, this.chart.series.filter((r) => r.markerGroup === s.markerGroup));
          }), this.chart.series.forEach((i) => {
            e.indexOf(i) === -1 ? i.setState("inactive", !0) : i.options.inactiveOtherPoints && i.setAllPointsToState("inactive");
          });
        }
        destroy() {
          let t = this;
          this.eventsToUnbind.forEach((e) => e()), this.eventsToUnbind = [], !E.chartCount && (Ht.unbindDocumentMouseUp.forEach((e) => e.unbind()), Ht.unbindDocumentMouseUp.length = 0, Ht.unbindDocumentTouchEnd && (Ht.unbindDocumentTouchEnd = Ht.unbindDocumentTouchEnd())), clearInterval(t.tooltipTimeout), Cu(t, function(e, i) {
            t[i] = void 0;
          });
        }
        getSelectionMarkerAttrs(t, e) {
          let i = { args: { chartX: t, chartY: e }, attrs: {}, shapeType: "rect" };
          return Xe(this, "getSelectionMarkerAttrs", i, (s) => {
            let r, { chart: o, zoomHor: a, zoomVert: n } = this, { mouseDownX: l = 0, mouseDownY: c = 0 } = o, d = s.attrs;
            d.x = o.plotLeft, d.y = o.plotTop, d.width = a ? 1 : o.plotWidth, d.height = n ? 1 : o.plotHeight, a && (d.width = Math.max(1, Math.abs(r = t - l)), d.x = (r > 0 ? 0 : r) + l), n && (d.height = Math.max(1, Math.abs(r = e - c)), d.y = (r > 0 ? 0 : r) + c);
          }), i;
        }
        drag(t) {
          let { chart: e } = this, { mouseDownX: i = 0, mouseDownY: s = 0 } = e, { panning: r, panKey: o, selectionMarkerFill: a } = e.options.chart, n = e.plotLeft, l = e.plotTop, c = e.plotWidth, d = e.plotHeight, u = nr(r) ? r.enabled : r, p = o && t[`${o}Key`], g = t.chartX, x = t.chartY, y, m = this.selectionMarker;
          if ((!m || !m.touch) && (g < n ? g = n : g > n + c && (g = n + c), x < l ? x = l : x > l + d && (x = l + d), this.hasDragged = Math.sqrt(Math.pow(i - g, 2) + Math.pow(s - x, 2)), this.hasDragged > 10)) {
            y = e.isInsidePlot(i - n, s - l, { visiblePlotOnly: !0 });
            let { shapeType: v, attrs: w } = this.getSelectionMarkerAttrs(g, x);
            (e.hasCartesianSeries || e.mapView) && this.hasZoom && y && !p && !m && (this.selectionMarker = m = e.renderer[v](), m.attr({ class: "highcharts-selection-marker", zIndex: 7 }).add(), e.styledMode || m.attr({ fill: a || wu("#334eff").setOpacity(0.25).get() })), m && m.attr(w), y && !m && u && e.pan(t, r);
          }
        }
        dragStart(t) {
          let e = this.chart;
          e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = t.chartX, e.mouseDownY = t.chartY;
        }
        getSelectionBox(t) {
          let e = { args: { marker: t }, result: t.getBBox() };
          return Xe(this, "getSelectionBox", e), e.result;
        }
        drop(t) {
          let e, { chart: i, selectionMarker: s } = this;
          for (let r of i.axes) r.isPanning && (r.isPanning = !1, (r.options.startOnTick || r.options.endOnTick || r.series.some((o) => o.boosted)) && (r.forceRedraw = !0, r.setExtremes(r.userMin, r.userMax, !1), e = !0));
          if (e && i.redraw(), s && t) {
            if (this.hasDragged) {
              let r = this.getSelectionBox(s);
              i.transform({ axes: i.axes.filter((o) => o.zoomEnabled && (o.coll === "xAxis" && this.zoomX || o.coll === "yAxis" && this.zoomY)), selection: { originalEvent: t, xAxis: [], yAxis: [], ...r }, from: r });
            }
            ar(i.index) && (this.selectionMarker = s.destroy());
          }
          i && ar(i.index) && (xo(i.container, { cursor: i._cursor }), i.cancelClick = this.hasDragged > 10, i.mouseIsDown = !1, this.hasDragged = 0, this.pinchDown = []);
        }
        findNearestKDPoint(t, e, i) {
          let s;
          return t.forEach(function(r) {
            let o = !(r.noSharedTooltip && e) && 0 > r.options.findNearestPointBy.indexOf("y"), a = r.searchPoint(i, o);
            nr(a, !0) && a.series && (!nr(s, !0) || function(n, l) {
              var p, g;
              let c = n.distX - l.distX, d = n.dist - l.dist, u = ((p = l.series.group) == null ? void 0 : p.zIndex) - ((g = n.series.group) == null ? void 0 : g.zIndex);
              return c !== 0 && e ? c : d !== 0 ? d : u !== 0 ? u : n.series.index > l.series.index ? -1 : 1;
            }(s, a) > 0) && (s = a);
          }), s;
        }
        getChartCoordinatesFromPoint(t, e) {
          let { xAxis: i, yAxis: s } = t.series, r = t.shapeArgs;
          if (i && s) {
            let o = t.clientX ?? t.plotX ?? 0, a = t.plotY || 0;
            return t.isNode && r && ar(r.x) && ar(r.y) && (o = r.x, a = r.y), e ? { chartX: s.len + s.pos - a, chartY: i.len + i.pos - o } : { chartX: o + i.pos, chartY: a + s.pos };
          }
          if (r != null && r.x && r.y) return { chartX: r.x, chartY: r.y };
        }
        getChartPosition() {
          if (this.chartPosition) return this.chartPosition;
          let { container: t } = this.chart, e = Tu(t);
          this.chartPosition = { left: e.left, top: e.top, scaleX: 1, scaleY: 1 };
          let { offsetHeight: i, offsetWidth: s } = t;
          return s > 2 && i > 2 && (this.chartPosition.scaleX = e.width / s, this.chartPosition.scaleY = e.height / i), this.chartPosition;
        }
        getCoordinates(t) {
          let e = { xAxis: [], yAxis: [] };
          for (let i of this.chart.axes) e[i.isXAxis ? "xAxis" : "yAxis"].push({ axis: i, value: i.toValue(t[i.horiz ? "chartX" : "chartY"]) });
          return e;
        }
        getHoverData(t, e, i, s, r, o) {
          let a = [], n = function(p) {
            return p.visible && !(!r && p.directTouch) && Me(p.options.enableMouseTracking, !0);
          }, l = e, c, d = { chartX: o ? o.chartX : void 0, chartY: o ? o.chartY : void 0, shared: r };
          Xe(this, "beforeGetHoverData", d), c = l && !l.stickyTracking ? [l] : i.filter((p) => p.stickyTracking && (d.filter || n)(p));
          let u = s && t || !o ? t : this.findNearestKDPoint(c, r, o);
          return l = u == null ? void 0 : u.series, u && (r && !l.noSharedTooltip ? (c = i.filter(function(p) {
            return d.filter ? d.filter(p) : n(p) && !p.noSharedTooltip;
          })).forEach(function(p) {
            var y;
            let g = (y = p.options) == null ? void 0 : y.nullInteraction, x = Nn(p.points, function(m) {
              return m.x === u.x && (!m.isNull || !!g);
            });
            nr(x) && (p.boosted && p.boost && (x = p.boost.getPoint(x)), a.push(x));
          }) : a.push(u)), Xe(this, "afterGetHoverData", d = { hoverPoint: u }), { hoverPoint: d.hoverPoint, hoverSeries: l, hoverPoints: a };
        }
        getPointFromEvent(t) {
          let e = t.target, i;
          for (; e && !i; ) i = e.point, e = e.parentNode;
          return i;
        }
        onTrackerMouseOut(t) {
          let e = this.chart, i = t.relatedTarget, s = e.hoverSeries;
          this.isDirectTouch = !1, !s || !i || s.stickyTracking || this.inClass(i, "highcharts-tooltip") || this.inClass(i, "highcharts-series-" + s.index) && this.inClass(i, "highcharts-tracker") || s.onMouseOut();
        }
        inClass(t, e) {
          let i = t, s;
          for (; i; ) {
            if (s = Mu(i, "class")) {
              if (s.indexOf(e) !== -1) return !0;
              if (s.indexOf("highcharts-container") !== -1) return !1;
            }
            i = i.parentElement;
          }
        }
        constructor(t, e) {
          var i;
          this.hasDragged = 0, this.pointerCaptureEventsToUnbind = [], this.eventsToUnbind = [], this.options = e, this.chart = t, this.runChartClick = !!((i = e.chart.events) != null && i.click), this.pinchDown = [], this.setDOMEvents(), Xe(this, "afterInit");
        }
        normalize(t, e) {
          let i = t.touches, s = i ? i.length ? i.item(0) : Me(i.changedTouches, t.changedTouches)[0] : t;
          e || (e = this.getChartPosition());
          let r = s.pageX - e.left, o = s.pageY - e.top;
          return bo(t, { chartX: Math.round(r /= e.scaleX), chartY: Math.round(o /= e.scaleY) });
        }
        onContainerClick(t) {
          let e = this.chart, i = e.hoverPoint, s = this.normalize(t), r = e.plotLeft, o = e.plotTop;
          !e.cancelClick && (i && this.inClass(s.target, "highcharts-tracker") ? (Xe(i.series, "click", bo(s, { point: i })), e.hoverPoint && i.firePointEvent("click", s)) : (bo(s, this.getCoordinates(s)), e.isInsidePlot(s.chartX - r, s.chartY - o, { visiblePlotOnly: !0 }) && Xe(e, "click", s)));
        }
        onContainerMouseDown(t) {
          var i;
          let e = (1 & (t.buttons || t.button)) == 1;
          t = this.normalize(t), E.isFirefox && t.button !== 0 && this.onContainerMouseMove(t), (t.button === void 0 || e) && (this.zoomOption(t), e && ((i = t.preventDefault) == null || i.call(t)), this.dragStart(t));
        }
        onContainerMouseLeave(t) {
          let { pointer: e } = yo[Me(Ht.hoverChartIndex, -1)] || {};
          t = this.normalize(t), this.onContainerMouseMove(t), e && !this.inClass(t.relatedTarget, "highcharts-tooltip") && (e.reset(), e.chartPosition = void 0);
        }
        onContainerMouseEnter() {
          delete this.chartPosition;
        }
        onContainerMouseMove(t) {
          let e = this.chart, i = e.tooltip, s = this.normalize(t);
          this.setHoverChartIndex(t), (e.mouseIsDown === "mousedown" || this.touchSelect(s)) && this.drag(s), !e.openMenu && (this.inClass(s.target, "highcharts-tracker") || e.isInsidePlot(s.chartX - e.plotLeft, s.chartY - e.plotTop, { visiblePlotOnly: !0 })) && !(i != null && i.shouldStickOnContact(s)) && (this.inClass(s.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(s));
        }
        onDocumentTouchEnd(t) {
          this.onDocumentMouseUp(t);
        }
        onContainerTouchMove(t) {
          this.touchSelect(t) ? this.onContainerMouseMove(t) : this.touch(t);
        }
        onContainerTouchStart(t) {
          this.touchSelect(t) ? this.onContainerMouseDown(t) : (this.zoomOption(t), this.touch(t, !0));
        }
        onDocumentMouseMove(t) {
          let e = this.chart, i = e.tooltip, s = this.chartPosition, r = this.normalize(t, s);
          !s || e.isInsidePlot(r.chartX - e.plotLeft, r.chartY - e.plotTop, { visiblePlotOnly: !0 }) || i != null && i.shouldStickOnContact(r) || r.target !== e.container.ownerDocument && this.inClass(r.target, "highcharts-tracker") || this.reset();
        }
        onDocumentMouseUp(t) {
          var e, i;
          (i = (e = yo[Me(Ht.hoverChartIndex, -1)]) == null ? void 0 : e.pointer) == null || i.drop(t);
        }
        pinch(t) {
          let e = this, { chart: i, hasZoom: s, lastTouches: r } = e, o = [].map.call(t.touches || [], (d) => e.normalize(d)), a = o.length, n = a === 1 && (e.inClass(t.target, "highcharts-tracker") && i.runTrackerClick || e.runChartClick), l = i.tooltip, c = a === 1 && Me(l == null ? void 0 : l.options.followTouchMove, !0);
          a > 1 ? e.initiated = !0 : c && (e.initiated = !1), s && e.initiated && !n && t.cancelable !== !1 && t.preventDefault(), t.type === "touchstart" ? (e.pinchDown = o, e.res = !0, i.mouseDownX = t.chartX) : c ? this.runPointActions(e.normalize(t)) : r && (Xe(i, "touchpan", { originalEvent: t, touches: o }, () => {
            let d = (u) => {
              let p = u[0], g = u[1] || p;
              return { x: p.chartX, y: p.chartY, width: g.chartX - p.chartX, height: g.chartY - p.chartY };
            };
            i.transform({ axes: i.axes.filter((u) => u.zoomEnabled && (this.zoomHor && u.horiz || this.zoomVert && !u.horiz)), to: d(o), from: d(r), trigger: t.type });
          }), e.res && (e.res = !1, this.reset(!1, 0))), e.lastTouches = o;
        }
        reset(t, e) {
          let i = this.chart, s = i.hoverSeries, r = i.hoverPoint, o = i.hoverPoints, a = i.tooltip, n = a != null && a.shared ? o : r;
          t && n && zn(n).forEach(function(l) {
            l.series.isCartesian && l.plotX === void 0 && (t = !1);
          }), t ? a && n && zn(n).length && (a.refresh(n), a.shared && o ? o.forEach(function(l) {
            l.setState(l.state, !0), l.series.isCartesian && (l.series.xAxis.crosshair && l.series.xAxis.drawCrosshair(null, l), l.series.yAxis.crosshair && l.series.yAxis.drawCrosshair(null, l));
          }) : r && (r.setState(r.state, !0), i.axes.forEach(function(l) {
            l.crosshair && r.series[l.coll] === l && l.drawCrosshair(null, r);
          }))) : (r && r.onMouseOut(), o && o.forEach(function(l) {
            l.setState();
          }), s && s.onMouseOut(), a && a.hide(e), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), i.axes.forEach(function(l) {
            l.hideCrosshair();
          }), i.hoverPoints = i.hoverPoint = void 0);
        }
        runPointActions(t, e, i) {
          var x;
          let s = this.chart, r = s.series, o = (x = s.tooltip) != null && x.options.enabled ? s.tooltip : void 0, a = !!o && o.shared, n = e || s.hoverPoint, l = (n == null ? void 0 : n.series) || s.hoverSeries, c = (!t || t.type !== "touchmove") && (!!e || (l == null ? void 0 : l.directTouch) && this.isDirectTouch), d = this.getHoverData(n, l, r, c, a, t);
          n = d.hoverPoint, l = d.hoverSeries;
          let u = d.hoverPoints, p = (l == null ? void 0 : l.tooltipOptions.followPointer) && !l.tooltipOptions.split, g = a && l && !l.noSharedTooltip;
          if (n && (i || n !== s.hoverPoint || o != null && o.isHidden)) {
            if ((s.hoverPoints || []).forEach(function(y) {
              u.indexOf(y) === -1 && y.setState();
            }), s.hoverSeries !== l && l.onMouseOver(), this.applyInactiveState(u), (u || []).forEach(function(y) {
              y.setState("hover");
            }), s.hoverPoint && s.hoverPoint.firePointEvent("mouseOut"), !n.series) return;
            s.hoverPoints = u, s.hoverPoint = n, n.firePointEvent("mouseOver", void 0, () => {
              o && n && o.refresh(g ? u : n, t);
            });
          } else if (p && o && !o.isHidden) {
            let y = o.getAnchor([{}], t);
            s.isInsidePlot(y[0], y[1], { visiblePlotOnly: !0 }) && o.updatePosition({ plotX: y[0], plotY: y[1] });
          }
          this.unDocMouseMove || (this.unDocMouseMove = ae(s.container.ownerDocument, "mousemove", (y) => {
            var m, v;
            return (v = (m = yo[Ht.hoverChartIndex ?? -1]) == null ? void 0 : m.pointer) == null ? void 0 : v.onDocumentMouseMove(y);
          }), this.eventsToUnbind.push(this.unDocMouseMove)), s.axes.forEach(function(y) {
            var w;
            let m, v = ((w = y.crosshair) == null ? void 0 : w.snap) ?? !0;
            !v || (m = s.hoverPoint) && m.series[y.coll] === y || (m = Nn(u, (T) => {
              var S;
              return ((S = T.series) == null ? void 0 : S[y.coll]) === y;
            })), m || !v ? y.drawCrosshair(t, m) : y.hideCrosshair();
          });
        }
        setDOMEvents() {
          let t = this.chart.container, e = t.ownerDocument;
          t.onmousedown = this.onContainerMouseDown.bind(this), t.onmousemove = this.onContainerMouseMove.bind(this), t.onclick = this.onContainerClick.bind(this), this.eventsToUnbind.push(ae(t, "mouseenter", this.onContainerMouseEnter.bind(this)), ae(t, "mouseleave", this.onContainerMouseLeave.bind(this))), Ht.unbindDocumentMouseUp.some((s) => s.doc === e) || Ht.unbindDocumentMouseUp.push({ doc: e, unbind: ae(e, "mouseup", this.onDocumentMouseUp.bind(this)) });
          let i = this.chart.renderTo.parentElement;
          for (; i && i.tagName !== "BODY"; ) this.eventsToUnbind.push(ae(i, "scroll", () => {
            delete this.chartPosition;
          })), i = i.parentElement;
          this.eventsToUnbind.push(ae(t, "touchstart", this.onContainerTouchStart.bind(this), { passive: !1 }), ae(t, "touchmove", this.onContainerTouchMove.bind(this), { passive: !1 })), Ht.unbindDocumentTouchEnd || (Ht.unbindDocumentTouchEnd = ae(e, "touchend", this.onDocumentTouchEnd.bind(this), { passive: !1 })), this.setPointerCapture(), ae(this.chart, "redraw", this.setPointerCapture.bind(this));
        }
        setPointerCapture() {
          var r, o;
          if (!Su) return;
          let t = this.pointerCaptureEventsToUnbind, e = this.chart, i = e.container, s = Me((r = e.options.tooltip) == null ? void 0 : r.followTouchMove, !0) && e.series.some((a) => a.options.findNearestPointBy.indexOf("y") > -1);
          !this.hasPointerCapture && s ? (t.push(ae(i, "pointerdown", (a) => {
            var n, l;
            (n = a.target) != null && n.hasPointerCapture(a.pointerId) && ((l = a.target) == null || l.releasePointerCapture(a.pointerId));
          }), ae(i, "pointermove", (a) => {
            var n, l;
            (l = (n = e.pointer) == null ? void 0 : n.getPointFromEvent(a)) == null || l.onMouseOver(a);
          })), e.styledMode || xo(i, { "touch-action": "none" }), i.className += " highcharts-no-touch-action", this.hasPointerCapture = !0) : this.hasPointerCapture && !s && (t.forEach((a) => a()), t.length = 0, e.styledMode || xo(i, { "touch-action": Me((o = e.options.chart.style) == null ? void 0 : o["touch-action"], "manipulation") }), i.className = i.className.replace(" highcharts-no-touch-action", ""), this.hasPointerCapture = !1);
        }
        setHoverChartIndex(t) {
          var s;
          let e = this.chart, i = E.charts[Me(Ht.hoverChartIndex, -1)];
          if (i && i !== e) {
            let r = { relatedTarget: e.container };
            t && !(t != null && t.relatedTarget) && Object.assign({}, t, r), (s = i.pointer) == null || s.onContainerMouseLeave(t || r);
          }
          i != null && i.mouseIsDown || (Ht.hoverChartIndex = e.index);
        }
        touch(t, e) {
          let i, { chart: s, pinchDown: r = [] } = this;
          this.setHoverChartIndex(), (t = this.normalize(t)).touches.length === 1 ? s.isInsidePlot(t.chartX - s.plotLeft, t.chartY - s.plotTop, { visiblePlotOnly: !0 }) && !s.openMenu ? (e && this.runPointActions(t), t.type === "touchmove" && (i = !!r[0] && Math.pow(r[0].chartX - t.chartX, 2) + Math.pow(r[0].chartY - t.chartY, 2) >= 16), Me(i, !0) && this.pinch(t)) : e && this.reset() : t.touches.length === 2 && this.pinch(t);
        }
        touchSelect(t) {
          return !!(this.chart.zooming.singleTouch && t.touches && t.touches.length === 1);
        }
        zoomOption(t) {
          let e = this.chart, i = e.inverted, s = e.zooming.type || "", r, o;
          /touch/.test(t.type) && (s = Me(e.zooming.pinchType, s)), this.zoomX = r = /x/.test(s), this.zoomY = o = /y/.test(s), this.zoomHor = r && !i || o && i, this.zoomVert = o && !i || r && i, this.hasZoom = r || o;
        }
      }
      Ht.unbindDocumentMouseUp = [], function(h) {
        h.compose = function(t) {
          Au(ku, "Core.Pointer") && ae(t, "beforeRender", function() {
            this.pointer = new h(this, this.options);
          });
        };
      }(Ht || (Ht = {}));
      let Fn = Ht;
      (function(h) {
        h.setLength = function(t, e, i) {
          return Array.isArray(t) ? (t.length = e, t) : t[i ? "subarray" : "slice"](0, e);
        }, h.splice = function(t, e, i, s, r = []) {
          if (Array.isArray(t)) return Array.isArray(r) || (r = Array.from(r)), { removed: t.splice(e, i, ...r), array: t };
          let o = Object.getPrototypeOf(t).constructor, a = t[s ? "subarray" : "slice"](e, e + i), n = new o(t.length - i + r.length);
          return n.set(t.subarray(0, e), 0), n.set(r, e), n.set(t.subarray(e + i), e + r.length), { removed: a, array: n };
        };
      })(nt || (nt = {}));
      let { setLength: Ou, splice: Wn } = nt, { fireEvent: vo, objectEach: us, uniqueKey: ps } = V, lr = class {
        constructor(h = {}) {
          this.autoId = !h.id, this.columns = {}, this.id = h.id || ps(), this.modified = this, this.rowCount = 0, this.versionTag = ps();
          let t = 0;
          us(h.columns || {}, (e, i) => {
            this.columns[i] = e.slice(), t = Math.max(t, e.length);
          }), this.applyRowCount(t);
        }
        applyRowCount(h) {
          this.rowCount = h, us(this.columns, (t, e) => {
            t.length !== h && (this.columns[e] = Ou(t, h));
          });
        }
        deleteRows(h, t = 1) {
          if (t > 0 && h < this.rowCount) {
            let e = 0;
            us(this.columns, (i, s) => {
              this.columns[s] = Wn(i, h, t).array, e = i.length;
            }), this.rowCount = e;
          }
          vo(this, "afterDeleteRows", { rowIndex: h, rowCount: t }), this.versionTag = ps();
        }
        getColumn(h, t) {
          return this.columns[h];
        }
        getColumns(h, t) {
          return (h || Object.keys(this.columns)).reduce((e, i) => (e[i] = this.columns[i], e), {});
        }
        getRow(h, t) {
          return (t || Object.keys(this.columns)).map((e) => {
            var i;
            return (i = this.columns[e]) == null ? void 0 : i[h];
          });
        }
        setColumn(h, t = [], e = 0, i) {
          this.setColumns({ [h]: t }, e, i);
        }
        setColumns(h, t, e) {
          let i = this.rowCount;
          us(h, (s, r) => {
            this.columns[r] = s.slice(), i = s.length;
          }), this.applyRowCount(i), e != null && e.silent || (vo(this, "afterSetColumns"), this.versionTag = ps());
        }
        setRow(h, t = this.rowCount, e, i) {
          let { columns: s } = this, r = e ? this.rowCount + 1 : t + 1;
          us(h, (o, a) => {
            let n = s[a] || (i == null ? void 0 : i.addColumns) !== !1 && Array(r);
            n && (e ? n = Wn(n, t, 0, !0, [o]).array : n[t] = o, s[a] = n);
          }), r > this.rowCount && this.applyRowCount(r), i != null && i.silent || (vo(this, "afterSetRows"), this.versionTag = ps());
        }
      }, { extend: Pu, merge: Lu, pick: Hn } = V;
      (function(h) {
        function t(e, i, s) {
          var T, S;
          let r = this.legendItem = this.legendItem || {}, { chart: o, options: a } = this, { baseline: n = 0, symbolWidth: l, symbolHeight: c } = e, d = this.symbol || "circle", u = c / 2, p = o.renderer, g = r.group, x = n - Math.round((((T = e.fontMetrics) == null ? void 0 : T.b) || c) * (s ? 0.4 : 0.3)), y = {}, m, v = a.marker, w = 0;
          if (o.styledMode || (y["stroke-width"] = Math.min(a.lineWidth || 0, 24), a.dashStyle ? y.dashstyle = a.dashStyle : a.linecap === "square" || (y["stroke-linecap"] = "round")), r.line = p.path().addClass("highcharts-graph").attr(y).add(g), s && (r.area = p.path().addClass("highcharts-area").add(g)), y["stroke-linecap"] && (w = Math.min(r.line.strokeWidth(), l) / 2), l) {
            let M = [["M", w, x], ["L", l - w, x]];
            r.line.attr({ d: M }), (S = r.area) == null || S.attr({ d: [...M, ["L", l - w, n], ["L", w, n]] });
          }
          if (v && v.enabled !== !1 && l) {
            let M = Math.min(Hn(v.radius, u), u);
            d.indexOf("url") === 0 && (v = Lu(v, { width: c, height: c }), M = 0), r.symbol = m = p.symbol(d, l / 2 - M, x - M, 2 * M, 2 * M, Pu({ context: "legend" }, v)).addClass("highcharts-point").add(g), m.isMarker = !0;
          }
        }
        h.areaMarker = function(e, i) {
          t.call(this, e, i, !0);
        }, h.lineMarker = t, h.rectangle = function(e, i) {
          let s = i.legendItem || {}, r = e.options, o = e.symbolHeight, a = r.squareSymbol, n = a ? o : e.symbolWidth;
          s.symbol = this.chart.renderer.rect(a ? (e.symbolWidth - o) / 2 : 0, e.baseline - o + 1, n, o, Hn(e.options.symbolRadius, o / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(s.group);
        };
      })($ || ($ = {}));
      let jn = $, { defaultOptions: Xn } = re, { extend: Eu, extendClass: Iu, merge: Ru } = V;
      (function(h) {
        function t(e, i) {
          let s = Xn.plotOptions || {}, r = i.defaultOptions, o = i.prototype;
          return o.type = e, o.pointClass || (o.pointClass = je), !h.seriesTypes[e] && (r && (s[e] = r), h.seriesTypes[e] = i, !0);
        }
        h.seriesTypes = E.seriesTypes, h.registerSeriesType = t, h.seriesType = function(e, i, s, r, o) {
          let a = Xn.plotOptions || {};
          if (i = i || "", a[e] = Ru(a[i], s), delete h.seriesTypes[e], t(e, Iu(h.seriesTypes[i] || function() {
          }, r)), h.seriesTypes[e].prototype.type = e, o) {
            class n extends je {
            }
            Eu(n.prototype, o), h.seriesTypes[e].prototype.pointClass = n;
          }
          return h.seriesTypes[e];
        };
      })(K || (K = {}));
      let Lt = K, { animObject: Gn, setAnimation: Du } = Xt, { defaultOptions: hr } = re, { registerEventOptions: Bu } = Ks, { svg: Nu, win: zu } = E, { seriesTypes: zi } = Lt, { format: Fu } = oe, { arrayMax: wo, arrayMin: Yn, clamp: Un, correctFloat: qn, crisp: Wu, defined: zt, destroyObjectProperties: Hu, diffObjects: ju, erase: $n, error: dr, extend: Fi, find: Xu, fireEvent: Et, getClosestDistance: Gu, getNestedProperty: Vn, insertItem: Kn, isArray: Qn, isNumber: jt, isString: Yu, merge: fs, objectEach: ko, pick: Pt, removeEvent: Uu, syncTimeout: _n } = V;
      class fe {
        constructor() {
          this.zoneAxis = "y";
        }
        init(t, e) {
          var n, l, c;
          let i;
          Et(this, "init", { options: e }), this.dataTable ?? (this.dataTable = new lr());
          let s = t.series;
          this.eventsToUnbind = [], this.chart = t, this.options = this.setOptions(e);
          let r = this.options, o = r.visible !== !1;
          this.linkedSeries = [], this.bindAxes(), Fi(this, { name: r.name, state: "", visible: o, selected: r.selected === !0 }), Bu(this, r);
          let a = r.events;
          (a != null && a.click || (l = (n = r.point) == null ? void 0 : n.events) != null && l.click || r.allowPointSelect) && (t.runTrackerClick = !0), this.getColor(), this.getSymbol(), this.isCartesian && (t.hasCartesianSeries = !0), s.length && (i = s[s.length - 1]), this._i = Pt(i == null ? void 0 : i._i, -1) + 1, this.opacity = this.options.opacity, t.orderItems("series", Kn(this, s)), (c = r.dataSorting) != null && c.enabled ? this.setDataSortingOptions() : this.points || this.data || this.setData(r.data, !1), Et(this, "afterInit");
        }
        is(t) {
          return zi[t] && this instanceof zi[t];
        }
        bindAxes() {
          let t, e = this, i = e.options, s = e.chart;
          Et(this, "bindAxes", null, function() {
            (e.axisTypes || []).forEach(function(r) {
              (s[r] || []).forEach(function(o) {
                t = o.options, (Pt(i[r], 0) === o.index || i[r] !== void 0 && i[r] === t.id) && (Kn(e, o.series), e[r] = o, o.isDirty = !0);
              }), e[r] || e.optionalAxis === r || dr(18, !0, s);
            });
          }), Et(this, "afterBindAxes");
        }
        hasData() {
          return this.visible && this.dataMax !== void 0 && this.dataMin !== void 0 || this.visible && this.dataTable.rowCount > 0;
        }
        hasMarkerChanged(t, e) {
          let i = t.marker, s = e.marker || {};
          return i && (s.enabled && !i.enabled || s.symbol !== i.symbol || s.height !== i.height || s.width !== i.width);
        }
        autoIncrement(t) {
          let e, i = this.options, { pointIntervalUnit: s, relativeXValue: r } = this.options, o = this.chart.time, a = this.xIncrement ?? o.parse(i.pointStart) ?? 0;
          if (this.pointInterval = e = Pt(this.pointInterval, i.pointInterval, 1), r && jt(t) && (e *= t), s) {
            let n = o.toParts(a);
            s === "day" ? n[2] += e : s === "month" ? n[1] += e : s === "year" && (n[0] += e), e = o.makeTime.apply(o, n) - a;
          }
          return r && jt(t) ? a + e : (this.xIncrement = a + e, a);
        }
        setDataSortingOptions() {
          let t = this.options;
          Fi(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 }), zt(t.pointRange) || (t.pointRange = 1);
        }
        setOptions(t) {
          var y, m;
          let e, i = this.chart, s = i.options.plotOptions, r = i.userOptions || {}, o = fs(t), a = i.styledMode, n = { plotOptions: s, userOptions: o };
          Et(this, "setOptions", n);
          let l = n.plotOptions[this.type], c = r.plotOptions || {}, d = c.series || {}, u = hr.plotOptions[this.type] || {}, p = c[this.type] || {};
          l.dataLabels = this.mergeArrays(u.dataLabels, l.dataLabels), this.userOptions = n.userOptions;
          let g = fs(l, s.series, p, o);
          this.tooltipOptions = fs(hr.tooltip, (y = hr.plotOptions.series) == null ? void 0 : y.tooltip, u == null ? void 0 : u.tooltip, i.userOptions.tooltip, (m = c.series) == null ? void 0 : m.tooltip, p.tooltip, o.tooltip), this.stickyTracking = Pt(o.stickyTracking, p.stickyTracking, d.stickyTracking, !!this.tooltipOptions.shared && !this.noSharedTooltip || g.stickyTracking), l.marker === null && delete g.marker, this.zoneAxis = g.zoneAxis || "y";
          let x = this.zones = (g.zones || []).map((v) => ({ ...v }));
          return (g.negativeColor || g.negativeFillColor) && !g.zones && (e = { value: g[this.zoneAxis + "Threshold"] || g.threshold || 0, className: "highcharts-negative" }, a || (e.color = g.negativeColor, e.fillColor = g.negativeFillColor), x.push(e)), x.length && zt(x[x.length - 1].value) && x.push(a ? {} : { color: this.color, fillColor: this.fillColor }), Et(this, "afterSetOptions", { options: g }), g;
        }
        getName() {
          return this.options.name ?? Fu(this.chart.options.lang.seriesName, this, this.chart);
        }
        getCyclic(t, e, i) {
          let s, r, o = this.chart, a = `${t}Index`, n = `${t}Counter`, l = (i == null ? void 0 : i.length) || o.options.chart.colorCount;
          !e && (zt(r = Pt(t === "color" ? this.options.colorIndex : void 0, this[a])) ? s = r : (o.series.length || (o[n] = 0), s = o[n] % l, o[n] += 1), i && (e = i[s])), s !== void 0 && (this[a] = s), this[t] = e;
        }
        getColor() {
          this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || hr.plotOptions[this.type].color, this.chart.options.colors);
        }
        getPointsCollection() {
          return (this.hasGroupedData ? this.points : this.data) || [];
        }
        getSymbol() {
          let t = this.options.marker;
          this.getCyclic("symbol", t.symbol, this.chart.options.symbols);
        }
        getColumn(t, e) {
          return (e ? this.dataTable.modified : this.dataTable).getColumn(t, !0) || [];
        }
        findPointIndex(t, e) {
          var d;
          let i, s, r, { id: o, x: a } = t, n = this.points, l = this.options.dataSorting, c = this.cropStart || 0;
          if (o) {
            let u = this.chart.get(o);
            u instanceof je && (i = u);
          } else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) {
            let u = (p) => !p.touched && p.index === t.index;
            if (l != null && l.matchByName ? u = (p) => !p.touched && p.name === t.name : this.options.relativeXValue && (u = (p) => !p.touched && p.options.x === t.x), !(i = Xu(n, u))) return;
          }
          return i && (r = i == null ? void 0 : i.index) !== void 0 && (s = !0), r === void 0 && jt(a) && (r = this.getColumn("x").indexOf(a, e)), r !== -1 && r !== void 0 && this.cropped && (r = r >= c ? r - c : r), !s && jt(r) && ((d = n[r]) != null && d.touched) && (r = void 0), r;
        }
        updateData(t, e) {
          var x;
          let { options: i, requireSorting: s } = this, r = i.dataSorting, o = this.points, a = [], n = t.length === o.length, l, c, d, u, p = !0;
          if (this.xIncrement = null, t.forEach((y, m) => {
            var M;
            let v, w = zt(y) && this.pointClass.prototype.optionsToObject.call({ series: this }, y) || {}, { id: T, x: S } = w;
            T || jt(S) ? ((v = this.findPointIndex(w, u)) === -1 || v === void 0 ? a.push(y) : o[v] && y !== ((M = i.data) == null ? void 0 : M[v]) ? (o[v].update(y, !1, void 0, !1), o[v].touched = !0, s && (u = v + 1)) : o[v] && (o[v].touched = !0), (!n || m !== v || r != null && r.enabled || this.hasDerivedData) && (l = !0)) : a.push(y);
          }, this), l) for (c = o.length; c--; ) (d = o[c]) && !d.touched && ((x = d.remove) == null || x.call(d, !1, e));
          else n && !(r != null && r.enabled) ? (t.forEach((y, m) => {
            y === o[m].y || o[m].destroyed || o[m].update(y, !1, void 0, !1);
          }), a.length = 0) : p = !1;
          if (o.forEach((y) => {
            y && (y.touched = !1);
          }), !p) return !1;
          a.forEach((y) => {
            this.addPoint(y, !1, void 0, void 0, !1);
          }, this);
          let g = this.getColumn("x");
          return this.xIncrement === null && g.length && (this.xIncrement = wo(g), this.autoIncrement()), !0;
        }
        dataColumnKeys() {
          return ["x", ...this.pointArrayMap || ["y"]];
        }
        setData(t, e = !0, i, s) {
          var P, A;
          let r = this.points, o = (r == null ? void 0 : r.length) || 0, a = this.options, n = this.chart, l = a.dataSorting, c = this.xAxis, d = a.turboThreshold, u = this.dataTable, p = this.dataColumnKeys(), g = this.pointValKey || "y", x = (this.pointArrayMap || []).length, y = a.keys, m, v, w = 0, T = 1, S;
          n.options.chart.allowMutatingData || (a.data && delete this.options.data, this.userOptions.data && delete this.userOptions.data, S = fs(!0, t));
          let M = (t = S || t || []).length;
          if (l != null && l.enabled && (t = this.sortData(t)), n.options.chart.allowMutatingData && s !== !1 && M && o && !this.cropped && !this.hasGroupedData && this.visible && !this.boosted && (v = this.updateData(t, i)), !v) {
            this.xIncrement = null, this.colorCounter = 0;
            let L = d && M > d;
            if (L) {
              let R = this.getFirstValidPoint(t), D = this.getFirstValidPoint(t, M - 1, -1), N = (B) => !!(Qn(B) && (y || jt(B[0])));
              if (jt(R) && jt(D)) {
                let B = [], X = [];
                for (let j of t) B.push(this.autoIncrement()), X.push(j);
                u.setColumns({ x: B, [g]: X });
              } else if (N(R) && N(D))
                if (x) {
                  let B = +(R.length === x), X = Array(p.length).fill(0).map(() => []);
                  for (let j of t) {
                    B && X[0].push(this.autoIncrement());
                    for (let it = B; it <= x; it++) (P = X[it]) == null || P.push(j[it - B]);
                  }
                  u.setColumns(p.reduce((j, it, G) => (j[it] = X[G], j), {}));
                } else {
                  y && (w = y.indexOf("x"), T = y.indexOf("y"), w = w >= 0 ? w : 0, T = T >= 0 ? T : 1), R.length === 1 && (T = 0);
                  let B = [], X = [];
                  if (w === T) for (let j of t) B.push(this.autoIncrement()), X.push(j[T]);
                  else for (let j of t) B.push(j[w]), X.push(j[T]);
                  u.setColumns({ x: B, [g]: X });
                }
              else L = !1;
            }
            if (!L) {
              let R = p.reduce((D, N) => (D[N] = [], D), {});
              for (m = 0; m < M; m++) {
                let D = this.pointClass.prototype.applyOptions.apply({ series: this }, [t[m]]);
                for (let N of p) R[N][m] = D[N];
              }
              u.setColumns(R);
            }
            for (Yu(this.getColumn("y")[0]) && dr(14, !0, n), this.data = [], this.options.data = this.userOptions.data = t, m = o; m--; ) (A = r[m]) == null || A.destroy();
            c && (c.minRange = c.userMinRange), this.isDirty = n.isDirtyBox = !0, this.isDirtyData = !!r, i = !1;
          }
          a.legendType === "point" && (this.processData(), this.generatePoints()), e && n.redraw(i);
        }
        sortData(t) {
          let e = this, i = e.options.dataSorting.sortKey || "y", s = function(r, o) {
            return zt(o) && r.pointClass.prototype.optionsToObject.call({ series: r }, o) || {};
          };
          return t.forEach(function(r, o) {
            t[o] = s(e, r), t[o].index = o;
          }, this), t.concat().sort((r, o) => {
            let a = Vn(i, r), n = Vn(i, o);
            return n < a ? -1 : +(n > a);
          }).forEach(function(r, o) {
            r.x = o;
          }, this), e.linkedSeries && e.linkedSeries.forEach(function(r) {
            var n;
            let o = r.options, a = o.data;
            !((n = o.dataSorting) != null && n.enabled) && a && (a.forEach(function(l, c) {
              a[c] = s(r, l), t[c] && (a[c].x = t[c].x, a[c].index = c);
            }), r.setData(a, !1));
          }), t;
        }
        getProcessedData(t) {
          let e = this, { dataTable: i, isCartesian: s, options: r, xAxis: o } = e, a = r.cropThreshold, n = t || e.getExtremesFromAll, l = o == null ? void 0 : o.logarithmic, c = i.rowCount, d, u, p = 0, g, x, y, m = e.getColumn("x"), v = i, w = !1;
          return o && (x = (g = o.getExtremes()).min, y = g.max, w = !!(o.categories && !o.names.length), s && e.sorted && !n && (!a || c > a || e.forceCrop) && (m[c - 1] < x || m[0] > y ? v = new lr() : e.getColumn(e.pointValKey || "y").length && (m[0] < x || m[c - 1] > y) && (v = (d = this.cropData(i, x, y)).modified, p = d.start, u = !0))), m = v.getColumn("x") || [], { modified: v, cropped: u, cropStart: p, closestPointRange: Gu([l ? m.map(l.log2lin) : m], () => e.requireSorting && !w && dr(15, !1, e.chart)) };
        }
        processData(t) {
          let e = this.xAxis, i = this.dataTable;
          if (this.isCartesian && !this.isDirty && !e.isDirty && !this.yAxis.isDirty && !t) return !1;
          let s = this.getProcessedData();
          i.modified = s.modified, this.cropped = s.cropped, this.cropStart = s.cropStart, this.closestPointRange = this.basePointRange = s.closestPointRange, Et(this, "afterProcessData");
        }
        cropData(t, e, i) {
          let s = t.getColumn("x", !0) || [], r = s.length, o = {}, a, n, l = 0, c = r;
          for (a = 0; a < r; a++) if (s[a] >= e) {
            l = Math.max(0, a - 1);
            break;
          }
          for (n = a; n < r; n++) if (s[n] > i) {
            c = n + 1;
            break;
          }
          for (let d of this.dataColumnKeys()) {
            let u = t.getColumn(d, !0);
            u && (o[d] = u.slice(l, c));
          }
          return { modified: new lr({ columns: o }), start: l, end: c };
        }
        generatePoints() {
          var S, M, P;
          let t = this.options, e = this.processedData || t.data, i = this.dataTable.modified, s = this.getColumn("x", !0), r = this.pointClass, o = i.rowCount, a = this.cropStart || 0, n = this.hasGroupedData, l = t.keys, c = [], d = (S = t.dataGrouping) != null && S.groupAll ? a : 0, u = (M = this.xAxis) == null ? void 0 : M.categories, p = this.pointArrayMap || ["y"], g = this.dataColumnKeys(), x, y, m, v, w = this.data, T;
          if (!w && !n) {
            let A = [];
            A.length = (e == null ? void 0 : e.length) || 0, w = this.data = A;
          }
          for (l && n && (this.options.keys = !1), v = 0; v < o; v++) y = a + v, n ? ((m = new r(this, i.getRow(v, g) || [])).dataGroup = this.groupMap[d + v], (P = m.dataGroup) != null && P.options && (m.options = m.dataGroup.options, Fi(m, m.dataGroup.options), delete m.dataLabels)) : (m = w[y], T = e ? e[y] : i.getRow(v, p), m || T === void 0 || (w[y] = m = new r(this, T, s[v]))), m && (m.index = n ? d + v : y, c[v] = m, m.category = (u == null ? void 0 : u[m.x]) ?? m.x, m.key = m.name ?? m.category);
          if (this.options.keys = l, w && (o !== (x = w.length) || n)) for (v = 0; v < x; v++) v !== a || n || (v += o), w[v] && (w[v].destroyElements(), w[v].plotX = void 0);
          this.data = w, this.points = c, Et(this, "afterGeneratePoints");
        }
        getXExtremes(t) {
          return { min: Yn(t), max: wo(t) };
        }
        getExtremes(t, e) {
          var S;
          let { xAxis: i, yAxis: s } = this, r = e || this.getExtremesFromAll || this.options.getExtremesFromAll, o = r && this.cropped ? this.dataTable : this.dataTable.modified, a = o.rowCount, n = t || this.stackedYData, l = n ? [n] : ((S = this.keysAffectYAxis || this.pointArrayMap || ["y"]) == null ? void 0 : S.map((M) => o.getColumn(M, !0) || [])) || [], c = this.getColumn("x", !0), d = [], u = this.requireSorting && !this.is("column") ? 1 : 0, p = !!s && s.positiveValuesOnly, g = r || this.cropped || !i, x, y, m, v = 0, w = 0;
          for (i && (v = (x = i.getExtremes()).min, w = x.max), m = 0; m < a; m++) if (y = c[m], g || (c[m + u] || y) >= v && (c[m - u] || y) <= w) for (let M of l) {
            let P = M[m];
            jt(P) && (P > 0 || !p) && d.push(P);
          }
          let T = { activeYData: d, dataMin: Yn(d), dataMax: wo(d) };
          return Et(this, "afterGetExtremes", { dataExtremes: T }), T;
        }
        applyExtremes() {
          let t = this.getExtremes();
          return this.dataMin = t.dataMin, this.dataMax = t.dataMax, t;
        }
        getFirstValidPoint(t, e = 0, i = 1) {
          let s = t.length, r = e;
          for (; r >= 0 && r < s; ) {
            if (zt(t[r])) return t[r];
            r += i;
          }
        }
        translate() {
          var w;
          this.generatePoints();
          let t = this.options, e = t.stacking, i = this.xAxis, s = this.enabledDataSorting, r = this.yAxis, o = this.points, a = o.length, n = this.pointPlacementToXValue(), l = !!n, c = t.threshold, d = t.startFromThreshold ? c : 0, u = (t == null ? void 0 : t.nullInteraction) && r.len, p, g, x, y, m = Number.MAX_VALUE;
          function v(T) {
            return Un(T, -1e9, 1e9);
          }
          for (p = 0; p < a; p++) {
            let T, S = o[p], M = S.x, P, A, L = S.y, R = S.low, D = e && ((w = r.stacking) == null ? void 0 : w.stacks[(this.negStacks && L < (d ? 0 : c) ? "-" : "") + this.stackKey]);
            S.plotX = jt(g = i.translate(M, !1, !1, !1, !0, n)) ? qn(v(g)) : void 0, e && this.visible && D && D[M] && (y = this.getStackIndicator(y, M, this.index), !S.isNull && y.key && (A = (P = D[M]).points[y.key]), P && Qn(A) && (R = A[0], L = A[1], R === d && y.key === D[M].base && (R = Pt(jt(c) ? c : r.min)), r.positiveValuesOnly && zt(R) && R <= 0 && (R = void 0), S.total = S.stackTotal = Pt(P.total), S.percentage = zt(S.y) && P.total ? S.y / P.total * 100 : void 0, S.stackY = L, this.irregularWidths || P.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis))), S.yBottom = zt(R) ? v(r.translate(R, !1, !0, !1, !0)) : void 0, this.dataModify && (L = this.dataModify.modifyValue(L, p)), jt(L) && S.plotX !== void 0 ? T = jt(T = r.translate(L, !1, !0, !1, !0)) ? v(T) : void 0 : !jt(L) && u && (T = u), S.plotY = T, S.isInside = this.isPointInside(S), S.clientX = l ? qn(i.translate(M, !1, !1, !1, !0, n)) : g, S.negative = (S.y || 0) < (c || 0), S.isNull || S.visible === !1 || (x !== void 0 && (m = Math.min(m, Math.abs(g - x))), x = g), S.zone = this.zones.length ? S.getZone() : void 0, !S.graphic && this.group && s && (S.isNew = !0);
          }
          this.closestPointRangePx = m, Et(this, "afterTranslate");
        }
        getValidPoints(t, e, i) {
          let s = this.chart;
          return (t || this.points || []).filter(function(r) {
            let { plotX: o, plotY: a } = r;
            return !!((i || !r.isNull && jt(a)) && (!e || s.isInsidePlot(o, a, { inverted: s.inverted }))) && r.visible !== !1;
          });
        }
        getSharedClipKey() {
          return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0), this.sharedClipKey;
        }
        setClip() {
          let { chart: t, group: e, markerGroup: i } = this, s = t.sharedClips, r = t.renderer, o = t.getClipBox(this), a = this.getSharedClipKey(), n = s[a];
          n ? n.animate(o) : s[a] = n = r.clipRect(o), e && e.clip(this.options.clip === !1 ? void 0 : n), i && i.clip();
        }
        animate(t) {
          let { chart: e, group: i, markerGroup: s } = this, r = e.inverted, o = Gn(this.options.animation), a = [this.getSharedClipKey(), o.duration, o.easing, o.defer].join(","), n = e.sharedClips[a], l = e.sharedClips[a + "m"];
          if (t && i) {
            let c = e.getClipBox(this);
            if (n) n.attr("height", c.height);
            else {
              c.width = 0, r && (c.x = e.plotHeight), n = e.renderer.clipRect(c), e.sharedClips[a] = n;
              let d = { x: -99, y: -99, width: r ? e.plotWidth + 199 : 99, height: r ? 99 : e.plotHeight + 199 };
              l = e.renderer.clipRect(d), e.sharedClips[a + "m"] = l;
            }
            i.clip(n), s == null || s.clip(l);
          } else if (n && !n.hasClass("highcharts-animating")) {
            let c = e.getClipBox(this), d = o.step;
            (s != null && s.element.childNodes.length || e.series.length > 1) && (o.step = function(u, p) {
              d && d.apply(p, arguments), p.prop === "width" && (l != null && l.element) && l.attr(r ? "height" : "width", u + 99);
            }), n.addClass("highcharts-animating").animate(c, o);
          }
        }
        afterAnimate() {
          this.setClip(), ko(this.chart.sharedClips, (t, e, i) => {
            t && !this.chart.container.querySelector(`[clip-path="url(#${t.id})"]`) && (t.destroy(), delete i[e]);
          }), this.finishedAnimating = !0, Et(this, "afterAnimate");
        }
        drawPoints(t = this.points) {
          let e, i, s, r, o, a, n, l = this.chart, c = l.styledMode, { colorAxis: d, options: u } = this, p = u.marker, g = u.nullInteraction, x = this[this.specialGroup || "markerGroup"], y = this.xAxis, m = Pt(p.enabled, !y || !!y.isRadial || null, this.closestPointRangePx >= p.enabledThreshold * p.radius);
          if (p.enabled !== !1 || this._hasPointMarkers) for (e = 0; e < t.length; e++) {
            r = (s = (i = t[e]).graphic) ? "animate" : "attr", o = i.marker || {}, a = !!i.marker;
            let v = i.isNull;
            if ((m && !zt(o.enabled) || o.enabled) && (!v || g) && i.visible !== !1) {
              let w = Pt(o.symbol, this.symbol, "rect");
              n = this.markerAttribs(i, i.selected && "select"), this.enabledDataSorting && (i.startXPos = y.reversed ? -(n.width || 0) : y.width);
              let T = i.isInside !== !1;
              if (!s && T && ((n.width || 0) > 0 || i.hasImage) && (i.graphic = s = l.renderer.symbol(w, n.x, n.y, n.width, n.height, a ? o : p).add(x), this.enabledDataSorting && l.hasRendered && (s.attr({ x: i.startXPos }), r = "animate")), s && r === "animate" && s[T ? "show" : "hide"](T).animate(n), s) {
                let S = this.pointAttribs(i, c || !i.selected ? void 0 : "select");
                c ? d && s.css({ fill: S.fill }) : s[r](S);
              }
              s && s.addClass(i.getClassName(), !0);
            } else s && (i.graphic = s.destroy());
          }
        }
        markerAttribs(t, e) {
          let i = this.options, s = i.marker, r = t.marker || {}, o = r.symbol || s.symbol, a = {}, n, l, c = Pt(r.radius, s == null ? void 0 : s.radius);
          e && (n = s.states[e], l = r.states && r.states[e], c = Pt(l == null ? void 0 : l.radius, n == null ? void 0 : n.radius, c && c + ((n == null ? void 0 : n.radiusPlus) || 0))), t.hasImage = o && o.indexOf("url") === 0, t.hasImage && (c = 0);
          let d = t.pos();
          return jt(c) && d && (i.crisp && (d[0] = Wu(d[0], t.hasImage ? 0 : o === "rect" ? (s == null ? void 0 : s.lineWidth) || 0 : 1)), a.x = d[0] - c, a.y = d[1] - c), c && (a.width = a.height = 2 * c), a;
        }
        pointAttribs(t, e) {
          var m;
          let i = this.options, s = i.marker, r = t == null ? void 0 : t.options, o = (r == null ? void 0 : r.marker) || {}, a = r == null ? void 0 : r.color, n = t == null ? void 0 : t.color, l = (m = t == null ? void 0 : t.zone) == null ? void 0 : m.color, c, d, u = this.color, p, g, x = Pt(o.lineWidth, s.lineWidth), y = t != null && t.isNull && i.nullInteraction ? 0 : 1;
          return u = a || l || n || u, p = o.fillColor || s.fillColor || u, g = o.lineColor || s.lineColor || u, e = e || "normal", c = s.states[e] || {}, x = Pt((d = o.states && o.states[e] || {}).lineWidth, c.lineWidth, x + Pt(d.lineWidthPlus, c.lineWidthPlus, 0)), p = d.fillColor || c.fillColor || p, g = d.lineColor || c.lineColor || g, { stroke: g, "stroke-width": x, fill: p, opacity: y = Pt(d.opacity, c.opacity, y) };
        }
        destroy(t) {
          var n, l;
          let e, i, s = this, r = s.chart, o = /AppleWebKit\/533/.test(zu.navigator.userAgent), a = s.data || [];
          for (Et(s, "destroy", { keepEventsForUpdate: t }), this.removeEvents(t), (s.axisTypes || []).forEach(function(c) {
            i = s[c], i != null && i.series && ($n(i.series, s), i.isDirty = i.forceRedraw = !0);
          }), s.legendItem && s.chart.legend.destroyItem(s), e = a.length; e--; ) (l = (n = a[e]) == null ? void 0 : n.destroy) == null || l.call(n);
          for (let c of s.zones) Hu(c, void 0, !0);
          V.clearTimeout(s.animationTimeout), ko(s, function(c, d) {
            c instanceof we && !c.survive && c[o && d === "group" ? "hide" : "destroy"]();
          }), r.hoverSeries === s && (r.hoverSeries = void 0), $n(r.series, s), r.orderItems("series"), ko(s, function(c, d) {
            t && d === "hcEvents" || delete s[d];
          });
        }
        applyZones() {
          let { area: t, chart: e, graph: i, zones: s, points: r, xAxis: o, yAxis: a, zoneAxis: n } = this, { inverted: l, renderer: c } = e, d = this[`${n}Axis`], { isXAxis: u, len: p = 0, minPointOffset: g = 0 } = d || {}, x = ((i == null ? void 0 : i.strokeWidth()) || 0) / 2 + 1, y = (m, v = 0, w = 0) => {
            l && (w = p - w);
            let { translated: T = 0, lineClip: S } = m, M = w - T;
            S == null || S.push(["L", v, Math.abs(M) < x ? w - x * (M <= 0 ? -1 : 1) : T]);
          };
          if (s.length && (i || t) && d && jt(d.min)) {
            let m = d.getExtremes().max + g, v = (S) => {
              S.forEach((M, P) => {
                (M[0] === "M" || M[0] === "L") && (S[P] = [M[0], u ? p - M[1] : M[1], u ? M[2] : p - M[2]]);
              });
            };
            if (s.forEach((S) => {
              S.lineClip = [], S.translated = Un(d.toPixels(Pt(S.value, m), !0) || 0, 0, p);
            }), i && !this.showLine && i.hide(), t && t.hide(), n === "y" && r.length < o.len) for (let S of r) {
              let { plotX: M, plotY: P, zone: A } = S, L = A && s[s.indexOf(A) - 1];
              A && y(A, M, P), L && y(L, M, P);
            }
            let w = [], T = d.toPixels(d.getExtremes().min - g, !0);
            s.forEach((S) => {
              var it, G;
              let M = S.lineClip || [], P = Math.round(S.translated || 0);
              o.reversed && M.reverse();
              let { clip: A, simpleClip: L } = S, R = 0, D = 0, N = o.len, B = a.len;
              u ? (R = P, N = T) : (D = P, B = T);
              let X = [["M", R, D], ["L", N, D], ["L", N, B], ["L", R, B], ["Z"]], j = [X[0], ...M, X[1], X[2], ...w, X[3], X[4]];
              w = M.reverse(), T = P, l && (v(j), t && v(X)), A ? (A.animate({ d: j }), L == null || L.animate({ d: X })) : (A = S.clip = c.path(j), t && (L = S.simpleClip = c.path(X))), i && ((it = S.graph) == null || it.clip(A)), t && ((G = S.area) == null || G.clip(L));
            });
          } else this.visible && (i && i.show(), t && t.show());
        }
        plotGroup(t, e, i, s, r) {
          let o = this[t], a = !o, n = { visibility: i, zIndex: s || 0.1 };
          return zt(this.opacity) && !this.chart.styledMode && this.state !== "inactive" && (n.opacity = this.opacity), o || (this[t] = o = this.chart.renderer.g().add(r)), o.addClass("highcharts-" + e + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (zt(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (o.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0), o.attr(n)[a ? "attr" : "animate"](this.getPlotBox(e)), o;
        }
        getPlotBox(t) {
          let e = this.xAxis, i = this.yAxis, s = this.chart, r = s.inverted && !s.polar && e && this.invertible && t === "series";
          return s.inverted && (e = i, i = this.xAxis), { translateX: e ? e.left : s.plotLeft, translateY: i ? i.top : s.plotTop, rotation: 90 * !!r, rotationOriginX: r ? (e.len - i.len) / 2 : 0, rotationOriginY: r ? (e.len + i.len) / 2 : 0, scaleX: r ? -1 : 1, scaleY: 1 };
        }
        removeEvents(t) {
          let { eventsToUnbind: e } = this;
          t || Uu(this), e.length && (e.forEach((i) => {
            i();
          }), e.length = 0);
        }
        render() {
          var c, d, u, p, g;
          let t = this, { chart: e, options: i, hasRendered: s } = t, r = Gn(i.animation), o = t.visible ? "inherit" : "hidden", a = i.zIndex, n = e.seriesGroup, l = t.finishedAnimating ? 0 : r.duration;
          Et(this, "render"), t.plotGroup("group", "series", o, a, n), t.markerGroup = t.plotGroup("markerGroup", "markers", o, a, n), i.clip !== !1 && t.setClip(), l && ((c = t.animate) == null || c.call(t, !0)), t.drawGraph && (t.drawGraph(), t.applyZones()), t.visible && t.drawPoints(), (d = t.drawDataLabels) == null || d.call(t), (u = t.redrawPoints) == null || u.call(t), i.enableMouseTracking && ((p = t.drawTracker) == null || p.call(t)), l && ((g = t.animate) == null || g.call(t)), s || (l && r.defer && (l += r.defer), t.animationTimeout = _n(() => {
            t.afterAnimate();
          }, l || 0)), t.isDirty = !1, t.hasRendered = !0, Et(t, "afterRender");
        }
        redraw() {
          let t = this.isDirty || this.isDirtyData;
          this.translate(), this.render(), t && delete this.kdTree;
        }
        reserveSpace() {
          return this.visible || !this.chart.options.chart.ignoreHiddenSeries;
        }
        searchPoint(t, e) {
          let { xAxis: i, yAxis: s } = this, r = this.chart.inverted;
          return this.searchKDTree({ clientX: r ? i.len - t.chartY + i.pos : t.chartX - i.pos, plotY: r ? s.len - t.chartX + s.pos : t.chartY - s.pos }, e, t);
        }
        buildKDTree(t) {
          this.buildingKdTree = !0;
          let e = this, i = e.options, s = i.findNearestPointBy.indexOf("y") > -1 ? 2 : 1;
          delete e.kdTree, _n(function() {
            e.kdTree = function r(o, a, n) {
              let l, c, d = o == null ? void 0 : o.length;
              if (d) return l = e.kdAxisArray[a % n], o.sort((u, p) => (u[l] || 0) - (p[l] || 0)), { point: o[c = Math.floor(d / 2)], left: r(o.slice(0, c), a + 1, n), right: r(o.slice(c + 1), a + 1, n) };
            }(e.getValidPoints(void 0, !e.directTouch, i == null ? void 0 : i.nullInteraction), s, s), e.buildingKdTree = !1;
          }, i.kdNow || (t == null ? void 0 : t.type) === "touchstart" ? 0 : 1);
        }
        searchKDTree(t, e, i, s, r) {
          let o = this, [a, n] = this.kdAxisArray, l = e ? "distX" : "dist", c = (o.options.findNearestPointBy || "").indexOf("y") > -1 ? 2 : 1, d = !!o.isBubble, u = s || ((g, x, y) => {
            let m = g[y] || 0, v = x[y] || 0;
            return [m === v && g.index > x.index || m < v ? g : x, !1];
          }), p = r || ((g, x) => g < x);
          if (this.kdTree || this.buildingKdTree || this.buildKDTree(i), this.kdTree) return function g(x, y, m, v) {
            var R;
            let w = y.point, T = o.kdAxisArray[m % v], S = w, M = !1;
            (function(D, N) {
              var dt;
              let B = D[a], X = N[a], j = zt(B) && zt(X) ? B - X : null, it = D[n], G = N[n], et = zt(it) && zt(G) ? it - G : 0, ct = d && ((dt = N.marker) == null ? void 0 : dt.radius) || 0;
              N.dist = Math.sqrt((j && j * j || 0) + et * et) - ct, N.distX = zt(j) ? Math.abs(j) - ct : Number.MAX_VALUE;
            })(x, w);
            let P = (x[T] || 0) - (w[T] || 0) + (d && ((R = w.marker) == null ? void 0 : R.radius) || 0), A = P < 0 ? "left" : "right", L = P < 0 ? "right" : "left";
            return y[A] && ([S, M] = u(w, g(x, y[A], m + 1, v), l)), y[L] && p(Math.sqrt(P * P), S[l], M) && (S = u(S, g(x, y[L], m + 1, v), l)[0]), S;
          }(t, this.kdTree, c, c);
        }
        pointPlacementToXValue() {
          let { options: t, xAxis: e } = this, i = t.pointPlacement;
          return i === "between" && (i = e.reversed ? -0.5 : 0.5), jt(i) ? i * (t.pointRange || e.pointRange) : 0;
        }
        isPointInside(t) {
          let { chart: e, xAxis: i, yAxis: s } = this, { plotX: r = -1, plotY: o = -1 } = t;
          return o >= 0 && o <= (s ? s.len : e.plotHeight) && r >= 0 && r <= (i ? i.len : e.plotWidth);
        }
        drawTracker() {
          var u;
          let t = this, e = t.options, i = e.trackByArea, s = [].concat((i ? t.areaPath : t.graphPath) || []), r = t.chart, o = r.pointer, a = r.renderer, n = ((u = r.options.tooltip) == null ? void 0 : u.snap) || 0, l = () => {
            e.enableMouseTracking && r.hoverSeries !== t && t.onMouseOver();
          }, c = "rgba(192,192,192," + (Nu ? 1e-4 : 2e-3) + ")", d = t.tracker;
          d ? d.attr({ d: s }) : t.graph && (t.tracker = d = a.path(s).attr({ visibility: t.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(i ? "highcharts-tracker-area" : "highcharts-tracker-line").add(t.group), r.styledMode || d.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: c, fill: i ? c : "none", "stroke-width": t.graph.strokeWidth() + (i ? 0 : 2 * n) }), [t.tracker, t.markerGroup, t.dataLabelsGroup].forEach((p) => {
            p && (p.addClass("highcharts-tracker").on("mouseover", l).on("mouseout", (g) => {
              o == null || o.onTrackerMouseOut(g);
            }), e.cursor && !r.styledMode && p.css({ cursor: e.cursor }), p.on("touchstart", l));
          })), Et(this, "afterDrawTracker");
        }
        addPoint(t, e, i, s, r) {
          let o, a, n = this.options, { chart: l, data: c, dataTable: d, xAxis: u } = this, p = (u == null ? void 0 : u.hasNames) && u.names, g = n.data, x = this.getColumn("x");
          e = Pt(e, !0);
          let y = { series: this };
          this.pointClass.prototype.applyOptions.apply(y, [t]);
          let m = y.x;
          if (a = x.length, this.requireSorting && m < x[a - 1]) for (o = !0; a && x[a - 1] > m; ) a--;
          d.setRow(y, a, !0, { addColumns: !1 }), p && y.name && (p[m] = y.name), g == null || g.splice(a, 0, t), (o || this.processedData) && (this.data.splice(a, 0, null), this.processData()), n.legendType === "point" && this.generatePoints(), i && (c[0] && c[0].remove ? c[0].remove(!1) : ([c, g].filter(zt).forEach((v) => {
            v.shift();
          }), d.deleteRows(0))), r !== !1 && Et(this, "addPoint", { point: y }), this.isDirty = !0, this.isDirtyData = !0, e && l.redraw(s);
        }
        removePoint(t, e, i) {
          let s = this, { chart: r, data: o, points: a, dataTable: n } = s, l = o[t], c = function() {
            [(a == null ? void 0 : a.length) === o.length ? a : void 0, o, s.options.data].filter(zt).forEach((d) => {
              d.splice(t, 1);
            }), n.deleteRows(t), l == null || l.destroy(), s.isDirty = !0, s.isDirtyData = !0, e && r.redraw();
          };
          Du(i, r), e = Pt(e, !0), l ? l.firePointEvent("remove", null, c) : c();
        }
        remove(t, e, i, s) {
          let r = this, o = r.chart;
          function a() {
            r.destroy(s), o.isDirtyLegend = o.isDirtyBox = !0, o.linkSeries(s), Pt(t, !0) && o.redraw(e);
          }
          i !== !1 ? Et(r, "remove", null, a) : a();
        }
        update(t, e) {
          var m, v;
          Et(this, "update", { options: t = ju(t, this.userOptions) });
          let i = this, s = i.chart, r = i.userOptions, o = i.initialType || i.type, a = s.options.plotOptions, n = zi[o].prototype, l = i.finishedAnimating && { animation: !1 }, c = {}, d, u, p = fe.keepProps.slice(), g = t.type || r.type || s.options.chart.type, x = !(this.hasDerivedData || g && g !== this.type || t.keys !== void 0 || t.pointStart !== void 0 || t.pointInterval !== void 0 || t.relativeXValue !== void 0 || t.joinBy || t.mapData || ["dataGrouping", "pointStart", "pointInterval", "pointIntervalUnit", "keys"].some((w) => i.hasOptionChanged(w)));
          g = g || o, x ? (p.push.apply(p, fe.keepPropsForPoints), t.visible !== !1 && p.push("area", "graph"), i.parallelArrays.forEach(function(w) {
            p.push(w + "Data");
          }), t.data && (t.dataSorting && Fi(i.options.dataSorting, t.dataSorting), this.setData(t.data, !1))) : this.dataTable.modified = this.dataTable, t = fs(r, { index: r.index === void 0 ? i.index : r.index, pointStart: ((m = a == null ? void 0 : a.series) == null ? void 0 : m.pointStart) ?? r.pointStart ?? i.getColumn("x")[0] }, !x && { data: i.options.data }, t, l), x && t.data && (t.data = i.options.data), (p = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(p)).forEach(function(w) {
            p[w] = i[w], delete i[w];
          });
          let y = !1;
          if (zi[g]) {
            if (y = g !== i.type, i.remove(!1, !1, !1, !0), y)
              if (s.propFromSeries(), Object.setPrototypeOf) Object.setPrototypeOf(i, zi[g].prototype);
              else {
                let w = Object.hasOwnProperty.call(i, "hcEvents") && i.hcEvents;
                for (u in n) i[u] = void 0;
                Fi(i, zi[g].prototype), w ? i.hcEvents = w : delete i.hcEvents;
              }
          } else dr(17, !0, s, { missingModuleFor: g });
          if (p.forEach(function(w) {
            i[w] = p[w];
          }), i.init(s, t), x && this.points) for (let w of ((d = i.options).visible === !1 ? (c.graphic = 1, c.dataLabel = 1) : (this.hasMarkerChanged(d, r) && (c.graphic = 1), (v = i.hasDataLabels) != null && v.call(i) || (c.dataLabel = 1)), this.points)) w != null && w.series && (w.resolveColor(), Object.keys(c).length && w.destroyElements(c), d.showInLegend === !1 && w.legendItem && s.legend.destroyItem(w));
          i.initialType = o, s.linkSeries(), s.setSortedData(), y && i.linkedSeries.length && (i.isDirtyData = !0), Et(this, "afterUpdate"), Pt(e, !0) && s.redraw(!!x && void 0);
        }
        setName(t) {
          this.name = this.options.name = this.userOptions.name = t, this.chart.isDirtyLegend = !0;
        }
        hasOptionChanged(t) {
          var a, n;
          let e = this.chart, i = this.options[t], s = e.options.plotOptions, r = this.userOptions[t], o = Pt((a = s == null ? void 0 : s[this.type]) == null ? void 0 : a[t], (n = s == null ? void 0 : s.series) == null ? void 0 : n[t]);
          return r && !zt(o) ? i !== r : i !== Pt(o, i);
        }
        onMouseOver() {
          let t = this.chart, e = t.hoverSeries, i = t.pointer;
          i == null || i.setHoverChartIndex(), e && e !== this && e.onMouseOut(), this.options.events.mouseOver && Et(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this;
        }
        onMouseOut() {
          let t = this.options, e = this.chart, i = e.tooltip, s = e.hoverPoint;
          e.hoverSeries = null, s && s.onMouseOut(), this && t.events.mouseOut && Et(this, "mouseOut"), i && !this.stickyTracking && (!i.shared || this.noSharedTooltip) && i.hide(), e.series.forEach(function(r) {
            r.setState("", !0);
          });
        }
        setState(t, e) {
          let i = this, s = i.options, r = i.graph, o = s.inactiveOtherPoints, a = s.states, n = Pt(a[t || "normal"] && a[t || "normal"].animation, i.chart.options.chart.animation), l = s.lineWidth, c = s.opacity;
          if (t = t || "", i.state !== t && ([i.group, i.markerGroup, i.dataLabelsGroup].forEach(function(d) {
            d && (i.state && d.removeClass("highcharts-series-" + i.state), t && d.addClass("highcharts-series-" + t));
          }), i.state = t, !i.chart.styledMode)) {
            if (a[t] && a[t].enabled === !1) return;
            if (t && (l = a[t].lineWidth || l + (a[t].lineWidthPlus || 0), c = Pt(a[t].opacity, c)), r && !r.dashstyle && jt(l)) for (let d of [r, ...this.zones.map((u) => u.graph)]) d == null || d.animate({ "stroke-width": l }, n);
            o || [i.group, i.markerGroup, i.dataLabelsGroup, i.labelBySeries].forEach(function(d) {
              d && d.animate({ opacity: c }, n);
            });
          }
          e && o && i.points && i.setAllPointsToState(t || void 0);
        }
        setAllPointsToState(t) {
          this.points.forEach(function(e) {
            e.setState && e.setState(t);
          });
        }
        setVisible(t, e) {
          var n;
          let i = this, s = i.chart, r = s.options.chart.ignoreHiddenSeries, o = i.visible;
          i.visible = t = i.options.visible = i.userOptions.visible = t === void 0 ? !o : t;
          let a = t ? "show" : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach((l) => {
            var c;
            (c = i[l]) == null || c[a]();
          }), (s.hoverSeries === i || ((n = s.hoverPoint) == null ? void 0 : n.series) === i) && i.onMouseOut(), i.legendItem && s.legend.colorizeItem(i, t), i.isDirty = !0, i.options.stacking && s.series.forEach((l) => {
            l.options.stacking && l.visible && (l.isDirty = !0);
          }), i.linkedSeries.forEach((l) => {
            l.setVisible(t, !1);
          }), r && (s.isDirtyBox = !0), Et(i, a), e !== !1 && s.redraw();
        }
        show() {
          this.setVisible(!0);
        }
        hide() {
          this.setVisible(!1);
        }
        select(t) {
          this.selected = t = this.options.selected = t === void 0 ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), Et(this, t ? "select" : "unselect");
        }
        shouldShowTooltip(t, e, i = {}) {
          return i.series = this, i.visiblePlotOnly = !0, this.chart.isInsidePlot(t, e, i);
        }
        drawLegendSymbol(t, e) {
          var i;
          (i = jn[this.options.legendSymbol || "rectangle"]) == null || i.call(this, t, e);
        }
      }
      fe.defaultOptions = { lineWidth: 2, allowPointSelect: !1, crisp: !0, showCheckbox: !1, animation: { duration: 1e3 }, enableMouseTracking: !0, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 150 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { animation: {}, align: "center", borderWidth: 0, defer: !0, formatter: function() {
        let { numberFormatter: h } = this.series.chart;
        return typeof this.y != "number" ? "" : h(this.y, -1);
      }, padding: 5, style: { fontSize: "0.7em", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: !0, states: { normal: { animation: !0 }, hover: { animation: { duration: 150 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 150 }, opacity: 0.2 } }, stickyTracking: !0, turboThreshold: 1e3, findNearestPointBy: "x" }, fe.types = Lt.seriesTypes, fe.registerType = Lt.registerSeriesType, fe.keepProps = ["colorIndex", "eventOptions", "navigatorSeries", "symbolIndex", "baseSeries"], fe.keepPropsForPoints = ["data", "isDirtyData", "isDirtyCanvas", "points", "dataTable", "processedData", "xIncrement", "cropped", "_hasPointMarkers", "hasDataLabels", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX", "transformGroups"], Fi(fe.prototype, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, directTouch: !1, invertible: !0, isCartesian: !0, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: je, requireSorting: !0, sorted: !0 }), Lt.series = fe;
      let ie = fe, { animObject: qu, setAnimation: $u } = Xt, { registerEventOptions: Zn } = Ks, { composed: Vu, marginNames: Jn } = E, { distribute: Ku } = Ws, { format: Qu } = oe, { addEvent: cr, createElement: _u, css: Zu, defined: So, discardElement: Ju, find: tp, fireEvent: Ee, isNumber: tl, merge: di, pick: ne, pushUnique: ep, relativeLength: ip, stableSort: sp, syncTimeout: rp } = V;
      class Mo {
        constructor(t, e) {
          this.allItems = [], this.initialItemY = 0, this.itemHeight = 0, this.itemMarginBottom = 0, this.itemMarginTop = 0, this.itemX = 0, this.itemY = 0, this.lastItemY = 0, this.lastLineHeight = 0, this.legendHeight = 0, this.legendWidth = 0, this.maxItemWidth = 0, this.maxLegendWidth = 0, this.offsetWidth = 0, this.padding = 0, this.pages = [], this.symbolHeight = 0, this.symbolWidth = 0, this.titleHeight = 0, this.totalItemWidth = 0, this.widthOption = 0, this.chart = t, this.setOptions(e), e.enabled && (this.render(), Zn(this, e), cr(this.chart, "endResize", function() {
            this.legend.positionCheckboxes();
          })), cr(this.chart, "render", () => {
            this.options.enabled && this.proximate && (this.proximatePositions(), this.positionItems());
          });
        }
        setOptions(t) {
          let e = ne(t.padding, 8);
          this.options = t, this.chart.styledMode || (this.itemStyle = t.itemStyle, this.itemHiddenStyle = di(this.itemStyle, t.itemHiddenStyle)), this.itemMarginTop = t.itemMarginTop, this.itemMarginBottom = t.itemMarginBottom, this.padding = e, this.initialItemY = e - 5, this.symbolWidth = ne(t.symbolWidth, 16), this.pages = [], this.proximate = t.layout === "proximate" && !this.chart.inverted, this.baseline = void 0;
        }
        update(t, e) {
          let i = this.chart;
          this.setOptions(di(!0, this.options, t)), "events" in this.options && Zn(this, this.options), this.destroy(), i.isDirtyLegend = i.isDirtyBox = !0, ne(e, !0) && i.redraw(), Ee(this, "afterUpdate", { redraw: e });
        }
        colorizeItem(t, e) {
          var l;
          let i = t.color, { area: s, group: r, label: o, line: a, symbol: n } = t.legendItem || {};
          if ((t instanceof ie || t instanceof je) && (t.color = ((l = t.options) == null ? void 0 : l.legendSymbolColor) || i), r == null || r[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), !this.chart.styledMode) {
            let { itemHiddenStyle: c = {} } = this, d = c.color, { fillColor: u, fillOpacity: p, lineColor: g, marker: x } = t.options, y = (m) => (!e && (m.fill && (m.fill = d), m.stroke && (m.stroke = d)), m);
            o == null || o.css(di(e ? this.itemStyle : c)), a == null || a.attr(y({ stroke: g || t.color })), n && n.attr(y(x && n.isMarker ? t.pointAttribs() : { fill: t.color })), s == null || s.attr(y({ fill: u || t.color, "fill-opacity": u ? 1 : p ?? 0.75 }));
          }
          t.color = i, Ee(this, "afterColorizeItem", { item: t, visible: e });
        }
        positionItems() {
          this.allItems.forEach(this.positionItem, this), this.chart.isResizing || this.positionCheckboxes();
        }
        positionItem(t) {
          let { group: e, x: i = 0, y: s = 0 } = t.legendItem || {}, r = this.options, o = r.symbolPadding, a = !r.rtl, n = t.checkbox;
          if (e != null && e.element) {
            let l = { translateX: a ? i : this.legendWidth - i - 2 * o - 4, translateY: s };
            e[So(e.translateY) ? "animate" : "attr"](l, void 0, () => {
              Ee(this, "afterPositionItem", { item: t });
            });
          }
          n && (n.x = i, n.y = s);
        }
        destroyItem(t) {
          let e = t.checkbox, i = t.legendItem || {};
          for (let s of ["group", "label", "line", "symbol"]) i[s] && (i[s] = i[s].destroy());
          e && Ju(e), t.legendItem = void 0;
        }
        destroy() {
          for (let t of this.getAllItems()) this.destroyItem(t);
          for (let t of ["clipRect", "up", "down", "pager", "nav", "box", "title", "group"]) this[t] && (this[t] = this[t].destroy());
          this.display = null;
        }
        positionCheckboxes() {
          var r;
          let t, e = (r = this.group) == null ? void 0 : r.alignAttr, i = this.clipHeight || this.legendHeight, s = this.titleHeight;
          e && (t = e.translateY, this.allItems.forEach(function(o) {
            let a, n = o.checkbox;
            n && (a = t + s + n.y + (this.scrollOffset || 0) + 3, Zu(n, { left: e.translateX + o.checkboxOffset + n.x - 20 + "px", top: a + "px", display: this.proximate || a > t - 6 && a < t + i - 6 ? "" : "none" }));
          }, this));
        }
        renderTitle() {
          let t = this.options, e = this.padding, i = t.title, s, r = 0;
          i.text && (this.title || (this.title = this.chart.renderer.label(i.text, e - 3, e - 4, void 0, void 0, void 0, t.useHTML, void 0, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(i.style), this.title.add(this.group)), i.width || this.title.css({ width: this.maxLegendWidth + "px" }), r = (s = this.title.getBBox()).height, this.offsetWidth = s.width, this.contentGroup.attr({ translateY: r })), this.titleHeight = r;
        }
        setText(t) {
          let e = this.options;
          t.legendItem.label.attr({ text: e.labelFormat ? Qu(e.labelFormat, t, this.chart) : e.labelFormatter.call(t) });
        }
        renderItem(t) {
          var P;
          let e = t.legendItem = t.legendItem || {}, i = this.chart, s = i.renderer, r = this.options, o = r.layout === "horizontal", a = this.symbolWidth, n = r.symbolPadding || 0, l = this.itemStyle, c = this.itemHiddenStyle, d = o ? ne(r.itemDistance, 20) : 0, u = !r.rtl, p = !t.series, g = !p && t.series.drawLegendSymbol ? t.series : t, x = g.options, y = !!this.createCheckboxForItem && x && x.showCheckbox, m = r.useHTML, v = t.options.className, w = e.label, T = a + n + d + 20 * !!y;
          !w && (e.group = s.g("legend-item").addClass("highcharts-" + g.type + "-series highcharts-color-" + t.colorIndex + (v ? " " + v : "") + (p ? " highcharts-series-" + t.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), e.label = w = s.text("", u ? a + n : -n, this.baseline || 0, m), i.styledMode || w.css(di(t.visible ? l : c)), w.attr({ align: u ? "left" : "right", zIndex: 2 }).add(e.group), !this.baseline && (this.fontMetrics = s.fontMetrics(w), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, w.attr("y", this.baseline), this.symbolHeight = ne(r.symbolHeight, this.fontMetrics.f), r.squareSymbol && (this.symbolWidth = ne(r.symbolWidth, Math.max(this.symbolHeight, 16)), T = this.symbolWidth + n + d + 20 * !!y, u && w.attr("x", this.symbolWidth + n))), g.drawLegendSymbol(this, t), this.setItemEvents && this.setItemEvents(t, w, m)), y && !t.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(t), this.colorizeItem(t, t.visible), (i.styledMode || !l.width) && w.css({ width: (r.itemWidth || this.widthOption || i.spacingBox.width) - T + "px" }), this.setText(t);
          let S = w.getBBox(), M = ((P = this.fontMetrics) == null ? void 0 : P.h) || 0;
          t.itemWidth = t.checkboxOffset = r.itemWidth || e.labelWidth || S.width + T, this.maxItemWidth = Math.max(this.maxItemWidth, t.itemWidth), this.totalItemWidth += t.itemWidth, this.itemHeight = t.itemHeight = Math.round(e.labelHeight || (S.height > 1.5 * M ? S.height : M));
        }
        layoutItem(t) {
          let e = this.options, i = this.padding, s = e.layout === "horizontal", r = t.itemHeight, o = this.itemMarginBottom, a = this.itemMarginTop, n = s ? ne(e.itemDistance, 20) : 0, l = this.maxLegendWidth, c = e.alignColumns && this.totalItemWidth > l ? this.maxItemWidth : t.itemWidth, d = t.legendItem || {};
          s && this.itemX - i + c > l && (this.itemX = i, this.lastLineHeight && (this.itemY += a + this.lastLineHeight + o), this.lastLineHeight = 0), this.lastItemY = a + this.itemY + o, this.lastLineHeight = Math.max(r, this.lastLineHeight), d.x = this.itemX, d.y = this.itemY, s ? this.itemX += c : (this.itemY += a + r + o, this.lastLineHeight = r), this.offsetWidth = this.widthOption || Math.max((s ? this.itemX - i - (t.checkbox ? 0 : n) : c) + i, this.offsetWidth);
        }
        getAllItems() {
          let t = [];
          return this.chart.series.forEach(function(e) {
            var s;
            let i = e == null ? void 0 : e.options;
            e && ne(i.showInLegend, !So(i.linkedTo) && void 0, !0) && (t = t.concat(((s = e.legendItem) == null ? void 0 : s.labels) || (i.legendType === "point" ? e.data : e)));
          }), Ee(this, "afterGetAllItems", { allItems: t }), t;
        }
        getAlignment() {
          let t = this.options;
          return this.proximate ? t.align.charAt(0) + "tv" : t.floating ? "" : t.align.charAt(0) + t.verticalAlign.charAt(0) + t.layout.charAt(0);
        }
        adjustMargins(t, e) {
          let i = this.chart, s = this.options, r = this.getAlignment();
          r && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(o, a) {
            o.test(r) && !So(t[a]) && (i[Jn[a]] = Math.max(i[Jn[a]], i.legend[(a + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][a] * s[a % 2 ? "x" : "y"] + ne(s.margin, 12) + e[a] + (i.titleOffset[a] || 0)));
          });
        }
        proximatePositions() {
          let t, e = this.chart, i = [], s = this.options.align === "left";
          for (let r of (this.allItems.forEach(function(o) {
            let a, n, l = s, c, d;
            o.yAxis && (o.xAxis.options.reversed && (l = !l), o.points && (a = tp(l ? o.points : o.points.slice(0).reverse(), function(u) {
              return tl(u.plotY);
            })), n = this.itemMarginTop + o.legendItem.label.getBBox().height + this.itemMarginBottom, d = o.yAxis.top - e.plotTop, c = o.visible ? (a ? a.plotY : o.yAxis.height) + (d - 0.3 * n) : d + o.yAxis.height, i.push({ target: c, size: n, item: o }));
          }, this), Ku(i, e.plotHeight))) t = r.item.legendItem || {}, tl(r.pos) && (t.y = e.plotTop - e.spacing[0] + r.pos);
        }
        render() {
          let t = this.chart, e = t.renderer, i = this.options, s = this.padding, r = this.getAllItems(), o, a, n, l = this.group, c, d = this.box;
          this.itemX = s, this.itemY = this.initialItemY, this.offsetWidth = 0, this.lastItemY = 0, this.widthOption = ip(i.width, t.spacingBox.width - s), c = t.spacingBox.width - 2 * s - i.x, ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) > -1 && (c /= 2), this.maxLegendWidth = this.widthOption || c, l || (this.group = l = e.g("legend").addClass(i.className || "").attr({ zIndex: 7 }).add(), this.contentGroup = e.g().attr({ zIndex: 1 }).add(l), this.scrollGroup = e.g().add(this.contentGroup)), this.renderTitle(), sp(r, (u, p) => {
            var g, x;
            return (((g = u.options) == null ? void 0 : g.legendIndex) || 0) - (((x = p.options) == null ? void 0 : x.legendIndex) || 0);
          }), i.reversed && r.reverse(), this.allItems = r, this.display = o = !!r.length, this.lastLineHeight = 0, this.maxItemWidth = 0, this.totalItemWidth = 0, this.itemHeight = 0, r.forEach(this.renderItem, this), r.forEach(this.layoutItem, this), a = (this.widthOption || this.offsetWidth) + s, n = this.lastItemY + this.lastLineHeight + this.titleHeight, n = this.handleOverflow(n) + s, d || (this.box = d = e.rect().addClass("highcharts-legend-box").attr({ r: i.borderRadius }).add(l)), t.styledMode || d.attr({ stroke: i.borderColor, "stroke-width": i.borderWidth || 0, fill: i.backgroundColor || "none" }).shadow(i.shadow), a > 0 && n > 0 && d[d.placed ? "animate" : "attr"](d.crisp.call({}, { x: 0, y: 0, width: a, height: n }, d.strokeWidth())), l[o ? "show" : "hide"](), t.styledMode && l.getStyle("display") === "none" && (a = n = 0), this.legendWidth = a, this.legendHeight = n, o && this.align(), this.proximate || this.positionItems(), Ee(this, "afterRender");
        }
        align(t = this.chart.spacingBox) {
          let e = this.chart, i = this.options, s = t.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && e.titleOffset[0] > 0 ? s += e.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && e.titleOffset[2] > 0 && (s -= e.titleOffset[2]), s !== t.y && (t = di(t, { y: s })), e.hasRendered || (this.group.placed = !1), this.group.align(di(i, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : i.verticalAlign }), !0, t);
        }
        handleOverflow(t) {
          let e = this, i = this.chart, s = i.renderer, r = this.options, o = r.y, a = r.verticalAlign === "top", n = this.padding, l = r.maxHeight, c = r.navigation, d = ne(c.animation, !0), u = c.arrowSize || 12, p = this.pages, g = this.allItems, x = function(A) {
            typeof A == "number" ? P.attr({ height: A }) : P && (e.clipRect = P.destroy(), e.contentGroup.clip()), e.contentGroup.div && (e.contentGroup.div.style.clip = A ? "rect(" + n + "px,9999px," + (n + A) + "px,0)" : "auto");
          }, y = function(A) {
            return e[A] = s.circle(0, 0, 1.3 * u).translate(u / 2, u / 2).add(M), i.styledMode || e[A].attr("fill", "rgba(0,0,0,0.0001)"), e[A];
          }, m, v, w, T, S = i.spacingBox.height + (a ? -o : o) - n, M = this.nav, P = this.clipRect;
          return r.layout !== "horizontal" || r.verticalAlign === "middle" || r.floating || (S /= 2), l && (S = Math.min(S, l)), p.length = 0, t && S > 0 && t > S && c.enabled !== !1 ? (this.clipHeight = m = Math.max(S - 20 - this.titleHeight - n, 0), this.currentPage = ne(this.currentPage, 1), this.fullHeight = t, g.forEach((A, L) => {
            let R = (w = A.legendItem || {}).y || 0, D = Math.round(w.label.getBBox().height), N = p.length;
            (!N || R - p[N - 1] > m && (v || R) !== p[N - 1]) && (p.push(v || R), N++), w.pageIx = N - 1, v && T && (T.pageIx = N - 1), L === g.length - 1 && R + D - p[N - 1] > m && R > p[N - 1] && (p.push(R), w.pageIx = N), R !== v && (v = R), T = w;
          }), P || (P = e.clipRect = s.clipRect(0, n - 2, 9999, 0), e.contentGroup.clip(P)), x(m), M || (this.nav = M = s.g().attr({ zIndex: 1 }).add(this.group), this.up = s.symbol("triangle", 0, 0, u, u).add(M), y("upTracker").on("click", function() {
            e.scroll(-1, d);
          }), this.pager = s.text("", 15, 10).addClass("highcharts-legend-navigation"), !i.styledMode && c.style && this.pager.css(c.style), this.pager.add(M), this.down = s.symbol("triangle-down", 0, 0, u, u).add(M), y("downTracker").on("click", function() {
            e.scroll(1, d);
          })), e.scroll(0), t = S) : M && (x(), this.nav = M.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0), t;
        }
        scroll(t, e) {
          let i = this.chart, s = this.pages, r = s.length, o = this.clipHeight, a = this.options.navigation, n = this.pager, l = this.padding, c = this.currentPage + t;
          c > r && (c = r), c > 0 && (e !== void 0 && $u(e, i), this.nav.attr({ translateX: l, translateY: o + this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function(d) {
            d.attr({ class: c === 1 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }), n.attr({ text: c + "/" + r }), [this.down, this.downTracker].forEach(function(d) {
            d.attr({ x: 18 + this.pager.getBBox().width, class: c === r ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }, this), i.styledMode || (this.up.attr({ fill: c === 1 ? a.inactiveColor : a.activeColor }), this.upTracker.css({ cursor: c === 1 ? "default" : "pointer" }), this.down.attr({ fill: c === r ? a.inactiveColor : a.activeColor }), this.downTracker.css({ cursor: c === r ? "default" : "pointer" })), this.scrollOffset = -s[c - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = c, this.positionCheckboxes(), rp(() => {
            Ee(this, "afterScroll", { currentPage: c });
          }, qu(ne(e, i.renderer.globalAnimation, !0)).duration));
        }
        setItemEvents(t, e, i) {
          let s = this, r = t.legendItem || {}, o = s.chart.renderer.boxWrapper, a = t instanceof je, n = t instanceof ie, l = "highcharts-legend-" + (a ? "point" : "series") + "-active", c = s.chart.styledMode, d = i ? [e, r.symbol] : [r.group], u = (p) => {
            s.allItems.forEach((g) => {
              t !== g && [g].concat(g.linkedSeries || []).forEach((x) => {
                x.setState(p, !a);
              });
            });
          };
          for (let p of d) p && p.on("mouseover", function() {
            t.visible && u("inactive"), t.setState("hover"), t.visible && o.addClass(l), c || e.css(s.options.itemHoverStyle);
          }).on("mouseout", function() {
            s.chart.styledMode || e.css(di(t.visible ? s.itemStyle : s.itemHiddenStyle)), u(""), o.removeClass(l), t.setState();
          }).on("click", function(g) {
            let x = function() {
              t.setVisible && t.setVisible(), u(t.visible ? "inactive" : "");
            };
            o.removeClass(l), Ee(s, "itemClick", { browserEvent: g, legendItem: t }, x), a ? t.firePointEvent("legendItemClick", { browserEvent: g }) : n && Ee(t, "legendItemClick", { browserEvent: g });
          });
        }
        createCheckboxForItem(t) {
          t.checkbox = _u("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: t.selected, defaultChecked: t.selected }, this.options.itemCheckboxStyle, this.chart.container), cr(t.checkbox, "click", function(e) {
            let i = e.target;
            Ee(t.series || t, "checkboxClick", { checked: i.checked, item: t }, function() {
              t.select();
            });
          });
        }
      }
      (function(h) {
        h.compose = function(t) {
          ep(Vu, "Core.Legend") && cr(t, "beforeMargins", function() {
            this.legend = new h(this, this.options.legend);
          });
        };
      })(Mo || (Mo = {}));
      let el = Mo, { animate: Co, animObject: op, setAnimation: To } = Xt, { defaultOptions: Ao } = re, { numberFormat: ap } = oe, { registerEventOptions: il } = Ks, { charts: ci, doc: gs, marginNames: sl, svg: np, win: rl } = E, { seriesTypes: Oo } = Lt, { addEvent: Po, attr: ol, createElement: Lo, css: ge, defined: Ge, diffObjects: al, discardElement: lp, erase: hp, error: Eo, extend: Ye, find: Io, fireEvent: gt, getAlignFactor: dp, getStyle: Ro, isArray: cp, isNumber: Wi, isObject: up, isString: ur, merge: Ce, objectEach: Do, pick: Gt, pInt: pp, relativeLength: nl, removeEvent: ll, splat: pr, syncTimeout: fp, uniqueKey: gp } = V;
      class Ue {
        static chart(t, e, i) {
          return new Ue(t, e, i);
        }
        constructor(t, e, i) {
          this.sharedClips = {};
          let s = [...arguments];
          (ur(t) || t.nodeName) && (this.renderTo = s.shift()), this.init(s[0], s[1]);
        }
        setZoomOptions() {
          let t = this.options.chart, e = t.zooming;
          this.zooming = { ...e, type: Gt(t.zoomType, e.type), key: Gt(t.zoomKey, e.key), pinchType: Gt(t.pinchType, e.pinchType), singleTouch: Gt(t.zoomBySingleTouch, e.singleTouch, !1), resetButton: Ce(e.resetButton, t.resetZoomButton) };
        }
        init(t, e) {
          gt(this, "init", { args: arguments }, function() {
            var o;
            let i = Ce(Ao, t), s = i.chart, r = this.renderTo || s.renderTo;
            this.userOptions = Ye({}, t), (this.renderTo = ur(r) ? gs.getElementById(r) : r) || Eo(13, !0, this), this.margin = [], this.spacing = [], this.labelCollectors = [], this.callback = e, this.isResizing = 0, this.options = i, this.axes = [], this.series = [], this.locale = i.lang.locale ?? ((o = this.renderTo.closest("[lang]")) == null ? void 0 : o.lang), this.time = new jr(Ye(i.time || {}, { locale: this.locale }), i.lang), i.time = this.time.options, this.numberFormatter = (s.numberFormatter || ap).bind(this), this.styledMode = s.styledMode, this.hasCartesianSeries = s.showAxes, this.index = ci.length, ci.push(this), E.chartCount++, il(this, s), this.xAxis = [], this.yAxis = [], this.pointCount = this.colorCounter = this.symbolCounter = 0, this.setZoomOptions(), gt(this, "afterInit"), this.firstRender();
          });
        }
        initSeries(t) {
          let e = this.options.chart, i = t.type || e.type, s = Oo[i];
          s || Eo(17, !0, this, { missingModuleFor: i });
          let r = new s();
          return typeof r.init == "function" && r.init(this, t), r;
        }
        setSortedData() {
          this.getSeriesOrderByLinks().forEach(function(t) {
            t.points || t.data || !t.enabledDataSorting || t.setData(t.options.data, !1);
          });
        }
        getSeriesOrderByLinks() {
          return this.series.concat().sort(function(t, e) {
            return t.linkedSeries.length || e.linkedSeries.length ? e.linkedSeries.length - t.linkedSeries.length : 0;
          });
        }
        orderItems(t, e = 0) {
          let i = this[t], s = this.options[t] = pr(this.options[t]).slice(), r = this.userOptions[t] = this.userOptions[t] ? pr(this.userOptions[t]).slice() : [];
          if (this.hasRendered && (s.splice(e), r.splice(e)), i) for (let o = e, a = i.length; o < a; ++o) {
            let n = i[o];
            n && (n.index = o, n instanceof ie && (n.name = n.getName()), n.options.isInternal || (s[o] = n.options, r[o] = n.userOptions));
          }
        }
        getClipBox(t, e) {
          var c, d;
          let i = this.inverted, { xAxis: s, yAxis: r } = t || {}, { x: o, y: a, width: n, height: l } = Ce(this.clipBox);
          return t && (s && s.len !== this.plotSizeX && (n = s.len), r && r.len !== this.plotSizeY && (l = r.len), i && !t.invertible && ([n, l] = [l, n])), e && (o += ((c = i ? r : s) == null ? void 0 : c.pos) ?? this.plotLeft, a += ((d = i ? s : r) == null ? void 0 : d.pos) ?? this.plotTop), { x: o, y: a, width: n, height: l };
        }
        isInsidePlot(t, e, i = {}) {
          var y;
          let { inverted: s, plotBox: r, plotLeft: o, plotTop: a, scrollablePlotBox: n } = this, { scrollLeft: l = 0, scrollTop: c = 0 } = i.visiblePlotOnly && ((y = this.scrollablePlotArea) == null ? void 0 : y.scrollingContainer) || {}, d = i.series, u = i.visiblePlotOnly && n || r, p = i.inverted ? e : t, g = i.inverted ? t : e, x = { x: p, y: g, isInsidePlot: !0, options: i };
          if (!i.ignoreX) {
            let m = d && (s && !this.polar ? d.yAxis : d.xAxis) || { pos: o, len: 1 / 0 }, v = i.paneCoordinates ? m.pos + p : o + p;
            v >= Math.max(l + o, m.pos) && v <= Math.min(l + o + u.width, m.pos + m.len) || (x.isInsidePlot = !1);
          }
          if (!i.ignoreY && x.isInsidePlot) {
            let m = !s && i.axis && !i.axis.isXAxis && i.axis || d && (s ? d.xAxis : d.yAxis) || { pos: a, len: 1 / 0 }, v = i.paneCoordinates ? m.pos + g : a + g;
            v >= Math.max(c + a, m.pos) && v <= Math.min(c + a + u.height, m.pos + m.len) || (x.isInsidePlot = !1);
          }
          return gt(this, "afterIsInsidePlot", x), x.isInsidePlot;
        }
        redraw(t) {
          gt(this, "beforeRedraw");
          let e = this.hasCartesianSeries ? this.axes : this.colorAxis || [], i = this.series, s = this.pointer, r = this.legend, o = this.userOptions.legend, a = this.renderer, n = a.isHidden(), l = [], c, d, u, p = this.isDirtyBox, g = this.isDirtyLegend, x;
          for (a.rootFontSize = a.boxWrapper.getStyle("font-size"), this.setResponsive && this.setResponsive(!1), To(!!this.hasRendered && t, this), n && this.temporaryDisplay(), this.layOutTitles(!1), u = i.length; u--; ) if (((x = i[u]).options.stacking || x.options.centerInCategory) && (d = !0, x.isDirty)) {
            c = !0;
            break;
          }
          if (c) for (u = i.length; u--; ) (x = i[u]).options.stacking && (x.isDirty = !0);
          i.forEach(function(y) {
            y.isDirty && (y.options.legendType === "point" ? (typeof y.updateTotals == "function" && y.updateTotals(), g = !0) : o && (o.labelFormatter || o.labelFormat) && (g = !0)), y.isDirtyData && gt(y, "updatedData");
          }), g && r && r.options.enabled && (r.render(), this.isDirtyLegend = !1), d && this.getStacks(), e.forEach(function(y) {
            y.updateNames(), y.setScale();
          }), this.getMargins(), e.forEach(function(y) {
            y.isDirty && (p = !0);
          }), e.forEach(function(y) {
            let m = y.min + "," + y.max;
            y.extKey !== m && (y.extKey = m, l.push(function() {
              gt(y, "afterSetExtremes", Ye(y.eventArgs, y.getExtremes())), delete y.eventArgs;
            })), (p || d) && y.redraw();
          }), p && this.drawChartBox(), gt(this, "predraw"), i.forEach(function(y) {
            (p || y.isDirty) && y.visible && y.redraw(), y.isDirtyData = !1;
          }), s && s.reset(!0), a.draw(), gt(this, "redraw"), gt(this, "render"), n && this.temporaryDisplay(!0), l.forEach(function(y) {
            y.call();
          });
        }
        get(t) {
          let e = this.series;
          function i(r) {
            return r.id === t || r.options && r.options.id === t;
          }
          let s = Io(this.axes, i) || Io(this.series, i);
          for (let r = 0; !s && r < e.length; r++) s = Io(e[r].points || [], i);
          return s;
        }
        createAxes() {
          let t = this.userOptions;
          for (let e of (gt(this, "createAxes"), ["xAxis", "yAxis"])) for (let i of t[e] = pr(t[e] || {})) new Di(this, i, e);
          gt(this, "afterCreateAxes");
        }
        getSelectedPoints() {
          return this.series.reduce((t, e) => (e.getPointsCollection().forEach((i) => {
            Gt(i.selectedStaging, i.selected) && t.push(i);
          }), t), []);
        }
        getSelectedSeries() {
          return this.series.filter((t) => t.selected);
        }
        setTitle(t, e, i) {
          this.applyDescription("title", t), this.applyDescription("subtitle", e), this.applyDescription("caption", void 0), this.layOutTitles(i);
        }
        applyDescription(t, e) {
          var o;
          let i = this, s = this.options[t] = Ce(this.options[t], e), r = this[t];
          r && e && (this[t] = r = r.destroy()), s && !r && ((r = this.renderer.text(s.text, 0, 0, s.useHTML).attr({ align: s.align, class: "highcharts-" + t, zIndex: s.zIndex || 4 }).css({ textOverflow: "ellipsis", whiteSpace: "nowrap" }).add()).update = function(a, n) {
            i.applyDescription(t, a), i.layOutTitles(n);
          }, this.styledMode || r.css(Ye(t === "title" ? { fontSize: this.options.isStock ? "1em" : "1.2em" } : {}, s.style)), r.textPxLength = r.getBBox().width, r.css({ whiteSpace: (o = s.style) == null ? void 0 : o.whiteSpace }), this[t] = r);
        }
        layOutTitles(t = !0) {
          var a, n, l, c;
          let e = [0, 0, 0], { options: i, renderer: s, spacingBox: r } = this;
          ["title", "subtitle", "caption"].forEach((d) => {
            var y;
            let u = this[d], p = this.options[d], g = Ce(r), x = (u == null ? void 0 : u.textPxLength) || 0;
            if (u && p) {
              gt(this, "layOutTitle", { alignTo: g, key: d, textPxLength: x });
              let m = s.fontMetrics(u), v = m.b, w = m.h, T = p.verticalAlign || "top", S = T === "top", M = S && p.minScale || 1, P = d === "title" ? S ? -3 : 0 : S ? e[0] + 2 : 0, A = Math.min(g.width / x, 1), L = Math.max(M, A), R = Ce({ y: T === "bottom" ? v : P + v }, { align: d === "title" ? A < M ? "left" : "center" : (y = this.title) == null ? void 0 : y.alignValue }, p), D = (p.width || (A > M ? this.chartWidth : g.width) / L) + "px";
              u.alignValue !== R.align && (u.placed = !1);
              let N = Math.round(u.css({ width: D }).getBBox(p.useHTML).height);
              if (R.height = N, u.align(R, !1, g).attr({ align: R.align, scaleX: L, scaleY: L, "transform-origin": `${g.x + x * L * dp(R.align)} ${w}` }), !p.floating) {
                let B = N * (N < 1.2 * w ? 1 : L);
                T === "top" ? e[0] = Math.ceil(e[0] + B) : T === "bottom" && (e[2] = Math.ceil(e[2] + B));
              }
            }
          }, this), e[0] && (((a = i.title) == null ? void 0 : a.verticalAlign) || "top") === "top" && (e[0] += ((n = i.title) == null ? void 0 : n.margin) || 0), e[2] && ((l = i.caption) == null ? void 0 : l.verticalAlign) === "bottom" && (e[2] += ((c = i.caption) == null ? void 0 : c.margin) || 0);
          let o = !this.titleOffset || this.titleOffset.join(",") !== e.join(",");
          this.titleOffset = e, gt(this, "afterLayOutTitles"), !this.isDirtyBox && o && (this.isDirtyBox = this.isDirtyLegend = o, this.hasRendered && t && this.isDirtyBox && this.redraw());
        }
        getContainerBox() {
          let t = [].map.call(this.renderTo.children, (i) => {
            if (i !== this.container) {
              let s = i.style.display;
              return i.style.display = "none", [i, s];
            }
          }), e = { width: Ro(this.renderTo, "width", !0) || 0, height: Ro(this.renderTo, "height", !0) || 0 };
          return t.filter(Boolean).forEach(([i, s]) => {
            i.style.display = s;
          }), e;
        }
        getChartSize() {
          var o;
          let t = this.options.chart, e = t.width, i = t.height, s = this.getContainerBox(), r = s.height <= 1 || !((o = this.renderTo.parentElement) != null && o.style.height) && this.renderTo.style.height === "100%";
          this.chartWidth = Math.max(0, e || s.width || 600), this.chartHeight = Math.max(0, nl(i, this.chartWidth) || (r ? 400 : s.height)), this.containerBox = s;
        }
        temporaryDisplay(t) {
          let e = this.renderTo, i;
          if (t) for (; e != null && e.style; ) e.hcOrigStyle && (ge(e, e.hcOrigStyle), delete e.hcOrigStyle), e.hcOrigDetached && (gs.body.removeChild(e), e.hcOrigDetached = !1), e = e.parentNode;
          else for (; e != null && e.style && (gs.body.contains(e) || e.parentNode || (e.hcOrigDetached = !0, gs.body.appendChild(e)), (Ro(e, "display", !1) === "none" || e.hcOricDetached) && (e.hcOrigStyle = { display: e.style.display, height: e.style.height, overflow: e.style.overflow }, i = { display: "block", overflow: "hidden" }, e !== this.renderTo && (i.height = 0), ge(e, i), e.offsetWidth || e.style.setProperty("display", "block", "important")), (e = e.parentNode) !== gs.body); ) ;
        }
        setClassName(t) {
          this.container.className = "highcharts-container " + (t || "");
        }
        getContainer() {
          var u, p;
          let t, e = this.options, i = e.chart, s = "data-highcharts-chart", r = gp(), o = this.renderTo, a = pp(ol(o, s));
          Wi(a) && ci[a] && ci[a].hasRendered && ci[a].destroy(), ol(o, s, this.index), o.innerHTML = Tt.emptyHTML, i.skipClone || o.offsetWidth || this.temporaryDisplay(), this.getChartSize();
          let n = this.chartHeight, l = this.chartWidth;
          ge(o, { overflow: "hidden" }), this.styledMode || (t = Ye({ position: "relative", overflow: "hidden", width: l + "px", height: n + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none", "touch-action": "manipulation", outline: "none", padding: "0px" }, i.style || {}));
          let c = Lo("div", { id: r }, t, o);
          this.container = c, this.getChartSize(), l === this.chartWidth || (l = this.chartWidth, this.styledMode || ge(c, { width: Gt((u = i.style) == null ? void 0 : u.width, l + "px") })), this.containerBox = this.getContainerBox(), this._cursor = c.style.cursor;
          let d = i.renderer || !np ? os.getRendererType(i.renderer) : $s;
          if (this.renderer = new d(c, l, n, void 0, i.forExport, (p = e.exporting) == null ? void 0 : p.allowHTML, this.styledMode), To(void 0, this), this.setClassName(i.className), this.styledMode) for (let g in e.defs) this.renderer.definition(e.defs[g]);
          else this.renderer.setStyle(i.style);
          this.renderer.chartIndex = this.index, gt(this, "afterGetContainer");
        }
        getMargins(t) {
          var r;
          let { spacing: e, margin: i, titleOffset: s } = this;
          this.resetMargins(), s[0] && !Ge(i[0]) && (this.plotTop = Math.max(this.plotTop, s[0] + e[0])), s[2] && !Ge(i[2]) && (this.marginBottom = Math.max(this.marginBottom, s[2] + e[2])), (r = this.legend) != null && r.display && this.legend.adjustMargins(i, e), gt(this, "getMargins"), t || this.getAxisMargins();
        }
        getAxisMargins() {
          let t = this, e = t.axisOffset = [0, 0, 0, 0], i = t.colorAxis, s = t.margin, r = function(o) {
            o.forEach(function(a) {
              a.visible && a.getOffset();
            });
          };
          t.hasCartesianSeries ? r(t.axes) : i != null && i.length && r(i), sl.forEach(function(o, a) {
            Ge(s[a]) || (t[o] += e[a]);
          }), t.setChartSize();
        }
        getOptions() {
          return al(this.userOptions, Ao);
        }
        reflow(t) {
          var r;
          let e = this, i = e.containerBox, s = e.getContainerBox();
          (r = e.pointer) == null || delete r.chartPosition, !e.isPrinting && !e.isResizing && i && s.width && ((s.width !== i.width || s.height !== i.height) && (V.clearTimeout(e.reflowTimeout), e.reflowTimeout = fp(function() {
            e.container && e.setSize(void 0, void 0, !1);
          }, 100 * !!t)), e.containerBox = s);
        }
        setReflow() {
          let t = this, e = (i) => {
            var s;
            (s = t.options) != null && s.chart.reflow && t.hasLoaded && t.reflow(i);
          };
          if (typeof ResizeObserver == "function") new ResizeObserver(e).observe(t.renderTo);
          else {
            let i = Po(rl, "resize", e);
            Po(this, "destroy", i);
          }
        }
        setSize(t, e, i) {
          let s = this, r = s.renderer;
          s.isResizing += 1, To(i, s);
          let o = r.globalAnimation;
          s.oldChartHeight = s.chartHeight, s.oldChartWidth = s.chartWidth, t !== void 0 && (s.options.chart.width = t), e !== void 0 && (s.options.chart.height = e), s.getChartSize();
          let { chartWidth: a, chartHeight: n, scrollablePixelsX: l = 0, scrollablePixelsY: c = 0 } = s;
          (s.isDirtyBox || a !== s.oldChartWidth || n !== s.oldChartHeight) && (s.styledMode || (o ? Co : ge)(s.container, { width: `${a + l}px`, height: `${n + c}px` }, o), s.setChartSize(!0), r.setSize(a, n, o), s.axes.forEach(function(d) {
            d.isDirty = !0, d.setScale();
          }), s.isDirtyLegend = !0, s.isDirtyBox = !0, s.layOutTitles(), s.getMargins(), s.redraw(o), s.oldChartHeight = void 0, gt(s, "resize"), setTimeout(() => {
            s && gt(s, "endResize");
          }, op(o).duration)), s.isResizing -= 1;
        }
        setChartSize(t) {
          let e, i, s, r, { chartHeight: o, chartWidth: a, inverted: n, spacing: l, renderer: c } = this, d = this.clipOffset, u = Math[n ? "floor" : "round"];
          this.plotLeft = e = Math.round(this.plotLeft), this.plotTop = i = Math.round(this.plotTop), this.plotWidth = s = Math.max(0, Math.round(a - e - (this.marginRight ?? 0))), this.plotHeight = r = Math.max(0, Math.round(o - i - (this.marginBottom ?? 0))), this.plotSizeX = n ? r : s, this.plotSizeY = n ? s : r, this.spacingBox = c.spacingBox = { x: l[3], y: l[0], width: a - l[3] - l[1], height: o - l[0] - l[2] }, this.plotBox = c.plotBox = { x: e, y: i, width: s, height: r }, d && (this.clipBox = { x: u(d[3]), y: u(d[0]), width: u(this.plotSizeX - d[1] - d[3]), height: u(this.plotSizeY - d[0] - d[2]) }), t || (this.axes.forEach(function(p) {
            p.setAxisSize(), p.setAxisTranslation();
          }), c.alignElements()), gt(this, "afterSetChartSize", { skipAxes: t });
        }
        resetMargins() {
          gt(this, "resetMargins");
          let t = this, e = t.options.chart, i = e.plotBorderWidth || 0, s = Math.round(i) / 2;
          ["margin", "spacing"].forEach(function(r) {
            let o = e[r], a = up(o) ? o : [o, o, o, o];
            ["Top", "Right", "Bottom", "Left"].forEach(function(n, l) {
              t[r][l] = Gt(e[r + n], a[l]);
            });
          }), sl.forEach(function(r, o) {
            t[r] = Gt(t.margin[o], t.spacing[o]);
          }), t.axisOffset = [0, 0, 0, 0], t.clipOffset = [s, s, s, s], t.plotBorderWidth = i;
        }
        drawChartBox() {
          let t = this.options.chart, e = this.renderer, i = this.chartWidth, s = this.chartHeight, r = this.styledMode, o = this.plotBGImage, a = t.backgroundColor, n = t.plotBackgroundColor, l = t.plotBackgroundImage, c = this.plotLeft, d = this.plotTop, u = this.plotWidth, p = this.plotHeight, g = this.plotBox, x = this.clipRect, y = this.clipBox, m = this.chartBackground, v = this.plotBackground, w = this.plotBorder, T, S, M, P = "animate";
          m || (this.chartBackground = m = e.rect().addClass("highcharts-background").add(), P = "attr"), r ? T = S = m.strokeWidth() : (S = (T = t.borderWidth || 0) + 8 * !!t.shadow, M = { fill: a || "none" }, (T || m["stroke-width"]) && (M.stroke = t.borderColor, M["stroke-width"] = T), m.attr(M).shadow(t.shadow)), m[P]({ x: S / 2, y: S / 2, width: i - S - T % 2, height: s - S - T % 2, r: t.borderRadius }), P = "animate", v || (P = "attr", this.plotBackground = v = e.rect().addClass("highcharts-plot-background").add()), v[P](g), !r && (v.attr({ fill: n || "none" }).shadow(t.plotShadow), l && (o ? (l !== o.attr("href") && o.attr("href", l), o.animate(g)) : this.plotBGImage = e.image(l, c, d, u, p).add())), x ? x.animate({ width: y.width, height: y.height }) : this.clipRect = e.clipRect(y), P = "animate", w || (P = "attr", this.plotBorder = w = e.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()), r || w.attr({ stroke: t.plotBorderColor, "stroke-width": t.plotBorderWidth || 0, fill: "none" }), w[P](w.crisp(g, -w.strokeWidth())), this.isDirtyBox = !1, gt(this, "afterDrawChartBox");
        }
        propFromSeries() {
          let t, e, i, s = this, r = s.options.chart, o = s.options.series;
          ["inverted", "angular", "polar"].forEach(function(a) {
            for (e = Oo[r.type], i = r[a] || e && e.prototype[a], t = o == null ? void 0 : o.length; !i && t--; ) (e = Oo[o[t].type]) && e.prototype[a] && (i = !0);
            s[a] = i;
          });
        }
        linkSeries(t) {
          let e = this, i = e.series;
          i.forEach(function(s) {
            s.linkedSeries.length = 0;
          }), i.forEach(function(s) {
            let { linkedTo: r } = s.options;
            if (ur(r)) {
              let o;
              (o = r === ":previous" ? e.series[s.index - 1] : e.get(r)) && o.linkedParent !== s && (o.linkedSeries.push(s), s.linkedParent = o, o.enabledDataSorting && s.setDataSortingOptions(), s.visible = Gt(s.options.visible, o.options.visible, s.visible));
            }
          }), gt(this, "afterLinkSeries", { isUpdating: t });
        }
        renderSeries() {
          this.series.forEach(function(t) {
            t.translate(), t.render();
          });
        }
        render() {
          var c;
          let t = this.axes, e = this.colorAxis, i = this.renderer, s = this.options.chart.axisLayoutRuns || 2, r = (d) => {
            d.forEach((u) => {
              u.visible && u.render();
            });
          }, o = 0, a = !0, n, l = 0;
          for (let d of (this.setTitle(), gt(this, "beforeMargins"), (c = this.getStacks) == null || c.call(this), this.getMargins(!0), this.setChartSize(), t)) {
            let { options: u } = d, { labels: p } = u;
            if (this.hasCartesianSeries && d.horiz && d.visible && p.enabled && d.series.length && d.coll !== "colorAxis" && !this.polar) {
              o = u.tickLength, d.createGroups();
              let g = new Ri(d, 0, "", !0), x = g.createLabel("x", p);
              if (g.destroy(), x && Gt(p.reserveSpace, !Wi(u.crossing)) && (o = x.getBBox().height + p.distance + Math.max(u.offset || 0, 0)), o) {
                x == null || x.destroy();
                break;
              }
            }
          }
          for (this.plotHeight = Math.max(this.plotHeight - o, 0); (a || n || s > 1) && l < s; ) {
            let d = this.plotWidth, u = this.plotHeight;
            for (let p of t) l === 0 ? p.setScale() : (p.horiz && a || !p.horiz && n) && p.setTickInterval(!0);
            l === 0 ? this.getAxisMargins() : this.getMargins(), a = d / this.plotWidth > (l ? 1 : 1.1), n = u / this.plotHeight > (l ? 1 : 1.05), l++;
          }
          this.drawChartBox(), this.hasCartesianSeries ? r(t) : e != null && e.length && r(e), this.seriesGroup || (this.seriesGroup = i.g("series-group").attr({ zIndex: 3 }).shadow(this.options.chart.seriesGroupShadow).add()), this.renderSeries(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = !0;
        }
        addCredits(t) {
          let e = this, i = Ce(!0, this.options.credits, t);
          i.enabled && !this.credits && (this.credits = this.renderer.text(i.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
            i.href && (rl.location.href = i.href);
          }).attr({ align: i.position.align, zIndex: 8 }), e.styledMode || this.credits.css(i.style), this.credits.add().align(i.position), this.credits.update = function(s) {
            e.credits = e.credits.destroy(), e.addCredits(s);
          });
        }
        destroy() {
          var a, n;
          let t, e = this, i = e.axes, s = e.series, r = e.container, o = r == null ? void 0 : r.parentNode;
          for (gt(e, "destroy"), e.renderer.forExport ? hp(ci, e) : ci[e.index] = void 0, E.chartCount--, e.renderTo.removeAttribute("data-highcharts-chart"), ll(e), t = i.length; t--; ) i[t] = i[t].destroy();
          for ((n = (a = this.scroller) == null ? void 0 : a.destroy) == null || n.call(a), t = s.length; t--; ) s[t] = s[t].destroy();
          ["title", "subtitle", "chartBackground", "plotBackground", "plotBGImage", "plotBorder", "seriesGroup", "clipRect", "credits", "pointer", "rangeSelector", "legend", "resetZoomButton", "tooltip", "renderer"].forEach((l) => {
            var c, d;
            e[l] = (d = (c = e[l]) == null ? void 0 : c.destroy) == null ? void 0 : d.call(c);
          }), r && (r.innerHTML = Tt.emptyHTML, ll(r), o && lp(r)), Do(e, function(l, c) {
            delete e[c];
          });
        }
        firstRender() {
          var s;
          let t = this, e = t.options;
          t.getContainer(), t.resetMargins(), t.setChartSize(), t.propFromSeries(), t.createAxes();
          let i = cp(e.series) ? e.series : [];
          e.series = [], i.forEach(function(r) {
            t.initSeries(r);
          }), t.linkSeries(), t.setSortedData(), gt(t, "beforeRender"), t.render(), (s = t.pointer) == null || s.getChartPosition(), t.renderer.imgCount || t.hasLoaded || t.onload(), t.temporaryDisplay(!0);
        }
        onload() {
          this.callbacks.concat([this.callback]).forEach(function(t) {
            t && this.index !== void 0 && t.apply(this, [this]);
          }, this), gt(this, "load"), gt(this, "render"), Ge(this.index) && this.setReflow(), this.warnIfA11yModuleNotLoaded(), this.hasLoaded = !0;
        }
        warnIfA11yModuleNotLoaded() {
          let { options: t, title: e } = this;
          !t || this.accessibility || (this.renderer.boxWrapper.attr({ role: "img", "aria-label": ((e == null ? void 0 : e.element.textContent) || "").replace(/</g, "&lt;") }), t.accessibility && t.accessibility.enabled === !1 || Eo('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', !1, this));
        }
        addSeries(t, e, i) {
          let s, r = this;
          return t && (e = Gt(e, !0), gt(r, "addSeries", { options: t }, function() {
            s = r.initSeries(t), r.isDirtyLegend = !0, r.linkSeries(), s.enabledDataSorting && s.setData(t.data, !1), gt(r, "afterAddSeries", { series: s }), e && r.redraw(i);
          })), s;
        }
        addAxis(t, e, i, s) {
          return this.createAxis(e ? "xAxis" : "yAxis", { axis: t, redraw: i, animation: s });
        }
        addColorAxis(t, e, i) {
          return this.createAxis("colorAxis", { axis: t, redraw: e, animation: i });
        }
        createAxis(t, e) {
          let i = new Di(this, e.axis, t);
          return Gt(e.redraw, !0) && this.redraw(e.animation), i;
        }
        showLoading(t) {
          let e = this, i = e.options, s = i.loading, r = function() {
            o && ge(o, { left: e.plotLeft + "px", top: e.plotTop + "px", width: e.plotWidth + "px", height: e.plotHeight + "px" });
          }, o = e.loadingDiv, a = e.loadingSpan;
          o || (e.loadingDiv = o = Lo("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, e.container)), a || (e.loadingSpan = a = Lo("span", { className: "highcharts-loading-inner" }, null, o), Po(e, "redraw", r)), o.className = "highcharts-loading", Tt.setElementHTML(a, Gt(t, i.lang.loading, "")), e.styledMode || (ge(o, Ye(s.style, { zIndex: 10 })), ge(a, s.labelStyle), e.loadingShown || (ge(o, { opacity: 0, display: "" }), Co(o, { opacity: s.style.opacity || 0.5 }, { duration: s.showDuration || 0 }))), e.loadingShown = !0, r();
        }
        hideLoading() {
          let t = this.options, e = this.loadingDiv;
          e && (e.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || Co(e, { opacity: 0 }, { duration: t.loading.hideDuration || 100, complete: function() {
            ge(e, { display: "none" });
          } })), this.loadingShown = !1;
        }
        update(t, e, i, s) {
          let r, o, a, n = this, l = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, c = t.isResponsiveOptions, d = [];
          gt(n, "update", { options: t }), c || n.setResponsive(!1, !0), t = al(t, n.options), n.userOptions = Ce(n.userOptions, t);
          let u = t.chart;
          u && (Ce(!0, n.options.chart, u), this.setZoomOptions(), "className" in u && n.setClassName(u.className), ("inverted" in u || "polar" in u || "type" in u) && (n.propFromSeries(), r = !0), "alignTicks" in u && (r = !0), "events" in u && il(this, u), Do(u, function(x, y) {
            n.propsRequireUpdateSeries.indexOf("chart." + y) !== -1 && (o = !0), n.propsRequireDirtyBox.indexOf(y) !== -1 && (n.isDirtyBox = !0), n.propsRequireReflow.indexOf(y) === -1 || (n.isDirtyBox = !0, c || (a = !0));
          }), !n.styledMode && u.style && n.renderer.setStyle(n.options.chart.style || {})), !n.styledMode && t.colors && (this.options.colors = t.colors), Do(t, function(x, y) {
            n[y] && typeof n[y].update == "function" ? n[y].update(x, !1) : typeof n[l[y]] == "function" ? n[l[y]](x) : y !== "colors" && n.collectionsWithUpdate.indexOf(y) === -1 && Ce(!0, n.options[y], t[y]), y !== "chart" && n.propsRequireUpdateSeries.indexOf(y) !== -1 && (o = !0);
          }), this.collectionsWithUpdate.forEach(function(x) {
            t[x] && (pr(t[x]).forEach(function(y, m) {
              let v, w = Ge(y.id);
              w && (v = n.get(y.id)), !v && n[x] && (v = n[x][Gt(y.index, m)]) && (w && Ge(v.options.id) || v.options.isInternal) && (v = void 0), v && v.coll === x && (v.update(y, !1), i && (v.touched = !0)), !v && i && n.collectionsWithInit[x] && (n.collectionsWithInit[x][0].apply(n, [y].concat(n.collectionsWithInit[x][1] || []).concat([!1])).touched = !0);
            }), i && n[x].forEach(function(y) {
              y.touched || y.options.isInternal ? delete y.touched : d.push(y);
            }));
          }), d.forEach(function(x) {
            x.chart && x.remove && x.remove(!1);
          }), r && n.axes.forEach(function(x) {
            x.update({}, !1);
          }), o && n.getSeriesOrderByLinks().forEach(function(x) {
            x.chart && x.update({}, !1);
          }, this);
          let p = u == null ? void 0 : u.width, g = u && (ur(u.height) ? nl(u.height, p || n.chartWidth) : u.height);
          a || Wi(p) && p !== n.chartWidth || Wi(g) && g !== n.chartHeight ? n.setSize(p, g, s) : Gt(e, !0) && n.redraw(s), gt(n, "afterUpdate", { options: t, redraw: e, animation: s });
        }
        setSubtitle(t, e) {
          this.applyDescription("subtitle", t), this.layOutTitles(e);
        }
        setCaption(t, e) {
          this.applyDescription("caption", t), this.layOutTitles(e);
        }
        showResetZoom() {
          let t = this, e = Ao.lang, i = t.zooming.resetButton, s = i.theme, r = i.relativeTo === "chart" || i.relativeTo === "spacingBox" ? null : "plotBox";
          function o() {
            t.zoomOut();
          }
          gt(this, "beforeShowResetZoom", null, function() {
            t.resetZoomButton = t.renderer.button(e.resetZoom, null, null, o, s).attr({ align: i.position.align, title: e.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(i.position, !1, r);
          }), gt(this, "afterShowResetZoom");
        }
        zoomOut() {
          gt(this, "selection", { resetSelection: !0 }, () => this.transform({ reset: !0, trigger: "zoom" }));
        }
        pan(t, e) {
          let i = this, s = typeof e == "object" ? e : { enabled: e, type: "x" }, r = s.type, o = r && i[{ x: "xAxis", xy: "axes", y: "yAxis" }[r]].filter((n) => n.options.panningEnabled && !n.options.isInternal), a = i.options.chart;
          a != null && a.panning && (a.panning = s), gt(this, "pan", { originalEvent: t }, () => {
            i.transform({ axes: o, event: t, to: { x: t.chartX - (i.mouseDownX || 0), y: t.chartY - (i.mouseDownY || 0) }, trigger: "pan" }), ge(i.container, { cursor: "move" });
          });
        }
        transform(t) {
          var g;
          let { axes: e = this.axes, event: i, from: s = {}, reset: r, selection: o, to: a = {}, trigger: n } = t, { inverted: l, time: c } = this, d = !1, u, p;
          for (let x of ((g = this.hoverPoints) == null || g.forEach((y) => y.setState()), e)) {
            let { horiz: y, len: m, minPointOffset: v = 0, options: w, reversed: T } = x, S = y ? "width" : "height", M = y ? "x" : "y", P = Gt(a[S], x.len), A = Gt(s[S], x.len), L = 10 > Math.abs(P) ? 1 : P / A, R = (s[M] || 0) + A / 2 - x.pos, D = R - ((a[M] ?? x.pos) + P / 2 - x.pos) / L, N = T && !l || !T && l ? -1 : 1;
            if (!r && (R < 0 || R > x.len)) continue;
            let B = x.toValue(D, !0) + (o || x.isOrdinal ? 0 : v * N), X = x.toValue(D + m / L, !0) - (o || x.isOrdinal ? 0 : v * N || 0), j = x.allExtremes;
            if (B > X && ([B, X] = [X, B]), L === 1 && !r && x.coll === "yAxis" && !j) {
              for (let Ie of x.series) {
                let le = Ie.getExtremes(Ie.getProcessedData(!0).modified.getColumn("y") || [], !0);
                j ?? (j = { dataMin: Number.MAX_VALUE, dataMax: -Number.MAX_VALUE }), Wi(le.dataMin) && Wi(le.dataMax) && (j.dataMin = Math.min(le.dataMin, j.dataMin), j.dataMax = Math.max(le.dataMax, j.dataMax));
              }
              x.allExtremes = j;
            }
            let { dataMin: it, dataMax: G, min: et, max: ct } = Ye(x.getExtremes(), j || {}), dt = c.parse(w.min), pt = c.parse(w.max), Yt = it ?? dt, ut = G ?? pt, bt = X - B, ot = x.categories ? 0 : Math.min(bt, ut - Yt), Q = Yt - ot * (Ge(dt) ? 0 : w.minPadding), Rt = ut + ot * (Ge(pt) ? 0 : w.maxPadding), vt = x.allowZoomOutside || L === 1 || n !== "zoom" && L > 1, Mt = Math.min(dt ?? Q, Q, vt ? et : Q), Ft = Math.max(pt ?? Rt, Rt, vt ? ct : Rt);
            (!x.isOrdinal || x.options.overscroll || L !== 1 || r) && (B < Mt && (B = Mt, L >= 1 && (X = B + bt)), X > Ft && (X = Ft, L >= 1 && (B = X - bt)), (r || x.series.length && (B !== et || X !== ct) && B >= Mt && X <= Ft) && (o ? o[x.coll].push({ axis: x, min: B, max: X }) : (x.isPanning = n !== "zoom", x.isPanning && (p = !0), x.setExtremes(r ? void 0 : B, r ? void 0 : X, !1, !1, { move: D, trigger: n, scale: L }), !r && (B > Mt || X < Ft) && n !== "mousewheel" && (u = !0)), d = !0), i && (this[y ? "mouseDownX" : "mouseDownY"] = i[y ? "chartX" : "chartY"]));
          }
          return d && (o ? gt(this, "selection", o, () => {
            delete t.selection, t.trigger = "zoom", this.transform(t);
          }) : (!u || p || this.resetZoomButton ? !u && this.resetZoomButton && (this.resetZoomButton = this.resetZoomButton.destroy()) : this.showResetZoom(), this.redraw(n === "zoom" && (this.options.chart.animation ?? this.pointCount < 100)))), d;
        }
      }
      Ye(Ue.prototype, { callbacks: [], collectionsWithInit: { xAxis: [Ue.prototype.addAxis, [!0]], yAxis: [Ue.prototype.addAxis, [!1]], series: [Ue.prototype.addSeries] }, collectionsWithUpdate: ["xAxis", "yAxis", "series"], propsRequireDirtyBox: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "plotBackgroundColor", "plotBackgroundImage", "plotBorderColor", "plotBorderWidth", "plotShadow", "shadow"], propsRequireReflow: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "spacing", "spacingTop", "spacingRight", "spacingBottom", "spacingLeft"], propsRequireUpdateSeries: ["chart.inverted", "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions", "time", "tooltip"] });
      let { stop: mp } = Xt, { composed: yp } = E, { addEvent: qe, createElement: fr, css: Bo, defined: No, erase: xp, merge: hl, pushUnique: dl } = V;
      function bp() {
        let h = this.scrollablePlotArea;
        (this.scrollablePixelsX || this.scrollablePixelsY) && !h && (this.scrollablePlotArea = h = new ms(this)), h == null || h.applyFixed();
      }
      function cl() {
        this.chart.scrollablePlotArea && (this.chart.scrollablePlotArea.isDirty = !0);
      }
      class ms {
        static compose(t, e, i) {
          dl(yp, this.compose) && (qe(t, "afterInit", cl), qe(e, "afterSetChartSize", (s) => this.afterSetSize(s.target, s)), qe(e, "render", bp), qe(i, "show", cl));
        }
        static afterSetSize(t, e) {
          let i, s, r, { minWidth: o, minHeight: a } = t.options.chart.scrollablePlotArea || {}, { clipBox: n, plotBox: l, inverted: c, renderer: d } = t;
          if (!d.forExport && (o ? (t.scrollablePixelsX = i = Math.max(0, o - t.chartWidth), i && (t.scrollablePlotBox = hl(t.plotBox), l.width = t.plotWidth += i, n[c ? "height" : "width"] += i, r = !0)) : a && (t.scrollablePixelsY = s = Math.max(0, a - t.chartHeight), No(s) && (t.scrollablePlotBox = hl(t.plotBox), l.height = t.plotHeight += s, n[c ? "width" : "height"] += s, r = !1)), No(r) && !e.skipAxes)) for (let u of t.axes) (u.horiz === r || t.hasParallelCoordinates && u.coll === "yAxis") && (u.setAxisSize(), u.setAxisTranslation());
        }
        constructor(t) {
          var p;
          let e, i = t.options.chart, s = os.getRendererType(), r = i.scrollablePlotArea || {}, o = this.moveFixedElements.bind(this), a = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
          t.scrollablePixelsX && (a.overflowX = "auto"), t.scrollablePixelsY && (a.overflowY = "auto"), this.chart = t;
          let n = this.parentDiv = fr("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, t.renderTo), l = this.scrollingContainer = fr("div", { className: "highcharts-scrolling" }, a, n), c = this.innerContainer = fr("div", { className: "highcharts-inner-container" }, void 0, l), d = this.fixedDiv = fr("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (((p = i.style) == null ? void 0 : p.zIndex) || 0) + 2, top: 0 }, void 0, !0), u = this.fixedRenderer = new s(d, t.chartWidth, t.chartHeight, i.style);
          this.mask = u.path().attr({ fill: i.backgroundColor || "#fff", "fill-opacity": r.opacity ?? 0.85, zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), l.parentNode.insertBefore(d, l), Bo(t.renderTo, { overflow: "visible" }), qe(t, "afterShowResetZoom", o), qe(t, "afterApplyDrilldown", o), qe(t, "afterLayOutTitles", o), qe(l, "scroll", () => {
            let { pointer: g, hoverPoint: x } = t;
            g && (delete g.chartPosition, x && (e = x), g.runPointActions(void 0, e, !0));
          }), c.appendChild(t.container);
        }
        applyFixed() {
          var R;
          let { chart: t, fixedRenderer: e, isDirty: i, scrollingContainer: s } = this, { axisOffset: r, chartWidth: o, chartHeight: a, container: n, plotHeight: l, plotLeft: c, plotTop: d, plotWidth: u, scrollablePixelsX: p = 0, scrollablePixelsY: g = 0 } = t, { scrollPositionX: x = 0, scrollPositionY: y = 0 } = t.options.chart.scrollablePlotArea || {}, m = o + p, v = a + g;
          e.setSize(o, a), (i ?? !0) && (this.isDirty = !1, this.moveFixedElements()), mp(t.container), Bo(n, { width: `${m}px`, height: `${v}px` }), t.renderer.boxWrapper.attr({ width: m, height: v, viewBox: [0, 0, m, v].join(" ") }), (R = t.chartBackground) == null || R.attr({ width: m, height: v }), Bo(s, { width: `${o}px`, height: `${a}px` }), No(i) || (s.scrollLeft = p * x, s.scrollTop = g * y);
          let w = d - r[0] - 1, T = c - r[3] - 1, S = d + l + r[2] + 1, M = c + u + r[1] + 1, P = c + u - p, A = d + l - g, L = [["M", 0, 0]];
          p ? L = [["M", 0, w], ["L", c - 1, w], ["L", c - 1, S], ["L", 0, S], ["Z"], ["M", P, w], ["L", o, w], ["L", o, S], ["L", P, S], ["Z"]] : g && (L = [["M", T, 0], ["L", T, d - 1], ["L", M, d - 1], ["L", M, 0], ["Z"], ["M", T, A], ["L", T, a], ["L", M, a], ["L", M, A], ["Z"]]), t.redrawTrigger !== "adjustHeight" && this.mask.attr({ d: L });
        }
        moveFixedElements() {
          let t, { container: e, inverted: i, scrollablePixelsX: s, scrollablePixelsY: r } = this.chart, o = this.fixedRenderer, a = ms.fixedSelectors;
          if (s && !i ? t = ".highcharts-yaxis" : s && i || r && !i ? t = ".highcharts-xaxis" : r && i && (t = ".highcharts-yaxis"), t && !(this.chart.hasParallelCoordinates && t === ".highcharts-yaxis")) for (let n of [`${t}:not(.highcharts-radial-axis)`, `${t}-labels:not(.highcharts-radial-axis-labels)`]) dl(a, n);
          else for (let n of [".highcharts-xaxis", ".highcharts-yaxis"]) for (let l of [`${n}:not(.highcharts-radial-axis)`, `${n}-labels:not(.highcharts-radial-axis-labels)`]) xp(a, l);
          for (let n of a) [].forEach.call(e.querySelectorAll(n), (l) => {
            (l.namespaceURI === o.SVG_NS ? o.box : o.box.parentNode).appendChild(l), l.style.pointerEvents = "auto";
          });
        }
      }
      ms.fixedSelectors = [".highcharts-breadcrumbs-group", ".highcharts-contextbutton", ".highcharts-caption", ".highcharts-credits", ".highcharts-drillup-button", ".highcharts-legend", ".highcharts-legend-checkbox", ".highcharts-navigator-series", ".highcharts-navigator-xaxis", ".highcharts-navigator-yaxis", ".highcharts-navigator", ".highcharts-range-selector-group", ".highcharts-reset-zoom", ".highcharts-scrollbar", ".highcharts-subtitle", ".highcharts-title"];
      let { format: vp } = oe, { series: wp } = Lt, { destroyObjectProperties: kp, fireEvent: ul, getAlignFactor: zo, isNumber: Fo, pick: ys } = V, pl = class {
        constructor(h, t, e, i, s) {
          let r = h.chart.inverted, o = h.reversed;
          this.axis = h;
          let a = this.isNegative = !!e != !!o;
          this.options = t = t || {}, this.x = i, this.total = null, this.cumulative = null, this.points = {}, this.hasValidPoints = !1, this.stack = s, this.leftCliff = 0, this.rightCliff = 0, this.alignOptions = { align: t.align || (r ? a ? "left" : "right" : "center"), verticalAlign: t.verticalAlign || (r ? "middle" : a ? "bottom" : "top"), y: t.y, x: t.x }, this.textAlign = t.textAlign || (r ? a ? "right" : "left" : "center");
        }
        destroy() {
          kp(this, this.axis);
        }
        render(h) {
          let t = this.axis.chart, e = this.options, i = e.format, s = i ? vp(i, this, t) : e.formatter.call(this);
          if (this.label) this.label.attr({ text: s, visibility: "hidden" });
          else {
            this.label = t.renderer.label(s, null, void 0, e.shape, void 0, void 0, e.useHTML, !1, "stack-labels");
            let r = { r: e.borderRadius || 0, text: s, padding: ys(e.padding, 5), visibility: "hidden" };
            t.styledMode || (r.fill = e.backgroundColor, r.stroke = e.borderColor, r["stroke-width"] = e.borderWidth, this.label.css(e.style || {})), this.label.attr(r), this.label.added || this.label.add(h);
          }
          this.label.labelrank = t.plotSizeY, ul(this, "afterRender");
        }
        setOffset(h, t, e, i, s, r) {
          let { alignOptions: o, axis: a, label: n, options: l, textAlign: c } = this, d = a.chart, u = this.getStackBox({ xOffset: h, width: t, boxBottom: e, boxTop: i, defaultX: s, xAxis: r }), { verticalAlign: p } = o;
          if (n && u) {
            let g = n.getBBox(void 0, 0), x = n.padding, y = ys(l.overflow, "justify") === "justify", m;
            o.x = l.x || 0, o.y = l.y || 0;
            let { x: v, y: w } = this.adjustStackPosition({ labelBox: g, verticalAlign: p, textAlign: c });
            u.x -= v, u.y -= w, n.align(o, !1, u), (m = d.isInsidePlot(n.alignAttr.x + o.x + v, n.alignAttr.y + o.y + w)) || (y = !1), y && wp.prototype.justifyDataLabel.call(a, n, o, n.alignAttr, g, u), n.attr({ x: n.alignAttr.x, y: n.alignAttr.y, rotation: l.rotation, rotationOriginX: g.width * zo(l.textAlign || "center"), rotationOriginY: g.height / 2 }), ys(!y && l.crop, !0) && (m = Fo(n.x) && Fo(n.y) && d.isInsidePlot(n.x - x + (n.width || 0), n.y) && d.isInsidePlot(n.x + x, n.y)), n[m ? "show" : "hide"]();
          }
          ul(this, "afterSetOffset", { xOffset: h, width: t });
        }
        adjustStackPosition({ labelBox: h, verticalAlign: t, textAlign: e }) {
          return { x: h.width / 2 + h.width / 2 * (2 * zo(e) - 1), y: h.height / 2 * 2 * (1 - zo(t)) };
        }
        getStackBox(h) {
          let t = this.axis, e = t.chart, { boxTop: i, defaultX: s, xOffset: r, width: o, boxBottom: a } = h, n = t.stacking.usePercentage ? 100 : ys(i, this.total, 0), l = t.toPixels(n), c = h.xAxis || e.xAxis[0], d = ys(s, c.translate(this.x)) + r, u = Math.abs(l - t.toPixels(a || Fo(t.min) && t.logarithmic && t.logarithmic.lin2log(t.min) || 0)), p = e.inverted, g = this.isNegative;
          return p ? { x: (g ? l : l - u) - e.plotLeft, y: c.height - d - o + c.top - e.plotTop, width: u, height: o } : { x: d + c.transB - e.plotLeft, y: (g ? l - u : l) - e.plotTop, width: o, height: u };
        }
      }, { getDeferredAnimation: Sp } = Xt, { series: { prototype: Mp } } = Lt, { addEvent: fl, correctFloat: xs, defined: gl, destroyObjectProperties: Cp, fireEvent: Tp, isNumber: Wo, objectEach: ui, pick: Ho } = V;
      function Ap() {
        let h = this.inverted;
        this.axes.forEach((t) => {
          var e;
          (e = t.stacking) != null && e.stacks && t.hasVisibleSeries && (t.stacking.oldStacks = t.stacking.stacks);
        }), this.series.forEach((t) => {
          var i;
          let e = ((i = t.xAxis) == null ? void 0 : i.options) || {};
          t.options.stacking && t.reserveSpace() && (t.stackKey = [t.type, Ho(t.options.stack, ""), h ? e.top : e.left, h ? e.height : e.width].join(","));
        });
      }
      function Op() {
        var t;
        let h = this.stacking;
        if (h) {
          let e = h.stacks;
          ui(e, (i, s) => {
            Cp(i), delete e[s];
          }), (t = h.stackTotalGroup) == null || t.destroy();
        }
      }
      function Pp() {
        this.stacking || (this.stacking = new Bp(this));
      }
      function Lp(h, t, e, i) {
        return !gl(h) || h.x !== t || i && h.stackKey !== i ? h = { x: t, index: 0, key: i, stackKey: i } : h.index++, h.key = [e, t, h.index].join(","), h;
      }
      function Ep() {
        let h, t = this, e = t.yAxis, i = t.stackKey || "", s = e.stacking.stacks, r = t.getColumn("x", !0), o = t.options.stacking, a = t[o + "Stacker"];
        a && [i, "-" + i].forEach((n) => {
          var p;
          let l = r.length, c, d, u;
          for (; l--; ) c = r[l], h = t.getStackIndicator(h, c, t.index, n), d = (p = s[n]) == null ? void 0 : p[c], (u = d == null ? void 0 : d.points[h.key || ""]) && a.call(t, u, d, l);
        });
      }
      function Ip(h, t, e) {
        let i = t.total ? 100 / t.total : 0;
        h[0] = xs(h[0] * i), h[1] = xs(h[1] * i), this.stackedYData[e] = h[1];
      }
      function Rp(h) {
        (this.is("column") || this.is("columnrange")) && (this.options.centerInCategory && this.chart.series.length > 1 ? Mp.setStackedPoints.call(this, h, "group") : h.stacking.resetStacks());
      }
      function Dp(h, t) {
        var A, L;
        let e, i, s, r, o, a, n, l = t || this.options.stacking;
        if (!l || !this.reserveSpace() || ({ group: "xAxis" }[l] || "yAxis") !== h.coll) return;
        let c = this.getColumn("x", !0), d = this.getColumn(this.pointValKey || "y", !0), u = [], p = d.length, g = this.options, x = g.threshold || 0, y = g.startFromThreshold ? x : 0, m = g.stack, v = t ? `${this.type},${l}` : this.stackKey || "", w = "-" + v, T = this.negStacks, S = h.stacking, M = S.stacks, P = S.oldStacks;
        for (S.stacksTouched += 1, n = 0; n < p; n++) {
          let R = c[n] || 0, D = d[n], N = Wo(D) && D || 0;
          a = (e = this.getStackIndicator(e, R, this.index)).key || "", M[o = (i = T && N < (y ? 0 : x)) ? w : v] || (M[o] = {}), M[o][R] || ((A = P[o]) != null && A[R] ? (M[o][R] = P[o][R], M[o][R].total = null) : M[o][R] = new pl(h, h.options.stackLabels, !!i, R, m)), s = M[o][R], D !== null ? (s.points[a] = s.points[this.index] = [Ho(s.cumulative, y)], gl(s.cumulative) || (s.base = a), s.touched = S.stacksTouched, e.index > 0 && this.singleStacks === !1 && (s.points[a][0] = s.points[this.index + "," + R + ",0"][0])) : (delete s.points[a], delete s.points[this.index]);
          let B = s.total || 0;
          l === "percent" ? (r = i ? v : w, B = T && ((L = M[r]) != null && L[R]) ? (r = M[r][R]).total = Math.max(r.total || 0, B) + Math.abs(N) : xs(B + Math.abs(N))) : l === "group" ? Wo(D) && B++ : B = xs(B + N), l === "group" ? s.cumulative = (B || 1) - 1 : s.cumulative = xs(Ho(s.cumulative, y) + N), s.total = B, D !== null && (s.points[a].push(s.cumulative), u[n] = s.cumulative, s.hasValidPoints = !0);
        }
        l === "percent" && (S.usePercentage = !0), l !== "group" && (this.stackedYData = u), S.oldStacks = {};
      }
      class Bp {
        constructor(t) {
          this.oldStacks = {}, this.stacks = {}, this.stacksTouched = 0, this.axis = t;
        }
        buildStacks() {
          let t, e, i = this.axis, s = i.series, r = i.coll === "xAxis", o = i.options.reversedStacks, a = s.length;
          for (this.resetStacks(), this.usePercentage = !1, e = a; e--; ) t = s[o ? e : a - e - 1], r && t.setGroupedPoints(i), t.setStackedPoints(i);
          if (!r) for (e = 0; e < a; e++) s[e].modifyStacks();
          Tp(i, "afterBuildStacks");
        }
        cleanStacks() {
          this.oldStacks && (this.stacks = this.oldStacks, ui(this.stacks, (t) => {
            ui(t, (e) => {
              e.cumulative = e.total;
            });
          }));
        }
        resetStacks() {
          ui(this.stacks, (t) => {
            ui(t, (e, i) => {
              Wo(e.touched) && e.touched < this.stacksTouched ? (e.destroy(), delete t[i]) : (e.total = null, e.cumulative = null);
            });
          });
        }
        renderStackTotals() {
          var a;
          let t = this.axis, e = t.chart, i = e.renderer, s = this.stacks, r = Sp(e, ((a = t.options.stackLabels) == null ? void 0 : a.animation) || !1), o = this.stackTotalGroup = this.stackTotalGroup || i.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add();
          o.translate(e.plotLeft, e.plotTop), ui(s, (n) => {
            ui(n, (l) => {
              l.render(o);
            });
          }), o.animate({ opacity: 1 }, r);
        }
      }
      (J || (J = {})).compose = function(h, t, e) {
        let i = t.prototype, s = e.prototype;
        i.getStacks || (fl(h, "init", Pp), fl(h, "destroy", Op), i.getStacks = Ap, s.getStackIndicator = Lp, s.modifyStacks = Ep, s.percentStacker = Ip, s.setGroupedPoints = Rp, s.setStackedPoints = Dp);
      };
      let Np = J, { defined: zp, merge: ml, isObject: Fp } = V;
      class yl extends ie {
        drawGraph() {
          let t = this.options, e = (this.gappedPath || this.getGraphPath).call(this), i = this.chart.styledMode;
          [this, ...this.zones].forEach((s, r) => {
            let o, a = s.graph, n = a ? "animate" : "attr", l = s.dashStyle || t.dashStyle;
            a ? (a.endX = this.preventGraphAnimation ? null : e.xMap, a.animate({ d: e })) : e.length && (s.graph = a = this.chart.renderer.path(e).addClass("highcharts-graph" + (r ? ` highcharts-zone-graph-${r - 1} ` : " ") + (r && s.className || "")).attr({ zIndex: 1 }).add(this.group)), a && !i && (o = { stroke: !r && t.lineColor || s.color || this.color || "#cccccc", "stroke-width": t.lineWidth || 0, fill: this.fillGraph && this.color || "none" }, l ? o.dashstyle = l : t.linecap !== "square" && (o["stroke-linecap"] = o["stroke-linejoin"] = "round"), a[n](o).shadow(t.shadow && ml({ filterUnits: "userSpaceOnUse" }, Fp(t.shadow) ? t.shadow : {}))), a && (a.startX = e.xMap, a.isArea = e.isArea);
          });
        }
        getGraphPath(t, e, i) {
          let s = this, r = s.options, o = [], a = [], n, l = r.step, c = (t = t || s.points).reversed;
          return c && t.reverse(), (l = { right: 1, center: 2 }[l] || l && 3) && c && (l = 4 - l), (t = this.getValidPoints(t, !1, r.nullInteraction || !(r.connectNulls && !e && !i))).forEach(function(d, u) {
            let p, g = d.plotX, x = d.plotY, y = t[u - 1], m = d.isNull || typeof x != "number";
            (d.leftCliff || y != null && y.rightCliff) && !i && (n = !0), m && !zp(e) && u > 0 ? n = !r.connectNulls : m && !e ? n = !0 : (u === 0 || n ? p = [["M", d.plotX, d.plotY]] : s.getPointSpline ? p = [s.getPointSpline(t, d, u)] : l ? (p = l === 1 ? [["L", y.plotX, x]] : l === 2 ? [["L", (y.plotX + g) / 2, y.plotY], ["L", (y.plotX + g) / 2, x]] : [["L", g, y.plotY]]).push(["L", g, x]) : p = [["L", g, x]], a.push(d.x), l && (a.push(d.x), l === 2 && a.push(d.x)), o.push.apply(o, p), n = !1);
          }), o.xMap = a, s.graphPath = o, o;
        }
      }
      yl.defaultOptions = ml(ie.defaultOptions, { legendSymbol: "lineMarker" }), Lt.registerSeriesType("line", yl);
      let { seriesTypes: { line: jo } } = Lt, { extend: Wp, merge: Hp, objectEach: jp, pick: gr } = V;
      class Xo extends jo {
        drawGraph() {
          this.areaPath = [], super.drawGraph.apply(this);
          let { areaPath: t, options: e } = this;
          [this, ...this.zones].forEach((i, s) => {
            let r = {}, o = i.fillColor || e.fillColor, a = i.area, n = a ? "animate" : "attr";
            a ? (a.endX = this.preventGraphAnimation ? null : t.xMap, a.animate({ d: t })) : (r.zIndex = 0, (a = i.area = this.chart.renderer.path(t).addClass("highcharts-area" + (s ? ` highcharts-zone-area-${s - 1} ` : " ") + (s && i.className || "")).add(this.group)).isArea = !0), this.chart.styledMode || (r.fill = o || i.color || this.color, r["fill-opacity"] = o ? 1 : e.fillOpacity ?? 0.75, a.css({ pointerEvents: this.stickyTracking ? "none" : "auto" })), a[n](r), a.startX = t.xMap, a.shiftUnit = e.step ? 2 : 1;
          });
        }
        getGraphPath(t) {
          let e, i, s, r = jo.prototype.getGraphPath, o = this.options, a = o.stacking, n = this.yAxis, l = [], c = [], d = this.index, u = n.stacking.stacks[this.stackKey], p = o.threshold, g = Math.round(n.getThreshold(o.threshold)), x = gr(o.connectNulls, a === "percent"), y = function(M, P, A) {
            let L = t[M], R = a && u[L.x].points[d], D = L[A + "Null"] || 0, N = L[A + "Cliff"] || 0, B, X, j = !0;
            N || D ? (B = (D ? R[0] : R[1]) + N, X = R[0] + N, j = !!D) : !a && t[P] && t[P].isNull && (B = X = p), B !== void 0 && (c.push({ plotX: e, plotY: B === null ? g : n.getThreshold(B), isNull: j, isCliff: !0 }), l.push({ plotX: e, plotY: X === null ? g : n.getThreshold(X), doCurve: !1 }));
          };
          t = t || this.points, a && (t = this.getStackPoints(t));
          for (let M = 0, P = t.length; M < P; ++M) a || (t[M].leftCliff = t[M].rightCliff = t[M].leftNull = t[M].rightNull = void 0), i = t[M].isNull, e = gr(t[M].rectPlotX, t[M].plotX), s = a ? gr(t[M].yBottom, g) : g, i && !x || (x || y(M, M - 1, "left"), i && !a && x || (c.push(t[M]), l.push({ x: M, plotX: e, plotY: s })), x || y(M, M + 1, "right"));
          let m = r.call(this, c, !0, !0);
          l.reversed = !0;
          let v = r.call(this, l, !0, !0), w = v[0];
          w && w[0] === "M" && (v[0] = ["L", w[1], w[2]]);
          let T = m.concat(v);
          T.length && T.push(["Z"]);
          let S = r.call(this, c, !1, x);
          return this.chart.series.length > 1 && a && c.some((M) => M.isCliff) && (T.hasStackedCliffs = S.hasStackedCliffs = !0), T.xMap = m.xMap, this.areaPath = T, S;
        }
        getStackPoints(t) {
          let e = this, i = [], s = [], r = this.xAxis, o = this.yAxis, a = o.stacking.stacks[this.stackKey], n = {}, l = o.series, c = l.length, d = o.options.reversedStacks ? 1 : -1, u = l.indexOf(e);
          if (t = t || this.points, this.options.stacking) {
            for (let g = 0; g < t.length; g++) t[g].leftNull = t[g].rightNull = void 0, n[t[g].x] = t[g];
            jp(a, function(g, x) {
              g.total !== null && s.push(x);
            }), s.sort(function(g, x) {
              return g - x;
            });
            let p = l.map((g) => g.visible);
            s.forEach(function(g, x) {
              let y = 0, m, v;
              if (n[g] && !n[g].isNull) i.push(n[g]), [-1, 1].forEach(function(w) {
                let T = w === 1 ? "rightNull" : "leftNull", S = a[s[x + w]], M = 0;
                if (S) {
                  let P = u;
                  for (; P >= 0 && P < c; ) {
                    let A = l[P].index;
                    !(m = S.points[A]) && (A === e.index ? n[g][T] = !0 : p[P] && (v = a[g].points[A]) && (M -= v[1] - v[0])), P += d;
                  }
                }
                n[g][w === 1 ? "rightCliff" : "leftCliff"] = M;
              });
              else {
                let w = u;
                for (; w >= 0 && w < c; ) {
                  let T = l[w].index;
                  if (m = a[g].points[T]) {
                    y = m[1];
                    break;
                  }
                  w += d;
                }
                y = gr(y, 0), y = o.translate(y, 0, 1, 0, 1), i.push({ isNull: !0, plotX: r.translate(g, 0, 0, 0, 1), x: g, plotY: y, yBottom: y });
              }
            });
          }
          return i;
        }
      }
      Xo.defaultOptions = Hp(jo.defaultOptions, { threshold: 0, legendSymbol: "areaMarker" }), Wp(Xo.prototype, { singleStacks: !1 }), Lt.registerSeriesType("area", Xo);
      let { line: xl } = Lt.seriesTypes, { merge: Xp, pick: mr } = V;
      class Go extends xl {
        getPointSpline(t, e, i) {
          let s, r, o, a, n = e.plotX || 0, l = e.plotY || 0, c = t[i - 1], d = t[i + 1];
          function u(g) {
            return g && !g.isNull && g.doCurve !== !1 && !e.isCliff;
          }
          if (u(c) && u(d)) {
            let g = c.plotX || 0, x = c.plotY || 0, y = d.plotX || 0, m = d.plotY || 0, v = 0;
            s = (1.5 * n + g) / 2.5, r = (1.5 * l + x) / 2.5, o = (1.5 * n + y) / 2.5, a = (1.5 * l + m) / 2.5, o !== s && (v = (a - r) * (o - n) / (o - s) + l - a), r += v, a += v, r > x && r > l ? (r = Math.max(x, l), a = 2 * l - r) : r < x && r < l && (r = Math.min(x, l), a = 2 * l - r), a > m && a > l ? (a = Math.max(m, l), r = 2 * l - a) : a < m && a < l && (a = Math.min(m, l), r = 2 * l - a), e.rightContX = o, e.rightContY = a, e.controlPoints = { low: [s, r], high: [o, a] };
          }
          let p = ["C", mr(c.rightContX, c.plotX, 0), mr(c.rightContY, c.plotY, 0), mr(s, n, 0), mr(r, l, 0), n, l];
          return c.rightContX = c.rightContY = void 0, p;
        }
      }
      Go.defaultOptions = Xp(xl.defaultOptions), Lt.registerSeriesType("spline", Go);
      let bl = Go, { area: Gp, area: { prototype: Yo } } = Lt.seriesTypes, { extend: Yp, merge: Up } = V;
      class Uo extends bl {
      }
      Uo.defaultOptions = Up(bl.defaultOptions, Gp.defaultOptions), Yp(Uo.prototype, { getGraphPath: Yo.getGraphPath, getStackPoints: Yo.getStackPoints, drawGraph: Yo.drawGraph }), Lt.registerSeriesType("areaspline", Uo);
      let { animObject: qp } = Xt, { parse: $p } = At, { noop: Vp } = E, { clamp: yr, crisp: xr, defined: vl, extend: wl, fireEvent: kl, isArray: Sl, isNumber: br, merge: qo, pick: bs, objectEach: Kp } = V;
      class vr extends ie {
        animate(t) {
          let e, i, s = this, r = this.yAxis, o = r.pos, a = r.reversed, n = s.options, { clipOffset: l, inverted: c } = this.chart, d = {}, u = c ? "translateX" : "translateY";
          t && l ? (d.scaleY = 1e-3, i = yr(r.toPixels(n.threshold || 0), o, o + r.len), c ? d.translateX = (i += a ? -Math.floor(l[0]) : Math.ceil(l[2])) - r.len : d.translateY = i += a ? Math.ceil(l[0]) : -Math.floor(l[2]), s.clipBox && s.setClip(), s.group.attr(d)) : (e = Number(s.group.attr(u)), s.group.animate({ scaleY: 1 }, wl(qp(s.options.animation), { step: function(p, g) {
            s.group && (d[u] = e + g.pos * (o - e), s.group.attr(d));
          } })));
        }
        init(t, e) {
          super.init.apply(this, arguments);
          let i = this;
          (t = i.chart).hasRendered && t.series.forEach(function(s) {
            s.type === i.type && (s.isDirty = !0);
          });
        }
        getColumnMetrics() {
          var x, y;
          let t = this, e = t.options, i = t.xAxis, s = t.yAxis, r = i.options.reversedStacks, o = i.reversed && !r || !i.reversed && r, a = {}, n, l = 0;
          e.grouping === !1 ? l = 1 : t.chart.series.forEach(function(m) {
            let v, w = m.yAxis, T = m.options;
            m.type === t.type && m.reserveSpace() && s.len === w.len && s.pos === w.pos && (T.stacking && T.stacking !== "group" ? (a[n = m.stackKey] === void 0 && (a[n] = l++), v = a[n]) : T.grouping !== !1 && (v = l++), m.columnIndex = v);
          });
          let c = Math.min(Math.abs(i.transA) * (!((x = i.brokenAxis) != null && x.hasBreaks) && ((y = i.ordinal) == null ? void 0 : y.slope) || e.pointRange || i.closestPointRange || i.tickInterval || 1), i.len), d = c * e.groupPadding, u = (c - 2 * d) / (l || 1), p = Math.min(e.maxPointWidth || i.len, bs(e.pointWidth, u * (1 - 2 * e.pointPadding))), g = (t.columnIndex || 0) + +!!o;
          return t.columnMetrics = { width: p, offset: (u - p) / 2 + (d + g * u - c / 2) * (o ? -1 : 1), paddedWidth: u, columnCount: l }, t.columnMetrics;
        }
        crispCol(t, e, i, s) {
          let r = this.borderWidth, o = this.chart.inverted;
          return s = xr(e + s, r, o) - (e = xr(e, r, o)), this.options.crisp && (i = xr(t + i, r) - (t = xr(t, r))), { x: t, y: e, width: i, height: s };
        }
        adjustForMissingColumns(t, e, i, s) {
          var r;
          if (!i.isNull && s.columnCount > 1) {
            let o = this.xAxis.series.filter((c) => c.visible).map((c) => c.index), a = 0, n = 0;
            Kp((r = this.xAxis.stacking) == null ? void 0 : r.stacks, (c) => {
              var g;
              let d = typeof i.x == "number" ? (g = c[i.x.toString()]) == null ? void 0 : g.points : void 0, u = d == null ? void 0 : d[this.index], p = {};
              if (d && Sl(u)) {
                let x = this.index, y = Object.keys(d).filter((m) => !m.match(",") && d[m] && d[m].length > 1).map(parseFloat).filter((m) => o.indexOf(m) !== -1).filter((m) => {
                  let v = this.chart.series[m].options, w = v.stacking && v.stack;
                  if (vl(w)) {
                    if (br(p[w])) return x === m && (x = p[w]), !1;
                    p[w] = m;
                  }
                  return !0;
                }).sort((m, v) => v - m);
                a = y.indexOf(x), n = y.length;
              }
            }), a = this.xAxis.reversed ? n - 1 - a : a;
            let l = (n - 1) * s.paddedWidth + e;
            t = (i.plotX || 0) + l / 2 - e - a * s.paddedWidth;
          }
          return t;
        }
        translate() {
          let t = this, e = t.chart, i = t.options, s = t.dense = t.closestPointRange * t.xAxis.transA < 2, r = t.borderWidth = bs(i.borderWidth, +!s), o = t.xAxis, a = t.yAxis, n = i.threshold, l = bs(i.minPointLength, 5), c = t.getColumnMetrics(), d = c.width, u = t.pointXOffset = c.offset, p = t.dataMin, g = t.dataMax, x = t.translatedThreshold = a.getThreshold(n), y = t.barW = Math.max(d, 1 + 2 * r);
          i.pointPadding && i.crisp && (y = Math.ceil(y)), ie.prototype.translate.apply(t), t.points.forEach(function(m) {
            let v = bs(m.yBottom, x), w = 999 + Math.abs(v), T = m.plotX || 0, S = yr(m.plotY, -w, a.len + w), M, P = Math.min(S, v), A = Math.max(S, v) - P, L = d, R = T + u, D = y;
            l && Math.abs(A) < l && (A = l, M = !a.reversed && !m.negative || a.reversed && m.negative, br(n) && br(g) && m.y === n && g <= n && (a.min || 0) < n && (p !== g || (a.max || 0) <= n) && (M = !M, m.negative = !m.negative), P = Math.abs(P - x) > l ? v - l : x - (M ? l : 0)), vl(m.options.pointWidth) && (R -= Math.round(((L = D = Math.ceil(m.options.pointWidth)) - d) / 2)), i.centerInCategory && (R = t.adjustForMissingColumns(R, L, m, c)), m.barX = R, m.pointWidth = L, m.tooltipPos = e.inverted ? [yr(a.len + a.pos - e.plotLeft - S, a.pos - e.plotLeft, a.len + a.pos - e.plotLeft), o.len + o.pos - e.plotTop - R - D / 2, A] : [o.left - e.plotLeft + R + D / 2, yr(S + a.pos - e.plotTop, a.pos - e.plotTop, a.len + a.pos - e.plotTop), A], m.shapeType = t.pointClass.prototype.shapeType || "roundedRect", m.shapeArgs = t.crispCol(R, P, D, m.isNull ? 0 : A);
          }), kl(this, "afterColumnTranslate");
        }
        drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
        }
        pointAttribs(t, e) {
          let i = this.options, s = this.pointAttrToOptions || {}, r = s.stroke || "borderColor", o = s["stroke-width"] || "borderWidth", a, n, l, c = t && t.color || this.color, d = t && t[r] || i[r] || c, u = t && t.options.dashStyle || i.dashStyle, p = t && t[o] || i[o] || this[o] || 0, g = t != null && t.isNull && i.nullInteraction ? 0 : (t == null ? void 0 : t.opacity) ?? i.opacity ?? 1;
          t && this.zones.length && (n = t.getZone(), c = t.options.color || n && (n.color || t.nonZonedColor) || this.color, n && (d = n.borderColor || d, u = n.dashStyle || u, p = n.borderWidth || p)), e && t && (l = (a = qo(i.states[e], t.options.states && t.options.states[e] || {})).brightness, c = a.color || l !== void 0 && $p(c).brighten(a.brightness).get() || c, d = a[r] || d, p = a[o] || p, u = a.dashStyle || u, g = bs(a.opacity, g));
          let x = { fill: c, stroke: d, "stroke-width": p, opacity: g };
          return u && (x.dashstyle = u), x;
        }
        drawPoints(t = this.points) {
          let e, i = this, s = this.chart, r = i.options, o = r.nullInteraction, a = s.renderer, n = r.animationLimit || 250;
          t.forEach(function(l) {
            let c = l.plotY, d = l.graphic, u = !!d, p = d && s.pointCount < n ? "animate" : "attr";
            br(c) && (l.y !== null || o) ? (e = l.shapeArgs, d && l.hasNewShapeType() && (d = d.destroy()), i.enabledDataSorting && (l.startXPos = i.xAxis.reversed ? -(e && e.width || 0) : i.xAxis.width), !d && (l.graphic = d = a[l.shapeType](e).add(l.group || i.group), d && i.enabledDataSorting && s.hasRendered && s.pointCount < n && (d.attr({ x: l.startXPos }), u = !0, p = "animate")), d && u && d[p](qo(e)), s.styledMode || d[p](i.pointAttribs(l, l.selected && "select")).shadow(l.allowShadow !== !1 && r.shadow), d && (d.addClass(l.getClassName(), !0), d.attr({ visibility: l.visible ? "inherit" : "hidden" }))) : d && (l.graphic = d.destroy());
          });
        }
        drawTracker(t = this.points) {
          let e, i = this, s = i.chart, r = s.pointer, o = function(a) {
            r == null || r.normalize(a);
            let n = r == null ? void 0 : r.getPointFromEvent(a);
            r && n && i.options.enableMouseTracking && (s.isInsidePlot(a.chartX - s.plotLeft, a.chartY - s.plotTop, { visiblePlotOnly: !0 }) || r != null && r.inClass(a.target, "highcharts-data-label")) && (r.isDirectTouch = !0, n.onMouseOver(a));
          };
          t.forEach(function(a) {
            e = Sl(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [], a.graphic && (a.graphic.element.point = a), e.forEach(function(n) {
              (n.div || n.element).point = a;
            });
          }), i._hasTracking || (i.trackerGroups.forEach(function(a) {
            i[a] && (i[a].addClass("highcharts-tracker").on("mouseover", o).on("mouseout", function(n) {
              r == null || r.onTrackerMouseOut(n);
            }).on("touchstart", o), !s.styledMode && i.options.cursor && i[a].css({ cursor: i.options.cursor }));
          }), i._hasTracking = !0), kl(this, "afterDrawTracker");
        }
        remove() {
          let t = this, e = t.chart;
          e.hasRendered && e.series.forEach(function(i) {
            i.type === t.type && (i.isDirty = !0);
          }), ie.prototype.remove.apply(t, arguments);
        }
      }
      vr.defaultOptions = qo(ie.defaultOptions, { borderRadius: 3, centerInCategory: !1, groupPadding: 0.2, marker: null, pointPadding: 0.1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }), wl(vr.prototype, { directTouch: !0, getSymbol: Vp, negStacks: !0, trackerGroups: ["group", "dataLabelsGroup"] }), Lt.registerSeriesType("column", vr);
      let wr = vr, { getDeferredAnimation: Qp } = Xt, { format: _p } = oe, { defined: pi, extend: Ml, fireEvent: $o, getAlignFactor: Cl, isArray: $e, isString: vs, merge: ws, objectEach: Zp, pick: ks, pInt: Jp, splat: Tl } = V;
      (function(h) {
        function t() {
          return n(this).some((c) => c == null ? void 0 : c.enabled);
        }
        function e(c, d, u, p, g) {
          var R;
          let { chart: x, enabledDataSorting: y } = this, m = this.isCartesian && x.inverted, v = c.plotX, w = c.plotY, T = u.rotation || 0, S = pi(v) && pi(w) && x.isInsidePlot(v, Math.round(w), { inverted: m, paneCoordinates: !0, series: this }), M = T === 0 && ks(u.overflow, y ? "none" : "justify") === "justify", P = this.visible && c.visible !== !1 && pi(v) && (c.series.forceDL || y && !M || S || ks(u.inside, !!this.options.stacking) && p && x.isInsidePlot(v, m ? p.x + 1 : p.y + p.height - 1, { inverted: m, paneCoordinates: !0, series: this })), A = c.pos();
          if (P && A) {
            var L;
            let D = d.getBBox(), N = d.getBBox(void 0, 0);
            if (p = Ml({ x: A[0], y: Math.round(A[1]), width: 0, height: 0 }, p || {}), u.alignTo === "plotEdges" && this.isCartesian && (p[m ? "x" : "y"] = 0, p[m ? "width" : "height"] = ((R = this.yAxis) == null ? void 0 : R.len) || 0), Ml(u, { width: D.width, height: D.height }), L = p, y && this.xAxis && !M && this.setDataLabelStartPos(c, d, g, S, L), d.align(ws(u, { width: N.width, height: N.height }), !1, p, !1), d.alignAttr.x += Cl(u.align) * (N.width - D.width), d.alignAttr.y += Cl(u.verticalAlign) * (N.height - D.height), d[d.placed ? "animate" : "attr"]({ "text-align": d.alignAttr["text-align"] || "center", x: d.alignAttr.x + (D.width - N.width) / 2, y: d.alignAttr.y + (D.height - N.height) / 2, rotationOriginX: (d.width || 0) / 2, rotationOriginY: (d.height || 0) / 2 }), M && p.height >= 0) this.justifyDataLabel(d, u, d.alignAttr, D, p, g);
            else if (ks(u.crop, !0)) {
              let { x: B, y: X } = d.alignAttr;
              P = x.isInsidePlot(B, X, { paneCoordinates: !0, series: this }) && x.isInsidePlot(B + D.width - 1, X + D.height - 1, { paneCoordinates: !0, series: this });
            }
            u.shape && !T && d[g ? "attr" : "animate"]({ anchorX: A[0], anchorY: A[1] });
          }
          g && y && (d.placed = !1), P || y && !M ? (d.show(), d.placed = !0) : (d.hide(), d.placed = !1);
        }
        function i() {
          return this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", this.options.dataLabels.zIndex || 6);
        }
        function s(c) {
          let d = this.hasRendered || 0, u = this.initDataLabelsGroup().attr({ opacity: +d });
          return !d && u && (this.visible && u.show(), this.options.animation ? u.animate({ opacity: 1 }, c) : u.attr({ opacity: 1 })), u;
        }
        function r(c) {
          var P;
          let d;
          c = c || this.points;
          let u = this, p = u.chart, g = u.options, x = p.renderer, { backgroundColor: y, plotBackgroundColor: m } = p.options.chart, v = x.getContrast(vs(m) && m || vs(y) && y || "#000000"), w = n(u), { animation: T, defer: S } = w[0], M = S ? Qp(p, T, u) : { defer: 0, duration: 0 };
          $o(this, "drawDataLabels"), (P = u.hasDataLabels) != null && P.call(u) && (d = this.initDataLabels(M), c.forEach((A) => {
            var N, B, X;
            let L = A.dataLabels || [], R = A.color || u.color;
            Tl(a(w, A.dlOptions || ((N = A.options) == null ? void 0 : N.dataLabels))).forEach((j, it) => {
              var Mt;
              let G = j.enabled && (A.visible || A.dataLabelOnHidden) && (!A.isNull || A.dataLabelOnNull) && function(Ft, Ie) {
                let le = Ie.filter;
                if (le) {
                  let he = le.operator, Qt = Ft[le.property], Nt = le.value;
                  return he === ">" && Qt > Nt || he === "<" && Qt < Nt || he === ">=" && Qt >= Nt || he === "<=" && Qt <= Nt || he === "==" && Qt == Nt || he === "===" && Qt === Nt || he === "!=" && Qt != Nt || he === "!==" && Qt !== Nt || !1;
                }
                return !0;
              }(A, j), { backgroundColor: et, borderColor: ct, distance: dt, style: pt = {} } = j, Yt, ut, bt, ot = {}, Q = L[it], Rt = !Q, vt;
              G && (ut = pi(Yt = ks(j[A.formatPrefix + "Format"], j.format)) ? _p(Yt, A, p) : (j[A.formatPrefix + "Formatter"] || j.formatter).call(A, j), bt = j.rotation, !p.styledMode && (pt.color = ks(j.color, pt.color, vs(u.color) ? u.color : void 0, "#000000"), pt.color === "contrast" ? (et !== "none" && (vt = et), A.contrastColor = x.getContrast(vt !== "auto" && vs(vt) && vt || (vs(R) ? R : "")), pt.color = vt || !pi(dt) && j.inside || 0 > Jp(dt || 0) || g.stacking ? A.contrastColor : v) : delete A.contrastColor, g.cursor && (pt.cursor = g.cursor)), ot = { r: j.borderRadius || 0, rotation: bt, padding: j.padding, zIndex: 1 }, p.styledMode || (ot.fill = et === "auto" ? A.color : et, ot.stroke = ct === "auto" ? A.color : ct, ot["stroke-width"] = j.borderWidth), Zp(ot, (Ft, Ie) => {
                Ft === void 0 && delete ot[Ie];
              })), !Q || G && pi(ut) && !!(Q.div || (Mt = Q.text) != null && Mt.foreignObject) == !!j.useHTML && (Q.rotation && j.rotation || Q.rotation === j.rotation) || (Q = void 0, Rt = !0), G && pi(ut) && (Q ? ot.text = ut : (Q = x.label(ut, 0, 0, j.shape, void 0, void 0, j.useHTML, void 0, "data-label")).addClass(" highcharts-data-label-color-" + A.colorIndex + " " + (j.className || "") + (j.useHTML ? " highcharts-tracker" : "")), Q && (Q.options = j, Q.attr(ot), p.styledMode ? pt.width && Q.css({ width: pt.width, textOverflow: pt.textOverflow, whiteSpace: pt.whiteSpace }) : Q.css(pt).shadow(j.shadow), $o(Q, "beforeAddingDataLabel", { labelOptions: j, point: A }), Q.added || Q.add(d), u.alignDataLabel(A, Q, j, void 0, Rt), Q.isActive = !0, L[it] && L[it] !== Q && L[it].destroy(), L[it] = Q));
            });
            let D = L.length;
            for (; D--; ) (B = L[D]) != null && B.isActive ? L[D].isActive = !1 : ((X = L[D]) == null || X.destroy(), L.splice(D, 1));
            A.dataLabel = L[0], A.dataLabels = L;
          })), $o(this, "afterDrawDataLabels");
        }
        function o(c, d, u, p, g, x) {
          let y = this.chart, m = d.align, v = d.verticalAlign, w = c.box ? 0 : c.padding || 0, T = y.inverted ? this.yAxis : this.xAxis, S = T ? T.left - y.plotLeft : 0, M = y.inverted ? this.xAxis : this.yAxis, P = M ? M.top - y.plotTop : 0, { x: A = 0, y: L = 0 } = d, R, D;
          return (R = (u.x || 0) + w + S) < 0 && (m === "right" && A >= 0 ? (d.align = "left", d.inside = !0) : A -= R, D = !0), (R = (u.x || 0) + p.width - w + S) > y.plotWidth && (m === "left" && A <= 0 ? (d.align = "right", d.inside = !0) : A += y.plotWidth - R, D = !0), (R = u.y + w + P) < 0 && (v === "bottom" && L >= 0 ? (d.verticalAlign = "top", d.inside = !0) : L -= R, D = !0), (R = (u.y || 0) + p.height - w + P) > y.plotHeight && (v === "top" && L <= 0 ? (d.verticalAlign = "bottom", d.inside = !0) : L += y.plotHeight - R, D = !0), D && (d.x = A, d.y = L, c.placed = !x, c.align(d, void 0, g)), D;
        }
        function a(c, d) {
          let u = [], p;
          if ($e(c) && !$e(d)) u = c.map(function(g) {
            return ws(g, d);
          });
          else if ($e(d) && !$e(c)) u = d.map(function(g) {
            return ws(c, g);
          });
          else if ($e(c) || $e(d)) {
            if ($e(c) && $e(d)) for (p = Math.max(c.length, d.length); p--; ) u[p] = ws(c[p], d[p]);
          } else u = ws(c, d);
          return u;
        }
        function n(c) {
          var u, p;
          let d = c.chart.options.plotOptions;
          return Tl(a(a((u = d == null ? void 0 : d.series) == null ? void 0 : u.dataLabels, (p = d == null ? void 0 : d[c.type]) == null ? void 0 : p.dataLabels), c.options.dataLabels));
        }
        function l(c, d, u, p, g) {
          let x = this.chart, y = x.inverted, m = this.xAxis, v = m.reversed, w = ((y ? d.height : d.width) || 0) / 2, T = c.pointWidth, S = T ? T / 2 : 0;
          d.startXPos = y ? g.x : v ? -w - S : m.width - w + S, d.startYPos = y ? v ? this.yAxis.height - w + S : -w - S : g.y, p ? d.visibility === "hidden" && (d.show(), d.attr({ opacity: 0 }).animate({ opacity: 1 })) : d.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, d.hide), x.hasRendered && (u && d.attr({ x: d.startXPos, y: d.startYPos }), d.placed = !0);
        }
        h.compose = function(c) {
          let d = c.prototype;
          d.initDataLabels || (d.initDataLabels = s, d.initDataLabelsGroup = i, d.alignDataLabel = e, d.drawDataLabels = r, d.justifyDataLabel = o, d.mergeArrays = a, d.setDataLabelStartPos = l, d.hasDataLabels = t);
        };
      })(_ || (_ = {}));
      let kr = _, { composed: tf } = E, { series: Al } = Lt, { merge: ef, pushUnique: sf } = V;
      (function(h) {
        function t(e, i, s, r, o) {
          var x, y;
          let { chart: a, options: n } = this, l = a.inverted, c = ((x = this.xAxis) == null ? void 0 : x.len) || a.plotSizeX || 0, d = ((y = this.yAxis) == null ? void 0 : y.len) || a.plotSizeY || 0, u = e.dlBox || e.shapeArgs, p = e.below ?? (e.plotY || 0) > (this.translatedThreshold ?? d), g = s.inside ?? !!n.stacking;
          if (u) {
            if (r = ef(u), s.overflow !== "allow" || s.crop !== !1 || n.clip !== !1) {
              r.y < 0 && (r.height += r.y, r.y = 0);
              let m = r.y + r.height - d;
              m > 0 && m < r.height - 1 && (r.height -= m);
            }
            l && (r = { x: d - r.y - r.height, y: c - r.x - r.width, width: r.height, height: r.width }), g || (l ? (r.x += p ? 0 : r.width, r.width = 0) : (r.y += p ? r.height : 0, r.height = 0));
          }
          s.align ?? (s.align = !l || g ? "center" : p ? "right" : "left"), s.verticalAlign ?? (s.verticalAlign = l || g ? "middle" : p ? "top" : "bottom"), Al.prototype.alignDataLabel.call(this, e, i, s, r, o), s.inside && e.contrastColor && i.css({ color: e.contrastColor });
        }
        h.compose = function(e) {
          kr.compose(Al), sf(tf, "ColumnDataLabel") && (e.prototype.alignDataLabel = t);
        };
      })(ft || (ft = {}));
      let rf = ft, { extend: of, merge: af } = V;
      class Vo extends wr {
      }
      Vo.defaultOptions = af(wr.defaultOptions, {}), of(Vo.prototype, { inverted: !0 }), Lt.registerSeriesType("bar", Vo);
      let { column: nf, line: Ol } = Lt.seriesTypes, { addEvent: lf, extend: hf, merge: df } = V;
      class Sr extends Ol {
        applyJitter() {
          let t = this, e = this.options.jitter, i = this.points.length;
          e && this.points.forEach(function(s, r) {
            ["x", "y"].forEach(function(o, a) {
              if (e[o] && !s.isNull) {
                let n = `plot${o.toUpperCase()}`, l = t[`${o}Axis`], c = e[o] * l.transA;
                if (l && !l.logarithmic) {
                  let d = Math.max(0, (s[n] || 0) - c), u = Math.min(l.len, (s[n] || 0) + c);
                  s[n] = d + (u - d) * function(p) {
                    let g = 1e4 * Math.sin(p);
                    return g - Math.floor(g);
                  }(r + a * i), o === "x" && (s.clientX = s.plotX);
                }
              }
            });
          });
        }
        drawGraph() {
          this.options.lineWidth ? super.drawGraph() : this.graph && (this.graph = this.graph.destroy());
        }
      }
      Sr.defaultOptions = df(Ol.defaultOptions, { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 }, tooltip: { headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.8em"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } }), hf(Sr.prototype, { drawTracker: nf.prototype.drawTracker, sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"] }), lf(Sr, "afterTranslate", function() {
        this.applyJitter();
      }), Lt.registerSeriesType("scatter", Sr);
      let { deg2rad: Pl } = E, { fireEvent: cf, isNumber: Ko, pick: Mr, relativeLength: uf } = V;
      (function(h) {
        h.getCenter = function() {
          let t = this.options, e = this.chart, i = 2 * (t.slicedOffset || 0), s = e.plotWidth - 2 * i, r = e.plotHeight - 2 * i, o = t.center, a = Math.min(s, r), n = t.thickness, l, c = t.size, d = t.innerSize || 0, u, p;
          typeof c == "string" && (c = parseFloat(c)), typeof d == "string" && (d = parseFloat(d));
          let g = [Mr(o == null ? void 0 : o[0], "50%"), Mr(o == null ? void 0 : o[1], "50%"), Mr(c && c < 0 ? void 0 : t.size, "100%"), Mr(d && d < 0 ? void 0 : t.innerSize || 0, "0%")];
          for (!e.angular || this instanceof ie || (g[3] = 0), u = 0; u < 4; ++u) p = g[u], l = u < 2 || u === 2 && /%$/.test(p), g[u] = uf(p, [s, r, a, g[2]][u]) + (l ? i : 0);
          return g[3] > g[2] && (g[3] = g[2]), Ko(n) && 2 * n < g[2] && n > 0 && (g[3] = g[2] - 2 * n), cf(this, "afterGetCenter", { positions: g }), g;
        }, h.getStartAndEndRadians = function(t, e) {
          let i = Ko(t) ? t : 0, s = Ko(e) && e > i && e - i < 360 ? e : i + 360;
          return { start: Pl * (i + -90), end: Pl * (s + -90) };
        };
      })(H || (H = {}));
      let Ll = H, { setAnimation: pf } = Xt, { addEvent: El, defined: ff, extend: gf, isNumber: mf, pick: yf, relativeLength: xf } = V;
      class Il extends je {
        getConnectorPath(t) {
          let e = t.dataLabelPosition, i = t.options || {}, s = i.connectorShape, r = this.connectorShapes[s] || s;
          return e && r.call(this, { ...e.computed, alignment: e.alignment }, e.connectorPosition, i) || [];
        }
        getTranslate() {
          return this.sliced && this.slicedTranslation || { translateX: 0, translateY: 0 };
        }
        haloPath(t) {
          let e = this.shapeArgs;
          return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + t, e.r + t, { innerR: e.r - 1, start: e.start, end: e.end, borderRadius: e.borderRadius });
        }
        constructor(t, e, i) {
          super(t, e, i), this.half = 0, this.name ?? (this.name = t.chart.options.lang.pieSliceName);
          let s = (r) => {
            this.slice(r.type === "select");
          };
          El(this, "select", s), El(this, "unselect", s);
        }
        isValid() {
          return mf(this.y) && this.y >= 0;
        }
        setVisible(t, e = !0) {
          t !== this.visible && this.update({ visible: t ?? !this.visible }, e, void 0, !1);
        }
        slice(t, e, i) {
          let s = this.series;
          pf(i, s.chart), e = yf(e, !0), this.sliced = this.options.sliced = t = ff(t) ? t : !this.sliced, s.options.data[s.data.indexOf(this)] = this.options, this.graphic && this.graphic.animate(this.getTranslate());
        }
      }
      gf(Il.prototype, { connectorShapes: { fixedOffset: function(h, t, e) {
        let i = t.breakAt, s = t.touchingSliceAt, r = e.softConnector ? ["C", h.x + (h.alignment === "left" ? -5 : 5), h.y, 2 * i.x - s.x, 2 * i.y - s.y, i.x, i.y] : ["L", i.x, i.y];
        return [["M", h.x, h.y], r, ["L", s.x, s.y]];
      }, straight: function(h, t) {
        let e = t.touchingSliceAt;
        return [["M", h.x, h.y], ["L", e.x, e.y]];
      }, crookedLine: function(h, t, e) {
        let { angle: i = this.angle || 0, breakAt: s, touchingSliceAt: r } = t, { series: o } = this, [a, n, l] = o.center, c = l / 2, { plotLeft: d, plotWidth: u } = o.chart, p = h.alignment === "left", { x: g, y: x } = h, y = s.x;
        if (e.crookDistance) {
          let v = xf(e.crookDistance, 1);
          y = p ? a + c + (u + d - a - c) * (1 - v) : d + (a - c) * v;
        } else y = a + (n - x) * Math.tan(i - Math.PI / 2);
        let m = [["M", g, x]];
        return (p ? y <= g && y >= s.x : y >= g && y <= s.x) && m.push(["L", y, x]), m.push(["L", s.x, s.y], ["L", r.x, r.y]), m;
      } } });
      let { getStartAndEndRadians: bf } = Ll, { noop: Rl } = E, { clamp: vf, extend: wf, fireEvent: Dl, merge: Qo, pick: kf } = V;
      class _o extends ie {
        animate(t) {
          let e = this, i = e.points, s = e.startAngleRad;
          t || i.forEach(function(r) {
            let o = r.graphic, a = r.shapeArgs;
            o && a && (o.attr({ r: kf(r.startR, e.center && e.center[3] / 2), start: s, end: s }), o.animate({ r: a.r, start: a.start, end: a.end }, e.options.animation));
          });
        }
        drawEmpty() {
          let t, e, i = this.startAngleRad, s = this.endAngleRad, r = this.options;
          this.total === 0 && this.center ? (t = this.center[0], e = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(t, e, this.center[1] / 2, 0, i, s).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({ d: nn.arc(t, e, this.center[2] / 2, 0, { start: i, end: s, innerR: this.center[3] / 2 }) }), this.chart.styledMode || this.graph.attr({ "stroke-width": r.borderWidth, fill: r.fillColor || "none", stroke: r.color || "#cccccc" })) : this.graph && (this.graph = this.graph.destroy());
        }
        drawPoints() {
          let t = this.chart.renderer;
          this.points.forEach(function(e) {
            e.graphic && e.hasNewShapeType() && (e.graphic = e.graphic.destroy()), e.graphic || (e.graphic = t[e.shapeType](e.shapeArgs).add(e.series.group), e.delayedRendering = !0);
          });
        }
        generatePoints() {
          super.generatePoints(), this.updateTotals();
        }
        getX(t, e, i, s) {
          let r = this.center, o = this.radii ? this.radii[i.index] || 0 : r[2] / 2, a = s.dataLabelPosition, n = (a == null ? void 0 : a.distance) || 0, l = Math.asin(vf((t - r[1]) / (o + n), -1, 1));
          return r[0] + Math.cos(l) * (o + n) * (e ? -1 : 1) + (n > 0 ? (e ? -1 : 1) * (s.padding || 0) : 0);
        }
        hasData() {
          return !!this.dataTable.rowCount;
        }
        redrawPoints() {
          let t, e, i, s, r = this, o = r.chart;
          this.drawEmpty(), r.group && !o.styledMode && r.group.shadow(r.options.shadow), r.points.forEach(function(a) {
            let n = {};
            e = a.graphic, !a.isNull && e ? (s = a.shapeArgs, t = a.getTranslate(), o.styledMode || (i = r.pointAttribs(a, a.selected && "select")), a.delayedRendering ? (e.setRadialReference(r.center).attr(s).attr(t), o.styledMode || e.attr(i).attr({ "stroke-linejoin": "round" }), a.delayedRendering = !1) : (e.setRadialReference(r.center), o.styledMode || Qo(!0, n, i), Qo(!0, n, s, t), e.animate(n)), e.attr({ visibility: a.visible ? "inherit" : "hidden" }), e.addClass(a.getClassName(), !0)) : e && (a.graphic = e.destroy());
          });
        }
        sortByAngle(t, e) {
          t.sort(function(i, s) {
            return i.angle !== void 0 && (s.angle - i.angle) * e;
          });
        }
        translate(t) {
          Dl(this, "translate"), this.generatePoints();
          let e = this.options, i = e.slicedOffset, s = bf(e.startAngle, e.endAngle), r = this.startAngleRad = s.start, o = (this.endAngleRad = s.end) - r, a = this.points, n = e.ignoreHiddenPoint, l = a.length, c, d, u, p, g, x, y, m = 0;
          for (t || (this.center = t = this.getCenter()), x = 0; x < l; x++) {
            y = a[x], c = r + m * o, y.isValid() && (!n || y.visible) && (m += y.percentage / 100), d = r + m * o;
            let v = { x: t[0], y: t[1], r: t[2] / 2, innerR: t[3] / 2, start: Math.round(1e3 * c) / 1e3, end: Math.round(1e3 * d) / 1e3 };
            y.shapeType = "arc", y.shapeArgs = v, (u = (d + c) / 2) > 1.5 * Math.PI ? u -= 2 * Math.PI : u < -Math.PI / 2 && (u += 2 * Math.PI), y.slicedTranslation = { translateX: Math.round(Math.cos(u) * i), translateY: Math.round(Math.sin(u) * i) }, p = Math.cos(u) * t[2] / 2, g = Math.sin(u) * t[2] / 2, y.tooltipPos = [t[0] + 0.7 * p, t[1] + 0.7 * g], y.half = +(u < -Math.PI / 2 || u > Math.PI / 2), y.angle = u;
          }
          Dl(this, "afterTranslate");
        }
        updateTotals() {
          let t = this.points, e = t.length, i = this.options.ignoreHiddenPoint, s, r, o = 0;
          for (s = 0; s < e; s++) (r = t[s]).isValid() && (!i || r.visible) && (o += r.y);
          for (s = 0, this.total = o; s < e; s++) (r = t[s]).percentage = o > 0 && (r.visible || !i) ? r.y / o * 100 : 0, r.total = o;
        }
      }
      _o.defaultOptions = Qo(ie.defaultOptions, { borderRadius: 3, center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { connectorPadding: 5, connectorShape: "crookedLine", crookDistance: void 0, distance: 30, enabled: !0, formatter: function() {
        return this.isNull ? void 0 : this.name;
      }, softConnector: !0, x: 0 }, fillColor: void 0, ignoreHiddenPoint: !0, inactiveOtherPoints: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: 0.1 } } }), wf(_o.prototype, { axisTypes: [], directTouch: !0, drawGraph: void 0, drawTracker: wr.prototype.drawTracker, getCenter: Ll.getCenter, getSymbol: Rl, invertible: !1, isCartesian: !1, noSharedTooltip: !0, pointAttribs: wr.prototype.pointAttribs, pointClass: Il, requireSorting: !1, searchPoint: Rl, trackerGroups: ["group", "dataLabelsGroup"] }), Lt.registerSeriesType("pie", _o);
      let { composed: Sf, noop: Mf } = E, { distribute: Cf } = Ws, { series: Bl } = Lt, { arrayMax: Tf, clamp: Nl, defined: zl, pick: Af, pushUnique: Of, relativeLength: Fl } = V;
      (function(h) {
        let t = { radialDistributionY: function(o, a) {
          var n;
          return (((n = a.dataLabelPosition) == null ? void 0 : n.top) || 0) + o.distributeBox.pos;
        }, radialDistributionX: function(o, a, n, l, c) {
          let d = c.dataLabelPosition;
          return o.getX(n < ((d == null ? void 0 : d.top) || 0) + 2 || n > ((d == null ? void 0 : d.bottom) || 0) - 2 ? l : n, a.half, a, c);
        }, justify: function(o, a, n, l) {
          var c;
          return l[0] + (o.half ? -1 : 1) * (n + (((c = a.dataLabelPosition) == null ? void 0 : c.distance) || 0));
        }, alignToPlotEdges: function(o, a, n, l) {
          let c = o.getBBox().width;
          return a ? c + l : n - c - l;
        }, alignToConnectors: function(o, a, n, l) {
          let c = 0, d;
          return o.forEach(function(u) {
            (d = u.dataLabel.getBBox().width) > c && (c = d);
          }), a ? c + l : n - c - l;
        } };
        function e(o, a) {
          let n = Math.PI / 2, { start: l = 0, end: c = 0 } = o.shapeArgs || {}, d = o.angle || 0;
          a > 0 && l < n && c > n && d > n / 2 && d < 1.5 * n && (d = d <= n ? Math.max(n / 2, (l + n) / 2) : Math.min(1.5 * n, (n + c) / 2));
          let { center: u, options: p } = this, g = u[2] / 2, x = Math.cos(d), y = Math.sin(d), m = u[0] + x * g, v = u[1] + y * g, w = Math.min((p.slicedOffset || 0) + (p.borderWidth || 0), a / 5);
          return { natural: { x: m + x * a, y: v + y * a }, computed: {}, alignment: a < 0 ? "center" : o.half ? "right" : "left", connectorPosition: { angle: d, breakAt: { x: m + x * w, y: v + y * w }, touchingSliceAt: { x: m, y: v } }, distance: a };
        }
        function i() {
          var P;
          let o = this, a = o.points, n = o.chart, l = n.plotWidth, c = n.plotHeight, d = n.plotLeft, u = Math.round(n.chartWidth / 3), p = o.center, g = p[2] / 2, x = p[1], y = [[], []], m = [0, 0, 0, 0], v = o.dataLabelPositioners, w, T, S, M = 0;
          o.visible && ((P = o.hasDataLabels) != null && P.call(o)) && (a.forEach((A) => {
            (A.dataLabels || []).forEach((L) => {
              L.shortened && (L.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), L.shortened = !1);
            });
          }), Bl.prototype.drawDataLabels.apply(o), a.forEach((A) => {
            (A.dataLabels || []).forEach((L, R) => {
              var X;
              let D = p[2] / 2, N = L.options, B = Fl((N == null ? void 0 : N.distance) || 0, D);
              R === 0 && y[A.half].push(A), !zl((X = N == null ? void 0 : N.style) == null ? void 0 : X.width) && L.getBBox().width > u && (L.css({ width: Math.round(0.7 * u) + "px" }), L.shortened = !0), L.dataLabelPosition = this.getDataLabelPosition(A, B), M = Math.max(M, B);
            });
          }), y.forEach((A, L) => {
            let R = A.length, D = [], N, B, X = 0, j;
            R && (o.sortByAngle(A, L - 0.5), M > 0 && (N = Math.max(0, x - g - M), B = Math.min(x + g + M, n.plotHeight), A.forEach((it) => {
              (it.dataLabels || []).forEach((G) => {
                var ct;
                let et = G.dataLabelPosition;
                et && et.distance > 0 && (et.top = Math.max(0, x - g - et.distance), et.bottom = Math.min(x + g + et.distance, n.plotHeight), X = G.getBBox().height || 21, G.lineHeight = n.renderer.fontMetrics(G.text || G).h + 2 * G.padding, it.distributeBox = { target: (((ct = G.dataLabelPosition) == null ? void 0 : ct.natural.y) || 0) - et.top + G.lineHeight / 2, size: X, rank: it.y }, D.push(it.distributeBox));
              });
            }), Cf(D, j = B + X - N, j / 5)), A.forEach((it) => {
              (it.dataLabels || []).forEach((G) => {
                let et = G.options || {}, ct = it.distributeBox, dt = G.dataLabelPosition, pt = (dt == null ? void 0 : dt.natural.y) || 0, Yt = et.connectorPadding || 0, ut = G.lineHeight || 21, bt = (ut - G.getBBox().height) / 2, ot = 0, Q = pt, Rt = "inherit";
                if (dt) {
                  if (D && zl(ct) && dt.distance > 0 && (ct.pos === void 0 ? Rt = "hidden" : (S = ct.size, Q = v.radialDistributionY(it, G))), et.justify) ot = v.justify(it, G, g, p);
                  else switch (et.alignTo) {
                    case "connectors":
                      ot = v.alignToConnectors(A, L, l, d);
                      break;
                    case "plotEdges":
                      ot = v.alignToPlotEdges(G, L, l, d);
                      break;
                    default:
                      ot = v.radialDistributionX(o, it, Q - bt, pt, G);
                  }
                  if (dt.attribs = { visibility: Rt, align: dt.alignment }, dt.posAttribs = { x: ot + (et.x || 0) + ({ left: Yt, right: -Yt }[dt.alignment] || 0), y: Q + (et.y || 0) - ut / 2 }, dt.computed.x = ot, dt.computed.y = Q - bt, Af(et.crop, !0)) {
                    let vt;
                    ot - (T = G.getBBox().width) < Yt && L === 1 ? (vt = Math.round(T - ot + Yt), m[3] = Math.max(vt, m[3])) : ot + T > l - Yt && L === 0 && (vt = Math.round(ot + T - l + Yt), m[1] = Math.max(vt, m[1])), Q - S / 2 < 0 ? m[0] = Math.max(Math.round(-Q + S / 2), m[0]) : Q + S / 2 > c && (m[2] = Math.max(Math.round(Q + S / 2 - c), m[2])), dt.sideOverflow = vt;
                  }
                }
              });
            }));
          }), (Tf(m) === 0 || this.verifyDataLabelOverflow(m)) && (this.placeDataLabels(), this.points.forEach((A) => {
            (A.dataLabels || []).forEach((L) => {
              var B;
              let { connectorColor: R, connectorWidth: D = 1 } = L.options || {}, N = L.dataLabelPosition;
              if (D) {
                let X;
                w = L.connector, N && N.distance > 0 ? (X = !w, w || (L.connector = w = n.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + A.colorIndex + (A.className ? " " + A.className : "")).add(o.dataLabelsGroup)), n.styledMode || w.attr({ "stroke-width": D, stroke: R || A.color || "#666666" }), w[X ? "attr" : "animate"]({ d: A.getConnectorPath(L) }), w.attr({ visibility: (B = N.attribs) == null ? void 0 : B.visibility })) : w && (L.connector = w.destroy());
              }
            });
          })));
        }
        function s() {
          this.points.forEach((o) => {
            (o.dataLabels || []).forEach((a) => {
              var l, c;
              let n = a.dataLabelPosition;
              n ? (n.sideOverflow && (a.css({ width: Math.max(a.getBBox().width - n.sideOverflow, 0) + "px", textOverflow: ((c = (l = a.options) == null ? void 0 : l.style) == null ? void 0 : c.textOverflow) || "ellipsis" }), a.shortened = !0), a.attr(n.attribs), a[a.moved ? "animate" : "attr"](n.posAttribs), a.moved = !0) : a && a.attr({ y: -9999 });
            }), delete o.distributeBox;
          }, this);
        }
        function r(o) {
          let a = this.center, n = this.options, l = n.center, c = n.minSize || 80, d = c, u = n.size !== null;
          return !u && (l[0] !== null ? d = Math.max(a[2] - Math.max(o[1], o[3]), c) : (d = Math.max(a[2] - o[1] - o[3], c), a[0] += (o[3] - o[1]) / 2), l[1] !== null ? d = Nl(d, c, a[2] - Math.max(o[0], o[2])) : (d = Nl(d, c, a[2] - o[0] - o[2]), a[1] += (o[0] - o[2]) / 2), d < a[2] ? (a[2] = d, a[3] = Math.min(n.thickness ? Math.max(0, d - 2 * n.thickness) : Math.max(0, Fl(n.innerSize || 0, d)), d), this.translate(a), this.drawDataLabels && this.drawDataLabels()) : u = !0), u;
        }
        h.compose = function(o) {
          if (kr.compose(Bl), Of(Sf, "PieDataLabel")) {
            let a = o.prototype;
            a.dataLabelPositioners = t, a.alignDataLabel = Mf, a.drawDataLabels = i, a.getDataLabelPosition = e, a.placeDataLabels = s, a.verifyDataLabelOverflow = r;
          }
        };
      })(tt || (tt = {}));
      let Pf = tt;
      (function(h) {
        h.getCenterOfPoints = function(t) {
          let e = t.reduce((i, s) => (i.x += s.x, i.y += s.y, i), { x: 0, y: 0 });
          return { x: e.x / t.length, y: e.y / t.length };
        }, h.getDistanceBetweenPoints = function(t, e) {
          return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
        }, h.getAngleBetweenPoints = function(t, e) {
          return Math.atan2(e.x - t.x, e.y - t.y);
        }, h.pointInPolygon = function({ x: t, y: e }, i) {
          let s = i.length, r, o, a = !1;
          for (r = 0, o = s - 1; r < s; o = r++) {
            let [n, l] = i[r], [c, d] = i[o];
            l > e != d > e && t < (c - n) * (e - l) / (d - l) + n && (a = !a);
          }
          return a;
        };
      })(ht || (ht = {}));
      let { pointInPolygon: Lf } = ht, { addEvent: Ef, getAlignFactor: If, fireEvent: Wl, objectEach: Hl, pick: Rf } = V;
      function Df(h) {
        let t = h.length, e = (c, d) => !(d.x >= c.x + c.width || d.x + d.width <= c.x || d.y >= c.y + c.height || d.y + d.height <= c.y), i = (c, d) => {
          for (let u of c) if (Lf({ x: u[0], y: u[1] }, d)) return !0;
          return !1;
        }, s, r, o, a, n, l = !1;
        for (let c = 0; c < t; c++) (s = h[c]) && (s.oldOpacity = s.opacity, s.newOpacity = 1, s.absoluteBox = function(d) {
          var u, p;
          if (d && (!d.alignAttr || d.placed)) {
            let g = d.box ? 0 : d.padding || 0, x = d.alignAttr || { x: d.attr("x"), y: d.attr("y") }, { height: y, polygon: m, width: v } = d.getBBox(), w = If(d.alignValue) * v;
            return d.width = v, d.height = y, { x: x.x + (((u = d.parentGroup) == null ? void 0 : u.translateX) || 0) + g - w, y: x.y + (((p = d.parentGroup) == null ? void 0 : p.translateY) || 0) + g, width: v - 2 * g, height: y - 2 * g, polygon: m };
          }
        }(s));
        h.sort((c, d) => (d.labelrank || 0) - (c.labelrank || 0));
        for (let c = 0; c < t; ++c) {
          a = (r = h[c]) && r.absoluteBox;
          let d = a == null ? void 0 : a.polygon;
          for (let u = c + 1; u < t; ++u) {
            n = (o = h[u]) && o.absoluteBox;
            let p = !1;
            if (a && n && r !== o && r.newOpacity !== 0 && o.newOpacity !== 0 && r.visibility !== "hidden" && o.visibility !== "hidden") {
              let g = n.polygon;
              if (d && g && d !== g ? i(d, g) && (p = !0) : e(a, n) && (p = !0), p) {
                let x = r.labelrank < o.labelrank ? r : o, y = x.text;
                x.newOpacity = 0, y != null && y.element.querySelector("textPath") && y.hide();
              }
            }
          }
        }
        for (let c of h) jl(c, this) && (l = !0);
        l && Wl(this, "afterHideAllOverlappingLabels");
      }
      function jl(h, t) {
        let e, i = !1;
        return h && (e = h.newOpacity, h.oldOpacity !== e && (h.hasClass("highcharts-data-label") ? (h[e ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), i = !0, h[h.isOld ? "animate" : "attr"]({ opacity: e }, void 0, function() {
          t.styledMode || h.css({ pointerEvents: e ? "auto" : "none" });
        }), Wl(t, "afterHideOverlappingLabel")) : h.attr({ opacity: e })), h.isOld = !0), i;
      }
      function Bf() {
        var e;
        let h = this, t = [];
        for (let i of h.labelCollectors || []) t = t.concat(i());
        for (let i of h.yAxis || []) i.stacking && i.options.stackLabels && !i.options.stackLabels.allowOverlap && Hl(i.stacking.stacks, (s) => {
          Hl(s, (r) => {
            r.label && t.push(r.label);
          });
        });
        for (let i of h.series || []) if (i.visible && ((e = i.hasDataLabels) != null && e.call(i))) {
          let s = (r) => {
            for (let o of r) o.visible && (o.dataLabels || []).forEach((a) => {
              var l;
              let n = a.options || {};
              a.labelrank = Rf(n.labelrank, o.labelrank, (l = o.shapeArgs) == null ? void 0 : l.height), n.allowOverlap ?? Number(n.distance) > 0 ? (a.oldOpacity = a.opacity, a.newOpacity = 1, jl(a, h)) : t.push(a);
            });
          };
          s(i.nodes || []), s(i.points);
        }
        this.hideOverlappingLabels(t);
      }
      let Xl = { compose: function(h) {
        let t = h.prototype;
        t.hideOverlappingLabels || (t.hideOverlappingLabels = Df, Ef(h, "render", Bf));
      } }, { defaultOptions: Nf } = re, { noop: Gl } = E, { addEvent: Yl, extend: zf, isObject: Ul, merge: Ff, relativeLength: Zo } = V, Wf = { radius: 0, scope: "stack", where: void 0 }, ql = Gl, $l = Gl;
      function Hf(h, t, e, i, s = {}) {
        let r = ql(h, t, e, i, s), { innerR: o = 0, r: a = e, start: n = 0, end: l = 0 } = s;
        if (s.open || !s.borderRadius) return r;
        let c = l - n, d = Math.sin(c / 2), u = Math.max(Math.min(Zo(s.borderRadius || 0, a - o), (a - o) / 2, a * d / (1 + d)), 0), p = Math.min(u, c / Math.PI * 2 * o), g = r.length - 1;
        for (; g--; ) (function(x, y, m) {
          let v, w, T, S = x[y], M = x[y + 1];
          if (M[0] === "Z" && (M = x[0]), (S[0] === "M" || S[0] === "L") && M[0] === "A" ? (v = S, w = M, T = !0) : S[0] === "A" && (M[0] === "M" || M[0] === "L") && (v = M, w = S), v && w && w.params) {
            let P = w[1], A = w[5], L = w.params, { start: R, end: D, cx: N, cy: B } = L, X = A ? P - m : P + m, j = X ? Math.asin(m / X) : 0, it = A ? j : -j, G = Math.cos(j) * X;
            T ? (L.start = R + it, v[1] = N + G * Math.cos(R), v[2] = B + G * Math.sin(R), x.splice(y + 1, 0, ["A", m, m, 0, 0, 1, N + P * Math.cos(L.start), B + P * Math.sin(L.start)])) : (L.end = D - it, w[6] = N + P * Math.cos(L.end), w[7] = B + P * Math.sin(L.end), x.splice(y + 1, 0, ["A", m, m, 0, 0, 1, N + G * Math.cos(D), B + G * Math.sin(D)])), w[4] = Math.abs(L.end - L.start) < Math.PI ? 0 : 1;
          }
        })(r, g, g > 1 ? p : u);
        return r;
      }
      function jf() {
        var h, t;
        if (this.options.borderRadius && !(this.chart.is3d && this.chart.is3d())) {
          let { options: e, yAxis: i } = this, s = e.stacking === "percent", r = (t = (h = Nf.plotOptions) == null ? void 0 : h[this.type]) == null ? void 0 : t.borderRadius, o = Jo(e.borderRadius, Ul(r) ? r : {}), a = i.options.reversed;
          for (let n of this.points) {
            let { shapeArgs: l } = n;
            if (n.shapeType === "roundedRect" && l) {
              let { width: c = 0, height: d = 0, y: u = 0 } = l, p = u, g = d;
              if (o.scope === "stack" && n.stackTotal) {
                let v = i.translate(s ? 100 : n.stackTotal, !1, !0, !1, !0), w = i.translate(e.threshold || 0, !1, !0, !1, !0), T = this.crispCol(0, Math.min(v, w), 0, Math.abs(v - w));
                p = T.y, g = T.height;
              }
              let x = (n.negative ? -1 : 1) * (a ? -1 : 1) == -1, y = o.where;
              !y && this.is("waterfall") && Math.abs((n.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (y = "all"), y || (y = "end");
              let m = Math.min(Zo(o.radius, c), c / 2, y === "all" ? d / 2 : 1 / 0) || 0;
              y === "end" && (x && (p -= m), g += m), zf(l, { brBoxHeight: g, brBoxY: p, r: m });
            }
          }
        }
      }
      function Jo(h, t) {
        return Ul(h) || (h = { radius: h || 0 }), Ff(Wf, t, h);
      }
      function Xf() {
        let h = Jo(this.options.borderRadius);
        for (let t of this.points) {
          let e = t.shapeArgs;
          e && (e.borderRadius = Zo(h.radius, (e.r || 0) - (e.innerR || 0)));
        }
      }
      function Gf(h, t, e, i, s = {}) {
        let r = $l(h, t, e, i, s), { r: o = 0, brBoxHeight: a = i, brBoxY: n = t } = s, l = t - n, c = n + a - (t + i), d = l - o > -0.1 ? 0 : o, u = c - o > -0.1 ? 0 : o, p = Math.max(d && l, 0), g = Math.max(u && c, 0), x = [h + d, t], y = [h + e - d, t], m = [h + e, t + d], v = [h + e, t + i - u], w = [h + e - u, t + i], T = [h + u, t + i], S = [h, t + i - u], M = [h, t + d], P = (A, L) => Math.sqrt(Math.pow(A, 2) - Math.pow(L, 2));
        if (p) {
          let A = P(d, d - p);
          x[0] -= A, y[0] += A, m[1] = M[1] = t + d - p;
        }
        if (i < d - p) {
          let A = P(d, d - p - i);
          m[0] = v[0] = h + e - d + A, w[0] = Math.min(m[0], w[0]), T[0] = Math.max(v[0], T[0]), S[0] = M[0] = h + d - A, m[1] = M[1] = t + i;
        }
        if (g) {
          let A = P(u, u - g);
          w[0] += A, T[0] -= A, v[1] = S[1] = t + i - u + g;
        }
        if (i < u - g) {
          let A = P(u, u - g - i);
          m[0] = v[0] = h + e - u + A, y[0] = Math.min(m[0], y[0]), x[0] = Math.max(v[0], x[0]), S[0] = M[0] = h + u - A, v[1] = S[1] = t;
        }
        return r.length = 0, r.push(["M", ...x], ["L", ...y], ["A", d, d, 0, 0, 1, ...m], ["L", ...v], ["A", u, u, 0, 0, 1, ...w], ["L", ...T], ["A", u, u, 0, 0, 1, ...S], ["L", ...M], ["A", d, d, 0, 0, 1, ...x], ["Z"]), r;
      }
      let { diffObjects: Yf, extend: Uf, find: qf, merge: $f, pick: Cr, uniqueKey: Vf } = V;
      (function(h) {
        function t(i, s) {
          let r = i.condition;
          (r.callback || function() {
            return this.chartWidth <= Cr(r.maxWidth, Number.MAX_VALUE) && this.chartHeight <= Cr(r.maxHeight, Number.MAX_VALUE) && this.chartWidth >= Cr(r.minWidth, 0) && this.chartHeight >= Cr(r.minHeight, 0);
          }).call(this) && s.push(i._id);
        }
        function e(i, s) {
          let r = this.options.responsive, o = this.currentResponsive, a = [], n;
          !s && r && r.rules && r.rules.forEach((d) => {
            d._id === void 0 && (d._id = Vf()), this.matchResponsiveRule(d, a);
          }, this);
          let l = $f(...a.map((d) => qf((r == null ? void 0 : r.rules) || [], (u) => u._id === d)).map((d) => d == null ? void 0 : d.chartOptions));
          l.isResponsiveOptions = !0, a = a.toString() || void 0;
          let c = o == null ? void 0 : o.ruleIds;
          a === c || (o && (this.currentResponsive = void 0, this.updatingResponsive = !0, this.update(o.undoOptions, i, !0), this.updatingResponsive = !1), a ? ((n = Yf(l, this.options, !0, this.collectionsWithUpdate)).isResponsiveOptions = !0, this.currentResponsive = { ruleIds: a, mergedOptions: l, undoOptions: n }, this.updatingResponsive || this.update(l, i, !0)) : this.currentResponsive = void 0);
        }
        h.compose = function(i) {
          let s = i.prototype;
          return s.matchResponsiveRule || Uf(s, { matchResponsiveRule: t, setResponsive: e }), i;
        };
      })(xt || (xt = {}));
      let Kf = xt;
      E.AST = Tt, E.Axis = Di, E.Chart = Ue, E.Color = At, E.DataLabel = kr, E.DataTableCore = lr, E.Fx = Kt, E.HTMLElement = Ii, E.Legend = el, E.LegendSymbol = jn, E.OverlappingDataLabels = E.OverlappingDataLabels || Xl, E.PlotLineOrBand = sr, E.Point = je, E.Pointer = Fn, E.RendererRegistry = os, E.Series = ie, E.SeriesRegistry = Lt, E.StackItem = pl, E.SVGElement = we, E.SVGRenderer = $s, E.Templating = oe, E.Tick = Ri, E.Time = jr, E.Tooltip = Rn, E.animate = Xt.animate, E.animObject = Xt.animObject, E.chart = Ue.chart, E.color = At.parse, E.dateFormat = oe.dateFormat, E.defaultOptions = re.defaultOptions, E.distribute = Ws.distribute, E.format = oe.format, E.getDeferredAnimation = Xt.getDeferredAnimation, E.getOptions = re.getOptions, E.numberFormat = oe.numberFormat, E.seriesType = Lt.seriesType, E.setAnimation = Xt.setAnimation, E.setOptions = re.setOptions, E.stop = Xt.stop, E.time = re.defaultTime, E.timers = Kt.timers, { compose: function(h, t, e) {
        let i = h.types.pie;
        if (!t.symbolCustomAttribs.includes("borderRadius")) {
          let s = e.prototype.symbols;
          Yl(h, "afterColumnTranslate", jf, { order: 9 }), Yl(i, "afterTranslate", Xf), t.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY"), ql = s.arc, $l = s.roundedRect, s.arc = Hf, s.roundedRect = Gf;
        }
      }, optionsToObject: Jo }.compose(E.Series, E.SVGElement, E.SVGRenderer), rf.compose(E.Series.types.column), kr.compose(E.Series), zc.compose(E.Axis), Ii.compose(E.SVGRenderer), el.compose(E.Chart), Hc.compose(E.Axis), Xl.compose(E.Chart), Pf.compose(E.Series.types.pie), sr.compose(E.Chart, E.Axis), Fn.compose(E.Chart), Kf.compose(E.Chart), ms.compose(E.Axis, E.Chart, E.Series), Np.compose(E.Axis, E.Chart, E.Series), Rn.compose(E.Pointer), V.extend(E, V);
      let Qf = E;
      return pe.default;
    })());
  }(Er)), Er.exports;
}
var im = em();
const sm = /* @__PURE__ */ kh(im);
var Ir = { exports: {} }, rm = Ir.exports, ch;
function om() {
  return ch || (ch = 1, function(b, f) {
    (function(k, C) {
      b.exports = C(Dr);
    })(typeof self < "u" ? self : rm, function(k) {
      return function(C) {
        function I(z) {
          if (F[z]) return F[z].exports;
          var W = F[z] = { i: z, l: !1, exports: {} };
          return C[z].call(W.exports, W, W.exports, I), W.l = !0, W.exports;
        }
        var F = {};
        return I.m = C, I.c = F, I.d = function(z, W, Y) {
          I.o(z, W) || Object.defineProperty(z, W, { configurable: !1, enumerable: !0, get: Y });
        }, I.n = function(z) {
          var W = z && z.__esModule ? function() {
            return z.default;
          } : function() {
            return z;
          };
          return I.d(W, "a", W), W;
        }, I.o = function(z, W) {
          return Object.prototype.hasOwnProperty.call(z, W);
        }, I.p = "", I(I.s = 0);
      }([function(C, I, F) {
        function z() {
          return z = Object.assign ? Object.assign.bind() : function(H) {
            for (var tt = 1; tt < arguments.length; tt++) {
              var ht = arguments[tt];
              for (var xt in ht) Object.prototype.hasOwnProperty.call(ht, xt) && (H[xt] = ht[xt]);
            }
            return H;
          }, z.apply(this, arguments);
        }
        function W(H) {
          return U(H) || st(H) || rt(H) || Y();
        }
        function Y() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function rt(H, tt) {
          if (H) {
            if (typeof H == "string") return nt(H, tt);
            var ht = Object.prototype.toString.call(H).slice(8, -1);
            return ht === "Object" && H.constructor && (ht = H.constructor.name), ht === "Map" || ht === "Set" ? Array.from(H) : ht === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(ht) ? nt(H, tt) : void 0;
          }
        }
        function st(H) {
          if (typeof Symbol < "u" && H[Symbol.iterator] != null || H["@@iterator"] != null) return Array.from(H);
        }
        function U(H) {
          if (Array.isArray(H)) return nt(H);
        }
        function nt(H, tt) {
          (tt == null || tt > H.length) && (tt = H.length);
          for (var ht = 0, xt = new Array(tt); ht < tt; ht++) xt[ht] = H[ht];
          return xt;
        }
        function $(H) {
          "@babel/helpers - typeof";
          return ($ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(tt) {
            return typeof tt;
          } : function(tt) {
            return tt && typeof Symbol == "function" && tt.constructor === Symbol && tt !== Symbol.prototype ? "symbol" : typeof tt;
          })(H);
        }
        Object.defineProperty(I, "__esModule", { value: !0 }), F.d(I, "HighchartsReact", function() {
          return ft;
        });
        var K = F(1), J = F.n(K), _ = typeof window < "u" ? K.useLayoutEffect : K.useEffect, ft = Object(K.memo)(Object(K.forwardRef)(function(H, tt) {
          var ht = Object(K.useRef)(), xt = Object(K.useRef)(), It = Object(K.useRef)(H.constructorType), pe = Object(K.useRef)(H.highcharts);
          return _(function() {
            function E() {
              var kt = H.highcharts || (typeof window > "u" ? "undefined" : $(window)) === "object" && window.Highcharts, $t = H.constructorType || "chart";
              kt ? kt[$t] ? H.options ? xt.current = kt[$t](ht.current, H.options, H.callback) : console.warn('The "options" property was not passed.') : console.warn('The "constructorType" property is incorrect or some required module is not imported.') : console.warn('The "highcharts" property was not passed.');
            }
            if (xt.current) {
              if (H.allowChartUpdate !== !1) if (H.constructorType !== It.current || H.highcharts !== pe.current) It.current = H.constructorType, pe.current = H.highcharts, E();
              else if (!H.immutable && xt.current) {
                var Ct;
                (Ct = xt.current).update.apply(Ct, [H.options].concat(W(H.updateArgs || [!0, !0])));
              } else E();
            } else E();
          }, [H.options, H.allowChartUpdate, H.updateArgs, H.containerProps, H.highcharts, H.constructorType]), _(function() {
            return function() {
              xt.current && (xt.current.destroy(), xt.current = null);
            };
          }, []), Object(K.useImperativeHandle)(tt, function() {
            return { get chart() {
              return xt.current;
            }, container: ht };
          }, []), J.a.createElement("div", z({}, H.containerProps, { ref: ht }));
        }));
        I.default = ft;
      }, function(C, I) {
        C.exports = k;
      }]);
    });
  }(Ir)), Ir.exports;
}
var am = om();
const nm = /* @__PURE__ */ kh(am), uh = ({ series: b }) => {
  const f = Zg(b);
  return /* @__PURE__ */ te.jsx("div", { className: "pie-chart", children: /* @__PURE__ */ te.jsx(
    nm,
    {
      highcharts: sm,
      options: {
        ...f,
        chart: {
          ...f.chart,
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
}, lm = new Ig(), hm = () => {
  const { isLoading: b, data: f = null } = Qg({
    queryKey: ["siteOverview"],
    queryFn: gg
  });
  if (b)
    return /* @__PURE__ */ te.jsx("div", { children: "Loading..." });
  if (!f)
    return /* @__PURE__ */ te.jsx("div", { children: "No data available" });
  const { onlineSeriesList: k, offlineSeriesList: C } = Jg(f);
  return /* @__PURE__ */ te.jsxs("div", { className: "chart-container", children: [
    /* @__PURE__ */ te.jsxs("div", { className: "chart-wrapper", children: [
      /* @__PURE__ */ te.jsx("h3", { className: "chart-title", children: "Online Sites" }),
      /* @__PURE__ */ te.jsx(uh, { series: k })
    ] }),
    /* @__PURE__ */ te.jsxs("div", { className: "chart-wrapper", children: [
      /* @__PURE__ */ te.jsx("h3", { className: "chart-title", children: "Offline Sites" }),
      /* @__PURE__ */ te.jsx(uh, { series: C })
    ] })
  ] });
}, dm = () => /* @__PURE__ */ te.jsx(zg, { client: lm, children: /* @__PURE__ */ te.jsx(hm, {}) }), cm = dg(dm);
customElements.define("site-overview-chart", cm);
