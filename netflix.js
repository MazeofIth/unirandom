function netflix(url, currentslicedpath, stoprotate) {
  var showhistory = []
  if (window.localStorage.getItem("showhistory")) {
    showhistory = JSON.parse(window.localStorage.getItem("showhistory"))
  }
  var netflixsavedlinks = {}
  if (window.localStorage.getItem("netflixsavedlinks")) {
    netflixsavedlinks = JSON.parse(window.localStorage.getItem("netflixsavedlinks"))
  }
  var netflixopenedlinks = {}
  if (window.localStorage.getItem("netflixopenedlinks")) {
    netflixopenedlinks = JSON.parse(window.localStorage.getItem("netflixopenedlinks"))
  }
  //console.log(JSON.stringify(netflixsavedlinks))
  //console.log(showhistory)
  foundtheshow = false
  //console.log(JSON.stringify(netflixsavedlinks))
  for (var key in netflixsavedlinks) {
    if (key == currentslicedpath.substring(7, 15) || netflixsavedlinks[key] == url.substring(url.length - 8, url.length)) {
      foundtheshow = true
      showkey = netflixsavedlinks[key]
    }
  }
  //console.log(JSON.stringify(netflixopenedlinks))
  for (var key in netflixopenedlinks) {
    if (key == currentslicedpath.substring(7, 15) || netflixopenedlinks[key] == url.substring(url.length - 8, url.length)) {
      foundtheshow = true
      showkey = netflixopenedlinks[key]
    }
  }
  // further complicated by much bullshit ids
  if (foundtheshow) {
    //console.log("hi")
    currentshownetflixsavedlinks = []
    for (var key in netflixsavedlinks) {
      if (netflixsavedlinks[key] == showkey) {
        currentshownetflixsavedlinks.push(key)
      }
    }
    episodetoopen = currentshownetflixsavedlinks[Math.floor(Math.random() * currentshownetflixsavedlinks.length)]
    delete netflixsavedlinks[episodetoopen]
    netflixopenedlinks[episodetoopen] = showkey
    window.localStorage.setItem("netflixsavedlinks", JSON.stringify(netflixsavedlinks))
    window.localStorage.setItem("netflixopenedlinks", JSON.stringify(netflixopenedlinks))
    chrome.tabs.update({
      url: "https://www.netflix.com/watch/".concat(episodetoopen)
    });
    stoprotate()
  } else {
    episodeid = currentslicedpath.substring(7, 15)
    urltosearch = "https://unogsng.p.rapidapi.com/episodes?episodeid=".concat(episodeid)
    // handle what happens if the user clicks on title screen
    // Doesn't work for all episodes

    function searchnetflixshow() {
      $.get(
        "https://unirandom-api-keys.herokuapp.com/?key=unogs&url=".concat(urltosearch),
        function(response) {
          responseindex = Math.floor(Math.random() * response.length)
          episodetoopen = response[responseindex].episodes[Math.floor(Math.random() * response[responseindex].episodes.length)].epid
          ////console.logepisodetoopen)
          chrome.tabs.update({
            url: "https://www.netflix.com/watch/".concat(episodetoopen)
          });
          stoprotate()
          for (var i = 0; i < response.length; i++) {
            for (var j = 0; j < response[i].episodes.length; j++) {
              netflixsavedlinks[response[i].episodes[j].epid] = netflixid
            }
          }
          showhistory.push(netflixid)
          netflixopenedlinks[episodetoopen] = netflixid
          delete netflixsavedlinks[episodetoopen]
          window.localStorage.setItem("showhistory", JSON.stringify(showhistory))
          window.localStorage.setItem("netflixsavedlinks", JSON.stringify(netflixsavedlinks))
          window.localStorage.setItem("netflixopenedlinks", JSON.stringify(netflixopenedlinks))
        })
    }

    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=unogs&url=".concat(urltosearch),
      function(response) {
        ////console.logJSON.stringify(response))
        if (response.length < 1) {
          ////console.log"hi")
          url = url.split('?s=')[0]
          netflixid = url.substring(url.length - 8, url.length)
          console.log(netflixid)

        } else {
          netflixid = response[0].episodes[0].netflixid
          console.log(netflixid)
          //showhistory.push(netflixid)
        }
        urltosearch = "https://unogsng.p.rapidapi.com/episodes?netflixid=".concat(netflixid)
        searchnetflixshow()
      })
  }
}
