


// FUNCTIONALITY FOR THE APPEARING AND DISAPPEARING BUTTONS IN ROOMS

let museumRooms = document.querySelectorAll('.museum-room')


museumRooms.forEach(room => {
    let roomButtonsDiv = room.querySelector('.button-container')
    let selectPersonButton = roomButtonsDiv.querySelector('.select-person')
    let viewRoomButton = roomButtonsDiv.querySelector('.view-room')

    let timeOutId
    let isActive = false

    let handleMouseEnter = () => {
        clearTimeout(timeOutId)
        roomButtonsDiv.classList.add('active')
    }

    let handleMouseLeave = () => {
        timeOutId = setTimeout(() => {
            roomButtonsDiv.classList.remove('active')
            isActive = false
        }, 2000)
    }

    room.addEventListener('click', () => {
        isActive = true
        roomButtonsDiv.classList.add('active')

        room.addEventListener('mouseenter', handleMouseEnter)
        room.addEventListener('mouseleave', handleMouseLeave)
    })

    selectPersonButton.addEventListener('click', () => {
        let century = room.querySelector('.hover-text').innerText
        localStorage.setItem('selectedCentury', JSON.stringify(century))
        window.location.href = `./historical-persons/historicalPersonsPage.html`
    })

    viewRoomButton.addEventListener('click', () => {
        let century = room.querySelector('.hover-text').innerText
        localStorage.setItem('selectedCentury', JSON.stringify(century))
        window.location.href = `./room-view/roomViewPage.html`
    })
})