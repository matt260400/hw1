fetch('../spotifyToken.php')
fetch('spotifyFetchTopTracks.php').then(onResponse).then(favouriteTrackJson)
fetch('spotifyFetchAlbum.php').then(onResponse).then(favouriteAlbumJson)
fetch('spotifyFetchRelatedArtists.php').then(onResponse).then(relatedArtistsJson)

function onResponse(promise) {
    return promise.json()
}

function favouriteTrackJson(trackArrayJson) {
    for (trackArray of trackArrayJson) {
        let favouriteTracks = JSON.parse(trackArray)

        for (let i = 0; i < favouriteTracks.tracks.length; i++) {
            favouriteTrackCardCreate(favouriteTracks.tracks[i])
        }
    }
}

function favouriteAlbumJson(albumArrayJson) {
    for (albumArray of albumArrayJson) {
        let favouriteAlbums = JSON.parse(albumArray)

        for (let i = 0; i < favouriteAlbums.items.length; i++) {
            favouriteAlbumCardCreate(favouriteAlbums.items[i])
        }
    }
}

function relatedArtistsJson(relatedArtistsArrayJson) {
    for (relatedArtistsArray of relatedArtistsArrayJson) {
        let relatedArtists = JSON.parse(relatedArtistsArray)

        for (let i = 0; i < 6; i++) {
            relatedArtistsCardCreate(relatedArtists.artists[i])
        }
    }
    loading.classList.add('hidden')
    customContents.classList.remove('hidden')
}

function favouriteTrackCardCreate(trackArray) {
    const trackCard = document.createElement('div')
    const trackImgAndInfoDiv = document.createElement('div')
    const trackImgDiv = document.createElement('div')
    const trackImg = document.createElement('img')
    const trackInfoDiv = document.createElement('div')
    const trackTitle = document.createElement('p')
    const trackAuthor = document.createElement('p')
    const trackLinksDiv = document.createElement('div')
    const trackLinkDiv = document.createElement('div')
    const trackLinkSenutia = document.createElement('a')
    const trackLinkSenutiaIcon = document.createElement('img')
    const trackLinkSpotify = document.createElement('a')
    const trackLinkSpotifyIcon = document.createElement('img')

    trackCard.classList.add('track')
    trackImgAndInfoDiv.classList.add('trackImgAndInfoDiv')
    trackImgDiv.classList.add('trackImg')
    trackInfoDiv.classList.add('trackInfo')
    trackTitle.classList.add('trackTitle')
    trackAuthor.classList.add('trackAuthor')
    trackLinksDiv.classList.add('trackLinksDiv')
    trackLinkDiv.classList.add('trackLink')
    trackLinkSenutia.classList.add('homepageLyricsLink')

    trackImg.src = trackArray.album.images[0].url
    trackTitle.textContent = trackArray.name
    trackAuthor.textContent = trackArray.artists[0].name
    trackLinkSenutiaIcon.src = "../Immagini/senutiaLink.png"
    trackLinkSpotifyIcon.src = "../Immagini/spotifyLink.png"

    trackCard.setAttribute("data-title", trackArray.name)
    trackCard.setAttribute("title", trackArray.name)
    trackCard.setAttribute("data-author", trackArray.artists[0].name)
    trackCard.setAttribute("data-album", trackArray.album.name)
    trackCard.setAttribute("data-release_date", trackArray.album.release_date)
    trackLinkSpotify.setAttribute("href", trackArray.external_urls['spotify'])
    trackLinkSpotify.setAttribute("target", "_blank")
    trackLinkSenutiaIcon.addEventListener('click', showLyrics)

    trackContainer.appendChild(trackCard)
    trackCard.appendChild(trackImgAndInfoDiv)
    trackImgAndInfoDiv.appendChild(trackImgDiv)
    trackImgDiv.appendChild(trackImg)
    trackImgAndInfoDiv.appendChild(trackInfoDiv)
    trackInfoDiv.appendChild(trackTitle)
    trackInfoDiv.appendChild(trackAuthor)
    trackCard.appendChild(trackLinksDiv)
    trackLinksDiv.appendChild(trackLinkDiv)
    trackLinkDiv.appendChild(trackLinkSenutia)
    trackLinkSenutia.appendChild(trackLinkSenutiaIcon)
    trackLinkDiv.appendChild(trackLinkSpotify)
    trackLinkSpotify.appendChild(trackLinkSpotifyIcon)
}

