document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '0';
    let shouldResetDisplay = false;

    // Actualiza el contenido del display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Función para añadir números
    window.appendNumber = function(number) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    // Función para añadir operadores
    window.appendOperator = function(operator) {
        if (shouldResetDisplay) {
            shouldResetDisplay = false;
        }
        // Evita operadores duplicados (ej: ++, --)
        const lastChar = currentInput[currentInput.length - 1];
        if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(operator)) {
             currentInput = currentInput.slice(0, -1) + operator;
        } else {
            currentInput += operator;
        }
        updateDisplay();
    };

    // Limpiar el display
    window.clearDisplay = function() {
        currentInput = '0';
        updateDisplay();
    };

    // Borrar el último caracter
    window.deleteLast = function() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    };

    // Calcular el resultado
    window.calculateResult = function() {
        try {
            // Reemplaza los símbolos visuales por los que entiende JavaScript
            let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            
            // Evalúa la expresión de forma segura
            const result = new Function('return ' + expression)();

            if (isNaN(result) || !isFinite(result)) {
                throw new Error("Invalid calculation");
            }
            
            currentInput = String(result);
            shouldResetDisplay = true;
        } catch (error) {
            currentInput = 'Error';
            shouldResetDisplay = true;
        }
        updateDisplay();
    };

    // Inicializar el display
    updateDisplay();
});