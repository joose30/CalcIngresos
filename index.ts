type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
}


const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const montoInput = document.getElementById("monto") as HTMLInputElement;
const btnIngreso = document.getElementById("btn-ingreso") as HTMLButtonElement;
const btnGasto = document.getElementById("btn-gasto") as HTMLButtonElement;
const listaTransacciones = document.getElementById("lista-transacciones") as HTMLUListElement;
const balanceDisplay = document.getElementById("balance") as HTMLSpanElement;

const transacciones: Transaccion[] = [];

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

const agregarTransaccion = (tipo: TipoTransaccion) => {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();

    if (!descripcion || isNaN(monto) || monto <= 0) {
        alert("Ingresa una descripcion valida y un monto positivo.");
        return;
    }

    const nuevaTransaccion: Transaccion = {
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
