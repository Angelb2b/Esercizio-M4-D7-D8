const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const resultsBox = document.getElementById("results-box");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNmJhZWI5YzBmNzAwMTQ0ODRmYmUiLCJpYXQiOjE2ODYzMzM0MjMsImV4cCI6MTY4NzU0MzAyM30.azbIbXekhCdjcetL_9PCfeXb_hWzxN3j2dilNTaOWYM";

const nameField = document.getElementById("name-field");
const descField = document.getElementById("desc-field");
const priceField = document.getElementById("price-field");
const brandField = document.getElementById("brand-field");
const imageField = document.getElementById("image-field");

const nameFieldEdit = document.getElementById("name-fieldEdit");
const descFieldEdit = document.getElementById("desc-fieldEdit");
const priceFieldEdit = document.getElementById("price-fieldEdit");
const brandFieldEdit = document.getElementById("brand-fieldEdit");
const imageFieldEdit = document.getElementById("image-fieldEdit");

const createBtn = document.getElementById("create-btn");
const emptyFields = document.getElementById("empty-fields");
const updateButton = document.getElementById("update-btn");
const modal = document.getElementById("modifyModale");

async function getproduct() {
  let request = await fetch(apiUrl,
    {
      //method: 'GET',
      headers: { "Authorization": token }

    })
  let data = await request.json();
  
  data.forEach(element => {
    createPostTemplate(element);
  });
  console.log(data);
}
//funzione per eliminare i post (questa è stata creataper eliminare tutti gli elelemnti dalla mia api)
async function deletePost(input) {
  let del = await fetch(apiUrl + input._id,
    {
      headers: { "Authorization": token },
      method: 'DELETE'
    });
  console.log("eliminato");
  resultsBox.innerHTML = "";
getproduct();

}

getproduct();

async function insertproduct() {
  // Controlla se ci sono campi vuoti
  if (
    nameField.value === "" ||
    descField.value === "" ||
    brandField.value === "" ||
    imageField.value === "" ||
    priceField.value === ""
  ) {
    emptyFields.innerText = "Please fill in all fields";
    return;
  }

  // Tutti i campi sono stati compilati, procedi con la creazione del post
  const payload = {
    name: nameField.value,
    description: descField.value,
    brand: brandField.value,
    imageUrl: imageField.value,
    price: priceField.value
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Il post è stato creato con successo
      const newPost = await response.json();
      createPostTemplate(newPost);

      // Resetta i campi del modulo dopo la creazione del post
      nameField.value = "";
      descField.value = "";
      brandField.value = "";
      imageField.value = "";
      priceField.value = "";
      emptyFields.innerText = ""; // Rimuovi eventuali messaggi di avviso precedenti
    } else {
      // La creazione del post ha restituito un errore
      console.error("Error creating post:", response.status);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

//funzione che crea le card
function createPostTemplate(element) {
  const prod = document.createElement("div");
  prod.classList.add("card", "m-2", "text-center");
  prod.style.width = "13rem";
  const img = document.createElement("img");
  img.classList.add("img-fluid", "mt-3", "h-50");
  img.src = element.imageUrl;
  prod.appendChild(img);

  const myName = document.createElement("h5");
  myName.innerText = element.name;
  prod.appendChild(myName);

  const myDesc = document.createElement("span");
  myDesc.innerText = element.description;
  prod.appendChild(myDesc)

  const myBrand = document.createElement("span");
  myBrand.innerText = element.brand;
  prod.appendChild(myBrand);

  const myPrice = document.createElement("p");
  myPrice.innerText = element.price;
  myPrice.innerText = "Price: € " + element.price;
  prod.appendChild(myPrice);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm", "mb-2")
  deleteButton.addEventListener("click", function () {
    deletePost(element);
  });
  prod.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("btn", "btn-outline-info", "btn-sm", "mb-2")
  editButton.addEventListener("click", function () {
    modal.classList.remove("d-none");
    updateApi(element);
  });
  prod.appendChild(editButton);

  const detailsButton = document.createElement("button");
  detailsButton.innerText = "Dettagli";
  detailsButton.classList.add("btn", "btn-outline-secondary", "btn-sm", "mb-3");
  detailsButton.setAttribute("data-bs-toggle", "modal");
  detailsButton.setAttribute("data-bs-target", "#productModal");
  detailsButton.addEventListener("click", function () {
    showProductDetails(element);
  });
  prod.appendChild(detailsButton);

  resultsBox.appendChild(prod);
}

//funzione di modifica dei post
async function updateApi(input) {
  nameFieldEdit.value = input.name;
  descFieldEdit.value = input.description;
  brandFieldEdit.value = input.brand;
  priceFieldEdit.value = input.price;
  imageFieldEdit.value = input.imageUrl;

  updateButton.addEventListener("click", async (event) => {
    const newPayload = {
      name: nameFieldEdit.value,
      description: descFieldEdit.value,
      brand: brandFieldEdit.value,
      price: priceFieldEdit.value,
      image: imageFieldEdit.value,
    };

    try {
      const response = await fetch(apiUrl + input._id, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPayload),
      });

      if (response.ok) {
        console.log("Post updated successfully");
        location.reload(); // Ricarica la pagina
      } else {
        console.error("Error updating post:", response.status);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  });
}

//funzione per vedere i dettagli del prodotto
function showProductDetails(product) {
  const productDetailsContainer = document.getElementById("productDetails");
  productDetailsContainer.innerHTML = ""; // Svuota il contenuto precedente

  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetailsContainer.appendChild(productName);

  const productDescription = document.createElement("p");
  productDescription.innerText = product.description;
  productDetailsContainer.appendChild(productDescription);

  const productBrand = document.createElement("p");
  productBrand.innerText = "Brand: " + product.brand;
  productDetailsContainer.appendChild(productBrand);

  const productPrice = document.createElement("p");
  productPrice.innerText = "Price: €" + product.price;
  productDetailsContainer.appendChild(productPrice);

  const productImage = document.createElement("img");
  productImage.classList.add("img-fluid", "mt-3");
  productImage.src = product.imageUrl;
  productDetailsContainer.appendChild(productImage);
}


//pulsante che attiva la creazione delle card
createBtn.addEventListener("click", (event) => {
  insertproduct();
});
