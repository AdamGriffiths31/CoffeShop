export class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch('/components/MenuPage.css');
            const css = await request.text();
            styles.textContent = css;
        }
        loadCSS();
    }
    connectedCallback() {
        const template = document.getElementById('menu-page-template');
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener("menuUpdated", (e) => {
            this.render();
        });
        this.render();
    }

    render() {
        if (app.store.menu) {
            this.root.querySelector("#menu").innerHTML = "";
            for (let catergory of app.store.menu) {
                const liCatergory = document.createElement("li");
                liCatergory.innerHTML = `
                <h3>${catergory.name}</h3>
                <ul class="catergory">

                </ul>
                `;
                this.root.querySelector("#menu").appendChild(liCatergory);

                catergory.products.forEach((product) => {
                    const item = document.createElement("product-item");
                    item.dataset.product = JSON.stringify(product);
                    liCatergory.querySelector("ul").appendChild(item);
                });
            }
        } else {
            this.root.querySelector("#menu").innerHTML = "Loading...";
        }
    }
}

customElements.define('menu-page', MenuPage);