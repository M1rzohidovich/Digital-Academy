document.getElementById("signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {
        alert("Parollar bir-biriga mos emas!");
        return;
    }

    const payload = {
        username: username,
        email: email,
        password: password,
        password2: password2
    };

    try {
        const response = await fetch("https://ayyubxon.pythonanywhere.com/users/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
            window.location.href = "login.html"; // Tizimga kirish sahifasiga yo‘naltirish
        } else {
            const errorData = await response.json();
            let message = "Xatolik yuz berdi:\n";
            for (const key in errorData) {
                message += `${key}: ${errorData[key].join(", ")}\n`;
            }
            alert(message);
        }
    } catch (error) {
        alert("Tarmoq xatosi: " + error.message);
    }
});
