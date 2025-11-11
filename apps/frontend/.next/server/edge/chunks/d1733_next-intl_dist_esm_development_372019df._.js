(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/d1733_next-intl_dist_esm_development_372019df._.js",
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/routing/config.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "receiveRoutingConfig",
    ()=>receiveRoutingConfig
]);
function receiveRoutingConfig(input) {
    return {
        ...input,
        localePrefix: receiveLocalePrefixConfig(input.localePrefix),
        localeCookie: receiveLocaleCookie(input.localeCookie),
        localeDetection: input.localeDetection ?? true,
        alternateLinks: input.alternateLinks ?? true
    };
}
function receiveLocaleCookie(localeCookie) {
    return localeCookie ?? true ? {
        name: 'NEXT_LOCALE',
        sameSite: 'lax',
        ...typeof localeCookie === 'object' && localeCookie
    } : false;
}
function receiveLocalePrefixConfig(localePrefix) {
    return typeof localePrefix === 'object' ? localePrefix : {
        mode: localePrefix || 'always'
    };
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/constants.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Used to read the locale from the middleware
__turbopack_context__.s([
    "HEADER_LOCALE_NAME",
    ()=>HEADER_LOCALE_NAME
]);
const HEADER_LOCALE_NAME = 'X-NEXT-INTL-LOCALE';
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLocaleAsPrefix",
    ()=>getLocaleAsPrefix,
    "getLocalePrefix",
    ()=>getLocalePrefix,
    "getLocalizedTemplate",
    ()=>getLocalizedTemplate,
    "getSortedPathnames",
    ()=>getSortedPathnames,
    "hasPathnamePrefixed",
    ()=>hasPathnamePrefixed,
    "isLocalizableHref",
    ()=>isLocalizableHref,
    "isPromise",
    ()=>isPromise,
    "matchesPathname",
    ()=>matchesPathname,
    "normalizeTrailingSlash",
    ()=>normalizeTrailingSlash,
    "prefixPathname",
    ()=>prefixPathname,
    "templateToRegex",
    ()=>templateToRegex,
    "unprefixPathname",
    ()=>unprefixPathname
]);
function isRelativeHref(href) {
    const pathname = typeof href === 'object' ? href.pathname : href;
    return pathname != null && !pathname.startsWith('/');
}
function isLocalHref(href) {
    if (typeof href === 'object') {
        return href.host == null && href.hostname == null;
    } else {
        const hasProtocol = /^[a-z]+:/i.test(href);
        return !hasProtocol;
    }
}
function isLocalizableHref(href) {
    return isLocalHref(href) && !isRelativeHref(href);
}
function unprefixPathname(pathname, prefix) {
    return pathname.replace(new RegExp(`^${prefix}`), '') || '/';
}
function prefixPathname(prefix, pathname) {
    let localizedHref = prefix;
    // Avoid trailing slashes
    if (/^\/(\?.*)?$/.test(pathname)) {
        pathname = pathname.slice(1);
    }
    localizedHref += pathname;
    return localizedHref;
}
function hasPathnamePrefixed(prefix, pathname) {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
}
function hasTrailingSlash() {
    try {
        // Provided via `env` setting in `next.config.js` via the plugin
        return process.env._next_intl_trailing_slash === 'true';
    } catch  {
        return false;
    }
}
function getLocalizedTemplate(pathnameConfig, locale, internalTemplate) {
    return typeof pathnameConfig === 'string' ? pathnameConfig : pathnameConfig[locale] || internalTemplate;
}
function normalizeTrailingSlash(pathname) {
    const trailingSlash = hasTrailingSlash();
    const [path, ...hashParts] = pathname.split('#');
    const hash = hashParts.join('#');
    let normalizedPath = path;
    if (normalizedPath !== '/') {
        const pathnameEndsWithSlash = normalizedPath.endsWith('/');
        if (trailingSlash && !pathnameEndsWithSlash) {
            normalizedPath += '/';
        } else if (!trailingSlash && pathnameEndsWithSlash) {
            normalizedPath = normalizedPath.slice(0, -1);
        }
    }
    if (hash) {
        normalizedPath += '#' + hash;
    }
    return normalizedPath;
}
function matchesPathname(/** E.g. `/users/[userId]-[userName]` */ template, /** E.g. `/users/23-jane` */ pathname) {
    const normalizedTemplate = normalizeTrailingSlash(template);
    const normalizedPathname = normalizeTrailingSlash(pathname);
    const regex = templateToRegex(normalizedTemplate);
    return regex.test(normalizedPathname);
}
function getLocalePrefix(locale, localePrefix) {
    return localePrefix.mode !== 'never' && localePrefix.prefixes?.[locale] || // We return a prefix even if `mode: 'never'`. It's up to the consumer
    // to decide to use it or not.
    getLocaleAsPrefix(locale);
}
function getLocaleAsPrefix(locale) {
    return '/' + locale;
}
function templateToRegex(template) {
    const regexPattern = template// Replace optional catchall ('[[...slug]]')
    .replace(/\[\[(\.\.\.[^\]]+)\]\]/g, '?(.*)')// Replace catchall ('[...slug]')
    .replace(/\[(\.\.\.[^\]]+)\]/g, '(.+)')// Replace regular parameter ('[slug]')
    .replace(/\[([^\]]+)\]/g, '([^/]+)');
    return new RegExp(`^${regexPattern}$`);
}
function isOptionalCatchAllSegment(pathname) {
    return pathname.includes('[[...');
}
function isCatchAllSegment(pathname) {
    return pathname.includes('[...');
}
function isDynamicSegment(pathname) {
    return pathname.includes('[');
}
function comparePathnamePairs(a, b) {
    const pathA = a.split('/');
    const pathB = b.split('/');
    const maxLength = Math.max(pathA.length, pathB.length);
    for(let i = 0; i < maxLength; i++){
        const segmentA = pathA[i];
        const segmentB = pathB[i];
        // If one of the paths ends, prioritize the shorter path
        if (!segmentA && segmentB) return -1;
        if (segmentA && !segmentB) return 1;
        if (!segmentA && !segmentB) continue;
        // Prioritize static segments over dynamic segments
        if (!isDynamicSegment(segmentA) && isDynamicSegment(segmentB)) return -1;
        if (isDynamicSegment(segmentA) && !isDynamicSegment(segmentB)) return 1;
        // Prioritize non-catch-all segments over catch-all segments
        if (!isCatchAllSegment(segmentA) && isCatchAllSegment(segmentB)) return -1;
        if (isCatchAllSegment(segmentA) && !isCatchAllSegment(segmentB)) return 1;
        // Prioritize non-optional catch-all segments over optional catch-all segments
        if (!isOptionalCatchAllSegment(segmentA) && isOptionalCatchAllSegment(segmentB)) {
            return -1;
        }
        if (isOptionalCatchAllSegment(segmentA) && !isOptionalCatchAllSegment(segmentB)) {
            return 1;
        }
        if (segmentA === segmentB) continue;
    }
    // Both pathnames are completely static
    return 0;
}
function getSortedPathnames(pathnames) {
    return pathnames.sort(comparePathnamePairs);
}
function isPromise(value) {
    // https://github.com/amannn/next-intl/issues/1711
    return typeof value.then === 'function';
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyBasePath",
    ()=>applyBasePath,
    "formatPathname",
    ()=>formatPathname,
    "formatPathnameTemplate",
    ()=>formatPathnameTemplate,
    "formatTemplatePathname",
    ()=>formatTemplatePathname,
    "getBestMatchingDomain",
    ()=>getBestMatchingDomain,
    "getHost",
    ()=>getHost,
    "getInternalTemplate",
    ()=>getInternalTemplate,
    "getLocaleAsPrefix",
    ()=>getLocaleAsPrefix,
    "getLocalePrefixes",
    ()=>getLocalePrefixes,
    "getNormalizedPathname",
    ()=>getNormalizedPathname,
    "getPathnameMatch",
    ()=>getPathnameMatch,
    "getRouteParams",
    ()=>getRouteParams,
    "isLocaleSupportedOnDomain",
    ()=>isLocaleSupportedOnDomain,
    "sanitizePathname",
    ()=>sanitizePathname
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
;
function getInternalTemplate(pathnames, pathname, locale) {
    const sortedPathnames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getSortedPathnames"])(Object.keys(pathnames));
    // Try to find a localized pathname that matches
    for (const internalPathname of sortedPathnames){
        const localizedPathnamesOrPathname = pathnames[internalPathname];
        if (typeof localizedPathnamesOrPathname === 'string') {
            const localizedPathname = localizedPathnamesOrPathname;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localizedPathname, pathname)) {
                return [
                    undefined,
                    internalPathname
                ];
            }
        } else {
            // Prefer the entry with the current locale in case multiple
            // localized pathnames match the current pathname
            const sortedEntries = Object.entries(localizedPathnamesOrPathname);
            const curLocaleIndex = sortedEntries.findIndex(([entryLocale])=>entryLocale === locale);
            if (curLocaleIndex > 0) {
                sortedEntries.unshift(sortedEntries.splice(curLocaleIndex, 1)[0]);
            }
            for (const [entryLocale] of sortedEntries){
                const localizedTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnames[internalPathname], entryLocale, internalPathname);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localizedTemplate, pathname)) {
                    return [
                        entryLocale,
                        internalPathname
                    ];
                }
            }
        }
    }
    // Try to find an internal pathname that matches (this can be the case
    // if all localized pathnames are different from the internal pathnames)
    for (const internalPathname of Object.keys(pathnames)){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(internalPathname, pathname)) {
            return [
                undefined,
                internalPathname
            ];
        }
    }
    // No match
    return [
        undefined,
        undefined
    ];
}
function formatTemplatePathname(sourcePathname, sourceTemplate, targetTemplate, prefix) {
    const params = getRouteParams(sourceTemplate, sourcePathname);
    let targetPathname = '';
    targetPathname += formatPathnameTemplate(targetTemplate, params);
    // A pathname with an optional catchall like `/categories/[[...slug]]`
    // should be normalized to `/categories` if the catchall is not present
    // and no trailing slash is configured
    targetPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(targetPathname);
    return targetPathname;
}
/**
 * Removes potential prefixes from the pathname.
 */ function getNormalizedPathname(pathname, locales, localePrefix) {
    // Add trailing slash for consistent handling
    // both for the root as well as nested paths
    if (!pathname.endsWith('/')) {
        pathname += '/';
    }
    const localePrefixes = getLocalePrefixes(locales, localePrefix);
    const regex = new RegExp(`^(${localePrefixes.map(([, prefix])=>prefix.replaceAll('/', '\\/')).join('|')})/(.*)`, 'i');
    const match = pathname.match(regex);
    let result = match ? '/' + match[2] : pathname;
    if (result !== '/') {
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(result);
    }
    return result;
}
function getLocalePrefixes(locales, localePrefix, sort = true) {
    const prefixes = locales.map((locale)=>[
            locale,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, localePrefix)
        ]);
    if (sort) {
        // More specific ones first
        prefixes.sort((a, b)=>b[1].length - a[1].length);
    }
    return prefixes;
}
function getPathnameMatch(pathname, locales, localePrefix, domain) {
    const localePrefixes = getLocalePrefixes(locales, localePrefix);
    // Sort to prioritize domain locales
    if (domain) {
        localePrefixes.sort(([localeA], [localeB])=>{
            if (localeA === domain.defaultLocale) return -1;
            if (localeB === domain.defaultLocale) return 1;
            const isLocaleAInDomain = domain.locales.includes(localeA);
            const isLocaleBInDomain = domain.locales.includes(localeB);
            if (isLocaleAInDomain && !isLocaleBInDomain) return -1;
            if (!isLocaleAInDomain && isLocaleBInDomain) return 1;
            return 0;
        });
    }
    for (const [locale, prefix] of localePrefixes){
        let exact, matches;
        if (pathname === prefix || pathname.startsWith(prefix + '/')) {
            exact = matches = true;
        } else {
            const normalizedPathname = pathname.toLowerCase();
            const normalizedPrefix = prefix.toLowerCase();
            if (normalizedPathname === normalizedPrefix || normalizedPathname.startsWith(normalizedPrefix + '/')) {
                exact = false;
                matches = true;
            }
        }
        if (matches) {
            return {
                locale,
                prefix,
                matchedPrefix: pathname.slice(0, prefix.length),
                exact
            };
        }
    }
}
function getRouteParams(template, pathname) {
    const normalizedPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(pathname);
    const normalizedTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(template);
    const regex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["templateToRegex"])(normalizedTemplate);
    const match = regex.exec(normalizedPathname);
    if (!match) return undefined;
    const params = {};
    for(let i = 1; i < match.length; i++){
        const key = normalizedTemplate.match(/\[([^\]]+)\]/g)?.[i - 1].replace(/[[\]]/g, '');
        if (key) params[key] = match[i];
    }
    return params;
}
function formatPathnameTemplate(template, params) {
    if (!params) return template;
    // Simplify syntax for optional catchall ('[[...slug]]') so
    // we can replace the value with simple interpolation
    template = template.replace(/\[\[/g, '[').replace(/\]\]/g, ']');
    let result = template;
    Object.entries(params).forEach(([key, value])=>{
        result = result.replace(`[${key}]`, value);
    });
    return result;
}
function formatPathname(pathname, prefix, search) {
    let result = pathname;
    if (prefix) {
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prefixPathname"])(prefix, result);
    }
    if (search) {
        result += search;
    }
    return result;
}
function getHost(requestHeaders) {
    return requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? undefined;
}
function isLocaleSupportedOnDomain(locale, domain) {
    return domain.defaultLocale === locale || domain.locales.includes(locale);
}
function getBestMatchingDomain(curHostDomain, locale, domainsConfig) {
    let domainConfig;
    // Prio 1: Stay on current domain
    if (curHostDomain && isLocaleSupportedOnDomain(locale, curHostDomain)) {
        domainConfig = curHostDomain;
    }
    // Prio 2: Use alternative domain with matching default locale
    if (!domainConfig) {
        domainConfig = domainsConfig.find((cur)=>cur.defaultLocale === locale);
    }
    // Prio 3: Use alternative domain that supports the locale
    if (!domainConfig) {
        domainConfig = domainsConfig.find((cur)=>cur.locales.includes(locale));
    }
    return domainConfig;
}
function applyBasePath(pathname, basePath) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(basePath + pathname);
}
function getLocaleAsPrefix(locale) {
    return `/${locale}`;
}
function sanitizePathname(pathname) {
    // Sanitize malicious URIs, e.g.:
    // '/en/\\example.org → /en/%5C%5Cexample.org'
    // '/en////example.org → /en/example.org'
    return pathname.replace(/\\/g, '%5C').replace(/\/+/g, '/');
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/getAlternateLinksHeaderValue.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getAlternateLinksHeaderValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)");
;
;
/**
 * See https://developers.google.com/search/docs/specialty/international/localized-versions
 */ function getAlternateLinksHeaderValue({ internalTemplateName, localizedPathnames, request, resolvedLocale, routing }) {
    const normalizedUrl = request.nextUrl.clone();
    const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getHost"])(request.headers);
    if (host) {
        normalizedUrl.port = '';
        normalizedUrl.host = host;
    }
    normalizedUrl.protocol = request.headers.get('x-forwarded-proto') ?? normalizedUrl.protocol;
    normalizedUrl.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNormalizedPathname"])(normalizedUrl.pathname, routing.locales, routing.localePrefix);
    function getAlternateEntry(url, locale) {
        url.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(url.pathname);
        if (request.nextUrl.basePath) {
            url = new URL(url);
            url.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyBasePath"])(url.pathname, request.nextUrl.basePath);
        }
        return `<${url.toString()}>; rel="alternate"; hreflang="${locale}"`;
    }
    function getLocalizedPathname(pathname, locale) {
        if (localizedPathnames && typeof localizedPathnames === 'object') {
            const sourceTemplate = localizedPathnames[resolvedLocale];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatTemplatePathname"])(pathname, sourceTemplate ?? internalTemplateName, localizedPathnames[locale] ?? internalTemplateName);
        } else {
            return pathname;
        }
    }
    const links = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefixes"])(routing.locales, routing.localePrefix, false).flatMap(([locale, prefix])=>{
        function prefixPathname(pathname) {
            if (pathname === '/') {
                return prefix;
            } else {
                return prefix + pathname;
            }
        }
        let url;
        if (routing.domains) {
            const domainConfigs = routing.domains.filter((cur)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(locale, cur));
            return domainConfigs.map((domainConfig)=>{
                url = new URL(normalizedUrl);
                url.port = '';
                url.host = domainConfig.domain;
                // Important: Use `normalizedUrl` here, as `url` potentially uses
                // a `basePath` that automatically gets applied to the pathname
                url.pathname = getLocalizedPathname(normalizedUrl.pathname, locale);
                if (locale !== domainConfig.defaultLocale || routing.localePrefix.mode === 'always') {
                    url.pathname = prefixPathname(url.pathname);
                }
                return getAlternateEntry(url, locale);
            });
        } else {
            let pathname;
            if (localizedPathnames && typeof localizedPathnames === 'object') {
                pathname = getLocalizedPathname(normalizedUrl.pathname, locale);
            } else {
                pathname = normalizedUrl.pathname;
            }
            if (locale !== routing.defaultLocale || routing.localePrefix.mode === 'always') {
                pathname = prefixPathname(pathname);
            }
            url = new URL(pathname, normalizedUrl);
        }
        return getAlternateEntry(url, locale);
    });
    // Add x-default entry
    const shouldAddXDefault = // For domain-based routing there is no reasonable x-default
    !routing.domains || routing.domains.length === 0;
    if (shouldAddXDefault) {
        const localizedPathname = getLocalizedPathname(normalizedUrl.pathname, routing.defaultLocale);
        if (localizedPathname) {
            const url = new URL(localizedPathname, normalizedUrl);
            links.push(getAlternateEntry(url, 'x-default'));
        }
    }
    return links.join(', ');
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/resolveLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>resolveLocale,
    "getAcceptLanguageLocale",
    ()=>getAcceptLanguageLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$5$2e$10$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@formatjs+intl-localematcher@0.5.10/node_modules/@formatjs/intl-localematcher/lib/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$negotiator$40$1$2e$0$2e$0$2f$node_modules$2f$negotiator$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/negotiator@1.0.0/node_modules/negotiator/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)");
