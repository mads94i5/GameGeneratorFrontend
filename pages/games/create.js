import { sanitizeStringWithParagraph } from "../../utils/utils.js";
import { API_URL } from "../../utils/settings.js";
import { fetchPostJsonFormData } from "../../utils/utils.js";

let isEventListenersAdded = false;

export async function initCreateGame() {
    clearMechanicInputs()
    let mechanicsAmount = 1;
    for (let i = 0; i < mechanicsAmount; i++) {
        addMechanicInput(i);
    }
    const spinner = document.getElementById("spinner");
    const stringList = document.getElementById("string-list");
    const generateForm = document.getElementById("generate-form");
    const createForm = document.getElementById("create-form");
    const createMechanics = document.getElementById("mechanics")
    const generateMechanics = document.getElementById("gen-mechanics")
    
    stringList.innerHTML = "";
    spinner.style.display = "none";

    if (!isEventListenersAdded) {
        generateForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            createGame("generated", generateForm, event);
        });
        createForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            createGame("user", createForm, event);
        });
        createMechanics.oninput = function() {
            if (createMechanics.value < 1) {
                createMechanics.value = 1
            }
            if (createMechanics.value > 10) {
                createMechanics.value = 10
            }
            mechanicsAmount = createMechanics.value
            clearMechanicInputs()
            for (let i = 0; i < mechanicsAmount; i++) {
                addMechanicInput(i);
            }
        }
        generateMechanics.oninput = function() {
            if (generateMechanics.value < 1) {
                generateMechanics.value = 1
            }
            if (generateMechanics.value > 10) {
                generateMechanics.value = 10
            }
        }
        isEventListenersAdded = true;
    }
}

async function createGame(generatedOrUser, form, event) {
    const spinner = document.getElementById("spinner");
    const stringList = document.getElementById("string-list");
    const generateButton = document.getElementById("generate");
    const createButton = document.getElementById("create");
    createButton.disabled = true;
    createButton.classList.remove("btn-success")
    generateButton.disabled = true;
    generateButton.classList.remove("btn-success")
    spinner.style.display = "block";
      stringList.style.display = "none";

      await fetchPostJsonFormData(API_URL + `gameidea/create/${generatedOrUser}`, form, event)
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
        createButton.disabled = false;
        createButton.classList.add("btn-success")
        generateButton.disabled = false;
        generateButton.classList.add("btn-success")
      });
    }
    function clearMechanicInputs() {
        const manualMechanicsDiv = document.getElementById("mechanics-div");
        manualMechanicsDiv.innerHTML = ""
    }
    function addMechanicInput(id) {
        const input = `
        <div class="form-group">
            <label for="mechanic-${id}">Mechanic #${id+1}</label>
            <input type="text" class="form-control" name="mechanic-${id}" id="mechanic-${id}" required aria-required="true">
        </div>` 
        const manualMechanicsDiv = document.getElementById("mechanics-div");
        manualMechanicsDiv.innerHTML += sanitizeStringWithParagraph(input)
    }