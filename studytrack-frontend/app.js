let editingCard = null;

const form = document.getElementById("mainForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const requirement = document.getElementById("requirement").value;
  const description = document.getElementById("title").value;
  const deadline = document.getElementById("deadline").value;
  const status = document.getElementById("status").value;

  if (!name || !requirement || !description || !deadline || !status) {
    return;
  }

  // SZERKESZTÉS
  if (editingCard !== null) {

    editingCard.querySelector("h2").innerText = name;
    editingCard.querySelector("p:nth-of-type(1)").innerHTML =
      "<strong>Elvárás:</strong> " + requirement;
    editingCard.querySelector("p:nth-of-type(2)").innerHTML =
      "<strong>Leírás:</strong> " + description;
    editingCard.querySelector("p:nth-of-type(3)").innerHTML =
      "<strong>Határidő:</strong> " + deadline;
    editingCard.querySelector("p:nth-of-type(4)").innerHTML =
      "<strong>Státusz:</strong> " + status;

    editingCard.className = "subject-card " + status;

    editingCard = null;
    form.querySelector("button").innerText = "Hozzáadás";
    form.reset();
    return;
  }

  // ÚJ KÁRTYA
  const newCard = document.createElement("div");
  newCard.className = "subject-card " + status;

  newCard.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Elvárás:</strong> ${requirement}</p>
    <p><strong>Leírás:</strong> ${description}</p>
    <p><strong>Határidő:</strong> ${deadline}</p>
    <p><strong>Státusz:</strong> ${status}</p>
    <div class="card-actions">
      <button class="edit-btn">Szerkesztés</button>
      <button class="delete-btn">Törlés</button>
    </div>
  `;

  document.getElementById("subjectContainer").appendChild(newCard);

  form.reset();
});

// CLICK KEZELÉS (TÖRLÉS + SZERKESZTÉS)
document.addEventListener("click", function (e) {

  if (e.target.classList.contains("delete-btn")) {
    e.target.closest(".subject-card").remove();
  }

  if (e.target.classList.contains("edit-btn")) {

    const card = e.target.closest(".subject-card");

    const name = card.querySelector("h2").innerText;
    const requirement = card.querySelector("p:nth-of-type(1)").innerText.split(": ")[1];
    const description = card.querySelector("p:nth-of-type(2)").innerText.split(": ")[1];
    const deadline = card.querySelector("p:nth-of-type(3)").innerText.split(": ")[1];
    const status = card.querySelector("p:nth-of-type(4)").innerText.split(": ")[1];

    document.getElementById("name").value = name;
    document.getElementById("requirement").value = requirement;
    document.getElementById("title").value = description;
    document.getElementById("deadline").value = deadline;
    document.getElementById("status").value = status;

    editingCard = card;

    form.querySelector("button").innerText = "Mentés";
  }

});