const API_URL = "http://localhost:3000/api";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

/* ===========================
   LOGIN
=========================== */

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch(`${API_URL}/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            // hapus data lama
            localStorage.clear();

            // simpan token
            localStorage.setItem("token", data.token);

            // simpan user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            window.location.href = "dashboard.html";

        } else {

            message.innerHTML = data.message;

        }

    });

}

/* ===========================
   REGISTER
=========================== */

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch(`${API_URL}/auth/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Register berhasil");

            window.location.href = "login.html";

        } else {

            message.innerHTML = data.message;

        }

    });

}