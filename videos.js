
// 1034541



const options = {method: 'GET', headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjY3YjYxMzMwMzliZjNmODdiZWM1OTI5OGZlYjkxMyIsIm5iZiI6MTczMDgwNjI1NC45MDMwMjksInN1YiI6IjYzZWJjOTEyMWI3Mjk0MDBhYWI0YjI1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BbnnpRYSNj3u1bx_d8l05jt7owMaWN1XcKbWmfRwmh0'
}};

fetch('https://api.themoviedb.org/3/movie/10872/videos?language=en-US', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));



