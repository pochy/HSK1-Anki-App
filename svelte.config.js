import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    prerender: {
      entries: ["*"],
    },
    // GitHub Pages のサブディレクトリに対応
    paths: {
      base: process.env.BASE_PATH || "/HSK1-Anki-App",
    },
  },
};

export default config;

