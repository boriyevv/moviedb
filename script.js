let wrapper = document.querySelector('.wrapper')
let category = document.querySelectorAll('.btn')
let title = document.querySelector('.title')



category.forEach(item=>{
    item.addEventListener('click', ()=>{
        getdata(item.dataset.key)
        title.textContent = `${(item.dataset.key).charAt(0).toUpperCase()+(item.dataset.key).slice(1)}  Movies`
    })
})


async function getdata(key='popular') {
    let data = await fetch(`https://api.themoviedb.org/3/movie/${key}?language=en-US&page=1`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjY3YjYxMzMwMzliZjNmODdiZWM1OTI5OGZlYjkxMyIsIm5iZiI6MTczMDgwNjI1NC45MDMwMjksInN1YiI6IjYzZWJjOTEyMWI3Mjk0MDBhYWI0YjI1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BbnnpRYSNj3u1bx_d8l05jt7owMaWN1XcKbWmfRwmh0'
        }
    })
    let parsedata = await data.json()
    render(parsedata.results)
}
getdata()






    function render(movies){
        wrapper.innerHTML = null

        for(let i of movies){
            // console.log(i)
            let card = document.createElement('div')
            card.setAttribute('style', 'width: 18rem;')
            card.setAttribute('class', 'card')

            card.innerHTML = `
            
                    <img src="https://media.themoviedb.org/t/p/w200${i.poster_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${i.original_title}</h5>
                        <p class="card-text">${i.overview}</p>
                        </div>
                        <a href="#" class="btn btn-primary">Go somewhere</a>


            `

            wrapper.append(card)

        }


    }

    render()