;
;
;
function findDomainFromHost(requestHeaders, domains) {
    const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getHost"])(requestHeaders);
    if (host) {
        return domains.find((cur)=>cur.domain === host);
    }
    return undefined;
}
function orderLocales(locales) {
    // Workaround for https://github.com/formatjs/formatjs/issues/4469
    return locales.slice().sort((a, b)=>b.length - a.length);
}
function getAcceptLanguageLocale(requestHeaders, locales, defaultLocale) {
    let locale;
    const languages = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$negotiator$40$1$2e$0$2e$0$2f$node_modules$2f$negotiator$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]({
        headers: {
            'accept-language': requestHeaders.get('accept-language') || undefined
        }
    }).languages();
    try {
        const orderedLocales = orderLocales(locales);
        locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$formatjs$2b$intl$2d$localematcher$40$0$2e$5$2e$10$2f$node_modules$2f40$formatjs$2f$intl$2d$localematcher$2f$lib$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["match"])(languages, orderedLocales, defaultLocale);
    } catch  {
    // Invalid language
    }
    return locale;
}
function getLocaleFromCookie(routing, requestCookies) {
    if (routing.localeCookie && requestCookies.has(routing.localeCookie.name)) {
        const value = requestCookies.get(routing.localeCookie.name)?.value;
        if (value && routing.locales.includes(value)) {
            return value;
        }
    }
}
function resolveLocaleFromPrefix(routing, requestHeaders, requestCookies, pathname) {
    let locale;
    // Prio 1: Use route prefix
    if (pathname) {
        locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getPathnameMatch"])(pathname, routing.locales, routing.localePrefix)?.locale;
    }
    // Prio 2: Use existing cookie
    if (!locale && routing.localeDetection) {
        locale = getLocaleFromCookie(routing, requestCookies);
    }
    // Prio 3: Use the `accept-language` header
    if (!locale && routing.localeDetection) {
        locale = getAcceptLanguageLocale(requestHeaders, routing.locales, routing.defaultLocale);
    }
    // Prio 4: Use default locale
    if (!locale) {
        locale = routing.defaultLocale;
    }
    return locale;
}
function resolveLocaleFromDomain(routing, requestHeaders, requestCookies, pathname) {
    const domains = routing.domains;
    const domain = findDomainFromHost(requestHeaders, domains);
    if (!domain) {
        return {
            locale: resolveLocaleFromPrefix(routing, requestHeaders, requestCookies, pathname)
        };
    }
    let locale;
    // Prio 1: Use route prefix
    if (pathname) {
        const prefixLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getPathnameMatch"])(pathname, routing.locales, routing.localePrefix, domain)?.locale;
        if (prefixLocale) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(prefixLocale, domain)) {
                locale = prefixLocale;
            } else {
                // Causes a redirect to a domain that supports the locale
                return {
                    locale: prefixLocale,
                    domain
                };
            }
        }
    }
    // Prio 2: Use existing cookie
    if (!locale && routing.localeDetection) {
        const cookieLocale = getLocaleFromCookie(routing, requestCookies);
        if (cookieLocale) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(cookieLocale, domain)) {
                locale = cookieLocale;
            }
        }
    }
    // Prio 3: Use the `accept-language` header
    if (!locale && routing.localeDetection) {
        const headerLocale = getAcceptLanguageLocale(requestHeaders, domain.locales, domain.defaultLocale);
        if (headerLocale) {
            locale = headerLocale;
        }
    }
    // Prio 4: Use default locale
    if (!locale) {
        locale = domain.defaultLocale;
    }
    return {
        locale,
        domain
    };
}
function resolveLocale(routing, requestHeaders, requestCookies, pathname) {
    if (routing.domains) {
        return resolveLocaleFromDomain(routing, requestHeaders, requestCookies, pathname);
    } else {
        return {
            locale: resolveLocaleFromPrefix(routing, requestHeaders, requestCookies, pathname)
        };
    }
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/syncCookie.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>syncCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/resolveLocale.js [middleware-edge] (ecmascript)");
;
function syncCookie(request, response, locale, routing, domain) {
    if (!routing.localeCookie) return;
    const { name, ...rest } = routing.localeCookie;
    const acceptLanguageLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getAcceptLanguageLocale"])(request.headers, domain?.locales || routing.locales, routing.defaultLocale);
    const hasLocaleCookie = request.cookies.has(name);
    const hasOutdatedCookie = hasLocaleCookie && request.cookies.get(name)?.value !== locale;
    if (hasLocaleCookie ? hasOutdatedCookie : acceptLanguageLocale !== locale) {
        response.cookies.set(name, locale, {
            path: request.nextUrl.basePath || undefined,
            ...rest
        });
    }
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/routing/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$getAlternateLinksHeaderValue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/getAlternateLinksHeaderValue.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/resolveLocale.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$syncCookie$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/syncCookie.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/middleware/utils.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
function createMiddleware(routing) {
    const resolvedRouting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["receiveRoutingConfig"])(routing);
    return function middleware(request) {
        let unsafeExternalPathname;
        try {
            // Resolve potential foreign symbols (e.g. /ja/%E7%B4%84 → /ja/約))
            unsafeExternalPathname = decodeURI(request.nextUrl.pathname);
        } catch  {
            // In case an invalid pathname is encountered, forward
            // it to Next.js which in turn responds with a 400
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
        // Sanitize malicious URIs to prevent open redirect attacks due to
        // decodeURI doesn't escape encoded backslashes ('%5C' & '%5c')
        const externalPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sanitizePathname"])(unsafeExternalPathname);
        const { domain, locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$resolveLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(resolvedRouting, request.headers, request.cookies, externalPathname);
        const hasMatchedDefaultLocale = domain ? domain.defaultLocale === locale : locale === resolvedRouting.defaultLocale;
        const domainsConfig = resolvedRouting.domains?.filter((curDomain)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocaleSupportedOnDomain"])(locale, curDomain)) || [];
        const hasUnknownHost = resolvedRouting.domains != null && !domain;
        function next(url) {
            const urlObj = new URL(url, request.url);
            if (request.nextUrl.basePath) {
                urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyBasePath"])(urlObj.pathname, request.nextUrl.basePath);
            }
            const headers = new Headers(request.headers);
            headers.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HEADER_LOCALE_NAME"], locale);
            const isRewriteNecessary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(request.nextUrl.pathname) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(urlObj.pathname);
            if (isRewriteNecessary) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(urlObj, {
                    request: {
                        headers
                    }
                });
            } else {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request: {
                        headers
                    }
                });
            }
        }
        function redirect(url, redirectDomain) {
            const urlObj = new URL(url, request.url);
            urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(urlObj.pathname);
            if (domainsConfig.length > 0 && !redirectDomain && domain) {
                const bestMatchingDomain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getBestMatchingDomain"])(domain, locale, domainsConfig);
                if (bestMatchingDomain) {
                    redirectDomain = bestMatchingDomain.domain;
                    if (bestMatchingDomain.defaultLocale === locale && resolvedRouting.localePrefix.mode === 'as-needed') {
                        urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNormalizedPathname"])(urlObj.pathname, resolvedRouting.locales, resolvedRouting.localePrefix);
                    }
                }
            }
            if (redirectDomain) {
                urlObj.host = redirectDomain;
                if (request.headers.get('x-forwarded-host')) {
                    urlObj.protocol = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol;
                    const redirectDomainPort = redirectDomain.split(':')[1];
                    urlObj.port = redirectDomainPort ?? request.headers.get('x-forwarded-port') ?? '';
                }
            }
            if (request.nextUrl.basePath) {
                urlObj.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyBasePath"])(urlObj.pathname, request.nextUrl.basePath);
            }
            hasRedirected = true;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(urlObj.toString());
        }
        const unprefixedExternalPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNormalizedPathname"])(externalPathname, resolvedRouting.locales, resolvedRouting.localePrefix);
        const pathnameMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getPathnameMatch"])(externalPathname, resolvedRouting.locales, resolvedRouting.localePrefix, domain);
        const hasLocalePrefix = pathnameMatch != null;
        const isUnprefixedRouting = resolvedRouting.localePrefix.mode === 'never' || hasMatchedDefaultLocale && resolvedRouting.localePrefix.mode === 'as-needed';
        let response;
        let internalTemplateName;
        let hasRedirected;
        let unprefixedInternalPathname = unprefixedExternalPathname;
        const pathnames = resolvedRouting.pathnames;
        if (pathnames) {
            let resolvedTemplateLocale;
            [resolvedTemplateLocale, internalTemplateName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getInternalTemplate"])(pathnames, unprefixedExternalPathname, locale);
            if (internalTemplateName) {
                const pathnameConfig = pathnames[internalTemplateName];
                const localeTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnameConfig, locale, internalTemplateName);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localeTemplate, unprefixedExternalPathname)) {
                    unprefixedInternalPathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatTemplatePathname"])(unprefixedExternalPathname, localeTemplate, internalTemplateName);
                } else {
                    let sourceTemplate;
                    if (resolvedTemplateLocale) {
                        // A localized pathname from another locale has matched
                        sourceTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnameConfig, resolvedTemplateLocale, internalTemplateName);
                    } else {
                        // An internal pathname has matched that
                        // doesn't have a localized pathname
                        sourceTemplate = internalTemplateName;
                    }
                    const localePrefix = isUnprefixedRouting ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, resolvedRouting.localePrefix);
                    const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatTemplatePathname"])(unprefixedExternalPathname, sourceTemplate, localeTemplate);
                    response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(template, localePrefix, request.nextUrl.search));
                }
            }
        }
        if (!response) {
            if (unprefixedInternalPathname === '/' && !hasLocalePrefix) {
                if (isUnprefixedRouting) {
                    response = next((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedInternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocaleAsPrefix"])(locale), request.nextUrl.search));
                } else {
                    response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, resolvedRouting.localePrefix), request.nextUrl.search));
                }
            } else {
                const internalHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedInternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocaleAsPrefix"])(locale), request.nextUrl.search);
                if (hasLocalePrefix) {
                    const externalHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, pathnameMatch.prefix, request.nextUrl.search);
                    if (resolvedRouting.localePrefix.mode === 'never') {
                        response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, undefined, request.nextUrl.search));
                    } else if (pathnameMatch.exact) {
                        if (hasMatchedDefaultLocale && isUnprefixedRouting) {
                            response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, undefined, request.nextUrl.search));
                        } else {
                            if (resolvedRouting.domains) {
                                const pathDomain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getBestMatchingDomain"])(domain, pathnameMatch.locale, domainsConfig);
                                if (domain?.domain !== pathDomain?.domain && !hasUnknownHost) {
                                    response = redirect(externalHref, pathDomain?.domain);
                                } else {
                                    response = next(internalHref);
                                }
                            } else {
                                response = next(internalHref);
                            }
                        }
                    } else {
                        response = redirect(externalHref);
                    }
                } else {
                    if (isUnprefixedRouting) {
                        response = next(internalHref);
                    } else {
                        response = redirect((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatPathname"])(unprefixedExternalPathname, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, resolvedRouting.localePrefix), request.nextUrl.search));
                    }
                }
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$syncCookie$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(request, response, locale, resolvedRouting, domain);
        if (!hasRedirected && resolvedRouting.localePrefix.mode !== 'never' && resolvedRouting.alternateLinks && resolvedRouting.locales.length > 1) {
            response.headers.set('Link', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$getAlternateLinksHeaderValue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
                routing: resolvedRouting,
                internalTemplateName,
                localizedPathnames: internalTemplateName != null && pathnames ? pathnames[internalTemplateName] : undefined,
                request,
                resolvedLocale: locale
            }));
        }
        return response;
    };
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/use.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>use
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
;
// @ts-expect-error -- Ooof, Next.js doesn't make this easy.
// `use` is only available in React 19 canary, but we can
// use it in Next.js already as Next.js "vendors" a fixed
// version of React. However, if we'd simply put `use` in
// ESM code, then the build doesn't work since React does
// not export `use` officially. Therefore, we have to use
// something that is not statically analyzable. Once React
// 19 is out, we can remove this in the next major version.
var use = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__['use'.trim()];
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js <module evaluation>", "default");
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js", "default");
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/utils.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyPathnamePrefix",
    ()=>applyPathnamePrefix,
    "compileLocalizedPathname",
    ()=>compileLocalizedPathname,
    "getBasePath",
    ()=>getBasePath,
    "getRoute",
    ()=>getRoute,
    "normalizeNameOrNameWithParams",
    ()=>normalizeNameOrNameWithParams,
    "serializeSearchParams",
    ()=>serializeSearchParams,
    "validateReceivedConfig",
    ()=>validateReceivedConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
