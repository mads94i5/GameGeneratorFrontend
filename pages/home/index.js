import {sanitizeStringWithList} from "../../utils/utils.js"
import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"

  
  export async function initHome(){
    console.log("initiated");
  document.getElementById("generate").addEventListener("click", async function (event) {
    const game = await fetchGetJson(API_URL + "gameidea/create");
    console.log(game)
    const listGame = 
        `<ul>
        <li>${game.id}</li>
        <li>${game.title}</li>
        <li>${game.description}</li>
        <li>${game.genre}</li>
        <li>${game.player}</li>
        <li><a href="/gamedetails/${game.id}"><button>Game info</button></a></li>
        </ul>`
        

      const okList = sanitizeStringWithList(listGame)
      document.getElementById("string-list").innerHTML = okList
    
  })
}