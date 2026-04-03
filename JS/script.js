// ================== HASH PASSWORD ==================
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ================== USERS ==================
const usersDB = [
    { username: "test", passwordHash: "6c1ccd1f20742182387027bb4b72c4bfe4ca7e9247af5e7c0f1f8ce0f236724e", role: "user" },
    { username: "District", passwordHash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", role: "admin" }
];

// ================== LOGIN (SAFE) ==================
const btn = document.getElementById("btnconnection");

if (btn) {
    btn.addEventListener("click", async function () {

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

        const hashedInput = await hashPassword(passwordInput);

        const user = usersDB.find(u =>
            u.username === usernameInput &&
            u.passwordHash === hashedInput
        );

        if (user) {
            message.textContent = `Connection avec succes ${user.username} ! 🎉`;
            message.classList.add("success");

            localStorage.setItem("userProfile", JSON.stringify({
                username: user.username,
                role: user.role
            }));

            setTimeout(() => {
                window.location.href = "main.html";
            }, 1000);

        } else {
            message.textContent = "Identifiants incorrects.";
            message.classList.add("error");
        }
    });
}

// ================== ADMIN - AJOUT DIRECT ==================
function addCard(username) {

    let usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    const input = document.getElementById(`input-${username}`);
    if (!input) return;

    const newCard = input.value.trim();
    if (!newCard) return;

    if (!usersData[username]) {
        usersData[username] = { cards: [] };
    }

    if (!usersData[username].cards) {
        usersData[username].cards = [];
    }

    if (!usersData[username].cards.includes(newCard)) {
        usersData[username].cards.push(newCard);
    }

    localStorage.setItem("usersData", JSON.stringify(usersData));

    location.reload();
}

// ================== ADMIN PANEL FUNCTIONS ==================
function addCardToUser() {

    let usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    const select = document.getElementById("userSelect");
    const input = document.getElementById("newCardInput");

    if (!select || !input) return;

    const user = select.value;
    const newCard = input.value.trim();

    if (!newCard) return;

    if (!usersData[user]) {
        usersData[user] = { cards: [] };
    }

    if (!usersData[user].cards) {
        usersData[user].cards = [];
    }

    if (!usersData[user].cards.includes(newCard)) {
        usersData[user].cards.push(newCard);
    }

    localStorage.setItem("usersData", JSON.stringify(usersData));

    location.reload();
}

function setNextCard() {

    let usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    const select = document.getElementById("userSelect");
    const input = document.getElementById("nextCardInput");

    if (!select || !input) return;

    const user = select.value;
    const nextCard = input.value.trim();

    if (!nextCard) return;

    if (!usersData[user]) {
        usersData[user] = {};
    }

    usersData[user].nextCard = nextCard;

    localStorage.setItem("usersData", JSON.stringify(usersData));

    location.reload();
}

// ================== STOCKAGE UTILISATEUR ==================
function saveUserData(username, data) {
    let usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    usersData[username] = data;
    localStorage.setItem("usersData", JSON.stringify(usersData));
}

function loadUserData(username) {
    let usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    return usersData[username] || null;
}