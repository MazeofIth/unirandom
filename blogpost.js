function blogpost(currentsliced, currentslicedpath, stoprotate) {
  creationdate = false

  var t0 = performance.now()
  var bloghistory = []
  if (window.localStorage.getItem("bloghistory")) {
    bloghistory = JSON.parse(window.localStorage.getItem("bloghistory"))
  }
  var searchbloghistory = []
  if (window.localStorage.getItem("searchbloghistory")) {
    searchbloghistory = JSON.parse(window.localStorage.getItem("searchbloghistory"))
  }
  var datebloghistory = []
  if (window.localStorage.getItem("datebloghistory")) {
    datebloghistory = JSON.parse(window.localStorage.getItem("datebloghistory"))
  }
  var loopbloghistory = []
  if (window.localStorage.getItem("loopbloghistory")) {
    loopbloghistory = JSON.parse(window.localStorage.getItem("loopbloghistory"))
  }
  var savedlinks = {}
  if (window.localStorage.getItem("savedlinks")) {
    savedlinks = JSON.parse(window.localStorage.getItem("savedlinks"))
  }
  var datelinks = {}
  if (window.localStorage.getItem("datelinks")) {
    datelinks = JSON.parse(window.localStorage.getItem("datelinks"))
  }
  var linksonhomepage = {}
  if (window.localStorage.getItem("linksonhomepage")) {
    linksonhomepage = JSON.parse(window.localStorage.getItem("linksonhomepage"))
  }
  var savedyears = {}
  if (window.localStorage.getItem("savedyears")) {
    savedyears = JSON.parse(window.localStorage.getItem("savedyears"))
  }
  console.log("savedlinks: ", savedlinks)
  console.log("bloghistory: ", bloghistory)
  console.log("searchbloghistory: ", searchbloghistory)
  console.log("datelinks: ", datelinks)
  console.log("datebloghistory: ", datebloghistory)
  console.log("loopbloghistory: ", loopbloghistory)
  console.log("linksonhomepage: ", linksonhomepage)
  console.log("savedyears: ", savedyears)
  var currentblogsavedlinks = []
  for (var key in savedlinks) {
    if (savedlinks[key] == currentsliced || savedlinks[key] == "www.".concat(currentsliced) || savedlinks[key].slice(4, savedlinks[key].length) == currentsliced || currentsliced.slice(4, currentsliced.length) == savedlinks[key]) {
      currentblogsavedlinks.push(key)
    }
  }
  console.log("currentblogsavedlinks: ", currentblogsavedlinks.slice(0, 10), currentblogsavedlinks.length)
  var years = ["2005", "2007", "2009", "2011", "2013", "2015", "2017", "2019", "2021"]; // the years are maybe somewhat unneccessary, atleast for big sites (there the worry is spotting another pattern, because just a letter "g"-cnn is enough)
  if (currentsliced in savedyears) {
    console.log("years: ", savedyears[currentsliced])
    years = savedyears[currentsliced]
  } else if (!(bloghistory.includes(currentsliced)) && !(datebloghistory.includes(currentsliced)) && !(searchbloghistory.includes(currentsliced))) { //http rules here aswell
    console.log("domination")
    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=domaination&currentsliced=".concat(currentsliced),
      function(response) {
        console.log(response)
        creationdate = response.domain.creationDate.match(/\d{4}/)[0]
        updatedate = response.domain.updatedDate.match(/\d{4}/)[0]
        console.log("creation & update: ", creationdate, updatedate)
        creationfunc()
      }
    );
  }
  var iterations = 0
  var a = "etaionshr"; //"abcdefghijklmnoprstuv"
  var loopiter = 0
  var extractedurls = []
  hassearchedarchive = false
  thisisdateoptions = false
  creationdate = false
  updatedate = false
  addedusername = false
  url = false
  var daydatelinks = []

  function decidearchiveordate(currentblogsavedlinks, datelinks) {
    //var [currentblogsavedlinks, datelinks] = sortcurrentblogsavedlinks(currentblogsavedlinks, currentsliced, savedlinks, datelinks, ifsavedlinks = true)
    // are the currentblogsavedlinks really correct here? (do you need to sort savedlinks again?)
    // url check here aswell
    if (datebloghistory.includes(currentsliced) || datebloghistory.includes("www.".concat(currentsliced))) {
      currentdatelinks = []
      for (let key in datelinks) {
        if (datelinks[key] == currentsliced || datelinks[key] == "www.".concat(currentsliced)) {
          currentdatelinks.push(key)
        }
      } // check if it's empty, then auto-generate one
      console.log("currentdatelinks: ", currentdatelinks)
      url = currentdatelinks[Math.floor(Math.random() * currentdatelinks.length)]
      delete datelinks[url]
      extractlinks(url, loop = false, opendate = true)
    } else if (currentblogsavedlinks.length > 0) {
      openfromsavedlinks(currentblogsavedlinks, savedlinks)
    }
  }

  function loopingextractlinks(currentblogsavedlinks, savedlinks) {
    for (i = 0; i < currentblogsavedlinks.length; i++) {
      savedlinks[currentblogsavedlinks[i]] = currentsliced
    }
    currentblogsavedlinks = []
    for (let key in savedlinks) {
      if (savedlinks[key] == currentsliced || savedlinks[key] == "www.".concat(currentsliced)) {
        currentblogsavedlinks.push(key)
      }
    }
    loopiter += 1
    console.log("loopiter: ", loopiter)
    console.log("savedlinks: ", savedlinks, Object.keys(savedlinks).length)
    console.log("currentblogsavedlinks: ", currentblogsavedlinks.slice(0, 10))

    if (currentblogsavedlinks.length > 5) {
      url = currentblogsavedlinks[Math.floor(Math.random() * currentblogsavedlinks.length)]
    } else {
      url = "http://".concat(currentsliced)
    }
    extractediter = 0
    if (loopiter < 10) {
      while (extractedurls.includes(url)) {
        extractediter += 1
        url = currentblogsavedlinks[Math.floor(Math.random() * currentblogsavedlinks.length)]
        if (extractediter > 10) {
          url = "http://".concat(currentsliced)
        }
      }
      extractedurls.push(url)
      console.log("url extract loop: ", url)
      extractlinks(url, loop = true)
    } else if (loopiter >= 10) {
      console.log("whole currentblogsavedlinks: ", currentblogsavedlinks)
      if (!loopbloghistory.includes(currentsliced)) {
        loopbloghistory.push(currentsliced)
      }
      openfromsavedlinks(currentblogsavedlinks, savedlinks)
    }
  }

  function optionsfunc(options) {
    if (!bloghistory.includes(currentsliced)) {
      bloghistory.push(currentsliced)
    }
    let regexsix = /\/\d{4}\/\d{2}\/$/
    let regexfour = /\/\d{4}\/$/
    var optionvalues = []
    for (var i = 1; i < options.length; i++) {
      optionvalues.push(options[i].value)
    }
    console.log("optionvalues: ", optionvalues)

    var datematches = optionvalues.filter(function(a) {
      if (a.match(regexsix) || a.match(regexfour) || a.match(/\/\d{4}\/\d{2}$/)) {
        thisisdateoptions = true
      }
    })

    if (thisisdateoptions) {
      var optionvalues = optionvalues.filter(function(a) {
        if (a.match(regexsix) || a.match(regexfour) || a.match(/\/\d{4}\/\d{2}$/)) {
          return a
        }
      })
      console.log("optionvalues: ", optionvalues)

      for (i = 0; i < optionvalues.length; i++) {
        datelinks[optionvalues[i]] = currentsliced
      }
      var currentblogsavedlinks = optionvalues
      options = []
      url = currentblogsavedlinks[Math.floor(Math.random() * currentblogsavedlinks.length)]
      delete currentblogsavedlinks[url]
      delete datelinks[url]
      if (!datebloghistory.includes(currentsliced)) {
        datebloghistory.push(currentsliced)
      }
      extractlinks(url, loop = false, opendate = true)
    } else {
      var currentblogsavedlinks = []
      for (i = 1; i < optionvalues.length; i++) {
        if (optionvalues[i].includes("http")) {
          currentblogsavedlinks.push(optionvalues[i])
        } else {
          currentblogsavedlinks.push("http://".concat(currentsliced).concat("/").concat(optionvalues[i]))
        }
      }
      console.log("options: ", currentblogsavedlinks)
      openfromsavedlinks(currentblogsavedlinks, savedlinks)
    }
  }

  function extractlinks(url, loop = false, opendate = false) {
    console.log("urltoextract: ", url)
    realurlwhat = url
    realdatelinks = datelinks
    var t0allorigins = performance.now()

    //"https://api.scraperapi.com?api_key=bb44097292137568bf5b686c1e8d73dc&url=".concat(url)
    //"https://api.webscrapingapi.com/v1?api_key=bzJh1WiHYl14pC1ndXHFjIMqO8MTaZmG&url=".concat(url)
    //'https://api.allorigins.win/get?url=' + encodeURIComponent(url) + getJSON
    // "https://app.zenscrape.com/api/v1/get?apikey=5868e050-d37c-11eb-8473-6153a26b8aed&url=".concat(url)
    // "https://api.scrapingdog.com/scrape?api_key=60d64e6d203da4515bf8e50f&url=".concat(url)
    // AND function(data) vs success
    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=scrapingdog&url=".concat(url),
      function(data) {

        console.log("allorigins time: " + ((performance.now() - t0allorigins) / 1000).toString().slice(0, 6) + " seconds")
        console.log("extracting links...")
        datelinks = realdatelinks

        var doc = document.createElement("html")
        doc.innerHTML = data //data/data.contents (this is actually (!) the only change), well, and getJSON above
        var links = doc.getElementsByTagName("a")
        var options = doc.getElementsByTagName("option")
        url = realurlwhat
        console.log("url: ", url)
        var currentsliced = new URL(url)
        currentsliced = currentsliced.hostname

        if (options.length > 100 && !opendate) {
          optionsfunc(options)
        } else {
          var currentblogsavedlinks = []
          for (var i = 0; i < links.length; i++) {
            currentblogsavedlinks.push(links[i].getAttribute("href"))
          }
          if (!url.includes("crunch")) {
            [currentblogsavedlinks, datelinks, daydatelinks] = sortcurrentblogsavedlinks(currentblogsavedlinks, currentsliced, savedlinks, datelinks, linksonhomepage, url, daydatelinks)
          } //console.log("currentblogsavedlinks after sort: ", currentblogsavedlinks)
          /*if (loop) {
          	loopingextractlinks(currentblogsavedlinks, savedlinks)
          }*/
          if (opendate) {
            if (currentblogsavedlinks.length > 0) {
              openfromsavedlinks(currentblogsavedlinks, savedlinks)
            } else {
              checkdateorsearchfirst(currentblogsavedlinks, datelinks, daydatelinks)
            }
          } else if (url.includes("crunch")) {
            [currentblogsavedlinks, datelinks, daydatelinks] = sortcurrentblogsavedlinks(currentblogsavedlinks, currentsliced, savedlinks, datelinks, linksonhomepage, url, daydatelinks, showname)
            openfromsavedlinks(currentblogsavedlinks, savedlinks)
          } else if ((!url.includes("archive") && currentblogsavedlinks.length < 100) || currentblogsavedlinks.length < 100) {
            checkdateorsearchfirst(currentblogsavedlinks, datelinks, daydatelinks)
          } else {
            console.log("definitely archive")
            if (!bloghistory.includes(currentsliced)) {
              bloghistory.push(currentsliced)
            }
            openfromsavedlinks(currentblogsavedlinks, savedlinks)
          }
        }
      })
  }

  function creationfunc() {
    if (creationdate) {
      years = [creationdate.toString()]
      yeardiff = updatedate - creationdate
      var d = new Date(creationdate, 01)
      console.log(d)
      creationyear = d.getFullYear()
      console.log("creationyear: ", creationyear)

      for (i = 1; i < yeardiff / 2 - 2; i++) {
        var da = new Date(creationyear + i * 2, 01)
        dayear = da.getFullYear()
        years.push(dayear.toString())
      }
      years.push(updatedate.toString())
      savedyears[currentsliced] = years
      console.log("savedyears: ", savedyears)
      window.localStorage.setItem("savedyears", JSON.stringify(savedyears))
    }
  }

  function createallthepages(currentdatelinks) {
    try {
      lastpage = parseInt(currentdatelinks[currentdatelinks.length - 1].match(/\d+$/)[0])
    } catch (error) {
      console.log("nolastpage")
    }
    if (currentdatelinks[0].includes("page") && lastpage > 30) {
      console.log("lastpage: ", lastpage)
      pagesarray = []
      pageformat = currentdatelinks[0].substring(0, currentdatelinks[0].lastIndexOf("/") + 1)
      for (i = 1; i < lastpage; i++) {
        pagesarray.push(pageformat.concat(i))
      }
      console.log("pagesarray: ", pagesarray)
      return pagesarray
    } else {
      return false
    }
  }

  function checkdateorsearchfirst(currentblogsavedlinks, datelinks, daydatelinks) {
    console.log("checkdateorsearchfirst")
    var currentdatelinks = []
    for (var key in datelinks) {
      if (datelinks[key] == currentsliced || datelinks[key] == "www.".concat(currentsliced)) {
        currentdatelinks.push(key)
      }
    }
    console.log("currentdatelinks: ", currentdatelinks)
    if (currentdatelinks.length > 10) {
      for (var i = 0; i < currentdatelinks.length; i++) {
        if (currentdatelinks[i] == "http://".concat(currentsliced).concat("/archive") || currentdatelinks[i] == "https://".concat(currentsliced).concat("/archive")) {
          currentdatelinks.splice(i, 1)
          i -= 1
        }
      }
      for (i = 0; i < currentblogsavedlinks.length; i++) {
        if (currentblogsavedlinks[i].slice(-1) == "/") {
          linksonhomepage[currentblogsavedlinks[i].slice(0, -1)] = currentsliced
        } else {
          linksonhomepage[currentblogsavedlinks[i]] = currentsliced
        }
      }
      pagesarray = createallthepages(currentdatelinks)
      if (createallthepages(currentdatelinks)) {
        currentdatelinks = pagesarray
        for (i = 0; i < currentdatelinks.length; i++) {
          datelinks[currentdatelinks[i]] = currentsliced
        }
        console.log("currentdatelinks after page: ", currentdatelinks)
      }
      console.log("currentdatelinks to randomize: ", currentdatelinks.slice(0, 10))
      console.log("daydatelinks", daydatelinks)
      if (daydatelinks.length > 5) {
        url = daydatelinks[Math.floor(Math.random() * daydatelinks.length)]
      } else {
        url = currentdatelinks[Math.floor(Math.random() * currentdatelinks.length)]
      }

      delete datelinks[url]
      if (!datebloghistory.includes(currentsliced)) {
        datebloghistory.push(currentsliced)
      }

      extractlinks(url, loop = false, opendate = true)
    } else if (currentdatelinks.length == 1 && (currentdatelinks[0].includes("archive") || !a.includes("a-guide-to") ||
        !a.includes("all-posts") || !a.includes("allposts")) && !hassearchedarchive) {
      hassearchedarchive = true
      extractlinks(currentdatelinks[0])
    } else {
      if (!searchbloghistory.includes(currentsliced)) {
        searchbloghistory.push(currentsliced)
      } // you're changing sliced url all over the place to currentsliced
      /*for (var i = 0; i < 25; i++) {
      	if (!creationdate) {
      		function sleep(milliseconds) {
      			var start = new Date().getTime()
      			for (var i = 0; i < 1e7; i++) {
      				if ((new Date().getTime() - start) > milliseconds) {
      					break
      				}
      			}
      		}
      		console.log("sleeping")
      		sleep(100)
      	}
      }*/
      searchgoogleifnotfoundarchive(currentsliced, iterations, a, years)
    }
    /*else {
    			loopingextractlinks(currentblogsavedlinks, savedlinks)
    		}*/
  }

  function openfromsavedlinks(currentblogsavedlinks, savedlinks) {
    //console.logJSON.stringify(savedlinks))
    urltoopen = currentblogsavedlinks[Math.floor(Math.random() * currentblogsavedlinks.length)]
    for (i = 0; i < currentblogsavedlinks.length; i++) {
      savedlinks[currentblogsavedlinks[i]] = currentsliced
    }
    delete savedlinks[urltoopen]
    window.localStorage.setItem("datebloghistory", JSON.stringify(datebloghistory))
    window.localStorage.setItem("datelinks", JSON.stringify(datelinks))
    window.localStorage.setItem("searchbloghistory", JSON.stringify(searchbloghistory))
    window.localStorage.setItem("bloghistory", JSON.stringify(bloghistory))
    window.localStorage.setItem("savedlinks", JSON.stringify(savedlinks))
    window.localStorage.setItem("linksonhomepage", JSON.stringify(linksonhomepage))
    window.localStorage.setItem("loopbloghistory", JSON.stringify(loopbloghistory))

    if (!urltoopen) {
      chrome.browserAction.setBadgeBackgroundColor({
        color: "red"
      });
      chrome.browserAction.setBadgeText({
        text: "error"
      });
      stoprotate()
    } else {
      // //console.logJSON.stringify(savedlinks))
      console.log("urltoopen: ", urltoopen)
      console.log("blog time: " + ((performance.now() - t0) / 1000).toString().slice(0, 6) + " seconds")
      stoprotate()
      window.open(urltoopen)
    }
  }


  function searchgoogleifnotfoundarchive(username) {
    iterations += 1
    console.log("iterations: ", iterations)
    aindex = Math.floor(Math.random() * a.length)
    indexyear = Math.floor(Math.random() * (years.length - 1)) + 1
    console.log("indexyear: ", indexyear)
    year = years[indexyear]
    previousyear = years[indexyear - 1]

    if (currentsliced.includes("twitter")) {
      if (currentslicedpath.indexOf("/status") !== -1) {
        console.log(currentslicedpath)
        currentsliced = "twitter.com".concat(currentslicedpath.substring(0, currentslicedpath.indexOf("/status")))
        console.log(currentsliced)
      } else {
        currentsliced = "twitter.com".concat(currentslicedpath)
        console.log(currentsliced)
      }
    } else if (currentsliced.includes("svt.se")) {
      currentsliced = "svt.se/nyheter"
    }
    /*if (currentsliced.includes("instagram")) {
      if (!addedusername) {
        addedusername = true
        currentsliced = currentsliced.concat("/").concat(username).concat("/p/")
      }
      whattoconcat = "site:".concat(currentsliced).concat(" ").concat(a[aindex])
    }*/
    /*else if (currentsliced.includes("facebook")) {
         currentsliced = "facebook.com/".concat(currentslicedpath.substring(1, currentslicedpath.indexOf("/", 1))).concat("/posts")
         console.log(currentsliced)
         whattoconcat = "site:".concat(currentsliced).concat(" ").concat(a[aindex])
       }*/
    if (iterations == 4) {
      whattoconcat = "site:".concat(currentsliced)
    } else {
      whattoconcat = "site:".concat(currentsliced).concat(" ").concat(a[aindex]).concat(" after:").concat(previousyear).concat("-06-01").concat(" before:").concat(year).concat("-06-01")
    }


    console.log(whattoconcat)

    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=customsearch&whattoconcat=".concat(whattoconcat),
      function(response) {
        console.log("search if not archive response: ", response)
        if (!response.items && iterations < 4) { //!!! < 3 arbitrary
          console.log("didn't find")
          years.splice(indexyear, 1)
          console.log("years: ", years)
          if (a.length > 0) {
            a = a.substring(0, aindex) + a.substring(aindex + 1, a.length)
          }
          console.log(a)
          searchgoogleifnotfoundarchive()
          /*if (search) {
          	decidearchiveordate()
          }*/
        } else if (!response.items) {
          chrome.browserAction.setBadgeBackgroundColor({
            color: "red"
          });
          chrome.browserAction.setBadgeText({
            text: "error"
          });
          stoprotate()
        } else if (iterations < 5 && response.items) {
          console.log("found")
          currentblogsavedlinks = []
          for (i = 0; i < response.items.length; i++) {
            currentblogsavedlinks.push(response.items[i].link)
          }
          // when should you add to savedlinks? savedlinks[response.items[i].link] = currentsliced
          console.log("savedlinks:", savedlinks)
          //var item = response.items[Math.floor(Math.random() * response.items.length

          var [currentblogsavedlinks, datelinks, daydatelinks] = sortcurrentblogsavedlinks(currentblogsavedlinks, currentsliced, savedlinks, datelinks, linksonhomepage, url, daydatelinks)
          console.log("currentblogsavedlinks: ", currentblogsavedlinks)
          if (currentblogsavedlinks.length == 0) {
            searchgoogleifnotfoundarchive()
          } else {
            openfromsavedlinks(currentblogsavedlinks, savedlinks)
          }
        }
        // add before after to the below
      }
    )
  }

  if (currentsliced.includes("crunchyroll")) {
    //do some smart thing with if crunchyroll check if currentslicedpath showname matches (then you won't have to rebuild the whole schebang)
    var pathremovedslash = currentslicedpath.substring(1, currentslicedpath.length)
    if (pathremovedslash.indexOf("/") !== -1) {
      var showname = pathremovedslash.substring(0, pathremovedslash.indexOf("/"))
    } else {
      var showname = pathremovedslash
    }
    console.log("showname: ", showname)
    currentsliced = currentsliced.concat("/").concat(showname)
    console.log("currentsliced: ", currentsliced)
    url = "https://".concat(currentsliced)
    console.log(url)
    if (url == "https://www.crunchyroll.com/") {
      url = url
      currentsliced = url
    }
    // maybe problems with redefined currentsliced (?)
    //whattoconcat = "site:".concat(currentsliced).concat(" ").concat(a[aindex])
    console.log(url)
    extractlinks(url)
  }
  /*else if (currentsliced.includes("instagram")) {
     instagram()
   }*/
  else if (currentsliced.includes("twitter")) { //|| currentsliced.includes("facebook")) { // note that there is something wrong with the twitter history)
    years = ["2006", "2009", "2011", "2013", "2015", "2017", "2019", "2021"]
    searchgoogleifnotfoundarchive()
  } else if (loopbloghistory.includes(currentsliced) || loopbloghistory.includes("www.".concat(currentsliced)) || datebloghistory.includes(currentsliced) || datebloghistory.includes("www.".concat(currentsliced))) {
    decidearchiveordate(currentblogsavedlinks, datelinks)
  } else if (searchbloghistory.includes(currentsliced) || searchbloghistory.includes("www.".concat(currentsliced))) {
    if (currentblogsavedlinks.length > 35) {
      openfromsavedlinks(currentblogsavedlinks, savedlinks)
    } else {
      searchgoogleifnotfoundarchive(currentsliced, iterations, a, years)
    }
  } else if (bloghistory.includes(currentsliced) || bloghistory.includes("www.".concat(currentsliced))) {
    openfromsavedlinks(currentblogsavedlinks, savedlinks)
  } else if (currentsliced.includes("oglaf")) {
    url = "http://".concat(currentsliced).concat("/archive/")
    extractlinks(url)
  } else if (currentsliced.includes("gwern")) {
    url = "http://".concat(currentsliced).concat("/index/")
    extractlinks(url)
  } else {
    console.log("trying to search for archive")
    archiveinlanguage = " archives ".concat(currentsliced.slice(0, currentsliced.indexOf(".")))
    if (currentsliced.includes(".se")) {
      archiveinlanguage = " arkiv artiklar"
    }

    var t0google = performance.now()

    $.get(
      "https://unirandom-api-keys.herokuapp.com/?key=customsearch&whattoconcat=".concat("site:").concat(currentsliced).concat(archiveinlanguage),
      function(response) {
        console.log("google time: " + ((performance.now() - t0google) / 1000).toString().slice(0, 6) + " seconds")
        try {
          var item = response.items[0]
          var url = item.link
          console.log("archive url: ", url)
          extractlinks(url)
        } catch (error) {
          console.log("that ain't no archive + error")
          if (!searchbloghistory.includes(currentsliced)) {
            searchbloghistory.push(currentsliced)
          }
          extractlinks("http://".concat(currentsliced))
          //searchgoogleifnotfoundarchive(currentsliced, search = false, iterations, a, years)
        }
      }
    )
  }
}
