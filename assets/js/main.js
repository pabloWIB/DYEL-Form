/* main.js — único punto de entrada.

   Los módulos se cargan como scripts clásicos con `defer` en lugar de módulos
   ES a propósito: así la página también funciona al abrir index.html con doble
   clic, porque el navegador bloquea los módulos ES bajo el protocolo file://.
   `defer` conserva el orden, de modo que aquí window.DYEL ya está completo y
   el DOM ya está analizado. */

(() => {
  "use strict";

  const modules = window.DYEL;

  if (!modules) {
    return;
  }

  [modules.nav, modules.auth, modules.gallery].forEach((module) => {
    if (module && typeof module.init === "function") {
      module.init();
    }
  });
})();
