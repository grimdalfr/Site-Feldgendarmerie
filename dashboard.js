const membres = JSON.parse(localStorage.getItem("membres")) || [];
const user = JSON.parse(localStorage.getItem("loggedUser"));
const heuresData = JSON.parse(localStorage.getItem("heuresData")) || {};
const effectifList = document.getElementById("effectifList");
const quota = parseFloat(localStorage.getItem("quota") || 0);

const grades = {
  "Officier": ["Oberst", "Oberstleutnant", "Major", "Hauptmann", "Oberleutnant", "Leutnant"],
  "Sous-officier": ["Stabsfeldwebel", "Oberfeldwebel", "Feldwebel", "Unterfeldwebel", "Unteroffizier"],
  "Militaire du Rang": ["Stabsgefreiter", "Obergefreiter", "Gefreiter", "Oberfeldgendarme", "Feldgendarme"]
};

function render() {
  effectifList.innerHTML = "";
  for (const categorie in grades) {
    const catDiv = document.createElement("div");
    catDiv.className = "categorie";
    catDiv.innerHTML = `<h2>${categorie}</h2>`;

    grades[categorie].forEach(grade => {
      const subDiv = document.createElement("div");
      subDiv.className = "subcat";
      subDiv.innerHTML = `<h3>${grade}</h3>`;

      membres.filter(m => m.grade === grade).forEach(membre => {
        const item = document.createElement("div");
        item.className = "effectif-item";
        item.innerHTML = `
          <strong>${membre.prenom} ${membre.nom}</strong><br>
          SteamID: ${membre.steamid}<br>
          <span class="status-box" style="background-color: ${heuresData[membre.steamid] >= quota ? "green" : "red"}"></span>
        `;

        if (user?.role === "admin") {
          const btn = document.createElement("button");
          btn.innerText = "Modifier";
          btn.onclick = () => alert("Modification non encore implémentée.");
          btn.style.marginLeft = "10px";
          item.appendChild(btn);
        }

        subDiv.appendChild(item);
      });

      catDiv.appendChild(subDiv);
    });

    effectifList.appendChild(catDiv);
  }
}

render();
