const temperatureInput = document.querySelector('#temperature-input');
const errorMessage = document.querySelector('#error-message');
const resultContainer = document.querySelector('#result');
let selectedUnit = null;

document.querySelector('#select-celsius').addEventListener('click', () => selectUnit('C'));
document.querySelector('#select-fahrenheit').addEventListener('click', () => selectUnit('F'));
document.querySelector('#select-kelvin').addEventListener('click', () => selectUnit('K'));
document.querySelector('#calculate').addEventListener('click', calculateConversion);

function selectUnit(unit) {
    selectedUnit = unit;
    errorMessage.textContent = ''; // Clear error message
    resetSelectionButtons();
    document.querySelector(`#select-${unit.toLowerCase()}`).classList.add('active');
}

function resetSelectionButtons() {
    document.querySelectorAll('.selection-buttons button').forEach(button => {
        button.classList.remove('active');
    });
}

function calculateConversion() {
    const temp = parseFloat(temperatureInput.value);
    if (isNaN(temp)) {
        errorMessage.textContent = 'Please enter a valid temperature.';
        return;
    }

    if (!selectedUnit) {
        errorMessage.textContent = 'Please select a temperature unit.';
        return;
    }

    let celsius, fahrenheit, kelvin;

    switch (selectedUnit) {
        case 'C':
            celsius = temp;
            fahrenheit = (temp * 9) / 5 + 32;
            kelvin = temp + 273.15;
            break;
        case 'F':
            celsius = (temp - 32) * 5 / 9;
            fahrenheit = temp;
            kelvin = celsius + 273.15;
            break;
        case 'K':
            celsius = temp - 273.15;
            fahrenheit = (celsius * 9) / 5 + 32;
            kelvin = temp;
            break;
        default:
            errorMessage.textContent = 'Unknown error.';
            return;
    }

    resultContainer.innerHTML = `
        <p><strong>Celsius (°C):</strong> ${celsius.toFixed(2)}</p>
        <p><strong>Fahrenheit (°F):</strong> ${fahrenheit.toFixed(2)}</p>
        <p><strong>Kelvin (K):</strong> ${kelvin.toFixed(2)}</p>
    `;
}
