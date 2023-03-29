const barraDePesquisa = document.getElementById("barra-pesquisa");
const btnPesquisa = document.getElementById("btn-pesquisa");

const cidadeElemento = document.querySelector(".cidade");
const iconeElemento = document.querySelector(".icone-tempo");
const temperaturaElemento = document.querySelector(".temperatura");
const umidadeElemento = document.querySelector(".umidade");
const ventoElemento = document.querySelector(".vento");

const card = document.querySelector(".card");
const tempo = document.querySelector(".tempo");

async function recebeDadosDoClima(cidade) {
  const chaveApi = "f87f9bafe1b3b5d2fcf29e6edce21f98";
  const urlApi =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br";

  try {
    const resposta = await fetch(`${urlApi}&appid=${chaveApi}&q=${cidade}`);
    let data = await resposta.json();
    console.log(data.weather[0].id, data);
    return data;
  } catch (error) {
    recebeDadosDoClima(cidade);
  }
}

function definirIconeClima(infoClima) {
  let diaOuNoite = infoClima.icon.endsWith("n") ? `night-` : "";

  if (infoClima.id < 300) {
    caminhoIcone = `imagens/${diaOuNoite}storm.png`;
  }
  if (infoClima.id < 400) {
    caminhoIcone = `imagens/${diaOuNoite}drizzle.png`;
  }
  if (infoClima.id < 500) {
    caminhoIcone = `imagens/rain.png`;
  }
  if (infoClima.id < 600) {
    caminhoIcone = `imagens/snow.png`;
  }
  if (infoClima.id < 700) {
    caminhoIcone = `imagens/${diaOuNoite}storm.png`;
  }
  if (infoClima.id < 800) {
    caminhoIcone = `imagens/mist.png`;
  }
  if (infoClima.id == 800) {
    caminhoIcone = `imagens/${diaOuNoite}clear.png`;
  }
  if (infoClima.id > 800) {
    caminhoIcone = `imagens/${diaOuNoite}clouds.png`;
  }

  return caminhoIcone;
}

async function mostrarDadosDoClima(cidade) {
  const data = await recebeDadosDoClima(cidade);

  temperatura = data.main.temp;
  temperaturaInt = Math.trunc(temperatura);
  temperaturaFloat = temperatura - temperaturaInt;

  if (temperaturaFloat <= 0.95 && temperaturaFloat >= 0.1) {
    temperatura = temperatura.toFixed(1);
  } else if (temperaturaFloat < 0.1) {
    temperatura = temperatura.toFixed(0);
  } else {
    temperatura = temperatura.toFixed(0);
  }

  const caminhoIcone = definirIconeClima(data.weather[0]);

  umidade = data.main.humidity;
  velocidadeVento = data.wind.speed;

  cidadeElemento.textContent = data.name;
  iconeElemento.setAttribute("src", caminhoIcone);
  temperaturaElemento.textContent = temperatura + "°C";
  umidadeElemento.textContent = data.main.humidity + "%";
  ventoElemento.textContent = data.wind.speed + " km/h";
}

btnPesquisa.addEventListener("click", (e) => {
  e.preventDefault();

  cidade = barraDePesquisa.value;

  if (!cidade) {
    alert("Adicione o nome da cidade");
    return;
  }

  if (!card.classList.contains("grande")) {
    card.classList.toggle("grande");
  }

  mostrarDadosDoClima(cidade);
});
