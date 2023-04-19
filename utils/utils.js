
  export async function handleHttpErrors(res) {
    if (!res.ok) {
      const errorResponse = await res.json();
      const error = new Error(errorResponse.message)
      // @ts-ignore
      error.fullResponse = errorResponse
      throw error
    }
    return res.json()
  }
 
  
export function renderTemplate(template, contentId) {
  const content = document.getElementById(contentId)
  if (!content) {
    throw Error("No Element found for provided content id")
  }
  content.innerHTML = ""
  content.append(template)
}

export async function loadHtml(page) {
  const resHtml = await fetch(page).then(r => {
    if (!r.ok) {
      throw new Error(`Failed to load the page: '${page}' `)
    }
    return r.text()
  });
  const parser = new DOMParser()
  const content = parser.parseFromString(resHtml, "text/html")
  const div = content.querySelector(".template")
  if (!div) {
    throw new Error(`No outer div with class 'template' found in file '${page}'`)
  }
  return div
};

export function adjustForMissingHash() {
  let path = window.location.hash
  if (path == "") { //Do this only for hash
    path = "#/"
    window.history.pushState({}, path, window.location.href + path);
  }
}

export function setActiveLink(topnav, activeUrl) {
  const links = document.getElementById(topnav).querySelectorAll("a");
  links.forEach(child => {
    child.classList.remove("active")
    //remove leading '/' if any
    if (child.getAttribute("href").replace(/\//, "") === activeUrl) {
      child.classList.add("active")
    }
  })
}

export async function fetchPostJsonFormData(URL, form, event) {
  let formElement = /** @type {HTMLFormElement} */ (form);
  event.preventDefault();
  const formData = new FormData(formElement);
  const dataFromForm = {};
  formData.forEach((value, key) => dataFromForm[key] = value);

  const options = {
    method: 'POST',
    body: JSON.stringify(dataFromForm),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const addedData = await fetch(URL, options)
   .then(handleJsonHttpErrors);
   return addedData;
}

export async function fetchGetJson(URL) {
  try {
    const data = await fetch(URL)
    .then(handleJsonHttpErrors)
    console.log("Data: ", data)
    return data;
  } catch (error) {
    if(error.fullResponse) {
      console.error("Error: ", error.fullResponse)
    }
  }
}

export function sanitizeStringWithTableRows(tableRows) {
  // @ts-ignore
  let secureRows = DOMPurify.sanitize("<table>" + tableRows + "</table>")
  secureRows = secureRows.replace("<table>", "").replace("</table>", "")
  return secureRows
}

export function encode(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}
