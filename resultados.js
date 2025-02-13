const API_KEY = 'AIzaSyAYOTvG24loboj2JLeUvP2s4JlxHfxkEuU';
const SEARCH_ENGINE_ID = 'c233b1197c03041d3';

document.getElementById('searchButton').addEventListener('click', () => {
  const userInput = document.getElementById('searchInput').value;
  if (userInput) {
    window.location.search = `?q=${encodeURIComponent(userInput)}`;
  }
});

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');

async function fetchResults(apiURL) {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.error) {
      console.error('Erro na API:', data.error.message);
      return [];
    }
    return data.items || [];
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
}

async function searchGoogleWeb() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = '<p>Não foi possível encontrar a consulta.</p>';
    return;
  }

  const apiURL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&lr=lang_pt&cr=countryBR&safe=off`;

  const items = await fetchResults(apiURL);
  if (items.length > 0) {
    items.forEach(item => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('result-item');

      const lastUpdated = item.pagemap?.metatags?.['article:published_time'] || 'Data não disponível';
      resultDiv.innerHTML = `
        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
        <p>${item.snippet}</p>
        <div class="updated">Última atualização: ${lastUpdated}</div>
      `;
      resultsContainer.appendChild(resultDiv);
    });
  } else {
    resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
  }
}

async function searchGoogleImages() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = '<p>Não foi possível encontrar a consulta.</p>';
    return;
  }

  const apiURL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&searchType=image&lr=lang_pt&cr=countryBR&safe=off`;

  const items = await fetchResults(apiURL);
  if (items.length > 0) {
    items.forEach(item => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('result-item');

      resultDiv.innerHTML = `
        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
        <img src="${item.link}" alt="${item.title}">
        <p>${item.snippet}</p>
      `;
      resultsContainer.appendChild(resultDiv);
    });
  } else {
    resultsContainer.innerHTML = '<p>Nenhum resultado de imagem encontrado.</p>';
  }
}

async function searchGoogleVideos() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = '<p>Não foi possível encontrar a consulta.</p>';
    return;
  }

  const apiURL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&lr=lang_pt&cr=countryBR&safe=off`;

  const items = await fetchResults(apiURL);
  if (items.length > 0) {
    items.forEach(item => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('result-item');

      resultDiv.innerHTML = `
        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
        <a href="${item.link}" target="_blank">
          <p>${item.snippet}</p>
        </a>
      `;
      resultsContainer.appendChild(resultDiv);
    });
  } else {
    resultsContainer.innerHTML = '<p>Nenhum resultado de vídeo encontrado.</p>';
  }
}

function toggleView(type) {
  if (type === 'image') {
    searchGoogleImages();
  } else if (type === 'web') {
    searchGoogleWeb();
  } else if (type === 'video') {
    searchGoogleVideos();
  }
}

document.getElementById('imageButton').addEventListener('click', () => toggleView('image'));
document.getElementById('webButton').addEventListener('click', () => toggleView('web'));
document.getElementById('videoButton').addEventListener('click', () => toggleView('video'));

// Inicia a busca na web por padrão
searchGoogleWeb();
