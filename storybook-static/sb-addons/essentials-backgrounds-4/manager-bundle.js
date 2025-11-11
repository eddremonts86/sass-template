try {
  (() => {
    var re = Object.create;
    var W = Object.defineProperty;
    var ie = Object.getOwnPropertyDescriptor;
    var ae = Object.getOwnPropertyNames;
    var ce = Object.getPrototypeOf,
      se = Object.prototype.hasOwnProperty;
    var v = (e =>
      typeof require < 'u'
        ? require
        : typeof Proxy < 'u'
          ? new Proxy(e, {
              get: (o, c) => (typeof require < 'u' ? require : o)[c],
            })
          : e)(function (e) {
      if (typeof require < 'u') return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var w = (e, o) => () => (e && (o = e((e = 0))), o);
    var le = (e, o) => () => (
      o || e((o = { exports: {} }).exports, o),
      o.exports
    );
    var ue = (e, o, c, r) => {
      if ((o && typeof o == 'object') || typeof o == 'function')
        for (let i of ae(o))
          !se.call(e, i) &&
            i !== c &&
            W(e, i, {
              get: () => o[i],
              enumerable: !(r = ie(o, i)) || r.enumerable,
            });
      return e;
    };
    var Ie = (e, o, c) => (
      (c = e != null ? re(ce(e)) : {}),
      ue(
        o || !e || !e.__esModule
          ? W(c, 'default', { value: e, enumerable: !0 })
          : c,
        e
      )
    );
    var p = w(() => {});
    var h = w(() => {});
    var f = w(() => {});
    var Q = le((J, q) => {
      p();
      h();
      f();
      (function (e) {
        if (typeof J == 'object' && typeof q < 'u') q.exports = e();
        else if (typeof define == 'function' && define.amd) define([], e);
        else {
          var o;
          (typeof window < 'u' || typeof window < 'u'
            ? (o = window)
            : typeof self < 'u'
              ? (o = self)
              : (o = this),
            (o.memoizerific = e()));
        }
      })(function () {
        var e, o, c;
        return (function r(i, d, s) {
          function n(a, I) {
            if (!d[a]) {
              if (!i[a]) {
                var l = typeof v == 'function' && v;
                if (!I && l) return l(a, !0);
                if (t) return t(a, !0);
                var b = new Error("Cannot find module '" + a + "'");
                throw ((b.code = 'MODULE_NOT_FOUND'), b);
              }
              var m = (d[a] = { exports: {} });
              i[a][0].call(
                m.exports,
                function (_) {
                  var S = i[a][1][_];
                  return n(S || _);
                },
                m,
                m.exports,
                r,
                i,
                d,
                s
              );
            }
            return d[a].exports;
          }
          for (var t = typeof v == 'function' && v, u = 0; u < s.length; u++)
            n(s[u]);
          return n;
        })(
          {
            1: [
              function (r, i, d) {
                i.exports = function (s) {
                  if (typeof Map != 'function' || s) {
                    var n = r('./similar');
                    return new n();
                  } else return new Map();
                };
              },
              { './similar': 2 },
            ],
            2: [
              function (r, i, d) {
                function s() {
                  return (
                    (this.list = []),
                    (this.lastItem = void 0),
                    (this.size = 0),
                    this
                  );
                }
                ((s.prototype.get = function (n) {
                  var t;
                  if (this.lastItem && this.isEqual(this.lastItem.key, n))
                    return this.lastItem.val;
                  if (((t = this.indexOf(n)), t >= 0))
                    return ((this.lastItem = this.list[t]), this.list[t].val);
                }),
                  (s.prototype.set = function (n, t) {
                    var u;
                    return this.lastItem && this.isEqual(this.lastItem.key, n)
                      ? ((this.lastItem.val = t), this)
                      : ((u = this.indexOf(n)),
                        u >= 0
                          ? ((this.lastItem = this.list[u]),
                            (this.list[u].val = t),
                            this)
                          : ((this.lastItem = { key: n, val: t }),
                            this.list.push(this.lastItem),
                            this.size++,
                            this));
                  }),
                  (s.prototype.delete = function (n) {
                    var t;
                    if (
                      (this.lastItem &&
                        this.isEqual(this.lastItem.key, n) &&
                        (this.lastItem = void 0),
                      (t = this.indexOf(n)),
                      t >= 0)
                    )
                      return (this.size--, this.list.splice(t, 1)[0]);
                  }),
                  (s.prototype.has = function (n) {
                    var t;
                    return this.lastItem && this.isEqual(this.lastItem.key, n)
                      ? !0
                      : ((t = this.indexOf(n)),
                        t >= 0 ? ((this.lastItem = this.list[t]), !0) : !1);
                  }),
                  (s.prototype.forEach = function (n, t) {
                    var u;
                    for (u = 0; u < this.size; u++)
                      n.call(
                        t || this,
                        this.list[u].val,
                        this.list[u].key,
                        this
                      );
                  }),
                  (s.prototype.indexOf = function (n) {
                    var t;
                    for (t = 0; t < this.size; t++)
                      if (this.isEqual(this.list[t].key, n)) return t;
                    return -1;
                  }),
                  (s.prototype.isEqual = function (n, t) {
                    return n === t || (n !== n && t !== t);
                  }),
                  (i.exports = s));
              },
              {},
            ],
            3: [
              function (r, i, d) {
                var s = r('map-or-similar');
                i.exports = function (a) {
                  var I = new s(!1),
                    l = [];
                  return function (b) {
                    var m = function () {
                      var _ = I,
                        S,
                        P,
                        k = arguments.length - 1,
                        B = Array(k + 1),
                        O = !0,
                        A;
                      if ((m.numArgs || m.numArgs === 0) && m.numArgs !== k + 1)
                        throw new Error(
                          'Memoizerific functions should always be called with the same number of arguments'
                        );
                      for (A = 0; A < k; A++) {
                        if (
                          ((B[A] = { cacheItem: _, arg: arguments[A] }),
                          _.has(arguments[A]))
                        ) {
                          _ = _.get(arguments[A]);
                          continue;
                        }
                        ((O = !1),
                          (S = new s(!1)),
                          _.set(arguments[A], S),
                          (_ = S));
                      }
                      return (
                        O &&
                          (_.has(arguments[k])
                            ? (P = _.get(arguments[k]))
                            : (O = !1)),
                        O ||
                          ((P = b.apply(null, arguments)),
                          _.set(arguments[k], P)),
                        a > 0 &&
                          ((B[k] = { cacheItem: _, arg: arguments[k] }),
                          O ? n(l, B) : l.push(B),
                          l.length > a && t(l.shift())),
                        (m.wasMemoized = O),
                        (m.numArgs = k + 1),
                        P
                      );
                    };
                    return (
                      (m.limit = a),
                      (m.wasMemoized = !1),
                      (m.cache = I),
                      (m.lru = l),
                      m
                    );
                  };
                };
                function n(a, I) {
                  var l = a.length,
                    b = I.length,
                    m,
                    _,
                    S;
                  for (_ = 0; _ < l; _++) {
                    for (m = !0, S = 0; S < b; S++)
                      if (!u(a[_][S].arg, I[S].arg)) {
                        m = !1;
                        break;
                      }
                    if (m) break;
                  }
                  a.push(a.splice(_, 1)[0]);
                }
                function t(a) {
                  var I = a.length,
                    l = a[I - 1],
                    b,
                    m;
                  for (
                    l.cacheItem.delete(l.arg), m = I - 2;
                    m >= 0 &&
                    ((l = a[m]), (b = l.cacheItem.get(l.arg)), !b || !b.size);
                    m--
                  )
                    l.cacheItem.delete(l.arg);
                }
                function u(a, I) {
                  return a === I || (a !== a && I !== I);
                }
              },
              { 'map-or-similar': 1 },
            ],
          },
          {},
          [3]
        )(3);
      });
    });
    p();
    h();
    f();
    p();
    h();
    f();
    p();
    h();
    f();
    p();
    h();
    f();
    var g = __REACT__,
      {
        Children: ve,
        Component: Re,
        Fragment: N,
        Profiler: Le,
        PureComponent: Pe,
        StrictMode: Be,
        Suspense: xe,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Ue,
        cloneElement: we,
        createContext: Ne,
        createElement: De,
        createFactory: Ge,
        createRef: Me,
        forwardRef: He,
        isValidElement: Fe,
        lazy: Ye,
        memo: R,
        startTransition: Ke,
        unstable_act: je,
        useCallback: D,
        useContext: qe,
        useDebugValue: Ve,
        useDeferredValue: We,
        useEffect: ze,
        useId: Xe,
        useImperativeHandle: Ze,
        useInsertionEffect: $e,
        useLayoutEffect: Je,
        useMemo: z,
        useReducer: Qe,
        useRef: eo,
        useState: G,
        useSyncExternalStore: oo,
        useTransition: to,
        version: no,
      } = __REACT__;
    p();
    h();
    f();
    var so = __STORYBOOK_API__,
      {
        ActiveTabs: lo,
        Consumer: uo,
        ManagerContext: Io,
        Provider: mo,
        RequestResponseError: po,
        addons: M,
        combineParameters: ho,
        controlOrMetaKey: fo,
        controlOrMetaSymbol: go,
        eventMatchesShortcut: _o,
        eventToShortcut: bo,
        experimental_MockUniversalStore: So,
        experimental_UniversalStore: Co,
        experimental_requestResponse: Eo,
        experimental_useUniversalStore: To,
        isMacLike: yo,
        isShortcutTaken: ko,
        keyToSymbol: Ao,
        merge: Oo,
        mockChannel: vo,
        optionOrAltSymbol: Ro,
        shortcutMatchesShortcut: Lo,
        shortcutToHumanString: Po,
        types: X,
        useAddonState: Bo,
        useArgTypes: xo,
        useArgs: Uo,
        useChannel: wo,
        useGlobalTypes: No,
        useGlobals: x,
        useParameter: U,
        useSharedState: Do,
        useStoryPrepared: Go,
        useStorybookApi: Mo,
        useStorybookState: Ho,
      } = __STORYBOOK_API__;
    p();
    h();
    f();
    var qo = __STORYBOOK_COMPONENTS__,
      {
        A: Vo,
        ActionBar: Wo,
        AddonPanel: zo,
        Badge: Xo,
        Bar: Zo,
        Blockquote: $o,
        Button: Jo,
        ClipboardCode: Qo,
        Code: et,
        DL: ot,
        Div: tt,
        DocumentWrapper: nt,
        EmptyTabContent: rt,
        ErrorFormatter: it,
        FlexBar: at,
        Form: ct,
        H1: st,
        H2: lt,
        H3: ut,
        H4: It,
        H5: dt,
        H6: mt,
        HR: pt,
        IconButton: L,
        IconButtonSkeleton: ht,
        Icons: ft,
        Img: gt,
        LI: _t,
        Link: bt,
        ListItem: St,
        Loader: Ct,
        Modal: Et,
        OL: Tt,
        P: yt,
        Placeholder: kt,
        Pre: At,
        ProgressSpinner: Ot,
        ResetWrapper: vt,
        ScrollArea: Rt,
        Separator: Lt,
        Spaced: Pt,
        Span: Bt,
        StorybookIcon: xt,
        StorybookLogo: Ut,
        Symbols: wt,
        SyntaxHighlighter: Nt,
        TT: Dt,
        TabBar: Gt,
        TabButton: Mt,
        TabWrapper: Ht,
        Table: Ft,
        Tabs: Yt,
        TabsState: Kt,
        TooltipLinkList: H,
        TooltipMessage: jt,
        TooltipNote: qt,
        UL: Vt,
        WithTooltip: F,
        WithTooltipPure: Wt,
        Zoom: zt,
        codeCommon: Xt,
        components: Zt,
        createCopyToClipboardFunction: $t,
        getStoryHref: Jt,
        icons: Qt,
        interleaveSeparators: en,
        nameSpaceClassNames: on,
        resetComponents: tn,
        withReset: nn,
      } = __STORYBOOK_COMPONENTS__;
    p();
    h();
    f();
    var ln = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: un,
        AccessibilityIcon: In,
        AccessibilityIgnoredIcon: dn,
        AddIcon: mn,
        AdminIcon: pn,
        AlertAltIcon: hn,
        AlertIcon: fn,
        AlignLeftIcon: gn,
        AlignRightIcon: _n,
        AppleIcon: bn,
        ArrowBottomLeftIcon: Sn,
        ArrowBottomRightIcon: Cn,
        ArrowDownIcon: En,
        ArrowLeftIcon: Tn,
        ArrowRightIcon: yn,
        ArrowSolidDownIcon: kn,
        ArrowSolidLeftIcon: An,
        ArrowSolidRightIcon: On,
        ArrowSolidUpIcon: vn,
        ArrowTopLeftIcon: Rn,
        ArrowTopRightIcon: Ln,
        ArrowUpIcon: Pn,
        AzureDevOpsIcon: Bn,
        BackIcon: xn,
        BasketIcon: Un,
        BatchAcceptIcon: wn,
        BatchDenyIcon: Nn,
        BeakerIcon: Dn,
        BellIcon: Gn,
        BitbucketIcon: Mn,
        BoldIcon: Hn,
        BookIcon: Fn,
        BookmarkHollowIcon: Yn,
        BookmarkIcon: Kn,
        BottomBarIcon: jn,
        BottomBarToggleIcon: qn,
        BoxIcon: Vn,
        BranchIcon: Wn,
        BrowserIcon: zn,
        ButtonIcon: Xn,
        CPUIcon: Zn,
        CalendarIcon: $n,
        CameraIcon: Jn,
        CameraStabilizeIcon: Qn,
        CategoryIcon: er,
        CertificateIcon: or,
        ChangedIcon: tr,
        ChatIcon: nr,
        CheckIcon: rr,
        ChevronDownIcon: ir,
        ChevronLeftIcon: ar,
        ChevronRightIcon: cr,
        ChevronSmallDownIcon: sr,
        ChevronSmallLeftIcon: lr,
        ChevronSmallRightIcon: ur,
        ChevronSmallUpIcon: Ir,
        ChevronUpIcon: dr,
        ChromaticIcon: mr,
        ChromeIcon: pr,
        CircleHollowIcon: hr,
        CircleIcon: Z,
        ClearIcon: fr,
        CloseAltIcon: gr,
        CloseIcon: _r,
        CloudHollowIcon: br,
        CloudIcon: Sr,
        CogIcon: Cr,
        CollapseIcon: Er,
        CommandIcon: Tr,
        CommentAddIcon: yr,
        CommentIcon: kr,
        CommentsIcon: Ar,
        CommitIcon: Or,
        CompassIcon: vr,
        ComponentDrivenIcon: Rr,
        ComponentIcon: Lr,
        ContrastIcon: Pr,
        ContrastIgnoredIcon: Br,
        ControlsIcon: xr,
        CopyIcon: Ur,
        CreditIcon: wr,
        CrossIcon: Nr,
        DashboardIcon: Dr,
        DatabaseIcon: Gr,
        DeleteIcon: Mr,
        DiamondIcon: Hr,
        DirectionIcon: Fr,
        DiscordIcon: Yr,
        DocChartIcon: Kr,
        DocListIcon: jr,
        DocumentIcon: qr,
        DownloadIcon: Vr,
        DragIcon: Wr,
        EditIcon: zr,
        EllipsisIcon: Xr,
        EmailIcon: Zr,
        ExpandAltIcon: $r,
        ExpandIcon: Jr,
        EyeCloseIcon: Qr,
        EyeIcon: ei,
        FaceHappyIcon: oi,
        FaceNeutralIcon: ti,
        FaceSadIcon: ni,
        FacebookIcon: ri,
        FailedIcon: ii,
        FastForwardIcon: ai,
        FigmaIcon: ci,
        FilterIcon: si,
        FlagIcon: li,
        FolderIcon: ui,
        FormIcon: Ii,
        GDriveIcon: di,
        GithubIcon: mi,
        GitlabIcon: pi,
        GlobeIcon: hi,
        GoogleIcon: fi,
        GraphBarIcon: gi,
        GraphLineIcon: _i,
        GraphqlIcon: bi,
        GridAltIcon: Si,
        GridIcon: Y,
        GrowIcon: Ci,
        HeartHollowIcon: Ei,
        HeartIcon: Ti,
        HomeIcon: yi,
        HourglassIcon: ki,
        InfoIcon: Ai,
        ItalicIcon: Oi,
        JumpToIcon: vi,
        KeyIcon: Ri,
        LightningIcon: Li,
        LightningOffIcon: Pi,
        LinkBrokenIcon: Bi,
        LinkIcon: xi,
        LinkedinIcon: Ui,
        LinuxIcon: wi,
        ListOrderedIcon: Ni,
        ListUnorderedIcon: Di,
        LocationIcon: Gi,
        LockIcon: Mi,
        MarkdownIcon: Hi,
        MarkupIcon: Fi,
        MediumIcon: Yi,
        MemoryIcon: Ki,
        MenuIcon: ji,
        MergeIcon: qi,
        MirrorIcon: Vi,
        MobileIcon: Wi,
        MoonIcon: zi,
        NutIcon: Xi,
        OutboxIcon: Zi,
        OutlineIcon: $i,
        PaintBrushIcon: Ji,
        PaperClipIcon: Qi,
        ParagraphIcon: ea,
        PassedIcon: oa,
        PhoneIcon: ta,
        PhotoDragIcon: na,
        PhotoIcon: K,
        PhotoStabilizeIcon: ra,
        PinAltIcon: ia,
        PinIcon: aa,
        PlayAllHollowIcon: ca,
        PlayBackIcon: sa,
        PlayHollowIcon: la,
        PlayIcon: ua,
        PlayNextIcon: Ia,
        PlusIcon: da,
        PointerDefaultIcon: ma,
        PointerHandIcon: pa,
        PowerIcon: ha,
        PrintIcon: fa,
        ProceedIcon: ga,
        ProfileIcon: _a,
        PullRequestIcon: ba,
        QuestionIcon: Sa,
        RSSIcon: Ca,
        RedirectIcon: Ea,
        ReduxIcon: Ta,
        RefreshIcon: $,
        ReplyIcon: ya,
        RepoIcon: ka,
        RequestChangeIcon: Aa,
        RewindIcon: Oa,
        RulerIcon: va,
        SaveIcon: Ra,
        SearchIcon: La,
        ShareAltIcon: Pa,
        ShareIcon: Ba,
        ShieldIcon: xa,
        SideBySideIcon: Ua,
        SidebarAltIcon: wa,
        SidebarAltToggleIcon: Na,
        SidebarIcon: Da,
        SidebarToggleIcon: Ga,
        SpeakerIcon: Ma,
        StackedIcon: Ha,
        StarHollowIcon: Fa,
        StarIcon: Ya,
        StatusFailIcon: Ka,
        StatusIcon: ja,
        StatusPassIcon: qa,
        StatusWarnIcon: Va,
        StickerIcon: Wa,
        StopAltHollowIcon: za,
        StopAltIcon: Xa,
        StopIcon: Za,
        StorybookIcon: $a,
        StructureIcon: Ja,
        SubtractIcon: Qa,
        SunIcon: ec,
        SupportIcon: oc,
        SweepIcon: tc,
        SwitchAltIcon: nc,
        SyncIcon: rc,
        TabletIcon: ic,
        ThumbsUpIcon: ac,
        TimeIcon: cc,
        TimerIcon: sc,
        TransferIcon: lc,
        TrashIcon: uc,
        TwitterIcon: Ic,
        TypeIcon: dc,
        UbuntuIcon: mc,
        UndoIcon: pc,
        UnfoldIcon: hc,
        UnlockIcon: fc,
        UnpinIcon: gc,
        UploadIcon: _c,
        UserAddIcon: bc,
        UserAltIcon: Sc,
        UserIcon: Cc,
        UsersIcon: Ec,
        VSCodeIcon: Tc,
        VerifiedIcon: yc,
        VideoIcon: kc,
        WandIcon: Ac,
        WatchIcon: Oc,
        WindowsIcon: vc,
        WrenchIcon: Rc,
        XIcon: Lc,
        YoutubeIcon: Pc,
        ZoomIcon: Bc,
        ZoomOutIcon: xc,
        ZoomResetIcon: Uc,
        iconList: wc,
      } = __STORYBOOK_ICONS__;
    p();
    h();
    f();
    var Hc = __STORYBOOK_CLIENT_LOGGER__,
      {
        deprecate: Fc,
        logger: j,
        once: Yc,
        pretty: Kc,
      } = __STORYBOOK_CLIENT_LOGGER__;
    var V = Ie(Q());
    p();
    h();
    f();
    var Jc = __STORYBOOK_THEMING__,
      {
        CacheProvider: Qc,
        ClassNames: es,
        Global: os,
        ThemeProvider: ts,
        background: ns,
        color: rs,
        convert: is,
        create: as,
        createCache: cs,
        createGlobal: ss,
        createReset: ls,
        css: us,
        darken: Is,
        ensure: ds,
        ignoreSsrWarning: ms,
        isPropValid: ps,
        jsx: hs,
        keyframes: fs,
        lighten: gs,
        styled: ee,
        themes: _s,
        typography: bs,
        useTheme: Ss,
        withTheme: Cs,
      } = __STORYBOOK_THEMING__;
    p();
    h();
    f();
    function oe(e) {
      for (var o = [], c = 1; c < arguments.length; c++)
        o[c - 1] = arguments[c];
      var r = Array.from(typeof e == 'string' ? [e] : e);
      r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, '');
      var i = r.reduce(function (n, t) {
        var u = t.match(/\n([\t ]+|(?!\s).)/g);
        return u
          ? n.concat(
              u.map(function (a) {
                var I, l;
                return (l =
                  (I = a.match(/[\t ]/g)) === null || I === void 0
                    ? void 0
                    : I.length) !== null && l !== void 0
                  ? l
                  : 0;
              })
            )
          : n;
      }, []);
      if (i.length) {
        var d = new RegExp(
          `
[	 ]{` +
            Math.min.apply(Math, i) +
            '}',
          'g'
        );
        r = r.map(function (n) {
          return n.replace(
            d,
            `
`
          );
        });
      }
      r[0] = r[0].replace(/^\r?\n/, '');
      var s = r[0];
      return (
        o.forEach(function (n, t) {
          var u = s.match(/(?:^|\n)( *)$/),
            a = u ? u[1] : '',
            I = n;
          (typeof n == 'string' &&
            n.includes(`
`) &&
            (I = String(n)
              .split(
                `
`
              )
              .map(function (l, b) {
                return b === 0 ? l : '' + a + l;
              }).join(`
`)),
            (s += I + r[t + 1]));
        }),
        s
      );
    }
    var te = 'storybook/background',
      C = 'backgrounds',
      de = {
        light: { name: 'light', value: '#F8F8F8' },
        dark: { name: 'dark', value: '#333' },
      },
      me = R(function () {
        let e = U(C),
          [o, c, r] = x(),
          [i, d] = G(!1),
          { options: s = de, disable: n = !0 } = e || {};
        if (n) return null;
        let t = o[C] || {},
          u = t.value,
          a = t.grid || !1,
          I = s[u],
          l = !!r?.[C],
          b = Object.keys(s).length;
        return g.createElement(pe, {
          length: b,
          backgroundMap: s,
          item: I,
          updateGlobals: c,
          backgroundName: u,
          setIsTooltipVisible: d,
          isLocked: l,
          isGridActive: a,
          isTooltipVisible: i,
        });
      }),
      pe = R(function (e) {
        let {
            item: o,
            length: c,
            updateGlobals: r,
            setIsTooltipVisible: i,
            backgroundMap: d,
            backgroundName: s,
            isLocked: n,
            isGridActive: t,
            isTooltipVisible: u,
          } = e,
          a = D(
            I => {
              r({ [C]: I });
            },
            [r]
          );
        return g.createElement(
          N,
          null,
          g.createElement(
            L,
            {
              key: 'grid',
              active: t,
              disabled: n,
              title: 'Apply a grid to the preview',
              onClick: () => a({ value: s, grid: !t }),
            },
            g.createElement(Y, null)
          ),
          c > 0
            ? g.createElement(
                F,
                {
                  key: 'background',
                  placement: 'top',
                  closeOnOutsideClick: !0,
                  tooltip: ({ onHide: I }) =>
                    g.createElement(H, {
                      links: [
                        ...(o
                          ? [
                              {
                                id: 'reset',
                                title: 'Reset background',
                                icon: g.createElement($, null),
                                onClick: () => {
                                  (a({ value: void 0, grid: t }), I());
                                },
                              },
                            ]
                          : []),
                        ...Object.entries(d).map(([l, b]) => ({
                          id: l,
                          title: b.name,
                          icon: g.createElement(Z, {
                            color: b?.value || 'grey',
                          }),
                          active: l === s,
                          onClick: () => {
                            (a({ value: l, grid: t }), I());
                          },
                        })),
                      ].flat(),
                    }),
                  onVisibleChange: i,
                },
                g.createElement(
                  L,
                  {
                    disabled: n,
                    key: 'background',
                    title: 'Change the background of the preview',
                    active: !!o || u,
                  },
                  g.createElement(K, null)
                )
              )
            : null
        );
      }),
      he = ee.span(
        ({ background: e }) => ({
          borderRadius: '1rem',
          display: 'block',
          height: '1rem',
          width: '1rem',
          background: e,
        }),
        ({ theme: e }) => ({ boxShadow: `${e.appBorderColor} 0 0 0 1px inset` })
      ),
      fe = (e, o = [], c) => {
        if (e === 'transparent') return 'transparent';
        if (o.find(i => i.value === e) || e) return e;
        let r = o.find(i => i.name === c);
        if (r) return r.value;
        if (c) {
          let i = o.map(d => d.name).join(', ');
          j.warn(oe`
        Backgrounds Addon: could not find the default color "${c}".
        These are the available colors for your story based on your configuration:
        ${i}.
      `);
        }
        return 'transparent';
      },
      ne = (0, V.default)(1e3)((e, o, c, r, i, d) => ({
        id: e || o,
        title: o,
        onClick: () => {
          i({ selected: c, name: o });
        },
        value: c,
        right: r ? g.createElement(he, { background: c }) : void 0,
        active: d,
      })),
      ge = (0, V.default)(10)((e, o, c) => {
        let r = e.map(({ name: i, value: d }) =>
          ne(null, i, d, !0, c, d === o)
        );
        return o !== 'transparent'
          ? [ne('reset', 'Clear background', 'transparent', null, c, !1), ...r]
          : r;
      }),
      _e = { default: null, disable: !0, values: [] },
      be = R(function () {
        let e = U(C, _e),
          [o, c] = G(!1),
          [r, i] = x(),
          d = r[C]?.value,
          s = z(() => fe(d, e.values, e.default), [e, d]);
        Array.isArray(e) &&
          j.warn(
            'Addon Backgrounds api has changed in Storybook 6.0. Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md'
          );
        let n = D(
          t => {
            i({ [C]: { ...r[C], value: t } });
          },
          [e, r, i]
        );
        return e.disable
          ? null
          : g.createElement(
              F,
              {
                placement: 'top',
                closeOnOutsideClick: !0,
                tooltip: ({ onHide: t }) =>
                  g.createElement(H, {
                    links: ge(e.values, s, ({ selected: u }) => {
                      (s !== u && n(u), t());
                    }),
                  }),
                onVisibleChange: c,
              },
              g.createElement(
                L,
                {
                  key: 'background',
                  title: 'Change the background of the preview',
                  active: s !== 'transparent' || o,
                },
                g.createElement(K, null)
              )
            );
      }),
      Se = R(function () {
        let [e, o] = x(),
          { grid: c } = U(C, { grid: { disable: !1 } });
        if (c?.disable) return null;
        let r = e[C]?.grid || !1;
        return g.createElement(
          L,
          {
            key: 'background',
            active: r,
            title: 'Apply a grid to the preview',
            onClick: () => o({ [C]: { ...e[C], grid: !r } }),
          },
          g.createElement(Y, null)
        );
      });
    M.register(te, () => {
      M.add(te, {
        title: 'Backgrounds',
        type: X.TOOL,
        match: ({ viewMode: e, tabId: o }) =>
          !!(e && e.match(/^(story|docs)$/)) && !o,
        render: () =>
          FEATURES?.backgroundsStoryGlobals
            ? g.createElement(me, null)
            : g.createElement(
                N,
                null,
                g.createElement(be, null),
                g.createElement(Se, null)
              ),
      });
    });
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e
  );
}
