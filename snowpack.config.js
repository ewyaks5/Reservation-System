// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "frontend/ts": "/js",
    "frontend/scss": "/css",
    "frontend": "/"
  },
  plugins: [
    ["@snowpack/plugin-typescript", {
      args: ["--project ./tsconfig.frontend.json"]
    }],
    "@snowpack/plugin-sass"
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    "out": "./static"
  },
};
