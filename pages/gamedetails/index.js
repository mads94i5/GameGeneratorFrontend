import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"
import { sanitizeStringWithParagraph } from "../../utils/utils.js"


export async function initGameDetails(id){
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
        </p><br>`;

    // Build similar games HTML
    if (game.similarGames && game.similarGames.length > 0) {
        gameHtml += `<hr><h2><strong>Similar games:</strong></h2><hr><ul>`;
        for (let i = 0; i < game.similarGames.length; i++) {
            gameHtml += `
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

    const okList = sanitizeStringWithParagraph(gameHtml);
    document.getElementById("string-list").innerHTML = okList;
}