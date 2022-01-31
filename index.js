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
