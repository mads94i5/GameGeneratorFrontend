import { isAuthenticated, removeToken } from "../../utils/auth.js"

function createLink(href, text) {
    const link = document.createElement("a");
    link.href = href;
    link.innerHTML = text;
    link.classList.add("nav-link");

    return link;
}

export default function InitHeader() {
    const link = isAuthenticated() ? createLink("#", "Logout") : createLink("#login", "Login");
    document.getElementById("auth-link").innerHTML = link.outerHTML;
        document.getElementById("auth-link").querySelector("a").addEventListener("click", function (e) {
            e.preventDefault();

            if (isAuthenticated()) {
                removeToken();
                window.router.navigate("/login");
            } else {
                window.router.navigate("/login");
            }
        });
}