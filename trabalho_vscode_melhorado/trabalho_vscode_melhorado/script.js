let caras = document.querySelectorAll(".cara");
let contadores = document.querySelectorAll(".contador");

caras.forEach(function(cara, i){

  let numero = 0;
  let bloqueado = false;

  cara.onclick = function(){

    if(bloqueado){
      return;
    }

    numero++;
    contadores[i].innerHTML = numero;

    bloqueado = true;
    cara.classList.add("bloqueado");

    setTimeout(function(){
      bloqueado = false;
      cara.classList.remove("bloqueado");
    }, 2000);

  }

});
