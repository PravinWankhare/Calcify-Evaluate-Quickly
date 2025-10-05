const display = document.querySelector("input");
    const buttons = document.querySelectorAll("button");
    let expression = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent.trim();

            if (value === "C") {
                // Clear everything
                expression = "";
                display.value = "";
            } else if (value === "CE") {
                // Remove last full number entry
                expression = expression.replace(/(\d+\.?\d*)$/, ""); 
                display.value = expression;
            } else if (button.querySelector("i.fa-delete-left")) {
                // If last part is operator with spaces -> delete whole operator
                if (/\s[\+\-\*\/]\s$/.test(expression)) {
                    expression = expression.slice(0, -3); // remove " x "
                } else {
                    expression = expression.slice(0, -1); // normal backspace
                }
                display.value = expression.trim();
            } else if (value === "=") {
                try {
                    expression = eval(expression).toString();
                    display.value = expression;
                } catch {
                    display.value = "Error";
                    expression = "";
                }
            } else {
                if (["+", "-", "*", "/"].includes(value)) {
                  if (!/[\+\-\*\/]\s$/.test(expression)) {
                    expression = expression.trim() + " " + value + " ";
                  }
                } else {
                    expression += value;
                  }
                display.value = expression.trim();
            }

        });
    });