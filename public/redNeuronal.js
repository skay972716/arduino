const net = new brain.NeuralNetwork();
net.train(trainingData);
console.log(net.run([56, 56, 51, 52, 56, 54, 55]));
console.log(dataTemp);

//Activando el boton de IA
let activeIA = false;
let intervalIA;
let desicion;
let arrayResults = new Array();

function totalResultado(){
		let total=0;
		for(let i=0; i<arrayResults.length;i++){
		total = arrayResults[i] +total;	
		}
		total = total / arrayResults.length;
		console.log(total)
		arrayResults = new Array();
		socket.emit('total', total);		 
		console.log(socket);
}
function actionIA() {
  const resultado = net.run(dataTemp);
	arrayResults.push(resultado[0]);
  console.log('El rsultado del boton es:');
  console.log(resultado);
  return resultado;
}

function startIA() {
	actionIA();
  intervalIA = setInterval(actionIA, 18000);
	desicion= setInterval(totalResultado, 62000);
}
function stopIA() {
  clearInterval(intervalIA);
  clearInterval(desicion);
}
const eventIA = document.getElementById('btnIA');
eventIA.addEventListener('click', function () {
  if (!activeIA) {
    eventIA.removeAttribute('class');
    eventIA.setAttribute('class', 'button is-danger is-hovered');
    eventIA.innerHTML = 'Desactivar IA';
    activeIA = true;
    startIA();
  } else {
    eventIA.removeAttribute('class');
    eventIA.setAttribute('class', 'button is-warning is-hovered');
    eventIA.innerHTML = 'Activar IA';
    activeIA = false;
    stopIA();
  }
});
