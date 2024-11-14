let wrapper = document.querySelector('.wrapper')
let category = document.querySelectorAll('.btn')
let title = document.querySelector('.title')
let inp = document.querySelector('.inp')
let modalList = document.querySelector('.modal-list')
let form = document.querySelector('.form')
let select = form.select

let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
let prevText = document.querySelector('.prev-text')
let text = document.querySelector('.text')
let nextText = document.querySelector('.next-text')

let count = 1
let categoryData = ''

category.forEach(item => {
    item.addEventListener('click', () => {
        getdata(item.dataset.key)
        title.textContent = `${(item.dataset.key).charAt(0).toUpperCase() + (item.dataset.key).slice(1)}  Movies`
    })
})


async function getdata(key = 'upcoming', page=1) {

    categoryData=key

    let data = await fetch(`https://api.themoviedb.org/3/movie/${key}?language=en-US&page=${page}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjY3YjYxMzMwMzliZjNmODdiZWM1OTI5OGZlYjkxMyIsIm5iZiI6MTczMDgwNjI1NC45MDMwMjksInN1YiI6IjYzZWJjOTEyMWI3Mjk0MDBhYWI0YjI1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BbnnpRYSNj3u1bx_d8l05jt7owMaWN1XcKbWmfRwmh0'
        }
    })
    let parsedata = await data.json()
    render(parsedata.results)

    inp.addEventListener('input', () => {

        let filtered = parsedata.results.filter(movie => movie.original_title.toLowerCase().includes(inp.value.toLowerCase()))
        console.log(filtered)
        render(filtered)
    })

    let sorted = []
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (select.value == 'kop') {
            sorted = parsedata.results.sort((a, b) => b.popularity - a.popularity)
            // console.log(sorted)
        }

        else if (select.value == 'baho') {
            sorted = parsedata.results.sort((a, b) => b.vote_average - a.vote_average)
            // console.log(sorted)
        }

        else if (select.value == 'yangi') {
            sorted = parsedata.results.sort((a, b) => parseInt(b.release_date.slice(0, 4)) - parseInt(a.release_date.slice(0, 4)))
            // console.log(sorted)
        }
        else if (select.value == 'yangi') {
            sorted = parsedata.results.sort((a, b) => parseInt(a.release_date.slice(0, 4)) - parseInt(b.release_date.slice(0, 4)))
            // console.log(sorted)

        }
        render(sorted)
        console.log(sorted)


    })


}
getdata()



let favouriteMovies = []


function render(movies) {
    wrapper.innerHTML = null

    for (let i = 0; i < movies.length; i++) {
        // console.log(movies[i])
        let card = document.createElement('div')
        card.setAttribute('style', 'width: 18rem;')
        card.setAttribute('class', 'card')

        card.innerHTML = `
            
                    <img src="https://media.themoviedb.org/t/p/w200${movies[i].poster_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${movies[i].original_title}</h5>
                        <p class="card-text">${movies[i].overview}</p>
                        </div>
                        <span class="d-flex gap-2 p-2">
                            <a href="#" class="btn btn-primary w-50"><i class="fa-solid fa-play"></i>
                            Watch Movie</a>
                            <button onclick="addLikes('${movies[i].original_title}')" class="btn btn-danger  w-50"><i class="fa-solid fa-heart text-light"></i> Add to favourites</button>
                        </span>


            `

        wrapper.append(card)

    }


}

// render()



function addLikes(arr) {
    console.log(arr)

    favouriteMovies.push(arr)

    localStorage.setItem('movies', JSON.stringify(favouriteMovies))

    localRender()
}

function localRender() {
    let localMovies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []

    modalList.innerHTML = null

    for (i of localMovies) {
        console.log(i)
        let li = document.createElement('li')

        li.textContent = i

        modalList.append(i)
    }

}


next.addEventListener('click', () => {
    count += 1
    getdata(categoryData, count)
    updateText()

})

function updateText(){

    text.textContent = count
    prevText.textContent =(count-1)
    nextText.textContent = (count+1)

}

prev.addEventListener('click', () => {
    if(count > 1){
        count -=1
        getdata(categoryData, count)
    }
    updateText()
})







