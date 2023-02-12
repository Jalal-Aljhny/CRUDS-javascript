let mainTitle = document.querySelector("header h1");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let result = document.getElementsByTagName("small")[0];
let create = document.getElementById("create");
let title = document.getElementById("title");
let category = document.getElementById("category");
let count = document.getElementById("count");
let deleteAllBtn = document.getElementById("delete-all");
let search = document.getElementById("search");
let titleSearch = document.getElementById("search-title");
let categorySearch = document.getElementById("search-category");
let productArray;
let mood = "create";
let temp;

//animation to h1
mainTitle.innerHTML = swip(mainTitle.textContent);
function swip(t) {
  return [...t].map((letter) => `<span>${letter}</span>`).join("");
}

//empty all input
let allInputs = Array.from(document.getElementsByTagName("input"));

function clearInputs() {
  allInputs.forEach((input) => {
    input.value = "";
  });
  result.innerHTML = "";
}
clearInputs();

//count
[price, taxes, ads, discount].forEach((el) => {
  el.addEventListener("input", sumCount);
});
function sumCount() {
  if (price.value !== "") {
    let sum = +price.value + +taxes.value + +ads.value - +discount.value;
    result.textContent = sum;
    result.style.backgroundColor = "#1e8f7a";
  } else {
    result.style.backgroundColor = "#bf0603";
    result.textContent = "";
  }
}

//create product

if (window.localStorage.getItem("product") != null) {
  productArray = JSON.parse(window.localStorage.getItem("product"));
} else {
  productArray = [];
}

create.addEventListener("click", createproduct);
function createproduct() {
  let product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: result.textContent,
    count: count.value,
    category: category.value,
  };
  if (title.value != "") {
    if (mood == "create") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          productArray.push(product);
        }
      } else {
        productArray.push(product);
      }
    } else {
      productArray[temp] = product;
      mood = "create";
      create.textContent = "Create";
      count.style.display = "block";
      clearInputs();
    }
    sumCount();
  }
  window.localStorage.setItem("product", JSON.stringify(productArray));
  readProduct();
}

//read data
function readProduct() {
  let product = "";
  for (let i = 0; i < productArray.length; i++) {
    product += `
    <tr>
    <td>${i}</td>
    <td>${productArray[i].title}</td>
    <td>${productArray[i].price}</td>
    <td>${productArray[i].taxes}</td>
    <td>${productArray[i].ads}</td>
    <td>${productArray[i].discount}</td>
    <td>${productArray[i].total}</td>
    <td>${productArray[i].category}</td>
    <td id="update" onclick = "update(${i})" >update</td>
    <td id="delete" onclick = "deleteProduct(${i})">delete</td>
  </tr>  
    `;
  }
  document.getElementsByTagName("tbody")[0].innerHTML = product;
  if (productArray.length > 0) {
    deleteAllBtn.style.display = "block";
    deleteAllBtn.innerHTML = `Delete All (${productArray.length})`;
  } else {
    deleteAllBtn.style.display = "none";
  }
}
readProduct();

//delete button
function deleteProduct(productIndex) {
  productArray.splice(productIndex, 1);
  window.localStorage.setItem("product", JSON.stringify(productArray));
  readProduct();
}

//delete all
function deleteAll() {
  productArray.splice(0, productArray.length);
  window.localStorage.removeItem("product");
  readProduct();
}
deleteAllBtn.addEventListener("click", deleteAll);

//update product
function update(productIndex) {
  title.value = productArray[productIndex].title;
  price.value = productArray[productIndex].price;
  taxes.value = productArray[productIndex].taxes;
  ads.value = productArray[productIndex].ads;
  discount.value = productArray[productIndex].discount;
  count.style.display = "none";
  mood = "update";
  create.textContent = "Update";
  temp = productIndex;
  sumCount();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//search
titleSearch.addEventListener("click", searchByTitle);
function searchByTitle() {
  let table = "";
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].title.includes(search.value)) {
      table += `<tr>
      <td>${i}</td>
      <td>${productArray[i].title}</td>
      <td>${productArray[i].price}</td>
      <td>${productArray[i].taxes}</td>
      <td>${productArray[i].ads}</td>
      <td>${productArray[i].discount}</td>
      <td>${productArray[i].total}</td>
      <td>${productArray[i].category}</td>
      <td id="update" onclick = "update(${i})" >update</td>
      <td id="delete" onclick = "deleteProduct(${i})">delete</td>
    </tr>`;
    }
  }
  document.getElementsByTagName("tbody")[0].innerHTML = table;
}
categorySearch.addEventListener("click", searchByCategory);
function searchByCategory() {
  let table = "";
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].category.includes(search.value)) {
      table += `<tr>
      <td>${i}</td>
      <td>${productArray[i].title}</td>
      <td>${productArray[i].price}</td>
      <td>${productArray[i].taxes}</td>
      <td>${productArray[i].ads}</td>
      <td>${productArray[i].discount}</td>
      <td>${productArray[i].total}</td>
      <td>${productArray[i].category}</td>
      <td id="update" onclick = "update(${i})" >update</td>
      <td id="delete" onclick = "deleteProduct(${i})">delete</td>
    </tr>`;
    }
  }
  document.getElementsByTagName("tbody")[0].innerHTML = table;
}
