import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://mithun.com.au",
  output: "static",
  integrations: [
    icon({
      include: {
        ph: ["arrow-up-right", "sun", "moon"],
      },
    }),
  ],
});
