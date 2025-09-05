const input = document.getElementById("url-input")
const api = 'http://localhost:9999'

const showShortUrl = document.getElementById('show-short')

async function sendLongUrl() {

    const url = input.value
    let code;

    const response = await fetch(api+'/short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          url: url
        })
      })
      .then(async response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        code = await response.json()
      })
    
    
    showShortUrl.innerHTML = `<a class="new-url" target="_blank" href="http://localhost:9999/${code.code}">http://localhost:9999/${code.code}</a>`
}