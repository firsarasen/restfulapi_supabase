const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
};

const modal = document.getElementById("foodModal");

let editMode = false;
let selectedFoodId = null;

/* ============================
   MODAL
============================ */

document.getElementById("addBtn").onclick = () => {

    editMode = false;
    selectedFoodId = null;

    document.getElementById("foodForm").reset();

    document.getElementById("modalTitle").innerHTML =
        "Tambah Bahan";

    modal.style.display = "flex";

};

document.getElementById("closeModal").onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};

/* ============================
   LOAD CATEGORY
============================ */

async function loadCategories() {

    try {

        const response = await fetch(`${API_URL}/categories`, {
            headers
        });

        const result = await response.json();

        const select = document.getElementById("category");

        select.innerHTML = "";

        result.data.forEach(category => {

            select.innerHTML += `
                <option value="${category.id}">
                    ${category.name}
                </option>
            `;

        });

    } catch (err) {

        console.error(err);

    }

}

/* ============================
   LOAD FOODS
============================ */

async function loadFoods() {

    try {

        const response = await fetch(`${API_URL}/foods`, {
            headers
        });

        const result = await response.json();

        console.log(result);

        if (result.success) {

            renderTable(result.data);

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

    }

}

/* ============================
   RENDER TABLE
============================ */

function renderTable(foods) {

    const tbody = document.getElementById("foodTable");

    tbody.innerHTML = "";

    foods.forEach(food => {

        tbody.innerHTML += `

        <tr>

            <td>${food.name}</td>

            <td>${food.categories?.name ?? "-"}</td>

            <td>${food.stock}</td>

            <td>${food.unit}</td>

            <td>${food.expired_date ?? "-"}</td>

            <td>

                <button
                    class="action-btn edit"
                    onclick="editFood(${food.id})">
                    Edit
                </button>

                <button
                    class="action-btn delete"
                    onclick="deleteFood(${food.id})">
                    Hapus
                </button>

            </td>

        </tr>

        `;

    });

}

/* ============================
   SIMPAN
============================ */

document.getElementById("foodForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const body = {

        name: document.getElementById("name").value,

        category_id: Number(
            document.getElementById("category").value
        ),

        stock: Number(
            document.getElementById("stock").value
        ),

        unit: document.getElementById("unit").value,

        expired_date:
            document.getElementById("expired_date").value,

        description:
            document.getElementById("description").value

    };

    let url = `${API_URL}/foods`;
    let method = "POST";

    if (editMode) {

        url = `${API_URL}/foods/${selectedFoodId}`;
        method = "PUT";

    }

    const response = await fetch(url, {

        method,

        headers,

        body: JSON.stringify(body)

    });

    const result = await response.json();

    if (result.success) {

        alert(editMode
            ? "Data berhasil diperbarui"
            : "Data berhasil ditambahkan");

        modal.style.display = "none";

        document.getElementById("foodForm").reset();

        loadFoods();

    } else {

        alert(result.message);

    }

});

/* ============================
   EDIT
============================ */

async function editFood(id) {

    const response = await fetch(
        `${API_URL}/foods/${id}`,
        {
            headers
        }
    );

    const result = await response.json();

    const food = result.data;

    editMode = true;

    selectedFoodId = id;

    document.getElementById("modalTitle").innerHTML =
        "Edit Bahan";

    document.getElementById("name").value =
        food.name;

    document.getElementById("category").value =
        food.category_id;

    document.getElementById("stock").value =
        food.stock;

    document.getElementById("unit").value =
        food.unit;

    document.getElementById("expired_date").value =
        food.expired_date ?? "";

    document.getElementById("description").value =
        food.description ?? "";

    modal.style.display = "flex";

}

/* ============================
   DELETE
============================ */

async function deleteFood(id) {

    const confirmDelete =
        confirm("Hapus bahan makanan ini?");

    if (!confirmDelete) return;

    await fetch(`${API_URL}/foods/${id}`, {

        method: "DELETE",

        headers

    });

    loadFoods();

}

/* ============================
   SEARCH
============================ */

document.getElementById("search")
.addEventListener("keyup", async (e) => {

    const keyword = e.target.value.toLowerCase();

    const response = await fetch(`${API_URL}/foods`, {

        headers

    });

    const result = await response.json();

    const filtered = result.data.filter(food =>

        food.name.toLowerCase().includes(keyword)

    );

    renderTable(filtered);

});

/* ============================
   INIT
============================ */

loadCategories();
loadFoods();