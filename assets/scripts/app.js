const addMovieModalBtn = document.querySelector('#add-modal')
const startAddMovieBtn = document.querySelector('header button')
const backDropBtn = document.getElementById('backdrop')
const cancelAddMovieBtn = document.querySelector('#cancel-button')
const confirmAddMovieBtn = document.querySelector('#confirm-button')
const userInputs = addMovieModalBtn.querySelectorAll('input')
const entryTextSection = document.getElementById('entry-text')
const listRoot = document.getElementById('movie-list')
const deleteMovieModal = document.getElementById('delete-modal')
const cancelDeletionBtn = document.querySelector('#cancel-deletion-button')
let cancelConfirmBtn = document.querySelector('#confirm-deletion-button')

const movies = []

const UpdateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
}

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0
    for (const movie of movies) {
        if (movie.id === movieId) {
            break
        }
        movieIndex++
    }
    movies.splice(movieIndex, 1)
    listRoot.children[movieIndex].remove()
    cancelMovieDeletion()
    UpdateUI()
}

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible')
    toggleBackDrop()

    cancelConfirmBtn.replaceWith(cancelConfirmBtn.cloneNode(true))
    cancelConfirmBtn = document.querySelector('#confirm-deletion-button')

    cancelDeletionBtn.addEventListener('click', cancelMovieDeletion)
    cancelConfirmBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId))
}

const cancelMovieDeletion = () => {
    toggleBackDrop()
    deleteMovieModal.classList.remove('visible')
}

const renderNewMovieElement = (id, title, imageURL, rating) => {
    const newMovieElement = document.createElement('li')
    newMovieElement.className = 'movie-element'
    newMovieElement.innerHTML = `
    <div class = "movie-element__image">
      <img src = "${imageURL}" alt="${title}">
    </div>
    <div class = "movie-element__info">
      <h2>${title}</h2>
      <p class= "rating">${rating}/<img class="star" src="assets/images/star.png"></p>
    </div>
    `
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id))
    listRoot.append(newMovieElement)
}

const closeMovieModal = () => {
    addMovieModalBtn.classList.remove('visible')
}

const showMovieModal = () => {
    addMovieModalBtn.classList.add('visible')
    toggleBackDrop()
}

const clearMovieInputs = () => {
    for (const userInput of userInputs) {
        userInput.value = ''
    }
}

const toggleBackDrop = () => {
    backDropBtn.classList.toggle('visible');
}

const backDropClickHandler = () => {
    closeMovieModal()
    cancelMovieDeletion()
    clearMovieInputs()
}

const addMovieHandler = () => {
    const tittleValue = userInputs[0].value
    const imageValue = userInputs[1].value
    const ratingValue = userInputs[2].value

    if (tittleValue.trim() === '') {
        alert('Please enter a Movie')
        return
    } else if (imageValue.trim() === '') {
        alert('Please enter an Image')
        return
    } else if (ratingValue.trim() === '' || +ratingValue < 0.5 || +ratingValue > 5) {
        alert('Please enter valid Rating values between 1 and 5.')
        return
    }
    const newMovie = {
        id: `${tittleValue}`,
        title: tittleValue,
        image: imageValue,
        rating: ratingValue
    }

    movies.push(newMovie)
    console.log(movies)
    closeMovieModal()
    toggleBackDrop()
    clearMovieInputs()
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating)
    UpdateUI()
}

const cancelAddMovieHandler = () => {
    closeMovieModal()
    clearMovieInputs()
    toggleBackDrop()

}

startAddMovieBtn.addEventListener('click', showMovieModal)
backDropBtn.addEventListener('click', backDropClickHandler)
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler)
confirmAddMovieBtn.addEventListener('click', addMovieHandler)
