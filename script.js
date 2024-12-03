document.addEventListener('DOMContentLoaded', function () {

    async function calcularPrestamo() {
        const monto = parseFloat(document.getElementById("monto").value);
        const plazo = parseInt(document.getElementById("plazo").value);
        const interesAnual = parseFloat(document.getElementById("interes").value);

        if (isNaN(monto) || isNaN(plazo) || isNaN(interesAnual)) {
            Swal.fire({
                title: "Faltan datos!",
                text: "Por favor, complete todos los campos",
                icon: "warning",
                confirmButtonText: "Cargar datos",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Tu préstamo fue calculado con éxito",
            showConfirmButton: false,
            timer: 1500,
        });

        const interesMensual = interesAnual / 12 / 100;
        const cuotaMensual = monto * interesMensual / (1 - Math.pow(1 + interesMensual, -plazo));
        const totalPago = cuotaMensual * plazo;

        const prestamo = {
            monto,
            plazo,
            interesAnual,
            cuotaMensual: cuotaMensual.toFixed(2),
            totalPago: totalPago.toFixed(2),
            fecha: new Date().toLocaleDateString(),
        };


        let prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];
        prestamos.push(prestamo);
        localStorage.setItem("prestamos", JSON.stringify(prestamos));

        document.getElementById("mensajeResultado").textContent =
            `Cuota mensual: $${prestamo.cuotaMensual}, Total a pagar: $${prestamo.totalPago}`;
    }


    function mostrarHistorial() {
        const prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];
        const historialLista = document.getElementById("historialLista");
        historialLista.innerHTML = "";

        if (prestamos.length === 0) {
            historialLista.innerHTML = "<p>No hay préstamos registrados.</p>";
        } else {
            prestamos.forEach((prestamo, index) => {
                historialLista.innerHTML += `
                    <p><strong>Préstamo ${index + 1}:</strong></p>
                    <p>Monto: $${prestamo.monto}</p>
                    <p>Plazo: ${prestamo.plazo} meses</p>
                    <p>Interés Anual: ${prestamo.interesAnual}%</p>
                    <p>Cuota Mensual: $${prestamo.cuotaMensual}</p>
                    <p>Total a Pagar: $${prestamo.totalPago}</p>
                    <p>Fecha: ${prestamo.fecha}</p>
                    <hr>
                `;
            });
        }


        document.getElementById("historial").style.display = "block";
    }


    function cerrarModal() {
        document.getElementById("historial").style.display = "none";
    }


    function borrarHistorial() {
        localStorage.removeItem("prestamos");
        mostrarHistorial();
    }


    document.getElementById("calcularBtn").addEventListener("click", calcularPrestamo);
    document.getElementById("historialBtn").addEventListener("click", mostrarHistorial);
    document.querySelector(".close").addEventListener("click", cerrarModal);
    document.getElementById("borrarHistorialBtn").addEventListener("click", borrarHistorial);


    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });
});
