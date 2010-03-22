require({
        //appDir: "./",
        //baseUrl: "scripts/",
        requireUrl: "../requirejs/require.js",
        dir: "../build/webapp-build_Nok-min",
        //Comment out the optimize line if you want
        //the code minified by Closure Compiler using
        //the "simple" optimizations mode
        optimize: "closure",
        inlineText: false,
        execModules: false,
		includeRequire: true
    },
    "app_Nokia"
);
