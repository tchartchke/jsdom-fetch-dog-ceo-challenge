const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const breeds = []

document.addEventListener("DOMContentLoaded", function() {
  fetchURL(imgUrl, renderImages);
  fetchURL(breedUrl, renderAllBreeds)
  
  colorOnClick()

  const select = document.querySelector("select#breed-dropdown")
  select.addEventListener("change", function() {
    filtered = filteredBreeds(select.value)
    renderBreeds(filtered)
  })

}); 

function fetchURL(url, func) {
  return fetch(url)
  .then(resp => resp.json())
  .then(json => func(json["message"])); 
}

function renderImages(obj){
  const div = document.querySelector("#dog-image-container")
  obj.forEach(dog => {
    const img = document.createElement('img');
    img.setAttribute("src", dog)
    img.setAttribute("width", "25%")
    div.appendChild(img)
  })
}

function renderAllBreeds(obj) {
  listOfBreeds(obj)
  renderBreeds(breeds)
  createDropDown()
}

function listOfBreeds(obj){
  const allBreeds = obj;
  for (const type in allBreeds) {
    if (allBreeds[type].length > 0) {
      for (const breed of allBreeds[type]) {
        breeds.push(`${breed} ${type}`)
      }
    } else {
      breeds.push(type)
    }
  }
}

function renderBreeds(breeds){
  const ul = document.querySelector("#dog-breeds");
  ul.innerHTML = ""
  for (const type of breeds) {
    const li = document.createElement("li")
    li.innerText = type
    ul.appendChild(li)
  }
}

function colorOnClick(){
  const ul = document.querySelector("#dog-breeds");
  ul.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI"){
      const li = e.target;
      li.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    }
  })
}

function createDropDown(){
  const select = document.querySelector("#breed-dropdown");
  const options = getOptions();
  for (const letter of options) {
    op = document.createElement("option")
    op.value = letter;
    op.innerHTML = letter;
    select.appendChild(op)
  }
}

function getOptions(){
  const options = [];
  const lis = document.querySelectorAll("ul li")
  for (const breed of lis) {
    if (!options.includes(breed.innerHTML.charAt(0))){
      options.push(breed.innerHTML.charAt(0))
    }
  }
  return options.sort();
}

function filteredBreeds(letter){
  if (letter === '-') {
    return breeds
  }
  return breeds.filter(breed => breed.charAt(0) === letter)
}