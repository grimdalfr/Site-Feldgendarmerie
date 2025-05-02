document.getElementById("addAccountForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.username === newUsername)) {
      alert("Nom d'utilisateur déjà pris.");
      return;
    }
  
    users.push({ username: newUsername, password: newPassword, role: "admin" });
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Compte créé !");
  });
  