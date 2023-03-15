if (localStorage.getItem("watchlist")) {
  const watchlist = localStorage.getItem("watchlist");

  $(".movies").html(watchlist);
  console.log(watchlist);
}
