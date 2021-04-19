import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

$("#submitButton").on("click", (event) => {
  event.stopImmediatePropagation();
  event.preventDefault();
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

  function getElements(response) {
    // we need to get image url from images
    $(".giphy").append(
      '<img src="' + response.data[0].images.downsized_large.url + '">'
    );
  }
});
