let emojis = document.querySelectorAll(".emoji");
let contadores = document.querySelectorAll(".contador");

emojis.forEach(function(emoji, i){

  let numero = 0;
  let bloqueado = false;

  emoji.onclick = function(){

    if(bloqueado){
      return;
    }

    numero++;
    contadores[i].innerHTML = numero;

    bloqueado = true;
    emoji.classList.add("bloqueado");

    setTimeout(function(){
      bloqueado = false;
      emoji.classList.remove("bloqueado");
    }, 2000);

  }

});
