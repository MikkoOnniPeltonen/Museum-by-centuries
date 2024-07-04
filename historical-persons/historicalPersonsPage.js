
import { historicalPersons, Room } from "../roomClass.js"

document.addEventListener('DOMContentLoaded', function () {

    let selectedCentury = '1600s'

    try {
        selectedCentury = JSON.parse(localStorage.getItem('selectedCentury')) || selectedCentury
    } catch (error) {
        console.error('Error parsing selectedCentury:', error)
    }


    let room = new Room(historicalPersons)
    room.century = selectedCentury
    let personsOfHistory = room.showCenturyPersons(room.century)

    let displayingCentury = document.querySelector('#changing-century-text')
    let changingCenturyText = ''

    let centuryNumber = parseInt(room.century);
    if (!isNaN(centuryNumber)) {
        changingCenturyText = (centuryNumber + 100).toString().slice(0, -2) + 'th';
    }

    displayingCentury.innerHTML = `<a href="../room-view/roomViewPage.html">${changingCenturyText}</a>`

    

    let notificationContainer = document.querySelector('#notification-container')
    let notificationMessage = document.querySelector('#notification-message')

    function showNotification(message) {
        notificationMessage.textContent = message
        notificationContainer.style.display = 'block'
        setTimeout(() => {
            notificationContainer.style.display = 'none'
        }, 3000)
    }

    let addBtn = document.getElementById('add-person-btn')
    let removeBtn = document.getElementById('remove-person-btn')
    let clearBtn = document.getElementById('clear-persons-btn')

    // UPDATE UI TO KNOW WHICH PERSON IS ALREADY SELECTED AND WHO IS NOT
    // ADD, REMOVE AND CLEAR BUTTONS ARE DISABLED ACCORDINGLY

    function updateUI(personName = null) {
        let activePersonName = personName || (document.querySelector('.carousel-item.active .carousel-caption h5')?.textContent || '')
        let activeSlideImage = document.querySelector(`.carousel-item img[alt="${activePersonName}"]`)

        if (activeSlideImage) {
            let activeSlide = activeSlideImage.parentElement
            let isPersonSelected = room.selectedPersons.some(person => person.name === activePersonName)

            addBtn.disabled = isPersonSelected || room.selectedPersons.length === personsOfHistory.length
            removeBtn.disabled = !isPersonSelected
            clearBtn.disabled = room.selectedPersons.length === 0

            activeSlide.classList.toggle('selected-person', isPersonSelected)
        }
    }

    let carouselIndicators = document.querySelector('.carousel-indicators')
    let carouselInner = document.querySelector('.carousel-inner')
    let carousel = document.querySelector('#carouselExampleCaptions')

    personsOfHistory.forEach((person, index) => {

        // Create carousel indicator button
        let indicatorButton = document.createElement('button')
        indicatorButton.setAttribute('type', 'button')
        indicatorButton.setAttribute('data-bs-target', '#carouselExampleCaptions')
        indicatorButton.setAttribute('data-bs-slide-to', index.toString())
        if (index === 0) {
            indicatorButton.classList.add('active')
            indicatorButton.setAttribute('aria-current', 'true')
        }
        indicatorButton.setAttribute('aria-label', `Slide ${index + 1}`)
        carouselIndicators.appendChild(indicatorButton)

        // Create carousel item
        let carouselItem = document.createElement('div')
        carouselItem.classList.add('carousel-item')
        if (index === 0) {
            carouselItem.classList.add('active')
        }

        // Create carousel image
        let imageElement = document.createElement('img')
        imageElement.src = person.image
        imageElement.classList.add('d-block', 'w-100', 'img-fluid')
        imageElement.alt = person.name
        carouselItem.appendChild(imageElement)

        // Create carousel caption
        let carouselCaption = document.createElement('div')
        carouselCaption.classList.add('carousel-caption', 'd-none', 'd-md-block')
        
        let nameElement = document.createElement('h5')
        nameElement.textContent = person.name
        carouselCaption.appendChild(nameElement)
        
        let lifespanElement = document.createElement('p')
        lifespanElement.textContent = person.lifespan
        carouselCaption.appendChild(lifespanElement)

        carouselItem.appendChild(carouselCaption)
        
        carouselInner.appendChild(carouselItem)

    })


    carousel.addEventListener('slide.bs.carousel', () => updateUI())

    // EVENT LISTENERS TO BUTTONS
    addBtn.addEventListener('click', () => { 
        let activePersonName = document.querySelector('.carousel-item.active .carousel-caption h5').textContent
        let activePerson = personsOfHistory.find(person => person.name === activePersonName)
        room.selectPerson(activePerson)
        updateUI(activePersonName)
    })

    removeBtn.addEventListener('click', () => {
        let activePersonName = document.querySelector('.carousel-item.active .carousel-caption h5').textContent
        let activePerson = personsOfHistory.find(person => person.name === activePersonName)
        room.removeSelectedPerson(activePerson)
        updateUI(activePersonName)
    })

    clearBtn.addEventListener('click', () => {
        let confirmClear = confirm('You are about to empty all selected persons, do you wish to continue?')
        if (confirmClear) {
            room.clearSelectedPersons()
            updateUI()
            showNotification('All selected persons have been cleared.')
        }
    })
    updateUI()

})