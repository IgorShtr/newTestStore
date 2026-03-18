class ProductCardImagesManager extends HTMLElement {
  constructor() {
    super()
    this.variantImagesItemList = this.querySelectorAll(":scope > div")

  }
  updateImageCard(optionValue) {
    this.variantImagesItemList.forEach(optionSet => {
      const variantKey = optionSet.dataset.variantKey
        if (variantKey === optionValue) {
      optionSet.classList.remove("hidden");
      optionSet.classList.add("block");
    } else {
      optionSet.classList.add("hidden");
      optionSet.classList.remove("block");
    }

    })
  }

}

document.querySelector("images-manager") && customElements.define("images-manager", ProductCardImagesManager)