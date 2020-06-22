window.addEventListener('load', async () => {
    const archivo = document.getElementById('comunas_restrict').dataset.file;
    const selectRegion = document.getElementById('cart_region');
    const selectComuna = document.getElementById('cart_comuna');
    const botonPagar = document.getElementById('cart_pagar');
    const data = await fetch(`https://cdn.jsdelivr.net/gh/acromatico-development/grameco-cart-app/data/${archivo}-regiones.json`).then(resp => resp.json());

    function checkTrue(e) {
        const disponible = e.target.selectedOptions[0].dataset.disponible;

        if(disponible) {
            botonPagar.disabled = false;
            console.log('Disponible');
        } else {
            botonPagar.disabled = true;
            console.log('No Disponible');
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
        
        const newHtml = comunas.reduce((prev, curr) => prev + `<option value="${curr.nombre}" data-disponible="${curr.disponible}">${curr.nombre}</option>`, '<option value="" selected disabled>-- Selecciona una Opción --</option>');

        selectComuna.innerHTML = newHtml;
    });

    selectComuna.addEventListener('change', checkTrue);
});
