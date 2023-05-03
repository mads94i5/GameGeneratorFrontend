  import { API_URL } from "../../utils/settings.js"
  import { fetchGetJson } from "../../utils/utils.js"
  const URL = API_URL + "gameidea/public/get-all"
  import { paginator } from "../../lib/pagination/paginate-bootstrap.js"
  const SIZE = 10
  /* const TOTAL = Math.ceil(1000 / SIZE) */

  let initialized = false

  const navigoRoute = "games"

  let sortField = "title";
  let sortOrder = "desc"

  function handleSort(headerText, pageNo, match) {
    sortOrder = sortOrder == "asc" ? "desc" : "asc";
    sortField = headerText;
    initGames(pageNo, match);
  }


  export async function initGames(pg, match) {
    
    if (!initialized) {
    document.querySelector('.table-header').addEventListener('click', function (event) {
      event.preventDefault();
      const target = event.target;
      if (target.tagName === 'A') {
        // Handle click on link in table header
        const headerId = target.id;
        let sortField = headerId.replace('header-', '');
        handleSort(sortField, pageNo, match);
      }})
      initialized = true
    }

      const p = match?.params?._page || pg  //To support Navigo
      let pageNo = Number(p)

      let backendPage = pageNo -1

    let queryString = `?size=${SIZE}&page=${pageNo}&sort=${sortField},${sortOrder}`

    let backendQuery = `?size=${SIZE}&page=${backendPage}&sort=${sortField},${sortOrder}`

    let games = await fetchGetJson(URL + backendQuery);

    fillTable(games);

    document.getElementById("button-filter").onclick = async function (evt) {
      evt.preventDefault();
      let genre = document.getElementById("genre-filter").value;
      const filterURL = API_URL + `gameidea/public/genre/${genre}`
      backendQuery = `?size=${SIZE}&page=${backendPage}&sort=${sortField},${sortOrder}&genre=${genre}`;
      fillTable(await fetchGetJson(filterURL + backendQuery));
    }

    document.getElementById("button-reset").onclick = async function (evt) {
      evt.preventDefault();
      initGames(pg, match)
    }


      const TOTAL = Math.ceil(await getCount() / SIZE);

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


    async function getCount(){
      var count = 0;
      try {
        count = await fetch(`${API_URL}gameidea/public/count`)
          .then(res => res.json())
      } catch (e) {
        console.error(e)
      }
      return count;
    }
    
    function fillTable(games){
      const tbody = document.getElementById("table-rows");
      const rows = games.map(game => `
      <tr>
        <td>${game.title}</td>
        <td>${game.description.slice(0, 50)}${game.description.length > 50 ? '...' : ''}</td>
        <td>${game.genre}</td>
        <td>${game.player}</td>
        <td><a href="#/gamedetails/${game.id}" class="btn-sm btn-success">Game info</a></td>
      </tr>
    `);
    tbody.innerHTML = rows.join("");
    }