
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
    
    if (personsOfTheCentury.length === 0) {

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

        let personDetailsAsBio = document.createElement('div')
        personDetailsAsBio.className = 'person-details'

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

        personDetailsAsBio.appendChild(personFullBio)

        personOverlayFront.appendChild(personInfoDiv)

        personFrontBodyDiv.appendChild(pictureElementFront)
        personFrontBodyDiv.appendChild(personOverlayFront)

        personNotableWork.appendChild(notableWorkImageBack)
        personNotableWork.appendChild(notableWorkDescription)
        backOfThePersonCard.appendChild(personNotableWork)

        selectedPersonDiv.appendChild(personFrontBodyDiv)
        selectedPersonDiv.appendChild(backOfThePersonCard)
        selectedPersonDiv.appendChild(personDetailsAsBio)

        personsOnDisplay.appendChild(selectedPersonDiv)

        // ADDING EVENTS TO THE PERSON CARDS


        let isBioFullyShown = false
        let isCardFlipped = false
        let resetBioTimeout

        questionElement.addEventListener('mouseenter', () => {
            personDetailsAsBio.classList.add('show-full-bio')
            fadeOutInfoDiv()

        })

        selectedPersonDiv.addEventListener('mouseenter', () => {
            if (!isBioFullyShown) {
                personFullBio.style.animationPlayState = 'running'

                clearTimeout(resetBioTimeout)
            }
        })

        selectedPersonDiv.addEventListener('mouseleave', () => {
            if(!isBioFullyShown) {
                personFullBio.style.animationPlayState = 'paused'

                resetBioTimeout = setTimeout(() => {
                    resetBio()
                }, 5000)
            }
        })

        personFullBio.addEventListener('animationend', () => {
            isBioFullyShown = true
            if (!isCardFlipped) {
                addClickHandler()
            }
        })

        selectedPersonDiv.addEventListener('mouseleave', () => {
            if (!isBioFullyShown || !isCardFlipped) {
                resetBio()
                if (isCardFlipped) {
                    selectedPersonDiv.classList.remove('show-back')
                    isCardFlipped = false
                }
            }

        })

        function addClickHandler() {

            setTimeout(() => {
                selectedPersonDiv.addEventListener('click', handleCardClick, { once: true })
                selectedPersonDiv.classList.add('click-indicator')
            }, 500)
        }

        function handleCardClick() {
            isCardFlipped = true
            selectedPersonDiv.classList.add('show-back')
        }

        function resetBio() {
            personDetailsAsBio.classList.remove('show-full-bio')
            personFullBio.style.animation = ''
            personFullBio.getBoundingClientRect()
            personFullBio.style.animation = null
            isBioFullyShown = false
            selectedPersonDiv.classList.remove('click-indicator')
        }

        function fadeOutInfoDiv() {

            let bioRect = personFullBio.getBoundingClientRect()
            let infoRect = personInfoDiv.getBoundingClientRect()

            if (bioRect.top < infoRect.bottom) {
                let overlap = bioRect.bottom - infoRect.top
                let infoHeight = infoRect.height
                
                let percentage = (overlap / infoHeight) * 100
                personInfoDiv.style.clipPath = `inset(${percentage}% 0 0 0)`
            }
        }

        backOfThePersonCard.addEventListener('click', () => {
            selectedPersonDiv.classList.remove('show-back')
            isCardFlipped = false
        })

    })

})