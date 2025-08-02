const mensajeError = document.getElementsByClassName("error")[0]

document.getElementById("login-form").addEventListener("submit",async (e)=>{
  e.preventDefault();
  const user = document.getElementById("user").value;
  const password = document.getElementById("password").value;
  
  try {
    const res = await fetch("http://localhost:4001/api/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({user,password})
  });

  const data = await res.json();

  if (!res.ok) {
      mensajeError.textContent = data.message || "Error al iniciar sesión";
      mensajeError.classList.remove("escondido");
      return;
    }

    if (data.redirect) {
      window.location.href = data.redirect;
    }

  } catch (error) {
    mensajeError.textContent = "Error de conexión con el servidor.";
    mensajeError.classList.remove("escondido");
    console.error(error);
  }
});