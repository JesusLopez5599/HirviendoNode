const params = new URLSearchParams(window.location.search);
const token = params.get("token");

document.getElementById('reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('newPassword').value;
  const mensaje = document.querySelector('.mensaje');

  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });

    const data = await res.json();
    mensaje.textContent = data.message;
  } catch (err) {
    mensaje.textContent = "Error al actualizar la contraseña.";
  }
});
