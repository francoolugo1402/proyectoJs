document.addEventListener("DOMContentLoaded", function () {
    let usuariosBase = [];


    async function cargarUsuarios() {
        try {
            const response = await fetch("usuarios.json");
            if (!response.ok) throw new Error("Error al cargar usuarios.json");
            usuariosBase = await response.json();
        } catch (error) {
            console.error("No se pudo cargar el archivo usuarios.json:", error);
        }
    }


    function obtenerUsuarios() {
        const usuariosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];
        return [...usuariosBase, ...usuariosLocales];
    }

    async function registrarUsuario() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            document.getElementById("registerError").textContent = "Las contraseñas no coinciden.";
            document.getElementById("registerError").style.display = "block";
            return;
        }

        const usuarios = obtenerUsuarios();
        const existeUsuario = usuarios.some((user) => user.username === username);

        if (existeUsuario) {
            document.getElementById("registerError").textContent = "El usuario ya existe.";
            document.getElementById("registerError").style.display = "block";
            return;
        }


        const nuevosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        nuevosUsuarios.push({ username, password });
        localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

        Swal.fire({
            icon: "success",
            title: "Registro completado",
            text: "Ya puedes iniciar sesión!",
            footer: '<a href="./login.html">Iniciar sesión</a>'
        });

        
    }



    async function iniciarSesion() {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const usuarios = obtenerUsuarios();
        const usuario = usuarios.find((user) => user.username === email && user.password === password);

        if (usuario) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "plextamo.html";
        } else {
            Swal.fire({
                title: "No se pudo iniciar sesión!",
                text: "Usuario y/o contraseña incorrectos",
                icon: "error",
                confirmButtonText: "Cargar datos",
            });
        }
    }

    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) registerBtn.addEventListener("click", registrarUsuario);

    const iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
    if (iniciarSesionBtn) iniciarSesionBtn.addEventListener("click", iniciarSesion);


    cargarUsuarios();
});
