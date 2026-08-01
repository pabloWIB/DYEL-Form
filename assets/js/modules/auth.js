/* auth.js — cambio de panel y validación de los formularios de acceso.

   La validación es real y ocurre en el navegador. El envío no: DYEL no tiene
   servidor. El mensaje final lo dice de forma explícita en lugar de simular
   una cuenta creada. */

window.DYEL = window.DYEL || {};

window.DYEL.auth = (() => {
  "use strict";

  const CHECK_DELAY = 600;
  const TEL_PATTERN = /^\d{9,15}$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validators = {
    email: (value) => {
      if (!value) {
        return "Escribe tu correo electrónico.";
      }
      if (!EMAIL_PATTERN.test(value)) {
        return "Ese correo no es válido. Debe tener la forma nombre@dominio.com.";
      }
      return "";
    },
    password: (value) => {
      if (!value) {
        return "Escribe una contraseña.";
      }
      if (value.length < 8) {
        return `La contraseña necesita 8 caracteres como mínimo. Llevas ${value.length}.`;
      }
      return "";
    },
    telefono: (value) => {
      if (!value) {
        return "Escribe tu teléfono.";
      }
      if (!TEL_PATTERN.test(value.replace(/[\s-]/g, ""))) {
        return "El teléfono debe tener entre 9 y 15 dígitos, sin letras.";
      }
      return "";
    }
  };

  const setFieldError = (input, message) => {
    const field = input.closest(".field");
    const slot = document.querySelector(`[data-error-for="${input.id}"]`);

    if (field) {
      field.dataset.invalid = message ? "true" : "false";
    }
    if (slot) {
      slot.textContent = message;
    }
    input.setAttribute("aria-invalid", message ? "true" : "false");
  };

  const validateInput = (input) => {
    const validate = validators[input.name];
    if (!validate) {
      return "";
    }
    return validate(input.value.trim());
  };

  const setStatus = (form, message, state) => {
    const slot = form.querySelector("[data-form-status]");
    if (!slot) {
      return;
    }
    slot.textContent = message;
    if (state) {
      slot.dataset.state = state;
    } else {
      delete slot.dataset.state;
    }
  };

  const bindForm = (form) => {
    const inputs = Array.from(form.querySelectorAll(".field__input"));
    const submit = form.querySelector("[type='submit']");
    let pending = 0;

    // Limpia el error de un campo en cuanto pasa a ser correcto.
    form.addEventListener("input", (event) => {
      const input = event.target;
      if (!inputs.includes(input)) {
        return;
      }
      if (input.getAttribute("aria-invalid") === "true" && !validateInput(input)) {
        setFieldError(input, "");
      }
    });

    form.addEventListener("blur", (event) => {
      const input = event.target;
      if (inputs.includes(input) && input.value.trim()) {
        setFieldError(input, validateInput(input));
      }
    }, true);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (pending) {
        return;
      }

      let firstInvalid = null;

      inputs.forEach((input) => {
        const message = validateInput(input);
        setFieldError(input, message);
        if (message && !firstInvalid) {
          firstInvalid = input;
        }
      });

      if (firstInvalid) {
        const count = inputs.filter(
          (input) => input.getAttribute("aria-invalid") === "true"
        ).length;
        setStatus(
          form,
          count === 1 ? "Revisa el campo marcado." : `Revisa los ${count} campos marcados.`,
          "error"
        );
        firstInvalid.focus();
        return;
      }

      setStatus(form, "Comprobando los datos…", "sending");
      if (submit) {
        submit.disabled = true;
      }

      pending = window.setTimeout(() => {
        pending = 0;
        if (submit) {
          submit.disabled = false;
        }
        setStatus(
          form,
          "Datos correctos. Esta demo no tiene servidor: no se ha enviado ni guardado nada.",
          "done"
        );
      }, CHECK_DELAY);
    });

    form.addEventListener("reset", () => {
      inputs.forEach((input) => setFieldError(input, ""));
      setStatus(form, "", null);
    });
  };

  const init = () => {
    const auth = document.getElementById("auth");
    if (!auth) {
      return;
    }

    const showPanel = (name) => {
      const panel = auth.querySelector(`[data-auth-panel="${name}"]`);
      if (!panel) {
        return;
      }

      auth.dataset.panel = name;

      const focusable = panel.querySelector("input, button, a");
      if (focusable) {
        focusable.focus();
      }
    };

    auth.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-auth-go]");
      if (trigger) {
        showPanel(trigger.dataset.authGo);
      }
    });

    auth.querySelectorAll("form").forEach(bindForm);
  };

  return { init };
})();
