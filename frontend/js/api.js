const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

const headers = {

    Authorization:`Bearer ${token}`,

    "Content-Type":"application/json"

};