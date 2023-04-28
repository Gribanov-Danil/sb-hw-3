export function render(data) {
    const container = document.createElement('div')
    container.classList.add(
        'container',
        'd-flex',
        'justify-content-between',
        'flex-wrap',
        'py-4'
    )

    data.results.forEach((dataObj) => {
        const productCard = document.createElement('div')
        const cardBody = document.createElement('div')
        const title = document.createElement('h4')
        const detailsButton = document.createElement('a')

        productCard.style.width = '33%'
        productCard.classList.add('card', 'my-2')
        cardBody.classList.add('card-body')
        title.classList.add('card-text')
        detailsButton.classList.add('btn', 'btn-primary')

        productCard.append(cardBody)
        cardBody.append(title, detailsButton)

        title.textContent = dataObj.title
        detailsButton.textContent = "Подробнее"
        detailsButton.href = `?url=${dataObj.url.slice(-2)}`

        container.append(productCard)
    })

    console.log(data)
    return container
}