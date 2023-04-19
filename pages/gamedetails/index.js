import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"
import { sanitizeStringWithList } from "../../utils/utils.js"


export async function initGameDetails(id){
    const game = await fetchGetJson(API_URL + `gameidea/get/${id}`);

    // Build primary game HTML
    let gameHtml = `
        <h2>${game.title}</h2>
        <strong>Description:</strong> ${game.description} <br>
        <strong>Genre:</strong> ${game.genre} <br>
        <strong>You play as:</strong> ${game.player} <br>
        <strong>Image:</strong> <a href="${game.image}" target="_blank"><img src="${game.image}"></a> <br>`;

    // Build similar games HTML
    if (game.titles && game.titles.length > 0) {
        gameHtml += `<hr><h2><strong>Similar games:</strong></h2><hr><ul>`;
        for (let i = 0; i < game.titles.length; i++) {
            gameHtml += `
                <li>
                    <strong>Title:</strong> ${game.titles[i]} <br>
                    <strong>Description:</strong> ${game.descriptions[i]} <br>
                    <strong>Genre:</strong> ${game.genres[i]} <br>
                    <strong>You play as:</strong> ${game.players[i]} <br>
                    <strong>Image:</strong> <a href="${game.images[i]}" target="_blank"><img src="${game.images[i]}"></a> <br>
                    <strong>Link:</strong> <a href="${game.links[i]}" target="_blank">${game.links[i]}</a> <br>
                </li><hr>`;
        }
        gameHtml += `</ul>`;
    }

    const okList = sanitizeStringWithList(gameHtml);
    document.getElementById("string-list").innerHTML = okList;
}