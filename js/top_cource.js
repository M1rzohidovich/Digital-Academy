document.addEventListener("DOMContentLoaded", function () {
        fetch(`https://ayyubxon.pythonanywhere.com/api/all-practices/`)
            .then(response => response.json())
            .then(data => {
                const coursesContainer = document.getElementById("home-courses-container");

                if (data.length > 0) {
                    data.forEach(course => {
                        const courseElement = document.createElement("div");
                        courseElement.classList.add("col-lg-3", "col-md-6", "wow", "fadeInUp");
                        courseElement.setAttribute("data-wow-delay", "0.1s");

                        const trimmedName = course.name.length > 20
                        ? course.name.substring(0, 20) + "..."
                        : course.name;

                        courseElement.innerHTML = `
                            <div class="course-item shadow">
                                <div class="position-relative overflow-hidden text-light image">
                                    <img class="img-fluid" src="${course.image}" alt="${course.name}">
                                </div>
                                <div class="p-2 pb-0">
                                    <h5 class="mb-1">
                                        <a href="single.html?id=${course.id}" class="text-dark">${trimmedName}</a>
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
    });
