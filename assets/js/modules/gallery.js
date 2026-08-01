/* gallery.js — ampliar una pieza de la galería en un diálogo modal.

   Se apoya en <dialog>: Escape, el foco atrapado dentro y la devolución del
   foco al botón que abrió el diálogo son comportamiento nativo. */

window.DYEL = window.DYEL || {};

window.DYEL.gallery = (() => {
  "use strict";

  const init = () => {
    const gallery = document.querySelector(".gallery");
    const dialog = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");

    if (!gallery || !dialog || !image || !caption || !closeButton) {
      return;
    }

    // Sin <dialog> modal no hay ampliación: los botones se retiran para no
    // dejar controles que no hacen nada.
    if (typeof dialog.showModal !== "function") {
      gallery.querySelectorAll(".gallery__trigger").forEach((trigger) => {
        const picture = trigger.querySelector("img");
        if (picture) {
          trigger.replaceWith(picture);
        }
      });
      return;
    }

    gallery.addEventListener("click", (event) => {
      const trigger = event.target.closest(".gallery__trigger");
      if (!trigger) {
        return;
      }

      const source = trigger.querySelector("img");

      image.src = trigger.dataset.full || (source ? source.src : "");
      image.alt = source ? source.alt : "";
      image.width = source ? source.naturalWidth || source.width : 0;
      image.height = source ? source.naturalHeight || source.height : 0;
      caption.textContent = trigger.dataset.caption || "";

      document.body.classList.add("is-locked");
      dialog.showModal();
    });

    closeButton.addEventListener("click", () => dialog.close());

    // Pulsar fuera de la figura cierra el diálogo.
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("is-locked");
    });
  };

  return { init };
})();
