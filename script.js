document
  .getElementById("channel-search")
  .addEventListener("click", function (e) {
    e.preventDefault();

    document.getElementById("search-message").innerHTML = "";

    var channel = document.getElementById("channel-input").value;
    var url =
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=" +
      channel +
      "&type=channel&key=AIzaSyAP6UiHKgWDNqFGbN1bF_jokB2ebpiQG-I";

    fetch(url).then(function (response) {
      response.json().then(function (res) {
        document.getElementById("embedded-video-container").innerHTML = "";
        document.getElementById("channel-video-list").innerHTML = "";
        document.getElementById("channel-list").innerHTML = "";

        console.log(res);
        for (var index in res.items) {
          var inner =
            "<li id='" +
            res.items[index].id.channelId +
            "' class='channel-item'><div >";
          inner +=
            '<img src="' +
            res.items[index].snippet.thumbnails.default.url +
            '" />';
          inner +=
            "<div class='channel-text-container'><h3>" +
            res.items[index].snippet.channelTitle +
            "</h3>";
          inner += "<p></p></div></div></li>";
          document.getElementById("channel-list").innerHTML += inner;
          var channelUrl =
            "https://www.googleapis.com/youtube/v3/channels?part=snippet,status,contentDetails,statistics&id=" +
            res.items[index].id.channelId +
            "&key=AIzaSyAP6UiHKgWDNqFGbN1bF_jokB2ebpiQG-I";
          fetch(channelUrl).then(function (channelResponse) {
            channelResponse.json().then(function (channelRes) {
              console.log(channelRes);
              document
                .getElementById(channelRes.items[0].id)
                .getElementsByTagName("p")[0].innerHTML +=
                channelRes.items[0].statistics.subscriberCount + " subscribers";
            });
          });
        }
        var liChannelElements = document.getElementsByClassName("channel-item");
        for (var index in liChannelElements) {
          liChannelElements[index].addEventListener("click", function (e) {
            console.log(e);
            var videoUrl =
              "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" +
              e.currentTarget.id +
              "&maxResults=10&order=date&type=video&key=AIzaSyAP6UiHKgWDNqFGbN1bF_jokB2ebpiQG-I";
            fetch(videoUrl).then(function (response) {
              response.json().then(function (res) {
                console.log(res);
                for (var index in res.items) {
                  var inner =
                    "<li id='" +
                    res.items[index].id.videoId +
                    "' class='video-item'><div>";
                  inner +=
                    "<img class='video-thumbnail' src='" +
                    res.items[index].snippet.thumbnails.default.url +
                    "' />";
                  inner +=
                    "<div class='video-text-container'><h3>" +
                    res.items[index].snippet.title +
                    "</h3>";
                  inner +=
                    "<p>" +
                    res.items[index].snippet.description +
                    "</p></div></div></li>";
                  document.getElementById("channel-video-list").innerHTML +=
                    inner;
                }
                var liVideoElements =
                  document.getElementsByClassName("video-item");
                for (var index in liVideoElements) {
                  liVideoElements[index].addEventListener(
                    "click",
                    function (e) {
                      var iframe =
                        "<iframe id='embedded-video' src='https://www.youtube.com/embed/" +
                        e.currentTarget.id +
                        "?enablejsapi=1&rel=0' frameborder='0' style='border: solid 4px rgba(255, 0, 0, 1)' allowfullscreen></iframe>";
                      document.getElementById(
                        "embedded-video-container"
                      ).innerHTML = iframe;

                      document.getElementById("channel-video-list").innerHTML =
                        "";
                    }
                  );
                }
              });
            });

            document.getElementById("channel-list").innerHTML = "";
          });
        }
      });
    });
    document.getElementById("playlist-form").classList.add("hidden");
    document.getElementById("vertical-bar").classList.add("hidden");
  });

document
  .getElementById("playlist-search")
  .addEventListener("click", function (e) {
    e.preventDefault();

    document.getElementById("channel-form").classList.add("hidden");
    document.getElementById("vertical-bar").classList.add("hidden");
  });

document.getElementById("home-link").addEventListener("click", function (e) {
  var hiddenElements = document.getElementsByClassName("hidden");
  for (var i = hiddenElements.length - 1; i >= 0; i--) {
    hiddenElements[i].setAttribute("class", "");
  }
});
