import {sanitizeStringWithParagraph} from "../../utils/utils.js"
import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"

  
  export async function initHome(){

    console.log("initiated");

    const spinner = document.getElementById("spinner");
    const stringList = document.getElementById("string-list");

    spinner.style.display = "none";

  document.getElementById("generate").addEventListener("click", async function (event) {
    spinner.style.display = "block";
    stringList.style.display = "none";

    const game = await fetchGetJson(API_URL + "gameidea/create");

    console.log(game)

    const listGame = 
        `  <h2>${game.title}</h2>
          <p><strong>Description:</strong> ${game.description}</p>
          <p><strong>Genre:</strong> ${game.genre}</p>
          <p><strong>Number of players:</strong> ${game.player}</p>
          <p><a href="/gamedetails/${game.id}"><button>Game info</button></a></p>
        `;
        

      const okP = sanitizeStringWithParagraph(listGame);
      document.getElementById("string-list").innerHTML = okP;

      spinner.style.display = "none";
      stringList.style.display = "block";
    
  })
}