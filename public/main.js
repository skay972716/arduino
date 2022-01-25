const socket = io();

const temperature = document.getElementById('temperature');
const informarAlerta = document.getElementById('alerta');
const dataTemp = new Array();

socket.on('temp', function (data) {
  //Data de informacion
  console.log(data);
  temperature.innerHTML = `${data} °C`;
  if (dataTemp.length > 6) {
    dataTemp.splice(0, 1);
    dataTemp.push(data);
  } else {
    dataTemp.push(data);
  }
  myChart.update();
  if (data <= 17) {
    informarAlerta.innerHTML = '¡Todo estable!';
    informarAlerta.removeAttribute('class');
    informarAlerta.setAttribute('class', 'tag is-success');
  } else if (data > 17 && data < 20) {
    informarAlerta.innerHTML = '¡Tener cuidado!';
    informarAlerta.removeAttribute('class');
    informarAlerta.setAttribute('class', 'tag is-warning');
  } else if (data > 19) {
    //Mostrando la notificacion
    fetch('/new-message', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });
    //Terminando codigo de notificacion
    informarAlerta.innerHTML = '¡Esta en peligro!';
    informarAlerta.removeAttribute('class');
    informarAlerta.setAttribute('class', 'tag is-danger');
  }
  //Data sobre el modulo de chart js
});
//Funciones del chat JS
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°'],
    datasets: [
      {
        label: 'Temperatura del Biohuerto',
        data: dataTemp,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        min: 14,
        max: 28,
      },
    },
  },
});
