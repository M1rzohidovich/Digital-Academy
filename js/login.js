    document.getElementById("login-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // sahifa reload bo'lishining oldini oladi

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("https://ayyubxon.pythonanywhere.com/users/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ Muvaffaqiyatli login
                // alert("Welcome, " + data.user.username + "!");

                // Tokenlarni localStorage'ga saqlash
                localStorage.setItem("access_token", data.tokens.access);
                localStorage.setItem("refresh_token", data.tokens.refresh);
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("user_id", data.user.id);

                // Kerakli sahifaga yo'naltirish (masalan: dashboard)
                window.location.href = "index.html";
            } else {
                alert("Login failed: " + (data.detail || "Username or password incorrect"));
            }
        } catch (error) {
            console.error(error);
            alert("Xatolik yuz berdi: " + error.message);
        }
    });