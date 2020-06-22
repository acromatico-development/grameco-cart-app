window.addEventListener('load', async () => {
    const url = document.getElementById('comunas_restrict').dataset.file;
    const selectRegion = document.getElementById('cart_region');
    const selectComuna = document.getElementById('cart_comuna');
    const botonPagar = document.getElementById('cart_pagar');
    const data = await fetch(`https:${url}`).then(resp => resp.json());

    function checkEmpty() {
        if(rucInput.value === '' || selectComuna.value === '' || selectRegion.value === '') {
            botonPagar.disabled = true;
        } else {
            botonPagar.disabled = false;
        }
    }
    
    selectRegion.innerHTML = `<option value="" selected disabled>-- Selecciona una Opción --</option>`;
    selectComuna.innerHTML = `<option value="" selected disabled>-- Selecciona una Opción --</option>`;

    for(let key in data) {
        const newOption = document.createElement('option');
        newOption.innerText = key;
        selectRegion.appendChild(newOption);
    }

    selectRegion.addEventListener('change', (e) => {
        const valor = e.target.value;
        const comunas = data[valor];
        
        const newHtml = comunas.reduce((prev, curr) => prev + `<option>${curr}</option>`, '<option value="" selected disabled>-- Selecciona una Opción --</option>');

        selectComuna.innerHTML = newHtml;
        checkEmpty();
    });

    selectComuna.addEventListener('change', checkEmpty);
    rucInput.addEventListener('keyup', checkEmpty);
});
