if (localStorage.getItem("watchlist")) {
  let watchlist = localStorage.getItem("watchlist");
  watchlist = JSON.parse(watchlist)

  watchlist.forEach(movie => {
      $(".movies").append(`<div class="movie-card">${movie}</div>`);
      $(".add-watch").remove()
    });
    console.log(watchlist);
} else {
    $('.movies').append('<h2>Nothing added yet</h2>')
}
