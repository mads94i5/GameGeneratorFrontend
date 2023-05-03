import { API_URL } from "../../utils/settings.js";
import { fetchGetJson } from "../../utils/utils.js"
import { sanitizeStringWithParagraph } from "../../utils/utils.js"


function createRating(rating) {
    return fetch(API_URL + "game-ratings", {
        method: "POST",
        body: JSON.stringify(rating),
        headers: {
            "Content-Type": "application/json",
        },
    });    
}

function onStarsClick(i, id) {
    if (hasRated) {
        console.log("You have already rated this game idea!");
        return;
    }

    const score = 5 - i;
    const rating = {
        gameIdeaId: id,
        score,
    };

    console.log("You clicked on star " + score);

    createRating(rating)
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                document.getElementById("rating").innerHTML = `${Math.floor(data.totalScoreInPercent)}%`;
                document.querySelector(".star-container").classList.add("rated");
                colorStarsBasedOnRating(score);
                hasRated = true;
            }
            else {
                alert("Something went wrong!");
            }
        })
        .catch((err) => {
            alert(err);
        });
}

function colorStarsBasedOnRating(rating) {
    const stars = document.querySelectorAll(".fa-star");
    // Color stars based on rating
    for (let i = 0; i < rating; i++) {
        const index = 4 - i;
        stars[index].classList.add("checked");
    }
}

let hasRated = false;

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
        <strong>Rating:</strong> <span id="rating">${Math.floor(game.totalRatingInPercent)}%</span><br>
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
    
    /**
     * Rating methods
     */
    document.querySelector(".star-container").classList.remove("rated");
    document.querySelectorAll(".fa-star").forEach((star) => {
        star.classList.remove("checked");
    });
    hasRated = false;
    // Get all stars
    const stars = document.querySelectorAll(".fa-star");
    // Add event listener to each star and increase rating by 1 for each star
    for (let i = 0; i < stars.length; i++) {
        if (!hasRated) {
            // Note: because we override the onclick function, instead
            // of using the addEventListener method, we avoid having
            // multiple event listeners on the same element.
            //
            // Why not use addEventListener? Because we want to be able
            // to update the id being passed to the onStarsClick function,
            // when showing another game idea.
            stars[i].onclick = () => onStarsClick(i, id);
        }
    }
}