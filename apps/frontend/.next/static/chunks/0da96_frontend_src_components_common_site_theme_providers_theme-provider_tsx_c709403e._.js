(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/frontend/src/components/common/site/theme/providers/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useThemeProvider",
    ()=>useThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const initialState = {
    theme: 'system',
    setTheme: ()=>null
};
const ThemeProviderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(initialState);
function ThemeProvider(param) {
    let { children, defaultTheme = 'system', storageKey = 'ui-theme', enableSystem = true, ...props } = param;
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ThemeProvider.useState": ()=>{
            // Check if we're on the client side
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const stored = localStorage.getItem(storageKey);
                return stored || defaultTheme;
            } catch (error) {
                console.warn('Failed to read theme from localStorage:', error);
                return defaultTheme;
            }
        }
    }["ThemeProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            if (theme === 'system' && enableSystem) {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                root.classList.add(systemTheme);
                return;
            }
            root.classList.add(theme);
        }
    }["ThemeProvider.useEffect"], [
        theme,
        enableSystem
    ]);
    const value = {
        theme,
        setTheme: (theme)=>{
            // Only access localStorage on the client side
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    localStorage.setItem(storageKey, theme);
                } catch (error) {
                    console.warn('Failed to save theme to localStorage:', error);
                }
            }
            setTheme(theme);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeProviderContext.Provider, {
        ...props,
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/frontend/src/components/common/site/theme/providers/theme-provider.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "TeAMW4EovE7dm/9V43nRhL6YYY0=");
_c = ThemeProvider;
const useThemeProvider = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeProviderContext);
    if (context === undefined) throw new Error('useThemeProvider must be used within a ThemeProvider');
    return context;
};
_s1(useThemeProvider, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=0da96_frontend_src_components_common_site_theme_providers_theme-provider_tsx_c709403e._.js.map