function favouriteAlbumCardCreate(albumArray) {
    let alreadyAdded = false

    for (item of document.querySelectorAll('#favouriteArtistsAlbums div')) {
        if (item.dataset.title === albumArray.name) {
            alreadyAdded = true
            break
        }
        else {
            alreadyAdded = false
        }
    }

    if (alreadyAdded === false) {
        const albumCard = document.createElement('div')
        const albumImgA = document.createElement('a')
        const albumImg = document.createElement('img')
        const albumInfoDiv = document.createElement('div')
        const albumTitle = document.createElement('p')
        const albumAuthor = document.createElement('p')

        albumCard.classList.add('album')
        albumImgA.classList.add('albumImgA')
        albumInfoDiv.classList.add('albumInfoDiv')
        albumTitle.classList.add('albumTitle')
        albumAuthor.classList.add('albumAuthor')

        albumImg.src = albumArray.images[0].url
        albumTitle.textContent = albumArray.name
        albumAuthor.textContent = albumArray.artists[0].name

        albumCard.setAttribute("data-title", albumArray.name)
        albumCard.setAttribute("title", albumArray.name)
        albumCard.setAttribute("data-author", albumArray.artists[0].name)
        albumCard.setAttribute("data-release_date", albumArray.release_date)
        albumImgA.setAttribute("href", albumArray.external_urls['spotify'])
        albumImgA.setAttribute("target", "_blank")

        albumContainer.appendChild(albumCard)
        albumCard.appendChild(albumImgA)
        albumImgA.appendChild(albumImg)
        albumCard.appendChild(albumInfoDiv)
        albumInfoDiv.appendChild(albumTitle)
        albumInfoDiv.appendChild(albumAuthor)
    }
}

function relatedArtistsCardCreate(relatedArtists) {
    const artistCard = document.createElement('div')
    const artistImgA = document.createElement('a')
    const artistImg = document.createElement('img')
    const artistInfoDiv = document.createElement('div')
    const artistName = document.createElement('p')
    const artistGenre = document.createElement('p')

    artistCard.classList.add('artist')
    artistImgA.classList.add('artistImgA')
    artistInfoDiv.classList.add('artistInfoDiv')
    artistName.classList.add('artistName')
    artistGenre.classList.add('artistGenre')

    artistImg.src = relatedArtists.images[0].url
    artistName.textContent = relatedArtists.name
    artistGenre.textContent = relatedArtists.genres[0]
    //artistGenre.textContent = capitalizeFirstLetter(genre)

    artistCard.setAttribute("data-id", relatedArtists.id)
    artistCard.setAttribute("title", relatedArtists.name)
    artistImgA.setAttribute("href", relatedArtists.external_urls['spotify'])
    artistImgA.setAttribute("target", "_blank")

    artistContainer.appendChild(artistCard)
    artistCard.appendChild(artistImgA)
    artistImgA.appendChild(artistImg)
    artistCard.appendChild(artistInfoDiv)
    artistInfoDiv.appendChild(artistName)
    artistInfoDiv.appendChild(artistGenre)

}

function showrapidSettings() {
    const rapidSettingsDiv = document.querySelector('#rapidSettings')
    const triangle = document.querySelector('#triangle')

    if (rapidSettingsDiv.classList.contains('hideSettings')) {
        rapidSettingsDiv.classList.remove('hideSettings')
        triangle.classList.remove('triangleUp')
        triangle.classList.add('triangleDown')
    }
    else {
        rapidSettingsDiv.classList.add('hideSettings')
        triangle.classList.remove('triangleDown')
        triangle.classList.add('triangleUp')
    }
}

/*
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
*/

const loading = document.querySelector('#loadingGIF')
const rapidSettings = document.querySelector('.proPicUsername')
const customContents = document.querySelector('#customContents')
const trackContainer = document.querySelector('#favouriteArtistsTopTracks')
const albumContainer = document.querySelector('#favouriteArtistsAlbums')
const artistContainer = document.querySelector('#suggestedArtists')
const scrollRight = document.querySelector('#scrollButtonRight').addEventListener('click', function () { document.querySelector('#favouriteArtistsTopTracks').scrollBy({ left: 595, top: 0, behavior: 'smooth' }) })
const scrollLeft = document.querySelector('#scrollButtonLeft').addEventListener('click', function () { document.querySelector('#favouriteArtistsTopTracks').scrollBy({ left: -595, top: 0, behavior: 'smooth' }) })

loading.classList.remove('hidden')
customContents.classList.add('hidden')

rapidSettings.addEventListener('click', showrapidSettings)