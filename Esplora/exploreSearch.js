function search(event) {
    event.preventDefault();

    lyricsContainer.innerHTML = ''

    fetch('../spotifyToken.php')

    const searchValue = document.querySelector('#search').value.toLowerCase();

    const customContents = document.querySelector('#customContents')
    customContents.classList.add('hidden')

    const searchResultsSpotify = document.querySelector('#searchResultsSpotify')
    searchResultsSpotify.classList.remove('hidden')

    const albumSearchResult = document.querySelector('#albumSearchResult .resultsCard')
    albumSearchResult.innerHTML = ''

    const trackSearchResult = document.querySelector('#trackSearchResult .resultsCard')
    trackSearchResult.innerHTML = ''

    const artistSearchResult = document.querySelector('#artistSearchResult .resultsCard')
    artistSearchResult.innerHTML = ''

    const artistSearch = {}
    const trackSearch = {}
    const albumSearch = {}

    albumSearch["key0"] = searchValue
    trackSearch["key0"] = searchValue
    artistSearch["key0"] = searchValue

    const fetchValueAlbums = JSON.stringify(trackSearch)
    const fetchValueTracks = JSON.stringify(trackSearch)
    const fetchValueArtists = JSON.stringify(trackSearch)

    fetch('spotifySearchAlbums.php', {
        method: 'POST',
        body: fetchValueAlbums,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(onResponse).then(onJsonAlbumSearchResponse)

    fetch('spotifySearchTracks.php', {
        method: 'POST',
        body: fetchValueTracks,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(onResponse).then(onJsonTrackSearchResponse)

    fetch('spotifySearchArtists.php', {
        method: 'POST',
        body: fetchValueArtists,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(onResponse).then(onJsonArtistSearchResponse)

}

function onResponse(promise) {
    return promise.json()
}

function onJsonAlbumSearchResponse(json) {
    let AlbumJson = JSON.parse(json)
    searchCardCreation(AlbumJson.albums.items)
}

function onJsonTrackSearchResponse(json) {
    let trackJson = JSON.parse(json)
    searchCardCreation(trackJson.tracks.items)
}

function onJsonArtistSearchResponse(json) {
    let ArtistJson = JSON.parse(json)
    searchCardCreation(ArtistJson.artists.items)
}

function searchCardCreation(json) {
    for (item of json) {
        const card = document.createElement('div')
        const img = document.createElement('img')
        const cardInfo = document.createElement('div')
        const title = document.createElement('p')
        const link = document.createElement('a')
        const linkIcon = document.createElement('img')

        card.classList.add('card')
        cardInfo.classList.add('cardInfo')
        title.classList.add('searchTitle')

        if (item.type !== 'track') {
            img.src = item.images[0].url
            linkIcon.src = '../Immagini/spotifyLink.png'
            link.setAttribute("href", item.external_urls['spotify'])
            link.setAttribute("target", "_blank")
            card.setAttribute("data-title", item.name)
            card.setAttribute("title", item.name)
        }
        else {
            console.log(item)
            img.src = item.album.images[0].url
            linkIcon.src = '../Immagini/senutiaLink.png'
            linkIcon.addEventListener('click', showLyrics)
            card.setAttribute("data-title", item.name)
            card.setAttribute("title", item.name)
            card.setAttribute("data-author", item.artists[0].name)
            card.setAttribute("data-album", item.album.name)
            card.setAttribute("data-release_date", item.album.release_date)
        }

        title.textContent = item.name

        if (item.type === 'album') {
            const container = document.querySelector('#albumSearchResult .resultsCard')
            container.appendChild(card)
        }

        if (item.type === 'track') {
            const container = document.querySelector('#trackSearchResult .resultsCard')
            container.appendChild(card)
        }

        if (item.type === 'artist') {
            const container = document.querySelector('#artistSearchResult .resultsCard')
            container.appendChild(card)
        }

        card.appendChild(img)
        card.appendChild(cardInfo)
        cardInfo.appendChild(title)
        cardInfo.appendChild(link)
        link.appendChild(linkIcon)
    }
}

const searchBar = document.querySelector('#searchBar')
searchBar.addEventListener('submit', search)