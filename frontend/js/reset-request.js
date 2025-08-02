document.getElementById('request-reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const mensaje = document.querySelector('.mensaje');

  try {
    const res = await fetch('/api/auth/reset-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    mensaje.textContent = data.message;
  } catch (err) {
    mensaje.textContent = "Error al procesar la solicitud";
  }
});