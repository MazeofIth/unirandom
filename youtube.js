function youtube(url, stoprotate) {
  // you can get an account's history here: "https://www.youtube.com/feed/history?query=".concat("two minute papers"). But maybe violates TOS? ...aaaand it's deprecated
  if (url.includes('watch?')) {
    currentvideoid = url.slice(url.lastIndexOf('watch?v=') + 8)
  } else {
    currentvideoid = url.slice(url.lastIndexOf('.be/') + 4)
  }

  var youtubechannelarchive = []
  if (window.localStorage.getItem("youtubechannelarchive")) {
    youtubechannelarchive = JSON.parse(window.localStorage.getItem("youtubechannelarchive"))
  }
  var youtubevideoarchive = {}
  if (window.localStorage.getItem("youtubevideoarchive")) {
    youtubevideoarchive = JSON.parse(window.localStorage.getItem("youtubevideoarchive"))
  }
  var openedvideos = {}
  if (window.localStorage.getItem("openedvideos")) {
    openedvideos = JSON.parse(window.localStorage.getItem("openedvideos"))
  }

  console.log("youtubechannelarchive: ", youtubechannelarchive)
  console.log("openedvideos: ", openedvideos)
  console.log("youtubevideoarchive: ", youtubevideoarchive)
  channelid = false
  foundthekey = false
  console.log("currentvideoid: ", currentvideoid)
  username = ""
  // failure case: two minute papers weird name, T-series weird name
  // one solution is to search for the WHOLE url and take the channel of the first video (works for T-series)
  // doesn't work for two minute papers
  // solution for two minute papers: decodeURI('t-series'). Would this be useful for the general purpose random engine?
  // WTF?! why does it keep bringing up Karolinska's channel (after clicking on t-series) - one crazy hypothesis is that the channel name matches (a part?) of some of Karolinska's videoid. And then there's some logic that confuses them
  // the reason why two minute papers doesn't work that no search results are brought up (should you alert the user that this is the case, and that they should try a video instead - but that seems highly unprofessional, you should find another solution)
  // no, that's not the reason (why!?! why!?!! why!?!)
  function initialurlslicing() {
    if (username.includes("/")) {
      username = username.substring(0, username.indexOf("/"))
    }
    username = decodeURI(username)
  }
  if (url.includes("/user/")) {
    username = url.substring(url.indexOf("/user/") + 6, url.length)
    initialurlslicing()
  } else if (url.includes("/c/")) {
    username = url.substring(url.indexOf("/c/") + 3, url.length)
    initialurlslicing()
  } else if (url.includes("/channel/")) {
    username = url.substring(url.indexOf("/channel/") + 9, url.length)
    initialurlslicing()
  } else if (url.includes("/featured") || url.includes("/playlists") || url.includes("/videos") || url.includes("/community") || url.includes("/channels") || url.includes("/about")) {
    username = url.substring(url.indexOf(".com/") + 4, url.length)
    initialurlslicing()
  }
  for (var key in youtubevideoarchive) {
    if (key == currentvideoid) {
      console.log("foundthekey")
      channelid = youtubevideoarchive[key]
      foundthekey = true
    }
  }
  for (var key in openedvideos) {
    if (key == currentvideoid || username.includes(key) || username.includes(openedvideos[key])) {
      console.log("key: ", key)
      console.log("username: ", username)
      console.log("the opened key: ", openedvideos[key])
      console.log("foundtheopenedkey")
      channelid = openedvideos[key]
      foundthekey = true
    }
  }
  //console.log(channelid)

  function youtubeurlslicing() {
    channelid = username
    console.log("username: ", username)
    console.log("channelid: ", channelid)
    if (username.length !== 24) {
      findusernamechannelid()
    } else {
      findchannelarchive()
    }
  }

  function findusernamechannelid() {
    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=youtubedata&type=user&username=".concat(username),
      function(response) {
        console.log(JSON.stringify(response))
        channelid = response.items[0].id.channelId
        openedvideos[username] = channelid
        console.log(channelid)
        findchannelarchive()
      }
    )
  }

  // avoid delay of loading all the videos (only take like from the first 1000 results)
  function findchannelarchive() {
    youtubechannelarchive.push(channelid)
    window.localStorage.setItem("youtubechannelarchive", JSON.stringify(youtubechannelarchive))
    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=youtubedata&type=channel&channelid=".concat(channelid),
      function(response) {

        ////console.logJSON.stringify(response))
        // this was maybe an unnecessary step
        playlistid = response.items[0].contentDetails.relatedPlaylists.uploads
        //console.log(playlistid)
        ////console.logplaylistid)
        // "https://www.youtube.com/watch?v=AsmHz9JCU4M&list=".concat(playlistId).concat(response.items[0].contentDetails.relatedPlaylists.uploads)
        videoids = []
        openedlink = false
        console.log("playlistid: ", playlistid)
        var originalplaylistrequest = "https://unirandom-api-keys.herokuapp.com/?key=youtubedata&type=playlist&playlistid=".concat(playlistid)
        var playlistrequest = "https://unirandom-api-keys.herokuapp.com/?key=youtubedata&type=playlist&playlistid=".concat(playlistid)

        function searchPlaylist() {
          $.get(
            playlistrequest, //.concat("&pagetoken=".concat(channelid),
            function(response) {
              console.log("here we retrieve the playlist")

              function openlink() {
                videoid = videoids[Math.floor(Math.random() * (videoids.length - 1))]
                console.log("number of videos: ", videoids.length)
                while (browserurlhistory.includes(videoid)) {
                  videoid = videoids[Math.floor(Math.random() * (videoids.length - 1))]
                  console.log("browser youtube works")
                }
                for (i = 0; i < videoids.length; i++) {
                  youtubevideoarchive[videoids[i]] = channelid
                }

                // //console.logJSON.stringify(youtubevideoarchive))
                delete youtubevideoarchive[videoid]
                window.localStorage.setItem("youtubevideoarchive", JSON.stringify(youtubevideoarchive))
                // //console.log"youtubevideoarchive length: ".concat(youtubevideoarchive.length))
                openedvideos[videoid] = channelid
                window.localStorage.setItem("openedvideos", JSON.stringify(openedvideos))
                console.log("video would open:", "https://www.youtube.com/watch?v=".concat(videoid))
                window.open("https://www.youtube.com/watch?v=".concat(videoid))
                stoprotate()
                chrome.browserAction.setBadgeText({
                  text: ""
                });
                openedlink = true
              }
              if (nextpagetoken !== undefined && iteration < 100) {
                if (iteration == 20) {
                  chrome.browserAction.setBadgeBackgroundColor({
                    color: "blue"
                  });
                  chrome.browserAction.setBadgeText({
                    text: "wait.."
                  });
                }

                ////console.logJSON.stringify(response))
                nextpagetoken = response.nextPageToken
                length = response.items.length
                for (i = 0; i < length; i++) {
                  videoids.push(response.items[i].snippet.resourceId.videoId)
                }
                iteration += 1
                if (nextpagetoken !== undefined) {
                  playlistrequest = originalplaylistrequest.concat("&pagetoken=").concat(nextpagetoken)
                  searchPlaylist()
                }
              }
              if ((nextpagetoken == undefined || iteration == 99) && !openedlink) {
                openlink()
              }
            }
          )
        }
        var iteration = 0
        $.get(
          "https://unirandom-api-keys.herokuapp.com/?key=youtubedata&type=playlist&playlistid=".concat(playlistid),
          function(response) {
            ////console.logJSON.stringify(response))
            nextpagetoken = response.nextPageToken
            length = response.items.length
            for (i = 0; i < length; i++) {
              videoids.push(response.items[i].snippet.resourceId.videoId)
            }
            iteration += 1
            searchPlaylist(nextpagetoken)
          } // something wrong with "sax video" channel, maybe when it's less than 50 videos?
        )
      }
    )
  }

  // something wrong with less than 50 videos (?)
  // there's too much variation!
  // you can do a similar thing here as you did with netfilx to completely avoid the API call
  // the channel page!
  function findchannelid() {
    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=youtubedata&type=video&id=".concat(currentvideoid),
      function(response) {
        ////console.logJSON.stringify(response))
        // youtubevideoarchive window.localStorage.getItJSON.parse()
        channelid = response.items[0].snippet.channelId
        findchannelarchive()
      }
    )
  }
  if (foundthekey) { //  || browserurlhistory.includes(currentvideoid)
    console.log("youtubearchive")
    currentchannelvideos = []
    for (var key in youtubevideoarchive) {
      ////console.logkey)
      ////console.logyoutubevideoarchive[key])
      if (youtubevideoarchive[key] == channelid) {
        currentchannelvideos.push(key)
      }
    }
    // //console.log"current length: ".concat(JSON.stringify(currentchannelvideos)))
    videoid = currentchannelvideos[Math.floor(Math.random() * (currentchannelvideos.length))]
    while (browserurlhistory.includes(videoid)) {
      videoid = videoids[Math.floor(Math.random() * (videoids.length - 1))]
      console.log("browser youtube works")
    }
    console.log("currentchannelvideos: ", currentchannelvideos)
    delete youtubevideoarchive[videoid]
    openedvideos[videoid] = channelid
    window.localStorage.setItem("openedvideos", JSON.stringify(openedvideos))
    window.localStorage.setItem("youtubevideoarchive", JSON.stringify(youtubevideoarchive))
    // //console.log"included!")
    // //console.log"archive length: ".concat(JSON.stringify(youtubevideoarchive)))
    if (!videoid) {
      loadingvideoarchive = "You've watched everything"
      document.getElementsByClassName("submitbutton")[0].value = loadingvideoarchive
      dice = document.getElementsByTagName('img')[0]
      dice.style.animation = undefined
    } else {
      console.log("video would open: ", "https://www.youtube.com/watch?v=".concat(videoid))
      window.open("https://www.youtube.com/watch?v=".concat(videoid))
      stoprotate()
    }
  } else if (url.includes("/user/") || url.includes("/c/") || url.includes("/channel/") || url.includes("/featured") || url.includes("/playlists") ||
    url.includes("/videos") || url.includes("/community") || url.includes("/channels") || url.includes("/about")) {
    // add username to youtubevideoarchive check or something
    youtubeurlslicing()
  } else {
    findchannelid()
  }
}
