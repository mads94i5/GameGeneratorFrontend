export function sanitizeStringWithTableRows(listGame) {
    let secureList = DOMPurify.sanitize("<li>" + tableRows + "</li>")
    secureList = secureList.replace("<li>", "").replace("</li>", "")
    return secureList
  }

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