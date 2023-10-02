const renderList = (phoneList) => {
    let content = '';
    phoneList.forEach((ele) => {
      content += ` <div class="col-lg-3 ${ele.type} col-md-6 mb-5">
      <div class="card  text-black h-100 ">
      <div class="content-overlay"></div>
        <img src=${ele.img} class="card-img" alt="Phone Image" />
        <div class="content-details fadeIn-top">
              <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Screen:</b></span>
            <span class='text-light'>&nbsp ${ele.screen}</span>
          </div>
          <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Back Camera:</b> ${ele.backCamera}</span>
          </div>
          <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Front Camera:</b> ${ele.frontCamera}</span>
          </div>
  
        </div>
        <div class="card-body">
          <div class="text-center">
            <h5 class="card-title ">${ele.name}</h5>
            <span class="text-muted ">$${ele.price}</span>
          </div>
          <div class=" brand-box text-center">
            <span>${ele.type}</span>
          </div>
          <div class="d-flex justify-content-start text-light">
            <span><b>Description:</b> ${ele.desc}</span>
          </div>
          <div class="d-flex justify-content-between pt-3">
            <div class="text-warning">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <span class = 'text-success'><b>In Stock</b></span>
          </div>
          <button type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${ele.id
        }')">Add to cart</button>
        </div>
      </div>
    </div>`;
    });
    document.getElementById('phoneList').innerHTML = content;
  };

  
  const renderCart = (cart) => {
    let content = '';
    cart.forEach((ele) => {
      content += `<div class="product">
    <div class="product__1">
      <div class="product__thumbnail">
        <img src=${ele.product.img} 
          alt="Italian Trulli" height="100px">
      </div>
      <div class="product__details">
        <div style="margin-bottom: 5px;"><b>${ele.product.name}</b></div>
        <div style="font-size: 90%;">Screen: <span class="tertiary">${ele.product.screen
        }</span></div>
        <div style="font-size: 90%;">Back Camera: <span class="tertiary">${ele.product.backCamera
        }</span></div>
        <div style="font-size: 90%;">Front Camera: <span class="tertiary">${ele.product.frontCamera
        }</span></div>
        <div style="margin-top: 8px;"><a href="#!" onclick ="btnRemove('${ele.product.id
        }')">Remove</a></div>
      </div>
    </div>
    <div class="product__2">
      <div class="qty">
        <span><b>Quantity:</b> </span> &nbsp &nbsp
        <span class="minus bg-dark" onclick ="btnMinus('${ele.product.id}')">-</span>
        <span class="quantityResult mx-2">${ele.quantity}</span>
        <span class="plus bg-dark" onclick ="btnAdd('${ele.product.id}')">+</span>
      </div>
      <div class="product__price"><b>$${(ele.quantity * ele.product.price).toLocaleString()}</b></div>
    </div>
  </div>`;
    });
    document.getElementById('cartList').innerHTML = content;
    
    let cartCount = 0;
    cart.forEach((ele) => {
      cartCount += ele.quantity;
    });
    const subTotal = calculateSubTotal(cart);
    document.getElementById('cartCount').innerHTML = cartCount;
    document.getElementById('priceTotal').innerHTML = '$' + subTotal.toLocaleString();
  }