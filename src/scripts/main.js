import '../styles/style.css'

const cssPromises = {}

const loadResource = (src) => {
    if (src.endsWith('.js')) {
        return import(src)
    }
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = src
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve())
            })
            document.head.append(link)
        }
        return cssPromises[src]
    }

    return fetch(src).then(res => res.json())
}

const appContainer = document.getElementById('app')
const searchParams = new URLSearchParams(location.search)
const episodeID = searchParams.get('url')
console.log(searchParams.get('url'))

const renderPage = (moduleName, apiUrl, css) => {
    Promise.all([moduleName, apiUrl, css].map((src) => loadResource(src)))
        .then(([pageModule, data]) => {
        appContainer.innerHTML = ''
        appContainer.append(pageModule.render(data))
    })
}

if (episodeID) {
    console.log(`https://swapi.dev/api/films/${episodeID}`)
    renderPage(
        './film-details.js',
        `https://swapi.dev/api/films/${episodeID}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css'
    )
} else {
    renderPage(
        './film-list.js',
        'https://swapi.dev/api/films',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css'
    )
}

