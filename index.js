let drop = document.getElementById('dropdown')
var timerid
const display = () => {
  fetch('https://api.imgflip.com/get_memes')
    .then((d) => d.json())
    .then((res) => {
      showdata(res.data.memes)
    })
}
display()

const showdata = (res) => {
  const parent = document.getElementById('blw')
  res.map((el) => {
    let childs = document.createElement('div')

    let img = document.createElement('img')
    img.style.maxWidth = '100%'

    img.src = `${el.url}`

    childs.append(img)
    parent.append(childs)
  })
}

async function searchMovies(movie_name) {
  try {
    let res = await fetch(
      `http://www.omdbapi.com/?apikey=d51aa006&s=${movie_name}`,
    )
    let data = await res.json()
    return data
  } catch (e) {
    console.log('e', e)
  }
}
async function main() {
  let name = document.getElementById('searchbox').value

  if (name.length === 0) {
    drop.style.display = 'none'
  }
  if (name.length < 3) {
    return false
  }

  let res = await searchMovies(name)
  let moviesdata = res.Search
  appendMovies(moviesdata)
  console.log('res', moviesdata)
}
function debounce(func, delay) {
  // lets talk about 4
  //func =main()

  drop.style.display = 'block'

  if (timerid) {
    clearTimeout(timerid)
  }
  timerid = setTimeout(function () {
    func()
  }, delay)
}
function appendMovies(movies) {
  if (movies === undefined) {
    return false
  }
  drop.innerHTML = null
  movies.forEach(function (movie) {
    let bigdiv = document.createElement('div')
    bigdiv.setAttribute('class', 'bigdiv')
    bigdiv.addEventListener('click', function () {
      selectmovie(movie)
    })
    let div = document.createElement('div')
    div.setAttribute('class', 'dropdiv')
    let image = document.createElement('img')
    image.src = movie.Poster
    image.setAttribute('class', 'dropimage')
    div.append(image)
    let div2 = document.createElement('div')
    div2.setAttribute('class', 'rightdiv')

    let p = document.createElement('p')
    p.setAttribute('class', 'dropdownp')
    p.innerHTML = movie.Title
    div2.append(p)
    bigdiv.append(div, div2)
    drop.append(bigdiv)
  })
}
