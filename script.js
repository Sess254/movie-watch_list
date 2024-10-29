const searchBtn = document.getElementById('search-btn')
const resultsEl = document.getElementById('results-el')
const messageEl = document.getElementById('message')
const movieInput = document.getElementById('movie')
const watchListEl = document.getElementById('watchlist-el')


let watchList = []
let movieArray = []




function render() {
    watchListEl.innerHTML = getWacthList()
   
}



document.addEventListener('click', (e) => {
    if (e.target.dataset.add){
        addMovies(e.target.dataset.add)   
    } else if (e.target.dataset.remove) {
        removeMovie(e.target.dataset.remove)
    }

})

searchBtn.addEventListener('click', getMovie)


async function getMovie(){
    const movieSelection = movieInput.value
    const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=33ae5430&t=${movieSelection}`)
    const data = await res.json()

    if (data.Response === 'True'){
        resultsEl.innerHTML += `
        <div class="movies">
            <img src="${data.Poster}" alt="movie poster" class="poster">
            <div class="movie-text">
                <div class="movie-title">
                    <h2>${data.Title}</h2>
                    <i class="fa-solid fa-star"></i>
                    <p>${data.imdbRating}</p>
                </div>
                <div class="movie-details">
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <div class="watchlist" id="add-movie">
                        <i class="fa-solid fa-circle-plus" data-add="${data.imdbID}"></i>
                        <p>Watchlist</p>
                    </div>
                </div>
                <div class="movie-plot">
                    <p>${data.Plot}</p>
                </div>
            </div>
        </div>
    `
    }

    movieInput.value = ''
    movieArray.push(
        {
            poster: data.Poster,
            title: data.Title,
            rating: data.imdbRating,
            genre: data.Genre,
            plot: data.Plot,
            id: data.imdbID,
            runtime: data.Runtime,
        }
    )
    if (movieArray.length > 0) {
        messageEl.style.display = "none"
    }
    

}

function addMovies(movieId) {
    watchList = JSON.parse(localStorage.getItem('watchList'))
    const targetObj = movieArray.find(movie =>{
        return movie.id === movieId
    })

    if (!watchList.includes(targetObj)) {
        watchList.push(targetObj)
        localStorage.setItem('watchList', JSON.stringify(watchList))
        alert('Added to watchlist')
    } else {
        alert('movie already in watchlist')
    }

  
}

function getWacthList() { 
    const currentWatchList = JSON.parse(localStorage.getItem('watchList'))
    let watchListHtml = ''
    currentWatchList.forEach(movie => {
        watchListHtml += ` 
        <div class="movies">
            <img src="${movie.poster}" alt="movie poster" class="poster">
            <div class="movie-text">
                <div class="movie-title">
                    <h2>${movie.title}</h2>
                    <i class="fa-solid fa-star"></i>
                    <p>${movie.rating}</p>
                </div>
                <div class="movie-details">
                    <p>${movie.runtime}</p>
                    <p>${movie.genre}</p>
                    <div class="watchlist" id="add-movie">
                        <i class="fa-solid fa-circle-minus" data-remove="${movie.id}"></i>
                        <p>Watchlist</p>
                    </div>
                </div>
                <div class="movie-plot">
                    <p>${movie.plot}</p>
                </div>
            </div>
        </div>
       `  
    })
    return watchListHtml
   

}


function removeMovie(movieId) {
    watchList = JSON.parse(localStorage.getItem('watchList'))
    let targetObj = watchList.find(movie => movie.id === (movieId))
    if (watchList.includes(targetObj)) {
        const index = watchList.indexOf(targetObj)
        watchList.splice(index, 1)
        localStorage.setItem('watchList', JSON.stringify(watchList))
        alert('movie removed')
        render()   
    }
}
render()






