const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const resultsBox = document.getElementById("results-box");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNmJhZWI5YzBmNzAwMTQ0ODRmYmUiLCJpYXQiOjE2ODYyNTIwMjEsImV4cCI6MTY4NzQ2MTYyMX0.MH0qNUc8Sb7NF9AO0QagOiQJHpxn05UVS212VdiEmvk";

const nameField = document.getElementById("name-field");
const descField = document.getElementById("desc-field");
const priceField = document.getElementById("price-field");
const brandField = document.getElementById("brand-field");
const imageField = document.getElementById("image-field");
const createBtn = document.getElementById("create-btn");
const emptyFields = document.getElementById("empty-fields");
//console.log(createButton);

//window.onload = getPosts();

async function getPosts() {
  resultsBox.innerHTML = "";
  const res = await fetch("https://striveschool-api.herokuapp.com/api/product/");
  const json = await res.json();

  json.forEach((element) => {
    createPostTemplate(element);
  });
}

async function getproduct() {
  let request = await fetch(apiUrl,
      {
          method: 'GET',
          headers: { 'Authorization': token, 'Content-Type': 'application/json' },

      });
  let data = await request.json();
  console.log(data);

  data.forEach(element => {
      createPostTemplate(element);
  });

}

async function insertproduct() {
  let request = await fetch(apiUrl,
      {
          method: 'POST',
          headers: { 'Authorization': token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ "name": nameField.value, "description": descField.value, "brand": brandField.value, "imageUrl": imageField.value, "price": priceField.value })
      });
  let data = await request.json();
  console.log(data);

  createPostTemplate(data)
}

function createPostTemplate(element) {

  const prod = document.createElement("div");
    card.classList.add("card", "m-1");
    card.style.width = "13rem";
    const img = document.createElement("img");
    img.classList.add("img-fluid");
    img.src = element.imageUrl;
    card.appendChild(img);

    const myName = document.createElement("p");
    myName.textContent = element.name;
    card.appendChild(myName);

    const myDesc = document.createElement("p");
    myDesc.textContent = element.description;
     card.appendChild(myDesc)
    const myBrand = document.createElement("p");
    myBrand.textContent = element.brand;
     card.appendChild(myBrand);
    const myPrice = document.createElement("p");
    myPrice.textContent = element.price;
    card.appendChild(myPrice);


  resultsBox.appendChild(card);
}


createBtn.addEventListener("click", () => {
  insertproduct()
});
