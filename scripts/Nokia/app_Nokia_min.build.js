require({
        requireUrl: "../requirejs/require.js",
        dir: "../build/webapp-build_Nok-min",
        optimize: "closure",
        inlineText: false,
        execModules: false,
		includeRequire: true, 
		pragmas: {
            requireExcludeModify: true,
            requireExcludePlugin: true,
            requireExcludeContext: true
        }
    },
    "app_Nokia"
);
