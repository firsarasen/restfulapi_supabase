const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Konfirmasi password tidak sama.");
        return;
    }

    try{

        const response = await fetch(BASE_URL + "/auth/register",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name,
                email,
                password

            })

        });

        const data = await response.json();

        if(response.ok){

            alert("Registrasi berhasil.");

            window.location.href="index.html";

        }else{

            alert(data.message || "Registrasi gagal.");

        }

    }catch(err){

        alert("Server tidak dapat dihubungi.");

    }

});