function showLyrics(event) {
    scroll(0, 0)

    searchResultsSpotify.classList.add('hidden')
    customContents.classList.add('hidden')
    //loading.classList.remove('hidden')

    lyricsContainer.innerHTML = ''

    const descriptionDiv = document.createElement('div')
    const imgDiv = document.createElement('div')
    const img = document.createElement('img')
    const infoDiv = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const album = document.createElement('p')
    const releaseDate = document.createElement('p')
    const lineBottom = document.createElement('div')
    const lyricsTextContainer = document.createElement('pre')

    lineBottom.classList.add('line')
    descriptionDiv.classList.add('descriptionDiv')
    infoDiv.classList.add('infoDiv')
    title.classList.add('title')

    lyricsContainer.appendChild(descriptionDiv)
    descriptionDiv.appendChild(imgDiv)
    imgDiv.appendChild(img)
    descriptionDiv.appendChild(infoDiv)
    infoDiv.appendChild(title)
    infoDiv.appendChild(author)
    infoDiv.appendChild(album)
    infoDiv.appendChild(releaseDate)
    lyricsContainer.appendChild(lineBottom)
    lyricsContainer.appendChild(lyricsTextContainer)

    let str
    let trackAuthorFetch 

    if (!event.currentTarget.parentElement.classList.contains('homepageLyricsLink')) {
        img.src = event.currentTarget.parentElement.parentElement.parentElement.querySelector('img').src
        title.innerText = event.currentTarget.parentElement.parentElement.parentElement.dataset.title
        author.innerText = 'Autore: ' + event.currentTarget.parentElement.parentElement.parentElement.dataset.author
        album.innerText = 'Album: ' + event.currentTarget.parentElement.parentElement.parentElement.dataset.album
        releaseDate.innerText = 'Data pubblicazione: ' + event.currentTarget.parentElement.parentElement.parentElement.dataset.release_date
        str = event.currentTarget.parentElement.parentElement.parentElement.dataset.title.split('-', 1)
        trackAuthorFetch = encodeURIComponent(event.currentTarget.parentElement.parentElement.parentElement.dataset.author)
    }
    else {
        img.src = event.currentTarget.parentElement.parentElement.parentElement.parentElement.querySelector('img').src
        title.innerText = event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.title
        author.innerText = 'Autore: ' + event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.author
        album.innerText = 'Album: ' + event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.album
        releaseDate.innerText = 'Data pubblicazione: ' + event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.release_date
        str = event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.title.split('-', 1)
        trackAuthorFetch = encodeURIComponent(event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.author)
    }

    const trackTitleFetch = encodeURIComponent(str[0])

    fetch("https://api.lyrics.ovh/v1/" + trackAuthorFetch + "/" + trackTitleFetch,
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(onLyricsResponse).then(onLyricsText)
}

function onLyricsResponse(promise) {
    if (!promise.ok) {
        alert('Testo non disponibile!')
        lyricsContainer.innerHTML = ''
        lyricsContainer.classList.add('hidden')
        searchResultsSpotify.classList.add('hidden')
        customContents.classList.remove('hidden')
        loading.classList.add('hidden')
    }
    return promise.json()
}

function onLyricsText(json) {
    const lyricsPre = document.querySelector('pre')

    const lyricsText = document.createElement('p')

    lyricsText.classList.add('lyricsText')

    lyricsText.textContent = json.lyrics

    lyricsPre.appendChild(lyricsText)

    lyricsContainer.classList.remove('hidden')
    loading.classList.add('hidden')
}

const searchResultsSpotify = document.querySelector('#searchResultsSpotify')
const lyricsContainer = document.querySelector('#lyrics')