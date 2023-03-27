const barraDePesquisa = document.getElementById("barra-pesquisa");
const btnPesquisa = document.getElementById("btn-pesquisa");

const cidadeElemento = document.querySelector(".cidade");
const temperaturaElemento = document.querySelector(".temperatura");
const umidadeElemento = document.querySelector(".umidade");
const ventoElemento = document.querySelector(".vento");

async function recebeDadosDoClima(cidade) {
  const chaveApi = "f87f9bafe1b3b5d2fcf29e6edce21f98";
  const urlApi =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br";

  const resposta = await fetch(`${urlApi}&appid=${chaveApi}&q=${cidade}`);
  let data = await resposta.json();

  return data;
}

async function mostrarDadosDoClima(cidade) {
  const data = await recebeDadosDoClima(cidade);

  console.log(data);

  temperatura = data.main.temp;
  temperaturaInt = Math.trunc(temperatura);
  temperaturaFloat = temperatura - temperaturaInt;

  if (temperaturaFloat <= 0.95 && temperaturaFloat >= 0.1) {
    temperatura = temperatura.toFixed(1);
  } else if (temperaturaFloat < 0.1) {
    temperatura = temperatura.toFixed(0);
  }

  umidade = data.main.humidity;
  velocidadeVento = data.wind.speed;

  document.querySelector(".cidade").textContent = data.name;
  document.querySelector(".temperatura").textContent = temperatura + "°C";
  document.querySelector(".umidade").textContent = data.main.humidity + "%";
  document.querySelector(".vento").textContent = data.wind.speed + " km/h";
}

btnPesquisa.addEventListener("click", (e) => {
  e.preventDefault();

  cidade = barraDePesquisa.value;

  mostrarDadosDoClima(cidade);
});
