function fetchProductsList() {
    axios({
        url: "https://65113dfe829fa0248e3fb9c1.mockapi.io/Products",
        method: "GET",
      })
        .then(function (res) {
          console.log("res", res.data);
          renderList(res.data);
          
        })
        .catch(function (err) {
          
          console.log("err", err);
        });
    
      }
    fetchProductsList();

    getPhones = async () => {
      try {
        const res = await axios({
          url: 'https://65113dfe829fa0248e3fb9c1.mockapi.io/Products',
          method: 'GET',
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
    
    getPhoneById = async (id) => {
      try {
        const res = await axios({
          url: `https://65113dfe829fa0248e3fb9c1.mockapi.io/Products/${id}`,
          method: 'GET',
        });
    
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
    let cart = [];
    
    var myButton = document.getElementById("openCart");
    
    // Gắn hàm xử lý sự kiện click vào nút
    myButton.addEventListener("click", function() {
      // Thay đổi tên class của phần tử khi click vào nút
      var element = document.querySelector(".cart");
      element.classList.toggle("is-hidden");
    });
    
    var myButtonContinue = document.getElementById("continue");
    
    // Gắn hàm xử lý sự kiện click vào nút
    myButtonContinue.addEventListener("click", function() {
      // Thay đổi tên class của phần tử khi click vào nút
      var elementContinue = document.querySelector(".cart");
      elementContinue.classList.toggle("is-hidden");
    });
    
    
    function displayProducts() {
      var selectElement = document.getElementById("selectList");
      var selectedValue = selectElement.value;
      
      // Lấy danh sách tất cả các sản phẩm
      var productList = document.getElementsByClassName("col-lg-3");
      
      // Hiển thị hoặc ẩn danh sách sản phẩm theo loại đã chọn
      for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        
        if (selectedValue === "all") {
          product.style.display = "block"; // Hiển thị tất cả sản phẩm
        } else if (product.classList.contains(selectedValue)) {
          product.style.display = "block"; // Hiển thị sản phẩm theo loại đã chọn
        } else {
          product.style.display = "none"; // Ẩn sản phẩm không thuộc loại đã chọn
        }
      }
    }
    
    const findItemById = (cart, id) => {
      let item;
      cart.forEach((ele) => {
        if (ele.product.id == id) {
          item = ele;
          return;
        }
      });
      return item;
    };
    
    
    
    window.onload = async () => {
      const phoneList = await getPhones();
      renderList(phoneList);
      cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      renderCart(cart);
    };
    
    window.btnAddToCart = async (productId) => {
      const phoneData = await getPhoneById(productId);
      const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = phoneData;
      const product = new Product(
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
      const newCartItem = new CartItem(product, 1);
      let cartItem = findItemById(cart, newCartItem.product.id);
      !cartItem ? cart.push(newCartItem) : cartItem.quantity++;
      renderCart(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // hàm tính tổng tiền trong giỏ hàng
    const calculateSubTotal = (cart) => {
      let subTotal = 0;
      cart.forEach((ele) => {
        subTotal += ele.product.price * ele.quantity;
      });
      return subTotal;
    };
    
    
    
    // dấu cộng trong giỏ hàng
    window.btnAdd = (id) => {
      let cartItem = findItemById(cart, id);
      if (cartItem) cartItem.quantity++;
      renderCart(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // dấu trừ trong giỏ hàng
    window.btnMinus = (id) => {
      let cartItem = findItemById(cart, id);
      if (cartItem) cartItem.quantity--;
      cart = cart.filter((ele) => ele.quantity != 0);
      renderCart(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // xóa sản phẩm khỏi giỏ hàng
    window.btnRemove = (id) => {
      cart = cart.filter((ele) => ele.product.id != id);
      renderCart(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    };
    
    // clear giỏ hàng
    window.emptyCart = () => {
      cart = [];
      renderCart(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    };
    
    //Nút thanh toán
    window.payNow = () => {
      if (cart.length > 0) {
        alert("Bạn Đã Thanh Toán Thành Công!!!")
        emptyCart();
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
       alert("Giỏ Hàng Rỗng")
      }
    };
    