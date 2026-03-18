class ProductCardImagesController extends HTMLElement {
  constructor() {
    super()
    this.imagesManager = document.querySelector("images-manager")
    this.controllerItemList = document.querySelectorAll(".controller-item")

  }
  connectedCallback() {
    this.addEventListener("click",
      this.onClick.bind(this))
  }
  onClick(e) {
    const optionValue = e.target.dataset.option
    if (e.target !== this) {
      this.imagesManager.updateImageCard(optionValue)
      const parentWrapper = e.target.closest(".controller-item")
      this.removeMarkers()
      parentWrapper.classList.add("border-custom-blue")
      parentWrapper.classList.remove("border-transparent")

    }
  }
  removeMarkers() {
    this.controllerItemList.forEach(item => {
      item.classList.remove("border-custom-blue")
      item.classList.add("border-transparent")
    })
  }
  disconnectedCallback() {
    this.removeEventListener("click",
      this.onClick.bind(this))
  }

}

document.querySelector("card-images-controller") && customElements.define("card-images-controller", ProductCardImagesController)