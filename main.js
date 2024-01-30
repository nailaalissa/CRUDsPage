let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let moode = 'create';
let tmp;
//console.log(title, price, taxes, ads, discount, total, count, category, submit);

// get total

function gettotal() {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = 'green';
  } else {
    total.innerHTML = '';
    total.style.backgroundColor = '';
  }
}

//crete pruduct
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // count
  if (title.value != '' && price.value != '' && category.value != '' && count.value < 100) {
    if (moode === 'create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      moode = 'create';
      count.style.display = 'block';
      submit.innerHTML = 'Create';
    }
    clearData();
  }

  //console.log(dataPro);
  //save data into localstorage
  localStorage.setItem('product', JSON.stringify(dataPro));
  //clearData();
  showData();
};
// clear inputs data
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
  //total.style.backgroundColor = '';
}
// read
function showData() {
  gettotal();
  let table = '';
  for (let i = 1; i < dataPro.length - 1; i++) {
    table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onClick="deletData(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All ( ${dataPro.length} ) </button>`;
  } else {
    btnDelete.innerHTML = '';
  }
}
showData();

// delete
function deletData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  gettotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'Update';
  moode = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
}
//search
let searchMood = 'title';
function getSearchMood(id) {
  let search = document.getElementById('search');
  if (id == 'searchTitle') {
    searchMood = 'title';
  } else {
    searchMood = 'category';
  }
  search.placeholder = 'Search By ' + searchMood;
  search.focus();
  search.value = '';
  showData();
}
function searchData(value) {
  let table = '';
  for (let i = 1; i < dataPro.length - 1; i++) {
    if (searchMood == 'title') {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onClick="deletData(${i})" id="delete">delete</button></td>
            </tr>
          `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onClick="deletData(${i})" id="delete">delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}
// clean data
