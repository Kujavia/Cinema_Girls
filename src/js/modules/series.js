export const movieListContainer = document.getElementById("movie-list");
let currentIndex = 0;
let itemsPerView = 1;

export async function fetchSeries() {
  const apiKey = "1227f05d-bdfa-4477-b065-bda4caa8dc7a";
  try {
    const response = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=3&ratingTo=10&yearFrom=1999&yearTo=2019&keyword=girl&page=5",
      {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.items.length > 0) {
      displaySeries(data.items);
    } else {
      movieListContainer.innerHTML = "<p>No series found</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    movieListContainer.innerHTML = "<p>Error</p>";
  }
}

export function displaySeries(series) {
  movieListContainer.innerHTML = "";
  series.forEach((seriesItem) => {
    const movieListItem = document.createElement("div");
    movieListItem.className = "movie-list-item";
    const img = document.createElement("img");
    img.className = "movie-list-item-img";
    img.src = seriesItem.posterUrl;
    img.alt = seriesItem.nameRu;
    const title = document.createElement("span");
    title.className = "movie-list-item-title";
    title.textContent = seriesItem.nameRu;
    const button = document.createElement("button");
    button.className = "movie-list-item-button";
    button.textContent = "Смотреть";
    movieListItem.appendChild(img);
    movieListItem.appendChild(title);
    movieListItem.appendChild(button);
    movieListContainer.appendChild(movieListItem);
  });

  updateItemsPerView();
  showNextItems();
}

export function updateItemsPerView() {
  const containerWidth = movieListContainer.clientWidth;
  const itemWidth = 1;
  itemsPerView = Math.floor(containerWidth / itemWidth);
}

export function showNextItems() {
  const items = movieListContainer.children;
  const totalItems = items.length;

  // Скрываем элементы
  for (let i = 0; i < totalItems; i++) {
    items[i].style.display = "none";
  }

  // Показываем элементы
  for (
    let i = currentIndex;
    i < Math.min(currentIndex + itemsPerView, totalItems);
    i++
  ) {
    items[i].style.display = "block";
  }

  currentIndex += 1; // Увеличиваем индекс на кол элем
  if (currentIndex >= totalItems) {
    currentIndex = totalItems - itemsPerView; // Возврат к последним элементам, если индекс > общего количества
  }
}

export function initSeriesModule() {
  fetchSeries();
  const arrow = document.getElementById("arrow");

  if (arrow) {
    arrow.addEventListener("click", showNextItems);
  }

  window.addEventListener("resize", () => {
    updateItemsPerView();
    showNextItems();
  });
}
