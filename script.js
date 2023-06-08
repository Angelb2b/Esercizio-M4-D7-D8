const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const resultsBox = document.getElementById("results-box");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNmJhZWI5YzBmNzAwMTQ0ODRmYmUiLCJpYXQiOjE2ODYwNzYyNTksImV4cCI6MTY4NzI4NTg1OX0.ympTdD31SOKcNk2OZXGVBnkWVUSnthkcZFujeEWjU-g";

const nameField = document.getElementById("name-field");
const descField = document.getElementById("desc-field");
const priceField = document.getElementById("price-field");
const brandField = document.getElementById("brand-field");
const imageField = document.getElementById("image-field");
const createBtn = document.getElementById("create-btn");
const emptyFields = document.getElementById("empty-fields");

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

  nameField.value = "";
    descField.value = "";
    priceField.value = "";
    brandField.value = "";
    imageField.value = "";
    }

// async function addNewPost() {
//   if (nameField.value && descField.value && priceField.value && brandField.value && imageField.value) {
//     const payload = {
//       "name": nameField.value,
//       "description": descField.value,
//       "price": priceField.value,
//       "brand": brandField.value,
//       "img": imageField.value,
//     };

//     await fetch(apiUrl,
//       {
//         method: 'POST',
//         headers: { 'Authorization': token, 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//     getPosts();

//     nameField.value = "";
//     descField.value = "";
//     priceField.value = "";
//     brandField.value = "";
//     imageField.value = "";
//   } else {
//     emptyFields.classList.toggle("d-none");
//     setTimeout(() => {
//       emptyFields.classList.toggle("d-none");
//     }, 5000);
//   }
// }

function createPostTemplate(element) {

    const card = document.createElement("card");
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

  }


// function createPostTemplate(element) {

//   const card = document.createElement("div");
//   card.classList.add("card", "m-1");
//   card.style.width = "13rem";
//   const img = document.createElement("img");
//   img.classList.add("img-fluid");
//   img.src = element.imageUrl;
//   card.appendChild(img);

//   const myName = document.createElement("h5");
//   myName.innerText = element.name;
//   const myDesc = document.createElement("p");
//   myDesc.innerText = element.description;
//   const myBrand = document.createElement("span");
//   myBrand.innerText = element.brand;
//   const myPrice = document.createElement("span");
//   myPrice.innerText = element.price;
//   // const myBtns = document.createElement("div");
  
//   // const editBtn = document.createElement("button");
//   // editBtn.classList.add("btn", "btn-sm", "mx-1", "btn-primary");
//   // const editImg = document.createElement("i");
//   // editImg.classList.add("fa-solid", "fa-pencil", "me-1");
//   // const editTxt = document.createElement("span");
//   // editTxt.innerText = "Edit";
//   // card.appendChild(editImg, editTxt);
  
//   // const delBtn = document.createElement("button");
//   // delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-danger");
//   const delImg = document.createElement("i");
//   delImg.classList.add("fa-solid", "fa-trash", "me-1");
//   const delTxt = document.createElement("span");
//   delTxt.innerText = "Delete";
//   card.appendChild(delImg, delTxt);

//   // card.appendChild(editBtn, delBtn);

//   card.appendChild(myName, myDesc, myPrice, myBrand); //myBtns
//   resultsBox.appendChild(card);
// }

createBtn.addEventListener("click", () => {
  insertproduct()
});



// function getProduct (element) {

// let card = document.createElement("div");
// card.classList.add("card", "m-1");
// card.style.width = "13rem";
// let img = document.createElement("img");

// img.src = element.imageUrl;
// let cardBody = document.createElement("div");
// let cardName = document.createElement("h5");
// cardName.innerText = element.name;
// let cardDescription = document.createElement("p");
// cardDescription.innerText = element. description;
// let priceBox= document.createElement("div");
// let cardPrice = document.createElement("span");
// cardPrice.innerText = element.price;
// let price$ = document.createElement("span");
// price$.innerText = "$ ";
// let brand = document.createElement("p");
// brand.innerText = element.brand;
// let cardButton = document.createElement("button");
// cardButton.classList.add("btn", "btn-primary");
// cardButton. innerText = "Add to cart",
// priceBox.appendChild(price$, cardPrice);
// cardBody.appendChild(cardName, cardDescription, priceBox, brand, cardButton);
// card.appendChild(img, cardBody);
// produit.appendChild(card);



// }