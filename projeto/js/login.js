const togglePassword = document.getElementById("togglePassword");
    const senhaInput = document.getElementById("senha");

    togglePassword.addEventListener("click", () => {
      const type = senhaInput.getAttribute("type") === "password" ? "text" : "password";
      senhaInput.setAttribute("type", type);
      togglePassword.innerHTML = type === "password" 
        ? '<i class="bi bi-eye"></i>' 
        : '<i class="bi bi-eye-slash"></i>';
    });