document.addEventListener("DOMContentLoaded", function () {
    // 1. access_token mavjudligini tekshiramiz
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        alert("Fanga a'zo bo'lishdan avval tizimga kiring.");
        window.location.href = "login.html";
        return;
    }

    // 2. URL'dan 'id' parametrini olish
    const urlParams = new URLSearchParams(window.location.search);
    const scienceId = urlParams.get('id');

if (scienceId) {
    fetch(`https://ayyubxon.pythonanywhere.com/api/sciences/`)
        .then(response => response.json())
        .then(data => {
            // ID bo‘yicha kerakli fanni topamiz
            const neededScience = data.find(science => science.id == scienceId);

            if (neededScience) {
                console.log("Kerakli fan:", neededScience);

                document.getElementById('fan_nomi').innerHTML = neededScience.name
                document.getElementById('header_nomi').innerHTML = neededScience.name
                document.getElementById('fan_dec').innerHTML = neededScience.description
                document.getElementById('fan_uqituvchi_dec').innerHTML = neededScience.about
            } else {
                console.log("Bunday IDga ega fan topilmadi.");
            }
        })
        .catch(error => console.error("Xatolik:", error));
} else {
    console.log("Fan ID mavjud emas.");
}

    // 3. Agar 'id' bo‘lsa — o‘sha fan bo‘yicha amaliyotlarni olib kelish
    if (scienceId) {
        fetch(`https://ayyubxon.pythonanywhere.com/api/sciences/${scienceId}/`)
            .then(response => response.json())
            .then(data => {
                const coursesContainer = document.getElementById("courses-container");

                if (data.length > 0) {
                    data.forEach(course => {
                        console.log(data);
                        const courseElement = document.createElement("div");
                        courseElement.classList.add("col-lg-3", "col-md-6", "wow", "fadeInUp");
                        courseElement.setAttribute("data-wow-delay", "0.1s");

                        courseElement.innerHTML = `
                            <div class="course-item shadow">
                                <div class="position-relative overflow-hidden text-light image">
                                    <img class="img-fluid" src="https://ayyubxon.pythonanywhere.com${course.image}" alt="${course.name}">
                                </div>
                                <div class="p-2 pb-0">
                                    <h5 class="mb-1">
                                        <a href="single.html?id=${course.id}" class="text-dark">${course.name}</a>
                                    </h5>
                                </div>
                                <div class="d-flex">
                                    <small class="text-primary py-1 px-2 fw-bold fs-6" style="float:right;">
                                        <a href="course.html?id=${course.id}">Amaliyotga qo'shilish</a>
                                        <i class="fa fa-chevron-right me-2 fs-10"></i>
                                    </small>
                                </div>
                            </div>
                        `;

                        coursesContainer.appendChild(courseElement);
                    });
                } else {
                    coursesContainer.innerHTML = "<p>Bu fan bo'yicha amaliyotlar mavjud emas.</p>";
                }
            })
            .catch(error => console.error("Xatolik:", error));
    } else {
        console.log("Fan ID mavjud emas.");
    }
});
