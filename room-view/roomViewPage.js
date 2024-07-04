
import { historicalPersons, Room } from "../roomClass.js"

document.addEventListener('DOMContentLoaded', function () {

    let selectedCentury = JSON.parse(localStorage.getItem('selectedCentury'))

    let room = new Room(historicalPersons)

    room.century = selectedCentury

    let displayingCentury = document.querySelector('#century')

    displayingCentury.textContent = room.century

    room.loadFromLocalStorage()
    let personsOfTheCentury = room.getSelectedPersons()
    console.log(personsOfTheCentury)

    let personsOnDisplay = document.querySelector('#persons-on-display')
    let messageContainer = document.querySelector('#message-container')

    let messageIfEmpty = `<p>You haven't chosen anyone from this century yet, please <a href="../historical-persons/historicalPersonsPage.html">give it a go!</a></p>`

    if (personsOfTheCentury.length === 0) {
        messageContainer.innerHTML = messageIfEmpty
        messageContainer.style.display = 'block'
    }

    personsOfTheCentury.forEach(person => {


        // CREATING ELEMENTS TO POPULATE WITH THE PERSONS SELECTED

        let selectedPersonDiv = document.createElement('div')
        selectedPersonDiv.className = 'person-card card'

        let personFrontBodyDiv = document.createElement('div')
        personFrontBodyDiv.className = 'front card-body'

        let personOverlayFront = document.createElement('div')
        personOverlayFront.className = 'person-overlay'

        let personInfoDiv = document.createElement('div')
        personInfoDiv.className = 'person-info'

        let pictureElementFront = document.createElement('img')
        pictureElementFront.src = person.image
        pictureElementFront.alt = person.name
        pictureElementFront.className = 'card-img-top person-image img-fluid'

        let nameElement = document.createElement('h5')
        let lifespanElement = document.createElement('p')
        let questionElement = document.createElement('div')
        questionElement.className = 'more-info'

        nameElement.innerText = person.name
        lifespanElement.innerText = person.lifespan
        questionElement.innerText = 'Did you know that -'

        // let personDetailsAsBio = document.createElement('div')
        // personDetailsAsBio.className = 'person-details'

        let personFullBio = document.createElement('p')
        personFullBio.className = 'card-text full-bio'
        personFullBio.innerText = person.bio

        // BACK OF THE PERSON CARD

        let backOfThePersonCard = document.createElement('div')
        backOfThePersonCard.className = 'back card-body'

        let personNotableWork = document.createElement('div')
        personNotableWork.className = 'notable-work'

        let notableWorkImageBack = document.createElement('img')
        notableWorkImageBack.src = person.notableWork
        notableWorkImageBack.alt = 'Image description below.'
        notableWorkImageBack.className = 'img-fluid'

        let notableWorkDescription = document.createElement('p')
        notableWorkDescription.className = 'card-text notable-work-description'
        notableWorkDescription.innerText = person.descriptionOfWork

        // APPENDING EVERYTHING TO PAGE

        personInfoDiv.appendChild(nameElement)
        personInfoDiv.appendChild(lifespanElement)
        personInfoDiv.appendChild(questionElement)
        personInfoDiv.appendChild(personFullBio)

        // personDetailsAsBio.appendChild(personFullBio)

        personOverlayFront.appendChild(personInfoDiv)

        personFrontBodyDiv.appendChild(pictureElementFront)
        personFrontBodyDiv.appendChild(personOverlayFront)
        // personFrontBodyDiv.appendChild(personDetailsAsBio)

        personNotableWork.appendChild(notableWorkImageBack)
        personNotableWork.appendChild(notableWorkDescription)
        backOfThePersonCard.appendChild(personNotableWork)

        selectedPersonDiv.appendChild(personFrontBodyDiv)
        selectedPersonDiv.appendChild(backOfThePersonCard)

        personsOnDisplay.appendChild(selectedPersonDiv)


        // ADDING EVENTS TO THE PERSON CARDS


        let isCardFlipped = false
        let isBioShown = false

        questionElement.addEventListener('mouseenter', () => {
            personFullBio.style.display = 'block'
            isBioShown = true
        })

        questionElement.addEventListener('mouseleave', () => {
            personFullBio.style.display = 'none'
            if (isBioShown && !isCardFlipped) {
                questionElement.innerText = 'Click to find out more'
                questionElement.addEventListener('click', handleCardClick)
            }
        })

        selectedPersonDiv.addEventListener('mouseleave', () => {
                selectedPersonDiv.classList.remove('show-back')
                isCardFlipped = false
                isBioShown = false
                questionElement.innerText = 'Did you know that -'
        })

        function handleCardClick() {
            isCardFlipped = true
            selectedPersonDiv.classList.add('show-back')
        }

        backOfThePersonCard.addEventListener('click', () => {
            selectedPersonDiv.classList.remove('show-back')
            isCardFlipped = false
            personFullBio.style.display = 'none'
            isBioShown = false
            questionElement.innerText = 'Did you know that -'
        })

    })

})