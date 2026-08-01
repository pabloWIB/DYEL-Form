/* nav.js — cajón de navegación móvil */

window.DYEL = window.DYEL || {};

window.DYEL.nav = (() => {
  "use strict";

  const DESKTOP_QUERY = "(min-width: 768px)";

  const init = () => {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("menu-principal");
    const scrim = document.getElementById("scrim");

    if (!burger || !nav || !scrim) {
      return;
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);

    const isOpen = () => document.body.classList.contains("is-nav-open");

    const open = () => {
      document.body.classList.add("is-nav-open", "is-locked");
      burger.setAttribute("aria-expanded", "true");
      scrim.hidden = false;

      const firstLink = nav.querySelector("a");
      if (firstLink) {
        // El cajón pasa de `visibility: hidden` a `visible` mediante una
        // transición: en este mismo tick todavía no es enfocable. Se espera al
        // siguiente fotograma para que focus() surta efecto.
        window.requestAnimationFrame(() => firstLink.focus());
      }
    };

    const close = ({ restoreFocus = false } = {}) => {
      document.body.classList.remove("is-nav-open", "is-locked");
      burger.setAttribute("aria-expanded", "false");
      scrim.hidden = true;

      if (restoreFocus) {
        burger.focus();
      }
    };

    burger.addEventListener("click", () => {
      if (isOpen()) {
        close({ restoreFocus: true });
      } else {
        open();
      }
    });

    scrim.addEventListener("click", () => close({ restoreFocus: true }));

    // Cerrar al pulsar cualquier enlace del menú.
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a") && isOpen()) {
        close();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        close({ restoreFocus: true });
      }
    });

    // Al pasar a escritorio el cajón desaparece: hay que soltar el bloqueo
    // de desplazamiento y dejar los atributos coherentes.
    desktop.addEventListener("change", (event) => {
      if (event.matches && isOpen()) {
        close();
      }
    });
  };

  return { init };
})();
