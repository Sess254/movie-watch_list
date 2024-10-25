const searchBtn = document.getElementById('search-btn')
const resultsEl = document.getElementById('results-el')
const messageEl = document.getElementById('message-el')
const movieInput = document.getElementById('movie')


searchBtn.addEventListener('click', getMovie)




async function getMovie() {
    const movieSelection = movieInput.value
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=33ae5430&t=${movieSelection}`)
    const data = await res.json()
    console.log(data)

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
                            <i class="fa-solid fa-circle-plus"></i>
                            <p>watchlist</p>
                        </div>
                    </div>
                    <div class="movie-plot">
                        <p>${data.Plot}</p>
                    </div>
                </div>
            </div>
    `
}