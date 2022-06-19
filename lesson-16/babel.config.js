module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],

  env: {
    production: {
      plugins: [
        ["@babel/transform-runtime"],
        ["babel-plugin-jsx-remove-data-test-id"],
        [
          "@babel/plugin-transform-react-jsx",
          {
            runtime: "automatic",
          },
        ],
      ],
    },
    development: {
      plugins: [
        ["@babel/transform-runtime"],
        [
          "@babel/plugin-transform-react-jsx",
          {
            runtime: "automatic",
          },
        ],
      ],
    },
    test: {
      plugins: [
        ["@babel/transform-runtime"],
        [
          "@babel/plugin-transform-react-jsx",
          {
            runtime: "automatic",
          },
        ],
      ],
    },
  },
}
