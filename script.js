const url = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&vote_average.gte=2.0&with_original_language=en&with_genres=27&vote_average.lte=5.5&api_key=4e45f0d44a3f2d2e2a90ecc57dd0a161`;

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
    let rating = Math.round((10 - movie.popularity) * 10) / 10;
    if (movie.poster_path) {
      let $movieCard = $("<div></div>").addClass("movie-card");
      let $img = $("<img>")
        .attr("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`)
        .attr("width", 250);
      let $title = $("<a></a>")
        .attr(
          "href",
          `https://www.themoviedb.org/movie/${movie.id}-${movie.title}`
        )
        .attr("target", "_blank")
        .append(
          $("<h2>").text(
            `${movie.title} (${
              movie.release_date ? movie.release_date.slice(0, 4) : "2020"
            })`
          )
        );

      let $rating = $("<h3>").text(`💩 ${rating > 0 ? rating : 10}`);
      let $addToWatchlist = $("<div></div>")
        .addClass("add-watch")
        .on("click", (event) => {
          let watchlist = event.target.parentElement.innerHTML;
          watchlistArray.push(watchlist);
          console.log("Added to watchlist");
        });

      $movieCard
        .append($img)
        .append($title)
        .append($rating)
        .append($addToWatchlist);

      $(".movies").append($movieCard);
    }
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

let watchlistArray = [];
if (localStorage.getItem("watchlist")) {
  let watchlist = localStorage.getItem("watchlist");
  watchlistArray = JSON.parse(watchlist);
  localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
};

$(".watchlist").on("click", () => {
  if (watchlistArray.length > 0) {
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
  }
  location.href = "./watchlist.html";
});

// let $addToWatchList = $(".add-watch");
// $addToWatchList.on("click", (event) => {
//   let watchlist = event.target.parentElement.innerHTML;
//   watchlistArray.push(JSON.stringify(watchlist));
//   // localStorage.setItem("watchlist", JSON.stringify(watchlist));
//   console.log("Added to watchlist");
// });
