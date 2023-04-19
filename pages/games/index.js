import { API_URL } from "../../utils/settings.js"
import { fetchGetJson } from "../../utils/utils.js"
const URL = API_URL + "gameidea/get-all"

export async function initGames() {
    const tbody = document.getElementById("table-rows");
    const games = await fetchGetJson(URL);
    const rows = games.map(game => `
      <tr>
        <td>${game.id}</td>
        <td>${game.title}</td>
        <td>${game.description}</td>
        <td>${game.genre}</td>
        <td>${game.player}</td>
        <td><a href="/gamedetails/${game.id}"><button>Game info</button></a></td>
      </tr>
    `);
    tbody.innerHTML = rows.join("");
  }