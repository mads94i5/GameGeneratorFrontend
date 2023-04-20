import { sanitizeStringWithParagraph } from "../../utils/utils.js";
import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js";

let isEventListenerAdded = false;

export async function initHome() {
  const spinner = document.getElementById("spinner");
  const stringList = document.getElementById("string-list");
  const generateButton = document.getElementById("generate");
  stringList.innerHTML = "";
  spinner.style.display = "none";

  if (!isEventListenerAdded) {
  generateButton.addEventListener("click", async function (event) {
    generateButton.disabled = true;
    generateButton.classList.remove("btn-success")
    spinner.style.display = "block";
      stringList.style.display = "none";

      await fetchGetJson(API_URL + "gameidea/create")
      .then(game => {
        const dataUrl = "data:image/png;base64," + game.image;
      
        const listGame = 
        `<hr><h2>${game.title}</h2>
        <img src="${dataUrl}" style="width: 512px; height: 512px;"> 
        <p style="font-size: 0.8em;text-align: left;margin-left: 2em;margin-right: 2em;">
        <strong>Description:</strong> ${game.description} <br>
        <strong>Genre:</strong> ${game.genre} <br>
        <strong>You play as:</strong> ${game.player} <br>
        <p><a href="#/gamedetails/${game.id}"><button class="btn-success">Game info</button></a></p>
        </p><br>`; 

        const okP = sanitizeStringWithParagraph(listGame);
        stringList.innerHTML = okP;

        spinner.style.display = "none";
        stringList.style.display = "block";
        generateButton.disabled = false;
        generateButton.classList.add("btn-success")
      })
      .catch(error => {
        console.error(error);
        stringList.innerHTML = error + `<br>Failed to retrieve data from external APIs.`;
        spinner.style.display = "none";
        stringList.style.display = "block";
        generateButton.disabled = false;
        generateButton.classList.add("btn-success")
      });
    })
    
    isEventListenerAdded = true;
  }
}