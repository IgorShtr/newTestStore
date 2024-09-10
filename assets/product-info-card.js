if (!customElements.get('product-info-card')) {
    customElements.define(
        'product-info-card',
        class ProductInfo extends HTMLElement {
            quantityInput = undefined;
            quantityForm = undefined;
            onVariantChangeUnsubscriber = undefined;
            cartUpdateUnsubscriber = undefined;
            abortController = undefined;
            pendingRequestUrl = null;
            preProcessHtmlCallbacks = [];
            postProcessHtmlCallbacks = [];

            constructor() {
                super();

                this.quantityInput = this.querySelector('.quantity__input');
            }

            connectedCallback() {

                this.onVariantChangeUnsubscriber = subscribe(
                    PUB_SUB_EVENTS.optionValueSelectionChange,
                    this.handleOptionValueChange.bind(this)
                );

                this.dispatchEvent(new CustomEvent('product-info:loaded', { bubbles: true }));
            }

            disconnectedCallback() {
                this.onVariantChangeUnsubscriber();
                this.cartUpdateUnsubscriber?.();
            }
            handleOptionValueChange({ data: { event, target, selectedOptionValues } }) {
                if (!this.contains(event.target)) return;

                const availableVariantsString = this.querySelector("[data-product-variants]").innerHTML;
                const availableVariantsArray = availableVariantsString ? JSON.parse(availableVariantsString) : [];
                const selectedOptionName = event.target.value
                const selectedVariantId = availableVariantsArray.find(({ title }) => title === selectedOptionName)
                const requestUrl = "/variants/" + selectedVariantId.id;
                this.renderProductInfo({
                    requestUrl: requestUrl,
                    targetId: target.id,
                    callback: this.handleUpdateProductInfo(requestUrl, selectedVariantId),
                });
            }
            renderProductInfo({ requestUrl, targetId, callback }) {
                this.abortController?.abort();
                this.abortController = new AbortController();
                fetch(requestUrl, { signal: this.abortController.signal })
                    .then((response) => response.text())
                    .then((responseText) => {
                        this.pendingRequestUrl = null;
                        const html = new DOMParser().parseFromString(responseText, 'text/html');
                        callback(html);
                    })
                    .then(() => {
                        // set focus to last clicked option value
                        document.querySelector(`#${targetId}`)?.focus();
                    })
                    .catch((error) => {
                        if (error.name === 'AbortError') {
                            console.log('Fetch aborted by user');
                        } else {
                            console.error(error);
                        }
                    });
            }

            getSelectedVariant(productInfoNode) {
                const selectedVariant = productInfoNode.querySelector('variant-selects [data-selected-variant]')?.innerHTML;
                return !!selectedVariant ? JSON.parse(selectedVariant) : null;
            }

            updateOptionValues(html) {
                const variantSelects = html.querySelector('variant-selects');
                if (variantSelects) {
                    HTMLUpdateUtility.viewTransition(this.variantSelectors, variantSelects, this.preProcessHtmlCallbacks);
                }
            }

            handleUpdateProductInfo(productUrl, variantObject) {
                return (html) => {
                    const variant = this.getSelectedVariant(html);
                    this.pickupAvailability?.update(variant);

                    if (!variant || !variant.available) {
                        this.setUnavailable();
                        return;
                    }
                    this.updatePrices(variantObject)

                    const submitFormButtonInput = this.productForm.variantIdInput
                    submitFormButtonInput.value = variantObject.id
                };
            }

            updatePrices(variantObject) {
                const priceContainer = this.querySelector(".price__container");
                if (priceContainer) {
                    const regularPrice = priceContainer.querySelector(".price-item--regular");
                    const salePrice = priceContainer.querySelector(".price-item--sale");
                    const currencySign = regularPrice.textContent.replace(/[0-9]/g, '')
                    const variantPriceRegular = variantObject.compare_at_price / 100;
                    const variantPriceSale = variantObject.price / 100;
                    regularPrice.textContent = currencySign + variantPriceRegular
                    salePrice.textContent = currencySign + variantPriceSale
                }
            }


            setUnavailable() {
                this.productForm?.toggleSubmitButton(true, window.variantStrings.unavailable);

                const selectors = ['price', 'Inventory', 'Sku', 'Price-Per-Item', 'Volume-Note', 'Volume', 'Quantity-Rules']
                    .map((id) => `#${id}-${this.dataset.section}`)
                    .join(', ');
                document.querySelectorAll(selectors).forEach(({ classList }) => classList.add('hidden'));
            }


            get productForm() {
                return this.querySelector(`product-form`);
            }

            get pickupAvailability() {
                return this.querySelector(`pickup-availability`);
            }

            get variantSelectors() {
                return this.querySelector('variant-selects');
            }

        }
    );
}
