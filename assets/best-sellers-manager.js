class BestSellersManager extends HTMLElement {
  constructor() {
    super()
    this.parent = this.closest(".best-sellers__section");
    this.productCardManager = this.parent.querySelector("product-cards-manager")
    this.collectionsList = document.querySelectorAll(".best-sellers__collection");
    this.bestSellerItemsList = document.querySelectorAll(".best-sellers__item");
  }
  connectedCallback() {
    this.addEventListener("click", this.collectionClick)
  }

  collectionClick(e) {
    this.bestSellerItemsList.forEach(item => item.classList.remove("selected"))
    const collectionElementWrapper = e.target.closest(".best-sellers__item");
    collectionElementWrapper.classList.add("selected")
    const firstVariantId = collectionElementWrapper.dataset.collectionProductId
    this.renderPictureUpdate(firstVariantId)
  }

  renderPictureUpdate(productVariantData) {
    this.productCardManager.updateCardVisibility(+productVariantData)
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.collectionClick)
  }
}

document.querySelector("best-sellers-manager") && customElements.define("best-sellers-manager", BestSellersManager)