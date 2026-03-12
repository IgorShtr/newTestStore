class PopupController extends HTMLElement {
  #addonPopupContent = document.querySelector(`#popup-id-${this.getAttribute("popup-id")}`);

  connectedCallback() {
    this.addEventListener("click", this.#onClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.#onClick);
  }

  #onClick() {
    this.#addonPopupContent.toggle();
  }
}
class Popup extends HTMLElement {
  constructor() {
    super()
    this.closeIcon = this.querySelector('.icon-close');
    this.altCloseClassSelector = this.getAttribute("alt-close-class");
    this.altCloseElement = document.querySelector(`.${this.getAttribute("alt-close-class")}`);
    this.body = document.querySelector("body")
    this.announcementBar = document. querySelector(".announcement-bar");
  }
  connectedCallback() {
    this.altCloseElement?.addEventListener("click",
      this.closePopup.bind(this))
    this.closeIcon?.addEventListener("click",
      this.closePopup.bind(this))
  }

  openPopup() {
    this.classList.add('open');
    this.body.style.overflow = "hidden";
    this.body.style.paddingRight = "20px";
    this.announcementBar.style.zIndex = 1;
  }
  
  closePopup() {
    this.classList.remove('open');
    this.body.style.overflow = "auto"
    this.body.style.paddingRight = "0";
    this.announcementBar.style.zIndex = "100";
  }

  toggle() {
    this.classList.contains('open') ? this.closePopup() : this.openPopup();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.init);
    this.closeIcon.removeEventListener("click", this.init);
    this.altCloseElementsParent && this.altCloseElementsParent.removeEventListener("click",
      this.closePopup.bind(this))
  }
}

document.querySelector("popup-custom") && customElements.define("popup-custom", Popup)
document.querySelector("popup-controller") && customElements.define("popup-controller", PopupController)