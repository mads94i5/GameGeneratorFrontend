//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./utils/navigo_EditedByLars.js"  //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js"  //Will create the global Navigo object used below

import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from ".utils/utils.js"

import { initGames } from "./pages/games/index.js"
import { initGameDetails } from "./pages/gamedetails/index.js"

window.addEventListener("load", async () => {

  const templateIndex = await loadHtml("./pages/home/index.html")
  const templateGames = await loadHtml("./pages/games/index.html")
  const templateGameDetails = await loadHtml("./pages/gamedetails/index.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Makes the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => {
        renderTemplate(templateIndex, "content")
      },
      "/games": () => {
        renderTemplate(templateGames, "content")
        initGames()
      },
      "/gamedetails": (match) => {
        renderTemplate(templateGameDetails, "content")
        initGameDetails()
      }
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}