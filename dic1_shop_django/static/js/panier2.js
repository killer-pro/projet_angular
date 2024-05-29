// panier2.js

document.addEventListener("DOMContentLoaded", function() {
    // Function to update subtotal, total, and final total
    function updateTotals() {
        var subtotal = 0;
        var totalElements = document.querySelectorAll(".total-column");
        for (var i = 0; i < totalElements.length; i++) {
            var price = parseFloat(totalElements[i].getAttribute("data-price"));
            var quantity = parseInt(document.getElementById("nombre" + (i + 1)).value);
            var total = price * quantity;
            totalElements[i].textContent = total.toFixed(2) + "$";
            subtotal += total;
        }
        document.getElementById("subtotal").textContent = subtotal.toFixed(2) + "$";
        document.getElementById("final-total").textContent = (subtotal+16+21.99).toFixed(2) + "$"; // Update final total
    }

    // Attach event listeners to quantity inputs
    var quantityInputs = document.querySelectorAll(".panier_nombre");
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("input", updateTotals);
    }

    // Attach event listeners to plus buttons
    var plusButtons = document.querySelectorAll(".plus");
    for (var i = 0; i < plusButtons.length; i++) {
        plusButtons[i].addEventListener("click", function() {
            var quantityInput = this.parentElement.querySelector(".panier_nombre");
            var quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
            updateTotals();
        });
    }

    // Attach event listeners to minus buttons
    var minusButtons = document.querySelectorAll(".moins");
    for (var i = 0; i < minusButtons.length; i++) {
        minusButtons[i].addEventListener("click", function() {
            var quantityInput = this.parentElement.querySelector(".panier_nombre");
            var quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
                updateTotals();
            }
        });
    }

    // Initial update
    updateTotals();
});
