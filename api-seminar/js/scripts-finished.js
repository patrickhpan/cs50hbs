var WEATHER_API_KEY = '3e3db1b16b63591293500cba6f8af72d'
var ZIPCODE = '02138'
var NYT_API_KEY = 'b994fea5b9c5e3611596df10ff2c916f:16:73614299'
var PLACEHOLDER_IMG = 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg'

$.get(weatherAPIUrl(ZIPCODE, WEATHER_API_KEY), function(data) {
  $("html").removeClass("loading")
  $("#temperature").text(kelvinToF(data.main.temp) + "°")
  $("#conditions").text(data.weather[0].main)
  $("#location").text(data.name)
})

function searchKeyDown(event) {
  if(event.keyCode == 13) {
    $.get(nytAPIUrl(event.target.value, NYT_API_KEY), function(data) {
      nytSearch(data)
    })
  }
}

function nytSearch(data) {
  $("#news").html("")
  var docs = data.response.docs;
  for(var i = 0; i < docs.length; i++) {
    $("#news").append(newsItemTemplate(docs[i]))
  }
}

function weatherAPIUrl(zipcode, key) {
  return "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + key;
}

function nytAPIUrl(query, key) {
  return "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query.replace(/\s+/, "+") + "&api-key=" + key;
}

function kelvinToF (kelvin) {
  return Math.round((kelvin - 273.15) * (9 / 5) + 32);
}

function newsItemTemplate(data) {
  var image = data.multimedia.filter(function(media) {
    return media.subtype == "xlarge"
  })[0];
  var link = data.web_url
  var headline = data.headline.main
  var lead = data.lead_paragraph

  return '<div class="news-item"> \
    <div class="news-image"> \
      <img src="' + ( image === undefined ? PLACEHOLDER_IMG : "http://nytimes.com/" + image.url ) + '" alt="" /> \
    </div> \
    <div class="news-text"> \
      <h5><a href="' + link + '">' + headline + '</a></h5> \
      <p> ' + lead + '</p> \
    </div> \
  </div>'
}

function showGitUrl() {
  alert("http://git.patrickpan.com/patrick/cs50hbs.git")
}
