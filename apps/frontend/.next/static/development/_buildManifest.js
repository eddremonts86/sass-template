self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "has": [
          {
            "type": "header",
            "key": "cache-control",
            "value": "public, max-age=3600, s-maxage=86400"
          }
        ],
        "source": "/api/:path*",
        "destination": "/api/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()