document.addEventListener('DOMContentLoaded', () => {
    
    const celsiusInput = document.getElementById('celsius-input');
    const convertBtn = document.getElementById('convert-btn');
    const promptBtn = document.getElementById('prompt-btn');
    const errorMessage = document.getElementById('error-message');
    const fahrenheitVal = document.getElementById('fahrenheit-val');
    const kelvinVal = document.getElementById('kelvin-val');

    function showError() {
        errorMessage.classList.remove('d-none');
        celsiusInput.classList.add('is-invalid');
    }

    function hideError() {
        errorMessage.classList.add('d-none');
        celsiusInput.classList.remove('is-invalid');
    }

    function convertCelsiusToFahrenheit(celsius) {
        return parseFloat((celsius * 1.8 + 32).toFixed(2));
    }

    function convertCelsiusToKelvin(celsius) {
        return parseFloat((celsius + 273.15).toFixed(2));
    }

    function updateResults(celsius) {
        const fahrenheit = convertCelsiusToFahrenheit(celsius);
        const kelvin = convertCelsiusToKelvin(celsius);

        fahrenheitVal.textContent = fahrenheit + ' °F';
        kelvinVal.textContent = kelvin + ' K';

        console.log(`Grados Kelvin: ${kelvin}`);
        console.log(`Grados Fahrenheit: ${fahrenheit}`);
    }

    function isValidNumber(value) {
        if (value === null || value === undefined) return false;
        const trimmed = value.toString().trim();
        if (trimmed === "") return false;
        return !isNaN(Number(trimmed));
    }

    function handleDOMConversion() {
        const rawValue = celsiusInput.value;
        
        if (!isValidNumber(rawValue)) {
            showError();
            fahrenheitVal.textContent = '--';
            kelvinVal.textContent = '--';
            return;
        }

        hideError();
        updateResults(Number(rawValue));
    }

    function handlePromptConversion() {
        let inputVal = "";
        let isFirstPrompt = true;

        while (true) {
            let promptMsg = "Por favor, ingresa la temperatura en grados Celsius:";
            if (!isFirstPrompt) {
                promptMsg = "Error: El valor ingresado no es un número.\n\nPor favor, ingresa un número válido:";
            }
            
            inputVal = prompt(promptMsg);

            if (inputVal === null) {
                return;
            }

            if (isValidNumber(inputVal)) {
                break;
            }

            isFirstPrompt = false;
        }

        const celsius = Number(inputVal.trim());
        celsiusInput.value = celsius;
        hideError();
        updateResults(celsius);
    }

    convertBtn.addEventListener('click', handleDOMConversion);
    promptBtn.addEventListener('click', handlePromptConversion);

    celsiusInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleDOMConversion();
        }
    });

    celsiusInput.addEventListener('input', () => {
        hideError();
    });
});
