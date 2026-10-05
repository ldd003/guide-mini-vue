//mini-vue 出口

export * from "@guide-mini-vue/runtime-dom";

import { baseCompile } from "@guide-mini-vue/compiler-core";

import * as runtimeDom from "@guide-mini-vue/runtime-dom";

import { registerRuntimeCompile } from "@guide-mini-vue/runtime-dom";

function compileToFunction(template) {
  const { code } = baseCompile(template);
  const render = new Function("vue", code)(runtimeDom);
  return render;
}

registerRuntimeCompile(compileToFunction);
