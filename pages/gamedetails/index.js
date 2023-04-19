import { fetchGetImage, fetchGetJson } from "../../utils/utils.js"
import { API_URL } from "../../utils/settings.js";


export async function initGameDetails(){

    console.log("initiated")

    

    const generatedGame = fetchGetJson(API_URL + 'api/get/' );




const prompt = 'cover for a pc game where the player type is a goat and the genre is rpg';
const url = API_URL + `gameidea/imagegenerator/` + prompt;

fetchGetImage(url);


}