function fetchProductList() {
  getProductList()
    .then(function (res) {
      renderProductsList(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
fetchProductList();

function resetForm() {
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#screenSize").value = "";
  document.querySelector("#backCam").value = "";
  document.querySelector("#frontCam").value = "";
  document.querySelector("#phoneImg").value = "";
  document.querySelector("#phoneBrand").value = "";
  document.querySelector("#phoneDescription").value = "";
}

document.querySelector("#addPhoneForm").onclick = function () {
  document.querySelector("#btnUpdate").style.display = "none";
  document.querySelector("#btnAddPhone").style.display = "inline-block";
  document.querySelector("#inputID").hidden = true;
};

//ADD product to the table
document.querySelector("#btnAddPhone").onclick = function () {
  var product = retrieveInfo();

  var valid = checkEmpty(
    product.name,
    "#tbname",
    "Product name cannot be empty"
  );
  valid &=
    checkEmpty(product.price, "#tbprice", "Price cannot be empty") &&
    checkNumber(product.price, "#tbprice", "Price must be number");

  valid &= checkEmpty(product.screen, "#tbscreen", "Screen cannot be empty");
  valid &= checkEmpty(
    product.backCamera,
    "#tbbackCam",
    "Screen cannot be empty"
  );
  valid &= checkEmpty(
    product.frontCamera,
    "#tbfrontCam",
    "Screen cannot be empty"
  );
  valid &= checkEmpty(product.img, "#tbimg", "Image link cannot be empty");
  valid &= checkEmpty(product.desc, "#tbDesc", "Description cannot be empty");
  valid &= checkEmpty(
    product.type,
    "#tbBrand",
    "Product brand must be selected"
  );
  //console.log(product);

  if (valid) {
    addProductToList(product)
      .then(function (res) {
        $("#myModal").modal("hide");
        fetchProductList();
        console.log(res);
        resetForm();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};

//EDIT product
function editProduct(id) {
  document.querySelector("#btnUpdate").style.display = "inline-block";
  document.querySelector("#btnAddPhone").style.display = "none";
  getProductById(id)
    .then(function (res) {
      document.querySelector("#inputID").hidden = false;
      var product = res.data;

      document.querySelector("#productID").value = product.id;
      document.querySelector("#name").value = product.name;
      document.querySelector("#price").value = product.price;
      document.querySelector("#screenSize").value = product.screen;
      document.querySelector("#backCam").value = product.backCamera;
      document.querySelector("#frontCam").value = product.frontCamera;
      document.querySelector("#phoneImg").value = product.img;
      document.querySelector("#phoneBrand").value = product.type;
      document.querySelector("#phoneDescription").value = product.desc;

      $("#myModal").modal("show");
    })
    .catch(function (err) {
      console.log(err);
    });
}
function updateProduct() {
  var product = retrieveInfo();

  var valid = checkEmpty(
    product.name,
    "#tbname",
    "Product name cannot be empty"
  );
  valid &=
    checkEmpty(product.price, "#tbprice", "Price cannot be empty") &&
    checkNumber(product.price, "#tbprice", "Price must be number");

  valid &= checkEmpty(product.screen, "#tbscreen", "Screen cannot be empty");
  valid &= checkEmpty(
    product.backCamera,
    "#tbbackCam",
    "Screen cannot be empty"
  );
  valid &= checkEmpty(
    product.frontCamera,
    "#tbfrontCam",
    "Screen cannot be empty"
  );
  valid &= checkEmpty(product.img, "#tbimg", "Image link cannot be empty");
  valid &= checkEmpty(product.desc, "#tbDesc", "Description cannot be empty");
  valid &= checkEmpty(
    product.type,
    "#tbBrand",
    "Product brand must be selected"
  );

  if (valid) {
    updateProductById(product.id, product)
      .then(function (res) {
        console.log(res);
        $("#myModal").modal("hide");
        fetchProductList();
        resetForm();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

//delete product
function deleteProduct(id) {
  deleteProductbyID(id)
    .then(function (res) {
      fetchProductList();
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Search product by product name
document
  .querySelector("#txtSearch")
  .addEventListener("keydown", function (event) {
    console.log(event);

    if (event.key !== "Enter") return;
    var name = event.target.value;

    getProductList(name)
      .then(function (res) {
        console.log(res.data);
        renderProductsList(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

//SORTING
function sortTable() {
  var table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];
  var rows = Array.from(table.rows);

  var sortOption = document.getElementById("sorting").value;

  rows.sort(function (a, b) {
    var priceA = parseFloat(a.cells[2].textContent);
    var priceB = parseFloat(b.cells[2].textContent);

    if (sortOption === "ascending") {
      return priceA - priceB;
    } else if (sortOption == "descending") {
      return priceB - priceA;
    } else {
      fetchProductList();
    }
  });

  rows.forEach(function (row) {
    table.appendChild(row);
  });
}
