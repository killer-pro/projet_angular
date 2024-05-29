const btn_plus = document.getElementById('btn_plus');
const btn_moins = document.getElementById('btn_moins'); 
const input = document.getElementById('nombre');

btn_plus.addEventListener('click', function() {
    input.value++;
});

btn_moins.addEventListener('click', function() {
    if (input.value > 1) {
        input.value--;
    }
});
