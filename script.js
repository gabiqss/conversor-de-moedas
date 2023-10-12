const valorInput = document.getElementById('valor');
const deSelect = document.getElementById('de');
const paraSelect = document.getElementById('para');
const resultadoDiv = document.getElementById('resultado');

function converter() {
    const valor = parseFloat(valorInput.value);
    const deMoeda = deSelect.value;
    const paraMoeda = paraSelect.value;

    // Verifica se o valor é um número válido
    if (isNaN(valor)) {
        resultadoDiv.innerText = 'Oii, coloca algum valor em cima!';
        return;
    }

    // Implementação da lógica de conversão
    fetch(`https://api.exchangerate-api.com/v4/latest/${deMoeda}`)
        .then(response => response.json())
        .then(data => {
            const taxaDeCambio = data.rates[paraMoeda];
            const resultado = valor * taxaDeCambio;
            resultadoDiv.innerText = `${valor} ${deMoeda} tá valendo ${resultado.toFixed(2)} ${paraMoeda}`;
        })
        .catch(error => console.error('Erro ao obter taxas de câmbio:', error));
}


// Preencher as opções dos menus suspensos
fetch('https://api.exchangerate-api.com/v4/latest/BRL')
    .then(response => response.json())
    .then(data => {
        const moedas = Object.keys(data.rates);
        moedas.forEach(moeda => {
            deSelect.innerHTML += `<option value="${moeda}">${moeda}</option>`;
        });
    })
    .catch(error => console.error('Erro ao obter lista de moedas:', error));

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
        const moedas = Object.keys(data.rates);
        moedas.forEach(moeda => {
            paraSelect.innerHTML += `<option value="${moeda}">${moeda}</option>`;
        });
    })
    .catch(error => console.error('Erro ao obter lista de moedas:', error));


document.getElementById('converter').addEventListener('click', converter);

document.getElementById('trocar-moedas').addEventListener('click', function() {
    const valor1 = document.getElementById('de').value;
    const valor2 = document.getElementById('para').value;
    console.log(valor2)

    document.getElementById('de').value = valor2;
    document.getElementById('para').value = valor1;
});


