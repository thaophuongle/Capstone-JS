function renderProductsList(productList) {
  var content = "";
  for (var i = 0; i < productList.length; i++) {
    var product = productList[i];
    var contentTr = `
          <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>
                  <img style="width: 150px; height: 150px" src="${product.img}" alt="">
              </td>
              <td> 
              Brand: ${product.type} <br>
              Screen: ${product.screen} <br>
              Front Camera: ${product.frontCamera} <br>
              Back Camera: ${product.backCamera} <br>
              Description: ${product.desc}</td>
              <td>
                  <button style="width: 60%" onclick="editProduct(${product.id})" class="btn btn-warning">Edit</button>
                  <button style="width: 60%; margin-top: 5px" onclick="deleteProduct(${product.id})" class="btn btn-danger">Delete</button>
              </td>
          </tr>
          `;

    content += contentTr;
  }

  document.querySelector("#tablePhone").innerHTML = content;
}

function retrieveInfo() {
  var id = document.querySelector("#productID").value;
  var name = document.querySelector("#name").value;
  var price = document.querySelector("#price").value;
  var screen = document.querySelector("#screenSize").value;
  var backCamera = document.querySelector("#backCam").value;
  var frontCamera = document.querySelector("#frontCam").value;
  var img = document.querySelector("#phoneImg").value;
  var type = document.querySelector("#phoneBrand").value;
  var desc = document.querySelector("#phoneDescription").value;

  return new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
}
