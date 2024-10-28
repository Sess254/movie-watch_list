const searchBtn = document.getElementById('search-btn')
const resultsEl = document.getElementById('results-el')
const messageEl = document.getElementById('message-el')
const movieInput = document.getElementById('movie')

let watchList = []
let movieArray = []


searchBtn.addEventListener('click', getMovie)

document.addEventListener('click', (e) => {
    if (e.target.dataset.add){
        addMovies(e.target.dataset.add)
    }

})




async function getMovie(){
    const movieSelection = movieInput.value
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=33ae5430&t=${movieSelection}`)
    const data = await res.json()
    // console.log(data)

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
    console.log(movieArray)

}

function addMovies(movieId) {
    const targetObj = movieArray.find(movie =>{
        return movie.id === movieId
    })

    if (!watchList.includes(targetObj)) {
        watchList.push(targetObj)
        localStorage.setItem('watchList', JSON.stringify(watchList))
        alert('Added to watchlist')
        console.log(watchList)
    } else {
        alert('movie already in watchlist')
    }
}
