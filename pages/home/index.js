import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"
import { sanitizeStringWithList } from "../../utils/utils.js"

  
  export async function initHome(){
  document.getElementById("generate").addEventListener("click", async function (event) {
    const game = await fetchGetJson(API_URL + "gameidea/create");
    console.log(game)
    const listGame = 
        `<h2>${game.title}</h2>
          <strong>Description:</strong> ${game.description} <br>
          <strong>Genre:</strong> ${game.genre} <br>
          <strong>You play as:</strong> ${game.player}`
      const okList = sanitizeStringWithList(listGame)
      document.getElementById("string-list").innerHTML = okList
    
  })
}