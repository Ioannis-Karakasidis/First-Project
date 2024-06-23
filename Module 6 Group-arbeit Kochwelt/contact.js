document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('message').value;

        if (name && email && message) {
            document.getElementById('status').innerHTML = 'Vielen Dank für Ihre Nachricht!';
            document.getElementById('status').style.color = 'green';
            document.getElementById('name').value = ``;
            document.getElementById('email').value = ``;
            document.getElementById('message').value = ``;
        } else {
            document.getElementById('status').innerHTML = 'Bitte füllen Sie alle Felder aus.';
            document.getElementById('status').style.color = 'red';
        }
    });
});