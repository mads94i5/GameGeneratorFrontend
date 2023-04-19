<<<<<<< HEAD
import {sanitizeStringWithParagraph} from "../../utils/utils.js"
=======
>>>>>>> e4cd656d1f8f2c8ed136f49faaadf1d4179776aa
import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"
import { sanitizeStringWithList } from "../../utils/utils.js"

  
  export async function initHome(){
<<<<<<< HEAD

    console.log("initiated");

    const spinner = document.getElementById("spinner");
    const stringList = document.getElementById("string-list");

    spinner.style.display = "none";

=======
>>>>>>> e4cd656d1f8f2c8ed136f49faaadf1d4179776aa
  document.getElementById("generate").addEventListener("click", async function (event) {
    spinner.style.display = "block";
    stringList.style.display = "none";

    const game = await fetchGetJson(API_URL + "gameidea/create");

    console.log(game)

    const listGame = 
<<<<<<< HEAD
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
=======
        `<h2>${game.title}</h2>
          <strong>Description:</strong> ${game.description} <br>
          <strong>Genre:</strong> ${game.genre} <br>
          <strong>You play as:</strong> ${game.player}`
      const okList = sanitizeStringWithList(listGame)
      document.getElementById("string-list").innerHTML = okList
>>>>>>> e4cd656d1f8f2c8ed136f49faaadf1d4179776aa
    
  })
}