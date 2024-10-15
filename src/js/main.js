import { getRecommendMovies, initEventListeners } from "./modules/search";

import { initSeriesModule } from "./modules/series";
import { getMovies } from "./modules/home";
import { initSeriesModule2 } from "./modules/popular";
import { initSeriesModule3 } from "./modules/movies";

document.addEventListener("DOMContentLoaded", () => {
  const isSearchPage = document.querySelector(".search-page") !== null;

  if (isSearchPage) {
    initEventListeners();
    getRecommendMovies();
  } else {
    getMovies();
    initSeriesModule();
    initSeriesModule2();
    initSeriesModule3();
  }
});

window.addEventListener("resize", () => {
  updateItemsPerView();
  showNextItems();
});
