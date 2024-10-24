const searchBtn = document.getElementById('search-btn')

searchBtn.addEventListener('click', getMovie)




async function getMovie() {
    const res = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=33ae5430&t=blade runner 2049")
    const data = await res.json()
    console.log(data)


}