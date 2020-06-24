function closeModal() {
    const modalContainer = document.getElementById('cart_errormodal');
    modalContainer.classList.remove('cart-modal-open');
}

window.addEventListener('load', async () => {
    const archivo = document.getElementById('comunas_restrict').dataset.file;
    const selectRegion = document.getElementById('cart_region');
    const selectComuna = document.getElementById('cart_comuna');
    const botonPagar = document.getElementById('cart_pagar');
    const modalContainer = document.getElementById('cart_errormodal');
    const modalText = modalContainer.dataset.texto;
    const data = await fetch(`https://cdn.jsdelivr.net/gh/acromatico-development/grameco-cart-app/data/${archivo}-regiones.json`).then(resp => resp.json());

    function checkTrue(e) {
        const disponible = e.target.selectedOptions[0].dataset.disponible === "true" ? true : false;

        if(disponible) {
            botonPagar.disabled = false;
        } else {
            botonPagar.disabled = true;
            modalContainer.classList.add('cart-modal-open');
        }
    }
    
    selectRegion.innerHTML = `<option value="" selected disabled>-- Selecciona una Opción --</option>`;
    selectRegion.style.maxWidth = '500px';
    selectComuna.innerHTML = `<option value="" selected disabled>-- Selecciona una Opción --</option>`;
    selectComuna.style.maxWidth = '500px';
    modalContainer.innerHTML = `
<div class="cart-modal-box">
    <p>${modalText}</p>
    <button class="button btn" onclick="closeModal();">Cerrar</button>
</div>
    `;

    for(let key in data) {
        const newOption = document.createElement('option');
        newOption.innerText = key;
        selectRegion.appendChild(newOption);
    }

    selectRegion.addEventListener('change', (e) => {
        const valor = e.target.value;
        const comunas = data[valor];
        
        const newHtml = comunas.reduce((prev, curr) => prev + `<option value="${curr.nombre}" data-disponible="${curr.disponible}">${curr.nombre}</option>`, '<option value="" selected disabled>-- Selecciona una Opción --</option>');

        selectComuna.innerHTML = newHtml;
    });

    selectComuna.addEventListener('change', checkTrue);
});
