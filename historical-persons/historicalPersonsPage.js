
import { historicalPersons, Room } from "../roomClass.js"

document.addEventListener('DOMContentLoaded', function () {

    let selectedCentury = JSON.parse(localStorage.getItem('selectedCentury'))


    let room = new Room(historicalPersons)
    room.century = selectedCentury
    let personsOfHistory = room.showCenturyPersons(room.century)

    let displayingCentury = document.querySelector('#changing-century-text')
    let changingCenturyText = ''

    if (room.century === '1600s') {
        changingCenturyText = '17th'
    }
    else if (room.century === '1700s') {
        changingCenturyText = '18th'
    }
    else if (room.century === '1800s') {
        changingCenturyText = '19th'
    }
    else if (room.century === '1900s') {
        changingCenturyText = '20th'
    }

    displayingCentury.textContent = ` ${changingCenturyText}`

    let addBtn = document.querySelector('#add-person-btn')
    let removeBtn = document.querySelector('#remove-person-btn')
    let clearBtn = document.querySelector('#clear-persons-btn')

    function updateButtonStates() {
        let activePersonName = document.querySelector('.carousel-item.active .carousel-caption h5'.textContent)
        let isPersonSelected = room.selectedPersons.some(person => person.name === activePersonName)

        addBtn.disabled = isPersonSelected || room.selectedPersons.length === personsOfHistory.length
        removeBtn.disabled = isPersonSelected
        clearBtn.disabled = room.selectedPersons.length === 0
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


    carousel.addEventListener('slide.bs.carousel', (event) => {
        let indicators = carouselIndicators.querySelectorAll('button')
        indicators.forEach(indicator => indicator.classList.remove('active'))
        indicators[event.to].classList.add('active')
        updateButtonStates()
    });

    // EVENT LISTENERS TO BUTTONS
    addBtn.addEventListener('click', () => {
        let activePersonName = document.querySelector('.carousel-item.active .carousel-caption h5').textContent
        let activePerson = personsOfHistory.find(person => person.name === activePersonName)
        room.selectPerson(activePerson)
        updateButtonStates()
    })

    removeBtn.addEventListener('click', () => {
        let activePersonName = document.querySelector('.carousel-item.active .carousel-caption h5').textContent
        let activePerson = personsOfHistory.find(person => person.name === activePersonName)
        room.removeSelectedPerson(activePerson)
        updateButtonStates()
    })

    clearBtn.addEventListener('click', () => {
        room.clearSelectedPersons()
        updateButtonStates()
    })
    updateButtonStates()

    let myCarousel = new bootstrap.Carousel(carousel)

})