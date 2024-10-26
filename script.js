

let prestamos = [];


function Prestamo(monto, cuotas, tasaInteres) {
    this.monto = monto;
    this.cuotas = cuotas;
    this.tasaInteres = tasaInteres;
    this.resultados = [];
}


Prestamo.prototype.calcularPagos = function() {
    let montoConInteres = this.monto * (1 + this.tasaInteres / 100);
    let pagoMensual = montoConInteres / this.cuotas;
    
    for (let i = 1; i <= this.cuotas; i++) {
        this.resultados.push({
            cuota: i,
            montoCuota: pagoMensual.toFixed(2)
        });
    }
};


Prestamo.prototype.mostrarResultados = function() {
    let mensaje = `Pago en ${this.cuotas} cuotas con una tasa de ${this.tasaInteres}%\nMonto Total: ${this.monto}\n`;
    this.resultados.forEach(resultado => {
        mensaje += `Cuota ${resultado.cuota}: $${resultado.montoCuota}\n`;
    });
    alert(mensaje);
};


Prestamo.prototype.calcularTotalPagos = function() {
    return this.resultados.reduce((total, cuota) => total + parseFloat(cuota.montoCuota), 0).toFixed(2);
};

function agregarPrestamo(monto, cuotas, tasaInteres) {
    let nuevoPrestamo = new Prestamo(monto, cuotas, tasaInteres);
    nuevoPrestamo.calcularPagos();
    prestamos.push(nuevoPrestamo);
    alert("Préstamo agregado exitosamente.");
}


function mostrarResumenPrestamos() {
    if (prestamos.length === 0) {
        alert("No hay préstamos para mostrar.");
        return;
    }

    let mensaje = "Resumen de todos los préstamos:\n";
    prestamos.forEach((prestamo, index) => {
        mensaje += `\nPréstamo ${index + 1}:\nMonto: $${prestamo.monto}\nCuotas: ${prestamo.cuotas}\nTasa de Interés: ${prestamo.tasaInteres}%\nTotal a Pagar: $${prestamo.calcularTotalPagos()}\n`;
    });
    alert(mensaje);
}


function simuladorPagos() {
    let monto = parseFloat(prompt("Ingresa el monto del préstamo:"));
    
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor ingresa un monto válido.");
        return;
    }

    let cuotas = parseInt(prompt("Ingresa la cantidad de cuotas:"));
    
    if (isNaN(cuotas) || cuotas <= 0) {
        alert("Por favor ingresa una cantidad válida de cuotas.");
        return;
    }

    let tasaInteres = parseFloat(prompt("Ingresa la tasa de interés (%):"));
    
    if (isNaN(tasaInteres) || tasaInteres < 0) {
        alert("Por favor ingresa una tasa de interés válida.");
        return;
    }

    let confirmacion = confirm(`Estás por solicitar un préstamo de $${monto} en ${cuotas} cuotas con una tasa de interés del ${tasaInteres}%. ¿Deseas continuar?`);

    if (confirmacion) {
        agregarPrestamo(monto, cuotas, tasaInteres);
        let mostrar = confirm("¿Deseas ver los detalles del préstamo?");
        if (mostrar) {
            prestamos[prestamos.length - 1].mostrarResultados();
        }
    } else {
        alert("Operación cancelada.");
    }

    let resumen = confirm("¿Quieres ver un resumen de todos los préstamos?");
    if (resumen) {
        mostrarResumenPrestamos();
    }
}


simuladorPagos();
