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
  document.querySelector("#inputID").hidden = true;
};

//ADD product to the table
document.querySelector("#btnAddPhone").onclick = function () {
  var product = retrieveInfo();
  //   console.log(product);
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
};

//EDIT product
function editProduct(id) {
  getProductById(id)
    .then(function (res) {
      document.querySelector("#inputID").hidden = false;
      var product = res.data;

      document.querySelector("#inputID").value = product.id;
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
