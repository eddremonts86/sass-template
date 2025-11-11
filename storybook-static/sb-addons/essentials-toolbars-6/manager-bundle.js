try {
  (() => {
    var l = __REACT__,
      {
        Children: ae,
        Component: ie,
        Fragment: ue,
        Profiler: ce,
        PureComponent: de,
        StrictMode: _e,
        Suspense: pe,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: me,
        cloneElement: Te,
        createContext: Ee,
        createElement: Se,
        createFactory: be,
        createRef: Ie,
        forwardRef: Ce,
        isValidElement: ye,
        lazy: Ae,
        memo: Oe,
        startTransition: Re,
        unstable_act: Pe,
        useCallback: C,
        useContext: ke,
        useDebugValue: Ne,
        useDeferredValue: Le,
        useEffect: k,
        useId: xe,
        useImperativeHandle: ve,
        useInsertionEffect: fe,
        useLayoutEffect: Ue,
        useMemo: he,
        useReducer: ge,
        useRef: f,
        useState: U,
        useSyncExternalStore: Be,
        useTransition: De,
        version: He,
      } = __REACT__;
    var Ke = __STORYBOOK_API__,
      {
        ActiveTabs: Ve,
        Consumer: Fe,
        ManagerContext: We,
        Provider: Xe,
        RequestResponseError: we,
        addons: N,
        combineParameters: $e,
        controlOrMetaKey: qe,
        controlOrMetaSymbol: Je,
        eventMatchesShortcut: ze,
        eventToShortcut: Ze,
        experimental_MockUniversalStore: Qe,
        experimental_UniversalStore: et,
        experimental_requestResponse: tt,
        experimental_useUniversalStore: ot,
        isMacLike: rt,
        isShortcutTaken: nt,
        keyToSymbol: lt,
        merge: st,
        mockChannel: at,
        optionOrAltSymbol: it,
        shortcutMatchesShortcut: ut,
        shortcutToHumanString: ct,
        types: h,
        useAddonState: dt,
        useArgTypes: _t,
        useArgs: pt,
        useChannel: mt,
        useGlobalTypes: g,
        useGlobals: L,
        useParameter: Tt,
        useSharedState: Et,
        useStoryPrepared: St,
        useStorybookApi: B,
        useStorybookState: bt,
      } = __STORYBOOK_API__;
    var Ot = __STORYBOOK_COMPONENTS__,
      {
        A: Rt,
        ActionBar: Pt,
        AddonPanel: kt,
        Badge: Nt,
        Bar: Lt,
        Blockquote: xt,
        Button: vt,
        ClipboardCode: ft,
        Code: Ut,
        DL: ht,
        Div: gt,
        DocumentWrapper: Bt,
        EmptyTabContent: Dt,
        ErrorFormatter: Ht,
        FlexBar: Mt,
        Form: Yt,
        H1: jt,
        H2: Gt,
        H3: Kt,
        H4: Vt,
        H5: Ft,
        H6: Wt,
        HR: Xt,
        IconButton: D,
        IconButtonSkeleton: wt,
        Icons: x,
        Img: $t,
        LI: qt,
        Link: Jt,
        ListItem: zt,
        Loader: Zt,
        Modal: Qt,
        OL: eo,
        P: to,
        Placeholder: oo,
        Pre: ro,
        ProgressSpinner: no,
        ResetWrapper: lo,
        ScrollArea: so,
        Separator: H,
        Spaced: ao,
        Span: io,
        StorybookIcon: uo,
        StorybookLogo: co,
        Symbols: _o,
        SyntaxHighlighter: po,
        TT: mo,
        TabBar: To,
        TabButton: Eo,
        TabWrapper: So,
        Table: bo,
        Tabs: Io,
        TabsState: Co,
        TooltipLinkList: M,
        TooltipMessage: yo,
        TooltipNote: Ao,
        UL: Oo,
        WithTooltip: Y,
        WithTooltipPure: Ro,
        Zoom: Po,
        codeCommon: ko,
        components: No,
        createCopyToClipboardFunction: Lo,
        getStoryHref: xo,
        icons: vo,
        interleaveSeparators: fo,
        nameSpaceClassNames: Uo,
        resetComponents: ho,
        withReset: go,
      } = __STORYBOOK_COMPONENTS__;
    var V = { type: 'item', value: '' },
      F = (o, t) => ({
        ...t,
        name: t.name || o,
        description: t.description || o,
        toolbar: {
          ...t.toolbar,
          items: t.toolbar.items.map(e => {
            let r = typeof e == 'string' ? { value: e, title: e } : e;
            return (
              r.type === 'reset' &&
                t.toolbar.icon &&
                ((r.icon = t.toolbar.icon), (r.hideIcon = !0)),
              { ...V, ...r }
            );
          }),
        },
      }),
      W = ['reset'],
      X = o => o.filter(t => !W.includes(t.type)).map(t => t.value),
      T = 'addon-toolbars',
      w = async (o, t, e) => {
        (e &&
          e.next &&
          (await o.setAddonShortcut(T, {
            label: e.next.label,
            defaultShortcut: e.next.keys,
            actionName: `${t}:next`,
            action: e.next.action,
          })),
          e &&
            e.previous &&
            (await o.setAddonShortcut(T, {
              label: e.previous.label,
              defaultShortcut: e.previous.keys,
              actionName: `${t}:previous`,
              action: e.previous.action,
            })),
          e &&
            e.reset &&
            (await o.setAddonShortcut(T, {
              label: e.reset.label,
              defaultShortcut: e.reset.keys,
              actionName: `${t}:reset`,
              action: e.reset.action,
            })));
      },
      $ = o => t => {
        let {
            id: e,
            toolbar: { items: r, shortcuts: n },
          } = t,
          c = B(),
          [E, i] = L(),
          s = f([]),
          u = E[e],
          y = C(() => {
            i({ [e]: '' });
          }, [i]),
          A = C(() => {
            let a = s.current,
              _ = a.indexOf(u),
              p = _ === a.length - 1 ? 0 : _ + 1,
              d = s.current[p];
            i({ [e]: d });
          }, [s, u, i]),
          O = C(() => {
            let a = s.current,
              _ = a.indexOf(u),
              p = _ > -1 ? _ : 0,
              d = p === 0 ? a.length - 1 : p - 1,
              m = s.current[d];
            i({ [e]: m });
          }, [s, u, i]);
        return (
          k(() => {
            n &&
              w(c, e, {
                next: { ...n.next, action: A },
                previous: { ...n.previous, action: O },
                reset: { ...n.reset, action: y },
              });
          }, [c, e, n, A, O, y]),
          k(() => {
            s.current = X(r);
          }, []),
          l.createElement(o, { cycleValues: s.current, ...t })
        );
      },
      j = ({ currentValue: o, items: t }) =>
        o != null && t.find(e => e.value === o && e.type !== 'reset'),
      q = ({ currentValue: o, items: t }) => {
        let e = j({ currentValue: o, items: t });
        if (e) return e.icon;
      },
      J = ({ currentValue: o, items: t }) => {
        let e = j({ currentValue: o, items: t });
        if (e) return e.title;
      },
      z = ({
        active: o,
        disabled: t,
        title: e,
        icon: r,
        description: n,
        onClick: c,
      }) =>
        l.createElement(
          D,
          { active: o, title: n, disabled: t, onClick: t ? () => {} : c },
          r &&
            l.createElement(x, { icon: r, __suppressDeprecationWarning: !0 }),
          e ? `\xA0${e}` : null
        ),
      Z = ({
        right: o,
        title: t,
        value: e,
        icon: r,
        hideIcon: n,
        onClick: c,
        disabled: E,
        currentValue: i,
      }) => {
        let s =
            r &&
            l.createElement(x, {
              style: { opacity: 1 },
              icon: r,
              __suppressDeprecationWarning: !0,
            }),
          u = {
            id: e ?? '_reset',
            active: i === e,
            right: o,
            title: t,
            disabled: E,
            onClick: c,
          };
        return (r && !n && (u.icon = s), u);
      },
      Q = $(
        ({
          id: o,
          name: t,
          description: e,
          toolbar: {
            icon: r,
            items: n,
            title: c,
            preventDynamicIcon: E,
            dynamicTitle: i,
          },
        }) => {
          let [s, u, y] = L(),
            [A, O] = U(!1),
            a = s[o],
            _ = !!a,
            p = o in y,
            d = r,
            m = c;
          (E || (d = q({ currentValue: a, items: n }) || d),
            i && (m = J({ currentValue: a, items: n }) || m),
            !m && !d && console.warn(`Toolbar '${t}' has no title or icon`));
          let G = C(
            P => {
              u({ [o]: P });
            },
            [o, u]
          );
          return l.createElement(
            Y,
            {
              placement: 'top',
              tooltip: ({ onHide: P }) => {
                let K = n
                  .filter(({ type: R }) => {
                    let v = !0;
                    return (R === 'reset' && !a && (v = !1), v);
                  })
                  .map(R =>
                    Z({
                      ...R,
                      currentValue: a,
                      disabled: p,
                      onClick: () => {
                        (G(R.value), P());
                      },
                    })
                  );
                return l.createElement(M, { links: K });
              },
              closeOnOutsideClick: !0,
              onVisibleChange: O,
            },
            l.createElement(z, {
              active: A || _,
              disabled: p,
              description: e || '',
              icon: d,
              title: m || '',
            })
          );
        }
      ),
      ee = () => {
        let o = g(),
          t = Object.keys(o).filter(e => !!o[e].toolbar);
        return t.length
          ? l.createElement(
              l.Fragment,
              null,
              l.createElement(H, null),
              t.map(e => {
                let r = F(e, o[e]);
                return l.createElement(Q, { key: e, id: e, ...r });
              })
            )
          : null;
      };
    N.register(T, () =>
      N.add(T, {
        title: T,
        type: h.TOOL,
        match: ({ tabId: o }) => !o,
        render: () => l.createElement(ee, null),
      })
    );
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e
  );
}
