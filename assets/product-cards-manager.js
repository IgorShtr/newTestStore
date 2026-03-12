class ProductCardsManager extends HTMLElement {
  constructor() {
    super()
    this.bestSellerProductCardsList = this.querySelectorAll("best-seller-product-card")
    this.variantId = this.dataset.variantId

  }
  updateCardVisibility(productVariantData) {
    this.bestSellerProductCardsList.forEach(card =>{
      +card.dataset.variantId === productVariantData ? card.classList.remove("hidden") : card.classList.add("hidden")
    })
  }

}

document.querySelector("product-cards-manager") && customElements.define("product-cards-manager", ProductCardsManager )