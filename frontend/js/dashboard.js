const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
};

async function loadDashboard() {

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const foods = await fetch(`${API_URL}/foods`, {
        headers
    });

    const categories = await fetch(`${API_URL}/categories`, {
        headers
    });

    const foodData = await foods.json();

    const categoryData = await categories.json();

    const foodList = foodData.data || [];
    const categoryList = categoryData.data || [];

    document.getElementById("totalFoods").innerHTML = foodList.length;

    document.getElementById("totalCategories").innerHTML = categoryList.length;

    let low = 0;
    let expired = 0;

    const today = new Date();

    foodList.forEach(food => {

        if (food.stock <= 5)
            low++;

        if (food.expired_date) {

            if (new Date(food.expired_date) < today)
                expired++;

        }

    });

    document.getElementById("lowStock").innerHTML = low;

    document.getElementById("expiredFood").innerHTML = expired;

    const tbody = document.getElementById("foodTable");

    tbody.innerHTML = "";

    foodList.slice(0, 5).forEach(food => {

        tbody.innerHTML += `
        <tr>

        <td>${food.name}</td>

        <td>${food.categories?.name || "-"}</td>

        <td>${food.stock}</td>

        <td>${food.unit}</td>

        </tr>
        `;

    });

}

const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("userName").textContent = user.name;

    document.getElementById("userEmail").textContent = user.email;

    document.getElementById("welcomeText").textContent =
        `Selamat Datang, ${user.name} 👋`;

}

loadDashboard();