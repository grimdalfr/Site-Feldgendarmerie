const adminPassword = "HeilFruhmann413"; 

function loginAsAdmin() {
  const pwd = document.getElementById('adminPassword').value;
  if (pwd === adminPassword) {
    localStorage.setItem('role', 'admin');
    window.location.href = "effectif.html";
  } else {
    document.getElementById('loginError').innerText = "Mot de passe incorrect !";
  }
}

function loginAsGuest() {
  localStorage.setItem('role', 'guest');
  window.location.href = "effectif.html";
}

function logout() {
  localStorage.removeItem('role');
  window.location.href = "index.html";
}

function loadEffectif() {
  const role = localStorage.getItem('role');
  if (!role) {
    window.location.href = "index.html";
    return;
  }
  const data = JSON.parse(localStorage.getItem('members') || "[]");
  const container = document.getElementById('effectifContainer');
  container.innerHTML = '';

  const categories = {
    "Officier": ["Oberst", "Oberstleutnant", "Major", "Hauptmann", "Oberleutnant", "Leutnant"],
    "Sous-officier": ["Stabsfeldwebel", "Oberfeldwebel", "Feldwebel", "Unterfeldwebel", "Unteroffizier"],
    "Militaire du Rang": ["Stabsgefreiter", "Obergefreiter", "Gefreiter", "Oberfeldgendarme", "Feldgendarme"]
  };

  for (const cat in categories) {
    const catDiv = document.createElement('div');
    catDiv.innerHTML = `<h2>${cat}</h2>`;
    categories[cat].forEach(grade => {
      const gradeDiv = document.createElement('div');
      gradeDiv.innerHTML = `<h3>${grade}</h3>`;
      const list = document.createElement('ul');
      data.forEach((member, index) => {
        if (member.grade === grade) {
          const li = document.createElement('li');
          li.innerText = `${member.prenom} ${member.nom}`;
          if (role === 'admin') {
            const editBtn = document.createElement('button');
            editBtn.innerText = "Modifier";
            editBtn.onclick = () => openEditModal(index);
            li.appendChild(editBtn);
          }
          list.appendChild(li);
        }
      });
      if (list.children.length > 0) {
        gradeDiv.appendChild(list);
        catDiv.appendChild(gradeDiv);
      }
    });
    container.appendChild(catDiv);
  }
  if (role === 'admin') {
    const btn = document.createElement('button');
    btn.innerText = "Page de modification ➡️";
    btn.onclick = () => window.location.href = "modification.html";
    container.appendChild(btn);
  }
}

// Edition des membres
let currentEditIndex = null;

function openEditModal(index) {
  const members = JSON.parse(localStorage.getItem('members') || "[]");
  const member = members[index];
  document.getElementById('editPrenom').value = member.prenom;
  document.getElementById('editNom').value = member.nom;
  document.getElementById('editGrade').value = member.grade;
  currentEditIndex = index;
  document.getElementById('editModal').style.display = "flex";
}

function closeEditModal() {
  document.getElementById('editModal').style.display = "none";
}

document.getElementById('editForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const members = JSON.parse(localStorage.getItem('members') || "[]");
  members[currentEditIndex].prenom = document.getElementById('editPrenom').value;
  members[currentEditIndex].nom = document.getElementById('editNom').value;
  members[currentEditIndex].grade = document.getElementById('editGrade').value;
  localStorage.setItem('members', JSON.stringify(members));
  closeEditModal();
  loadEffectif();
});

function setupAddMemberForm() {
  const form = document.getElementById('addMemberForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const grade = document.getElementById('grade').value;
    if (!prenom || !nom || !grade) return alert("Merci de remplir tous les champs");
    const members = JSON.parse(localStorage.getItem('members') || "[]");
    members.push({ prenom, nom, grade });
    localStorage.setItem('members', JSON.stringify(members));
    alert('Membre ajouté avec succès ✅');
    form.reset();
  });
}

function goToEffectif() {
  window.location.href = "effectif.html";
}

document.getElementById('loginAdminBtn')?.addEventListener('click', loginAsAdmin);
document.getElementById('loginGuestBtn')?.addEventListener('click', loginAsGuest);
