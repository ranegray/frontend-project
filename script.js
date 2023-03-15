const url = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&vote_average.gte=1.0&with_original_language=en&with_genres=27&vote_average.lte=5.5&api_key=4e45f0d44a3f2d2e2a90ecc57dd0a161`;

let $movies = $(".movies").infiniteScroll({
  path: function () {
    let pageNum = Math.floor(Math.random() * 500);
    return url + `&page=${pageNum}`;
  },
  responseBody: "json",
  history: false,
});

function makeMovieCards(data) {
  console.log(data);
  let movies = data.results;
  console.log(movies);
  movies.forEach((movie) => {
    let rating = Math.round((10 - movie.popularity) * 10) / 10
    if (movie.poster_path) {
      let $movieCard = $(`<div class="movie-card">
            <h2><a href="${`https://www.themoviedb.org/movie/${movie.id}-${movie.title}`}" target="_blank">${
        movie.title
      }</a> (${
        movie.release_date ? movie.release_date.slice(0, 4) : "2020"
      })</h2>
            <h3>💩 ${rating > 0 ? rating : 10}</h3>
            <p>${movie.overview}</p>
            <img src=https://image.tmdb.org/t/p/original/${
              movie.poster_path
            } width="250">
            <div class="user-status">
            <img class="add-watch" src="/icons8-eye-48-2.png">
            <img class="add-heart" src="/icons8-heart-48-2.png">
            </div>
            </div>`);
      $(".movies").append($movieCard);
    }
  });
  let $addToWatchList = $(".add-watch");
  $addToWatchList.on("click", (event) => {
    watchList.push(event.target.parentElement.parentElement)
    localStorage.setItem('watchlist', watchList)
    console.log('Added to watchlist')
  });
}

// initial render
$.get(url + `&page=${Math.floor(Math.random() * 100)}`, (data) => {
  console.log(data);
  makeMovieCards(data);
});
//infinite scroll render
$movies.on("load.infiniteScroll", (event, body) => {
  console.log("Scroll at bottom");
  makeMovieCards(body);
});
// add to watchlist
const watchList = [];

// export default watchlist;
