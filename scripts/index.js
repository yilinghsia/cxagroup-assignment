$(document).ready(function() {
  // Calling user to authenticate themselves because of the latest changes in Spotify webapi
  // For more see: https://developer.spotify.com/news-stories/2017/01/27/removing-unauthenticated-calls-to-the-web-api/
  $("#authorize").click(function() {
    var clientId = "375a967dc3604bf5995b0792bc67f491";
    var redirectUrl = "http://localhost:8000/search.html";
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token`;
  });

  $("#artist-name").keyup(function() {
    delay(function() {
      var searchTerm = $("#artist-name").val();
      if (searchTerm || searchTerm !== "") {
        SearchSpotify(searchTerm);
      } else {
        ClearSearches();
      }
    }, 300);
  });

  var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
});

function ClearSearches() {
  var templateSource = $("#results-template").html(),
    resultsPlaceholder = document.getElementById("results"),
    template = Handlebars.compile(templateSource);

  resultsPlaceholder.innerHTML = template(null);

  console.log(resultsPlaceholder.innerHTML);
}

function SearchSpotify(searchTerm) {
  var templateSource = $("#results-template").html(),
    resultsPlaceholder = document.getElementById("results"),
    template = Handlebars.compile(templateSource);

  // Retrieve the accesstoken by splitting the hash.
  var x = window.location.hash.substr(1).split("&")[0];
  var accessToken = x.split("=")[1];

  $("#loadingmessage").show();

  $.ajax({
    url: `https://api.spotify.com/v1/search?type=artist&limit=50&q=${searchTerm}`,
    headers: {
      Authorization: "Bearer " + accessToken
    },
    success: function(response) {
      $("#loadingmessage").hide();
      resultsPlaceholder.innerHTML = template(response);
    },
    error: function(e) {
      ClearSearches();
      $("#errormessage").show();
    }
  });
}

// Handlebar logic to check whether result has a rectangle image.
Handlebars.registerHelper("if_eq", function(a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

