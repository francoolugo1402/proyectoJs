document.getElementById("calcularBtn").addEventListener("click", calcularPrestamo);
document.getElementById("historialBtn").addEventListener("click", mostrarHistorial);
document.querySelector(".close").addEventListener("click", cerrarModal);

function calcularPrestamo() {
    const monto = parseFloat(document.getElementById("monto").value);
    const plazo = parseInt(document.getElementById("plazo").value);
    const interesAnual = parseFloat(document.getElementById("interes").value);
    
    if (isNaN(monto) || isNaN(plazo) || isNaN(interesAnual)) {
        alert("Por favor, complete todos los campos");
        return;
    }

    const interesMensual = interesAnual / 12 / 100;
    const cuotaMensual = monto * interesMensual / (1 - Math.pow(1 + interesMensual, -plazo));
    const totalPago = cuotaMensual * plazo;

    
    document.getElementById("resultado").innerHTML = `
        <p>Cuota mensual: $${cuotaMensual.toFixed(2)}</p>
        <p>Total a pagar: $${totalPago.toFixed(2)}</p>
    `;

    
    guardarHistorial(monto, plazo, interesAnual, cuotaMensual.toFixed(2), totalPago.toFixed(2));
}

function guardarHistorial(monto, plazo, interesAnual, cuotaMensual, totalPago) {
    const prestamo = {
        monto,
        plazo,
        interesAnual,
        cuotaMensual,
        totalPago,
        fecha: new Date().toLocaleDateString()
    };

    let historial = JSON.parse(localStorage.getItem("historialPrestamos")) || [];
    historial.push(prestamo);
    localStorage.setItem("historialPrestamos", JSON.stringify(historial));
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historialPrestamos")) || [];
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = "";

    if (historial.length === 0) {
        historialDiv.innerHTML = "<p>No hay préstamos registrados.</p>";
    } else {
        historial.forEach((prestamo, index) => {
            historialDiv.innerHTML += `
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

    document.getElementById("modalHistorial").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalHistorial").style.display = "none";
}


window.onclick = function(event) {
    if (event.target == document.getElementById("modalHistorial")) {
        cerrarModal();
    }
};
