if (localStorage.getItem("watchlist")) {
  let watchlist = localStorage.getItem("watchlist");
  watchlist = JSON.parse(watchlist);
  for (let i = 0; i < watchlist.length; i++) {
    let $movieCard = $(`<div class="movie-card">${watchlist[i]}</div>`);
    let $remove = $("<div></div>")
      .attr("id", i)
      .addClass("remove")
      .on("click", (event) => {
        let removeTarget = event.target.parentElement;
        let index = watchlist.indexOf(watchlist[i]);
        removeTarget.remove();
        watchlist.splice(index, 1)
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      });
    $movieCard.append($remove);
    $(".movies").append($movieCard);
    $(".add-watch").remove();
    console.log(watchlist[i])
  }
} else {
  $(".movies").append("<h2>Nothing added yet</h2>");
}

// const index = myArray.indexOf(2);

// const x = myArray.splice(index, 1);
