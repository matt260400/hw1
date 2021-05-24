function checkUsername(event) {
    if (username.value !== '') {
        if (event.keyCode !== 37 && event.keyCode !== 38
            && event.keyCode !== 39 && event.keyCode !== 40) {
            if (!/^[a-zA-Z0-9_]{1,16}$/.test(username.value)) {
                username.parentElement.querySelector('p').textContent = 'Username non valido! Sono ammessi lettere, numeri e il carattere underscore. Lunghezza massima di 16 caratteri.'
                username.parentElement.querySelector('p').classList.remove('hidden')
                username.classList.remove('available')
                username.classList.add('compulsory')
                usernameValidation = false
            } else {
                fetch("checkUsername.php?q=" + encodeURIComponent(username.value)).then(onResponse).then(checkUsernameAvailability)
            }
        }
    }
    else {
        username.parentElement.querySelector('p').textContent = 'Inserisci un nome utente.'
        username.parentElement.querySelector('p').classList.remove('hidden')
        usernameValidation = false
    }
}

function checkUsernameAvailability(json) {
    console.log("Disponibilità username: " + json.available)
    if (json.available === true) {
        username.parentElement.querySelector('p').classList.add('hidden')
        username.classList.remove('compulsory')
        username.classList.add('available')
        usernameValidation = true
    } else {
        username.parentElement.querySelector('p').textContent = 'Nome utente non disponibile!'
        username.parentElement.querySelector('p').classList.remove('hidden')
        username.classList.remove('available')
        username.classList.add('compulsory')
        usernameValidation = false
    }
}

function checkEmail(event) {
    if (email.value !== '') {
        if (event.keyCode !== 37 && event.keyCode !== 38
            && event.keyCode !== 39 && event.keyCode !== 40) {
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email.value).toLowerCase())) {
                email.parentElement.querySelector('p').textContent = "Email non valida!"
                email.parentElement.querySelector('p').classList.remove('hidden')
                email.classList.remove('available')
                email.classList.add('compulsory')
                emailValidation = false
            } else {
                fetch("checkEmail.php?q=" + encodeURIComponent(email.value.toLowerCase())).then(onResponse).then(checkEmailAvailability);
            }
        }
    }
    else {
        email.parentElement.querySelector('p').textContent = 'Inserisci un indirizzo email.'
        email.parentElement.querySelector('p').classList.remove('hidden')
        emailValidation = false
    }
}

function checkEmailAvailability(json) {
    console.log("Disponibilità mail: " + json.available)
    if (json.available === true) {
        email.parentElement.querySelector('p').classList.add('hidden')
        email.classList.remove('compulsory')
        email.classList.add('available')
        emailValidation = true
    } else {
        email.parentElement.querySelector('p').textContent = 'Indirizzo email già utilizzato!'
        email.parentElement.querySelector('p').classList.remove('hidden')
        email.classList.remove('available')
        email.classList.add('compulsory')
        emailValidation = false
    }
}

function checkPassword() {
    password.parentElement.querySelector('p').classList.add('hidden')
    if (password.value !== '') {
        password.parentElement.querySelector('p').textContent = ''
        password.parentElement.querySelector('p').classList.add('hidden')
        checkPasswordConfirmation()
        if ((/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value))) {
            password.parentElement.querySelector('p').classList.add('hidden')
            password.classList.remove('compulsory')
            password.classList.add('available')
            passwordValidation = true
        }
        else {
            password.parentElement.querySelector('p').textContent = 'Lunghezza minima 8 caratteri (almeno una maiuscola, un numero e uno dei caratteri: @$!%*?&).'
            password.parentElement.querySelector('p').classList.remove('hidden')
            password.classList.remove('available')
            password.classList.add('compulsory')
            passwordValidation = false
        }
    }
    else {
        checkPasswordConfirmation()
        password.parentElement.querySelector('p').textContent = 'Lunghezza minima 8 caratteri (almeno una maiuscola, un numero e uno dei caratteri: @$!%*?&).'
        password.parentElement.querySelector('p').classList.remove('hidden')
        password.classList.remove('available')
        passwordValidation = false
    }
}

function checkPasswordConfirmation() {
    if (passwordCheck.value !== '') {
        if (password.value === passwordCheck.value) {
            passwordCheck.parentElement.querySelector('p').classList.add('hidden');
            passwordCheck.classList.add('available')
            passwordCheck.classList.remove('compulsory')
            passwordCheck.classList.add('available')
            passwordCheckValidation = true
        } else {
            passwordCheck.parentElement.querySelector('p').textContent = 'Le password non coincidono!'
            passwordCheck.parentElement.querySelector('p').classList.remove('hidden');
            passwordCheck.classList.remove('available')
            passwordCheck.classList.add('compulsory')
            passwordCheckValidation = false
        }
    }
    else {
        passwordCheck.parentElement.querySelector('p').classList.remove('hidden');
        passwordCheck.parentElement.querySelector('p').textContent = 'Ripeti la password!'
        passwordCheckValidation = false
    }
}

function onResponse(response) {
    if (response.ok) {
        return response.json();
    }
}

