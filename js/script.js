
let tasas = {
  "USD": {
    "USD": 1,
    "EUR": 0.92965,
    "ARS": 245.723,
    "GBP": 0.797,
    "JPY": 139.469
  },
  "EUR": {
    "USD": 1.07552,
    "EUR": 1,
    "ARS": 264.281,
    "GBP": 0.85725,
    "JPY": 150.012
  },
  "ARS": {
    "USD": 0.00407,
    "EUR": 0.00378,
    "ARS": 1,
    "GBP": 0.00324,
    "JPY": 0.56754
  },
  "GBP": {
    "USD": 1.25449,
    "EUR": 1.16628,
    "ARS": 308.258,
    "GBP": 1,
    "JPY": 174.972
  },
  "JPY": {
    "USD": 0.00717,
    "EUR": 0.00667,
    "ARS": 1.76162,
    "GBP": 0.00571,
    "JPY": 1
  }
};

function convertirDivisa() {
  let montoInput = document.getElementById("amount");
  let monedaOrigenSelect = document.getElementById("from");
  let monedaDestinoSelect = document.getElementById("to");
  let resultadoDiv = document.getElementById("result");

  let monto = parseFloat(montoInput.value);
  let monedaOrigen = monedaOrigenSelect.value;
  let monedaDestino = monedaDestinoSelect.value;

  if (isNaN(monto)) {
    resultadoDiv.textContent = "Ingrese un monto válido.";
    return;
  }

  if (!tasas.hasOwnProperty(monedaOrigen) || !tasas[monedaOrigen].hasOwnProperty(monedaDestino)) {
    resultadoDiv.textContent = "No se encontró una tasa de conversión válida.";
    return;
  }

  let montoConvertido = monto * tasas[monedaOrigen][monedaDestino];
  resultadoDiv.textContent = `${monto} ${monedaOrigen} = ${montoConvertido} ${monedaDestino}`;

  localStorage.setItem("monedaOrigen", monedaOrigen);
  localStorage.setItem("monedaDestino", monedaDestino);
}

let monedaOrigenSelect = document.getElementById("from"); 
let monedaDestinoSelect = document.getElementById("to");
let resultadoDiv = document.getElementById("result");
let montoInput = document.getElementById("amount"); 

let monedaOrigenSeleccionada = localStorage.getItem("monedaOrigen");
let monedaDestinoSeleccionada = localStorage.getItem("monedaDestino");

if (monedaOrigenSeleccionada) {
  monedaOrigenSelect.value = monedaOrigenSeleccionada;
}

if (monedaDestinoSeleccionada) {
  monedaDestinoSelect.value = monedaDestinoSeleccionada;
}

let convertBtn = document.getElementById("convertBtn");
convertBtn.addEventListener("click", convertirDivisa);


monedaOrigenSelect.addEventListener("change", function() {
  console.log("Moneda de origen cambiada:", monedaOrigenSelect.value);
});




