function calcularIMC(){
let sexo=document.getElementById('sexo').value;
let idade=document.getElementById('idade').value;
let peso=document.getElementById('peso').value;
let altura=document.getElementById('altura').value;

if(!sexo||!idade||!peso||!altura){
document.getElementById('resultado').innerHTML='Preencha todos os campos!';
return;
}

let imc=(peso/(altura*altura)).toFixed(2);

let classificacao='';

if(imc<18.5) classificacao='Abaixo do peso';
else if(imc<25) classificacao='Peso normal';
else if(imc<30) classificacao='Sobrepeso';
else classificacao='Obesidade';

// ajuste leve por idade (exemplo mais realista)
if(idade>60 && imc<22) classificacao+=' (baixo para idosos)';

// mensagem personalizada
let msg=`Seu IMC é ${imc} - ${classificacao}<br>`;

if(sexo==='mulher'){
msg+= 'Recomendação: manter alimentação equilibrada e foco em saúde hormonal.';
}else{
msg+= 'Recomendação: manter massa muscular e controlar percentual de gordura.';
}

document.getElementById('resultado').innerHTML=msg;
}
