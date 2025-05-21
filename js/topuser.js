    document.addEventListener("DOMContentLoaded", async function () {
        try {
            const res = await fetch("https://ayyubxon.pythonanywhere.com/users/Top10/");
            const users = await res.json();
            const accordion = document.getElementById("accordionExample");

            const colors = ['bg-danger', 'bg-warning', 'bg-success', 'bg-info', 'bg-primary', 'bg-secondary', 'bg-dark', 'bg-muted', 'bg-orange', 'bg-purple'];

            users.forEach((user, index) => {
                const initials = user.username.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
                const color = colors[index % colors.length];
                const collapseId = `collapseUser${index}`;
                const headerId = `headingUser${index}`;

                const accordionItem = document.createElement("div");
                accordionItem.className = "accordion-item";

                accordionItem.innerHTML = `
                    <h2 class="accordion-header" id="${headerId}">
                        <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button"
                            data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${index === 0 ? 'true' : 'false'}"
                            aria-controls="${collapseId}">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle ${color} text-white d-flex align-items-center justify-content-center"
                                     style="width: 40px; height: 40px; font-weight: bold;">
                                     ${initials}
                                </div>
                                <span class="fw-semibold">${user.username}</span>
                            </div>
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="${headerId}"
                         data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p class="mb-1"><strong>Rank:</strong> ${user.rank}</p>
                            <p class="mb-1 text-warning"><strong>Score:</strong> <i class="fas fa-gem"></i> ${user.average_score}</p>
                        </div>
                    </div>
                `;

                accordion.appendChild(accordionItem);
            });
        } catch (error) {
            console.error("Top foydalanuvchilarni yuklab bo‘lmadi:", error);
        }
    });
