import { sanitizeStringWithParagraph } from "../../utils/utils.js";
import { API_URL } from "../../utils/settings.js";
import { fetchGetJson, bufferImage } from "../../utils/utils.js";

export async function initHome() {

  const spinner = document.getElementById("spinner");
  const stringList = document.getElementById("string-list");

  spinner.style.display = "none";

  document
    .getElementById("generate")
    .addEventListener("click", async function (event) {
      spinner.style.display = "block";
      stringList.style.display = "none";

      await fetchGetJson(API_URL + "gameidea/create")
      .then(game => {
        const bufferedImage = bufferImage(game)
        console.log(bufferedImage);
      
        const listGame = 
        `<hr><h2>${game.title}</h2>
        <p style="font-size: 0.8em;text-align: left;margin-left: 2em;margin-right: 2em;">
        <strong>Description:</strong> ${game.description} <br>
        <strong>Genre:</strong> ${game.genre} <br>
        <strong>You play as:</strong> ${game.player} <br>
        <strong>Image:</strong><img src="data:image/png;base64,${bufferedImage}"> 
        <p><a href="/gamedetails/${game.id}"><button class="btn-success">Game info</button></a></p>
        </p><br>`; 

        const okP = sanitizeStringWithParagraph(listGame);
        document.getElementById("string-list").innerHTML = okP;

        spinner.style.display = "none";
        stringList.style.display = "block";
      })
      .catch(error => {
        console.error(error);
      });
    })
  }