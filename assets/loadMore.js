
if (!customElements.get('load-more')) {
    customElements.define(
        'load-more',
        class LoadMore extends HTMLElement {
            constructor() {
                super();
                this.button = this.querySelector(".load-more");
                this.collectionHandle = this.dataset.collectionHandle;
                this.paginationPagesMaxNumber = +this.dataset.paginationPagesNumber;
                this.NumberOfFetchedPages = 1;
            }


            connectedCallback() {
                this.button.addEventListener("click", () => {
                    this.loadNextPageItems();
                });
            }
            disconnectedCallback() {
                this.button.addEventListener("click", () => {
                    this.loadNextPageItems();
                });
            }

            isLastPage() {
                return +this.paginationPagesMaxNumber === this.NumberOfFetchedPages
            }

            loadNextPageItems() {
                const URL = `https://teststoreigorshtr.myshopify.com/collections/${this.collectionHandle}?page=${this.NumberOfFetchedPages + 1}`;
                fetch(URL)
                    .then((response) => response.text())
                    .then((responseText) => {
                        const html = new DOMParser().parseFromString(responseText, 'text/html');
                        const nextPageProductsList = html.querySelector(".product-grid").innerHTML
                        return nextPageProductsList
                    })
                    .then((nextPageProductsList) => {
                        const itemNodesToPaste = new DOMParser().parseFromString(nextPageProductsList, 'text/html').body.getElementsByClassName("grid__item");

                        const currentPageProductsList = document.querySelector(".product-grid");
                        [...itemNodesToPaste].forEach(child => {
                            currentPageProductsList.appendChild(child)

                        })
                        this.NumberOfFetchedPages = this.NumberOfFetchedPages + 1;

                        this.isLastPage() && (this.button.disabled = true)
                    })
                    .catch((error) => {
                        if (error.name === 'AbortError') {
                            console.log('Fetch aborted by user');
                        } else {
                            console.error(error);
                        }
                    });
            }


        }
    )
};

