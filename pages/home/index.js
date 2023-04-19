import {sanitizeStringWithList} from "../../utils/utils.js"
import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"

  
  export async function initHome(){
    console.log("initiated");
  document.getElementById("generate").addEventListener("click", async function (event) {
    const game = await fetchGetJson(API_URL + "gameidea/create");
    console.log(game)
    const listGame = 
        `  <h2>${game.title}</h2>
        <ul>
          <li><strong>ID:</strong> ${game.id}</li>
          <li><strong>Description:</strong> ${game.description}</li>
          <li><strong>Genre:</strong> ${game.genre}</li>
          <li><strong>Number of players:</strong> ${game.player}</li>
        </ul>`
        

      const okList = sanitizeStringWithList(listGame)
      document.getElementById("string-list").innerHTML = okList
    
  })
}