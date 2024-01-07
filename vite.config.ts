import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";

export default defineConfig({
  plugins: [
    remix({
      // No need to worry about this, it's just to use the easier routing convention,
      // which simplifies understand this repo.
      //
      // https://remix.run/docs/en/main/start/v2#upgrading-without-changing-files
      routes: async (defineRoutes) => {
        return createRoutesFromFolders(defineRoutes);
      },
    }),
    tsconfigPaths(),
  ],
});
