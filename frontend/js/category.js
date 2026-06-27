const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
};

const modal = document.getElementById("categoryModal");

let editMode = false;
let selectedId = null;

document.getElementById("logoutBtn").onclick = () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

};

document.getElementById("addCategoryBtn").onclick = () => {

    editMode = false;
    selectedId = null;

    document.getElementById("categoryForm").reset();

    document.getElementById("categoryTitle").innerHTML =
        "Tambah Kategori";

    modal.style.display = "flex";

};

document.getElementById("closeCategoryModal").onclick = () => {

    modal.style.display = "none";

};

async function loadCategories(){

    const response = await fetch(`${API_URL}/categories`,{
        headers
    });

    const result = await response.json();

    renderTable(result.data);

}

function renderTable(data){

    const tbody=document.getElementById("categoryTable");

    tbody.innerHTML="";

    data.forEach((item,index)=>{

        tbody.innerHTML +=`

        <tr>

        <td>${index+1}</td>

        <td>${item.name}</td>

        <td>

        <button
        class="action-btn edit"
        onclick="editCategory(${item.id})"
        >

        Edit

        </button>

        <button
        class="action-btn delete"
        onclick="deleteCategory(${item.id})"
        >

        Hapus

        </button>

        </td>

        </tr>

        `;

    });

}

document
.getElementById("categoryForm")
.addEventListener("submit",async(e)=>{

e.preventDefault();

const body={
name:document.getElementById("categoryName").value
};

let url=`${API_URL}/categories`;
let method="POST";

if(editMode){

url=`${API_URL}/categories/${selectedId}`;
method="PUT";

}

await fetch(url,{
method,
headers,
body:JSON.stringify(body)
});

modal.style.display="none";

loadCategories();

});

async function editCategory(id){

const response=await fetch(`${API_URL}/categories/${id}`,{
headers
});

const result=await response.json();

editMode=true;

selectedId=id;

document.getElementById("categoryTitle").innerHTML="Edit Kategori";

document.getElementById("categoryName").value=result.data.name;

modal.style.display="flex";

}

async function deleteCategory(id){

if(!confirm("Hapus kategori ini?")) return;

await fetch(`${API_URL}/categories/${id}`,{
method:"DELETE",
headers
});

loadCategories();

}

document
.getElementById("searchCategory")
.addEventListener("keyup",async(e)=>{

const keyword=e.target.value.toLowerCase();

const response=await fetch(`${API_URL}/categories`,{
headers
});

const result=await response.json();

const filtered=result.data.filter(item=>

item.name.toLowerCase().includes(keyword)

);

renderTable(filtered);

});

loadCategories();