const barraDePesquisa = document.getElementById("barra-pesquisa");
const btnPesquisa = document.getElementById("btn-pesquisa");

const divTempo = document.querySelector(".tempo");
const divDetalhes = document.querySelector(".detalhes");
const cidadeElemento = document.querySelector(".cidade");
const iconeElemento = document.querySelector(".icone-tempo");
const temperaturaElemento = document.querySelector(".temperatura");
const umidadeElemento = document.querySelector(".umidade");
const ventoElemento = document.querySelector(".vento");

const card = document.querySelector(".card");
const tempo = document.querySelector(".tempo");
const animacaoCarregamento = document.querySelector(".lds-ellipsis");

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
    caminhoVideo = `videos/storm.mp4`;
  }
  if (infoClima.id < 500) {
    caminhoIcone = `imagens/${diaOuNoite}drizzle.png`;
    caminhoVideo = `videos/drizzle.mp4`;
  }
  if (infoClima.id < 600) {
    caminhoIcone = `imagens/rain.png`;
    caminhoVideo = `videos/${diaOuNoite}rain.mp4`;
  }
  if (infoClima.id < 700) {
    caminhoIcone = `imagens/snow.png`;
    caminhoVideo = `videos/snow.mp4`;
  }
  if (infoClima.id < 800) {
    caminhoIcone = `imagens/mist.png`;
    caminhoVideo = `videos/mist.mp4`;
  }
  if (infoClima.id == 800) {
    caminhoIcone = `imagens/${diaOuNoite}clear.png`;
    caminhoVideo = `videos/${diaOuNoite}clear.mp4`;
  }
  if (infoClima.id > 800) {
    caminhoIcone = `imagens/${diaOuNoite}clouds.png`;
    caminhoVideo = `videos/${diaOuNoite}clouds.mp4`;
  }

  return [caminhoIcone, caminhoVideo];
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

  const [caminhoIcone, caminhoVideo] = definirIconeClima(data.weather[0]);

  const video = document.getElementById("video-bg");
  video.setAttribute("src", caminhoVideo);

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

  animacaoCarregamento.classList.toggle("visivel");

  cidade = barraDePesquisa.value;

  if (!cidade) {
    alert("Adicione o nome da cidade");
    return;
  }

  if (!card.classList.contains("grande")) {
    card.classList.toggle("grande");
  }

  setTimeout(function () {
    animacaoCarregamento.classList.toggle("visivel");
    divTempo.classList ="block";
    divDetalhes.classList += " flex";
    mostrarDadosDoClima(cidade);
  }, 3000);
});
