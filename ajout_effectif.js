document.getElementById("addForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const steamid = document.getElementById("steamid").value;
    const grade = document.getElementById("grade").value;
  
    const membres = JSON.parse(localStorage.getItem("membres")) || [];
    membres.push({ prenom, nom, steamid, grade });
    localStorage.setItem("membres", JSON.stringify(membres));
  
    alert("Membre ajouté !");
    window.location.href = "dashboard.html";
  });
  