let editingId = null;

const form = document.getElementById("mainForm");
const container = document.getElementById("subjectContainer");

const API_URL = "https://lms-backend-j8dy.onrender.com/api/subjects";;

/* =========================
   BETÖLTÉS INDULÁSKOR
========================= */

document.addEventListener("DOMContentLoaded", loadSubjects);

async function loadSubjects() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    container.innerHTML = "";

    result.data.forEach(subject => {
      renderCard(subject);
    });

  } catch (error) {
    console.error("Hiba a lekérésnél:", error);
  }
}

/* =========================
   KÁRTYA RENDERELÉS
========================= */

function renderCard(subject) {
  const card = document.createElement("div");
  card.className = "subject-card " + subject.status;
  card.dataset.id = subject._id;

  card.innerHTML = `
  <h2>${subject.name}</h2>
  <p><strong>Elvárás:</strong> ${subject.requirement}</p>
  <p><strong>Leírás:</strong> ${subject.taskTitle}</p>
  <p><strong>Határidő:</strong> ${new Date(subject.deadline).toLocaleDateString()}</p>
  <p><strong>Státusz:</strong> ${subject.status}</p>

  <div class="card-actions">
    <button class="edit-btn">✏️ Szerkesztés</button>
    <button class="delete-btn">🗑️ Törlés</button>
  </div>
`;

  container.appendChild(card);
}

/* =========================
   HOZZÁADÁS / MENTÉS
========================= */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const requirement = document.getElementById("requirement").value;
  const taskTitle = document.getElementById("title").value;
  const deadline = document.getElementById("deadline").value;
  const status = document.getElementById("status").value;

  if (!name || !requirement || !taskTitle || !deadline || !status) return;

  const subjectData = {
    name,
    requirement,
    taskTitle,
    deadline,
    status
  };

  // === SZERKESZTÉS ===
  if (editingId !== null) {

    fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(subjectData)
    })
    .then(() => {
        const savedId = editingId;
        editingId = null;
        form.querySelector("button").innerText = "Hozzáadás";
        form.reset();

        loadSubjects().then(() => {
          const updatedCard = document.querySelector(`[data-id="${savedId}"]`);
          if (updatedCard) {
            updatedCard.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
        });
      });

    return;
  }

  // === ÚJ LÉTREHOZÁS ===
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subjectData)
  })
  .then(() => {
    form.reset();
    loadSubjects();
  });

});

/* =========================
   TÖRLÉS + SZERKESZTÉS
========================= */

document.addEventListener("click", function (e) {

  // === TÖRLÉS ===
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".subject-card");
    const id = card.dataset.id;

    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      loadSubjects();
    });
  }

  // === SZERKESZTÉS ===
  if (e.target.classList.contains("edit-btn")) {

    const card = e.target.closest(".subject-card");
    const id = card.dataset.id;

    const name = card.querySelector("h2").innerText;
    const requirement = card.querySelector("p:nth-of-type(1)").innerText.split(": ")[1];
    const taskTitle = card.querySelector("p:nth-of-type(2)").innerText.split(": ")[1];
    const deadline = card.querySelector("p:nth-of-type(3)").innerText.split(": ")[1];
    const status = card.querySelector("p:nth-of-type(4)").innerText.split(": ")[1];

    document.getElementById("name").value = name;
    document.getElementById("requirement").value = requirement;
    document.getElementById("title").value = taskTitle;
    document.getElementById("deadline").value = deadline;
    document.getElementById("status").value = status;

    editingId = id;
    form.querySelector("button").innerText = "Mentés";
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

});