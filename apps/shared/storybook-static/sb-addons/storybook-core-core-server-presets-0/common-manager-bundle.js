try {
  (() => {
    var P = __STORYBOOK_API__,
      {
        ActiveTabs: U,
        Consumer: y,
        ManagerContext: b,
        Provider: O,
        RequestResponseError: R,
        addons: d,
        combineParameters: I,
        controlOrMetaKey: N,
        controlOrMetaSymbol: C,
        eventMatchesShortcut: h,
        eventToShortcut: k,
        experimental_MockUniversalStore: L,
        experimental_UniversalStore: j,
        experimental_requestResponse: x,
        experimental_useUniversalStore: Y,
        isMacLike: g,
        isShortcutTaken: B,
        keyToSymbol: K,
        merge: f,
        mockChannel: v,
        optionOrAltSymbol: X,
        shortcutMatchesShortcut: G,
        shortcutToHumanString: H,
        types: M,
        useAddonState: D,
        useArgTypes: F,
        useArgs: V,
        useChannel: W,
        useGlobalTypes: w,
        useGlobals: J,
        useParameter: q,
        useSharedState: Z,
        useStoryPrepared: z,
        useStorybookApi: Q,
        useStorybookState: $,
      } = __STORYBOOK_API__;
    var p = (() => {
        let e;
        return (
          typeof window < 'u'
            ? (e = window)
            : typeof globalThis < 'u'
              ? (e = globalThis)
              : typeof window < 'u'
                ? (e = window)
                : typeof self < 'u'
                  ? (e = self)
                  : (e = {}),
          e
        );
      })(),
      u = 'tag-filters',
      T = 'static-filter';
    d.register(u, e => {
      let l = Object.entries(p.TAGS_OPTIONS ?? {}).reduce((t, o) => {
        let [s, a] = o;
        return (a.excludeFromSidebar && (t[s] = !0), t);
      }, {});
      e.experimental_setFilter(T, t => {
        let o = t.tags ?? [];
        return (
          (o.includes('dev') || t.type === 'docs') &&
          o.filter(s => l[s]).length === 0
        );
      });
    });
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e
  );
}
