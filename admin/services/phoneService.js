const BASE_URL = "https://65113dfe829fa0248e3fb9c1.mockapi.io/Products";

function getProductList(productName) {
  return axios({
    url: BASE_URL,
    method: "GET",
    params: {
      name: productName || undefined,
    },
  });
}

function addProductToList(product) {
  return axios({
    url: BASE_URL,
    method: "POST",
    data: product,
  });
}

function getProductById(id) {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  });
}

function updateProductById(id, product) {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "PUT",
    data: product,
  });
}

function deleteProductbyID(id) {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  });
}
