function sortcurrentblogsavedlinks(currentblogsavedlinks, currentsliced, savedlinks, datelinks, linksonhomepage, url, daydatelinks, showname) { // change this to only /politics/
  var t0sort = performance.now()
  var currentblogsavedlinkstoavoid = ["/dedication/", "/post_type=", "/profile/", "-meetups", "celebrity-travel.html", "mailonline", "/index.html", "/search.html", "/culture/artoflondon", "/femail/food", "/registration/", "/profile.html", "/tvshowbiz/", "topics-list", "author-list", "/our-brands/", "cookie-policy", "privacy-notice", "/advertise/", "/classifieds/", "/h/", "/products?", "/subscribe?", "/donations?", "/vouchercodes/", "/register?", "/service/", "/programmes/", "/topic/", "license.html",
    "-dies", "lang=", "/video/", "/genre/", "/radio/", "/reading-list/", "/experts/", "/support-", "/files/", ".jpg", "/all-tags/", "random.php", "/email/", "/comic-blog-archive", "/extra.html", "/tag", "/user/", "/ebooks/", "/archive-month/", "/archive-date-range/", "/archive-tag/", "/extracomics/", "/pollsarchive", "javascript:", "/archive-2/", "sharer.php", "/slides/", "#replies", "/2020/candidates", "results/president", "coupons.", "/profiles/", "sitemap.html", "/tv/", "/specials/",
    "hpt=header", "/subscription?", "/news-event/", "/interactive/", "cn.ny", "action=",
    "/by/", "link=", "/blogroll/", "/library/", "/recommendations/", "/allposts", "/jobs/", "/feedback/", "/search-", "/about.html", "print=true", "contact#", "/authors/",
    "url=", "/notes/", "/changelog", "/sharer/", "/bio-2", "/faqs-2", "toprint=true", "/#", "/faqs/",
    "/search?", "/info-", "mailto", "javascript:void", "/signup", "/cart/", "success-stories", "rising-heroes", "newsletter", "click.", "/admin", "re-swatting", "/author/",
    "soonish", "guest-comic", "guest-post", "#respond", "replytocom", "feeds", "message.html", "/issues/", "?feed=", "/support/", "addtoany", " ",
    ".png", "privacy.php", "QCRSS.xml", "cast.php", "contact.php", "/shop/", "patreon", "api.",
    "amazing-things", "projects.php", "about.php", ".pdf", ".com/#", "/tags/", "email-protection", "/bets/",
    "prove-wrong-get-money", "/mistakes/", "/products/", "/rss", "/blog/author/", "editorial-process", "overview-page",
    "wp-content", "landing-page", "/join-", ".com#", "/about-", "/contact-", "/?random", "-recommends/", "/disclaimer/", "#comment-form",
    "#comment", "#cancel", "the-archive", "/work/", "/start/", "essential-books-for-students", "#content", "/learning/", "/productivity/",
    "/career/", "/life/", "/remote/", "/get-better-grades/", "-masterclass", "habit-building-essentials", "/playlist/", "/resources/",
    "college-packing-list", "what-if./", "/how-to/", "blag.", "license.html/", "links-", "meetup-", "top-posts/", "/donate/", "/faq/", "/questions/", "/s/", "/community/", "/events/", "commentId=", "/users/", "/out?",
    "/wp-login", "links-for/", "more-links/", "/en-gb/", "/pt-br/", "/pt-pt/", "/fr/", "/de/", "/ar/", "/it/", "/ru/", "/games/", "/reviews/", "/discussions/", "/welcome/", "/store/", "/commercial/",
    "/comments/", "econlog", "/help/", "/podcasts/", "/hangouts/", "/meetup/", "/meetups/", "/podcast/",
    "store.", "commercial.", "/comments/", "help.", "podcasts.", "hangouts.", "meetup.", "meetups.", "podcast.",
    "/section/", "account.", "/trending/", "/spotlight/", "/subscription/", "/international/", "/es/", "/categories/", "/category/", "/sponsors/", "/russian/", "/mundo/", "/portuguese/", "/persian/", "/weather/", "/terms/", "/privacy/", "/msa/",
    "/newsletter/", "/newsletters/", "/corporate/", "/sitemap/", "/#/", "/videos/",
    "/more/", "tag/", "/start-here/", "/links/", "/terms-and-conditions/", "/coaching-overview-page/", "/ot",
    "/open-thread", "/category/", "/about/", "/comments/feed/", "/blogger-bios", "/full-archive/", "/meet/", "/donate/", "/guides/",
    "forum/", "/disclaimer/", "/login/", "/search/", "/free-resources/", "/sharing-policy/", "/partner-us/", "/cast/", "/random/", "/best-articles/", "/courses/", "/?s",
    "/contact/", "/merch/", "atom.xml", "/disclosures/", "/privacy-policy", "/cookie-disclaimer/", "/feed/", "comment=", "comments", "/style/arts", "/style/design", "/business/tech", "/business/media", "/business/success", "/business/perspectives", "/entertainment/celebrities",
    "/entertainment/movies", "/entertainment/tv-shows", "/style/luxury", "/style/beauty", "/travel/destinations", "/travel/food-and-drink",
    "/travel/stay", "/sport/olympics", "/live-tv", "/vr", "cnn-underscored", "/style/autos", "/style/fashion", "/style/architecture", "/data/markets", "/tech/internet",
    "/health/body", "/health/fitness", "/food-drink/cooking", "/entertainment/streaming", "/tech/computing", "/health/sleep", "/health/social-gps", "/parenting/teens", "/tech/gaming", "/health/covid-19", "/life-in-general/environment"
  ]; // add if it just ends there aswell.  ot (could really fuck it up — make some regex)
  // maybe "/archive/",
  // maybe "/page/" (it's the same thing!)
  // the "/index.html" is controversial. when you notice the next bug try to move it down to only be the one archive link (?) or do some sites use index.html for other stuff?
  var toavoidends = ["/new-readers", "/cast-2", "/conventions", "/extras", "/syndication", "/contactus", "/femail/food", "/best-buys", "/index.html", "/mobile", "/topics", "/ourpapers", "/howcomplain", "/additionalcookieinfo", "/home", "/news/beauty", "/news/transport", "/news/education", "/news/us-politics", "/sport/rugby", "/sport/cricket", "/sport/tennis", "/sport/formula-one",
    "/beauty", "/insider", "/sport/football", "/news/crime", "/music", "/movies", "/cars", "horoscopes", "/graphics", "/arts", "/magazine",
    "/obituaries", "/opinion", "/markets", "/companies", "/compare", "topics-list", "/forgotten-password", "/profile", "/news", "/index.php",
    "/careers", "/press", "/books", "/media", "/history", "/info", "/commissions", "/new-reader", "/politics", "/business", "/health", "/entertainment", "/style", "/travel", "/sport", "/audio",
    "/collection", "/transcripts", "/accessibility", "/opinions", "/us", "/video", "/research",
    "/coronavirus-covid19", "/the-highlight", "/technology", "/identities", "/science-and-health", "/explainers", "/biden-administration", "/future-perfect", "/the-goods", "/energy-and-environment",
    "/masthead", "/recode", "/one-good-thing", "/culture", "/policy-and-politics", "/business-and-finance", "/first-person", "/tv", "/top-posts", "/feed", "/papers",
    "/cee", "/books", "/index.xml", "/videos", "/guides", "/search-guides", "/articles", "/about", "/bets", "/categories", "/podcasts", "/mistakes", "/search", "/page",
    "/news", "/contacts", "/privacy", "/story", "/blog", "/posts", "/comics", "/author", "/subscribe", "/archives", "/africa", "/americas", "/asia", "/australia", "/china",
    "/europe", "/india", "/middle-east", "/uk", "/world", "/parenting", "/relationships", "/life-in-general", "/money", "/tech", "/food-drink", "/latest", "/personal-finance"
  ]
  // have deleted "archives" and "archive" from above
  // what the hell is going on with the site awkward zombie?
  // failure cases:
  // http://marginalrevolution.com//www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmarginalrevolution.com%2Fmarginalrevolution%2F2019%2F12%2Fmarkets-in-everything-61.html
  // https://www.frogpants.com/instance (brings up the podcast archive — or maybe that is what one would want)
  // https://marginalrevolution.com/date-archives --> https://marginalrevolution.com/marginalrevolution/2006/03
  // https://80000hours.org/topic/other/effective-altruism/ (not an actual archive)
  // https://blog.givewell.org/category/transparency/ (not an actual archive)
  // https://www.jefftk.com/ jquery-3.6.0.js:10109 GET https://www.googleapis.com/customsearch/v1?key=AIzaSyCJ7EvVBXRurbvIloexFj8WseKHhKBDq5E&cx=6de52956f4c801b8e&q=site:www.jefftk.com%20%20archives 429
  // add /author/ (and /by/) specification if you notice it on a site (this is a really effective thing to do, actually), or just add "authorname" to the google search
  // and, of course, archive check like ALWAYS fails on news sites (you have another decent method - USE IT! (if you don't find "all", "posts", "full", "archive" (any of these words is enough))
  // alternatively, handle archive pages (this is no tradeoff on sites such as the onion), also for authors. would work on Vox,
  console.log("currentblogsavedlinks start sort: ", currentblogsavedlinks.slice(0, 10), currentblogsavedlinks.length)
  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (a) {
      if ((!a.includes(".") || a.includes("htm") || a.includes("comic=") || a.includes("index.php") || a.includes("..") || a.includes("archive")) &&
        a !== "/" && a !== "#" && (!a.includes("http://") && !a.includes("https://"))) { // alternatively .net, .io (all domains). all these rules, man.
        return a
      } else { //https (?), hello, security, fucking hell
        if (a.includes(currentsliced) && a !== "/") {
          return a
        }
      }
    }
  })
  // do like youtube here and open before (?) - fucking questionable content who has 5000 different comics
  console.log("after includes currentsliced/without http: ", currentblogsavedlinks)
  for (var i = 0; i < currentblogsavedlinks.length; i++) {
    if ((!currentblogsavedlinks[i].includes(".") || currentblogsavedlinks[i].includes("htm") || currentblogsavedlinks[i].includes("comic=") || currentblogsavedlinks[i].includes("archive") || currentblogsavedlinks[i].includes("index.php") ||
        currentblogsavedlinks[i].includes("?p=")) && !currentblogsavedlinks[i].includes("https://") && !currentblogsavedlinks[i].includes("http://") && !currentblogsavedlinks[i].includes("..")) {
      if (currentblogsavedlinks[i].slice(0, 1) !== ("/")) {
        currentblogsavedlinks[i] = "http://".concat(currentsliced).concat("/").concat(currentblogsavedlinks[i])
      } else {
        currentblogsavedlinks[i] = "http://".concat(currentsliced).concat(currentblogsavedlinks[i])
      }
      // maybe add concat("/") back
    }
  }
  console.log("then reformatted: ", currentblogsavedlinks)
  for (i = 0; i < currentblogsavedlinks.length; i++) {
    if (currentblogsavedlinks[i].includes("..")) {
      if (!currentblogsavedlinks[i].includes("/")) {
        currentblogsavedlinks[i] = "http://".concat(currentsliced).concat("/").concat(currentblogsavedlinks[i].substring(2))
      } else {
        currentblogsavedlinks[i] = "http://".concat(currentsliced).concat(currentblogsavedlinks[i].substring(2))
      }
      // maybe add concat("/") back
    }
  }
  console.log(".. rules: ", currentblogsavedlinks)
  currentremovedslashes = []
  for (i = 0; i < currentblogsavedlinks.length; i++) {
    if (currentblogsavedlinks[i].slice(0, 2) == ("//")) {
      currentblogsavedlinks[i] = "http:".concat(currentblogsavedlinks[i])
    }
    if (currentblogsavedlinks[i].slice(-1) == ("/")) {
      currentblogsavedlinks[i] = currentblogsavedlinks[i].slice(0, -1)
      currentremovedslashes.push(currentblogsavedlinks[i])
    }
  }
  console.log("currentremovedslashes: ", currentremovedslashes)

  console.log("lowercase and beginning /: ", currentblogsavedlinks)
  for (i = 0; i < currentblogsavedlinkstoavoid.length; i++) {
    currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
      if (!a.toLowerCase().includes(currentblogsavedlinkstoavoid[i])) { // && !((a[-1] !== "/" && a.slice(-currentblogsavedlinkstoavoid[i].length + 1) == currentblogsavedlinkstoavoid[i].slice(0, -1)))) {
        return a
      }
    })
  }
  console.log("currentblogsavedlinkstoavoid: ", currentblogsavedlinks)
  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (!toavoidends.includes(a.toLowerCase().slice(a.lastIndexOf('/', a.length))) && !currentblogsavedlinkstoavoid.includes(a.toLowerCase().slice(a.lastIndexOf('/', a.length)).concat("/"))) {
      return a
    }
  })
  console.log("toavoidends: ", currentblogsavedlinks)

  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    try {
      temporaryurl = new URL(a)
      temporaryurl = temporaryurl.pathname
    } catch (error) {
      temporaryurl = a
    }
    try {
      indexlength = a.indexOf(currentsliced) + currentsliced.length; // !!! can you do this?
      if (!a.substring(indexlength, a.length).includes("http://") && !a.substring(indexlength, a.length).includes("https://") && !a.substring(indexlength, a.length).includes("www.")) {
        return a
      }
    } catch (error) {}
  })
  console.log("currentsliced: ", currentsliced)

  // why the hell doesn't it get any links from http://www.brainlesstales.com/archive
  console.log("check that there aren't any links in path: ", currentblogsavedlinks)

  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (!(a in savedlinks)) { // what the hell what ifsavedlinks
      return a; // could be better # rule above
    }
  })
  console.log("check for savedlinks match: ", currentblogsavedlinks)

  // why doesn't this work
  // maybe add check if the episode names match, then delete one of the links (but which? the last one?)
  function determineif(currentcrunchepisode) {
    var currentcrunchpath = currentcrunchepisode.substring("http://www.crunchyroll.com/".length, currentcrunchepisode.length)
    var pathremovedslash = currentcrunchpath.substring(1, currentcrunchpath.length)
    var showname = pathremovedslash.substring(0, pathremovedslash.indexOf("/"))
    var pathremovedshowname = currentcrunchpath.substring(showname.length + 2, currentcrunchpath.length)
    var pathremovedshownameindexoffirstdash = pathremovedshowname.substring(pathremovedshowname.indexOf("-") + 1, pathremovedshowname.length).indexOf("-")
    var episodename = pathremovedshowname.substring(0, 8 + pathremovedshownameindexoffirstdash)
    var realepisodename = pathremovedshowname.substring(episodename.length, pathremovedshowname.length - 7)
    return realepisodename
  }

  if (currentsliced.includes("crunchyroll")) {
    console.log(showname)
    console.log("currentblogsavedlinks: ", currentblogsavedlinks.slice(0, 30))
    currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
      if (a.includes(showname) && a.includes("episode")) {
        return a
      }
    })
    console.log("currentblogsavedlinks: ", currentblogsavedlinks)

    //problem - the list changes
    // problem: it's cannot recognize multiple similar episodes
    duplicateepisodes = []
    for (i = 0; i < currentblogsavedlinks.length; i++) {
      episodeone = determineif(currentblogsavedlinks[i])
      console.log(episodeone)
      for (var j = 0; j < currentblogsavedlinks.length; j++) {
        episodetwo = determineif(currentblogsavedlinks[j])
        console.log(episodetwo)
        if (episodeone == episodetwo && i !== j && !duplicateepisodes.includes(episodeone)) {
          duplicateepisodes.push(currentblogsavedlinks[j])
        }
      }
    }
    console.log(duplicateepisodes)
    currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
      if (!duplicateepisodes.includes(a)) {
        return a
      }
    })
  }

  function getAllIndexes(arr, val) {
    var indexes = []
    for (var i = 0; i < arr.length; i++)
      if (arr[i] === val)
        indexes.push(i)
    return indexes
  }
  try {
    indexes = []
    trytomatchthis = ["https://www.", "http://www.", "https://", "http://"]
    indexes.push(getAllIndexes(currentblogsavedlinks, url))
    for (i = 0; i < trytomatchthis.length; i++) {
      currentindexes = getAllIndexes(currentblogsavedlinks, trytomatchthis[i].concat(currentsliced))
      for (j = 0; j < currentindexes.length; j++) {
        indexes.push(currentindexes[j])
      }
    }
    console.log("indexes: ", indexes)
    for (i = 0; i < indexes.length; i++) {
      currentblogsavedlinks.splice(indexes[i], 1)
      for (var j = 0; j < indexes.length; j++) {
        indexes[j] -= 1
      }
    }
    console.log("after removing copies of url: ", currentblogsavedlinks)
  } catch (error) {
    console.log("the exact same url as base didn't exist")
  }
  alreadyseen = []
  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (!alreadyseen.includes(a) && !alreadyseen.includes("https://".concat(a.slice("http://".length, a.length))) &&
      !alreadyseen.includes("http://".concat(a.slice("https://".length, a.length)))) {
      alreadyseen.push(a)
      return a
    }
  })
  console.log("after removing duplicates: ", currentblogsavedlinks)
  let regexsix = /\/\d{4}\/\d{2}$/
  let regexfour = /\/\d{4}$/
  let regexthree = /\/\d{3}$/
  let regexeight = /\/\d{4}\/\d+\/\d+$/
  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (a.match(regexsix) || a.match(/\/\d{4}\/\d{2}\/$/)) {
      try {
        datelinks[a] = currentsliced
      } catch (error) {
        console.log("date error")
      }
    } else {
      return a
    }
  })
  console.log("daydatelinks", daydatelinks)
  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (!a.match(regexfour)) {
      return a
    } else {
      if (parseInt(a.match(regexfour)[0].replace("/", "")) > 2025 || parseInt(a.match(regexfour)[0].replace("/", "")) < 1995) {
        return a
      } else { // if datelinks (currentdatelinks length)
        datelinks[a] = currentsliced
      }
    }
  })
  console.log("datelinks: ", datelinks)
  console.log("linksonhomepage: ", linksonhomepage)
  var preliminarycurrentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (!(a in linksonhomepage)) { // what the hell what ifsavedlinks
      return a; // could be better # rule above
    }
  })
  if (preliminarycurrentblogsavedlinks.length > 0) {
    currentblogsavedlinks = preliminarycurrentblogsavedlinks
  }
  console.log("after linksonhomepage: ", currentblogsavedlinks)
  datearchivepages = false
  /*var matches = []
  var matches = currentblogsavedlinks.filter(function(a) {
  	if (!a.includes("archive") && a.match(/\d{3}$/)) { // && !((a[-1] !== "/" && a.slice(-currentblogsavedlinkstoavoid[i].length + 1) == currentblogsavedlinkstoavoid[i].slice(0, -1)))) {
  		return a
  	}
  })*/
  if (url) {
    var temporarypathname = new URL(url)
    temporarypathname = temporarypathname.pathname
  }
  currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    var verytemporarypathname = new URL(a)
    verytemporarypathname = verytemporarypathname.pathname
    if ((!a.includes("archive") || (a.includes("archive") && (a.match(regexthree) || (a.length - "http://".concat(currentsliced).concat("/archive").length) > 20 ||
        a.match(regexfour) || a.match(/-\d{3}$/) || a.match(/-\d{4}$/)))) && !a.includes("a-guide-to") && !a.includes("all-posts") &&
      !a.includes("allposts") && !a.includes("/page/") && !a.includes("/month_") && !a.includes("/day_") && !a.includes("/year_")) { // && !((a[-1] !== "/" && a.slice(-currentblogsavedlinkstoavoid[i].length + 1) == currentblogsavedlinkstoavoid[i].slice(0, -1)))) {
      return a; // there are definitely failure cases to the above, such as xkcd // && !a.match(regexthree) && !a.match(regexfour)
      // the page stuff above will definitely break
    } else if (verytemporarypathname !== temporarypathname) {
      try {
        datelinks[a] = currentsliced
        if (datelinks[a].match(/\d+$/)) {
          datearchivepages = true
        }
        if (a.match(regexeight) || a.match(/\/\d{4}\/\d+\/\d+\/$/) || a.includes("/day_")) {
          daydatelinks.push(a)
        }
      } catch (error) {
        console.log("date error")
      }
    }
  })
  console.log("datelinks: ", datelinks)
  console.log("daydatelinks: ", daydatelinks)
  console.log("currentblogsavedlinks after archivedate: ", currentblogsavedlinks)
  let regextwo = /\d+$/
  if (datearchivepages) {
    archivepages = []
    newarchivepages = []
    for (var key in datelinks) {
      archivepages.push(key.match(regextwo)[0])
    }
    console.log(archivepages.slice(-1))
    for (i = 1; i <= archivepages.slice(-1); i++) {
      newarchivepages.push(i)
    }
    console.log(archivepages)
    console.log(newarchivepages)

    firstdatelink = Object.keys(datelinks)[0].slice(0, -i.toString().length).concat("=")
    datelinks = []
    for (i = 0; i < newarchivepages.length; i++) {
      datelinks[firstdatelink.concat(newarchivepages[i])] = currentsliced
    }
  }
  for (i = 0; i < currentblogsavedlinks.length; i++) {
    if (currentremovedslashes.includes(currentblogsavedlinks[i])) {
      currentblogsavedlinks[i] = currentblogsavedlinks[i].concat("/")
    }
  }
  var currentblogsavedlinks = currentblogsavedlinks.filter(function(a) {
    if (!browserurlhistory.includes(a)) {
      return a
    }
  })

  console.log("datelinks maybe archive: ", datelinks)

  console.log("currentblogsavedlinks end sort: ", currentblogsavedlinks.slice(0, 10), currentblogsavedlinks.length)
  console.log("sort time: " + ((performance.now() - t0sort) / 1000).toString().slice(0, 6) + " seconds")

  return [currentblogsavedlinks, datelinks, daydatelinks]
}
