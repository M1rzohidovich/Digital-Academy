document.addEventListener("DOMContentLoaded", function () {
    fetch("https://ayyubxon.pythonanywhere.com/api/sciences/")  // Barcha fanlar
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("science-container");
            
            // Avval konteynerni tozalab olamiz
            container.innerHTML = "";

            data.forEach(science => {
                const col = document.createElement("div");
                col.className = "col-lg-3 col-md-6 text-center";

                col.innerHTML = `
                    <div class="content shadow p-3 mb-2 wow fadeInUp" data-wow-delay="0.3s">
                        <img src="https://ayyubxon.pythonanywhere.com${science.image}" class="img-fluid" alt="categories">
                        <h5 class="my-2">
                            <a href="single.html?id=${science.id}" class="text-center">${science.name}</a>
                        </h5>
                    </div>
                `;
                container.appendChild(col);
            });
        })
        .catch(error => console.error("Xatolik:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    // URL'dan 'id' parametrini olish
    const urlParams = new URLSearchParams(window.location.search);
    const scienceId = urlParams.get('id');  // id ni olish

    // Agar 'id' bo'lsa, so'rovni yuborish
    if (scienceId) {
        fetch(`https://ayyubxon.pythonanywhere.com/api/sciences/${scienceId}/`) // Fanga tegishli amaliyotlarni olish
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("science-container");
                container.innerHTML = "";  // Oldingi ma'lumotlarni tozalash

                // Fanning o'zini ko'rsatish
                const fan = document.createElement("div");
                fan.className = "fan-details";

                fan.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="https://ayyubxon.pythonanywhere.com${data.image}" class="img-fluid" alt="Fan rasmi">
                    <p>${data.description}</p>
                    <div class="video-container">
                        ${data.link}  <!-- YouTube video o'ynatish linki -->
                    </div>
                    <div class="file-container">
                        <a href="https://ayyubxon.pythonanywhere.com${data.file}" target="_blank">Amaliyot faylini ko'rish</a>
                    </div>
                `;

                // Amaliyotlarni ko'rsatish (agar mavjud bo'lsa)
                if (data.test) {
                    const testContainer = document.createElement("div");
                    testContainer.className = "test-container";

                    testContainer.innerHTML = `<h3>Test: ${data.test.title}</h3>`;

                    data.test.questions.forEach(question => {
                        const questionElement = document.createElement("div");
                        questionElement.className = "question";
                        questionElement.innerHTML = `<p>${question.question}</p>`;
                        testContainer.appendChild(questionElement);
                    });

                    fan.appendChild(testContainer);
                }

                container.appendChild(fan);
            })
            .catch(error => console.error("Xatolik:", error));
    } else {
        console.log("Fan ID mavjud emas.");
    }
});
