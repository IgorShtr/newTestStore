 class PopupController extends HTMLElement {
    #addonPopupContent = document.querySelector(`#popup-id-${this.getAttribute("popupId")}`);

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
       this.closeIcon = this.querySelector('.icon--close')
       this.init()
    }
 
    init() {
       this.closeIcon.addEventListener("click", this.closePopup.bind(this))
    }
 
    closePopup() {
       return this.classList.remove('open');
    }
 
    toggle() {
       this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
    }
 
    disconnectedCallback() {
       this.removeEventListener("click", this.init);
       this.closeIcon.removeEventListener("click", this.init);
    }
 }

 customElements.define("popup-custom", Popup)
customElements.define("popup-controller", PopupController)