import { j as pe } from './jsx-runtime-BjG_zV1W.js';
import { r as w } from './index-DZ_CqB28.js';
import './_commonjsHelpers-Cpj98o6Y.js';
function Ie(e, t) {
  if (typeof e == 'function') return e(t);
  e != null && (e.current = t);
}
function wr(...e) {
  return t => {
    let r = !1;
    const o = e.map(n => {
      const i = Ie(n, t);
      return (!r && typeof i == 'function' && (r = !0), i);
    });
    if (r)
      return () => {
        for (let n = 0; n < o.length; n++) {
          const i = o[n];
          typeof i == 'function' ? i() : Ie(e[n], null);
        }
      };
  };
}
function zr(e) {
  const t = Cr(e),
    r = w.forwardRef((o, n) => {
      const { children: i, ...l } = o,
        p = w.Children.toArray(i),
        d = p.find(Ir);
      if (d) {
        const f = d.props.children,
          g = p.map(y =>
            y === d
              ? w.Children.count(f) > 1
                ? w.Children.only(null)
                : w.isValidElement(f)
                  ? f.props.children
                  : null
              : y
          );
        return pe.jsx(t, {
          ...l,
          ref: n,
          children: w.isValidElement(f) ? w.cloneElement(f, void 0, g) : null,
        });
      }
      return pe.jsx(t, { ...l, ref: n, children: i });
    });
  return ((r.displayName = `${e}.Slot`), r);
}
var Sr = zr('Slot');
function Cr(e) {
  const t = w.forwardRef((r, o) => {
    const { children: n, ...i } = r;
    if (w.isValidElement(n)) {
      const l = Rr(n),
        p = Mr(i, n.props);
      return (
        n.type !== w.Fragment && (p.ref = o ? wr(o, l) : l),
        w.cloneElement(n, p)
      );
    }
    return w.Children.count(n) > 1 ? w.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Ar = Symbol('radix.slottable');
function Ir(e) {
  return (
    w.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === Ar
  );
}
function Mr(e, t) {
  const r = { ...t };
  for (const o in t) {
    const n = e[o],
      i = t[o];
    /^on[A-Z]/.test(o)
      ? n && i
        ? (r[o] = (...p) => {
            const d = i(...p);
            return (n(...p), d);
          })
        : n && (r[o] = n)
      : o === 'style'
        ? (r[o] = { ...n, ...i })
        : o === 'className' && (r[o] = [n, i].filter(Boolean).join(' '));
  }
  return { ...e, ...r };
}
function Rr(e) {
  var o, n;
  let t =
      (o = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null
        ? void 0
        : o.get,
    r = t && 'isReactWarning' in t && t.isReactWarning;
  return r
    ? e.ref
    : ((t =
        (n = Object.getOwnPropertyDescriptor(e, 'ref')) == null
          ? void 0
          : n.get),
      (r = t && 'isReactWarning' in t && t.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref);
}
function dr(e) {
  var t,
    r,
    o = '';
  if (typeof e == 'string' || typeof e == 'number') o += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var n = e.length;
      for (t = 0; t < n; t++)
        e[t] && (r = dr(e[t])) && (o && (o += ' '), (o += r));
    } else for (r in e) e[r] && (o && (o += ' '), (o += r));
  return o;
}
function ur() {
  for (var e, t, r = 0, o = '', n = arguments.length; r < n; r++)
    (e = arguments[r]) && (t = dr(e)) && (o && (o += ' '), (o += t));
  return o;
}
const Me = e => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  Re = ur,
  Pr = (e, t) => r => {
    var o;
    if ((t == null ? void 0 : t.variants) == null)
      return Re(
        e,
        r == null ? void 0 : r.class,
        r == null ? void 0 : r.className
      );
    const { variants: n, defaultVariants: i } = t,
      l = Object.keys(n).map(f => {
        const g = r == null ? void 0 : r[f],
          y = i == null ? void 0 : i[f];
        if (g === null) return null;
        const S = Me(g) || Me(y);
        return n[f][S];
      }),
      p =
        r &&
        Object.entries(r).reduce((f, g) => {
          let [y, S] = g;
          return (S === void 0 || (f[y] = S), f);
        }, {}),
      d =
        t == null || (o = t.compoundVariants) === null || o === void 0
          ? void 0
          : o.reduce((f, g) => {
              let { class: y, className: S, ...P } = g;
              return Object.entries(P).every(x => {
                let [k, C] = x;
                return Array.isArray(C)
                  ? C.includes({ ...i, ...p }[k])
                  : { ...i, ...p }[k] === C;
              })
                ? [...f, y, S]
                : f;
            }, []);
    return Re(
      e,
      l,
      d,
      r == null ? void 0 : r.class,
      r == null ? void 0 : r.className
    );
  },
  ye = '-',
  Er = e => {
    const t = Vr(e),
      { conflictingClassGroups: r, conflictingClassGroupModifiers: o } = e;
    return {
      getClassGroupId: l => {
        const p = l.split(ye);
        return (p[0] === '' && p.length !== 1 && p.shift(), mr(p, t) || Gr(l));
      },
      getConflictingClassGroupIds: (l, p) => {
        const d = r[l] || [];
        return p && o[l] ? [...d, ...o[l]] : d;
      },
    };
  },
  mr = (e, t) => {
    var l;
    if (e.length === 0) return t.classGroupId;
    const r = e[0],
      o = t.nextPart.get(r),
      n = o ? mr(e.slice(1), o) : void 0;
    if (n) return n;
    if (t.validators.length === 0) return;
    const i = e.join(ye);
    return (l = t.validators.find(({ validator: p }) => p(i))) == null
      ? void 0
      : l.classGroupId;
  },
  Pe = /^\[(.+)\]$/,
  Gr = e => {
    if (Pe.test(e)) {
      const t = Pe.exec(e)[1],
        r = t == null ? void 0 : t.substring(0, t.indexOf(':'));
      if (r) return 'arbitrary..' + r;
    }
  },
  Vr = e => {
    const { theme: t, classGroups: r } = e,
      o = { nextPart: new Map(), validators: [] };
    for (const n in r) fe(r[n], o, n, t);
    return o;
  },
  fe = (e, t, r, o) => {
    e.forEach(n => {
      if (typeof n == 'string') {
        const i = n === '' ? t : Ee(t, n);
        i.classGroupId = r;
        return;
      }
      if (typeof n == 'function') {
        if (_r(n)) {
          fe(n(o), t, r, o);
          return;
        }
        t.validators.push({ validator: n, classGroupId: r });
        return;
      }
      Object.entries(n).forEach(([i, l]) => {
        fe(l, Ee(t, i), r, o);
      });
    });
  },
  Ee = (e, t) => {
    let r = e;
    return (
      t.split(ye).forEach(o => {
        (r.nextPart.has(o) ||
          r.nextPart.set(o, { nextPart: new Map(), validators: [] }),
          (r = r.nextPart.get(o)));
      }),
      r
    );
  },
  _r = e => e.isThemeGetter,
  Nr = e => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      r = new Map(),
      o = new Map();
    const n = (i, l) => {
      (r.set(i, l), t++, t > e && ((t = 0), (o = r), (r = new Map())));
    };
    return {
      get(i) {
        let l = r.get(i);
        if (l !== void 0) return l;
        if ((l = o.get(i)) !== void 0) return (n(i, l), l);
      },
      set(i, l) {
        r.has(i) ? r.set(i, l) : n(i, l);
      },
    };
  },
  ge = '!',
  be = ':',
  Tr = be.length,
  Lr = e => {
    const { prefix: t, experimentalParseClassName: r } = e;
    let o = n => {
      const i = [];
      let l = 0,
        p = 0,
        d = 0,
        f;
      for (let x = 0; x < n.length; x++) {
        let k = n[x];
        if (l === 0 && p === 0) {
          if (k === be) {
            (i.push(n.slice(d, x)), (d = x + Tr));
            continue;
          }
          if (k === '/') {
            f = x;
            continue;
          }
        }
        k === '[' ? l++ : k === ']' ? l-- : k === '(' ? p++ : k === ')' && p--;
      }
      const g = i.length === 0 ? n : n.substring(d),
        y = jr(g),
        S = y !== g,
        P = f && f > d ? f - d : void 0;
      return {
        modifiers: i,
        hasImportantModifier: S,
        baseClassName: y,
        maybePostfixModifierPosition: P,
      };
    };
    if (t) {
      const n = t + be,
        i = o;
      o = l =>
        l.startsWith(n)
          ? i(l.substring(n.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: l,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (r) {
      const n = o;
      o = i => r({ className: i, parseClassName: n });
    }
    return o;
  },
  jr = e =>
    e.endsWith(ge)
      ? e.substring(0, e.length - 1)
      : e.startsWith(ge)
        ? e.substring(1)
        : e,
  Or = e => {
    const t = Object.fromEntries(e.orderSensitiveModifiers.map(o => [o, !0]));
    return o => {
      if (o.length <= 1) return o;
      const n = [];
      let i = [];
      return (
        o.forEach(l => {
          l[0] === '[' || t[l] ? (n.push(...i.sort(), l), (i = [])) : i.push(l);
        }),
        n.push(...i.sort()),
        n
      );
    };
  },
  Br = e => ({
    cache: Nr(e.cacheSize),
    parseClassName: Lr(e),
    sortModifiers: Or(e),
    ...Er(e),
  }),
  Wr = /\s+/,
  Dr = (e, t) => {
    const {
        parseClassName: r,
        getClassGroupId: o,
        getConflictingClassGroupIds: n,
        sortModifiers: i,
      } = t,
      l = [],
      p = e.trim().split(Wr);
    let d = '';
    for (let f = p.length - 1; f >= 0; f -= 1) {
      const g = p[f],
        {
          isExternal: y,
          modifiers: S,
          hasImportantModifier: P,
          baseClassName: x,
          maybePostfixModifierPosition: k,
        } = r(g);
      if (y) {
        d = g + (d.length > 0 ? ' ' + d : d);
        continue;
      }
      let C = !!k,
        E = o(C ? x.substring(0, k) : x);
      if (!E) {
        if (!C) {
          d = g + (d.length > 0 ? ' ' + d : d);
          continue;
        }
        if (((E = o(x)), !E)) {
          d = g + (d.length > 0 ? ' ' + d : d);
          continue;
        }
        C = !1;
      }
      const $ = i(S).join(':'),
        W = P ? $ + ge : $,
        N = W + E;
      if (l.includes(N)) continue;
      l.push(N);
      const T = n(E, C);
      for (let G = 0; G < T.length; ++G) {
        const D = T[G];
        l.push(W + D);
      }
      d = g + (d.length > 0 ? ' ' + d : d);
    }
    return d;
  };
function Fr() {
  let e = 0,
    t,
    r,
    o = '';
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = pr(t)) && (o && (o += ' '), (o += r));
  return o;
}
const pr = e => {
  if (typeof e == 'string') return e;
  let t,
    r = '';
  for (let o = 0; o < e.length; o++)
    e[o] && (t = pr(e[o])) && (r && (r += ' '), (r += t));
  return r;
};
function $r(e, ...t) {
  let r,
    o,
    n,
    i = l;
  function l(d) {
    const f = t.reduce((g, y) => y(g), e());
    return ((r = Br(f)), (o = r.cache.get), (n = r.cache.set), (i = p), p(d));
  }
  function p(d) {
    const f = o(d);
    if (f) return f;
    const g = Dr(d, r);
    return (n(d, g), g);
  }
  return function () {
    return i(Fr.apply(null, arguments));
  };
}
const b = e => {
    const t = r => r[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  fr = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  gr = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Ur = /^\d+\/\d+$/,
  qr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Hr =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Jr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Kr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Xr =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  j = e => Ur.test(e),
  m = e => !!e && !Number.isNaN(Number(e)),
  R = e => !!e && Number.isInteger(Number(e)),
  ue = e => e.endsWith('%') && m(e.slice(0, -1)),
  M = e => qr.test(e),
  Zr = () => !0,
  Qr = e => Hr.test(e) && !Jr.test(e),
  br = () => !1,
  Yr = e => Kr.test(e),
  eo = e => Xr.test(e),
  ro = e => !s(e) && !a(e),
  oo = e => O(e, vr, br),
  s = e => fr.test(e),
  _ = e => O(e, xr, Qr),
  me = e => O(e, io, m),
  Ge = e => O(e, hr, br),
  to = e => O(e, yr, eo),
  X = e => O(e, kr, Yr),
  a = e => gr.test(e),
  F = e => B(e, xr),
  no = e => B(e, lo),
  Ve = e => B(e, hr),
  so = e => B(e, vr),
  ao = e => B(e, yr),
  Z = e => B(e, kr, !0),
  O = (e, t, r) => {
    const o = fr.exec(e);
    return o ? (o[1] ? t(o[1]) : r(o[2])) : !1;
  },
  B = (e, t, r = !1) => {
    const o = gr.exec(e);
    return o ? (o[1] ? t(o[1]) : r) : !1;
  },
  hr = e => e === 'position' || e === 'percentage',
  yr = e => e === 'image' || e === 'url',
  vr = e => e === 'length' || e === 'size' || e === 'bg-size',
  xr = e => e === 'length',
  io = e => e === 'number',
  lo = e => e === 'family-name',
  kr = e => e === 'shadow',
  co = () => {
    const e = b('color'),
      t = b('font'),
      r = b('text'),
      o = b('font-weight'),
      n = b('tracking'),
      i = b('leading'),
      l = b('breakpoint'),
      p = b('container'),
      d = b('spacing'),
      f = b('radius'),
      g = b('shadow'),
      y = b('inset-shadow'),
      S = b('text-shadow'),
      P = b('drop-shadow'),
      x = b('blur'),
      k = b('perspective'),
      C = b('aspect'),
      E = b('ease'),
      $ = b('animate'),
      W = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      N = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      T = () => [...N(), a, s],
      G = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      D = () => ['auto', 'contain', 'none'],
      u = () => [a, s, d],
      A = () => [j, 'full', 'auto', ...u()],
      ve = () => [R, 'none', 'subgrid', a, s],
      xe = () => ['auto', { span: ['full', R, a, s] }, R, a, s],
      U = () => [R, 'auto', a, s],
      ke = () => ['auto', 'min', 'max', 'fr', a, s],
      le = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      L = () => [
        'start',
        'end',
        'center',
        'stretch',
        'center-safe',
        'end-safe',
      ],
      I = () => ['auto', ...u()],
      V = () => [
        j,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...u(),
      ],
      c = () => [e, a, s],
      we = () => [...N(), Ve, Ge, { position: [a, s] }],
      ze = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      Se = () => ['auto', 'cover', 'contain', so, oo, { size: [a, s] }],
      ce = () => [ue, F, _],
      v = () => ['', 'none', 'full', f, a, s],
      z = () => ['', m, F, _],
      q = () => ['solid', 'dashed', 'dotted', 'double'],
      Ce = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      h = () => [m, ue, Ve, Ge],
      Ae = () => ['', 'none', x, a, s],
      H = () => ['none', m, a, s],
      J = () => ['none', m, a, s],
      de = () => [m, a, s],
      K = () => [j, 'full', ...u()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [M],
        breakpoint: [M],
        color: [Zr],
        container: [M],
        'drop-shadow': [M],
        ease: ['in', 'out', 'in-out'],
        font: [ro],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [M],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [M],
        shadow: [M],
        spacing: ['px', m],
        text: [M],
        'text-shadow': [M],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', j, s, a, C] }],
        container: ['container'],
        columns: [{ columns: [m, s, a, p] }],
        'break-after': [{ 'break-after': W() }],
        'break-before': [{ 'break-before': W() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: T() }],
        overflow: [{ overflow: G() }],
        'overflow-x': [{ 'overflow-x': G() }],
        'overflow-y': [{ 'overflow-y': G() }],
        overscroll: [{ overscroll: D() }],
        'overscroll-x': [{ 'overscroll-x': D() }],
        'overscroll-y': [{ 'overscroll-y': D() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: A() }],
        'inset-x': [{ 'inset-x': A() }],
        'inset-y': [{ 'inset-y': A() }],
        start: [{ start: A() }],
        end: [{ end: A() }],
        top: [{ top: A() }],
        right: [{ right: A() }],
        bottom: [{ bottom: A() }],
        left: [{ left: A() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [R, 'auto', a, s] }],
        basis: [{ basis: [j, 'full', 'auto', p, ...u()] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [m, j, 'auto', 'initial', 'none', s] }],
        grow: [{ grow: ['', m, a, s] }],
        shrink: [{ shrink: ['', m, a, s] }],
        order: [{ order: [R, 'first', 'last', 'none', a, s] }],
        'grid-cols': [{ 'grid-cols': ve() }],
        'col-start-end': [{ col: xe() }],
        'col-start': [{ 'col-start': U() }],
        'col-end': [{ 'col-end': U() }],
        'grid-rows': [{ 'grid-rows': ve() }],
        'row-start-end': [{ row: xe() }],
        'row-start': [{ 'row-start': U() }],
        'row-end': [{ 'row-end': U() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': ke() }],
        'auto-rows': [{ 'auto-rows': ke() }],
        gap: [{ gap: u() }],
        'gap-x': [{ 'gap-x': u() }],
        'gap-y': [{ 'gap-y': u() }],
        'justify-content': [{ justify: [...le(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...L(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...L()] }],
        'align-content': [{ content: ['normal', ...le()] }],
        'align-items': [{ items: [...L(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...L(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': le() }],
        'place-items': [{ 'place-items': [...L(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...L()] }],
        p: [{ p: u() }],
        px: [{ px: u() }],
        py: [{ py: u() }],
        ps: [{ ps: u() }],
        pe: [{ pe: u() }],
        pt: [{ pt: u() }],
        pr: [{ pr: u() }],
        pb: [{ pb: u() }],
        pl: [{ pl: u() }],
        m: [{ m: I() }],
        mx: [{ mx: I() }],
        my: [{ my: I() }],
        ms: [{ ms: I() }],
        me: [{ me: I() }],
        mt: [{ mt: I() }],
        mr: [{ mr: I() }],
        mb: [{ mb: I() }],
        ml: [{ ml: I() }],
        'space-x': [{ 'space-x': u() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': u() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: V() }],
        w: [{ w: [p, 'screen', ...V()] }],
        'min-w': [{ 'min-w': [p, 'screen', 'none', ...V()] }],
        'max-w': [
          { 'max-w': [p, 'screen', 'none', 'prose', { screen: [l] }, ...V()] },
        ],
        h: [{ h: ['screen', 'lh', ...V()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...V()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...V()] }],
        'font-size': [{ text: ['base', r, F, _] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [o, a, me] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              ue,
              s,
            ],
          },
        ],
        'font-family': [{ font: [no, s, t] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [n, a, s] }],
        'line-clamp': [{ 'line-clamp': [m, 'none', a, me] }],
        leading: [{ leading: [i, ...u()] }],
        'list-image': [{ 'list-image': ['none', a, s] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', a, s] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: c() }],
        'text-color': [{ text: c() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...q(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: [m, 'from-font', 'auto', a, _] },
        ],
        'text-decoration-color': [{ decoration: c() }],
        'underline-offset': [{ 'underline-offset': [m, 'auto', a, s] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: u() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              a,
              s,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', a, s] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: we() }],
        'bg-repeat': [{ bg: ze() }],
        'bg-size': [{ bg: Se() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  R,
                  a,
                  s,
                ],
                radial: ['', a, s],
                conic: [R, a, s],
              },
              ao,
              to,
            ],
          },
        ],
        'bg-color': [{ bg: c() }],
        'gradient-from-pos': [{ from: ce() }],
        'gradient-via-pos': [{ via: ce() }],
        'gradient-to-pos': [{ to: ce() }],
        'gradient-from': [{ from: c() }],
        'gradient-via': [{ via: c() }],
        'gradient-to': [{ to: c() }],
        rounded: [{ rounded: v() }],
        'rounded-s': [{ 'rounded-s': v() }],
        'rounded-e': [{ 'rounded-e': v() }],
        'rounded-t': [{ 'rounded-t': v() }],
        'rounded-r': [{ 'rounded-r': v() }],
        'rounded-b': [{ 'rounded-b': v() }],
        'rounded-l': [{ 'rounded-l': v() }],
        'rounded-ss': [{ 'rounded-ss': v() }],
        'rounded-se': [{ 'rounded-se': v() }],
        'rounded-ee': [{ 'rounded-ee': v() }],
        'rounded-es': [{ 'rounded-es': v() }],
        'rounded-tl': [{ 'rounded-tl': v() }],
        'rounded-tr': [{ 'rounded-tr': v() }],
        'rounded-br': [{ 'rounded-br': v() }],
        'rounded-bl': [{ 'rounded-bl': v() }],
        'border-w': [{ border: z() }],
        'border-w-x': [{ 'border-x': z() }],
        'border-w-y': [{ 'border-y': z() }],
        'border-w-s': [{ 'border-s': z() }],
        'border-w-e': [{ 'border-e': z() }],
        'border-w-t': [{ 'border-t': z() }],
        'border-w-r': [{ 'border-r': z() }],
        'border-w-b': [{ 'border-b': z() }],
        'border-w-l': [{ 'border-l': z() }],
        'divide-x': [{ 'divide-x': z() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': z() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...q(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...q(), 'hidden', 'none'] }],
        'border-color': [{ border: c() }],
        'border-color-x': [{ 'border-x': c() }],
        'border-color-y': [{ 'border-y': c() }],
        'border-color-s': [{ 'border-s': c() }],
        'border-color-e': [{ 'border-e': c() }],
        'border-color-t': [{ 'border-t': c() }],
        'border-color-r': [{ 'border-r': c() }],
        'border-color-b': [{ 'border-b': c() }],
        'border-color-l': [{ 'border-l': c() }],
        'divide-color': [{ divide: c() }],
        'outline-style': [{ outline: [...q(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [m, a, s] }],
        'outline-w': [{ outline: ['', m, F, _] }],
        'outline-color': [{ outline: c() }],
        shadow: [{ shadow: ['', 'none', g, Z, X] }],
        'shadow-color': [{ shadow: c() }],
        'inset-shadow': [{ 'inset-shadow': ['none', y, Z, X] }],
        'inset-shadow-color': [{ 'inset-shadow': c() }],
        'ring-w': [{ ring: z() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: c() }],
        'ring-offset-w': [{ 'ring-offset': [m, _] }],
        'ring-offset-color': [{ 'ring-offset': c() }],
        'inset-ring-w': [{ 'inset-ring': z() }],
        'inset-ring-color': [{ 'inset-ring': c() }],
        'text-shadow': [{ 'text-shadow': ['none', S, Z, X] }],
        'text-shadow-color': [{ 'text-shadow': c() }],
        opacity: [{ opacity: [m, a, s] }],
        'mix-blend': [
          { 'mix-blend': [...Ce(), 'plus-darker', 'plus-lighter'] },
        ],
        'bg-blend': [{ 'bg-blend': Ce() }],
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        'mask-composite': [
          { mask: ['add', 'subtract', 'intersect', 'exclude'] },
        ],
        'mask-image-linear-pos': [{ 'mask-linear': [m] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': h() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': h() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': c() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': c() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': h() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': h() }],
        'mask-image-t-from-color': [{ 'mask-t-from': c() }],
        'mask-image-t-to-color': [{ 'mask-t-to': c() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': h() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': h() }],
        'mask-image-r-from-color': [{ 'mask-r-from': c() }],
        'mask-image-r-to-color': [{ 'mask-r-to': c() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': h() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': h() }],
        'mask-image-b-from-color': [{ 'mask-b-from': c() }],
        'mask-image-b-to-color': [{ 'mask-b-to': c() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': h() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': h() }],
        'mask-image-l-from-color': [{ 'mask-l-from': c() }],
        'mask-image-l-to-color': [{ 'mask-l-to': c() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': h() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': h() }],
        'mask-image-x-from-color': [{ 'mask-x-from': c() }],
        'mask-image-x-to-color': [{ 'mask-x-to': c() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': h() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': h() }],
        'mask-image-y-from-color': [{ 'mask-y-from': c() }],
        'mask-image-y-to-color': [{ 'mask-y-to': c() }],
        'mask-image-radial': [{ 'mask-radial': [a, s] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': h() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': h() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': c() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': c() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              { closest: ['side', 'corner'], farthest: ['side', 'corner'] },
            ],
          },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': N() }],
        'mask-image-conic-pos': [{ 'mask-conic': [m] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': h() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': h() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': c() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': c() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        'mask-position': [{ mask: we() }],
        'mask-repeat': [{ mask: ze() }],
        'mask-size': [{ mask: Se() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', a, s] }],
        filter: [{ filter: ['', 'none', a, s] }],
        blur: [{ blur: Ae() }],
        brightness: [{ brightness: [m, a, s] }],
        contrast: [{ contrast: [m, a, s] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', P, Z, X] }],
        'drop-shadow-color': [{ 'drop-shadow': c() }],
        grayscale: [{ grayscale: ['', m, a, s] }],
        'hue-rotate': [{ 'hue-rotate': [m, a, s] }],
        invert: [{ invert: ['', m, a, s] }],
        saturate: [{ saturate: [m, a, s] }],
        sepia: [{ sepia: ['', m, a, s] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', a, s] }],
        'backdrop-blur': [{ 'backdrop-blur': Ae() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [m, a, s] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [m, a, s] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', m, a, s] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [m, a, s] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', m, a, s] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [m, a, s] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [m, a, s] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', m, a, s] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': u() }],
        'border-spacing-x': [{ 'border-spacing-x': u() }],
        'border-spacing-y': [{ 'border-spacing-y': u() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              a,
              s,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [m, 'initial', a, s] }],
        ease: [{ ease: ['linear', 'initial', E, a, s] }],
        delay: [{ delay: [m, a, s] }],
        animate: [{ animate: ['none', $, a, s] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [k, a, s] }],
        'perspective-origin': [{ 'perspective-origin': T() }],
        rotate: [{ rotate: H() }],
        'rotate-x': [{ 'rotate-x': H() }],
        'rotate-y': [{ 'rotate-y': H() }],
        'rotate-z': [{ 'rotate-z': H() }],
        scale: [{ scale: J() }],
        'scale-x': [{ 'scale-x': J() }],
        'scale-y': [{ 'scale-y': J() }],
        'scale-z': [{ 'scale-z': J() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: de() }],
        'skew-x': [{ 'skew-x': de() }],
        'skew-y': [{ 'skew-y': de() }],
        transform: [{ transform: [a, s, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: T() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: K() }],
        'translate-x': [{ 'translate-x': K() }],
        'translate-y': [{ 'translate-y': K() }],
        'translate-z': [{ 'translate-z': K() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: c() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: c() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              a,
              s,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': u() }],
        'scroll-mx': [{ 'scroll-mx': u() }],
        'scroll-my': [{ 'scroll-my': u() }],
        'scroll-ms': [{ 'scroll-ms': u() }],
        'scroll-me': [{ 'scroll-me': u() }],
        'scroll-mt': [{ 'scroll-mt': u() }],
        'scroll-mr': [{ 'scroll-mr': u() }],
        'scroll-mb': [{ 'scroll-mb': u() }],
        'scroll-ml': [{ 'scroll-ml': u() }],
        'scroll-p': [{ 'scroll-p': u() }],
        'scroll-px': [{ 'scroll-px': u() }],
        'scroll-py': [{ 'scroll-py': u() }],
        'scroll-ps': [{ 'scroll-ps': u() }],
        'scroll-pe': [{ 'scroll-pe': u() }],
        'scroll-pt': [{ 'scroll-pt': u() }],
        'scroll-pr': [{ 'scroll-pr': u() }],
        'scroll-pb': [{ 'scroll-pb': u() }],
        'scroll-pl': [{ 'scroll-pl': u() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          { 'will-change': ['auto', 'scroll', 'contents', 'transform', a, s] },
        ],
        fill: [{ fill: ['none', ...c()] }],
        'stroke-w': [{ stroke: [m, F, _, me] }],
        stroke: [{ stroke: ['none', ...c()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  uo = $r(co);
function mo(...e) {
  return uo(ur(e));
}
const po = Pr(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);
function he({ className: e, variant: t, size: r, asChild: o = !1, ...n }) {
  const i = o ? Sr : 'button';
  return pe.jsx(i, {
    'data-slot': 'button',
    className: mo(po({ variant: t, size: r, className: e })),
    ...n,
  });
}
try {
  ((he.displayName = 'Button'),
    (he.__docgenInfo = {
      description: '',
      displayName: 'Button',
      props: {
        variant: {
          defaultValue: null,
          description: '',
          name: 'variant',
          required: !1,
          type: {
            name: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined',
          },
        },
        size: {
          defaultValue: null,
          description: '',
          name: 'size',
          required: !1,
          type: {
            name: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined',
          },
        },
        asChild: {
          defaultValue: { value: 'false' },
          description: '',
          name: 'asChild',
          required: !1,
          type: { name: 'boolean | undefined' },
        },
      },
    }));
} catch {}
const ho = {
    title: 'UI/Button',
    component: he,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link',
        ],
      },
      size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    },
  },
  Q = { args: { children: 'Button', variant: 'default' } },
  Y = { args: { children: 'Delete', variant: 'destructive' } },
  ee = { args: { children: 'Outline', variant: 'outline' } },
  re = { args: { children: 'Secondary', variant: 'secondary' } },
  oe = { args: { children: 'Ghost', variant: 'ghost' } },
  te = { args: { children: 'Link', variant: 'link' } },
  ne = { args: { children: 'Small', size: 'sm' } },
  se = { args: { children: 'Large', size: 'lg' } },
  ae = { args: { children: '🚀', size: 'icon' } },
  ie = { args: { children: 'Disabled', disabled: !0 } };
var _e, Ne, Te;
Q.parameters = {
  ...Q.parameters,
  docs: {
    ...((_e = Q.parameters) == null ? void 0 : _e.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Button',
    variant: 'default'
  }
}`,
      ...((Te = (Ne = Q.parameters) == null ? void 0 : Ne.docs) == null
        ? void 0
        : Te.source),
    },
  },
};
var Le, je, Oe;
Y.parameters = {
  ...Y.parameters,
  docs: {
    ...((Le = Y.parameters) == null ? void 0 : Le.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Delete',
    variant: 'destructive'
  }
}`,
      ...((Oe = (je = Y.parameters) == null ? void 0 : je.docs) == null
        ? void 0
        : Oe.source),
    },
  },
};
var Be, We, De;
ee.parameters = {
  ...ee.parameters,
  docs: {
    ...((Be = ee.parameters) == null ? void 0 : Be.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Outline',
    variant: 'outline'
  }
}`,
      ...((De = (We = ee.parameters) == null ? void 0 : We.docs) == null
        ? void 0
        : De.source),
    },
  },
};
var Fe, $e, Ue;
re.parameters = {
  ...re.parameters,
  docs: {
    ...((Fe = re.parameters) == null ? void 0 : Fe.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}`,
      ...((Ue = ($e = re.parameters) == null ? void 0 : $e.docs) == null
        ? void 0
        : Ue.source),
    },
  },
};
var qe, He, Je;
oe.parameters = {
  ...oe.parameters,
  docs: {
    ...((qe = oe.parameters) == null ? void 0 : qe.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
}`,
      ...((Je = (He = oe.parameters) == null ? void 0 : He.docs) == null
        ? void 0
        : Je.source),
    },
  },
};
var Ke, Xe, Ze;
te.parameters = {
  ...te.parameters,
  docs: {
    ...((Ke = te.parameters) == null ? void 0 : Ke.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Link',
    variant: 'link'
  }
}`,
      ...((Ze = (Xe = te.parameters) == null ? void 0 : Xe.docs) == null
        ? void 0
        : Ze.source),
    },
  },
};
var Qe, Ye, er;
ne.parameters = {
  ...ne.parameters,
  docs: {
    ...((Qe = ne.parameters) == null ? void 0 : Qe.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Small',
    size: 'sm'
  }
}`,
      ...((er = (Ye = ne.parameters) == null ? void 0 : Ye.docs) == null
        ? void 0
        : er.source),
    },
  },
};
var rr, or, tr;
se.parameters = {
  ...se.parameters,
  docs: {
    ...((rr = se.parameters) == null ? void 0 : rr.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Large',
    size: 'lg'
  }
}`,
      ...((tr = (or = se.parameters) == null ? void 0 : or.docs) == null
        ? void 0
        : tr.source),
    },
  },
};
var nr, sr, ar;
ae.parameters = {
  ...ae.parameters,
  docs: {
    ...((nr = ae.parameters) == null ? void 0 : nr.docs),
    source: {
      originalSource: `{
  args: {
    children: '🚀',
    size: 'icon'
  }
}`,
      ...((ar = (sr = ae.parameters) == null ? void 0 : sr.docs) == null
        ? void 0
        : ar.source),
    },
  },
};
var ir, lr, cr;
ie.parameters = {
  ...ie.parameters,
  docs: {
    ...((ir = ie.parameters) == null ? void 0 : ir.docs),
    source: {
      originalSource: `{
  args: {
    children: 'Disabled',
    disabled: true
  }
}`,
      ...((cr = (lr = ie.parameters) == null ? void 0 : lr.docs) == null
        ? void 0
        : cr.source),
    },
  },
};
const yo = [
  'Default',
  'Destructive',
  'Outline',
  'Secondary',
  'Ghost',
  'Link',
  'Small',
  'Large',
  'Icon',
  'Disabled',
];
export {
  Q as Default,
  Y as Destructive,
  ie as Disabled,
  oe as Ghost,
  ae as Icon,
  se as Large,
  te as Link,
  ee as Outline,
  re as Secondary,
  ne as Small,
  yo as __namedExportsOrder,
  ho as default,
};
