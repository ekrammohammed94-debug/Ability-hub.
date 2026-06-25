const registerForm = document.querySelector(".register-form");
const loginForm = document.querySelector(".login-form");

/* Register */
if(registerForm){

    registerForm.addEventListener("submit", function(e){
        e.preventDefault();

        const role = document.querySelector("select").value;

        localStorage.setItem("userRole", role);

        alert("Registration successful!");
        window.location.href = "login.html";
    });

}

/* Login */
if(loginForm){

    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const role = localStorage.getItem("userRole");

        if(role === "patient"){
            window.location.href = "patient.html";
        }
        else if(role === "hospital"){
            window.location.href = "hospital.html";
        }
        else if(role === "charity"){
            window.location.href = "charity.html";
        }
        else if(role === "donor"){
            window.location.href = "donor.html";
        }
        else{
            alert("Please register first");
        }
    });

}
