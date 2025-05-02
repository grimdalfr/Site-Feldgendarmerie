const heuresList = document.getElementById("heuresList");
const quotaInput = document.getElementById("quota");
const membres = JSON.parse(localStorage.getItem("membres")) || [];

let heuresData = JSON.parse(localStorage.getItem("heuresData")) || {};

function renderHeures() {
  heuresList.innerHTML = "";
  membres.forEach(m => {
    const div = document.createElement("div");
    div.style.margin = "10px 0";

    const label = document.createElement("label");
    label.textContent = `${m.prenom} ${m.nom} : `;

    const input = document.createElement("input");
    input.type = "number";
    input.value = heuresData[m.steamid] || 0;
    input.oninput = () => {
      heuresData[m.steamid] = parseFloat(input.value);
      localStorage.setItem("heuresData", JSON.stringify(heuresData));
      renderHeures();
    };

    const box = document.createElement("span");
    const quota = parseFloat(quotaInput.value || 0);
    box.style.display = "inline-block";
    box.style.width = "15px";
    box.style.height = "15px";
    box.style.marginLeft = "10px";
    box.style.backgroundColor = heuresData[m.steamid] >= quota ? "green" : "red";

    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(box);
    heuresList.appendChild(div);
  });
}

quotaInput.addEventListener("input", renderHeures);
renderHeures();
