try {
  (() => {
    var me = Object.create;
    var J = Object.defineProperty;
    var he = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var _e = Object.getPrototypeOf,
      ge = Object.prototype.hasOwnProperty;
    var O = (e =>
      typeof require < 'u'
        ? require
        : typeof Proxy < 'u'
          ? new Proxy(e, {
              get: (t, a) => (typeof require < 'u' ? require : t)[a],
            })
          : e)(function (e) {
      if (typeof require < 'u') return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var D = (e, t) => () => (e && (t = e((e = 0))), t);
    var Se = (e, t) => () => (
      t || e((t = { exports: {} }).exports, t),
      t.exports
    );
    var be = (e, t, a, c) => {
      if ((t && typeof t == 'object') || typeof t == 'function')
        for (let l of fe(t))
          !ge.call(e, l) &&
            l !== a &&
            J(e, l, {
              get: () => t[l],
              enumerable: !(c = he(t, l)) || c.enumerable,
            });
      return e;
    };
    var ye = (e, t, a) => (
      (a = e != null ? me(_e(e)) : {}),
      be(
        t || !e || !e.__esModule
          ? J(a, 'default', { value: e, enumerable: !0 })
          : a,
        e
      )
    );
    var f = D(() => {});
    var _ = D(() => {});
    var g = D(() => {});
    var se = Se((le, X) => {
      f();
      _();
      g();
      (function (e) {
        if (typeof le == 'object' && typeof X < 'u') X.exports = e();
        else if (typeof define == 'function' && define.amd) define([], e);
        else {
          var t;
          (typeof window < 'u' || typeof window < 'u'
            ? (t = window)
            : typeof self < 'u'
              ? (t = self)
              : (t = this),
            (t.memoizerific = e()));
        }
      })(function () {
        var e, t, a;
        return (function c(l, S, d) {
          function o(n, p) {
            if (!S[n]) {
              if (!l[n]) {
                var r = typeof O == 'function' && O;
                if (!p && r) return r(n, !0);
                if (i) return i(n, !0);
                var u = new Error("Cannot find module '" + n + "'");
                throw ((u.code = 'MODULE_NOT_FOUND'), u);
              }
              var I = (S[n] = { exports: {} });
              l[n][0].call(
                I.exports,
                function (h) {
                  var b = l[n][1][h];
                  return o(b || h);
                },
                I,
                I.exports,
                c,
                l,
                S,
                d
              );
            }
            return S[n].exports;
          }
          for (var i = typeof O == 'function' && O, m = 0; m < d.length; m++)
            o(d[m]);
          return o;
        })(
          {
            1: [
              function (c, l, S) {
                l.exports = function (d) {
                  if (typeof Map != 'function' || d) {
                    var o = c('./similar');
                    return new o();
                  } else return new Map();
                };
              },
              { './similar': 2 },
            ],
            2: [
              function (c, l, S) {
                function d() {
                  return (
                    (this.list = []),
                    (this.lastItem = void 0),
                    (this.size = 0),
                    this
                  );
                }
                ((d.prototype.get = function (o) {
                  var i;
                  if (this.lastItem && this.isEqual(this.lastItem.key, o))
                    return this.lastItem.val;
                  if (((i = this.indexOf(o)), i >= 0))
                    return ((this.lastItem = this.list[i]), this.list[i].val);
                }),
                  (d.prototype.set = function (o, i) {
                    var m;
                    return this.lastItem && this.isEqual(this.lastItem.key, o)
                      ? ((this.lastItem.val = i), this)
                      : ((m = this.indexOf(o)),
                        m >= 0
                          ? ((this.lastItem = this.list[m]),
                            (this.list[m].val = i),
                            this)
                          : ((this.lastItem = { key: o, val: i }),
                            this.list.push(this.lastItem),
                            this.size++,
                            this));
                  }),
                  (d.prototype.delete = function (o) {
                    var i;
                    if (
                      (this.lastItem &&
                        this.isEqual(this.lastItem.key, o) &&
                        (this.lastItem = void 0),
                      (i = this.indexOf(o)),
                      i >= 0)
                    )
                      return (this.size--, this.list.splice(i, 1)[0]);
                  }),
                  (d.prototype.has = function (o) {
                    var i;
                    return this.lastItem && this.isEqual(this.lastItem.key, o)
                      ? !0
                      : ((i = this.indexOf(o)),
                        i >= 0 ? ((this.lastItem = this.list[i]), !0) : !1);
                  }),
                  (d.prototype.forEach = function (o, i) {
                    var m;
                    for (m = 0; m < this.size; m++)
                      o.call(
                        i || this,
                        this.list[m].val,
                        this.list[m].key,
                        this
                      );
                  }),
                  (d.prototype.indexOf = function (o) {
                    var i;
                    for (i = 0; i < this.size; i++)
                      if (this.isEqual(this.list[i].key, o)) return i;
                    return -1;
                  }),
                  (d.prototype.isEqual = function (o, i) {
                    return o === i || (o !== o && i !== i);
                  }),
                  (l.exports = d));
              },
              {},
            ],
            3: [
              function (c, l, S) {
                var d = c('map-or-similar');
                l.exports = function (n) {
                  var p = new d(!1),
                    r = [];
                  return function (u) {
                    var I = function () {
                      var h = p,
                        b,
                        A,
                        y = arguments.length - 1,
                        U = Array(y + 1),
                        R = !0,
                        w;
                      if ((I.numArgs || I.numArgs === 0) && I.numArgs !== y + 1)
                        throw new Error(
                          'Memoizerific functions should always be called with the same number of arguments'
                        );
                      for (w = 0; w < y; w++) {
                        if (
                          ((U[w] = { cacheItem: h, arg: arguments[w] }),
                          h.has(arguments[w]))
                        ) {
                          h = h.get(arguments[w]);
                          continue;
                        }
                        ((R = !1),
                          (b = new d(!1)),
                          h.set(arguments[w], b),
                          (h = b));
                      }
                      return (
                        R &&
                          (h.has(arguments[y])
                            ? (A = h.get(arguments[y]))
                            : (R = !1)),
                        R ||
                          ((A = u.apply(null, arguments)),
                          h.set(arguments[y], A)),
                        n > 0 &&
                          ((U[y] = { cacheItem: h, arg: arguments[y] }),
                          R ? o(r, U) : r.push(U),
                          r.length > n && i(r.shift())),
                        (I.wasMemoized = R),
                        (I.numArgs = y + 1),
                        A
                      );
                    };
                    return (
                      (I.limit = n),
                      (I.wasMemoized = !1),
                      (I.cache = p),
                      (I.lru = r),
                      I
                    );
                  };
                };
                function o(n, p) {
                  var r = n.length,
                    u = p.length,
                    I,
                    h,
                    b;
                  for (h = 0; h < r; h++) {
                    for (I = !0, b = 0; b < u; b++)
                      if (!m(n[h][b].arg, p[b].arg)) {
                        I = !1;
                        break;
                      }
                    if (I) break;
                  }
                  n.push(n.splice(h, 1)[0]);
                }
                function i(n) {
                  var p = n.length,
                    r = n[p - 1],
                    u,
                    I;
                  for (
                    r.cacheItem.delete(r.arg), I = p - 2;
                    I >= 0 &&
                    ((r = n[I]), (u = r.cacheItem.get(r.arg)), !u || !u.size);
                    I--
                  )
                    r.cacheItem.delete(r.arg);
                }
                function m(n, p) {
                  return n === p || (n !== n && p !== p);
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
    f();
    _();
    g();
    f();
    _();
    g();
    f();
    _();
    g();
    f();
    _();
    g();
    var s = __REACT__,
      {
        Children: Ze,
        Component: Je,
        Fragment: N,
        Profiler: $e,
        PureComponent: Qe,
        StrictMode: et,
        Suspense: tt,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ot,
        cloneElement: nt,
        createContext: rt,
        createElement: V,
        createFactory: it,
        createRef: at,
        forwardRef: lt,
        isValidElement: st,
        lazy: ct,
        memo: $,
        startTransition: ut,
        unstable_act: It,
        useCallback: Q,
        useContext: dt,
        useDebugValue: pt,
        useDeferredValue: mt,
        useEffect: x,
        useId: ht,
        useImperativeHandle: ft,
        useInsertionEffect: _t,
        useLayoutEffect: gt,
        useMemo: St,
        useReducer: bt,
        useRef: ee,
        useState: H,
        useSyncExternalStore: yt,
        useTransition: Et,
        version: wt,
      } = __REACT__;
    f();
    _();
    g();
    var At = __STORYBOOK_API__,
      {
        ActiveTabs: Rt,
        Consumer: kt,
        ManagerContext: Ot,
        Provider: xt,
        RequestResponseError: Lt,
        addons: G,
        combineParameters: Pt,
        controlOrMetaKey: Bt,
        controlOrMetaSymbol: Ut,
        eventMatchesShortcut: Nt,
        eventToShortcut: Mt,
        experimental_MockUniversalStore: Dt,
        experimental_UniversalStore: Vt,
        experimental_requestResponse: Ht,
        experimental_useUniversalStore: Gt,
        isMacLike: Ft,
        isShortcutTaken: zt,
        keyToSymbol: jt,
        merge: Yt,
        mockChannel: Wt,
        optionOrAltSymbol: qt,
        shortcutMatchesShortcut: Kt,
        shortcutToHumanString: Xt,
        types: te,
        useAddonState: Zt,
        useArgTypes: Jt,
        useArgs: $t,
        useChannel: Qt,
        useGlobalTypes: eo,
        useGlobals: F,
        useParameter: z,
        useSharedState: to,
        useStoryPrepared: oo,
        useStorybookApi: oe,
        useStorybookState: no,
      } = __STORYBOOK_API__;
    f();
    _();
    g();
    var so = __STORYBOOK_COMPONENTS__,
      {
        A: co,
        ActionBar: uo,
        AddonPanel: Io,
        Badge: po,
        Bar: mo,
        Blockquote: ho,
        Button: fo,
        ClipboardCode: _o,
        Code: go,
        DL: So,
        Div: bo,
        DocumentWrapper: yo,
        EmptyTabContent: Eo,
        ErrorFormatter: wo,
        FlexBar: To,
        Form: Co,
        H1: vo,
        H2: Ao,
        H3: Ro,
        H4: ko,
        H5: Oo,
        H6: xo,
        HR: Lo,
        IconButton: L,
        IconButtonSkeleton: Po,
        Icons: Bo,
        Img: Uo,
        LI: No,
        Link: Mo,
        ListItem: Do,
        Loader: Vo,
        Modal: Ho,
        OL: Go,
        P: Fo,
        Placeholder: zo,
        Pre: jo,
        ProgressSpinner: Yo,
        ResetWrapper: Wo,
        ScrollArea: qo,
        Separator: Ko,
        Spaced: Xo,
        Span: Zo,
        StorybookIcon: Jo,
        StorybookLogo: $o,
        Symbols: Qo,
        SyntaxHighlighter: en,
        TT: tn,
        TabBar: on,
        TabButton: nn,
        TabWrapper: rn,
        Table: an,
        Tabs: ln,
        TabsState: sn,
        TooltipLinkList: j,
        TooltipMessage: cn,
        TooltipNote: un,
        UL: In,
        WithTooltip: Y,
        WithTooltipPure: dn,
        Zoom: pn,
        codeCommon: mn,
        components: hn,
        createCopyToClipboardFunction: fn,
        getStoryHref: _n,
        icons: gn,
        interleaveSeparators: Sn,
        nameSpaceClassNames: bn,
        resetComponents: yn,
        withReset: En,
      } = __STORYBOOK_COMPONENTS__;
    f();
    _();
    g();
    var An = __STORYBOOK_THEMING__,
      {
        CacheProvider: Rn,
        ClassNames: kn,
        Global: W,
        ThemeProvider: On,
        background: xn,
        color: Ln,
        convert: Pn,
        create: Bn,
        createCache: Un,
        createGlobal: Nn,
        createReset: Mn,
        css: Dn,
        darken: Vn,
        ensure: Hn,
        ignoreSsrWarning: Gn,
        isPropValid: Fn,
        jsx: zn,
        keyframes: jn,
        lighten: Yn,
        styled: E,
        themes: Wn,
        typography: qn,
        useTheme: Kn,
        withTheme: Xn,
      } = __STORYBOOK_THEMING__;
    f();
    _();
    g();
    var er = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: tr,
        AccessibilityIcon: or,
        AccessibilityIgnoredIcon: nr,
        AddIcon: rr,
        AdminIcon: ir,
        AlertAltIcon: ar,
        AlertIcon: lr,
        AlignLeftIcon: sr,
        AlignRightIcon: cr,
        AppleIcon: ur,
        ArrowBottomLeftIcon: Ir,
        ArrowBottomRightIcon: dr,
        ArrowDownIcon: pr,
        ArrowLeftIcon: mr,
        ArrowRightIcon: hr,
        ArrowSolidDownIcon: fr,
        ArrowSolidLeftIcon: _r,
        ArrowSolidRightIcon: gr,
        ArrowSolidUpIcon: Sr,
        ArrowTopLeftIcon: br,
        ArrowTopRightIcon: yr,
        ArrowUpIcon: Er,
        AzureDevOpsIcon: wr,
        BackIcon: Tr,
        BasketIcon: Cr,
        BatchAcceptIcon: vr,
        BatchDenyIcon: Ar,
        BeakerIcon: Rr,
        BellIcon: kr,
        BitbucketIcon: Or,
        BoldIcon: xr,
        BookIcon: Lr,
        BookmarkHollowIcon: Pr,
        BookmarkIcon: Br,
        BottomBarIcon: Ur,
        BottomBarToggleIcon: Nr,
        BoxIcon: Mr,
        BranchIcon: Dr,
        BrowserIcon: ne,
        ButtonIcon: Vr,
        CPUIcon: Hr,
        CalendarIcon: Gr,
        CameraIcon: Fr,
        CameraStabilizeIcon: zr,
        CategoryIcon: jr,
        CertificateIcon: Yr,
        ChangedIcon: Wr,
        ChatIcon: qr,
        CheckIcon: Kr,
        ChevronDownIcon: Xr,
        ChevronLeftIcon: Zr,
        ChevronRightIcon: Jr,
        ChevronSmallDownIcon: $r,
        ChevronSmallLeftIcon: Qr,
        ChevronSmallRightIcon: ei,
        ChevronSmallUpIcon: ti,
        ChevronUpIcon: oi,
        ChromaticIcon: ni,
        ChromeIcon: ri,
        CircleHollowIcon: ii,
        CircleIcon: ai,
        ClearIcon: li,
        CloseAltIcon: si,
        CloseIcon: ci,
        CloudHollowIcon: ui,
        CloudIcon: Ii,
        CogIcon: di,
        CollapseIcon: pi,
        CommandIcon: mi,
        CommentAddIcon: hi,
        CommentIcon: fi,
        CommentsIcon: _i,
        CommitIcon: gi,
        CompassIcon: Si,
        ComponentDrivenIcon: bi,
        ComponentIcon: yi,
        ContrastIcon: Ei,
        ContrastIgnoredIcon: wi,
        ControlsIcon: Ti,
        CopyIcon: Ci,
        CreditIcon: vi,
        CrossIcon: Ai,
        DashboardIcon: Ri,
        DatabaseIcon: ki,
        DeleteIcon: Oi,
        DiamondIcon: xi,
        DirectionIcon: Li,
        DiscordIcon: Pi,
        DocChartIcon: Bi,
        DocListIcon: Ui,
        DocumentIcon: Ni,
        DownloadIcon: Mi,
        DragIcon: Di,
        EditIcon: Vi,
        EllipsisIcon: Hi,
        EmailIcon: Gi,
        ExpandAltIcon: Fi,
        ExpandIcon: zi,
        EyeCloseIcon: ji,
        EyeIcon: Yi,
        FaceHappyIcon: Wi,
        FaceNeutralIcon: qi,
        FaceSadIcon: Ki,
        FacebookIcon: Xi,
        FailedIcon: Zi,
        FastForwardIcon: Ji,
        FigmaIcon: $i,
        FilterIcon: Qi,
        FlagIcon: ea,
        FolderIcon: ta,
        FormIcon: oa,
        GDriveIcon: na,
        GithubIcon: ra,
        GitlabIcon: ia,
        GlobeIcon: aa,
        GoogleIcon: la,
        GraphBarIcon: sa,
        GraphLineIcon: ca,
        GraphqlIcon: ua,
        GridAltIcon: Ia,
        GridIcon: da,
        GrowIcon: q,
        HeartHollowIcon: pa,
        HeartIcon: ma,
        HomeIcon: ha,
        HourglassIcon: fa,
        InfoIcon: _a,
        ItalicIcon: ga,
        JumpToIcon: Sa,
        KeyIcon: ba,
        LightningIcon: ya,
        LightningOffIcon: Ea,
        LinkBrokenIcon: wa,
        LinkIcon: Ta,
        LinkedinIcon: Ca,
        LinuxIcon: va,
        ListOrderedIcon: Aa,
        ListUnorderedIcon: Ra,
        LocationIcon: ka,
        LockIcon: Oa,
        MarkdownIcon: xa,
        MarkupIcon: La,
        MediumIcon: Pa,
        MemoryIcon: Ba,
        MenuIcon: Ua,
        MergeIcon: Na,
        MirrorIcon: Ma,
        MobileIcon: re,
        MoonIcon: Da,
        NutIcon: Va,
        OutboxIcon: Ha,
        OutlineIcon: Ga,
        PaintBrushIcon: Fa,
        PaperClipIcon: za,
        ParagraphIcon: ja,
        PassedIcon: Ya,
        PhoneIcon: Wa,
        PhotoDragIcon: qa,
        PhotoIcon: Ka,
        PhotoStabilizeIcon: Xa,
        PinAltIcon: Za,
        PinIcon: Ja,
        PlayAllHollowIcon: $a,
        PlayBackIcon: Qa,
        PlayHollowIcon: el,
        PlayIcon: tl,
        PlayNextIcon: ol,
        PlusIcon: nl,
        PointerDefaultIcon: rl,
        PointerHandIcon: il,
        PowerIcon: al,
        PrintIcon: ll,
        ProceedIcon: sl,
        ProfileIcon: cl,
        PullRequestIcon: ul,
        QuestionIcon: Il,
        RSSIcon: dl,
        RedirectIcon: pl,
        ReduxIcon: ml,
        RefreshIcon: ie,
        ReplyIcon: hl,
        RepoIcon: fl,
        RequestChangeIcon: _l,
        RewindIcon: gl,
        RulerIcon: Sl,
        SaveIcon: bl,
        SearchIcon: yl,
        ShareAltIcon: El,
        ShareIcon: wl,
        ShieldIcon: Tl,
        SideBySideIcon: Cl,
        SidebarAltIcon: vl,
        SidebarAltToggleIcon: Al,
        SidebarIcon: Rl,
        SidebarToggleIcon: kl,
        SpeakerIcon: Ol,
        StackedIcon: xl,
        StarHollowIcon: Ll,
        StarIcon: Pl,
        StatusFailIcon: Bl,
        StatusIcon: Ul,
        StatusPassIcon: Nl,
        StatusWarnIcon: Ml,
        StickerIcon: Dl,
        StopAltHollowIcon: Vl,
        StopAltIcon: Hl,
        StopIcon: Gl,
        StorybookIcon: Fl,
        StructureIcon: zl,
        SubtractIcon: jl,
        SunIcon: Yl,
        SupportIcon: Wl,
        SweepIcon: ql,
        SwitchAltIcon: Kl,
        SyncIcon: Xl,
        TabletIcon: ae,
        ThumbsUpIcon: Zl,
        TimeIcon: Jl,
        TimerIcon: $l,
        TransferIcon: K,
        TrashIcon: Ql,
        TwitterIcon: es,
        TypeIcon: ts,
        UbuntuIcon: os,
        UndoIcon: ns,
        UnfoldIcon: rs,
        UnlockIcon: is,
        UnpinIcon: as,
        UploadIcon: ls,
        UserAddIcon: ss,
        UserAltIcon: cs,
        UserIcon: us,
        UsersIcon: Is,
        VSCodeIcon: ds,
        VerifiedIcon: ps,
        VideoIcon: ms,
        WandIcon: hs,
        WatchIcon: fs,
        WindowsIcon: _s,
        WrenchIcon: gs,
        XIcon: Ss,
        YoutubeIcon: bs,
        ZoomIcon: ys,
        ZoomOutIcon: Es,
        ZoomResetIcon: ws,
        iconList: Ts,
      } = __STORYBOOK_ICONS__;
    var Z = ye(se()),
      P = 'storybook/viewport',
      k = 'viewport',
      Ie = {
        mobile1: {
          name: 'Small mobile',
          styles: { height: '568px', width: '320px' },
          type: 'mobile',
        },
        mobile2: {
          name: 'Large mobile',
          styles: { height: '896px', width: '414px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { height: '1112px', width: '834px' },
          type: 'tablet',
        },
      },
      B = {
        name: 'Reset viewport',
        styles: { height: '100%', width: '100%' },
        type: 'desktop',
      },
      we = { [k]: { value: void 0, isRotated: !1 } },
      Te = { viewport: 'reset', viewportRotated: !1 },
      Ce = globalThis.FEATURES?.viewportStoryGlobals ? we : Te,
      de = (e, t) => e.indexOf(t),
      ve = (e, t) => {
        let a = de(e, t);
        return a === e.length - 1 ? e[0] : e[a + 1];
      },
      Ae = (e, t) => {
        let a = de(e, t);
        return a < 1 ? e[e.length - 1] : e[a - 1];
      },
      pe = async (e, t, a, c) => {
        (await e.setAddonShortcut(P, {
          label: 'Previous viewport',
          defaultShortcut: ['alt', 'shift', 'V'],
          actionName: 'previous',
          action: () => {
            a({ viewport: Ae(c, t) });
          },
        }),
          await e.setAddonShortcut(P, {
            label: 'Next viewport',
            defaultShortcut: ['alt', 'V'],
            actionName: 'next',
            action: () => {
              a({ viewport: ve(c, t) });
            },
          }),
          await e.setAddonShortcut(P, {
            label: 'Reset viewport',
            defaultShortcut: ['alt', 'control', 'V'],
            actionName: 'reset',
            action: () => {
              a(Ce);
            },
          }));
      },
      Re = E.div({ display: 'inline-flex', alignItems: 'center' }),
      ce = E.div(({ theme: e }) => ({
        display: 'inline-block',
        textDecoration: 'none',
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: '1',
        height: 40,
        border: 'none',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
        background: 'transparent',
      })),
      ke = E(L)(() => ({ display: 'inline-flex', alignItems: 'center' })),
      Oe = E.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      xe = {
        desktop: s.createElement(ne, null),
        mobile: s.createElement(re, null),
        tablet: s.createElement(ae, null),
        other: s.createElement(N, null),
      },
      Le = ({ api: e }) => {
        let t = z(k),
          [a, c, l] = F(),
          [S, d] = H(!1),
          { options: o = Ie, disable: i } = t || {},
          m = a?.[k] || {},
          n = m.value,
          p = m.isRotated,
          r = o[n] || B,
          u = S || r !== B,
          I = k in l,
          h = Object.keys(o).length;
        if (
          (x(() => {
            pe(e, n, c, Object.keys(o));
          }, [o, n, c, e]),
          r.styles === null || !o || h < 1)
        )
          return null;
        if (typeof r.styles == 'function')
          return (
            console.warn(
              'Addon Viewport no longer supports dynamic styles using a function, use css calc() instead'
            ),
            null
          );
        let b = p ? r.styles.height : r.styles.width,
          A = p ? r.styles.width : r.styles.height;
        return i
          ? null
          : s.createElement(Pe, {
              item: r,
              updateGlobals: c,
              viewportMap: o,
              viewportName: n,
              isRotated: p,
              setIsTooltipVisible: d,
              isLocked: I,
              isActive: u,
              width: b,
              height: A,
            });
      },
      Pe = s.memo(function (e) {
        let {
            item: t,
            viewportMap: a,
            viewportName: c,
            isRotated: l,
            updateGlobals: S,
            setIsTooltipVisible: d,
            isLocked: o,
            isActive: i,
            width: m,
            height: n,
          } = e,
          p = Q(r => S({ [k]: r }), [S]);
        return s.createElement(
          N,
          null,
          s.createElement(
            Y,
            {
              placement: 'bottom',
              tooltip: ({ onHide: r }) =>
                s.createElement(j, {
                  links: [
                    ...(length > 0 && t !== B
                      ? [
                          {
                            id: 'reset',
                            title: 'Reset viewport',
                            icon: s.createElement(ie, null),
                            onClick: () => {
                              (p({ value: void 0, isRotated: !1 }), r());
                            },
                          },
                        ]
                      : []),
                    ...Object.entries(a).map(([u, I]) => ({
                      id: u,
                      title: I.name,
                      icon: xe[I.type],
                      active: u === c,
                      onClick: () => {
                        (p({ value: u, isRotated: !1 }), r());
                      },
                    })),
                  ].flat(),
                }),
              closeOnOutsideClick: !0,
              onVisibleChange: d,
            },
            s.createElement(
              ke,
              {
                disabled: o,
                key: 'viewport',
                title: 'Change the size of the preview',
                active: i,
                onDoubleClick: () => {
                  p({ value: void 0, isRotated: !1 });
                },
              },
              s.createElement(q, null),
              t !== B
                ? s.createElement(Oe, null, t.name, ' ', l ? '(L)' : '(P)')
                : null
            )
          ),
          s.createElement(W, {
            styles: {
              'iframe[data-is-storybook="true"]': { width: m, height: n },
            },
          }),
          t !== B
            ? s.createElement(
                Re,
                null,
                s.createElement(
                  ce,
                  { title: 'Viewport width' },
                  m.replace('px', '')
                ),
                o
                  ? '/'
                  : s.createElement(
                      L,
                      {
                        key: 'viewport-rotate',
                        title: 'Rotate viewport',
                        onClick: () => {
                          p({ value: c, isRotated: !l });
                        },
                      },
                      s.createElement(K, null)
                    ),
                s.createElement(
                  ce,
                  { title: 'Viewport height' },
                  n.replace('px', '')
                )
              )
            : null
        );
      }),
      Be = (0, Z.default)(50)(e => [
        ...Ue,
        ...Object.entries(e).map(([t, { name: a, ...c }]) => ({
          ...c,
          id: t,
          title: a,
        })),
      ]),
      M = { id: 'reset', title: 'Reset viewport', styles: null, type: 'other' },
      Ue = [M],
      Ne = (0, Z.default)(50)((e, t, a, c) =>
        e
          .filter(l => l.id !== M.id || t.id !== l.id)
          .map(l => ({
            ...l,
            onClick: () => {
              (a({ viewport: l.id }), c());
            },
          }))
      ),
      Me = ({ width: e, height: t, ...a }) => ({ ...a, height: e, width: t }),
      De = E.div({ display: 'inline-flex', alignItems: 'center' }),
      ue = E.div(({ theme: e }) => ({
        display: 'inline-block',
        textDecoration: 'none',
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: '1',
        height: 40,
        border: 'none',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
        background: 'transparent',
      })),
      Ve = E(L)(() => ({ display: 'inline-flex', alignItems: 'center' })),
      He = E.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      Ge = (e, t, a) => {
        if (t === null) return;
        let c = typeof t == 'function' ? t(e) : t;
        return a ? Me(c) : c;
      },
      Fe = $(function () {
        let [e, t] = F(),
          {
            viewports: a = Ie,
            defaultOrientation: c,
            defaultViewport: l,
            disable: S,
          } = z(k, {}),
          d = Be(a),
          o = oe(),
          [i, m] = H(!1);
        (l &&
          !d.find(u => u.id === l) &&
          console.warn(
            `Cannot find "defaultViewport" of "${l}" in addon-viewport configs, please check the "viewports" setting in the configuration.`
          ),
          x(() => {
            pe(o, e, t, Object.keys(a));
          }, [a, e, e.viewport, t, o]),
          x(() => {
            let u = c === 'landscape';
            ((l && e.viewport !== l) || (c && e.viewportRotated !== u)) &&
              t({ viewport: l, viewportRotated: u });
          }, [c, l, t]));
        let n =
            d.find(u => u.id === e.viewport) ||
            d.find(u => u.id === l) ||
            d.find(u => u.default) ||
            M,
          p = ee(),
          r = Ge(p.current, n.styles, e.viewportRotated);
        return (
          x(() => {
            p.current = r;
          }, [n]),
          S || Object.entries(a).length === 0
            ? null
            : s.createElement(
                N,
                null,
                s.createElement(
                  Y,
                  {
                    placement: 'top',
                    tooltip: ({ onHide: u }) =>
                      s.createElement(j, { links: Ne(d, n, t, u) }),
                    closeOnOutsideClick: !0,
                    onVisibleChange: m,
                  },
                  s.createElement(
                    Ve,
                    {
                      key: 'viewport',
                      title: 'Change the size of the preview',
                      active: i || !!r,
                      onDoubleClick: () => {
                        t({ viewport: M.id });
                      },
                    },
                    s.createElement(q, null),
                    r
                      ? s.createElement(
                          He,
                          null,
                          e.viewportRotated
                            ? `${n.title} (L)`
                            : `${n.title} (P)`
                        )
                      : null
                  )
                ),
                r
                  ? s.createElement(
                      De,
                      null,
                      s.createElement(W, {
                        styles: {
                          'iframe[data-is-storybook="true"]': {
                            ...(r || { width: '100%', height: '100%' }),
                          },
                        },
                      }),
                      s.createElement(
                        ue,
                        { title: 'Viewport width' },
                        r.width.replace('px', '')
                      ),
                      s.createElement(
                        L,
                        {
                          key: 'viewport-rotate',
                          title: 'Rotate viewport',
                          onClick: () => {
                            t({ viewportRotated: !e.viewportRotated });
                          },
                        },
                        s.createElement(K, null)
                      ),
                      s.createElement(
                        ue,
                        { title: 'Viewport height' },
                        r.height.replace('px', '')
                      )
                    )
                  : null
              )
        );
      });
    G.register(P, e => {
      G.add(P, {
        title: 'viewport / media-queries',
        type: te.TOOL,
        match: ({ viewMode: t, tabId: a }) => t === 'story' && !a,
        render: () =>
          FEATURES?.viewportStoryGlobals ? V(Le, { api: e }) : V(Fe, null),
      });
    });
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e
  );
}
