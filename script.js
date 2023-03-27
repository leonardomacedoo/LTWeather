const chaveApi="f87f9bafe1b3b5d2fcf29e6edce21f98";
const urlApi="https://api.openweathermap.org/data/2.5/weather?units=metric&q=Joinville";

async function checarTempo(){
    const resposta = await fetch(urlApi + `&appid=${chaveApi}`);
    var data = await resposta.json();

    console.log(data);

    temperatura = data.main.temp;

    temperaturaInt = Math.trunc(temperatura);
    temperaturaFloat = temperatura - temperaturaInt;

    if (temperaturaFloat<=0.95 && temperaturaFloat >= 0.1){
        temperatura = temperatura.toFixed(1);
    } else if (temperaturaFloat < 0.1) {
        temperatura = temperatura.toFixed(0);
    }


    document.querySelector(".cidade").innerHTML = data.name;
    document.querySelector(".temperatura").innerHTML = temperatura + "°C";
    document.querySelector(".umidade").innerHTML = data.main.humidity + "%";
    document.querySelector(".vento").innerHTML = data.wind.speed + " km/h";

}

checarTempo();