;
// Minor false positive: A route that has both optional and
// required params will allow optional params.
// For `Link`
// For `getPathname` (hence also its consumers: `redirect`, `useRouter`, …)
function normalizeNameOrNameWithParams(href) {
    return typeof href === 'string' ? {
        pathname: href
    } : href;
}
function serializeSearchParams(searchParams) {
    function serializeValue(value) {
        return String(value);
    }
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)){
        if (Array.isArray(value)) {
            value.forEach((cur)=>{
                urlSearchParams.append(key, serializeValue(cur));
            });
        } else {
            urlSearchParams.set(key, serializeValue(value));
        }
    }
    return '?' + urlSearchParams.toString();
}
function compileLocalizedPathname({ pathname, locale, params, pathnames, query }) {
    function compilePath(value) {
        const pathnameConfig = pathnames[value];
        let compiled;
        if (pathnameConfig) {
            const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnameConfig, locale, value);
            compiled = template;
            if (params) {
                Object.entries(params).forEach(([key, paramValue])=>{
                    let regexp, replacer;
                    if (Array.isArray(paramValue)) {
                        regexp = `(\\[)?\\[...${key}\\](\\])?`;
                        replacer = paramValue.map((v)=>String(v)).join('/');
                    } else {
                        regexp = `\\[${key}\\]`;
                        replacer = String(paramValue);
                    }
                    compiled = compiled.replace(new RegExp(regexp, 'g'), replacer);
                });
            }
            // Clean up optional catch-all segments that were not replaced
            compiled = compiled.replace(/\[\[\.\.\..+\]\]/g, '');
            if (compiled.includes('[')) {
                // Next.js throws anyway, therefore better provide a more helpful error message
                throw new Error(`Insufficient params provided for localized pathname.\nTemplate: ${template}\nParams: ${JSON.stringify(params)}`);
            }
            compiled = encodePathname(compiled);
        } else {
            // Unknown pathnames
            compiled = value;
        }
        compiled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(compiled);
        if (query) {
            // This also encodes non-ASCII characters by
            // using `new URLSearchParams()` internally
            compiled += serializeSearchParams(query);
        }
        return compiled;
    }
    if (typeof pathname === 'string') {
        return compilePath(pathname);
    } else {
        const { pathname: internalPathname, ...rest } = pathname;
        const compiled = compilePath(internalPathname);
        const result = {
            ...rest,
            pathname: compiled
        };
        return result;
    }
}
function encodePathname(pathname) {
    // Generally, to comply with RFC 3986 and Google's best practices for URL structures
    // (https://developers.google.com/search/docs/crawling-indexing/url-structure),
    // we should always encode non-ASCII characters.
    //
    // There are two places where next-intl interacts with potentially non-ASCII URLs:
    // 1. Middleware: When mapping a localized pathname to a non-localized pathname internally
    // 2. Navigation APIs: When generating a URLs to be used for <Link /> & friends
    //
    // Next.js normalizes incoming pathnames to always be encoded, therefore we can safely
    // decode them there (see middleware.tsx). On the other hand, Next.js doesn't consistently
    // encode non-ASCII characters that are passed to navigation APIs:
    // 1. <Link /> doesn't encode non-ASCII characters
    // 2. useRouter() uses `new URL()` internally, which will encode—but only if necessary
    // 3. redirect() uses useRouter() on the client, but on the server side only
    //    assigns the location header without encoding.
    //
    // In addition to this, for getPathname() we need to encode non-ASCII characters.
    //
    // Therefore, the bottom line is that next-intl should take care of encoding non-ASCII
    // characters in all cases, but can rely on `new URL()` to not double-encode characters.
    return new URL(pathname, 'http://l').pathname;
}
function getRoute(locale, pathname, pathnames) {
    const sortedPathnames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getSortedPathnames"])(Object.keys(pathnames));
    const decoded = decodeURI(pathname);
    for (const internalPathname of sortedPathnames){
        const localizedPathnamesOrPathname = pathnames[internalPathname];
        if (typeof localizedPathnamesOrPathname === 'string') {
            const localizedPathname = localizedPathnamesOrPathname;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])(localizedPathname, decoded)) {
                return internalPathname;
            }
        } else {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["matchesPathname"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(localizedPathnamesOrPathname, locale, internalPathname), decoded)) {
                return internalPathname;
            }
        }
    }
    return pathname;
}
function getBasePath(pathname, windowPathname = window.location.pathname) {
    if (pathname === '/') {
        return windowPathname;
    } else {
        return windowPathname.replace(pathname, '');
    }
}
function applyPathnamePrefix(pathname, locale, routing, force) {
    const { mode } = routing.localePrefix;
    let shouldPrefix;
    if (force !== undefined) {
        shouldPrefix = force;
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocalizableHref"])(pathname)) {
        if (mode === 'always') {
            shouldPrefix = true;
        } else if (mode === 'as-needed') {
            shouldPrefix = routing.domains ? // Since locales are unique per domain, any locale that is a
            // default locale of a domain doesn't require a prefix
            !routing.domains.some((cur)=>cur.defaultLocale === locale) : locale !== routing.defaultLocale;
        }
    }
    return shouldPrefix ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["prefixPathname"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, routing.localePrefix), pathname) : pathname;
}
function validateReceivedConfig(config) {
    if (config.localePrefix?.mode === 'as-needed' && !('defaultLocale' in config)) {
        throw new Error("`localePrefix: 'as-needed' requires a `defaultLocale`.");
    }
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/createSharedNavigationFns.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createSharedNavigationFns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/esm/api/navigation.react-server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/routing/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$use$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/use.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/jsx-runtime.react-server.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Shared implementations for `react-server` and `react-client`
 */ function createSharedNavigationFns(getLocale, routing) {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["receiveRoutingConfig"])(routing || {});
    {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateReceivedConfig"])(config);
    }
    const pathnames = config.pathnames;
    function Link({ href, locale, ...rest }, ref) {
        let pathname, params;
        if (typeof href === 'object') {
            pathname = href.pathname;
            // @ts-expect-error -- This is ok
            params = href.params;
        } else {
            pathname = href;
        }
        // @ts-expect-error -- This is ok
        const isLocalizable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocalizableHref"])(href);
        const localePromiseOrValue = getLocale();
        const curLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPromise"])(localePromiseOrValue) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$use$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(localePromiseOrValue) : localePromiseOrValue;
        const finalPathname = isLocalizable ? getPathname({
            locale: locale || curLocale,
            // @ts-expect-error -- This is ok
            href: pathnames == null ? pathname : {
                pathname,
                params
            },
            // Always include a prefix when changing locales
            forcePrefix: locale != null || undefined
        }) : pathname;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$BaseLink$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"], {
            ref: ref,
            href: typeof href === 'object' ? {
                ...href,
                pathname: finalPathname
            } : finalPathname,
            locale: locale,
            localeCookie: config.localeCookie,
            ...rest
        });
    }
    const LinkWithRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["forwardRef"])(Link);
    function getPathname(args) {
        const { forcePrefix, href, locale } = args;
        let pathname;
        if (pathnames == null) {
            if (typeof href === 'object') {
                pathname = href.pathname;
                if (href.query) {
                    pathname += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["serializeSearchParams"])(href.query);
                }
            } else {
                pathname = href;
            }
        } else {
            pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["compileLocalizedPathname"])({
                locale,
                // @ts-expect-error -- This is ok
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeNameOrNameWithParams"])(href),
                // @ts-expect-error -- This is ok
                pathnames: config.pathnames
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyPathnamePrefix"])(pathname, locale, config, forcePrefix);
    }
    function getRedirectFn(fn) {
        /** @see https://next-intl.dev/docs/routing/navigation#redirect */ return function redirectFn(args, ...rest) {
            return fn(getPathname(args), ...rest);
        };
    }
    const redirect$1 = getRedirectFn(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["redirect"]);
    const permanentRedirect$1 = getRedirectFn(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["permanentRedirect"]);
    return {
        config,
        Link: LinkWithRef,
        redirect: redirect$1,
        permanentRedirect: permanentRedirect$1,
        getPathname
    };
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocaleCache.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedRequestLocale",
    ()=>getCachedRequestLocale,
    "setCachedRequestLocale",
    ()=>setCachedRequestLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
;
// See https://github.com/vercel/next.js/discussions/58862
function getCacheImpl() {
    const value = {
        locale: undefined
    };
    return value;
}
const getCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getCacheImpl);
function getCachedRequestLocale() {
    return getCache().locale;
}
function setCachedRequestLocale(locale) {
    getCache().locale = locale;
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRequestLocale",
    ()=>getRequestLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/esm/api/headers.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/esm/server/request/headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocaleCache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocaleCache.js [middleware-edge] (ecmascript)");
;
;
;
;
;
async function getHeadersImpl() {
    const promiseOrValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["headers"])();
    // Compatibility with Next.js <15
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPromise"])(promiseOrValue) ? await promiseOrValue : promiseOrValue;
}
const getHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getHeadersImpl);
async function getLocaleFromHeaderImpl() {
    let locale;
    try {
        locale = (await getHeaders()).get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HEADER_LOCALE_NAME"]) || undefined;
    } catch (error) {
        if (error instanceof Error && error.digest === 'DYNAMIC_SERVER_USAGE') {
            const wrappedError = new Error('Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/routing/setup#static-rendering', {
                cause: error
            });
            wrappedError.digest = error.digest;
            throw wrappedError;
        } else {
            throw error;
        }
    }
    return locale;
}
const getLocaleFromHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getLocaleFromHeaderImpl);
async function getRequestLocale() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocaleCache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCachedRequestLocale"])() || await getLocaleFromHeader();
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Should be called in `i18n/request.ts` to create the configuration for the current request.
 */ __turbopack_context__.s([
    "default",
    ()=>getRequestConfig
]);
function getRequestConfig(createRequestConfig) {
    return createRequestConfig;
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRequestConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/validateLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>validateLocale
]);
function validateLocale(locale) {
    try {
        const constructed = new Intl.Locale(locale);
        if (!constructed.language) {
            throw new Error('Language is required');
        }
    } catch  {
        console.error(`An invalid locale was provided: "${locale}"\nPlease ensure you're using a valid Unicode locale identifier (e.g. "en-US").`);
    }
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/getConfig.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+test@1.56.0_babel-p_2aa80bde92c9f69f4517f7b53bbc1600/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$intl$40$4$2e$3$2e$11_react$40$19$2e$1$2e$0$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$z8OlpM94$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__i__as__initializeConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/use-intl@4.3.11_react@19.1.0/node_modules/use-intl/dist/esm/development/initializeConfig-z8OlpM94.js [middleware-edge] (ecmascript) <export i as initializeConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$intl$40$4$2e$3$2e$11_react$40$19$2e$1$2e$0$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$z8OlpM94$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__b__as__$5f$createIntlFormatters$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/use-intl@4.3.11_react@19.1.0/node_modules/use-intl/dist/esm/development/initializeConfig-z8OlpM94.js [middleware-edge] (ecmascript) <export b as _createIntlFormatters>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$intl$40$4$2e$3$2e$11_react$40$19$2e$1$2e$0$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$z8OlpM94$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__d__as__$5f$createCache$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/use-intl@4.3.11_react@19.1.0/node_modules/use-intl/dist/esm/development/initializeConfig-z8OlpM94.js [middleware-edge] (ecmascript) <export d as _createCache>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/shared/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocale.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/frontend/src/lib/i18n/config.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$validateLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/validateLocale.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
// This is automatically inherited by `NextIntlClientProvider` if
// the component is rendered from a Server Component
function getDefaultTimeZoneImpl() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
const getDefaultTimeZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getDefaultTimeZoneImpl);
async function receiveRuntimeConfigImpl(getConfig, localeOverride) {
    if (typeof getConfig !== 'function') {
        throw new Error(`Invalid i18n request configuration detected.

Please verify that:
1. In case you've specified a custom location in your Next.js config, make sure that the path is correct.
2. You have a default export in your i18n request configuration file.

See also: https://next-intl.dev/docs/usage/configuration#i18n-request
`);
    }
    const params = {
        locale: localeOverride,
        // In case the consumer doesn't read `params.locale` and instead provides the
        // `locale` (either in a single-language workflow or because the locale is
        // read from the user settings), don't attempt to read the request locale.
        get requestLocale () {
            return localeOverride ? Promise.resolve(localeOverride) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRequestLocale"])();
        }
    };
    let result = getConfig(params);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isPromise"])(result)) {
        result = await result;
    }
    if (!result.locale) {
        throw new Error('No locale was returned from `getRequestConfig`.\n\nSee https://next-intl.dev/docs/usage/configuration#i18n-request');
    }
    {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$validateLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(result.locale);
    }
    return result;
}
const receiveRuntimeConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(receiveRuntimeConfigImpl);
const getFormatters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$intl$40$4$2e$3$2e$11_react$40$19$2e$1$2e$0$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$z8OlpM94$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__b__as__$5f$createIntlFormatters$3e$__["_createIntlFormatters"]);
const getCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$intl$40$4$2e$3$2e$11_react$40$19$2e$1$2e$0$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$z8OlpM94$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__d__as__$5f$createCache$3e$__["_createCache"]);
async function getConfigImpl(localeOverride) {
    const runtimeConfig = await receiveRuntimeConfig(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$frontend$2f$src$2f$lib$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"], localeOverride);
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$use$2d$intl$40$4$2e$3$2e$11_react$40$19$2e$1$2e$0$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$z8OlpM94$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__i__as__initializeConfig$3e$__["initializeConfig"])(runtimeConfig),
        _formatters: getFormatters(getCache()),
        timeZone: runtimeConfig.timeZone || getDefaultTimeZone()
    };
}
const getConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$56$2e$0_babel$2d$p_2aa80bde92c9f69f4517f7b53bbc1600$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cache"])(getConfigImpl);
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/react-server/getServerLocale.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getServerLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/server/react-server/getConfig.js [middleware-edge] (ecmascript)");
;
/**
 * This is only moved to a separate module for easier mocking in
 * `../createNavigatoin.test.tsx` in order to avoid suspending.
 */ async function getServerLocale() {
    const config = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])();
    return config.locale;
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$createSharedNavigationFns$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/shared/createSharedNavigationFns.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$getServerLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/react-server/getServerLocale.js [middleware-edge] (ecmascript)");
;
;
function createNavigation(routing) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { config, ...fns } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$createSharedNavigationFns$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$getServerLocale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"], routing);
    function notSupported(hookName) {
        return ()=>{
            throw new Error(`\`${hookName}\` is not supported in Server Components. You can use this hook if you convert the calling component to a Client Component.`);
        };
    }
    return {
        ...fns,
        usePathname: notSupported('usePathname'),
        useRouter: notSupported('useRouter')
    };
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript) <export default as createNavigation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNavigation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>defineRouting
]);
function defineRouting(config) {
    if (config.domains) {
        validateUniqueLocalesPerDomain(config.domains);
    }
    return config;
}
function validateUniqueLocalesPerDomain(domains) {
    const domainsByLocale = new Map();
    for (const { domain, locales } of domains){
        for (const locale of locales){
            const localeDomains = domainsByLocale.get(locale) || new Set();
            localeDomains.add(domain);
            domainsByLocale.set(locale, localeDomains);
        }
    }
    const duplicateLocaleMessages = Array.from(domainsByLocale.entries()).filter(([, localeDomains])=>localeDomains.size > 1).map(([locale, localeDomains])=>`- "${locale}" is used by: ${Array.from(localeDomains).join(', ')}`);
    if (duplicateLocaleMessages.length > 0) {
        console.warn('Locales are expected to be unique per domain, but found overlap:\n' + duplicateLocaleMessages.join('\n') + '\nPlease see https://next-intl.dev/docs/routing/configuration#domains');
    }
}
;
}),
"[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript) <export default as defineRouting>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineRouting",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$4$2e$3$2e$11_next$40$15$2e$5$2e$4_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$te_e116e0f8aec13dcb13f9bcd4e4de31ad$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@4.3.11_next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_@playwright+te_e116e0f8aec13dcb13f9bcd4e4de31ad/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript)");
}),
]);

//# sourceMappingURL=d1733_next-intl_dist_esm_development_372019df._.js.map