import { initRating } from "./rating.js";
import { API_URL, HOST_URL } from "../../utils/settings.js";
import { fetchGetJson,
         fetchPostJsonFormData,
         sanitizeStringWithParagraph } from "../../utils/utils.js";

let isEventListenersAdded = false;

export async function initGameDetails(id){
    const spinner = document.getElementById("spinner");
    const generateForm = document.getElementById("generate-form")
    const gameIdeaIdElement = document.getElementById("gameIdeaId")
    const errorDiv = document.getElementById("errorDiv")
    errorDiv.innerHTML = '';
    spinner.style.display = "none";
    gameIdeaIdElement.value = id;

    if (!isEventListenersAdded) {
        generateForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            generateCode(id, generateForm, event);
        });
        isEventListenersAdded = true;
    }

    const game = fillGameIdeaData(id);

    fillGeneratedGameCodeData(id);

    fillSimilarGamesData(id);
    
    /**
     * Rating methods
     */
    initRating(id);
}

async function generateCode(id, form, event) {
    const token = localStorage.getItem("jwtToken")
    const spinner = document.getElementById("spinner")
    const generateButton = document.getElementById("generate")
    const errorDiv = document.getElementById("errorDiv")
    generateButton.disabled = true;
    generateButton.classList.remove("btn-success")
    spinner.style.display = "block";
    errorDiv.innerHTML = 'Generating code for a game may take a few minutes. Please wait..';
  
    await fetchPostJsonFormData(API_URL + `gamecode/generate`, form, event, token)
      .then(() => {
        fillGeneratedGameCodeData(id)
        spinner.style.display = "none";
        errorDiv.innerHTML = '';
        generateButton.disabled = false;
        generateButton.classList.add("btn-success")
      })
      .catch(error => {
        console.error(error);
        errorDiv.innerHTML = error;
        spinner.style.display = "none";
        generateButton.disabled = false;
        generateButton.classList.add("btn-success")
      });
  }

  async function fillGameIdeaData(id) {
    const game = await fetchGetJson(API_URL + `gameidea/public/get/${id}`);
    const imageUrl = "data:image/png;base64," + game.image;
    // Build primary game HTML
    let gameHtml = `
        <p style="font-size: 0.8em;text-align: left;margin-left: 2em;margin-right: 2em;">
        Game is ${game.generated === true ? "generated" : "created"} by ${game.user !== null && game.user !== undefined ? game.user.username : "a super user"}</p>
        <h2>${game.title}</h2>
        <img src="${imageUrl}" style="width: 512px; height: 512px;"> 
        <p style="font-size: 0.8em;text-align: left;margin-left: 2em;margin-right: 2em;">
        <strong>Description:</strong> ${game.description} <br>
        <strong>Genre:</strong> ${game.genre} <br>
        <strong>You play as:</strong> ${game.player} <br>
        <strong>Rating:</strong> <span id="rating">${Math.floor(game.totalRatingInPercent)}%</span><br>
        </p><br>`;

    const okGame = sanitizeStringWithParagraph(gameHtml);
    document.getElementById("game-idea").innerHTML = okGame;

    return game;
  }

async function fillGeneratedGameCodeData(id) {
    const game = await fetchGetJson(API_URL + `gameidea/public/get/${id}`);
    const gameCodes = await fetchGetJson(API_URL + `gamecode/public/get/${id}`);
    let gameCodeHtml = ''
    // Build game code HTML
    if (gameCodes && gameCodes.length > 0) {
        gameCodeHtml += `<hr><h2><strong>Generated game code:</strong></h2><hr>`;
        for (let i = 0; i < gameCodes.length; i++) {
            const fileName = `${game.title}_${gameCodes[i].codeLanguage.language}`.replace(/#/g, "sharp").replace(/\+/g, "plus").replace(/[^\w\s]/gi, '').replace(/ /g, '_');
            
            gameCodeHtml += `
              <p style="font-size: 0.8em;text-align: center;">
              <strong>${gameCodes[i].codeLanguage.language.charAt(0).toUpperCase() + gameCodes[i].codeLanguage.language.slice(1)}:</strong><br>
              <a href="${HOST_URL}gamecode/download/${gameCodes[i].id}" target="_blank" class="btn btn-success download-link">Download ${fileName}.zip</a>
              <a href="#/gamecode/${id}/${gameCodes[i].codeLanguage.language}" class="btn btn-primary" data-navigo>View code</a><br>
              </p>`;
        }
    }
    const okGeneratedCode = sanitizeStringWithParagraph(gameCodeHtml);
    document.getElementById("generated-code").innerHTML = okGeneratedCode;
}

function redirectWithHeader(url, headerName, headerValue) {
    // Create a new Headers object and add the custom header
    var headers = new Headers();
    headers.append(headerName, headerValue);
  
    // Create a new Request object with the URL and headers
    var request = new Request(url, {
      headers: headers
    });
  
    // Use the Request object to perform the redirect
    window.location = request;
  }
  
/*

function base64ToBlob(base64String, contentType = "") {
    const sliceSize = 1024;
    const byteCharacters = atob(base64String);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
  
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
  
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

*/

async function fillSimilarGamesData(id) {
    const game = await fetchGetJson(API_URL + `gameidea/public/get/${id}`);
    let similarGamesHtml = ''
    // Build similar games HTML
    if (game.similarGames && game.similarGames.length > 0) {
        similarGamesHtml += `<hr><h2><strong>Similar games:</strong></h2><hr><ul>`;
        for (let i = 0; i < game.similarGames.length; i++) {
            similarGamesHtml += `
            <h2>${game.similarGames[i].title}</h2>
            <a href="${game.similarGames[i].image}" target="_blank"><img src="${game.similarGames[i].image}" style="width: 460px; height: 215px;"></a> <br>
            <p style="font-size: 0.8em;text-align: left;">
            <strong>Description:</strong> ${game.similarGames[i].description} <br>
            <strong>Genre:</strong> ${game.similarGames[i].genre} <br>
            <strong>You play as:</strong> ${game.similarGames[i].player} <br>
            <strong>Link:</strong> <a href="${game.similarGames[i].link}" target="_blank">${game.similarGames[i].link}</a> <br>
            </p><hr>`;
        }
    }
    const okSimilarGames = sanitizeStringWithParagraph(similarGamesHtml);
    document.getElementById("similar-games").innerHTML = okSimilarGames;
}
