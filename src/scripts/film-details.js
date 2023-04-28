import {getPromise} from "../utils/getPromise.js";

export function render(data) {
    const planets = data.planets
    const species = data.species
    let isPlanetsLoading = true
    let isSpeciesLoading = true
    let planetsArr = []
    const planetsUL = document.createElement("div")

    let speciesArr = []
    const speciesUL = document.createElement("div")
    const makePlanetArr = async (planet) => {
        let planetPromise = await getPromise(planet)
        planetsArr.push(planetPromise)
        if (planetsArr.length === planets.length) {
            isPlanetsLoading = false
            planetsUL.innerHTML = planetsArr.map((planet) => `
            <li class="list-group-item">${planet}</li>
            `).join('')
        }
    }
    planets.forEach((planet) => makePlanetArr(planet))

    const makeSpeciesArr = async (kind) => {
        let speciesPromise = await getPromise(kind)
        speciesArr.push(speciesPromise)
        if (speciesArr.length === species.length) {
            isSpeciesLoading = false
            speciesUL.innerHTML = speciesArr.map((kind) => `
            <li class="list-group-item">${kind}</li>
            `).join('')
        }
    }
    species.forEach((kind) => makeSpeciesArr(kind))
    const container = document.createElement('div')
    container.classList.add('container', 'py-4')
    let makeContainer = setInterval(() => {
        if (!isPlanetsLoading && !isSpeciesLoading) {
            container.innerHTML = `
                <h1>Эпизод ${data.title}</h1>
                <p>Вступление: ${data.opening_crawl}</p>
                <a class="btn-primary" href="/" style="cursor: pointer">Back to episodes</a>
                <ul id="planets__list" class="list-group mb-5">
                    <h2>Planets:</h2>
                </ul>
                <ul id="species__list" class="list-group">
                    <h2>Species</h2>
                </ul>
            `
            document.getElementById("planets__list").appendChild(planetsUL);
            document.getElementById("species__list").appendChild(speciesUL);
            clearInterval(makeContainer)
        }
    }, 1000)

    return container
}