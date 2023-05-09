import { isAuthenticated, removeToken } from "../../utils/auth.js"
import { getCredits } from "../../utils/credit.js";

function createLink(href, text) {
    const link = document.createElement("a");
    link.href = href;
    link.innerHTML = text;
    link.classList.add("nav-link");

    return link;
}

function refreshCreditsView() {    
    const wrapper = document.getElementById("credits");    
    wrapper.innerHTML = "";    

    if (!isAuthenticated()) {
        return;
    }
        
    const credits = getCredits();
    const creditsView = document.createElement("span");
    creditsView.innerHTML = `<i class="fa-solid fa-coins"></i> ${credits}`;
    wrapper.className = credits > 0 ? "success" : "danger";
    wrapper.appendChild(creditsView);
}

export default function InitHeader() {
    refreshCreditsView();

    const link = isAuthenticated() ? createLink("#", "Logout") : createLink("#login", "Login");
    document.getElementById("auth-link").innerHTML = link.outerHTML;
        document.getElementById("auth-link").querySelector("a").addEventListener("click", function (e) {
            e.preventDefault();

            if (isAuthenticated()) {
                removeToken();
            }

            window.router.navigate("/login");
        });
}