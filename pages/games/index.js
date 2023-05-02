import { API_URL } from "../../utils/settings.js"
import { fetchGetJson } from "../../utils/utils.js"
const URL = API_URL + "gameidea/get-all"
import { paginator } from "../../lib/pagination/paginate-bootstrap.js"
const SIZE = 10
const TOTAL = Math.ceil(1000 / SIZE)

const navigoRoute = "games"

let sortField = "id";
let sortOrder = "desc"

function handleSort(pageNo, match) {
  sortOrder = sortOrder == "asc" ? "desc" : "asc";
  sortField = "genre";
  initGames(pageNo, match);
}


export async function initGames(pg, match) {

  document.getElementById("header-genre").onclick = function (evt) {
    evt.preventDefault()
    handleSort(pageNo, match)
  }

    const tbody = document.getElementById("table-rows");

    const p = match?.params?._page || pg  //To support Navigo
    let pageNo = Number(p)

   /*  let queryString = `?size=${SIZE}&page=` + (pageNo - 1)+ `&sort=${sortField},${sortOrder}&sort=kilometers,desc` */
   let queryString = `?size=${SIZE}&page=` + (pageNo - 1)+ `&sort=genre,${sortOrder}&sort=title,desc`

    const games = await fetchGetJson(URL + queryString);
    const rows = games.map(game => `
      <tr>
        <td>${game.title}</td>
        <td>${game.description.slice(0, 50)}${game.description.length > 50 ? '...' : ''}</td>
        <td>${game.genre}</td>
        <td>${game.player}</td>
        <td><a href="#/gamedetails/${game.id}"><button class="btn-success">Game info</button></a></td>
      </tr>
    `);
    tbody.innerHTML = rows.join("");


          // (C1-2) REDRAW PAGINATION
  paginator({
    target: document.getElementById("game-paginator"),
    total: TOTAL,
    current: pageNo,
    click: initGames
  });
  //Update URL to allow for CUT AND PASTE when used with the Navigo Router
  //callHandler: false ensures the handler will not be called again (twice)
  window.router?.navigate(`/${navigoRoute}${queryString}`, { callHandler: false, updateBrowserURL: true })
  }