import { fetchGetImage } from "../../utils/utils.js"
import { API_URL } from "../../utils/settings.js";


export async function initGameDetails(){

    console.log("initiated")


const prompt = 'cover for a pc game where the player type is a goat and the genre is rpg';
const url = API_URL + `imagegenerator/` + prompt;

fetchGetImage(url);


}