module.exports = {
    babelrc: false,
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        "dynamic-import-node",
        "react-loadable/babel",
        '@babel/plugin-transform-runtime',
        "@babel/plugin-proposal-class-properties",
        ["import", {
            "libraryName": "antd",
            //"libraryDirectory": "es",
            "style": "true"
        }]
    ]
}