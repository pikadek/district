document.getElementById("btnconnection").addEventListener("click", function () {
    const username = document.querySelector('input[type="text"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    let message = document.getElementById("message");

    if (!message) {
        message = document.createElement("p");
        message.id = "message";
        document.getElementById("fromulaireconnection").appendChild(message);
    }

    // Reset style
    message.className = "";

    if (username === "" || password === "") {
        message.textContent = "Veuillez remplir tous les champs.";
        message.classList.add("error");
        return;
    }

    // Exemple de vérification (à remplacer par vrai backend)
    if (username === "District" && password === "test") {
        message.textContent = "Connexion réussie ! 🎉";
        sessionStorage.setItem("username", username);
        window.location.href = "main.html";

    } else {
        message.textContent = "Identifiants incorrects.";
        message.classList.add("error");
    }
});