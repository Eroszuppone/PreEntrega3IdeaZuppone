let tasas;

function cargarTasasDeCambio() {
  fetch('tasas.json')
    .then(response => response.json())
    .then(data => {
      tasas = data;
      console.log("Tasas de cambio cargadas:", tasas);
    })
    .catch(error => {
      console.error("Error al cargar las tasas de cambio:", error);
    });
}

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

  if (!tasas || !tasas.hasOwnProperty(monedaOrigen) || !tasas[monedaOrigen].hasOwnProperty(monedaDestino)) {
    resultadoDiv.textContent = "No se encontró una tasa de conversión válida.";
    return;
  }

  let tasaConversion = tasas[monedaOrigen][monedaDestino];
  let montoConvertido = monto * tasaConversion;
  resultadoDiv.textContent = `${monto} ${monedaOrigen} = ${montoConvertido} ${monedaDestino}`;

  localStorage.setItem("monedaOrigen", monedaOrigen);
  localStorage.setItem("monedaDestino", monedaDestino);
}

document.addEventListener("DOMContentLoaded", function() {
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

  cargarTasasDeCambio();
});
