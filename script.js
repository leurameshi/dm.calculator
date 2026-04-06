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
      "⚠️ Clique em REFAZER para calcular novamente 👇";
  }
}

function travarCampos(travar){
  let campos = document.querySelectorAll("input, select");

  campos.forEach(campo => {
    campo.disabled = travar;

    // adiciona evento de clique
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
    document.getElementById('resultado').innerHTML='Preencha tudo!';
    return;
  }

  // ⏳ carregando
  document.getElementById('resultado').innerHTML = "Calculando seu resultado...";
  document.getElementById('progresso').style.width = "20%";

  setTimeout(() => {

    let imc=(peso/(altura*altura)).toFixed(2);

    let status='';
    let progresso=0;
    let cor='';

    if(imc < 18.5){
      status='Abaixo do peso';
      progresso=25;
      cor='#e53935';
    }
    else if(imc < 25){
      status='Peso ideal';
      progresso=50;
      cor='#2e7d32';
    }
    else if(imc < 30){
      status='Sobrepeso';
      progresso=75;
      cor='#fbc02d';
    }
    else{
      status='Obesidade';
      progresso=100;
      cor='#e53935';
    }

    let barra = document.getElementById('progresso');
    barra.style.width = progresso+'%';
    barra.style.background = cor;

    let dica = sexo==='mulher'
    ? 'Cuide da alimentação e equilíbrio hormonal.'
    : 'Foque em massa muscular e controle de gordura.';

    if(idade > 60){
      dica += ' Atenção especial para idosos.';
    }

    document.getElementById('resultado').innerHTML =
    `IMC: ${imc} - ${status}<br>${dica}`;

    // 🔒 TRAVA TUDO
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

  // 💰 nova impressão de anúncio
  location.reload();
}

// ativa eventos logo ao carregar
window.onload = function(){
  travarCampos(false);
};
document.getElementById("produto").style.display = "block";




//function formatarAltura(valor){
//valor = valor.replace(",",".");
//if(valor > 3){
//valor = (valor/100).toFixed(2);
//}
//return parseFloat(valor);
//}

//function calcularIMC(){
//let sexo=document.getElementById('sexo').value;
//let idade=document.getElementById('idade').value;
//let peso=document.getElementById('peso').value;
//let altura=formatarAltura(document.getElementById('altura').value);

//if(!sexo||!idade||!peso||!altura){
//document.getElementById('resultado').innerHTML='Preencha tudo!';
//return;
//}

//let imc=(peso/(altura*altura)).toFixed(2);

//let status='';
//let progresso=0;

//if(imc<18.5){status='Abaixo do peso';progresso=25;}
//else if(imc<25){status='Peso ideal';progresso=50;}
//else if(imc<30){status='Sobrepeso';progresso=75;}
//else{status='Obesidade';progresso=100;}

//document.getElementById('progresso').style.width=progresso+'%';

//let dica = sexo==='mulher'
//? 'Cuide da alimentação e equilíbrio hormonal.'
//: 'Foque em massa muscular e controle de gordura.';

//if(idade>60){
//dica+=' Atenção especial para idosos.';
//}

//document.getElementById('resultado').innerHTML =
//`IMC: ${imc} - ${status}<br>${dica}`;
//}

//function refazer(){
//location.reload();
//}
