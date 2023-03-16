if (localStorage.getItem("watchlist")) {
  const watchlist = localStorage.getItem("watchlist");

  $(".movies").html(`<div class="movie-card">${JSON.parse(watchlist)}</div>`);
  console.log(watchlist);
}
