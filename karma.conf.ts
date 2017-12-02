// karma.conf.ts
module.exports = (config) => {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        browsers : ["Chrome"],
        basePath: "./src/",
        files: [
            {pattern: "assets/gs-json/*.gs", watched: false, included: false, served: true, nocache: false},
            {pattern: "typescript/gs-json/**/*.ts" },
        ],
        karmaTypescriptConfig: {
            compilerOptions: {
                module: "commonjs",
                lib: [ "es2016", "dom" ],
            },
        },
        plugins: [
            require("karma-typescript"),
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage-istanbul-reporter"),
        ],
        client:{
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: [ "html", "lcovonly" ],
            fixWebpackSourcePaths: true,
        },
        autoWatch: true,
        preprocessors: {
            "**/*.ts": ["karma-typescript"], // *.tsx for React Jsx
        },
        reporters: ["progress", "karma-typescript", "kjhtml"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: false,
    });
};
