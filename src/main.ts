import { ViteSSG } from "vite-ssg";
import { setupLayouts } from "virtual:generated-layouts";
// import Previewer from 'virtual:vue-component-preview'
import App from "./App.vue";
import type { UserModule } from "./types";
import generatedRoutes from "~pages";

import "@unocss/reset/tailwind.css";
import "./styles/main.css";
import "uno.css";

const routes = setupLayouts(generatedRoutes);

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  // install all modules under `modules/`
  Object.values(
    import.meta.glob<{ install: UserModule }>("./modules/*.ts", { eager: true })
  ).forEach((i) => i.install?.(ctx));
  // ctx.app.use(Previewer)
});

console.log("%cHello There!", "background: #6C655100 ; color: #fff ; padding: 1em 0em ; font-size: 1.5em ; font-weight: bold ;");
console.log("%c--> aphlarex@live.com", "padding: 1em 0em ;font-size: 1.15em ;");
