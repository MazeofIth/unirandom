chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, tabs => {
    /*chrome.browserAction.setBadgeBackgroundColor({
      color: "red"
    });
    chrome.browserAction.setBadgeText({
      text: "error"
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: "blue"
    });*/
    chrome.browserAction.setBadgeText({
      text: ""
    });
    var degree = 0;

    function rotate() {
      degree = degree === 270 ? 0 : degree + 90;
      var path = 'icon' + degree + '.png';
      chrome.browserAction.setIcon({
        path: path
      });

      timeoutID = setTimeout(rotate, 333);
    }

    function stoprotate() {
      clearTimeout(timeoutID)
      chrome.browserAction.setIcon({
        path: 'icon0.png'
      });
    }

    /* start */
    rotate();

    let url = tabs[0].url;
    var currentsliced = new URL(url)
    var currentslicedpath = currentsliced.pathname
    currentsliced = currentsliced.hostname
    console.log("url: ", url)
    console.log("currentsliced: ", currentsliced)
    browserurlhistory = []

    /*window.localStorage.setItem("bloghistory", JSON.stringify([]))
    window.localStorage.setItem("openedlinks", JSON.stringify([]))
    window.localStorage.setItem("urlhistory", JSON.stringify({}))
    window.localStorage.setItem("searchbloghistory", JSON.stringify([]))
    window.localStorage.setItem("datelinks", JSON.stringify({}))
    window.localStorage.setItem("savedyears", JSON.stringify({}))
    window.localStorage.setItem("linksonhomepage", JSON.stringify({}))
    window.localStorage.setItem("datebloghistory", JSON.stringify([]))
    window.localStorage.setItem("savedlinks", JSON.stringify({}))
    window.localStorage.setItem("showhistory", JSON.stringify([]))
    window.localStorage.setItem("loopbloghistory", JSON.stringify([]))
    window.localStorage.setItem("netflixsavedlinks", JSON.stringify({}))
    window.localStorage.setItem("netflixopenedlinks", JSON.stringify({}))
    window.localStorage.setItem("instasavedlinks", JSON.stringify([]))
    window.localStorage.setItem("youtubechannelarchive", JSON.stringify([]))
    window.localStorage.setItem("youtubevideoarchive", JSON.stringify({}))
    window.localStorage.setItem("openedvideos", JSON.stringify({}))
    console.log("everything resets")*/


    chrome.history.search({
      text: currentsliced,
      startTime: 0,
      maxResults: 1000
    }, function(data) {
      data.forEach(function(page) {
        browserurlhistory.push(page.url);
      });

      if (url == "https://www.youtube.com" || url == "https://youtube.com" || url == "https://www.youtube.com/" || url == "https://youtube.com/") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        stoprotate()
      } else if (currentsliced.includes("youtu")) {
        youtube(url, stoprotate)
      } else if (currentsliced.includes("wikipedia")) {
        if (currentsliced.includes("sv.")) {
          window.open("https://slumpartikel.toolforge.org/")
          stoprotate()
        } else {
          window.open("https://".concat(currentsliced).concat("/wiki/Special:Random"))
          stoprotate()
        }
      } else if (currentsliced.includes("wikiwand")) {
        window.open("https://www.wikiwand.com/random/".concat(currentslicedpath.slice(1, 3))) // make it work even if the user hasn't installed the wikiwand chrome extension, but just is on the website
        stoprotate()
      } else if (currentsliced.includes("reddit")) {
        window.open("https://reddit.com/r/random")
        stoprotate()
      } else if (currentsliced.includes("goodreads")) {
        window.open("https://www.goodreads.com/book/show/".concat(Math.floor(Math.random() * 9999000)))
        stoprotate()
      } else if (currentsliced.includes("wikihow")) {
        window.open("https://www.wikihow.com/Special:Randomizer")
        stoprotate()
      } else if (currentsliced.includes("urbandictionary")) {
        window.open("https://www.urbandictionary.com/random.php?page=".concat(Math.floor(Math.random() * 1000)))
        stoprotate()
      } else if (currentsliced.includes("scryfall")) {
        window.open("https://scryfall.com/random")
        stoprotate()
      } else if (currentsliced.includes("sporcle")) {
        window.open("https://www.sporcle.com/games/random.php")
        stoprotate()
      } else if (currentsliced.includes("gatherer")) {
        window.open("https://gatherer.wizards.com/Pages/Card/Details.aspx?action=random")
        stoprotate()
      } else if (currentsliced.includes("tumblr")) {
        window.open("https://".concat(currentsliced).concat("/random/"))
        stoprotate()
      } else if (currentsliced.includes("imbd")) {
        window.open("https://www.imdb.com/title/tt01".concat(Math.floor(Math.random() * 100000)))
        stoprotate()
      } else if (url.includes("/wiki/")) {
        window.open("https://".concat(currentsliced).concat("/wiki/Special:Random"))
        stoprotate()
      } else if (currentsliced.includes("netflix")) {
        netflix(url, currentslicedpath, stoprotate)
      } else {
        blogpost(currentsliced, currentslicedpath, stoprotate)
      }
    });
  });
});



/* next step is to implement 'only getting links that are part of the actual article' - and then you can delete the urlstoavoid array and the matching root site logic*/
