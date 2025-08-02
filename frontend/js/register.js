const form = document.getElementById('register-form');
const mensajeError = document.querySelector(".error");

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtener todos los valores
  const user = form.user.value.trim();
  const email = form.email.value.trim();
  const confirmEmail = form["confirm-email"].value.trim();
  const password = form.password.value;
  const confirmPassword = form["confirm-password"].value;
  const dni = form.dni.value.trim();
  const telefono = form.telefono.value.trim();
  const categoria = form.categoria.value.trim();
  const subcategoria = form.subcategoria.value.trim();
  const rol=form.rol.value.trim();
  
  // Validaciones básicas
  if (email !== confirmEmail) {
    alert("Los correos no coinciden");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const data = { user, email, password, dni, telefono, categoria, subcategoria, rol };

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      mensajeError.textContent = result.message || result.error || "Error al registrarse";
      mensajeError.classList.remove("escondido");
      return;
    }

    // Registro exitoso
    if (result.redirect) {
      window.location.href = result.redirect;
    } else {
      alert(result.message || "Registro exitoso");
    }

  } catch (err) {
    console.error(err);
    mensajeError.textContent = "Error inesperado. Inténtalo más tarde.";
    mensajeError.classList.remove("escondido");
  }
});