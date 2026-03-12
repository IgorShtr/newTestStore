class BestSellerProduct extends HTMLElement {
  constructor() {
    super()
    this.imgEyeButton = this.querySelector(".best-seller-image-eye")
    this.variantId = this.dataset.variantId

  }
  connectedCallback() {
    this.imgEyeButton.addEventListener("click", this.addToCart.bind(this)
    )
  }
  addToCart() {
    let productData = {
      'items': [{
        'id': this.variantId,
        'quantity': 1
      }]
    };

    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added', data);
      })
      .catch(error => console.error('Error:', error));
  }

  disconnectedCallback() {
    this.imgEyeButton.removeEventListener("click", this.addToCart.bind(this));
  }
}

document.querySelector("best-seller-product-card") && customElements.define("best-seller-product-card", BestSellerProduct)