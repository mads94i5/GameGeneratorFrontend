import { API_URL } from "../../utils/settings.js"
import { fetchGetJson } from "../../utils/utils.js"
const URL = API_URL + "gameidea/get-all"

export async function initGames() {
    const tbody = document.getElementById("table-rows");
    const games = await fetchGetJson(URL);
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
  }