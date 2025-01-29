"use strict";
const descripcionInput = document.getElementById("descripcion");
const montoInput = document.getElementById("monto");
const btnIngreso = document.getElementById("btn-ingreso");
const btnGasto = document.getElementById("btn-gasto");
const listaTransacciones = document.getElementById("lista-transacciones");
const balanceDisplay = document.getElementById("balance");
const transacciones = [];
const actualizarUI = () => {
    listaTransacciones.innerHTML = "";
    let balance = 0;
    transacciones.forEach(transaccion => {
        const li = document.createElement("li");
        li.textContent = `${transaccion.descripcion}: $${transaccion.monto}`;
        li.classList.add(transaccion.tipo);
        listaTransacciones.appendChild(li);
        balance += transaccion.tipo === "ingreso" ? transaccion.monto : -transaccion.monto;
    });
    balanceDisplay.textContent = `$${balance}`;
    balanceDisplay.style.color = balance >= 0 ? "green" : "red";
};
const agregarTransaccion = (tipo) => {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();
    if (!descripcion || isNaN(monto) || monto <= 0) {
        alert("Ingresa una descripcion valida y un monto positivo.");
        return;
    }
    const nuevaTransaccion = {
        id: Date.now(),
        monto,
        descripcion,
        tipo
    };
    transacciones.push(nuevaTransaccion);
    actualizarUI();
    // limpia los inputs
    descripcionInput.value = "";
    montoInput.value = "";
};
btnIngreso.addEventListener("click", () => agregarTransaccion("ingreso"));
btnGasto.addEventListener("click", () => agregarTransaccion("gasto"));
