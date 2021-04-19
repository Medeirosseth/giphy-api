import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// Utility functions
function getElements(response) {
  if (Array.isArray(response.data)) {
    $(".giphy").append(
      '<img id="gif" src="' + response.data[0].images.downsized_large.url + '">'
    );
  } else {
    $(".giphy").append(
      '<img id="gif" src="' + response.data.images.downsized_large.url + '">'
    );
    if (response.data.title) {
      $("#search").val(response.data.title);
    }
  }
}

function clearPastGif() {
  $("#gif").remove();
}

// UI Logic
$("#submitButton").on("click", (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
  clearPastGif();
  const searchString = $("#search").val();

  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?q=${searchString}&limit=1&api_key=${process.env.API_KEY}`;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  request.open("GET", url, true);
  request.send();
});

$("#random").on("click", () => {
  const url = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;
  let request = new XMLHttpRequest();
  clearPastGif();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      getElements(response);
    }
  };
  request.open("GET", url, true);
  request.send();
});
