import { createApp } from "../../dist/guide-mini-vue.esm.js";

import { App } from "./App.js";

const container = document.querySelector("#app");
createApp(App).mount(container);