function checkForm() {
    if (usernameValidation === true && emailValidation === true && passwordValidation === true && passwordCheckValidation === true) {
        firstPage.classList.add('hidden')
        secondPage.classList.remove('hidden')
        thirdPage.classList.add('hidden')
    }
    else {
        if (username.value === '') {
            username.parentElement.querySelector('p').textContent = 'Inserisci un nome utente.'
            username.parentElement.querySelector('p').classList.remove('hidden')
            username.classList.remove('available')
            username.classList.add('compulsory')
            usernameValidation = false
        }

        if (email.value === '') {
            email.parentElement.querySelector('p').textContent = 'Inserisci un indirizzo email.'
            email.parentElement.querySelector('p').classList.remove('hidden')
            email.classList.remove('available')
            email.classList.add('compulsory')
            emailValidation = false
        }

        if (password.value === '') {
            password.parentElement.querySelector('p').textContent = 'Lunghezza minima 8 caratteri (almeno una maiuscola, un numero e uno dei caratteri: @$!%*?&).'
            password.parentElement.querySelector('p').classList.remove('hidden')
            password.classList.remove('available')
            password.classList.add('compulsory')
            passwordValidation = false
        }

        if (passwordCheck.value === '') {
            passwordCheck.parentElement.querySelector('p').classList.remove('hidden');
            passwordCheck.parentElement.querySelector('p').textContent = 'Ripeti la password!'
            passwordCheck.classList.remove('available')
            passwordCheck.classList.add('compulsory')
            passwordCheckValidation = false
        }
    }
}

function agreementCheck() {
    const agreementTick = document.querySelector('#tick')
    if (!agreementTick.classList.contains('checkboxColor')) {
        agreementCheckError.textContent = ''
        agreementCheckError.classList.add('hidden')
        agreementTick.classList.add('checkboxColor')
        agreementCheckValidation = true
    }
    else {
        agreementTick.classList.remove('checkboxColor')
        agreementCheckValidation = false
    }
}

function showInfo() {
    if (showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.remove('hidden')
    }
}

function closeInfoPage() {
    if (!showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.add('hidden')
    }
}

function changePage(event) {
    const pageSelector = event.currentTarget

    if (pageSelector.classList.contains('goToFirstPage')) {
        firstPage.classList.remove('hidden')
        secondPage.classList.add('hidden')
        thirdPage.classList.add('hidden')
    }

    if (pageSelector.classList.contains('goBackToSecondPage')) {
        firstPage.classList.add('hidden')
        secondPage.classList.remove('hidden')
        thirdPage.classList.add('hidden')
    }

    if (pageSelector.classList.contains('goToThirdPage')) {
        firstPage.classList.add('hidden')
        secondPage.classList.add('hidden')
        thirdPage.classList.remove('hidden')
    }
}

function highlightRed(event) {
    const isEmpty = event.currentTarget

    if (event.keyCode !== 9 && event.keyCode !== 16
        && event.keyCode !== 17 && event.keyCode !== 18 && event.keyCode !== 20) { // Verifico che non vengano premuti: 'tab', 'shift', 'ctrl', 'alt', 'caps lock'
        if (isEmpty.value === '') {
            isEmpty.classList.remove('available')
            isEmpty.classList.add('compulsory')
        }
    }
}

function favouriteArtistSend() {
    const datiDaInviare = document.querySelectorAll('#favouriteArtists div')
    let keyCount = 0
    artistList = {}

    for (item of datiDaInviare) {
        artistList["key" + keyCount] = item.dataset.id;
        keyCount++
    }

    const artistListStringify = JSON.stringify(artistList)

    if (Object.entries(artistList).length !== 0) {
        fetch('favouriteArtistInsert.php', {
            method: 'POST',
            body: artistListStringify,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    }
}

function signupDataSend(event) {
    event.preventDefault()
    if (usernameValidation === true && emailValidation === true && passwordValidation === true && passwordCheckValidation === true && agreementCheckValidation === true) {
        const formData = { method: 'post', body: new FormData(document.querySelector('form')) }
        fetch("signup.php", formData).then(onResponseCheck).then(redirectURL)
    }
    else {
        if (agreementCheckValidation === false) {
            agreementCheckError.textContent = 'Si prega di accettare spontaneamente i termini di servizio.'
            agreementCheckError.classList.remove('hidden')
        }
    }
}

function onResponseCheck(response) {
    if (response.ok) {
        favouriteArtistSend()
        return response.text()
    }
}

function redirectURL(URL) {
    window.location.replace(URL)
}

const showInfoWindow = document.querySelector('#infoView')
const agreementButton = document.querySelector('#checkbox')
const infoButton = document.querySelector('#infoButton')
const closeInfo = document.querySelector('#closeInfo')
const firstPage = document.querySelector('#firstPage')
const secondPage = document.querySelector('#secondPage')
const thirdPage = document.querySelector('#thirdPage')
const goToFirstPage = document.querySelector('.goToFirstPage')
const goToSecondPage = document.querySelector('.goToSecondPage')
const goBackToSecondPage = document.querySelector('.goBackToSecondPage')
const goToThirdPage = document.querySelector('.goToThirdPage')
const compulsoryText = document.querySelectorAll('#firstPage .textBox')
const username = document.querySelector('input[name="username"]')
const email = document.querySelector('input[name="email"]')
const password = document.querySelector('input[name="password"]')
const passwordCheck = document.querySelector('input[name="passwordCheck"]')
const agreementCheckError = document.querySelector('#agreementError')
const formRegistration = document.querySelector('form')
let usernameValidation = false
let emailValidation = false
let passwordValidation = false
let passwordCheckValidation = false
let agreementCheckValidation = false
let artistList = {}

goToSecondPage.addEventListener('click', checkForm)


for (item of compulsoryText) {
    item.addEventListener('keyup', highlightRed)
}

agreementButton.addEventListener('click', agreementCheck)
infoButton.addEventListener('click', showInfo)
closeInfo.addEventListener('click', closeInfoPage)
goToFirstPage.addEventListener('click', changePage)
username.addEventListener('keyup', checkUsername)
email.addEventListener('keyup', checkEmail)
password.addEventListener('keyup', checkPassword)
passwordCheck.addEventListener('keyup', checkPasswordConfirmation)
goBackToSecondPage.addEventListener('click', changePage)
goToThirdPage.addEventListener('click', changePage)
formRegistration.addEventListener('submit', signupDataSend)