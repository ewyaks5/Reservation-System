// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "frontend/ts": "/js",
    "frontend": "/"
  },
  plugins: [
    ["@snowpack/plugin-typescript", {
      args: ["--project ./tsconfig.frontend.json"]
    }],
    "@snowpack/plugin-sass",
    "@snowpack/plugin-postcss"
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
