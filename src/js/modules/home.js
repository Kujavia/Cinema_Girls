const movieContainer = document.querySelector(".movie__content");
const movieContent = document.querySelector(".movie");
const movieContent2 = document.querySelector(".movie_wrapper");
const apiMoviesUrl =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=5&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=girl&page=2";
const apiKey = "1227f05d-bdfa-4477-b065-bda4caa8dc7a";

let movies = [];
let currentMovieIndex = 0;

async function fetchFromApi(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    const dataKeys = ["items", "films", "genres"];
    const data = dataKeys.find(
      (key) => Array.isArray(responseData[key]) && responseData[key].length > 0
    );

    if (!data) {
      throw new Error("Ничего не найдено");
    }

    return responseData[data];
  } catch (error) {
    return [];
  }
}

export async function getMovies() {
  try {
    movies = await fetchFromApi(apiMoviesUrl); // Получаем фильмы
    renderMovie(movies[currentMovieIndex]); // Отображаем первый фильм
    startMovieRotation(); // Запускаем ротацию фильмов
  } catch (error) {
    movieContent.innerHTML = `Кажется, что что-то пошло не так: ${error.message}`;
  }
}
//Ф-ия создания разметки под фильм
function createMovieElement(movie) {
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie__content");

  movieElement.innerHTML = `
        <h1 class="movie__title">${movie.nameRu}</h1>
        <p class="movie__description">${movie.description || ""}</p>
        <a href="#" class="movie__watch-btn">Смотреть</a>
    `;
  movieContent.style.backgroundImage = `url(${movie.posterUrl})`; // Меняем фон
  movieContent2.style.backgroundImage = `url(${movie.posterUrl})`;
  movieContent2.style.filter = `blur(5px)`; // Меняем фон
  return movieElement;
}
//Ф-ия рендера фильмов
function renderMovie(movie) {
  movieContainer.innerHTML = ""; // Очищаем предыдущий контент
  const movieElement = createMovieElement(movie); // Создаем элемент фильма
  movieContainer.appendChild(movieElement); // Добавляем фильм в контейнер
}
//Ф-ия запуска показов фильмов через интревал
function startMovieRotation() {
  setInterval(() => {
    currentMovieIndex = (currentMovieIndex + 1) % movies.length; // Увеличиваем индекс и обнуляем
    renderMovie(movies[currentMovieIndex]); // Рендерим новый фильм
  }, 100000); // Каждые 10 секунд
}
