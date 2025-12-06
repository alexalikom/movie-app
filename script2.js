const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0dcb635f298462b44dc4b8c0b5d64672&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=0dcb635f298462b44dc4b8c0b5d64672&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = '' // Corrected from innerHtml to innerHTML

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, id } = movie // Corrected to use poster_path

        // Limit the rating to a maximum of 9
        const limitedVote = Math.min(vote_average, 9);

        const movieEl = document.createElement('div') // Corrected from document-createElement to document.createElement
        movieEl.classList.add('movie')

        movieEl.innerHTML = ` 
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(limitedVote)}">${limitedVote}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <a href="https://www.themoviedb.org/movie/${id}" target="_blank">Click here to read more</a>
            </div>     
        `

        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
