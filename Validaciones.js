document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario-suscripcion");
  const nombreInput = document.getElementById("nombre");
  const saludoTitulo = document.createElement("h2");
  saludoTitulo.id = "saludo";
  saludoTitulo.textContent = "HOLA";
  form.prepend(saludoTitulo);

  const campos = [
    "nombre", "email", "contrasena", "repetir-contrasena", "edad",
    "telefono", "direccion", "ciudad", "cp", "dni"
  ];

  const validadores = {
    nombre: valor => valor.length > 6 && valor.includes(" "),
    email: valor => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(valor),
    contrasena: valor => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valor),
    "repetir-contrasena": valor => valor === document.getElementById("contrasena").value,
    edad: valor => Number(valor) >= 18,
    telefono: valor => /^\d{7,}$/.test(valor),
    direccion: valor => valor.length >= 5 && /\d/.test(valor) && /[A-Za-z]/.test(valor) && valor.includes(" "),
    ciudad: valor => valor.length >= 3,
    cp: valor => valor.length >= 3,
    dni: valor => /^\d{7,8}$/.test(valor)
  };

  const mensajesError = {
    nombre: "Debe tener más de 6 letras y al menos un espacio.",
    email: "Email inválido.",
    contrasena: "Debe tener al menos 8 caracteres con letras y números.",
    "repetir-contrasena": "Las contraseñas no coinciden.",
    edad: "Debes tener al menos 18 años.",
    telefono: "Debe tener al menos 7 dígitos sin símbolos.",
    direccion: "Debe tener letras, números y un espacio.",
    ciudad: "Debe tener al menos 3 caracteres.",
    cp: "Debe tener al menos 3 caracteres.",
    dni: "Debe tener 7 u 8 dígitos."
  };

  campos.forEach(campo => {
    const input = document.getElementById(campo);
    const error = document.getElementById(`error-${campo}`);

    input.addEventListener("blur", () => {
      const valor = input.value.trim();
      if (!validadores[campo](valor)) {
        error.textContent = mensajesError[campo];
      }
    });

    input.addEventListener("focus", () => {
      error.textContent = "";
    });
  });

  // Bonus: actualizar saludo con nombre
  nombreInput.addEventListener("focus", () => {
    saludoTitulo.textContent = "HOLA " + nombreInput.value.trim();
  });

  nombreInput.addEventListener("keydown", () => {
    setTimeout(() => {
      saludoTitulo.textContent = "HOLA " + nombreInput.value.trim();
    }, 0);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let errores = [];

    campos.forEach(campo => {
      const input = document.getElementById(campo);
      const valor = input.value.trim();
      const error = document.getElementById(`error-${campo}`);
      if (!validadores[campo](valor)) {
        error.textContent = mensajesError[campo];
        errores.push(`${campo}: ${mensajesError[campo]}`);
      } else {
        error.textContent = "";
      }
    });

    if (errores.length === 0) {
      const datos = campos.map(campo => {
        const valor = document.getElementById(campo).value.trim();
        return `${campo}: ${valor}`;
      }).join("\n");
      alert("Formulario válido ✅\n\n" + datos);
    } else {
      alert("Errores en el formulario ⚠️\n\n" + errores.join("\n"));
    }
  });
});
