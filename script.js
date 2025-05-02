const defaultUsers = [
  { username: "admin", password: "admin123", role: "admin" }
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginError").innerText = "Identifiants incorrects.";
  }
});
