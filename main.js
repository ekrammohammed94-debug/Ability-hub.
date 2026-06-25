const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("userRole");
        window.location.href = "login.html";
    });
}

function openForm() {
    const form = document.getElementById("requestForm");

    if (form) {
        form.classList.remove("hidden");
        form.scrollIntoView({
            behavior: "smooth"
        });
    }
}