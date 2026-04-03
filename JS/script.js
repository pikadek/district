//JS
// Fonction asynchrone pour hacher un texte en SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const usersDB = [
    { username: "test", passwordHash: "6c1ccd1f20742182387027bb4b72c4bfe4ca7e9247af5e7c0f1f8ce0f236724e" } ,  // "lili"
    { username: "District", passwordHash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }, // "test"
    
];

document.getElementById("btnconnection").addEventListener("click", async function () {
    const usernameInput = document.querySelector('input[type="text"]').value.trim();
    const passwordInput = document.querySelector('input[type="password"]').value.trim();
    let message = document.getElementById("message");

    if (!message) {
        message = document.createElement("p");
        message.id = "message";
        document.getElementById("fromulaireconnection").appendChild(message);
    }

    message.className = "";

    if (usernameInput === "" || passwordInput === "") {
        message.textContent = "Veuillez remplir tous les champs.";
        message.classList.add("error");
        return;
    }

    // 1. Hacher le mot de passe saisi par l'utilisateur
    const hashedInput = await hashPassword(passwordInput);

    // 2. Chercher l'utilisateur dans la "base de données"
    const user = usersDB.find(u => u.username === usernameInput && u.passwordHash === hashedInput);

    if (user) {
        message.textContent = `Connection avec succes ${user.username} ! 🎉`;
        message.classList.add("success");
        
        // Redirection après un court délai pour voir le message
        setTimeout(() => {
            window.location.href = "main.html";
        }, 1000);
    } else {
        message.textContent = "Identifiants incorrects.";
        message.classList.add("error");
    }
});
