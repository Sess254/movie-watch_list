const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const resultsEl = document.getElementById('results-el')
const watchlistEl = document.getElementById('watchlist-el')

// let watchList = []

   

document.addEventListener('click', e => {
    if (e.target.dataset.add){
        addFilmTowatchlist(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeFromWatchlist(e.target.dataset.remove)
    }
})

async function searchForFilm(){
    const userInput = searchInput.value
    const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=33ae5430&t=${userInput}`)
    const data = await res.json()
    console.log(data)

    let resultHtml = ''
    
    if (data.Response === "True") {
        resultHtml += `
             <div class="container movie">
                <div class="film-container">
                    <img src="${data.Poster}" alt="movie poster" class="poster">
                    <div class="row">
                        <div class="movie-title-rating movie-container">
                            <h2 class="movie-title">${data.Title}</h2>
                            <i class="fa-solid fa-star"></i>
                            <p class="rating">${data.imdbRating}</p>
                        </div>
                        <div class="movie-details movie-container">
                            <p>${data.Runtime} </p>
                            <p>${data.Genre}</p>
                            <div class="watchlist-btn">
                                <i class="fa-solid fa-circle-plus" data-add="${data.Title}"></i>
                                <p>watchlist</p>
                            </div>
                        </div>
                        <p class="plot">${data.Plot}</p>
                    
                    </div>
                </div>
            </div>
        
        `
    } else {
        alert(`movie not found,search for a new one`)
    }

    resultsEl.innerHTML += resultHtml
    clearInputField()

}

searchBtn.addEventListener('click', searchForFilm) 

function addFilmTowatchlist(filmTitle) {
    const watchList = JSON.parse(localStorage.getItem('watchList')) || []
    if (!watchList.includes(filmTitle)){
        watchList.push(filmTitle)
        localStorage.setItem('watchList', JSON.stringify(watchList))
        alert('Movie added to wathlist')

    } else {
        alert(`Movie already in watchlist`)
    }
    
}

function loadWatchlist() {
    const watchList = JSON.parse(localStorage.getItem('watchList'))

    watchlistEl.innerHTML = ''

    watchList.forEach(filmTitle =>{
        fetchFilmData(filmTitle)
            .then(filmData => {
                let watchListHtml = `
             <div class="container movie">
                <div class="film-container">
                    <img src="${filmData.Poster}" alt="movie poster" class="poster">
                    <div class="row">
                        <div class="movie-title-rating movie-container">
                            <h2 class="movie-title">${filmData.Title}</h2>
                            <i class="fa-solid fa-star"></i>
                            <p class="rating">${filmData.imdbRating}</p>
                        </div>
                        <div class="movie-details movie-container">
                            <p>${filmData.Runtime} </p>
                            <p>${filmData.Genre}</p>
                            <div class="watchlist-btn">
                                <i class="fa-solid fa-circle-minus" data-remove="${filmData.Title}"></i>
                                <p>watchlist</p>
                            </div>
                        </div>
                        <p class="plot">${filmData.Plot}</p>
                    
                    </div>
                </div>
            </div>

            `
            watchlistEl.innerHTML += watchListHtml
        })
        

    })
    
}

loadWatchlist()

async function fetchFilmData(filmTitle) {
    const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=33ae5430&t=${filmTitle}`)
    const data = await res.json()
    return data
}

function removeFromWatchlist(filmTitle) {
    const watchList = JSON.parse(localStorage.getItem('watchList'))

    const updatedWatchlist = watchList.filter(title => title != filmTitle)
    localStorage.setItem('watchList', JSON.stringify(updatedWatchlist))

    loadWatchlist()


}

function clearInputField() {
    searchInput.value = ''

}