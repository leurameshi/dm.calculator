let bloqueado = false;

function formatarAltura(valor){
  valor = valor.replace(",",".");
  if(valor > 3){
    valor = (valor/100).toFixed(2);
  }
  return parseFloat(valor);
}

function mostrarAviso(){
  if(bloqueado){
    document.getElementById('resultado').innerHTML =
      "⚠️ Click RESET to calculate again 👇";
  }
}

function travarCampos(travar){
  let campos = document.querySelectorAll("input, select");

  campos.forEach(campo => {
    campo.disabled = travar;

    campo.onclick = function(){
      if(bloqueado){
        mostrarAviso();
      }
    }
  });
}

function calcularIMC(){

  if(bloqueado){
    mostrarAviso();
    return;
  }

  let sexo=document.getElementById('sexo').value;
  let idade=document.getElementById('idade').value;
  let peso=document.getElementById('peso').value;
  let altura=formatarAltura(document.getElementById('altura').value);

  if(!sexo||!idade||!peso||!altura){
    document.getElementById('resultado').innerHTML='Fill in all fields!';
    return;
  }

  // ⏳ loading
  document.getElementById('resultado').innerHTML = "Calculating your result...";
  document.getElementById('progresso').style.width = "20%";

  setTimeout(() => {

    let imc=(peso/(altura*altura)).toFixed(2);

    let status='';
    let progresso=0;
    let cor='';

    if(imc < 18.5){
      status='Underweight';
      progresso=25;
      cor='#e53935';
    }
    else if(imc < 25){
      status='Normal weight';
      progresso=50;
      cor='#2e7d32';
    }
    else if(imc < 30){
      status='Overweight';
      progresso=75;
      cor='#fbc02d';
    }
    else{
      status='Obesity';
      progresso=100;
      cor='#e53935';
    }

    let barra = document.getElementById('progresso');
    barra.style.width = progresso+'%';
    barra.style.background = cor;

    let dica = sexo==='female'
    ? 'Focus on balanced nutrition and hormonal health.'
    : 'Focus on building muscle and controlling body fat.';

    if(idade > 60){
      dica += ' Extra attention is recommended for seniors.';
    }

    document.getElementById('resultado').innerHTML =
    `BMI: ${imc} - ${status}<br>${dica}`;

    // 🔒 LOCK EVERYTHING
    bloqueado = true;
    document.querySelector("button").disabled = true;
    travarCampos(true);

  }, 1500);
}

function refazer(){

  document.getElementById('sexo').value = "";
  document.getElementById('idade').value = "";
  document.getElementById('peso').value = "";
  document.getElementById('altura').value = "";
  document.getElementById('resultado').innerHTML = "";

  let barra = document.getElementById('progresso');
  barra.style.width = "0%";
  barra.style.background = "#2e7d32";

  bloqueado = false;

  document.querySelector("button").disabled = false;
  travarCampos(false);

  // 💰 new ad impression
  location.reload();
}

// activate events on load
window.onload = function(){
  travarCampos(false);
};

document.getElementById("produto").style.display = "block";